document.addEventListener('DOMContentLoaded', function() {
    // Establecer fecha actual
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('es-ES');
    
    // Navegación entre secciones
    const navLinks = document.querySelectorAll('.nav-menu a[data-section]');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            // Ocultar todas las secciones
            sections.forEach(section => section.classList.remove('active'));
            
            // Mostrar la sección correspondiente
            const targetSection = document.getElementById(this.dataset.section);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Cerrar sidebar en móviles después de seleccionar
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });
    
    // Navegación por submenu
    const submenuLinks = document.querySelectorAll('.submenu-link');
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.dataset.target;
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Primero asegurar que la sección padre esté activa
                const parentSection = targetElement.closest('.section');
                if (parentSection) {
                    // Ocultar todas las secciones
                    sections.forEach(section => section.classList.remove('active'));
                    // Mostrar la sección padre
                    parentSection.classList.add('active');
                    
                    // Actualizar navegación principal
                    navLinks.forEach(l => l.classList.remove('active'));
                    const parentNavLink = document.querySelector(`[data-section="${parentSection.id}"]`);
                    if (parentNavLink) {
                        parentNavLink.classList.add('active');
                    }
                }
                
                // Scroll suave al elemento
                setTimeout(() => {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
                
                // Cerrar sidebar en móviles
                if (window.innerWidth <= 768) {
                    document.getElementById('sidebar').classList.remove('touch-expanded');
                }
            }
        });
    });
});

// Funciones para modal
function openModal(type) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    let content = '';
    
    switch(type) {
        case 'photos':
            content = `
                <h3>Galería Fotográfica</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                    <div style="background: #f0f0f0; height: 150px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                        Foto 1: Intersección Calle X
                    </div>
                    <div style="background: #f0f0f0; height: 150px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                        Foto 2: Señalización deficiente
                    </div>
                    <div style="background: #f0f0f0; height: 150px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                        Foto 3: Iluminación nocturna
                    </div>
                    <div style="background: #f0f0f0; height: 150px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                        Foto 4: Estado del pavimento
                    </div>
                </div>
            `;
            break;
        case 'plans':
            content = `
                <h3>Planos Técnicos</h3>
                <div style="margin-top: 20px;">
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                        <h4>Plano General del Corredor</h4>
                        <p>Ubicación de puntos críticos identificados en la auditoría</p>
                        <div style="background: #e9ecef; height: 200px; margin-top: 10px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #666;">
                            [Plano General - Escala 1:1000]
                        </div>
                    </div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                        <h4>Detalles de Intersecciones</h4>
                        <p>Planos de detalle de las intersecciones más críticas</p>
                        <div style="background: #e9ecef; height: 200px; margin-top: 10px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #666;">
                            [Planos de Detalle - Escala 1:200]
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Cerrar modal al hacer click fuera
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Efectos de hover para cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.summary-card, .observation-card, .location-analysis, .annex-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });
});

// Función para imprimir informe
function printReport() {
    window.print();
}

// Función para exportar datos (simulada)
function exportData() {
    alert('Funcionalidad de exportación en desarrollo. Los datos se exportarían en formato PDF/Excel.');
}

// Animación de entrada para elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.summary-card, .observation-card, .location-analysis');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Inicializar animaciones
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.summary-card, .observation-card, .location-analysis');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    setTimeout(animateOnScroll, 100);
});

window.addEventListener('scroll', animateOnScroll);

// Función para descargar PDF
function downloadPDF() {
    // Simular descarga del PDF
    const link = document.createElement('a');
    link.href = 'pdf/informe-auditoria-seguridad-vial.pdf';
    link.download = 'Informe_Auditoria_Seguridad_Vial.pdf';
    link.click();
}

// Función para mostrar tabs
function showTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar el tab seleccionado
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Activar el botón correspondiente
    event.target.classList.add('active');
}

// Touch events para dispositivos móviles
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-menu a[data-section]');
    let touchStartTime = 0;
    
    // Prevenir expansión del sidebar al hacer click en enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        link.addEventListener('touchend', function(e) {
            e.stopPropagation();
        });
    });
    
    // Touch events para expandir sidebar (solo en área vacía)
    sidebar.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.nav-menu a')) {
            touchStartTime = Date.now();
        }
    });
    
    sidebar.addEventListener('touchend', function(e) {
        if (!e.target.closest('.nav-menu a')) {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration < 200) {
                this.classList.toggle('touch-expanded');
            }
        }
    });
    
    // Cerrar sidebar al tocar fuera en móviles
    document.addEventListener('touchstart', function(e) {
        if (window.innerWidth <= 768 && !sidebar.contains(e.target)) {
            sidebar.classList.remove('touch-expanded');
        }
    });
});
// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    // Toggle sidebar
    hamburgerMenu.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        hamburgerMenu.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    });
    
    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        hamburgerMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });
    
    // Close sidebar when clicking nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('open');
                hamburgerMenu.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        });
    });
});