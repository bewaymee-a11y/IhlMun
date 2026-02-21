import asyncio
import uuid
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv('backend/.env')

async def reset_committees():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    await db.committees.delete_many({})
    print("Deleted all old committees.")

    committees = [
        {
            "id": str(uuid.uuid4()),
            "name": "IOM \u2013 UN Migration",
            "name_ru": None,
            "description": "The International Organization for Migration works to ensure the orderly and humane management of migration.",
            "agenda": [
                "The Impact of Aggressive Border Enforcement Policies on Forced Migration and Asylum Systems",
                "Balancing State Sovereignty and the Protection of Migrants' Rights"
            ],
            "background_image": "/committees/migration.JPG",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Ezoza Bobomurodova", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Khonzodabegim Burkhonova", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Saida Adkhamova", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 1
        },
        {
            "id": str(uuid.uuid4()),
            "name": "CCPCJ",
            "name_ru": None,
            "description": "The Commission on Crime Prevention and Criminal Justice acts as the principal policymaking body of the United Nations.",
            "agenda": [
                "Reviewing Violations of Press Freedom and the Protection of Journalists",
                "Examining the Status and Rights of Religious Minorities in the Syrian Arab Republic"
            ],
            "background_image": "/committees/ccpcj.jpg",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Dilshod Khalbekov", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Fahriddin Shirinov", "role": "Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Roman Kim", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
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
                {"id": str(uuid.uuid4()), "name": "Darina Galchevskaya", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Aziza Tillakhujaeva", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
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
            "background_image": "/committees/congressofviena.JPG",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Saidakhmadkhon Saidaminov", "role": "Congress Arbiter", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Neve Marie Krige", "role": "Chairperson", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 4
        },
        {
            "id": str(uuid.uuid4()),
            "name": "\u041a\u043e\u043c\u0438\u0442\u0435\u0442 \u0413\u043e\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0439 \u0414\u0443\u043c\u044b \u0420\u043e\u0441\u0441\u0438\u0438",
            "name_ru": "\u041a\u043e\u043c\u0438\u0442\u0435\u0442 \u0413\u043e\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0439 \u0414\u0443\u043c\u044b \u0420\u043e\u0441\u0441\u0438\u0438",
            "description": "\u0421\u0438\u043c\u0443\u043b\u044f\u0446\u0438\u044f \u0437\u0430\u0441\u0435\u0434\u0430\u043d\u0438\u044f \u041a\u043e\u043c\u0438\u0442\u0435\u0442\u0430 \u0413\u043e\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0439 \u0414\u0443\u043c\u044b \u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u043e\u0439 \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u0438.",
            "agenda": ["\u00ab\u0427\u0451\u0440\u043d\u044b\u0439 \u043e\u043a\u0442\u044f\u0431\u0440\u044c\u00bb: \u041f\u043e\u043b\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0438 \u043a\u043e\u043d\u0441\u0442\u0438\u0442\u0443\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u043a\u0440\u0438\u0437\u0438\u0441 \u0432 \u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u043e\u0439 \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u0438"],
            "background_image": "/committees/\u0433\u043e\u0441\u0434\u0443\u043c\u0430.jpg",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "\u0410\u0441\u0430\u043b\u044c \u0428\u0443\u043a\u0443\u0440\u043e\u0432\u0430", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "\u041c\u0430\u0440\u0438\u044f\u043c \u041c\u0435\u043b\u0438\u0431\u0430\u0435\u0432\u0430", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
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
            "background_image": "/committees/unodc.JPG",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Hilola Sotimkulova", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Muazzam Muminova", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Khadija Bakhromova", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 6
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Security Council",
            "name_ru": None,
            "description": "The Security Council has primary responsibility for the maintenance of international peace and security.",
            "agenda": [
                "Maintenance of International Peace and Security",
                "Addressing Global Threats"
            ],
            "background_image": "/committees/secrity.JPG",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Abdulmajid Toshmatov", "role": "Main Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Dilnoza Yuldasheva", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Mark Tokarev", "role": "Co-Chair", "experience": "MUN experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 7
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Press Corps",
            "name_ru": None,
            "description": "The Press Corps covers all committees and produces conference media content.",
            "agenda": ["No fixed agenda - Media Coverage"],
            "background_image": "/committees/press.JPG",
            "chairs": [
                {"id": str(uuid.uuid4()), "name": "Lola Yuldasheva", "role": "Chair", "experience": "Media experience", "photo_url": "/placeholder-chair.jpg"},
                {"id": str(uuid.uuid4()), "name": "Nozanin", "role": "Co-Chair", "experience": "Media experience", "photo_url": "/placeholder-chair.jpg"}
            ],
            "registration_open": True,
            "order": 8
        }
    ]
    
    await db.committees.insert_many(committees)
    print("Inserted 8 correct committees.")
    client.close()

if __name__ == "__main__":
    asyncio.run(reset_committees())
