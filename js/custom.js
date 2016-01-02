// ###################################### DATA JSON - provide data here!!!
// another product or time point may be added
// revenue and installatons values refer to consecutive weeks
var dataArray = [
    {
        "weeks": ["week 1", "week 2", "week 3", "week 4", "week 5"],
    },
    {
        "label": "NetComp",
        "revenue": [100, 200, 300, 400, 300],
        "installations": [10, 10, 10, 10, 10],
    },
    {
        "label": "AnalyzerHR",
        "revenue": [500, 600, 700, 800, 700],
        "installations": [20, 20, 20, 20, 20],
    },
    {
        "label": "QuestionRight",
        "revenue": [900, 1000, 1100, 1200, 1100],
        "installations": [30, 30, 30, 30, 30],
    },
    {
        "label": "another",
        "revenue": [1200, 1300, 1400, 1500, 1400],
        "installations": [40, 40, 40, 40, 40],
    },
    {
        "label": "another2",
        "revenue": [1500, 1600, 1700, 1800, 1700],
        "installations": [50, 50, 50, 50, 50],
    }
];

// function mutates structure of data from JSON for jqplot
function getDataForJqplot() {
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
    
    return allData;
}

var allData = getDataForJqplot();

// ############################################### SUM
function sumValuesInAllSeries(nameOfSeries){

    // sam all values
    var grandSum = 0;
    for (var i=0; i < allData[nameOfSeries].length; i++){
        for (var i2=0; i2 < allData[nameOfSeries][i].length; i2++){
            grandSum += allData[nameOfSeries][i][i2];

            console.log(allData[nameOfSeries][i][i2]);
        }
    }

    return grandSum;
}

$(document).ready(function(){
    // #####################################
    // #################line chart generator
    var plot1 = $.jqplot('plot1', allData.revenues, {
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
            series2: allData.numberOfSeries - 1, //last series
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
                ticks: allData.weeks, // weeks array
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
        series: allData.labelsAndColor
    });
    
    // /line chart
    
    // ####################################
    // #################bar chart generator
    var plot2 = $.jqplot('plot2', allData.installations, {
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
        series: allData.labelsAndColor,
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
                ticks: allData.weeks, // weeks array
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
    
    // ############################### insert values to html file
    $("#revenueSum").text(sumValuesInAllSeries("revenues"));
    $("#installationsSum").text(sumValuesInAllSeries("installations"));
    
});