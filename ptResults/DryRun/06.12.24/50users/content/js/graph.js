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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 395.0, "series": [{"data": [[0.0, 50.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1100.0, 6.0], [1200.0, 3.0], [3000.0, 1.0], [1500.0, 1.0], [900.0, 25.0], [1800.0, 2.0], [3600.0, 1.0], [1000.0, 11.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[2200.0, 1.0], [300.0, 26.0], [1200.0, 3.0], [1300.0, 2.0], [700.0, 3.0], [400.0, 4.0], [200.0, 49.0], [800.0, 1.0], [1700.0, 1.0], [1900.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1100.0, 2.0], [2300.0, 1.0], [2400.0, 1.0], [1200.0, 1.0], [700.0, 30.0], [2900.0, 1.0], [800.0, 11.0], [900.0, 3.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[0.0, 42.0], [100.0, 3.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[0.0, 36.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[300.0, 6.0], [2500.0, 1.0], [700.0, 35.0], [1400.0, 1.0], [200.0, 42.0], [800.0, 8.0], [400.0, 2.0], [900.0, 5.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[0.0, 93.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 7.0], [200.0, 26.0], [400.0, 2.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[600.0, 1.0], [300.0, 26.0], [400.0, 9.0], [200.0, 8.0], [500.0, 6.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[2000.0, 45.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[300.0, 8.0], [600.0, 2.0], [200.0, 22.0], [400.0, 2.0], [1600.0, 1.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[0.0, 95.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 1.0], [1300.0, 1.0], [900.0, 22.0], [1000.0, 9.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[8500.0, 1.0], [8600.0, 1.0], [8300.0, 1.0], [8800.0, 1.0], [9000.0, 1.0], [9600.0, 1.0], [9400.0, 1.0], [9300.0, 1.0], [9800.0, 1.0], [10400.0, 1.0], [10300.0, 1.0], [12800.0, 1.0], [13500.0, 1.0], [15700.0, 1.0], [19300.0, 1.0], [19500.0, 1.0], [20800.0, 1.0], [22100.0, 1.0], [24600.0, 1.0], [25900.0, 1.0], [26100.0, 1.0], [28800.0, 1.0], [31000.0, 1.0], [45500.0, 1.0], [45900.0, 1.0], [47800.0, 1.0], [51000.0, 1.0], [51200.0, 1.0], [53500.0, 1.0], [64900.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1100.0, 15.0], [2400.0, 1.0], [1200.0, 9.0], [1300.0, 7.0], [1400.0, 3.0], [1500.0, 2.0], [1600.0, 3.0], [1800.0, 1.0], [1900.0, 2.0], [1000.0, 5.0], [2000.0, 2.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[600.0, 6.0], [700.0, 29.0], [2700.0, 3.0], [200.0, 233.0], [800.0, 17.0], [900.0, 4.0], [1000.0, 3.0], [1100.0, 2.0], [300.0, 65.0], [1200.0, 3.0], [4900.0, 1.0], [1500.0, 1.0], [400.0, 20.0], [1600.0, 2.0], [1700.0, 2.0], [1800.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[300.0, 4.0], [600.0, 1.0], [4700.0, 1.0], [700.0, 1.0], [200.0, 36.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[600.0, 11.0], [1300.0, 2.0], [700.0, 5.0], [800.0, 2.0], [900.0, 1.0], [500.0, 28.0], [1000.0, 1.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[2200.0, 1.0], [600.0, 18.0], [700.0, 5.0], [800.0, 4.0], [900.0, 1.0], [1000.0, 2.0], [1200.0, 3.0], [1400.0, 1.0], [1500.0, 1.0], [1700.0, 2.0], [1800.0, 1.0], [1900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1200.0, 1.0], [300.0, 4.0], [600.0, 1.0], [1300.0, 1.0], [700.0, 14.0], [2700.0, 1.0], [800.0, 11.0], [400.0, 6.0], [200.0, 2.0], [900.0, 2.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[300.0, 4.0], [1300.0, 1.0], [2700.0, 1.0], [1500.0, 1.0], [200.0, 36.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[300.0, 21.0], [600.0, 3.0], [1200.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [200.0, 14.0], [400.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[0.0, 36.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[34700.0, 3.0], [34200.0, 1.0], [34600.0, 1.0], [34100.0, 2.0], [34000.0, 2.0], [34300.0, 1.0], [34500.0, 1.0], [34900.0, 3.0], [35300.0, 1.0], [36300.0, 1.0], [36200.0, 1.0], [35900.0, 1.0], [36500.0, 1.0], [38500.0, 1.0], [37200.0, 1.0], [38800.0, 1.0], [37500.0, 1.0], [38200.0, 1.0], [36900.0, 1.0], [38700.0, 1.0], [39200.0, 3.0], [39500.0, 1.0], [40600.0, 1.0], [40100.0, 2.0], [40000.0, 1.0], [40200.0, 1.0], [39400.0, 1.0], [40300.0, 1.0], [42400.0, 1.0], [41100.0, 2.0], [43700.0, 1.0], [44100.0, 1.0], [45600.0, 1.0], [46200.0, 1.0], [48800.0, 1.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[8500.0, 1.0], [9100.0, 1.0], [8800.0, 1.0], [8900.0, 1.0], [9300.0, 1.0], [9600.0, 2.0], [9800.0, 1.0], [10100.0, 1.0], [10700.0, 1.0], [10500.0, 1.0], [13000.0, 1.0], [13700.0, 1.0], [16000.0, 1.0], [19700.0, 1.0], [19500.0, 1.0], [21100.0, 1.0], [22500.0, 1.0], [24800.0, 1.0], [26200.0, 1.0], [26400.0, 1.0], [29100.0, 1.0], [31200.0, 1.0], [45800.0, 1.0], [46200.0, 1.0], [48100.0, 1.0], [51300.0, 1.0], [51400.0, 1.0], [54100.0, 1.0], [65700.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 21.0], [600.0, 1.0], [700.0, 3.0], [2800.0, 1.0], [1400.0, 1.0], [200.0, 47.0], [400.0, 8.0], [800.0, 3.0], [900.0, 6.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[0.0, 45.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[8400.0, 1.0], [9900.0, 1.0], [11100.0, 1.0], [13100.0, 1.0], [3700.0, 1.0], [3800.0, 5.0], [3900.0, 1.0], [4000.0, 3.0], [4200.0, 1.0], [4100.0, 2.0], [4300.0, 3.0], [4600.0, 1.0], [4500.0, 1.0], [4400.0, 2.0], [4700.0, 1.0], [5000.0, 2.0], [4900.0, 1.0], [5300.0, 2.0], [5600.0, 1.0], [5500.0, 1.0], [5400.0, 1.0], [6100.0, 1.0], [5900.0, 1.0], [6300.0, 1.0], [6200.0, 1.0], [6400.0, 1.0], [6800.0, 3.0], [7000.0, 1.0], [7300.0, 1.0], [7900.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[15800.0, 1.0], [16100.0, 1.0], [16200.0, 4.0], [16300.0, 2.0], [15900.0, 4.0], [16000.0, 1.0], [16700.0, 2.0], [16500.0, 1.0], [16600.0, 1.0], [16900.0, 1.0], [17300.0, 1.0], [17200.0, 1.0], [17900.0, 1.0], [17500.0, 1.0], [18300.0, 4.0], [18200.0, 1.0], [18500.0, 1.0], [18900.0, 1.0], [19100.0, 1.0], [19200.0, 1.0], [19400.0, 1.0], [19600.0, 3.0], [20000.0, 2.0], [20400.0, 1.0], [20100.0, 1.0], [20600.0, 1.0], [20500.0, 2.0], [20800.0, 1.0], [22200.0, 1.0], [21700.0, 1.0], [22900.0, 1.0], [23000.0, 1.0], [23900.0, 1.0], [25300.0, 1.0], [25100.0, 1.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[2100.0, 1.0], [2000.0, 94.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[2100.0, 2.0], [2000.0, 43.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[0.0, 31.0], [300.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[0.0, 45.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[9300.0, 1.0], [3700.0, 1.0], [3900.0, 1.0], [4200.0, 6.0], [4100.0, 1.0], [4300.0, 1.0], [4400.0, 1.0], [4600.0, 1.0], [4800.0, 2.0], [5100.0, 1.0], [4900.0, 1.0], [5300.0, 2.0], [5600.0, 3.0], [5400.0, 2.0], [5500.0, 3.0], [5700.0, 1.0], [6100.0, 3.0], [5900.0, 1.0], [6200.0, 1.0], [101200.0, 1.0], [6500.0, 1.0], [7000.0, 1.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[15000.0, 5.0], [15200.0, 4.0], [14900.0, 4.0], [15100.0, 1.0], [15300.0, 1.0], [15600.0, 2.0], [15500.0, 3.0], [15800.0, 1.0], [15900.0, 1.0], [16100.0, 1.0], [16200.0, 2.0], [16000.0, 1.0], [17300.0, 2.0], [16800.0, 1.0], [16500.0, 1.0], [17200.0, 1.0], [16400.0, 1.0], [16900.0, 1.0], [17700.0, 1.0], [18000.0, 1.0], [17800.0, 2.0], [18100.0, 1.0], [17600.0, 1.0], [19000.0, 2.0], [19200.0, 1.0], [20900.0, 1.0], [22300.0, 1.0], [24100.0, 1.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 258.0], [300.0, 1.0], [600.0, 1.0], [2400.0, 1.0], [1400.0, 1.0], [100.0, 7.0], [200.0, 3.0], [400.0, 2.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[0.0, 101.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[0.0, 88.0], [100.0, 5.0], [200.0, 2.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [2800.0, 23.0], [2700.0, 9.0], [2900.0, 13.0], [3000.0, 2.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[2100.0, 1.0], [2000.0, 49.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[0.0, 45.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[0.0, 113.0], [300.0, 1.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[0.0, 89.0], [100.0, 5.0], [900.0, 1.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[0.0, 28.0], [300.0, 1.0], [1400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[13000.0, 1.0], [13100.0, 1.0], [13400.0, 1.0], [13500.0, 1.0], [14000.0, 1.0], [14100.0, 1.0], [14500.0, 1.0], [14900.0, 1.0], [15000.0, 1.0], [15400.0, 1.0], [15700.0, 1.0], [16300.0, 1.0], [17400.0, 1.0], [18100.0, 1.0], [20200.0, 1.0], [23400.0, 1.0], [23700.0, 1.0], [26000.0, 1.0], [26700.0, 1.0], [30000.0, 1.0], [31100.0, 1.0], [33400.0, 1.0], [34700.0, 1.0], [36700.0, 1.0], [51200.0, 1.0], [51700.0, 1.0], [53700.0, 1.0], [56700.0, 1.0], [58000.0, 1.0], [60300.0, 1.0], [75000.0, 1.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[2100.0, 1.0], [2400.0, 2.0], [1500.0, 1.0], [1600.0, 14.0], [3300.0, 1.0], [1700.0, 14.0], [1800.0, 9.0], [1900.0, 8.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[8500.0, 2.0], [8400.0, 4.0], [9000.0, 1.0], [8900.0, 1.0], [9500.0, 2.0], [9400.0, 1.0], [9600.0, 1.0], [9300.0, 2.0], [10600.0, 1.0], [10900.0, 1.0], [11700.0, 1.0], [12100.0, 1.0], [12800.0, 1.0], [14100.0, 1.0], [14200.0, 1.0], [4600.0, 1.0], [4700.0, 3.0], [4800.0, 1.0], [5000.0, 1.0], [5100.0, 5.0], [4900.0, 1.0], [5300.0, 1.0], [5200.0, 1.0], [5500.0, 2.0], [5400.0, 1.0], [5700.0, 1.0], [6100.0, 2.0], [6400.0, 1.0], [6800.0, 1.0], [7100.0, 2.0], [7000.0, 1.0], [7200.0, 2.0], [7300.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[600.0, 12.0], [1200.0, 1.0], [700.0, 5.0], [500.0, 32.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[2800.0, 10.0], [2700.0, 2.0], [2900.0, 11.0], [3000.0, 6.0], [3100.0, 5.0], [3300.0, 4.0], [3200.0, 3.0], [3400.0, 2.0], [3700.0, 1.0], [3600.0, 1.0], [3800.0, 1.0], [4000.0, 2.0], [4400.0, 1.0], [5400.0, 1.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 45.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1100.0, 4.0], [1200.0, 3.0], [1300.0, 1.0], [1600.0, 1.0], [6700.0, 1.0], [900.0, 20.0], [3900.0, 1.0], [1000.0, 14.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [600.0, 8.0], [2500.0, 1.0], [700.0, 20.0], [3000.0, 1.0], [200.0, 133.0], [800.0, 15.0], [900.0, 9.0], [1000.0, 2.0], [1100.0, 1.0], [300.0, 58.0], [1200.0, 1.0], [1300.0, 1.0], [400.0, 14.0], [1600.0, 1.0], [1900.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[0.0, 43.0], [1100.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[2100.0, 1.0], [2000.0, 44.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[0.0, 44.0], [100.0, 1.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 43.0], [4300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[2400.0, 2.0], [2500.0, 1.0], [2600.0, 3.0], [2800.0, 19.0], [2700.0, 12.0], [2900.0, 5.0], [3000.0, 3.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[0.0, 395.0], [100.0, 2.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[10700.0, 1.0], [10600.0, 2.0], [11100.0, 14.0], [11200.0, 4.0], [11000.0, 16.0], [10800.0, 3.0], [10900.0, 5.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1100.0, 3.0], [300.0, 12.0], [600.0, 1.0], [700.0, 21.0], [1400.0, 2.0], [1500.0, 1.0], [800.0, 6.0], [200.0, 34.0], [400.0, 4.0], [900.0, 3.0], [500.0, 7.0], [1000.0, 1.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[300.0, 16.0], [1200.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [200.0, 91.0], [400.0, 3.0], [800.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[10600.0, 1.0], [10700.0, 1.0], [11100.0, 23.0], [11200.0, 7.0], [11000.0, 14.0], [10900.0, 3.0], [10800.0, 1.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[2100.0, 1.0], [600.0, 28.0], [1200.0, 1.0], [700.0, 7.0], [800.0, 3.0], [1600.0, 1.0], [900.0, 3.0], [500.0, 5.0], [1000.0, 1.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[0.0, 45.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[0.0, 42.0], [200.0, 1.0], [100.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[0.0, 44.0], [100.0, 1.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 101200.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 3684.0, "series": [{"data": [[0.0, 3684.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 678.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 557.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [[3.0, 2.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.73349822E12, "maxY": 33.752921535893144, "series": [{"data": [[1.73349822E12, 1.0]], "isOverall": false, "label": "Tenant creation", "isController": false}, {"data": [[1.7334984E12, 17.87254901960782], [1.73349906E12, 5.423076923076922], [1.73349876E12, 33.32135306553912], [1.73349846E12, 23.67342799188639], [1.73349882E12, 31.011655011655016], [1.73349852E12, 29.115789473684195], [1.73349822E12, 1.4878048780487805], [1.73349888E12, 28.66846361185985], [1.73349858E12, 31.31249999999999], [1.73349828E12, 6.299065420560749], [1.73349894E12, 24.87307692307692], [1.73349864E12, 33.014539579967675], [1.73349834E12, 12.157706093189967], [1.733499E12, 18.77586206896552], [1.7334987E12, 33.752921535893144]], "isOverall": false, "label": "Full Dry Run Flow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349906E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 101290.0, "series": [{"data": [[2.0, 1.0], [32.0, 2.0], [33.0, 1.6666666666666667], [34.0, 2.0], [35.0, 3.3333333333333335], [3.0, 2.0], [4.0, 2.0], [5.0, 3.0], [6.0, 3.0], [7.0, 1.0], [8.0, 3.0], [9.0, 2.0], [10.0, 2.0], [11.0, 2.0], [12.0, 2.0], [13.0, 2.0], [14.0, 3.0], [15.0, 1.0], [1.0, 2.0], [16.0, 2.0], [17.0, 1.0], [18.0, 2.0], [19.0, 0.0], [20.0, 1.0], [21.0, 3.0], [22.0, 0.0], [23.0, 2.0], [24.0, 1.0], [25.0, 1.0], [26.0, 3.0], [27.0, 3.0], [28.0, 1.0], [29.0, 3.0], [30.0, 3.0], [31.0, 1.2]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[22.419999999999998, 1.9200000000000004]], "isOverall": false, "label": "Invite user-0-Aggregated", "isController": false}, {"data": [[32.0, 1021.0], [33.0, 1095.4], [34.0, 1496.8333333333335], [35.0, 2759.0], [6.0, 1110.0], [8.0, 1120.0], [10.0, 1021.0], [11.0, 963.5], [12.0, 967.0], [13.0, 936.0], [14.0, 973.0], [15.0, 1142.0], [16.0, 949.0], [17.0, 1021.0], [18.0, 972.0], [19.0, 999.0], [20.0, 978.0], [21.0, 1010.0], [22.0, 975.0], [23.0, 1290.0], [24.0, 948.0], [25.0, 974.0], [26.0, 952.0], [27.0, 1010.0], [28.0, 1183.0], [29.0, 1006.0], [30.0, 1063.5], [31.0, 978.2]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[25.480000000000008, 1161.5]], "isOverall": false, "label": "WS open for sr link-Aggregated", "isController": false}, {"data": [[32.0, 422.75], [33.0, 407.3846153846155], [34.0, 544.2], [35.0, 1519.0], [5.0, 396.0], [6.0, 430.0], [7.0, 398.0], [8.0, 258.0], [9.0, 276.0], [10.0, 564.0], [11.0, 389.0], [12.0, 259.0], [13.0, 273.0], [14.0, 328.0], [15.0, 264.0], [16.0, 268.0], [17.0, 266.0], [18.0, 305.0], [19.0, 285.0], [20.0, 772.75], [21.0, 338.0], [22.0, 309.3333333333333], [23.0, 290.5], [24.0, 264.0], [25.0, 334.3333333333333], [26.0, 294.0], [27.0, 560.5], [28.0, 311.5], [29.0, 304.0], [30.0, 316.875], [31.0, 293.8888888888889]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[26.61052631578948, 440.03157894736836]], "isOverall": false, "label": "Agree terms-Aggregated", "isController": false}, {"data": [[32.0, 745.5], [33.0, 829.6250000000001], [34.0, 1137.111111111111], [35.0, 1638.0], [8.0, 966.0], [9.0, 763.0], [10.0, 820.0], [11.0, 773.0], [12.0, 971.0], [13.0, 832.0], [14.0, 786.0], [15.0, 722.0], [16.0, 752.0], [17.0, 804.0], [18.0, 793.0], [19.0, 807.0], [20.0, 776.0], [21.0, 801.0], [22.0, 767.5], [24.0, 829.0], [25.0, 762.0], [26.0, 1186.0], [27.0, 700.0], [28.0, 811.0], [29.0, 956.0], [30.0, 765.0], [31.0, 740.75]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[26.580000000000002, 918.2800000000001]], "isOverall": false, "label": "Link SR profile-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [32.0, 1.0], [33.0, 2.25], [34.0, 2.0], [35.0, 2.3333333333333335], [3.0, 1.0], [4.0, 1.0], [5.0, 2.0], [6.0, 2.0], [7.0, 1.0], [8.0, 3.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [12.0, 3.0], [13.0, 2.0], [14.0, 2.0], [15.0, 3.0], [1.0, 1.0], [16.0, 2.0], [17.0, 2.0], [18.0, 1.0], [19.0, 1.0], [20.0, 2.0], [21.0, 2.0], [22.0, 1.0], [23.0, 3.0], [24.0, 2.0], [25.0, 1.0], [26.0, 1.0], [27.0, 1.0], [28.0, 1.0], [29.0, 2.0], [30.0, 2.0], [31.0, 1.8]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[22.499999999999996, 1.74]], "isOverall": false, "label": "Invite sr-0-Aggregated", "isController": false}, {"data": [[32.0, 2.3333333333333335], [33.0, 3.625], [8.0, 183.0], [34.0, 3.0], [35.0, 5.0], [11.0, 152.0], [5.0, 106.0], [22.0, 5.5], [23.0, 2.0], [24.0, 3.0], [25.0, 2.0], [26.0, 1.0], [27.0, 3.3333333333333335], [28.0, 4.5], [29.0, 2.0], [30.0, 2.3333333333333335], [31.0, 2.625]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[28.288888888888888, 12.6]], "isOverall": false, "label": "Link user profile-0-Aggregated", "isController": false}, {"data": [[33.0, 2.6], [34.0, 3.5], [35.0, 99.0], [24.0, 1.0], [25.0, 5.666666666666666], [26.0, 1.0], [27.0, 3.0], [28.0, 3.0], [30.0, 4.5], [31.0, 3.5]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[30.41666666666666, 6.111111111111112]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[2.0, 506.5], [32.0, 611.0], [33.0, 503.1111111111111], [34.0, 530.9090909090909], [35.0, 932.6666666666667], [3.0, 496.0], [4.0, 496.5], [5.0, 509.5], [6.0, 599.0], [7.0, 578.0], [8.0, 606.5], [9.0, 526.0], [10.0, 530.0], [11.0, 531.5], [12.0, 528.0], [13.0, 549.5], [14.0, 555.0], [15.0, 497.5], [1.0, 420.6666666666667], [16.0, 516.5], [17.0, 503.0], [18.0, 481.0], [19.0, 490.0], [20.0, 499.0], [21.0, 535.5], [22.0, 483.5], [23.0, 571.0], [24.0, 518.5], [25.0, 539.5], [26.0, 563.0], [27.0, 568.0], [28.0, 864.0], [29.0, 545.5], [30.0, 436.6666666666667], [31.0, 535.2]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[22.257425742574252, 555.4059405940596]], "isOverall": false, "label": "Get Admin Access Token-Aggregated", "isController": false}, {"data": [[32.0, 2.75], [33.0, 10.923076923076923], [34.0, 2.6], [35.0, 2.0], [5.0, 3.0], [6.0, 1.0], [7.0, 3.0], [8.0, 1.0], [9.0, 1.0], [10.0, 2.0], [11.0, 70.5], [12.0, 1.0], [13.0, 1.0], [14.0, 2.0], [15.0, 2.0], [16.0, 3.0], [17.0, 3.0], [18.0, 2.0], [19.0, 2.5], [20.0, 82.75], [21.0, 0.0], [22.0, 2.0], [23.0, 1.5], [24.0, 7.333333333333334], [25.0, 3.333333333333333], [26.0, 2.5], [27.0, 2.5], [28.0, 2.5], [29.0, 2.5], [30.0, 2.5000000000000004], [31.0, 2.666666666666667]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[26.61052631578948, 8.526315789473685]], "isOverall": false, "label": "Agree terms-0-Aggregated", "isController": false}, {"data": [[33.0, 293.2], [34.0, 412.83333333333337], [35.0, 363.0], [24.0, 252.0], [25.0, 276.6666666666667], [26.0, 270.0], [27.0, 276.5], [28.0, 286.0], [30.0, 251.5], [31.0, 298.79999999999995]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[30.41666666666666, 306.77777777777777]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[2.0, 553.0], [32.0, 529.5], [33.0, 319.25], [34.0, 366.5], [35.0, 330.6666666666667], [3.0, 647.0], [4.0, 417.0], [5.0, 335.0], [6.0, 482.0], [7.0, 298.0], [8.0, 470.0], [9.0, 408.0], [10.0, 293.0], [11.0, 399.0], [12.0, 372.0], [13.0, 371.0], [14.0, 351.0], [15.0, 306.0], [1.0, 566.0], [16.0, 402.0], [17.0, 348.0], [18.0, 475.0], [19.0, 516.0], [20.0, 394.0], [21.0, 336.0], [22.0, 394.0], [23.0, 381.0], [24.0, 372.0], [25.0, 293.0], [26.0, 363.0], [27.0, 291.0], [28.0, 511.0], [29.0, 327.0], [30.0, 314.0], [31.0, 364.4]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[22.499999999999996, 386.6800000000001]], "isOverall": false, "label": "Invite sr-Aggregated", "isController": false}, {"data": [[33.0, 2051.25], [34.0, 2047.5], [35.0, 2036.5], [15.0, 2071.0], [16.0, 2070.0], [17.0, 2077.0], [18.0, 2073.0], [19.0, 2043.0], [20.0, 2067.0], [21.0, 2075.0], [22.0, 2062.0], [23.0, 2076.0], [24.0, 2063.0], [25.0, 2057.3333333333335], [26.0, 2074.0], [27.0, 2064.5], [28.0, 2070.0], [29.0, 2061.0], [30.0, 2053.0], [31.0, 2054.4]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[28.44444444444445, 2056.4222222222215]], "isOverall": false, "label": "Generate user keys-Aggregated", "isController": false}, {"data": [[2.0, 2083.0], [32.0, 2059.6666666666665], [33.0, 2053.5], [34.0, 2053.5], [35.0, 2054.75], [3.0, 2079.0], [4.0, 2078.0], [5.0, 2086.0], [6.0, 2084.0], [7.0, 2062.0], [9.0, 2071.0], [10.0, 2065.0], [11.0, 2080.0], [12.0, 2038.0], [13.0, 2061.0], [14.0, 2066.0], [15.0, 2062.0], [16.0, 2065.0], [17.0, 2064.0], [18.0, 2054.0], [19.0, 2074.0], [21.0, 2059.0], [22.0, 2079.0], [24.0, 2076.0], [25.0, 2079.0], [27.0, 2071.0], [28.0, 2066.0], [29.0, 2061.5], [31.0, 2068.5]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[22.740000000000006, 2064.5999999999995]], "isOverall": false, "label": "Generate sr keys-Aggregated", "isController": false}, {"data": [[32.0, 283.6666666666667], [33.0, 265.2], [34.0, 278.6666666666667], [35.0, 681.0], [20.0, 424.5], [22.0, 301.6666666666667], [11.0, 1164.5], [26.0, 325.0], [27.0, 266.3333333333333], [29.0, 254.0], [30.0, 304.5], [31.0, 257.3333333333333]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[28.65714285714285, 351.59999999999997]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[1.0, 1803.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.0, 1803.0]], "isOverall": false, "label": "Tenant creation flow-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [33.0, 1.3076923076923077], [32.0, 1.0], [34.0, 1.0833333333333335], [35.0, 1.0], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 0.0], [9.0, 0.0], [10.0, 1.0], [11.0, 0.0], [12.0, 1.0], [13.0, 1.0], [14.0, 0.5], [15.0, 1.0], [1.0, 1.0], [16.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [20.0, 0.5], [21.0, 0.5], [22.0, 1.6666666666666665], [23.0, 0.5], [24.0, 1.0], [25.0, 26.0], [26.0, 0.0], [27.0, 1.0], [28.0, 1.0], [29.0, 1.0], [30.0, 1.3333333333333333], [31.0, 1.5555555555555556]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[25.052631578947366, 2.094736842105263]], "isOverall": false, "label": "Get Access Token-0-Aggregated", "isController": false}, {"data": [[32.0, 988.0], [33.0, 991.25], [34.0, 1050.8333333333333], [35.0, 1224.0], [24.0, 1005.0], [25.0, 987.3333333333334], [26.0, 929.0], [27.0, 976.75], [28.0, 947.0], [30.0, 1019.2], [31.0, 992.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[30.361111111111107, 1007.111111111111]], "isOverall": false, "label": "WS open for policy import-Aggregated", "isController": false}, {"data": [[2.0, 2.0], [32.0, 4.666666666666666], [33.0, 1.25], [34.0, 3.7500000000000004], [35.0, 1.75], [3.0, 0.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 0.0], [12.0, 2.0], [13.0, 0.0], [14.0, 1.0], [15.0, 0.0], [16.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [21.0, 1.0], [22.0, 1.0], [24.0, 1.0], [25.0, 1.0], [27.0, 1.0], [28.0, 1.0], [29.0, 1.0], [31.0, 1.3333333333333333]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[22.740000000000006, 1.52]], "isOverall": false, "label": "Generate sr keys-0-Aggregated", "isController": false}, {"data": [[32.0, 9932.5], [33.0, 15534.0], [34.0, 16890.166666666668], [35.0, 13285.0], [1.0, 64932.0], [19.0, 28887.0], [23.0, 47858.0], [24.0, 45961.0], [6.0, 53525.0], [25.0, 45534.0], [26.0, 8314.0], [27.0, 24626.0], [28.0, 7795.0], [29.0, 51233.0], [30.0, 51058.0], [31.0, 15650.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[28.967741935483872, 23586.12903225806]], "isOverall": false, "label": "Dry Run Policy-Aggregated", "isController": false}, {"data": [[2.0, 1060.0], [32.0, 1248.0], [33.0, 1361.8333333333333], [34.0, 1652.6666666666667], [35.0, 2001.0], [3.0, 1189.0], [4.0, 1681.0], [5.0, 2407.0], [6.0, 1225.0], [7.0, 1044.0], [8.0, 1205.0], [9.0, 1173.0], [10.0, 1191.0], [11.0, 1142.0], [12.0, 1162.0], [13.0, 1084.0], [14.0, 1190.0], [15.0, 1336.0], [1.0, 1139.0], [16.0, 1134.0], [17.0, 1088.0], [18.0, 1125.0], [19.0, 1092.0], [20.0, 1313.0], [21.0, 1211.0], [22.0, 1114.0], [23.0, 1206.0], [24.0, 1271.0], [25.0, 1239.0], [26.0, 1176.0], [27.0, 1455.0], [28.0, 1853.0], [29.0, 1216.0], [30.0, 1519.5], [31.0, 1332.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[22.380000000000003, 1355.1200000000001]], "isOverall": false, "label": "Invite and accept user-Aggregated", "isController": true}, {"data": [[32.0, 423.79310344827593], [33.0, 411.85714285714266], [34.0, 372.81538461538463], [35.0, 1286.5000000000002], [9.0, 380.0], [10.0, 324.5], [11.0, 335.0], [12.0, 304.0], [13.0, 284.0], [14.0, 264.25], [15.0, 360.75], [16.0, 268.75], [17.0, 337.5], [18.0, 282.25], [19.0, 263.4], [20.0, 261.6666666666667], [21.0, 267.2], [22.0, 321.25], [23.0, 250.5], [24.0, 272.6666666666667], [25.0, 350.44444444444446], [26.0, 393.75], [27.0, 373.3749999999999], [28.0, 419.57142857142856], [29.0, 365.6], [30.0, 404.47999999999996], [31.0, 400.36206896551727]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[29.629722921914354, 435.9219143576826]], "isOverall": false, "label": "Get SR link result-Aggregated", "isController": false}, {"data": [[32.0, 302.5], [33.0, 337.25], [34.0, 288.1666666666667], [35.0, 258.0], [17.0, 4780.0], [18.0, 268.0], [19.0, 276.5], [21.0, 286.0], [22.0, 348.6666666666667], [23.0, 400.0], [24.0, 281.5], [25.0, 428.5], [26.0, 297.0], [27.0, 277.5], [28.0, 262.5], [29.0, 263.0], [30.0, 278.5], [31.0, 288.8]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[28.622222222222224, 405.3555555555555]], "isOverall": false, "label": "Get User Access Token-Aggregated", "isController": false}, {"data": [[2.0, 551.0], [32.0, 671.0], [33.0, 650.3333333333333], [34.0, 873.6666666666667], [35.0, 1026.0], [3.0, 596.0], [4.0, 806.0], [5.0, 551.0], [6.0, 570.0], [7.0, 552.0], [8.0, 578.0], [9.0, 559.0], [10.0, 560.0], [11.0, 539.0], [12.0, 557.0], [13.0, 561.0], [14.0, 567.0], [15.0, 661.0], [1.0, 562.0], [16.0, 569.0], [17.0, 543.0], [18.0, 582.0], [19.0, 548.0], [20.0, 552.0], [21.0, 586.0], [22.0, 600.0], [23.0, 574.0], [24.0, 619.0], [25.0, 580.0], [26.0, 572.0], [27.0, 657.0], [28.0, 593.0], [29.0, 613.0], [30.0, 895.0], [31.0, 646.6]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[22.380000000000003, 656.44]], "isOverall": false, "label": "Accept user-Aggregated", "isController": false}, {"data": [[33.0, 917.5714285714286], [32.0, 1045.0], [34.0, 1220.4], [35.0, 1640.6666666666667], [16.0, 579.0], [17.0, 703.0], [18.0, 611.0], [19.0, 571.0], [20.0, 1780.0], [21.0, 607.5], [22.0, 696.0], [23.0, 641.0], [24.0, 739.0], [25.0, 995.6666666666666], [26.0, 622.0], [27.0, 707.0], [28.0, 789.0], [29.0, 661.0], [30.0, 748.1666666666666], [31.0, 787.25]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[28.4, 909.2444444444444]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[32.0, 562.5], [33.0, 849.4], [8.0, 443.0], [34.0, 638.0], [35.0, 885.0], [11.0, 490.0], [19.0, 2745.0], [21.0, 819.0], [22.0, 594.0], [23.0, 758.0], [24.0, 867.0], [25.0, 542.5], [26.0, 601.5], [27.0, 792.5], [28.0, 1021.5], [29.0, 754.0], [30.0, 803.3333333333333], [31.0, 728.125]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[28.622222222222224, 776.8222222222221]], "isOverall": false, "label": "Get SR DID-Aggregated", "isController": false}, {"data": [[32.0, 263.6666666666667], [33.0, 274.0], [8.0, 467.0], [34.0, 420.0], [35.0, 2705.0], [11.0, 1539.0], [5.0, 1355.0], [22.0, 281.5], [23.0, 248.0], [24.0, 257.0], [25.0, 268.6666666666667], [26.0, 319.0], [27.0, 302.3333333333333], [28.0, 293.0], [29.0, 252.0], [30.0, 269.0], [31.0, 278.75]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[28.288888888888888, 392.6888888888888]], "isOverall": false, "label": "Link user profile-Aggregated", "isController": false}, {"data": [[2.0, 2067.0], [32.0, 2066.0], [33.0, 2056.2], [34.0, 2045.3333333333335], [35.0, 2040.0], [3.0, 2060.0], [4.0, 2069.0], [5.0, 2075.0], [6.0, 2050.0], [7.0, 2075.0], [8.0, 2053.0], [9.0, 2059.0], [10.0, 2062.0], [11.0, 2066.0], [12.0, 2074.0], [13.0, 2085.0], [14.0, 2082.0], [15.0, 2068.0], [16.0, 2056.0], [17.0, 2049.0], [18.0, 2071.0], [19.0, 2056.0], [20.0, 2077.0], [21.0, 2075.0], [22.0, 2067.0], [23.0, 2060.0], [24.0, 2077.0], [25.0, 2063.0], [26.0, 2064.0], [27.0, 2074.0], [28.0, 2081.0], [29.0, 2078.0], [30.0, 2059.0], [31.0, 2064.4]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[22.979999999999997, 2062.480000000001]], "isOverall": false, "label": "Get key gen result-Aggregated", "isController": false}, {"data": [[2.0, 273.0], [32.0, 304.0], [33.0, 457.16666666666663], [34.0, 368.25], [35.0, 730.6666666666666], [3.0, 346.0], [4.0, 627.0], [5.0, 1595.0], [6.0, 414.0], [7.0, 253.0], [8.0, 366.0], [9.0, 348.0], [10.0, 387.0], [11.0, 340.0], [12.0, 361.0], [13.0, 258.0], [14.0, 284.0], [15.0, 443.0], [1.0, 337.0], [16.0, 278.0], [17.0, 296.0], [18.0, 294.0], [19.0, 292.0], [20.0, 488.0], [21.0, 318.0], [22.0, 270.0], [23.0, 390.0], [24.0, 402.0], [25.0, 382.0], [26.0, 357.0], [27.0, 391.0], [28.0, 251.0], [29.0, 305.0], [30.0, 338.5], [31.0, 387.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[22.419999999999998, 413.40000000000003]], "isOverall": false, "label": "Invite user-Aggregated", "isController": false}, {"data": [[32.0, 2.0], [33.0, 2.8], [34.0, 4.0], [35.0, 3.0], [3.0, 3.0], [4.0, 1.0], [5.0, 3.0], [6.0, 1.0], [7.0, 2.0], [8.0, 1.0], [9.0, 4.0], [10.0, 3.0], [11.0, 2.0], [12.0, 1.0], [13.0, 3.0], [14.0, 1.0], [15.0, 4.0], [16.0, 1.0], [17.0, 1.0], [18.0, 2.0], [19.0, 1.0], [20.0, 3.0], [21.0, 2.0], [22.0, 1.0], [23.0, 3.0], [24.0, 3.0], [25.0, 2.0], [26.0, 2.0], [27.0, 3.0], [28.0, 2.0], [29.0, 2.0], [30.0, 3.0], [31.0, 2.8]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[23.580000000000005, 2.5200000000000005]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[32.0, 4.0], [33.0, 3.5], [34.0, 3.5], [35.0, 2.0], [24.0, 1.0], [25.0, 7.0], [26.0, 1.0], [27.0, 4.0], [28.0, 3.0], [30.0, 3.4], [31.0, 3.1111111111111116]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[30.361111111111107, 3.555555555555555]], "isOverall": false, "label": "WS open for policy import-0-Aggregated", "isController": false}, {"data": [[32.0, 34479.0], [33.0, 37521.33333333333], [8.0, 45610.0], [2.0, 46283.0], [35.0, 37592.0], [34.0, 39392.5], [12.0, 44106.0], [5.0, 48800.0], [22.0, 40728.5], [24.0, 34770.0], [25.0, 37469.25], [26.0, 34269.0], [27.0, 39656.0], [28.0, 37836.0], [30.0, 37092.4], [31.0, 36574.555555555555]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[27.577777777777772, 38262.48888888889]], "isOverall": false, "label": "User creation flow-Aggregated", "isController": true}, {"data": [[1.0, 264.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.0, 264.0]], "isOverall": false, "label": "Setup ipfs-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 1.25], [33.0, 1.2], [34.0, 2.0], [35.0, 2.0], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 2.0], [7.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [12.0, 1.0], [13.0, 0.0], [14.0, 1.0], [15.0, 0.0], [1.0, 1.0], [16.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 1.0], [23.0, 1.0], [24.0, 1.0], [25.0, 1.0], [26.0, 1.0], [27.0, 1.0], [28.0, 0.0], [29.0, 1.0], [30.0, 1.3333333333333333], [31.0, 1.25]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[22.279999999999994, 1.1400000000000003]], "isOverall": false, "label": "WS open for sr key gen-0-Aggregated", "isController": false}, {"data": [[32.0, 10196.0], [33.0, 15792.25], [34.0, 17157.333333333336], [35.0, 13557.0], [1.0, 65762.0], [18.0, 29155.0], [23.0, 48103.0], [24.0, 46235.0], [6.0, 54120.0], [25.0, 45895.0], [26.0, 8551.0], [27.0, 24873.0], [28.0, 8065.0], [29.0, 51491.0], [30.0, 51353.0], [31.0, 15923.4]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[28.935483870967744, 23883.74193548387]], "isOverall": false, "label": "Requests for DryRun-Aggregated", "isController": true}, {"data": [[2.0, 2.0], [32.0, 2.5], [33.0, 2.2], [34.0, 3.0], [35.0, 3.5], [3.0, 2.0], [4.0, 2.0], [5.0, 2.0], [6.0, 3.0], [7.0, 2.0], [8.0, 2.0], [9.0, 2.0], [10.0, 2.0], [11.0, 2.0], [12.0, 2.0], [13.0, 1.0], [14.0, 2.0], [15.0, 2.0], [1.0, 2.0], [16.0, 2.0], [17.0, 2.0], [18.0, 2.0], [19.0, 2.0], [20.0, 2.0], [21.0, 2.0], [22.0, 2.0], [23.0, 1.0], [24.0, 2.0], [25.0, 2.0], [26.0, 2.0], [27.0, 2.0], [28.0, 2.0], [29.0, 2.0], [30.0, 2.6666666666666665], [31.0, 2.25]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[22.279999999999994, 2.22]], "isOverall": false, "label": "WS open for sr key gen-Aggregated", "isController": false}, {"data": [[32.0, 371.7142857142857], [33.0, 420.5833333333333], [8.0, 488.0], [2.0, 584.0], [34.0, 585.0], [35.0, 1264.0], [20.0, 1154.0], [22.0, 695.0], [23.0, 264.0], [24.0, 283.0], [6.0, 448.0], [25.0, 422.8], [26.0, 325.5], [27.0, 283.5], [28.0, 538.3333333333334], [29.0, 280.75], [30.0, 379.54545454545456], [31.0, 288.42857142857144]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[29.53684210526316, 444.115789473684]], "isOverall": false, "label": "Get user link result-Aggregated", "isController": false}, {"data": [[33.0, 1.625], [34.0, 1.5], [35.0, 1.0], [15.0, 1.0], [16.0, 1.0], [17.0, 11.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 7.0], [23.0, 1.0], [24.0, 2.0], [25.0, 2.6666666666666665], [26.0, 1.0], [27.0, 1.5], [28.0, 1.0], [29.0, 2.0], [30.0, 2.3333333333333335], [31.0, 1.6]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[28.44444444444445, 2.022222222222222]], "isOverall": false, "label": "Generate user keys-0-Aggregated", "isController": false}, {"data": [[32.0, 4455.5], [33.0, 6525.833333333333], [8.0, 8176.0], [2.0, 11191.0], [35.0, 6307.0], [34.0, 7631.0], [12.0, 6295.0], [5.0, 13111.0], [22.0, 5662.5], [24.0, 3823.0], [25.0, 4119.5], [26.0, 3837.0], [27.0, 4657.4], [28.0, 5128.5], [30.0, 4801.0], [31.0, 5222.444444444444]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[27.577777777777772, 5660.644444444444]], "isOverall": false, "label": "Link user-Aggregated", "isController": true}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[32.0, 17499.333333333332], [33.0, 20394.833333333332], [34.0, 19032.5], [35.0, 19648.0], [14.0, 16751.0], [15.0, 16797.0], [16.0, 16103.0], [17.0, 16544.0], [18.0, 16263.0], [19.0, 16345.0], [20.0, 16264.0], [21.0, 15830.0], [22.0, 15919.0], [23.0, 16341.0], [24.0, 17683.0], [25.0, 19695.8], [26.0, 20531.5], [27.0, 21155.75], [28.0, 16290.0], [30.0, 19091.333333333332], [31.0, 18739.8]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[27.839999999999996, 18734.520000000008]], "isOverall": false, "label": "User creation(SR side)-Aggregated", "isController": true}, {"data": [[2.0, 2073.0], [33.0, 2055.692307692308], [32.0, 2055.5], [34.0, 2051.5000000000005], [35.0, 2042.0], [3.0, 2076.0], [4.0, 2053.0], [5.0, 2075.0], [6.0, 2070.0], [7.0, 2079.0], [8.0, 2076.0], [9.0, 2060.0], [10.0, 2079.0], [11.0, 2070.0], [12.0, 2068.0], [13.0, 2069.0], [14.0, 2053.0], [15.0, 2060.0], [1.0, 2079.0], [16.0, 2063.0], [17.0, 2065.0], [18.0, 2063.5], [19.0, 2062.0], [20.0, 2065.5], [21.0, 2057.5], [22.0, 2077.3333333333335], [23.0, 2078.0], [24.0, 2075.5], [25.0, 2081.0], [26.0, 2070.5], [27.0, 2069.6666666666665], [28.0, 2062.5], [29.0, 2073.0], [30.0, 2061.6666666666665], [31.0, 2059.5555555555557]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[25.052631578947366, 2062.2105263157887]], "isOverall": false, "label": "Get Access Token-Aggregated", "isController": false}, {"data": [[33.0, 2044.6666666666665], [32.0, 2045.0], [34.0, 2045.7777777777778], [15.0, 2083.0], [16.0, 2057.0], [17.0, 2069.0], [18.0, 2066.0], [19.0, 2062.0], [20.0, 2066.0], [21.0, 2068.0], [22.0, 2128.0], [23.0, 2057.0], [24.0, 2063.0], [25.0, 2081.3333333333335], [26.0, 2071.0], [27.0, 2066.0], [28.0, 2071.0], [29.0, 2070.0], [30.0, 2050.2], [31.0, 2056.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[28.266666666666673, 2059.311111111111]], "isOverall": false, "label": "Get user keys-Aggregated", "isController": false}, {"data": [[32.0, 3.0], [33.0, 3.2], [34.0, 2.166666666666667], [35.0, 3.0], [20.0, 156.0], [22.0, 5.666666666666667], [11.0, 347.5], [26.0, 3.5], [27.0, 3.6666666666666665], [29.0, 2.0], [30.0, 3.25], [31.0, 2.6666666666666665]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[28.65714285714285, 31.599999999999998]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[33.0, 1.5], [34.0, 1.1111111111111112], [35.0, 1.0], [14.0, 1.0], [15.0, 1.0], [16.0, 1.0], [18.0, 1.0], [19.0, 0.5], [20.0, 1.0], [21.0, 1.0], [22.0, 2.0], [23.0, 1.0], [24.0, 1.0], [25.0, 2.3333333333333335], [26.0, 1.0], [27.0, 1.0], [28.0, 1.0], [30.0, 1.3333333333333333], [31.0, 19.6]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[28.133333333333333, 3.311111111111111]], "isOverall": false, "label": "WS open for user key gen-0-Aggregated", "isController": false}, {"data": [[32.0, 5163.0], [33.0, 5330.6], [34.0, 4610.833333333333], [35.0, 6136.0], [9.0, 101290.0], [11.0, 7658.0], [20.0, 6001.5], [22.0, 5568.333333333333], [26.0, 5600.0], [27.0, 5157.0], [29.0, 3704.0], [30.0, 5578.0], [31.0, 4144.333333333333]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[28.111111111111107, 7954.91666666667]], "isOverall": false, "label": "Requests for Import-Aggregated", "isController": true}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "Setup ipfs-0-Aggregated", "isController": false}, {"data": [[32.0, 15581.0], [33.0, 17642.833333333332], [8.0, 19204.0], [2.0, 22386.0], [35.0, 17029.5], [34.0, 18555.0], [12.0, 17359.0], [5.0, 24138.0], [22.0, 16679.0], [24.0, 15013.0], [25.0, 15150.25], [26.0, 15015.0], [27.0, 15597.2], [28.0, 16357.0], [30.0, 15855.4], [31.0, 16275.888888888889]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[27.577777777777772, 16704.93333333333]], "isOverall": false, "label": "User creation(user side)-Aggregated", "isController": true}, {"data": [[32.0, 4.076923076923077], [33.0, 3.1707317073170724], [34.0, 5.944444444444445], [35.0, 2.2857142857142856], [9.0, 423.0], [11.0, 363.0], [17.0, 1967.0], [20.0, 387.75], [22.0, 66.5], [23.0, 63.5], [25.0, 17.161290322580644], [26.0, 3.1666666666666665], [27.0, 14.740740740740739], [28.0, 2.7142857142857144], [29.0, 2.5], [30.0, 6.416666666666666], [31.0, 2.866666666666667]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[29.496350364963508, 32.79562043795621]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[2.0, 2.0], [32.0, 3.0], [33.0, 2.333333333333334], [34.0, 2.454545454545455], [35.0, 2.333333333333333], [3.0, 2.5], [4.0, 2.5], [5.0, 1.5], [6.0, 2.0], [7.0, 4.5], [8.0, 1.0], [9.0, 3.0], [10.0, 2.5], [11.0, 1.5], [12.0, 1.5], [13.0, 7.0], [14.0, 3.0], [15.0, 2.5], [1.0, 3.0], [16.0, 2.0], [17.0, 2.0], [18.0, 2.0], [19.0, 2.0], [20.0, 2.0], [21.0, 2.5], [22.0, 1.0], [23.0, 2.0], [24.0, 1.5], [25.0, 2.0], [26.0, 1.0], [27.0, 3.5], [28.0, 2.0], [29.0, 2.5], [30.0, 1.3333333333333333], [31.0, 2.4000000000000004]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[22.257425742574252, 2.356435643564357]], "isOverall": false, "label": "Get Admin Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 3.0], [32.0, 3.0], [33.0, 2.5], [34.0, 5.833333333333333], [35.0, 3.0], [3.0, 2.0], [4.0, 2.0], [5.0, 2.0], [6.0, 2.0], [7.0, 1.0], [8.0, 1.0], [9.0, 2.0], [10.0, 3.0], [11.0, 1.0], [12.0, 3.0], [13.0, 0.0], [14.0, 2.0], [15.0, 2.0], [1.0, 3.0], [16.0, 1.0], [17.0, 1.0], [18.0, 2.0], [19.0, 2.0], [20.0, 2.0], [21.0, 2.0], [22.0, 2.0], [23.0, 3.0], [24.0, 3.0], [25.0, 3.0], [26.0, 11.0], [27.0, 3.0], [28.0, 1.0], [29.0, 3.0], [30.0, 1.5], [31.0, 2.2]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[22.460000000000004, 2.7800000000000007]], "isOverall": false, "label": "Accept sr-0-Aggregated", "isController": false}, {"data": [[32.0, 3.5714285714285716], [33.0, 3.6666666666666665], [8.0, 174.0], [2.0, 272.0], [34.0, 4.0], [35.0, 2.5], [20.0, 242.0], [22.0, 101.0], [23.0, 2.0], [24.0, 2.0], [6.0, 181.0], [25.0, 44.0], [26.0, 50.0], [27.0, 4.0], [28.0, 6.333333333333333], [29.0, 7.0], [30.0, 12.681818181818182], [31.0, 3.0000000000000004]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[29.53684210526316, 19.978947368421053]], "isOverall": false, "label": "Get user link result-0-Aggregated", "isController": false}, {"data": [[2.0, 2987.0], [32.0, 2752.3333333333335], [33.0, 2796.6666666666665], [34.0, 2768.5], [35.0, 2792.0], [3.0, 2779.0], [4.0, 2946.0], [5.0, 2878.0], [6.0, 2885.0], [7.0, 2766.0], [8.0, 2899.0], [9.0, 2873.0], [10.0, 2895.0], [11.0, 2898.0], [12.0, 2921.0], [13.0, 2904.0], [14.0, 2874.0], [15.0, 2878.0], [1.0, 2894.0], [16.0, 2892.0], [17.0, 3006.0], [18.0, 2939.0], [19.0, 2820.0], [20.0, 2926.0], [21.0, 2953.0], [22.0, 2837.0], [23.0, 2810.0], [24.0, 2828.0], [25.0, 2787.0], [26.0, 2887.0], [27.0, 2843.0], [28.0, 2901.0], [29.0, 2833.0], [30.0, 2941.5], [31.0, 2860.8]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[22.3, 2852.5800000000004]], "isOverall": false, "label": "Login by SR OS-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "Create new tenant-0-Aggregated", "isController": false}, {"data": [[2.0, 2062.0], [32.0, 2058.0], [33.0, 2052.1666666666665], [34.0, 2049.0], [35.0, 2034.0], [3.0, 2079.0], [4.0, 2050.0], [5.0, 2063.0], [6.0, 2065.0], [7.0, 2062.0], [8.0, 2065.0], [9.0, 2071.0], [10.0, 2059.0], [11.0, 2058.0], [12.0, 2070.0], [13.0, 2047.0], [14.0, 2057.0], [15.0, 2085.0], [16.0, 2047.0], [17.0, 2066.0], [18.0, 2066.0], [19.0, 2034.0], [20.0, 2053.0], [21.0, 2035.0], [22.0, 2048.0], [23.0, 2055.0], [24.0, 2043.0], [25.0, 2052.0], [26.0, 2068.0], [27.0, 2066.0], [28.0, 2044.0], [29.0, 2066.0], [30.0, 2109.5], [31.0, 2055.4]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[22.959999999999994, 2057.9599999999996]], "isOverall": false, "label": "Get sr keys-Aggregated", "isController": false}, {"data": [[33.0, 2.625], [34.0, 2.2222222222222223], [35.0, 3.0], [14.0, 3.0], [15.0, 2.0], [16.0, 2.0], [18.0, 2.0], [19.0, 1.5], [20.0, 2.0], [21.0, 2.0], [22.0, 3.0], [23.0, 2.0], [24.0, 2.0], [25.0, 3.3333333333333335], [26.0, 2.0], [27.0, 2.5], [28.0, 3.0], [30.0, 2.3333333333333335], [31.0, 20.6]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[28.133333333333333, 4.444444444444443]], "isOverall": false, "label": "WS open for user key gen-Aggregated", "isController": false}, {"data": [[32.0, 2.0], [33.0, 2.588235294117647], [34.0, 2.142857142857143], [35.0, 3.4], [4.0, 3.0], [5.0, 3.0], [6.0, 1.0], [7.0, 3.0], [8.0, 2.0], [9.0, 2.0], [10.0, 3.0], [11.0, 252.0], [12.0, 1.0], [13.0, 3.0], [14.0, 3.0], [15.0, 1.0], [16.0, 2.0], [17.0, 1.0], [18.0, 1.0], [19.0, 2.0], [20.0, 168.0], [21.0, 0.0], [22.0, 4.0], [23.0, 3.0], [24.0, 1.0], [25.0, 31.5], [26.0, 3.75], [27.0, 3.7142857142857144], [28.0, 1.0], [29.0, 3.0], [30.0, 3.090909090909091], [31.0, 9.166666666666668]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[27.632478632478623, 11.64957264957265]], "isOverall": false, "label": "Get SR Access Token-0-Aggregated", "isController": false}, {"data": [[32.0, 3.6], [33.0, 11.416666666666666], [2.0, 167.0], [34.0, 3.5], [35.0, 2.6666666666666665], [5.0, 183.0], [8.0, 169.0], [12.0, 931.0], [14.0, 3.0], [15.0, 1.0], [16.0, 3.0], [17.0, 3.0], [18.0, 2.0], [19.0, 2.0], [20.0, 2.0], [21.0, 1.0], [22.0, 41.333333333333336], [23.0, 1.0], [24.0, 4.0], [25.0, 4.222222222222222], [26.0, 2.3333333333333335], [27.0, 3.7777777777777777], [28.0, 2.3333333333333335], [30.0, 4.75], [31.0, 2.785714285714286]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[27.715789473684207, 20.68421052631579]], "isOverall": false, "label": "Verify link-0-Aggregated", "isController": false}, {"data": [[32.0, 1.5], [33.0, 2.75], [34.0, 2.3333333333333335], [35.0, 3.333333333333333], [1.0, 90.0], [18.0, 1402.0], [23.0, 19.0], [24.0, 7.0], [6.0, 356.0], [25.0, 117.0], [26.0, 3.0], [27.0, 11.0], [28.0, 6.0], [29.0, 5.0], [30.0, 5.0], [31.0, 2.6]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[28.935483870967744, 66.83870967741935]], "isOverall": false, "label": "Dry Run Policy-0-Aggregated", "isController": false}, {"data": [[32.0, 15356.0], [33.0, 21152.25], [34.0, 21696.666666666668], [35.0, 18792.0], [1.0, 75098.0], [18.0, 34794.0], [23.0, 53751.0], [24.0, 51787.0], [6.0, 60392.0], [25.0, 51261.0], [26.0, 13508.0], [27.0, 30021.0], [28.0, 14167.0], [29.0, 58003.0], [30.0, 56792.0], [31.0, 20251.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[28.935483870967744, 29119.548387096776]], "isOverall": false, "label": "Policy import and dry run-Aggregated", "isController": true}, {"data": [[2.0, 1916.0], [32.0, 1993.0], [33.0, 1739.25], [34.0, 1808.1666666666667], [35.0, 2535.0], [3.0, 1962.0], [4.0, 1714.0], [5.0, 1643.0], [6.0, 2115.0], [7.0, 1764.0], [8.0, 1970.0], [9.0, 1766.0], [10.0, 1660.0], [11.0, 1797.0], [12.0, 1746.0], [13.0, 1831.0], [14.0, 1705.0], [15.0, 1615.0], [1.0, 1867.0], [16.0, 1684.0], [17.0, 1649.0], [18.0, 1762.0], [19.0, 1808.0], [20.0, 1673.0], [21.0, 1704.0], [22.0, 1769.0], [23.0, 1901.0], [24.0, 1715.0], [25.0, 1652.0], [26.0, 1825.0], [27.0, 1596.0], [28.0, 1997.0], [29.0, 1673.0], [30.0, 1730.5], [31.0, 1885.2]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[22.460000000000004, 1835.4]], "isOverall": false, "label": "Invite and accept SR-Aggregated", "isController": true}, {"data": [[2.0, 1.0], [32.0, 1.0], [33.0, 1.2], [34.0, 1.1666666666666667], [35.0, 2.0], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 0.0], [7.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [12.0, 0.0], [13.0, 0.0], [14.0, 1.0], [15.0, 1.0], [16.0, 0.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 0.0], [23.0, 0.0], [24.0, 0.0], [25.0, 1.0], [26.0, 1.0], [27.0, 0.0], [28.0, 1.0], [29.0, 1.0], [30.0, 1.5], [31.0, 1.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[22.979999999999997, 0.9199999999999999]], "isOverall": false, "label": "Get key gen result-0-Aggregated", "isController": false}, {"data": [[32.0, 6387.666666666667], [33.0, 9240.5], [34.0, 7911.25], [35.0, 8452.0], [14.0, 5564.0], [15.0, 5517.0], [16.0, 5049.0], [17.0, 5319.0], [18.0, 5109.0], [19.0, 5193.0], [20.0, 5232.0], [21.0, 4654.0], [22.0, 4790.0], [23.0, 5176.0], [24.0, 6583.0], [25.0, 8680.6], [26.0, 9477.5], [27.0, 10055.75], [28.0, 5191.0], [30.0, 8004.0], [31.0, 7738.2]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[27.839999999999996, 7631.840000000001]], "isOverall": false, "label": "Link SR-Aggregated", "isController": true}, {"data": [[2.0, 586.0], [32.0, 637.0], [33.0, 608.75], [34.0, 688.5], [35.0, 641.0], [3.0, 570.0], [4.0, 552.0], [5.0, 550.0], [6.0, 676.0], [7.0, 549.0], [8.0, 548.0], [9.0, 572.0], [10.0, 551.0], [11.0, 598.0], [12.0, 562.0], [13.0, 626.0], [14.0, 583.0], [15.0, 546.0], [1.0, 550.0], [16.0, 536.0], [17.0, 544.0], [18.0, 574.0], [19.0, 564.0], [20.0, 554.0], [21.0, 604.0], [22.0, 652.0], [23.0, 620.0], [24.0, 556.0], [25.0, 557.0], [26.0, 583.0], [27.0, 576.0], [28.0, 767.0], [29.0, 553.0], [30.0, 573.0], [31.0, 748.8]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[22.460000000000004, 617.5000000000001]], "isOverall": false, "label": "Accept sr-Aggregated", "isController": false}, {"data": [[2.0, 2976.0], [32.0, 3241.0], [33.0, 3117.5], [34.0, 3722.0], [35.0, 4462.0], [3.0, 3151.0], [4.0, 3395.0], [5.0, 4050.0], [6.0, 3340.0], [7.0, 2808.0], [8.0, 3175.0], [9.0, 2939.0], [10.0, 2851.0], [11.0, 2939.0], [12.0, 2908.0], [13.0, 2915.0], [14.0, 2895.0], [15.0, 2951.0], [1.0, 3006.0], [16.0, 2818.0], [17.0, 2737.0], [18.0, 2887.0], [19.0, 2900.0], [20.0, 2986.0], [21.0, 2915.0], [22.0, 2883.0], [23.0, 3107.0], [24.0, 2986.0], [25.0, 2891.0], [26.0, 3001.0], [27.0, 3051.0], [28.0, 3850.0], [29.0, 2889.0], [30.0, 3250.0], [31.0, 3217.2]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[22.380000000000003, 3190.5199999999995]], "isOverall": false, "label": "User creation(admin side)-Aggregated", "isController": true}, {"data": [[33.0, 1.125], [34.0, 1.1111111111111114], [35.0, 1.0], [14.0, 1.0], [15.0, 1.0], [16.0, 1.0], [17.0, 0.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 2.5], [23.0, 0.0], [24.0, 1.0], [25.0, 2.0], [26.0, 1.0], [27.0, 1.5], [28.0, 0.0], [30.0, 2.0], [31.0, 1.5]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[28.11111111111111, 1.2444444444444442]], "isOverall": false, "label": "Login by user OS-0-Aggregated", "isController": false}, {"data": [[32.0, 1109.0], [33.0, 1056.2], [8.0, 1256.0], [34.0, 1145.0], [35.0, 2487.5], [15.0, 6738.0], [20.0, 1046.0], [21.0, 976.0], [22.0, 1064.5], [23.0, 1008.0], [24.0, 973.0], [25.0, 1039.5], [26.0, 1113.0], [27.0, 971.5], [28.0, 1027.0], [29.0, 934.0], [30.0, 985.3333333333334], [31.0, 1007.25]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[28.822222222222223, 1235.8444444444444]], "isOverall": false, "label": "WS open for user link-Aggregated", "isController": false}, {"data": [[32.0, 352.07692307692304], [33.0, 406.39024390243907], [34.0, 475.3611111111111], [35.0, 954.8571428571428], [9.0, 2558.0], [11.0, 653.0], [17.0, 2479.5], [20.0, 842.0], [22.0, 414.4166666666667], [23.0, 729.0], [25.0, 419.45161290322574], [26.0, 384.5], [27.0, 400.8148148148148], [28.0, 402.42857142857144], [29.0, 407.0], [30.0, 403.56250000000006], [31.0, 416.06666666666655]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[29.496350364963508, 460.7627737226279]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[32.0, 2.0], [33.0, 2.9], [34.0, 2.5], [35.0, 1.5], [6.0, 2.0], [8.0, 2.0], [10.0, 1.0], [11.0, 1.5], [12.0, 3.0], [13.0, 2.0], [14.0, 3.0], [15.0, 2.0], [16.0, 3.0], [17.0, 2.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 3.0], [22.0, 2.0], [23.0, 2.0], [24.0, 3.0], [25.0, 2.0], [26.0, 3.0], [27.0, 2.0], [28.0, 1.0], [29.0, 3.0], [30.0, 2.0], [31.0, 2.4]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[25.480000000000008, 2.2800000000000002]], "isOverall": false, "label": "WS open for sr link-0-Aggregated", "isController": false}, {"data": [[32.0, 3.6666666666666665], [33.0, 3.0], [8.0, 173.0], [34.0, 2.8], [35.0, 3.0], [14.0, 1155.0], [20.0, 2.0], [21.0, 1.0], [22.0, 47.0], [23.0, 1.0], [24.0, 3.0], [25.0, 48.0], [26.0, 4.5], [27.0, 4.0], [28.0, 4.0], [29.0, 3.0], [30.0, 3.5], [31.0, 3.5000000000000004]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[28.800000000000004, 36.53333333333334]], "isOverall": false, "label": "WS open for user link-0-Aggregated", "isController": false}, {"data": [[1.0, 338.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.0, 338.0]], "isOverall": false, "label": "Create new tenant-Aggregated", "isController": false}, {"data": [[32.0, 2040.0], [33.0, 2043.6666666666667], [34.0, 2039.3333333333333], [35.0, 2047.0], [15.0, 2048.0], [16.0, 2062.0], [17.0, 2073.0], [18.0, 2064.0], [19.0, 2024.0], [20.0, 2062.0], [21.0, 2051.0], [22.0, 2087.0], [23.0, 2066.0], [24.0, 2040.0], [25.0, 2062.3333333333335], [26.0, 2051.0], [27.0, 2072.5], [28.0, 2071.0], [29.0, 2073.0], [30.0, 2046.5], [31.0, 2060.5]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[28.288888888888895, 2052.7777777777783]], "isOverall": false, "label": "Get user key gen result-Aggregated", "isController": false}, {"data": [[33.0, 3.285714285714286], [32.0, 1.0], [34.0, 1.8], [35.0, 2.0], [16.0, 3.0], [17.0, 2.0], [18.0, 1.0], [19.0, 0.0], [20.0, 104.0], [21.0, 1.0], [22.0, 6.0], [23.0, 3.0], [24.0, 2.0], [25.0, 33.0], [26.0, 3.0], [27.0, 3.0], [28.0, 5.0], [29.0, 3.0], [30.0, 1.8333333333333335], [31.0, 3.75]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[28.4, 6.933333333333334]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[32.0, 3.5], [33.0, 3.0], [34.0, 5.0], [35.0, 2.0], [16.0, 4317.0], [18.0, 2.0], [19.0, 2.0], [21.0, 3.0], [22.0, 64.66666666666666], [23.0, 3.0], [24.0, 3.0], [25.0, 2.5], [26.0, 2.0], [27.0, 2.0], [28.0, 2.5], [29.0, 3.0], [30.0, 3.25], [31.0, 2.8]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[28.6, 103.06666666666666]], "isOverall": false, "label": "Get User Access Token-0-Aggregated", "isController": false}, {"data": [[32.0, 1.0], [33.0, 2.875], [34.0, 2.5555555555555554], [35.0, 3.0], [8.0, 2.0], [9.0, 3.0], [10.0, 1.0], [11.0, 2.0], [12.0, 1.0], [13.0, 3.0], [14.0, 1.0], [15.0, 3.0], [16.0, 0.0], [17.0, 2.0], [18.0, 1.0], [19.0, 2.0], [20.0, 2.0], [21.0, 0.0], [22.0, 1.5], [24.0, 0.0], [25.0, 3.0], [26.0, 2.0], [27.0, 3.0], [28.0, 2.0], [29.0, 2.0], [30.0, 1.5], [31.0, 1.25]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[26.580000000000002, 2.06]], "isOverall": false, "label": "Link SR profile-0-Aggregated", "isController": false}, {"data": [[2.0, 2.0], [32.0, 3.0], [33.0, 1.6666666666666665], [34.0, 1.5], [35.0, 1.0], [3.0, 2.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 0.0], [9.0, 1.0], [10.0, 2.0], [11.0, 2.0], [12.0, 3.0], [13.0, 2.0], [14.0, 2.0], [15.0, 0.0], [1.0, 2.0], [16.0, 2.0], [17.0, 3.0], [18.0, 3.0], [19.0, 1.0], [20.0, 2.0], [21.0, 3.0], [22.0, 2.0], [23.0, 3.0], [24.0, 3.0], [25.0, 2.0], [26.0, 3.0], [27.0, 3.0], [28.0, 3.0], [29.0, 1.0], [30.0, 11.5], [31.0, 4.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[22.380000000000003, 2.44]], "isOverall": false, "label": "Accept user-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 1.0], [33.0, 1.0], [34.0, 3.0], [35.0, 2.0], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 0.0], [9.0, 2.0], [10.0, 0.0], [11.0, 1.0], [12.0, 1.0], [13.0, 0.0], [14.0, 1.0], [15.0, 1.0], [16.0, 0.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 1.0], [23.0, 0.0], [24.0, 1.0], [25.0, 1.0], [26.0, 0.0], [27.0, 1.0], [28.0, 0.0], [29.0, 1.0], [30.0, 1.0], [31.0, 1.2]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[22.959999999999994, 1.1199999999999999]], "isOverall": false, "label": "Get sr keys-0-Aggregated", "isController": false}, {"data": [[33.0, 2670.25], [34.0, 2833.6666666666665], [35.0, 2714.0], [14.0, 2923.0], [15.0, 2889.0], [16.0, 2892.0], [17.0, 2877.0], [18.0, 3031.0], [19.0, 2807.0], [20.0, 3017.0], [21.0, 2779.0], [22.0, 2779.0], [23.0, 2996.0], [24.0, 2875.0], [25.0, 2732.3333333333335], [26.0, 2851.0], [27.0, 2827.0], [28.0, 2884.0], [30.0, 2828.0], [31.0, 2829.5]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[28.11111111111111, 2809.8222222222225]], "isOverall": false, "label": "Login by user OS-Aggregated", "isController": false}, {"data": [[32.0, 2.6896551724137927], [33.0, 3.0428571428571423], [34.0, 4.369230769230768], [35.0, 2.5416666666666665], [9.0, 2.0], [10.0, 2.0], [11.0, 2.5], [12.0, 2.0], [13.0, 2.5], [14.0, 1.75], [15.0, 2.25], [16.0, 1.5], [17.0, 2.25], [18.0, 2.0], [19.0, 1.0], [20.0, 1.6666666666666667], [21.0, 2.2], [22.0, 2.0], [23.0, 1.0], [24.0, 2.3333333333333335], [25.0, 3.2222222222222223], [26.0, 2.5], [27.0, 3.3125], [28.0, 2.5714285714285716], [29.0, 2.6], [30.0, 6.12], [31.0, 2.53448275862069]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[29.629722921914354, 3.3450881612090666]], "isOverall": false, "label": "Get SR link result-0-Aggregated", "isController": false}, {"data": [[33.0, 10932.0], [32.0, 10807.333333333334], [34.0, 11003.888888888889], [15.0, 11190.0], [16.0, 11146.0], [17.0, 11178.0], [18.0, 11152.0], [19.0, 11223.0], [20.0, 11077.0], [21.0, 11286.0], [22.0, 11115.0], [23.0, 11081.0], [24.0, 11248.0], [25.0, 11069.0], [26.0, 11015.0], [27.0, 11092.0], [28.0, 11131.0], [29.0, 11151.0], [30.0, 11041.6], [31.0, 11079.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[28.266666666666673, 11044.288888888888]], "isOverall": false, "label": "Generate user hedera data-Aggregated", "isController": true}, {"data": [[32.0, 432.2], [33.0, 540.1666666666666], [2.0, 476.0], [34.0, 747.5999999999999], [35.0, 954.3333333333334], [5.0, 1458.0], [8.0, 447.0], [12.0, 1401.0], [14.0, 832.0], [15.0, 729.0], [16.0, 724.0], [17.0, 1156.0], [18.0, 747.0], [19.0, 739.0], [20.0, 782.0], [21.0, 776.0], [22.0, 666.6666666666666], [23.0, 710.0], [24.0, 611.6666666666666], [25.0, 365.1111111111111], [26.0, 444.0], [27.0, 421.5555555555555], [28.0, 587.3333333333334], [30.0, 407.125], [31.0, 358.9285714285715]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[27.715789473684207, 549.9999999999999]], "isOverall": false, "label": "Verify link-Aggregated", "isController": false}, {"data": [[1.0, 930.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.0, 930.0]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[32.0, 293.875], [33.0, 273.2941176470588], [34.0, 399.85714285714283], [35.0, 713.6], [4.0, 255.0], [5.0, 424.0], [6.0, 329.0], [7.0, 349.0], [8.0, 266.0], [9.0, 275.0], [10.0, 273.0], [11.0, 559.0], [12.0, 283.0], [13.0, 279.0], [14.0, 288.0], [15.0, 267.0], [16.0, 277.0], [17.0, 279.0], [18.0, 296.0], [19.0, 257.0], [20.0, 452.5], [21.0, 415.0], [22.0, 289.0], [23.0, 272.0], [24.0, 270.0], [25.0, 305.5], [26.0, 264.0], [27.0, 271.99999999999994], [28.0, 278.6666666666667], [29.0, 363.0], [30.0, 268.63636363636357], [31.0, 270.5]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[27.632478632478623, 321.30769230769226]], "isOverall": false, "label": "Get SR Access Token-Aggregated", "isController": false}, {"data": [[2.0, 11187.0], [32.0, 11091.666666666666], [33.0, 10940.833333333332], [34.0, 11024.8], [35.0, 10833.0], [3.0, 11280.0], [4.0, 11054.0], [5.0, 11225.0], [6.0, 11154.0], [7.0, 11152.0], [8.0, 11032.0], [9.0, 11176.0], [10.0, 11129.0], [11.0, 11165.0], [12.0, 11194.0], [13.0, 11161.0], [14.0, 11174.0], [15.0, 11139.0], [16.0, 11099.0], [17.0, 11135.0], [18.0, 11274.0], [19.0, 11142.0], [20.0, 11077.0], [21.0, 11158.0], [22.0, 11185.0], [23.0, 11108.0], [24.0, 11076.0], [25.0, 11100.0], [26.0, 11060.0], [27.0, 11183.0], [28.0, 11118.0], [29.0, 11174.0], [30.0, 11175.5], [31.0, 11159.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[22.959999999999994, 11102.68]], "isOverall": false, "label": "Generate sr hedera data-Aggregated", "isController": true}, {"data": [[32.0, 748.5], [33.0, 949.8], [34.0, 917.1666666666667], [35.0, 1692.0], [3.0, 606.0], [4.0, 599.0], [5.0, 623.0], [6.0, 676.0], [7.0, 601.0], [8.0, 652.0], [9.0, 886.0], [10.0, 600.0], [11.0, 620.0], [12.0, 693.0], [13.0, 647.0], [14.0, 594.0], [15.0, 589.0], [16.0, 615.0], [17.0, 616.0], [18.0, 614.0], [19.0, 596.0], [20.0, 620.0], [21.0, 814.0], [22.0, 612.0], [23.0, 635.0], [24.0, 660.0], [25.0, 708.0], [26.0, 667.0], [27.0, 740.0], [28.0, 700.0], [29.0, 700.0], [30.0, 660.0], [31.0, 673.6]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[23.580000000000005, 746.1800000000002]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[32.0, 1.0], [33.0, 1.4444444444444442], [34.0, 1.5], [35.0, 2.0], [15.0, 1.0], [16.0, 1.0], [17.0, 0.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 45.0], [23.0, 1.0], [24.0, 1.0], [25.0, 2.3333333333333335], [26.0, 1.0], [27.0, 1.5], [28.0, 1.0], [29.0, 1.0], [30.0, 2.0], [31.0, 1.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[28.288888888888895, 3.311111111111111]], "isOverall": false, "label": "Get user key gen result-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 1.3333333333333333], [33.0, 17.0], [34.0, 1.0], [35.0, 1.0], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 2.0], [9.0, 0.0], [10.0, 1.0], [11.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 1.0], [1.0, 1.0], [16.0, 0.0], [17.0, 1.0], [18.0, 0.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 1.0], [23.0, 1.0], [24.0, 1.0], [25.0, 1.0], [26.0, 1.0], [27.0, 1.0], [28.0, 1.0], [29.0, 1.0], [30.0, 1.0], [31.0, 0.8]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[22.3, 2.8800000000000003]], "isOverall": false, "label": "Login by SR OS-0-Aggregated", "isController": false}, {"data": [[32.0, 4.0], [33.0, 2.4], [8.0, 102.0], [34.0, 2.0], [35.0, 3.0], [11.0, 225.0], [18.0, 1944.0], [21.0, 0.0], [22.0, 2.5], [23.0, 3.0], [24.0, 3.0], [25.0, 4.5], [26.0, 1.5], [27.0, 4.5], [28.0, 2.0], [29.0, 3.0], [30.0, 2.833333333333333], [31.0, 3.5]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[28.599999999999998, 53.13333333333333]], "isOverall": false, "label": "Get SR DID-0-Aggregated", "isController": false}, {"data": [[33.0, 1.1666666666666667], [32.0, 2.0], [34.0, 1.7777777777777777], [15.0, 1.0], [16.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 60.0], [23.0, 1.0], [24.0, 1.0], [25.0, 34.0], [26.0, 1.0], [27.0, 0.5], [28.0, 0.0], [29.0, 1.0], [30.0, 2.8], [31.0, 2.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[28.266666666666673, 6.288888888888888]], "isOverall": false, "label": "Get user keys-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 35.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 142.28333333333333, "minX": 1.73349822E12, "maxY": 647298.25, "series": [{"data": [[1.7334984E12, 252412.23333333334], [1.73349906E12, 42438.01666666667], [1.73349876E12, 598179.9166666666], [1.73349846E12, 324643.48333333334], [1.73349882E12, 597786.75], [1.73349852E12, 430775.45], [1.73349822E12, 28997.7], [1.73349888E12, 550804.8833333333], [1.73349858E12, 500611.56666666665], [1.73349828E12, 121613.33333333333], [1.73349894E12, 402956.76666666666], [1.73349864E12, 588607.4], [1.73349834E12, 166754.18333333332], [1.733499E12, 209918.81666666668], [1.7334987E12, 647298.25]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7334984E12, 2194.2], [1.73349906E12, 142.28333333333333], [1.73349876E12, 2672.0333333333333], [1.73349846E12, 2653.2166666666667], [1.73349882E12, 2439.366666666667], [1.73349852E12, 3123.3166666666666], [1.73349822E12, 266.75], [1.73349888E12, 2151.4], [1.73349858E12, 3285.133333333333], [1.73349828E12, 1074.7833333333333], [1.73349894E12, 1529.7], [1.73349864E12, 3448.05], [1.73349834E12, 1464.3666666666666], [1.733499E12, 838.4833333333333], [1.7334987E12, 3293.6]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349906E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.33333333333333337, "minX": 1.73349822E12, "maxY": 101290.0, "series": [{"data": [[1.7334984E12, 1.1666666666666665], [1.73349858E12, 1.6666666666666667], [1.73349828E12, 2.3333333333333335], [1.73349846E12, 1.6666666666666665], [1.73349864E12, 1.5], [1.73349834E12, 2.1666666666666665], [1.73349852E12, 2.1666666666666665], [1.7334987E12, 2.8333333333333335], [1.73349822E12, 1.5]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7334984E12, 1009.3333333333333], [1.73349858E12, 980.8333333333334], [1.73349876E12, 1455.5], [1.73349828E12, 1198.5], [1.73349846E12, 1029.1666666666667], [1.73349864E12, 1212.3333333333333], [1.73349834E12, 967.3333333333334], [1.73349852E12, 1050.8333333333333], [1.7334987E12, 1574.3333333333333]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.7334984E12, 284.5], [1.73349876E12, 717.0], [1.73349846E12, 301.41666666666663], [1.73349882E12, 327.7142857142857], [1.73349852E12, 295.41666666666663], [1.73349888E12, 423.25], [1.73349858E12, 369.3333333333333], [1.73349828E12, 408.0], [1.73349894E12, 586.5], [1.73349864E12, 451.0], [1.73349834E12, 315.1666666666667], [1.733499E12, 1027.0], [1.7334987E12, 694.25]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7334984E12, 775.6666666666667], [1.73349858E12, 757.8333333333334], [1.73349876E12, 1399.3333333333333], [1.73349828E12, 966.0], [1.73349846E12, 852.1666666666666], [1.73349864E12, 764.3333333333334], [1.73349882E12, 813.0], [1.73349834E12, 824.1666666666666], [1.73349852E12, 785.5], [1.7334987E12, 1196.8333333333333]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7334984E12, 1.8333333333333335], [1.73349858E12, 1.3333333333333333], [1.73349828E12, 1.6666666666666665], [1.73349846E12, 1.6666666666666667], [1.73349864E12, 1.8333333333333333], [1.73349834E12, 1.6666666666666667], [1.73349852E12, 1.6666666666666667], [1.7334987E12, 2.666666666666667], [1.73349822E12, 0.5]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73349888E12, 4.0], [1.73349858E12, 1.5], [1.73349906E12, 144.5], [1.73349876E12, 3.8333333333333335], [1.73349894E12, 3.0], [1.73349846E12, 1.4], [1.73349864E12, 2.0], [1.73349882E12, 3.333333333333333], [1.73349852E12, 2.333333333333333], [1.733499E12, 81.0], [1.7334987E12, 3.5]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73349888E12, 4.5], [1.73349858E12, 2.5], [1.73349876E12, 3.0], [1.73349894E12, 7.0], [1.73349846E12, 2.0], [1.73349864E12, 2.6666666666666665], [1.73349882E12, 4.6], [1.73349852E12, 2.0], [1.7334987E12, 27.5]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.7334984E12, 497.8333333333333], [1.73349858E12, 553.4166666666667], [1.73349828E12, 547.5833333333335], [1.73349846E12, 535.1666666666665], [1.73349864E12, 505.08333333333326], [1.73349834E12, 536.6666666666666], [1.73349852E12, 587.1666666666666], [1.7334987E12, 722.1666666666666], [1.73349822E12, 455.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.7334984E12, 2.25], [1.73349876E12, 2.9], [1.73349846E12, 3.1666666666666674], [1.73349882E12, 16.428571428571423], [1.73349852E12, 2.5000000000000004], [1.73349888E12, 2.75], [1.73349858E12, 2.3333333333333335], [1.73349828E12, 2.3333333333333335], [1.73349894E12, 4.0], [1.73349864E12, 3.272727272727273], [1.73349834E12, 1.3333333333333333], [1.733499E12, 155.33333333333334], [1.7334987E12, 2.875]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73349888E12, 269.0], [1.73349858E12, 289.0], [1.73349876E12, 558.0], [1.73349894E12, 252.0], [1.73349846E12, 289.0], [1.73349864E12, 317.0], [1.73349882E12, 275.4], [1.73349852E12, 285.6], [1.7334987E12, 296.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.7334984E12, 406.8333333333333], [1.73349858E12, 407.3333333333333], [1.73349828E12, 441.5], [1.73349846E12, 356.5], [1.73349864E12, 346.6666666666667], [1.73349834E12, 365.6666666666667], [1.73349852E12, 362.0], [1.7334987E12, 349.3333333333333], [1.73349822E12, 559.5]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73349888E12, 2052.0], [1.7334984E12, 2066.8333333333335], [1.73349858E12, 2048.0], [1.73349876E12, 2046.3333333333335], [1.73349894E12, 2053.6666666666665], [1.73349846E12, 2072.833333333333], [1.73349864E12, 2056.8], [1.73349882E12, 2051.0], [1.73349852E12, 2068.25], [1.733499E12, 2040.0], [1.7334987E12, 2040.5]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7334984E12, 2064.1666666666665], [1.73349858E12, 2066.6666666666665], [1.73349876E12, 2043.0], [1.73349828E12, 2075.166666666667], [1.73349846E12, 2071.3333333333335], [1.73349864E12, 2052.5], [1.73349834E12, 2064.3333333333335], [1.73349852E12, 2066.333333333333], [1.7334987E12, 2056.833333333333], [1.73349822E12, 2083.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73349888E12, 309.0], [1.73349858E12, 273.8], [1.73349876E12, 260.5], [1.73349894E12, 310.8], [1.73349864E12, 270.6], [1.73349882E12, 294.75], [1.73349852E12, 255.5], [1.733499E12, 622.1666666666667], [1.7334987E12, 367.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73349822E12, 1803.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.7334984E12, 0.9166666666666666], [1.73349876E12, 1.25], [1.73349846E12, 0.75], [1.73349882E12, 2.0], [1.73349852E12, 0.8], [1.73349822E12, 1.0], [1.73349888E12, 1.3333333333333333], [1.73349858E12, 1.4444444444444444], [1.73349828E12, 0.8333333333333334], [1.73349894E12, 51.0], [1.73349864E12, 1.0], [1.73349834E12, 0.5], [1.733499E12, 3.0], [1.7334987E12, 1.1]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73349888E12, 990.8333333333334], [1.73349858E12, 1021.6666666666667], [1.73349876E12, 1098.3333333333333], [1.73349894E12, 997.5], [1.73349846E12, 986.0], [1.73349864E12, 1037.6666666666667], [1.73349882E12, 991.2], [1.73349852E12, 954.4], [1.7334987E12, 1019.5]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.7334984E12, 0.8333333333333334], [1.73349858E12, 1.3333333333333333], [1.73349876E12, 2.0], [1.73349828E12, 0.8333333333333334], [1.73349846E12, 1.0], [1.73349864E12, 3.0], [1.73349834E12, 0.8333333333333334], [1.73349852E12, 1.0], [1.7334987E12, 3.166666666666667], [1.73349822E12, 2.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73349888E12, 36695.333333333336], [1.73349858E12, 9557.4], [1.73349906E12, 59228.5], [1.73349876E12, 17937.0], [1.73349894E12, 34458.6], [1.73349864E12, 16964.5], [1.73349882E12, 22204.0], [1.73349852E12, 19514.0], [1.733499E12, 28887.0], [1.7334987E12, 12760.4]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.7334984E12, 1181.3333333333333], [1.73349858E12, 1367.6666666666667], [1.73349828E12, 1458.5], [1.73349846E12, 1202.8333333333335], [1.73349864E12, 1449.3333333333333], [1.73349834E12, 1157.0], [1.73349852E12, 1444.8333333333335], [1.7334987E12, 1664.6666666666667], [1.73349822E12, 1099.5]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73349888E12, 426.0], [1.7334984E12, 295.37500000000006], [1.73349858E12, 420.6666666666666], [1.73349876E12, 624.9272727272725], [1.73349894E12, 436.8333333333333], [1.73349846E12, 287.25], [1.73349864E12, 361.9795918367347], [1.73349882E12, 386.9107142857143], [1.73349834E12, 303.73333333333335], [1.73349852E12, 326.85714285714283], [1.7334987E12, 601.7962962962963]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73349888E12, 271.25], [1.7334984E12, 273.6666666666667], [1.73349858E12, 293.3333333333333], [1.73349876E12, 364.5], [1.73349894E12, 449.0], [1.73349846E12, 290.83333333333337], [1.73349864E12, 269.75], [1.73349882E12, 286.0], [1.73349852E12, 283.5], [1.733499E12, 2644.5], [1.7334987E12, 281.5]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.7334984E12, 575.8333333333334], [1.73349858E12, 696.5], [1.73349828E12, 608.8333333333334], [1.73349846E12, 588.5], [1.73349864E12, 757.5], [1.73349834E12, 557.1666666666667], [1.73349852E12, 695.0], [1.7334987E12, 805.5], [1.73349822E12, 556.5]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73349888E12, 799.3333333333334], [1.7334984E12, 616.0], [1.73349858E12, 914.6666666666666], [1.73349876E12, 1073.2857142857144], [1.73349894E12, 1203.0], [1.73349846E12, 629.8333333333334], [1.73349864E12, 1534.0], [1.73349882E12, 678.2], [1.73349852E12, 665.0], [1.733499E12, 1284.5], [1.7334987E12, 1047.75]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73349888E12, 792.2], [1.73349858E12, 845.5], [1.73349906E12, 443.0], [1.73349876E12, 1139.0], [1.73349894E12, 358.5], [1.73349846E12, 811.3333333333334], [1.73349864E12, 361.5], [1.73349882E12, 695.8333333333333], [1.73349852E12, 844.8333333333333], [1.733499E12, 1190.0], [1.7334987E12, 582.1666666666667]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73349888E12, 285.0], [1.73349858E12, 285.5], [1.73349906E12, 911.0], [1.73349876E12, 726.8333333333333], [1.73349894E12, 270.5], [1.73349846E12, 276.0], [1.73349864E12, 262.3333333333333], [1.73349882E12, 271.0], [1.73349852E12, 278.5], [1.733499E12, 905.5], [1.7334987E12, 276.25]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.7334984E12, 2062.8333333333335], [1.73349858E12, 2063.0], [1.73349876E12, 2055.0], [1.73349828E12, 2063.666666666667], [1.73349846E12, 2067.666666666667], [1.73349864E12, 2060.2857142857147], [1.73349834E12, 2071.333333333333], [1.73349852E12, 2067.5], [1.7334987E12, 2042.4], [1.73349822E12, 2067.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.7334984E12, 348.5], [1.73349858E12, 376.0], [1.73349828E12, 600.1666666666666], [1.73349846E12, 353.16666666666663], [1.73349864E12, 434.8333333333333], [1.73349834E12, 329.6666666666667], [1.73349852E12, 327.66666666666663], [1.7334987E12, 573.3333333333334], [1.73349822E12, 305.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.7334984E12, 1.6666666666666667], [1.73349858E12, 2.8333333333333335], [1.73349876E12, 7.0], [1.73349828E12, 2.0], [1.73349846E12, 2.333333333333333], [1.73349864E12, 2.833333333333333], [1.73349834E12, 2.3333333333333335], [1.73349852E12, 2.166666666666667], [1.7334987E12, 1.6666666666666667]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73349888E12, 4.5], [1.73349858E12, 2.166666666666667], [1.73349876E12, 4.333333333333333], [1.73349894E12, 9.0], [1.73349846E12, 2.0], [1.73349864E12, 4.0], [1.73349882E12, 4.0], [1.73349852E12, 2.4], [1.7334987E12, 2.25]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.7334984E12, 34835.0], [1.73349858E12, 39654.66666666667], [1.73349876E12, 46897.666666666664], [1.73349828E12, 34694.75], [1.73349846E12, 37702.333333333336], [1.73349864E12, 39720.5], [1.73349834E12, 34612.142857142855], [1.73349852E12, 39831.833333333336], [1.7334987E12, 42212.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349822E12, 264.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.7334984E12, 0.8333333333333334], [1.73349858E12, 1.3333333333333333], [1.73349876E12, 2.0], [1.73349828E12, 1.1666666666666665], [1.73349846E12, 1.0], [1.73349864E12, 1.3333333333333333], [1.73349834E12, 0.8333333333333334], [1.73349852E12, 0.8333333333333334], [1.7334987E12, 1.6666666666666667], [1.73349822E12, 1.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73349888E12, 36969.666666666664], [1.73349858E12, 9837.4], [1.73349906E12, 59941.0], [1.73349876E12, 18200.5], [1.73349894E12, 34731.4], [1.73349864E12, 17243.25], [1.73349882E12, 22458.0], [1.73349852E12, 19749.0], [1.733499E12, 29155.0], [1.7334987E12, 13021.8]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.7334984E12, 2.0], [1.73349858E12, 2.5], [1.73349876E12, 4.0], [1.73349828E12, 2.166666666666667], [1.73349846E12, 1.8333333333333335], [1.73349864E12, 2.5], [1.73349834E12, 1.8333333333333333], [1.73349852E12, 2.0], [1.7334987E12, 2.666666666666667], [1.73349822E12, 2.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73349888E12, 389.17647058823536], [1.73349858E12, 297.70000000000005], [1.73349906E12, 506.6666666666667], [1.73349876E12, 397.5], [1.73349894E12, 405.25], [1.73349846E12, 277.0], [1.73349864E12, 352.75], [1.73349882E12, 331.68749999999994], [1.73349852E12, 324.6], [1.733499E12, 1042.5], [1.7334987E12, 1036.5]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73349888E12, 3.0], [1.7334984E12, 2.666666666666667], [1.73349858E12, 1.3333333333333333], [1.73349876E12, 1.8333333333333335], [1.73349894E12, 3.0], [1.73349846E12, 2.8333333333333335], [1.73349864E12, 1.2], [1.73349882E12, 2.0], [1.73349852E12, 1.25], [1.733499E12, 3.0], [1.7334987E12, 1.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73349888E12, 5662.5], [1.7334984E12, 3845.6], [1.73349858E12, 5626.333333333333], [1.73349876E12, 5570.166666666667], [1.73349894E12, 7235.5], [1.73349846E12, 4225.0], [1.73349864E12, 6969.0], [1.73349882E12, 4151.4], [1.73349852E12, 4362.75], [1.733499E12, 12151.0], [1.7334987E12, 7278.166666666666]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349822E12, 2.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.7334984E12, 16357.0], [1.73349858E12, 20814.5], [1.73349876E12, 19334.0], [1.73349828E12, 16467.166666666664], [1.73349846E12, 17790.833333333332], [1.73349864E12, 20221.4], [1.73349834E12, 16045.0], [1.73349852E12, 19190.5], [1.7334987E12, 22423.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7334984E12, 2060.833333333333], [1.73349876E12, 2052.75], [1.73349846E12, 2068.9999999999995], [1.73349882E12, 2039.5], [1.73349852E12, 2071.6000000000004], [1.73349822E12, 2079.0], [1.73349888E12, 2053.6666666666665], [1.73349858E12, 2070.222222222222], [1.73349828E12, 2071.0], [1.73349894E12, 2098.0], [1.73349864E12, 2055.0], [1.73349834E12, 2070.333333333333], [1.733499E12, 2085.0], [1.7334987E12, 2045.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73349888E12, 2043.0], [1.7334984E12, 2067.4], [1.73349858E12, 2070.0], [1.73349876E12, 2046.6666666666667], [1.73349894E12, 2078.0], [1.73349846E12, 2065.666666666667], [1.73349864E12, 2047.2], [1.73349882E12, 2041.8], [1.73349852E12, 2069.8], [1.733499E12, 2183.0], [1.7334987E12, 2044.2]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73349888E12, 2.0], [1.73349858E12, 3.0], [1.73349876E12, 2.5], [1.73349894E12, 4.2], [1.73349864E12, 1.4], [1.73349882E12, 5.25], [1.73349852E12, 2.5], [1.733499E12, 170.0], [1.7334987E12, 2.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73349888E12, 1.3333333333333333], [1.7334984E12, 0.8333333333333334], [1.73349858E12, 1.3333333333333333], [1.73349876E12, 1.2857142857142856], [1.73349894E12, 3.0], [1.73349846E12, 1.0], [1.73349864E12, 1.0], [1.73349882E12, 24.5], [1.73349852E12, 1.0], [1.733499E12, 3.0], [1.7334987E12, 1.25]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73349888E12, 6340.666666666667], [1.73349858E12, 4551.333333333334], [1.73349876E12, 5870.0], [1.73349894E12, 5980.0], [1.73349846E12, 3986.5], [1.73349864E12, 5079.666666666667], [1.73349882E12, 5334.2], [1.73349852E12, 4465.2], [1.733499E12, 101290.0], [1.7334987E12, 6022.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73349822E12, 2.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73349888E12, 16679.0], [1.7334984E12, 15023.4], [1.73349858E12, 16495.0], [1.73349876E12, 16583.666666666668], [1.73349894E12, 20233.666666666668], [1.73349846E12, 15371.5], [1.73349864E12, 17792.25], [1.73349882E12, 15095.4], [1.73349852E12, 15838.4], [1.733499E12, 22386.0], [1.7334987E12, 18266.833333333336]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73349888E12, 8.044444444444443], [1.73349858E12, 2.96875], [1.73349876E12, 7.624999999999999], [1.73349894E12, 18.545454545454547], [1.73349846E12, 3.0], [1.73349864E12, 2.999999999999999], [1.73349882E12, 7.636363636363637], [1.73349852E12, 2.5217391304347827], [1.733499E12, 353.45], [1.7334987E12, 2.5789473684210527]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.7334984E12, 2.0833333333333335], [1.73349858E12, 2.416666666666667], [1.73349828E12, 2.333333333333333], [1.73349846E12, 1.6666666666666665], [1.73349864E12, 2.25], [1.73349834E12, 3.083333333333333], [1.73349852E12, 2.3333333333333335], [1.7334987E12, 2.583333333333333], [1.73349822E12, 2.6]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7334984E12, 1.6666666666666667], [1.73349858E12, 2.3333333333333335], [1.73349828E12, 1.6666666666666667], [1.73349846E12, 4.0], [1.73349864E12, 5.166666666666666], [1.73349834E12, 1.8333333333333335], [1.73349852E12, 2.333333333333333], [1.7334987E12, 3.1666666666666665], [1.73349822E12, 3.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73349888E12, 11.294117647058824], [1.73349858E12, 3.0], [1.73349906E12, 209.0], [1.73349876E12, 4.875], [1.73349894E12, 53.0], [1.73349846E12, 2.3333333333333335], [1.73349864E12, 2.875], [1.73349882E12, 10.062499999999998], [1.73349852E12, 2.3000000000000003], [1.733499E12, 173.0], [1.7334987E12, 2.6]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.7334984E12, 2901.5], [1.73349858E12, 2899.5], [1.73349876E12, 2792.0], [1.73349828E12, 2873.5], [1.73349846E12, 2856.8333333333335], [1.73349864E12, 2717.8333333333335], [1.73349834E12, 2898.333333333333], [1.73349852E12, 2866.5], [1.7334987E12, 2809.8333333333335], [1.73349822E12, 2894.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349822E12, 3.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7334984E12, 2059.1666666666665], [1.73349858E12, 2075.0], [1.73349876E12, 2046.5], [1.73349828E12, 2063.5], [1.73349846E12, 2047.6666666666665], [1.73349864E12, 2055.1666666666665], [1.73349834E12, 2061.6666666666665], [1.73349852E12, 2060.3333333333335], [1.7334987E12, 2045.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73349888E12, 2.6666666666666665], [1.7334984E12, 2.0], [1.73349858E12, 2.3333333333333335], [1.73349876E12, 2.4285714285714284], [1.73349894E12, 4.0], [1.73349846E12, 2.0], [1.73349864E12, 2.2], [1.73349882E12, 25.5], [1.73349852E12, 2.25], [1.733499E12, 4.0], [1.7334987E12, 2.5]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.7334984E12, 1.6666666666666667], [1.73349876E12, 2.9], [1.73349846E12, 1.75], [1.73349882E12, 4.874999999999999], [1.73349852E12, 10.461538461538465], [1.73349888E12, 3.5], [1.73349858E12, 2.1764705882352935], [1.73349828E12, 2.5], [1.73349894E12, 24.333333333333332], [1.73349864E12, 1.8571428571428572], [1.73349834E12, 2.1666666666666665], [1.733499E12, 280.0], [1.7334987E12, 2.4999999999999996]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.7334984E12, 2.166666666666667], [1.73349906E12, 173.0], [1.73349876E12, 13.636363636363637], [1.73349846E12, 1.25], [1.73349882E12, 3.5714285714285716], [1.73349852E12, 1.75], [1.73349888E12, 5.5], [1.73349858E12, 2.4444444444444446], [1.73349894E12, 4.8], [1.73349864E12, 2.375], [1.73349834E12, 3.0], [1.733499E12, 351.3333333333333], [1.7334987E12, 2.4444444444444446]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73349888E12, 5.333333333333333], [1.73349858E12, 2.6], [1.73349906E12, 223.0], [1.73349876E12, 3.5], [1.73349894E12, 31.4], [1.73349864E12, 2.0], [1.73349882E12, 2.6666666666666665], [1.73349852E12, 1.0], [1.733499E12, 1402.0], [1.7334987E12, 2.8]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73349888E12, 47898.25], [1.73349858E12, 19212.666666666668], [1.73349876E12, 22219.333333333332], [1.73349894E12, 67745.0], [1.73349864E12, 19825.666666666668], [1.73349882E12, 39581.0], [1.73349852E12, 15829.166666666668], [1.7334987E12, 26971.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.7334984E12, 1698.5], [1.73349858E12, 1956.6666666666667], [1.73349828E12, 1861.3333333333333], [1.73349846E12, 1761.0], [1.73349864E12, 1732.3333333333335], [1.73349834E12, 1750.8333333333333], [1.73349852E12, 1734.1666666666667], [1.7334987E12, 2169.666666666667], [1.73349822E12, 1891.5]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.7334984E12, 0.8333333333333334], [1.73349858E12, 1.2], [1.73349876E12, 2.0], [1.73349828E12, 0.8333333333333334], [1.73349846E12, 0.5], [1.73349864E12, 1.1428571428571428], [1.73349834E12, 0.6666666666666666], [1.73349852E12, 0.8333333333333334], [1.7334987E12, 1.0], [1.73349822E12, 1.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.7334984E12, 5196.5], [1.73349858E12, 9490.333333333334], [1.73349876E12, 8641.0], [1.73349828E12, 5291.833333333334], [1.73349846E12, 6673.5], [1.73349864E12, 9311.166666666668], [1.73349834E12, 4902.166666666667], [1.73349852E12, 7977.2], [1.7334987E12, 11765.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7334984E12, 553.0], [1.73349858E12, 737.6666666666667], [1.73349828E12, 574.1666666666666], [1.73349846E12, 595.3333333333333], [1.73349864E12, 632.5], [1.73349834E12, 582.0], [1.73349852E12, 620.0], [1.7334987E12, 661.8333333333334], [1.73349822E12, 568.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7334984E12, 2879.833333333333], [1.73349858E12, 3324.333333333333], [1.73349828E12, 3319.8333333333335], [1.73349846E12, 2963.8333333333335], [1.73349864E12, 3181.6666666666665], [1.73349834E12, 2907.8333333333335], [1.73349852E12, 3179.0], [1.7334987E12, 3834.3333333333335], [1.73349822E12, 2991.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73349888E12, 2.3333333333333335], [1.7334984E12, 0.8333333333333334], [1.73349858E12, 1.0], [1.73349876E12, 1.1428571428571428], [1.73349894E12, 2.5], [1.73349846E12, 1.0], [1.73349864E12, 1.2], [1.73349882E12, 1.75], [1.73349852E12, 0.5], [1.733499E12, 3.0], [1.7334987E12, 1.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73349888E12, 991.0], [1.7334984E12, 1046.0], [1.73349858E12, 1018.0], [1.73349906E12, 1256.0], [1.73349876E12, 1102.8], [1.73349894E12, 1012.0], [1.73349846E12, 1035.3333333333333], [1.73349864E12, 1053.5], [1.73349882E12, 980.7142857142858], [1.73349852E12, 1012.0], [1.733499E12, 3922.5], [1.7334987E12, 1881.5]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73349888E12, 363.5555555555555], [1.73349858E12, 448.21875], [1.73349876E12, 649.0833333333333], [1.73349894E12, 443.6363636363637], [1.73349846E12, 293.0], [1.73349864E12, 389.42424242424244], [1.73349882E12, 359.6969696969697], [1.73349852E12, 445.2173913043478], [1.733499E12, 825.55], [1.7334987E12, 456.99999999999994]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7334984E12, 2.0], [1.73349858E12, 2.3333333333333335], [1.73349876E12, 2.5], [1.73349828E12, 1.5], [1.73349846E12, 2.166666666666667], [1.73349864E12, 2.5], [1.73349834E12, 2.0], [1.73349852E12, 2.166666666666667], [1.7334987E12, 2.8333333333333335]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73349888E12, 3.6666666666666665], [1.7334984E12, 2.0], [1.73349858E12, 2.3333333333333335], [1.73349906E12, 173.0], [1.73349876E12, 3.4], [1.73349894E12, 36.0], [1.73349846E12, 1.5], [1.73349864E12, 2.75], [1.73349882E12, 4.142857142857143], [1.73349852E12, 3.1666666666666665], [1.733499E12, 623.5], [1.7334987E12, 2.75]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73349822E12, 338.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73349888E12, 2038.0], [1.7334984E12, 2054.2], [1.73349858E12, 2073.0], [1.73349876E12, 2041.0], [1.73349894E12, 2068.3333333333335], [1.73349846E12, 2054.6666666666665], [1.73349864E12, 2046.0], [1.73349882E12, 2041.6], [1.73349852E12, 2065.4], [1.733499E12, 2133.0], [1.7334987E12, 2039.75]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73349888E12, 3.3333333333333335], [1.7334984E12, 1.5], [1.73349858E12, 1.3333333333333333], [1.73349876E12, 2.7142857142857144], [1.73349894E12, 48.0], [1.73349846E12, 2.166666666666667], [1.73349864E12, 1.5], [1.73349882E12, 4.4], [1.73349852E12, 2.6], [1.733499E12, 56.5], [1.7334987E12, 2.5]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73349888E12, 2.75], [1.7334984E12, 2.0], [1.73349858E12, 2.6666666666666665], [1.73349876E12, 5.5], [1.73349894E12, 2.5], [1.73349846E12, 3.0], [1.73349864E12, 2.0], [1.73349882E12, 4.4], [1.73349852E12, 2.0], [1.733499E12, 2252.5], [1.7334987E12, 2.5]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7334984E12, 1.6666666666666667], [1.73349858E12, 1.5], [1.73349876E12, 2.8333333333333335], [1.73349828E12, 2.0], [1.73349846E12, 1.3333333333333333], [1.73349864E12, 2.166666666666667], [1.73349882E12, 4.0], [1.73349834E12, 1.8333333333333333], [1.73349852E12, 1.5], [1.7334987E12, 3.3333333333333335]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7334984E12, 1.8333333333333335], [1.73349858E12, 5.333333333333334], [1.73349828E12, 1.0], [1.73349846E12, 2.666666666666667], [1.73349864E12, 1.3333333333333333], [1.73349834E12, 2.0], [1.73349852E12, 3.666666666666667], [1.7334987E12, 1.8333333333333333], [1.73349822E12, 2.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.7334984E12, 0.8333333333333334], [1.73349858E12, 1.5], [1.73349876E12, 2.0], [1.73349828E12, 1.0], [1.73349846E12, 0.8333333333333334], [1.73349864E12, 1.0], [1.73349834E12, 0.6666666666666667], [1.73349852E12, 0.33333333333333337], [1.7334987E12, 2.5]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73349888E12, 2821.6666666666665], [1.7334984E12, 2903.166666666667], [1.73349858E12, 2764.0], [1.73349876E12, 2798.8571428571427], [1.73349894E12, 2724.0], [1.73349846E12, 2870.6666666666665], [1.73349864E12, 2718.8], [1.73349882E12, 2768.0], [1.73349852E12, 2864.5], [1.733499E12, 2750.0], [1.7334987E12, 2782.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73349888E12, 7.2368421052631575], [1.7334984E12, 1.7083333333333335], [1.73349858E12, 1.8809523809523807], [1.73349876E12, 3.1090909090909093], [1.73349894E12, 3.5], [1.73349846E12, 1.9999999999999998], [1.73349864E12, 2.36734693877551], [1.73349882E12, 3.553571428571429], [1.73349834E12, 2.1333333333333333], [1.73349852E12, 2.142857142857143], [1.7334987E12, 4.907407407407407]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73349888E12, 11016.5], [1.7334984E12, 11177.8], [1.73349858E12, 11140.5], [1.73349876E12, 11013.5], [1.73349894E12, 11039.666666666666], [1.73349846E12, 11127.714285714286], [1.73349864E12, 10901.5], [1.73349882E12, 10944.0], [1.73349852E12, 11139.0], [1.733499E12, 11195.0], [1.7334987E12, 10954.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.7334984E12, 812.8333333333334], [1.73349906E12, 793.6666666666666], [1.73349876E12, 768.0], [1.73349846E12, 647.625], [1.73349882E12, 433.7142857142857], [1.73349852E12, 434.125], [1.73349888E12, 450.50000000000006], [1.73349858E12, 329.55555555555554], [1.73349894E12, 358.5], [1.73349864E12, 447.0], [1.73349834E12, 832.0], [1.733499E12, 857.0], [1.7334987E12, 657.5555555555555]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349822E12, 930.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.7334984E12, 277.3333333333333], [1.73349876E12, 432.7], [1.73349846E12, 302.875], [1.73349882E12, 271.875], [1.73349852E12, 285.00000000000006], [1.73349888E12, 261.62500000000006], [1.73349858E12, 276.1176470588236], [1.73349828E12, 339.25], [1.73349894E12, 293.83333333333337], [1.73349864E12, 272.5], [1.73349834E12, 277.3333333333333], [1.733499E12, 564.3333333333334], [1.7334987E12, 444.28571428571433]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.7334984E12, 11144.333333333332], [1.73349858E12, 11175.666666666666], [1.73349876E12, 10919.5], [1.73349828E12, 11149.5], [1.73349846E12, 11114.5], [1.73349864E12, 10935.833333333334], [1.73349834E12, 11166.5], [1.73349852E12, 11135.166666666666], [1.7334987E12, 11035.8], [1.73349822E12, 11187.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.7334984E12, 604.0], [1.73349858E12, 707.0], [1.73349876E12, 990.0], [1.73349828E12, 621.0], [1.73349846E12, 674.8333333333334], [1.73349864E12, 833.6666666666666], [1.73349834E12, 683.0], [1.73349852E12, 695.5], [1.7334987E12, 1007.6666666666666]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73349888E12, 2.0], [1.7334984E12, 0.8], [1.73349858E12, 1.0], [1.73349876E12, 1.6666666666666667], [1.73349894E12, 2.6666666666666665], [1.73349846E12, 0.8333333333333334], [1.73349864E12, 1.1666666666666665], [1.73349882E12, 1.8], [1.73349852E12, 1.0], [1.733499E12, 90.0], [1.7334987E12, 1.25]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.7334984E12, 0.6666666666666666], [1.73349858E12, 1.0], [1.73349876E12, 1.0], [1.73349828E12, 1.0], [1.73349846E12, 1.0], [1.73349864E12, 1.1666666666666665], [1.73349834E12, 1.0], [1.73349852E12, 1.0], [1.7334987E12, 16.833333333333332], [1.73349822E12, 1.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73349888E12, 3.6], [1.73349858E12, 2.75], [1.73349906E12, 102.0], [1.73349876E12, 2.25], [1.73349894E12, 4.0], [1.73349846E12, 1.8333333333333333], [1.73349864E12, 2.0], [1.73349882E12, 4.166666666666666], [1.73349852E12, 2.1666666666666665], [1.733499E12, 724.3333333333334], [1.7334987E12, 2.8333333333333335]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73349888E12, 4.0], [1.7334984E12, 1.0], [1.73349858E12, 2.0], [1.73349876E12, 1.8333333333333335], [1.73349894E12, 34.0], [1.73349846E12, 1.0], [1.73349864E12, 1.4], [1.73349882E12, 2.4], [1.73349852E12, 0.6], [1.733499E12, 119.0], [1.7334987E12, 1.2]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349906E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349822E12, "maxY": 58792.5, "series": [{"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.7334984E12, 282.125], [1.73349876E12, 714.0], [1.73349846E12, 298.25], [1.73349882E12, 311.0], [1.73349852E12, 292.75], [1.73349888E12, 420.5], [1.73349858E12, 366.6666666666667], [1.73349828E12, 405.6666666666667], [1.73349894E12, 582.0], [1.73349864E12, 447.72727272727275], [1.73349834E12, 313.6666666666667], [1.733499E12, 871.3333333333334], [1.7334987E12, 691.125]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7334984E12, 773.5], [1.73349858E12, 756.3333333333334], [1.73349876E12, 1396.3333333333333], [1.73349828E12, 964.0], [1.73349846E12, 850.3333333333333], [1.73349864E12, 762.0], [1.73349882E12, 809.0], [1.73349834E12, 822.1666666666666], [1.73349852E12, 783.8333333333333], [1.7334987E12, 1193.3333333333333]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.7334984E12, 495.6666666666667], [1.73349858E12, 550.8333333333333], [1.73349828E12, 545.0833333333335], [1.73349846E12, 533.4166666666666], [1.73349864E12, 502.66666666666663], [1.73349834E12, 533.5833333333333], [1.73349852E12, 584.75], [1.7334987E12, 719.4166666666666], [1.73349822E12, 452.4]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349876E12, 0.0], [1.73349846E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73349888E12, 264.0], [1.73349858E12, 286.33333333333337], [1.73349876E12, 554.6666666666666], [1.73349894E12, 245.0], [1.73349846E12, 286.5], [1.73349864E12, 314.3333333333333], [1.73349882E12, 270.6], [1.73349852E12, 283.4], [1.7334987E12, 268.25]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.7334984E12, 404.66666666666663], [1.73349858E12, 405.83333333333337], [1.73349828E12, 439.5], [1.73349846E12, 354.8333333333333], [1.73349864E12, 344.5], [1.73349834E12, 363.83333333333337], [1.73349852E12, 360.1666666666667], [1.7334987E12, 346.3333333333333], [1.73349822E12, 559.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73349888E12, 2048.5], [1.7334984E12, 2064.0], [1.73349858E12, 2046.3333333333333], [1.73349876E12, 2044.5], [1.73349894E12, 2050.0], [1.73349846E12, 2070.0], [1.73349864E12, 2055.4], [1.73349882E12, 2048.6], [1.73349852E12, 2066.75], [1.733499E12, 2037.0], [1.7334987E12, 2039.25]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7334984E12, 2063.1666666666665], [1.73349858E12, 2065.0], [1.73349876E12, 2040.0], [1.73349828E12, 2074.0], [1.73349846E12, 2070.1666666666665], [1.73349864E12, 2049.3333333333335], [1.73349834E12, 2063.166666666667], [1.73349852E12, 2065.0], [1.7334987E12, 2053.6666666666665], [1.73349822E12, 2081.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73349888E12, 307.0], [1.73349858E12, 267.6], [1.73349876E12, 256.0], [1.73349894E12, 299.8], [1.73349864E12, 266.0], [1.73349882E12, 284.5], [1.73349852E12, 246.5], [1.733499E12, 449.3333333333333], [1.7334987E12, 361.25]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73349822E12, 0.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.7334984E12, 0.0], [1.73349876E12, 0.0], [1.73349846E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.73349822E12, 0.0], [1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73349888E12, 36447.666666666664], [1.73349858E12, 9291.2], [1.73349906E12, 58792.5], [1.73349876E12, 17685.0], [1.73349894E12, 34026.4], [1.73349864E12, 16710.5], [1.73349882E12, 21966.0], [1.73349852E12, 19293.0], [1.733499E12, 27337.0], [1.7334987E12, 12527.6]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73349888E12, 418.6315789473685], [1.7334984E12, 293.50000000000006], [1.73349858E12, 418.5], [1.73349876E12, 621.5636363636364], [1.73349894E12, 433.25], [1.73349846E12, 285.0416666666666], [1.73349864E12, 359.46938775510216], [1.73349882E12, 383.19642857142856], [1.73349834E12, 301.46666666666664], [1.73349852E12, 324.5], [1.7334987E12, 596.7037037037037]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73349888E12, 268.25], [1.7334984E12, 271.3333333333333], [1.73349858E12, 290.3333333333333], [1.73349876E12, 358.5], [1.73349894E12, 446.5], [1.73349846E12, 287.83333333333337], [1.73349864E12, 267.25], [1.73349882E12, 281.4], [1.73349852E12, 281.5], [1.733499E12, 391.5], [1.7334987E12, 279.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.7334984E12, 574.0], [1.73349858E12, 691.1666666666667], [1.73349828E12, 607.8333333333333], [1.73349846E12, 585.8333333333334], [1.73349864E12, 755.8333333333333], [1.73349834E12, 555.1666666666667], [1.73349852E12, 691.1666666666667], [1.7334987E12, 803.3333333333334], [1.73349822E12, 554.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73349888E12, 796.0], [1.7334984E12, 614.25], [1.73349858E12, 913.3333333333334], [1.73349876E12, 1070.4285714285713], [1.73349894E12, 1155.0], [1.73349846E12, 627.1666666666666], [1.73349864E12, 1532.0], [1.73349882E12, 673.6], [1.73349852E12, 662.2], [1.733499E12, 1228.0], [1.7334987E12, 1045.25]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73349888E12, 786.4], [1.73349858E12, 842.25], [1.73349906E12, 340.0], [1.73349876E12, 1130.5], [1.73349894E12, 353.5], [1.73349846E12, 809.1666666666666], [1.73349864E12, 359.5], [1.73349882E12, 689.8333333333333], [1.73349852E12, 842.6666666666666], [1.733499E12, 416.0], [1.7334987E12, 579.1666666666666]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73349888E12, 280.6], [1.73349858E12, 284.0], [1.73349906E12, 766.0], [1.73349876E12, 723.0], [1.73349894E12, 267.5], [1.73349846E12, 274.4], [1.73349864E12, 260.3333333333333], [1.73349882E12, 267.6666666666667], [1.73349852E12, 276.0], [1.733499E12, 824.5], [1.7334987E12, 272.75]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.7334984E12, 2062.0], [1.73349858E12, 2061.8], [1.73349876E12, 2052.5], [1.73349828E12, 2062.8333333333335], [1.73349846E12, 2067.0], [1.73349864E12, 2058.857142857143], [1.73349834E12, 2070.1666666666665], [1.73349852E12, 2066.5], [1.7334987E12, 2041.0], [1.73349822E12, 2066.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.7334984E12, 347.0], [1.73349858E12, 374.1666666666667], [1.73349828E12, 597.8333333333333], [1.73349846E12, 351.5], [1.73349864E12, 433.33333333333337], [1.73349834E12, 327.5], [1.73349852E12, 325.5], [1.7334987E12, 570.3333333333333], [1.73349822E12, 303.5]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349822E12, 262.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73349888E12, 377.5882352941176], [1.73349858E12, 294.40000000000003], [1.73349906E12, 296.0], [1.73349876E12, 392.5], [1.73349894E12, 352.125], [1.73349846E12, 274.0], [1.73349864E12, 349.62500000000006], [1.73349882E12, 321.625], [1.73349852E12, 322.09999999999997], [1.733499E12, 868.5], [1.7334987E12, 1033.8]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349822E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7334984E12, 2059.833333333333], [1.73349876E12, 2051.125], [1.73349846E12, 2067.9999999999995], [1.73349882E12, 2037.0], [1.73349852E12, 2070.5], [1.73349822E12, 2078.0], [1.73349888E12, 2052.3333333333335], [1.73349858E12, 2068.6666666666665], [1.73349828E12, 2070.0], [1.73349894E12, 2047.0], [1.73349864E12, 2053.818181818182], [1.73349834E12, 2069.333333333333], [1.733499E12, 2082.0], [1.7334987E12, 2043.8000000000002]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73349888E12, 2038.0], [1.7334984E12, 2066.4], [1.73349858E12, 2068.0], [1.73349876E12, 2044.6666666666667], [1.73349894E12, 2044.0], [1.73349846E12, 2064.666666666667], [1.73349864E12, 2045.8], [1.73349882E12, 2039.2], [1.73349852E12, 2068.8], [1.733499E12, 2063.0], [1.7334987E12, 2042.6]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73349822E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.7334984E12, 2900.5], [1.73349858E12, 2898.1666666666665], [1.73349876E12, 2791.0], [1.73349828E12, 2872.3333333333335], [1.73349846E12, 2855.6666666666665], [1.73349864E12, 2716.666666666667], [1.73349834E12, 2897.1666666666665], [1.73349852E12, 2865.5], [1.7334987E12, 2792.6666666666665], [1.73349822E12, 2893.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349822E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7334984E12, 2058.1666666666665], [1.73349858E12, 2073.5], [1.73349876E12, 2044.5], [1.73349828E12, 2062.1666666666665], [1.73349846E12, 2046.6666666666665], [1.73349864E12, 2053.8333333333335], [1.73349834E12, 2060.8333333333335], [1.73349852E12, 2059.3333333333335], [1.7334987E12, 2042.3333333333333]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349876E12, 0.0], [1.73349846E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349846E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7334984E12, 551.1666666666666], [1.73349858E12, 735.1666666666666], [1.73349828E12, 572.5], [1.73349846E12, 590.8333333333333], [1.73349864E12, 627.1666666666667], [1.73349834E12, 580.0], [1.73349852E12, 617.6666666666666], [1.7334987E12, 658.6666666666667], [1.73349822E12, 565.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73349888E12, 355.15555555555557], [1.73349858E12, 444.12500000000006], [1.73349876E12, 641.2916666666669], [1.73349894E12, 424.45454545454544], [1.73349846E12, 290.0], [1.73349864E12, 384.8484848484849], [1.73349882E12, 351.030303030303], [1.73349852E12, 442.52173913043475], [1.733499E12, 470.65000000000003], [1.7334987E12, 452.7894736842105]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73349822E12, 335.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73349888E12, 2036.0], [1.7334984E12, 2053.0], [1.73349858E12, 2071.5], [1.73349876E12, 2039.0], [1.73349894E12, 2065.6666666666665], [1.73349846E12, 2053.6666666666665], [1.73349864E12, 2044.5], [1.73349882E12, 2039.8], [1.73349852E12, 2064.4], [1.733499E12, 2043.0], [1.7334987E12, 2038.5]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73349888E12, 2819.0], [1.7334984E12, 2902.166666666667], [1.73349858E12, 2762.6666666666665], [1.73349876E12, 2797.285714285714], [1.73349894E12, 2721.5], [1.73349846E12, 2869.5], [1.73349864E12, 2717.4], [1.73349882E12, 2766.25], [1.73349852E12, 2863.5], [1.733499E12, 2746.0], [1.7334987E12, 2780.75]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.7334984E12, 810.6666666666666], [1.73349906E12, 619.6666666666666], [1.73349876E12, 754.1818181818182], [1.73349846E12, 646.25], [1.73349882E12, 429.8571428571429], [1.73349852E12, 432.25], [1.73349888E12, 444.75], [1.73349858E12, 326.8888888888889], [1.73349894E12, 353.6], [1.73349864E12, 444.375], [1.73349834E12, 829.0], [1.733499E12, 504.6666666666667], [1.7334987E12, 655.1111111111111]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349822E12, 928.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.7334984E12, 275.6666666666667], [1.73349876E12, 429.8], [1.73349846E12, 301.00000000000006], [1.73349882E12, 266.875], [1.73349852E12, 274.46153846153845], [1.73349888E12, 258.0], [1.73349858E12, 273.70588235294116], [1.73349828E12, 336.75], [1.73349894E12, 269.1666666666667], [1.73349864E12, 270.4285714285714], [1.73349834E12, 274.5], [1.733499E12, 284.0], [1.7334987E12, 441.7857142857142]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.7334984E12, 602.3333333333333], [1.73349858E12, 704.1666666666667], [1.73349876E12, 983.0], [1.73349828E12, 618.6], [1.73349846E12, 672.1666666666667], [1.73349864E12, 830.1666666666666], [1.73349834E12, 680.5], [1.73349852E12, 693.0], [1.7334987E12, 1006.0000000000001]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349906E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349822E12, "maxY": 28738.333333333332, "series": [{"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7334984E12, 1007.3333333333334], [1.73349858E12, 978.3333333333333], [1.73349876E12, 1452.8333333333335], [1.73349828E12, 1196.5], [1.73349846E12, 1026.8333333333333], [1.73349864E12, 1209.8333333333333], [1.73349834E12, 965.3333333333334], [1.73349852E12, 1048.6666666666667], [1.7334987E12, 1571.3333333333335]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349876E12, 0.0], [1.73349846E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.73349888E12, 132.75], [1.73349858E12, 58.55555555555556], [1.73349828E12, 0.0], [1.73349894E12, 252.0], [1.73349864E12, 46.72727272727272], [1.73349834E12, 0.0], [1.733499E12, 543.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7334984E12, 520.0], [1.73349858E12, 491.33333333333337], [1.73349876E12, 1101.1666666666667], [1.73349828E12, 730.0], [1.73349846E12, 598.6666666666666], [1.73349864E12, 497.0], [1.73349882E12, 563.0], [1.73349834E12, 556.1666666666666], [1.73349852E12, 532.0], [1.7334987E12, 880.8333333333334]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.7334984E12, 244.50000000000003], [1.73349858E12, 253.83333333333337], [1.73349828E12, 286.75], [1.73349846E12, 273.1666666666667], [1.73349864E12, 250.49999999999997], [1.73349834E12, 262.25], [1.73349852E12, 242.16666666666669], [1.7334987E12, 428.0], [1.73349822E12, 204.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349876E12, 0.0], [1.73349846E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73349888E12, 2024.0], [1.7334984E12, 2043.6666666666667], [1.73349858E12, 2027.0], [1.73349876E12, 2022.8333333333335], [1.73349894E12, 2027.6666666666667], [1.73349846E12, 2049.0], [1.73349864E12, 2034.8], [1.73349882E12, 2027.8], [1.73349852E12, 2045.0], [1.733499E12, 2014.0], [1.7334987E12, 2018.25]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7334984E12, 2042.5], [1.73349858E12, 2042.8333333333333], [1.73349876E12, 2023.0], [1.73349828E12, 2050.0], [1.73349846E12, 2048.5], [1.73349864E12, 2029.6666666666667], [1.73349834E12, 2040.0], [1.73349852E12, 2048.166666666667], [1.7334987E12, 2031.3333333333335], [1.73349822E12, 2059.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 151.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73349822E12, 621.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.7334984E12, 0.0], [1.73349876E12, 0.0], [1.73349846E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.73349822E12, 0.0], [1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73349888E12, 986.3333333333333], [1.73349858E12, 1019.3333333333334], [1.73349876E12, 1094.0], [1.73349894E12, 988.5], [1.73349846E12, 983.5], [1.73349864E12, 1033.3333333333333], [1.73349882E12, 987.2], [1.73349852E12, 951.8], [1.7334987E12, 1017.25]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73349888E12, 112.3157894736842], [1.7334984E12, 0.0], [1.73349858E12, 81.0], [1.73349876E12, 94.94545454545455], [1.73349894E12, 120.75], [1.73349846E12, 0.0], [1.73349864E12, 63.326530612244895], [1.73349882E12, 98.44642857142856], [1.73349834E12, 0.0], [1.73349852E12, 51.60714285714286], [1.7334987E12, 178.62962962962965]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 86.33333333333333], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 517.0], [1.73349846E12, 0.0], [1.73349864E12, 479.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 497.0], [1.7334987E12, 129.25]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73349888E12, 509.8], [1.73349858E12, 525.75], [1.73349906E12, 0.0], [1.73349876E12, 780.0], [1.73349894E12, 0.0], [1.73349846E12, 509.8333333333333], [1.73349864E12, 0.0], [1.73349882E12, 425.5], [1.73349852E12, 519.6666666666666], [1.733499E12, 0.0], [1.7334987E12, 142.16666666666666]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 384.5], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 514.5], [1.7334987E12, 0.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.7334984E12, 2039.8333333333333], [1.73349858E12, 2040.0], [1.73349876E12, 2034.5], [1.73349828E12, 2040.6666666666665], [1.73349846E12, 2047.1666666666665], [1.73349864E12, 2038.857142857143], [1.73349834E12, 2047.3333333333333], [1.73349852E12, 2044.5], [1.7334987E12, 2018.8], [1.73349822E12, 2048.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.7334984E12, 24634.8], [1.73349858E12, 25748.0], [1.73349876E12, 28738.333333333332], [1.73349828E12, 24722.5], [1.73349846E12, 25441.0], [1.73349864E12, 25772.5], [1.73349834E12, 24594.285714285714], [1.73349852E12, 26122.833333333332], [1.7334987E12, 26371.5]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73349822E12, 0.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.7334984E12, 1.0], [1.73349858E12, 1.1666666666666665], [1.73349876E12, 2.0], [1.73349828E12, 1.0], [1.73349846E12, 0.8333333333333334], [1.73349864E12, 1.1666666666666667], [1.73349834E12, 1.0], [1.73349852E12, 1.1666666666666665], [1.7334987E12, 1.0], [1.73349822E12, 1.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73349888E12, 56.76470588235295], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 81.75000000000001], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 34.06249999999999], [1.73349852E12, 0.0], [1.733499E12, 608.0], [1.7334987E12, 523.3]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73349888E12, 2060.0], [1.7334984E12, 1513.6], [1.73349858E12, 2130.6666666666665], [1.73349876E12, 2059.3333333333335], [1.73349894E12, 2332.0], [1.73349846E12, 1551.8333333333335], [1.73349864E12, 2504.5], [1.73349882E12, 1483.4], [1.73349852E12, 1545.0], [1.733499E12, 5541.0], [1.7334987E12, 2746.5]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73349822E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.7334984E12, 12289.5], [1.73349858E12, 13602.5], [1.73349876E12, 12919.0], [1.73349828E12, 12436.666666666668], [1.73349846E12, 12469.666666666668], [1.73349864E12, 12942.4], [1.73349834E12, 12249.5], [1.73349852E12, 12886.0], [1.7334987E12, 14320.42857142857]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7334984E12, 2038.1666666666665], [1.73349876E12, 2023.8750000000002], [1.73349846E12, 2043.2499999999998], [1.73349882E12, 2018.0], [1.73349852E12, 2047.0], [1.73349822E12, 2051.0], [1.73349888E12, 2025.3333333333333], [1.73349858E12, 2040.5555555555554], [1.73349828E12, 2046.8333333333335], [1.73349894E12, 2023.0], [1.73349864E12, 2031.6363636363635], [1.73349834E12, 2046.6666666666665], [1.733499E12, 2063.0], [1.7334987E12, 2021.8999999999999]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73349888E12, 2017.5], [1.7334984E12, 2044.6], [1.73349858E12, 2043.5], [1.73349876E12, 2025.8333333333335], [1.73349894E12, 2023.3333333333333], [1.73349846E12, 2042.6666666666667], [1.73349864E12, 2027.8], [1.73349882E12, 2019.2], [1.73349852E12, 2049.2], [1.733499E12, 2039.0], [1.7334987E12, 2023.2]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73349888E12, 1743.6666666666667], [1.73349858E12, 1603.3333333333333], [1.73349876E12, 1888.5], [1.73349894E12, 1467.0], [1.73349846E12, 1482.5], [1.73349864E12, 1536.3333333333333], [1.73349882E12, 1741.6], [1.73349852E12, 1540.0], [1.733499E12, 0.0], [1.7334987E12, 1654.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73349822E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73349888E12, 12158.0], [1.7334984E12, 11718.0], [1.73349858E12, 12377.5], [1.73349876E12, 12185.166666666668], [1.73349894E12, 14454.0], [1.73349846E12, 11763.5], [1.73349864E12, 12645.75], [1.73349882E12, 11591.0], [1.73349852E12, 11863.2], [1.733499E12, 13013.0], [1.7334987E12, 12874.166666666666]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.7334984E12, 2044.0], [1.73349858E12, 2039.3333333333333], [1.73349876E12, 2016.0], [1.73349828E12, 2051.5], [1.73349846E12, 2041.8333333333333], [1.73349864E12, 2031.1666666666665], [1.73349834E12, 2040.6666666666667], [1.73349852E12, 2044.3333333333335], [1.7334987E12, 2025.5], [1.73349822E12, 2038.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73349822E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7334984E12, 2033.0], [1.73349858E12, 2036.1666666666667], [1.73349876E12, 2023.5], [1.73349828E12, 2040.5], [1.73349846E12, 2025.8333333333333], [1.73349864E12, 2032.5], [1.73349834E12, 2036.5], [1.73349852E12, 2038.8333333333333], [1.7334987E12, 2023.1666666666665]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73349888E12, 1.0], [1.7334984E12, 1.0], [1.73349858E12, 1.0], [1.73349876E12, 1.1428571428571428], [1.73349894E12, 1.0], [1.73349846E12, 1.0], [1.73349864E12, 1.0], [1.73349882E12, 1.0], [1.73349852E12, 1.25], [1.733499E12, 1.0], [1.7334987E12, 1.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349876E12, 0.0], [1.73349846E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349846E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73349888E12, 1784.5], [1.73349858E12, 1626.3333333333335], [1.73349876E12, 1724.0], [1.73349894E12, 2218.0], [1.73349864E12, 1529.0], [1.73349882E12, 1733.25], [1.73349852E12, 1509.3333333333335], [1.7334987E12, 1654.3333333333333]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.7334984E12, 489.0], [1.73349858E12, 507.6666666666667], [1.73349828E12, 573.5], [1.73349846E12, 546.3333333333333], [1.73349864E12, 501.0], [1.73349834E12, 524.5], [1.73349852E12, 484.3333333333333], [1.7334987E12, 856.0], [1.73349822E12, 510.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.7334984E12, 2093.1666666666665], [1.73349858E12, 3249.5], [1.73349876E12, 2854.6666666666665], [1.73349828E12, 2202.5], [1.73349846E12, 2266.5], [1.73349864E12, 2856.166666666667], [1.73349834E12, 2039.0], [1.73349852E12, 2712.4], [1.7334987E12, 4390.666666666666]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7334984E12, 489.0], [1.73349858E12, 507.6666666666667], [1.73349828E12, 573.5], [1.73349846E12, 546.3333333333333], [1.73349864E12, 501.0], [1.73349834E12, 524.5], [1.73349852E12, 484.3333333333333], [1.7334987E12, 856.0], [1.73349822E12, 510.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73349888E12, 987.3333333333334], [1.7334984E12, 1044.0], [1.73349858E12, 1015.6666666666666], [1.73349906E12, 1082.0], [1.73349876E12, 1099.0], [1.73349894E12, 976.0], [1.73349846E12, 1033.6666666666665], [1.73349864E12, 1050.75], [1.73349882E12, 976.2857142857143], [1.73349852E12, 1008.6666666666666], [1.733499E12, 3297.5], [1.7334987E12, 1878.75]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73349888E12, 71.48888888888888], [1.73349858E12, 97.78125], [1.73349876E12, 153.83333333333334], [1.73349894E12, 95.09090909090908], [1.73349846E12, 0.0], [1.73349864E12, 77.09090909090911], [1.73349882E12, 61.45454545454545], [1.73349852E12, 121.43478260869567], [1.733499E12, 115.55000000000001], [1.7334987E12, 25.57894736842105]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73349822E12, 0.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73349888E12, 2013.5], [1.7334984E12, 2034.2], [1.73349858E12, 2045.5], [1.73349876E12, 2018.0], [1.73349894E12, 2047.3333333333333], [1.73349846E12, 2035.3333333333333], [1.73349864E12, 2025.6666666666665], [1.73349882E12, 2019.6], [1.73349852E12, 2046.4], [1.733499E12, 2020.0], [1.7334987E12, 2018.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73349888E12, 2019.6666666666667], [1.7334984E12, 2037.5], [1.73349858E12, 2044.3333333333333], [1.73349876E12, 2030.2857142857142], [1.73349894E12, 2033.0], [1.73349846E12, 2039.0], [1.73349864E12, 2029.2], [1.73349882E12, 2023.5], [1.73349852E12, 2032.5], [1.733499E12, 2031.0], [1.7334987E12, 2023.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73349888E12, 10098.0], [1.7334984E12, 10204.4], [1.73349858E12, 10206.0], [1.73349876E12, 10125.833333333334], [1.73349894E12, 10153.666666666666], [1.73349846E12, 10212.142857142859], [1.73349864E12, 10151.0], [1.73349882E12, 10107.6], [1.73349852E12, 10218.0], [1.733499E12, 10168.0], [1.7334987E12, 10106.25]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.7334984E12, 565.0], [1.73349906E12, 342.33333333333337], [1.73349876E12, 251.72727272727272], [1.73349846E12, 392.75000000000006], [1.73349882E12, 143.85714285714286], [1.73349852E12, 149.625], [1.73349888E12, 123.33333333333331], [1.73349858E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 124.0], [1.73349834E12, 507.0], [1.733499E12, 176.0], [1.7334987E12, 165.55555555555557]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73349822E12, 621.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349876E12, 0.0], [1.73349846E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349894E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.7334984E12, 10192.666666666666], [1.73349858E12, 10203.166666666666], [1.73349876E12, 10125.5], [1.73349828E12, 10231.166666666668], [1.73349846E12, 10206.666666666666], [1.73349864E12, 10158.833333333332], [1.73349834E12, 10211.333333333332], [1.73349852E12, 10225.833333333332], [1.7334987E12, 10123.8], [1.73349822E12, 10237.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349828E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349834E12, 0.0], [1.73349852E12, 0.0], [1.7334987E12, 0.0], [1.73349822E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.73349858E12, 0.0], [1.73349906E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73349888E12, 0.0], [1.7334984E12, 0.0], [1.73349858E12, 0.0], [1.73349876E12, 0.0], [1.73349894E12, 0.0], [1.73349846E12, 0.0], [1.73349864E12, 0.0], [1.73349882E12, 0.0], [1.73349852E12, 0.0], [1.733499E12, 0.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349906E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73349822E12, "maxY": 64932.0, "series": [{"data": [[1.7334984E12, 3031.0], [1.73349906E12, 64932.0], [1.73349876E12, 25979.0], [1.73349846E12, 3017.0], [1.73349882E12, 31030.0], [1.73349852E12, 19514.0], [1.73349822E12, 2894.0], [1.73349888E12, 51233.0], [1.73349858E12, 10478.0], [1.73349828E12, 2987.0], [1.73349894E12, 47858.0], [1.73349864E12, 22199.0], [1.73349834E12, 2921.0], [1.733499E12, 28887.0], [1.7334987E12, 20891.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7334984E12, 2064.7], [1.73349906E12, 27491.5], [1.73349876E12, 2038.3], [1.73349846E12, 2062.0], [1.73349882E12, 883.1999999999995], [1.73349852E12, 2051.5], [1.73349822E12, 1725.9000000000033], [1.73349888E12, 810.0999999999999], [1.73349858E12, 1075.7000000000005], [1.73349828E12, 2071.5], [1.73349894E12, 978.5], [1.73349864E12, 2038.0], [1.73349834E12, 2061.3], [1.733499E12, 2133.0], [1.7334987E12, 2039.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7334984E12, 2930.5199999999995], [1.73349906E12, 64932.0], [1.73349876E12, 2988.0799999999995], [1.73349846E12, 2910.19], [1.73349882E12, 2835.2599999999984], [1.73349852E12, 2883.7], [1.73349822E12, 2894.0], [1.73349888E12, 5162.489999999853], [1.73349858E12, 7056.920000000102], [1.73349828E12, 2956.25], [1.73349894E12, 45768.850000000006], [1.73349864E12, 2890.2500000000036], [1.73349834E12, 2902.15], [1.733499E12, 26672.100000000126], [1.7334987E12, 7348.699999999916]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7334984E12, 2073.35], [1.73349906E12, 62080.25], [1.73349876E12, 2074.6], [1.73349846E12, 2075.0], [1.73349882E12, 2041.0], [1.73349852E12, 2072.0], [1.73349822E12, 2082.4], [1.73349888E12, 1028.799999999999], [1.73349858E12, 2068.95], [1.73349828E12, 2080.25], [1.73349894E12, 2060.75], [1.73349864E12, 2064.0], [1.73349834E12, 2074.3], [1.733499E12, 2875.5], [1.7334987E12, 2058.25]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.7334984E12, 0.0], [1.73349906E12, 90.0], [1.73349876E12, 1.0], [1.73349846E12, 0.0], [1.73349882E12, 1.0], [1.73349852E12, 0.0], [1.73349822E12, 0.0], [1.73349888E12, 1.0], [1.73349858E12, 0.0], [1.73349828E12, 0.0], [1.73349894E12, 1.0], [1.73349864E12, 1.0], [1.73349834E12, 0.0], [1.733499E12, 3.0], [1.7334987E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7334984E12, 3.0], [1.73349906E12, 399.5], [1.73349876E12, 6.5], [1.73349846E12, 3.0], [1.73349882E12, 93.5], [1.73349852E12, 3.0], [1.73349822E12, 3.0], [1.73349888E12, 94.5], [1.73349858E12, 5.0], [1.73349828E12, 3.0], [1.73349894E12, 116.5], [1.73349864E12, 5.0], [1.73349834E12, 3.0], [1.733499E12, 335.0], [1.7334987E12, 5.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349906E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 4.0, "minX": 2.0, "maxY": 51924.0, "series": [{"data": [[2.0, 271.5], [8.0, 8.5], [10.0, 6.0], [12.0, 5.0], [3.0, 423.0], [14.0, 8.0], [4.0, 171.0], [16.0, 4.0], [18.0, 5.5], [20.0, 128.0], [22.0, 183.0], [6.0, 104.0], [24.0, 126.0], [30.0, 128.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[3.0, 51924.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 30.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 1067.5, "series": [{"data": [[2.0, 0.0], [8.0, 0.0], [10.0, 0.0], [12.0, 0.0], [3.0, 0.0], [14.0, 0.0], [4.0, 0.0], [16.0, 0.0], [18.0, 0.0], [20.0, 0.0], [22.0, 0.0], [6.0, 0.0], [24.0, 0.0], [30.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[3.0, 1067.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 30.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.36666666666666664, "minX": 1.73349822E12, "maxY": 9.266666666666667, "series": [{"data": [[1.7334984E12, 5.883333333333334], [1.73349906E12, 0.36666666666666664], [1.73349876E12, 7.266666666666667], [1.73349846E12, 7.166666666666667], [1.73349882E12, 6.666666666666667], [1.73349852E12, 8.383333333333333], [1.73349822E12, 0.7333333333333333], [1.73349888E12, 5.866666666666666], [1.73349858E12, 8.766666666666667], [1.73349828E12, 2.9], [1.73349894E12, 4.083333333333333], [1.73349864E12, 9.266666666666667], [1.73349834E12, 3.95], [1.733499E12, 1.8166666666666667], [1.7334987E12, 8.9]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349906E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73349822E12, "maxY": 7.566666666666666, "series": [{"data": [[1.7334984E12, 4.5], [1.73349906E12, 0.35], [1.73349876E12, 6.133333333333334], [1.73349846E12, 5.483333333333333], [1.73349882E12, 5.866666666666666], [1.73349852E12, 6.616666666666666], [1.73349822E12, 0.48333333333333334], [1.73349888E12, 5.2], [1.73349858E12, 7.066666666666666], [1.73349828E12, 2.0833333333333335], [1.73349894E12, 3.6666666666666665], [1.73349864E12, 7.566666666666666], [1.73349834E12, 2.933333333333333], [1.733499E12, 1.65], [1.7334987E12, 7.233333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.7334984E12, 0.31666666666666665], [1.73349906E12, 0.016666666666666666], [1.73349876E12, 0.36666666666666664], [1.73349846E12, 0.43333333333333335], [1.73349882E12, 0.26666666666666666], [1.73349852E12, 0.45], [1.73349822E12, 0.016666666666666666], [1.73349888E12, 0.2], [1.73349858E12, 0.4], [1.73349828E12, 0.13333333333333333], [1.73349894E12, 0.11666666666666667], [1.73349864E12, 0.4], [1.73349834E12, 0.2], [1.733499E12, 0.05], [1.7334987E12, 0.4]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.7334984E12, 0.75], [1.73349876E12, 0.4], [1.73349846E12, 0.8333333333333334], [1.73349882E12, 0.2833333333333333], [1.73349852E12, 0.8833333333333333], [1.73349822E12, 0.18333333333333332], [1.73349888E12, 0.25], [1.73349858E12, 0.8833333333333333], [1.73349828E12, 0.5666666666666667], [1.73349894E12, 0.16666666666666666], [1.73349864E12, 0.8833333333333333], [1.73349834E12, 0.6], [1.733499E12, 0.1], [1.7334987E12, 0.8666666666666667]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.7334984E12, 0.3], [1.73349906E12, 0.03333333333333333], [1.73349876E12, 0.36666666666666664], [1.73349846E12, 0.4166666666666667], [1.73349882E12, 0.2833333333333333], [1.73349852E12, 0.45], [1.73349822E12, 0.016666666666666666], [1.73349888E12, 0.21666666666666667], [1.73349858E12, 0.4166666666666667], [1.73349828E12, 0.11666666666666667], [1.73349894E12, 0.11666666666666667], [1.73349864E12, 0.38333333333333336], [1.73349834E12, 0.2], [1.733499E12, 0.05], [1.7334987E12, 0.4]], "isOverall": false, "label": "202", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73349906E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73349822E12, "maxY": 0.9333333333333333, "series": [{"data": [[1.73349888E12, 0.03333333333333333], [1.7334984E12, 0.08333333333333333], [1.73349858E12, 0.05], [1.73349876E12, 0.1], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.06666666666666667], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.1]], "isOverall": false, "label": "Link user-success", "isController": true}, {"data": [[1.73349888E12, 0.03333333333333333], [1.7334984E12, 0.08333333333333333], [1.73349858E12, 0.03333333333333333], [1.73349876E12, 0.1], [1.73349894E12, 0.05], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Get user key gen result-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "Accept sr-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "Accept sr-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "Invite and accept user-success", "isController": true}, {"data": [[1.7334984E12, 0.2], [1.73349858E12, 0.2], [1.73349828E12, 0.2], [1.73349846E12, 0.2], [1.73349864E12, 0.2], [1.73349834E12, 0.2], [1.73349852E12, 0.2], [1.7334987E12, 0.2], [1.73349822E12, 0.08333333333333333]], "isOverall": false, "label": "Get Admin Access Token-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.08333333333333333], [1.73349876E12, 0.03333333333333333], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.11666666666666667], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.08333333333333333], [1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Get key gen result-success", "isController": false}, {"data": [[1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Tenant creation flow-success", "isController": true}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.016666666666666666], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Login by SR OS-0-success", "isController": false}, {"data": [[1.7334984E12, 0.2], [1.73349876E12, 0.13333333333333333], [1.73349846E12, 0.2], [1.73349882E12, 0.06666666666666667], [1.73349852E12, 0.16666666666666666], [1.73349822E12, 0.016666666666666666], [1.73349888E12, 0.05], [1.73349858E12, 0.15], [1.73349828E12, 0.1], [1.73349894E12, 0.03333333333333333], [1.73349864E12, 0.18333333333333332], [1.73349834E12, 0.1], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.16666666666666666]], "isOverall": false, "label": "Get Access Token-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "Accept user-success", "isController": false}, {"data": [[1.73349888E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.05], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.03333333333333333], [1.73349864E12, 0.05], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for policy import-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.05], [1.73349828E12, 0.08333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.73349888E12, 0.05], [1.7334984E12, 0.1], [1.73349858E12, 0.05], [1.73349876E12, 0.11666666666666667], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.08333333333333333], [1.73349882E12, 0.06666666666666667], [1.73349852E12, 0.06666666666666667], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for user key gen-success", "isController": false}, {"data": [[1.73349888E12, 0.06666666666666667], [1.7334984E12, 0.05], [1.73349858E12, 0.05], [1.73349876E12, 0.1], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.1], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Get User Access Token-0-success", "isController": false}, {"data": [[1.73349888E12, 0.75], [1.73349858E12, 0.5333333333333333], [1.73349876E12, 0.4], [1.73349894E12, 0.7333333333333333], [1.73349846E12, 0.016666666666666666], [1.73349864E12, 0.55], [1.73349882E12, 0.55], [1.73349852E12, 0.38333333333333336], [1.733499E12, 0.31666666666666665], [1.7334987E12, 0.31666666666666665]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "Invite user-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.03333333333333333], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1]], "isOverall": false, "label": "Get sr keys-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.05], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.08333333333333333], [1.7334987E12, 0.1]], "isOverall": false, "label": "Link SR-success", "isController": true}, {"data": [[1.73349888E12, 0.05], [1.7334984E12, 0.1], [1.73349858E12, 0.05], [1.73349876E12, 0.11666666666666667], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.08333333333333333], [1.73349882E12, 0.06666666666666667], [1.73349852E12, 0.06666666666666667], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for user key gen-0-success", "isController": false}, {"data": [[1.73349888E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.05], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.03333333333333333], [1.73349864E12, 0.05], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-success", "isController": false}, {"data": [[1.73349888E12, 0.2833333333333333], [1.73349858E12, 0.16666666666666666], [1.73349906E12, 0.05], [1.73349876E12, 0.13333333333333333], [1.73349894E12, 0.13333333333333333], [1.73349846E12, 0.05], [1.73349864E12, 0.13333333333333333], [1.73349882E12, 0.26666666666666666], [1.73349852E12, 0.16666666666666666], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.16666666666666666]], "isOverall": false, "label": "Get user link result-0-success", "isController": false}, {"data": [[1.73349888E12, 0.06666666666666667], [1.7334984E12, 0.05], [1.73349858E12, 0.05], [1.73349876E12, 0.1], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.1], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Get User Access Token-success", "isController": false}, {"data": [[1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-success", "isController": false}, {"data": [[1.73349888E12, 0.05], [1.7334984E12, 0.06666666666666667], [1.73349858E12, 0.05], [1.73349876E12, 0.11666666666666667], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.73349888E12, 0.08333333333333333], [1.73349858E12, 0.06666666666666667], [1.73349906E12, 0.03333333333333333], [1.73349876E12, 0.1], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.08333333333333333], [1.73349864E12, 0.05], [1.73349882E12, 0.1], [1.73349852E12, 0.1], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Link user profile-0-success", "isController": false}, {"data": [[1.73349888E12, 0.06666666666666667], [1.73349858E12, 0.1], [1.73349876E12, 0.05], [1.73349894E12, 0.03333333333333333], [1.73349864E12, 0.05], [1.73349882E12, 0.06666666666666667], [1.73349852E12, 0.1], [1.7334987E12, 0.05]], "isOverall": false, "label": "Policy import and dry run-success", "isController": true}, {"data": [[1.7334984E12, 0.2], [1.73349858E12, 0.2], [1.73349828E12, 0.2], [1.73349846E12, 0.2], [1.73349864E12, 0.2], [1.73349834E12, 0.2], [1.73349852E12, 0.2], [1.7334987E12, 0.2], [1.73349822E12, 0.08333333333333333]], "isOverall": false, "label": "Get Admin Access Token-0-success", "isController": false}, {"data": [[1.7334984E12, 0.13333333333333333], [1.73349876E12, 0.16666666666666666], [1.73349846E12, 0.2], [1.73349882E12, 0.11666666666666667], [1.73349852E12, 0.2], [1.73349888E12, 0.06666666666666667], [1.73349858E12, 0.15], [1.73349828E12, 0.05], [1.73349894E12, 0.03333333333333333], [1.73349864E12, 0.18333333333333332], [1.73349834E12, 0.1], [1.733499E12, 0.05], [1.7334987E12, 0.13333333333333333]], "isOverall": false, "label": "Agree terms-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "User creation(admin side)-success", "isController": true}, {"data": [[1.7334984E12, 0.2], [1.73349876E12, 0.13333333333333333], [1.73349846E12, 0.2], [1.73349882E12, 0.06666666666666667], [1.73349852E12, 0.16666666666666666], [1.73349822E12, 0.016666666666666666], [1.73349888E12, 0.05], [1.73349858E12, 0.15], [1.73349828E12, 0.1], [1.73349894E12, 0.03333333333333333], [1.73349864E12, 0.18333333333333332], [1.73349834E12, 0.1], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.16666666666666666]], "isOverall": false, "label": "Get Access Token-success", "isController": false}, {"data": [[1.73349888E12, 0.03333333333333333], [1.7334984E12, 0.08333333333333333], [1.73349858E12, 0.03333333333333333], [1.73349876E12, 0.1], [1.73349894E12, 0.05], [1.73349846E12, 0.1], [1.73349864E12, 0.08333333333333333], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.08333333333333333]], "isOverall": false, "label": "Get user keys-0-success", "isController": false}, {"data": [[1.73349888E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.05], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.03333333333333333], [1.73349864E12, 0.05], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.73349888E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.06666666666666667], [1.73349894E12, 0.016666666666666666], [1.73349846E12, 0.03333333333333333], [1.73349864E12, 0.05], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.7334987E12, 0.05]], "isOverall": false, "label": "Requests for Import-success", "isController": true}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "Invite and accept SR-success", "isController": true}, {"data": [[1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-0-success", "isController": false}, {"data": [[1.73349888E12, 0.2833333333333333], [1.73349858E12, 0.16666666666666666], [1.73349906E12, 0.05], [1.73349876E12, 0.13333333333333333], [1.73349894E12, 0.13333333333333333], [1.73349846E12, 0.05], [1.73349864E12, 0.13333333333333333], [1.73349882E12, 0.26666666666666666], [1.73349852E12, 0.16666666666666666], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.16666666666666666]], "isOverall": false, "label": "Get user link result-success", "isController": false}, {"data": [[1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.1], [1.73349828E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1]], "isOverall": false, "label": "WS open for sr link-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.016666666666666666], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Login by SR OS-success", "isController": false}, {"data": [[1.73349888E12, 0.03333333333333333], [1.7334984E12, 0.08333333333333333], [1.73349858E12, 0.03333333333333333], [1.73349876E12, 0.1], [1.73349894E12, 0.05], [1.73349846E12, 0.1], [1.73349864E12, 0.08333333333333333], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.08333333333333333]], "isOverall": false, "label": "Get user keys-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.03333333333333333], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.08333333333333333], [1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Generate sr hedera data-success", "isController": true}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.08333333333333333], [1.73349876E12, 0.03333333333333333], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.11666666666666667], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.08333333333333333], [1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Get key gen result-0-success", "isController": false}, {"data": [[1.73349888E12, 0.03333333333333333], [1.7334984E12, 0.08333333333333333], [1.73349858E12, 0.03333333333333333], [1.73349876E12, 0.1], [1.73349894E12, 0.05], [1.73349846E12, 0.1], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.1]], "isOverall": false, "label": "User creation(user side)-success", "isController": true}, {"data": [[1.73349888E12, 0.03333333333333333], [1.73349858E12, 0.08333333333333333], [1.73349876E12, 0.03333333333333333], [1.73349894E12, 0.08333333333333333], [1.73349864E12, 0.08333333333333333], [1.73349882E12, 0.06666666666666667], [1.73349852E12, 0.03333333333333333], [1.733499E12, 0.1], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.73349888E12, 0.05], [1.73349858E12, 0.08333333333333333], [1.73349906E12, 0.03333333333333333], [1.73349876E12, 0.03333333333333333], [1.73349894E12, 0.08333333333333333], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.05], [1.73349852E12, 0.016666666666666666], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.08333333333333333]], "isOverall": false, "label": "Requests for DryRun-success", "isController": true}, {"data": [[1.733499E12, 0.016666666666666666]], "isOverall": false, "label": "Requests for Import-failure", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "Accept user-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349906E12, 0.05], [1.73349876E12, 0.18333333333333332], [1.73349846E12, 0.13333333333333333], [1.73349882E12, 0.11666666666666667], [1.73349852E12, 0.13333333333333333], [1.73349888E12, 0.2], [1.73349858E12, 0.15], [1.73349894E12, 0.16666666666666666], [1.73349864E12, 0.13333333333333333], [1.73349834E12, 0.016666666666666666], [1.733499E12, 0.05], [1.7334987E12, 0.15]], "isOverall": false, "label": "Verify link-success", "isController": false}, {"data": [[1.7334984E12, 0.13333333333333333], [1.73349876E12, 0.16666666666666666], [1.73349846E12, 0.2], [1.73349882E12, 0.11666666666666667], [1.73349852E12, 0.2], [1.73349888E12, 0.06666666666666667], [1.73349858E12, 0.15], [1.73349828E12, 0.05], [1.73349894E12, 0.03333333333333333], [1.73349864E12, 0.18333333333333332], [1.73349834E12, 0.1], [1.733499E12, 0.05], [1.7334987E12, 0.13333333333333333]], "isOverall": false, "label": "Agree terms-0-success", "isController": false}, {"data": [[1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.03333333333333333], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1]], "isOverall": false, "label": "Get sr keys-0-success", "isController": false}, {"data": [[1.73349888E12, 0.08333333333333333], [1.73349858E12, 0.06666666666666667], [1.73349906E12, 0.016666666666666666], [1.73349876E12, 0.06666666666666667], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.03333333333333333], [1.73349882E12, 0.1], [1.73349852E12, 0.1], [1.733499E12, 0.05], [1.7334987E12, 0.1]], "isOverall": false, "label": "Get SR DID-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "Invite user-success", "isController": false}, {"data": [[1.73349888E12, 0.75], [1.73349858E12, 0.5333333333333333], [1.73349876E12, 0.4], [1.73349894E12, 0.7333333333333333], [1.73349846E12, 0.016666666666666666], [1.73349864E12, 0.55], [1.73349882E12, 0.55], [1.73349852E12, 0.38333333333333336], [1.733499E12, 0.3333333333333333], [1.7334987E12, 0.31666666666666665]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.1], [1.73349828E12, 0.016666666666666666], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349882E12, 0.016666666666666666], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1]], "isOverall": false, "label": "Link SR profile-0-success", "isController": false}, {"data": [[1.73349888E12, 0.03333333333333333], [1.7334984E12, 0.08333333333333333], [1.73349858E12, 0.03333333333333333], [1.73349876E12, 0.1], [1.73349894E12, 0.05], [1.73349846E12, 0.11666666666666667], [1.73349864E12, 0.1], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.06666666666666667], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Generate user hedera data-success", "isController": true}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.016666666666666666], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for sr key gen-success", "isController": false}, {"data": [[1.73349888E12, 0.03333333333333333], [1.7334984E12, 0.1], [1.73349858E12, 0.05], [1.73349876E12, 0.1], [1.73349894E12, 0.05], [1.73349846E12, 0.1], [1.73349864E12, 0.08333333333333333], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.06666666666666667], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Generate user keys-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.016666666666666666], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Generate sr keys-0-success", "isController": false}, {"data": [[1.73349888E12, 0.6333333333333333], [1.7334984E12, 0.4], [1.73349858E12, 0.7], [1.73349876E12, 0.9166666666666666], [1.73349894E12, 0.2], [1.73349846E12, 0.4], [1.73349864E12, 0.8166666666666667], [1.73349882E12, 0.9333333333333333], [1.73349834E12, 0.25], [1.73349852E12, 0.4666666666666667], [1.7334987E12, 0.9]], "isOverall": false, "label": "Get SR link result-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "Invite sr-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.016666666666666666], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for sr key gen-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.05], [1.73349828E12, 0.08333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.73349888E12, 0.6333333333333333], [1.7334984E12, 0.4], [1.73349858E12, 0.7], [1.73349876E12, 0.9166666666666666], [1.73349894E12, 0.2], [1.73349846E12, 0.4], [1.73349864E12, 0.8166666666666667], [1.73349882E12, 0.9333333333333333], [1.73349834E12, 0.25], [1.73349852E12, 0.4666666666666667], [1.7334987E12, 0.9]], "isOverall": false, "label": "Get SR link result-success", "isController": false}, {"data": [[1.73349888E12, 0.03333333333333333], [1.73349858E12, 0.08333333333333333], [1.73349876E12, 0.03333333333333333], [1.73349894E12, 0.08333333333333333], [1.73349864E12, 0.08333333333333333], [1.73349882E12, 0.06666666666666667], [1.73349852E12, 0.03333333333333333], [1.733499E12, 0.1], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.73349888E12, 0.05], [1.7334984E12, 0.1], [1.73349858E12, 0.05], [1.73349876E12, 0.11666666666666667], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.08333333333333333], [1.73349882E12, 0.06666666666666667], [1.73349852E12, 0.06666666666666667], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Login by user OS-success", "isController": false}, {"data": [[1.73349888E12, 0.05], [1.7334984E12, 0.016666666666666666], [1.73349858E12, 0.05], [1.73349906E12, 0.016666666666666666], [1.73349876E12, 0.08333333333333333], [1.73349894E12, 0.05], [1.73349846E12, 0.1], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.11666666666666667], [1.73349852E12, 0.1], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for user link-0-success", "isController": false}, {"data": [[1.73349888E12, 0.08333333333333333], [1.73349858E12, 0.06666666666666667], [1.73349906E12, 0.016666666666666666], [1.73349876E12, 0.06666666666666667], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.03333333333333333], [1.73349882E12, 0.1], [1.73349852E12, 0.1], [1.733499E12, 0.05], [1.7334987E12, 0.1]], "isOverall": false, "label": "Get SR DID-0-success", "isController": false}, {"data": [[1.73349888E12, 0.05], [1.7334984E12, 0.06666666666666667], [1.73349858E12, 0.05], [1.73349876E12, 0.11666666666666667], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.73349888E12, 0.05], [1.73349858E12, 0.08333333333333333], [1.73349906E12, 0.03333333333333333], [1.73349876E12, 0.03333333333333333], [1.73349894E12, 0.08333333333333333], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.05], [1.73349852E12, 0.016666666666666666], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.08333333333333333]], "isOverall": false, "label": "Dry Run Policy-success", "isController": false}, {"data": [[1.7334984E12, 0.08333333333333333], [1.73349858E12, 0.1], [1.73349876E12, 0.05], [1.73349828E12, 0.06666666666666667], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.11666666666666667], [1.73349852E12, 0.1], [1.7334987E12, 0.03333333333333333]], "isOverall": false, "label": "User creation flow-success", "isController": true}, {"data": [[1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-0-success", "isController": false}, {"data": [[1.73349888E12, 0.03333333333333333], [1.7334984E12, 0.1], [1.73349858E12, 0.05], [1.73349876E12, 0.1], [1.73349894E12, 0.05], [1.73349846E12, 0.1], [1.73349864E12, 0.08333333333333333], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.06666666666666667], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Generate user keys-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349876E12, 0.16666666666666666], [1.73349846E12, 0.13333333333333333], [1.73349882E12, 0.13333333333333333], [1.73349852E12, 0.21666666666666667], [1.73349888E12, 0.13333333333333333], [1.73349858E12, 0.2833333333333333], [1.73349828E12, 0.06666666666666667], [1.73349894E12, 0.1], [1.73349864E12, 0.23333333333333334], [1.73349834E12, 0.1], [1.733499E12, 0.05], [1.7334987E12, 0.23333333333333334]], "isOverall": false, "label": "Get SR Access Token-0-success", "isController": false}, {"data": [[1.73349888E12, 0.05], [1.7334984E12, 0.016666666666666666], [1.73349858E12, 0.05], [1.73349906E12, 0.016666666666666666], [1.73349876E12, 0.08333333333333333], [1.73349894E12, 0.05], [1.73349846E12, 0.1], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.11666666666666667], [1.73349852E12, 0.1], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for user link-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.1], [1.73349828E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1]], "isOverall": false, "label": "WS open for sr link-success", "isController": false}, {"data": [[1.73349888E12, 0.03333333333333333], [1.7334984E12, 0.08333333333333333], [1.73349858E12, 0.03333333333333333], [1.73349876E12, 0.1], [1.73349894E12, 0.05], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Get user key gen result-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.03333333333333333]], "isOverall": false, "label": "Invite sr-success", "isController": false}, {"data": [[1.733499E12, 0.016666666666666666]], "isOverall": false, "label": "Get policy import result-failure", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349876E12, 0.16666666666666666], [1.73349846E12, 0.13333333333333333], [1.73349882E12, 0.13333333333333333], [1.73349852E12, 0.21666666666666667], [1.73349888E12, 0.13333333333333333], [1.73349858E12, 0.2833333333333333], [1.73349828E12, 0.06666666666666667], [1.73349894E12, 0.1], [1.73349864E12, 0.23333333333333334], [1.73349834E12, 0.1], [1.733499E12, 0.05], [1.7334987E12, 0.23333333333333334]], "isOverall": false, "label": "Get SR Access Token-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.03333333333333333], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.08333333333333333], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.11666666666666667]], "isOverall": false, "label": "User creation(SR side)-success", "isController": true}, {"data": [[1.73349888E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.05], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.03333333333333333], [1.73349864E12, 0.05], [1.73349882E12, 0.08333333333333333], [1.73349852E12, 0.08333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "WS open for policy import-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.016666666666666666], [1.73349828E12, 0.1], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1], [1.73349822E12, 0.016666666666666666]], "isOverall": false, "label": "Generate sr keys-success", "isController": false}, {"data": [[1.73349888E12, 0.05], [1.7334984E12, 0.1], [1.73349858E12, 0.05], [1.73349876E12, 0.11666666666666667], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.1], [1.73349864E12, 0.08333333333333333], [1.73349882E12, 0.06666666666666667], [1.73349852E12, 0.06666666666666667], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Login by user OS-0-success", "isController": false}, {"data": [[1.73349888E12, 0.08333333333333333], [1.73349858E12, 0.06666666666666667], [1.73349906E12, 0.03333333333333333], [1.73349876E12, 0.1], [1.73349894E12, 0.03333333333333333], [1.73349846E12, 0.08333333333333333], [1.73349864E12, 0.05], [1.73349882E12, 0.1], [1.73349852E12, 0.1], [1.733499E12, 0.03333333333333333], [1.7334987E12, 0.06666666666666667]], "isOverall": false, "label": "Link user profile-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349906E12, 0.05], [1.73349876E12, 0.18333333333333332], [1.73349846E12, 0.13333333333333333], [1.73349882E12, 0.11666666666666667], [1.73349852E12, 0.13333333333333333], [1.73349888E12, 0.2], [1.73349858E12, 0.15], [1.73349894E12, 0.16666666666666666], [1.73349864E12, 0.13333333333333333], [1.73349834E12, 0.016666666666666666], [1.733499E12, 0.05], [1.7334987E12, 0.15]], "isOverall": false, "label": "Verify link-0-success", "isController": false}, {"data": [[1.73349888E12, 0.05], [1.73349858E12, 0.08333333333333333], [1.73349906E12, 0.03333333333333333], [1.73349876E12, 0.03333333333333333], [1.73349894E12, 0.08333333333333333], [1.73349864E12, 0.06666666666666667], [1.73349882E12, 0.05], [1.73349852E12, 0.016666666666666666], [1.733499E12, 0.016666666666666666], [1.7334987E12, 0.08333333333333333]], "isOverall": false, "label": "Dry Run Policy-0-success", "isController": false}, {"data": [[1.7334984E12, 0.1], [1.73349858E12, 0.1], [1.73349876E12, 0.1], [1.73349828E12, 0.016666666666666666], [1.73349846E12, 0.1], [1.73349864E12, 0.1], [1.73349882E12, 0.016666666666666666], [1.73349834E12, 0.1], [1.73349852E12, 0.1], [1.7334987E12, 0.1]], "isOverall": false, "label": "Link SR profile-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349906E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.73349822E12, "maxY": 10.316666666666666, "series": [{"data": [[1.7334984E12, 6.8], [1.73349906E12, 0.43333333333333335], [1.73349876E12, 7.883333333333334], [1.73349846E12, 8.216666666666667], [1.73349882E12, 7.15], [1.73349852E12, 9.5], [1.73349822E12, 0.8333333333333334], [1.73349888E12, 6.183333333333334], [1.73349858E12, 9.866666666666667], [1.73349828E12, 3.566666666666667], [1.73349894E12, 4.333333333333333], [1.73349864E12, 10.316666666666666], [1.73349834E12, 4.65], [1.733499E12, 1.9], [1.7334987E12, 9.983333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.733499E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73349906E12, "title": "Total Transactions Per Second"}},
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
