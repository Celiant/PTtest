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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 373.0, "series": [{"data": [[0.0, 50.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 4.0], [2600.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [3500.0, 1.0], [900.0, 31.0], [3600.0, 2.0], [1000.0, 7.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 25.0], [600.0, 2.0], [1300.0, 1.0], [700.0, 5.0], [1400.0, 1.0], [200.0, 47.0], [400.0, 8.0], [800.0, 3.0], [3200.0, 1.0], [900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[4100.0, 1.0], [600.0, 1.0], [9600.0, 1.0], [700.0, 37.0], [2900.0, 1.0], [12400.0, 1.0], [800.0, 5.0], [1600.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[300.0, 5.0], [700.0, 41.0], [200.0, 44.0], [800.0, 6.0], [900.0, 2.0], [1000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[300.0, 7.0], [600.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [3100.0, 1.0], [200.0, 28.0], [800.0, 2.0], [400.0, 5.0], [900.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[600.0, 1.0], [300.0, 29.0], [200.0, 10.0], [400.0, 6.0], [500.0, 4.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[300.0, 8.0], [600.0, 1.0], [700.0, 2.0], [200.0, 34.0], [400.0, 3.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[2500.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3400.0, 1.0], [900.0, 29.0], [1000.0, 8.0], [4200.0, 1.0], [1100.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 2.0], [8100.0, 1.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[8700.0, 1.0], [8500.0, 2.0], [8300.0, 1.0], [8900.0, 1.0], [9000.0, 1.0], [9300.0, 1.0], [9500.0, 1.0], [10300.0, 2.0], [10500.0, 1.0], [11100.0, 1.0], [12000.0, 1.0], [12500.0, 1.0], [13300.0, 1.0], [14600.0, 1.0], [14700.0, 1.0], [15300.0, 1.0], [15800.0, 1.0], [16300.0, 1.0], [16200.0, 1.0], [17300.0, 1.0], [16600.0, 1.0], [19400.0, 1.0], [19900.0, 2.0], [20000.0, 1.0], [20600.0, 2.0], [22200.0, 1.0], [21800.0, 1.0], [22800.0, 1.0], [24600.0, 1.0], [26600.0, 2.0], [25800.0, 1.0], [27100.0, 1.0], [28900.0, 1.0], [29300.0, 1.0], [29800.0, 1.0], [30200.0, 1.0], [34300.0, 1.0], [45500.0, 1.0], [46600.0, 1.0], [52900.0, 1.0], [64300.0, 1.0], [70200.0, 1.0], [79200.0, 1.0], [100300.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1100.0, 16.0], [1200.0, 11.0], [1300.0, 5.0], [1400.0, 4.0], [1500.0, 2.0], [1600.0, 3.0], [1800.0, 1.0], [1900.0, 2.0], [1000.0, 6.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[600.0, 4.0], [10100.0, 1.0], [700.0, 32.0], [12100.0, 1.0], [800.0, 8.0], [900.0, 10.0], [15100.0, 1.0], [1000.0, 7.0], [18300.0, 1.0], [1100.0, 2.0], [1200.0, 3.0], [1300.0, 1.0], [1400.0, 1.0], [1700.0, 3.0], [2000.0, 1.0], [2100.0, 5.0], [2300.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [200.0, 191.0], [3200.0, 1.0], [3800.0, 1.0], [3900.0, 1.0], [4100.0, 2.0], [300.0, 60.0], [5600.0, 1.0], [400.0, 10.0], [6400.0, 5.0], [6500.0, 2.0], [500.0, 15.0]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[4300.0, 1.0], [300.0, 9.0], [600.0, 1.0], [2800.0, 1.0], [700.0, 5.0], [200.0, 28.0], [400.0, 2.0], [800.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[600.0, 14.0], [1300.0, 2.0], [700.0, 5.0], [800.0, 1.0], [900.0, 3.0], [500.0, 25.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[600.0, 17.0], [700.0, 6.0], [800.0, 5.0], [900.0, 2.0], [1000.0, 3.0], [1100.0, 1.0], [1200.0, 2.0], [1400.0, 2.0], [1500.0, 2.0], [6800.0, 1.0], [6700.0, 1.0], [7200.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[2200.0, 1.0], [700.0, 20.0], [800.0, 4.0], [200.0, 9.0], [3300.0, 1.0], [900.0, 4.0], [300.0, 3.0], [18800.0, 1.0], [400.0, 2.0], [1700.0, 1.0], [1900.0, 1.0], [7800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[300.0, 11.0], [700.0, 1.0], [200.0, 34.0], [800.0, 1.0], [400.0, 1.0], [2000.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[300.0, 19.0], [700.0, 2.0], [200.0, 20.0], [400.0, 5.0], [500.0, 4.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[0.0, 49.0], [100.0, 1.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[33000.0, 1.0], [33800.0, 1.0], [33300.0, 2.0], [32900.0, 1.0], [33200.0, 2.0], [33400.0, 1.0], [33500.0, 1.0], [34200.0, 2.0], [34500.0, 2.0], [34800.0, 1.0], [33600.0, 1.0], [33900.0, 1.0], [35500.0, 1.0], [35600.0, 2.0], [35300.0, 1.0], [35200.0, 1.0], [35700.0, 1.0], [36800.0, 1.0], [37600.0, 1.0], [43400.0, 1.0], [44100.0, 1.0], [45300.0, 1.0], [45700.0, 2.0], [45200.0, 1.0], [48200.0, 1.0], [47900.0, 1.0], [47200.0, 1.0], [47400.0, 1.0], [47700.0, 1.0], [48700.0, 1.0], [47600.0, 1.0], [50100.0, 1.0], [50500.0, 2.0], [50300.0, 1.0], [49400.0, 1.0], [50400.0, 1.0], [51800.0, 1.0], [52600.0, 1.0], [54300.0, 1.0], [53900.0, 1.0], [56300.0, 1.0], [55400.0, 1.0], [61400.0, 1.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[8600.0, 1.0], [8400.0, 1.0], [9000.0, 1.0], [9200.0, 1.0], [8800.0, 2.0], [9600.0, 1.0], [9300.0, 1.0], [9800.0, 1.0], [10600.0, 2.0], [10800.0, 1.0], [11400.0, 1.0], [12300.0, 1.0], [12800.0, 1.0], [13600.0, 1.0], [14900.0, 1.0], [15000.0, 1.0], [15600.0, 1.0], [16000.0, 1.0], [16500.0, 2.0], [16900.0, 1.0], [17600.0, 1.0], [20200.0, 1.0], [20000.0, 1.0], [20400.0, 2.0], [20900.0, 1.0], [22200.0, 1.0], [21600.0, 1.0], [23000.0, 1.0], [23500.0, 1.0], [24800.0, 1.0], [26100.0, 1.0], [26800.0, 1.0], [27300.0, 1.0], [26900.0, 1.0], [29200.0, 1.0], [29500.0, 1.0], [30100.0, 1.0], [30600.0, 1.0], [34500.0, 1.0], [45800.0, 1.0], [46900.0, 1.0], [53200.0, 1.0], [64900.0, 1.0], [70400.0, 1.0], [79500.0, 1.0], [100600.0, 1.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 1.0], [700.0, 6.0], [200.0, 50.0], [800.0, 2.0], [900.0, 1.0], [1000.0, 2.0], [1100.0, 1.0], [300.0, 13.0], [1300.0, 1.0], [1400.0, 1.0], [400.0, 10.0], [6500.0, 1.0], [6900.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[10900.0, 1.0], [12400.0, 1.0], [15000.0, 1.0], [15800.0, 3.0], [21100.0, 1.0], [21900.0, 1.0], [27900.0, 1.0], [3700.0, 1.0], [3800.0, 2.0], [3900.0, 2.0], [4000.0, 2.0], [4300.0, 1.0], [4200.0, 3.0], [4400.0, 1.0], [4500.0, 2.0], [4600.0, 2.0], [4800.0, 3.0], [4700.0, 2.0], [5000.0, 4.0], [4900.0, 1.0], [5100.0, 1.0], [5300.0, 3.0], [5600.0, 2.0], [5400.0, 2.0], [5500.0, 1.0], [5800.0, 2.0], [5700.0, 2.0], [5900.0, 1.0], [6400.0, 1.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[15300.0, 1.0], [15200.0, 1.0], [15500.0, 4.0], [15600.0, 3.0], [15700.0, 2.0], [15800.0, 1.0], [15900.0, 3.0], [16300.0, 1.0], [16200.0, 1.0], [16600.0, 1.0], [16900.0, 2.0], [16500.0, 1.0], [17400.0, 2.0], [18200.0, 2.0], [17500.0, 1.0], [18900.0, 1.0], [18500.0, 1.0], [19200.0, 2.0], [18800.0, 1.0], [18700.0, 1.0], [19800.0, 1.0], [21200.0, 1.0], [26600.0, 1.0], [26300.0, 1.0], [27100.0, 1.0], [27900.0, 1.0], [27800.0, 1.0], [28200.0, 1.0], [29400.0, 1.0], [29100.0, 1.0], [28900.0, 1.0], [30100.0, 1.0], [31100.0, 1.0], [30800.0, 1.0], [32100.0, 1.0], [33900.0, 1.0], [35100.0, 1.0], [37300.0, 1.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[2100.0, 3.0], [2000.0, 97.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[2100.0, 1.0], [2000.0, 49.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[0.0, 49.0], [100.0, 1.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[0.0, 49.0], [100.0, 1.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[16200.0, 1.0], [16800.0, 2.0], [21300.0, 1.0], [23300.0, 1.0], [25600.0, 1.0], [3600.0, 3.0], [3800.0, 1.0], [4000.0, 1.0], [4300.0, 6.0], [4100.0, 3.0], [4500.0, 3.0], [4600.0, 2.0], [4400.0, 3.0], [4800.0, 2.0], [4900.0, 5.0], [5100.0, 1.0], [5300.0, 2.0], [5200.0, 1.0], [5400.0, 1.0], [5500.0, 1.0], [5600.0, 1.0], [5800.0, 1.0], [6000.0, 2.0], [5900.0, 1.0], [6200.0, 1.0], [6400.0, 1.0], [6500.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[14600.0, 1.0], [14500.0, 2.0], [14700.0, 3.0], [14800.0, 1.0], [14400.0, 1.0], [15200.0, 2.0], [14900.0, 3.0], [15300.0, 3.0], [15700.0, 5.0], [15500.0, 4.0], [15400.0, 1.0], [16000.0, 3.0], [16300.0, 2.0], [16100.0, 1.0], [16200.0, 1.0], [16500.0, 1.0], [16400.0, 4.0], [17300.0, 2.0], [23100.0, 1.0], [22700.0, 1.0], [23600.0, 1.0], [26500.0, 1.0], [26400.0, 1.0], [28500.0, 1.0], [27700.0, 1.0], [32600.0, 1.0], [31800.0, 1.0], [38600.0, 1.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 326.0], [100.0, 6.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[0.0, 100.0], [100.0, 1.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[0.0, 97.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[2400.0, 47.0], [2500.0, 2.0], [2600.0, 1.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[2000.0, 50.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[0.0, 49.0], [100.0, 1.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[0.0, 149.0], [100.0, 1.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[12600.0, 1.0], [12900.0, 1.0], [13600.0, 1.0], [14600.0, 1.0], [15300.0, 1.0], [15100.0, 2.0], [15500.0, 1.0], [15700.0, 1.0], [17300.0, 2.0], [16700.0, 1.0], [18300.0, 1.0], [18600.0, 1.0], [19400.0, 1.0], [21500.0, 1.0], [21400.0, 1.0], [21000.0, 2.0], [24500.0, 1.0], [23700.0, 1.0], [25300.0, 1.0], [25200.0, 2.0], [24800.0, 1.0], [25700.0, 1.0], [27600.0, 2.0], [28400.0, 1.0], [29200.0, 1.0], [30600.0, 1.0], [31500.0, 1.0], [32100.0, 1.0], [31900.0, 1.0], [32900.0, 1.0], [33800.0, 2.0], [34400.0, 1.0], [34700.0, 1.0], [38400.0, 1.0], [40200.0, 1.0], [41200.0, 1.0], [47400.0, 1.0], [50300.0, 1.0], [50500.0, 1.0], [59400.0, 1.0], [70100.0, 1.0], [74800.0, 1.0], [85400.0, 1.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[2100.0, 1.0], [2200.0, 2.0], [1500.0, 4.0], [1600.0, 20.0], [1700.0, 10.0], [1800.0, 6.0], [1900.0, 6.0], [2000.0, 1.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[8300.0, 1.0], [8500.0, 1.0], [8600.0, 1.0], [9200.0, 1.0], [10500.0, 1.0], [15600.0, 1.0], [15900.0, 1.0], [17200.0, 1.0], [16400.0, 1.0], [17100.0, 1.0], [18200.0, 1.0], [17500.0, 1.0], [18700.0, 1.0], [18500.0, 1.0], [19500.0, 1.0], [20400.0, 1.0], [20100.0, 1.0], [21400.0, 1.0], [23200.0, 1.0], [24400.0, 1.0], [26600.0, 1.0], [4600.0, 1.0], [4500.0, 1.0], [4800.0, 1.0], [4900.0, 5.0], [5000.0, 3.0], [5100.0, 1.0], [5200.0, 2.0], [5300.0, 1.0], [5500.0, 1.0], [5600.0, 1.0], [5800.0, 1.0], [5900.0, 1.0], [6200.0, 1.0], [6300.0, 1.0], [6700.0, 2.0], [6800.0, 1.0], [7600.0, 2.0], [7800.0, 1.0], [8100.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[600.0, 13.0], [700.0, 3.0], [800.0, 1.0], [900.0, 2.0], [500.0, 30.0], [1000.0, 1.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[2600.0, 1.0], [2800.0, 10.0], [2700.0, 10.0], [2900.0, 9.0], [3000.0, 5.0], [3100.0, 3.0], [3200.0, 2.0], [3300.0, 2.0], [3400.0, 2.0], [3500.0, 2.0], [3600.0, 1.0], [3700.0, 2.0], [4100.0, 1.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1100.0, 2.0], [4400.0, 1.0], [1200.0, 4.0], [10300.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [13000.0, 1.0], [1700.0, 2.0], [900.0, 29.0], [1000.0, 7.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[2300.0, 3.0], [600.0, 3.0], [2400.0, 1.0], [700.0, 37.0], [2800.0, 1.0], [3100.0, 1.0], [200.0, 157.0], [800.0, 15.0], [13800.0, 1.0], [900.0, 5.0], [15300.0, 1.0], [1000.0, 1.0], [1100.0, 2.0], [300.0, 69.0], [1200.0, 2.0], [1300.0, 1.0], [5600.0, 1.0], [1500.0, 2.0], [400.0, 16.0], [6400.0, 1.0], [1600.0, 2.0], [6800.0, 1.0], [500.0, 9.0]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[2100.0, 4.0], [2000.0, 53.0]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[0.0, 49.0], [100.0, 1.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[2400.0, 38.0], [2500.0, 11.0], [2600.0, 1.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[0.0, 373.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[17000.0, 1.0], [10700.0, 11.0], [10600.0, 32.0], [10800.0, 2.0], [12600.0, 1.0], [12700.0, 3.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[600.0, 1.0], [700.0, 26.0], [800.0, 11.0], [200.0, 32.0], [900.0, 5.0], [1000.0, 2.0], [1100.0, 2.0], [300.0, 12.0], [1300.0, 1.0], [6400.0, 1.0], [400.0, 2.0], [6700.0, 1.0], [1800.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[300.0, 21.0], [600.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [200.0, 107.0], [400.0, 9.0], [800.0, 4.0], [6800.0, 1.0], [900.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[10600.0, 47.0], [10700.0, 2.0], [10800.0, 1.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[600.0, 15.0], [1200.0, 1.0], [1300.0, 1.0], [700.0, 4.0], [800.0, 2.0], [900.0, 2.0], [500.0, 24.0], [1000.0, 1.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[0.0, 57.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[0.0, 49.0], [100.0, 1.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 100600.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 3927.0, "series": [{"data": [[0.0, 3927.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 750.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 648.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [[3.0, 2.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.73373672E12, "maxY": 34.25201938610662, "series": [{"data": [[1.73373672E12, 1.0]], "isOverall": false, "label": "Tenant creation", "isController": false}, {"data": [[1.73373684E12, 11.540441176470585], [1.7337375E12, 16.477272727272727], [1.73373744E12, 22.221932114882502], [1.73373714E12, 34.054635761589424], [1.73373756E12, 11.388888888888884], [1.73373726E12, 33.89387755102044], [1.7337372E12, 34.25201938610662], [1.7337369E12, 17.440886699507402], [1.73373732E12, 30.51822916666665], [1.73373702E12, 28.62745098039216], [1.73373696E12, 23.29268292682927], [1.73373762E12, 7.999999999999997], [1.73373708E12, 31.810902896081775], [1.73373678E12, 5.666666666666667], [1.73373768E12, 2.0], [1.73373672E12, 1.0], [1.73373738E12, 26.919037199124745]], "isOverall": false, "label": "Full Dry Run Flow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73373768E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 100604.0, "series": [{"data": [[2.0, 1.0], [32.0, 2.5], [33.0, 2.0], [34.0, 2.6666666666666665], [35.0, 3.5], [36.0, 1.0], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 1.0], [9.0, 0.0], [10.0, 1.0], [11.0, 0.0], [12.0, 1.0], [13.0, 0.0], [14.0, 1.0], [15.0, 1.0], [1.0, 1.0], [16.0, 1.0], [17.0, 1.0], [18.0, 0.0], [19.0, 2.0], [20.0, 1.0], [21.0, 3.0], [22.0, 2.0], [23.0, 1.0], [24.0, 1.0], [25.0, 15.0], [26.0, 1.0], [27.0, 2.0], [28.0, 1.0], [29.0, 2.0], [30.0, 2.5], [31.0, 1.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[22.720000000000002, 1.98]], "isOverall": false, "label": "Invite user-0-Aggregated", "isController": false}, {"data": [[32.0, 1494.6666666666667], [33.0, 2120.1428571428573], [35.0, 974.5], [34.0, 1059.6], [36.0, 1350.0], [6.0, 1105.0], [7.0, 997.0], [8.0, 1007.0], [9.0, 915.0], [10.0, 937.0], [11.0, 1020.0], [12.0, 979.0], [13.0, 958.0], [14.0, 1152.0], [15.0, 1164.0], [16.0, 1066.0], [17.0, 948.0], [18.0, 943.0], [20.0, 983.5], [21.0, 959.0], [22.0, 976.0], [23.0, 972.0], [24.0, 1044.0], [25.0, 959.0], [26.0, 934.0], [27.0, 968.0], [28.0, 947.0], [29.0, 973.5], [30.0, 928.0], [31.0, 1764.5]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[25.700000000000003, 1222.82]], "isOverall": false, "label": "WS open for sr link-Aggregated", "isController": false}, {"data": [[32.0, 475.6666666666667], [33.0, 700.1818181818181], [34.0, 300.7142857142857], [35.0, 333.0833333333333], [36.0, 276.5], [5.0, 290.0], [6.0, 269.0], [7.0, 297.0], [8.0, 318.0], [9.0, 265.0], [10.0, 281.0], [11.0, 334.0], [12.0, 279.0], [13.0, 439.0], [14.0, 432.0], [15.0, 299.0], [16.0, 515.0], [17.0, 320.0], [18.0, 331.3333333333333], [19.0, 294.5], [20.0, 262.5], [21.0, 288.0], [22.0, 402.6666666666667], [23.0, 321.0], [24.0, 354.5], [25.0, 449.0], [26.0, 299.8], [27.0, 287.0], [28.0, 432.75], [29.0, 385.8333333333333], [30.0, 502.2], [31.0, 1261.6]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[26.5, 435.4400000000001]], "isOverall": false, "label": "Agree terms-Aggregated", "isController": false}, {"data": [[32.0, 703.5], [33.0, 1680.1666666666667], [34.0, 785.7500000000001], [35.0, 775.25], [36.0, 898.5], [7.0, 734.0], [8.0, 725.0], [9.0, 778.0], [10.0, 735.0], [11.0, 751.0], [12.0, 742.0], [13.0, 839.0], [15.0, 883.0], [16.0, 729.0], [17.0, 757.0], [18.0, 701.0], [19.0, 739.0], [21.0, 757.0], [22.0, 800.5], [23.0, 734.0], [24.0, 750.0], [25.0, 755.0], [26.0, 748.0], [27.0, 821.0], [28.0, 737.0], [29.0, 766.5], [30.0, 761.0], [31.0, 7911.666666666666]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[26.3, 1312.0000000000002]], "isOverall": false, "label": "Link SR profile-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 0.5], [33.0, 1.3333333333333333], [34.0, 3.0], [35.0, 4.25], [36.0, 1.0], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 0.0], [9.0, 1.0], [10.0, 0.0], [11.0, 1.0], [12.0, 1.0], [13.0, 0.0], [14.0, 2.0], [15.0, 2.0], [1.0, 1.0], [16.0, 1.0], [17.0, 2.0], [18.0, 2.0], [19.0, 1.0], [20.0, 1.0], [21.0, 8.0], [22.0, 2.0], [23.0, 2.0], [24.0, 2.0], [25.0, 0.0], [26.0, 1.0], [27.0, 2.0], [28.0, 2.0], [29.0, 2.0], [30.0, 2.0], [31.0, 8.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[22.760000000000005, 2.2199999999999998]], "isOverall": false, "label": "Invite sr-0-Aggregated", "isController": false}, {"data": [[32.0, 1.3333333333333335], [33.0, 3.0], [34.0, 3.0], [35.0, 2.2], [36.0, 7.0], [15.0, 10.0], [18.0, 5.333333333333333], [19.0, 3.5], [21.0, 6.5], [22.0, 3.0], [23.0, 2.5], [24.0, 3.0], [25.0, 3.6666666666666665], [26.0, 2.0], [27.0, 2.0], [28.0, 3.0], [29.0, 2.75], [30.0, 1.5], [31.0, 3.2]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[27.700000000000006, 3.1999999999999997]], "isOverall": false, "label": "Link user profile-0-Aggregated", "isController": false}, {"data": [[32.0, 26.75], [33.0, 4.666666666666667], [34.0, 3.6666666666666665], [35.0, 2.5], [36.0, 4.0], [11.0, 6.0], [15.0, 6.142857142857142], [18.0, 2.0], [19.0, 1.0], [22.0, 3.4], [24.0, 2.0], [25.0, 2.3333333333333335], [26.0, 2.75], [27.0, 2.5], [29.0, 3.0], [30.0, 3.5], [31.0, 2.5]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[26.5, 5.38]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[2.0, 492.5], [32.0, 457.6], [33.0, 542.8], [34.0, 497.1666666666667], [35.0, 534.3125], [36.0, 507.0], [3.0, 492.0], [4.0, 504.5], [5.0, 481.5], [6.0, 533.5], [7.0, 481.0], [8.0, 512.5], [9.0, 488.5], [10.0, 490.0], [11.0, 502.0], [12.0, 505.5], [13.0, 627.5], [14.0, 548.5], [15.0, 623.5], [1.0, 426.6666666666667], [16.0, 544.5], [17.0, 486.0], [18.0, 560.0], [19.0, 479.5], [20.0, 512.0], [21.0, 689.0], [22.0, 500.5], [23.0, 533.5], [24.0, 521.0], [25.0, 500.0], [26.0, 493.0], [27.0, 480.0], [28.0, 538.5], [29.0, 485.5], [30.0, 512.5], [31.0, 526.75]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[22.53465346534653, 516.8019801980196]], "isOverall": false, "label": "Get Admin Access Token-Aggregated", "isController": false}, {"data": [[32.0, 2.3333333333333335], [33.0, 3.0], [34.0, 2.2857142857142856], [35.0, 2.6666666666666665], [36.0, 3.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 2.0], [11.0, 0.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 0.0], [16.0, 3.0], [17.0, 1.0], [18.0, 1.0], [19.0, 8.0], [20.0, 1.5], [21.0, 2.6], [22.0, 2.0], [23.0, 3.3333333333333335], [24.0, 2.75], [25.0, 3.0], [26.0, 3.6], [27.0, 1.5], [28.0, 2.25], [29.0, 2.833333333333333], [30.0, 2.0], [31.0, 3.8]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[26.5, 2.5499999999999994]], "isOverall": false, "label": "Agree terms-0-Aggregated", "isController": false}, {"data": [[32.0, 288.75], [33.0, 1042.3333333333333], [34.0, 352.6666666666667], [35.0, 359.5], [36.0, 264.0], [11.0, 255.0], [15.0, 335.0], [18.0, 474.0], [19.0, 520.0], [22.0, 274.8], [24.0, 366.0], [25.0, 272.0], [26.0, 264.25], [27.0, 490.0], [29.0, 272.0], [30.0, 599.0], [31.0, 1333.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[26.5, 456.94000000000005]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[2.0, 535.0], [32.0, 325.5], [33.0, 332.3333333333333], [34.0, 392.3333333333333], [35.0, 379.375], [36.0, 284.0], [3.0, 300.0], [4.0, 591.0], [5.0, 341.0], [6.0, 306.0], [7.0, 570.0], [8.0, 281.0], [9.0, 369.0], [10.0, 386.0], [11.0, 387.0], [12.0, 293.0], [13.0, 305.0], [14.0, 386.0], [15.0, 396.0], [1.0, 616.0], [16.0, 390.0], [17.0, 279.0], [18.0, 256.0], [19.0, 347.0], [20.0, 426.0], [21.0, 270.0], [22.0, 278.0], [23.0, 373.0], [24.0, 355.0], [25.0, 334.0], [26.0, 428.0], [27.0, 326.0], [28.0, 396.0], [29.0, 375.0], [30.0, 345.0], [31.0, 453.5]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[22.760000000000005, 372.71999999999997]], "isOverall": false, "label": "Invite sr-Aggregated", "isController": false}, {"data": [[32.0, 2043.0], [33.0, 2049.2], [34.0, 2047.0], [35.0, 2049.6], [36.0, 2045.0], [15.0, 2055.0], [16.0, 2044.0], [17.0, 2051.0], [18.0, 2045.0], [20.0, 2048.0], [21.0, 2045.0], [22.0, 2058.0], [23.0, 2037.0], [24.0, 2032.0], [25.0, 2043.25], [26.0, 2048.5], [27.0, 2047.0], [28.0, 2045.0], [29.0, 2039.75], [30.0, 2044.0], [31.0, 2042.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[28.18, 2045.72]], "isOverall": false, "label": "Generate user keys-Aggregated", "isController": false}, {"data": [[2.0, 2053.0], [32.0, 2045.0], [33.0, 2048.0], [34.0, 2050.0], [35.0, 2048.5], [36.0, 2048.0], [3.0, 2042.0], [4.0, 2056.0], [5.0, 2040.0], [6.0, 2039.0], [7.0, 2041.0], [8.0, 2040.0], [9.0, 2037.0], [10.0, 2041.0], [11.0, 2032.0], [12.0, 2055.0], [13.0, 2047.0], [15.0, 2044.5], [1.0, 2049.0], [16.0, 2043.0], [17.0, 2035.0], [18.0, 2038.0], [19.0, 2045.0], [20.0, 2041.0], [21.0, 2037.0], [22.0, 2048.0], [23.0, 2041.0], [24.0, 2057.0], [25.0, 2057.0], [26.0, 2049.0], [27.0, 2039.0], [29.0, 2042.3333333333333], [30.0, 2044.5], [31.0, 2042.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[22.66, 2045.4399999999998]], "isOverall": false, "label": "Generate sr keys-Aggregated", "isController": false}, {"data": [[33.0, 430.75], [34.0, 285.0], [35.0, 293.7142857142857], [36.0, 275.0], [9.0, 364.0], [10.0, 263.0], [13.0, 401.0], [14.0, 282.0], [15.0, 254.6], [18.0, 473.0], [19.0, 324.0], [5.0, 252.0], [21.0, 259.0], [22.0, 286.0], [24.0, 282.0], [26.0, 244.66666666666666], [28.0, 300.0], [29.0, 297.6666666666667], [30.0, 576.0], [31.0, 1128.5]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[24.05999999999999, 349.82000000000005]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[1.0, 1710.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.0, 1710.0]], "isOverall": false, "label": "Tenant creation flow-Aggregated", "isController": true}, {"data": [[2.0, 1.0], [32.0, 1.25], [33.0, 1.0], [34.0, 1.1], [35.0, 1.2222222222222223], [36.0, 1.6666666666666667], [3.0, 0.0], [4.0, 0.0], [5.0, 1.0], [6.0, 0.0], [7.0, 1.0], [8.0, 0.0], [9.0, 1.0], [10.0, 0.0], [11.0, 1.0], [12.0, 0.0], [13.0, 0.0], [14.0, 1.0], [15.0, 0.5], [1.0, 0.0], [16.0, 0.0], [17.0, 1.0], [18.0, 1.0], [19.0, 0.5], [20.0, 0.0], [21.0, 0.5], [22.0, 1.0], [23.0, 1.0], [24.0, 0.5], [25.0, 18.4], [26.0, 23.0], [27.0, 1.0], [28.0, 6.5], [29.0, 3.25], [30.0, 0.75], [31.0, 1.7142857142857144]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[25.260000000000012, 2.8900000000000006]], "isOverall": false, "label": "Get Access Token-0-Aggregated", "isController": false}, {"data": [[32.0, 995.5], [33.0, 3436.0], [34.0, 1104.0], [35.0, 1032.0], [36.0, 972.0], [11.0, 951.0], [15.0, 1058.5], [16.0, 1292.0], [18.0, 1419.0], [19.0, 2942.0], [22.0, 957.2], [24.0, 968.0], [25.0, 985.3333333333334], [26.0, 969.3333333333334], [27.0, 1031.0], [29.0, 967.0], [30.0, 1050.0], [31.0, 3488.25]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[26.52, 1407.22]], "isOverall": false, "label": "WS open for policy import-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [32.0, 1.3333333333333333], [33.0, 1.0], [34.0, 1.4285714285714286], [35.0, 1.25], [36.0, 1.0], [3.0, 0.0], [4.0, 0.0], [5.0, 0.0], [6.0, 0.0], [7.0, 0.0], [8.0, 1.0], [9.0, 0.0], [10.0, 1.0], [11.0, 0.0], [12.0, 1.0], [13.0, 2.0], [15.0, 0.0], [1.0, 0.0], [16.0, 1.0], [17.0, 1.0], [18.0, 0.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 1.0], [23.0, 1.0], [24.0, 1.0], [25.0, 0.0], [26.0, 1.0], [27.0, 1.0], [29.0, 0.6666666666666666], [30.0, 0.5], [31.0, 1.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[22.66, 0.82]], "isOverall": false, "label": "Generate sr keys-0-Aggregated", "isController": false}, {"data": [[33.0, 21137.5], [32.0, 21380.5], [2.0, 70224.0], [34.0, 15871.25], [35.0, 18071.500000000004], [36.0, 29853.0], [3.0, 64374.0], [4.0, 29314.0], [5.0, 24644.0], [6.0, 16656.0], [7.0, 100300.0], [8.0, 20679.0], [9.0, 79273.0], [10.0, 15815.0], [11.0, 52947.0], [12.0, 12092.0], [13.0, 10565.0], [14.0, 16263.0], [15.0, 16344.0], [16.0, 45586.0], [1.0, 46657.0], [17.0, 9581.0], [18.0, 17389.0], [19.0, 26651.0], [20.0, 10397.0], [21.0, 10387.0], [22.0, 14752.0], [23.0, 8148.0], [24.0, 34317.0], [25.0, 25822.0], [26.0, 9081.0], [27.0, 15396.0], [28.0, 8589.0], [29.0, 30221.0], [30.0, 8586.5], [31.0, 17692.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[22.779999999999994, 24359.34]], "isOverall": false, "label": "Dry Run Policy-Aggregated", "isController": false}, {"data": [[2.0, 1338.0], [32.0, 1392.5], [33.0, 1190.5], [34.0, 1461.5], [35.0, 1471.5714285714284], [36.0, 1083.0], [3.0, 1241.0], [4.0, 1122.0], [5.0, 1113.0], [6.0, 1065.0], [7.0, 1132.0], [8.0, 1559.0], [9.0, 1080.0], [10.0, 1123.0], [11.0, 1217.0], [12.0, 1210.0], [13.0, 1097.0], [14.0, 1667.0], [15.0, 1110.0], [1.0, 1110.0], [16.0, 1254.0], [17.0, 1123.0], [18.0, 1099.0], [19.0, 1097.0], [20.0, 1120.0], [21.0, 1536.0], [22.0, 1107.0], [23.0, 1140.0], [24.0, 1305.0], [25.0, 1185.0], [26.0, 1225.0], [27.0, 1114.0], [28.0, 1432.0], [29.0, 1111.0], [30.0, 1265.6666666666667], [31.0, 1612.5]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[22.68, 1289.0]], "isOverall": false, "label": "Invite and accept user-Aggregated", "isController": true}, {"data": [[32.0, 385.6923076923077], [33.0, 889.2199999999998], [34.0, 397.26666666666665], [35.0, 364.968253968254], [36.0, 534.2], [9.0, 263.0], [10.0, 285.5], [11.0, 288.6666666666667], [12.0, 326.3333333333333], [13.0, 265.75], [14.0, 288.5], [15.0, 398.5], [16.0, 266.0], [17.0, 269.0], [18.0, 274.25], [19.0, 276.0], [20.0, 303.5], [21.0, 267.5], [22.0, 386.6], [23.0, 323.75], [24.0, 305.5], [25.0, 290.2], [26.0, 319.11111111111114], [27.0, 275.44444444444446], [28.0, 420.125], [29.0, 414.0384615384616], [30.0, 475.76470588235287], [31.0, 2960.4800000000005]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[29.943699731903475, 792.5844504021446]], "isOverall": false, "label": "Get SR link result-Aggregated", "isController": false}, {"data": [[32.0, 267.5], [33.0, 553.75], [35.0, 297.8], [34.0, 279.5], [36.0, 339.0], [17.0, 319.0], [18.0, 282.0], [19.0, 259.0], [20.0, 299.0], [21.0, 266.0], [22.0, 392.25], [23.0, 262.0], [24.0, 318.0], [25.0, 281.25], [26.0, 497.0], [27.0, 466.0], [28.0, 373.0], [29.0, 454.5], [30.0, 270.0], [31.0, 2179.25]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[27.939999999999994, 510.97999999999996]], "isOverall": false, "label": "Get User Access Token-Aggregated", "isController": false}, {"data": [[2.0, 563.0], [32.0, 605.0], [33.0, 601.0], [34.0, 715.25], [35.0, 862.5714285714286], [36.0, 551.0], [3.0, 572.0], [4.0, 583.0], [5.0, 542.0], [6.0, 560.0], [7.0, 577.0], [8.0, 579.0], [9.0, 565.0], [10.0, 561.0], [11.0, 558.0], [12.0, 601.0], [13.0, 564.0], [14.0, 993.0], [15.0, 586.0], [1.0, 574.0], [16.0, 631.0], [17.0, 611.0], [18.0, 557.0], [19.0, 566.0], [20.0, 552.0], [21.0, 673.0], [22.0, 537.0], [23.0, 568.0], [24.0, 700.0], [25.0, 653.0], [26.0, 592.0], [27.0, 569.0], [28.0, 848.0], [29.0, 574.0], [30.0, 645.0], [31.0, 842.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[22.68, 661.7999999999998]], "isOverall": false, "label": "Accept user-Aggregated", "isController": false}, {"data": [[32.0, 565.0], [33.0, 1387.0], [35.0, 919.0], [34.0, 594.75], [16.0, 1441.0], [17.0, 697.0], [18.0, 685.0], [19.0, 736.0], [20.0, 927.0], [21.0, 659.0], [22.0, 943.0], [23.0, 984.3333333333334], [24.0, 680.0], [25.0, 661.6], [26.0, 671.0], [27.0, 819.0], [28.0, 659.5], [29.0, 754.3333333333333], [31.0, 3511.5714285714284]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[27.779999999999998, 1186.92]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[32.0, 733.0], [33.0, 1201.0], [34.0, 439.66666666666663], [35.0, 442.0], [36.0, 736.0], [15.0, 943.0], [19.0, 808.3333333333334], [21.0, 1082.0], [22.0, 632.0], [23.0, 834.0], [24.0, 588.5], [25.0, 611.6666666666666], [26.0, 510.0], [27.0, 505.5], [28.0, 856.0], [29.0, 497.2], [30.0, 785.0], [31.0, 6353.2]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[27.820000000000004, 1271.4400000000003]], "isOverall": false, "label": "Get SR DID-Aggregated", "isController": false}, {"data": [[32.0, 286.3333333333333], [33.0, 1040.6666666666665], [34.0, 293.3333333333333], [35.0, 277.0], [36.0, 256.0], [15.0, 285.0], [18.0, 375.3333333333333], [19.0, 332.0], [21.0, 267.5], [22.0, 266.5], [23.0, 273.0], [24.0, 304.6666666666667], [25.0, 275.3333333333333], [26.0, 279.6666666666667], [27.0, 264.0], [28.0, 288.0], [29.0, 316.25], [30.0, 296.0], [31.0, 571.8]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[27.700000000000006, 366.04]], "isOverall": false, "label": "Link user profile-Aggregated", "isController": false}, {"data": [[2.0, 2047.0], [32.0, 2031.0], [33.0, 2031.0], [34.0, 2032.4], [35.0, 2036.8333333333333], [36.0, 2040.5], [3.0, 2054.0], [4.0, 2038.0], [5.0, 2039.0], [6.0, 2042.0], [7.0, 2042.0], [8.0, 2034.0], [9.0, 2054.0], [10.0, 2038.0], [11.0, 2039.0], [12.0, 2031.0], [13.0, 2034.0], [14.0, 2042.0], [15.0, 2054.0], [16.0, 2041.0], [17.0, 2032.0], [18.0, 2047.0], [19.0, 2036.0], [20.0, 2041.0], [21.0, 2033.0], [22.0, 2031.0], [23.0, 2033.0], [24.0, 2040.0], [25.0, 2036.0], [26.0, 2039.0], [27.0, 2046.0], [28.0, 2032.0], [29.0, 2032.0], [30.0, 2037.0], [31.0, 2046.5]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[23.360000000000003, 2037.9800000000005]], "isOverall": false, "label": "Get key gen result-Aggregated", "isController": false}, {"data": [[2.0, 531.0], [32.0, 529.5], [33.0, 350.0], [34.0, 415.0], [35.0, 354.75], [36.0, 263.0], [3.0, 417.0], [4.0, 281.0], [5.0, 324.0], [6.0, 259.0], [7.0, 308.0], [8.0, 721.0], [9.0, 269.0], [10.0, 302.0], [11.0, 374.0], [12.0, 355.0], [13.0, 279.0], [14.0, 391.0], [15.0, 276.0], [1.0, 283.0], [16.0, 354.0], [17.0, 272.0], [18.0, 257.0], [19.0, 272.0], [20.0, 289.0], [21.0, 312.0], [22.0, 317.0], [23.0, 269.0], [24.0, 331.0], [25.0, 280.0], [26.0, 386.0], [27.0, 308.0], [28.0, 314.0], [29.0, 295.0], [30.0, 310.0], [31.0, 451.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[22.720000000000002, 354.08000000000004]], "isOverall": false, "label": "Invite user-Aggregated", "isController": false}, {"data": [[32.0, 2.0], [33.0, 1.75], [34.0, 2.0], [35.0, 3.0], [36.0, 2.5], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 0.0], [9.0, 1.0], [10.0, 1.0], [11.0, 0.0], [12.0, 1.0], [13.0, 1.0], [14.0, 0.0], [15.0, 1.0], [16.0, 1.0], [17.0, 2.0], [18.0, 2.0], [19.0, 1.0], [20.0, 0.0], [21.0, 1.0], [22.0, 2.0], [23.0, 1.0], [24.0, 2.0], [25.0, 1.0], [26.0, 1.0], [27.0, 0.0], [28.0, 1.0], [29.0, 3.0], [30.0, 2.3333333333333335], [31.0, 1.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[23.94, 1.56]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[32.0, 2.0], [33.0, 3.0], [34.0, 1.75], [35.0, 3.0], [36.0, 5.0], [11.0, 4.0], [15.0, 4.333333333333333], [16.0, 4.0], [18.0, 3.0], [19.0, 6.0], [22.0, 26.8], [24.0, 2.0], [25.0, 1.6666666666666667], [26.0, 3.6666666666666665], [27.0, 3.3333333333333335], [29.0, 2.5], [30.0, 1.0], [31.0, 3.75]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[26.52, 5.399999999999999]], "isOverall": false, "label": "WS open for policy import-0-Aggregated", "isController": false}, {"data": [[32.0, 33610.0], [33.0, 36728.0], [34.0, 35372.0], [35.0, 34712.333333333336], [36.0, 35286.0], [11.0, 52672.0], [15.0, 48764.833333333336], [17.0, 55480.0], [18.0, 47758.0], [19.0, 47452.0], [22.0, 48667.0], [24.0, 33867.0], [25.0, 43214.333333333336], [26.0, 43505.5], [27.0, 45069.25], [29.0, 49685.666666666664], [30.0, 33966.5], [31.0, 46530.666666666664]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[26.559999999999995, 42402.680000000015]], "isOverall": false, "label": "User creation flow-Aggregated", "isController": true}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "Setup ipfs-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 1.0], [33.0, 1.0], [35.0, 1.6], [34.0, 1.0], [36.0, 1.0], [3.0, 1.0], [4.0, 0.0], [5.0, 0.0], [6.0, 0.0], [7.0, 0.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [12.0, 1.0], [13.0, 0.0], [14.0, 0.0], [15.0, 1.0], [1.0, 0.0], [16.0, 0.0], [17.0, 0.0], [18.0, 1.0], [19.0, 0.0], [20.0, 1.0], [21.0, 1.0], [22.0, 1.0], [23.0, 1.0], [24.0, 1.0], [25.0, 0.0], [26.0, 1.0], [27.0, 0.0], [28.0, 1.0], [29.0, 1.0], [30.0, 0.6666666666666666], [31.0, 1.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[22.62, 0.7999999999999999]], "isOverall": false, "label": "WS open for sr key gen-0-Aggregated", "isController": false}, {"data": [[33.0, 21758.0], [32.0, 21961.0], [2.0, 70496.0], [34.0, 16139.0], [35.0, 18383.0], [36.0, 30103.0], [3.0, 64959.0], [4.0, 29574.0], [5.0, 24888.0], [6.0, 16940.0], [7.0, 100604.0], [8.0, 20927.0], [9.0, 79521.0], [10.0, 16075.0], [11.0, 53214.0], [12.0, 12335.0], [13.0, 10820.0], [14.0, 16541.0], [15.0, 16597.0], [16.0, 45831.0], [1.0, 46907.0], [17.0, 9842.0], [18.0, 17661.0], [19.0, 26937.0], [20.0, 10635.0], [21.0, 10621.0], [22.0, 15074.0], [23.0, 8455.0], [24.0, 34589.0], [25.0, 26150.0], [26.0, 9336.0], [27.0, 15636.0], [28.0, 8852.0], [29.0, 30638.0], [30.0, 8838.5], [31.0, 18313.5]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[22.779999999999994, 24682.399999999998]], "isOverall": false, "label": "Requests for DryRun-Aggregated", "isController": true}, {"data": [[2.0, 3.0], [32.0, 2.0], [33.0, 2.0], [35.0, 2.4], [34.0, 2.0], [36.0, 2.0], [3.0, 2.0], [4.0, 1.0], [5.0, 1.0], [6.0, 2.0], [7.0, 1.0], [8.0, 2.0], [9.0, 2.0], [10.0, 2.0], [11.0, 2.0], [12.0, 2.0], [13.0, 1.0], [14.0, 1.0], [15.0, 2.0], [1.0, 1.0], [16.0, 2.0], [17.0, 1.0], [18.0, 2.0], [19.0, 1.0], [20.0, 2.0], [21.0, 2.0], [22.0, 1.0], [23.0, 2.0], [24.0, 2.0], [25.0, 2.0], [26.0, 2.0], [27.0, 1.0], [28.0, 2.0], [29.0, 2.0], [30.0, 1.6666666666666667], [31.0, 2.5]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[22.62, 1.86]], "isOverall": false, "label": "WS open for sr key gen-Aggregated", "isController": false}, {"data": [[32.0, 268.0], [33.0, 703.875], [34.0, 448.1666666666667], [35.0, 399.90000000000003], [36.0, 263.25], [12.0, 275.0], [13.0, 421.0], [15.0, 318.25], [17.0, 464.25], [18.0, 565.0], [19.0, 490.14285714285717], [21.0, 778.0], [22.0, 271.6666666666667], [23.0, 306.0], [24.0, 475.66666666666663], [25.0, 413.0], [26.0, 266.6666666666667], [27.0, 271.0], [28.0, 392.25], [29.0, 285.0], [30.0, 449.4], [31.0, 2044.3333333333333]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[27.103092783505158, 571.5257731958765]], "isOverall": false, "label": "Get user link result-Aggregated", "isController": false}, {"data": [[32.0, 1.0], [33.0, 1.8], [34.0, 1.25], [35.0, 3.4], [36.0, 1.5], [15.0, 1.0], [16.0, 1.0], [17.0, 1.0], [18.0, 0.0], [20.0, 0.0], [21.0, 1.5], [22.0, 1.0], [23.0, 1.0], [24.0, 2.0], [25.0, 1.75], [26.0, 4.75], [27.0, 1.6666666666666667], [28.0, 1.0], [29.0, 2.0], [30.0, 1.0], [31.0, 1.6]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[28.18, 1.88]], "isOverall": false, "label": "Generate user keys-0-Aggregated", "isController": false}, {"data": [[32.0, 4314.25], [33.0, 5586.0], [34.0, 4871.0], [35.0, 5021.333333333333], [36.0, 4891.0], [11.0, 5321.0], [15.0, 5789.0], [17.0, 5405.0], [18.0, 5094.0], [19.0, 4567.0], [22.0, 4592.8], [24.0, 4497.0], [25.0, 4762.0], [26.0, 12519.0], [27.0, 11426.25], [29.0, 18156.333333333332], [30.0, 4687.25], [31.0, 14715.333333333334]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[26.559999999999995, 7168.58]], "isOverall": false, "label": "Link user-Aggregated", "isController": true}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[32.0, 16773.0], [33.0, 18930.6], [34.0, 17194.0], [35.0, 18336.166666666668], [36.0, 19035.0], [14.0, 15565.0], [15.0, 15513.0], [16.0, 15624.0], [17.0, 15327.0], [18.0, 15206.0], [19.0, 15650.0], [20.0, 15709.0], [21.0, 15709.0], [22.0, 24878.0], [23.0, 15939.0], [24.0, 15537.0], [25.0, 26536.0], [26.0, 21708.5], [27.0, 26993.0], [28.0, 22279.0], [29.0, 28084.666666666668], [30.0, 15986.0], [31.0, 28352.2]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[27.960000000000004, 21206.02000000001]], "isOverall": false, "label": "User creation(SR side)-Aggregated", "isController": true}, {"data": [[2.0, 2057.0], [32.0, 2048.5], [33.0, 2041.0], [34.0, 2047.0], [35.0, 2040.2222222222222], [36.0, 2051.3333333333335], [3.0, 2048.0], [4.0, 2041.0], [5.0, 2041.0], [6.0, 2046.0], [7.0, 2044.0], [8.0, 2048.0], [9.0, 2052.0], [10.0, 2053.0], [11.0, 2061.0], [12.0, 2050.0], [13.0, 2040.0], [14.0, 2050.5], [15.0, 2056.5], [1.0, 2049.0], [16.0, 2053.5], [17.0, 2041.5], [18.0, 2047.0], [19.0, 2038.5], [20.0, 2046.5], [21.0, 2045.5], [22.0, 2066.3333333333335], [23.0, 2052.0], [24.0, 2043.0], [25.0, 2063.6], [26.0, 2066.25], [27.0, 2047.4], [28.0, 2063.0], [29.0, 2055.75], [30.0, 2043.25], [31.0, 2046.2857142857144]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[25.260000000000012, 2049.109999999999]], "isOverall": false, "label": "Get Access Token-Aggregated", "isController": false}, {"data": [[32.0, 2043.0], [33.0, 2040.25], [35.0, 2051.285714285714], [34.0, 2043.0], [36.0, 2039.0], [15.0, 2059.0], [16.0, 2046.0], [17.0, 2039.0], [18.0, 2034.0], [19.0, 2052.0], [20.0, 2040.0], [21.0, 2051.0], [22.0, 2047.0], [23.0, 2050.0], [24.0, 2048.25], [25.0, 2042.5], [26.0, 2041.6], [27.0, 2039.0], [28.0, 2052.0], [29.0, 2066.0], [30.0, 2048.0], [31.0, 2040.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[27.999999999999996, 2047.1]], "isOverall": false, "label": "Get user keys-Aggregated", "isController": false}, {"data": [[33.0, 3.75], [34.0, 1.6666666666666667], [35.0, 2.7142857142857144], [36.0, 4.0], [9.0, 109.0], [10.0, 5.666666666666666], [13.0, 7.0], [14.0, 2.0], [15.0, 2.8], [18.0, 3.0], [19.0, 3.0], [5.0, 3.0], [21.0, 4.0], [22.0, 2.3333333333333335], [24.0, 2.0], [26.0, 4.0], [28.0, 4.0], [29.0, 2.6666666666666665], [30.0, 2.6666666666666665], [31.0, 1.5]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[24.05999999999999, 5.38]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[32.0, 1.0], [33.0, 1.5], [34.0, 1.2], [35.0, 1.25], [36.0, 1.5], [14.0, 0.0], [15.0, 0.0], [16.0, 1.0], [17.0, 1.0], [18.0, 0.0], [19.0, 1.0], [20.0, 1.0], [21.0, 0.0], [22.0, 1.5], [23.0, 1.0], [24.0, 1.0], [25.0, 1.75], [26.0, 68.33333333333334], [27.0, 1.5], [28.0, 1.0], [29.0, 1.6666666666666667], [30.0, 1.0], [31.0, 2.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[27.900000000000002, 5.32]], "isOverall": false, "label": "WS open for user key gen-0-Aggregated", "isController": false}, {"data": [[33.0, 4614.25], [34.0, 4755.333333333333], [35.0, 5148.857142857143], [36.0, 5537.0], [9.0, 5208.0], [10.0, 4548.833333333333], [13.0, 4417.0], [14.0, 6560.0], [15.0, 5329.4], [18.0, 5898.0], [19.0, 5284.0], [5.0, 3662.0], [21.0, 4987.0], [22.0, 4294.0], [24.0, 4166.0], [26.0, 11558.333333333334], [28.0, 25625.0], [29.0, 10291.666666666668], [30.0, 8765.333333333334], [31.0, 16532.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[24.05999999999999, 6742.499999999998]], "isOverall": false, "label": "Requests for Import-Aggregated", "isController": true}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Setup ipfs-0-Aggregated", "isController": false}, {"data": [[32.0, 14989.0], [33.0, 16266.333333333334], [34.0, 15521.5], [35.0, 15671.333333333334], [36.0, 15575.0], [11.0, 16064.0], [15.0, 16542.666666666668], [17.0, 16161.0], [18.0, 15716.0], [19.0, 15343.0], [22.0, 15272.2], [24.0, 15237.0], [25.0, 18252.333333333332], [26.0, 23225.0], [27.0, 23610.0], [29.0, 28868.333333333332], [30.0, 15323.25], [31.0, 25367.333333333332]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[26.559999999999995, 18144.300000000003]], "isOverall": false, "label": "User creation(user side)-Aggregated", "isController": true}, {"data": [[32.0, 2.090909090909091], [33.0, 2.8846153846153846], [34.0, 2.9062500000000004], [35.0, 2.4062499999999996], [36.0, 3.4285714285714284], [5.0, 6.0], [9.0, 6.0], [10.0, 17.894736842105264], [11.0, 14.0], [12.0, 29.571428571428577], [13.0, 19.714285714285715], [14.0, 23.4], [15.0, 22.750000000000004], [17.0, 3.6], [18.0, 11.846153846153847], [19.0, 15.1875], [21.0, 21.16666666666667], [22.0, 21.363636363636363], [23.0, 4.25], [24.0, 3.4285714285714284], [25.0, 3.9166666666666665], [26.0, 2.181818181818182], [27.0, 3.75], [28.0, 2.8], [29.0, 3.5000000000000004], [30.0, 2.357142857142857], [31.0, 3.9545454545454546]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[25.406626506024104, 8.271084337349402]], "isOverall": false, "label": "Get policy import result-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 1.8], [33.0, 1.8], [34.0, 1.8333333333333333], [35.0, 8.4375], [36.0, 2.5], [3.0, 0.5], [4.0, 1.0], [5.0, 0.5], [6.0, 0.5], [7.0, 0.5], [8.0, 1.0], [9.0, 0.5], [10.0, 0.5], [11.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 3.0], [15.0, 1.5], [1.0, 1.6666666666666667], [16.0, 1.0], [17.0, 0.5], [18.0, 0.5], [19.0, 1.0], [20.0, 1.5], [21.0, 1.0], [22.0, 2.0], [23.0, 1.0], [24.0, 2.0], [25.0, 2.0], [26.0, 1.5], [27.0, 1.0], [28.0, 1.5], [29.0, 1.5], [30.0, 1.5], [31.0, 1.25]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[22.53465346534653, 2.4554455445544567]], "isOverall": false, "label": "Get Admin Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 2.0], [33.0, 3.5], [34.0, 2.3333333333333335], [35.0, 2.5], [36.0, 3.0], [3.0, 0.0], [4.0, 0.0], [5.0, 0.0], [6.0, 0.0], [7.0, 1.0], [8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [11.0, 0.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 1.0], [1.0, 1.0], [16.0, 0.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [20.0, 2.0], [21.0, 1.0], [22.0, 2.0], [23.0, 2.0], [24.0, 2.0], [25.0, 3.0], [26.0, 0.0], [27.0, 1.0], [28.0, 3.0], [29.0, 2.0], [30.0, 2.0], [31.0, 2.5]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[22.740000000000002, 1.66]], "isOverall": false, "label": "Accept sr-0-Aggregated", "isController": false}, {"data": [[32.0, 1.0], [33.0, 2.5], [34.0, 3.166666666666667], [35.0, 3.4000000000000004], [36.0, 2.25], [12.0, 5.0], [13.0, 2.0], [15.0, 5.75], [17.0, 25.5], [18.0, 5.8], [19.0, 16.857142857142858], [21.0, 3.0], [22.0, 4.333333333333333], [23.0, 3.5], [24.0, 32.33333333333333], [25.0, 3.5], [26.0, 3.0], [27.0, 4.0], [28.0, 2.75], [29.0, 15.714285714285715], [30.0, 1.8], [31.0, 2.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[27.103092783505158, 6.896907216494843]], "isOverall": false, "label": "Get user link result-0-Aggregated", "isController": false}, {"data": [[2.0, 2491.0], [32.0, 2466.5], [33.0, 2473.6666666666665], [35.0, 2482.666666666667], [34.0, 2469.75], [36.0, 2476.0], [3.0, 2464.0], [4.0, 2485.0], [5.0, 2475.0], [6.0, 2459.0], [7.0, 2465.0], [8.0, 2477.0], [9.0, 2472.0], [10.0, 2457.0], [11.0, 2456.0], [12.0, 2474.0], [13.0, 2484.0], [14.0, 2559.0], [15.0, 2475.0], [1.0, 2467.0], [16.0, 2625.0], [17.0, 2470.0], [18.0, 2542.0], [19.0, 2485.0], [20.0, 2488.0], [21.0, 2474.0], [22.0, 2466.0], [23.0, 2466.0], [24.0, 2492.0], [25.0, 2480.0], [26.0, 2480.0], [27.0, 2476.0], [28.0, 2489.0], [29.0, 2477.0], [30.0, 2472.3333333333335], [31.0, 2496.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[22.639999999999997, 2481.6799999999994]], "isOverall": false, "label": "Login by SR OS-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Create new tenant-0-Aggregated", "isController": false}, {"data": [[2.0, 2043.0], [32.0, 2036.0], [33.0, 2052.6666666666665], [34.0, 2048.4], [35.0, 2048.8], [36.0, 2043.5], [3.0, 2034.0], [4.0, 2047.0], [5.0, 2042.0], [6.0, 2053.0], [7.0, 2038.0], [8.0, 2044.0], [9.0, 2053.0], [10.0, 2043.0], [11.0, 2039.0], [12.0, 2050.0], [13.0, 2048.0], [14.0, 2057.0], [15.0, 2059.0], [16.0, 2060.0], [17.0, 2053.0], [18.0, 2037.0], [19.0, 2034.0], [20.0, 2038.0], [21.0, 2058.0], [22.0, 2052.0], [23.0, 2034.0], [24.0, 2037.0], [25.0, 2042.0], [26.0, 2034.0], [27.0, 2042.0], [28.0, 2042.0], [29.0, 2043.0], [30.0, 2045.3333333333333], [31.0, 2041.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[23.320000000000004, 2045.54]], "isOverall": false, "label": "Get sr keys-Aggregated", "isController": false}, {"data": [[32.0, 2.0], [33.0, 2.5], [34.0, 2.2], [35.0, 2.25], [36.0, 2.5], [14.0, 1.0], [15.0, 2.0], [16.0, 2.0], [17.0, 2.0], [18.0, 1.0], [19.0, 2.0], [20.0, 2.0], [21.0, 1.0], [22.0, 3.0], [23.0, 2.0], [24.0, 2.0], [25.0, 3.0], [26.0, 69.66666666666666], [27.0, 2.5], [28.0, 2.0], [29.0, 2.3333333333333335], [30.0, 2.0], [31.0, 3.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[27.900000000000002, 6.379999999999999]], "isOverall": false, "label": "WS open for user key gen-Aggregated", "isController": false}, {"data": [[33.0, 3.181818181818182], [32.0, 2.5], [34.0, 2.2142857142857144], [35.0, 2.2], [36.0, 2.3333333333333335], [4.0, 1.0], [5.0, 3.0], [6.0, 1.0], [7.0, 1.0], [8.0, 1.0], [9.0, 2.5], [10.0, 3.0], [11.0, 5.0], [12.0, 2.0], [13.0, 1.5], [14.0, 2.0], [15.0, 4.0], [16.0, 0.0], [17.0, 56.5], [18.0, 4.333333333333333], [19.0, 2.75], [20.0, 1.0], [21.0, 2.5], [22.0, 3.444444444444444], [23.0, 1.0], [24.0, 2.3333333333333335], [25.0, 2.75], [26.0, 4.166666666666667], [27.0, 2.8], [28.0, 2.5], [29.0, 3.0], [30.0, 1.6], [31.0, 2.428571428571429]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[25.04666666666668, 3.4333333333333336]], "isOverall": false, "label": "Get SR Access Token-0-Aggregated", "isController": false}, {"data": [[32.0, 2.666666666666667], [33.0, 3.5], [34.0, 2.3333333333333335], [35.0, 3.111111111111111], [36.0, 2.0], [11.0, 7.0], [14.0, 1.0], [15.0, 6.428571428571428], [16.0, 1.0], [17.0, 5.5], [18.0, 4.0], [19.0, 3.0], [20.0, 1.0], [21.0, 1.0], [22.0, 3.0], [23.0, 2.0], [24.0, 1.0], [25.0, 2.5714285714285716], [26.0, 2.5], [27.0, 13.5], [28.0, 3.0], [29.0, 2.166666666666667], [30.0, 1.4], [31.0, 3.5]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[27.26, 3.880000000000001]], "isOverall": false, "label": "Verify link-0-Aggregated", "isController": false}, {"data": [[33.0, 3.5], [32.0, 2.0], [2.0, 5.0], [34.0, 3.0], [35.0, 2.75], [36.0, 4.0], [3.0, 6.0], [4.0, 4.0], [5.0, 6.0], [6.0, 2.0], [7.0, 7.0], [8.0, 5.0], [9.0, 6.0], [10.0, 3.0], [11.0, 5.0], [12.0, 6.0], [13.0, 5.0], [14.0, 86.0], [15.0, 4.0], [16.0, 5.0], [1.0, 5.0], [17.0, 3.0], [18.0, 5.0], [19.0, 4.0], [20.0, 1.0], [21.0, 86.0], [22.0, 2.0], [23.0, 2.0], [24.0, 2.0], [25.0, 3.0], [26.0, 2.0], [27.0, 2.0], [28.0, 2.0], [29.0, 3.0], [30.0, 1.5], [31.0, 3.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[22.779999999999994, 6.700000000000001]], "isOverall": false, "label": "Dry Run Policy-0-Aggregated", "isController": false}, {"data": [[33.0, 26696.5], [32.0, 26847.5], [2.0, 74895.0], [34.0, 20578.25], [35.0, 23634.5], [36.0, 34438.0], [3.0, 70132.0], [4.0, 34782.0], [5.0, 29210.0], [6.0, 21090.0], [8.0, 25245.0], [9.0, 85497.0], [10.0, 21006.0], [11.0, 59433.0], [12.0, 16752.0], [13.0, 17380.0], [14.0, 21463.0], [15.0, 21539.0], [16.0, 50322.0], [1.0, 50569.0], [17.0, 15740.0], [18.0, 23738.0], [19.0, 31924.0], [20.0, 14686.0], [21.0, 15104.0], [22.0, 19422.0], [23.0, 12621.0], [24.0, 40211.0], [25.0, 33864.0], [26.0, 30675.0], [27.0, 41261.0], [28.0, 32195.0], [29.0, 47482.0], [30.0, 18885.0], [31.0, 28565.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[23.102040816326525, 29919.44897959183]], "isOverall": false, "label": "Policy import and dry run-Aggregated", "isController": true}, {"data": [[2.0, 1900.0], [32.0, 1680.3333333333333], [33.0, 1629.5], [34.0, 1730.3333333333333], [35.0, 1863.625], [36.0, 1613.0], [3.0, 1583.0], [4.0, 1947.0], [5.0, 1648.0], [6.0, 1708.0], [7.0, 1841.0], [8.0, 1617.0], [9.0, 1659.0], [10.0, 1660.0], [11.0, 1746.0], [12.0, 1597.0], [13.0, 1880.0], [14.0, 1943.0], [15.0, 2299.0], [1.0, 1955.0], [16.0, 1837.0], [17.0, 1611.0], [18.0, 1743.0], [19.0, 1628.0], [20.0, 1746.0], [21.0, 1674.0], [22.0, 1615.0], [23.0, 1797.0], [24.0, 1686.0], [25.0, 1673.0], [26.0, 1739.0], [27.0, 1597.0], [28.0, 2114.0], [29.0, 1723.0], [30.0, 1656.0], [31.0, 1838.5]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[22.740000000000002, 1763.3600000000001]], "isOverall": false, "label": "Invite and accept SR-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [32.0, 1.0], [33.0, 1.0], [34.0, 1.2], [35.0, 1.3333333333333333], [36.0, 1.5], [3.0, 0.0], [4.0, 0.0], [5.0, 0.0], [6.0, 1.0], [7.0, 0.0], [8.0, 0.0], [9.0, 1.0], [10.0, 0.0], [11.0, 0.0], [12.0, 0.0], [13.0, 1.0], [14.0, 1.0], [15.0, 0.0], [16.0, 1.0], [17.0, 0.0], [18.0, 0.0], [19.0, 1.0], [20.0, 0.0], [21.0, 0.0], [22.0, 1.0], [23.0, 1.0], [24.0, 1.0], [25.0, 1.0], [26.0, 1.0], [27.0, 1.0], [28.0, 1.0], [29.0, 1.0], [30.0, 1.0], [31.0, 1.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[23.360000000000003, 0.8]], "isOverall": false, "label": "Get key gen result-0-Aggregated", "isController": false}, {"data": [[32.0, 6092.5], [33.0, 8284.6], [34.0, 6547.5], [35.0, 7680.666666666666], [36.0, 8398.5], [14.0, 4909.0], [15.0, 4821.0], [16.0, 4983.0], [17.0, 4663.0], [18.0, 4554.0], [19.0, 5024.0], [20.0, 5080.0], [21.0, 5035.0], [22.0, 14233.0], [23.0, 5308.0], [24.0, 4905.0], [25.0, 15871.5], [26.0, 11052.5], [27.0, 16314.0], [28.0, 11614.5], [29.0, 17422.333333333332], [30.0, 5184.0], [31.0, 17701.4]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[27.960000000000004, 10547.32]], "isOverall": false, "label": "Link SR-Aggregated", "isController": true}, {"data": [[2.0, 624.0], [32.0, 613.3333333333334], [33.0, 553.0], [34.0, 600.0], [35.0, 715.125], [36.0, 584.0], [3.0, 551.0], [4.0, 605.0], [5.0, 591.0], [6.0, 581.0], [7.0, 556.0], [8.0, 570.0], [9.0, 559.0], [10.0, 554.0], [11.0, 640.0], [12.0, 547.0], [13.0, 574.0], [14.0, 743.0], [15.0, 904.0], [1.0, 563.0], [16.0, 627.0], [17.0, 600.0], [18.0, 652.0], [19.0, 581.0], [20.0, 575.0], [21.0, 577.0], [22.0, 589.0], [23.0, 660.0], [24.0, 563.0], [25.0, 591.0], [26.0, 572.0], [27.0, 548.0], [28.0, 911.0], [29.0, 619.0], [30.0, 561.5], [31.0, 620.5]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[22.740000000000002, 624.8400000000001]], "isOverall": false, "label": "Accept sr-Aggregated", "isController": false}, {"data": [[2.0, 3238.0], [32.0, 3017.5], [33.0, 2820.0], [34.0, 3249.0], [35.0, 3321.571428571429], [36.0, 2696.0], [3.0, 2824.0], [4.0, 3069.0], [5.0, 2761.0], [6.0, 2773.0], [7.0, 2973.0], [8.0, 3176.0], [9.0, 2739.0], [10.0, 2783.0], [11.0, 2963.0], [12.0, 2807.0], [13.0, 2977.0], [14.0, 3610.0], [15.0, 3409.0], [1.0, 3065.0], [16.0, 3091.0], [17.0, 2734.0], [18.0, 2842.0], [19.0, 2725.0], [20.0, 2866.0], [21.0, 3210.0], [22.0, 2722.0], [23.0, 2937.0], [24.0, 2991.0], [25.0, 2858.0], [26.0, 2964.0], [27.0, 2711.0], [28.0, 3546.0], [29.0, 2834.0], [30.0, 3037.3333333333335], [31.0, 3345.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[22.68, 3052.360000000001]], "isOverall": false, "label": "User creation(admin side)-Aggregated", "isController": true}, {"data": [[32.0, 1.0], [33.0, 1.4], [34.0, 1.0], [35.0, 2.333333333333333], [36.0, 1.0], [14.0, 1.0], [15.0, 0.0], [16.0, 1.0], [17.0, 0.0], [18.0, 0.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 1.5], [23.0, 1.0], [24.0, 0.0], [25.0, 2.0], [26.0, 1.6666666666666667], [27.0, 2.0], [28.0, 1.5], [29.0, 1.5], [31.0, 1.2]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[27.88, 1.4]], "isOverall": false, "label": "Login by user OS-0-Aggregated", "isController": false}, {"data": [[32.0, 1037.0], [33.0, 2121.666666666667], [35.0, 986.3333333333334], [34.0, 1242.4], [36.0, 998.0], [17.0, 1574.0], [19.0, 1537.0], [20.0, 933.0], [21.0, 1043.5], [22.0, 1046.75], [23.0, 956.6666666666666], [24.0, 984.0], [25.0, 968.6666666666666], [26.0, 977.5], [27.0, 948.75], [28.0, 967.0], [29.0, 1025.0], [30.0, 1076.6666666666667], [31.0, 6336.75]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[27.679999999999996, 1563.0800000000002]], "isOverall": false, "label": "WS open for user link-Aggregated", "isController": false}, {"data": [[32.0, 395.54545454545456], [33.0, 721.5384615384615], [34.0, 369.53124999999994], [35.0, 388.09375], [36.0, 450.99999999999994], [5.0, 288.0], [9.0, 521.5], [10.0, 425.5263157894737], [11.0, 337.59999999999997], [12.0, 332.14285714285717], [13.0, 437.85714285714283], [14.0, 328.0], [15.0, 370.37500000000006], [17.0, 482.6], [18.0, 600.3846153846154], [19.0, 714.0625], [21.0, 331.0], [22.0, 483.99999999999994], [23.0, 314.0], [24.0, 386.2857142857143], [25.0, 268.0], [26.0, 416.27272727272725], [27.0, 412.375], [28.0, 408.3], [29.0, 381.77777777777777], [30.0, 456.64285714285705], [31.0, 2940.2727272727275]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[25.406626506024104, 609.3403614457836]], "isOverall": false, "label": "Get policy import result-Aggregated", "isController": false}, {"data": [[32.0, 2.0], [33.0, 2.7142857142857144], [35.0, 2.166666666666667], [34.0, 2.2], [36.0, 3.0], [6.0, 1.0], [7.0, 1.0], [8.0, 2.0], [9.0, 2.0], [10.0, 1.0], [11.0, 1.0], [12.0, 1.0], [13.0, 1.0], [14.0, 1.0], [15.0, 0.0], [16.0, 2.0], [17.0, 2.0], [18.0, 0.0], [20.0, 2.0], [21.0, 0.0], [22.0, 2.0], [23.0, 2.0], [24.0, 1.0], [25.0, 2.0], [26.0, 3.0], [27.0, 3.0], [28.0, 2.0], [29.0, 1.5], [30.0, 3.0], [31.0, 1.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[25.700000000000003, 1.88]], "isOverall": false, "label": "WS open for sr link-0-Aggregated", "isController": false}, {"data": [[32.0, 2.0], [33.0, 3.3333333333333335], [35.0, 3.0], [34.0, 3.0], [36.0, 1.0], [17.0, 5.0], [19.0, 5.333333333333333], [20.0, 1.0], [21.0, 0.5], [22.0, 3.5], [23.0, 4.0], [24.0, 2.0], [25.0, 2.3333333333333335], [26.0, 6.0], [27.0, 2.5], [28.0, 1.0], [29.0, 3.5], [30.0, 3.333333333333333], [31.0, 3.25]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[27.679999999999996, 3.1399999999999983]], "isOverall": false, "label": "WS open for user link-0-Aggregated", "isController": false}, {"data": [[1.0, 364.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.0, 364.0]], "isOverall": false, "label": "Create new tenant-Aggregated", "isController": false}, {"data": [[32.0, 2039.0], [33.0, 2038.857142857143], [34.0, 2034.3333333333333], [35.0, 2047.1666666666665], [36.0, 2035.5], [15.0, 2046.0], [16.0, 2048.0], [17.0, 2042.0], [18.0, 2037.0], [19.0, 2044.0], [20.0, 2031.0], [21.0, 2035.5], [22.0, 2038.0], [23.0, 2029.0], [24.0, 2032.6666666666667], [25.0, 2033.0], [26.0, 2071.8], [27.0, 2038.0], [28.0, 2040.0], [29.0, 2055.6], [30.0, 2039.0], [31.0, 2049.375]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[28.561403508771924, 2044.6315789473688]], "isOverall": false, "label": "Get user key gen result-Aggregated", "isController": false}, {"data": [[32.0, 3.0], [33.0, 4.0], [35.0, 2.833333333333333], [34.0, 5.25], [16.0, 1.0], [17.0, 1.0], [18.0, 2.0], [19.0, 2.0], [20.0, 2.0], [21.0, 2.0], [22.0, 2.0], [23.0, 3.333333333333333], [24.0, 0.0], [25.0, 25.6], [26.0, 1.0], [27.0, 4.0], [28.0, 1.5], [29.0, 3.833333333333333], [31.0, 3.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[27.779999999999998, 5.199999999999999]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[32.0, 1.5], [33.0, 2.0], [35.0, 3.4], [34.0, 3.5], [36.0, 2.5], [17.0, 2.0], [18.0, 2.0], [19.0, 4.5], [20.0, 2.0], [21.0, 1.0], [22.0, 24.5], [23.0, 1.0], [24.0, 4.333333333333333], [25.0, 3.0], [26.0, 2.5], [27.0, 3.666666666666667], [28.0, 2.0], [29.0, 2.0], [30.0, 3.0], [31.0, 25.75]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[27.939999999999994, 6.320000000000002]], "isOverall": false, "label": "Get User Access Token-0-Aggregated", "isController": false}, {"data": [[32.0, 1.0], [33.0, 2.0], [34.0, 2.75], [35.0, 2.75], [36.0, 3.0], [7.0, 1.0], [8.0, 2.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [12.0, 1.0], [13.0, 1.0], [15.0, 0.5], [16.0, 10.0], [17.0, 4.0], [18.0, 2.0], [19.0, 1.0], [21.0, 0.0], [22.0, 1.5], [23.0, 2.0], [24.0, 2.0], [25.0, 2.0], [26.0, 3.0], [27.0, 2.0], [28.0, 2.0], [29.0, 2.5], [30.0, 1.0], [31.0, 3.3333333333333335]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[26.3, 2.22]], "isOverall": false, "label": "Link SR profile-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 2.0], [33.0, 2.0], [34.0, 2.25], [35.0, 2.142857142857143], [36.0, 1.0], [3.0, 1.0], [4.0, 1.0], [5.0, 1.0], [6.0, 1.0], [7.0, 1.0], [8.0, 1.0], [9.0, 2.0], [10.0, 1.0], [11.0, 0.0], [12.0, 0.0], [13.0, 0.0], [14.0, 1.0], [15.0, 2.0], [1.0, 1.0], [16.0, 2.0], [17.0, 1.0], [18.0, 0.0], [19.0, 2.0], [20.0, 1.0], [21.0, 1.0], [22.0, 2.0], [23.0, 9.0], [24.0, 1.0], [25.0, 0.0], [26.0, 1.0], [27.0, 1.0], [28.0, 2.0], [29.0, 1.0], [30.0, 1.3333333333333333], [31.0, 2.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[22.68, 1.5799999999999998]], "isOverall": false, "label": "Accept user-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 1.0], [33.0, 1.0], [34.0, 1.0], [35.0, 1.2], [36.0, 1.5], [3.0, 1.0], [4.0, 0.0], [5.0, 1.0], [6.0, 1.0], [7.0, 0.0], [8.0, 0.0], [9.0, 1.0], [10.0, 1.0], [11.0, 1.0], [12.0, 0.0], [13.0, 1.0], [14.0, 1.0], [15.0, 0.0], [16.0, 0.0], [17.0, 1.0], [18.0, 0.0], [19.0, 1.0], [20.0, 0.0], [21.0, 0.0], [22.0, 0.0], [23.0, 1.0], [24.0, 1.0], [25.0, 0.0], [26.0, 0.0], [27.0, 1.0], [28.0, 1.0], [29.0, 1.0], [30.0, 0.6666666666666667], [31.0, 1.5]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[23.320000000000004, 0.8000000000000002]], "isOverall": false, "label": "Get sr keys-0-Aggregated", "isController": false}, {"data": [[32.0, 2468.0], [33.0, 2520.8], [34.0, 2475.0], [35.0, 2496.8333333333335], [36.0, 2487.0], [14.0, 2530.0], [15.0, 2477.0], [16.0, 2550.0], [17.0, 2476.0], [18.0, 2542.0], [19.0, 2463.0], [20.0, 2487.0], [21.0, 2475.0], [22.0, 2470.5], [23.0, 2466.0], [24.0, 2480.0], [25.0, 2525.75], [26.0, 2497.6666666666665], [27.0, 2480.0], [28.0, 2466.5], [29.0, 2487.0], [31.0, 2488.8]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[27.88, 2493.62]], "isOverall": false, "label": "Login by user OS-Aggregated", "isController": false}, {"data": [[32.0, 1.4615384615384615], [33.0, 3.26530612244898], [34.0, 2.8260869565217392], [35.0, 2.4126984126984126], [36.0, 2.7], [9.0, 1.0], [10.0, 1.5], [11.0, 1.3333333333333333], [12.0, 1.3333333333333333], [13.0, 1.0], [14.0, 1.25], [15.0, 1.25], [16.0, 1.0], [17.0, 1.0], [18.0, 1.25], [19.0, 1.75], [20.0, 1.5], [21.0, 1.5], [22.0, 2.0], [23.0, 1.25], [24.0, 5.25], [25.0, 2.2], [26.0, 2.4444444444444446], [27.0, 3.2222222222222223], [28.0, 13.875], [29.0, 2.923076923076924], [30.0, 2.5294117647058822], [31.0, 4.6]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[29.946380697050945, 3.0321715817694384]], "isOverall": false, "label": "Get SR link result-0-Aggregated", "isController": false}, {"data": [[32.0, 10638.0], [33.0, 12180.25], [35.0, 10669.857142857143], [34.0, 10665.666666666666], [36.0, 10728.0], [15.0, 10740.0], [16.0, 10674.0], [17.0, 10744.0], [18.0, 10637.0], [19.0, 10729.0], [20.0, 10611.0], [21.0, 10697.0], [22.0, 10658.0], [23.0, 10624.0], [24.0, 10726.25], [25.0, 10753.5], [26.0, 10683.2], [27.0, 10771.0], [28.0, 10679.0], [29.0, 10702.8], [30.0, 10668.0], [31.0, 12348.4]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[27.999999999999996, 10975.72]], "isOverall": false, "label": "Generate user hedera data-Aggregated", "isController": true}, {"data": [[32.0, 330.5], [33.0, 834.75], [34.0, 562.8333333333334], [35.0, 638.5555555555555], [36.0, 494.66666666666663], [11.0, 286.0], [14.0, 864.0], [15.0, 591.8571428571429], [16.0, 726.0], [17.0, 806.5], [18.0, 838.0], [19.0, 598.5], [20.0, 716.0], [21.0, 804.0], [22.0, 496.2857142857143], [23.0, 846.0], [24.0, 550.5], [25.0, 514.4285714285714], [26.0, 664.0], [27.0, 403.5], [28.0, 513.0], [29.0, 344.5], [30.0, 444.0], [31.0, 2335.5]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[27.26, 701.9699999999999]], "isOverall": false, "label": "Verify link-Aggregated", "isController": false}, {"data": [[1.0, 825.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.0, 825.0]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[33.0, 503.3636363636364], [32.0, 264.1666666666667], [34.0, 283.2142857142857], [35.0, 309.06666666666666], [36.0, 269.0], [4.0, 267.0], [5.0, 263.5], [6.0, 260.0], [7.0, 312.0], [8.0, 247.0], [9.0, 273.0], [10.0, 323.99999999999994], [11.0, 298.5], [12.0, 249.0], [13.0, 267.5], [14.0, 275.0], [15.0, 305.24999999999994], [16.0, 259.0], [17.0, 368.0], [18.0, 303.3333333333333], [19.0, 271.25], [20.0, 261.0], [21.0, 276.0], [22.0, 262.77777777777777], [23.0, 251.0], [24.0, 286.0], [25.0, 261.25], [26.0, 283.33333333333337], [27.0, 262.2], [28.0, 251.5], [29.0, 265.7142857142857], [30.0, 521.4], [31.0, 1491.2857142857144]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[25.04666666666668, 372.6666666666665]], "isOverall": false, "label": "Get SR Access Token-Aggregated", "isController": false}, {"data": [[2.0, 10656.0], [32.0, 10662.0], [33.0, 10653.0], [34.0, 10656.6], [35.0, 10655.8], [36.0, 10652.0], [3.0, 10692.0], [4.0, 10641.0], [5.0, 10664.0], [6.0, 10652.0], [7.0, 10626.0], [8.0, 10629.0], [9.0, 10674.0], [10.0, 10644.0], [11.0, 10631.0], [12.0, 10632.0], [13.0, 10663.0], [14.0, 10671.0], [15.0, 10773.0], [16.0, 10675.0], [17.0, 10802.0], [18.0, 10630.0], [19.0, 10701.0], [20.0, 10660.0], [21.0, 10675.0], [22.0, 10648.0], [23.0, 10618.0], [24.0, 10628.0], [25.0, 10665.0], [26.0, 10662.0], [27.0, 10669.0], [28.0, 10630.0], [29.0, 10679.0], [30.0, 10637.333333333334], [31.0, 10642.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[23.320000000000004, 10658.7]], "isOverall": false, "label": "Generate sr hedera data-Aggregated", "isController": true}, {"data": [[32.0, 634.5], [33.0, 797.25], [34.0, 622.0], [35.0, 733.0], [36.0, 608.0], [3.0, 582.0], [4.0, 596.0], [5.0, 592.0], [6.0, 570.0], [7.0, 572.0], [8.0, 553.0], [9.0, 570.0], [10.0, 691.0], [11.0, 575.0], [12.0, 632.0], [13.0, 585.0], [14.0, 579.0], [15.0, 732.0], [16.0, 1387.0], [17.0, 589.0], [18.0, 567.0], [19.0, 581.0], [20.0, 897.0], [21.0, 595.0], [22.0, 577.0], [23.0, 583.0], [24.0, 596.0], [25.0, 606.0], [26.0, 712.0], [27.0, 561.0], [28.0, 607.0], [29.0, 608.0], [30.0, 931.0], [31.0, 579.5]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[23.94, 673.92]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[32.0, 1.0], [33.0, 1.2857142857142856], [34.0, 1.3333333333333333], [35.0, 1.5], [36.0, 1.5], [15.0, 1.0], [16.0, 1.0], [17.0, 1.0], [18.0, 0.0], [19.0, 0.0], [20.0, 1.0], [21.0, 1.0], [22.0, 2.0], [23.0, 1.0], [24.0, 1.0], [25.0, 2.0], [26.0, 19.0], [27.0, 1.0], [28.0, 1.0], [29.0, 18.8], [30.0, 1.0], [31.0, 13.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[28.561403508771924, 5.964912280701754]], "isOverall": false, "label": "Get user key gen result-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [32.0, 0.5], [33.0, 1.0], [35.0, 1.3333333333333333], [34.0, 1.0], [36.0, 2.0], [3.0, 0.0], [4.0, 1.0], [5.0, 0.0], [6.0, 0.0], [7.0, 0.0], [8.0, 0.0], [9.0, 0.0], [10.0, 0.0], [11.0, 0.0], [12.0, 0.0], [13.0, 1.0], [14.0, 0.0], [15.0, 0.0], [1.0, 0.0], [16.0, 1.0], [17.0, 0.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 1.0], [22.0, 0.0], [23.0, 1.0], [24.0, 1.0], [25.0, 1.0], [26.0, 2.0], [27.0, 1.0], [28.0, 1.0], [29.0, 1.0], [30.0, 1.0], [31.0, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[22.639999999999997, 0.74]], "isOverall": false, "label": "Login by SR OS-0-Aggregated", "isController": false}, {"data": [[32.0, 3.0], [33.0, 5.4], [34.0, 3.0], [35.0, 1.0], [36.0, 2.0], [15.0, 3.0], [19.0, 3.6666666666666665], [21.0, 2.0], [22.0, 2.75], [23.0, 2.0], [24.0, 2.0], [25.0, 3.3333333333333335], [26.0, 1.5], [27.0, 1.0], [28.0, 3.0], [29.0, 3.2], [30.0, 3.0], [31.0, 2.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[27.820000000000004, 2.72]], "isOverall": false, "label": "Get SR DID-0-Aggregated", "isController": false}, {"data": [[32.0, 1.0], [33.0, 2.0], [35.0, 2.2857142857142856], [34.0, 1.3333333333333333], [36.0, 1.0], [15.0, 0.0], [16.0, 1.0], [17.0, 1.0], [18.0, 1.0], [19.0, 1.0], [20.0, 1.0], [21.0, 2.0], [22.0, 1.0], [23.0, 0.0], [24.0, 1.25], [25.0, 1.0], [26.0, 2.0], [27.0, 1.0], [28.0, 1.0], [29.0, 26.4], [30.0, 2.0], [31.0, 1.2]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[27.999999999999996, 3.98]], "isOverall": false, "label": "Get user keys-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 36.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 40.36666666666667, "minX": 1.73373672E12, "maxY": 662825.4, "series": [{"data": [[1.73373684E12, 54806.45], [1.7337375E12, 439063.6666666667], [1.73373744E12, 601058.4666666667], [1.73373714E12, 564807.0], [1.73373756E12, 232481.18333333332], [1.73373726E12, 605980.2833333333], [1.7337372E12, 662825.4], [1.7337369E12, 131713.7], [1.73373732E12, 508503.25], [1.73373702E12, 375008.6], [1.73373696E12, 243567.4], [1.73373762E12, 94049.55], [1.73373708E12, 466248.6666666667], [1.73373678E12, 24688.233333333334], [1.73373768E12, 11253.316666666668], [1.73373672E12, 2583.733333333333], [1.73373738E12, 657654.0666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73373684E12, 1431.5666666666666], [1.7337375E12, 1605.6833333333334], [1.73373744E12, 2233.2], [1.73373714E12, 3373.016666666667], [1.73373756E12, 864.8666666666667], [1.73373726E12, 2781.766666666667], [1.7337372E12, 3401.4], [1.7337369E12, 2183.9333333333334], [1.73373732E12, 2153.5833333333335], [1.73373702E12, 3085.6], [1.73373696E12, 2648.2], [1.73373762E12, 388.45], [1.73373708E12, 3228.0833333333335], [1.73373678E12, 1074.7833333333333], [1.73373768E12, 40.36666666666667], [1.73373672E12, 170.05], [1.73373738E12, 2605.35]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73373768E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73373672E12, "maxY": 62732.0, "series": [{"data": [[1.73373684E12, 0.5], [1.73373702E12, 1.8333333333333335], [1.73373696E12, 3.8333333333333335], [1.73373714E12, 4.0], [1.73373708E12, 1.6666666666666667], [1.73373678E12, 1.0], [1.73373726E12, 1.0], [1.73373672E12, 1.0], [1.7337372E12, 2.333333333333333], [1.7337369E12, 1.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73373684E12, 969.3333333333334], [1.73373732E12, 3698.0], [1.73373702E12, 954.0], [1.73373696E12, 984.3333333333333], [1.73373714E12, 1000.3333333333334], [1.73373708E12, 1493.8333333333335], [1.73373678E12, 1051.0], [1.73373726E12, 2185.2], [1.7337372E12, 960.0], [1.7337369E12, 1040.6666666666665]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73373684E12, 319.3333333333333], [1.7337375E12, 424.0], [1.73373744E12, 380.25], [1.73373714E12, 360.25], [1.73373726E12, 642.0], [1.7337372E12, 301.33333333333326], [1.7337369E12, 340.625], [1.73373732E12, 1360.0], [1.73373702E12, 306.33333333333337], [1.73373696E12, 321.5833333333333], [1.73373708E12, 555.3333333333334], [1.73373678E12, 285.3333333333333], [1.73373738E12, 424.5714285714286]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73373684E12, 761.6666666666667], [1.73373732E12, 11056.0], [1.73373702E12, 766.6666666666666], [1.73373696E12, 766.1666666666666], [1.73373714E12, 746.8333333333334], [1.73373708E12, 876.6666666666666], [1.73373678E12, 734.0], [1.73373726E12, 1788.1666666666665], [1.7337372E12, 765.0], [1.7337369E12, 782.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73373684E12, 0.5], [1.73373702E12, 1.8333333333333335], [1.73373696E12, 2.5], [1.73373714E12, 4.166666666666666], [1.73373708E12, 3.166666666666667], [1.73373678E12, 1.0], [1.73373726E12, 1.0], [1.73373672E12, 1.0], [1.7337372E12, 3.333333333333333], [1.7337369E12, 1.6666666666666667]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73373732E12, 4.0], [1.73373702E12, 2.1666666666666665], [1.7337375E12, 6.5], [1.73373696E12, 1.5], [1.73373744E12, 4.375], [1.73373714E12, 2.3333333333333335], [1.73373708E12, 1.6], [1.73373726E12, 3.8], [1.7337372E12, 2.5], [1.73373738E12, 3.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73373732E12, 3.25], [1.73373702E12, 1.6], [1.7337375E12, 5.111111111111111], [1.73373696E12, 1.5], [1.73373744E12, 3.2857142857142856], [1.73373714E12, 2.3333333333333335], [1.73373708E12, 18.833333333333332], [1.73373756E12, 6.0], [1.73373726E12, 4.25], [1.7337372E12, 3.3333333333333335], [1.73373738E12, 3.833333333333333]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73373684E12, 521.0], [1.73373702E12, 503.66666666666663], [1.73373696E12, 542.6666666666667], [1.73373714E12, 513.0833333333333], [1.73373708E12, 509.3333333333333], [1.73373678E12, 497.5], [1.73373726E12, 507.0], [1.73373672E12, 426.6666666666667], [1.7337372E12, 531.0], [1.7337369E12, 540.3333333333333]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73373684E12, 1.0], [1.7337375E12, 2.0], [1.73373744E12, 4.249999999999999], [1.73373714E12, 3.125], [1.73373726E12, 3.2222222222222223], [1.7337372E12, 1.9166666666666667], [1.7337369E12, 2.75], [1.73373732E12, 4.2], [1.73373702E12, 1.5833333333333333], [1.73373696E12, 1.5], [1.73373708E12, 2.7777777777777777], [1.73373678E12, 1.0], [1.73373738E12, 4.000000000000001]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73373732E12, 1510.5], [1.73373702E12, 279.4], [1.7337375E12, 371.0], [1.73373696E12, 306.0], [1.73373744E12, 277.7142857142857], [1.73373714E12, 331.0], [1.73373708E12, 382.83333333333337], [1.73373756E12, 255.0], [1.73373726E12, 748.5], [1.7337372E12, 315.3333333333333], [1.73373738E12, 338.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73373684E12, 336.8333333333333], [1.73373702E12, 369.16666666666663], [1.73373696E12, 339.3333333333333], [1.73373714E12, 399.66666666666663], [1.73373708E12, 365.6666666666667], [1.73373678E12, 440.5], [1.73373726E12, 284.0], [1.73373672E12, 616.0], [1.7337372E12, 362.5], [1.7337369E12, 342.3333333333333]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73373732E12, 2041.8], [1.73373702E12, 2046.25], [1.73373696E12, 2045.0], [1.73373744E12, 2046.5], [1.73373714E12, 2050.25], [1.73373708E12, 2042.0], [1.73373726E12, 2050.3333333333335], [1.7337372E12, 2046.75], [1.7337369E12, 2048.0], [1.73373738E12, 2041.4999999999998]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73373684E12, 2042.0], [1.73373702E12, 2044.0], [1.73373696E12, 2046.8333333333333], [1.73373714E12, 2052.6], [1.73373708E12, 2043.3333333333335], [1.73373678E12, 2045.1666666666667], [1.73373726E12, 2048.0], [1.73373672E12, 2049.0], [1.7337372E12, 2047.7142857142858], [1.7337369E12, 2041.6666666666667]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73373732E12, 833.3333333333333], [1.73373702E12, 301.0], [1.7337375E12, 304.2857142857143], [1.73373744E12, 277.1666666666667], [1.73373762E12, 284.0], [1.73373714E12, 320.1666666666667], [1.73373708E12, 577.6666666666666], [1.73373756E12, 291.4], [1.73373726E12, 432.0], [1.7337372E12, 253.0], [1.73373738E12, 265.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73373672E12, 1710.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.73373684E12, 0.33333333333333337], [1.73373744E12, 23.75], [1.73373714E12, 1.0], [1.73373726E12, 1.2857142857142856], [1.7337372E12, 1.2999999999999998], [1.7337369E12, 0.6666666666666666], [1.73373732E12, 2.0], [1.73373702E12, 2.7], [1.73373696E12, 0.33333333333333337], [1.73373708E12, 1.1111111111111112], [1.73373678E12, 0.5], [1.73373672E12, 0.0], [1.73373738E12, 13.714285714285714]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73373732E12, 4243.5], [1.73373702E12, 976.6], [1.7337375E12, 1333.7777777777778], [1.73373696E12, 961.0], [1.73373744E12, 969.7142857142857], [1.73373714E12, 1015.0], [1.73373708E12, 1052.8333333333333], [1.73373756E12, 951.0], [1.73373726E12, 2136.0], [1.7337372E12, 974.0], [1.73373738E12, 1001.8333333333333]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73373684E12, 0.8333333333333333], [1.73373702E12, 0.8333333333333334], [1.73373696E12, 0.8333333333333334], [1.73373714E12, 1.4], [1.73373708E12, 1.0], [1.73373678E12, 0.0], [1.73373726E12, 1.0], [1.73373672E12, 0.0], [1.7337372E12, 1.2857142857142856], [1.7337369E12, 0.5]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73373732E12, 17255.5], [1.73373702E12, 8779.0], [1.7337375E12, 24801.75], [1.73373744E12, 17303.833333333336], [1.73373762E12, 40954.42857142857], [1.73373714E12, 17014.0], [1.73373708E12, 22194.25], [1.73373756E12, 21642.2], [1.73373726E12, 17536.666666666668], [1.73373768E12, 60418.333333333336], [1.7337372E12, 17651.8], [1.73373738E12, 15821.75]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73373684E12, 1214.3333333333333], [1.73373702E12, 1220.5], [1.73373696E12, 1232.1666666666665], [1.73373714E12, 1517.6666666666667], [1.73373708E12, 1437.5], [1.73373678E12, 1168.5], [1.73373726E12, 1083.0], [1.73373672E12, 1110.0], [1.7337372E12, 1360.5], [1.7337369E12, 1225.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73373684E12, 287.84615384615387], [1.73373732E12, 3194.1041666666674], [1.73373702E12, 339.07142857142844], [1.73373696E12, 295.95833333333337], [1.73373744E12, 522.0], [1.73373714E12, 362.03846153846155], [1.73373708E12, 405.51282051282055], [1.73373726E12, 812.1525423728813], [1.7337372E12, 357.6428571428572], [1.7337369E12, 295.37499999999994], [1.73373738E12, 402.10714285714283]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73373732E12, 1888.0], [1.73373702E12, 305.5], [1.7337375E12, 252.0], [1.73373696E12, 327.8333333333333], [1.73373744E12, 318.57142857142856], [1.73373714E12, 274.0], [1.73373708E12, 270.0], [1.73373726E12, 529.8], [1.7337372E12, 298.75], [1.7337369E12, 289.0], [1.73373738E12, 497.7142857142857]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73373684E12, 571.3333333333333], [1.73373702E12, 642.1666666666667], [1.73373696E12, 613.8333333333334], [1.73373714E12, 896.5], [1.73373708E12, 693.6666666666666], [1.73373678E12, 566.1666666666666], [1.73373726E12, 551.0], [1.73373672E12, 574.0], [1.7337372E12, 686.5], [1.7337369E12, 657.3333333333334]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73373732E12, 3979.833333333333], [1.73373702E12, 790.8], [1.7337375E12, 861.0], [1.73373696E12, 825.6666666666666], [1.73373744E12, 844.2], [1.73373714E12, 1185.25], [1.73373708E12, 643.0], [1.73373726E12, 871.3333333333334], [1.7337372E12, 662.4], [1.7337369E12, 858.5], [1.73373738E12, 680.875]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73373732E12, 7649.5], [1.73373702E12, 774.6], [1.7337375E12, 842.0], [1.73373696E12, 776.3333333333334], [1.73373744E12, 709.625], [1.73373714E12, 294.6666666666667], [1.73373708E12, 790.2], [1.73373726E12, 1407.0], [1.7337372E12, 515.5], [1.73373738E12, 410.42857142857144]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73373732E12, 749.0], [1.73373702E12, 296.6666666666667], [1.7337375E12, 352.75], [1.73373696E12, 267.75], [1.73373744E12, 299.125], [1.73373714E12, 279.0], [1.73373708E12, 294.2], [1.73373726E12, 744.4], [1.7337372E12, 271.0], [1.73373738E12, 285.75]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73373684E12, 2038.3333333333335], [1.73373702E12, 2038.0], [1.73373696E12, 2035.6666666666665], [1.73373714E12, 2034.1666666666667], [1.73373708E12, 2036.3333333333335], [1.73373678E12, 2043.6666666666667], [1.73373726E12, 2040.5], [1.7337372E12, 2034.8333333333335], [1.7337369E12, 2042.0]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73373684E12, 383.3333333333333], [1.73373702E12, 320.5], [1.73373696E12, 299.6666666666667], [1.73373714E12, 353.1666666666667], [1.73373708E12, 470.8333333333333], [1.73373678E12, 353.3333333333333], [1.73373726E12, 263.0], [1.73373672E12, 283.0], [1.7337372E12, 375.1666666666667], [1.7337369E12, 303.6666666666667]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73373684E12, 0.6666666666666666], [1.73373702E12, 1.5], [1.73373696E12, 1.1666666666666665], [1.73373714E12, 1.8333333333333333], [1.73373708E12, 2.0], [1.73373678E12, 1.0], [1.73373726E12, 2.3333333333333335], [1.7337372E12, 2.6666666666666665], [1.7337369E12, 1.1666666666666665]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73373732E12, 4.25], [1.73373702E12, 2.0], [1.7337375E12, 4.333333333333333], [1.73373696E12, 1.5], [1.73373744E12, 19.714285714285715], [1.73373714E12, 2.6666666666666665], [1.73373708E12, 1.5], [1.73373756E12, 4.0], [1.73373726E12, 3.25], [1.7337372E12, 2.3333333333333335], [1.73373738E12, 3.666666666666667]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73373684E12, 33792.166666666664], [1.73373702E12, 42820.8], [1.73373696E12, 35250.5], [1.73373714E12, 49053.0], [1.73373708E12, 52862.0], [1.73373678E12, 33295.75], [1.73373726E12, 49421.8], [1.7337372E12, 49021.666666666664], [1.7337369E12, 34310.333333333336]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73373672E12, 270.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73373684E12, 0.8333333333333334], [1.73373702E12, 0.6666666666666666], [1.73373696E12, 0.8333333333333334], [1.73373714E12, 1.3333333333333333], [1.73373708E12, 1.0], [1.73373678E12, 0.33333333333333337], [1.73373726E12, 1.0], [1.73373672E12, 0.0], [1.7337372E12, 1.1666666666666665], [1.7337369E12, 0.33333333333333337]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73373732E12, 17779.0], [1.73373702E12, 9048.0], [1.7337375E12, 25067.75], [1.73373744E12, 17587.333333333332], [1.73373762E12, 41218.42857142857], [1.73373714E12, 17280.5], [1.73373708E12, 22710.75], [1.73373756E12, 21901.4], [1.73373726E12, 17793.333333333332], [1.73373768E12, 60787.333333333336], [1.7337372E12, 17991.2], [1.73373738E12, 16115.5]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73373684E12, 1.8333333333333333], [1.73373702E12, 1.6666666666666667], [1.73373696E12, 1.8333333333333335], [1.73373714E12, 2.166666666666667], [1.73373708E12, 2.166666666666667], [1.73373678E12, 1.6666666666666667], [1.73373726E12, 2.0], [1.73373672E12, 1.0], [1.7337372E12, 2.166666666666667], [1.7337369E12, 1.5]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73373732E12, 2887.3333333333335], [1.73373702E12, 359.7], [1.7337375E12, 474.22222222222223], [1.73373696E12, 266.6666666666667], [1.73373744E12, 399.8461538461538], [1.73373714E12, 343.12499999999994], [1.73373708E12, 308.44444444444446], [1.73373756E12, 348.0], [1.73373726E12, 552.4545454545455], [1.7337372E12, 562.4285714285714], [1.73373738E12, 375.2]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73373732E12, 1.8], [1.73373702E12, 1.25], [1.73373696E12, 2.666666666666667], [1.73373744E12, 2.25], [1.73373714E12, 3.5], [1.73373708E12, 1.3333333333333333], [1.73373726E12, 1.6666666666666667], [1.7337372E12, 1.5], [1.7337369E12, 0.5], [1.73373738E12, 2.25]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73373732E12, 8296.749999999998], [1.73373702E12, 4748.2], [1.73373696E12, 4596.666666666666], [1.73373744E12, 5704.6], [1.73373714E12, 5028.75], [1.73373708E12, 4618.666666666667], [1.73373726E12, 20558.8], [1.7337372E12, 7974.333333333334], [1.7337369E12, 4040.75], [1.73373738E12, 5051.428571428572]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73373672E12, 4.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73373684E12, 15773.0], [1.73373702E12, 18431.333333333332], [1.73373696E12, 17214.4], [1.73373714E12, 30436.666666666668], [1.73373708E12, 19477.8], [1.73373678E12, 15480.833333333334], [1.73373726E12, 31039.0], [1.7337372E12, 29248.166666666668], [1.7337369E12, 16077.333333333332]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73373684E12, 2050.666666666667], [1.73373744E12, 2089.75], [1.73373714E12, 2046.5], [1.73373726E12, 2042.4285714285713], [1.7337372E12, 2041.8999999999999], [1.7337369E12, 2047.9166666666663], [1.73373732E12, 2047.1666666666665], [1.73373702E12, 2050.6], [1.73373696E12, 2044.3333333333335], [1.73373708E12, 2047.7777777777776], [1.73373678E12, 2046.1666666666665], [1.73373672E12, 2049.0], [1.73373738E12, 2059.285714285714]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73373732E12, 2042.0], [1.73373702E12, 2047.25], [1.73373696E12, 2045.5], [1.73373744E12, 2049.25], [1.73373714E12, 2058.6666666666665], [1.73373708E12, 2037.75], [1.73373726E12, 2042.4], [1.7337372E12, 2044.2], [1.7337369E12, 2046.0], [1.73373738E12, 2056.75]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73373732E12, 2.3333333333333335], [1.73373702E12, 3.0], [1.7337375E12, 3.0], [1.73373744E12, 2.5], [1.73373762E12, 25.8], [1.73373714E12, 2.3333333333333335], [1.73373708E12, 1.6666666666666667], [1.73373756E12, 5.2], [1.73373726E12, 4.25], [1.7337372E12, 2.75], [1.73373738E12, 3.6]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73373732E12, 2.1666666666666665], [1.73373702E12, 27.499999999999996], [1.73373696E12, 0.5], [1.73373744E12, 2.5], [1.73373714E12, 1.0], [1.73373708E12, 1.0], [1.73373726E12, 1.5], [1.7337372E12, 1.25], [1.7337369E12, 0.5], [1.73373738E12, 15.142857142857146]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73373732E12, 16728.6], [1.73373702E12, 4427.75], [1.7337375E12, 4838.714285714286], [1.73373696E12, 3766.0], [1.73373744E12, 5517.428571428572], [1.73373714E12, 4661.0], [1.73373708E12, 5313.285714285714], [1.73373756E12, 4423.0], [1.73373726E12, 16636.0], [1.7337372E12, 4955.666666666667], [1.73373738E12, 4421.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73373732E12, 20777.125], [1.73373702E12, 15601.5], [1.73373696E12, 15159.833333333334], [1.73373744E12, 16267.75], [1.73373714E12, 15673.666666666666], [1.73373708E12, 15385.25], [1.73373726E12, 32409.75], [1.7337372E12, 20615.25], [1.7337369E12, 14844.0], [1.73373738E12, 15960.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73373732E12, 3.4347826086956523], [1.73373702E12, 1.7619047619047616], [1.7337375E12, 13.547619047619047], [1.73373696E12, 3.0], [1.73373744E12, 15.487804878048783], [1.73373762E12, 4.750000000000001], [1.73373714E12, 2.5526315789473686], [1.73373708E12, 3.0967741935483866], [1.73373756E12, 21.090909090909093], [1.73373726E12, 2.8000000000000003], [1.7337372E12, 3.0000000000000004], [1.73373738E12, 3.527777777777778]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73373684E12, 0.8333333333333334], [1.73373702E12, 1.4166666666666665], [1.73373696E12, 1.5833333333333333], [1.73373714E12, 1.5833333333333333], [1.73373708E12, 1.5833333333333335], [1.73373678E12, 0.6666666666666666], [1.73373726E12, 2.5], [1.73373672E12, 1.6666666666666667], [1.7337372E12, 10.916666666666664], [1.7337369E12, 1.25]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73373684E12, 0.8333333333333334], [1.73373702E12, 1.6666666666666667], [1.73373696E12, 2.0], [1.73373714E12, 2.5], [1.73373708E12, 2.5], [1.73373678E12, 0.33333333333333337], [1.73373726E12, 3.0], [1.73373672E12, 1.0], [1.7337372E12, 2.5], [1.7337369E12, 0.8333333333333334]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73373732E12, 2.6666666666666665], [1.73373702E12, 2.2], [1.7337375E12, 14.611111111111112], [1.73373696E12, 1.0], [1.73373744E12, 10.923076923076923], [1.73373714E12, 3.625], [1.73373708E12, 1.4444444444444444], [1.73373756E12, 3.5], [1.73373726E12, 2.9090909090909087], [1.7337372E12, 2.7142857142857144], [1.73373738E12, 12.299999999999997]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73373684E12, 2470.0], [1.73373702E12, 2476.3333333333335], [1.73373696E12, 2477.6666666666665], [1.73373714E12, 2475.166666666667], [1.73373708E12, 2480.5], [1.73373678E12, 2473.166666666667], [1.73373726E12, 2476.0], [1.73373672E12, 2467.0], [1.7337372E12, 2478.0], [1.7337369E12, 2526.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.73373684E12, 2046.1666666666665], [1.73373702E12, 2042.0], [1.73373696E12, 2043.5], [1.73373714E12, 2049.0], [1.73373708E12, 2042.3333333333333], [1.73373678E12, 2042.8333333333333], [1.73373726E12, 2043.5], [1.7337372E12, 2049.1666666666665], [1.7337369E12, 2050.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73373732E12, 3.0], [1.73373702E12, 28.499999999999996], [1.73373696E12, 1.8333333333333335], [1.73373744E12, 3.5], [1.73373714E12, 2.0], [1.73373708E12, 2.0], [1.73373726E12, 2.5], [1.7337372E12, 2.25], [1.7337369E12, 1.6666666666666667], [1.73373738E12, 16.285714285714285]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73373684E12, 1.0], [1.7337375E12, 11.600000000000001], [1.73373744E12, 3.8571428571428563], [1.73373714E12, 2.466666666666667], [1.73373756E12, 4.5], [1.73373726E12, 2.923076923076923], [1.7337372E12, 1.9999999999999996], [1.7337369E12, 1.0], [1.73373732E12, 3.166666666666667], [1.73373702E12, 1.9230769230769231], [1.73373696E12, 1.1250000000000002], [1.73373762E12, 3.2], [1.73373708E12, 2.0], [1.73373678E12, 1.0], [1.73373738E12, 4.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73373732E12, 3.4999999999999996], [1.73373702E12, 1.8888888888888888], [1.7337375E12, 5.625], [1.73373696E12, 1.8750000000000002], [1.73373744E12, 2.8181818181818183], [1.73373714E12, 2.142857142857143], [1.73373708E12, 2.1111111111111107], [1.73373756E12, 7.0], [1.73373726E12, 3.090909090909091], [1.7337372E12, 3.375], [1.7337369E12, 3.666666666666667], [1.73373738E12, 9.142857142857142]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73373732E12, 2.75], [1.73373702E12, 2.0], [1.7337375E12, 4.25], [1.73373744E12, 16.0], [1.73373762E12, 4.714285714285714], [1.73373714E12, 3.25], [1.73373708E12, 2.75], [1.73373756E12, 21.2], [1.73373726E12, 3.3333333333333335], [1.73373768E12, 5.333333333333333], [1.7337372E12, 2.2], [1.73373738E12, 2.25]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73373732E12, 37903.25], [1.73373702E12, 24895.333333333332], [1.7337375E12, 27222.0], [1.73373696E12, 12924.0], [1.73373744E12, 28637.4], [1.73373762E12, 62732.0], [1.73373714E12, 19467.333333333332], [1.73373708E12, 24331.5], [1.73373756E12, 44326.0], [1.73373726E12, 29530.333333333332], [1.7337372E12, 26186.666666666668], [1.73373738E12, 22651.333333333336]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73373684E12, 1693.1666666666665], [1.73373702E12, 1747.5], [1.73373696E12, 1698.5], [1.73373714E12, 1861.0], [1.73373708E12, 1716.6666666666665], [1.73373678E12, 1771.1666666666667], [1.73373726E12, 1613.0], [1.73373672E12, 1955.0], [1.7337372E12, 1768.5], [1.7337369E12, 1843.5]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73373684E12, 0.33333333333333337], [1.73373702E12, 1.0], [1.73373696E12, 0.6666666666666666], [1.73373714E12, 1.1666666666666665], [1.73373708E12, 1.0], [1.73373678E12, 0.16666666666666669], [1.73373726E12, 1.5], [1.7337372E12, 1.3333333333333333], [1.7337369E12, 0.5]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73373684E12, 5092.0], [1.73373702E12, 7772.0], [1.73373696E12, 6461.166666666667], [1.73373714E12, 19780.333333333332], [1.73373708E12, 8837.0], [1.73373678E12, 4786.0], [1.73373726E12, 20378.75], [1.7337372E12, 18596.333333333332], [1.7337369E12, 5254.166666666667]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73373684E12, 574.0], [1.73373702E12, 628.8333333333333], [1.73373696E12, 592.5], [1.73373714E12, 703.1666666666666], [1.73373708E12, 605.3333333333334], [1.73373678E12, 584.6666666666666], [1.73373726E12, 584.0], [1.73373672E12, 563.0], [1.7337372E12, 642.8333333333333], [1.7337369E12, 684.5]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73373684E12, 2907.5], [1.73373702E12, 2968.0], [1.73373696E12, 2930.6666666666665], [1.73373714E12, 3378.666666666667], [1.73373708E12, 3154.166666666667], [1.73373678E12, 2939.6666666666665], [1.73373726E12, 2696.0], [1.73373672E12, 3065.0], [1.7337372E12, 3129.0], [1.7337369E12, 3068.5]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73373732E12, 1.2], [1.73373702E12, 1.0], [1.73373696E12, 0.8333333333333334], [1.73373744E12, 2.25], [1.73373714E12, 1.0], [1.73373708E12, 1.0], [1.73373726E12, 2.5], [1.7337372E12, 1.2], [1.7337369E12, 0.5], [1.73373738E12, 2.1428571428571432]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73373732E12, 5302.6], [1.73373702E12, 969.8333333333334], [1.7337375E12, 1574.0], [1.73373696E12, 987.7142857142858], [1.73373744E12, 1184.0], [1.73373714E12, 997.3333333333334], [1.73373708E12, 1043.3333333333333], [1.73373726E12, 2101.75], [1.7337372E12, 1027.0], [1.73373738E12, 1002.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73373732E12, 2883.478260869565], [1.73373702E12, 404.76190476190476], [1.7337375E12, 550.7142857142858], [1.73373696E12, 263.0], [1.73373744E12, 416.4634146341464], [1.73373762E12, 342.375], [1.73373714E12, 364.2894736842107], [1.73373708E12, 437.9032258064516], [1.73373756E12, 394.29545454545456], [1.73373726E12, 779.5000000000001], [1.7337372E12, 368.7037037037037], [1.73373738E12, 387.83333333333326]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73373684E12, 1.3333333333333333], [1.73373732E12, 2.0], [1.73373702E12, 2.3333333333333335], [1.73373696E12, 1.5], [1.73373714E12, 2.3333333333333335], [1.73373708E12, 1.8333333333333333], [1.73373678E12, 1.0], [1.73373726E12, 3.2], [1.7337372E12, 1.8333333333333333], [1.7337369E12, 1.1666666666666667]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73373732E12, 4.2], [1.73373702E12, 2.0], [1.7337375E12, 5.0], [1.73373696E12, 1.2857142857142856], [1.73373744E12, 4.444444444444445], [1.73373714E12, 2.3333333333333335], [1.73373708E12, 2.0], [1.73373726E12, 2.75], [1.7337372E12, 3.4], [1.73373738E12, 4.142857142857143]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73373672E12, 364.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73373732E12, 2046.3999999999999], [1.73373702E12, 2036.2], [1.73373696E12, 2031.5], [1.73373744E12, 2036.0], [1.73373714E12, 2041.6666666666667], [1.73373708E12, 2036.3333333333333], [1.73373726E12, 2040.0], [1.7337372E12, 2043.4], [1.7337369E12, 2043.4], [1.73373738E12, 2072.25]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73373732E12, 3.1666666666666665], [1.73373702E12, 2.4], [1.7337375E12, 4.0], [1.73373696E12, 1.5], [1.73373744E12, 25.8], [1.73373714E12, 2.25], [1.73373708E12, 3.0], [1.73373726E12, 4.333333333333333], [1.7337372E12, 4.8], [1.7337369E12, 1.0], [1.73373738E12, 3.5]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73373732E12, 21.0], [1.73373702E12, 2.5], [1.7337375E12, 9.0], [1.73373696E12, 1.6666666666666665], [1.73373744E12, 15.857142857142858], [1.73373714E12, 1.3333333333333333], [1.73373708E12, 1.3333333333333333], [1.73373726E12, 2.8], [1.7337372E12, 4.5], [1.7337369E12, 1.3333333333333335], [1.73373738E12, 3.142857142857143]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73373684E12, 1.1666666666666665], [1.73373732E12, 4.5], [1.73373702E12, 2.1666666666666665], [1.73373696E12, 1.5], [1.73373714E12, 2.666666666666667], [1.73373708E12, 1.1666666666666665], [1.73373678E12, 1.0], [1.73373726E12, 3.0], [1.7337372E12, 2.6], [1.7337369E12, 3.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73373684E12, 0.6666666666666667], [1.73373702E12, 1.3333333333333333], [1.73373696E12, 2.333333333333333], [1.73373714E12, 1.6666666666666665], [1.73373708E12, 1.8333333333333335], [1.73373678E12, 1.0], [1.73373726E12, 1.0], [1.73373672E12, 1.0], [1.7337372E12, 2.666666666666667], [1.7337369E12, 1.3333333333333333]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73373684E12, 0.6666666666666666], [1.73373702E12, 0.8333333333333334], [1.73373696E12, 0.33333333333333337], [1.73373714E12, 1.0], [1.73373708E12, 1.0], [1.73373678E12, 0.6666666666666667], [1.73373726E12, 1.5], [1.7337372E12, 1.1666666666666665], [1.7337369E12, 0.5]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73373732E12, 2492.0], [1.73373702E12, 2478.0], [1.73373696E12, 2473.6666666666665], [1.73373744E12, 2527.5], [1.73373714E12, 2476.5], [1.73373708E12, 2466.3333333333335], [1.73373726E12, 2519.166666666667], [1.7337372E12, 2495.2], [1.7337369E12, 2506.3333333333335], [1.73373738E12, 2489.0]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73373684E12, 1.230769230769231], [1.73373732E12, 4.958333333333334], [1.73373702E12, 1.9285714285714286], [1.73373696E12, 2.0833333333333335], [1.73373744E12, 2.5], [1.73373714E12, 2.711538461538462], [1.73373708E12, 1.9230769230769231], [1.73373726E12, 3.2711864406779663], [1.7337372E12, 2.3749999999999996], [1.7337369E12, 1.2500000000000002], [1.73373738E12, 7.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73373732E12, 12349.0], [1.73373702E12, 10682.8], [1.73373696E12, 10636.666666666666], [1.73373744E12, 10752.5], [1.73373714E12, 10677.0], [1.73373708E12, 10634.333333333334], [1.73373726E12, 11695.5], [1.7337372E12, 10661.6], [1.7337369E12, 10704.8], [1.73373738E12, 10732.25]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73373732E12, 2290.625], [1.73373702E12, 439.77777777777777], [1.7337375E12, 649.375], [1.73373696E12, 659.5], [1.73373744E12, 470.5454545454545], [1.73373714E12, 588.7142857142858], [1.73373708E12, 445.22222222222223], [1.73373756E12, 286.0], [1.73373726E12, 798.6363636363636], [1.7337372E12, 547.5], [1.7337369E12, 767.8333333333333], [1.73373738E12, 434.3571428571429]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73373672E12, 825.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73373684E12, 297.5], [1.7337375E12, 298.6], [1.73373744E12, 268.7857142857143], [1.73373714E12, 294.8666666666667], [1.73373756E12, 308.6666666666667], [1.73373726E12, 481.46153846153845], [1.7337372E12, 286.3076923076923], [1.7337369E12, 322.16666666666663], [1.73373732E12, 1702.3333333333333], [1.73373702E12, 282.7692307692308], [1.73373696E12, 263.125], [1.73373762E12, 262.0], [1.73373708E12, 419.6], [1.73373678E12, 279.0], [1.73373738E12, 269.90909090909093]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73373684E12, 10645.5], [1.73373702E12, 10652.166666666668], [1.73373696E12, 10649.0], [1.73373714E12, 10656.666666666668], [1.73373708E12, 10651.166666666666], [1.73373678E12, 10655.166666666666], [1.73373726E12, 10652.0], [1.7337372E12, 10653.5], [1.7337369E12, 10708.666666666668]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73373684E12, 601.0], [1.73373702E12, 667.3333333333333], [1.73373696E12, 642.3333333333334], [1.73373714E12, 631.8333333333334], [1.73373708E12, 789.8333333333334], [1.73373678E12, 582.4], [1.73373726E12, 632.3333333333334], [1.7337372E12, 743.0], [1.7337369E12, 739.1666666666666]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73373732E12, 10.6], [1.73373702E12, 0.8], [1.73373696E12, 1.3333333333333333], [1.73373744E12, 1.25], [1.73373714E12, 1.3333333333333333], [1.73373708E12, 1.3333333333333333], [1.73373726E12, 1.25], [1.7337372E12, 1.6], [1.7337369E12, 0.6], [1.73373738E12, 23.5]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73373684E12, 0.16666666666666666], [1.73373702E12, 1.1666666666666665], [1.73373696E12, 0.8333333333333334], [1.73373714E12, 1.0], [1.73373708E12, 0.5], [1.73373678E12, 0.33333333333333337], [1.73373726E12, 2.0], [1.73373672E12, 0.0], [1.7337372E12, 1.3333333333333333], [1.7337369E12, 0.5]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73373732E12, 2.25], [1.73373702E12, 2.2], [1.7337375E12, 3.5], [1.73373696E12, 1.3333333333333333], [1.73373744E12, 3.25], [1.73373714E12, 1.6666666666666667], [1.73373708E12, 4.4], [1.73373726E12, 3.0], [1.7337372E12, 2.5], [1.73373738E12, 2.7142857142857144]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73373732E12, 1.6666666666666667], [1.73373702E12, 1.0], [1.73373696E12, 0.6666666666666667], [1.73373744E12, 2.0], [1.73373714E12, 1.3333333333333333], [1.73373708E12, 1.25], [1.73373726E12, 1.6], [1.7337372E12, 2.6], [1.7337369E12, 0.8], [1.73373738E12, 17.375]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73373768E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73373672E12, "maxY": 60169.333333333336, "series": [{"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73373684E12, 318.3333333333333], [1.7337375E12, 422.0], [1.73373744E12, 375.99999999999994], [1.73373714E12, 357.0], [1.73373726E12, 638.6666666666666], [1.7337372E12, 299.3333333333333], [1.7337369E12, 337.875], [1.73373732E12, 1355.8], [1.73373702E12, 304.6666666666667], [1.73373696E12, 319.6666666666667], [1.73373708E12, 552.4444444444443], [1.73373678E12, 284.3333333333333], [1.73373738E12, 420.4285714285714]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73373684E12, 760.5], [1.73373732E12, 11051.5], [1.73373702E12, 764.5], [1.73373696E12, 764.1666666666667], [1.73373714E12, 744.0], [1.73373708E12, 875.3333333333334], [1.73373678E12, 732.0], [1.73373726E12, 1785.1666666666665], [1.7337372E12, 761.8], [1.7337369E12, 778.8333333333334]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73373684E12, 519.8333333333334], [1.73373702E12, 502.00000000000006], [1.73373696E12, 540.9166666666666], [1.73373714E12, 511.16666666666663], [1.73373708E12, 507.6666666666667], [1.73373678E12, 496.5], [1.73373726E12, 504.5], [1.73373672E12, 425.0], [1.7337372E12, 519.9166666666667], [1.7337369E12, 538.9166666666666]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73373732E12, 1507.25], [1.73373702E12, 277.6], [1.7337375E12, 365.77777777777777], [1.73373696E12, 304.5], [1.73373744E12, 274.28571428571433], [1.73373714E12, 328.6666666666667], [1.73373708E12, 363.8333333333333], [1.73373756E12, 249.0], [1.73373726E12, 744.0], [1.7337372E12, 311.6666666666667], [1.73373738E12, 334.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73373684E12, 336.0], [1.73373702E12, 366.8333333333333], [1.73373696E12, 336.5], [1.73373714E12, 395.1666666666667], [1.73373708E12, 362.1666666666667], [1.73373678E12, 439.0], [1.73373726E12, 283.0], [1.73373672E12, 615.0], [1.7337372E12, 358.8333333333333], [1.7337369E12, 340.5]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73373732E12, 2040.0], [1.73373702E12, 2045.0], [1.73373696E12, 2042.0], [1.73373744E12, 2044.0], [1.73373714E12, 2046.5], [1.73373708E12, 2040.6666666666667], [1.73373726E12, 2048.5], [1.7337372E12, 2045.0], [1.7337369E12, 2047.0], [1.73373738E12, 2039.125]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73373684E12, 2041.1666666666667], [1.73373702E12, 2042.8333333333333], [1.73373696E12, 2046.0], [1.73373714E12, 2051.0], [1.73373708E12, 2042.1666666666667], [1.73373678E12, 2045.0], [1.73373726E12, 2046.0], [1.73373672E12, 2048.0], [1.7337372E12, 2046.2857142857144], [1.7337369E12, 2041.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73373732E12, 829.0], [1.73373702E12, 282.5], [1.7337375E12, 299.99999999999994], [1.73373744E12, 273.8333333333333], [1.73373762E12, 257.8], [1.73373714E12, 311.0], [1.73373708E12, 572.6666666666666], [1.73373756E12, 282.8], [1.73373726E12, 427.5], [1.7337372E12, 244.25], [1.73373738E12, 250.4]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.73373684E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373672E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73373732E12, 16357.25], [1.73373702E12, 8535.0], [1.7337375E12, 24451.5], [1.73373744E12, 17048.333333333332], [1.73373762E12, 40756.57142857143], [1.73373714E12, 16786.25], [1.73373708E12, 21952.0], [1.73373756E12, 21398.0], [1.73373726E12, 17289.333333333332], [1.73373768E12, 60169.333333333336], [1.7337372E12, 17415.0], [1.73373738E12, 15574.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73373684E12, 286.5384615384616], [1.73373732E12, 3189.0000000000005], [1.73373702E12, 337.0357142857142], [1.73373696E12, 293.625], [1.73373744E12, 519.0], [1.73373714E12, 359.13461538461536], [1.73373708E12, 403.4615384615385], [1.73373726E12, 808.728813559322], [1.7337372E12, 355.14285714285717], [1.7337369E12, 294.04166666666663], [1.73373738E12, 395.0357142857143]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73373732E12, 1866.8], [1.73373702E12, 302.8333333333333], [1.7337375E12, 243.0], [1.73373696E12, 326.1666666666667], [1.73373744E12, 302.57142857142856], [1.73373714E12, 272.6666666666667], [1.73373708E12, 268.6666666666667], [1.73373726E12, 526.6], [1.7337372E12, 294.0], [1.7337369E12, 287.6666666666667], [1.73373738E12, 494.2857142857142]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73373684E12, 570.5], [1.73373702E12, 640.8333333333333], [1.73373696E12, 611.3333333333334], [1.73373714E12, 894.5], [1.73373708E12, 691.6666666666666], [1.73373678E12, 565.0], [1.73373726E12, 550.0], [1.73373672E12, 573.0], [1.7337372E12, 683.5], [1.7337369E12, 655.6666666666666]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73373732E12, 3976.6666666666665], [1.73373702E12, 788.2], [1.7337375E12, 857.0], [1.73373696E12, 824.0], [1.73373744E12, 818.2], [1.73373714E12, 1182.75], [1.73373708E12, 639.6666666666666], [1.73373726E12, 867.0], [1.7337372E12, 657.6], [1.7337369E12, 857.5], [1.73373738E12, 677.375]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73373732E12, 7586.75], [1.73373702E12, 772.4], [1.7337375E12, 838.0], [1.73373696E12, 775.0], [1.73373744E12, 704.75], [1.73373714E12, 293.0], [1.73373708E12, 785.8], [1.73373726E12, 1403.5], [1.7337372E12, 512.75], [1.73373738E12, 362.85714285714283]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73373732E12, 745.0], [1.73373702E12, 294.5], [1.7337375E12, 345.75], [1.73373696E12, 266.25], [1.73373744E12, 294.5], [1.73373714E12, 276.6666666666667], [1.73373708E12, 292.2], [1.73373726E12, 740.6], [1.7337372E12, 268.5], [1.73373738E12, 282.75]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73373684E12, 2037.8333333333333], [1.73373702E12, 2037.0], [1.73373696E12, 2034.8333333333333], [1.73373714E12, 2033.0], [1.73373708E12, 2035.1666666666667], [1.73373678E12, 2043.5], [1.73373726E12, 2039.0], [1.7337372E12, 2033.3333333333333], [1.7337369E12, 2041.3333333333333]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73373684E12, 382.3333333333333], [1.73373702E12, 318.3333333333333], [1.73373696E12, 295.8333333333333], [1.73373714E12, 348.8333333333333], [1.73373708E12, 469.0], [1.73373678E12, 352.3333333333333], [1.73373726E12, 262.0], [1.73373672E12, 282.0], [1.7337372E12, 372.6666666666667], [1.7337369E12, 302.5]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73373672E12, 269.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.73373768E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73373732E12, 2884.6666666666665], [1.73373702E12, 357.4], [1.7337375E12, 459.44444444444446], [1.73373696E12, 265.3333333333333], [1.73373744E12, 388.7692307692308], [1.73373714E12, 339.5], [1.73373708E12, 306.8888888888889], [1.73373756E12, 344.5], [1.73373726E12, 549.2727272727273], [1.7337372E12, 559.7142857142858], [1.73373738E12, 362.5]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73373684E12, 2050.1666666666665], [1.73373744E12, 2065.75], [1.73373714E12, 2045.3999999999999], [1.73373726E12, 2040.9999999999998], [1.7337372E12, 2040.3000000000002], [1.7337369E12, 2047.25], [1.73373732E12, 2045.1666666666665], [1.73373702E12, 2047.7000000000003], [1.73373696E12, 2043.6666666666667], [1.73373708E12, 2046.5555555555557], [1.73373678E12, 2045.6666666666667], [1.73373672E12, 2049.0], [1.73373738E12, 2045.5714285714284]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73373732E12, 2040.1666666666667], [1.73373702E12, 2046.25], [1.73373696E12, 2044.6666666666667], [1.73373744E12, 2047.25], [1.73373714E12, 2057.3333333333335], [1.73373708E12, 2036.5], [1.73373726E12, 2040.4], [1.7337372E12, 2041.4], [1.7337369E12, 2045.2], [1.73373738E12, 2039.25]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73373684E12, 2469.833333333333], [1.73373702E12, 2475.0], [1.73373696E12, 2476.6666666666665], [1.73373714E12, 2474.166666666667], [1.73373708E12, 2479.5], [1.73373678E12, 2472.8333333333335], [1.73373726E12, 2474.0], [1.73373672E12, 2467.0], [1.7337372E12, 2476.333333333333], [1.7337369E12, 2525.333333333333]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.73373684E12, 2045.3333333333333], [1.73373702E12, 2041.0], [1.73373696E12, 2043.1666666666667], [1.73373714E12, 2047.6666666666667], [1.73373708E12, 2040.8333333333335], [1.73373678E12, 2042.0], [1.73373726E12, 2042.0], [1.7337372E12, 2047.8333333333333], [1.7337369E12, 2049.333333333333]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373762E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.73373768E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73373684E12, 572.6666666666666], [1.73373702E12, 627.0], [1.73373696E12, 590.3333333333333], [1.73373714E12, 700.5], [1.73373708E12, 602.8333333333334], [1.73373678E12, 584.0], [1.73373726E12, 581.0], [1.73373672E12, 562.0], [1.7337372E12, 640.1666666666666], [1.7337369E12, 683.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73373732E12, 2879.7826086956525], [1.73373702E12, 400.952380952381], [1.7337375E12, 536.8571428571431], [1.73373696E12, 260.0], [1.73373744E12, 400.4390243902439], [1.73373762E12, 335.75], [1.73373714E12, 359.2105263157895], [1.73373708E12, 434.38709677419354], [1.73373756E12, 372.81818181818187], [1.73373726E12, 776.0500000000001], [1.7337372E12, 365.3333333333333], [1.73373738E12, 383.77777777777777]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73373672E12, 364.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73373732E12, 2035.6], [1.73373702E12, 2035.2], [1.73373696E12, 2030.1666666666667], [1.73373744E12, 2034.25], [1.73373714E12, 2040.3333333333333], [1.73373708E12, 2035.0], [1.73373726E12, 2038.5], [1.7337372E12, 2041.6], [1.7337369E12, 2042.4], [1.73373738E12, 2048.7500000000005]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73373732E12, 2490.8], [1.73373702E12, 2477.0], [1.73373696E12, 2472.8333333333335], [1.73373744E12, 2525.25], [1.73373714E12, 2475.5], [1.73373708E12, 2465.0], [1.73373726E12, 2516.666666666667], [1.7337372E12, 2493.4], [1.7337369E12, 2505.833333333333], [1.73373738E12, 2486.857142857143]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73373732E12, 2287.0], [1.73373702E12, 437.8888888888889], [1.7337375E12, 643.5], [1.73373696E12, 657.5], [1.73373744E12, 467.5454545454545], [1.73373714E12, 586.1428571428572], [1.73373708E12, 443.0], [1.73373756E12, 279.0], [1.73373726E12, 795.3636363636365], [1.7337372E12, 543.875], [1.7337369E12, 763.8333333333334], [1.73373738E12, 425.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73373672E12, 820.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73373684E12, 296.3333333333333], [1.7337375E12, 286.7333333333333], [1.73373744E12, 264.5714285714286], [1.73373714E12, 292.06666666666666], [1.73373756E12, 304.0], [1.73373726E12, 478.3846153846154], [1.7337372E12, 284.15384615384613], [1.7337369E12, 321.16666666666663], [1.73373732E12, 1699.0], [1.73373702E12, 280.7692307692307], [1.73373696E12, 261.875], [1.73373762E12, 258.6], [1.73373708E12, 417.4], [1.73373678E12, 277.75], [1.73373738E12, 265.7272727272727]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73373684E12, 600.3333333333334], [1.73373702E12, 665.6666666666666], [1.73373696E12, 641.0], [1.73373714E12, 629.8333333333333], [1.73373708E12, 787.8333333333334], [1.73373678E12, 581.4], [1.73373726E12, 630.0], [1.7337372E12, 740.1666666666666], [1.7337369E12, 737.5]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73373768E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73373672E12, "maxY": 34459.0, "series": [{"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.73373684E12, 968.0], [1.73373732E12, 3696.0], [1.73373702E12, 951.6666666666666], [1.73373696E12, 982.5], [1.73373714E12, 998.0], [1.73373708E12, 1491.6666666666667], [1.73373678E12, 1050.0], [1.73373726E12, 2181.8], [1.7337372E12, 957.8333333333333], [1.7337369E12, 1039.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 62.125000000000014], [1.73373714E12, 58.00000000000001], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373732E12, 624.4], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373708E12, 51.0], [1.73373678E12, 0.0], [1.73373738E12, 75.57142857142857]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.73373684E12, 509.8333333333333], [1.73373732E12, 6826.0], [1.73373702E12, 504.8333333333333], [1.73373696E12, 499.33333333333337], [1.73373714E12, 478.83333333333337], [1.73373708E12, 620.5], [1.73373678E12, 488.0], [1.73373726E12, 1278.3333333333333], [1.7337372E12, 479.8], [1.7337369E12, 506.66666666666663]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73373684E12, 258.08333333333337], [1.73373702E12, 241.66666666666666], [1.73373696E12, 260.0], [1.73373714E12, 243.08333333333334], [1.73373708E12, 243.41666666666663], [1.73373678E12, 242.24999999999997], [1.73373726E12, 243.0], [1.73373672E12, 172.33333333333331], [1.7337372E12, 245.66666666666666], [1.7337369E12, 254.33333333333331]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73373732E12, 924.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 80.5]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73373732E12, 2021.8], [1.73373702E12, 2026.5], [1.73373696E12, 2024.0], [1.73373744E12, 2024.75], [1.73373714E12, 2025.5], [1.73373708E12, 2018.0], [1.73373726E12, 2027.5], [1.7337372E12, 2025.0], [1.7337369E12, 2024.3333333333333], [1.73373738E12, 2019.125]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73373684E12, 2021.0], [1.73373702E12, 2021.8333333333333], [1.73373696E12, 2023.3333333333335], [1.73373714E12, 2029.6], [1.73373708E12, 2023.8333333333333], [1.73373678E12, 2023.1666666666665], [1.73373726E12, 2026.0], [1.73373672E12, 2022.0], [1.7337372E12, 2026.5714285714287], [1.7337369E12, 2020.8333333333335]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73373672E12, 569.0]], "isOverall": false, "label": "Tenant creation flow", "isController": true}, {"data": [[1.73373684E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373672E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73373732E12, 4239.25], [1.73373702E12, 974.6], [1.7337375E12, 1329.2222222222222], [1.73373696E12, 959.0], [1.73373744E12, 949.5714285714286], [1.73373714E12, 1011.6666666666666], [1.73373708E12, 1051.1666666666667], [1.73373756E12, 947.0], [1.73373726E12, 2132.75], [1.7337372E12, 971.6666666666666], [1.73373738E12, 998.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.73373768E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73373684E12, 0.0], [1.73373732E12, 1099.1666666666665], [1.73373702E12, 55.178571428571416], [1.73373696E12, 0.0], [1.73373744E12, 256.5], [1.73373714E12, 56.55769230769231], [1.73373708E12, 75.71794871794872], [1.73373726E12, 196.8983050847458], [1.7337372E12, 79.26785714285715], [1.7337369E12, 0.0], [1.73373738E12, 102.39285714285714]], "isOverall": false, "label": "Get SR link result", "isController": false}, {"data": [[1.73373732E12, 860.4000000000001], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 206.2857142857143]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 97.6], [1.73373714E12, 399.5], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73373732E12, 5076.75], [1.73373702E12, 479.4], [1.7337375E12, 495.25], [1.73373696E12, 528.8333333333334], [1.73373744E12, 430.25], [1.73373714E12, 0.0], [1.73373708E12, 524.2], [1.73373726E12, 901.0], [1.7337372E12, 240.5], [1.73373738E12, 67.14285714285714]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73373684E12, 2016.3333333333335], [1.73373702E12, 2018.3333333333333], [1.73373696E12, 2014.5], [1.73373714E12, 2016.3333333333333], [1.73373708E12, 2014.3333333333335], [1.73373678E12, 2017.1666666666667], [1.73373726E12, 2019.0], [1.7337372E12, 2017.0], [1.7337369E12, 2020.5]], "isOverall": false, "label": "Get key gen result", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73373684E12, 24203.666666666668], [1.73373702E12, 25656.8], [1.73373696E12, 24843.333333333332], [1.73373714E12, 30490.833333333332], [1.73373708E12, 34459.0], [1.73373678E12, 24257.0], [1.73373726E12, 30672.6], [1.7337372E12, 29633.166666666668], [1.7337369E12, 24452.666666666668]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.73373768E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73373684E12, 1.0], [1.73373702E12, 1.0], [1.73373696E12, 1.0], [1.73373714E12, 0.8333333333333334], [1.73373708E12, 1.1666666666666665], [1.73373678E12, 1.3333333333333333], [1.73373726E12, 1.0], [1.73373672E12, 1.0], [1.7337372E12, 1.0], [1.7337369E12, 1.1666666666666665]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 27.888888888888886], [1.73373696E12, 0.0], [1.73373744E12, 82.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 289.42857142857144], [1.73373738E12, 95.3]], "isOverall": false, "label": "Get user link result", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73373732E12, 2442.125], [1.73373702E12, 1734.4], [1.73373696E12, 1443.1666666666665], [1.73373744E12, 2422.4], [1.73373714E12, 2097.5], [1.73373708E12, 1800.3333333333333], [1.73373726E12, 10937.2], [1.7337372E12, 1442.0], [1.7337369E12, 1538.75], [1.73373738E12, 1960.4285714285716]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73373684E12, 12198.0], [1.73373702E12, 13043.166666666668], [1.73373696E12, 12271.6], [1.73373714E12, 16878.333333333332], [1.73373708E12, 13063.6], [1.73373678E12, 12083.0], [1.73373726E12, 18916.0], [1.7337372E12, 16760.833333333336], [1.7337369E12, 12102.5]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73373684E12, 2026.5], [1.73373744E12, 2023.0], [1.73373714E12, 2023.3], [1.73373726E12, 2019.857142857143], [1.7337372E12, 2020.7], [1.7337369E12, 2026.4166666666665], [1.73373732E12, 2024.8333333333335], [1.73373702E12, 2027.4999999999998], [1.73373696E12, 2021.916666666667], [1.73373708E12, 2023.7777777777778], [1.73373678E12, 2020.0], [1.73373672E12, 2022.0], [1.73373738E12, 2025.5714285714287]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73373732E12, 2022.5], [1.73373702E12, 2026.75], [1.73373696E12, 2023.6666666666665], [1.73373744E12, 2029.5], [1.73373714E12, 2034.6666666666667], [1.73373708E12, 2017.25], [1.73373726E12, 2021.4], [1.7337372E12, 2020.4], [1.7337369E12, 2025.2], [1.73373738E12, 2019.125]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73373732E12, 9140.8], [1.73373702E12, 1540.25], [1.7337375E12, 1839.5714285714284], [1.73373696E12, 1452.0], [1.73373744E12, 1820.4285714285716], [1.73373714E12, 1668.0], [1.73373708E12, 1830.142857142857], [1.73373756E12, 1644.6666666666667], [1.73373726E12, 3363.6666666666665], [1.7337372E12, 1478.0], [1.73373738E12, 1653.3333333333335]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73373732E12, 14318.5], [1.73373702E12, 11920.0], [1.73373696E12, 11537.166666666666], [1.73373744E12, 12409.25], [1.73373714E12, 12215.0], [1.73373708E12, 11981.0], [1.73373726E12, 23201.5], [1.7337372E12, 11785.75], [1.7337369E12, 11662.6], [1.73373738E12, 12206.499999999998]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get policy import result-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get user link result-0", "isController": false}, {"data": [[1.73373684E12, 2017.8333333333335], [1.73373702E12, 2019.1666666666665], [1.73373696E12, 2021.1666666666667], [1.73373714E12, 2016.8333333333333], [1.73373708E12, 2019.5], [1.73373678E12, 2025.6666666666667], [1.73373726E12, 2024.0], [1.73373672E12, 2019.0], [1.7337372E12, 2021.0], [1.7337369E12, 2023.6666666666667]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.73373684E12, 2022.1666666666667], [1.73373702E12, 2023.5], [1.73373696E12, 2021.8333333333335], [1.73373714E12, 2026.0], [1.73373708E12, 2021.3333333333335], [1.73373678E12, 2022.5], [1.73373726E12, 2022.5], [1.7337372E12, 2027.5], [1.7337369E12, 2030.1666666666667]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73373732E12, 0.8333333333333334], [1.73373702E12, 1.0], [1.73373696E12, 1.0], [1.73373744E12, 1.0], [1.73373714E12, 1.0], [1.73373708E12, 1.0], [1.73373726E12, 1.0], [1.7337372E12, 1.0], [1.7337369E12, 1.1666666666666665], [1.73373738E12, 1.142857142857143]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373762E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373762E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.73373768E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73373732E12, 10771.25], [1.73373702E12, 1454.0], [1.7337375E12, 1959.4], [1.73373696E12, 1473.0], [1.73373744E12, 1958.4], [1.73373762E12, 1475.0], [1.73373714E12, 1859.6666666666667], [1.73373708E12, 1732.8749999999998], [1.73373756E12, 1695.6666666666665], [1.73373726E12, 2446.6666666666665], [1.7337372E12, 1538.3333333333333], [1.73373738E12, 2184.1666666666665]], "isOverall": false, "label": "Policy import and dry run", "isController": true}, {"data": [[1.73373684E12, 516.1666666666666], [1.73373702E12, 483.33333333333337], [1.73373696E12, 520.0], [1.73373714E12, 486.16666666666663], [1.73373708E12, 486.83333333333337], [1.73373678E12, 484.5], [1.73373726E12, 486.0], [1.73373672E12, 517.0], [1.7337372E12, 491.3333333333333], [1.7337369E12, 508.6666666666667]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Get key gen result-0", "isController": false}, {"data": [[1.73373684E12, 2113.0], [1.73373702E12, 2927.0], [1.73373696E12, 2142.833333333333], [1.73373714E12, 6763.833333333334], [1.73373708E12, 2972.8], [1.73373678E12, 1965.6], [1.73373726E12, 8793.5], [1.7337372E12, 6655.166666666667], [1.7337369E12, 1963.3333333333333]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73373684E12, 516.1666666666666], [1.73373702E12, 483.33333333333337], [1.73373696E12, 520.0], [1.73373714E12, 486.16666666666663], [1.73373708E12, 486.83333333333337], [1.73373678E12, 484.5], [1.73373726E12, 486.0], [1.73373672E12, 517.0], [1.7337372E12, 491.3333333333333], [1.7337369E12, 508.6666666666667]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Login by user OS-0", "isController": false}, {"data": [[1.73373732E12, 5297.8], [1.73373702E12, 967.6666666666666], [1.7337375E12, 1569.0], [1.73373696E12, 986.1428571428571], [1.73373744E12, 1179.5555555555557], [1.73373714E12, 995.0], [1.73373708E12, 1041.0], [1.73373726E12, 2098.25], [1.7337372E12, 1023.6], [1.73373738E12, 997.8571428571429]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.73373732E12, 960.6086956521739], [1.73373702E12, 118.76190476190476], [1.7337375E12, 145.16666666666666], [1.73373696E12, 0.0], [1.73373744E12, 70.78048780487806], [1.73373762E12, 62.87499999999999], [1.73373714E12, 64.42105263157895], [1.73373708E12, 103.61290322580645], [1.73373756E12, 88.27272727272728], [1.73373726E12, 206.39999999999998], [1.7337372E12, 77.3333333333333], [1.73373738E12, 96.47222222222224]], "isOverall": false, "label": "Get policy import result", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73373672E12, 0.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73373732E12, 2017.7], [1.73373702E12, 2015.6], [1.73373696E12, 2014.5], [1.73373744E12, 2017.5], [1.73373714E12, 2022.0], [1.73373708E12, 2016.6666666666667], [1.73373726E12, 2018.5], [1.7337372E12, 2018.4], [1.7337369E12, 2021.2], [1.73373738E12, 2028.625]], "isOverall": false, "label": "Get user key gen result", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73373732E12, 2028.2], [1.73373702E12, 2020.0], [1.73373696E12, 2017.0], [1.73373744E12, 2029.75], [1.73373714E12, 2020.75], [1.73373708E12, 2021.3333333333333], [1.73373726E12, 2022.6666666666665], [1.7337372E12, 2032.8], [1.7337369E12, 2023.5], [1.73373738E12, 2023.2857142857144]], "isOverall": false, "label": "Login by user OS", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get SR link result-0", "isController": false}, {"data": [[1.73373732E12, 11724.8], [1.73373702E12, 10117.2], [1.73373696E12, 10100.833333333334], [1.73373744E12, 10125.5], [1.73373714E12, 10130.0], [1.73373708E12, 10098.0], [1.73373726E12, 11129.333333333334], [1.7337372E12, 10109.6], [1.7337369E12, 10126.6], [1.73373738E12, 10119.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 169.66666666666663], [1.7337375E12, 348.375], [1.73373696E12, 396.375], [1.73373744E12, 179.54545454545456], [1.73373714E12, 291.7142857142857], [1.73373708E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 48.72727272727274], [1.7337372E12, 248.75], [1.7337369E12, 485.6666666666667], [1.73373738E12, 141.5]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73373672E12, 569.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.7337375E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373756E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373762E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73373684E12, 10103.333333333334], [1.73373702E12, 10110.666666666668], [1.73373696E12, 10102.5], [1.73373714E12, 10110.166666666668], [1.73373708E12, 10101.166666666668], [1.73373678E12, 10110.333333333332], [1.73373726E12, 10112.0], [1.7337372E12, 10115.0], [1.7337369E12, 10122.5]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get user key gen result-0", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373726E12, 0.0], [1.73373672E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.7337375E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73373732E12, 0.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373744E12, 0.0], [1.73373714E12, 0.0], [1.73373708E12, 0.0], [1.73373726E12, 0.0], [1.7337372E12, 0.0], [1.7337369E12, 0.0], [1.73373738E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73373768E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73373672E12, "maxY": 79273.0, "series": [{"data": [[1.73373684E12, 2484.0], [1.7337375E12, 45586.0], [1.73373744E12, 34317.0], [1.73373714E12, 26616.0], [1.73373756E12, 52947.0], [1.73373726E12, 29853.0], [1.7337372E12, 27128.0], [1.7337369E12, 2625.0], [1.73373732E12, 20695.0], [1.73373702E12, 8779.0], [1.73373696E12, 2492.0], [1.73373762E12, 79273.0], [1.73373708E12, 28985.0], [1.73373678E12, 2491.0], [1.73373768E12, 70224.0], [1.73373672E12, 2467.0], [1.73373738E12, 30221.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73373684E12, 2039.0], [1.7337375E12, 925.2], [1.73373744E12, 1058.4999999999998], [1.73373714E12, 1341.8999999999994], [1.73373756E12, 719.3000000000001], [1.73373726E12, 2039.0], [1.7337372E12, 2032.5], [1.7337369E12, 2045.9], [1.73373732E12, 5688.900000000002], [1.73373702E12, 2032.1], [1.73373696E12, 2037.0], [1.73373762E12, 16656.0], [1.73373708E12, 2031.0], [1.73373678E12, 2042.5], [1.73373768E12, 70224.0], [1.73373672E12, 2049.0], [1.73373738E12, 2026.9]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73373684E12, 2476.07], [1.7337375E12, 22112.619999999915], [1.73373744E12, 12443.849999999871], [1.73373714E12, 2491.5600000000004], [1.73373756E12, 41600.06999999992], [1.73373726E12, 4292.319999999998], [1.7337372E12, 5255.600000000273], [1.7337369E12, 2545.92], [1.73373732E12, 19401.74000000001], [1.73373702E12, 2480.01], [1.73373696E12, 2480.0], [1.73373762E12, 79273.0], [1.73373708E12, 2594.5799999999936], [1.73373678E12, 2486.5], [1.73373768E12, 70224.0], [1.73373672E12, 2467.0], [1.73373738E12, 7437.980000000014]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73373684E12, 2052.45], [1.7337375E12, 1265.899999999999], [1.73373744E12, 2047.3999999999999], [1.73373714E12, 2050.85], [1.73373756E12, 911.3999999999992], [1.73373726E12, 2138.2499999999945], [1.7337372E12, 2047.5], [1.7337369E12, 2057.0], [1.73373732E12, 7561.649999999993], [1.73373702E12, 2046.1499999999999], [1.73373696E12, 2052.0], [1.73373762E12, 26979.0], [1.73373708E12, 2045.0], [1.73373678E12, 2054.5], [1.73373768E12, 70224.0], [1.73373672E12, 2278.8999999999987], [1.73373738E12, 2048.1]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73373684E12, 0.0], [1.7337375E12, 1.0], [1.73373744E12, 1.0], [1.73373714E12, 0.0], [1.73373756E12, 1.0], [1.73373726E12, 1.0], [1.7337372E12, 1.0], [1.7337369E12, 0.0], [1.73373732E12, 1.0], [1.73373702E12, 0.0], [1.73373696E12, 0.0], [1.73373762E12, 1.0], [1.73373708E12, 0.0], [1.73373678E12, 0.0], [1.73373768E12, 5.0], [1.73373672E12, 0.0], [1.73373738E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73373684E12, 2.0], [1.7337375E12, 176.0], [1.73373744E12, 96.5], [1.73373714E12, 4.0], [1.73373756E12, 175.5], [1.73373726E12, 6.0], [1.7337372E12, 4.5], [1.7337369E12, 2.0], [1.73373732E12, 6.0], [1.73373702E12, 3.0], [1.73373696E12, 3.0], [1.73373762E12, 109.0], [1.73373708E12, 4.0], [1.73373678E12, 1.0], [1.73373768E12, 23331.5], [1.73373672E12, 3.5], [1.73373738E12, 87.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73373768E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 4.0, "minX": 2.0, "maxY": 100452.0, "series": [{"data": [[4.0, 93.0], [2.0, 174.5], [8.0, 5.0], [16.0, 9.5], [18.0, 5.0], [10.0, 5.0], [20.0, 7.5], [5.0, 7.0], [22.0, 5.0], [6.0, 14.5], [12.0, 7.0], [14.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[5.0, 100452.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 22.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 50146.5, "series": [{"data": [[4.0, 0.0], [2.0, 0.0], [8.0, 0.0], [16.0, 0.0], [18.0, 0.0], [10.0, 0.0], [20.0, 0.0], [5.0, 0.0], [22.0, 0.0], [6.0, 0.0], [12.0, 0.0], [14.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[5.0, 50146.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 22.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.73373672E12, "maxY": 9.233333333333333, "series": [{"data": [[1.73373684E12, 3.8333333333333335], [1.7337375E12, 4.166666666666667], [1.73373744E12, 5.866666666666666], [1.73373714E12, 9.066666666666666], [1.73373756E12, 2.1666666666666665], [1.73373726E12, 7.516666666666667], [1.7337372E12, 9.233333333333333], [1.7337369E12, 5.85], [1.73373732E12, 5.733333333333333], [1.73373702E12, 8.35], [1.73373696E12, 7.166666666666667], [1.73373762E12, 0.8], [1.73373708E12, 8.6], [1.73373678E12, 2.9], [1.73373768E12, 0.05], [1.73373672E12, 0.48333333333333334], [1.73373738E12, 7.0]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73373768E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73373672E12, "maxY": 7.6, "series": [{"data": [[1.73373684E12, 2.8333333333333335], [1.7337375E12, 3.4833333333333334], [1.73373744E12, 4.8], [1.73373714E12, 7.45], [1.73373756E12, 2.033333333333333], [1.73373726E12, 6.283333333333333], [1.7337372E12, 7.6], [1.7337369E12, 4.483333333333333], [1.73373732E12, 5.05], [1.73373702E12, 6.516666666666667], [1.73373696E12, 5.483333333333333], [1.73373762E12, 0.7333333333333333], [1.73373708E12, 6.95], [1.73373678E12, 2.0833333333333335], [1.73373768E12, 0.1], [1.73373672E12, 0.31666666666666665], [1.73373738E12, 5.85]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.73373684E12, 0.2], [1.7337375E12, 0.16666666666666666], [1.73373744E12, 0.3333333333333333], [1.73373714E12, 0.36666666666666664], [1.73373756E12, 0.016666666666666666], [1.73373726E12, 0.3333333333333333], [1.7337372E12, 0.4], [1.7337369E12, 0.3], [1.73373732E12, 0.26666666666666666], [1.73373702E12, 0.45], [1.73373696E12, 0.45], [1.73373708E12, 0.4], [1.73373678E12, 0.13333333333333333], [1.73373672E12, 0.016666666666666666], [1.73373738E12, 0.3333333333333333]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.73373684E12, 0.6], [1.7337375E12, 0.26666666666666666], [1.73373744E12, 0.4166666666666667], [1.73373714E12, 0.8666666666666667], [1.73373756E12, 0.1], [1.73373726E12, 0.48333333333333334], [1.7337372E12, 0.85], [1.7337369E12, 0.75], [1.73373732E12, 0.2833333333333333], [1.73373702E12, 0.8833333333333333], [1.73373696E12, 0.8333333333333334], [1.73373762E12, 0.08333333333333333], [1.73373708E12, 0.85], [1.73373678E12, 0.5666666666666667], [1.73373672E12, 0.11666666666666667], [1.73373738E12, 0.4166666666666667]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.73373684E12, 0.2], [1.7337375E12, 0.21666666666666667], [1.73373744E12, 0.31666666666666665], [1.73373714E12, 0.35], [1.73373756E12, 0.016666666666666666], [1.73373726E12, 0.36666666666666664], [1.7337372E12, 0.38333333333333336], [1.7337369E12, 0.3], [1.73373732E12, 0.23333333333333334], [1.73373702E12, 0.45], [1.73373696E12, 0.4], [1.73373708E12, 0.43333333333333335], [1.73373678E12, 0.11666666666666667], [1.73373672E12, 0.016666666666666666], [1.73373738E12, 0.36666666666666664]], "isOverall": false, "label": "202", "isController": false}, {"data": [[1.73373762E12, 0.03333333333333333]], "isOverall": false, "label": "500", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73373768E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73373672E12, "maxY": 0.9833333333333333, "series": [{"data": [[1.73373732E12, 0.13333333333333333], [1.73373702E12, 0.08333333333333333], [1.73373696E12, 0.1], [1.73373744E12, 0.08333333333333333], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.05], [1.73373726E12, 0.08333333333333333], [1.7337372E12, 0.05], [1.7337369E12, 0.06666666666666667], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Link user-success", "isController": true}, {"data": [[1.73373732E12, 0.16666666666666666], [1.73373702E12, 0.08333333333333333], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.05], [1.73373726E12, 0.13333333333333333], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.08333333333333333], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Get user key gen result-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Accept sr-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Accept sr-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Invite and accept user-success", "isController": true}, {"data": [[1.73373684E12, 0.2], [1.73373702E12, 0.2], [1.73373696E12, 0.2], [1.73373714E12, 0.2], [1.73373708E12, 0.2], [1.73373678E12, 0.2], [1.73373726E12, 0.03333333333333333], [1.73373672E12, 0.05], [1.7337372E12, 0.2], [1.7337369E12, 0.2]], "isOverall": false, "label": "Get Admin Access Token-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.03333333333333333], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Get key gen result-success", "isController": false}, {"data": [[1.73373672E12, 0.016666666666666666]], "isOverall": false, "label": "Tenant creation flow-success", "isController": true}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Login by SR OS-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.16666666666666666], [1.73373726E12, 0.11666666666666667], [1.7337372E12, 0.16666666666666666], [1.7337369E12, 0.2], [1.73373732E12, 0.1], [1.73373702E12, 0.16666666666666666], [1.73373696E12, 0.2], [1.73373708E12, 0.15], [1.73373678E12, 0.1], [1.73373672E12, 0.016666666666666666], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Get Access Token-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Accept user-success", "isController": false}, {"data": [[1.73373732E12, 0.06666666666666667], [1.73373702E12, 0.08333333333333333], [1.7337375E12, 0.15], [1.73373696E12, 0.03333333333333333], [1.73373744E12, 0.11666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.1], [1.73373756E12, 0.016666666666666666], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.05], [1.73373738E12, 0.1]], "isOverall": false, "label": "WS open for policy import-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.08333333333333333], [1.73373726E12, 0.05], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.73373732E12, 0.1], [1.73373702E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.05], [1.73373726E12, 0.1], [1.7337372E12, 0.06666666666666667], [1.7337369E12, 0.1], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "WS open for user key gen-success", "isController": false}, {"data": [[1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.1], [1.7337375E12, 0.016666666666666666], [1.73373696E12, 0.1], [1.73373744E12, 0.11666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.05], [1.73373726E12, 0.08333333333333333], [1.7337372E12, 0.06666666666666667], [1.7337369E12, 0.05], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Get User Access Token-0-success", "isController": false}, {"data": [[1.73373732E12, 0.38333333333333336], [1.73373702E12, 0.35], [1.7337375E12, 0.7], [1.73373696E12, 0.016666666666666666], [1.73373744E12, 0.6833333333333333], [1.73373762E12, 0.13333333333333333], [1.73373714E12, 0.6333333333333333], [1.73373708E12, 0.5166666666666667], [1.73373756E12, 0.7333333333333333], [1.73373726E12, 0.3333333333333333], [1.7337372E12, 0.45], [1.73373738E12, 0.6]], "isOverall": false, "label": "Get policy import result-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Invite user-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.03333333333333333], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Get sr keys-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.08333333333333333], [1.73373678E12, 0.08333333333333333], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Link SR-success", "isController": true}, {"data": [[1.73373732E12, 0.1], [1.73373702E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.05], [1.73373726E12, 0.1], [1.7337372E12, 0.06666666666666667], [1.7337369E12, 0.1], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "WS open for user key gen-0-success", "isController": false}, {"data": [[1.73373732E12, 0.06666666666666667], [1.73373702E12, 0.08333333333333333], [1.7337375E12, 0.15], [1.73373696E12, 0.03333333333333333], [1.73373744E12, 0.11666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.1], [1.73373756E12, 0.016666666666666666], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.05], [1.73373738E12, 0.1]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.73373672E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-success", "isController": false}, {"data": [[1.73373732E12, 0.1], [1.73373702E12, 0.16666666666666666], [1.7337375E12, 0.3], [1.73373696E12, 0.05], [1.73373744E12, 0.21666666666666667], [1.73373714E12, 0.13333333333333333], [1.73373708E12, 0.15], [1.73373756E12, 0.03333333333333333], [1.73373726E12, 0.18333333333333332], [1.7337372E12, 0.11666666666666667], [1.73373738E12, 0.16666666666666666]], "isOverall": false, "label": "Get user link result-0-success", "isController": false}, {"data": [[1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.1], [1.7337375E12, 0.016666666666666666], [1.73373696E12, 0.1], [1.73373744E12, 0.11666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.05], [1.73373726E12, 0.08333333333333333], [1.7337372E12, 0.06666666666666667], [1.7337369E12, 0.05], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Get User Access Token-success", "isController": false}, {"data": [[1.73373672E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-success", "isController": false}, {"data": [[1.73373732E12, 0.1], [1.73373702E12, 0.08333333333333333], [1.7337375E12, 0.016666666666666666], [1.73373696E12, 0.1], [1.73373744E12, 0.08333333333333333], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.05], [1.73373726E12, 0.05], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.06666666666666667], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.73373732E12, 0.05], [1.73373702E12, 0.1], [1.7337375E12, 0.06666666666666667], [1.73373696E12, 0.06666666666666667], [1.73373744E12, 0.13333333333333333], [1.73373714E12, 0.05], [1.73373708E12, 0.08333333333333333], [1.73373726E12, 0.08333333333333333], [1.7337372E12, 0.06666666666666667], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Link user profile-0-success", "isController": false}, {"data": [[1.73373732E12, 0.06666666666666667], [1.73373702E12, 0.05], [1.7337375E12, 0.08333333333333333], [1.73373696E12, 0.016666666666666666], [1.73373744E12, 0.08333333333333333], [1.73373762E12, 0.03333333333333333], [1.73373714E12, 0.05], [1.73373708E12, 0.13333333333333333], [1.73373756E12, 0.1], [1.73373726E12, 0.05], [1.7337372E12, 0.05], [1.73373738E12, 0.1]], "isOverall": false, "label": "Policy import and dry run-success", "isController": true}, {"data": [[1.73373684E12, 0.2], [1.73373702E12, 0.2], [1.73373696E12, 0.2], [1.73373714E12, 0.2], [1.73373708E12, 0.2], [1.73373678E12, 0.2], [1.73373726E12, 0.03333333333333333], [1.73373672E12, 0.05], [1.7337372E12, 0.2], [1.7337369E12, 0.2]], "isOverall": false, "label": "Get Admin Access Token-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.7337375E12, 0.016666666666666666], [1.73373744E12, 0.13333333333333333], [1.73373714E12, 0.13333333333333333], [1.73373726E12, 0.15], [1.7337372E12, 0.2], [1.7337369E12, 0.13333333333333333], [1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.2], [1.73373696E12, 0.2], [1.73373708E12, 0.15], [1.73373678E12, 0.05], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Agree terms-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "User creation(admin side)-success", "isController": true}, {"data": [[1.73373684E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.16666666666666666], [1.73373726E12, 0.11666666666666667], [1.7337372E12, 0.16666666666666666], [1.7337369E12, 0.2], [1.73373732E12, 0.1], [1.73373702E12, 0.16666666666666666], [1.73373696E12, 0.2], [1.73373708E12, 0.15], [1.73373678E12, 0.1], [1.73373672E12, 0.016666666666666666], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Get Access Token-success", "isController": false}, {"data": [[1.73373732E12, 0.1], [1.73373702E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.06666666666666667], [1.73373726E12, 0.08333333333333333], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.08333333333333333], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Get user keys-0-success", "isController": false}, {"data": [[1.73373732E12, 0.06666666666666667], [1.73373702E12, 0.08333333333333333], [1.7337375E12, 0.15], [1.73373696E12, 0.03333333333333333], [1.73373744E12, 0.11666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.1], [1.73373756E12, 0.016666666666666666], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.05], [1.73373738E12, 0.1]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.06666666666666667], [1.7337375E12, 0.11666666666666667], [1.73373696E12, 0.03333333333333333], [1.73373744E12, 0.11666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.11666666666666667], [1.73373756E12, 0.05], [1.73373726E12, 0.05], [1.7337372E12, 0.05], [1.73373738E12, 0.1]], "isOverall": false, "label": "Requests for Import-success", "isController": true}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Invite and accept SR-success", "isController": true}, {"data": [[1.73373762E12, 0.016666666666666666]], "isOverall": false, "label": "Requests for DryRun-failure", "isController": false}, {"data": [[1.73373672E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-0-success", "isController": false}, {"data": [[1.73373732E12, 0.1], [1.73373702E12, 0.16666666666666666], [1.7337375E12, 0.3], [1.73373696E12, 0.05], [1.73373744E12, 0.21666666666666667], [1.73373714E12, 0.13333333333333333], [1.73373708E12, 0.15], [1.73373756E12, 0.03333333333333333], [1.73373726E12, 0.18333333333333332], [1.7337372E12, 0.11666666666666667], [1.73373738E12, 0.16666666666666666]], "isOverall": false, "label": "Get user link result-success", "isController": false}, {"data": [[1.73373672E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373732E12, 0.016666666666666666], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.03333333333333333], [1.73373726E12, 0.08333333333333333], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "WS open for sr link-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Login by SR OS-success", "isController": false}, {"data": [[1.73373732E12, 0.1], [1.73373702E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.06666666666666667], [1.73373726E12, 0.08333333333333333], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.08333333333333333], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Get user keys-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.03333333333333333], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Generate sr hedera data-success", "isController": true}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.03333333333333333], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Get key gen result-0-success", "isController": false}, {"data": [[1.73373732E12, 0.13333333333333333], [1.73373702E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.06666666666666667], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.06666666666666667], [1.7337369E12, 0.08333333333333333], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "User creation(user side)-success", "isController": true}, {"data": [[1.73373732E12, 0.05], [1.73373702E12, 0.03333333333333333], [1.7337375E12, 0.11666666666666667], [1.73373744E12, 0.1], [1.73373762E12, 0.08333333333333333], [1.73373714E12, 0.1], [1.73373708E12, 0.05], [1.73373756E12, 0.08333333333333333], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.06666666666666667], [1.73373738E12, 0.08333333333333333]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.73373732E12, 0.06666666666666667], [1.73373702E12, 0.016666666666666666], [1.7337375E12, 0.06666666666666667], [1.73373744E12, 0.1], [1.73373762E12, 0.1], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.06666666666666667], [1.73373756E12, 0.08333333333333333], [1.73373726E12, 0.05], [1.73373768E12, 0.05], [1.7337372E12, 0.08333333333333333], [1.73373738E12, 0.06666666666666667]], "isOverall": false, "label": "Requests for DryRun-success", "isController": true}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Accept user-0-success", "isController": false}, {"data": [[1.73373732E12, 0.13333333333333333], [1.73373702E12, 0.15], [1.7337375E12, 0.13333333333333333], [1.73373696E12, 0.13333333333333333], [1.73373744E12, 0.18333333333333332], [1.73373714E12, 0.11666666666666667], [1.73373708E12, 0.15], [1.73373756E12, 0.016666666666666666], [1.73373726E12, 0.18333333333333332], [1.7337372E12, 0.13333333333333333], [1.7337369E12, 0.1], [1.73373738E12, 0.23333333333333334]], "isOverall": false, "label": "Verify link-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.7337375E12, 0.016666666666666666], [1.73373744E12, 0.13333333333333333], [1.73373714E12, 0.13333333333333333], [1.73373726E12, 0.15], [1.7337372E12, 0.2], [1.7337369E12, 0.13333333333333333], [1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.2], [1.73373696E12, 0.2], [1.73373708E12, 0.15], [1.73373678E12, 0.05], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Agree terms-0-success", "isController": false}, {"data": [[1.73373672E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.03333333333333333], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Get sr keys-0-success", "isController": false}, {"data": [[1.73373732E12, 0.06666666666666667], [1.73373702E12, 0.08333333333333333], [1.7337375E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.13333333333333333], [1.73373714E12, 0.05], [1.73373708E12, 0.08333333333333333], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.06666666666666667], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Get SR DID-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Invite user-success", "isController": false}, {"data": [[1.73373732E12, 0.38333333333333336], [1.73373702E12, 0.35], [1.7337375E12, 0.7], [1.73373696E12, 0.016666666666666666], [1.73373744E12, 0.6833333333333333], [1.73373762E12, 0.13333333333333333], [1.73373714E12, 0.6333333333333333], [1.73373708E12, 0.5166666666666667], [1.73373756E12, 0.7333333333333333], [1.73373726E12, 0.3333333333333333], [1.7337372E12, 0.45], [1.73373738E12, 0.6]], "isOverall": false, "label": "Get policy import result-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373732E12, 0.03333333333333333], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.016666666666666666], [1.73373726E12, 0.1], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.1]], "isOverall": false, "label": "Link SR profile-0-success", "isController": false}, {"data": [[1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.08333333333333333], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.05], [1.73373726E12, 0.1], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.08333333333333333], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Generate user hedera data-success", "isController": true}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "WS open for sr key gen-success", "isController": false}, {"data": [[1.73373762E12, 0.016666666666666666]], "isOverall": false, "label": "Dry Run Policy-failure", "isController": false}, {"data": [[1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.05], [1.73373726E12, 0.1], [1.7337372E12, 0.06666666666666667], [1.7337369E12, 0.1], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Generate user keys-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.08333333333333333], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.11666666666666667], [1.7337369E12, 0.1]], "isOverall": false, "label": "Generate sr keys-0-success", "isController": false}, {"data": [[1.73373684E12, 0.21666666666666667], [1.73373732E12, 0.8], [1.73373702E12, 0.4666666666666667], [1.73373696E12, 0.4], [1.73373744E12, 0.03333333333333333], [1.73373714E12, 0.8666666666666667], [1.73373708E12, 0.65], [1.73373726E12, 0.9833333333333333], [1.7337372E12, 0.9333333333333333], [1.7337369E12, 0.4], [1.73373738E12, 0.4666666666666667]], "isOverall": false, "label": "Get SR link result-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Invite sr-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "WS open for sr key gen-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.08333333333333333], [1.73373726E12, 0.05], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.73373684E12, 0.21666666666666667], [1.73373732E12, 0.8], [1.73373702E12, 0.4666666666666667], [1.73373696E12, 0.4], [1.73373744E12, 0.03333333333333333], [1.73373714E12, 0.8666666666666667], [1.73373708E12, 0.65], [1.73373726E12, 0.9833333333333333], [1.7337372E12, 0.9333333333333333], [1.7337369E12, 0.4], [1.73373738E12, 0.4666666666666667]], "isOverall": false, "label": "Get SR link result-success", "isController": false}, {"data": [[1.73373732E12, 0.05], [1.73373702E12, 0.03333333333333333], [1.7337375E12, 0.11666666666666667], [1.73373744E12, 0.1], [1.73373762E12, 0.08333333333333333], [1.73373714E12, 0.1], [1.73373708E12, 0.05], [1.73373756E12, 0.08333333333333333], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.06666666666666667], [1.73373738E12, 0.08333333333333333]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.05], [1.73373726E12, 0.1], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.1], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Login by user OS-success", "isController": false}, {"data": [[1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.1], [1.7337375E12, 0.016666666666666666], [1.73373696E12, 0.11666666666666667], [1.73373744E12, 0.15], [1.73373714E12, 0.05], [1.73373708E12, 0.05], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.08333333333333333], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "WS open for user link-0-success", "isController": false}, {"data": [[1.73373732E12, 0.06666666666666667], [1.73373702E12, 0.08333333333333333], [1.7337375E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.13333333333333333], [1.73373714E12, 0.05], [1.73373708E12, 0.08333333333333333], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.06666666666666667], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Get SR DID-0-success", "isController": false}, {"data": [[1.73373732E12, 0.1], [1.73373702E12, 0.08333333333333333], [1.7337375E12, 0.016666666666666666], [1.73373696E12, 0.1], [1.73373744E12, 0.08333333333333333], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.05], [1.73373726E12, 0.05], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.06666666666666667], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.73373732E12, 0.06666666666666667], [1.73373702E12, 0.016666666666666666], [1.7337375E12, 0.06666666666666667], [1.73373744E12, 0.1], [1.73373762E12, 0.1], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.06666666666666667], [1.73373756E12, 0.08333333333333333], [1.73373726E12, 0.05], [1.73373768E12, 0.05], [1.7337372E12, 0.08333333333333333], [1.73373738E12, 0.06666666666666667]], "isOverall": false, "label": "Dry Run Policy-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.08333333333333333], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.06666666666666667], [1.73373726E12, 0.08333333333333333], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "User creation flow-success", "isController": true}, {"data": [[1.73373672E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-0-success", "isController": false}, {"data": [[1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.05], [1.73373726E12, 0.1], [1.7337372E12, 0.06666666666666667], [1.7337369E12, 0.1], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Generate user keys-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.7337375E12, 0.25], [1.73373744E12, 0.23333333333333334], [1.73373714E12, 0.25], [1.73373756E12, 0.1], [1.73373726E12, 0.21666666666666667], [1.7337372E12, 0.21666666666666667], [1.7337369E12, 0.1], [1.73373732E12, 0.1], [1.73373702E12, 0.21666666666666667], [1.73373696E12, 0.13333333333333333], [1.73373762E12, 0.08333333333333333], [1.73373708E12, 0.25], [1.73373678E12, 0.06666666666666667], [1.73373738E12, 0.18333333333333332]], "isOverall": false, "label": "Get SR Access Token-0-success", "isController": false}, {"data": [[1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.1], [1.7337375E12, 0.016666666666666666], [1.73373696E12, 0.11666666666666667], [1.73373744E12, 0.15], [1.73373714E12, 0.05], [1.73373708E12, 0.05], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.08333333333333333], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "WS open for user link-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373732E12, 0.016666666666666666], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.03333333333333333], [1.73373726E12, 0.08333333333333333], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "WS open for sr link-success", "isController": false}, {"data": [[1.73373732E12, 0.16666666666666666], [1.73373702E12, 0.08333333333333333], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.05], [1.73373726E12, 0.13333333333333333], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.08333333333333333], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Get user key gen result-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "Invite sr-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.7337375E12, 0.25], [1.73373744E12, 0.23333333333333334], [1.73373714E12, 0.25], [1.73373756E12, 0.1], [1.73373726E12, 0.21666666666666667], [1.7337372E12, 0.21666666666666667], [1.7337369E12, 0.1], [1.73373732E12, 0.1], [1.73373702E12, 0.21666666666666667], [1.73373696E12, 0.13333333333333333], [1.73373762E12, 0.08333333333333333], [1.73373708E12, 0.25], [1.73373678E12, 0.06666666666666667], [1.73373738E12, 0.18333333333333332]], "isOverall": false, "label": "Get SR Access Token-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.08333333333333333], [1.73373714E12, 0.1], [1.73373708E12, 0.08333333333333333], [1.73373678E12, 0.1], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.1], [1.7337369E12, 0.1]], "isOverall": false, "label": "User creation(SR side)-success", "isController": true}, {"data": [[1.73373732E12, 0.06666666666666667], [1.73373702E12, 0.08333333333333333], [1.7337375E12, 0.15], [1.73373696E12, 0.03333333333333333], [1.73373744E12, 0.11666666666666667], [1.73373714E12, 0.05], [1.73373708E12, 0.1], [1.73373756E12, 0.016666666666666666], [1.73373726E12, 0.06666666666666667], [1.7337372E12, 0.05], [1.73373738E12, 0.1]], "isOverall": false, "label": "WS open for policy import-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.08333333333333333], [1.73373708E12, 0.1], [1.73373678E12, 0.1], [1.73373726E12, 0.016666666666666666], [1.73373672E12, 0.016666666666666666], [1.7337372E12, 0.11666666666666667], [1.7337369E12, 0.1]], "isOverall": false, "label": "Generate sr keys-success", "isController": false}, {"data": [[1.73373732E12, 0.08333333333333333], [1.73373702E12, 0.06666666666666667], [1.73373696E12, 0.1], [1.73373744E12, 0.06666666666666667], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.05], [1.73373726E12, 0.1], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.1], [1.73373738E12, 0.11666666666666667]], "isOverall": false, "label": "Login by user OS-0-success", "isController": false}, {"data": [[1.73373732E12, 0.05], [1.73373702E12, 0.1], [1.7337375E12, 0.06666666666666667], [1.73373696E12, 0.06666666666666667], [1.73373744E12, 0.13333333333333333], [1.73373714E12, 0.05], [1.73373708E12, 0.08333333333333333], [1.73373726E12, 0.08333333333333333], [1.7337372E12, 0.06666666666666667], [1.73373738E12, 0.13333333333333333]], "isOverall": false, "label": "Link user profile-success", "isController": false}, {"data": [[1.73373732E12, 0.13333333333333333], [1.73373702E12, 0.15], [1.7337375E12, 0.13333333333333333], [1.73373696E12, 0.13333333333333333], [1.73373744E12, 0.18333333333333332], [1.73373714E12, 0.11666666666666667], [1.73373708E12, 0.15], [1.73373756E12, 0.016666666666666666], [1.73373726E12, 0.18333333333333332], [1.7337372E12, 0.13333333333333333], [1.7337369E12, 0.1], [1.73373738E12, 0.23333333333333334]], "isOverall": false, "label": "Verify link-0-success", "isController": false}, {"data": [[1.73373732E12, 0.06666666666666667], [1.73373702E12, 0.016666666666666666], [1.7337375E12, 0.06666666666666667], [1.73373744E12, 0.1], [1.73373762E12, 0.11666666666666667], [1.73373714E12, 0.06666666666666667], [1.73373708E12, 0.06666666666666667], [1.73373756E12, 0.08333333333333333], [1.73373726E12, 0.05], [1.73373768E12, 0.05], [1.7337372E12, 0.08333333333333333], [1.73373738E12, 0.06666666666666667]], "isOverall": false, "label": "Dry Run Policy-0-success", "isController": false}, {"data": [[1.73373684E12, 0.1], [1.73373732E12, 0.03333333333333333], [1.73373702E12, 0.1], [1.73373696E12, 0.1], [1.73373714E12, 0.1], [1.73373708E12, 0.1], [1.73373678E12, 0.016666666666666666], [1.73373726E12, 0.1], [1.7337372E12, 0.08333333333333333], [1.7337369E12, 0.1]], "isOverall": false, "label": "Link SR profile-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73373768E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.73373672E12, "maxY": 10.316666666666666, "series": [{"data": [[1.73373684E12, 4.533333333333333], [1.7337375E12, 4.4], [1.73373744E12, 6.383333333333334], [1.73373714E12, 10.066666666666666], [1.73373756E12, 2.4], [1.73373726E12, 8.166666666666666], [1.7337372E12, 10.316666666666666], [1.7337369E12, 6.766666666666667], [1.73373732E12, 6.4], [1.73373702E12, 9.35], [1.73373696E12, 8.2], [1.73373762E12, 0.95], [1.73373708E12, 9.783333333333333], [1.73373678E12, 3.55], [1.73373768E12, 0.15], [1.73373672E12, 0.5333333333333333], [1.73373738E12, 7.616666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.73373762E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73373768E12, "title": "Total Transactions Per Second"}},
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
