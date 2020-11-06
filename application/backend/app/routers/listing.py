from app.sql_db import crud, schemas
from app.sql_db.database import get_db

from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse

from sqlalchemy.orm import Session

from typing import List

# instantiates an APIRouter
router = APIRouter()


# get listing

@router.get("/", response_model=schemas.Listing)
async def get_listing(listingId: int, db: Session = Depends(get_db)):
    return crud.get_listing_by_id(db, listingId)


# post listing

@router.post("/", response_model=schemas.Listing)
async def create_listing(db: Session = Depends(get_db)):
    return crud.create_listing(db, schemas.ListingCreate)

