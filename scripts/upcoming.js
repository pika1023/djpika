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

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function formatTime(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Google Calendar API error: " + res.status);
    const data = await res.json();

    const items = (data.items || [])
      .filter(e => e.status !== "cancelled")
      .map(e => {
        const start = e.start.dateTime || e.start.date; // dateTime oder all-day
        const isAllDay = !!e.start.date && !e.start.dateTime;

        return {
          title: e.summary || "Event",
          where: e.location || "",
          when: isAllDay ? formatDate(start) : `${formatDate(start)} · ${formatTime(start)}`
        };
      });

    if (items.length === 0) {
      list.innerHTML = `<li class="upcoming-loading">Keine Termine eingetragen.</li>`;
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
