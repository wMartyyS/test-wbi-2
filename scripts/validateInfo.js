window.App = window.App || {};

window.App.setFieldValid = function(input, message) {
    if (!input) return;
    var wrap = input.closest('.inputWrap') || input.parentElement;
    var status = wrap && wrap.querySelector('.statusIcon');
    var fb = wrap && wrap.querySelector('.feedback');
    input.classList.remove('invalid');
    input.classList.add('valid');
    input.setAttribute('aria-invalid', 'false');
    if (status) status.innerHTML = '<i class="fa-solid fa-check"></i>';
    if (fb) { fb.textContent = message || ''; fb.style.visibility = message ? 'visible' : 'hidden'; }
};

window.App.setFieldInvalid = function(input, message) {
    if (!input) return;
    var wrap = input.closest('.inputWrap') || input.parentElement;
    var status = wrap && wrap.querySelector('.statusIcon');
    var fb = wrap && wrap.querySelector('.feedback');
    input.classList.remove('valid');
    input.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
    if (status) status.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
    if (fb) { fb.textContent = message || ''; fb.style.visibility = message ? 'visible' : 'hidden'; }
};

window.App.validateInfo = function(formEl) {
    if (!formEl) return false;
    var valid = true;
    var requiredInputs = Array.from(formEl.querySelectorAll('input[required]'));
    requiredInputs.forEach(function(input) {
        var val = String(input.value || '').trim();
        if (!val) {
            window.App.setFieldInvalid(input, 'This field is required');
            valid = false;
            return;
        }
        if (input.type === 'email') {
            if (!window.App.checkEmailFormat(val)) {
                window.App.setFieldInvalid(input, 'Enter a valid email like example@domain.com');
                valid = false;
                return;
            } else {
                window.App.setFieldValid(input);
            }
        } else if (input.name === 'confirmPassword') {
            var pwd = formEl.querySelector('input[name="password"]');
            if (pwd && pwd.value !== input.value) {
                window.App.setFieldInvalid(input, 'Passwords do not match');
                valid = false;
                return;
            } else {
                window.App.setFieldValid(input);
            }
        } else {
            window.App.setFieldValid(input);
        }
    });
    return valid;
};