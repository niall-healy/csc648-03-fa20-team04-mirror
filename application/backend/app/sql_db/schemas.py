import decimal
from typing import List
from datetime import datetime

from pydantic import BaseModel

"""
This file has the Pydantic models that are used to mirror the database tables as python objects.
This allows fastAPI to do some cool things like send http responses of json objects that match these classes.
"""


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
    sellerId: int = None
    timestamp: datetime = None
    photo: str
    isApproved: bool = None
    isActive: bool = None

    class Config:
        orm_mode = True  # Read as ORM model
