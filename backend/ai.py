import os
from dotenv import load_dotenv
import httpx

load_dotenv()
openrouter_api_key = os.getenv("OPENROUTER_API_KEY")

async def get_ai_answer(question: str) -> str:
    print(f"Question received: {question}")
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {openrouter_api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "openrouter/horizon-beta",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": question}
            ],
        "temperature": 0.7
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=data)
            response.raise_for_status()
            res_json = response.json()
            return res_json["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"OpenRouter API ERROR: {e}")
        raise e
