from sqlalchemy import Column, Integer, String

from ...database import Base


class Histogram(Base):
    __tablename__ = "histogram"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, index=True)
    words = Column(String)

