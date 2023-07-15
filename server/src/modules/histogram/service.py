from .ultils import get_website_text, compute_word_histogram
from sqlalchemy.orm import Session
from ...database import get_db
from fastapi import Depends
from . import schemas, models
import json


class HistogramService:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db

    def find(self, url: str):
        existHistogram = self.db.query(models.Histogram).filter(models.Histogram.url == url).first()
        if existHistogram:
            return self.format(histogram = existHistogram)

        website_text = get_website_text(url)
        histogram = compute_word_histogram(website_text)
        data = schemas.HistogramCreate(url=url, words=json.dumps(histogram))
        return self.format(histogram = self.add(data))

    def add(self, data: schemas.HistogramCreate):
        histogram = models.Histogram(url=data.url, words=data.words)
        self.db.add(histogram)
        self.db.commit()
        self.db.refresh(histogram)
        return histogram
    
    def format(self, histogram: models.Histogram):
        histogram.words = json.loads(histogram.words)
        return histogram
