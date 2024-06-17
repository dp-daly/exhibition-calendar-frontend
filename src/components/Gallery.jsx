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
                <div key={index}>
                    <h2>{exhibition.exhibitionTitle}</h2>
                    <img className="img-placeholder" src={exhibition.image} />
                </div>
            ))}
        </div>
    );
}

export default Gallery