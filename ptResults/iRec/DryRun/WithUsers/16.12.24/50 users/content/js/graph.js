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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1467.0, "series": [{"data": [[0.0, 50.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[300.0, 17.0], [200.0, 83.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[300.0, 4.0], [200.0, 46.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[300.0, 6.0], [600.0, 5.0], [700.0, 35.0], [1500.0, 1.0], [200.0, 45.0], [800.0, 9.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[300.0, 28.0], [400.0, 13.0], [200.0, 9.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get OS user Access Token", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[300.0, 11.0], [200.0, 39.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get OS SR Access Token", "isController": false}, {"data": [[8400.0, 1.0], [8500.0, 2.0], [8300.0, 1.0], [8700.0, 1.0], [8600.0, 1.0], [8900.0, 2.0], [9100.0, 1.0], [9000.0, 1.0], [10000.0, 1.0], [10100.0, 1.0], [9800.0, 1.0], [10300.0, 1.0], [11100.0, 2.0], [11000.0, 1.0], [11300.0, 1.0], [11500.0, 2.0], [11400.0, 1.0], [12100.0, 1.0], [12400.0, 1.0], [14900.0, 1.0], [24000.0, 1.0], [6400.0, 1.0], [7100.0, 3.0], [7000.0, 1.0], [7300.0, 2.0], [7400.0, 1.0], [7600.0, 2.0], [7500.0, 3.0], [7800.0, 2.0], [7900.0, 5.0], [7700.0, 1.0], [8000.0, 3.0], [8100.0, 1.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1100.0, 18.0], [1200.0, 11.0], [1300.0, 1.0], [1400.0, 2.0], [1700.0, 2.0], [900.0, 2.0], [1800.0, 1.0], [1000.0, 13.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[300.0, 116.0], [600.0, 13.0], [700.0, 43.0], [200.0, 1271.0], [400.0, 5.0], [800.0, 12.0], [100.0, 3.0], [900.0, 1.0], [500.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[300.0, 9.0], [200.0, 41.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1100.0, 2.0], [600.0, 11.0], [1300.0, 1.0], [700.0, 2.0], [800.0, 2.0], [500.0, 32.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1100.0, 2.0], [600.0, 12.0], [1200.0, 3.0], [1300.0, 1.0], [700.0, 4.0], [1500.0, 1.0], [800.0, 2.0], [1700.0, 3.0], [1800.0, 3.0], [900.0, 1.0], [1000.0, 7.0], [500.0, 11.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[300.0, 4.0], [200.0, 46.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[300.0, 5.0], [200.0, 45.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[2000.0, 51.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[300.0, 21.0], [200.0, 27.0], [400.0, 2.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[0.0, 150.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[34200.0, 2.0], [32800.0, 1.0], [32900.0, 1.0], [33200.0, 1.0], [34400.0, 2.0], [34600.0, 1.0], [34800.0, 1.0], [34500.0, 1.0], [34000.0, 1.0], [34900.0, 1.0], [35200.0, 1.0], [35300.0, 1.0], [35600.0, 1.0], [35100.0, 1.0], [36500.0, 1.0], [37700.0, 2.0], [37200.0, 1.0], [37800.0, 1.0], [38700.0, 1.0], [38400.0, 1.0], [38800.0, 1.0], [39300.0, 3.0], [39400.0, 1.0], [39700.0, 1.0], [39000.0, 3.0], [40700.0, 1.0], [40100.0, 1.0], [39900.0, 1.0], [40400.0, 1.0], [39100.0, 1.0], [42800.0, 1.0], [41900.0, 2.0], [42200.0, 1.0], [41700.0, 2.0], [42600.0, 1.0], [41300.0, 1.0], [42300.0, 1.0], [43200.0, 1.0], [44700.0, 1.0], [43700.0, 1.0], [43500.0, 1.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[8400.0, 4.0], [8300.0, 2.0], [8700.0, 2.0], [8600.0, 1.0], [8500.0, 1.0], [9200.0, 2.0], [8900.0, 3.0], [9000.0, 1.0], [9100.0, 1.0], [9700.0, 1.0], [9400.0, 1.0], [9500.0, 2.0], [9600.0, 1.0], [10000.0, 3.0], [9800.0, 2.0], [10100.0, 1.0], [10200.0, 1.0], [10400.0, 1.0], [11200.0, 1.0], [10900.0, 1.0], [11100.0, 1.0], [11300.0, 1.0], [12100.0, 1.0], [11900.0, 1.0], [12200.0, 1.0], [12300.0, 3.0], [13200.0, 1.0], [12900.0, 1.0], [13900.0, 1.0], [15800.0, 1.0], [24900.0, 1.0], [7300.0, 1.0], [7900.0, 3.0], [8000.0, 1.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Import Policy i-Rec-0", "isController": false}, {"data": [[300.0, 23.0], [600.0, 1.0], [700.0, 6.0], [200.0, 262.0], [400.0, 4.0], [800.0, 6.0], [100.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[8500.0, 1.0], [8400.0, 1.0], [8700.0, 1.0], [11700.0, 1.0], [11600.0, 1.0], [11800.0, 1.0], [11900.0, 1.0], [12700.0, 2.0], [12900.0, 1.0], [15200.0, 1.0], [14900.0, 2.0], [15000.0, 1.0], [15300.0, 1.0], [15700.0, 1.0], [15800.0, 1.0], [15500.0, 1.0], [16000.0, 1.0], [16300.0, 1.0], [16400.0, 1.0], [18300.0, 2.0], [18100.0, 1.0], [18500.0, 1.0], [18900.0, 1.0], [22000.0, 1.0], [21900.0, 1.0], [25100.0, 1.0], [25400.0, 1.0], [25300.0, 3.0], [24900.0, 1.0], [25700.0, 1.0], [28300.0, 1.0], [28400.0, 1.0], [28200.0, 1.0], [29300.0, 1.0], [29600.0, 1.0], [32100.0, 1.0], [35200.0, 2.0], [35300.0, 2.0], [38200.0, 1.0], [37800.0, 1.0], [38100.0, 1.0], [41500.0, 1.0], [48000.0, 1.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[15700.0, 2.0], [16100.0, 1.0], [16500.0, 1.0], [17200.0, 2.0], [17300.0, 1.0], [18400.0, 1.0], [17700.0, 3.0], [17500.0, 2.0], [17800.0, 1.0], [18200.0, 1.0], [18600.0, 1.0], [18800.0, 1.0], [19200.0, 1.0], [19300.0, 1.0], [20100.0, 1.0], [19700.0, 1.0], [20300.0, 1.0], [20600.0, 2.0], [20800.0, 1.0], [20900.0, 2.0], [20700.0, 1.0], [21000.0, 1.0], [22000.0, 1.0], [22400.0, 1.0], [21900.0, 1.0], [22300.0, 2.0], [21800.0, 1.0], [23200.0, 2.0], [22600.0, 2.0], [22800.0, 1.0], [23800.0, 1.0], [24500.0, 1.0], [23900.0, 1.0], [24700.0, 1.0], [24800.0, 1.0], [25200.0, 1.0], [25100.0, 1.0], [24600.0, 1.0], [24900.0, 1.0], [26400.0, 1.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get OS SR Access Token-0", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[42900.0, 1.0], [42600.0, 1.0], [43000.0, 2.0], [43100.0, 2.0], [43200.0, 1.0], [44400.0, 1.0], [53100.0, 1.0], [52700.0, 1.0], [53400.0, 1.0], [63400.0, 2.0], [63500.0, 2.0], [65000.0, 1.0], [63700.0, 1.0], [64000.0, 1.0], [63600.0, 3.0], [74700.0, 2.0], [73800.0, 2.0], [74600.0, 1.0], [74000.0, 1.0], [74100.0, 1.0], [74500.0, 1.0], [73900.0, 1.0], [84700.0, 2.0], [85000.0, 1.0], [84500.0, 2.0], [84800.0, 1.0], [95100.0, 1.0], [95300.0, 1.0], [96000.0, 1.0], [94900.0, 1.0], [95700.0, 1.0], [96400.0, 1.0], [96900.0, 2.0], [105900.0, 1.0], [105800.0, 1.0], [105200.0, 1.0], [105600.0, 1.0], [107600.0, 1.0], [115500.0, 1.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[300.0, 8.0], [600.0, 1.0], [700.0, 1.0], [200.0, 38.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Import Policy i-Rec", "isController": false}, {"data": [[13300.0, 2.0], [13100.0, 1.0], [13500.0, 1.0], [13600.0, 4.0], [13800.0, 1.0], [13400.0, 1.0], [13900.0, 3.0], [14000.0, 1.0], [14100.0, 1.0], [14300.0, 1.0], [14200.0, 1.0], [14400.0, 2.0], [14700.0, 2.0], [14500.0, 4.0], [14800.0, 2.0], [14600.0, 1.0], [15300.0, 3.0], [15000.0, 3.0], [14900.0, 2.0], [15100.0, 2.0], [15200.0, 1.0], [15800.0, 3.0], [15600.0, 1.0], [16000.0, 2.0], [15900.0, 1.0], [16100.0, 2.0], [16300.0, 1.0], [16600.0, 1.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 351.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[0.0, 101.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[0.0, 305.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[2400.0, 10.0], [2500.0, 38.0], [2600.0, 2.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[0.0, 150.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[72900.0, 1.0], [70700.0, 1.0], [71700.0, 1.0], [72700.0, 1.0], [73100.0, 1.0], [72300.0, 2.0], [72100.0, 1.0], [82500.0, 1.0], [82900.0, 1.0], [86100.0, 1.0], [88700.0, 1.0], [89700.0, 1.0], [93900.0, 1.0], [94100.0, 1.0], [104700.0, 1.0], [107700.0, 1.0], [109300.0, 1.0], [109100.0, 1.0], [117100.0, 1.0], [116100.0, 1.0], [51000.0, 1.0], [52200.0, 1.0], [52900.0, 1.0], [51600.0, 1.0], [51400.0, 1.0], [52300.0, 1.0], [53100.0, 1.0], [54200.0, 1.0], [61000.0, 1.0], [62900.0, 1.0], [71400.0, 1.0], [73600.0, 1.0], [77600.0, 1.0], [83400.0, 1.0], [86000.0, 1.0], [84600.0, 1.0], [84400.0, 1.0], [94000.0, 1.0], [94800.0, 1.0], [97400.0, 1.0], [97200.0, 1.0], [104600.0, 1.0], [104800.0, 1.0], [104400.0, 1.0], [107600.0, 1.0], [114000.0, 1.0], [117200.0, 1.0], [120800.0, 1.0], [125800.0, 1.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[2100.0, 1.0], [2400.0, 1.0], [1400.0, 1.0], [2900.0, 1.0], [1500.0, 7.0], [1600.0, 15.0], [1700.0, 13.0], [1800.0, 7.0], [1900.0, 4.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[136800.0, 1.0], [146600.0, 1.0], [146400.0, 2.0], [143800.0, 1.0], [153000.0, 1.0], [133500.0, 1.0], [149700.0, 1.0], [156300.0, 1.0], [41200.0, 1.0], [41100.0, 1.0], [166300.0, 1.0], [44600.0, 1.0], [44900.0, 1.0], [44800.0, 1.0], [52200.0, 1.0], [57800.0, 1.0], [57600.0, 1.0], [60800.0, 1.0], [61100.0, 1.0], [64200.0, 2.0], [64100.0, 1.0], [67300.0, 1.0], [70800.0, 1.0], [77200.0, 1.0], [83400.0, 1.0], [84000.0, 1.0], [86900.0, 1.0], [87300.0, 1.0], [96700.0, 1.0], [96900.0, 1.0], [97400.0, 1.0], [100300.0, 1.0], [100600.0, 1.0], [103600.0, 1.0], [103500.0, 1.0], [103700.0, 1.0], [106500.0, 1.0], [107700.0, 1.0], [107500.0, 1.0], [113700.0, 1.0], [114100.0, 1.0], [111000.0, 2.0], [117600.0, 1.0], [120400.0, 1.0], [120300.0, 1.0], [126900.0, 1.0], [127000.0, 1.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 51.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[600.0, 12.0], [700.0, 4.0], [1800.0, 1.0], [900.0, 1.0], [500.0, 31.0], [1000.0, 1.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[4100.0, 1.0], [2500.0, 5.0], [2600.0, 2.0], [2700.0, 12.0], [2800.0, 11.0], [2900.0, 4.0], [3000.0, 5.0], [3100.0, 4.0], [3300.0, 2.0], [3200.0, 2.0], [3800.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[300.0, 44.0], [600.0, 3.0], [700.0, 38.0], [200.0, 245.0], [800.0, 20.0], [1000.0, 1.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[2000.0, 51.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[2400.0, 18.0], [2500.0, 28.0], [2600.0, 4.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[0.0, 1467.0], [100.0, 1.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[18800.0, 1.0], [13700.0, 33.0], [13800.0, 15.0], [13900.0, 1.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[300.0, 17.0], [200.0, 81.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[300.0, 13.0], [700.0, 1.0], [200.0, 136.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[18800.0, 1.0], [13800.0, 16.0], [13700.0, 31.0], [13900.0, 2.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[2100.0, 2.0], [2200.0, 3.0], [600.0, 44.0], [2400.0, 1.0], [700.0, 16.0], [2700.0, 1.0], [800.0, 7.0], [900.0, 6.0], [1000.0, 4.0], [1100.0, 3.0], [1200.0, 4.0], [1300.0, 2.0], [1400.0, 3.0], [1800.0, 2.0], [1900.0, 1.0], [500.0, 50.0], [2000.0, 1.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get OS user Access Token-0", "isController": false}, {"data": [[0.0, 51.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 166300.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 484.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 6604.0, "series": [{"data": [[0.0, 6604.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 484.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 572.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7343465E12, "maxY": 26.040570175438596, "series": [{"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.7343465E12, 1.0]], "isOverall": false, "label": "Tenant creation", "isController": false}, {"data": [[1.73434698E12, 26.040570175438596], [1.73434668E12, 15.13997308209959], [1.73434656E12, 9.18554687500001], [1.73434722E12, 3.947368421052633], [1.73434662E12, 13.730182926829272], [1.73434692E12, 23.62396694214876], [1.7343468E12, 19.07932692307694], [1.7343465E12, 3.735849056603774], [1.73434686E12, 21.052344601962922], [1.73434716E12, 11.039301310043667], [1.73434674E12, 17.596627756160842], [1.73434704E12, 21.216444981862175], [1.7343471E12, 16.326180257510725]], "isOverall": false, "label": "Policy workflow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73434722E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 120894.0, "series": [{"data": [[2.0, 0.0], [3.0, 0.0], [4.0, 0.0], [5.0, 0.0], [6.0, 1.0], [7.0, 1.0], [8.0, 0.0], [9.0, 0.0], [10.0, 1.0], [11.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 0.0], [15.0, 0.75], [1.0, 0.0], [16.0, 0.3333333333333333], [17.0, 0.5], [18.0, 0.2], [19.0, 0.5], [20.0, 0.6666666666666666], [21.0, 0.6666666666666667], [22.0, 0.0], [23.0, 0.33333333333333337], [24.0, 0.0], [25.0, 0.0], [26.0, 0.5], [27.0, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[16.1, 0.37999999999999995]], "isOverall": false, "label": "Invite user-0-Aggregated", "isController": false}, {"data": [[2.0, 267.0], [3.0, 281.0], [4.0, 246.0], [5.0, 277.0], [7.0, 244.0], [8.0, 334.0], [9.0, 248.66666666666666], [10.0, 248.0], [11.0, 268.5], [12.0, 255.0], [13.0, 239.66666666666666], [14.0, 263.29999999999995], [15.0, 274.4], [16.0, 237.0], [17.0, 279.55555555555554], [18.0, 303.0], [19.0, 281.3], [20.0, 270.7142857142857], [21.0, 264.875], [22.0, 249.0], [23.0, 274.0], [24.0, 217.0], [25.0, 279.0], [26.0, 268.0], [27.0, 270.75]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[17.290000000000003, 269.72000000000014]], "isOverall": false, "label": "Agree terms-Aggregated", "isController": false}, {"data": [[2.0, 296.0], [3.0, 254.0], [4.0, 237.0], [5.0, 249.0], [7.0, 330.0], [8.0, 209.0], [9.0, 203.0], [10.0, 221.0], [11.0, 280.0], [12.0, 246.0], [13.0, 253.0], [14.0, 242.4], [15.0, 260.75], [16.0, 232.0], [17.0, 242.33333333333334], [18.0, 267.75], [19.0, 279.6666666666667], [20.0, 247.0], [21.0, 325.5], [22.0, 240.0], [23.0, 228.0], [24.0, 261.0], [25.0, 257.0], [26.0, 244.5], [27.0, 262.5]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[16.38, 256.64]], "isOverall": false, "label": "Link SR profile-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [3.0, 0.0], [4.0, 3.0], [5.0, 0.0], [6.0, 1.0], [7.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 0.0], [11.0, 0.0], [12.0, 0.0], [13.0, 1.0], [14.0, 3.75], [15.0, 0.0], [1.0, 0.0], [16.0, 0.25], [17.0, 1.5], [18.0, 0.33333333333333337], [19.0, 0.5], [20.0, 0.33333333333333337], [21.0, 0.6666666666666666], [22.0, 0.0], [23.0, 0.3333333333333333], [24.0, 1.0], [25.0, 1.0], [26.0, 0.5], [27.0, 1.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[16.159999999999997, 0.7800000000000001]], "isOverall": false, "label": "Invite sr-0-Aggregated", "isController": false}, {"data": [[9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [13.0, 1.0], [14.0, 3.8], [15.0, 0.6666666666666666], [17.0, 1.0], [18.0, 1.5], [19.0, 1.1428571428571428], [20.0, 1.0], [21.0, 1.1428571428571428], [22.0, 0.6666666666666667], [23.0, 1.0], [25.0, 0.0], [26.0, 1.0], [27.0, 0.5]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[18.200000000000003, 1.2399999999999998]], "isOverall": false, "label": "Link user profile-0-Aggregated", "isController": false}, {"data": [[2.0, 525.5], [3.0, 505.5], [4.0, 489.5], [5.0, 511.5], [6.0, 551.5], [7.0, 889.5], [8.0, 554.0], [9.0, 565.0], [10.0, 534.0], [11.0, 499.5], [12.0, 504.5], [13.0, 479.0], [14.0, 484.2857142857143], [15.0, 483.625], [1.0, 435.0], [16.0, 518.0], [17.0, 503.25], [18.0, 424.625], [19.0, 572.8333333333333], [20.0, 505.66666666666663], [21.0, 541.6666666666666], [22.0, 482.0], [23.0, 517.5], [24.0, 500.25], [25.0, 487.0], [26.0, 494.75], [27.0, 494.5]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[15.99009900990099, 510.0495049504952]], "isOverall": false, "label": "Get Admin Access Token-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [3.0, 1.0], [4.0, 1.0], [5.0, 0.0], [7.0, 1.0], [8.0, 2.0], [9.0, 1.3333333333333333], [10.0, 1.0], [11.0, 0.5], [12.0, 0.0], [13.0, 0.6666666666666667], [14.0, 1.4], [15.0, 0.8], [16.0, 1.0], [17.0, 1.3333333333333333], [18.0, 2.3333333333333335], [19.0, 1.2999999999999998], [20.0, 1.0], [21.0, 0.5], [22.0, 0.8], [23.0, 1.0], [24.0, 2.0], [25.0, 0.5], [26.0, 0.6666666666666667], [27.0, 0.75]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[17.290000000000003, 1.0699999999999996]], "isOverall": false, "label": "Agree terms-0-Aggregated", "isController": false}, {"data": [[2.0, 351.0], [3.0, 400.0], [4.0, 426.0], [5.0, 304.0], [6.0, 441.0], [7.0, 335.0], [8.0, 387.0], [9.0, 312.0], [10.0, 338.0], [11.0, 482.0], [12.0, 265.0], [13.0, 290.0], [14.0, 379.75], [15.0, 317.6666666666667], [1.0, 446.0], [16.0, 320.75], [17.0, 375.0], [18.0, 327.0], [19.0, 343.25], [20.0, 407.3333333333333], [21.0, 410.0], [22.0, 327.0], [23.0, 409.0], [24.0, 323.0], [25.0, 292.0], [26.0, 366.0], [27.0, 310.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[16.159999999999997, 358.98]], "isOverall": false, "label": "Invite sr-Aggregated", "isController": false}, {"data": [[8.0, 2069.0], [9.0, 2066.0], [10.0, 2057.0], [12.0, 2064.0], [13.0, 2064.0], [14.0, 2063.2], [15.0, 2073.0], [16.0, 2055.0], [17.0, 2056.8], [18.0, 2060.0], [19.0, 2062.25], [20.0, 2067.5], [21.0, 2062.6], [22.0, 2060.6666666666665], [24.0, 2059.2], [25.0, 2053.0], [26.0, 2059.0], [27.0, 2066.5], [7.0, 2068.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[18.499999999999996, 2061.8999999999996]], "isOverall": false, "label": "Generate user keys-Aggregated", "isController": false}, {"data": [[8.0, 2072.0], [9.0, 2072.0], [10.0, 2067.0], [12.0, 2057.0], [13.0, 2059.0], [14.0, 2067.3333333333335], [15.0, 2066.8], [16.0, 2064.0], [17.0, 2066.25], [18.0, 2063.0], [19.0, 2064.375], [20.0, 2060.5], [21.0, 2063.428571428571], [22.0, 2062.0], [23.0, 2063.0], [24.0, 2065.25], [25.0, 2065.0], [27.0, 2072.5], [7.0, 2078.0]], "isOverall": false, "label": "Get OS user Access Token", "isController": false}, {"data": [[18.4, 2065.2400000000002]], "isOverall": false, "label": "Get OS user Access Token-Aggregated", "isController": false}, {"data": [[2.0, 2091.0], [3.0, 2068.0], [4.0, 2076.0], [5.0, 2044.0], [6.0, 2075.0], [8.0, 2063.5], [9.0, 2063.0], [10.0, 2054.0], [11.0, 2055.0], [12.0, 2071.0], [13.0, 2066.0], [14.0, 2069.75], [15.0, 2059.5], [1.0, 2069.0], [16.0, 2066.5], [17.0, 2066.75], [18.0, 2066.6666666666665], [19.0, 2064.5], [20.0, 2060.0], [21.0, 2059.0], [22.0, 2066.75], [23.0, 2065.5], [24.0, 2053.0], [25.0, 2064.5], [26.0, 2073.0], [27.0, 2068.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[15.86, 2065.2]], "isOverall": false, "label": "Generate sr keys-Aggregated", "isController": false}, {"data": [[8.0, 264.3333333333333], [9.0, 300.0], [10.0, 275.0], [11.0, 278.6666666666667], [12.0, 306.0], [3.0, 305.0], [14.0, 269.5], [15.0, 273.0], [17.0, 280.3333333333333], [18.0, 231.25], [19.0, 284.25], [20.0, 280.5], [5.0, 287.0], [21.0, 268.25], [23.0, 281.0], [24.0, 263.5], [25.0, 259.0], [27.0, 283.6666666666667]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[16.580000000000005, 273.04]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[1.0, 1703.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.0, 1703.0]], "isOverall": false, "label": "Tenant creation flow-Aggregated", "isController": true}, {"data": [[2.0, 20.0], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [8.0, 0.5], [9.0, 0.0], [10.0, 1.0], [11.0, 0.0], [12.0, 1.0], [13.0, 0.0], [14.0, 0.5], [15.0, 0.5], [1.0, 0.0], [16.0, 0.5], [17.0, 0.5], [18.0, 0.6666666666666667], [19.0, 1.0], [20.0, 0.6666666666666666], [21.0, 0.0], [22.0, 0.5], [23.0, 0.5], [24.0, 0.0], [25.0, 0.5], [26.0, 0.0], [27.0, 1.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[15.86, 0.9399999999999998]], "isOverall": false, "label": "Generate sr keys-0-Aggregated", "isController": false}, {"data": [[2.0, 2070.0], [3.0, 2066.0], [4.0, 2053.0], [5.0, 2060.0], [6.0, 2079.0], [7.0, 2066.0], [8.0, 2061.0], [9.0, 2057.0], [10.0, 2064.0], [11.0, 2064.0], [12.0, 2047.0], [13.0, 2066.5], [14.0, 2066.8], [15.0, 2065.75], [1.0, 2056.0], [16.0, 2083.0], [17.0, 2062.5], [18.0, 2061.2], [19.0, 2070.3333333333335], [20.0, 2064.0], [21.0, 2064.0], [22.0, 2063.0], [23.0, 2070.0], [24.0, 2064.0], [25.0, 2064.0], [26.0, 2064.5], [27.0, 2065.0]], "isOverall": false, "label": "Get OS SR Access Token", "isController": false}, {"data": [[15.879999999999999, 2064.7999999999997]], "isOverall": false, "label": "Get OS SR Access Token-Aggregated", "isController": false}, {"data": [[2.0, 14931.0], [3.0, 11543.0], [4.0, 11003.0], [5.0, 11150.0], [6.0, 10324.0], [7.0, 11115.0], [8.0, 8934.0], [9.0, 12106.0], [10.0, 12451.0], [11.0, 7381.0], [12.0, 7565.0], [13.0, 7942.0], [14.0, 8212.5], [15.0, 8045.4], [16.0, 7647.25], [1.0, 24069.0], [17.0, 8088.0], [18.0, 8305.75], [19.0, 7330.25], [20.0, 8232.333333333334], [21.0, 8337.666666666666], [22.0, 7898.5], [23.0, 9402.0], [24.0, 8757.0], [25.0, 9869.0], [26.0, 10862.0], [27.0, 10023.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[16.219999999999995, 9224.599999999997]], "isOverall": false, "label": "Dry Run Policy-Aggregated", "isController": false}, {"data": [[2.0, 1017.0], [3.0, 1032.0], [4.0, 1125.0], [5.0, 1038.0], [6.0, 1147.0], [7.0, 1737.0], [8.0, 1192.0], [9.0, 966.0], [10.0, 1712.0], [11.0, 1280.0], [12.0, 1209.0], [13.0, 1192.0], [14.0, 1165.75], [15.0, 1307.0], [1.0, 1042.0], [16.0, 1146.6666666666667], [17.0, 1143.0], [18.0, 1173.6], [19.0, 1112.5], [20.0, 1214.3333333333333], [21.0, 1242.25], [22.0, 1411.0], [23.0, 1156.0], [24.0, 1134.0], [25.0, 1012.0], [26.0, 1144.0], [27.0, 1052.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[16.08, 1190.2]], "isOverall": false, "label": "Invite and accept user-Aggregated", "isController": true}, {"data": [[3.0, 240.66666666666666], [4.0, 248.0], [5.0, 228.77777777777777], [6.0, 238.08333333333337], [7.0, 364.8333333333333], [8.0, 292.1538461538461], [9.0, 270.16666666666663], [10.0, 265.74999999999994], [11.0, 292.07142857142856], [12.0, 287.4666666666667], [13.0, 276.66666666666663], [14.0, 274.45454545454544], [15.0, 279.00000000000006], [16.0, 282.8518518518519], [17.0, 277.1272727272727], [18.0, 267.0583333333332], [19.0, 299.05217391304353], [20.0, 271.3119266055046], [21.0, 284.208053691275], [22.0, 272.66071428571445], [23.0, 283.61224489795916], [24.0, 276.578651685393], [25.0, 271.3953488372093], [26.0, 275.1111111111112], [27.0, 284.00757575757564]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[19.95027247956402, 279.13896457765685]], "isOverall": false, "label": "Get SR link result-Aggregated", "isController": false}, {"data": [[9.0, 266.5], [10.0, 313.0], [11.0, 241.0], [13.0, 226.0], [14.0, 261.4], [15.0, 229.33333333333331], [17.0, 261.8333333333333], [18.0, 265.5], [19.0, 270.8571428571429], [20.0, 251.0], [21.0, 253.16666666666669], [22.0, 282.0], [23.0, 269.75], [25.0, 281.0], [26.0, 332.0], [27.0, 245.5]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[18.200000000000006, 260.25999999999993]], "isOverall": false, "label": "Get User Access Token-Aggregated", "isController": false}, {"data": [[2.0, 514.0], [3.0, 503.0], [4.0, 609.0], [5.0, 548.0], [6.0, 553.0], [7.0, 1169.0], [8.0, 628.0], [9.0, 505.0], [10.0, 1143.0], [11.0, 562.0], [12.0, 563.0], [13.0, 585.0], [14.0, 570.5], [15.0, 769.0], [1.0, 503.0], [16.0, 642.0], [17.0, 559.5], [18.0, 622.6], [19.0, 583.0], [20.0, 615.3333333333334], [21.0, 585.25], [22.0, 818.0], [23.0, 629.6666666666666], [24.0, 572.0], [25.0, 540.0], [26.0, 602.0], [27.0, 556.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[16.08, 628.0999999999998]], "isOverall": false, "label": "Accept user-Aggregated", "isController": false}, {"data": [[9.0, 736.5], [10.0, 1742.0], [11.0, 1086.0], [13.0, 630.0], [14.0, 953.5], [15.0, 1036.857142857143], [17.0, 695.2], [18.0, 631.6666666666666], [19.0, 901.7142857142857], [20.0, 1142.6666666666667], [21.0, 1043.25], [22.0, 1204.5], [23.0, 843.25], [26.0, 556.5], [27.0, 788.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[18.3, 923.34]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[9.0, 253.5], [10.0, 215.0], [11.0, 289.0], [13.0, 258.0], [14.0, 257.8], [15.0, 239.33333333333331], [17.0, 255.5], [18.0, 262.0], [19.0, 274.5714285714286], [20.0, 283.5], [21.0, 281.7142857142857], [22.0, 252.0], [23.0, 259.0], [25.0, 319.0], [26.0, 352.0], [27.0, 238.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[18.220000000000002, 263.9800000000001]], "isOverall": false, "label": "Get SR DID-Aggregated", "isController": false}, {"data": [[9.0, 258.5], [10.0, 211.0], [11.0, 254.0], [13.0, 249.0], [14.0, 280.2], [15.0, 232.83333333333334], [17.0, 257.33333333333337], [18.0, 240.5], [19.0, 247.14285714285714], [20.0, 231.5], [21.0, 263.2857142857143], [22.0, 266.3333333333333], [23.0, 278.6666666666667], [25.0, 228.0], [26.0, 258.0], [27.0, 239.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[18.200000000000003, 253.77999999999992]], "isOverall": false, "label": "Link user profile-Aggregated", "isController": false}, {"data": [[2.0, 2058.0], [3.0, 2067.0], [4.0, 2047.0], [5.0, 2061.0], [6.0, 2069.5], [7.0, 2056.0], [8.0, 2059.0], [9.0, 2076.0], [10.0, 2065.0], [11.0, 2056.0], [12.0, 2049.0], [13.0, 2075.0], [14.0, 2066.333333333333], [15.0, 2057.5], [16.0, 2065.6666666666665], [17.0, 2062.0], [18.0, 2065.2], [19.0, 2060.5], [20.0, 2069.0], [21.0, 2062.3333333333335], [22.0, 2063.0], [23.0, 2061.6666666666665], [24.0, 2067.0], [25.0, 2042.0], [26.0, 2062.0], [27.0, 2058.5]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[16.333333333333332, 2063.078431372549]], "isOverall": false, "label": "Get key gen result-Aggregated", "isController": false}, {"data": [[2.0, 258.0], [3.0, 295.0], [4.0, 257.0], [5.0, 263.0], [6.0, 293.0], [7.0, 323.0], [8.0, 307.0], [9.0, 217.0], [10.0, 316.0], [11.0, 467.0], [12.0, 331.0], [13.0, 387.0], [14.0, 317.5], [15.0, 286.75], [1.0, 233.0], [16.0, 271.6666666666667], [17.0, 316.0], [18.0, 300.4], [19.0, 277.5], [20.0, 317.3333333333333], [21.0, 375.3333333333333], [22.0, 330.0], [23.0, 286.0], [24.0, 322.5], [25.0, 221.0], [26.0, 276.5], [27.0, 276.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[16.1, 303.18000000000006]], "isOverall": false, "label": "Invite user-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [3.0, 1.3333333333333333], [4.0, 1.0], [5.0, 0.5], [7.0, 1.0], [8.0, 1.4], [9.0, 3.5], [10.0, 1.3333333333333333], [11.0, 1.0], [12.0, 1.3333333333333333], [13.0, 1.3333333333333333], [14.0, 1.0666666666666667], [15.0, 1.2142857142857144], [16.0, 1.6666666666666667], [17.0, 1.1666666666666667], [18.0, 0.7999999999999999], [19.0, 1.2307692307692308], [20.0, 1.1000000000000003], [21.0, 0.8999999999999999], [22.0, 0.8], [23.0, 0.6], [24.0, 1.0], [25.0, 0.75], [26.0, 0.0], [27.0, 0.5714285714285714]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[17.14666666666666, 1.0666666666666667]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[9.0, 34261.0], [10.0, 32830.0], [11.0, 32953.0], [12.0, 41765.0], [13.0, 33239.0], [14.0, 35398.4], [15.0, 35836.5], [16.0, 34964.0], [17.0, 39646.71428571429], [18.0, 36447.5], [19.0, 40614.0], [20.0, 38358.0], [21.0, 42399.75], [22.0, 39284.666666666664], [24.0, 40875.0], [25.0, 40070.0], [27.0, 42375.5]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[18.360000000000003, 38457.600000000006]], "isOverall": false, "label": "User creation flow-Aggregated", "isController": true}, {"data": [[1.0, 301.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.0, 301.0]], "isOverall": false, "label": "Setup ipfs-Aggregated", "isController": false}, {"data": [[2.0, 15840.0], [3.0, 12346.0], [4.0, 12234.0], [5.0, 12375.0], [6.0, 11184.0], [7.0, 11926.0], [8.0, 9804.0], [9.0, 12911.0], [10.0, 13281.0], [11.0, 8425.0], [12.0, 8402.0], [13.0, 9288.0], [14.0, 9276.5], [15.0, 8982.6], [16.0, 9046.25], [1.0, 24939.0], [17.0, 10455.0], [18.0, 9531.5], [19.0, 8604.5], [20.0, 9071.666666666666], [21.0, 9197.0], [22.0, 8799.5], [23.0, 10376.666666666666], [24.0, 10091.5], [25.0, 10931.0], [26.0, 11794.5], [27.0, 11336.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[16.219999999999995, 10303.579999999996]], "isOverall": false, "label": "Requests for DryRun-Aggregated", "isController": true}, {"data": [[9.0, 1.0], [10.0, 1.0], [11.0, 0.0], [12.0, 1.0], [13.0, 0.0], [14.0, 1.4], [15.0, 1.25], [16.0, 0.5], [17.0, 2.4285714285714284], [18.0, 1.6666666666666667], [19.0, 1.6], [20.0, 1.3333333333333333], [21.0, 0.75], [22.0, 1.6666666666666667], [24.0, 1.2], [25.0, 0.0], [27.0, 0.5]], "isOverall": false, "label": "Import Policy i-Rec-0", "isController": false}, {"data": [[18.379999999999995, 1.3000000000000003]], "isOverall": false, "label": "Import Policy i-Rec-0-Aggregated", "isController": false}, {"data": [[9.0, 253.5], [10.0, 254.75], [11.0, 232.66666666666666], [12.0, 316.85714285714283], [13.0, 251.8], [14.0, 255.93749999999997], [15.0, 245.0], [16.0, 253.44444444444446], [17.0, 275.7931034482758], [18.0, 356.00000000000006], [19.0, 264.1428571428571], [20.0, 278.30434782608694], [21.0, 280.3333333333333], [22.0, 243.66666666666666], [23.0, 248.16666666666669], [24.0, 287.4800000000001], [25.0, 252.0], [26.0, 278.1666666666667], [27.0, 386.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[19.216393442622937, 278.7573770491802]], "isOverall": false, "label": "Get user link result-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 1.0], [16.0, 1.0], [17.0, 0.6], [18.0, 0.5], [19.0, 0.625], [20.0, 0.75], [21.0, 0.6], [22.0, 0.0], [24.0, 0.6], [25.0, 0.0], [26.0, 0.0], [27.0, 0.5], [7.0, 1.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[18.499999999999996, 0.6599999999999998]], "isOverall": false, "label": "Generate user keys-0-Aggregated", "isController": false}, {"data": [[0.0, 22359.739999999994]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 22359.739999999994]], "isOverall": false, "label": "Link user-Aggregated", "isController": true}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[8.0, 16116.0], [9.0, 15715.0], [11.0, 18423.0], [12.0, 17726.0], [14.0, 17487.5], [15.0, 17517.666666666668], [16.0, 18225.666666666668], [17.0, 21725.0], [18.0, 19621.333333333332], [19.0, 21194.125000000004], [20.0, 20658.0], [21.0, 23120.777777777777], [22.0, 22441.0], [23.0, 21429.0], [24.0, 25419.0], [25.0, 23527.5], [27.0, 24827.5], [7.0, 16162.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[18.339999999999996, 20739.480000000003]], "isOverall": false, "label": "User creation(SR side)-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [3.0, 0.0], [4.0, 0.0], [5.0, 1.0], [6.0, 0.0], [7.0, 0.0], [8.0, 1.0], [9.0, 1.0], [10.0, 0.0], [11.0, 0.0], [12.0, 1.0], [13.0, 0.0], [14.0, 0.2], [15.0, 0.25], [1.0, 1.0], [16.0, 1.0], [17.0, 0.0], [18.0, 0.4], [19.0, 2.6666666666666665], [20.0, 0.25], [21.0, 0.0], [22.0, 0.0], [23.0, 0.3333333333333333], [24.0, 0.0], [25.0, 0.0], [26.0, 1.0], [27.0, 1.0]], "isOverall": false, "label": "Get OS SR Access Token-0", "isController": false}, {"data": [[15.879999999999999, 0.46000000000000013]], "isOverall": false, "label": "Get OS SR Access Token-0-Aggregated", "isController": false}, {"data": [[9.0, 2051.5], [10.0, 2064.0], [11.0, 2071.0], [13.0, 2045.0], [14.0, 2066.5], [15.0, 2065.8333333333335], [16.0, 2073.0], [17.0, 2057.0], [18.0, 2066.75], [19.0, 2063.0], [20.0, 2056.3333333333335], [21.0, 2062.75], [22.0, 2056.0], [23.0, 2060.6], [24.0, 2053.5], [26.0, 2063.0], [27.0, 2060.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[18.44, 2061.7000000000003]], "isOverall": false, "label": "Get user keys-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 5.333333333333334], [12.0, 0.0], [3.0, 0.5], [14.0, 1.0], [15.0, 1.2], [17.0, 1.3333333333333333], [18.0, 1.25], [19.0, 1.0], [20.0, 1.0], [5.0, 1.0], [21.0, 1.25], [23.0, 1.0], [24.0, 1.5], [25.0, 0.0], [27.0, 1.6666666666666667]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[16.580000000000005, 1.3599999999999999]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[8.0, 96780.66666666667], [9.0, 95795.0], [10.0, 94932.0], [11.0, 99277.33333333333], [12.0, 96064.0], [3.0, 63338.5], [14.0, 56873.16666666667], [15.0, 49687.0], [17.0, 67119.33333333333], [18.0, 63861.25], [19.0, 71968.25], [20.0, 63817.5], [5.0, 84870.0], [21.0, 76906.5], [23.0, 63612.5], [24.0, 89792.0], [25.0, 73815.0], [27.0, 105682.33333333333]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[16.580000000000005, 74667.56000000003]], "isOverall": false, "label": "Requests for Import-Aggregated", "isController": true}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0-Aggregated", "isController": false}, {"data": [[9.0, 258.0], [10.0, 226.0], [11.0, 278.0], [12.0, 252.0], [13.0, 273.0], [14.0, 311.8], [15.0, 277.25], [16.0, 256.0], [17.0, 324.5714285714286], [18.0, 305.3333333333333], [19.0, 330.2], [20.0, 272.3333333333333], [21.0, 274.75], [22.0, 292.6666666666667], [24.0, 361.0], [25.0, 295.0], [27.0, 267.0]], "isOverall": false, "label": "Import Policy i-Rec", "isController": false}, {"data": [[18.379999999999995, 300.58]], "isOverall": false, "label": "Import Policy i-Rec-Aggregated", "isController": false}, {"data": [[9.0, 15320.0], [10.0, 13556.0], [11.0, 14413.0], [12.0, 16609.0], [13.0, 14702.0], [14.0, 13878.0], [15.0, 14406.5], [16.0, 14225.5], [17.0, 14580.714285714286], [18.0, 14503.5], [19.0, 14107.75], [20.0, 15014.0], [21.0, 15238.0], [22.0, 15621.0], [24.0, 15070.8], [25.0, 15766.5], [27.0, 15931.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[18.360000000000003, 14763.660000000002]], "isOverall": false, "label": "User creation(user side)-Aggregated", "isController": true}, {"data": [[8.0, 1.2], [9.0, 1.0], [10.0, 1.6666666666666667], [11.0, 1.076923076923077], [12.0, 1.4999999999999998], [3.0, 1.0], [13.0, 1.75], [14.0, 1.1250000000000004], [15.0, 1.325581395348837], [16.0, 1.1], [17.0, 1.2258064516129037], [18.0, 0.9565217391304345], [19.0, 1.1363636363636362], [20.0, 0.9411764705882353], [5.0, 1.0], [21.0, 1.0], [22.0, 1.0], [23.0, 1.1666666666666667], [24.0, 0.9999999999999998], [25.0, 0.625], [26.0, 1.0], [27.0, 1.2500000000000002], [7.0, 1.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[18.028490028490022, 1.15954415954416]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [3.0, 1.0], [4.0, 1.5], [5.0, 1.0], [6.0, 0.5], [7.0, 0.0], [8.0, 0.5], [9.0, 0.0], [10.0, 1.0], [11.0, 1.0], [12.0, 0.0], [13.0, 1.0], [14.0, 0.28571428571428575], [15.0, 0.5], [1.0, 1.0], [16.0, 0.28571428571428575], [17.0, 1.25], [18.0, 0.5000000000000001], [19.0, 0.5], [20.0, 0.8333333333333334], [21.0, 0.33333333333333337], [22.0, 0.75], [23.0, 0.33333333333333337], [24.0, 0.5], [25.0, 0.0], [26.0, 0.0], [27.0, 1.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[15.99009900990099, 0.5544554455445543]], "isOverall": false, "label": "Get Admin Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [3.0, 1.0], [4.0, 1.0], [5.0, 0.0], [6.0, 0.0], [7.0, 0.0], [8.0, 1.0], [9.0, 0.0], [10.0, 0.0], [11.0, 1.0], [12.0, 1.0], [13.0, 0.0], [14.0, 0.25], [15.0, 0.25], [1.0, 1.0], [16.0, 0.6666666666666666], [17.0, 1.0], [18.0, 0.5], [19.0, 1.0], [20.0, 0.33333333333333337], [21.0, 0.33333333333333337], [22.0, 0.5], [23.0, 0.33333333333333337], [24.0, 0.5], [25.0, 1.0], [26.0, 0.0], [27.0, 2.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[16.119999999999997, 0.5200000000000001]], "isOverall": false, "label": "Accept sr-0-Aggregated", "isController": false}, {"data": [[9.0, 1.5], [10.0, 1.75], [11.0, 1.0], [12.0, 1.4285714285714286], [13.0, 1.0], [14.0, 0.7333333333333333], [15.0, 1.2666666666666673], [16.0, 0.7777777777777778], [17.0, 1.0000000000000002], [18.0, 1.0416666666666667], [19.0, 1.1999999999999997], [20.0, 1.2173913043478262], [21.0, 1.0606060606060608], [22.0, 0.9166666666666665], [23.0, 1.1666666666666672], [24.0, 1.04], [25.0, 1.2], [26.0, 1.1666666666666665], [27.0, 1.1428571428571428]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[19.219672131147522, 1.104918032786885]], "isOverall": false, "label": "Get user link result-0-Aggregated", "isController": false}, {"data": [[2.0, 2555.0], [3.0, 2539.0], [4.0, 2520.0], [5.0, 2510.0], [6.0, 2496.0], [7.0, 2474.0], [8.0, 2492.0], [9.0, 2561.0], [10.0, 2479.0], [11.0, 2494.0], [12.0, 2594.0], [13.0, 2535.0], [14.0, 2520.6666666666665], [15.0, 2506.3333333333335], [1.0, 2591.0], [16.0, 2518.0], [17.0, 2497.5], [18.0, 2517.8], [19.0, 2610.5], [20.0, 2513.2], [21.0, 2537.0], [22.0, 2497.0], [23.0, 2518.0], [24.0, 2517.0], [25.0, 2499.0], [26.0, 2588.5], [27.0, 2509.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[15.979999999999999, 2524.6800000000003]], "isOverall": false, "label": "Login by SR OS-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Create new tenant-0-Aggregated", "isController": false}, {"data": [[2.0, 2071.0], [3.0, 2067.0], [4.0, 2071.0], [5.0, 2046.0], [7.0, 2058.5], [8.0, 2055.0], [9.0, 2063.0], [10.0, 2054.0], [11.0, 2054.0], [12.0, 2035.0], [13.0, 2067.5], [14.0, 2065.8], [15.0, 2059.5], [16.0, 2054.0], [17.0, 2060.0], [18.0, 2066.6], [19.0, 2062.0], [20.0, 2058.75], [21.0, 2066.5], [22.0, 2059.0], [23.0, 2056.5], [24.0, 2071.0], [25.0, 2059.0], [26.0, 2057.0], [27.0, 2058.5]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[16.439999999999998, 2061.18]], "isOverall": false, "label": "Get sr keys-Aggregated", "isController": false}, {"data": [[2.0, 2.0], [3.0, 1.0], [4.0, 1.0], [5.0, 1.5], [7.0, 1.0], [8.0, 1.2], [9.0, 0.5], [10.0, 1.0], [11.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 0.8823529411764706], [15.0, 1.0833333333333333], [16.0, 1.0], [17.0, 0.8333333333333333], [18.0, 1.1], [19.0, 1.0], [20.0, 1.1], [21.0, 1.1], [22.0, 0.8333333333333334], [23.0, 0.6666666666666667], [24.0, 1.5454545454545456], [25.0, 0.5], [26.0, 1.0], [27.0, 0.8571428571428571]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[17.13333333333333, 1.0199999999999998]], "isOverall": false, "label": "Get SR Access Token-0-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 0.5], [10.0, 1.0], [11.0, 1.5], [12.0, 1.0], [13.0, 1.0], [14.0, 0.7777777777777778], [15.0, 0.7142857142857143], [16.0, 0.8], [17.0, 0.7777777777777778], [18.0, 0.8571428571428572], [19.0, 0.9166666666666666], [20.0, 1.4], [21.0, 0.846153846153846], [22.0, 1.0], [23.0, 1.0], [24.0, 0.875], [25.0, 0.25], [27.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[18.349999999999998, 0.8699999999999999]], "isOverall": false, "label": "Verify link-0-Aggregated", "isController": false}, {"data": [[2.0, 2.0], [3.0, 2.0], [4.0, 0.0], [5.0, 2.0], [6.0, 2.0], [7.0, 5.0], [8.0, 3.0], [9.0, 1.0], [10.0, 2.0], [11.0, 2.0], [12.0, 2.0], [13.0, 1.0], [14.0, 1.0], [15.0, 1.0], [16.0, 1.0], [1.0, 1.0], [17.0, 1.0], [18.0, 1.25], [19.0, 1.0], [20.0, 2.0], [21.0, 1.3333333333333333], [22.0, 0.5], [23.0, 1.0], [24.0, 1.5], [25.0, 0.0], [26.0, 1.0], [27.0, 2.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[16.219999999999995, 1.3399999999999996]], "isOverall": false, "label": "Dry Run Policy-0-Aggregated", "isController": false}, {"data": [[2.0, 89762.0], [3.0, 97216.0], [4.0, 109140.0], [5.0, 109349.0], [6.0, 107646.0], [7.0, 107721.0], [8.0, 104736.0], [9.0, 97477.0], [10.0, 120894.0], [11.0, 114078.0], [12.0, 104466.0], [13.0, 94008.0], [14.0, 72878.0], [15.0, 58399.0], [16.0, 60249.75], [1.0, 77694.0], [17.0, 84495.0], [18.0, 73629.5], [19.0, 75021.0], [20.0, 87022.33333333333], [21.0, 79923.66666666667], [22.0, 83138.5], [23.0, 94737.0], [24.0, 84239.5], [25.0, 116172.0], [26.0, 101625.0], [27.0, 117296.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[16.219999999999995, 84971.14000000001]], "isOverall": false, "label": "Policy import and dry run-Aggregated", "isController": true}, {"data": [[2.0, 1739.0], [3.0, 1794.0], [4.0, 1697.0], [5.0, 1687.0], [6.0, 1840.0], [7.0, 2421.0], [8.0, 1917.0], [9.0, 1788.0], [10.0, 1685.0], [11.0, 1842.0], [12.0, 1529.0], [13.0, 1556.0], [14.0, 2060.0], [15.0, 1704.75], [1.0, 1737.0], [16.0, 1670.0], [17.0, 1899.5], [18.0, 1683.5], [19.0, 1669.0], [20.0, 1781.0], [21.0, 1822.6666666666667], [22.0, 1667.0], [23.0, 1776.6666666666667], [24.0, 1656.0], [25.0, 1610.0], [26.0, 1662.0], [27.0, 1651.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[16.119999999999997, 1764.2599999999998]], "isOverall": false, "label": "Invite and accept SR-Aggregated", "isController": true}, {"data": [[0.0, 98460.29999999999]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 98460.29999999999]], "isOverall": false, "label": "Link SR-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [3.0, 1.0], [4.0, 0.0], [5.0, 0.0], [6.0, 0.5], [7.0, 0.0], [8.0, 0.0], [9.0, 1.0], [10.0, 1.0], [11.0, 0.0], [12.0, 0.0], [13.0, 0.0], [14.0, 0.5], [15.0, 0.5], [16.0, 0.33333333333333337], [17.0, 0.0], [18.0, 0.4], [19.0, 1.0], [20.0, 0.25], [21.0, 0.6666666666666666], [22.0, 0.0], [23.0, 0.3333333333333333], [24.0, 0.5], [25.0, 1.0], [26.0, 0.5], [27.0, 0.5]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[16.333333333333332, 0.411764705882353]], "isOverall": false, "label": "Get key gen result-0-Aggregated", "isController": false}, {"data": [[2.0, 582.0], [3.0, 617.0], [4.0, 551.0], [5.0, 587.0], [6.0, 597.0], [7.0, 552.0], [8.0, 679.0], [9.0, 590.0], [10.0, 532.0], [11.0, 612.0], [12.0, 570.0], [13.0, 528.0], [14.0, 932.0], [15.0, 681.0], [1.0, 563.0], [16.0, 597.3333333333334], [17.0, 785.5], [18.0, 610.5], [19.0, 622.6666666666666], [20.0, 644.0], [21.0, 644.0], [22.0, 621.5], [23.0, 573.0], [24.0, 572.0], [25.0, 595.0], [26.0, 572.0], [27.0, 572.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[16.119999999999997, 639.32]], "isOverall": false, "label": "Accept sr-Aggregated", "isController": false}, {"data": [[2.0, 2756.0], [3.0, 2826.0], [4.0, 2822.0], [5.0, 2725.0], [6.0, 2987.0], [7.0, 4158.0], [8.0, 3109.0], [9.0, 2754.0], [10.0, 3397.0], [11.0, 3122.0], [12.0, 2738.0], [13.0, 2748.0], [14.0, 3225.75], [15.0, 3011.75], [1.0, 2779.0], [16.0, 2816.6666666666665], [17.0, 3042.5], [18.0, 2819.4], [19.0, 2868.5], [20.0, 2995.3333333333335], [21.0, 2995.5], [22.0, 3200.0], [23.0, 2932.6666666666665], [24.0, 2790.0], [25.0, 2622.0], [26.0, 2806.0], [27.0, 2703.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[16.08, 2954.46]], "isOverall": false, "label": "User creation(admin side)-Aggregated", "isController": true}, {"data": [[8.0, 1.0], [9.0, 0.0], [10.0, 1.0], [11.0, 1.0], [13.0, 0.0], [14.0, 0.33333333333333337], [15.0, 0.2], [16.0, 1.0], [17.0, 0.33333333333333337], [18.0, 0.25], [19.0, 0.28571428571428575], [20.0, 0.0], [21.0, 0.25], [22.0, 0.0], [23.0, 1.0], [24.0, 0.25], [25.0, 0.0], [27.0, 0.5], [7.0, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[18.439999999999998, 0.2999999999999999]], "isOverall": false, "label": "Login by user OS-0-Aggregated", "isController": false}, {"data": [[8.0, 405.0], [9.0, 257.0], [10.0, 271.6666666666667], [11.0, 436.46153846153845], [12.0, 315.44444444444446], [3.0, 263.0], [13.0, 399.75], [14.0, 383.7916666666667], [15.0, 397.25581395348837], [16.0, 373.3], [17.0, 363.9032258064516], [18.0, 253.82608695652175], [19.0, 414.8636363636363], [20.0, 318.82352941176475], [5.0, 835.0], [21.0, 402.8181818181817], [22.0, 290.0], [23.0, 346.6111111111111], [24.0, 340.1111111111111], [25.0, 274.625], [26.0, 377.8666666666667], [27.0, 412.8], [7.0, 229.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[18.028490028490022, 361.43304843304855]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[1.0, 360.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.0, 360.0]], "isOverall": false, "label": "Create new tenant-Aggregated", "isController": false}, {"data": [[8.0, 2070.5], [9.0, 2055.0], [10.0, 2061.0], [12.0, 2060.0], [13.0, 2076.0], [14.0, 2078.6666666666665], [15.0, 2065.0], [17.0, 2070.2], [18.0, 2069.0], [19.0, 2067.3333333333335], [20.0, 2060.5], [21.0, 2060.0], [22.0, 2057.5], [23.0, 2060.5], [24.0, 2066.5], [26.0, 2076.5], [27.0, 2067.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[18.19607843137255, 2066.196078431372]], "isOverall": false, "label": "Get user key gen result-Aggregated", "isController": false}, {"data": [[9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [13.0, 1.0], [14.0, 0.75], [15.0, 1.2857142857142856], [17.0, 1.2], [18.0, 1.0], [19.0, 0.7142857142857143], [20.0, 0.33333333333333337], [21.0, 1.25], [22.0, 1.5], [23.0, 0.75], [26.0, 1.0], [27.0, 0.5]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[18.3, 0.9799999999999999]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[9.0, 1.5], [10.0, 1.0], [11.0, 2.0], [13.0, 1.0], [14.0, 1.0], [15.0, 2.5], [17.0, 0.8333333333333334], [18.0, 1.0], [19.0, 0.8571428571428572], [20.0, 1.0], [21.0, 0.8333333333333334], [22.0, 1.0], [23.0, 1.0], [25.0, 1.0], [26.0, 1.0], [27.0, 0.5]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[18.200000000000006, 1.1400000000000003]], "isOverall": false, "label": "Get User Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [3.0, 0.0], [4.0, 1.0], [5.0, 1.0], [7.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [12.0, 0.0], [13.0, 0.5], [14.0, 1.0], [15.0, 0.5], [16.0, 1.0], [17.0, 1.0], [18.0, 0.5], [19.0, 1.0], [20.0, 0.75], [21.0, 1.5], [22.0, 1.0], [23.0, 1.0], [24.0, 1.0], [25.0, 1.0], [26.0, 0.5], [27.0, 1.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[16.38, 0.84]], "isOverall": false, "label": "Link SR profile-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [3.0, 0.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 0.0], [8.0, 0.0], [9.0, 1.0], [10.0, 0.0], [11.0, 0.0], [12.0, 0.0], [13.0, 1.0], [14.0, 0.5], [15.0, 0.5], [1.0, 1.0], [16.0, 0.0], [17.0, 0.5], [18.0, 0.2], [19.0, 0.5], [20.0, 0.6666666666666666], [21.0, 0.25], [22.0, 0.0], [23.0, 0.33333333333333337], [24.0, 0.0], [25.0, 1.0], [26.0, 0.5], [27.0, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[16.08, 0.39999999999999997]], "isOverall": false, "label": "Accept user-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [3.0, 0.0], [4.0, 0.0], [5.0, 0.0], [7.0, 0.0], [8.0, 0.0], [9.0, 1.0], [10.0, 0.0], [11.0, 1.0], [12.0, 0.0], [13.0, 0.5], [14.0, 0.2], [15.0, 0.25], [16.0, 0.0], [17.0, 0.5], [18.0, 0.6], [19.0, 0.6666666666666666], [20.0, 0.5], [21.0, 0.0], [22.0, 0.0], [23.0, 0.0], [24.0, 0.0], [25.0, 1.0], [26.0, 0.0], [27.0, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[16.439999999999998, 0.27999999999999997]], "isOverall": false, "label": "Get sr keys-0-Aggregated", "isController": false}, {"data": [[8.0, 2488.0], [9.0, 2516.0], [10.0, 2512.0], [11.0, 2492.0], [13.0, 2498.0], [14.0, 2498.0], [15.0, 2506.6], [16.0, 2503.0], [17.0, 2509.3333333333335], [18.0, 2503.0], [19.0, 2524.5714285714284], [20.0, 2528.0], [21.0, 2534.25], [22.0, 2520.5], [23.0, 2477.0], [24.0, 2555.75], [25.0, 2557.5], [27.0, 2492.5], [7.0, 2487.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[18.439999999999998, 2518.120000000001]], "isOverall": false, "label": "Login by user OS-Aggregated", "isController": false}, {"data": [[3.0, 1.3333333333333333], [4.0, 1.8333333333333335], [5.0, 0.8888888888888888], [6.0, 1.0], [7.0, 1.25], [8.0, 0.9230769230769231], [9.0, 1.25], [10.0, 0.6666666666666666], [11.0, 0.5714285714285715], [12.0, 0.8], [13.0, 0.7619047619047619], [14.0, 0.9090909090909095], [15.0, 0.8055555555555558], [16.0, 0.8703703703703702], [17.0, 0.7818181818181819], [18.0, 0.8000000000000002], [19.0, 0.8173913043478259], [20.0, 0.7981651376146787], [21.0, 0.8523489932885906], [22.0, 0.8749999999999999], [23.0, 0.7857142857142859], [24.0, 0.7640449438202243], [25.0, 0.7906976744186047], [26.0, 0.6666666666666665], [27.0, 1.6515151515151514]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[19.950272479564013, 0.8930517711171664]], "isOverall": false, "label": "Get SR link result-0-Aggregated", "isController": false}, {"data": [[0.0, 13890.66]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[0.0, 13890.66]], "isOverall": false, "label": "Generate user hedera data-Aggregated", "isController": true}, {"data": [[8.0, 274.5], [9.0, 244.5], [10.0, 296.0], [11.0, 261.5], [12.0, 249.5], [13.0, 251.0], [14.0, 269.66666666666663], [15.0, 240.57142857142856], [16.0, 240.6], [17.0, 306.55555555555554], [18.0, 252.85714285714286], [19.0, 287.41666666666663], [20.0, 263.2], [21.0, 257.46153846153845], [22.0, 266.5], [23.0, 303.0], [24.0, 280.375], [25.0, 271.75], [27.0, 276.0], [7.0, 261.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[18.349999999999998, 269.28999999999996]], "isOverall": false, "label": "Verify link-Aggregated", "isController": false}, {"data": [[1.0, 771.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.0, 771.0]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[2.0, 268.0], [3.0, 301.0], [4.0, 263.0], [5.0, 251.0], [7.0, 267.0], [8.0, 250.8], [9.0, 231.5], [10.0, 254.33333333333334], [11.0, 247.4], [12.0, 241.33333333333334], [13.0, 272.3333333333333], [14.0, 260.29411764705884], [15.0, 247.16666666666669], [16.0, 235.33333333333334], [17.0, 269.25], [18.0, 259.3], [19.0, 298.6923076923077], [20.0, 260.0], [21.0, 247.60000000000002], [22.0, 251.0], [23.0, 255.0], [24.0, 259.7272727272727], [25.0, 267.0], [26.0, 252.5], [27.0, 265.4285714285714]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[17.13333333333333, 261.1133333333334]], "isOverall": false, "label": "Get SR Access Token-Aggregated", "isController": false}, {"data": [[0.0, 13897.48]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[0.0, 13897.48]], "isOverall": false, "label": "Generate sr hedera data-Aggregated", "isController": true}, {"data": [[2.0, 612.0], [3.0, 593.0], [4.0, 566.0], [5.0, 606.0], [7.0, 1000.5], [8.0, 750.2], [9.0, 558.0], [10.0, 621.6666666666666], [11.0, 637.2], [12.0, 632.3333333333334], [13.0, 590.3333333333334], [14.0, 830.1999999999999], [15.0, 873.4285714285713], [16.0, 622.3333333333334], [17.0, 1240.1666666666665], [18.0, 679.1999999999999], [19.0, 1113.0], [20.0, 668.7], [21.0, 784.4], [22.0, 890.2], [23.0, 988.0], [24.0, 685.3], [25.0, 665.25], [26.0, 602.0], [27.0, 928.8571428571429]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[17.14666666666666, 823.9266666666668]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[8.0, 0.0], [9.0, 0.0], [10.0, 1.0], [12.0, 1.0], [13.0, 0.0], [14.0, 0.33333333333333337], [15.0, 0.2], [16.0, 0.0], [17.0, 1.0], [18.0, 0.6666666666666667], [19.0, 0.125], [20.0, 0.0], [21.0, 0.14285714285714288], [22.0, 0.5], [23.0, 1.0], [24.0, 0.5], [25.0, 0.5], [27.0, 1.0], [7.0, 0.0]], "isOverall": false, "label": "Get OS user Access Token-0", "isController": false}, {"data": [[18.4, 0.37999999999999995]], "isOverall": false, "label": "Get OS user Access Token-0-Aggregated", "isController": false}, {"data": [[8.0, 0.0], [9.0, 0.0], [10.0, 1.0], [12.0, 0.0], [13.0, 1.0], [14.0, 1.0], [15.0, 0.6666666666666667], [17.0, 0.4], [18.0, 0.25], [19.0, 0.6666666666666667], [20.0, 0.0], [21.0, 0.0], [22.0, 1.0], [23.0, 0.5], [24.0, 0.5], [26.0, 0.0], [27.0, 1.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[18.19607843137255, 0.4509803921568628]], "isOverall": false, "label": "Get user key gen result-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [3.0, 0.0], [4.0, 0.0], [5.0, 1.0], [6.0, 0.0], [7.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 0.0], [12.0, 0.0], [13.0, 0.0], [14.0, 0.5], [15.0, 0.6666666666666666], [1.0, 0.0], [16.0, 1.0], [17.0, 0.5], [18.0, 0.6], [19.0, 0.0], [20.0, 0.2], [21.0, 0.0], [22.0, 0.0], [23.0, 0.6666666666666667], [24.0, 0.5], [25.0, 0.0], [26.0, 0.5], [27.0, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[15.979999999999999, 0.4199999999999998]], "isOverall": false, "label": "Login by SR OS-0-Aggregated", "isController": false}, {"data": [[9.0, 1.0], [10.0, 2.0], [11.0, 1.0], [13.0, 1.0], [14.0, 0.6], [15.0, 0.8333333333333334], [17.0, 1.0], [18.0, 1.0], [19.0, 0.8571428571428572], [20.0, 1.0], [21.0, 0.5714285714285714], [22.0, 1.0], [23.0, 0.75], [25.0, 1.0], [26.0, 1.0], [27.0, 1.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[18.220000000000002, 0.86]], "isOverall": false, "label": "Get SR DID-0-Aggregated", "isController": false}, {"data": [[9.0, 1.0], [10.0, 0.0], [11.0, 0.0], [13.0, 1.0], [14.0, 0.75], [15.0, 0.5], [16.0, 0.0], [17.0, 0.25], [18.0, 0.75], [19.0, 0.8571428571428572], [20.0, 0.0], [21.0, 0.75], [22.0, 1.0], [23.0, 0.6], [24.0, 1.0], [26.0, 2.0], [27.0, 0.5]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[18.44, 0.6599999999999999]], "isOverall": false, "label": "Get user keys-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 27.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 283.81666666666666, "minX": 1.7343465E12, "maxY": 136350.96666666667, "series": [{"data": [[1.73434698E12, 128907.66666666667], [1.73434668E12, 94124.3], [1.73434656E12, 57118.8], [1.73434722E12, 12158.483333333334], [1.73434662E12, 79799.71666666666], [1.73434692E12, 134030.1], [1.7343468E12, 108307.43333333333], [1.7343465E12, 18933.716666666667], [1.73434686E12, 123444.68333333333], [1.73434716E12, 55787.45], [1.73434674E12, 98412.41666666667], [1.73434704E12, 136350.96666666667], [1.7343471E12, 100923.91666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73434698E12, 5042.0], [1.73434668E12, 4132.3], [1.73434656E12, 2821.5833333333335], [1.73434722E12, 283.81666666666666], [1.73434662E12, 3652.483333333333], [1.73434692E12, 5396.066666666667], [1.7343468E12, 4604.366666666667], [1.7343465E12, 1222.3333333333333], [1.73434686E12, 5081.633333333333], [1.73434716E12, 1382.3666666666666], [1.73434674E12, 4292.616666666667], [1.73434704E12, 4627.6], [1.7343471E12, 2717.65]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73434722E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7343465E12, "maxY": 148169.0, "series": [{"data": [[1.7343468E12, 0.4], [1.73434698E12, 0.33333333333333337], [1.7343465E12, 0.0], [1.73434668E12, 0.5714285714285714], [1.73434686E12, 0.5], [1.73434656E12, 0.6666666666666666], [1.73434674E12, 0.33333333333333337], [1.73434662E12, 0.33333333333333337], [1.73434692E12, 0.16666666666666669]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7343468E12, 276.5], [1.73434698E12, 268.62500000000006], [1.7343465E12, 267.75], [1.73434668E12, 271.74999999999994], [1.73434686E12, 259.72727272727275], [1.73434656E12, 260.1], [1.73434674E12, 288.5], [1.73434704E12, 260.70000000000005], [1.7343471E12, 294.8], [1.73434662E12, 252.9], [1.73434692E12, 277.3]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7343468E12, 293.8333333333333], [1.73434698E12, 253.5], [1.7343465E12, 259.0], [1.73434668E12, 246.33333333333334], [1.73434686E12, 270.3333333333333], [1.73434656E12, 262.1666666666667], [1.73434674E12, 232.33333333333334], [1.73434662E12, 254.83333333333331], [1.73434692E12, 237.16666666666666]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7343468E12, 0.33333333333333337], [1.73434698E12, 1.0], [1.7343465E12, 0.6666666666666666], [1.73434668E12, 0.16666666666666666], [1.73434686E12, 0.33333333333333337], [1.73434656E12, 0.5], [1.73434674E12, 0.8333333333333334], [1.73434662E12, 2.666666666666667], [1.73434692E12, 0.6666666666666667]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.7343468E12, 1.0], [1.73434698E12, 0.5], [1.73434668E12, 0.8333333333333334], [1.73434686E12, 1.2], [1.73434656E12, 1.0], [1.73434674E12, 1.0], [1.73434704E12, 1.0000000000000002], [1.7343471E12, 1.3333333333333333], [1.73434662E12, 4.25], [1.73434692E12, 0.75]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7343468E12, 499.91666666666663], [1.73434698E12, 500.25], [1.7343465E12, 497.84615384615375], [1.73434668E12, 482.0833333333333], [1.73434686E12, 548.2727272727273], [1.73434656E12, 591.0833333333333], [1.73434674E12, 490.1666666666667], [1.73434662E12, 504.83333333333337], [1.73434692E12, 476.4615384615384]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.7343468E12, 1.0], [1.73434698E12, 0.75], [1.7343465E12, 0.75], [1.73434668E12, 0.9166666666666666], [1.73434686E12, 0.6363636363636364], [1.73434656E12, 1.1], [1.73434674E12, 2.0], [1.73434704E12, 1.2000000000000002], [1.7343471E12, 1.2], [1.73434662E12, 1.1], [1.73434692E12, 1.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.7343468E12, 381.0], [1.73434698E12, 322.0], [1.7343465E12, 394.66666666666663], [1.73434668E12, 316.33333333333337], [1.73434686E12, 391.83333333333337], [1.73434656E12, 353.1666666666667], [1.73434674E12, 340.0], [1.73434662E12, 357.83333333333337], [1.73434692E12, 349.33333333333337]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7343468E12, 2067.5], [1.73434698E12, 2066.5], [1.73434668E12, 2061.4], [1.73434686E12, 2059.3333333333335], [1.73434656E12, 2065.0], [1.73434674E12, 2056.2], [1.73434704E12, 2061.3636363636365], [1.7343471E12, 2062.75], [1.73434662E12, 2064.0], [1.73434692E12, 2060.5]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7343468E12, 2065.75], [1.73434698E12, 2072.5], [1.73434668E12, 2063.6], [1.73434686E12, 2061.1666666666665], [1.73434656E12, 2069.2], [1.73434674E12, 2062.4], [1.73434704E12, 2064.8333333333335], [1.7343471E12, 2068.6666666666665], [1.73434662E12, 2069.25], [1.73434692E12, 2062.5]], "isOverall": false, "label": "Get OS user Access Token", "isController": false}, {"data": [[1.7343468E12, 2065.1666666666665], [1.73434698E12, 2069.0], [1.7343465E12, 2069.6], [1.73434668E12, 2067.1666666666665], [1.73434686E12, 2061.0], [1.73434656E12, 2062.3333333333335], [1.73434674E12, 2066.8333333333335], [1.73434662E12, 2063.8333333333335], [1.73434692E12, 2064.5]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.7343468E12, 297.3333333333333], [1.73434698E12, 283.6666666666667], [1.73434668E12, 256.25], [1.73434686E12, 256.0], [1.73434716E12, 278.8888888888889], [1.73434722E12, 299.0], [1.73434674E12, 231.0], [1.73434704E12, 276.0], [1.7343471E12, 289.4], [1.73434662E12, 280.25], [1.73434692E12, 263.5]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.7343465E12, 1703.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.7343468E12, 0.6666666666666666], [1.73434698E12, 0.6666666666666666], [1.7343465E12, 4.6], [1.73434668E12, 0.5], [1.73434686E12, 0.5], [1.73434656E12, 0.5], [1.73434674E12, 0.8333333333333334], [1.73434662E12, 0.33333333333333337], [1.73434692E12, 0.33333333333333337]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.7343468E12, 2064.6666666666665], [1.73434698E12, 2064.6666666666665], [1.7343465E12, 2061.0], [1.73434668E12, 2068.0], [1.73434686E12, 2064.0], [1.73434656E12, 2065.166666666667], [1.73434674E12, 2066.8333333333335], [1.73434662E12, 2061.5], [1.73434692E12, 2066.6666666666665]], "isOverall": false, "label": "Get OS SR Access Token", "isController": false}, {"data": [[1.7343468E12, 7946.25], [1.73434698E12, 10404.0], [1.73434668E12, 7707.4], [1.73434686E12, 8044.333333333333], [1.73434716E12, 9273.142857142857], [1.73434722E12, 13447.857142857143], [1.73434674E12, 6950.0], [1.73434704E12, 8707.6], [1.7343471E12, 8409.4], [1.73434662E12, 8414.666666666666], [1.73434692E12, 9161.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.7343468E12, 1198.6666666666667], [1.73434698E12, 1113.3333333333333], [1.7343465E12, 1050.8], [1.73434668E12, 1239.5], [1.73434686E12, 1270.0], [1.73434656E12, 1339.0], [1.73434674E12, 1136.8333333333335], [1.73434662E12, 1177.3333333333333], [1.73434692E12, 1124.6666666666667]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.7343468E12, 271.8352272727274], [1.73434698E12, 278.29389312977094], [1.7343465E12, 237.1818181818182], [1.73434668E12, 276.0086956521739], [1.73434686E12, 281.186170212766], [1.73434656E12, 287.9466666666667], [1.73434674E12, 268.9862068965517], [1.73434704E12, 290.9490445859872], [1.7343471E12, 342.3333333333333], [1.73434662E12, 289.2857142857142], [1.73434692E12, 276.95260663507105]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.7343468E12, 259.25], [1.73434698E12, 276.0], [1.73434668E12, 233.83333333333334], [1.73434686E12, 262.0], [1.73434656E12, 271.75], [1.73434674E12, 254.75], [1.73434704E12, 267.50000000000006], [1.7343471E12, 258.2], [1.73434662E12, 259.5], [1.73434692E12, 262.25]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.7343468E12, 638.3333333333334], [1.73434698E12, 586.6666666666666], [1.7343465E12, 535.4], [1.73434668E12, 714.0], [1.73434686E12, 636.0], [1.73434656E12, 760.0], [1.73434674E12, 579.1666666666667], [1.73434662E12, 571.6666666666666], [1.73434692E12, 595.5]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.7343468E12, 852.5], [1.73434698E12, 672.25], [1.73434668E12, 1055.6666666666667], [1.73434686E12, 1068.8], [1.73434656E12, 1075.25], [1.73434674E12, 695.5], [1.73434704E12, 1081.8999999999999], [1.7343471E12, 698.4], [1.73434662E12, 947.5], [1.73434692E12, 801.5]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.7343468E12, 250.0], [1.73434698E12, 286.75], [1.73434668E12, 243.0], [1.73434686E12, 271.8], [1.73434656E12, 252.75], [1.73434674E12, 251.25], [1.73434704E12, 276.55555555555554], [1.7343471E12, 271.16666666666663], [1.73434662E12, 268.5], [1.73434692E12, 257.25]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.7343468E12, 248.25], [1.73434698E12, 241.0], [1.73434668E12, 254.5], [1.73434686E12, 255.0], [1.73434656E12, 245.5], [1.73434674E12, 242.25], [1.73434704E12, 263.3333333333333], [1.7343471E12, 243.83333333333334], [1.73434662E12, 266.25], [1.73434692E12, 270.25]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.7343468E12, 2063.3333333333335], [1.73434698E12, 2060.25], [1.7343465E12, 2058.25], [1.73434668E12, 2062.3333333333335], [1.73434686E12, 2064.6666666666665], [1.73434656E12, 2064.4285714285716], [1.73434674E12, 2065.333333333333], [1.73434662E12, 2066.1666666666665], [1.73434692E12, 2060.166666666667]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.7343468E12, 311.6], [1.73434698E12, 276.3333333333333], [1.7343465E12, 261.2], [1.73434668E12, 280.28571428571433], [1.73434686E12, 347.3333333333333], [1.73434656E12, 320.5], [1.73434674E12, 297.5], [1.73434662E12, 331.33333333333337], [1.73434692E12, 287.33333333333337]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73434698E12, 0.4444444444444444], [1.73434668E12, 1.2500000000000002], [1.73434656E12, 1.5555555555555556], [1.73434722E12, 1.0], [1.73434662E12, 1.0], [1.73434692E12, 0.6], [1.7343468E12, 0.8461538461538461], [1.7343465E12, 1.0], [1.73434686E12, 0.8666666666666666], [1.73434716E12, 1.4], [1.73434674E12, 1.0], [1.73434704E12, 1.4666666666666668], [1.7343471E12, 1.3846153846153846]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.7343468E12, 39800.8], [1.73434698E12, 39422.166666666664], [1.7343465E12, 33545.5], [1.73434668E12, 36949.5], [1.73434686E12, 42929.71428571428], [1.73434656E12, 34174.83333333333], [1.73434674E12, 38812.666666666664], [1.73434662E12, 34635.0], [1.73434692E12, 42052.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.7343465E12, 301.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.7343468E12, 8790.25], [1.73434698E12, 11464.0], [1.73434668E12, 9058.6], [1.73434686E12, 8907.333333333334], [1.73434716E12, 10247.857142857143], [1.73434722E12, 14406.285714285716], [1.73434674E12, 7764.0], [1.73434704E12, 9662.4], [1.7343471E12, 10253.0], [1.73434662E12, 9318.333333333334], [1.73434692E12, 10326.666666666666]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.7343468E12, 1.5], [1.73434698E12, 0.5], [1.73434668E12, 1.0], [1.73434686E12, 1.5], [1.73434716E12, 1.0], [1.73434656E12, 0.6666666666666667], [1.73434674E12, 1.3333333333333333], [1.73434704E12, 1.25], [1.7343471E12, 2.375], [1.73434662E12, 1.0], [1.73434692E12, 0.6]], "isOverall": false, "label": "Import Policy i-Rec-0", "isController": false}, {"data": [[1.7343468E12, 292.02941176470586], [1.73434698E12, 343.85185185185185], [1.73434668E12, 245.57142857142856], [1.73434686E12, 255.51219512195115], [1.73434716E12, 329.3333333333333], [1.73434656E12, 247.4], [1.73434674E12, 293.8333333333333], [1.73434704E12, 304.3888888888888], [1.7343471E12, 278.5416666666667], [1.73434662E12, 240.06249999999997], [1.73434692E12, 255.5625]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.7343468E12, 0.25], [1.73434698E12, 0.5], [1.73434668E12, 1.0], [1.73434686E12, 0.5], [1.73434656E12, 1.0], [1.73434674E12, 0.6], [1.73434704E12, 0.6363636363636364], [1.7343471E12, 0.75], [1.73434662E12, 1.0], [1.73434692E12, 0.25]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.7343468E12, 23667.25], [1.73434698E12, 33754.0], [1.73434668E12, 15015.0], [1.73434686E12, 31354.333333333336], [1.73434716E12, 48070.0], [1.73434656E12, 11052.0], [1.73434674E12, 16267.333333333334], [1.73434704E12, 17421.624999999996], [1.7343471E12, 22066.875], [1.73434662E12, 15176.25], [1.73434692E12, 34190.6]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.7343465E12, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.7343468E12, 22170.166666666668], [1.73434698E12, 22087.4], [1.7343465E12, 16027.25], [1.73434668E12, 19659.8], [1.73434686E12, 25179.666666666668], [1.73434656E12, 17676.333333333336], [1.73434674E12, 20777.0], [1.73434662E12, 17878.5], [1.73434692E12, 23673.166666666664]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7343468E12, 1.5], [1.73434698E12, 1.0], [1.7343465E12, 0.4], [1.73434668E12, 0.33333333333333337], [1.73434686E12, 0.16666666666666669], [1.73434656E12, 0.33333333333333337], [1.73434674E12, 0.33333333333333337], [1.73434662E12, 0.16666666666666669], [1.73434692E12, 0.16666666666666669]], "isOverall": false, "label": "Get OS SR Access Token-0", "isController": false}, {"data": [[1.7343468E12, 2063.0], [1.73434698E12, 2061.5], [1.73434668E12, 2066.666666666667], [1.73434686E12, 2059.4], [1.73434656E12, 2059.5], [1.73434674E12, 2057.25], [1.73434704E12, 2060.4999999999995], [1.7343471E12, 2066.6], [1.73434662E12, 2061.25], [1.73434692E12, 2060.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.7343468E12, 1.3333333333333333], [1.73434698E12, 1.6666666666666667], [1.73434668E12, 1.0], [1.73434686E12, 0.6666666666666666], [1.73434716E12, 2.3333333333333335], [1.73434722E12, 0.6666666666666667], [1.73434674E12, 1.4], [1.73434704E12, 1.5714285714285714], [1.7343471E12, 1.0], [1.73434662E12, 1.25], [1.73434692E12, 0.5]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.7343468E12, 67501.0], [1.73434698E12, 105682.33333333333], [1.73434668E12, 43484.0], [1.73434686E12, 60246.333333333336], [1.73434716E12, 97218.33333333333], [1.73434722E12, 70515.66666666667], [1.73434674E12, 61723.6], [1.73434704E12, 89318.57142857142], [1.7343471E12, 78399.4], [1.73434662E12, 42981.5], [1.73434692E12, 68717.5]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.7343465E12, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.7343468E12, 273.5], [1.73434698E12, 267.0], [1.73434668E12, 268.1666666666667], [1.73434686E12, 290.66666666666663], [1.73434716E12, 252.0], [1.73434656E12, 254.0], [1.73434674E12, 304.6666666666667], [1.73434704E12, 299.875], [1.7343471E12, 326.75], [1.73434662E12, 311.5], [1.73434692E12, 372.2]], "isOverall": false, "label": "Import Policy i-Rec", "isController": false}, {"data": [[1.7343468E12, 14854.5], [1.73434698E12, 15476.5], [1.73434668E12, 14065.833333333332], [1.73434686E12, 15345.2], [1.73434656E12, 14497.75], [1.73434674E12, 14503.5], [1.73434704E12, 14833.0], [1.7343471E12, 14657.6], [1.73434662E12, 13772.75], [1.73434692E12, 15756.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.7343468E12, 0.9523809523809523], [1.73434698E12, 1.1086956521739129], [1.73434668E12, 1.2777777777777781], [1.73434686E12, 0.782608695652174], [1.73434716E12, 1.4067796610169494], [1.73434656E12, 0.6666666666666667], [1.73434722E12, 1.0], [1.73434674E12, 1.1], [1.73434704E12, 1.235294117647059], [1.7343471E12, 1.19672131147541], [1.73434662E12, 1.3333333333333335], [1.73434692E12, 0.9999999999999999]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.7343468E12, 0.5833333333333334], [1.73434698E12, 0.5], [1.7343465E12, 1.0000000000000002], [1.73434668E12, 0.41666666666666663], [1.73434686E12, 0.45454545454545464], [1.73434656E12, 0.41666666666666663], [1.73434674E12, 0.8333333333333333], [1.73434662E12, 0.41666666666666663], [1.73434692E12, 0.3076923076923077]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.5], [1.73434698E12, 1.0], [1.7343465E12, 0.6666666666666667], [1.73434668E12, 0.5], [1.73434686E12, 0.5], [1.73434656E12, 0.5], [1.73434674E12, 0.8333333333333334], [1.73434662E12, 0.16666666666666669], [1.73434692E12, 0.33333333333333337]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.7343468E12, 1.2352941176470589], [1.73434698E12, 1.1111111111111112], [1.73434668E12, 1.0476190476190474], [1.73434686E12, 1.0243902439024388], [1.73434716E12, 1.6666666666666667], [1.73434656E12, 1.5], [1.73434674E12, 1.0], [1.73434704E12, 1.138888888888889], [1.7343471E12, 1.104166666666667], [1.73434662E12, 0.625], [1.73434692E12, 1.1250000000000007]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.7343468E12, 2549.5], [1.73434698E12, 2562.0], [1.7343465E12, 2543.0], [1.73434668E12, 2510.166666666667], [1.73434686E12, 2518.166666666667], [1.73434656E12, 2499.3333333333335], [1.73434674E12, 2510.8333333333335], [1.73434662E12, 2536.333333333333], [1.73434692E12, 2514.5]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.7343465E12, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7343468E12, 2058.5], [1.73434698E12, 2057.75], [1.7343465E12, 2063.75], [1.73434668E12, 2063.8333333333335], [1.73434686E12, 2063.0], [1.73434656E12, 2057.166666666667], [1.73434674E12, 2065.8333333333335], [1.73434662E12, 2059.0], [1.73434692E12, 2061.5]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73434698E12, 0.8888888888888888], [1.73434668E12, 0.9375], [1.73434656E12, 0.8888888888888888], [1.73434722E12, 1.0], [1.73434662E12, 0.7142857142857142], [1.73434692E12, 0.8666666666666667], [1.7343468E12, 1.153846153846154], [1.7343465E12, 1.5], [1.73434686E12, 0.9333333333333332], [1.73434716E12, 1.2], [1.73434674E12, 0.9999999999999999], [1.73434704E12, 1.4666666666666666], [1.7343471E12, 1.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.7343468E12, 1.1111111111111112], [1.73434698E12, 1.0], [1.73434668E12, 0.8], [1.73434686E12, 1.0], [1.73434716E12, 2.0], [1.73434656E12, 1.0], [1.73434674E12, 0.875], [1.73434704E12, 0.8499999999999999], [1.7343471E12, 0.6363636363636364], [1.73434662E12, 0.6666666666666666], [1.73434692E12, 0.7777777777777778]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.7343468E12, 1.5], [1.73434698E12, 1.0], [1.73434668E12, 1.2], [1.73434686E12, 0.6666666666666666], [1.73434716E12, 1.7142857142857142], [1.73434722E12, 2.0000000000000004], [1.73434674E12, 1.25], [1.73434704E12, 1.6], [1.7343471E12, 0.8], [1.73434662E12, 1.0], [1.73434692E12, 1.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.7343468E12, 75266.75], [1.73434698E12, 109179.5], [1.73434668E12, 52456.6], [1.73434686E12, 69153.66666666667], [1.73434716E12, 104256.14285714286], [1.73434722E12, 99789.71428571428], [1.73434674E12, 69067.75], [1.73434704E12, 104827.4], [1.7343471E12, 84687.4], [1.73434662E12, 52275.666666666664], [1.73434692E12, 77345.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.7343468E12, 1757.5], [1.73434698E12, 1662.0], [1.7343465E12, 1749.0], [1.73434668E12, 1697.3333333333335], [1.73434686E12, 1784.0], [1.73434656E12, 1863.6666666666665], [1.73434674E12, 1723.0], [1.73434662E12, 1906.8333333333335], [1.73434692E12, 1666.8333333333333]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.7343468E12, 98930.4], [1.73434698E12, 148169.0], [1.73434668E12, 62606.75], [1.73434686E12, 105177.6], [1.73434656E12, 43355.2], [1.73434674E12, 80494.0], [1.73434704E12, 137154.5], [1.7343471E12, 107453.66666666667], [1.73434662E12, 59857.6], [1.73434692E12, 117240.25]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7343468E12, 0.33333333333333337], [1.73434698E12, 0.5], [1.7343465E12, 0.25], [1.73434668E12, 0.6666666666666666], [1.73434686E12, 0.5], [1.73434656E12, 0.4285714285714286], [1.73434674E12, 0.33333333333333337], [1.73434662E12, 0.16666666666666669], [1.73434692E12, 0.5]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.7343468E12, 642.1666666666666], [1.73434698E12, 584.0], [1.7343465E12, 582.8333333333334], [1.73434668E12, 653.8333333333334], [1.73434686E12, 626.1666666666666], [1.73434656E12, 589.1666666666666], [1.73434674E12, 660.0], [1.73434662E12, 808.1666666666667], [1.73434692E12, 570.6666666666667]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7343468E12, 2899.1666666666665], [1.73434698E12, 2771.6666666666665], [1.7343465E12, 2781.6], [1.73434668E12, 2940.666666666667], [1.73434686E12, 3043.166666666667], [1.73434656E12, 3254.5], [1.73434674E12, 2881.0], [1.73434662E12, 3064.8333333333335], [1.73434692E12, 2833.333333333333]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.7343468E12, 0.25], [1.73434698E12, 0.5], [1.73434668E12, 0.2], [1.73434686E12, 0.0], [1.73434656E12, 0.6], [1.73434674E12, 0.6], [1.73434704E12, 0.24999999999999997], [1.7343471E12, 0.0], [1.73434662E12, 0.25], [1.73434692E12, 0.5]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.7343468E12, 329.71428571428567], [1.73434698E12, 364.1086956521739], [1.73434668E12, 422.16666666666663], [1.73434686E12, 395.695652173913], [1.73434716E12, 351.0000000000001], [1.73434656E12, 261.3333333333333], [1.73434722E12, 397.5], [1.73434674E12, 327.70000000000005], [1.73434704E12, 373.41176470588243], [1.7343471E12, 366.31147540983613], [1.73434662E12, 395.44444444444446], [1.73434692E12, 335.7941176470588]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7343465E12, 360.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.7343468E12, 2061.25], [1.73434698E12, 2071.75], [1.73434668E12, 2068.8333333333335], [1.73434686E12, 2061.833333333333], [1.73434656E12, 2062.4], [1.73434674E12, 2066.5], [1.73434704E12, 2066.8], [1.7343471E12, 2068.0], [1.73434662E12, 2074.75], [1.73434692E12, 2058.3333333333335]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.7343468E12, 1.25], [1.73434698E12, 0.75], [1.73434668E12, 1.3333333333333333], [1.73434686E12, 0.6], [1.73434656E12, 1.0], [1.73434674E12, 1.0], [1.73434704E12, 0.8999999999999999], [1.7343471E12, 1.0], [1.73434662E12, 0.75], [1.73434692E12, 1.25]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7343468E12, 1.0], [1.73434698E12, 0.75], [1.73434668E12, 1.1666666666666665], [1.73434686E12, 0.8], [1.73434656E12, 1.5], [1.73434674E12, 1.0], [1.73434704E12, 0.8999999999999999], [1.7343471E12, 2.6], [1.73434662E12, 0.75], [1.73434692E12, 1.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.8333333333333334], [1.73434698E12, 0.75], [1.7343465E12, 0.75], [1.73434668E12, 0.6666666666666666], [1.73434686E12, 1.0], [1.73434656E12, 1.0], [1.73434674E12, 0.8333333333333334], [1.73434662E12, 0.6666666666666667], [1.73434692E12, 1.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7343468E12, 0.33333333333333337], [1.73434698E12, 0.33333333333333337], [1.7343465E12, 0.8], [1.73434668E12, 0.33333333333333337], [1.73434686E12, 0.33333333333333337], [1.73434656E12, 0.33333333333333337], [1.73434674E12, 0.33333333333333337], [1.73434662E12, 0.5], [1.73434692E12, 0.33333333333333337]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.7343468E12, 0.5], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.33333333333333337], [1.73434686E12, 0.16666666666666669], [1.73434656E12, 0.33333333333333337], [1.73434674E12, 0.6666666666666666], [1.73434662E12, 0.16666666666666669], [1.73434692E12, 0.16666666666666666]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7343468E12, 2548.5], [1.73434698E12, 2492.5], [1.73434668E12, 2506.6], [1.73434686E12, 2523.8333333333335], [1.73434656E12, 2499.0], [1.73434674E12, 2500.8], [1.73434704E12, 2535.0], [1.7343471E12, 2513.0], [1.73434662E12, 2498.0], [1.73434692E12, 2525.25]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.7343468E12, 0.8295454545454549], [1.73434698E12, 1.2251908396946571], [1.7343465E12, 1.2272727272727275], [1.73434668E12, 0.834782608695652], [1.73434686E12, 0.8989361702127656], [1.73434656E12, 0.9066666666666666], [1.73434674E12, 0.7586206896551726], [1.73434704E12, 0.7388535031847135], [1.7343471E12, 0.8333333333333333], [1.73434662E12, 0.8952380952380952], [1.73434692E12, 0.7298578199052131]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.7343468E12, 13773.0], [1.73434698E12, 13803.5], [1.73434668E12, 13789.166666666668], [1.73434686E12, 13809.2], [1.73434656E12, 15049.25], [1.73434674E12, 13759.25], [1.73434704E12, 13812.9], [1.7343471E12, 13785.8], [1.73434662E12, 13770.75], [1.73434692E12, 13767.75]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.7343468E12, 269.55555555555554], [1.73434698E12, 276.0], [1.73434668E12, 238.9], [1.73434686E12, 249.63636363636365], [1.73434716E12, 223.0], [1.73434656E12, 264.75], [1.73434674E12, 244.875], [1.73434704E12, 287.84999999999997], [1.7343471E12, 306.5454545454545], [1.73434662E12, 260.6666666666667], [1.73434692E12, 276.55555555555554]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.7343465E12, 771.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73434698E12, 262.55555555555554], [1.73434668E12, 252.18749999999997], [1.73434656E12, 252.00000000000003], [1.73434722E12, 280.6666666666667], [1.73434662E12, 258.2857142857143], [1.73434692E12, 261.13333333333327], [1.7343468E12, 268.9230769230769], [1.7343465E12, 273.5], [1.73434686E12, 246.86666666666667], [1.73434716E12, 248.9], [1.73434674E12, 237.99999999999997], [1.73434704E12, 300.53333333333336], [1.7343471E12, 269.53846153846155]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.7343468E12, 13787.666666666666], [1.73434698E12, 13812.75], [1.7343465E12, 13858.5], [1.73434668E12, 13794.0], [1.73434686E12, 13811.666666666666], [1.73434656E12, 14614.5], [1.73434674E12, 13789.5], [1.73434662E12, 13788.5], [1.73434692E12, 13779.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73434698E12, 856.2222222222222], [1.73434668E12, 848.0], [1.73434656E12, 691.7777777777778], [1.73434722E12, 580.0], [1.73434662E12, 784.7857142857143], [1.73434692E12, 775.8666666666667], [1.7343468E12, 609.0], [1.7343465E12, 607.25], [1.73434686E12, 744.5999999999999], [1.73434716E12, 684.8], [1.73434674E12, 664.4285714285714], [1.73434704E12, 1193.0], [1.7343471E12, 1243.3846153846155]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 1.0], [1.73434668E12, 0.2], [1.73434686E12, 0.16666666666666669], [1.73434656E12, 0.4], [1.73434674E12, 0.6], [1.73434704E12, 0.25000000000000006], [1.7343471E12, 1.0], [1.73434662E12, 0.25], [1.73434692E12, 0.75]], "isOverall": false, "label": "Get OS user Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.25], [1.73434698E12, 0.5], [1.73434668E12, 0.8333333333333334], [1.73434686E12, 0.16666666666666669], [1.73434656E12, 0.2], [1.73434674E12, 0.5], [1.73434704E12, 0.39999999999999997], [1.7343471E12, 0.2], [1.73434662E12, 0.75], [1.73434692E12, 1.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.33333333333333337], [1.7343465E12, 0.2], [1.73434668E12, 0.6666666666666666], [1.73434686E12, 0.16666666666666669], [1.73434656E12, 0.6666666666666667], [1.73434674E12, 0.8333333333333334], [1.73434662E12, 0.33333333333333337], [1.73434692E12, 0.5]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.7343468E12, 0.5], [1.73434698E12, 1.0], [1.73434668E12, 0.8333333333333334], [1.73434686E12, 0.2], [1.73434656E12, 1.25], [1.73434674E12, 1.25], [1.73434704E12, 1.0], [1.7343471E12, 1.0], [1.73434662E12, 0.5], [1.73434692E12, 1.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.7343468E12, 0.5], [1.73434698E12, 1.25], [1.73434668E12, 0.5], [1.73434686E12, 0.6], [1.73434656E12, 0.5], [1.73434674E12, 0.5], [1.73434704E12, 0.7], [1.7343471E12, 0.6], [1.73434662E12, 0.75], [1.73434692E12, 0.75]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73434722E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7343465E12, "maxY": 13232.57142857143, "series": [{"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7343468E12, 275.3], [1.73434698E12, 267.75], [1.7343465E12, 267.0], [1.73434668E12, 270.6666666666667], [1.73434686E12, 259.0], [1.73434656E12, 258.90000000000003], [1.73434674E12, 286.3], [1.73434704E12, 259.4], [1.7343471E12, 293.4], [1.73434662E12, 251.70000000000002], [1.73434692E12, 276.1]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7343468E12, 292.6666666666667], [1.73434698E12, 252.75], [1.7343465E12, 257.75], [1.73434668E12, 245.16666666666666], [1.73434686E12, 269.0], [1.73434656E12, 261.1666666666667], [1.73434674E12, 231.5], [1.73434662E12, 254.16666666666669], [1.73434692E12, 235.66666666666666]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7343468E12, 499.25], [1.73434698E12, 499.25], [1.7343465E12, 496.69230769230774], [1.73434668E12, 481.4166666666666], [1.73434686E12, 547.5454545454545], [1.73434656E12, 590.4999999999999], [1.73434674E12, 489.25], [1.73434662E12, 504.1666666666667], [1.73434692E12, 476.15384615384613]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.7343468E12, 380.1666666666667], [1.73434698E12, 321.0], [1.7343465E12, 393.83333333333337], [1.73434668E12, 316.0], [1.73434686E12, 391.3333333333333], [1.73434656E12, 352.5], [1.73434674E12, 339.1666666666667], [1.73434662E12, 355.1666666666667], [1.73434692E12, 348.5]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7343468E12, 2066.75], [1.73434698E12, 2065.5], [1.73434668E12, 2060.4], [1.73434686E12, 2058.5], [1.73434656E12, 2064.0], [1.73434674E12, 2055.6], [1.73434704E12, 2060.454545454545], [1.7343471E12, 2061.75], [1.73434662E12, 2063.0], [1.73434692E12, 2059.5]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7343468E12, 2065.0], [1.73434698E12, 2071.5], [1.73434668E12, 2062.8], [1.73434686E12, 2060.833333333333], [1.73434656E12, 2068.6], [1.73434674E12, 2061.8], [1.73434704E12, 2064.1666666666665], [1.7343471E12, 2067.6666666666665], [1.73434662E12, 2068.75], [1.73434692E12, 2061.75]], "isOverall": false, "label": "Get OS user Access Token", "isController": false}, {"data": [[1.7343468E12, 2064.5], [1.73434698E12, 2068.0], [1.7343465E12, 2064.8], [1.73434668E12, 2066.1666666666665], [1.73434686E12, 2060.0], [1.73434656E12, 2061.5], [1.73434674E12, 2066.0], [1.73434662E12, 2063.1666666666665], [1.73434692E12, 2063.833333333333]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.7343468E12, 255.33333333333334], [1.73434698E12, 268.3333333333333], [1.73434668E12, 238.25], [1.73434686E12, 250.0], [1.73434716E12, 254.11111111111111], [1.73434722E12, 270.0], [1.73434674E12, 226.2], [1.73434704E12, 267.57142857142856], [1.7343471E12, 279.6], [1.73434662E12, 265.0], [1.73434692E12, 260.5]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.7343465E12, 0.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.7343468E12, 2063.1666666666665], [1.73434698E12, 2063.6666666666665], [1.7343465E12, 2060.2], [1.73434668E12, 2067.5], [1.73434686E12, 2063.5], [1.73434656E12, 2064.666666666667], [1.73434674E12, 2066.166666666667], [1.73434662E12, 2061.1666666666665], [1.73434692E12, 2066.3333333333335]], "isOverall": false, "label": "Get OS SR Access Token", "isController": false}, {"data": [[1.7343468E12, 7708.25], [1.73434698E12, 10178.25], [1.73434668E12, 7484.6], [1.73434686E12, 7806.0], [1.73434716E12, 9050.0], [1.73434722E12, 13232.57142857143], [1.73434674E12, 6737.5], [1.73434704E12, 8485.2], [1.7343471E12, 8183.4], [1.73434662E12, 8197.666666666666], [1.73434692E12, 8927.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.7343468E12, 270.87499999999983], [1.73434698E12, 276.9351145038167], [1.7343465E12, 235.72727272727272], [1.73434668E12, 275.00000000000006], [1.73434686E12, 280.15425531914883], [1.73434656E12, 286.92], [1.73434674E12, 268.1034482758622], [1.73434704E12, 290.0955414012738], [1.7343471E12, 341.5], [1.73434662E12, 288.25714285714275], [1.73434692E12, 276.04265402843606]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.7343468E12, 258.0], [1.73434698E12, 275.25], [1.73434668E12, 232.5], [1.73434686E12, 261.0], [1.73434656E12, 270.25], [1.73434674E12, 253.5], [1.73434704E12, 266.40000000000003], [1.7343471E12, 255.6], [1.73434662E12, 258.5], [1.73434692E12, 261.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.7343468E12, 638.0], [1.73434698E12, 586.3333333333334], [1.7343465E12, 534.2], [1.73434668E12, 713.6666666666666], [1.73434686E12, 635.6666666666667], [1.73434656E12, 759.5], [1.73434674E12, 578.5], [1.73434662E12, 571.1666666666667], [1.73434692E12, 595.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.7343468E12, 851.0], [1.73434698E12, 671.5], [1.73434668E12, 1054.1666666666665], [1.73434686E12, 1068.0], [1.73434656E12, 1074.0], [1.73434674E12, 694.25], [1.73434704E12, 1080.6999999999998], [1.7343471E12, 697.4], [1.73434662E12, 946.75], [1.73434692E12, 800.25]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.7343468E12, 249.5], [1.73434698E12, 273.75], [1.73434668E12, 241.66666666666666], [1.73434686E12, 271.6], [1.73434656E12, 251.25], [1.73434674E12, 250.0], [1.73434704E12, 264.3333333333333], [1.7343471E12, 244.16666666666666], [1.73434662E12, 268.0], [1.73434692E12, 256.25]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.7343468E12, 247.25], [1.73434698E12, 240.25], [1.73434668E12, 253.5], [1.73434686E12, 253.6], [1.73434656E12, 244.25], [1.73434674E12, 240.75], [1.73434704E12, 262.0], [1.7343471E12, 242.16666666666669], [1.73434662E12, 261.75], [1.73434692E12, 269.5]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.7343468E12, 2062.833333333333], [1.73434698E12, 2059.5], [1.7343465E12, 2057.75], [1.73434668E12, 2061.5], [1.73434686E12, 2063.833333333333], [1.73434656E12, 2063.857142857143], [1.73434674E12, 2064.5], [1.73434662E12, 2065.833333333333], [1.73434692E12, 2059.5]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.7343468E12, 311.2], [1.73434698E12, 275.6666666666667], [1.7343465E12, 261.0], [1.73434668E12, 279.57142857142856], [1.73434686E12, 346.83333333333337], [1.73434656E12, 319.6666666666667], [1.73434674E12, 297.16666666666663], [1.73434662E12, 330.8333333333333], [1.73434692E12, 286.6666666666667]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434656E12, 0.0], [1.73434722E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0], [1.7343468E12, 0.0], [1.7343465E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.7343465E12, 300.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Import Policy i-Rec-0", "isController": false}, {"data": [[1.7343468E12, 290.6764705882353], [1.73434698E12, 342.59259259259267], [1.73434668E12, 244.2857142857143], [1.73434686E12, 254.3414634146341], [1.73434716E12, 327.66666666666663], [1.73434656E12, 245.79999999999998], [1.73434674E12, 292.66666666666663], [1.73434704E12, 303.13888888888897], [1.7343471E12, 277.24999999999994], [1.73434662E12, 239.37499999999997], [1.73434692E12, 254.25000000000003]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.7343465E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get OS SR Access Token-0", "isController": false}, {"data": [[1.7343468E12, 2062.25], [1.73434698E12, 2060.25], [1.73434668E12, 2066.166666666667], [1.73434686E12, 2058.6], [1.73434656E12, 2058.75], [1.73434674E12, 2056.75], [1.73434704E12, 2059.7], [1.7343471E12, 2066.0], [1.73434662E12, 2060.5], [1.73434692E12, 2059.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.7343465E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.7343468E12, 271.75], [1.73434698E12, 266.5], [1.73434668E12, 267.16666666666663], [1.73434686E12, 289.1666666666667], [1.73434716E12, 251.0], [1.73434656E12, 253.0], [1.73434674E12, 303.0], [1.73434704E12, 298.625], [1.7343471E12, 324.25000000000006], [1.73434662E12, 310.25], [1.73434692E12, 371.4]], "isOverall": false, "label": "Import Policy i-Rec", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.7343468E12, 2549.1666666666665], [1.73434698E12, 2561.6666666666665], [1.7343465E12, 2542.4], [1.73434668E12, 2509.5], [1.73434686E12, 2517.666666666667], [1.73434656E12, 2498.5], [1.73434674E12, 2510.0], [1.73434662E12, 2535.6666666666665], [1.73434692E12, 2513.8333333333335]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.7343465E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7343468E12, 2057.6666666666665], [1.73434698E12, 2057.75], [1.7343465E12, 2063.0], [1.73434668E12, 2063.1666666666665], [1.73434686E12, 2062.6666666666665], [1.73434656E12, 2056.5], [1.73434674E12, 2065.0], [1.73434662E12, 2058.3333333333335], [1.73434692E12, 2060.8333333333335]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434656E12, 0.0], [1.73434722E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0], [1.7343468E12, 0.0], [1.7343465E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.7343468E12, 641.1666666666667], [1.73434698E12, 583.0], [1.7343465E12, 581.6666666666666], [1.73434668E12, 653.3333333333333], [1.73434686E12, 625.6666666666667], [1.73434656E12, 588.5], [1.73434674E12, 659.1666666666667], [1.73434662E12, 807.8333333333333], [1.73434692E12, 570.1666666666666]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.7343468E12, 326.61904761904765], [1.73434698E12, 362.21739130434787], [1.73434668E12, 419.72222222222223], [1.73434686E12, 392.8695652173913], [1.73434716E12, 348.6271186440678], [1.73434656E12, 260.6666666666667], [1.73434722E12, 395.75], [1.73434674E12, 324.76666666666665], [1.73434704E12, 371.35294117647067], [1.7343471E12, 364.5737704918033], [1.73434662E12, 393.5], [1.73434692E12, 333.26470588235287]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7343465E12, 357.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.7343468E12, 2060.75], [1.73434698E12, 2071.0], [1.73434668E12, 2067.8333333333335], [1.73434686E12, 2061.0], [1.73434656E12, 2061.8], [1.73434674E12, 2065.75], [1.73434704E12, 2066.1], [1.7343471E12, 2067.6], [1.73434662E12, 2074.0], [1.73434692E12, 2057.3333333333335]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7343468E12, 2548.0], [1.73434698E12, 2491.5], [1.73434668E12, 2506.2], [1.73434686E12, 2523.5], [1.73434656E12, 2498.2], [1.73434674E12, 2500.0], [1.73434704E12, 2534.583333333334], [1.7343471E12, 2513.0], [1.73434662E12, 2497.75], [1.73434692E12, 2524.75]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.7343468E12, 268.44444444444446], [1.73434698E12, 274.75], [1.73434668E12, 237.8], [1.73434686E12, 248.36363636363635], [1.73434716E12, 221.0], [1.73434656E12, 263.5], [1.73434674E12, 243.875], [1.73434704E12, 286.8], [1.7343471E12, 305.7272727272727], [1.73434662E12, 259.55555555555554], [1.73434692E12, 275.4444444444445]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.7343465E12, 770.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73434698E12, 261.55555555555554], [1.73434668E12, 251.0625], [1.73434656E12, 251.00000000000003], [1.73434722E12, 279.3333333333333], [1.73434662E12, 257.42857142857144], [1.73434692E12, 260.2], [1.7343468E12, 267.6153846153846], [1.7343465E12, 271.75], [1.73434686E12, 245.93333333333334], [1.73434716E12, 247.6], [1.73434674E12, 236.92857142857142], [1.73434704E12, 298.9333333333334], [1.7343471E12, 268.2307692307692]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73434698E12, 855.6666666666666], [1.73434668E12, 846.5625], [1.73434656E12, 690.1111111111111], [1.73434722E12, 579.0], [1.73434662E12, 783.6428571428572], [1.73434692E12, 774.9333333333335], [1.7343468E12, 608.0769230769231], [1.7343465E12, 606.25], [1.73434686E12, 743.5999999999999], [1.73434716E12, 683.2], [1.73434674E12, 663.3571428571429], [1.73434704E12, 1191.4], [1.7343471E12, 1241.8461538461538]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get OS user Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73434722E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7343465E12, "maxY": 22439.14285714286, "series": [{"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7343468E12, 242.91666666666666], [1.73434698E12, 239.25], [1.7343465E12, 233.00000000000003], [1.73434668E12, 235.4166666666667], [1.73434686E12, 277.4545454545455], [1.73434656E12, 249.66666666666669], [1.73434674E12, 233.91666666666666], [1.73434662E12, 237.08333333333331], [1.73434692E12, 227.6923076923077]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7343468E12, 2046.5], [1.73434698E12, 2046.5], [1.73434668E12, 2040.4], [1.73434686E12, 2040.3333333333333], [1.73434656E12, 2039.25], [1.73434674E12, 2036.4], [1.73434704E12, 2041.5454545454545], [1.7343471E12, 2042.0], [1.73434662E12, 2043.0], [1.73434692E12, 2041.75]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7343468E12, 2043.5], [1.73434698E12, 2050.5], [1.73434668E12, 2039.8], [1.73434686E12, 2039.3333333333333], [1.73434656E12, 2047.4], [1.73434674E12, 2040.2], [1.73434704E12, 2043.3333333333335], [1.7343471E12, 2044.6666666666667], [1.73434662E12, 2046.25], [1.73434692E12, 2040.75]], "isOverall": false, "label": "Get OS user Access Token", "isController": false}, {"data": [[1.7343468E12, 2046.3333333333333], [1.73434698E12, 2046.6666666666667], [1.7343465E12, 2045.0], [1.73434668E12, 2048.1666666666665], [1.73434686E12, 2041.3333333333333], [1.73434656E12, 2039.0], [1.73434674E12, 2045.8333333333333], [1.73434662E12, 2043.0], [1.73434692E12, 2045.3333333333333]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.7343465E12, 497.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.7343468E12, 2043.0], [1.73434698E12, 2044.6666666666667], [1.7343465E12, 2037.0], [1.73434668E12, 2046.3333333333335], [1.73434686E12, 2041.8333333333335], [1.73434656E12, 2042.3333333333333], [1.73434674E12, 2042.8333333333335], [1.73434662E12, 2040.0], [1.73434692E12, 2047.1666666666667]], "isOverall": false, "label": "Get OS SR Access Token", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.7343468E12, 17.312499999999996], [1.73434698E12, 23.27862595419848], [1.7343465E12, 0.0], [1.73434668E12, 23.93913043478261], [1.73434686E12, 22.409574468085125], [1.73434656E12, 19.426666666666662], [1.73434674E12, 18.655172413793103], [1.73434704E12, 24.48407643312102], [1.7343471E12, 76.91666666666666], [1.73434662E12, 34.13333333333334], [1.73434692E12, 25.066350710900487]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.7343468E12, 236.25], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 406.8], [1.73434656E12, 252.25], [1.73434674E12, 0.0], [1.73434704E12, 145.69999999999996], [1.7343471E12, 88.8], [1.73434662E12, 0.0], [1.73434692E12, 247.75]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.7343468E12, 2044.5], [1.73434698E12, 2039.25], [1.7343465E12, 2037.0], [1.73434668E12, 2042.1666666666667], [1.73434686E12, 2042.0], [1.73434656E12, 2042.142857142857], [1.73434674E12, 2046.8333333333335], [1.73434662E12, 2044.8333333333335], [1.73434692E12, 2039.5]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434656E12, 0.0], [1.73434722E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0], [1.7343468E12, 0.0], [1.7343465E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.7343468E12, 21931.6], [1.73434698E12, 21992.333333333332], [1.7343465E12, 22407.5], [1.73434668E12, 21777.166666666668], [1.73434686E12, 22439.14285714286], [1.73434656E12, 21798.333333333336], [1.73434674E12, 21861.666666666668], [1.73434662E12, 21374.166666666668], [1.73434692E12, 22271.166666666668]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.7343465E12, 0.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Import Policy i-Rec-0", "isController": false}, {"data": [[1.7343468E12, 44.82352941176471], [1.73434698E12, 82.14814814814815], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 89.0], [1.73434656E12, 0.0], [1.73434674E12, 49.27777777777778], [1.73434704E12, 31.22222222222223], [1.7343471E12, 20.958333333333336], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.7343465E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.7343468E12, 11076.333333333332], [1.73434698E12, 11102.6], [1.7343465E12, 10458.5], [1.73434668E12, 10685.2], [1.73434686E12, 11178.333333333334], [1.73434656E12, 11055.833333333334], [1.73434674E12, 10791.666666666668], [1.73434662E12, 10675.5], [1.73434692E12, 11206.333333333334]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get OS SR Access Token-0", "isController": false}, {"data": [[1.7343468E12, 2044.0], [1.73434698E12, 2042.75], [1.73434668E12, 2047.6666666666667], [1.73434686E12, 2040.0], [1.73434656E12, 2041.5], [1.73434674E12, 2039.0], [1.73434704E12, 2040.3], [1.7343471E12, 2046.6], [1.73434662E12, 2040.5], [1.73434692E12, 2041.25]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.7343468E12, 705.6666666666666], [1.73434698E12, 1059.3333333333333], [1.73434668E12, 490.25], [1.73434686E12, 456.6666666666667], [1.73434716E12, 885.2222222222222], [1.73434722E12, 514.3333333333334], [1.73434674E12, 500.0], [1.73434704E12, 891.0], [1.7343471E12, 505.8], [1.73434662E12, 432.75], [1.73434692E12, 481.5]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.7343465E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 91.39999999999999]], "isOverall": false, "label": "Import Policy i-Rec", "isController": false}, {"data": [[1.7343468E12, 10709.25], [1.73434698E12, 10774.5], [1.73434668E12, 10223.166666666666], [1.73434686E12, 10610.4], [1.73434656E12, 10969.5], [1.73434674E12, 10550.25], [1.73434704E12, 10571.9], [1.7343471E12, 10422.4], [1.73434662E12, 10216.0], [1.73434692E12, 10458.25]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.7343468E12, 2043.6666666666667], [1.73434698E12, 2042.3333333333333], [1.7343465E12, 2052.0], [1.73434668E12, 2046.5], [1.73434686E12, 2044.0], [1.73434656E12, 2039.1666666666665], [1.73434674E12, 2042.6666666666665], [1.73434662E12, 2042.3333333333333], [1.73434692E12, 2044.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.7343465E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7343468E12, 2039.6666666666667], [1.73434698E12, 2038.5], [1.7343465E12, 2043.25], [1.73434668E12, 2043.5], [1.73434686E12, 2042.5], [1.73434656E12, 2037.1666666666665], [1.73434674E12, 2044.6666666666665], [1.73434662E12, 2036.1666666666667], [1.73434692E12, 2042.5]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434656E12, 0.0], [1.73434722E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0], [1.7343468E12, 0.0], [1.7343465E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434722E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.7343468E12, 646.75], [1.73434698E12, 919.25], [1.73434668E12, 514.4], [1.73434686E12, 456.6666666666667], [1.73434716E12, 681.4285714285713], [1.73434722E12, 818.7142857142858], [1.73434674E12, 507.5], [1.73434704E12, 1040.6], [1.7343471E12, 514.4], [1.73434662E12, 373.33333333333337], [1.73434692E12, 475.6666666666667]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.7343468E12, 485.8333333333333], [1.73434698E12, 478.5], [1.7343465E12, 504.8333333333333], [1.73434668E12, 470.8333333333333], [1.73434686E12, 508.66666666666663], [1.73434656E12, 499.33333333333337], [1.73434674E12, 467.8333333333333], [1.73434662E12, 474.16666666666663], [1.73434692E12, 493.3333333333333]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7343468E12, 470.8333333333333], [1.73434698E12, 472.0], [1.7343465E12, 504.2], [1.73434668E12, 467.1666666666667], [1.73434686E12, 501.0], [1.73434656E12, 506.83333333333337], [1.73434674E12, 481.16666666666663], [1.73434662E12, 472.5], [1.73434692E12, 508.6666666666667]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.7343468E12, 51.95238095238096], [1.73434698E12, 93.60869565217389], [1.73434668E12, 167.72222222222223], [1.73434686E12, 121.60869565217388], [1.73434716E12, 79.7627118644068], [1.73434656E12, 0.0], [1.73434722E12, 135.0], [1.73434674E12, 65.26666666666665], [1.73434704E12, 92.35294117647062], [1.7343471E12, 94.70491803278689], [1.73434662E12, 124.49999999999996], [1.73434692E12, 73.61764705882352]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.7343465E12, 0.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.7343468E12, 2041.5], [1.73434698E12, 2050.75], [1.73434668E12, 2045.0], [1.73434686E12, 2041.6666666666667], [1.73434656E12, 2040.4], [1.73434674E12, 2047.75], [1.73434704E12, 2044.2], [1.7343471E12, 2050.6], [1.73434662E12, 2051.75], [1.73434692E12, 2041.3333333333333]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7343468E12, 2043.75], [1.73434698E12, 2044.0], [1.73434668E12, 2044.6], [1.73434686E12, 2043.3333333333333], [1.73434656E12, 2037.2], [1.73434674E12, 2042.8], [1.73434704E12, 2043.5833333333333], [1.7343471E12, 2044.3333333333333], [1.73434662E12, 2043.75], [1.73434692E12, 2034.5]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.7343465E12, 497.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434656E12, 0.0], [1.73434722E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0], [1.7343468E12, 0.0], [1.7343465E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 34.93333333333333], [1.7343471E12, 0.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434656E12, 0.0], [1.73434722E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0], [1.7343468E12, 0.0], [1.7343465E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get OS user Access Token-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.7343465E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.7343468E12, 0.0], [1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434686E12, 0.0], [1.73434656E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73434722E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7343465E12, "maxY": 24069.0, "series": [{"data": [[1.73434698E12, 11525.0], [1.73434668E12, 8099.0], [1.73434656E12, 2561.0], [1.73434722E12, 24069.0], [1.73434662E12, 8907.0], [1.73434692E12, 11392.0], [1.7343468E12, 8113.0], [1.7343465E12, 2591.0], [1.73434686E12, 8577.0], [1.73434716E12, 12451.0], [1.73434674E12, 7192.0], [1.73434704E12, 9142.0], [1.7343471E12, 11457.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73434698E12, 336.1], [1.73434668E12, 903.5], [1.73434656E12, 2055.0], [1.73434722E12, 11146.5], [1.73434662E12, 813.7], [1.73434692E12, 597.0], [1.7343468E12, 672.3000000000001], [1.7343465E12, 2053.3], [1.73434686E12, 740.2000000000003], [1.73434716E12, 657.9000000000017], [1.73434674E12, 715.5], [1.73434704E12, 809.3999999999999], [1.7343471E12, 753.6000000000003]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73434698E12, 2484.670000000001], [1.73434668E12, 2520.25], [1.73434656E12, 2494.42], [1.73434722E12, 24069.0], [1.73434662E12, 2533.1800000000003], [1.73434692E12, 2508.0], [1.7343468E12, 2568.32], [1.7343465E12, 2555.3599999999997], [1.73434686E12, 2518.89], [1.73434716E12, 11883.960000000021], [1.73434674E12, 2518.5], [1.73434704E12, 2612.82], [1.7343471E12, 7466.889999999997]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73434698E12, 838.2499999999998], [1.73434668E12, 2066.0], [1.73434656E12, 2067.0], [1.73434722E12, 14761.599999999986], [1.73434662E12, 2067.0], [1.73434692E12, 2055.0], [1.7343468E12, 2061.0], [1.7343465E12, 2070.05], [1.73434686E12, 2060.35], [1.73434716E12, 877.7499999999987], [1.73434674E12, 2064.0], [1.73434704E12, 2064.0], [1.7343471E12, 2062.95]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73434698E12, 0.0], [1.73434668E12, 0.0], [1.73434656E12, 0.0], [1.73434722E12, 0.0], [1.73434662E12, 0.0], [1.73434692E12, 0.0], [1.7343468E12, 0.0], [1.7343465E12, 0.0], [1.73434686E12, 0.0], [1.73434716E12, 0.0], [1.73434674E12, 0.0], [1.73434704E12, 0.0], [1.7343471E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73434698E12, 157.5], [1.73434668E12, 108.5], [1.73434656E12, 105.5], [1.73434722E12, 117.0], [1.73434662E12, 107.0], [1.73434692E12, 102.0], [1.7343468E12, 105.5], [1.7343465E12, 111.5], [1.73434686E12, 103.0], [1.73434716E12, 109.5], [1.73434674E12, 105.0], [1.73434704E12, 107.5], [1.7343471E12, 102.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73434722E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 99.0, "minX": 2.0, "maxY": 154.5, "series": [{"data": [[2.0, 113.0], [8.0, 106.0], [32.0, 109.0], [36.0, 122.5], [10.0, 104.5], [42.0, 110.0], [12.0, 105.5], [14.0, 105.5], [4.0, 109.5], [16.0, 104.0], [18.0, 102.5], [20.0, 106.5], [22.0, 104.0], [6.0, 99.0], [24.0, 103.0], [26.0, 154.5], [28.0, 104.0], [30.0, 109.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 42.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 96.5, "minX": 2.0, "maxY": 121.0, "series": [{"data": [[2.0, 102.5], [8.0, 100.5], [32.0, 107.5], [36.0, 121.0], [10.0, 99.5], [42.0, 109.0], [12.0, 98.5], [14.0, 100.0], [4.0, 105.5], [16.0, 98.0], [18.0, 101.0], [20.0, 101.5], [22.0, 102.5], [6.0, 96.5], [24.0, 101.0], [26.0, 98.0], [28.0, 102.5], [30.0, 105.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 42.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.6, "minX": 1.7343465E12, "maxY": 15.383333333333333, "series": [{"data": [[1.73434698E12, 14.6], [1.73434668E12, 11.55], [1.73434656E12, 8.0], [1.73434722E12, 0.6], [1.73434662E12, 10.216666666666667], [1.73434692E12, 15.383333333333333], [1.7343468E12, 13.15], [1.7343465E12, 3.316666666666667], [1.73434686E12, 14.55], [1.73434716E12, 3.466666666666667], [1.73434674E12, 12.05], [1.73434704E12, 13.4], [1.7343471E12, 7.383333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73434722E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7343465E12, "maxY": 14.083333333333334, "series": [{"data": [[1.73434698E12, 13.933333333333334], [1.73434668E12, 10.133333333333333], [1.73434656E12, 6.783333333333333], [1.73434722E12, 0.6166666666666667], [1.73434662E12, 8.916666666666666], [1.73434692E12, 14.083333333333334], [1.7343468E12, 11.883333333333333], [1.7343465E12, 2.5833333333333335], [1.73434686E12, 13.133333333333333], [1.73434716E12, 3.25], [1.73434674E12, 10.783333333333333], [1.73434704E12, 12.25], [1.7343471E12, 6.783333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.73434698E12, 0.45], [1.73434668E12, 0.95], [1.73434656E12, 0.8], [1.73434722E12, 0.05], [1.73434662E12, 0.8666666666666667], [1.73434692E12, 0.9], [1.7343468E12, 0.85], [1.7343465E12, 0.5666666666666667], [1.73434686E12, 0.9166666666666666], [1.73434716E12, 0.16666666666666666], [1.73434674E12, 0.8833333333333333], [1.73434704E12, 0.6166666666666667], [1.7343471E12, 0.35]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.7343468E12, 0.4], [1.73434698E12, 0.25], [1.7343465E12, 0.15], [1.73434668E12, 0.48333333333333334], [1.73434686E12, 0.48333333333333334], [1.73434716E12, 0.016666666666666666], [1.73434656E12, 0.38333333333333336], [1.73434674E12, 0.4], [1.73434704E12, 0.4666666666666667], [1.7343471E12, 0.3], [1.73434662E12, 0.4166666666666667], [1.73434692E12, 0.4166666666666667]], "isOverall": false, "label": "202", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73434722E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7343465E12, "maxY": 4.366666666666666, "series": [{"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.03333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434716E12, 0.016666666666666666], [1.73434656E12, 0.05], [1.73434674E12, 0.05], [1.73434704E12, 0.13333333333333333], [1.7343471E12, 0.13333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.08333333333333333]], "isOverall": false, "label": "Link user-success", "isController": true}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.08333333333333333], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.05]], "isOverall": false, "label": "Get user key gen result-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.03333333333333333], [1.7343465E12, 0.1], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Accept sr-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.03333333333333333], [1.7343465E12, 0.1], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Accept sr-0-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Invite and accept user-success", "isController": true}, {"data": [[1.7343468E12, 0.2], [1.73434698E12, 0.06666666666666667], [1.7343465E12, 0.21666666666666667], [1.73434668E12, 0.2], [1.73434686E12, 0.18333333333333332], [1.73434656E12, 0.2], [1.73434674E12, 0.2], [1.73434662E12, 0.2], [1.73434692E12, 0.21666666666666667]], "isOverall": false, "label": "Get Admin Access Token-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.06666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.11666666666666667], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Get key gen result-success", "isController": false}, {"data": [[1.7343465E12, 0.016666666666666666]], "isOverall": false, "label": "Tenant creation flow-success", "isController": true}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Login by SR OS-0-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Accept user-success", "isController": false}, {"data": [[1.73434698E12, 0.15], [1.73434668E12, 0.26666666666666666], [1.73434656E12, 0.15], [1.73434722E12, 0.05], [1.73434662E12, 0.23333333333333334], [1.73434692E12, 0.25], [1.7343468E12, 0.21666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434686E12, 0.25], [1.73434716E12, 0.16666666666666666], [1.73434674E12, 0.23333333333333334], [1.73434704E12, 0.25], [1.7343471E12, 0.21666666666666667]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Get User Access Token-0-success", "isController": false}, {"data": [[1.7343468E12, 0.35], [1.73434698E12, 0.7666666666666667], [1.73434668E12, 0.3], [1.73434686E12, 0.38333333333333336], [1.73434716E12, 0.9833333333333333], [1.73434656E12, 0.05], [1.73434722E12, 0.06666666666666667], [1.73434674E12, 0.5], [1.73434704E12, 0.5666666666666667], [1.7343471E12, 1.0166666666666666], [1.73434662E12, 0.3], [1.73434692E12, 0.5666666666666667]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.7343468E12, 0.08333333333333333], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.11666666666666667], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Invite user-0-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.06666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Get sr keys-success", "isController": false}, {"data": [[1.7343468E12, 0.08333333333333333], [1.73434698E12, 0.03333333333333333], [1.73434668E12, 0.06666666666666667], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.08333333333333333], [1.73434674E12, 0.08333333333333333], [1.73434704E12, 0.2], [1.7343471E12, 0.05], [1.73434662E12, 0.08333333333333333], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Link SR-success", "isController": true}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.03333333333333333], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.1], [1.73434656E12, 0.08333333333333333], [1.73434674E12, 0.08333333333333333], [1.73434704E12, 0.2], [1.7343471E12, 0.05], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Get OS user Access Token-0-success", "isController": false}, {"data": [[1.7343465E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-success", "isController": false}, {"data": [[1.7343468E12, 0.5666666666666667], [1.73434698E12, 0.45], [1.73434668E12, 0.35], [1.73434686E12, 0.6833333333333333], [1.73434716E12, 0.1], [1.73434656E12, 0.16666666666666666], [1.73434674E12, 0.3], [1.73434704E12, 0.6], [1.7343471E12, 0.8], [1.73434662E12, 0.26666666666666666], [1.73434692E12, 0.8]], "isOverall": false, "label": "Get user link result-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Get User Access Token-success", "isController": false}, {"data": [[1.7343465E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.15], [1.7343471E12, 0.1], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Link user profile-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.05], [1.73434716E12, 0.11666666666666667], [1.73434722E12, 0.11666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.08333333333333333], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.05], [1.73434692E12, 0.05]], "isOverall": false, "label": "Policy import and dry run-success", "isController": true}, {"data": [[1.7343468E12, 0.2], [1.73434698E12, 0.06666666666666667], [1.7343465E12, 0.21666666666666667], [1.73434668E12, 0.2], [1.73434686E12, 0.18333333333333332], [1.73434656E12, 0.2], [1.73434674E12, 0.2], [1.73434662E12, 0.2], [1.73434692E12, 0.21666666666666667]], "isOverall": false, "label": "Get Admin Access Token-0-success", "isController": false}, {"data": [[1.7343468E12, 0.16666666666666666], [1.73434698E12, 0.13333333333333333], [1.7343465E12, 0.06666666666666667], [1.73434668E12, 0.2], [1.73434686E12, 0.18333333333333332], [1.73434656E12, 0.16666666666666666], [1.73434674E12, 0.16666666666666666], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.16666666666666666], [1.73434692E12, 0.16666666666666666]], "isOverall": false, "label": "Agree terms-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "User creation(admin side)-success", "isController": true}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Get user keys-0-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Get OS SR Access Token-0-success", "isController": false}, {"data": [[1.7343468E12, 0.05], [1.73434698E12, 0.05], [1.73434668E12, 0.06666666666666667], [1.73434686E12, 0.05], [1.73434716E12, 0.15], [1.73434722E12, 0.05], [1.73434674E12, 0.08333333333333333], [1.73434704E12, 0.11666666666666667], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Requests for Import-success", "isController": true}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.03333333333333333], [1.7343465E12, 0.1], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Invite and accept SR-success", "isController": true}, {"data": [[1.7343465E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-0-success", "isController": false}, {"data": [[1.7343468E12, 0.5666666666666667], [1.73434698E12, 0.45], [1.73434668E12, 0.35], [1.73434686E12, 0.6833333333333333], [1.73434716E12, 0.1], [1.73434656E12, 0.16666666666666666], [1.73434674E12, 0.3], [1.73434704E12, 0.6], [1.7343471E12, 0.8], [1.73434662E12, 0.26666666666666666], [1.73434692E12, 0.8]], "isOverall": false, "label": "Get user link result-success", "isController": false}, {"data": [[1.7343465E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Login by SR OS-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Get user keys-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.06666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Generate sr hedera data-success", "isController": true}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.06666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.11666666666666667], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Get key gen result-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "User creation(user side)-success", "isController": true}, {"data": [[1.7343468E12, 0.05], [1.73434698E12, 0.05], [1.73434668E12, 0.06666666666666667], [1.73434686E12, 0.05], [1.73434716E12, 0.15], [1.73434722E12, 0.05], [1.73434674E12, 0.08333333333333333], [1.73434704E12, 0.11666666666666667], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Get OS SR Access Token-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.05], [1.73434716E12, 0.11666666666666667], [1.73434722E12, 0.11666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.08333333333333333], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.05], [1.73434692E12, 0.05]], "isOverall": false, "label": "Requests for DryRun-success", "isController": true}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Accept user-0-success", "isController": false}, {"data": [[1.7343468E12, 0.15], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.16666666666666666], [1.73434686E12, 0.18333333333333332], [1.73434716E12, 0.016666666666666666], [1.73434656E12, 0.13333333333333333], [1.73434674E12, 0.13333333333333333], [1.73434704E12, 0.3333333333333333], [1.7343471E12, 0.18333333333333332], [1.73434662E12, 0.15], [1.73434692E12, 0.15]], "isOverall": false, "label": "Verify link-success", "isController": false}, {"data": [[1.7343468E12, 0.16666666666666666], [1.73434698E12, 0.13333333333333333], [1.7343465E12, 0.06666666666666667], [1.73434668E12, 0.2], [1.73434686E12, 0.18333333333333332], [1.73434656E12, 0.16666666666666666], [1.73434674E12, 0.16666666666666666], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.16666666666666666], [1.73434692E12, 0.16666666666666666]], "isOverall": false, "label": "Agree terms-0-success", "isController": false}, {"data": [[1.7343465E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.06666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Get sr keys-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.15], [1.7343471E12, 0.1], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Get SR DID-success", "isController": false}, {"data": [[1.7343468E12, 0.08333333333333333], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.11666666666666667], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Invite user-success", "isController": false}, {"data": [[1.7343468E12, 0.35], [1.73434698E12, 0.7666666666666667], [1.73434668E12, 0.3], [1.73434686E12, 0.38333333333333336], [1.73434716E12, 0.9833333333333333], [1.73434656E12, 0.05], [1.73434722E12, 0.06666666666666667], [1.73434674E12, 0.5], [1.73434704E12, 0.5666666666666667], [1.7343471E12, 1.0166666666666666], [1.73434662E12, 0.3], [1.73434692E12, 0.5666666666666667]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.06666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Link SR profile-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Generate user hedera data-success", "isController": true}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.03333333333333333], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.1], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.08333333333333333], [1.73434704E12, 0.18333333333333332], [1.7343471E12, 0.06666666666666667], [1.73434662E12, 0.08333333333333333], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Generate user keys-0-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Generate sr keys-0-success", "isController": false}, {"data": [[1.7343468E12, 2.933333333333333], [1.73434698E12, 4.366666666666666], [1.7343465E12, 0.36666666666666664], [1.73434668E12, 1.9166666666666667], [1.73434686E12, 3.1333333333333333], [1.73434656E12, 1.25], [1.73434674E12, 2.4166666666666665], [1.73434704E12, 2.6166666666666667], [1.7343471E12, 0.2], [1.73434662E12, 1.75], [1.73434692E12, 3.5166666666666666]], "isOverall": false, "label": "Get SR link result-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.03333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434716E12, 0.016666666666666666], [1.73434656E12, 0.05], [1.73434674E12, 0.05], [1.73434704E12, 0.13333333333333333], [1.7343471E12, 0.13333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.08333333333333333]], "isOverall": false, "label": "Import Policy i-Rec-0-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.03333333333333333], [1.7343465E12, 0.1], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Invite sr-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.03333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434716E12, 0.016666666666666666], [1.73434656E12, 0.05], [1.73434674E12, 0.05], [1.73434704E12, 0.13333333333333333], [1.7343471E12, 0.13333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.08333333333333333]], "isOverall": false, "label": "Import Policy i-Rec-success", "isController": false}, {"data": [[1.73434698E12, 0.15], [1.73434668E12, 0.26666666666666666], [1.73434656E12, 0.15], [1.73434722E12, 0.05], [1.73434662E12, 0.23333333333333334], [1.73434692E12, 0.25], [1.7343468E12, 0.21666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434686E12, 0.25], [1.73434716E12, 0.16666666666666666], [1.73434674E12, 0.23333333333333334], [1.73434704E12, 0.25], [1.7343471E12, 0.21666666666666667]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.7343468E12, 2.933333333333333], [1.73434698E12, 4.366666666666666], [1.7343465E12, 0.36666666666666664], [1.73434668E12, 1.9166666666666667], [1.73434686E12, 3.1333333333333333], [1.73434656E12, 1.25], [1.73434674E12, 2.4166666666666665], [1.73434704E12, 2.6166666666666667], [1.7343471E12, 0.2], [1.73434662E12, 1.75], [1.73434692E12, 3.5166666666666666]], "isOverall": false, "label": "Get SR link result-success", "isController": false}, {"data": [[1.7343468E12, 0.05], [1.73434698E12, 0.05], [1.73434668E12, 0.06666666666666667], [1.73434686E12, 0.05], [1.73434716E12, 0.15], [1.73434722E12, 0.05], [1.73434674E12, 0.08333333333333333], [1.73434704E12, 0.11666666666666667], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.03333333333333333], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.1], [1.73434656E12, 0.08333333333333333], [1.73434674E12, 0.08333333333333333], [1.73434704E12, 0.2], [1.7343471E12, 0.05], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Login by user OS-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.15], [1.7343471E12, 0.1], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Get SR DID-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.05], [1.73434716E12, 0.11666666666666667], [1.73434722E12, 0.11666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.08333333333333333], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.05], [1.73434692E12, 0.05]], "isOverall": false, "label": "Dry Run Policy-success", "isController": false}, {"data": [[1.7343468E12, 0.08333333333333333], [1.73434698E12, 0.1], [1.7343465E12, 0.03333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.11666666666666667], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "User creation flow-success", "isController": true}, {"data": [[1.7343465E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.03333333333333333], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.1], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.08333333333333333], [1.73434704E12, 0.18333333333333332], [1.7343471E12, 0.06666666666666667], [1.73434662E12, 0.08333333333333333], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Generate user keys-success", "isController": false}, {"data": [[1.73434698E12, 0.15], [1.73434668E12, 0.26666666666666666], [1.73434656E12, 0.15], [1.73434722E12, 0.05], [1.73434662E12, 0.23333333333333334], [1.73434692E12, 0.25], [1.7343468E12, 0.21666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434686E12, 0.25], [1.73434716E12, 0.16666666666666666], [1.73434674E12, 0.23333333333333334], [1.73434704E12, 0.25], [1.7343471E12, 0.21666666666666667]], "isOverall": false, "label": "Get SR Access Token-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.08333333333333333], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.16666666666666666], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.05]], "isOverall": false, "label": "Get user key gen result-0-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.03333333333333333], [1.7343465E12, 0.1], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Invite sr-success", "isController": false}, {"data": [[1.73434698E12, 0.15], [1.73434668E12, 0.26666666666666666], [1.73434656E12, 0.15], [1.73434722E12, 0.05], [1.73434662E12, 0.23333333333333334], [1.73434692E12, 0.25], [1.7343468E12, 0.21666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434686E12, 0.25], [1.73434716E12, 0.16666666666666666], [1.73434674E12, 0.23333333333333334], [1.73434704E12, 0.25], [1.7343471E12, 0.21666666666666667]], "isOverall": false, "label": "Get SR Access Token-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.08333333333333333], [1.7343465E12, 0.06666666666666667], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "User creation(SR side)-success", "isController": true}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.05], [1.7343465E12, 0.08333333333333333], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Generate sr keys-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.03333333333333333], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.1], [1.73434656E12, 0.08333333333333333], [1.73434674E12, 0.08333333333333333], [1.73434704E12, 0.2], [1.7343471E12, 0.05], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Login by user OS-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.03333333333333333], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.1], [1.73434656E12, 0.08333333333333333], [1.73434674E12, 0.08333333333333333], [1.73434704E12, 0.2], [1.7343471E12, 0.05], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Get OS user Access Token-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.08333333333333333], [1.73434656E12, 0.06666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.15], [1.7343471E12, 0.1], [1.73434662E12, 0.06666666666666667], [1.73434692E12, 0.06666666666666667]], "isOverall": false, "label": "Link user profile-success", "isController": false}, {"data": [[1.7343468E12, 0.15], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.16666666666666666], [1.73434686E12, 0.18333333333333332], [1.73434716E12, 0.016666666666666666], [1.73434656E12, 0.13333333333333333], [1.73434674E12, 0.13333333333333333], [1.73434704E12, 0.3333333333333333], [1.7343471E12, 0.18333333333333332], [1.73434662E12, 0.15], [1.73434692E12, 0.15]], "isOverall": false, "label": "Verify link-0-success", "isController": false}, {"data": [[1.7343468E12, 0.06666666666666667], [1.73434698E12, 0.06666666666666667], [1.73434668E12, 0.08333333333333333], [1.73434686E12, 0.05], [1.73434716E12, 0.11666666666666667], [1.73434722E12, 0.11666666666666667], [1.73434674E12, 0.06666666666666667], [1.73434704E12, 0.08333333333333333], [1.7343471E12, 0.08333333333333333], [1.73434662E12, 0.05], [1.73434692E12, 0.05]], "isOverall": false, "label": "Dry Run Policy-0-success", "isController": false}, {"data": [[1.7343468E12, 0.1], [1.73434698E12, 0.06666666666666667], [1.7343465E12, 0.06666666666666667], [1.73434668E12, 0.1], [1.73434686E12, 0.1], [1.73434656E12, 0.1], [1.73434674E12, 0.1], [1.73434662E12, 0.1], [1.73434692E12, 0.1]], "isOverall": false, "label": "Link SR profile-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73434722E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.95, "minX": 1.7343465E12, "maxY": 16.45, "series": [{"data": [[1.73434698E12, 15.4], [1.73434668E12, 12.75], [1.73434656E12, 8.833333333333334], [1.73434722E12, 0.95], [1.73434662E12, 11.25], [1.73434692E12, 16.45], [1.7343468E12, 14.183333333333334], [1.7343465E12, 3.75], [1.73434686E12, 15.65], [1.73434716E12, 3.8333333333333335], [1.73434674E12, 13.15], [1.73434704E12, 14.283333333333333], [1.7343471E12, 8.033333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73434722E12, "title": "Total Transactions Per Second"}},
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
