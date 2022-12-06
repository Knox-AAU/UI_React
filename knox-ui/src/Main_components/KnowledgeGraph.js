import React from 'react'
import '../Css/KnowledgeGraph.css';
import * as d3 from 'd3';


var triples = [];
var searchstring = "";

const KnowledgeGraph = props => {
const KeyLogger = (KeyPressed) => {
    searchstring = KeyPressed.target.value;
}
  const onClick = (searchText) => {
    searchText = searchstring;
    Search(searchText);
}
    function Search(id) {
        document.getElementById('table').innerHTML = "";
        document.getElementById('svg-body').innerHTML = "";
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3030/SNOMEDTEST?query=PREFIX+skos%3A%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3ESELECT+%3FSUBJECT+%3FPREDICATE+%3FOBJECT+where%7B%0A++%3Chttp%3A%2F%2Fwww.example.org%2F'+id+'%3E+(skos%3A%7C!skos%3A)%7B0%7D+%3FSUBJECT.%0A++%3FSUBJECT+%3FPREDICATE+%3FOBJECT+%0A%7DLIMIT+150%0A', true);
        xhr.withCredentials = true;
        xhr.send(null);
        xhr.onloadend = (event) => {ResponseToTable(xhr.response)};
       
    }

    function ResponseToTable(response){
    var data = JSON.parse(response)
    data = data.results.bindings;
    var subject = [];
    var predicate = [];
    var object = [];
    var TableData=[];

      data.forEach(element => {
      subject.push(element.SUBJECT.value)
      predicate.push(element.PREDICATE.value)
      object.push(element.OBJECT.value)
    });

    TableData.push("<tr><th>SUBJECT</th><th>PREDICATE</th><th>OBJECT</th></tr>");
      for (let i = 0; i < subject.length; i++) {
        TableData.push("<tr><td><a href='"+subject[i]+"'>"+subject[i]+"</a></td><td><a href='"+predicate[i]+"'>"+predicate[i]+"</a></td><td><a href='"+object[i]+"'>"+object[i]+"</a></td></tr>")
      }
    
      for (let i = 0; i < TableData.length; i++) {
        document.getElementById('table').innerHTML += TableData[i];  
      }

    if(subject.length < 300 ){
      ResponseToKG(subject,predicate,object);
    }
    }

    function ResponseToKG(subject, predicate, object){
    for (let i = 0; i < subject.length; i++) {
      triples.push({subject:subject[i],predicate:predicate[i],object:object[i]});

    }
    if(triples.length < 200){
      hej();
    }
    }
    function filterNodesById(nodes,id){
      return nodes.filter(function(n) { return n.id === id; });
    }
    
    function filterNodesByType(nodes,value){
      return nodes.filter(function(n) { return n.type === value; });
    }
    
    function triplesToGraph(svg){
    
      svg.html("");
      //Graph
      var graph={nodes:[], links:[], triples:[]};
      
      //Initial Graph from triples
      triples.forEach(function(triple){
        var subjId = triple.subject;
        var predId = triple.predicate;
        var objId = triple.object;
        
        var subjNode = filterNodesById(graph.nodes, subjId)[0];
        var objNode  = filterNodesById(graph.nodes, objId)[0];
        
        if(subjNode==null){
          subjNode = {id:subjId, label:subjId, weight:1, type:"node"};
          graph.nodes.push(subjNode);
        }
        
        if(objNode==null){
          objNode = {id:objId, label:objId, weight:1, type:"node"};
          graph.nodes.push(objNode);
        }
        
        var predNode = {id:predId, label:predId, weight:1, type:"pred"} ;
        graph.nodes.push(predNode);
        
        var blankLabel = "";
        
        graph.links.push({source:subjNode, target:predNode, predicate:blankLabel, weight:1});
        graph.links.push({source:predNode, target:objNode, predicate:blankLabel, weight:1});
        
        graph.triples.push({s:subjNode, p:predNode, o:objNode});
        
      });
      
      return graph;
    }
    
    function update(svg, force, graph){
      // ==================== Add Marker ====================
      svg.append("svg:defs").selectAll("marker")
        .data(["end"])
        .enter().append("svg:marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 30)
        .attr("refY", -0.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("svg:polyline")
        .attr("points", "0,-5 10,0 0,5")
        ;
      // ==================== Add Links ====================
       var links = svg.selectAll(".link")
                .data(graph.triples)
                .enter()
                .append("path")
                  .attr("marker-end", "url(#end)")
                  .attr("class", "link")
              ;
                  
      // ==================== Add Link Names =====================
      var linkTexts = svg.selectAll(".link-text")
            .data(graph.triples)
            .enter()
            .append("text")
              .attr("class", "link-text")
              .text( function (d) { return d.p.label; })
            ;
  
        //linkTexts.append("title")
        //		.text(function(d) { return d.predicate; });
      // ==================== Add Node =====================
      var nodes = svg.selectAll(".node")
                .data(filterNodesByType(graph.nodes, "node"))
                .enter()
                .append("circle")
                  .attr("class", "node")
                  .call(force.drag)
              ;//nodes		
      // ==================== Add Link Names =====================
      var nodeTexts = svg.selectAll(".node-text")
            .data(filterNodesByType(graph.nodes, "node"))
            .enter()
            .append("text")
              .attr("class", "node-text")
              .text( function (d) { return d.label; })
            ;
  
        //nodeTexts.append("title")
        //		.text(function(d) { return d.label; });
      
      
      
      // ==================== Force ====================
      var color = d3.scale.category20();
      force.on("tick", function() {
        nodes
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
          .attr("r", function(d){return d.weight+8})
          .style("fill",function(d,i){return color(i);})
          ;
            
        links
          .attr("d", function(d) {
              return "M" 	+ d.s.x + "," + d.s.y
                    + "S" + d.p.x + "," + d.p.y
                    + " " + d.o.x + "," + d.o.y;
            })	
          ;
                   
        nodeTexts
          .attr("x", function(d) { return d.x + 12 ; })
          .attr("y", function(d) { return d.y + 3; })
          
          
          ;
          
  
        linkTexts
          .attr("x", function(d) { return 4 + (d.s.x + d.p.x + d.o.x)/3  ; })
          .attr("y", function(d) { return 4 + (d.s.y + d.p.y + d.o.y)/3 ; })
          
          ;
      });
      
      // ==================== Run ====================
      force
        .nodes(graph.nodes)
        .links(graph.links)
        .charge(-500)
        .linkDistance(100)
        .start()
        ;
        
    }
    function hej(){
      var svg = d3.select("#svg-body").append("svg")
				.attr("id",id())
				.call(d3.behavior.zoom().on("zoom", function () {
    			svg.attr("transform", "translate(" + d3.event.translate + ")   scale(" + d3.event.scale + ")")
  				}))
  				.append("g")
				;
				
	var force = d3.layout.force().size([1000, 500]);
	
	var graph = triplesToGraph(svg);
  console.log(graph);
  update(svg, force, graph);
  triples = [];
    }
    function id(){
      return "kl";
    }
    
  
    return(
      
      <div className="ContentOfPage">
        <h1>Healthcare</h1>
        
        
            <input type="text" placeholder="Enter patient id" id="search" onChange={KeyLogger}></input>
            <button onClick={onClick}><i className="fa fa-search"></i>search</button>
        
        
        
        
          <div id="tableblock">
          <table  id="table"></table>   
          </div>

      
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
          <script src="http://d3js.org/d3.v3.min.js"></script>
          <div id="svg-body"><g></g></div>
                </div>
    )
}
   
  export default KnowledgeGraph