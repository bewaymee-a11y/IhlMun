import asyncio
import uuid
import bcrypt
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

async def reset_admin():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    # Delete existing admins
    await db.admins.delete_many({})
    
    # Create default admin
    admin = {
        "id": str(uuid.uuid4()),
        "username": "admin",
        "password_hash": hash_password("admin123")
    }
    await db.admins.insert_one(admin)
    print("Admin credentials reset to: username: admin, password: admin123")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(reset_admin())
