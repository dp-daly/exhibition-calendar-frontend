import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { getPayload, isAdmin } from '../lib/auth.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../config';

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
    const resp = await fetch(`${baseUrl}/gallery/${exhibitionId}`)
    const data = await resp.json()
    setExhibition(data)
  }

  async function handleDelete() {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`${baseUrl}/gallery/${exhibitionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  async function handleAddToPlanner() {
    try {
      const userId = getPayload().userId;
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}/user/${userId}/${exhibitionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (response.status === 200) {
        localStorage.setItem('toastMessage', `${exhibition.exhibitionTitle} has been added to your planner!`);
        navigate(`/user/${userId}`);
      }
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.message === "Exhibition already in planner") {
        toast.error("This exhibition is already in your planner!");
      } else {
        console.log(err);
      }
    }
  }

  return (
    <div className="show-page-container">

        <h1 className="title">{exhibition.exhibitionTitle}</h1>
        <h2 className="exhibition-title">{exhibition.museum}, {exhibition.location}</h2>
        <p>{exhibition.startDate} until {exhibition.endDate}</p>


        <div className='show-page-image-and-tags-container'>

          <img className="image-on-show-page" src={exhibition.image} alt={exhibition.exhibitionTitle} />

          <div className="tag-container">
            <div className="tag">{exhibition.movement}</div>
            <div className="tag">{exhibition.artists}</div>
            <div className="tag">{exhibition.price}</div>
          </div>

        </div>

      <p className='show-page-description'>{exhibition.description}</p>

      <div className="buttons">
        {isLoggedIn && <button className="button" onClick={handleAddToPlanner}>Add to planner</button>}
        {isAdmin() && <Link to={`/gallery/${exhibitionId}/edit`} className="button">Edit</Link>}
        {isAdmin() && <button className="button is-danger" onClick={handleDelete}>Remove this exhibition from the gallery</button>}
      </div>
    <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ backgroundColor: "black", color: "white" }}
        />
      </div>

  )


}

export default ShowExhibition