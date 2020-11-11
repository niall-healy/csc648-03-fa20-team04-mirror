import decimal
from typing import List
from datetime import datetime

from pydantic import BaseModel

"""
This file has the Pydantic models that are used to mirror the database tables as python objects.
This allows fastAPI to do some cool things like send http responses of json objects that match these classes.
"""


# =====Category=====
class CategoryReturn(BaseModel):
    category: str = None

    class Config:
        orm_mode = True


class Category(CategoryReturn):
    id: int = None

    class Config:
        orm_mode = True


# =====Listing=====
class PhotoPath(BaseModel):
    id: int = None
    path: str = None
    listing_id: int = None

    class Config:
        orm_mode = True


class ListingBase(BaseModel):  # Shared attributes for creating and reading data
    name: str
    description: str
    price: int
    category: str


class ListingCreate(ListingBase):  # Create everything in the base
    pass


class Listing(ListingBase):  # Reading to return from API
    id: int
    seller_id: int = None
    timestamp: datetime = None
    photoPaths: List[PhotoPath] = []

    isApproved: bool = None
    isActive: bool = None

    class Config:
        orm_mode = True  # Read as ORM model


# =====Books=====
class Books(Listing):
    relevantClass: str

    class Config:
        orm_mode = True


# =====Housing=====
class Housing(Listing):
    streetAddress: str

    class Config:
        orm_mode = True


# =====Automotive=====
class Automotive(Listing):
    listingId: int
    year: int
    make: str
    model: str
    odometer: int
    titleStatus: str
    fuel: str

    class Config:
        orm_mode = True


# =====Message=====
class MessageBase(BaseModel):
    messageContents: str


class MessageCreate(MessageBase):
    pass


class Message(MessageBase):
    messageId: int
    threadId: int
    senderId: int
    timestamp: datetime

    class Config:
        orm_mode = True


# =====Message Thread=====
class MessageThreadBase(BaseModel):
    messages: List[Message]


class MessageThreadCreate(MessageThreadBase):
    pass


class MessageThread(MessageThreadBase):
    threadId: int
    sellerId: int
    buyerId: int
    timestamp: datetime

    class Config:
        orm_mode = True


# =====User=====
class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    password_hash: str
    messageThreads: List[MessageThread] = []
    listings: List[Listing] = []
    isAdmin: bool

    class Config:
        orm_mode = True
