export default function Dropdown({
  products,
  selectedProduct,
  handleProductChange,
  labelText,
  inputId,
}) {
  return (
    <>
      <label className="text-md" htmlFor={inputId}>
        {labelText}
      </label>
      <select
        className="product-name block appearance-none w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        defaultValue={"default"}
        value={selectedProduct}
        onChange={handleProductChange}
      >
        <option value="default">Choose an option</option>
        {products.map((product) => {
          return <option value={product.id}>{product.name}</option>;
        })}
      </select>
    </>
  );
}
