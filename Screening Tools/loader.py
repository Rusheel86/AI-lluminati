import os, json

BASE_DIR = os.path.join(os.path.dirname(__file__), "Questionnaires")

def load_questionnaires():
    questionnaires = {}
    for root, _, files in os.walk(BASE_DIR):  # walks through PHQ9/, GAD7/, GHQ12/
        for file in files:
            if file.endswith(".json"):
                path = os.path.join(root, file)
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        data = json.load(f)

                        qid = data.get("id")
                        lang = data.get("lang")

                        # Ensure required keys exist
                        if not qid or not lang:
                            print(f"❌ {file}: missing 'id' or 'lang'")
                            continue
                        if "questions" not in data or not isinstance(data["questions"], list):
                            print(f"❌ {file}: invalid or missing 'questions'")
                            continue
                        if "scoring" not in data:
                            print(f"❌ {file}: missing 'scoring'")
                            continue

                        # Normalize qid/lang
                        qid = qid.upper()
                        lang = lang.lower()

                        questionnaires.setdefault(qid, {})[lang] = data
                        print(f"✅ Loaded: {qid} ({lang}) from {file}")
                except Exception as e:
                    print(f"❌ Error loading {file}: {e}")
    return questionnaires

if __name__ == "__main__":
    all_questionnaires = load_questionnaires()
    for qid, langs in all_questionnaires.items():
        print(f"\n📌 {qid} available languages: {list(langs.keys())}")
        try:
            sample_q = langs[list(langs.keys())[0]]["questions"][0]["text"]
            print(f"   Sample from {qid}/{list(langs.keys())[0]}: {sample_q}")
        except Exception as e:
            print(f"⚠️ Couldn’t print sample for {qid}: {e}")