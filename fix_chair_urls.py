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
        updated = False
        for chair in c.get('chairs', []):
            if chair.get('photo_url', '').startswith('/IhlMun/'):
                chair['photo_url'] = chair['photo_url'].replace('/IhlMun/', '/')
                updated = True
        if updated:
            await db.committees.update_one({'_id': c['_id']}, {'$set': {'chairs': c['chairs']}})
            print('Updated chairs for', c['name'])

asyncio.run(main())
