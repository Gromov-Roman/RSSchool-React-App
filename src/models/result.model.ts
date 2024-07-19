export interface Result {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
  origin: Location;
  location: Location;
}

export interface Location {
  name: string;
}

export interface Info {
  pages: number;
}

export interface PagingResults {
  results: Result[] | null;
  info: Info;
}
