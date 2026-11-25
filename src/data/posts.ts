import { BlogPost } from '../types';

/**
 * Blog content. Written in Markdown (see src/utils/Markdown.tsx for the
 * supported syntax: ## headings, **bold**, `code`, lists, quotes, code fences).
 *
 * To add a post: append an object here with a unique `id`, an ISO `date`,
 * and it will automatically appear on the Blog page, the Home "Latest Posts"
 * section, and get its own route at #/blog/<id>.
 */
export const POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Perjalanan Saya di Dunia AI & Prompt Engineering',
    description:
      'Bagaimana saya mulai tertarik dengan AI dan bagaimana prompt engineering mengubah cara saya belajar dan bekerja.',
    date: '2026-11-18',
    readTime: '5 min read',
    tags: ['AI', 'Prompt Engineering'],
    content: `Awal mula perkenalan saya dengan AI dimulai saat semester 3, ketika pertama kali mencoba ChatGPT. Dari situ, saya menyadari bahwa kemampuan berkomunikasi dengan AI — yang dikenal sebagai Prompt Engineering — adalah skill yang sangat powerful.

## Apa itu Prompt Engineering?

Prompt Engineering adalah seni merancang instruksi agar model AI menghasilkan output yang kita inginkan. Bukan sekadar "tanya jawab", tapi memberi konteks, batasan, dan format yang jelas.

Beberapa prinsip yang paling saya pakai:

- **Berikan konteks** — jelaskan latar belakang dan tujuan sebelum bertanya.
- **Minta format spesifik** — "jawab dalam tabel", "ringkas dalam 3 poin".
- **Contohkan** — teknik few-shot sering kali lebih efektif daripada penjelasan panjang.
- **Iterasi** — prompt pertama jarang sempurna; perbaiki berdasarkan output.

## Eksperimen dengan berbagai model

Saya mulai bereksperimen dengan berbagai AI model, mulai dari GPT, Gemini, hingga Claude. Setiap model punya keunikan tersendiri dalam memahami konteks dan menghasilkan output.

> Tips: bandingkan output yang sama di beberapa model sebelum memutuskan workflow. Perbedaannya sering kali mengejutkan.

## AI sebagai partner coding

Yang paling menarik adalah ketika saya mulai menggunakan AI untuk membantu proses development. Dari menulis boilerplate code, debugging, hingga brainstorming arsitektur sistem — AI menjadi partner coding yang sangat membantu.

\`\`\`text
Workflow saya:
1. Jelaskan masalah + konteks proyek ke AI
2. Minta 2–3 pendekatan solusi
3. Pilih paling masuk akal, implementasi sendiri
4. Minta review + penjelasan trade-off
\`\`\`

Ke depannya, saya berencana untuk lebih mendalami bidang AI, khususnya dalam penerapan machine learning untuk solusi real-world problems.`,
  },
  {
    id: 2,
    title: 'Membangun Portfolio Website dengan React & TypeScript',
    description:
      'Panduan lengkap membuat website portfolio modern menggunakan React, TypeScript, Vite, dan TailwindCSS.',
    date: '2026-10-02',
    readTime: '8 min read',
    tags: ['Web', 'React', 'Tutorial'],
    content: `Portfolio website adalah salah satu aset paling penting bagi seorang developer. Ini adalah tempat di mana kamu bisa menunjukkan skill, project, dan personality kamu kepada dunia.

## Stack yang saya gunakan

- **React 18 dengan TypeScript** untuk type safety
- **Vite sebagai build tool** yang super cepat
- **TailwindCSS untuk styling** yang konsisten
- **React Router untuk navigasi** SPA
- **GitHub Pages untuk hosting** gratis

## Kenapa Vite, bukan Create React App?

Create React App sudah tidak lagi direkomendasikan untuk proyek baru. Vite jauh lebih cepat karena:

1. Dev server start dalam hitungan milidetik (esbuild, bukan webpack)
2. Hot Module Replacement yang benar-benar instan
3. Build produksi yang ringan dan out-of-the-box

\`\`\`bash
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio && npm install && npm run dev
\`\`\`

## Tips membuat portfolio yang standout

- **Gunakan dark mode** — menunjukkan perhatian terhadap UX
- **Tampilkan project nyata**, bukan template
- **Tulis bio yang authentic** dan personal
- **Pastikan responsive** di semua device
- **Tambahkan animasi subtle** untuk kesan premium — tapi jangan berlebihan

## Satu hal yang sering dilewatkan

SEO dan performa. Setiap halaman harus punya \`document.title\`, meta description, dan gambar yang dioptimalkan. Portfolio yang bagus percuma kalau tidak ada yang menemukannya di Google.

Portofolio ini sendiri dibangun dengan prinsip-prinsip di atas — source code-nya terbuka di GitHub kalau ingin referensi.`,
  },
  {
    id: 3,
    title: 'Data Science dengan Python untuk Pemula',
    description:
      'Pengalaman saya belajar data science menggunakan Python, pandas, dan scikit-learn untuk analisis clustering.',
    date: '2026-08-14',
    readTime: '6 min read',
    tags: ['Data Science', 'Python'],
    content: `Salah satu mata kuliah yang paling berkesan bagi saya adalah IPSD (Pengantar Sains Data), di mana saya belajar mengolah data dengan Python.

## Tools utama yang saya gunakan

- **Python** sebagai bahasa utama
- **Pandas** untuk manipulasi data
- **Scikit-learn** untuk algoritma machine learning
- **Matplotlib** untuk visualisasi

## Alur kerja data science

Pengalaman saya, alur kerja yang benar selalu konsisten:

1. **Collect** — kumpulkan data dari CSV, API, atau database
2. **Clean** — tangani missing value, duplikat, dan outlier
3. **Explore** — statistik deskriptif + visualisasi
4. **Model** — pilih algoritma yang sesuai masalah
5. **Communicate** — sampaikan insight, bukan sekadar angka

## Proyek K-Means Clustering

Project yang paling menarik adalah implementasi K-Means Clustering untuk mengelompokkan data.

\`\`\`python
from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(scaled_data)
\`\`\`

Yang paling saya pelajari: **menentukan jumlah K itu bukan tebakan**. Metode Elbow dan Silhouette Score membantu membuat keputusan berbasis bukti, bukan feeling.

## Pelajaran terpenting

Data cleaning memakan 80% waktu, tapi itu adalah fondasi dari analisis yang akurat. Model canggih dengan data kotor akan menghasilkan sampah bermutu tinggi — tetap sampah.

> "Better data beats fancy algorithms." — principle yang berlaku di hampir setiap proyek data.`,
  },
  {
    id: 4,
    title: 'Dasar Git yang Wajib Dikuasai Mahasiswa Informatika',
    description:
      'Branch, merge, rebase, dan pull request — alur kerja Git yang saya pakai setiap hari di proyek kuliah dan pribadi.',
    date: '2026-06-20',
    readTime: '7 min read',
    tags: ['Git', 'Developer Tools'],
    content: `Git adalah alat yang paling sering dipakai tapi paling jarang dipelajari dengan benar oleh mahasiswa. Banyak yang cuma hafal \`git add\` dan \`git commit\` tanpa paham apa yang sebenarnya terjadi.

## Mental model yang benar

Git punya tiga area: **working directory**, **staging area**, dan **repository**.

\`\`\`bash
git status      # lihat apa yang berubah
git add .       # pindahkan ke staging
git commit -m "pesan"   # simpan ke riwayat
\`\`\`

Kalau kamu paham tiga area ini, 80% perintah Git jadi masuk akal.

## Branch: bukan untuk hal besar saja

Saya dulu berpikir branch hanya untuk fitur besar. Ternyata, branch kecil justru lebih baik:

- Perbaikan typo → \`fix/typo-readme\`
- Tambah fitur → \`feat/pagination\`
- Refactor → \`refactor/hooks\`

Branch yang kecil mudah di-review, mudah di-drop kalau gagal, dan jarang konflik.

## Merge vs Rebase

- **Merge** menjaga sejarah asli, cocok untuk branch shared
- **Rebase** membuat sejarah linear, cocok untuk branch pribadi sebelum di-push

Aturan praktis saya: *rebase local branch sendiri, jangan pernah rebase branch yang sudah dibagikan orang lain.*

## Pull request yang enak direview

1. Commit kecil dengan pesan yang jelas
2. Deskripsi PR menjelaskan **kenapa**, bukan cuma **apa**
3. Sertakan cara test/manual QA
4. Jangan campur refactor + fitur baru dalam satu PR

Workflow ini saya pakai di proyek kuliah dan open source, dan feedback dari reviewer jauh lebih positif setelah saya menerapkannya.`,
  },
  {
    id: 5,
    title: 'Mengenal REST API: Konsep yang Sering Salah Paham',
    description:
      'Apa itu REST, kenapa method HTTP penting, dan bagaimana saya membangun API sederhana yang rapi.',
    date: '2026-04-11',
    readTime: '6 min read',
    tags: ['Backend', 'API'],
    content: `Hampir setiap proyek web saya akhirnya butuh API. Tapi istilah "REST" sering dipakai tanpa benar-benar dipahami. Mari kita uraikan.

## REST itu bukan framework

REST (Representational State Transfer) adalah **konvensi desain**, bukan library. Endpoint REST yang baik itu:

- Menggunakan noun, bukan verb: \`/articles\`, bukan \`/getArticles\`
- Stateless — setiap request mengandung info yang cukup
- Menggunakan method HTTP sesuai makna

## Method HTTP dan maknanya

| Method  | Arti            | Idempoten? |
|---------|-----------------|------------|
| GET     | Baca data       | Ya         |
| POST    | Buat baru       | Tidak      |
| PUT     | Ganti total     | Ya         |
| PATCH   | Ganti sebagian  | Tidak      |
| DELETE  | Hapus           | Ya         |

Idempoten artinya: request yang diulang menghasilkan efek yang sama. Ini penting untuk retry logic.

## Contoh endpoint yang baik

\`\`\`text
GET    /api/articles         → daftar artikel
GET    /api/articles/42      → satu artikel
POST   /api/articles         → buat artikel
DELETE /api/articles/42      → hapus artikel
\`\`\`

## Error handling yang manusiawi

Jangan pernah balas semua error dengan \`500 Internal Server Error\`. Bedakan:

- **400** — request salah (validasi gagal)
- **401** — belum login
- **403** — sudah login tapi tidak boleh
- **404** — data tidak ada
- **429** — terlalu banyak request (rate limit)

Saya belajar ini saat membangun integrasi GitHub API di portfolio ini — GitHub sendiri sangat disiplin memakai status code, dan klien jadi jauh lebih mudah ditulis kalau server-nya disiplin.`,
  },
  {
    id: 6,
    title: 'Belajar Konsisten di Sela Kesibukan Kuliah',
    description:
      'Sistem belajar yang akhirnya berhasil untuk saya: ritme kecil, proyek nyata, dan jangan mengejar semua tren.',
    date: '2026-02-27',
    readTime: '5 min read',
    tags: ['Career', 'Learning'],
    content: `Setiap awal tahun saya membuat resolusi: "tahun ini saya akan menguasai X, Y, dan Z." Setiap pertengahan tahun, resolusi itu mati diam-diam. Akhirnya saya mengubah caranya.

## Masalahnya bukan motivasi, tapi sistem

Motivasi itu naik-turun. Yang bertahan adalah sistem:

- **Ritme kecil setiap hari** — 30 menit konsisten mengalahkan 8 jam di akhir pekan
- **Proyek nyata sebagai guru** — tutorial selesai dalam sehari, proyek mengajari selamanya
- **Satu fokus per waktu** — ganti-ganti teknologi tiap bulan berarti tidak mahir di mana pun

## Teknik yang paling membantu saya

### 1. Belajar dengan cara produksi

Alih-alih hanya menonton tutorial, saya langsung membangun sesuatu yang (sedikit) berguna. Portfolio ini, bot Telegram kecil, scraper sederhana — semuanya lahir dari kebutuhan nyata.

### 2. Menulis catatan sendiri

Kalau saya tidak bisa menjelaskan konsep dengan kata-kata saya sendiri, berarti saya belum mengerti. Ini alasan saya menulis blog ini.

### 3. Menerima fase "stuck"

Setiap kali belajar hal baru, ada fase di mana merasa bodoh. Fase itu normal. Yang membedakan orang yang berhasil adalah yang tetap duduk saat fase itu datang.

## Jangan kejar semua tren

Daftar teknologi itu panjang, waktu kita terbatas. Saya filter dengan satu pertanyaan:

> "Apakah ini menyelesaikan masalah yang sedang saya hadapi?"

Kalau tidak, simpan dulu. Tren boleh dipelajari nanti — dan sering kali konsep dasarnya tetap relevan selama bertahun-tahun.`,
  },
  {
    id: 7,
    title: 'Docker untuk Pemula: Dari "Works on My Machine" ke Reproducible',
    description:
      'Apa itu container, kenapa Docker menyelesaikan masalah lingkungan dev, dan perintah yang benar-benar saya pakai sehari-hari.',
    date: '2025-12-08',
    readTime: '7 min read',
    tags: ['DevOps', 'Docker'],
    content: `"Works on my machine" — kalimat yang pernah menghantui setiap developer. Docker lahir dari masalah itu.

## Container vs Virtual Machine

Virtual machine memuat seluruh OS — berat dan lambat. Container berbagi OS host tapi mengisolasi aplikasi:

- **VM**: boot menit, GB-an RAM
- **Container**: boot detik, MB-an RAM

Untuk dev loop harian, perbedaannya terasa sekali.

## Tiga konsep inti

1. **Image** — blueprint read-only (seperti class)
2. **Container** — instance dari image (seperti object)
3. **Dockerfile** — resep untuk membangun image

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
\`\`\`

## Perintah yang benar-benar saya pakai

\`\`\`bash
docker build -t my-app .        # build image
docker run -p 5173:5173 my-app  # jalankan
docker ps                       # container aktif
docker logs -f <container>      # pantau log
docker compose up -d            # jalankan banyak service
\`\`\`

## Docker Compose: saat ada database

Proyek butuh PostgreSQL + Redis + app? Tiga terminal dan doa, atau satu file \`compose.yaml\`:

\`\`\`yaml
services:
  app:
    build: .
    ports: ["5173:5173"]
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: dev
\`\`\`

\`docker compose up\` dan semuanya hidup bersama, dengan konfigurasi yang bisa di-commit ke Git.

## Kapan TIDAK perlu Docker?

Jujur: untuk script Python kecil atau proyek kuliah tanpa dependensi rumit, Docker bisa jadi over-engineering. Tapi begitu ada "di mesin saya jalan, di mesin kamu tidak", Docker menjadi solusi paling rapi.`,
  },
  {
    id: 8,
    title: 'Membaca Lowongan Developer: Sinyal vs Noise',
    description:
      'Cara saya menyaring lowongan kerja developer, apa yang benar-benar penting di job description, dan cara menyiapkan diri.',
    date: '2025-10-19',
    readTime: '6 min read',
    tags: ['Career', 'Tips'],
    content: `Saya pernah melamar ke 30+ lowongan dengan CV yang sama dan hampir tidak ada balasan. Setelah saya ubah cara membaca lowongan dan menyiapkan diri, responnya berubah drastis.

## Job description adalah kontrak, bukan iklan

Baca JD seperti ini:

- **"Must have"** yang disebut 3 kali → kemampuan inti, pelajari serius
- **"Nice to have"** → bonus, jangan panik kalau belum bisa
- **Daftar teknologi panjang** → biasanya satu orang menyaring, bukan harus mahir semua

## Sinyal yang benar-benar penting

Dari banyaknya lowongan, ini yang saya jadikan filter:

1. **Cara tim menjelaskan masalah** — lowongan yang fokus pada masalah bisnis biasanya lebih sehat daripada yang cuma menumpuk istilah teknis
2. **Proses interview yang jelas** — tiga tahap wajar; sepuluh tahap tanpa kejelasan, pertimbangkan ulang
3. **Gaji disebut** — transparansi di awan menghemat waktu semua pihak

## Menyiapkan diri: portofolio berbicara

Yang paling mengubah nasib saya bukan sertifikat, tapi proyek yang bisa didemokan:

- **Bisa dijalankan** — link live atau README dengan langkah jelas
- **Ada masalah nyata** — bukan cuma CRUD tutorial
- **Code rapi** — error handling, naming, dan struktur folder yang masuk akal

> Intervier tidak butuh kamu tahu segalanya. Mereka butuh bukti bahwa kamu bisa belajar dan menyelesaikan masalah.

## Satu langkah konkret minggu ini

Pilih satu lowongan yang menarik, cocokkan JD dengan kemampuanmu, dan tulis 3 hal yang bisa kamu pelajari untuk menutup gap terbesar. Bukan untuk panik — untuk punya arah.`,
  },
  {
    id: 9,
    title: 'Algoritma yang Paling Sering Saya Pakai di Proyek Nyata',
    description:
      'Bukan untuk interview — struktur data dan algoritma yang benar-benar muncul di pekerjaan sehari-hari.',
    date: '2025-08-05',
    readTime: '6 min read',
    tags: ['Computer Science', 'Tips'],
    content: `Waktu kuliah, saya sempat berpikir analisis algoritma hanya untuk interview. Ternyata konsep-konsep ini muncul hampir tiap minggu di proyek nyata — dalam bentuk yang lebih sederhana.

## Yang benar-benar sering muncul

### 1. Hash map (object/dict) untuk lookup

Butuh cek apakah ID ada di list 10.000 item? Jangan \`find()\` setiap kali — konversi ke map sekali, lookup jadi O(1).

\`\`\`javascript
const byId = new Map(items.map(i => [i.id, i]));
const target = byId.get(42);
\`\`\`

### 2. Debounce untuk input pencarian

Setiap ketikan memicu API call = server kewalahan. Debounce 300ms menunggu jeda ketik sebelum request dikirim.

### 3. Binary search — tapi bentuk lain

Bukan cuma di array terurut. "Cari titik terdekat", "cari harga termurah", "cari page terakhir yang valid" — pola divide-and-conquer muncul terus, misalnya saat menentukan pagination di GitHub API.

### 4. BFS/DFS untuk hierarki

Navigasi folder, render tree komponen React, cari jalur di graph — semuanya DFS dengan rekursi yang tenang.

## Yang jarang muncul

Jujur: red-black tree dan dynamic programming klasik belum pernah saya pakai di proyek nyata. Tidak berarti tidak perlu dipelajari — tapi kalau waktu terbatas, prioritas pada yang di atas dulu.

## Kesimpulan

> Algoritma bukan hafalan untuk interview; itu bahasa untuk berpikir tentang efisiensi.

Kalau kamu bisa melihat "ini bakal lambat kalau datanya besar" sebelum masalah terjadi, kamu sudah selangkah di depan kebanyakan developer junior.`,
  },
  {
    id: 10,
    title: 'Catatan Akhir Semester: Refleksi Belajar & Rencana ke Depan',
    description:
      'Apa yang berhasil, apa yang gagal, dan tiga fokus saya semester depan.',
    date: '2025-06-15',
    readTime: '4 min read',
    tags: ['Career', 'Learning'],
    content: `Setiap akhir semester saya menyediakan satu malam untuk menulis refleksi. Bukan curhat — tapi audit jujur supaya kesalahan yang sama tidak terulang.

## Yang berhasil semester ini

- **Konsisten menulis** — meski cuma dua pos di blog ini, ritmenya terbentuk
- **Satu proyek selesai sampai deploy** — bukan cuma 80% lalu pindah
- **Berani diskusi di kelas** — ternyata bertanya itu tidak memalukan

## Yang gagal (dan pelajarannya)

- **Terlalu banyak tab tutorial terbuka** — akhirnya tidak ada yang selesai. Pelajaran: satu sumber, satu proyek.
- **Menunda debugging** — "nanti malam saya perbaiki" hampir selalu berarti seminggu. Pelajaran: bug diselesaikan di hari yang sama kalau memungkinkan.
- **Olahraga bolong** — energi turun, fokus ikut turun. Ini bukan soal teknis, tapi soal mesinnya.

## Tiga fokus semester depan

1. **Depth over breadth** — satu stack (React + TypeScript + Node) dikuasai dulu, baru tambah yang lain
2. **Kontribusi open source** — mulai dari dokumentasi dan issue kecil, taklukkan rasa takut
3. **Komunikasi tertulis** — blog, dokumentasi PR, technical writing. Skill yang makin mahal harganya

## Penutup

> "Ship small, ship often." — entah dari mana saya dengar frasa ini, tapi jadi pengingat terbaik setiap kali perfeccionisme mengambil alih.

Kalau kamu membaca sampai sini, terima kasih. Sampai jumpa di pos berikutnya.`,
  },
];

/**
 * Blog posts sorted by date, newest first.
 * Keep everything downstream (Home, Blog, titles) reading from this export.
 */
export const SORTED_POSTS: BlogPost[] = [...POSTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

/** All unique tags across posts, for the Blog filter UI. */
export const ALL_TAGS: string[] = Array.from(
  new Set(POSTS.flatMap((post) => post.tags))
).sort();

/** Formats an ISO date (yyyy-mm-dd) as a readable label. */
export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
