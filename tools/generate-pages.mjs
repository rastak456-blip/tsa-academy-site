import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const pagesDir = path.join(root, 'pages');

const menu = [
  { label: 'About TSA', children: [
    ['Educational Philosophy', 'about-philosophy.html'],
    ['The TSA Difference', 'about-difference.html'],
    ['Our Teachers', 'about-teachers.html'],
    ['Student Care & Safety', 'about-care.html'],
    ['Daily Schedule', 'about-schedule.html'],
  ]},
  { label: 'Gallery', children: [
    ['Campus', 'gallery-campus.html'],
    ['Accommodation', 'gallery-stay.html'],
    ['Activities', 'gallery-activities.html'],
  ]},
  { label: 'Curriculum', children: [
    ['Courses & Levels', 'curriculum-levels.html'],
    ['ESL', 'curriculum-esl.html'],
    ['Power Speaking', 'curriculum-speaking.html'],
    ['IELTS', 'curriculum-ielts.html'],
    ['Business / TOEIC', 'curriculum-special.html'],
    ['Junior ESL', 'curriculum-junior.html'],
  ]},
  { label: 'Community', children: [
    ['Notice', 'community-notice.html'],
    ['FAQ', 'community-faq.html'],
    ['Partnership Inquiry', 'partnership-inquiry.html'],
  ]},
];

const pageData = {
  'about-philosophy.html': ['About TSA', 'Educational Philosophy', 'English becomes meaningful when students use it with confidence.', ['Student-first learning', 'Practical communication', 'Growth through immersion'], 'https://tsacebu.com/campaign/images/tsa-class-whiteboard.jpg'],
  'about-difference.html': ['About TSA', 'The TSA Difference', 'Premium learning, living, and student care are designed as one connected experience.', ['Cebu IT Park location', 'Private 1:1 classrooms', 'Dedicated student manager'], 'https://tsacebu.com/campaign/images/hero-slide-02.jpg'],
  'about-teachers.html': ['About TSA', 'Our Teachers', 'Great lessons start with teachers who have proven classroom expertise.', ['TESOL certified', '3+ years of experience', 'Ongoing evaluation and training'], 'https://tsacebu.com/campaign/images/tsa-teachers.jpg'],
  'about-care.html': ['About TSA', 'Student Care & Safety', 'Every student receives continuous support from enrollment through completion.', ['Dedicated 1:1 manager', '24-hour on-site support', 'Multilingual assistance'], 'https://tsacebu.com/campaign/images/tsa-manager-student-consultation.jpg'],
  'about-schedule.html': ['About TSA', 'Daily Schedule', 'A balanced weekday routine combines focused classes, meals, self-study, and rest.', ['Morning 1:1 classes', 'Afternoon group and elective classes', 'Evening review and self-study'], 'https://tsacebu.com/campaign/images/tsa-1-on-1-tutoring-class.jpg'],
  'gallery-campus.html': ['Gallery', 'Campus', 'Explore TSA classrooms, reception, lounges, café, and shared learning spaces.', ['Reception', '1:1 classrooms', 'Student lounge'], 'https://tsacebu.com/campaign/images/tsa-lounge-public-space.jpg'],
  'gallery-stay.html': ['Gallery', 'Accommodation', 'Choose premium condo living or a comfortable hotel-style dormitory.', ['Avida Riala Tower', 'Hotel-style rooms', 'Pool and sports facilities'], 'https://tsacebu.com/campaign/images/tsa-dormitory-aerial-view-pool.jpg'],
  'gallery-activities.html': ['Gallery', 'Activities', 'Experience Cebu through safe, staff-supported weekend programs.', ['Island hopping', 'Cebu city tour', 'Night market and safari'], 'https://tsacebu.com/campaign/images/bohol-hopping-tour.jpg'],
  'curriculum-levels.html': ['Curriculum', 'Courses & Levels', 'Find the right course by goal, study intensity, and current English level.', ['Daily 4-hour track', 'Daily 6-hour track', 'Daily 8-hour track'], 'https://tsacebu.com/campaign/images/tsa-teacher-textbook.jpg'],
  'curriculum-esl.html': ['Curriculum', 'ESL', 'Balanced English training across listening, speaking, reading, and writing.', ['1:1 customized lessons', 'Small-group communication', 'Level-based progression'], 'https://tsacebu.com/campaign/images/tsa-class-whiteboard.jpg'],
  'curriculum-speaking.html': ['Curriculum', 'Power Speaking', 'An intensive speaking course built around high-volume 1:1 practice and correction.', ['Four hours of focused 1:1 speaking', 'Pronunciation and fluency coaching', 'Real conversation confidence'], 'https://tsacebu.com/campaign/images/tsa-1-on-1-tutoring-class.jpg'],
  'curriculum-ielts.html': ['Curriculum', 'IELTS', 'Score-focused preparation for study abroad, work, and immigration goals.', ['Regular mock tests', 'Task-based writing feedback', 'Speaking test simulation'], 'https://tsacebu.com/campaign/images/tsa-teacher-textbook.jpg'],
  'curriculum-special.html': ['Curriculum', 'Business / TOEIC', 'Practical workplace English and systematic TOEIC score preparation.', ['Email and meeting English', 'Presentation practice', 'Weekly TOEIC mock exam'], 'https://tsacebu.com/campaign/images/tsa-group-discussion-room.jpg'],
  'curriculum-junior.html': ['Curriculum', 'Junior ESL', 'Age-appropriate English learning with close academic and daily-life support.', ['Safe supervised learning', 'Speaking-centered classes', 'Progress reports for guardians'], 'https://tsacebu.com/campaign/images/tsa-class-whiteboard.jpg'],
  'community-notice.html': ['Community', 'Notice', 'Check the latest academic, campus, accommodation, and activity updates.', ['Academic notices', 'Campus announcements', 'Schedule updates'], 'https://tsacebu.com/campaign/images/tsa-lobby-common-hall.jpg'],
  'community-faq.html': ['Community', 'FAQ', 'Find answers about enrollment, classes, accommodation, meals, and student support.', ['Enrollment', 'Classes and levels', 'Accommodation and care'], 'https://tsacebu.com/campaign/images/tsa-student-lounge-cafe.jpg'],
  'partnership-inquiry.html': ['Community', 'Partnership Inquiry', 'Connect with TSA to discuss agency cooperation and student support.', ['Agency profile', 'Target market', 'Preferred contact channel'], 'https://tsacebu.com/campaign/images/tsa-manager-student-consultation.jpg'],
};

