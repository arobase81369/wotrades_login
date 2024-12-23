"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const HomePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>You are not logged in. Please <Link href="/login">log</Link> in to access this page.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {session.user.email}!</h1>
      <p>You are successfully logged in.</p>
      <p>Your User ID is: {session.user.userId}</p>
      <button onClick={() => signOut()}>Logout</button>
      <Link href="aboutus">About us</Link>
    </div>
  );
};

export default HomePage;
