import React, { useState } from "react";
import "../../../index.css";
import Button from "../../HomePage/Components/Button";
import Physics from "../../../assets/physics.png";
import Chemistry from "../../../assets/chemistry.png";
import Mathematics from "../../../assets/mathematics1.png";
import Biology from "../../../assets/biology.png";
import Computer from "../../../assets/computer.png";

const syllabus = {
  Physics: {
    6: ["Motion basics", "Forces basics"],
    7: ["Energy forms", "Newton’s Laws"],
    8: ["Work & Power", "Friction"],
    9: ["Gravitation", "Sound"],
    10: ["Light", "Electricity"],
    11: ["Waves", "Thermodynamics"],
    12: ["Electromagnetism", "Modern Physics"],
  },
  Chemistry: {
    6: ["Introduction to Atoms", "Simple Reactions"],
    7: ["Acids & Bases", "Mixtures"],
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
    8: ["Reproduction", "Microorganisms"],
    9: ["Tissues", "Diversity"],
    10: ["Life Processes", "Heredity"],
    11: ["Cell Biology", "Plant Physiology"],
    12: ["Genetics", "Evolution"],
  },
  Computer: {
    6: ["Basics of Computers", "MS Office"],
    7: ["Internet", "Scratch Programming"],
    8: ["HTML Basics", "Flowcharts"],
    9: ["Python Basics", "DBMS Intro"],
    10: ["OOP Concepts", "Networks"],
    11: ["Data Structures", "SQL"],
    12: ["AI Basics", "Advanced Python"],
  },
};

function SubjectSelection() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div className="subject-selection">
      {/* Heading */}
      <h1 className="text-purple-900 font-bold text-6xl text-center p-6">
        Select your Class & Subject
      </h1>

      {/* Main row */}
      <div className="flex flex-row gap-80 p-10">
        {/* Left column: Classes & Subjects */}
        <div className="flex flex-row gap-36">
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
            <div className="bg-transparent rounded-2xl shadow-2xl shadow-gray-900 p-8 w-[30rem] h-[30rem] transition-transform duration-300 hover:scale-105 overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4 text-purple-800">
                Class {selectedClass} - {selectedSubject} Syllabus
              </h2>
              <ul className="space-y-2">
                {syllabus[selectedSubject][selectedClass].map((topic, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900"
                    >
                      {topic}
                    </a>
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
