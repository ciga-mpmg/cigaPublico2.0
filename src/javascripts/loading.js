const add = () => {
    document.body.classList.add('loading');
    document.body.innerHTML =
        `
        <div class="loading-wrapper" id="loading-wrapper">
            <div class="loading-content">
                <div class="loading-anime"><span></span></div>
                <div class="loading-text">
                    <h2>Por favor, aguarde</h2>
                    <p>Você será redirecionado em breve</p>
                </div>
            </div>
        </div>
    ` + document.body.innerHTML;
};

const remove = () => {
    setTimeout(() => {
        document.body.classList.add('disappearing');
    }, 300);
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.remove('disappearing');
        document.getElementById('loading-wrapper').remove();
    }, 400);
};

const loading = {
    add,
    remove,
};

document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    add();
});

document.addEventListener('readystatechange', () => {
    'use strict';
    remove();
});

export default loading;
