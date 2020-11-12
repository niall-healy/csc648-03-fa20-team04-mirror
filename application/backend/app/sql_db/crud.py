import datetime

from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.sql_db import models, schemas
from passlib.hash import bcrypt

"""
This file is used for the 4 big interactions with the database: create, read, update, & delete.
For now all it does is the search logic for the vertical prototype. 
There will be much more here in the future
"""


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_pw = bcrypt.hash(user.password)
    db_user = models.User(email=user.email, password_hash=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


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


def get_listing_by_id(db: Session, listingId: int):
    retVal = db.query(models.Listing).filter(models.Listing.id == listingId).first()

    return retVal


def create_listing(db: Session, listing: schemas.Listing, photoPaths):
    # Create listing object
    db_listing = models.Listing(**listing.dict())
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)

    # Grab newly created listing from db
    db_listing = db.query(models.Listing).order_by(models.Listing.id.desc()).first()

    # Create PhotoPath objects for each photo path and add to the listing object
    for path in photoPaths:
        pathObj = models.PhotoPath()
        pathObj.path = path
        pathObj.listing_id = db_listing.id
        db_listing.photoPaths.append(pathObj)

    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)

    return db_listing


def get_all_categories(db: Session):
    return db.query(models.Category).all()



