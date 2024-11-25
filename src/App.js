import Navigation from './components/Navigation'
import Home from "./components/Home"
import Footer from "./components/Footer"
import ErrorBoundary from './components/ErrorBoundary'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </ErrorBoundary>
    </Router>
  );
}

export default App;