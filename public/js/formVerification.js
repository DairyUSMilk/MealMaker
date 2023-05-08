import verification from './verification.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('registration-form');
  const ingredientForm = document.getElementById('ingredient-form');
  const recipesForm = document.getElementById('recipes-form');

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
          const error = document.getElementById('error');

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
              error.innerText = `${e}`;
              return;
          }  
          loginForm.submit();
      })
  }

  // TODO -- Complete ingredients form verification here
  if (ingredientForm) {
    ingredientForm.addEventListener('submit', async event => {
      event.preventDefault();

      const nameInput = document.getElementById('nameInput').value;
      const flavorsInput = document.getElementById('flavorsInput').value;
      const quantityInput = document.getElementById('quantityInput').value;
      const measurementInput = document.getElementById('measurementInput').value;
      const error = document.getElementById('error');

      const flavorsInputArray = flavorsInput.split(',').map(s => s.trim());
      try {
        verification.checkOnlyWordsString(nameInput, "ingredient name");
        verification.checkOnlyWordsStringArray(flavorsInputArray, "ingredient flavors");
        verification.checkNumber(Number(quantityInput), "ingredient quantity");
        if(Number.isNaN(document.ingredientForm.quantityInput.value)) throw 'Error: ingredient quantity must be a number!';
        verification.checkOnlyWordsString(measurementInput, "ingredient measurement");
      }
      catch (e) {
        error.innerText = `${e}`;
        return;
      }
      
      ingredientForm.submit();
    })
  }

  if (recipesForm) {
    recipesForm.addEventListener('submit', async event => {
      event.preventDefault();
      
      const nameInput = document.getElementById('nameInput').value;
      const flavorsInput = document.getElementById('flavorsInput').value;
      const imageInput = document.getElementById('imageInput');
      const ingredientsInput = document.getElementById('ingredientsInput').value;
      const instructionsInput = document.getElementById('instructionsInput').value;
      const servingsInput = document.getElementById('servingsInput').value;
      const readyInput = document.getElementById('readyInput').value;
      const sourceInput = document.getElementById('sourceInput').value;
      const error = document.getElementById('error');

      const flavorsInputArray = flavorsInput.split(',').map(s => s.trim());
      const ingredientsInputArray = ingredientsInput.split(',').map(s => s.trim());
      const instructionsInputArray = instructionsInput.split(',').map(s => s.trim());

      if (!imageInput.files || imageInput.files.length === 0) {
        error.innerText = 'An image is required';
        return;
      }

      if (!sourceInput || !verification.checkURL(sourceInput)) {
        error.innerText = 'A valid source URL is required';
        return;
      }

      try {
        verification.checkOnlyWordsString(nameInput);
        verification.checkOnlyWordsStringArray(flavorsInputArray);
        verification.checkNumber(servingsInput);
        verification.checkStringArray(ingredientsInputArray);
        verification.checkOnlyWordsStringArray(instructionsInputArray);
        verification.checkNumber(readyInput);
      } catch (e) {
        error.innerText = `${e}`;
        return;
      }
      recipesForm.submit();
    })
  }
});

// TODO -- Add comments verification here