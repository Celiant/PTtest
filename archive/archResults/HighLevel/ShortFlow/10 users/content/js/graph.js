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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 276.0, "series": [{"data": [[200.0, 10.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[269300.0, 1.0], [269200.0, 1.0], [269400.0, 1.0], [279400.0, 1.0], [289800.0, 1.0], [279500.0, 1.0], [310700.0, 1.0], [300000.0, 1.0], [341600.0, 1.0], [248700.0, 1.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[0.0, 34.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[0.0, 176.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[17800.0, 1.0], [18000.0, 1.0], [17900.0, 2.0], [14600.0, 1.0], [15100.0, 1.0], [15000.0, 1.0], [8000.0, 3.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[4700.0, 1.0], [5200.0, 1.0], [24600.0, 2.0], [25000.0, 1.0], [14600.0, 2.0], [14800.0, 1.0], [15300.0, 1.0], [15400.0, 1.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[67100.0, 1.0], [36000.0, 1.0], [35400.0, 1.0], [45400.0, 1.0], [48800.0, 1.0], [54100.0, 1.0], [28300.0, 1.0], [57400.0, 1.0], [58700.0, 1.0], [65200.0, 1.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[3500.0, 10.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[16600.0, 3.0], [17000.0, 1.0], [13300.0, 1.0], [6700.0, 2.0], [6800.0, 2.0], [7200.0, 1.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[0.0, 39.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [200.0, 8.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[0.0, 45.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[300.0, 1.0], [200.0, 89.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[600.0, 7.0], [300.0, 3.0], [700.0, 1.0], [200.0, 105.0]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1100.0, 2.0], [600.0, 3.0], [300.0, 1.0], [11200.0, 2.0], [11100.0, 2.0], [1400.0, 1.0], [11500.0, 1.0], [200.0, 50.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[4500.0, 1.0], [4600.0, 1.0], [4800.0, 1.0], [4700.0, 1.0], [13100.0, 2.0], [13000.0, 1.0], [13500.0, 1.0], [14600.0, 1.0], [14400.0, 1.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[0.0, 28.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[16500.0, 2.0], [16600.0, 1.0], [16800.0, 1.0], [17000.0, 1.0], [13300.0, 2.0], [6800.0, 2.0], [6700.0, 1.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[0.0, 116.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[17300.0, 3.0], [17500.0, 1.0], [17800.0, 1.0], [14000.0, 2.0], [7600.0, 1.0], [7500.0, 2.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[0.0, 60.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[400.0, 9.0], [500.0, 1.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[4200.0, 9.0], [4300.0, 1.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[17400.0, 1.0], [17300.0, 2.0], [17700.0, 1.0], [14000.0, 1.0], [7500.0, 3.0], [7600.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[900.0, 10.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[200.0, 20.0], [400.0, 10.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[66500.0, 1.0], [36800.0, 1.0], [37900.0, 1.0], [43200.0, 1.0], [51900.0, 1.0], [51700.0, 1.0], [57300.0, 1.0], [28600.0, 1.0], [57000.0, 1.0], [55900.0, 1.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[500.0, 10.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[400.0, 9.0], [900.0, 1.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[20200.0, 1.0], [22100.0, 1.0], [27000.0, 1.0], [28600.0, 1.0], [27900.0, 1.0], [29500.0, 1.0], [30300.0, 1.0], [29900.0, 1.0], [32200.0, 1.0], [32700.0, 1.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[0.0, 276.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [200.0, 36.0], [400.0, 1.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[600.0, 7.0], [700.0, 3.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[4500.0, 1.0], [24500.0, 1.0], [24200.0, 1.0], [24700.0, 1.0], [200.0, 10.0], [27400.0, 1.0], [27300.0, 1.0], [14300.0, 3.0], [14700.0, 1.0]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[424700.0, 1.0], [445800.0, 1.0], [456100.0, 1.0], [456200.0, 2.0], [476500.0, 1.0], [486800.0, 1.0], [486900.0, 1.0], [497600.0, 1.0], [497700.0, 1.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[12600.0, 1.0], [12500.0, 1.0], [12700.0, 1.0], [12900.0, 1.0], [13500.0, 1.0], [14100.0, 1.0], [14700.0, 1.0], [14600.0, 1.0], [15000.0, 1.0], [14900.0, 1.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[156000.0, 1.0], [165800.0, 1.0], [166200.0, 1.0], [176500.0, 1.0], [175900.0, 1.0], [176600.0, 1.0], [186800.0, 1.0], [197500.0, 1.0], [207300.0, 1.0], [217500.0, 1.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[300.0, 1.0], [700.0, 2.0], [200.0, 35.0]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [700.0, 1.0], [200.0, 30.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[600.0, 42.0], [200.0, 234.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[800.0, 10.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[0.0, 90.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [700.0, 4.0], [200.0, 34.0]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[11100.0, 6.0], [11000.0, 2.0], [11200.0, 8.0], [10900.0, 1.0], [11300.0, 1.0], [11400.0, 4.0], [11500.0, 2.0], [11700.0, 2.0], [11800.0, 1.0], [11900.0, 1.0], [12100.0, 1.0], [900.0, 3.0], [1100.0, 4.0], [1200.0, 4.0], [1300.0, 1.0], [1400.0, 3.0], [1700.0, 1.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[0.0, 64.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[0.0, 30.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[600.0, 10.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[600.0, 1.0], [200.0, 27.0]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[0.0, 37.0], [100.0, 1.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[300.0, 1.0], [200.0, 59.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[600.0, 27.0], [200.0, 140.0], [400.0, 7.0], [800.0, 2.0]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[0.0, 40.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 497700.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 55.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 2360.0, "series": [{"data": [[0.0, 2360.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 157.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 55.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6982181E12, "maxY": 10.0, "series": [{"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.69821858E12, 10.0], [1.69821888E12, 1.0], [1.69821828E12, 10.0], [1.69821834E12, 10.0], [1.69821864E12, 10.0], [1.6982187E12, 10.0], [1.6982181E12, 3.9166666666666674], [1.6982184E12, 10.0], [1.69821846E12, 10.0], [1.69821876E12, 7.739520958083828], [1.69821882E12, 3.5090909090909093], [1.69821816E12, 9.014705882352946], [1.69821822E12, 10.0], [1.69821852E12, 10.0]], "isOverall": false, "label": "Policy workflow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821888E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 468496.5, "series": [{"data": [[4.0, 263.0], [9.0, 269.0], [10.0, 269.5], [6.0, 266.3333333333333]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[8.000000000000002, 267.79999999999995]], "isOverall": false, "label": "Get issues-Aggregated", "isController": false}, {"data": [[10.0, 0.8]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[10.0, 0.8]], "isOverall": false, "label": "Get block for waiting app approve-0-Aggregated", "isController": false}, {"data": [[10.0, 285812.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[10.0, 285812.0]], "isOverall": false, "label": "Import-Aggregated", "isController": true}, {"data": [[8.0, 0.0], [10.0, 1.3333333333333333], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[8.7, 1.1]], "isOverall": false, "label": "Get device issue row-0-Aggregated", "isController": false}, {"data": [[10.0, 0.8]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[10.0, 0.8]], "isOverall": false, "label": "Get hedera id-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [4.0, 0.0], [1.0, 1.0], [8.0, 0.0], [9.0, 0.0], [5.0, 0.0], [10.0, 0.0], [3.0, 1.0], [6.0, 1.0], [7.0, 11.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[5.5, 1.4]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 2.0], [10.0, 1.2222222222222225], [6.0, 1.5], [7.0, 1.6]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[8.73529411764706, 1.323529411764706]], "isOverall": false, "label": "Get device approve result-0-Aggregated", "isController": false}, {"data": [[9.0, 1.3333333333333333], [10.0, 2.0000000000000004]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[9.700000000000001, 1.8000000000000003]], "isOverall": false, "label": "Create device-0-Aggregated", "isController": false}, {"data": [[10.0, 0.6477272727272728]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[10.0, 0.6477272727272728]], "isOverall": false, "label": "Get policy publish result-0-Aggregated", "isController": false}, {"data": [[10.0, 1.1666666666666665], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[8.6, 1.1]], "isOverall": false, "label": "Get issue schema-0-Aggregated", "isController": false}, {"data": [[2.0, 254.0], [4.0, 243.0], [1.0, 246.0], [8.0, 246.0], [9.0, 245.0], [5.0, 244.0], [10.0, 248.0], [3.0, 244.0], [6.0, 244.0], [7.0, 253.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[5.5, 246.7]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[10.0, 268.8]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[10.0, 268.8]], "isOverall": false, "label": "Get applications-Aggregated", "isController": false}, {"data": [[8.0, 265.0], [10.0, 271.33333333333337], [6.0, 265.0], [7.0, 267.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[8.7, 269.0]], "isOverall": false, "label": "Get device issue row-Aggregated", "isController": false}, {"data": [[4.0, 17917.0], [9.0, 11344.0], [10.0, 14047.0], [6.0, 14677.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[8.000000000000002, 14082.400000000001]], "isOverall": false, "label": "Issue creation-Aggregated", "isController": true}, {"data": [[10.0, 15922.700000000003]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[10.0, 15922.700000000003]], "isOverall": false, "label": "Token associate-Aggregated", "isController": true}, {"data": [[10.0, 243.2]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[10.0, 243.2]], "isOverall": false, "label": "Get block for waiting device-Aggregated", "isController": false}, {"data": [[10.0, 49684.2]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[10.0, 49684.2]], "isOverall": false, "label": "Application creation-Aggregated", "isController": true}, {"data": [[10.0, 231.5]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[10.0, 231.5]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[0.0, 3521.6]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[0.0, 3521.6]], "isOverall": false, "label": "Get result for issue request approve-Aggregated", "isController": true}, {"data": [[0.0, 11475.099999999999]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[0.0, 11475.099999999999]], "isOverall": false, "label": "Get result for device approve-Aggregated", "isController": true}, {"data": [[9.0, 1.0], [10.0, 1.2702702702702706]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[9.948717948717947, 1.2564102564102568]], "isOverall": false, "label": "Get block for approve result-0-Aggregated", "isController": false}, {"data": [[10.0, 248.90000000000003]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[10.0, 248.90000000000003]], "isOverall": false, "label": "Approve application-Aggregated", "isController": false}, {"data": [[10.0, 320.3]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[10.0, 320.3]], "isOverall": false, "label": "Associate token-Aggregated", "isController": false}, {"data": [[10.0, 0.7]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[10.0, 0.7]], "isOverall": false, "label": "Get block for waiting device-0-Aggregated", "isController": false}, {"data": [[4.0, 274.0], [9.0, 280.5], [10.0, 273.0], [6.0, 272.6666666666667]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[8.000000000000002, 274.5]], "isOverall": false, "label": "Get issue approve result-Aggregated", "isController": false}, {"data": [[8.0, 0.8], [4.0, 1.8888888888888888], [2.0, 3.0], [1.0, 2.0], [9.0, 1.6], [10.0, 2.2], [5.0, 1.0], [6.0, 1.6666666666666667], [3.0, 2.0], [7.0, 3.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[6.155555555555557, 1.8444444444444443]], "isOverall": false, "label": "Balance verify-0-Aggregated", "isController": false}, {"data": [[8.0, 232.0], [4.0, 231.0], [9.0, 231.375], [10.0, 236.1617647058823], [6.0, 231.75], [7.0, 228.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[9.311111111111114, 234.95555555555552]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[10.0, 281.3103448275862]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[10.0, 281.3103448275862]], "isOverall": false, "label": "Get application creation status-Aggregated", "isController": false}, {"data": [[10.0, 1187.3437500000002]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[10.0, 1187.3437500000002]], "isOverall": false, "label": "Get tokens-Aggregated", "isController": false}, {"data": [[10.0, 10074.9]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[10.0, 10074.9]], "isOverall": false, "label": "Choose registrant-Aggregated", "isController": false}, {"data": [[10.0, 0.6785714285714284]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[10.0, 0.6785714285714284]], "isOverall": false, "label": "Get associate result-0-Aggregated", "isController": false}, {"data": [[0.0, 13079.9]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[0.0, 13079.9]], "isOverall": false, "label": "Get result for app approve-Aggregated", "isController": true}, {"data": [[10.0, 1.2241379310344827]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[10.0, 1.2241379310344827]], "isOverall": false, "label": "Get application creation status-0-Aggregated", "isController": false}, {"data": [[10.0, 1.1]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[10.0, 1.1]], "isOverall": false, "label": "Create application-0-Aggregated", "isController": false}, {"data": [[9.0, 17571.5], [10.0, 12897.375]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[9.8, 13832.2]], "isOverall": false, "label": "Role approve-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [4.0, 1.0], [1.0, 0.0], [8.0, 0.5], [9.0, 2.0], [5.0, 1.0], [10.0, 0.8292682926829268], [3.0, 1.0], [6.0, 2.0], [7.0, 0.5]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[8.8, 0.9666666666666666]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[10.0, 475.6666666666667], [6.0, 477.0], [7.0, 509.5]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[8.6, 482.7]], "isOverall": false, "label": "Get issue schema-Aggregated", "isController": false}, {"data": [[4.0, 4259.0], [9.0, 4289.0], [10.0, 4285.25], [6.0, 4271.666666666667]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[8.000000000000002, 4279.3]], "isOverall": false, "label": "Issue approve-Aggregated", "isController": true}, {"data": [[10.0, 0.7999999999999999]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[10.0, 0.7999999999999999]], "isOverall": false, "label": "Get block for waiting issue request-0-Aggregated", "isController": false}, {"data": [[8.0, 7517.0], [10.0, 10936.833333333332], [6.0, 15715.5], [7.0, 17794.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[8.7, 12236.3]], "isOverall": false, "label": "Device approve-Aggregated", "isController": true}, {"data": [[1.0, 933.0], [2.0, 955.0], [4.0, 944.0], [8.0, 942.0], [9.0, 940.0], [5.0, 940.0], [10.0, 943.0], [3.0, 935.0], [6.0, 979.0], [7.0, 930.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[5.5, 944.0999999999999]], "isOverall": false, "label": "Get tenant-Aggregated", "isController": true}, {"data": [[8.0, 247.0], [4.0, 249.0], [9.0, 254.25], [10.0, 335.75], [6.0, 343.6], [7.0, 393.6666666666667]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[8.633333333333333, 326.1333333333333]], "isOverall": false, "label": "Approve device-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [8.0, 0.0], [9.0, 0.0], [5.0, 1.0], [10.0, 1.0], [3.0, 0.0], [6.0, 0.0], [7.0, 1.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[5.5, 0.3]], "isOverall": false, "label": "Get Tenant Id-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 1.0], [8.0, 0.0], [9.0, 0.0], [5.0, 0.0], [10.0, 1.0], [3.0, 0.0], [6.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[5.5, 0.2]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[10.0, 261.09999999999997]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[10.0, 261.09999999999997]], "isOverall": false, "label": "Publish Policy-Aggregated", "isController": false}, {"data": [[8.0, 37904.0], [4.0, 28685.0], [2.0, 55995.0], [1.0, 66582.0], [9.0, 51988.0], [10.0, 57396.0], [5.0, 43294.0], [6.0, 36893.0], [3.0, 57081.0], [7.0, 51799.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[5.5, 48761.7]], "isOverall": false, "label": "Token minting verify-Aggregated", "isController": true}, {"data": [[10.0, 538.5]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[10.0, 538.5]], "isOverall": false, "label": "Create application-Aggregated", "isController": false}, {"data": [[10.0, 0.5]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[10.0, 0.5]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [9.0, 0.5], [10.0, 2.0], [6.0, 1.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[8.000000000000002, 1.2999999999999998]], "isOverall": false, "label": "Get issue approve result-0-Aggregated", "isController": false}, {"data": [[10.0, 519.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[10.0, 519.0]], "isOverall": false, "label": "Get application schema-Aggregated", "isController": false}, {"data": [[10.0, 244.70000000000002]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[10.0, 244.70000000000002]], "isOverall": false, "label": "Get block for waiting app approve-Aggregated", "isController": false}, {"data": [[10.0, 0.7]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[10.0, 0.7]], "isOverall": false, "label": "Get application schema-0-Aggregated", "isController": false}, {"data": [[10.0, 1.2]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[10.0, 1.2]], "isOverall": false, "label": "Approve application-0-Aggregated", "isController": false}, {"data": [[8.0, 20242.0], [9.0, 28541.0], [10.0, 29283.0], [7.0, 27971.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[9.3, 28099.3]], "isOverall": false, "label": "Device creation-Aggregated", "isController": true}, {"data": [[4.0, 0.0], [8.0, 0.4285714285714286], [2.0, 1.0], [9.0, 0.375], [5.0, 0.75], [10.0, 0.41249999999999987], [6.0, 0.6], [3.0, 1.0], [7.0, 0.5]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[9.565217391304346, 0.423913043478261]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[9.0, 260.5], [10.0, 272.13513513513504]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[9.948717948717947, 271.5384615384615]], "isOverall": false, "label": "Get block for approve result-Aggregated", "isController": false}, {"data": [[9.0, 696.5], [10.0, 698.1250000000001]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[9.8, 697.8000000000001]], "isOverall": false, "label": "Get device schema-Aggregated", "isController": false}, {"data": [[10.0, 238.6]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[10.0, 238.6]], "isOverall": false, "label": "Get block for waiting issue request-Aggregated", "isController": false}, {"data": [[10.0, 9648.099999999999]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[10.0, 9648.099999999999]], "isOverall": false, "label": "Grant KYC-Aggregated", "isController": true}, {"data": [[10.0, 468496.5]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[10.0, 468496.5]], "isOverall": false, "label": "Policy import and publish-Aggregated", "isController": true}, {"data": [[1.0, 257.0], [2.0, 280.0], [4.0, 264.0], [8.0, 270.0], [9.0, 264.0], [5.0, 265.0], [10.0, 270.0], [3.0, 258.0], [6.0, 285.0], [7.0, 258.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[5.5, 267.1]], "isOverall": false, "label": "Get Tenant Id-Aggregated", "isController": false}, {"data": [[9.0, 12940.333333333334], [10.0, 14159.42857142857]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[9.700000000000001, 13793.7]], "isOverall": false, "label": "Create device-Aggregated", "isController": false}, {"data": [[10.0, 0.5]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[10.0, 0.5]], "isOverall": false, "label": "Grant KYC-0-Aggregated", "isController": false}, {"data": [[10.0, 182668.8]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[10.0, 182668.8]], "isOverall": false, "label": "Publish-Aggregated", "isController": true}, {"data": [[4.0, 274.75], [9.0, 276.16666666666663], [10.0, 329.06666666666666], [6.0, 286.1], [7.0, 272.6666666666667]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[7.921052631578949, 299.23684210526324]], "isOverall": false, "label": "Get issue creation status-Aggregated", "isController": false}, {"data": [[10.0, 269.9]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[10.0, 269.9]], "isOverall": false, "label": "Get hedera id-Aggregated", "isController": false}, {"data": [[10.0, 0.6]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[10.0, 0.6]], "isOverall": false, "label": "Get block for waiting app creation-0-Aggregated", "isController": false}, {"data": [[8.0, 259.0], [9.0, 259.5], [10.0, 291.22222222222223], [6.0, 265.5], [7.0, 348.8]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[8.73529411764706, 290.0588235294117]], "isOverall": false, "label": "Get device approve result-Aggregated", "isController": false}, {"data": [[10.0, 0.5]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[10.0, 0.5]], "isOverall": false, "label": "Choose registrant-0-Aggregated", "isController": false}, {"data": [[4.0, 247.66666666666666], [8.0, 307.8571428571429], [2.0, 250.0], [9.0, 298.5], [5.0, 253.5], [10.0, 314.0541666666668], [6.0, 248.6], [3.0, 244.5], [7.0, 320.16666666666663]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[9.565217391304346, 310.057971014493]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[10.0, 860.2]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[10.0, 860.2]], "isOverall": false, "label": "WS open for kyc grant-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [4.0, 1.5], [9.0, 1.25], [10.0, 1.0735294117647058], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[9.311111111111114, 1.0888888888888886]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[10.0, 0.3]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[10.0, 0.3]], "isOverall": false, "label": "Associate token-0-Aggregated", "isController": false}, {"data": [[8.0, 415.6666666666667], [9.0, 305.1000000000001], [10.0, 316.1153846153847], [7.0, 268.0]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[9.525, 319.625]], "isOverall": false, "label": "Get device creation status-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 0.5], [10.0, 1.6666666666666667], [7.0, 1.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[9.3, 1.2999999999999998]], "isOverall": false, "label": "Get devices-0-Aggregated", "isController": false}, {"data": [[8.0, 7307.6], [4.0, 5755.555555555556], [2.0, 11735.0], [1.0, 7900.0], [9.0, 7206.0], [10.0, 7324.0], [5.0, 11519.0], [6.0, 11222.333333333334], [3.0, 8547.857142857143], [7.0, 11411.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[6.155555555555557, 7766.11111111111]], "isOverall": false, "label": "Balance verify-Aggregated", "isController": false}, {"data": [[10.0, 0.5781249999999999]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[10.0, 0.5781249999999999]], "isOverall": false, "label": "Get tokens-0-Aggregated", "isController": false}, {"data": [[10.0, 240.29999999999998]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[10.0, 240.29999999999998]], "isOverall": false, "label": "Get block for waiting app creation-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [4.0, 2.0], [9.0, 4.75], [10.0, 1.6875], [6.0, 2.0], [7.0, 1.3333333333333333]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[8.633333333333333, 2.1]], "isOverall": false, "label": "Approve device-0-Aggregated", "isController": false}, {"data": [[1.0, 674.0], [2.0, 672.0], [4.0, 677.0], [8.0, 668.0], [9.0, 673.0], [5.0, 672.0], [10.0, 672.0], [3.0, 672.0], [6.0, 691.0], [7.0, 670.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[5.5, 674.0999999999999]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[10.0, 246.74999999999997]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[10.0, 246.74999999999997]], "isOverall": false, "label": "Get associate result-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [9.0, 1.5], [10.0, 2.4], [6.0, 13.799999999999999], [7.0, 2.3333333333333335]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[7.921052631578949, 5.105263157894737]], "isOverall": false, "label": "Get issue creation status-0-Aggregated", "isController": false}, {"data": [[8.0, 266.0], [9.0, 267.0], [10.0, 270.3333333333333], [7.0, 259.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[9.3, 268.09999999999997]], "isOverall": false, "label": "Get devices-Aggregated", "isController": false}, {"data": [[2.0, 235.0], [4.0, 235.5], [1.0, 233.0], [8.0, 234.5], [9.0, 234.0], [5.0, 234.0], [10.0, 237.2926829268293], [3.0, 236.0], [6.0, 236.0], [7.0, 229.5]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[8.8, 236.3333333333333]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[10.0, 327.4772727272724]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[10.0, 327.4772727272724]], "isOverall": false, "label": "Get policy publish result-Aggregated", "isController": false}, {"data": [[10.0, 1.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[10.0, 1.0]], "isOverall": false, "label": "Get applications-0-Aggregated", "isController": false}, {"data": [[9.0, 1.0], [10.0, 1.5]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[9.8, 1.4]], "isOverall": false, "label": "Get device schema-0-Aggregated", "isController": false}, {"data": [[8.0, 6.333333333333334], [9.0, 1.1], [10.0, 1.6923076923076918], [7.0, 1.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[9.525, 1.8749999999999998]], "isOverall": false, "label": "Get device creation status-0-Aggregated", "isController": false}, {"data": [[10.0, 0.39999999999999997]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[10.0, 0.39999999999999997]], "isOverall": false, "label": "Publish Policy-0-Aggregated", "isController": false}, {"data": [[10.0, 0.5]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[10.0, 0.5]], "isOverall": false, "label": "WS open for kyc grant-0-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [9.0, 3.5], [10.0, 1.5], [6.0, 1.0]], "isOverall": false, "label": "Get issues-0", "isController": false}, {"data": [[8.000000000000002, 1.7000000000000004]], "isOverall": false, "label": "Get issues-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 19.066666666666666, "minX": 1.6982181E12, "maxY": 394804.8, "series": [{"data": [[1.69821858E12, 36342.333333333336], [1.69821888E12, 4223.666666666667], [1.69821828E12, 4214.4], [1.69821834E12, 5101.383333333333], [1.69821864E12, 195718.46666666667], [1.6982187E12, 394804.8], [1.6982181E12, 1938.3666666666666], [1.6982184E12, 6148.1], [1.69821846E12, 5106.266666666666], [1.69821876E12, 336667.5333333333], [1.69821882E12, 57800.28333333333], [1.69821816E12, 3934.633333333333], [1.69821822E12, 4319.366666666667], [1.69821852E12, 5220.833333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69821858E12, 1749.2], [1.69821888E12, 19.066666666666666], [1.69821828E12, 560.8], [1.69821834E12, 648.6166666666667], [1.69821864E12, 3641.883333333333], [1.6982187E12, 4392.666666666667], [1.6982181E12, 344.55], [1.6982184E12, 824.3], [1.69821846E12, 690.2333333333333], [1.69821876E12, 3358.6666666666665], [1.69821882E12, 325.3333333333333], [1.69821816E12, 645.1], [1.69821822E12, 623.1], [1.69821852E12, 619.3333333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821888E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6982181E12, "maxY": 483870.6666666667, "series": [{"data": [[1.69821876E12, 267.4], [1.69821882E12, 263.0], [1.6982187E12, 269.5]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69821858E12, 1.0], [1.69821864E12, 0.7142857142857143]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.6982184E12, 283036.6666666666], [1.69821846E12, 305547.0], [1.69821834E12, 274403.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69821876E12, 0.6666666666666666], [1.69821864E12, 2.0], [1.6982187E12, 1.6666666666666665]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69821858E12, 0.6666666666666667], [1.69821864E12, 0.8571428571428572]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.6982181E12, 0.5], [1.69821816E12, 2.75]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.69821876E12, 1.3333333333333337], [1.69821864E12, 1.5], [1.6982187E12, 1.2857142857142856]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.69821876E12, 1.3333333333333333], [1.69821864E12, 3.0], [1.6982187E12, 1.6]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.69821858E12, 0.59375], [1.6982184E12, 0.48], [1.69821846E12, 0.574074074074074], [1.69821864E12, 2.8333333333333335], [1.69821852E12, 0.5932203389830509]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69821876E12, 0.8333333333333333], [1.69821864E12, 1.0], [1.6982187E12, 1.6666666666666667]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.6982181E12, 245.83333333333331], [1.69821816E12, 248.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.69821858E12, 274.0], [1.69821864E12, 270.0], [1.6982187E12, 266.8]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69821876E12, 267.66666666666663], [1.69821864E12, 269.0], [1.6982187E12, 271.6666666666667]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69821876E12, 13343.8], [1.69821882E12, 17917.0], [1.6982187E12, 14047.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.69821858E12, 16601.5], [1.69821864E12, 14904.5]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69821858E12, 234.66666666666666], [1.69821864E12, 246.85714285714286]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.69821858E12, 28319.0], [1.69821864E12, 43599.0], [1.6982187E12, 58825.4]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.6982184E12, 232.66666666666669], [1.69821846E12, 229.5], [1.69821834E12, 230.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69821876E12, 3520.6], [1.69821882E12, 3513.0], [1.6982187E12, 3525.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.69821876E12, 12864.5], [1.69821864E12, 7235.0], [1.6982187E12, 10109.666666666666]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.69821876E12, 1.0], [1.69821864E12, 1.2999999999999998], [1.6982187E12, 1.2692307692307692]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.69821858E12, 246.0], [1.69821864E12, 248.25], [1.6982187E12, 250.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.69821858E12, 382.5], [1.69821864E12, 227.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69821858E12, 1.0], [1.69821864E12, 0.5714285714285714]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69821876E12, 275.8], [1.69821882E12, 274.0], [1.6982187E12, 273.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69821888E12, 2.0], [1.69821876E12, 1.3157894736842108], [1.69821882E12, 2.0], [1.6982187E12, 2.8571428571428568]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.69821858E12, 234.69230769230768], [1.69821876E12, 231.27272727272725], [1.69821882E12, 231.0], [1.69821864E12, 240.03703703703707], [1.6982187E12, 233.32], [1.69821852E12, 231.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.69821858E12, 301.24999999999994], [1.69821864E12, 282.87931034482773], [1.6982187E12, 276.3]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.69821858E12, 1269.6571428571428], [1.69821864E12, 1088.0000000000002]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69821858E12, 9067.5], [1.69821864E12, 9918.285714285714], [1.6982187E12, 13186.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.69821858E12, 0.8333333333333331], [1.69821864E12, 0.4]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.69821876E12, 16819.5], [1.69821864E12, 8440.5], [1.6982187E12, 15849.5]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.69821858E12, 1.0], [1.69821864E12, 0.913793103448276], [1.6982187E12, 1.62]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69821858E12, 1.0], [1.69821864E12, 1.1428571428571428], [1.6982187E12, 1.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.69821876E12, 17571.5], [1.69821864E12, 9201.0], [1.6982187E12, 16593.75]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.6982181E12, 0.6666666666666666], [1.69821858E12, 0.4285714285714286], [1.6982184E12, 0.16666666666666666], [1.69821846E12, 0.5], [1.69821876E12, 2.111111111111111], [1.69821834E12, 0.5], [1.69821882E12, 1.0], [1.69821816E12, 0.0], [1.69821864E12, 0.7777777777777778], [1.6982187E12, 1.5]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69821876E12, 486.6666666666667], [1.69821864E12, 476.0], [1.6982187E12, 477.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69821876E12, 4278.6], [1.69821882E12, 4259.0], [1.6982187E12, 4285.25]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69821858E12, 1.0], [1.69821864E12, 0.7142857142857143]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.69821876E12, 13621.0], [1.69821864E12, 8009.0], [1.6982187E12, 10876.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.6982181E12, 947.6666666666666], [1.69821816E12, 938.75]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.69821876E12, 340.66666666666663], [1.69821882E12, 249.0], [1.69821864E12, 368.5], [1.6982187E12, 307.3333333333334]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.6982181E12, 0.16666666666666669], [1.69821816E12, 0.5]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.6982181E12, 0.16666666666666669], [1.69821816E12, 0.25]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.6982184E12, 261.5], [1.69821846E12, 251.0], [1.69821834E12, 270.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.69821888E12, 66582.0], [1.69821876E12, 46545.666666666664], [1.69821882E12, 47253.666666666664]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69821858E12, 527.0], [1.69821864E12, 541.0], [1.6982187E12, 544.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.6982184E12, 0.5], [1.69821846E12, 0.5], [1.69821834E12, 0.5]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69821876E12, 0.8], [1.69821882E12, 1.0], [1.6982187E12, 2.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69821858E12, 470.5], [1.69821864E12, 539.0], [1.6982187E12, 476.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69821858E12, 238.0], [1.69821864E12, 247.57142857142858]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69821858E12, 1.0], [1.69821864E12, 0.5714285714285714], [1.6982187E12, 1.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.69821858E12, 1.0], [1.69821864E12, 1.25], [1.6982187E12, 1.2]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.69821876E12, 26323.75], [1.69821864E12, 32248.0], [1.6982187E12, 28690.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.6982181E12, 0.6000000000000001], [1.6982184E12, 0.3714285714285715], [1.69821846E12, 0.5], [1.69821828E12, 0.4074074074074075], [1.69821834E12, 0.4107142857142859], [1.69821816E12, 0.48], [1.69821822E12, 0.38333333333333336]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.69821876E12, 259.3333333333333], [1.69821864E12, 261.90000000000003], [1.6982187E12, 276.6538461538462]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.69821876E12, 696.5], [1.69821864E12, 699.0], [1.6982187E12, 697.25]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69821858E12, 236.66666666666666], [1.69821864E12, 239.42857142857142]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.69821858E12, 6087.111111111112], [1.69821864E12, 12561.636363636364]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.69821858E12, 464586.8333333334], [1.69821864E12, 483870.6666666667], [1.69821852E12, 445832.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.6982181E12, 268.1666666666667], [1.69821816E12, 265.5]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.69821876E12, 12940.333333333334], [1.69821864E12, 13873.0], [1.6982187E12, 14274.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.69821858E12, 0.6666666666666667], [1.69821864E12, 0.25]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.69821858E12, 184942.3333333333], [1.69821864E12, 180147.0], [1.69821852E12, 176593.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69821876E12, 280.47619047619037], [1.69821882E12, 272.5], [1.69821864E12, 271.0], [1.6982187E12, 333.2142857142858]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69821858E12, 268.3333333333333], [1.69821864E12, 270.57142857142856]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69821858E12, 0.33333333333333337], [1.69821864E12, 0.7142857142857143]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.69821876E12, 286.11111111111114], [1.69821864E12, 483.5], [1.6982187E12, 267.50000000000006]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69821858E12, 0.5], [1.69821864E12, 0.4285714285714286], [1.6982187E12, 1.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.6982181E12, 249.2666666666667], [1.6982184E12, 318.5714285714286], [1.69821846E12, 319.6666666666667], [1.69821828E12, 316.53703703703695], [1.69821834E12, 320.6428571428573], [1.69821816E12, 297.6999999999999], [1.69821822E12, 313.91666666666674]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.69821858E12, 860.3333333333334], [1.69821864E12, 860.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.69821858E12, 0.5384615384615384], [1.69821876E12, 1.0909090909090913], [1.69821882E12, 1.5], [1.69821864E12, 0.8888888888888887], [1.6982187E12, 1.5599999999999998], [1.69821852E12, 1.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.69821858E12, 0.33333333333333337], [1.69821864E12, 0.25]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.69821876E12, 321.2], [1.69821864E12, 266.875], [1.6982187E12, 343.05882352941177]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.69821876E12, 0.75], [1.69821864E12, 2.0], [1.6982187E12, 1.6]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69821888E12, 6229.0], [1.69821876E12, 8157.526315789474], [1.69821882E12, 7835.1176470588225], [1.6982187E12, 6975.285714285715]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.69821858E12, 0.6571428571428571], [1.69821864E12, 0.48275862068965514]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69821858E12, 234.33333333333334], [1.69821864E12, 242.85714285714286]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.69821876E12, 2.4000000000000004], [1.69821882E12, 2.0], [1.69821864E12, 1.0], [1.6982187E12, 1.9166666666666663]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.6982181E12, 676.3333333333333], [1.69821816E12, 670.75]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.69821858E12, 254.66666666666666], [1.69821864E12, 232.5]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69821876E12, 7.428571428571428], [1.69821882E12, 1.0], [1.69821864E12, 2.0], [1.6982187E12, 2.428571428571429]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.69821876E12, 264.75], [1.69821864E12, 270.0], [1.6982187E12, 270.4]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.6982181E12, 237.33333333333334], [1.69821858E12, 252.8571428571429], [1.6982184E12, 235.0], [1.69821846E12, 235.5], [1.69821876E12, 233.0], [1.69821834E12, 236.5], [1.69821882E12, 230.0], [1.69821816E12, 234.25], [1.69821864E12, 233.55555555555557], [1.6982187E12, 233.28571428571428]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.69821858E12, 331.46875], [1.6982184E12, 314.1199999999999], [1.69821846E12, 317.1666666666667], [1.69821864E12, 506.1666666666667], [1.69821852E12, 322.23728813559336]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.69821858E12, 1.0], [1.69821864E12, 1.0], [1.6982187E12, 1.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.69821876E12, 1.0], [1.69821864E12, 1.5], [1.6982187E12, 1.5]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.69821876E12, 2.1333333333333337], [1.69821864E12, 1.7499999999999998], [1.6982187E12, 1.7058823529411764]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.6982184E12, 0.5], [1.69821846E12, 0.0], [1.69821834E12, 0.5]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.69821858E12, 0.6666666666666666], [1.69821864E12, 0.25]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69821876E12, 2.0], [1.69821882E12, 1.0], [1.6982187E12, 1.5]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821888E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6982181E12, "maxY": 14272.0, "series": [{"data": [[1.69821876E12, 264.6], [1.69821882E12, 262.0], [1.6982187E12, 267.25]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821834E12, 0.0]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.6982181E12, 0.0], [1.69821816E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821864E12, 0.0], [1.69821852E12, 0.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.6982181E12, 245.0], [1.69821816E12, 245.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.69821858E12, 273.0], [1.69821864E12, 268.25], [1.6982187E12, 265.2]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69821876E12, 266.6666666666667], [1.69821864E12, 267.0], [1.6982187E12, 268.6666666666667]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69821858E12, 233.66666666666666], [1.69821864E12, 246.2857142857143]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.6982184E12, 232.0], [1.69821846E12, 229.0], [1.69821834E12, 229.5]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.69821858E12, 245.0], [1.69821864E12, 247.0], [1.6982187E12, 248.6]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.69821858E12, 382.1666666666667], [1.69821864E12, 226.75]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69821876E12, 274.4], [1.69821882E12, 272.0], [1.6982187E12, 270.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69821888E12, 0.0], [1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.69821858E12, 234.0], [1.69821876E12, 229.86363636363635], [1.69821882E12, 229.5], [1.69821864E12, 239.0], [1.6982187E12, 231.63999999999996], [1.69821852E12, 230.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.69821858E12, 300.125], [1.69821864E12, 281.87931034482773], [1.6982187E12, 274.58000000000015]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.69821858E12, 1268.8285714285714], [1.69821864E12, 1087.3448275862067]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69821858E12, 9067.0], [1.69821864E12, 9917.857142857143], [1.6982187E12, 13185.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.6982181E12, 0.0], [1.69821858E12, 0.0], [1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821876E12, 0.0], [1.69821834E12, 0.0], [1.69821882E12, 0.0], [1.69821816E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69821876E12, 272.0], [1.69821864E12, 265.0], [1.6982187E12, 260.6666666666667]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.6982181E12, 0.0], [1.69821816E12, 0.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.69821876E12, 338.1333333333333], [1.69821882E12, 247.0], [1.69821864E12, 367.5], [1.6982187E12, 305.24999999999994]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.6982181E12, 0.0], [1.69821816E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.6982181E12, 0.0], [1.69821816E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.6982184E12, 260.8333333333333], [1.69821846E12, 251.0], [1.69821834E12, 269.5]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.69821888E12, 0.0], [1.69821876E12, 0.0], [1.69821882E12, 0.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69821858E12, 526.0], [1.69821864E12, 539.5714285714286], [1.6982187E12, 542.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821834E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69821858E12, 254.5], [1.69821864E12, 324.8571428571429], [1.6982187E12, 261.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69821858E12, 237.0], [1.69821864E12, 246.85714285714286]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.6982181E12, 0.0], [1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821828E12, 0.0], [1.69821834E12, 0.0], [1.69821816E12, 0.0], [1.69821822E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.69821876E12, 258.0], [1.69821864E12, 260.5], [1.6982187E12, 275.2692307692308]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.69821876E12, 276.5], [1.69821864E12, 278.0], [1.6982187E12, 275.5]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69821858E12, 235.66666666666666], [1.69821864E12, 238.57142857142858]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.69821858E12, 153.77777777777777], [1.69821864E12, 83.36363636363636]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.69821852E12, 0.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.6982181E12, 267.66666666666663], [1.69821816E12, 264.75]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.69821876E12, 12938.666666666666], [1.69821864E12, 13870.0], [1.6982187E12, 14272.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.69821852E12, 0.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69821876E12, 272.5714285714286], [1.69821882E12, 271.0], [1.69821864E12, 269.0], [1.6982187E12, 330.5714285714286]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69821858E12, 267.3333333333333], [1.69821864E12, 269.7142857142857]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.69821876E12, 284.3333333333334], [1.69821864E12, 481.5], [1.6982187E12, 265.85714285714283]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.6982181E12, 248.6], [1.6982184E12, 318.0571428571428], [1.69821846E12, 319.0], [1.69821828E12, 315.87037037037044], [1.69821834E12, 319.9999999999999], [1.69821816E12, 297.0], [1.69821822E12, 313.4000000000001]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0], [1.69821852E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.69821876E12, 318.73333333333335], [1.69821864E12, 264.625], [1.6982187E12, 340.88235294117646]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69821888E12, 6227.0], [1.69821876E12, 8156.052631578947], [1.69821882E12, 7832.941176470588], [1.6982187E12, 6972.142857142858]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69821858E12, 233.66666666666666], [1.69821864E12, 242.14285714285714]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.6982181E12, 675.8333333333334], [1.69821816E12, 670.5]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.69821858E12, 253.77777777777777], [1.69821864E12, 231.9]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.69821876E12, 263.5], [1.69821864E12, 267.0], [1.6982187E12, 268.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.6982181E12, 236.0], [1.69821858E12, 252.14285714285714], [1.6982184E12, 234.5], [1.69821846E12, 235.0], [1.69821876E12, 230.77777777777777], [1.69821834E12, 236.0], [1.69821882E12, 228.0], [1.69821816E12, 234.0], [1.69821864E12, 232.66666666666666], [1.6982187E12, 231.64285714285717]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.69821858E12, 298.1875000000001], [1.6982184E12, 313.4400000000001], [1.69821846E12, 316.3148148148149], [1.69821864E12, 399.16666666666663], [1.69821852E12, 317.9322033898304]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821834E12, 0.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821888E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6982181E12, "maxY": 3372.3333333333335, "series": [{"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.6982184E12, 1830.3333333333333], [1.69821846E12, 1976.0], [1.69821834E12, 1755.5]], "isOverall": false, "label": "Import", "isController": true}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.6982181E12, 0.0], [1.69821816E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821864E12, 0.0], [1.69821852E12, 0.0]], "isOverall": false, "label": "Get policy publish result-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.6982181E12, 0.0], [1.69821816E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 222.5]], "isOverall": false, "label": "Issue creation", "isController": true}, {"data": [[1.69821858E12, 220.33333333333334], [1.69821864E12, 0.0]], "isOverall": false, "label": "Token associate", "isController": true}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.69821858E12, 442.0], [1.69821864E12, 338.0], [1.6982187E12, 441.2]], "isOverall": false, "label": "Application creation", "isController": true}, {"data": [[1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821834E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.69821858E12, 147.5], [1.69821864E12, 0.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.69821888E12, 0.0], [1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0], [1.69821852E12, 0.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.69821858E12, 55.25], [1.69821864E12, 30.89655172413793], [1.6982187E12, 26.399999999999984]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.69821858E12, 25.085714285714282], [1.69821864E12, 15.241379310344826]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get associate result-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.69821876E12, 221.5], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Role approve", "isController": true}, {"data": [[1.6982181E12, 0.0], [1.69821858E12, 0.0], [1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821876E12, 0.0], [1.69821834E12, 0.0], [1.69821882E12, 0.0], [1.69821816E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Issue approve", "isController": true}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.69821876E12, 71.0], [1.69821864E12, 441.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Device approve", "isController": true}, {"data": [[1.6982181E12, 442.5], [1.69821816E12, 440.25]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.6982181E12, 0.0], [1.69821816E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.6982181E12, 0.0], [1.69821816E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821834E12, 0.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.69821888E12, 439.0], [1.69821876E12, 143.83333333333331], [1.69821882E12, 290.6666666666667]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821834E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 63.714285714285715], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.69821876E12, 217.75], [1.69821864E12, 0.0], [1.6982187E12, 264.0]], "isOverall": false, "label": "Device creation", "isController": true}, {"data": [[1.6982181E12, 0.0], [1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821828E12, 0.0], [1.69821834E12, 0.0], [1.69821816E12, 0.0], [1.69821822E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 17.038461538461537]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.69821858E12, 334.6666666666667], [1.69821864E12, 627.5454545454545]], "isOverall": false, "label": "Grant KYC", "isController": true}, {"data": [[1.69821858E12, 3007.666666666667], [1.69821864E12, 3372.3333333333335], [1.69821852E12, 3098.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.6982181E12, 0.0], [1.69821816E12, 0.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.69821858E12, 1175.1666666666665], [1.69821864E12, 1475.3333333333333], [1.69821852E12, 1339.0]], "isOverall": false, "label": "Publish", "isController": true}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 63.57142857142856]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.69821876E12, 23.666666666666668], [1.69821864E12, 220.5], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.6982181E12, 0.0], [1.6982184E12, 75.57142857142857], [1.69821846E12, 74.0], [1.69821828E12, 73.31481481481484], [1.69821834E12, 78.99999999999999], [1.69821816E12, 52.31999999999998], [1.69821822E12, 72.61666666666669]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.69821858E12, 859.5], [1.69821864E12, 859.5]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0], [1.69821852E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.69821876E12, 58.06666666666667], [1.69821864E12, 0.0], [1.6982187E12, 77.6470588235294]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.69821888E12, 0.0], [1.69821876E12, 45.421052631578945], [1.69821882E12, 77.11764705882354], [1.6982187E12, 0.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.6982181E12, 442.5], [1.69821816E12, 440.25]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.69821858E12, 24.27777777777778], [1.69821864E12, 0.0]], "isOverall": false, "label": "Get associate result", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.6982181E12, 0.0], [1.69821858E12, 0.0], [1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821876E12, 0.0], [1.69821834E12, 0.0], [1.69821882E12, 0.0], [1.69821816E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.69821858E12, 55.62500000000001], [1.6982184E12, 70.03999999999999], [1.69821846E12, 73.22222222222223], [1.69821864E12, 149.0], [1.69821852E12, 75.20338983050848]], "isOverall": false, "label": "Get policy publish result", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821834E12, 0.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821864E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.69821876E12, 0.0], [1.69821882E12, 0.0], [1.6982187E12, 0.0]], "isOverall": false, "label": "Get issues-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821888E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6982181E12, "maxY": 15005.0, "series": [{"data": [[1.69821858E12, 13568.0], [1.69821888E12, 11189.0], [1.69821828E12, 680.0], [1.69821834E12, 685.0], [1.69821864E12, 14755.0], [1.6982187E12, 15005.0], [1.6982181E12, 691.0], [1.6982184E12, 674.0], [1.69821846E12, 679.0], [1.69821876E12, 13510.0], [1.69821882E12, 12144.0], [1.69821816E12, 673.0], [1.69821822E12, 676.0], [1.69821852E12, 686.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69821858E12, 454.20000000000005], [1.69821888E12, 11189.0], [1.69821828E12, 253.40000000000003], [1.69821834E12, 259.5], [1.69821864E12, 310.5], [1.6982187E12, 277.0], [1.6982181E12, 280.50000000000006], [1.6982184E12, 255.60000000000002], [1.69821846E12, 256.7], [1.69821876E12, 480.80000000000007], [1.69821882E12, 11248.3], [1.69821816E12, 262.8], [1.69821822E12, 259.5], [1.69821852E12, 251.9]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69821858E12, 11229.420000000002], [1.69821888E12, 11189.0], [1.69821828E12, 679.37], [1.69821834E12, 683.25], [1.69821864E12, 13031.95], [1.6982187E12, 13731.159999999976], [1.6982181E12, 691.0], [1.6982184E12, 674.0], [1.69821846E12, 678.01], [1.69821876E12, 12525.410000000005], [1.69821882E12, 12144.0], [1.69821816E12, 672.67], [1.69821822E12, 674.74], [1.69821852E12, 685.79]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69821858E12, 699.6500000000003], [1.69821888E12, 11189.0], [1.69821828E12, 669.0], [1.69821834E12, 668.0], [1.69821864E12, 692.75], [1.6982187E12, 696.9], [1.6982181E12, 672.1], [1.6982184E12, 665.3], [1.69821846E12, 669.7], [1.69821876E12, 11010.249999999998], [1.69821882E12, 11839.4], [1.69821816E12, 668.0], [1.69821822E12, 661.95], [1.69821852E12, 672.8499999999999]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69821858E12, 0.0], [1.69821888E12, 2.0], [1.69821828E12, 0.0], [1.69821834E12, 0.0], [1.69821864E12, 0.0], [1.6982187E12, 0.0], [1.6982181E12, 0.0], [1.6982184E12, 0.0], [1.69821846E12, 0.0], [1.69821876E12, 0.0], [1.69821882E12, 1.0], [1.69821816E12, 0.0], [1.69821822E12, 0.0], [1.69821852E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69821858E12, 113.0], [1.69821888E12, 635.5], [1.69821828E12, 122.0], [1.69821834E12, 114.5], [1.69821864E12, 119.5], [1.6982187E12, 127.5], [1.6982181E12, 117.0], [1.6982184E12, 114.0], [1.69821846E12, 116.0], [1.69821876E12, 174.5], [1.69821882E12, 116.5], [1.69821816E12, 120.5], [1.69821822E12, 115.0], [1.69821852E12, 117.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821888E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 114.0, "minX": 2.0, "maxY": 174.5, "series": [{"data": [[8.0, 119.5], [4.0, 115.0], [2.0, 121.5], [16.0, 114.0], [18.0, 115.5], [10.0, 115.0], [20.0, 174.5], [6.0, 120.0], [12.0, 126.0], [14.0, 115.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 20.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 114.5, "series": [{"data": [[8.0, 0.0], [4.0, 0.0], [2.0, 113.0], [16.0, 0.0], [18.0, 114.5], [10.0, 0.0], [20.0, 113.0], [6.0, 0.0], [12.0, 0.0], [14.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 20.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.6982181E12, "maxY": 8.25, "series": [{"data": [[1.69821858E12, 5.15], [1.69821888E12, 0.06666666666666667], [1.69821828E12, 1.8166666666666667], [1.69821834E12, 2.05], [1.69821864E12, 8.25], [1.6982187E12, 7.333333333333333], [1.6982181E12, 1.3], [1.6982184E12, 2.6], [1.69821846E12, 2.2], [1.69821876E12, 5.066666666666666], [1.69821882E12, 0.8], [1.69821816E12, 2.2], [1.69821822E12, 2.0], [1.69821852E12, 2.033333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821888E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.6982181E12, "maxY": 8.033333333333333, "series": [{"data": [[1.69821858E12, 4.833333333333333], [1.69821888E12, 0.06666666666666667], [1.69821828E12, 1.8], [1.69821834E12, 2.033333333333333], [1.69821864E12, 8.033333333333333], [1.6982187E12, 7.333333333333333], [1.6982181E12, 1.2], [1.6982184E12, 2.5], [1.69821846E12, 2.1666666666666665], [1.69821876E12, 5.1], [1.69821882E12, 0.8333333333333334], [1.69821816E12, 2.1333333333333333], [1.69821822E12, 2.0], [1.69821852E12, 2.0]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.69821858E12, 0.1], [1.69821864E12, 0.06666666666666667]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.6982181E12, 0.1], [1.69821858E12, 0.2], [1.6982184E12, 0.1], [1.69821846E12, 0.03333333333333333], [1.69821834E12, 0.03333333333333333], [1.69821816E12, 0.06666666666666667], [1.69821864E12, 0.13333333333333333]], "isOverall": false, "label": "202", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69821888E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6982181E12, "maxY": 1.0, "series": [{"data": [[1.6982181E12, 0.1], [1.69821816E12, 0.06666666666666667]], "isOverall": false, "label": "Get tenant-success", "isController": true}, {"data": [[1.69821858E12, 0.03333333333333333], [1.69821864E12, 0.11666666666666667], [1.6982187E12, 0.016666666666666666]], "isOverall": false, "label": "Choose registrant-success", "isController": false}, {"data": [[1.69821858E12, 0.05], [1.69821864E12, 0.11666666666666667]], "isOverall": false, "label": "Get hedera id-0-success", "isController": false}, {"data": [[1.69821876E12, 0.1], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.05]], "isOverall": false, "label": "Get result for device approve-success", "isController": true}, {"data": [[1.69821876E12, 0.35], [1.69821882E12, 0.03333333333333333], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.23333333333333334]], "isOverall": false, "label": "Get issue creation status-0-success", "isController": false}, {"data": [[1.69821876E12, 0.35], [1.69821882E12, 0.03333333333333333], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.23333333333333334]], "isOverall": false, "label": "Get issue creation status-success", "isController": false}, {"data": [[1.6982181E12, 0.1], [1.69821858E12, 0.11666666666666667], [1.6982184E12, 0.1], [1.69821846E12, 0.03333333333333333], [1.69821876E12, 0.15], [1.69821834E12, 0.03333333333333333], [1.69821882E12, 0.016666666666666666], [1.69821816E12, 0.06666666666666667], [1.69821864E12, 0.15], [1.6982187E12, 0.23333333333333334]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.69821876E12, 0.08333333333333333], [1.69821882E12, 0.016666666666666666], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Get issues-0-success", "isController": false}, {"data": [[1.6982181E12, 0.25], [1.6982184E12, 0.5833333333333334], [1.69821846E12, 0.1], [1.69821828E12, 0.9], [1.69821834E12, 0.9333333333333333], [1.69821816E12, 0.8333333333333334], [1.69821822E12, 1.0]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.6982184E12, 0.1], [1.69821846E12, 0.03333333333333333], [1.69821834E12, 0.03333333333333333]], "isOverall": false, "label": "Import-success", "isController": true}, {"data": [[1.69821858E12, 0.1], [1.69821864E12, 0.06666666666666667]], "isOverall": false, "label": "Token associate-success", "isController": true}, {"data": [[1.69821876E12, 0.05], [1.69821864E12, 0.16666666666666666], [1.6982187E12, 0.43333333333333335]], "isOverall": false, "label": "Get block for approve result-0-success", "isController": false}, {"data": [[1.69821876E12, 0.25], [1.69821864E12, 0.13333333333333333], [1.6982187E12, 0.2833333333333333]], "isOverall": false, "label": "Get device creation status-success", "isController": false}, {"data": [[1.69821876E12, 0.03333333333333333], [1.69821864E12, 0.06666666666666667], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Role approve-success", "isController": true}, {"data": [[1.69821876E12, 0.25], [1.69821864E12, 0.13333333333333333], [1.6982187E12, 0.2833333333333333]], "isOverall": false, "label": "Get device creation status-0-success", "isController": false}, {"data": [[1.69821858E12, 0.016666666666666666], [1.69821864E12, 0.06666666666666667], [1.6982187E12, 0.08333333333333333]], "isOverall": false, "label": "Application creation-success", "isController": true}, {"data": [[1.69821876E12, 0.25], [1.69821882E12, 0.016666666666666666], [1.69821864E12, 0.03333333333333333], [1.6982187E12, 0.2]], "isOverall": false, "label": "Approve device-success", "isController": false}, {"data": [[1.69821876E12, 0.05], [1.69821864E12, 0.03333333333333333], [1.6982187E12, 0.08333333333333333]], "isOverall": false, "label": "Create device-0-success", "isController": false}, {"data": [[1.6982184E12, 0.1], [1.69821846E12, 0.03333333333333333], [1.69821834E12, 0.03333333333333333]], "isOverall": false, "label": "Publish Policy-0-success", "isController": false}, {"data": [[1.69821858E12, 0.1], [1.69821864E12, 0.06666666666666667]], "isOverall": false, "label": "Associate token-0-success", "isController": false}, {"data": [[1.6982181E12, 0.1], [1.69821816E12, 0.06666666666666667]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.69821858E12, 0.5833333333333334], [1.69821864E12, 0.48333333333333334]], "isOverall": false, "label": "Get tokens-success", "isController": false}, {"data": [[1.69821858E12, 0.1], [1.69821864E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for kyc grant-0-success", "isController": false}, {"data": [[1.6982184E12, 0.1], [1.69821846E12, 0.03333333333333333], [1.69821834E12, 0.03333333333333333]], "isOverall": false, "label": "Publish Policy-success", "isController": false}, {"data": [[1.69821858E12, 0.21666666666666667], [1.69821876E12, 0.36666666666666664], [1.69821882E12, 0.03333333333333333], [1.69821864E12, 0.45], [1.6982187E12, 0.4166666666666667], [1.69821852E12, 0.016666666666666666]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.69821888E12, 0.016666666666666666], [1.69821876E12, 0.1], [1.69821882E12, 0.05]], "isOverall": false, "label": "Token minting verify-success", "isController": true}, {"data": [[1.69821858E12, 0.016666666666666666], [1.69821864E12, 0.06666666666666667], [1.6982187E12, 0.08333333333333333]], "isOverall": false, "label": "Approve application-success", "isController": false}, {"data": [[1.69821858E12, 0.1], [1.69821864E12, 0.06666666666666667]], "isOverall": false, "label": "Associate token-success", "isController": false}, {"data": [[1.69821858E12, 0.05], [1.69821864E12, 0.11666666666666667]], "isOverall": false, "label": "Get hedera id-success", "isController": false}, {"data": [[1.69821876E12, 0.03333333333333333], [1.69821864E12, 0.06666666666666667], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Get result for app approve-success", "isController": true}, {"data": [[1.69821876E12, 0.03333333333333333], [1.69821864E12, 0.06666666666666667], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Get device schema-0-success", "isController": false}, {"data": [[1.6982181E12, 0.1], [1.69821816E12, 0.06666666666666667]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.69821876E12, 0.08333333333333333], [1.69821882E12, 0.016666666666666666], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Get issue approve result-success", "isController": false}, {"data": [[1.69821876E12, 0.05], [1.69821864E12, 0.03333333333333333], [1.6982187E12, 0.08333333333333333]], "isOverall": false, "label": "Create device-success", "isController": false}, {"data": [[1.69821876E12, 0.1], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.05]], "isOverall": false, "label": "Device approve-success", "isController": true}, {"data": [[1.69821876E12, 0.06666666666666667], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.08333333333333333]], "isOverall": false, "label": "Get devices-0-success", "isController": false}, {"data": [[1.69821876E12, 0.08333333333333333], [1.69821882E12, 0.016666666666666666], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Get issues-success", "isController": false}, {"data": [[1.69821858E12, 0.05], [1.69821864E12, 0.11666666666666667]], "isOverall": false, "label": "Get block for waiting device-success", "isController": false}, {"data": [[1.69821876E12, 0.08333333333333333], [1.69821882E12, 0.016666666666666666], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Issue approve-success", "isController": true}, {"data": [[1.6982181E12, 0.1], [1.69821816E12, 0.06666666666666667]], "isOverall": false, "label": "Get Tenant Id-success", "isController": false}, {"data": [[1.6982181E12, 0.1], [1.69821816E12, 0.06666666666666667]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.69821858E12, 0.13333333333333333], [1.69821864E12, 0.9666666666666667], [1.6982187E12, 0.8333333333333334]], "isOverall": false, "label": "Get application creation status-success", "isController": false}, {"data": [[1.69821858E12, 0.5833333333333334], [1.69821864E12, 0.48333333333333334]], "isOverall": false, "label": "Get tokens-0-success", "isController": false}, {"data": [[1.6982184E12, 0.1], [1.69821846E12, 0.03333333333333333], [1.69821834E12, 0.03333333333333333]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.69821858E12, 0.5333333333333333], [1.6982184E12, 0.4166666666666667], [1.69821846E12, 0.9], [1.69821864E12, 0.1], [1.69821852E12, 0.9833333333333333]], "isOverall": false, "label": "Get policy publish result-0-success", "isController": false}, {"data": [[1.69821858E12, 0.05], [1.69821864E12, 0.11666666666666667]], "isOverall": false, "label": "Get block for waiting app creation-0-success", "isController": false}, {"data": [[1.69821858E12, 0.03333333333333333], [1.69821864E12, 0.11666666666666667], [1.6982187E12, 0.016666666666666666]], "isOverall": false, "label": "Get application schema-0-success", "isController": false}, {"data": [[1.69821858E12, 0.3], [1.69821864E12, 0.16666666666666666]], "isOverall": false, "label": "Get associate result-success", "isController": false}, {"data": [[1.6982181E12, 0.1], [1.69821816E12, 0.06666666666666667]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.69821858E12, 0.05], [1.69821864E12, 0.11666666666666667]], "isOverall": false, "label": "Get block for waiting issue request-0-success", "isController": false}, {"data": [[1.6982181E12, 0.25], [1.6982184E12, 0.5833333333333334], [1.69821846E12, 0.1], [1.69821828E12, 0.9], [1.69821834E12, 0.9333333333333333], [1.69821816E12, 0.8333333333333334], [1.69821822E12, 1.0]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.69821858E12, 0.03333333333333333], [1.69821864E12, 0.11666666666666667], [1.6982187E12, 0.016666666666666666]], "isOverall": false, "label": "Choose registrant-0-success", "isController": false}, {"data": [[1.69821858E12, 0.016666666666666666], [1.69821864E12, 0.06666666666666667], [1.6982187E12, 0.08333333333333333]], "isOverall": false, "label": "Get applications-success", "isController": false}, {"data": [[1.69821876E12, 0.06666666666666667], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.08333333333333333]], "isOverall": false, "label": "Get devices-success", "isController": false}, {"data": [[1.69821858E12, 0.3], [1.69821864E12, 0.16666666666666666]], "isOverall": false, "label": "Get associate result-0-success", "isController": false}, {"data": [[1.69821876E12, 0.1], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.05]], "isOverall": false, "label": "Get device issue row-success", "isController": false}, {"data": [[1.69821858E12, 0.05], [1.69821864E12, 0.11666666666666667]], "isOverall": false, "label": "Get block for waiting app creation-success", "isController": false}, {"data": [[1.69821888E12, 0.03333333333333333], [1.69821876E12, 0.31666666666666665], [1.69821882E12, 0.2833333333333333], [1.6982187E12, 0.11666666666666667]], "isOverall": false, "label": "Balance verify-success", "isController": false}, {"data": [[1.69821858E12, 0.1], [1.69821864E12, 0.05], [1.69821852E12, 0.016666666666666666]], "isOverall": false, "label": "Publish-success", "isController": true}, {"data": [[1.69821876E12, 0.3], [1.69821864E12, 0.03333333333333333], [1.6982187E12, 0.23333333333333334]], "isOverall": false, "label": "Get device approve result-success", "isController": false}, {"data": [[1.69821876E12, 0.08333333333333333], [1.69821882E12, 0.016666666666666666], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Issue creation-success", "isController": true}, {"data": [[1.69821858E12, 0.5333333333333333], [1.6982184E12, 0.4166666666666667], [1.69821846E12, 0.9], [1.69821864E12, 0.1], [1.69821852E12, 0.9833333333333333]], "isOverall": false, "label": "Get policy publish result-success", "isController": false}, {"data": [[1.69821858E12, 0.1], [1.69821864E12, 0.05], [1.69821852E12, 0.016666666666666666]], "isOverall": false, "label": "Policy import and publish-success", "isController": true}, {"data": [[1.6982181E12, 0.1], [1.69821858E12, 0.11666666666666667], [1.6982184E12, 0.1], [1.69821846E12, 0.03333333333333333], [1.69821876E12, 0.15], [1.69821834E12, 0.03333333333333333], [1.69821882E12, 0.016666666666666666], [1.69821816E12, 0.06666666666666667], [1.69821864E12, 0.15], [1.6982187E12, 0.23333333333333334]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.6982184E12, 0.1], [1.69821846E12, 0.03333333333333333], [1.69821834E12, 0.03333333333333333]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.69821858E12, 0.21666666666666667], [1.69821876E12, 0.36666666666666664], [1.69821882E12, 0.03333333333333333], [1.69821864E12, 0.45], [1.6982187E12, 0.4166666666666667], [1.69821852E12, 0.016666666666666666]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.69821858E12, 0.1], [1.69821864E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for kyc grant-success", "isController": false}, {"data": [[1.69821858E12, 0.03333333333333333], [1.69821864E12, 0.11666666666666667], [1.6982187E12, 0.016666666666666666]], "isOverall": false, "label": "Create application-0-success", "isController": false}, {"data": [[1.69821876E12, 0.1], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.05]], "isOverall": false, "label": "Get issue schema-success", "isController": false}, {"data": [[1.69821876E12, 0.08333333333333333], [1.69821882E12, 0.016666666666666666], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Get issue approve result-0-success", "isController": false}, {"data": [[1.69821858E12, 0.1], [1.69821864E12, 0.06666666666666667]], "isOverall": false, "label": "Grant KYC-0-success", "isController": false}, {"data": [[1.69821876E12, 0.08333333333333333], [1.69821882E12, 0.016666666666666666], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Get result for issue request approve-success", "isController": true}, {"data": [[1.69821876E12, 0.06666666666666667], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.08333333333333333]], "isOverall": false, "label": "Device creation-success", "isController": true}, {"data": [[1.69821858E12, 0.05], [1.69821864E12, 0.11666666666666667]], "isOverall": false, "label": "Get block for waiting app approve-0-success", "isController": false}, {"data": [[1.69821858E12, 0.13333333333333333], [1.69821864E12, 0.9666666666666667], [1.6982187E12, 0.8333333333333334]], "isOverall": false, "label": "Get application creation status-0-success", "isController": false}, {"data": [[1.69821876E12, 0.1], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.05]], "isOverall": false, "label": "Get issue schema-0-success", "isController": false}, {"data": [[1.69821876E12, 0.25], [1.69821882E12, 0.016666666666666666], [1.69821864E12, 0.03333333333333333], [1.6982187E12, 0.2]], "isOverall": false, "label": "Approve device-0-success", "isController": false}, {"data": [[1.69821858E12, 0.03333333333333333], [1.69821864E12, 0.11666666666666667], [1.6982187E12, 0.016666666666666666]], "isOverall": false, "label": "Create application-success", "isController": false}, {"data": [[1.69821876E12, 0.03333333333333333], [1.69821864E12, 0.06666666666666667], [1.6982187E12, 0.06666666666666667]], "isOverall": false, "label": "Get device schema-success", "isController": false}, {"data": [[1.69821876E12, 0.3], [1.69821864E12, 0.03333333333333333], [1.6982187E12, 0.23333333333333334]], "isOverall": false, "label": "Get device approve result-0-success", "isController": false}, {"data": [[1.69821858E12, 0.05], [1.69821864E12, 0.11666666666666667]], "isOverall": false, "label": "Get block for waiting issue request-success", "isController": false}, {"data": [[1.6982181E12, 0.1], [1.69821816E12, 0.06666666666666667]], "isOverall": false, "label": "Get Tenant Id-0-success", "isController": false}, {"data": [[1.69821888E12, 0.03333333333333333], [1.69821876E12, 0.31666666666666665], [1.69821882E12, 0.2833333333333333], [1.6982187E12, 0.11666666666666667]], "isOverall": false, "label": "Balance verify-0-success", "isController": false}, {"data": [[1.69821858E12, 0.15], [1.69821864E12, 0.18333333333333332]], "isOverall": false, "label": "Grant KYC-success", "isController": true}, {"data": [[1.69821858E12, 0.05], [1.69821864E12, 0.11666666666666667]], "isOverall": false, "label": "Get block for waiting app approve-success", "isController": false}, {"data": [[1.69821858E12, 0.03333333333333333], [1.69821864E12, 0.11666666666666667], [1.6982187E12, 0.016666666666666666]], "isOverall": false, "label": "Get application schema-success", "isController": false}, {"data": [[1.69821858E12, 0.05], [1.69821864E12, 0.11666666666666667]], "isOverall": false, "label": "Get block for waiting device-0-success", "isController": false}, {"data": [[1.69821858E12, 0.016666666666666666], [1.69821864E12, 0.06666666666666667], [1.6982187E12, 0.08333333333333333]], "isOverall": false, "label": "Approve application-0-success", "isController": false}, {"data": [[1.69821876E12, 0.05], [1.69821864E12, 0.16666666666666666], [1.6982187E12, 0.43333333333333335]], "isOverall": false, "label": "Get block for approve result-success", "isController": false}, {"data": [[1.69821876E12, 0.1], [1.69821864E12, 0.016666666666666666], [1.6982187E12, 0.05]], "isOverall": false, "label": "Get device issue row-0-success", "isController": false}, {"data": [[1.69821858E12, 0.016666666666666666], [1.69821864E12, 0.06666666666666667], [1.6982187E12, 0.08333333333333333]], "isOverall": false, "label": "Get applications-0-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821888E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.6982181E12, "maxY": 8.766666666666667, "series": [{"data": [[1.69821858E12, 5.5], [1.69821888E12, 0.08333333333333333], [1.69821828E12, 1.8], [1.69821834E12, 2.1], [1.69821864E12, 8.766666666666667], [1.6982187E12, 7.933333333333334], [1.6982181E12, 1.4], [1.6982184E12, 2.7], [1.69821846E12, 2.2333333333333334], [1.69821876E12, 5.783333333333333], [1.69821882E12, 0.9333333333333333], [1.69821816E12, 2.2666666666666666], [1.69821822E12, 2.0], [1.69821852E12, 2.033333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69821888E12, "title": "Total Transactions Per Second"}},
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
