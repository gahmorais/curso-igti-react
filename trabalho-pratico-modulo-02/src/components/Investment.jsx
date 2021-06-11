import Money from "../components/Money";
import Percentage from "../components/Percentage";
import { getMonths } from "../utils/date";
export default function Investment({ children: investment }) {
  const { description, reports, earning, totalPercentage } =
    investment;
  return (
    <div className="border p-2 m2">
      <div className="my-4">
        <h2 className="text-center font-semibold">{description}</h2>
        <h3 className="text-center text-sm">
          {" "}
          Rendimento Total:{" "}
          <Money positive={totalPercentage >= 0}>{earning}</Money>
          {" "}
          <Percentage>{totalPercentage}</Percentage>
        </h3>
      </div>
      <ul>
        {reports.map(({ id, year, month, value, percentage }) => (
          <li key={id} className="flex items-center justify-start space-x-8">
            <span className="font-mono">
              {`${getMonths(month - 1)}/${year}`}
            </span>
            <span className="flex-grow">
              <Money positive={percentage >= 0}>{value}</Money>
            </span>
            <span>
              <Percentage>{percentage}</Percentage>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
