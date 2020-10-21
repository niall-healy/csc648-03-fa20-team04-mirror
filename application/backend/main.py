from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from starlette.responses import RedirectResponse
from starlette.staticfiles import StaticFiles

from application.backend import crud, models, schemas
from application.backend import routers
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/items/", response_model=schemas.Item)
def create_item(
    item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_item(db=db, item=item)


@app.get("/items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items


@app.get("/")
async def root():
    return RedirectResponse(url='/html/index.html')


# ===== Routers =====


app.include_router(routers.router)


# ===== end routers =====


app.mount("/", StaticFiles(directory=".."), name="static")
