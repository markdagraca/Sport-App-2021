interface Team {
  name: string;
  predictedScore?: number;
  score?: number;
  logo?: string;
  logoLocation?: string;
}
interface TeamNames {
  [key: string]: Team;
}
const teamNames: TeamNames = {
  LAL: {
    name: "Lakers",
    logo: "LAL.png",
  },
  BOS: {
    name: "Celtics",
    logo: "BOS.png",
  },
  CLE: {
    name: "Cavaliers",
    logo: "CLE.png",
  },
  CHO: {
    name: "Hornets",
    logo: "CHO.png",
  },
  PHI: {
    name: "76ers",
    logo: "PHI.png",
  },
  NOP: {
    name: "Pelicans",
    logo: "NOP.png",
  },
  TOR: {
    name: "Raptors",
    logo: "TOR.png",
  },
  ATL: {
    name: "Hawks",
    logo: "ATL.png",
  },
  OKC: {
    name: "Thunder",
    logo: "OKC.png",
  },
  ORL: {
    name: "Magic",
    logo: "ORL.png",
  },
  SAC: {
    name: "Kings",
    logo: "SAC.png",
  },
  NYK: {
    name: "Knicks",
    logo: "NYK.png",
  },
  IND: {
    name: "Pacers",
    logo: "IND.png",
  },
  HOU: {
    name: "Rockets",
    logo: "HOU.png",
  },
  DET: {
    name: "Pistons",
    logo: "DET.png",
  },
  POR: {
    name: "Trailblazers",
    logo: "POR.png",
  },
  LAC: {
    name: "Clippers",
    logo: "LAC.png",
  },
  MIA: {
    name: "Heat",
    logo: "MIA.png",
  },
  SAS: {
    name: "Spurs",
    logo: "SAS.png",
  },
  MIL: {
    name: "Bucks",
    logo: "MIL.png",
  },
  WAS: {
    name: "Wizards",
    logo: "WAS.png",
  },
  MIN: {
    name: "Timberwolves",
    logo: "MIN.png",
  },
  GSW: {
    name: "Warriors",
    logo: "GSW.png",
  },
  MEM: {
    name: "Grizzlies",
    logo: "MEM.png",
  },
  DEN: {
    name: "Nuggets",
    logo: "DEN.png",
  },
  DAL: {
    name: "Mavericks",
    logo: "DAL.png",
  },
  CHI: {
    name: "Bulls",
    logo: "CHI.png",
  },
  BRK: {
    name: "Nets",
    logo: "BRK.png",
  },
  UTA: {
    name: "Jazz",
    logo: "UTA.png",
  },
  PHO: {
    name: "Suns",
    logo: "PHO.png",
  },

};

export default function teamLookup(teamName: string) {

  const temp: Team = teamNames[teamName.toUpperCase()];

  temp.logoLocation = process.env.PUBLIC_URL + "/teamLogos/NBA/" + temp.logo;
  return teamNames[teamName];
}
