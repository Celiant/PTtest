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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 95.0, "series": [{"data": [[0.0, 19.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[4300.0, 1.0], [1100.0, 1.0], [2400.0, 1.0], [900.0, 14.0], [7900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[2100.0, 1.0], [300.0, 6.0], [700.0, 5.0], [200.0, 23.0], [800.0, 2.0], [8000.0, 1.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [700.0, 9.0], [800.0, 3.0], [200.0, 1.0], [400.0, 1.0], [900.0, 1.0], [3800.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[0.0, 18.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[700.0, 1.0], [200.0, 37.0], [400.0, 1.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[0.0, 38.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[300.0, 4.0], [200.0, 13.0], [500.0, 1.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[300.0, 6.0], [400.0, 5.0], [200.0, 4.0], [800.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[2000.0, 19.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[2000.0, 19.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[300.0, 1.0], [200.0, 16.0], [400.0, 1.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[0.0, 38.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [3000.0, 1.0], [900.0, 12.0], [1000.0, 1.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[8400.0, 1.0], [9000.0, 1.0], [8900.0, 1.0], [10800.0, 1.0], [12200.0, 1.0], [12300.0, 1.0], [12500.0, 1.0], [12800.0, 1.0], [13400.0, 1.0], [15500.0, 1.0], [16200.0, 1.0], [20600.0, 1.0], [21600.0, 1.0], [24900.0, 1.0], [7300.0, 1.0], [7700.0, 1.0], [8100.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[2300.0, 1.0], [1100.0, 1.0], [300.0, 13.0], [600.0, 1.0], [700.0, 8.0], [11500.0, 1.0], [200.0, 49.0], [3300.0, 2.0], [13400.0, 1.0], [1800.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[300.0, 2.0], [200.0, 14.0], [400.0, 3.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 3.0], [800.0, 1.0], [500.0, 14.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 11.0], [1300.0, 1.0], [11900.0, 1.0], [1000.0, 2.0], [2000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[300.0, 4.0], [700.0, 3.0], [200.0, 5.0], [800.0, 2.0], [900.0, 3.0], [1000.0, 2.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[300.0, 5.0], [200.0, 12.0], [900.0, 2.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[2000.0, 23.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[300.0, 6.0], [700.0, 1.0], [400.0, 2.0], [200.0, 10.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[0.0, 18.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[35300.0, 1.0], [36500.0, 1.0], [37000.0, 1.0], [37200.0, 2.0], [38500.0, 1.0], [37600.0, 1.0], [41000.0, 1.0], [41800.0, 1.0], [42000.0, 1.0], [42500.0, 1.0], [42200.0, 1.0], [43700.0, 1.0], [43200.0, 1.0], [45800.0, 1.0], [46200.0, 1.0], [48600.0, 1.0], [49700.0, 1.0], [51200.0, 1.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[8400.0, 1.0], [8700.0, 1.0], [8200.0, 1.0], [9200.0, 1.0], [9400.0, 1.0], [11000.0, 1.0], [12400.0, 1.0], [12600.0, 1.0], [12700.0, 1.0], [13000.0, 1.0], [13700.0, 1.0], [15800.0, 1.0], [16500.0, 1.0], [20800.0, 1.0], [21900.0, 1.0], [25100.0, 1.0], [7500.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [300.0, 9.0], [700.0, 3.0], [200.0, 12.0], [500.0, 1.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 39.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[32800.0, 1.0], [15500.0, 1.0], [16000.0, 1.0], [16300.0, 1.0], [16500.0, 1.0], [17300.0, 1.0], [18200.0, 1.0], [18900.0, 1.0], [19100.0, 1.0], [18500.0, 2.0], [22600.0, 1.0], [23600.0, 1.0], [23800.0, 1.0], [24100.0, 1.0], [25700.0, 1.0], [27000.0, 1.0], [28500.0, 1.0], [29800.0, 1.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[2100.0, 1.0], [2000.0, 37.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[2000.0, 19.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[0.0, 18.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[4300.0, 4.0], [4200.0, 1.0], [4400.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [100200.0, 1.0], [3200.0, 1.0], [6800.0, 1.0], [3600.0, 2.0], [3800.0, 2.0], [3900.0, 4.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[14600.0, 3.0], [14700.0, 1.0], [14400.0, 1.0], [14800.0, 1.0], [14900.0, 1.0], [15000.0, 1.0], [15100.0, 1.0], [15200.0, 1.0], [15600.0, 1.0], [15400.0, 2.0], [15700.0, 2.0], [17000.0, 1.0], [17400.0, 1.0], [21500.0, 1.0], [26700.0, 1.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 95.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[0.0, 39.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[0.0, 27.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[2400.0, 10.0], [2500.0, 9.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[2000.0, 19.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[0.0, 56.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[0.0, 38.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[0.0, 18.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[11500.0, 1.0], [12100.0, 1.0], [11900.0, 1.0], [12900.0, 2.0], [13100.0, 1.0], [13700.0, 1.0], [15300.0, 1.0], [15700.0, 1.0], [16400.0, 1.0], [17000.0, 1.0], [17800.0, 1.0], [18100.0, 1.0], [19800.0, 1.0], [20400.0, 1.0], [24100.0, 1.0], [26100.0, 1.0], [29500.0, 1.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 23.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[600.0, 5.0], [700.0, 1.0], [500.0, 11.0], [1000.0, 2.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[4200.0, 1.0], [4100.0, 1.0], [4500.0, 1.0], [19500.0, 1.0], [10600.0, 1.0], [3300.0, 5.0], [3200.0, 3.0], [3400.0, 4.0], [3500.0, 2.0], [3600.0, 1.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1100.0, 1.0], [2400.0, 1.0], [1200.0, 1.0], [2500.0, 1.0], [1400.0, 2.0], [800.0, 1.0], [900.0, 7.0], [1000.0, 5.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[300.0, 18.0], [600.0, 2.0], [700.0, 11.0], [200.0, 57.0], [400.0, 1.0], [800.0, 4.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[2000.0, 22.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[2400.0, 14.0], [2500.0, 5.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[0.0, 82.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[18000.0, 1.0], [1200.0, 1.0], [300.0, 6.0], [600.0, 1.0], [1300.0, 1.0], [700.0, 5.0], [200.0, 18.0], [800.0, 3.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[600.0, 1.0], [19300.0, 1.0], [700.0, 16.0], [200.0, 19.0], [800.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[600.0, 1.0], [300.0, 4.0], [100200.0, 1.0], [200.0, 45.0], [400.0, 2.0], [900.0, 1.0], [7900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[600.0, 7.0], [700.0, 1.0], [13800.0, 1.0], [500.0, 9.0], [1000.0, 1.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[0.0, 22.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 100200.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 1421.0, "series": [{"data": [[0.0, 1421.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 237.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 238.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [[3.0, 4.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349342E12, "maxY": 18.75510204081631, "series": [{"data": [[1.73349372E12, 0.0], [1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.73349372E12, 18.75510204081631], [1.73349342E12, 1.950819672131148], [1.7334939E12, 4.486486486486487], [1.73349384E12, 9.823899371069183], [1.73349354E12, 12.162629757785464], [1.73349348E12, 6.42920353982301], [1.73349396E12, 1.7647058823529411], [1.73349366E12, 18.754789272030646], [1.7334936E12, 17.395604395604416], [1.73349378E12, 15.561403508771933]], "isOverall": false, "label": "Full Dry Run Flow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349396E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 100235.0, "series": [{"data": [[2.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [3.0, 2.0], [12.0, 11.0], [13.0, 1.0], [14.0, 2.0], [15.0, 1.0], [1.0, 2.0], [4.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[10.052631578947368, 1.631578947368421]], "isOverall": false, "label": "Invite user-0-Aggregated", "isController": false}, {"data": [[8.0, 932.0], [9.0, 914.0], [10.0, 942.0], [11.0, 1010.0], [12.0, 989.0], [13.0, 920.0], [14.0, 960.0], [16.0, 4329.0], [17.0, 4415.0], [18.0, 926.0], [19.0, 1227.3333333333333], [6.0, 964.0], [7.0, 945.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[14.315789473684212, 1580.2631578947369]], "isOverall": false, "label": "WS open for sr link-Aggregated", "isController": false}, {"data": [[8.0, 261.0], [9.0, 272.0], [10.0, 279.0], [11.0, 291.0], [12.0, 313.0], [13.0, 501.0], [14.0, 511.5], [15.0, 471.0], [17.0, 4164.5], [18.0, 888.0], [19.0, 460.3684210526316], [5.0, 271.0], [6.0, 262.0], [7.0, 280.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[15.526315789473681, 629.2105263157895]], "isOverall": false, "label": "Agree terms-Aggregated", "isController": false}, {"data": [[8.0, 745.0], [16.0, 3860.0], [17.0, 4502.0], [9.0, 747.0], [18.0, 721.0], [19.0, 775.1428571428572], [10.0, 782.5], [12.0, 821.0], [13.0, 786.0], [14.0, 765.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[15.31578947368421, 1326.578947368421]], "isOverall": false, "label": "Link SR profile-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [8.0, 10.0], [9.0, 2.0], [10.0, 1.0], [11.0, 3.0], [3.0, 2.0], [12.0, 1.0], [13.0, 2.0], [14.0, 2.0], [15.0, 2.0], [1.0, 7.0], [4.0, 1.0], [17.0, 1.5], [18.0, 2.0], [19.0, 1.0], [5.0, 2.0], [6.0, 2.0], [7.0, 1.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[10.052631578947368, 2.3684210526315796]], "isOverall": false, "label": "Invite sr-0-Aggregated", "isController": false}, {"data": [[17.0, 3.0], [18.0, 6.5], [19.0, 1.3], [10.0, 4.0], [6.0, 2.0], [13.0, 3.0], [7.0, 3.0], [15.0, 3.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[16.157894736842106, 2.4736842105263155]], "isOverall": false, "label": "Link user profile-0-Aggregated", "isController": false}, {"data": [[16.0, 3.0], [4.0, 1.0], [18.0, 2.3333333333333335], [19.0, 2.7142857142857144], [10.0, 3.0], [6.0, 3.0], [13.0, 3.0], [14.0, 2.0], [7.0, 3.0], [15.0, 85.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[15.111111111111109, 7.166666666666667]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[2.0, 258.5], [8.0, 245.5], [9.0, 249.5], [10.0, 251.0], [11.0, 246.5], [3.0, 241.5], [12.0, 241.0], [13.0, 265.0], [14.0, 246.0], [15.0, 244.0], [1.0, 242.5], [4.0, 257.0], [16.0, 235.0], [17.0, 351.25], [18.0, 245.0], [19.0, 333.5], [5.0, 262.5], [6.0, 252.5], [7.0, 262.5]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[10.205128205128204, 264.8205128205129]], "isOverall": false, "label": "Get Admin Access Token-Aggregated", "isController": false}, {"data": [[8.0, 2.0], [9.0, 2.0], [10.0, 2.0], [11.0, 1.0], [12.0, 2.0], [13.0, 2.5], [14.0, 1.0], [15.0, 2.3333333333333335], [17.0, 1.0], [18.0, 3.0], [19.0, 1.8421052631578947], [5.0, 2.0], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[15.526315789473681, 1.8157894736842108]], "isOverall": false, "label": "Agree terms-0-Aggregated", "isController": false}, {"data": [[16.0, 259.0], [4.0, 253.0], [18.0, 265.0], [19.0, 324.0], [10.0, 275.0], [6.0, 315.0], [13.0, 258.0], [14.0, 244.0], [7.0, 296.0], [15.0, 361.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[15.111111111111109, 295.7777777777778]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[2.0, 402.0], [8.0, 298.0], [9.0, 337.0], [10.0, 299.0], [11.0, 346.0], [3.0, 563.0], [12.0, 355.0], [13.0, 456.0], [14.0, 295.0], [15.0, 355.0], [1.0, 548.0], [4.0, 400.0], [17.0, 362.0], [18.0, 477.0], [19.0, 807.0], [5.0, 536.0], [6.0, 386.0], [7.0, 285.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[10.052631578947368, 414.1578947368422]], "isOverall": false, "label": "Invite sr-Aggregated", "isController": false}, {"data": [[16.0, 2060.0], [17.0, 2045.0], [18.0, 2046.6666666666667], [19.0, 2043.6], [14.0, 2044.0], [15.0, 2054.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[17.789473684210527, 2046.2105263157894]], "isOverall": false, "label": "Generate user keys-Aggregated", "isController": false}, {"data": [[2.0, 2043.0], [8.0, 2063.5], [9.0, 2053.0], [10.0, 2059.0], [11.0, 2049.0], [3.0, 2064.0], [13.0, 2064.0], [14.0, 2050.5], [15.0, 2060.0], [4.0, 2059.5], [17.0, 2037.0], [18.0, 2050.0], [19.0, 2048.5], [6.0, 2047.0], [7.0, 2053.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[10.578947368421053, 2053.8421052631575]], "isOverall": false, "label": "Generate sr keys-Aggregated", "isController": false}, {"data": [[16.0, 294.0], [4.0, 265.5], [1.0, 248.0], [18.0, 278.0], [19.0, 293.0], [10.0, 333.0], [5.0, 263.0], [13.0, 256.0], [14.0, 264.0], [7.0, 284.5], [15.0, 241.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[11.222222222222223, 280.44444444444446]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [8.0, 0.0], [9.0, 1.0], [10.0, 1.0], [11.0, 0.0], [3.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 0.6666666666666666], [1.0, 0.0], [4.0, 0.0], [17.0, 1.0], [18.0, 3.25], [19.0, 1.0], [5.0, 0.0], [6.0, 1.0], [7.0, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[13.868421052631577, 1.026315789473684]], "isOverall": false, "label": "Get Access Token-0-Aggregated", "isController": false}, {"data": [[16.0, 905.0], [4.0, 959.0], [18.0, 1168.0], [19.0, 1281.0], [10.0, 1106.0], [6.0, 1016.0], [13.0, 970.0], [14.0, 929.0], [7.0, 956.0], [15.0, 955.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[15.111111111111109, 1125.9444444444443]], "isOverall": false, "label": "WS open for policy import-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [8.0, 1.0], [9.0, 1.0], [10.0, 0.0], [11.0, 1.0], [3.0, 1.0], [13.0, 1.0], [14.0, 0.5], [15.0, 1.0], [4.0, 1.0], [17.0, 0.0], [18.0, 1.0], [19.0, 0.5], [6.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[10.578947368421053, 0.6315789473684211]], "isOverall": false, "label": "Generate sr keys-0-Aggregated", "isController": false}, {"data": [[8.0, 7773.0], [9.0, 16290.0], [10.0, 8047.0], [11.0, 9080.0], [12.0, 21696.0], [3.0, 12814.0], [13.0, 8494.0], [14.0, 15592.0], [15.0, 24933.0], [16.0, 7324.0], [4.0, 12523.0], [1.0, 8946.0], [17.0, 8140.0], [18.0, 13416.0], [19.0, 10823.0], [5.0, 12371.0], [6.0, 12205.0], [7.0, 20619.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[10.444444444444445, 12838.111111111111]], "isOverall": false, "label": "Dry Run Policy-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept user-Aggregated", "isController": true}, {"data": [[16.0, 2225.25], [17.0, 4681.5], [9.0, 262.0], [18.0, 590.7777777777778], [19.0, 355.1190476190477], [10.0, 280.0], [11.0, 281.5], [12.0, 304.6666666666667], [13.0, 286.0], [14.0, 271.0], [15.0, 451.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[17.0, 778.5243902439018]], "isOverall": false, "label": "Get SR link result-Aggregated", "isController": false}, {"data": [[16.0, 267.0], [18.0, 260.0], [19.0, 306.9230769230769], [10.0, 272.0], [14.0, 259.0], [15.0, 349.5]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[17.631578947368414, 302.47368421052636]], "isOverall": false, "label": "Get User Access Token-Aggregated", "isController": false}, {"data": [[2.0, 559.0], [8.0, 592.0], [9.0, 552.0], [10.0, 589.0], [11.0, 564.0], [3.0, 537.0], [12.0, 613.0], [13.0, 558.0], [14.0, 641.0], [15.0, 565.0], [1.0, 544.0], [4.0, 554.0], [17.0, 591.5], [18.0, 1102.0], [19.0, 808.0], [5.0, 544.0], [6.0, 582.0], [7.0, 533.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[10.052631578947368, 611.5789473684209]], "isOverall": false, "label": "Accept user-Aggregated", "isController": false}, {"data": [[16.0, 11907.0], [18.0, 1235.6666666666667], [19.0, 730.25], [13.0, 1133.0], [15.0, 602.5]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[17.94736842105263, 1406.0526315789473]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[18.0, 1072.0], [19.0, 678.3333333333334], [10.0, 309.0], [13.0, 758.0], [14.0, 307.0], [7.0, 259.0], [15.0, 265.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[16.578947368421055, 601.0]], "isOverall": false, "label": "Get SR DID-Aggregated", "isController": false}, {"data": [[17.0, 259.0], [18.0, 314.5], [19.0, 363.6], [10.0, 253.0], [6.0, 278.0], [13.0, 621.5], [7.0, 267.0], [15.0, 306.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[16.157894736842106, 361.63157894736844]], "isOverall": false, "label": "Link user profile-Aggregated", "isController": false}, {"data": [[2.0, 2046.0], [8.0, 2049.0], [9.0, 2045.0], [10.0, 2046.0], [11.0, 2042.0], [3.0, 2048.0], [12.0, 2037.0], [13.0, 2048.0], [14.0, 2052.0], [15.0, 2047.0], [4.0, 2043.0], [16.0, 2054.0], [17.0, 2043.5], [18.0, 2044.0], [19.0, 2056.5], [5.0, 2043.0], [6.0, 2045.0], [7.0, 2041.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[12.043478260869566, 2046.1304347826087]], "isOverall": false, "label": "Get key gen result-Aggregated", "isController": false}, {"data": [[2.0, 452.0], [8.0, 291.0], [9.0, 292.0], [10.0, 295.0], [11.0, 322.0], [3.0, 265.0], [12.0, 342.0], [13.0, 277.0], [14.0, 357.0], [15.0, 312.0], [1.0, 356.0], [4.0, 274.0], [17.0, 502.5], [18.0, 369.0], [19.0, 280.0], [5.0, 274.0], [6.0, 471.0], [7.0, 291.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[10.052631578947368, 343.42105263157885]], "isOverall": false, "label": "Invite user-Aggregated", "isController": false}, {"data": [[8.0, 0.0], [9.0, 1.0], [10.0, 1.0], [11.0, 2.0], [3.0, 1.0], [12.0, 3.0], [13.0, 2.0], [14.0, 2.0], [15.0, 2.0], [4.0, 0.0], [17.0, 2.0], [18.0, 1.0], [19.0, 1.75], [5.0, 1.0], [6.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[12.0, 1.5263157894736843]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[16.0, 2.0], [4.0, 1.0], [18.0, 1.3333333333333333], [19.0, 1.5714285714285714], [10.0, 3.0], [6.0, 4.0], [13.0, 15.0], [14.0, 3.0], [7.0, 3.0], [15.0, 1.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[15.111111111111109, 2.611111111111111]], "isOverall": false, "label": "WS open for policy import-0-Aggregated", "isController": false}, {"data": [[8.0, 42249.0], [4.0, 37633.0], [17.0, 41877.0], [18.0, 43588.333333333336], [19.0, 42437.28571428572], [10.0, 43231.0], [6.0, 36584.0], [13.0, 48635.0], [14.0, 42533.0], [7.0, 35341.0], [15.0, 42085.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[14.789473684210527, 41999.68421052633]], "isOverall": false, "label": "User creation flow-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [8.0, 0.0], [9.0, 0.0], [10.0, 0.0], [11.0, 0.0], [3.0, 0.0], [12.0, 0.0], [13.0, 0.0], [14.0, 1.0], [15.0, 1.0], [1.0, 1.0], [4.0, 1.0], [17.0, 0.0], [18.0, 1.0], [19.0, 1.0], [5.0, 0.0], [6.0, 1.0], [7.0, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[10.052631578947368, 0.368421052631579]], "isOverall": false, "label": "WS open for sr key gen-0-Aggregated", "isController": false}, {"data": [[8.0, 8060.0], [9.0, 16527.0], [10.0, 8290.0], [11.0, 9404.0], [12.0, 21945.0], [3.0, 13065.0], [13.0, 8764.0], [14.0, 15865.0], [15.0, 25181.0], [16.0, 7580.0], [4.0, 12758.0], [1.0, 9246.0], [17.0, 8479.0], [18.0, 13713.0], [19.0, 11088.0], [5.0, 12624.0], [6.0, 12460.0], [7.0, 20869.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[10.444444444444445, 13106.555555555557]], "isOverall": false, "label": "Requests for DryRun-Aggregated", "isController": true}, {"data": [[2.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 2.0], [3.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 2.0], [15.0, 2.0], [1.0, 2.0], [4.0, 2.0], [17.0, 1.5], [18.0, 3.0], [19.0, 2.0], [5.0, 2.0], [6.0, 2.0], [7.0, 1.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[10.052631578947368, 1.5789473684210527]], "isOverall": false, "label": "WS open for sr key gen-Aggregated", "isController": false}, {"data": [[18.0, 588.25], [19.0, 369.3076923076923], [10.0, 489.0], [5.0, 758.0], [13.0, 273.0], [14.0, 262.0], [7.0, 289.5], [15.0, 285.6666666666667]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[15.925925925925926, 402.2592592592592]], "isOverall": false, "label": "Get user link result-Aggregated", "isController": false}, {"data": [[16.0, 1.0], [17.0, 0.5], [18.0, 1.0], [19.0, 1.6], [14.0, 1.0], [15.0, 0.5]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[17.789473684210527, 1.210526315789474]], "isOverall": false, "label": "Generate user keys-0-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link user-Aggregated", "isController": true}, {"data": [[2.0, 0.5], [8.0, 0.5], [9.0, 1.0], [10.0, 1.0], [11.0, 1.5], [3.0, 0.5], [12.0, 1.5], [13.0, 1.0], [14.0, 0.5], [15.0, 7.0], [1.0, 2.5], [4.0, 1.0], [17.0, 0.8], [18.0, 1.0], [19.0, 0.5], [5.0, 1.0], [6.0, 1.0], [7.0, 1.5]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[10.23076923076923, 1.307692307692308]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[16.0, 17323.0], [17.0, 23669.333333333332], [18.0, 16456.5], [19.0, 24249.0], [14.0, 15513.0], [15.0, 17278.5]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[17.73684210526316, 21779.157894736847]], "isOverall": false, "label": "User creation(SR side)-Aggregated", "isController": true}, {"data": [[2.0, 2050.0], [8.0, 2056.0], [9.0, 2056.0], [10.0, 2058.0], [11.0, 2054.0], [3.0, 2046.0], [12.0, 2047.0], [13.0, 2045.0], [14.0, 2053.6666666666665], [15.0, 2046.6666666666667], [1.0, 2045.0], [4.0, 2052.0], [17.0, 2045.25], [18.0, 2057.25], [19.0, 2056.272727272727], [5.0, 2053.0], [6.0, 2055.0], [7.0, 2048.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[13.868421052631577, 2052.5000000000005]], "isOverall": false, "label": "Get Access Token-Aggregated", "isController": false}, {"data": [[17.0, 2038.0], [18.0, 2047.0], [19.0, 2045.6], [13.0, 2057.0], [15.0, 2055.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[17.736842105263158, 2047.578947368421]], "isOverall": false, "label": "Get user keys-Aggregated", "isController": false}, {"data": [[16.0, 2.0], [4.0, 1.5], [1.0, 1.0], [18.0, 2.0], [19.0, 2.0], [10.0, 2.3333333333333335], [5.0, 3.0], [13.0, 3.0], [14.0, 3.0], [7.0, 3.0], [15.0, 2.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[11.222222222222223, 2.2777777777777777]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[17.0, 0.5], [18.0, 0.6666666666666666], [19.0, 1.7000000000000004], [14.0, 0.5], [15.0, 1.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[17.68421052631579, 1.2105263157894741]], "isOverall": false, "label": "WS open for user key gen-0-Aggregated", "isController": false}, {"data": [[16.0, 4331.0], [4.0, 3811.5], [2.0, 100235.0], [1.0, 3662.0], [18.0, 4273.333333333333], [19.0, 6801.0], [10.0, 3880.3333333333335], [5.0, 3088.0], [13.0, 4320.5], [14.0, 4242.0], [7.0, 3093.5], [15.0, 3982.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[10.73684210526316, 9118.578947368422]], "isOverall": false, "label": "Requests for Import-Aggregated", "isController": true}, {"data": [[8.0, 15275.0], [4.0, 14892.0], [17.0, 15703.0], [18.0, 15879.0], [19.0, 17889.85714285714], [10.0, 15743.0], [6.0, 14681.0], [13.0, 15439.0], [14.0, 15193.0], [7.0, 14497.0], [15.0, 15058.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[14.789473684210527, 16281.421052631582]], "isOverall": false, "label": "User creation(user side)-Aggregated", "isController": true}, {"data": [[9.0, 3.0], [10.0, 2.7142857142857144], [3.0, 3.0], [13.0, 2.2857142857142856], [14.0, 3.7142857142857144], [15.0, 2.1333333333333333], [16.0, 2.6666666666666665], [4.0, 2.4444444444444446], [1.0, 1.0], [18.0, 2.153846153846154], [19.0, 2.7000000000000006], [5.0, 3.0], [6.0, 2.0], [7.0, 3.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[13.263157894736837, 2.5578947368421043]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[2.0, 1.5], [8.0, 1.0], [9.0, 1.0], [10.0, 0.5], [11.0, 0.5], [3.0, 2.0], [12.0, 0.5], [13.0, 2.0], [14.0, 0.0], [15.0, 1.0], [1.0, 2.5], [4.0, 1.5], [16.0, 0.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [5.0, 5.0], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[10.205128205128204, 1.2820512820512817]], "isOverall": false, "label": "Get Admin Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 2.0], [8.0, 1.0], [9.0, 2.0], [10.0, 1.0], [11.0, 2.0], [3.0, 1.0], [12.0, 1.0], [13.0, 2.0], [14.0, 1.0], [15.0, 1.0], [1.0, 1.0], [4.0, 1.0], [17.0, 1.0], [18.0, 2.0], [19.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[10.052631578947368, 1.2631578947368427]], "isOverall": false, "label": "Accept sr-0-Aggregated", "isController": false}, {"data": [[18.0, 2.0], [19.0, 2.0000000000000004], [10.0, 3.0], [5.0, 2.0], [13.0, 2.0], [14.0, 2.0], [7.0, 3.0], [15.0, 3.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[15.925925925925926, 2.2592592592592595]], "isOverall": false, "label": "Get user link result-0-Aggregated", "isController": false}, {"data": [[2.0, 2538.0], [8.0, 2510.0], [9.0, 2461.0], [10.0, 2493.0], [11.0, 2482.0], [3.0, 2554.0], [12.0, 2484.0], [13.0, 2574.0], [14.0, 2478.0], [15.0, 2475.0], [1.0, 2576.0], [4.0, 2473.0], [17.0, 2508.5], [18.0, 2587.0], [19.0, 2585.0], [5.0, 2471.0], [6.0, 2501.0], [7.0, 2491.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[10.052631578947368, 2513.1578947368425]], "isOverall": false, "label": "Login by SR OS-Aggregated", "isController": false}, {"data": [[2.0, 2051.0], [8.0, 2049.0], [9.0, 2047.0], [10.0, 2036.0], [11.0, 2049.0], [3.0, 2056.0], [12.0, 2050.0], [13.0, 2055.0], [14.0, 2037.0], [15.0, 2037.0], [4.0, 2048.0], [17.0, 2042.0], [18.0, 2051.5], [19.0, 2053.5], [5.0, 2052.0], [6.0, 2037.0], [7.0, 2042.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[11.052631578947368, 2047.2631578947369]], "isOverall": false, "label": "Get sr keys-Aggregated", "isController": false}, {"data": [[17.0, 1.5], [18.0, 2.0], [19.0, 2.8000000000000003], [14.0, 1.5], [15.0, 2.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[17.68421052631579, 2.31578947368421]], "isOverall": false, "label": "WS open for user key gen-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [2.0, 1.0], [9.0, 2.0], [10.0, 1.8], [11.0, 2.0], [12.0, 2.0], [13.0, 2.75], [14.0, 1.6666666666666667], [15.0, 1.6666666666666665], [4.0, 1.5], [16.0, 3.0], [1.0, 3.0], [17.0, 1.0], [18.0, 1.1428571428571428], [19.0, 1.5384615384615383], [5.0, 2.0], [6.0, 2.0], [7.0, 2.5]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[12.874999999999998, 1.7500000000000007]], "isOverall": false, "label": "Get SR Access Token-0-Aggregated", "isController": false}, {"data": [[16.0, 3.0], [8.0, 1.0], [4.0, 3.0], [17.0, 2.0], [18.0, 2.0], [19.0, 1.7058823529411764], [10.0, 1.0], [6.0, 2.0], [13.0, 4.0], [14.0, 1.5], [7.0, 3.0], [15.0, 2.3333333333333335]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[16.263157894736842, 1.9473684210526316]], "isOverall": false, "label": "Verify link-0-Aggregated", "isController": false}, {"data": [[8.0, 3.0], [9.0, 3.0], [10.0, 4.0], [11.0, 3.0], [12.0, 3.0], [3.0, 3.0], [13.0, 1.0], [14.0, 3.0], [15.0, 2.0], [16.0, 3.0], [4.0, 1.0], [1.0, 1.0], [17.0, 3.0], [18.0, 3.0], [19.0, 3.0], [5.0, 1.0], [6.0, 3.0], [7.0, 3.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[10.444444444444445, 2.555555555555555]], "isOverall": false, "label": "Dry Run Policy-0-Aggregated", "isController": false}, {"data": [[8.0, 11920.0], [9.0, 20402.0], [10.0, 12196.0], [11.0, 13708.0], [12.0, 26187.0], [3.0, 17043.0], [13.0, 13101.0], [14.0, 19847.0], [15.0, 29512.0], [16.0, 11550.0], [4.0, 16403.0], [1.0, 12908.0], [17.0, 12935.0], [18.0, 18107.0], [19.0, 17889.0], [5.0, 15712.0], [6.0, 15366.0], [7.0, 24150.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[10.444444444444445, 17163.111111111106]], "isOverall": false, "label": "Policy import and dry run-Aggregated", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept SR-Aggregated", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link SR-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [8.0, 1.0], [9.0, 0.0], [10.0, 0.0], [11.0, 1.0], [3.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 0.0], [4.0, 1.0], [16.0, 1.0], [17.0, 0.5], [18.0, 1.0], [19.0, 0.5], [5.0, 0.0], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[12.043478260869566, 0.6521739130434783]], "isOverall": false, "label": "Get key gen result-0-Aggregated", "isController": false}, {"data": [[2.0, 594.0], [8.0, 582.0], [9.0, 589.0], [10.0, 591.0], [11.0, 635.0], [3.0, 587.0], [12.0, 619.0], [13.0, 631.0], [14.0, 545.0], [15.0, 593.0], [1.0, 566.0], [4.0, 573.0], [17.0, 673.0], [18.0, 1090.0], [19.0, 637.0], [5.0, 569.0], [6.0, 583.0], [7.0, 1095.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[10.052631578947368, 653.9473684210526]], "isOverall": false, "label": "Accept sr-Aggregated", "isController": false}, {"data": [[2.0, 3510.0], [8.0, 3237.0], [9.0, 3276.0], [10.0, 3276.0], [11.0, 3366.0], [3.0, 3361.0], [12.0, 3492.0], [13.0, 3460.0], [14.0, 3304.0], [15.0, 3347.0], [1.0, 3571.0], [4.0, 3336.0], [17.0, 11493.666666666666], [18.0, 4580.0], [19.0, 4192.0], [5.0, 3452.0], [6.0, 3485.0], [7.0, 3693.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[10.4, 4720.95]], "isOverall": false, "label": "User creation(admin side)-Aggregated", "isController": true}, {"data": [[16.0, 1.0], [17.0, 1.0], [18.0, 0.6666666666666666], [19.0, 1.5], [14.0, 0.5], [15.0, 0.5]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[17.631578947368425, 1.1052631578947374]], "isOverall": false, "label": "Login by user OS-0-Aggregated", "isController": false}, {"data": [[18.0, 1007.5], [19.0, 1336.25], [10.0, 1277.0], [13.0, 1012.0], [14.0, 972.0], [7.0, 949.0], [15.0, 916.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[17.0, 1219.7894736842102]], "isOverall": false, "label": "WS open for user link-Aggregated", "isController": false}, {"data": [[9.0, 274.0], [10.0, 339.2857142857143], [3.0, 270.5], [13.0, 413.7142857142857], [14.0, 346.0], [15.0, 384.8666666666667], [16.0, 278.6666666666667], [4.0, 285.44444444444446], [1.0, 760.0], [18.0, 431.84615384615375], [19.0, 415.95], [5.0, 480.0], [6.0, 537.0], [7.0, 282.8]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[13.263157894736837, 382.178947368421]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[8.0, 2.0], [9.0, 1.0], [10.0, 2.0], [11.0, 2.0], [12.0, 1.0], [13.0, 9.0], [14.0, 2.0], [16.0, 2.0], [17.0, 1.5], [18.0, 1.0], [19.0, 1.5], [6.0, 2.0], [7.0, 1.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[14.315789473684212, 1.9473684210526314]], "isOverall": false, "label": "WS open for sr link-0-Aggregated", "isController": false}, {"data": [[18.0, 2.5], [19.0, 1.916666666666667], [10.0, 2.0], [13.0, 1.0], [14.0, 7.0], [7.0, 2.0], [15.0, 3.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[17.0, 2.263157894736842]], "isOverall": false, "label": "WS open for user link-0-Aggregated", "isController": false}, {"data": [[16.0, 2039.5], [17.0, 2042.75], [18.0, 2047.25], [19.0, 2043.888888888889], [14.0, 2044.0], [15.0, 2044.5]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[17.590909090909093, 2043.9545454545457]], "isOverall": false, "label": "Get user key gen result-Aggregated", "isController": false}, {"data": [[16.0, 1.0], [18.0, 1.6666666666666667], [19.0, 1.6666666666666665], [13.0, 2.0], [15.0, 1.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[17.94736842105263, 1.5789473684210524]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[16.0, 3.0], [18.0, 1.0], [19.0, 1.7692307692307692], [10.0, 3.0], [14.0, 1.0], [15.0, 3.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[17.631578947368414, 1.9473684210526314]], "isOverall": false, "label": "Get User Access Token-0-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [16.0, 2.0], [17.0, 1.0], [9.0, 2.0], [18.0, 0.0], [19.0, 1.7142857142857144], [10.0, 1.0], [12.0, 1.0], [13.0, 0.0], [14.0, 0.5]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[15.31578947368421, 1.2105263157894737]], "isOverall": false, "label": "Link SR profile-0-Aggregated", "isController": false}, {"data": [[2.0, 2.0], [8.0, 1.0], [9.0, 2.0], [10.0, 1.0], [11.0, 1.0], [3.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 1.0], [1.0, 2.0], [4.0, 1.0], [17.0, 1.5], [18.0, 1.0], [19.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[10.052631578947368, 1.2105263157894737]], "isOverall": false, "label": "Accept user-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [8.0, 1.0], [9.0, 0.0], [10.0, 0.0], [11.0, 0.0], [3.0, 0.0], [12.0, 1.0], [13.0, 1.0], [14.0, 0.0], [15.0, 1.0], [4.0, 0.0], [17.0, 0.0], [18.0, 0.5], [19.0, 0.0], [5.0, 1.0], [6.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[11.052631578947368, 0.368421052631579]], "isOverall": false, "label": "Get sr keys-0-Aggregated", "isController": false}, {"data": [[16.0, 2493.0], [17.0, 2482.0], [18.0, 2490.6666666666665], [19.0, 2506.1000000000004], [14.0, 2474.5], [15.0, 2504.5]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[17.631578947368425, 2498.210526315789]], "isOverall": false, "label": "Login by user OS-Aggregated", "isController": false}, {"data": [[16.0, 1.75], [17.0, 1.5], [9.0, 1.0], [18.0, 1.8888888888888888], [19.0, 1.9523809523809517], [10.0, 1.5], [11.0, 0.5], [12.0, 1.6666666666666667], [13.0, 1.4], [14.0, 1.5], [15.0, 1.25]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[17.0, 1.7439024390243898]], "isOverall": false, "label": "Get SR link result-0-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate user hedera data-Aggregated", "isController": true}, {"data": [[16.0, 303.0], [8.0, 283.0], [4.0, 260.0], [17.0, 5070.75], [18.0, 540.0], [19.0, 441.70588235294116], [10.0, 257.0], [6.0, 268.0], [13.0, 813.0], [14.0, 508.5], [7.0, 269.0], [15.0, 647.3333333333334]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[16.263157894736842, 944.8421052631581]], "isOverall": false, "label": "Verify link-Aggregated", "isController": false}, {"data": [[2.0, 493.0], [8.0, 491.5], [9.0, 503.5], [10.0, 500.0], [11.0, 503.0], [3.0, 463.0], [12.0, 540.5], [13.0, 504.0], [14.0, 487.0], [15.0, 517.0], [1.0, 536.0], [4.0, 510.5], [17.0, 5716.199999999999], [18.0, 526.0], [19.0, 496.5], [5.0, 502.0], [6.0, 479.0], [7.0, 482.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[10.23076923076923, 1170.5128205128203]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[8.0, 288.0], [2.0, 100234.0], [9.0, 250.0], [10.0, 261.6], [11.0, 254.0], [12.0, 297.0], [13.0, 289.75], [14.0, 245.33333333333334], [15.0, 409.0], [4.0, 253.25], [16.0, 248.0], [1.0, 300.0], [17.0, 4143.0], [18.0, 344.42857142857144], [19.0, 322.38461538461536], [5.0, 249.0], [6.0, 351.5], [7.0, 258.25]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[12.874999999999998, 2222.0714285714284]], "isOverall": false, "label": "Get SR Access Token-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate sr hedera data-Aggregated", "isController": true}, {"data": [[8.0, 591.0], [9.0, 601.0], [10.0, 584.0], [11.0, 606.0], [3.0, 657.0], [12.0, 573.0], [13.0, 607.0], [14.0, 564.0], [15.0, 1038.0], [4.0, 606.0], [17.0, 13847.0], [18.0, 716.0], [19.0, 603.75], [5.0, 574.0], [6.0, 587.0], [7.0, 599.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[12.0, 1324.473684210526]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[16.0, 1.0], [17.0, 0.5], [18.0, 0.75], [19.0, 0.8888888888888888], [14.0, 1.0], [15.0, 0.5]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[17.590909090909093, 0.7727272727272727]], "isOverall": false, "label": "Get user key gen result-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [8.0, 1.0], [9.0, 0.0], [10.0, 0.0], [11.0, 1.0], [3.0, 0.0], [12.0, 0.0], [13.0, 0.0], [14.0, 1.0], [15.0, 1.0], [1.0, 1.0], [4.0, 1.0], [17.0, 0.0], [18.0, 1.0], [19.0, 0.0], [5.0, 0.0], [6.0, 0.0], [7.0, 1.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[10.052631578947368, 0.4210526315789473]], "isOverall": false, "label": "Login by SR OS-0-Aggregated", "isController": false}, {"data": [[18.0, 2.0], [19.0, 1.5], [10.0, 2.0], [13.0, 3.0], [14.0, 1.0], [7.0, 2.0], [15.0, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[16.578947368421055, 1.5789473684210527]], "isOverall": false, "label": "Get SR DID-0-Aggregated", "isController": false}, {"data": [[17.0, 1.0], [18.0, 0.75], [19.0, 0.8], [13.0, 1.0], [15.0, 0.6666666666666666]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[17.736842105263158, 0.7894736842105262]], "isOverall": false, "label": "Get user keys-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 19.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 107.63333333333334, "minX": 1.73349342E12, "maxY": 191153.25, "series": [{"data": [[1.73349372E12, 184310.15], [1.73349342E12, 13744.083333333334], [1.7334939E12, 52538.4], [1.73349384E12, 114833.56666666667], [1.73349354E12, 92330.66666666667], [1.73349348E12, 53498.0], [1.73349396E12, 12259.666666666666], [1.73349366E12, 139481.18333333332], [1.7334936E12, 147855.06666666668], [1.73349378E12, 191153.25]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73349372E12, 1730.9666666666667], [1.73349342E12, 348.4166666666667], [1.7334939E12, 448.95], [1.73349384E12, 964.05], [1.73349354E12, 1654.4], [1.73349348E12, 1258.7833333333333], [1.73349396E12, 107.63333333333334], [1.73349366E12, 1505.4333333333334], [1.7334936E12, 2124.8166666666666], [1.73349378E12, 1676.55]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349396E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349342E12, "maxY": 100235.0, "series": [{"data": [[1.73349342E12, 1.5], [1.73349354E12, 2.8333333333333335], [1.73349348E12, 1.0], [1.7334936E12, 1.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73349354E12, 955.8333333333334], [1.73349348E12, 947.0], [1.73349366E12, 1227.3333333333333], [1.7334936E12, 3521.25]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73349372E12, 291.6], [1.73349384E12, 512.5], [1.73349354E12, 277.66666666666663], [1.73349348E12, 268.5], [1.73349366E12, 404.6666666666667], [1.7334936E12, 2322.8], [1.73349378E12, 554.25]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73349372E12, 888.0], [1.73349354E12, 783.6666666666667], [1.73349348E12, 746.0], [1.73349366E12, 759.6], [1.7334936E12, 2865.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73349342E12, 3.3333333333333335], [1.73349354E12, 1.8333333333333335], [1.73349348E12, 3.0], [1.7334936E12, 1.5]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73349372E12, 3.142857142857143], [1.7334939E12, 2.0], [1.73349384E12, 3.25], [1.73349366E12, 0.8], [1.73349378E12, 3.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73349372E12, 3.0000000000000004], [1.7334939E12, 2.0], [1.73349384E12, 3.0], [1.73349366E12, 1.0], [1.73349378E12, 16.166666666666668]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73349342E12, 247.6], [1.73349354E12, 249.33333333333334], [1.73349348E12, 254.99999999999997], [1.7334936E12, 303.79999999999995]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73349372E12, 2.6], [1.73349384E12, 3.0], [1.73349354E12, 1.5], [1.73349348E12, 1.5], [1.73349366E12, 1.5833333333333333], [1.7334936E12, 1.4], [1.73349378E12, 2.25]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73349372E12, 288.8333333333333], [1.7334939E12, 284.0], [1.73349384E12, 276.3333333333333], [1.73349366E12, 535.0], [1.73349378E12, 276.5]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73349342E12, 504.3333333333333], [1.73349354E12, 351.0], [1.73349348E12, 373.6666666666667], [1.7334936E12, 502.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73349372E12, 2045.5], [1.73349354E12, 2055.0], [1.73349366E12, 2041.2], [1.7334936E12, 2048.0], [1.73349378E12, 2049.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73349342E12, 2053.5], [1.73349354E12, 2054.333333333333], [1.73349348E12, 2057.6666666666665], [1.7334936E12, 2048.8]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73349372E12, 293.0], [1.7334939E12, 264.6666666666667], [1.73349384E12, 297.14285714285717], [1.73349396E12, 248.0], [1.73349378E12, 272.1666666666667]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73349372E12, 1.25], [1.73349342E12, 0.0], [1.73349354E12, 0.8571428571428572], [1.73349348E12, 0.33333333333333337], [1.73349366E12, 1.0], [1.7334936E12, 1.5833333333333333], [1.73349378E12, 1.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73349372E12, 983.8333333333334], [1.7334939E12, 987.5], [1.73349384E12, 1010.6666666666666], [1.73349366E12, 3064.0], [1.73349378E12, 1048.8333333333333]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73349342E12, 0.5], [1.73349354E12, 0.6666666666666666], [1.73349348E12, 0.6666666666666667], [1.7334936E12, 0.6]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73349372E12, 10823.0], [1.7334939E12, 12366.333333333334], [1.73349384E12, 13142.714285714284], [1.73349396E12, 10880.0], [1.73349378E12, 13881.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73349372E12, 381.49999999999994], [1.73349354E12, 283.11764705882354], [1.73349366E12, 364.42105263157896], [1.7334936E12, 2072.9999999999995], [1.73349378E12, 562.25]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73349372E12, 303.0], [1.73349384E12, 272.0], [1.73349366E12, 325.3333333333333], [1.7334936E12, 261.0], [1.73349378E12, 306.25]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73349342E12, 551.5], [1.73349354E12, 586.1666666666667], [1.73349348E12, 557.0], [1.7334936E12, 731.6]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73349372E12, 805.5], [1.73349384E12, 1133.0], [1.73349366E12, 731.0], [1.7334936E12, 2977.6], [1.73349378E12, 954.25]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73349372E12, 789.1666666666666], [1.73349384E12, 292.3333333333333], [1.73349366E12, 567.5], [1.73349378E12, 600.5]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73349372E12, 291.4285714285714], [1.7334939E12, 278.0], [1.73349384E12, 440.75], [1.73349366E12, 445.0], [1.73349378E12, 282.5]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73349342E12, 2046.0], [1.73349354E12, 2045.0], [1.73349348E12, 2044.8333333333333], [1.73349366E12, 2044.0], [1.7334936E12, 2048.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73349342E12, 404.0], [1.73349354E12, 314.1666666666667], [1.73349348E12, 311.0], [1.7334936E12, 393.2]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73349354E12, 1.8333333333333335], [1.73349348E12, 1.0], [1.73349366E12, 2.0], [1.7334936E12, 1.6]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73349372E12, 1.5], [1.7334939E12, 2.5], [1.73349384E12, 7.0], [1.73349366E12, 2.0], [1.73349378E12, 1.6666666666666665]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73349354E12, 43108.8], [1.73349348E12, 42456.4], [1.73349366E12, 37951.75], [1.7334936E12, 43672.2]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349342E12, 0.5], [1.73349354E12, 0.16666666666666666], [1.73349348E12, 0.33333333333333337], [1.7334936E12, 0.6]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73349372E12, 11088.0], [1.7334939E12, 12614.0], [1.73349384E12, 13408.42857142857], [1.73349396E12, 11155.5], [1.73349378E12, 14163.6]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73349342E12, 1.5], [1.73349354E12, 1.3333333333333333], [1.73349348E12, 1.5], [1.7334936E12, 2.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73349372E12, 359.6363636363637], [1.7334939E12, 758.0], [1.73349384E12, 389.25], [1.73349366E12, 401.6666666666667], [1.73349378E12, 423.125]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73349372E12, 2.75], [1.73349354E12, 0.0], [1.73349366E12, 0.8], [1.7334936E12, 0.8333333333333334], [1.73349378E12, 1.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349342E12, 1.4], [1.73349354E12, 1.0000000000000002], [1.73349348E12, 0.9166666666666666], [1.7334936E12, 2.1]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73349342E12, 15513.0], [1.73349354E12, 22913.166666666664], [1.73349348E12, 22822.8], [1.73349366E12, 18549.0], [1.7334936E12, 21358.166666666668]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73349372E12, 2057.5], [1.73349342E12, 2047.5], [1.73349354E12, 2051.142857142857], [1.73349348E12, 2051.6666666666665], [1.73349366E12, 2068.5], [1.7334936E12, 2046.5], [1.73349378E12, 2056.6666666666665]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73349372E12, 2050.6666666666665], [1.73349366E12, 2045.2857142857144], [1.7334936E12, 2040.0], [1.73349378E12, 2058.75]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73349372E12, 2.0], [1.7334939E12, 2.0], [1.73349384E12, 2.7142857142857144], [1.73349396E12, 1.0], [1.73349378E12, 2.1666666666666665]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73349372E12, 1.0], [1.73349354E12, 0.0], [1.73349366E12, 2.75], [1.7334936E12, 0.7142857142857143], [1.73349378E12, 1.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73349372E12, 4229.166666666667], [1.7334939E12, 3820.0], [1.73349384E12, 3213.0], [1.73349396E12, 100235.0], [1.73349366E12, 6801.0], [1.73349378E12, 3927.166666666667]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73349372E12, 15316.0], [1.73349366E12, 15872.000000000002], [1.7334936E12, 18504.6], [1.73349378E12, 15017.6]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73349372E12, 2.565217391304348], [1.7334939E12, 2.5], [1.73349384E12, 2.666666666666667], [1.73349396E12, 2.0], [1.73349366E12, 3.0], [1.73349378E12, 2.5294117647058822]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73349342E12, 2.0], [1.73349354E12, 0.75], [1.73349348E12, 1.9166666666666667], [1.7334936E12, 0.8]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73349342E12, 1.5], [1.73349354E12, 1.3333333333333333], [1.73349348E12, 1.1428571428571428], [1.7334936E12, 1.25]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73349372E12, 2.0], [1.7334939E12, 2.0], [1.73349384E12, 3.0], [1.73349366E12, 2.3333333333333335], [1.73349378E12, 2.2500000000000004]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73349342E12, 2557.0], [1.73349354E12, 2495.3333333333335], [1.73349348E12, 2500.0], [1.7334936E12, 2532.8]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349342E12, 2051.0], [1.73349354E12, 2045.6666666666667], [1.73349348E12, 2047.3333333333335], [1.73349366E12, 2050.0], [1.7334936E12, 2047.8]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73349372E12, 2.25], [1.73349354E12, 1.0], [1.73349366E12, 3.75], [1.7334936E12, 1.8571428571428572], [1.73349378E12, 2.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73349372E12, 1.5], [1.7334939E12, 2.0], [1.73349384E12, 2.3000000000000003], [1.73349354E12, 2.166666666666667], [1.73349348E12, 1.4], [1.73349396E12, 2.0], [1.73349366E12, 1.5], [1.7334936E12, 0.75], [1.73349378E12, 1.6666666666666665]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73349372E12, 2.2222222222222223], [1.7334939E12, 2.5], [1.73349384E12, 2.25], [1.73349354E12, 0.0], [1.73349366E12, 1.6666666666666667], [1.7334936E12, 1.2857142857142858], [1.73349378E12, 2.3333333333333335]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73349372E12, 3.0], [1.7334939E12, 1.6666666666666667], [1.73349384E12, 2.8571428571428568], [1.73349396E12, 2.0], [1.73349378E12, 2.8]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73349372E12, 17998.6], [1.7334939E12, 15451.333333333334], [1.73349384E12, 18409.333333333332], [1.73349378E12, 16765.85714285714]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.6666666666666666], [1.73349348E12, 0.8333333333333334], [1.73349366E12, 0.0], [1.7334936E12, 0.6666666666666666]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73349342E12, 580.0], [1.73349354E12, 602.3333333333334], [1.73349348E12, 653.9999999999999], [1.7334936E12, 768.25]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73349342E12, 3540.5], [1.73349354E12, 3362.3333333333335], [1.73349348E12, 3427.3333333333335], [1.7334936E12, 7766.666666666667]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73349372E12, 1.0], [1.73349354E12, 1.0], [1.73349366E12, 0.75], [1.7334936E12, 1.7142857142857144], [1.73349378E12, 0.33333333333333337]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73349372E12, 1040.2], [1.73349384E12, 1079.3333333333333], [1.73349366E12, 1494.5714285714284], [1.7334936E12, 1470.0], [1.73349378E12, 935.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73349372E12, 397.60869565217394], [1.7334939E12, 362.42857142857144], [1.73349384E12, 345.4285714285714], [1.73349396E12, 507.5], [1.73349366E12, 287.0], [1.73349378E12, 398.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73349354E12, 2.8333333333333335], [1.73349348E12, 1.6666666666666667], [1.73349366E12, 1.5], [1.7334936E12, 1.5]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73349372E12, 1.8], [1.73349384E12, 1.6666666666666667], [1.73349366E12, 2.142857142857143], [1.7334936E12, 2.0], [1.73349378E12, 4.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73349372E12, 2041.3333333333333], [1.73349366E12, 2045.2857142857142], [1.7334936E12, 2043.5], [1.73349378E12, 2044.5]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73349372E12, 2.0], [1.73349384E12, 2.0], [1.73349366E12, 1.6], [1.7334936E12, 1.4], [1.73349378E12, 1.25]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73349372E12, 2.2], [1.73349384E12, 3.0], [1.73349366E12, 1.6666666666666667], [1.7334936E12, 1.0], [1.73349378E12, 2.5]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73349372E12, 2.0], [1.73349354E12, 0.6666666666666667], [1.73349348E12, 1.5], [1.73349366E12, 1.6], [1.7334936E12, 1.2]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73349342E12, 2.0], [1.73349354E12, 1.1666666666666665], [1.73349348E12, 1.0], [1.7334936E12, 1.2]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73349342E12, 1.0], [1.73349354E12, 0.33333333333333337], [1.73349348E12, 0.33333333333333337], [1.73349366E12, 0.0], [1.7334936E12, 0.4]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73349372E12, 2509.5], [1.73349354E12, 2467.0], [1.73349366E12, 2498.75], [1.7334936E12, 2501.714285714286], [1.73349378E12, 2484.6666666666665]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73349372E12, 1.9545454545454544], [1.73349354E12, 1.3529411764705885], [1.73349366E12, 2.157894736842105], [1.7334936E12, 1.2500000000000002], [1.73349378E12, 2.75]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73349372E12, 337.44444444444446], [1.7334939E12, 264.0], [1.73349384E12, 405.5], [1.73349354E12, 742.0], [1.73349366E12, 590.8333333333334], [1.7334936E12, 3237.714285714286], [1.73349378E12, 418.44444444444446]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349342E12, 548.8], [1.73349354E12, 508.5], [1.73349348E12, 491.8333333333333], [1.7334936E12, 3090.2]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73349372E12, 266.1666666666667], [1.7334939E12, 282.2], [1.73349384E12, 268.5], [1.73349354E12, 266.0], [1.73349348E12, 273.0], [1.73349396E12, 50267.0], [1.73349366E12, 387.1666666666667], [1.7334936E12, 2304.5], [1.73349378E12, 308.9166666666667]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73349354E12, 589.1666666666667], [1.73349348E12, 602.3333333333334], [1.73349366E12, 609.5], [1.7334936E12, 3359.4000000000005]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73349372E12, 0.6666666666666667], [1.73349366E12, 0.8571428571428572], [1.7334936E12, 0.625], [1.73349378E12, 1.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73349342E12, 0.5], [1.73349354E12, 0.33333333333333337], [1.73349348E12, 0.5], [1.7334936E12, 0.4]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73349372E12, 1.5], [1.73349384E12, 2.0], [1.73349366E12, 1.5], [1.73349378E12, 1.5]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73349372E12, 1.3333333333333333], [1.73349366E12, 0.5714285714285714], [1.7334936E12, 0.8], [1.73349378E12, 0.75]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349396E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349342E12, "maxY": 50265.0, "series": [{"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73349372E12, 288.4], [1.73349384E12, 509.5], [1.73349354E12, 276.0], [1.73349348E12, 266.75], [1.73349366E12, 402.99999999999994], [1.7334936E12, 2321.4], [1.73349378E12, 552.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73349372E12, 886.0], [1.73349354E12, 782.8333333333333], [1.73349348E12, 744.5], [1.73349366E12, 757.8], [1.7334936E12, 2863.8]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73349342E12, 245.6], [1.73349354E12, 248.41666666666669], [1.73349348E12, 252.83333333333334], [1.7334936E12, 302.6]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73349372E12, 285.6666666666667], [1.7334939E12, 282.0], [1.73349384E12, 273.0], [1.73349366E12, 533.0], [1.73349378E12, 260.1666666666667]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73349342E12, 500.6666666666667], [1.73349354E12, 349.16666666666663], [1.73349348E12, 370.6666666666667], [1.7334936E12, 500.5]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73349372E12, 2042.5], [1.73349354E12, 2054.0], [1.73349366E12, 2039.8], [1.7334936E12, 2047.0], [1.73349378E12, 2048.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73349342E12, 2052.5], [1.73349354E12, 2053.5], [1.73349348E12, 2056.8333333333335], [1.7334936E12, 2048.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73349372E12, 290.0], [1.7334939E12, 245.0], [1.73349384E12, 289.85714285714283], [1.73349396E12, 247.0], [1.73349378E12, 268.8333333333333]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73349372E12, 10555.0], [1.7334939E12, 12121.0], [1.73349384E12, 12895.285714285716], [1.73349396E12, 10632.5], [1.73349378E12, 13660.8]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73349372E12, 379.45454545454544], [1.73349354E12, 281.47058823529414], [1.73349366E12, 362.00000000000006], [1.7334936E12, 2071.65], [1.73349378E12, 559.5]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73349372E12, 300.6], [1.73349384E12, 269.0], [1.73349366E12, 323.6666666666667], [1.7334936E12, 260.0], [1.73349378E12, 303.75]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73349342E12, 549.5], [1.73349354E12, 585.0], [1.73349348E12, 555.8333333333333], [1.7334936E12, 730.2]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73349372E12, 803.25], [1.73349384E12, 1130.0], [1.73349366E12, 729.4], [1.7334936E12, 2976.2], [1.73349378E12, 952.5]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73349372E12, 787.5], [1.73349384E12, 289.6666666666667], [1.73349366E12, 565.8333333333334], [1.73349378E12, 599.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73349372E12, 288.2857142857143], [1.7334939E12, 275.0], [1.73349384E12, 437.25], [1.73349366E12, 443.8], [1.73349378E12, 279.5]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73349342E12, 2045.0], [1.73349354E12, 2044.3333333333333], [1.73349348E12, 2043.8333333333333], [1.73349366E12, 2044.0], [1.7334936E12, 2047.111111111111]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73349342E12, 402.5], [1.73349354E12, 311.0], [1.73349348E12, 309.6666666666667], [1.7334936E12, 392.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73349372E12, 357.5454545454545], [1.7334939E12, 756.0], [1.73349384E12, 386.0], [1.73349366E12, 399.3333333333333], [1.73349378E12, 420.75]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73349372E12, 2056.25], [1.73349342E12, 2047.0], [1.73349354E12, 2050.142857142857], [1.73349348E12, 2051.1666666666665], [1.73349366E12, 2067.5], [1.7334936E12, 2044.7500000000002], [1.73349378E12, 2055.3333333333335]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73349372E12, 2049.3333333333335], [1.73349366E12, 2044.5714285714287], [1.7334936E12, 2039.2], [1.73349378E12, 2057.75]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73349372E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73349342E12, 2556.5], [1.73349354E12, 2494.5], [1.73349348E12, 2499.5], [1.7334936E12, 2532.4]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349342E12, 2050.0], [1.73349354E12, 2045.3333333333333], [1.73349348E12, 2046.1666666666667], [1.73349366E12, 2050.0], [1.7334936E12, 2047.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349396E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73349342E12, 578.5], [1.73349354E12, 600.8333333333334], [1.73349348E12, 652.8571428571428], [1.7334936E12, 767.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73349372E12, 394.82608695652175], [1.7334939E12, 358.8571428571429], [1.73349384E12, 340.0476190476191], [1.73349396E12, 505.5], [1.73349366E12, 284.0], [1.73349378E12, 394.94117647058823]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73349372E12, 2040.6666666666667], [1.73349366E12, 2044.4285714285713], [1.7334936E12, 2042.625], [1.73349378E12, 2043.5]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73349372E12, 2508.5], [1.73349354E12, 2466.0], [1.73349366E12, 2497.75], [1.7334936E12, 2499.8571428571427], [1.73349378E12, 2483.6666666666665]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73349372E12, 335.22222222222223], [1.7334939E12, 261.5], [1.73349384E12, 403.25], [1.73349354E12, 742.0], [1.73349366E12, 589.0], [1.7334936E12, 3236.4285714285716], [1.73349378E12, 415.77777777777777]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349342E12, 547.2], [1.73349354E12, 507.16666666666663], [1.73349348E12, 490.8333333333333], [1.7334936E12, 3088.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73349372E12, 264.5], [1.7334939E12, 280.2], [1.73349384E12, 266.1], [1.73349354E12, 263.6666666666667], [1.73349348E12, 271.4], [1.73349396E12, 50265.0], [1.73349366E12, 385.5], [1.7334936E12, 2303.5], [1.73349378E12, 306.9166666666667]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73349354E12, 587.3333333333333], [1.73349348E12, 600.8333333333333], [1.73349366E12, 607.0], [1.7334936E12, 3357.7999999999997]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349396E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349342E12, "maxY": 29034.4, "series": [{"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73349354E12, 952.6666666666667], [1.73349348E12, 945.3333333333334], [1.73349366E12, 1225.6666666666667], [1.7334936E12, 3519.75]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 232.5], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 116.83333333333331], [1.7334936E12, 97.4], [1.73349378E12, 262.75]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73349372E12, 483.0], [1.73349354E12, 501.8333333333333], [1.73349348E12, 478.0], [1.73349366E12, 422.6], [1.7334936E12, 2423.4]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73349372E12, 2025.25], [1.73349354E12, 2031.0], [1.73349366E12, 2022.2], [1.7334936E12, 2024.5], [1.73349378E12, 2025.6666666666667]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73349342E12, 2031.5], [1.73349354E12, 2030.6666666666665], [1.73349348E12, 2033.3333333333335], [1.7334936E12, 2025.2]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73349372E12, 982.1666666666667], [1.7334939E12, 985.0], [1.73349384E12, 1003.3333333333334], [1.73349366E12, 3062.0], [1.73349378E12, 1046.8333333333333]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73349372E12, 94.86363636363637], [1.73349354E12, 0.0], [1.73349366E12, 48.78947368421053], [1.7334936E12, 24.099999999999998], [1.73349378E12, 171.75]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73349372E12, 163.25], [1.73349384E12, 514.0], [1.73349366E12, 95.6], [1.7334936E12, 0.0], [1.73349378E12, 292.75]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73349372E12, 441.8333333333333], [1.73349384E12, 0.0], [1.73349366E12, 258.83333333333337], [1.73349378E12, 300.25]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73349342E12, 2021.0], [1.73349354E12, 2023.6666666666667], [1.73349348E12, 2020.0], [1.73349366E12, 2019.0], [1.7334936E12, 2025.9999999999998]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73349354E12, 27532.2], [1.73349348E12, 29034.4], [1.73349366E12, 26850.25], [1.7334936E12, 27760.4]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73349342E12, 1.0], [1.73349354E12, 1.1666666666666665], [1.73349348E12, 1.0], [1.7334936E12, 1.4]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73349372E12, 44.81818181818181], [1.7334939E12, 504.0], [1.73349384E12, 117.24999999999999], [1.73349366E12, 0.0], [1.73349378E12, 87.75]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73349342E12, 12041.0], [1.73349354E12, 15266.833333333334], [1.73349348E12, 15652.6], [1.73349366E12, 13768.0], [1.7334936E12, 13541.166666666666]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73349372E12, 2032.75], [1.73349342E12, 2024.5], [1.73349354E12, 2027.4285714285713], [1.73349348E12, 2026.8333333333335], [1.73349366E12, 2026.25], [1.7334936E12, 2021.9166666666667], [1.73349378E12, 2033.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73349372E12, 2030.6666666666667], [1.73349366E12, 2024.142857142857], [1.7334936E12, 2021.4], [1.73349378E12, 2035.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73349372E12, 1505.3333333333333], [1.7334939E12, 1495.5], [1.73349384E12, 1168.0], [1.73349396E12, 0.0], [1.73349366E12, 3579.0], [1.73349378E12, 1531.5]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73349372E12, 12028.5], [1.73349366E12, 12430.0], [1.7334936E12, 12903.8], [1.73349378E12, 11997.8]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73349342E12, 2030.5], [1.73349354E12, 2024.5], [1.73349348E12, 2025.3333333333335], [1.7334936E12, 2024.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349342E12, 2027.0], [1.73349354E12, 2025.0], [1.73349348E12, 2029.0], [1.73349366E12, 2025.0], [1.7334936E12, 2027.4]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73349372E12, 1.25], [1.73349354E12, 1.0], [1.73349366E12, 0.75], [1.7334936E12, 1.0], [1.73349378E12, 1.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349396E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349396E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73349372E12, 1909.0], [1.7334939E12, 1479.3333333333333], [1.73349384E12, 1151.6666666666667], [1.73349378E12, 1551.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73349342E12, 508.0], [1.73349354E12, 489.6666666666667], [1.73349348E12, 483.8333333333333], [1.7334936E12, 1614.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73349372E12, 1038.2], [1.73349384E12, 1077.0], [1.73349366E12, 1492.4285714285716], [1.7334936E12, 1468.0], [1.73349378E12, 930.3333333333334]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73349372E12, 107.7391304347826], [1.7334939E12, 71.99999999999999], [1.73349384E12, 68.66666666666666], [1.73349396E12, 253.5], [1.73349366E12, 0.0], [1.73349378E12, 77.7647058823529]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73349372E12, 2023.3333333333333], [1.73349366E12, 2023.142857142857], [1.7334936E12, 2021.875], [1.73349378E12, 2024.5]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73349372E12, 2032.0], [1.73349354E12, 2021.0], [1.73349366E12, 2025.25], [1.7334936E12, 2026.5714285714287], [1.73349378E12, 2025.6666666666667]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349354E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73349372E12, 54.333333333333336], [1.7334939E12, 0.0], [1.73349384E12, 133.25], [1.73349354E12, 472.0], [1.73349366E12, 202.0], [1.7334936E12, 2904.7142857142853], [1.73349378E12, 61.111111111111114]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349342E12, 292.6], [1.73349354E12, 247.33333333333331], [1.73349348E12, 243.49999999999997], [1.7334936E12, 1562.5]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.7334939E12, 0.0], [1.73349384E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349396E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73349342E12, 0.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.7334936E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349384E12, 0.0], [1.73349366E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349396E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349342E12, "maxY": 24933.0, "series": [{"data": [[1.73349372E12, 10823.0], [1.73349342E12, 2576.0], [1.7334939E12, 12523.0], [1.73349384E12, 21696.0], [1.73349354E12, 2574.0], [1.73349348E12, 2554.0], [1.73349396E12, 12814.0], [1.73349366E12, 3064.0], [1.7334936E12, 19347.0], [1.73349378E12, 24933.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73349372E12, 978.9], [1.73349342E12, 2046.4], [1.7334939E12, 793.1000000000003], [1.73349384E12, 951.1000000000001], [1.73349354E12, 2045.0], [1.73349348E12, 2048.0], [1.73349396E12, 11266.8], [1.73349366E12, 2044.0], [1.7334936E12, 2056.8], [1.73349378E12, 1173.4000000000012]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73349372E12, 2516.75], [1.73349342E12, 2576.0], [1.7334939E12, 12523.0], [1.73349384E12, 21189.81], [1.73349354E12, 2486.43], [1.73349348E12, 2509.0099999999998], [1.73349396E12, 12814.0], [1.73349366E12, 2564.6399999999994], [1.7334936E12, 13675.639999999994], [1.73349378E12, 14221.12000000001]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73349372E12, 2045.95], [1.73349342E12, 2087.6999999999985], [1.7334939E12, 8288.849999999984], [1.73349384E12, 5499.400000000037], [1.73349354E12, 2055.0], [1.73349348E12, 2055.45], [1.73349396E12, 12814.0], [1.73349366E12, 2049.55], [1.7334936E12, 2583.0999999999995], [1.73349378E12, 2052.7]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73349372E12, 0.0], [1.73349342E12, 0.0], [1.7334939E12, 1.0], [1.73349384E12, 1.0], [1.73349354E12, 0.0], [1.73349348E12, 0.0], [1.73349396E12, 1.0], [1.73349366E12, 0.0], [1.7334936E12, 0.0], [1.73349378E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73349372E12, 7.0], [1.73349342E12, 3.5], [1.7334939E12, 122.5], [1.73349384E12, 126.0], [1.73349354E12, 2.0], [1.73349348E12, 2.0], [1.73349396E12, 3.0], [1.73349366E12, 3.5], [1.7334936E12, 2.0], [1.73349378E12, 5.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349396E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 1.0, "minX": 2.0, "maxY": 100234.5, "series": [{"data": [[4.0, 5.0], [2.0, 129.5], [8.0, 3.0], [16.0, 3.0], [19.0, 2.0], [10.0, 3.0], [20.0, 193.0], [22.0, 2.0], [6.0, 3.0], [12.0, 7.0], [3.0, 1.0], [14.0, 3.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[19.0, 9901.5], [3.0, 100234.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 22.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 50116.5, "series": [{"data": [[4.0, 0.0], [2.0, 0.0], [8.0, 0.0], [16.0, 0.0], [19.0, 0.0], [10.0, 0.0], [20.0, 0.0], [22.0, 0.0], [6.0, 0.0], [12.0, 0.0], [3.0, 0.0], [14.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[19.0, 113.0], [3.0, 50116.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 22.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.2, "minX": 1.73349342E12, "maxY": 5.716666666666667, "series": [{"data": [[1.73349372E12, 4.566666666666666], [1.73349342E12, 0.9833333333333333], [1.7334939E12, 1.1], [1.73349384E12, 2.466666666666667], [1.73349354E12, 4.533333333333333], [1.73349348E12, 3.5], [1.73349396E12, 0.2], [1.73349366E12, 4.233333333333333], [1.7334936E12, 5.716666666666667], [1.73349378E12, 4.366666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349396E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73349342E12, "maxY": 4.516666666666667, "series": [{"data": [[1.73349372E12, 3.8666666666666667], [1.73349342E12, 0.7166666666666667], [1.7334939E12, 0.9333333333333333], [1.73349384E12, 2.033333333333333], [1.73349354E12, 3.4833333333333334], [1.73349348E12, 2.6166666666666667], [1.73349396E12, 0.2], [1.73349366E12, 3.3], [1.7334936E12, 4.516666666666667], [1.73349378E12, 3.6666666666666665]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.73349372E12, 0.25], [1.73349342E12, 0.03333333333333333], [1.7334939E12, 0.03333333333333333], [1.73349384E12, 0.1], [1.73349354E12, 0.21666666666666667], [1.73349348E12, 0.15], [1.73349366E12, 0.3], [1.7334936E12, 0.2833333333333333], [1.73349378E12, 0.2]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.73349372E12, 0.25], [1.73349342E12, 0.18333333333333332], [1.7334939E12, 0.08333333333333333], [1.73349384E12, 0.18333333333333332], [1.73349354E12, 0.6166666666666667], [1.73349348E12, 0.6], [1.73349396E12, 0.016666666666666666], [1.73349366E12, 0.26666666666666666], [1.7334936E12, 0.6166666666666667], [1.73349378E12, 0.31666666666666665]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.73349372E12, 0.3], [1.73349342E12, 0.03333333333333333], [1.7334939E12, 0.05], [1.73349384E12, 0.11666666666666667], [1.73349354E12, 0.21666666666666667], [1.73349348E12, 0.13333333333333333], [1.73349366E12, 0.26666666666666666], [1.7334936E12, 0.26666666666666666], [1.73349378E12, 0.18333333333333332]], "isOverall": false, "label": "202", "isController": false}, {"data": [[1.7334936E12, 0.03333333333333333]], "isOverall": false, "label": "401", "isController": false}, {"data": [[1.73349396E12, 0.03333333333333333]], "isOverall": false, "label": "504", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349396E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73349342E12, "maxY": 0.5666666666666667, "series": [{"data": [[1.73349372E12, 0.05], [1.73349366E12, 0.11666666666666667], [1.7334936E12, 0.08333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Link user-success", "isController": true}, {"data": [[1.73349372E12, 0.05], [1.73349366E12, 0.11666666666666667], [1.7334936E12, 0.13333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Get user key gen result-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.11666666666666667], [1.7334936E12, 0.06666666666666667]], "isOverall": false, "label": "Accept sr-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.11666666666666667], [1.7334936E12, 0.06666666666666667]], "isOverall": false, "label": "Invite and accept user-success", "isController": true}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.11666666666666667], [1.7334936E12, 0.06666666666666667]], "isOverall": false, "label": "Accept sr-0-success", "isController": false}, {"data": [[1.73349342E12, 0.08333333333333333], [1.73349354E12, 0.2], [1.73349348E12, 0.2], [1.7334936E12, 0.15]], "isOverall": false, "label": "Get Admin Access Token-success", "isController": false}, {"data": [[1.73349342E12, 0.016666666666666666], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.73349366E12, 0.016666666666666666], [1.7334936E12, 0.15]], "isOverall": false, "label": "Get key gen result-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Login by SR OS-0-success", "isController": false}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.11666666666666667], [1.73349348E12, 0.1], [1.73349366E12, 0.06666666666666667], [1.7334936E12, 0.2], [1.73349378E12, 0.05]], "isOverall": false, "label": "Get Access Token-0-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Accept user-success", "isController": false}, {"data": [[1.73349372E12, 0.1], [1.7334939E12, 0.03333333333333333], [1.73349384E12, 0.05], [1.73349366E12, 0.016666666666666666], [1.73349378E12, 0.1]], "isOverall": false, "label": "WS open for policy import-0-success", "isController": false}, {"data": [[1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.73349366E12, 0.03333333333333333], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349354E12, 0.016666666666666666], [1.73349366E12, 0.06666666666666667], [1.7334936E12, 0.11666666666666667], [1.73349378E12, 0.05]], "isOverall": false, "label": "WS open for user key gen-success", "isController": false}, {"data": [[1.73349372E12, 0.08333333333333333], [1.73349384E12, 0.016666666666666666], [1.73349366E12, 0.1], [1.7334936E12, 0.05], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Get User Access Token-0-success", "isController": false}, {"data": [[1.73349372E12, 0.38333333333333336], [1.7334939E12, 0.23333333333333334], [1.73349384E12, 0.35], [1.73349396E12, 0.03333333333333333], [1.73349366E12, 0.016666666666666666], [1.73349378E12, 0.5666666666666667]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Invite user-0-success", "isController": false}, {"data": [[1.73349342E12, 0.016666666666666666], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.73349366E12, 0.016666666666666666], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Get sr keys-success", "isController": false}, {"data": [[1.73349342E12, 0.016666666666666666], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.73349366E12, 0.016666666666666666], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Link SR-success", "isController": true}, {"data": [[1.7334936E12, 0.016666666666666666]], "isOverall": false, "label": "Get Admin Access Token-failure", "isController": false}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349354E12, 0.016666666666666666], [1.73349366E12, 0.06666666666666667], [1.7334936E12, 0.11666666666666667], [1.73349378E12, 0.05]], "isOverall": false, "label": "WS open for user key gen-0-success", "isController": false}, {"data": [[1.73349372E12, 0.1], [1.7334939E12, 0.03333333333333333], [1.73349384E12, 0.05], [1.73349366E12, 0.016666666666666666], [1.73349378E12, 0.1]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.73349372E12, 0.18333333333333332], [1.7334939E12, 0.016666666666666666], [1.73349384E12, 0.06666666666666667], [1.73349366E12, 0.05], [1.73349378E12, 0.13333333333333333]], "isOverall": false, "label": "Get user link result-0-success", "isController": false}, {"data": [[1.73349372E12, 0.08333333333333333], [1.73349384E12, 0.016666666666666666], [1.73349366E12, 0.1], [1.7334936E12, 0.05], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Get User Access Token-success", "isController": false}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349384E12, 0.016666666666666666], [1.73349366E12, 0.08333333333333333], [1.7334936E12, 0.08333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.73349372E12, 0.11666666666666667], [1.7334939E12, 0.016666666666666666], [1.73349384E12, 0.06666666666666667], [1.73349366E12, 0.08333333333333333], [1.73349378E12, 0.03333333333333333]], "isOverall": false, "label": "Link user profile-0-success", "isController": false}, {"data": [[1.73349372E12, 0.08333333333333333], [1.7334939E12, 0.05], [1.73349384E12, 0.05], [1.73349378E12, 0.11666666666666667]], "isOverall": false, "label": "Policy import and dry run-success", "isController": true}, {"data": [[1.73349342E12, 0.08333333333333333], [1.73349354E12, 0.2], [1.73349348E12, 0.2], [1.7334936E12, 0.16666666666666666]], "isOverall": false, "label": "Get Admin Access Token-0-success", "isController": false}, {"data": [[1.73349372E12, 0.08333333333333333], [1.73349384E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.06666666666666667], [1.73349366E12, 0.2], [1.7334936E12, 0.08333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Agree terms-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "User creation(admin side)-success", "isController": true}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.11666666666666667], [1.73349348E12, 0.1], [1.73349366E12, 0.06666666666666667], [1.7334936E12, 0.2], [1.73349378E12, 0.05]], "isOverall": false, "label": "Get Access Token-success", "isController": false}, {"data": [[1.7334936E12, 0.016666666666666666]], "isOverall": false, "label": "User creation(admin side)-failure", "isController": false}, {"data": [[1.73349372E12, 0.05], [1.73349366E12, 0.11666666666666667], [1.7334936E12, 0.08333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Get user keys-0-success", "isController": false}, {"data": [[1.73349372E12, 0.1], [1.7334939E12, 0.03333333333333333], [1.73349384E12, 0.05], [1.73349366E12, 0.016666666666666666], [1.73349378E12, 0.1]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.73349372E12, 0.1], [1.7334939E12, 0.03333333333333333], [1.73349384E12, 0.05], [1.73349366E12, 0.016666666666666666], [1.73349378E12, 0.1]], "isOverall": false, "label": "Requests for Import-success", "isController": true}, {"data": [[1.73349342E12, 0.05], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.06666666666666667]], "isOverall": false, "label": "Invite and accept SR-success", "isController": true}, {"data": [[1.73349372E12, 0.18333333333333332], [1.7334939E12, 0.016666666666666666], [1.73349384E12, 0.06666666666666667], [1.73349366E12, 0.05], [1.73349378E12, 0.13333333333333333]], "isOverall": false, "label": "Get user link result-success", "isController": false}, {"data": [[1.73349342E12, 0.08333333333333333], [1.73349354E12, 0.2], [1.73349348E12, 0.2], [1.7334936E12, 0.16666666666666666]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.73349354E12, 0.1], [1.73349348E12, 0.05], [1.73349366E12, 0.1], [1.7334936E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for sr link-0-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Login by SR OS-success", "isController": false}, {"data": [[1.73349372E12, 0.05], [1.73349366E12, 0.11666666666666667], [1.7334936E12, 0.08333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Get user keys-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Generate sr hedera data-success", "isController": true}, {"data": [[1.73349342E12, 0.016666666666666666], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.73349366E12, 0.016666666666666666], [1.7334936E12, 0.15]], "isOverall": false, "label": "Get key gen result-0-success", "isController": false}, {"data": [[1.73349372E12, 0.03333333333333333], [1.73349366E12, 0.11666666666666667], [1.7334936E12, 0.08333333333333333], [1.73349378E12, 0.08333333333333333]], "isOverall": false, "label": "User creation(user side)-success", "isController": true}, {"data": [[1.73349372E12, 0.016666666666666666], [1.7334939E12, 0.05], [1.73349384E12, 0.11666666666666667], [1.73349396E12, 0.016666666666666666], [1.73349378E12, 0.1]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.73349372E12, 0.016666666666666666], [1.7334939E12, 0.05], [1.73349384E12, 0.11666666666666667], [1.73349396E12, 0.03333333333333333], [1.73349378E12, 0.08333333333333333]], "isOverall": false, "label": "Requests for DryRun-success", "isController": true}, {"data": [[1.73349396E12, 0.016666666666666666]], "isOverall": false, "label": "Requests for Import-failure", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Accept user-0-success", "isController": false}, {"data": [[1.73349372E12, 0.15], [1.7334939E12, 0.03333333333333333], [1.73349384E12, 0.06666666666666667], [1.73349354E12, 0.016666666666666666], [1.73349366E12, 0.1], [1.7334936E12, 0.11666666666666667], [1.73349378E12, 0.15]], "isOverall": false, "label": "Verify link-success", "isController": false}, {"data": [[1.73349372E12, 0.08333333333333333], [1.73349384E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.06666666666666667], [1.73349366E12, 0.2], [1.7334936E12, 0.08333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Agree terms-0-success", "isController": false}, {"data": [[1.73349342E12, 0.08333333333333333], [1.73349354E12, 0.2], [1.73349348E12, 0.2], [1.7334936E12, 0.16666666666666666]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.73349342E12, 0.016666666666666666], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.73349366E12, 0.016666666666666666], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Get sr keys-0-success", "isController": false}, {"data": [[1.73349372E12, 0.1], [1.73349384E12, 0.05], [1.73349366E12, 0.1], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Get SR DID-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Invite user-success", "isController": false}, {"data": [[1.73349372E12, 0.38333333333333336], [1.7334939E12, 0.23333333333333334], [1.73349384E12, 0.35], [1.73349396E12, 0.03333333333333333], [1.73349366E12, 0.016666666666666666], [1.73349378E12, 0.5666666666666667]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.73349372E12, 0.016666666666666666], [1.73349354E12, 0.1], [1.73349348E12, 0.03333333333333333], [1.73349366E12, 0.08333333333333333], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Link SR profile-0-success", "isController": false}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349354E12, 0.016666666666666666], [1.73349366E12, 0.06666666666666667], [1.7334936E12, 0.11666666666666667], [1.73349378E12, 0.05]], "isOverall": false, "label": "Generate user hedera data-success", "isController": true}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "WS open for sr key gen-success", "isController": false}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349354E12, 0.016666666666666666], [1.73349366E12, 0.08333333333333333], [1.7334936E12, 0.1], [1.73349378E12, 0.05]], "isOverall": false, "label": "Generate user keys-0-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Generate sr keys-0-success", "isController": false}, {"data": [[1.73349372E12, 0.36666666666666664], [1.73349354E12, 0.2833333333333333], [1.73349366E12, 0.31666666666666665], [1.7334936E12, 0.3333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Get SR link result-0-success", "isController": false}, {"data": [[1.73349342E12, 0.05], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.06666666666666667]], "isOverall": false, "label": "Invite sr-0-success", "isController": false}, {"data": [[1.73349396E12, 0.016666666666666666]], "isOverall": false, "label": "Get SR Access Token-failure", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "WS open for sr key gen-0-success", "isController": false}, {"data": [[1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.73349366E12, 0.03333333333333333], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.73349372E12, 0.36666666666666664], [1.73349354E12, 0.2833333333333333], [1.73349366E12, 0.31666666666666665], [1.7334936E12, 0.3333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Get SR link result-success", "isController": false}, {"data": [[1.73349372E12, 0.016666666666666666], [1.7334939E12, 0.05], [1.73349384E12, 0.11666666666666667], [1.73349396E12, 0.016666666666666666], [1.73349378E12, 0.1]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349354E12, 0.016666666666666666], [1.73349366E12, 0.06666666666666667], [1.7334936E12, 0.11666666666666667], [1.73349378E12, 0.05]], "isOverall": false, "label": "Login by user OS-success", "isController": false}, {"data": [[1.73349372E12, 0.08333333333333333], [1.73349384E12, 0.05], [1.73349366E12, 0.11666666666666667], [1.7334936E12, 0.016666666666666666], [1.73349378E12, 0.05]], "isOverall": false, "label": "WS open for user link-0-success", "isController": false}, {"data": [[1.73349372E12, 0.1], [1.73349384E12, 0.05], [1.73349366E12, 0.1], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Get SR DID-0-success", "isController": false}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349384E12, 0.016666666666666666], [1.73349366E12, 0.08333333333333333], [1.7334936E12, 0.08333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.73349372E12, 0.016666666666666666], [1.7334939E12, 0.05], [1.73349384E12, 0.11666666666666667], [1.73349396E12, 0.03333333333333333], [1.73349378E12, 0.08333333333333333]], "isOverall": false, "label": "Dry Run Policy-success", "isController": false}, {"data": [[1.73349354E12, 0.08333333333333333], [1.73349348E12, 0.08333333333333333], [1.73349366E12, 0.06666666666666667], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "User creation flow-success", "isController": true}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349354E12, 0.016666666666666666], [1.73349366E12, 0.08333333333333333], [1.7334936E12, 0.1], [1.73349378E12, 0.05]], "isOverall": false, "label": "Generate user keys-success", "isController": false}, {"data": [[1.73349372E12, 0.1], [1.7334939E12, 0.08333333333333333], [1.73349384E12, 0.16666666666666666], [1.73349354E12, 0.1], [1.73349348E12, 0.08333333333333333], [1.73349396E12, 0.03333333333333333], [1.73349366E12, 0.1], [1.7334936E12, 0.06666666666666667], [1.73349378E12, 0.2]], "isOverall": false, "label": "Get SR Access Token-0-success", "isController": false}, {"data": [[1.73349372E12, 0.08333333333333333], [1.73349384E12, 0.05], [1.73349366E12, 0.11666666666666667], [1.7334936E12, 0.016666666666666666], [1.73349378E12, 0.05]], "isOverall": false, "label": "WS open for user link-success", "isController": false}, {"data": [[1.73349354E12, 0.1], [1.73349348E12, 0.05], [1.73349366E12, 0.1], [1.7334936E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for sr link-success", "isController": false}, {"data": [[1.73349372E12, 0.05], [1.73349366E12, 0.11666666666666667], [1.7334936E12, 0.13333333333333333], [1.73349378E12, 0.06666666666666667]], "isOverall": false, "label": "Get user key gen result-0-success", "isController": false}, {"data": [[1.73349342E12, 0.05], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.06666666666666667]], "isOverall": false, "label": "Invite sr-success", "isController": false}, {"data": [[1.73349372E12, 0.1], [1.7334939E12, 0.08333333333333333], [1.73349384E12, 0.16666666666666666], [1.73349354E12, 0.1], [1.73349348E12, 0.08333333333333333], [1.73349396E12, 0.016666666666666666], [1.73349366E12, 0.1], [1.7334936E12, 0.06666666666666667], [1.73349378E12, 0.2]], "isOverall": false, "label": "Get SR Access Token-success", "isController": false}, {"data": [[1.73349342E12, 0.016666666666666666], [1.73349354E12, 0.1], [1.73349348E12, 0.08333333333333333], [1.73349366E12, 0.016666666666666666], [1.7334936E12, 0.1]], "isOverall": false, "label": "User creation(SR side)-success", "isController": true}, {"data": [[1.73349372E12, 0.1], [1.7334939E12, 0.03333333333333333], [1.73349384E12, 0.05], [1.73349366E12, 0.016666666666666666], [1.73349378E12, 0.1]], "isOverall": false, "label": "WS open for policy import-success", "isController": false}, {"data": [[1.73349342E12, 0.03333333333333333], [1.73349354E12, 0.1], [1.73349348E12, 0.1], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Generate sr keys-success", "isController": false}, {"data": [[1.73349372E12, 0.06666666666666667], [1.73349354E12, 0.016666666666666666], [1.73349366E12, 0.06666666666666667], [1.7334936E12, 0.11666666666666667], [1.73349378E12, 0.05]], "isOverall": false, "label": "Login by user OS-0-success", "isController": false}, {"data": [[1.73349372E12, 0.11666666666666667], [1.7334939E12, 0.016666666666666666], [1.73349384E12, 0.06666666666666667], [1.73349366E12, 0.08333333333333333], [1.73349378E12, 0.03333333333333333]], "isOverall": false, "label": "Link user profile-success", "isController": false}, {"data": [[1.73349372E12, 0.15], [1.7334939E12, 0.03333333333333333], [1.73349384E12, 0.06666666666666667], [1.73349354E12, 0.016666666666666666], [1.73349366E12, 0.1], [1.7334936E12, 0.11666666666666667], [1.73349378E12, 0.15]], "isOverall": false, "label": "Verify link-0-success", "isController": false}, {"data": [[1.73349372E12, 0.016666666666666666], [1.7334939E12, 0.05], [1.73349384E12, 0.11666666666666667], [1.73349396E12, 0.03333333333333333], [1.73349378E12, 0.08333333333333333]], "isOverall": false, "label": "Dry Run Policy-0-success", "isController": false}, {"data": [[1.73349372E12, 0.016666666666666666], [1.73349354E12, 0.1], [1.73349348E12, 0.03333333333333333], [1.73349366E12, 0.08333333333333333], [1.7334936E12, 0.08333333333333333]], "isOverall": false, "label": "Link SR profile-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349396E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.73349342E12, "maxY": 6.533333333333333, "series": [{"data": [[1.73349372E12, 5.016666666666667], [1.73349342E12, 1.15], [1.7334939E12, 1.2333333333333334], [1.73349384E12, 2.65], [1.73349354E12, 5.233333333333333], [1.73349348E12, 4.183333333333334], [1.73349396E12, 0.25], [1.73349366E12, 4.55], [1.7334936E12, 6.533333333333333], [1.73349378E12, 4.866666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.73349396E12, 0.03333333333333333], [1.7334936E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349396E12, "title": "Total Transactions Per Second"}},
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