const curriculumTranslations = new Map([
  ['TSA 커리큘럼 및 레벨', 'TSA Curriculum & Levels'],
  ['과정별 수강 가능 레벨과 하루 수업 구성, 목적에 맞는 코스를 한 번에 확인합니다.', 'Review available levels, daily class structures, and goal-based courses at a glance.'],
  ['균형 잡힌 영어 · 4대 영역을 고르게, 꾸준하게', 'Balanced English · Steady progress across all four skills'],
  ['1:1 비중 강화 · 더 빠른 교정, 더 빠른 향상', 'More 1:1 classes · Faster correction, faster progress'],
  ['하루 종일 말하기 · 이론보다 아웃풋', 'Speak all day · Output before theory'],
  ['REGULAR · 균형 잡힌 영어', 'REGULAR · Balanced English'],
  ['INTENSIVE · 1:1 비중 강화', 'INTENSIVE · More 1:1 Classes'],
  ['POWER SPEAKING · 하루 종일 말하기', 'POWER SPEAKING · Speak All Day'],
  ['목표 밴드 우선', 'Target-band focused'],
  ['코스 코드 읽는 법', 'How to read a course code'],
  ['1:1 5시간, 소그룹 2시간, 중그룹 1시간. 하루 총 8시간.', '5 hours of 1:1, 2 hours of small group, and 1 hour of medium group classes. 8 hours total per day.'],
  ['속도, 주제, 교정까지 학생 레벨에 맞추는 개인 수업', 'Private lessons tailored to each student’s level, pace, topics, and correction needs'],
  ['비슷한 레벨의 학생들과 말하고 반응하는 수업', 'Interactive lessons with a small group of students at a similar level'],
  ['리스닝, 토론, 발표를 통해 다양한 의견을 접하는 수업', 'Lessons that develop listening, discussion, and presentation skills with diverse viewpoints'],
  ['소그룹', 'Small Group'],
  ['중그룹', 'Medium Group'],
  ['Regular / Regular+ 레벨별 과목 구성', 'Regular / Regular+ Subjects by Level'],
  ['Intensive 레벨별 과목 구성', 'Intensive Subjects by Level'],
  ['Power Speaking 레벨별 과목 구성', 'Power Speaking Subjects by Level'],
  ['이런 학생에게 맞습니다', 'Best for students who'],
  ['이런 것을 배웁니다', 'What you will learn'],
  ['처음 어학연수를 오고 전 영역을 고르게 다루고 싶은 경우', 'Are studying abroad for the first time and want balanced practice in every skill'],
  ['읽으면 이해되지만 말하려고 하면 막히는 경우', 'Can understand written English but struggle to speak'],
  ['시험 마감일 없이 실제로 쓰는 영어를 익히고 싶은 경우', 'Want practical English without a fixed exam deadline'],
  ['4·6·8시간 중 일정을 고르고 싶은 경우', 'Want to choose a 4-, 6-, or 8-hour schedule'],
  ['일상·생존 회화', 'Daily & survival conversation'],
  ['주문하기, 물어보기, 설명하기, 스몰토크', 'Ordering, asking questions, explaining, and small talk'],
  ['말하기용 문법', 'Grammar for speaking'],
  ['입으로 만들어내는 문법과 문장 훈련', 'Producing grammar and complete sentences aloud'],
  ['리스닝 & 발음', 'Listening & pronunciation'],
  ['1:1 소리 교정과 그룹 실전 속도 듣기', '1:1 sound correction and real-speed group listening'],
  ['주제별 어휘', 'Topic-based vocabulary'],
  ['대화에 바로 사용하는 단어 묶음', 'Vocabulary sets ready for immediate conversation'],
  ['토론·발표 기초', 'Discussion & presentation fundamentals'],
  ['사람들 앞에서 의견을 정리하고 말하기', 'Organizing and presenting ideas in front of others'],
  ['체류 기간이 4~8주로 짧아 최대한 뽑아내고 싶은 경우', 'Have a short 4–8 week stay and want to maximize progress'],
  ['기초는 있지만 같은 실수를 계속 반복하는 경우', 'Know the basics but keep repeating the same mistakes'],
  ['내가 말한 것을 바로 보고 고쳐주길 원하는 경우', 'Want immediate correction of spoken English'],
  ['그룹보다 1:1에서 더 빨리 느는 편인 경우', 'Progress faster in 1:1 classes than in group lessons'],
  ['내 약점부터', 'Start with your weaknesses'],
  ['실제로 틀리는 부분을 중심으로 수업 구성', 'Lessons built around the errors you actually make'],
  ['유창성과 정확성', 'Fluency and accuracy'],
  ['끊지 않고 길게 말하면서 정확하게', 'Speaking longer and more accurately without stopping'],
  ['더 깊은 문법 교정', 'Deeper grammar correction'],
  ['시제, 관사, 전치사, 어순 교정', 'Correction of tense, articles, prepositions, and word order'],
  ['넓어지는 대화 주제', 'Broader conversation topics'],
  ['일상에서 의견, 비교, 설명으로', 'Moving from daily conversation to opinions, comparisons, and explanations'],
  ['첨삭이 붙는 라이팅', 'Corrected writing practice'],
  ['짧은 작문을 문장 단위로 교정', 'Sentence-level correction of short writing tasks'],
  ['영어를 공부하고 싶은 게 아니라 말하고 싶은 경우', 'Want to speak English, not only study it'],
  ['면접, 해외 근무, 영어로 하는 업무가 앞에 있는 경우', 'Are preparing for interviews, overseas work, or English-based tasks'],
  ['그룹 수업이 잘 맞지 않고 수업 내내 말하고 싶은 경우', 'Prefer speaking throughout class instead of group-based study'],
  ['짧은 기간에 스피킹 변화를 체감하고 싶은 경우', 'Want noticeable speaking improvement in a short period'],
  ['길게 이어 말하기', 'Extended speaking'],
  ['몇 분 단위로, 머릿속 번역 없이', 'Speaking for several minutes without translating mentally'],
  ['유창성 훈련', 'Fluency training'],
  ['섀도잉, 반복, 시간 제한 응답', 'Shadowing, repetition, and timed responses'],
  ['롤플레이 & 디베이트', 'Role-play & debate'],
  ['면접, 회의, 협상, 의견 충돌 상황', 'Interviews, meetings, negotiations, and disagreements'],
  ['발음 & 억양', 'Pronunciation & intonation'],
  ['강세, 리듬, 연음 교정', 'Correction of stress, rhythm, and connected speech'],
  ['즉시 교정', 'Immediate correction'],
  ['말하는 순간 오류를 바로 수정', 'Correcting errors as soon as they occur'],
  ['하루 6~8시간, 하루의 거의 전부를 직접 말하기', '6–8 hours of 1:1 classes, spending most of the day speaking directly'],
  ['8시간 코스에 포함되는 그룹 스피킹 연습', 'Group speaking practice included in the 8-hour course'],
  ['사용하지 않고 모든 시간을 직접 말하는 데 집중', 'No medium group classes; all available time focuses on direct speaking'],
  ['상세 화면 기획 필요', 'Detailed page planning required'],
  ['참고 페이지에서 확인되는 코스는 [8/0/0] IELTS Intensive이며, 메뉴에는 포함되어 있지만 PPT에 소개 영역과 레벨별 과목표 상세 기획이 없습니다.', 'The confirmed course is [8/0/0] IELTS Intensive. It appears in the menu, but the reference PPT does not include a detailed introduction or level-based subject table.'],
  ['참고 페이지에서 확인되는 코스는 [4/4/0] Special English이며, Business와 TOEIC의 구분, 과정 소개 및 과목표 기획이 필요합니다.', 'The confirmed course is [4/4/0] Special English. Separate Business and TOEIC definitions, course introductions, and subject-table planning are still required.'],
  ['Junior ESL, Junior Guardian, Junior Camp, Junior Camp Guardian 코스는 확인되지만, 과정별 소개와 레벨별 과목표 상세 화면 범위는 참고 페이지에 없습니다.', 'Junior ESL, Junior Guardian, Junior Camp, and Junior Camp Guardian are confirmed, but the reference does not define detailed introductions or level-based subject tables for these courses.'],
]);

function localizePage(file, html) {
  if (!file.startsWith('curriculum-')) return html;
  let localized = html;
  for (const [source, translation] of curriculumTranslations) localized = localized.split(source).join(translation);
  return localized;
}

function menuMarkup(current) {
  return menu.map((group) => {
    const isCurrentGroup = group.children.some(([, file]) => file === current);
    return `<div class="main-menu__group${isCurrentGroup ? ' main-menu__group--current' : ''}"><button class="main-menu__button" type="button" aria-expanded="false"><span class="main-menu__text">${group.label}</span><span class="main-menu__icon" aria-hidden="true">⌄</span></button><div class="main-menu__submenu">${group.children.map(([label, file]) => `<a class="main-menu__sublink${file === current ? ' main-menu__sublink--active' : ''}" href="${file}">${label}</a>`).join('')}</div></div>`;
  }).join('');
}

function cards(items) {
  return items.map((item, index) => `<article class="card card--feature"><span class="card__number">0${index + 1}</span><h3 class="card__title">${item}</h3><p class="card__desc">A focused part of the TSA experience, designed around each student's progress and comfort.</p></article>`).join('');
}

const courseGroups = {
  regular: [
    ['[4/2/2] Regular', 4, 2, 2, 8],
    ['[4/4/0] Regular +', 4, 4, '–', 8],
    ['[4/2/0] 6Hrs Regular', 4, 2, '–', 6],
    ['[4/0/0] 4Hrs Regular', 4, '–', '–', 4],
  ],
  intensive: [
    ['[5/2/1] Intensive', 5, 2, 1, 8],
    ['[5/1/0] 6Hrs Intensive', 5, 1, '–', 6],
  ],
  speaking: [
    ['[6/2/0] Power Speaking 6', 6, 2, '–', 8],
    ['[8/0/0] Power Speaking 8', 8, '–', '–', 8],
    ['[6/0/0] 6Hrs Power Speaking', 6, '–', '–', 6],
  ],
  ielts: [['[8/0/0] IELTS Intensive', 8, '–', '–', 8]],
  special: [['[4/4/0] Special English', 4, 4, '–', 8]],
  junior: [
    ['[4/2/2] Junior ESL', 4, 2, 2, 8],
    ['[2/2/0] Junior Guardian', 2, 2, '–', 4],
    ['[4/2/0] Junior Camp', 4, 2, '–', 6],
    ['[2/2/0] Junior Camp Guardian', 2, 2, '–', 4],
  ],
};

function courseRows(rows) {
  return rows.map(([name, one, small, medium, total]) => `<tr><th scope="row">${name}</th><td>${one}</td><td>${small}</td><td>${medium}</td><td>${total}</td></tr>`).join('');
}

const hourWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

function courseBar(one, small, medium, total = 8) {
  const segments = [
    ['one-to-one', one],
    ['small-group', small],
    ['medium-group', medium],
  ].filter(([, hours]) => Number.isInteger(hours) && hours > 0);
  const remaining = Math.max(0, 8 - Number(total));

  if (remaining > 0) segments.push(['open', remaining]);

  return `<div class="course-bar" aria-hidden="true">${segments.map(([type, hours]) => `<span class="course-bar__segment course-bar__segment--${type} course-bar__segment--duration-${hourWords[hours]}"></span>`).join('')}</div>`;
}

function courseOverviewRows(rows) {
  return rows.map(([name, one, small, medium, total]) => `<tr><th scope="row">${name}</th><td>${courseBar(one, small, medium, total)}</td><td>${one}</td><td>${small}</td><td>${medium}</td><td><strong>${total}</strong></td></tr>`).join('');
}

function courseTable(groups) {
  return `<div class="table-wrapper"><table class="course-table"><thead><tr><th scope="col">Course</th><th scope="col">1:1</th><th scope="col">Small Group</th><th scope="col">Medium Group</th><th scope="col">Total</th></tr></thead><tbody>${groups.map(([label, key]) => `<tr class="course-table__group"><th colspan="5">${label}</th></tr>${courseRows(courseGroups[key])}`).join('')}</tbody></table></div>`;
}

function curriculumOverviewTable() {
  const groups = [
    ['REGULAR', 'Balanced English across all four skills', 'regular'],
    ['INTENSIVE', 'More 1:1 classes for faster correction', 'intensive'],
    ['POWER SPEAKING', 'High-volume speaking practice', 'speaking'],
    ['IELTS', 'Target-band preparation', 'ielts'],
    ['SPECIAL & JUNIOR', 'Business, TOEIC, and age-specific programs', 'special'],
  ];

  return `<div class="table-wrapper table-wrapper--overview"><table class="course-table course-table--overview"><thead><tr><th scope="col">Course</th><th scope="col">Daily Class Composition</th><th scope="col">1:1</th><th scope="col">Small Group</th><th scope="col">Medium Group</th><th scope="col">Total</th></tr></thead><tbody>${groups.map(([title, desc, key]) => {
    const rows = key === 'special' ? [...courseGroups.special, ...courseGroups.junior] : courseGroups[key];
    return `<tr class="course-table__group"><th colspan="6"><strong>${title}</strong><span>${desc}</span></th></tr>${courseOverviewRows(rows)}`;
  }).join('')}</tbody></table></div>`;
}

function curriculumSection(modifier, eyebrow, title, desc, body) {
  return `<section class="section section--${modifier}"><div class="section__inner"><header class="section__header"><p class="section__eyebrow">${eyebrow}</p><h2 class="section__title">${title}</h2><p class="section__desc">${desc}</p></header><div class="section__body">${body}</div></div></section>`;
}

