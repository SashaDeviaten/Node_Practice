import React, {useRef, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types'

import {NAME} from "../../constants/fields";

import Input from "../../primitives/Input/Input.jsx";

import './List.scss';


const List = props => {


    return (
        <div className={`${props.className} list`}>
            <h2>List</h2>

        </div>

    )
};

export default List;

List.propTypes = {
    className: PropTypes.string
};