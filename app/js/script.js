document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const cabinsByDate = {};

  // Configurar FullCalendar
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
      // Manejar clic en un evento
      const selectedDate = info.event.startStr;
      const cabinSelect = document.getElementById("cabin");

      // Extraer cabañas del título del evento
      const eventTitle = info.event.title;
      const cabins = eventTitle.includes(":") 
        ? eventTitle.split(":")[1].split(",").map(c => c.trim()) 
        : ["Cabaña"];

      cabinsByDate[selectedDate] = cabins;

      // Actualizar opciones de cabañas
      cabinSelect.innerHTML = cabins
        .map(cabin => `<option value="${cabin}">${cabin}</option>`)
        .join("");
      cabinSelect.disabled = false;
    }
  });

  calendar.render();

  // Enviar mensaje por WhatsApp
  document.getElementById("reserve-button").addEventListener("click", function () {
    const selectedCabin = document.getElementById("cabin").value;
    const selectedDate = Object.keys(cabinsByDate).find(date => cabinsByDate[date].includes(selectedCabin));

    if (!selectedDate || !selectedCabin) {
      alert("Por favor, selecciona una fecha y una cabaña.");
      return;
    }

    const phoneNumber = "1234567890"; // Reemplaza con el número del propietario
    const message = `Hola, me gustaría reservar la ${selectedCabin} para la fecha: ${selectedDate}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  });
});
