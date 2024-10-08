import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import Forgotpassword from './pages/Forgotpassword';
import Signup from './pages/Signup';
import Resetpassword from './pages/Resetpassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path="about" element={<Layout><About /></Layout>} />
          <Route path="contact" element={<Layout><Contact /></Layout>} />
          <Route path="product" element={<Layout><OurStore /></Layout>} />
          <Route path="product/:id" element={<Layout><SingleProduct/></Layout>} />
          <Route path="blogs" element={<Layout><Blog/></Layout>} />
          <Route path="blog/:id" element={<Layout><SingleBlog/></Layout>} />
          <Route path="cart" element={<Layout><PrivateRoutes><Cart/></PrivateRoutes></Layout>} />
          <Route path="my-orders" element={<Layout><PrivateRoutes><Orders/></PrivateRoutes></Layout>} />
          <Route path="my-profile" element={<Layout><PrivateRoutes><Profile/></PrivateRoutes></Layout>} />


          <Route path="checkout" element={<Layout><PrivateRoutes><Checkout/></PrivateRoutes></Layout>} />
          <Route path="compare-product" element={<Layout><CompareProduct/></Layout>} />
          <Route path="wishlist" element={<Layout><PrivateRoutes><Wishlist/></PrivateRoutes></Layout>} />
          <Route path="login" element={<Layout><OpenRoutes><Login/></OpenRoutes></Layout>} />
          <Route path="forgot-password" element={<Layout><Forgotpassword/></Layout>} />
          <Route path="signup" element={<Layout><OpenRoutes><Signup/></OpenRoutes></Layout>} />
          <Route path="reset-password/:token" element={<Layout><Resetpassword/></Layout>} />
          <Route path="privacy-policy" element={<Layout><PrivacyPolicy/></Layout>} />
          <Route path="refund-policy" element={<Layout><RefundPolicy/></Layout>} />
          <Route path="shipping-policy" element={<Layout><ShippingPolicy/></Layout>} />
          <Route path="terms-conditions" element={<Layout><TermsAndConditions/></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
