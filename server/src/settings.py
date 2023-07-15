from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from dotenv import find_dotenv
import os

env = os.getenv("ENV")


class Settings(BaseSettings):
    sqlalchemy_database_url: str

    model_config = SettingsConfigDict(
        env_file=find_dotenv("." + env + ".env"),
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


@lru_cache()
def get_settings():
    return Settings()
