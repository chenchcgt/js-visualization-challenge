// get data for plotting graphs based on selected dropdown value
function getData(selectedID) {
    if (!selectedID) {
        console.log('no id');
        return;
    }
    d3.json("samples.json").then((data) => {
        console.log(`get data and build plot for ${selectedID}`)
        console.log(data);

        // filter the selected data based on dropdown selection
        var filtered = data.samples.filter(row => row.id === selectedID);
        console.log(filtered);

        var values = [];
        var ids = [];
        var labels = [];

        filtered.forEach(element => {
            values = element.sample_values;
            ids = element.otu_ids;
            labels = element.otu_labels;
        });

        // call the functions for plotting charts
        buildPlot(values, ids, labels);
        console.log(values, ids, labels);
        buildBubble(values, ids, labels);

    });
};
// get Data for initial page load
getData();



// function to filter metadata from dataset and display demographic info

function buildTable(selectedID) {


    d3.json("samples.json").then((data1) => {
        console.log(`get data and build table for ${selectedID}`)
        // console.log(data);

        var filtered1 = data1.metadata.filter(row => row.id === Number(selectedID));
        console.log(filtered1);

        var table;
        // select summary table from html
        table = d3.select("#summary-table");
        // clear values prior to load
        table.html("");
        // populate and append values filtered to html
        Object.entries(filtered1[0]).forEach((key) => {
            table.append("tr").text(key[0] + ":" + key[1] + "\n");

        });

    });

};



// Bar chart
function buildPlot(values, ids, labels) {
    // format the ytick to concatenate the "OTU" + id
    var yticks = ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var trace1 = {
        x: values.slice(0, 10).reverse(),
        y: yticks,
        type: "bar",
        text: labels,
        orientation: "h",

    };

    var data1 = [trace1];

    var layout1 = {
        title: "Sample Values by IDs",
        xaxis: { title: "Sample Values" },


    };

    Plotly.newPlot("bar", data1, layout1);
};

// Bubble chart
function buildBubble(values, ids, labels) {
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

    var data2 = [trace2];

    var layout = {
        title: 'Biodiversity Sample Values by IDs',
        showlegend: false,
        height: 600,
        width: 1200,
        xaxis: { title: "OTU ID" },
    };

    Plotly.newPlot('bubble', data2, layout);

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
    getData(selectedID);
    buildTable(selectedID);
}