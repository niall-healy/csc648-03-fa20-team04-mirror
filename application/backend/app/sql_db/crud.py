from sqlalchemy.orm import Session

from app.sql_db import models

"""
This file is used for the 4 big interactions with the database: create, read, update, & delete.
For now all it does is the search logic for the vertical prototype. 
There will be much more here in the future
"""


def get_listings_for_search(db: Session, searchQuery: str, category: str):
    if len(searchQuery) == 0:
        if category == 'Any':
            retVal = db.query(models.Listing).all()
        else:
            retVal = db.query(models.Listing).filter(models.Listing.category == category).all()
    elif category != 'Any':
        # Note: use like() for case sensitivity, ilike() for case insensitivity
        retVal = db.query(models.Listing).filter(models.Listing.name.ilike('%' + searchQuery + '%'),
                                                 models.Listing.category == category).all()
    else:
        retVal = db.query(models.Listing).filter(models.Listing.name.ilike('%' + searchQuery + '%')).all()

    return retVal
