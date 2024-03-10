export default function SmallInputField({ labelText, inputId, ...props }) {
  return (
    <div className="mb-4 mt-4 flex flex-col">
      <label className="text-md" htmlFor={inputId}>
        {labelText}
      </label>
      <input
        className="bg-slate-100 rounded-2xl h-12 p-2 border-2 border-slate-100 hover:border-purple-500 min-w-[50px] max-w-[320px] w-auto"
        id={inputId}
        {...props}
      />
    </div>
  );
}
