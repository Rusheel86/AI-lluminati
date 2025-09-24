from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os, json

# Initialize FastAPI
app = FastAPI()

# Allow frontend (React/Cursor) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load questionnaires into memory
QUESTIONNAIRES = {}
BASE_DIR = "Questionnaires"

for root, _, files in os.walk(BASE_DIR):
    for file in files:
        if file.endswith(".json"):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    qid = data.get("id")
                    lang = data.get("lang")
                    if qid and lang:
                        qid = qid.upper()
                        lang = lang.lower()
                        QUESTIONNAIRES.setdefault(qid, {})[lang] = data
                        print(f"✅ Loaded: {qid} ({lang})")
            except Exception as e:
                print(f"⚠️ Failed to load {path}: {e}")

# Routes
@app.get("/questionnaire/{qid}/{lang}")
def get_questionnaire(qid: str, lang: str):
    qid = qid.upper()
    lang = lang.lower()
    if qid not in QUESTIONNAIRES or lang not in QUESTIONNAIRES[qid]:
        raise HTTPException(status_code=404, detail="Questionnaire not found")
    return QUESTIONNAIRES[qid][lang]

from fastapi import Request
@app.post("/score/{qid}/{lang}")
async def score_questionnaire(qid: str, lang: str, request: Request):
    qid_key = qid.upper()
    lang_key = lang.lower()

    if qid_key not in QUESTIONNAIRES or lang_key not in QUESTIONNAIRES[qid_key]:
        raise HTTPException(status_code=404, detail="Questionnaire not found")

    questionnaire = QUESTIONNAIRES[qid_key][lang_key]

    # read JSON body safely
    try:
        answers = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    # Log the incoming answers for debugging (check uvicorn output)
    print(f"[DEBUG] Received answers for {qid_key}/{lang_key}: {answers}")

    if not isinstance(answers, dict):
        raise HTTPException(status_code=400, detail="Answers must be a JSON object mapping question-id -> numeric value")

    # Normalize keys and values
    normalized_answers = {}
    for k, v in answers.items():
        try:
            normalized_answers[str(k)] = int(v)
        except Exception:
            raise HTTPException(status_code=400, detail=f"Answer for '{k}' must be numeric")

    total = 0
    missing = []
    answered_count = 0

    for q in questionnaire["questions"]:
        qid_local = q.get("id")
        if qid_local is None:
            raise HTTPException(status_code=500, detail="Question missing 'id' in questionnaire file")

        if qid_local in normalized_answers:
            total += normalized_answers[qid_local]
            answered_count += 1
        else:
            missing.append(qid_local)

    # Find label from scoring bands if present
    label = None
    scoring = questionnaire.get("scoring", {})
    labels = scoring.get("labels") if isinstance(scoring, dict) else None

    if labels:
        for band in labels:
            if total <= band["max"]:
                label = band["label"]
                break
    else:
        # fallback: no labels present
        label = "No severity bands defined"

    response = {
        "total": total,
        "label": label,
        "answered": answered_count,
        "expected": len(questionnaire["questions"]),
        "missing_questions": missing,
        "partial": answered_count != len(questionnaire["questions"])
    }

    # Log final computed response
    print(f"[DEBUG] Score response for {qid_key}/{lang_key}: {response}")

    return response