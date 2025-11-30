export interface OracleResponse {
  advice: string;
  luckyAction: string;
  luckyColor: string;
  careerScore: number;
  tags: string[];
}

export interface UserInput {
  jobTitle: string;
  concern: string;
  goal: string;
}

export enum AppView {
  LANDING = 'LANDING',
  APP = 'APP',
  STRATEGY = 'STRATEGY',
}