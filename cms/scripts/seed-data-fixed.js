/**
 * Fixed seed data matching actual Strapi schemas
 */

const portfolioProjects = [
  {
    title: "Modern Minimalist Living Room",
    slug: "modern-minimalist-living-room",
    description: "Desain ruang tamu minimalis modern dengan sentuhan kayu dan warna netral yang menciptakan suasana hangat dan nyaman.",
    category: "Rumah",
    location: "Jakarta Selatan",
    area_size: "45 m²",
    theme: "Modern Minimalis",
    completion_date: "2025-06-15",
    is_featured: true,
    order: 1,
    content: `# Modern Minimalist Living Room

Proyek ini menghadirkan transformasi total ruang tamu dengan konsep minimalis modern yang mengutamakan fungsi tanpa mengorbankan estetika.

## Konsep Desain
Menggunakan palet warna netral dengan aksen kayu natural, kami menciptakan ruang yang terasa luas, bersih, dan hangat.

## Material Utama
- Lantai vinyl motif kayu oak
- Sofa fabric premium warna abu-abu
- Meja coffee table marmer putih
- Rak TV custom dengan storage tersembunyi

## Hasil Akhir
Ruang tamu yang terasa 40% lebih luas dengan pencahayaan optimal dan sirkulasi udara yang baik.`
  },
  {
    title: "Scandinavian Bedroom Design",
    slug: "scandinavian-bedroom-design",
    description: "Kamar tidur bergaya Scandinavian dengan dominasi warna putih dan material kayu yang menciptakan kesan bersih dan tenang.",
    category: "Rumah",
    location: "BSD City",
    area_size: "20 m²",
    theme: "Scandinavian",
    completion_date: "2025-07-20",
    is_featured: true,
    order: 2,
    content: `# Scandinavian Bedroom Design

Desain kamar tidur yang mengadopsi prinsip Scandinavian: simple, functional, dan cozy.

## Elemen Utama
- Tempat tidur platform kayu jati
- Pallet warna putih dan abu-abu soft
- Lighting natural maksimal
- Storage built-in minimalis

## Fitur Khusus
Walking closet tersembunyi dengan sistem sliding door yang tidak memakan space visual.`
  },
  {
    title: "Industrial Style Kitchen",
    slug: "industrial-style-kitchen",
    description: "Dapur bergaya industrial dengan kombinasi besi, kayu, dan beton yang menciptakan karakter kuat dan maskulin.",
    category: "Rumah",
    location: "Bogor",
    area_size: "15 m²",
    theme: "Industrial",
    completion_date: "2025-08-10",
    is_featured: false,
    order: 3,
    content: `# Industrial Style Kitchen

Kitchen set dengan konsep industrial yang bold namun tetap warm dan inviting.

## Material Palette
- Countertop concrete finish
- Cabinet kayu reclaimed
- Backsplash subway tiles hitam
- Hardware besi black matte

## Smart Storage
Maximized storage dengan pull-out pantry dan corner lazy susan.`
  },
  {
    title: "Contemporary Office Space",
    slug: "contemporary-office-space",
    description: "Ruang kerja kontemporer dengan desain ergonomis dan pencahayaan yang mendukung produktivitas maksimal.",
    category: "Kantor",
    location: "Jakarta Pusat",
    area_size: "30 m²",
    theme: "Contemporary",
    completion_date: "2025-09-05",
    is_featured: true,
    order: 4,
    content: `# Contemporary Office Space

Desain home office yang mempertimbangkan ergonomi dan produktivitas.

## Layout
- Meja kerja L-shape custom
- Storage filing system vertikal
- Meeting corner untuk 4 orang
- Acoustic panel untuk noise reduction

## Tech Integration
Cable management tersembunyi dan power outlet strategis di setiap sudut.`
  },
  {
    title: "Tropical Villa Living",
    slug: "tropical-villa-living",
    description: "Living area villa tropis yang memadukan indoor dan outdoor dengan material natural dan ventilasi optimal.",
    category: "Rumah",
    location: "Bogor",
    area_size: "80 m²",
    theme: "Tropical Modern",
    completion_date: "2025-10-15",
    is_featured: true,
    order: 5,
    content: `# Tropical Villa Living

Desain living area villa yang memanfaatkan tropical vibes dengan maksimal.

## Konsep Utama
- Open plan layout
- Large sliding doors ke taman
- Natural ventilation system
- Material local: batu alam, kayu jati, bambu

## Furniture
Custom sofa sectional dengan fabric tahan lembab dan outdoor dining set teak.`
  },
  {
    title: "Luxury Master Bathroom",
    slug: "luxury-master-bathroom",
    description: "Kamar mandi master yang mewah dengan bathtub freestanding dan shower rain system premium.",
    category: "Rumah",
    location: "Jakarta Selatan",
    area_size: "12 m²",
    theme: "Luxury Modern",
    completion_date: "2026-01-20",
    is_featured: false,
    order: 6,
    content: `# Luxury Master Bathroom

Transformasi kamar mandi menjadi private spa dengan luxury finishes.

## Premium Features
- Bathtub freestanding acrylic
- Shower enclosure frameless dengan rain shower
- Double vanity dengan marble countertop
- Heated floor tiles
- Smart mirror dengan LED ambient

## Material
Marble white carrara, chrome fixtures, dan glass partition untuk wet area.`
  }
];

