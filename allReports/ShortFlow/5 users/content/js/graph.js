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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 97.0, "series": [{"data": [[200.0, 5.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[165600.0, 1.0], [197000.0, 1.0], [207200.0, 1.0], [207100.0, 1.0], [227700.0, 1.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[0.0, 84.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[18100.0, 1.0], [14600.0, 1.0], [15300.0, 1.0], [8000.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[4900.0, 2.0], [24700.0, 2.0], [15300.0, 1.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[66900.0, 1.0], [44600.0, 1.0], [45300.0, 1.0], [46100.0, 1.0], [65100.0, 1.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[3500.0, 4.0], [3900.0, 1.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[16600.0, 3.0], [13300.0, 1.0], [6800.0, 1.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[700.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[0.0, 23.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[200.0, 45.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [200.0, 61.0]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[600.0, 3.0], [1200.0, 2.0], [11200.0, 1.0], [11500.0, 1.0], [11300.0, 1.0], [200.0, 23.0]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[4300.0, 1.0], [4100.0, 1.0], [12900.0, 1.0], [14400.0, 1.0], [15000.0, 1.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[0.0, 11.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[17000.0, 1.0], [13300.0, 1.0], [6700.0, 2.0], [6800.0, 1.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[0.0, 64.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[17800.0, 1.0], [14100.0, 1.0], [7500.0, 3.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[0.0, 30.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1100.0, 1.0], [400.0, 4.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[4200.0, 2.0], [4300.0, 2.0], [4700.0, 1.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[17400.0, 3.0], [14100.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1100.0, 1.0], [900.0, 4.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[200.0, 10.0], [400.0, 5.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[42000.0, 1.0], [43500.0, 1.0], [43400.0, 1.0], [51900.0, 1.0], [60100.0, 1.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[400.0, 4.0], [900.0, 1.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[18600.0, 1.0], [21900.0, 1.0], [22300.0, 1.0], [22500.0, 1.0], [27300.0, 1.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[0.0, 97.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[700.0, 1.0], [200.0, 14.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[600.0, 4.0], [700.0, 1.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[24500.0, 1.0], [24000.0, 1.0], [200.0, 5.0], [14300.0, 1.0], [14700.0, 2.0]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[342100.0, 1.0], [352400.0, 1.0], [393900.0, 1.0], [394000.0, 1.0], [394200.0, 1.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[4600.0, 1.0], [4500.0, 1.0], [13000.0, 1.0], [14300.0, 1.0], [14500.0, 1.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[145000.0, 1.0], [166400.0, 1.0], [186700.0, 1.0], [186500.0, 1.0], [186800.0, 1.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[200.0, 16.0], [400.0, 1.0]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[200.0, 21.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[600.0, 14.0], [200.0, 83.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[800.0, 5.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[0.0, 45.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[300.0, 1.0], [700.0, 2.0], [200.0, 14.0]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[700.0, 1.0], [11100.0, 1.0], [11200.0, 4.0], [10900.0, 1.0], [11600.0, 2.0], [11700.0, 1.0], [11400.0, 1.0], [11500.0, 2.0], [11300.0, 1.0], [11900.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [1100.0, 1.0], [1200.0, 4.0], [1400.0, 1.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[0.0, 31.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[600.0, 4.0], [800.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[200.0, 11.0]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[0.0, 16.0], [100.0, 1.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[200.0, 30.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[600.0, 13.0], [700.0, 1.0], [200.0, 67.0], [400.0, 3.0]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[0.0, 16.0], [100.0, 1.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 394200.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 27.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 1092.0, "series": [{"data": [[0.0, 1092.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 71.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 27.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69821576E12, "maxY": 5.0, "series": [{"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.698216E12, 5.0], [1.69821618E12, 5.0], [1.69821588E12, 5.0], [1.69821636E12, 3.863636363636365], [1.69821606E12, 5.0], [1.69821576E12, 1.55], [1.69821624E12, 5.0], [1.69821594E12, 5.0], [1.69821642E12, 1.5], [1.69821612E12, 5.0], [1.69821582E12, 4.453333333333332], [1.6982163E12, 5.0]], "isOverall": false, "label": "Policy workflow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821642E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 375362.2, "series": [{"data": [[4.0, 272.5], [5.0, 278.6666666666667]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[4.6, 276.2]], "isOverall": false, "label": "Get issues-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get block for waiting app approve-0-Aggregated", "isController": false}, {"data": [[5.0, 200983.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[5.0, 200983.0]], "isOverall": false, "label": "Import-Aggregated", "isController": true}, {"data": [[5.0, 1.8]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[5.0, 1.8]], "isOverall": false, "label": "Get device issue row-0-Aggregated", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "Get hedera id-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 1.0], [4.0, 1.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[3.0, 0.4]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[5.0, 2.8095238095238098]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[5.0, 2.8095238095238098]], "isOverall": false, "label": "Get device approve result-0-Aggregated", "isController": false}, {"data": [[5.0, 1.4]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[5.0, 1.4]], "isOverall": false, "label": "Create device-0-Aggregated", "isController": false}, {"data": [[5.0, 0.5357142857142856]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[5.0, 0.5357142857142856]], "isOverall": false, "label": "Get policy publish result-0-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [5.0, 1.75]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[4.8, 1.6]], "isOverall": false, "label": "Get issue schema-0-Aggregated", "isController": false}, {"data": [[1.0, 250.0], [2.0, 243.0], [4.0, 247.0], [5.0, 244.0], [3.0, 244.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[3.0, 245.6]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[5.0, 275.2]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[5.0, 275.2]], "isOverall": false, "label": "Get applications-Aggregated", "isController": false}, {"data": [[5.0, 272.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[5.0, 272.0]], "isOverall": false, "label": "Get device issue row-Aggregated", "isController": false}, {"data": [[4.0, 16414.5], [5.0, 10539.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[4.6, 12889.2]], "isOverall": false, "label": "Issue creation-Aggregated", "isController": true}, {"data": [[5.0, 14935.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[5.0, 14935.0]], "isOverall": false, "label": "Token associate-Aggregated", "isController": true}, {"data": [[5.0, 241.4]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[5.0, 241.4]], "isOverall": false, "label": "Get block for waiting device-Aggregated", "isController": false}, {"data": [[5.0, 53655.8]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[5.0, 53655.8]], "isOverall": false, "label": "Application creation-Aggregated", "isController": true}, {"data": [[5.0, 230.8]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[5.0, 230.8]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[0.0, 3617.2]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[0.0, 3617.2]], "isOverall": false, "label": "Get result for issue request approve-Aggregated", "isController": true}, {"data": [[0.0, 14037.4]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[0.0, 14037.4]], "isOverall": false, "label": "Get result for device approve-Aggregated", "isController": true}, {"data": [[5.0, 2.466666666666667]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[5.0, 2.466666666666667]], "isOverall": false, "label": "Get block for approve result-0-Aggregated", "isController": false}, {"data": [[5.0, 254.8]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[5.0, 254.8]], "isOverall": false, "label": "Approve application-Aggregated", "isController": false}, {"data": [[5.0, 228.6]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[5.0, 228.6]], "isOverall": false, "label": "Associate token-Aggregated", "isController": false}, {"data": [[5.0, 3.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[5.0, 3.0]], "isOverall": false, "label": "Get block for waiting device-0-Aggregated", "isController": false}, {"data": [[4.0, 275.0], [5.0, 426.3333333333333], [3.0, 270.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[4.4, 364.8]], "isOverall": false, "label": "Get issue approve result-Aggregated", "isController": false}, {"data": [[4.0, 2.3333333333333335], [2.0, 2.0], [1.0, 2.0], [5.0, 3.8], [3.0, 3.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[3.782608695652174, 3.0869565217391304]], "isOverall": false, "label": "Balance verify-0-Aggregated", "isController": false}, {"data": [[4.0, 233.5], [5.0, 234.39024390243898], [3.0, 233.5]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[4.866666666666667, 234.31111111111107]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[5.0, 270.65624999999994]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[5.0, 270.65624999999994]], "isOverall": false, "label": "Get application creation status-Aggregated", "isController": false}, {"data": [[5.0, 1414.096774193548]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[5.0, 1414.096774193548]], "isOverall": false, "label": "Get tokens-Aggregated", "isController": false}, {"data": [[5.0, 10203.8]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[5.0, 10203.8]], "isOverall": false, "label": "Choose registrant-Aggregated", "isController": false}, {"data": [[5.0, 0.8181818181818181]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[5.0, 0.8181818181818181]], "isOverall": false, "label": "Get associate result-0-Aggregated", "isController": false}, {"data": [[0.0, 10156.8]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[0.0, 10156.8]], "isOverall": false, "label": "Get result for app approve-Aggregated", "isController": true}, {"data": [[5.0, 1.359375]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[5.0, 1.359375]], "isOverall": false, "label": "Get application creation status-0-Aggregated", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Create application-0-Aggregated", "isController": false}, {"data": [[5.0, 10921.2]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[5.0, 10921.2]], "isOverall": false, "label": "Role approve-Aggregated", "isController": true}, {"data": [[1.0, 1.0], [2.0, 0.0], [4.0, 1.3333333333333333], [5.0, 1.0833333333333333], [3.0, 1.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[4.6, 1.0666666666666669]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[4.0, 483.0], [5.0, 637.25]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[4.8, 606.4]], "isOverall": false, "label": "Get issue schema-Aggregated", "isController": false}, {"data": [[4.0, 4312.0], [5.0, 4466.0], [3.0, 4280.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[4.4, 4398.0]], "isOverall": false, "label": "Issue approve-Aggregated", "isController": true}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Get block for waiting issue request-0-Aggregated", "isController": false}, {"data": [[5.0, 14808.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[5.0, 14808.0]], "isOverall": false, "label": "Device approve-Aggregated", "isController": true}, {"data": [[1.0, 1166.0], [2.0, 937.0], [4.0, 945.0], [5.0, 967.0], [3.0, 942.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[3.0, 991.4]], "isOverall": false, "label": "Get tenant-Aggregated", "isController": true}, {"data": [[4.0, 372.0], [5.0, 332.6666666666667], [3.0, 253.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[4.733333333333333, 332.6]], "isOverall": false, "label": "Approve device-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 1.0], [4.0, 1.0], [5.0, 0.0], [3.0, 1.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[3.0, 0.6]], "isOverall": false, "label": "Get Tenant Id-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [2.0, 1.0], [4.0, 0.0], [5.0, 1.0], [3.0, 2.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[5.0, 253.2]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[5.0, 253.2]], "isOverall": false, "label": "Publish Policy-Aggregated", "isController": false}, {"data": [[4.0, 60158.0], [2.0, 42043.0], [1.0, 43424.0], [5.0, 51991.0], [3.0, 43559.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[3.0, 48235.0]], "isOverall": false, "label": "Token minting verify-Aggregated", "isController": true}, {"data": [[5.0, 531.4]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[5.0, 531.4]], "isOverall": false, "label": "Create application-Aggregated", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [5.0, 2.3333333333333335], [3.0, 2.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[4.4, 2.2]], "isOverall": false, "label": "Get issue approve result-0-Aggregated", "isController": false}, {"data": [[5.0, 561.2]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[5.0, 561.2]], "isOverall": false, "label": "Get application schema-Aggregated", "isController": false}, {"data": [[5.0, 238.2]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[5.0, 238.2]], "isOverall": false, "label": "Get block for waiting app approve-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get application schema-0-Aggregated", "isController": false}, {"data": [[5.0, 1.4]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[5.0, 1.4]], "isOverall": false, "label": "Approve application-0-Aggregated", "isController": false}, {"data": [[5.0, 22584.4]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[5.0, 22584.4]], "isOverall": false, "label": "Device creation-Aggregated", "isController": true}, {"data": [[4.0, 0.3333333333333333], [2.0, 0.0], [5.0, 0.5934065934065933], [3.0, 1.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[4.896907216494844, 0.5876288659793812]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[5.0, 282.4666666666666]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[5.0, 282.4666666666666]], "isOverall": false, "label": "Get block for approve result-Aggregated", "isController": false}, {"data": [[5.0, 699.4]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[5.0, 699.4]], "isOverall": false, "label": "Get device schema-Aggregated", "isController": false}, {"data": [[5.0, 235.2]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[5.0, 235.2]], "isOverall": false, "label": "Get block for waiting issue request-Aggregated", "isController": false}, {"data": [[5.0, 9370.000000000002]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[5.0, 9370.000000000002]], "isOverall": false, "label": "Grant KYC-Aggregated", "isController": true}, {"data": [[5.0, 375362.2]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[5.0, 375362.2]], "isOverall": false, "label": "Policy import and publish-Aggregated", "isController": true}, {"data": [[1.0, 258.0], [2.0, 265.0], [4.0, 272.0], [5.0, 287.0], [3.0, 269.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[3.0, 270.2]], "isOverall": false, "label": "Get Tenant Id-Aggregated", "isController": false}, {"data": [[5.0, 10239.6]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[5.0, 10239.6]], "isOverall": false, "label": "Create device-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Grant KYC-0-Aggregated", "isController": false}, {"data": [[5.0, 174361.8]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[5.0, 174361.8]], "isOverall": false, "label": "Publish-Aggregated", "isController": true}, {"data": [[4.0, 275.2857142857143], [5.0, 293.59999999999997]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[4.588235294117647, 286.05882352941177]], "isOverall": false, "label": "Get issue creation status-Aggregated", "isController": false}, {"data": [[5.0, 271.2]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[5.0, 271.2]], "isOverall": false, "label": "Get hedera id-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get block for waiting app creation-0-Aggregated", "isController": false}, {"data": [[5.0, 266.04761904761904]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[5.0, 266.04761904761904]], "isOverall": false, "label": "Get device approve result-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Choose registrant-0-Aggregated", "isController": false}, {"data": [[4.0, 248.0], [2.0, 245.0], [5.0, 313.78021978021985], [3.0, 248.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[4.896907216494844, 309.680412371134]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[5.0, 863.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[5.0, 863.0]], "isOverall": false, "label": "WS open for kyc grant-Aggregated", "isController": false}, {"data": [[4.0, 2.5], [5.0, 1.5609756097560972], [3.0, 1.5]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[4.866666666666667, 1.5999999999999999]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Associate token-0-Aggregated", "isController": false}, {"data": [[5.0, 322.05882352941177]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[5.0, 322.05882352941177]], "isOverall": false, "label": "Get device creation status-Aggregated", "isController": false}, {"data": [[5.0, 1.6]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[5.0, 1.6]], "isOverall": false, "label": "Get devices-0-Aggregated", "isController": false}, {"data": [[4.0, 7942.333333333333], [2.0, 11570.0], [1.0, 11617.0], [5.0, 6286.099999999999], [3.0, 6241.166666666666]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[3.782608695652174, 7411.391304347825]], "isOverall": false, "label": "Balance verify-Aggregated", "isController": false}, {"data": [[5.0, 0.5161290322580645]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[5.0, 0.5161290322580645]], "isOverall": false, "label": "Get tokens-0-Aggregated", "isController": false}, {"data": [[5.0, 240.6]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[5.0, 240.6]], "isOverall": false, "label": "Get block for waiting app creation-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [5.0, 1.9166666666666665], [3.0, 1.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[4.733333333333333, 1.7333333333333332]], "isOverall": false, "label": "Approve device-0-Aggregated", "isController": false}, {"data": [[1.0, 869.0], [2.0, 670.0], [4.0, 671.0], [5.0, 677.0], [3.0, 671.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[3.0, 711.6]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[5.0, 228.36363636363635]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[5.0, 228.36363636363635]], "isOverall": false, "label": "Get associate result-Aggregated", "isController": false}, {"data": [[4.0, 2.428571428571429], [5.0, 18.1]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[4.588235294117647, 11.647058823529411]], "isOverall": false, "label": "Get issue creation status-0-Aggregated", "isController": false}, {"data": [[5.0, 269.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[5.0, 269.0]], "isOverall": false, "label": "Get devices-Aggregated", "isController": false}, {"data": [[1.0, 234.0], [2.0, 232.0], [4.0, 233.33333333333334], [5.0, 232.04166666666663], [3.0, 233.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[4.6, 232.26666666666665]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[5.0, 327.21428571428555]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[5.0, 327.21428571428555]], "isOverall": false, "label": "Get policy publish result-Aggregated", "isController": false}, {"data": [[5.0, 4.2]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[5.0, 4.2]], "isOverall": false, "label": "Get applications-0-Aggregated", "isController": false}, {"data": [[5.0, 1.8]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[5.0, 1.8]], "isOverall": false, "label": "Get device schema-0-Aggregated", "isController": false}, {"data": [[5.0, 8.647058823529413]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[5.0, 8.647058823529413]], "isOverall": false, "label": "Get device creation status-0-Aggregated", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Publish Policy-0-Aggregated", "isController": false}, {"data": [[5.0, 0.2]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[5.0, 0.2]], "isOverall": false, "label": "WS open for kyc grant-0-Aggregated", "isController": false}, {"data": [[4.0, 2.5], [5.0, 2.3333333333333335]], "isOverall": false, "label": "Get issues-0", "isController": false}, {"data": [[4.6, 2.4]], "isOverall": false, "label": "Get issues-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 19.066666666666666, "minX": 1.69821576E12, "maxY": 222142.61666666667, "series": [{"data": [[1.698216E12, 2660.8333333333335], [1.69821618E12, 32582.983333333334], [1.69821588E12, 2253.2], [1.69821636E12, 96780.55], [1.69821606E12, 2367.1666666666665], [1.69821576E12, 377.1333333333333], [1.69821624E12, 147771.56666666668], [1.69821594E12, 2935.983333333333], [1.69821642E12, 4223.766666666666], [1.69821612E12, 4243.6], [1.69821582E12, 2114.383333333333], [1.6982163E12, 222142.61666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.698216E12, 357.8], [1.69821618E12, 1013.0666666666667], [1.69821588E12, 311.5], [1.69821636E12, 681.5833333333334], [1.69821606E12, 313.8833333333333], [1.69821576E12, 73.31666666666666], [1.69821624E12, 2292.05], [1.69821594E12, 378.56666666666666], [1.69821642E12, 19.066666666666666], [1.69821612E12, 417.6], [1.69821582E12, 343.6], [1.6982163E12, 2520.483333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821642E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69821576E12, "maxY": 394062.0, "series": [{"data": [[1.69821636E12, 272.5], [1.6982163E12, 278.6666666666667]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69821618E12, 1.0], [1.69821624E12, 0.3333333333333333]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.698216E12, 207225.5], [1.69821606E12, 227719.0], [1.69821594E12, 181372.5]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69821636E12, 1.0], [1.69821624E12, 2.0], [1.6982163E12, 2.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69821618E12, 1.0], [1.69821624E12, 0.6666666666666667]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.69821576E12, 0.5], [1.69821582E12, 0.33333333333333337]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.69821636E12, 1.0], [1.69821624E12, 2.75], [1.6982163E12, 3.0666666666666664]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.69821624E12, 0.5], [1.6982163E12, 2.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.698216E12, 0.5625], [1.69821618E12, 0.42857142857142855], [1.69821606E12, 0.6153846153846154], [1.69821594E12, 0.0], [1.69821612E12, 0.5185185185185185]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69821636E12, 1.0], [1.69821624E12, 2.0], [1.6982163E12, 1.6666666666666667]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.69821576E12, 246.5], [1.69821582E12, 245.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.69821624E12, 267.0], [1.6982163E12, 287.5]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69821636E12, 264.0], [1.69821624E12, 266.0], [1.6982163E12, 276.6666666666667]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69821636E12, 16414.5], [1.6982163E12, 10539.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.69821618E12, 15008.333333333332], [1.69821624E12, 4943.0], [1.69821612E12, 24707.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69821618E12, 238.5], [1.69821624E12, 243.33333333333334]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.69821624E12, 52318.666666666664], [1.6982163E12, 55661.5]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.698216E12, 231.0], [1.69821606E12, 229.0], [1.69821594E12, 231.5]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69821636E12, 3524.0], [1.6982163E12, 3679.3333333333335]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.69821636E12, 13356.0], [1.69821624E12, 6816.0], [1.6982163E12, 16671.666666666668]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.69821624E12, 1.0], [1.6982163E12, 3.4444444444444446]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.69821624E12, 258.0], [1.6982163E12, 250.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.69821618E12, 229.0], [1.69821612E12, 227.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69821618E12, 0.5], [1.69821624E12, 4.666666666666666]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69821636E12, 272.5], [1.6982163E12, 426.3333333333333]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69821636E12, 2.6153846153846154], [1.69821642E12, 2.0], [1.6982163E12, 4.125]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.69821618E12, 229.2857142857143], [1.69821636E12, 234.6], [1.69821624E12, 236.21428571428572], [1.69821612E12, 236.5], [1.6982163E12, 234.47058823529414]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.69821618E12, 273.76470588235287], [1.69821624E12, 273.48717948717933], [1.6982163E12, 250.25000000000003]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.69821618E12, 1784.75], [1.69821624E12, 268.54545454545456], [1.69821612E12, 3081.75]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69821618E12, 8650.0], [1.69821624E12, 11239.666666666666]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.69821618E12, 0.6666666666666667], [1.69821624E12, 1.0], [1.69821612E12, 1.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.69821624E12, 6809.5], [1.6982163E12, 12388.333333333334]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.69821618E12, 1.235294117647059], [1.69821624E12, 1.4615384615384617], [1.6982163E12, 1.125]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69821618E12, 1.0], [1.69821624E12, 1.3333333333333333]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.69821624E12, 7582.0], [1.6982163E12, 13147.333333333334]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.698216E12, 0.5], [1.69821618E12, 0.33333333333333337], [1.69821636E12, 1.5], [1.69821606E12, 0.0], [1.69821576E12, 0.5], [1.69821624E12, 1.3333333333333333], [1.69821594E12, 0.0], [1.69821612E12, 1.0], [1.69821582E12, 0.6666666666666667], [1.6982163E12, 1.875]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69821636E12, 483.0], [1.69821624E12, 1121.0], [1.6982163E12, 476.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69821636E12, 4296.0], [1.6982163E12, 4466.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.6666666666666666]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.69821636E12, 14124.0], [1.69821624E12, 7586.0], [1.6982163E12, 17443.333333333332]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.69821576E12, 1051.5], [1.69821582E12, 951.3333333333334]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.69821636E12, 332.3333333333333], [1.69821624E12, 333.0], [1.6982163E12, 332.55555555555554]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.69821576E12, 0.5], [1.69821582E12, 0.6666666666666667]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.69821576E12, 1.0], [1.69821582E12, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.698216E12, 250.5], [1.69821606E12, 250.0], [1.69821594E12, 257.5]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.69821636E12, 51902.666666666664], [1.69821642E12, 42733.5]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69821618E12, 526.0], [1.69821624E12, 535.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.698216E12, 1.0], [1.69821606E12, 0.0], [1.69821594E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69821636E12, 2.0], [1.6982163E12, 2.3333333333333335]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69821618E12, 472.0], [1.69821624E12, 620.6666666666666]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69821618E12, 241.5], [1.69821624E12, 236.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 1.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.69821624E12, 1.3333333333333333], [1.6982163E12, 1.5]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.69821624E12, 24685.0], [1.6982163E12, 21184.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.698216E12, 0.6666666666666666], [1.69821588E12, 0.666666666666667], [1.69821606E12, 1.0], [1.69821576E12, 0.0], [1.69821594E12, 0.41379310344827586], [1.69821582E12, 0.6666666666666667]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.69821624E12, 250.66666666666666], [1.6982163E12, 303.6666666666667]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.69821624E12, 710.5], [1.6982163E12, 692.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69821618E12, 233.5], [1.69821624E12, 236.33333333333334]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.69821618E12, 8012.4], [1.69821624E12, 13350.0], [1.69821612E12, 238.0]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.69821618E12, 394062.0], [1.69821612E12, 347312.5]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.69821576E12, 261.5], [1.69821582E12, 276.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.69821624E12, 8854.5], [1.6982163E12, 11163.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.69821618E12, 0.6666666666666667], [1.69821624E12, 1.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.69821618E12, 179988.66666666666], [1.69821612E12, 165921.5]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69821636E12, 291.1111111111111], [1.69821624E12, 283.0], [1.6982163E12, 280.00000000000006]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69821618E12, 269.0], [1.69821624E12, 272.6666666666667]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69821618E12, 0.5], [1.69821624E12, 0.6666666666666666]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.69821636E12, 259.5], [1.69821624E12, 267.75], [1.6982163E12, 266.46666666666675]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 1.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.698216E12, 318.5], [1.69821588E12, 321.5333333333333], [1.69821606E12, 246.0], [1.69821576E12, 245.0], [1.69821594E12, 319.79310344827576], [1.69821582E12, 283.58333333333337]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.69821618E12, 863.3333333333334], [1.69821624E12, 857.0], [1.69821612E12, 868.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.69821618E12, 0.28571428571428575], [1.69821636E12, 1.8], [1.69821624E12, 1.9285714285714286], [1.69821612E12, 0.5], [1.6982163E12, 1.9411764705882353]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.69821618E12, 0.5], [1.69821612E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.69821624E12, 275.22222222222223], [1.6982163E12, 374.74999999999994]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.69821624E12, 1.5], [1.6982163E12, 1.6666666666666667]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69821636E12, 7468.615384615385], [1.69821642E12, 11761.0], [1.6982163E12, 6231.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.69821618E12, 0.37499999999999994], [1.69821624E12, 0.7272727272727273], [1.69821612E12, 0.5]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69821618E12, 237.5], [1.69821624E12, 242.66666666666666]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.69821636E12, 1.0], [1.69821624E12, 1.3333333333333333], [1.6982163E12, 2.111111111111111]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.69821576E12, 769.5], [1.69821582E12, 673.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.69821618E12, 228.66666666666666], [1.69821624E12, 226.0], [1.69821612E12, 228.5]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69821636E12, 19.88888888888889], [1.69821624E12, 3.0], [1.6982163E12, 2.2857142857142856]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.69821624E12, 269.5], [1.6982163E12, 268.6666666666667]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.698216E12, 230.5], [1.69821618E12, 233.0], [1.69821636E12, 231.0], [1.69821606E12, 230.0], [1.69821576E12, 233.0], [1.69821624E12, 233.33333333333334], [1.69821594E12, 232.0], [1.69821612E12, 229.0], [1.69821582E12, 235.66666666666666], [1.6982163E12, 231.25]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.698216E12, 302.125], [1.69821618E12, 372.7142857142857], [1.69821606E12, 328.69230769230774], [1.69821594E12, 248.0], [1.69821612E12, 319.99999999999994]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.69821624E12, 1.0], [1.6982163E12, 9.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.69821624E12, 2.0], [1.6982163E12, 1.6666666666666667]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.69821624E12, 14.88888888888889], [1.6982163E12, 1.625]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821606E12, 0.0], [1.69821594E12, 1.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.69821618E12, 0.3333333333333333], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69821636E12, 2.5], [1.6982163E12, 2.3333333333333335]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821642E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69821576E12, "maxY": 11758.5, "series": [{"data": [[1.69821636E12, 269.0], [1.6982163E12, 275.3333333333333]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821606E12, 0.0], [1.69821594E12, 0.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.69821576E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821618E12, 0.0], [1.69821606E12, 0.0], [1.69821594E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.69821576E12, 246.0], [1.69821582E12, 244.33333333333334]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.69821624E12, 265.3333333333333], [1.6982163E12, 278.5]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69821636E12, 262.0], [1.69821624E12, 263.0], [1.6982163E12, 273.6666666666667]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69821618E12, 238.0], [1.69821624E12, 238.66666666666666]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.698216E12, 230.0], [1.69821606E12, 229.0], [1.69821594E12, 231.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.69821624E12, 256.3333333333333], [1.6982163E12, 248.5]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.69821618E12, 228.5], [1.69821612E12, 226.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69821636E12, 269.5], [1.6982163E12, 424.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821642E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.69821618E12, 228.71428571428572], [1.69821636E12, 232.6], [1.69821624E12, 234.14285714285714], [1.69821612E12, 236.0], [1.6982163E12, 232.2941176470588]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.69821618E12, 272.23529411764713], [1.69821624E12, 271.84615384615387], [1.6982163E12, 249.125]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.69821618E12, 1784.0625], [1.69821624E12, 267.6363636363637], [1.69821612E12, 3081.0]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69821618E12, 8649.5], [1.69821624E12, 11238.666666666666]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.698216E12, 0.0], [1.69821618E12, 0.0], [1.69821636E12, 0.0], [1.69821606E12, 0.0], [1.69821576E12, 0.0], [1.69821624E12, 0.0], [1.69821594E12, 0.0], [1.69821612E12, 0.0], [1.69821582E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69821636E12, 271.0], [1.69821624E12, 700.0], [1.6982163E12, 259.6666666666667]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.69821576E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.69821636E12, 331.0], [1.69821624E12, 331.3333333333333], [1.6982163E12, 330.44444444444446]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.69821576E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.69821576E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.698216E12, 250.0], [1.69821606E12, 250.0], [1.69821594E12, 256.5]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821642E12, 0.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69821618E12, 524.5], [1.69821624E12, 533.6666666666666]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821606E12, 0.0], [1.69821594E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69821618E12, 258.0], [1.69821624E12, 407.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69821618E12, 240.5], [1.69821624E12, 235.66666666666666]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.698216E12, 0.0], [1.69821588E12, 0.0], [1.69821606E12, 0.0], [1.69821576E12, 0.0], [1.69821594E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.69821624E12, 249.66666666666666], [1.6982163E12, 299.8888888888889]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.69821624E12, 270.0], [1.6982163E12, 271.6666666666667]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69821618E12, 233.5], [1.69821624E12, 235.66666666666666]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.69821618E12, 136.4], [1.69821624E12, 56.0], [1.69821612E12, 237.0]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.69821618E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.69821576E12, 260.5], [1.69821582E12, 275.3333333333333]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.69821624E12, 8853.5], [1.6982163E12, 11161.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69821636E12, 270.8888888888889], [1.69821624E12, 280.0], [1.6982163E12, 277.4285714285714]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69821618E12, 268.0], [1.69821624E12, 272.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.69821636E12, 258.0], [1.69821624E12, 264.5], [1.6982163E12, 263.1333333333333]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.698216E12, 317.66666666666663], [1.69821588E12, 320.6333333333332], [1.69821606E12, 245.0], [1.69821576E12, 244.0], [1.69821594E12, 319.1034482758621], [1.69821582E12, 282.70833333333337]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.69821624E12, 259.5555555555556], [1.6982163E12, 372.5]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69821636E12, 7465.846153846153], [1.69821642E12, 11758.5], [1.6982163E12, 6226.75]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69821618E12, 236.0], [1.69821624E12, 241.33333333333334]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.69821576E12, 767.0], [1.69821582E12, 671.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.69821618E12, 228.0], [1.69821624E12, 225.0], [1.69821612E12, 227.5]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.69821624E12, 267.0], [1.6982163E12, 266.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.698216E12, 230.0], [1.69821618E12, 232.66666666666666], [1.69821636E12, 229.5], [1.69821606E12, 230.0], [1.69821576E12, 232.5], [1.69821624E12, 231.83333333333334], [1.69821594E12, 231.0], [1.69821612E12, 228.0], [1.69821582E12, 235.0], [1.6982163E12, 229.12500000000003]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.698216E12, 301.06249999999994], [1.69821618E12, 342.0], [1.69821606E12, 327.92307692307696], [1.69821594E12, 247.0], [1.69821612E12, 311.5185185185185]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821606E12, 0.0], [1.69821594E12, 0.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821642E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69821576E12, "maxY": 2649.3333333333335, "series": [{"data": [[1.69821636E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.698216E12, 1308.0], [1.69821606E12, 1309.0], [1.69821594E12, 1097.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.69821576E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821618E12, 0.0], [1.69821606E12, 0.0], [1.69821594E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.69821576E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 148.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.69821624E12, 298.0], [1.6982163E12, 441.5]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.698216E12, 0.0], [1.69821606E12, 0.0], [1.69821594E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 148.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821642E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.69821618E12, 25.411764705882355], [1.69821624E12, 23.128205128205128], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.69821618E12, 27.500000000000004], [1.69821624E12, 39.45454545454546], [1.69821612E12, 109.25000000000001]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 151.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.698216E12, 0.0], [1.69821618E12, 0.0], [1.69821636E12, 0.0], [1.69821606E12, 0.0], [1.69821576E12, 0.0], [1.69821624E12, 0.0], [1.69821594E12, 0.0], [1.69821612E12, 0.0], [1.69821582E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 444.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 148.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.69821576E12, 532.0], [1.69821582E12, 441.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.69821576E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.69821576E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821606E12, 0.0], [1.69821594E12, 0.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.69821636E12, 144.33333333333334], [1.69821642E12, 530.5]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821606E12, 0.0], [1.69821594E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 147.66666666666666]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 297.3333333333333]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.698216E12, 0.0], [1.69821588E12, 0.0], [1.69821606E12, 0.0], [1.69821576E12, 0.0], [1.69821594E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 50.33333333333333]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.69821618E12, 523.4], [1.69821624E12, 750.5], [1.69821612E12, 0.0]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.69821618E12, 2649.3333333333335], [1.69821612E12, 2201.5]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.69821576E12, 0.0], [1.69821582E12, 0.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.69821618E12, 1341.0], [1.69821612E12, 1104.5]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.698216E12, 73.16666666666667], [1.69821588E12, 72.9], [1.69821606E12, 0.0], [1.69821576E12, 0.0], [1.69821594E12, 75.10344827586206], [1.69821582E12, 36.5]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.69821618E12, 862.6666666666666], [1.69821624E12, 856.0], [1.69821612E12, 864.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 111.49999999999999]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69821636E12, 33.30769230769231], [1.69821642E12, 530.5], [1.6982163E12, 0.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.69821576E12, 532.0], [1.69821582E12, 441.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821618E12, 0.0], [1.69821636E12, 0.0], [1.69821606E12, 0.0], [1.69821576E12, 0.0], [1.69821624E12, 0.0], [1.69821594E12, 0.0], [1.69821612E12, 0.0], [1.69821582E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.698216E12, 54.6875], [1.69821618E12, 98.42857142857142], [1.69821606E12, 85.1923076923077], [1.69821594E12, 0.0], [1.69821612E12, 65.33333333333334]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.69821624E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821606E12, 0.0], [1.69821594E12, 0.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.69821618E12, 0.0], [1.69821624E12, 0.0], [1.69821612E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69821636E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821642E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69821576E12, "maxY": 15084.0, "series": [{"data": [[1.698216E12, 674.0], [1.69821618E12, 12994.0], [1.69821588E12, 673.0], [1.69821636E12, 11758.0], [1.69821606E12, 697.0], [1.69821576E12, 869.0], [1.69821624E12, 15084.0], [1.69821594E12, 678.0], [1.69821642E12, 11905.0], [1.69821612E12, 11202.0], [1.69821582E12, 677.0], [1.6982163E12, 14590.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.698216E12, 256.2], [1.69821618E12, 467.99999999999994], [1.69821588E12, 282.7], [1.69821636E12, 10014.100000000055], [1.69821606E12, 259.9], [1.69821576E12, 689.9000000000003], [1.69821624E12, 274.1], [1.69821594E12, 256.7], [1.69821642E12, 11905.0], [1.69821612E12, 398.3000000000005], [1.69821582E12, 271.1], [1.6982163E12, 473.29999999999995]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.698216E12, 674.0], [1.69821618E12, 11866.670000000011], [1.69821588E12, 673.0], [1.69821636E12, 11758.0], [1.69821606E12, 697.0], [1.69821576E12, 869.0], [1.69821624E12, 13504.320000000003], [1.69821594E12, 678.0], [1.69821642E12, 11905.0], [1.69821612E12, 11202.0], [1.69821582E12, 677.0], [1.6982163E12, 13591.840000000022]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.698216E12, 665.65], [1.69821618E12, 856.0999999999999], [1.69821588E12, 667.0], [1.69821636E12, 11467.7], [1.69821606E12, 669.65], [1.69821576E12, 869.0], [1.69821624E12, 610.2499999999981], [1.69821594E12, 663.75], [1.69821642E12, 11905.0], [1.69821612E12, 672.7], [1.69821582E12, 669.7], [1.6982163E12, 763.3499999999987]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.698216E12, 0.0], [1.69821618E12, 0.0], [1.69821588E12, 0.0], [1.69821636E12, 0.0], [1.69821606E12, 0.0], [1.69821576E12, 0.0], [1.69821624E12, 0.0], [1.69821594E12, 0.0], [1.69821642E12, 2.0], [1.69821612E12, 0.0], [1.69821582E12, 0.0], [1.6982163E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.698216E12, 116.0], [1.69821618E12, 114.0], [1.69821588E12, 122.5], [1.69821636E12, 194.5], [1.69821606E12, 115.0], [1.69821576E12, 116.5], [1.69821624E12, 172.5], [1.69821594E12, 116.5], [1.69821642E12, 5809.5], [1.69821612E12, 114.5], [1.69821582E12, 117.5], [1.6982163E12, 124.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821642E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 115.0, "minX": 2.0, "maxY": 193.0, "series": [{"data": [[8.0, 121.5], [2.0, 193.0], [4.0, 123.5], [18.0, 123.5], [10.0, 173.0], [5.0, 121.0], [6.0, 116.0], [12.0, 115.0], [14.0, 115.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 118.5, "series": [{"data": [[8.0, 0.0], [2.0, 113.0], [4.0, 0.0], [18.0, 117.0], [10.0, 0.0], [5.0, 118.5], [6.0, 113.5], [12.0, 112.5], [14.0, 113.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.69821576E12, "maxY": 4.45, "series": [{"data": [[1.698216E12, 1.15], [1.69821618E12, 2.966666666666667], [1.69821588E12, 1.0], [1.69821636E12, 1.35], [1.69821606E12, 0.9833333333333333], [1.69821576E12, 0.3], [1.69821624E12, 4.45], [1.69821594E12, 1.2], [1.69821642E12, 0.03333333333333333], [1.69821612E12, 1.3833333333333333], [1.69821582E12, 1.2], [1.6982163E12, 3.816666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821642E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69821576E12, "maxY": 4.433333333333334, "series": [{"data": [[1.698216E12, 1.1], [1.69821618E12, 2.8], [1.69821588E12, 1.0], [1.69821636E12, 1.3333333333333333], [1.69821606E12, 0.9833333333333333], [1.69821576E12, 0.26666666666666666], [1.69821624E12, 4.433333333333334], [1.69821594E12, 1.1666666666666667], [1.69821642E12, 0.06666666666666667], [1.69821612E12, 1.3166666666666667], [1.69821582E12, 1.15], [1.6982163E12, 3.8]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.69821618E12, 0.05], [1.69821624E12, 0.016666666666666666], [1.69821612E12, 0.016666666666666666]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.698216E12, 0.03333333333333333], [1.69821618E12, 0.11666666666666667], [1.69821606E12, 0.016666666666666666], [1.69821576E12, 0.03333333333333333], [1.69821624E12, 0.016666666666666666], [1.69821594E12, 0.03333333333333333], [1.69821612E12, 0.03333333333333333], [1.69821582E12, 0.05]], "isOverall": false, "label": "202", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821642E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69821576E12, "maxY": 0.65, "series": [{"data": [[1.69821576E12, 0.03333333333333333], [1.69821582E12, 0.05]], "isOverall": false, "label": "Get tenant-success", "isController": true}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Choose registrant-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get hedera id-0-success", "isController": false}, {"data": [[1.69821636E12, 0.016666666666666666], [1.69821624E12, 0.016666666666666666], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get result for device approve-success", "isController": true}, {"data": [[1.69821636E12, 0.15], [1.69821624E12, 0.016666666666666666], [1.6982163E12, 0.11666666666666667]], "isOverall": false, "label": "Get issue creation status-0-success", "isController": false}, {"data": [[1.69821636E12, 0.15], [1.69821624E12, 0.016666666666666666], [1.6982163E12, 0.11666666666666667]], "isOverall": false, "label": "Get issue creation status-success", "isController": false}, {"data": [[1.698216E12, 0.03333333333333333], [1.69821618E12, 0.05], [1.69821636E12, 0.03333333333333333], [1.69821606E12, 0.016666666666666666], [1.69821576E12, 0.03333333333333333], [1.69821624E12, 0.1], [1.69821594E12, 0.03333333333333333], [1.69821612E12, 0.016666666666666666], [1.69821582E12, 0.05], [1.6982163E12, 0.13333333333333333]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.69821636E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get issues-0-success", "isController": false}, {"data": [[1.698216E12, 0.2], [1.69821588E12, 0.5], [1.69821606E12, 0.016666666666666666], [1.69821576E12, 0.016666666666666666], [1.69821594E12, 0.48333333333333334], [1.69821582E12, 0.4]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.698216E12, 0.03333333333333333], [1.69821606E12, 0.016666666666666666], [1.69821594E12, 0.03333333333333333]], "isOverall": false, "label": "Import-success", "isController": true}, {"data": [[1.69821618E12, 0.05], [1.69821624E12, 0.016666666666666666], [1.69821612E12, 0.016666666666666666]], "isOverall": false, "label": "Token associate-success", "isController": true}, {"data": [[1.69821624E12, 0.1], [1.6982163E12, 0.15]], "isOverall": false, "label": "Get block for approve result-0-success", "isController": false}, {"data": [[1.69821624E12, 0.15], [1.6982163E12, 0.13333333333333333]], "isOverall": false, "label": "Get device creation status-success", "isController": false}, {"data": [[1.69821624E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Role approve-success", "isController": true}, {"data": [[1.69821624E12, 0.15], [1.6982163E12, 0.13333333333333333]], "isOverall": false, "label": "Get device creation status-0-success", "isController": false}, {"data": [[1.69821624E12, 0.05], [1.6982163E12, 0.03333333333333333]], "isOverall": false, "label": "Application creation-success", "isController": true}, {"data": [[1.69821636E12, 0.05], [1.69821624E12, 0.05], [1.6982163E12, 0.15]], "isOverall": false, "label": "Approve device-success", "isController": false}, {"data": [[1.69821624E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Create device-0-success", "isController": false}, {"data": [[1.698216E12, 0.03333333333333333], [1.69821606E12, 0.016666666666666666], [1.69821594E12, 0.03333333333333333]], "isOverall": false, "label": "Publish Policy-0-success", "isController": false}, {"data": [[1.69821618E12, 0.06666666666666667], [1.69821612E12, 0.016666666666666666]], "isOverall": false, "label": "Associate token-0-success", "isController": false}, {"data": [[1.69821576E12, 0.03333333333333333], [1.69821582E12, 0.05]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.69821618E12, 0.26666666666666666], [1.69821624E12, 0.18333333333333332], [1.69821612E12, 0.06666666666666667]], "isOverall": false, "label": "Get tokens-success", "isController": false}, {"data": [[1.69821618E12, 0.05], [1.69821624E12, 0.016666666666666666], [1.69821612E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for kyc grant-0-success", "isController": false}, {"data": [[1.698216E12, 0.03333333333333333], [1.69821606E12, 0.016666666666666666], [1.69821594E12, 0.03333333333333333]], "isOverall": false, "label": "Publish Policy-success", "isController": false}, {"data": [[1.69821618E12, 0.11666666666666667], [1.69821636E12, 0.08333333333333333], [1.69821624E12, 0.23333333333333334], [1.69821612E12, 0.03333333333333333], [1.6982163E12, 0.2833333333333333]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.69821636E12, 0.05], [1.69821642E12, 0.03333333333333333]], "isOverall": false, "label": "Token minting verify-success", "isController": true}, {"data": [[1.69821624E12, 0.05], [1.6982163E12, 0.03333333333333333]], "isOverall": false, "label": "Approve application-success", "isController": false}, {"data": [[1.69821618E12, 0.06666666666666667], [1.69821612E12, 0.016666666666666666]], "isOverall": false, "label": "Associate token-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get hedera id-success", "isController": false}, {"data": [[1.69821624E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get result for app approve-success", "isController": true}, {"data": [[1.69821624E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get device schema-0-success", "isController": false}, {"data": [[1.69821576E12, 0.03333333333333333], [1.69821582E12, 0.05]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.69821636E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get issue approve result-success", "isController": false}, {"data": [[1.69821624E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Create device-success", "isController": false}, {"data": [[1.69821636E12, 0.016666666666666666], [1.69821624E12, 0.016666666666666666], [1.6982163E12, 0.05]], "isOverall": false, "label": "Device approve-success", "isController": true}, {"data": [[1.69821624E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get devices-0-success", "isController": false}, {"data": [[1.69821636E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get issues-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get block for waiting device-success", "isController": false}, {"data": [[1.69821636E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Issue approve-success", "isController": true}, {"data": [[1.69821576E12, 0.03333333333333333], [1.69821582E12, 0.05]], "isOverall": false, "label": "Get Tenant Id-success", "isController": false}, {"data": [[1.69821576E12, 0.03333333333333333], [1.69821582E12, 0.05]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.69821618E12, 0.2833333333333333], [1.69821624E12, 0.65], [1.6982163E12, 0.13333333333333333]], "isOverall": false, "label": "Get application creation status-success", "isController": false}, {"data": [[1.69821618E12, 0.26666666666666666], [1.69821624E12, 0.18333333333333332], [1.69821612E12, 0.06666666666666667]], "isOverall": false, "label": "Get tokens-0-success", "isController": false}, {"data": [[1.698216E12, 0.03333333333333333], [1.69821606E12, 0.016666666666666666], [1.69821594E12, 0.03333333333333333]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.698216E12, 0.26666666666666666], [1.69821618E12, 0.23333333333333334], [1.69821606E12, 0.43333333333333335], [1.69821594E12, 0.016666666666666666], [1.69821612E12, 0.45]], "isOverall": false, "label": "Get policy publish result-0-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get block for waiting app creation-0-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get application schema-0-success", "isController": false}, {"data": [[1.69821618E12, 0.1], [1.69821624E12, 0.016666666666666666], [1.69821612E12, 0.06666666666666667]], "isOverall": false, "label": "Get associate result-success", "isController": false}, {"data": [[1.69821576E12, 0.03333333333333333], [1.69821582E12, 0.05]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get block for waiting issue request-0-success", "isController": false}, {"data": [[1.698216E12, 0.2], [1.69821588E12, 0.5], [1.69821606E12, 0.016666666666666666], [1.69821576E12, 0.016666666666666666], [1.69821594E12, 0.48333333333333334], [1.69821582E12, 0.4]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Choose registrant-0-success", "isController": false}, {"data": [[1.69821624E12, 0.05], [1.6982163E12, 0.03333333333333333]], "isOverall": false, "label": "Get applications-success", "isController": false}, {"data": [[1.69821624E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get devices-success", "isController": false}, {"data": [[1.69821618E12, 0.1], [1.69821624E12, 0.016666666666666666], [1.69821612E12, 0.06666666666666667]], "isOverall": false, "label": "Get associate result-0-success", "isController": false}, {"data": [[1.69821636E12, 0.016666666666666666], [1.69821624E12, 0.016666666666666666], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get device issue row-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get block for waiting app creation-success", "isController": false}, {"data": [[1.69821636E12, 0.21666666666666667], [1.69821642E12, 0.03333333333333333], [1.6982163E12, 0.13333333333333333]], "isOverall": false, "label": "Balance verify-success", "isController": false}, {"data": [[1.69821618E12, 0.05], [1.69821612E12, 0.03333333333333333]], "isOverall": false, "label": "Publish-success", "isController": true}, {"data": [[1.69821636E12, 0.03333333333333333], [1.69821624E12, 0.06666666666666667], [1.6982163E12, 0.25]], "isOverall": false, "label": "Get device approve result-success", "isController": false}, {"data": [[1.69821636E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Issue creation-success", "isController": true}, {"data": [[1.698216E12, 0.26666666666666666], [1.69821618E12, 0.23333333333333334], [1.69821606E12, 0.43333333333333335], [1.69821594E12, 0.016666666666666666], [1.69821612E12, 0.45]], "isOverall": false, "label": "Get policy publish result-success", "isController": false}, {"data": [[1.69821618E12, 0.05], [1.69821612E12, 0.03333333333333333]], "isOverall": false, "label": "Policy import and publish-success", "isController": true}, {"data": [[1.698216E12, 0.03333333333333333], [1.69821618E12, 0.05], [1.69821636E12, 0.03333333333333333], [1.69821606E12, 0.016666666666666666], [1.69821576E12, 0.03333333333333333], [1.69821624E12, 0.1], [1.69821594E12, 0.03333333333333333], [1.69821612E12, 0.016666666666666666], [1.69821582E12, 0.05], [1.6982163E12, 0.13333333333333333]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.698216E12, 0.03333333333333333], [1.69821606E12, 0.016666666666666666], [1.69821594E12, 0.03333333333333333]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.69821618E12, 0.11666666666666667], [1.69821636E12, 0.08333333333333333], [1.69821624E12, 0.23333333333333334], [1.69821612E12, 0.03333333333333333], [1.6982163E12, 0.2833333333333333]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.69821618E12, 0.05], [1.69821624E12, 0.016666666666666666], [1.69821612E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for kyc grant-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Create application-0-success", "isController": false}, {"data": [[1.69821636E12, 0.016666666666666666], [1.69821624E12, 0.016666666666666666], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get issue schema-success", "isController": false}, {"data": [[1.69821636E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get issue approve result-0-success", "isController": false}, {"data": [[1.69821618E12, 0.05], [1.69821624E12, 0.016666666666666666], [1.69821612E12, 0.016666666666666666]], "isOverall": false, "label": "Grant KYC-0-success", "isController": false}, {"data": [[1.69821636E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get result for issue request approve-success", "isController": true}, {"data": [[1.69821624E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Device creation-success", "isController": true}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get block for waiting app approve-0-success", "isController": false}, {"data": [[1.69821618E12, 0.2833333333333333], [1.69821624E12, 0.65], [1.6982163E12, 0.13333333333333333]], "isOverall": false, "label": "Get application creation status-0-success", "isController": false}, {"data": [[1.69821636E12, 0.016666666666666666], [1.69821624E12, 0.016666666666666666], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get issue schema-0-success", "isController": false}, {"data": [[1.69821636E12, 0.05], [1.69821624E12, 0.05], [1.6982163E12, 0.15]], "isOverall": false, "label": "Approve device-0-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Create application-success", "isController": false}, {"data": [[1.69821624E12, 0.03333333333333333], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get device schema-success", "isController": false}, {"data": [[1.69821636E12, 0.03333333333333333], [1.69821624E12, 0.06666666666666667], [1.6982163E12, 0.25]], "isOverall": false, "label": "Get device approve result-0-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get block for waiting issue request-success", "isController": false}, {"data": [[1.69821576E12, 0.03333333333333333], [1.69821582E12, 0.05]], "isOverall": false, "label": "Get Tenant Id-0-success", "isController": false}, {"data": [[1.69821636E12, 0.21666666666666667], [1.69821642E12, 0.03333333333333333], [1.6982163E12, 0.13333333333333333]], "isOverall": false, "label": "Balance verify-0-success", "isController": false}, {"data": [[1.69821618E12, 0.08333333333333333], [1.69821624E12, 0.06666666666666667], [1.69821612E12, 0.016666666666666666]], "isOverall": false, "label": "Grant KYC-success", "isController": true}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get block for waiting app approve-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get application schema-success", "isController": false}, {"data": [[1.69821618E12, 0.03333333333333333], [1.69821624E12, 0.05]], "isOverall": false, "label": "Get block for waiting device-0-success", "isController": false}, {"data": [[1.69821624E12, 0.05], [1.6982163E12, 0.03333333333333333]], "isOverall": false, "label": "Approve application-0-success", "isController": false}, {"data": [[1.69821624E12, 0.1], [1.6982163E12, 0.15]], "isOverall": false, "label": "Get block for approve result-success", "isController": false}, {"data": [[1.69821636E12, 0.016666666666666666], [1.69821624E12, 0.016666666666666666], [1.6982163E12, 0.05]], "isOverall": false, "label": "Get device issue row-0-success", "isController": false}, {"data": [[1.69821624E12, 0.05], [1.6982163E12, 0.03333333333333333]], "isOverall": false, "label": "Get applications-0-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821642E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.69821576E12, "maxY": 4.716666666666667, "series": [{"data": [[1.698216E12, 1.1666666666666667], [1.69821618E12, 3.15], [1.69821588E12, 1.0], [1.69821636E12, 1.5166666666666666], [1.69821606E12, 1.0166666666666666], [1.69821576E12, 0.3333333333333333], [1.69821624E12, 4.716666666666667], [1.69821594E12, 1.2333333333333334], [1.69821642E12, 0.1], [1.69821612E12, 1.45], [1.69821582E12, 1.25], [1.6982163E12, 4.233333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821642E12, "title": "Total Transactions Per Second"}},
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
