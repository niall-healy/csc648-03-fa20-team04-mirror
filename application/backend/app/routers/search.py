from starlette.responses import RedirectResponse

from app.sql_db import crud, schemas
from app.sql_db.database import get_db

from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse

from sqlalchemy.orm import Session

from typing import List

"""
This file is used to route HTTP requests from the frontend to the appropriate place in the backend.
"""

# instantiates an APIRouter
router = APIRouter()


# returns a JSON formatted response of listings from the %like search
@router.get("/search/", response_model=List[schemas.Listing])
async def read_listings(keywords: str, category: str, db: Session = Depends(get_db)):
    return crud.get_listings_for_search(db, keywords, category)


# returns results html page
@router.get("/results/", response_class=HTMLResponse)
async def get_results_page():
    with open("/var/www/html/results.html") as f:
        html = f.read()

    return html


# returns list of categories
@router.get("/categories/", response_model=List[schemas.CategoryReturn])
async def get_categories(db: Session = Depends(get_db)):
    return crud.get_all_categories(db)
