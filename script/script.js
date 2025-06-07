const hamburger = document.getElementById('hamburger');
const menuNav = document.getElementById('menu_nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menuNav.classList.toggle('active');
});

// Close menu when a link is clicked
const menuLinks = menuNav.querySelectorAll('ul li a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menuNav.classList.remove('active');
    });
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

// ANIMAÇÃO DOS NÚMEROS (EXPERIÊNCIA E PROJETOS) AO SCROLL
const numeros = document.querySelectorAll(".numero");

const animarNumeros = (el) => {
    const alvo = +el.dataset.alvo;
    let atual = 0;
    const duracao = 2000;
    const passo = Math.max(1, Math.ceil(alvo / (duracao / 100)));

    const contador = setInterval(() => {
        atual += passo;
        if (atual >= alvo) {
            atual = alvo;
            clearInterval(contador);
        }
        el.textContent = atual;
    }, 100);
};

const observerNumeros = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const elemento = entry.target;
            animarNumeros(elemento);
            observerNumeros.unobserve(elemento);
        }
    });
}, {
    threshold: 0.6
});

numeros.forEach(num => observerNumeros.observe(num));

//ANIMAÇAO FOOTER
const frase = document.getElementById("frase-animada");
const textoOriginal = frase.textContent.trim();
frase.textContent = "";

const observerFrase = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            [...textoOriginal].forEach((letra, i) => {
                const span = document.createElement("span");
                span.classList.add("letra");

                if (letra === " ") {
                    span.innerHTML = "&nbsp;";
                } else {
                    span.textContent = letra;
                }

                span.style.animationDelay = `${i * 0.05}s`;
                frase.appendChild(span);
            });

            observerFrase.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.6
});

if (frase) {
    observerFrase.observe(frase);
}