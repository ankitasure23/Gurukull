import React, { useState, useRef } from "react";
import "../../../index.css";

const ELEMENTS_LIST = [
  { name: "Hydrogen", protons: 1, neutrons: 0, electrons: 1, info: "Hydrogen is the lightest element." },
  { name: "Helium", protons: 2, neutrons: 2, electrons: 2, info: "Helium is inert and forms no stable compounds." },
  { name: "Carbon", protons: 6, neutrons: 6, electrons: 6, info: "Carbon forms the basis of organic life." },
  { name: "Oxygen", protons: 8, neutrons: 8, electrons: 8, info: "Oxygen is essential for respiration." },
];

const NUCLEUS_RADIUS = 60;            // px radius of nucleus (center)
const SHELL_RADIUS = [110, 170, 230]; // radius from center for shell 1,2,3 (px)
const SHELL_ALLOWANCE = 22;           // tolerance band to accept drops (px)
const SHELL_MAX_FORMULA = (n) => 2 * n * n; // 2n^2

let electronIdCounter = 1;

function AtomGame() {
  const [element, setElement] = useState(ELEMENTS_LIST[2]); // default Carbon
  const [nucleus, setNucleus] = useState([]);               // array of 'proton'|'neutron'
  const [electrons, setElectrons] = useState([]);           // { id, shell, angle, speed }
  const [score, setScore] = useState(0);
  const atomAreaRef = useRef(null);

  const resetAtom = () => {
    setNucleus([]);
    setElectrons([]);
    setScore(0);
  };

  const allowDrop = (e) => e.preventDefault();

  // Determine which shell index (1-based) a distance belongs to; returns null if none
  const determineShellIndex = (distance) => {
    for (let i = 0; i < SHELL_RADIUS.length; i++) {
      const inner = i === 0 ? NUCLEUS_RADIUS + 15 : SHELL_RADIUS[i - 1] + 15;
      const outer = SHELL_RADIUS[i] + SHELL_ALLOWANCE;
      if (distance >= inner && distance <= outer) return i + 1;
    }
    return null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    if (!atomAreaRef.current) return;
    const rect = atomAreaRef.current.getBoundingClientRect();

    // Coordinates relative to center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);

    // If within nucleus radius, accept only protons/neutrons
    if (distance <= NUCLEUS_RADIUS) {
      if (type === "proton" || type === "neutron") {
        setNucleus((prev) => [...prev, type]);
        setScore((s) => s + 1);
      }
      return;
    }

    // Otherwise, try to place in a shell (electrons only)
    if (type === "electron") {
      const shellIndex = determineShellIndex(distance);
      if (!shellIndex) return; // not near any shell
      const countInShell = electrons.filter((el) => el.shell === shellIndex).length;
      const maxElectrons = SHELL_MAX_FORMULA(shellIndex);
      if (countInShell >= maxElectrons) return;

      // compute angle in degrees and a small random offset to avoid stacking exactly on same angle
      const rawAngle = Math.atan2(y, x) * (180 / Math.PI);
      const angle = rawAngle; // keep raw angle so it's where user dropped
      // speed: outer shells rotate slower — make small variation so multiple electrons don't align perfectly
      const baseSpeed = 8 + shellIndex * 2; // seconds per rotation (higher = slower)
      const speed = baseSpeed + (Math.random() * 4 - 2); // add small randomness

      const id = electronIdCounter++;
      setElectrons((prev) => [...prev, { id, shell: shellIndex, angle, speed }]);
      setScore((s) => s + 2);
    }
  };

  const electronConfig = () => {
    // distribute element.electrons into shells using 2n^2 (simple, 3 shells)
    let remaining = element.electrons;
    const config = [];
    for (let n = 1; n <= 3; n++) {
      const max = SHELL_MAX_FORMULA(n);
      const count = Math.min(remaining, max);
      config.push(count);
      remaining -= count;
      if (remaining <= 0) break;
    }
    return config.join(", ");
  };

  const checkWin = () => {
    const protonCount = nucleus.filter((p) => p === "proton").length;
    const neutronCount = nucleus.filter((p) => p === "neutron").length;
    return (
      protonCount === element.protons &&
      neutronCount === element.neutrons &&
      electrons.length === element.electrons
    );
  };

  return (
    <div className="App">
      <h1>🧪 Build the Atom</h1>

      <div className="top-row">
        <div className="element-selection">
          <label>Select Element: </label>
          <select
            value={element.name}
            onChange={(ev) => {
              const el = ELEMENTS_LIST.find((x) => x.name === ev.target.value);
              setElement(el);
              resetAtom();
            }}
          >
            {ELEMENTS_LIST.map((el) => (
              <option key={el.name} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
        </div>

        <div className="info-panel">
          <p><b>Atomic Number:</b> {element.protons}</p>
          <p><b>Mass Number:</b> {element.protons + element.neutrons}</p>
          <p><b>Electron Config (shells):</b> {electronConfig()}</p>
          <p><b>Formula:</b> Max per shell = <code>2n²</code></p>
          <p><b>Fun Fact:</b> {element.info}</p>
          <p><b>Score:</b> {score}</p>
        </div>
      </div>

      <div className="instructions">
        <h2>How to Play:</h2>
        <ul>
          <li>Drag <span className="proton-label">Protons</span> and <span className="neutron-label">Neutrons</span> into the nucleus (center).</li>
          <li>Drag <span className="electron-label">Electrons</span> near the rings — they snap to the shell perimeter and orbit.</li>
          <li>Electron capacity formula: <b>2n²</b> (shown per shell). You cannot add more than the allowed electrons.</li>
        </ul>
      </div>

      <div className="elements">
        {[ "proton", "neutron", "electron" ].map((type) => {
          const label = type[0].toUpperCase() + type.slice(1);
          const color = type === "proton" ? "#D32F2F" : type === "neutron" ? "#1976D2" : "#FBC02D";
          return (
            <div
              key={type}
              className="element"
              style={{ backgroundColor: color }}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("type", type)}
            >
              {label}
            </div>
          );
        })}
        <button className="small" onClick={resetAtom}>Reset</button>
      </div>

      <div
        className="atom-area"
        ref={atomAreaRef}
        onDrop={handleDrop}
        onDragOver={allowDrop}
      >
        {/* Draw shells visually (not separate drop elements) */}
        {[1,2,3].map((s) => (
          <div key={s} className={`shell shell-${s}`}>
            <div className="shell-label">Shell {s} — max {SHELL_MAX_FORMULA(s)}</div>
            {/* For each electron on this shell, render an orbit parent that rotates and contains the electron positioned at translateX(radius) */}
            {electrons.filter(el => el.shell === s).map((el) => {
              const r = SHELL_RADIUS[s - 1];
              // Place the electron at initial angle by rotating the parent by angle degrees, then translate child out by r px.
              // Parent is centered.
              const rotationStyle = {
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "0px",
                height: "0px",
                transform: `rotate(${el.angle}deg)`,
                animation: `spin ${el.speed}s linear infinite`,
                transformOrigin: "0px 0px"
              };
              const childStyle = {
                position: "absolute",
                transform: `translate(${r}px, 0px) translate(-50%, -50%)`,
              };
              return (
                <div key={el.id} style={rotationStyle} className="orbit">
                  <div style={childStyle} className="particle electron">E</div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Nucleus */}
        <div className="nucleus" style={{ width: NUCLEUS_RADIUS * 2, height: NUCLEUS_RADIUS * 2 }}>
          <div className="nucleus-label">Nucleus</div>
          <div className="nucleus-particles">
            {nucleus.map((p, idx) => (
              <div
                key={idx}
                className="particle"
                style={{ backgroundColor: p === "proton" ? "#D32F2F" : "#1976D2" }}
              >
                {p === "proton" ? "P" : "N"}
              </div>
            ))}
          </div>
        </div>
      </div>

      {checkWin() && <div className="win-message">🎉 Congratulations! Atom completed correctly!</div>}
    </div>
  );
}

export default AtomGame;
