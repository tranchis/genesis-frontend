$(document).ready(function() {
  $('.example-countries .typeahead').typeahead({
    name: 'countries',
    remote: 'http://genesis.sergio-alvarez.com:3000/autocomplete-director/%QUERY',
    limit: 10
  }).on('typeahead:selected', function (obj, datum) {
	  var loader = document.getElementById('loader');
	  var parent = document.getElementById('parent');

	  loader.style.visibility="visible";
	  parent.style.visibility="hidden";
	  $.getJSON("http://genesis.sergio-alvarez.com:3000/from-director/" + encodeURIComponent(datum.value), function(data) {
	    var nodes = data[0]
	      , links = data[1]
	      , el = document.getElementById("parent")
	      , options = {
	          width: screen.width,
	          height: screen.height,
	          colors: { "7": "blue" }
	        };

	    graph = new Insights(el, nodes, links, options)
	      .zoom(.85)
	      .focus({ text: "color" }, { in: 1 })
	      .center()
	      .render();

	    graph.on('rendered', function() {
	  	  loader.style.visibility="hidden";
		  parent.style.visibility="visible";
	    })

	    graph.on("node:click", function(d) {
	      console.log("click", d);
	    });

	    graph.on("node:mouseover", function(d, offset) {
	      console.log("mouseover", d, offset);
	    });

	    graph.on("node:mouseout", function(d, offset) {
	      console.log("mouseout", d, offset);
	    });

	    graph.tooltip("<div>word: {{text}}</div><div>count: {{count}}</div>");
	  });
  });
});
