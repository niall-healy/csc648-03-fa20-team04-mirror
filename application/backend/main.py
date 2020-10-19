from fastapi import FastAPI
from starlette.responses import RedirectResponse
from starlette.staticfiles import StaticFiles

app = FastAPI()


@app.get("/")
async def root():
    return RedirectResponse(url='/html/index.html')


app.mount("/", StaticFiles(directory=".."), name="static")

