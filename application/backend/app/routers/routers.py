from typing import List

from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.sql_db import crud, schemas

from app.sql_db.database import get_db

router = APIRouter()

# TODO - has not been tested yet

# returns a JSON formatted response of listings from the %like search
@router.get("/search/", response_model=List[schemas.Listing])
async def read_listings(keywords: str, category: str, db: Session = Depends(get_db)):
    return crud.get_listings_for_search(db, keywords, category)

