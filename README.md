### Evolution of web server operating systems

Data visualization using React and D3 to illustrate the evolution of (mostly) modern web server operating systems, using survey data from [W3Techs](https://w3techs.com/technologies/overview/operating_system/all) in 2017, among other sources.

[Deployed](http://os.meowsergirl.com/) using NGINX and Digital Ocean

[Blog post on Medium]()

### Visualization of OS lineage using D3 dendrogram
[![OS dendrogram](https://github.com/loopDelicious/operating-systems/blob/master/src/img/dendro.png)](https://github.com/loopDelicious/operating-systems/blob/master/src/img/dendro.png)

### OS lineage using D3 zoomable packed circles
[![Zoomable packed circles](https://github.com/loopDelicious/operating-systems/blob/master/src/img/zoom.gif)](https://github.com/loopDelicious/operating-systems/blob/master/src/img/zoom.gif)

### OS market share using relative values in JSON tree
[![JSON tree](https://github.com/loopDelicious/operating-systems/blob/master/src/img/jsonTree.png)](https://github.com/loopDelicious/operating-systems/blob/master/src/img/zoom.gif)

### Comparison with world religions using D3 dendrogram
[![Comparison with world religions](https://github.com/loopDelicious/operating-systems/blob/master/src/img/religion.png)](https://github.com/loopDelicious/operating-systems/blob/master/src/img/jsonTree.png)

### For development

Install dependencies
 
 `$ yarn install`  
    
Start React watcher
 
 `$ yarn start`    
    
### For deployment

#### First time

Secure shell into remote server

Update NGINX config

Clone repo

 `# git clone <your-repo>`

Install dependencies

 `# yarn`

Build react files

 `# yarn build`

#### Subsequent updates

Deploy from local environment via deploy script

`$ yarn deploy`

