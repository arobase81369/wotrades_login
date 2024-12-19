import Link from "next/link";

export default function AuthErrorPage({ searchParams }) {
    const error = searchParams?.error || "Unknown error";
  
    return (
      <div>
        <h1>Authentication Error</h1>
        <p>{error}</p>
        <Link href="/">Go Back to Home</Link>
      </div>
    );
  }
  