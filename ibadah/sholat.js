const showSidebar = (toggleId, sidebarId, headerId, mainId) => {
  const toggle = document.getElementById(toggleId),
    sidebar = document.getElementById(sidebarId),
    header = document.getElementById(headerId),
    main = document.getElementById(mainId);

  if (toggle && sidebar && header && main) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("show-sidebar");
      header.classList.toggle("left-pd");
      main.classList.toggle("left-pd");
    });
  }
};
showSidebar("header-toggle", "sidebar", "header", "main");

/*=============== LINK ACTIVE ===============*/
const sidebarLink = document.querySelectorAll(".sidebar__list a");

function linkColor() {
  sidebarLink.forEach((l) => l.classList.remove("active-link"));
  this.classList.add("active-link");
}

sidebarLink.forEach((l) => l.addEventListener("click", linkColor));

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-fill";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme)
    ? "ri-moon-clear-fill"
    : "ri-sun-fill";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[
    selectedIcon === "ri-moon-clear-fill" ? "add" : "remove"
  ](iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  const cards = document.querySelectorAll(".card-grid a");

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    if (text.includes(query)) {
      card.parentElement.parentElement.style.display = "block";
    } else {
      card.parentElement.parentElement.style.display = "none";
    }
  });
});

function openForm(day) {
  const form = document.getElementById("form");
  const dayInput = document.getElementById("day");
  const fajr = document.getElementById("fajr");
  const dhuhr = document.getElementById("dhuhr");
  const asr = document.getElementById("asr");
  const maghrib = document.getElementById("maghrib");
  const isha = document.getElementById("isha");
  const tarawih = document.getElementById("tarawih");
  const photo = document.getElementById("photo");
  const submitButton = form.querySelector('button[type="submit"]');

  dayInput.value = "Day " + day;

  const filled = localStorage.getItem("day" + day);
  if (filled) {
    const data = JSON.parse(filled);
    fajr.checked = data.fajr;
    dhuhr.checked = data.dhuhr;
    asr.checked = data.asr;
    maghrib.checked = data.maghrib;
    isha.checked = data.isha;
    tarawih.checked = data.tarawih;
    photo.disabled = true;
    submitButton.disabled = true;
  } else {
    fajr.checked = false;
    dhuhr.checked = false;
    asr.checked = false;
    maghrib.checked = false;
    isha.checked = false;
    tarawih.checked = false;
    photo.disabled = false;
    submitButton.disabled = false;
  }

  document.getElementById("prayer-form").style.display = "block";
  document.getElementById("prayer-form").scrollIntoView({ behavior: "smooth" });
}

function closeForm() {
  document.getElementById("prayer-form").style.display = "none";
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const day = document.getElementById("day").value.split(" ")[1];
  const fajr = document.getElementById("fajr").checked;
  const dhuhr = document.getElementById("dhuhr").checked;
  const asr = document.getElementById("asr").checked;
  const maghrib = document.getElementById("maghrib").checked;
  const isha = document.getElementById("isha").checked;
  const tarawih = document.getElementById("tarawih").checked;

  const data = {
    fajr,
    dhuhr,
    asr,
    maghrib,
    isha,
    tarawih,
  };

  localStorage.setItem("day" + day, JSON.stringify(data));
  document.getElementById("day-" + day).classList.add("filled");
  closeForm();
});

document.addEventListener("DOMContentLoaded", () => {
  for (let day = 1; day <= 30; day++) {
    if (localStorage.getItem("day" + day)) {
      document.getElementById("day-" + day).classList.add("filled");
    }
  }
});

function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("form");
  const rekapContainer = document.getElementById("rekap-container");
  const rekapTable = document
    .getElementById("rekap-table")
    .getElementsByTagName("tbody")[0];

  const day = form.day.value;
  const puasa = form.puasa.checked ? "Ya" : "Tidak";
  const tadarus = form.tadarus.checked ? "Ya" : "Tidak";
  const subuh = form.fajr.checked ? "Ya" : "Tidak";
  const dzuhur = form.dhuhr.checked ? "Ya" : "Tidak";
  const ashar = form.asr.checked ? "Ya" : "Tidak";
  const maghrib = form.maghrib.checked ? "Ya" : "Tidak";
  const isya = form.isha.checked ? "Ya" : "Tidak";
  const photo =
    form.photo.files.length > 0 ? URL.createObjectURL(form.photo.files[0]) : "";

  const newRow = rekapTable.insertRow();
  newRow.innerHTML = `
        <td>${day}</td>
        <td>${puasa}</td>
        <td>${tadarus}</td>
        <td>${subuh}</td>
        <td>${dzuhur}</td>
        <td>${ashar}</td>
        <td>${maghrib}</td>
        <td>${isya}</td>
        <td>${photo ? `<img src="${photo}" alt="Gambar">` : ""}</td>
        <td class="action-buttons">
            <button class="edit-button" onclick="editRow(this)">Edit</button>
            <button class="delete-button" onclick="deleteRow(this)">Hapus</button>
        </td>
    `;

  rekapContainer.style.display = "block";
  closeForm();
}

function openForm(day) {
  const form = document.getElementById("form");
  form.day.value = `Day ${day}`;
  document.getElementById("prayer-form").style.display = "block";
}

function closeForm() {
  document.getElementById("prayer-form").style.display = "none";
}

function editRow(button) {
  const row = button.parentElement.parentElement;
  const cells = row.getElementsByTagName("td");
  const form = document.getElementById("form");

  form.day.value = cells[0].innerText;
  form.puasa.checked = cells[1].innerText === "Ya";
  form.tadarus.checked = cells[2].innerText === "Ya";
  form.fajr.checked = cells[3].innerText === "Ya";
  form.dhuhr.checked = cells[4].innerText === "Ya";
  form.asr.checked = cells[5].innerText === "Ya";
  form.maghrib.checked = cells[6].innerText === "Ya";
  form.isha.checked = cells[7].innerText === "Ya";

  document.getElementById("prayer-form").style.display = "block";

  row.remove();
}

function deleteRow(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

//button
const dayGrid = document.getElementById("day-grid");
for (let day = 1; day <= 30; day++) {
  const button = document.createElement("button");
  button.className = "day-card";
  button.textContent = `Day ${day}`;
  button.onclick = () => openForm(day);
  button.id = `day-${day}`;
  dayGrid.appendChild(button);
}
