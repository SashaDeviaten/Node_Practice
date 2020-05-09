import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types'


import './Response.scss';
import Button from "../../primitives/Button/Button.jsx";
import Textarea from "../../primitives/Textarea/Textarea.jsx";

const BODY = 'Body';
const HEADERS = 'Headers';

const Response = ({data, className}) => {
    const [answerType, setAnswerType] = useState(BODY);

    const buildRow = (label, text, key) => (
        <div className={'resRow'} key={key}>
            <div className={'resLabel'}>{label}</div>
            <div className={'resText'}>{text}</div>
        </div>
    );

    const buildHeadersSection = headers => {
        const rows = [];
        for (let key in headers) {
            let text = '';
            headers[key].forEach((item, i) => text+= `${i ? '\n' : ''}${item}`);
            rows.push(buildRow(key, text, key))
        }
         return (
             <Fragment>
                 {rows}
             </Fragment>
         )
    };

    const handlerType = e => {
        setAnswerType(e.currentTarget.value)
    };

    return (
        <div className={`${className} response`}>
            <h2>Response</h2>
            {data && (
                <Fragment>
                    {buildRow('Status', `${data.status} ${data.statusText}`)}
                    <div className={'btnsWrap'}>
                        <Button
                            value={BODY}
                            onClick={handlerType}
                            className={`groupButton ${answerType === BODY ? 'selectedBtnG' : ''}`}
                        >
                            {BODY}
                        </Button>
                        <Button
                            value={HEADERS}
                            onClick={handlerType}
                            className={`groupButton ${answerType === HEADERS ? 'selectedBtnG' : ''}`}
                        >
                            {HEADERS}
                        </Button>
                    </div>
                    {
                        answerType === BODY
                            ? <Textarea className={'resBody'} defaultValue={data.response}/>
                            : buildHeadersSection(data.headers)
                    }
                </Fragment>

            )}
        </div>
    )
};

export default Response;

Response.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object
};