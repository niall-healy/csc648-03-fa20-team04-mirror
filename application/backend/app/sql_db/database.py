from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

"""
This file is for connecting to MySQL database, creating SQLAlchemy engine for communication with database,
creating a SessionLocal class for future instantiation of database session,
creating a Base class to be inherited from for future creation of database(ORM) models and classes, and
creating a dependency to instantiate a new SessionLocal for each request that auto closes.

Author: Lukas Pettersson
"""

# Connect to MySQL database
SQLALCHEMY_DATABASE_URL = 'mysql+mysqlconnector://root:team4@localhost:3306/CSC648Project'

# SQLAlchemy engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class
Base = declarative_base()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

