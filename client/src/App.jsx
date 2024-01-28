import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Header from './components/Header';
import Projects from './pages/Projects';
import FooterComponent from './components/FooterComponent';
import PrivateRoute from './components/PrivateRoute';
import Demo from './components/Demo';
import OnlyPrivatePrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePosts from './pages/CreatePosts';
function App() {


  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/demo' element={<Demo />} />
        <Route element={<PrivateRoute />} >
          <Route path='/dashboard' element={<Dashboard />} />   
        </Route>
        <Route element={<OnlyPrivatePrivateRoute />} >
          <Route path='/create-post' element={<CreatePosts />} />   
        </Route>
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App
