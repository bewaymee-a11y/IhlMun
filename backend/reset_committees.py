import asyncio
import uuid
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def reset_committees():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    # 1. Delete old committees
    await db.committees.delete_many({})
    print("Deleted all old committees.")

    # 2. Insert new default 7 committees with new image URLs
    default_committees = [
        {
            "id": str(uuid.uuid4()),
            "name": "IOM – UN Migration",
            "name_ru": None,
            "description": "The International Organization for Migration works to ensure the orderly and humane management of migration.",
            "agenda": [
                "The Impact of Aggressive Border Enforcement Policies on Forced Migration and Asylum Systems",
                "Balancing State Sovereignty and the Protection of Migrants' Rights"
            ],
            "background_image": "/committees/iom.jpg",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Khonzodabegim", "role": "Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Ezoza", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Saida", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 1
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Human Rights Council",
            "name_ru": None,
            "description": "The Human Rights Council is responsible for strengthening the promotion and protection of human rights around the globe.",
            "agenda": [
                "Reviewing Violations of Press Freedom and the Protection of Journalists",
                "Examining the Status and Rights of Religious Minorities in the Syrian Arab Republic"
            ],
            "background_image": "/committees/hrc.jpg",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Roman", "role": "Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Dilshod", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Faha", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 2
        },
        {
            "id": str(uuid.uuid4()),
            "name": "General Assembly",
            "name_ru": None,
            "description": "The General Assembly is the main deliberative organ of the United Nations, comprising all 193 Member States.",
            "agenda": [
                "Addressing the Challenges of Foreign Political Interference via Technology and Media",
                "Digitizing and Innovating Peacekeeping Efforts"
            ],
            "background_image": "/committees/ga.jpg",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Aziza", "role": "Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Raykhona", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Darina", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 3
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Congress Of Vienna",
            "name_ru": None,
            "description": "Historical simulation of the Congress of Vienna, a diplomatic conference that reshaped Europe.",
            "agenda": ["No Fixed Agenda - Crisis Committee"],
            "background_image": "/committees/vienna.jpg",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Neve", "role": "Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Said", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 4
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Комитет Государственной Думы России",
            "name_ru": "Комитет Государственной Думы России",
            "description": "Симуляция заседания Комитета Государственной Думы Российской Федерации.",
            "agenda": ["«Чёрный октябрь»: Политический и конституционный кризис в Российской Федерации"],
            "background_image": "/committees/duma.jpg",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Asya", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Solomon", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Mohammedamin", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 5
        },
        {
            "id": str(uuid.uuid4()),
            "name": "UNODC",
            "name_ru": None,
            "description": "United Nations Office on Drugs and Crime tackles global crime and drug trafficking.",
            "agenda": [
                "Strengthening Regional Cooperation to Combat Drug Trafficking, Abuse, and Related Crimes in Central Asia",
                "Promoting Sustainable Agrarian Transitions for Cocoa and Opium Farmers"
            ],
            "background_image": "/committees/unodc.jpg",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Midnight", "role": "Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Khilola", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Khadicha", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 6
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Press Corps",
            "name_ru": None,
            "description": "The Press Corps covers all committees and produces conference media content.",
            "agenda": ["No fixed agenda - Media Coverage"],
            "background_image": "/committees/press.jpg",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Lola", "role": "Chair", "experience": "Media experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Nozanin", "role": "Co-Chair", "experience": "Media experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Mokhina", "role": "Co-Chair", "experience": "Media experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 7
        }
    ]
    
    await db.committees.insert_many(default_committees)
    print("Inserted 7 correct committees.")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(reset_committees())
