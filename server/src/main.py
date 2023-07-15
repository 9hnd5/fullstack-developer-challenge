from fastapi import FastAPI
from .modules.histogram.router import router as histogram_router
from .database import SessionLocal, engine
from .modules.histogram.models import Base as histogram_base_model
from fastapi.middleware.cors import CORSMiddleware

histogram_base_model.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


origins = ["http://localhost:5173", "http://localhost"]


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(histogram_router)
