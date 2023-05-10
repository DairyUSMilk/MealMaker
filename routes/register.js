import { usersData } from "../data/index.js";
import express from "express";
import verification from "../public/js/verification.js";

const router = express.Router();

router
  .get("/", async (req, res) => {
    res.status(200).render("register", { title: "Register" });
  })
  .post("/", async (req, res) => {
    let {
      firstNameInput,
      lastNameInput,
      usernameInput,
      emailAddressInput,
      passwordInput,
      confirmPasswordInput,
      roleInput,
      showUsernameInput,
    } = req.body;

    try {
      firstNameInput = verification.checkName(firstNameInput, "first name");
      lastNameInput = verification.checkName(lastNameInput, "last name");
      usernameInput = verification.checkUsername(usernameInput, "username");
      emailAddressInput = verification.checkEmail(emailAddressInput, "email");
      passwordInput = verification.checkPassword(passwordInput, "password");
      roleInput = verification.checkRole(roleInput, "role");
      verification.checkPasswordMatch(passwordInput, confirmPasswordInput);
    } catch (e) {
      res.status(400).render("register", { title: "Register", error: e });
    }

    try {
      const newUser = await usersData.createUser(
        firstNameInput,
        lastNameInput,
        usernameInput,
        emailAddressInput,
        passwordInput,
        roleInput,
        showUsernameInput
      );
      console.log(JSON.stringify(newUser));
      if (newUser.insertInfo !== 0) {
        return res.status(200).redirect("/login");
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
