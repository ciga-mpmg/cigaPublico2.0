document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    document.body.classList.add('loading');
    document.body.innerHTML =
        `
        <div class="loading-wrapper" id="loading-wrapper">
            <div class="loading-content">
                <div class="loading-anime"><span></span></div>
                <div class="loading-text">
                    <p class="text-primary">Por favor, aguarde</p>
                    <p>Você será redirecionado em breve</p>
                </div>
            </div>
        </div>
    ` + document.body.innerHTML;
});

document.addEventListener('readystatechange', () => {
    'use strict';
    setTimeout(() => {
        document.body.classList.add('disappearing');
    }, 30000);

    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.remove('disappearing');
        document.getElementById('loading-wrapper').remove();
    }, 40000);
});
