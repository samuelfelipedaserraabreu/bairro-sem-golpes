const scenarios = [
  {
    title: 'Troquei de número',
    prompt: 'Espaço reservado para uma mensagem fictícia em que alguém conhecido pede uma transferência urgente.',
  },
  {
    title: 'Falsa central ou banco',
    prompt: 'Espaço reservado para uma situação fictícia envolvendo pedido de código, senha ou acesso ao dispositivo.',
  },
  {
    title: 'Falso órgão público',
    prompt: 'Espaço reservado para uma mensagem fictícia com identidade visual, link e cobrança urgente.',
  },
  {
    title: 'Comprovante ou Pix enviado por engano',
    prompt: 'Espaço reservado para uma situação fictícia em que a pessoa pede devolução antes da conferência.',
  },
  {
    title: 'QR Code ou chave Pix divergente',
    prompt: 'Espaço reservado para praticar a conferência do destinatário antes da confirmação.',
  },
];

const list = document.querySelector('#scenario-list');
const kicker = document.querySelector('#scenario-kicker');
const title = document.querySelector('#scenario-title');
const prompt = document.querySelector('#scenario-prompt');
const options = document.querySelector('#scenario-options');
const feedback = document.querySelector('#scenario-feedback');
const progressText = document.querySelector('#progress-text');
const progressCount = document.querySelector('#progress-count');
const progressBar = document.querySelector('#progress-bar');

let selectedIndex = -1;

function renderScenarioList() {
  list.innerHTML = scenarios
    .map(function (scenario, index) {
      return [
        '<button class="scenario-button" type="button" data-index="',
        index,
        '" aria-current="',
        index === selectedIndex,
        '"><span>Situação ',
        index + 1,
        '</span><br />',
        scenario.title,
        '</button>',
      ].join('');
    })
    .join('');

  list.querySelectorAll('[data-index]').forEach(function (button) {
    button.addEventListener('click', function () {
      selectScenario(Number(button.dataset.index));
    });
  });
}

function selectScenario(index) {
  selectedIndex = index;
  const scenario = scenarios[index];

  kicker.textContent = 'Situação ' + (index + 1);
  title.textContent = scenario.title;
  prompt.textContent = scenario.prompt;
  options.innerHTML = [
    '<button class="option-button" type="button" data-feedback="safe">Eu pararia e confirmaria por outro canal.</button>',
    '<button class="option-button" type="button" data-feedback="review">Eu ainda precisaria analisar melhor antes de agir.</button>',
    '<button class="option-button" type="button" data-feedback="unknown">Não sei qual seria a atitude mais segura.</button>',
  ].join('');

  feedback.hidden = true;
  feedback.textContent = '';

  options.querySelectorAll('[data-feedback]').forEach(function (button) {
    button.addEventListener('click', function () {
      showFeedback(button.dataset.feedback);
    });
  });

  progressText.textContent = 'Situação selecionada';
  progressCount.textContent = (index + 1) + ' de ' + scenarios.length + ' situações';
  progressBar.style.width = (((index + 1) / scenarios.length) * 100) + '%';
  renderScenarioList();
}

function showFeedback(type) {
  const messages = {
    safe: 'Feedback inicial: confirmar por um canal independente é uma hipótese de resposta segura. O motivo e os sinais concretos desta situação ainda serão construídos e revisados.',
    review: 'Feedback inicial: antes de concluir, procure sinais observáveis e uma forma segura de conferir. Esta explicação será aprofundada na próxima etapa.',
    unknown: 'Tudo bem marcar incerteza. O objetivo do simulador será transformar essa dúvida em um procedimento verificável, sem expor dados pessoais.',
  };

  feedback.hidden = false;
  feedback.textContent = messages[type];
}

renderScenarioList();
