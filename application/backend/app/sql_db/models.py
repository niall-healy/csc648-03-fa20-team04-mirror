from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Numeric, ARRAY
from sqlalchemy.orm import relationship

from app.sql_db.database import Base

"""
This file has the SQLAlchemy database models that are used to generate the database tables.
It will have much more in the future as we add users, etc.
"""


# =====Main Tables=====

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    # messageThreads = relationship("MessageThread", back_populates="sellerId", passive_deletes=True)
    listings = relationship("Listing", backref="seller", cascade="all, delete-orphan", passive_deletes=True)

    def __repr__(self):
        return "%s(%r)" % (self.__class__, self.__dict__)


class Listing(Base):
    __tablename__ = 'listing'

    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey('user.userId'))  # ForeignKey constrains data to match userId
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

    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey('user.userId'))
    buyer_id = Column(Integer, ForeignKey('user.userId'))

    messages = relationship('Message', backref='messageThread')


class Message(Base):
    __tablename__ = 'message'

    id = Column(Integer, primary_key=True, index=True)
    thread_id = Column(Integer, ForeignKey('message_thread.threadId'))
    sender_id = Column(Integer, ForeignKey('user.userId'))
    messageContents = Column(String)
    timestamp = Column(DateTime)
