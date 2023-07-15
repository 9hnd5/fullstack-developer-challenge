from fastapi import APIRouter, Depends
from .service import HistogramService
from .schemas import HistogramQuery
router = APIRouter()


@router.get("/histogram")
def get_word_histogram(
    query: HistogramQuery = Depends(HistogramQuery),
    histogramService: HistogramService = Depends(HistogramService),
):
    return histogramService.find(query.url)
