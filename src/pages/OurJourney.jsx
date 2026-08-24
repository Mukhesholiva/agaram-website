import { useEffect, useRef, useState } from 'react'

const CAROUSEL_SEQUENCES = [
  [1, 4, 11, 10, 13, 8, 2, 12, 3, 5, 6, 9, 7, 14],
  [1, 6, 2, 5, 7, 11, 8, 13, 12, 3, 10, 9, 4, 14],
  [4, 3, 2, 13, 6, 5, 14, 1, 11, 7, 9, 10, 8, 12],
]

const ROAD_PATH =
  'M 0,180 L 14,181.4131935212893 L 28,182.82324939955544 L 42,184.22703695812748 L 56,185.62143943757175 L 70,187.00336091567715 L 84,188.36973318117688 L 98.00000000000001,189.7175225459445 L 112,191.04373658054033 L 126,192.34543075815327 L 140,193.6197149921864 L 154,194.86376005297222 L 168,196.07480384936989 L 182,197.25015756129835 L 196.00000000000003,198.3872116095893 L 210,199.4834414499055 L 224,200.53641317786065 L 238.00000000000003,201.54378893289567 L 252,202.5033320889138 L 266,203.4129122201499 L 280,204.27050983124843 L 294,205.07422084104812 L 308,205.8222608101183 L 322,206.51296890266082 L 336,207.14481157398058 L 350,207.7163859753386 L 364,208.22642306862676 L 378,208.6737904439499 L 392.00000000000006,209.05749483385893 L 406,209.37668431865296 L 420,209.63065021785414 L 434,209.81882866365538 L 448,209.94080185284815 L 462,209.99629897444981 L 476.00000000000006,209.98519681097196 L 489.99999999999994,209.90752001199382 L 504,209.76344103943433 L 518,209.55327978464322 L 532,209.27750285816242 L 546,208.93672255373394 L 560,208.5316954888546 L 574,208.06332092489603 L 588,207.53263877051944 L 602,206.94082727281847 L 616,206.2892004013159 L 630,205.57920493062278 L 644,204.81241722823685 L 658,203.9905397546127 L 672,203.1153972832737 L 686,202.1889328493583 L 700,201.21320343559643 L 714,200.1903754052932 L 728,199.1227196924607 L 742,198.01260675977653 L 756,196.8625013355639 L 770.0000000000001,195.67495694147846 L 784.0000000000001,194.45261022305147 L 797.9999999999999,193.19817509567747 L 812,191.91443671904344 L 826,190.60424531337773 L 840,189.27050983124843 L 854,187.91619149896118 L 868,186.54429724189626 L 882,185.1578730083823 L 896,183.75999700692913 L 910,182.35377287183536 L 924,180.94232277234386 L 938,179.5287804806454 L 952.0000000000001,178.1162844141206 L 965.9999999999999,176.70797066726865 L 979.9999999999999,175.30696604879307 L 994,173.91638113930463 L 1008,172.53930338505435 L 1022,171.17879024303087 L 1036,169.83786239264126 L 1050,168.5194970290473 L 1064,167.22662125304782 L 1078,165.9621055721828 L 1092,164.72875752748888 L 1106,163.52931546005604 L 1120,162.3664424312258 L 1134,161.24272030992884 L 1148,160.16064404029046 L 1162,159.12261610223058 L 1176,158.13094117735767 L 1190,157.18782103199908 L 1204,156.2953496287293 L 1218,155.4555084772493 L 1232,154.67016223493954 L 1246,153.94105456685426 L 1260,153.26980427434896 L 1274,152.65790170093663 L 1288,152.10670542335245 L 1302,151.61743923517363 L 1316,151.19118942969172 L 1330,150.8289023880697 L 1344,150.53138247813934 L 1358,150.29929026850328 L 1372,150.1331410619076 L 1386,150.0333037511409 L 1400,150 L 1414,150.0333037511409 L 1428,150.1331410619076 L 1442,150.29929026850328 L 1456,150.53138247813934 L 1470,150.8289023880697 L 1484,151.19118942969172 L 1498,151.61743923517363 L 1512,152.10670542335245 L 1526,152.65790170093663 L 1540.0000000000002,153.26980427434899 L 1554.0000000000002,153.94105456685426 L 1568.0000000000002,154.67016223493954 L 1581.9999999999998,155.45550847724928 L 1595.9999999999998,156.29534962872927 L 1609.9999999999998,157.18782103199905 L 1624,158.13094117735764 L 1638,159.12261610223055 L 1652,160.16064404029044 L 1666,161.2427203099288 L 1680,162.3664424312258 L 1694,163.52931546005604 L 1708,164.72875752748885 L 1722,165.9621055721828 L 1736,167.22662125304782 L 1750,168.5194970290473 L 1764,169.83786239264126 L 1778,171.17879024303087 L 1792,172.53930338505435 L 1806,173.91638113930463 L 1820,175.30696604879307 L 1834,176.70797066726863 L 1848,178.1162844141206 L 1862,179.5287804806454 L 1876,180.94232277234383 L 1890.0000000000002,182.35377287183536 L 1904.0000000000002,183.75999700692915 L 1918.0000000000002,185.1578730083823 L 1931.9999999999998,186.54429724189623 L 1945.9999999999998,187.91619149896115 L 1959.9999999999998,189.2705098312484 L 1974,190.6042453133777 L 1988,191.9144367190434 L 2002,193.1981750956774 L 2016,194.45261022305147 L 2030,195.67495694147846 L 2044,196.8625013355639 L 2058,198.01260675977647 L 2072,199.1227196924607 L 2086,200.1903754052932 L 2100,201.21320343559643 L 2114,202.18893284935828 L 2128,203.11539728327367 L 2142,203.9905397546127 L 2156,204.81241722823685 L 2170,205.57920493062278 L 2184,206.2892004013159 L 2198,206.94082727281847 L 2212,207.53263877051944 L 2226,208.063320924896 L 2240,208.5316954888546 L 2254,208.93672255373394 L 2268,209.27750285816242 L 2282,209.55327978464322 L 2296,209.76344103943433 L 2310,209.90752001199382 L 2324,209.98519681097196 L 2338,209.99629897444981 L 2352,209.94080185284815 L 2366,209.81882866365538 L 2380,209.63065021785414 L 2394,209.37668431865296 L 2408,209.05749483385893 L 2422,208.67379044394988 L 2436,208.22642306862676 L 2450,207.7163859753386 L 2464,207.1448115739806 L 2478,206.51296890266082 L 2492,205.8222608101183 L 2506,205.07422084104812 L 2520,204.27050983124843 L 2534,203.41291222014988 L 2548,202.50333208891377 L 2562,201.54378893289567 L 2576,200.53641317786065 L 2590,199.4834414499055 L 2604,198.38721160958926 L 2618,197.25015756129835 L 2632,196.0748038493699 L 2646,194.86376005297228 L 2660,193.6197149921864 L 2674,192.34543075815327 L 2688,191.04373658054038 L 2702,189.71752254594452 L 2716,188.36973318117688 L 2730,187.00336091567715 L 2744,185.62143943757178 L 2758,184.22703695812748 L 2772,182.82324939955544 L 2786,181.41319352128926 L 2800,180'

