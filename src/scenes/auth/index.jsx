import React from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";


const Auth = () => {
  return (
    <div>
      <SignIn path="/sign-in" routing="path" />
      <SignUp path="/sign-up" routing="path" />
    </div>
  );
};

export default Auth;