import React from 'react';
import { Route, Routes } from '../node_modules/react-router-dom/dist/index';
import NewsPage from './pages/NewsPage';

function App() {

  return (
    <Routes>
      <Route path='/:category?' element={<NewsPage />} />;
    </Routes>
  );
}

export default App;
