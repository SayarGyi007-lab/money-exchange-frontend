import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BuyMoneyChanger from "./components/User/BuyMoneyChanger.jsx";
import HomePage from "./components/User/HomePage.jsx"
import SellMoneyChanger from "./components/User/SellMoneyChanger.jsx"
import AdminHomePage from "./components/Admin/HomePage.jsx"
import UpdateRates from "./components/Admin/UpdateRates.jsx";
import CheckPayments from "./components/Admin/CheckPayments.jsx";
import PaymentUpdate from "./components/Admin/UpdatePayment.jsx";
import RecordUser from "./components/User/record_user/RecordUser.jsx";
import Pending from "./components/User/record_user/Pending.jsx";


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/buy-money" element={<BuyMoneyChanger/>}/>
        <Route path="/sell-money" element={<SellMoneyChanger/>}/>
        <Route path="/payment-record" element={<RecordUser/>}/>
        <Route path="/pending" element={<Pending/>}/>

        <Route path="/admin/" element={<AdminHomePage/>}/>
        <Route path="/admin/update-rates" element={<UpdateRates/>}/>
        <Route path="/admin/update-payment" element={<PaymentUpdate />} />
        <Route path="/admin/check-payments" element={<CheckPayments/>}/>
      </Routes>
    </Router>
  )
}

export default App
