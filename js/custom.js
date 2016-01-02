$(document).ready(function(){
// ###################################### DATA JSON - provide data in json/data.json file!!!
// self-invoking function reads json file
(function() {
	var data = [];
	$.getJSON("json/data.json", function(d){ //asynchronous ajax call...
		for(var i=0; i < d.length; i++){
			data.push(d[i]);
		}
	})
    .done(function(d) { //... after it's done...
        console.log("data from json file");
		console.log(data);
        loadPageContent(getDataForJqplot(data)); //... graphs and sums are loaded
    });
})();

// function mutates structure of data from JSON for jqplot
function getDataForJqplot(data) {
    var dataArray = data;
    
    var allRevenues = [];
    var allInstallations =[];
    var labels = [];
    var weeks = dataArray[0].weeks;
    var seriesLabelsAndColor = [];
    
    // generate pseudorandom color for lines and bars
    // http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
    function getRandomColor() {
        var letters = "0123456789ABCDEF".split("");
        var color = "#";
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    for (var i=1; i < dataArray.length; i++){
        allRevenues.push(dataArray[i].revenue); //revenues in one array
        allInstallations.push(dataArray[i].installations); // installations in one array
        seriesLabelsAndColor.push({label: dataArray[i].label, color: getRandomColor()}); // labels and their colors in one array of objects
    }
    
    var allData = {
        revenues: allRevenues,
        installations: allInstallations,
        weeks: weeks,
        labelsAndColor: seriesLabelsAndColor,
        numberOfSeries: dataArray.length - 1
    };
    
    console.log("restructured data for jqplot");
    console.log(allData);
    return allData;
}

function loadPageContent(data){
    var allDataForJqplot = data;
    // #####################################
    // #################line chart generator
    var plot1 = $.jqplot('plot1', allDataForJqplot.revenues, {
        //legend options
        legend: {
            renderer: $.jqplot.EnhancedLegendRenderer,
            show:true,
            placement: "outsideGrid",
            location: "s",
            rendererOptions: {
                numberRows: "1",
            },
        },
        //fill between lines
        fillBetween: {
            series1: 0, //1st series
            series2: allDataForJqplot.numberOfSeries - 1, //last series
            color: "#e7f6ff",
        },
        // background and whole grid
        grid: {
            background: "white",
            borderColor: "transparent", 
            shadow: false
        },
        //axes options
        axes: {
            xaxis: {
              renderer: $.jqplot.CategoryAxisRenderer,
                ticks: allDataForJqplot.weeks, // weeks array
              label: '',
                tickOptions:{
                    showGridline: false, //no vertical lines
                    textColor: "#05415b"
                }
            },
            yaxis: {
                min: 0, //min value
                tickOptions:{
                    formatString:'$%d', // add $
                    textColor: "#05415b"
                } 
            }
      },
        //styles and lebales for series
        seriesDefaults: {
            lineWidth:5, 
            markerOptions: { size: 10 }, 
            shadow: false
        },
        series: allDataForJqplot.labelsAndColor
    });
    
    // /line chart
    
    // ####################################
    // #################bar chart generator
    var plot2 = $.jqplot('plot2', allDataForJqplot.installations, {
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer, //all series as bars
            rendererOptions: {
                barWidth: 8
            },
            shadow: false
        },
        // background and whole grid
        grid: {
            background: "white",
            borderColor: "transparent", 
            shadow: false
        },
        // labels and colors for series
        series: allDataForJqplot.labelsAndColor,
        // legend options
        legend: {
            renderer: $.jqplot.EnhancedLegendRenderer,
            show: true,
            placement: "outsideGrid",
            location: "s",
            rendererOptions: {
                numberRows: "1",
            },
        },
        // axes options
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: allDataForJqplot.weeks, // weeks array
                tickOptions:{
                    showGridline: false, // no vertical lines
                    textColor: "#05415b"
                }
            },
            yaxis: {
                min: 0,
                tickOptions:{
                    textColor: "#05415b",
                }
            }
        }
    });
    // /bar chart
    
    // returns sum of values from specified series
    function sumValuesInAllSeries(nameOfSeries){

    // sam all values
        var grandSum = 0;
        console.log("values of all " + nameOfSeries);
        for (var i=0; i < allDataForJqplot[nameOfSeries].length; i++){
            for (var i2=0; i2 < allDataForJqplot[nameOfSeries][i].length; i2++){
                grandSum += allDataForJqplot[nameOfSeries][i][i2];
                
                console.log(allDataForJqplot[nameOfSeries][i][i2]);
            }
        }

        return grandSum;
    }
    
    // ############################### insert sum values to html
    $("#revenueSum").text(sumValuesInAllSeries("revenues"));
    $("#installationsSum").text(sumValuesInAllSeries("installations"));
}
});