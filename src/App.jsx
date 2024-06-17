import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import Signup from './components/Signup'
import Signin from './components/Signin'
import CreateExhibition from './components/CreateExhibition'
import ShowExhibition from './components/ShowExhibition'
import EditExhibition from './components/EditExhibition'


function App() {
  return <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/gallery/create" element={<CreateExhibition />} />
      <Route path="/gallery/edit" element={<EditExhibition />} />
      <Route path="/gallery/:exhibitionId" element={<ShowExhibition />} />
    </Routes>
  </Router>
}

export default App