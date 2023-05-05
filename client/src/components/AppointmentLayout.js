import axios from 'axios';
import React from 'react'

function Appointment({appointments}) {
    return (
        <div className='card cp' onClick= {()=> 
            axios.delete(`api/user/appointment-delete/`, {
            params:{
                appointID: appointments._id
            }} ,window.location.reload() ) } >

            <h1 className='card-title'>{'Appointment'}</h1>
            <p><b>Date: </b>{appointments.date}</p>
            <p><b>Time: </b>{appointments.time}</p>
            <p><b> CLICK TO CANCEL </b></p>

        </div>
    )
}

export default Appointment