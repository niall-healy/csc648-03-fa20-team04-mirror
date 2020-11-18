from starlette.responses import RedirectResponse

from app.sql_db import crud, schemas
from app.sql_db.database import get_db

from fastapi import APIRouter, Depends, Query

from fastapi.responses import HTMLResponse

from sqlalchemy.orm import Session

from typing import List

router = APIRouter()

# Attempts to return the specified number of recently viewed items
@router.get("/items/", response_model=List[schemas.Listing])
async def read_items(numItems: int, ids: List[int] = Query(None), db: Session = Depends(get_db)):
    return crud.get_item_list_by_ids(db, ids, numItems)


# Attempts to return the specified number of the newest listings
@router.get("/newest/{numItems}", response_model=List[schemas.Listing])
async def read_listings(numItems: int, db: Session = Depends(get_db)):
    return crud.get_newest_listings(db, numItems)

