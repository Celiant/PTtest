/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1349.0, "series": [{"data": [[300.0, 1.0], [200.0, 9.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[661600.0, 1.0], [713200.0, 1.0], [744400.0, 3.0], [765200.0, 1.0], [754800.0, 1.0], [692900.0, 1.0], [248700.0, 1.0], [723700.0, 1.0], [816700.0, 1.0], [589400.0, 1.0], [641000.0, 1.0], [651400.0, 1.0], [693000.0, 1.0], [733800.0, 1.0], [765000.0, 1.0], [754700.0, 3.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[0.0, 34.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[0.0, 563.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[200.0, 20.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[300.0, 1.0], [200.0, 9.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[17900.0, 2.0], [14600.0, 3.0], [14700.0, 2.0], [15000.0, 1.0], [15200.0, 1.0], [14900.0, 1.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[33300.0, 1.0], [33500.0, 1.0], [36600.0, 1.0], [13500.0, 1.0], [14600.0, 1.0], [15100.0, 2.0], [15300.0, 1.0], [4900.0, 1.0], [20100.0, 1.0], [20500.0, 1.0], [5300.0, 1.0], [22200.0, 1.0], [5500.0, 1.0], [23700.0, 1.0], [5900.0, 1.0], [24900.0, 1.0], [27600.0, 1.0], [29200.0, 1.0], [30400.0, 1.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[180200.0, 1.0], [200.0, 12.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[65800.0, 1.0], [69300.0, 1.0], [66700.0, 1.0], [36100.0, 1.0], [77400.0, 1.0], [43700.0, 1.0], [50700.0, 1.0], [49900.0, 1.0], [52600.0, 1.0], [58400.0, 1.0], [60400.0, 2.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[200.0, 20.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[3500.0, 9.0], [4000.0, 1.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[16600.0, 3.0], [17000.0, 1.0], [13300.0, 1.0], [6800.0, 2.0], [6700.0, 1.0], [7200.0, 2.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[0.0, 41.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[600.0, 3.0], [200.0, 17.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[700.0, 1.0], [200.0, 9.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[0.0, 47.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[200.0, 112.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[600.0, 6.0], [300.0, 2.0], [700.0, 2.0], [200.0, 116.0], [800.0, 1.0]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[2200.0, 1.0], [600.0, 5.0], [9800.0, 1.0], [700.0, 2.0], [11200.0, 1.0], [11100.0, 1.0], [12000.0, 1.0], [200.0, 116.0], [13700.0, 1.0], [3400.0, 1.0], [3800.0, 1.0], [19400.0, 1.0], [1200.0, 2.0], [300.0, 1.0], [19900.0, 1.0], [19600.0, 1.0], [5500.0, 1.0], [1400.0, 1.0], [23500.0, 1.0], [1600.0, 2.0], [7000.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[18500.0, 1.0], [18600.0, 1.0], [20100.0, 1.0], [4900.0, 1.0], [6600.0, 1.0], [12800.0, 2.0], [14200.0, 1.0], [14600.0, 1.0], [14900.0, 1.0], [60200.0, 2.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[0.0, 66.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[16500.0, 5.0], [13300.0, 2.0], [6700.0, 1.0], [6800.0, 1.0], [13700.0, 1.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[0.0, 127.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[17300.0, 5.0], [14000.0, 2.0], [14500.0, 1.0], [7500.0, 2.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[0.0, 90.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[700.0, 1.0], [400.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[4300.0, 6.0], [4200.0, 3.0], [4700.0, 1.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[17400.0, 2.0], [17500.0, 1.0], [17700.0, 1.0], [14100.0, 1.0], [7600.0, 1.0], [7500.0, 2.0], [7900.0, 2.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[900.0, 19.0], [1000.0, 1.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[200.0, 20.0], [400.0, 3.0], [500.0, 7.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[200.0, 20.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[37100.0, 1.0], [42800.0, 1.0], [47100.0, 1.0], [47800.0, 1.0], [52300.0, 1.0], [52100.0, 1.0], [57800.0, 1.0], [61100.0, 1.0], [62100.0, 1.0], [65200.0, 1.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[600.0, 1.0], [500.0, 9.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[400.0, 7.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[600.0, 1.0], [200.0, 12.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[36200.0, 1.0], [19100.0, 1.0], [20500.0, 1.0], [26900.0, 1.0], [28700.0, 1.0], [30500.0, 2.0], [31400.0, 1.0], [31900.0, 1.0], [32300.0, 1.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[0.0, 1349.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[600.0, 1.0], [200.0, 40.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[600.0, 9.0], [700.0, 1.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[300.0, 1.0], [200.0, 11.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[34200.0, 1.0], [200.0, 20.0], [14300.0, 2.0], [14400.0, 1.0], [14600.0, 1.0], [14900.0, 1.0], [17900.0, 1.0], [17500.0, 1.0], [4600.0, 1.0], [17600.0, 1.0], [20700.0, 1.0], [24700.0, 1.0], [27200.0, 5.0], [27700.0, 1.0], [27800.0, 1.0], [31000.0, 1.0]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1065200.0, 1.0], [889700.0, 1.0], [962900.0, 1.0], [972500.0, 1.0], [993300.0, 1.0], [1003700.0, 1.0], [1034100.0, 1.0], [1024100.0, 1.0], [1044500.0, 1.0], [931200.0, 2.0], [962000.0, 1.0], [993200.0, 1.0], [1024000.0, 1.0], [993100.0, 1.0], [931400.0, 1.0], [972200.0, 1.0], [1013800.0, 1.0], [1003400.0, 1.0], [1034200.0, 1.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[300.0, 1.0], [200.0, 19.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[18200.0, 1.0], [5000.0, 1.0], [13200.0, 1.0], [12800.0, 2.0], [12900.0, 1.0], [13600.0, 1.0], [14100.0, 1.0], [14700.0, 1.0], [14500.0, 1.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[269300.0, 1.0], [289700.0, 1.0], [279300.0, 1.0], [310700.0, 1.0], [238400.0, 2.0], [238500.0, 1.0], [248600.0, 3.0], [248700.0, 1.0], [248400.0, 1.0], [259000.0, 2.0], [269600.0, 1.0], [279400.0, 1.0], [279800.0, 1.0], [280000.0, 1.0], [373400.0, 1.0], [723500.0, 1.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[300.0, 4.0], [700.0, 1.0], [200.0, 37.0]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[300.0, 1.0], [200.0, 19.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [200.0, 30.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[600.0, 216.0], [300.0, 4.0], [700.0, 2.0], [200.0, 1126.0], [800.0, 1.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[800.0, 18.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[0.0, 112.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[600.0, 2.0], [700.0, 2.0], [200.0, 39.0], [800.0, 1.0]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[11100.0, 7.0], [11200.0, 10.0], [10900.0, 2.0], [11000.0, 1.0], [11600.0, 3.0], [11400.0, 5.0], [11300.0, 2.0], [11500.0, 1.0], [11900.0, 1.0], [1000.0, 2.0], [1100.0, 1.0], [1200.0, 5.0], [1300.0, 4.0], [1500.0, 1.0], [1600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[0.0, 144.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[300.0, 1.0], [180200.0, 7.0], [200.0, 11.0], [60200.0, 1.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[0.0, 30.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[600.0, 19.0], [800.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [200.0, 63.0]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[0.0, 42.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[300.0, 1.0], [200.0, 89.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[600.0, 87.0], [300.0, 1.0], [700.0, 1.0], [200.0, 455.0], [400.0, 11.0], [800.0, 6.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[0.0, 44.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1065200.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 12.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 5580.0, "series": [{"data": [[0.0, 5580.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 435.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 73.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [[3.0, 12.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69821924E12, "maxY": 20.0, "series": [{"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.69821924E12, 3.3880597014925367], [1.6982202E12, 20.0], [1.6982199E12, 20.0], [1.69821984E12, 20.0], [1.69821954E12, 20.0], [1.6982205E12, 15.206896551724144], [1.69821996E12, 20.0], [1.69821966E12, 20.0], [1.69822062E12, 1.6], [1.6982196E12, 20.0], [1.69822056E12, 5.371428571428572], [1.6982193E12, 8.826388888888888], [1.69822026E12, 20.0], [1.69821972E12, 20.0], [1.69821942E12, 19.498023715415005], [1.69822038E12, 19.845553822152873], [1.69821936E12, 14.717592592592597], [1.69822032E12, 20.0], [1.69822002E12, 20.0], [1.69821948E12, 20.0], [1.69822044E12, 18.268498942917542], [1.69822014E12, 20.0], [1.69822008E12, 20.0], [1.69821978E12, 20.0]], "isOverall": false, "label": "Policy workflow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69822062E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 989040.05, "series": [{"data": [[16.0, 267.0], [17.0, 271.75], [19.0, 261.5], [20.0, 271.0], [7.0, 319.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[16.5, 273.4]], "isOverall": false, "label": "Get issues-Aggregated", "isController": false}, {"data": [[19.0, 1.0], [20.0, 0.8181818181818182]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[19.846153846153847, 0.8461538461538461]], "isOverall": false, "label": "Get block for waiting app approve-0-Aggregated", "isController": false}, {"data": [[20.0, 697430.55]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[20.0, 697430.55]], "isOverall": false, "label": "Import-Aggregated", "isController": true}, {"data": [[17.0, 0.3333333333333333], [18.0, 0.33333333333333337], [19.0, 0.0], [20.0, 2.0], [15.0, 2.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[17.9, 0.8]], "isOverall": false, "label": "Get device issue row-0-Aggregated", "isController": false}, {"data": [[19.0, 0.0], [20.0, 0.5789473684210527]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[19.95, 0.55]], "isOverall": false, "label": "Get hedera id-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [8.0, 0.0], [9.0, 0.0], [10.0, 0.0], [11.0, 0.0], [3.0, 0.0], [12.0, 0.0], [13.0, 0.0], [14.0, 0.0], [15.0, 0.0], [1.0, 1.0], [4.0, 0.0], [16.0, 0.0], [17.0, 0.0], [18.0, 0.0], [19.0, 0.0], [5.0, 1.0], [20.0, 1.0], [6.0, 1.0], [7.0, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[10.499999999999998, 0.20000000000000004]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[17.0, 1.2000000000000002], [18.0, 0.923076923076923], [19.0, 2.0], [20.0, 1.5714285714285714], [15.0, 1.5]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[18.0, 1.2352941176470593]], "isOverall": false, "label": "Get device approve result-0-Aggregated", "isController": false}, {"data": [[16.0, 2.0], [18.0, 1.0], [19.0, 0.75], [20.0, 1.6666666666666667]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[18.8, 1.2]], "isOverall": false, "label": "Create device-0-Aggregated", "isController": false}, {"data": [[20.0, 0.35168738898756646]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[20.0, 0.35168738898756646]], "isOverall": false, "label": "Get policy publish result-0-Aggregated", "isController": false}, {"data": [[17.0, 1.3333333333333333], [18.0, 1.3333333333333333], [19.0, 1.0], [20.0, 3.0], [15.0, 1.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[17.9, 1.6]], "isOverall": false, "label": "Get issue schema-0-Aggregated", "isController": false}, {"data": [[2.0, 244.0], [8.0, 239.0], [9.0, 239.0], [10.0, 244.0], [11.0, 244.0], [3.0, 242.0], [12.0, 239.0], [13.0, 244.0], [14.0, 244.0], [15.0, 240.0], [1.0, 238.0], [4.0, 242.0], [16.0, 246.0], [17.0, 237.0], [18.0, 241.0], [19.0, 241.0], [5.0, 242.0], [20.0, 249.0], [6.0, 252.0], [7.0, 239.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[10.499999999999998, 242.29999999999995]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[17.0, 280.0], [19.0, 264.6666666666667], [20.0, 266.5]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[19.400000000000002, 267.3]], "isOverall": false, "label": "Get applications-Aggregated", "isController": false}, {"data": [[17.0, 272.3333333333333], [18.0, 261.0], [19.0, 299.0], [20.0, 284.5], [15.0, 273.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[17.9, 274.1]], "isOverall": false, "label": "Get device issue row-Aggregated", "isController": false}, {"data": [[16.0, 14703.0], [17.0, 15726.5], [19.0, 14684.5], [20.0, 15043.0], [7.0, 17927.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[16.5, 15465.099999999999]], "isOverall": false, "label": "Issue creation-Aggregated", "isController": true}, {"data": [[19.0, 24970.0], [20.0, 19641.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[19.95, 19907.45]], "isOverall": false, "label": "Token associate-Aggregated", "isController": true}, {"data": [[1.0, 180225.0], [19.0, 233.0], [20.0, 243.18181818181816]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[18.461538461538463, 14087.153846153846]], "isOverall": false, "label": "Get block for waiting device-Aggregated", "isController": false}, {"data": [[17.0, 63617.5], [19.0, 46113.666666666664], [20.0, 60914.57142857143]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[19.25, 57664.833333333336]], "isOverall": false, "label": "Application creation-Aggregated", "isController": true}, {"data": [[20.0, 232.15]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[20.0, 232.15]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[0.0, 3583.2000000000003]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[0.0, 3583.2000000000003]], "isOverall": false, "label": "Get result for issue request approve-Aggregated", "isController": true}, {"data": [[0.0, 11519.300000000001]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[0.0, 11519.300000000001]], "isOverall": false, "label": "Get result for device approve-Aggregated", "isController": true}, {"data": [[17.0, 1.0], [19.0, 0.7407407407407407], [20.0, 1.2000000000000002]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[19.048780487804876, 0.8780487804878049]], "isOverall": false, "label": "Get block for approve result-0-Aggregated", "isController": false}, {"data": [[17.0, 258.0], [19.0, 251.0], [20.0, 253.5]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[19.400000000000002, 253.2]], "isOverall": false, "label": "Approve application-Aggregated", "isController": false}, {"data": [[20.0, 295.05]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[20.0, 295.05]], "isOverall": false, "label": "Associate token-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [19.0, 0.0], [20.0, 0.9090909090909091]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[18.461538461538463, 0.7692307692307692]], "isOverall": false, "label": "Get block for waiting device-0-Aggregated", "isController": false}, {"data": [[16.0, 276.0], [17.0, 394.75], [18.0, 265.0], [19.0, 286.0], [20.0, 270.0], [6.0, 272.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[16.299999999999997, 322.4]], "isOverall": false, "label": "Get issue approve result-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [2.0, 2.0], [9.0, 1.0], [10.0, 1.0], [12.0, 1.5], [3.0, 3.0], [13.0, 1.0], [14.0, 11.5], [15.0, 2.0], [16.0, 4.111111111111111], [4.0, 1.5], [17.0, 1.4], [18.0, 1.5], [19.0, 1.0], [5.0, 2.0], [6.0, 2.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[13.29787234042553, 2.382978723404256]], "isOverall": false, "label": "Balance verify-0-Aggregated", "isController": false}, {"data": [[16.0, 230.0], [17.0, 234.6428571428571], [18.0, 228.22222222222223], [19.0, 230.74999999999997], [20.0, 235.78461538461542], [6.0, 233.0], [7.0, 234.0], [15.0, 234.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[18.84821428571428, 234.03571428571436]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[17.0, 245.0], [18.0, 319.8333333333333], [19.0, 268.304347826087], [20.0, 287.1145833333333]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[19.67716535433071, 284.59055118110246]], "isOverall": false, "label": "Get application creation status-Aggregated", "isController": false}, {"data": [[19.0, 228.0], [20.0, 1447.95]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[19.972222222222225, 1414.0625]], "isOverall": false, "label": "Get tokens-Aggregated", "isController": false}, {"data": [[17.0, 60224.0], [19.0, 12834.0], [20.0, 18571.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[19.666666666666668, 21564.0]], "isOverall": false, "label": "Choose registrant-Aggregated", "isController": false}, {"data": [[19.0, 0.25], [20.0, 0.45161290322580644]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[19.93939393939394, 0.4393939393939394]], "isOverall": false, "label": "Get associate result-0-Aggregated", "isController": false}, {"data": [[0.0, 13685.1]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[0.0, 13685.1]], "isOverall": false, "label": "Get result for app approve-Aggregated", "isController": true}, {"data": [[17.0, 1.0], [18.0, 0.6666666666666666], [19.0, 1.869565217391304], [20.0, 1.104166666666667]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[19.67716535433071, 1.2204724409448822]], "isOverall": false, "label": "Get application creation status-0-Aggregated", "isController": false}, {"data": [[19.0, 1.0], [20.0, 1.2222222222222223]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[19.9, 1.2000000000000002]], "isOverall": false, "label": "Create application-0-Aggregated", "isController": false}, {"data": [[17.0, 14078.0], [19.0, 16308.0], [20.0, 10812.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[19.099999999999998, 14436.2]], "isOverall": false, "label": "Role approve-Aggregated", "isController": true}, {"data": [[2.0, 1.0], [8.0, 0.0], [9.0, 1.0], [10.0, 1.0], [11.0, 0.0], [3.0, 0.0], [12.0, 0.0], [13.0, 0.0], [14.0, 0.0], [15.0, 1.0], [1.0, 0.0], [4.0, 0.0], [16.0, 1.3333333333333333], [17.0, 1.2857142857142858], [18.0, 1.0], [19.0, 0.5], [5.0, 1.0], [20.0, 0.8775510204081634], [6.0, 0.0], [7.0, 0.5]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[17.21111111111111, 0.8111111111111112]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[17.0, 556.0], [18.0, 474.0], [19.0, 490.0], [20.0, 489.0], [15.0, 469.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[17.9, 502.7]], "isOverall": false, "label": "Get issue schema-Aggregated", "isController": false}, {"data": [[16.0, 4291.0], [17.0, 4419.0], [18.0, 4261.0], [19.0, 4311.0], [20.0, 4371.0], [6.0, 4336.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[16.299999999999997, 4353.700000000001]], "isOverall": false, "label": "Issue approve-Aggregated", "isController": true}, {"data": [[19.0, 1.0], [20.0, 0.7272727272727272]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[19.916666666666668, 0.7499999999999999]], "isOverall": false, "label": "Get block for waiting issue request-0-Aggregated", "isController": false}, {"data": [[17.0, 16431.333333333332], [18.0, 10854.666666666666], [19.0, 7970.0], [20.0, 12569.0], [15.0, 7956.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[17.9, 12292.2]], "isOverall": false, "label": "Device approve-Aggregated", "isController": true}, {"data": [[2.0, 923.0], [8.0, 1061.0], [9.0, 912.0], [10.0, 933.0], [11.0, 924.0], [3.0, 935.0], [12.0, 966.0], [13.0, 928.0], [14.0, 931.0], [15.0, 917.0], [1.0, 943.0], [4.0, 928.0], [16.0, 915.0], [17.0, 915.0], [18.0, 950.0], [19.0, 925.0], [5.0, 943.0], [20.0, 942.0], [6.0, 974.0], [7.0, 927.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[10.5, 939.6]], "isOverall": false, "label": "Get tenant-Aggregated", "isController": true}, {"data": [[16.0, 251.0], [17.0, 380.11111111111114], [18.0, 318.85714285714283], [19.0, 313.25], [20.0, 366.2], [7.0, 245.0], [15.0, 368.5]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[17.46666666666667, 340.7]], "isOverall": false, "label": "Approve device-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [8.0, 1.0], [9.0, 0.0], [10.0, 0.0], [11.0, 0.0], [3.0, 0.0], [12.0, 0.0], [13.0, 0.0], [14.0, 1.0], [15.0, 0.0], [1.0, 0.0], [4.0, 0.0], [16.0, 1.0], [17.0, 0.0], [18.0, 1.0], [19.0, 0.0], [5.0, 0.0], [20.0, 1.0], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[10.5, 0.35000000000000003]], "isOverall": false, "label": "Get Tenant Id-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [8.0, 0.0], [9.0, 0.0], [10.0, 0.0], [11.0, 0.0], [3.0, 1.0], [12.0, 0.0], [13.0, 0.0], [14.0, 0.0], [15.0, 0.0], [1.0, 0.0], [4.0, 0.0], [16.0, 0.0], [17.0, 1.0], [18.0, 0.0], [19.0, 0.0], [5.0, 0.0], [20.0, 1.0], [6.0, 0.0], [7.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[10.5, 0.19999999999999998]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[20.0, 254.54999999999998]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[20.0, 254.54999999999998]], "isOverall": false, "label": "Publish Policy-Aggregated", "isController": false}, {"data": [[16.0, 61133.0], [8.0, 37185.0], [4.0, 65289.0], [2.0, 57839.0], [18.0, 52150.0], [19.0, 52304.0], [12.0, 42895.0], [6.0, 62142.0], [13.0, 47121.0], [14.0, 47824.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[11.2, 52588.200000000004]], "isOverall": false, "label": "Token minting verify-Aggregated", "isController": true}, {"data": [[19.0, 561.0], [20.0, 567.3333333333333]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[19.9, 566.6999999999999]], "isOverall": false, "label": "Create application-Aggregated", "isController": false}, {"data": [[20.0, 0.39999999999999997]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[20.0, 0.39999999999999997]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[16.0, 2.0], [17.0, 1.5], [18.0, 0.0], [19.0, 2.0], [20.0, 1.0], [6.0, 2.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[16.299999999999997, 1.5]], "isOverall": false, "label": "Get issue approve result-0-Aggregated", "isController": false}, {"data": [[19.0, 470.0], [20.0, 532.7777777777778]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[19.9, 526.5]], "isOverall": false, "label": "Get application schema-Aggregated", "isController": false}, {"data": [[19.0, 449.5], [20.0, 241.27272727272722]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[19.846153846153847, 273.30769230769226]], "isOverall": false, "label": "Get block for waiting app approve-Aggregated", "isController": false}, {"data": [[19.0, 1.0], [20.0, 0.4444444444444444]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[19.9, 0.5]], "isOverall": false, "label": "Get application schema-0-Aggregated", "isController": false}, {"data": [[17.0, 1.0], [19.0, 0.3333333333333333], [20.0, 0.6666666666666667]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[19.400000000000002, 0.6000000000000001]], "isOverall": false, "label": "Approve application-0-Aggregated", "isController": false}, {"data": [[17.0, 32352.0], [18.0, 26077.6], [19.0, 30536.0], [20.0, 34078.0], [15.0, 26918.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[18.099999999999998, 28835.0]], "isOverall": false, "label": "Device creation-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [8.0, 0.28571428571428575], [9.0, 0.25000000000000006], [10.0, 0.2222222222222222], [11.0, 0.3], [3.0, 0.5], [12.0, 0.1818181818181818], [13.0, 0.24999999999999997], [14.0, 0.15384615384615385], [15.0, 0.21428571428571433], [4.0, 0.33333333333333337], [16.0, 0.3333333333333333], [17.0, 0.25000000000000006], [18.0, 0.41176470588235287], [19.0, 0.16666666666666666], [5.0, 0.25], [20.0, 0.2886247877758917], [6.0, 0.2], [7.0, 0.33333333333333337]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[19.154929577464795, 0.28465530022238716]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[17.0, 252.5], [19.0, 265.51851851851853], [20.0, 253.5]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[19.048780487804876, 261.31707317073165]], "isOverall": false, "label": "Get block for approve result-Aggregated", "isController": false}, {"data": [[17.0, 687.0], [19.0, 688.0], [20.0, 699.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[19.099999999999998, 691.1999999999999]], "isOverall": false, "label": "Get device schema-Aggregated", "isController": false}, {"data": [[19.0, 233.0], [20.0, 249.9090909090909]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[19.916666666666668, 248.5]], "isOverall": false, "label": "Get block for waiting issue request-Aggregated", "isController": false}, {"data": [[19.0, 7270.0], [20.0, 11144.052631578943]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[19.95, 10950.349999999995]], "isOverall": false, "label": "Grant KYC-Aggregated", "isController": true}, {"data": [[20.0, 989040.05]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[20.0, 989040.05]], "isOverall": false, "label": "Policy import and publish-Aggregated", "isController": true}, {"data": [[2.0, 257.0], [8.0, 249.0], [9.0, 250.0], [10.0, 260.0], [11.0, 252.0], [3.0, 257.0], [12.0, 289.0], [13.0, 263.0], [14.0, 263.0], [15.0, 254.0], [1.0, 258.0], [4.0, 258.0], [16.0, 252.0], [17.0, 259.0], [18.0, 285.0], [19.0, 264.0], [5.0, 263.0], [20.0, 263.0], [6.0, 304.0], [7.0, 256.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[10.5, 262.8]], "isOverall": false, "label": "Get Tenant Id-Aggregated", "isController": false}, {"data": [[16.0, 12859.0], [18.0, 13758.5], [19.0, 11560.25], [20.0, 15204.333333333334]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[18.8, 13223.0]], "isOverall": false, "label": "Create device-Aggregated", "isController": false}, {"data": [[19.0, 1.0], [20.0, 0.5789473684210527]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[19.95, 0.6]], "isOverall": false, "label": "Grant KYC-0-Aggregated", "isController": false}, {"data": [[20.0, 291595.55]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[20.0, 291595.55]], "isOverall": false, "label": "Publish-Aggregated", "isController": true}, {"data": [[16.0, 270.25], [17.0, 302.06666666666666], [18.0, 281.83333333333337], [9.0, 265.0], [19.0, 274.3333333333333], [20.0, 278.6666666666667], [10.0, 274.0], [12.0, 258.0], [13.0, 262.0], [7.0, 291.0]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[16.952380952380956, 285.0238095238095]], "isOverall": false, "label": "Get issue creation status-Aggregated", "isController": false}, {"data": [[19.0, 268.0], [20.0, 272.8947368421052]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[19.95, 272.6499999999999]], "isOverall": false, "label": "Get hedera id-Aggregated", "isController": false}, {"data": [[9.0, 0.0], [19.0, 0.0], [20.0, 2.4545454545454546], [10.0, 0.0], [5.0, 1.0], [11.0, 0.0], [3.0, 0.0], [7.0, 0.0], [15.0, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[15.899999999999999, 1.4000000000000001]], "isOverall": false, "label": "Get block for waiting app creation-0-Aggregated", "isController": false}, {"data": [[17.0, 302.4], [18.0, 267.0769230769231], [19.0, 482.0], [20.0, 262.57142857142856], [15.0, 471.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[18.0, 301.17647058823525]], "isOverall": false, "label": "Get device approve result-Aggregated", "isController": false}, {"data": [[17.0, 1.0], [19.0, 0.0], [20.0, 0.6]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[19.666666666666668, 0.5833333333333333]], "isOverall": false, "label": "Choose registrant-0-Aggregated", "isController": false}, {"data": [[2.0, 247.0], [8.0, 304.0], [9.0, 298.625], [10.0, 291.77777777777777], [11.0, 287.99999999999994], [3.0, 245.0], [12.0, 283.09090909090907], [13.0, 315.75], [14.0, 312.38461538461536], [15.0, 308.07142857142856], [4.0, 242.66666666666666], [16.0, 301.80000000000007], [17.0, 300.0625], [18.0, 295.94117647058823], [19.0, 315.94444444444446], [5.0, 244.5], [20.0, 315.5976230899829], [6.0, 250.0], [7.0, 316.8333333333333]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[19.154929577464795, 313.3535952557449]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[19.0, 848.0], [20.0, 871.4736842105265]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[19.95, 870.3000000000002]], "isOverall": false, "label": "WS open for kyc grant-Aggregated", "isController": false}, {"data": [[16.0, 1.75], [17.0, 2.642857142857143], [18.0, 1.0], [19.0, 0.5625], [20.0, 0.6000000000000001], [6.0, 1.0], [7.0, 1.0], [15.0, 1.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[18.84821428571428, 0.9375000000000002]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[20.0, 0.35000000000000003]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[20.0, 0.35000000000000003]], "isOverall": false, "label": "Associate token-0-Aggregated", "isController": false}, {"data": [[16.0, 257.6666666666667], [17.0, 266.0], [18.0, 319.77777777777777], [19.0, 308.5555555555556], [20.0, 362.2], [15.0, 286.0]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[18.59090909090909, 316.1590909090909]], "isOverall": false, "label": "Get device creation status-Aggregated", "isController": false}, {"data": [[17.0, 2.0], [18.0, 1.0], [19.0, 0.0], [20.0, 3.0], [15.0, 1.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[18.099999999999998, 1.4]], "isOverall": false, "label": "Get devices-0-Aggregated", "isController": false}, {"data": [[8.0, 4567.666666666667], [2.0, 11965.0], [9.0, 11122.0], [10.0, 1390.0], [12.0, 6555.0], [3.0, 11116.0], [13.0, 11316.0], [14.0, 11565.0], [15.0, 11430.0], [16.0, 6806.222222222223], [4.0, 11221.5], [17.0, 9190.0], [18.0, 6293.0], [19.0, 8518.57142857143], [5.0, 4529.333333333334], [6.0, 11283.5]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[13.29787234042553, 8119.872340425532]], "isOverall": false, "label": "Balance verify-Aggregated", "isController": false}, {"data": [[19.0, 0.0], [20.0, 0.5214285714285709]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[19.972222222222225, 0.5069444444444441]], "isOverall": false, "label": "Get tokens-0-Aggregated", "isController": false}, {"data": [[9.0, 180217.0], [19.0, 30240.0], [20.0, 248.81818181818184], [10.0, 180221.0], [5.0, 180218.0], [11.0, 180217.0], [3.0, 180214.0], [7.0, 180219.0], [15.0, 180216.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[15.899999999999999, 66236.95]], "isOverall": false, "label": "Get block for waiting app creation-Aggregated", "isController": false}, {"data": [[16.0, 2.0], [17.0, 4.222222222222222], [18.0, 1.5714285714285714], [19.0, 1.25], [20.0, 2.0], [7.0, 1.0], [15.0, 1.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[17.46666666666667, 2.3666666666666663]], "isOverall": false, "label": "Approve device-0-Aggregated", "isController": false}, {"data": [[2.0, 665.0], [8.0, 809.0], [9.0, 661.0], [10.0, 669.0], [11.0, 671.0], [3.0, 675.0], [12.0, 676.0], [13.0, 664.0], [14.0, 667.0], [15.0, 662.0], [1.0, 683.0], [4.0, 667.0], [16.0, 661.0], [17.0, 655.0], [18.0, 662.0], [19.0, 659.0], [5.0, 678.0], [20.0, 676.0], [6.0, 668.0], [7.0, 669.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[10.5, 674.8500000000001]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[19.0, 229.75], [20.0, 247.758064516129]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[19.93939393939394, 246.66666666666663]], "isOverall": false, "label": "Get associate result-Aggregated", "isController": false}, {"data": [[16.0, 1.5], [17.0, 2.0666666666666664], [18.0, 2.0], [9.0, 1.0], [19.0, 1.5], [20.0, 2.3333333333333335], [10.0, 2.0], [12.0, 1.0], [13.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[16.952380952380956, 1.8571428571428574]], "isOverall": false, "label": "Get issue creation status-0-Aggregated", "isController": false}, {"data": [[17.0, 272.0], [18.0, 278.8], [19.0, 252.0], [20.0, 293.0], [15.0, 265.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[18.099999999999998, 276.9]], "isOverall": false, "label": "Get devices-Aggregated", "isController": false}, {"data": [[2.0, 230.0], [8.0, 228.0], [9.0, 228.0], [10.0, 230.0], [11.0, 227.0], [3.0, 231.0], [12.0, 232.0], [13.0, 233.0], [14.0, 237.0], [15.0, 230.5], [1.0, 227.0], [4.0, 229.0], [16.0, 232.33333333333334], [17.0, 230.2857142857143], [18.0, 230.5], [19.0, 232.875], [5.0, 234.0], [20.0, 237.38775510204084], [6.0, 230.0], [7.0, 233.5]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[17.21111111111111, 234.56666666666663]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[20.0, 322.5648312611011]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[20.0, 322.5648312611011]], "isOverall": false, "label": "Get policy publish result-Aggregated", "isController": false}, {"data": [[17.0, 2.0], [19.0, 1.0], [20.0, 0.5]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[19.400000000000002, 0.8]], "isOverall": false, "label": "Get applications-0-Aggregated", "isController": false}, {"data": [[17.0, 1.0], [19.0, 0.8333333333333334], [20.0, 5.666666666666666]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[19.099999999999998, 2.3]], "isOverall": false, "label": "Get device schema-0-Aggregated", "isController": false}, {"data": [[16.0, 1.3333333333333333], [17.0, 1.3333333333333333], [18.0, 1.3333333333333333], [19.0, 1.2222222222222225], [20.0, 2.2], [15.0, 2.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[18.59090909090909, 1.5]], "isOverall": false, "label": "Get device creation status-0-Aggregated", "isController": false}, {"data": [[20.0, 0.25]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[20.0, 0.25]], "isOverall": false, "label": "Publish Policy-0-Aggregated", "isController": false}, {"data": [[19.0, 0.0], [20.0, 0.4736842105263158]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[19.95, 0.45]], "isOverall": false, "label": "WS open for kyc grant-0-Aggregated", "isController": false}, {"data": [[16.0, 2.5], [17.0, 1.75], [19.0, 2.5], [20.0, 3.0], [7.0, 18.0]], "isOverall": false, "label": "Get issues-0", "isController": false}, {"data": [[16.5, 3.8000000000000003]], "isOverall": false, "label": "Get issues-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 20.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 19.833333333333332, "minX": 1.69821924E12, "maxY": 403194.1, "series": [{"data": [[1.69821924E12, 1459.3], [1.6982202E12, 11455.7], [1.6982199E12, 8822.116666666667], [1.69821984E12, 9127.166666666666], [1.69821954E12, 8410.066666666668], [1.6982205E12, 233970.53333333333], [1.69821996E12, 9357.166666666666], [1.69821966E12, 8380.366666666667], [1.69822062E12, 2244.516666666667], [1.6982196E12, 8331.25], [1.69822056E12, 29648.883333333335], [1.6982193E12, 3930.4166666666665], [1.69822026E12, 33415.38333333333], [1.69821972E12, 8742.333333333334], [1.69821942E12, 8224.816666666668], [1.69822038E12, 298977.7833333333], [1.69821936E12, 6289.333333333333], [1.69822032E12, 103778.6], [1.69822002E12, 10957.05], [1.69821948E12, 8883.633333333333], [1.69822044E12, 403194.1], [1.69822014E12, 8791.8], [1.69822008E12, 11789.366666666667], [1.69821978E12, 8982.083333333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69821924E12, 267.45], [1.6982202E12, 1300.2333333333333], [1.6982199E12, 1184.6833333333334], [1.69821984E12, 1249.3833333333334], [1.69821954E12, 1205.4666666666667], [1.6982205E12, 1977.1], [1.69821996E12, 1218.15], [1.69821966E12, 1184.6], [1.69822062E12, 19.833333333333332], [1.6982196E12, 1184.6833333333334], [1.69822056E12, 237.66666666666666], [1.6982193E12, 656.1166666666667], [1.69822026E12, 1742.8833333333334], [1.69821972E12, 1215.8], [1.69821942E12, 1272.8166666666666], [1.69822038E12, 4590.183333333333], [1.69821936E12, 1030.4], [1.69822032E12, 3815.866666666667], [1.69822002E12, 1406.7333333333333], [1.69821948E12, 1270.15], [1.69822044E12, 4648.75], [1.69822014E12, 1184.7], [1.69822008E12, 1616.4166666666667], [1.69821978E12, 1236.6166666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69822062E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69821924E12, "maxY": 1024162.3333333334, "series": [{"data": [[1.69822038E12, 267.0], [1.6982205E12, 270.25], [1.69822044E12, 266.6666666666667], [1.69822056E12, 319.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69822038E12, 1.25], [1.69822032E12, 0.4], [1.69822044E12, 1.0], [1.69822026E12, 1.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.69821984E12, 589461.0], [1.69822002E12, 730682.8333333334], [1.69821948E12, 248727.0], [1.69821996E12, 744463.0], [1.69822008E12, 725623.9090909092]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69822038E12, 2.0], [1.6982205E12, 1.0], [1.69822044E12, 0.2]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69822038E12, 0.8749999999999999], [1.69822032E12, 0.3333333333333333], [1.69822044E12, 0.0], [1.69822026E12, 0.5]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.69821924E12, 0.4], [1.69821942E12, 0.33333333333333337], [1.69821936E12, 0.0], [1.6982193E12, 0.16666666666666669]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.69822038E12, 1.5714285714285714], [1.6982205E12, 1.4285714285714286], [1.69822044E12, 1.0500000000000003]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.69822038E12, 2.0], [1.69822032E12, 1.0], [1.6982205E12, 2.0], [1.69822044E12, 0.8333333333333334]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.6982202E12, 0.3153153153153152], [1.6982199E12, 0.41666666666666663], [1.69821984E12, 0.5], [1.69821954E12, 0.33333333333333337], [1.69821996E12, 0.3846153846153846], [1.69821966E12, 0.33333333333333337], [1.6982196E12, 0.33333333333333337], [1.69822026E12, 0.3829787234042553], [1.69821972E12, 0.5], [1.69822038E12, 0.7142857142857143], [1.69822032E12, 0.21428571428571427], [1.69822002E12, 0.32142857142857145], [1.69821948E12, 0.0], [1.69822014E12, 0.3157894736842105], [1.69822008E12, 0.4318181818181819], [1.69821978E12, 0.8]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69822038E12, 3.0], [1.6982205E12, 1.3333333333333333], [1.69822044E12, 1.2]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.69821924E12, 241.6], [1.69821942E12, 243.66666666666666], [1.69821936E12, 241.66666666666666], [1.6982193E12, 242.83333333333331]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.69822038E12, 264.2], [1.69822032E12, 267.5], [1.69822044E12, 272.3333333333333]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69822038E12, 284.5], [1.6982205E12, 271.6666666666667], [1.69822044E12, 271.4]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69822038E12, 14856.5], [1.6982205E12, 15512.8], [1.69822044E12, 15791.333333333334]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.6982202E12, 27649.0], [1.69822038E12, 19241.714285714286], [1.69822032E12, 17859.699999999997], [1.69822026E12, 28605.5]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69822038E12, 257.75], [1.69822032E12, 234.6], [1.69822044E12, 233.0], [1.69822062E12, 180225.0], [1.69822026E12, 235.5]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.69822038E12, 55729.333333333336], [1.69822032E12, 64086.5], [1.6982205E12, 60456.0], [1.69822044E12, 56324.333333333336]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.69821984E12, 227.0], [1.69822002E12, 233.66666666666669], [1.69821948E12, 227.0], [1.69821996E12, 226.0], [1.69822008E12, 232.8181818181818]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69822038E12, 3548.0], [1.6982205E12, 3533.5], [1.69822044E12, 3690.6666666666665], [1.69822056E12, 3530.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.69822038E12, 11732.0], [1.6982205E12, 12532.0], [1.69822044E12, 10826.6]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.69822038E12, 0.7142857142857143], [1.69822032E12, 1.0], [1.6982205E12, 1.0], [1.69822044E12, 0.9411764705882353]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.69822038E12, 256.0], [1.69822032E12, 245.5], [1.69822044E12, 253.66666666666666]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.6982202E12, 441.5], [1.69822038E12, 392.0], [1.69822032E12, 226.91666666666666], [1.69822026E12, 373.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69822038E12, 1.5], [1.69822032E12, 0.6], [1.69822044E12, 0.0], [1.69822062E12, 0.0], [1.69822026E12, 0.5]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69822038E12, 278.0], [1.6982205E12, 276.5], [1.69822044E12, 430.0], [1.69822056E12, 272.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69822038E12, 1.0], [1.6982205E12, 3.0], [1.69822044E12, 1.4000000000000001], [1.69822062E12, 2.0], [1.69822056E12, 2.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.6982202E12, 227.0], [1.69822038E12, 239.83333333333337], [1.69822032E12, 232.62068965517244], [1.6982205E12, 231.99999999999997], [1.69822044E12, 231.32142857142856], [1.69822056E12, 233.5], [1.69822026E12, 232.12500000000003]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.69822038E12, 294.43055555555543], [1.69822032E12, 268.1818181818182], [1.69822044E12, 268.27272727272725], [1.69822026E12, 285.6363636363636]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.6982202E12, 6963.25], [1.69822038E12, 1000.34375], [1.69822032E12, 913.4772727272727], [1.69822044E12, 228.0], [1.69822026E12, 3903.9375]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69822038E12, 19942.5], [1.69822032E12, 17376.666666666668], [1.6982205E12, 60224.0], [1.69822026E12, 13379.5]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.6982202E12, 0.75], [1.69822038E12, 0.5], [1.69822032E12, 0.42857142857142855], [1.69822026E12, 0.22222222222222227]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.69822038E12, 11686.0], [1.69822032E12, 11678.0], [1.6982205E12, 13310.0], [1.69822044E12, 15362.6]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.69822038E12, 1.5833333333333335], [1.69822032E12, 0.7727272727272728], [1.69822044E12, 0.8636363636363635], [1.69822026E12, 0.45454545454545453]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69822038E12, 1.6], [1.69822032E12, 0.6666666666666667], [1.69822026E12, 1.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.69822038E12, 12458.5], [1.69822032E12, 12423.0], [1.6982205E12, 14078.0], [1.69822044E12, 16104.2]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.69821924E12, 0.4], [1.6982202E12, 0.0], [1.69821984E12, 0.0], [1.6982205E12, 1.5], [1.69821996E12, 10.0], [1.6982193E12, 0.33333333333333337], [1.69822026E12, 1.0], [1.69821942E12, 0.0], [1.69822038E12, 1.375], [1.69821936E12, 0.16666666666666666], [1.69822032E12, 0.38461538461538464], [1.69822002E12, 0.33333333333333337], [1.69821948E12, 0.0], [1.69822044E12, 1.1538461538461537], [1.69822008E12, 0.3636363636363636]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69822038E12, 489.0], [1.6982205E12, 475.0], [1.69822044E12, 524.8]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69822038E12, 4341.0], [1.6982205E12, 4296.5], [1.69822044E12, 4444.333333333333], [1.69822056E12, 4336.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69822038E12, 1.5], [1.69822032E12, 0.2], [1.69822044E12, 1.0], [1.69822026E12, 0.5]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.69822038E12, 12569.0], [1.6982205E12, 13283.333333333334], [1.69822044E12, 11586.8]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.69821924E12, 934.4], [1.69821942E12, 939.0], [1.69821936E12, 928.6666666666666], [1.6982193E12, 955.1666666666666]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.69822038E12, 346.8333333333333], [1.6982205E12, 353.625], [1.69822044E12, 337.7333333333334], [1.69822056E12, 245.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.69821942E12, 0.6666666666666666], [1.69821936E12, 0.33333333333333337], [1.6982193E12, 0.5]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.69821924E12, 0.16666666666666669], [1.69821942E12, 0.5], [1.69821936E12, 0.16666666666666669], [1.6982193E12, 0.16666666666666669]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.69821984E12, 257.0], [1.69822002E12, 256.33333333333337], [1.69821948E12, 250.0], [1.69821996E12, 248.0], [1.69822008E12, 254.36363636363637]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.6982205E12, 47231.6], [1.69822044E12, 52227.0], [1.69822062E12, 57839.0], [1.69822056E12, 63715.5]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69822038E12, 568.6], [1.69822032E12, 558.3333333333334], [1.69822026E12, 574.5]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.69821984E12, 1.0], [1.69822002E12, 0.16666666666666669], [1.69821948E12, 0.0], [1.69821996E12, 0.0], [1.69822008E12, 0.5454545454545454]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69822038E12, 1.5], [1.6982205E12, 1.5], [1.69822044E12, 1.3333333333333333], [1.69822056E12, 2.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69822038E12, 494.4], [1.69822032E12, 615.3333333333334], [1.69822026E12, 473.5]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69822038E12, 249.25], [1.69822032E12, 237.4], [1.69822044E12, 449.5], [1.69822026E12, 235.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69822038E12, 0.8], [1.69822032E12, 0.33333333333333337], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.69822038E12, 0.8], [1.69822032E12, 0.0], [1.69822044E12, 0.6666666666666666]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.69822038E12, 34078.0], [1.6982205E12, 26918.0], [1.69822044E12, 27610.85714285714]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.69821924E12, 0.3], [1.6982199E12, 0.19607843137254907], [1.69821984E12, 0.3027522935779817], [1.69821954E12, 0.30909090909090897], [1.69821996E12, 0.41584158415841577], [1.69821966E12, 0.2870370370370371], [1.6982196E12, 0.22222222222222232], [1.6982193E12, 0.2666666666666666], [1.69821972E12, 0.2342342342342343], [1.69821942E12, 0.350877192982456], [1.69821936E12, 0.2345679012345679], [1.69822002E12, 0.34090909090909083], [1.69821948E12, 0.2758620689655172], [1.69822008E12, 0.1875], [1.69821978E12, 0.28070175438596495]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.69822038E12, 281.0], [1.69822032E12, 251.57142857142856], [1.6982205E12, 257.0], [1.69822044E12, 249.88235294117644]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.69822038E12, 693.5], [1.69822032E12, 701.5], [1.6982205E12, 687.0], [1.69822044E12, 687.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69822038E12, 266.5], [1.69822032E12, 243.2], [1.69822044E12, 233.0], [1.69822026E12, 233.5]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.6982202E12, 227.0], [1.69822038E12, 10581.92857142857], [1.69822032E12, 11151.1], [1.69822044E12, 7270.0], [1.69822026E12, 17359.333333333336]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.6982202E12, 967596.0], [1.69822038E12, 1024162.3333333334], [1.69822032E12, 973432.9090909091], [1.69822026E12, 1016340.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.69821924E12, 258.6], [1.69821942E12, 270.6666666666667], [1.69821936E12, 263.3333333333333], [1.6982193E12, 261.83333333333337]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.69822038E12, 15738.0], [1.69822032E12, 14137.0], [1.6982205E12, 12859.0], [1.69822044E12, 12293.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.6982202E12, 2.0], [1.69822038E12, 0.6666666666666666], [1.69822032E12, 0.45454545454545453], [1.69822044E12, 1.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.6982202E12, 548485.5], [1.69822038E12, 286721.3333333333], [1.69822032E12, 257147.0], [1.69822026E12, 261539.75]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69822038E12, 278.875], [1.6982205E12, 270.2941176470589], [1.69822044E12, 302.6470588235294]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69822038E12, 276.75], [1.69822032E12, 268.44444444444446], [1.69822044E12, 268.0], [1.69822026E12, 277.5]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69822038E12, 1.0], [1.69822032E12, 4.4], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.33333333333333337], [1.69822026E12, 0.5]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.69822038E12, 262.57142857142856], [1.6982205E12, 321.0], [1.69822044E12, 307.74999999999994]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69822038E12, 0.5], [1.69822032E12, 0.6666666666666667], [1.6982205E12, 1.0], [1.69822026E12, 0.5]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.69821924E12, 244.29999999999998], [1.6982199E12, 314.69607843137254], [1.69821984E12, 316.17431192660524], [1.69821954E12, 312.9363636363637], [1.69821996E12, 315.2376237623763], [1.69821966E12, 313.8055555555555], [1.6982196E12, 313.1666666666667], [1.6982193E12, 292.7555555555556], [1.69821972E12, 316.4684684684683], [1.69821942E12, 309.7894736842104], [1.69821936E12, 303.7654320987654], [1.69822002E12, 321.5568181818183], [1.69821948E12, 317.69827586206907], [1.69822008E12, 327.40625], [1.69821978E12, 314.7719298245615]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.6982202E12, 862.0], [1.69822038E12, 916.8333333333334], [1.69822032E12, 849.3636363636364], [1.69822044E12, 848.0], [1.69822026E12, 852.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.9000000000000001], [1.69822032E12, 0.4137931034482758], [1.6982205E12, 1.3846153846153846], [1.69822044E12, 1.5714285714285714], [1.69822056E12, 1.0], [1.69822026E12, 0.25]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.6982202E12, 1.0], [1.69822038E12, 0.6666666666666667], [1.69822032E12, 0.16666666666666669], [1.69822026E12, 0.33333333333333337]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.69822038E12, 312.3636363636363], [1.69822032E12, 470.5], [1.6982205E12, 264.75], [1.69822044E12, 313.8888888888889]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.69822038E12, 3.0], [1.6982205E12, 1.0], [1.69822044E12, 1.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69822038E12, 6428.5], [1.6982205E12, 7854.2307692307695], [1.69822044E12, 8288.8], [1.69822062E12, 11965.0], [1.69822056E12, 8714.25]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.6982202E12, 1.0], [1.69822038E12, 0.71875], [1.69822032E12, 0.4545454545454546], [1.69822044E12, 0.0], [1.69822026E12, 0.375]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69822038E12, 260.75], [1.69822032E12, 244.0], [1.6982205E12, 180217.75], [1.69822044E12, 30240.0], [1.69822056E12, 180217.0], [1.69822026E12, 237.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.69822038E12, 1.8333333333333333], [1.6982205E12, 4.5], [1.69822044E12, 1.533333333333333], [1.69822056E12, 1.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.69821924E12, 672.6666666666667], [1.69821942E12, 667.5], [1.69821936E12, 661.8333333333333], [1.6982193E12, 692.5]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.6982202E12, 228.0], [1.69822038E12, 241.61111111111114], [1.69822032E12, 255.60000000000005], [1.69822026E12, 230.33333333333334]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69822038E12, 2.1250000000000004], [1.6982205E12, 1.6470588235294115], [1.69822044E12, 1.941176470588235]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.69822038E12, 293.0], [1.6982205E12, 265.0], [1.69822044E12, 274.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.69821924E12, 230.2], [1.6982202E12, 226.0], [1.69821984E12, 229.0], [1.6982205E12, 231.0], [1.69821996E12, 269.0], [1.6982193E12, 228.66666666666666], [1.69822026E12, 233.0], [1.69821942E12, 230.33333333333334], [1.69822038E12, 241.5625], [1.69821936E12, 232.33333333333334], [1.69822032E12, 234.84615384615384], [1.69822002E12, 233.33333333333334], [1.69821948E12, 230.0], [1.69822044E12, 230.69230769230768], [1.69822008E12, 237.54545454545453]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.6982202E12, 316.3333333333334], [1.6982199E12, 313.00000000000006], [1.69821984E12, 293.49999999999994], [1.69821954E12, 312.8333333333333], [1.69821996E12, 311.2307692307692], [1.69821966E12, 313.1666666666667], [1.6982196E12, 312.0], [1.69822026E12, 324.50000000000006], [1.69821972E12, 314.0], [1.69822038E12, 452.57142857142856], [1.69822032E12, 364.10714285714283], [1.69822002E12, 303.6785714285715], [1.69821948E12, 244.0], [1.69822014E12, 320.04385964912274], [1.69822008E12, 311.4659090909091], [1.69821978E12, 327.8]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.69822038E12, 0.6], [1.69822032E12, 0.5], [1.69822044E12, 1.3333333333333333]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.69822038E12, 1.0], [1.69822032E12, 8.0], [1.6982205E12, 1.0], [1.69822044E12, 0.8]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.69822038E12, 1.9090909090909092], [1.69822032E12, 1.0], [1.6982205E12, 1.5], [1.69822044E12, 1.3703703703703707]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.69821984E12, 0.0], [1.69822002E12, 0.16666666666666669], [1.69821948E12, 0.0], [1.69821996E12, 0.0], [1.69822008E12, 0.36363636363636365]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.5], [1.69822032E12, 0.4545454545454546], [1.69822044E12, 0.0], [1.69822026E12, 1.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69822038E12, 3.0], [1.6982205E12, 2.0], [1.69822044E12, 2.0], [1.69822056E12, 18.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69822062E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69821924E12, "maxY": 180225.0, "series": [{"data": [[1.69822038E12, 263.0], [1.6982205E12, 267.5], [1.69822044E12, 264.6666666666667], [1.69822056E12, 300.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.69821984E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69821996E12, 0.0], [1.69822008E12, 0.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.6982193E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.6982199E12, 0.0], [1.69821984E12, 0.0], [1.69821954E12, 0.0], [1.69821996E12, 0.0], [1.69821966E12, 0.0], [1.6982196E12, 0.0], [1.69822026E12, 0.0], [1.69821972E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69822014E12, 0.0], [1.69822008E12, 0.0], [1.69821978E12, 0.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.69821924E12, 241.0], [1.69821942E12, 243.33333333333334], [1.69821936E12, 241.33333333333334], [1.6982193E12, 242.5]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.69822038E12, 263.2], [1.69822032E12, 266.5], [1.69822044E12, 270.6666666666667]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69822038E12, 281.5], [1.6982205E12, 270.0], [1.69822044E12, 270.4]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69822038E12, 256.25], [1.69822032E12, 233.8], [1.69822044E12, 233.0], [1.69822062E12, 180225.0], [1.69822026E12, 235.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.69821984E12, 226.0], [1.69822002E12, 233.16666666666666], [1.69821948E12, 226.0], [1.69821996E12, 226.0], [1.69822008E12, 232.0909090909091]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.69822038E12, 255.0], [1.69822032E12, 245.5], [1.69822044E12, 253.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.6982202E12, 440.0], [1.69822038E12, 391.33333333333337], [1.69822032E12, 226.41666666666669], [1.69822026E12, 372.66666666666663]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822062E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69822038E12, 276.5], [1.6982205E12, 274.5], [1.69822044E12, 428.0], [1.69822056E12, 270.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822062E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.6982202E12, 227.0], [1.69822038E12, 238.63333333333338], [1.69822032E12, 232.1379310344828], [1.6982205E12, 230.6153846153846], [1.69822044E12, 229.57142857142858], [1.69822056E12, 232.5], [1.69822026E12, 231.75]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.69822038E12, 292.6944444444445], [1.69822032E12, 267.31818181818176], [1.69822044E12, 267.3181818181818], [1.69822026E12, 285.09090909090907]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.6982202E12, 6962.25], [1.69822038E12, 999.4999999999998], [1.69822032E12, 912.9204545454548], [1.69822044E12, 228.0], [1.69822026E12, 3903.4375]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69822038E12, 19941.5], [1.69822032E12, 17376.0], [1.6982205E12, 60223.0], [1.69822026E12, 13379.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.69821924E12, 0.0], [1.6982202E12, 0.0], [1.69821984E12, 0.0], [1.6982205E12, 0.0], [1.69821996E12, 0.0], [1.6982193E12, 0.0], [1.69822026E12, 0.0], [1.69821942E12, 0.0], [1.69822038E12, 0.0], [1.69821936E12, 0.0], [1.69822032E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69822044E12, 0.0], [1.69822008E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69822038E12, 255.0], [1.6982205E12, 260.0], [1.69822044E12, 264.6]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.69821924E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.6982193E12, 0.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.69822038E12, 344.8333333333333], [1.6982205E12, 349.0], [1.69822044E12, 336.0666666666667], [1.69822056E12, 244.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.6982193E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.6982193E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.69821984E12, 256.0], [1.69822002E12, 256.0], [1.69821948E12, 250.0], [1.69821996E12, 247.0], [1.69822008E12, 253.72727272727275]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822062E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69822038E12, 566.8], [1.69822032E12, 557.6666666666666], [1.69822026E12, 573.5]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.69821984E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69821996E12, 0.0], [1.69822008E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69822038E12, 260.4], [1.69822032E12, 395.0], [1.69822026E12, 263.5]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69822038E12, 248.0], [1.69822032E12, 236.8], [1.69822044E12, 448.5], [1.69822026E12, 234.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.69821924E12, 0.0], [1.6982199E12, 0.0], [1.69821984E12, 0.0], [1.69821954E12, 0.0], [1.69821996E12, 0.0], [1.69821966E12, 0.0], [1.6982196E12, 0.0], [1.6982193E12, 0.0], [1.69821972E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69822008E12, 0.0], [1.69821978E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.69822038E12, 280.1428571428571], [1.69822032E12, 250.57142857142858], [1.6982205E12, 256.0], [1.69822044E12, 248.82352941176467]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.69822038E12, 274.0], [1.69822032E12, 271.0], [1.6982205E12, 266.0], [1.69822044E12, 268.8]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69822038E12, 264.5], [1.69822032E12, 243.0], [1.69822044E12, 232.0], [1.69822026E12, 233.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.6982202E12, 225.0], [1.69822038E12, 107.42857142857144], [1.69822032E12, 125.70000000000002], [1.69822044E12, 113.0], [1.69822026E12, 78.0]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.69821924E12, 257.8], [1.69821942E12, 269.6666666666667], [1.69821936E12, 262.83333333333337], [1.6982193E12, 261.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.69822038E12, 15736.0], [1.69822032E12, 14136.0], [1.6982205E12, 12857.0], [1.69822044E12, 12292.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69822038E12, 276.5], [1.6982205E12, 268.5882352941176], [1.69822044E12, 300.52941176470586]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69822038E12, 275.875], [1.69822032E12, 268.0], [1.69822044E12, 268.0], [1.69822026E12, 276.5]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.69822038E12, 260.7142857142857], [1.6982205E12, 319.2857142857143], [1.69822044E12, 306.40000000000003]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.69821924E12, 243.6], [1.6982199E12, 314.3137254901963], [1.69821984E12, 315.7247706422015], [1.69821954E12, 312.40000000000003], [1.69821996E12, 314.69306930693085], [1.69821966E12, 313.38888888888886], [1.6982196E12, 312.7777777777777], [1.6982193E12, 292.28888888888895], [1.69821972E12, 316.08108108108115], [1.69821942E12, 309.24561403508767], [1.69821936E12, 303.3703703703703], [1.69822002E12, 321.11363636363643], [1.69821948E12, 317.3362068965518], [1.69822008E12, 326.96875], [1.69821978E12, 314.37719298245605]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.69822038E12, 309.81818181818176], [1.69822032E12, 469.5], [1.6982205E12, 262.5], [1.69822044E12, 312.1481481481481]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69822038E12, 6427.5], [1.6982205E12, 7851.115384615384], [1.69822044E12, 8287.3], [1.69822062E12, 11962.0], [1.69822056E12, 8712.125]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69822038E12, 259.75], [1.69822032E12, 239.4], [1.6982205E12, 180217.25], [1.69822044E12, 30240.0], [1.69822056E12, 180216.33333333334], [1.69822026E12, 236.5]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.69821924E12, 672.1666666666666], [1.69821942E12, 667.0], [1.69821936E12, 661.5], [1.6982193E12, 692.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.6982202E12, 227.25], [1.69822038E12, 240.66666666666669], [1.69822032E12, 255.02857142857147], [1.69822026E12, 229.88888888888889]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.69822038E12, 288.5], [1.6982205E12, 263.0], [1.69822044E12, 272.2857142857143]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.69821924E12, 229.6], [1.6982202E12, 226.0], [1.69821984E12, 229.0], [1.6982205E12, 229.33333333333334], [1.69821996E12, 259.0], [1.6982193E12, 228.0], [1.69822026E12, 232.0], [1.69821942E12, 230.0], [1.69822038E12, 240.125], [1.69821936E12, 232.16666666666666], [1.69822032E12, 234.46153846153848], [1.69822002E12, 233.0], [1.69821948E12, 230.0], [1.69822044E12, 229.38461538461536], [1.69822008E12, 237.1818181818182]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.6982202E12, 312.108108108108], [1.6982199E12, 312.5833333333333], [1.69821984E12, 293.0], [1.69821954E12, 312.5], [1.69821996E12, 310.7692307692308], [1.69821966E12, 312.66666666666663], [1.6982196E12, 311.3333333333333], [1.69822026E12, 315.11702127659566], [1.69821972E12, 313.1666666666667], [1.69822038E12, 335.42857142857144], [1.69822032E12, 326.60714285714295], [1.69822002E12, 303.17857142857144], [1.69821948E12, 244.0], [1.69822014E12, 319.51754385964904], [1.69822008E12, 310.95454545454555], [1.69821978E12, 326.8]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.69821984E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69821996E12, 0.0], [1.69822008E12, 0.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69822062E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69821924E12, "maxY": 6896.5, "series": [{"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.69821984E12, 3869.0], [1.69822002E12, 4981.0], [1.69821948E12, 1735.0], [1.69821996E12, 5183.0], [1.69822008E12, 4888.545454545454]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.6982193E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.6982199E12, 0.0], [1.69821984E12, 0.0], [1.69821954E12, 0.0], [1.69821996E12, 0.0], [1.69821966E12, 0.0], [1.6982196E12, 0.0], [1.69822026E12, 0.0], [1.69821972E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69822014E12, 0.0], [1.69822008E12, 0.0], [1.69821978E12, 0.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.6982193E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 86.80000000000001], [1.69822044E12, 0.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.6982202E12, 427.0], [1.69822038E12, 123.14285714285714], [1.69822032E12, 86.20000000000002], [1.69822026E12, 0.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822062E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.69822038E12, 414.0], [1.69822032E12, 430.0], [1.6982205E12, 0.0], [1.69822044E12, 431.3333333333333]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.69821984E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69821996E12, 0.0], [1.69822008E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.6982202E12, 213.5], [1.69822038E12, 142.66666666666666], [1.69822032E12, 0.0], [1.69822026E12, 145.33333333333334]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822062E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 147.33333333333334], [1.69822056E12, 0.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822062E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.69822038E12, 40.458333333333336], [1.69822032E12, 19.45454545454546], [1.69822044E12, 19.68181818181818], [1.69822026E12, 39.27272727272727]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 30.968749999999996], [1.69822032E12, 19.89772727272727], [1.69822044E12, 0.0], [1.69822026E12, 26.875000000000004]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 86.6]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.69821924E12, 0.0], [1.6982202E12, 0.0], [1.69821984E12, 0.0], [1.6982205E12, 0.0], [1.69821996E12, 0.0], [1.6982193E12, 0.0], [1.69822026E12, 0.0], [1.69821942E12, 0.0], [1.69822038E12, 0.0], [1.69821936E12, 0.0], [1.69822032E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69822044E12, 0.0], [1.69822008E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 147.33333333333334], [1.69822056E12, 0.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 285.3333333333333], [1.69822044E12, 86.6]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.69821924E12, 440.2], [1.69821942E12, 435.0], [1.69821936E12, 434.1666666666667], [1.6982193E12, 461.16666666666663]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.6982193E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.6982193E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.69821984E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69821996E12, 0.0], [1.69822008E12, 0.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.6982205E12, 177.8], [1.69822044E12, 433.5], [1.69822062E12, 619.0], [1.69822056E12, 435.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.69821984E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69821996E12, 0.0], [1.69822008E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 144.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 216.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.69822038E12, 480.0], [1.6982205E12, 0.0], [1.69822044E12, 188.1428571428571]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.69821924E12, 0.0], [1.6982199E12, 0.0], [1.69821984E12, 0.0], [1.69821954E12, 0.0], [1.69821996E12, 0.0], [1.69821966E12, 0.0], [1.6982196E12, 0.0], [1.6982193E12, 0.0], [1.69821972E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69822008E12, 0.0], [1.69821978E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.69822038E12, 30.928571428571427], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 646.7857142857143], [1.69822032E12, 426.0], [1.69822044E12, 424.0], [1.69822026E12, 714.0]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.6982202E12, 6449.0], [1.69822038E12, 6892.333333333333], [1.69822032E12, 6680.181818181818], [1.69822026E12, 6896.5]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.69821924E12, 0.0], [1.69821942E12, 0.0], [1.69821936E12, 0.0], [1.6982193E12, 0.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.6982202E12, 3647.0], [1.69822038E12, 2016.3333333333333], [1.69822032E12, 1813.2727272727273], [1.69822026E12, 1726.75]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 25.529411764705884]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 60.71428571428571], [1.69822044E12, 43.2]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.6982199E12, 73.20588235294116], [1.69821984E12, 71.33027522935784], [1.69821954E12, 70.38181818181818], [1.69821996E12, 72.60396039603964], [1.69821966E12, 71.32407407407409], [1.6982196E12, 71.46296296296295], [1.6982193E12, 48.37777777777779], [1.69821972E12, 73.45945945945942], [1.69821942E12, 64.4736842105263], [1.69821936E12, 58.59259259259258], [1.69822002E12, 78.63636363636363], [1.69821948E12, 74.20689655172413], [1.69822008E12, 80.96875], [1.69821978E12, 71.60526315789477]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.6982202E12, 861.0], [1.69822038E12, 916.0], [1.69822032E12, 848.818181818182], [1.69822044E12, 848.0], [1.69822026E12, 851.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.69822038E12, 48.27272727272727], [1.69822032E12, 214.5], [1.6982205E12, 0.0], [1.69822044E12, 48.77777777777778]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 67.65384615384616], [1.69822044E12, 86.69999999999999], [1.69822062E12, 619.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.69821924E12, 439.66666666666663], [1.69821942E12, 436.5], [1.69821936E12, 433.33333333333337], [1.6982193E12, 461.1666666666667]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 24.571428571428573], [1.69822026E12, 0.0]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.6982202E12, 0.0], [1.69821984E12, 0.0], [1.6982205E12, 0.0], [1.69821996E12, 0.0], [1.6982193E12, 0.0], [1.69822026E12, 0.0], [1.69821942E12, 0.0], [1.69822038E12, 0.0], [1.69821936E12, 0.0], [1.69822032E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69822044E12, 0.0], [1.69822008E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.6982202E12, 70.36936936936935], [1.6982199E12, 71.66666666666667], [1.69821984E12, 53.375], [1.69821954E12, 71.16666666666667], [1.69821996E12, 66.3076923076923], [1.69821966E12, 71.5], [1.6982196E12, 70.83333333333333], [1.69822026E12, 73.54255319148933], [1.69821972E12, 71.33333333333333], [1.69822038E12, 63.99999999999999], [1.69822032E12, 84.67857142857144], [1.69822002E12, 61.32142857142857], [1.69821948E12, 0.0], [1.69822014E12, 71.92105263157892], [1.69822008E12, 69.07954545454545], [1.69821978E12, 85.8]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.69821984E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69821996E12, 0.0], [1.69822008E12, 0.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.6982202E12, 0.0], [1.69822038E12, 0.0], [1.69822032E12, 0.0], [1.69822044E12, 0.0], [1.69822026E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69822038E12, 0.0], [1.6982205E12, 0.0], [1.69822044E12, 0.0], [1.69822056E12, 0.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69822062E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69821924E12, "maxY": 60240.0, "series": [{"data": [[1.69821924E12, 683.0], [1.6982202E12, 23530.0], [1.6982199E12, 820.0], [1.69821984E12, 722.0], [1.69821954E12, 665.0], [1.6982205E12, 12859.0], [1.69821996E12, 671.0], [1.69821966E12, 667.0], [1.69822062E12, 11965.0], [1.6982196E12, 662.0], [1.69822056E12, 11319.0], [1.6982193E12, 809.0], [1.69822026E12, 20159.0], [1.69821972E12, 670.0], [1.69821942E12, 676.0], [1.69822038E12, 18275.0], [1.69821936E12, 667.0], [1.69822032E12, 18641.0], [1.69822002E12, 669.0], [1.69821948E12, 665.0], [1.69822044E12, 60240.0], [1.69822014E12, 925.0], [1.69822008E12, 670.0], [1.69821978E12, 663.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69821924E12, 544.4000000000011], [1.6982202E12, 268.3000000000002], [1.6982199E12, 250.49999999999997], [1.69821984E12, 257.0], [1.69821954E12, 252.70000000000002], [1.6982205E12, 1344.400000000001], [1.69821996E12, 259.0], [1.69821966E12, 256.1], [1.69822062E12, 11965.0], [1.6982196E12, 249.2], [1.69822056E12, 11234.0], [1.6982193E12, 261.3000000000001], [1.69822026E12, 435.8000000000055], [1.69821972E12, 256.0], [1.69821942E12, 267.8], [1.69822038E12, 299.80000000000007], [1.69821936E12, 262.9], [1.69822032E12, 273.70000000000005], [1.69822002E12, 258.1], [1.69821948E12, 255.5], [1.69822044E12, 302.5], [1.69822014E12, 252.0], [1.69822008E12, 257.3], [1.69821978E12, 257.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69821924E12, 683.0], [1.6982202E12, 2275.2899999999963], [1.6982199E12, 666.5500000000001], [1.69821984E12, 697.3200000000002], [1.69821954E12, 664.67], [1.6982205E12, 11685.96], [1.69821996E12, 666.65], [1.69821966E12, 661.0], [1.69822062E12, 11965.0], [1.6982196E12, 660.0], [1.69822056E12, 11319.0], [1.6982193E12, 757.1299999999981], [1.69822026E12, 19593.770000000004], [1.69821972E12, 663.95], [1.69821942E12, 664.98], [1.69822038E12, 12771.160000000058], [1.69821936E12, 667.0], [1.69822032E12, 10653.82000000001], [1.69822002E12, 666.0], [1.69821948E12, 664.55], [1.69822044E12, 13361.950000000008], [1.69822014E12, 667.13], [1.69822008E12, 669.0], [1.69821978E12, 661.61]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69821924E12, 673.9499999999999], [1.6982202E12, 659.0], [1.6982199E12, 656.0], [1.69821984E12, 655.9], [1.69821954E12, 656.35], [1.6982205E12, 11249.0], [1.69821996E12, 661.0], [1.69821966E12, 655.55], [1.69822062E12, 11965.0], [1.6982196E12, 655.55], [1.69822056E12, 11283.5], [1.6982193E12, 669.0], [1.69822026E12, 660.0], [1.69821972E12, 655.25], [1.69821942E12, 660.0], [1.69822038E12, 674.1999999999994], [1.69821936E12, 660.45], [1.69822032E12, 823.2500000000028], [1.69822002E12, 658.0], [1.69821948E12, 658.75], [1.69822044E12, 704.5], [1.69822014E12, 658.55], [1.69822008E12, 658.65], [1.69821978E12, 657.05]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69821924E12, 0.0], [1.6982202E12, 0.0], [1.6982199E12, 0.0], [1.69821984E12, 0.0], [1.69821954E12, 0.0], [1.6982205E12, 0.0], [1.69821996E12, 0.0], [1.69821966E12, 0.0], [1.69822062E12, 0.0], [1.6982196E12, 0.0], [1.69822056E12, 0.0], [1.6982193E12, 0.0], [1.69822026E12, 0.0], [1.69821972E12, 0.0], [1.69821942E12, 0.0], [1.69822038E12, 0.0], [1.69821936E12, 0.0], [1.69822032E12, 0.0], [1.69822002E12, 0.0], [1.69821948E12, 0.0], [1.69822044E12, 0.0], [1.69822014E12, 0.0], [1.69822008E12, 0.0], [1.69821978E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69821924E12, 114.0], [1.6982202E12, 113.0], [1.6982199E12, 118.5], [1.69821984E12, 114.0], [1.69821954E12, 120.5], [1.6982205E12, 22.0], [1.69821996E12, 118.0], [1.69821966E12, 120.5], [1.69822062E12, 2.0], [1.6982196E12, 120.0], [1.69822056E12, 3.0], [1.6982193E12, 114.0], [1.69822026E12, 112.5], [1.69821972E12, 119.5], [1.69821942E12, 115.5], [1.69822038E12, 24.0], [1.69821936E12, 115.0], [1.69822032E12, 122.0], [1.69822002E12, 114.5], [1.69821948E12, 114.0], [1.69822044E12, 122.5], [1.69822014E12, 117.0], [1.69822008E12, 113.0], [1.69821978E12, 120.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69822062E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 1.0, "minX": 2.0, "maxY": 180218.5, "series": [{"data": [[2.0, 3.0], [8.0, 122.5], [9.0, 1.0], [10.0, 123.0], [12.0, 113.0], [14.0, 123.5], [4.0, 23.0], [16.0, 114.5], [18.0, 114.5], [20.0, 114.0], [22.0, 113.0], [6.0, 20.0], [24.0, 112.5], [26.0, 124.5], [28.0, 114.0], [7.0, 2.0], [30.0, 114.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 180218.0], [4.0, 180217.0], [9.0, 60328.0], [6.0, 180218.5], [7.0, 60340.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 30.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 180218.0, "series": [{"data": [[2.0, 0.0], [8.0, 0.0], [9.0, 0.0], [10.0, 0.0], [12.0, 0.0], [14.0, 0.0], [4.0, 0.0], [16.0, 112.0], [18.0, 0.0], [20.0, 113.0], [22.0, 0.0], [6.0, 0.0], [24.0, 0.0], [26.0, 113.5], [28.0, 0.0], [7.0, 0.0], [30.0, 113.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 180217.0], [4.0, 180217.0], [9.0, 30106.5], [6.0, 180218.0], [7.0, 30111.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 30.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.69821924E12, "maxY": 11.1, "series": [{"data": [[1.69821924E12, 1.05], [1.6982202E12, 4.166666666666667], [1.6982199E12, 3.816666666666667], [1.69821984E12, 3.9833333333333334], [1.69821954E12, 3.8833333333333333], [1.6982205E12, 3.433333333333333], [1.69821996E12, 3.9], [1.69821966E12, 3.8], [1.69822062E12, 0.03333333333333333], [1.6982196E12, 3.8], [1.69822056E12, 0.48333333333333334], [1.6982193E12, 2.3], [1.69822026E12, 5.4], [1.69821972E12, 3.8833333333333333], [1.69821942E12, 4.15], [1.69822038E12, 10.133333333333333], [1.69821936E12, 3.5], [1.69822032E12, 11.1], [1.69822002E12, 4.45], [1.69821948E12, 4.066666666666666], [1.69822044E12, 7.416666666666667], [1.69822014E12, 3.8333333333333335], [1.69822008E12, 5.1], [1.69821978E12, 3.9833333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69822062E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69821924E12, "maxY": 10.466666666666667, "series": [{"data": [[1.69821924E12, 0.95], [1.6982202E12, 4.133333333333334], [1.6982199E12, 3.8], [1.69821984E12, 3.9833333333333334], [1.69821954E12, 3.8666666666666667], [1.6982205E12, 3.45], [1.69821996E12, 3.8833333333333333], [1.69821966E12, 3.8], [1.69822062E12, 0.05], [1.6982196E12, 3.8], [1.69822056E12, 0.48333333333333334], [1.6982193E12, 2.2], [1.69822026E12, 5.25], [1.69821972E12, 3.9], [1.69821942E12, 4.116666666666666], [1.69822038E12, 9.8], [1.69821936E12, 3.4], [1.69822032E12, 10.466666666666667], [1.69822002E12, 4.366666666666666], [1.69821948E12, 4.05], [1.69822044E12, 7.366666666666666], [1.69822014E12, 3.8], [1.69822008E12, 4.916666666666667], [1.69821978E12, 3.966666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6982202E12, 0.016666666666666666], [1.69822038E12, 0.1], [1.69822032E12, 0.18333333333333332], [1.69822044E12, 0.016666666666666666], [1.69822026E12, 0.016666666666666666]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.69821924E12, 0.08333333333333333], [1.6982202E12, 0.05], [1.69821984E12, 0.016666666666666666], [1.69821996E12, 0.016666666666666666], [1.6982193E12, 0.1], [1.69822026E12, 0.06666666666666667], [1.69821942E12, 0.05], [1.69822038E12, 0.15], [1.69821936E12, 0.1], [1.69822032E12, 0.38333333333333336], [1.69822002E12, 0.1], [1.69821948E12, 0.016666666666666666], [1.69822044E12, 0.016666666666666666], [1.69822008E12, 0.18333333333333332]], "isOverall": false, "label": "202", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.1], [1.69822062E12, 0.016666666666666666], [1.69822056E12, 0.05]], "isOverall": false, "label": "504", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69822062E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69821924E12, "maxY": 1.9333333333333333, "series": [{"data": [[1.69821924E12, 0.08333333333333333], [1.69821942E12, 0.05], [1.69821936E12, 0.1], [1.6982193E12, 0.1]], "isOverall": false, "label": "Get tenant-success", "isController": true}, {"data": [[1.69822038E12, 0.08333333333333333], [1.69822032E12, 0.05], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Choose registrant-success", "isController": false}, {"data": [[1.69822038E12, 0.13333333333333333], [1.69822032E12, 0.15], [1.69822044E12, 0.016666666666666666], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get hedera id-0-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.05], [1.69822044E12, 0.08333333333333333]], "isOverall": false, "label": "Get result for device approve-success", "isController": true}, {"data": [[1.69822038E12, 0.13333333333333333], [1.6982205E12, 0.2833333333333333], [1.69822044E12, 0.2833333333333333]], "isOverall": false, "label": "Get issue creation status-0-success", "isController": false}, {"data": [[1.69822038E12, 0.13333333333333333], [1.6982205E12, 0.2833333333333333], [1.69822044E12, 0.2833333333333333]], "isOverall": false, "label": "Get issue creation status-success", "isController": false}, {"data": [[1.69821924E12, 0.08333333333333333], [1.6982202E12, 0.016666666666666666], [1.69821984E12, 0.016666666666666666], [1.6982205E12, 0.1], [1.69821996E12, 0.016666666666666666], [1.6982193E12, 0.1], [1.69822026E12, 0.016666666666666666], [1.69821942E12, 0.05], [1.69822038E12, 0.26666666666666666], [1.69821936E12, 0.1], [1.69822032E12, 0.21666666666666667], [1.69822002E12, 0.1], [1.69821948E12, 0.016666666666666666], [1.69822044E12, 0.21666666666666667], [1.69822008E12, 0.18333333333333332]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.06666666666666667], [1.69822044E12, 0.05], [1.69822056E12, 0.016666666666666666]], "isOverall": false, "label": "Get issues-0-success", "isController": false}, {"data": [[1.69821924E12, 0.16666666666666666], [1.6982199E12, 1.7], [1.69821984E12, 1.8166666666666667], [1.69821954E12, 1.8333333333333333], [1.69821996E12, 1.6833333333333333], [1.69821966E12, 1.8], [1.6982196E12, 1.8], [1.6982193E12, 0.75], [1.69821972E12, 1.85], [1.69821942E12, 1.9], [1.69821936E12, 1.35], [1.69822002E12, 1.4666666666666666], [1.69821948E12, 1.9333333333333333], [1.69822008E12, 0.5333333333333333], [1.69821978E12, 1.9]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.69821984E12, 0.016666666666666666], [1.69822002E12, 0.1], [1.69821948E12, 0.016666666666666666], [1.69821996E12, 0.016666666666666666], [1.69822008E12, 0.18333333333333332]], "isOverall": false, "label": "Import-success", "isController": true}, {"data": [[1.6982202E12, 0.016666666666666666], [1.69822038E12, 0.11666666666666667], [1.69822032E12, 0.16666666666666666], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Token associate-success", "isController": true}, {"data": [[1.69822038E12, 0.23333333333333334], [1.69822032E12, 0.11666666666666667], [1.6982205E12, 0.05], [1.69822044E12, 0.2833333333333333]], "isOverall": false, "label": "Get block for approve result-0-success", "isController": false}, {"data": [[1.69822038E12, 0.18333333333333332], [1.69822032E12, 0.03333333333333333], [1.6982205E12, 0.06666666666666667], [1.69822044E12, 0.45]], "isOverall": false, "label": "Get device creation status-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.69822032E12, 0.03333333333333333], [1.6982205E12, 0.016666666666666666], [1.69822044E12, 0.08333333333333333]], "isOverall": false, "label": "Role approve-success", "isController": true}, {"data": [[1.69822038E12, 0.18333333333333332], [1.69822032E12, 0.03333333333333333], [1.6982205E12, 0.06666666666666667], [1.69822044E12, 0.45]], "isOverall": false, "label": "Get device creation status-0-success", "isController": false}, {"data": [[1.69822038E12, 0.016666666666666666], [1.6982205E12, 0.016666666666666666]], "isOverall": false, "label": "Application creation-failure", "isController": false}, {"data": [[1.69822038E12, 0.08333333333333333], [1.69822032E12, 0.03333333333333333], [1.69822044E12, 0.05]], "isOverall": false, "label": "Application creation-success", "isController": true}, {"data": [[1.69822038E12, 0.1], [1.6982205E12, 0.13333333333333333], [1.69822044E12, 0.25], [1.69822056E12, 0.016666666666666666]], "isOverall": false, "label": "Approve device-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.69822032E12, 0.016666666666666666], [1.6982205E12, 0.016666666666666666], [1.69822044E12, 0.1]], "isOverall": false, "label": "Create device-0-success", "isController": false}, {"data": [[1.69821984E12, 0.016666666666666666], [1.69822002E12, 0.1], [1.69821948E12, 0.016666666666666666], [1.69821996E12, 0.016666666666666666], [1.69822008E12, 0.18333333333333332]], "isOverall": false, "label": "Publish Policy-0-success", "isController": false}, {"data": [[1.6982202E12, 0.03333333333333333], [1.69822038E12, 0.05], [1.69822032E12, 0.2], [1.69822026E12, 0.05]], "isOverall": false, "label": "Associate token-0-success", "isController": false}, {"data": [[1.69821924E12, 0.08333333333333333], [1.69821942E12, 0.05], [1.69821936E12, 0.1], [1.6982193E12, 0.1]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.6982202E12, 0.06666666666666667], [1.69822038E12, 0.5333333333333333], [1.69822032E12, 1.4666666666666666], [1.69822044E12, 0.06666666666666667], [1.69822026E12, 0.26666666666666666]], "isOverall": false, "label": "Get tokens-success", "isController": false}, {"data": [[1.6982202E12, 0.016666666666666666], [1.69822038E12, 0.1], [1.69822032E12, 0.18333333333333332], [1.69822044E12, 0.016666666666666666], [1.69822026E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for kyc grant-0-success", "isController": false}, {"data": [[1.69821984E12, 0.016666666666666666], [1.69822002E12, 0.1], [1.69821948E12, 0.016666666666666666], [1.69821996E12, 0.016666666666666666], [1.69822008E12, 0.18333333333333332]], "isOverall": false, "label": "Publish Policy-success", "isController": false}, {"data": [[1.6982202E12, 0.03333333333333333], [1.69822038E12, 0.5], [1.69822032E12, 0.48333333333333334], [1.6982205E12, 0.21666666666666667], [1.69822044E12, 0.4666666666666667], [1.69822056E12, 0.03333333333333333], [1.69822026E12, 0.13333333333333333]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.69822038E12, 0.016666666666666666], [1.6982205E12, 0.016666666666666666]], "isOverall": false, "label": "Choose registrant-failure", "isController": false}, {"data": [[1.6982205E12, 0.08333333333333333], [1.69822044E12, 0.03333333333333333], [1.69822062E12, 0.016666666666666666], [1.69822056E12, 0.03333333333333333]], "isOverall": false, "label": "Token minting verify-success", "isController": true}, {"data": [[1.69822038E12, 0.08333333333333333], [1.69822032E12, 0.03333333333333333], [1.69822044E12, 0.05]], "isOverall": false, "label": "Approve application-success", "isController": false}, {"data": [[1.6982202E12, 0.03333333333333333], [1.69822038E12, 0.05], [1.69822032E12, 0.2], [1.69822026E12, 0.05]], "isOverall": false, "label": "Associate token-success", "isController": false}, {"data": [[1.69822038E12, 0.13333333333333333], [1.69822032E12, 0.15], [1.69822044E12, 0.016666666666666666], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get hedera id-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.69822032E12, 0.03333333333333333], [1.6982205E12, 0.016666666666666666], [1.69822044E12, 0.08333333333333333]], "isOverall": false, "label": "Get result for app approve-success", "isController": true}, {"data": [[1.69822038E12, 0.03333333333333333], [1.69822032E12, 0.03333333333333333], [1.6982205E12, 0.016666666666666666], [1.69822044E12, 0.08333333333333333]], "isOverall": false, "label": "Get device schema-0-success", "isController": false}, {"data": [[1.69821924E12, 0.08333333333333333], [1.69821942E12, 0.05], [1.69821936E12, 0.1], [1.6982193E12, 0.1]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.06666666666666667], [1.69822044E12, 0.05], [1.69822056E12, 0.016666666666666666]], "isOverall": false, "label": "Get issue approve result-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.69822032E12, 0.016666666666666666], [1.6982205E12, 0.016666666666666666], [1.69822044E12, 0.1]], "isOverall": false, "label": "Create device-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.05], [1.69822044E12, 0.08333333333333333]], "isOverall": false, "label": "Device approve-success", "isController": true}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.016666666666666666], [1.69822044E12, 0.11666666666666667]], "isOverall": false, "label": "Get devices-0-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.06666666666666667], [1.69822044E12, 0.05], [1.69822056E12, 0.016666666666666666]], "isOverall": false, "label": "Get issues-success", "isController": false}, {"data": [[1.69822038E12, 0.06666666666666667], [1.69822032E12, 0.08333333333333333], [1.69822044E12, 0.016666666666666666], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get block for waiting device-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.06666666666666667], [1.69822044E12, 0.05], [1.69822056E12, 0.016666666666666666]], "isOverall": false, "label": "Issue approve-success", "isController": true}, {"data": [[1.69821924E12, 0.08333333333333333], [1.69821942E12, 0.05], [1.69821936E12, 0.1], [1.6982193E12, 0.1]], "isOverall": false, "label": "Get Tenant Id-success", "isController": false}, {"data": [[1.69821924E12, 0.1], [1.69821942E12, 0.03333333333333333], [1.69821936E12, 0.1], [1.6982193E12, 0.1]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.69822038E12, 1.2], [1.69822032E12, 0.36666666666666664], [1.69822044E12, 0.36666666666666664], [1.69822026E12, 0.18333333333333332]], "isOverall": false, "label": "Get application creation status-success", "isController": false}, {"data": [[1.6982202E12, 0.06666666666666667], [1.69822038E12, 0.5333333333333333], [1.69822032E12, 1.4666666666666666], [1.69822044E12, 0.06666666666666667], [1.69822026E12, 0.26666666666666666]], "isOverall": false, "label": "Get tokens-0-success", "isController": false}, {"data": [[1.69821984E12, 0.016666666666666666], [1.69822002E12, 0.1], [1.69821948E12, 0.016666666666666666], [1.69821996E12, 0.016666666666666666], [1.69822008E12, 0.18333333333333332]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.6982202E12, 1.85], [1.6982199E12, 0.2], [1.69821984E12, 0.13333333333333333], [1.69821954E12, 0.1], [1.69821996E12, 0.21666666666666667], [1.69821966E12, 0.1], [1.6982196E12, 0.1], [1.69822026E12, 1.5666666666666667], [1.69821972E12, 0.1], [1.69822038E12, 0.11666666666666667], [1.69822032E12, 0.9333333333333333], [1.69822002E12, 0.4666666666666667], [1.69821948E12, 0.05], [1.69822014E12, 1.9], [1.69822008E12, 1.4666666666666666], [1.69821978E12, 0.08333333333333333]], "isOverall": false, "label": "Get policy publish result-0-success", "isController": false}, {"data": [[1.6982205E12, 0.06666666666666667], [1.69822056E12, 0.05]], "isOverall": false, "label": "Get block for waiting app creation-failure", "isController": false}, {"data": [[1.69822062E12, 0.016666666666666666]], "isOverall": false, "label": "Get block for waiting device-failure", "isController": false}, {"data": [[1.69822038E12, 0.06666666666666667], [1.69822032E12, 0.08333333333333333], [1.6982205E12, 0.06666666666666667], [1.69822044E12, 0.03333333333333333], [1.69822056E12, 0.05], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get block for waiting app creation-0-success", "isController": false}, {"data": [[1.69822038E12, 0.08333333333333333], [1.69822032E12, 0.05], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get application schema-0-success", "isController": false}, {"data": [[1.6982202E12, 0.06666666666666667], [1.69822038E12, 0.3], [1.69822032E12, 0.5833333333333334], [1.69822026E12, 0.15]], "isOverall": false, "label": "Get associate result-success", "isController": false}, {"data": [[1.69821924E12, 0.1], [1.69821942E12, 0.03333333333333333], [1.69821936E12, 0.1], [1.6982193E12, 0.1]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.69822038E12, 0.06666666666666667], [1.69822032E12, 0.08333333333333333], [1.69822044E12, 0.016666666666666666], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get block for waiting issue request-0-success", "isController": false}, {"data": [[1.69821924E12, 0.16666666666666666], [1.6982199E12, 1.7], [1.69821984E12, 1.8166666666666667], [1.69821954E12, 1.8333333333333333], [1.69821996E12, 1.6833333333333333], [1.69821966E12, 1.8], [1.6982196E12, 1.8], [1.6982193E12, 0.75], [1.69821972E12, 1.85], [1.69821942E12, 1.9], [1.69821936E12, 1.35], [1.69822002E12, 1.4666666666666666], [1.69821948E12, 1.9333333333333333], [1.69822008E12, 0.5333333333333333], [1.69821978E12, 1.9]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.69822038E12, 0.1], [1.69822032E12, 0.05], [1.6982205E12, 0.016666666666666666], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Choose registrant-0-success", "isController": false}, {"data": [[1.69822038E12, 0.08333333333333333], [1.69822032E12, 0.03333333333333333], [1.69822044E12, 0.05]], "isOverall": false, "label": "Get applications-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.016666666666666666], [1.69822044E12, 0.11666666666666667]], "isOverall": false, "label": "Get devices-success", "isController": false}, {"data": [[1.6982202E12, 0.06666666666666667], [1.69822038E12, 0.3], [1.69822032E12, 0.5833333333333334], [1.69822026E12, 0.15]], "isOverall": false, "label": "Get associate result-0-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.05], [1.69822044E12, 0.08333333333333333]], "isOverall": false, "label": "Get device issue row-success", "isController": false}, {"data": [[1.69822038E12, 0.06666666666666667], [1.69822032E12, 0.08333333333333333], [1.69822044E12, 0.03333333333333333], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get block for waiting app creation-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.43333333333333335], [1.69822044E12, 0.16666666666666666], [1.69822062E12, 0.016666666666666666], [1.69822056E12, 0.13333333333333333]], "isOverall": false, "label": "Balance verify-success", "isController": false}, {"data": [[1.6982202E12, 0.03333333333333333], [1.69822038E12, 0.05], [1.69822032E12, 0.18333333333333332], [1.69822026E12, 0.06666666666666667]], "isOverall": false, "label": "Publish-success", "isController": true}, {"data": [[1.69822038E12, 0.11666666666666667], [1.6982205E12, 0.11666666666666667], [1.69822044E12, 0.3333333333333333]], "isOverall": false, "label": "Get device approve result-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.08333333333333333], [1.69822044E12, 0.05]], "isOverall": false, "label": "Issue creation-success", "isController": true}, {"data": [[1.6982202E12, 1.85], [1.6982199E12, 0.2], [1.69821984E12, 0.13333333333333333], [1.69821954E12, 0.1], [1.69821996E12, 0.21666666666666667], [1.69821966E12, 0.1], [1.6982196E12, 0.1], [1.69822026E12, 1.5666666666666667], [1.69821972E12, 0.1], [1.69822038E12, 0.11666666666666667], [1.69822032E12, 0.9333333333333333], [1.69822002E12, 0.4666666666666667], [1.69821948E12, 0.05], [1.69822014E12, 1.9], [1.69822008E12, 1.4666666666666666], [1.69821978E12, 0.08333333333333333]], "isOverall": false, "label": "Get policy publish result-success", "isController": false}, {"data": [[1.6982202E12, 0.03333333333333333], [1.69822038E12, 0.05], [1.69822032E12, 0.18333333333333332], [1.69822026E12, 0.06666666666666667]], "isOverall": false, "label": "Policy import and publish-success", "isController": true}, {"data": [[1.69821924E12, 0.08333333333333333], [1.6982202E12, 0.016666666666666666], [1.69821984E12, 0.016666666666666666], [1.6982205E12, 0.1], [1.69821996E12, 0.016666666666666666], [1.6982193E12, 0.1], [1.69822026E12, 0.016666666666666666], [1.69821942E12, 0.05], [1.69822038E12, 0.26666666666666666], [1.69821936E12, 0.1], [1.69822032E12, 0.21666666666666667], [1.69822002E12, 0.1], [1.69821948E12, 0.016666666666666666], [1.69822044E12, 0.21666666666666667], [1.69822008E12, 0.18333333333333332]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.69821984E12, 0.016666666666666666], [1.69822002E12, 0.1], [1.69821948E12, 0.016666666666666666], [1.69821996E12, 0.016666666666666666], [1.69822008E12, 0.18333333333333332]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.6982202E12, 0.03333333333333333], [1.69822038E12, 0.5], [1.69822032E12, 0.48333333333333334], [1.6982205E12, 0.21666666666666667], [1.69822044E12, 0.4666666666666667], [1.69822056E12, 0.03333333333333333], [1.69822026E12, 0.13333333333333333]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.6982202E12, 0.016666666666666666], [1.69822038E12, 0.1], [1.69822032E12, 0.18333333333333332], [1.69822044E12, 0.016666666666666666], [1.69822026E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for kyc grant-success", "isController": false}, {"data": [[1.69822038E12, 0.08333333333333333], [1.69822032E12, 0.05], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Create application-0-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.05], [1.69822044E12, 0.08333333333333333]], "isOverall": false, "label": "Get issue schema-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.06666666666666667], [1.69822044E12, 0.05], [1.69822056E12, 0.016666666666666666]], "isOverall": false, "label": "Get issue approve result-0-success", "isController": false}, {"data": [[1.6982202E12, 0.016666666666666666], [1.69822038E12, 0.1], [1.69822032E12, 0.18333333333333332], [1.69822044E12, 0.016666666666666666], [1.69822026E12, 0.016666666666666666]], "isOverall": false, "label": "Grant KYC-0-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.06666666666666667], [1.69822044E12, 0.05], [1.69822056E12, 0.016666666666666666]], "isOverall": false, "label": "Get result for issue request approve-success", "isController": true}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.016666666666666666], [1.69822044E12, 0.11666666666666667]], "isOverall": false, "label": "Device creation-success", "isController": true}, {"data": [[1.69822038E12, 0.06666666666666667], [1.69822032E12, 0.08333333333333333], [1.69822044E12, 0.03333333333333333], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get block for waiting app approve-0-success", "isController": false}, {"data": [[1.69822038E12, 1.2], [1.69822032E12, 0.36666666666666664], [1.69822044E12, 0.36666666666666664], [1.69822026E12, 0.18333333333333332]], "isOverall": false, "label": "Get application creation status-0-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.05], [1.69822044E12, 0.08333333333333333]], "isOverall": false, "label": "Get issue schema-0-success", "isController": false}, {"data": [[1.69822038E12, 0.1], [1.6982205E12, 0.13333333333333333], [1.69822044E12, 0.25], [1.69822056E12, 0.016666666666666666]], "isOverall": false, "label": "Approve device-0-success", "isController": false}, {"data": [[1.69822038E12, 0.08333333333333333], [1.69822032E12, 0.05], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Create application-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.69822032E12, 0.03333333333333333], [1.6982205E12, 0.016666666666666666], [1.69822044E12, 0.08333333333333333]], "isOverall": false, "label": "Get device schema-success", "isController": false}, {"data": [[1.69822038E12, 0.11666666666666667], [1.6982205E12, 0.11666666666666667], [1.69822044E12, 0.3333333333333333]], "isOverall": false, "label": "Get device approve result-0-success", "isController": false}, {"data": [[1.69822038E12, 0.06666666666666667], [1.69822032E12, 0.08333333333333333], [1.69822044E12, 0.016666666666666666], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get block for waiting issue request-success", "isController": false}, {"data": [[1.69821924E12, 0.08333333333333333], [1.69821942E12, 0.05], [1.69821936E12, 0.1], [1.6982193E12, 0.1]], "isOverall": false, "label": "Get Tenant Id-0-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.43333333333333335], [1.69822044E12, 0.16666666666666666], [1.69822062E12, 0.016666666666666666], [1.69822056E12, 0.13333333333333333]], "isOverall": false, "label": "Balance verify-0-success", "isController": false}, {"data": [[1.6982202E12, 0.016666666666666666], [1.69822038E12, 0.23333333333333334], [1.69822032E12, 0.3333333333333333], [1.69822044E12, 0.03333333333333333], [1.69822026E12, 0.05]], "isOverall": false, "label": "Grant KYC-success", "isController": true}, {"data": [[1.69822038E12, 0.06666666666666667], [1.69822032E12, 0.08333333333333333], [1.69822044E12, 0.03333333333333333], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get block for waiting app approve-success", "isController": false}, {"data": [[1.69822038E12, 0.08333333333333333], [1.69822032E12, 0.05], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get application schema-success", "isController": false}, {"data": [[1.69822038E12, 0.06666666666666667], [1.69822032E12, 0.08333333333333333], [1.69822044E12, 0.016666666666666666], [1.69822062E12, 0.016666666666666666], [1.69822026E12, 0.03333333333333333]], "isOverall": false, "label": "Get block for waiting device-0-success", "isController": false}, {"data": [[1.69822038E12, 0.08333333333333333], [1.69822032E12, 0.03333333333333333], [1.69822044E12, 0.05]], "isOverall": false, "label": "Approve application-0-success", "isController": false}, {"data": [[1.69822038E12, 0.23333333333333334], [1.69822032E12, 0.11666666666666667], [1.6982205E12, 0.05], [1.69822044E12, 0.2833333333333333]], "isOverall": false, "label": "Get block for approve result-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.05], [1.69822044E12, 0.08333333333333333]], "isOverall": false, "label": "Get device issue row-0-success", "isController": false}, {"data": [[1.69822038E12, 0.08333333333333333], [1.69822032E12, 0.03333333333333333], [1.69822044E12, 0.05]], "isOverall": false, "label": "Get applications-0-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69822062E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69821924E12, "maxY": 11.816666666666666, "series": [{"data": [[1.69821924E12, 1.1166666666666667], [1.6982202E12, 4.283333333333333], [1.6982199E12, 3.8], [1.69821984E12, 4.016666666666667], [1.69821954E12, 3.8666666666666667], [1.6982205E12, 3.9], [1.69821996E12, 3.9166666666666665], [1.69821966E12, 3.8], [1.69822062E12, 0.06666666666666667], [1.6982196E12, 3.8], [1.69822056E12, 0.55], [1.6982193E12, 2.4], [1.69822026E12, 5.533333333333333], [1.69821972E12, 3.9], [1.69821942E12, 4.216666666666667], [1.69822038E12, 10.75], [1.69821936E12, 3.6], [1.69822032E12, 11.816666666666666], [1.69822002E12, 4.566666666666666], [1.69821948E12, 4.083333333333333], [1.69822044E12, 8.1], [1.69822014E12, 3.8], [1.69822008E12, 5.283333333333333], [1.69821978E12, 3.966666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.69822038E12, 0.03333333333333333], [1.6982205E12, 0.1], [1.69822062E12, 0.016666666666666666], [1.69822056E12, 0.05]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69822062E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
