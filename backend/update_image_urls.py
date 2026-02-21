import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def update_image_urls():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    updates = [
        {"name": "UNODC", "url": "/committees/unodc.JPG"},
        {"name": "Congress Of Vienna", "url": "/committees/congressofviena.JPG"},
        {"name": "Press Corps", "url": "/committees/press.JPG"},
        {"name": "IOM – UN Migration", "url": "/committees/migration.JPG"},
        {"name": "General Assembly", "url": "/committees/ga.jpg"},
        {"name": "Комитет Государственной Думы России", "url": "/committees/госдума.jpg"},
        {"name": "Human Rights Council", "url": "/committees/ccpcj.jpg"}
    ]

    for item in updates:
        await db.committees.update_one(
            {"name": item["name"]},
            {"$set": {"background_image": item["url"]}}
        )

    print("Updated committee image URLs based on actual files.")
    client.close()

if __name__ == "__main__":
    asyncio.run(update_image_urls())
