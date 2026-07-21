
import pandas as pd


def calculate_tat(df):
    print(df.columns.tolist())
    required_columns = [
        "Sourced Date",
        "Screening Date",
        "Technical Interview Date",
        "Tool Test Date",
        "CF Date",
        "Final Select Date",
        "Joining Date",
    ]

    if not all(
        column in df.columns
        for column in required_columns
    ):
        return {}

    for column in required_columns:
        df[column] = pd.to_datetime(
            df[column],
            errors="coerce",
        )

    screening_tat = (
        df["Screening Date"]
        - df["Sourced Date"]
    ).dt.days.mean()

    technical_tat = (
        df["Technical Interview Date"]
        - df["Screening Date"]
    ).dt.days.mean()

    tool_tat = (
        df["Tool Test Date"]
        - df["Technical Interview Date"]
    ).dt.days.mean()

    cultural_fitment_tat = (
        df["CF Date"]
        - df["Tool Test Date"]
    ).dt.days.mean()

    offer_tat = (
        df["Final Select Date"]
        - df["CF Date"]
    ).dt.days.mean()

    joining_tat = (
        df["Joining Date"]
        - df["Final Select Date"]
    ).dt.days.mean()

    total_tat = (
        df["Joining Date"]
        - df["Sourced Date"]
    ).dt.days.mean()

    return {
        "screening_tat": round(
            screening_tat or 0,
            2,
        ),
        "technical_tat": round(
            technical_tat or 0,
            2,
        ),
        "tool_tat": round(
            tool_tat or 0,
            2,
        ),
        "cultural_fitment_tat": round(
            cultural_fitment_tat or 0,
            2,
        ),
        "offer_tat": round(
            offer_tat or 0,
            2,
        ),
        "joining_tat": round(
            joining_tat or 0,
            2,
        ),
        "total_tat": round(
            total_tat or 0,
            2,
        ),
    }
