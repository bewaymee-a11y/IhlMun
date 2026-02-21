import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv('backend/.env')

chair_photos = {
    'Darina': '/IhlMun/chairs/chair_1.jpg',
    'Dilshod': '/IhlMun/chairs/chair_2.jpg',
    'Fahriddin': '/IhlMun/chairs/chair_3.jpg',
    'Roman': '/IhlMun/chairs/chair_4.jpg',
    'Hilola': '/IhlMun/chairs/chair_5.jpg',
    'Muazzam': '/IhlMun/chairs/chair_6.jpg',
    'Khadija': '/IhlMun/chairs/chair_7.jpg',
    'Khonzodabegim': '/IhlMun/chairs/chair_8.jpg',
    'Saida': '/IhlMun/chairs/chair_9.jpg',
    'Abdulmajid': '/IhlMun/chairs/chair_10.jpg',
    'Dilnoza': '/IhlMun/chairs/chair_11.jpg',
    'Mark': '/IhlMun/chairs/chair_12.jpg',
    'Saidakhmadkhon': '/IhlMun/chairs/chair_13.jpg',
    'Neve': '/IhlMun/chairs/chair_14.png',
    'Асаль': '/IhlMun/chairs/chair_15.jpg',
    'Шукурова': '/IhlMun/chairs/chair_15.jpg',
    'Мариям': '/IhlMun/chairs/chair_16.jpg',
    'Мелибаева': '/IhlMun/chairs/chair_16.jpg',
}

async def main():
    client = AsyncIOMotorClient(os.getenv('MONGO_URL'))
    db = client[os.getenv('DB_NAME')]
    committees = await db.committees.find({}).to_list(100)
    for c in committees:
        updated = False
        for chair in c.get('chairs', []):
            photo_assigned = False
            for key, photo in chair_photos.items():
                if key in chair['name']:
                    chair['photo_url'] = photo
                    updated = True
                    photo_assigned = True
                    break
            if not photo_assigned and chair.get('photo_url', '') != '/placeholder-chair.jpg':
                chair['photo_url'] = '/placeholder-chair.jpg'
                updated = True
        
        if updated:
            await db.committees.update_one({'_id': c['_id']}, {'$set': {'chairs': c['chairs']}})
            print('Updated chairs for', c['name'])

asyncio.run(main())
