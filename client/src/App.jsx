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
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import OnlineStatus from './components/OnlineStatus';
function App() {


  return (
    <BrowserRouter>
    <ScrollToTop />
    <OnlineStatus />
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
          <Route path='/update-post/:postId' element={<UpdatePost />} />   
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App
