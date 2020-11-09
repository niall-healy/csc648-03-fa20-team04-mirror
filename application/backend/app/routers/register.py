from fastapi import APIRouter, Form, Depends, HTTPException
from sqlalchemy.orm import Session

from app.sql_db import schemas, crud
from app.sql_db.database import get_db

router = APIRouter()


@router.post("/")
async def create_user(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = schemas.UserCreate(email=username, password=password)
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)