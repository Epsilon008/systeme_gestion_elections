export interface Candidate {
    id: string;
    name: string;
    photo: string;
    color: string;
    votes: number;
  }
  
  export interface ElectionResults {
    totalVotes: number;
    candidates: Candidate[];
    participationRate: number;
  }