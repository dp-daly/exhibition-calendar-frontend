import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import Signup from './components/Signup'
import Signin from './components/Signin'
import CreateExhibition from './components/CreateExhibition'
import ShowExhibition from './components/ShowExhibition'
import EditExhibition from './components/EditExhibition'
import Planner from './components/Planner'



function App() {
  return <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/gallery/create" element={<CreateExhibition />} />
      <Route path="/gallery/:exhibitionId/edit" element={<EditExhibition />} />
      <Route path="/gallery/:exhibitionId" element={<ShowExhibition />} />
      <Route path="/user/:userId" element={<Planner />} />
    </Routes>
  </Router>
}

export default App