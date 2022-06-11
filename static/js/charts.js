function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleData = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var dataFilter = sampleData.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result1 = dataFilter [0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuID = result1.otu_ids;
    var labels = result1.otu_labels;
    var values = result1.sample_values

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var xticks = values.slice(0,10).reverse();
    var yticks = otuID.slice(0,10).map(OTU => "OTU " + OTU).reverse();

    // 8. Create the trace for the bar chart. 
    var trace = {
      type: "bar",
      x: xticks,
      y: yticks,
      orientation: "h",
 
    }
    
    var barData = [trace];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      width: 400,
      height: 350
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar',barData,barLayout);

    //bubble chart
      // 1. Create the trace for the bubble chart.
      var bubbleTrace = {
        x: otuID,
        y: values,
        mode: 'markers',
        hovertext: labels,
        marker: {
          color: otuID,
          size: values,
          colorscale: "YlGnBu"
        }
      };
      
      var bubbleData = [bubbleTrace];
  
      // 2. Create the layout for the bubble chart.
      var bubbleLayout = {
        title: "Bacteria Cultures per Sample",
        xaxis: {title: "OTU IDs"},
        hovermode: 'closest',
        width: 1135,
        
      };
  
      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot('bubble',bubbleData,bubbleLayout); 


      //gauge plot

// 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
   // console.log(metadata);
    // Create a variable that holds the first sample in the array.
    // 2. Create a variable that holds the first sample in the metadata array.
   // var result2 = data.metadata[0];
    var gaugeFilter = metadata.filter(sampleObj => sampleObj.id == sample);
    var result2 =gaugeFilter[0];
    console.log(result2);

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    // 3. Create a variable that holds the washing frequency.
    var wfreq = result2.wfreq;
    console.log(wfreq);
 
    // 4. Create the trace for the gauge chart.
    var gaugeTrace = {
      type: "indicator",
      mode: "gauge+number",
      value: wfreq,
      title: {text: "Belly button Washing Frequency"},
      gauge: {
        axis: {range: [0,10] , tickwidth: 3, tickcolor: "black"},
        bar: {color:"black"},
        steps: [
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "forestgreen"},
          {range: [8,10], color: "darkgreen"},

        ]
      }

    }
    
    var gaugeData = [gaugeTrace];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 450,
      height: 350,
      margin: {t: 0, b: 0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData,gaugeLayout);
  });
}

  


