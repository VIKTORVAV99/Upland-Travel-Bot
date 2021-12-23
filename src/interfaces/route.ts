export interface Route {
  from: string;
  to: string;
  modes: { type: string; cost: number; time: number }[];
}
