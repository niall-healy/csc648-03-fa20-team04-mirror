from app.routers.login import get_current_user
from app.sql_db import crud, schemas
from app.sql_db.database import get_db

from fastapi import APIRouter, Depends, Form, UploadFile, File
from fastapi.responses import HTMLResponse

from sqlalchemy.orm import Session

from typing import List

import os.path
import uuid

# instantiates an APIRouter
router = APIRouter()


# get listing html page
@router.get("/", response_class=HTMLResponse)
async def get_listing_page():
    with open("/var/www/html/listing.html") as f:
        html = f.read()

    return html


# get listing
@router.get("/getListing/", response_model=schemas.Listing)
async def get_listing(id: int, db: Session = Depends(get_db)):
    return crud.get_listing_by_id(db, id)


# post listing
@router.post("/", response_model=schemas.Listing)
async def create_listing(db: Session = Depends(get_db),
                         user: schemas.User = Depends(get_current_user),
                         name: str = Form(...),
                         price: int = Form(...),
                         category: str = Form(...),
                         description: str = Form(...),
                         images: List[UploadFile] = File(...)):
    # create new listing object
    listing = schemas.Listing(name=name, description=description, price=price, category=category,
                              seller_id=user.id)
    photoPaths = []

    for file in images:
        # create random file name
        file.filename = str(uuid.uuid4())
        thumbnailName = str(uuid.uuid4())

        # construct file path
        path = "/images/" + file.filename
        thumbnailPath = "/images/" + thumbnailName
        fileType = file.content_type.split('/', 1)[1]
        fileType = '.' + fileType

        photoPaths.append((path + fileType, thumbnailPath + fileType))

        # put the file in the /images/directory
        newFile = open('/var/www/images/' + file.filename + fileType, 'w+b')
        newThumbnailFile = open('/var/www/images/' + thumbnailName + fileType, 'w+b')

        # TODO: Resize image to thumbnail size and store it in newThumbnailFile
        # Read image data to new file
        while True:
            byte = await file.read(1)
            if not byte:
                break
            newFile.write(byte)

        newFile.close()

    return crud.create_listing(db, listing, photoPaths)
