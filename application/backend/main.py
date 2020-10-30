from fastapi import FastAPI

from starlette.responses import RedirectResponse
from starlette.staticfiles import StaticFiles

from app.routers import search, register
from app.sql_db import models

from app.sql_db.database import SessionLocal, engine


"""
This is the main file that runs the app, it builds the tables in the database, instantiates the fastAPI app, 
redirects the root of the site to the homepage, includes the router in the app, and mounts static files 
"""

# builds tables in the database
models.Base.metadata.create_all(bind=engine)

# creates an instance of the fastAPI app
app = FastAPI()


# redirects root of the site to our homepage
@app.get("/")
async def root():
    return RedirectResponse(url='/html/index.html')

# includes the routers
app.include_router(search.router)

app.include_router(
    register.router,
    prefix="/register",
    tags=["register"]
)

# mounts static files
app.mount("/", StaticFiles(directory=".."), name="static")

