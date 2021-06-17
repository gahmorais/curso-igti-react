import { useState, useEffect } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Select from "../components/Select";
import City from "../components/City";
import Candidates from "../components/Candidates";

import {
  apiGetCandidates,
  apiGetCities,
  apiGetElectionByCity,
} from "../service/apiService";
import Candidate from "../components/Candidate";
export default function ElectionPage() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [election, setElection] = useState([]);

  useEffect(() => {
    (async () => {
      const getCitites = await apiGetCities();
      setCities(getCitites);

      const getCandidates = await apiGetCandidates();
      setCandidates(getCandidates);
    })();
  }, []);

  async function handleCityChange(cityId) {
    if (cityId !== "") {
      const electionByCity = await apiGetElectionByCity(cityId);
      const city = cities.find((city) => cityId === city.id);
      setSelectedCity({ ...city, quantityCandidates: electionByCity.length });
      setElection(electionByCity);
    }else{
      setSelectedCity("")
      setElection([])
    }
  }

  return (
    <>
      <Header>react-super-election</Header>
      <Main>
        <div className="items-center flex flex-1 justify-center p-4 space-x-2">
          <span className="text-lg">Selecione o municipio: </span>
          <Select onSelectChange={handleCityChange}>
            {cities.map(({ name, id }) => {
              return (
                <option className="border rounded-lg" key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </Select>
        </div>
        {selectedCity && <City>{selectedCity}</City>}
        <Candidates>
          {election
            .sort((a, b) => b.votes - a.votes)
            .map(({ candidateId, votes }, index) => {
              let candidate = candidates.find(
                (candidate) => candidate.id === candidateId
              );

              const votesPercentage = (
                (votes / selectedCity.presence) *
                100
              ).toFixed(2);
              candidate = {
                ...candidate,
                votesPercentage,
                votes,
                elected: index === 0 ? "Eleito" : "Não Eleito",
              };
              return <Candidate key={candidateId}>{candidate}</Candidate>;
            })}
        </Candidates>
      </Main>
    </>
  );
}
