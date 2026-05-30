const STORAGE_KEY = "moonbrew-study-island";

const characters = [
  {
    id: "black-witch-cat",
    name: "Black Witch Cat",
    type: "Cat familiar",
    group: "Cats",
    icon: "☾",
    charm: "Keeps your notes under moonlit protection.",
    css: {
      fur: "#18111f",
      belly: "#4B2E83",
      hat: "#2D1B4E",
      accent: "#B8A5E3",
      cheek: "#F7C8E0",
    },
  },
  {
    id: "white-moon-cat",
    name: "White Moon Cat",
    type: "Cat familiar",
    group: "Cats",
    icon: "✦",
    charm: "Purrs softly whenever a page gets finished.",
    css: {
      fur: "#FFF8E8",
      belly: "#B8A5E3",
      hat: "#4B2E83",
      accent: "#F7C8E0",
      cheek: "#FFB347",
    },
  },
  {
    id: "orange-pumpkin-cat",
    name: "Orange Pumpkin Cat",
    type: "Cat familiar",
    group: "Cats",
    icon: "●",
    charm: "Stacks your focus like tiny glowing pumpkins.",
    css: {
      fur: "#FFB347",
      belly: "#F7C8E0",
      hat: "#2D1B4E",
      accent: "#A7F3D0",
      cheek: "#FFF8E8",
    },
  },
  {
    id: "ghost-puppy",
    name: "Ghost Puppy",
    type: "Dog familiar",
    group: "Dogs",
    icon: "◇",
    charm: "Floats beside the desk with loyal little wags.",
    css: {
      fur: "#FFF8E8",
      belly: "#B8A5E3",
      hat: "#4B2E83",
      accent: "#A7F3D0",
      cheek: "#F7C8E0",
    },
  },
  {
    id: "witch-corgi",
    name: "Witch Corgi",
    type: "Dog familiar",
    group: "Dogs",
    icon: "✧",
    charm: "Patrols every break with maximum cozy authority.",
    css: {
      fur: "#D88942",
      belly: "#FFF8E8",
      hat: "#2D1B4E",
      accent: "#FFB347",
      cheek: "#F7C8E0",
    },
  },
  {
    id: "magic-husky",
    name: "Magic Husky",
    type: "Dog familiar",
    group: "Dogs",
    icon: "✶",
    charm: "Turns long chapters into brisk starlit trails.",
    css: {
      fur: "#B8A5E3",
      belly: "#FFF8E8",
      hat: "#2D1B4E",
      accent: "#A7F3D0",
      cheek: "#F7C8E0",
    },
  },
  {
    id: "witch-student",
    name: "Witch Student",
    type: "Human friend",
    group: "Humans",
    icon: "▣",
    charm: "Shares margin notes and lavender focus charms.",
    css: {
      fur: "#DFAE86",
      belly: "#4B2E83",
      hat: "#2D1B4E",
      accent: "#5B2749",
      cheek: "#F7C8E0",
    },
  },
  {
    id: "potion-maker",
    name: "Potion Maker",
    type: "Human friend",
    group: "Humans",
    icon: "⬡",
    charm: "Brews careful minutes into bright little wins.",
    css: {
      fur: "#B87655",
      belly: "#A7F3D0",
      hat: "#4B2E83",
      accent: "#2D1B4E",
      cheek: "#FFB347",
    },
  },
  {
    id: "moon-mage",
    name: "Moon Mage",
    type: "Human friend",
    group: "Humans",
    icon: "☽",
    charm: "Reads the sky whenever your focus needs direction.",
    css: {
      fur: "#8B5E8F",
      belly: "#B8A5E3",
      hat: "#201036",
      accent: "#FFF8E8",
      cheek: "#F7C8E0",
    },
  },
];

