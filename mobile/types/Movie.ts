export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;

  // Optional because list endpoints do NOT include videos
  videos?: {
    results: {
      key: string;
      type: string;
    }[];
  };
}

