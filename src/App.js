import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Structure from './pages/pageStructure';
import SignIn from './pages/auth pages/signin';
import CreateAccount from './pages/auth pages/createAccount';
import ResetPassword from './pages/auth pages/resetPassword';
import Home from './pages/general pages/homePage';
import TailorProfile from './pages/general pages/tailorProfile';
import ErrorPage from './pages/errorPage';
import ProductDetail from './pages/general pages/productPage';
import Cart from './pages/general pages/cart';
import AllProducts from './pages/general pages/Products';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Structure />} >
          <Route index element={<Home />} />
          <Route path="tailor-profile" element={<TailorProfile />} />
          <Route path="product-detail" element={<ProductDetail />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
