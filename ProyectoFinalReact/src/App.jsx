import "./App.css";

import ItemListContainer from "./ItemListContainer/ItemListContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import ItemDetailContainer from "./ItemDetailContainer/ItemDetailContainer";
import { CartProvider } from "./Context/CartContext";
import Checkout from "./Checkout/Checkout"
import CartContainer from "./CartContainer/CartContainer";
import Footer from "./Footer/Footer";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import OrderListContainer from "./OrderListContainer/OrderListContainer";



function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} errorElement={<NotFoundPage />} />
          <Route path="/categoria/:categoryId" element={<ItemListContainer />} />
          <Route path="/producto/:itemId" element={<ItemDetailContainer />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shoppingcart" element={<CartContainer />} />
          <Route path="/orders" element={<OrderListContainer />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;