function curriculumOverviewSections() {
  const levelGuide = `<div class="level-guide"><div class="level-guide__head"><span class="level-guide__corner">Course</span><ol class="level-guide__scale"><li class="level-guide__level level-guide__level--beginner">GL1</li><li class="level-guide__level level-guide__level--beginner">GL2</li><li class="level-guide__level level-guide__level--low-intermediate">GL3</li><li class="level-guide__level level-guide__level--low-intermediate">GL4</li><li class="level-guide__level level-guide__level--intermediate">GL5</li><li class="level-guide__level level-guide__level--intermediate">GL6</li><li class="level-guide__level level-guide__level--high-intermediate">GL7</li><li class="level-guide__level level-guide__level--high-intermediate">GL8</li><li class="level-guide__level level-guide__level--advanced">GL9</li><li class="level-guide__level level-guide__level--advanced">GL10</li></ol></div><div class="level-guide__bands"><span class="level-guide__band level-guide__band--beginner">Beginner</span><span class="level-guide__band level-guide__band--low-intermediate">Low-Intermediate</span><span class="level-guide__band level-guide__band--intermediate">Intermediate</span><span class="level-guide__band level-guide__band--high-intermediate">High-Intermediate</span><span class="level-guide__band level-guide__band--advanced">Advanced</span></div><div class="level-guide__body"><article class="level-guide__row"><h3 class="level-guide__title">General ESL</h3><div class="level-guide__track"><span class="level-guide__range">Regular / Intensive</span></div></article><article class="level-guide__row"><h3 class="level-guide__title">Speaking Focus</h3><div class="level-guide__track"><span class="level-guide__range">Power Speaking</span></div></article><article class="level-guide__row"><h3 class="level-guide__title">IELTS</h3><div class="level-guide__track"><span class="level-guide__range level-guide__range--upper">IELTS</span></div></article><article class="level-guide__row"><h3 class="level-guide__title">Special Class</h3><div class="level-guide__track"><span class="level-guide__range level-guide__range--upper">Business / TOEIC</span></div></article><article class="level-guide__row"><h3 class="level-guide__title">Junior ESL</h3><div class="level-guide__track"><span class="level-guide__range">Junior ESL</span></div></article></div><p class="level-guide__note">Final class placement is confirmed after the TSA level test.</p></div>`;

  const classStructure = `<div class="course-code"><article class="course-code__guide"><h3 class="course-code__title">How to Read a Course Code</h3><ol class="course-code__list"><li><strong>1:1</strong><span>One teacher and one student</span></li><li><strong>Small Group</strong><span>Interactive class with a small number of students</span></li><li><strong>Medium Group</strong><span>A larger class for listening, discussion, and presentations</span></li></ol></article><article class="course-code__example"><p class="course-code__label">Example</p><strong class="course-code__value"><span>[</span> 5 / 2 / 1 <span>]</span> Intensive</strong><p class="course-code__desc">5 hours of 1:1 classes, 2 hours of small-group classes, and 1 hour of medium-group class — 8 hours in total.</p>${courseBar(5,2,1,8)}<ul class="course-legend"><li class="course-legend__item course-legend__item--one-to-one">1:1</li><li class="course-legend__item course-legend__item--small-group">Small Group</li><li class="course-legend__item course-legend__item--medium-group">Medium Group</li></ul></article></div><div class="lesson-type-list"><article class="card card--lesson-type"><span class="card__tag">PRIVATE</span><h3 class="card__title">1:1</h3><p class="card__desc">A fully customized lesson where the pace, topic, and correction method match the student’s level.</p></article><article class="card card--lesson-type"><span class="card__tag">INTERACTIVE</span><h3 class="card__title">Small Group</h3><p class="card__desc">Students at a similar level speak, listen, and respond to one another in a practical setting.</p></article><article class="card card--lesson-type"><span class="card__tag">COLLABORATIVE</span><h3 class="card__title">Medium Group</h3><p class="card__desc">Students encounter diverse voices and viewpoints through listening, discussion, and presentations.</p></article></div><div class="course-hours"><h3 class="course-hours__title">Daily 1:1 Class Hours by Program</h3><ul class="course-hours__list"><li><strong>Regular</strong><div class="course-hours__track"><span class="course-hours__value course-hours__value--half"></span></div><em>4 hours</em></li><li><strong>Intensive</strong><div class="course-hours__track"><span class="course-hours__value course-hours__value--five-eighths"></span></div><em>5 hours</em></li><li><strong>Power Speaking</strong><div class="course-hours__track"><span class="course-hours__value course-hours__value--full"></span></div><em>6–8 hours</em></li><li><strong>IELTS</strong><div class="course-hours__track"><span class="course-hours__value course-hours__value--full"></span></div><em>8 hours</em></li><li><strong>Special & Junior</strong><div class="course-hours__track"><span class="course-hours__value course-hours__value--half"></span></div><em>2–4 hours</em></li></ul></div>`;

  const recommendations = [
    ['I am new and want balanced progress in every skill.', 'REGULAR', 'Listening, speaking, reading, and writing are evenly distributed.', 'curriculum-esl.html'],
    ['My stay is short and I want to improve as quickly as possible.', 'INTENSIVE', 'Five daily 1:1 classes focus on the weaknesses you actually show.', 'curriculum-esl.html'],
    ['I want to spend almost the entire day speaking.', 'POWER SPEAKING', 'Six to eight 1:1 periods maximize speaking time and minimize group classes.', 'curriculum-speaking.html'],
    ['I need a target band score by a fixed date.', 'IELTS', 'All four modules are trained with a score strategy and regular mock tests.', 'curriculum-ielts.html'],
    ['I need TOEIC preparation or English for work.', 'SPECIAL', 'Choose score strategy or practical business communication.', 'curriculum-special.html'],
    ['I am a junior student or a guardian traveling with one.', 'JUNIOR', 'Programs are structured for age, safety, and a family stay.', 'curriculum-junior.html'],
  ];
  const recommendationCards = `<div class="recommendation-list">${recommendations.map(([need, course, reason, link]) => `<article class="card card--recommendation"><p class="card__label">What You Need</p><h3 class="card__title">${need}</h3><strong class="card__course">${course}</strong><p class="card__desc">${reason}</p><a class="card__link" href="${link}">View Course <span aria-hidden="true">→</span></a></article>`).join('')}</div><div class="study-load"><h3 class="study-load__title">Choose Your Daily Study Load</h3><div class="study-load__list"><article class="card card--study-load"><span class="card__time">4</span><h3 class="card__title">Hours per Day</h3><p class="card__desc">A lighter option for a long stay, remote work, or keeping afternoons free.</p><p class="card__meta">Available in selected Regular and Guardian programs.</p></article><article class="card card--study-load"><span class="card__time">6</span><h3 class="card__title">Hours per Day</h3><p class="card__desc">A balanced schedule with enough time for review, self-study, and rest.</p><p class="card__meta">Available in Regular, Intensive, Power Speaking, and Junior Camp.</p></article><article class="card card--study-load"><span class="card__time">8</span><h3 class="card__title">Hours per Day</h3><p class="card__desc">The maximum daily class load for students with a short stay or an urgent goal.</p><p class="card__meta">Eight-hour options are available across every program family.</p></article></div></div><aside class="course-advice"><strong class="course-advice__title">Not sure yet?</strong><p class="course-advice__desc">Tell us your current level, length of stay, and reason for learning English. TSA can recommend a course before enrollment and adjust it after your arrival level test.</p></aside>`;

  const overview = `${curriculumOverviewTable()}<ul class="course-legend course-legend--overview"><li class="course-legend__item course-legend__item--one-to-one">1:1</li><li class="course-legend__item course-legend__item--small-group">Small Group</li><li class="course-legend__item course-legend__item--medium-group">Medium Group</li><li class="course-legend__item course-legend__item--open">Open Time</li></ul>`;

  return [
    curriculumSection('level-guide', 'LEVEL GUIDE', 'TSA Curriculum & Levels', 'See which TSA programs are available across Global Levels 1 through 10.', levelGuide),
    curriculumSection('class-structure', 'CLASS STRUCTURE', 'How a TSA Study Day Is Built', 'The three numbers in every course name show exactly how many daily classes belong to each class type.', classStructure),
    curriculumSection('course-recommendation', 'COURSE FINDER', 'Which Program Fits You?', 'Start with what you need now, then compare the course and the reason it is recommended.', recommendationCards),
    curriculumSection('course-overview', 'ALL PROGRAMS', 'All Courses at a Glance', 'Compare all 15 confirmed TSA courses and their daily class composition in one view.', overview),
  ].join('');
}

function bulletBlock(title, items) {
  return `<article class="curriculum-block"><h3 class="curriculum-block__title">${title}</h3><ul class="curriculum-block__list">${items.map(([name, desc]) => `<li><strong>${name}</strong>${desc ? `<span>${desc}</span>` : ''}</li>`).join('')}</ul></article>`;
}

function scheduleTable(caption, rows, withBooks = false) {
  return `<div class="table-wrapper table-wrapper--schedule"><table class="course-table course-table--schedule"><caption>${caption}</caption><thead><tr><th>Period</th><th>Class</th><th>GL1–2<br>Beginner</th><th>GL3–4<br>Low-Intermediate</th><th>GL5–6<br>Intermediate</th><th>GL7–8<br>High-Intermediate</th><th>GL9–10<br>Advanced</th></tr></thead><tbody>${rows.map(([period,type,beginner,intermediate,advanced,book]) => `<tr><td>${period}</td><td><strong>${type}</strong></td><td colspan="2"><strong>${beginner}</strong>${withBooks && book ? `<small>${book}</small>` : ''}</td><td><strong>${intermediate}</strong>${withBooks && book ? `<small>${book}</small>` : ''}</td><td colspan="2"><strong>${advanced}</strong>${withBooks && book ? `<small>${book}</small>` : ''}</td></tr>`).join('')}</tbody></table></div>`;
}

