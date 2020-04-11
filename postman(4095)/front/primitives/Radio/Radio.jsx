import React, {Fragment} from 'react';

import './Radio.scss';

const Radio = ({label, className, ...props}) => {


    return (
        <Fragment>
            <input
                {...props}
                type="radio"
                className={`radio ${className}`}
            />
            {!!label && (
                <label className={'radioLabel'} htmlFor={props.id}>
                    {label}
                </label>
            )}

        </Fragment>

    )
};

export default Radio;