import verification from './verification.js';

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
            verification.checkName(firstNameInput, 'first name');
            verification.checkName(lastNameInput, 'last name');
            verification.checkUsername(usernameInput, 'username');
            verification.checkEmail(emailAddressInput, 'email address');
            verification.checkPassword(passwordInput, 'password');
            verification.checkPasswordMatch(passwordInput, confirmPasswordInput);
          } catch (e) {
            error.innerText = `Client side: ${e}`;
            return;
          }        
          registerForm.submit();
      })
  }
  
  if (loginForm) {
      loginForm.addEventListener('submit', async event => {
        console.log("CLIENT SIDE");
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

            verification.checkPassword(passwordInput, 'password');
            
            if(verification.isEmail(emailOrUserInput)) {
              verification.checkEmail(emailOrUserInput, 'email address');
            } else {
              verification.checkUsername(emailOrUserInput, 'username')
            }
          } catch (e) {
              errorMessage.innerText = `Client side: ${e}`;
          }  
          loginForm.submit();
      })
  }
});

// TODO -- Add ingredients, recipes, comments, verification here
// Import from verification.js -- Module imports break