const regularSchedule = [
  [1,'1:1','Speaking & Vocabulary','Speaking & Vocabulary','Speaking & Vocabulary','Smart Choice'],
  [2,'1:1','Listening & Response','Listening & Response','Listening & Response','Smart Choice'],
  [3,'1:1','Reading & Discussion','Reading & Discussion','Reading & Discussion','Smart Choice'],
  [4,'1:1','Grammar & Writing','Grammar & Writing','Grammar & Writing','Grammar in Use'],
  [5,'SG','Conversation & Interaction','Conversation & Interaction','Conversation & Interaction'],
  [6,'SG','Collaborative Speaking','Collaborative Speaking','Collaborative Speaking'],
  [7,'BG','Topic Discussion','Argument Development','Argument Development'],
  [8,'BG','Real-Life Interaction','Debate Practice','Debate Practice'],
];
const intensiveSchedule = [
  [1,'1:1','Speaking & Vocabulary','Speaking & Vocabulary','Speaking & Vocabulary'],[2,'1:1','Listening & Response','Listening & Response','Listening & Response'],[3,'1:1','Reading & Discussion','Reading & Discussion','Reading & Discussion'],[4,'1:1','Grammar & Writing','Grammar & Writing','Grammar & Writing'],[5,'1:1','Pronunciation & Fluency','Pronunciation & Fluency','Pronunciation & Fluency'],[6,'SG','Conversation & Interaction','Conversation & Interaction','Conversation & Interaction'],[7,'SG','Collaborative Speaking','Collaborative Speaking','Collaborative Speaking'],[8,'BG','Real-Life Interaction','Debate Practice','Debate Practice'],
];
const speakingSchedule = [
  [1,'1:1','Speaking & Vocabulary','Speaking & Vocabulary','Speaking & Vocabulary'],[2,'1:1','Listening & Response','Listening & Response','Listening & Response'],[3,'1:1','Reading & Discussion','Reading & Discussion','Reading & Discussion'],[4,'1:1','Grammar & Writing','Grammar & Writing','Grammar & Writing'],[5,'1:1','Functional Expressions','Functional Expressions','Functional Expressions'],[6,'1:1','Pronunciation & Fluency','Pronunciation & Fluency','Pronunciation & Fluency'],[7,'1:1','Presentation Skills','Debate Skills','Debate Skills'],[8,'1:1','Presentation Practice','Debate Practice','Debate Practice'],
];

function curriculumContent(file) {
  if (file === 'curriculum-levels.html') {
    return `<div class="lesson-type-list"><article class="card card--lesson-type"><h3 class="card__title">1:1</h3><p class="card__desc">속도, 주제, 교정까지 학생 레벨에 맞추는 개인 수업</p></article><article class="card card--lesson-type"><h3 class="card__title">소그룹</h3><p class="card__desc">비슷한 레벨의 학생들과 말하고 반응하는 수업</p></article><article class="card card--lesson-type"><h3 class="card__title">중그룹</h3><p class="card__desc">리스닝, 토론, 발표를 통해 다양한 의견을 접하는 수업</p></article></div><div class="course-example"><p class="course-example__label">코스 코드 읽는 법</p><strong class="course-example__code">[ 5 / 2 / 1 ] Intensive</strong><p class="course-example__desc">1:1 5시간, 소그룹 2시간, 중그룹 1시간. 하루 총 8시간.</p></div>${courseTable([['REGULAR · 균형 잡힌 영어','regular'],['INTENSIVE · 1:1 비중 강화','intensive'],['POWER SPEAKING · 하루 종일 말하기','speaking'],['IELTS · 목표 밴드 우선','ielts'],['SPECIAL','special'],['JUNIOR','junior']])}`;
  }
  if (file === 'curriculum-esl.html') return `${courseTable([['REGULAR · 균형 잡힌 영어','regular'],['INTENSIVE · 1:1 비중 강화','intensive']])}<section class="curriculum-course"><header class="curriculum-course__header"><p class="section__eyebrow">REGULAR</p><h3 class="curriculum-course__title">균형 잡힌 영어 · 4대 영역을 고르게, 꾸준하게</h3></header><div class="curriculum-detail">${bulletBlock('이런 학생에게 맞습니다',[['처음 어학연수를 오고 전 영역을 고르게 다루고 싶은 경우'],['읽으면 이해되지만 말하려고 하면 막히는 경우'],['시험 마감일 없이 실제로 쓰는 영어를 익히고 싶은 경우'],['4·6·8시간 중 일정을 고르고 싶은 경우']])}${bulletBlock('이런 것을 배웁니다',[['일상·생존 회화','주문하기, 물어보기, 설명하기, 스몰토크'],['말하기용 문법','입으로 만들어내는 문법과 문장 훈련'],['리스닝 & 발음','1:1 소리 교정과 그룹 실전 속도 듣기'],['주제별 어휘','대화에 바로 사용하는 단어 묶음'],['토론·발표 기초','사람들 앞에서 의견을 정리하고 말하기']])}</div>${scheduleTable('Regular / Regular+ 레벨별 과목 구성',regularSchedule,true)}</section><section class="curriculum-course"><header class="curriculum-course__header"><p class="section__eyebrow">INTENSIVE</p><h3 class="curriculum-course__title">1:1 비중 강화 · 더 빠른 교정, 더 빠른 향상</h3></header><div class="curriculum-detail">${bulletBlock('이런 학생에게 맞습니다',[['체류 기간이 4~8주로 짧아 최대한 뽑아내고 싶은 경우'],['기초는 있지만 같은 실수를 계속 반복하는 경우'],['내가 말한 것을 바로 보고 고쳐주길 원하는 경우'],['그룹보다 1:1에서 더 빨리 느는 편인 경우']])}${bulletBlock('이런 것을 배웁니다',[['내 약점부터','실제로 틀리는 부분을 중심으로 수업 구성'],['유창성과 정확성','끊지 않고 길게 말하면서 정확하게'],['더 깊은 문법 교정','시제, 관사, 전치사, 어순 교정'],['넓어지는 대화 주제','일상에서 의견, 비교, 설명으로'],['첨삭이 붙는 라이팅','짧은 작문을 문장 단위로 교정']])}</div>${scheduleTable('Intensive 레벨별 과목 구성',intensiveSchedule)}</section>`;
  if (file === 'curriculum-speaking.html') return `${courseTable([['POWER SPEAKING · 하루 종일 말하기','speaking']])}<section class="curriculum-course"><header class="curriculum-course__header"><p class="section__eyebrow">POWER SPEAKING</p><h3 class="curriculum-course__title">하루 종일 말하기 · 이론보다 아웃풋</h3></header><div class="curriculum-detail">${bulletBlock('이런 학생에게 맞습니다',[['영어를 공부하고 싶은 게 아니라 말하고 싶은 경우'],['면접, 해외 근무, 영어로 하는 업무가 앞에 있는 경우'],['그룹 수업이 잘 맞지 않고 수업 내내 말하고 싶은 경우'],['짧은 기간에 스피킹 변화를 체감하고 싶은 경우']])}${bulletBlock('이런 것을 배웁니다',[['길게 이어 말하기','몇 분 단위로, 머릿속 번역 없이'],['유창성 훈련','섀도잉, 반복, 시간 제한 응답'],['롤플레이 & 디베이트','면접, 회의, 협상, 의견 충돌 상황'],['발음 & 억양','강세, 리듬, 연음 교정'],['즉시 교정','말하는 순간 오류를 바로 수정']])}</div>${scheduleTable('Power Speaking 레벨별 과목 구성',speakingSchedule)}</section>`;
  if (file === 'curriculum-ielts.html') return `${courseTable([['IELTS · 목표 밴드 우선','ielts']])}<div class="planning-note"><strong>상세 화면 기획 필요</strong><p>참고 페이지에서 확인되는 코스는 [8/0/0] IELTS Intensive이며, 메뉴에는 포함되어 있지만 PPT에 소개 영역과 레벨별 과목표 상세 기획이 없습니다.</p></div>`;
  if (file === 'curriculum-special.html') return `${courseTable([['SPECIAL · BUSINESS / TOEIC','special']])}<div class="planning-note"><strong>상세 화면 기획 필요</strong><p>참고 페이지에서 확인되는 코스는 [4/4/0] Special English이며, Business와 TOEIC의 구분, 과정 소개 및 과목표 기획이 필요합니다.</p></div>`;
  return `${courseTable([['JUNIOR ESL & GUARDIAN','junior']])}<div class="planning-note"><strong>상세 화면 기획 필요</strong><p>Junior ESL, Junior Guardian, Junior Camp, Junior Camp Guardian 코스는 확인되지만, 과정별 소개와 레벨별 과목표 상세 화면 범위는 참고 페이지에 없습니다.</p></div>`;
}

function pageShell(file, title, desc, mainContent) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${desc}"><title>${title} · TSA Talkstation Academy</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="../styles.css?v=20260824-16"><script src="../script.js?v=20260824-16" defer></script></head>
<body class="page page--subpage">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header site-header--subpage"><div class="site-header__utility"><div class="site-header__inner"><nav class="utility-menu" aria-label="Utility navigation"><a class="utility-menu__link" href="#">Login / Sign up</a><div class="language-menu"><button class="language-menu__button" type="button" aria-expanded="false" aria-controls="language-list"><span class="language-menu__text">English</span><span class="language-menu__icon" aria-hidden="true">⌄</span></button><ul class="language-menu__list" id="language-list" hidden><li><button class="language-menu__option" type="button" data-language="en" lang="en">English</button></li><li><button class="language-menu__option" type="button" data-language="ko" lang="ko">한국어</button></li></ul></div><a class="utility-menu__link utility-menu__link--agency" href="https://tsacebu.com/campaign/" target="_blank" rel="noopener noreferrer">Agency</a></nav></div></div><div class="site-header__main"><div class="site-header__inner site-header__inner--main"><a class="brand" href="../index.html"><img class="brand__image" src="../assets/tsa-logo.png" alt="TSA Talkstation Academy"></a><button class="site-header__toggle" type="button" aria-expanded="false" aria-controls="primary-menu">Menu</button><nav class="main-menu" id="primary-menu" aria-label="Primary navigation">${menuMarkup(file)}</nav></div></div></header>
  <main id="main-content">${mainContent}</main>
  <footer class="site-footer"><div class="site-footer__inner"><a class="brand brand--footer" href="../index.html"><img class="brand__image" src="../assets/tsa-logo.png" alt="TSA Talkstation Academy"></a><div class="site-footer__info"><p class="site-footer__address">Cebu IT Park, Apas, Cebu City, Philippines</p><p class="site-footer__copyright">© 2026 TALKSTATION ACADEMY</p></div></div></footer>
