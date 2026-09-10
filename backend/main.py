from fastapi import FastAPI, HTTPException
from typing import List, Dict
from uuid import UUID, uuid4
from models import UserCreate, UserResponse, ProductCreate, ProductResponse, OrderCreate, OrderResponse, BulkOrderRequestCreate, BulkOrderRequestResponse
from pydantic import BaseModel
from ai_service import SearchRequest, SearchResponse, PriceRecommendationResponse, mock_natural_language_search, mock_price_recommendation, mock_image_analysis, ImageAnalysisResponse
from ivr_service import IVRWebhookRequest, IVRResponse, handle_incoming_call, handle_digit_input

app = FastAPI(title="AgriConnect F2C API")

# Mock database
users_db: Dict[UUID, UserResponse] = {}
products_db: Dict[UUID, ProductResponse] = {}

@app.get("/")
def read_root():
    return {"message": "Welcome to AgriConnect F2C API"}

# Users API
@app.post("/api/users", response_model=UserResponse)
def create_user(user: UserCreate):
    user_id = uuid4()
    new_user = UserResponse(id=user_id, **user.model_dump())
    users_db[user_id] = new_user
    return new_user

@app.get("/api/users/{user_id}", response_model=UserResponse)
def get_user(user_id: UUID):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    return users_db[user_id]

@app.get("/api/users", response_model=List[UserResponse])
def list_users():
    return list(users_db.values())

# Products API
@app.post("/api/products", response_model=ProductResponse)
def create_product(product: ProductCreate):
    product_id = uuid4()

    # Process mock live image if provided
    if product.image_url and product.image_url.startswith("data:image"):
        analysis = mock_image_analysis(product.image_url)
        # We would store the analysis in the DB linked to product_id here
        # For mock, we simply note it passes validation
        pass

    new_product = ProductResponse(id=product_id, **product.model_dump())
    products_db[product_id] = new_product
    return new_product

@app.get("/api/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: UUID):
    if product_id not in products_db:
        raise HTTPException(status_code=404, detail="Product not found")
    return products_db[product_id]

@app.get("/api/products", response_model=List[ProductResponse])
def list_products():
    return list(products_db.values())

from datetime import datetime

# Platform Settings DB Mock
platform_settings_db = {
    "DAILY_CONSUMER_LIMIT_KG": 10.0
}

# Orders API
orders_db: Dict[UUID, OrderResponse] = {}

@app.post("/api/orders", response_model=OrderResponse)
def create_order(order: OrderCreate):
    daily_limit = platform_settings_db.get("DAILY_CONSUMER_LIMIT_KG", 10.0)

    # Validation against limits per consumer per product category per day
    today_str = datetime.now().strftime("%Y-%m-%d")

    # Simple mock categories based on product string name ending for hackathon demo
    # In real app: query products_db[item.product_id].category_id
    def get_category(prod_id: UUID) -> str:
        prod = products_db.get(prod_id)
        if prod and "Tomato" in prod.name: return "Vegetables"
        if prod and "Onion" in prod.name: return "Vegetables"
        return "Other"

    requested_kg_by_cat = {}
    for item in order.items:
        cat = get_category(item.product_id)
        requested_kg_by_cat[cat] = requested_kg_by_cat.get(cat, 0) + item.quantity

    # Fetch past orders for the consumer today
    past_orders_today = [
        o for o in orders_db.values()
        if o.consumer_id == order.consumer_id and o.created_at.startswith(today_str)
    ]

    past_kg_by_cat = {}
    for past_order in past_orders_today:
        for item in past_order.items:
             cat = get_category(item.product_id)
             past_kg_by_cat[cat] = past_kg_by_cat.get(cat, 0) + item.quantity

    # Check limits
    for cat, req_qty in requested_kg_by_cat.items():
        past_qty = past_kg_by_cat.get(cat, 0)
        if req_qty + past_qty > daily_limit:
            raise HTTPException(
                status_code=400,
                detail=f"Order exceeds daily consumer limit of {daily_limit}kg for {cat}. You have already ordered {past_qty}kg today. Please use bulk request for larger quantities."
            )

    order_id = uuid4()
    order_dict = order.model_dump()
    order_dict['created_at'] = today_str # Set the creation date for historical checking
    new_order = OrderResponse(id=order_id, **order_dict)
    orders_db[order_id] = new_order
    return new_order

@app.get("/api/orders/{order_id}", response_model=OrderResponse)
def get_order(order_id: UUID):
    if order_id not in orders_db:
        raise HTTPException(status_code=404, detail="Order not found")
    return orders_db[order_id]

# Bulk Orders API
bulk_orders_db: Dict[UUID, BulkOrderRequestResponse] = {}

@app.post("/api/bulk-orders", response_model=BulkOrderRequestResponse)
def create_bulk_order(request: BulkOrderRequestCreate):
    req_id = uuid4()
    new_req = BulkOrderRequestResponse(id=req_id, **request.model_dump())
    bulk_orders_db[req_id] = new_req
    return new_req

@app.get("/api/bulk-orders", response_model=List[BulkOrderRequestResponse])
def list_bulk_orders():
    return list(bulk_orders_db.values())

# Admin Verification API
class VerificationRequest(BaseModel):
    admin_id: UUID
    target_id: UUID
    action: str # "Approve", "Reject"
    notes: str = ""

@app.post("/api/admin/verify")
def verify_target(req: VerificationRequest):
    # In a real app this would update the DB and log the action
    return {"status": "success", "message": f"Target {req.target_id} marked as {req.action}"}

# AI API
@app.post("/api/ai/search", response_model=SearchResponse)
def ai_search(req: SearchRequest):
    return mock_natural_language_search(req.query)

@app.get("/api/ai/price", response_model=PriceRecommendationResponse)
def ai_price(product: str):
    return mock_price_recommendation(product)

# IVR Mock API
@app.post("/api/ivr/incoming", response_model=IVRResponse)
def ivr_incoming(req: IVRWebhookRequest):
    return handle_incoming_call(req)

@app.post("/api/ivr/input", response_model=IVRResponse)
def ivr_input(req: IVRWebhookRequest):
    return handle_digit_input(req)
