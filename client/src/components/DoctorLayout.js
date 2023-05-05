import React from 'react'
import { useNavigate } from 'react-router-dom'

function Doctor({doctor}) {
    const navigate = useNavigate();
    return (
        <div className='card cp' onClick={()=> navigate(`/appointment-scheduling/${doctor._id}`)}>
            <h1 className='card-title'>{doctor.firstName} {doctor.lastName}</h1>
            <p><b>Email: </b>{doctor.email}</p>
            <p><b>Phone Number: </b>{doctor.phoneNumber}</p>
            <p><b>Specialty: </b>{doctor.specialty}</p>
            <p><b>Working Hours: </b>{doctor.workTimings[0]} - {doctor.workTimings[1]}</p>
        </div>
    )
}

export default Doctor