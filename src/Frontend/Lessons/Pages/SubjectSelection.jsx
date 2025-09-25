import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../index.css";
import Button from "../../HomePage/Components/Button";
import Physics from "../../../assets/physics.png";
import Chemistry from "../../../assets/chemistry.png";
import Mathematics from "../../../assets/mathematics1.png";
import Biology from "../../../assets/biology.png";
import Computer from "../../../assets/computer.png";
import PeriodicTableGame from "./PeriodicTableGame";

const syllabus = {
  Physics: {
    6: ["Motion basics", "Forces basics", "Electricity"],
    7: ["Energy forms", "Newton’s Laws"],
    8: ["Work & Power", "Friction"],
    9: ["Gravitation", "Sound"],
    10: ["Light", "Electricity"],
    11: ["Waves", "Thermodynamics"],
    12: ["Electromagnetism", "Modern Physics"],
  },
  Chemistry: {
    6: ["Atomic Structure", "Simple Reactions"],
    7: ["Mixtures", "Periodic Table"],
    8: ["Molecules", "Elements"],
    9: ["Periodic Table", "Chemical Reactions"],
    10: ["Metals & Non-Metals", "Carbon Compounds"],
    11: ["Atomic Structure", "Chemical Bonding"],
    12: ["Electrochemistry", "Organic Chemistry"],
  },
  Mathematics: {
    6: ["Basic Algebra", "Geometry"],
    7: ["Fractions", "Integers"],
    8: ["Exponents", "Mensuration"],
    9: ["Polynomials", "Triangles"],
    10: ["Trigonometry", "Probability"],
    11: ["Calculus Basics", "Sequences"],
    12: ["Differentiation", "Integration"],
  },
  Biology: {
    6: ["Plants", "Animals"],
    7: ["Nutrition", "Respiration"],
    8: ["Cell Division", "Microorganisms"],
    9: ["Tissues", "Diversity"],
    10: ["Life Processes", "Heredity and evolution"],
    11: ["Cell Biology", "Plant Physiology"],
    12: ["Genetics", "Population of organisms"],
  },
  Computer: {
    6: ["Basics of Computers", "MS Office"],
    7: ["Internet", "Scratch Programming"],
    8: ["HTML Basics", "Flowcharts"],
    9: ["Python Basics", "DBMS Intro"],
    10: ["OOP Concepts", "Networks"],
    11: ["AI Basics", "Sorting"],
    12: ["Data Structures", "Advanced Python"],
  },
};

function SubjectSelection() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div className="subject-selection shadow-2xl shadow-gray-950">
      {/* Heading */}
      <h1 className="text-purple-900 font-bold text-6xl text-center p-6">
        Select your Class & Subject
      </h1>

      {/* Main row */}
      <div className="flex flex-row gap-12 p-10">
        {/* Left column: Classes & Subjects */}
        <div className="flex flex-row gap-8">
          {/* Class Buttons */}
          <div className="flex flex-col gap-11 p-6">
            {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
              <Button
                key={cls}
                text={cls.toString()}
                name={`Class ${cls}`}
                onClick={() => setSelectedClass(cls)}
              />
            ))}
          </div>

          {/* Subject Buttons */}
          <div className="flex flex-col gap-11 p-6">
            <Button
              icon={Physics}
              name="Physics"
              onClick={() => setSelectedSubject("Physics")}
            />
            <Button
              icon={Chemistry}
              name="Chemistry"
              onClick={() => setSelectedSubject("Chemistry")}
            />
            <Button
              icon={Mathematics}
              name="Mathematics"
              onClick={() => setSelectedSubject("Mathematics")}
            />
            <Button
              icon={Biology}
              name="Biology"
              onClick={() => setSelectedSubject("Biology")}
            />
            <Button
              icon={Computer}
              name="Computer"
              onClick={() => setSelectedSubject("Computer")}
            />
          </div>
        </div>

        {/* Right column: Syllabus card */}
        <div className="flex-1 p-6">
          {selectedSubject && selectedClass ? (
            <div className="bg-transparent rounded-2xl shadow-2xl shadow-gray-900 p-8 max-w-full h-[30rem] transition-transform duration-300 hover:scale-105 overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4 text-purple-800">
                Class {selectedClass} - {selectedSubject} Syllabus
              </h2>
              <ul className="space-y-2">
  {syllabus[selectedSubject][selectedClass].map((topic, idx) => (
    <li key={idx}>
      {selectedSubject === "Chemistry" && selectedClass === 6 && topic === "Atomic Structure" ? (
        <Link
          to="/atom-game"
          className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 underline"
        >
          {topic}
        </Link>
      ) : selectedSubject === "Chemistry" && selectedClass === 7 && topic === "Periodic Table" ? (
        <Link
          to="/periodic-table-game"
          className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 underline"
        >
          {topic}
        </Link>
      ) :
       selectedSubject === "Biology" && selectedClass === 8 && topic === "Cell Division" ? (
        <Link
          to="/class-8"
          className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 underline"
        >
          {topic}
        </Link>
        ) :
      selectedSubject === "Biology" && selectedClass === 10 && topic === "Heredity and evolution" ? (
        <Link
          to="/hereditary"
          className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 underline"
        >
          {topic}
        </Link>
      ) : selectedSubject === "Computer" && selectedClass === 11 && topic === "Sorting" ? (
        <Link
          to="/sorting-game"
          className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 underline"
        >
          {topic}
        </Link>
      ) : selectedSubject === "Computer" && selectedClass === 12 && topic === "Data Structures" ? (
        <Link
          to="/data-structure"
          className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 underline"
        >
          {topic}
        </Link>
          ) :
      selectedSubject === "Biology" && selectedClass === 12 && topic === "Population of organisms" ? (
        <Link
          to="/population-game"
          className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 underline"
        >
          {topic}
        </Link>
      ) : (
        <span className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900">
          {topic}
        </span>
      )}
    </li>
  ))}
</ul>

            </div>
          ) : (
            <div className="bg-transparent shadow-neutral-900 shadow-2xl rounded-2xl p-8 w-[30rem] h-[30rem] flex items-center justify-center text-purple-700">
              Select a Class and Subject to see the syllabus
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubjectSelection;
