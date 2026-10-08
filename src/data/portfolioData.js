export const portfolioData = {
  personal: {
    name: "Irfan Abidin",
    title: "IT Consultant & Frontend Developer (React.js, TypeScript)",
    status: "Available for Opportunities 🚀",
    location: "Bandung, Jawa Barat",
    phone: "+62 818-0904-9406",
    whatsappUrl: "https://wa.me/6281809049406",
    email: "irfan43abdin@gmail.com",
    github: "https://github.com/irfanabidin43",
    linkedin: "https://www.linkedin.com/in/irfanabidin43/",
    website: "https://www.linkedin.com/in/irfanabidin43/",
    bio: "S1 Teknik Informatika dari STMIK Mardira Indonesia dengan pengalaman hampir 3 tahun 5 bulan sebagai IT Consultant di IDX Consulting. Berfokus pada Frontend Development dengan pengalaman mengembangkan dan melakukan maintenance aplikasi berbasis web menggunakan React.js, TypeScript, dan JavaScript. Berpengalaman dalam menerjemahkan kebutuhan bisnis dan desain UI/UX menjadi aplikasi yang responsif dan mudah digunakan, termasuk implementasi fitur, integrasi REST API, form handling, state management, debugging, troubleshooting, serta improvement pada aplikasi existing. Terbiasa bekerja dalam project dengan berbagai kebutuhan dan requirement, melakukan analisis masalah, berkoordinasi dengan developer, analyst, dan stakeholder, serta memastikan fitur yang dikembangkan berjalan sesuai kebutuhan. Memiliki problem solving, analytical thinking, teamwork, adaptability, dan growth mindset, serta memiliki komitmen untuk terus meningkatkan kemampuan dalam bidang teknologi dan software development.",
    aboutShort: "Frontend Developer & IT Consultant berpengalaman di React.js, TypeScript, Next.js, React Hook Form, dan Redux Toolkit.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    stats: [
      { label: "Pengalaman Kerja", value: "3.5+ Tahun" },
      { label: "Spesialisasi", value: "Frontend Dev" },
      { label: "Perusahaan Saat Ini", value: "IDX Consulting" },
      { label: "Pendidikan", value: "S1 T. Informatika" },
    ],
  },

  skills: {
    frontend: [
      { name: "React.js", level: 96, icon: "Code2" },
      { name: "TypeScript", level: 92, icon: "FileCode" },
      { name: "JavaScript (ES6+)", level: 95, icon: "Code" },
      { name: "Next.js", level: 90, icon: "Layout" },
      { name: "React Hook Form", level: 94, icon: "CheckCircle" },
      { name: "Redux Toolkit / State Mgmt", level: 90, icon: "Layers" },
      { name: "Tailwind CSS", level: 95, icon: "Palette" },
      { name: "PrimeReact & Bootstrap", level: 88, icon: "Layout" },
      { name: "HTML5 & CSS3", level: 98, icon: "Sparkles" },
    ],
    backend: [
      { name: "REST API Integration", level: 95, icon: "Network" },
      { name: "Node.js & Express.js", level: 85, icon: "Server" },
      { name: "PostgreSQL", level: 86, icon: "Database" },
      { name: "MySQL", level: 88, icon: "Database" },
      { name: "PHP", level: 80, icon: "Terminal" },
    ],
    toolsNetworking: [
      { name: "GitHub & Version Control", level: 92, icon: "GitBranch" },
      { name: "Computer Networking", level: 88, icon: "Network" },
      { name: "Postman API Testing", level: 90, icon: "Send" },
      { name: "Hardware & IT Troubleshooting", level: 90, icon: "Cpu" },
      { name: "VS Code & Dev Tools", level: 95, icon: "Laptop" },
    ]
  },

  projects: [
    {
      id: "idx-consulting-web",
      title: "Sistem Aplikasi Enterprise & Dashboard (IDX Consulting)",
      category: "Enterprise Web",
      description: "Pengembangan dan pemeliharaan aplikasi web skala enterprise menggunakan React.js, TypeScript, dan Redux Toolkit. Meliputi form handling kompleks dengan React Hook Form, data table dinamis dengan filtering, integrasi REST API, modal workflow, dan peningkatan usability aplikasi existing.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop&q=80",
      tags: ["React.js", "TypeScript", "Redux Toolkit", "React Hook Form", "REST API", "Tailwind CSS"],
      demoUrl: "https://www.linkedin.com/in/irfanabidin43/",
      githubUrl: "https://github.com/irfanabidin43",
      featured: true,
      highlights: [
        "Menerjemahkan requirement bisnis & desain UI/UX menjadi fitur optimal",
        "Form handling & validasi data tingkat lanjut menggunakan React Hook Form",
        "Pengelolaan state terpusat berskala besar menggunakan Redux Toolkit"
      ]
    },
    {
      id: "mitrafor-bea-cukai",
      title: "Portal Layanan DJBC Bea Cukai (PT. Mitrafor)",
      category: "Government / Customs",
      description: "Implementasi antarmuka frontend untuk sistem portal Direktorat Jenderal Bea dan Cukai (Bea Cukai). Mengintegrasikan REST API untuk pengambilan dan pengiriman data secara real-time serta perbaikan issue teknis frontend.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&auto=format&fit=crop&q=80",
      tags: ["React.js", "JavaScript", "REST API", "Bootstrap", "UI/UX Implementation"],
      demoUrl: "https://www.linkedin.com/in/irfanabidin43/",
      githubUrl: "https://github.com/irfanabidin43",
      featured: true,
      highlights: [
        "Aplikasi web fungsional untuk instansi Direktorat Jenderal Bea dan Cukai",
        "Integrasi konsumsi data REST API cepat dan akurat",
        "Debugging dan optimasi antarmuka pengguna responsif"
      ]
    },
    {
      id: "sistem-pakar-sanbe",
      title: "Sistem Pakar Diagnosa Penyakit Ibu Hamil (Certainty Factor)",
      category: "Expert System / Web",
      description: "Perancangan dan implementasi sistem pakar berbasis web untuk mendiagnosa penyakit pada ibu hamil dengan metode Certainty Factor. Karya skripsi studi kasus di Klinik Sanbe Farma.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&auto=format&fit=crop&q=80",
      tags: ["PHP", "JavaScript", "MySQL", "Certainty Factor", "Bootstrap", "Klinik Sanbe Farma"],
      demoUrl: "https://www.linkedin.com/in/irfanabidin43/",
      githubUrl: "https://github.com/irfanabidin43",
      featured: true,
      highlights: [
        "Implementasi kalkulasi probabilitas Certainty Factor akurat",
        "Dashboard rekam diagnosa pasien dan konsultasi gejala",
        "Studi kasus nyata pada Klinik Sanbe Farma"
      ]
    },
    {
      id: "pijar-fullstack-app",
      title: "Full-Stack Web Application (Pijar Camp)",
      category: "Fullstack",
      description: "Aplikasi website modern responsif end-to-end yang dibangun menggunakan Next.js, Node.js, Express.js, dan database PostgreSQL berdasarkan desain UI/UX interaktif.",
      image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=700&auto=format&fit=crop&q=80",
      tags: ["Next.js", "React.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
      demoUrl: "https://www.linkedin.com/in/irfanabidin43/",
      githubUrl: "https://github.com/irfanabidin43",
      featured: false,
      highlights: [
        "Arsitektur fullstack terstruktur dari database hingga frontend",
        "Integrasi RESTful API dengan otentikasi aman",
        "Tampilan responsif di seluruh perangkat mobile & desktop"
      ]
    }
  ],

  experiences: [
    {
      role: "IT Consultant",
      company: "PT. IDX Consulting",
      period: "Jun 2023 – Sekarang (Hampir 3.5 Tahun)",
      location: "Jakarta / Bandung (Hybrid)",
      description: "Mengembangkan dan melakukan maintenance aplikasi berbasis web menggunakan React.js, TypeScript, dan JavaScript sesuai kebutuhan project dan requirement bisnis. Menerjemahkan kebutuhan bisnis, functional requirement, dan desain UI/UX menjadi fitur aplikasi yang dapat digunakan secara optimal. Mengembangkan form, data table, filtering, validation, tab navigation, modal/dialog, file upload, dan workflow aplikasi. Mengelola form & validasi menggunakan React Hook Form serta state management menggunakan Redux Toolkit. Melakukan integrasi REST API, debugging, troubleshooting, serta improvement pada aplikasi existing bersama developer, analyst, dan stakeholder.",
      technologies: ["React.js", "TypeScript", "JavaScript", "React Hook Form", "Redux Toolkit", "REST API", "Tailwind CSS", "PrimeReact"]
    },
    {
      role: "Frontend Developer",
      company: "PT. Mitrafor Teknologi Indonesia",
      period: "Sep 2022 – Nov 2022",
      location: "Bandung / Jakarta",
      description: "Berperan sebagai Frontend Developer dalam project Mitrafor yang dikembangkan untuk kebutuhan Direktorat Jenderal Bea dan Cukai (Bea Cukai). Mengembangkan dan memelihara aplikasi web, menerjemahkan requirement dan desain UI menjadi implementasi fungsional, integrasi REST API, serta troubleshooting issue sisi frontend.",
      technologies: ["React.js", "JavaScript", "REST API", "UI/UX Implementation", "CSS", "Bootstrap"]
    },
    {
      role: "IT Support",
      company: "PT. Anggana Kurnia Putra",
      period: "Okt 2021 – Nov 2021",
      location: "Bandung",
      description: "Melakukan troubleshooting dan perbaikan perangkat komputer, printer, serta perangkat elektronik untuk mendukung operasional perusahaan. Monitoring dan pemeriksaan CCTV serta perangkat pendukung IT, dan membantu menangani kendala teknis harian.",
      technologies: ["Hardware Troubleshooting", "Computer Networking", "CCTV Monitoring", "IT Maintenance"]
    },
    {
      role: "RAW Material Warehouse",
      company: "PT. Caprifarmindo Laboratories",
      period: "Mei 2015 – Sep 2021",
      location: "Bandung",
      description: "Melaksanakan penerimaan, penurunan, dan penempatan bahan baku dari supplier ke Raw Material Warehouse Central. Memantau status bahan baku dari proses quarantine hingga release, pengambilan sampling bersama tim QC, reject bahan baku kadaluarsa, serta distribusi bahan baku ke unit produksi.",
      technologies: ["Inventory Control", "Quality Inspection", "Warehouse Management", "Standard Operating Procedure"]
    },
    {
      role: "Asisten Praktek / Laboran",
      company: "SMK Prakarya Internasional",
      period: "Jun 2014 – Mei 2015",
      location: "Bandung",
      description: "Bertanggung jawab memastikan laboratorium Teknik Komputer dan Jaringan siap digunakan untuk kegiatan praktikum. Membantu guru dalam pelaksanaan kegiatan praktikum, mendampingi siswa memahami materi, serta memberikan solusi terhadap kendala teknis komputer dan jaringan.",
      technologies: ["Computer Networking", "Hardware & LAN Setup", "Lab Maintenance", "Mentoring"]
    }
  ],

  education: [
    {
      degree: "S1 Teknik Informatika (Sistem Informasi)",
      institution: "STMIK Mardira Indonesia, Bandung",
      period: "Ags 2019 – Feb 2021",
      grade: "IPK: 3.15 / 4.00",
      highlights: "Skripsi: “Perancangan Sistem Pakar Untuk Mendiagnosa Penyakit Pada Ibu Hamil dengan Metode Certainty Factor Berbasis Web (Studi Kasus: Klinik Sanbe Farma)”. Fokus: Perancangan aplikasi, software development, teknologi jaringan komputer, serta kombinasi programming dan manajemen bisnis."
    },
    {
      degree: "Full Stack Website Developer Intensive",
      institution: "Pijar Camp",
      period: "Apr 2022 – Ags 2022",
      grade: "Graduate",
      highlights: "Pembuatan Web Full Stack Frontend maupun Backend responsif sesuai UI/UX. JavaScript, HTML, CSS, Bootstrap, PostgreSQL, Next.js, React.js, Node.js, Express.js."
    },
    {
      degree: "S1 Teknik Informatika (Studi Akademik)",
      institution: "Sekolah Tinggi Teknologi Bandung, Bandung",
      period: "Jul 2014 – Ags 2019",
      grade: "Teknik Informatika",
      highlights: "Mempelajari ilmu komputer merancang bangun aplikasi untuk mengelola informasi, penguasaan bahasa pemrograman, pengembangan software, dan teknologi jaringan komputer."
    }
  ],

  certifications: [
    { name: "Full Stack Web Developer Certificate – Pijar Camp", year: "2022" },
    { name: "IT Consultant Professional Practice – PT. IDX Consulting", year: "2023" },
    { name: "Teknik Komputer & Jaringan – SMK Prakarya Internasional", year: "2015" }
  ],

  wallpapers: [
    {
      id: "liquid-glass",
      name: "Liquid Glass Ribbon",
      url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1920&auto=format&fit=crop&q=80",
      isDark: true
    },
    {
      id: "win11-bloom",
      name: "Windows 11 Bloom (Glass)",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&auto=format&fit=crop&q=80",
      isDark: true
    },
    {
      id: "aurora-prism",
      name: "Aurora Glass Prism",
      url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1920&auto=format&fit=crop&q=80",
      isDark: true
    },
    {
      id: "cyber-glass",
      name: "Neon Glass City",
      url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1920&auto=format&fit=crop&q=80",
      isDark: true
    },
    {
      id: "retro-bliss",
      name: "Bliss Meadow (Classic)",
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&auto=format&fit=crop&q=80",
      isDark: false
    }
  ]
};
