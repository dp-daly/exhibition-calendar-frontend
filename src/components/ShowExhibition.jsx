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

      // TODO LOGIC TO REUSE ON PLANNER PAGE
      // ! WILL NEED TO ADD E.TARGET TO KNOW WHICH EXHIBITION IS BEING 'PULLED'
      // async function handleRemoveFromPlanner() {
      //   try {
      //     const userId = getPayload().userId
      //     const token = localStorage.getItem("token")
      //     await axios.delete(`/api/user/${userId}/${exhibitionId}`, {
      //       headers: { Authorization: `Bearer ${token}` }
      //     })
      //     navigate(`/user/${userId}`)
      //   } catch (err) {
      //     console.log(err)
      //   }
      // }

      return <div className="section">
      <div className="container">
        <h1 className="title">{exhibition.exhibitionTitle}</h1>
        {isLoggedIn && <button className="button" onClick={handleAddToPlanner}>Add to planner</button>}
        {isAdmin() && <Link to={`/gallery/${exhibitionId}/edit`} className="button">Edit</Link>}
        {isAdmin() && <button className="button is-danger" onClick={handleDelete}>Delete {exhibition.exhibitionTitle}</button>}
      </div>
    </div>


}

export default ShowExhibition