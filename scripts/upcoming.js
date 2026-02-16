(async function () {
  const list = document.getElementById("upcomingList");
  if (!list) return;

  // 1) HIER EINTRAGEN:
  const API_KEY = "DEIN_API_KEY";
  const CALENDAR_ID = "DEINE_KALENDER_ID@group.calendar.google.com"; // aus Google Kalender -> Integrate calendar

  const timeMin = new Date().toISOString();
  const maxResults = 6;

  const url =
    "https://www.googleapis.com/calendar/v3/calendars/" +
    encodeURIComponent(CALENDAR_ID) +
    "/events?key=" + encodeURIComponent(API_KEY) +
    "&singleEvents=true&orderBy=startTime" +
    "&timeMin=" + encodeURIComponent(timeMin) +
    "&maxResults=" + maxResults;

  function formatDate(isoOrDate) {
    const d = new Date(isoOrDate);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function formatTime(isoOrDate) {
    const d = new Date(isoOrDate);
    return d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API error: " + res.status);
    const data = await res.json();

    const items = (data.items || [])
      .filter(e => e.status !== "cancelled")
      .map(e => {
        const start = e.start.dateTime || e.start.date; // dateTime oder all-day (date)
        const isAllDay = !!e.start.date && !e.start.dateTime;
        const title = e.summary || "Event";
        const where = e.location || "";

        const when = isAllDay
          ? formatDate(start)
          : `${formatDate(start)} · ${formatTime(start)}`;

        return { title, where, when };
      });

    if (items.length === 0) {
      list.innerHTML = `<li class="upcoming-loading">Keine öffentlichen Termine eingetragen.</li>`;
      return;
    }

    list.innerHTML = items.map(ev => `
      <li>
        <span class="upcoming-what">${ev.when} — <strong>${ev.title}</strong></span>
        <span class="upcoming-where">${ev.where}</span>
      </li>
    `).join("");

  } catch (err) {
    list.innerHTML = `<li class="upcoming-loading">Termine konnten nicht geladen werden.</li>`;
    console.error(err);
  }
})();
