const assert = require("node:assert/strict");
const { actualPayday, periodForKey, toKey } = require("../period.js");
const { TANGGAL_LIBUR } = require("../holidays.js");

assert.equal(toKey(actualPayday(2026, 9, [])), "2026-10-23"); // 25 Oktober, Minggu
assert.equal(toKey(actualPayday(2026, 6, TANGGAL_LIBUR)), "2026-07-23"); // 25 Juli, Sabtu + 24 Juli cuti
assert.equal(toKey(actualPayday(2026, 10, ["2026-11-25"])), "2026-11-24"); // tanggal libur

const oktober = periodForKey("2026-10-24", TANGGAL_LIBUR);
assert.equal(toKey(oktober.start), "2026-10-23");
assert.equal(toKey(oktober.end), "2026-11-22");

console.log("period tests passed");
