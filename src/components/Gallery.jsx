import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../App.css'

function Gallery() {

    const [exhibitions, setExhibitions] = useState([])
    const [search, setSearch] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')

    useEffect(() => {
        fetchExhibitions()
    }, [])


    async function fetchExhibitions() {
        const resp = await fetch('/api/');
        const data = await resp.json();
        setExhibitions(data);
    }

    function filterExhibitions() {
        const filteredExhibs = exhibitions.filter(exhibition => {
          const exhibitionTitle = exhibition.exhibitionTitle.toLowerCase()
          const artist = exhibition.artists.toLowerCase();
          const institution = exhibition.museum.toLowerCase();
          const filterText = search.toLowerCase()
          return exhibitionTitle.includes(filterText) || artist.includes(filterText) || institution.includes(filterText)
        })
        return filteredExhibs
      }

    console.log(search)

    return (
        <div className="page-wrapper">
          <div className="hero" aria-label="Image of sandhill cranes in flight over lake.">
            <p>
              <div className="pic-heading">Royal Academy Summer Exhibition</div>
              <div>The Turner prize-winning Assemble collective has curated the architecture rooms at the 2024 Royal Academy Summer Exhibition with a vision to inspire visitors by bringing the raw creativity – and messiness – of the studio into the heart of the institution. But this year's show has divided critics - is the RA's summer exhibition still relevant or a vestige of a bygone era? </div>
            </p>
          </div>
          <h1 className="title">Current and upcoming exhibitions</h1>
          <input
          className="input"
          placeholder="Search exhibitions..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          />
          <div className="box-wrapper">
            {filterExhibitions().map((exhibition, index) => (
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