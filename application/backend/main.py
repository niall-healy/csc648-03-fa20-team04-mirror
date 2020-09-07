from fastapi import FastAPI
from starlette.staticfiles import StaticFiles

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.mount("/", StaticFiles(directory="."), name="static")
