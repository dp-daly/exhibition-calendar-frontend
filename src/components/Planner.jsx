import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { getPayload, isAdmin } from '../lib/auth.js'

export default function Planner() {

    const navigate = useNavigate()

    const [user, setUser] = useState({ savedExhibitions: [] })
    const { userId } = useParams()

    useEffect(() => {
        fetchUser()
    }, [user])

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
            navigate(`/user/${userId}`)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <p>Hello {user.firstName}</p>
            <ul>
                {user.savedExhibitions.map((exhibition, index) => (
                    <>
                        <li key={exhibition._id}>{exhibition.exhibitionTitle}</li>
                        <div className="img-container">
                            <li><img id={exhibition._id} className="img-placeholder" src={exhibition.image} alt="" /></li>
                            <li><button id={exhibition._id} className="remove-from-planner-button" onClick={handleRemoveFromPlanner}>x</button></li>
                        </div>
                    </>
                ))}
            </ul>
        </div>
    )
}