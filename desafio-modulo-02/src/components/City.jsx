import { toBrazilianStandard } from "../utils/formatNumber";

export default function City({ children: votes = "" }) {
  const { votingPopulation = 0, absence = 0, presence = 0, name, quantityCandidates = 0 } = votes;
  return (
    <>
      <section className="p-4 m-4 border rounded-lg font-semibold">
        <h1 className="text-xl text-center p-2">{`Eleição em ${name}`}</h1>
        <h2 className="text-lg text-center p-2">{`${quantityCandidates} candidatos`}</h2>
        <div className="flex justify-center space-x-10 p-4">
          <p className="font-semibold">
            <strong>Total de Eleitores:</strong>{" "}
            {toBrazilianStandard(votingPopulation)}
          </p>
          <p className="font-semibold">
            <strong>Abstenção:</strong> {toBrazilianStandard(absence)}
          </p>
          <p className="font-semibold">
            <strong>Comparecimento:</strong> {toBrazilianStandard(presence)}
          </p>
        </div>
      </section>
    </>
  );
}
