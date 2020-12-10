from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.sql_db import schemas, crud
from app.sql_db.database import get_db

from pydantic import BaseModel

router = APIRouter()

class Message(BaseModel):
    message: str
    listing_id: int

@router.post("/", response_model=schemas.Message)
async def create_message(message: Message,
                         db: Session = Depends(get_db)):
    return crud.create_message(db, message, listing_id)


"""
@router.get("/", response_model=schemas.Message)
async def get_message_by_seller_id(db: Session = Depends(get_db()),
                                    id: int):
"""