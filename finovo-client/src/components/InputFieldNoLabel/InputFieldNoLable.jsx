export default function InputFieldNoLabel({ inputText, ...props }) {
  return (
    <input
      className="bg-white h-10 p-2 border-2 border-gray-200 hover:border-purple-500 rounded-xl min-w-[50px] max-w-[180px] w-auto"
      id={inputText}
      value={inputText}
      type="text"
      readOnly
      {...props}
    />
  );
}
