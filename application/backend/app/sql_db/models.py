from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Numeric, ARRAY
from sqlalchemy.orm import relationship

from app.sql_db.database import Base

"""
This file has the SQLAlchemy database models that are used to generate the database tables.
It will have much more in the future as we add users, etc.
"""


# =====Main Tables=====

class Listing(Base):
    __tablename__ = 'listing'

    listingId = Column(Integer, primary_key=True, index=True)
    #    sellerId = Column(Integer, ForeignKey('user.userId'))  # ForeignKey constrains data to match userId
    name = Column(String(32), index=True)
    timestamp = Column(DateTime)
    description = Column(String(32), index=True)
    price = Column(Numeric)  # Fixed precision number for price
    category = Column(String(32), index=True)
    photo = Column(ARRAY(String(32)))  # Array of file paths to each photo, or we can store blobs
    isApproved = Column(Boolean, default=False)
    isActive = Column(Boolean, default=False)


class MessageThread(Base):
    __tablename__ = 'message_thread'

    threadId = Column(Integer, primary_key=True, index=True)
    sellerId = Column(Integer, ForeignKey('user.userId'))
    buyerId = Column(Integer, ForeignKey('user.userId'))

    messages = relationship('Message', backref='messageThread')


class Message(Base):
    __tablename__ = 'message'

    messageId = Column(Integer, primary_key=True, index=True)
    threadId = Column(Integer, ForeignKey('message_thread.threadId'))
    senderId = Column(Integer, ForeignKey('user.userId'))
    messageContents = Column(String)
    timestamp = Column(DateTime)


class Category(Base):
    __tablename__ = 'category'

    books = Column(ARRAY(Integer), primary_key=True)  # Required to make at least one field primary key even if not used
    housing = Column(ARRAY(Integer))
    services = Column(ARRAY(Integer))
    household = Column(ARRAY(Integer))
    electronics = Column(ARRAY(Integer))
    automotive = Column(ARRAY(Integer))
    games = Column(ARRAY(Integer))
    beauty = Column(ARRAY(Integer))
    outdoors = Column(ARRAY(Integer))
