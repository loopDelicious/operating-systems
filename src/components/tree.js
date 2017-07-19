import React, { Component } from 'react';
import JSONTree from 'react-json-tree';
import '../css/tree.css';
import json from '../../public/flare.json';

// https://github.com/alexkuz/react-json-tree

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
};

class Tree extends Component {

    render() {
        return (
            <div className="width">
                <p>This JSON tree provides an alternative view of the above illustration. Click the arrows on the left to expand and collapse each operating system to view ancestral relationships.</p>
                <p>Note:  the quantities listed as size are scaled estimates of market share based on <a href="https://w3techs.com/technologies/overview/operating_system/all" target="_blank">survey data from W3Techs</a> in 2017, meaning they are relative (not absolute) quantities used to produce the data visualization above.</p>
                <JSONTree data={json}
                    theme={theme}
                    invertedTheme={true}
                    shouldExpandNode={(keyName, data, level) => {if(level === 0 | 1){return true;}}}
                />
            </div>
        )
    }
}

export default Tree;
