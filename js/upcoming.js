(async function () {
  const list = document.getElementById("upcomingList");
  if (!list) return;

  // TODO: hier deinen API Key eintragen
  const API_KEY = "AIzaSyDlYCgAQkAB3L1bhORGmZBWMaNnoHhuEIo";

  // Deine Kalender-ID (von dir)
  const CALENDAR_ID =
    "b740ddb963a8c1997104e4e1e8f35fa8733ca8b8f540d35cd17e266a6ea851a4@group.calendar.google.com";

  const timeMin = new Date().toISOString();
  const maxResults = 6;

  const url =
    "https://www.googleapis.com/calendar/v3/calendars/" +
    encodeURIComponent(CALENDAR_ID) +
    "/events?key=" + encodeURIComponent(API_KEY) +
    "&singleEvents=true&orderBy=startTime" +
    "&timeMin=" + encodeURIComponent(timeMin) +
    "&maxResults=" + maxResults;

  function formatDateLong(iso) {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleDateString("de-DE", { month: "long" });
  const year = d.getFullYear();
  return `${day}. ${month}, ${year}`;
}

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Google Calendar API error: " + res.status);
    const data = await res.json();

    const items = (data.items || [])
  .filter(e => e.status !== "cancelled")
  .map(e => {
    const start = e.start.dateTime || e.start.date;
    return {
      title: e.summary || "Event",
      where: e.location || "",
      when: formatDateLong(start)
    };
  });

if (items.length === 0) {
  list.innerHTML = `
    <div class="upcoming-row">
      <div class="upcoming-date">Keine Termine eingetragen.</div>
      <div class="upcoming-title"></div>
      <div class="upcoming-loc"></div>
    </div>`;
  return;
}

list.innerHTML = items.map(ev => `
  <div class="upcoming-row">
    <div class="upcoming-date">${ev.when}</div>
    <div class="upcoming-title">${ev.title}</div>
    <div class="upcoming-loc">${ev.where || ""}</div>
  </div>
`).join("");

  } catch (err) {
    list.innerHTML = `<li class="upcoming-loading">Termine konnten nicht geladen werden.</li>`;
    console.error(err);
  }
})();