</body></html>`;
}

function page(file, data) {
  const [category, title, desc, items, image] = data;
  const isCurriculum = file.startsWith('curriculum-');
  const isCurriculumOverview = file === 'curriculum-levels.html';
  const detailSection = `<section class="section section--page-content"><div class="section__inner"><header class="section__header"><p class="section__eyebrow">TSA ${category}</p><h2 class="section__title">${isCurriculum ? 'TSA 커리큘럼 및 레벨' : 'Designed for meaningful progress'}</h2><p class="section__desc">${isCurriculum ? '과정별 수강 가능 레벨과 하루 수업 구성, 목적에 맞는 코스를 한 번에 확인합니다.' : 'TSA combines proven teaching, a premium environment, and attentive care into one consistent student experience.'}</p></header><div class="section__body">${isCurriculum ? curriculumContent(file) : `<div class="feature-list">${cards(items)}</div>`}</div></div></section>`;
  const mainContent = `
    <section class="section section--subhero${isCurriculum ? ' section--curriculum-hero' : ''}${isCurriculumOverview ? ' section--curriculum-overview-hero' : ''}"><div class="section__inner"><header class="section__header"><p class="section__eyebrow">${category}</p><h1 class="section__title">${title}</h1><p class="section__desc">${desc}</p></header><div class="section__body">${isCurriculumOverview ? '' : `<img class="subhero__image" src="${image}" alt="${title} at TSA">`}</div></div></section>
    ${isCurriculumOverview ? curriculumOverviewSections() : detailSection}
  `;
  return pageShell(file, title, desc, mainContent);
}

function aboutSubhero(title, desc, image, alt) {
  return `<section class="section section--subhero"><div class="section__inner"><header class="section__header"><p class="section__eyebrow">About TSA</p><h1 class="section__title">${title}</h1><p class="section__desc">${desc}</p></header><div class="section__body"><img class="subhero__image" src="${image}" alt="${alt}"></div></div></section>`;
}

function contentCard(label, title, desc) {
  return `<article class="content-card"><span class="content-card__label">${label}</span><h3 class="content-card__title">${title}</h3><p class="content-card__desc">${desc}</p></article>`;
}

function processStep(label, title, desc) {
  return `<li class="process-step"><span class="process-step__label">${label}</span><h3 class="process-step__title">${title}</h3><p class="process-step__desc">${desc}</p></li>`;
}

function aboutPhilosophyPage() {
  const desc = 'Discover the student-centered philosophy behind TSA lessons, feedback, and real-world communication.';
  const mainContent = `
    ${aboutSubhero('Educational Philosophy', 'We turn English knowledge into confident communication through personalized practice, purposeful output, and continuous feedback.', 'https://tsacebu.com/campaign/images/tsa-class-whiteboard.jpg', 'Students learning with a TSA teacher in a classroom')}
    <section class="section section--philosophy-principles">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">THE TSA WAY</p><h2 class="section__title">English Becomes Meaningful When It Is Used</h2><p class="section__desc">Students do not come to TSA only to know more English. They come to use it independently in study, work, travel, and everyday life.</p></header>
        <div class="section__body"><div class="content-grid content-grid--three">
          ${contentCard('PERSONAL', 'Student-First Personalization', 'Placement results, goals, pace, and learning habits guide the focus of each student’s lessons.')}
          ${contentCard('PRACTICAL', 'Output Before Perfection', 'Students speak, write, ask, and respond before waiting for perfect English. Communication grows through use.')}
          ${contentCard('PROGRESSIVE', 'Feedback That Builds Independence', 'Teachers correct what matters, explain why, and help students reuse the language until they can monitor themselves.')}
        </div></div>
      </div>
    </section>
    <section class="section section--learning-cycle">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">LEARNING CYCLE</p><h2 class="section__title">A Learning Cycle Built for Real Communication</h2><p class="section__desc">Every lesson moves from understanding the student to applying English in a new situation.</p></header>
        <div class="section__body"><ol class="process-list">
          ${processStep('DISCOVER', 'Understand the Student', 'Confirm the current level, immediate goal, confidence, and recurring communication challenge.')}
          ${processStep('MODEL', 'Make Language Clear', 'Teachers show useful patterns, pronunciation, and examples in a form the student can understand.')}
          ${processStep('USE', 'Practice with Purpose', 'Students produce the language repeatedly through guided conversation, tasks, and role-play.')}
          ${processStep('TRANSFER', 'Apply It Independently', 'Feedback is reused in a different context so progress continues beyond one lesson.')}
        </ol></div>
      </div>
    </section>
    <section class="section section--learning-outcomes">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">LEARNING OUTCOMES</p><h2 class="section__title">Growth That Continues Beyond the Classroom</h2><p class="section__desc">TSA aims for visible language progress and the habits students need to keep growing on their own.</p></header>
        <div class="section__body"><div class="split-feature"><figure class="split-feature__media"><img class="split-feature__image" src="https://tsacebu.com/campaign/images/tsa-1-on-1-tutoring-class.jpg" alt="A TSA student practicing English in a private lesson"></figure><div class="split-feature__content"><h3 class="split-feature__title">Confidence Built Through Repeated Success</h3><p class="split-feature__desc">The goal is not one perfect answer. It is the ability to enter unfamiliar situations, organize thoughts, and communicate with confidence.</p><ul class="split-feature__list"><li class="split-feature__item">Practical communication for real situations</li><li class="split-feature__item">Independent learning and self-correction habits</li><li class="split-feature__item">Confidence to connect across cultures</li></ul></div></div></div>
      </div>
    </section>
  `;
  return pageShell('about-philosophy.html', 'Educational Philosophy', desc, mainContent);
}

function aboutDifferencePage() {
  const desc = 'See how Talkstation’s 20 years of English education experience shape the TSA learning and care system.';
  const mainContent = `
    ${aboutSubhero('The TSA Difference', 'Built by Talkstation, TSA brings 20 years of English education experience into a premium Cebu campus.', 'https://tsacebu.com/campaign/images/hero-slide-02.jpg', 'TSA reception and campus entrance')}
    <section class="section section--brand-foundation">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">BUILT BY TALKSTATION</p><h2 class="section__title">20 Years of Teaching Insight, Rebuilt for Cebu</h2><p class="section__desc">TSA applies the teaching standards, level expertise, and student-centered operating know-how accumulated by Talkstation to an immersive campus experience.</p></header>
        <div class="section__body"><div class="brand-proof"><div class="brand-proof__metric"><p class="brand-proof__value">20 YEARS</p><p class="brand-proof__label">TALKSTATION EXPERIENCE</p></div><div class="brand-proof__content"><h3 class="brand-proof__title">From Online English Leadership to a Complete Cebu Campus</h3><p class="brand-proof__desc">Curriculum, teachers, classrooms, accommodation, and student support are not separate services. TSA connects them around one goal: steady, meaningful student progress.</p></div></div></div>
      </div>
    </section>
    <section class="section section--difference-pillars">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">WHY TSA</p><h2 class="section__title">What Makes TSA Different</h2><p class="section__desc">A proven education brand becomes more powerful when learning quality, daily life, and responsive care work as one system.</p></header>
        <div class="section__body"><div class="content-grid content-grid--three">
          ${contentCard('CURRICULUM', 'A Proven Level-Based System', 'Students begin with a clear level and follow a course designed around their goal, study intensity, and available time.')}
          ${contentCard('CLASSROOM', 'Private 1:1 Learning Spaces', 'Focused private classrooms increase speaking time and reduce the noise and distractions that interrupt learning.')}
          ${contentCard('TEACHERS', 'Qualified Teachers with Quality Control', 'TESOL-certified teachers with classroom experience receive ongoing evaluation, training, and coaching.')}
          ${contentCard('CAMPUS', 'Learning and Living Connected', 'Campus, accommodation, meals, activities, and study support are planned as one continuous student experience.')}
          ${contentCard('CARE', 'A Dedicated Student Manager', 'One manager follows the student’s learning and daily-life needs from arrival through program completion.')}
          ${contentCard('LOCATION', 'Cebu IT Park Convenience', 'Students study in a central district with cafés, dining, malls, and medical facilities close to campus.')}
        </div></div>
      </div>
    </section>
    <section class="section section--student-journey">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">CONNECTED EXPERIENCE</p><h2 class="section__title">One Student Journey, One TSA Standard</h2><p class="section__desc">The same attention continues before arrival, throughout daily learning, and until the student is ready for the next goal.</p></header>
        <div class="section__body"><ol class="process-list">
          ${processStep('BEFORE ARRIVAL', 'Prepare with Clarity', 'Confirm the student’s goals, program, accommodation, arrival information, and support needs.')}
          ${processStep('ON ARRIVAL', 'Settle in Safely', 'Coordinate pickup, orientation, campus guidance, and the first academic schedule.')}
          ${processStep('DURING STUDY', 'Monitor and Adjust', 'Connect lessons, teacher feedback, schedule coordination, and daily-life support.')}
          ${processStep('AT COMPLETION', 'Review the Next Step', 'Summarize progress and help the student understand how to continue learning after TSA.')}
        </ol></div>
      </div>
    </section>
  `;
  return pageShell('about-difference.html', 'The TSA Difference', desc, mainContent);
}

function aboutTeachersPage() {
  const desc = 'Meet the standards, teaching method, and quality process behind TSA lessons.';
  const mainContent = `
    ${aboutSubhero('Our Teachers', 'TSA teachers combine proven classroom experience with structured coaching and continuous quality review.', 'https://tsacebu.com/campaign/images/tsa-teachers.jpg', 'TSA English teachers together on campus')}
    <section class="section section--teacher-standards">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">TEACHER STANDARD</p><h2 class="section__title">Selected for Skill, Trained for Consistency</h2><p class="section__desc">Speaking English well is not enough. TSA selects teachers who can diagnose needs, explain clearly, guide practice, and correct with purpose.</p></header>
        <div class="section__body"><div class="content-grid content-grid--three">
          ${contentCard('QUALIFICATION', 'TESOL-Certified Teachers', 'Teachers hold internationally recognized TESOL certification and understand how English is learned as a second language.')}
          ${contentCard('EXPERIENCE', '3+ Years of Teaching Experience', 'Every teacher brings at least three years of hands-on classroom experience with real learners and goals.')}
          ${contentCard('DEVELOPMENT', 'Ongoing Evaluation and Training', 'Observation, feedback, coaching, and regular training help maintain a consistently high lesson standard.')}
        </div></div>
      </div>
    </section>
    <section class="section section--teaching-method">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">TEACHING METHOD</p><h2 class="section__title">How TSA Teachers Run a Lesson</h2><p class="section__desc">Each class has a clear purpose and gives students enough guided output to turn understanding into usable English.</p></header>
        <div class="section__body"><ol class="process-list">
          ${processStep('DIAGNOSE', 'Set the Target', 'Review the student’s level, previous feedback, and the communication goal for the lesson.')}
          ${processStep('MODEL', 'Show How English Works', 'Explain useful structure, vocabulary, pronunciation, and context through clear examples.')}
          ${processStep('PRACTICE', 'Maximize Student Output', 'Use questions, tasks, role-play, and repetition so the student does most of the speaking.')}
          ${processStep('COACH', 'Correct, Repeat, and Transfer', 'Give immediate correction, repeat the improved form, and apply it in a new situation.')}
        </ol></div>
      </div>
    </section>
    <section class="section section--lesson-experience">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">LESSON EXPERIENCE</p><h2 class="section__title">Every Lesson Has a Clear Learning Purpose</h2><p class="section__desc">Teachers balance encouragement with precise feedback so students can feel progress and understand what to improve next.</p></header>
        <div class="section__body"><div class="split-feature"><figure class="split-feature__media"><img class="split-feature__image" src="https://tsacebu.com/campaign/images/tsa-1-on-1-tutoring-class.jpg" alt="A TSA teacher coaching a student in a private classroom"></figure><div class="split-feature__content"><h3 class="split-feature__title">More Student Talk, More Useful Feedback</h3><p class="split-feature__desc">TSA lessons protect speaking time while keeping corrections focused and actionable.</p><ul class="split-feature__list"><li class="split-feature__item">Personalized pace and lesson focus</li><li class="split-feature__item">Immediate pronunciation and language correction</li><li class="split-feature__item">Repeated practice in realistic situations</li><li class="split-feature__item">Clear notes for lesson continuity</li></ul></div></div></div>
      </div>
    </section>
    <section class="section section--teacher-quality">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">QUALITY SYSTEM</p><h2 class="section__title">Good Teaching Is Maintained, Not Assumed</h2><p class="section__desc">TSA supports teachers with a repeatable quality process rather than relying on individual style alone.</p></header>
        <div class="section__body"><div class="content-grid content-grid--three">
          ${contentCard('OBSERVE', 'Lesson Observation', 'Classes are reviewed to check clarity, pacing, student participation, and correction quality.')}
          ${contentCard('COACH', 'Coaching and Calibration', 'Teachers align on lesson standards and receive practical coaching for stronger delivery.')}
          ${contentCard('CONNECT', 'Progress Notes and Continuity', 'Lesson notes help the next class begin from what the student has already practiced and needs next.')}
        </div></div>
      </div>
    </section>
  `;
  return pageShell('about-teachers.html', 'Our Teachers', desc, mainContent);
}

function aboutCarePage() {
  const desc = 'Explore the arrival, academic, health, request, and safety support available to TSA students.';
  const mainContent = `
    ${aboutSubhero('Student Care & Safety', 'From airport arrival to class scheduling, health support, and daily requests, TSA keeps every student connected to help.', 'https://tsacebu.com/campaign/images/tsa-manager-student-consultation.jpg', 'A TSA student manager consulting with students')}
    <section class="section section--care-journey">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">CARE JOURNEY</p><h2 class="section__title">Support Begins Before the First Class</h2><p class="section__desc">Students and guardians know what happens next from pre-arrival confirmation through campus orientation and daily support.</p></header>
        <div class="section__body"><ol class="process-list">
          ${processStep('PRE-ARRIVAL', 'Confirm Every Detail', 'Review flight information, accommodation, program dates, medical notes, and special requests before departure.')}
          ${processStep('PICKUP', 'Airport Pickup and Guidance', 'Coordinate the arrival meeting point, pickup contact, transfer, and check-in guidance.')}
          ${processStep('ORIENTATION', 'Settle into TSA', 'Introduce campus rules, key contacts, safety information, daily routines, and the first schedule.')}
          ${processStep('DAILY CARE', 'Stay Connected', 'A dedicated manager follows academic questions, daily-life needs, and requests through completion.')}
        </ol></div>
      </div>
    </section>
    <section class="section section--student-services">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">STUDENT SERVICES</p><h2 class="section__title">One Support System for Study and Daily Life</h2><p class="section__desc">Students can reach the right support without having to find a different contact for every issue.</p></header>
        <div class="section__body"><div class="content-grid content-grid--three">
          ${contentCard('ARRIVAL', 'Airport Pickup', 'Arrival details and the meeting point are confirmed in advance for a smoother transfer to accommodation.')}
          ${contentCard('ACADEMIC', 'Class Schedule Coordination', 'Requests related to class times, level placement, attendance, and schedule changes are reviewed with the academic team.')}
          ${contentCard('HEALTH', 'Health Room and Medical Guidance', 'Students can receive first-response support and guidance to nearby clinics or hospitals when additional care is needed.')}
          ${contentCard('REQUESTS', 'Online Student Requests', 'Class, room, meals, facilities, health, and document requests can be submitted through one organized channel.')}
          ${contentCard('MANAGER', 'Dedicated Student Manager', 'A consistent contact follows each case, coordinates the responsible team, and checks that the student receives an answer.')}
          ${contentCard('SAFETY', '24-Hour On-Site Support', 'On-site staff support student safety and urgent daily-life needs through nights and weekends.')}
        </div></div>
      </div>
    </section>
    <section class="section section--online-requests">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">ONLINE REQUESTS</p><h2 class="section__title">Ask, Track, and Resolve</h2><p class="section__desc">A structured online request channel helps students explain what they need and lets staff manage each request through completion.</p></header>
        <div class="section__body"><div class="request-panel"><div class="request-panel__content"><h3 class="request-panel__title">One Place to Ask for Help</h3><p class="request-panel__desc">Each request is categorized, assigned to the right team, updated, and followed up by the student manager.</p></div><ul class="request-panel__list"><li class="request-panel__item">Class and schedule</li><li class="request-panel__item">Accommodation and room</li><li class="request-panel__item">Meals and dietary needs</li><li class="request-panel__item">Facilities and maintenance</li><li class="request-panel__item">Health and wellness</li><li class="request-panel__item">Documents and administration</li></ul></div></div>
      </div>
    </section>
    <section class="section section--safety-response">
      <div class="section__inner">
        <header class="section__header"><p class="section__eyebrow">SAFETY RESPONSE</p><h2 class="section__title">Fast Support, Clear Communication</h2><p class="section__desc">When a concern is urgent or involves multiple teams, TSA coordinates the response and keeps the student informed.</p></header>
        <div class="section__body"><div class="content-grid content-grid--three">
          ${contentCard('ESCALATE', 'Quick Internal Escalation', 'Urgent issues are shared immediately with the responsible academic, residence, health, or operations contact.')}
          ${contentCard('COMMUNICATE', 'Multilingual Communication', 'Students, guardians, and partner agencies can receive key guidance in supported partner languages.')}
          ${contentCard('FOLLOW UP', 'Resolution and Follow-Up', 'The manager confirms what was handled, checks the student’s condition, and follows unresolved actions.')}
        </div></div>
      </div>
    </section>
  `;
  return pageShell('about-care.html', 'Student Care & Safety', desc, mainContent);
}

function aboutSchedulePage() {
  const desc = 'See how TSA balances personalized lessons, group practice, guided study, meals, and rest throughout a weekday.';
  const mainContent = `
    ${aboutSubhero('Daily Schedule', 'A balanced weekday routine combines focused classes, communication practice, meals, self-study, and rest.', 'https://tsacebu.com/campaign/images/tsa-1-on-1-tutoring-class.jpg', 'A TSA teacher guiding a student during a private lesson')}
    <section class="section section--schedule-flow">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">TSA DAILY ROUTINE</p>
          <h2 class="section__title">A Day Designed for Focus, Practice, and Recovery</h2>
          <p class="section__desc">TSA combines personalized 1:1 lessons, communication-focused group classes, guided study, meals, and rest into a steady weekday rhythm.</p>
        </header>
        <div class="section__body">
          <div class="daily-schedule">
            <ol class="daily-schedule__list">
              <li class="daily-schedule__item"><time class="daily-schedule__time" datetime="07:00">07:00</time><div class="daily-schedule__content"><h3 class="daily-schedule__title">Breakfast &amp; Preparation</h3><p class="daily-schedule__desc">Students begin the day with breakfast and time to organize materials and learning goals.</p></div></li>
              <li class="daily-schedule__item"><time class="daily-schedule__time" datetime="08:00">08:00</time><div class="daily-schedule__content"><h3 class="daily-schedule__title">Morning 1:1 Lessons</h3><p class="daily-schedule__desc">Personalized lessons focus on the skills and corrections each student needs most.</p></div></li>
              <li class="daily-schedule__item"><time class="daily-schedule__time" datetime="10:00">10:00</time><div class="daily-schedule__content"><h3 class="daily-schedule__title">Small-Group Communication</h3><p class="daily-schedule__desc">Students practice listening and speaking with classmates at a similar level.</p></div></li>
              <li class="daily-schedule__item"><time class="daily-schedule__time" datetime="12:00">12:00</time><div class="daily-schedule__content"><h3 class="daily-schedule__title">Lunch &amp; Reset</h3><p class="daily-schedule__desc">A proper break helps students recharge before the afternoon program.</p></div></li>
              <li class="daily-schedule__item"><time class="daily-schedule__time" datetime="13:00">13:00</time><div class="daily-schedule__content"><h3 class="daily-schedule__title">Afternoon 1:1 / Group Lessons</h3><p class="daily-schedule__desc">The afternoon continues with the lesson mix assigned to the student’s course.</p></div></li>
              <li class="daily-schedule__item"><time class="daily-schedule__time" datetime="16:00">16:00</time><div class="daily-schedule__content"><h3 class="daily-schedule__title">Elective Class or Guided Study</h3><p class="daily-schedule__desc">Depending on the program, students join an elective, receive coaching, or complete assigned study.</p></div></li>
              <li class="daily-schedule__item"><time class="daily-schedule__time" datetime="18:00">18:00</time><div class="daily-schedule__content"><h3 class="daily-schedule__title">Dinner</h3><p class="daily-schedule__desc">Students finish formal classes and take time to eat and unwind.</p></div></li>
              <li class="daily-schedule__item"><time class="daily-schedule__time" datetime="19:00">19:00</time><div class="daily-schedule__content"><h3 class="daily-schedule__title">Review, Self-Study &amp; Rest</h3><p class="daily-schedule__desc">The evening can be used for review, vocabulary, assignments, consultation, or personal rest.</p></div></li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--schedule-guidance">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">HOW IT WORKS</p>
          <h2 class="section__title">Your Timetable Is Built Around Your Course</h2>
          <p class="section__desc">Lesson types and daily study hours are arranged according to the selected course, level, and learning goals.</p>
        </header>
        <div class="section__body">
          <div class="schedule-guidance">
            <article class="card card--schedule"><h3 class="card__title">Course-Based Assignment</h3><p class="card__desc">The number of 1:1, group, elective, and study blocks follows the structure of the enrolled course.</p></article>
            <article class="card card--schedule"><h3 class="card__title">Balanced Learning Blocks</h3><p class="card__desc">Intensive practice is placed alongside meals and breaks so students can sustain concentration throughout the day.</p></article>
            <article class="card card--schedule"><h3 class="card__title">Manager Support</h3><p class="card__desc">Students can consult their manager about class concerns, daily-life needs, or schedule-related requests.</p></article>
            <article class="card card--schedule"><h3 class="card__title">Room to Recover</h3><p class="card__desc">Evening review is encouraged, while sufficient personal time helps students maintain a healthy study rhythm.</p></article>
          </div>
          <aside class="schedule-note">
            <h3 class="schedule-note__title">SAMPLE SCHEDULE</h3>
            <p class="schedule-note__desc">This is a sample weekday schedule. The final timetable may vary according to the selected course, placement test result, elective availability, and campus operations.</p>
          </aside>
        </div>
      </div>
    </section>
  `;
  return pageShell('about-schedule.html', 'Daily Schedule', desc, mainContent);
}

function galleryActivitiesPage() {
  const desc = 'Discover TSA English camps and memorable Cebu activities for junior students and families.';
  const mainContent = `
    <section class="section section--gallery-hero section--activity-hero">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">ACTIVITIES</p>
          <h1 class="section__title">Exciting Activities</h1>
          <p class="section__desc">Fun experiences that let students leave stress behind and enjoy Cebu.</p>
        </header>
        <div class="section__body"></div>
      </div>
    </section>
    <section class="section section--gallery-story">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">TSA ENGLISH CAMP</p>
          <h2 class="section__title">Learn English the Natural Way</h2>
          <p class="section__desc">A special English camp experience available only at Talkstation Academy.</p>
        </header>
        <div class="section__body">
          <figure class="gallery-feature"><img class="gallery-feature__image" src="https://tsacebu.com/images/activity/sub_activity_intro.jpg" alt="Students preparing for a Cebu island hopping tour"></figure>
        </div>
      </div>
    </section>
    <section class="section section--camp-programs">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">ENGLISH CAMP</p>
          <h2 class="section__title">An Upgraded English Camp</h2>
          <p class="section__desc">Choose a program suited to the student's level and learning style, from junior camp to family camp.</p>
        </header>
        <div class="section__body">
          <div class="gallery-grid gallery-grid--camp">
            <article class="gallery-card"><img class="gallery-card__image" src="https://tsacebu.com/images/activity/sub_activity_junior_camp.jpg" alt="Junior students learning English with a TSA teacher"><h3 class="gallery-card__title">SEL Junior Camp</h3></article>
            <article class="gallery-card"><img class="gallery-card__image" src="https://tsacebu.com/images/activity/sub_activity_family_camp.jpg" alt="Families participating in TSA Family Camp"><h3 class="gallery-card__title">SEL Family Camp</h3></article>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--activity-gallery">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">CEBU EXPERIENCES</p>
          <h2 class="section__title">Colorful Activities</h2>
          <p class="section__desc">Focused learning comes first, and memorable activities complete the camp experience.</p>
        </header>
        <div class="section__body">
          <div class="activity-collection">
            <article class="activity-gallery">
              <h3 class="activity-gallery__title">Island Hopping</h3>
              <div class="activity-gallery__media"><img class="activity-gallery__image" src="https://tsacebu.com/images/activity/sub_activity_hopping_tours_01.jpg" alt="Students smiling during a Cebu island hopping tour"><img class="activity-gallery__image" src="https://tsacebu.com/images/activity/sub_activity_hopping_tours_02.jpg" alt="Students snorkeling together in Cebu"></div>
            </article>
            <article class="activity-gallery">
              <h3 class="activity-gallery__title">Cebu City Tour</h3>
              <div class="activity-gallery__media"><img class="activity-gallery__image" src="https://tsacebu.com/images/activity/sub_activity_city_tour_01.jpg" alt="Students visiting a Cebu landmark"><img class="activity-gallery__image" src="https://tsacebu.com/images/activity/sub_activity_city_tour_02.jpg" alt="Students enjoying a Cebu city tour"></div>
            </article>
            <article class="activity-gallery">
              <h3 class="activity-gallery__title">Water Park</h3>
              <div class="activity-gallery__media"><img class="activity-gallery__image" src="https://tsacebu.com/images/activity/sub_activity_waterpark_01.jpg" alt="Students enjoying a Cebu water park"><img class="activity-gallery__image" src="https://tsacebu.com/images/activity/sub_activity_waterpark_02.jpg" alt="Students taking part in supervised water activities"></div>
            </article>
          </div>
        </div>
      </div>
    </section>
    ${galleryCtaSection()}
  `;
  return pageShell('gallery-activities.html', 'Activities', desc, mainContent);
}

function facilityGroup(title, modifier, images) {
  return `<article class="facility-group"><header class="facility-group__header"><h3 class="facility-group__title">${title}</h3></header><div class="facility-group__list ${modifier}">${images.map(([file, alt, caption]) => `<figure class="facility-card"><img class="facility-card__image" src="https://tsacebu.com/images/facility/${file}" alt="${alt}"><figcaption class="facility-card__caption">${caption}</figcaption></figure>`).join('')}</div></article>`;
}

function galleryCampusPage() {
  const desc = 'Explore TSA facilities, Cebu IT Park surroundings, shared spaces, cafeterias, and classrooms.';
  const mainContent = `
    <section class="section section--gallery-hero section--facility-hero">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">TSA CAMPUS</p>
          <h1 class="section__title">A Safe and Comfortable Learning Space</h1>
          <p class="section__desc">Every space where students learn and stay has been designed with care.</p>
        </header>
        <div class="section__body"></div>
      </div>
    </section>
    <section class="section section--facility-location">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">LOCATION</p>
          <h2 class="section__title">In the Heart of Cebu, IT Park</h2>
          <p class="section__desc">A safe learning environment in Cebu's leading business and lifestyle district.</p>
        </header>
        <div class="section__body"><div class="facility-map"><iframe class="facility-map__frame" src="https://maps.google.com/maps?q=Cebu+IT+Park,+Apas,+Cebu+City,+Philippines&amp;z=16&amp;output=embed" loading="lazy" allowfullscreen title="Cebu IT Park Map"></iframe></div></div>
      </div>
    </section>
    <section class="section section--facility-safety">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">SAFE ENVIRONMENT</p>
          <h2 class="section__title">A Place You Can Trust</h2>
          <p class="section__desc">Located in the center of Cebu IT Park, TSA provides a safe and convenient environment for study and daily life.</p>
        </header>
        <div class="section__body"></div>
      </div>
    </section>
    <section class="section section--facility-gallery">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">TSA FACILITIES</p>
          <h2 class="section__title">Main Facilities</h2>
          <p class="section__desc">Take a closer look at the spaces where learning and daily life come together.</p>
        </header>
        <div class="section__body">
          ${facilityGroup('Lobby & Common Areas', 'facility-group__list--common-area', [['facility_1.jpg', 'TSA lobby and reception area', 'Lobby & Reception'], ['facility_2.jpg', 'TSA campus hallway', 'Campus Hallway'], ['facility_3.jpg', 'TSA restroom and wash area', 'Restroom']])}
          ${facilityGroup('Cafeteria', 'facility-group__list--cafeteria', [['facility_4.jpg', 'TSA cafeteria seating area', 'Cafeteria'], ['facility_5.jpg', 'TSA student cafe counter', 'Student Café'], ['facility_6.jpg', 'TSA shared dining space', 'Dining Area'], ['facility_7.jpg', 'TSA lounge seating beside the cafe', 'Cafe Lounge']])}
          ${facilityGroup('Classrooms', 'facility-group__list--classroom', [['facility_8.jpg', 'TSA private one-to-one classroom', 'Private 1:1 Classroom'], ['facility_9.jpg', 'TSA group classroom', 'Group Classroom']])}
        </div>
      </div>
    </section>
    ${galleryCtaSection()}
  `;
  return pageShell('gallery-campus.html', 'Campus', desc, mainContent);
}

function galleryStayPage() {
  const desc = 'Compare TSA premium condo and hotel-style accommodation, room features, campus access, and daily living comfort.';
  const mainContent = `
    <section class="section section--gallery-hero section--stay-hero">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">ACCOMMODATION</p>
          <h1 class="section__title">Comfortable Living, Better Learning</h1>
          <p class="section__desc">Two carefully selected residence options give students a safe, comfortable place to rest and stay focused on study.</p>
        </header>
        <div class="section__body"></div>
      </div>
    </section>
    <section class="section section--stay-options">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">CHOOSE YOUR STAY</p>
          <h2 class="section__title">Two Ways to Feel at Home in Cebu</h2>
          <p class="section__desc">Choose the setting that fits your lifestyle, preferred privacy, and distance from campus.</p>
        </header>
        <div class="section__body">
          <div class="stay-option-list">
            <article class="stay-option stay-option--condo">
              <figure class="stay-option__media"><img class="stay-option__image" src="https://tsacebu.com/campaign/images/avida-riala-tower-infinity-pool.jpg" alt="Avida Riala Tower infinity pool in Cebu IT Park"></figure>
              <div class="stay-option__content"><p class="stay-option__label">PREMIUM CONDO</p><h3 class="stay-option__title">Avida Riala Tower</h3><p class="stay-option__desc">A premium condo in Cebu IT Park, within a 5-minute walk of campus. Students can move easily between class and home while enjoying convenient city living.</p><ul class="stay-option__list"><li class="stay-option__item">5-minute walk from TSA</li><li class="stay-option__item">Private room with a kitchen</li><li class="stay-option__item">Infinity pool and sports facilities</li></ul></div>
            </article>
            <article class="stay-option stay-option--hotel">
              <figure class="stay-option__media"><img class="stay-option__image" src="https://tsacebu.com/campaign/images/tsa-dormitory-aerial-view-pool.jpg" alt="TSA hotel-style dormitory buildings surrounding an outdoor pool"></figure>
              <div class="stay-option__content"><p class="stay-option__label">HOTEL-STYLE DORMITORY</p><h3 class="stay-option__title">A Restful, Resort-Like Stay</h3><p class="stay-option__desc">About 10 minutes by car from campus, this residence combines hotel-style comfort with a calm environment for study and recovery.</p><ul class="stay-option__list"><li class="stay-option__item">Hotel-style rooms</li><li class="stay-option__item">Pool and badminton court</li><li class="stay-option__item">Safe and comfortable living environment</li></ul></div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--stay-rooms">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">INSIDE THE ROOMS</p>
          <h2 class="section__title">Space to Rest, Reset, and Study</h2>
          <p class="section__desc">Each residence gives students a comfortable, practical space to organize daily life and prepare for the next day’s classes.</p>
        </header>
        <div class="section__body">
          <div class="stay-room-gallery">
            <figure class="stay-room-gallery__item"><img class="stay-room-gallery__image" src="https://tsacebu.com/campaign/images/avida-riala-tower-condo-room-kitchen.jpg" alt="A private Avida Riala Tower condo room with kitchen"><figcaption class="stay-room-gallery__caption"><h3 class="stay-room-gallery__title">Private Condo Room</h3><p class="stay-room-gallery__desc">A comfortable personal space with a kitchen for a more independent stay.</p></figcaption></figure>
            <figure class="stay-room-gallery__item"><img class="stay-room-gallery__image" src="https://tsacebu.com/campaign/images/tsa-dormitory-room-01.jpg" alt="A TSA hotel-style dormitory room"><figcaption class="stay-room-gallery__caption"><h3 class="stay-room-gallery__title">Hotel-Style Room</h3><p class="stay-room-gallery__desc">A calm, well-appointed room designed for comfortable rest after class.</p></figcaption></figure>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--stay-comfort">
      <div class="section__inner">
        <header class="section__header">
          <p class="section__eyebrow">EVERYDAY COMFORT</p>
          <h2 class="section__title">More Than a Place to Sleep</h2>
          <p class="section__desc">TSA accommodation is selected to support a steady routine from morning preparation to evening review and rest.</p>
        </header>
        <div class="section__body">
          <div class="content-grid content-grid--three">
            <article class="card card--stay-detail"><h3 class="card__title">Convenient Access</h3><p class="card__desc">Short travel time makes it easier to keep classes, meals, and personal plans on schedule.</p></article>
            <article class="card card--stay-detail"><h3 class="card__title">Rest and Recovery</h3><p class="card__desc">Comfortable rooms and shared amenities help students recharge after intensive study.</p></article>
            <article class="card card--stay-detail"><h3 class="card__title">Supportive Environment</h3><p class="card__desc">Students stay in environments chosen for practical daily living, comfort, and continued focus.</p></article>
          </div>
        </div>
      </div>
    </section>
    ${galleryCtaSection()}
  `;
  return pageShell('gallery-stay.html', 'Accommodation', desc, mainContent);
}

function galleryCtaSection() {
  return `<section class="section section--gallery-cta"><div class="section__inner"><header class="section__header"><p class="section__eyebrow">START WITH TSA</p><h2 class="section__title">Now Is the Time to Learn English</h2><p class="section__desc">Give students the right teachers, environment, and support at the right time.</p></header><div class="section__body"><a class="btn btn--primary" href="partnership-inquiry.html"><span class="btn__text">Partnership Inquiry</span><span class="btn__icon" aria-hidden="true">→</span></a></div></div></section>`;
}

function partnershipInquiryPage() {
  const desc = 'Review the TSA agency partnership process and send a partnership inquiry from one page.';
  const mainContent = `
    <section class="section section--subhero"><div class="section__inner"><header class="section__header"><p class="section__eyebrow">Community</p><h1 class="section__title">Partnership Inquiry</h1><p class="section__desc">Connect with TSA to discuss agency cooperation, onboarding, and student support.</p></header><div class="section__body"><img class="subhero__image" src="https://tsacebu.com/campaign/images/tsa-manager-student-consultation.jpg" alt="TSA partnership consultation"></div></div></section>
    <section class="section section--partnership-process"><div class="section__inner"><header class="section__header"><p class="section__eyebrow">PARTNERSHIP PROCESS</p><h2 class="section__title">A Clear Start for Every Agency Partner</h2><p class="section__desc">Consultation, agreement, and student support are handled in one connected process.</p></header><div class="section__body"><div class="feature-list"><article class="card card--feature"><span class="card__number">01</span><h3 class="card__title">Partnership Consultation</h3><p class="card__desc">We review your market, student needs, and preferred cooperation model.</p></article><article class="card card--feature"><span class="card__number">02</span><h3 class="card__title">Agreement &amp; Account Setup</h3><p class="card__desc">The partnership agreement and agency operating information are prepared together.</p></article><article class="card card--feature"><span class="card__number">03</span><h3 class="card__title">Student Referral &amp; Support</h3><p class="card__desc">TSA supports each referred student from consultation through enrollment and completion.</p></article></div></div></div></section>
    <section class="section section--partnership-inquiry"><div class="section__inner"><header class="section__header"><p class="section__eyebrow">PARTNERSHIP INQUIRY</p><h2 class="section__title">Tell Us About Your Agency</h2><p class="section__desc">Share the information below so the TSA team can prepare the right partnership discussion.</p></header><div class="section__body"><div class="feature-list"><article class="card card--feature"><span class="card__number">AGENCY</span><h3 class="card__title">Agency Profile</h3><p class="card__desc">Agency name, operating country, current student market, and website or social channel.</p></article><article class="card card--feature"><span class="card__number">MARKET</span><h3 class="card__title">Target Students</h3><p class="card__desc">Expected student age groups, program interests, study periods, and annual referral volume.</p></article><article class="card card--feature"><span class="card__number">CONTACT</span><h3 class="card__title">Preferred Contact Channel</h3><p class="card__desc">Provide the contact person, email address, phone number, and preferred consultation language.</p></article></div></div></div></section>
  `;
  return pageShell('partnership-inquiry.html', 'Partnership Inquiry', desc, mainContent);
}

function legacyPartnershipProcessPage() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0; url=partnership-inquiry.html"><link rel="canonical" href="partnership-inquiry.html"><title>Partnership Inquiry · TSA Talkstation Academy</title></head><body><main><p>Partnership Process and Partnership Inquiry are now available on one page. <a href="partnership-inquiry.html">Go to Partnership Inquiry</a>.</p></main></body></html>`;
}

const customPageGenerators = new Map([
  ['about-philosophy.html', aboutPhilosophyPage],
  ['about-difference.html', aboutDifferencePage],
  ['about-teachers.html', aboutTeachersPage],
  ['about-care.html', aboutCarePage],
  ['about-schedule.html', aboutSchedulePage],
  ['gallery-activities.html', galleryActivitiesPage],
  ['gallery-campus.html', galleryCampusPage],
  ['gallery-stay.html', galleryStayPage],
  ['partnership-inquiry.html', partnershipInquiryPage],
]);

await fs.mkdir(pagesDir, { recursive: true });
await Promise.all(Object.entries(pageData).map(([file, data]) => {
  const customGenerator = customPageGenerators.get(file);
  const html = customGenerator ? customGenerator() : page(file, data);
  return fs.writeFile(path.join(pagesDir, file), localizePage(file, html), 'utf8');
}));
await fs.writeFile(path.join(pagesDir, 'partnership-process.html'), legacyPartnershipProcessPage(), 'utf8');
console.log(`Generated ${Object.keys(pageData).length} pages and one legacy redirect.`);
