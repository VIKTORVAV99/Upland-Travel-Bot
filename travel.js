const createGraph = require('ngraph.graph');
const g = createGraph();
const path = require('ngraph.path');

//manhattan cluster
g.addLink('Staten Island', 'Brooklyn', { cost: 20, time: 12, type: 'bus' });
g.addLink('Brooklyn', 'Manhattan', { cost: 25, time: 4, type: 'train' });
g.addLink('Rutherford', 'Manhattan', { cost: 20, time: 7, type: 'train' });

g.addLink('Brooklyn', 'Staten Island', { cost: 20, time: 12, type: 'bus' });
g.addLink('Manhattan', 'Brooklyn', { cost: 25, time: 4, type: 'train' });
g.addLink('Manhattan', 'Rutherford', { cost: 20, time: 7, type: 'train' });

//san francisco cluster
g.addLink('Santa Clara', 'San Francisco', { cost: 35, time: 10, type: 'train' });
g.addLink('Bakersfield', 'San Francisco', { cost: 125, time: 39, type: 'train' });
g.addLink('Fresno & Clovis', 'San Francisco', { cost: 95, time: 25, type: 'train' });
g.addLink('Bakersfield', 'Fresno & Clovis', { cost: 40, time: 13, type: 'train' });
g.addLink('Oakland', 'San Francisco', { cost: 25, time: 6, type: 'train' });

g.addLink('San Francisco', 'Santa Clara', { cost: 35, time: 10, type: 'train' });
g.addLink('San Francisco', 'Bakersfield', { cost: 125, time: 39, type: 'train' });
g.addLink('San Francisco', 'Fresno & Clovis', { cost: 95, time: 25, type: 'train' });
g.addLink('Fresno & Clovis', 'Bakersfield', { cost: 40, time: 13, type: 'train' });
g.addLink('San Francisco', 'Oakland', { cost: 25, time: 6, type: 'train' });

//Chicago cluster
g.addLink('Cleveland', 'Chicago', { cost: 150, time: 50, type: 'train' });
g.addLink('Cleveland', 'Chicago', { cost: 375, time: 6, type: 'hyperloop' });

g.addLink('Chicago', 'Cleveland', { cost: 150, time: 50, type: 'train' });
g.addLink('Chicago', 'Cleveland', { cost: 375, time: 6, type: 'hyperloop' });

// Manhattan Air routes
g.addLink('Manhattan', 'Chicago', { cost: 740, time: 14, type: 'plane' });
g.addLink('Manhattan', 'Kansas City', { cost: 1120, time: 19, type: 'plane' });
g.addLink('Manhattan', 'Nashville', { cost: 770, time: 12.8, type: 'plane' });
g.addLink('Manhattan', 'New Orleans', { cost: 1180, time: 20, type: 'plane' });
g.addLink('Manhattan', 'San Francisco', { cost: 2580, time: 45, type: 'plane' });

g.addLink('Chicago', 'Manhattan', { cost: 740, time: 14, type: 'plane' });
g.addLink('Nashville', 'Manhattan', { cost: 770, time: 12.8, type: 'plane' });
g.addLink('Kansas City', 'Manhattan', { cost: 1120, time: 19, type: 'plane' });
g.addLink('New Orleans', 'Manhattan', { cost: 1180, time: 20, type: 'plane' });
g.addLink('San Francisco', 'Manhattan', { cost: 2580, time: 45, type: 'plane' });

//San Francisco Air routes
g.addLink('San Francisco', 'Kansas City', { cost: 1500, time: 25, type: 'plane' });
g.addLink('San Francisco', 'New Orleans', { cost: 1910, time: 32, type: 'plane' });
g.addLink('San Francisco', 'Chicago', { cost: 1840, time: 32, type: 'plane' });

g.addLink('Kansas City', 'San Francisco', { cost: 1500, time: 25, type: 'plane' });
g.addLink('New Orleans', 'San Francisco', { cost: 1910, time: 32, type: 'plane' });
g.addLink('Chicago', 'San Francisco', { cost: 1840, time: 32, type: 'plane' });

