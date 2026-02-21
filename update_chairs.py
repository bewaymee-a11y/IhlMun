import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv('backend/.env')

chair_photos = {
    'Darina': '/IhlMun/chairs/chair_1.jpg',
    'Aziza': '/IhlMun/chairs/chair_2.jpg',
    'Dilshod': '/IhlMun/chairs/chair_3.jpg',
    'Fahriddin': '/IhlMun/chairs/chair_4.jpg',
    'Roman': '/IhlMun/chairs/chair_5.jpg',
    'Hilola': '/IhlMun/chairs/chair_6.jpg',
    'Muazzam': '/IhlMun/chairs/chair_7.jpg',
    'Ezoza': '/IhlMun/chairs/chair_8.jpg',
    'Khonzodabegim': '/IhlMun/chairs/chair_9.jpg',
    'Saida': '/IhlMun/chairs/chair_10.jpg',
    'Abdulmajid': '/IhlMun/chairs/chair_11.jpg',
    'Dilnoza': '/IhlMun/chairs/chair_12.jpg',
    'Shaukat': '/IhlMun/chairs/chair_13.jpg',
    'Saidakhmadkhon': '/IhlMun/chairs/chair_14.png',
    'Maryam': '/IhlMun/chairs/chair_15.jpg',
    'Асаль': '/IhlMun/chairs/chair_16.jpg',
    'Мелибаева': '/IhlMun/chairs/chair_15.jpg',
    'Шукурова': '/IhlMun/chairs/chair_16.jpg',
}

async def main():
    client = AsyncIOMotorClient(os.getenv('MONGO_URL'))
    db = client[os.getenv('DB_NAME')]
    committees = await db.committees.find({}).to_list(100)
    for c in committees:
        updated = False
        for chair in c.get('chairs', []):
            for key, photo in chair_photos.items():
                if key in chair['name']:
                    chair['photo_url'] = photo
                    updated = True
                    break
        if updated:
            await db.committees.update_one({'_id': c['_id']}, {'$set': {'chairs': c['chairs']}})
            print('Updated chairs for', c['name'])

asyncio.run(main())
