import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Frontend/HomePage/Pages/HomePages.jsx';
import NavBar from './Frontend/HomePage/Components/NavBar.jsx';
import SubjectSelection from './Frontend/Lessons/Pages/SubjectSelection.jsx'

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject-selection" element={<SubjectSelection />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;