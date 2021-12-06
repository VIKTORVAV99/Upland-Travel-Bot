import createGraph from 'ngraph.graph';
export const graph = createGraph();

// manhattan cluster
graph.addLink('Staten Island', 'Brooklyn', { cost: 20, time: 12, type: 'bus' });
graph.addLink('Brooklyn', 'Manhattan', { cost: 25, time: 4, type: 'train' });
graph.addLink('Rutherford', 'Manhattan', { cost: 20, time: 7, type: 'train' });

graph.addLink('Brooklyn', 'Staten Island', { cost: 20, time: 12, type: 'bus' });
graph.addLink('Manhattan', 'Brooklyn', { cost: 25, time: 4, type: 'train' });
graph.addLink('Manhattan', 'Rutherford', { cost: 20, time: 7, type: 'train' });

graph.addLink('Bronx', 'Manhattan', { cost: 10, time: 3, type: 'train' });
graph.addLink('Bronx', 'Brooklyn', { cost: 10, time: 2, type: 'train' });
graph.addLink('Bronx', 'Rutherford', { cost: 10, time: 2, type: 'train' });

graph.addLink('Manhattan', 'Bronx', { cost: 10, time: 3, type: 'train' });
graph.addLink('Brooklyn', 'Bronx', { cost: 10, time: 2, type: 'train' });
graph.addLink('Rutherford', 'Bronx', { cost: 10, time: 2, type: 'train' });

// san francisco cluster
graph.addLink('Santa Clara', 'San Francisco', { cost: 35, time: 10, type: 'train' });
graph.addLink('Bakersfield', 'San Francisco', { cost: 125, time: 39, type: 'train' });
graph.addLink('Fresno & Clovis', 'San Francisco', { cost: 95, time: 25, type: 'train' });
graph.addLink('Bakersfield', 'Fresno & Clovis', { cost: 40, time: 13, type: 'train' });
graph.addLink('Oakland', 'San Francisco', { cost: 25, time: 6, type: 'train' });

graph.addLink('San Francisco', 'Santa Clara', { cost: 35, time: 10, type: 'train' });
graph.addLink('San Francisco', 'Bakersfield', { cost: 125, time: 39, type: 'train' });
graph.addLink('San Francisco', 'Fresno & Clovis', { cost: 95, time: 25, type: 'train' });
graph.addLink('Fresno & Clovis', 'Bakersfield', { cost: 40, time: 13, type: 'train' });
graph.addLink('San Francisco', 'Oakland', { cost: 25, time: 6, type: 'train' });

// Chicago cluster
graph.addLink('Cleveland', 'Chicago', { cost: 150, time: 50, type: 'train' });
graph.addLink('Cleveland', 'Chicago', { cost: 375, time: 6, type: 'hyperloop' });

graph.addLink('Chicago', 'Cleveland', { cost: 150, time: 50, type: 'train' });
graph.addLink('Chicago', 'Cleveland', { cost: 375, time: 6, type: 'hyperloop' });

// Manhattan Air routes
graph.addLink('Manhattan', 'Chicago', { cost: 740, time: 14, type: 'plane' });
graph.addLink('Manhattan', 'Kansas City', { cost: 1120, time: 19, type: 'plane' });
graph.addLink('Manhattan', 'Nashville', { cost: 770, time: 12.8, type: 'plane' });
graph.addLink('Manhattan', 'New Orleans', { cost: 1180, time: 20, type: 'plane' });
graph.addLink('Manhattan', 'San Francisco', { cost: 2580, time: 45, type: 'plane' });

graph.addLink('Chicago', 'Manhattan', { cost: 740, time: 14, type: 'plane' });
graph.addLink('Nashville', 'Manhattan', { cost: 770, time: 12.8, type: 'plane' });
graph.addLink('Kansas City', 'Manhattan', { cost: 1120, time: 19, type: 'plane' });
graph.addLink('New Orleans', 'Manhattan', { cost: 1180, time: 20, type: 'plane' });
graph.addLink('San Francisco', 'Manhattan', { cost: 2580, time: 45, type: 'plane' });

// San Francisco Air routes
graph.addLink('San Francisco', 'Kansas City', { cost: 1500, time: 25, type: 'plane' });
graph.addLink('San Francisco', 'New Orleans', { cost: 1910, time: 32, type: 'plane' });
graph.addLink('San Francisco', 'Chicago', { cost: 1840, time: 32, type: 'plane' });

graph.addLink('Kansas City', 'San Francisco', { cost: 1500, time: 25, type: 'plane' });
graph.addLink('New Orleans', 'San Francisco', { cost: 1910, time: 32, type: 'plane' });
graph.addLink('Chicago', 'San Francisco', { cost: 1840, time: 32, type: 'plane' });

// Kansas City Air routes
graph.addLink('Kansas City', 'New Orleans', { cost: 690, time: 12, type: 'plane' });
graph.addLink('Kansas City', 'Chicago', { cost: 400, time: 7, type: 'plane' });
graph.addLink('Kansas City', 'Nashville', { cost: 470, time: 7.9, type: 'plane' });

graph.addLink('New Orleans', 'Kansas City', { cost: 690, time: 12, type: 'plane' });
graph.addLink('Chicago', 'Kansas City', { cost: 400, time: 7, type: 'plane' });
graph.addLink('Nashville', 'Kansas City', { cost: 470, time: 7.9, type: 'plane' });

// New Orleans Air routes
graph.addLink('New Orleans', 'Chicago', { cost: 840, time: 14, type: 'plane' });
graph.addLink('New Orleans', 'Nashville', { cost: 490, time: 8.2, type: 'plane' });

graph.addLink('Chicago', 'New Orleans', { cost: 840, time: 14, type: 'plane' });
graph.addLink('Nashville', 'New Orleans', { cost: 490, time: 8.2, type: 'plane' });

// ChicagoAir routes
graph.addLink('Chicago', 'Nashville', { cost: 410, time: 14, type: 'plane' });

graph.addLink('Nashville', 'Chicago', { cost: 410, time: 14, type: 'plane' });

// US MID Train routes
graph.addLink('Kansas City', 'Nashville', { cost: 190, time: 74, type: 'train' });
graph.addLink('Kansas City', 'Chicago', { cost: 170, time: 58, type: 'train' });
graph.addLink('Kansas City', 'New Orleans', { cost: 300, time: 114, type: 'train' });
graph.addLink('New Orleans', 'Chicago', { cost: 320, time: 123, type: 'train' });
graph.addLink('Chicago', 'Nashville', { cost: 170, time: 63.3, type: 'train' });
graph.addLink('New Orleans', 'Nashville', { cost: 190, time: 70.9, type: 'train' });

graph.addLink('Nashville', 'Kansas City', { cost: 190, time: 74, type: 'train' });
graph.addLink('Chicago', 'Kansas City', { cost: 170, time: 58, type: 'train' });
graph.addLink('New Orleans', 'Kansas City', { cost: 300, time: 114, type: 'train' });
graph.addLink('Chicago', 'New Orleans', { cost: 320, time: 123, type: 'train' });
graph.addLink('Nashville', 'Chicago', { cost: 170, time: 63.3, type: 'train' });
graph.addLink('Nashville', 'New Orleans', { cost: 190, time: 70.9, type: 'train' });
