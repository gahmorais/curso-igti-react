const moneyFormatter = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",
});

export default function Money({ children: value, positive = true }) {
  const colorClassName = positive ? "text-green-700" : "text-red-700";
  return (
    <span className={`${colorClassName} font-semibold`}>
      {moneyFormatter.format(value)}
    </span>
  );
}
