import React, {Fragment, useState} from 'react';

import Request from "../Request/Request.jsx";
import List from "../List/List.jsx";
import Response from "../Response/Response.jsx";

import './App.scss';

const App = () => {

    const [data, setData] = useState();

    return (
        <Fragment>
            <List
                className={'listSection'}
            />
            <Request
                className={'requestSection'}
                data={data}
            />
            <Response
                className={'responseSection'}
            />
        </Fragment>

    )
};

export default App;