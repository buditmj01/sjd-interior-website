/**
 * Seed Sample Data for Strapi CMS
 * Run this script to populate the database with sample projects and insights
 */

const sampleProjects = [
  {
    title: 'Modern Minimalist Apartment Jakarta',
    description: 'Transformasi apartemen 85m² menjadi hunian minimalis modern dengan sentuhan Jepang. Mengutamakan pencahayaan alami dan ruang terbuka.',
    content: `## Konsep Desain

Apartemen ini dirancang dengan konsep minimalis Jepang (Japandi) yang menggabungkan kesederhanaan Skandinavia dengan kehangatan estetika Jepang. Fokus utama adalah menciptakan ruang yang tenang, fungsional, dan penuh cahaya alami.

### Ruang Tamu
- Open plan living & dining
- Material kayu oak untuk kehangatan
- Pallet warna netral: putih, krem, abu-abu
- Large windows untuk maksimalkan pencahayaan

### Kamar Tidur
- Built-in wardrobe dengan pintu sliding
- Platform bed dengan storage tersembunyi
- Pencahayaan ambient yang lembut

### Dapur
- Kitchen set minimalis dengan top table marble
- Integrated appliances untuk tampilan bersih
- Backsplash subway tiles putih`,
    category: 'residential',
    client_name: 'Bapak Andri & Ibu Sarah',
    location: 'Jakarta Selatan',
    area_size: '85m²',
    completion_date: '2025-11-15',
    is_featured: true,
    order: 1,
  },
  {
    title: 'Cozy Scandinavian House Bandung',
    description: 'Rumah keluarga dengan nuansa Skandinavia yang hangat dan nyaman. Perpaduan furniture kayu natural dengan sentuhan warna pastel.',
    content: `## Filosofi Desain

Rumah ini mengadopsi prinsip hygge dari Skandinavia - menciptakan suasana hangat, nyaman, dan bahagia di dalam rumah. Setiap detail dirancang untuk kenyamanan keluarga muda dengan 2 anak.

### Living Room
- L-shaped sofa dengan fabric linen
- Coffee table kayu solid
- Floating shelves untuk display
- Area bermain anak yang terintegrasi

### Dining Area
- Meja makan kayu oak dengan 6 kursi
- Pendant lamp statement piece
- Built-in buffet storage

### Master Bedroom
- King bed dengan headboard upholstered
- Walk-in closet dengan cermin
- En-suite bathroom dengan bathtub

### Kids Room
- Bunk bed custom dengan play area di bawah
- Storage yang mudah dijangkau anak
- Wall mural bertema hutan`,
    category: 'residential',
    client_name: 'Keluarga Sutanto',
    location: 'Bandung',
    area_size: '120m²',
    completion_date: '2025-10-20',
    is_featured: true,
    order: 2,
  },
  {
    title: 'Industrial Loft Office Surabaya',
    description: 'Kantor startup tech dengan konsep industrial loft. Exposed brick, metal fixtures, dan open workspace yang kolaboratif.',
    content: `## Konsep Ruang Kerja Modern

Kantor ini dirancang untuk startup teknologi dengan 25 karyawan. Mengadopsi konsep open workspace yang mendorong kolaborasi, sambil tetap menyediakan ruang privat untuk meeting dan fokus kerja.

### Open Workspace
- Hot desk system dengan standing desk
- Exposed ceiling dengan ducting terlihat
- Industrial pendant lights
- Mix & match furniture untuk fleksibilitas

### Meeting Rooms
- 3 meeting rooms dengan glass partition
- Whiteboard wall untuk brainstorming
- Integrated AV system
- Soundproof untuk privacy

### Breakout Area
- Pantry dengan coffee bar
- Lounge area dengan bean bags
- Ping pong table untuk break time
- Indoor plants untuk kesegaran

### Private Booths
- Phone booth untuk video call
- Focus pod untuk deep work
- Acoustic panels untuk sound dampening`,
    category: 'office',
    client_name: 'TechStart Indonesia',
    location: 'Surabaya',
    area_size: '250m²',
    completion_date: '2025-09-10',
    is_featured: true,
    order: 3,
  },
  {
    title: 'Luxury Penthouse Residence',
    description: 'Penthouse mewah dengan view kota. Material premium, smart home integration, dan desain kontemporer yang elegan.',
    content: `## Kemewahan Kontemporer

Penthouse 3 lantai ini adalah puncak dari kemewahan urban living. Setiap detail dipilih dengan cermat untuk menciptakan pengalaman hidup yang eksklusif dan nyaman.

### Living & Dining
- Double height ceiling dengan chandelier custom
- Marble flooring dengan motif geometris
- Floor-to-ceiling windows dengan city view 360°
- Built-in entertainment system

### Master Suite
- King bed dengan headboard leather
- Walk-in closet 2 section (his & hers)
- Spa-like bathroom dengan rain shower & jacuzzi
- Private balcony dengan seating area

### Kitchen
- Chef's kitchen dengan island
- Top-of-the-line appliances (Miele, Gaggenau)
- Wine cellar dengan temperature control
- Butler's pantry

### Rooftop Terrace
- Infinity pool dengan glass edge
- Outdoor kitchen & BBQ area
- Lounge seating dengan fire pit
- Green wall untuk privacy`,
    category: 'residential',
    client_name: 'Confidential Client',
    location: 'Jakarta Pusat',
    area_size: '450m²',
    completion_date: '2025-12-01',
    is_featured: true,
    order: 4,
  },
  {
    title: 'Boutique Hotel Lobby Bali',
    description: 'Lobby hotel butik dengan sentuhan Bali modern. Natural materials, tropical vibes, dan luxury yang understated.',
    content: `## Hospitality dengan Sentuhan Lokal

Lobby hotel ini menggabungkan kemewahan dengan kearifan lokal Bali. Material natural seperti bambu, batu alam, dan kayu jati menciptakan ambiance yang warm yet luxurious.

### Reception Area
- Custom reception desk dari kayu jati reclaimed
- Stone wall feature dengan water element
- Balinese carving details
- Soft lighting dengan warm tone

### Lounge Area
- Mix seating: sofa, armchair, daybed
- Rattan furniture dengan cushion luxury
- Indoor plants tropical
- Open-air concept dengan retractable roof

### Design Elements
- Terrazzo flooring dengan pattern traditional
- Woven pendant lights handmade
- Art pieces dari local artisan
- Natural ventilation maksimal`,
    category: 'hospitality',
    client_name: 'Bali Boutique Hotels',
    location: 'Ubud, Bali',
    area_size: '180m²',
    completion_date: '2025-08-15',
    is_featured: false,
    order: 5,
  },
  {
    title: 'Contemporary Cafe & Restaurant',
    description: 'Cafe instagrammable dengan interior kontemporer. Perpaduan material industrial dan elemen nature.',
    content: `## Food & Ambiance

Cafe ini dirancang untuk generasi milenial dan Gen Z yang mencari tempat hangout dengan estetika Instagram-worthy. Kombinasi material industrial dengan sentuhan greenery menciptakan suasana yang fresh dan energik.

### Main Dining
- Mix seating untuk berbagai group size
- Marble top tables dengan metal base
- Velvet chairs dengan warna earth tone
- Green wall sebagai photo backdrop

### Bar Counter
- Exposed concrete dengan brass accent
- Pendant lights statement
- Open kitchen concept
- Display area untuk pastry

### Outdoor Area
- Garden seating dengan pergola
- Hanging plants & fairy lights
- Wooden furniture weather-resistant
- Heater untuk malam hari`,
    category: 'commercial',
    client_name: 'Kopi Kawan',
    location: 'Yogyakarta',
    area_size: '150m²',
    completion_date: '2025-07-01',
    is_featured: false,
    order: 6,
  },
];

