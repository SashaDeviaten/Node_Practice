document.addEventListener('DOMContentLoaded', load);

const currentOption = {
    id: null
};

function load() {
    getVariants();
    getResults();
}

async function getResults() {
    const response = await fetch('/stat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    });
    const statistic = await response.json();
    buildStatisticSection(statistic)
}

async function getVariants() {
    const response = await fetch('/variants');
    const options = await response.json();
    buildVariantsSection(options)
}

function buildStatisticSection(statistic) {
    const section = document.getElementById('statistic_section');
    let innerHTML = '<h4>Результаты голосования</h4>';
    for (let key in statistic) {
        const item = statistic[key];
        innerHTML+= `
        <div>${item.text}: ${item.votes}</div>
        `
    }

    section.innerHTML = innerHTML;
}

function buildVariantsSection(options) {
    const section = document.getElementById('variants_section');

    const wrap = document.createElement('div');

    options.forEach(item => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = "radio";
        input.value = item.id;
        input.name = "person";
        input.addEventListener('change', setOptionId);
        label.appendChild(input);
        label.appendChild(document.createTextNode(item.text));
        wrap.appendChild(label)
    });

    const button = document.createElement('button');
    button.type='button';
    button.innerText = 'Проголосовать';
    button.addEventListener('click', vote);

    wrap.appendChild(button);

    section.appendChild(wrap);
}

function setOptionId(e) {
    currentOption.id = e && e.target.value;
}

async function vote() {
    if (!currentOption.id) {
        showInfo('Выберите один из вариантов');
        return;
    }
    await fetch('/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(currentOption)
    });
    setOptionId(null);
    getResults();
    resetInputs();
    showInfo('Ваш голос принят')

}

function resetInputs() {
    const nodeList = document.getElementsByTagName('input');
    const inputs = Array.from(nodeList);
    const checkedInput = inputs.find(input => input.checked);

    if (checkedInput)
        checkedInput.checked = false
}

function showInfo(text) {
    const section = document.getElementById('info_section');
    section.innerText = text;
    section.style.opacity = 1;
    setTimeout(() => {
        section.innerText = '';
        section.style.opacity = 0
    }, 2500)
}