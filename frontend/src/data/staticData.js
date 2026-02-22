// Static data — IDs match the UUIDs in the MongoDB database on Render
// Committee order follows experience level: beginner → intermediate → advanced
// so registration form submissions can find the correct committee on the backend.

export const STATIC_COMMITTEES = [
    // ── 1. BEGINNER ─────────────────────────────────────────────────────────────
    {
        id: "c7cad356-9773-4866-ab8b-1a93efefc94f",
        name: "United Nations General Assembly",
        name_ru: null,
        description:
            "The United Nations General Assembly is the principal deliberative, policymaking, and representative organ of the United Nations, comprising all 193 Member States on an equal footing. It provides a unique forum for multilateral discussion of the full spectrum of international issues covered by the UN Charter, including peace and security, economic development, and human rights. The General Assembly has the authority to make recommendations on matters of international importance, and its resolutions reflect the breadth of global consensus. It serves as a standard-setting body on various issues ranging from disarmament and decolonization to sustainable development and international law.",
        agenda: [
            "Addressing the Challenges of Foreign Political Interference via Technology and Media",
        ],
        background_image: "/committees/ga.jpg",
        chairs: [
            {
                id: "4d7b4b61-8e68-456f-b993-f67b0824c114",
                name: "Darina Galchevskaya",
                role: "Main Chair",
                experience:
                    "A student at Central Asian University, Darina combines extensive MUN leadership experience with strong analytical discipline. She is known for running structured, policy-focused debates where arguments are expected to be precise, legally grounded, and strategically coherent.",
                photo_url: "/chairs/darina_galchevskaya.jpg",
                image_position: "center 55%",
            },
            {
                id: "6f6bdbdd-c0de-49ab-b19a-660d04d1ffd1",
                name: "Aziza Tillakhujaeva",
                role: "Co-Chair",
                experience:
                    "A graduating student of Target International School, Aziza brings award-winning debate experience and a sharp understanding of digital governance issues. She prioritizes intellectual clarity and solution-oriented diplomacy.",
                photo_url: "/chairs/placeholder-chair.jpg",
                image_position: "center 50%",
            },
        ],
        registration_open: true,
        order: 1,
    },
    {
        id: "e45ca3e4-29ea-45cc-ae47-e62e351ff3f0",
        name: "United Nations Office on Drugs and Crime",
        name_ru: null,
        description:
            "The United Nations Office on Drugs and Crime (UNODC) is the principal United Nations entity mandated to assist members states in their struggle against illicit drugs, crime, and terrorism. Founded in 1997, it works with member states to implement international treaties on drugs and crime, and develops domestic legislation to address these persistent global threats. Through field-based technical cooperation projects, UNODC assists countries in building sustainable capacity to confront these challenges to development, peace, and security. It promotes regional cooperation and robust policy frameworks to counter organized crime, drug trafficking, corruption, and related offenses.",
        agenda: [
            "Strengthening Regional Cooperation to Combat Drug Trafficking, Abuse, and Related Crimes in Central Asia",
        ],
        background_image: "/committees/unodc.JPG",
        chairs: [
            {
                id: "5b33db74-8a57-4d55-9667-254724d41b00",
                name: "Hilola Sotimkulova",
                role: "Main Chair",
                experience:
                    "A freshman in International Relations at Webster University, Hilola approaches regional security topics with academic depth and practical debate experience across multiple MUN leadership roles.",
                photo_url: "/chairs/hilola_sotimkulova.jpg",
                image_position: "center 50%",
            },
            {
                id: "50cc16d9-c41e-4552-8ab8-c807e4bb1c32",
                name: "Muazzam Muminova",
                role: "Co-Chair",
                experience:
                    "Student at ALWIUT and active MUN participant since 2023, Muazzam is recognized for structured moderation and consistent high-level engagement across committees.",
                photo_url: "/chairs/muazzam_muminova.jpg",
                image_position: "center 50%",
            },
            {
                id: "5f2ad2d3-4897-4bda-b7d9-c58a2213c167",
                name: "Khadija Bakhromova",
                role: "Co-Chair",
                experience:
                    "Known for her work as a writer and organizer, Khadija brings strong rhetorical skills and confident public speaking to committee leadership.",
                photo_url: "/chairs/khadija_bakhromova.jpg",
                image_position: "center 50%",
            },
        ],
        registration_open: true,
        order: 2,
    },
    // ── 2. INTERMEDIATE ─────────────────────────────────────────────────────────
    {
        id: "f23b2c4f-d8ef-4904-a568-9e5425c3b43d",
        name: "Commission on Crime Prevention and Criminal Justice",
        name_ru: null,
        description:
            "The Commission on Crime Prevention and Criminal Justice (CCPCJ) serves as the principal policymaking body of the United Nations on criminal justice matters, guiding the work of UNODC in implementing international standards globally. Established in 1992, it coordinates international efforts on crime prevention, criminal justice reform, and combating transnational organized crime. The Commission develops international standards, norms, and recommendations in the field of crime prevention, and conducts research into emerging criminal justice trends. It works in close partnership with member states and UNODC to address the evolving challenges posed by organized crime, environmental crimes, and cybercrime.",
        agenda: [
            "Enhancing Global Responses to Environmental Crimes and Their Links to Transnational Organized Crime",
        ],
        background_image: "/committees/ccpcj.jpg",
        chairs: [
            {
                id: "26205455-a26a-4a7a-a02b-530b42368375",
                name: "Dilshod Khalbekov",
                role: "Main Chair",
                experience:
                    "Currently on a gap year, Dilshod has broad experience across chairing, delegating, and organizing conferences. He approaches criminal justice topics with procedural authority and a focus on realistic enforcement mechanisms.",
                photo_url: "/chairs/dilshod_khalbekov.jpg",
                image_position: "center 50%",
            },
            {
                id: "41cc5c59-b441-47c3-b00a-a1b04b8859e0",
                name: "Fahriddin Shirinov",
                role: "Co-Chair",
                experience:
                    "A graduate of CIS Tashkent, Fahriddin brings years of involvement in MUN both as delegate and chair. His moderation style emphasizes disciplined negotiation and well-structured resolutions.",
                photo_url: "/chairs/fahriddin_shirinov.jpg",
                image_position: "center 50%",
            },
            {
                id: "1cf9e072-61d7-4e64-a1f0-0a1c13bad43d",
                name: "Roman Kim",
                role: "Co-Chair",
                experience:
                    "Student at The British School of Tashkent and Secretary-General of BSTMUN '25, Roman combines international-level recognition with confident committee management and strong procedural control.",
                photo_url: "/chairs/roman_kim.jpg",
                image_position: "center 50%",
            },
        ],
        registration_open: true,
        order: 3,
    },
    {
        id: "866f360d-addb-4057-9e20-ff0d089222c0",
        name: "International Organization for Migration",
        name_ru: null,
        description:
            "The International Organization for Migration (IOM) is the leading intergovernmental organization dedicated to promoting humane and orderly migration for the benefit of all — migrants, societies, and governments alike. Founded in 1951, IOM works closely with governmental, intergovernmental, and non-governmental partners to address migration challenges and advance understanding of migration issues. It fulfills a critical role in addressing the humanitarian needs of migrants, refugees, and internally displaced persons, through coordination of emergency responses and long-term programming. Operating in more than 170 countries, IOM is committed to upholding the dignity and rights of migrants while supporting states in the effective management of migration.",
        agenda: [
            "Addressing the Humanitarian Consequences of Mass Deportation Operations on Migrant Communities",
        ],
        background_image: "/committees/migration.JPG",
        chairs: [
            {
                id: "5fe180b1-2471-4a07-a218-2affea3480f1",
                name: "Ezoza Bobomurodova",
                role: "Main Chair",
                experience:
                    "A sophomore majoring in International Relations at Webster University in Tashkent, Ezoza has chaired extensively and is known for maintaining analytical depth and procedural professionalism in humanitarian debates.",
                photo_url: "/chairs/ezoza_bobomurodova.jpg",
                image_position: "center 50%",
            },
            {
                id: "dd66a9e7-eb17-42f5-a053-2cce66798a3d",
                name: "Khonzodabegim Burkhonova",
                role: "Co-Chair",
                experience:
                    "A sophomore at TSUL, Khonzodabegim combines legal academic training with consistent MUN leadership experience, emphasizing structured and policy-based discussions.",
                photo_url: "/chairs/khonzodabegim_burkhonova.jpg",
                image_position: "center 50%",
            },
            {
                id: "90da4699-fded-4fa1-b882-e704f52d20dc",
                name: "Saida Adkhamova",
                role: "Co-Chair",
                experience:
                    "A Year 11 student at The British School of Tashkent and two-time \"Best Chair\" recipient, Saida is recognized for balanced moderation and high debate standards.",
                photo_url: "/chairs/saida_adkhamova.jpg",
                image_position: "center 50%",
            },
        ],
        registration_open: true,
        order: 4,
    },
    // ── 3. ADVANCED ─────────────────────────────────────────────────────────────
    {
        id: "cd231913-8228-4af3-bc86-b2bf8162c655",
        name: "United Nations Security Council",
        name_ru: null,
        description:
            "The United Nations Security Council holds primary responsibility for the maintenance of international peace and security under the UN Charter, making it the most powerful decision-making body within the United Nations system. It consists of 15 members: five permanent members with veto power — China, France, Russia, the United Kingdom, and the United States — and ten non-permanent members elected by the General Assembly for two-year terms. The Security Council has the authority to impose legally binding resolutions, establish peacekeeping missions, authorize the use of force, and implement international sanctions against states or non-state actors. It convenes whenever international peace or security is perceived to be threatened, demanding delegates to engage with high-stakes geopolitical scenarios under strict time pressure.",
        agenda: [
            "Mitigating Armed Conflicts and Terrorist Expansion in the Sahel Region",
        ],
        background_image: "/committees/secrity.JPG",
        chairs: [
            {
                id: "322020ca-8861-4c71-b0af-0800648dffef",
                name: "Abdumajid Toshmatov",
                role: "Main Chair",
                experience:
                    "A sophomore at TSUE and active professional at Payme, Abdumajid brings extensive conference experience and a decisive leadership style suited for crisis-driven Security Council simulations.",
                photo_url: "/chairs/abdumajid_toshmatov.jpg",
                image_position: "center 50%",
            },
            {
                id: "40571ec6-f468-4d1d-9468-cbb77160c1d0",
                name: "Dilnoza Yuldasheva",
                role: "Co-Chair",
                experience:
                    "A Webster University student with multiple awards and diverse MUN roles, Dilnoza is known for analytical consistency and calm procedural control.",
                photo_url: "/chairs/dilnoza_yuldasheva.jpg",
                image_position: "center 50%",
            },
            {
                id: "79323f6b-c483-4dad-b999-3fdc9b2d8f83",
                name: "Mark Tokarev",
                role: "Co-Chair",
                experience:
                    "A student at Interhouse Lyceum, Mark combines competitive delegate experience with confident chairing, ensuring disciplined and strategic debate.",
                photo_url: "/chairs/mark_tokarev.jpg",
                image_position: "center 75%",
            },
        ],
        registration_open: true,
        order: 5,
    },
    {
        id: "af870613-a7be-4773-84a5-a7563f9f28df",
        name: "Congress of Vienna",
        name_ru: null,
        description:
            "The Congress of Vienna was a landmark diplomatic conference held in 1814–1815 to reshape the political landscape of Europe following the Napoleonic Wars, bringing together representatives of all major European powers. Delegates were tasked with establishing a new political order, redrawing national borders, and creating a framework for maintaining peace and stability across the continent for generations to come. The Congress established the Concert of Europe, an innovative system of multilateral diplomacy and collective security that governed European affairs for nearly a century. This committee simulates the historical negotiations and strategic decisions of the Congress, challenging delegates to analyze and engage with the complex diplomatic realities of the early nineteenth century.",
        agenda: ["Historical Simulation (Restoring Order in Europe)"],
        background_image: "/committees/congressofviena.JPG",
        chairs: [
            {
                id: "f09170d8-599f-4129-b453-285441dc3b2d",
                name: "Saidakhmadkhon Saidaminov",
                role: "Main Chair / Congress Arbiter",
                experience:
                    "Active in MUN since 2020 with international conference recognition, Saidakhmadkhon specializes in historical simulations and structured diplomatic negotiation.",
                photo_url: "/chairs/saidakhmadkhon_saidaminov.jpg",
                image_position: "center 50%",
            },
            {
                id: "b3dbe5cb-52ae-407a-b7b1-e112dc771ee4",
                name: "Neve Marie Crige",
                role: "Co-Chair / Chairperson",
                experience:
                    "Participating in MUN since 2023, Neve has earned international-level recognition and is committed to maintaining historically grounded and strategically dynamic debate.",
                photo_url: "/chairs/neve_marie_crige.jpg",
                image_position: "center 50%",
            },
        ],
        registration_open: true,
        order: 6,
    },
    {
        id: "ee2381a7-0918-42fa-a026-e6da9ce34efd",
        name: "Комитет Государственной Думы России",
        name_ru: "Комитет Государственной Думы России",
        description:
            "Комитет Государственной Думы Российской Федерации — это симуляция заседания нижней палаты российского парламента, принимающей федеральные законы и определяющей внутреннюю политику страны. Государственная Дума является ключевым законодательным органом власти, в котором представлены различные политические фракции с разными позициями по острым вопросам государственного управления. В рамках данного комитета делегаты рассматривают значимые исторические события, дискутируют о законодательных решениях и анализируют политические процессы России через призму парламентских дебатов. Симуляция проводится полностью на русском языке, что позволяет делегатам развить дипломатические, аналитические и ораторские навыки в профессиональном академическом формате.",
        agenda: [
            "\u00ab\u0427\u0451\u0440\u043d\u044b\u0439 \u043e\u043a\u0442\u044f\u0431\u0440\u044c\u00bb: \u041f\u043e\u043b\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0438 \u043a\u043e\u043d\u0441\u0442\u0438\u0442\u0443\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u043a\u0440\u0438\u0437\u0438\u0441 1993 \u0433\u043e\u0434\u0430 \u0432 \u0420\u043e\u0441\u0441\u0438\u0438.",
        ],
        background_image: "/committees/gosduma.jpg",
        chairs: [
            {
                id: "c1e1fb4f-3b5e-4631-b27d-19f8d94d6053",
                name: "\u0410\u0441\u0430\u043b\u044c \u0428\u0443\u043a\u0443\u0440\u043e\u0432\u0430",
                role: "\u041f\u0440\u0435\u0434\u0441\u0435\u0434\u0430\u0442\u0435\u043b\u044c / Main Chair",
                experience:
                    "\u041f\u0435\u0440\u0432\u043e\u043a\u0443\u0440\u0441\u043d\u0438\u0446\u0430 \u0410\u043a\u0430\u0434\u0435\u043c\u0438\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u043b\u0438\u0446\u0435\u044f \u0418\u043d\u0442\u0435\u0440\u0445\u0430\u0443\u0441 \u0441 \u0431\u043e\u043b\u0435\u0435 20 \u043a\u043e\u043d\u0444\u0435\u0440\u0435\u043d\u0446\u0438\u044f\u043c\u0438 \u041c\u041e\u041e\u041d. \u0410\u0441\u0430\u043b\u044c \u0441\u043e\u0447\u0435\u0442\u0430\u0435\u0442 \u043e\u043f\u044b\u0442 \u043f\u0440\u0435\u0434\u0441\u0435\u0434\u0430\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u0430 \u0441 \u0432\u043d\u0438\u043c\u0430\u043d\u0438\u0435\u043c \u043a \u044e\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043a\u043e\u0439 \u0430\u0440\u0433\u0443\u043c\u0435\u043d\u0442\u0430\u0446\u0438\u0438 \u0438 \u043f\u043e\u043b\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u043e\u043c\u0443 \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442\u0443.",
                photo_url: "/chairs/asal_shukurova.jpg",
                image_position: "center 50%",
            },
            {
                id: "e9fc0ef2-17a8-47c4-a2fd-67dcb6526000",
                name: "\u041c\u0430\u0440\u0438\u044f\u043c \u041c\u0435\u043b\u0430\u043d-\u041c\u0435\u043b\u0438\u0431\u0430\u0435\u0432\u0430",
                role: "\u041f\u0440\u0435\u0434\u0441\u0435\u0434\u0430\u0442\u0435\u043b\u044c / Co-Chair",
                experience:
                    "\u0421\u0442\u0443\u0434\u0435\u043d\u0442\u043a\u0430 \u0412\u0435\u0431\u0441\u0442\u0435\u0440\u0441\u043a\u043e\u0433\u043e \u0443\u043d\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442\u0430 \u0432 \u0422\u0430\u0448\u043a\u0435\u043d\u0442\u0435, \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u0446\u0430 \u0431\u043e\u043b\u0435\u0435 17 \u043a\u043e\u043d\u0444\u0435\u0440\u0435\u043d\u0446\u0438\u0439 \u041c\u041e\u041e\u041d \u0438 \u0428\u041e\u0421. \u041c\u0430\u0440\u0438\u044f\u043c \u0438\u0437\u0432\u0435\u0441\u0442\u043d\u0430 \u043a\u0430\u043a \u0443\u0432\u0435\u0440\u0435\u043d\u043d\u044b\u0439 \u0438 \u0434\u0438\u0441\u0446\u0438\u043f\u043b\u0438\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u043c\u043e\u0434\u0435\u0440\u0430\u0442\u043e\u0440 \u043f\u043e\u043b\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0434\u0438\u0441\u043a\u0443\u0441\u0441\u0438\u0439.",
                photo_url: "/chairs/mariyam_melibaeva.jpg",
                image_position: "center 50%",
            },
        ],
        registration_open: true,
        order: 7,
    },
    {
        id: "b21a56ab-da9f-4526-a3d0-8580a5624e18",
        name: "Press Corps",
        name_ru: null,
        description:
            "The Press Corps is a unique committee that operates differently from all other committees at this conference, offering delegates a distinctive perspective on conference diplomacy. Rather than debating resolutions, delegates in the Press Corps act as journalists, reporters, editors, and media professionals tasked with covering the proceedings of all other committees in real time. Members of the Press Corps produce written articles, multimedia content, and live reporting that captures the debates, key speeches, and outcomes emerging from across the conference. This committee offers an exceptional experience for delegates interested in journalism, communication, and the critical role of media in shaping public discourse on international affairs.",
        agenda: ["No Fixed Agenda"],
        background_image: "/committees/press.JPG",
        chairs: [
            {
                id: "a958cd74-c60e-4a97-8983-43749bb98374",
                name: "Nozanin Makhmudova",
                role: "Main Chair",
                experience:
                    "Senior at Interhouse Lyceum with over 20 conferences of experience, Nozanin oversees analytical reporting and structured media coordination within the Press Corps.",
                photo_url: "/chairs/placeholder-chair.jpg",
                image_position: "center 50%",
            },
            {
                id: "21e5e682-2f55-47d2-bbea-ce9ebf317eee",
                name: "Lola Yuldasheva",
                role: "Co-Chair",
                experience:
                    "With a background in design and media production, Lola ensures professional visual storytelling and organized media coverage throughout the conference.",
                photo_url: "/chairs/placeholder-chair.jpg",
                image_position: "center 50%",
            },
        ],
        registration_open: true,
        order: 8,
    },
];

