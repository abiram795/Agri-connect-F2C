from pydantic import BaseModel

class SearchRequest(BaseModel):
    query: str

class SearchResponse(BaseModel):
    product: str
    quantity: float
    unit: str
    location_radius_km: float
    message: str

class PriceRecommendationResponse(BaseModel):
    suggested_price: float
    reasonable_range: str
    confidence: str
    explanation: str
    is_demo: bool = True

def mock_natural_language_search(query: str) -> SearchResponse:
    # A mock abstraction that pretends to extract search info
    return SearchResponse(
        product="Tomatoes",
        quantity=3.0,
        unit="kg",
        location_radius_km=5.0,
        message=f"Mock extraction from query: '{query}'"
    )

def mock_price_recommendation(product: str) -> PriceRecommendationResponse:
    return PriceRecommendationResponse(
        suggested_price=35.0,
        reasonable_range="30.0 - 40.0",
        confidence="High",
        explanation="Based on current mock demand and nearby supply."
    )
