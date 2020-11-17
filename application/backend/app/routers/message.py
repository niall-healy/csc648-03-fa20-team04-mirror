from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session

from app.sql_db import schemas, crud
from app.sql_db.database import get_db

router = APIRouter()


@router.post("/", response_model=schemas.Message)
async def create_message(db: Session = Depends(get_db),
                         message: str = Form(...),
                         listing_id: int = Form(...)):
    return crud.create_message(db, message, listing_id)


"""
@router.get("/", response_model=schemas.Message)
async def get_message_by_seller_id(db: Session = Depends(get_db()),
                                    id: int):
"""