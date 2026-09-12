"use strict";

(() => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const scoreElement = document.getElementById("score");
  const bestElement = document.getElementById("best-score");
  const finalScoreElement = document.getElementById("final-score");
  const startPanel = document.getElementById("start-panel");
  const gameOverPanel = document.getElementById("game-over-panel");
  const gameOverMessage = document.getElementById("game-over-message");
  const soundButton = document.getElementById("sound-button");

  const WIDTH = 960;
  const HEIGHT = 640;
  const COLUMNS = 9;
  const CELL = 82;
  const LANE_HEIGHT = 68;
  const PLAYER_LANE_Y = 430;
  const ROAD_COLORS = ["#4b4c5a", "#555564", "#414451"];
  const CAMPUS_COLORS = ["#87c887", "#91d29a", "#79bd83"];
  const VEHICLE_COLORS = ["#ff557d", "#ffb340", "#6f7cff", "#48c9d4", "#bf70e8"];
  const COLLISION_MESSAGES = [
    "A campus shuttle rearranged the syllabus.",
    "That scooter had right of way. Apparently.",
    "A runaway coffee cart caused a scheduling conflict.",
    "Professor Peep missed office hours by one lane."
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let state = "start";
  let player;
  let lanes;
  let cameraY;
  let score;
  let best = Number(localStorage.getItem("peep-campus-dash-best")) || 0;
  let lastTime = performance.now();
  let lastMoveTime = 0;
  let hop = null;
  let particles = [];
  let soundEnabled = false;
  let audioContext = null;
  let swipeStart = null;

  bestElement.textContent = String(best);

  function mulberry32(seed) {
    return function random() {
      let value = seed += 0x6D2B79F5;
      value = Math.imul(value ^ value >>> 15, value | 1);
      value ^= value + Math.imul(value ^ value >>> 7, value | 61);
      return ((value ^ value >>> 14) >>> 0) / 4294967296;
    };
  }

  function laneFor(index) {
    const random = mulberry32(index * 92821 + 7319);

    // Keep the opening welcoming, then introduce longer road sections gradually.
    // This guarantees frequent islands where the player can stop and read traffic.
    const safeLaneInterval = index < 20 ? 2 : 3;
    const guaranteedSafe = index <= 3 || index % safeLaneInterval === 0;
    if (guaranteedSafe) {
      return {
        index,
        type: "campus",
        shade: Math.floor(random() * CAMPUS_COLORS.length),
        details: Array.from({ length: 5 }, () => ({
          x: random() * WIDTH,
          kind: random() > 0.48 ? "flower" : "book",
          color: VEHICLE_COLORS[Math.floor(random() * VEHICLE_COLORS.length)]
        }))
      };
    }

    const direction = random() > 0.5 ? 1 : -1;
    const difficulty = Math.min(1.5, 0.68 + Math.max(0, index) * 0.009);
    const kindRoll = random();
    const kind = kindRoll > 0.72 ? "shuttle" : kindRoll > 0.38 ? "scooter" : "coffee";
    const width = kind === "shuttle" ? 1.7 : kind === "coffee" ? 1.15 : 0.8;
    const spacing = kind === "shuttle" ? 7.2 : kind === "coffee" ? 6.2 : 5.4;
    const speed = (kind === "shuttle" ? 1.25 : kind === "scooter" ? 1.9 : 1.55) * difficulty * direction;
    const offset = random() * spacing;

    return {
      index,
      type: "road",
      shade: Math.floor(random() * ROAD_COLORS.length),
      direction,
      speed,
      kind,
      width,
      spacing,
      offset,
      color: VEHICLE_COLORS[Math.floor(random() * VEHICLE_COLORS.length)]
    };
  }

  function buildWorld() {
    lanes = new Map();
    for (let index = -6; index <= 22; index += 1) lanes.set(index, laneFor(index));
  }

  function ensureWorld() {
    const top = Math.ceil(cameraY + 10);
    for (let index = Math.floor(cameraY - 5); index <= top; index += 1) {
      if (!lanes.has(index)) lanes.set(index, laneFor(index));
    }
    for (const index of lanes.keys()) {
      if (index < cameraY - 8) lanes.delete(index);
    }
  }

  function resetGame() {
    player = { x: 4, y: 0, facing: "up" };
    cameraY = 0;
    score = 0;
    hop = null;
    particles = [];
    buildWorld();
    scoreElement.textContent = "0";
    finalScoreElement.textContent = "0";
  }

  function startGame() {
    resetGame();
    state = "playing";
    startPanel.classList.remove("visible");
    gameOverPanel.classList.remove("visible");
    gameOverPanel.setAttribute("aria-hidden", "true");
    lastTime = performance.now();
    chirp(330, 0.06, "sine");
  }

  function endGame() {
    if (state !== "playing") return;
    state = "over";
    burst(player.x, player.y);
    finalScoreElement.textContent = String(score);
    gameOverMessage.textContent = COLLISION_MESSAGES[Math.floor(Math.random() * COLLISION_MESSAGES.length)];
    if (score > best) {
      best = score;
      bestElement.textContent = String(best);
      localStorage.setItem("peep-campus-dash-best", String(best));
      gameOverMessage.textContent = "New campus record! The commute still ended badly.";
    }
    chirp(130, 0.22, "sawtooth");
    window.setTimeout(() => {
      gameOverPanel.classList.add("visible");
      gameOverPanel.setAttribute("aria-hidden", "false");
      document.getElementById("restart-button").focus({ preventScroll: true });
    }, prefersReducedMotion ? 0 : 320);
  }

  function move(direction) {
    const now = performance.now();
    if (state !== "playing" || now - lastMoveTime < 95 || hop) return;

    let dx = 0;
    let dy = 0;
    if (direction === "up") dy = 1;
    if (direction === "down") dy = -1;
    if (direction === "left") dx = -1;
    if (direction === "right") dx = 1;

    const targetX = player.x + dx;
    const targetY = player.y + dy;
    if (targetX < 0 || targetX >= COLUMNS || targetY < Math.max(-1, score - 4)) return;

    const from = { x: player.x, y: player.y };
    player.x = targetX;
    player.y = targetY;
    player.facing = direction;
    lastMoveTime = now;
    hop = { from, started: now, duration: prefersReducedMotion ? 1 : 150 };

    if (player.y > score) {
      score = player.y;
      scoreElement.textContent = String(score);
      chirp(440 + Math.min(score, 20) * 9, 0.035, "sine");
    } else {
      chirp(280, 0.025, "sine");
    }
  }

  function chirp(frequency, duration, type) {
    if (!soundEnabled) return;
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.055, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  }

  function currentPlayerPosition(now) {
    if (!hop) return { x: player.x, y: player.y, lift: 0 };
    const progress = Math.min(1, (now - hop.started) / hop.duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const position = {
      x: hop.from.x + (player.x - hop.from.x) * eased,
      y: hop.from.y + (player.y - hop.from.y) * eased,
      lift: Math.sin(progress * Math.PI) * 24
    };
    if (progress >= 1) hop = null;
    return position;
  }

  function screenX(column) {
    return WIDTH / 2 + (column - (COLUMNS - 1) / 2) * CELL;
  }

  function screenY(lane) {
    return PLAYER_LANE_Y - (lane - cameraY) * LANE_HEIGHT;
  }

  function vehiclePositions(lane, elapsed) {
    const positions = [];
    const vehicleCount = Math.ceil((COLUMNS + lane.spacing * 2) / lane.spacing);
    const cycle = vehicleCount * lane.spacing;
    const movement = elapsed * lane.speed;
    for (let index = 0; index < vehicleCount; index += 1) {
      let x = lane.offset + index * lane.spacing + movement;
      x = ((x + lane.spacing + 3) % cycle + cycle) % cycle - lane.spacing - 3;
      positions.push(x);
    }
    return positions;
  }

  function detectCollision(elapsed) {
    const lane = lanes.get(player.y);
    if (!lane || lane.type !== "road") return;
    for (const x of vehiclePositions(lane, elapsed)) {
      if (Math.abs(x - player.x) < (lane.width + 0.52) / 2) {
        endGame();
        return;
      }
    }
  }

  function roundedRect(x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, r);
  }

  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, "#9ce5e4");
    gradient.addColorStop(0.58, "#d7efbd");
    gradient.addColorStop(1, "#e5c985");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.globalAlpha = 0.28;
    ctx.fillStyle = "#ffffff";
    for (let x = -100; x < WIDTH + 120; x += 210) {
      ctx.beginPath();
      ctx.arc(x + (cameraY * 8 % 210), 78, 58, 0, Math.PI * 2);
      ctx.arc(x + 58 + (cameraY * 8 % 210), 70, 46, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawLane(lane) {
    const y = screenY(lane.index);
    if (y < -LANE_HEIGHT * 2 || y > HEIGHT + LANE_HEIGHT * 2) return;
    const top = y - LANE_HEIGHT / 2;
    ctx.fillStyle = lane.type === "road" ? ROAD_COLORS[lane.shade] : CAMPUS_COLORS[lane.shade];
    ctx.fillRect(0, top, WIDTH, LANE_HEIGHT + 1);

    ctx.fillStyle = lane.type === "road" ? "rgba(23,23,30,0.22)" : "rgba(44,105,53,0.2)";
    ctx.fillRect(0, top + LANE_HEIGHT - 8, WIDTH, 8);

    if (lane.type === "road") {
      ctx.strokeStyle = "rgba(255,244,188,0.68)";
      ctx.lineWidth = 4;
      ctx.setLineDash([28, 24]);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "rgba(255,255,255,0.16)";
      for (let mark = 0; mark < 4; mark += 1) {
        const markX = lane.direction > 0 ? 38 + mark * 15 : WIDTH - 38 - mark * 15;
        ctx.fillRect(markX, y - 13 + mark * 2, 9, 26 - mark * 4);
      }
    } else {
      for (const detail of lane.details) drawCampusDetail(detail, y);
    }
  }

  function drawCampusDetail(detail, laneY) {
    const y = laneY + 11;
    if (detail.kind === "flower") {
      ctx.fillStyle = "#32764e";
      ctx.fillRect(detail.x - 2, y - 5, 4, 14);
      ctx.fillStyle = detail.color;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
        ctx.beginPath();
        ctx.arc(detail.x + Math.cos(angle) * 5, y - 7 + Math.sin(angle) * 5, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#ffe46d";
      ctx.beginPath();
      ctx.arc(detail.x, y - 7, 3.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.save();
      ctx.translate(detail.x, y);
      ctx.rotate(-0.15);
      ctx.fillStyle = "rgba(33,45,43,0.2)";
      ctx.fillRect(-12, 3, 27, 6);
      ctx.fillStyle = detail.color;
      ctx.fillRect(-13, -8, 26, 13);
      ctx.fillStyle = "#fff4ce";
      ctx.fillRect(-9, -5, 18, 2);
      ctx.restore();
    }
  }

  function drawVehicle(lane, column) {
    const x = screenX(column);
    const y = screenY(lane.index);
    const width = lane.width * CELL;
    ctx.save();
    ctx.translate(x, y);
    if (lane.direction < 0) ctx.scale(-1, 1);

    ctx.fillStyle = "rgba(22,19,36,0.24)";
    ctx.beginPath();
    ctx.ellipse(0, 20, width * 0.53, 13, 0, 0, Math.PI * 2);
    ctx.fill();

    if (lane.kind === "scooter") drawScooter(lane.color);
    if (lane.kind === "coffee") drawCoffeeCart(lane.color);
    if (lane.kind === "shuttle") drawShuttle(lane.color, width);
    ctx.restore();
  }

  function drawWheel(x, y, radius = 11) {
    ctx.fillStyle = "#1d1b2a";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#afb4bf";
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.38, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawScooter(color) {
    drawWheel(-23, 15, 9);
    drawWheel(24, 15, 9);
    ctx.strokeStyle = color;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-22, 9);
    ctx.lineTo(12, 9);
    ctx.lineTo(20, -22);
    ctx.lineTo(29, -22);
    ctx.stroke();
    ctx.fillStyle = "#ffe1b3";
    ctx.beginPath();
    ctx.arc(-1, -16, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#3b2e55";
    ctx.fillRect(-9, -7, 18, 24);
  }

  function drawCoffeeCart(color) {
    drawWheel(-28, 17, 10);
    drawWheel(28, 17, 10);
    roundedRect(-43, -20, 82, 38, 8);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillRect(-36, -13, 52, 7);
    ctx.fillStyle = "#f8ead2";
    ctx.beginPath();
    ctx.moveTo(15, -20);
    ctx.lineTo(29, -48);
    ctx.lineTo(43, -20);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#5d3828";
    ctx.fillRect(24, -37, 10, 15);
  }

  function drawShuttle(color, width) {
    drawWheel(-width * 0.32, 17);
    drawWheel(width * 0.32, 17);
    roundedRect(-width / 2, -30, width, 50, 12);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = "#c9f1f5";
    roundedRect(-width * 0.34, -23, width * 0.54, 19, 5);
    ctx.fill();
    ctx.fillStyle = "rgba(35,57,75,0.35)";
    for (let windowIndex = 0; windowIndex < 3; windowIndex += 1) {
      ctx.fillRect(-width * 0.3 + windowIndex * 25, -20, 17, 13);
    }
    ctx.fillStyle = "#fff4c4";
    ctx.fillRect(width / 2 - 7, -14, 8, 11);
  }

  function drawMascot(x, y, lift, time) {
    const bob = state === "playing" && !hop ? Math.sin(time * 0.005) * 2 : 0;
    ctx.save();
    ctx.translate(screenX(x), screenY(y) - lift + bob);
    const directionScale = player.facing === "left" ? -1 : 1;
    ctx.scale(directionScale, 1);

    ctx.fillStyle = "rgba(30,28,39,0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 28 + lift, 34 - Math.min(lift, 20) * 0.35, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1b1a24";
    roundedRect(-33, 12, 66, 24, 10);
    ctx.fill();
    ctx.strokeStyle = "#d6d9dc";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-25, 23);
    ctx.lineTo(0, 34);
    ctx.lineTo(25, 23);
    ctx.stroke();

    ctx.fillStyle = "#ffd34e";
    ctx.strokeStyle = "#16141e";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.ellipse(0, -5, 36, 34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f22f3f";
    ctx.beginPath();
    ctx.arc(-27, 2, 10, 0, Math.PI * 2);
    ctx.arc(27, 2, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f8f7f0";
    ctx.beginPath();
    ctx.ellipse(-12, -11, 14, 17, -0.2, 0, Math.PI * 2);
    ctx.ellipse(13, -11, 14, 17, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#16141e";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-12, -11, 14, 17, -0.2, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#111018";
    ctx.beginPath();
    ctx.arc(-8, -10, 5, 0, Math.PI * 2);
    ctx.arc(16, -11, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f0a82f";
    ctx.strokeStyle = "#16141e";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(2, 5, 16, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#cfd1d2";
    ctx.strokeStyle = "#17151e";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-34, -17);
    ctx.quadraticCurveTo(-38, -49, -8, -44);
    ctx.quadraticCurveTo(2, -59, 12, -43);
    ctx.quadraticCurveTo(34, -45, 35, -19);
    ctx.quadraticCurveTo(25, -29, 18, -24);
    ctx.quadraticCurveTo(5, -35, -2, -23);
    ctx.quadraticCurveTo(-15, -35, -18, -20);
    ctx.quadraticCurveTo(-28, -28, -34, -17);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function burst(column, lane) {
    for (let index = 0; index < 18; index += 1) {
      particles.push({
        x: screenX(column),
        y: screenY(lane),
        vx: (Math.random() - 0.5) * 280,
        vy: -Math.random() * 240 - 30,
        life: 0.8 + Math.random() * 0.4,
        color: VEHICLE_COLORS[index % VEHICLE_COLORS.length]
      });
    }
  }

  function updateAndDrawParticles(delta) {
    particles = particles.filter((particle) => particle.life > 0);
    for (const particle of particles) {
      particle.life -= delta;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.vy += 420 * delta;
      ctx.globalAlpha = Math.max(0, particle.life);
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x - 5, particle.y - 5, 10, 10);
    }
    ctx.globalAlpha = 1;
  }

  function render(timestamp) {
    const delta = Math.min(0.05, (timestamp - lastTime) / 1000);
    lastTime = timestamp;
    const elapsed = timestamp / 1000;

    if (state === "playing") {
      const targetCamera = Math.max(0, player.y - 1.2);
      cameraY += (targetCamera - cameraY) * Math.min(1, delta * 5.4);
      ensureWorld();
      if (!hop || timestamp - hop.started > hop.duration * 0.58) detectCollision(elapsed);
    }

    drawBackground();
    const orderedLanes = [...lanes.values()].sort((a, b) => b.index - a.index);
    for (const lane of orderedLanes) drawLane(lane);
    for (const lane of orderedLanes) {
      if (lane.type === "road") {
        for (const position of vehiclePositions(lane, elapsed)) drawVehicle(lane, position);
      }
    }

    const position = currentPlayerPosition(timestamp);
    if (state !== "over" || particles.length === 0) drawMascot(position.x, position.y, position.lift, timestamp);
    updateAndDrawParticles(delta);

    requestAnimationFrame(render);
  }

  const keyDirections = {
    ArrowUp: "up", w: "up", W: "up",
    ArrowDown: "down", s: "down", S: "down",
    ArrowLeft: "left", a: "left", A: "left",
    ArrowRight: "right", d: "right", D: "right"
  };

  window.addEventListener("keydown", (event) => {
    const direction = keyDirections[event.key];
    if (direction) {
      event.preventDefault();
      move(direction);
    } else if ((event.key === "Enter" || event.key === " ") && state !== "playing") {
      event.preventDefault();
      startGame();
    }
  });

  document.querySelectorAll("[data-direction]").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      move(button.dataset.direction);
    });
  });

  const canvasWrap = document.getElementById("canvas-wrap");
  canvasWrap.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    swipeStart = { x: event.clientX, y: event.clientY };
  });
  canvasWrap.addEventListener("pointerup", (event) => {
    if (!swipeStart || event.target.closest("button")) return;
    const dx = event.clientX - swipeStart.x;
    const dy = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 22) return;
    move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
  });
  canvasWrap.addEventListener("pointercancel", () => { swipeStart = null; });

  document.getElementById("start-button").addEventListener("click", startGame);
  document.getElementById("restart-button").addEventListener("click", startGame);
  soundButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundButton.textContent = soundEnabled ? "Sound on" : "Sound off";
    soundButton.setAttribute("aria-pressed", String(soundEnabled));
    soundButton.setAttribute("aria-label", soundEnabled ? "Turn sound off" : "Turn sound on");
    chirp(520, 0.06, "sine");
  });

  resetGame();
  requestAnimationFrame(render);
})();
