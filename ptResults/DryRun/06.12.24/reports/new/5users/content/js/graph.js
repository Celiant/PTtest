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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 20.0, "series": [{"data": [[0.0, 5.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[900.0, 2.0], [1000.0, 3.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[300.0, 1.0], [200.0, 6.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[700.0, 4.0], [1500.0, 1.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[300.0, 3.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[2000.0, 5.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[2000.0, 5.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0], [400.0, 2.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1100.0, 1.0], [900.0, 2.0], [1000.0, 2.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[8600.0, 1.0], [8700.0, 1.0], [9400.0, 1.0], [23900.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[300.0, 2.0], [200.0, 17.0], [500.0, 1.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[600.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[700.0, 5.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[2000.0, 5.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[33700.0, 1.0], [33100.0, 1.0], [33400.0, 2.0], [34100.0, 1.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[8400.0, 1.0], [8900.0, 1.0], [9000.0, 1.0], [9700.0, 1.0], [24100.0, 1.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[300.0, 1.0], [200.0, 5.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[15600.0, 2.0], [15500.0, 1.0], [15800.0, 1.0], [16200.0, 1.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[2000.0, 10.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[2000.0, 5.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[4100.0, 1.0], [3400.0, 3.0], [3700.0, 1.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[14300.0, 1.0], [14700.0, 1.0], [14400.0, 1.0], [14500.0, 1.0], [14600.0, 1.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[2500.0, 5.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[2000.0, 5.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[11800.0, 1.0], [12400.0, 1.0], [12800.0, 1.0], [13800.0, 1.0], [27600.0, 1.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[3100.0, 1.0], [3300.0, 2.0], [3200.0, 2.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[900.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[300.0, 3.0], [1200.0, 1.0], [700.0, 2.0], [200.0, 11.0], [800.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[2100.0, 1.0], [2000.0, 4.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 4.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[300.0, 2.0], [700.0, 5.0], [200.0, 3.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[600.0, 1.0], [700.0, 4.0], [200.0, 5.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[300.0, 2.0], [200.0, 12.0], [400.0, 1.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 34100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 56.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 365.0, "series": [{"data": [[0.0, 365.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 61.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 56.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349228E12, "maxY": 5.0, "series": [{"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0], [1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.73349258E12, 3.269841269841271], [1.7334924E12, 5.0], [1.73349246E12, 4.987951807228916], [1.73349228E12, 2.6638655462184873], [1.73349234E12, 4.965116279069767], [1.73349264E12, 1.0], [1.73349252E12, 4.912087912087912]], "isOverall": false, "label": "Full Dry Run Flow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349264E12, "title": "Active Threads Over Time"}},
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
        fixTimeStamps(infos.data.result.series, 14400000);
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 34186.0, "series": [{"data": [[1.0, 0.0], [2.0, 2.0], [4.0, 1.0], [5.0, 1.0], [3.0, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[3.0, 0.8]], "isOverall": false, "label": "Invite user-0-Aggregated", "isController": false}, {"data": [[5.0, 1011.2]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[5.0, 1011.2]], "isOverall": false, "label": "WS open for sr link-Aggregated", "isController": false}, {"data": [[5.0, 350.1]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[5.0, 350.1]], "isOverall": false, "label": "Agree terms-Aggregated", "isController": false}, {"data": [[5.0, 891.8]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[5.0, 891.8]], "isOverall": false, "label": "Link SR profile-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [2.0, 1.0], [4.0, 1.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[3.0, 0.6]], "isOverall": false, "label": "Invite sr-0-Aggregated", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Link user profile-0-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [5.0, 1.25]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[4.8, 1.4]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[1.0, 260.0], [2.0, 239.5], [4.0, 248.5], [5.0, 246.0], [3.0, 236.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[3.0, 246.0]], "isOverall": false, "label": "Get Admin Access Token-Aggregated", "isController": false}, {"data": [[5.0, 1.3]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[5.0, 1.3]], "isOverall": false, "label": "Agree terms-0-Aggregated", "isController": false}, {"data": [[4.0, 298.0], [5.0, 263.75]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[4.8, 270.6]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[1.0, 418.0], [2.0, 286.0], [4.0, 313.0], [5.0, 347.0], [3.0, 341.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[3.0, 341.0]], "isOverall": false, "label": "Invite sr-Aggregated", "isController": false}, {"data": [[5.0, 2058.6]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[5.0, 2058.6]], "isOverall": false, "label": "Generate user keys-Aggregated", "isController": false}, {"data": [[2.0, 2070.0], [4.0, 2070.0], [5.0, 2074.0], [3.0, 2072.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[3.2, 2071.2]], "isOverall": false, "label": "Generate sr keys-Aggregated", "isController": false}, {"data": [[4.0, 260.0], [1.0, 437.0], [5.0, 295.0], [3.0, 379.5]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[3.2, 350.2]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [2.0, 1.0], [4.0, 0.0], [5.0, 0.8333333333333334], [3.0, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[4.0, 0.7]], "isOverall": false, "label": "Get Access Token-0-Aggregated", "isController": false}, {"data": [[4.0, 1070.0], [5.0, 1007.75]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[4.8, 1020.2]], "isOverall": false, "label": "WS open for policy import-Aggregated", "isController": false}, {"data": [[2.0, 0.5], [4.0, 1.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[3.2, 0.4]], "isOverall": false, "label": "Generate sr keys-0-Aggregated", "isController": false}, {"data": [[4.0, 8156.0], [2.0, 23913.0], [1.0, 8799.0], [5.0, 8695.0], [3.0, 9489.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[3.0, 11810.4]], "isOverall": false, "label": "Dry Run Policy-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept user-Aggregated", "isController": true}, {"data": [[5.0, 280.2]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[5.0, 280.2]], "isOverall": false, "label": "Get SR link result-Aggregated", "isController": false}, {"data": [[5.0, 269.4]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[5.0, 269.4]], "isOverall": false, "label": "Get User Access Token-Aggregated", "isController": false}, {"data": [[1.0, 553.0], [2.0, 536.0], [4.0, 592.0], [5.0, 561.0], [3.0, 563.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[3.0, 561.0]], "isOverall": false, "label": "Accept user-Aggregated", "isController": false}, {"data": [[5.0, 593.6]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[5.0, 593.6]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[5.0, 743.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[5.0, 743.0]], "isOverall": false, "label": "Get SR DID-Aggregated", "isController": false}, {"data": [[5.0, 272.8]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[5.0, 272.8]], "isOverall": false, "label": "Link user profile-Aggregated", "isController": false}, {"data": [[2.0, 2067.0], [4.0, 2052.0], [5.0, 2059.5], [3.0, 2064.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[3.8, 2060.4]], "isOverall": false, "label": "Get key gen result-Aggregated", "isController": false}, {"data": [[1.0, 357.0], [2.0, 247.0], [4.0, 260.0], [5.0, 277.0], [3.0, 258.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[3.0, 279.8]], "isOverall": false, "label": "Invite user-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [5.0, 1.0], [3.0, 2.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[4.4, 1.2]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [5.0, 1.5]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[4.8, 1.4]], "isOverall": false, "label": "WS open for policy import-0-Aggregated", "isController": false}, {"data": [[4.0, 34186.0], [5.0, 33451.75]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[4.8, 33598.6]], "isOverall": false, "label": "User creation flow-Aggregated", "isController": true}, {"data": [[1.0, 0.0], [2.0, 1.0], [4.0, 0.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[3.0, 0.2]], "isOverall": false, "label": "WS open for sr key gen-0-Aggregated", "isController": false}, {"data": [[4.0, 8414.0], [2.0, 24167.0], [1.0, 9049.0], [5.0, 8998.0], [3.0, 9729.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[3.0, 12071.4]], "isOverall": false, "label": "Requests for DryRun-Aggregated", "isController": true}, {"data": [[1.0, 1.0], [2.0, 2.0], [4.0, 1.0], [5.0, 1.0], [3.0, 2.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[3.0, 1.4]], "isOverall": false, "label": "WS open for sr key gen-Aggregated", "isController": false}, {"data": [[5.0, 283.66666666666663]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[5.0, 283.66666666666663]], "isOverall": false, "label": "Get user link result-Aggregated", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Generate user keys-0-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link user-Aggregated", "isController": true}, {"data": [[1.0, 1.0], [2.0, 1.0], [4.0, 0.5], [5.0, 1.0], [3.0, 0.5]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[3.0, 0.8]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[5.0, 15792.4]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[5.0, 15792.4]], "isOverall": false, "label": "User creation(SR side)-Aggregated", "isController": true}, {"data": [[1.0, 2062.0], [2.0, 2065.0], [4.0, 2065.0], [5.0, 2063.6666666666665], [3.0, 2066.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[4.0, 2064.0]], "isOverall": false, "label": "Get Access Token-Aggregated", "isController": false}, {"data": [[5.0, 2072.2]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[5.0, 2072.2]], "isOverall": false, "label": "Get user keys-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [1.0, 2.0], [5.0, 1.0], [3.0, 40.5]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[3.2, 17.0]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "WS open for user key gen-0-Aggregated", "isController": false}, {"data": [[4.0, 3460.0], [1.0, 3753.0], [5.0, 3435.0], [3.0, 3803.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[3.2, 3650.8]], "isOverall": false, "label": "Requests for Import-Aggregated", "isController": true}, {"data": [[4.0, 14652.0], [5.0, 14532.5]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[4.8, 14556.4]], "isOverall": false, "label": "User creation(user side)-Aggregated", "isController": true}, {"data": [[4.0, 1.0], [2.0, 2.0], [1.0, 1.0], [5.0, 2.166666666666667], [3.0, 1.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[4.1000000000000005, 1.75]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[1.0, 0.5], [2.0, 1.0], [4.0, 0.0], [5.0, 0.5], [3.0, 0.5]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[3.0, 0.5000000000000001]], "isOverall": false, "label": "Get Admin Access Token-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [2.0, 1.0], [4.0, 1.0], [5.0, 1.0], [3.0, 1.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Accept sr-0-Aggregated", "isController": false}, {"data": [[5.0, 3.3333333333333335]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[5.0, 3.3333333333333335]], "isOverall": false, "label": "Get user link result-0-Aggregated", "isController": false}, {"data": [[1.0, 2524.0], [2.0, 2512.0], [4.0, 2508.0], [5.0, 2503.0], [3.0, 2512.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[3.0, 2511.8]], "isOverall": false, "label": "Login by SR OS-Aggregated", "isController": false}, {"data": [[2.0, 2058.0], [4.0, 2060.0], [5.0, 2066.0], [3.0, 2058.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[3.8, 2061.6]], "isOverall": false, "label": "Get sr keys-Aggregated", "isController": false}, {"data": [[5.0, 1.8]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[5.0, 1.8]], "isOverall": false, "label": "WS open for user key gen-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [1.0, 1.0], [5.0, 1.2222222222222223], [3.0, 2.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[4.266666666666667, 1.2666666666666668]], "isOverall": false, "label": "Get SR Access Token-0-Aggregated", "isController": false}, {"data": [[4.0, 0.0], [5.0, 0.8888888888888888]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[4.9, 0.7999999999999999]], "isOverall": false, "label": "Verify link-0-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [2.0, 2.0], [1.0, 3.0], [5.0, 0.0], [3.0, 2.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[3.0, 1.6]], "isOverall": false, "label": "Dry Run Policy-0-Aggregated", "isController": false}, {"data": [[4.0, 11874.0], [2.0, 27628.0], [1.0, 12802.0], [5.0, 12433.0], [3.0, 13874.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[3.0, 15722.2]], "isOverall": false, "label": "Policy import and dry run-Aggregated", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept SR-Aggregated", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link SR-Aggregated", "isController": true}, {"data": [[2.0, 1.0], [4.0, 0.0], [5.0, 0.0], [3.0, 1.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[3.8, 0.4]], "isOverall": false, "label": "Get key gen result-0-Aggregated", "isController": false}, {"data": [[1.0, 555.0], [2.0, 590.0], [4.0, 592.0], [5.0, 589.0], [3.0, 584.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[3.0, 582.0]], "isOverall": false, "label": "Accept sr-Aggregated", "isController": false}, {"data": [[1.0, 3396.0], [2.0, 3103.0], [4.0, 3219.0], [5.0, 3300.0], [3.0, 3231.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[3.0, 3249.8]], "isOverall": false, "label": "User creation(admin side)-Aggregated", "isController": true}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Login by user OS-0-Aggregated", "isController": false}, {"data": [[5.0, 940.4]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[5.0, 940.4]], "isOverall": false, "label": "WS open for user link-Aggregated", "isController": false}, {"data": [[4.0, 265.0], [2.0, 260.0], [1.0, 252.0], [5.0, 408.8333333333333], [3.0, 602.4]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[4.1000000000000005, 434.75]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "WS open for sr link-0-Aggregated", "isController": false}, {"data": [[5.0, 2.2]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[5.0, 2.2]], "isOverall": false, "label": "WS open for user link-0-Aggregated", "isController": false}, {"data": [[5.0, 2075.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[5.0, 2075.0]], "isOverall": false, "label": "Get user key gen result-Aggregated", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Get User Access Token-0-Aggregated", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "Link SR profile-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [2.0, 1.0], [4.0, 1.0], [5.0, 1.0], [3.0, 1.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Accept user-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [4.0, 1.0], [5.0, 0.5], [3.0, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[3.8, 0.6]], "isOverall": false, "label": "Get sr keys-0-Aggregated", "isController": false}, {"data": [[5.0, 2509.4]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[5.0, 2509.4]], "isOverall": false, "label": "Login by user OS-Aggregated", "isController": false}, {"data": [[5.0, 1.1999999999999997]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[5.0, 1.1999999999999997]], "isOverall": false, "label": "Get SR link result-0-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate user hedera data-Aggregated", "isController": true}, {"data": [[4.0, 316.0], [5.0, 534.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[4.9, 512.2]], "isOverall": false, "label": "Verify link-Aggregated", "isController": false}, {"data": [[1.0, 496.5], [2.0, 482.5], [4.0, 482.5], [5.0, 517.0], [3.0, 506.5]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[3.0, 496.9999999999999]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[4.0, 276.3333333333333], [1.0, 250.0], [5.0, 296.7777777777777], [3.0, 247.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[4.266666666666667, 282.9333333333334]], "isOverall": false, "label": "Get SR Access Token-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate sr hedera data-Aggregated", "isController": true}, {"data": [[4.0, 569.0], [5.0, 577.0], [3.0, 562.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[4.4, 572.4]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Get user key gen result-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 1.0], [4.0, 1.0], [5.0, 1.0], [3.0, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[3.0, 0.6]], "isOverall": false, "label": "Login by SR OS-0-Aggregated", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Get SR DID-0-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get user keys-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 13.45, "minX": 1.73349228E12, "maxY": 27219.783333333333, "series": [{"data": [[1.73349258E12, 19955.2], [1.7334924E12, 15275.966666666667], [1.73349246E12, 22014.116666666665], [1.73349228E12, 18257.6], [1.73349234E12, 14473.366666666667], [1.73349264E12, 868.55], [1.73349252E12, 27219.783333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73349258E12, 394.53333333333336], [1.7334924E12, 445.4166666666667], [1.73349246E12, 473.05], [1.73349228E12, 672.3666666666667], [1.73349234E12, 470.3666666666667], [1.73349264E12, 13.45], [1.73349252E12, 530.9]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349264E12, "title": "Bytes Throughput Over Time"}},
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
        fixTimeStamps(infos.data.result.series, 14400000);
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
        data: {"result": {"minY": 0.0, "minX": 1.73349228E12, "maxY": 33796.0, "series": [{"data": [[1.73349228E12, 0.75], [1.73349234E12, 1.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7334924E12, 917.0], [1.73349234E12, 1034.75]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73349246E12, 338.25], [1.73349234E12, 375.0], [1.73349252E12, 273.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7334924E12, 1135.0], [1.73349234E12, 729.6666666666666]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73349228E12, 0.75], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73349246E12, 1.0], [1.73349252E12, 1.25]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73349258E12, 2.0], [1.73349252E12, 1.25]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73349228E12, 246.0], [1.73349234E12, 246.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73349246E12, 1.0], [1.73349234E12, 1.4], [1.73349252E12, 2.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73349258E12, 298.0], [1.73349252E12, 263.75]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73349228E12, 339.5], [1.73349234E12, 347.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7334924E12, 2058.5], [1.73349246E12, 2058.6666666666665]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73349228E12, 2070.6666666666665], [1.73349234E12, 2072.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73349258E12, 350.2]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.7334924E12, 1.0], [1.73349246E12, 1.0], [1.73349228E12, 0.5], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73349258E12, 1070.0], [1.73349252E12, 1007.75]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73349228E12, 0.33333333333333337], [1.73349234E12, 0.5]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73349258E12, 12563.25], [1.73349264E12, 8799.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.7334924E12, 285.3125], [1.73349246E12, 269.0], [1.73349234E12, 256.6666666666667]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73349246E12, 269.4]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73349228E12, 561.0], [1.73349234E12, 561.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73349246E12, 593.6]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73349246E12, 736.0], [1.73349252E12, 747.6666666666666]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73349246E12, 267.0], [1.73349252E12, 274.25]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73349228E12, 2061.0], [1.73349234E12, 2059.5]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73349228E12, 280.5], [1.73349234E12, 277.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73349228E12, 1.5], [1.73349234E12, 1.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73349258E12, 1.0], [1.73349252E12, 1.5]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73349228E12, 33796.0], [1.73349234E12, 33549.25]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349228E12, 0.25], [1.73349234E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73349258E12, 12827.0], [1.73349264E12, 9049.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73349228E12, 1.5], [1.73349234E12, 1.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73349252E12, 283.66666666666663]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.7334924E12, 0.5], [1.73349246E12, 0.3333333333333333]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349228E12, 0.75], [1.73349234E12, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73349228E12, 15602.0], [1.73349234E12, 15919.333333333334]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7334924E12, 2066.5], [1.73349246E12, 2064.0], [1.73349228E12, 2064.5], [1.73349234E12, 2057.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.7334924E12, 2069.0], [1.73349246E12, 2074.3333333333335]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73349258E12, 17.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.7334924E12, 0.5], [1.73349246E12, 0.6666666666666666]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73349258E12, 3753.0], [1.73349252E12, 3625.25]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.7334924E12, 14636.0], [1.73349246E12, 14503.333333333334]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73349258E12, 2.2], [1.73349252E12, 1.3]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73349228E12, 0.5000000000000001], [1.73349234E12, 0.5]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73349228E12, 1.0], [1.73349234E12, 1.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73349252E12, 3.3333333333333335]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73349228E12, 2514.0], [1.73349234E12, 2503.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349228E12, 2058.6666666666665], [1.73349234E12, 2066.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.7334924E12, 1.5], [1.73349246E12, 2.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73349258E12, 1.3333333333333333], [1.73349228E12, 1.0], [1.73349234E12, 1.25], [1.73349252E12, 1.25]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.7334924E12, 0.6666666666666666], [1.73349246E12, 1.0], [1.73349252E12, 1.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73349258E12, 1.25], [1.73349264E12, 3.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73349258E12, 20215.0], [1.73349252E12, 12727.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73349228E12, 0.6666666666666667], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73349228E12, 580.25], [1.73349234E12, 589.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73349228E12, 3237.25], [1.73349234E12, 3300.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.7334924E12, 0.33333333333333337], [1.73349246E12, 1.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73349246E12, 956.6666666666666], [1.73349252E12, 916.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73349258E12, 506.7], [1.73349252E12, 362.8]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7334924E12, 1.0], [1.73349234E12, 0.25]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73349246E12, 2.3333333333333335], [1.73349252E12, 2.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.7334924E12, 2091.5], [1.73349246E12, 2064.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73349246E12, 1.2]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73349246E12, 1.2]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7334924E12, 1.0], [1.73349234E12, 0.6666666666666667]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73349228E12, 1.0], [1.73349234E12, 1.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73349228E12, 0.6666666666666666], [1.73349234E12, 0.5]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7334924E12, 2512.3333333333335], [1.73349246E12, 2505.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.7334924E12, 1.125], [1.73349246E12, 4.0], [1.73349234E12, 0.6666666666666666]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73349258E12, 316.0], [1.7334924E12, 746.6666666666666], [1.73349246E12, 717.0], [1.73349252E12, 283.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349228E12, 491.99999999999994], [1.73349234E12, 517.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73349258E12, 268.5], [1.73349228E12, 265.0], [1.73349234E12, 330.0], [1.73349252E12, 262.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73349228E12, 565.5], [1.73349234E12, 577.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.6666666666666666]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73349228E12, 0.5], [1.73349234E12, 1.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73349246E12, 1.0], [1.73349252E12, 1.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 1.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349264E12, "title": "Response Time Over Time"}},
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
        fixTimeStamps(infos.data.result.series, 14400000);
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
        data: {"result": {"minY": 0.0, "minX": 1.73349228E12, "maxY": 12298.75, "series": [{"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73349246E12, 337.25], [1.73349234E12, 373.6], [1.73349252E12, 271.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7334924E12, 1133.5], [1.73349234E12, 729.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73349228E12, 245.25], [1.73349234E12, 245.5]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349234E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73349258E12, 295.0], [1.73349252E12, 262.25]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73349228E12, 338.75], [1.73349234E12, 346.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7334924E12, 2057.5], [1.73349246E12, 2057.3333333333335]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73349228E12, 2069.6666666666665], [1.73349234E12, 2071.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73349258E12, 332.8]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0], [1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73349258E12, 12298.75], [1.73349264E12, 8555.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.7334924E12, 283.875], [1.73349246E12, 265.0], [1.73349234E12, 256.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73349246E12, 267.8]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73349228E12, 559.75], [1.73349234E12, 560.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73349246E12, 592.4]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73349246E12, 735.0], [1.73349252E12, 746.3333333333334]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73349246E12, 266.0], [1.73349252E12, 272.5]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73349228E12, 2060.3333333333335], [1.73349234E12, 2059.5]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73349228E12, 279.75], [1.73349234E12, 276.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349264E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73349252E12, 280.16666666666663]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7334924E12, 2065.5], [1.73349246E12, 2063.0], [1.73349228E12, 2063.75], [1.73349234E12, 2057.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.7334924E12, 2069.0], [1.73349246E12, 2073.3333333333335]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73349258E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73349258E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73349252E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73349228E12, 2513.5], [1.73349234E12, 2502.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349228E12, 2057.6666666666665], [1.73349234E12, 2065.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349228E12, 0.0], [1.73349234E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.7334924E12, 0.0], [1.73349246E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349264E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73349228E12, 579.25], [1.73349234E12, 588.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73349258E12, 504.1], [1.73349252E12, 360.9]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.7334924E12, 2091.5], [1.73349246E12, 2063.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73349246E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73349246E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7334924E12, 2512.0], [1.73349246E12, 2504.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73349258E12, 315.0], [1.7334924E12, 745.6666666666666], [1.73349246E12, 715.5], [1.73349252E12, 281.75]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349228E12, 491.25], [1.73349234E12, 516.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73349258E12, 267.1666666666667], [1.73349228E12, 264.0], [1.73349234E12, 328.5], [1.73349252E12, 260.5]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73349228E12, 564.0], [1.73349234E12, 576.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349264E12, "title": "Latencies Over Time"}},
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
        fixTimeStamps(infos.data.result.series, 14400000);
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
        data: {"result": {"minY": 0.0, "minX": 1.73349228E12, "maxY": 24448.5, "series": [{"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7334924E12, 916.0], [1.73349234E12, 1034.25]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349234E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7334924E12, 718.0], [1.73349234E12, 479.6666666666667]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349234E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7334924E12, 2033.5], [1.73349246E12, 2039.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73349228E12, 2045.6666666666667], [1.73349234E12, 2049.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73349258E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0], [1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73349258E12, 1068.0], [1.73349252E12, 1006.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349264E12, 0.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73349246E12, 0.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73349246E12, 0.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73349246E12, 477.0], [1.73349252E12, 489.6666666666667]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73349228E12, 2041.0], [1.73349234E12, 2040.5]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73349228E12, 24310.0], [1.73349234E12, 24448.5]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349264E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73349228E12, 1.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73349252E12, 0.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73349228E12, 12207.0], [1.73349234E12, 12328.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7334924E12, 2044.5], [1.73349246E12, 2040.0], [1.73349228E12, 2042.0], [1.73349234E12, 2035.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.7334924E12, 2050.0], [1.73349246E12, 2053.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73349258E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73349258E12, 1644.0], [1.73349252E12, 1591.5]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.7334924E12, 11665.5], [1.73349246E12, 11631.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73349258E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73349252E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73349228E12, 2040.75], [1.73349234E12, 2036.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349228E12, 2040.0], [1.73349234E12, 2045.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.7334924E12, 0.5], [1.73349246E12, 1.3333333333333333]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349228E12, 0.0], [1.73349234E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.7334924E12, 0.0], [1.73349246E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349264E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73349258E12, 1536.5], [1.73349252E12, 1645.6666666666667]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73349228E12, 483.25], [1.73349234E12, 549.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73349246E12, 954.3333333333334], [1.73349252E12, 914.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73349258E12, 195.5], [1.73349252E12, 96.29999999999998]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.7334924E12, 2047.0], [1.73349246E12, 2044.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73349246E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73349246E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7334924E12, 2047.6666666666667], [1.73349246E12, 2042.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73349258E12, 0.0], [1.7334924E12, 489.6666666666667], [1.73349246E12, 473.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349228E12, 241.62500000000003], [1.73349234E12, 274.5]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.73349228E12, 0.0], [1.73349234E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73349228E12, 0.0], [1.73349234E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73349246E12, 0.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.7334924E12, 0.0], [1.73349246E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349264E12, "title": "Connect Time Over Time"}},
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
        fixTimeStamps(infos.data.result.series, 14400000);
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
        data: {"result": {"minY": 0.0, "minX": 1.73349228E12, "maxY": 23913.0, "series": [{"data": [[1.73349258E12, 23913.0], [1.7334924E12, 2522.0], [1.73349246E12, 2518.0], [1.73349228E12, 2524.0], [1.73349234E12, 2503.0], [1.73349264E12, 8799.0], [1.73349252E12, 1152.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73349258E12, 1128.2000000000007], [1.7334924E12, 2069.3], [1.73349246E12, 2062.9], [1.73349228E12, 2064.7], [1.73349234E12, 2057.1], [1.73349264E12, 8799.0], [1.73349252E12, 752.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73349258E12, 23913.0], [1.7334924E12, 2522.0], [1.73349246E12, 2518.0], [1.73349228E12, 2522.44], [1.73349234E12, 2503.0], [1.73349264E12, 8799.0], [1.73349252E12, 1152.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73349258E12, 8814.099999999999], [1.7334924E12, 2291.900000000001], [1.73349246E12, 2071.95], [1.73349228E12, 2071.35], [1.73349234E12, 2067.15], [1.73349264E12, 8799.0], [1.73349252E12, 924.75]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73349258E12, 0.0], [1.7334924E12, 0.0], [1.73349246E12, 0.0], [1.73349228E12, 0.0], [1.73349234E12, 0.0], [1.73349264E12, 3.0], [1.73349252E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73349258E12, 159.5], [1.7334924E12, 2.5], [1.73349246E12, 3.0], [1.73349228E12, 2.0], [1.73349234E12, 2.5], [1.73349264E12, 4401.0], [1.73349252E12, 125.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349264E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
        fixTimeStamps(infos.data.result.series, 14400000);
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
    data: {"result": {"minY": 2.0, "minX": 2.0, "maxY": 129.5, "series": [{"data": [[4.0, 3.5], [8.0, 2.5], [2.0, 124.5], [10.0, 129.5], [6.0, 2.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 128.5, "series": [{"data": [[4.0, 0.0], [8.0, 0.0], [2.0, 0.0], [10.0, 128.5], [6.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73349228E12, "maxY": 1.8833333333333333, "series": [{"data": [[1.73349258E12, 0.9333333333333333], [1.7334924E12, 1.1833333333333333], [1.73349246E12, 1.3], [1.73349228E12, 1.8833333333333333], [1.73349234E12, 1.3], [1.73349264E12, 0.016666666666666666], [1.73349252E12, 1.4166666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349264E12, "title": "Hits Per Second"}},
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
        fixTimeStamps(infos.data.result.series, 14400000);
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73349228E12, "maxY": 1.4, "series": [{"data": [[1.73349258E12, 0.8], [1.7334924E12, 1.0166666666666666], [1.73349246E12, 1.0333333333333334], [1.73349228E12, 1.4], [1.73349234E12, 0.9833333333333333], [1.73349264E12, 0.03333333333333333], [1.73349252E12, 1.1]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.73349258E12, 0.016666666666666666], [1.7334924E12, 0.05], [1.73349246E12, 0.1], [1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.08333333333333333], [1.73349252E12, 0.1]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.73349258E12, 0.1], [1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.13333333333333333], [1.73349228E12, 0.35], [1.73349234E12, 0.15], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.73349258E12, 0.016666666666666666], [1.7334924E12, 0.06666666666666667], [1.73349246E12, 0.06666666666666667], [1.73349228E12, 0.05], [1.73349234E12, 0.08333333333333333], [1.73349252E12, 0.13333333333333333]], "isOverall": false, "label": "202", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349264E12, "title": "Codes Per Second"}},
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
        fixTimeStamps(infos.data.result.series, 14400000);
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73349228E12, "maxY": 0.26666666666666666, "series": [{"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05]], "isOverall": false, "label": "Link user-success", "isController": true}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05]], "isOverall": false, "label": "Get user key gen result-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Accept sr-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Invite and accept user-success", "isController": true}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Accept sr-0-success", "isController": false}, {"data": [[1.73349228E12, 0.13333333333333333], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Get Admin Access Token-success", "isController": false}, {"data": [[1.73349228E12, 0.05], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Get key gen result-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Login by SR OS-0-success", "isController": false}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05], [1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Get Access Token-0-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Accept user-success", "isController": false}, {"data": [[1.73349258E12, 0.016666666666666666], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for policy import-0-success", "isController": false}, {"data": [[1.73349228E12, 0.03333333333333333], [1.73349234E12, 0.05]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05]], "isOverall": false, "label": "WS open for user key gen-success", "isController": false}, {"data": [[1.73349246E12, 0.08333333333333333]], "isOverall": false, "label": "Get User Access Token-0-success", "isController": false}, {"data": [[1.73349258E12, 0.16666666666666666], [1.73349252E12, 0.16666666666666666]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Invite user-0-success", "isController": false}, {"data": [[1.73349228E12, 0.05], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Get sr keys-success", "isController": false}, {"data": [[1.73349228E12, 0.05], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Link SR-success", "isController": true}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05]], "isOverall": false, "label": "WS open for user key gen-0-success", "isController": false}, {"data": [[1.73349258E12, 0.016666666666666666], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.73349252E12, 0.1]], "isOverall": false, "label": "Get user link result-0-success", "isController": false}, {"data": [[1.73349246E12, 0.08333333333333333]], "isOverall": false, "label": "Get User Access Token-success", "isController": false}, {"data": [[1.73349246E12, 0.08333333333333333]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.73349246E12, 0.016666666666666666], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "Link user profile-0-success", "isController": false}, {"data": [[1.73349258E12, 0.03333333333333333], [1.73349252E12, 0.05]], "isOverall": false, "label": "Policy import and dry run-success", "isController": true}, {"data": [[1.73349228E12, 0.13333333333333333], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Get Admin Access Token-0-success", "isController": false}, {"data": [[1.73349246E12, 0.06666666666666667], [1.73349234E12, 0.08333333333333333], [1.73349252E12, 0.016666666666666666]], "isOverall": false, "label": "Agree terms-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "User creation(admin side)-success", "isController": true}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05], [1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Get Access Token-success", "isController": false}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05]], "isOverall": false, "label": "Get user keys-0-success", "isController": false}, {"data": [[1.73349258E12, 0.016666666666666666], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.73349258E12, 0.016666666666666666], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "Requests for Import-success", "isController": true}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Invite and accept SR-success", "isController": true}, {"data": [[1.73349252E12, 0.1]], "isOverall": false, "label": "Get user link result-success", "isController": false}, {"data": [[1.73349228E12, 0.13333333333333333], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.7334924E12, 0.016666666666666666], [1.73349234E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for sr link-0-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Login by SR OS-success", "isController": false}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05]], "isOverall": false, "label": "Get user keys-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Generate sr hedera data-success", "isController": true}, {"data": [[1.73349228E12, 0.05], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Get key gen result-0-success", "isController": false}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05]], "isOverall": false, "label": "User creation(user side)-success", "isController": true}, {"data": [[1.73349258E12, 0.08333333333333333]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.73349258E12, 0.06666666666666667], [1.73349264E12, 0.016666666666666666]], "isOverall": false, "label": "Requests for DryRun-success", "isController": true}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Accept user-0-success", "isController": false}, {"data": [[1.73349258E12, 0.016666666666666666], [1.7334924E12, 0.05], [1.73349246E12, 0.03333333333333333], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "Verify link-success", "isController": false}, {"data": [[1.73349246E12, 0.06666666666666667], [1.73349234E12, 0.08333333333333333], [1.73349252E12, 0.016666666666666666]], "isOverall": false, "label": "Agree terms-0-success", "isController": false}, {"data": [[1.73349228E12, 0.13333333333333333], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.73349228E12, 0.05], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Get sr keys-0-success", "isController": false}, {"data": [[1.73349246E12, 0.03333333333333333], [1.73349252E12, 0.05]], "isOverall": false, "label": "Get SR DID-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Invite user-success", "isController": false}, {"data": [[1.73349258E12, 0.16666666666666666], [1.73349252E12, 0.16666666666666666]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349234E12, 0.05]], "isOverall": false, "label": "Link SR profile-0-success", "isController": false}, {"data": [[1.7334924E12, 0.05], [1.73349246E12, 0.03333333333333333]], "isOverall": false, "label": "Generate user hedera data-success", "isController": true}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for sr key gen-success", "isController": false}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05]], "isOverall": false, "label": "Generate user keys-0-success", "isController": false}, {"data": [[1.73349228E12, 0.05], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Generate sr keys-0-success", "isController": false}, {"data": [[1.7334924E12, 0.26666666666666666], [1.73349246E12, 0.016666666666666666], [1.73349234E12, 0.05]], "isOverall": false, "label": "Get SR link result-0-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Invite sr-0-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for sr key gen-0-success", "isController": false}, {"data": [[1.73349228E12, 0.03333333333333333], [1.73349234E12, 0.05]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.7334924E12, 0.26666666666666666], [1.73349246E12, 0.016666666666666666], [1.73349234E12, 0.05]], "isOverall": false, "label": "Get SR link result-success", "isController": false}, {"data": [[1.73349258E12, 0.08333333333333333]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.7334924E12, 0.05], [1.73349246E12, 0.03333333333333333]], "isOverall": false, "label": "Login by user OS-success", "isController": false}, {"data": [[1.73349246E12, 0.05], [1.73349252E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for user link-0-success", "isController": false}, {"data": [[1.73349246E12, 0.03333333333333333], [1.73349252E12, 0.05]], "isOverall": false, "label": "Get SR DID-0-success", "isController": false}, {"data": [[1.73349246E12, 0.08333333333333333]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.73349258E12, 0.06666666666666667], [1.73349264E12, 0.016666666666666666]], "isOverall": false, "label": "Dry Run Policy-success", "isController": false}, {"data": [[1.73349228E12, 0.016666666666666666], [1.73349234E12, 0.06666666666666667]], "isOverall": false, "label": "User creation flow-success", "isController": true}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05]], "isOverall": false, "label": "Generate user keys-success", "isController": false}, {"data": [[1.73349258E12, 0.1], [1.73349228E12, 0.016666666666666666], [1.73349234E12, 0.06666666666666667], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "Get SR Access Token-0-success", "isController": false}, {"data": [[1.73349246E12, 0.05], [1.73349252E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for user link-success", "isController": false}, {"data": [[1.7334924E12, 0.016666666666666666], [1.73349234E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for sr link-success", "isController": false}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349246E12, 0.05]], "isOverall": false, "label": "Get user key gen result-0-success", "isController": false}, {"data": [[1.73349228E12, 0.06666666666666667], [1.73349234E12, 0.016666666666666666]], "isOverall": false, "label": "Invite sr-success", "isController": false}, {"data": [[1.73349258E12, 0.1], [1.73349228E12, 0.016666666666666666], [1.73349234E12, 0.06666666666666667], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "Get SR Access Token-success", "isController": false}, {"data": [[1.73349228E12, 0.03333333333333333], [1.73349234E12, 0.05]], "isOverall": false, "label": "User creation(SR side)-success", "isController": true}, {"data": [[1.73349258E12, 0.016666666666666666], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for policy import-success", "isController": false}, {"data": [[1.73349228E12, 0.05], [1.73349234E12, 0.03333333333333333]], "isOverall": false, "label": "Generate sr keys-success", "isController": false}, {"data": [[1.7334924E12, 0.05], [1.73349246E12, 0.03333333333333333]], "isOverall": false, "label": "Login by user OS-0-success", "isController": false}, {"data": [[1.73349246E12, 0.016666666666666666], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "Link user profile-success", "isController": false}, {"data": [[1.73349258E12, 0.016666666666666666], [1.7334924E12, 0.05], [1.73349246E12, 0.03333333333333333], [1.73349252E12, 0.06666666666666667]], "isOverall": false, "label": "Verify link-0-success", "isController": false}, {"data": [[1.73349258E12, 0.06666666666666667], [1.73349264E12, 0.016666666666666666]], "isOverall": false, "label": "Dry Run Policy-0-success", "isController": false}, {"data": [[1.7334924E12, 0.03333333333333333], [1.73349234E12, 0.05]], "isOverall": false, "label": "Link SR profile-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349264E12, "title": "Transactions Per Second"}},
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
        fixTimeStamps(infos.data.result.series, 14400000);
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
        data: {"result": {"minY": 0.05, "minX": 1.73349228E12, "maxY": 2.2333333333333334, "series": [{"data": [[1.73349258E12, 1.05], [1.7334924E12, 1.2833333333333334], [1.73349246E12, 1.4666666666666666], [1.73349228E12, 2.2333333333333334], [1.73349234E12, 1.5166666666666666], [1.73349264E12, 0.05], [1.73349252E12, 1.5166666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349264E12, "title": "Total Transactions Per Second"}},
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
        fixTimeStamps(infos.data.result.series, 14400000);
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
