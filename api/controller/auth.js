import { db1 } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, auth, provider } from "../firebase-config.js";
import {
  getDocs,
  addDoc,
  collection,
  where,
  query,
  doc,
} from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { Password } from "@mui/icons-material";
import { useState } from "react";

const dbref = collection(db, "Auth");
const cookies = new Cookies();

export const register = async (req, res) => {
  const findUsername = query(dbref, where("Username", "==", req.body.userName));

  const snapshot = await getDocs(findUsername);
  const usernameFoundArray = snapshot.docs.map((doc) => doc.data);

  if (usernameFoundArray.length > 0) {
    // alert("Username already exists");
    return res.status(500).json("Username exists.");
  } else {
    const findEmail = query(dbref, where("Email", "==", req.body.email));

    const snapshot = await getDocs(findEmail);
    const emailFoundArray = snapshot.docs.map((doc) => doc.data);

    if (emailFoundArray.length > 0) {
      // alert("Email already exists");
      return res.status(501).json("Email exists.");
    } else {
      await addDoc(dbref, {
        Name: req.body.fullName,
        Username: req.body.userName,
        Email: req.body.email,
        Password: req.body.password,
      });
      return res.status(200).json("User has been created.");
    }
  }
};

export const login = async (req, res) => {
  const emailMatch = query(dbref, where("Username", "==", req.body.userName));
  const emailSnapshot = await getDocs(emailMatch);
  const emailArray = emailSnapshot.docs.map((doc) => doc.data());
  const passwordMatch = query(
    dbref,
    where("Password", "==", req.body.password)
  );
  const passwordSnapshot = await getDocs(passwordMatch);
  const passwordArray = passwordSnapshot.docs.map((doc) => doc.data());

  if (emailArray.length > 0 && passwordArray.length > 0) {
    return res.status(200).json("Login successful.");
  } else {
    return res.status(501).json("Wrong email or password.");
  }
};

export const Auth = async () => {
  // const signInWithGoogle = async () => {
  //   try {
  const result = await signInWithPopup(auth, provider);
  cookies.set("auth-token", result.user.refreshToken);
  setIsAuth(true);
  return "success";
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // return (
  //   <div className="auth">
  //     <p> Sign In With Google To Continue </p>
  //     <button onClick={signInWithGoogle}> Sign In With Google </button>
  //   </div>
  // );
};

// mysql
// export const register1 = (req, res) => {
//   //CHECK USER IF EXISTS

//   const q = "SELECT * FROM user WHERE username = ?";

//   db.query(q, [req.body.userName], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length) return res.status(409).json("User already exists!");
//     //CREATE A NEW USER
//     //Hash the password
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(req.body.password, salt);

//     const q =
//       "INSERT INTO user (`fullname`,`username`,`email`,`password`) VALUE (?)";

//     const values = [
//       req.body.fullName,
//       req.body.userName,
//       req.body.email,
//       // hashedPassword,
//       req.body.password,
//     ];

//     db.query(q, [values], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("User has been created.");
//     });
//   });
// };

// export const login = (req, res) => {
//   const q = "SELECT * FROM user WHERE username = ?";

//   db.query(q, [req.body.userName], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length === 0) return res.status(404).json("User not found!");

//     const checkPassword = bcrypt.compareSync(
//       req.body.password,
//       data[0].password
//     );

//     if (!req.body.password)
//       return res.status(400).json("Wrong password or username!");

//     const token = jwt.sign({ id: data[0].id }, "secretkey");

//     const { password, ...others } = data[0];

//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json(others);
//   });
// };

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
