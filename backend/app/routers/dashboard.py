from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import RecruitmentRecord

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

@router.get("/records")
def get_records(
    db: Session = Depends(get_db)
):

    records = (
        db.query(
            RecruitmentRecord
        ).all()
    )

    result = []

    for item in records:

        result.append({

            "First Name":
                item.candidate_name,

            "Recruiter Name":
                item.recruiter_name,

            "Vertical":
                item.vertical,

            "TA Status":
                item.ta_status,

            "Current Company":
                item.current_company,

            "Current CTC":
                item.current_ctc,

            "Expected CTC":
                item.expected_ctc,

            "Offered CTC LPA":
                item.offered_ctc,

            "Notice Period":
                item.notice_period

        })

    return {
       
"records": result,
    "recruiter_performance": [],
    "vertical_analysis": [],
    "hiring_trend": {
        "monthly": [],
        "quarterly": [],
        "yearly": []
    },
    "data_quality_score": 100

    }