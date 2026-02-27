import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv('backend/.env')

async def audit():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]

    print("=" * 60)
    print("1. COMMITTEES IN DATABASE")
    print("=" * 60)
    committees = await db.committees.find({}).to_list(100)
    db_comm_by_id = {c['id']: c['name'] for c in committees}
    db_comm_by_name = {c['name']: c['id'] for c in committees}
    for c in committees:
        print(f"  [{c['order']}] {c['name']} → {c['id']}")

    print()
    print("=" * 60)
    print("2. REGISTRATIONS AUDIT")
    print("=" * 60)
    registrations = await db.registrations.find({}).to_list(10000)
    print(f"  Total registrations: {len(registrations)}")
    
    orphaned = []     # committee_id not in DB
    mismatched = []   # name doesn't match ID

    by_committee = {}
    for reg in registrations:
        cid = reg.get('committee_id', '')
        cname = reg.get('committee_name', '')
        name_display = f"{reg.get('first_name', '')} {reg.get('surname', '')}".strip() or reg.get('email', 'unknown')
        
        # Track by committee
        if cname not in by_committee:
            by_committee[cname] = 0
        by_committee[cname] += 1
        
        # Check if ID is valid
        if cid not in db_comm_by_id:
            orphaned.append((name_display, cname, cid))
        
    print()
    print("  Registrations per committee:")
    for name, count in sorted(by_committee.items(), key=lambda x: -x[1]):
        match = "✓" if name in db_comm_by_name else "❌ NOT IN DB"
        print(f"    {match}  {name}: {count}")
        
    if orphaned:
        print()
        print(f"  ❌ ORPHANED REGISTRATIONS (committee_id not in DB): {len(orphaned)}")
        for r in orphaned:
            print(f"      {r[0]} → committee '{r[1]}' (id: {r[2]})")
    else:
        print()
        print("  ✓ All registration committee_ids are valid")

    print()
    print("=" * 60)
    print("3. ADMIN ACCOUNT CHECK")
    print("=" * 60)
    admins = await db.admins.find({}).to_list(10)
    print(f"  Admin accounts: {len(admins)}")
    for a in admins:
        print(f"    - {a.get('username', 'unknown')}")

    print()
    print("=" * 60)
    print("4. SETTINGS CHECK")
    print("=" * 60)
    settings = await db.settings.find_one({})
    if settings:
        print(f"  Registration open: {settings.get('registration_open', 'N/A')}")
    else:
        print("  ❌ NO SETTINGS DOCUMENT FOUND")

    client.close()

if __name__ == "__main__":
    asyncio.run(audit())
