import React from 'react';

import Input from "../../primitives/Input/Input.jsx";

import './Control.scss';

const Control = ({error, errorClassName, control = <Input/>, ...props}) => {


    return (
        <div className={`errorWrap ${error ? 'active' : ''}`}>
            <control.type {...props}/>
            <div className={`error ${errorClassName || ''}}`}>
                {error}
            </div>
        </div>
    )
};

export default Control;