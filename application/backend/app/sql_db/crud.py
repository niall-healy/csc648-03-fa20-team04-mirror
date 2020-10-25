from sqlalchemy.orm import Session

from app.sql_db import models


def get_listings_for_search(db: Session, searchQuery: str, category: str):
    if len(searchQuery) == 0:
        retVal = db.query(models.Listing).all()
    elif category != 'Any':
        # Note: use like() for case sensitivity, ilike() for case insensitivity
        retVal = db.query(models.Listing).filter(models.Listing.name.ilike('%' + searchQuery + '%'),
                                                 models.Listing.category == category).all()
    else:
        retVal = db.query(models.Listing).filter(models.Listing.name.ilike('%' + searchQuery + '%')).all()

    return retVal
