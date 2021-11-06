const { graph } = require('./travel-routes.js');
const { nba } = require('ngraph.path');

Array.prototype.unique = () => {
  return Array.from(new Set(this));
};

/**
 * Gives the travel route from point A to point B.
 * @param {string} from Point A.
 * @param {string} to Point B.
 * @param {string} method The method to use when finding the path.
 * @returns {array}
 */
function travelToFrom(from, to, method) {
  const pathFinder = nba(graph, {
    distance(_fromNode, _toNode, link) {
      if (method === 'fast') {
        return link.data.time;
      } else if (method === 'cheap' || method === '') {
        return link.data.cost;
      }
    },
  });

  /** Holds the path found by the pathfinder. */
  const foundPath = pathFinder.find(from, to).reverse();

  let nextNode = '';
  let previousNode = '';

  /** Holds the unfiltered path as an array */
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

  /** Holds the filtered path as an array. */
  const filteredPathArray = [];

  /* Loops over the pathArray and check if the current paths to and from match the next paths to and from values.*/
  for (let k = 0; k < pathArray.length; k++) {
    if (
      k + 1 < pathArray.length &&
      pathArray[k][0] == pathArray[k + 1][0] &&
      pathArray[k][1] == pathArray[k + 1][1]
    ) {
      /** The minimum value for either time or cost. */
      let minValue;
      if (method === 'fast') {
        minValue = Math.min(pathArray[k][2].time, pathArray[k + 1][2].time);
      } else if (method === 'cheap' || method === '') {
        minValue = Math.min(pathArray[k][2].cost, pathArray[k + 1][2].cost);
      }

      for (let o = 0; o < 2; o++) {
        if (method === 'fast') {
          if (pathArray[k + o][2].time == minValue) {
            filteredPathArray.push(pathArray[k + o]);
          }
        } else if (method === 'cheap' || method === '') {
          if (pathArray[k + o][2].cost == minValue) {
            filteredPathArray.push(pathArray[k + o]);
          }
        }
      }
    } else if (k > 0) {
      if (pathArray[k - 1][0] != pathArray[k][0] && pathArray[k - 1][1] != pathArray[k][1]) {
        filteredPathArray.push(pathArray[k]);
      }
    } else if (k == 0) {
      filteredPathArray.push(pathArray[k]);
    }
  }

  return filteredPathArray;
}
module.exports = {
  travelToFrom,
};
