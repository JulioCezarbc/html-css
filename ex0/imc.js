
const calcular = document.getElementById('calcular');


function calcImc(nome,altura,peso){

    if (!nome || !altura || !peso) {
        return 'Por favor, preencha todos os campos!';
    }

    altura = parseFloat(altura);
    peso = parseFloat(peso);

    if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
        return 'Altura e peso devem ser números positivos!';
    }

    const imc = (peso / (altura * altura)).toFixed(2);

    const classificacoes = {
        18.5: 'abaixo do peso',
        24.9: 'com peso ideal',
        29.9: 'com sobrepeso',
        34.9: 'com obesidade grau I',
        39.9: 'com obesidade grau II'
    };

    let classificacao = 'com obesidade grau III ou mórbida';

    for (const limite in classificacoes) {
        if (imc < limite) {
            classificacao = classificacoes[limite];
            break;
        }
    }
    const nomeCap = nome.charAt(0).toUpperCase() + nome.slice(1);
    return `${nomeCap}, seu IMC é ${imc}, você está ${classificacao}.`;
}
    

function exibirResult(){
    const nome = document.getElementById('nome').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const resultado = document.getElementById('resultado');

    const mensagem = calcImc(nome, altura, peso);
    resultado.textContent = mensagem;
}

calcular.addEventListener('click', exibirResult);
