const { graph } = require('./travel-routes.js');
const { nba } = require('ngraph.path');

function travelToFrom(from, to) {
  const pathFinder = nba(graph, {
    distance(_fromNode, _toNode, link) {
      return link.data.cost;
    },
  });

  const foundPath = pathFinder.find(from, to).reverse();

  const pathArray = [];
  let nextNode = '';
  let previousNode = '';
  Array.prototype.unique = function () {
    return Array.from(new Set(this));
  };

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

  const filteredPathArray = [];
  for (let k = 0; k < pathArray.length; k++) {
    if (
      k + 1 < pathArray.length &&
      pathArray[k][0] == pathArray[k + 1][0] &&
      pathArray[k][1] == pathArray[k + 1][1]
    ) {
      const minValue = Math.min(pathArray[k][2].cost, pathArray[k + 1][2].cost);
      for (let o = 0; o < 2; o++) {
        if (pathArray[k + o][2].cost == minValue) {
          filteredPathArray.push(pathArray[k + o]);
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
