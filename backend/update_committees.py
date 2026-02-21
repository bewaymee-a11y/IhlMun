import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def update_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    # Change name of Vienna Congress
    await db.committees.update_one(
        {"name": "Vienna Congress of 1815"},
        {"$set": {"name": "Congress Of Vienna"}}
    )

    # Set new background image URLs (assuming user puts them in frontend/public/committees/)
    updates = [
        {"name": "UNODC", "url": "/committees/unodc.jpg"},
        {"name": "Congress Of Vienna", "url": "/committees/vienna.jpg"},
        {"name": "Press Corps", "url": "/committees/press.jpg"},
        {"name": "IOM – UN Migration", "url": "/committees/iom.jpg"},
        {"name": "Human Rights Council", "url": "/committees/hrc.jpg"},
        {"name": "General Assembly", "url": "/committees/ga.jpg"},
        {"name": "Комитет Государственной Думы России", "url": "/committees/duma.jpg"},
    ]

    for item in updates:
        await db.committees.update_one(
            {"name": item["name"]},
            {"$set": {"background_image": item["url"]}}
        )

    print("Updated committee names and image URLs.")
    client.close()

if __name__ == "__main__":
    asyncio.run(update_db())
