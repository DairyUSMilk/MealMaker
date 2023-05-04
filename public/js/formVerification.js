import verification from './verification.js';

// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('login-form');
//     const registerForm = document.getElementById('registration-form');
  
//     if (registerForm) {
//         registerForm.addEventListener('submit', event => {
//             event.preventDefault();
    
//             const firstNameInput = document.getElementById('firstNameInput').value;
//             const lastNameInput = document.getElementById('lastNameInput').value;
//             const usernameInput = document.getElementById('usernameInput').value;
//             const emailAddressInput = document.getElementById('emailAddressInput').value;
//             const passwordInput = document.getElementById('passwordInput').value;
//             const confirmPasswordInput = document.getElementById('confirmPasswordInput').value;
//             const error = document.getElementById('error');
        
<<<<<<< Updated upstream
//             try {
//               checkName(firstNameInput, 'first name');
//               checkName(lastNameInput, 'last name');
//               checkUsername(usernameInput, 'username');
//               checkEmail(emailAddressInput, 'email address');
//               checkPassword(passwordInput, 'password');
//               checkPasswordMatch(passwordInput, confirmPasswordInput);
//             } catch (e) {
//               error.innerText = `${e}`;
//               return;
//             }
=======
            try {
              firstNameInput = verification.checkName(firstNameInput, 'first name');
              lastNameInput = verification.checkName(lastNameInput, 'last name');
              usernameInput = verification.checkUsername(usernameInput, 'username');
              emailAddressInput = verification.checkEmail(emailAddressInput, 'email address');
              passwordInput = verification.checkPassword(passwordInput, 'password');
              passwordInput = verification.checkPasswordMatch(passwordInput, confirmPasswordInput);
            } catch (e) {
              error.innerText = `${e}`;
              return;
            }
>>>>>>> Stashed changes
        
//             registerForm.submit();
//         })
//     }
    
//     if (loginForm) {
//         loginForm.addEventListener('submit', async event => {
//             event.preventDefault();
  
//             const emailOrUserInput = document.getElementById('emailOrUserInput').value;
//             const passwordInput = document.getElementById('passwordInput').value;
//             const errorMessage = document.getElementById('error');
  
//             if (!emailOrUserInput || !passwordInput) {
//               error.innerText = 'Both email address or username, and a password are required';
//               return;
//             }
        
//             try {
//               if(typeof(emailOrUserInput) !== 'string') throw 'Error: email or user must be a string!';
              
<<<<<<< Updated upstream
//               passwordInput = checkPassword(passwordInput, 'password');
              
//               if(isEmail(emailOrUserInput)) {
//                 checkEmail(emailOrUserInput, 'email address');
//               } else {
//                 checkUsername(emailOrUserInput, 'username')
//               }
//             } catch (e) {
//                 errorMessage.innerText = `${e}`;
//             }
=======
              passwordInput = verification.checkPassword(passwordInput, 'password');
              
              if(isEmail(emailOrUserInput)) {
                emailOrUserInput = verification.checkEmail(emailOrUserInput, 'email address');
              } else {
                emailOrUserInput = verification.checkUsername(emailOrUserInput, 'username')
              }
            } catch (e) {
                errorMessage.innerText = `${e}`;
            }
>>>>>>> Stashed changes
  
//             loginForm.submit();
//         })
//     }
//   });

//   // TODO -- Add ingredients, recipes, comments, verification here
//   // Import from verification.js -- Module imports break