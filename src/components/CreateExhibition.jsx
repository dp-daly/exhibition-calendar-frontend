import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CreateExhibition() {

const navigate = useNavigate()

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
    recommended: true,
    comments: []
})

async function handleSubmit(e) {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.post('/api/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data)
      navigate('/')
    } catch (err) {
      console.log(err.response.data)
      toast.error("Make sure you fill in all the fields");
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
        toastStyle={{ backgroundColor: "black", color: "white" }}
        />
  </div>
</div>
}