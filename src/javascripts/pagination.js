import { Tooltip } from 'bootstrap';

const Pagination = (function () {
    'use strict';

    const constr = (current, pages) => {
        const isMedium = window.innerWidth < 800;
        const isSmall = window.innerWidth < 600;
        const difference = isMedium ? 2 : 2;
        const minLength = isMedium ? 3 : 5;
        const minimum = isMedium ? 5 : 7;
        const initial =
            current - 1 <= difference
                ? Array.from({ length: minLength }, (_, i) => i + 1)
                : [1];
        const final =
            pages - current <= difference
                ? Array.from({ length: minLength })
                      .fill(pages)
                      .map((i, n) => i - n)
                      .sort((a, b) => a - b)
                : [pages];
        const middle = () => {
            const mid =
                current - 1 > difference && pages - current > difference;
            if (isMedium && mid) {
                return ['...', current, '...'];
            } else if (!isMedium && mid) {
                return ['...', current - 1, current, current + 1, '...'];
            } else {
                return ['...'];
            }
        };
        const result = isSmall
            ? [current, '...']
            : pages < minimum
            ? Array.from({ length: pages }, (_, i) => i + 1)
            : [...initial, ...middle(), ...final];
        return result;
    };

    const template = (pages, currentPage, views, currentView, total, limit) => {
        const set = Array.from({ length: limit }, (_, i) => i + 1);
        return `
        <div class="pagination">
            <div class="pagination-view">
                <span class="pagination-view-select">
                    Mostrar
                    <select pagination-view-select class="form-select form-select-sm w-auto" name="view" id="view">
                        ${views.map((option) => {
                            return `
                                    <option
                                        value="${option}"
                                        ${
                                            currentView === option
                                                ? 'selected'
                                                : ''
                                        }
                                    >${option}</option>
                                `;
                        })}
                    </select>
                    Resultados
                </span>
                <span class="pagination-view-display">
                    Mostrando de
                    ${
                        pages.at(-1) === currentPage
                            ? currentView * currentPage - currentView
                            : currentView * currentPage - currentView + 1
                    }
                    a
                    ${
                        pages.at(-1) === currentPage
                            ? total
                            : currentView * currentPage
                    }
                    de ${total} entradas
                </span>
            </div>
            <div class="pagination-page">
                <button class="button button-small button-light pagination-page-previous"
                    ${currentPage === 1 ? 'disabled' : ''}>
                    <span class="ds-icon-chevron-left"></span>
                </button>
                ${pages
                    .map((page) => {
                        return page > 0
                            ? `
                            <button pagination-page class="button button-small button-icon button-light pagination-page-${page}
                                    ${currentPage === page ? 'active' : ''}"
                                    arial-label="Click para selecionar a página ${page}"
                            >
                                ${page}
                            </button>`
                            : `
                                <select pagination-page-set class="button button-small button-icon button-light pagination-page-set" name="set" id="set"
                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Click para selecionar uma página">
                                    <option value="" hidden>...</option>
                                    ${set.map((option) => {
                                        return `<option value="${option}">${option}</option>`;
                                    })}
                                </select>
                            `;
                    })
                    .join(' ')}
                <button class="button button-small button-light pagination-page-next"
                    ${pages.at(-1) === currentPage ? 'disabled' : ''}>
                    <span class="ds-icon-chevron-right"></span>
                </button>
            </div>
        </div>
        `;
    };

    const debounce = (func) => {
        let timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, 100, event);
        };
    };

    const init = function () {
        const elements = document.querySelectorAll(`[pagination]`);
        elements.forEach((element) => {
            const tooltipShowList =
                document.querySelectorAll('[role="tooltip"]');
            tooltipShowList.forEach((tooltip) => tooltip.remove());

            const currentPage = +element.getAttribute('currentPage');
            const currentView = +element.getAttribute('currentView');
            const total = +element.getAttribute('total');
            const pages = Math.ceil(total / currentView) | 1;
            const views = element
                .getAttribute('views')
                .split(',')
                .map((v) => +v.trim());

            element.innerHTML = template(
                constr(currentPage, pages),
                currentPage,
                views,
                currentView,
                total,
                pages
            );

            const select = element.querySelector(`[pagination-view-select]`);
            const buttons = element.querySelectorAll(`[pagination-page]`);
            const previous = element.querySelector(`.pagination-page-previous`);
            const next = element.querySelector(`.pagination-page-next`);
            const sets = element.querySelectorAll(`[pagination-page-set]`);

            buttons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    if (button.classList.contains('active')) return;
                    const current = button.innerText;
                    element.setAttribute('currentPage', current);
                    init();
                });
            });
            previous.addEventListener('click', (event) => {
                if (currentPage === 1) return;
                element.setAttribute('currentPage', currentPage - 1);
                init();
            });
            next.addEventListener('click', (event) => {
                if (currentPage === pages) return;
                element.setAttribute('currentPage', currentPage + 1);
                init();
            });
            select.addEventListener('change', (event) => {
                element.setAttribute('currentView', event.target.value);
                init();
            });
            sets.forEach((set) => {
                set.addEventListener('change', (event) => {
                    console.log(event.target.value);
                    element.setAttribute('currentPage', event.target.value);
                    init();
                });
            });

            const tooltipTriggerList = document.querySelectorAll(
                '[data-bs-toggle="tooltip"]'
            );

            [...tooltipTriggerList].map(
                (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
            );
        });
    };

    window.addEventListener(
        'resize',
        debounce(function (e) {
            console.log('resize');
            init();
        })
    );

    return {
        init,
    };
})();
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    Pagination.init();
});
