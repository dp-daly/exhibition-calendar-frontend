import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { baseUrl } from '../config';

function EditExhibition() {

    const navigate = useNavigate()
    const { exhibitionId } = useParams()

    const [formData, setFormData] = useState({
        exhibitionTitle: "",
        artists: "",
        startDate: "",
        endDate: "",
        location: "",
        museum: "",
        image: "",
        movement: "",
        price: "",
        description: "",
        recommended: false,
        comments: []
    })


    useEffect(() => {
        async function fetchExhibitions() {
            const resp = await fetch(`${baseUrl}/gallery/${exhibitionId}`)
            const data = await resp.json()
            setFormData(data)
        }
        fetchExhibitions()
    }, [exhibitionId])



    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.put(`${baseUrl}/gallery/${exhibitionId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(data)
            navigate('/')
        } catch (err) {
            console.log(err.response.data)
        }
    }

    function handleChange(e) {
        const { name, type, value, checked } = e.target;
        const newFormData = structuredClone(formData)
        newFormData[name] = type === 'checkbox' ? checked : value;
        setFormData(newFormData)
    }


    return <div className="section">
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Exhibition title:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'exhibitionTitle'}
                            onChange={handleChange}
                            value={formData.exhibitionTitle}
                            defaultValue="hello"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Artists:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'artists'}
                            onChange={handleChange}
                            value={formData.artists}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Start date:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'startDate'}
                            onChange={handleChange}
                            value={formData.startDate}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">End date:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'endDate'}
                            onChange={handleChange}
                            value={formData.endDate}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Location:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'location'}
                            onChange={handleChange}
                            value={formData.location}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Museum: </label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'museum'}
                            onChange={handleChange}
                            value={formData.museum}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Image:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'image'}
                            onChange={handleChange}
                            value={formData.image}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Artistic movement:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'movement'}
                            onChange={handleChange}
                            value={formData.movement}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Price:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'price'}
                            onChange={handleChange}
                            value={formData.price}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'description'}
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Recommended?</label>
                    <div className="control">
                        <input
                            type="checkbox"
                            name={'recommended'}
                            onChange={handleChange}
                            checked={formData.recommended}
                        />
                    </div>
                </div>
                <button className="button">Submit</button>
            </form>
        </div>
    </div>

}

export default EditExhibition