from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from app.api.upload import (
    router as upload_router
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5182",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://localhost:5178",
        "http://localhost:5179"
        "http://localhost:5180",
        "http://localhost:5181",
        "http://localhost:5182",
        "http://localhost:5183",
        "http://localhost:5184",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(
    upload_router,
    prefix="/api/upload",
    tags=["Upload"]
)
