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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1023.0, "series": [{"data": [[700.0, 4.0], [800.0, 1.0], [3200.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [1100.0, 2.0], [5000.0, 1.0], [1300.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [2600.0, 1.0], [700.0, 3.0], [1500.0, 1.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[0.0, 277.0]], "isOverall": false, "label": "WS PP user link-0", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1200.0, 2.0], [700.0, 1.0], [3000.0, 1.0], [800.0, 1.0], [1800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[0.0, 277.0]], "isOverall": false, "label": "WS PP user link", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "WS PP user key gen-0", "isController": false}, {"data": [[900.0, 6.0], [1000.0, 1.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[600.0, 1.0], [2500.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [1000.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[600.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [700.0, 3.0], [800.0, 1.0], [3300.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [1100.0, 4.0], [1200.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "Get tenant id", "isController": false}, {"data": [[2100.0, 1.0], [8400.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [1800.0, 1.0], [3700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[600.0, 3.0], [1200.0, 1.0], [700.0, 1.0], [6000.0, 1.0], [1500.0, 1.0], [800.0, 3.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1100.0, 2.0], [1300.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [800.0, 2.0], [900.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[264500.0, 1.0], [263700.0, 1.0], [265100.0, 1.0], [5700.0, 1.0], [203500.0, 1.0], [221100.0, 1.0], [236300.0, 1.0], [243000.0, 1.0], [253200.0, 1.0], [256000.0, 1.0], [255100.0, 1.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[0.0, 1023.0]], "isOverall": false, "label": "WS read policy import result-0", "isController": false}, {"data": [[18400.0, 1.0], [2600.0, 1.0], [21000.0, 2.0], [10900.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [6900.0, 1.0], [3400.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[34000.0, 1.0], [37100.0, 1.0], [37000.0, 1.0], [39600.0, 1.0], [43500.0, 1.0], [43800.0, 1.0], [45400.0, 1.0], [46500.0, 1.0], [47600.0, 1.0], [28400.0, 1.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[2000.0, 20.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[0.0, 558.0]], "isOverall": false, "label": "WS read sr link result-0", "isController": false}, {"data": [[2000.0, 10.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 29.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "WS PP sr key gen", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[2600.0, 2.0], [2800.0, 8.0], [2700.0, 3.0], [2900.0, 6.0], [3000.0, 1.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[2000.0, 10.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[4600.0, 3.0], [4500.0, 1.0], [4800.0, 2.0], [4900.0, 1.0], [5200.0, 1.0], [5500.0, 1.0], [6300.0, 1.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "WS PP user key gen", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [700.0, 2.0], [800.0, 2.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[0.0, 11.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 90.0], [2300.0, 2.0], [2400.0, 1.0], [2800.0, 2.0], [2700.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "WS read user key gen result", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[10900.0, 1.0], [11500.0, 2.0], [11400.0, 1.0], [12100.0, 2.0], [11900.0, 2.0], [12000.0, 2.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "WS read sr key gen result-0", "isController": false}, {"data": [[8300.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 6.0], [16400.0, 1.0], [1100.0, 2.0], [1200.0, 3.0], [300.0, 1.0], [1300.0, 2.0], [21000.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [400.0, 6.0], [6400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[0.0, 277.0]], "isOverall": false, "label": "WS read user link result-0", "isController": false}, {"data": [[10800.0, 1.0], [11400.0, 1.0], [11700.0, 1.0], [11300.0, 1.0], [11900.0, 2.0], [12400.0, 1.0], [12500.0, 1.0], [13000.0, 2.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [900.0, 6.0], [1000.0, 2.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [700.0, 2.0], [400.0, 7.0], [800.0, 3.0], [900.0, 1.0], [500.0, 10.0], [1000.0, 2.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 2.0], [1400.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [1800.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[0.0, 234.0], [100.0, 103.0], [200.0, 36.0], [300.0, 22.0], [400.0, 8.0], [500.0, 10.0], [600.0, 4.0], [700.0, 3.0], [800.0, 3.0], [900.0, 1.0], [1000.0, 2.0], [1100.0, 1.0], [1300.0, 3.0], [1400.0, 2.0], [1500.0, 1.0], [1700.0, 1.0], [1900.0, 1.0], [2100.0, 1.0], [2400.0, 2.0], [2600.0, 1.0], [3400.0, 1.0], [3600.0, 1.0], [4400.0, 1.0], [5100.0, 1.0], [5200.0, 1.0], [5500.0, 2.0], [5800.0, 3.0], [6100.0, 2.0], [5900.0, 1.0], [6200.0, 1.0], [6500.0, 2.0], [6800.0, 1.0], [7000.0, 1.0], [7400.0, 2.0], [7700.0, 1.0], [7900.0, 2.0], [8200.0, 1.0], [8800.0, 3.0], [9200.0, 1.0], [8900.0, 1.0], [9000.0, 1.0], [9500.0, 1.0], [9600.0, 1.0], [9300.0, 1.0], [9800.0, 1.0], [9900.0, 1.0], [10200.0, 1.0], [10100.0, 2.0], [10700.0, 1.0], [10600.0, 1.0], [10300.0, 1.0], [10400.0, 2.0], [10800.0, 1.0], [11100.0, 1.0], [11500.0, 1.0], [11400.0, 1.0], [12100.0, 2.0], [12300.0, 1.0], [12500.0, 1.0], [12600.0, 1.0], [12400.0, 2.0], [12700.0, 1.0], [12800.0, 5.0], [13300.0, 1.0], [13000.0, 2.0], [12900.0, 1.0], [13700.0, 2.0], [13600.0, 1.0], [14000.0, 2.0], [14200.0, 2.0], [14800.0, 2.0], [14400.0, 1.0], [14600.0, 1.0], [15100.0, 2.0], [15400.0, 1.0], [15500.0, 1.0], [15800.0, 1.0], [16200.0, 2.0], [16000.0, 1.0], [15900.0, 1.0], [17000.0, 2.0], [17100.0, 1.0], [16800.0, 1.0], [16900.0, 1.0], [17400.0, 1.0], [16600.0, 2.0], [17500.0, 2.0], [17800.0, 1.0], [17900.0, 1.0], [18000.0, 2.0], [18900.0, 1.0], [19100.0, 3.0], [19000.0, 2.0], [19200.0, 1.0], [19800.0, 1.0], [19700.0, 1.0], [21000.0, 1.0], [20900.0, 1.0], [20800.0, 1.0], [21100.0, 1.0], [22100.0, 1.0], [21700.0, 1.0], [21600.0, 1.0], [22800.0, 2.0], [22600.0, 1.0], [23000.0, 1.0], [23900.0, 1.0]], "isOverall": false, "label": "WS read sr link result", "isController": false}, {"data": [[2100.0, 1.0], [2000.0, 9.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[2000.0, 10.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1700.0, 2.0], [900.0, 2.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[0.0, 558.0]], "isOverall": false, "label": "WS PP sr link", "isController": false}, {"data": [[0.0, 137.0], [600.0, 4.0], [9600.0, 1.0], [9800.0, 1.0], [10000.0, 1.0], [700.0, 2.0], [11100.0, 1.0], [10800.0, 1.0], [12100.0, 1.0], [800.0, 2.0], [900.0, 2.0], [14900.0, 1.0], [15700.0, 1.0], [15900.0, 1.0], [1000.0, 4.0], [16800.0, 1.0], [1100.0, 5.0], [19100.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [100.0, 25.0], [1700.0, 2.0], [1800.0, 1.0], [1900.0, 3.0], [2400.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [200.0, 21.0], [3400.0, 1.0], [3600.0, 1.0], [300.0, 20.0], [5100.0, 1.0], [4900.0, 1.0], [5400.0, 1.0], [6300.0, 1.0], [400.0, 9.0], [6400.0, 2.0], [7100.0, 1.0], [7300.0, 1.0], [7600.0, 1.0], [7700.0, 1.0], [500.0, 12.0]], "isOverall": false, "label": "WS read user link result", "isController": false}, {"data": [[36400.0, 1.0], [37900.0, 1.0], [39600.0, 1.0], [84900.0, 1.0], [51800.0, 1.0], [31300.0, 1.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[4100.0, 1.0], [4600.0, 2.0], [4500.0, 1.0], [4700.0, 1.0], [2900.0, 1.0], [6000.0, 1.0], [6100.0, 1.0], [3300.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[600.0, 1.0], [1200.0, 2.0], [700.0, 1.0], [800.0, 1.0], [400.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[0.0, 1023.0]], "isOverall": false, "label": "WS PP policy import", "isController": false}, {"data": [[0.0, 1023.0]], "isOverall": false, "label": "WS PP policy import-0", "isController": false}, {"data": [[600.0, 2.0], [1300.0, 1.0], [700.0, 1.0], [400.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[0.0, 23.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[38200.0, 1.0], [40500.0, 2.0], [86500.0, 1.0], [53000.0, 1.0], [32700.0, 1.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[0.0, 558.0]], "isOverall": false, "label": "WS PP sr link-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[0.0, 31.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "WS read user key gen result-0", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[37200.0, 1.0], [190700.0, 1.0], [203100.0, 1.0], [199500.0, 1.0], [210000.0, 1.0], [211500.0, 1.0], [209800.0, 1.0]], "isOverall": false, "label": "Requests for Import", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[0.0, 559.0], [600.0, 18.0], [700.0, 14.0], [800.0, 9.0], [900.0, 6.0], [1000.0, 9.0], [1100.0, 5.0], [1200.0, 2.0], [1300.0, 5.0], [1400.0, 2.0], [1500.0, 4.0], [1600.0, 2.0], [1800.0, 2.0], [1900.0, 2.0], [2000.0, 1.0], [2100.0, 4.0], [2200.0, 1.0], [2500.0, 2.0], [2600.0, 1.0], [2800.0, 3.0], [2900.0, 2.0], [3000.0, 3.0], [3100.0, 1.0], [3300.0, 1.0], [3200.0, 2.0], [3500.0, 1.0], [3600.0, 1.0], [4000.0, 1.0], [4100.0, 1.0], [4200.0, 1.0], [4400.0, 1.0], [4700.0, 1.0], [4800.0, 2.0], [5300.0, 1.0], [5200.0, 1.0], [5400.0, 3.0], [5500.0, 1.0], [5700.0, 2.0], [5800.0, 1.0], [6000.0, 1.0], [6600.0, 1.0], [6500.0, 1.0], [6400.0, 1.0], [7100.0, 1.0], [7000.0, 2.0], [7300.0, 2.0], [7500.0, 1.0], [7600.0, 1.0], [7800.0, 1.0], [8100.0, 3.0], [8300.0, 1.0], [8400.0, 1.0], [8600.0, 1.0], [8900.0, 1.0], [9100.0, 1.0], [8800.0, 1.0], [9300.0, 1.0], [9500.0, 1.0], [9600.0, 2.0], [10000.0, 72.0], [9900.0, 1.0], [100.0, 110.0], [200.0, 64.0], [300.0, 34.0], [400.0, 25.0], [500.0, 14.0]], "isOverall": false, "label": "WS read policy import result", "isController": false}, {"data": [[0.0, 90.0], [2100.0, 1.0], [2300.0, 1.0], [2500.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [3100.0, 1.0], [3300.0, 1.0], [1800.0, 1.0], [3900.0, 2.0]], "isOverall": false, "label": "WS read sr key gen result", "isController": false}, {"data": [[0.0, 23.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[37200.0, 1.0], [296400.0, 1.0], [235800.0, 1.0], [240000.0, 1.0], [243700.0, 1.0], [250500.0, 1.0], [249700.0, 1.0]], "isOverall": false, "label": "Policy import and dry run", "isController": false}, {"data": [[0.0, 20.0]], "isOverall": false, "label": "Get tenant id-0", "isController": false}, {"data": [[148400.0, 1.0], [165000.0, 1.0], [179400.0, 1.0], [174500.0, 1.0], [186100.0, 1.0], [182300.0, 1.0], [181900.0, 1.0], [186200.0, 1.0], [193000.0, 1.0], [127400.0, 1.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "WS PP sr key gen-0", "isController": false}, {"data": [[1100.0, 1.0], [2400.0, 1.0], [1500.0, 1.0], [7000.0, 1.0], [900.0, 5.0], [1000.0, 1.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[2200.0, 1.0], [600.0, 1.0], [2500.0, 1.0], [700.0, 1.0], [2800.0, 1.0], [3100.0, 2.0], [1000.0, 3.0], [1100.0, 2.0], [1200.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [6900.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [300.0, 3.0], [1300.0, 1.0], [700.0, 4.0], [400.0, 3.0], [800.0, 3.0], [1000.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[4300.0, 1.0], [1100.0, 2.0], [600.0, 6.0], [300.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [400.0, 1.0], [1600.0, 2.0], [800.0, 2.0], [500.0, 3.0], [1000.0, 2.0]], "isOverall": false, "label": "Login by SR", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 296400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 9.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 8222.0, "series": [{"data": [[0.0, 8222.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 357.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 471.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [[3.0, 9.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73037498E12, "maxY": 10.0, "series": [{"data": [[1.73037516E12, 0.0], [1.73037498E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.73037498E12, 1.0]], "isOverall": false, "label": "Tenant creation", "isController": false}, {"data": [[1.73037534E12, 2.7520661157024784], [1.73037516E12, 10.0], [1.73037498E12, 1.6716417910447765], [1.73037528E12, 6.385217391304341], [1.7303751E12, 9.626788036410924], [1.73037522E12, 8.847046413502104], [1.73037504E12, 5.544585987261143]], "isOverall": false, "label": "Users creation", "isController": false}, {"data": [[1.73037534E12, 2.3851351351351355], [1.73037564E12, 5.932203389830515], [1.73037546E12, 6.0], [1.73037558E12, 6.0], [1.7303754E12, 4.2346278317152075], [1.7303757E12, 1.0], [1.73037552E12, 6.0]], "isOverall": false, "label": "Policy workflow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7303757E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 296441.0, "series": [{"data": [[4.0, 1136.0], [8.0, 1106.0], [9.0, 1463.0], [10.0, 1076.4], [5.0, 1890.0], [3.0, 758.0], [6.0, 1531.3333333333333], [7.0, 2099.75]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[7.350000000000001, 1459.3500000000001]], "isOverall": false, "label": "Agree terms-Aggregated", "isController": false}, {"data": [[4.0, 617.0], [8.0, 461.0], [9.0, 1596.0], [5.0, 2664.0], [10.0, 867.0], [3.0, 754.0], [6.0, 962.0], [7.0, 758.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[7.2, 1041.3]], "isOverall": false, "label": "Link SR profile-Aggregated", "isController": false}, {"data": [[8.0, 0.375], [4.0, 0.0], [2.0, 0.33333333333333337], [9.0, 0.3076923076923077], [10.0, 0.3157894736842105], [5.0, 0.30000000000000004], [6.0, 0.28301886792452824], [3.0, 0.3278688524590164], [7.0, 0.2692307692307693]], "isOverall": false, "label": "WS PP user link-0", "isController": false}, {"data": [[6.299638989169669, 0.3140794223826712]], "isOverall": false, "label": "WS PP user link-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.5], [4.0, 0.5], [5.0, 0.0], [6.0, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[3.4285714285714284, 0.28571428571428575]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [8.0, 1.0], [9.0, 0.0], [10.0, 2.2], [5.0, 0.5], [3.0, 0.0], [6.0, 1.0], [7.0, 1.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[7.350000000000001, 1.1]], "isOverall": false, "label": "Agree terms-0-Aggregated", "isController": false}, {"data": [[1.0, 830.0], [2.0, 1009.5], [4.0, 1399.5], [5.0, 1273.0], [6.0, 3059.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[3.4285714285714284, 1425.7142857142858]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[8.0, 0.475], [4.0, 1.0], [2.0, 0.49999999999999994], [9.0, 0.5384615384615387], [10.0, 0.47368421052631576], [5.0, 0.39999999999999997], [6.0, 0.4339622641509434], [3.0, 0.524590163934426], [7.0, 0.6153846153846154]], "isOverall": false, "label": "WS PP user link", "isController": false}, {"data": [[6.29963898916967, 0.49458483754512644]], "isOverall": false, "label": "WS PP user link-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [4.0, 0.0], [8.0, 0.5], [9.0, 0.5], [10.0, 0.25], [5.0, 0.0], [3.0, 0.0], [6.0, 0.5], [7.0, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[7.1, 0.3]], "isOverall": false, "label": "Get Access Token-0-Aggregated", "isController": false}, {"data": [[8.0, 0.3461538461538461], [9.0, 0.0], [10.0, 0.45], [6.0, 0.16666666666666666], [7.0, 0.5714285714285715]], "isOverall": false, "label": "WS PP user key gen-0", "isController": false}, {"data": [[7.76, 0.31000000000000005]], "isOverall": false, "label": "WS PP user key gen-0-Aggregated", "isController": false}, {"data": [[1.0, 927.0], [2.0, 936.0], [4.0, 974.5], [5.0, 929.0], [6.0, 919.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[3.4285714285714284, 942.2857142857143]], "isOverall": false, "label": "WS open for policy import-Aggregated", "isController": false}, {"data": [[8.0, 1373.0], [9.0, 1056.0], [10.0, 820.5], [6.0, 1534.0], [7.0, 854.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[7.7, 1175.3]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[1.0, 1182.5], [2.0, 1267.0], [4.0, 892.0], [8.0, 1964.0], [9.0, 2364.0], [5.0, 889.5], [10.0, 1249.0], [3.0, 773.5], [6.0, 1771.5], [7.0, 911.0]], "isOverall": false, "label": "Get tenant id", "isController": false}, {"data": [[5.500000000000001, 1326.3999999999999]], "isOverall": false, "label": "Get tenant id-Aggregated", "isController": false}, {"data": [[8.0, 1812.0], [9.0, 1410.0], [10.0, 1394.5], [5.0, 5284.0], [6.0, 2410.0], [3.0, 1526.0], [7.0, 3043.5]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[7.000000000000001, 2660.2]], "isOverall": false, "label": "Get SR DID-Aggregated", "isController": false}, {"data": [[8.0, 656.0], [4.0, 1521.0], [9.0, 718.0], [10.0, 747.0], [5.0, 6020.0], [6.0, 644.0], [3.0, 1245.0], [7.0, 848.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[6.9, 1399.4]], "isOverall": false, "label": "Link user profile-Aggregated", "isController": false}, {"data": [[1.0, 1319.0], [2.0, 1124.0], [4.0, 749.0], [8.0, 1425.0], [5.0, 1897.0], [10.0, 851.5], [3.0, 985.0], [6.0, 1110.0], [7.0, 987.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[5.6, 1129.9]], "isOverall": false, "label": "Invite user-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [5.0, 1.0], [6.0, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[3.4285714285714284, 0.14285714285714288]], "isOverall": false, "label": "WS open for policy import-0-Aggregated", "isController": false}, {"data": [[1.0, 5710.0], [8.0, 243051.0], [4.0, 263758.0], [2.0, 260154.5], [9.0, 221183.0], [10.0, 203534.0], [5.0, 253252.0], [6.0, 264552.0], [3.0, 236364.0], [7.0, 256045.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[5.181818181818182, 224341.63636363638]], "isOverall": false, "label": "User creation flow-Aggregated", "isController": true}, {"data": [[1.0, 1349.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.0, 1349.0]], "isOverall": false, "label": "Setup ipfs-Aggregated", "isController": false}, {"data": [[1.0, 0.5714285714285714], [2.0, 0.15789473684210525], [4.0, 0.1724137931034483], [5.0, 0.45454545454545453], [3.0, 0.15217391304347833], [6.0, 0.3216245883644346]], "isOverall": false, "label": "WS read policy import result-0", "isController": false}, {"data": [[5.689149560117302, 0.3098729227761489]], "isOverall": false, "label": "WS read policy import result-0-Aggregated", "isController": false}, {"data": [[1.0, 10557.0], [4.0, 11820.333333333332], [2.0, 5117.5], [5.0, 3014.0], [3.0, 21020.0], [6.0, 3502.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[3.2, 9434.600000000002]], "isOverall": false, "label": "Get tenant-Aggregated", "isController": true}, {"data": [[8.0, 45473.0], [4.0, 47647.0], [2.0, 35578.0], [9.0, 39680.0], [10.0, 43547.0], [5.0, 37107.0], [6.0, 43852.0], [3.0, 28424.0], [7.0, 46533.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[5.6, 40341.9]], "isOverall": false, "label": "Link user-Aggregated", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "User creation(SR side)-Aggregated", "isController": true}, {"data": [[2.0, 2056.0], [4.0, 2070.0], [8.0, 2073.5], [9.0, 2070.5], [10.0, 2073.5], [5.0, 2085.0], [3.0, 2059.0], [6.0, 2077.5], [7.0, 2062.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[7.1, 2071.65]], "isOverall": false, "label": "Get Access Token-Aggregated", "isController": false}, {"data": [[4.0, 1.0666666666666667], [8.0, 0.541176470588235], [9.0, 0.5842696629213484], [5.0, 0.4000000000000001], [10.0, 0.5856573705179283], [3.0, 0.2222222222222222], [6.0, 0.5151515151515151], [7.0, 0.32786885245901637]], "isOverall": false, "label": "WS read sr link result-0", "isController": false}, {"data": [[8.562724014336911, 0.5483870967741937]], "isOverall": false, "label": "WS read sr link result-0-Aggregated", "isController": false}, {"data": [[8.0, 2074.5], [9.0, 2068.0], [10.0, 2063.5], [6.0, 2067.3333333333335], [7.0, 2072.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[7.7, 2069.0]], "isOverall": false, "label": "Get user keys-Aggregated", "isController": false}, {"data": [[8.0, 0.33333333333333337], [9.0, 2.0], [10.0, 0.5], [6.0, 0.33333333333333337], [7.0, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[7.8, 0.5000000000000001]], "isOverall": false, "label": "WS open for user key gen-0-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "User creation(user side)-Aggregated", "isController": true}, {"data": [[1.0, 0.2], [2.0, 0.0], [4.0, 0.33333333333333337], [8.0, 0.0], [9.0, 0.0], [5.0, 0.33333333333333337], [10.0, 0.0], [3.0, 0.0], [6.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[4.655172413793104, 0.10344827586206896]], "isOverall": false, "label": "Get Admin Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 0.20000000000000004], [4.0, 0.3], [8.0, 0.3], [9.0, 0.19999999999999998], [5.0, 0.19999999999999998], [10.0, 0.3333333333333333], [3.0, 0.3], [6.0, 0.16666666666666669], [7.0, 0.3]], "isOverall": false, "label": "WS PP sr key gen", "isController": false}, {"data": [[6.559999999999998, 0.27]], "isOverall": false, "label": "WS PP sr key gen-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [8.0, 0.0], [9.0, 0.0], [5.0, 0.0], [10.0, 0.0], [3.0, 1.0], [6.0, 0.0], [7.0, 1.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[5.5, 0.20000000000000004]], "isOverall": false, "label": "Accept sr-0-Aggregated", "isController": false}, {"data": [[2.0, 2925.0], [4.0, 3023.0], [8.0, 2865.0], [9.0, 2815.0], [10.0, 2915.25], [5.0, 2694.0], [3.0, 2892.0], [6.0, 2824.75], [7.0, 2829.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[7.1499999999999995, 2859.6000000000004]], "isOverall": false, "label": "Login by SR OS-Aggregated", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.0, 0.0]], "isOverall": false, "label": "Create new tenant-0-Aggregated", "isController": false}, {"data": [[4.0, 2056.0], [8.0, 2082.0], [9.0, 2075.0], [5.0, 2069.5], [10.0, 2069.0], [3.0, 2066.0], [7.0, 2067.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[7.1, 2069.2000000000003]], "isOverall": false, "label": "Get sr keys-Aggregated", "isController": false}, {"data": [[8.0, 3.0], [9.0, 5.0], [10.0, 2.0], [6.0, 2.0], [7.0, 3.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[7.8, 2.6999999999999997]], "isOverall": false, "label": "WS open for user key gen-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [4.0, 1.0], [2.0, 1.0], [9.0, 1.0], [10.0, 3.0], [5.0, 1.0], [6.0, 0.5], [3.0, 1.0], [7.0, 0.5]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[6.850000000000002, 1.1500000000000004]], "isOverall": false, "label": "Verify link-0-Aggregated", "isController": false}, {"data": [[4.0, 0.0], [2.0, 0.0], [1.0, 1.0], [5.0, 0.0], [6.0, 1.0], [3.0, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[3.5, 0.33333333333333337]], "isOverall": false, "label": "Dry Run Policy-0-Aggregated", "isController": false}, {"data": [[1.0, 4693.0], [2.0, 4865.0], [4.0, 4687.0], [8.0, 4916.0], [9.0, 5286.0], [5.0, 4549.0], [10.0, 4830.0], [3.0, 4691.0], [6.0, 6391.0], [7.0, 5554.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[5.5, 5046.200000000001]], "isOverall": false, "label": "Invite and accept SR-Aggregated", "isController": true}, {"data": [[8.0, 0.4615384615384616], [9.0, 0.39999999999999997], [10.0, 0.5], [6.0, 0.4], [7.0, 0.7142857142857142]], "isOverall": false, "label": "WS PP user key gen", "isController": false}, {"data": [[7.76, 0.48]], "isOverall": false, "label": "WS PP user key gen-Aggregated", "isController": false}, {"data": [[1.0, 522.0], [2.0, 821.0], [4.0, 599.0], [8.0, 1218.0], [9.0, 779.0], [5.0, 477.0], [10.0, 880.0], [3.0, 459.0], [6.0, 774.0], [7.0, 1155.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[5.5, 768.4]], "isOverall": false, "label": "Accept sr-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "User creation(admin side)-Aggregated", "isController": true}, {"data": [[8.0, 215.44000000000005], [9.0, 295.0], [10.0, 278.5], [6.0, 280.6666666666667], [7.0, 333.9333333333334]], "isOverall": false, "label": "WS read user key gen result", "isController": false}, {"data": [[7.749999999999999, 273.34999999999997]], "isOverall": false, "label": "WS read user key gen result-Aggregated", "isController": false}, {"data": [[1.0, 2549.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.0, 2549.0]], "isOverall": false, "label": "Create new tenant-Aggregated", "isController": false}, {"data": [[8.0, 0.0], [9.0, 1.0], [10.0, 0.5], [6.0, 0.6666666666666666], [7.0, 0.5]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[7.7, 0.5]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[4.0, 0.0], [8.0, 0.0], [9.0, 0.0], [5.0, 0.0], [10.0, 0.33333333333333337], [3.0, 0.0], [6.0, 0.0], [7.0, 1.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[7.2, 0.19999999999999998]], "isOverall": false, "label": "Link SR profile-0-Aggregated", "isController": false}, {"data": [[4.0, 0.0], [8.0, 0.0], [9.0, 0.0], [5.0, 0.0], [10.0, 0.0], [3.0, 0.0], [7.0, 1.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[7.1, 0.10000000000000002]], "isOverall": false, "label": "Get sr keys-0-Aggregated", "isController": false}, {"data": [[8.0, 11819.0], [9.0, 11978.0], [10.0, 11891.5], [6.0, 11865.0], [7.0, 11498.5]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[7.7, 11799.099999999999]], "isOverall": false, "label": "Generate user hedera data-Aggregated", "isController": true}, {"data": [[2.0, 0.4], [4.0, 0.0], [8.0, 0.39999999999999997], [9.0, 0.19999999999999998], [5.0, 0.10000000000000002], [10.0, 0.24000000000000005], [3.0, 0.19999999999999998], [6.0, 1.6], [7.0, 0.09999999999999999]], "isOverall": false, "label": "WS read sr key gen result-0", "isController": false}, {"data": [[6.6, 0.27999999999999997]], "isOverall": false, "label": "WS read sr key gen result-0-Aggregated", "isController": false}, {"data": [[1.0, 1014.75], [2.0, 5171.2], [4.0, 5933.75], [8.0, 758.0], [9.0, 811.0], [5.0, 952.3333333333333], [10.0, 964.0], [3.0, 7750.5], [6.0, 992.0], [7.0, 1063.5]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[4.612903225806451, 3150.903225806452]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[8.0, 0.44999999999999996], [4.0, 0.0], [2.0, 0.7142857142857143], [9.0, 0.6923076923076924], [10.0, 1.0000000000000002], [5.0, 0.6666666666666667], [6.0, 0.490566037735849], [3.0, 0.6166666666666668], [7.0, 0.84]], "isOverall": false, "label": "WS read user link result-0", "isController": false}, {"data": [[6.259927797833937, 0.6534296028880869]], "isOverall": false, "label": "WS read user link result-0-Aggregated", "isController": false}, {"data": [[4.0, 11944.0], [8.0, 11779.0], [9.0, 13056.0], [5.0, 11680.0], [10.0, 11958.666666666666], [3.0, 11499.0], [7.0, 13070.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[7.1, 12058.4]], "isOverall": false, "label": "Generate sr hedera data-Aggregated", "isController": true}, {"data": [[2.0, 0.0], [4.0, 0.0], [8.0, 0.0], [9.0, 0.33333333333333337], [10.0, 0.0], [5.0, 0.0], [3.0, 0.0], [6.0, 0.25], [7.0, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[7.1499999999999995, 0.1]], "isOverall": false, "label": "Login by SR OS-0-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 1.0], [10.0, 0.0], [5.0, 1.0], [6.0, 0.0], [3.0, 1.0], [7.0, 0.5]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[7.000000000000001, 0.6]], "isOverall": false, "label": "Get SR DID-0-Aggregated", "isController": false}, {"data": [[8.0, 0.0], [9.0, 1.0], [10.0, 0.0], [6.0, 0.6666666666666666], [7.0, 1.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[7.7, 0.5]], "isOverall": false, "label": "Get user keys-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 1.0], [8.0, 0.0], [5.0, 1.0], [10.0, 0.0], [3.0, 1.0], [6.0, 0.0], [7.0, 1.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[5.6, 0.39999999999999997]], "isOverall": false, "label": "Invite user-0-Aggregated", "isController": false}, {"data": [[4.0, 961.0], [8.0, 1015.0], [9.0, 937.0], [5.0, 966.0], [10.0, 1140.6666666666667], [3.0, 933.0], [6.0, 909.0], [7.0, 933.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[7.2, 1007.6]], "isOverall": false, "label": "WS open for sr link-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [8.0, 1.0], [9.0, 1.0], [5.0, 0.0], [10.0, 0.0], [3.0, 0.0], [6.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[5.5, 0.19999999999999998]], "isOverall": false, "label": "Invite sr-0-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [4.0, 1.0], [9.0, 1.0], [10.0, 2.5], [5.0, 2.0], [6.0, 0.0], [3.0, 0.0], [7.0, 1.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[6.9, 1.2]], "isOverall": false, "label": "Link user profile-0-Aggregated", "isController": false}, {"data": [[1.0, 478.6], [2.0, 536.25], [4.0, 710.6666666666666], [8.0, 445.5], [9.0, 800.5], [5.0, 641.6666666666666], [10.0, 544.0], [3.0, 529.3333333333334], [6.0, 844.6666666666666], [7.0, 496.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[4.655172413793104, 596.1724137931035]], "isOverall": false, "label": "Get Admin Access Token-Aggregated", "isController": false}, {"data": [[1.0, 1473.0], [2.0, 1262.0], [4.0, 1436.0], [8.0, 1006.0], [9.0, 1159.0], [5.0, 1858.0], [10.0, 1277.0], [3.0, 1627.0], [6.0, 1094.0], [7.0, 1513.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[5.5, 1370.5]], "isOverall": false, "label": "Invite sr-Aggregated", "isController": false}, {"data": [[4.0, 895.2666666666665], [8.0, 2683.847058823529], [9.0, 2956.1685393258417], [5.0, 888.9333333333333], [10.0, 3926.8884462151386], [3.0, 199.33333333333337], [6.0, 1202.30303030303], [7.0, 1790.8524590163934]], "isOverall": false, "label": "WS read sr link result", "isController": false}, {"data": [[8.562724014336911, 2964.784946236559]], "isOverall": false, "label": "WS read sr link result-Aggregated", "isController": false}, {"data": [[8.0, 2069.6666666666665], [9.0, 2065.0], [10.0, 2072.0], [6.0, 2083.3333333333335], [7.0, 2071.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[7.8, 2073.9]], "isOverall": false, "label": "Generate user keys-Aggregated", "isController": false}, {"data": [[2.0, 2068.0], [4.0, 2070.0], [8.0, 2055.0], [9.0, 2061.0], [5.0, 2060.0], [10.0, 2071.0], [3.0, 2061.0], [6.0, 2076.0], [7.0, 2072.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[6.3999999999999995, 2066.5]], "isOverall": false, "label": "Generate sr keys-Aggregated", "isController": false}, {"data": [[6.0, 1319.8333333333333]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[6.0, 1319.8333333333333]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [4.0, 0.0], [8.0, 0.0], [9.0, 0.0], [5.0, 0.0], [10.0, 0.5], [3.0, 1.0], [6.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[6.3999999999999995, 0.30000000000000004]], "isOverall": false, "label": "Generate sr keys-0-Aggregated", "isController": false}, {"data": [[4.0, 0.3125], [8.0, 0.4698795180722891], [9.0, 0.409090909090909], [5.0, 0.25000000000000006], [10.0, 0.8174603174603176], [3.0, 0.19999999999999998], [6.0, 0.4411764705882353], [7.0, 0.3728813559322034]], "isOverall": false, "label": "WS PP sr link", "isController": false}, {"data": [[8.543010752688165, 0.5896057347670245]], "isOverall": false, "label": "WS PP sr link-Aggregated", "isController": false}, {"data": [[8.0, 1205.4249999999997], [4.0, 45.0], [2.0, 918.7142857142857], [9.0, 1306.846153846154], [10.0, 1100.7027027027027], [5.0, 925.9523809523811], [6.0, 1010.056603773585], [3.0, 573.35], [7.0, 1736.76]], "isOverall": false, "label": "WS read user link result", "isController": false}, {"data": [[6.259927797833937, 1034.7509025270754]], "isOverall": false, "label": "WS read user link result-Aggregated", "isController": false}, {"data": [[4.0, 36455.0], [2.0, 51841.0], [1.0, 84938.0], [5.0, 39640.0], [6.0, 31315.0], [3.0, 37991.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[3.5, 47030.0]], "isOverall": false, "label": "Dry Run Policy-Aggregated", "isController": false}, {"data": [[1.0, 4160.0], [2.0, 4682.0], [4.0, 2954.0], [9.0, 6015.0], [5.0, 4796.0], [10.0, 5329.5], [3.0, 3350.0], [7.0, 4099.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[5.8, 4481.4]], "isOverall": false, "label": "Invite and accept user-Aggregated", "isController": true}, {"data": [[8.0, 485.0], [9.0, 930.0], [10.0, 735.5], [6.0, 1236.3333333333333], [7.0, 1484.5]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[7.7, 1004.9000000000001]], "isOverall": false, "label": "Get User Access Token-Aggregated", "isController": false}, {"data": [[1.0, 0.375], [2.0, 0.33333333333333337], [4.0, 0.4516129032258066], [5.0, 0.5833333333333334], [3.0, 0.2666666666666668], [6.0, 0.30463576158940425]], "isOverall": false, "label": "WS PP policy import", "isController": false}, {"data": [[5.674486803519044, 0.31182795698924726]], "isOverall": false, "label": "WS PP policy import-Aggregated", "isController": false}, {"data": [[1.0, 0.375], [2.0, 0.23809523809523808], [4.0, 0.3548387096774194], [5.0, 0.41666666666666663], [3.0, 0.15555555555555559], [6.0, 0.17880794701986757]], "isOverall": false, "label": "WS PP policy import-0", "isController": false}, {"data": [[5.674486803519044, 0.18866080156402742]], "isOverall": false, "label": "WS PP policy import-0-Aggregated", "isController": false}, {"data": [[1.0, 676.0], [2.0, 1095.0], [4.0, 517.0], [9.0, 947.0], [5.0, 599.0], [10.0, 756.0], [3.0, 712.0], [7.0, 923.5]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[5.8, 790.5]], "isOverall": false, "label": "Accept user-Aggregated", "isController": false}, {"data": [[4.0, 0.0], [8.0, 1.0], [1.0, 0.5], [2.0, 1.0], [9.0, 0.0], [5.0, 0.25], [10.0, 0.0], [3.0, 1.0], [6.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[5.608695652173913, 0.21739130434782608]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [4.0, 0.0], [8.0, 0.0], [9.0, 0.0], [5.0, 1.0], [10.0, 0.0], [3.0, 0.0], [6.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[6.3999999999999995, 0.10000000000000002]], "isOverall": false, "label": "WS open for sr key gen-0-Aggregated", "isController": false}, {"data": [[4.0, 38284.0], [2.0, 53053.0], [1.0, 86575.0], [5.0, 40506.0], [6.0, 32728.0], [3.0, 40530.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[3.5, 48612.666666666664]], "isOverall": false, "label": "Requests for DryRun-Aggregated", "isController": true}, {"data": [[2.0, 3.0], [4.0, 1.0], [8.0, 2.0], [9.0, 1.0], [5.0, 2.0], [10.0, 1.5], [3.0, 1.0], [6.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[6.3999999999999995, 1.7]], "isOverall": false, "label": "WS open for sr key gen-Aggregated", "isController": false}, {"data": [[4.0, 0.1875], [8.0, 0.3012048192771084], [9.0, 0.29545454545454547], [5.0, 0.0625], [10.0, 0.6468253968253966], [3.0, 0.09999999999999999], [6.0, 0.23529411764705885], [7.0, 0.25423728813559326]], "isOverall": false, "label": "WS PP sr link-0", "isController": false}, {"data": [[8.543010752688167, 0.4336917562724016]], "isOverall": false, "label": "WS PP sr link-0-Aggregated", "isController": false}, {"data": [[8.0, 0.33333333333333337], [9.0, 0.0], [10.0, 0.0], [6.0, 0.33333333333333337], [7.0, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[7.8, 0.19999999999999998]], "isOverall": false, "label": "Generate user keys-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [5.0, 0.0], [6.0, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[3.2857142857142856, 0.0]], "isOverall": false, "label": "Get Tenant Id-0-Aggregated", "isController": false}, {"data": [[1.0, 0.25], [2.0, 0.2], [4.0, 0.0], [8.0, 0.5], [9.0, 1.0], [5.0, 0.0], [10.0, 0.0], [3.0, 0.0], [6.0, 0.0], [7.0, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[4.612903225806451, 0.16129032258064518]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[8.0, 0.32000000000000006], [9.0, 0.3], [10.0, 0.25000000000000006], [6.0, 0.23333333333333334], [7.0, 0.26666666666666666]], "isOverall": false, "label": "WS read user key gen result-0", "isController": false}, {"data": [[7.749999999999999, 0.26999999999999996]], "isOverall": false, "label": "WS read user key gen result-0-Aggregated", "isController": false}, {"data": [[6.0, 0.16666666666666669]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[6.0, 0.16666666666666669]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[3.0, 37242.0], [6.0, 204143.3333333333]], "isOverall": false, "label": "Requests for Import", "isController": false}, {"data": [[5.571428571428571, 180300.28571428574]], "isOverall": false, "label": "Requests for Import-Aggregated", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.0, 1.0]], "isOverall": false, "label": "Setup ipfs-0-Aggregated", "isController": false}, {"data": [[1.0, 71.28571428571428], [2.0, 824.1578947368421], [4.0, 651.5172413793101], [5.0, 3753.0], [3.0, 1029.6739130434783], [6.0, 1209.3962678375422]], "isOverall": false, "label": "WS read policy import result", "isController": false}, {"data": [[5.689149560117302, 1197.9081133919838]], "isOverall": false, "label": "WS read policy import result-Aggregated", "isController": false}, {"data": [[2.0, 237.9], [4.0, 326.1], [8.0, 261.7], [9.0, 402.90000000000003], [5.0, 195.0], [10.0, 341.56], [3.0, 287.2], [6.0, 10.4], [7.0, 401.1000000000001]], "isOverall": false, "label": "WS read sr key gen result", "isController": false}, {"data": [[6.6, 297.09999999999997]], "isOverall": false, "label": "WS read sr key gen result-Aggregated", "isController": false}, {"data": [[4.0, 0.33333333333333337], [8.0, 0.0], [1.0, 0.0], [2.0, 1.0], [9.0, 0.0], [5.0, 0.33333333333333337], [10.0, 0.33333333333333337], [3.0, 1.0], [6.0, 0.5], [7.0, 1.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[5.521739130434783, 0.39130434782608686]], "isOverall": false, "label": "Get SR Access Token-0-Aggregated", "isController": false}, {"data": [[1.0, 1248.5], [2.0, 1418.0], [4.0, 1644.0], [5.0, 967.0], [6.0, 1171.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[3.2857142857142856, 1334.4285714285713]], "isOverall": false, "label": "Get Tenant Id-Aggregated", "isController": false}, {"data": [[4.0, 249798.0], [2.0, 243788.0], [1.0, 296441.0], [5.0, 250560.0], [3.0, 138665.0], [6.0, 235861.0]], "isOverall": false, "label": "Policy import and dry run", "isController": false}, {"data": [[3.428571428571429, 221968.2857142857]], "isOverall": false, "label": "Policy import and dry run-Aggregated", "isController": false}, {"data": [[1.0, 0.5], [2.0, 0.0], [4.0, 0.5], [8.0, 0.5], [9.0, 0.5], [5.0, 0.0], [10.0, 0.5], [3.0, 0.0], [6.0, 0.5], [7.0, 0.0]], "isOverall": false, "label": "Get tenant id-0", "isController": false}, {"data": [[5.500000000000001, 0.3]], "isOverall": false, "label": "Get tenant id-0-Aggregated", "isController": false}, {"data": [[8.0, 184266.5], [9.0, 172261.0], [10.0, 137932.0], [6.0, 186278.0], [7.0, 183193.66666666666]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[8.100000000000001, 172477.8]], "isOverall": false, "label": "Link SR-Aggregated", "isController": true}, {"data": [[2.0, 0.10000000000000002], [4.0, 0.19999999999999998], [8.0, 0.10000000000000002], [9.0, 0.19999999999999998], [5.0, 0.1], [10.0, 0.125], [3.0, 0.3], [6.0, 0.16666666666666669], [7.0, 0.3]], "isOverall": false, "label": "WS PP sr key gen-0", "isController": false}, {"data": [[6.559999999999998, 0.17000000000000004]], "isOverall": false, "label": "WS PP sr key gen-0-Aggregated", "isController": false}, {"data": [[8.0, 934.0], [9.0, 2400.0], [10.0, 951.0], [5.0, 7086.0], [6.0, 947.5], [7.0, 1263.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[7.5, 1800.6]], "isOverall": false, "label": "WS open for user link-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [8.0, 1.0], [9.0, 1.0], [5.0, 1.0], [10.0, 0.33333333333333337], [3.0, 0.0], [6.0, 1.0], [7.0, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[7.2, 0.6]], "isOverall": false, "label": "WS open for sr link-0-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 1.0], [10.0, 1.0], [5.0, 1.0], [6.0, 0.5], [7.0, 0.3333333333333333]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[7.5, 0.7]], "isOverall": false, "label": "WS open for user link-0-Aggregated", "isController": false}, {"data": [[8.0, 1.0], [9.0, 1.0], [10.0, 0.5], [6.0, 0.6666666666666666], [7.0, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[7.7, 0.6000000000000001]], "isOverall": false, "label": "Get User Access Token-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 1.0], [9.0, 0.0], [5.0, 1.0], [10.0, 0.0], [3.0, 0.0], [7.0, 0.5]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[5.8, 0.3]], "isOverall": false, "label": "Accept user-0-Aggregated", "isController": false}, {"data": [[8.0, 1378.3333333333333], [4.0, 1562.0], [2.0, 3112.0], [9.0, 1259.6666666666667], [10.0, 1271.6666666666667], [5.0, 1017.0], [6.0, 1738.5], [3.0, 666.0], [7.0, 3497.75]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[6.850000000000002, 1933.2999999999997]], "isOverall": false, "label": "Verify link-Aggregated", "isController": false}, {"data": [[4.0, 822.0], [8.0, 544.0], [1.0, 652.5], [2.0, 328.0], [9.0, 579.0], [5.0, 681.0], [10.0, 767.0], [3.0, 447.0], [6.0, 695.75], [7.0, 769.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[5.521739130434783, 678.608695652174]], "isOverall": false, "label": "Get SR Access Token-Aggregated", "isController": false}, {"data": [[4.0, 947.0], [8.0, 507.0], [1.0, 651.0], [2.0, 1136.0], [9.0, 1156.0], [5.0, 834.0], [10.0, 1991.0], [3.0, 605.0], [6.0, 898.0], [7.0, 1336.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[5.608695652173913, 1025.217391304348]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 11.35, "minX": 1.73037498E12, "maxY": 85788.65, "series": [{"data": [[1.73037534E12, 33011.8], [1.73037564E12, 32076.166666666668], [1.73037498E12, 2064.1666666666665], [1.73037528E12, 85788.65], [1.73037558E12, 63119.78333333333], [1.73037522E12, 62149.46666666667], [1.73037552E12, 18998.416666666668], [1.73037516E12, 45629.3], [1.73037546E12, 29822.5], [1.7303751E12, 38128.8], [1.7303754E12, 21817.333333333332], [1.7303757E12, 299.3833333333333], [1.73037504E12, 42411.25]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73037534E12, 190.31666666666666], [1.73037564E12, 223.61666666666667], [1.73037498E12, 235.43333333333334], [1.73037528E12, 711.7666666666667], [1.73037558E12, 113.1], [1.73037522E12, 357.0], [1.73037552E12, 12.3], [1.73037516E12, 244.25], [1.73037546E12, 19.3], [1.7303751E12, 623.5333333333333], [1.7303754E12, 410.3666666666667], [1.7303757E12, 11.35], [1.73037504E12, 1178.9833333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7303757E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73037498E12, "maxY": 296441.0, "series": [{"data": [[1.73037516E12, 785.0], [1.73037528E12, 2385.8333333333335], [1.7303751E12, 1293.5], [1.73037522E12, 1309.5], [1.73037504E12, 918.1666666666666]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7303751E12, 931.6], [1.73037504E12, 1151.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73037534E12, 0.33928571428571425], [1.73037516E12, 0.31818181818181823], [1.73037528E12, 0.2888888888888889], [1.73037522E12, 0.3437500000000001]], "isOverall": false, "label": "WS PP user link-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.33333333333333337]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73037516E12, 0.5], [1.73037528E12, 0.8333333333333334], [1.7303751E12, 2.5], [1.73037522E12, 0.5], [1.73037504E12, 0.8333333333333334]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73037534E12, 830.0], [1.7303754E12, 1525.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73037534E12, 0.5178571428571428], [1.73037516E12, 0.40909090909090906], [1.73037528E12, 0.4666666666666665], [1.73037522E12, 0.5625000000000001]], "isOverall": false, "label": "WS PP user link", "isController": false}, {"data": [[1.73037516E12, 0.5], [1.73037498E12, 0.0], [1.73037528E12, 0.6], [1.7303751E12, 0.0], [1.73037522E12, 0.6666666666666667], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73037516E12, 0.45], [1.73037528E12, 0.29629629629629645], [1.73037522E12, 0.23076923076923075]], "isOverall": false, "label": "WS PP user key gen-0", "isController": false}, {"data": [[1.73037534E12, 927.0], [1.7303754E12, 944.8333333333334]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73037516E12, 820.5], [1.73037528E12, 1372.1666666666667], [1.73037522E12, 939.5]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73037498E12, 1126.0], [1.7303751E12, 1970.0], [1.73037504E12, 1108.3333333333333]], "isOverall": false, "label": "Get tenant id", "isController": false}, {"data": [[1.73037516E12, 1394.5], [1.73037528E12, 3431.8333333333335], [1.73037522E12, 1611.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73037534E12, 1245.0], [1.73037516E12, 830.0], [1.73037528E12, 1976.2], [1.73037522E12, 679.3333333333334]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73037498E12, 1319.0], [1.7303751E12, 1042.6666666666667], [1.73037504E12, 1142.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.16666666666666669]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73037534E12, 252224.33333333334], [1.73037498E12, 5710.0], [1.73037528E12, 256131.6], [1.73037522E12, 212358.5]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73037498E12, 1349.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73037534E12, 0.2812500000000001], [1.73037564E12, 0.15568862275449108], [1.73037546E12, 0.4559585492227979], [1.73037558E12, 0.3044619422572179], [1.7303754E12, 0.2598425196850395], [1.73037552E12, 0.36585365853658525]], "isOverall": false, "label": "WS read policy import result-0", "isController": false}, {"data": [[1.73037534E12, 11842.0], [1.7303754E12, 8832.75]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.73037534E12, 33193.333333333336], [1.73037528E12, 44122.4], [1.73037522E12, 41613.5]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73037516E12, 2066.5], [1.73037498E12, 2056.0], [1.73037528E12, 2073.0], [1.7303751E12, 2077.0], [1.73037522E12, 2073.6666666666665], [1.73037504E12, 2071.166666666667]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73037516E12, 0.6148148148148149], [1.73037528E12, 0.35], [1.7303751E12, 0.6422764227642277], [1.73037522E12, 0.5190839694656487], [1.73037504E12, 0.5045871559633027]], "isOverall": false, "label": "WS read sr link result-0", "isController": false}, {"data": [[1.73037516E12, 2063.5], [1.73037528E12, 2069.5], [1.73037522E12, 2073.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73037516E12, 0.5], [1.73037528E12, 0.2], [1.73037522E12, 1.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73037534E12, 0.0], [1.73037498E12, 0.2], [1.7303751E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.16666666666666669]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73037498E12, 0.33333333333333337], [1.7303751E12, 0.2941176470588236], [1.73037504E12, 0.24999999999999994]], "isOverall": false, "label": "WS PP sr key gen", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.33333333333333337]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73037516E12, 2897.5], [1.73037498E12, 2925.0], [1.73037528E12, 2798.0], [1.7303751E12, 2881.0], [1.73037522E12, 2882.6666666666665], [1.73037504E12, 2865.1666666666665]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73037498E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7303751E12, 2070.5], [1.73037504E12, 2068.333333333333]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73037516E12, 2.0], [1.73037528E12, 2.4], [1.73037522E12, 3.6666666666666665]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73037534E12, 1.0], [1.73037516E12, 4.5], [1.73037528E12, 0.6666666666666666], [1.73037522E12, 0.8333333333333334]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73037564E12, 0.2], [1.7303757E12, 1.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73037498E12, 4779.0], [1.7303751E12, 5058.0], [1.73037504E12, 5131.333333333333]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73037516E12, 0.5], [1.73037528E12, 0.4814814814814812], [1.73037522E12, 0.4615384615384615]], "isOverall": false, "label": "WS PP user key gen", "isController": false}, {"data": [[1.73037498E12, 671.5], [1.7303751E12, 829.5], [1.73037504E12, 780.3333333333333]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73037516E12, 278.5], [1.73037528E12, 296.5272727272727], [1.73037522E12, 218.23999999999998]], "isOverall": false, "label": "WS read user key gen result", "isController": false}, {"data": [[1.73037498E12, 2549.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73037516E12, 0.5], [1.73037528E12, 0.5], [1.73037522E12, 0.5]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7303751E12, 0.2], [1.73037504E12, 0.2]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7303751E12, 0.0], [1.73037504E12, 0.16666666666666669]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73037516E12, 11891.5], [1.73037528E12, 11780.333333333332], [1.73037522E12, 11763.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73037498E12, 0.2], [1.7303751E12, 0.22857142857142856], [1.73037504E12, 0.3166666666666667]], "isOverall": false, "label": "WS read sr key gen result-0", "isController": false}, {"data": [[1.73037534E12, 11135.5], [1.73037498E12, 948.2], [1.7303751E12, 887.5], [1.7303754E12, 7184.0], [1.73037504E12, 803.6666666666667]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73037534E12, 0.672413793103448], [1.73037516E12, 0.6666666666666667], [1.73037528E12, 0.5703703703703705], [1.73037522E12, 0.8095238095238094]], "isOverall": false, "label": "WS read user link result-0", "isController": false}, {"data": [[1.7303751E12, 12233.0], [1.73037504E12, 11942.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73037516E12, 0.0], [1.73037498E12, 0.0], [1.73037528E12, 0.2], [1.7303751E12, 0.0], [1.73037522E12, 0.33333333333333337], [1.73037504E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.6666666666666666], [1.73037522E12, 1.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.6666666666666666], [1.73037522E12, 0.5]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.6666666666666667]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7303751E12, 1089.75], [1.73037504E12, 952.8333333333333]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.5], [1.73037504E12, 0.16666666666666666]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 1.0], [1.73037522E12, 2.3333333333333335]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73037534E12, 419.0], [1.73037498E12, 456.0], [1.7303751E12, 672.25], [1.7303754E12, 691.1428571428571], [1.73037504E12, 588.5833333333333]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73037498E12, 1367.5], [1.7303751E12, 1218.0], [1.73037504E12, 1422.3333333333333]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73037516E12, 4168.192592592592], [1.73037528E12, 1949.4000000000003], [1.7303751E12, 3245.4959349593505], [1.73037522E12, 3290.5572519083976], [1.73037504E12, 1324.963302752293]], "isOverall": false, "label": "WS read sr link result", "isController": false}, {"data": [[1.73037516E12, 2072.0], [1.73037528E12, 2075.6], [1.73037522E12, 2072.3333333333335]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73037498E12, 2068.0], [1.7303751E12, 2067.6666666666665], [1.73037504E12, 2065.666666666667]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73037564E12, 1248.75], [1.73037558E12, 1462.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73037498E12, 1.0], [1.7303751E12, 0.33333333333333337], [1.73037504E12, 0.16666666666666669]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73037516E12, 1.0000000000000007], [1.73037528E12, 0.3928571428571429], [1.7303751E12, 0.5703125], [1.73037522E12, 0.4566929133858268], [1.73037504E12, 0.37719298245614036]], "isOverall": false, "label": "WS PP sr link", "isController": false}, {"data": [[1.73037534E12, 753.6896551724141], [1.73037516E12, 868.0476190476194], [1.73037528E12, 1073.94074074074], [1.73037522E12, 1265.0952380952383]], "isOverall": false, "label": "WS read user link result", "isController": false}, {"data": [[1.73037564E12, 39448.4], [1.7303757E12, 84938.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73037498E12, 4160.0], [1.7303751E12, 5558.0], [1.73037504E12, 3996.666666666667]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73037516E12, 735.5], [1.73037528E12, 1196.8333333333333], [1.73037522E12, 698.5]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73037534E12, 0.25000000000000006], [1.73037564E12, 0.32515337423312873], [1.73037546E12, 0.2953367875647668], [1.73037558E12, 0.2770448548812667], [1.7303754E12, 0.3984962406015036], [1.73037552E12, 0.3495934959349593]], "isOverall": false, "label": "WS PP policy import", "isController": false}, {"data": [[1.73037534E12, 0.18750000000000003], [1.73037564E12, 0.23312883435582823], [1.73037546E12, 0.16062176165803102], [1.73037558E12, 0.16622691292875982], [1.7303754E12, 0.25563909774436094], [1.73037552E12, 0.17073170731707324]], "isOverall": false, "label": "WS PP policy import-0", "isController": false}, {"data": [[1.73037498E12, 676.0], [1.7303751E12, 819.6666666666666], [1.73037504E12, 795.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73037534E12, 1.0], [1.73037564E12, 0.0], [1.7303751E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.16666666666666669], [1.73037504E12, 0.5]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.16666666666666669]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73037564E12, 41020.2], [1.7303757E12, 86575.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73037498E12, 3.0], [1.7303751E12, 1.3333333333333333], [1.73037504E12, 1.6666666666666667]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73037516E12, 0.7969924812030076], [1.73037528E12, 0.25], [1.7303751E12, 0.42968749999999983], [1.73037522E12, 0.35433070866141736], [1.73037504E12, 0.19298245614035095]], "isOverall": false, "label": "WS PP sr link-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.2], [1.73037522E12, 0.33333333333333337]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037498E12, 0.4], [1.7303751E12, 0.5], [1.7303754E12, 0.0], [1.73037504E12, 0.08333333333333333]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73037516E12, 0.25000000000000006], [1.73037528E12, 0.25454545454545446], [1.73037522E12, 0.32000000000000006]], "isOverall": false, "label": "WS read user key gen result-0", "isController": false}, {"data": [[1.73037564E12, 0.25], [1.73037558E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73037534E12, 37242.0], [1.73037564E12, 202918.25], [1.73037558E12, 206593.5]], "isOverall": false, "label": "Requests for Import", "isController": false}, {"data": [[1.73037498E12, 1.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73037534E12, 1067.34375], [1.73037564E12, 208.38323353293399], [1.73037546E12, 1809.6010362694306], [1.73037558E12, 787.8503937007869], [1.7303754E12, 1164.7952755905503], [1.73037552E12, 2919.934959349593]], "isOverall": false, "label": "WS read policy import result", "isController": false}, {"data": [[1.73037498E12, 0.6], [1.7303751E12, 359.0857142857143], [1.73037504E12, 285.6499999999999]], "isOverall": false, "label": "WS read sr key gen result", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.5], [1.7303751E12, 0.25], [1.73037558E12, 1.0], [1.7303754E12, 0.16666666666666669], [1.73037504E12, 0.5]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73037534E12, 992.0], [1.7303754E12, 1391.5]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.73037534E12, 37242.0], [1.73037564E12, 244019.0], [1.7303757E12, 296441.0]], "isOverall": false, "label": "Policy import and dry run", "isController": false}, {"data": [[1.73037498E12, 0.33333333333333337], [1.7303751E12, 0.6], [1.73037504E12, 0.16666666666666669]], "isOverall": false, "label": "Get tenant id-0", "isController": false}, {"data": [[1.73037516E12, 137932.0], [1.73037528E12, 183964.75], [1.73037522E12, 178263.75]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73037498E12, 0.16666666666666669], [1.7303751E12, 0.14705882352941183], [1.73037504E12, 0.18333333333333335]], "isOverall": false, "label": "WS PP sr key gen-0", "isController": false}, {"data": [[1.73037516E12, 951.0], [1.73037528E12, 2128.333333333333], [1.73037522E12, 1667.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.7303751E12, 0.5], [1.73037504E12, 0.6666666666666666]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73037516E12, 1.0], [1.73037528E12, 0.5], [1.73037522E12, 1.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73037516E12, 0.5], [1.73037528E12, 0.5], [1.73037522E12, 1.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.5]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73037534E12, 2296.6666666666665], [1.73037516E12, 1510.0], [1.73037528E12, 2368.3333333333335], [1.73037522E12, 1240.1666666666667]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73037534E12, 546.0], [1.73037564E12, 867.0], [1.7303751E12, 720.0], [1.73037558E12, 428.5], [1.7303754E12, 666.6666666666666], [1.73037504E12, 642.8333333333334]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73037534E12, 631.0], [1.73037564E12, 937.25], [1.7303751E12, 1782.25], [1.73037558E12, 711.0], [1.7303754E12, 1084.3333333333333], [1.73037504E12, 690.5]], "isOverall": false, "label": "Login by SR", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7303757E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73037498E12, "maxY": 84689.0, "series": [{"data": [[1.73037516E12, 784.5], [1.73037528E12, 2384.8333333333335], [1.7303751E12, 1290.75], [1.73037522E12, 1309.0], [1.73037504E12, 917.3333333333334]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7303751E12, 930.8], [1.73037504E12, 1150.4]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS PP user link-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73037534E12, 830.0], [1.7303754E12, 1524.5]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS PP user link", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037498E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS PP user key gen-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73037516E12, 819.5], [1.73037528E12, 1371.6666666666665], [1.73037522E12, 938.5]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73037498E12, 1125.6666666666667], [1.7303751E12, 1969.2], [1.73037504E12, 1107.9166666666667]], "isOverall": false, "label": "Get tenant id", "isController": false}, {"data": [[1.73037516E12, 1394.5], [1.73037528E12, 3431.0], [1.73037522E12, 1610.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73037534E12, 1245.0], [1.73037516E12, 830.0], [1.73037528E12, 1975.2], [1.73037522E12, 677.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73037498E12, 1318.0], [1.7303751E12, 1042.3333333333333], [1.73037504E12, 1141.3333333333333]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037498E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73037498E12, 1348.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037546E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037552E12, 0.0]], "isOverall": false, "label": "WS read policy import result-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.73037534E12, 14328.333333333334], [1.73037528E12, 8952.2], [1.73037522E12, 5426.5]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73037516E12, 2066.0], [1.73037498E12, 2056.0], [1.73037528E12, 2072.2], [1.7303751E12, 2076.3333333333335], [1.73037522E12, 2073.0], [1.73037504E12, 2070.6666666666665]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS read sr link result-0", "isController": false}, {"data": [[1.73037516E12, 2063.5], [1.73037528E12, 2068.6666666666665], [1.73037522E12, 2072.5]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73037534E12, 0.0], [1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS PP sr key gen", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73037516E12, 2897.5], [1.73037498E12, 2925.0], [1.73037528E12, 2797.6], [1.7303751E12, 2881.0], [1.73037522E12, 2882.0], [1.73037504E12, 2865.1666666666665]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73037498E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7303751E12, 2070.5], [1.73037504E12, 2068.166666666667]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73037564E12, 0.0], [1.7303757E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73037498E12, 4777.0], [1.7303751E12, 5055.5], [1.73037504E12, 5129.5]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS PP user key gen", "isController": false}, {"data": [[1.73037498E12, 671.0], [1.7303751E12, 829.5], [1.73037504E12, 780.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS read user key gen result", "isController": false}, {"data": [[1.73037498E12, 2549.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73037516E12, 9098.5], [1.73037528E12, 9046.5], [1.73037522E12, 9042.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS read sr key gen result-0", "isController": false}, {"data": [[1.73037534E12, 609.0], [1.73037498E12, 947.8], [1.7303751E12, 886.75], [1.7303754E12, 4556.375], [1.73037504E12, 803.4166666666669]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS read user link result-0", "isController": false}, {"data": [[1.7303751E12, 9077.5], [1.73037504E12, 9085.166666666666]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73037516E12, 0.0], [1.73037498E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73037534E12, 419.0], [1.73037498E12, 455.6], [1.7303751E12, 671.75], [1.7303754E12, 690.8571428571429], [1.73037504E12, 588.0833333333334]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73037498E12, 1367.0], [1.7303751E12, 1217.5], [1.73037504E12, 1422.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS read sr link result", "isController": false}, {"data": [[1.73037516E12, 2071.5], [1.73037528E12, 2075.2], [1.73037522E12, 2072.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73037498E12, 2067.0], [1.7303751E12, 2067.3333333333335], [1.73037504E12, 2065.5]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73037564E12, 1247.75], [1.73037558E12, 1461.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS PP sr link", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS read user link result", "isController": false}, {"data": [[1.73037564E12, 39134.4], [1.7303757E12, 84689.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73037498E12, 4156.0], [1.7303751E12, 5555.0], [1.73037504E12, 3994.166666666667]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73037516E12, 735.0], [1.73037528E12, 1196.3333333333333], [1.73037522E12, 697.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037546E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037552E12, 0.0]], "isOverall": false, "label": "WS PP policy import", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037546E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037552E12, 0.0]], "isOverall": false, "label": "WS PP policy import-0", "isController": false}, {"data": [[1.73037498E12, 675.0], [1.7303751E12, 819.3333333333334], [1.73037504E12, 794.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.7303751E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73037564E12, 0.0], [1.7303757E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS PP sr link-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS read user key gen result-0", "isController": false}, {"data": [[1.73037564E12, 0.0], [1.73037558E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037558E12, 0.0]], "isOverall": false, "label": "Requests for Import", "isController": false}, {"data": [[1.73037498E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037546E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037552E12, 0.0]], "isOverall": false, "label": "WS read policy import result", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS read sr key gen result", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.7303751E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73037534E12, 992.0], [1.7303754E12, 1391.3333333333335]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.7303757E12, 0.0]], "isOverall": false, "label": "Policy import and dry run", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get tenant id-0", "isController": false}, {"data": [[1.73037516E12, 4497.5], [1.73037528E12, 7928.5], [1.73037522E12, 4815.25]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS PP sr key gen-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73037534E12, 2295.6666666666665], [1.73037516E12, 1505.5], [1.73037528E12, 2367.3333333333335], [1.73037522E12, 1239.1666666666667]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73037534E12, 546.0], [1.73037564E12, 866.25], [1.7303751E12, 719.5], [1.73037558E12, 427.5], [1.7303754E12, 666.1666666666666], [1.73037504E12, 642.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73037534E12, 630.0], [1.73037564E12, 937.25], [1.7303751E12, 1781.75], [1.73037558E12, 710.0], [1.7303754E12, 1083.8333333333333], [1.73037504E12, 689.8333333333334]], "isOverall": false, "label": "Login by SR", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7303757E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73037498E12, "maxY": 21506.0, "series": [{"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Agree terms", "isController": false}, {"data": [[1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS PP user link-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Agree terms-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS PP user link", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037498E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS PP user key gen-0", "isController": false}, {"data": [[1.73037534E12, 926.0], [1.7303754E12, 944.6666666666666]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get tenant id", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.73037534E12, 21506.0], [1.73037498E12, 477.0], [1.73037528E12, 19776.6], [1.73037522E12, 19178.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.73037498E12, 0.0]], "isOverall": false, "label": "Setup ipfs", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037546E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037552E12, 0.0]], "isOverall": false, "label": "WS read policy import result-0", "isController": false}, {"data": [[1.73037534E12, 306.0], [1.7303754E12, 3145.75]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.73037534E12, 2992.6666666666665], [1.73037528E12, 1423.8], [1.73037522E12, 950.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.73037516E12, 2045.5], [1.73037498E12, 2037.0], [1.73037528E12, 2047.0], [1.7303751E12, 2047.0], [1.73037522E12, 2047.6666666666667], [1.73037504E12, 2043.6666666666667]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS read sr link result-0", "isController": false}, {"data": [[1.73037516E12, 2040.5], [1.73037528E12, 2044.8333333333335], [1.73037522E12, 2047.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.73037534E12, 0.0], [1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS PP sr key gen", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.73037516E12, 2046.0], [1.73037498E12, 2044.0], [1.73037528E12, 2042.4], [1.7303751E12, 2045.3333333333333], [1.73037522E12, 2047.0], [1.73037504E12, 2044.1666666666667]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.73037498E12, 0.0]], "isOverall": false, "label": "Create new tenant-0", "isController": false}, {"data": [[1.7303751E12, 2048.5], [1.73037504E12, 2044.3333333333335]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.73037516E12, 1.5], [1.73037528E12, 2.0], [1.73037522E12, 2.6666666666666665]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.73037564E12, 0.0], [1.7303757E12, 0.0]], "isOverall": false, "label": "Dry Run Policy-0", "isController": false}, {"data": [[1.73037498E12, 490.5], [1.7303751E12, 494.0], [1.73037504E12, 529.1666666666667]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS PP user key gen", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS read user key gen result", "isController": false}, {"data": [[1.73037498E12, 0.0]], "isOverall": false, "label": "Create new tenant", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.73037516E12, 8178.5], [1.73037528E12, 8180.166666666666], [1.73037522E12, 8187.5]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS read sr key gen result-0", "isController": false}, {"data": [[1.73037534E12, 10832.5], [1.73037498E12, 291.6], [1.7303751E12, 247.0], [1.7303754E12, 6464.625], [1.73037504E12, 264.5833333333333]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS read user link result-0", "isController": false}, {"data": [[1.7303751E12, 8182.0], [1.73037504E12, 8176.666666666666]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.73037516E12, 0.0], [1.73037498E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7303751E12, 1089.0], [1.73037504E12, 952.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS read sr link result", "isController": false}, {"data": [[1.73037516E12, 2045.0], [1.73037528E12, 2041.4], [1.73037522E12, 2045.6666666666667]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.73037498E12, 2042.0], [1.7303751E12, 2039.6666666666667], [1.73037504E12, 2044.8333333333335]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.73037564E12, 492.75], [1.73037558E12, 629.5]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS PP sr link", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS read user link result", "isController": false}, {"data": [[1.73037564E12, 0.0], [1.7303757E12, 0.0]], "isOverall": false, "label": "Dry Run Policy", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037546E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037552E12, 0.0]], "isOverall": false, "label": "WS PP policy import", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037546E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037552E12, 0.0]], "isOverall": false, "label": "WS PP policy import-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.7303751E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.73037564E12, 0.0], [1.7303757E12, 0.0]], "isOverall": false, "label": "Requests for DryRun", "isController": true}, {"data": [[1.73037498E12, 1.0], [1.7303751E12, 1.3333333333333333], [1.73037504E12, 1.3333333333333333]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.7303751E12, 0.0], [1.73037522E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS PP sr link-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS read user key gen result-0", "isController": false}, {"data": [[1.73037564E12, 0.0], [1.73037558E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 1441.75], [1.73037558E12, 1565.5]], "isOverall": false, "label": "Requests for Import", "isController": false}, {"data": [[1.73037498E12, 0.0]], "isOverall": false, "label": "Setup ipfs-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037546E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037552E12, 0.0]], "isOverall": false, "label": "WS read policy import result", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS read sr key gen result", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.7303751E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.7303754E12, 0.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 1472.8], [1.7303757E12, 1534.0]], "isOverall": false, "label": "Policy import and dry run", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get tenant id-0", "isController": false}, {"data": [[1.73037516E12, 1405.5], [1.73037528E12, 1603.0], [1.73037522E12, 1448.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS PP sr key gen-0", "isController": false}, {"data": [[1.73037516E12, 950.0], [1.73037528E12, 2127.5], [1.73037522E12, 1666.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.73037516E12, 0.0], [1.73037528E12, 0.0], [1.73037522E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.73037498E12, 0.0], [1.7303751E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037516E12, 459.5], [1.73037528E12, 228.44444444444446], [1.73037522E12, 328.6666666666667]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.7303751E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.7303751E12, 0.0], [1.73037558E12, 0.0], [1.7303754E12, 0.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7303757E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.73037498E12, "maxY": 84938.0, "series": [{"data": [[1.73037534E12, 10013.0], [1.73037564E12, 51841.0], [1.73037498E12, 2925.0], [1.73037528E12, 23073.0], [1.73037558E12, 10017.0], [1.73037522E12, 18061.0], [1.73037552E12, 10016.0], [1.73037516E12, 22824.0], [1.73037546E12, 10026.0], [1.7303751E12, 23993.0], [1.7303754E12, 16475.0], [1.7303757E12, 84938.0], [1.73037504E12, 10215.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73037534E12, 208.10000000000002], [1.73037564E12, 1.0], [1.73037498E12, 1353.9], [1.73037528E12, 594.6999999999999], [1.73037558E12, 131.4000000000001], [1.73037522E12, 400.30000000000007], [1.73037552E12, 739.8999999999996], [1.73037516E12, 333.0000000000002], [1.73037546E12, 360.5000000000002], [1.7303751E12, 836.2999999999998], [1.7303754E12, 759.4000000000001], [1.7303757E12, 84938.0], [1.73037504E12, 931.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73037534E12, 7860.779999999952], [1.73037564E12, 7926.54999999994], [1.73037498E12, 2925.0], [1.73037528E12, 9811.48000000001], [1.73037558E12, 9971.320000000007], [1.73037522E12, 15769.78], [1.73037552E12, 10014.07], [1.73037516E12, 19166.28], [1.73037546E12, 10010.0], [1.7303751E12, 21124.46], [1.7303754E12, 10004.91], [1.7303757E12, 84938.0], [1.73037504E12, 6216.25]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73037534E12, 834.850000000001], [1.73037564E12, 183.75], [1.73037498E12, 2060.2], [1.73037528E12, 2067.9], [1.73037558E12, 415.44999999999936], [1.73037522E12, 2079.2], [1.73037552E12, 10003.35], [1.73037516E12, 2897.75], [1.73037546E12, 1672.6999999999707], [1.7303751E12, 2131.3999999999965], [1.7303754E12, 1484.9999999999982], [1.7303757E12, 84938.0], [1.73037504E12, 2060.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037498E12, 0.0], [1.73037528E12, 0.0], [1.73037558E12, 0.0], [1.73037522E12, 0.0], [1.73037552E12, 0.0], [1.73037516E12, 0.0], [1.73037546E12, 0.0], [1.7303751E12, 0.0], [1.7303754E12, 0.0], [1.7303757E12, 1.0], [1.73037504E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73037534E12, 0.0], [1.73037564E12, 0.0], [1.73037498E12, 1.0], [1.73037528E12, 1.0], [1.73037558E12, 0.0], [1.73037522E12, 1.0], [1.73037552E12, 0.0], [1.73037516E12, 1.0], [1.73037546E12, 0.0], [1.7303751E12, 1.0], [1.7303754E12, 0.0], [1.7303757E12, 42469.5], [1.73037504E12, 0.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7303757E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 37242.0, "series": [{"data": [[2.0, 1.0], [32.0, 0.0], [34.0, 0.0], [36.0, 0.0], [38.0, 1.0], [40.0, 0.0], [42.0, 0.0], [44.0, 0.0], [46.0, 0.0], [48.0, 1.0], [3.0, 0.0], [52.0, 0.0], [56.0, 0.0], [58.0, 0.0], [60.0, 0.0], [62.0, 0.0], [4.0, 1.0], [64.0, 0.0], [68.0, 0.0], [72.0, 0.0], [78.0, 0.0], [5.0, 0.0], [84.0, 0.5], [6.0, 1.0], [108.0, 0.0], [110.0, 0.0], [8.0, 1.0], [142.0, 0.0], [10.0, 1.0], [184.0, 0.0], [12.0, 1.0], [204.0, 0.0], [14.0, 1.0], [16.0, 1.0], [18.0, 1.0], [20.0, 0.0], [22.0, 0.0], [24.0, 1.0], [26.0, 0.0], [28.0, 0.0], [30.0, 0.0], [480.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[4.0, 37242.0], [5.0, 3751.5], [3.0, 21036.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 480.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 266.0, "series": [{"data": [[2.0, 0.0], [32.0, 0.0], [34.0, 0.0], [36.0, 0.0], [38.0, 0.0], [40.0, 0.0], [42.0, 0.0], [44.0, 0.0], [46.0, 0.0], [48.0, 0.0], [3.0, 0.0], [52.0, 0.0], [56.0, 0.0], [58.0, 0.0], [60.0, 0.0], [62.0, 0.0], [4.0, 0.0], [64.0, 0.0], [68.0, 0.0], [72.0, 0.0], [78.0, 0.0], [5.0, 0.0], [84.0, 0.0], [6.0, 0.0], [108.0, 0.0], [110.0, 0.0], [8.0, 0.0], [142.0, 0.0], [10.0, 0.0], [184.0, 0.0], [12.0, 0.0], [204.0, 0.0], [14.0, 0.0], [16.0, 0.0], [18.0, 0.0], [20.0, 0.0], [22.0, 0.0], [24.0, 0.0], [26.0, 0.0], [28.0, 0.0], [30.0, 0.0], [480.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[4.0, 0.0], [5.0, 266.0], [3.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 480.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73037498E12, "maxY": 25.533333333333335, "series": [{"data": [[1.73037534E12, 6.416666666666667], [1.73037564E12, 11.483333333333333], [1.73037498E12, 1.2333333333333334], [1.73037528E12, 18.75], [1.73037558E12, 25.533333333333335], [1.73037522E12, 15.6], [1.73037552E12, 8.2], [1.73037516E12, 12.466666666666667], [1.73037546E12, 12.866666666666667], [1.7303751E12, 12.7], [1.7303754E12, 10.216666666666667], [1.7303757E12, 0.016666666666666666], [1.73037504E12, 15.5]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7303757E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73037498E12, "maxY": 25.25, "series": [{"data": [[1.73037534E12, 6.183333333333334], [1.73037564E12, 11.5], [1.73037498E12, 1.0], [1.73037528E12, 18.3], [1.73037558E12, 25.25], [1.73037522E12, 15.366666666666667], [1.73037552E12, 7.733333333333333], [1.73037516E12, 12.283333333333333], [1.73037546E12, 12.55], [1.7303751E12, 12.15], [1.7303754E12, 9.6], [1.7303757E12, 0.03333333333333333], [1.73037504E12, 14.416666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.73037516E12, 0.06666666666666667], [1.73037498E12, 0.016666666666666666], [1.73037528E12, 0.18333333333333332], [1.7303751E12, 0.11666666666666667], [1.7303754E12, 0.1], [1.73037522E12, 0.08333333333333333], [1.73037504E12, 0.2]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.73037534E12, 0.03333333333333333], [1.73037516E12, 0.06666666666666667], [1.73037564E12, 0.06666666666666667], [1.73037498E12, 0.16666666666666666], [1.73037528E12, 0.18333333333333332], [1.7303751E12, 0.26666666666666666], [1.73037558E12, 0.03333333333333333], [1.7303754E12, 0.2], [1.73037522E12, 0.08333333333333333], [1.73037504E12, 0.6]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.73037534E12, 0.05]], "isOverall": false, "label": "Websocket I/O error", "isController": false}, {"data": [[1.73037534E12, 0.03333333333333333], [1.73037516E12, 0.05], [1.73037498E12, 0.016666666666666666], [1.73037528E12, 0.16666666666666666], [1.7303751E12, 0.13333333333333333], [1.7303754E12, 0.1], [1.73037522E12, 0.1], [1.73037504E12, 0.18333333333333332]], "isOverall": false, "label": "202", "isController": false}, {"data": [[1.73037534E12, 0.03333333333333333], [1.7303754E12, 0.03333333333333333]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.conn.HttpHostConnectException", "isController": false}, {"data": [[1.7303754E12, 0.03333333333333333]], "isOverall": false, "label": "401", "isController": false}, {"data": [[1.73037534E12, 0.03333333333333333], [1.73037546E12, 0.31666666666666665], [1.73037558E12, 0.25], [1.7303754E12, 0.13333333333333333], [1.73037552E12, 0.4666666666666667]], "isOverall": false, "label": "No response", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7303757E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73037498E12, "maxY": 6.35, "series": [{"data": [[1.73037534E12, 0.05], [1.73037528E12, 0.08333333333333333], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "Link user-success", "isController": true}, {"data": [[1.73037534E12, 0.016666666666666666], [1.7303754E12, 0.1]], "isOverall": false, "label": "Get tenant-success", "isController": true}, {"data": [[1.73037498E12, 0.03333333333333333], [1.7303751E12, 0.03333333333333333], [1.73037504E12, 0.1]], "isOverall": false, "label": "Accept sr-0-success", "isController": false}, {"data": [[1.73037534E12, 0.9666666666666667], [1.73037516E12, 0.35], [1.73037528E12, 2.25], [1.73037522E12, 1.05]], "isOverall": false, "label": "WS read user link result-0-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037498E12, 0.016666666666666666], [1.73037528E12, 0.08333333333333333], [1.7303751E12, 0.05], [1.73037522E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Login by SR OS-0-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.7303754E12, 0.1]], "isOverall": false, "label": "WS open for policy import-0-success", "isController": false}, {"data": [[1.73037534E12, 0.9666666666666667], [1.73037516E12, 0.35], [1.73037528E12, 2.25], [1.73037522E12, 1.05]], "isOverall": false, "label": "WS read user link result-success", "isController": false}, {"data": [[1.73037498E12, 0.05], [1.7303751E12, 0.08333333333333333], [1.73037504E12, 0.2]], "isOverall": false, "label": "Get tenant id-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.08333333333333333], [1.73037522E12, 0.05]], "isOverall": false, "label": "WS open for user key gen-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "Get User Access Token-0-success", "isController": false}, {"data": [[1.73037498E12, 0.1], [1.7303751E12, 0.5666666666666667], [1.73037504E12, 1.0]], "isOverall": false, "label": "WS PP sr key gen-success", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666], [1.7303751E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Invite user-0-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.06666666666666667], [1.73037522E12, 0.06666666666666667]], "isOverall": false, "label": "Link SR-success", "isController": true}, {"data": [[1.73037498E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "Get User Access Token-success", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-success", "isController": false}, {"data": [[1.73037498E12, 0.08333333333333333], [1.7303751E12, 0.5833333333333334], [1.73037504E12, 1.0]], "isOverall": false, "label": "WS read sr key gen result-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.7303754E12, 0.03333333333333333]], "isOverall": false, "label": "Get tenant-failure", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.73037498E12, 0.08333333333333333], [1.7303751E12, 0.06666666666666667], [1.7303754E12, 0.11666666666666667], [1.73037504E12, 0.2]], "isOverall": false, "label": "Get Admin Access Token-0-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.7303751E12, 0.06666666666666667], [1.73037522E12, 0.03333333333333333], [1.73037504E12, 0.1]], "isOverall": false, "label": "Agree terms-success", "isController": false}, {"data": [[1.73037498E12, 0.05], [1.7303751E12, 0.03333333333333333], [1.73037504E12, 0.1]], "isOverall": false, "label": "User creation(admin side)-success", "isController": true}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037498E12, 0.016666666666666666], [1.73037528E12, 0.08333333333333333], [1.7303751E12, 0.05], [1.73037522E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Get Access Token-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "Get user keys-0-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.7303754E12, 0.1]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.73037564E12, 0.06666666666666667], [1.73037558E12, 0.03333333333333333]], "isOverall": false, "label": "Requests for Import-success", "isController": true}, {"data": [[1.73037498E12, 0.08333333333333333], [1.7303751E12, 0.5833333333333334], [1.73037504E12, 1.0]], "isOverall": false, "label": "WS read sr key gen result-0-success", "isController": false}, {"data": [[1.7303751E12, 0.06666666666666667], [1.73037504E12, 0.1]], "isOverall": false, "label": "WS open for sr link-0-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037498E12, 0.016666666666666666], [1.73037528E12, 0.08333333333333333], [1.7303751E12, 0.05], [1.73037522E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Login by SR OS-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "Get user keys-success", "isController": false}, {"data": [[1.73037516E12, 0.3333333333333333], [1.73037528E12, 0.9166666666666666], [1.73037522E12, 0.4166666666666667]], "isOverall": false, "label": "WS read user key gen result-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666]], "isOverall": false, "label": "Requests for Import-failure", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666], [1.7303751E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Accept user-0-success", "isController": false}, {"data": [[1.73037516E12, 2.25], [1.73037528E12, 1.0], [1.7303751E12, 2.05], [1.73037522E12, 2.183333333333333], [1.73037504E12, 1.8166666666666667]], "isOverall": false, "label": "WS read sr link result-success", "isController": false}, {"data": [[1.73037534E12, 0.05], [1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.15], [1.73037522E12, 0.1]], "isOverall": false, "label": "Verify link-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.7303751E12, 0.06666666666666667], [1.73037522E12, 0.03333333333333333], [1.73037504E12, 0.1]], "isOverall": false, "label": "Agree terms-0-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.73037498E12, 0.08333333333333333], [1.7303751E12, 0.06666666666666667], [1.7303754E12, 0.11666666666666667], [1.73037504E12, 0.2]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.73037516E12, 0.3333333333333333], [1.73037528E12, 0.9166666666666666], [1.73037522E12, 0.4166666666666667]], "isOverall": false, "label": "WS read user key gen result-0-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "Get SR DID-success", "isController": false}, {"data": [[1.7303751E12, 0.08333333333333333], [1.73037504E12, 0.08333333333333333]], "isOverall": false, "label": "Link SR profile-0-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "Generate user hedera data-success", "isController": true}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.08333333333333333], [1.73037522E12, 0.05]], "isOverall": false, "label": "Generate user keys-0-success", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666], [1.7303751E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Generate sr keys-0-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.7303754E12, 0.016666666666666666]], "isOverall": false, "label": "Login by Admin-failure", "isController": false}, {"data": [[1.73037498E12, 0.03333333333333333], [1.7303751E12, 0.03333333333333333], [1.73037504E12, 0.1]], "isOverall": false, "label": "Invite sr-0-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for user link-0-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.73037564E12, 0.08333333333333333], [1.7303757E12, 0.016666666666666666]], "isOverall": false, "label": "Dry Run Policy-success", "isController": false}, {"data": [[1.73037534E12, 0.05], [1.73037498E12, 0.016666666666666666], [1.73037528E12, 0.08333333333333333], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "User creation flow-success", "isController": true}, {"data": [[1.73037498E12, 0.016666666666666666]], "isOverall": false, "label": "Create new tenant-0-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.08333333333333333], [1.73037522E12, 0.05]], "isOverall": false, "label": "Generate user keys-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.73037564E12, 0.06666666666666667], [1.7303751E12, 0.06666666666666667], [1.73037558E12, 0.03333333333333333], [1.7303754E12, 0.1], [1.73037504E12, 0.1]], "isOverall": false, "label": "Get SR Access Token-0-success", "isController": false}, {"data": [[1.73037534E12, 0.5333333333333333], [1.73037564E12, 2.783333333333333], [1.73037546E12, 3.216666666666667], [1.73037558E12, 6.35], [1.7303754E12, 2.1166666666666667], [1.73037552E12, 2.05]], "isOverall": false, "label": "WS read policy import result-0-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for user link-success", "isController": false}, {"data": [[1.73037534E12, 0.5333333333333333], [1.73037564E12, 2.716666666666667], [1.73037546E12, 3.216666666666667], [1.73037558E12, 6.316666666666666], [1.7303754E12, 2.216666666666667], [1.73037552E12, 2.05]], "isOverall": false, "label": "WS PP policy import-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.73037564E12, 0.06666666666666667], [1.7303751E12, 0.06666666666666667], [1.73037558E12, 0.03333333333333333], [1.7303754E12, 0.1], [1.73037504E12, 0.1]], "isOverall": false, "label": "Get SR Access Token-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.7303754E12, 0.1]], "isOverall": false, "label": "WS open for policy import-success", "isController": false}, {"data": [[1.73037498E12, 0.05], [1.7303751E12, 0.08333333333333333], [1.73037504E12, 0.2]], "isOverall": false, "label": "Get tenant id-0-success", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666], [1.7303751E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Generate sr keys-success", "isController": false}, {"data": [[1.73037516E12, 2.216666666666667], [1.73037528E12, 0.9333333333333333], [1.7303751E12, 2.1333333333333333], [1.73037522E12, 2.1166666666666667], [1.73037504E12, 1.9]], "isOverall": false, "label": "WS PP sr link-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.73037516E12, 0.016666666666666666], [1.73037528E12, 0.08333333333333333], [1.73037522E12, 0.05]], "isOverall": false, "label": "Link user profile-success", "isController": false}, {"data": [[1.73037534E12, 0.9333333333333333], [1.73037516E12, 0.36666666666666664], [1.73037528E12, 2.25], [1.73037522E12, 1.0666666666666667]], "isOverall": false, "label": "WS PP user link-success", "isController": false}, {"data": [[1.73037564E12, 0.08333333333333333], [1.7303757E12, 0.016666666666666666]], "isOverall": false, "label": "Dry Run Policy-0-success", "isController": false}, {"data": [[1.7303751E12, 0.08333333333333333], [1.73037504E12, 0.08333333333333333]], "isOverall": false, "label": "Link SR profile-success", "isController": false}, {"data": [[1.73037498E12, 0.1], [1.7303751E12, 0.5666666666666667], [1.73037504E12, 1.0]], "isOverall": false, "label": "WS PP sr key gen-0-success", "isController": false}, {"data": [[1.73037498E12, 0.03333333333333333], [1.7303751E12, 0.03333333333333333], [1.73037504E12, 0.1]], "isOverall": false, "label": "Accept sr-success", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666], [1.7303751E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Invite and accept user-success", "isController": true}, {"data": [[1.73037534E12, 0.016666666666666666], [1.73037498E12, 0.08333333333333333], [1.7303751E12, 0.06666666666666667], [1.7303754E12, 0.1], [1.73037504E12, 0.2]], "isOverall": false, "label": "Get Admin Access Token-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037498E12, 0.016666666666666666], [1.73037528E12, 0.08333333333333333], [1.7303751E12, 0.05], [1.73037522E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Get Access Token-0-success", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666], [1.7303751E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Accept user-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.73037564E12, 0.06666666666666667], [1.7303751E12, 0.06666666666666667], [1.73037558E12, 0.03333333333333333], [1.7303754E12, 0.1], [1.73037504E12, 0.1]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.73037516E12, 2.216666666666667], [1.73037528E12, 0.9333333333333333], [1.7303751E12, 2.1333333333333333], [1.73037522E12, 2.1166666666666667], [1.73037504E12, 1.9]], "isOverall": false, "label": "WS PP sr link-0-success", "isController": false}, {"data": [[1.7303751E12, 0.06666666666666667], [1.73037504E12, 0.1]], "isOverall": false, "label": "Get sr keys-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.08333333333333333], [1.73037522E12, 0.05]], "isOverall": false, "label": "WS open for user key gen-0-success", "isController": false}, {"data": [[1.7303754E12, 0.016666666666666666]], "isOverall": false, "label": "Get Admin Access Token-failure", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.7303754E12, 0.1]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.73037516E12, 0.016666666666666666], [1.73037528E12, 0.08333333333333333], [1.73037522E12, 0.05]], "isOverall": false, "label": "Link user profile-0-success", "isController": false}, {"data": [[1.73037564E12, 0.08333333333333333], [1.7303757E12, 0.016666666666666666]], "isOverall": false, "label": "Policy import and dry run-success", "isController": true}, {"data": [[1.73037534E12, 0.016666666666666666]], "isOverall": false, "label": "Policy import and dry run-failure", "isController": false}, {"data": [[1.73037498E12, 0.03333333333333333], [1.7303751E12, 0.03333333333333333], [1.73037504E12, 0.1]], "isOverall": false, "label": "Invite and accept SR-success", "isController": true}, {"data": [[1.73037498E12, 0.016666666666666666]], "isOverall": false, "label": "Setup ipfs-0-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.7303754E12, 0.1]], "isOverall": false, "label": "Get Tenant Id-success", "isController": false}, {"data": [[1.73037534E12, 0.03333333333333333], [1.73037498E12, 0.08333333333333333], [1.7303751E12, 0.06666666666666667], [1.7303754E12, 0.13333333333333333], [1.73037504E12, 0.2]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.7303751E12, 0.06666666666666667], [1.73037504E12, 0.1]], "isOverall": false, "label": "Generate sr hedera data-success", "isController": true}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.06666666666666667], [1.73037522E12, 0.06666666666666667]], "isOverall": false, "label": "User creation(user side)-success", "isController": true}, {"data": [[1.73037564E12, 0.06666666666666667], [1.73037558E12, 0.03333333333333333]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.73037516E12, 2.25], [1.73037528E12, 1.0], [1.7303751E12, 2.05], [1.73037522E12, 2.183333333333333], [1.73037504E12, 1.8166666666666667]], "isOverall": false, "label": "WS read sr link result-0-success", "isController": false}, {"data": [[1.73037564E12, 0.08333333333333333], [1.7303757E12, 0.016666666666666666]], "isOverall": false, "label": "Requests for DryRun-success", "isController": true}, {"data": [[1.7303751E12, 0.06666666666666667], [1.73037504E12, 0.1]], "isOverall": false, "label": "Get sr keys-0-success", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666], [1.7303751E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "Invite user-success", "isController": false}, {"data": [[1.73037534E12, 0.5166666666666667], [1.73037564E12, 2.783333333333333], [1.73037546E12, 3.216666666666667], [1.73037558E12, 6.35], [1.7303754E12, 2.1166666666666667], [1.73037552E12, 2.05]], "isOverall": false, "label": "WS read policy import result-success", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666], [1.7303751E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "WS open for sr key gen-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666]], "isOverall": false, "label": "WS read policy import result-failure", "isController": false}, {"data": [[1.73037516E12, 0.3333333333333333], [1.73037528E12, 0.9], [1.73037522E12, 0.43333333333333335]], "isOverall": false, "label": "WS PP user key gen-0-success", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666], [1.7303751E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "WS open for sr key gen-0-success", "isController": false}, {"data": [[1.73037534E12, 0.016666666666666666], [1.73037564E12, 0.06666666666666667], [1.7303751E12, 0.06666666666666667], [1.73037558E12, 0.03333333333333333], [1.7303754E12, 0.1], [1.73037504E12, 0.1]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.73037534E12, 0.5333333333333333], [1.73037564E12, 2.716666666666667], [1.73037546E12, 3.216666666666667], [1.73037558E12, 6.316666666666666], [1.7303754E12, 2.216666666666667], [1.73037552E12, 2.05]], "isOverall": false, "label": "WS PP policy import-0-success", "isController": false}, {"data": [[1.73037564E12, 0.06666666666666667], [1.73037558E12, 0.03333333333333333]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.73037516E12, 0.3333333333333333], [1.73037528E12, 0.9], [1.73037522E12, 0.43333333333333335]], "isOverall": false, "label": "WS PP user key gen-success", "isController": false}, {"data": [[1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.1], [1.73037522E12, 0.03333333333333333]], "isOverall": false, "label": "Get SR DID-0-success", "isController": false}, {"data": [[1.7303751E12, 0.06666666666666667], [1.73037504E12, 0.1]], "isOverall": false, "label": "WS open for sr link-success", "isController": false}, {"data": [[1.73037498E12, 0.03333333333333333], [1.7303751E12, 0.03333333333333333], [1.73037504E12, 0.1]], "isOverall": false, "label": "Invite sr-success", "isController": false}, {"data": [[1.73037534E12, 0.9333333333333333], [1.73037516E12, 0.36666666666666664], [1.73037528E12, 2.25], [1.73037522E12, 1.0666666666666667]], "isOverall": false, "label": "WS PP user link-0-success", "isController": false}, {"data": [[1.73037498E12, 0.016666666666666666], [1.7303751E12, 0.05], [1.73037504E12, 0.1]], "isOverall": false, "label": "User creation(SR side)-success", "isController": true}, {"data": [[1.73037534E12, 0.016666666666666666], [1.7303754E12, 0.1]], "isOverall": false, "label": "Get Tenant Id-0-success", "isController": false}, {"data": [[1.73037534E12, 0.05], [1.73037516E12, 0.03333333333333333], [1.73037528E12, 0.15], [1.73037522E12, 0.1]], "isOverall": false, "label": "Verify link-0-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7303757E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.73037498E12, "maxY": 25.566666666666666, "series": [{"data": [[1.73037534E12, 6.416666666666667], [1.73037564E12, 11.8], [1.73037498E12, 1.3333333333333333], [1.73037528E12, 19.233333333333334], [1.73037558E12, 25.566666666666666], [1.73037522E12, 15.866666666666667], [1.73037552E12, 8.2], [1.73037516E12, 12.566666666666666], [1.73037546E12, 12.866666666666667], [1.7303751E12, 12.9], [1.7303754E12, 10.233333333333333], [1.7303757E12, 0.06666666666666667], [1.73037504E12, 15.9]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.73037534E12, 0.08333333333333333], [1.7303754E12, 0.06666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7303757E12, "title": "Total Transactions Per Second"}},
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
