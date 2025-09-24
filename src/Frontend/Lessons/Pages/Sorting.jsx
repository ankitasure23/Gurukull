import React, { useState, useEffect } from "react";
import "../../../index.css";

function SortingGame() {
  const [array, setArray] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("bubble");

  // Generate new random array
  const generateArray = () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArr);
    setActiveIndices([]);
    setMessage("Array is ready!");
  };

  useEffect(() => {
    generateArray();
  }, []);

  // Delay helper
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Start sorting
  const startSorting = async () => {
    setMessage(`Sorting using ${method.toUpperCase()} sort...`);
    let arr = [...array];

    if (method === "bubble") await bubbleSort(arr);
    if (method === "selection") await selectionSort(arr);
    if (method === "insertion") await insertionSort(arr);
    if (method === "merge") await mergeSortWrapper(arr);

    setMessage("✅ Sorting completed!");
  };

  /* ===== SORTING ALGORITHMS ===== */

  // Bubble Sort
  const bubbleSort = async (arr) => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await delay(500);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await delay(300);
        }
      }
    }
    setActiveIndices([]);
  };

  // Selection Sort
  const selectionSort = async (arr) => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        setActiveIndices([minIdx, j]);
        await delay(500);
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        await delay(300);
      }
    }
    setActiveIndices([]);
  };

  // Insertion Sort
  const insertionSort = async (arr) => {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        setActiveIndices([j, j + 1]);
        await delay(500);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        j--;
        await delay(300);
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setActiveIndices([]);
  };

  // Merge Sort
  const mergeSortWrapper = async (arr) => {
    const mergeSort = async (arr, start = 0) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = await mergeSort(arr.slice(0, mid), start);
      const right = await mergeSort(arr.slice(mid), start + mid);
      return await merge(left, right, start);
    };

    const merge = async (left, right, startIdx) => {
      let result = [];
      let i = 0, j = 0;
      while (i < left.length && j < right.length) {
        setActiveIndices([startIdx + i, startIdx + left.length + j]);
        await delay(500);
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
        setArray([...array.slice(0, startIdx), ...result, ...array.slice(startIdx + left.length + right.length)]);
        await delay(300);
      }
      while (i < left.length) result.push(left[i++]);
      while (j < right.length) result.push(right[j++]);
      return result;
    };

    await mergeSort(arr);
    setActiveIndices([]);
  };

  return (
    <div className="sorting-page">
      <h1>🧮 Sorting Challenge Game</h1>

      <div>
        <label>
          Select Sorting Method:{" "}
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
          </select>
        </label>
      </div>

      <div className="teaching">
        <h2>About {method.charAt(0).toUpperCase() + method.slice(1)} Sort</h2>
        <p>
          {method === "bubble" && "Bubble sort repeatedly compares adjacent elements and swaps them if they are in wrong order."}
          {method === "selection" && "Selection sort repeatedly finds the minimum element and places it at the correct position."}
          {method === "insertion" && "Insertion sort builds the sorted array one element at a time, inserting each element at the correct position."}
          {method === "merge" && "Merge sort divides the array into halves, recursively sorts them, and merges the sorted halves."}
        </p>
      </div>

      <div className="table">
        {array.map((num, idx) => (
          <div key={idx} className={`pt-element ${activeIndices.includes(idx) ? "active" : ""}`}>
            {num}
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={startSorting}>Start Sorting</button>
        <button onClick={generateArray}>Reset Array</button>
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default SortingGame;
