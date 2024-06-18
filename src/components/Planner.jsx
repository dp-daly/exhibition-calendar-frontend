import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Planner() {
    const [user, setUser] = useState({ savedExhibitions: [] })
    const { userId } = useParams()

    useEffect(() => {
        fetchUser()
    }, [])
    
    async function fetchUser() {
        const resp = await fetch(`/api/user/${userId}`)
        const data = await resp.json()
        setUser(data)
    }

    return (
        <div>
            <p>Hello {user.firstName}</p>
            <ul>
                {user.savedExhibitions.map((exhibition, index) => (
                    <>
                    <li key={exhibition._id}>{exhibition.exhibitionTitle}</li>
                    <div className="img-container">
                    <li><img className="img-placeholder" src={exhibition.image} alt="" /></li>
                    <li><button className="remove-from-planner-button">x</button></li>
                    </div>
                    </>
                ))}
            </ul>
        </div>
    )
}