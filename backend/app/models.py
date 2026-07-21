from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from datetime import datetime
from .database import Base

class Upload(Base):

    __tablename__ = "uploads"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    file_name = Column(
        String,
        nullable=False
    )

    uploaded_by = Column(
        Integer,
        ForeignKey("users.id")
    )

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )

class RecruitmentRecord(Base):

    __tablename__ = "recruitment_records"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    candidate_name = Column(
        String
    )

    recruiter_name = Column(
        String
    )

    vertical = Column(
        String
    )

    ta_status = Column(
        String
    )

    current_company = Column(
        String
    )

    current_ctc = Column(
        String
    )

    expected_ctc = Column(
        String
    )

    offered_ctc = Column(
        String
    )

    notice_period = Column(
        String
    )

    uploaded_by = Column(
        Integer
    )

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    first_name = Column(
        String,
        nullable=False
    )

    last_name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )