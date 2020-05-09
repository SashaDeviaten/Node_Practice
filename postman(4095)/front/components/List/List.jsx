import React, {useRef, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types'

import {NAME} from "../../constants/fields";

import Input from "../../primitives/Input/Input.jsx";

import './List.scss';


const List = props => {

    return (
        <div className={'listContainer'}>
            <h2>List</h2>
            <div className={'listWrap'}>
                {props.data.map(req => (
                    <div className={'listItem'} key={req.URL}>
                        <div className={'listIcon'}>
                            {req.method}
                        </div>
                        {req.name}
                    </div>
                ))}
            </div>
        </div>

    )
};

export default List;

List.propTypes = {
    data: PropTypes.array
};