const destinations = [
  {
    name: "Moonbrew Hollow",
    icon: "☾",
    color: "#B8A5E3",
    note: "A soft little hollow for warm notes and colder moonlight.",
  },
  {
    name: "Pumpkinwick Village",
    icon: "●",
    color: "#FFB347",
    note: "Lantern windows glow between tiny pumpkin cottages.",
  },
  {
    name: "Potion Pines",
    icon: "⚗",
    color: "#A7F3D0",
    note: "Bubbling bottles line the forest study paths.",
  },
  {
    name: "Stardust Crossing",
    icon: "✦",
    color: "#F7C8E0",
    note: "A bright crossing where every finished task sparkles.",
  },
  {
    name: "Crystal Cauldron Cove",
    icon: "◆",
    color: "#B8A5E3",
    note: "Lavender crystals hum beside a pearly little tide.",
  },
  {
    name: "Batwing Bay",
    icon: "⌁",
    color: "#4B2E83",
    note: "A plum-dark bay with lanterns bobbing on the water.",
  },
  {
    name: "Mystic Meadow",
    icon: "✿",
    color: "#A7F3D0",
    note: "Fireflies keep time over sleepy clover patches.",
  },
  {
    name: "Black Cat Borough",
    icon: "▰",
    color: "#20122F",
    note: "Tiny rooftops, velvet paws, and perfect quiet.",
  },
  {
    name: "Enchanted Mushroom Marsh",
    icon: "◒",
    color: "#F7C8E0",
    note: "Pink caps and cream bridges dot the marsh trails.",
  },
  {
    name: "Crescent Moon Castle",
    icon: "☽",
    color: "#FFB347",
    note: "The last tower shines like a prize at sunrise.",
  },
];

const defaultState = {
  selectedCharacter: "black-witch-cat",
  totalSessions: 0,
  totalFocusSeconds: 0,
  currentDestination: 0,
  visited: [0],
  studyMinutes: 25,
  breakMinutes: 5,
};

let savedState = loadState();
let mode = "focus";
let running = false;
let durationSeconds = savedState.studyMinutes * 60;
let remainingSeconds = durationSeconds;
let timerId = null;
let audioContext = null;

const elements = {
  characterGrid: document.querySelector("#characterGrid"),
  selectedName: document.querySelector("#selectedName"),
  selectedType: document.querySelector("#selectedType"),
  selectedCharm: document.querySelector("#selectedCharm"),
  destinationStrip: document.querySelector("#destinationStrip"),
  journeyBoard: document.querySelector("#journeyBoard"),
  trackFill: document.querySelector("#trackFill"),
  routeMeterFill: document.querySelector("#routeMeterFill"),
  destinationName: document.querySelector("#destinationName"),
  destinationNote: document.querySelector("#destinationNote"),
  timerHeading: document.querySelector("#timerHeading"),
  timeDisplay: document.querySelector("#timeDisplay"),
  startButton: document.querySelector("#startButton"),
  pauseButton: document.querySelector("#pauseButton"),
  resetButton: document.querySelector("#resetButton"),
  focusMode: document.querySelector("#focusMode"),
  breakMode: document.querySelector("#breakMode"),
  studyInput: document.querySelector("#studyInput"),
  breakInput: document.querySelector("#breakInput"),
  totalSessions: document.querySelector("#totalSessions"),
  totalFocus: document.querySelector("#totalFocus"),
  islandsVisited: document.querySelector("#islandsVisited"),
  currentStop: document.querySelector("#currentStop"),
  clearStatsButton: document.querySelector("#clearStatsButton"),
  saveChip: document.querySelector("#saveChip"),
  celebrationLayer: document.querySelector("#celebrationLayer"),
  cursorGlow: document.querySelector("#cursorGlow"),
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  elements.studyInput.value = savedState.studyMinutes;
  elements.breakInput.value = savedState.breakMinutes;

  renderCharacterOptions();
  renderDestinations();
  renderSelectedCharacter();
  updateTimerDuration();
  updateTimerDisplay();
  updateStats();
  updateJourneyProgress(0);
  bindEvents();
}

function bindEvents() {
  elements.startButton.addEventListener("click", startTimer);
  elements.pauseButton.addEventListener("click", pauseTimer);
  elements.resetButton.addEventListener("click", resetTimer);
  elements.focusMode.addEventListener("click", () => switchMode("focus"));
  elements.breakMode.addEventListener("click", () => switchMode("break"));
  elements.studyInput.addEventListener("change", handleDurationChange);
  elements.breakInput.addEventListener("change", handleDurationChange);
  elements.clearStatsButton.addEventListener("click", clearStats);

  document.addEventListener("mousemove", (event) => {
    elements.cursorGlow.style.transform = `translate3d(${event.clientX - 8}px, ${event.clientY - 8}px, 0)`;
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState, ...saved };
  } catch (error) {
    return { ...defaultState };
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
  elements.saveChip.textContent = "Saved in spellbook";
  window.clearTimeout(persistState.timeout);
  persistState.timeout = window.setTimeout(() => {
    elements.saveChip.textContent = "Save spell ready";
  }, 1500);
}

function renderCharacterOptions() {
  elements.characterGrid.innerHTML = characters
    .map((character) => {
      const active = character.id === savedState.selectedCharacter ? "active" : "";
      return `
        <button class="character-option ${active}" type="button" data-character-id="${character.id}" style="--option-color: ${character.css.accent}">
          <span class="option-sigil" aria-hidden="true">${character.icon}</span>
          <strong>${character.name}</strong>
          <span>${character.group}</span>
        </button>
      `;
    })
    .join("");

  elements.characterGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      savedState.selectedCharacter = button.dataset.characterId;
      persistState();
      renderCharacterOptions();
      renderSelectedCharacter();
    });
  });
}

