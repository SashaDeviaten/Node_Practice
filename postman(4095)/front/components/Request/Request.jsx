import React, {useRef, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types'

import {METHOD, NAME, URL} from "../../constants/fields";
import {METHODS} from "../../constants/methods";

import Input from "../../primitives/Input/Input.jsx";

import './Request.scss';

const options = METHODS.map(method => <option key={method} value={method}>{method}</option>);

const Request = props => {

    const formDataRef = useRef();
    const formData = formDataRef.current;


    useEffect(() => {
        formDataRef.current = {...props.data};
    }, [props.data]);

    const setField = useCallback(e => {
        const field = e.currentTarget;
        formData[field.name] = field.value;
        console.log('formData', formData)
    }, []);


    return (
        <div className={`${props.className} request`}>
            <h2>Request</h2>
            <div className={'urlWrap'}>
                <select
                    name={METHOD}
                    className={'methodSelect'}
                    onSelect={setField}
                >
                    {options}
                </select>
                <Input
                    placeholder={URL}
                    name={URL}
                    defaultValue={'http'}
                    onBlur={setField}
                />
            </div>
            <Input label={'Name'} placeholder={'Request name'} name={NAME} onBlur={setField}/>

        </div>

    )
};

export default Request;

Request.propTypes = {
    className: PropTypes.string
};