import React, {Fragment} from 'react';

import './Input.scss';

const Input = ({label, className, ...props}) => {


    return (
        <Fragment>
            {!!label && (
                <div className={'label'}>
                    {label}
                </div>
            )}
            <input
                {...props}
                className={`input ${className}`}
            />

        </Fragment>

    )
};

export default Input;