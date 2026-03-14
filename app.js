const library = {
  "శ్రీ వినాయకుడు": [
    {
      title: "గణేశ పంచరత్నం",
      text: `ముదాకరాత్త మోదకం సదా విముక్తి సాధకం
కలాధరావతంసకం విలాసిలోక రక్షకం
అనాయకైక నాయకం వినాశితేభ దైత్యకం
నతాశుభాశు నాశకం నమామి తం వినాయకం`
    },
    {
      title: "గణపతి ప్రార్థన",
      text: `వక్రతుండ మహాకాయ సూర్యకోటి సమప్రభా
నిర్విఘ్నం కురుమే దేవ సర్వకార్యేషు సర్వదా`
    }
  ],
  "శ్రీ వెంకటేశ్వర స్వామి": [
    {
      title: "గోవింద నామాలు",
      text: `గోవింద గోవింద గోవింద
శ్రీనివాస గోవింద
వేంకట రమణ గోవింద
భక్త వత్సల గోవింద`
    },
    {
      title: "వెంకటేశ సుప్రభాతం (భాగం)",
      text: `కౌసల్యా సుప్రజా రామ పూర్వా సంద్యా ప్రవర్తతే
ఉత్తిష్ఠ నరశార్దూల కర్తవ్యం దైవమాహ్నికం`
    }
  ],
  "శ్రీ శివుడు": [
    {
      title: "లింగాష్టకం",
      text: `బ్రహ్మమురారి సురార్చిత లింగం
నిర్మల భాసిత శోభిత లింగం
జన్మజ దుఃఖ వినాశక లింగం
తత్ ప్రణమామి సదాశివ లింగం`
    },
    {
      title: "శివ పంచాక్షరీ",
      text: `నాగేంద్రహారాయ త్రిలోచనాయ
భస్మాంగరాగాయ మహేశ్వరాయ
నిత్యాయ శుద్ధాయ దిగంబరాయ
తస్మై నకారాయ నమః శివాయ`
    }
  ],
  "శ్రీ దుర్గమ్మ": [
    {
      title: "దుర్గా గాయత్రీ",
      text: `ఓం కాత్యాయనాయ విధ్మహే
కన్యకుమారి ధీమహి
తన్నో దుర్గి ప్రచోదయాత్`
    },
    {
      title: "అయ్యిగిరి నందిని (భాగం)",
      text: `అయి గిరినందిని నందిత మోదిని విశ్వ వినోదిని నందినుతే
గిరివర వింధ్య శిరోధి నివాసిని విష్ణు విలాసిని జిష్ణునుతే`
    }
  ]
};

const godSelect = document.getElementById("godSelect");
const songSelect = document.getElementById("songSelect");
const readingCard = document.getElementById("readingCard");
const songTitle = document.getElementById("songTitle");
const lyrics = document.getElementById("lyrics");
const themeToggle = document.getElementById("themeToggle");

function populateGods() {
  Object.keys(library).forEach((god) => {
    const option = document.createElement("option");
    option.value = god;
    option.textContent = god;
    godSelect.appendChild(option);
  });
}

function populateSongs(god) {
  songSelect.innerHTML = "";

  if (!god) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "ముందు దేవుడిని ఎంచుకోండి";
    songSelect.appendChild(option);
    songSelect.disabled = true;
    readingCard.hidden = true;
    return;
  }

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- పాట / స్తోత్రం --";
  songSelect.appendChild(defaultOption);

  library[god].forEach((song, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = song.title;
    songSelect.appendChild(option);
  });

  songSelect.disabled = false;
  readingCard.hidden = true;
}

function showSong(god, songIndex) {
  if (!god || songIndex === "") {
    readingCard.hidden = true;
    return;
  }

  const song = library[god][Number(songIndex)];
  songTitle.textContent = `${god} - ${song.title}`;
  lyrics.textContent = song.text;
  readingCard.hidden = false;
}

function setTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("bhaktimala-theme", isDark ? "dark" : "light");
}

function initTheme() {
  const savedTheme = localStorage.getItem("bhaktimala-theme");
  setTheme(savedTheme === "dark");
}

godSelect.addEventListener("change", (e) => {
  populateSongs(e.target.value);
});

songSelect.addEventListener("change", () => {
  showSong(godSelect.value, songSelect.value);
});

themeToggle.addEventListener("click", () => {
  const isDark = !document.documentElement.classList.contains("dark");
  setTheme(isDark);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

populateGods();
initTheme();
