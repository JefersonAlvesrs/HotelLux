const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    }),
  );
}
const booking = document.getElementById("booking-form");
if (booking) {
  const checkin = document.getElementById("checkin"),
    checkout = document.getElementById("checkout"),
    result = document.getElementById("booking-result"),
    guests = document.getElementById("guests"),
    room = document.getElementById("room");
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  checkin.min = localToday;
  checkout.min = localToday;
  checkin.addEventListener("change", () => {
    checkout.min = checkin.value || localToday;
    if (checkout.value && checkout.value <= checkin.value) checkout.value = "";
  });
  booking.addEventListener("submit", (e) => {
    e.preventDefault();
    result.hidden = false;
    result.classList.remove("error");
    const from = checkin.value,
      to = checkout.value;
    const nights =
      from && to
        ? Math.round(
            (Date.parse(to + "T12:00:00Z") - Date.parse(from + "T12:00:00Z")) /
              86400000,
          )
        : 0;
    const max = { classic: 2, premium: 3, signature: 4 }[room.value];
    if (
      !from ||
      !to ||
      from < localToday ||
      nights <= 0 ||
      nights > 30 ||
      Number(guests.value) > max
    ) {
      result.classList.add("error");
      result.textContent =
        Number(guests.value) > max
          ? "A suíte escolhida não comporta esse número de hóspedes."
          : "Escolha datas válidas, com check-out após o check-in e estadia de até 30 noites.";
      return;
    }
    const rate = { classic: 890, premium: 1290, signature: 1890 }[room.value];
    const total = (nights * rate).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    result.innerHTML =
      "<strong>Simulação concluída!</strong><br>" +
      nights +
      " noite(s) · " +
      guests.value +
      " hóspede(s) · " +
      room.options[room.selectedIndex].text.split(" — ")[0] +
      "<br><strong>Estimativa: " +
      total +
      "</strong><br><small>Valor ilustrativo. Nenhuma reserva foi realizada.</small>";
  });
}
const contact = document.getElementById("contact-form");
if (contact) {
  contact.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = document.getElementById("contact-result");
    result.hidden = false;
    if (!contact.checkValidity()) {
      result.classList.add("error");
      result.textContent =
        "Preencha todos os campos corretamente (mensagem com ao menos 10 caracteres).";
      contact.reportValidity();
      return;
    }
    result.classList.remove("error");
    result.textContent =
      "Mensagem de teste validada com sucesso! Nenhuma informação foi enviada.";
    contact.reset();
  });
}
