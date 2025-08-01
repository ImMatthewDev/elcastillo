document.addEventListener('DOMContentLoaded', () => {
    // --- Efecto de Typing para el Título Principal ---
    const typingTextElement = document.querySelector('.typing-effect');
    if (typingTextElement) {
        const textToType = typingTextElement.textContent;
        typingTextElement.textContent = ''; // Limpia el texto para empezar a escribir

        // Calcular la duración de la animación dinámicamente
        // Cada carácter toma aproximadamente 0.15 segundos
        const typingSpeed = 0.15; // Segundos por carácter
        const animationDuration = textToType.length * typingSpeed;

        // Establecer la variable CSS --typing-steps y --typing-duration
        // para que las animaciones CSS puedan usar estos valores
        typingTextElement.style.setProperty('--typing-steps', textToType.length);
        typingTextElement.style.setProperty('--typing-duration', `${animationDuration}s`);

        // Necesitamos un pequeño retraso para asegurar que las variables CSS se apliquen
        // antes de que la animación comience.
        setTimeout(() => {
            typingTextElement.textContent = textToType; // Pone el texto completo
            typingTextElement.style.animation = `typing var(--typing-duration) steps(var(--typing-steps), end) forwards, blink-caret .75s step-end infinite`;
        }, 100); // Pequeño retraso
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
