import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyD88Ro8rD948Yel6AWi7Zv0YJL39ivxg7I',
    authDomain: 'test-a1808.firebaseapp.com',
    projectId: 'test-a1808',
    storageBucket: 'test-a1808.appspot.com',
    messagingSenderId: '978260022566',
    appId: '1:978260022566:web:eba12bfe152541930d1de7',
    measurementId: 'G-5M6N8Z8RK7',
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;

const Auth = (function () {
    'use strict';
    const selector = `form[auth]`;

    const init = function () {
        const element = document.querySelector(`${selector}`);
        element.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = element.querySelector('#email');
            const password = element.querySelector('#password');

            [email, password].forEach((el) =>
                el.addEventListener('input', (e) => {
                    e.preventDefault();
                    el.classList.remove('is-invalid');
                })
            );

            auth.signInWithEmailAndPassword(email.value, password.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    email.classList.remove('is-invalid');
                    email.classList.remove('is-invalid');
                    console.log(`Usuário autenticado: ${user.email}`);
                    alert('Usuário autenticado: ${user.email}');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes('password')) {
                        password.classList.add('is-invalid');
                    }
                    if (
                        errorCode.includes('email') ||
                        errorCode.includes('not')
                    ) {
                        email.classList.add('is-invalid');
                    }
                });
        });
    };
    return {
        init,
    };
})();

document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    Auth.init();
});
