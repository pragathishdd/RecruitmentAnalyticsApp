from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.security import (
    create_access_token
)

from passlib.context import CryptContext

from app.database import SessionLocal
from app.models import User
from app.schemas import UserCreate
from app.schemas import UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

@router.post("/register")
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    try:

        existing_user = (
            db.query(User)
            .filter(
                User.email == user.email
            )
            .first()
        )

        if existing_user:

            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        hashed_password = pwd_context.hash(
            user.password
        )

        new_user = User(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            password_hash=hashed_password
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message":
            "Account created successfully"
        }

    except Exception as e:

        return {
            "error": str(e)
        }

@router.post("/login")
def login_user(

    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = (
        db.query(User)
        .filter(
            User.email == user.email
        )
        .first()
    )

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not pwd_context.verify(
        user.password,
        db_user.password_hash
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    
    token = create_access_token(
    {
        "sub": db_user.email
    }
)


    token = create_access_token(
    {
        "sub": db_user.email
    }
)

    return {
    "access_token": token,
    "token_type": "bearer",
    "user": {
        "id": db_user.id,
        "first_name": db_user.first_name,
        "last_name": db_user.last_name,
        "email": db_user.email
    }
}