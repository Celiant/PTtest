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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 17.0, "series": [{"data": [[200.0, 1.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[114200.0, 1.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[0.0, 17.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[8100.0, 1.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[25100.0, 1.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[48200.0, 1.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[3900.0, 1.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[13300.0, 1.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[600.0, 1.0], [200.0, 12.0]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[11200.0, 1.0], [200.0, 7.0]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[4000.0, 1.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[6700.0, 1.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[7500.0, 1.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[4700.0, 1.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[14100.0, 1.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[200.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[47100.0, 1.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[11900.0, 1.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[0.0, 11.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[24000.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[290700.0, 1.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[4300.0, 1.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[176400.0, 1.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[200.0, 4.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[600.0, 1.0], [200.0, 10.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1100.0, 1.0], [11200.0, 2.0], [11100.0, 1.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[700.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[200.0, 6.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[600.0, 3.0], [200.0, 13.0], [400.0, 1.0]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 290700.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 6.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 202.0, "series": [{"data": [[0.0, 202.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 12.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 6.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69821408E12, "maxY": 1.0, "series": [{"data": [[1.6982145E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.69821438E12, 1.0], [1.6982142E12, 1.0], [1.6982145E12, 1.0], [1.69821432E12, 1.0], [1.69821414E12, 1.0], [1.69821444E12, 1.0], [1.69821426E12, 1.0], [1.69821408E12, 1.0], [1.69821456E12, 1.0]], "isOverall": false, "label": "Policy workflow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821456E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 290705.0, "series": [{"data": [[1.0, 263.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.0, 263.0]], "isOverall": false, "label": "Get issues-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0-Aggregated", "isController": false}, {"data": [[1.0, 114230.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.0, 114230.0]], "isOverall": false, "label": "Import-Aggregated", "isController": true}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get device issue row-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get hedera id-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[1.0, 0.75]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.0, 0.75]], "isOverall": false, "label": "Get device approve result-0-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Create device-0-Aggregated", "isController": false}, {"data": [[1.0, 0.7058823529411765]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.0, 0.7058823529411765]], "isOverall": false, "label": "Get policy publish result-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Get issue schema-0-Aggregated", "isController": false}, {"data": [[1.0, 243.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.0, 243.0]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "Get applications-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "Get device issue row-Aggregated", "isController": false}, {"data": [[1.0, 8174.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.0, 8174.0]], "isOverall": false, "label": "Issue creation-Aggregated", "isController": true}, {"data": [[1.0, 25196.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.0, 25196.0]], "isOverall": false, "label": "Token associate-Aggregated", "isController": true}, {"data": [[1.0, 238.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.0, 238.0]], "isOverall": false, "label": "Get block for waiting device-Aggregated", "isController": false}, {"data": [[1.0, 48231.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.0, 48231.0]], "isOverall": false, "label": "Application creation-Aggregated", "isController": true}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[0.0, 3979.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[0.0, 3979.0]], "isOverall": false, "label": "Get result for issue request approve-Aggregated", "isController": true}, {"data": [[0.0, 13362.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[0.0, 13362.0]], "isOverall": false, "label": "Get result for device approve-Aggregated", "isController": true}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get block for approve result-0-Aggregated", "isController": false}, {"data": [[1.0, 255.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.0, 255.0]], "isOverall": false, "label": "Approve application-Aggregated", "isController": false}, {"data": [[1.0, 230.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.0, 230.0]], "isOverall": false, "label": "Associate token-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get block for waiting device-0-Aggregated", "isController": false}, {"data": [[1.0, 729.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.0, 729.0]], "isOverall": false, "label": "Get issue approve result-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Balance verify-0-Aggregated", "isController": false}, {"data": [[1.0, 236.11111111111114]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.0, 236.11111111111114]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[1.0, 286.2307692307692]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.0, 286.2307692307692]], "isOverall": false, "label": "Get application creation status-Aggregated", "isController": false}, {"data": [[1.0, 1611.1249999999995]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.0, 1611.1249999999995]], "isOverall": false, "label": "Get tokens-Aggregated", "isController": false}, {"data": [[1.0, 4033.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.0, 4033.0]], "isOverall": false, "label": "Choose registrant-Aggregated", "isController": false}, {"data": [[1.0, 0.75]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.0, 0.75]], "isOverall": false, "label": "Get associate result-0-Aggregated", "isController": false}, {"data": [[0.0, 6787.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[0.0, 6787.0]], "isOverall": false, "label": "Get result for app approve-Aggregated", "isController": true}, {"data": [[1.0, 1.3076923076923077]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.0, 1.3076923076923077]], "isOverall": false, "label": "Get application creation status-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Create application-0-Aggregated", "isController": false}, {"data": [[1.0, 7564.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.0, 7564.0]], "isOverall": false, "label": "Role approve-Aggregated", "isController": true}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[1.0, 472.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.0, 472.0]], "isOverall": false, "label": "Get issue schema-Aggregated", "isController": false}, {"data": [[1.0, 4733.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.0, 4733.0]], "isOverall": false, "label": "Issue approve-Aggregated", "isController": true}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get block for waiting issue request-0-Aggregated", "isController": false}, {"data": [[1.0, 14119.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.0, 14119.0]], "isOverall": false, "label": "Device approve-Aggregated", "isController": true}, {"data": [[1.0, 1105.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.0, 1105.0]], "isOverall": false, "label": "Get tenant-Aggregated", "isController": true}, {"data": [[1.0, 324.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.0, 324.0]], "isOverall": false, "label": "Approve device-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Get Tenant Id-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[1.0, 262.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.0, 262.0]], "isOverall": false, "label": "Publish Policy-Aggregated", "isController": false}, {"data": [[1.0, 47114.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.0, 47114.0]], "isOverall": false, "label": "Token minting verify-Aggregated", "isController": true}, {"data": [[1.0, 533.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.0, 533.0]], "isOverall": false, "label": "Create application-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Get issue approve result-0-Aggregated", "isController": false}, {"data": [[1.0, 470.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.0, 470.0]], "isOverall": false, "label": "Get application schema-Aggregated", "isController": false}, {"data": [[1.0, 234.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.0, 234.0]], "isOverall": false, "label": "Get block for waiting app approve-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Get application schema-0-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Approve application-0-Aggregated", "isController": false}, {"data": [[1.0, 11910.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.0, 11910.0]], "isOverall": false, "label": "Device creation-Aggregated", "isController": true}, {"data": [[1.0, 0.8181818181818181]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.0, 0.8181818181818181]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[1.0, 259.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.0, 259.0]], "isOverall": false, "label": "Get block for approve result-Aggregated", "isController": false}, {"data": [[1.0, 695.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.0, 695.0]], "isOverall": false, "label": "Get device schema-Aggregated", "isController": false}, {"data": [[1.0, 238.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.0, 238.0]], "isOverall": false, "label": "Get block for waiting issue request-Aggregated", "isController": false}, {"data": [[1.0, 12165.5]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.0, 12165.5]], "isOverall": false, "label": "Grant KYC-Aggregated", "isController": true}, {"data": [[1.0, 290705.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.0, 290705.0]], "isOverall": false, "label": "Policy import and publish-Aggregated", "isController": true}, {"data": [[1.0, 261.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.0, 261.0]], "isOverall": false, "label": "Get Tenant Id-Aggregated", "isController": false}, {"data": [[1.0, 4327.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.0, 4327.0]], "isOverall": false, "label": "Create device-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Grant KYC-0-Aggregated", "isController": false}, {"data": [[1.0, 176461.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.0, 176461.0]], "isOverall": false, "label": "Publish-Aggregated", "isController": true}, {"data": [[1.0, 279.5]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.0, 279.5]], "isOverall": false, "label": "Get issue creation status-Aggregated", "isController": false}, {"data": [[1.0, 268.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.0, 268.0]], "isOverall": false, "label": "Get hedera id-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get block for waiting app creation-0-Aggregated", "isController": false}, {"data": [[1.0, 266.25]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.0, 266.25]], "isOverall": false, "label": "Get device approve result-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Choose registrant-0-Aggregated", "isController": false}, {"data": [[1.0, 287.3636363636364]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.0, 287.3636363636364]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[1.0, 862.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.0, 862.0]], "isOverall": false, "label": "WS open for kyc grant-Aggregated", "isController": false}, {"data": [[1.0, 0.7777777777777778]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.0, 0.7777777777777778]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Associate token-0-Aggregated", "isController": false}, {"data": [[1.0, 263.5]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.0, 263.5]], "isOverall": false, "label": "Get device creation status-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get devices-0-Aggregated", "isController": false}, {"data": [[1.0, 8693.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.0, 8693.0]], "isOverall": false, "label": "Balance verify-Aggregated", "isController": false}, {"data": [[1.0, 1.25]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.0, 1.25]], "isOverall": false, "label": "Get tokens-0-Aggregated", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.0, 236.0]], "isOverall": false, "label": "Get block for waiting app creation-Aggregated", "isController": false}, {"data": [[1.0, 2.3333333333333335]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.0, 2.3333333333333335]], "isOverall": false, "label": "Approve device-0-Aggregated", "isController": false}, {"data": [[1.0, 780.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.0, 780.0]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[1.0, 352.25]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.0, 352.25]], "isOverall": false, "label": "Get associate result-Aggregated", "isController": false}, {"data": [[1.0, 3.5]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.0, 3.5]], "isOverall": false, "label": "Get issue creation status-0-Aggregated", "isController": false}, {"data": [[1.0, 267.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.0, 267.0]], "isOverall": false, "label": "Get devices-Aggregated", "isController": false}, {"data": [[1.0, 230.66666666666666]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.0, 230.66666666666666]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[1.0, 334.52941176470586]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.0, 334.52941176470586]], "isOverall": false, "label": "Get policy publish result-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get applications-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get device schema-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Get device creation status-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Publish Policy-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "WS open for kyc grant-0-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Get issues-0", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Get issues-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 31.466666666666665, "minX": 1.69821408E12, "maxY": 43237.15, "series": [{"data": [[1.69821438E12, 851.0666666666667], [1.6982142E12, 650.5833333333334], [1.6982145E12, 43237.15], [1.69821432E12, 495.9166666666667], [1.69821414E12, 417.65], [1.69821444E12, 10646.816666666668], [1.69821426E12, 443.5], [1.69821408E12, 158.0], [1.69821456E12, 36664.4]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69821438E12, 78.36666666666666], [1.6982142E12, 85.45], [1.6982145E12, 570.5833333333334], [1.69821432E12, 62.3], [1.69821414E12, 62.3], [1.69821444E12, 351.01666666666665], [1.69821426E12, 62.3], [1.69821408E12, 31.466666666666665], [1.69821456E12, 346.06666666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821456E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69821408E12, "maxY": 290705.0, "series": [{"data": [[1.69821456E12, 263.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.6982142E12, 114230.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69821456E12, 1.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69821444E12, 1.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.6982145E12, 0.75]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.6982145E12, 2.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.69821438E12, 0.6], [1.69821432E12, 0.6666666666666666], [1.69821426E12, 0.8333333333333334]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.69821408E12, 243.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.6982145E12, 270.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69821456E12, 278.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69821456E12, 8174.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.69821444E12, 25196.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69821444E12, 238.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.6982145E12, 48231.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.6982142E12, 236.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69821456E12, 3979.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.6982145E12, 13362.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.6982145E12, 1.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.6982145E12, 255.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.69821438E12, 230.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69821444E12, 1.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69821456E12, 729.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69821456E12, 2.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.69821438E12, 232.0], [1.6982145E12, 234.5], [1.69821444E12, 231.0], [1.69821456E12, 246.5]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.6982145E12, 305.75], [1.69821444E12, 255.0]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.69821438E12, 11253.0], [1.69821444E12, 233.71428571428572]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69821444E12, 4033.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.69821444E12, 0.75]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.6982145E12, 6787.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.6982145E12, 1.5], [1.69821444E12, 1.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69821444E12, 1.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.6982145E12, 7564.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.6982142E12, 0.0], [1.6982145E12, 1.5], [1.69821444E12, 1.0], [1.69821408E12, 0.0], [1.69821456E12, 2.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69821456E12, 472.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69821456E12, 4733.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69821444E12, 1.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.6982145E12, 14119.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.69821408E12, 1105.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.6982145E12, 246.0], [1.69821456E12, 363.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.69821408E12, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.6982142E12, 262.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.69821456E12, 47114.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69821444E12, 533.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.6982142E12, 1.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69821456E12, 2.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69821444E12, 470.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69821444E12, 234.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.6982145E12, 2.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.6982145E12, 11910.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.6982142E12, 0.8], [1.69821414E12, 0.8333333333333334]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.6982145E12, 259.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.6982145E12, 695.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69821444E12, 238.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.69821444E12, 12165.5]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.69821438E12, 290705.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.69821408E12, 261.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.6982145E12, 4327.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.69821438E12, 176461.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69821456E12, 279.5]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69821444E12, 268.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69821444E12, 1.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.6982145E12, 266.25]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69821444E12, 1.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.6982142E12, 247.2], [1.69821414E12, 320.8333333333333]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.69821444E12, 862.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.69821438E12, 0.0], [1.6982145E12, 0.75], [1.69821444E12, 1.0], [1.69821456E12, 1.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.69821438E12, 1.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.6982145E12, 263.5]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.6982145E12, 1.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69821456E12, 8693.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.69821438E12, 2.0], [1.69821444E12, 1.1428571428571428]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69821444E12, 236.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.6982145E12, 2.0], [1.69821456E12, 2.5]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.69821408E12, 780.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.69821444E12, 352.25]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69821456E12, 3.5]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.6982145E12, 267.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.6982142E12, 231.0], [1.6982145E12, 231.0], [1.69821444E12, 230.0], [1.69821408E12, 230.0], [1.69821456E12, 231.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.69821438E12, 371.4], [1.69821432E12, 319.0], [1.69821426E12, 319.33333333333337]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.6982145E12, 1.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.6982145E12, 1.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.6982145E12, 1.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.6982142E12, 1.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.69821444E12, 1.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69821456E12, 2.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821456E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69821408E12, "maxY": 11251.0, "series": [{"data": [[1.69821456E12, 260.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.6982142E12, 0.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.69821438E12, 0.0], [1.69821432E12, 0.0], [1.69821426E12, 0.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.69821408E12, 243.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.6982145E12, 268.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69821456E12, 276.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69821444E12, 237.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.6982142E12, 234.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.6982145E12, 253.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.69821438E12, 228.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69821456E12, 726.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.69821438E12, 231.0], [1.6982145E12, 233.5], [1.69821444E12, 230.0], [1.69821456E12, 245.5]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.6982145E12, 304.25000000000006], [1.69821444E12, 253.6]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.69821438E12, 11251.0], [1.69821444E12, 232.42857142857142]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69821444E12, 4032.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.6982145E12, 0.0], [1.69821444E12, 0.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.6982142E12, 0.0], [1.6982145E12, 0.0], [1.69821444E12, 0.0], [1.69821408E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69821456E12, 259.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.6982145E12, 244.0], [1.69821456E12, 360.5]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.6982142E12, 261.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69821444E12, 532.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.6982142E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69821444E12, 258.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69821444E12, 234.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.6982142E12, 0.0], [1.69821414E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.6982145E12, 258.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.6982145E12, 275.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69821444E12, 237.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.69821444E12, 115.5]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.69821438E12, 0.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.69821408E12, 260.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.6982145E12, 4325.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.69821438E12, 0.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69821456E12, 276.0]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69821444E12, 267.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.6982145E12, 265.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.6982142E12, 246.2], [1.69821414E12, 320.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.69821438E12, 0.0], [1.6982145E12, 0.0], [1.69821444E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.69821438E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.6982145E12, 261.5]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69821456E12, 8691.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.69821438E12, 0.0], [1.69821444E12, 0.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69821444E12, 235.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.6982145E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.69821408E12, 778.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.69821444E12, 351.25]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.6982145E12, 265.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.6982142E12, 231.0], [1.6982145E12, 229.5], [1.69821444E12, 229.0], [1.69821408E12, 230.0], [1.69821456E12, 228.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.69821438E12, 329.0], [1.69821432E12, 318.33333333333337], [1.69821426E12, 318.33333333333337]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.6982142E12, 0.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821456E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69821408E12, "maxY": 1764.0, "series": [{"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.6982142E12, 452.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.69821438E12, 0.0], [1.69821432E12, 0.0], [1.69821426E12, 0.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.69821444E12, 476.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.6982145E12, 436.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.6982142E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.69821438E12, 0.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69821456E12, 454.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.69821438E12, 0.0], [1.6982145E12, 0.0], [1.69821444E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.6982145E12, 54.50000000000001], [1.69821444E12, 0.0]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.69821438E12, 0.0], [1.69821444E12, 0.0]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.6982145E12, 0.0], [1.69821444E12, 0.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.6982142E12, 0.0], [1.6982145E12, 0.0], [1.69821444E12, 0.0], [1.69821408E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69821456E12, 454.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.69821408E12, 537.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.6982145E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.6982142E12, 0.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.6982142E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.6982142E12, 0.0], [1.69821414E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.69821444E12, 429.5]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.69821438E12, 1764.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.69821408E12, 0.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.69821438E12, 1312.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.6982142E12, 0.0], [1.69821414E12, 75.33333333333333]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.69821444E12, 859.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.69821438E12, 0.0], [1.6982145E12, 0.0], [1.69821444E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.69821438E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.69821438E12, 0.0], [1.69821444E12, 0.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.6982145E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.69821408E12, 537.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.69821444E12, 119.0]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.6982142E12, 0.0], [1.6982145E12, 0.0], [1.69821444E12, 0.0], [1.69821408E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.69821438E12, 86.6], [1.69821432E12, 72.66666666666666], [1.69821426E12, 73.83333333333334]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.6982145E12, 0.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.6982142E12, 0.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.69821444E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69821456E12, 0.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821456E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69821408E12, "maxY": 11271.0, "series": [{"data": [[1.69821438E12, 11253.0], [1.6982142E12, 262.0], [1.6982145E12, 4327.0], [1.69821432E12, 676.0], [1.69821414E12, 682.0], [1.69821444E12, 4033.0], [1.69821426E12, 673.0], [1.69821408E12, 780.0], [1.69821456E12, 11271.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69821438E12, 3840.7000000000075], [1.6982142E12, 254.3], [1.6982145E12, 269.3], [1.69821432E12, 547.9000000000004], [1.69821414E12, 555.7000000000005], [1.69821444E12, 295.40000000000026], [1.69821426E12, 546.7000000000005], [1.69821408E12, 780.0], [1.69821456E12, 10127.400000000021]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69821438E12, 11253.0], [1.6982142E12, 262.0], [1.6982145E12, 4327.0], [1.69821432E12, 676.0], [1.69821414E12, 682.0], [1.69821444E12, 4033.0], [1.69821426E12, 673.0], [1.69821408E12, 780.0], [1.69821456E12, 11271.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69821438E12, 11253.0], [1.6982142E12, 262.0], [1.6982145E12, 688.2], [1.69821432E12, 676.0], [1.69821414E12, 682.0], [1.69821444E12, 722.3499999999996], [1.69821426E12, 673.0], [1.69821408E12, 780.0], [1.69821456E12, 11238.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69821438E12, 0.0], [1.6982142E12, 0.0], [1.6982145E12, 0.0], [1.69821432E12, 0.0], [1.69821414E12, 0.0], [1.69821444E12, 0.0], [1.69821426E12, 0.0], [1.69821408E12, 0.0], [1.69821456E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69821438E12, 116.0], [1.6982142E12, 116.0], [1.6982145E12, 116.5], [1.69821432E12, 123.0], [1.69821414E12, 122.5], [1.69821444E12, 115.5], [1.69821426E12, 122.5], [1.69821408E12, 115.5], [1.69821456E12, 117.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821456E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 115.5, "minX": 2.0, "maxY": 116.5, "series": [{"data": [[2.0, 115.5], [8.0, 116.5], [4.0, 116.0], [6.0, 116.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 8.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 115.0, "series": [{"data": [[2.0, 113.5], [8.0, 114.0], [4.0, 0.0], [6.0, 115.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 8.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.69821408E12, "maxY": 0.9666666666666667, "series": [{"data": [[1.69821438E12, 0.26666666666666666], [1.6982142E12, 0.26666666666666666], [1.6982145E12, 0.95], [1.69821432E12, 0.2], [1.69821414E12, 0.2], [1.69821444E12, 0.9666666666666667], [1.69821426E12, 0.2], [1.69821408E12, 0.13333333333333333], [1.69821456E12, 0.48333333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821456E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69821408E12, "maxY": 0.9333333333333333, "series": [{"data": [[1.69821438E12, 0.25], [1.6982142E12, 0.25], [1.6982145E12, 0.9333333333333333], [1.69821432E12, 0.2], [1.69821414E12, 0.2], [1.69821444E12, 0.9333333333333333], [1.69821426E12, 0.2], [1.69821408E12, 0.11666666666666667], [1.69821456E12, 0.5]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.69821438E12, 0.016666666666666666], [1.6982142E12, 0.016666666666666666], [1.69821444E12, 0.016666666666666666], [1.69821408E12, 0.016666666666666666]], "isOverall": false, "label": "202", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821456E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69821408E12, "maxY": 0.13333333333333333, "series": [{"data": [[1.69821408E12, 0.016666666666666666]], "isOverall": false, "label": "Get tenant-success", "isController": true}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Choose registrant-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get hedera id-0-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Get result for device approve-success", "isController": true}, {"data": [[1.69821456E12, 0.03333333333333333]], "isOverall": false, "label": "Get issue creation status-0-success", "isController": false}, {"data": [[1.69821456E12, 0.03333333333333333]], "isOverall": false, "label": "Get issue creation status-success", "isController": false}, {"data": [[1.6982142E12, 0.016666666666666666], [1.6982145E12, 0.03333333333333333], [1.69821444E12, 0.016666666666666666], [1.69821408E12, 0.016666666666666666], [1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Get issues-0-success", "isController": false}, {"data": [[1.6982142E12, 0.08333333333333333], [1.69821414E12, 0.1]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.6982142E12, 0.016666666666666666]], "isOverall": false, "label": "Import-success", "isController": true}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Token associate-success", "isController": true}, {"data": [[1.6982145E12, 0.03333333333333333]], "isOverall": false, "label": "Get block for approve result-0-success", "isController": false}, {"data": [[1.6982145E12, 0.03333333333333333]], "isOverall": false, "label": "Get device creation status-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Role approve-success", "isController": true}, {"data": [[1.6982145E12, 0.03333333333333333]], "isOverall": false, "label": "Get device creation status-0-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Application creation-success", "isController": true}, {"data": [[1.6982145E12, 0.016666666666666666], [1.69821456E12, 0.03333333333333333]], "isOverall": false, "label": "Approve device-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Create device-0-success", "isController": false}, {"data": [[1.6982142E12, 0.016666666666666666]], "isOverall": false, "label": "Publish Policy-0-success", "isController": false}, {"data": [[1.69821438E12, 0.016666666666666666]], "isOverall": false, "label": "Associate token-0-success", "isController": false}, {"data": [[1.69821408E12, 0.016666666666666666]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.69821438E12, 0.016666666666666666], [1.69821444E12, 0.11666666666666667]], "isOverall": false, "label": "Get tokens-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for kyc grant-0-success", "isController": false}, {"data": [[1.6982142E12, 0.016666666666666666]], "isOverall": false, "label": "Publish Policy-success", "isController": false}, {"data": [[1.69821438E12, 0.016666666666666666], [1.6982145E12, 0.06666666666666667], [1.69821444E12, 0.03333333333333333], [1.69821456E12, 0.03333333333333333]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Token minting verify-success", "isController": true}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Approve application-success", "isController": false}, {"data": [[1.69821438E12, 0.016666666666666666]], "isOverall": false, "label": "Associate token-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get hedera id-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Get result for app approve-success", "isController": true}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Get device schema-0-success", "isController": false}, {"data": [[1.69821408E12, 0.016666666666666666]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Get issue approve result-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Create device-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Device approve-success", "isController": true}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Get devices-0-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Get issues-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get block for waiting device-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Issue approve-success", "isController": true}, {"data": [[1.69821408E12, 0.016666666666666666]], "isOverall": false, "label": "Get Tenant Id-success", "isController": false}, {"data": [[1.69821408E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.6982145E12, 0.13333333333333333], [1.69821444E12, 0.08333333333333333]], "isOverall": false, "label": "Get application creation status-success", "isController": false}, {"data": [[1.69821438E12, 0.016666666666666666], [1.69821444E12, 0.11666666666666667]], "isOverall": false, "label": "Get tokens-0-success", "isController": false}, {"data": [[1.6982142E12, 0.016666666666666666]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.69821438E12, 0.08333333333333333], [1.69821432E12, 0.1], [1.69821426E12, 0.1]], "isOverall": false, "label": "Get policy publish result-0-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get block for waiting app creation-0-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get application schema-0-success", "isController": false}, {"data": [[1.69821444E12, 0.06666666666666667]], "isOverall": false, "label": "Get associate result-success", "isController": false}, {"data": [[1.69821408E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get block for waiting issue request-0-success", "isController": false}, {"data": [[1.6982142E12, 0.08333333333333333], [1.69821414E12, 0.1]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Choose registrant-0-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Get applications-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Get devices-success", "isController": false}, {"data": [[1.69821444E12, 0.06666666666666667]], "isOverall": false, "label": "Get associate result-0-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Get device issue row-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get block for waiting app creation-success", "isController": false}, {"data": [[1.69821456E12, 0.06666666666666667]], "isOverall": false, "label": "Balance verify-success", "isController": false}, {"data": [[1.69821438E12, 0.016666666666666666]], "isOverall": false, "label": "Publish-success", "isController": true}, {"data": [[1.6982145E12, 0.06666666666666667]], "isOverall": false, "label": "Get device approve result-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Issue creation-success", "isController": true}, {"data": [[1.69821438E12, 0.08333333333333333], [1.69821432E12, 0.1], [1.69821426E12, 0.1]], "isOverall": false, "label": "Get policy publish result-success", "isController": false}, {"data": [[1.69821438E12, 0.016666666666666666]], "isOverall": false, "label": "Policy import and publish-success", "isController": true}, {"data": [[1.6982142E12, 0.016666666666666666], [1.6982145E12, 0.03333333333333333], [1.69821444E12, 0.016666666666666666], [1.69821408E12, 0.016666666666666666], [1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.6982142E12, 0.016666666666666666]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.69821438E12, 0.016666666666666666], [1.6982145E12, 0.06666666666666667], [1.69821444E12, 0.03333333333333333], [1.69821456E12, 0.03333333333333333]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for kyc grant-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Create application-0-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Get issue schema-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Get issue approve result-0-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Grant KYC-0-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Get result for issue request approve-success", "isController": true}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Device creation-success", "isController": true}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get block for waiting app approve-0-success", "isController": false}, {"data": [[1.6982145E12, 0.13333333333333333], [1.69821444E12, 0.08333333333333333]], "isOverall": false, "label": "Get application creation status-0-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Get issue schema-0-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666], [1.69821456E12, 0.03333333333333333]], "isOverall": false, "label": "Approve device-0-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Create application-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Get device schema-success", "isController": false}, {"data": [[1.6982145E12, 0.06666666666666667]], "isOverall": false, "label": "Get device approve result-0-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get block for waiting issue request-success", "isController": false}, {"data": [[1.69821408E12, 0.016666666666666666]], "isOverall": false, "label": "Get Tenant Id-0-success", "isController": false}, {"data": [[1.69821456E12, 0.06666666666666667]], "isOverall": false, "label": "Balance verify-0-success", "isController": false}, {"data": [[1.69821444E12, 0.03333333333333333]], "isOverall": false, "label": "Grant KYC-success", "isController": true}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get block for waiting app approve-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get application schema-success", "isController": false}, {"data": [[1.69821444E12, 0.016666666666666666]], "isOverall": false, "label": "Get block for waiting device-0-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Approve application-0-success", "isController": false}, {"data": [[1.6982145E12, 0.03333333333333333]], "isOverall": false, "label": "Get block for approve result-success", "isController": false}, {"data": [[1.69821456E12, 0.016666666666666666]], "isOverall": false, "label": "Get device issue row-0-success", "isController": false}, {"data": [[1.6982145E12, 0.016666666666666666]], "isOverall": false, "label": "Get applications-0-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821456E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.15, "minX": 1.69821408E12, "maxY": 1.0333333333333334, "series": [{"data": [[1.69821438E12, 0.3], [1.6982142E12, 0.2833333333333333], [1.6982145E12, 1.0333333333333334], [1.69821432E12, 0.2], [1.69821414E12, 0.2], [1.69821444E12, 1.0], [1.69821426E12, 0.2], [1.69821408E12, 0.15], [1.69821456E12, 0.5666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821456E12, "title": "Total Transactions Per Second"}},
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
