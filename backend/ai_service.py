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

class ImageAnalysisResponse(BaseModel):
    product_category: str
    visual_quality: str
    defects_detected: bool
    relevance: str
    confidence: float
    message: str

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

def mock_image_analysis(image_base64: str) -> ImageAnalysisResponse:
    # A mock abstraction that pretends to analyze image
    return ImageAnalysisResponse(
        product_category="Tomatoes",
        visual_quality="Good",
        defects_detected=False,
        relevance="High",
        confidence=0.92,
        message="AI-assisted visual verification: Image appears relevant with no major visible defects. Manual verification may be required."
    )
