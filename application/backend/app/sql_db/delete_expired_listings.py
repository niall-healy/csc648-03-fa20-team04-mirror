import datetime
import time
import threading

from sqlalchemy.orm import Session

from app.sql_db import models

 """
 This file is used to define an object that handles the deletion of expired listings
 """


 # object that creates thread a thread and sets up a run loop that runs once a day
class DeleteOldListings(object):
    def __init__(self, interval=86400):
        self.interval = interval

        thread = threading.Thread(target=self.run, args=())
        thread.daemon = True
        thread.start()

    def run(self):
        while True:
            delete_expired_listings(db: Session = Depends(get_db))
            time.sleep(self.interval)


#delete all the listings that are 30 days or older
def delete_expired_listings(db: Session):
    listings = db.query(models.listings).all()
    ids = []
    #find the ids for expired listings
    for listing in listings:
        ref = datetime.now()
        deltatime = (ref + timedelta(days=-30)))
        if(listing.timestamp < deltatime):
            ids.append(listing.id)

    #remove expired listings
    for id in ids:
        db.query(models.Listing).filter(models.Listing.id == id).delete()
