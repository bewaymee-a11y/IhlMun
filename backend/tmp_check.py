import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def check():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    committees = await db.committees.find().to_list(100)
    for c in committees:
        print(f"Name: {c.get('name')}")
        print(f"Agenda: {c.get('agenda')}")
        print("-" * 20)
    client.close()

if __name__ == "__main__":
    asyncio.run(check())
