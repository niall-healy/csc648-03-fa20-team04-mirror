import decimal
from typing import List
from datetime import datetime

from pydantic import BaseModel


# =====Listing=====
class ListingBase(BaseModel):  # Shared attributes for creating and reading data
    name: str
    description: str
    price: int
    category: str


class ListingCreate(ListingBase):  # Create everything in the base
    pass


class Listing(ListingBase):  # Reading to return from API
    listingId: int
    sellerId: int
    timestamp: datetime
    isApproved: bool
    isActive: bool

    class Config:
        orm_mode = True  # Read as ORM model


# =====Books=====
#class Books(Listing):
#    relevantClass: str
#
#    class Config:
#        orm_mode = True
#
#
## =====Housing=====
#class Housing(Listing):
#    streetAddress: str
#
#    class Config:
#        orm_mode = True
#
#
## =====Automotive=====
#class Automotive(Listing):
#    listingId: int
#    year: int
#    make: str
#    model: str
#    odometer: int
#    titleStatus: str
#    fuel: str
#
#    class Config:
#        orm_mode = True
#
#

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
    username: str
    phone: str
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    userId: int
    messageThreads: List[MessageThread] = []
    listings: List[Listing] = []
    isAdmin: bool

    class Config:
        orm_mode = True


# =====Category=====
class Category(BaseModel):
    books: List[int]
    housing: List[int]
    services: List[int]
    household: List[int]
    electronics: List[int]
    automotive: List[int]
    games: List[int]
    beauty: List[int]
    outdoors: List[int]

    class Config:
        orm_mode = True
