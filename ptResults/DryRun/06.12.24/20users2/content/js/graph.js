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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 105.0, "series": [{"data": [[0.0, 20.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1100.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [900.0, 14.0], [1000.0, 3.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[300.0, 6.0], [700.0, 2.0], [200.0, 27.0], [400.0, 2.0], [800.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[2500.0, 1.0], [700.0, 15.0], [800.0, 4.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[700.0, 15.0], [200.0, 20.0], [800.0, 4.0], [1000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[0.0, 40.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 17.0], [500.0, 1.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[300.0, 11.0], [700.0, 1.0], [200.0, 3.0], [400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[2000.0, 20.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[2000.0, 20.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[300.0, 1.0], [200.0, 18.0], [2000.0, 1.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[0.0, 40.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1200.0, 1.0], [1600.0, 1.0], [900.0, 13.0], [1000.0, 5.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[8300.0, 2.0], [9000.0, 2.0], [8900.0, 1.0], [9700.0, 1.0], [9400.0, 2.0], [9800.0, 1.0], [9900.0, 1.0], [10500.0, 1.0], [11100.0, 1.0], [11500.0, 1.0], [12300.0, 1.0], [13300.0, 1.0], [14900.0, 1.0], [24300.0, 1.0], [7600.0, 1.0], [7700.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[300.0, 13.0], [600.0, 1.0], [1300.0, 1.0], [700.0, 6.0], [200.0, 73.0], [800.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0], [200.0, 17.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[600.0, 1.0], [500.0, 19.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1100.0, 2.0], [600.0, 8.0], [1300.0, 1.0], [700.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[600.0, 1.0], [700.0, 14.0], [3100.0, 1.0], [800.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[300.0, 3.0], [200.0, 12.0], [400.0, 2.0], [900.0, 3.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[2100.0, 1.0], [2000.0, 19.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[300.0, 11.0], [200.0, 9.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[33000.0, 1.0], [33200.0, 2.0], [33700.0, 1.0], [34100.0, 3.0], [34300.0, 2.0], [32800.0, 1.0], [34600.0, 1.0], [33500.0, 2.0], [34400.0, 1.0], [35700.0, 1.0], [35300.0, 1.0], [35400.0, 1.0], [38100.0, 1.0], [37700.0, 1.0], [40600.0, 1.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[8600.0, 1.0], [8500.0, 1.0], [8400.0, 1.0], [9100.0, 1.0], [9500.0, 1.0], [9300.0, 1.0], [9600.0, 1.0], [9700.0, 1.0], [9900.0, 1.0], [10000.0, 1.0], [10200.0, 1.0], [10800.0, 1.0], [11400.0, 1.0], [11700.0, 1.0], [12600.0, 1.0], [13600.0, 1.0], [16000.0, 1.0], [25100.0, 1.0], [7800.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[300.0, 3.0], [3100.0, 1.0], [200.0, 28.0], [3300.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[15500.0, 2.0], [15600.0, 3.0], [15700.0, 1.0], [15800.0, 1.0], [15400.0, 1.0], [16200.0, 1.0], [16100.0, 1.0], [16000.0, 1.0], [16300.0, 2.0], [16700.0, 2.0], [17000.0, 1.0], [17100.0, 1.0], [16800.0, 1.0], [17400.0, 1.0], [17500.0, 1.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[2000.0, 40.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[2000.0, 20.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[4100.0, 3.0], [4200.0, 3.0], [4500.0, 1.0], [4800.0, 1.0], [5700.0, 1.0], [5800.0, 1.0], [3500.0, 1.0], [3600.0, 7.0], [3800.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[14700.0, 3.0], [14800.0, 2.0], [14400.0, 1.0], [14600.0, 1.0], [14900.0, 3.0], [15100.0, 1.0], [15000.0, 1.0], [15700.0, 1.0], [15600.0, 1.0], [15800.0, 1.0], [15400.0, 3.0], [18600.0, 1.0], [21100.0, 1.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 105.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[0.0, 41.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[0.0, 34.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[2400.0, 6.0], [2500.0, 12.0], [2600.0, 2.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[2000.0, 20.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[0.0, 60.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[0.0, 40.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[11500.0, 1.0], [11600.0, 1.0], [12000.0, 1.0], [12400.0, 1.0], [13100.0, 1.0], [12900.0, 1.0], [13400.0, 1.0], [13700.0, 1.0], [13500.0, 1.0], [14100.0, 2.0], [13900.0, 1.0], [14400.0, 1.0], [14500.0, 1.0], [15900.0, 1.0], [17200.0, 1.0], [17100.0, 1.0], [16900.0, 1.0], [23900.0, 1.0], [30900.0, 1.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[4700.0, 4.0], [4800.0, 2.0], [4900.0, 1.0], [5000.0, 1.0], [5100.0, 1.0], [5400.0, 3.0], [5500.0, 1.0], [6000.0, 2.0], [5900.0, 1.0], [6200.0, 1.0], [6300.0, 1.0], [6600.0, 1.0], [6700.0, 1.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[600.0, 5.0], [700.0, 2.0], [500.0, 13.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[4800.0, 1.0], [2600.0, 2.0], [2800.0, 7.0], [2700.0, 4.0], [2900.0, 3.0], [3000.0, 1.0], [3100.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1200.0, 3.0], [900.0, 10.0], [1000.0, 7.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[2300.0, 2.0], [300.0, 18.0], [600.0, 1.0], [1200.0, 1.0], [700.0, 13.0], [1400.0, 1.0], [200.0, 56.0], [400.0, 6.0], [800.0, 3.0], [1700.0, 1.0], [900.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[2000.0, 20.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[2400.0, 10.0], [2500.0, 10.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[0.0, 97.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[300.0, 5.0], [1300.0, 1.0], [700.0, 13.0], [800.0, 3.0], [200.0, 15.0], [400.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 7.0], [700.0, 1.0], [200.0, 49.0], [400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[10700.0, 14.0], [10800.0, 6.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[600.0, 14.0], [1400.0, 1.0], [700.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 40600.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 231.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 1466.0, "series": [{"data": [[0.0, 1466.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 263.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 231.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349606E12, "maxY": 19.80405405405404, "series": [{"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.73349606E12, 1.0]], "isOverall": false, "label": "Tenant creation", "isController": false}, {"data": [[1.7334963E12, 19.80405405405404], [1.7334966E12, 2.4324324324324325], [1.73349612E12, 7.928888888888885], [1.73349642E12, 14.375912408759124], [1.73349624E12, 18.315649867374017], [1.73349654E12, 4.634146341463415], [1.73349606E12, 3.0860215053763445], [1.73349636E12, 18.504983388704314], [1.73349618E12, 13.466887417218539], [1.73349648E12, 9.027586206896554]], "isOverall": false, "label": "Full Dry Run Flow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7334966E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 38839.666666666664, "series": [{"data": [[2.0, 1.0], [8.0, 2.0], [9.0, 3.0], [10.0, 2.0], [11.0, 1.0], [3.0, 2.0], [12.0, 2.0], [13.0, 2.0], [14.0, 2.0], [15.0, 2.0], [1.0, 2.0], [4.0, 2.0], [16.0, 1.0], [17.0, 2.0], [18.0, 1.0], [19.0, 2.0], [5.0, 1.0], [20.0, 0.0], [6.0, 3.0], [7.0, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[10.5, 1.6499999999999997]], "isOverall": false, "label": "Invite user-0-Aggregated", "isController": false}, {"data": [[8.0, 967.0], [9.0, 956.0], [10.0, 964.0], [11.0, 950.0], [12.0, 1015.0], [13.0, 944.0], [14.0, 942.0], [15.0, 967.0], [16.0, 1122.0], [17.0, 943.0], [18.0, 1026.0], [19.0, 1590.0], [20.0, 964.1666666666667], [6.0, 996.0], [7.0, 928.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[14.750000000000002, 1004.7500000000001]], "isOverall": false, "label": "WS open for sr link-Aggregated", "isController": false}, {"data": [[8.0, 332.0], [9.0, 272.0], [10.0, 326.25], [11.0, 271.0], [12.0, 289.0], [13.0, 267.0], [14.0, 286.0], [15.0, 557.5], [16.0, 553.0], [17.0, 280.5], [18.0, 276.3333333333333], [19.0, 904.5], [5.0, 268.0], [20.0, 305.68750000000006], [6.0, 273.0], [7.0, 268.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[15.825, 353.55000000000007]], "isOverall": false, "label": "Agree terms-Aggregated", "isController": false}, {"data": [[8.0, 773.0], [16.0, 794.0], [9.0, 793.0], [18.0, 1690.5], [19.0, 709.0], [10.0, 808.0], [20.0, 770.4285714285714], [11.0, 711.0], [13.0, 800.0], [7.0, 744.0], [14.0, 729.0], [15.0, 764.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[15.550000000000002, 859.95]], "isOverall": false, "label": "Link SR profile-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [8.0, 2.0], [9.0, 2.0], [10.0, 3.0], [11.0, 1.0], [3.0, 1.0], [12.0, 0.0], [13.0, 2.0], [14.0, 0.0], [15.0, 1.0], [1.0, 1.0], [4.0, 1.0], [16.0, 3.0], [17.0, 2.0], [18.0, 2.0], [19.0, 2.0], [5.0, 1.0], [20.0, 1.0], [6.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[10.5, 1.5]], "isOverall": false, "label": "Invite sr-0-Aggregated", "isController": false}, {"data": [[8.0, 2.0], [17.0, 2.0], [18.0, 3.0], [19.0, 1.0], [20.0, 2.2222222222222223], [11.0, 1.0], [12.0, 3.0], [6.0, 3.0], [15.0, 1.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[16.4, 2.0999999999999996]], "isOverall": false, "label": "Link user profile-0-Aggregated", "isController": false}, {"data": [[8.0, 3.0], [17.0, 2.5], [18.0, 2.0], [9.0, 3.0], [19.0, 2.0], [20.0, 1.4], [5.0, 3.0], [12.0, 1.0], [13.0, 1.0], [14.0, 3.0], [15.0, 1.5]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[14.549999999999997, 2.05]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[2.0, 479.5], [8.0, 485.5], [9.0, 517.0], [10.0, 512.5], [11.0, 483.0], [3.0, 495.0], [12.0, 499.5], [13.0, 499.5], [14.0, 555.0], [15.0, 521.0], [1.0, 420.0], [4.0, 485.0], [16.0, 491.5], [17.0, 483.0], [18.0, 1436.0], [19.0, 486.5], [5.0, 636.5], [20.0, 521.5], [6.0, 526.0], [7.0, 504.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[10.26829268292683, 548.6585365853658]], "isOverall": false, "label": "Get Admin Access Token-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 3.0], [10.0, 3.0], [11.0, 0.0], [12.0, 1.0], [13.0, 1.0], [14.0, 0.0], [15.0, 2.0], [16.0, 2.0], [17.0, 2.0], [18.0, 1.6666666666666667], [19.0, 2.0], [5.0, 1.0], [20.0, 2.1249999999999996], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[15.825, 1.9]], "isOverall": false, "label": "Agree terms-0-Aggregated", "isController": false}, {"data": [[8.0, 288.0], [17.0, 278.0], [18.0, 320.0], [9.0, 253.0], [19.0, 268.5], [20.0, 254.8], [5.0, 419.0], [12.0, 255.0], [13.0, 258.0], [14.0, 264.0], [15.0, 412.5]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[14.549999999999997, 304.34999999999997]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[2.0, 395.0], [8.0, 385.0], [9.0, 366.0], [10.0, 302.0], [11.0, 283.0], [3.0, 493.0], [12.0, 402.0], [13.0, 374.0], [14.0, 325.0], [15.0, 420.0], [1.0, 288.0], [4.0, 366.0], [16.0, 433.0], [17.0, 290.0], [18.0, 377.0], [19.0, 317.0], [5.0, 367.0], [20.0, 579.0], [6.0, 737.0], [7.0, 329.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[10.5, 391.4]], "isOverall": false, "label": "Invite sr-Aggregated", "isController": false}, {"data": [[16.0, 2061.0], [17.0, 2074.0], [18.0, 2058.0], [19.0, 2071.0], [20.0, 2056.2], [13.0, 2078.0], [14.0, 2053.0], [15.0, 2046.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[18.050000000000004, 2059.8500000000004]], "isOverall": false, "label": "Generate user keys-Aggregated", "isController": false}, {"data": [[2.0, 2068.0], [8.0, 2073.0], [9.0, 2066.0], [10.0, 2078.0], [11.0, 2064.0], [3.0, 2072.0], [12.0, 2067.0], [13.0, 2067.0], [14.0, 2048.0], [15.0, 2071.0], [1.0, 2063.0], [4.0, 2033.0], [16.0, 2068.0], [17.0, 2060.0], [19.0, 2073.0], [5.0, 2062.0], [20.0, 2076.0], [6.0, 2072.0], [7.0, 2046.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[10.549999999999999, 2065.0]], "isOverall": false, "label": "Generate sr keys-Aggregated", "isController": false}, {"data": [[8.0, 247.5], [2.0, 247.5], [10.0, 285.5], [12.0, 289.0], [3.0, 255.0], [13.0, 247.0], [14.0, 277.0], [15.0, 248.0], [16.0, 277.0], [17.0, 243.0], [18.0, 247.0], [20.0, 247.5], [5.0, 266.0], [7.0, 2027.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[11.0, 347.3]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[1.0, 1660.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.0, 1660.0]], "isOverall": false, "label": "Tenant creation flow-Aggregated", "isController": true}, {"data": [[2.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 0.0], [3.0, 1.0], [12.0, 0.0], [13.0, 1.0], [14.0, 1.0], [15.0, 1.0], [1.0, 1.0], [4.0, 1.0], [16.0, 1.0], [17.0, 0.6666666666666666], [18.0, 1.0], [19.0, 1.0], [5.0, 1.0], [20.0, 0.8999999999999999], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[14.174999999999999, 0.8999999999999998]], "isOverall": false, "label": "Get Access Token-0-Aggregated", "isController": false}, {"data": [[8.0, 986.0], [17.0, 1009.0], [18.0, 980.0], [9.0, 1271.0], [19.0, 959.0], [20.0, 983.4], [5.0, 1190.0], [12.0, 965.0], [13.0, 944.0], [14.0, 1014.0], [15.0, 988.5]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[14.549999999999997, 1028.0]], "isOverall": false, "label": "WS open for policy import-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [3.0, 1.0], [12.0, 0.0], [13.0, 0.0], [14.0, 1.0], [15.0, 1.0], [1.0, 1.0], [4.0, 1.0], [16.0, 1.0], [17.0, 1.0], [19.0, 1.0], [5.0, 0.0], [20.0, 1.0], [6.0, 1.0], [7.0, 2.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[10.549999999999999, 0.8999999999999999]], "isOverall": false, "label": "Generate sr keys-0-Aggregated", "isController": false}, {"data": [[8.0, 11194.0], [2.0, 9441.0], [9.0, 8172.0], [10.0, 7772.0], [11.0, 9987.0], [12.0, 9824.0], [3.0, 9081.0], [13.0, 8900.0], [14.0, 8304.0], [15.0, 8365.0], [16.0, 9758.0], [4.0, 24345.0], [1.0, 9435.0], [17.0, 13328.0], [18.0, 7632.0], [19.0, 9054.0], [20.0, 10538.0], [5.0, 12316.0], [6.0, 14915.0], [7.0, 11513.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[10.5, 10693.700000000003]], "isOverall": false, "label": "Dry Run Policy-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept user-Aggregated", "isController": true}, {"data": [[16.0, 269.99999999999994], [17.0, 327.44444444444446], [9.0, 285.0], [18.0, 647.7777777777778], [19.0, 296.7142857142857], [10.0, 277.0], [20.0, 315.04651162790697], [11.0, 279.6666666666667], [12.0, 284.0], [13.0, 286.25], [14.0, 324.25], [15.0, 272.5]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[17.54639175257732, 336.3195876288659]], "isOverall": false, "label": "Get SR link result-Aggregated", "isController": false}, {"data": [[16.0, 284.5], [17.0, 267.0], [18.0, 336.0], [19.0, 524.5], [20.0, 282.9], [10.0, 255.5], [11.0, 269.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[17.650000000000002, 304.8499999999999]], "isOverall": false, "label": "Get User Access Token-Aggregated", "isController": false}, {"data": [[2.0, 549.0], [8.0, 559.0], [9.0, 548.0], [10.0, 551.0], [11.0, 537.0], [3.0, 543.0], [12.0, 573.0], [13.0, 613.0], [14.0, 574.0], [15.0, 546.0], [1.0, 581.0], [4.0, 545.0], [16.0, 554.0], [17.0, 550.0], [18.0, 538.0], [19.0, 559.0], [5.0, 554.0], [20.0, 564.0], [6.0, 579.0], [7.0, 555.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[10.5, 558.6]], "isOverall": false, "label": "Accept user-Aggregated", "isController": false}, {"data": [[16.0, 629.0], [17.0, 640.3333333333334], [18.0, 608.5], [19.0, 1375.0], [20.0, 599.6999999999999], [11.0, 602.0], [12.0, 1101.5]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[17.85, 697.2]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[16.0, 732.0], [8.0, 1534.0], [17.0, 765.5], [18.0, 831.0], [19.0, 749.0], [20.0, 763.9], [12.0, 288.0], [13.0, 271.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[16.799999999999997, 832.1499999999999]], "isOverall": false, "label": "Get SR DID-Aggregated", "isController": false}, {"data": [[8.0, 941.0], [17.0, 329.0], [18.0, 288.0], [19.0, 307.0], [20.0, 277.44444444444446], [11.0, 260.0], [12.0, 255.0], [6.0, 936.0], [15.0, 483.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[16.4, 394.75000000000006]], "isOverall": false, "label": "Link user profile-Aggregated", "isController": false}, {"data": [[2.0, 2062.0], [8.0, 2078.0], [9.0, 2074.0], [10.0, 2061.0], [11.0, 2078.0], [3.0, 2063.0], [12.0, 2067.0], [13.0, 2065.0], [14.0, 2077.0], [15.0, 2048.0], [4.0, 2059.0], [16.0, 2074.0], [17.0, 2066.0], [18.0, 2111.0], [19.0, 2068.0], [5.0, 2056.0], [20.0, 2074.0], [6.0, 2067.0], [7.0, 2056.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[11.45, 2068.8999999999996]], "isOverall": false, "label": "Get key gen result-Aggregated", "isController": false}, {"data": [[2.0, 281.0], [8.0, 368.0], [9.0, 350.0], [10.0, 248.0], [11.0, 259.0], [3.0, 276.0], [12.0, 288.0], [13.0, 311.0], [14.0, 307.0], [15.0, 343.0], [1.0, 295.0], [4.0, 309.0], [16.0, 289.0], [17.0, 336.0], [18.0, 340.0], [19.0, 252.0], [5.0, 305.0], [20.0, 281.0], [6.0, 354.0], [7.0, 344.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[10.5, 306.7999999999999]], "isOverall": false, "label": "Invite user-Aggregated", "isController": false}, {"data": [[8.0, 3.0], [9.0, 2.0], [10.0, 2.0], [11.0, 3.0], [3.0, 2.0], [12.0, 2.0], [13.0, 3.0], [14.0, 1.0], [15.0, 1.0], [4.0, 1.0], [16.0, 15.0], [17.0, 2.0], [18.0, 1.0], [19.0, 2.0], [5.0, 0.0], [20.0, 2.3333333333333335], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[12.35, 2.45]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[8.0, 3.0], [17.0, 3.0], [18.0, 1.0], [9.0, 3.0], [19.0, 2.0], [20.0, 2.2], [5.0, 3.0], [12.0, 3.0], [13.0, 2.0], [14.0, 3.0], [15.0, 2.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[14.549999999999997, 2.45]], "isOverall": false, "label": "WS open for policy import-0-Aggregated", "isController": false}, {"data": [[8.0, 35434.0], [17.0, 33549.5], [18.0, 34651.0], [9.0, 35321.0], [19.0, 32848.0], [20.0, 33790.833333333336], [5.0, 38839.666666666664], [12.0, 34362.0], [13.0, 34116.0], [14.0, 34425.0], [15.0, 34542.5]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[14.6, 34830.25]], "isOverall": false, "label": "User creation flow-Aggregated", "isController": true}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.0, 283.0]], "isOverall": false, "label": "Setup ipfs-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [3.0, 1.0], [12.0, 0.0], [13.0, 1.0], [14.0, 1.0], [15.0, 1.0], [1.0, 1.0], [4.0, 1.0], [16.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [5.0, 1.0], [20.0, 1.0], [6.0, 1.0], [7.0, 2.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[10.5, 0.9499999999999998]], "isOverall": false, "label": "WS open for sr key gen-0-Aggregated", "isController": false}, {"data": [[8.0, 11441.0], [2.0, 9678.0], [9.0, 8433.0], [10.0, 8023.0], [11.0, 10280.0], [12.0, 10069.0], [3.0, 9351.0], [13.0, 9141.0], [14.0, 8557.0], [15.0, 8620.0], [16.0, 9994.0], [4.0, 25144.0], [1.0, 9717.0], [17.0, 13614.0], [18.0, 7873.0], [19.0, 9548.0], [20.0, 10816.0], [5.0, 12650.0], [6.0, 16026.0], [7.0, 11760.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[10.5, 11036.749999999998]], "isOverall": false, "label": "Requests for DryRun-Aggregated", "isController": true}, {"data": [[2.0, 2.0], [8.0, 2.0], [9.0, 2.0], [10.0, 2.0], [11.0, 2.0], [3.0, 2.0], [12.0, 1.0], [13.0, 2.0], [14.0, 2.0], [15.0, 2.0], [1.0, 2.0], [4.0, 2.0], [16.0, 2.0], [17.0, 1.0], [18.0, 2.0], [19.0, 2.0], [5.0, 2.0], [20.0, 2.0], [6.0, 2.0], [7.0, 3.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[10.5, 1.95]], "isOverall": false, "label": "WS open for sr key gen-Aggregated", "isController": false}, {"data": [[16.0, 274.0], [17.0, 281.3333333333333], [18.0, 302.0], [19.0, 278.0], [20.0, 295.25], [10.0, 279.3333333333333], [5.0, 259.0], [11.0, 272.0], [6.0, 3202.0], [13.0, 268.0], [15.0, 266.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[16.02941176470588, 455.52941176470586]], "isOverall": false, "label": "Get user link result-Aggregated", "isController": false}, {"data": [[16.0, 1.0], [17.0, 0.6666666666666666], [18.0, 1.0], [19.0, 0.0], [20.0, 1.0], [13.0, 8.0], [14.0, 2.0], [15.0, 1.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[18.050000000000004, 1.2999999999999998]], "isOverall": false, "label": "Generate user keys-0-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link user-Aggregated", "isController": true}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[16.0, 15707.0], [17.0, 16417.0], [18.0, 16627.5], [19.0, 16165.0], [20.0, 16211.666666666668], [14.0, 16493.5], [15.0, 16256.333333333334]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[17.9, 16281.100000000002]], "isOverall": false, "label": "User creation(SR side)-Aggregated", "isController": true}, {"data": [[2.0, 2061.0], [8.0, 2065.0], [9.0, 2074.0], [10.0, 2075.0], [11.0, 2079.0], [3.0, 2060.0], [12.0, 2072.0], [13.0, 2054.0], [14.0, 2074.5], [15.0, 2062.0], [1.0, 2076.0], [4.0, 2052.0], [16.0, 2073.0], [17.0, 2057.3333333333335], [18.0, 2068.6666666666665], [19.0, 2057.5], [5.0, 2066.0], [20.0, 2065.5], [6.0, 2073.0], [7.0, 2040.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[14.174999999999999, 2064.8000000000006]], "isOverall": false, "label": "Get Access Token-Aggregated", "isController": false}, {"data": [[16.0, 2060.0], [17.0, 2066.6666666666665], [18.0, 2062.0], [19.0, 2062.5], [20.0, 2062.6666666666665], [12.0, 2073.0], [13.0, 2059.5], [15.0, 2067.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[17.8, 2063.5000000000005]], "isOverall": false, "label": "Get user keys-Aggregated", "isController": false}, {"data": [[8.0, 2.0], [2.0, 1.5], [10.0, 2.5], [12.0, 2.0], [3.0, 3.0], [13.0, 3.0], [14.0, 2.0], [15.0, 2.5], [16.0, 1.0], [17.0, 3.0], [18.0, 1.0], [20.0, 1.5], [5.0, 3.0], [7.0, 1.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[11.0, 2.1]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[16.0, 1.0], [17.0, 1.0], [18.0, 0.5], [19.0, 1.0], [20.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 0.6666666666666666]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[17.849999999999998, 0.8999999999999999]], "isOverall": false, "label": "WS open for user key gen-0-Aggregated", "isController": false}, {"data": [[8.0, 4947.5], [2.0, 4665.0], [10.0, 3644.5], [12.0, 3638.0], [3.0, 4169.0], [13.0, 3667.0], [14.0, 4286.0], [15.0, 4088.0], [16.0, 4162.0], [17.0, 3602.0], [18.0, 3656.0], [20.0, 3603.0], [5.0, 5042.5], [7.0, 7944.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[11.0, 4355.25]], "isOverall": false, "label": "Requests for Import-Aggregated", "isController": true}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Setup ipfs-0-Aggregated", "isController": false}, {"data": [[8.0, 15496.0], [17.0, 14785.0], [18.0, 15058.0], [9.0, 15465.0], [19.0, 14452.0], [20.0, 15034.333333333332], [5.0, 18419.666666666668], [12.0, 14692.0], [13.0, 14907.0], [14.0, 15890.0], [15.0, 15265.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[14.6, 15576.249999999996]], "isOverall": false, "label": "User creation(user side)-Aggregated", "isController": true}, {"data": [[8.0, 2.4], [2.0, 3.0], [9.0, 1.0], [10.0, 2.2000000000000006], [11.0, 1.8], [12.0, 2.0], [3.0, 2.142857142857143], [13.0, 3.3333333333333335], [14.0, 1.5], [15.0, 2.0], [16.0, 3.2222222222222223], [4.0, 2.875], [17.0, 2.9285714285714284], [18.0, 1.6], [19.0, 2.0], [20.0, 1.7333333333333332], [5.0, 2.3333333333333335], [6.0, 4.25]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[12.495238095238097, 2.40952380952381]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[2.0, 0.5], [8.0, 1.5], [9.0, 1.5], [10.0, 9.0], [11.0, 2.0], [3.0, 0.5], [12.0, 2.0], [13.0, 1.5], [14.0, 1.5], [15.0, 2.5], [1.0, 1.6666666666666667], [4.0, 1.5], [16.0, 1.5], [17.0, 1.0], [18.0, 3.5], [19.0, 1.5], [5.0, 2.0], [20.0, 0.5], [6.0, 1.5], [7.0, 2.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[10.26829268292683, 1.9512195121951224]], "isOverall": false, "label": "Get Admin Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [8.0, 1.0], [9.0, 2.0], [10.0, 0.0], [11.0, 1.0], [3.0, 2.0], [12.0, 2.0], [13.0, 2.0], [14.0, 0.0], [15.0, 1.0], [1.0, 3.0], [4.0, 1.0], [16.0, 2.0], [17.0, 2.0], [18.0, 4.0], [19.0, 1.0], [5.0, 2.0], [20.0, 0.0], [6.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[10.5, 1.55]], "isOverall": false, "label": "Accept sr-0-Aggregated", "isController": false}, {"data": [[16.0, 3.6], [17.0, 2.166666666666667], [18.0, 3.0], [19.0, 3.0], [20.0, 2.416666666666667], [10.0, 2.6666666666666665], [5.0, 3.0], [11.0, 3.0], [6.0, 2.0], [13.0, 1.0], [15.0, 1.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[16.02941176470588, 2.5294117647058822]], "isOverall": false, "label": "Get user link result-0-Aggregated", "isController": false}, {"data": [[2.0, 2601.0], [8.0, 2515.0], [9.0, 2505.0], [10.0, 2579.0], [11.0, 2497.0], [3.0, 2519.0], [12.0, 2573.0], [13.0, 2515.0], [14.0, 2606.0], [15.0, 2492.0], [1.0, 2516.0], [4.0, 2592.0], [16.0, 2488.0], [17.0, 2497.0], [18.0, 2502.0], [19.0, 2495.0], [5.0, 2555.0], [20.0, 2486.0], [6.0, 2503.0], [7.0, 2544.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[10.5, 2528.9999999999995]], "isOverall": false, "label": "Login by SR OS-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Create new tenant-0-Aggregated", "isController": false}, {"data": [[2.0, 2057.0], [8.0, 2054.0], [9.0, 2060.0], [10.0, 2065.0], [11.0, 2068.0], [3.0, 2063.0], [12.0, 2067.0], [13.0, 2043.0], [14.0, 2060.0], [15.0, 2045.0], [4.0, 2037.0], [16.0, 2053.0], [17.0, 2084.0], [18.0, 2089.0], [19.0, 2053.0], [5.0, 2060.0], [20.0, 2073.0], [6.0, 2059.0], [7.0, 2039.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[11.45, 2060.1]], "isOverall": false, "label": "Get sr keys-Aggregated", "isController": false}, {"data": [[16.0, 2.0], [17.0, 1.5], [18.0, 2.0], [19.0, 3.0], [20.0, 2.0], [13.0, 2.0], [14.0, 1.0], [15.0, 2.3333333333333335]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[17.849999999999998, 1.9999999999999998]], "isOverall": false, "label": "WS open for user key gen-Aggregated", "isController": false}, {"data": [[8.0, 2.0], [2.0, 2.0], [9.0, 2.0], [10.0, 2.0], [11.0, 2.5], [12.0, 3.0], [3.0, 4.0], [13.0, 1.0], [14.0, 1.6666666666666667], [15.0, 2.8], [4.0, 2.0], [16.0, 1.0], [17.0, 4.5], [18.0, 2.3333333333333335], [19.0, 1.3333333333333333], [5.0, 2.833333333333333], [20.0, 3.2727272727272725], [6.0, 17.0], [7.0, 2.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[12.899999999999999, 2.766666666666667]], "isOverall": false, "label": "Get SR Access Token-0-Aggregated", "isController": false}, {"data": [[16.0, 3.0], [8.0, 1.0], [17.0, 2.75], [18.0, 4.333333333333333], [9.0, 3.0], [19.0, 3.5], [20.0, 1.8], [5.0, 2.3333333333333335], [12.0, 3.0], [13.0, 3.0], [14.0, 1.6666666666666667], [15.0, 2.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[16.249999999999996, 2.3249999999999993]], "isOverall": false, "label": "Verify link-0-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [2.0, 3.0], [9.0, 2.0], [10.0, 1.0], [11.0, 3.0], [12.0, 3.0], [3.0, 4.0], [13.0, 1.0], [14.0, 1.0], [15.0, 2.0], [16.0, 3.0], [4.0, 4.0], [1.0, 2.0], [17.0, 3.0], [18.0, 3.0], [19.0, 2.0], [20.0, 2.0], [5.0, 3.0], [6.0, 1.0], [7.0, 3.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[10.5, 2.35]], "isOverall": false, "label": "Dry Run Policy-0-Aggregated", "isController": false}, {"data": [[8.0, 17151.0], [2.0, 14194.0], [9.0, 12089.0], [10.0, 11656.0], [11.0, 13918.0], [12.0, 13736.0], [3.0, 13520.0], [13.0, 13427.0], [14.0, 12437.0], [15.0, 12916.0], [16.0, 14156.0], [4.0, 30946.0], [1.0, 14531.0], [17.0, 17216.0], [18.0, 11529.0], [19.0, 13119.0], [20.0, 14451.0], [5.0, 16933.0], [6.0, 23970.0], [7.0, 15945.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[10.5, 15392.0]], "isOverall": false, "label": "Policy import and dry run-Aggregated", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept SR-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 2.0], [3.0, 1.0], [12.0, 1.0], [13.0, 0.0], [14.0, 1.0], [15.0, 1.0], [4.0, 1.0], [16.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [5.0, 0.0], [20.0, 0.5], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[11.45, 0.8499999999999999]], "isOverall": false, "label": "Get key gen result-0-Aggregated", "isController": false}, {"data": [[16.0, 4958.0], [17.0, 5613.5], [18.0, 5833.5], [19.0, 5420.0], [20.0, 5415.0], [14.0, 5719.5], [15.0, 5461.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[17.9, 5491.45]], "isOverall": false, "label": "Link SR-Aggregated", "isController": true}, {"data": [[2.0, 563.0], [8.0, 606.0], [9.0, 598.0], [10.0, 607.0], [11.0, 555.0], [3.0, 572.0], [12.0, 652.0], [13.0, 607.0], [14.0, 578.0], [15.0, 591.0], [1.0, 635.0], [4.0, 579.0], [16.0, 584.0], [17.0, 598.0], [18.0, 736.0], [19.0, 558.0], [5.0, 587.0], [20.0, 710.0], [6.0, 590.0], [7.0, 574.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[10.5, 604.0000000000001]], "isOverall": false, "label": "Accept sr-Aggregated", "isController": false}, {"data": [[2.0, 2747.0], [8.0, 2889.0], [9.0, 2896.0], [10.0, 2733.0], [11.0, 2600.0], [3.0, 2874.0], [12.0, 2914.0], [13.0, 2904.0], [14.0, 2894.0], [15.0, 2942.0], [1.0, 2806.0], [4.0, 2769.0], [16.0, 2843.0], [17.0, 2740.0], [18.0, 4863.0], [19.0, 2659.0], [5.0, 3086.0], [20.0, 3177.0], [6.0, 3312.0], [7.0, 2810.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[10.5, 2972.9]], "isOverall": false, "label": "User creation(admin side)-Aggregated", "isController": true}, {"data": [[16.0, 0.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [20.0, 0.7777777777777778], [14.0, 0.5], [15.0, 1.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[17.9, 0.7999999999999999]], "isOverall": false, "label": "Login by user OS-0-Aggregated", "isController": false}, {"data": [[17.0, 982.5], [18.0, 928.0], [9.0, 1209.0], [19.0, 1182.5], [20.0, 988.3], [10.0, 1106.5], [13.0, 934.0], [15.0, 1058.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[17.349999999999998, 1027.75]], "isOverall": false, "label": "WS open for user link-Aggregated", "isController": false}, {"data": [[8.0, 1336.6], [2.0, 351.0], [9.0, 256.0], [10.0, 349.29999999999995], [11.0, 404.8], [12.0, 362.0], [3.0, 506.42857142857144], [13.0, 282.6666666666667], [14.0, 269.5], [15.0, 286.8], [16.0, 384.6666666666667], [4.0, 362.125], [17.0, 428.85714285714283], [18.0, 385.2], [19.0, 498.5], [20.0, 373.46666666666664], [5.0, 355.3333333333333], [6.0, 1181.25]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[12.495238095238097, 457.26666666666665]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 2.0], [10.0, 2.0], [11.0, 3.0], [12.0, 1.0], [13.0, 3.0], [14.0, 3.0], [15.0, 3.0], [16.0, 2.0], [17.0, 1.0], [18.0, 3.0], [19.0, 15.0], [20.0, 3.1666666666666665], [6.0, 3.0], [7.0, 2.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[14.750000000000002, 3.1500000000000004]], "isOverall": false, "label": "WS open for sr link-0-Aggregated", "isController": false}, {"data": [[17.0, 3.0], [18.0, 1.0], [9.0, 3.0], [19.0, 2.5], [20.0, 2.1], [10.0, 3.5], [13.0, 2.0], [15.0, 1.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[17.349999999999998, 2.3]], "isOverall": false, "label": "WS open for user link-0-Aggregated", "isController": false}, {"data": [[1.0, 331.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.0, 331.0]], "isOverall": false, "label": "Create new tenant-Aggregated", "isController": false}, {"data": [[16.0, 2062.0], [17.0, 2071.6666666666665], [18.0, 2069.0], [19.0, 2062.5], [20.0, 2068.3333333333335], [12.0, 2080.0], [13.0, 2060.0], [14.0, 2040.0], [15.0, 2060.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[17.85, 2066.2999999999997]], "isOverall": false, "label": "Get user key gen result-Aggregated", "isController": false}, {"data": [[16.0, 1.0], [17.0, 1.3333333333333333], [18.0, 2.5], [19.0, 1.0], [20.0, 1.9], [11.0, 3.0], [12.0, 3.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[17.85, 1.95]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[16.0, 2.0], [17.0, 2.5], [18.0, 3.0], [19.0, 2.5], [20.0, 2.1], [10.0, 2.5], [11.0, 3.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[17.650000000000002, 2.3]], "isOverall": false, "label": "Get User Access Token-0-Aggregated", "isController": false}, {"data": [[8.0, 3.0], [16.0, 1.0], [9.0, 1.0], [18.0, 2.0], [19.0, 1.0], [10.0, 2.0], [20.0, 2.142857142857143], [11.0, 3.0], [13.0, 1.0], [7.0, 0.0], [14.0, 11.0], [15.0, 1.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[15.550000000000002, 2.1999999999999993]], "isOverall": false, "label": "Link SR profile-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [8.0, 2.0], [9.0, 1.0], [10.0, 3.0], [11.0, 4.0], [3.0, 1.0], [12.0, 2.0], [13.0, 2.0], [14.0, 2.0], [15.0, 1.0], [1.0, 2.0], [4.0, 2.0], [16.0, 2.0], [17.0, 2.0], [18.0, 0.0], [19.0, 1.0], [5.0, 1.0], [20.0, 2.0], [6.0, 3.0], [7.0, 2.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[10.5, 1.8]], "isOverall": false, "label": "Accept user-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [3.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 0.0], [15.0, 0.0], [4.0, 1.0], [16.0, 1.0], [17.0, 0.0], [18.0, 0.0], [19.0, 1.0], [5.0, 0.0], [20.0, 1.0], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[11.45, 0.75]], "isOverall": false, "label": "Get sr keys-0-Aggregated", "isController": false}, {"data": [[16.0, 2485.0], [17.0, 2472.5], [18.0, 2519.0], [19.0, 2577.0], [20.0, 2505.777777777778], [14.0, 2491.5], [15.0, 2514.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[17.9, 2506.1000000000004]], "isOverall": false, "label": "Login by user OS-Aggregated", "isController": false}, {"data": [[16.0, 1.625], [17.0, 2.4444444444444446], [9.0, 3.0], [18.0, 2.0], [19.0, 2.142857142857143], [10.0, 3.0], [20.0, 2.255813953488372], [11.0, 2.0], [12.0, 2.3333333333333335], [13.0, 2.5], [14.0, 2.25], [15.0, 3.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[17.54639175257732, 2.2474226804123707]], "isOverall": false, "label": "Get SR link result-0-Aggregated", "isController": false}, {"data": [[0.0, 0.049999999999999996]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[0.0, 0.049999999999999996]], "isOverall": false, "label": "Generate user hedera data-Aggregated", "isController": true}, {"data": [[16.0, 927.0], [8.0, 954.0], [17.0, 411.25], [18.0, 628.3333333333334], [9.0, 793.0], [19.0, 526.5], [20.0, 552.6666666666666], [5.0, 294.0], [12.0, 272.0], [13.0, 301.0], [14.0, 808.6666666666666], [15.0, 481.8]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[16.249999999999996, 545.9249999999998]], "isOverall": false, "label": "Verify link-Aggregated", "isController": false}, {"data": [[1.0, 793.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.0, 793.0]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[8.0, 260.75], [2.0, 259.5], [9.0, 328.0], [10.0, 257.3333333333333], [11.0, 274.5], [12.0, 280.0], [3.0, 270.0], [13.0, 256.6666666666667], [14.0, 271.6666666666667], [15.0, 267.0], [4.0, 258.0], [16.0, 265.0], [17.0, 272.0], [18.0, 272.6666666666667], [19.0, 569.6666666666666], [5.0, 360.3333333333333], [20.0, 296.09090909090907], [6.0, 295.0], [7.0, 682.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[12.899999999999999, 312.8333333333333]], "isOverall": false, "label": "Get SR Access Token-Aggregated", "isController": false}, {"data": [[2.0, 10776.0], [8.0, 10765.0], [9.0, 10789.0], [10.0, 10773.0], [11.0, 10880.0], [3.0, 10858.0], [12.0, 10776.0], [13.0, 10821.0], [14.0, 10761.0], [15.0, 10830.0], [4.0, 10749.0], [16.0, 10775.0], [17.0, 10777.0], [18.0, 10812.0], [19.0, 10772.0], [5.0, 10795.0], [20.0, 10764.0], [6.0, 10811.0], [7.0, 10745.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[11.45, 10789.65]], "isOverall": false, "label": "Generate sr hedera data-Aggregated", "isController": true}, {"data": [[8.0, 601.0], [9.0, 633.0], [10.0, 618.0], [11.0, 598.0], [3.0, 640.0], [12.0, 619.0], [13.0, 608.0], [14.0, 614.0], [15.0, 596.0], [4.0, 633.0], [16.0, 625.0], [17.0, 609.0], [18.0, 616.0], [19.0, 1436.0], [5.0, 599.0], [20.0, 645.3333333333334], [6.0, 586.0], [7.0, 606.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[12.35, 658.65]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[16.0, 2.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.5], [20.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[17.85, 1.05]], "isOverall": false, "label": "Get user key gen result-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [8.0, 1.0], [9.0, 0.0], [10.0, 1.0], [11.0, 1.0], [3.0, 0.0], [12.0, 1.0], [13.0, 1.0], [14.0, 2.0], [15.0, 1.0], [1.0, 0.0], [4.0, 1.0], [16.0, 0.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [5.0, 0.0], [20.0, 1.0], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[10.5, 0.7500000000000001]], "isOverall": false, "label": "Login by SR OS-0-Aggregated", "isController": false}, {"data": [[16.0, 3.0], [8.0, 2.3333333333333335], [17.0, 3.0], [18.0, 2.0], [19.0, 3.0], [20.0, 2.5], [12.0, 2.0], [13.0, 1.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[16.799999999999997, 2.45]], "isOverall": false, "label": "Get SR DID-0-Aggregated", "isController": false}, {"data": [[16.0, 1.0], [17.0, 0.6666666666666667], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [12.0, 1.0], [13.0, 1.0], [15.0, 1.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[17.8, 0.95]], "isOverall": false, "label": "Get user keys-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 20.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 238.4, "minX": 1.73349606E12, "maxY": 242255.73333333334, "series": [{"data": [[1.7334963E12, 206717.45], [1.7334966E12, 28564.933333333334], [1.73349612E12, 131504.35], [1.73349642E12, 199907.2], [1.73349624E12, 242255.73333333334], [1.73349654E12, 58794.316666666666], [1.73349606E12, 58863.066666666666], [1.73349636E12, 216272.71666666667], [1.73349618E12, 183580.66666666666], [1.73349648E12, 108026.1]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7334963E12, 1742.7], [1.7334966E12, 238.4], [1.73349612E12, 1212.75], [1.73349642E12, 1627.9166666666667], [1.73349624E12, 2110.4333333333334], [1.73349654E12, 477.06666666666666], [1.73349606E12, 567.5333333333333], [1.73349636E12, 1771.6666666666667], [1.73349618E12, 1685.95], [1.73349648E12, 867.9833333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7334966E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349606E12, "maxY": 39405.5, "series": [{"data": [[1.73349612E12, 1.8333333333333335], [1.73349624E12, 1.25], [1.73349606E12, 1.75], [1.73349618E12, 1.6666666666666667]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7334963E12, 942.75], [1.73349612E12, 961.75], [1.73349624E12, 1115.8333333333335], [1.73349618E12, 963.6666666666666]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.7334963E12, 276.6666666666667], [1.73349612E12, 282.6], [1.73349642E12, 811.0], [1.73349624E12, 408.8], [1.73349636E12, 356.4], [1.73349618E12, 291.8333333333333], [1.73349648E12, 332.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7334963E12, 757.6], [1.73349612E12, 770.0], [1.73349624E12, 1081.5], [1.73349618E12, 768.6666666666667]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73349612E12, 2.0], [1.73349624E12, 1.75], [1.73349606E12, 1.0], [1.73349618E12, 1.1666666666666667]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.7334963E12, 2.3333333333333335], [1.73349642E12, 1.6666666666666665], [1.73349624E12, 3.0], [1.73349636E12, 2.0], [1.73349648E12, 2.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7334963E12, 1.0], [1.73349642E12, 1.6666666666666667], [1.73349654E12, 3.0], [1.73349636E12, 2.1666666666666665], [1.73349648E12, 3.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73349612E12, 530.25], [1.73349624E12, 731.75], [1.73349606E12, 464.3333333333333], [1.73349618E12, 508.24999999999994]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.7334963E12, 2.1111111111111116], [1.73349612E12, 1.4], [1.73349642E12, 2.0], [1.73349624E12, 1.9], [1.73349636E12, 2.0], [1.73349618E12, 1.3333333333333333], [1.73349648E12, 3.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.7334963E12, 252.66666666666666], [1.73349642E12, 311.5], [1.73349654E12, 419.0], [1.73349636E12, 277.0], [1.73349648E12, 270.5]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73349612E12, 414.33333333333337], [1.73349624E12, 390.75], [1.73349606E12, 385.5], [1.73349618E12, 372.83333333333337]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7334963E12, 2052.0], [1.73349642E12, 2057.6666666666665], [1.73349624E12, 2064.5], [1.73349636E12, 2071.3333333333335], [1.73349618E12, 2055.5]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73349612E12, 2058.6666666666665], [1.73349624E12, 2070.0], [1.73349606E12, 2067.6666666666665], [1.73349618E12, 2065.8333333333335]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.7334966E12, 250.0], [1.73349642E12, 264.3333333333333], [1.73349654E12, 266.0], [1.73349636E12, 246.25], [1.73349648E12, 618.6]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73349606E12, 1660.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.7334963E12, 0.8333333333333334], [1.73349612E12, 1.0], [1.73349642E12, 1.0], [1.73349624E12, 0.9090909090909091], [1.73349606E12, 1.0], [1.73349636E12, 1.0], [1.73349618E12, 0.75]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.7334963E12, 996.0], [1.73349642E12, 984.5], [1.73349654E12, 1190.0], [1.73349636E12, 973.0], [1.73349648E12, 1128.5]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73349612E12, 1.0], [1.73349624E12, 1.0], [1.73349606E12, 1.0], [1.73349618E12, 0.6666666666666666]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.7334966E12, 9319.0], [1.73349642E12, 9746.5], [1.73349654E12, 17192.0], [1.73349636E12, 9074.666666666666], [1.73349648E12, 9727.6]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.7334963E12, 278.95833333333337], [1.73349612E12, 281.5], [1.73349642E12, 279.7142857142857], [1.73349624E12, 382.0869565217392], [1.73349636E12, 428.59999999999997], [1.73349618E12, 287.95238095238096]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.7334963E12, 275.33333333333337], [1.73349642E12, 284.5], [1.73349624E12, 404.0], [1.73349636E12, 269.0], [1.73349648E12, 260.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73349612E12, 557.6666666666666], [1.73349624E12, 552.75], [1.73349606E12, 554.5], [1.73349618E12, 566.1666666666667]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.7334963E12, 583.6666666666666], [1.73349642E12, 885.75], [1.73349624E12, 747.5], [1.73349636E12, 604.0], [1.73349648E12, 602.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.7334963E12, 767.8333333333334], [1.73349642E12, 430.3333333333333], [1.73349624E12, 755.5], [1.73349636E12, 772.0], [1.73349648E12, 1534.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.7334963E12, 272.3333333333333], [1.73349642E12, 347.3333333333333], [1.73349624E12, 266.0], [1.73349636E12, 312.5], [1.73349648E12, 769.5]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73349612E12, 2065.0], [1.73349624E12, 2077.8333333333335], [1.73349606E12, 2062.5], [1.73349618E12, 2066.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73349612E12, 328.16666666666663], [1.73349624E12, 302.25], [1.73349606E12, 290.25], [1.73349618E12, 299.5]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.7334963E12, 2.0], [1.73349612E12, 1.3333333333333333], [1.73349624E12, 4.166666666666667], [1.73349606E12, 2.0], [1.73349618E12, 2.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.7334963E12, 1.6666666666666665], [1.73349642E12, 2.5], [1.73349654E12, 3.0], [1.73349636E12, 2.3333333333333335], [1.73349648E12, 3.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.7334963E12, 39405.5], [1.73349612E12, 33930.0], [1.73349624E12, 35388.2], [1.73349606E12, 33095.0], [1.73349618E12, 34015.42857142857]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349606E12, 283.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73349612E12, 1.1666666666666665], [1.73349624E12, 1.0], [1.73349606E12, 0.6666666666666666], [1.73349618E12, 0.8333333333333334]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.7334966E12, 9582.0], [1.73349642E12, 9999.166666666668], [1.73349654E12, 17940.0], [1.73349636E12, 9412.333333333334], [1.73349648E12, 9987.4]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73349612E12, 2.166666666666667], [1.73349624E12, 1.8], [1.73349606E12, 2.0], [1.73349618E12, 1.8333333333333335]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.7334963E12, 281.16666666666663], [1.73349642E12, 277.20000000000005], [1.73349654E12, 2221.0], [1.73349636E12, 296.0], [1.73349648E12, 277.5]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.7334963E12, 1.0], [1.73349642E12, 3.6666666666666665], [1.73349624E12, 0.8333333333333334], [1.73349636E12, 0.6666666666666666], [1.73349618E12, 1.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349606E12, 2.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73349612E12, 16006.666666666668], [1.73349624E12, 16916.666666666668], [1.73349606E12, 15597.5], [1.73349618E12, 16147.833333333332]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7334963E12, 2066.3333333333335], [1.73349612E12, 2061.6666666666665], [1.73349642E12, 2059.0], [1.73349624E12, 2064.454545454545], [1.73349606E12, 2065.6666666666665], [1.73349636E12, 2062.3333333333335], [1.73349618E12, 2069.25]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.7334963E12, 2062.3333333333335], [1.73349642E12, 2065.25], [1.73349624E12, 2064.833333333333], [1.73349636E12, 2059.6666666666665], [1.73349618E12, 2067.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.7334966E12, 2.0], [1.73349642E12, 2.166666666666667], [1.73349654E12, 3.0], [1.73349636E12, 1.75], [1.73349648E12, 2.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.7334963E12, 1.0], [1.73349642E12, 1.0], [1.73349624E12, 0.8333333333333334], [1.73349636E12, 1.0], [1.73349618E12, 0.5]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.7334963E12, 3620.6666666666665], [1.73349642E12, 4164.4], [1.73349654E12, 4499.666666666667], [1.73349636E12, 3982.1666666666665], [1.73349648E12, 6009.666666666667]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73349606E12, 2.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.7334963E12, 15073.666666666666], [1.73349642E12, 17688.75], [1.73349624E12, 15089.0], [1.73349636E12, 15021.333333333334], [1.73349618E12, 14730.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.7334963E12, 1.8333333333333333], [1.7334966E12, 2.25], [1.73349642E12, 2.6206896551724137], [1.73349654E12, 3.142857142857143], [1.73349636E12, 2.1599999999999997], [1.73349648E12, 2.1739130434782603]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73349612E12, 2.916666666666667], [1.73349624E12, 1.625], [1.73349606E12, 1.1111111111111112], [1.73349618E12, 1.8333333333333333]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73349612E12, 1.5], [1.73349624E12, 1.75], [1.73349606E12, 1.75], [1.73349618E12, 1.3333333333333333]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.7334963E12, 2.5], [1.73349642E12, 2.6], [1.73349654E12, 2.3333333333333335], [1.73349636E12, 2.454545454545454], [1.73349648E12, 2.75]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73349612E12, 2535.666666666667], [1.73349624E12, 2493.6], [1.73349606E12, 2545.3333333333335], [1.73349618E12, 2543.6666666666665]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349606E12, 2.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.73349612E12, 2051.5], [1.73349624E12, 2070.8333333333335], [1.73349606E12, 2060.0], [1.73349618E12, 2058.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.7334963E12, 2.0], [1.73349642E12, 2.3333333333333335], [1.73349624E12, 2.0], [1.73349636E12, 2.0], [1.73349618E12, 1.5]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.7334963E12, 1.0], [1.7334966E12, 2.6666666666666665], [1.73349612E12, 3.8333333333333335], [1.73349642E12, 2.0833333333333335], [1.73349624E12, 2.3333333333333335], [1.73349654E12, 3.2], [1.73349636E12, 4.6], [1.73349618E12, 2.0], [1.73349648E12, 2.4285714285714284]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.7334963E12, 1.5555555555555556], [1.73349642E12, 2.111111111111111], [1.73349624E12, 3.5], [1.73349654E12, 2.3333333333333335], [1.73349636E12, 2.5555555555555554], [1.73349618E12, 2.5], [1.73349648E12, 2.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.7334966E12, 3.0], [1.73349642E12, 2.1666666666666665], [1.73349654E12, 2.6666666666666665], [1.73349636E12, 2.3333333333333335], [1.73349648E12, 2.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.7334963E12, 13033.0], [1.73349642E12, 13468.8], [1.73349654E12, 18297.75], [1.73349636E12, 14030.4], [1.73349648E12, 19351.333333333332]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73349612E12, 0.8333333333333334], [1.73349624E12, 0.8333333333333334], [1.73349606E12, 0.5], [1.73349618E12, 1.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73349612E12, 5231.0], [1.73349624E12, 6139.333333333333], [1.73349606E12, 4780.5], [1.73349618E12, 5341.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73349612E12, 593.6666666666666], [1.73349624E12, 650.5], [1.73349606E12, 587.25], [1.73349618E12, 594.5]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73349612E12, 2954.333333333333], [1.73349624E12, 3359.75], [1.73349606E12, 2799.0], [1.73349618E12, 2849.5]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.7334963E12, 0.8333333333333334], [1.73349642E12, 1.0], [1.73349624E12, 0.6666666666666666], [1.73349636E12, 1.0], [1.73349618E12, 0.5]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.7334963E12, 978.5], [1.73349642E12, 1004.0], [1.73349624E12, 1120.6666666666667], [1.73349636E12, 977.6], [1.73349648E12, 1140.6666666666667]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.7334963E12, 364.3333333333333], [1.7334966E12, 433.25], [1.73349642E12, 357.65517241379314], [1.73349654E12, 485.7857142857143], [1.73349636E12, 402.56], [1.73349648E12, 657.5652173913044]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7334963E12, 3.25], [1.73349612E12, 2.0], [1.73349624E12, 4.5], [1.73349618E12, 2.5]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.7334963E12, 1.8333333333333335], [1.73349642E12, 2.0], [1.73349624E12, 2.3333333333333335], [1.73349636E12, 2.4], [1.73349648E12, 3.3333333333333335]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73349606E12, 331.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.7334963E12, 2066.0], [1.73349642E12, 2060.0], [1.73349624E12, 2070.1666666666665], [1.73349636E12, 2067.25], [1.73349618E12, 2060.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.7334963E12, 1.6666666666666667], [1.73349642E12, 2.25], [1.73349624E12, 1.8333333333333335], [1.73349636E12, 2.0], [1.73349648E12, 3.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7334963E12, 2.333333333333333], [1.73349642E12, 2.0], [1.73349624E12, 2.4], [1.73349636E12, 2.0], [1.73349648E12, 2.6666666666666665]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7334963E12, 2.2], [1.73349612E12, 1.3333333333333333], [1.73349624E12, 1.6666666666666667], [1.73349618E12, 3.166666666666667]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73349612E12, 2.0], [1.73349624E12, 1.25], [1.73349606E12, 1.5], [1.73349618E12, 2.166666666666667]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73349612E12, 0.8333333333333334], [1.73349624E12, 0.6666666666666666], [1.73349606E12, 1.0], [1.73349618E12, 0.6666666666666667]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7334963E12, 2505.8333333333335], [1.73349642E12, 2520.6666666666665], [1.73349624E12, 2511.166666666667], [1.73349636E12, 2498.3333333333335], [1.73349618E12, 2481.5]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.7334963E12, 2.1666666666666665], [1.73349612E12, 3.0], [1.73349642E12, 1.857142857142857], [1.73349624E12, 2.1304347826086953], [1.73349636E12, 2.3499999999999996], [1.73349618E12, 2.428571428571428]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.7334963E12, 0.16666666666666666], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.7334963E12, 591.7777777777778], [1.73349642E12, 460.55555555555554], [1.73349624E12, 902.3333333333334], [1.73349654E12, 294.0], [1.73349636E12, 310.1111111111111], [1.73349618E12, 766.0], [1.73349648E12, 873.5]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349606E12, 793.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.7334963E12, 273.0], [1.7334966E12, 263.0], [1.73349612E12, 269.6666666666667], [1.73349642E12, 254.91666666666666], [1.73349624E12, 417.0], [1.73349654E12, 382.2], [1.73349636E12, 306.09999999999997], [1.73349618E12, 284.0], [1.73349648E12, 394.4285714285714]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73349612E12, 10775.666666666666], [1.73349624E12, 10777.333333333332], [1.73349606E12, 10817.0], [1.73349618E12, 10806.833333333334]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.7334963E12, 711.0], [1.73349612E12, 609.6666666666666], [1.73349624E12, 751.8333333333334], [1.73349606E12, 640.0], [1.73349618E12, 608.8333333333333]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.7334963E12, 1.1666666666666665], [1.73349642E12, 1.0], [1.73349624E12, 1.0], [1.73349636E12, 1.25], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73349612E12, 0.6666666666666667], [1.73349624E12, 0.8], [1.73349606E12, 0.0], [1.73349618E12, 1.1666666666666665]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.7334963E12, 3.166666666666667], [1.73349642E12, 2.0], [1.73349624E12, 2.0], [1.73349636E12, 2.1666666666666665], [1.73349648E12, 2.3333333333333335]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.7334963E12, 1.0], [1.73349642E12, 0.75], [1.73349624E12, 1.0], [1.73349636E12, 1.0], [1.73349618E12, 1.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7334966E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349606E12, "maxY": 16959.666666666668, "series": [{"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.7334963E12, 274.3333333333333], [1.73349612E12, 281.0], [1.73349642E12, 808.5], [1.73349624E12, 406.6], [1.73349636E12, 354.0], [1.73349618E12, 290.5], [1.73349648E12, 328.6666666666667]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7334963E12, 755.4], [1.73349612E12, 768.3333333333334], [1.73349624E12, 1079.3333333333333], [1.73349618E12, 765.1666666666667]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73349612E12, 527.1666666666666], [1.73349624E12, 730.0], [1.73349606E12, 462.8888888888889], [1.73349618E12, 506.08333333333337]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.7334963E12, 251.0], [1.73349642E12, 309.6666666666667], [1.73349654E12, 416.0], [1.73349636E12, 274.6666666666667], [1.73349648E12, 267.5]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73349612E12, 412.3333333333333], [1.73349624E12, 388.5], [1.73349606E12, 384.5], [1.73349618E12, 371.5]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7334963E12, 2050.6666666666665], [1.73349642E12, 2054.0], [1.73349624E12, 2063.3333333333335], [1.73349636E12, 2070.3333333333335], [1.73349618E12, 2054.5]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73349612E12, 2057.5], [1.73349624E12, 2069.0], [1.73349606E12, 2066.6666666666665], [1.73349618E12, 2064.8333333333335]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.7334966E12, 247.0], [1.73349642E12, 259.0], [1.73349654E12, 242.5], [1.73349636E12, 235.25], [1.73349648E12, 612.6]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73349606E12, 0.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.7334966E12, 9080.666666666666], [1.73349642E12, 9517.833333333332], [1.73349654E12, 16959.666666666668], [1.73349636E12, 8758.666666666666], [1.73349648E12, 9126.6]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.7334963E12, 276.0416666666666], [1.73349612E12, 278.5], [1.73349642E12, 277.2857142857143], [1.73349624E12, 379.8260869565217], [1.73349636E12, 425.95], [1.73349618E12, 285.2857142857142]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.7334963E12, 272.8333333333333], [1.73349642E12, 282.5], [1.73349624E12, 401.2], [1.73349636E12, 267.0], [1.73349648E12, 257.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73349612E12, 555.1666666666666], [1.73349624E12, 551.0], [1.73349606E12, 552.75], [1.73349618E12, 563.6666666666666]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.7334963E12, 581.6666666666666], [1.73349642E12, 883.5], [1.73349624E12, 745.6666666666667], [1.73349636E12, 601.6666666666666], [1.73349648E12, 599.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.7334963E12, 764.6666666666666], [1.73349642E12, 428.3333333333333], [1.73349624E12, 753.5], [1.73349636E12, 769.8333333333333], [1.73349648E12, 1531.6666666666667]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.7334963E12, 269.83333333333337], [1.73349642E12, 345.3333333333333], [1.73349624E12, 263.0], [1.73349636E12, 310.1666666666667], [1.73349648E12, 767.25]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73349612E12, 2064.0], [1.73349624E12, 2076.666666666667], [1.73349606E12, 2062.0], [1.73349618E12, 2064.8333333333335]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73349612E12, 326.0], [1.73349624E12, 301.0], [1.73349606E12, 288.5], [1.73349618E12, 297.5]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349606E12, 280.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.7334966E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.7334963E12, 278.6666666666667], [1.73349642E12, 274.4], [1.73349654E12, 2218.6666666666665], [1.73349636E12, 293.45454545454544], [1.73349648E12, 274.25]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349606E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7334963E12, 2065.1666666666665], [1.73349612E12, 2060.6666666666665], [1.73349642E12, 2057.6666666666665], [1.73349624E12, 2063.3636363636365], [1.73349606E12, 2064.6666666666665], [1.73349636E12, 2061.3333333333335], [1.73349618E12, 2068.5000000000005]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.7334963E12, 2060.8333333333335], [1.73349642E12, 2064.25], [1.73349624E12, 2063.833333333333], [1.73349636E12, 2058.6666666666665], [1.73349618E12, 2066.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.7334966E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73349606E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.7334963E12, 0.0], [1.7334966E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73349612E12, 2534.8333333333335], [1.73349624E12, 2492.8], [1.73349606E12, 2544.3333333333335], [1.73349618E12, 2542.5]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349606E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.73349612E12, 2050.5], [1.73349624E12, 2069.8333333333335], [1.73349606E12, 2059.0], [1.73349618E12, 2057.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.7334966E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.7334966E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73349612E12, 592.1666666666667], [1.73349624E12, 648.5], [1.73349606E12, 585.25], [1.73349618E12, 592.8333333333334]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.7334963E12, 362.1666666666667], [1.7334966E12, 430.5], [1.73349642E12, 352.9310344827586], [1.73349654E12, 481.42857142857144], [1.73349636E12, 398.88], [1.73349648E12, 655.0869565217392]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73349606E12, 329.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.7334963E12, 2064.6666666666665], [1.73349642E12, 2058.3333333333335], [1.73349624E12, 2069.0], [1.73349636E12, 2066.0], [1.73349618E12, 2059.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7334963E12, 2504.6666666666665], [1.73349642E12, 2519.6666666666665], [1.73349624E12, 2510.166666666667], [1.73349636E12, 2497.3333333333335], [1.73349618E12, 2480.5]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.7334963E12, 589.9999999999999], [1.73349642E12, 458.22222222222223], [1.73349624E12, 898.5], [1.73349654E12, 291.6666666666667], [1.73349636E12, 307.44444444444446], [1.73349618E12, 763.0], [1.73349648E12, 871.5]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349606E12, 790.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.7334963E12, 271.8], [1.7334966E12, 260.3333333333333], [1.73349612E12, 265.8333333333333], [1.73349642E12, 252.58333333333334], [1.73349624E12, 414.3333333333333], [1.73349654E12, 379.0], [1.73349636E12, 301.3], [1.73349618E12, 281.8333333333333], [1.73349648E12, 392.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.7334963E12, 708.0], [1.73349612E12, 608.0], [1.73349624E12, 747.1666666666667], [1.73349606E12, 638.0], [1.73349618E12, 606.6666666666666]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7334966E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349606E12, "maxY": 27028.0, "series": [{"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7334963E12, 939.5], [1.73349612E12, 959.5], [1.73349624E12, 1111.1666666666667], [1.73349618E12, 960.8333333333334]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 512.5], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7334963E12, 481.6], [1.73349612E12, 508.6666666666667], [1.73349624E12, 657.0], [1.73349618E12, 516.5]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73349612E12, 250.16666666666669], [1.73349624E12, 405.25], [1.73349606E12, 214.66666666666666], [1.73349618E12, 239.6666666666667]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7334963E12, 2030.3333333333335], [1.73349642E12, 2035.3333333333333], [1.73349624E12, 2042.0], [1.73349636E12, 2047.3333333333333], [1.73349618E12, 2036.5]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73349612E12, 2039.8333333333335], [1.73349624E12, 2046.4], [1.73349606E12, 2050.0], [1.73349618E12, 2044.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.7334966E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73349606E12, 509.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.7334963E12, 994.3333333333334], [1.73349642E12, 981.5], [1.73349654E12, 1187.0], [1.73349636E12, 970.1666666666666], [1.73349648E12, 1125.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.7334966E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 149.35], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 260.25], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.7334963E12, 498.8333333333333], [1.73349642E12, 161.33333333333331], [1.73349624E12, 505.0], [1.73349636E12, 501.0], [1.73349648E12, 161.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73349612E12, 2045.5], [1.73349624E12, 2049.8333333333335], [1.73349606E12, 2039.0], [1.73349618E12, 2043.5]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.7334963E12, 27028.0], [1.73349612E12, 24493.0], [1.73349624E12, 25163.2], [1.73349606E12, 24687.0], [1.73349618E12, 24672.57142857143]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349606E12, 0.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.7334966E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73349612E12, 1.0], [1.73349624E12, 0.8], [1.73349606E12, 1.3333333333333333], [1.73349618E12, 1.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 1752.6666666666665], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349606E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73349612E12, 12303.166666666666], [1.73349624E12, 12269.5], [1.73349606E12, 12190.5], [1.73349618E12, 12444.333333333334]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7334963E12, 2044.3333333333335], [1.73349612E12, 2042.3333333333333], [1.73349642E12, 2034.3333333333333], [1.73349624E12, 2042.0], [1.73349606E12, 2042.0], [1.73349636E12, 2038.3333333333333], [1.73349618E12, 2045.25]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.7334963E12, 2043.1666666666665], [1.73349642E12, 2044.5], [1.73349624E12, 2043.8333333333335], [1.73349636E12, 2042.3333333333333], [1.73349618E12, 2039.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.7334966E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.7334963E12, 1487.3333333333333], [1.73349642E12, 1404.0], [1.73349654E12, 1719.6666666666667], [1.73349636E12, 1475.8333333333335], [1.73349648E12, 1252.3333333333333]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73349606E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.7334963E12, 11872.833333333334], [1.73349642E12, 13252.5], [1.73349624E12, 11705.833333333334], [1.73349636E12, 11916.333333333334], [1.73349618E12, 11966.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.7334963E12, 0.0], [1.7334966E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73349612E12, 2044.1666666666667], [1.73349624E12, 2036.8], [1.73349606E12, 2053.0], [1.73349618E12, 2043.5]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349606E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.73349612E12, 2032.0], [1.73349624E12, 2043.3333333333335], [1.73349606E12, 2041.0], [1.73349618E12, 2038.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.7334963E12, 1.0], [1.73349642E12, 1.0], [1.73349624E12, 1.0], [1.73349636E12, 1.0], [1.73349618E12, 0.5]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.7334966E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.7334966E12, 0.0], [1.73349642E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.7334963E12, 1487.3333333333333], [1.73349642E12, 1407.8], [1.73349654E12, 1535.5], [1.73349636E12, 1475.4], [1.73349648E12, 1411.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73349612E12, 2097.0], [1.73349624E12, 2049.5], [1.73349606E12, 1966.0], [1.73349618E12, 2229.333333333333]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73349612E12, 500.3333333333333], [1.73349624E12, 810.5], [1.73349606E12, 483.0], [1.73349618E12, 479.3333333333333]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.7334963E12, 976.3333333333334], [1.73349642E12, 1002.0], [1.73349624E12, 1118.3333333333333], [1.73349636E12, 975.2], [1.73349648E12, 1137.3333333333333]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.7334963E12, 82.33333333333333], [1.7334966E12, 134.00000000000003], [1.73349642E12, 65.79310344827587], [1.73349654E12, 37.57142857142857], [1.73349636E12, 123.08], [1.73349648E12, 72.69565217391305]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73349606E12, 0.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.7334963E12, 2044.5], [1.73349642E12, 2039.0], [1.73349624E12, 2047.3333333333333], [1.73349636E12, 2045.5], [1.73349618E12, 2045.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7334963E12, 2048.1666666666665], [1.73349642E12, 2028.3333333333333], [1.73349624E12, 2039.8333333333333], [1.73349636E12, 2041.0], [1.73349618E12, 2031.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.7334963E12, 330.00000000000006], [1.73349642E12, 177.0], [1.73349624E12, 611.5], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 503.5], [1.73349648E12, 588.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349606E12, 509.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.7334966E12, 0.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349654E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73349612E12, 10206.166666666668], [1.73349624E12, 10220.0], [1.73349606E12, 10224.5], [1.73349618E12, 10215.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.7334963E12, 0.0], [1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73349612E12, 0.0], [1.73349624E12, 0.0], [1.73349606E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349648E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7334966E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349606E12, "maxY": 24345.0, "series": [{"data": [[1.7334963E12, 2518.0], [1.7334966E12, 9441.0], [1.73349612E12, 2592.0], [1.73349642E12, 13328.0], [1.73349624E12, 2577.0], [1.73349654E12, 24345.0], [1.73349606E12, 2601.0], [1.73349636E12, 10538.0], [1.73349618E12, 2606.0], [1.73349648E12, 11513.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7334963E12, 2049.0], [1.7334966E12, 4962.0], [1.73349612E12, 2059.3], [1.73349642E12, 1039.0], [1.73349624E12, 2068.0], [1.73349654E12, 1456.100000000002], [1.73349606E12, 2062.9], [1.73349636E12, 945.5], [1.73349618E12, 2063.7], [1.73349648E12, 1205.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7334963E12, 2515.51], [1.7334966E12, 9441.0], [1.73349612E12, 2556.11], [1.73349642E12, 9787.699999999999], [1.73349624E12, 2518.8500000000004], [1.73349654E12, 24345.0], [1.73349606E12, 2601.0], [1.73349636E12, 7845.299999999967], [1.73349618E12, 2574.7400000000002], [1.73349648E12, 11401.350000000002]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7334963E12, 2066.0], [1.7334966E12, 9436.5], [1.73349612E12, 2073.15], [1.73349642E12, 2070.0], [1.73349624E12, 2083.75], [1.73349654E12, 6458.199999999949], [1.73349606E12, 2073.8], [1.73349636E12, 2062.5], [1.73349618E12, 2077.45], [1.73349648E12, 2587.75]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.7334963E12, 0.0], [1.7334966E12, 1.0], [1.73349612E12, 0.0], [1.73349642E12, 0.0], [1.73349624E12, 0.0], [1.73349654E12, 1.0], [1.73349606E12, 0.0], [1.73349636E12, 0.0], [1.73349618E12, 0.0], [1.73349648E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7334963E12, 3.0], [1.7334966E12, 120.5], [1.73349612E12, 3.0], [1.73349642E12, 4.0], [1.73349624E12, 3.0], [1.73349654E12, 122.0], [1.73349606E12, 2.0], [1.73349636E12, 4.0], [1.73349618E12, 3.0], [1.73349648E12, 125.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7334966E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 3.0, "minX": 2.0, "maxY": 125.5, "series": [{"data": [[4.0, 4.0], [2.0, 125.5], [8.0, 3.0], [16.0, 3.0], [18.0, 3.5], [10.0, 3.0], [20.0, 125.5], [6.0, 4.0], [12.0, 3.5], [14.0, 3.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 20.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 117.5, "series": [{"data": [[4.0, 0.0], [2.0, 0.0], [8.0, 0.0], [16.0, 0.0], [18.0, 0.0], [10.0, 0.0], [20.0, 117.5], [6.0, 0.0], [12.0, 0.0], [14.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 20.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.5666666666666667, "minX": 1.73349606E12, "maxY": 5.716666666666667, "series": [{"data": [[1.7334963E12, 4.666666666666667], [1.7334966E12, 0.5666666666666667], [1.73349612E12, 3.2666666666666666], [1.73349642E12, 4.216666666666667], [1.73349624E12, 5.716666666666667], [1.73349654E12, 1.1833333333333333], [1.73349606E12, 1.5333333333333334], [1.73349636E12, 4.75], [1.73349618E12, 4.533333333333333], [1.73349648E12, 2.2333333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7334966E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.73349606E12, "maxY": 4.466666666666667, "series": [{"data": [[1.7334963E12, 3.7666666666666666], [1.7334966E12, 0.5166666666666667], [1.73349612E12, 2.35], [1.73349642E12, 3.55], [1.73349624E12, 4.466666666666667], [1.73349654E12, 1.0166666666666666], [1.73349606E12, 1.05], [1.73349636E12, 3.966666666666667], [1.73349618E12, 3.4], [1.73349648E12, 1.8833333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.7334963E12, 0.31666666666666665], [1.73349612E12, 0.16666666666666666], [1.73349642E12, 0.2], [1.73349624E12, 0.3333333333333333], [1.73349654E12, 0.05], [1.73349606E12, 0.05], [1.73349636E12, 0.23333333333333334], [1.73349618E12, 0.23333333333333334], [1.73349648E12, 0.08333333333333333]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.7334963E12, 0.2833333333333333], [1.7334966E12, 0.05], [1.73349612E12, 0.6], [1.73349642E12, 0.2833333333333333], [1.73349624E12, 0.6333333333333333], [1.73349654E12, 0.08333333333333333], [1.73349606E12, 0.35], [1.73349636E12, 0.2833333333333333], [1.73349618E12, 0.6333333333333333], [1.73349648E12, 0.16666666666666666]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.7334963E12, 0.3333333333333333], [1.73349612E12, 0.15], [1.73349642E12, 0.2], [1.73349624E12, 0.3], [1.73349654E12, 0.05], [1.73349606E12, 0.05], [1.73349636E12, 0.25], [1.73349618E12, 0.23333333333333334], [1.73349648E12, 0.1]], "isOverall": false, "label": "202", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7334966E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73349606E12, "maxY": 0.48333333333333334, "series": [{"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.06666666666666667], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.016666666666666666]], "isOverall": false, "label": "Link user-success", "isController": true}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.1], [1.73349636E12, 0.06666666666666667], [1.73349618E12, 0.016666666666666666]], "isOverall": false, "label": "Get user key gen result-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "Accept sr-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "Invite and accept user-success", "isController": true}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "Accept sr-0-success", "isController": false}, {"data": [[1.73349612E12, 0.2], [1.73349624E12, 0.13333333333333333], [1.73349606E12, 0.15], [1.73349618E12, 0.2]], "isOverall": false, "label": "Get Admin Access Token-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.1], [1.73349606E12, 0.03333333333333333], [1.73349618E12, 0.1]], "isOverall": false, "label": "Get key gen result-success", "isController": false}, {"data": [[1.73349606E12, 0.016666666666666666]], "isOverall": false, "label": "Tenant creation flow-success", "isController": true}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.08333333333333333], [1.73349606E12, 0.05], [1.73349618E12, 0.1]], "isOverall": false, "label": "Login by SR OS-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349612E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.18333333333333332], [1.73349606E12, 0.05], [1.73349636E12, 0.05], [1.73349618E12, 0.13333333333333333]], "isOverall": false, "label": "Get Access Token-0-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "Accept user-success", "isController": false}, {"data": [[1.7334963E12, 0.05], [1.73349642E12, 0.1], [1.73349654E12, 0.05], [1.73349636E12, 0.1], [1.73349648E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for policy import-0-success", "isController": false}, {"data": [[1.7334963E12, 0.016666666666666666], [1.73349612E12, 0.1], [1.73349624E12, 0.1], [1.73349606E12, 0.016666666666666666], [1.73349618E12, 0.1]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for user key gen-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.03333333333333333], [1.73349624E12, 0.08333333333333333], [1.73349636E12, 0.06666666666666667], [1.73349648E12, 0.05]], "isOverall": false, "label": "Get User Access Token-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.7334966E12, 0.13333333333333333], [1.73349642E12, 0.48333333333333334], [1.73349654E12, 0.23333333333333334], [1.73349636E12, 0.4166666666666667], [1.73349648E12, 0.38333333333333336]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "Invite user-0-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.1], [1.73349606E12, 0.03333333333333333], [1.73349618E12, 0.1]], "isOverall": false, "label": "Get sr keys-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.1], [1.73349606E12, 0.03333333333333333], [1.73349618E12, 0.1]], "isOverall": false, "label": "Link SR-success", "isController": true}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for user key gen-0-success", "isController": false}, {"data": [[1.7334963E12, 0.05], [1.73349642E12, 0.1], [1.73349654E12, 0.05], [1.73349636E12, 0.1], [1.73349648E12, 0.03333333333333333]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.73349606E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.16666666666666666], [1.73349654E12, 0.05], [1.73349636E12, 0.18333333333333332], [1.73349648E12, 0.06666666666666667]], "isOverall": false, "label": "Get user link result-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.03333333333333333], [1.73349624E12, 0.08333333333333333], [1.73349636E12, 0.06666666666666667], [1.73349648E12, 0.05]], "isOverall": false, "label": "Get User Access Token-success", "isController": false}, {"data": [[1.73349606E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.06666666666666667], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349648E12, 0.016666666666666666]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.016666666666666666], [1.73349636E12, 0.1], [1.73349648E12, 0.06666666666666667]], "isOverall": false, "label": "Link user profile-0-success", "isController": false}, {"data": [[1.7334963E12, 0.05], [1.73349642E12, 0.08333333333333333], [1.73349654E12, 0.06666666666666667], [1.73349636E12, 0.08333333333333333], [1.73349648E12, 0.05]], "isOverall": false, "label": "Policy import and dry run-success", "isController": true}, {"data": [[1.73349612E12, 0.2], [1.73349624E12, 0.13333333333333333], [1.73349606E12, 0.15], [1.73349618E12, 0.2]], "isOverall": false, "label": "Get Admin Access Token-0-success", "isController": false}, {"data": [[1.7334963E12, 0.15], [1.73349612E12, 0.08333333333333333], [1.73349642E12, 0.03333333333333333], [1.73349624E12, 0.16666666666666666], [1.73349636E12, 0.08333333333333333], [1.73349618E12, 0.1], [1.73349648E12, 0.05]], "isOverall": false, "label": "Agree terms-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "User creation(admin side)-success", "isController": true}, {"data": [[1.7334963E12, 0.1], [1.73349612E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.18333333333333332], [1.73349606E12, 0.05], [1.73349636E12, 0.05], [1.73349618E12, 0.13333333333333333]], "isOverall": false, "label": "Get Access Token-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.06666666666666667], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.016666666666666666]], "isOverall": false, "label": "Get user keys-0-success", "isController": false}, {"data": [[1.7334963E12, 0.05], [1.73349642E12, 0.1], [1.73349654E12, 0.05], [1.73349636E12, 0.1], [1.73349648E12, 0.03333333333333333]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.7334963E12, 0.05], [1.73349642E12, 0.08333333333333333], [1.73349654E12, 0.05], [1.73349636E12, 0.1], [1.73349648E12, 0.05]], "isOverall": false, "label": "Requests for Import-success", "isController": true}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "Invite and accept SR-success", "isController": true}, {"data": [[1.73349606E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.16666666666666666], [1.73349654E12, 0.05], [1.73349636E12, 0.18333333333333332], [1.73349648E12, 0.06666666666666667]], "isOverall": false, "label": "Get user link result-success", "isController": false}, {"data": [[1.73349606E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.7334963E12, 0.06666666666666667], [1.73349612E12, 0.06666666666666667], [1.73349624E12, 0.1], [1.73349618E12, 0.1]], "isOverall": false, "label": "WS open for sr link-0-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.08333333333333333], [1.73349606E12, 0.05], [1.73349618E12, 0.1]], "isOverall": false, "label": "Login by SR OS-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.06666666666666667], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.016666666666666666]], "isOverall": false, "label": "Get user keys-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.1], [1.73349606E12, 0.03333333333333333], [1.73349618E12, 0.1]], "isOverall": false, "label": "Generate sr hedera data-success", "isController": true}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.1], [1.73349606E12, 0.03333333333333333], [1.73349618E12, 0.1]], "isOverall": false, "label": "Get key gen result-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.06666666666666667], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.016666666666666666]], "isOverall": false, "label": "User creation(user side)-success", "isController": true}, {"data": [[1.7334966E12, 0.05], [1.73349642E12, 0.1], [1.73349654E12, 0.03333333333333333], [1.73349636E12, 0.06666666666666667], [1.73349648E12, 0.08333333333333333]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.7334966E12, 0.05], [1.73349642E12, 0.1], [1.73349654E12, 0.05], [1.73349636E12, 0.05], [1.73349648E12, 0.08333333333333333]], "isOverall": false, "label": "Requests for DryRun-success", "isController": true}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "Accept user-0-success", "isController": false}, {"data": [[1.7334963E12, 0.15], [1.73349642E12, 0.15], [1.73349624E12, 0.1], [1.73349654E12, 0.05], [1.73349636E12, 0.15], [1.73349618E12, 0.03333333333333333], [1.73349648E12, 0.03333333333333333]], "isOverall": false, "label": "Verify link-success", "isController": false}, {"data": [[1.7334963E12, 0.15], [1.73349612E12, 0.08333333333333333], [1.73349642E12, 0.03333333333333333], [1.73349624E12, 0.16666666666666666], [1.73349636E12, 0.08333333333333333], [1.73349618E12, 0.1], [1.73349648E12, 0.05]], "isOverall": false, "label": "Agree terms-0-success", "isController": false}, {"data": [[1.73349606E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.1], [1.73349606E12, 0.03333333333333333], [1.73349618E12, 0.1]], "isOverall": false, "label": "Get sr keys-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.03333333333333333], [1.73349636E12, 0.1], [1.73349648E12, 0.05]], "isOverall": false, "label": "Get SR DID-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "Invite user-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.7334966E12, 0.13333333333333333], [1.73349642E12, 0.48333333333333334], [1.73349654E12, 0.23333333333333334], [1.73349636E12, 0.4166666666666667], [1.73349648E12, 0.38333333333333336]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.7334963E12, 0.08333333333333333], [1.73349612E12, 0.05], [1.73349624E12, 0.1], [1.73349618E12, 0.1]], "isOverall": false, "label": "Link SR profile-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.03333333333333333]], "isOverall": false, "label": "Generate user hedera data-success", "isController": true}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.08333333333333333], [1.73349606E12, 0.05], [1.73349618E12, 0.1]], "isOverall": false, "label": "WS open for sr key gen-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.03333333333333333]], "isOverall": false, "label": "Generate user keys-0-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.08333333333333333], [1.73349606E12, 0.05], [1.73349618E12, 0.1]], "isOverall": false, "label": "Generate sr keys-0-success", "isController": false}, {"data": [[1.7334963E12, 0.4], [1.73349612E12, 0.03333333333333333], [1.73349642E12, 0.11666666666666667], [1.73349624E12, 0.38333333333333336], [1.73349636E12, 0.3333333333333333], [1.73349618E12, 0.35]], "isOverall": false, "label": "Get SR link result-0-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "Invite sr-0-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.08333333333333333], [1.73349606E12, 0.05], [1.73349618E12, 0.1]], "isOverall": false, "label": "WS open for sr key gen-0-success", "isController": false}, {"data": [[1.7334963E12, 0.016666666666666666], [1.73349612E12, 0.1], [1.73349624E12, 0.1], [1.73349606E12, 0.016666666666666666], [1.73349618E12, 0.1]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.7334963E12, 0.4], [1.73349612E12, 0.03333333333333333], [1.73349642E12, 0.11666666666666667], [1.73349624E12, 0.38333333333333336], [1.73349636E12, 0.3333333333333333], [1.73349618E12, 0.35]], "isOverall": false, "label": "Get SR link result-success", "isController": false}, {"data": [[1.7334966E12, 0.05], [1.73349642E12, 0.1], [1.73349654E12, 0.03333333333333333], [1.73349636E12, 0.06666666666666667], [1.73349648E12, 0.08333333333333333]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.03333333333333333]], "isOverall": false, "label": "Login by user OS-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.05], [1.73349636E12, 0.08333333333333333], [1.73349648E12, 0.05]], "isOverall": false, "label": "WS open for user link-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.03333333333333333], [1.73349636E12, 0.1], [1.73349648E12, 0.05]], "isOverall": false, "label": "Get SR DID-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.06666666666666667], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349648E12, 0.016666666666666666]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.7334966E12, 0.05], [1.73349642E12, 0.1], [1.73349654E12, 0.05], [1.73349636E12, 0.05], [1.73349648E12, 0.08333333333333333]], "isOverall": false, "label": "Dry Run Policy-success", "isController": false}, {"data": [[1.7334963E12, 0.03333333333333333], [1.73349612E12, 0.08333333333333333], [1.73349624E12, 0.08333333333333333], [1.73349606E12, 0.016666666666666666], [1.73349618E12, 0.11666666666666667]], "isOverall": false, "label": "User creation flow-success", "isController": true}, {"data": [[1.73349606E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.03333333333333333]], "isOverall": false, "label": "Generate user keys-success", "isController": false}, {"data": [[1.7334963E12, 0.08333333333333333], [1.7334966E12, 0.05], [1.73349612E12, 0.1], [1.73349642E12, 0.2], [1.73349624E12, 0.1], [1.73349654E12, 0.08333333333333333], [1.73349636E12, 0.16666666666666666], [1.73349618E12, 0.1], [1.73349648E12, 0.11666666666666667]], "isOverall": false, "label": "Get SR Access Token-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.05], [1.73349636E12, 0.08333333333333333], [1.73349648E12, 0.05]], "isOverall": false, "label": "WS open for user link-success", "isController": false}, {"data": [[1.7334963E12, 0.06666666666666667], [1.73349612E12, 0.06666666666666667], [1.73349624E12, 0.1], [1.73349618E12, 0.1]], "isOverall": false, "label": "WS open for sr link-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.1], [1.73349636E12, 0.06666666666666667], [1.73349618E12, 0.016666666666666666]], "isOverall": false, "label": "Get user key gen result-0-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.06666666666666667], [1.73349606E12, 0.06666666666666667], [1.73349618E12, 0.1]], "isOverall": false, "label": "Invite sr-success", "isController": false}, {"data": [[1.7334963E12, 0.08333333333333333], [1.7334966E12, 0.05], [1.73349612E12, 0.1], [1.73349642E12, 0.2], [1.73349624E12, 0.1], [1.73349654E12, 0.08333333333333333], [1.73349636E12, 0.16666666666666666], [1.73349618E12, 0.1], [1.73349648E12, 0.11666666666666667]], "isOverall": false, "label": "Get SR Access Token-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.1], [1.73349606E12, 0.03333333333333333], [1.73349618E12, 0.1]], "isOverall": false, "label": "User creation(SR side)-success", "isController": true}, {"data": [[1.7334963E12, 0.05], [1.73349642E12, 0.1], [1.73349654E12, 0.05], [1.73349636E12, 0.1], [1.73349648E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for policy import-success", "isController": false}, {"data": [[1.73349612E12, 0.1], [1.73349624E12, 0.08333333333333333], [1.73349606E12, 0.05], [1.73349618E12, 0.1]], "isOverall": false, "label": "Generate sr keys-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.1], [1.73349636E12, 0.05], [1.73349618E12, 0.03333333333333333]], "isOverall": false, "label": "Login by user OS-0-success", "isController": false}, {"data": [[1.7334963E12, 0.1], [1.73349642E12, 0.05], [1.73349624E12, 0.016666666666666666], [1.73349636E12, 0.1], [1.73349648E12, 0.06666666666666667]], "isOverall": false, "label": "Link user profile-success", "isController": false}, {"data": [[1.7334963E12, 0.15], [1.73349642E12, 0.15], [1.73349624E12, 0.1], [1.73349654E12, 0.05], [1.73349636E12, 0.15], [1.73349618E12, 0.03333333333333333], [1.73349648E12, 0.03333333333333333]], "isOverall": false, "label": "Verify link-0-success", "isController": false}, {"data": [[1.7334966E12, 0.05], [1.73349642E12, 0.1], [1.73349654E12, 0.05], [1.73349636E12, 0.05], [1.73349648E12, 0.08333333333333333]], "isOverall": false, "label": "Dry Run Policy-0-success", "isController": false}, {"data": [[1.7334963E12, 0.08333333333333333], [1.73349612E12, 0.05], [1.73349624E12, 0.1], [1.73349618E12, 0.1]], "isOverall": false, "label": "Link SR profile-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7334966E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.6166666666666667, "minX": 1.73349606E12, "maxY": 6.616666666666666, "series": [{"data": [[1.7334963E12, 5.133333333333334], [1.7334966E12, 0.6166666666666667], [1.73349612E12, 3.95], [1.73349642E12, 4.683333333333334], [1.73349624E12, 6.616666666666666], [1.73349654E12, 1.3666666666666667], [1.73349606E12, 1.8333333333333333], [1.73349636E12, 5.116666666666666], [1.73349618E12, 5.283333333333333], [1.73349648E12, 2.4166666666666665]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7334966E12, "title": "Total Transactions Per Second"}},
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
