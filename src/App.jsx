import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Frontend/HomePage/Pages/HomePages.jsx';
import NavBar from './Frontend/HomePage/Components/NavBar.jsx';
import SubjectSelection from './Frontend/Lessons/Pages/SubjectSelection.jsx'
import ProfilePage from './Frontend/Profile/Pages/ProfilePage.jsx'
import AtomGame from './Frontend/Lessons/Pages/AtomGame.jsx';
import PeriodicTableGame from './Frontend/Lessons/Pages/PeriodicTableGame.jsx';
import SortingGame from './Frontend/Lessons/Pages/Sorting.jsx';
import DataStructureGame from './Frontend/Lessons/Pages/DataStructure.jsx'
import Class8Game from './Frontend/Lessons/Pages/Class8Game.jsx';
import Hereditary from './Frontend/Lessons/Pages/HereditaryAndEvolution.jsx'
import Population from './Frontend/Lessons/Pages/Population.jsx'

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject-selection" element={<SubjectSelection />} />
          <Route path='/my-profile' element={<ProfilePage />} />
          <Route path='/atom-game' element={<AtomGame />} />
          <Route path='/periodic-table-game' element={<PeriodicTableGame />} />
          <Route path='/sorting-game' element={<SortingGame />} />
          <Route path='/data-structure' element={<DataStructureGame />} />
          <Route path='/class-8' element={<Class8Game />} />
          <Route path='/hereditary' element={<Hereditary />} />
          <Route path='/population-game' element={<Population/>}/>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;