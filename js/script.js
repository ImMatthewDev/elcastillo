document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Manejo del formulario de reservas
    const reservationForm = document.getElementById('reservation-form');
    const reservationMessage = document.getElementById('reservation-message');

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío del formulario por defecto

            // Aquí normalmente enviarías los datos a un servidor.
            // Por ahora, simularemos un envío exitoso y mostraremos un mensaje.

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

    // --- Nuevo código para el efecto de typing ---
    const typingTextElement = document.querySelector('.hero-content h1');
    const textToType = typingTextElement.textContent; // Guarda el texto original
    typingTextElement.textContent = ''; // Limpia el texto para empezar a escribir

    let charIndex = 0;
    const typingSpeed = 100; // Velocidad en milisegundos por carácter

    function typeWriter() {
        if (charIndex < textToType.length) {
            typingTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // Iniciar el efecto de máquina de escribir cuando la página carga
    typeWriter();
    // --- Fin del nuevo código ---
});
