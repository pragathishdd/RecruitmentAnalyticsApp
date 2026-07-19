from dotenv import load_dotenv
import os

load_dotenv()

APP_NAME = os.getenv("APP_NAME")
APP_VERSION = os.getenv("APP_VERSION")
MAX_UPLOAD_SIZE_MB = int(
    os.getenv("MAX_UPLOAD_SIZE_MB", 25)
)