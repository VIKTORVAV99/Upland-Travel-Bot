import type { NodeId } from 'ngraph.graph';

export interface Route {
  from: string;
  to: string;
  modes: { type: string; cost: number; time: number }[];
}

export interface RouteData {
  /** The first node in the path. */
  node1: NodeId;
  /** The second node in the path. */
  node2: NodeId;
  /** Path data */
  data: {
    /** The time it takes to travel from `node1` to `node2` in minutes. */
    time: number;
    /** The cost of traveling from `node1` to `node2` in UPX. */
    cost: number;
    /** The type of transportation method used. */
    type: string;
  };
}
