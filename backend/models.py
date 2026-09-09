from pydantic import BaseModel, EmailStr
from typing import Optional, List
from uuid import UUID, uuid4

class UserBase(BaseModel):
    name: str
    phone: str
    role: str # "farmer", "consumer", "admin"

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: UUID

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    unit: str
    quantity_available: float
    farmer_id: UUID

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: UUID

class OrderItem(BaseModel):
    product_id: UUID
    quantity: float
    price_at_time: float

class OrderBase(BaseModel):
    consumer_id: UUID
    total_amount: float
    status: str # "pending", "accepted", "delivered", "cancelled"

class OrderCreate(OrderBase):
    items: List[OrderItem]

class OrderResponse(OrderBase):
    id: UUID
    items: List[OrderItem]

class DeliveryBase(BaseModel):
    order_id: UUID
    status: str
    estimated_time: Optional[str] = None
    fee: float

class DeliveryCreate(DeliveryBase):
    pass

class DeliveryResponse(DeliveryBase):
    id: UUID
