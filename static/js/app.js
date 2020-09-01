function getData(selectedID) {

    d3.json("samples.json").then((data) => {
        console.log(`get data and build plot for ${selectedID}`)
        console.log(data);

         // .filter data.samples for the selectedID
        // 14.2..9
// function filterSelected(id) {
//     return id.names == 1;
// };
// var filtered = data.samples.filter(selectedID);
//     console.log(filtered);

        var values = data.samples[0].sample_values;
        var ids = data.samples[0].otu_ids;
        var labels = data.samples[0].otu_labels;

        buildPlot(values, ids, labels);
        console.log(values, ids, labels);
        buildTable(values,ids,labels);
        buildBubble(values,ids,labels);

    });
};
// get Data for initial page load
getData(940);

// not updating anything...

function buildTable(values,ids,labels) {
    var table = d3.select("#sample-metadata");
    var tbody = table.select("tbody");
    var trow;
    for (var j=0; j<10; j++) {
        trow = tbody.append("tr");
        trow.append("td").text(ids[j]);
        trow.append("td").text(labels[j]);
        trow.append("td").text(values[j]);
    }
}

// Bar chart
function buildPlot(values, ids, labels) {
    // .slice() 15.2..6
    // var topTen = top.names.slice(0,10);
    // console.log(topTen);
    var trace1 = {
        x: ids,
        y: values,
        type: "bar",
        text: labels,

    };
  
    var data = [trace1];

    var layout = {
        title: "Sample Values by IDs",
        xaxis: { title: "IDs" },
        yaxis: { title: "Sample Values" },
    };
 
    Plotly.newPlot("bar", data, layout);
};
// Bubble chart
function buildBubble(values,ids,labels) {
    var trace2 = {
            x: ids,
            y: values,
            mode: 'markers',
            marker: {
              color: ids,
              size: values,
              text: labels,
            }
          };
          
          var data1 = [trace2];
          
          var layout1 = {
            title: 'Biodiversity Size and Color',
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: { title: "IDs" },
          };
          
          Plotly.newPlot('bubble', data1, layout1);

    }



// update drop down menu
function updateDropDown() {
    d3.json("samples.json").then((data) => {
        var dropdownmenu = d3.select("#selDataset");


        for (var i = 0; i < data.names.length; i++) {
            dropdownmenu
                .append("option")
                .text(data.names[i])
                .property("value", data.names[i]);

        }
    });

}
updateDropDown();


// get value when drop down value is changed by user

function optionChanged(selectedID) {
    // run this code whendropdown changes
    console.log(`option changed for ${selectedID}`)

    // get data for selected option
    getData(selectedID)
}