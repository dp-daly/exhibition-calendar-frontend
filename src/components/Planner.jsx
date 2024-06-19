import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { getPayload, isAdmin } from '../lib/auth.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Planner() {

    const navigate = useNavigate()

    const [user, setUser] = useState({ savedExhibitions: [] })
    const { userId } = useParams()

    useEffect(() => {
        fetchUser()
    }, [user])

    useEffect(() => {
        const toastMessage = localStorage.getItem('toastMessage')
        if (toastMessage) {
          toast(toastMessage)
          localStorage.removeItem('toastMessage')
        }
      }, [])

    async function fetchUser() {
        const resp = await fetch(`/api/user/${userId}`)
        const data = await resp.json()
        setUser(data)
    }

    async function handleRemoveFromPlanner(e) {
        try {
            const userId = getPayload().userId
            const token = localStorage.getItem("token")
            await axios.delete(`/api/user/${userId}/${e.target.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="page-wrapper">
            <h1 className="title">Your exhibitions</h1>
            <div className="box-wrapper">
                {user.savedExhibitions.map((exhibition, index) => (
                    <div key={index} className="exhibition-card">
                        <div className="img-container">
                            <Link to={`/gallery/${exhibition._id}`} className="exhibition-link">
                                <img className="img-placeholder" src={exhibition.image} alt={exhibition.exhibitionTitle} />
                            </Link>
                            <button id={exhibition._id} className="remove-from-planner-button" onClick={handleRemoveFromPlanner}>x</button>
                        </div>
                        <div className="card-footer">
                            <div className="exhibition-title">
                                {exhibition.exhibitionTitle}
                            </div>
                            <div>
                                {exhibition.museum}
                            </div>
                        </div>
                    </div>
                ))}
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
                toastStyle={{ backgroundColor: "blue", color: "white" }}
            />
        </div>
    )
}

