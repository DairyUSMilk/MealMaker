import {ObjectId} from "mongodb";

const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0) throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkOnlyWordsString(strVal, varName) {
    strVal = this.checkString(strVal, varName);
    if(strVal.match(/^[a-zA-Z ]+$/) === null) throw `Error: ${varName} must only contain letters and spaces`;
    return strVal;
  },

  checkName(strVal, varName) {
    strVal = this.checkString(strVal, varName);
    if (strVal.length > 26 || strVal.length < 2) throw `Error: ${varName} must be between 2 to 25 characters long`;
    if (strVal.contains(' ')) throw `Error: ${varName} cannot contain spaces`;
    if (strVal.match(/^[0-9]+$/) != null) throw `Error: ${varName} cannot contain numbers`;
    return strVal;
  },

  checkEmail(email, varName) {
    email = this.checkString(email, varName);
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(emailRegex) === null) throw `Error: ${varName} must be a valid email address`;
    if (email.split(email.length() - 4) !== '.com') throw `Error: ${varName} must be a valid .edu email address`;
    email = email.toLowerCase();
    return email;
  },

  checkPassword(password, varName) {
    this.checkString(password, varName);
    //don't assign to password value b/c it might contain leading/trailing spaces
    if (password.contains(' ')) throw `Error: ${varName} cannot contain spaces`;
    if (password.length < 8) throw `Error: ${varName} must be at least 8 characters long`;
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\];:'"<>,.?/|]).+$/;
    if (password.match(passwordRegex) === null) throw `Error: ${varName} must contain at least one uppercase letter, one lowercase letter, one number, and one special character`;
    return password;
  },

  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
  },

  checkNumber(num, varName) {
    if (!num) throw `Error: You must provide a ${varName}`;
    if (typeof num !== 'number') throw `Error:${varName} must be a number`;
    if (isNaN(num)) throw `Error: ${varName} must be a number`;
    return num;
  }
};

export default exportedMethods;