const TIMELINE_CONTENT_WIDTH = 3450

const LEGACY_PARAGRAPHS = [
  'Agaram Foundation began in 2006 with one question: Why does education especially higher education remain out of sight and out of reach for so many first-generation learners? And if we look closer, the question goes beyond that: why does our society allow something as fundamental as education to remain out of reach for so many? The truth is, solving the first question is how we begin to answer the second. Because when we open the doors of learning to those who have been shut out, we are not just helping individuals; we are dismantling the very barriers that keep equality a distant dream.',
  'What started as a small group trying to bridge that gap has now grown into a movement that continues to evolve quietly, steadily, with focus. we built model to identify the most deserving students: visiting homes, speaking with families, and walking with them from application to graduation. We saw that access alone wasn’t enough. Guidance, belonging, and confidence were just as critical.',
  'Creating mentoring systems, residential support, training programmes, and community-led models. We began to work not just for students, but with them, shaping a network that could sustain itself. As of 2025, Agaram has supported over 6500+ students across Tamil Nadu. Many of our alumni now serve as mentors, facilitators, or fellows themselves, helping others make the same journey. We want to ensure that no student is held back by circumstance. And to keep building a future where every learner is the first, but not the last, in their family to choose their path.',
]

const TIMELINE = [
  {
    year: '2006',
    num: '01',
    color: '#00abc0',
    title: "Non-Profit Registration",
    text: "Registered as a non-profit organization, marking the beginning of Agaram’s mission to use education as a tool for social transformation.",
    cardLeft: '-120px',
    cardTop: '-20px',
    x: '0',
    y: '180',
    lineY2: '120',
    iconX: '-8',
    iconY: '172',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>
    ),
  },
  {
    year: '2007',
    num: '02',
    color: '#00d4aa',
    title: "School Adoption in Palur",
    text: "Adopted and restored the Government Adi Dravidar Welfare School in Palur, Chengalpattu, setting up a library and improving education quality.",
    cardLeft: '95.38461538461539px',
    cardTop: '319.89367974722387px',
    x: '215.3846153846154',
    y: '199.89367974722387',
    lineY2: '259.89367974722387',
    iconX: '207.3846153846154',
    iconY: '191.89367974722387',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></svg>
    ),
  },
  {
    year: '2008',
    num: '03',
    color: '#0088cc',
    title: "Learning Centres & Awareness Film",
    text: "Launched Agaram Learning Centres to provide post-school coaching and skills for rural children and released \"Herova? Zerova?\", a short film to fight school dropouts.",
    cardLeft: '310.7692307692308px',
    cardTop: '9.78126622294161px',
    x: '430.7692307692308',
    y: '209.7812662229416',
    lineY2: '149.7812662229416',
    iconX: '422.7692307692308',
    iconY: '201.7812662229416',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><polygon points="6 3 20 12 6 21 6 3" /></svg>
    ),
  },
  {
    year: '2009',
    num: '04',
    color: '#00b3d4',
    title: "Vazhikattigal Mentorship Program",
    text: "Introduced Vazhikattigal, a mentorship program for students in remote Tamil Nadu, offering guidance, resources, and continuous support for education.",
    cardLeft: '526.1538461538462px',
    cardTop: '324.68951597680973px',
    x: '646.1538461538462',
    y: '204.6895159768097',
    lineY2: '264.68951597680973',
    iconX: '638.1538461538462',
    iconY: '196.6895159768097',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg>
    ),
  },
  {
    year: '2010',
    num: '05',
    color: '#00c7b7',
    title: "Vidhai Initiative Launch",
    text: "Launched Vidhai to sponsor deserving rural students for higher education and mentoring: 160 students from 32 districts formed the first batch.",
    cardLeft: '741.5384615384615px',
    cardTop: '-12.82053007137327px',
    x: '861.5384615384615',
    y: '187.17946992862673',
    lineY2: '127.17946992862673',
    iconX: '853.5384615384615',
    iconY: '179.17946992862673',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
    ),
  },
  {
    year: '2015',
    num: '06',
    color: '#009fc7',
    title: "Thai & 36 Vayadhinile Initiatives",
    text: "Started Thai, providing skills training for rural youth, and 36 Vayadhinile for women’s empowerment. Continued expanding Vidhai student support and mentoring.",
    cardLeft: '956.9230769230769px',
    cardTop: '286.0583048386869px',
    x: '1076.923076923077',
    y: '166.05830483868692',
    lineY2: '226.05830483868692',
    iconX: '1068.923076923077',
    iconY: '158.05830483868692',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
    ),
  },
  {
    year: '2016',
    num: '07',
    color: '#00abc0',
    title: "Yadhum Oorae & School Restorations",
    text: "Introduced the Yadhum Oorae environmental program, rehabilitated three flood-hit villages, and restored two government schools to improve learning conditions.",
    cardLeft: '1172.3076923076924px',
    cardTop: '-48.050487280562436px',
    x: '1292.3076923076924',
    y: '151.94951271943756',
    lineY2: '91.94951271943756',
    iconX: '1284.3076923076924',
    iconY: '143.94951271943756',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
    ),
  },
  {
    year: '2017',
    num: '08',
    color: '#0088cc',
    title: "Namathu Palli & Irula Village Development",
    text: "Adopted additional schools under Namathu Palli and upgraded infrastructure in Irula villages, enabling community certifications for residents.",
    cardLeft: '1387.6923076923076px',
    cardTop: '271.94951271943756px',
    x: '1507.6923076923076',
    y: '151.94951271943756',
    lineY2: '211.94951271943756',
    iconX: '1499.6923076923076',
    iconY: '143.94951271943756',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" /><circle cx="12" cy="8" r="6" /></svg>
    ),
  },
  {
    year: '2018',
    num: '09',
    color: '#00d4aa',
    title: "Book Publication & School Expansion",
    text: "Published \"Aaram Seyya Virumbu\" and adopted three more government schools under Namathu Palli.",
    cardLeft: '1603.076923076923px',
    cardTop: '-33.94169516131305px',
    x: '1723.076923076923',
    y: '166.05830483868695',
    lineY2: '106.05830483868695',
    iconX: '1715.076923076923',
    iconY: '158.05830483868695',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></svg>
    ),
  },
  {
    year: '2020',
    num: '10',
    color: '#00b3d4',
    title: "COVID-19 Relief & Education Support",
    text: "Published \"Ulagam Pirandhadhu Namakaga\" and \"Vithyasamthan Azhagu\", and provided COVID-19 education relief: 500 smartphones and fees for over 2,500 students.",
    cardLeft: '1818.4615384615383px',
    cardTop: '307.17946992862676px',
    x: '1938.4615384615383',
    y: '187.17946992862673',
    lineY2: '247.17946992862673',
    iconX: '1930.4615384615383',
    iconY: '179.17946992862673',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
    ),
  },
  {
    year: '2021',
    num: '11',
    color: '#00d4aa',
    title: "Agaram Alumni Association",
    text: "Formed the Agaram Alumni Association to connect graduates and strengthen community ties.",
    cardLeft: '2033.8461538461538px',
    cardTop: '4.689515976809702px',
    x: '2153.846153846154',
    y: '204.6895159768097',
    lineY2: '144.6895159768097',
    iconX: '2145.846153846154',
    iconY: '196.6895159768097',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
  },
  {
    year: '2022',
    num: '12',
    color: '#0088cc',
    title: "Namadhu Palli Fellowship Launch",
    text: "Launched Agaram Namadhu Palli Fellowship in Jawadhu Hills, placing four fellows in four schools to improve rural education.",
    cardLeft: '2249.230769230769px',
    cardTop: '329.7812662229416px',
    x: '2369.230769230769',
    y: '209.7812662229416',
    lineY2: '269.7812662229416',
    iconX: '2361.230769230769',
    iconY: '201.7812662229416',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg>
    ),
  },
  {
    year: '2023',
    num: '13',
    color: '#00b3d4',
    title: "Fellowship Expansion",
    text: "Expanded the fellowship to 33 fellows across 32 schools, scaling rural education impact.",
    cardLeft: '2464.6153846153848px',
    cardTop: '-0.10632025277612911px',
    x: '2584.6153846153848',
    y: '199.89367974722387',
    lineY2: '139.89367974722387',
    iconX: '2576.6153846153848',
    iconY: '191.89367974722387',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
    ),
  },
  {
    year: '2024',
    num: '14',
    color: '#00d4aa',
    title: "EmpowHer & Fellowship Growth",
    text: "Organized EmpowHer, an international conclave for women in STEM, published two Tamil books, and expanded the fellowship to 50 fellows in 49 schools.",
    cardLeft: '2680px',
    cardTop: '300px',
    x: '2800',
    y: '180',
    lineY2: '240',
    iconX: '2792',
    iconY: '172',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
    ),
  },
];

