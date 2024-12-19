"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NextAuth from "next-auth";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [genotp, setGenotp] = useState("");
  const [vwotpbtn, setVwotpbtn] = useState("");
  const [vwotpsectn, setVwotpsectn] = useState("d-none");
  const { status } = useSession();
  const router = useRouter();

  const generateotp = async () => {
console.log("nextauthkey");
 console.log(process.env.NEXTAUTH_SECRET);
    // Call the external API to verify the user
    const res = await fetch(
      `https://wotrades.com/API/items/allusers/read?phone=${phone}`
    );

    if (!res.ok) {
    //  throw new Error("Unable to fetch user details");
      alert("Not records found");
    }

    const user = await res.json();

     console.log(user);

        setGenotp("123456");
        setVwotpsectn("d-block");
        setVwotpbtn("d-none");
  }

  const handleLogin = async (e) => {
    e.preventDefault();


    if (otp == genotp) {

      const result = await signIn("credentials", {
        redirect: false,
        phone,
        otp,
      });

      if (result?.ok) {
        // Redirect to home page after login
        router.push("/");
      } else {
        alert("Invalid phone or otp" + phone);
      }
    } else {
      alert("Invalid OTP" + phone);
    }
  };

  if (status === "authenticated") {
    router.push("/"); // If already logged in, redirect to home
    return null;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          {genotp}
          <label htmlFor="phone">phone:</label><br></br>
          <input
            id="phone"
            type="text"
            value={phone}
            style={{border:"1px solid grey"}}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button className={vwotpbtn} onClick={generateotp}>Send OTP </button>
        <div className={`btn ${vwotpsectn}`}>
        <div>
          <label htmlFor="otp">OTP:</label><br></br>
          <input
            id="otp"
            type="otp"
            name="otp"
            value={otp}
            style={{border:"1px solid grey"}}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
