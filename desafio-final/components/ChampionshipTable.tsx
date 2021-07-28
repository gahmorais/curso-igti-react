import { ITeamsData } from "../pages";
import Image from "next/image";
import { formatTeamName, removeSpecialCharacters } from "../helpers/helperFormatTeamName";

interface IChampionshipTableProps {
  children: ITeamsData[] | null;
}

export default function ChampionshipTable({
  children: teams,
}: IChampionshipTableProps) {
  return (
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
        {teams?.map((team, index) => {
          const lineBackground = index % 2 === 0 ? "bg-gray-300" : "bg-white";
          const imageName = `${removeSpecialCharacters(team.team).replace(" ","_")}`          
          return (
            <tr key={index} className={lineBackground}>
              <td>{index + 1}</td>
              <td>
                <Image
                  src={`/img/${imageName}.png`}
                  height="30"
                  width="30"
                  alt="america-mg"
                />
              </td>
              <td>{formatTeamName(team.team)}</td>
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
          );
        })}
      </tbody>
    </table>
  );
}
