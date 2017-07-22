import React, { Component } from 'react';
import '../css/circles.css';
import * as d3 from 'd3';

class Circle extends Component {

    componentDidMount = () => {

        // https://bl.ocks.org/mbostock/7607535

        let svg = d3.select("svg#pic-bubbles"),
            margin = 20,
            diameter = +svg.attr("width"),
            g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        let color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(225,30%,49%)", "hsl(46,83%,76%)"])
            .interpolate(d3.interpolateHcl);

        let pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        d3.json("flare.json", function(error, root) {
            if (error) throw error;

            root = d3.hierarchy(root)
                .sum(function(d) { return d.size; })
                .sort(function(a, b) { return b.value - a.value; });

            let focus = root,
                nodes = pack(root).descendants(),
                view;

            let circle = g.selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
                .style("fill", function(d) { return d.children ? color(d.depth) : null; })
                .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

            let text = g.selectAll("text")
                .data(nodes)
                .enter().append("text")
                .attr("class", "label")
                .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
                .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
                .text(function(d) { return d.data.name; });

            let node = g.selectAll("circle,text");

            svg
                .style("background", color(-1))
                .on("click", function() { zoom(root); });

            zoomTo([root.x, root.y, root.r * 2 + margin]);

            function zoom(d) {
                let focus0 = focus; focus = d;

                let transition = d3.transition()
                    .duration(d3.event.altKey ? 7500 : 750)
                    .tween("zoom", function(d) {
                        let i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                        return function(t) { zoomTo(i(t)); };
                    });

                transition.selectAll("text")
                    .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                    .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
                    .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                    .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
            }

            function zoomTo(v) {
                let k = diameter / v[2]; view = v;
                node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
                circle.attr("r", function(d) { return d.r * k; });
            }
        });
    };

    // for /public/flare.json
    // for server market share: https://w3techs.com/technologies/overview/operating_system/all
    // for server market share: https://en.wikipedia.org/wiki/Usage_share_of_operating_systems
    // for ancestral checks: https://en.wikipedia.org/wiki/Comparison_of_operating_systems
    // for linux distribution attributions: https://en.wikipedia.org/wiki/Linux_distribution
    // for non-linux unix OS: http://www.makeuseof.com/tag/3-unix-like-operating-systems-arent-linux/

    render() {
        return (

          <div className="width circles">
            <h2>By market share</h2>
            <p className="section">This is a representation of the same data by market share, an estimate of (mostly) current web server operating systems. Usage of operating systems, especially for running web servers, is an imprecise measure for many reasons - so here's one ballpark estimate.</p>
            <p className="section">Click on a smaller circle to zoom in, or a larger circle to zoom out. See which operating systems are derived from parent operating systems.</p>
            <svg id="pic-bubbles" width="960" height="500" viewBox="0 200 960 500" />
          </div>

        );
    }
}

export default Circle;