export const STATIC_SETTINGS = {
    registration_open: true,
    conference_date: "28\u201329 March 2026",
    conference_location: "International House Lyceum, Tashkent",
    about_description:
        "IHL Model United Nations is the premier MUN conference in Uzbekistan, bringing together young diplomats from across the region to debate critical global issues, develop diplomatic skills, and build lasting connections.",
    instagram_url: "https://www.instagram.com/ihl_mun",
};

export const STATIC_SECRETARIAT = [
    {
        id: "sec-dg",
        name: "Khojiakbar Turabekov",
        role: "Director-General",
        photo_url: "./secretariat/khojiakbar_turabekov.jpg",
        experience: "Ensuring effective operational and administrative management.",
        tier: 1
    },
    {
        id: "sec-sg",
        name: "A’zamjonov Abdurakhmon",
        role: "Secretary-General",
        photo_url: "./secretariat/abdurakhmon_azamjonov.jpg",
        imagePosition: "center 20%",
        experience: "Leading the conference with overarching authority.",
        tier: 1
    },
    {
        id: "sec-vsg",
        name: "Mirzakarimov Amirkhon",
        role: "Vice-Secretary General",
        photo_url: "./secretariat/amirkhon_mirzakarimov.jpg",
        experience: "Assisting the Secretary-General in key conference matters.",
        tier: 1
    },
    {
        id: "sec-event",
        name: "Jong Sabina",
        role: "Head of Event",
        photo_url: "./secretariat/sabina_jong.jpg",
        experience: "Organizing logistics, opening/closing ceremonies, and social events.",
        tier: 2
    },
    {
        id: "sec-volunteers",
        name: "Seyt-Akaeva Elina",
        role: "Head of Volunteers",
        photo_url: "./secretariat/elina_seyt_akaeva.jpg",
        experience: "Coordinating and training the volunteer staff for the conference.",
        tier: 2
    },
    {
        id: "sec-media",
        name: "Muradkasimova Kamila",
        role: "Head of Media",
        photo_url: "./secretariat/kamila_muradkasimova.jpg",
        experience: "Managing public relations, content creation, and media strategies.",
        tier: 2
    },
    {
        id: "sec-delegate",
        name: "Kayumov Shakhboz",
        role: "Head of Delegate Affairs",
        photo_url: "./secretariat/shakhboz_kayumov.png",
        experience: "Handling all delegate communications and registration affairs.",
        tier: 2
    },
    {
        id: "sec-site",
        name: "Muxammadamin Isamiddinov",
        role: "Site Developer",
        photo_url: "./secretariat/muxammadamin_isamiddinov.png",
        experience: "Managing the conference website and digital infrastructure.",
        tier: 2
    }
];