const sampleInsights = [
  {
    title: '10 Tips Memaksimalkan Ruang Kecil ala Apartemen Jepang',
    excerpt: 'Pelajari rahasia orang Jepang dalam menciptakan ruang yang fungsional dan nyaman di apartemen mungil. Tips praktis yang bisa langsung diterapkan.',
    content: `# 10 Tips Memaksimalkan Ruang Kecil

Tinggal di apartemen kecil bukan berarti harus berkompromi dengan kenyamanan. Orang Jepang sudah lama menguasai seni hidup di ruang terbatas dengan tetap stylish dan fungsional.

## 1. Furniture Multifungsi

Investasi terbaik untuk ruang kecil adalah furniture yang punya lebih dari satu fungsi:
- Sofa bed untuk ruang tamu yang bisa jadi guest room
- Coffee table dengan storage tersembunyi
- Ottoman yang bisa jadi extra seating + storage

## 2. Vertical Storage

Manfaatkan tinggi ruangan, bukan hanya luas lantai:
- Floating shelves sampai atas
- Tall cabinets yang slim tapi tinggi
- Wall-mounted organizers

## 3. Warna Terang & Cermin

Trick visual untuk buat ruang terasa lebih luas:
- Cat dinding putih atau krem
- Cermin besar untuk reflect cahaya
- Avoid dark colors yang bikin ruang terasa sempit

## 4. Sliding Doors

Ganti swing doors dengan sliding:
- Hemat space yang biasanya untuk door swing
- Bisa pakai barn door untuk aesthetic
- Pocket door untuk totally hidden

## 5. Built-in Storage

Maksimalkan setiap sudut:
- Under-bed storage dengan drawer
- Built-in wardrobe floor-to-ceiling
- Corner shelves untuk dead space

## 6. Declutter Rutin

Less is more:
- Marie Kondo method untuk sorting barang
- Storage boxes yang rapi & labeled
- Rotate seasonal items

## 7. Lighting Berlapis

Good lighting bikin ruang terasa lebih besar:
- Ambient, task, accent lighting
- Avoid single ceiling light
- Use table & floor lamps

## 8. Transparent & Light Furniture

Furniture yang visual-nya ringan:
- Glass coffee table
- Acrylic chairs
- Metal frame dengan thin profile

## 9. Modular System

Furniture yang bisa diatur ulang:
- Modular sofa yang bisa dipindah-pindah
- Stackable storage
- Flexible shelving system

## 10. Outdoor Extension

Kalau punya balkon, manfaatkan maksimal:
- Folding furniture untuk balkon
- Vertical garden
- Extra seating area

---

**Kesimpulan**: Ruang kecil bisa tetap nyaman dan fungsional dengan perencanaan yang smart. Focus pada multifungsi, storage vertical, dan visual tricks.`,
    category: 'tips',
    author: 'Sarah Wijaya - Interior Designer',
    reading_time: 8,
    is_featured: true,
    order: 1,
    tags: JSON.stringify(['apartment', 'small space', 'minimalist', 'storage', 'japanese design']),
  },
  {
    title: 'Tren Interior 2026: Sustainable & Mindful Living',
    excerpt: 'Dari biophilic design hingga material ramah lingkungan, ini dia tren interior yang akan mendominasi tahun 2026. Eco-friendly is the new luxury.',
    content: `# Tren Interior 2026

Industri interior design semakin sadar akan sustainability. Tahun 2026 menandai shift besar dari konsumsi ke consciousness - mindful living bukan hanya trend, tapi lifestyle.

## 1. Biophilic Design

Manusia butuh koneksi dengan alam:
- Indoor plants everywhere
- Natural light maksimal
- Material alami: kayu, batu, bambu
- Water elements (fountain, aquarium)
- Living walls & vertical gardens

**Why?**: Research shows biophilic design reduce stress, increase productivity, improve air quality.

## 2. Upcycled & Reclaimed Materials

Furniture vintage dengan cerita:
- Kayu reclaimed jadi statement piece
- Vintage furniture restoration
- DIY projects dari material bekas
- Thrift shopping untuk unique finds

**Benefit**: Reduce waste, unique pieces, budget-friendly.

## 3. Earth Tone Palette

Warna yang grounding & calming:
- Terracotta, clay, ochre
- Sage green, olive
- Warm beige, taupe
- Rust, burnt orange

**Psychology**: Earth tones bikin ruang terasa warm, cozy, connected to nature.

## 4. Artisan & Handmade

Support local craftsmen:
- Handwoven textiles
- Pottery & ceramics
- Local artisan furniture
- One-of-a-kind art pieces

## 5. Flexible Spaces

Post-pandemic, home jadi multifunctional:
- Home office yang bisa transform
- Gym corner yang compact
- Meditation/yoga space
- Hobby area

## 6. Smart Home (But Invisible)

Technology yang integrated, not intrusive:
- Smart lighting & climate control
- Voice control
- Hidden charging stations
- Wireless everything

## 7. Maximalism dengan Intention

Bukan minimal, tapi curated:
- Bold patterns & colors
- Mix textures
- Layered looks
- Personal collections display

**Key**: Every piece punya purpose & meaning.

## 8. Natural & Organic Shapes

Goodbye sharp corners:
- Curved sofas & chairs
- Round tables
- Organic shapes untuk art
- Arched doorways

## 9. Wellness-Focused Design

Home as sanctuary:
- Air purifier integrated
- Water filtration system
- Natural ventilation
- Non-toxic materials

## 10. Community & Shared Spaces

Design yang encourage connection:
- Open kitchen untuk gathering
- Communal dining table
- Cozy reading nooks
- Outdoor seating areas

---

**Takeaway**: 2026 is about intentional, sustainable, and wellness-focused design. It's not about following trends blindly, but choosing what aligns with your values.`,
    category: 'trends',
    author: 'Michael Chen - Design Consultant',
    reading_time: 10,
    is_featured: true,
    order: 2,
    tags: JSON.stringify(['trends 2026', 'sustainable', 'biophilic', 'eco-friendly', 'wellness']),
  },
  {
    title: 'Budget Interior: Cantik Tidak Harus Mahal',
    excerpt: 'Renovasi rumah dengan budget terbatas? Bisa banget! Ini dia strategi cerdas untuk hasil maksimal dengan dana minimal. DIY-friendly tips inside.',
    content: `# Interior Cantik dengan Budget Terbatas

Siapa bilang interior bagus harus mahal? Dengan strategi yang tepat, kamu bisa punya rumah impian tanpa menguras tabungan. Here's how!

## Prioritaskan Budget

Bagi budget kamu jadi:
1. **Must-Have (50%)**: Furniture essential, cat, flooring
2. **Nice-to-Have (30%)**: Dekorasi, lighting, textile
3. **Wishlist (20%)**: Statement pieces, art

## Paint is Your Best Friend

ROI tertinggi untuk budget minimal:
- **Accent wall** untuk focal point (budget: 500k-1jt)
- **Color block** untuk statement (budget: 300k-800k)
- **DIY techniques**: sponge, ombre, stripes

**Pro tip**: Beli cat kualitas bagus untuk result tahan lama. Jangan pelit di sini.

## Thrift & Upcycle

Furniture second bisa jadi gold:
- **Marketplace**: Facebook, OLX, Instagram
- **Garage sales**: Sering ada barang bagus murah
- **Restoration**: Sand, paint, reupholster

**Project Idea**:
- Kursi kayu second → sand + cat → 200k jadi cantik
- Meja tua → paint + marmer contact paper → upgrade instant

## IKEA Hacks

Furniture affordable yang bisa di-customize:
- **KALLAX**: Tambah pintu/drawer/cushion
- **LACK**: Stack untuk side table unik
- **RAST**: Paint + knobs baru = expensive look

Budget: 500k-2jt → hasil: looks 5-10jt

## DIY Decor

Kreativitas = budget saver:
- **Frame poster** instead of art (50k vs 2jt+)
- **Tanaman** dalam pot DIY (100k untuk 5 plants)
- **Fairy lights** untuk ambiance (150k)
- **Cushion covers** untuk refresh (100k each)

## Lighting Upgrade

Ganti lampu = transform instant:
- **Pendant lights**: Cari di marketplace 200k-500k
- **Floor lamp**: IKEA starting 400k
- **LED strips**: Ambient lighting cuma 150k
- **Smart bulbs**: Starting 100k each

## Textile Refresh

Cara tercepat ubah vibe ruangan:
- **Rug**: Starting 300k untuk size kecil
- **Curtains**: DIY dari kain (500k untuk satu ruangan)
- **Bedding set**: Mix & match starting 400k
- **Throw pillows**: 50k-150k each

## Storage Solutions

Organize = look expensive:
- **Baskets** dari rotan/seagrass: 100k-300k
- **Floating shelves**: DIY 200k for 3 shelves
- **Pegboard**: Organizer serbaguna 150k
- **Ladder shelf**: IKEA hack 400k

## Focus on Details

Small touches, big impact:
- **Door knobs** upgrade: 50k each
- **Switch plates** baru: 20k each
- **Plants** everywhere: 50k-200k per pot
- **Books** styling di shelves: thrift 20k each

## Rental-Friendly Ideas

Kalau ngontrak, fokus di:
- **Removable wallpaper**: 200k per roll
- **Peel & stick tiles**: 300k untuk area kecil
- **Command hooks**: 50k untuk hanging decor
- **Furniture** instead of built-in

---

## Sample Budget Breakdown (10jt untuk 1 kamar)

- Cat & supplies: 1.5jt
- Bed frame second hand: 2jt
- Mattress: 2.5jt
- Curtains DIY: 500k
- Lighting: 800k
- Storage (shelves/basket): 700k
- Decor (plants, frame, cushions): 1jt
- Sisanya: buffer

**Result**: Kamar yang cozy, stylish, Instagram-worthy!

---

**Pro Tips Final**:
1. **Pelan-pelan**: Gak harus selesai sekaligus
2. **Mix high-low**: Invest di pieces penting, save di decor
3. **DIY what you can**: Paint, install, arrange sendiri
4. **Quality over quantity**: Better few good pieces than many cheap ones

**Remember**: Creativity > Money. Rumah yang punya character lebih penting dari yang mahal tapi generic!`,
    category: 'tips',
    author: 'Dina Putri - Budget Interior Specialist',
    reading_time: 12,
    is_featured: true,
    order: 3,
    tags: JSON.stringify(['budget', 'diy', 'tips', 'affordable', 'ikea hack']),
  },
  {
    title: 'Cara Memilih Warna Cat yang Tepat untuk Setiap Ruangan',
    excerpt: 'Bingung pilih warna cat? Color psychology bisa bantu! Pelajari warna mana yang cocok untuk bedroom, living room, hingga home office.',
    content: `# Guide Memilih Warna Cat

Warna punya pengaruh besar ke mood dan energi ruangan. Ini dia panduan lengkap pilih warna berdasarkan fungsi dan psychology!

## Color Psychology Basics

### Warm Colors (Merah, Orange, Kuning)
- **Effect**: Energizing, stimulating, cozy
- **Best for**: Social areas, dining, kitchen
- **Avoid**: Bedroom, study room

### Cool Colors (Biru, Hijau, Ungu)
- **Effect**: Calming, relaxing, focused
- **Best for**: Bedroom, bathroom, office
- **Avoid**: Dark rooms without natural light

### Neutral (Putih, Krem, Abu, Coklat)
- **Effect**: Versatile, timeless, spacious
- **Best for**: Anywhere! Especially small spaces
- **Tip**: Layer dengan texture untuk avoid boring

## Rekomendasi per Ruangan

### Living Room
**Goal**: Welcoming, social, comfortable

**Top Picks**:
1. **Warm Beige/Greige**: Versatile, cozy (Dulux Natural Hessian)
2. **Soft Gray**: Modern, clean (Dulux Timeless Grey)
3. **Sage Green**: Trendy, calming (Dulux Tranquil Dawn)
4. **Warm White**: Bright, spacious (Dulux Lexicon)

**Accent Wall**: Deep teal, terracotta, navy

### Bedroom
**Goal**: Relaxing, sleep-inducing, peaceful

**Top Picks**:
1. **Soft Blue**: Sleep quality booster (Dulux Denim Drift)
2. **Lavender**: Calming, romantic (Dulux Purple Sage)
3. **Warm Gray**: Cozy, versatile (Dulux Chic Shadow)
4. **Blush Pink**: Soft, feminine (Dulux First Light)

**Avoid**: Bright red, vibrant yellow (too stimulating)

### Kitchen
**Goal**: Clean, energizing, appetizing

**Top Picks**:
1. **White**: Classic, bright (Dulux Brilliant White)
2. **Soft Yellow**: Cheerful, warm (Dulux Lemon Pie)
3. **Light Green**: Fresh, natural (Dulux Polished Pebble)
4. **Warm Cream**: Cozy, traditional (Dulux Ivory Lace)

**Accent**: Backsplash tile atau upper cabinet warna kontras

### Bathroom
**Goal**: Clean, spa-like, refreshing

**Top Picks**:
1. **Soft Blue**: Spa vibes (Dulux Borrowed Light)
2. **White**: Classic, clean (Dulux White Mist)
3. **Mint Green**: Fresh, calming (Dulux Eau De Nil)
4. **Light Gray**: Modern, elegant (Dulux Perfectly Taupe)

**Tip**: Kombinasi sama white untuk clean look

### Home Office
**Goal**: Focused, productive, professional

**Top Picks**:
1. **Muted Blue**: Concentration booster (Dulux Sapphire Salute)
2. **Sage Green**: Calm focus (Dulux Vert De Terre)
3. **Light Gray**: Professional, modern (Dulux Warm Silver)
4. **Soft Yellow**: Creative energy (Dulux Pineapple Crush)

**Accent Wall**: Chalkboard paint atau magnetic paint

### Kids Room
**Goal**: Fun, stimulating (but not too much!), grow-friendly

**Top Picks**:
1. **Soft Blue/Pink**: Gender-neutral friendly
2. **Mint Green**: Refreshing, unisex
3. **Warm Gray**: Versatile, mature-proof
4. **Soft Yellow**: Cheerful, bright

**Accent**: One wall bright color, rest neutral (biar ga overwhelm)

## Tips Praktis

### 1. Test Dulu!
- Beli sample pot (biasanya 100ml cukup)
- Cat di 2x2 feet area
- Observe di different lighting: pagi, siang, malam
- Live with it 1-2 minggu

### 2. Consider Natural Light
- **Banyak cahaya natural**: Bold colors OK
- **Minim cahaya**: Stick to light, warm colors
- **Arah utara**: Warm tones untuk balance cool light
- **Arah selatan**: Cool tones untuk balance warm light

### 3. Flow Antar Ruangan
- Pakai color palette yang cohesive
- Transisi gradual dari ruang ke ruang
- Neutral sebagai connector

### 4. 60-30-10 Rule
- 60%: Main wall color
- 30%: Secondary (furniture/curtains)
- 10%: Accent (decor/accessories)

### 5. Ceiling & Trim
- **White ceiling**: Make room taller
- **Dark ceiling**: Cozy, intimate
- **Trim lighter**: Clean, classic look

## Common Mistakes

❌ **Ikut trend membabi buta**
✅ Choose timeless yang kamu suka

❌ **Takut warna**
✅ Start small: accent wall dulu

❌ **Match semua sama**
✅ Layer different shades

❌ **Cat di hari cerah aja**
✅ Test di berbagai lighting

---

**Bottom Line**: Gak ada "perfect color" - yang ada "perfect color for YOU". Consider your lifestyle, taste, dan feeling yang mau diciptakan. Color can make or break a space!`,
    category: 'how-to',
    author: 'Rina Kusuma - Color Consultant',
    reading_time: 9,
    is_featured: false,
    order: 4,
    tags: JSON.stringify(['color', 'paint', 'psychology', 'how-to', 'guide']),
  },
];

module.exports = {
  sampleProjects,
  sampleInsights,
};
