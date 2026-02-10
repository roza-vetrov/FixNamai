const lat = 54.6977629;
const lng = 25.2202963;

const map = L.map('map', {
  attributionControl: false
}).setView([lat, lng], 16);

// -----------------------------
// Tile layers
// -----------------------------
const darkLayer = L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=YOUR_API_KEY',
  {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
  }
);

const streetLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }
);

const satelliteLayer = L.tileLayer(
  'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
  { maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'], attribution: '© Google' }
);

// Paleidžiame map su dark layer
darkLayer.addTo(map);

// -----------------------------
// Juodas markeris
// -----------------------------
const darkGrayIcon = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-grey.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.marker([lat, lng], { icon: darkGrayIcon })
  .addTo(map)
  .bindPopup('Laisves prospektas 42, Vilnius')
  .openPopup();

// -----------------------------
// Layer control (kaip „switch map view“)
// -----------------------------
const baseMaps = {
  "Tamsus / Dark": darkLayer,
  "Street / OSM": streetLayer,
  //"Satellite": satelliteLayer // jei reikia, galima pridėti
};

L.control.layers(baseMaps).addTo(map);


    let lastScroll = 0;
const stickyBar = document.getElementById('sticky-bar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 350 && currentScroll > lastScroll) {
    stickyBar.classList.add('active');
  } else if (currentScroll < lastScroll) {
    stickyBar.classList.remove('active');
  }

  lastScroll = currentScroll;
});
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  scrollBar.style.width = scrollPercent + '%';
});


const currentBtn = document.getElementById('current-lang');
const optionsDiv = document.getElementById('lang-options');
const texts = document.querySelectorAll('[data-lang]');

let currentLang = 'LT';

// Funkcija atnaujinti tekstus pagal kalbą
function updateText(lang) {
  texts.forEach(el => {
    el.style.display = el.getAttribute('data-lang') === lang ? 'block' : 'none';
  });
}

// Funkcija atnaujinti dropdown options pagal dabartinę kalbą
function updateOptions() {
  const langs = ['LT','EN','RU'].filter(l => l !== currentLang);
  optionsDiv.innerHTML = '';
  langs.forEach(l => {
    const div = document.createElement('div');
    div.className = 'lang-option';
    div.setAttribute('data-lang', l);
    div.textContent = l;
    div.addEventListener('click', () => {
      currentLang = l;
      currentBtn.textContent = l + ' ';
      updateText(l);
      updateOptions();
      optionsDiv.style.display = 'none';
    });
    optionsDiv.appendChild(div);
  });
}

// Rodyti / slėpti options
currentBtn.addEventListener('click', () => {
  optionsDiv.style.display = optionsDiv.style.display === 'none' ? 'block' : 'none';
});

// Uždaryti, jei paspaudžiama už lango
document.addEventListener('click', (e) => {
  if (!document.getElementById('lang-switcher').contains(e.target)) {
    optionsDiv.style.display = 'none';
  }
});

// Inicializuoti
currentBtn.textContent = currentLang + ' ';
updateText(currentLang);
updateOptions();





document.querySelectorAll('.onea img, .two img, .tria img, .twwo img, .trii, .b1, .b2, .b3, .b4, .b5, .b6, .b7').forEach(img => {
  img.style.cursor = 'zoom-in';

  img.addEventListener('click', () => {
    if (document.querySelector('.zoom-clone')) return;

    const rect = img.getBoundingClientRect();

    const overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    document.body.appendChild(overlay);

    const clone = img.cloneNode();
    clone.className = 'zoom-clone';

    Object.assign(clone.style, {
      top: rect.top + 'px',
      left: rect.left + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
      borderRadius: getComputedStyle(img).borderRadius
    });

    document.body.appendChild(clone);

    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      overlay.classList.add('active');

      Object.assign(clone.style, {
        top: '5vh',
        left: '5vw',
        width: '90vw',
        height: '90vh',
        borderRadius: '22px'
      });
    });

    const closeZoom = () => {
      overlay.classList.remove('active');

      Object.assign(clone.style, {
        top: rect.top + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        borderRadius: getComputedStyle(img).borderRadius
      });

      const cleanup = () => {
        clone.remove();
        overlay.remove();
        document.body.style.overflow = '';
      };

      clone.addEventListener('transitionend', cleanup, { once: true });

      window.removeEventListener('scroll', closeZoom);
      document.removeEventListener('keydown', escHandler);
    };

    const escHandler = e => {
      if (e.key === 'Escape') closeZoom();
    };

    overlay.addEventListener('click', closeZoom);
    clone.addEventListener('click', closeZoom);
    window.addEventListener('scroll', closeZoom, { once: true });
    document.addEventListener('keydown', escHandler);
  });
});




