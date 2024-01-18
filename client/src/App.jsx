import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './pages/Projects';
function App() {


  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
