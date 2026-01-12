if (!document.documentElement.dataset.showPasswordInit) {
    document.documentElement.dataset.showPasswordInit = '1';

    document.querySelectorAll('.togglePassword').forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.showPassword');
            if (!container) return;

            const input = container.querySelector('input[type="password"], input[type="text"]');
            if (!input) return;

            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';

            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye', isHidden);
                icon.classList.toggle('fa-eye-low-vision', !isHidden);
            }

            btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
        });
    });
}