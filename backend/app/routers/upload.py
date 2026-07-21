from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import SessionLocal
from app.models import RecruitmentRecord

import pandas as pd

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/excel")
async def upload_excel(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    df = pd.read_excel(
        file.file
    )

    for _, row in df.iterrows():

        record = RecruitmentRecord(

            candidate_name=str(
                row.get(
                    "First Name",
                    ""
                )
            ),

            recruiter_name=str(
                row.get(
                    "Recruiter Name",
                    ""
                )
            ),

            vertical=str(
                row.get(
                    "Vertical",
                    ""
                )
            ),

            ta_status=str(
                row.get(
                    "TA Status",
                    ""
                )
            ),

            current_company=str(
                row.get(
                    "Current Company",
                    ""
                )
            ),

            current_ctc=str(
                row.get(
                    "Current CTC",
                    ""
                )
            ),

            expected_ctc=str(
                row.get(
                    "Expected CTC",
                    ""
                )
            ),

            offered_ctc=str(
                row.get(
                    "Offered CTC LPA",
                    ""
                )
            ),

            notice_period=str(
                row.get(
                    "Notice Period",
                    ""
                )
            )

        )

        db.add(record)

    db.commit()

    return {
        "message":
        "File Uploaded Successfully",
        "rows":
        len(df)
    }

    df = pd.read_excel(
        file.file
    )

    return {
        "rows": len(df),
        "columns": list(df.columns)
    }