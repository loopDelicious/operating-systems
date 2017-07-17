import React, { Component } from 'react';
import '../css/App.css';
import * as d3 from 'd3';

class App extends Component {

    componentDidMount = () => {

        let svg = d3.select("svg"),
            margin = 20,
            diameter = +svg.attr("width"),
            g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        let color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(225,30%,49%)", "hsl(46,83%,76%)", "hsl(19,89%,67%)"])
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
              <div id="intro">
                  <div className="width">
                      <h2>Server Operating Systems</h2>
                      <h3>
                          <i className="fa fa-medium fa-lg" /> Read on <a href="https://medium.com/@joycelin.codes/always-be-coding-regional-differences-in-programming-languages-9957785dd4e6#.oq7bf9wki">Medium</a>
                          <span className="spacer"> | </span>
                          <i className="fa fa-github fa-lg" /> Fork me on <a href="https://github.com/loopDelicious/indeed">Github</a>
                      </h3>

                  </div>
              </div>
              <p className="section">This is a family tree and market share estimate of (mostly) current server operating systems.</p>
              <svg id="bubbles" width="960" height="960" />
          </div>
        );
    }
}

export default App;
