from fastapi import FastAPI
import sys
import openai
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded


limiter = Limiter(key_func=get_remote_address)
openai.api_key = sys.env('OPENAI_API_KEY')
model = sys.env('OPENAI_MODEL')

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/completion/")
@limiter.limit("10/minute")
def read_item(q: str):
    completion = openai.Completion.create(model=model, prompt="Hello world")
    return {"data": completion.choices[0].text}
