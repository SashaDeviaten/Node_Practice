import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types'

import {DATA_TYPE, ENC, FORM_DATA, METHOD, NAME, PARAMS, ROW, URL} from "../../constants/fields";
import {METHODS} from "../../constants/methods";
import {set} from "../../utils/lodash";

import Input from "../../primitives/Input/Input.jsx";
import Button from "../../primitives/Button/Button.jsx";

import './Request.scss';

const options = METHODS.map(method => <option key={method} value={method}>{method}</option>);
const dataTypes = [FORM_DATA, ENC, ROW];

const Request = props => {

    const [form, setForm] = useState(props.data);

    const setField = useCallback(e => {
        const field = e.currentTarget;
        set(form, field.name, field.value);
        console.log('form', form);
    }, []);

    const addRow = e => {
        const name = e.currentTarget.name;
        form[name].push({
            key: '',
            value: ''
        });
        setForm({...form})
    };

    const deleteRow = e => {
        const button = e.currentTarget;
        form[button.name].splice(button.id, 1);
        setForm({...form})
    };

    const buildList = listAttr => (
        form[listAttr].map((row, i) => (
                <div className={'row'} key={i}>
                    <Input
                        placeholder={'Key'}
                        name={`${listAttr}[${i}].key`}
                        defaultValue={row.key}
                        onBlur={setField}
                    />
                    <Input
                        placeholder={'Value'}
                        name={`${listAttr}[${i}].value`}
                        defaultValue={row.value}
                        onBlur={setField}
                    />
                    <Button
                        className={'trash'}
                        name={listAttr}
                        id={i}
                        onClick={deleteRow}
                    />
                </div>
            )
        )
    );

    return (
        <div className={`${props.className} request`}>
            <h2>Request</h2>
            <div className={'urlWrap'}>
                <select
                    name={METHOD}
                    className={'methodSelect'}
                    onSelect={setField}
                    defaultValue={form[METHOD]}
                >
                    {options}
                </select>
                <Input
                    placeholder={URL}
                    name={URL}
                    defaultValue={form[URL]}
                    onBlur={setField}
                />
            </div>
            <Input
                label={'Name'}
                placeholder={'Request name'}
                name={NAME}
                onBlur={setField}
                defaultValue={form[NAME]}
            />

            <h4>Query Params</h4>
            {buildList(PARAMS)}
            <Button
                onClick={addRow}
                name={PARAMS}
            >
                Add param
            </Button>

            <h4>Headers</h4>
            {buildList(PARAMS)}
            <Button
                onClick={addRow}
                name={PARAMS}
            >
                Add header
            </Button>

            <div className={'section'}>
                {dataTypes.map(type => (
                    <Button
                        key={type}
                        name={type}
                        className={`groupButton ${form[DATA_TYPE] === type ? 'selectedBtnG' : ''}`}
                    >
                        {type}
                    </Button>
                ))}

            </div>

        </div>

    )
};

export default Request;

Request.propTypes = {
    className: PropTypes.string
};