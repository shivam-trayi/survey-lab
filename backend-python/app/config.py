import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from backend-python directory
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

HOST = os.getenv("PYTHON_HOST", "0.0.0.0")
PORT = int(os.getenv("PYTHON_PORT", "8000"))
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5000,http://localhost:5173").split(",")
SERVICE_NAME = "survey-lab-backend-python"
SERVICE_VERSION = "1.0.0"
