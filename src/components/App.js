import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <div id="intro">
                    <div className="width">
                        <h2>Evolution of Web Server Operating Systems</h2>
                        <h3>
                            by <a href="https://meowsergirl.com/">Joyce Lin</a>
                            <span className="spacer"> | </span>
                            <i className="fa fa-medium fa-lg" /> Read on <a href="https://medium.com/@joycelin.codes/always-be-coding-regional-differences-in-programming-languages-9957785dd4e6#.oq7bf9wki">Medium</a>
                            <span className="spacer"> | </span>
                            <i className="fa fa-github fa-lg" /> Fork me on <a href="https://github.com/loopDelicious/operating-systems">Github</a>

                        </h3>

                    </div>
                </div>
                <div className="intro-p">
                    <div className="width">
                        <div className="section intro-text">
                            <p>Ever wonder why we choose certain operating systems to run our web servers? Read the <a href="https://medium.com/@joycelin.codes/always-be-coding-regional-differences-in-programming-languages-9957785dd4e6#.oq7bf9wki">full story on Medium</a>.</p>
                            <p>Have your own story to tell? <a href="https://github.com/loopDelicious/operating-systems">Fork this project on GitHub</a> and make your own visualizations.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