function renderSelectedCharacter(happy = false) {
  const character = getSelectedCharacter();
  const kindClass = getKindClass(character.group);
  const style = [
    `--fur: ${character.css.fur}`,
    `--belly: ${character.css.belly}`,
    `--hat: ${character.css.hat}`,
    `--accent: ${character.css.accent}`,
    `--cheek: ${character.css.cheek}`,
  ].join("; ");

  const sprite = `
    <div class="pixel-character ${kindClass} ${happy ? "happy" : ""}" style="${style}" aria-label="${character.name}">
      <span class="sprite-hat"></span>
      <span class="sprite-ear left"></span>
      <span class="sprite-ear right"></span>
      <span class="sprite-head"></span>
      <span class="sprite-hair"></span>
      <span class="sprite-face"></span>
      <span class="sprite-body"></span>
      <span class="sprite-tail"></span>
      <span class="sprite-charm">${character.icon}</span>
    </div>
  `;

  document.querySelectorAll("[data-character-render]").forEach((container) => {
    container.innerHTML = sprite;
  });

  elements.selectedName.textContent = character.name;
  elements.selectedType.textContent = character.type;
  elements.selectedCharm.textContent = character.charm;

  if (happy) {
    window.setTimeout(() => renderSelectedCharacter(false), 2400);
  }
}

function renderDestinations() {
  elements.destinationStrip.innerHTML = destinations
    .map((destination, index) => {
      const isVisited = savedState.visited.includes(index);
      const isActive = index === savedState.currentDestination;
      const status = isActive ? "active" : isVisited ? "visited" : "locked";
      return `
        <article class="destination-card ${status}">
          <div class="destination-sprite" style="--sprite-bg: ${destination.color}" aria-hidden="true">${destination.icon}</div>
          <h3>${destination.name}</h3>
          <p>${isVisited || isActive ? destination.note : "Waiting beyond the clouds."}</p>
        </article>
      `;
    })
    .join("");

  updateDestinationCopy();
}

function updateDestinationCopy() {
  const destination = destinations[savedState.currentDestination];
  elements.destinationName.textContent = destination.name;
  elements.destinationNote.textContent = destination.note;
  elements.currentStop.textContent = destination.name;
}

function startTimer() {
  if (running) return;

  ensureAudio();
  running = true;
  elements.startButton.textContent = "▶ Running";
  timerId = window.setInterval(tick, 1000);
}

function pauseTimer() {
  running = false;
  elements.startButton.textContent = "▶ Start";
  window.clearInterval(timerId);
}

function resetTimer() {
  pauseTimer();
  updateTimerDuration();
  updateTimerDisplay();
  updateJourneyProgress(0);
}

function tick() {
  remainingSeconds = Math.max(remainingSeconds - 1, 0);
  updateTimerDisplay();
  updateJourneyProgress(getSessionProgress());

  if (remainingSeconds === 0) {
    completeTimer();
  }
}

function completeTimer() {
  pauseTimer();
  playChime();
  launchCelebration();
  renderSelectedCharacter(true);

  if (mode === "focus") {
    savedState.totalSessions += 1;
    savedState.totalFocusSeconds += durationSeconds;
    moveToNextDestination();
    switchMode("break", false);
  } else {
    switchMode("focus", false);
  }

  updateStats();
  persistState();
}

function switchMode(nextMode, shouldReset = true) {
  mode = nextMode;
  elements.focusMode.classList.toggle("active", mode === "focus");
  elements.breakMode.classList.toggle("active", mode === "break");
  elements.timerHeading.textContent = mode === "focus" ? "Focus spell" : "Break charm";

  if (shouldReset) {
    pauseTimer();
  }

  updateTimerDuration();
  updateTimerDisplay();
  updateJourneyProgress(0);
}

