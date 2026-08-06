/*
# Create registrations table (no-auth, single-tenant)

1. New Tables
  - `registrations`
    - `id` (uuid, primary key)
    - `nama` (text, not null) — nama peserta
    - `kategori` (text, not null) — kategori perlombaan
    - `tipe_lomba` (text, not null) — INDIVIDU, TEAM, or ANTAR_DIVISI
    - `divisi` (text, nullable) — divisi peserta (untuk lomba antar divisi)
    - `nama_tim` (text, nullable) — nama tim (untuk lomba team, opsional)
    - `anggota_tim` (text[], nullable) — daftar nama anggota tim (untuk lomba team 4 orang)
    - `created_at` (timestamptz, default now())

2. Security
  - Enable RLS on `registrations`.
  - Allow anon + authenticated CRUD (no login required, internal use).
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama text NOT NULL,
  kategori text NOT NULL,
  tipe_lomba text NOT NULL CHECK (tipe_lomba IN ('INDIVIDU', 'TEAM', 'ANTAR_DIVISI')),
  divisi text,
  nama_tim text,
  anggota_tim text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_registrations" ON registrations;
CREATE POLICY "anon_select_registrations" ON registrations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_registrations" ON registrations;
CREATE POLICY "anon_insert_registrations" ON registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_registrations" ON registrations;
CREATE POLICY "anon_update_registrations" ON registrations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_registrations" ON registrations;
CREATE POLICY "anon_delete_registrations" ON registrations FOR DELETE
  TO anon, authenticated USING (true);
