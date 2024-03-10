import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoadingButton({
  buttonText,
  buttonColor,
  textColor,
  hoverColor,
  ...props
}) {
  const buttonStyle = {
    backgroundColor: buttonColor,
    color: textColor,
    transition: "background-color 0.3s ease",
  };

  return (
    <>
      <button
        style={buttonStyle}
        className={`p-2 rounded-lg mb-4 mt-4 bg-${buttonColor} text-${textColor} transition-colors duration-300 hover:bg-${hoverColor}`}
        {...props}
      >
        {buttonText}
      </button>
    </>
  );
}
