import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types'

import {DATA, DATA_TYPE, ENC, FORM_DATA, HEADERS, METHOD, NAME, PARAMS, ROW, URL} from "../../constants/fields";
import {METHODS} from "../../constants/methods";
import {initListItem, requestInitForm} from "../../constants/forms";
import {set} from "../../utils/lodash";

import Button from "../../primitives/Button/Button.jsx";
import InputE from "../InputWithError/InputE.jsx";

import './Request.scss';
import {validateRequest} from "../../../validation";

const options = METHODS.map(method => <option key={method} value={method}>{method}</option>);
const dataTypes = [FORM_DATA, ENC, ROW];

const Request = props => {

    const [form, setForm] = useState(props.data);
    const [errors, setErrors] = useState({});

    const rebuild = () => setForm({...form});

    const setField = useCallback(e => {
        const field = e.currentTarget;
        set(form, field.name, field.value);
        rebuild()
    }, []);

    const setDataType = useCallback(e => {
        const field = e.currentTarget;
        set(form, field.name, field.value);
        form[DATA] = field.value === ROW ? '' : [];
        rebuild()
    }, []);

    const addRow = e => {
        const name = e.currentTarget.name;
        form[name].push({...initListItem});
        rebuild()
    };

    const deleteRow = e => {
        const button = e.currentTarget;
        form[button.name].splice(button.id, 1);
        rebuild()
    };

    const resetForm = () => {
        setForm({...requestInitForm})
    };

    const saveForm = () => {
        const errors = validateRequest(form);
        setErrors(errors)
    };

    const buildList = (listAttr) => (
        form[listAttr].map((row, i) => (
                <div className={'row'} key={i}>
                    <InputE
                        placeholder={'Key'}
                        name={`${listAttr}[${i}].key`}
                        value={row.key}
                        onChange={setField}
                        error={get(errors, `${listAttr}[${i}].key`)}
                    />
                    <InputE
                        placeholder={'Value'}
                        name={`${listAttr}[${i}].value`}
                        value={row.value}
                        onChange={setField}
                        error={get(errors, `${listAttr}[${i}].value`)}
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
                    onChange={setField}
                    value={form[METHOD]}
                >
                    {options}
                </select>
                <InputE
                    placeholder={URL}
                    name={URL}
                    value={form[URL]}
                    onChange={setField}
                    error={errors[URL]}
                />
            </div>
            <InputE
                label={'Name'}
                placeholder={'Request name'}
                name={NAME}
                onChange={setField}
                value={form[NAME]}
                error={errors[NAME]}
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
            {buildList(HEADERS)}
            <Button
                onClick={addRow}
                name={HEADERS}
            >
                Add header
            </Button>

            <div className={'section'}>
                {dataTypes.map(type => (
                    <Button
                        key={type}
                        name={DATA_TYPE}
                        className={`groupButton ${form[DATA_TYPE] === type ? 'selectedBtnG' : ''}`}
                        onClick={setDataType}
                        value={type}
                    >
                        {type}
                    </Button>
                ))}
            </div>

            <div className={'dataSection'}>
            {
                form[DATA_TYPE] === ROW
                    ? <textarea
                        name={DATA}
                        onChange={setField}
                        value={form[DATA]}
                    />
                    : <div>
                        {buildList(DATA, form[DATA_TYPE])}
                        <Button
                            onClick={addRow}
                            name={DATA}
                        >
                            Add data
                        </Button>
                </div>
            }
            </div>

            <div className={'actions'}>
                <Button onClick={resetForm}>
                    Reset
                </Button>
                <Button onClick={saveForm}>
                    Save
                </Button>
                <Button>
                    Send
                </Button>
            </div>

        </div>

    )
};

export default Request;

Request.propTypes = {
    className: PropTypes.string
};