//Kansas City Air routes
g.addLink('Kansas City', 'New Orleans', { cost: 690, time: 12, type: 'plane' });
g.addLink('Kansas City', 'Chicago', { cost: 400, time: 7, type: 'plane' });
g.addLink('Kansas City', 'Nashville', { cost: 470, time: 7.9, type: 'plane' });

g.addLink('New Orleans', 'Kansas City', { cost: 690, time: 12, type: 'plane' });
g.addLink('Chicago', 'Kansas City', { cost: 400, time: 7, type: 'plane' });
g.addLink('Nashville', 'Kansas City', { cost: 470, time: 7.9, type: 'plane' });

// New Orleans Air routes
g.addLink('New Orleans', 'Chicago', { cost: 840, time: 14, type: 'plane' });
g.addLink('New Orleans', 'Nashville', { cost: 490, time: 8.2, type: 'plane' });

g.addLink('Chicago', 'New Orleans', { cost: 840, time: 14, type: 'plane' });
g.addLink('Nashville', 'New Orleans', { cost: 490, time: 8.2, type: 'plane' });

//ChicagoAir routes
g.addLink('Chicago', 'Nashville', { cost: 410, time: 14, type: 'plane' });

g.addLink('Nashville', 'Chicago', { cost: 410, time: 14, type: 'plane' });

//US MID Train routes
g.addLink('Kansas City', 'Nashville', { cost: 190, time: 74, type: 'train' });
g.addLink('Kansas City', 'Chicago', { cost: 170, time: 58, type: 'train' });
g.addLink('Kansas City', 'New Orleans', { cost: 300, time: 114, type: 'train' });
g.addLink('New Orleans', 'Chicago', { cost: 320, time: 123, type: 'train' });
g.addLink('Chicago', 'Nashville', { cost: 170, time: 63.3, type: 'train' });
g.addLink('New Orleans', 'Nashville', { cost: 190, time: 70.9, type: 'train' });

g.addLink('Nashville', 'Kansas City', { cost: 190, time: 74, type: 'train' });
g.addLink('Chicago', 'Kansas City', { cost: 170, time: 58, type: 'train' });
g.addLink('New Orleans', 'Kansas City', { cost: 300, time: 114, type: 'train' });
g.addLink('Chicago', 'New Orleans', { cost: 320, time: 123, type: 'train' });
g.addLink('Nashville', 'Chicago', { cost: 170, time: 63.3, type: 'train' });
g.addLink('Nashville', 'New Orleans', { cost: 190, time: 70.9, type: 'train' });

let pathFinder = path.nba(g, {
  distance(_fromNode, _toNode, link) {
    return link.data.cost;
  },
});
let fromNodeId = 'Bakersfield';
let toNodeId = 'Staten Island';
let foundPath = pathFinder.find(fromNodeId, toNodeId).reverse();

let pathArray = [];
let nextNode = '';
let previousNode = '';
Array.prototype.unique = function () {
  return Array.from(new Set(this));
};
let totalCost = 0;
let totalTime = 0;

foundPath.forEach((Node) => {
  nextNode = Node.id;
  links = Node.links.unique();
  links.unique().forEach((Link) => {
    if (Link.toId == nextNode && (Link.fromId == previousNode || '')) {
      pathArray.push([Link.fromId, Link.toId, Link.data]);
    }
  });
  previousNode = Node.id;
});

filteredPathArray = [];
k = pathArray.length;
for (k = 0; k < pathArray.length; k++) {
  if (
    k + 1 < pathArray.length &&
    pathArray[k][0] == pathArray[k + 1][0] &&
    pathArray[k][1] == pathArray[k + 1][1]
  ) {
    minValue = Math.min(pathArray[k][2].cost, pathArray[k + 1][2].cost);
    for (o = 0; o < 2; o++) {
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

responseArray = [];
let i = 1;
filteredPathArray.forEach((Line) => {
  responseArray.push(`${i}. ${Line[0]} => (${Line[2].type}) => ${Line[1]}\n`);
  totalCost += Line[2].cost;
  totalTime += Line[2].time;
  i++;
});
responseArray.push(
  `   Total cost: ${totalCost} UPX\n   Total time: ${totalTime} minutes`
);
console.log(responseArray.join(''));
