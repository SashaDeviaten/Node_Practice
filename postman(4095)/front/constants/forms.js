import {DATA, DATA_TYPE, FORM_DATA, HEADERS, METHOD, NAME, PARAMS, URL} from "./fields";

export const initListItem = {
    key: '',
    value: ''
};

export const requestInitForm = {
    [METHOD]: "GET",
    [URL]: "https://www.bps-sberbank.by/rates/rates.json",
    [NAME]: 'qqq',
    [PARAMS]: [],
    [HEADERS]: [],
    [DATA_TYPE]: FORM_DATA,
    [DATA]: []
};