from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

import crud

from main import get_db 

router = APIRouter()


# TODO - has not been tested yet

# returns a JSON formatted response of listings from the %like search
@router.get("/search/")
async def read_listings(keywords: str, category: str, db: Session = Depends(get_db)):
    return {"listings", crud.get_listings_for_search(db, keywords, category)}
