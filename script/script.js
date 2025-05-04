// MENU HAMBÚRGUER
const hamburger = document.getElementById('hamburger');
const menuNav = document.getElementById('menu_nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menuNav.classList.toggle('active');
});

// ANIMAÇÃO DO TÍTULO (DIGITAÇÃO)
const elemento = document.getElementById("titulo_inicio");
const textos = ["Janpierry Santana", "Dev Frontend"];
let indexTexto = 0;
let indexLetra = 0;
let apagando = false;

function digitar() {
    const textoAtual = textos[indexTexto];

    if (!apagando && indexLetra <= textoAtual.length) {
        elemento.textContent = textoAtual.substring(0, indexLetra);
        indexLetra++;
        setTimeout(digitar, 100);
    } else if (apagando && indexLetra >= 0) {
        elemento.textContent = textoAtual.substring(0, indexLetra);
        indexLetra--;
        setTimeout(digitar, 60);
    } else {
        if (!apagando) {
            apagando = true;
            setTimeout(digitar, 1200); 
        } else {
            apagando = false;
            indexTexto = (indexTexto + 1) % textos.length;
            setTimeout(digitar, 300); 
        }
    }
}

digitar();

// ANIMAÇÃO DAS HABILIDADES AO SCROLL
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