export default function OurJourney() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [roadDrawn, setRoadDrawn] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const viewportRef = useRef(null)
  const dragState = useRef({ dragging: false, startX: 0, startOffset: 0 })
  const columnRefs = useRef([])

  useEffect(() => {
    document.title = 'Our Journey | Agaram Foundation'
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setRoadDrawn(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const speeds = [18, 26, 22]
    const directions = [1, -1, 1]
    const offsets = [0, 0, 0]
    let raf
    let last = performance.now()
    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      columnRefs.current.forEach((el, i) => {
        if (!el) return
        const period = el.scrollHeight / 3
        if (!period) return
        offsets[i] = (offsets[i] + speeds[i] * dt) % period
        const y = directions[i] === 1 ? -offsets[i] : offsets[i] - period
        el.style.transform = 'translateY(' + y + 'px)'
      })
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const clampOffset = (value) => {
    const viewport = viewportRef.current
    const min = viewport ? Math.min(0, viewport.clientWidth - TIMELINE_CONTENT_WIDTH) : -TIMELINE_CONTENT_WIDTH
    return Math.max(min, Math.min(0, value))
  }

  const onPointerDown = (e) => {
    dragState.current = { dragging: true, startX: e.clientX, startOffset: dragOffset }
  }

  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return
    e.preventDefault()
    setDragOffset(clampOffset(dragState.current.startOffset + (e.clientX - dragState.current.startX)))
  }

  const endDrag = () => {
    dragState.current.dragging = false
  }

  const pan = { transform: 'translateX(' + dragOffset + 'px)' }

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="w-full">
        <section
          className="relative bg-cover bg-center min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] flex items-center justify-center px-4 sm:px-8"
          style={{ backgroundImage: "url('/assets/images/journey/journey_banner.png')" }}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10 max-w-3xl w-full text-center text-white space-y-6 py-10 sm:py-16">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">Our Journey</h1>
            <p className="text-white text-base sm:text-lg lg:text-xl">
              From humble beginnings to transformational milestones, follow Agaram Foundation&apos;s journey of
              empowering students through education.
            </p>
          </div>
        </section>
        <div id="timeline">
          <div className="max-w-7xl mt-16 mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-1">
            <div className="rounded-2xl overflow-hidden  flex flex-col md:flex-row items-stretch justify-between">
              <div className="p-6 flex flex-col justify-between w-full md:w-5/5 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-4xl font-semibold mb-4 text-secondary-500">A Legacy of Change</h3>
                  <p className="text-justify text-md text-secondary-400">
                    {LEGACY_PARAGRAPHS[0]}
                    <br />
                    <br />
                    {LEGACY_PARAGRAPHS[1]}
                    <br />
                    <br />
                    {LEGACY_PARAGRAPHS[2]}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full max-w-screen-xl mx-auto px-4 py-12">
              <div
                className="grid grid-cols-3 gap-4 h-[500px] overflow-hidden relative"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                }}
              >
                {CAROUSEL_SEQUENCES.map((sequence, colIndex) => (
                  <div className="relative h-full overflow-hidden" key={colIndex}>
                    <div
                      className="flex flex-col gap-6"
                      style={{ willChange: 'transform' }}
                      ref={(el) => {
                        columnRefs.current[colIndex] = el
                      }}
                    >
                      {[0, 1, 2].map((repeat) =>
                        sequence.map((n, imgIndex) => (
                          <div
                            className="relative w-full aspect-[4/5] overflow-hidden rounded-xl shadow-md"
                            key={repeat + '-' + imgIndex}
                          >
                            <img
                              alt={'carousel-image-' + colIndex + '-' + (repeat * sequence.length + imgIndex)}
                              loading="lazy"
                              decoding="async"
                              className="rounded"
                              style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0,
                                objectFit: 'cover',
                                color: 'transparent',
                              }}
                              src={'/assets/images/journey/our_journey(' + n + ').jpg'}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="min-h-screen">
            <div className="pt-12 pb-8 px-8"></div>
            <div
              ref={viewportRef}
              className="relative overflow-hidden cursor-grab active:cursor-grabbing hidden md:flex"
              style={{ height: '700px' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerLeave={endDrag}
            >
              <div className="absolute z-30" style={{ left: '40px', top: '50%', ...pan }}>
                <div className="bg-gradient-to-r from-[#00abc0] to-[#00d4aa] text-white rounded-full px-8 py-4">
                  <span className="text-sm font-bold tracking-wide">START</span>
                </div>
              </div>
              <div className="absolute z-30" style={{ left: '3250px', top: '50%', ...pan }}>
                <div className="bg-gradient-to-r from-[#0088cc] to-[#00abc0] text-white rounded-full px-8 py-4">
                  <span className="text-sm font-bold tracking-wide">ONGOING</span>
                </div>
              </div>
              <div className="absolute z-10" style={{ top: '100px', left: '300px', ...pan }}>
                <svg width="2800" height="400" viewBox="0 0 2800 400">
                  <defs>
                    <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00abc0" />
                      <stop offset="20%" stopColor="#00d4aa" />
                      <stop offset="40%" stopColor="#0088cc" />
                      <stop offset="60%" stopColor="#00b3d4" />
                      <stop offset="80%" stopColor="#00c7b7" />
                      <stop offset="100%" stopColor="#009fc7" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d={ROAD_PATH}
                    stroke="url(#timelineGradient)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    pathLength="1"
                    strokeDasharray="1 1"
                    style={{ strokeDashoffset: roadDrawn ? '0' : '1', transition: 'stroke-dashoffset 2.5s ease-in-out' }}
                  />
                  {TIMELINE.map((entry, index) => {
                    const active = index === activeIndex
                    return (
                      <g key={entry.num} onClick={() => setActiveIndex(index)}>
                        <line
                          x1={entry.x}
                          y1={entry.y}
                          x2={entry.x}
                          y2={entry.lineY2}
                          stroke={entry.color}
                          strokeWidth="4"
                          opacity={active ? '1' : '0.7'}
                        />
                        <circle
                          cx={entry.x}
                          cy={entry.y}
                          r={active ? '14' : '10'}
                          fill={entry.color}
                          stroke="white"
                          strokeWidth="4"
                          className="cursor-pointer"
                          style={{
                            filter: active
                              ? 'drop-shadow(0 0 20px ' + entry.color + '80)'
                              : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                          }}
                        />
                        <foreignObject
                          x={entry.iconX}
                          y={entry.iconY}
                          width="16"
                          height="16"
                          className="pointer-events-none"
                        >
                          {entry.icon}
                        </foreignObject>
                      </g>
                    )
                  })}
                </svg>
              </div>
              <div className="absolute z-20" style={{ top: '60px', left: '300px', ...pan }}>
                {TIMELINE.map((entry, index) => {
                  const active = index === activeIndex
                  return (
                    <div
                      className="absolute"
                      style={{ left: entry.cardLeft, top: entry.cardTop, zIndex: active ? 25 : 20 }}
                      key={entry.num}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div
                        className={
                          active
                            ? 'w-60 p-5 bg-white rounded-2xl shadow-md cursor-pointer transition-all duration-300 shadow-2xl ring-2 ring-primary'
                            : 'w-60 p-5 bg-white rounded-2xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
                        }
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="text-xs font-bold px-3 py-1.5 rounded-full text-white tracking-wide"
                            style={{ background: 'linear-gradient(135deg, ' + entry.color + ', ' + entry.color + 'dd)' }}
                          >
                            {entry.year}
                          </span>
                          <span className="text-2xs font-bold text-gray-400">#{entry.num}</span>
                        </div>
                        <h3
                          className={
                            active
                              ? 'font-bold mb-3 transition-all duration-300 text-lg text-gray-900'
                              : 'font-bold mb-3 transition-all duration-300 text-base text-gray-800'
                          }
                        >
                          {entry.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{entry.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
