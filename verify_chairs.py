import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv('backend/.env')

async def main():
    client = AsyncIOMotorClient(os.getenv('MONGO_URL'))
    db = client[os.getenv('DB_NAME')]
    committees = await db.committees.find({}).to_list(100)
    for c in committees:
        print('\n#', c['name'])
        for chair in c.get('chairs', []):
            print(f"{chair['name']} -> {chair.get('photo_url')}")

asyncio.run(main())
