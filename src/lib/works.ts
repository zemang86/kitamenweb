export type Work = {
  id: number;
  slug: string;
  title: string;
  category: string;
  productType: string;
  year: string;
  client: string;
  /** HTML rich text (may contain a leading YouTube iframe) */
  content: string;
  mainImage: string;
  hoverImage: string;
  gallery: string[];
};

/**
 * Mirror of the Framer "Works" CMS collection.
 * Ordered by the CMS `ID` field (ascending) to match the live site.
 */
export const works: Work[] = [
  {
    id: 0,
    slug: "tgr",
    title: "Toyota Gazoo Racing",
    category: "PlayPod",
    productType: "PlayPod",
    year: "2026",
    client: "Toyota",
    content: `<p><strong>Accelerating Fan Experience Through Sim Racing</strong></p><p>Super GT Sepang 2026 roared to life with more than just engines—this year, spectators stepped into the driver’s seat themselves, thanks to KITAMEN’s custom racing simulator experience hosted at the Toyota Gazoo Racing booth.</p><p>Built on Assetto Corsa and featuring exclusive access to the GR Yaris and GR Supra, the installation transformed a section of the circuit into a high-performance virtual grid. From authentic force feedback rigs to crowd-ready screens, every element was designed to replicate the rhythm and rush of GT-class racing.</p><p>Across three days, thousands of visitors took their turn on the track—some chasing lap times, others simply soaking in the thrill. The experience struck a chord with fans of all ages, offering a fresh way to engage with the culture of motorsport beyond the grandstands.</p>`,
    mainImage:
      "https://framerusercontent.com/images/ZMV2sMmF0FMoZArg7GegLWpHI0I.jpg",
    hoverImage:
      "https://framerusercontent.com/images/87td9r6KIan7GZpsYaHAlhR9YA0.jpg",
    gallery: [
      "https://framerusercontent.com/images/3h4zhKZiBJzj3jIjEemQeRBc.jpg",
      "https://framerusercontent.com/images/38BkAfmHiEgjcreioMIaTVPQ1y8.jpg",
      "https://framerusercontent.com/images/tQ1ln2HcXloPHeilwyk9Lyx2uA.jpg",
      "https://framerusercontent.com/images/3K88kgPlaSOsnVkwuUhtjFQag.jpg",
      "https://framerusercontent.com/images/EeSxnT3LpkQtPc5EGuOTVpmj0Zc.jpg",
    ],
  },
  {
    id: 1,
    slug: "ptptn",
    title: "PTPTN Esports Challenge",
    category: "PlaySuite",
    productType: "PlaySuite",
    year: "2024",
    client: "Ministry of Higher Education, Malaysia",
    content: `<h2>A Savings Campaign Like Never Before</h2><p>When most people think of student savings, they think banks and boring booths. But in 2024, PTPTN flipped the script. <br><br>As part of its <em>Bulan Menabung SSPN (BMS)</em> campaign, PTPTN launched the <strong>Esports Challenge</strong>, with <em>Mobile Legends</em> as its crown jewel—a bold move to connect with Gen Z where they live: in the digital arena.<br><br>The Bigger Impact</p><ul><li><p><strong>Engagement Strategy</strong>: PTPTN used gaming to turn <em>saving money</em> into <em>earning respect</em>.</p></li><li><p><strong>Cultural Relevance</strong>: Mobile Legends wasn’t a random choice—it’s the most played mobile game in Malaysia.</p></li><li><p><strong>Incentivised Behavior</strong>: The RM50 deposit requirement ensured that every match helped build real-world habits.</p></li><li><p><strong>Government-Grade Execution</strong>: Official coverage, branded stage setup, and high production value.</p></li></ul>`,
    mainImage:
      "https://framerusercontent.com/images/mwNHvvN3hfzam4dJJPY5ZDDvjk.jpeg",
    hoverImage:
      "https://framerusercontent.com/images/SyxojT3JkoMCiQTEfzIT26swSA.jpg",
    gallery: [
      "https://framerusercontent.com/images/NOsGdpECLR2lurZpb2GNzPzoiVk.jpeg",
      "https://framerusercontent.com/images/5siLQZDHF6uscORD1TFK3q85F8Q.jpg",
    ],
  },
  {
    id: 2,
    slug: "gegaria",
    title: "Gegaria Fest",
    category: "Playpod & PlaySuite",
    productType: "Playpod & PlaySuite",
    year: "2018",
    client: "Media Prima",
    content: `<p>Gegaria Fest burst onto the Malaysian scene as a <strong>free, multi-city entertainment extravaganza</strong>, mixing food, fitness, culture, and proudly—<strong>gaming</strong>. With its signature container-themed setup, the festival traveled through Ipoh, Johor Bahru, Kuantan, Seremban, and Kuala Lumpur between March and April 2018.</p><p>At the heart of Gegaria’s gaming experience was the <strong>MyGameOn eSports Zone</strong>, featuring free-to-try VR, console, and PC titles. Esports tournaments included:</p><ul><li><p><strong>FIFA Online 3</strong> – RM 10,000 prize pool</p></li><li><p><strong>Tekken 7</strong> – RM 3,000</p></li><li><p><strong>Mario Kart 8 Deluxe</strong> mini-tournament – RM 1,000 </p></li><li><p>VR &amp; Guitar Hero for Free2Play Zone</p></li></ul><p>Fans clashed in arenas packed with energy, and matches were broadcast live, reinforcing the esports community’s presence in mainstream events.</p>`,
    mainImage:
      "https://framerusercontent.com/images/awQjP5N7r0W7d6MCbmd3X36Kc.jpg",
    hoverImage:
      "https://framerusercontent.com/images/ZPVdGRi8qt8x5A7UywzIyQBdeSQ.jpg",
    gallery: [
      "https://framerusercontent.com/images/VAtB6L338CTeZthmawBqhm3Kak.jpg",
      "https://framerusercontent.com/images/AnjJLv20ZHdbR3gUDEVFGsvjs.jpg",
      "https://framerusercontent.com/images/xDEtQjf5RnywUhGekbuiaJtdwJc.jpg",
    ],
  },
  {
    id: 3,
    slug: "mcg",
    title: "Malaysia Cyber Games",
    category: "PlaySuite",
    productType: "PlaySuite",
    year: "2018",
    client: "Kementerian Komunikasi dan Multimedia, Malaysia",
    content: `<iframe src="https://www.youtube.com/embed/CUx_lFxAzLU?iv_load_policy=3&amp;rel=0&amp;modestbranding=1&amp;playsinline=1" frameborder="0" allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe><p>The iconic Putra World Trade Centre transformed into a digital battlefield as <strong>Malaysia Cyber Games 2018</strong> united thousands of players and fans under one roof—proving that competitive gaming had officially gone national.</p><p>At the center of this celebration stood one of the most anticipated brackets: the <strong>FIFA Tournament</strong>. Our team was entrusted to <strong>design, manage, and operate</strong> the FIFA segment of MCG. With precision scheduling, tournament logic, referee management, and technical infrastructure, we created a seamless and competitive experience worthy of the stage it was on.<br><br>The Legacy We Left</p><ul><li><p><strong>10,000+ attendees</strong> at PWTC</p></li><li><p><strong>1,000+ registered pro competitors</strong> across all games</p></li><li><p><strong>Live broadcasts and news coverage</strong> across Malay Mail, MyGameOn, and The Malaysian Reserve</p></li><li><p><strong>Official recognition</strong> from former Prime Minister Najib Razak, highlighting esports as a national agenda</p></li></ul>`,
    mainImage:
      "https://framerusercontent.com/images/S7RZ0DFJLv4RUFD7U4rpQLkwec.jpg",
    hoverImage:
      "https://framerusercontent.com/images/cupMGLBFg0tPGuHTh8NN1WHMvk.jpg",
    gallery: [
      "https://framerusercontent.com/images/Jo4g0JHaFwl4W81DR66YjvbCePY.jpg",
      "https://framerusercontent.com/images/gxbH4rrPJF2k3kJjjxdgIWllU.jpg",
      "https://framerusercontent.com/images/PHaOvoQY3RbmIGIEPNou3wQM7Ds.jpg",
      "https://framerusercontent.com/images/rFZhNQTSh7EEwJrQM9CDv2y7Jo.jpg",
    ],
  },
  {
    id: 4,
    slug: "kek",
    title: "Kejohanan E-Sukan Kampus",
    category: "PlayLab",
    productType: "PlayLab",
    year: "2019",
    client: "Media Prima",
    content: `<iframe src="https://www.youtube.com/embed/qIXwWrI9lFo?iv_load_policy=3&amp;rel=0&amp;modestbranding=1&amp;playsinline=1" frameborder="0" allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe><p>The <strong>Kejohanan E‑sukan Kampus (KEK)</strong> is Malaysia’s largest campus-level esports tournament, initiated in 2019 in collaboration between Media Prima’s MyGameOn, Celcom Axiata’s youth brand XPAX (later Yoodo), and esports organizer Kitamen. Aimed at discovering and empowering student talent across all higher learning institutions, KEK combines competition, education, and entertainment into a nationwide campus circuit.</p><p><strong>Impact &amp; Legacy</strong></p><ul><li><p><strong>Grassroots Engagement</strong>: Reached over 266 campuses and more than 921 teams across semesters, with 142k attendees and 5 million livestream views.</p></li><li><p><strong>Talent Development</strong>: Provided students with competitive exposure, scholarship opportunities, and industry networking.</p></li><li><p><strong>Community Growth</strong>: Contributed to Malaysia’s broader push for healthy gaming and campus esports culture.</p></li></ul>`,
    mainImage:
      "https://framerusercontent.com/images/78m20wE0NMBRw7rvVj5vzAF5GJk.jpg",
    hoverImage:
      "https://framerusercontent.com/images/kfUtpWUQEfHv13IBfR6f89nPU.jpg",
    gallery: [
      "https://framerusercontent.com/images/KYedYMMCLtF7fIiMwDbDJNHmlUg.jpg",
      "https://framerusercontent.com/images/I2meaTNKY0TLPwktD6B9ViVns.jpg",
      "https://framerusercontent.com/images/OTIWnFWugWWtlJND8JZI7mQH5lk.jpg",
      "https://framerusercontent.com/images/WrRcSlmmBe78w5uWkmYv1Jk3c.jpg",
    ],
  },
  {
    id: 5,
    slug: "utopia",
    title: "UTOPIA by UNIFI",
    category: "PlayLab",
    productType: "PlayLab",
    year: "2019",
    client: "UNIFI",
    content: `<iframe src="https://www.youtube.com/embed/9VKGeW6pM4M?iv_load_policy=3&amp;rel=0&amp;modestbranding=1&amp;playsinline=1" frameborder="0" allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe><p>UTOPIA is a high-profile esports initiative launched by UNIFI in collaboration with community organizers like KITAMEN. Its first edition took place in 2019 at LVLUP KL, marking UNIFI’s entry into major grassroots gaming events. As one of the company’s early investments in esports, it paved the way for future large-scale tournaments.<br><br>Why It Matters</p><ul><li><p><strong>Building Grassroots Power</strong>: UTOPIA showcases UNIFI’s commitment to nurturing homegrown talent and elevating Malaysia’s esports culture from school and community levels upward.</p></li><li><p><strong>Multi-Platform Replayability</strong>: From PC to mobile, and even console crossovers, the tournaments attract diverse gamers.</p></li><li><p><strong>Strong Digital Engagement</strong>: Streaming performance and recorded highlight content—such as those from Utopia Invictus—highlight solid community interest.</p></li></ul>`,
    mainImage:
      "https://framerusercontent.com/images/Gs51g8osNOjNaUNxkbEKjljvFA.jpg",
    hoverImage:
      "https://framerusercontent.com/images/4nIPT7n98YUSmav4Fx3FX5bHePQ.jpg",
    gallery: [
      "https://framerusercontent.com/images/HJQ03rtojE4T9C8nByOc7JxrXrQ.jpg",
      "https://framerusercontent.com/images/sjW9ZmXtMOiX9r7yjZuTz37rCR0.jpg",
      "https://framerusercontent.com/images/BkOWUD4IEHTJmAeJCX2LRB8MAe4.jpg",
      "https://framerusercontent.com/images/VY065jDYNgLUSxGrJfz5nALcS0.jpg",
    ],
  },
];

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
