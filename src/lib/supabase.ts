import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TipeLomba = 'INDIVIDU' | 'TEAM' | 'ANTAR_DIVISI';

export interface Registration {
  id: string;
  nama: string;
  kategori: string;
  tipe_lomba: TipeLomba;
  divisi: string | null;
  nama_tim: string | null;
  anggota_tim: string[] | null;
  created_at: string;
}

export interface KategoriLomba {
  nama: string;
  tipe: TipeLomba;
  icon: string;
  deskripsi?: string;
  peraturan?: string[];
  file?: string;
}

export const KATEGORI_LOMBA: KategoriLomba[] = [
  // Individu
  { nama: 'Kompetisi PES 2026', tipe: 'INDIVIDU', icon: '🎮', deskripsi: 'Lomba game PES 2026',
    file: 'Peraturan_PES_2026.html',
    peraturan: [
      'Setiap peserta membawa controller/hp sendiri.',
      'Sistem gugur (knockout) — kalah sekali langsung gugur.',
      'Durasi pertandingan 5 menit (1 babak).',
      'Setting tim: random/team pilihan sesuai kesepakatan panitia.',
      'Peserta terlambat max 5 menit dari jadwal dilarang mengikuti.',
    ] },
  { nama: 'Tebak Warna Kaos Kaki', tipe: 'INDIVIDU', icon: '🧦', deskripsi: 'Tebak warna kaos kaki',
    file: 'tebak-warna-kaos-kaki.html',
    peraturan: [
      'Peserta tidak boleh melihat kakinya saat ditebak.',
      'Mata ditutup kain/handuk oleh panitia.',
      'Setiap peserta diberi 3 kesempatan menebak.',
      'Yang paling banyak tebakan benar menjadi pemenang.',
      'Tidak boleh dibantu orang lain saat menjawab.',
    ] },
  { nama: 'Lomba Pakai APD', tipe: 'INDIVIDU', icon: '🦺', deskripsi: 'Lomba memakai APD tercepat',
    file: 'lomba-pakai-apd.html',
    peraturan: [
      'APD lengkap: helm, sepatu safety, rompi, sarung tangan, kacamata.',
      'Mulai dari posisi siap berdiri (sebelum tiup peluit).',
      'Semua APD harus terpakai dengan benar — dipastikan oleh juri.',
      'Peserta dengan waktu tercepat menang.',
      'Jika APD tidak rapi/tidak lengkap, mendapat penalti +5 detik.',
    ] },
  { nama: 'Lomba Makan Kerupuk', tipe: 'INDIVIDU', icon: '🍘', deskripsi: 'Lomba makan kerupuk',
    file: 'lomba-makan-kerupuk.html',
    peraturan: [
      'Kerupuk digantung dengan tali di tiang — tidak boleh dipegang.',
      'Tangan peserta diikat di belakang badan.',
      'Peserta yang pertama menghabiskan kerupuk menang.',
      'Tidak boleh menerima bantuan dari siapa pun.',
      'Durasi maksimal 2 menit per ronde.',
    ] },
  // Team
  { nama: 'Estafet Air / Tepung', tipe: 'TEAM', icon: '💧', deskripsi: '4 orang per tim',
    file: 'estafet-air-tepung.html',
    peraturan: [
      'Setiap tim terdiri dari 4 orang.',
      'Setiap anggota estafet membawa air/tepung dengan gelas plastik.',
      'Gelas tidak boleh dipegang dengan tangan — hanya di mulut/dagu.',
      'Air/tepung yang tumpah tidak boleh diambil kembali.',
      'Tim dengan sisa air/tepung terbanyak di finish menang.',
      'Jika gelas jatuh, harus kembali ke posisi sebelumnya.',
    ] },
  { nama: 'Ketangkasan Terong / Timun', tipe: 'TEAM', icon: '🍆', deskripsi: '4 orang per tim',
    file: 'ketangkasan-terong-timun.html',
    peraturan: [
      'Setiap tim terdiri dari 4 orang.',
      'Terong/timun dijit (dipegang) antara dagu dan leher anggota.',
      'Estafet dari anggota 1 ke anggota berikutnya tanpa pegangan tangan.',
      'Jika terong/timun jatuh, harus diambil dan kembali ke start.',
      'Tim yang pertama sampai finish dengan terong/timun utuh menang.',
    ] },
  { nama: 'Estafet Balon', tipe: 'TEAM', icon: '🎈', deskripsi: '4 orang per tim',
    file: 'estafet-balon.html',
    peraturan: [
      'Setiap tim terdiri dari 4 orang.',
      'Balon dijit (dipegang) antara perut/dada dua anggota berdampingan.',
      'Tangan tidak boleh menyentuh balon.',
      'Jika balon meletus/jatuh, tim harus kembali ke posisi sebelumnya.',
      'Tim yang pertama sampai finish dengan balon utuh menang.',
    ] },
  // Antar Divisi
  { nama: 'Turnamen Voli Terpal + Daster', tipe: 'ANTAR_DIVISI', icon: '🏐', deskripsi: 'Antar divisi',
    file: 'voli-terpal-daster.html',
    peraturan: [
      'Setiap divisi mengirimkan 1 tim (6-8 orang).',
      'Pemain wajib memakai daster dan sarung/batik.',
      'Bola diganti terpal yang diikat — tidak boleh dipegang dengan tangan terbuka.',
      'Sistem half-set: rally sampai 15 poin, best of 3.',
      'Rotasi pemain sesuai aturan voli standar.',
      'Pemain minimal 1 kali sentuhan sebelum terpal melewati net.',
    ] },
  { nama: 'Futsal Sarung', tipe: 'ANTAR_DIVISI', icon: '⚽', deskripsi: 'Antar divisi',
    file: 'futsal-sarung.html',
    peraturan: [
      'Setiap divisi mengirimkan 1 tim (5 pemain + cadangan).',
      'Semua pemain wajib memakai sarung selama pertandingan.',
      'Jika sarung lepas, pemain harus memakai kembali sebelum lanjut bermain.',
      'Durasi: 2 babak × 10 menit, istirahat 5 menit.',
      'Sistem gugur — kalah sekali gugur.',
      'Tidak ada offside. Pelanggaran berat diberi kartu kuning/merah.',
    ] },
];

export const DIVISI_OPTIONS = [
  'General Superintendent (GS)/Pemimpin Proyek',
  'Kontraktor (Tim Kantor)',
  'Kontraktor Lapangan (Pelaksana, Surveyor, & Asisten)',
  'Konsultan Supervisi',
  'Tim Plant',
  'Operator, Helper, & Driver',
  'Mandor & Tenaga',
  'Tim Logistik & Tenaga Harian',
];
