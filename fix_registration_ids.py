import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv('backend/.env')

async def fix_ids():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    # Get current committees
    committees = await db.committees.find({}).to_list(100)
    comm_map = {c['name']: c['id'] for c in committees}
    # Add ru names mapping too
    for c in committees:
        if c.get('name_ru'):
            comm_map[c['name_ru']] = c['id']

    print(f"Loaded {len(committees)} committees.")

    # Get all registrations
    registrations = await db.registrations.find({}).to_list(10000)
    updated_count = 0

    for reg in registrations:
        old_id = reg.get('committee_id')
        comm_name = reg.get('committee_name')
        
        if comm_name in comm_map:
            new_id = comm_map[comm_name]
            if old_id != new_id:
                await db.registrations.update_one(
                    {'_id': reg['_id']},
                    {'$set': {'committee_id': new_id}}
                )
                updated_count += 1

    print(f"Successfully updated {updated_count} registrations with new committee IDs.")
    client.close()

if __name__ == "__main__":
    asyncio.run(fix_ids())
