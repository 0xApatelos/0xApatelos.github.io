import { ExperienceItem, Certificate } from '../types';

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  PENGALAMAN & SERTIFIKAT — DATA HALAMAN EXPERIENCE          ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Halaman Experience menampilkan dua section dari file ini:
 *   1. EXPERIENCE  → timeline pengalaman kerja/magang/organisasi
 *   2. CERTIFICATES → kartu sertifikat
 *
 * ── CARA MENAMBAHKAN PENGALAMAN ──────────────────────────────
 * Salin satu objek di EXPERIENCE, lalu isi:
 *   id          → nomor unik berikutnya
 *   period      → rentang tanggal, mis. 'Jun 2024 - Des 2024'
 *   role        → jabatan, mis. 'IT Support Intern'
 *   org         → nama instansi/perusahaan
 *   type        → 'work' | 'intern' | 'organization' | 'freelance'
 *   description → apa yang dikerjakan + dampaknya (2-4 kalimat)
 *
 * ── CARA MENAMBAHKAN SERTIFIKAT ──────────────────────────────
 * Salin satu objek di CERTIFICATES, lalu isi:
 *   id          → nomor unik berikutnya
 *   name        → nama sertifikat
 *   issuer      → penerbit (Dicoding, Google, AWS, dll.)
 *   date        → tanggal terbit, mis. 'Mei 2025'
 *   url         → ⭐ LINK sertifikat (halaman verifikasi/download).
 *                 Contoh: 'https://dicoding.com/certificates/xxxx'
 *                 Kosongkan ('') jika belum ada link → tombol tidak ditampilkan.
 *   description → ⭐ DESKRIPSI sertifikat: topik yang dipelajari,
 *                 skill yang dibuktikan, nilai/grade jika ada.
 */

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    period: '2024 - Sekarang',
    role: 'Freelance Web Developer',
    org: 'Mandiri',
    type: 'freelance',
    description:
      'Membangun dan memelihara website untuk klien kecil: landing page, integrasi form kontak, dan optimasi performa. Bertanggung jawab penuh dari diskusi kebutuhan hingga deploy.',
  },
  {
    id: 2,
    period: '2023 - 2024',
    role: 'Anggota Divisi Teknologi Informasi',
    org: 'Himpunan Mahasiswa Informatika',
    type: 'organization',
    description:
      'Mengelola infrastruktur digital organisasi, termasuk website profil dan sistem informasi keanggotaan. Mengadakan workshop dasar web untuk mahasiswa baru.',
  },
  // ── TODO: Tambahkan pengalaman lain di sini (magang, kerja kantor, dll.) ──
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    name: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding Indonesia',
    date: 'Mei 2025',
    // ⭐ GANTI link ini dengan URL sertifikat kamu (halaman verifikasi/download)
    url: '',
    // ⭐ GANTI deskripsi ini dengan isi sertifikat kamu (topik, skill, nilai)
    description:
      'Memahami fundamental HTML, CSS, dan JavaScript serta standar web modern.',
  },
  {
    id: 2,
    name: 'Introduction to Data Science',
    issuer: 'IBM / Coursera',
    date: '2025',
    // ⭐ GANTI link ini dengan URL sertifikat kamu
    url: '',
    // ⭐ GANTI deskripsi ini dengan isi sertifikat kamu
    description:
      'Pengenalan alur kerja data science: Python, analisis data, dan machine learning dasar.',
  },
  // ── TODO: Tambahkan sertifikat lain di sini ──
  // Salin satu blok { id, name, issuer, date, url, description } lalu ganti isinya.
  // url: '' akan menyembunyikan tombol "Lihat Sertifikat" sampai diisi.
];
