import {BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import Event from "./Pages/Event"
import Leaderboard from "./Pages/Leaderboard"
import Prizes from "./Pages/Prizes"
import HomeAdmin from "./Pages/HomeAdmin"
import EventAdmin from "./Pages/EventAdmin"
import FAQ from "./Pages/FAQ"


function App() {
  return ( //routes to where the user navigates to
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event/:id" element={<Event/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/prizes" element={<Prizes/>} />
          <Route path="/home-admin" element={<HomeAdmin/>} />
          <Route path="/event-admin/:id" element={<EventAdmin/>} />
          <Route path="/faq" element={<FAQ/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
