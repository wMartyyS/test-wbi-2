
document.addEventListener('DOMContentLoaded', function () {
    if (document.documentElement.dataset.showPasswordInit) return;
    document.documentElement.dataset.showPasswordInit = '1';

    document.querySelectorAll('.togglePassword').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var container = btn.closest('.control') || btn.closest('.inputWrap') || btn.closest('.showPassword');
            if (!container) return;

            var input = container.querySelector('input[type="password"], input[type="text"]');
            if (!input) return;

            var isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';

            var icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-eye', 'fa-eye-low-vision', 'fa-eye-slash');
                icon.classList.add(isHidden ? 'fa-eye-low-vision' : 'fa-eye');
                if (!icon.classList.contains('fa-solid')) icon.classList.add('fa-solid');
            }

            btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
        });
    });
});
