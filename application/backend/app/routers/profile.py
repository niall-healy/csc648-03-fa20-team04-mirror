from fastapi import APIRouter, Depends, Form, UploadFile, File
from sqlalchemy.orm import Session

from app.routers.login import get_current_user

from app.sql_db import schemas, crud
from app.sql_db.database import get_db

from pydantic import BaseModel

from typing import List
"""
This file contains routers for profile.

Authors: Dale Armstrong
"""

router = APIRouter()

@router.get("/", response_model=schemas.UserBase)
async def get_user_info(db: Session = Depends(get_db), user: schemas.User = Depends(get_current_user)):
    return user

