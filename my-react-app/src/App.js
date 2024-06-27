import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import CheckInPage from './components/CheckInPage';
import GetStartedPage from './components/GetStartedPage';
import ImageTakingPage from './components/ImageTakingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/check-in" element={<CheckInPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/image-taking" element={<ImageTakingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
