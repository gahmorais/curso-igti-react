import { read } from "./httpService";

export async function apiGetCities() {
  const cities = await read("/cities");
  return cities;
}

export async function apiGetCandidates() {
  const candidates = await read("/candidates");
  return candidates;
}

export async function apiGetElection() {
  const election = await read("/election");
  return election;
}

export async function apiGetElectionByCity(cityId) {
  const electionByCity = await read(`/election?cityId=${cityId}`); 
  return electionByCity;
}
