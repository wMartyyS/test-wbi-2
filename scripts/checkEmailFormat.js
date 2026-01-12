window.App = window.App || {};

(function (App) {
    var emailRegex = /^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z]{2,})+$/;

    App.checkEmailFormat = function (email) {
        if (!email && email !== '') return false;
        var s = String(email || '').trim();
        if (s === '') return false;
        return emailRegex.test(s);
    };
})(window.App);
