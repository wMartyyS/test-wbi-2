document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('registerForm');
    if (!form) return;

    function getWrap(input) {
        return input ? (input.closest('.inputWrap') || input.parentElement) : null;
    }
    function clearTextFeedback(input) {
        var wrap = getWrap(input);
        var fb = wrap && wrap.querySelector('.feedback');
        if (fb) {
            fb.textContent = '';
            fb.style.visibility = 'hidden';
            fb.style.opacity = '0';
        }
    }

    function validateField(input) {
        var v = String(input.value || '').trim();
        if (!v) {
            if (window.App && window.App.setFieldInvalid) window.App.setFieldInvalid(input);
            else { input.classList.add('invalid'); input.setAttribute('aria-invalid', 'true'); }
            clearTextFeedback(input);
            return false;
        }
        if (input.type === 'email') {
            if (!(window.App && window.App.checkEmailFormat && window.App.checkEmailFormat(v))) {
                if (window.App && window.App.setFieldInvalid) window.App.setFieldInvalid(input);
                else { input.classList.add('invalid'); input.setAttribute('aria-invalid', 'true'); }
                clearTextFeedback(input);
                return false;
            }
        }
        if (input.name === 'confirmPassword') {
            var pwd = form.querySelector('input[name="password"]');
            if (pwd && pwd.value !== input.value) {
                if (window.App && window.App.setFieldInvalid) window.App.setFieldInvalid(input);
                else { input.classList.add('invalid'); input.setAttribute('aria-invalid', 'true'); }
                clearTextFeedback(input);
                return false;
            }
        }
        if (window.App && window.App.setFieldValid) window.App.setFieldValid(input);
        else { input.classList.remove('invalid'); input.classList.add('valid'); input.setAttribute('aria-invalid', 'false'); }
        clearTextFeedback(input);
        return true;
    }

    Array.from(form.querySelectorAll('input[required]')).forEach(function (input) {
        input.addEventListener('input', function () {
            if (input.value.trim() === '') {
                if (window.App && window.App.setFieldInvalid) window.App.setFieldInvalid(input);
                else { input.classList.add('invalid'); input.setAttribute('aria-invalid', 'true'); }
                clearTextFeedback(input);
                return;
            }
            validateField(input);
        });
        input.addEventListener('blur', function () {
            validateField(input);
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var requiredInputs = Array.from(form.querySelectorAll('input[required]'));
        var allOk = requiredInputs.map(validateField).every(Boolean);
        if (!allOk) return;
        var data = {};
        Array.from(form.querySelectorAll('input')).forEach(function (i) {
            if (i.type === 'button' || i.type === 'submit') return;
            var key = i.name || i.id || ('field_' + Math.random().toString(36).slice(2, 7));
            data[key] = i.value;
        });
        console.log(data);
    });
});
