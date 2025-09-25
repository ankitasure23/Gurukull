import React, { useState } from "react";
import "../css/DataStruct.css";

export default function DataStructuresGame() {
  const [stack, setStack] = useState([]);
  const [queue, setQueue] = useState([]);
  const [circularQueue, setCircularQueue] = useState(Array(5).fill(null));
  const [cqFront, setCqFront] = useState(0);
  const [cqRear, setCqRear] = useState(0);
  const [deque, setDeque] = useState([]);
  const [priorityQueue, setPriorityQueue] = useState([]);
  const [linkedList, setLinkedList] = useState([]);
  const [doublyLinkedList, setDoublyLinkedList] = useState([]);
  const [circularSinglyLL, setCircularSinglyLL] = useState([]);
  const [circularDoublyLL, setCircularDoublyLL] = useState([]);
  const [input, setInput] = useState("");
  
  // Dropdown selection state
  const [selectedStructure, setSelectedStructure] = useState("");

  /* ------------------ HELPER FUNCTIONS ------------------ */
  const handleInput = (e) => setInput(e.target.value);

  /* -------- STACK -------- */
  const pushStack = () => { if (input) { setStack([input, ...stack]); setInput(""); } };
  const popStack = () => { if (stack.length > 0) setStack(stack.slice(1)); };

  /* -------- SIMPLE QUEUE -------- */
  const enqueue = () => { if (input) { setQueue([...queue, input]); setInput(""); } };
  const dequeue = () => { if (queue.length > 0) setQueue(queue.slice(1)); };

  /* -------- CIRCULAR QUEUE -------- */
  const cqEnqueue = () => {
    const nextRear = (cqRear + 1) % circularQueue.length;
    if (nextRear === cqFront && circularQueue[cqFront] !== null) { alert("Circular Queue is Full!"); return; }
    const newCQ = [...circularQueue]; newCQ[cqRear] = input; setCircularQueue(newCQ);
    setCqRear(nextRear); setInput("");
  };
  const cqDequeue = () => {
    if (cqFront === cqRear && circularQueue[cqFront] === null) { alert("Circular Queue is Empty!"); return; }
    const newCQ = [...circularQueue]; newCQ[cqFront] = null; setCircularQueue(newCQ);
    setCqFront((cqFront + 1) % circularQueue.length);
  };

  /* -------- DEQUE -------- */
  const insertFront = () => { if (input) { setDeque([input, ...deque]); setInput(""); } };
  const insertRear = () => { if (input) { setDeque([...deque, input]); setInput(""); } };
  const deleteFront = () => setDeque(deque.slice(1));
  const deleteRear = () => setDeque(deque.slice(0, -1));

  /* -------- PRIORITY QUEUE -------- */
  const pqEnqueue = () => {
    if (input.includes(",")) {
      let [val, priority] = input.split(",");
      let newPQ = [...priorityQueue, { val, priority: parseInt(priority) }];
      newPQ.sort((a, b) => a.priority - b.priority); setPriorityQueue(newPQ); setInput("");
    } else { alert("Enter as value,priority (e.g., A,2)"); }
  };
  const pqDequeue = () => { if (priorityQueue.length > 0) setPriorityQueue(priorityQueue.slice(1)); };

  /* -------- LINKED LISTS -------- */
  const insertAtEnd = () => { if (input) { setLinkedList([...linkedList, input]); setInput(""); } };
  const deleteFromEnd = () => { setLinkedList(linkedList.slice(0, -1)); };

  const insertDoublyEnd = () => { if (input) { setDoublyLinkedList([...doublyLinkedList, input]); setInput(""); } };
  const deleteDoublyEnd = () => { setDoublyLinkedList(doublyLinkedList.slice(0, -1)); };

  const insertCSLL = () => { if (input) { setCircularSinglyLL([...circularSinglyLL, input]); setInput(""); } };
  const deleteCSLL = () => { setCircularSinglyLL(circularSinglyLL.slice(0, -1)); };

  const insertCDLL = () => { if (input) { setCircularDoublyLL([...circularDoublyLL, input]); setInput(""); } };
  const deleteCDLL = () => { setCircularDoublyLL(circularDoublyLL.slice(0, -1)); };

  /* ---------- LINKED LIST RENDER HELPERS ---------- */
  const renderSingly = (list) => list.map((item, idx) => (
    <div key={idx} className="node-box">
      <div className="data-box">{item}</div>
      {idx < list.length - 1 && <span className="link-arrow">Next →</span>}
    </div>
  ));

  const renderDoubly = (list) => list.map((item, idx) => (
    <div key={idx} className="node-box">
      {idx > 0 && <span className="link-arrow">← Prev</span>}
      <div className="data-box">{item}</div>
      {idx < list.length - 1 && <span className="link-arrow">Next →</span>}
    </div>
  ));

  const renderCircular = (list) => list.map((item, idx) => (
    <div key={idx} className="node-box">
      <div className="data-box">{item}</div>
      <span className="link-arrow">Next →</span>
    </div>
  ));

  /* ------------------ JSX ------------------ */
  return (
    <div className="dataStructure-selection">
      <h1>📚 Data Structures Visualizer</h1>

      {/* Dropdown */}
      <div className="input-area">
        <select value={selectedStructure} onChange={(e) => setSelectedStructure(e.target.value)}>
          <option value="">-- Select Data Structure --</option>
          <option value="stack">Stack</option>
          <option value="queue">Simple Queue</option>
          <option value="circularQueue">Circular Queue</option>
          <option value="deque">Deque</option>
          <option value="priorityQueue">Priority Queue</option>
          <option value="singlyLL">Singly Linked List</option>
          <option value="doublyLL">Doubly Linked List</option>
          <option value="circularSLL">Circular Singly Linked List</option>
          <option value="circularDLL">Circular Doubly Linked List</option>
        </select>
      </div>

      {/* Input box */}
      {selectedStructure && (
        <div className="input-area">
          <input type="text" placeholder="Enter value" value={input} onChange={handleInput} />
        </div>
      )}

      {/* ---------- CONDITIONAL RENDERING ---------- */}
      {selectedStructure === "stack" && (
        <div className="card">
          <h2>🟪 Stack (Top-Down)</h2>
          <div className="stack-visual">{stack.map((item, idx) => <div key={idx} className="data-box">{item}</div>)}</div>
          <div className="btn-group"><button onClick={pushStack}>Push</button><button onClick={popStack}>Pop</button></div>
        </div>
      )}

      {selectedStructure === "queue" && (
        <div className="card">
          <h2>🟪 Simple Queue</h2>
          <div className="queue-visual">{queue.map((item, idx) => <div key={idx} className="data-box">{item}</div>)}</div>
          <div className="btn-group"><button onClick={enqueue}>Enqueue</button><button onClick={dequeue}>Dequeue</button></div>
        </div>
      )}

      {selectedStructure === "circularQueue" && (
        <div className="card">
          <h2>🟪 Circular Queue</h2>
          <div className="queue-visual">{circularQueue.map((item, idx) => <div key={idx} className="data-box">{item || "-"}</div>)}</div>
          <div className="btn-group"><button onClick={cqEnqueue}>Enqueue</button><button onClick={cqDequeue}>Dequeue</button></div>
        </div>
      )}

      {selectedStructure === "deque" && (
        <div className="card">
          <h2>🟪 Double-Ended Queue (Deque)</h2>
          <div className="queue-visual">{deque.map((item, idx) => <div key={idx} className="data-box">{item}</div>)}</div>
          <div className="btn-group"><button onClick={insertFront}>Insert Front</button><button onClick={insertRear}>Insert Rear</button><button onClick={deleteFront}>Delete Front</button><button onClick={deleteRear}>Delete Rear</button></div>
        </div>
      )}

      {selectedStructure === "priorityQueue" && (
        <div className="card">
          <h2>🟪 Priority Queue</h2>
          <div className="queue-visual">{priorityQueue.map((item, idx) => <div key={idx} className="data-box">{item.val}({item.priority})</div>)}</div>
          <div className="btn-group"><button onClick={pqEnqueue}>Enqueue (val,priority)</button><button onClick={pqDequeue}>Dequeue</button></div>
        </div>
      )}

      {selectedStructure === "singlyLL" && (
        <div className="card">
          <h2>🟪 Singly Linked List</h2>
          <div className="linkedlist-visual">{renderSingly(linkedList)}</div>
          <div className="btn-group"><button onClick={insertAtEnd}>Insert End</button><button onClick={deleteFromEnd}>Delete End</button></div>
        </div>
      )}

      {selectedStructure === "doublyLL" && (
        <div className="card">
          <h2>🟪 Doubly Linked List</h2>
          <div className="linkedlist-visual">{renderDoubly(doublyLinkedList)}</div>
          <div className="btn-group"><button onClick={insertDoublyEnd}>Insert End</button><button onClick={deleteDoublyEnd}>Delete End</button></div>
        </div>
      )}

      {selectedStructure === "circularSLL" && (
        <div className="card">
          <h2>🟪 Circular Singly Linked List</h2>
          <div className="linkedlist-visual">{renderCircular(circularSinglyLL)}{circularSinglyLL.length>0 && <span className="link-arrow">↺</span>}</div>
          <div className="btn-group"><button onClick={insertCSLL}>Insert End</button><button onClick={deleteCSLL}>Delete End</button></div>
        </div>
      )}

      {selectedStructure === "circularDLL" && (
        <div className="card">
          <h2>🟪 Circular Doubly Linked List</h2>
          <div className="linkedlist-visual">{renderDoubly(circularDoublyLL)}{circularDoublyLL.length>0 && <span className="link-arrow">↺</span>}</div>
          <div className="btn-group"><button onClick={insertCDLL}>Insert End</button><button onClick={deleteCDLL}>Delete End</button></div>
        </div>
      )}

    </div>
  );
}