function updateTimerDuration() {
  durationSeconds = (mode === "focus" ? savedState.studyMinutes : savedState.breakMinutes) * 60;
  remainingSeconds = durationSeconds;
}

function updateTimerDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  elements.timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  document.title = `${elements.timeDisplay.textContent} · Moonbrew Study Island`;
}

function handleDurationChange() {
  savedState.studyMinutes = clampNumber(elements.studyInput.value, 1, 180);
  savedState.breakMinutes = clampNumber(elements.breakInput.value, 1, 60);
  elements.studyInput.value = savedState.studyMinutes;
  elements.breakInput.value = savedState.breakMinutes;
  persistState();

  if (!running) {
    updateTimerDuration();
    updateTimerDisplay();
    updateJourneyProgress(0);
  }
}

function moveToNextDestination() {
  const nextDestination = (savedState.currentDestination + 1) % destinations.length;
  savedState.currentDestination = nextDestination;

  if (!savedState.visited.includes(nextDestination)) {
    savedState.visited.push(nextDestination);
  }

  renderDestinations();
}

function updateJourneyProgress(sessionProgress) {
  const maxIndex = destinations.length - 1;
  const destinationBase = savedState.currentDestination / maxIndex;
  const destinationStep = 1 / maxIndex;
  const globalProgress = savedState.currentDestination === maxIndex
    ? 1
    : destinationBase + destinationStep * sessionProgress;
  const clampedGlobal = Math.min(globalProgress * 100, 100);
  const routeProgress = Math.min(sessionProgress * 100, 100);

  elements.journeyBoard.style.setProperty("--journey-progress", `${clampedGlobal}%`);
  elements.routeMeterFill.style.width = `${routeProgress}%`;
}

function getSessionProgress() {
  if (durationSeconds === 0) return 0;
  return (durationSeconds - remainingSeconds) / durationSeconds;
}

function updateStats() {
  elements.totalSessions.textContent = savedState.totalSessions;
  elements.totalFocus.textContent = formatFocusTime(savedState.totalFocusSeconds);
  elements.islandsVisited.textContent = savedState.visited.length;
  updateDestinationCopy();
}

function clearStats() {
  pauseTimer();
  savedState = {
    ...defaultState,
    selectedCharacter: savedState.selectedCharacter,
    studyMinutes: clampNumber(elements.studyInput.value, 1, 180),
    breakMinutes: clampNumber(elements.breakInput.value, 1, 60),
  };
  persistState();
  renderDestinations();
  updateStats();
  resetTimer();
}

function ensureAudio() {
  if (!audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = AudioContext ? new AudioContext() : null;
  }

  if (audioContext?.state === "suspended") {
    audioContext.resume();
  }
}

function playChime() {
  if (!audioContext) return;

  const now = audioContext.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];

  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, now + index * 0.12);
    gain.gain.setValueAtTime(0, now + index * 0.12);
    gain.gain.linearRampToValueAtTime(0.18, now + index * 0.12 + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.35);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now + index * 0.12);
    oscillator.stop(now + index * 0.12 + 0.38);
  });
}

function launchCelebration() {
  const colors = ["#FFB347", "#F7C8E0", "#B8A5E3", "#FFF8E8", "#A7F3D0"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 50; index += 1) {
    const bit = document.createElement("span");
    const startX = window.innerWidth / 2 + randomBetween(-130, 130);
    const startY = window.innerHeight / 2 + randomBetween(-70, 70);
    bit.className = "celebration-bit";
    bit.style.left = `${startX}px`;
    bit.style.top = `${startY}px`;
    bit.style.setProperty("--x", `${randomBetween(-260, 260)}px`);
    bit.style.setProperty("--y", `${randomBetween(-260, 180)}px`);
    bit.style.setProperty("--bit-color", colors[index % colors.length]);
    fragment.appendChild(bit);
  }

  elements.celebrationLayer.appendChild(fragment);
  window.setTimeout(() => {
    elements.celebrationLayer.innerHTML = "";
  }, 1200);
}

function getSelectedCharacter() {
  return characters.find((character) => character.id === savedState.selectedCharacter) || characters[0];
}

function getKindClass(group) {
  if (group === "Dogs") return "kind-dog";
  if (group === "Humans") return "kind-human";
  return "kind-cat";
}

function formatFocusTime(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

function clampNumber(value, min, max) {
  const number = Number.parseInt(value, 10);
  if (Number.isNaN(number)) return min;
  return Math.min(Math.max(number, min), max);
}

function randomBetween(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
