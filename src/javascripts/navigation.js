import { debounce } from './utils';

const Navigation = (function () {
    'use strict';
    const _prefix = `data-navigation`;
    const _control = `${_prefix}-control`;
    const _nav = `${_prefix}-nav`;
    const _action = `${_prefix}-action`;

    let initialTop = window.scrollY;

    const init = function () {
        const elements = document.querySelectorAll(`[${_control}]`);
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            const id = element.getAttribute(_control);
            const cls = 'show';
            const target = document.getElementById(id);
            const controls = document.querySelectorAll(`[${_control}=${id}]`);
            const navs = document.querySelectorAll(`[${_nav}=${id}]`);
            const actions = document.querySelectorAll(`[${_action}=${id}]`);

            element.addEventListener('click', (e) => {
                e.preventDefault();
                const is = target.classList.contains(cls);
                const act = is ? 'remove' : 'add';
                document.body.style.overflow = is ? '' : 'hidden';
                e.target.setAttribute('aria-expanded', !is);
                [...navs, ...actions].forEach((s) => {
                    const attr = [
                        'aria-hidden',
                        'aria-visibility',
                        'aria-expanded',
                    ];
                    attr.forEach((a) => s.setAttribute(a, !is));
                    s.setAttribute('tabindex', +is * -1);
                });
                controls.forEach((s) => s.classList[act](cls));
                target.classList[act](cls);
            });

            [...navs].forEach((nav) => {
                nav.querySelectorAll('[href^="#"]').forEach((anchor) => {
                    anchor.addEventListener('click', (e) => {
                        e.preventDefault();
                        const { target } = e;
                        const href = target.getAttribute('href').slice(1);
                        const section = document.getElementById(href);
                        nav.querySelectorAll('li').forEach((list) =>
                            list.classList.remove('active')
                        );
                        target.parentElement.classList.add('active');
                        section?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    });
                });
            });

            window.addEventListener(
                'scroll',
                debounce((e) => {
                    const position = document.body.getBoundingClientRect();
                    const { y } = position;
                    const down = y < initialTop;
                    target.classList[y < -90 ? 'add' : 'remove']('float');
                    target.classList[down ? 'add' : 'remove']('hide');
                    initialTop = y;
                })
            );
        }
    };
    return {
        init,
    };
})();

document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    Navigation.init();
});
