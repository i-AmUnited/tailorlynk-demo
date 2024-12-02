import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Structure from './pages/pageStructure';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Structure />} />
        {/* <Route path="/sign-in" element={<SignIn />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
