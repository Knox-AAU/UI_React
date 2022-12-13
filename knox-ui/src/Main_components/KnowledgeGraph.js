import React from 'react'
import '../Css/KnowledgeGraph.css';
import * as d3 from 'd3';

var searchstring = "";
var triples = [];
var maxTriples = prompt("Max amount of triples to be visualized as a force-directed graph");
var subject = [];
var predicate = [];
var object = [];
var TableData=[];

var LabelSubject = [];
var LabelPredicate = [];
var LabelObject = [];




const KnowledgeGraph = props => {
const KeyLogger = (KeyPressed) => {
    searchstring = KeyPressed.target.value;
}
  const onClick = (searchText) => {
    searchText = searchstring;
    document.getElementById('table').innerHTML = "";
    document.getElementById('svg-body').innerHTML = "";
    document.getElementById('status').innerHTML="";
    triples = [];
    subject = [];
    predicate = [];
    object = [];
    TableData=[];
    LabelSubject = [];
    LabelPredicate = [];
    LabelObject = [];
    Search(searchText);
}
    function Search(id) {
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3030/SNOMEDTEST?query=PREFIX+skos%3A%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3ESELECT+%3FSUBJECT+%3FPREDICATE+%3FOBJECT+where%7B%0A++%3Chttp%3A%2F%2Fwww.example.org%2F'+id+'%3E+(skos%3A%7C!skos%3A)%7B0%7D+%3FSUBJECT.%0A++%3FSUBJECT+%3FPREDICATE+%3FOBJECT+%0A%7DLIMIT+150%0A', true);
        xhr.withCredentials = true;
        xhr.send(null);
        xhr.onloadend = (event) => {if(xhr.status===200){ResponseToTable(ResponseParser(xhr.response))}else{document.getElementById('status').innerHTML="INVALID PATIENT ID"};};
        
    } 
    function FindLabels(QueryString) {    
      const xhr = new XMLHttpRequest();
      xhr.open('GET', QueryString, true);
      xhr.withCredentials = true;
      xhr.send(null);
      xhr.onloadend = (event) => {if(xhr.status===200){ResponseToKG(LabelResponseParser(xhr.response))}else{document.getElementById('status').innerHTML="INVALID PATIENT ID"}};  
  } 

  function GenerateLabelTriplesQuery(data){
  var QueryString = "http://localhost:3030/SNOMEDTEST?query="+encodeURIComponent("PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> SELECT ?label ?id WHERE{")
  
  for (let i = 0; i < subject.length; i++) {
    if(i !== subject.length-1){
      QueryString += encodeURIComponent("{{<"+subject[i]+"> rdfs:labe* ?id}optional{<"+subject[i]+"> rdfs:label ?label}}union");
      QueryString += encodeURIComponent("{{<"+predicate[i]+"> rdfs:labe* ?id}optional{<"+predicate[i]+"> rdfs:label ?label}}union");
      QueryString += encodeURIComponent("{{<"+object[i]+"> rdfs:labe* ?id}optional{<"+object[i]+"> rdfs:label ?label}}union");
    }else{
      QueryString += encodeURIComponent("{{<"+subject[i]+"> rdfs:labe* ?id}optional{<"+subject[i]+"> rdfs:label?label}}union");
      QueryString += encodeURIComponent("{{<"+predicate[i]+"> rdfs:labe* ?id}optional{<"+predicate[i]+"> rdfs:label ?label}}union");
      QueryString += encodeURIComponent("{{<"+object[i]+"> rdfs:labe* ?id}optional{<"+object[i]+"> rdfs:label ?label}}}");
    }
  }
  FindLabels(QueryString);
  }

  function LabelResponseParser(response){
    
    var data = JSON.parse(response);
    data = data.results.bindings;
    for (let i = 0; i < data.length; i+=3) {
      if(data[i].label !== undefined){LabelSubject.push(data[i].label.value)}else{LabelSubject.push(data[i].id.value)}
      if(data[i+1].label !== undefined){LabelPredicate.push(data[i+1].label.value)}else{LabelPredicate.push(data[i+1].id.value)}
      if(data[i+2].label !== undefined){LabelObject.push(data[i+2].label.value)}else{LabelObject.push(data[i+2].id.value)}
      
    }
    return data
  }
      
  function ResponseParser(response){
    var data = JSON.parse(response);
    data = data.results.bindings;
    data.forEach(element => {
      subject.push(element.SUBJECT.value)
      predicate.push(element.PREDICATE.value)
      object.push(element.OBJECT.value)
  });
  return data;
  }
    function ResponseToTable(data){

    TableData.push("<tr><th>SUBJECT</th><th>PREDICATE</th><th>OBJECT</th></tr>");
      for (let i = 0; i < subject.length; i++) {
        TableData.push("<tr><td><a href='"+subject[i]+"'>"+subject[i]+"</a></td><td><a href='"+predicate[i]+"'>"+predicate[i]+"</a></td><td><a href='"+object[i]+"'>"+object[i]+"</a></td></tr>")
      }
    
      for (let i = 0; i < TableData.length; i++) {
        document.getElementById('table').innerHTML += TableData[i];  
      }
      if(subject.length < maxTriples){
        GenerateLabelTriplesQuery(undefined);
      }
    }

    function ResponseToKG(){
    for (let i = 0; i < LabelSubject.length; i++) {
      triples.push({subject:LabelSubject[i],predicate:LabelPredicate[i],object:LabelObject[i]});
    }
    VisualizeFDG();
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
      // ==================== Add Node =====================
      var nodes = svg.selectAll(".node")
                .data(filterNodesByType(graph.nodes, "node"))
                .enter()
                .append("circle")
                  .attr("class", "node")
                  .call(force.drag)
                  ;		
      // ==================== Add Link Names =====================
      var nodeTexts = svg.selectAll(".node-text")
            .data(filterNodesByType(graph.nodes, "node"))
            .enter()
            .append("text")
              .attr("class", "node-text")
              .text( function (d) { return d.label; })
              ;      
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

    function VisualizeFDG(){
      var svg = d3.select("#svg-body").append("svg")
				.attr("id",id())
				.call(d3.behavior.zoom().on("zoom", function () {
    			svg.attr("transform", "translate(" + d3.event.translate + ")   scale(" + d3.event.scale + ")")
  				}))
  				.append("g")
				;
				
	var force = d3.layout.force().size([1000, 500]);
	
	var graph = triplesToGraph(svg);
  update(svg, force, graph);
  triples = [];
  
    }

    function id(){
      return "kl";
    }
    
  
    return(
      
      <div className="ContentOfPage">
        <h1>Healthcare</h1>
        <p id="status"></p>
        
        
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