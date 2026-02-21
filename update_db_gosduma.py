import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv('backend/.env')

async def main():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    result = await db.committees.update_one(
        {"name": "Комитет Государственной Думы России"},
        {"$set": {"background_image": "/committees/gosduma.jpg"}}
    )
    print(f"Modified {result.modified_count} documents in DB")

if __name__ == '__main__':
    asyncio.run(main())
