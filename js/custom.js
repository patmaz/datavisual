$(document).ready(function(){
    
    //line chart revenue
    
    // series as arrays nested in arrays
    var line1 = [['week 50', 421], ['week 51', 560], ['week 52', 390], ['week 53', 500]]; //label:'NetComp'
    var line2 = [['week 50', 500], ['week 51', 430], ['week 52', 200], ['week 53', 440]]; //label:'AnalyzerHR'
    var line3 = [['week 50', 300], ['week 51', 250], ['week 52', 355], ['week 53', 120]]; //label:'Question Right'
    
    // line chart generator
    var plot1 = $.jqplot('plot1', [line1, line2, line3], {
        //legend options
        legend: {
            renderer: $.jqplot.EnhancedLegendRenderer,
            show:true,
            placement: "outsideGrid",
            location:'s',
            rendererOptions: {
                numberRows: '1',
                numberColumns: '3'
            },
        },
        // background and whole grid
        grid: {
            background: "white"
        },
        //axes options
        axes: {
            xaxis: {
              renderer: $.jqplot.CategoryAxisRenderer,
              label: '',
                tickOptions:{
                    showGridline: false, //no vertical lines
                    textColor: '#05415b'
                }
            },
            yaxis: {
                tickOptions:{
                    formatString:'$%d',
                    textColor: '#05415b'
                } // add $
            }
      },
        //styles and lebales for series
        series:[ 
          {lineWidth:5, markerOptions: { size: 10 }, color: "red", label:'NetComp'}, 
          {lineWidth:5, markerOptions: { size: 10 }, color: "blue", label:'AnalyzerHR'},
          {lineWidth:5, markerOptions: { size: 10 }, color: "green", label:'Question Right'}
        ]
    });
    
    // /line chart
    
    // bar chart installations
    
    //series as arrays
    var ser1 = [7, 6, 9, 12]; // label:'NetComp'
    var ser2 = [4, 5, 7, 19]; // label:'AnalyzerHR'
    var ser3 = [5, 6, 7, 13]; // label:'Question Right'
    
    // time points as array
    var weeks = ['week 50', 'week 51', 'week 52', 'week 53'];
    
    // bar chart generator
    var plot2 = $.jqplot('plot2', [ser1, ser2, ser3], {
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer, //all series as bars
            rendererOptions: {
                barWidth: 8
            }
        },
        // labels and colors for series
        series:[
            {label:'NetComp', color: "red"},
            {label:'AnalyzerHR', color: "blue"},
            {label:'Question Right', color: "green"}
        ],
        // legend options
        legend: {
            renderer: $.jqplot.EnhancedLegendRenderer,
            show: true,
            placement: 'outsideGrid',
            location:'s',
            rendererOptions: {
              numberRows: '1',
              numberColumns: '3'
            },
        },
        // axes options
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: weeks, // weeks array
                tickOptions:{
                    showGridline: false, // no vertical lines
                    textColor: '#05415b'
                }
            },
            yaxis: {
                tickOptions:{
                    textColor: '#05415b'
                }
            }
        }
    });
    // /bar chart
    
    // ###################################################
    // ################################### sum for revenue
    var sumRevenueArray = line1.concat(line2, line3); //merge arrays
    var sumRevenue = 0;
    for (var i=0; i < sumRevenueArray.length; i++){
        for(var i2=1; i2 < sumRevenueArray[i].length; i2++){ //sum every second item in array - all integers
            sumRevenue += sumRevenueArray[i][i2];
        }
    }
    
    // ################################### sum for installations
    var sumInstallationsArray = ser1.concat(ser2, ser3); ////merge arrays
    var sumInstallations = 0;
    for (var i=0; i < sumInstallationsArray.length; i++){ //sum all items
        sumInstallations += sumInstallationsArray[i];
    }
    
    // insert values to html file
    $("#revenueSum").text(sumRevenue);
    $("#installationsSum").text(sumInstallations);
    
});