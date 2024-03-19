import React, { useEffect, useState } from "react";
import axios from 'axios';
import { URL } from "./api";

export const Mistry = (props) => {
    const [date, setDate] = useState('');
    const [mistry, setMistry] = useState('');
    const [jogali, setJogali] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [validationError, setValidationError] = useState({});

    const handleOnChangeDate = (event) => {
        setDate( event.target.value);
    };

    const handleOnChangeMistry = (event) => {
        setMistry(event.target.value);
    };

    const handleOnChangeJogali = (event) => {
        setJogali(event.target.value);
    };

    const handleOnChangeAmountPaid = (event) => {
        setAmountPaid(event.target.value);
    };

    const handleSave = () => {
        const requestData = {
            Date: date,
            Mistry: mistry,
            Jogali: jogali,
            Amount_Paid: amountPaid,
        }
        console.log("Test ## ", requestData);
        axios.post(URL, requestData)
            .then(data =>  { console.log("Test ## ", data);})
            .catch(error => { console.log("Test error ", error)});
    }

    // const fetchData = () => {
    //     axios.get(URL)
    //         .then(response => response.json())
    //         .then(data =>  { console.log("Test ## ", data);})
    //         .catch(error => { console.log("Test error ", error)});
    // }

    // useEffect(() => {
    //     fetchData();
    // }, [])
    return (
        <div className="mistry-container">
            <div>
                <p className="label">Date:</p>
                <input className="input-style" required value={date} onChange={handleOnChangeDate} type="date" />
            </div>
            <div>
                <p className="label" >Mistry | মিস্ত্ৰী:</p>
                <input className="input-style" required placeholder="কিমানজন মিস্ত্ৰী" value={mistry} onChange={handleOnChangeMistry} type="text" />
            </div>
            <div>
                <p className="label" >Jogali | জগালী:</p>
                <input className="input-style" required placeholder="কিমানজন জগালী" value={jogali} onChange={handleOnChangeJogali} type="text" />
            </div>
            <div>
            </div>
            <div>
                <p className="label" >Amount paying | টকা দিম:</p>
                <input className="input-style" required placeholder="কিমান টকা দিম" value={amountPaid} onChange={handleOnChangeAmountPaid} type="text" />
            </div>
            <div>
                <p className="label" >Total today | আজিৰ মুঠ: &#8377;{jogali * 400 + mistry * 500} </p>
            </div>
            <div className="save-button">
                <input value="Save" onClick={handleSave} type="button" />
            </div>
        </div>
    );
};