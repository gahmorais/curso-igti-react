import { ITeamsData } from "../pages";
import Image from "next/image";

interface IChampionshipTableProps {
  children: ITeamsData[] | null;
}

function removerAcentos(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

export default function ChampionshipTable({
  children: teams,
}: IChampionshipTableProps) {
  return (
    <>
      {teams?.map((team, index) => {
        return (
          <div key={index} className="flex space-x-4">
            <table>
              <thead>
                <tr>
                  <th className="w-20"></th>
                  <th className="w-28"></th>
                  <th className="w-28"></th>
                  <th className="w-10">P</th>
                  <th className="w-10">V</th>
                  <th className="w-10">E</th>
                  <th className="w-10">D</th>
                  <th className="w-10">GP</th>
                  <th className="w-10">GC</th>
                  <th className="w-10">S</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={`/img/${removerAcentos(team.team.replace(" ", "_").toLowerCase())}.png`}
                      height="30"
                      width="30"
                      alt="america-mg"
                    />
                  </td>
                  <td>{team.team}</td>
                  <td>{team.score.total_pontos}</td>
                  <td>{team.score.total_vitorias}</td>
                  <td>{team.score.total_empates}</td>
                  <td>{team.score.total_derrotas}</td>
                  <td>{team.score.total_gols_marcados}</td>
                  <td>{team.score.total_gols_sofridos}</td>
                  <td>
                    {team.score.total_gols_marcados -
                      team.score.total_gols_sofridos}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
