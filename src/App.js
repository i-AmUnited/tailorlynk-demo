import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/general pages/homePage';

function App() {
  return (
    <div className='bg-[#f3f3f3] min-h-screen'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/dashboard/*" element={<UserDashboard />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