// ================= MODAL =================
const openModal = document.getElementById('openModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

const showLogin = document.getElementById('showLogin');
const showRegister = document.getElementById('showRegister');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const problemForm = document.getElementById('problemForm');

openModal.onclick = () => {
  modalOverlay.style.display = 'flex';
  document.body.classList.add('no-scroll');

  loginForm.style.display = 'flex';
  registerForm.style.display = 'none';
  problemForm.style.display = 'none';
};

function closeAndReset() {
  modalOverlay.style.display = 'none';
  document.body.classList.remove('no-scroll');

  loginForm.reset();
  registerForm.reset();
  problemForm.reset();

  document.getElementById('loginError').textContent = '';
  document.getElementById('regError').textContent = '';
}

closeModal.onclick = closeAndReset;

// ================= TABS =================
showLogin.onclick = () => {
  loginForm.style.display = 'flex';
  registerForm.style.display = 'none';
  problemForm.style.display = 'none';
};

showRegister.onclick = () => {
  registerForm.style.display = 'flex';
  loginForm.style.display = 'none';
  problemForm.style.display = 'none';
};

// ================= HELPERS =================
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// ================= INPUT FILTERS =================
// Phone: only digits and +
document.getElementById('regPhone').addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9+]/g, '');
});

// Name & surname: only letters
function onlyLetters(input) {
  input.value = input.value.replace(/[^a-zA-Zа-яА-ЯąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g, '');
}

document.getElementById('regName').oninput = function () {
  onlyLetters(this);
};
document.getElementById('regSurname').oninput = function () {
  onlyLetters(this);
};

// ================= REGISTER =================
document.getElementById('registerSubmit').onclick = () => {
  const name = regName.value.trim();
  const surname = regSurname.value.trim();
  const phone = regPhone.value.trim();
  const email = regEmail.value.trim();
  const pass = regPass.value;
  const pass2 = regPassConfirm.value;
  const error = regError;

  if (!name || !surname || !phone || !email || !pass || !pass2) {
    error.textContent = error.dataset.lt;
    return;
  }

  if (pass !== pass2) {
    error.textContent = 'Slaptazodziai nesutampa';
    return;
  }

  let users = getUsers();

  if (users.find(u => u.email === email)) {
    error.textContent = 'Toks vartotojas jau egzistuoja';
    return;
  }

  users.push({ name, surname, phone, email, pass });
  saveUsers(users);

  error.textContent = '';
  registerForm.style.display = 'none';
  problemForm.style.display = 'flex';
};

// ================= LOGIN =================
document.getElementById('loginSubmit').onclick = () => {
  const user = loginUser.value.trim();
  const pass = loginPass.value;
  const error = loginError;

  if (!user || !pass) {
    error.textContent = error.dataset.lt;
    return;
  }

  let users = getUsers();

  const found = users.find(
    u => (u.email === user || u.phone === user) && u.pass === pass
  );

  if (!found) {
    error.textContent = 'Neteisingi duomenys arba vartotojas neegzistuoja';
    return;
  }

  error.textContent = '';
  loginForm.style.display = 'none';
  problemForm.style.display = 'flex';
};

// ================= PROBLEM =================
document.getElementById('problemSubmit').onclick = () => {
  const city = citySelect.value;
  const service = serviceSelect.value;
  const desc = problemDesc.value.trim();

  if (!city || !service || !desc) {
    alert('Uzpildykite visus laukus');
    return;
  }

  alert('Problema issiusta!');
  closeAndReset();
};
// ===== LANGUAGE SYNC (PLACEHOLDERS + ERRORS + ALERTS) =====

// получить активный язык в нижнем регистре
function getLang() {
  return currentLang.toLowerCase(); // lt | en | ru
}

// ---- PLACEHOLDERS ----
function updatePlaceholders() {
  const lang = getLang();

  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    if ('placeholder' in el) {
      el.placeholder = el.dataset[lang];
    }
  });
}

// ---- ERRORS ----
function setError(el, key = null) {
  const lang = getLang();
  if (!el) return;
  el.textContent = el.dataset[lang] || '';
}

