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
                
                // Animar barras de riesgo si están en la sección
                animateRiskBars();
            }
        });
    });
    
    // Animar barras de riesgo
    function animateRiskBars() {
        const riskBars = document.querySelectorAll('.risk-bar');
        riskBars.forEach(bar => {
            const riskValue = bar.dataset.risk;
            if (riskValue) {
                setTimeout(() => {
                    bar.style.setProperty('--risk-width', riskValue + '%');
                }, 300);
            }
        });
    }
    
    // Inicializar barras de riesgo en la primera carga
    setTimeout(animateRiskBars, 500);
    
    // Navegación por submenu
    const submenuItems = document.querySelectorAll('.submenu span');
    submenuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Encontrar la sección padre
            const parentSection = this.closest('li').previousElementSibling?.querySelector('a');
            if (parentSection) {
                parentSection.click();
                
                // Scroll suave al subsection correspondiente
                setTimeout(() => {
                    const subsectionText = this.textContent.trim();
                    const subsections = document.querySelectorAll('.subsection h3, .observation-card h3, .location-analysis h3');
                    
                    subsections.forEach(subsection => {
                        if (subsection.textContent.includes(subsectionText.split(' ')[1])) {
                            subsection.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start' 
                            });
                        }
                    });
                }, 100);
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
        case 'norms':
            content = `
                <h3>Referencias Normativas</h3>
                <div style="margin-top: 20px;">
                    <ul style="list-style: none; padding: 0;">
                        <li style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid #F39C12;">
                            <strong>Manual de Señalización Vial</strong><br>
                            <span style="color: #666; font-size: 14px;">Ministerio de Transporte - Resolución 1885/2018</span>
                        </li>
                        <li style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid #F39C12;">
                            <strong>Normas de Diseño Geométrico</strong><br>
                            <span style="color: #666; font-size: 14px;">AASHTO - A Policy on Geometric Design</span>
                        </li>
                        <li style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid #F39C12;">
                            <strong>Guía de Auditorías de Seguridad Vial</strong><br>
                            <span style="color: #666; font-size: 14px;">AUSTROADS - Road Safety Audit Guidelines</span>
                        </li>
                        <li style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid #F39C12;">
                            <strong>Código de Tránsito Nacional</strong><br>
                            <span style="color: #666; font-size: 14px;">Ley 24.449 y modificatorias</span>
                        </li>
                    </ul>
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