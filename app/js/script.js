document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const cabinsByDate = {};

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "es",
    googleCalendarApiKey: "AIzaSyA9oBC737YKAhDfL4ewqK9TIFoVmoZZdq0", // Reemplaza con tu clave API
    events: {
      googleCalendarId: "95baba8d058d0917b515c2258002048bee0d3bbee52dac606f5b64a3c3d1959f@group.calendar.google.com", // Reemplaza con tu Calendar ID
      failure: function () {
        alert("No se pudieron cargar los eventos desde Google Calendar.");
      }
    },
    eventClick: function (info) {
      const selectedDate = info.event.startStr;
      const eventTitle = info.event.title;
      const cabins = eventTitle.includes(":")
        ? eventTitle.split(":")[1].split(",").map(c => c.trim())
        : ["Cabaña"];

      cabinsByDate[selectedDate] = cabins;

      document.getElementById("date").value = dayjs(selectedDate).format("YYYY-MM-DD");
      const cabinSelect = document.getElementById("cabin");
      cabinSelect.innerHTML = cabins
        .map(cabin => `<option value="${cabin}">${cabin}</option>`)
        .join("");
      cabinSelect.disabled = false;
    }
  });

  calendar.render();

  document.getElementById("reserve-button").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const selectedDate = document.getElementById("date").value.trim();
    const selectedCabin = document.getElementById("cabin").value.trim();

    if (!name || !surname || !phone || !selectedDate || !selectedCabin) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const phoneNumber = "1234567890"; // Reemplaza con el número del propietario
    const message = `Hola, soy ${name} ${surname}. Quiero reservar la ${selectedCabin} para el día ${selectedDate}. Mi número de contacto es ${phone}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  });
});
