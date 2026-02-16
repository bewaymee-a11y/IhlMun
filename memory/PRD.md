# IHL MUN 2026 - Product Requirements Document

## Original Problem Statement
Build website for IHL Model United Nations 2026 conference in Tashkent, Uzbekistan.
- Modern design matching logo (Navy Blue #1E3A8A + Gold #FFC72C)
- 6 Committees (GA, HRC, SC, Versailles Treaty, IOM, Комитет Госдумы РФ)
- Registration system with admin panel
- Instagram integration

## Architecture

### Tech Stack
- **Frontend**: React.js with TailwindCSS
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Auth**: JWT-based admin authentication

### Color Scheme (from Logo)
- Navy Blue: #1E3A8A (background)
- Gold/Yellow: #FFC72C (accents, buttons)
- White: #FFFFFF (text)

## User Personas
1. **Delegates**: Students registering for MUN conference
2. **Admins**: Conference organizers managing content
3. **Visitors**: Learning about the conference

## What's Been Implemented (February 10, 2026)
- ✅ Home page with logo, hero section, animations
- ✅ 6 Committees with expand/collapse, chairs, agenda
- ✅ Registration form with validation
- ✅ About Us page with secretariat section
- ✅ Media Gallery with lightbox
- ✅ Admin Panel with login (admin/admin123)
- ✅ All CRUD operations for content
- ✅ CSV export for registrations (import to Google Sheets)
- ✅ Instagram link integration
- ✅ Navy blue + gold color scheme (matches logo)
- ✅ Smooth animations throughout
- ✅ Fully responsive design

## Admin Credentials
- Username: `admin`
- Password: `admin123`

## 6 Committees
1. General Assembly (GA)
2. Human Rights Council (HRC)
3. Security Council (SC)
4. Versailles Treaty Committee
5. IOM – UN Migration
6. Комитет Государственной Думы России

## Backlog / Future Features
- P1: Language switcher (RU/EN)
- P1: CAPTCHA for registration forms
- P2: Email notifications for new registrations
- P2: Google Sheets direct API integration
- P3: SEO optimization

## Next Steps
1. Add secretariat members via admin panel
2. Add real chair photos via admin panel
3. Upload media photos via admin panel
4. Test registration flow end-to-end
