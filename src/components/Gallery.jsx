import { useState, useEffect } from 'react'

function Gallery() {

    const [exhibitions, setExhibitions] = useState([])

    useEffect(() => {
        fetchExhibitions()
    }, [])


    async function fetchExhibitions() {
        const resp = await fetch('/api/')
        const data = await resp.json()
        setExhibitions(data)
    }

    return (
        <div>
            {exhibitions.map((exhibition, index) => (
                <div key={index}>
                    <h2>{exhibition.exhibitionTitle}</h2>
                </div>
            ))}
        </div>
    );
}

export default Gallery