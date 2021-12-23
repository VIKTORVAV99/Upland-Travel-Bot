import path from 'ngraph.path';
import createGraph from 'ngraph.graph';
import routesJSON from './data/routes.json';
import type { NodeId } from 'ngraph.graph';
import type { MessageEmbedOptions } from 'discord.js';
import type { Route } from './interfaces/route';

const graph = createGraph();

/** The imported routes */
const routes: Route[] = routesJSON;

/** Loops over the routes and add each link to the graph twice for bidirectional travel  */
routes.forEach((route) => {
  route.modes.forEach((mode) => {
    graph.addLink(route.from, route.to, mode);
    graph.addLink(route.to, route.from, mode);
  });
});

/**
 * Gives the travel route from point A to point B.
 * @param from Point A.
 * @param to Point B.
 * @param method The method to use when finding the path.
 */
export function travelToFrom(from: string, to: string, method: string | null): MessageEmbedOptions {
  let pathFinder = undefined;
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

  /** Holds the unfiltered path as an array */
  const pathArray: [NodeId, NodeId, { time: number; cost: number; type: string }][] = [];
  foundPath.forEach((node, index, array) => {
    Array.from(new Set(node.links)).forEach((link) => {
      if (link.fromId === array[index].id && link.toId === array[index + 1]?.id) {
        pathArray.push([link.fromId, link.toId, link.data]);
      }
    });
  });

  /** Holds the filtered path as an array.
   *  @type {array}
   */
  const filteredPathArray: [NodeId, NodeId, { time: number; cost: number; type: string }][] = [];

  /** Loops over the pathArray and check if the current paths to and from match the next paths to and from values. @type {number} */
  pathArray.forEach((value, index, array) => {
    if (
      index + 1 < array.length &&
      array[index][0] === array[index + 1][0] &&
      array[index][1] === array[index + 1][1]
    ) {
      /** The minimum value for either time or cost. */
      const minValue =
        method === 'fastest'
          ? Math.min(array[index][2].time, array[index + 1][2].time)
          : Math.min(array[index][2].cost, array[index + 1][2].cost);

      /** Loops over the two matching paths and returns either the fastest or the cheapest */
      for (let o = 0; o < 2; o++) {
        if (method === 'fastest' && array[index + o][2].time === minValue) {
          filteredPathArray.push(array[index + o]);
        } else if (array[index + o][2].cost === minValue) {
          filteredPathArray.push(array[index + o]);
        }
      }
    } else if (
      index > 0 &&
      array[index - 1][0] !== array[index][0] &&
      array[index - 1][1] !== array[index][1]
    ) {
      filteredPathArray.push(value);
    } else if (index === 0) {
      filteredPathArray.push(value);
    }
  });

  const embedResponse: MessageEmbedOptions = {
    color: 0x36c6ff,
    title: `${from} to ${to}`,
    description: `The ${method ?? 'simplest'} route from ${from} to ${to}.`,
    fields: [
      {
        name: 'Route:',
        value: `${filteredPathArray
          .map((value, index) => [`${index + 1}. ${value[0]} \u279c (${value[2].type}) \u279c ${value[1]}`])
          .join('\n')}`,
      },
      {
        name: 'Total cost:',
        value: `${filteredPathArray.map((value) => value[2].cost).reduce((a, b) => a + b, 0)} UPX`,
        inline: true,
      },
      {
        name: 'Total time:',
        value: `${filteredPathArray.map((value) => value[2].time).reduce((a, b) => a + b, 0)} minutes`,
        inline: true,
      },
    ],
  };
  return embedResponse;
}

console.log(travelToFrom('Cleveland', 'Bakersfield', 'fastest'));
