(() => {
    const email = document.querySelector('input[name=email]'),
        password = document.querySelector('input[name=password]'),
        submitButton = document.querySelector('button[type=submit]'),
        fieldsExists = !!(email && password && submitButton);

        if(fieldsExists) {
          chrome.storage.local.get(['auth'], (response) => {
            const authData = response.auth;

            if(!authData) {
               submitButton.addEventListener('click', () => {
                 const data = {
                    email: email.value,
                    password: password.value
                  };

                  setTimeout(() => {
                    const alertText = document.querySelector('.popup p');

                    if (alertText && alertText.innerText === 'Вы успешно авторизовались') {
                      chrome.storage.local.set({ auth: data }, () => {
                        console.log('[TODO logger] User data have been set: ', data);
                      });
                    }
                  }, 1000);
               })
             } else {
               email.value = authData.email;
               password.value = authData.password;
               submitButton.click();
             }
          });
        }
})();
