import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { getPayload, isAdmin } from '../lib/auth.js'



function ShowExhibition() {
    
    const navigate = useNavigate()
    const { exhibitionId } = useParams()
    const [exhibition, setExhibition] = useState({})

    useEffect(() => {
        async function fetchExhibitions() {
          const resp = await fetch(`/api/gallery/${exhibitionId}`)
          const data = await resp.json()
          setExhibition(data)
        }
        fetchExhibitions()
      }, [exhibitionId])

      return <div className="section">
      <div className="container">
        <h1 className="title">{exhibition.exhibitionTitle}</h1>
        {isAdmin() && <Link to={`/gallery/${exhibitionId}/edit`} className="button">Edit</Link>}
      </div>
    </div>


}

export default ShowExhibition