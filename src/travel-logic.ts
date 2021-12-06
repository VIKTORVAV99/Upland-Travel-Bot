import { graph } from './travel-routes.js';
import path from 'ngraph.path';
import type { NodeId } from 'ngraph.graph';
import type { Embed } from './interfaces/embed.js';

/**
 * Gives the travel route from point A to point B.
 * @param from Point A.
 * @param to Point B.
 * @param method The method to use when finding the path.
 * @returns
 */
export function travelToFrom(from: string, to: string, method: string | null): Embed {
  let pathFinder;
  if (method === 'simplest' || method === null) {
    pathFinder = path.nba(graph);
  } else {
    pathFinder = path.nba(graph, {
      distance(_fromNode, _toNode, link) {
        return method === 'fastest' ? link.data.time : link.data.cost;
      },
    });
  }

  /** Holds the path found by the pathfinder. */
  const foundPath = pathFinder.find(from, to).reverse();

  /** Holds the unfiltered path as an array @type {array} */
  const pathArray: [NodeId, NodeId, { time: number; cost: number; type: string }][] = [];
  foundPath.forEach((Node, Index, Array) => {
    new Set(Node.links).forEach((Link) => {
      if (Link.fromId == Array[Index].id && Link.toId == Array[Index + 1]?.id) {
        pathArray.push([Link.fromId, Link.toId, Link.data]);
      }
    });
  });

  /** Holds the filtered path as an array.
   *  @type {array}
   */
  const filteredPathArray: [NodeId, NodeId, { time: number; cost: number; type: string }][] = [];

  /** Loops over the pathArray and check if the current paths to and from match the next paths to and from values. @type {number} */
  pathArray.forEach((Value, Index, Array) => {
    if (
      Index + 1 < Array.length &&
      Array[Index][0] === Array[Index + 1][0] &&
      Array[Index][1] === Array[Index + 1][1]
    ) {
      /** The minimum value for either time or cost. */
      const minValue =
        method === 'fastest'
          ? Math.min(Array[Index][2].time, Array[Index + 1][2].time)
          : Math.min(Array[Index][2].cost, Array[Index + 1][2].cost);

      /** Loops over the two matching paths and returns either the fastest or the cheapest */
      for (let o = 0; o < 2; o++) {
        if (method === 'fastest' && Array[Index + o][2].time === minValue) {
          filteredPathArray.push(Array[Index + o]);
        } else if (Array[Index + o][2].cost === minValue) {
          filteredPathArray.push(Array[Index + o]);
        }
      }
    } else if (
      Index > 0 &&
      Array[Index - 1][0] !== Array[Index][0] &&
      Array[Index - 1][1] != Array[Index][1]
    ) {
      filteredPathArray.push(Value);
    } else if (Index === 0) {
      filteredPathArray.push(Value);
    }
  });

  const embedResponse: Embed = {
    color: 0x36c6ff,
    title: `${from} to ${to}`,
    description: `The ${method ?? 'simplest'} route from ${from} to ${to}.`,
    fields: [
      {
        name: 'Route:',
        value: `${filteredPathArray
          .map((Value, Index) => [`${Index + 1}. ${Value[0]} \u279c (${Value[2].type}) \u279c ${Value[1]}`])
          .join('\n')}`,
      },
      {
        name: 'Total cost:',
        value: `${filteredPathArray.map((Value) => Value[2].cost).reduce((a, b) => a + b, 0)} UPX`,
        inline: true,
      },
      {
        name: 'Total time:',
        value: `${filteredPathArray.map((Value) => Value[2].time).reduce((a, b) => a + b, 0)} minutes`,
        inline: true,
      },
    ],
  };
  return embedResponse;
}

console.log(travelToFrom('Brooklyn', 'Bakersfield', null));
