from app.sql_db import crud, schemas
from app.sql_db.database import get_db

from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse

from sqlalchemy.orm import Session

from starlette.responses import RedirectResponse

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

@router.get("/s/", response_class=HTMLResponse)
async def read_listings_url(keywords:str, category: str, db: Session = Depends(get_db)):
    listings = crud.get_listings_for_search(db, keywords, category)

    with open('/var/www/html/results.html') as f:
        page = f.read()

    string = '<div id="results">'
    index = page.find(string) + len(string)

    results = ""
    for listing in listings:
        results += "<img src='" + listing.photo + "'>\n"
        results += "<p><b>Item Name: </b> " + listing.name + "</p>\n"
        results += "<p><b>Description: </b> " + listing.description + "</p>\n"
        results += "<p><b>Price: </b> " + str(listing.price) + "</p>\n"
        results += "<br>\n"
    results += "</div>\n"

    html = ""
    html += page[:index]
    html += results
    html += page[index+len(results):]

    return html
