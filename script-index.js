const palavras = [
    "Dev Front-end",
    "UX/UI Designer",
    "Web Developer"
];

let palavraIndex = 0;
let letraIndex = 0;
let apagando = false;

const typingText = document.querySelector(".typing-text");

function digitar() {
    const palavraAtual = palavras[palavraIndex];

    if (!apagando) {
        typingText.textContent = palavraAtual.substring(0, letraIndex + 1);
        letraIndex++;

        if (letraIndex === palavraAtual.length) {
            apagando = true;
            setTimeout(digitar, 1600);
            return;
        }
    } else {
        typingText.textContent = palavraAtual.substring(0, letraIndex - 1);
        letraIndex--;

        if (letraIndex === 0) {
            apagando = false;
            palavraIndex = (palavraIndex + 1) % palavras.length;
        }
    }

    setTimeout(digitar, apagando ? 45 : 80);
}

digitar();

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {
    const veioDeOutraPagina = document.referrer && !document.referrer.includes("index.html");

    if (window.location.hash && veioDeOutraPagina) {
        const destino = document.querySelector(window.location.hash);

        if (destino) {
            setTimeout(function () {
                destino.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }

        return;
    }

    history.replaceState(null, null, window.location.pathname);
    window.scrollTo(0, 0);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch((err) => console.log("Erro ao registrar SW:", err));
}