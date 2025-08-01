document.addEventListener('DOMContentLoaded', () => {
    // --- Efecto de Typing para el Título Principal ---
    const typingTextElement = document.querySelector('.typing-effect');
    if (typingTextElement) {
        const originalText = typingTextElement.textContent; // Guardar el texto original
        typingTextElement.textContent = ''; // Limpiar el texto para la animación
        typingTextElement.style.overflow = 'hidden'; // Ocultar el desbordamiento inicial
        typingTextElement.style.whiteSpace = 'nowrap'; // Mantenerlo en una línea inicialmente para medir

        // Medir el ancho del texto completo cuando está en una sola línea
        // Creamos un elemento temporal invisible para medirlo con precisión
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'nowrap'; // Para que la medición sea precisa
        tempSpan.style.fontSize = getComputedStyle(typingTextElement).fontSize; // Heredar estilo de fuente
        tempSpan.style.fontFamily = getComputedStyle(typingTextElement).fontFamily; // Heredar estilo de fuente
        tempSpan.textContent = originalText;
        document.body.appendChild(tempSpan);
        const textWidth = tempSpan.offsetWidth + 5; // Obtener el ancho del texto, añadir un pequeño buffer
        document.body.removeChild(tempSpan); // Eliminar el elemento temporal

        // Establecer la variable CSS --final-width y --typing-duration
        const typingSpeed = 0.08; // Velocidad de escritura: segundos por carácter (ajusta si es muy lento/rápido)
        const animationDuration = originalText.length * typingSpeed;

        typingTextElement.style.setProperty('--final-width', `${textWidth}px`);
        typingTextElement.style.setProperty('--typing-duration', `${animationDuration}s`);

        // Aplicar las animaciones CSS
        // Se usa 'setTimeout' para asegurar que las variables CSS se apliquen antes de iniciar la animación
        setTimeout(() => {
            typingTextElement.style.animation = `
                typing var(--typing-duration) steps(var(--typing-steps, ${originalText.length}), end) forwards,
                blink-caret .75s step-end infinite
            `;
            // Reestablecer el texto. La animación CSS controlará el ancho.
            typingTextElement.textContent = originalText;
            
            // Después de que la animación termine (o justo antes),
            // permitir que el texto se ajuste si la pantalla es más pequeña
            setTimeout(() => {
                typingTextElement.style.whiteSpace = 'normal'; // Permitir salto de línea
                typingTextElement.style.overflow = 'visible'; // Asegurar que sea visible si hay overflow
                typingTextElement.style.borderRight = 'none'; // Eliminar el cursor al finalizar
            }, animationDuration * 1000 + 500); // 500ms después de que la animación debería terminar
        }, 100); // Retraso inicial para aplicar variables CSS
    }

    // --- Smooth Scrolling para los enlaces de navegación ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Cierra el menú hamburguesa si está abierto
            const navLinks = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                // Restablece la opacidad de los enlaces para futuras aperturas
                navLinks.querySelectorAll('li').forEach((link, index) => {
                    link.style.animation = '';
                });
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Menú Hamburguesa para Móviles ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    if (burger) { // Asegurarse de que el elemento exista antes de añadir el evento
        burger.addEventListener('click', () => {
            // Toggle Nav (abre/cierra el menú completo)
            navLinks.classList.toggle('nav-active');

            // Animate Links (añade/quita animación a cada enlace)
            navItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = ''; // Si ya tiene animación, la resetea
                } else {
                    // Aplica una animación con retraso para cada elemento
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation (anima las líneas de la hamburguesa para formar una 'X')
            burger.classList.toggle('toggle');
        });
    }

    // --- Transición de Pestañas del Menú ---
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuPanels = document.querySelectorAll('.menu-category-panel');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover 'active' de todas las pestañas y paneles
            menuTabs.forEach(item => item.classList.remove('active'));
            menuPanels.forEach(item => item.classList.remove('active'));

            // Añadir 'active' a la pestaña clicada
            tab.classList.add('active');

            // Mostrar el panel correspondiente
            const targetId = tab.dataset.category;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Activar la primera pestaña y panel del menú por defecto
    if (menuTabs.length > 0) {
        menuTabs[0].click();
    }

    // --- Efecto Fade-in al Hacer Scroll para Secciones ---
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // Observa el viewport
        rootMargin: '0px',
        threshold: 0.2 // Cuando el 20% de la sección esté visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Dejar de observar una vez que ha aparecido
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Header Scrolled Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Si el scroll es mayor a 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Manejo del formulario de reservas ---
    const reservationForm = document.getElementById('reservation-form');
    const reservationMessage = document.getElementById('reservation-message');

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío del formulario por defecto

            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;

            if (name && date && time && guests) {
                reservationMessage.textContent = `¡Gracias, ${name}! Tu reserva para ${guests} personas el ${date} a las ${time} ha sido recibida. Nos pondremos en contacto pronto para confirmar.`;
                reservationMessage.style.color = 'green';
                reservationForm.reset(); // Limpia el formulario
            } else {
                reservationMessage.textContent = 'Por favor, completa todos los campos requeridos para la reserva.';
                reservationMessage.style.color = 'red';
            }
        });
    }
});
