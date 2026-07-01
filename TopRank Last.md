
## Sistem Study Case
Mambangun Ekosistem Talenta Mahasiswa Berbasis Gamification

### Latar Belakang

Perguruan tinggi memiliki ribuan mahasiswa dengan beragam kompetensi, minat, pengalaman, prestasi, serta aktivitas akademik maupun non-akademik. Namun, informasi tersebut sering kali tersebar di berbagai platform atau bahkan tidak terdokumentasi dengan baik.

## Tantangan

1. Perguruan Tinggi sulit mengidentifikasi mahasiswa yang memiliki kompetensi tertentu. 
2. Perguruan Tinggi sulit menemukan mahasiswa yang sesuai ketika terdapat kebutuhan dari industri. 
3. Perguruan Tinggi seringkali belum memiliki basis data talenta mahasiswa yang terintegrasi. 
4. Baik mahasiswa maupun perguruan tinggi sulit melakukan link and match antara keahlian mahasiswa satu dengan mahasiswa lainnya untuk berkolaborasi. 
5. Unit kegiatan mahasiswa, dosen, maupun organisasi kampus kesulitan mencari mahasiswa dengan keahlian spesifik, seperti programmer, UI/UX designer, fotografer, videografer, MC, content creator, translator, tutor, hingga event organizer. 
6. Potensi mahasiswa di luar bidang akademik sering kali tidak terdokumentasi sehingga kurang mendapatkan kesempatan untuk berkembang. 
7. Belum adanya mekanisme reward untuk mahasiswa yang lebih aktif dalam kegiatan-kegiatan diluar perkuliahan

Di sisi lain, mahasiswa juga belum memiliki wadah yang mampu menunjukkan portofolio, pencapaian, pengalaman, maupun kontribusinya secara berkelanjutan. Akibatnya, banyak potensi yang belum terlihat dan belum termanfaatkan secara optimal oleh perguruan tinggi maupun mitra industri.


### Challenge
Merancang dan mengembangkan Minimum Viable Product (MVP) platform digital yang mampu membantu perguruan tinggi membangun University Talent Hub, yaitu sebuah ekosistem untuk memetakan, mengembangkan, serta mempertemukan talenta mahasiswa dengan berbagai peluang.

Platform yang dikembangkan tidak hanya berfungsi sebagai media pencarian talenta, tetapi juga mampu meningkatkan keterlibatan mahasiswa melalui pendekatan yang menarik, interaktif, dan berkelanjutan.


### Kebutuhan Fitur

#### Admin

1. Login ke aplikasi. 
2. Melihat dashboard statistik (jumlah mahasiswa, jumlah skill, project mahasiswa, dll). 
3. Melihat seluruh data mahasiswa. 
4. Mencari mahasiswa berdasarkan kompetensi. 
5. Memverifikasi pengajuan skill. 
6. Memverifikasi sertifikat. 
7. Memverifikasi portfolio. 
8. Menyetujui atau menolak pengajuan mahasiswa. 
9. Memberikan poin terhadap pengajuan yang disetujui. 
10. Mengelola daftar reward (misalnya 10 poin bisa ditukar dengan voucher belanja di kantin perguruan tinggi) 
11. Melihat leaderboard mahasiswa. 
12. Posting opportunity untuk mahasiswa

#### Mahasiswa
1. Login ke aplikasi. 
2. Melengkapi profil. 
3. Menambahkan skill. 
4. Mengunggah sertifikat. 
5. Mengunggah portfolio. 
6. Mengajukan data untuk diverifikasi. 
7. Melihat status pengajuan. 
8. Melihat leaderboard. 
9. Melihat reward. 
10. Mendapatkan rekomendasi berbasis AI

### Alur bisnis

MVP
```text
Mahasiswa
    │
    ▼
Mengisi Profil
    │
    ▼
Menambah Skill / Sertifikat / Portfolio
    │
    ▼
Submit untuk Verifikasi
    │
    ▼
Administrator Melakukan Review
    │
    ├───────────────┐
    │               │
    ▼               ▼
Reject          Approve
    │               │
    ▼               ▼
Tidak Memberikan   Memberikan Point
Point              │
                   ▼
           Leaderboard Terupdate
                   │
                   ▼
    Bisa Memilih Reward Sesuai Poin yang Dimiliki
```


Bebas Dikembangkan namun tetep mempertahankan proses verifikasi sebelum poin diberikan

### Contoh Aturan Poin

**Point hanya diberikan setelah proses verifikasi.**

| Aktivitas | Contoh Point |
|------------|-------------:|
| Sertifikat Lokal | 1 |
| Sertifikat Regional | 3 |
| Sertifikat Nasional | 5 |
| Sertifikat Internasional | 10 |
| Portfolio Personal | 2 |
| Portfolio Freelance | 5 |
| Portfolio Industri | 8 |
| Juara Kompetisi | 10 |

## Aspek Requement

### Role Administrator 

| Requirement                                                                  |  Point |
| ---------------------------------------------------------------------------- | -----: |
| Authentication Admin (Login & Logout)                                        |     10 |
| Dashboard (Jumlah mahasiswa, jumlah skill, project mahasiswa, dan lain-lain) |     10 |
| Data Mahasiswa (Search berdasarkan skill dan poin)                           |     10 |
| Verification Skill / Portfolio (Approve/Reject pengajuan mahasiswa)          |     10 |
| Reward Management (Posting reward dan poin yang dibutuhkan untuk claim)      |     10 |
| **Total**                                                                    | **50** |

### Role Mahasiswa (60 Point)

| Requirement | Point |
|-------------|------:|
| Authentication (Login & Logout) | 10 |
| Talent Profile | 10 |
| Skill Management (Pengajuan verifikasi skill dan bukti) | 10 |
| Portfolio Management (Pengajuan verifikasi portofolio dan bukti) | 10 |
| Leaderboard | 10 |
| Reward Catalog (Claim reward dari poin yang dimiliki) | 10 |
| **Total** | **60** |
