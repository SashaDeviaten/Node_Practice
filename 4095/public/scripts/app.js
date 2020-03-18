document.addEventListener('DOMContentLoaded', load);

let container, addParamBtn, addHeaderBtn,
paramsContainer, headersContainer;

function load() {
    container = document.querySelector("div.container");
    addHeaderBtn = container.querySelector("button[name=addHeader]");
    addParamBtn = container.querySelector("button[name=addParam]");
    headersContainer = container.querySelector("#headersContainer");
    paramsContainer = container.querySelector("#paramsContainer");
    setAddAction(addHeaderBtn, headersContainer, 'header');
    setAddAction(addParamBtn, paramsContainer, 'param');
}

function setAddAction(btn, container, name) {
    btn.addEventListener('click', () => addRow(container, name))
}

function addRow(container, name) {
    const row = buildRow(name);
    container.appendChild(row);
}

function buildRow(name) {
    const row = document.createElement('div');
    row.classList.add('row', 'tableRow');

    const label = document.createElement('div');
    label.classList.add('label');
    const input = document.createElement('input');
    input.name = `${name}Key`;
    label.appendChild(input);

    row.appendChild(label);

    const valWrap = document.createElement('div');
    valWrap.classList.add('flex');
    const textarea = document.createElement('textarea');
    textarea.name = `${name}Value`;
    valWrap.appendChild(textarea);

    row.appendChild(valWrap);

    return row
}