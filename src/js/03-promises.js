import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('.form');

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                // Resolve case
                resolve({ position: position, delay: delay });
            } else {
                // Reject case
                reject({ position: position, delay: delay });
            }
        }, delay);
    })
    return promise;
}

function onSubmit(e) {
    e.preventDefault();
    let delay = Number(e.target.elements['delay'].value);
    const step = Number(e.target.elements['step'].value);
    const amount = Number(e.target.elements['amount'].value);

    for (let i = 1; i <= amount; i++) {
        delay += i > 1 ? step : 0;
        createPromise(i, delay)
            .then(({ position, delay }) => {
                Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
                console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
                console.log(`❌ Rejected promise ${position} in ${delay}ms`);
            });

    }
}

formRef.addEventListener('submit', (e) => { onSubmit(e) });