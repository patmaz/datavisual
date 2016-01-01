// ###################################### DATA
// series for revenue line chart
var revenue1 = [100, 200, 300, 400, 300]; //label:'NetComp'
var revenue2 = [500, 600, 700, 800, 700]; //label:'AnalyzerHR'
var revenue3 = [900, 1000, 1100, 1200, 1100]; //label:'QuestionRight"

//series for installations bar chart
var installations1 = [10, 10, 10, 10, 10]; // label:'NetComp'
var installations2 = [20, 20, 20, 20, 20]; // label:'AnalyzerHR'
var installations3 = [30, 30, 30, 30, 30]; // label:'Question Right'

//labels
var labels = ["NetComp", "AnalyzerHR", "QuestionRight"];

//time points for both graphs (axis is categorical)
var weeks = ["week 1", "week 2", "week 3", "week 4", "week 5"];

$(document).ready(function(){
    
    // #####################################
    // #################line chart generator
    var plot1 = $.jqplot('plot1', [revenue1, revenue2, revenue3], {
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
            series2: 2, //2nd series
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
                ticks: weeks, // weeks array
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
        series:[ 
          {lineWidth:5, markerOptions: { size: 10 }, color: "#ed6e37", label: labels[0], shadow: false}, 
          {lineWidth:5, markerOptions: { size: 10 }, color: "#15a0c8", label: labels[1], shadow: false},
          {lineWidth:5, markerOptions: { size: 10 }, color: "#259e01", label: labels[2], shadow: false}
        ]
    });
    
    // /line chart
    
    // ####################################
    // #################bar chart generator
    var plot2 = $.jqplot('plot2', [installations1, installations2, installations3], {
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer, //all series as bars
            rendererOptions: {
                barWidth: 8
            }
        },
        // background and whole grid
        grid: {
            background: "white",
            borderColor: "transparent", 
            shadow: false
        },
        // labels and colors for series
        series:[
            {label:labels[0], color: "#ed6e37", shadow: false},
            {label:labels[1], color: "#15a0c8", shadow: false},
            {label:labels[2], color: "#259e01", shadow: false}
        ],
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
                ticks: weeks, // weeks array
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
    
    // ###################################################
    // ############################################### SUM
    
    function sumValuesInAllSeries(nameOfSeries, numberOfSeries){
        
        // sam all values
        var grandSum = 0;
        for (var i=1; i <= numberOfSeries; i++){
            for (var i2=0; i2 < window[nameOfSeries + i].length; i2++){
                grandSum += window[nameOfSeries + i][i2];
                
                console.log(window[nameOfSeries + i][i2]);
            }
        }
        
        return grandSum;
    }
    
    // insert values to html file
    $("#revenueSum").text(sumValuesInAllSeries("revenue", 3));
    $("#installationsSum").text(sumValuesInAllSeries("installations", 3));
    
});