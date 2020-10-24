from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Numeric, ARRAY
from sqlalchemy.orm import relationship

from app.sql_db.database import Base


# =====Main Tables=====
# class User(Base):
#    __tablename__ = 'user'
#
#    userId = Column(Integer, primary_key=True, index=True)  # primary_key is used to identify distinct rows
#    username = Column(String, unique=True, index=True)  # unique disallows duplicate usernames
#    phone = Column(String, unique=True, index=True)  # index optimizes look up at cost of storage
#    email = Column(String, unique=True, index=True)
#    password = Column(String)
#    isAdmin = Column(Boolean, default=False)
#
#    messageThreads = relationship('MessageThread', backref='user')  # A user can have many message threads
#    listings = relationship('Listing', backref='user')  # A user can have many listings
#


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

    # Using Joined Table Inheritance (https://docs.sqlalchemy.org/en/13/orm/inheritance.html)
    # Single Table Inheritance represents all attributes of all subclasses in a single table, simple but inefficient
    # Concrete Table Inheritance maps each subclass to its own table with only the columns necessary, but
    # difficult to implement, limited in functionality, and can have bad performance
#    __mapper_args__ = {
#        'polymorphic_identity': 'listing',
#        'polymorphic_on': type
#    }


# class MessageThread(Base):
#    __tablename__ = 'message_thread'
#
#    threadId = Column(Integer, primary_key=True, index=True)
#    sellerId = Column(Integer, ForeignKey('user.userId'))
#    buyerId = Column(Integer, ForeignKey('user.userId'))
#
#    messages = relationship('Message', backref='messageThread')
#
#
# class Message(Base):
#    __tablename__ = 'message'
#
#    messageId = Column(Integer, primary_key=True, index=True)
#    threadId = Column(Integer, ForeignKey('message_thread.threadId'))
#    senderId = Column(Integer, ForeignKey('user.userId'))
#    messageContents = Column(String)
#    timestamp = Column(DateTime)
#

# class Category(Base):
#    __tablename__ = 'category'
#
#    books = Column(ARRAY(Integer), primary_key=True)  # Required to make at least one field primary key even if not used
#    housing = Column(ARRAY(Integer))
#    services = Column(ARRAY(Integer))
#    household = Column(ARRAY(Integer))
#    electronics = Column(ARRAY(Integer))
#    automotive = Column(ARRAY(Integer))
#    games = Column(ARRAY(Integer))
#    beauty = Column(ARRAY(Integer))
#    outdoors = Column(ARRAY(Integer))
#
#
# =====Sub Tables=====
# class Books(Listing):
#    __tablename__ = 'book'
#
#    listingId = Column(Integer, ForeignKey('listing.listingId'), primary_key=True)
#    relevantClass = Column(String)
#
#    __mapper_args__ = {
#        'polymorphic_identity': 'book',
#    }
#
#
# class Housing(Listing):
#    __tablename__ = 'housing'
#
#    listingId = Column(Integer, ForeignKey('listing.listingId'), primary_key=True)
#    streetAddress = Column(String)
#
#    __mapper_args__ = {
#        'polymorphic_identity': 'housing',
#    }
#
#
# class Automotive(Listing):
#    __tablename__ = 'automotive'
#
#    listingId = Column(Integer, ForeignKey('listing.listingId'), primary_key=True)
#    year = Column(Integer)
#    make = Column(String)
#    model = Column(String)
#    odometer = Column(Integer)
#    titleStatus = Column(String)
#    fuel = Column(String)
#
#    __mapper_args__ = {
#        'polymorphic_identity': 'automotive',
#    }
