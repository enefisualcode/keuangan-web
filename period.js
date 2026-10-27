/* Aturan periode penggajian. Semua tanggal kalender diproses sebagai tanggal
 * Asia/Jakarta; representasi UTC hanya dipakai agar hasil tidak dipengaruhi
 * zona waktu komputer yang membuka dashboard. */
(function(root, factory){
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.PeriodUtils = api;
})(typeof window !== "undefined" ? window : globalThis, function(){
  const PAYDAY = 25;
  const JAKARTA = "Asia/Jakarta";

  function dateKeyToDate(key){
    const [y,m,d] = key.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  }
  function toKey(date){
    return date.getUTCFullYear() + "-" + String(date.getUTCMonth()+1).padStart(2,"0") + "-" + String(date.getUTCDate()).padStart(2,"0");
  }
  function addDays(date, amount){
    const copy = new Date(date);
    copy.setUTCDate(copy.getUTCDate() + amount);
    return copy;
  }
  function isWeekend(date){
    const day = date.getUTCDay();
    return day === 0 || day === 6;
  }
  function actualPayday(year, monthIndex, holidays){
    const holidaySet = holidays instanceof Set ? holidays : new Set(holidays || []);
    let date = new Date(Date.UTC(year, monthIndex, PAYDAY));
    while (isWeekend(date) || holidaySet.has(toKey(date))) date = addDays(date, -1);
    return date;
  }
  function periodForKey(key, holidays){
    const date = dateKeyToDate(key);
    let start = actualPayday(date.getUTCFullYear(), date.getUTCMonth(), holidays);
    if (date < start) start = actualPayday(date.getUTCFullYear(), date.getUTCMonth() - 1, holidays);
    const next = actualPayday(start.getUTCFullYear(), start.getUTCMonth() + 1, holidays);
    return { key: toKey(start).slice(0, 7), start, end: addDays(next, -1), next };
  }
  function periodForCode(code, holidays){
    const [year, month] = code.split("-").map(Number);
    const start = actualPayday(year, month - 1, holidays);
    const next = actualPayday(year, month, holidays);
    return { key: code, start, end: addDays(next, -1), next };
  }
  function periodKey(key, holidays){ return periodForKey(key, holidays).key; }
  function jakartaTodayKey(now){
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: JAKARTA, year:"numeric", month:"2-digit", day:"2-digit"
    }).formatToParts(now || new Date());
    const values = Object.fromEntries(parts.filter(p => p.type !== "literal").map(p => [p.type, p.value]));
    return values.year + "-" + values.month + "-" + values.day;
  }
  return { PAYDAY, JAKARTA, dateKeyToDate, toKey, addDays, actualPayday, periodForKey, periodForCode, periodKey, jakartaTodayKey };
});
