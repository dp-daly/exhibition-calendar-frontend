import { Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import '../App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Gallery() {

    const [exhibitions, setExhibitions] = useState([])
    const [search, setSearch] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')
    const [total, setTotal] = useState(0)

    useEffect(() => {
        fetchExhibitions()
    }, [search, selectedLocation])

    useEffect(() => {
        toast.dismiss()
        if (search === '') {
          return;
        } else if (total === 0) {
          toast(`There are no results for ${search}`);
        } else {
          toast(
            <>
              There are <b>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b> results for <b>{search}</b>.
            </>
          );
        }
      }, [search, total]);

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
          const movement = exhibition.movement.toLowerCase();
          const filterText = search.toLowerCase();
          const currentDate = new Date();
          const endDate = new Date(exhibition.endDate);
          return (
            (exhibitionTitle.includes(filterText) || artist.includes(filterText) || institution.includes(filterText) || movement.includes(filterText)) &&
            (selectedLocation === '' || exhibition.location === selectedLocation) &&
            (endDate >= currentDate)
          );
        }) 
        return filteredExhibs
      }

      const memorisedFilteredExhibs = useMemo(() => {
        const filteredExhibs = filterExhibitions();
        return filteredExhibs;
      }, [exhibitions, search, selectedLocation]
    );    


      useEffect(() => {
        setTotal(memorisedFilteredExhibs.length);
    }, [memorisedFilteredExhibs]);


      function getLocations() {
        const mappedExhibs = exhibitions.map(exhib => exhib.location)
        const uniqueLocations = new Set(mappedExhibs)
        const arrayLocations = Array.from(uniqueLocations)
        return arrayLocations
      }

      function clearFilters() {
        setSelectedLocation('');
      }
    
    return (
        <div className="page-wrapper">
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
            <Link to="/">
            <div className="hero" aria-label="Image of The Man Who Should Be Dead exhibition at Kurimanzutto Gallery in Mexico City.">
                <div id="p">
                <div className="top-pick">Top Pick</div>
                <div className="pic-heading">The Man Who Should Be Dead</div>
                <div>
                    Kurimanzutto, Mexico City
                    12 January 2024 until 28 July 2024
                </div>
                </div>
                </div>
            </Link>
            <h1 className="title">Current and upcoming exhibitions</h1>
          <input
          className="input"
          placeholder="Search exhibitions..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          />
          <div className="locations">
          <h1>Cities:</h1>
          <div className="buttons">
            {getLocations().map(location => (
                <button
                key={location}
                id="location-button"
                onClick={(event) => setSelectedLocation(event.target.innerHTML)}
                className="button">
                    {location}
                    </button>
                ))}
                <div id="clear">
                <button className="button" onClick={clearFilters}>Clear filter</button>
                </div>
                </div>
            </div>
          <div className="box-wrapper">
            {filterExhibitions().map((exhibition) => (
              <Link to={`/gallery/${exhibition._id}`} key={exhibition._id}>
                <div className="img-container">
                    {exhibition.recommended && <p className="recommended-label">Navart recommends</p>}
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
