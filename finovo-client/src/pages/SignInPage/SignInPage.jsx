import WhiteNavbar from "../../components/WhiteNavbar/WhiteNavbar";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import "./SignInPage.css";
import AuthContext from "../../contexts/AuthContext";

export default function SignInPage() {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        setLoading(false);
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="container font-body flex flex-row h-screen w-screen">
      <div className="login-right basis-1/2 flex justify-center items-center">
        <div className="hero text-white p-32 text-5xl">
          <h1>
            Wave Goodbye to Manual Work, Say Hello to{" "}
            <strong>Effortless Billing</strong>
          </h1>
        </div>
      </div>
      <div className="login-left basis-1/2">
        <WhiteNavbar />
        <div className="login-container flex flex-col pl-32 pr-32 p-16">
          <h1 className="text-2xl font-semibold">Welcome back!</h1>
          <p className="text-md text-gray-500 mb-4">
            Welcome back! Please enter your details.
          </p>

          <InputField
            labelText="Username: "
            inputId="username"
            type="text"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            labelText="Password: "
            inputId="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLoading ? (
            <Button
              buttonText="Login"
              textColor="white"
              buttonColor="#7065f0"
              hoverColor="#7b76ff"
              onClick={handleLogin}
            />
          ) : (
            <LoadingButton
              buttonText="Loading..."
              buttonColor="#7065f0"
              textColor="white"
            />
          )}

          <p className="text-center">
            Don't have an account?{" "}
            <Link className="font-bold" to="/register">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
