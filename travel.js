const createGraph = require('ngraph.graph');
const g = createGraph();
const path = require('ngraph.path');

//manhattan cluster
g.addLink('Staten Island', 'Brooklyn', { UPX: 20, time: 12, type: 'bus' });
g.addLink('Brooklyn', 'Manhattan', { UPX: 25, time: 4, type: 'train' });
g.addLink('Rutherford', 'Manhattan', { UPX: 20, time: 7, type: 'train' });

g.addLink('Brooklyn', 'Staten Island', { UPX: 20, time: 12, type: 'bus' });
g.addLink('Manhattan', 'Brooklyn', { UPX: 25, time: 4, type: 'train' });
g.addLink('Manhattan', 'Rutherford', { UPX: 20, time: 7, type: 'train' });

//san francisco cluster
g.addLink('Santa Clara', 'San Francisco', { UPX: 35, time: 10, type: 'train' });
g.addLink('Bakersfield', 'San Francisco', { UPX: 125, time: 39, type: 'train' });
g.addLink('Fresno & Clovis', 'San Francisco', { UPX: 95, time: 25, type: 'train' });
g.addLink('Bakersfield', 'Fresno & Clovis', { UPX: 40, time: 13, type: 'train' });
g.addLink('Oakland', 'San Francisco', { UPX: 25, time: 6, type: 'train' });

g.addLink('San Francisco', 'Santa Clara', { UPX: 35, time: 10, type: 'train' });
g.addLink('San Francisco', 'Bakersfield', { UPX: 125, time: 39, type: 'train' });
g.addLink('San Francisco', 'Fresno & Clovis', { UPX: 95, time: 25, type: 'train' });
g.addLink('Fresno & Clovis', 'Bakersfield', { UPX: 40, time: 13, type: 'train' });
g.addLink('San Francisco', 'Oakland', { UPX: 25, time: 6, type: 'train' });

//Chicago cluster
g.addLink('Cleveland', 'Chicago', { UPX: 150, time: 50, type: 'train' });
g.addLink('Cleveland', 'Chicago', { UPX: 375, time: 6, type: 'hyperloop' });

g.addLink('Chicago', 'Cleveland', { UPX: 150, time: 50, type: 'train' });
g.addLink('Chicago', 'Cleveland', { UPX: 375, time: 6, type: 'hyperloop' });

// Manhattan Air routes
g.addLink('Manhattan', 'Chicago', { UPX: 740, time: 14, type: 'plane' });
g.addLink('Manhattan', 'Kansas City', { UPX: 1120, time: 19, type: 'plane' });
g.addLink('Manhattan', 'Nashville', { UPX: 770, time: 12.8, type: 'plane' });
g.addLink('Manhattan', 'New Orleans', { UPX: 1180, time: 20, type: 'plane' });
g.addLink('Manhattan', 'San Francisco', { UPX: 2580, time: 45, type: 'plane' });

g.addLink('Chicago', 'Manhattan', { UPX: 740, time: 14, type: 'plane' });
g.addLink('Nashville', 'Manhattan', { UPX: 770, time: 12.8, type: 'plane' });
g.addLink('Kansas City', 'Manhattan', { UPX: 1120, time: 19, type: 'plane' });
g.addLink('New Orleans', 'Manhattan', { UPX: 1180, time: 20, type: 'plane' });
g.addLink('San Francisco', 'Manhattan', { UPX: 2580, time: 45, type: 'plane' });

//San Francisco Air routes
g.addLink('San Francisco', 'Kansas City', { UPX: 1500, time: 25, type: 'plane' });
g.addLink('San Francisco', 'New Orleans', { UPX: 1910, time: 32, type: 'plane' });
g.addLink('San Francisco', 'Chicago', { UPX: 1840, time: 32, type: 'plane' });

g.addLink('Kansas City', 'San Francisco', { UPX: 1500, time: 25, type: 'plane' });
g.addLink('New Orleans', 'San Francisco', { UPX: 1910, time: 32, type: 'plane' });
g.addLink('Chicago', 'San Francisco', { UPX: 1840, time: 32, type: 'plane' });

