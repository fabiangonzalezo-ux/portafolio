/* ===========================================
   PORTAFOLIO FABIAN GONZÁLEZ - JAVASCRIPT
   =========================================== */

// Esperamos a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // NAVEGACIÓN MÓVIL
    // ===========================================
    
    // Obtenemos los elementos del menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    // Event listener para el botón hamburguesa
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cerrar el menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ===========================================
    // SCROLL SUAVE Y NAVEGACIÓN
    // ===========================================
    
    // Función para scroll suave a las secciones
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 100; // 100px para compensar la navegación fija
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Event listeners para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Event listeners para los botones del hero
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // ===========================================
    // EFECTOS DE SCROLL Y ANIMACIONES
    // ===========================================
    
    // Función para detectar cuando un elemento entra en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para animar elementos cuando entran en el viewport
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.experience-card, .skill-card, .project-featured');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar elementos para animación inicial
    const animatedElements = document.querySelectorAll('.experience-card, .skill-card, .project-featured');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Event listener para scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Ejecutar animación inicial
    animateOnScroll();
    
    // ===========================================
    // FORMULARIO DE CONTACTO
    // ===========================================
    
    // Obtenemos el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    // Función para validar el formulario
    function validateForm(formData) {
        const errors = [];
        
        // Validar nombre
        if (!formData.nombre || formData.nombre.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.push('Por favor ingresa un email válido');
        }
        
        // Validar mensaje
        if (!formData.mensaje || formData.mensaje.trim().length < 10) {
            errors.push('El mensaje debe tener al menos 10 caracteres');
        }
        
        return errors;
    }
    
    // Función para mostrar mensajes de error
    function showErrors(errors) {
        // Limpiar errores anteriores
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        // Mostrar nuevos errores
        errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#FF6B6B';
            errorDiv.style.fontSize = '0.9rem';
            errorDiv.style.marginTop = '0.5rem';
            errorDiv.textContent = error;
            
            contactForm.appendChild(errorDiv);
        });
    }
    
    // Función para limpiar errores
    function clearErrors() {
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
    }
    
    // Función para mostrar mensaje de éxito
    function showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.color = '#4CAF50';
        successDiv.style.fontSize = '1rem';
        successDiv.style.marginTop = '1rem';
        successDiv.style.padding = '1rem';
        successDiv.style.backgroundColor = '#E8F5E8';
        successDiv.style.borderRadius = '10px';
        successDiv.style.border = '1px solid #4CAF50';
        successDiv.textContent = '¡Mensaje enviado correctamente! Te contactaremos pronto.';
        
        contactForm.appendChild(successDiv);
        
        // Limpiar el formulario
        contactForm.reset();
        
        // Remover el mensaje de éxito después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Event listener para el envío del formulario
    contactForm.addEventListener('submit', function(e) {
        // Limpiar errores anteriores
        clearErrors();
        
        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            mensaje: document.getElementById('mensaje').value
        };
        
        // Validar formulario
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            e.preventDefault(); // Prevenir el envío si hay errores
            showErrors(errors);
        } else {
            // Mostrar mensaje de carga
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // El formulario se enviará automáticamente a Formspree
            // Agregar un listener para el evento de envío exitoso
            contactForm.addEventListener('formspree-success', function() {
                showSuccess();
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
            
            // Agregar un listener para errores de Formspree
            contactForm.addEventListener('formspree-error', function() {
                showErrors(['Error al enviar el mensaje. Por favor, inténtalo de nuevo.']);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        }
    });
    
    // ===========================================
    // EFECTOS HOVER Y INTERACCIONES
    // ===========================================
    
    // Efecto hover para las tarjetas de habilidades
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(0, 122, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        });
    });
    
    // Efecto hover para las tarjetas de experiencia
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 122, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        });
    });
    
    // Efecto hover para los botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efecto hover para los enlaces sociales
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===========================================
    // GALERÍA DE IMÁGENES
    // ===========================================
    
    // Efecto hover para las imágenes de la galería
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.filter = 'brightness(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
    
    // ===========================================
    // NAVEGACIÓN ACTIVA
    // ===========================================
    
    // Función para actualizar la navegación activa según la sección visible
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Aumentado para mejor detección
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Event listener para actualizar navegación activa
    window.addEventListener('scroll', updateActiveNavigation);
    
    // ===========================================
    // EFECTO DE TYPING EN EL TÍTULO
    // ===========================================
    
    // Función para crear efecto de escritura en el título
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto de escritura al título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Solo aplicar el efecto si el título es visible
        if (isElementInViewport(heroTitle)) {
            typeWriter(heroTitle, originalText, 50);
        }
    }
    
    // ===========================================
    // CONTADOR ANIMADO PARA ESTADÍSTICAS
    // ===========================================
    
    // Función para animar números
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // ===========================================
    // EFECTO PARALLAX SUAVE
    // ===========================================
    
    // Función para efecto parallax suave
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        const experienceSection = document.querySelector('.experience');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Efecto parallax para la sección de experiencia
        if (experienceSection) {
            const rect = experienceSection.getBoundingClientRect();
            const speed = 0.3;
            
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                experienceSection.style.transform = `translateY(${scrolled * speed}px)`;
            }
        }
    }
    
    // Event listener para efecto parallax
    window.addEventListener('scroll', parallaxEffect);
    
    // ===========================================
    // PRELOADER (OPCIONAL)
    // ===========================================
    
    // Función para mostrar/ocultar preloader
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }
    
    // Ocultar preloader cuando la página esté completamente cargada
    window.addEventListener('load', hidePreloader);
    
    // ===========================================
    // UTILIDADES ADICIONALES
    // ===========================================
    
    // Función para mostrar/ocultar botón de scroll hacia arriba
    function toggleScrollToTop() {
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    }
    
    // Event listener para botón de scroll hacia arriba
    window.addEventListener('scroll', toggleScrollToTop);
    
    // Función para scroll hacia arriba
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // ===========================================
    // INICIALIZACIÓN
    // ===========================================
    
    // Ejecutar funciones de inicialización
    updateActiveNavigation();
    toggleScrollToTop();
    
    // Mensaje de bienvenida en consola
    console.log('🚀 Portafolio de Fabian González cargado correctamente');
    console.log('💼 Profesional en Publicidad y Mercadeo');
    console.log('🎨 Diseño moderno y responsive');
    console.log('📱 Optimizado para todos los dispositivos');
    
    // ===========================================
    // MANEJO DE ERRORES
    // ===========================================
    
    // Función para manejar errores de JavaScript
    window.addEventListener('error', function(e) {
        console.error('Error en el portafolio:', e.error);
    });
    
    // Función para manejar errores de recursos
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Error al cargar imagen:', e.target.src);
            // Opcional: mostrar imagen de respaldo
            e.target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
        }
    }, true);
    
});

/* ===========================================
   FUNCIONES GLOBALES
   =========================================== */

// Función global para abrir enlaces externos en nueva pestaña
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Función global para copiar texto al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Texto copiado al portapapeles:', text);
    }).catch(err => {
        console.error('Error al copiar texto:', err);
    });
}

// Función global para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS para animaciones de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
