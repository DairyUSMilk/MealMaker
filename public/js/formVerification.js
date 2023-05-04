
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('registration-form');
  
    if (registerForm) {
        registerForm.addEventListener('submit', event => {
            event.preventDefault();
    
            const firstNameInput = document.getElementById('firstNameInput').value;
            const lastNameInput = document.getElementById('lastNameInput').value;
            const usernameInput = document.getElementById('usernameInput').value;
            const emailAddressInput = document.getElementById('emailAddressInput').value;
            const passwordInput = document.getElementById('passwordInput').value;
            const confirmPasswordInput = document.getElementById('confirmPasswordInput').value;
            const error = document.getElementById('error');
        
            try {
              checkName(firstNameInput, 'first name');
              checkName(lastNameInput, 'last name');
              checkUsername(usernameInput, 'username');
              checkEmail(emailAddressInput, 'email address');
              checkPassword(passwordInput, 'password');
              checkPasswordMatch(passwordInput, confirmPasswordInput);
            } catch (e) {
              error.innerText = `${e}`;
              return;
            }
        
            registerForm.submit();
        })
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', async event => {
            event.preventDefault();
  
            const emailOrUserInput = document.getElementById('emailOrUserInput').value;
            const passwordInput = document.getElementById('passwordInput').value;
            const errorMessage = document.getElementById('error');
  
            if (!emailOrUserInput || !passwordInput) {
              error.innerText = 'Both email address or username, and a password are required';
              return;
            }
        
            try {
              if(typeof(emailOrUserInput) !== 'string') throw 'Error: email or user must be a string!';
              
              passwordInput = checkPassword(passwordInput, 'password');
              
              if(isEmail(emailOrUserInput)) {
                checkEmail(emailOrUserInput, 'email address');
              } else {
                checkUsername(emailOrUserInput, 'username')
              }
            } catch (e) {
                errorMessage.innerText = `${e}`;
            }
  
            loginForm.submit();
        })
    }
  });

  // TODO -- Add ingredients, recipes, comments, verification here
  // Import from verification.js -- Module imports break