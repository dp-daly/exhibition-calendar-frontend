import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../App.css'

function Gallery() {

    const [exhibitions, setExhibitions] = useState([])

    useEffect(() => {
        fetchExhibitions()
    }, [])


    async function fetchExhibitions() {
        const resp = await fetch('/api/');
        const data = await resp.json();
        setExhibitions(data);
    }

    return (
        <div>
            {exhibitions.map((exhibition, index) => (
                <Link to={`/gallery/${exhibition._id}`} key={index}>
                    <div>
                        <h2>{exhibition.exhibitionTitle}</h2>
                        <img className="img-placeholder" src={exhibition.image} alt={exhibition.exhibitionTitle} />
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Gallery