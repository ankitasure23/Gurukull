import React, { useState, useEffect } from "react";
import "../../../index.css";

// Elements 1-20
const ELEMENTS = [
  { symbol: "H", name: "Hydrogen", atomic: 1, group: 1, period: 1, family: "Nonmetal", classification: "Nonmetal" },
  { symbol: "He", name: "Helium", atomic: 2, group: 18, period: 1, family: "Noble Gas", classification: "Nonmetal" },
  { symbol: "Li", name: "Lithium", atomic: 3, group: 1, period: 2, family: "Alkali Metal", classification: "Metal" },
  { symbol: "Be", name: "Beryllium", atomic: 4, group: 2, period: 2, family: "Alkaline Earth", classification: "Metal" },
  { symbol: "B", name: "Boron", atomic: 5, group: 13, period: 2, family: "Metalloid", classification: "Metalloid" },
  { symbol: "C", name: "Carbon", atomic: 6, group: 14, period: 2, family: "Nonmetal", classification: "Nonmetal" },
  { symbol: "N", name: "Nitrogen", atomic: 7, group: 15, period: 2, family: "Nonmetal", classification: "Nonmetal" },
  { symbol: "O", name: "Oxygen", atomic: 8, group: 16, period: 2, family: "Nonmetal", classification: "Nonmetal" },
  { symbol: "F", name: "Fluorine", atomic: 9, group: 17, period: 2, family: "Halogen", classification: "Nonmetal" },
  { symbol: "Ne", name: "Neon", atomic: 10, group: 18, period: 2, family: "Noble Gas", classification: "Nonmetal" },
  { symbol: "Na", name: "Sodium", atomic: 11, group: 1, period: 3, family: "Alkali Metal", classification: "Metal" },
  { symbol: "Mg", name: "Magnesium", atomic: 12, group: 2, period: 3, family: "Alkaline Earth", classification: "Metal" },
  { symbol: "Al", name: "Aluminium", atomic: 13, group: 13, period: 3, family: "Post-transition Metal", classification: "Metal" },
  { symbol: "Si", name: "Silicon", atomic: 14, group: 14, period: 3, family: "Metalloid", classification: "Metalloid" },
  { symbol: "P", name: "Phosphorus", atomic: 15, group: 15, period: 3, family: "Nonmetal", classification: "Nonmetal" },
  { symbol: "S", name: "Sulfur", atomic: 16, group: 16, period: 3, family: "Nonmetal", classification: "Nonmetal" },
  { symbol: "Cl", name: "Chlorine", atomic: 17, group: 17, period: 3, family: "Halogen", classification: "Nonmetal" },
  { symbol: "Ar", name: "Argon", atomic: 18, group: 18, period: 3, family: "Noble Gas", classification: "Nonmetal" },
  { symbol: "K", name: "Potassium", atomic: 19, group: 1, period: 4, family: "Alkali Metal", classification: "Metal" },
  { symbol: "Ca", name: "Calcium", atomic: 20, group: 2, period: 4, family: "Alkaline Earth", classification: "Metal" },
];

// Corrected CLUES
const CLUES = [
  { type: "compound", value: ["C", "O"], text: "Find the elements to form carbon dioxide (CO₂)." },
  { type: "atomic", value: [6, 8], text: "Select the elements with atomic numbers 6 and 8." },
  { type: "atomic", value: 8, text: "Find the element with atomic number 8" },
  { type: "group_period", value: { group: 18, period: 2 }, text: "Which noble gas is in period 2?" },
  { type: "family", value: "Halogen", text: "Select a halogen element" },
  { type: "classification", value: "Metalloid", text: "Select the metalloid in period 2" },
  { type: "compound", value: ["Na", "Cl"], text: "Select elements to form table salt (NaCl)" },
  { type: "group_period", value: { group: 1, period: 4 }, text: "Which alkali metal is in period 4?" },
  { type: "classification", value: "Metal", text: "Select a metal in period 3" }
];

