from fastapi import FastAPI

from app.database import Base
from app.database import engine
from app.routers.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.database import SessionLocal

from app.routers.dashboard import (
    router as dashboard_router
)

from app.routers.upload import (
    router as upload_router
)

import app.models

Base.metadata.create_all(
    bind=engine
)

app = FastAPI()

app.include_router(
    upload_router
)


app.include_router(
    dashboard_router
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
        "https://recruitment-analytics-app.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    auth_router
)


@app.get("/")
def health():
    return {
        "message":
        "Recruitment Analytics API Running"
    }


@app.get("/db-test")
def db_test():

    db = SessionLocal()

    try:
        db.execute("SELECT 1")
        return {"status": "connected"}

    except Exception as e:
        return {"error": str(e)}

    finally:
        db.close()
