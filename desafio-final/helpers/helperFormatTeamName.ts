export function formatTeamName(teamName: string): string {
  const elements = teamName.split(" ");
  let newTeamName: string = teamName;
  if (!!elements[1] && elements[1].length == 2) {
    newTeamName = `${elements[0]} ${elements[1].toUpperCase()}`;
    return newTeamName;
  } else if (!!elements[1] && elements[1].length > 2) {
    newTeamName = `${
      elements[0]
    } ${elements[1][0].toUpperCase()}${elements[1].substr(1)}`;
    return newTeamName;
  }
  return newTeamName;
}

export function removeSpecialCharacters(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
