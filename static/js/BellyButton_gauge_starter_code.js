// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    // Create a variable that holds the first sample in the array.
    var gaugeFilter = metadata.filter(sampleObj => sampleObj.id === sample);
  

    // 2. Create a variable that holds the first sample in the metadata array.
    var result2 = gaugeFilter[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
    var wfreq = result2.wrfeq;
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeTrace = {
      type: "indicator",
      mode: "gauge+number",
      value: wfreq,
      title: {text: "Belly button wash frequency"},
      gauge: {
        axis: {range: [0,10] , tickwidth: 3, tickcolor: "black"},
        bar: {color:"black"},
        steps: [
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "forestgreen"},
          {range: [6,8], color: "darkgreen"},

        ]
      }

    }
    
    var gaugeData = [gaugeTrace];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 400,
      margin: {t: 0, b: 0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData,gaugeLayout);
  });
}
