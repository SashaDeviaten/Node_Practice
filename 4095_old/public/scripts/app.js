'use strict';

const trash = '<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="18px" height="18px"><path d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z"/></svg>'

const initRow = {
    key: '',
    value: ''
};

const initForm = {
    name: '',
    url: '',
    method: 'GET',
    headers: [
        // initRow
    ],
    params: [
        // initRow
    ],
    body: ''
};

const formFields = {...initForm};


document.addEventListener('DOMContentLoaded', load);


function load() {
    const container = document.querySelector("div.container");
    setFormFields(container);

    setMainActions(container);

    setDataTypeSections(container);

    setAddAction(
        container.querySelector("button[name=addHeader]"),
        container.querySelector("#headers"),
        'headers'
    );
    setAddAction(
        container.querySelector("button[name=addParam]"),
        container.querySelector("#params"),
        'params'
    );
}

function setDataTypeSections(container) {
    const dataTypesInputs = Array.from(container.querySelectorAll("input[name=dataType]"));
}

function setMainActions(container) {
    const saveBtn = container.querySelector("button[name=save]");
    saveBtn.addEventListener('click', () => console.log('formFields', formFields))

}

function setFormFields(container) {
    for (let key in formFields) {
        if (!Array.isArray(formFields[key])) {
            const field = container.querySelector(`[name=${key}]`);
            formFields[key] = field
        }
    }
}

function setAddAction(btn, container, name) {
    btn.addEventListener('click', () => addRow(container, name))
}

function addRow(container, name) {
    formFields[name].push(initRow);
    const row = buildRow(name, container.childNodes.length);
    container.appendChild(row);
}

function buildRow(name, index) {
    const row = document.createElement('div');
    row.classList.add('row', 'tableRow');

    const keyInput = buildInput(`${name}[${index}].key`, 'Key');

    row.appendChild(keyInput);


    const valInput = buildInput(`${name}[${index}].value`);

    row.appendChild(valInput);

    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trashBtn');
    trashBtn.innerHTML = trash;
    trashBtn.name = `${name}[${index}]`;
    trashBtn.addEventListener('click', deleteRow);


    row.appendChild(trashBtn);

    return row
}

function buildInput(name, placeholder = 'Value') {
    const label = document.createElement('div');
    label.classList.add('label');
    const input = document.createElement('input');
    input.name = name;
    input.placeholder = placeholder;
    label.appendChild(input);
    set(formFields, name, input);

    return label
}

function deleteRow(e) {
    const elem = e.currentTarget;
    set(formFields, elem.name, null);
    elem.parentNode.remove();
}


function get( object, path, defaultVal = '' ){
    const keys = Array.isArray(path) ? path : path.replace(/(\[(\d)\])/g, '.$2').split('.');
    object = object[keys[0]];

    return object && keys.length > 1
        ? get(object, keys.slice(1), defaultVal)
        : object === undefined
            ? defaultVal
            : object;
}

function set( object, path, val ){
    const keys = Array.isArray(path) ? path : path.replace(/(\[(\d)\])/g, '.$2').split('.');
    if( keys.length>1 ){
        object[keys[0]] = object[keys[0]] || {};
        return set( object[keys[0]], keys.slice(1), val );
    }
    object[keys[0]] = val;
}