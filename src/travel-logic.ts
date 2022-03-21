import path from 'ngraph.path';
import createGraph from 'ngraph.graph';
import routesJSON from './data/routes.json' assert { type: 'json' };
import type { MessageEmbedOptions } from 'discord.js';
import type { Route, RouteData } from './interfaces/route';

const graph = createGraph({ multigraph: true });

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
  const pathArray: RouteData[] = [];
  foundPath.forEach((node, index, array) => {
    Array.from(new Set(node.links)).forEach((link) => {
      if (link.fromId === array[index].id && link.toId === array[index + 1]?.id) {
        pathArray.push({ node1: link.fromId, node2: link.toId, data: link.data });
      }
    });
  });

  /** Holds the filtered path as an array.
   *  @type {array}
   */
  const filteredPathArray: RouteData[] = [];

  /** Loops over the pathArray and check if the current paths to and from match the next paths to and from values. @type {number} */
  pathArray.forEach((currentPath, index, array) => {
    if (
      index === 0 ||
      (index > 0 &&
        array[index - 1].node1 !== currentPath.node1 &&
        array[index - 1].node2 !== currentPath.node2)
    ) {
      filteredPathArray.push(currentPath);
    } else if (
      index > 0 &&
      array[index - 1].node1 === currentPath.node1 &&
      array[index - 1].node2 === currentPath.node2
    ) {
      /** The minimum value for either time or cost. */
      const minValue =
        method === 'fastest'
          ? Math.min(array[index - 1].data.time, currentPath.data.time)
          : Math.min(array[index - 1].data.cost, currentPath.data.cost);

      /** Loops over the current and previous path and returns the path with the matching minValue. */
      for (let o = 0; o <= 1; o++) {
        if (
          ((method === 'fastest' && array[index - 1 + o].data.time === minValue) ||
            array[index - 1 + o].data.cost === minValue) &&
          array[index - 1] !== array[index - 1 + o]
        ) {
          filteredPathArray.pop();
          filteredPathArray.push(currentPath);
        }
      }
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
          .map((path, index) => [
            `${index + 1}. ${path.node1} \u279c (${path.data.type}) \u279c ${path.node2}`,
          ])
          .join('\n')}`,
      },
      {
        name: 'Travel cost:',
        value: `${filteredPathArray.map((path) => path.data.cost).reduce((a, b) => a + b, 0)} UPX`,
        inline: true,
      },
      {
        name: 'Travel time:',
        value: `${filteredPathArray.map((path) => path.data.time).reduce((a, b) => a + b, 0)} minutes`,
        inline: true,
      },
    ],
  };
  return embedResponse;
}
