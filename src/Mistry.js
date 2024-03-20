import React, { useState } from "react";
import moment from 'moment';
import axios from 'axios';
import { URL } from "./api";
import { DATE_FORMAT } from './constant';

export const Mistry = (props) => {
    const [date, setDate] = useState('');
    const [mistry, setMistry] = useState('');
    const [jogali, setJogali] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [validationError, setValidationError] = useState();
    const [successMsg, setSuccessMsg] = useState('');

    const handleOnChangeDate = (event) => {
        setDate( event.target.value);
        setValidationError('');
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

    const isEmptyData = !date && !mistry && !jogali && !amountPaid && !validationError;

    const postData = () => {
        if (date) {
            const requestData = {
                Date: moment(date).format(DATE_FORMAT).toString(),
                Mistry: mistry || '0',
                Jogali: jogali || '0',
                Amount_Paid: amountPaid || '0',
            }

            axios.post(URL, requestData)
                .then(data =>  {
                    if (data?.status === 200) {
                        setSuccessMsg('Successful | সফল হৈছে');
                        setDate('');
                        setMistry('');
                        setJogali('');
                        setAmountPaid('');
                        setValidationError('');
                    }})
                .catch(error => { 
                    setSuccessMsg(''); 
                    return error 
                });
        }
    }

    const handleSave = () => {
        if (!date) {
            setValidationError('Please add date | অনুগ্ৰহ কৰি তাৰিখ দিয়ক');
        }
        postData();
    }

    return (
        <div className="mistry-container">
            <div>
                <p className="label">Date: (বাধ্যতামূলক)</p>
                <input className={`input-style ${validationError ? 'error-date' : ''}`} required value={date} onChange={handleOnChangeDate} max={moment().format(DATE_FORMAT)} type="date" />
                { validationError ? <p className="error-msg">{validationError}</p> : '' }
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
                {successMsg && isEmptyData ? <p className="successful-save-msg">{successMsg}</p> : ''}
            </div>
            <div className="save-button-wrapper">
                <input value="Save" className="save-btn" onClick={handleSave} type="button" />
            </div>
        </div>
    );
};