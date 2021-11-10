const { graph } = require('./travel-routes.js');
const { nba } = require('ngraph.path');

Array.prototype.unique = function () {
  return Array.from(new Set(this));
};

/**
 * Gives the travel route from point A to point B.
 * @param {string} from Point A.
 * @param {string} to Point B.
 * @param {string} method The method to use when finding the path.
 * @returns {object}
 */
function travelToFrom(from, to, method) {
  let pathFinder;
  if (method === 'simplest' || method === null) {
    pathFinder = nba(graph);
  } else {
    pathFinder = nba(graph, {
      distance(_fromNode, _toNode, link) {
        return method === 'fastest' ? link.data.time : link.data.cost;
      },
    });
  }

  /** Holds the path found by the pathfinder. */
  const foundPath = pathFinder.find(from, to).reverse();

  /** @type {string|number} */
  let nextNode = '';
  /** @type {string|number} */
  let previousNode = '';

  /** Holds the unfiltered path as an array @type {array} */
  const pathArray = [];
  foundPath.forEach((Node) => {
    nextNode = Node.id;
    const links = Node.links.unique();
    links.unique().forEach((Link) => {
      if (Link.toId == nextNode && (Link.fromId == previousNode || '')) {
        pathArray.push([Link.fromId, Link.toId, Link.data]);
      }
    });
    previousNode = Node.id;
  });
  /** Holds the filtered path as an array.
   *  @type {array}
   */
  const filteredPathArray = [];

  /** Loops over the pathArray and check if the current paths to and from match the next paths to and from values. @type {number} */
  for (let k = 0; k < pathArray.length; k++) {
    if (
      k + 1 < pathArray.length &&
      pathArray[k][0] == pathArray[k + 1][0] &&
      pathArray[k][1] == pathArray[k + 1][1]
    ) {
      /** The minimum value for either time or cost. */
      const minValue =
        method === 'fastest'
          ? Math.min(pathArray[k][2].time, pathArray[k + 1][2].time)
          : Math.min(pathArray[k][2].cost, pathArray[k + 1][2].cost);

      for (let o = 0; o < 2; o++) {
        if (method === 'fastest' && pathArray[k + o][2].time === minValue) {
          filteredPathArray.push(pathArray[k + o]);
        } else if (pathArray[k + o][2].cost === minValue) {
          filteredPathArray.push(pathArray[k + o]);
        }
      }
    } else if (k > 0 && pathArray[k - 1][0] != pathArray[k][0] && pathArray[k - 1][1] != pathArray[k][1]) {
      filteredPathArray.push(pathArray[k]);
    } else if (k == 0) {
      filteredPathArray.push(pathArray[k]);
    }
  }

  const embedResponse = {
    color: 0x36c6ff,
    title: `${from} to ${to}`,
    description: `The ${method ?? 'simplest'} route from ${from} to ${to}.`,
    fields: [
      {
        name: 'Route:',
        value: `${filteredPathArray
          .map((array, index) => [`${index + 1}. ${array[0]} \u279c (${array[2].type}) \u279c ${array[1]}`])
          .join('\n')}`,
      },
      {
        name: 'Total cost:',
        value: `${filteredPathArray.map((array) => array[2].cost).reduce((a, b) => a + b, 0)} UPX`,
        inline: true,
      },
      {
        name: 'Total time:',
        value: `${filteredPathArray.map((array) => array[2].time).reduce((a, b) => a + b, 0)} minutes`,
        inline: true,
      },
    ],
  };
  return embedResponse;
}

console.log(travelToFrom('Bakersfield', 'Staten Island', null));
module.exports = {
  travelToFrom,
};
