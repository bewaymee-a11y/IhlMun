import { createContext, useContext, useState, useEffect } from 'react';

// Translations
const translations = {
  en: {
    // Navigation
    home: 'Home',
    committees: 'Committees',
    selection: 'Selection',
    aboutUs: 'About Us',
    media: 'Media',
    register: 'Register',
    applyNow: 'Apply Now',

    // Hero
    ihlModel: 'IHL Model',
    unitedNations: 'United Nations',
    participationFree: 'Participation is completely FREE',
    heroDescription: 'Join the premier Model United Nations conference in Uzbekistan. Debate global issues, forge connections, and develop your diplomatic skills.',
    learnMore: 'Learn More',
    selectionProcess: 'Selection Process',

    // Stats
    date: 'Date',
    location: 'Location',
    committeesCount: 'Committees',
    delegates: 'Delegates',
    freeForSelected: 'Free for selected delegates',

    // Selection
    freeParticipationWithSelection: 'Free Participation with Selection',
    selectionDescription: 'IHL MUN 2026 is completely free for all selected delegates. Due to high interest and limited spots, there will be a strict selection process.',
    allApplicationsReviewed: 'All applications are reviewed manually',
    checkOriginality: 'We check for originality and no AI-generated content',
    shortlistedInterview: 'Shortlisted candidates may be invited for interview',
    finalDecisions: 'Final decisions communicated via email/Telegram',
    learnMoreSelection: 'Learn more about selection',

    // Committees
    ourCommittees: 'Our Committees',
    committeesSubtitle: 'Choose from eight diverse committees covering critical global issues',
    viewAllCommittees: 'View All Committees',
    chairs: 'Chairs',
    agenda: 'Agenda',
    committeeChairs: 'Committee Chairs',
    registerForCommittee: 'Register for this Committee',
    registrationClosed: 'Registration Closed',

    // Registration Form
    applyFor: 'Apply for',
    fillApplicationForm: 'Fill out the application form below. All applications are reviewed by our Delegate Relations team.',
    participationIsFree: 'Participation is FREE',
    freeNotice: 'IHL MUN 2026 is completely free for all selected delegates. Due to limited spots, there will be a strict selection process. Please answer all questions thoughtfully.',
    personalInformation: 'Personal Information',
    fullName: 'Full Name',
    institution: 'Institution',
    phoneNumber: 'Phone Number',
    email: 'Email',
    applicationQuestions: 'Application Questions',
    whyAttend: 'Why do you want to attend IHL MUN\'26?',
    minimum80Words: 'Minimum 80 words',
    wordCount: 'Word count',
    minimum: 'minimum',
    munExperience: 'What are your previous MUN experiences?',
    twoSentences: '2 sentences',
    whyCommittee: 'Why did you choose',
    alternativeCommittees: 'Which committees would you choose if this one was unavailable?',
    consentConfirmation: 'Consent & Confirmation',
    consentInterview: 'I consent to being invited for an interview if shortlisted (optional but recommended)',
    understandsSelection: 'I understand that participation is free but subject to a strict selection process',
    submitApplication: 'Submit Application',
    applicationReceived: 'Application Received!',
    thankYouApplying: 'Thank you for applying to',
    reviewContact: 'Our Delegate Relations team will review your application and contact you soon.',
    backToCommittees: 'Back to Committees',

    // About
    ourMission: 'Our Mission',
    conferenceDetails: 'Conference Details',
    theSecretariat: 'The Secretariat',
    meetTheTeam: 'Meet the team behind IHL MUN 2026',
    secretariatSoon: 'Secretariat members will be announced soon.',

    // Selection Process Page
    registrationSelectionProcess: 'Registration & Selection Process',
    everythingYouNeed: 'Everything you need to know about applying to IHL MUN 2026',
    participationCompletelyFree: 'Participation is Completely FREE',
    freeParticipationDescription: 'IHL MUN 2026 is completely free for all selected delegates. Due to high interest and limited spots, there will be a strict selection process conducted by our Delegate Relations Officers.',
    howSelectionWorks: 'How Selection Works',
    submitApplicationStep: 'Submit Application',
    submitApplicationDesc: 'Fill out the application form with your personal information and essay responses. Answer all questions thoughtfully and originally.',
    applicationReview: 'Application Review',
    applicationReviewDesc: 'Our Delegate Relations team manually reviews every application, checking for originality, depth of answers, and motivation.',
    interviewOptional: 'Interview',
    interviewDesc: 'Shortlisted candidates may be invited for a short interview to discuss their application and interest in MUN.',
    finalDecision: 'Final Decision',
    finalDecisionDesc: 'Final decisions will be communicated via email and Telegram. Accepted delegates will receive further instructions.',
    whatWeLookFor: 'What We Look For',
    whatWeLookForDesc: 'Our Delegate Relations team evaluates every application based on several criteria. We aim to select the most motivated, prepared, and active delegates to ensure the highest quality debates and discussions.',
    originalityResponses: 'Originality of responses',
    noAiContent: 'No AI-generated content',
    noPlagiarism: 'No plagiarism',
    relevanceQuestions: 'Relevance to questions',
    depthUnderstanding: 'Depth of understanding',
    demonstratedMotivation: 'Demonstrated motivation',
    munExperienceHelpful: 'MUN experience (helpful but not required)',
    commitmentParticipate: 'Commitment to participate',
    applicationTips: 'Application Tips',
    beOriginal: 'Be original:',
    beOriginalDesc: 'Write your own responses. AI-generated or plagiarized content will result in immediate rejection.',
    beSpecific: 'Be specific:',
    beSpecificDesc: 'Generic answers don\'t stand out. Share your personal experiences and genuine motivations.',
    showPassion: 'Show passion:',
    showPassionDesc: 'We want delegates who are genuinely interested in international affairs and diplomacy.',
    meetWordRequirements: 'Meet word requirements:',
    meetWordRequirementsDesc: 'The "Why attend" question requires at least 80 words. Take your time to write a thoughtful response.',
    readyToApply: 'Ready to Apply?',
    chooseCommittee: 'Choose your committee and submit your application. Good luck!',
    viewCommitteesApply: 'View Committees & Apply',

    // Media
    mediaGallery: 'Media Gallery',
    photosFromEvents: 'Photos from past events and conference preparations',
    galleryComingSoon: 'Gallery Coming Soon',
    photosShared: 'Photos from our events will be shared here. Follow our Instagram for the latest updates.',

    // Footer
    quickLinks: 'Quick Links',
    conferenceInfo: 'Conference Info',
    connect: 'Connect',
    freeParticipation: 'FREE PARTICIPATION',
    subjectToSelection: 'Subject to selection',
    allRightsReserved: 'All rights reserved.',
    adminPanel: 'Admin Panel',

    // Common
    loading: 'Loading...',
    error: 'Error',
    comingSoon: 'Coming Soon',
    noCommitteesYet: 'No committees available yet. Check back soon!',

    // Speakers
    guestSpeakers: 'Guest Speakers',
    speakersSubtitle: 'Distinguished speakers at the Opening Ceremony',
    speakersComingSoon: 'Guest speakers will be announced as the conference approaches. Follow our Instagram for updates.',

    // Benefits cards
    globalPerspective: 'Global Perspective',
    globalPerspectiveDesc: 'Understand international issues from multiple perspectives and cultures.',
    leadershipSkills: 'Leadership Skills',
    leadershipSkillsDesc: 'Develop public speaking, negotiation, and critical thinking abilities.',
    recognition: 'Recognition',
    recognitionDesc: 'Earn awards and recognition for outstanding diplomacy and debate.',
    networking: 'Networking',
    networkingDesc: 'Connect with like-minded students from across the region.',

    // Footer
    footerDescription: 'Join the premier Model United Nations conference in Central Asia.',
  },
  ru: {
    // Navigation
    home: 'Главная',
    committees: 'Комитеты',
    selection: 'Отбор',
    aboutUs: 'О нас',
    media: 'Медиа',
    register: 'Регистрация',
    applyNow: 'Подать заявку',

    // Hero
    ihlModel: 'Модель',
    unitedNations: 'ООН IHL',
    participationFree: 'Участие полностью БЕСПЛАТНОЕ',
    heroDescription: 'Присоединяйтесь к премьер-конференции Модели ООН в Узбекистане. Обсуждайте глобальные проблемы, налаживайте связи и развивайте дипломатические навыки.',
    learnMore: 'Узнать больше',
    selectionProcess: 'Процесс отбора',

    // Stats
    date: 'Дата',
    location: 'Место',
    committeesCount: 'Комитеты',
    delegates: 'Делегаты',
    freeForSelected: 'Бесплатно для отобранных делегатов',

    // Selection
    freeParticipationWithSelection: 'Бесплатное участие с отбором',
    selectionDescription: 'IHL MUN 2026 полностью бесплатен для всех отобранных делегатов. Из-за высокого интереса и ограниченного количества мест будет строгий отбор.',
    allApplicationsReviewed: 'Все заявки рассматриваются вручную',
    checkOriginality: 'Проверка на оригинальность и отсутствие AI-контента',
    shortlistedInterview: 'Отобранные кандидаты могут быть приглашены на собеседование',
    finalDecisions: 'Итоговые решения сообщаются по email/Telegram',
    learnMoreSelection: 'Подробнее об отборе',

    // Committees
    ourCommittees: 'Наши комитеты',
    committeesSubtitle: 'Выберите из восьми разнообразных комитетов, охватывающих важные глобальные вопросы',
    viewAllCommittees: 'Все комитеты',
    chairs: 'Председатели',
    agenda: 'Повестка дня',
    committeeChairs: 'Председатели комитета',
    registerForCommittee: 'Подать заявку в этот комитет',
    registrationClosed: 'Регистрация закрыта',

    // Registration Form
    applyFor: 'Заявка в',
    fillApplicationForm: 'Заполните форму заявки ниже. Все заявки рассматриваются нашей командой по работе с делегатами.',
    participationIsFree: 'Участие БЕСПЛАТНОЕ',
    freeNotice: 'IHL MUN 2026 полностью бесплатен для всех отобранных делегатов. Из-за ограниченного количества мест будет строгий отбор. Пожалуйста, ответьте на все вопросы вдумчиво.',
    personalInformation: 'Личная информация',
    fullName: 'ФИО',
    institution: 'Учебное заведение',
    phoneNumber: 'Номер телефона',
    email: 'Электронная почта',
    applicationQuestions: 'Вопросы заявки',
    whyAttend: 'Почему вы хотите участвовать в IHL MUN\'26?',
    minimum80Words: 'Минимум 80 слов',
    wordCount: 'Количество слов',
    minimum: 'минимум',
    munExperience: 'Какой у вас предыдущий опыт MUN?',
    twoSentences: '2 предложения',
    whyCommittee: 'Почему вы выбрали',
    alternativeCommittees: 'Какие комитеты вы бы выбрали, если этот будет недоступен?',
    consentConfirmation: 'Согласие и подтверждение',
    consentInterview: 'Я согласен быть приглашённым на собеседование в случае отбора (необязательно, но рекомендуется)',
    understandsSelection: 'Я понимаю, что участие бесплатное, но требует прохождения отбора',
    submitApplication: 'Отправить заявку',
    applicationReceived: 'Заявка получена!',
    thankYouApplying: 'Спасибо за заявку в',
    reviewContact: 'Наша команда рассмотрит вашу заявку и скоро свяжется с вами.',
    backToCommittees: 'Вернуться к комитетам',

    // About
    ourMission: 'Наша миссия',
    conferenceDetails: 'Информация о конференции',
    theSecretariat: 'Секретариат',
    meetTheTeam: 'Познакомьтесь с командой IHL MUN 2026',
    secretariatSoon: 'Члены секретариата будут объявлены в ближайшее время.',

    // Selection Process Page
    registrationSelectionProcess: 'Регистрация и процесс отбора',
    everythingYouNeed: 'Всё, что нужно знать о подаче заявки на IHL MUN 2026',
    participationCompletelyFree: 'Участие полностью БЕСПЛАТНОЕ',
    freeParticipationDescription: 'IHL MUN 2026 полностью бесплатен для всех отобранных делегатов. Из-за высокого интереса и ограниченного количества мест отбор будет строгим.',
    howSelectionWorks: 'Как работает отбор',
    submitApplicationStep: 'Подача заявки',
    submitApplicationDesc: 'Заполните форму заявки с личной информацией и ответами на эссе. Отвечайте вдумчиво и оригинально.',
    applicationReview: 'Рассмотрение заявки',
    applicationReviewDesc: 'Наша команда вручную рассматривает каждую заявку, проверяя оригинальность, глубину ответов и мотивацию.',
    interviewOptional: 'Собеседование',
    interviewDesc: 'Отобранные кандидаты могут быть приглашены на короткое собеседование.',
    finalDecision: 'Итоговое решение',
    finalDecisionDesc: 'Итоговые решения будут сообщены по email и Telegram. Принятые делегаты получат дальнейшие инструкции.',
    whatWeLookFor: 'Что мы ищем',
    whatWeLookForDesc: 'Наша команда оценивает каждую заявку по нескольким критериям. Мы стремимся отобрать самых мотивированных и подготовленных делегатов.',
    originalityResponses: 'Оригинальность ответов',
    noAiContent: 'Отсутствие AI-контента',
    noPlagiarism: 'Отсутствие плагиата',
    relevanceQuestions: 'Соответствие вопросам',
    depthUnderstanding: 'Глубина понимания',
    demonstratedMotivation: 'Демонстрация мотивации',
    munExperienceHelpful: 'Опыт MUN (полезен, но не обязателен)',
    commitmentParticipate: 'Готовность участвовать',
    applicationTips: 'Советы по заявке',
    beOriginal: 'Будьте оригинальны:',
    beOriginalDesc: 'Пишите свои собственные ответы. AI-контент или плагиат приведут к отклонению.',
    beSpecific: 'Будьте конкретны:',
    beSpecificDesc: 'Общие ответы не выделяются. Делитесь личным опытом и настоящей мотивацией.',
    showPassion: 'Покажите страсть:',
    showPassionDesc: 'Мы ищем делегатов, искренне заинтересованных в международных отношениях.',
    meetWordRequirements: 'Соблюдайте требования:',
    meetWordRequirementsDesc: 'Вопрос "Почему участвовать" требует минимум 80 слов. Уделите время вдумчивому ответу.',
    readyToApply: 'Готовы подать заявку?',
    chooseCommittee: 'Выберите комитет и отправьте заявку. Удачи!',
    viewCommitteesApply: 'Смотреть комитеты и подать заявку',

    // Media
    mediaGallery: 'Медиа галерея',
    photosFromEvents: 'Фото с прошлых мероприятий и подготовки к конференции',
    galleryComingSoon: 'Галерея скоро появится',
    photosShared: 'Фото с наших мероприятий будут размещены здесь. Следите за обновлениями в Instagram.',

    // Footer
    quickLinks: 'Быстрые ссылки',
    conferenceInfo: 'О конференции',
    connect: 'Связь',
    freeParticipation: 'БЕСПЛАТНОЕ УЧАСТИЕ',
    subjectToSelection: 'При прохождении отбора',
    allRightsReserved: 'Все права защищены.',
    adminPanel: 'Админ панель',

    // Common
    loading: 'Загрузка...',
    error: 'Ошибка',
    comingSoon: 'Скоро',
    noCommitteesYet: 'Комитеты пока недоступны. Следите за обновлениями!',

    // Speakers
    guestSpeakers: 'Приглашённые спикеры',
    speakersSubtitle: 'Выступающие на церемонии открытия',
    speakersComingSoon: 'Приглашённые спикеры будут объявлены ближе к конференции. Следите за обновлениями в Instagram.',

    // Benefits cards
    globalPerspective: 'Глобальная перспектива',
    globalPerspectiveDesc: 'Понимание международных проблем с разных точек зрения и культур.',
    leadershipSkills: 'Лидерские навыки',
    leadershipSkillsDesc: 'Развитие публичных выступлений, переговоров и критического мышления.',
    recognition: 'Признание',
    recognitionDesc: 'Получение наград и признания за выдающуюся дипломатию и дебаты.',
    networking: 'Нетворкинг',
    networkingDesc: 'Связь с единомышленниками со всего региона.',

    // Footer
    footerDescription: 'Присоединяйтесь к премьер-конференции Модели ООН в Центральной Азии.',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
