from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Numeric, ARRAY
from sqlalchemy.orm import relationship

from app.sql_db.database import Base

"""
This file has the SQLAlchemy database models that are used to generate the database tables.
It will have much more in the future as we add users, etc.
"""


class Listing(Base):
    __tablename__ = 'listing'

    listingId = Column(Integer, primary_key=True, index=True)
    #    sellerId = Column(Integer, ForeignKey('user.userId'))  # ForeignKey constrains data to match userId
    name = Column(String(32), index=True)
    timestamp = Column(DateTime)
    description = Column(String(32), index=True)
    price = Column(Numeric)  # Fixed precision number for price
    category = Column(String(32), index=True)
    photo = Column(String(32))  # Array of file paths to each photo, or we can store blobs
    isApproved = Column(Boolean, default=False)
    isActive = Column(Boolean, default=False)
