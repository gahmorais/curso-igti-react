import Head from "next/head";
import { useEffect, useState } from "react";
import ChampionshipTable from "../components/ChampionshipTable";
import Select from "../components/Select";
import { IRounds, read } from "../services/api/FetchData";

export interface ITeamsData {
  team: string;
  score: {
    gols_fora_casa: number;
    empates_fora_casa: number;
    total_jogos: number;
    gols_casa: number;
    jogos_fora_casa: number;
    vitorias_casa: number;
    derrotas_casa: number;
    total_pontos: number;
    empates_casa: number;
    pontos_fora_casa: number;
    total_gols_sofridos: number;
    total_vitorias: number;
    vitorias_fora_casa: number;
    total_derrotas: number;
    pontos_casa: number;
    derrotas_fora_casa: number;
    total_gols_marcados: number;
    jogos_casa: number;
    total_empates: number;
  };
}

export default function Home() {
  const [championshipYears, setChampionshipYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("2003");
  const [teamsData, setTeamsData] = useState<ITeamsData[] | null>(null);
  function handleChange(year: string) {
    setSelectedYear(year);
  }

  useEffect(() => {
    (async () => {
      const data = await read("db");
      setChampionshipYears(Object.keys(data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await read(selectedYear);
      let quantityRounds = data.length;
      if (selectedYear === "2005") {
        quantityRounds -= 11; //Onze rodadas foram anuladas devido a corrupção
        console.log(quantityRounds);
      }
      const lastRound = data.filter((round) => round.numero === quantityRounds);
      const teamsData = lastRound
        .map((round) => {
          return round.partidas.map((matches) => [
            {
              team: matches.mandante,
              score: matches.pontuacao_geral_mandante,
            },
            {
              team: matches.visitante,
              score: matches.pontuacao_geral_visitante,
            },
          ]);
        })
        .flat(2)
        .sort((a, b) => b.score.total_pontos - a.score.total_pontos);

      setTeamsData(teamsData);
    })();
  }, [selectedYear]);

  return (
    <div className="justify-center flex flex-col justify-items-center">
      <Head>
        <title>React Campeonato Brasileiro</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex flex-col h-20 text-center justify-center bg-blue-100">
        <h1 className="font-semibold text-xl">
          React Campeonato Brasileiro 2003 - 2015
        </h1>
      </header>

      <main className="container flex flex-col text-center items-center justify-center">
        <Select onSelectChange={handleChange}>{championshipYears}</Select>
        <h2 className="font-semibold text-2xl">
          Campeonato Brasileiro de {selectedYear}
        </h2>
        <h3 className="font-semibold text-xl">Classificação</h3>
        {teamsData && <ChampionshipTable>{teamsData}</ChampionshipTable>}
      </main>
      <footer className="flex h-20 items-end justify-end pr-3 pb-3">
        <p className="font-semibold">
          &copy; {new Date().getFullYear()} Created by Gabriel Morais
        </p>
      </footer>
    </div>
  );
}
