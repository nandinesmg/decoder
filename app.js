/* main.js */

// INFORMACOES DAS TRATATIVAS DO CONTEUDO
const onInput = () => document.getElementById(contents.input).value;
const onType = () => document.getElementById(contents.cypherOptions).value;
const output = document.getElementById(contents.output);
const info = document.getElementById(contents.info);


// BASE PADRAO DE INFORMACOES
let state = {
    step: ''
};

// RESETANDO INFORMACOES
onStdValues();

export const KEYS = ['e', 'i', 'a', 'o', 'u'];
export const SHIFT_KEYS = ['enter', 'imes', 'ai', 'ober', 'ufat'];

function onEncrypt(input) {
    return input.toLowerCase().split('').map((char) => {
        if (keys.includes(char)) {
            const index = keys.indexOf(char);
            return shiftKeys[index];
        } 
        return char;
    }).join('');
}
}

function onDecrypt(input) {
    
   
        let result = input;
        shiftKeys.forEach((key, index) => {
            if (result.includes(key)) {
                result = result.replace(new RegExp(key, 'g'), keys[index]);
            }
        });
        return result;
    }
}

function onShowInfo(result) {
    output ? output.innerText = result : null;
    info ? info.innerText = `O texto foi ${state.step}` : 'Apenas letras minúsculas e sem acento.';
    outputContent ? outputContent.style.display = 'flex' : null;
    outputInfo ? outputInfo.style.display = 'none' : null;
}

function onStdValues() {
    state.step = '';
    info.innerText = 'Apenas letras minúsculas e sem acento.';
    outputContent ? outputContent.style.display = 'none' : null;
    outputInfo ? outputInfo.style.display = 'flex' : null;
}

// GLOBAL VARIABLES
document.onEncrypt = onEncrypt;
document.onDecrypt = onDecrypt;
document.onClip = onClip;

// VARIAVEIS 
export { state };



/* clipboard.js */

const info = document.getElementById(contents.info);
const outputContent = document.getElementById(contents.outputContent);
const outputInfo = document.getElementById(contents.outputInfo);

const CLIPBOARD_DURATION = 3000;

export function onClip() {
    const okInfo = `O texto ${state.step} foi cópiado com sucesso!`;
    const errInfo = `Algo deu errado ao tentar cópiar o texto ${state.step}`;

    navigator.clipboard.writeText(output.innerText)
        .then(() => onShowInfoTimer(info, okInfo, CLIPBOARD_DURATION))
        .catch((err) => info ? info.innerHTML = errInfo : null);
}

function onShowInfoTimer(info, message, duration) {
    const interval = 1000;
    let remaining = duration;

    if (info) {
        info.innerHTML = `${message} (irá sumir em ${duration/1000}s)`;
        const intervalID = setInterval(() => {
            remaining -= interval;
            info.innerHTML = `${message} (irá sumir em ${remaining/1000}s)`;

            if (remaining <= 0) {
                clearInterval(intervalID);
                state.step = '';
                info.innerText = 'Apenas letras minúsculas e sem acento.';
                outputContent ? outputContent.style.display = 'none' : null;
                outputInfo ? outputInfo.style.display = 'flex' : null;
            }
        }, interval);
    }
}



/* contents.js */

export const contents = {
    input: 'input',
    output: 'output',
    info: 'info-content',
    cypherOptions: 'cypher-option',
    outputContent: 'output-content',
    outputInfo: 'info-output',
};