import React, {Fragment} from 'react';

import './Textarea.scss';

const Textarea = ({label, className, autoComplete = 'off', ...props}) => {


    return (
        <Fragment>
            {!!label && (
                <div className={'label'}>
                    {label}
                </div>
            )}
            <textarea
                {...props}
                className={`textarea ${className || ''}`}
                autoComplete={autoComplete}
            />

        </Fragment>

    )
};

export default Textarea;