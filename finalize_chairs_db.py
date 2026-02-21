import asyncio
import os
import uuid
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv('backend/.env')

async def update_chairs_and_agendas():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    # Clear and reset to ensure fresh IDs and exact data
    await db.committees.delete_many({})
    print("Deleted all old committees to reset with full chair data.")

    committees = [
        {
            "id": str(uuid.uuid4()),
            "name": "IOM – UN Migration",
            "name_ru": None,
            "description": "The International Organization for Migration works to ensure the orderly and humane management of migration.",
            "agenda": ["Addressing the Humanitarian Consequences of Mass Displacement Due to Climate Change"],
            "background_image": "/committees/migration.JPG",
            "chairs": [
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Ezoza Bobomurodova", 
                    "role": "Main Chair", 
                    "experience": "Sophomore International Relations student at Webster University. She has participated in 40+ MUN conferences and chaired more than 30 times.", 
                    "photo_url": "/chairs/ezoza_bobomurodova.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Khonzodabegim Burkhonova", 
                    "role": "Chair", 
                    "experience": "Sophomore at TSUL with 30+ MUN experiences, having chaired more than 20 times.", 
                    "photo_url": "/chairs/khonzodabegim_burkhonova.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Saida Adkhamova", 
                    "role": "Chair", 
                    "experience": "Year 11 student at The British School who has received the 'Honorable Chair' award twice.", 
                    "photo_url": "/chairs/saida_adkhamova.jpg"
                }
            ],
            "registration_open": True,
            "order": 1
        },
        {
            "id": str(uuid.uuid4()),
            "name": "CCPCJ",
            "name_ru": None,
            "description": "The Commission on Crime Prevention and Criminal Justice acts as the principal policymaking body of the United Nations.",
            "agenda": ["Enhancing Global Responses to Environmental Crimes: Combating Illegal Wildlife Trade and Deforestation"],
            "background_image": "/committees/ccpcj.jpg",
            "chairs": [
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Dilshod Khalbekov", 
                    "role": "Main Chair", 
                    "experience": "19 years old, currently on a gap year. He has participated in 50+ MUN conferences, serving in various capacities including Chair, delegate, and member of the Secretariat.", 
                    "photo_url": "/chairs/dilshod_khalbekov.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Fahriddin Shirinov", 
                    "role": "Chair", 
                    "experience": "A graduate of CIS Tashkent and an avid MUN participant who has served as both a delegate and a Chair over 50 times.", 
                    "photo_url": "/chairs/fahriddin_shirinov.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Roman Kim", 
                    "role": "Chair", 
                    "experience": "Student at The British School of Tashkent with over 40 MUN experiences and 10+ awards. He is the Secretary General for BSTMUN '25.", 
                    "photo_url": "/chairs/roman_kim.jpg"
                }
            ],
            "registration_open": True,
            "order": 2
        },
        {
            "id": str(uuid.uuid4()),
            "name": "General Assembly",
            "name_ru": None,
            "description": "The General Assembly is the main deliberative organ of the United Nations, comprising all 193 Member States.",
            "agenda": ["Addressing the Challenges of Foreign Political Interference in the Internal and External Affairs of Sovereign States"],
            "background_image": "/committees/ga.jpg",
            "chairs": [
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Darina Galchevskaya", 
                    "role": "Main Chair", 
                    "experience": "A student at Central Asian University. With several MUN conferences under her belt, Darina has earned numerous Best Delegate awards, showcasing her expertise in international relations and leadership skills.", 
                    "photo_url": "/chairs/darina_galchevskaya.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Aziza Tillakhujaeva", 
                    "role": "Chair", 
                    "experience": "A student from Target International School. Aziza has been an active MUN participant for a year, with approximately 16 experiences and 12 awards.", 
                    "photo_url": "/chairs/placeholder-chair.jpg"
                }
            ],
            "registration_open": True,
            "order": 3
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Congress Of Vienna",
            "name_ru": None,
            "description": "Historical simulation of the Congress of Vienna, a diplomatic conference that reshaped Europe.",
            "agenda": ["Historical Simulation (Restoring Order in Europe)"],
            "background_image": "/committees/congressofviena.JPG",
            "chairs": [
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Saidakhmadkhon Saidaminov", 
                    "role": "Congress Arbiter", 
                    "experience": "Actively involved in MUN both locally and internationally, recipient of multiple Best Delegate awards (including OxfordMUN).", 
                    "photo_url": "/chairs/saidakhmadkhon_saidaminov.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Neve Marie Crige", 
                    "role": "Chairperson", 
                    "experience": "MUN participant for 4 years across local and international conferences, winning Best Delegate awards in all her committees, including at OxfordMUN.", 
                    "photo_url": "/chairs/neve_marie_crige.jpg"
                }
            ],
            "registration_open": True,
            "order": 4
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Комитет Государственной Думы России",
            "name_ru": "Комитет Государственной Думы России",
            "description": "Симуляция заседания Комитета Государственной Думы Российской Федерации.",
            "agenda": ["«Чёрный октябрь»: Политический и конституционный кризис 1993 года в России."],
            "background_image": "/committees/gosduma.jpg",
            "chairs": [
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Асаль Шукурова", 
                    "role": "Chairperson", 
                    "experience": "Первокурсница Академического лицея «International House Tashkent». Она приняла участие в более чем 20 конференциях, часто в роли председателя.", 
                    "photo_url": "/chairs/asal_shukurova.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Мариям Мелибаева", 
                    "role": "Chair", 
                    "experience": "Студентка Вебстерского университета в Ташкенте. После 10 конференций Моделей ООН и ШОС зарекомендовала себя как лидер.", 
                    "photo_url": "/chairs/mariyam_melibaeva.jpg"
                }
            ],
            "registration_open": True,
            "order": 5
        },
        {
            "id": str(uuid.uuid4()),
            "name": "UNODC",
            "name_ru": None,
            "description": "United Nations Office on Drugs and Crime tackles global crime and drug trafficking.",
            "agenda": ["Strengthening Regional Cooperation to Combat Drug Trafficking in Central Asia"],
            "background_image": "/committees/unodc.JPG",
            "chairs": [
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Hilola Sotimkulova", 
                    "role": "Main Chair", 
                    "experience": "17-year-old freshman at Webster University. She has participated in over 30 MUN conferences in roles ranging from delegate to Secretariat.", 
                    "photo_url": "/chairs/hilola_sotimkulova.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Muazzam Muminova", 
                    "role": "Chair", 
                    "experience": "Student at ALWIUT. An experienced participant since 2022, she has attended 50+ conferences in multiple leadership roles.", 
                    "photo_url": "/chairs/muazzam_muminova.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Khadija Bakhromova", 
                    "role": "Chair", 
                    "experience": "A writer and active organizer known for her contributions to public speaking.", 
                    "photo_url": "/chairs/khadija_bakhromova.jpg"
                }
            ],
            "registration_open": True,
            "order": 6
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Security Council",
            "name_ru": None,
            "description": "The Security Council has primary responsibility for the maintenance of international peace and security.",
            "agenda": ["Mitigating Armed Conflicts and Terrorist Expansion in the Sahel Region"],
            "background_image": "/committees/secrity.JPG",
            "chairs": [
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Abdumajid Toshmatov", 
                    "role": "Main Chair", 
                    "experience": "Sophomore at TSUE, working in the banking sector. He has participated in over 50 MUN conferences.", 
                    "photo_url": "/chairs/abdumajid_toshmatov.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Dilnoza Yuldasheva", 
                    "role": "Chair", 
                    "experience": "Webster University student with over 30 conferences in various roles.", 
                    "photo_url": "/chairs/dilnoza_yuldasheva.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Mark Tokarev", 
                    "role": "Chair", 
                    "experience": "Student at Interhouse Lyceum with 20+ MUN conferences of experience.", 
                    "photo_url": "/chairs/mark_tokarev.jpg"
                }
            ],
            "registration_open": True,
            "order": 7
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Press Corps",
            "name_ru": None,
            "description": "The Press Corps covers all committees and produces conference media content.",
            "agenda": ["No Fixed Agenda"],
            "background_image": "/committees/press.JPG",
            "chairs": [
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Nozanin", 
                    "role": "Chair", 
                    "experience": "Senior at Interhouse Lyceum with 20+ MUN conferences. Recognized for her research, preparation, and dedication to high-level debate.", 
                    "photo_url": "/chairs/placeholder-chair.jpg"
                },
                {
                    "id": str(uuid.uuid4()), 
                    "name": "Lola Yuldasheva", 
                    "role": "Chair", 
                    "experience": "Experienced in design and media production. As Media Deputy, she handles content creation and visual storytelling.", 
                    "photo_url": "/chairs/placeholder-chair.jpg"
                }
            ],
            "registration_open": True,
            "order": 8
        }
    ]

    await db.committees.insert_many(committees)
    print("Inserted 8 committees with updated chair information and agendas.")
    client.close()

if __name__ == "__main__":
    asyncio.run(update_chairs_and_agendas())
