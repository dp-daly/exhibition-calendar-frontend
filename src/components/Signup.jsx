
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../config';


function Signup() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        location: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await axios.post(`${baseUrl}/auth/signup`, formData)
            navigate('/signin')
        } catch (err) {
            console.log(err.response.data)
            toast.error("Try again - something went wrong.");
        }
    }

    return <div className="section">
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">First name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'firstName'}
                            onChange={handleChange}
                            value={formData.firstName}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Last name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'lastName'}
                            onChange={handleChange}
                            value={formData.lastName}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Location</label>
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
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'username'}
                            onChange={handleChange}
                            value={formData.username}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'email'}
                            onChange={handleChange}
                            value={formData.email}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name={'password'}
                            onChange={handleChange}
                            value={formData.password}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Confirm password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name={'passwordConfirmation'}
                            onChange={handleChange}
                            value={formData.passwordConfirmation}
                            autoComplete="off"
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

export default Signup