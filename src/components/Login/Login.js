import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { auth, provider } from "../../firebase";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();

  console.log("Login component rendering");

  const signIn = () => {
    console.log("Sign in button clicked");
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((error) => {
        console.error("Google login error:", error);
        alert(
          `Google login failed: ${error.message}\n\nThis is likely due to a Firebase configuration issue. Please ensure you have enabled Google Sign-In in your Firebase project and added 'localhost' to the authorized domains.`
        );
      });
  };
  
  const bypassLogin = () => {
    console.log("Bypassing login with demo user");
    dispatch(
      login({
        displayName: "Demo User",
        email: "demo@example.com",
        photoUrl: null,
      })
    );
  };
  
  return (
    <div className="login">
      <div className="login-container">
        <img src="new.png" alt="Login Logo" />

        <div className="login-buttons">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={signIn}
            style={{ marginBottom: '16px' }}
          >
            Login with Google
          </Button>
          
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={bypassLogin}
          >
            Continue with Demo User
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
