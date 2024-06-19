import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { getPayload, isAdmin } from '../lib/auth.js'

function ShowExhibition() {

  const navigate = useNavigate()
  const { exhibitionId } = useParams()
  const [exhibition, setExhibition] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    fetchExhibitions()
    setIsLoggedIn(getPayload())
  }, [])

  async function fetchExhibitions() {
    const resp = await fetch(`/api/gallery/${exhibitionId}`)
    const data = await resp.json()
    setExhibition(data)
  }

  async function handleDelete() {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`/api/gallery/${exhibitionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  async function handleAddToPlanner() {
    try {
      const userId = getPayload().userId
      const token = localStorage.getItem("token")
      await axios.post(`/api/user/${userId}/${exhibitionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate(`/user/${userId}`)
    } catch (err) {
      console.log(err)
    }
  }

  return <div>
    <div className="container">

      <h1 className="title">{exhibition.exhibitionTitle}</h1>
      <h2 className="exhibition-title">{exhibition.museum}, {exhibition.location}</h2>
      <p>{exhibition.startDate} until {exhibition.endDate}</p>
      
      <img src={exhibition.image} alt={exhibition.exhibitionTitle} />
      <p className='show-page-description'>{exhibition.description}</p>

      <div className="tag-container">
        <span className="tag">{exhibition.movement}</span>
        <span className="tag">{exhibition.artists}</span>
      </div>

      <div className="buttons">
        {isLoggedIn && <button className="button" onClick={handleAddToPlanner}>Add to planner</button>}
        {isAdmin() && <Link to={`/gallery/${exhibitionId}/edit`} className="button">Edit</Link>}
        {isAdmin() && <button className="button is-danger" onClick={handleDelete}>Remove this exhibition from the gallery</button>}
      </div>

    </div>
  </div>


}

export default ShowExhibition