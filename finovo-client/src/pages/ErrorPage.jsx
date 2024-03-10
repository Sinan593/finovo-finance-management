import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <h1>Error!</h1>
      <p>The page you requested was not found.</p>

      <Link to="/login">Login</Link>
    </>
  );
}
