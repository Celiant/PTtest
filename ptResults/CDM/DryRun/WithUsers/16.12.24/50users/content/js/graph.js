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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 2446.0, "series": [{"data": [[0.0, 50.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[300.0, 9.0], [400.0, 2.0], [200.0, 89.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[300.0, 4.0], [200.0, 46.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[300.0, 5.0], [600.0, 10.0], [700.0, 32.0], [200.0, 46.0], [800.0, 8.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 8.0], [700.0, 1.0], [200.0, 36.0], [400.0, 2.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[300.0, 34.0], [400.0, 7.0], [200.0, 9.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get OS user Access Token", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[300.0, 4.0], [200.0, 44.0], [500.0, 1.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get OS SR Access Token", "isController": false}, {"data": [[8500.0, 2.0], [9100.0, 1.0], [9700.0, 1.0], [9500.0, 1.0], [9400.0, 1.0], [9300.0, 1.0], [10100.0, 1.0], [10000.0, 2.0], [10200.0, 2.0], [9800.0, 2.0], [10400.0, 2.0], [10700.0, 2.0], [10600.0, 1.0], [10900.0, 1.0], [11200.0, 2.0], [10800.0, 1.0], [11100.0, 1.0], [11000.0, 1.0], [11400.0, 1.0], [11600.0, 2.0], [12200.0, 1.0], [12000.0, 1.0], [12300.0, 1.0], [13200.0, 1.0], [13300.0, 1.0], [13600.0, 2.0], [13500.0, 1.0], [14800.0, 1.0], [15200.0, 2.0], [15000.0, 1.0], [15600.0, 1.0], [15800.0, 1.0], [17700.0, 1.0], [17500.0, 1.0], [18200.0, 1.0], [19400.0, 1.0], [18600.0, 1.0], [18800.0, 1.0], [20000.0, 1.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1100.0, 27.0], [1200.0, 5.0], [1300.0, 1.0], [1000.0, 16.0], [2000.0, 1.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1100.0, 2.0], [300.0, 196.0], [600.0, 16.0], [1300.0, 1.0], [700.0, 79.0], [200.0, 2115.0], [800.0, 23.0], [400.0, 8.0], [100.0, 4.0], [1700.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[300.0, 6.0], [700.0, 1.0], [200.0, 42.0], [400.0, 1.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[600.0, 10.0], [1500.0, 1.0], [800.0, 1.0], [500.0, 38.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[600.0, 6.0], [700.0, 4.0], [2800.0, 2.0], [800.0, 2.0], [900.0, 1.0], [1000.0, 10.0], [1100.0, 6.0], [1200.0, 2.0], [1300.0, 2.0], [1700.0, 1.0], [1800.0, 1.0], [500.0, 12.0], [2000.0, 1.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[300.0, 6.0], [200.0, 43.0], [400.0, 1.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[300.0, 9.0], [200.0, 41.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[2100.0, 1.0], [2000.0, 50.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[300.0, 21.0], [200.0, 27.0], [400.0, 2.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[0.0, 149.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[31900.0, 1.0], [32500.0, 1.0], [33300.0, 1.0], [32800.0, 1.0], [34500.0, 1.0], [35100.0, 1.0], [38300.0, 1.0], [38100.0, 1.0], [40100.0, 1.0], [40200.0, 1.0], [41800.0, 1.0], [42600.0, 2.0], [42000.0, 1.0], [43500.0, 1.0], [44800.0, 2.0], [43600.0, 1.0], [43700.0, 1.0], [44900.0, 1.0], [43400.0, 1.0], [44700.0, 1.0], [46400.0, 1.0], [46800.0, 2.0], [45700.0, 1.0], [48100.0, 1.0], [47600.0, 2.0], [49000.0, 2.0], [48400.0, 1.0], [48700.0, 1.0], [47400.0, 1.0], [48900.0, 1.0], [48000.0, 1.0], [49500.0, 2.0], [50200.0, 1.0], [51100.0, 1.0], [50400.0, 2.0], [49900.0, 1.0], [49800.0, 1.0], [50800.0, 1.0], [50000.0, 1.0], [50100.0, 1.0], [49600.0, 1.0], [52300.0, 1.0], [52400.0, 1.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[9300.0, 1.0], [9400.0, 1.0], [9900.0, 1.0], [10200.0, 1.0], [10100.0, 1.0], [10600.0, 1.0], [10400.0, 1.0], [10700.0, 1.0], [10900.0, 1.0], [11100.0, 1.0], [10800.0, 1.0], [11000.0, 1.0], [11400.0, 1.0], [11300.0, 1.0], [11500.0, 1.0], [11700.0, 3.0], [12200.0, 4.0], [11800.0, 1.0], [12000.0, 1.0], [12500.0, 2.0], [13300.0, 1.0], [12800.0, 2.0], [13600.0, 1.0], [13400.0, 1.0], [14200.0, 1.0], [14300.0, 1.0], [14400.0, 2.0], [14800.0, 1.0], [16000.0, 1.0], [16100.0, 2.0], [15900.0, 1.0], [16700.0, 1.0], [16600.0, 1.0], [18500.0, 2.0], [19300.0, 1.0], [20200.0, 1.0], [19700.0, 1.0], [19900.0, 1.0], [21200.0, 1.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[300.0, 38.0], [600.0, 4.0], [1300.0, 1.0], [700.0, 13.0], [200.0, 447.0], [400.0, 3.0], [800.0, 6.0], [100.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[12000.0, 1.0], [11800.0, 1.0], [12300.0, 1.0], [18100.0, 1.0], [18300.0, 1.0], [18900.0, 1.0], [18700.0, 1.0], [19000.0, 1.0], [19700.0, 1.0], [21600.0, 1.0], [22300.0, 1.0], [24600.0, 1.0], [25300.0, 1.0], [28100.0, 1.0], [28600.0, 1.0], [28800.0, 1.0], [31300.0, 1.0], [32000.0, 1.0], [35800.0, 1.0], [35700.0, 1.0], [35300.0, 1.0], [35200.0, 1.0], [38500.0, 1.0], [38400.0, 1.0], [38800.0, 1.0], [39300.0, 1.0], [42300.0, 1.0], [41300.0, 1.0], [41500.0, 1.0], [41700.0, 1.0], [42100.0, 1.0], [42700.0, 1.0], [42200.0, 1.0], [44800.0, 2.0], [44900.0, 1.0], [44700.0, 2.0], [44300.0, 1.0], [43100.0, 1.0], [43800.0, 1.0], [44200.0, 1.0], [48000.0, 1.0], [48200.0, 1.0], [51300.0, 1.0], [51600.0, 1.0], [54400.0, 1.0], [55100.0, 1.0], [61300.0, 1.0], [61400.0, 1.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[15400.0, 1.0], [16300.0, 2.0], [16000.0, 1.0], [17200.0, 1.0], [17400.0, 1.0], [19300.0, 1.0], [20500.0, 1.0], [22200.0, 1.0], [22300.0, 1.0], [23200.0, 1.0], [23400.0, 2.0], [23300.0, 1.0], [24100.0, 1.0], [24400.0, 1.0], [24200.0, 1.0], [24800.0, 1.0], [25100.0, 1.0], [26400.0, 2.0], [25600.0, 2.0], [25800.0, 1.0], [26000.0, 1.0], [27300.0, 1.0], [27500.0, 1.0], [28100.0, 1.0], [28400.0, 1.0], [29600.0, 1.0], [29500.0, 1.0], [28900.0, 1.0], [29400.0, 1.0], [30000.0, 1.0], [29900.0, 1.0], [30300.0, 1.0], [30500.0, 1.0], [29800.0, 1.0], [30400.0, 1.0], [30600.0, 1.0], [31300.0, 1.0], [31100.0, 2.0], [31700.0, 1.0], [31600.0, 2.0], [31400.0, 1.0], [31000.0, 1.0], [32100.0, 1.0], [32600.0, 1.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get OS SR Access Token-0", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[0.0, 49.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[280900.0, 1.0], [147000.0, 1.0], [149400.0, 1.0], [168200.0, 1.0], [188400.0, 1.0], [187800.0, 1.0], [188600.0, 2.0], [199000.0, 1.0], [199200.0, 1.0], [198200.0, 1.0], [208600.0, 1.0], [219400.0, 1.0], [229600.0, 2.0], [240000.0, 1.0], [239800.0, 1.0], [250200.0, 1.0], [250400.0, 1.0], [250800.0, 1.0], [261000.0, 1.0], [146100.0, 1.0], [147700.0, 1.0], [148300.0, 1.0], [148500.0, 1.0], [149500.0, 1.0], [177900.0, 2.0], [176900.0, 1.0], [188500.0, 1.0], [199100.0, 1.0], [198700.0, 3.0], [229300.0, 1.0], [230300.0, 1.0], [240300.0, 1.0], [239900.0, 1.0], [240100.0, 1.0], [260500.0, 2.0], [261300.0, 1.0], [271400.0, 1.0], [104800.0, 1.0], [105000.0, 1.0], [115800.0, 1.0], [115600.0, 2.0], [126300.0, 1.0], [125800.0, 1.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[13700.0, 2.0], [13500.0, 1.0], [14200.0, 1.0], [14300.0, 1.0], [14000.0, 2.0], [14800.0, 1.0], [14700.0, 2.0], [14500.0, 1.0], [14400.0, 1.0], [15000.0, 2.0], [15300.0, 2.0], [15800.0, 1.0], [15400.0, 1.0], [15700.0, 2.0], [16100.0, 2.0], [15900.0, 2.0], [16300.0, 1.0], [16000.0, 1.0], [16200.0, 1.0], [16800.0, 4.0], [16400.0, 6.0], [16500.0, 2.0], [17000.0, 1.0], [17100.0, 1.0], [16700.0, 2.0], [17400.0, 1.0], [17800.0, 2.0], [18000.0, 1.0], [17600.0, 1.0], [18600.0, 1.0], [19000.0, 1.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 934.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[0.0, 101.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[0.0, 515.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[2400.0, 30.0], [2500.0, 18.0], [2600.0, 2.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[0.0, 149.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[0.0, 48.0], [100.0, 1.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[137600.0, 1.0], [166400.0, 1.0], [166800.0, 1.0], [168800.0, 1.0], [180400.0, 1.0], [205200.0, 1.0], [214800.0, 1.0], [231200.0, 1.0], [249600.0, 1.0], [251600.0, 1.0], [284000.0, 1.0], [262700.0, 1.0], [274700.0, 1.0], [291500.0, 1.0], [166900.0, 1.0], [168500.0, 1.0], [190100.0, 1.0], [188900.0, 1.0], [213700.0, 1.0], [239300.0, 1.0], [239700.0, 1.0], [250500.0, 1.0], [275400.0, 1.0], [137400.0, 1.0], [190200.0, 1.0], [204600.0, 1.0], [203800.0, 1.0], [209800.0, 1.0], [215400.0, 1.0], [241400.0, 1.0], [240600.0, 1.0], [250200.0, 1.0], [274800.0, 1.0], [263600.0, 1.0], [263900.0, 1.0], [166300.0, 1.0], [170700.0, 1.0], [200300.0, 1.0], [201500.0, 1.0], [218700.0, 1.0], [213900.0, 1.0], [214300.0, 1.0], [252300.0, 1.0], [275000.0, 1.0], [115800.0, 1.0], [118600.0, 1.0], [126800.0, 1.0], [126400.0, 1.0], [127200.0, 1.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[2200.0, 1.0], [1400.0, 1.0], [1500.0, 5.0], [1600.0, 23.0], [1700.0, 15.0], [1800.0, 4.0], [1900.0, 1.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[137200.0, 1.0], [143200.0, 1.0], [146800.0, 1.0], [153600.0, 1.0], [190000.0, 1.0], [203600.0, 1.0], [215200.0, 1.0], [215600.0, 1.0], [232000.0, 1.0], [238800.0, 1.0], [140100.0, 1.0], [166500.0, 1.0], [206100.0, 1.0], [218500.0, 1.0], [215700.0, 1.0], [222900.0, 1.0], [232100.0, 1.0], [117100.0, 1.0], [127100.0, 1.0], [130300.0, 1.0], [153000.0, 1.0], [177400.0, 1.0], [202600.0, 1.0], [209000.0, 1.0], [210200.0, 1.0], [223400.0, 1.0], [225800.0, 1.0], [139900.0, 1.0], [40900.0, 1.0], [162700.0, 1.0], [159500.0, 1.0], [159900.0, 1.0], [44500.0, 1.0], [176300.0, 1.0], [179500.0, 1.0], [180300.0, 1.0], [47800.0, 2.0], [202700.0, 1.0], [219500.0, 1.0], [215100.0, 1.0], [222300.0, 1.0], [225500.0, 1.0], [57800.0, 1.0], [60900.0, 1.0], [84000.0, 1.0], [97200.0, 1.0], [114000.0, 1.0], [130200.0, 1.0], [127200.0, 1.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 51.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 13.0], [700.0, 1.0], [900.0, 1.0], [500.0, 34.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[4200.0, 1.0], [2500.0, 1.0], [2600.0, 4.0], [2700.0, 16.0], [2800.0, 19.0], [2900.0, 6.0], [3000.0, 2.0], [3300.0, 1.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[300.0, 108.0], [600.0, 29.0], [700.0, 88.0], [200.0, 660.0], [800.0, 35.0], [400.0, 6.0], [900.0, 2.0], [500.0, 4.0], [1000.0, 2.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[2400.0, 14.0], [2500.0, 31.0], [2600.0, 3.0], [2700.0, 2.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[0.0, 2446.0], [100.0, 1.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[13700.0, 37.0], [13800.0, 10.0], [13900.0, 1.0], [14000.0, 2.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[300.0, 17.0], [200.0, 79.0], [400.0, 4.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[300.0, 15.0], [200.0, 131.0], [400.0, 3.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[18800.0, 1.0], [13700.0, 44.0], [13800.0, 3.0], [13600.0, 1.0], [13900.0, 1.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[600.0, 37.0], [2400.0, 2.0], [2600.0, 1.0], [700.0, 19.0], [2700.0, 1.0], [800.0, 8.0], [3400.0, 1.0], [900.0, 6.0], [3700.0, 1.0], [1000.0, 1.0], [1100.0, 7.0], [1200.0, 1.0], [1300.0, 3.0], [1400.0, 2.0], [1500.0, 2.0], [500.0, 57.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get OS user Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 291500.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 9978.0, "series": [{"data": [[0.0, 9978.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 650.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 565.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [[3.0, 2.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73434752E12, "maxY": 38.92457627118643, "series": [{"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.73434752E12, 1.0]], "isOverall": false, "label": "Tenant creation", "isController": false}, {"data": [[1.73434794E12, 34.756915339480294], [1.73434824E12, 28.348547717842322], [1.7343483E12, 23.306709265175726], [1.73434764E12, 12.71786310517529], [1.73434818E12, 33.1659663865546], [1.73434752E12, 2.2947368421052636], [1.73434758E12, 7.088452088452088], [1.73434788E12, 29.913901345291467], [1.73434842E12, 5.000000000000001], [1.73434776E12, 22.10318331503843], [1.73434782E12, 25.53412462908013], [1.73434812E12, 36.16383616383618], [1.7343477E12, 18.56643356643354], [1.734348E12, 38.486677115987476], [1.73434806E12, 38.92457627118643], [1.73434836E12, 16.304597701149426]], "isOverall": false, "label": "Policy workflow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73434842E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 291566.0, "series": [{"data": [[2.0, 2.0], [32.0, 0.0], [33.0, 1.0], [34.0, 1.0], [35.0, 1.0], [36.0, 0.0], [37.0, 0.5], [38.0, 0.5], [39.0, 0.0], [40.0, 1.0], [3.0, 0.0], [4.0, 0.0], [5.0, 0.0], [6.0, 1.0], [7.0, 1.0], [8.0, 0.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [12.0, 0.0], [13.0, 0.0], [14.0, 1.0], [15.0, 1.0], [1.0, 0.0], [16.0, 0.0], [17.0, 0.0], [18.0, 1.0], [19.0, 0.0], [20.0, 1.0], [21.0, 1.0], [22.0, 0.6666666666666666], [23.0, 0.5], [24.0, 0.0], [25.0, 1.0], [26.0, 0.0], [27.0, 0.0], [28.0, 0.0], [29.0, 0.5], [30.0, 0.0], [31.0, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[21.92, 0.52]], "isOverall": false, "label": "Invite user-0-Aggregated", "isController": false}, {"data": [[2.0, 412.0], [32.0, 256.5], [33.0, 230.33333333333334], [34.0, 312.6666666666667], [35.0, 256.8], [36.0, 269.55555555555554], [37.0, 228.5], [38.0, 267.0], [39.0, 260.8], [40.0, 238.6], [3.0, 251.0], [4.0, 239.0], [5.0, 257.0], [6.0, 290.0], [7.0, 284.0], [8.0, 282.5], [9.0, 282.0], [10.0, 255.0], [11.0, 260.0], [12.0, 210.0], [13.0, 255.5], [14.0, 246.0], [15.0, 251.0], [17.0, 235.0], [18.0, 252.0], [19.0, 263.5], [20.0, 230.5], [21.0, 251.5], [22.0, 266.0], [23.0, 268.0], [24.0, 243.5], [25.0, 254.4], [26.0, 252.0], [27.0, 265.5], [28.0, 229.0], [29.0, 239.0], [30.0, 269.375], [31.0, 265.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[25.89, 258.7800000000001]], "isOverall": false, "label": "Agree terms-Aggregated", "isController": false}, {"data": [[2.0, 211.0], [32.0, 268.0], [33.0, 277.0], [34.0, 257.0], [35.0, 265.0], [36.0, 284.0], [37.0, 261.0], [38.0, 245.0], [39.0, 250.0], [40.0, 245.0], [3.0, 263.0], [4.0, 297.0], [5.0, 260.0], [6.0, 241.0], [7.0, 259.0], [8.0, 241.0], [9.0, 302.0], [10.0, 247.0], [11.0, 257.0], [12.0, 202.0], [13.0, 270.0], [14.0, 241.0], [15.0, 256.0], [17.0, 288.5], [18.0, 245.0], [19.0, 234.0], [20.0, 289.0], [21.0, 264.3333333333333], [22.0, 241.0], [23.0, 380.0], [24.0, 236.0], [25.0, 251.5], [26.0, 293.0], [27.0, 254.0], [28.0, 246.0], [29.0, 229.5], [30.0, 258.0], [31.0, 249.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[22.559999999999995, 259.78]], "isOverall": false, "label": "Link SR profile-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [32.0, 0.0], [33.0, 0.0], [34.0, 0.5], [35.0, 0.0], [36.0, 1.0], [37.0, 1.0], [38.0, 0.5], [39.0, 1.0], [40.0, 1.0], [3.0, 1.0], [4.0, 0.0], [5.0, 1.0], [6.0, 0.0], [7.0, 1.0], [8.0, 1.0], [9.0, 0.0], [10.0, 1.0], [11.0, 0.0], [12.0, 1.0], [13.0, 1.0], [14.0, 0.0], [15.0, 0.0], [1.0, 2.0], [16.0, 1.0], [17.0, 0.0], [18.0, 1.0], [19.0, 0.0], [20.0, 1.0], [21.0, 0.0], [22.0, 1.0], [23.0, 0.5], [24.0, 0.0], [25.0, 0.0], [26.0, 0.5], [27.0, 1.0], [28.0, 0.0], [29.0, 0.0], [30.0, 1.0], [31.0, 1.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[21.92, 0.5600000000000002]], "isOverall": false, "label": "Invite sr-0-Aggregated", "isController": false}, {"data": [[8.0, 0.0], [32.0, 2.0], [33.0, 1.0], [34.0, 1.5], [35.0, 0.5], [9.0, 1.0], [36.0, 1.4285714285714284], [38.0, 1.0], [39.0, 1.2], [10.0, 1.0], [40.0, 1.0], [11.0, 1.0], [13.0, 0.0], [15.0, 1.0], [18.0, 2.0], [19.0, 1.0], [21.0, 0.0], [22.0, 1.0], [25.0, 1.0], [26.0, 1.0], [27.0, 1.0], [29.0, 1.25], [30.0, 0.8571428571428572]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[29.2, 1.0400000000000003]], "isOverall": false, "label": "Link user profile-0-Aggregated", "isController": false}, {"data": [[32.0, 1.0], [33.0, 1.0], [35.0, 1.1666666666666665], [9.0, 1.0], [36.0, 1.0], [37.0, 1.8], [39.0, 1.5], [40.0, 1.5], [12.0, 1.3333333333333333], [17.0, 1.0], [21.0, 1.0], [22.0, 1.0], [23.0, 0.5], [24.0, 1.0], [26.0, 2.0], [27.0, 2.0], [29.0, 1.375], [30.0, 1.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[29.7, 1.26]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[2.0, 517.0], [32.0, 502.5], [33.0, 473.5], [34.0, 485.75], [35.0, 532.0], [36.0, 492.0], [37.0, 473.75], [38.0, 493.75], [39.0, 498.5], [40.0, 498.0], [3.0, 474.0], [4.0, 545.0], [5.0, 525.5], [6.0, 498.0], [7.0, 540.5], [8.0, 513.0], [9.0, 501.0], [10.0, 549.5], [11.0, 524.5], [12.0, 521.5], [13.0, 501.5], [14.0, 512.0], [15.0, 555.5], [1.0, 400.0], [16.0, 546.5], [17.0, 520.0], [18.0, 539.0], [19.0, 515.5], [20.0, 518.5], [21.0, 494.5], [22.0, 487.49999999999994], [23.0, 508.0], [24.0, 468.0], [25.0, 492.25], [26.0, 505.75], [27.0, 475.5], [28.0, 513.5], [29.0, 516.25], [30.0, 484.5], [31.0, 489.5]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[21.712871287128714, 502.4158415841584]], "isOverall": false, "label": "Get Admin Access Token-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 0.0], [33.0, 1.3333333333333333], [34.0, 0.6666666666666666], [35.0, 1.4], [36.0, 1.0], [37.0, 1.5], [38.0, 1.0], [39.0, 1.0], [40.0, 1.2], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 1.0], [9.0, 6.0], [10.0, 1.0], [11.0, 2.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 1.0], [17.0, 0.5], [18.0, 0.5], [19.0, 1.0], [20.0, 1.0], [21.0, 0.5], [22.0, 0.75], [23.0, 1.0], [24.0, 1.0], [25.0, 0.6], [26.0, 0.5], [27.0, 1.0], [28.0, 0.0], [29.0, 0.8333333333333334], [30.0, 0.875], [31.0, 2.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[25.89, 1.0400000000000003]], "isOverall": false, "label": "Agree terms-0-Aggregated", "isController": false}, {"data": [[32.0, 248.5], [33.0, 247.0], [35.0, 456.33333333333337], [9.0, 223.0], [36.0, 286.0], [37.0, 276.2], [39.0, 224.0], [40.0, 240.5], [12.0, 299.3333333333333], [17.0, 514.5], [21.0, 251.0], [22.0, 442.0], [23.0, 298.5], [24.0, 303.0], [26.0, 295.0], [27.0, 271.0], [29.0, 401.0], [30.0, 245.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[29.7, 323.9]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[2.0, 398.0], [32.0, 340.0], [33.0, 349.0], [34.0, 252.0], [35.0, 299.0], [36.0, 354.0], [37.0, 306.5], [38.0, 371.0], [39.0, 349.0], [40.0, 310.0], [3.0, 342.0], [4.0, 426.0], [5.0, 346.0], [6.0, 401.0], [7.0, 404.0], [8.0, 305.0], [9.0, 368.0], [10.0, 407.0], [11.0, 300.0], [12.0, 330.0], [13.0, 323.0], [14.0, 320.0], [15.0, 371.0], [1.0, 437.0], [16.0, 301.0], [17.0, 343.0], [18.0, 400.0], [19.0, 357.0], [20.0, 362.5], [21.0, 281.0], [22.0, 344.0], [23.0, 289.0], [24.0, 382.0], [25.0, 314.5], [26.0, 305.5], [27.0, 355.0], [28.0, 273.0], [29.0, 357.5], [30.0, 445.0], [31.0, 315.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[21.92, 341.59999999999997]], "isOverall": false, "label": "Invite sr-Aggregated", "isController": false}, {"data": [[33.0, 2062.4], [32.0, 2058.0], [35.0, 2059.666666666667], [9.0, 2052.0], [37.0, 2056.0], [36.0, 2059.0], [39.0, 2062.0], [10.0, 2053.0], [40.0, 2064.5], [13.0, 2065.0], [14.0, 2073.0], [17.0, 2044.0], [20.0, 2058.0], [21.0, 2067.0], [22.0, 2068.0], [23.0, 2058.0], [24.0, 2059.0], [25.0, 2062.0], [26.0, 2054.0], [7.0, 2050.0], [28.0, 2069.0], [29.0, 2055.6666666666665], [30.0, 2065.0], [31.0, 2054.5]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[29.320000000000007, 2059.7400000000007]], "isOverall": false, "label": "Generate user keys-Aggregated", "isController": false}, {"data": [[33.0, 2053.0], [32.0, 2064.0], [34.0, 2066.0], [35.0, 2064.5], [37.0, 2064.0], [36.0, 2063.1666666666665], [39.0, 2068.5], [40.0, 2063.6], [7.0, 2052.0], [8.0, 2067.0], [9.0, 2057.0], [10.0, 2063.0], [12.0, 2047.0], [14.0, 2059.0], [17.0, 2052.0], [19.0, 2063.0], [21.0, 2057.0], [22.0, 2065.0], [24.0, 2068.6666666666665], [25.0, 2063.0], [26.0, 2069.0], [28.0, 2071.0], [29.0, 2048.5], [30.0, 2066.0], [31.0, 2067.0]], "isOverall": false, "label": "Get OS user Access Token", "isController": false}, {"data": [[29.299999999999997, 2062.64]], "isOverall": false, "label": "Get OS user Access Token-Aggregated", "isController": false}, {"data": [[2.0, 2067.0], [32.0, 2064.0], [33.0, 2062.0], [34.0, 2041.0], [35.0, 2060.0], [36.0, 2064.0], [37.0, 2059.5], [39.0, 2068.0], [38.0, 2040.0], [40.0, 2070.0], [3.0, 2054.0], [4.0, 2053.0], [5.0, 2062.0], [6.0, 2055.0], [7.0, 2081.0], [8.0, 2077.0], [9.0, 2060.0], [10.0, 2061.0], [11.0, 2065.0], [12.0, 2056.0], [13.0, 2059.0], [14.0, 2065.0], [15.0, 2059.0], [1.0, 2063.0], [16.0, 2056.0], [17.0, 2059.0], [18.0, 2064.0], [19.0, 2066.0], [20.0, 2056.0], [21.0, 2061.3333333333335], [22.0, 2054.0], [23.0, 2071.0], [24.0, 2066.0], [25.0, 2063.0], [26.0, 2066.0], [27.0, 2055.0], [28.0, 2055.0], [29.0, 2058.0], [30.0, 2055.0], [31.0, 2076.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[21.76, 2061.58]], "isOverall": false, "label": "Generate sr keys-Aggregated", "isController": false}, {"data": [[33.0, 254.0], [35.0, 239.0], [34.0, 235.5], [37.0, 244.66666666666666], [36.0, 313.0], [39.0, 259.5], [40.0, 222.0], [10.0, 295.0], [11.0, 247.16666666666669], [12.0, 250.0], [13.0, 282.5], [15.0, 216.0], [17.0, 223.0], [18.0, 227.0], [19.0, 303.0], [20.0, 247.6], [22.0, 259.0], [23.0, 252.0], [24.0, 223.0], [25.0, 257.4], [26.0, 249.0], [28.0, 243.5], [29.0, 379.0], [30.0, 231.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[24.12244897959183, 254.79591836734696]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[1.0, 1619.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.0, 1619.0]], "isOverall": false, "label": "Tenant creation flow-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [32.0, 1.0], [33.0, 0.5], [34.0, 1.0], [35.0, 0.0], [36.0, 1.0], [37.0, 0.5], [39.0, 0.0], [38.0, 1.0], [40.0, 0.0], [3.0, 1.0], [4.0, 0.0], [5.0, 0.0], [6.0, 0.0], [7.0, 0.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [12.0, 0.0], [13.0, 1.0], [14.0, 0.0], [15.0, 1.0], [1.0, 0.0], [16.0, 0.0], [17.0, 0.0], [18.0, 1.0], [19.0, 0.0], [20.0, 1.0], [21.0, 0.6666666666666666], [22.0, 0.0], [23.0, 0.0], [24.0, 0.0], [25.0, 0.5], [26.0, 0.0], [27.0, 1.0], [28.0, 1.0], [29.0, 1.0], [30.0, 0.0], [31.0, 1.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[21.76, 0.48]], "isOverall": false, "label": "Generate sr keys-0-Aggregated", "isController": false}, {"data": [[2.0, 2059.0], [32.0, 2063.0], [33.0, 2068.5], [34.0, 2063.0], [35.0, 2070.0], [36.0, 2060.5], [37.0, 2066.0], [39.0, 2056.0], [38.0, 2052.0], [40.0, 2061.0], [3.0, 2051.0], [4.0, 2046.0], [5.0, 2048.0], [6.0, 2063.0], [7.0, 2065.0], [8.0, 2074.0], [9.0, 2065.0], [10.0, 2067.0], [11.0, 2058.0], [12.0, 2053.0], [13.0, 2053.0], [14.0, 2067.0], [15.0, 2063.0], [1.0, 2069.0], [16.0, 2051.0], [17.0, 2031.0], [18.0, 2062.0], [19.0, 2051.0], [20.0, 2072.0], [21.0, 2055.6666666666665], [22.0, 2069.5], [23.0, 2069.0], [24.0, 2069.5], [25.0, 2060.0], [26.0, 2052.0], [27.0, 2069.0], [28.0, 2046.0], [29.0, 2064.0], [30.0, 2061.0], [31.0, 2056.0]], "isOverall": false, "label": "Get OS SR Access Token", "isController": false}, {"data": [[21.76, 2060.82]], "isOverall": false, "label": "Get OS SR Access Token-Aggregated", "isController": false}, {"data": [[33.0, 13644.0], [32.0, 12329.0], [2.0, 18204.0], [34.0, 12110.5], [35.0, 11686.0], [37.0, 11459.0], [36.0, 9796.0], [38.0, 9990.0], [39.0, 9161.0], [40.0, 10666.0], [3.0, 18807.0], [4.0, 18619.0], [5.0, 17562.0], [6.0, 17787.0], [7.0, 19490.0], [8.0, 14864.0], [9.0, 15815.0], [10.0, 15242.0], [11.0, 12084.0], [12.0, 11263.0], [13.0, 15042.0], [15.0, 15461.0], [16.0, 13522.0], [1.0, 20081.0], [17.0, 11016.0], [18.0, 11130.0], [20.0, 10490.5], [21.0, 9376.0], [22.0, 10181.666666666666], [23.0, 12937.0], [24.0, 10032.0], [25.0, 10638.5], [26.0, 9694.5], [27.0, 8579.0], [28.0, 9878.0], [29.0, 10479.0], [30.0, 10140.0], [31.0, 13333.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[22.020408163265305, 12568.857142857147]], "isOverall": false, "label": "Dry Run Policy-Aggregated", "isController": false}, {"data": [[2.0, 1027.0], [32.0, 1078.0], [33.0, 1369.0], [34.0, 1099.0], [35.0, 1111.0], [36.0, 1074.0], [37.0, 1079.5], [38.0, 1132.5], [39.0, 1157.0], [40.0, 1126.0], [3.0, 1090.0], [4.0, 1175.0], [5.0, 1083.0], [6.0, 1184.0], [7.0, 1058.0], [8.0, 1142.0], [9.0, 1195.0], [10.0, 1190.0], [11.0, 1190.0], [12.0, 1233.0], [13.0, 1191.0], [14.0, 1186.0], [15.0, 1138.0], [1.0, 1037.0], [16.0, 1158.0], [17.0, 1187.0], [18.0, 1181.0], [19.0, 1125.0], [20.0, 1116.5], [21.0, 1179.0], [22.0, 1479.0], [23.0, 1092.5], [24.0, 1140.0], [25.0, 1159.3333333333333], [26.0, 1076.0], [27.0, 1220.0], [28.0, 1087.0], [29.0, 1149.0], [30.0, 1088.0], [31.0, 1051.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[21.899999999999995, 1155.5799999999997]], "isOverall": false, "label": "Invite and accept user-Aggregated", "isController": true}, {"data": [[32.0, 275.8124999999999], [33.0, 266.76470588235304], [34.0, 282.97647058823514], [35.0, 287.5454545454545], [36.0, 278.75179856115113], [37.0, 319.1948717948719], [38.0, 270.5966386554623], [39.0, 273.64506172839515], [40.0, 285.44134078212295], [3.0, 219.33333333333334], [4.0, 251.5], [5.0, 232.88888888888889], [6.0, 257.16666666666663], [7.0, 277.25], [8.0, 289.7142857142858], [9.0, 293.07142857142856], [10.0, 285.84615384615387], [11.0, 291.73333333333335], [12.0, 289.5294117647059], [13.0, 280.2222222222223], [14.0, 271.27777777777777], [15.0, 275.3809523809523], [16.0, 286.9166666666668], [17.0, 273.5833333333334], [18.0, 270.9629629629629], [19.0, 275.6333333333333], [20.0, 282.80952380952374], [21.0, 277.2615384615387], [22.0, 290.561224489796], [23.0, 300.11475409836066], [24.0, 291.52272727272725], [25.0, 281.13333333333344], [26.0, 281.54545454545456], [27.0, 269.6938775510205], [28.0, 270.23809523809524], [29.0, 275.62195121951214], [30.0, 267.21276595744683], [31.0, 265.65957446808505]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[30.607274213322466, 281.7266040049043]], "isOverall": false, "label": "Get SR link result-Aggregated", "isController": false}, {"data": [[8.0, 279.0], [32.0, 212.0], [33.0, 288.0], [34.0, 280.5], [35.0, 304.75], [9.0, 271.0], [36.0, 268.2857142857143], [38.0, 242.0], [39.0, 235.5], [10.0, 296.0], [40.0, 256.3333333333333], [11.0, 280.0], [13.0, 259.0], [15.0, 269.0], [18.0, 218.0], [20.0, 299.0], [21.0, 241.0], [22.0, 286.0], [25.0, 279.6666666666667], [26.0, 250.0], [27.0, 214.0], [29.0, 249.0], [30.0, 336.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[29.24, 274.91999999999996]], "isOverall": false, "label": "Get User Access Token-Aggregated", "isController": false}, {"data": [[2.0, 545.0], [32.0, 565.0], [33.0, 831.0], [34.0, 566.5], [35.0, 569.0], [36.0, 596.0], [37.0, 580.0], [38.0, 582.5], [39.0, 567.0], [40.0, 586.0], [3.0, 567.0], [4.0, 543.0], [5.0, 543.0], [6.0, 584.0], [7.0, 528.0], [8.0, 551.0], [9.0, 589.0], [10.0, 611.0], [11.0, 610.0], [12.0, 640.0], [13.0, 637.0], [14.0, 557.0], [15.0, 565.0], [1.0, 514.0], [16.0, 571.0], [17.0, 510.0], [18.0, 562.0], [19.0, 595.0], [20.0, 550.0], [21.0, 522.0], [22.0, 903.0], [23.0, 577.0], [24.0, 629.0], [25.0, 550.6666666666666], [26.0, 558.0], [27.0, 651.0], [28.0, 526.0], [29.0, 560.0], [30.0, 520.0], [31.0, 532.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[21.899999999999995, 593.34]], "isOverall": false, "label": "Accept user-Aggregated", "isController": false}, {"data": [[8.0, 1013.0], [32.0, 1081.0], [33.0, 1053.0], [34.0, 808.5], [35.0, 1221.5], [9.0, 626.0], [36.0, 1010.9999999999999], [38.0, 596.0], [39.0, 808.0], [10.0, 571.0], [40.0, 1114.3333333333333], [11.0, 623.0], [13.0, 593.0], [15.0, 579.0], [18.0, 665.0], [20.0, 1093.0], [21.0, 725.0], [22.0, 777.5], [25.0, 963.6666666666666], [26.0, 763.0], [27.0, 537.0], [29.0, 775.75], [30.0, 1719.4285714285713]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[29.24, 1005.16]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[8.0, 251.0], [32.0, 254.0], [33.0, 256.0], [34.0, 272.5], [35.0, 320.25], [9.0, 205.0], [36.0, 267.71428571428567], [38.0, 249.0], [39.0, 259.25], [10.0, 208.0], [40.0, 258.3333333333333], [11.0, 291.0], [13.0, 240.0], [15.0, 254.0], [18.0, 302.0], [19.0, 274.0], [21.0, 214.0], [22.0, 281.5], [25.0, 287.6666666666667], [26.0, 245.0], [27.0, 262.0], [29.0, 254.25], [30.0, 263.5714285714286]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[29.22, 266.0999999999999]], "isOverall": false, "label": "Get SR DID-Aggregated", "isController": false}, {"data": [[8.0, 219.0], [32.0, 258.0], [33.0, 251.0], [34.0, 241.5], [35.0, 294.0], [9.0, 244.0], [36.0, 265.85714285714283], [38.0, 337.0], [39.0, 245.4], [10.0, 217.0], [40.0, 266.0], [11.0, 310.0], [13.0, 240.0], [15.0, 265.0], [18.0, 243.0], [19.0, 276.0], [21.0, 250.0], [22.0, 272.5], [25.0, 239.33333333333334], [26.0, 262.0], [27.0, 289.0], [29.0, 243.25], [30.0, 268.57142857142856]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[29.2, 261.12000000000006]], "isOverall": false, "label": "Link user profile-Aggregated", "isController": false}, {"data": [[2.0, 2052.0], [32.0, 2060.0], [33.0, 2044.5], [34.0, 2062.0], [35.0, 2069.0], [36.0, 2058.0], [37.0, 2064.0], [38.0, 2056.0], [39.0, 2048.0], [40.0, 2064.0], [3.0, 2081.0], [4.0, 2051.0], [5.0, 2079.0], [6.0, 2062.0], [7.0, 2062.0], [8.0, 2070.0], [9.0, 2058.0], [10.0, 2063.0], [11.0, 2071.0], [12.0, 2077.0], [13.0, 2084.0], [14.0, 2050.0], [15.0, 2063.0], [16.0, 2064.5], [17.0, 2055.0], [18.0, 2060.0], [19.0, 2061.0], [20.0, 2063.5], [21.0, 2060.0], [22.0, 2063.3333333333335], [23.0, 2077.0], [24.0, 2077.0], [25.0, 2058.3333333333335], [26.0, 2061.0], [27.0, 2064.0], [28.0, 2118.0], [29.0, 2065.5], [30.0, 2069.0], [31.0, 2067.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[22.49019607843137, 2063.8823529411757]], "isOverall": false, "label": "Get key gen result-Aggregated", "isController": false}, {"data": [[2.0, 229.0], [32.0, 248.0], [33.0, 285.0], [34.0, 276.0], [35.0, 284.0], [36.0, 257.0], [37.0, 265.5], [38.0, 285.5], [39.0, 364.0], [40.0, 300.0], [3.0, 283.0], [4.0, 374.0], [5.0, 271.0], [6.0, 311.0], [7.0, 278.0], [8.0, 336.0], [9.0, 329.0], [10.0, 359.0], [11.0, 343.0], [12.0, 328.0], [13.0, 283.0], [14.0, 351.0], [15.0, 258.0], [1.0, 272.0], [16.0, 277.0], [17.0, 370.0], [18.0, 308.0], [19.0, 257.0], [20.0, 325.5], [21.0, 401.0], [22.0, 308.3333333333333], [23.0, 265.0], [24.0, 265.0], [25.0, 327.0], [26.0, 317.5], [27.0, 317.0], [28.0, 270.0], [29.0, 333.5], [30.0, 291.0], [31.0, 234.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[21.92, 300.98]], "isOverall": false, "label": "Invite user-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [33.0, 0.8], [32.0, 0.625], [34.0, 1.3333333333333333], [35.0, 1.1], [37.0, 0.8], [36.0, 0.8333333333333333], [39.0, 1.2], [38.0, 1.0], [40.0, 1.4], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 0.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.6], [11.0, 1.0], [12.0, 1.0], [13.0, 0.0], [14.0, 1.0], [15.0, 1.0], [16.0, 1.0], [17.0, 0.25], [18.0, 1.4], [19.0, 1.0], [20.0, 1.2], [21.0, 0.5], [22.0, 1.0], [23.0, 1.0], [24.0, 1.0], [25.0, 0.875], [26.0, 1.0], [27.0, 1.5], [28.0, 0.6666666666666666], [29.0, 1.25], [30.0, 1.6666666666666665], [31.0, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[25.395973154362412, 0.9932885906040266]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[32.0, 46691.666666666664], [33.0, 43053.5], [35.0, 50412.166666666664], [34.0, 50185.0], [9.0, 31962.0], [36.0, 47620.0], [37.0, 48361.6], [39.0, 50688.5], [40.0, 47891.0], [11.0, 33314.0], [12.0, 32692.5], [16.0, 35107.0], [17.0, 34569.0], [21.0, 38382.0], [22.0, 38153.0], [23.0, 41024.5], [24.0, 40233.0], [26.0, 43091.5], [27.0, 42076.0], [29.0, 48030.37500000001], [30.0, 43623.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[29.679999999999993, 45120.419999999984]], "isOverall": false, "label": "User creation flow-Aggregated", "isController": true}, {"data": [[1.0, 232.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.0, 232.0]], "isOverall": false, "label": "Setup ipfs-Aggregated", "isController": false}, {"data": [[33.0, 14449.0], [32.0, 13338.0], [2.0, 19301.0], [34.0, 13223.5], [35.0, 12545.0], [37.0, 12364.0], [36.0, 10627.0], [38.0, 10804.5], [39.0, 9971.0], [40.0, 11774.0], [3.0, 19981.0], [4.0, 19775.0], [5.0, 18558.0], [6.0, 18593.0], [7.0, 20286.0], [8.0, 15934.0], [9.0, 16613.0], [10.0, 16103.0], [11.0, 12897.0], [12.0, 12003.0], [13.0, 16112.0], [14.0, 16039.0], [15.0, 16723.0], [16.0, 14841.0], [1.0, 21297.0], [17.0, 11829.0], [18.0, 12213.0], [20.0, 11359.5], [21.0, 10166.0], [22.0, 11206.666666666666], [23.0, 14036.5], [24.0, 10751.0], [25.0, 11562.0], [26.0, 10545.5], [27.0, 9426.0], [28.0, 12807.0], [29.0, 13497.0], [30.0, 11009.0], [31.0, 14377.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[22.000000000000004, 13597.040816326533]], "isOverall": false, "label": "Requests for DryRun-Aggregated", "isController": true}, {"data": [[32.0, 272.77777777777777], [33.0, 253.6], [34.0, 271.04166666666663], [35.0, 283.23076923076917], [36.0, 261.7777777777777], [37.0, 283.6363636363637], [38.0, 280.0], [39.0, 280.95081967213116], [40.0, 272.7272727272727], [8.0, 230.5], [9.0, 275.0], [10.0, 261.0], [11.0, 259.0], [12.0, 262.8], [14.0, 254.0], [15.0, 246.8], [16.0, 256.0], [17.0, 226.5], [18.0, 203.0], [19.0, 384.25], [20.0, 264.5], [21.0, 259.44444444444446], [22.0, 246.63636363636363], [23.0, 328.62499999999994], [24.0, 253.4], [25.0, 325.36842105263156], [26.0, 326.5], [27.0, 387.4], [28.0, 358.5], [29.0, 292.3095238095239], [30.0, 257.4827586206896], [31.0, 288.25]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[31.124271844660182, 280.0679611650487]], "isOverall": false, "label": "Get user link result-Aggregated", "isController": false}, {"data": [[33.0, 0.4], [32.0, 0.5], [35.0, 0.33333333333333337], [9.0, 1.0], [37.0, 1.0], [36.0, 0.33333333333333337], [39.0, 0.6666666666666666], [10.0, 1.0], [40.0, 0.75], [13.0, 1.0], [14.0, 0.0], [17.0, 0.0], [20.0, 0.0], [21.0, 1.0], [22.0, 1.0], [23.0, 1.0], [24.0, 0.5], [25.0, 1.0], [26.0, 0.0], [7.0, 1.0], [28.0, 0.0], [29.0, 0.33333333333333337], [30.0, 1.0], [31.0, 0.5]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[29.320000000000007, 0.5400000000000001]], "isOverall": false, "label": "Generate user keys-0-Aggregated", "isController": false}, {"data": [[0.0, 36307.76000000001]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 36307.76000000001]], "isOverall": false, "label": "Link user-Aggregated", "isController": true}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[8.0, 16315.0], [32.0, 26751.0], [33.0, 25620.0], [35.0, 29179.333333333332], [34.0, 28813.4], [9.0, 16389.0], [36.0, 30548.875], [37.0, 32240.0], [39.0, 30762.5], [10.0, 16049.0], [40.0, 30620.8], [12.0, 17263.0], [13.0, 17439.0], [17.0, 19374.0], [19.0, 20503.0], [21.0, 22754.5], [22.0, 22363.0], [23.0, 23768.0], [6.0, 15457.0], [24.0, 24898.0], [25.0, 24413.0], [28.0, 24535.5], [30.0, 25116.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[29.259999999999998, 26252.84]], "isOverall": false, "label": "User creation(SR side)-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [32.0, 0.0], [33.0, 0.5], [34.0, 0.0], [35.0, 0.0], [36.0, 0.0], [37.0, 0.0], [39.0, 0.0], [38.0, 0.0], [40.0, 0.0], [3.0, 0.0], [4.0, 0.0], [5.0, 0.0], [6.0, 1.0], [7.0, 1.0], [8.0, 0.0], [9.0, 1.0], [10.0, 1.0], [11.0, 0.0], [12.0, 0.0], [13.0, 0.0], [14.0, 0.0], [15.0, 0.0], [1.0, 0.0], [16.0, 1.0], [17.0, 1.0], [18.0, 0.0], [19.0, 1.0], [20.0, 0.0], [21.0, 0.6666666666666667], [22.0, 0.5], [23.0, 1.0], [24.0, 0.5], [25.0, 0.0], [26.0, 0.0], [27.0, 0.0], [28.0, 0.0], [29.0, 0.5], [30.0, 0.0], [31.0, 1.0]], "isOverall": false, "label": "Get OS SR Access Token-0", "isController": false}, {"data": [[21.76, 0.30000000000000016]], "isOverall": false, "label": "Get OS SR Access Token-0-Aggregated", "isController": false}, {"data": [[8.0, 2047.0], [32.0, 2061.0], [34.0, 2060.3333333333335], [35.0, 2056.25], [9.0, 2055.0], [36.0, 2062.714285714286], [37.0, 2069.0], [39.0, 2057.25], [10.0, 2054.0], [40.0, 2067.0], [11.0, 2058.0], [13.0, 2063.0], [15.0, 2065.0], [18.0, 2058.0], [20.0, 2070.0], [21.0, 2052.0], [22.0, 2053.0], [25.0, 2054.0], [26.0, 2046.0], [27.0, 2068.0], [29.0, 2062.25], [30.0, 2057.0], [31.0, 2061.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[29.3, 2059.38]], "isOverall": false, "label": "Get user keys-Aggregated", "isController": false}, {"data": [[33.0, 1.0], [35.0, 1.0], [34.0, 1.5], [37.0, 1.0], [36.0, 2.0], [39.0, 2.5], [40.0, 2.0], [10.0, 2.0], [11.0, 1.3333333333333333], [12.0, 2.0], [13.0, 0.5], [15.0, 2.0], [17.0, 0.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.6], [22.0, 1.5], [23.0, 2.0], [24.0, 2.5], [25.0, 1.0], [26.0, 1.0], [28.0, 1.0], [29.0, 0.5], [30.0, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[24.12244897959183, 1.3061224489795924]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[33.0, 168242.0], [35.0, 264207.3333333333], [34.0, 261233.5], [37.0, 202054.33333333334], [36.0, 280939.0], [39.0, 234859.0], [40.0, 229637.0], [10.0, 149583.0], [11.0, 147890.16666666666], [12.0, 187884.0], [13.0, 188616.5], [15.0, 188631.0], [17.0, 176927.0], [18.0, 198535.5], [19.0, 151811.0], [20.0, 213277.8], [22.0, 110409.5], [23.0, 115639.0], [24.0, 219133.0], [25.0, 171953.6], [26.0, 239971.0], [28.0, 178116.5], [29.0, 250675.5], [30.0, 240089.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[24.02, 195532.1]], "isOverall": false, "label": "Requests for Import-Aggregated", "isController": true}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0-Aggregated", "isController": false}, {"data": [[32.0, 15126.166666666666], [33.0, 16391.5], [35.0, 16317.833333333334], [34.0, 15378.0], [9.0, 13730.0], [36.0, 15962.666666666666], [37.0, 17078.0], [39.0, 16120.0], [40.0, 17610.5], [11.0, 14287.0], [12.0, 13633.5], [16.0, 15020.0], [17.0, 14320.0], [21.0, 16165.0], [22.0, 14886.0], [23.0, 15819.5], [24.0, 14021.0], [26.0, 16475.0], [27.0, 15886.0], [29.0, 17098.125], [30.0, 16428.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[29.679999999999993, 16018.96]], "isOverall": false, "label": "User creation(user side)-Aggregated", "isController": true}, {"data": [[32.0, 0.7777777777777777], [33.0, 0.857142857142857], [34.0, 1.1219512195121952], [35.0, 1.3191489361702124], [36.0, 1.2242990654205608], [37.0, 1.1463414634146345], [38.0, 1.0], [39.0, 1.178082191780822], [40.0, 1.0555555555555556], [10.0, 1.0], [11.0, 1.4285714285714286], [12.0, 1.25], [13.0, 1.7142857142857144], [14.0, 1.75], [15.0, 1.5], [16.0, 1.2], [17.0, 0.7857142857142857], [18.0, 0.625], [19.0, 1.4444444444444444], [20.0, 1.6100000000000005], [21.0, 1.4000000000000001], [22.0, 1.411764705882353], [23.0, 1.6000000000000003], [24.0, 1.0666666666666667], [25.0, 1.3239436619718312], [26.0, 1.4285714285714282], [27.0, 1.0000000000000002], [28.0, 1.0], [29.0, 1.3238095238095238], [30.0, 1.1999999999999997], [31.0, 0.5]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[29.405781584582442, 1.2548179871520346]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[2.0, 1.5], [32.0, 0.5], [33.0, 0.5], [34.0, 1.0], [35.0, 0.5], [36.0, 0.5], [37.0, 0.0], [38.0, 0.5], [39.0, 0.5], [40.0, 1.0], [3.0, 0.0], [4.0, 1.0], [5.0, 1.0], [6.0, 0.5], [7.0, 1.0], [8.0, 0.5], [9.0, 0.5], [10.0, 0.5], [11.0, 0.5], [12.0, 1.0], [13.0, 0.5], [14.0, 0.5], [15.0, 1.0], [1.0, 1.0], [16.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [20.0, 0.75], [21.0, 0.5], [22.0, 0.6666666666666666], [23.0, 0.75], [24.0, 0.0], [25.0, 0.5], [26.0, 0.75], [27.0, 0.5], [28.0, 0.0], [29.0, 0.5], [30.0, 0.0], [31.0, 0.5]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[21.712871287128714, 0.6336633663366341]], "isOverall": false, "label": "Get Admin Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 3.0], [32.0, 0.0], [33.0, 0.0], [34.0, 1.0], [35.0, 0.0], [36.0, 1.0], [37.0, 0.5], [38.0, 1.0], [39.0, 0.0], [40.0, 0.0], [3.0, 1.0], [4.0, 1.0], [5.0, 0.0], [6.0, 0.0], [7.0, 1.0], [8.0, 0.0], [9.0, 1.0], [10.0, 2.0], [11.0, 0.0], [12.0, 1.0], [13.0, 0.0], [14.0, 1.0], [15.0, 0.0], [1.0, 1.0], [16.0, 0.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [20.0, 0.5], [21.0, 0.0], [22.0, 1.0], [23.0, 0.5], [24.0, 0.0], [25.0, 0.0], [26.0, 0.5], [27.0, 0.0], [28.0, 0.0], [29.0, 0.0], [30.0, 0.0], [31.0, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[21.92, 0.5399999999999999]], "isOverall": false, "label": "Accept sr-0-Aggregated", "isController": false}, {"data": [[32.0, 0.9999999999999999], [33.0, 1.2000000000000002], [34.0, 1.2083333333333335], [35.0, 1.0384615384615388], [36.0, 1.5555555555555551], [37.0, 1.0303030303030303], [38.0, 1.0555555555555556], [39.0, 1.2950819672131146], [40.0, 1.3636363636363635], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.3333333333333333], [12.0, 1.2], [14.0, 1.3333333333333333], [15.0, 1.6], [16.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 0.75], [20.0, 1.0], [21.0, 0.8888888888888888], [22.0, 1.0000000000000002], [23.0, 1.5], [24.0, 1.2], [25.0, 1.1578947368421055], [26.0, 1.125], [27.0, 1.6], [28.0, 0.16666666666666669], [29.0, 1.297619047619048], [30.0, 1.3448275862068968], [31.0, 0.75]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[31.124271844660182, 1.2252427184466024]], "isOverall": false, "label": "Get user link result-0-Aggregated", "isController": false}, {"data": [[2.0, 2483.0], [32.0, 2483.0], [33.0, 2505.0], [34.0, 2505.0], [35.0, 2612.0], [37.0, 2486.0], [36.0, 2485.0], [38.0, 2499.5], [39.0, 2474.0], [40.0, 2507.0], [3.0, 2532.0], [4.0, 2472.0], [5.0, 2479.0], [6.0, 2519.0], [7.0, 2488.0], [8.0, 2499.0], [9.0, 2507.0], [10.0, 2495.0], [11.0, 2490.0], [12.0, 2482.0], [13.0, 2506.0], [14.0, 2510.0], [15.0, 2480.0], [1.0, 2484.0], [16.0, 2513.0], [17.0, 2480.0], [18.0, 2501.0], [19.0, 2482.0], [20.0, 2502.0], [21.0, 2492.5], [22.0, 2534.6666666666665], [23.0, 2537.0], [24.0, 2489.0], [25.0, 2539.3333333333335], [26.0, 2487.0], [27.0, 2518.0], [28.0, 2490.0], [29.0, 2494.5], [30.0, 2521.0], [31.0, 2483.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[21.84, 2503.4799999999987]], "isOverall": false, "label": "Login by SR OS-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Create new tenant-0-Aggregated", "isController": false}, {"data": [[2.0, 2039.0], [32.0, 2068.0], [33.0, 2049.0], [34.0, 2073.0], [35.0, 2064.0], [36.0, 2045.0], [37.0, 2054.6666666666665], [38.0, 2060.0], [39.0, 2057.0], [40.0, 2057.0], [3.0, 2072.0], [4.0, 2069.0], [5.0, 2053.0], [6.0, 2050.0], [7.0, 2059.0], [8.0, 2070.0], [9.0, 2061.0], [10.0, 2056.0], [11.0, 2070.0], [12.0, 2064.0], [13.0, 2057.0], [14.0, 2059.0], [15.0, 2046.0], [17.0, 2053.5], [18.0, 2057.0], [19.0, 2049.0], [20.0, 2070.0], [21.0, 2058.3333333333335], [22.0, 2052.0], [23.0, 2068.0], [24.0, 2074.0], [25.0, 2047.3333333333333], [26.0, 2055.0], [27.0, 2071.0], [28.0, 2060.0], [29.0, 2060.0], [30.0, 2056.0], [31.0, 2064.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[22.599999999999998, 2058.200000000001]], "isOverall": false, "label": "Get sr keys-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [33.0, 1.2], [32.0, 0.75], [34.0, 1.0], [35.0, 1.0], [37.0, 1.2000000000000002], [36.0, 1.3333333333333333], [39.0, 0.8], [38.0, 1.0], [40.0, 1.0], [3.0, 0.0], [4.0, 1.0], [5.0, 0.0], [6.0, 1.0], [7.0, 0.0], [8.0, 1.0], [9.0, 1.5], [10.0, 1.8], [11.0, 1.25], [12.0, 1.0], [13.0, 3.0], [14.0, 1.0], [15.0, 1.0], [16.0, 1.0], [17.0, 0.75], [18.0, 1.6], [19.0, 1.0], [20.0, 1.0], [21.0, 0.5], [22.0, 0.8], [23.0, 1.6], [24.0, 0.5], [25.0, 0.8571428571428571], [26.0, 0.25], [27.0, 0.5], [28.0, 1.0], [29.0, 1.4999999999999998], [30.0, 1.0], [31.0, 1.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[25.38926174496644, 1.0469798657718126]], "isOverall": false, "label": "Get SR Access Token-0-Aggregated", "isController": false}, {"data": [[32.0, 0.7777777777777778], [33.0, 0.6666666666666666], [35.0, 0.8888888888888888], [34.0, 0.5], [36.0, 0.8181818181818182], [37.0, 1.0], [39.0, 1.25], [40.0, 1.0], [6.0, 0.0], [8.0, 1.0], [9.0, 0.5], [10.0, 1.0], [11.0, 2.0], [12.0, 0.6666666666666666], [13.0, 1.0], [16.0, 1.0], [17.0, 0.5], [19.0, 1.0], [21.0, 0.6666666666666666], [22.0, 0.5], [23.0, 0.5], [24.0, 0.6666666666666666], [25.0, 1.0], [26.0, 1.5], [27.0, 2.0], [28.0, 1.25], [29.0, 1.25], [30.0, 1.5]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[29.470000000000002, 0.8999999999999996]], "isOverall": false, "label": "Verify link-0-Aggregated", "isController": false}, {"data": [[33.0, 108.0], [32.0, 2.0], [2.0, 0.0], [34.0, 0.5], [35.0, 0.0], [37.0, 1.0], [36.0, 0.0], [38.0, 1.5], [39.0, 1.0], [40.0, 1.0], [3.0, 1.0], [4.0, 1.0], [5.0, 2.0], [6.0, 2.0], [7.0, 3.0], [8.0, 1.0], [9.0, 1.0], [10.0, 2.0], [11.0, 1.0], [12.0, 2.0], [13.0, 1.0], [14.0, 1.0], [15.0, 2.0], [16.0, 1.0], [1.0, 2.0], [17.0, 1.0], [18.0, 2.0], [20.0, 1.5], [21.0, 2.0], [22.0, 1.0], [23.0, 1.0], [24.0, 1.0], [25.0, 0.5], [26.0, 1.0], [27.0, 2.0], [28.0, 1.0], [29.0, 2.0], [30.0, 1.5], [31.0, 1.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[22.000000000000004, 3.4081632653061233]], "isOverall": false, "label": "Dry Run Policy-0-Aggregated", "isController": false}, {"data": [[33.0, 275019.0], [32.0, 274720.0], [2.0, 168884.0], [34.0, 227636.0], [35.0, 284014.0], [37.0, 226478.5], [36.0, 291566.0], [38.0, 219942.5], [39.0, 239347.0], [40.0, 241411.0], [3.0, 168508.0], [4.0, 166840.0], [5.0, 166946.0], [6.0, 166307.0], [7.0, 166434.0], [8.0, 203818.0], [9.0, 205295.0], [10.0, 204654.0], [11.0, 201528.0], [12.0, 188930.0], [13.0, 214386.0], [14.0, 214836.0], [15.0, 215496.0], [16.0, 213941.0], [1.0, 170796.0], [17.0, 200327.0], [18.0, 252350.0], [20.0, 183733.5], [21.0, 218791.0], [22.0, 164906.33333333334], [23.0, 166177.0], [24.0, 209838.0], [25.0, 184451.5], [26.0, 188341.5], [27.0, 239779.0], [28.0, 263665.0], [29.0, 263990.0], [30.0, 193993.5], [31.0, 275462.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[22.000000000000004, 209063.3673469388]], "isOverall": false, "label": "Policy import and dry run-Aggregated", "isController": true}, {"data": [[2.0, 1685.0], [32.0, 1779.0], [33.0, 1955.0], [34.0, 1513.0], [35.0, 1667.0], [36.0, 1714.0], [37.0, 1613.5], [38.0, 1663.5], [39.0, 1721.0], [40.0, 1825.0], [3.0, 1597.0], [4.0, 1818.0], [5.0, 1741.0], [6.0, 1626.0], [7.0, 1785.0], [8.0, 1622.0], [9.0, 1620.0], [10.0, 1832.0], [11.0, 1723.0], [12.0, 1668.0], [13.0, 1605.0], [14.0, 1649.0], [15.0, 1772.0], [1.0, 1738.0], [16.0, 1624.0], [17.0, 1652.0], [18.0, 1740.0], [19.0, 1705.0], [20.0, 1746.0], [21.0, 1567.0], [22.0, 1841.6666666666667], [23.0, 1664.5], [24.0, 1601.0], [25.0, 1586.5], [26.0, 1696.5], [27.0, 1608.0], [28.0, 1618.0], [29.0, 1808.0], [30.0, 1714.0], [31.0, 1573.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[21.92, 1693.04]], "isOverall": false, "label": "Invite and accept SR-Aggregated", "isController": true}, {"data": [[0.0, 163035.85999999993]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 163035.85999999993]], "isOverall": false, "label": "Link SR-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [32.0, 1.0], [33.0, 0.0], [34.0, 0.0], [35.0, 0.0], [36.0, 0.0], [37.0, 0.0], [38.0, 0.5], [39.0, 0.0], [40.0, 0.5], [3.0, 1.0], [4.0, 0.0], [5.0, 0.0], [6.0, 0.0], [7.0, 0.0], [8.0, 0.0], [9.0, 0.0], [10.0, 1.0], [11.0, 0.0], [12.0, 1.0], [13.0, 0.0], [14.0, 0.0], [15.0, 0.0], [16.0, 0.5], [17.0, 0.0], [18.0, 0.0], [19.0, 0.0], [20.0, 0.5], [21.0, 1.0], [22.0, 0.0], [23.0, 0.0], [24.0, 1.0], [25.0, 0.33333333333333337], [26.0, 0.0], [27.0, 1.0], [28.0, 0.0], [29.0, 0.0], [30.0, 0.0], [31.0, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[22.49019607843137, 0.25490196078431376]], "isOverall": false, "label": "Get key gen result-0-Aggregated", "isController": false}, {"data": [[2.0, 506.0], [32.0, 699.0], [33.0, 912.0], [34.0, 546.0], [35.0, 562.0], [36.0, 597.0], [37.0, 593.5], [38.0, 569.5], [39.0, 601.0], [40.0, 759.0], [3.0, 547.0], [4.0, 560.0], [5.0, 613.0], [6.0, 518.0], [7.0, 552.0], [8.0, 546.0], [9.0, 527.0], [10.0, 546.0], [11.0, 611.0], [12.0, 560.0], [13.0, 550.0], [14.0, 583.0], [15.0, 605.0], [1.0, 581.0], [16.0, 540.0], [17.0, 576.0], [18.0, 573.0], [19.0, 590.0], [20.0, 587.5], [21.0, 553.0], [22.0, 790.3333333333334], [23.0, 610.0], [24.0, 529.0], [25.0, 584.5], [26.0, 610.0], [27.0, 554.0], [28.0, 609.0], [29.0, 673.5], [30.0, 577.0], [31.0, 564.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[21.92, 602.4000000000001]], "isOverall": false, "label": "Accept sr-Aggregated", "isController": false}, {"data": [[2.0, 2712.0], [32.0, 2857.0], [33.0, 3324.0], [34.0, 2612.0], [35.0, 2778.0], [36.0, 2788.0], [37.0, 2693.0], [38.0, 2796.0], [39.0, 2878.0], [40.0, 2951.0], [3.0, 2687.0], [4.0, 2993.0], [5.0, 2824.0], [6.0, 2810.0], [7.0, 2843.0], [8.0, 2764.0], [9.0, 2815.0], [10.0, 3022.0], [11.0, 2913.0], [12.0, 2901.0], [13.0, 2796.0], [14.0, 2835.0], [15.0, 2910.0], [1.0, 2775.0], [16.0, 2782.0], [17.0, 2839.0], [18.0, 2921.0], [19.0, 2830.0], [20.0, 2862.5], [21.0, 2746.0], [22.0, 3320.6666666666665], [23.0, 2757.0], [24.0, 2741.0], [25.0, 2790.3333333333335], [26.0, 2749.0], [27.0, 2828.0], [28.0, 2705.0], [29.0, 2957.0], [30.0, 2802.0], [31.0, 2624.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[21.899999999999995, 2848.6199999999994]], "isOverall": false, "label": "User creation(admin side)-Aggregated", "isController": true}, {"data": [[8.0, 1.0], [33.0, 0.0], [32.0, 0.6666666666666666], [34.0, 0.4], [35.0, 0.5], [9.0, 0.0], [36.0, 0.25], [37.0, 1.0], [39.0, 0.0], [10.0, 0.0], [40.0, 0.2], [12.0, 1.0], [14.0, 0.0], [17.0, 0.0], [19.0, 1.0], [21.0, 0.0], [22.0, 1.0], [23.0, 0.5], [24.0, 0.0], [25.0, 0.0], [26.0, 0.0], [7.0, 0.0], [28.0, 0.25], [31.0, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[29.32000000000001, 0.32000000000000006]], "isOverall": false, "label": "Login by user OS-0-Aggregated", "isController": false}, {"data": [[32.0, 350.05555555555554], [33.0, 361.57142857142856], [34.0, 373.7317073170732], [35.0, 361.17021276595744], [36.0, 363.8411214953272], [37.0, 354.41463414634154], [38.0, 349.58333333333337], [39.0, 350.02739726027403], [40.0, 337.88888888888886], [10.0, 572.0], [11.0, 356.85714285714283], [12.0, 356.25], [13.0, 279.28571428571433], [14.0, 520.0], [15.0, 335.375], [16.0, 392.4], [17.0, 327.8571428571429], [18.0, 324.0], [19.0, 279.8888888888889], [20.0, 338.6499999999999], [21.0, 351.0], [22.0, 408.4117647058823], [23.0, 321.55], [24.0, 296.46666666666664], [25.0, 367.4366197183099], [26.0, 340.3095238095239], [27.0, 351.96], [28.0, 303.6666666666667], [29.0, 370.41904761904766], [30.0, 340.525], [31.0, 307.375]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[29.405781584582442, 352.9668094218415]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[1.0, 356.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.0, 356.0]], "isOverall": false, "label": "Create new tenant-Aggregated", "isController": false}, {"data": [[32.0, 2067.5], [33.0, 2062.0], [34.0, 2061.0], [35.0, 2059.6], [9.0, 2071.0], [36.0, 2063.8571428571427], [37.0, 2068.0], [39.0, 2062.5], [10.0, 2048.0], [40.0, 2056.6666666666665], [11.0, 2057.0], [13.0, 2056.0], [14.0, 2066.0], [18.0, 2068.0], [20.0, 2052.0], [22.0, 2056.6666666666665], [24.0, 2063.0], [25.0, 2050.0], [26.0, 2055.0], [27.0, 2069.0], [7.0, 2067.0], [29.0, 2058.75], [30.0, 2067.6666666666665], [31.0, 2056.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[29.319999999999993, 2061.4999999999995]], "isOverall": false, "label": "Get user key gen result-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [32.0, 1.0], [33.0, 0.0], [34.0, 0.5], [35.0, 0.75], [9.0, 1.0], [36.0, 0.7142857142857143], [38.0, 1.0], [39.0, 1.0], [10.0, 1.0], [40.0, 1.3333333333333333], [11.0, 1.0], [13.0, 1.0], [15.0, 1.0], [18.0, 1.0], [20.0, 2.0], [21.0, 1.0], [22.0, 1.5], [25.0, 1.3333333333333333], [26.0, 1.0], [27.0, 1.0], [29.0, 0.75], [30.0, 0.8571428571428572]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[29.24, 0.9400000000000004]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[8.0, 0.0], [32.0, 1.0], [33.0, 1.0], [34.0, 1.5], [35.0, 3.0], [9.0, 1.0], [36.0, 1.5714285714285714], [38.0, 0.0], [39.0, 1.5], [10.0, 1.0], [40.0, 1.0], [11.0, 1.0], [13.0, 2.0], [15.0, 1.0], [18.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 1.0], [25.0, 1.6666666666666667], [26.0, 1.0], [27.0, 1.0], [29.0, 0.75], [30.0, 0.8571428571428571]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[29.24, 1.2799999999999996]], "isOverall": false, "label": "Get User Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 1.0], [33.0, 1.0], [34.0, 0.0], [35.0, 1.0], [36.0, 1.5], [37.0, 1.5], [38.0, 1.0], [39.0, 2.0], [40.0, 1.5], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 0.0], [11.0, 2.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 0.0], [17.0, 1.5], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 0.3333333333333333], [22.0, 1.0], [23.0, 1.0], [24.0, 0.5], [25.0, 0.0], [26.0, 1.0], [27.0, 1.0], [28.0, 1.0], [29.0, 0.5], [30.0, 1.0], [31.0, 1.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[22.559999999999995, 0.94]], "isOverall": false, "label": "Link SR profile-0-Aggregated", "isController": false}, {"data": [[2.0, 3.0], [32.0, 0.0], [33.0, 0.0], [34.0, 0.5], [35.0, 1.0], [36.0, 1.0], [37.0, 0.5], [38.0, 1.0], [39.0, 1.0], [40.0, 1.0], [3.0, 1.0], [4.0, 0.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 1.0], [9.0, 0.0], [10.0, 1.0], [11.0, 1.0], [12.0, 1.0], [13.0, 0.0], [14.0, 1.0], [15.0, 1.0], [1.0, 0.0], [16.0, 1.0], [17.0, 1.0], [18.0, 0.0], [19.0, 1.0], [20.0, 0.5], [21.0, 0.0], [22.0, 0.6666666666666666], [23.0, 1.0], [24.0, 1.0], [25.0, 0.3333333333333333], [26.0, 0.0], [27.0, 1.0], [28.0, 1.0], [29.0, 0.5], [30.0, 1.0], [31.0, 1.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[21.899999999999995, 0.7200000000000001]], "isOverall": false, "label": "Accept user-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 0.0], [33.0, 1.0], [34.0, 0.0], [35.0, 0.0], [36.0, 0.0], [37.0, 0.0], [38.0, 1.0], [39.0, 0.0], [40.0, 0.5], [3.0, 0.0], [4.0, 1.0], [5.0, 0.0], [6.0, 1.0], [7.0, 0.0], [8.0, 0.0], [9.0, 0.0], [10.0, 1.0], [11.0, 0.0], [12.0, 0.0], [13.0, 2.0], [14.0, 1.0], [15.0, 0.0], [17.0, 0.0], [18.0, 0.0], [19.0, 0.0], [20.0, 0.0], [21.0, 0.6666666666666667], [22.0, 0.0], [23.0, 1.0], [24.0, 0.0], [25.0, 0.33333333333333337], [26.0, 1.0], [27.0, 1.0], [28.0, 0.0], [29.0, 0.5], [30.0, 1.0], [31.0, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[22.599999999999998, 0.3799999999999999]], "isOverall": false, "label": "Get sr keys-0-Aggregated", "isController": false}, {"data": [[8.0, 2508.0], [33.0, 2505.0], [32.0, 2505.6666666666665], [34.0, 2643.0], [35.0, 2535.25], [9.0, 2481.0], [36.0, 2536.375], [37.0, 2495.0], [39.0, 2516.0], [10.0, 2494.0], [40.0, 2509.2], [12.0, 2587.0], [14.0, 2493.0], [17.0, 2566.0], [19.0, 2472.0], [21.0, 2494.0], [22.0, 2521.0], [23.0, 2585.5], [24.0, 2499.0], [25.0, 2486.0], [26.0, 2499.0], [7.0, 2501.0], [28.0, 2547.75], [31.0, 2505.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[29.32000000000001, 2534.08]], "isOverall": false, "label": "Login by user OS-Aggregated", "isController": false}, {"data": [[32.0, 0.8541666666666667], [33.0, 0.764705882352941], [34.0, 0.9411764705882354], [35.0, 0.8484848484848485], [36.0, 0.8201438848920868], [37.0, 0.8102564102564103], [38.0, 1.5966386554621848], [39.0, 1.2098765432098761], [40.0, 0.9553072625698324], [3.0, 1.0], [4.0, 0.8333333333333334], [5.0, 1.3333333333333333], [6.0, 0.6666666666666666], [7.0, 0.9166666666666667], [8.0, 1.8571428571428577], [9.0, 0.7857142857142856], [10.0, 1.153846153846154], [11.0, 1.1333333333333335], [12.0, 1.0000000000000002], [13.0, 0.8888888888888888], [14.0, 0.8888888888888888], [15.0, 0.9523809523809523], [16.0, 1.3750000000000002], [17.0, 0.7916666666666666], [18.0, 0.8888888888888888], [19.0, 0.8666666666666666], [20.0, 0.9365079365079364], [21.0, 0.846153846153846], [22.0, 0.8265306122448979], [23.0, 0.80327868852459], [24.0, 0.818181818181818], [25.0, 0.8000000000000002], [26.0, 1.0363636363636364], [27.0, 0.7755102040816327], [28.0, 0.7857142857142855], [29.0, 0.7926829268292681], [30.0, 0.7872340425531915], [31.0, 0.7234042553191486]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[30.607274213322466, 0.9464650592562336]], "isOverall": false, "label": "Get SR link result-0-Aggregated", "isController": false}, {"data": [[0.0, 13794.579999999998]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[0.0, 13794.579999999998]], "isOverall": false, "label": "Generate user hedera data-Aggregated", "isController": true}, {"data": [[32.0, 286.0], [33.0, 261.0], [35.0, 308.55555555555554], [34.0, 266.0], [36.0, 266.09090909090907], [37.0, 307.4285714285714], [39.0, 276.25], [40.0, 282.85714285714283], [6.0, 264.0], [8.0, 245.0], [9.0, 267.0], [10.0, 206.0], [11.0, 244.0], [12.0, 254.0], [13.0, 225.0], [16.0, 272.0], [17.0, 297.5], [19.0, 318.0], [21.0, 270.6666666666667], [22.0, 251.5], [23.0, 283.0], [24.0, 260.6666666666667], [25.0, 295.0], [26.0, 325.0], [27.0, 296.0], [28.0, 243.0], [29.0, 314.875], [30.0, 243.5]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[29.470000000000002, 280.07]], "isOverall": false, "label": "Verify link-Aggregated", "isController": false}, {"data": [[1.0, 802.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.0, 802.0]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[2.0, 297.0], [33.0, 258.6], [32.0, 263.0], [34.0, 235.33333333333334], [35.0, 269.2], [37.0, 261.9], [36.0, 243.16666666666669], [39.0, 245.4], [38.0, 239.0], [40.0, 279.2], [3.0, 243.0], [4.0, 218.0], [5.0, 237.0], [6.0, 244.0], [7.0, 232.0], [8.0, 257.0], [9.0, 256.0], [10.0, 266.2], [11.0, 267.25], [12.0, 236.57142857142856], [13.0, 232.0], [14.0, 231.0], [15.0, 245.0], [16.0, 226.0], [17.0, 298.75], [18.0, 239.8], [19.0, 250.0], [20.0, 241.2], [21.0, 246.75], [22.0, 232.2], [23.0, 281.4], [24.0, 260.75], [25.0, 243.28571428571428], [26.0, 231.75], [27.0, 267.5], [28.0, 227.33333333333334], [29.0, 308.50000000000006], [30.0, 246.66666666666666], [31.0, 269.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[25.38926174496644, 258.1610738255035]], "isOverall": false, "label": "Get SR Access Token-Aggregated", "isController": false}, {"data": [[0.0, 13864.819999999998]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[0.0, 13864.819999999998]], "isOverall": false, "label": "Generate sr hedera data-Aggregated", "isController": true}, {"data": [[2.0, 557.0], [33.0, 880.4], [32.0, 784.0], [34.0, 745.6666666666666], [35.0, 845.0], [37.0, 719.6], [36.0, 633.3333333333334], [39.0, 589.2], [38.0, 545.0], [40.0, 671.6], [3.0, 533.0], [4.0, 548.0], [5.0, 565.0], [6.0, 574.0], [7.0, 569.0], [8.0, 579.0], [9.0, 583.0], [10.0, 831.8], [11.0, 596.5], [12.0, 682.4285714285714], [13.0, 633.0], [14.0, 580.0], [15.0, 560.5], [16.0, 514.0], [17.0, 618.5], [18.0, 763.2], [19.0, 579.5], [20.0, 673.6], [21.0, 605.0], [22.0, 1018.6], [23.0, 1013.6], [24.0, 673.0], [25.0, 623.75], [26.0, 887.5], [27.0, 634.5], [28.0, 584.6666666666666], [29.0, 1831.0], [30.0, 638.6666666666666], [31.0, 665.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[25.395973154362412, 805.3691275167782]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[33.0, 1.0], [32.0, 0.0], [34.0, 0.75], [35.0, 0.0], [37.0, 1.0], [36.0, 0.5], [39.0, 0.0], [40.0, 0.6], [7.0, 0.0], [8.0, 1.0], [9.0, 0.0], [10.0, 1.0], [12.0, 1.0], [14.0, 1.0], [17.0, 0.0], [19.0, 0.0], [21.0, 0.5], [22.0, 0.0], [24.0, 0.6666666666666667], [25.0, 0.0], [26.0, 1.0], [28.0, 1.0], [29.0, 1.0], [30.0, 0.0], [31.0, 0.0]], "isOverall": false, "label": "Get OS user Access Token-0", "isController": false}, {"data": [[29.299999999999997, 0.4799999999999998]], "isOverall": false, "label": "Get OS user Access Token-0-Aggregated", "isController": false}, {"data": [[32.0, 0.75], [33.0, 1.0], [34.0, 1.0], [35.0, 0.6], [9.0, 1.0], [36.0, 0.28571428571428575], [37.0, 0.0], [39.0, 0.0], [10.0, 0.0], [40.0, 0.33333333333333337], [11.0, 0.0], [13.0, 0.0], [14.0, 1.0], [18.0, 1.0], [20.0, 1.0], [22.0, 0.6666666666666666], [24.0, 0.5], [25.0, 1.0], [26.0, 0.0], [27.0, 1.0], [7.0, 1.0], [29.0, 0.5], [30.0, 0.6666666666666667], [31.0, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[29.319999999999993, 0.5]], "isOverall": false, "label": "Get user key gen result-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [32.0, 0.0], [33.0, 0.5], [34.0, 0.0], [35.0, 1.0], [37.0, 0.0], [36.0, 0.0], [38.0, 0.0], [39.0, 0.0], [40.0, 0.0], [3.0, 1.0], [4.0, 0.0], [5.0, 0.0], [6.0, 0.0], [7.0, 1.0], [8.0, 0.0], [9.0, 0.0], [10.0, 1.0], [11.0, 0.0], [12.0, 0.0], [13.0, 0.0], [14.0, 0.0], [15.0, 0.0], [1.0, 0.0], [16.0, 1.0], [17.0, 1.0], [18.0, 0.0], [19.0, 0.0], [20.0, 0.0], [21.0, 0.0], [22.0, 0.3333333333333333], [23.0, 0.0], [24.0, 0.0], [25.0, 0.0], [26.0, 0.0], [27.0, 1.0], [28.0, 0.0], [29.0, 0.5], [30.0, 0.0], [31.0, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[21.84, 0.20000000000000004]], "isOverall": false, "label": "Login by SR OS-0-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [32.0, 1.0], [33.0, 1.0], [34.0, 1.5], [35.0, 0.75], [9.0, 0.0], [36.0, 0.7142857142857143], [38.0, 0.0], [39.0, 1.0], [10.0, 1.0], [40.0, 1.3333333333333333], [11.0, 0.0], [13.0, 0.0], [15.0, 2.0], [18.0, 3.0], [19.0, 1.0], [21.0, 3.0], [22.0, 1.0], [25.0, 1.6666666666666667], [26.0, 1.0], [27.0, 1.0], [29.0, 0.5], [30.0, 0.8571428571428572]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[29.22, 0.9800000000000004]], "isOverall": false, "label": "Get SR DID-0-Aggregated", "isController": false}, {"data": [[8.0, 0.0], [32.0, 1.0], [34.0, 0.3333333333333333], [35.0, 0.75], [9.0, 0.0], [36.0, 0.2857142857142857], [37.0, 1.0], [39.0, 0.5], [10.0, 1.0], [40.0, 0.6666666666666667], [11.0, 1.0], [13.0, 0.0], [15.0, 1.0], [18.0, 0.0], [20.0, 0.0], [21.0, 0.0], [22.0, 0.0], [25.0, 0.33333333333333337], [26.0, 0.0], [27.0, 0.0], [29.0, 0.5], [30.0, 0.5], [31.0, 0.6666666666666667]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[29.3, 0.44]], "isOverall": false, "label": "Get user keys-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 40.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 121.18333333333334, "minX": 1.73434752E12, "maxY": 184290.81666666668, "series": [{"data": [[1.73434794E12, 163357.76666666666], [1.73434824E12, 120511.6], [1.7343483E12, 79987.08333333333], [1.73434764E12, 70655.46666666666], [1.73434818E12, 184290.81666666668], [1.73434752E12, 8233.6], [1.73434758E12, 41844.7], [1.73434788E12, 149980.86666666667], [1.73434842E12, 8190.466666666666], [1.73434776E12, 115456.81666666667], [1.73434782E12, 131259.85], [1.73434812E12, 168192.08333333334], [1.7343477E12, 86932.26666666666], [1.734348E12, 174524.2], [1.73434806E12, 182614.81666666668], [1.73434836E12, 95249.38333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73434794E12, 6694.316666666667], [1.73434824E12, 2953.983333333333], [1.7343483E12, 1936.8833333333334], [1.73434764E12, 3328.0], [1.73434818E12, 5460.15], [1.73434752E12, 574.5], [1.73434758E12, 2228.6], [1.73434788E12, 6174.816666666667], [1.73434842E12, 121.18333333333334], [1.73434776E12, 5050.45], [1.73434782E12, 5618.416666666667], [1.73434812E12, 5668.85], [1.7343477E12, 3973.4666666666667], [1.734348E12, 7125.666666666667], [1.73434806E12, 6557.533333333334], [1.73434836E12, 2410.75]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73434842E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73434752E12, "maxY": 280939.0, "series": [{"data": [[1.73434794E12, 0.6666666666666667], [1.73434776E12, 0.6666666666666667], [1.73434782E12, 0.33333333333333337], [1.73434764E12, 0.6666666666666666], [1.7343477E12, 0.5], [1.734348E12, 0.6], [1.73434752E12, 0.6666666666666667], [1.73434758E12, 0.5], [1.73434788E12, 0.16666666666666669]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73434794E12, 244.11111111111111], [1.73434776E12, 259.77777777777777], [1.73434782E12, 254.0], [1.73434812E12, 264.0], [1.73434764E12, 249.90000000000003], [1.73434818E12, 276.74999999999994], [1.7343477E12, 245.25], [1.734348E12, 252.49999999999997], [1.73434752E12, 331.5], [1.73434806E12, 264.1666666666667], [1.73434758E12, 274.875], [1.73434788E12, 246.90909090909088]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73434794E12, 272.8333333333333], [1.73434776E12, 275.8333333333333], [1.73434782E12, 253.66666666666666], [1.73434764E12, 245.5], [1.7343477E12, 272.3333333333333], [1.734348E12, 252.33333333333334], [1.73434752E12, 237.0], [1.73434758E12, 266.6666666666667], [1.73434788E12, 246.66666666666669]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73434794E12, 0.5], [1.73434776E12, 0.6666666666666666], [1.73434782E12, 0.33333333333333337], [1.73434764E12, 0.5], [1.7343477E12, 0.6666666666666666], [1.734348E12, 0.8], [1.73434752E12, 1.0], [1.73434758E12, 0.5], [1.73434788E12, 0.33333333333333337]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73434794E12, 1.0], [1.73434776E12, 0.6666666666666666], [1.73434782E12, 1.0], [1.73434812E12, 1.5], [1.73434764E12, 0.8], [1.73434818E12, 0.8333333333333334], [1.7343477E12, 1.5], [1.734348E12, 1.0], [1.73434806E12, 1.1666666666666665], [1.73434758E12, 0.0], [1.73434788E12, 1.4]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73434794E12, 1.0], [1.73434824E12, 1.4285714285714286], [1.73434776E12, 0.75], [1.73434782E12, 1.75], [1.73434812E12, 1.4], [1.73434764E12, 1.3333333333333333], [1.73434818E12, 1.090909090909091], [1.7343477E12, 1.0], [1.734348E12, 1.75], [1.73434806E12, 1.5], [1.73434758E12, 1.0], [1.73434788E12, 1.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73434794E12, 485.33333333333326], [1.73434776E12, 495.5], [1.73434782E12, 489.91666666666663], [1.73434764E12, 527.4166666666667], [1.7343477E12, 526.3333333333334], [1.734348E12, 497.70000000000005], [1.73434752E12, 454.5714285714286], [1.73434758E12, 520.5000000000001], [1.73434788E12, 503.75000000000006]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73434794E12, 1.1111111111111112], [1.73434776E12, 0.6666666666666666], [1.73434782E12, 0.7272727272727273], [1.73434812E12, 1.0], [1.73434764E12, 1.2], [1.73434818E12, 1.0833333333333333], [1.7343477E12, 0.75], [1.734348E12, 0.9999999999999999], [1.73434752E12, 1.0], [1.73434806E12, 1.1666666666666665], [1.73434758E12, 2.25], [1.73434788E12, 0.7272727272727273]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73434794E12, 262.6], [1.73434824E12, 420.71428571428567], [1.73434776E12, 322.5], [1.73434782E12, 291.0], [1.73434812E12, 274.2], [1.73434764E12, 299.3333333333333], [1.73434818E12, 360.72727272727275], [1.7343477E12, 514.5], [1.734348E12, 259.5], [1.73434806E12, 224.0], [1.73434758E12, 223.0], [1.73434788E12, 254.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73434794E12, 310.3333333333333], [1.73434776E12, 315.1666666666667], [1.73434782E12, 329.5], [1.73434764E12, 341.8333333333333], [1.7343477E12, 354.3333333333333], [1.734348E12, 331.6], [1.73434752E12, 392.3333333333333], [1.73434758E12, 375.0], [1.73434788E12, 348.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73434794E12, 2064.5], [1.73434776E12, 2064.3333333333335], [1.73434782E12, 2059.2], [1.73434812E12, 2059.0], [1.73434764E12, 2061.0], [1.73434818E12, 2058.7499999999995], [1.7343477E12, 2051.0], [1.734348E12, 2062.3333333333335], [1.73434806E12, 2064.25], [1.73434758E12, 2051.0], [1.73434788E12, 2057.8]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73434794E12, 2059.25], [1.73434776E12, 2059.6666666666665], [1.73434782E12, 2067.6], [1.73434812E12, 2063.1666666666665], [1.73434764E12, 2056.3333333333335], [1.73434818E12, 2064.8333333333335], [1.7343477E12, 2057.5], [1.734348E12, 2060.6666666666665], [1.73434806E12, 2068.25], [1.73434758E12, 2058.6666666666665], [1.73434788E12, 2061.2]], "isOverall": false, "label": "Get OS user Access Token", "isController": false}, {"data": [[1.73434794E12, 2061.3333333333335], [1.73434776E12, 2063.3333333333335], [1.73434782E12, 2063.166666666667], [1.73434764E12, 2060.833333333333], [1.7343477E12, 2061.1666666666665], [1.734348E12, 2056.4], [1.73434752E12, 2061.3333333333335], [1.73434758E12, 2064.6666666666665], [1.73434788E12, 2061.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73434794E12, 239.0], [1.73434824E12, 320.5], [1.73434776E12, 256.6666666666667], [1.7343483E12, 244.8], [1.73434782E12, 254.5], [1.73434812E12, 313.0], [1.73434818E12, 236.5], [1.7343477E12, 303.0], [1.734348E12, 222.0], [1.73434806E12, 263.3333333333333], [1.73434788E12, 212.0], [1.73434836E12, 248.63157894736838]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73434752E12, 1619.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.73434794E12, 0.6666666666666666], [1.73434776E12, 0.33333333333333337], [1.73434782E12, 0.33333333333333337], [1.73434764E12, 0.6666666666666666], [1.7343477E12, 0.33333333333333337], [1.734348E12, 0.4], [1.73434752E12, 0.3333333333333333], [1.73434758E12, 0.33333333333333337], [1.73434788E12, 0.8333333333333334]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73434794E12, 2065.5], [1.73434776E12, 2062.5], [1.73434782E12, 2063.333333333333], [1.73434764E12, 2060.1666666666665], [1.7343477E12, 2056.5], [1.734348E12, 2059.8], [1.73434752E12, 2059.6666666666665], [1.73434758E12, 2060.1666666666665], [1.73434788E12, 2059.0]], "isOverall": false, "label": "Get OS SR Access Token", "isController": false}, {"data": [[1.73434794E12, 10981.0], [1.73434824E12, 9645.333333333334], [1.7343483E12, 10591.0], [1.73434818E12, 11940.142857142857], [1.73434788E12, 10727.0], [1.73434842E12, 17914.33333333333], [1.73434776E12, 10854.0], [1.73434782E12, 10192.5], [1.73434812E12, 11639.0], [1.7343477E12, 10142.0], [1.734348E12, 11360.5], [1.73434806E12, 9455.0], [1.73434836E12, 13106.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73434794E12, 1133.6666666666667], [1.73434776E12, 1300.1666666666667], [1.73434782E12, 1152.3333333333333], [1.73434764E12, 1188.0], [1.7343477E12, 1147.3333333333333], [1.734348E12, 1131.4], [1.73434752E12, 1051.3333333333333], [1.73434758E12, 1139.5], [1.73434788E12, 1100.3333333333333]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73434794E12, 278.1521035598705], [1.73434776E12, 289.4577777777778], [1.73434782E12, 281.1445783132532], [1.73434812E12, 303.8775510204079], [1.73434764E12, 281.60784313725475], [1.73434818E12, 292.5324675324677], [1.7343477E12, 278.92771084337346], [1.734348E12, 279.04736842105297], [1.73434752E12, 219.33333333333334], [1.73434806E12, 277.32768361581924], [1.73434758E12, 271.2985074626866], [1.73434788E12, 271.31481481481484]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73434794E12, 284.6666666666667], [1.73434776E12, 271.0], [1.73434782E12, 260.6], [1.73434812E12, 262.0], [1.73434764E12, 276.0], [1.73434818E12, 322.66666666666663], [1.7343477E12, 258.5], [1.734348E12, 246.5], [1.73434806E12, 243.33333333333331], [1.73434758E12, 275.0], [1.73434788E12, 241.6]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73434794E12, 611.8333333333333], [1.73434776E12, 730.8333333333333], [1.73434782E12, 581.6666666666666], [1.73434764E12, 603.3333333333334], [1.7343477E12, 556.3333333333333], [1.734348E12, 587.2], [1.73434752E12, 542.0], [1.73434758E12, 556.3333333333333], [1.73434788E12, 543.8333333333334]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73434794E12, 911.0], [1.73434776E12, 760.0], [1.73434782E12, 838.2], [1.73434812E12, 1069.1666666666665], [1.73434764E12, 591.5], [1.73434818E12, 1460.0833333333333], [1.7343477E12, 879.0], [1.734348E12, 848.0], [1.73434806E12, 912.5], [1.73434758E12, 819.5], [1.73434788E12, 836.8]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73434794E12, 296.3333333333333], [1.73434776E12, 259.0], [1.73434782E12, 274.0], [1.73434812E12, 255.00000000000003], [1.73434764E12, 248.25], [1.73434818E12, 281.83333333333337], [1.7343477E12, 288.0], [1.734348E12, 242.5], [1.73434806E12, 262.66666666666663], [1.73434758E12, 228.0], [1.73434788E12, 254.2]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73434794E12, 240.33333333333334], [1.73434776E12, 265.0], [1.73434782E12, 253.8], [1.73434812E12, 268.83333333333337], [1.73434764E12, 255.2], [1.73434818E12, 276.4166666666667], [1.7343477E12, 259.5], [1.734348E12, 321.0], [1.73434806E12, 242.33333333333334], [1.73434758E12, 219.0], [1.73434788E12, 246.2]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73434794E12, 2057.0], [1.73434776E12, 2064.5], [1.73434782E12, 2062.833333333333], [1.73434764E12, 2068.0], [1.7343477E12, 2061.714285714286], [1.734348E12, 2058.6666666666665], [1.73434752E12, 2066.5], [1.73434758E12, 2063.666666666667], [1.73434788E12, 2074.1666666666665]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73434794E12, 275.0], [1.73434776E12, 309.33333333333337], [1.73434782E12, 311.83333333333337], [1.73434764E12, 320.33333333333337], [1.7343477E12, 310.5], [1.734348E12, 298.8], [1.73434752E12, 261.3333333333333], [1.73434758E12, 316.5], [1.73434788E12, 285.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73434794E12, 0.6666666666666666], [1.73434824E12, 1.4545454545454544], [1.7343483E12, 0.8], [1.73434764E12, 0.7777777777777778], [1.73434818E12, 1.235294117647059], [1.73434752E12, 0.5], [1.73434758E12, 0.8571428571428572], [1.73434788E12, 0.45454545454545453], [1.73434776E12, 0.9230769230769231], [1.73434782E12, 1.0], [1.73434812E12, 1.0], [1.7343477E12, 0.5555555555555556], [1.734348E12, 1.090909090909091], [1.73434806E12, 1.2], [1.73434836E12, 1.4210526315789476]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73434794E12, 49580.0], [1.73434776E12, 44666.0], [1.73434782E12, 49439.833333333336], [1.73434764E12, 39763.4], [1.7343477E12, 43606.33333333333], [1.734348E12, 49062.0], [1.73434806E12, 47113.75], [1.73434758E12, 33389.5], [1.73434788E12, 49953.8]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73434752E12, 232.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73434794E12, 12211.0], [1.73434824E12, 11910.0], [1.7343483E12, 11399.0], [1.73434818E12, 12866.714285714286], [1.73434788E12, 11523.0], [1.73434842E12, 18926.444444444445], [1.73434776E12, 12083.666666666666], [1.73434782E12, 11090.0], [1.73434812E12, 12512.0], [1.7343477E12, 10956.0], [1.734348E12, 12234.0], [1.73434806E12, 10367.333333333334], [1.73434836E12, 14052.300000000001]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73434794E12, 248.59999999999994], [1.73434824E12, 307.5714285714285], [1.73434776E12, 274.1785714285714], [1.73434782E12, 324.2702702702703], [1.73434812E12, 262.0483870967742], [1.73434764E12, 256.68181818181813], [1.73434818E12, 284.5294117647059], [1.7343477E12, 278.3333333333333], [1.734348E12, 297.53658536585357], [1.73434806E12, 272.3088235294119], [1.73434758E12, 245.33333333333334], [1.73434788E12, 275.15625000000017]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73434794E12, 0.25], [1.73434776E12, 1.0], [1.73434782E12, 0.6], [1.73434812E12, 0.33333333333333337], [1.73434764E12, 0.75], [1.73434818E12, 0.49999999999999994], [1.7343477E12, 0.0], [1.734348E12, 0.6666666666666666], [1.73434806E12, 0.75], [1.73434758E12, 1.0], [1.73434788E12, 0.4]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73434794E12, 46966.0], [1.73434824E12, 40974.28571428572], [1.73434776E12, 33605.0], [1.73434782E12, 31333.75], [1.73434812E12, 41728.6], [1.73434764E12, 17210.0], [1.73434818E12, 30041.636363636364], [1.7343477E12, 28026.5], [1.734348E12, 57252.25], [1.73434806E12, 40014.0], [1.73434758E12, 12062.0], [1.73434788E12, 40008.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73434752E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73434794E12, 30774.0], [1.73434776E12, 25463.0], [1.73434782E12, 30114.333333333332], [1.73434764E12, 22651.833333333336], [1.7343477E12, 24824.666666666668], [1.734348E12, 29011.714285714286], [1.73434752E12, 15886.0], [1.73434806E12, 26044.0], [1.73434758E12, 17302.8], [1.73434788E12, 31287.666666666668]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73434794E12, 0.16666666666666669], [1.73434776E12, 0.6666666666666666], [1.73434782E12, 0.16666666666666669], [1.73434764E12, 0.16666666666666669], [1.7343477E12, 0.5], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.5], [1.73434788E12, 0.33333333333333337]], "isOverall": false, "label": "Get OS SR Access Token-0", "isController": false}, {"data": [[1.73434794E12, 2059.3333333333335], [1.73434776E12, 2052.6666666666665], [1.73434782E12, 2055.2], [1.73434812E12, 2062.3333333333335], [1.73434764E12, 2060.0], [1.73434818E12, 2058.666666666667], [1.7343477E12, 2064.0], [1.734348E12, 2072.5], [1.73434806E12, 2059.0], [1.73434758E12, 2051.0], [1.73434788E12, 2062.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73434794E12, 1.0], [1.73434824E12, 0.75], [1.73434776E12, 1.6666666666666667], [1.7343483E12, 1.6], [1.73434782E12, 1.0], [1.73434812E12, 2.0], [1.73434818E12, 1.0], [1.7343477E12, 1.0], [1.734348E12, 2.0], [1.73434806E12, 2.0], [1.73434788E12, 1.0], [1.73434836E12, 1.3157894736842106]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73434794E12, 174723.66666666666], [1.73434824E12, 242918.75], [1.73434776E12, 112152.66666666667], [1.7343483E12, 211216.8], [1.73434782E12, 120975.0], [1.73434812E12, 280939.0], [1.73434818E12, 259196.3333333333], [1.7343477E12, 104867.0], [1.734348E12, 229637.0], [1.73434806E12, 239984.0], [1.73434788E12, 125880.0], [1.73434836E12, 181490.69999999998]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73434752E12, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73434794E12, 17650.333333333332], [1.73434776E12, 15220.0], [1.73434782E12, 16142.8], [1.73434812E12, 16317.833333333334], [1.73434764E12, 14151.75], [1.73434818E12, 16253.833333333332], [1.7343477E12, 15525.5], [1.734348E12, 16662.5], [1.73434806E12, 16265.999999999998], [1.73434758E12, 14008.5], [1.73434788E12, 16414.8]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73434794E12, 1.0428571428571425], [1.73434824E12, 1.2992700729927007], [1.7343483E12, 1.480314960629921], [1.73434764E12, 1.5333333333333334], [1.73434818E12, 1.234782608695652], [1.73434788E12, 0.9767441860465116], [1.73434776E12, 1.3333333333333337], [1.73434782E12, 1.147058823529412], [1.73434812E12, 1.1734693877551023], [1.7343477E12, 1.25], [1.734348E12, 1.098591549295775], [1.73434806E12, 1.1829268292682924], [1.73434836E12, 1.4482758620689657]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73434794E12, 0.5833333333333334], [1.73434776E12, 0.6666666666666666], [1.73434782E12, 0.5], [1.73434764E12, 0.6666666666666666], [1.7343477E12, 0.9166666666666666], [1.734348E12, 0.5], [1.73434752E12, 0.8571428571428572], [1.73434758E12, 0.75], [1.73434788E12, 0.33333333333333337]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.6666666666666666], [1.73434776E12, 0.6666666666666667], [1.73434782E12, 0.16666666666666669], [1.73434764E12, 0.6666666666666667], [1.7343477E12, 0.6666666666666666], [1.734348E12, 0.4], [1.73434752E12, 1.6666666666666667], [1.73434758E12, 0.5], [1.73434788E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73434794E12, 1.6], [1.73434824E12, 1.3035714285714286], [1.73434776E12, 1.107142857142857], [1.73434782E12, 1.2162162162162165], [1.73434812E12, 1.3387096774193548], [1.73434764E12, 1.3181818181818183], [1.73434818E12, 1.0735294117647058], [1.7343477E12, 0.9523809523809523], [1.734348E12, 1.146341463414634], [1.73434806E12, 1.308823529411765], [1.73434758E12, 1.0], [1.73434788E12, 1.03125]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73434794E12, 2518.166666666667], [1.73434776E12, 2521.0], [1.73434782E12, 2518.666666666667], [1.73434764E12, 2493.833333333333], [1.7343477E12, 2496.6666666666665], [1.734348E12, 2491.0], [1.73434752E12, 2499.6666666666665], [1.73434758E12, 2494.0], [1.73434788E12, 2494.333333333333]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73434752E12, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.73434794E12, 2056.0], [1.73434776E12, 2057.8333333333335], [1.73434782E12, 2057.0], [1.73434764E12, 2058.6666666666665], [1.7343477E12, 2058.8333333333335], [1.734348E12, 2056.5], [1.73434752E12, 2055.5], [1.73434758E12, 2060.333333333333], [1.73434788E12, 2061.3333333333335]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73434794E12, 1.0714285714285714], [1.73434824E12, 1.5454545454545454], [1.7343483E12, 1.4], [1.73434764E12, 1.2222222222222223], [1.73434818E12, 1.058823529411765], [1.73434752E12, 0.0], [1.73434758E12, 0.8571428571428571], [1.73434788E12, 0.7777777777777778], [1.73434776E12, 0.9230769230769231], [1.73434782E12, 0.3333333333333333], [1.73434812E12, 1.0], [1.7343477E12, 0.7777777777777778], [1.734348E12, 1.0], [1.73434806E12, 1.4], [1.73434836E12, 1.473684210526316]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.8333333333333334], [1.73434824E12, 1.4285714285714286], [1.73434776E12, 0.5555555555555556], [1.73434782E12, 1.1428571428571428], [1.73434812E12, 0.8333333333333334], [1.73434764E12, 1.0], [1.73434818E12, 0.6363636363636365], [1.7343477E12, 0.75], [1.734348E12, 1.125], [1.73434806E12, 1.2], [1.73434758E12, 0.5], [1.73434788E12, 1.2000000000000002]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 1.6666666666666667], [1.7343483E12, 1.1666666666666667], [1.73434818E12, 16.285714285714285], [1.73434788E12, 1.0], [1.73434842E12, 1.4444444444444444], [1.73434776E12, 1.0], [1.73434782E12, 0.5], [1.73434812E12, 1.0], [1.7343477E12, 2.0], [1.734348E12, 1.0], [1.73434806E12, 1.3333333333333333], [1.73434836E12, 1.4]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73434794E12, 180453.0], [1.73434824E12, 255811.33333333334], [1.7343483E12, 227408.1666666667], [1.73434818E12, 275169.14285714284], [1.73434788E12, 137403.0], [1.73434842E12, 175980.88888888888], [1.73434776E12, 124236.33333333333], [1.73434782E12, 132065.0], [1.73434812E12, 262746.0], [1.7343477E12, 115823.0], [1.734348E12, 190198.5], [1.73434806E12, 243485.66666666666], [1.73434836E12, 215809.19999999998]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73434794E12, 1663.5], [1.73434776E12, 1736.8333333333333], [1.73434782E12, 1629.1666666666667], [1.73434764E12, 1708.1666666666667], [1.7343477E12, 1702.1666666666667], [1.734348E12, 1696.2], [1.73434752E12, 1673.3333333333333], [1.73434758E12, 1702.0], [1.73434788E12, 1716.6666666666667]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73434794E12, 171824.33333333334], [1.73434776E12, 125711.8], [1.73434782E12, 135938.33333333334], [1.73434812E12, 225201.42857142858], [1.73434764E12, 54466.666666666664], [1.73434818E12, 194415.45454545453], [1.7343477E12, 90609.5], [1.734348E12, 215224.75], [1.73434806E12, 218683.33333333334], [1.73434758E12, 45570.0], [1.73434788E12, 147781.33333333334]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.33333333333333337], [1.73434782E12, 0.5], [1.73434764E12, 0.33333333333333337], [1.7343477E12, 0.28571428571428575], [1.734348E12, 0.33333333333333337], [1.73434752E12, 0.5], [1.73434758E12, 0.0], [1.73434788E12, 0.16666666666666666]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73434794E12, 629.3333333333334], [1.73434776E12, 690.6666666666666], [1.73434782E12, 578.6666666666667], [1.73434764E12, 575.8333333333334], [1.7343477E12, 575.6666666666667], [1.734348E12, 614.6], [1.73434752E12, 544.6666666666666], [1.73434758E12, 552.6666666666666], [1.73434788E12, 632.6666666666666]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73434794E12, 2797.166666666667], [1.73434776E12, 3037.0], [1.73434782E12, 2781.5], [1.73434764E12, 2896.166666666667], [1.7343477E12, 2849.5], [1.734348E12, 2827.6], [1.73434752E12, 2724.6666666666665], [1.73434758E12, 2841.5], [1.73434788E12, 2817.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73434794E12, 0.25], [1.73434776E12, 0.4], [1.73434782E12, 0.0], [1.73434812E12, 0.33333333333333337], [1.73434764E12, 0.33333333333333337], [1.73434818E12, 0.5], [1.7343477E12, 0.5], [1.734348E12, 0.33333333333333337], [1.73434806E12, 0.0], [1.73434758E12, 0.33333333333333337], [1.73434788E12, 0.2]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73434794E12, 357.6571428571429], [1.73434824E12, 361.62043795620434], [1.7343483E12, 349.2519685039369], [1.73434764E12, 380.4], [1.73434818E12, 357.0086956521739], [1.73434788E12, 326.81395348837214], [1.73434776E12, 377.6296296296296], [1.73434782E12, 349.32352941176475], [1.73434812E12, 367.0204081632652], [1.7343477E12, 327.7142857142857], [1.734348E12, 350.1830985915492], [1.73434806E12, 344.67073170731715], [1.73434836E12, 340.00000000000017]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73434752E12, 356.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73434794E12, 2062.0], [1.73434776E12, 2056.6666666666665], [1.73434782E12, 2060.0], [1.73434812E12, 2065.0], [1.73434764E12, 2056.75], [1.73434818E12, 2063.8333333333335], [1.7343477E12, 2060.0], [1.734348E12, 2058.5], [1.73434806E12, 2060.6], [1.73434758E12, 2069.0], [1.73434788E12, 2059.2]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73434794E12, 0.3333333333333333], [1.73434776E12, 1.3333333333333333], [1.73434782E12, 1.2], [1.73434812E12, 0.6666666666666667], [1.73434764E12, 1.0], [1.73434818E12, 0.8333333333333334], [1.7343477E12, 1.5], [1.734348E12, 1.0], [1.73434806E12, 1.1666666666666667], [1.73434758E12, 1.0], [1.73434788E12, 0.8]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73434794E12, 1.0], [1.73434776E12, 1.0], [1.73434782E12, 1.4], [1.73434812E12, 1.6666666666666667], [1.73434764E12, 1.25], [1.73434818E12, 1.6666666666666667], [1.7343477E12, 1.0], [1.734348E12, 0.5], [1.73434806E12, 1.3333333333333333], [1.73434758E12, 0.5], [1.73434788E12, 0.8]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73434794E12, 1.1666666666666667], [1.73434776E12, 0.6666666666666666], [1.73434782E12, 0.5], [1.73434764E12, 0.8333333333333334], [1.7343477E12, 1.1666666666666665], [1.734348E12, 1.3333333333333333], [1.73434752E12, 1.0], [1.73434758E12, 1.0], [1.73434788E12, 0.8333333333333334]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73434794E12, 0.6666666666666666], [1.73434776E12, 0.6666666666666666], [1.73434782E12, 0.5], [1.73434764E12, 0.8333333333333334], [1.7343477E12, 0.6666666666666667], [1.734348E12, 0.8], [1.73434752E12, 1.3333333333333333], [1.73434758E12, 0.6666666666666667], [1.73434788E12, 0.6666666666666667]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73434794E12, 0.33333333333333337], [1.73434776E12, 0.5], [1.73434782E12, 0.5], [1.73434764E12, 0.6666666666666667], [1.7343477E12, 0.0], [1.734348E12, 0.33333333333333337], [1.73434752E12, 0.5], [1.73434758E12, 0.33333333333333337], [1.73434788E12, 0.33333333333333337]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73434794E12, 2533.75], [1.73434776E12, 2536.0], [1.73434782E12, 2494.6666666666665], [1.73434812E12, 2541.3333333333335], [1.73434764E12, 2524.6666666666665], [1.73434818E12, 2565.0833333333335], [1.7343477E12, 2519.0], [1.734348E12, 2521.3333333333335], [1.73434806E12, 2503.5], [1.73434758E12, 2496.6666666666665], [1.73434788E12, 2539.2]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73434794E12, 0.8058252427184465], [1.73434776E12, 0.8266666666666668], [1.73434782E12, 0.85140562248996], [1.73434812E12, 0.8530612244897955], [1.73434764E12, 0.9901960784313729], [1.73434818E12, 0.8701298701298704], [1.7343477E12, 0.9578313253012046], [1.734348E12, 1.060526315789474], [1.73434752E12, 1.0], [1.73434806E12, 1.2457627118644063], [1.73434758E12, 1.0895522388059702], [1.73434788E12, 0.7888888888888886]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73434794E12, 13803.333333333334], [1.73434776E12, 13756.0], [1.73434782E12, 13792.8], [1.73434812E12, 13808.166666666666], [1.73434764E12, 13766.75], [1.73434818E12, 13828.166666666666], [1.7343477E12, 13776.0], [1.734348E12, 13776.0], [1.73434806E12, 13773.833333333332], [1.73434758E12, 13752.0], [1.73434788E12, 13796.4]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73434794E12, 254.0], [1.73434824E12, 321.57142857142856], [1.73434776E12, 271.8888888888889], [1.73434782E12, 289.00000000000006], [1.73434812E12, 291.1666666666667], [1.73434764E12, 239.5], [1.73434818E12, 289.09090909090907], [1.7343477E12, 296.25], [1.734348E12, 285.875], [1.73434806E12, 266.0], [1.73434758E12, 260.75], [1.73434788E12, 262.6]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73434752E12, 802.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73434794E12, 259.35714285714283], [1.73434824E12, 312.90909090909093], [1.7343483E12, 228.8], [1.73434764E12, 247.22222222222223], [1.73434818E12, 265.47058823529414], [1.73434752E12, 270.0], [1.73434758E12, 242.85714285714283], [1.73434788E12, 243.44444444444446], [1.73434776E12, 258.0], [1.73434782E12, 253.33333333333331], [1.73434812E12, 248.83333333333331], [1.7343477E12, 273.0], [1.734348E12, 257.7272727272727], [1.73434806E12, 249.6], [1.73434836E12, 244.89473684210526]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73434794E12, 13763.666666666666], [1.73434776E12, 13769.833333333332], [1.73434782E12, 13784.333333333334], [1.73434764E12, 13762.666666666666], [1.7343477E12, 14596.333333333332], [1.734348E12, 13746.5], [1.73434752E12, 13763.5], [1.73434758E12, 13762.166666666666], [1.73434788E12, 13766.833333333334]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73434794E12, 743.4166666666666], [1.73434824E12, 1950.3636363636365], [1.7343483E12, 583.4], [1.73434764E12, 628.5555555555555], [1.73434818E12, 850.8823529411765], [1.73434752E12, 545.0], [1.73434758E12, 571.5714285714286], [1.73434788E12, 605.8181818181818], [1.73434776E12, 922.4615384615386], [1.73434782E12, 744.8333333333334], [1.73434812E12, 727.1666666666666], [1.7343477E12, 601.2222222222223], [1.734348E12, 659.3636363636364], [1.73434806E12, 591.0], [1.73434836E12, 732.5789473684212]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73434794E12, 0.75], [1.73434776E12, 0.33333333333333337], [1.73434782E12, 0.6], [1.73434812E12, 0.5], [1.73434764E12, 1.0], [1.73434818E12, 0.24999999999999997], [1.7343477E12, 0.0], [1.734348E12, 0.6666666666666666], [1.73434806E12, 0.25], [1.73434758E12, 0.33333333333333337], [1.73434788E12, 0.8]], "isOverall": false, "label": "Get OS user Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.75], [1.73434776E12, 0.6666666666666666], [1.73434782E12, 0.6], [1.73434812E12, 0.16666666666666669], [1.73434764E12, 0.25], [1.73434818E12, 0.5833333333333334], [1.7343477E12, 1.0], [1.734348E12, 0.5], [1.73434806E12, 0.0], [1.73434758E12, 1.0], [1.73434788E12, 0.6]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73434794E12, 0.33333333333333337], [1.73434776E12, 0.16666666666666669], [1.73434782E12, 0.16666666666666666], [1.73434764E12, 0.16666666666666669], [1.7343477E12, 0.33333333333333337], [1.734348E12, 0.0], [1.73434752E12, 0.3333333333333333], [1.73434758E12, 0.16666666666666669], [1.73434788E12, 0.16666666666666669]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73434794E12, 0.6666666666666667], [1.73434776E12, 1.6666666666666667], [1.73434782E12, 1.4], [1.73434812E12, 0.8333333333333334], [1.73434764E12, 0.75], [1.73434818E12, 0.9166666666666666], [1.7343477E12, 2.0], [1.734348E12, 0.5], [1.73434806E12, 1.1666666666666665], [1.73434758E12, 0.5], [1.73434788E12, 0.6]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73434794E12, 0.3333333333333333], [1.73434776E12, 0.0], [1.73434782E12, 0.2], [1.73434812E12, 0.16666666666666666], [1.73434764E12, 0.75], [1.73434818E12, 0.6666666666666666], [1.7343477E12, 0.0], [1.734348E12, 1.0], [1.73434806E12, 0.5], [1.73434758E12, 0.0], [1.73434788E12, 0.6]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73434842E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73434752E12, "maxY": 17688.88888888889, "series": [{"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73434794E12, 242.88888888888889], [1.73434776E12, 258.8888888888889], [1.73434782E12, 253.09090909090907], [1.73434812E12, 263.0], [1.73434764E12, 248.49999999999997], [1.73434818E12, 275.5], [1.7343477E12, 244.125], [1.734348E12, 251.375], [1.73434752E12, 330.5], [1.73434806E12, 262.8333333333333], [1.73434758E12, 272.0], [1.73434788E12, 245.9090909090909]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73434794E12, 271.33333333333337], [1.73434776E12, 275.1666666666667], [1.73434782E12, 252.83333333333334], [1.73434764E12, 244.5], [1.7343477E12, 271.0], [1.734348E12, 251.0], [1.73434752E12, 235.5], [1.73434758E12, 265.3333333333333], [1.73434788E12, 245.5]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73434794E12, 484.75], [1.73434776E12, 494.5], [1.73434782E12, 489.33333333333326], [1.73434764E12, 526.5833333333333], [1.7343477E12, 525.4166666666666], [1.734348E12, 497.1], [1.73434752E12, 453.42857142857144], [1.73434758E12, 519.6666666666667], [1.73434788E12, 503.25]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73434794E12, 261.6], [1.73434824E12, 419.14285714285717], [1.73434776E12, 321.5], [1.73434782E12, 289.25], [1.73434812E12, 272.6], [1.73434764E12, 298.0], [1.73434818E12, 359.45454545454544], [1.7343477E12, 513.5], [1.734348E12, 257.75], [1.73434806E12, 222.5], [1.73434758E12, 222.0], [1.73434788E12, 252.5]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73434794E12, 309.83333333333337], [1.73434776E12, 314.3333333333333], [1.73434782E12, 328.6666666666667], [1.73434764E12, 341.3333333333333], [1.7343477E12, 353.66666666666663], [1.734348E12, 330.6], [1.73434752E12, 391.3333333333333], [1.73434758E12, 374.5], [1.73434788E12, 347.66666666666663]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73434794E12, 2063.5], [1.73434776E12, 2063.3333333333335], [1.73434782E12, 2058.6], [1.73434812E12, 2058.5], [1.73434764E12, 2060.25], [1.73434818E12, 2058.166666666666], [1.7343477E12, 2050.5], [1.734348E12, 2061.6666666666665], [1.73434806E12, 2063.5], [1.73434758E12, 2050.0], [1.73434788E12, 2057.4]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73434794E12, 2058.25], [1.73434776E12, 2059.0], [1.73434782E12, 2066.8], [1.73434812E12, 2062.5], [1.73434764E12, 2055.3333333333335], [1.73434818E12, 2064.166666666667], [1.7343477E12, 2057.5], [1.734348E12, 2059.6666666666665], [1.73434806E12, 2067.5], [1.73434758E12, 2058.0], [1.73434788E12, 2060.4]], "isOverall": false, "label": "Get OS user Access Token", "isController": false}, {"data": [[1.73434794E12, 2060.666666666667], [1.73434776E12, 2062.666666666667], [1.73434782E12, 2062.5], [1.73434764E12, 2060.0], [1.7343477E12, 2060.3333333333335], [1.734348E12, 2055.6], [1.73434752E12, 2060.0], [1.73434758E12, 2064.0], [1.73434788E12, 2060.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73434794E12, 231.0], [1.73434824E12, 303.0], [1.73434776E12, 236.66666666666666], [1.7343483E12, 233.6], [1.73434782E12, 245.5], [1.73434812E12, 281.0], [1.73434818E12, 219.83333333333331], [1.7343477E12, 268.0], [1.734348E12, 218.0], [1.73434806E12, 228.33333333333334], [1.73434788E12, 207.0], [1.73434836E12, 234.89473684210526]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73434752E12, 0.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73434794E12, 2065.0], [1.73434776E12, 2061.5], [1.73434782E12, 2063.1666666666665], [1.73434764E12, 2059.6666666666665], [1.7343477E12, 2055.5], [1.734348E12, 2059.4], [1.73434752E12, 2059.3333333333335], [1.73434758E12, 2059.666666666667], [1.73434788E12, 2058.5]], "isOverall": false, "label": "Get OS SR Access Token", "isController": false}, {"data": [[1.73434794E12, 10751.0], [1.73434824E12, 9406.666666666666], [1.7343483E12, 10370.666666666668], [1.73434818E12, 11686.0], [1.73434788E12, 10513.0], [1.73434842E12, 17688.88888888889], [1.73434776E12, 10604.0], [1.73434782E12, 9933.0], [1.73434812E12, 11400.0], [1.7343477E12, 9881.0], [1.734348E12, 11120.5], [1.73434806E12, 9209.0], [1.73434836E12, 12891.2]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73434794E12, 277.24271844660177], [1.73434776E12, 288.49333333333334], [1.73434782E12, 280.14056224899576], [1.73434812E12, 302.87755102040813], [1.73434764E12, 280.4509803921569], [1.73434818E12, 291.5584415584416], [1.7343477E12, 277.83132530120486], [1.734348E12, 277.8657894736845], [1.73434752E12, 218.33333333333334], [1.73434806E12, 275.92372881355936], [1.73434758E12, 270.0298507462686], [1.73434788E12, 270.38888888888886]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73434794E12, 283.3333333333333], [1.73434776E12, 269.6666666666667], [1.73434782E12, 259.0], [1.73434812E12, 260.3333333333333], [1.73434764E12, 274.75], [1.73434818E12, 320.91666666666663], [1.7343477E12, 257.5], [1.734348E12, 246.0], [1.73434806E12, 242.0], [1.73434758E12, 274.5], [1.73434788E12, 240.2]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73434794E12, 611.0], [1.73434776E12, 730.0], [1.73434782E12, 581.0], [1.73434764E12, 602.3333333333334], [1.7343477E12, 555.5], [1.734348E12, 586.2], [1.73434752E12, 540.3333333333334], [1.73434758E12, 555.6666666666666], [1.73434788E12, 543.1666666666666]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73434794E12, 910.3333333333334], [1.73434776E12, 758.3333333333334], [1.73434782E12, 837.0], [1.73434812E12, 1068.3333333333333], [1.73434764E12, 590.5], [1.73434818E12, 1458.9999999999998], [1.7343477E12, 877.5], [1.734348E12, 846.5], [1.73434806E12, 911.3333333333334], [1.73434758E12, 818.0], [1.73434788E12, 835.8]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73434794E12, 295.6666666666667], [1.73434776E12, 257.3333333333333], [1.73434782E12, 272.6], [1.73434812E12, 253.16666666666669], [1.73434764E12, 247.25], [1.73434818E12, 265.25000000000006], [1.7343477E12, 286.0], [1.734348E12, 242.0], [1.73434806E12, 261.1666666666667], [1.73434758E12, 227.0], [1.73434788E12, 253.6]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73434794E12, 239.33333333333334], [1.73434776E12, 264.3333333333333], [1.73434782E12, 252.8], [1.73434812E12, 267.1666666666667], [1.73434764E12, 254.2], [1.73434818E12, 275.5], [1.7343477E12, 258.0], [1.734348E12, 319.5], [1.73434806E12, 241.16666666666669], [1.73434758E12, 218.0], [1.73434788E12, 244.6]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73434794E12, 2057.0], [1.73434776E12, 2064.0], [1.73434782E12, 2062.1666666666665], [1.73434764E12, 2067.5], [1.7343477E12, 2061.4285714285716], [1.734348E12, 2057.8333333333335], [1.73434752E12, 2066.0], [1.73434758E12, 2063.333333333333], [1.73434788E12, 2073.8333333333335]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73434794E12, 274.1666666666667], [1.73434776E12, 308.3333333333333], [1.73434782E12, 311.3333333333333], [1.73434764E12, 319.66666666666663], [1.7343477E12, 310.0], [1.734348E12, 297.6], [1.73434752E12, 260.0], [1.73434758E12, 315.8333333333333], [1.73434788E12, 284.66666666666663]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73434752E12, 231.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434818E12, 0.0], [1.73434788E12, 0.0], [1.73434842E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73434794E12, 246.91111111111107], [1.73434824E12, 306.125], [1.73434776E12, 272.8571428571429], [1.73434782E12, 322.94594594594594], [1.73434812E12, 260.5645161290323], [1.73434764E12, 255.2727272727273], [1.73434818E12, 283.3088235294117], [1.7343477E12, 277.2857142857143], [1.734348E12, 296.2195121951219], [1.73434806E12, 270.89705882352945], [1.73434758E12, 244.0], [1.73434788E12, 274.04687499999994]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73434752E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get OS SR Access Token-0", "isController": false}, {"data": [[1.73434794E12, 2058.6666666666665], [1.73434776E12, 2052.3333333333335], [1.73434782E12, 2054.6], [1.73434812E12, 2061.666666666667], [1.73434764E12, 2059.25], [1.73434818E12, 2057.916666666667], [1.7343477E12, 2063.5], [1.734348E12, 2071.5], [1.73434806E12, 2058.166666666667], [1.73434758E12, 2050.0], [1.73434788E12, 2061.2]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.7343483E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434788E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.7343483E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434788E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73434752E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.73434788E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73434794E12, 2517.666666666667], [1.73434776E12, 2520.333333333333], [1.73434782E12, 2518.333333333333], [1.73434764E12, 2493.666666666667], [1.7343477E12, 2496.1666666666665], [1.734348E12, 2490.6], [1.73434752E12, 2499.3333333333335], [1.73434758E12, 2493.5], [1.73434788E12, 2493.8333333333335]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73434752E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.73434794E12, 2055.6666666666665], [1.73434776E12, 2056.8333333333335], [1.73434782E12, 2056.5], [1.73434764E12, 2057.8333333333335], [1.7343477E12, 2058.666666666667], [1.734348E12, 2056.0], [1.73434752E12, 2055.0], [1.73434758E12, 2060.0], [1.73434788E12, 2060.5]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434818E12, 0.0], [1.73434788E12, 0.0], [1.73434842E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434818E12, 0.0], [1.73434788E12, 0.0], [1.73434842E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73434794E12, 628.6666666666666], [1.73434776E12, 689.8333333333334], [1.73434782E12, 578.1666666666667], [1.73434764E12, 575.0], [1.7343477E12, 575.0], [1.734348E12, 614.2], [1.73434752E12, 542.6666666666666], [1.73434758E12, 552.0], [1.73434788E12, 632.5]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73434794E12, 352.3571428571428], [1.73434824E12, 354.0583941605839], [1.7343483E12, 344.0944881889762], [1.73434764E12, 373.20000000000005], [1.73434818E12, 348.7478260869566], [1.73434788E12, 324.3488372093023], [1.73434776E12, 370.0], [1.73434782E12, 339.05882352941177], [1.73434812E12, 358.2346938775511], [1.7343477E12, 319.5357142857142], [1.734348E12, 343.81690140845075], [1.73434806E12, 339.03658536585357], [1.73434836E12, 331.0689655172412]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73434752E12, 355.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73434794E12, 2061.25], [1.73434776E12, 2055.6666666666665], [1.73434782E12, 2059.4], [1.73434812E12, 2064.1666666666665], [1.73434764E12, 2056.25], [1.73434818E12, 2063.1666666666665], [1.7343477E12, 2059.0], [1.734348E12, 2057.5], [1.73434806E12, 2060.4], [1.73434758E12, 2068.0], [1.73434788E12, 2058.2]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73434794E12, 2533.25], [1.73434776E12, 2535.4], [1.73434782E12, 2494.3333333333335], [1.73434812E12, 2540.5], [1.73434764E12, 2523.6666666666665], [1.73434818E12, 2564.416666666667], [1.7343477E12, 2518.5], [1.734348E12, 2521.0], [1.73434806E12, 2503.5], [1.73434758E12, 2496.0], [1.73434788E12, 2538.6]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73434794E12, 253.16666666666666], [1.73434824E12, 320.14285714285717], [1.73434776E12, 271.1111111111111], [1.73434782E12, 287.71428571428567], [1.73434812E12, 290.1666666666667], [1.73434764E12, 238.5], [1.73434818E12, 288.1363636363636], [1.7343477E12, 295.5], [1.734348E12, 284.75], [1.73434806E12, 264.4], [1.73434758E12, 260.25], [1.73434788E12, 261.3]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73434752E12, 802.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73434794E12, 258.2142857142857], [1.73434824E12, 311.1818181818182], [1.7343483E12, 227.2], [1.73434764E12, 245.7777777777778], [1.73434818E12, 264.2941176470589], [1.73434752E12, 270.0], [1.73434758E12, 242.0], [1.73434788E12, 242.33333333333334], [1.73434776E12, 257.0], [1.73434782E12, 252.75], [1.73434812E12, 247.5], [1.7343477E12, 272.1111111111111], [1.734348E12, 256.54545454545456], [1.73434806E12, 248.2], [1.73434836E12, 243.2105263157895]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73434794E12, 742.7500000000001], [1.73434824E12, 1948.9090909090908], [1.7343483E12, 582.6], [1.73434764E12, 627.5555555555555], [1.73434818E12, 849.5294117647057], [1.73434752E12, 544.5], [1.73434758E12, 570.4285714285714], [1.73434788E12, 605.2727272727274], [1.73434776E12, 921.2307692307693], [1.73434782E12, 743.8333333333334], [1.73434812E12, 726.1666666666666], [1.7343477E12, 600.6666666666666], [1.734348E12, 658.1818181818181], [1.73434806E12, 589.8], [1.73434836E12, 731.0526315789473]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get OS user Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73434842E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73434752E12, "maxY": 22941.4, "series": [{"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73434794E12, 236.24999999999997], [1.73434776E12, 242.08333333333337], [1.73434782E12, 235.0], [1.73434764E12, 270.66666666666663], [1.7343477E12, 255.75], [1.734348E12, 252.99999999999997], [1.73434752E12, 202.28571428571428], [1.73434758E12, 254.00000000000003], [1.73434788E12, 239.25]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 47.45454545454545], [1.7343477E12, 245.5], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73434794E12, 2045.0], [1.73434776E12, 2048.3333333333335], [1.73434782E12, 2038.6], [1.73434812E12, 2039.3333333333333], [1.73434764E12, 2042.5], [1.73434818E12, 2038.5833333333333], [1.7343477E12, 2033.5], [1.734348E12, 2044.0], [1.73434806E12, 2044.25], [1.73434758E12, 2032.0], [1.73434788E12, 2038.2]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73434794E12, 2040.25], [1.73434776E12, 2038.6666666666667], [1.73434782E12, 2044.6], [1.73434812E12, 2043.8333333333335], [1.73434764E12, 2037.3333333333333], [1.73434818E12, 2044.6666666666663], [1.7343477E12, 2038.5], [1.734348E12, 2041.0], [1.73434806E12, 2048.5], [1.73434758E12, 2039.0], [1.73434788E12, 2036.4]], "isOverall": false, "label": "Get OS user Access Token", "isController": false}, {"data": [[1.73434794E12, 2041.6666666666667], [1.73434776E12, 2038.8333333333335], [1.73434782E12, 2042.5], [1.73434764E12, 2041.8333333333335], [1.7343477E12, 2041.8333333333333], [1.734348E12, 2037.4], [1.73434752E12, 2037.3333333333333], [1.73434758E12, 2043.5], [1.73434788E12, 2039.3333333333335]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.7343483E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434788E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73434752E12, 552.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73434794E12, 2045.3333333333333], [1.73434776E12, 2043.1666666666665], [1.73434782E12, 2044.3333333333335], [1.73434764E12, 2039.6666666666667], [1.7343477E12, 2036.6666666666667], [1.734348E12, 2041.8], [1.73434752E12, 2040.3333333333333], [1.73434758E12, 2039.6666666666667], [1.73434788E12, 2041.0]], "isOverall": false, "label": "Get OS SR Access Token", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434818E12, 0.0], [1.73434788E12, 0.0], [1.73434842E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73434794E12, 25.223300970873783], [1.73434776E12, 26.786666666666665], [1.73434782E12, 23.220883534136554], [1.73434812E12, 24.359183673469374], [1.73434764E12, 30.460784313725494], [1.73434818E12, 19.792207792207797], [1.7343477E12, 21.228915662650607], [1.734348E12, 22.828947368421062], [1.73434752E12, 0.0], [1.73434806E12, 25.813559322033893], [1.73434758E12, 14.820895522388064], [1.73434788E12, 20.974074074074082]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 39.33333333333333], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73434794E12, 318.66666666666663], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 257.33333333333337], [1.73434764E12, 0.0], [1.73434818E12, 231.75], [1.7343477E12, 233.5], [1.734348E12, 226.5], [1.73434806E12, 232.66666666666666], [1.73434758E12, 211.0], [1.73434788E12, 197.8]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73434794E12, 2040.1666666666667], [1.73434776E12, 2043.1666666666665], [1.73434782E12, 2042.1666666666667], [1.73434764E12, 2049.5], [1.7343477E12, 2042.5714285714284], [1.734348E12, 2040.8333333333335], [1.73434752E12, 2041.5], [1.73434758E12, 2041.6666666666665], [1.73434788E12, 2048.1666666666665]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73434794E12, 22889.0], [1.73434776E12, 22434.5], [1.73434782E12, 22861.0], [1.73434764E12, 22078.6], [1.7343477E12, 22801.333333333336], [1.734348E12, 22848.2], [1.73434806E12, 22680.25], [1.73434758E12, 21390.666666666668], [1.73434788E12, 22941.4]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73434752E12, 0.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434818E12, 0.0], [1.73434788E12, 0.0], [1.73434842E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 35.94642857142856], [1.73434776E12, 16.821428571428573], [1.73434782E12, 60.2972972972973], [1.73434812E12, 7.322580645161291], [1.73434764E12, 0.0], [1.73434818E12, 20.514705882352935], [1.7343477E12, 24.19047619047619], [1.734348E12, 36.90243902439024], [1.73434806E12, 20.82352941176471], [1.73434758E12, 0.0], [1.73434788E12, 30.640624999999996]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73434752E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73434794E12, 11696.833333333332], [1.73434776E12, 11264.4], [1.73434782E12, 11697.166666666666], [1.73434764E12, 11155.0], [1.7343477E12, 11533.166666666666], [1.734348E12, 11616.57142857143], [1.73434752E12, 10422.0], [1.73434806E12, 11216.0], [1.73434758E12, 10726.0], [1.73434788E12, 11803.666666666666]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get OS SR Access Token-0", "isController": false}, {"data": [[1.73434794E12, 2044.3333333333333], [1.73434776E12, 2035.6666666666667], [1.73434782E12, 2034.6], [1.73434812E12, 2043.1666666666665], [1.73434764E12, 2041.75], [1.73434818E12, 2039.5], [1.7343477E12, 2045.0], [1.734348E12, 2049.0], [1.73434806E12, 2040.0], [1.73434758E12, 2034.0], [1.73434788E12, 2037.2]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.7343483E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434788E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73434794E12, 1308.3333333333333], [1.73434824E12, 1992.0], [1.73434776E12, 1063.6666666666667], [1.7343483E12, 1875.2], [1.73434782E12, 1254.5], [1.73434812E12, 1920.0], [1.73434818E12, 2006.3333333333335], [1.7343477E12, 490.0], [1.734348E12, 2079.0], [1.73434806E12, 1808.6666666666667], [1.73434788E12, 1026.0], [1.73434836E12, 1315.4499999999998]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73434752E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73434794E12, 10872.666666666666], [1.73434776E12, 10359.333333333334], [1.73434782E12, 10751.6], [1.73434812E12, 10627.166666666666], [1.73434764E12, 10196.75], [1.73434818E12, 10720.916666666668], [1.7343477E12, 10685.0], [1.734348E12, 10706.5], [1.73434806E12, 10685.666666666666], [1.73434758E12, 10413.0], [1.73434788E12, 10689.4]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.73434788E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73434794E12, 2043.6666666666667], [1.73434776E12, 2045.1666666666665], [1.73434782E12, 2046.1666666666667], [1.73434764E12, 2043.6666666666665], [1.7343477E12, 2042.6666666666667], [1.734348E12, 2043.8], [1.73434752E12, 2043.6666666666667], [1.73434758E12, 2038.0], [1.73434788E12, 2041.1666666666667]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73434752E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.73434794E12, 2039.6666666666665], [1.73434776E12, 2038.6666666666665], [1.73434782E12, 2034.3333333333333], [1.73434764E12, 2038.6666666666665], [1.7343477E12, 2039.5], [1.734348E12, 2038.0], [1.73434752E12, 2039.5], [1.73434758E12, 2043.5], [1.73434788E12, 2043.6666666666667]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434818E12, 0.0], [1.73434788E12, 0.0], [1.73434842E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73434794E12, 1418.0], [1.73434824E12, 1998.6666666666667], [1.7343483E12, 1891.3333333333333], [1.73434818E12, 1994.0], [1.73434788E12, 1026.0], [1.73434842E12, 1172.3333333333333], [1.73434776E12, 1063.6666666666667], [1.73434782E12, 1254.5], [1.73434812E12, 1837.0], [1.7343477E12, 490.0], [1.734348E12, 1253.5], [1.73434806E12, 1889.3333333333333], [1.73434836E12, 1575.8]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73434794E12, 472.5], [1.73434776E12, 484.16666666666663], [1.73434782E12, 470.0], [1.73434764E12, 541.3333333333334], [1.7343477E12, 511.5], [1.734348E12, 506.0], [1.73434752E12, 472.0], [1.73434758E12, 508.00000000000006], [1.73434788E12, 478.5]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73434794E12, 472.5], [1.73434776E12, 484.16666666666663], [1.73434782E12, 470.0], [1.73434764E12, 541.3333333333334], [1.7343477E12, 511.5], [1.734348E12, 506.0], [1.73434752E12, 472.0], [1.73434758E12, 508.00000000000006], [1.73434788E12, 478.5]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73434794E12, 97.92857142857144], [1.73434824E12, 81.48175182481751], [1.7343483E12, 88.23622047244093], [1.73434764E12, 106.33333333333333], [1.73434818E12, 72.17391304347822], [1.73434788E12, 68.0232558139535], [1.73434776E12, 108.96296296296296], [1.73434782E12, 76.29411764705883], [1.73434812E12, 87.66326530612244], [1.7343477E12, 58.07142857142856], [1.734348E12, 84.4929577464789], [1.73434806E12, 78.35365853658536], [1.73434836E12, 74.45977011494251]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73434752E12, 0.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73434794E12, 2042.0], [1.73434776E12, 2039.6666666666667], [1.73434782E12, 2040.6], [1.73434812E12, 2044.5], [1.73434764E12, 2038.0], [1.73434818E12, 2045.3333333333333], [1.7343477E12, 2045.0], [1.734348E12, 2039.0], [1.73434806E12, 2043.4], [1.73434758E12, 2051.5], [1.73434788E12, 2042.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73434794E12, 2050.75], [1.73434776E12, 2042.6], [1.73434782E12, 2042.3333333333333], [1.73434812E12, 2044.0], [1.73434764E12, 2036.6666666666667], [1.73434818E12, 2037.4166666666667], [1.7343477E12, 2035.5], [1.734348E12, 2047.0], [1.73434806E12, 2041.5], [1.73434758E12, 2042.6666666666667], [1.73434788E12, 2048.6]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73434752E12, 552.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get OS user Access Token-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434764E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73434842E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73434752E12, "maxY": 20081.0, "series": [{"data": [[1.73434794E12, 10981.0], [1.73434824E12, 10479.0], [1.7343483E12, 13612.0], [1.73434764E12, 2587.0], [1.73434818E12, 13644.0], [1.73434752E12, 2532.0], [1.73434758E12, 2519.0], [1.73434788E12, 10727.0], [1.73434842E12, 20081.0], [1.73434776E12, 12262.0], [1.73434782E12, 10487.0], [1.73434812E12, 11639.0], [1.7343477E12, 10142.0], [1.734348E12, 11442.0], [1.73434806E12, 10666.0], [1.73434836E12, 15693.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73434794E12, 375.5], [1.73434824E12, 461.8999999999998], [1.7343483E12, 651.9000000000001], [1.73434764E12, 782.2000000000002], [1.73434818E12, 808.4999999999997], [1.73434752E12, 2057.5], [1.73434758E12, 2050.3], [1.73434788E12, 553.2], [1.73434842E12, 19549.100000000002], [1.73434776E12, 679.7999999999993], [1.73434782E12, 643.8], [1.73434812E12, 330.0], [1.7343477E12, 594.8], [1.734348E12, 325.70000000000005], [1.73434806E12, 296.0], [1.73434836E12, 708.4]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73434794E12, 2261.1500000000187], [1.73434824E12, 3506.569999999993], [1.7343483E12, 10261.349999999986], [1.73434764E12, 2493.33], [1.73434818E12, 2804.0399999999972], [1.73434752E12, 2532.0], [1.73434758E12, 2502.38], [1.73434788E12, 2484.4700000000003], [1.73434842E12, 20081.0], [1.73434776E12, 2523.8999999999996], [1.73434782E12, 2487.58], [1.73434812E12, 2071.0699999999997], [1.7343477E12, 2483.8999999999996], [1.734348E12, 2069.5699999999997], [1.73434806E12, 2068.3900000000003], [1.73434836E12, 15214.040000000003]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73434794E12, 875.0], [1.73434824E12, 780.7499999999998], [1.7343483E12, 763.15], [1.73434764E12, 2062.3], [1.73434818E12, 2061.95], [1.73434752E12, 2075.15], [1.73434758E12, 2067.0], [1.73434788E12, 2051.05], [1.73434842E12, 20081.0], [1.73434776E12, 2051.45], [1.73434782E12, 2053.0], [1.73434812E12, 810.0499999999997], [1.7343477E12, 2054.85], [1.734348E12, 756.8499999999999], [1.73434806E12, 730.3500000000006], [1.73434836E12, 850.5999999999999]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73434794E12, 0.0], [1.73434824E12, 0.0], [1.7343483E12, 0.0], [1.73434764E12, 0.0], [1.73434818E12, 0.0], [1.73434752E12, 0.0], [1.73434758E12, 0.0], [1.73434788E12, 0.0], [1.73434842E12, 0.0], [1.73434776E12, 0.0], [1.73434782E12, 0.0], [1.73434812E12, 0.0], [1.7343477E12, 0.0], [1.734348E12, 0.0], [1.73434806E12, 0.0], [1.73434836E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73434794E12, 104.5], [1.73434824E12, 103.0], [1.7343483E12, 106.5], [1.73434764E12, 101.5], [1.73434818E12, 155.0], [1.73434752E12, 104.0], [1.73434758E12, 106.0], [1.73434788E12, 102.0], [1.73434842E12, 7433.5], [1.73434776E12, 101.5], [1.73434782E12, 107.5], [1.73434812E12, 104.0], [1.7343477E12, 109.0], [1.734348E12, 147.0], [1.73434806E12, 149.0], [1.73434836E12, 14.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73434842E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 3.0, "minX": 2.0, "maxY": 99543.5, "series": [{"data": [[2.0, 106.0], [8.0, 108.5], [32.0, 107.5], [34.0, 102.0], [10.0, 103.0], [40.0, 104.0], [42.0, 109.5], [12.0, 99.0], [14.0, 106.0], [4.0, 105.0], [16.0, 104.0], [18.0, 108.0], [20.0, 101.0], [21.0, 3.0], [22.0, 150.0], [6.0, 106.0], [24.0, 109.0], [26.0, 105.0], [28.0, 151.0], [30.0, 157.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[21.0, 99543.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 42.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 162.5, "series": [{"data": [[2.0, 104.0], [8.0, 101.0], [32.0, 101.0], [34.0, 100.5], [10.0, 97.5], [40.0, 102.5], [42.0, 108.0], [12.0, 97.0], [14.0, 100.0], [4.0, 101.5], [16.0, 97.5], [18.0, 99.5], [20.0, 98.5], [21.0, 0.0], [22.0, 98.0], [6.0, 99.5], [24.0, 103.5], [26.0, 98.5], [28.0, 102.5], [30.0, 101.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[21.0, 162.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 42.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.15, "minX": 1.73434752E12, "maxY": 20.733333333333334, "series": [{"data": [[1.73434794E12, 19.283333333333335], [1.73434824E12, 7.883333333333334], [1.7343483E12, 4.9], [1.73434764E12, 9.416666666666666], [1.73434818E12, 15.266666666666667], [1.73434752E12, 1.5333333333333334], [1.73434758E12, 6.283333333333333], [1.73434788E12, 18.016666666666666], [1.73434842E12, 0.15], [1.73434776E12, 14.533333333333333], [1.73434782E12, 16.116666666666667], [1.73434812E12, 16.583333333333332], [1.7343477E12, 11.35], [1.734348E12, 20.733333333333334], [1.73434806E12, 19.25], [1.73434836E12, 5.283333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73434842E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.73434752E12, "maxY": 19.683333333333334, "series": [{"data": [[1.73434794E12, 17.983333333333334], [1.73434824E12, 7.566666666666666], [1.7343483E12, 4.85], [1.73434764E12, 8.266666666666667], [1.73434818E12, 14.066666666666666], [1.73434752E12, 1.1333333333333333], [1.73434758E12, 5.3], [1.73434788E12, 16.75], [1.73434842E12, 0.3], [1.73434776E12, 13.316666666666666], [1.73434782E12, 14.866666666666667], [1.73434812E12, 15.95], [1.7343477E12, 10.316666666666666], [1.734348E12, 19.683333333333334], [1.73434806E12, 18.883333333333333], [1.73434836E12, 4.833333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.73434794E12, 0.85], [1.73434824E12, 0.18333333333333332], [1.7343483E12, 0.08333333333333333], [1.73434764E12, 0.7666666666666667], [1.73434818E12, 0.6833333333333333], [1.73434752E12, 0.31666666666666665], [1.73434758E12, 0.7], [1.73434788E12, 0.8166666666666667], [1.73434776E12, 0.8166666666666667], [1.73434782E12, 0.8666666666666667], [1.73434812E12, 0.3], [1.7343477E12, 0.7166666666666667], [1.734348E12, 0.6833333333333333], [1.73434806E12, 0.25], [1.73434836E12, 0.31666666666666665]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.73434794E12, 0.4], [1.73434824E12, 0.11666666666666667], [1.73434764E12, 0.4], [1.73434818E12, 0.5833333333333334], [1.73434752E12, 0.08333333333333333], [1.73434758E12, 0.26666666666666666], [1.73434788E12, 0.4], [1.73434776E12, 0.36666666666666664], [1.73434782E12, 0.43333333333333335], [1.73434812E12, 0.2833333333333333], [1.7343477E12, 0.3], [1.734348E12, 0.3333333333333333], [1.73434806E12, 0.2]], "isOverall": false, "label": "202", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73434842E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73434752E12, "maxY": 6.333333333333333, "series": [{"data": [[1.73434794E12, 0.05], [1.73434824E12, 0.11666666666666667], [1.73434776E12, 0.06666666666666667], [1.73434782E12, 0.06666666666666667], [1.73434812E12, 0.08333333333333333], [1.73434764E12, 0.05], [1.73434818E12, 0.18333333333333332], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.06666666666666667], [1.73434806E12, 0.03333333333333333], [1.73434758E12, 0.016666666666666666], [1.73434788E12, 0.06666666666666667]], "isOverall": false, "label": "Link user-success", "isController": true}, {"data": [[1.73434794E12, 0.06666666666666667], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.08333333333333333], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Get user key gen result-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Accept sr-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Accept sr-0-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Invite and accept user-success", "isController": true}, {"data": [[1.73434794E12, 0.2], [1.73434776E12, 0.2], [1.73434782E12, 0.2], [1.73434764E12, 0.2], [1.7343477E12, 0.2], [1.734348E12, 0.16666666666666666], [1.73434752E12, 0.11666666666666667], [1.73434758E12, 0.2], [1.73434788E12, 0.2]], "isOverall": false, "label": "Get Admin Access Token-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.11666666666666667], [1.734348E12, 0.1], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Get key gen result-success", "isController": false}, {"data": [[1.73434752E12, 0.016666666666666666]], "isOverall": false, "label": "Tenant creation flow-success", "isController": true}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Login by SR OS-0-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Accept user-success", "isController": false}, {"data": [[1.73434794E12, 0.2], [1.73434824E12, 0.18333333333333332], [1.7343483E12, 0.08333333333333333], [1.73434764E12, 0.15], [1.73434818E12, 0.2833333333333333], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.11666666666666667], [1.73434788E12, 0.18333333333333332], [1.73434776E12, 0.21666666666666667], [1.73434782E12, 0.2], [1.73434812E12, 0.1], [1.7343477E12, 0.15], [1.734348E12, 0.18333333333333332], [1.73434806E12, 0.08333333333333333], [1.73434836E12, 0.31666666666666665]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Get User Access Token-0-success", "isController": false}, {"data": [[1.73434794E12, 1.1666666666666667], [1.73434824E12, 2.283333333333333], [1.7343483E12, 2.1166666666666667], [1.73434764E12, 0.25], [1.73434818E12, 1.9166666666666667], [1.73434788E12, 0.7166666666666667], [1.73434776E12, 0.45], [1.73434782E12, 0.5666666666666667], [1.73434812E12, 1.6333333333333333], [1.7343477E12, 0.4666666666666667], [1.734348E12, 1.1833333333333333], [1.73434806E12, 1.3666666666666667], [1.73434836E12, 1.4333333333333333]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Invite user-0-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.1], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Get sr keys-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.08333333333333333], [1.73434782E12, 0.05], [1.73434812E12, 0.11666666666666667], [1.73434764E12, 0.05], [1.73434818E12, 0.18333333333333332], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.06666666666666667], [1.73434806E12, 0.05], [1.73434758E12, 0.05], [1.73434788E12, 0.1]], "isOverall": false, "label": "Link SR-success", "isController": true}, {"data": [[1.73434794E12, 0.06666666666666667], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.05], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.05], [1.73434806E12, 0.06666666666666667], [1.73434758E12, 0.05], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Get OS user Access Token-0-success", "isController": false}, {"data": [[1.73434794E12, 0.08333333333333333], [1.73434824E12, 0.11666666666666667], [1.73434776E12, 0.06666666666666667], [1.73434782E12, 0.06666666666666667], [1.73434812E12, 0.08333333333333333], [1.73434764E12, 0.05], [1.73434818E12, 0.18333333333333332], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.06666666666666667], [1.73434806E12, 0.03333333333333333], [1.73434758E12, 0.016666666666666666], [1.73434788E12, 0.03333333333333333]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.73434752E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-success", "isController": false}, {"data": [[1.73434794E12, 0.75], [1.73434824E12, 0.9333333333333333], [1.73434776E12, 0.4666666666666667], [1.73434782E12, 0.6166666666666667], [1.73434812E12, 1.0333333333333334], [1.73434764E12, 0.36666666666666664], [1.73434818E12, 1.1333333333333333], [1.7343477E12, 0.35], [1.734348E12, 0.6833333333333333], [1.73434806E12, 1.1333333333333333], [1.73434758E12, 0.05], [1.73434788E12, 1.0666666666666667]], "isOverall": false, "label": "Get user link result-0-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Get User Access Token-success", "isController": false}, {"data": [[1.73434752E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.08333333333333333], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.016666666666666666], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Link user profile-0-success", "isController": false}, {"data": [[1.73434794E12, 0.016666666666666666], [1.73434824E12, 0.05], [1.7343483E12, 0.1], [1.73434818E12, 0.11666666666666667], [1.73434788E12, 0.016666666666666666], [1.73434842E12, 0.15], [1.73434776E12, 0.05], [1.73434782E12, 0.03333333333333333], [1.73434812E12, 0.016666666666666666], [1.7343477E12, 0.016666666666666666], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.05], [1.73434836E12, 0.16666666666666666]], "isOverall": false, "label": "Policy import and dry run-success", "isController": true}, {"data": [[1.73434794E12, 0.2], [1.73434776E12, 0.2], [1.73434782E12, 0.2], [1.73434764E12, 0.2], [1.7343477E12, 0.2], [1.734348E12, 0.16666666666666666], [1.73434752E12, 0.11666666666666667], [1.73434758E12, 0.2], [1.73434788E12, 0.2]], "isOverall": false, "label": "Get Admin Access Token-0-success", "isController": false}, {"data": [[1.73434794E12, 0.15], [1.73434776E12, 0.15], [1.73434782E12, 0.18333333333333332], [1.73434812E12, 0.1], [1.73434764E12, 0.16666666666666666], [1.73434818E12, 0.2], [1.7343477E12, 0.13333333333333333], [1.734348E12, 0.13333333333333333], [1.73434752E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.13333333333333333], [1.73434788E12, 0.18333333333333332]], "isOverall": false, "label": "Agree terms-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "User creation(admin side)-success", "isController": true}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Get user keys-0-success", "isController": false}, {"data": [[1.73434794E12, 0.08333333333333333], [1.73434824E12, 0.11666666666666667], [1.73434776E12, 0.06666666666666667], [1.73434782E12, 0.06666666666666667], [1.73434812E12, 0.08333333333333333], [1.73434764E12, 0.05], [1.73434818E12, 0.18333333333333332], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.06666666666666667], [1.73434806E12, 0.03333333333333333], [1.73434758E12, 0.016666666666666666], [1.73434788E12, 0.03333333333333333]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Get OS SR Access Token-0-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434824E12, 0.06666666666666667], [1.73434776E12, 0.05], [1.7343483E12, 0.08333333333333333], [1.73434782E12, 0.03333333333333333], [1.73434812E12, 0.016666666666666666], [1.73434818E12, 0.1], [1.7343477E12, 0.016666666666666666], [1.734348E12, 0.016666666666666666], [1.73434806E12, 0.05], [1.73434788E12, 0.016666666666666666], [1.73434836E12, 0.31666666666666665]], "isOverall": false, "label": "Requests for Import-success", "isController": true}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Invite and accept SR-success", "isController": true}, {"data": [[1.73434752E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-0-success", "isController": false}, {"data": [[1.73434794E12, 0.75], [1.73434824E12, 0.9333333333333333], [1.73434776E12, 0.4666666666666667], [1.73434782E12, 0.6166666666666667], [1.73434812E12, 1.0333333333333334], [1.73434764E12, 0.36666666666666664], [1.73434818E12, 1.1333333333333333], [1.7343477E12, 0.35], [1.734348E12, 0.6833333333333333], [1.73434806E12, 1.1333333333333333], [1.73434758E12, 0.05], [1.73434788E12, 1.0666666666666667]], "isOverall": false, "label": "Get user link result-success", "isController": false}, {"data": [[1.73434752E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Login by SR OS-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Get user keys-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.1], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Generate sr hedera data-success", "isController": true}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.11666666666666667], [1.734348E12, 0.1], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Get key gen result-0-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "User creation(user side)-success", "isController": true}, {"data": [[1.73434794E12, 0.05], [1.73434824E12, 0.06666666666666667], [1.73434776E12, 0.05], [1.7343483E12, 0.08333333333333333], [1.73434782E12, 0.03333333333333333], [1.73434812E12, 0.016666666666666666], [1.73434818E12, 0.1], [1.7343477E12, 0.016666666666666666], [1.734348E12, 0.016666666666666666], [1.73434806E12, 0.05], [1.73434788E12, 0.016666666666666666], [1.73434836E12, 0.31666666666666665]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Get OS SR Access Token-success", "isController": false}, {"data": [[1.73434794E12, 0.016666666666666666], [1.73434824E12, 0.05], [1.7343483E12, 0.1], [1.73434818E12, 0.11666666666666667], [1.73434788E12, 0.016666666666666666], [1.73434842E12, 0.15], [1.73434776E12, 0.05], [1.73434782E12, 0.03333333333333333], [1.73434812E12, 0.016666666666666666], [1.7343477E12, 0.016666666666666666], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.05], [1.73434836E12, 0.16666666666666666]], "isOverall": false, "label": "Requests for DryRun-success", "isController": true}, {"data": [[1.73434836E12, 0.016666666666666666]], "isOverall": false, "label": "Requests for Import-failure", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Accept user-0-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434824E12, 0.11666666666666667], [1.73434776E12, 0.15], [1.73434782E12, 0.11666666666666667], [1.73434812E12, 0.2], [1.73434764E12, 0.1], [1.73434818E12, 0.36666666666666664], [1.7343477E12, 0.06666666666666667], [1.734348E12, 0.13333333333333333], [1.73434806E12, 0.08333333333333333], [1.73434758E12, 0.06666666666666667], [1.73434788E12, 0.16666666666666666]], "isOverall": false, "label": "Verify link-success", "isController": false}, {"data": [[1.73434794E12, 0.15], [1.73434776E12, 0.15], [1.73434782E12, 0.18333333333333332], [1.73434812E12, 0.1], [1.73434764E12, 0.16666666666666666], [1.73434818E12, 0.2], [1.7343477E12, 0.13333333333333333], [1.734348E12, 0.13333333333333333], [1.73434752E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.13333333333333333], [1.73434788E12, 0.18333333333333332]], "isOverall": false, "label": "Agree terms-0-success", "isController": false}, {"data": [[1.73434752E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.1], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Get sr keys-0-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Get SR DID-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Invite user-success", "isController": false}, {"data": [[1.73434794E12, 1.1666666666666667], [1.73434824E12, 2.283333333333333], [1.7343483E12, 2.1166666666666667], [1.73434764E12, 0.25], [1.73434818E12, 1.9166666666666667], [1.73434788E12, 0.7166666666666667], [1.73434776E12, 0.45], [1.73434782E12, 0.5666666666666667], [1.73434812E12, 1.6333333333333333], [1.7343477E12, 0.4666666666666667], [1.734348E12, 1.1833333333333333], [1.73434806E12, 1.3666666666666667], [1.73434836E12, 1.45]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.1], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Link SR profile-0-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Generate user hedera data-success", "isController": true}, {"data": [[1.73434794E12, 0.06666666666666667], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.05], [1.73434806E12, 0.06666666666666667], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Generate user keys-0-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Generate sr keys-0-success", "isController": false}, {"data": [[1.73434794E12, 5.15], [1.73434776E12, 3.75], [1.73434782E12, 4.15], [1.73434812E12, 4.083333333333333], [1.73434764E12, 1.7], [1.73434818E12, 1.2833333333333334], [1.7343477E12, 2.7666666666666666], [1.734348E12, 6.333333333333333], [1.73434752E12, 0.05], [1.73434806E12, 5.9], [1.73434758E12, 1.1166666666666667], [1.73434788E12, 4.5]], "isOverall": false, "label": "Get SR link result-0-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Invite sr-0-success", "isController": false}, {"data": [[1.73434794E12, 0.2], [1.73434824E12, 0.18333333333333332], [1.7343483E12, 0.08333333333333333], [1.73434764E12, 0.15], [1.73434818E12, 0.2833333333333333], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.11666666666666667], [1.73434788E12, 0.18333333333333332], [1.73434776E12, 0.21666666666666667], [1.73434782E12, 0.2], [1.73434812E12, 0.1], [1.7343477E12, 0.15], [1.734348E12, 0.18333333333333332], [1.73434806E12, 0.08333333333333333], [1.73434836E12, 0.31666666666666665]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.73434794E12, 5.15], [1.73434776E12, 3.75], [1.73434782E12, 4.15], [1.73434812E12, 4.083333333333333], [1.73434764E12, 1.7], [1.73434818E12, 1.2833333333333334], [1.7343477E12, 2.7666666666666666], [1.734348E12, 6.333333333333333], [1.73434752E12, 0.05], [1.73434806E12, 5.9], [1.73434758E12, 1.1166666666666667], [1.73434788E12, 4.5]], "isOverall": false, "label": "Get SR link result-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434824E12, 0.06666666666666667], [1.73434776E12, 0.05], [1.7343483E12, 0.08333333333333333], [1.73434782E12, 0.03333333333333333], [1.73434812E12, 0.016666666666666666], [1.73434818E12, 0.1], [1.7343477E12, 0.016666666666666666], [1.734348E12, 0.016666666666666666], [1.73434806E12, 0.05], [1.73434788E12, 0.016666666666666666], [1.73434836E12, 0.31666666666666665]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.73434794E12, 0.06666666666666667], [1.73434776E12, 0.08333333333333333], [1.73434782E12, 0.05], [1.73434812E12, 0.1], [1.73434764E12, 0.05], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.05], [1.73434806E12, 0.06666666666666667], [1.73434758E12, 0.05], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Login by user OS-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Get SR DID-0-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.73434794E12, 0.016666666666666666], [1.73434824E12, 0.05], [1.7343483E12, 0.1], [1.73434818E12, 0.11666666666666667], [1.73434788E12, 0.016666666666666666], [1.73434842E12, 0.15], [1.73434776E12, 0.05], [1.73434782E12, 0.03333333333333333], [1.73434812E12, 0.016666666666666666], [1.7343477E12, 0.016666666666666666], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.05], [1.73434836E12, 0.16666666666666666]], "isOverall": false, "label": "Dry Run Policy-success", "isController": false}, {"data": [[1.73434794E12, 0.11666666666666667], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.08333333333333333], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434806E12, 0.06666666666666667], [1.73434758E12, 0.1], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "User creation flow-success", "isController": true}, {"data": [[1.73434752E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-0-success", "isController": false}, {"data": [[1.73434794E12, 0.06666666666666667], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.05], [1.73434806E12, 0.06666666666666667], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Generate user keys-success", "isController": false}, {"data": [[1.73434794E12, 0.23333333333333334], [1.73434824E12, 0.18333333333333332], [1.7343483E12, 0.08333333333333333], [1.73434764E12, 0.15], [1.73434818E12, 0.2833333333333333], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.11666666666666667], [1.73434788E12, 0.15], [1.73434776E12, 0.21666666666666667], [1.73434782E12, 0.2], [1.73434812E12, 0.1], [1.7343477E12, 0.15], [1.734348E12, 0.18333333333333332], [1.73434806E12, 0.08333333333333333], [1.73434836E12, 0.31666666666666665]], "isOverall": false, "label": "Get SR Access Token-0-success", "isController": false}, {"data": [[1.73434794E12, 0.06666666666666667], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.06666666666666667], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.08333333333333333], [1.73434758E12, 0.03333333333333333], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Get user key gen result-0-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Invite sr-success", "isController": false}, {"data": [[1.73434836E12, 0.016666666666666666]], "isOverall": false, "label": "Get policy import result-failure", "isController": false}, {"data": [[1.73434794E12, 0.23333333333333334], [1.73434824E12, 0.18333333333333332], [1.7343483E12, 0.08333333333333333], [1.73434764E12, 0.15], [1.73434818E12, 0.2833333333333333], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.11666666666666667], [1.73434788E12, 0.15], [1.73434776E12, 0.21666666666666667], [1.73434782E12, 0.2], [1.73434812E12, 0.1], [1.7343477E12, 0.15], [1.734348E12, 0.18333333333333332], [1.73434806E12, 0.08333333333333333], [1.73434836E12, 0.31666666666666665]], "isOverall": false, "label": "Get SR Access Token-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.08333333333333333], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.11666666666666667], [1.73434752E12, 0.03333333333333333], [1.73434806E12, 0.016666666666666666], [1.73434758E12, 0.08333333333333333], [1.73434788E12, 0.1]], "isOverall": false, "label": "User creation(SR side)-success", "isController": true}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.08333333333333333], [1.73434752E12, 0.05], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Generate sr keys-success", "isController": false}, {"data": [[1.73434794E12, 0.06666666666666667], [1.73434776E12, 0.08333333333333333], [1.73434782E12, 0.05], [1.73434812E12, 0.1], [1.73434764E12, 0.05], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.05], [1.73434806E12, 0.06666666666666667], [1.73434758E12, 0.05], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Login by user OS-0-success", "isController": false}, {"data": [[1.73434794E12, 0.06666666666666667], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.05], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.05], [1.73434806E12, 0.06666666666666667], [1.73434758E12, 0.05], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Get OS user Access Token-success", "isController": false}, {"data": [[1.73434794E12, 0.05], [1.73434776E12, 0.05], [1.73434782E12, 0.08333333333333333], [1.73434812E12, 0.1], [1.73434764E12, 0.08333333333333333], [1.73434818E12, 0.2], [1.7343477E12, 0.03333333333333333], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.1], [1.73434758E12, 0.016666666666666666], [1.73434788E12, 0.08333333333333333]], "isOverall": false, "label": "Link user profile-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434824E12, 0.11666666666666667], [1.73434776E12, 0.15], [1.73434782E12, 0.11666666666666667], [1.73434812E12, 0.2], [1.73434764E12, 0.1], [1.73434818E12, 0.36666666666666664], [1.7343477E12, 0.06666666666666667], [1.734348E12, 0.13333333333333333], [1.73434806E12, 0.08333333333333333], [1.73434758E12, 0.06666666666666667], [1.73434788E12, 0.16666666666666666]], "isOverall": false, "label": "Verify link-0-success", "isController": false}, {"data": [[1.73434794E12, 0.016666666666666666], [1.73434824E12, 0.05], [1.7343483E12, 0.1], [1.73434818E12, 0.11666666666666667], [1.73434788E12, 0.016666666666666666], [1.73434842E12, 0.15], [1.73434776E12, 0.05], [1.73434782E12, 0.03333333333333333], [1.73434812E12, 0.016666666666666666], [1.7343477E12, 0.016666666666666666], [1.734348E12, 0.03333333333333333], [1.73434806E12, 0.05], [1.73434836E12, 0.16666666666666666]], "isOverall": false, "label": "Dry Run Policy-0-success", "isController": false}, {"data": [[1.73434794E12, 0.1], [1.73434776E12, 0.1], [1.73434782E12, 0.1], [1.73434764E12, 0.1], [1.7343477E12, 0.1], [1.734348E12, 0.1], [1.73434752E12, 0.03333333333333333], [1.73434758E12, 0.1], [1.73434788E12, 0.1]], "isOverall": false, "label": "Link SR profile-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73434842E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.73434752E12, "maxY": 21.533333333333335, "series": [{"data": [[1.73434794E12, 20.133333333333333], [1.73434824E12, 8.15], [1.7343483E12, 5.216666666666667], [1.73434764E12, 10.25], [1.73434818E12, 16.433333333333334], [1.73434752E12, 1.7666666666666666], [1.73434758E12, 6.983333333333333], [1.73434788E12, 18.933333333333334], [1.73434842E12, 0.6], [1.73434776E12, 15.483333333333333], [1.73434782E12, 17.15], [1.73434812E12, 16.983333333333334], [1.7343477E12, 12.116666666666667], [1.734348E12, 21.533333333333335], [1.73434806E12, 19.85], [1.73434836E12, 5.766666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.73434836E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73434842E12, "title": "Total Transactions Per Second"}},
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
