import React, {Fragment} from 'react';

import './Input.scss';

const Input = ({label, className, autoComplete = 'off', ...props}) => {


    return (
        <Fragment>
            {!!label && (
                <div className={'label'}>
                    {label}
                </div>
            )}
            <input
                {...props}
                className={`input ${className || ''}`}
                autoComplete={autoComplete}
            />

        </Fragment>

    )
};

export default Input;