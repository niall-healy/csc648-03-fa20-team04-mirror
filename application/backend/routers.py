from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from application.backend import crud
from application.backend.main import get_db

router = APIRouter()


# TODO - has not been tested yet

# returns a JSON formatted response of listings from the %like search
@router.get("/search/{query_string}")
async def read_listings(query_string: str, db: Session = Depends(get_db)):
    return {"listings", crud.get_posts_for_search(db, query_string)}