//Kansas City Air routes
g.addLink('Kansas City', 'New Orleans', { UPX: 690, time: 12, type: 'plane' });
g.addLink('Kansas City', 'Chicago', { UPX: 400, time: 7, type: 'plane' });
g.addLink('Kansas City', 'Nashville', { UPX: 470, time: 7.9, type: 'plane' });

g.addLink('New Orleans', 'Kansas City', { UPX: 690, time: 12, type: 'plane' });
g.addLink('Chicago', 'Kansas City', { UPX: 400, time: 7, type: 'plane' });
g.addLink('Nashville', 'Kansas City', { UPX: 470, time: 7.9, type: 'plane' });

// New Orleans Air routes
g.addLink('New Orleans', 'Chicago', { UPX: 840, time: 14, type: 'plane' });
g.addLink('New Orleans', 'Nashville', { UPX: 490, time: 8.2, type: 'plane' });

g.addLink('Chicago', 'New Orleans', { UPX: 840, time: 14, type: 'plane' });
g.addLink('Nashville', 'New Orleans', { UPX: 490, time: 8.2, type: 'plane' });

//ChicagoAir routes
g.addLink('Chicago', 'Nashville', { UPX: 410, time: 14, type: 'plane' });

g.addLink('Nashville', 'Chicago', { UPX: 410, time: 14, type: 'plane' });

//US MID Train routes
g.addLink('Kansas City', 'Nashville', { UPX: 190, time: 74, type: 'train' });
g.addLink('Kansas City', 'Chicago', { UPX: 170, time: 58, type: 'train' });
g.addLink('Kansas City', 'New Orleans', { UPX: 300, time: 114, type: 'train' });
g.addLink('New Orleans', 'Chicago', { UPX: 320, time: 123, type: 'train' });
g.addLink('Chicago', 'Nashville', { UPX: 170, time: 63.3, type: 'train' });
g.addLink('New Orleans', 'Nashville', { UPX: 190, time: 70.9, type: 'train' });

g.addLink('Nashville', 'Kansas City', { UPX: 190, time: 74, type: 'train' });
g.addLink('Chicago', 'Kansas City', { UPX: 170, time: 58, type: 'train' });
g.addLink('New Orleans', 'Kansas City', { UPX: 300, time: 114, type: 'train' });
g.addLink('Chicago', 'New Orleans', { UPX: 320, time: 123, type: 'train' });
g.addLink('Nashville', 'Chicago', { UPX: 170, time: 63.3, type: 'train' });
g.addLink('Nashville', 'New Orleans', { UPX: 190, time: 70.9, type: 'train' });

let pathFinder = path.nba(g, {
  distance(_fromNode, _toNode, link) {
    return link.data.UPX;
  },
});
let fromNodeId = 'New Orleans';
let toNodeId = 'Cleveland';
let foundPath = pathFinder.find(fromNodeId, toNodeId).reverse();

let pathArray = [];
i = 1;
let nextNode = '';
let previousNode = '';
Array.prototype.unique = function () {
  return Array.from(new Set(this));
};
let totalCost = 0;
let totalTime = 0;


// TODO: #1 Filter out duplicate routes and pick the cheapest one.
foundPath.forEach((Node) => {
  nextNode = Node.id;
  links = Node.links.unique();
  links.unique().forEach((Link) => {
    if (Link.toId == nextNode && (Link.fromId == previousNode || '')) {
      pathArray.push([i, Link.toId, Link.data.type, Link.fromId, Link.data]);
      totalCost += Link.data.UPX;
      totalTime += Link.data.time;
      i++;
    }
  });
  previousNode = Node.id;
});

//console.log(pathArray, totalCost, totalTime);
responseArray = [];
pathArray.forEach((Line) => {
  responseArray.push(`${Line[0]}. ${Line[3]} => (${Line[2]}) => ${Line[1]}\n`);
});
responseArray.push(
  `   Total cost: ${Math.round(totalCost)} UPX\n   Total time: ${Math.round(totalTime)} minutes`
);
console.log(responseArray.join(''));
