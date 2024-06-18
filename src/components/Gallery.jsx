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
        <div className="page-wrapper">
          <div className="hero" aria-label="Image of sandhill cranes in flight over lake.">
            <p>
              <div className="pic-heading">Royal Academy Summer Exhibition</div>
              <div>The Turner prize-winning Assemble collective has curated the architecture rooms at the 2024 Royal Academy Summer Exhibition with a vision to inspire visitors by bringing the raw creativity – and messiness – of the studio into the heart of the institution. But this year's show has divided critics - is the RA's summer exhibition still relevant or a vestige of a bygone era? </div>
            </p>
          </div>
          <h1 className="title">Gallery</h1>
          <div className="box-wrapper">
            {exhibitions.map((exhibition, index) => (
              <Link to={`/gallery/${exhibition._id}`} key={index}>
                <div>
                  <img className="img-placeholder" src={exhibition.image} alt={exhibition.exhibitionTitle} />
                </div>
                <div className="card-footer">
                <div className="exhibition-title">
                    {exhibition.exhibitionTitle}
                </div>
                <div>
                    {exhibition.museum}
                </div>
                </div>    
              </Link>
            ))}
          </div>
        </div>
      );
}

export default Gallery