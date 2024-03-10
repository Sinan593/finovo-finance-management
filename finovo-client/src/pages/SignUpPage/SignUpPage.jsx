import "./SignUpPage.css";
import WhiteNavbar from "../../components/WhiteNavbar/WhiteNavbar";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("Success");
        setLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response.data.error.message);
    }
  };

  return (
    <div className="register-container flex flex-row h-screen">
      <div className="register-left basis-1/2 flex justify-center items-center">
        <div className="hero text-white p-32 text-5xl">
          <h1>
            See It All, Manage It All. Finance Made
            <strong> Easy.</strong>
          </h1>
        </div>
      </div>
      <div className="register-right basis-1/2">
        <WhiteNavbar />

        <div className="register-inner-container flex flex-col pl-32 pr-32 p-16">
          <h1 className="text-2xl font-semibold">Let's get started!</h1>
          <span className="fullname grid grid-flow-col gap-2">
            <InputField
              labelText="First Name: "
              inputId="firstname"
              type="text"
              placeholder="Mohammad"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              labelText="Last Name: "
              inputId="lastname"
              type="text"
              placeholder="Hisham"
              onChange={(e) => setLastName(e.target.value)}
            />
          </span>
          <InputField
            labelText="Email: "
            inputId="email"
            type="email"
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
              buttonText="Cha-ching!"
              buttonColor="#7065f0"
              textColor="white"
              onClick={handleRegister}
            />
          ) : (
            <LoadingButton
              buttonText="Loading..."
              buttonColor="#7065f0"
              textColor="white"
            />
          )}

          {/* <Button
            buttonText="Cha-ching!"
            buttonColor="#7065f0"
            textColor="white"
            onClick={handleRegister}
          />

          <LoadingButton
            buttonText="Cha-ching!"
            buttonColor="#7065f0"
            textColor="white"
          /> */}
        </div>
      </div>
    </div>
  );
}
