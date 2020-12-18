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

@router.post("/deactivate/")
async def deactivate_user_account(db: Session = Depends(get_db), user: schemas.User = Depends(get_current_user)):
    return crud.deactivate_user_account(db, user)

@router.post("/changePassword/")
async def change_user_password(db: Session = Depends(get_db), 
                                user: schemas.User = Depends(get_current_user),
                                currentpassword: str = Form(...),
                                newpassword: str = Form(...),
                                newpassword2: str = Form(...)):
    if (newpassword != newpassword2)
        return None
    
    return crud.change_user_password(db, user)

@router.get("/", response_model=schemas.UserBase)
async def get_user_info(db: Session = Depends(get_db), user: schemas.User = Depends(get_current_user)):
    return user

