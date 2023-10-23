
const cases = document.querySelectorAll('[data-case]');

const prevBtn = document.querySelector('[data-button=previous]');
const nextBtn = document.querySelector("[data-button=next]");

let currentlySelected = 0;

function previous() {
    nextBtn.disabled = false;
    cases[currentlySelected].classList.add('hide');
    currentlySelected--;
    cases[currentlySelected].classList.remove('hide');

    if (currentlySelected === 0) {
    prevBtn.disabled = true;
    prevBtn.classList.add('inactive');
    }

    if (currentlySelected === cases.length - 2) {
        nextBtn.classList.remove('inactive');
    }
}
  
function next() {
    prevBtn.disabled = false;
    cases[currentlySelected].classList.add('hide');
    currentlySelected++;
    cases[currentlySelected].classList.remove('hide');

    if (currentlySelected === cases.length - 1) {
    nextBtn.disabled = true;
    nextBtn.classList.add('inactive');
    }

    if (currentlySelected === 1) {
        prevBtn.classList.remove('inactive');
    }
}
  
function prevNext() {
    prevBtn.addEventListener('click', function() {
      previous();
    });
  
    nextBtn.addEventListener('click', function() {
      next();
    });
}
  
prevNext();

/*

Criar uma classe em CSS para criar hide cases.

Criar uma classe em CSS para criar o estilo inativo do botao.

Guardar o botao previous e next em const distintas.

Guardar todos os cases dentro de uma const - criando assim um array com os cases que serão iterados depois. 

Criar um funcao prevNext que deve ativar uma função diferente para cada botao onclick: 

    função nextBtn {
        retirar a clase hide do proximo indice do array que foi criado dentro da const cases
        add a classe hide no indice anterior do array da const cases
    }

    função prevBtn {
        retirar a clase hide do indice anterior do array que foi criado dentro da const cases
        add a classe hide no proximo indice do array da const cases
    }

Criar uma condição dentro da funçao nextBtn e outra dentro da funcao prevBtn para desativar o botão e add a classe inativo.

*/

