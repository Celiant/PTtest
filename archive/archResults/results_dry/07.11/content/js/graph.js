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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 21.0, "series": [{"data": [[0.0, 3.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[800.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[700.0, 2.0], [400.0, 2.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[600.0, 3.0], [1200.0, 1.0], [300.0, 1.0], [700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[600.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[700.0, 1.0], [400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[2000.0, 3.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[2000.0, 3.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[800.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[38500.0, 1.0], [39900.0, 1.0], [41600.0, 1.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[300.0, 3.0], [600.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [800.0, 3.0], [400.0, 2.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1000.0, 3.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1100.0, 1.0], [5700.0, 1.0], [7000.0, 1.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[300.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[2000.0, 3.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[40500.0, 1.0], [51000.0, 1.0], [52100.0, 1.0], [6900.0, 1.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[40600.0, 1.0], [39100.0, 1.0], [42200.0, 1.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[800.0, 1.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[18400.0, 1.0], [18900.0, 1.0], [24900.0, 1.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[2000.0, 6.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[2000.0, 3.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[9500.0, 1.0], [7500.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[22000.0, 1.0], [22600.0, 1.0], [16100.0, 1.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[2400.0, 3.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[2000.0, 3.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[47000.0, 1.0], [50200.0, 1.0], [49700.0, 1.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1200.0, 1.0], [6100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[0.0, 1.0], [10500.0, 1.0], [5900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[800.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1100.0, 2.0], [300.0, 2.0], [600.0, 3.0], [700.0, 3.0], [800.0, 5.0], [400.0, 4.0], [900.0, 2.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[2000.0, 3.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[2400.0, 3.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[600.0, 1.0], [300.0, 1.0], [1400.0, 1.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1100.0, 3.0], [300.0, 2.0], [700.0, 1.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[7100.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 52100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 40.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 188.0, "series": [{"data": [[0.0, 188.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 82.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 40.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7309898E12, "maxY": 3.0, "series": [{"data": [[1.73098992E12, 0.0], [1.7309898E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.7309898E12, 1.0]], "isOverall": false, "label": "Tenant creation", "isController": false}, {"data": [[1.73098986E12, 2.90625], [1.73099004E12, 2.4166666666666665], [1.73098992E12, 3.0], [1.7309898E12, 2.425287356321839], [1.73098998E12, 2.9423076923076916]], "isOverall": false, "label": "Users creation", "isController": false}, {"data": [[1.73099016E12, 2.9411764705882355], [1.73099004E12, 1.0], [1.73099022E12, 1.5], [1.7309901E12, 2.6976744186046506]], "isOverall": false, "label": "Policy workflow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73099022E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 51054.0, "series": [{"data": [[1.0, 1.0], [2.0, 0.0], [3.0, 1.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[2.0, 0.6666666666666666]], "isOverall": false, "label": "Invite user-0-Aggregated", "isController": false}, {"data": [[3.0, 923.6666666666666]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[3.0, 923.6666666666666]], "isOverall": false, "label": "WS open for sr link-Aggregated", "isController": false}, {"data": [[3.0, 719.6666666666667]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[3.0, 719.6666666666667]], "isOverall": false, "label": "Agree terms-Aggregated", "isController": false}, {"data": [[3.0, 964.3333333333334]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[3.0, 964.3333333333334]], "isOverall": false, "label": "Link SR profile-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [2.0, 1.0], [3.0, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[2.0, 0.6666666666666667]], "isOverall": false, "label": "Invite sr-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [3.0, 0.5]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[2.6666666666666665, 0.6666666666666667]], "isOverall": false, "label": "Link user profile-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 1.0], [3.0, 1.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[2.0, 0.6666666666666666]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[1.0, 854.6666666666666], [2.0, 832.0], [3.0, 529.5]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.857142857142857, 755.2857142857143]], "isOverall": false, "label": "Get Admin Access Token-Aggregated", "isController": false}, {"data": [[3.0, 0.6666666666666666]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[3.0, 0.6666666666666666]], "isOverall": false, "label": "Agree terms-0-Aggregated", "isController": false}, {"data": [[1.0, 667.0], [2.0, 1020.0], [3.0, 581.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[2.0, 756.0]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[1.0, 1067.0], [2.0, 752.0], [3.0, 457.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[2.0, 758.6666666666666]], "isOverall": false, "label": "Invite sr-Aggregated", "isController": false}, {"data": [[3.0, 2043.3333333333333]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[3.0, 2043.3333333333333]], "isOverall": false, "label": "Generate user keys-Aggregated", "isController": false}, {"data": [[2.0, 2054.0], [3.0, 2049.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[2.6666666666666665, 2050.6666666666665]], "isOverall": false, "label": "Generate sr keys-Aggregated", "isController": false}, {"data": [[3.0, 513.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[3.0, 513.0]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [3.0, 0.4]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[2.833333333333333, 0.33333333333333337]], "isOverall": false, "label": "Get Access Token-0-Aggregated", "isController": false}, {"data": [[1.0, 876.0], [2.0, 904.0], [3.0, 904.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[2.0, 894.6666666666666]], "isOverall": false, "label": "WS open for policy import-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [3.0, 0.5]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[2.6666666666666665, 0.33333333333333337]], "isOverall": false, "label": "Generate sr keys-0-Aggregated", "isController": false}, {"data": [[2.0, 41610.0], [1.0, 38599.0], [3.0, 39901.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[2.0, 40036.666666666664]], "isOverall": false, "label": "Dry Run Policy-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept user-Aggregated", "isController": true}, {"data": [[3.0, 708.0666666666666]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[3.0, 708.0666666666666]], "isOverall": false, "label": "Get SR link result-Aggregated", "isController": false}, {"data": [[3.0, 546.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[3.0, 546.0]], "isOverall": false, "label": "Get User Access Token-Aggregated", "isController": false}, {"data": [[1.0, 1083.0], [3.0, 1039.5]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[2.3333333333333335, 1054.0]], "isOverall": false, "label": "Accept user-Aggregated", "isController": false}, {"data": [[3.0, 4660.666666666667]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[3.0, 4660.666666666667]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[3.0, 646.6666666666666]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[3.0, 646.6666666666666]], "isOverall": false, "label": "Get SR DID-Aggregated", "isController": false}, {"data": [[2.0, 534.0], [3.0, 347.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[2.6666666666666665, 409.3333333333333]], "isOverall": false, "label": "Link user profile-Aggregated", "isController": false}, {"data": [[2.0, 2037.0], [3.0, 2041.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[2.6666666666666665, 2039.6666666666667]], "isOverall": false, "label": "Get key gen result-Aggregated", "isController": false}, {"data": [[1.0, 623.0], [2.0, 981.0], [3.0, 403.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[2.0, 669.0]], "isOverall": false, "label": "Invite user-Aggregated", "isController": false}, {"data": [[3.0, 1.3333333333333333]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[3.0, 1.3333333333333333]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 8.0], [3.0, 1.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[2.0, 3.0]], "isOverall": false, "label": "WS open for policy import-0-Aggregated", "isController": false}, {"data": [[1.0, 29534.5], [2.0, 51054.0], [3.0, 40571.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.75, 37673.5]], "isOverall": false, "label": "User creation flow-Aggregated", "isController": true}, {"data": [[1.0, 2018.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.0, 2018.0]], "isOverall": false, "label": "Setup ipfs-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [3.0, 0.5]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[2.6666666666666665, 0.6666666666666667]], "isOverall": false, "label": "WS open for sr key gen-0-Aggregated", "isController": false}, {"data": [[2.0, 42200.0], [1.0, 39197.0], [3.0, 40653.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[2.0, 40683.333333333336]], "isOverall": false, "label": "Requests for DryRun-Aggregated", "isController": true}, {"data": [[2.0, 2.0], [3.0, 1.5]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[2.6666666666666665, 1.6666666666666667]], "isOverall": false, "label": "WS open for sr key gen-Aggregated", "isController": false}, {"data": [[2.0, 615.6666666666666], [3.0, 505.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[2.25, 588.0]], "isOverall": false, "label": "Get user link result-Aggregated", "isController": false}, {"data": [[3.0, 0.6666666666666666]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[3.0, 0.6666666666666666]], "isOverall": false, "label": "Generate user keys-0-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link user-Aggregated", "isController": true}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[3.0, 20754.333333333332]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[3.0, 20754.333333333332]], "isOverall": false, "label": "User creation(SR side)-Aggregated", "isController": true}, {"data": [[2.0, 2052.0], [3.0, 2042.8]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[2.833333333333333, 2044.3333333333335]], "isOverall": false, "label": "Get Access Token-Aggregated", "isController": false}, {"data": [[3.0, 2044.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[3.0, 2044.0]], "isOverall": false, "label": "Get user keys-Aggregated", "isController": false}, {"data": [[3.0, 1.3333333333333333]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[3.0, 1.3333333333333333]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[3.0, 0.3333333333333333]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[3.0, 0.3333333333333333]], "isOverall": false, "label": "WS open for user key gen-0-Aggregated", "isController": false}, {"data": [[3.0, 8325.666666666666]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[3.0, 8325.666666666666]], "isOverall": false, "label": "Requests for Import-Aggregated", "isController": true}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Setup ipfs-0-Aggregated", "isController": false}, {"data": [[2.0, 22067.0], [1.0, 22686.0], [3.0, 16178.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[2.0, 20310.333333333332]], "isOverall": false, "label": "User creation(user side)-Aggregated", "isController": true}, {"data": [[2.0, 1.0], [3.0, 1.3500000000000005]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[2.9523809523809526, 1.3333333333333337]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [2.0, 1.0], [3.0, 0.5]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.857142857142857, 0.8571428571428572]], "isOverall": false, "label": "Get Admin Access Token-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [2.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[2.0, 0.33333333333333337]], "isOverall": false, "label": "Accept sr-0-Aggregated", "isController": false}, {"data": [[2.0, 1.3333333333333333], [3.0, 2.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[2.25, 1.5]], "isOverall": false, "label": "Get user link result-0-Aggregated", "isController": false}, {"data": [[1.0, 2498.0], [3.0, 2469.5]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[2.3333333333333335, 2479.0]], "isOverall": false, "label": "Login by SR OS-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Create new tenant-0-Aggregated", "isController": false}, {"data": [[2.0, 2065.0], [3.0, 2067.5]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[2.6666666666666665, 2066.6666666666665]], "isOverall": false, "label": "Get sr keys-Aggregated", "isController": false}, {"data": [[3.0, 1.3333333333333333]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[3.0, 1.3333333333333333]], "isOverall": false, "label": "WS open for user key gen-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 1.0], [3.0, 0.8571428571428572]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[2.6666666666666665, 0.7777777777777778]], "isOverall": false, "label": "Get SR Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 2.0], [1.0, 3.0], [3.0, 2.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[2.5, 2.1666666666666665]], "isOverall": false, "label": "Verify link-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [1.0, 1.0], [3.0, 2.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[2.0, 1.3333333333333333]], "isOverall": false, "label": "Dry Run Policy-0-Aggregated", "isController": false}, {"data": [[2.0, 49743.0], [1.0, 47042.0], [3.0, 50242.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[2.0, 49009.0]], "isOverall": false, "label": "Policy import and dry run-Aggregated", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept SR-Aggregated", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link SR-Aggregated", "isController": true}, {"data": [[2.0, 1.0], [3.0, 1.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[2.6666666666666665, 1.0]], "isOverall": false, "label": "Get key gen result-0-Aggregated", "isController": false}, {"data": [[1.0, 1240.0], [2.0, 6130.0], [3.0, 1067.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[2.0, 2812.3333333333335]], "isOverall": false, "label": "Accept sr-Aggregated", "isController": false}, {"data": [[0.0, 0.0], [1.0, 5967.0], [3.0, 7296.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.75, 5139.75]], "isOverall": false, "label": "User creation(admin side)-Aggregated", "isController": true}, {"data": [[3.0, 0.3333333333333333]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[3.0, 0.3333333333333333]], "isOverall": false, "label": "Login by user OS-0-Aggregated", "isController": false}, {"data": [[3.0, 923.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[3.0, 923.0]], "isOverall": false, "label": "WS open for user link-Aggregated", "isController": false}, {"data": [[2.0, 848.0], [3.0, 713.5000000000001]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[2.9523809523809526, 719.9047619047619]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[3.0, 1.6666666666666667]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[3.0, 1.6666666666666667]], "isOverall": false, "label": "WS open for sr link-0-Aggregated", "isController": false}, {"data": [[3.0, 0.6666666666666666]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[3.0, 0.6666666666666666]], "isOverall": false, "label": "WS open for user link-0-Aggregated", "isController": false}, {"data": [[1.0, 2584.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.0, 2584.0]], "isOverall": false, "label": "Create new tenant-Aggregated", "isController": false}, {"data": [[3.0, 2037.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[3.0, 2037.0]], "isOverall": false, "label": "Get user key gen result-Aggregated", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[3.0, 1.0]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[3.0, 1.6666666666666667]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[3.0, 1.6666666666666667]], "isOverall": false, "label": "Get User Access Token-0-Aggregated", "isController": false}, {"data": [[3.0, 1.3333333333333333]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[3.0, 1.3333333333333333]], "isOverall": false, "label": "Link SR profile-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [3.0, 1.5]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[2.3333333333333335, 1.3333333333333333]], "isOverall": false, "label": "Accept user-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [3.0, 0.5]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[2.6666666666666665, 0.3333333333333333]], "isOverall": false, "label": "Get sr keys-0-Aggregated", "isController": false}, {"data": [[3.0, 2468.3333333333335]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[3.0, 2468.3333333333335]], "isOverall": false, "label": "Login by user OS-Aggregated", "isController": false}, {"data": [[3.0, 1.9333333333333333]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[3.0, 1.9333333333333333]], "isOverall": false, "label": "Get SR link result-0-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate user hedera data-Aggregated", "isController": true}, {"data": [[2.0, 390.0], [1.0, 1437.0], [3.0, 552.25]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[2.5, 672.6666666666666]], "isOverall": false, "label": "Verify link-Aggregated", "isController": false}, {"data": [[1.0, 1729.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.0, 1729.0]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[1.0, 1141.0], [2.0, 1126.0], [3.0, 644.1428571428572]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[2.6666666666666665, 752.8888888888889]], "isOverall": false, "label": "Get SR Access Token-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate sr hedera data-Aggregated", "isController": true}, {"data": [[3.0, 3072.3333333333335]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[3.0, 3072.3333333333335]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[3.0, 0.3333333333333333]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[3.0, 0.3333333333333333]], "isOverall": false, "label": "Get user key gen result-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [3.0, 0.5]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[2.3333333333333335, 0.6666666666666666]], "isOverall": false, "label": "Login by SR OS-0-Aggregated", "isController": false}, {"data": [[3.0, 2.3333333333333335]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[3.0, 2.3333333333333335]], "isOverall": false, "label": "Get SR DID-0-Aggregated", "isController": false}, {"data": [[3.0, 0.6666666666666667]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[3.0, 0.6666666666666667]], "isOverall": false, "label": "Get user keys-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 3.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 26.9, "minX": 1.7309898E12, "maxY": 14279.483333333334, "series": [{"data": [[1.73099016E12, 6535.883333333333], [1.73098986E12, 6052.6], [1.73099004E12, 6454.416666666667], [1.73099022E12, 1137.7333333333333], [1.73098992E12, 8576.766666666666], [1.7309901E12, 6766.016666666666], [1.7309898E12, 14279.483333333334], [1.73098998E12, 10984.416666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73099016E12, 223.95], [1.73098986E12, 192.23333333333332], [1.73099004E12, 159.73333333333332], [1.73099022E12, 26.9], [1.73098992E12, 217.7], [1.7309901E12, 241.21666666666667], [1.7309898E12, 495.26666666666665], [1.73098998E12, 262.3]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73099022E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7309898E12, "maxY": 51591.0, "series": [{"data": [[1.7309898E12, 0.6666666666666666]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73098986E12, 923.6666666666666]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73098986E12, 410.5], [1.7309898E12, 758.0], [1.73098998E12, 913.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73098986E12, 964.3333333333334]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7309898E12, 0.6666666666666667]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73099004E12, 0.5], [1.73098998E12, 1.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7309901E12, 0.6666666666666666]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.7309898E12, 755.2857142857143]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73098986E12, 1.0], [1.7309898E12, 1.0], [1.73098998E12, 0.3333333333333333]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.7309901E12, 756.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.7309898E12, 758.6666666666666]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73098992E12, 2047.0], [1.73098998E12, 2041.5]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7309898E12, 2050.6666666666665]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73099016E12, 513.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.7309898E12, 0.3333333333333333], [1.73098998E12, 0.5]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73099004E12, 876.0], [1.7309901E12, 904.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.7309898E12, 0.33333333333333337]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73099016E12, 39901.0], [1.73099022E12, 40104.5]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73098986E12, 457.75], [1.73098992E12, 799.0909090909092]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73098998E12, 546.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.7309898E12, 1054.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73098998E12, 4660.666666666667]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73099004E12, 512.5], [1.73098998E12, 915.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73099004E12, 454.0], [1.73098998E12, 320.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.7309898E12, 2039.6666666666667]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.7309898E12, 669.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73098986E12, 1.0], [1.7309898E12, 1.5]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.7309901E12, 4.5]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73098986E12, 51591.0], [1.7309898E12, 23756.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.7309898E12, 2018.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.7309898E12, 0.6666666666666667]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73099016E12, 40653.0], [1.73099022E12, 40698.5]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.7309898E12, 1.6666666666666667]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73099004E12, 588.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73098992E12, 1.0], [1.73098998E12, 0.5]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.7309898E12, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.7309898E12, 20754.333333333332]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73098992E12, 2044.0], [1.7309898E12, 2047.6666666666667], [1.73098998E12, 2039.5]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73098992E12, 2045.0], [1.73098998E12, 2043.5]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73099016E12, 1.3333333333333333]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.5]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.7309901E12, 8325.666666666666]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73098992E12, 16178.0], [1.73098998E12, 22376.5]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73099016E12, 1.333333333333333], [1.7309901E12, 1.3333333333333335]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.7309898E12, 0.8571428571428572]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7309898E12, 0.33333333333333337]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73099004E12, 1.5]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.7309898E12, 2479.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.7309898E12, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7309898E12, 2066.6666666666665]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73098992E12, 1.0], [1.73098998E12, 1.5]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73099016E12, 0.6666666666666666], [1.73098986E12, 1.0], [1.73099004E12, 0.0], [1.7309901E12, 1.0], [1.7309898E12, 1.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73099004E12, 2.3333333333333335], [1.73098992E12, 2.5], [1.73098998E12, 1.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73099016E12, 2.0], [1.73099022E12, 1.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73099016E12, 47042.0], [1.7309901E12, 49992.5]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7309898E12, 1.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.7309898E12, 2812.3333333333335]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7309898E12, 5139.75]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73098992E12, 0.5], [1.73098998E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73099004E12, 883.0], [1.73098998E12, 943.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73099016E12, 770.3333333333334], [1.7309901E12, 682.0833333333334]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73098986E12, 1.6666666666666667]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73099004E12, 1.0], [1.73098998E12, 0.5]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.7309898E12, 2584.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73098992E12, 2043.0], [1.73098998E12, 2034.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73098998E12, 1.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73098998E12, 1.6666666666666667]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73098986E12, 1.3333333333333333]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7309898E12, 1.3333333333333333]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.7309898E12, 0.3333333333333333]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73098992E12, 2458.0], [1.73098998E12, 2489.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73098986E12, 1.0], [1.73098992E12, 2.2727272727272725]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73099004E12, 792.6666666666667], [1.73098992E12, 574.5], [1.73098998E12, 509.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.7309898E12, 1729.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73099016E12, 646.6666666666666], [1.73098986E12, 577.5], [1.73099004E12, 1141.0], [1.7309901E12, 1113.5], [1.7309898E12, 313.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73098986E12, 7185.0], [1.7309898E12, 1016.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.5]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.7309898E12, 0.6666666666666666]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73099004E12, 2.5], [1.73098998E12, 2.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73098992E12, 1.0], [1.73098998E12, 0.5]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73099022E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7309898E12, "maxY": 39894.5, "series": [{"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73098986E12, 0.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73098986E12, 409.0], [1.7309898E12, 757.0], [1.73098998E12, 912.3333333333334]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73098986E12, 962.6666666666666]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7309901E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.7309898E12, 754.1428571428572]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73098986E12, 0.0], [1.7309898E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.7309901E12, 755.3333333333334]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.7309898E12, 757.6666666666666]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73098992E12, 2046.0], [1.73098998E12, 2040.5]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7309898E12, 2050.3333333333335]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73099016E12, 511.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.7309898E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.7309901E12, 0.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73099016E12, 39680.0], [1.73099022E12, 39894.5]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73098986E12, 456.75], [1.73098992E12, 796.4545454545455]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73098998E12, 544.3333333333334]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.7309898E12, 1052.6666666666667]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73098998E12, 4659.666666666667]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73099004E12, 509.5], [1.73098998E12, 913.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73099004E12, 453.5], [1.73098998E12, 319.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.7309898E12, 2038.6666666666667]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.7309898E12, 668.3333333333334]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73098986E12, 0.0], [1.7309898E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.7309901E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73098986E12, 0.0], [1.7309898E12, 0.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.7309898E12, 2018.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73099016E12, 0.0], [1.73099022E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73099004E12, 586.25]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73098992E12, 2043.0], [1.7309898E12, 2046.6666666666667], [1.73098998E12, 2038.5]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73098992E12, 2044.0], [1.73098998E12, 2042.5]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73099016E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.7309901E12, 0.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73099016E12, 0.0], [1.7309901E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73099004E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.7309898E12, 2478.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7309898E12, 2066.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73099016E12, 0.0], [1.73098986E12, 0.0], [1.73099004E12, 0.0], [1.7309901E12, 0.0], [1.7309898E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73099016E12, 0.0], [1.73099022E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73099016E12, 0.0], [1.7309901E12, 0.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.7309898E12, 2812.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73099016E12, 768.5555555555555], [1.7309901E12, 680.3333333333334]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73098986E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.7309898E12, 2583.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73098992E12, 2043.0], [1.73098998E12, 2033.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73098998E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73098998E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73098986E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73098992E12, 2457.0], [1.73098998E12, 2489.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73098986E12, 0.0], [1.73098992E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73099004E12, 790.0], [1.73098992E12, 572.0], [1.73098998E12, 508.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.7309898E12, 1728.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73099016E12, 645.6666666666666], [1.73098986E12, 575.5], [1.73099004E12, 1140.0], [1.7309901E12, 1112.5], [1.7309898E12, 312.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73098986E12, 7184.0], [1.7309898E12, 1014.5]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73099022E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7309898E12, "maxY": 24350.0, "series": [{"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73098986E12, 922.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73098986E12, 0.0], [1.7309898E12, 0.0], [1.73098998E12, 333.3333333333333]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73098986E12, 464.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7309901E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.7309898E12, 199.42857142857142]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73098986E12, 0.0], [1.7309898E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.7309901E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73098992E12, 2024.0], [1.73098998E12, 2016.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7309898E12, 2025.3333333333333]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73099016E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.7309898E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73099004E12, 875.0], [1.7309901E12, 899.5]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73099016E12, 0.0], [1.73099022E12, 0.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73098986E12, 0.0], [1.73098992E12, 128.0909090909091]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73098998E12, 0.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73098998E12, 0.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098998E12, 451.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.7309898E12, 2015.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73098986E12, 0.0], [1.7309898E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.7309901E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73098986E12, 24350.0], [1.7309898E12, 12248.5]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73099016E12, 0.0], [1.73099022E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.7309898E12, 1.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73099004E12, 0.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.7309898E12, 11969.666666666666]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73098992E12, 2020.0], [1.7309898E12, 2024.3333333333333], [1.73098998E12, 2021.5]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73098992E12, 2032.0], [1.73098998E12, 2019.5]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73099016E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.7309901E12, 1934.3333333333333]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73098992E12, 11470.0], [1.73098998E12, 11975.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73099016E12, 0.0], [1.7309901E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73099004E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.7309898E12, 2023.3333333333333]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7309898E12, 2025.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73098992E12, 1.0], [1.73098998E12, 1.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73099016E12, 0.0], [1.73098986E12, 0.0], [1.73099004E12, 0.0], [1.7309901E12, 0.0], [1.7309898E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73099016E12, 0.0], [1.73099022E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73099016E12, 1839.0], [1.7309901E12, 1982.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7309898E12, 349.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73099004E12, 881.0], [1.73098998E12, 942.5]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73099016E12, 148.77777777777777], [1.7309901E12, 0.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73098986E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73098992E12, 2018.0], [1.73098998E12, 2017.5]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73098998E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73098998E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73098986E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73098992E12, 2017.5], [1.73098998E12, 2029.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73098986E12, 0.0], [1.73098992E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73099004E12, 297.6666666666667], [1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.7309898E12, 472.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73099016E12, 0.0], [1.73098986E12, 0.0], [1.73099004E12, 790.0], [1.7309901E12, 500.0], [1.7309898E12, 0.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73098986E12, 0.0], [1.7309898E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.7309898E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73099004E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73098992E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73099022E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7309898E12, "maxY": 41610.0, "series": [{"data": [[1.73099016E12, 39901.0], [1.73098986E12, 7185.0], [1.73099004E12, 1437.0], [1.73099022E12, 41610.0], [1.73098992E12, 2465.0], [1.7309901E12, 1126.0], [1.7309898E12, 6130.0], [1.73098998E12, 7099.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73099016E12, 899.4], [1.73098986E12, 986.7], [1.73099004E12, 908.8000000000004], [1.73099022E12, 41610.0], [1.73098992E12, 2044.9], [1.7309901E12, 1028.1000000000001], [1.7309898E12, 2053.1], [1.73098998E12, 2042.9]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73099016E12, 39901.0], [1.73098986E12, 7185.0], [1.73099004E12, 1437.0], [1.73099022E12, 41610.0], [1.73098992E12, 2465.0], [1.7309901E12, 1126.0], [1.7309898E12, 6130.0], [1.73098998E12, 7099.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73099016E12, 14687.499999999918], [1.73098986E12, 3785.9999999999955], [1.73099004E12, 1303.7999999999993], [1.73099022E12, 41610.0], [1.73098992E12, 2430.7999999999984], [1.7309901E12, 1102.25], [1.7309898E12, 2470.65], [1.73098998E12, 3959.599999999986]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73099016E12, 0.0], [1.73098986E12, 0.0], [1.73099004E12, 0.0], [1.73099022E12, 1.0], [1.73098992E12, 0.0], [1.7309901E12, 0.0], [1.7309898E12, 0.0], [1.73098998E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73099016E12, 182.5], [1.73098986E12, 174.0], [1.73099004E12, 188.5], [1.73099022E12, 19300.0], [1.73098992E12, 5.5], [1.7309901E12, 202.0], [1.7309898E12, 2.0], [1.73098998E12, 2.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73099022E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 1.0, "minX": 2.0, "maxY": 160.5, "series": [{"data": [[2.0, 160.5], [4.0, 2.0], [6.0, 1.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 6.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 4.9E-324, "series": [{"data": [[2.0, 0.0], [4.0, 0.0], [6.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 6.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.7309898E12, "maxY": 1.4833333333333334, "series": [{"data": [[1.73099016E12, 0.5666666666666667], [1.73098986E12, 0.48333333333333334], [1.73099004E12, 0.48333333333333334], [1.73099022E12, 0.03333333333333333], [1.73098992E12, 0.6833333333333333], [1.7309901E12, 0.6166666666666667], [1.7309898E12, 1.4833333333333334], [1.73098998E12, 0.8166666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73099022E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7309898E12, "maxY": 1.0666666666666667, "series": [{"data": [[1.73099016E12, 0.48333333333333334], [1.73098986E12, 0.36666666666666664], [1.73099004E12, 0.38333333333333336], [1.73099022E12, 0.06666666666666667], [1.73098992E12, 0.6166666666666667], [1.7309901E12, 0.5166666666666667], [1.7309898E12, 1.0666666666666667], [1.73098998E12, 0.6333333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.73098986E12, 0.05], [1.73099004E12, 0.03333333333333333], [1.73098992E12, 0.016666666666666666], [1.7309901E12, 0.03333333333333333], [1.7309898E12, 0.05], [1.73098998E12, 0.06666666666666667]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.73099016E12, 0.05], [1.73098986E12, 0.03333333333333333], [1.73099004E12, 0.016666666666666666], [1.73098992E12, 0.016666666666666666], [1.7309901E12, 0.03333333333333333], [1.7309898E12, 0.3], [1.73098998E12, 0.08333333333333333]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.73098986E12, 0.05], [1.73099004E12, 0.03333333333333333], [1.73098992E12, 0.016666666666666666], [1.7309901E12, 0.05], [1.7309898E12, 0.05], [1.73098998E12, 0.05]], "isOverall": false, "label": "202", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73099022E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7309898E12, "maxY": 0.2, "series": [{"data": [[1.73098992E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "Link user-success", "isController": true}, {"data": [[1.73098992E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "Get user key gen result-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Accept sr-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Invite and accept user-success", "isController": true}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Accept sr-0-success", "isController": false}, {"data": [[1.7309898E12, 0.11666666666666667]], "isOverall": false, "label": "Get Admin Access Token-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Get key gen result-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Login by SR OS-0-success", "isController": false}, {"data": [[1.73098992E12, 0.016666666666666666], [1.7309898E12, 0.05], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "Get Access Token-0-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Accept user-success", "isController": false}, {"data": [[1.73099004E12, 0.016666666666666666], [1.7309901E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for policy import-0-success", "isController": false}, {"data": [[1.73098986E12, 0.016666666666666666], [1.7309898E12, 0.03333333333333333]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.73098992E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for user key gen-success", "isController": false}, {"data": [[1.73098998E12, 0.05]], "isOverall": false, "label": "Get User Access Token-0-success", "isController": false}, {"data": [[1.73099016E12, 0.15], [1.7309901E12, 0.2]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Invite user-0-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Get sr keys-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Link SR-success", "isController": true}, {"data": [[1.73098992E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for user key gen-0-success", "isController": false}, {"data": [[1.7309901E12, 0.05]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.7309898E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-success", "isController": false}, {"data": [[1.73099004E12, 0.06666666666666667]], "isOverall": false, "label": "Get user link result-0-success", "isController": false}, {"data": [[1.73098998E12, 0.05]], "isOverall": false, "label": "Get User Access Token-success", "isController": false}, {"data": [[1.7309898E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-success", "isController": false}, {"data": [[1.73098998E12, 0.05]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.73099004E12, 0.03333333333333333], [1.73098998E12, 0.016666666666666666]], "isOverall": false, "label": "Link user profile-0-success", "isController": false}, {"data": [[1.73099016E12, 0.016666666666666666], [1.7309901E12, 0.03333333333333333]], "isOverall": false, "label": "Policy import and dry run-success", "isController": true}, {"data": [[1.7309898E12, 0.11666666666666667]], "isOverall": false, "label": "Get Admin Access Token-0-success", "isController": false}, {"data": [[1.73098986E12, 0.03333333333333333], [1.7309898E12, 0.016666666666666666], [1.73098998E12, 0.05]], "isOverall": false, "label": "Agree terms-success", "isController": false}, {"data": [[1.7309898E12, 0.06666666666666667]], "isOverall": false, "label": "User creation(admin side)-success", "isController": true}, {"data": [[1.73098992E12, 0.016666666666666666], [1.7309898E12, 0.05], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "Get Access Token-success", "isController": false}, {"data": [[1.73098992E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "Get user keys-0-success", "isController": false}, {"data": [[1.7309901E12, 0.05]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.7309901E12, 0.05]], "isOverall": false, "label": "Requests for Import-success", "isController": true}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Invite and accept SR-success", "isController": true}, {"data": [[1.7309898E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-0-success", "isController": false}, {"data": [[1.73099004E12, 0.06666666666666667]], "isOverall": false, "label": "Get user link result-success", "isController": false}, {"data": [[1.7309898E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.73098986E12, 0.05]], "isOverall": false, "label": "WS open for sr link-0-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Login by SR OS-success", "isController": false}, {"data": [[1.73098992E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "Get user keys-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Generate sr hedera data-success", "isController": true}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Get key gen result-0-success", "isController": false}, {"data": [[1.73098992E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "User creation(user side)-success", "isController": true}, {"data": [[1.73099016E12, 0.05]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.73099016E12, 0.016666666666666666], [1.73099022E12, 0.03333333333333333]], "isOverall": false, "label": "Requests for DryRun-success", "isController": true}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Accept user-0-success", "isController": false}, {"data": [[1.73099004E12, 0.05], [1.73098992E12, 0.03333333333333333], [1.73098998E12, 0.016666666666666666]], "isOverall": false, "label": "Verify link-success", "isController": false}, {"data": [[1.73098986E12, 0.03333333333333333], [1.7309898E12, 0.016666666666666666], [1.73098998E12, 0.05]], "isOverall": false, "label": "Agree terms-0-success", "isController": false}, {"data": [[1.7309898E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Get sr keys-0-success", "isController": false}, {"data": [[1.73099004E12, 0.03333333333333333], [1.73098998E12, 0.016666666666666666]], "isOverall": false, "label": "Get SR DID-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Invite user-success", "isController": false}, {"data": [[1.73099016E12, 0.15], [1.7309901E12, 0.2]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.73098986E12, 0.05]], "isOverall": false, "label": "Link SR profile-0-success", "isController": false}, {"data": [[1.73098992E12, 0.03333333333333333], [1.73098998E12, 0.016666666666666666]], "isOverall": false, "label": "Generate user hedera data-success", "isController": true}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "WS open for sr key gen-success", "isController": false}, {"data": [[1.73098992E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "Generate user keys-0-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Generate sr keys-0-success", "isController": false}, {"data": [[1.73098986E12, 0.06666666666666667], [1.73098992E12, 0.18333333333333332]], "isOverall": false, "label": "Get SR link result-0-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Invite sr-0-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "WS open for sr key gen-0-success", "isController": false}, {"data": [[1.73098986E12, 0.016666666666666666], [1.7309898E12, 0.03333333333333333]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.73098986E12, 0.06666666666666667], [1.73098992E12, 0.18333333333333332]], "isOverall": false, "label": "Get SR link result-success", "isController": false}, {"data": [[1.73099016E12, 0.05]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.73098992E12, 0.03333333333333333], [1.73098998E12, 0.016666666666666666]], "isOverall": false, "label": "Login by user OS-success", "isController": false}, {"data": [[1.73099004E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for user link-0-success", "isController": false}, {"data": [[1.73099004E12, 0.03333333333333333], [1.73098998E12, 0.016666666666666666]], "isOverall": false, "label": "Get SR DID-0-success", "isController": false}, {"data": [[1.73098998E12, 0.05]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.73099016E12, 0.016666666666666666], [1.73099022E12, 0.03333333333333333]], "isOverall": false, "label": "Dry Run Policy-success", "isController": false}, {"data": [[1.73098986E12, 0.03333333333333333], [1.7309898E12, 0.03333333333333333]], "isOverall": false, "label": "User creation flow-success", "isController": true}, {"data": [[1.7309898E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-0-success", "isController": false}, {"data": [[1.73098992E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "Generate user keys-success", "isController": false}, {"data": [[1.73099016E12, 0.05], [1.73098986E12, 0.03333333333333333], [1.73099004E12, 0.016666666666666666], [1.7309901E12, 0.03333333333333333], [1.7309898E12, 0.016666666666666666]], "isOverall": false, "label": "Get SR Access Token-0-success", "isController": false}, {"data": [[1.73099004E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for user link-success", "isController": false}, {"data": [[1.73098986E12, 0.05]], "isOverall": false, "label": "WS open for sr link-success", "isController": false}, {"data": [[1.73098992E12, 0.016666666666666666], [1.73098998E12, 0.03333333333333333]], "isOverall": false, "label": "Get user key gen result-0-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Invite sr-success", "isController": false}, {"data": [[1.73099016E12, 0.05], [1.73098986E12, 0.03333333333333333], [1.73099004E12, 0.016666666666666666], [1.7309901E12, 0.03333333333333333], [1.7309898E12, 0.016666666666666666]], "isOverall": false, "label": "Get SR Access Token-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "User creation(SR side)-success", "isController": true}, {"data": [[1.73099004E12, 0.016666666666666666], [1.7309901E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for policy import-success", "isController": false}, {"data": [[1.7309898E12, 0.05]], "isOverall": false, "label": "Generate sr keys-success", "isController": false}, {"data": [[1.73098992E12, 0.03333333333333333], [1.73098998E12, 0.016666666666666666]], "isOverall": false, "label": "Login by user OS-0-success", "isController": false}, {"data": [[1.73099004E12, 0.03333333333333333], [1.73098998E12, 0.016666666666666666]], "isOverall": false, "label": "Link user profile-success", "isController": false}, {"data": [[1.73099004E12, 0.05], [1.73098992E12, 0.03333333333333333], [1.73098998E12, 0.016666666666666666]], "isOverall": false, "label": "Verify link-0-success", "isController": false}, {"data": [[1.73099016E12, 0.016666666666666666], [1.73099022E12, 0.03333333333333333]], "isOverall": false, "label": "Dry Run Policy-0-success", "isController": false}, {"data": [[1.73098986E12, 0.05]], "isOverall": false, "label": "Link SR profile-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73099022E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.7309898E12, "maxY": 1.8166666666666667, "series": [{"data": [[1.73099016E12, 0.5666666666666667], [1.73098986E12, 0.5333333333333333], [1.73099004E12, 0.4666666666666667], [1.73099022E12, 0.1], [1.73098992E12, 0.7333333333333333], [1.7309901E12, 0.7166666666666667], [1.7309898E12, 1.8166666666666667], [1.73098998E12, 0.9166666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73099022E12, "title": "Total Transactions Per Second"}},
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
