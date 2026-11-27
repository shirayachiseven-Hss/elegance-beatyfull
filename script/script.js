
/* =========================================
   ÉLÉGANCE BEAUTY
   JavaScript principal
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. CONFIGURAÇÕES
    // =====================================

    // Substituir pelo número oficial autorizado.
    // Formato: código do país + número, sem espaços.
    const WHATSAPP_NUMBER = "244900000000";


    // =====================================
    // 2. ELEMENTOS PRINCIPAIS
    // =====================================

    const preloader = document.querySelector(
        "#preloader, .preloader"
    );

    const menuToggle = document.querySelector(
        ".menu-toggle, #menuToggle, .menu-btn"
    );

    const navigation = document.querySelector(
        ".nav-links, .nav-menu, #navMenu"
    );

    const header = document.querySelector("header");

    const bookingForm = document.querySelector(
        "#bookingForm, #booking-form, .booking-form, [data-booking-form]"
    );


    // =====================================
    // 3. PRELOADER
    // =====================================

    function hidePreloader() {

        if (!preloader) return;

        preloader.classList.add("hidden");

        setTimeout(() => {
            preloader.style.display = "none";
        }, 700);

    }

    window.addEventListener("load", hidePreloader);

    setTimeout(hidePreloader, 3000);


    // =====================================
    // 4. MENU MOBILE
    // =====================================

    function closeMenu() {

        if (!menuToggle || !navigation) return;

        menuToggle.classList.remove("active");
        navigation.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    if (menuToggle && navigation) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        document.addEventListener("click", event => {

            if (
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

    }


    // =====================================
    // 5. CABEÇALHO DINÂMICO
    // =====================================

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    // =====================================
    // 6. ANIMAÇÕES DE ENTRADA
    // =====================================

    const revealStyle = document.createElement("style");

    revealStyle.textContent = `

        .js-reveal {
            opacity: 0;
            transform: translateY(35px);

            transition:
                opacity 0.8s ease,
                transform 0.8s ease;
        }

        .js-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {

            .js-reveal {
                opacity: 1;
                transform: none;
                transition: none;
            }

        }

    `;

    document.head.appendChild(revealStyle);

    const revealElements = document.querySelectorAll(
        ".section-title, " +
        ".about-content, " +
        ".service-card, " +
        ".gallery-item, " +
        ".booking-content, " +
        ".contact-item, " +
        ".testimonials-header, " +
        ".testimonial-card, " +
        ".testimonials-footer, " +
        ".pricing-card"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {

            element.classList.add("js-reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("is-visible");

        });

    }


    // =====================================
    // 7. ANO AUTOMÁTICO
    // =====================================

    const currentYear = document.querySelector(
        "#currentYear"
    );

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    // =====================================
    // 8. DATA MÍNIMA PARA MARCAÇÕES
    // =====================================

    const dateInput = document.querySelector(
        "#bookingDate, input[type='date']"
    );

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;

    }


    // =====================================
    // 9. FORMULÁRIO DE MARCAÇÕES
    // =====================================

    if (bookingForm) {

        bookingForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!bookingForm.reportValidity()) {
                return;
            }

            const formData = new FormData(
                bookingForm
            );

            function getField(...names) {

                for (const name of names) {

                    const value = formData.get(name);

                    if (
                        value !== null &&
                        String(value).trim() !== ""
                    ) {
                        return String(value).trim();
                    }

                }

                return "";

            }

            const clientName = getField(
                "name",
                "nome"
            );

            const clientPhone = getField(
                "phone",
                "telefone"
            );

            const service = getField(
                "service",
                "servico",
                "serviço"
            );

            const date = getField(
                "date",
                "data"
            );

            const time = getField(
                "time",
                "horario",
                "horário"
            );

            const message = getField(
                "message",
                "mensagem"
            );


            // VALIDAÇÃO

            if (
                !clientName ||
                !clientPhone ||
                !service ||
                !date ||
                !time
            ) {

                alert(
                    "Preenche todos os campos obrigatórios."
                );

                return;

            }


            // FORMATAÇÃO DA DATA

            const formattedDate = new Date(
                `${date}T12:00:00`
            ).toLocaleDateString("pt-PT");


            // MENSAGEM WHATSAPP

            const whatsappMessage = `

Olá! Gostaria de solicitar uma marcação na ÉLÉGANCE BEAUTY.

Nome: ${clientName}

Telefone: ${clientPhone}

Serviço: ${service}

Data pretendida: ${formattedDate}

Horário pretendido: ${time}

Mensagem adicional: ${message || "Nenhuma"}

Aguardo confirmação. Obrigado!

            `.trim();


            // VERIFICAÇÃO DO NÚMERO

            if (
                WHATSAPP_NUMBER === "244900000000"
            ) {

                alert(
                    "O formulário está preparado, mas ainda falta configurar o número oficial do WhatsApp."
                );

                return;

            }


            // ABRIR WHATSAPP

            const whatsappURL =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    // =====================================
    // 10. SCROLL SUAVE
    // =====================================

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }

            const target = document.querySelector(
                targetID
            );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        });

    });


    // =====================================
    // 11. LIGHTBOX INTERATIVO
    // =====================================

    const galleryItems = document.querySelectorAll(
        ".gallery-item"
    );

    const lightbox = document.querySelector(
        "#lightbox"
    );

    const lightboxImage = document.querySelector(
        "#lightboxImage"
    );

    const lightboxCaption = document.querySelector(
        "#lightboxCaption"
    );

    const lightboxClose = document.querySelector(
        "#lightboxClose"
    );

    const lightboxPrev = document.querySelector(
        "#lightboxPrev"
    );

    const lightboxNext = document.querySelector(
        "#lightboxNext"
    );

    let currentGalleryIndex = 0;

    const galleryImages = Array.from(
        galleryItems
    ).map(item => {

        const image = item.querySelector("img");

        return {

            src: image ? image.src : "",

            alt: image ? image.alt : "",

            caption:
                item.querySelector("h3")?.textContent || ""

        };

    }).filter(image => image.src);


    function showGalleryImage(index) {

        if (
            !galleryImages.length ||
            !lightboxImage ||
            !lightboxCaption
        ) {
            return;
        }

        currentGalleryIndex =
            (
                index + galleryImages.length
            ) % galleryImages.length;

        const image =
            galleryImages[currentGalleryIndex];

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

        lightboxCaption.textContent =
            image.caption;

    }


    function openLightbox(index) {

        if (!lightbox) return;

        showGalleryImage(index);

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

        if (lightboxClose) {
            lightboxClose.focus();
        }

    }


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    galleryItems.forEach((item, index) => {

        item.addEventListener("click", event => {

            event.preventDefault();

            openLightbox(index);

        });

    });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            () => {

                showGalleryImage(
                    currentGalleryIndex - 1
                );

            }
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            () => {

                showGalleryImage(
                    currentGalleryIndex + 1
                );

            }
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (event.target === lightbox) {
                    closeLightbox();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }

            if (event.key === "Escape") {

                closeLightbox();

            }

            if (event.key === "ArrowRight") {

                showGalleryImage(
                    currentGalleryIndex + 1
                );

            }

            if (event.key === "ArrowLeft") {

                showGalleryImage(
                    currentGalleryIndex - 1
                );

            }
            
            

        }
    );
    
    
// 14. FAQ — ACCORDION

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    item.addEventListener("toggle", () => {

        if (item.open) {

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.removeAttribute("open");
                }

            });

        }

    });

});



    // =====================================
    // 12. INICIALIZAÇÃO
    // =====================================

    closeMenu();

    updateHeader();

    console.log(
        "ÉLÉGANCE BEAUTY: Sistema iniciado com sucesso."
    );

});



    // =====================================
    // 12. SELEÇÃO AUTOMÁTICA DE PLANOS
    // =====================================

    const pricingButtons = document.querySelectorAll(
        ".pricing-button"
    );

    const bookingMessage = document.querySelector(
        "#bookingMessage"
    );

    pricingButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedPlan = button.dataset.plan;

            if (bookingMessage && selectedPlan) {

                bookingMessage.value =
                    `Plano selecionado: ${selectedPlan}`;

            }

        });

    });


    // =====================================
    // 13. TESTIMONIALS CAROUSEL
    // =====================================

    const testimonialCards = document.querySelectorAll(
        ".testimonial-card"
    );

    const testimonialDots = document.querySelectorAll(
        ".testimonial-dot"
    );

    const testimonialPrev = document.querySelector(
        ".testimonial-prev"
    );

    const testimonialNext = document.querySelector(
        ".testimonial-next"
    );

    let currentTestimonial = 0;

    function showTestimonial(index) {

        if (!testimonialCards.length) return;

        currentTestimonial =
            (index + testimonialCards.length) %
            testimonialCards.length;

        testimonialCards.forEach((card, i) => {

            card.classList.toggle(
                "active",
                i === currentTestimonial
            );

        });

        testimonialDots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentTestimonial
            );

        });

    }

    if (testimonialPrev) {

        testimonialPrev.addEventListener("click", () => {

            showTestimonial(currentTestimonial - 1);

        });

    }

    if (testimonialNext) {

        testimonialNext.addEventListener("click", () => {

            showTestimonial(currentTestimonial + 1);

        });

    }

    testimonialDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showTestimonial(index);

        });

    });

    showTestimonial(0);

