export interface IPlayer {
  name: string;
  goalMatch: number;
  winMatch: number;
  maxSpeed: number;
  adwardWon: number;
  goldenBall: number;
  dribbling: number;
  shotPower: number;
  color: string;
  image: string;
}

export interface IExample {
  componentCode: string;
  htmlCode: string;
  title: string;
}

export interface IDataset {
  label: string;
  data: number[];
  borderWidth: number;
  backgroundColor: string;
  borderColor: string;
}

export interface ICharData {
  labels: string[];
  datasets: IDataset[];
}
