import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv('backend/.env')

async def fix():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    # The 3 orphaned registrations have committee_name="Congress Of Vienna"
    # and committee_id="af870613-..." (old ID that no longer exists).
    # The correct committee in DB is "Conference of Vienna" with new ID.
    committee = await db.committees.find_one({"name": "Conference of Vienna"})
    if not committee:
        print("❌ 'Conference of Vienna' committee not found in DB!")
        client.close()
        return

    new_id = committee['id']
    result = await db.registrations.update_many(
        {"committee_name": "Congress Of Vienna"},
        {"$set": {
            "committee_id": new_id,
            "committee_name": "Conference of Vienna"
        }}
    )
    print(f"✓ Fixed {result.modified_count} orphaned registrations "
          f"(Congress Of Vienna → Conference of Vienna, id: {new_id})")

    client.close()

if __name__ == "__main__":
    asyncio.run(fix())
