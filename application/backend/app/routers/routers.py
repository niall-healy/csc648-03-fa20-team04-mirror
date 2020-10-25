from typing import List

from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.sql_db import crud, schemas

from app.sql_db.database import get_db

"""
This file is used to route HTTP requests from the frontend to the appropriate place in the backend.
"""

# instantiates an APIRouter
router = APIRouter()


# returns a JSON formatted response of listings from the %like search
@router.get("/search/", response_model=List[schemas.Listing])
async def read_listings(keywords: str, category: str, db: Session = Depends(get_db)):
    return crud.get_listings_for_search(db, keywords, category)
