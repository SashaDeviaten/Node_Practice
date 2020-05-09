import isoFetch from 'isomorphic-fetch';

// const backEndServer = 'http://142.93.172.26:4095';
const backEndServer = 'http://localhost:4095';

const api = async ({url, method, body}) => {
    try {
        const res = await (isoFetch(`${backEndServer}${url}`, {
            method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }));
        return res.json()
    }
    catch (e) {
        console.error(`api ${url} error: ${e}`)
    }


};

export const getListApi = () => (
    api({
        url: '/list',
        method: 'GET'
    })
);

export const saveApi = body => (
    api({
        url: '/save',
        method: 'POST',
        body
    })
);

export const sendApi = body => (
    api({
        url: '/send',
        method: 'POST',
        body
    })
);