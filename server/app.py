from time import sleep
from fastapi import FastAPI, Request, Response
import os
import openai
import random
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.middleware.cors import CORSMiddleware


limiter = Limiter(key_func=get_remote_address)
openai.api_key = os.getenv('OPENAI_API_KEY')
model = 'curie:ft-personal-2022-01-16-03-36-46'

origins = [
    "*"
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


@app.get("/completion")
@limiter.limit("10/minute")
def get_response(request: Request, response: Response):
    question = request.query_params.get('question').replace('###', '').replace(
        'END', '').replace('Q:', '').replace('T:', '').replace('B:', '')
    body = request.query_params.get('body').replace('###', '').replace(
        'END', '').replace('Q:', '').replace('T:', '').replace('B:', '')
    if len(question) + len(body) > 500:
        return {"error": "Question or body too long"}

    prompt = f" Q: {question}\nT: GOOD\nB: {body}\n\n###\n\n"

    if not prompt:
        response.status_code = 400
        return {"error": "prompt is required"}

    completion = openai.Completion.create(
        max_tokens=150,
        temperature=0.9,
        stop=" END",
        model=model, prompt=prompt)
    print(completion)
    cleaned = completion.choices[0].text.split('END')[0].replace(
        'IANAL', 'I am not a lawyer').replace('NAL', 'Not a lawyer')

    return {"data": cleaned}
