import * as d3 from 'd3';
const MARGIN = { TOP: 0, RIGHT: 10, BOTTOM: 50, LEFT: 50 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 600 - MARGIN.TOP - MARGIN.BOTTOM;

export class D3Chart {
    constructor(element) {
        const vis = this;
        vis.svg = d3
            .select(element)
            .append('svg')
            .attr('width', WIDTH + MARGIN.RIGHT + MARGIN.LEFT)
            .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

        vis.g = vis.svg
            .append('g')
            .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
            .attr('width', WIDTH)
            .attr('height', HEIGHT);

        // TITLES
        vis.title = vis.g
            .append('text')
            .attr('x', WIDTH / 2)
            .attr('y', HEIGHT + 40)
            .attr('text-anchor', 'middle')
            .text("The World's Tallest Men");

        // TITLES
        vis.svg
            .append('text')
            .attr('x', -HEIGHT / 2)
            .attr('y', 15)
            .attr('text-anchor', 'middle')
            .text('Height in cm')
            .attr('transform', `rotate(-90)`);

        // Axis Groups
        vis.xAxisGroup = vis.g.append('g').attr('transform', `translate(0, ${HEIGHT})`);
        vis.yAxisGroup = vis.g.append('g');

        Promise.all([
            d3.json('https://udemy-react-d3.firebaseio.com/tallest_men.json'),
            d3.json('https://udemy-react-d3.firebaseio.com/tallest_women.json')
        ]).then(dataSets => {
            vis.menData = dataSets[0];
            vis.womenData = dataSets[1];

            vis.update('men');
        });
    }

    update(gender) {
        const vis = this;
        if (gender === 'men') {
            vis.data = vis.menData;
            vis.title.text("The World's Tallest Men");
        } else {
            vis.data = vis.womenData;
            vis.title.text("The World's Tallest Women");
        }

        // SCALES
        const x = d3
            .scaleBand()
            .domain(vis.data.map(d => d.name))
            .range([0, WIDTH])
            .paddingInner(0.1)
            .paddingOuter(0.2);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(vis.data, d => d.height)])
            .range([HEIGHT, 0]);

        // AXIS
        const xAxiscall = d3.axisBottom(x);
        vis.xAxisGroup
            .transition()
            .duration(500)
            .call(xAxiscall);

        const yAxiscall = d3.axisLeft(y);
        vis.yAxisGroup
            .transition()
            .duration(500)
            .call(yAxiscall);

        // ADD BARS
        // Join
        const rect = vis.g.selectAll('rect').data(vis.data);

        //Exit
        rect.exit()
            .transition()
            .duration(500)
            .attr('height', 0)
            .attr('y', HEIGHT)
            .remove();

        // Update
        rect.transition()
            .duration(500)
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.height))
            .attr('width', x.bandwidth)
            .attr('height', d => HEIGHT - y(d.height))
            .attr('fill', 'grey');

        // Enter
        rect.enter()
            .append('rect')
            .attr('x', d => x(d.name))
            .attr('width', x.bandwidth)
            .attr('fill', 'grey')
            .attr('y', HEIGHT)
            .transition()
            .duration(500)
            .attr('height', d => HEIGHT - y(d.height))
            .attr('y', d => y(d.height));
    }
}

export default D3Chart;
