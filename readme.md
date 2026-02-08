there are 4 pillars of authentication system

1. authentication : identify krna ke request kis user ke pass ke aayi hai
   ex. login request kon kr raha hai

Examples:

- Login with email & password
- Login with OTP
- Login with Google

## Basic Authentication Flow

1. User signs up
2. Password is **hashed**
3. User logs in
4. Server verifies password
5. Server issues **JWT token**

2) authorization: user kya kr sakta hai
   ex. login request karne wala user kya kya kar sakta hai

It checks **permissions / roles**.

Examples:

- Only admin can delete users
- Only logged-in user can update their profile

3. validation: data ka format check karna
   ex. user ka login input sahi format/sahi email format me hai ya nhi
   It checks **input correctness** before saving.

Examples:

- Email format valid?
- Password length >= 6?
- Required fields present?

---

## Types of Validation

1. **Frontend validation**
2. **Backend validation**
3. **Database validation (Mongoose)**

## Example: Validation using Mongoose

```jsx
email: {
type:String,
required:true,
unique:true,
match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

```

---

## Example: Validation using Express

```jsx
if (!email || !password) {
  return res.status(400).json({ message: "All fields required" });
}
```

---

## Example: Validation using express-validator

```bash
npm install express-validator

```

```jsx
const { body, validationResult } = require("express-validator");

app.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("Valid Data");
  },
);
```

4. verfication : data sahi hai ya nahi
   ex. user ka email ussi ka hai ya nhi verify karna
   
**Verification = Proving something is real or confirmed**

Usually happens **after authentication**

Examples:

- Email verification
- OTP verification
- Phone number verification

---

## Email Verification Flow

1. User registers
2. Server sends verification link
3. User clicks link
4. Account becomes verified