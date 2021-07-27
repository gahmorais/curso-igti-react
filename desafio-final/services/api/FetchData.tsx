import axiosInstance, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

export interface IMatch {
  visitante: string;
  resultado: string;
  data_partida: string;
  pontuacao_geral_mandante: {
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
  placar_visitante: string;
  hora_partida: string;
  mandante: string;
  estadio: string;
  pontuacao_geral_visitante: {
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

export interface IRounds {
  partidas: IMatch[];
  numero: number;
}

export interface IYears {
  year: string;
}

const axios = axiosInstance.create({ baseURL: "http://localhost:3001" });

export async function read(url: string): Promise<IRounds[]> {
  const { data } = await axios.get(url);
  return data;
}
