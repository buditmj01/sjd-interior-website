-- Quick seed data for SJD Interior
-- Insert sample projects

INSERT INTO projects (title, slug, description, content, category, client_name, location, area_size, completion_date, is_featured, "order", created_at, updated_at, published_at) VALUES
('Modern Minimalist Apartment Jakarta', 'modern-minimalist-apartment-jakarta', 'Transformasi apartemen 85m² menjadi hunian minimalis modern dengan sentuhan Jepang. Mengutamakan pencahayaan alami dan ruang terbuka.', '## Konsep Desain

Apartemen ini dirancang dengan konsep minimalis Jepang (Japandi) yang menggabungkan kesederhanaan Skandinavia dengan kehangatan estetika Jepang. Fokus utama adalah menciptakan ruang yang tenang, fungsional, dan penuh cahaya alami.

### Ruang Tamu
- Open plan living & dining
- Material kayu oak untuk kehangatan
- Pallet warna netral: putih, krem, abu-abu
- Large windows untuk maksimalkan pencahayaan

### Kapur Tidur
- Built-in wardrobe dengan pintu sliding
- Platform bed dengan storage tersembunyi
- Pencahayaan ambient yang lembut

### Dapur
- Kitchen set minimalis dengan top table marble
- Integrated appliances untuk tampilan bersih
- Backsplash subway tiles putih', 'residential', 'Bapak Andri & Ibu Sarah', 'Jakarta Selatan', '85m²', '2025-11-15', 1, 1, datetime('now'), datetime('now'), datetime('now')),

('Cozy Scandinavian House Bandung', 'cozy-scandinavian-house-bandung', 'Rumah keluarga dengan nuansa Skandinavia yang hangat dan nyaman. Perpaduan furniture kayu natural dengan sentuhan warna pastel.', '## Filosofi Desain

Rumah ini mengadopsi prinsip hygge dari Skandinavia - menciptakan suasana hangat, nyaman, dan bahagia di dalam rumah.

### Living Room
- L-shaped sofa dengan fabric linen
- Coffee table kayu solid
- Floating shelves untuk display

### Dining Area
- Meja makan kayu oak dengan 6 kursi
- Pendant lamp statement piece
- Built-in buffet storage', 'residential', 'Keluarga Sutanto', 'Bandung', '120m²', '2025-10-20', 1, 2, datetime('now'), datetime('now'), datetime('now')),

('Industrial Loft Office Surabaya', 'industrial-loft-office-surabaya', 'Kantor startup tech dengan konsep industrial loft. Exposed brick, metal fixtures, dan open workspace yang kolaboratif.', '## Konsep Ruang Kerja Modern

Kantor ini dirancang untuk startup teknologi dengan 25 karyawan. Mengadopsi konsep open workspace yang mendorong kolaborasi.

### Open Workspace
- Hot desk system dengan standing desk
- Exposed ceiling dengan ducting terlihat
- Industrial pendant lights

### Meeting Rooms
- 3 meeting rooms dengan glass partition
- Whiteboard wall untuk brainstorming
- Integrated AV system', 'office', 'TechStart Indonesia', 'Surabaya', '250m²', '2025-09-10', 1, 3, datetime('now'), datetime('now'), datetime('now'));

-- Insert sample insights

INSERT INTO insights (title, slug, excerpt, content, category, author, reading_time, is_featured, "order", tags, created_at, updated_at, published_at) VALUES
('10 Tips Memaksimalkan Ruang Kecil ala Apartemen Jepang', '10-tips-memaksimalkan-ruang-kecil', 'Pelajari rahasia orang Jepang dalam menciptakan ruang yang fungsional dan nyaman di apartemen mungil. Tips praktis yang bisa langsung diterapkan.', '# 10 Tips Memaksimalkan Ruang Kecil

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
- Avoid dark colors yang bikin ruang terasa sempit', 'tips', 'Sarah Wijaya - Interior Designer', 8, 1, 1, '["apartment", "small space", "minimalist", "storage"]', datetime('now'), datetime('now'), datetime('now')),

('Tren Interior 2026: Sustainable & Mindful Living', 'tren-interior-2026', 'Dari biophilic design hingga material ramah lingkungan, ini dia tren interior yang akan mendominasi tahun 2026.', '# Tren Interior 2026

Industri interior design semakin sadar akan sustainability. Tahun 2026 menandai shift besar dari konsumsi ke consciousness.

## 1. Biophilic Design

Manusia butuh koneksi dengan alam:
- Indoor plants everywhere
- Natural light maksimal
- Material alami: kayu, batu, bambu
- Living walls & vertical gardens

## 2. Upcycled & Reclaimed Materials

Furniture vintage dengan cerita:
- Kayu reclaimed jadi statement piece
- Vintage furniture restoration
- DIY projects dari material bekas

## 3. Earth Tone Palette

Warna yang grounding & calming:
- Terracotta, clay, ochre
- Sage green, olive
- Warm beige, taupe', 'trends', 'Michael Chen - Design Consultant', 10, 1, 2, '["trends 2026", "sustainable", "biophilic", "eco-friendly"]', datetime('now'), datetime('now'), datetime('now')),

('Budget Interior: Cantik Tidak Harus Mahal', 'budget-interior-cantik', 'Renovasi rumah dengan budget terbatas? Bisa banget! Ini dia strategi cerdas untuk hasil maksimal dengan dana minimal.', '# Interior Cantik dengan Budget Terbatas

Siapa bilang interior bagus harus mahal? Dengan strategi yang tepat, kamu bisa punya rumah impian tanpa menguras tabungan.

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

## IKEA Hacks

Furniture affordable yang bisa di-customize:
- **KALLAX**: Tambah pintu/drawer/cushion
- **LACK**: Stack untuk side table unik
- **RAST**: Paint + knobs baru = expensive look', 'tips', 'Dina Putri - Budget Interior Specialist', 12, 1, 3, '["budget", "diy", "tips", "affordable"]', datetime('now'), datetime('now'), datetime('now'));
