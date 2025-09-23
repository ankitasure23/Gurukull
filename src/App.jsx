import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Frontend/HomePage/Pages/HomePages.jsx';
import NavBar from './Frontend/HomePage/Components/NavBar.jsx';
import SubjectSelection from './Frontend/Lessons/Pages/SubjectSelection.jsx'
import ProfilePage from './Frontend/Profile/Pages/ProfilePage.jsx'

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject-selection" element={<SubjectSelection />} />
          <Route path='/my-profile' element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;