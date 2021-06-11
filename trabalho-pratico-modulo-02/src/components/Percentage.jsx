export default function Percentage({ children: value }) {
  const formattedPercentage = value.toFixed(2) + "%";
  const colorClassName = value >= 0 ? "text-green-700" : "text-red-700";
  return (
    <span className={`${colorClassName} font-semibold`}>
      {value > 0 ? `+${formattedPercentage}` : formattedPercentage}
    </span>
  );
}
