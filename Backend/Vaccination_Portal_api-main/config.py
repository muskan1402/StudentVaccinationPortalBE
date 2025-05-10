import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "postgresql://postgres:Muskan_1402@localhost/VaccPortal"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
