"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const AboutUs = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>You are not logged in. Please <Link href="/login">log</Link> in to access this page.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>About us Page, Welcome, {session.user.email}!</h1>

    </div>
  );
};

export default AboutUs;
