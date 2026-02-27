import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv('backend/.env')

async def check():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    committees = await db.committees.find({}).to_list(100)
    for c in committees:
        print(f"Name: {c['name']}, ID: {c['id']}")
    client.close()

if __name__ == "__main__":
    asyncio.run(check())
