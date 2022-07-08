import Navigation from './components/Navigation'
import Home from "./components/Home"
import About from "./components/About"
import GPT3 from "./components/Gpt3"
import Footer from "./components/Footer"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
      <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/gpt3" element={<GPT3 />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;