import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import './Prediction.css';
const Prediction = () => {
    // State to store input values and prediction result
    const [loading,setloading]=useState(false)
    const [formData, setFormData] = useState({
        pregnancies: '',
        glucose: '',
        bloodPressure: '',
        skinThickness: '',
        insulin: '',
        bmi: '',
        diabetesPedigreeFunction: '',
        age: ''
    });
    const warn="* Prediction is 78% accurate  !";

    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    // Handle input change
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age } = formData;
        const inputData = `${pregnancies},${glucose},${bloodPressure},${skinThickness},${insulin},${bmi},${diabetesPedigreeFunction},${age}`;
        setloading(true);
        setResult('')

        try {
            // Make API call to the backend
            console.log({"made api call with data ": inputData})
            const response = await axios.get("https://diabetes-prediction-2-w1w8.onrender.com/predict", {
                params: {
                    data: inputData
                }
            });
            console.log("response is ",response);
            setResult(response.data.result);
            setError('');
        } catch (err) {
            setError('Error predicting diabetes. Please try again.');
            setResult('');
        }
        setloading(false);
    };

    return (
        <div className='predict'>
            <h1 className={"heading"}>Diabetes Prediction Model</h1>
    <form className='form-class' >
                <div >
                    <label>Pregnancies: </label>
                    <br></br>
                    <input type="number" name="pregnancies" value={formData.pregnancies} onChange={handleChange} required />
                </div>
                <div>
                    <label>Glucose: </label>
                    <br></br>
                    <input type="number" name="glucose" value={formData.glucose} onChange={handleChange} required />
                </div>
                <div>
                    <label>Blood Pressure: </label>
                    <br></br>
                    <input type="number" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} required />
                </div>
                <div>
                    <label>Skin Thickness: </label>
                    <br></br>
                    <input type="number" name="skinThickness" value={formData.skinThickness} onChange={handleChange} required />
                </div>
                <div>
                    <label>Insulin: </label>
                    <br></br>
                    <input type="number" name="insulin" value={formData.insulin} onChange={handleChange} required />
                </div>
                <div>
                    <label>BMI: </label>
                    <br></br>
                    <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} required />
                </div>
                <div>
                    <label>Diabetes Pedigree Function: </label>
                    <br></br>
                    <input type="number" step="0.001" name="diabetesPedigreeFunction" value={formData.diabetesPedigreeFunction} onChange={handleChange} required />
                </div>
                <div>
                    <label>Age: </label>
                    <br></br>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </div>
               
            </form>
             <button type="submit" className='submit-btn' onClick={handleSubmit}>Predict</button>

            {result && < h2  className="result"> Prediction: {result}  </h2>}
             {loading && <Spinner/>}
            {error && <h3 style={{ color: 'red' }} className="result">{error}</h3>}
            {(result!=='') &&<p className="warn">{warn}</p>}
           
        </div>
    );
};

export default Prediction;
