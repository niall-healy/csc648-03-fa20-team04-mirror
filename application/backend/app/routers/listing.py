from app.sql_db import crud, schemas
from app.sql_db.database import get_db

from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse

from sqlalchemy.orm import Session

from typing import List

import os.path
import uuid
# instantiates an APIRouter
router = APIRouter()


# get listing

@router.get("/getListing/", response_model=schemas.Listing)
async def get_listing(id: int, db: Session = Depends(get_db)):
    return crud.get_listing_by_id(db, id)


# post listing

@router.post("/", response_model=schemas.Listing)
async def create_listing(db: Session = Depends(get_db),
                         user: schemas.User = Depends(get_current_user),
                         Name: str = Form(...),
                         price: str = Form(...),
                         category: str = Form(...),
                         description: str = Form(...),
                         images: List[UploadFile] = File(...)
                         ):

    photo_paths = []
    # store file in directory
    for file in images:
        # create random file name
        file.filename = str(uuid.uuid4())
        # append this filename to the end of the file_names
        path = "/images/" + file.filename
        photo_paths.append(schemas.PhotoPath(path=path))
        # put the file in the /images/directory
        os.path.join("/images/", file)  # not sure if this is going to work

    listing = schemas.Listing(name=Name, description=description, price=price, category=category,
                              photoPaths=photo_paths,seller_id=user.id)

    return crud.create_listing(db,listing)
  