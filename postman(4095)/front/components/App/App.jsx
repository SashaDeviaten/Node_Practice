import React, {Fragment, useState, useEffect} from 'react';

import {requestInitForm} from "../../constants/forms";

import Request from "../Request/Request.jsx";
import List from "../List/List.jsx";
import Response from "../Response/Response.jsx";

import './App.scss';
import {getListApi, saveApi, sendApi} from "../../api/api";

const App = () => {

    const [reqData, setReqData] = useState({...requestInitForm});
    const [listData, setListData] = useState([]);
    const [resData, setResData] = useState(null);

    const setList = async () => {
        const list = await getListApi();
        setListData(list);
    };

    const saveReq = form => {
        // saveApi(form);
        setListData([...listData, form])
    };

    const sendRequest = async form => {
        const answer = await sendApi(form);

        if (answer.errorCode === 0) {
            setResData(answer.result)
        }


        return answer
    };

    // useEffect(() => setList(), []);

    return (
        <Fragment>
            <div className={'listSection'}>
                <List
                    data={listData}
                />
            </div>
            <div className={'requestSection'}>
                <Request
                    data={reqData}
                    saveRequest={saveReq}
                    sendRequest={sendRequest}
                />
            </div>
            <div className={'responseSection'}>
                <Response
                    data={resData}
                />
            </div>
        </Fragment>

    )
};

export default App;