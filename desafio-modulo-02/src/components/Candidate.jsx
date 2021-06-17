import { toBrazilianStandard } from "../utils/formatNumber";

export default function Candidate({ children: candidate }) {
  const { name, elected, votesPercentage, votes } = candidate;
  const isElected = elected === "Eleito" ? "text-green-700" : "text-red-700";
  return (
    <div className="w-64 h-56 p-2 rounded-lg border text-center items-center flex flex-col justify-between m-1 shadow-lg">
      <div className="flex justify-center items-center space-x-4">
        <img
          className="w-20 h-20 rounded-full"
          src={`img/${candidate.name}.png`}
          alt=""
        />
        <div>
          <p>{toBrazilianStandard(votes)} votos</p>
          <p className={`${isElected} font-semibold`}>{votesPercentage}%</p>
        </div>
      </div>
      <p className="text-xl font-semibold">{name}</p>
      <p className={`${isElected} text-lg font-semibold`}>{elected}</p>
    </div>
  );
}
