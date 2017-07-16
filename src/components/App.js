import React, { Component } from 'react';
import '../css/App.css';
import * as d3 from 'd3';

// const cssparser = require("cssparser");
// const parser = new cssparser.Parser();
// const astVariables = parser.parse('raw-loader!../css/variables.css');
import astVariables from 'raw-loader!../css/variables.css';
console.log(astVariables);
// const jsonVariables = astVariables.toJSON(type);

// const parser = require('css-variables-parser');
// const variables = parser.parseFile('../css/variables.css');
// const variables = parser.parse(':root { --color-primary: red; }');

class App extends Component {

    componentDidMount = () => {

        let svg = d3.select("svg"),
            margin = 20,
            diameter = +svg.attr("width"),
            g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        let color = d3.scaleLinear()
            .domain([-1, 5])
            .range([astVariables["main-color"], "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);

        let pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        d3.json("flare.json", function (error, root) {
            if (error) throw error;

            root = d3.hierarchy(root)
                .sum(function (d) {
                    return d.size;
                })
                .sort(function (a, b) {
                    return b.value - a.value;
                });

            let focus = root,
                nodes = pack(root).descendants(),
                view;

            let circle = g.selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("class", function (d) {
                    return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
                })
                .style("fill", function (d) {
                    return d.children ? color(d.depth) : null;
                })
                .on("click", function (d) {
                    if (focus !== d) {
                        zoom(d)
                    } else {
                        d3.event.stopPropagation();
                    }
                });

            let text = g.selectAll("text")
                .data(nodes)
                .enter().append("text")
                .attr("class", "label")
                .style("fill-opacity", function (d) {
                    return d.parent === root ? 1 : 0;
                })
                .style("display", function (d) {
                    return d.parent === root ? "inline" : "none";
                })
                .text(function (d) {
                    return d.data.name;
                });

            let node = g.selectAll("circle,text");

            svg
                .style("background", color(-1))
                .on("click", function () {
                    zoom(root);
                });

            zoomTo([root.x, root.y, root.r * 2 + margin]);

            function zoom(d) {
                let focus0 = focus;
                focus = d;

                let transition = d3.transition()
                    .duration(d3.event.altKey ? 7500 : 750)
                    .tween("zoom", function (d) {
                        let i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                        return function (t) {
                            zoomTo(i(t));
                        };
                    });

                transition.selectAll("text")
                    .filter(function (d) {
                        return d.parent === focus || this.style.display === "inline";
                    })
                    .style("fill-opacity", function (d) {
                        return d.parent === focus ? 1 : 0;
                    })
                    .on("start", function (d) {
                        if (d.parent === focus) this.style.display = "inline";
                    })
                    .on("end", function (d) {
                        if (d.parent !== focus) this.style.display = "none";
                    });
            }

            function zoomTo(v) {
                let k = diameter / v[2];
                view = v;
                node.attr("transform", function (d) {
                    return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
                });
                circle.attr("r", function (d) {
                    return d.r * k;
                });
            }
        });
    };

    render() {
        return (
          <div className="App">
              <svg width="960" height="960" />
          </div>
        );
    }
}

export default App;
