from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import jwt
import bcrypt
import io
import csv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Settings
SECRET_KEY = os.environ.get('JWT_SECRET', 'ihl-mun-2026-secret-key-change-in-production')
ALGORITHM = "HS256"

security = HTTPBearer()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_default_data()
    yield
    client.close()

app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ============ MODELS ============

class ChairPerson(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str  # Chair / Co-Chair
    experience: str
    photo_url: str = "/placeholder-chair.jpg"

class Committee(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    name_ru: Optional[str] = None
    description: str
    agenda: List[str]
    background_image: str
    chairs: List[ChairPerson]
    registration_open: bool = True
    order: int = 0

class CommitteeCreate(BaseModel):
    name: str
    name_ru: Optional[str] = None
    description: str
    agenda: List[str]
    background_image: str
    chairs: List[ChairPerson]
    registration_open: bool = True
    order: int = 0

class Registration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    institution: str
    phone: str
    telegram: str
    email: EmailStr
    committee_id: str
    committee_name: str
    # New essay fields
    why_attend: str  # Min 80 words
    mun_experience: str  # 2 sentences
    why_committee: str
    alternative_committees: str
    consent_interview: bool
    understands_selection: bool
    # Status field for admin
    status: str = "Under Review"  # Under Review, Reviewed, Not Reviewed, Accepted, Rejected, Waitlisted
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RegistrationCreate(BaseModel):
    full_name: str
    institution: str
    phone: str
    telegram: str
    email: EmailStr
    committee_id: str
    # New essay fields
    why_attend: str
    mun_experience: str
    why_committee: str
    alternative_committees: str
    consent_interview: bool
    understands_selection: bool

class RegistrationStatusUpdate(BaseModel):
    status: str  # Under Review, Reviewed, Not Reviewed, Accepted, Rejected, Waitlisted

class SecretariatMember(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    experience: str
    photo_url: str = "/placeholder-member.jpg"
    order: int = 0

class SecretariatMemberCreate(BaseModel):
    name: str
    role: str
    experience: str
    photo_url: str = "/placeholder-member.jpg"
    order: int = 0

class GuestSpeaker(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    experience: str
    photo_url: str = "/placeholder-speaker.jpg"
    order: int = 0

class GuestSpeakerCreate(BaseModel):
    name: str
    title: str
    experience: str
    photo_url: str = "/placeholder-speaker.jpg"
    order: int = 0

class MediaPhoto(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    url: str
    caption: str
    date: str
    order: int = 0

class MediaPhotoCreate(BaseModel):
    url: str
    caption: str
    date: str
    order: int = 0

class SiteSettings(BaseModel):
    registration_open: bool = True
    conference_date: str = "March 2026"
    conference_location: str = "Tashkent, Uzbekistan"
    instagram_url: str = "https://www.instagram.com/ihl_mun"
    about_description: str = ""
    participation_free: bool = True
    selection_process_text: str = """Participation in IHL MUN 2026 is completely free for all selected delegates. Due to high interest and limited spots, there will be a strict selection process conducted by our Delegate Relations Officers.

How selection works:
• All applications are reviewed manually
• Delegate Relations team checks every essay and answer for originality, no AI-generated content, no plagiarism, relevance, depth and motivation
• Shortlisted candidates may be invited for a short interview
• Final decisions will be communicated via email / Telegram

We aim to select the most motivated, prepared and active delegates to ensure the highest quality debates and discussions."""

class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str

class AdminLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# ============ AUTH HELPERS ============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(user_id: str) -> str:
    payload = {
        "user_id": user_id,
        "exp": datetime.now(timezone.utc).timestamp() + 86400 * 7  # 7 days
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============ INIT DATA ============

async def init_default_data():
    # Check if data exists
    committees_count = await db.committees.count_documents({})
    if committees_count == 0:
        # Create 7 committees as per new TZ (no Security Council)
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
        logger.info("Created default committees")

    # Create default admin if not exists
    admin_count = await db.admins.count_documents({})
    if admin_count == 0:
        admin = {
            "id": str(uuid.uuid4()),
            "username": "admin",
            "password_hash": hash_password("admin123")
        }
        await db.admins.insert_one(admin)
        logger.info("Created default admin user (username: admin, password: admin123)")

    # Create default settings if not exists
    settings = await db.settings.find_one({})
    if not settings:
        default_settings = {
            "registration_open": True,
            "conference_date": "March 2026",
            "conference_location": "Tashkent, Uzbekistan",
            "instagram_url": "https://www.instagram.com/ihl_mun?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
            "about_description": "IHL Model United Nations is the premier MUN conference in Uzbekistan, bringing together young diplomats from across the region.",
            "participation_free": True,
            "selection_process_text": """Participation in IHL MUN 2026 is completely free for all selected delegates. Due to high interest and limited spots, there will be a strict selection process conducted by our Delegate Relations Officers.

How selection works:
• All applications are reviewed manually
• Delegate Relations team checks every essay and answer for originality, no AI-generated content, no plagiarism, relevance, depth and motivation
• Shortlisted candidates may be invited for a short interview
• Final decisions will be communicated via email / Telegram

We aim to select the most motivated, prepared and active delegates to ensure the highest quality debates and discussions."""
        }
        await db.settings.insert_one(default_settings)
        logger.info("Created default settings")

    # Create default secretariat if not exists
    secretariat_count = await db.secretariat.count_documents({})
    if secretariat_count == 0:
        default_secretariat = [
            {"id": str(uuid.uuid4()), "name": "Abdurakhmon", "role": "Secretary General", "experience": "Leading IHL MUN 2026", "photo_url": "/placeholder-member.jpg", "order": 1},
            {"id": str(uuid.uuid4()), "name": "Khoji", "role": "Deputy Secretary General", "experience": "Conference management", "photo_url": "/placeholder-member.jpg", "order": 2},
            {"id": str(uuid.uuid4()), "name": "Amir", "role": "Vice Secretary General", "experience": "Academic coordination", "photo_url": "/placeholder-member.jpg", "order": 3},
            {"id": str(uuid.uuid4()), "name": "Kamila", "role": "Press Secretary", "experience": "Media relations", "photo_url": "/placeholder-member.jpg", "order": 4},
            {"id": str(uuid.uuid4()), "name": "Sabina", "role": "Head of Event", "experience": "Event coordination", "photo_url": "/placeholder-member.jpg", "order": 5},
            {"id": str(uuid.uuid4()), "name": "Tair", "role": "Delegate Relations", "experience": "Delegate support", "photo_url": "/placeholder-member.jpg", "order": 6},
            {"id": str(uuid.uuid4()), "name": "Elina", "role": "Head of Delegate Oriented", "experience": "Delegate experience", "photo_url": "/placeholder-member.jpg", "order": 7},
            {"id": str(uuid.uuid4()), "name": "Kamila", "role": "Head of Volunteers", "experience": "Volunteer coordination", "photo_url": "/placeholder-member.jpg", "order": 8},
            {"id": str(uuid.uuid4()), "name": "Maruf", "role": "Head of Media", "experience": "Media production", "photo_url": "/placeholder-member.jpg", "order": 9},
            {"id": str(uuid.uuid4()), "name": "Darya", "role": "Event Coordinator", "experience": "Event logistics", "photo_url": "/placeholder-member.jpg", "order": 10},
            {"id": str(uuid.uuid4()), "name": "Mubina", "role": "Head of Finances", "experience": "Financial management", "photo_url": "/placeholder-member.jpg", "order": 11},
            {"id": str(uuid.uuid4()), "name": "Rizo", "role": "Event Coordinator", "experience": "Event support", "photo_url": "/placeholder-member.jpg", "order": 12},
            {"id": str(uuid.uuid4()), "name": "Lola", "role": "Event Coordinator", "experience": "Event support", "photo_url": "/placeholder-member.jpg", "order": 13},
            {"id": str(uuid.uuid4()), "name": "Malika", "role": "Security", "experience": "Security coordination", "photo_url": "/placeholder-member.jpg", "order": 14},
        ]
        await db.secretariat.insert_many(default_secretariat)
        logger.info("Created default secretariat")

# ============ PUBLIC API ============

@api_router.get("/")
async def root():
    return {"message": "IHL MUN 2026 API"}

@api_router.get("/committees", response_model=List[Committee])
async def get_committees():
    committees = await db.committees.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return committees

@api_router.get("/committees/{committee_id}")
async def get_committee(committee_id: str):
    committee = await db.committees.find_one({"id": committee_id}, {"_id": 0})
    if not committee:
        raise HTTPException(status_code=404, detail="Committee not found")
    return committee

@api_router.post("/registrations")
async def create_registration(data: RegistrationCreate):
    # Check if registration is open
    settings = await db.settings.find_one({}, {"_id": 0})
    if settings and not settings.get("registration_open", True):
        raise HTTPException(status_code=400, detail="Registration is currently closed")
    
    # Check if committee registration is open
    committee = await db.committees.find_one({"id": data.committee_id}, {"_id": 0})
    if not committee:
        raise HTTPException(status_code=404, detail="Committee not found")
    if not committee.get("registration_open", True):
        raise HTTPException(status_code=400, detail="Registration for this committee is closed")
    
    # Check for duplicate email in same committee
    existing = await db.registrations.find_one({"email": data.email, "committee_id": data.committee_id})
    if existing:
        raise HTTPException(status_code=400, detail="You have already registered for this committee")
    
    # Validate why_attend has minimum 80 words
    word_count = len(data.why_attend.split())
    if word_count < 80:
        raise HTTPException(status_code=400, detail=f"'Why do you want to attend' must be at least 80 words (currently {word_count} words)")
    
    registration = Registration(
        **data.model_dump(),
        committee_name=committee["name"],
        status="Under Review"
    )
    doc = registration.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.registrations.insert_one(doc)
    
    return {"success": True, "message": "Application received! We will review it shortly."}

@api_router.get("/secretariat", response_model=List[SecretariatMember])
async def get_secretariat():
    members = await db.secretariat.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return members

@api_router.get("/speakers", response_model=List[GuestSpeaker])
async def get_speakers():
    speakers = await db.speakers.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return speakers

@api_router.get("/media", response_model=List[MediaPhoto])
async def get_media():
    photos = await db.media.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return photos

@api_router.get("/settings")
async def get_settings():
    settings = await db.settings.find_one({}, {"_id": 0})
    if not settings:
        return SiteSettings().model_dump()
    return settings

# ============ ADMIN AUTH ============

@api_router.post("/admin/login", response_model=TokenResponse)
async def admin_login(data: AdminLogin):
    admin = await db.admins.find_one({"username": data.username})
    if not admin or not verify_password(data.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(admin["id"])
    return TokenResponse(access_token=token)

@api_router.get("/admin/verify")
async def verify_admin(user_id: str = Depends(verify_token)):
    return {"valid": True, "user_id": user_id}

# ============ ADMIN API ============

# Committees Management
@api_router.post("/admin/committees", response_model=Committee)
async def create_committee(data: CommitteeCreate, user_id: str = Depends(verify_token)):
    committee = Committee(**data.model_dump())
    await db.committees.insert_one(committee.model_dump())
    return committee

@api_router.put("/admin/committees/{committee_id}")
async def update_committee(committee_id: str, data: CommitteeCreate, user_id: str = Depends(verify_token)):
    result = await db.committees.update_one(
        {"id": committee_id},
        {"$set": data.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Committee not found")
    return {"success": True}

@api_router.delete("/admin/committees/{committee_id}")
async def delete_committee(committee_id: str, user_id: str = Depends(verify_token)):
    result = await db.committees.delete_one({"id": committee_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Committee not found")
    return {"success": True}

# Registrations Management
@api_router.get("/admin/registrations")
async def get_registrations(
    user_id: str = Depends(verify_token),
    committee_id: Optional[str] = None,
    status: Optional[str] = None
):
    query = {}
    if committee_id:
        query["committee_id"] = committee_id
    if status:
        query["status"] = status
    
    registrations = await db.registrations.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return registrations

@api_router.put("/admin/registrations/{registration_id}/status")
async def update_registration_status(registration_id: str, data: RegistrationStatusUpdate, user_id: str = Depends(verify_token)):
    valid_statuses = ["Under Review", "Reviewed", "Not Reviewed", "Accepted", "Rejected", "Waitlisted"]
    if data.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
    
    result = await db.registrations.update_one(
        {"id": registration_id},
        {"$set": {"status": data.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Registration not found")
    return {"success": True}

@api_router.get("/admin/registrations/export")
async def export_registrations(user_id: str = Depends(verify_token)):
    registrations = await db.registrations.find({}, {"_id": 0}).to_list(10000)
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Full Name", "Institution", "Phone", "Telegram", "Email", "Committee", "Why Attend", "MUN Experience", "Why Committee", "Alternative Committees", "Consent Interview", "Status", "Created At"])
    
    for reg in registrations:
        writer.writerow([
            reg.get("id", ""),
            reg.get("full_name", ""),
            reg.get("institution", ""),
            reg.get("phone", ""),
            reg.get("telegram", ""),
            reg.get("email", ""),
            reg.get("committee_name", ""),
            reg.get("why_attend", "")[:100] + "..." if len(reg.get("why_attend", "")) > 100 else reg.get("why_attend", ""),
            reg.get("mun_experience", ""),
            reg.get("why_committee", ""),
            reg.get("alternative_committees", ""),
            "Yes" if reg.get("consent_interview") else "No",
            reg.get("status", "Under Review"),
            reg.get("created_at", "")
        ])
    
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=registrations.csv"}
    )

@api_router.delete("/admin/registrations/{registration_id}")
async def delete_registration(registration_id: str, user_id: str = Depends(verify_token)):
    result = await db.registrations.delete_one({"id": registration_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Registration not found")
    return {"success": True}

# Secretariat Management
@api_router.post("/admin/secretariat", response_model=SecretariatMember)
async def create_secretariat_member(data: SecretariatMemberCreate, user_id: str = Depends(verify_token)):
    member = SecretariatMember(**data.model_dump())
    await db.secretariat.insert_one(member.model_dump())
    return member

@api_router.put("/admin/secretariat/{member_id}")
async def update_secretariat_member(member_id: str, data: SecretariatMemberCreate, user_id: str = Depends(verify_token)):
    result = await db.secretariat.update_one(
        {"id": member_id},
        {"$set": data.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Member not found")
    return {"success": True}

@api_router.delete("/admin/secretariat/{member_id}")
async def delete_secretariat_member(member_id: str, user_id: str = Depends(verify_token)):
    result = await db.secretariat.delete_one({"id": member_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Member not found")
    return {"success": True}

# Speakers Management
@api_router.post("/admin/speakers", response_model=GuestSpeaker)
async def create_speaker(data: GuestSpeakerCreate, user_id: str = Depends(verify_token)):
    speaker = GuestSpeaker(**data.model_dump())
    await db.speakers.insert_one(speaker.model_dump())
    return speaker

@api_router.put("/admin/speakers/{speaker_id}")
async def update_speaker(speaker_id: str, data: GuestSpeakerCreate, user_id: str = Depends(verify_token)):
    result = await db.speakers.update_one(
        {"id": speaker_id},
        {"$set": data.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Speaker not found")
    return {"success": True}

@api_router.delete("/admin/speakers/{speaker_id}")
async def delete_speaker(speaker_id: str, user_id: str = Depends(verify_token)):
    result = await db.speakers.delete_one({"id": speaker_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Speaker not found")
    return {"success": True}

# Media Management
@api_router.post("/admin/media", response_model=MediaPhoto)
async def create_media(data: MediaPhotoCreate, user_id: str = Depends(verify_token)):
    photo = MediaPhoto(**data.model_dump())
    await db.media.insert_one(photo.model_dump())
    return photo

@api_router.put("/admin/media/{photo_id}")
async def update_media(photo_id: str, data: MediaPhotoCreate, user_id: str = Depends(verify_token)):
    result = await db.media.update_one(
        {"id": photo_id},
        {"$set": data.model_dump()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Photo not found")
    return {"success": True}

@api_router.delete("/admin/media/{photo_id}")
async def delete_media(photo_id: str, user_id: str = Depends(verify_token)):
    result = await db.media.delete_one({"id": photo_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Photo not found")
    return {"success": True}

# Settings Management
@api_router.put("/admin/settings")
async def update_settings(data: SiteSettings, user_id: str = Depends(verify_token)):
    await db.settings.update_one({}, {"$set": data.model_dump()}, upsert=True)
    return {"success": True}

# Change Admin Password
@api_router.put("/admin/password")
async def change_password(old_password: str, new_password: str, user_id: str = Depends(verify_token)):
    admin = await db.admins.find_one({"id": user_id})
    if not admin or not verify_password(old_password, admin["password_hash"]):
        raise HTTPException(status_code=400, detail="Invalid current password")
    
    await db.admins.update_one(
        {"id": user_id},
        {"$set": {"password_hash": hash_password(new_password)}}
    )
    return {"success": True}

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
