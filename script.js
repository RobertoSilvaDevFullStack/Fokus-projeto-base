const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const tituto = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');

// Sons
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

// Configurações iniciais
let tempoDecorridoEmSegundos = 1500; // 25 minutos
// 1500 segundos = 25 minutos
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

// Inicializa o contexto padrão
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500; // 25 minutos
        alterarContexto('foco')
        focoBt.classList.add('active')
})

curtoBt.addEventListener('click' , () => {
        tempoDecorridoEmSegundos = 300; // 5 minutos
        alterarContexto('descanso-curto')
        curtoBt.classList.add('active')
})

longoBt.addEventListener('click' , () => {
        tempoDecorridoEmSegundos = 900; // 15 minutos
        alterarContexto('descanso-longo')
        longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            tituto.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            tituto.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            tituto.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = (tempo) => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        parar();
        alert('Tempo esgotado!');
        return;
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuParar); 

function iniciarOuParar() {
    if (intervaloId) {
        audioPausa.play();
        parar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    startPauseBt.textContent = 'Pausar';
}

function parar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    intervaloId = null;
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo(); 