import React, {useRef, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types'

import {NAME} from "../../constants/fields";

import Input from "../../primitives/Input/Input.jsx";

import './List.scss';


const List = props => {

    const formDataRef = useRef();
    const formData = formDataRef.current;

    useEffect(() => {
        formDataRef.current = {...props.data};
    }, [props.data]);

    const setField = useCallback(e => {
        const field = e.currentTarget;
        formData[field.name] = field.value;
    }, []);


    return (
        <div className={`${props.className} form`}>
            <h2>Request</h2>
            <Input label={'Name'} placeholder={'Request name'} name={NAME} onBlur={setField}/>

        </div>

    )
};

export default List;

List.propTypes = {
    className: PropTypes.string
};