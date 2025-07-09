import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import Product from './products/Product';
import { BrowserRouter, Routes, Route, data } from "react-router-dom";
import PaymentSuccess from './components/PaymentSuccess';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product/>} />
          <Route path='/paymentSuccess' element={<PaymentSuccess />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
