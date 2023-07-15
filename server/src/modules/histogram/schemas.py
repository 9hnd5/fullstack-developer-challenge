from pydantic import BaseModel, field_validator
from requests.models import PreparedRequest
from fastapi.exceptions import RequestValidationError
import requests.exceptions


class HistogramBase(BaseModel):
    pass


class HistogramCreate(HistogramBase):
    url: str
    words: str

    class Config:
        from_attributes = True


class HistogramQuery(HistogramBase):
    url: str

    @field_validator("url")
    def must_be_url(cls, v):
        prepared_request = PreparedRequest()
        try:
            prepared_request.prepare_url(v, None)
            return prepared_request.url
        except requests.exceptions.MissingSchema as e:
            raise RequestValidationError(
                [{"loc": ["query", "url"], "msg": "Invalid URL"}]
            )


class Histogram(HistogramBase):
    url: str
    words: str

    class Config:
        from_attributes = True
