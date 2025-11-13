from db_model import DigitalTwin
from ai_module import AITwinPredictor
from blockchain_sync import log_to_blockchain

predictor = AITwinPredictor()

def process_twin(twin: DigitalTwin):
    # Step 1: Analyze with AI
    features = [twin.status_data.get("temperature", 25),
                twin.status_data.get("delay_hours", 0)]
    risk = predictor.predict_risk(features)
    twin.ai_insights = {"risk_score": risk}

    # Step 2: Trigger blockchain log if risk is high
    if risk > 0.8:
        log_to_blockchain(twin.real_entity_id, "At Risk")

    print(f"[Twin {twin.twin_id}] Risk Score: {risk}")
