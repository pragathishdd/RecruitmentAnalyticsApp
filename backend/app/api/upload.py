from fastapi import APIRouter, UploadFile, File
import pandas as pd

from app.services.diversity_service import diversity_analysis
from app.services.joined_service import joined_analysis
from app.services.offer_drop_service import (
    offer_drop_analysis
)
from app.services.trend_service import hiring_trend
from app.services.validation_service import (
    validate_columns,
    find_duplicate_ppr,
    find_invalid_emails
)

from app.services.dashboard_service import (
    recruiter_performance
)

from app.services.vertical_service import (
    vertical_analysis
)
from app.services.tat_service import (
    calculate_tat   
)
from app.services.source_service import source_performance

router = APIRouter()


@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Upload API Ready"
    }

@router.post("/excel")
async def upload_excel(
    file: UploadFile = File(...)
):
    df = pd.read_excel(file.file)

    df.columns = df.columns.str.strip()

    missing_columns = validate_columns(df)

    duplicate_ppr = find_duplicate_ppr(df)

    invalid_emails = find_invalid_emails(df)

    total_records = len(df)

    issues = (
        len(missing_columns)
        + len(duplicate_ppr)
        + len(invalid_emails)
    )

    quality_score = max(
        0,
        100 - issues
    )

    status_column_exists = "TA Status" in df.columns

    joined = 0
    offer_dropped = 0
    offer_accepted = 0
    yet_to_offer = 0

    if status_column_exists:
        status_series = (
            df["TA Status"]
            .fillna("")
            .astype(str)
            .str.strip()
        )

    joined = len(
        df[
            status_series.str.lower()
            == "joined"
        ]
    )

    offer_dropped = len(
        df[
            status_series.str.lower()
            == "offer dropped"
        ]
    )

    offer_accepted = len(
        df[
            status_series.str.lower()
            == "offer accepted"
        ]
    )

    yet_to_offer = len(
        df[
            status_series.str.lower()
            .isin([
                "",
                "yet to offer",
                "pending",
                "open"
            ])
        ]
    )

    return {
    "total_records": total_records,
    "missing_columns": missing_columns,
    "duplicate_ppr": duplicate_ppr,
    "invalid_emails": invalid_emails,
    "data_quality_score": quality_score,
    "joined": joined,
    "offer_dropped": offer_dropped,
    "offer_accepted": offer_accepted,
    "yet_to_offer": yet_to_offer,

    "records": df.fillna("")
    .to_dict(orient="records"),

    "diversity": diversity_analysis(df),
    "recruiter_performance": recruiter_performance(df),
    "tat_metrics": calculate_tat(df),
    "vertical_analysis": vertical_analysis(df),
    "source_performance": source_performance(df),
    "offer_drop": offer_drop_analysis(df),
    "joined_analysis": joined_analysis(df),
    "hiring_trend": hiring_trend(df),
}