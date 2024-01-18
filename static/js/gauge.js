function drawGauge(svg, arc, scale, value, maxValue, numSegments) {
    defineGradients(svg, numSegments);

    for (let i = 0; i < numSegments; i++) {
        const startAngle = scale(i * maxValue / numSegments);
        const endAngle = scale((i + 1) * maxValue / numSegments);

        svg.append('path')
            .attr('class', `segment-${i}`) // Assign class for selection
            .datum({ value: endAngle })
            .style('fill', `url(#gradient-${i})`)
            .attr('d', arc.startAngle(startAngle).endAngle(endAngle));
        }
}

function updateGauge(svg, arc, scale, newValue, numSegments, maxValue) {
    for (let i = 0; i < numSegments; i++) {
        const startAngle = scale(i * maxValue / numSegments);
        let endAngle = scale((i + 1) * maxValue / numSegments);

        if ((i + 1) * maxValue / numSegments > newValue) {
            endAngle = newValue < i * maxValue / numSegments ? startAngle : scale(newValue);
        }

        svg.select(`path.segment-${i}`)
            .datum({ startAngle: startAngle, endAngle: endAngle })
            .transition()
            .duration(5) // Transition duration of 5ms
            .attrTween("d", arcTween);
    }
}

function arcTween(d) {
    var i = d3.interpolate(d.startAngle, d.endAngle);
    return function(t) {
        d.endAngle = i(t);
        return arc(d);
    };
}

function startColor(index, numSegments) {
    const red = 255;
    const green = 255 - (index / numSegments * 255);
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
}

function endColor(index, numSegments) {
    const red = 255;
    const green = 255 - ((index + 1) / numSegments * 255);
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
}

function defineGradients(svg, numSegments) {
    const defs = svg.append("defs");

    for (let i = 0; i < numSegments; i++) {
        const gradient = defs.append("linearGradient")
            .attr("id", `gradient-${i}`)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", "100%").attr("y2", "0%");

        gradient.append("stop").attr("offset", "0%").attr("stop-color", startColor(i, numSegments));
        gradient.append("stop").attr("offset", "100%").attr("stop-color", endColor(i, numSegments));
    }
}

const width = 1080, height = 560;
const radius = Math.min(width, height) / 2;
const innerRadius = 0.8 * radius;
const numSegments = 100;
const maxValue = 7000;

const svg = d3.select('#gaugeChart')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

const scale = d3.scaleLinear()
    .range([-Math.PI / 2, Math.PI / 2]) // Vertical alignment
    .domain([0, maxValue]);

const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

drawGauge(svg, arc, scale, 0, maxValue, numSegments);
//testGauge();