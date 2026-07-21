from jose import jwt
from datetime import datetime
from datetime import timedelta

SECRET_KEY = "RecruitmentAnalyticsSecretKey123"
ALGORITHM = "HS256"


def create_access_token(
    data: dict
):

    payload = data.copy()

    expire = (
        datetime.utcnow()
        + timedelta(hours=24)
    )

    payload.update(
        {"exp": expire}
    )

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )