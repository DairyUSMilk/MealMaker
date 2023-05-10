import verification from './verification.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('registration-form');
  const ingredientForm = document.getElementById('ingredient-form');
  const recipesForm = document.getElementById('recipes-form');
  const filterForm = document.getElementById('filter-form');
  const commentForm = document.getElementById('comment-form');

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
          console.log(`error element: ${error}`);

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

          console.log(emailOrUserInput);
          console.log(passwordInput);
          if (emailOrUserInput === "" || passwordInput === "") {
            error.innerText = 'Both email address or username, and a password are required';
            return;
          }
      
          // try {
          //   if(typeof(emailOrUserInput) !== 'string') throw 'Error: email or user must be a string!';

          //   verification.checkPassword(passwordInput, 'password');
            
          //   if(verification.isEmail(emailOrUserInput)) {
          //     verification.checkEmail(emailOrUserInput, 'email address');
          //   } else {
          //     verification.checkUsername(emailOrUserInput, 'username')
          //   }
          // } catch (e) {
          //     error.innerText = `${e}`;
          //     return;
          // }  
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
      try {
        const nameInput = document.getElementById('nameInput').value;
        const flavorsInput = document.getElementById('flavorsInput').value;
        const ingredientsInput = document.getElementById('ingredientsInput').value;
        const instructionsInput = document.getElementById('instructionsInput').value;
        const servingsInput = document.getElementById('servingsInput').value;
        const readyInput = document.getElementById('readyInput').value;
        let certifiedInput = document.getElementById('certifiedInput')
        if (certifiedInput) {
          certifiedInput = certifiedInput.checked; 
        } else {  
          certifiedInput = false;
        }
        const error = document.getElementById('error');

        if(typeof flavorsInput !== 'string') throw 'Error: flavors must be a string!';
        if(typeof ingredientsInput !== 'string') throw 'Error: ingredients must be a string!';
        if(typeof instructionsInput !== 'string') throw 'Error: instructions must be a string!';
        

        const flavorsInputArray = flavorsInput.split(',').map(s => s.trim());

        const ingredientsInputArray = ingredientsInput.split(',').map(s => s.trim());

        const instructionsInputArray = instructionsInput.split(',').map(s => s.trim());

        verification.checkOnlyWordsString(nameInput, "recipe name");
        verification.checkOnlyWordsStringArray(flavorsInputArray, "recipe flavors");
        verification.checkNumber(Number(servingsInput), "recipe servings");
        verification.checkStringArray(ingredientsInputArray, "recipe ingredients");
        verification.checkOnlyWordsStringArray(instructionsInputArray, "recipe instructions");
        verification.checkNumber(Number(readyInput), "recipe ready in");
        if(certifiedInput !== true && certifiedInput !== false) throw 'Error: certified must be a boolean!';
      } catch (e) {
        error.innerText = `${e}`;
        return;
      }
      recipesForm.submit();
    })
  }

  if (filterForm) {
    filterForm.addEventListener('submit', async event => {
      event.preventDefault();
      
      const nameInput = document.getElementById('nameInput').value;
      const flavorsInput = document.getElementById('flavorsInput').value;
      const ingredientsInput = document.getElementById('ingredientsInput').value;
      const readyInput = document.getElementById('readyInput').value;
      const certifiedInput = document.getElementById('certifiedInput').checked;
      const usernameInput = document.getElementById('usernameInput').value;
      const minMatchPercentage = document.getElementById('minMatchPercentageInput').value;
      const error = document.getElementById('error');

      if(typeof flavorsInput !== 'string') throw 'Error: flavors must be a string!';
      if(typeof ingredientsInput !== 'string') throw 'Error: ingredients must be a string!';
      
      const flavorsInputArray = flavorsInput.split(',').map(s => s.trim());
      const ingredientsInputArray = ingredientsInput.split(',').map(s => s.trim());
      
      try {
        if(nameInput !== '') verification.checkOnlyWordsString(nameInput, "recipe name");
        if(flavorsInput !== '') verification.checkOnlyWordsStringArray(flavorsInputArray, "recipe flavors");
        if(ingredientsInput !== '') verification.checkStringArray(ingredientsInputArray, "recipe ingredients");
        if(readyInput !== '') verification.checkNumber(Number(readyInput), "recipe ready in");
        if(minMatchPercentage !== '') verification.checkNumber(Number(minMatchPercentage), "min match percentage");
        if(certifiedInput !== true && certifiedInput !== false) throw 'Error: certified must be a boolean!'; 
        if(usernameInput !== '') verification.checkUsername(usernameInput, "username");
      } catch (e) {
        error.innerText = `${e}`;
        return;
      }
      filterForm.submit();
    })
  }

  if(commentForm){
    commentForm.addEventListener('submit', async event => {
      event.preventDefault();
      const input = document.getElementById("commentInput").value;
      const error = document.getElementById("error");
      if (typeof input !== 'string' || input.trim().length === 0) throw "Error: comment must be a non-empty string";

      try{
        if(input !== '') verification.checkString(input, "comment");
      } catch(e){
        error.innerText = `${e}`;
        return;
      }
      commentForm.submit();
    })
  }
});

// TODO -- Add comments verification here