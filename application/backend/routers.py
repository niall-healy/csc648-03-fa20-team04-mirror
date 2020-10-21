from fastapi import APIRouter

from sqlalchemy.orm import Session

from application.backend import crud

router = APIRouter()


# TODO - has not been tested yet

# returns a JSON formatted response of listings from the %like search
@router.get("/search/{db}{query_string}")
async def read_listings(db: Session, query_string: str):
    return {"listings", crud.get_posts_for_search(db, query_string)}