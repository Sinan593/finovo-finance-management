export default function SalesCard({ label, salesAmount, timespan }) {
  return (
    <div className="sales-card rounded-xl border-2 border-gray-300 shadow-lg text-lg font-body p-4 flex flex-col items:start h-[200px] w-[200px] hover:bg-gray-100 hover:shadow-xl">
      <span className="text-gray-500 p-3">{label}</span>
      <span className="text-xl text-black font-semibold p-3">{`₹${salesAmount}`}</span>
      <span className="text-gray-500 p-3">{timespan}</span>
    </div>
  );
}
