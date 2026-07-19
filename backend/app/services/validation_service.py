REQUIRED_COLUMNS = [
    "PPR ID",
    "Sourced Date",
    "Screening Date",
    "Technical Interview Date",
    "Tool Test Date",
    "CF Date",
    "Final Select Date",
    "Recruiter Name",
    "Interviewer Name",
    "Vertical",
    "Domain",
    "Source",
    "Sub Source",
    "First Name",
    "Contact No",
    "Email Id",
    "Gender",
    "Current Company",
    "Current Designation",
    "Overall Experience",
    "Current CTC",
    "Expected CTC",
    "Current Location",
    "Preferred Location",
    "Notice Period",
    "Offered CTC LPA",
    "Offered Designation",
    "Reporting Supervisor",
    "Reporting Manager",
    "Joining Date",
    "TA Status"
]
import pandas as pd


def validate_columns(df):
    missing_columns = [
        col
        for col in REQUIRED_COLUMNS
        if col not in df.columns
    ]

    return missing_columns
def find_duplicate_ppr(df):

    if "PPR ID" not in df.columns:
        return []

    duplicates = df[
        df["PPR ID"].duplicated()
    ]["PPR ID"].tolist()

    return duplicates
import re


def find_invalid_emails(df):

    if "Email Id" not in df.columns:
        return []

    email_pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'

    invalid_emails = []

    for email in df["Email Id"].dropna():

        if not re.match(email_pattern, str(email)):
            invalid_emails.append(email)

    return invalid_emails
