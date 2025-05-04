// MENU HAMBÚRGUER
const hamburger = document.getElementById('hamburger');
const menuNav = document.getElementById('menu_nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menuNav.classList.toggle('active');
});

// ANIMAÇÃO DO TÍTULO (DIGITAÇÃO)
const elemento = document.getElementById("texto-visivel");
const textos = ["Janpierry Santana", "Frontend Developer"];
let indexTexto = 0;
let indexLetra = 0;
let apagando = false;

function digitar() {
    const textoAtual = textos[indexTexto];
    const visivel = textoAtual.slice(0, indexLetra);
    elemento.textContent = visivel;

    if (!apagando) {
        if (indexLetra < textoAtual.length) {
            indexLetra++;
        } else {
            apagando = true;
            setTimeout(digitar, 1000);
            return;
        }
    } else {
        if (indexLetra > 0) {
            indexLetra--;
        } else {
            apagando = false;
            indexTexto = (indexTexto + 1) % textos.length;
        }
    }

    setTimeout(digitar, apagando ? 60 : 100);
}

digitar();

// ANIMAÇÃO DAS HABILIDADES AO SCROLL (usando data-porcentagem)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const barras = entry.target.querySelectorAll('.progresso');

            barras.forEach(barra => {
                const porcentagem = barra.getAttribute("data-porcentagem");
                barra.style.width = porcentagem;
            });

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.4
});

const habilidadesSection = document.querySelector('.habilidades');
if (habilidadesSection) {
    observer.observe(habilidadesSection);
}

// ANIMAÇÕES GERAIS AO SCROLL COM data-animar
const animarOnScroll = () => {
    const elementos = document.querySelectorAll('[data-animar]');

    elementos.forEach(el => {
        const posicao = el.getBoundingClientRect().top;
        const alturaTela = window.innerHeight * 0.85;

        if (posicao < alturaTela) {
            el.classList.add('ativo');
        }
    });
};

window.addEventListener('scroll', animarOnScroll);
window.addEventListener('load', animarOnScroll);
