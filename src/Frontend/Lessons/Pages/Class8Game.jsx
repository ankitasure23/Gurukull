import React, { useState } from "react";
import '../../../index.css'; 

const stages = [
  { id: 1, name: "Prophase", img: "https://via.placeholder.com/100x100/e0f2fe/1565c0?text=Prophase" },
  { id: 2, name: "Metaphase", img: "https://via.placeholder.com/100x100/f3e5f5/7b1fa2?text=Metaphase" },
  { id: 3, name: "Anaphase", img: "https://via.placeholder.com/100x100/e8f5e8/2e7d32?text=Anaphase" },
  { id: 4, name: "Telophase", img: "https://via.placeholder.com/100x100/fff3e0/f57c00?text=Telophase" },
];

const DraggableImage = ({ stage, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, stage)}
    className="class8-draggable"
  >
    <img
      src={stage.img}
      alt={stage.name}
      className="class8-img"
      style={{ pointerEvents: "none" }}
    />
    <p className="class8-img-label">{stage.name}</p>
  </div>
);

const DropZone = ({ index, placedImages, onDrop, onDragOver, isDragOver }) => (
  <div
    onDrop={(e) => onDrop(e, index)}
    onDragOver={onDragOver}
    onDragEnter={(e) => e.preventDefault()}
    className={`class8-dropzone ${isDragOver ? "class8-dropzone-over" : ""}`}
  >
    {placedImages[index] ? (
      <img
        src={placedImages[index].img}
        alt={placedImages[index].name}
        className="class8-dropzone-img"
      />
    ) : (
      <span className="class8-dropzone-text">Drop here</span>
    )}
  </div>
);

const Class8Game = () => {
  const [shuffledStages, setShuffledStages] = useState([...stages].sort(() => Math.random() - 0.5));
  const [placedImages, setPlacedImages] = useState([null, null, null, null]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleDragStart = (e, stage) => {
    setDraggedItem(stage);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDragOverIndex(null);
    if (!draggedItem || placedImages[index]) return;

    const newPlaced = [...placedImages];
    newPlaced[index] = draggedItem;
    setPlacedImages(newPlaced);

    setShuffledStages(shuffledStages.filter((s) => s.id !== draggedItem.id));
    setDraggedItem(null);
    setFeedback("");
  };

  const handleSubmit = () => {
    const correctOrder = ["Prophase", "Metaphase", "Anaphase", "Telophase"];
    const userOrder = placedImages.map((img) => (img ? img.name : ""));
    if (placedImages.some((img) => img === null)) {
      setFeedback("Please place all stages before submitting!");
      return;
    }
    setFeedback(
      JSON.stringify(userOrder) === JSON.stringify(correctOrder)
        ? "🎉 Correct! You've mastered the stages of mitosis!"
        : "❌ Not quite right. Try again! Remember: Prophase → Metaphase → Anaphase → Telophase"
    );
  };

  const handleReset = () => {
    setPlacedImages([null, null, null, null]);
    setShuffledStages([...stages].sort(() => Math.random() - 0.5));
    setFeedback("");
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const removeFromSlot = (index) => {
    const removedStage = placedImages[index];
    if (!removedStage) return;
    const newPlaced = [...placedImages];
    newPlaced[index] = null;
    setPlacedImages(newPlaced);
    setShuffledStages([...shuffledStages, removedStage].sort(() => Math.random() - 0.5));
    setFeedback("");
  };

  return (
    <div className="class8-container font-bold">
      <div className="class8-inner font-bold">
        <h1 className="class8-title font-bold">🧬 Mitosis Puzzle</h1>
        <p className="class8-subtitle font-bold">Drag and drop the stages in the correct order!</p>

        <div className="class8-instructions font-bold">
          <h3 className="font-bold">Instructions:</h3>
          <p className="font-bold">Arrange the stages of mitosis in the correct order from left to right. Click on placed items to remove them.</p>
        </div>

        <div className="class8-stage-selection font-bold">
          <h3 className="font-bold">Available Stages:</h3>
          <div className="class8-draggable-container font-bold">
            {shuffledStages.map((stage) => (
              <DraggableImage key={stage.id} stage={stage} onDragStart={handleDragStart} />
            ))}
          </div>
          {shuffledStages.length === 0 && <p className="class8-all-placed font-bold">All stages have been placed!</p>}
        </div>

        <div className="class8-dropzone-container font-bold">
          <h3>Correct Order:</h3>
          <div className="class8-dropzone-row font-bold">
            {placedImages.map((_, index) => (
              <div key={index} className="class8-dropzone-wrapper font-bold">
                <div onClick={() => removeFromSlot(index)}>
                  <DropZone
                    index={index}
                    placedImages={placedImages}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    isDragOver={dragOverIndex === index}
                  />
                </div>
                <p>Stage {index + 1}</p>
              </div>
            ))}
          </div>
        </div>

        {feedback && <div className={`class8-feedback ${feedback.includes("Correct") ? "class8-feedback-correct" : "class8-feedback-wrong"}`}>{feedback}</div>}

        <div className="class8-buttons">
          <button onClick={handleSubmit}>Check Answer</button>
          <button onClick={handleReset}>Reset Puzzle</button>
        </div>
      </div>
    </div>
  );
};

export default Class8Game;