const insightArticles = [
  {
    title: "5 Tren Desain Interior 2026 yang Wajib Kamu Tahu",
    slug: "5-tren-desain-interior-2026",
    excerpt: "Dari sustainable design hingga biophilic elements, simak tren desain interior yang akan mendominasi tahun 2026.",
    content: `# 5 Tren Desain Interior 2026 yang Wajib Kamu Tahu

Industri desain interior terus berkembang dengan tren-tren baru yang mencerminkan perubahan gaya hidup dan nilai-nilai masyarakat.

## 1. Sustainable & Eco-Friendly Design
Material ramah lingkungan seperti bamboo, reclaimed wood, dan recycled materials semakin populer.

## 2. Biophilic Design
Mengintegrasikan elemen alam ke dalam ruangan untuk meningkatkan kesejahteraan dan produktivitas.

## 3. Multifunctional Spaces
Ruang yang bisa berubah fungsi sesuai kebutuhan, perfect untuk rumah modern yang compact.

## 4. Bold Colors & Patterns
Berani menggunakan warna-warna statement dan pattern mixing untuk personal expression.

## 5. Smart Home Integration
Teknologi pintar yang seamlessly integrated ke dalam desain interior.

## Kesimpulan
Tren 2026 fokus pada sustainability, flexibility, dan personalization. Saatnya upgrade rumah kamu!`,
    category: "trends",
    reading_time: 5,
    is_featured: true,
    order: 1,
    tags: ["tren", "2026", "tips"],
    seo_title: "5 Tren Desain Interior 2026 - SJD Interior Design",
    seo_description: "Pelajari 5 tren desain interior terbaru 2026 dari sustainable design, biophilic elements, hingga smart home integration."
  },
  {
    title: "Cara Memilih Warna Cat yang Tepat untuk Setiap Ruangan",
    slug: "cara-memilih-warna-cat-ruangan",
    excerpt: "Panduan lengkap memilih warna cat yang sesuai dengan fungsi dan mood setiap ruangan di rumah.",
    content: `# Cara Memilih Warna Cat yang Tepat untuk Setiap Ruangan

Warna memiliki psychological impact yang kuat. Berikut panduan memilih warna untuk setiap ruangan.

## Ruang Tamu
**Rekomendasi:** Warm neutrals (beige, soft grey)
**Alasan:** Menciptakan atmosfer welcoming dan versatile untuk berbagai dekorasi.

## Kamar Tidur
**Rekomendasi:** Cool tones (soft blue, lavender, sage green)
**Alasan:** Menenangkan dan mendukung quality sleep.

## Dapur
**Rekomendasi:** White, cream, atau soft yellow
**Alasan:** Bright, clean, dan membuat ruang terasa lebih luas.

## Home Office
**Rekomendasi:** Soft green atau light blue
**Alasan:** Meningkatkan fokus dan mengurangi eye strain.

## Kamar Mandi
**Rekomendasi:** Spa colors (soft aqua, white, grey)
**Alasan:** Menciptakan relaxing spa-like atmosphere.

## Tips Tambahan
- Test warna di small section dulu
- Perhatikan natural lighting
- Consider furniture dan decor yang sudah ada
- Gunakan color wheel untuk kombinasi harmonis`,
    category: "tips",
    reading_time: 7,
    is_featured: true,
    order: 2,
    tags: ["warna", "cat", "tips", "pemula"],
    seo_title: "Panduan Memilih Warna Cat Ruangan - SJD Interior",
    seo_description: "Cara memilih warna cat yang tepat untuk setiap ruangan di rumah Anda dengan panduan lengkap dari ahli interior design."
  },
  {
    title: "Maksimalkan Ruang Sempit dengan 7 Trik Jitu Ini",
    slug: "maksimalkan-ruang-sempit",
    excerpt: "Punya rumah atau apartemen yang sempit? Terapkan 7 trik ini untuk membuat ruangan terasa lebih luas dan nyaman.",
    content: `# Maksimalkan Ruang Sempit dengan 7 Trik Jitu Ini

Ruang sempit bukan halangan untuk memiliki interior yang stylish dan fungsional.

## 1. Gunakan Cermin Strategis
Cermin besar bisa bikin ruangan terasa 2x lebih luas dengan memantulkan cahaya.

## 2. Pilih Furniture Multifungsi
Sofa bed, coffee table dengan storage, ottoman yang bisa jadi extra seating.

## 3. Vertical Storage
Manfaatkan dinding untuk rak dan cabinet vertikal daripada horizontal.

## 4. Palet Warna Terang
White, cream, dan pastel colors membuat ruang terasa lebih terbuka.

## 5. Declutter Secara Rutin
Less is more - simpan hanya yang benar-benar dibutuhkan.

## 6. Transparent Furniture
Glass atau acrylic furniture tidak memblok visual space.

## 7. Sliding Doors
Hemat space dibanding pintu swing tradisional.

## Bonus Tip
Good lighting bisa transform small space - gunakan layered lighting!`,
    category: "tips",
    reading_time: 6,
    is_featured: false,
    order: 3,
    tags: ["ruang sempit", "apartemen", "tips", "storage"],
    seo_title: "7 Trik Maksimalkan Ruang Sempit - SJD Interior",
    seo_description: "Trik jitu mengoptimalkan ruang sempit di rumah atau apartemen Anda agar terasa lebih luas dan nyaman."
  },
  {
    title: "Biophilic Design: Membawa Alam ke Dalam Rumah",
    slug: "biophilic-design-alam-dalam-rumah",
    excerpt: "Pelajari konsep biophilic design dan bagaimana mengaplikasikannya untuk meningkatkan kesehatan dan well-being.",
    content: `# Biophilic Design: Membawa Alam ke Dalam Rumah

Biophilic design adalah pendekatan yang mengintegrasikan elemen alam ke dalam built environment.

## Apa itu Biophilic Design?
Konsep desain yang memanfaatkan koneksi manusia dengan alam untuk meningkatkan kesehatan mental dan fisik.

## Manfaat
- Mengurangi stress dan anxiety
- Meningkatkan produktivitas 15%
- Improve air quality
- Boost creativity dan mood

## Cara Implementasi

### 1. Tanaman Indoor
Mulai dengan easy-care plants seperti snake plant, pothos, atau monstera.

### 2. Natural Light
Maksimalkan cahaya alami dengan jendela besar atau skylight.

### 3. Natural Materials
Gunakan kayu, batu, bambu, rattan dalam furniture dan dekorasi.

### 4. Water Features
Indoor fountain atau aquarium kecil memberikan calming effect.

### 5. Nature-Inspired Colors
Earth tones: greens, browns, blues yang menenangkan.

### 6. Natural Patterns
Wallpaper atau textile dengan motif daun, bunga, atau organic shapes.

## Start Small
Tidak perlu transform seluruh rumah sekaligus - mulai dari satu ruangan atau corner.`,
    category: "inspiration",
    reading_time: 8,
    is_featured: true,
    order: 4,
    tags: ["biophilic", "tanaman", "kesehatan", "inspirasi"],
    seo_title: "Biophilic Design: Konsep Alam dalam Rumah - SJD",
    seo_description: "Panduan lengkap menerapkan biophilic design di rumah untuk meningkatkan kesehatan dan kesejahteraan keluarga."
  },
  {
    title: "Budget Interior: Renovasi Cantik dengan Budget 20 Juta",
    slug: "budget-interior-20-juta",
    excerpt: "Proof bahwa interior cantik tidak harus mahal. Simak strategi renovasi dengan budget 20 juta untuk kamar tidur + living room.",
    content: `# Budget Interior: Renovasi Cantik dengan Budget 20 Juta

Renovasi interior dengan budget terbatas? Totally possible! Ini breakdown lengkapnya.

## Budget Breakdown (Total: Rp 20.000.000)

### Kamar Tidur (Rp 10.000.000)
- Tempat tidur + Kasur: Rp 4.500.000
- Lemari pakaian: Rp 3.000.000
- Meja rias + Kursi: Rp 1.500.000
- Cat + Aksesoris: Rp 1.000.000

### Living Room (Rp 10.000.000)
- Sofa 3 seater: Rp 4.000.000
- Meja tamu + Side table: Rp 1.500.000
- Rak TV: Rp 2.000.000
- Karpet + Cushion + Dekorasi: Rp 1.500.000
- Cat + Lighting: Rp 1.000.000

## Money-Saving Tips

### 1. DIY Simple Tasks
Cat sendiri, pasang wallpaper sticker, rakit furniture.

### 2. Mix & Match
Combine new pieces dengan existing furniture yang di-repaint atau reupholster.

### 3. Shop Smart
Cari sale, beli online, atau second-hand berkualitas.

### 4. Focus on Impact
Investasi di statement pieces, save di items yang kurang visible.

### 5. Phased Approach
Tidak harus selesai sekaligus - prioritaskan yang paling urgent.

## Hasil Akhir
Dengan planning yang matang, Rp 20 juta bisa menghasilkan interior yang stunning dan fungsional!`,
    category: "tips",
    reading_time: 10,
    is_featured: false,
    order: 5,
    tags: ["budget", "renovasi", "tips", "hemat"],
    seo_title: "Renovasi Interior Budget 20 Juta - SJD Interior",
    seo_description: "Strategi dan breakdown lengkap renovasi interior rumah dengan budget 20 juta rupiah untuk kamar tidur dan living room."
  },
  {
    title: "Lighting Design 101: Panduan Lengkap Pencahayaan Rumah",
    slug: "lighting-design-panduan-lengkap",
    excerpt: "Dari ambient hingga task lighting, pelajari fundamental lighting design untuk menciptakan atmosphere perfect di rumah.",
    content: `# Lighting Design 101: Panduan Lengkap Pencahayaan Rumah

Good lighting bisa make or break interior design. Mari pelajari dasarnya!

## 3 Jenis Lighting

### 1. Ambient Lighting (General)
Pencahayaan utama ruangan - ceiling lights, recessed lights.
**Fungsi:** Visibility umum

### 2. Task Lighting
Focused lighting untuk aktivitas spesifik - desk lamp, under-cabinet lights.
**Fungsi:** Support produktivitas

### 3. Accent Lighting
Highlight elemen dekoratif - picture lights, uplights untuk tanaman.
**Fungsi:** Create visual interest

## Layering Strategy
Combine ketiga jenis lighting untuk hasil optimal!

## Color Temperature Guide

### Warm White (2700K-3000K)
- Ruang tamu, kamar tidur, dining
- Cozy dan relaxing atmosphere

### Neutral White (3500K-4100K)
- Kamar mandi, dapur
- Balance antara cozy dan bright

### Cool White (5000K-6500K)
- Home office, garage, workspace
- Energizing dan meningkatkan focus

## Tips Praktis

1. **Dimmer Switch**
   Flexibility untuk adjust brightness sesuai mood dan waktu

2. **Multiple Sources**
   Lebih baik 3-4 light sources kecil daripada 1 giant light

3. **Eye Level**
   Table lamps dan wall sconces di eye level create intimacy

4. **Natural Light First**
   Maksimalkan natural light, artificial lighting hanya supplement

## Common Mistakes

- Single overhead light (flat dan boring)
- Wrong color temperature (bisa bikin warna furniture terlihat aneh)
- Insufficient task lighting (eyestrain!)
- Ignoring dimmers (wasted opportunity!)

## Investment Priority
Mulai dari ruang yang paling sering dipakai - living room dan bedroom.`,
    category: "how-to",
    reading_time: 12,
    is_featured: false,
    order: 6,
    tags: ["lighting", "pencahayaan", "tips", "teknis"],
    seo_title: "Panduan Lighting Design untuk Rumah - SJD Interior",
    seo_description: "Pelajari fundamental lighting design dari ambient, task, hingga accent lighting untuk menciptakan atmosphere perfect di rumah."
  }
];

module.exports = {
  portfolioProjects,
  insightArticles
};
