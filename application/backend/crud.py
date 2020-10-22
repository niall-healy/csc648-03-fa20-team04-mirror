from sqlalchemy.orm import Session

from . import models


# def get_items(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Item).offset(skip).limit(limit).all()
#
#
# def create_item(db: Session, item: schemas.ItemCreate):
#     db_item = models.Item(**item.dict())
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item


def get_listings_for_search(db: Session, searchQuery: str, category: str):
    """
    This assumes that the model for our listings is called Listing
    Likewise, it compares the search query to Listing's title column
    """
    # TODO: This method has not been tested
    if len(searchQuery) == 0:
        return db.query(models.Listing).all()
    else:
        # Note: use like() for case sensitivity, ilike() for case insensitivity
        return db.query(models.Listing).filter(models.Listing.name.ilike('%' + searchQuery + '%'),
                                               models.Listing.category == category).all()
