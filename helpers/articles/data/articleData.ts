// File ini berisi data dummy untuk di-seed ke database.
// Slug akan dibuat otomatis oleh Mongoose pre-save hook.

export const articleData = [
  {
    title: "5 Tren Desain Website 2025 yang Wajib Anda Tahu",
    content: "<h2>Pendahuluan</h2><p>Dunia desain web terus bergerak cepat. Apa yang populer tahun lalu mungkin sudah usang hari ini. Di tahun 2025, fokusnya adalah pada pengalaman pengguna yang lebih personal, interaktivitas, dan tentu saja, kecepatan. Berikut adalah lima tren yang kami prediksi akan mendominasi.</p><h3>1. AI-Generated Graphics</h3><p>Grafis yang dibuat oleh AI bukan lagi fiksi ilmiah. Ini memungkinkan personalisasi visual dalam skala besar...</p><h3>2. 3D & Immersive Elements</h3><p>Elemen 3D yang interaktif akan semakin banyak digunakan untuk menampilkan produk dan data...</p>",
    excerpt: "Di tahun 2025, dunia desain web berfokus pada pengalaman yang lebih personal dan interaktif. Dari grafis AI hingga elemen 3D, mari kita jelajahi tren yang akan mendominasi.",
    coverImage: "https://placehold.co/1200x630/0891B2/FFFFFF/png?text=Tren+Desain+2025",
    category: "Web Design",
    tags: ['desain web', 'tren 2025', 'UI/UX', 'inovasi'],
    author: "Nexoria Creative",
    status: 'published',
  },
  {
    title: "Studi Kasus: Peningkatan Konversi 300% untuk Klien E-commerce",
    content: "<h2>Latar Belakang</h2><p>Klien kami, sebuah brand fashion lokal, mengalami kesulitan dalam meningkatkan penjualan melalui website mereka. Kami melakukan audit UI/UX mendalam dan menemukan beberapa masalah utama...</p><h3>Solusi Kami</h3><p>Kami merombak total alur checkout, menyederhanakan navigasi, dan mengoptimalkan kecepatan halaman. Hasilnya, tingkat konversi meningkat sebesar 300% dalam 3 bulan.</p>",
    excerpt: "Analisis mendalam tentang bagaimana perbaikan UI/UX dan optimasi alur checkout berhasil meningkatkan penjualan sebuah brand fashion lokal hingga 300%.",
    coverImage: "https://placehold.co/1200x630/16A34A/FFFFFF/png?text=Studi+Kasus+E-commerce",
    category: "Studi Kasus",
    tags: ['studi kasus', 'UI/UX', 'konversi', 'e-commerce'],
    author: "Nexoria Creative",
    status: 'published',
  },
  {
    title: "Panduan Lengkap SEO untuk Pemula di Tahun 2025",
    content: "<h2>Apa itu SEO?</h2><p>Search Engine Optimization (SEO) adalah seni dan ilmu untuk membuat halaman web Anda menarik bagi mesin pencari seperti Google. Tujuannya adalah untuk mendapatkan peringkat tinggi pada halaman hasil pencarian...</p><h3>Keyword Research</h3><p>Langkah pertama adalah riset kata kunci. Gunakan tools seperti Ahrefs atau SEMrush untuk menemukan apa yang dicari oleh audiens target Anda...</p>",
    excerpt: "Bingung mulai dari mana dengan SEO? Panduan ini mencakup semua dasar yang perlu Anda ketahui di tahun 2025, dari riset kata kunci hingga on-page SEO.",
    coverImage: "https://placehold.co/1200x630/DB2777/FFFFFF/png?text=Panduan+SEO+2025",
    category: "Digital Marketing",
    tags: ['seo', 'pemula', 'google', 'marketing'],
    author: "Nexoria Creative",
    status: 'published',
  },
  {
    title: "Mengapa Video Marketing Sangat Penting untuk Brand Anda?",
    content: "<h2>Era Konten Visual</h2><p>Di tengah lautan informasi, konten video memiliki kemampuan unik untuk menarik perhatian dan menyampaikan pesan dengan cepat. Statistik menunjukkan bahwa pengguna 85% lebih mungkin membeli produk setelah menonton video tentangnya...</p>",
    excerpt: "Video bukan lagi pilihan, melainkan keharusan dalam strategi marketing. Pelajari mengapa video dapat meningkatkan engagement dan kepercayaan pelanggan secara drastis.",
    coverImage: "https://placehold.co/1200x630/F97316/FFFFFF/png?text=Video+Marketing",
    category: "Video Editing",
    tags: ['video marketing', 'branding', 'sosial media'],
    author: "Nexoria Creative",
    status: 'published',
  },
  {
    title: "[DRAFT] Ide Konten Instagram untuk Bisnis Kuliner",
    content: "<h2>Konten yang Menggugah Selera</h2><p>Untuk bisnis kuliner, visual adalah segalanya. Berikut beberapa ide konten yang bisa Anda coba...</p><ul><li>Behind the scenes di dapur</li><li>Video proses memasak (ASMR)</li><li>Giveaway atau kontes</li></ul>",
    excerpt: "Kumpulan ide konten kreatif untuk meningkatkan engagement akun Instagram bisnis kuliner Anda, dari foto yang menggugah selera hingga video di balik layar.",
    coverImage: "https://placehold.co/1200x630/EF4444/FFFFFF/png?text=Ide+Konten+Kuliner",
    category: "Social Media",
    tags: ['instagram', 'kuliner', 'konten', 'ide'],
    author: "Nexoria Creative",
    status: 'draft', // Artikel ini tidak akan muncul di API publik
  },
];