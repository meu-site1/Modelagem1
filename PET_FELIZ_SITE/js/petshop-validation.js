document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("#contactForm, #contact-form");

    forms.forEach(function (form) {
        const status = form.querySelector("#form-status") || createStatus(form);

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            clearErrors(form);
            const name = form.querySelector('[name="name"]');
            const email = form.querySelector('[name="email"]');
            const subject = form.querySelector('[name="subject"]');
            const message = form.querySelector('[name="message"]');

            let valid = true;

            if (!name || name.value.trim().length < 3) {
                showError(name, "Informe o seu nome completo.");
                valid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailPattern.test(email.value.trim())) {
                showError(email, "Informe um e-mail válido.");
                valid = false;
            }

            if (!subject || subject.value.trim().length < 3) {
                showError(subject, "Informe o assunto.");
                valid = false;
            }

            if (!message || message.value.trim().length < 10) {
                showError(message, "A mensagem deve ter pelo menos 10 caracteres.");
                valid = false;
            }

            if (!valid) {
                status.textContent = "Verifique os campos destacados e tente novamente.";
                status.className = "form-status error";
                return;
            }

            status.textContent = "Mensagem validada com sucesso! Obrigado por contactar a Pet Feliz.";
            status.className = "form-status success";
            form.reset();
        });

        form.addEventListener("reset", function () {
            setTimeout(function () {
                clearErrors(form);
                status.textContent = "";
                status.className = "form-status";
            }, 0);
        });
    });

    function createStatus(form) {
        const div = document.createElement("div");
        div.className = "form-status";
        div.setAttribute("role", "status");
        div.setAttribute("aria-live", "polite");
        form.appendChild(div);
        return div;
    }

    function showError(field, message) {
        if (!field) return;
        field.classList.add("input-error");
        const error = document.createElement("span");
        error.className = "form-error";
        error.textContent = message;
        field.parentElement.appendChild(error);
    }

    function clearErrors(form) {
        form.querySelectorAll(".form-error").forEach(function (el) { el.remove(); });
        form.querySelectorAll(".input-error").forEach(function (el) { el.classList.remove("input-error"); });
    }
});