/*
 * Daftar tanggal merah dan cuti bersama (format YYYY-MM-DD, zona waktu
 * Asia/Jakarta). Tambahkan tanggal baru di sini tanpa mengubah logika periode.
 */
const TANGGAL_LIBUR = [
  // Hari libur nasional/cuti bersama 2026 yang relevan untuk dashboard.
  "2026-01-01", "2026-01-16", "2026-02-17", "2026-03-19",
  "2026-03-20", "2026-03-21", "2026-03-22", "2026-03-23",
  "2026-04-03", "2026-04-05", "2026-05-01", "2026-05-14",
  "2026-05-15", "2026-05-27", "2026-05-28", "2026-05-29",
  "2026-06-01", "2026-06-16", "2026-07-24", "2026-08-17", "2026-08-25",
  "2026-11-24", "2026-11-25", // kalender payroll internal; sesuaikan bila berubah
  "2026-12-25", "2026-12-24"
];

if (typeof module !== "undefined") module.exports = { TANGGAL_LIBUR };