function PeriodicTableGame() {
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [treasureStep, setTreasureStep] = useState(0);
  const [selectedElements, setSelectedElements] = useState([]);
  const [timeLeft, setTimeLeft] = useState(40);

  useEffect(() => {
    if (timeLeft <= 0) {
      setMessage("⏰ Time's up! Moving to next clue.");
      setTimeout(nextClue, 1500);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleClick = (el) => {
    const clue = CLUES[currentClueIndex];

    // Handle compound / multi-element selection
    if (clue.type === "compound" || (clue.type === "atomic" && Array.isArray(clue.value))) {
      if (!selectedElements.includes(el.symbol)) {
        setSelectedElements([...selectedElements, el.symbol]);
      }

      const selectedSorted = [...selectedElements, el.symbol].sort();
      const clueSorted = clue.type === "compound" ? clue.value.sort() : clue.value.map(sym => {
        const element = ELEMENTS.find(e => e.atomic === sym);
        return element ? element.symbol : "";
      }).sort();

      if (selectedSorted.join(",") === clueSorted.join(",")) {
        setMessage("✅ Correct!");
        setScore(score + 20);
        setTreasureStep(treasureStep + 1);
        setSelectedElements([]);
        setTimeout(nextClue, 1500);
      } else if (selectedSorted.length > clueSorted.length) {
        setMessage("❌ Incorrect combination. Try again.");
        setSelectedElements([]);
        setScore(score - 5);
      }
      return;
    }

    // Handle single-element clues
    let correct = false;
    if (clue.type === "symbol" && el.symbol === clue.value) correct = true;
    if (clue.type === "atomic" && el.atomic === clue.value) correct = true;
    if (clue.type === "group_period") {
      correct = el.group === clue.value.group && el.period === clue.value.period;
    }
    if (clue.type === "family") correct = el.family === clue.value;
    if (clue.type === "classification") correct = el.classification === clue.value;

    if (correct) {
      setMessage("✅ Correct!");
      setScore(score + 10);
      setTreasureStep(treasureStep + 1);
      setTimeout(nextClue, 1500);
    } else {
      setMessage(`❌ Wrong! Hint: ${generateHint(clue, el)}`);
      setScore(score - 2);
    }
  };

  const generateHint = (clue, el) => {
    if (clue.type === "symbol") return `Symbol is not ${el.symbol}`;
    if (clue.type === "atomic") return `Atomic number is not ${el.atomic}`;
    if (clue.type === "group_period")
      return `Check group (${el.group}) and period (${el.period})`;
    if (clue.type === "family") return `This element is not a ${clue.value}`;
    if (clue.type === "classification") return `This element is not a ${clue.value}`;
    return "";
  };

  const nextClue = () => {
    const next = currentClueIndex + 1;
    if (next < CLUES.length) {
      setCurrentClueIndex(next);
      setMessage("");
      setSelectedElements([]);
      setTimeLeft(40);
    } else {
      setMessage("🎉 You completed all clues!");
    }
  };

  return (
    <div className="app periodic-table-page">
      <h1>🧪 Periodic Table Treasure Hunt (Class 7)</h1>
      <p>
        Score: {score} | Time left: {timeLeft}s | Treasure progress: {treasureStep}/{CLUES.length}
      </p>

      <div className="clue">
        <h2>Clue:</h2>
        <p>{CLUES[currentClueIndex].text}</p>
      </div>

      <div className="table">
        {ELEMENTS.map((el) => (
          <div
            key={el.symbol}
            className="pt-element"
            onClick={() => handleClick(el)}
            style={{
              border: selectedElements.includes(el.symbol) ? "2px solid gold" : "2px solid #4b0082",
            }}
            title={`${el.name} (Atomic: ${el.atomic}, Group: ${el.group}, Family: ${el.family}, Class: ${el.classification})`}
          >
            <span className="symbol">{el.symbol}</span>
            <span className="name">{el.name}</span>
          </div>
        ))}
      </div>

      {message && <div className="message">{message}</div>}

      <div className="treasure">
        {Array.from({ length: CLUES.length }).map((_, i) => (
          <span key={i} className={i < treasureStep ? "step filled" : "step"}>💰</span>
        ))}
      </div>

      <div className="teaching">
        <h2>📘 About the Periodic Table</h2>
        <p>
          The periodic table organizes elements by <strong>atomic number</strong> and
          groups them into periods and families based on similar properties.
        </p>
        <p>
          - <strong>Periods:</strong> Horizontal rows showing repeating trends.<br />
          - <strong>Groups:</strong> Vertical columns; similar chemical behavior.<br />
          - <strong>Families:</strong> Alkali metals, Halogens, Noble gases, etc.<br />
          - <strong>Classification:</strong> Metals, Nonmetals, Metalloids.
        </p>
      </div>
    </div>
  );
}

export default PeriodicTableGame;
