import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/Home';
import Footer from './components/footer/Footer';
import LawyerProfile from './pages/Lawyer/LayerProfile';
import Lawyer from './pages/Lawyers/Lawyer';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lawyer" element={<Lawyer />} />
          <Route
            path="/lawyerprofile/:userId"
            element={<LawyerProfile />}
          />{' '}
          {/* Dynamic route */}
        </Routes>
        <div className="container"></div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
