import { usersData } from "../data/index.js";
import express from "express";
import verification from "../public/js/verification.js";

const router = express.Router();

router
  .get("/", async (req, res) => {
    res.render("register", { title: "Register" });
  })
  .post("/", async (req, res) => {
    let {
      firstNameInput,
      lastNameInput,
      usernameInput,
      emailAddressInput,
      passwordInput,
      confirmPasswordInput,
      showUsernameInput,
    } = req.body;
    let missingFields = [];

    //redundant -- see next comment
    if (!firstNameInput) missingFields.push("First Name");
    if (!lastNameInput) missingFields.push("Last Name");
    if (!usernameInput) missingFields.push("Username");
    if (!emailAddressInput) missingFields.push("Email Address");
    if (!passwordInput) missingFields.push("Password");
    if (!confirmPasswordInput) missingFields.push("Confirm Password");

    if (missingFields.length > 0)
      return res
        .status(400)
        .render("register", {
          title: "Register",
          error: `Missing fields: ${missingFields.join(", ")}`,
        });

    //this already checks for missing fields, and trims them
    //plus, password cannot contain spaces
    try {
      firstNameInput = verification.checkName(firstNameInput, "first name");
      lastNameInput = verification.checkName(lastNameInput, "last name");
      usernameInput = verification.checkUsername(usernameInput, "username");
      emailAddressInput = verification.checkEmail(emailAddressInput, "email");
      passwordInput = verification.checkPassword(passwordInput, "password");
      verification.checkPasswordMatch(passwordInput, confirmPasswordInput);
    } catch (e) {
      res.status(400).render("register", { title: "Register", error: e });
    }

    try {
      // TODO -- For now, default user as admin (not sure how we will allow users to become admin yet)
      
      const newUser = await usersData.createUser(
        firstNameInput,
        lastNameInput,
        usernameInput,
        emailAddressInput,
        passwordInput,
        "community",
        showUsernameInput
      );
      console.log(JSON.stringify(newUser));
      if (newUser.insertedUser) {
        return res.redirect("/login");
      } else {
        return res
          .status(500)
          .render("register", {
            title: "Register",
            error: "Failed to create user. Please try again",
          });
      }
    } catch (e) {
      res.status(500).render("register", { title: "Register", error: `${e}` });
    }
  });

export default router;
