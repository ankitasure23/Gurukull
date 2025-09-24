import React, { useState } from "react";
import '../css/Hereditary.css'
// Draggable Image Component
function DraggableImage({ name, src, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, name)}
      className="cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-105"
    >
      <img
        src={src}
        alt={name}
        className="w-20 h-20 object-contain rounded-xl shadow-md border-2 border-purple-300"
        style={{ pointerEvents: "none" }}
      />
      <p className="text-center text-sm font-semibold text-purple-700 mt-1">
        {name}
      </p>
    </div>
  );
}

// Drop Zone Component
function DropZone({ index, onDrop, onDragOver, placed, isDragOver }) {
  return (
    <div
      onDrop={(e) => onDrop(e, index)}
      onDragOver={onDragOver}
      onDragEnter={(e) => e.preventDefault()}
      className={`w-20 h-20 flex items-center justify-center border-2 rounded-xl transition-all duration-200 ${
        isDragOver ? "bg-green-100 border-green-400 scale-105" : "bg-white border-gray-300"
      }`}
    >
      {placed ? (
        <span className="text-sm font-semibold text-purple-700">{placed}</span>
      ) : (
        <span className="text-gray-400 text-xs text-center">Drop here</span>
      )}
    </div>
  );
}

// Main Component
export default function HereditaryAndEvolution() {
  const correctAnswers = ["Round", "Round", "Round", "Wrinkled"];
  const [placements, setPlacements] = useState([null, null, null, null]);
  const [result, setResult] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const roundImage = "https://via.placeholder.com/80x80/4ade80/ffffff?text=Round";
  const wrinkledImage = "https://via.placeholder.com/80x80/f59e0b/ffffff?text=Wrinkled";

  const handleDragStart = (e, name) => {
    setDraggedItem(name);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDragOverIndex(null);
    if (!draggedItem) return;

    const newPlacements = [...placements];
    newPlacements[index] = draggedItem;
    setPlacements(newPlacements);
    setDraggedItem(null);
    setResult("");
  };

  const handleCheck = () => {
    if (placements.some((p) => p === null)) {
      setResult("⚠ Please fill all squares before checking!");
      return;
    }

    if (placements.every((val, i) => val === correctAnswers[i])) {
      setResult("✅ Correct! Well done. This shows a typical F2 generation with 3:1 ratio.");
    } else {
      setResult("❌ Some answers are wrong, try again! Hint: Think about dominant vs recessive traits.");
    }
  };

  const handleReset = () => {
    setPlacements([null, null, null, null]);
    setResult("");
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const removeFromSquare = (index) => {
    const newPlacements = [...placements];
    newPlacements[index] = null;
    setPlacements(newPlacements);
    setResult("");
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-purple-700 mb-2 text-center">
          🧬 Genetics: Seed Shape
        </h2>
        <p className="text-center text-purple-600 mb-6">
          Drag phenotypes to complete the Punnett square (Round vs Wrinkled)
        </p>

        {/* Instructions */}
        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-purple-700 mb-2">Instructions:</h3>
          <p className="text-sm text-gray-700">
            In this cross between heterozygous plants (Rr × Rr), determine the
            phenotype for each offspring. Round is dominant over wrinkled. Click
            on placed items to remove them.
          </p>
        </div>

        {/* Parent Traits */}
        <div className="flex justify-center gap-12 mb-8">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <img
              src={roundImage}
              alt="Round"
              className="w-24 h-24 object-contain mx-auto mb-2 rounded-lg"
            />
            <p className="font-semibold text-green-700">Round (Dominant)</p>
            <p className="text-sm text-gray-600">RR or Rr</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <img
              src={wrinkledImage}
              alt="Wrinkled"
              className="w-24 h-24 object-contain mx-auto mb-2 rounded-lg"
            />
            <p className="font-semibold text-yellow-700">Wrinkled (Recessive)</p>
            <p className="text-sm text-gray-600">rr only</p>
          </div>
        </div>

        {/* Punnett Square Layout */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-12">
          {/* Draggable Options */}
          <div className="text-center lg:order-1">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              Available Phenotypes
            </h3>
            <div className="flex flex-row lg:flex-col gap-6 justify-center items-center">
              <DraggableImage name="Round" src={roundImage} onDragStart={handleDragStart} />
              <DraggableImage name="Wrinkled" src={wrinkledImage} onDragStart={handleDragStart} />
            </div>
          </div>

          {/* Punnett Square */}
          <div className="text-center lg:order-2">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              Punnett Square (Rr × Rr)
            </h3>

            {/* Genotype Grid */}
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
                <div></div>
                <div className="w-20 h-8 flex items-center justify-center bg-blue-100 rounded font-semibold text-blue-700">R</div>
                <div className="w-20 h-8 flex items-center justify-center bg-blue-100 rounded font-semibold text-blue-700">r</div>

                <div className="w-20 h-8 flex items-center justify-center bg-blue-100 rounded font-semibold text-blue-700">R</div>
                <div className="w-20 h-8 flex items-center justify-center bg-gray-100 rounded text-xs font-mono">RR</div>
                <div className="w-20 h-8 flex items-center justify-center bg-gray-100 rounded text-xs font-mono">Rr</div>

                <div className="w-20 h-8 flex items-center justify-center bg-blue-100 rounded font-semibold text-blue-700">r</div>
                <div className="w-20 h-8 flex items-center justify-center bg-gray-100 rounded text-xs font-mono">Rr</div>
                <div className="w-20 h-8 flex items-center justify-center bg-gray-100 rounded text-xs font-mono">rr</div>
              </div>
            </div>

            {/* Drop Zones */}
            <p className="text-sm text-gray-600 mb-2">Drag phenotypes to match genotypes:</p>
            <div className="grid grid-cols-2 gap-4">
              {placements.map((placed, i) => (
                <div key={i} onClick={() => removeFromSquare(i)}>
                  <DropZone
                    index={i}
                    placed={placed}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    isDragOver={dragOverIndex === i}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={handleCheck}
            className="px-8 py-3 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 font-semibold transition-colors duration-200"
          >
            Check Answer
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 font-semibold transition-colors duration-200"
          >
            Reset
          </button>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`mt-6 p-4 rounded-lg text-center font-semibold text-lg ${
              result.includes("Correct")
                ? "bg-green-100 text-green-800 border border-green-300"
                : result.includes("wrong")
                ? "bg-red-100 text-red-800 border border-red-300"
                : "bg-yellow-100 text-yellow-800 border border-yellow-300"
            }`}
          >
            {result}
          </div>
        )}

        {/* Educational Info */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">About This Cross:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div><strong className="text-purple-600">Genotype:</strong> The genetic makeup (RR, Rr, rr)</div>
            <div><strong className="text-purple-600">Phenotype:</strong> The observable trait (Round or Wrinkled)</div>
            <div><strong className="text-purple-600">Dominant:</strong> Round trait (R) - shows even with one copy</div>
            <div><strong className="text-purple-600">Recessive:</strong> Wrinkled trait (r) - needs two copies to show</div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            <strong>Expected ratio:</strong> 3 Round : 1 Wrinkled (75% Round, 25% Wrinkled)
          </p>
        </div>
      </div>
    </div>
  );
}
