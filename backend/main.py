from fastapi import FastAPI, HTTPException
from typing import List, Dict
from uuid import UUID, uuid4
from models import UserCreate, UserResponse, ProductCreate, ProductResponse
from ai_service import SearchRequest, SearchResponse, PriceRecommendationResponse, mock_natural_language_search, mock_price_recommendation
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
