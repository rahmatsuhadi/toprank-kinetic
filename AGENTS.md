<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project-Specific Coding Standards

## TypeScript Rules
- **No `any`**: Dilarang keras menggunakan tipe `any`. Semua tipe data harus terdefinisi dengan jelas dan bertipe ketat (strict typing).

## Component & Folder Architecture
- **Atomic Design**: Struktur komponen wajib mengikuti konsep Atomic Design (atoms, molecules, organisms, templates).
- **Modular Separation**: Pecah kode halaman (`page.tsx`) menjadi bagian-bagian kecil. Pisahkan antara logic dan UI component. Jangan menumpuk semua kode di dalam satu file halaman.
- **Server vs Client Components**: Halaman (`page.tsx`) harus berupa Server Component secara default. Bagian interaktif/form harus dibuat sebagai Client Component (`"use client"`) terpisah.

## Data Fetching & State
- **Database Requests (Mutations)**: Gunakan `useActionState` (React 19) untuk menangani form submission/state mutation yang berinteraksi dengan database.
- **Data Fetching (Read)**: Gunakan React hook untuk mendapatkan data (read) di sisi Client.

## UI & Notification
- **No Native Alerts**: Dilarang keras menggunakan `alert()` bawaan browser. Wajib menggunakan komponen toast `sonner` untuk menampilkan notifikasi/feedback ke user.

