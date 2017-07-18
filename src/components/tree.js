import React, { Component } from 'react';
import JSONTree from 'react-json-tree';
import '../css/tree.css';
import json from '../../public/flare.json';

// const json = {
//     array: [1, 2, 3],
//     bool: true,
//     object: {
//         foo: 'bar'
//     }
// };

class Tree extends Component {

    render() {
        return (
            <div className="width">
                <JSONTree data={json} />
            </div>
        )
    }
}

export default Tree;
