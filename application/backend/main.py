from fastapi import FastAPI

from starlette.responses import RedirectResponse
from starlette.staticfiles import StaticFiles

from app.routers import routers
from app.sql_db import models

from app.sql_db.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# @app.post("/items/", response_model=schemas.Item)
# def create_item(
#     item: schemas.ItemCreate, db: Session = Depends(get_db)
# ):
#     return crud.create_item(db=db, item=item)
#
#
# @app.get("/items/", response_model=List[schemas.Item])
# def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     items = crud.get_items(db, skip=skip, limit=limit)
#     return items


@app.get("/")
async def root():
    return RedirectResponse(url='/html/index.html')


# ===== Routers =====
app.include_router(routers.router)

app.mount("/", StaticFiles(directory=".."), name="static")

# ===== end routers =====

