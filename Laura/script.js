let pulsaciones = 0;

const maxPulsaciones = 24;


const corazon =
    document.getElementById("corazon");

const contador =
    document.getElementById("contador");

const mensaje =
    document.getElementById("mensaje");

const pantallaInicio =
    document.getElementById("pantallaInicio");

const pantallaJarron =
    document.getElementById("pantallaJarron");


/* =========================================
   MÚSICA
   Empieza con la primera pulsación del corazón
========================================= */

const musicaFondo =
    document.getElementById("musicaFondo");

if (musicaFondo) {
    musicaFondo.volume = 0.35;
}

function iniciarMusica() {

    if (!musicaFondo) return;

    musicaFondo.play().catch(() => {
        // Algunos navegadores pueden bloquear el audio;
        // al ser una acción iniciada por el usuario normalmente funciona.
    });
}


let terminado = false;


/* =========================================
   CLICS DEL CORAZÓN
========================================= */

corazon.addEventListener("click", () => {

    iniciarMusica();

    if (terminado) return;


    pulsaciones++;


    contador.textContent =
        `${pulsaciones} / ${maxPulsaciones}`;


    /* MENSAJES */

    if (pulsaciones === 1) {

        mensaje.textContent =
            "Una por cada recuerdo bonito...";
    }


    if (pulsaciones === 6) {

        mensaje.textContent =
            "Una por cada sonrisa...";
    }


    if (pulsaciones === 12) {

        mensaje.textContent =
            "Una por cada momento juntos...";
    }


    if (pulsaciones === 18) {

        mensaje.textContent =
            "Y todavía quedan muchos más...";
    }


    if (pulsaciones === 23) {

        mensaje.textContent =
            "Solo queda una...";
    }


    /* PEQUEÑO LATIDO */

    if (pulsaciones < maxPulsaciones) {

        corazon.animate(

            [
                {
                    transform: "scale(1)"
                },

                {
                    transform: "scale(0.82)"
                },

                {
                    transform: "scale(1)"
                }
            ],

            {
                duration: 220,

                easing: "ease-out"
            }
        );
    }


    /* =====================================
       PULSACIÓN 24
    ===================================== */

    if (pulsaciones === maxPulsaciones) {

        terminado = true;


        mensaje.textContent =
            "¡Feliz cumpleaños! ❤️";


        corazon.style.pointerEvents =
            "none";


        /* EXPLOSIÓN */

        crearExplosion();


        setTimeout(() => {

            corazon.classList.add(
                "explotando"
            );

        }, 150);


        /* DESAPARECE EL TEXTO DE LA
           PANTALLA INICIAL */

        setTimeout(() => {

            contador.style.opacity = "0";

            mensaje.style.opacity = "0";

            document.querySelector(
                ".pequeno"
            ).style.opacity = "0";

        }, 300);


        /* =================================
           CAMBIO AL JARRÓN
        ================================= */

        setTimeout(() => {

            pantallaInicio.style.opacity =
                "0";


            pantallaJarron.classList.add(
                "visible"
            );


            /*
               Esperamos un poquito para que
               la pantalla del jarrón aparezca
               suavemente.
            */

            setTimeout(() => {

                pantallaJarron.classList.add(
                    "animarJarron"
                );

            }, 400);


            /*
               Quitamos completamente
               la pantalla inicial.
            */

            setTimeout(() => {

                pantallaInicio.style.display =
                    "none";

            }, 1500);


        }, 1500);

    }

});


/* =========================================
   EXPLOSIÓN DE CORAZONES
========================================= */

function crearExplosion() {

    const rect =
        corazon.getBoundingClientRect();


    const centroX =
        rect.left +
        rect.width / 2;


    const centroY =
        rect.top +
        rect.height / 2;


    for (let i = 0; i < 80; i++) {


        const particula =
            document.createElement("span");


        particula.className =
            "particula";


        const corazones = [

            "❤️",
            "💕",
            "💗",
            "💖",
            "💓"

        ];


        particula.textContent =
            corazones[
                Math.floor(
                    Math.random() *
                    corazones.length
                )
            ];


        particula.style.setProperty(
            "--inicio-x",
            `${centroX}px`
        );


        particula.style.setProperty(
            "--inicio-y",
            `${centroY}px`
        );


        const angulo =
            Math.random() *
            Math.PI *
            2;


        const distancia =
            150 +
            Math.random() *
            450;


        const destinoX =
            Math.cos(angulo) *
            distancia;


        const destinoY =
            Math.sin(angulo) *
            distancia;


        particula.style.setProperty(
            "--destino-x",
            `${destinoX}px`
        );


        particula.style.setProperty(
            "--destino-y",
            `${destinoY}px`
        );


        const tamaño =
            10 +
            Math.random() *
            20;


        particula.style.setProperty(
            "--tamano",
            `${tamaño}px`
        );


        const rotacion =
            Math.random() *
            720 -
            360;


        particula.style.setProperty(
            "--rotacion",
            `${rotacion}deg`
        );


        document.body.appendChild(
            particula
        );


        particula.addEventListener(

            "animationend",

            () => {

                particula.remove();

            },

            {
                once: true
            }
        );

    }

}

/* =========================================
   VISOR DE FOTOS
========================================= */

const visorFoto =
    document.getElementById("visorFoto");

const fotoGrande =
    document.getElementById("fotoGrande");

const cerrarFoto =
    document.getElementById("cerrarFoto");

const flores = document.querySelectorAll(".flor");

flores.forEach((flor) => {

    flor.addEventListener("click", (evento) => {

        evento.stopPropagation();

        const foto =
            flor.querySelector(".fotoFlor");

        if (foto) {
            fotoGrande.src =
                foto.getAttribute("href");

            visorFoto.classList.add(
                "abierto"
            );
        }
    });

});


/* CERRAR EL VISOR */

function cerrarVisor() {

    visorFoto.classList.remove(
        "abierto"
    );

}


/* Botón X */

cerrarFoto.addEventListener(
    "click",
    cerrarVisor
);


/* Clicar fuera de la foto */

visorFoto.addEventListener(
    "click",
    (evento) => {

        if (
            evento.target === visorFoto
        ) {
            cerrarVisor();
        }

    }
);


/* Tecla ESC */

document.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Escape"
        ) {
            cerrarVisor();
        }

    }
);

/* =========================================
   CARTA
========================================= */

const botonCarta =
    document.getElementById("botonCarta");

const cartaOverlay =
    document.getElementById("cartaOverlay");

const cerrarCarta =
    document.getElementById("cerrarCarta");


botonCarta.addEventListener(
    "click",
    (evento) => {

        evento.stopPropagation();

        cartaOverlay.classList.add(
            "abierta"
        );

    }
);


function cerrarLaCarta() {

    cartaOverlay.classList.remove(
        "abierta"
    );

}


cerrarCarta.addEventListener(
    "click",
    cerrarLaCarta
);


cartaOverlay.addEventListener(
    "click",
    (evento) => {

        if (
            evento.target === cartaOverlay
        ) {
            cerrarLaCarta();
        }

    }
);


document.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Escape" &&
            cartaOverlay.classList.contains("abierta")
        ) {
            cerrarLaCarta();
        }

    }
);
