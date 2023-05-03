
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
    
            let missingFields = [];
  
            if (!firstNameInput) missingFields.push('First Name');
            if (!lastNameInput) missingFields.push('Last Name');
            if (!usernameInput) missingFields.push('Username');
            if (!emailAddressInput) missingFields.push('Email Address');
            if (!passwordInput) missingFields.push('Password');
            if (!confirmPasswordInput) missingFields.push('Confirm Password');
  
            if (missingFields.length > 0) {
                error.innerText = `Missing fields: ${missingFields.join(', ')}`;
                return;
            }
  
            firstNameInput = firstNameInput.trim();
            lastNameInput = lastNameInput.trim();
            usernameInput = usernameInput.trim();
            emailAddressInput = emailAddressInput.trim();
            passwordInput = passwordInput.trim();
            confirmPasswordInput = confirmPasswordInput.trim();
        
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
        
            emailOrUserInput = emailOrUserInput.trim();
            passwordInput = passwordInput.trim();
        
            try {
              if(typeof(emailOrUserInput) !== 'string') throw 'Error: email or user must be a string!';
              
              password = verification.checkPassword(passwordInput, 'password');
              
              if(verification.isEmail(emailOrUserInput)) {
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