"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [genotp, setGenotp] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false); // New state for OTP visibility
  const { status } = useSession();
  const router = useRouter();

  const generateOtp = async () => {
    console.log("nextauthkey");
    console.log(process.env.NEXTAUTH_SECRET);

    try {
      // Call the external API to verify the user
      const res = await fetch(
        `https://wotrades.com/API/items/allusers/read?phone=${phone}`
      );

      if (!res.ok) {
        alert("No records found");
        return;
      }

      const user = await res.json();
      console.log(user);

      // Simulate OTP generation
      setGenotp("123456");
      setIsOtpVisible(true); // Show the OTP field
    } catch (error) {
      console.error("Error generating OTP:", error);
      alert("Failed to generate OTP. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (otp === genotp) {
      const result = await signIn("credentials", {
        redirect: false,
        phone,
        otp,
      });

      if (result?.ok) {
        router.push("/"); // Redirect to home page after login
      } else {
        alert("Invalid phone or OTP");
      }
    } else {
      alert("Invalid OTP");
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
          <label htmlFor="phone">Phone:</label>
          <br />
          <input
            id="phone"
            type="text"
            value={phone}
            style={{ border: "1px solid grey" }}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Generate OTP Button */}
        {!isOtpVisible && (
          <button type="button" onClick={generateOtp}>
            Send OTP
          </button>
        )}

        {/* OTP Section */}
        {isOtpVisible && (
          <div>
            <label htmlFor="otp">OTP:</label>
            <br />
            <input
              id="otp"
              type="text"
              
              value={otp}
              style={{ border: "1px solid grey" }}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <br />
            <button type="submit">Login</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
