from sqlalchemy.orm import Session

from . import models


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_posts_for_search(db: Session, searchQuery: str):
    """
    This assumes that the model for our posts is called Post
    Likewise, it compares the search query to Post's title column
    """
    # TODO: This method has not been tested
    if len(searchQuery) == 0:
        return db.query(models.Post).all()
    else:
        # Note: use like() for case sensitivity, ilike() for case insensitivity
        return db.query(models.Post).filter(models.Post.title.ilike('%' + searchQuery + '%')).all() 