// ---- ALERT ----
function showAlert(el) {
  const lang = getLang();
  if (!el) return;
  alert(el.dataset[lang]);
}

// ---- HOOK INTO YOUR LANGUAGE SWITCH ----
const _oldUpdateText = updateText;
updateText = function (lang) {
  _oldUpdateText(lang);
  updatePlaceholders();
};
// ================= LANGUAGE TEXTS =================
const i18n = {
  LT: {
    fillAll: 'Užpildykite visus laukus',
    passMismatch: 'Slaptažodžiai nesutampa',
    userExists: 'Toks vartotojas jau egzistuoja',
    loginFail: 'Neteisingi duomenys arba vartotojas neegzistuoja',
    problemSent: 'Problema sėkmingai išsiųsta!',
  },
  EN: {
    fillAll: 'Please fill all fields',
    passMismatch: 'Passwords do not match',
    userExists: 'User already exists',
    loginFail: 'Incorrect data or user does not exist',
    problemSent: 'Problem successfully sent!',
  },
  RU: {
    fillAll: 'Заполните все поля',
    passMismatch: 'Пароли не совпадают',
    userExists: 'Пользователь уже существует',
    loginFail: 'Неверные данные или пользователь не найден',
    problemSent: 'Заявка успешно отправлена!',
  }
};
function updatePlaceholdersAndErrors() {
  document.querySelectorAll('[data-lt]').forEach(el => {
    if (el.placeholder !== undefined) {
      el.placeholder = el.dataset[currentLang.toLowerCase()];
    }
  });

  document.querySelectorAll('.error-msg').forEach(el => {
    el.textContent = '';
  });
}
document.getElementById('registerSubmit').onclick = () => {
  const name = regName.value.trim();
  const surname = regSurname.value.trim();
  const phone = regPhone.value.trim();
  const email = regEmail.value.trim();
  const pass = regPass.value;
  const pass2 = regPassConfirm.value;
  const error = regError;

  if (!name || !surname || !phone || !email || !pass || !pass2) {
    error.textContent = i18n[currentLang].fillAll;
    return;
  }

  if (pass !== pass2) {
    error.textContent = i18n[currentLang].passMismatch;
    return;
  }

  let users = getUsers();

  if (users.find(u => u.email === email)) {
    error.textContent = i18n[currentLang].userExists;
    return;
  }

  users.push({ name, surname, phone, email, pass });
  saveUsers(users);

  error.textContent = '';
  registerForm.style.display = 'none';
  problemForm.style.display = 'flex';
};
document.getElementById('loginSubmit').onclick = () => {
  const user = loginUser.value.trim();
  const pass = loginPass.value;
  const error = loginError;

  if (!user || !pass) {
    error.textContent = i18n[currentLang].fillAll;
    return;
  }

  let users = getUsers();

  const found = users.find(
    u => (u.email === user || u.phone === user) && u.pass === pass
  );

  if (!found) {
    error.textContent = i18n[currentLang].loginFail;
    return;
  }

  error.textContent = '';
  loginForm.style.display = 'none';
  problemForm.style.display = 'flex';
};
document.getElementById('problemSubmit').onclick = () => {
  const city = citySelect.value;
  const service = serviceSelect.value;
  const desc = problemDesc.value.trim();

  if (!city || !service || !desc) {
    alert(i18n[currentLang].fillAll);
    return;
  }

  alert(i18n[currentLang].problemSent);
  closeAndReset();
};

updatePlaceholdersAndErrors();




const openBtn = document.getElementById('openGallery');
const modal = document.getElementById('galleryModal');
const closeBtn = document.querySelector('.gallery-close');
const images = document.querySelectorAll('.gallery-grid img');

let activeImage = null;

/* OPEN MODAL */
openBtn.onclick = () => {
  modal.style.display = 'flex';

  // visada ijungiama pirma foto
  if (images.length > 0) {
    setActiveImage(images[0]);
  }
};

/* CLOSE MODAL */
closeBtn.onclick = () => {
  modal.style.display = 'none';
  clearActiveImage();
};

/* IMAGE CLICK */
images.forEach(img => {
  img.onclick = () => {
    setActiveImage(img);
  };
});

/* FUNCTIONS */
function setActiveImage(img) {
  if (activeImage) {
    activeImage.classList.remove('zoomed');
  }
  img.classList.add('zoomed');
  activeImage = img;
}

function clearActiveImage() {
  if (activeImage) {
    activeImage.classList.remove('zoomed');
    activeImage = null;
  }
}

