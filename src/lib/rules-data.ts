export interface RuleCard {
  number: number | string;
  title: string;
  body: RuleBlock[];
}

export type RuleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; text: string }
  | { type: 'allowed'; items: string[] }
  | { type: 'forbidden'; items: string[] };

export interface RuleSection {
  subtitle: string;
  cards: RuleCard[];
}

export interface RuleDoc {
  title: string;
  tagline: string;
  left: RuleSection;
  right: RuleSection;
  prinsip: { label: string; text: string }[];
}

export const RULES: Record<string, RuleDoc> = {
  'Kompetisi PES 2026': {
    title: 'Peraturan Resmi Turnamen PES 2026',
    tagline: 'Individual Skill Cup · Satu Tim untuk Semua, Satu Juara karena Kemampuan',
    left: {
      subtitle: '',
      cards: [
        {
          number: 1,
          title: 'Tujuan Turnamen',
          body: [
            {
              type: 'paragraph',
              text: 'Turnamen ini bertujuan untuk menguji kemampuan individu setiap peserta. Seluruh pemain akan menggunakan tim yang sama pada setiap fase sehingga tidak ada keuntungan dari pemilihan tim. Faktor penentu kemenangan adalah kemampuan membaca permainan, strategi, pengambilan keputusan, dan eksekusi di lapangan.',
            },
          ],
        },
        {
          number: 2,
          title: 'Peserta',
          body: [
            {
              type: 'list',
              items: [
                'Jumlah peserta: 10 orang.',
                'Sistem pertandingan: Single Elimination (Sistem Gugur).',
                'Pengundian bagan: Dilakukan sebelum turnamen dimulai.',
              ],
            },
          ],
        },
        {
          number: 3,
          title: 'Daftar Tim',
          body: [
            {
              type: 'paragraph',
              text: 'Tim yang digunakan berasal dari lima juara liga utama Eropa musim 2025–2026:',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Liverpool (Premier League)',
                'Barcelona (La Liga)',
                'Napoli (Serie A)',
                'Bayern München (Bundesliga)',
                'PSG (Ligue 1)',
              ],
            },
            {
              type: 'callout',
              text: '*Kelima tim hanya digunakan sebagai kandidat undian dan seluruh peserta akan memakai tim yang sama pada fase yang sama.',
            },
          ],
        },
        {
          number: 4,
          title: 'Sistem Pengundian Tim',
          body: [
            {
              type: 'paragraph',
              text: 'Sebelum dimulainya setiap fase akan dilakukan pengundian satu tim dari lima kandidat.',
            },
            {
              type: 'callout',
              text: 'Contoh: Babak Pendahuluan → Barcelona · Perempat Final → Liverpool · Semifinal → Napoli · Final → Bayern München',
            },
            {
              type: 'paragraph',
              text: 'Dengan sistem ini seluruh peserta harus mampu beradaptasi terhadap karakter tim yang berbeda sehingga kemampuan individu menjadi faktor utama.',
            },
          ],
        },
        {
          number: 5,
          title: 'Aturan Pemilihan Tim',
          body: [
            {
              type: 'list',
              items: [
                'Seluruh peserta wajib menggunakan tim hasil undian.',
                'Dilarang menggunakan tim lain.',
                'Dilarang mengganti pemain di luar skuad bawaan tim.',
                'Kondisi pemain (Condition) mengikuti kondisi default permainan.',
              ],
            },
          ],
        },
        {
          number: 6,
          title: 'Pengaturan Taktik',
          body: [
            { type: 'allowed', items: [
              'Mengubah formasi & Game Plan.',
              'Mengatur posisi pemain & Captain.',
              'Mengubah eksekutor bola mati & pergantian pemain.',
            ]},
            { type: 'forbidden', items: [
              'Mengubah statistik pemain, menggunakan mod, atau edit data.',
              'Menggunakan Option File yang mengubah atribut pemain.',
            ]},
          ],
        },
      ],
    },
    right: {
      subtitle: '',
      cards: [
        {
          number: 7,
          title: 'Setting Pertandingan',
          body: [
            {
              type: 'table',
              headers: ['Pengaturan', 'Nilai / Opsi'],
              rows: [
                ['Mode Permainan', 'Exhibition Match'],
                ['Durasi Pertandingan', '10 Menit'],
                ['Level Kesulitan', 'Tidak digunakan (PvP)'],
                ['Stadium / Cuaca', 'Random / Fine (Cerah)'],
                ['Musim / Waktu', 'Summer / Night'],
                ['Kecepatan Permainan', '2 (Fast)'],
                ['Ball Type / Kamera', 'Default / Dynamic Wide'],
                ['Cursor Change', 'Semi Assisted'],
                ['Passing Support', 'Level 1'],
                ['Through Pass Assistance', 'Default'],
                ['Shot / Cross Assistance', 'Basic / Default'],
                ['Manual Shooting', 'Tidak diperbolehkan'],
                ['Auto Feint / Auto Sliding', 'Off / Off'],
                ['Player Switching', 'Semi Assisted'],
                ['Offside / Injury', 'ON / OFF'],
                ['Substitution', 'Maksimal sesuai aturan permainan'],
              ],
            },
          ],
        },
        {
          number: 8,
          title: 'Aturan Fair Play',
          body: [
            { type: 'forbidden', items: [
              'Melakukan time wasting secara sengaja.',
              'Menahan bola terus-menerus di area pertahanan tanpa tekanan lawan.',
              'Melakukan pause berulang kali untuk mengganggu konsentrasi lawan.',
              'Mengulur waktu saat bola mati.',
              'Melakukan tindakan yang mengganggu jalannya pertandingan.',
            ]},
            { type: 'callout', text: '*Pelanggaran dapat diberikan peringatan hingga dinyatakan kalah oleh panitia.' },
          ],
        },
        {
          number: 9,
          title: 'Sistem Gugur',
          body: [
            { type: 'paragraph', text: 'Setiap pertandingan wajib menghasilkan pemenang. Jika skor imbang:' },
            { type: 'list', ordered: true, items: ['Extra Time', 'Penalti'] },
          ],
        },
        {
          number: 10,
          title: 'Pengundian Tim Setiap Fase',
          body: [
            {
              type: 'list',
              items: [
                'Panitia mengocok kembali lima kandidat tim setelah satu fase selesai.',
                'Tim hasil undian digunakan oleh seluruh peserta pada fase berikutnya.',
                'Tim yang sama boleh muncul kembali karena setiap undian bersifat independen.',
              ],
            },
          ],
        },
        {
          number: 11,
          title: 'Penentuan Juara',
          body: [
            {
              type: 'paragraph',
              text: 'Juara ditentukan dari pemenang pertandingan Final. Tidak ada perebutan tempat ketiga kecuali disepakati sebelum turnamen dimulai.',
            },
          ],
        },
        {
          number: 12,
          title: 'Sportivitas',
          body: [
            {
              type: 'list',
              items: [
                'Menghormati keputusan wasit permainan & panitia.',
                'Menjaga sportivitas dan tidak melakukan provokasi.',
                'Pelanggaran berat dapat berakibat diskualifikasi.',
              ],
            },
          ],
        },
      ],
    },
    prinsip: [
      { label: 'Fairness', text: 'Seluruh peserta memiliki kesempatan yang sama.' },
      { label: 'Individual Skill', text: 'Pemenang ditentukan oleh kemampuan bermain, bukan kekuatan tim.' },
      { label: 'Adaptability', text: 'Peserta dituntut mampu beradaptasi dengan karakter tim yang berbeda.' },
      { label: 'Sportsmanship', text: 'Seluruh peserta wajib menjunjung tinggi sportivitas.' },
    ],
  },

  'Tebak Warna Kaos Kaki': {
    title: 'Peraturan Resmi Lomba Tebak Warna Kaos Kaki',
    tagline: 'Lomba Individu · Tajam Penglihatan, Tajam Ingatan',
    left: {
      subtitle: '',
      cards: [
        { number: 1, title: 'Tujuan Lomba', body: [{ type: 'paragraph', text: 'Lomba ini bertujuan untuk menguji ketajaman ingatan dan kejelian peserta dalam menebak warna kaos kaki yang dikenakannya sendiri tanpa melihat. Peserta dituntut untuk fokus dan mengandalkan daya ingat serta kepekaan terhadap detail.' }] },
        { number: 2, title: 'Peserta', body: [{ type: 'list', items: ['Jenis lomba: Individu.', 'Jumlah peserta: Sesuai pendaftaran panitia.', 'Pendaftaran: Dilakukan sebelum jadwal lomba dimulai.'] }] },
        { number: 3, title: 'Ketentuan Awal', body: [{ type: 'list', items: ['Setiap peserta datang memakai kaos kaki sendiri (warna bebas).', 'Peserta tidak boleh melihat kakinya sendiri saat ditebak.', 'Mata peserta ditutup dengan kain/handuk oleh panitia.', 'Penutup mata dipastikan rapat dan tidak bisa dilepas sendiri.'] }] },
        { number: 4, title: 'Cara Bermain', body: [{ type: 'list', items: ['Panitia memeriksa dan mencatat warna kaos kaki peserta.', 'Peserta diberi 3 kesempatan menebak warna kaos kakinya.', 'Setiap tebakan diucapkan dengan jelas dan lantang.', 'Panitia mencatat tebakan yang benar dari ketiga kesempatan.'] }] },
        { number: 5, title: 'Aturan Peserta', body: [
          { type: 'allowed', items: ['Mengingat dan memikirkan warna kaos kaki sendiri.', 'Berdiri/duduk diam selama proses tebak berlangsung.'] },
          { type: 'forbidden', items: ['Membuka/menerawang kain penutup mata.', 'Dibantu oleh orang lain saat menjawab.', 'Menjawab lebih dari satu warna dalam satu kali tebakan.'] },
        ]},
      ],
    },
    right: {
      subtitle: '',
      cards: [
        { number: 6, title: 'Penilaian', body: [{ type: 'table', headers: ['Aspek', 'Keterangan'], rows: [
          ['Jumlah Tebakan', '3 kali kesempatan'],
          ['Tebakan Benar', 'Dihitung sebagai poin'],
          ['Tebakan Salah', 'Tidak mengurangi poin'],
          ['Bantuan Orang Lain', 'Diskualifikasi'],
          ['Menerawang Mata', 'Diskualifikasi'],
        ]}]},
        { number: 7, title: 'Penentuan Pemenang', body: [{ type: 'list', items: ['Pemenang adalah peserta dengan jumlah tebakan benar terbanyak.', 'Jika terjadi seri, diadakan babak tambahan (sudden death).', 'Pada babak tambahan, peserta yang menebak benar pertama kali menang.', 'Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat.'] }] },
        { number: 8, title: 'Fair Play', body: [
          { type: 'forbidden', items: ['Berkomplot dengan panitia atau peserta lain.', 'Memberikan isyarat/sinyal kepada peserta yang sedang ditebak.', 'Mengganti kaos kaki setelah proses pencatatan.'] },
          { type: 'callout', text: '*Pelanggaran dapat berakibat diskualifikasi langsung.' },
        ]},
        { number: 9, title: 'Kondisi Khusus', body: [{ type: 'callout', text: 'Catatan: Jika peserta memakai dua kaos kaki warna berbeda, tebakan salah satu warna sudah dianggap benar. Kaos kaki bermotif dianggap warna dominan.' }] },
      ],
    },
    prinsip: [
      { label: 'Fairness', text: 'Seluruh peserta mendapat kesempatan yang sama.' },
      { label: 'Memory', text: 'Daya ingat dan ketelitian jadi penentu kemenangan.' },
      { label: 'Honesty', text: 'Peserta wajib jujur dan tidak curang.' },
      { label: 'Fun', text: 'Suasana tetap hangat dan menyenangkan.' },
    ],
  },

  'Lomba Pakai APD': {
    title: 'Peraturan Resmi Lomba Pakai APD Tercepat',
    tagline: 'Lomba Individu · Cepat, Rapi, dan Aman',
    left: {
      subtitle: '',
      cards: [
        { number: 1, title: 'Tujuan Lomba', body: [{ type: 'paragraph', text: 'Lomba ini bertujuan untuk menguji kecepatan dan ketelitian peserta dalam memakai Alat Pelindung Diri (APD) dengan benar. Peserta dituntut untuk memakai seluruh APD dengan rapi dan sesuai standar K3 dalam waktu sesingkat-singkatnya.' }] },
        { number: 2, title: 'Peserta', body: [{ type: 'list', items: ['Jenis lomba: Individu.', 'Jumlah peserta: Sesuai pendaftaran panitia.', 'Pendaftaran: Dilakukan sebelum jadwal lomba dimulai.'] }] },
        { number: 3, title: 'Daftar APD', body: [
          { type: 'paragraph', text: 'APD yang wajib dipakai peserta secara lengkap:' },
          { type: 'list', ordered: true, items: ['Helm safety', 'Sepatu safety', 'Rompi safety', 'Sarung tangan', 'Kacamata safety'] },
          { type: 'callout', text: '*Seluruh APD disediakan oleh panitia kecuali diberitahukan lain.' },
        ]},
        { number: 4, title: 'Posisi Awal', body: [{ type: 'list', items: ['Peserta berdiri di garis start dalam posisi siap.', 'APD diletakkan terpisah di area yang sudah ditentukan.', 'Peserta memulai setelah peluit ditiupkan oleh panitia.', 'Peserta yang mulai sebelum peluit dianggap false start.'] }] },
        { number: 5, title: 'Cara Bermain', body: [{ type: 'list', items: ['Peserta berlari mengambil APD satu per satu.', 'Memakai seluruh APD dengan urutan bebas, namun harus lengkap.', 'Pemasangan APD harus benar dan rapi — diperiksa oleh juri.', 'Setelah selesai, peserta berdiri tegak sebagai tanda selesai.', 'Waktu dihentikan ketika peserta berdiri tegak dan juri menyatakan benar.'] }] },
        { number: 6, title: 'Aturan Peserta', body: [
          { type: 'allowed', items: ['Memakai APD dalam urutan apa pun.', 'Meminta pemeriksaan ulang jika dirasa sudah benar.'] },
          { type: 'forbidden', items: ['Mulai sebelum peluit ditiupkan (false start).', 'Dibantu orang lain saat memakai APD.', 'Menggunakan APD milik peserta lain.'] },
        ]},
      ],
    },
    right: {
      subtitle: '',
      cards: [
        { number: 7, title: 'Penilaian', body: [{ type: 'table', headers: ['Aspek', 'Keterangan'], rows: [
          ['Waktu', 'Dihitung dari peluit hingga selesai'],
          ['APD Tidak Lengkap', 'Diskualifikasi'],
          ['APD Tidak Rapi', 'Penalti +5 detik per item'],
          ['Pemasangan Salah', 'Penalti +5 detik per item'],
          ['False Start', 'Penalti +3 detik'],
          ['Bantuan Orang Lain', 'Diskualifikasi'],
        ]}]},
        { number: 8, title: 'Standar Pemasangan', body: [{ type: 'list', items: ['Helm terpasang dengan tali dagu terkunci.', 'Sepatu safety dipakai dan tali terikat rapat.', 'Rompi safety tertutup rapat (zipper/kancing).', 'Sarung tangan terpakai pada kedua tangan.', 'Kacamata safety terpasang pada posisi mata.'] }] },
        { number: 9, title: 'Penentuan Pemenang', body: [{ type: 'list', items: ['Pemenang adalah peserta dengan waktu tercepat setelah perhitungan penalti.', 'Jika terjadi seri, diadakan babak tambahan (ulang perlombaan).', 'Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat.'] }] },
        { number: 10, title: 'Fair Play', body: [
          { type: 'forbidden', items: ['Sabotase peserta lain (mengganggu, merusak APD).', 'Mengganti/memperbaiki APD setelah juri menyatakan selesai.', 'Melakukan provokasi atau gangguan terhadap peserta lain.'] },
          { type: 'callout', text: '*Pelanggaran berat dapat berakibat diskualifikasi.' },
        ]},
      ],
    },
    prinsip: [
      { label: 'Speed', text: 'Kecepatan memakai APD menjadi penentu.' },
      { label: 'Accuracy', text: 'Pemasangan harus benar dan rapi.' },
      { label: 'Safety', text: 'APD dipakai sesuai standar K3.' },
      { label: 'Fairness', text: 'Seluruh peserta mendapat kesempatan yang sama.' },
    ],
  },

  'Lomba Makan Kerupuk': {
    title: 'Peraturan Resmi Lomba Makan Kerupuk',
    tagline: 'Lomba Individu · Tangguh, Tanpa Tangan, Tanpa Bantuan',
    left: {
      subtitle: '',
      cards: [
        { number: 1, title: 'Tujuan Lomba', body: [{ type: 'paragraph', text: 'Lomba ini bertujuan untuk menguji ketangkasan dan kecepatan peserta dalam menghabiskan kerupuk yang digantung tanpa menggunakan tangan. Lomba ini juga melatih fokus dan kecekatan peserta dalam kondisi terbatas.' }] },
        { number: 2, title: 'Peserta', body: [{ type: 'list', items: ['Jenis lomba: Individu.', 'Jumlah peserta: Sesuai pendaftaran panitia.', 'Pendaftaran: Dilakukan sebelum jadwal lomba dimulai.'] }] },
        { number: 3, title: 'Persiapan', body: [{ type: 'list', items: ['Kerupuk digantung dengan tali pada tiang — ketinggian disesuaikan.', 'Setiap peserta mendapat 1 kerupuk per ronde.', 'Kerupuk tidak boleh dipegang oleh peserta atau panitia selama lomba.', 'Tangan peserta diikat di belakang badan sebelum lomba dimulai.'] }] },
        { number: 4, title: 'Cara Bermain', body: [{ type: 'list', items: ['Peserta berdiri di depan tiang dengan kerupuk tergantung.', 'Setelah peluit, peserta mulai memakan kerupuk dengan mulut saja.', 'Peserta yang pertama menghabiskan kerupuk dinyatakan menang.', 'Durasi maksimal per ronde adalah 2 menit.', 'Jika tidak ada yang menghabiskan dalam 2 menit, pemenang ditentukan dari sisa kerupuk paling sedikit.'] }] },
        { number: 5, title: 'Aturan Peserta', body: [
          { type: 'allowed', items: ['Menggunakan mulut, gigi, atau bibir untuk memakan kerupuk.', 'Bergerak bebas di sekitar tiang selama tangan tetap terikat.'] },
          { type: 'forbidden', items: ['Menggunakan tangan atau lengan untuk memegang kerupuk.', 'Menerima bantuan dari siapa pun.', 'Memegang/menarik tali kerupuk.', 'Menggunakan alat bantu apa pun.'] },
        ]},
      ],
    },
    right: {
      subtitle: '',
      cards: [
        { number: 6, title: 'Penilaian', body: [{ type: 'table', headers: ['Aspek', 'Keterangan'], rows: [
          ['Waktu', 'Dihitung dari peluit hingga kerupuk habis'],
          ['Kerupuk Habis', 'Menang jika pertama menghabiskan'],
          ['Tangan Lepas', 'Diskualifikasi'],
          ['Menerima Bantuan', 'Diskualifikasi'],
          ['Memegang Tali', 'Peringatan, ulang jika berulang'],
          ['Durasi Maksimal', '2 menit per ronde'],
        ]}]},
        { number: 7, title: 'Penentuan Pemenang', body: [{ type: 'list', items: ['Pemenang adalah peserta pertama yang menghabiskan kerupuk.', 'Jika tidak ada yang habis dalam 2 menit, pemenang dari sisa kerupuk paling sedikit.', 'Jika masih seri, diadakan babak tambahan (rematch).', 'Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat.'] }] },
        { number: 8, title: 'Fair Play', body: [
          { type: 'forbidden', items: ['Mengganggu peserta lain (mendorong, mengiritasi).', 'Melepaskan ikatan tangan sendiri.', 'Menerima kerupuk pengganti dari luar.', 'Melakukan tindakan yang membahayakan diri atau orang lain.'] },
          { type: 'callout', text: '*Pelanggaran berat dapat berakibat diskualifikasi.' },
        ]},
        { number: 9, title: 'Kondisi Khusus', body: [{ type: 'callout', text: 'Catatan: Jika kerupuk jatuh sebelum dimakan, peserta diberi kerupuk baru dan waktu tetap berjalan. Jika tali putus, ronde diulang untuk peserta yang bersangkutan.' }] },
      ],
    },
    prinsip: [
      { label: 'Agility', text: 'Ketangkasan mulut dan tubuh jadi penentu.' },
      { label: 'Focus', text: 'Konsentrasi penuh meski kondisi terbatas.' },
      { label: 'Honesty', text: 'Tidak memanipulasi ikatan atau kerupuk.' },
      { label: 'Fun', text: 'Suasana tetap seru dan menghibur.' },
    ],
  },

  'Estafet Air / Tepung': {
    title: 'Peraturan Resmi Estafet Air / Tepung',
    tagline: 'Lomba Tim · Empat Hati, Satu Gelas, Satu Kemenangan',
    left: {
      subtitle: '',
      cards: [
        { number: 1, title: 'Tujuan Lomba', body: [{ type: 'paragraph', text: 'Lomba ini bertujuan untuk menguji kerja sama tim, keseimbangan, dan ketelitian peserta dalam memindahkan air/tepung menggunakan gelas plastik dengan cara tidak biasa. Tim yang paling solid dan teliti akan keluar sebagai pemenang.' }] },
        { number: 2, title: 'Peserta', body: [{ type: 'list', items: ['Jenis lomba: Tim.', 'Jumlah anggota per tim: 4 orang.', 'Pendaftaran: Dilakukan sebelum jadwal lomba dimulai.', 'Komposisi tim: Bebas (tidak dibatasi gender/divisi).'] }] },
        { number: 3, title: 'Persiapan', body: [{ type: 'list', items: ['Setiap tim berdiri berjajar di garis start.', 'Setiap anggota diberi 1 gelas plastik berisi air/tepung.', 'Jarak antar pos estafet ditentukan oleh panitia (umumnya 5 meter).', 'Gelas hanya boleh dipegang dengan mulut/dagu — tidak boleh ditangan.'] }] },
        { number: 4, title: 'Cara Bermain', body: [{ type: 'list', items: ['Setelah peluit, anggota pertama berjalan membawa gelas dengan mulut/dagu.', 'Sampai di pos berikutnya, gelas diteruskan ke anggota berikutnya tanpa tangan.', 'Estafet berlanjut hingga anggota keempat sampai ke garis finish.', 'Tim dengan sisa air/tepung terbanyak di finish dinyatakan menang.'] }] },
        { number: 5, title: 'Aturan Peserta', body: [
          { type: 'allowed', items: ['Berjalan dengan kecepatan apa pun.', 'Berhenti sejenak untuk menjaga keseimbangan.'] },
          { type: 'forbidden', items: ['Memegang gelas dengan tangan atau lengan.', 'Mengambil kembali air/tepung yang tumpah.', 'Menerima bantuan dari orang lain untuk memegang gelas.', 'Menuangkan air/tepung ke wadah lain.'] },
        ]},
      ],
    },
    right: {
      subtitle: '',
      cards: [
        { number: 6, title: 'Penilaian', body: [{ type: 'table', headers: ['Aspek', 'Keterangan'], rows: [
          ['Sisa Air/Tepung', 'Penentu utama kemenangan'],
          ['Gelas Jatuh', 'Kembali ke posisi sebelumnya'],
          ['Memegang Gelas dengan Tangan', 'Penalti / diskualifikasi'],
          ['Air/Tepung Tumpah', 'Tidak boleh diambil kembali'],
          ['Tim Tidak Lengkap', 'Diskualifikasi'],
          ['Menerima Bantuan', 'Diskualifikasi'],
        ]}]},
        { number: 7, title: 'Penentuan Pemenang', body: [{ type: 'list', items: ['Pemenang adalah tim dengan sisa air/tepung terbanyak di garis finish.', 'Jika terjadi seri, diadakan babak tambahan (rematch).', 'Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat.'] }] },
        { number: 8, title: 'Ketentuan Gelas Jatuh', body: [{ type: 'callout', text: 'Aturan gelas jatuh: Jika gelas jatuh, peserta harus kembali ke posisi sebelumnya. Gelas diisi ulang sesuai sisa air/tepung yang ada. Waktu tetap berjalan selama proses pengembalian.' }] },
        { number: 9, title: 'Fair Play', body: [
          { type: 'forbidden', items: ['Mengganggu tim lain (mendorong, merusak gelas).', 'Memegang gelas dengan tangan saat estafet.', 'Mengganti anggota setelah lomba dimulai.'] },
          { type: 'callout', text: '*Pelanggaran berat dapat berakibat diskualifikasi.' },
        ]},
      ],
    },
    prinsip: [
      { label: 'Teamwork', text: 'Kerja sama tim jadi kunci utama.' },
      { label: 'Balance', text: 'Keseimbangan dan ketelitian menentukan.' },
      { label: 'Persistence', text: 'Tidak menyerah meski tumpah.' },
      { label: 'Fun', text: 'Suasana tetap seru dan menghibur.' },
    ],
  },

  'Ketangkasan Terong / Timun': {
    title: 'Peraturan Resmi Ketangkasan Terong / Timun',
    tagline: 'Lomba Tim · Jit, Jaga, Estafet Tanpa Jatuh',
    left: {
      subtitle: '',
      cards: [
        { number: 1, title: 'Tujuan Lomba', body: [{ type: 'paragraph', text: 'Lomba ini bertujuan untuk menguji ketangkasan, koordinasi, dan kerja sama tim dalam memindahkan terong/timun antar anggota tanpa menggunakan tangan. Tim yang paling kompak dan tangkas akan keluar sebagai pemenang.' }] },
        { number: 2, title: 'Peserta', body: [{ type: 'list', items: ['Jenis lomba: Tim.', 'Jumlah anggota per tim: 4 orang.', 'Pendaftaran: Dilakukan sebelum jadwal lomba dimulai.', 'Komposisi tim: Bebas (tidak dibatasi gender/divisi).'] }] },
        { number: 3, title: 'Persiapan', body: [{ type: 'list', items: ['Setiap tim berdiri berjajar di garis start.', 'Terong/timun dijit (dipegang) antara dagu dan leher anggota.', 'Jarak antar pos estafet ditentukan oleh panitia (umumnya 5 meter).', 'Tangan peserta tidak boleh menyentuh terong/timun.'] }] },
        { number: 4, title: 'Cara Bermain', body: [{ type: 'list', items: ['Setelah peluit, anggota pertama menjit terong/timun antara dagu dan leher.', 'Anggota berjalan menuju anggota berikutnya tanpa pegangan tangan.', 'Estafet terong/timun ke anggota berikutnya menggunakan dagu dan leher.', 'Estafet berlanjut hingga anggota keempat sampai ke garis finish.', 'Tim yang pertama sampai finish dengan terong/timun utuh menang.'] }] },
        { number: 5, title: 'Aturan Peserta', body: [
          { type: 'allowed', items: ['Berjalan dengan kecepatan apa pun.', 'Berhenti sejenak untuk menjaga keseimbangan.'] },
          { type: 'forbidden', items: ['Memegang terong/timun dengan tangan atau lengan.', 'Menyentuh terong/timun dengan bagian tubuh selain dagu dan leher.', 'Menerima bantuan dari orang lain untuk menjit.', 'Memotong jalur tim lain.'] },
        ]},
      ],
    },
    right: {
      subtitle: '',
      cards: [
        { number: 6, title: 'Penilaian', body: [{ type: 'table', headers: ['Aspek', 'Keterangan'], rows: [
          ['Waktu Tempuh', 'Dihitung dari peluit hingga finish'],
          ['Terong/Timun Jatuh', 'Kembali ke posisi sebelumnya'],
          ['Terong/Timun Pecah/Rusak', 'Tim diberi pengganti, waktu tetap berjalan'],
          ['Memegang dengan Tangan', 'Diskualifikasi'],
          ['Tim Tidak Lengkap', 'Diskualifikasi'],
          ['Menerima Bantuan', 'Diskualifikasi'],
        ]}]},
        { number: 7, title: 'Ketentuan Terong/Timun Jatuh', body: [{ type: 'callout', text: 'Aturan jatuh: Jika terong/timun jatuh, peserta harus mengambil dan kembali ke start posisi tersebut. Estafet hanya bisa dilanjutkan setelah terong/timun dijit kembali dengan benar. Waktu tetap berjalan selama proses pengambilan.' }] },
        { number: 8, title: 'Penentuan Pemenang', body: [{ type: 'list', items: ['Pemenang adalah tim pertama yang sampai finish dengan terong/timun utuh.', 'Jika terjadi seri, diadakan babak tambahan (rematch).', 'Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat.'] }] },
        { number: 9, title: 'Fair Play', body: [
          { type: 'forbidden', items: ['Mengganggu tim lain (mendorong, merusak terong/timun).', 'Memegang terong/timun dengan tangan saat estafet.', 'Mengganti anggota setelah lomba dimulai.'] },
          { type: 'callout', text: '*Pelanggaran berat dapat berakibat diskualifikasi.' },
        ]},
      ],
    },
    prinsip: [
      { label: 'Teamwork', text: 'Koordinasi antar anggota jadi kunci.' },
      { label: 'Agility', text: 'Ketangkasan menjaga benda tetap di tempat.' },
      { label: 'Persistence', text: 'Tidak menyerah meski jatuh berulang.' },
      { label: 'Fun', text: 'Suasana tetap seru dan menghibur.' },
    ],
  },

  'Estafet Balon': {
    title: 'Peraturan Resmi Estafet Balon',
    tagline: 'Lomba Tim · Berdampingan, Tanpa Tangan, Balon Tetap Utuh',
    left: {
      subtitle: '',
      cards: [
        { number: 1, title: 'Tujuan Lomba', body: [{ type: 'paragraph', text: 'Lomba ini bertujuan untuk menguji kerja sama tim, keseimbangan, dan kekompakan peserta dalam membawa balon di antara perut/dada dua anggota tanpa menggunakan tangan. Tim yang paling sinkron dan hati-hati akan keluar sebagai pemenang.' }] },
        { number: 2, title: 'Peserta', body: [{ type: 'list', items: ['Jenis lomba: Tim.', 'Jumlah anggota per tim: 4 orang.', 'Pendaftaran: Dilakukan sebelum jadwal lomba dimulai.', 'Komposisi tim: Bebas (tidak dibatasi gender/divisi).'] }] },
        { number: 3, title: 'Persiapan', body: [{ type: 'list', items: ['Setiap tim berdiri berjajar di garis start.', 'Balon diletakkan di antara perut/dada dua anggota yang berdampingan.', 'Jarak antar pos estafet ditentukan oleh panitia (umumnya 5 meter).', 'Tangan peserta tidak boleh menyentuh balon.'] }] },
        { number: 4, title: 'Cara Bermain', body: [{ type: 'list', items: ['Setelah peluit, dua anggota berjalan berdampingan membawa balon di perut/dada.', 'Sampai di pos berikutnya, balon diteruskan ke pasangan anggota berikutnya.', 'Estafet berlanjut hingga pasangan terakhir sampai ke garis finish.', 'Tim yang pertama sampai finish dengan balon utuh menang.'] }] },
        { number: 5, title: 'Aturan Peserta', body: [
          { type: 'allowed', items: ['Berjalan dengan kecepatan apa pun.', 'Berhenti sejenak untuk menjaga keseimbangan.'] },
          { type: 'forbidden', items: ['Menyentuh balon dengan tangan atau lengan.', 'Memegang balon dengan jari atau telapak tangan.', 'Menerima bantuan dari orang lain untuk memegang balon.', 'Sengaja memecahkan balon tim lain.'] },
        ]},
      ],
    },
    right: {
      subtitle: '',
      cards: [
        { number: 6, title: 'Penilaian', body: [{ type: 'table', headers: ['Aspek', 'Keterangan'], rows: [
          ['Waktu Tempuh', 'Dihitung dari peluit hingga finish'],
          ['Balon Meletus', 'Tim kembali ke posisi sebelumnya, balon diganti'],
          ['Balon Jatuh', 'Tim kembali ke posisi sebelumnya'],
          ['Menyentuh Balon dengan Tangan', 'Diskualifikasi'],
          ['Tim Tidak Lengkap', 'Diskualifikasi'],
          ['Menerima Bantuan', 'Diskualifikasi'],
        ]}]},
        { number: 7, title: 'Ketentuan Balon Meletus/Jatuh', body: [{ type: 'callout', text: 'Aturan balon: Jika balon meletus, tim kembali ke posisi sebelumnya dan panitia memberi balon baru. Jika balon jatuh, balon dipungut dan tim kembali ke posisi sebelumnya. Waktu tetap berjalan selama proses pengembalian.' }] },
        { number: 8, title: 'Penentuan Pemenang', body: [{ type: 'list', items: ['Pemenang adalah tim pertama yang sampai finish dengan balon utuh.', 'Jika terjadi seri, diadakan babak tambahan (rematch).', 'Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat.'] }] },
        { number: 9, title: 'Fair Play', body: [
          { type: 'forbidden', items: ['Mengganggu tim lain (mendorong, memecahkan balon).', 'Memegang balon dengan tangan saat estafet.', 'Mengganti anggota setelah lomba dimulai.'] },
          { type: 'callout', text: '*Pelanggaran berat dapat berakibat diskualifikasi.' },
        ]},
      ],
    },
    prinsip: [
      { label: 'Teamwork', text: 'Kekompakan dua anggota jadi kunci.' },
      { label: 'Balance', text: 'Keseimbangan dan kehati-hatian menentukan.' },
      { label: 'Persistence', text: 'Tidak menyerah meski balon jatuh/meletus.' },
      { label: 'Fun', text: 'Suasana tetap seru dan menghibur.' },
    ],
  },

  'Turnamen Voli Terpal + Daster': {
    title: 'Peraturan Resmi Turnamen Voli Terpal + Daster',
    tagline: 'Antar Divisi · Daster, Sarung, dan Terpal yang Mengikat',
    left: {
      subtitle: '',
      cards: [
        { number: 1, title: 'Tujuan Lomba', body: [{ type: 'paragraph', text: 'Turnamen ini bertujuan untuk mempererat kebersamaan antar divisi melalui olahraga voli dengan twist unik: pemain memakai daster dan sarung/batik, serta bola diganti terpal. Turnamen ini menguji kerja sama tim, keseimbangan, dan sportivitas dalam suasana yang menyenangkan.' }] },
        { number: 2, title: 'Peserta', body: [{ type: 'list', items: ['Jenis lomba: Antar Divisi.', 'Jumlah pemain per tim: 6–8 orang (6 pemain inti, sisanya cadangan).', 'Perwakilan: Setiap divisi mengirimkan 1 tim.', 'Pendaftaran: Dilakukan oleh koordinator divisi sebelum jadwal dimulai.'] }] },
        { number: 3, title: 'Aturan Pakaian', body: [{ type: 'list', items: ['Wajib memakai daster (untuk semua pemain, tidak terkecuali).', 'Wajib memakai sarung atau batik sebagai celana.', 'Sarung/batik harus tetap terpasang selama pertandingan.', 'Jika sarung/batik lepas, pemain harus memasangnya kembali sebelum lanjut bermain.', 'Sepatu/sandal bebas, namun disarankan memakai alas kaki yang aman.'] }] },
        { number: 4, title: 'Alat Permainan', body: [{ type: 'list', items: ['Bola diganti terpal yang diikat/dilipat sehingga aman untuk dimainkan.', 'Terpal tidak boleh dipegang dengan tangan terbuka (telapak tangan).', 'Terpal harus dipukul/dorong dengan telapak tangan tertutup, lengan, atau bagian tubuh lain.', 'Terpal disediakan oleh panitia — tidak boleh diganti.'] }] },
        { number: 5, title: 'Sistem Pertandingan', body: [{ type: 'list', items: ['Sistem: Half-set, rally sampai 15 poin.', 'Format: Best of 3 (siapa menang 2 set lebih dulu, menang).', 'Rotasi pemain: Sesuai aturan voli standar (searah jarum jam).', 'Ganti pemain: Boleh dilakukan saat bola mati, maksimal 3 kali per set.'] }] },
        { number: 6, title: 'Aturan Sentuhan', body: [{ type: 'list', items: ['Pemain minimal 1 kali sentuhan sebelum terpal melewati net.', 'Maksimal 3 kali sentuhan per tim sebelum terpal melewati net.', 'Blok di net dihitung sebagai 1 sentuhan.', 'Sentuhan berturut-turut oleh pemain yang sama dilarang.'] }] },
      ],
    },
    right: {
      subtitle: '',
      cards: [
        { number: 7, title: 'Pelanggaran', body: [{ type: 'table', headers: ['Jenis Pelanggaran', 'Sanksi'], rows: [
          ['Terpal keluar lapangan', 'Poin untuk lawan'],
          ['Terpal tidak melewati net', 'Poin untuk lawan'],
          ['Memegang terpal dengan tangan terbuka', 'Poin untuk lawan'],
          ['Sentuhan lebih dari 3 kali', 'Poin untuk lawan'],
          ['Menyentuh net', 'Poin untuk lawan'],
          ['Kaki masuk lapangan lawan', 'Poin untuk lawan'],
          ['Sarung lepas & tidak dipasang kembali', 'Peringatan, lalu diskualifikasi'],
        ]}]},
        { number: 8, title: 'Fair Play', body: [
          { type: 'forbidden', items: ['Melakukan kontak fisik agresif dengan pemain lawan.', 'Merusak/mengganggu terpal atau net.', 'Berkata kasar atau provokatif kepada pemain/panitia.', 'Sengaja menahan permainan (time wasting).'] },
          { type: 'callout', text: '*Pelanggaran berat dapat berakibat diskualifikasi tim.' },
        ]},
        { number: 9, title: 'Penentuan Juara', body: [{ type: 'list', items: ['Juara ditentukan dari tim yang memenangkan 2 set lebih dulu.', 'Jika skor set 1–1, set ketiga (rubber set) dimainkan sampai 15 poin.', 'Sistem turnamen (gugur/liga) ditentukan oleh panitia sebelum turnamen dimulai.', 'Keputusan wasit bersifat mutlak dan tidak dapat diganggu gugat.'] }] },
        { number: 10, title: 'Safety', body: [{ type: 'callout', text: 'Catatan keselamatan: Terpal harus dalam kondisi baik dan tidak robek. Pemain dilarang memakai perhiasan yang dapat membahayakan. Jika pemain cedera, pertandingan dihentikan sementara dan pemain diganti cadangan.' }] },
      ],
    },
    prinsip: [
      { label: 'Togetherness', text: 'Mempererat kebersamaan antar divisi.' },
      { label: 'Teamwork', text: 'Kerja sama tim jadi kunci kemenangan.' },
      { label: 'Sportsmanship', text: 'Sportivitas di atas kemenangan.' },
      { label: 'Fun', text: 'Suasana tetap seru dan menghibur.' },
    ],
  },

  'Futsal Sarung': {
    title: 'Peraturan Resmi Futsal Sarung',
    tagline: 'Antar Divisi · Sarung Tetap Terpasang, Permainan Tetap Jalan',
    left: {
      subtitle: '',
      cards: [
        { number: 1, title: 'Tujuan Lomba', body: [{ type: 'paragraph', text: 'Turnamen ini bertujuan untuk mempererat kebersamaan antar divisi melalui permainan futsal dengan twist unik: seluruh pemain wajib memakai sarung selama pertandingan. Turnamen ini menguji kerja sama tim, keseimbangan, dan sportivitas dalam suasana yang menyenangkan.' }] },
        { number: 2, title: 'Peserta', body: [{ type: 'list', items: ['Jenis lomba: Antar Divisi.', 'Jumlah pemain per tim: 5 pemain inti + cadangan.', 'Perwakilan: Setiap divisi mengirimkan 1 tim.', 'Pendaftaran: Dilakukan oleh koordinator divisi sebelum jadwal dimulai.'] }] },
        { number: 3, title: 'Aturan Pakaian', body: [{ type: 'list', items: ['Semua pemain wajib memakai sarung selama pertandingan.', 'Sarung harus tetap terpasang — jika lepas, harus dipakai kembali sebelum lanjut bermain.', 'Sepatu futsal/sepatu olahraga wajib (tidak boleh telanjang kaki).', 'Daster/kaos bebas, namun disarankan memakai jersey/kaos tim.', 'Perhiasan dilarang dipakai selama pertandingan.'] }] },
        { number: 4, title: 'Durasi Pertandingan', body: [{ type: 'list', items: ['2 babak × 10 menit per babak.', 'Istirahat 5 menit antar babak.', 'Waktu tidak dihentikan saat bola keluar (running clock).', 'Waktu hanya dihentikan untuk cedera atau keputusan wasit.'] }] },
        { number: 5, title: 'Sistem Pertandingan', body: [{ type: 'list', items: ['Sistem gugur (knockout) — kalah sekali langsung gugur.', 'Tidak ada offside.', 'Pergantian pemain: Bebas, dilakukan saat bola mati.', 'Gol: Dapat dicetak dari mana saja di lapangan.'] }] },
        { number: 6, title: 'Aturan Permainan', body: [
          { type: 'allowed', items: ['Bermain dengan sarung yang terpasang dengan baik.', 'Mengganti pemain cadangan kapan saja saat bola mati.', 'Meminta waktu untuk memasang sarung yang lepas.'] },
          { type: 'forbidden', items: ['Bermain tanpa sarung (sarung lepas dan tidak segera dipasang).', 'Melakukan pelanggaran berat (tekel keras, dorongan, siksaan).', 'Berkata kasar atau provokatif.', 'Menentang keputusan wasit.'] },
        ]},
      ],
    },
    right: {
      subtitle: '',
      cards: [
        { number: 7, title: 'Kartu & Sanksi', body: [{ type: 'table', headers: ['Pelanggaran', 'Sanksi'], rows: [
          ['Pelanggaran ringan', 'Kartu kuning'],
          ['Pelanggaran berat', 'Kartu merah (keluar lapangan)'],
          ['Dua kartu kuning', 'Kartu merah otomatis'],
          ['Berkata kasar', 'Kartu kuning/merah (sesuai tingkat)'],
          ['Sarung lepas & tidak dipasang', 'Dikeluarkan sementara hingga dipasang'],
          ['Tim tidak lengkap (kurang dari 5)', 'Waktu tunggu 5 menit, lalu diskualifikasi'],
        ]}]},
        { number: 8, title: 'Penentuan Pemenang', body: [{ type: 'list', items: ['Pemenang adalah tim dengan skor terbanyak saat pertandingan berakhir.', 'Jika skor imbang, dilanjutkan dengan adu penalti (3 penalti per tim).', 'Jika masih seri, dilanjutkan dengan sudden death penalti.', 'Keputusan wasit bersifat mutlak dan tidak dapat diganggu gugat.'] }] },
        { number: 9, title: 'Fair Play', body: [
          { type: 'forbidden', items: ['Melakukan tekel dari belakang atau tekel keras.', 'Memukul, mendorong, atau menghina pemain lawan.', 'Memprotes keputusan wasit secara berlebihan.', 'Sengaja mengulur waktu (time wasting).'] },
          { type: 'callout', text: '*Pelanggaran berat dapat berakibat diskualifikasi tim.' },
        ]},
        { number: 10, title: 'Safety', body: [{ type: 'callout', text: 'Catatan keselamatan: Pemain dilarang memakai sepatu berstud panjang. Jika pemain cedera, pertandingan dihentikan dan pemain diganti cadangan. P3K dan air minum disediakan panitia di pinggir lapangan.' }] },
      ],
    },
    prinsip: [
      { label: 'Togetherness', text: 'Mempererat kebersamaan antar divisi.' },
      { label: 'Teamwork', text: 'Kerja sama tim jadi kunci kemenangan.' },
      { label: 'Sportsmanship', text: 'Sportivitas di atas kemenangan.' },
      { label: 'Fun', text: 'Suasana tetap seru dan menghibur.' },
    ],
  },
};
