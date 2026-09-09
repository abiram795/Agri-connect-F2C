from pydantic import BaseModel

class IVRWebhookRequest(BaseModel):
    CallSid: str
    From: str
    To: str
    Digits: str = ""

class IVRResponse(BaseModel):
    twiml: str

def handle_incoming_call(req: IVRWebhookRequest) -> IVRResponse:
    # A mock simplified Twilio TwiML response
    twiml_response = """
    <Response>
        <Say voice="alice">Welcome to AgriConnect. Press 1 for order info, 2 for price recommendation.</Say>
    </Response>
    """
    return IVRResponse(twiml=twiml_response)

def handle_digit_input(req: IVRWebhookRequest) -> IVRResponse:
    if req.Digits == "1":
        response_text = "You have 2 pending orders."
    elif req.Digits == "2":
        response_text = "Recommended price for Tomatoes is 35 rupees."
    else:
        response_text = "Invalid input."

    twiml_response = f"""
    <Response>
        <Say voice="alice">{response_text}</Say>
    </Response>
    """
    return IVRResponse(twiml=twiml_response)
