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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 545.0, "series": [{"data": [[700.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[300.0, 2.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[0.0, 64.0]], "isOverall": false, "label": "WS PP kyc grant", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[4300.0, 1.0], [6100.0, 1.0], [7100.0, 1.0], [7200.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "Requests for Role approve", "isController": true}, {"data": [[0.0, 128.0]], "isOverall": false, "label": "WS PP user link-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[8200.0, 1.0], [8300.0, 1.0], [9400.0, 2.0], [7800.0, 1.0]], "isOverall": false, "label": "Requests for Issue creation", "isController": true}, {"data": [[300.0, 1.0], [400.0, 3.0], [800.0, 1.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [1600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[0.0, 128.0]], "isOverall": false, "label": "WS PP user link", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS PP user key gen-0", "isController": false}, {"data": [[700.0, 4.0], [800.0, 1.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[700.0, 2.0], [800.0, 2.0], [1700.0, 1.0]], "isOverall": false, "label": "WS open for tokens associate", "isController": false}, {"data": [[1300.0, 2.0], [1800.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[0.0, 64.0]], "isOverall": false, "label": "WS PP token associate-0", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 13.0], [600.0, 3.0], [700.0, 8.0], [800.0, 4.0], [400.0, 9.0], [200.0, 1.0], [1600.0, 1.0], [900.0, 3.0], [1000.0, 2.0], [500.0, 9.0], [2000.0, 1.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[2100.0, 1.0], [300.0, 1.0], [600.0, 2.0], [700.0, 1.0], [3000.0, 1.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[4700.0, 1.0], [5700.0, 1.0], [5800.0, 1.0], [6000.0, 1.0], [7100.0, 1.0]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [400.0, 2.0], [1000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Get tenant id", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [400.0, 1.0], [200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[2300.0, 1.0], [700.0, 1.0], [400.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[700.0, 4.0], [900.0, 1.0]], "isOverall": false, "label": "WS open for policy publish", "isController": false}, {"data": [[600.0, 2.0], [400.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[75700.0, 1.0], [78600.0, 1.0], [79400.0, 1.0], [79600.0, 1.0], [82500.0, 1.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[0.0, 545.0]], "isOverall": false, "label": "WS read policy import result-0", "isController": false}, {"data": [[2500.0, 2.0], [1400.0, 1.0], [1600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[600.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [3100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[47600.0, 1.0], [48800.0, 1.0], [47200.0, 1.0], [47500.0, 1.0], [53200.0, 1.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[2100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[21400.0, 1.0], [22300.0, 1.0], [25500.0, 1.0], [13600.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Requests for Grant KYC", "isController": true}, {"data": [[2000.0, 10.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[0.0, 163.0]], "isOverall": false, "label": "WS read sr link result-0", "isController": false}, {"data": [[0.0, 64.0]], "isOverall": false, "label": "WS PP token associate", "isController": false}, {"data": [[2000.0, 5.0]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[700.0, 2.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[0.0, 64.0]], "isOverall": false, "label": "WS read kyc grant result-0", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[23300.0, 1.0], [22700.0, 1.0], [24300.0, 1.0], [26200.0, 1.0], [26100.0, 1.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS PP sr key gen", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Issue create-0", "isController": false}, {"data": [[2000.0, 10.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[2000.0, 5.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [700.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[308400.0, 1.0], [307700.0, 1.0], [309600.0, 1.0], [325300.0, 1.0], [326100.0, 1.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[9300.0, 1.0], [11600.0, 1.0], [6300.0, 1.0], [7100.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[16900.0, 1.0], [10500.0, 1.0], [11600.0, 1.0], [12900.0, 1.0], [14400.0, 1.0]], "isOverall": false, "label": "Requests for Device creation", "isController": true}, {"data": [[700.0, 2.0], [800.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS PP user key gen", "isController": false}, {"data": [[700.0, 1.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[5300.0, 1.0], [5500.0, 1.0], [5900.0, 3.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[0.0, 45.0], [2200.0, 1.0], [2500.0, 1.0], [2600.0, 2.0], [3600.0, 1.0]], "isOverall": false, "label": "WS read user key gen result", "isController": false}, {"data": [[700.0, 3.0], [800.0, 2.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[0.0, 55.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[10700.0, 1.0], [2700.0, 4.0], [2900.0, 1.0], [12300.0, 1.0], [3100.0, 1.0], [4100.0, 1.0], [4300.0, 1.0], [4500.0, 2.0], [4700.0, 1.0], [4800.0, 1.0], [5200.0, 1.0], [5600.0, 1.0], [5700.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[9100.0, 1.0], [17500.0, 1.0], [23200.0, 1.0], [12700.0, 1.0], [7100.0, 1.0]], "isOverall": false, "label": "Requests for Token associate", "isController": true}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS read sr key gen result-0", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[300.0, 3.0], [600.0, 4.0], [700.0, 3.0], [800.0, 2.0], [200.0, 1.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[2700.0, 1.0], [700.0, 1.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[0.0, 128.0]], "isOverall": false, "label": "WS read user link result-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get issues-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[0.0, 64.0]], "isOverall": false, "label": "WS PP kyc grant-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[700.0, 5.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for tokens associate-0", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 2.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Approve issue", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[300.0, 5.0], [200.0, 6.0], [400.0, 4.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 2.0], [1500.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[600.0, 3.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[0.0, 74.0], [8300.0, 1.0], [600.0, 1.0], [1100.0, 1.0], [1500.0, 1.0], [100.0, 31.0], [2100.0, 1.0], [2800.0, 1.0], [3100.0, 1.0], [200.0, 15.0], [3500.0, 1.0], [3800.0, 1.0], [4000.0, 2.0], [4300.0, 1.0], [4200.0, 1.0], [4600.0, 3.0], [4700.0, 1.0], [300.0, 4.0], [4800.0, 2.0], [5100.0, 1.0], [4900.0, 1.0], [5300.0, 1.0], [5500.0, 1.0], [5600.0, 3.0], [5700.0, 2.0], [5900.0, 1.0], [6000.0, 2.0], [400.0, 4.0], [6900.0, 1.0], [6800.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "WS read sr link result", "isController": false}, {"data": [[2000.0, 5.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[2000.0, 5.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[2200.0, 1.0], [700.0, 1.0], [800.0, 1.0], [1700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1200.0, 1.0], [700.0, 1.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for policy publish-0", "isController": false}, {"data": [[300.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[0.0, 330.0]], "isOverall": false, "label": "WS read policy publish result-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[0.0, 163.0]], "isOverall": false, "label": "WS PP sr link", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[0.0, 82.0], [700.0, 1.0], [200.0, 10.0], [4600.0, 1.0], [4700.0, 2.0], [300.0, 10.0], [1400.0, 1.0], [6300.0, 1.0], [100.0, 13.0], [400.0, 2.0], [1600.0, 1.0], [7200.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "WS read user link result", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1100.0, 1.0], [300.0, 19.0], [600.0, 6.0], [1200.0, 2.0], [700.0, 5.0], [200.0, 6.0], [400.0, 8.0], [800.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[0.0, 545.0]], "isOverall": false, "label": "WS PP policy import", "isController": false}, {"data": [[0.0, 545.0]], "isOverall": false, "label": "WS PP policy import-0", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[0.0, 64.0]], "isOverall": false, "label": "WS read  token associate result-0", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [800.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[0.0, 40.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[0.0, 163.0]], "isOverall": false, "label": "WS PP sr link-0", "isController": false}, {"data": [[0.0, 330.0]], "isOverall": false, "label": "WS PP policy publish-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[0.0, 34.0], [2300.0, 1.0], [2400.0, 1.0], [2600.0, 1.0], [11500.0, 1.0], [200.0, 7.0], [4200.0, 1.0], [17200.0, 1.0], [4500.0, 1.0], [1100.0, 1.0], [300.0, 4.0], [19300.0, 1.0], [6000.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "WS read kyc grant result", "isController": false}, {"data": [[17600.0, 1.0], [20300.0, 1.0], [23200.0, 2.0], [14700.0, 1.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1100.0, 1.0], [2300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS read user key gen result-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[2100.0, 2.0], [2500.0, 1.0], [2600.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "Get token ID", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Approve issue-0", "isController": false}, {"data": [[141200.0, 1.0], [144400.0, 1.0], [141800.0, 1.0], [142600.0, 1.0], [129300.0, 1.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[8800.0, 1.0], [10200.0, 1.0], [11800.0, 1.0], [12300.0, 1.0], [12500.0, 1.0]], "isOverall": false, "label": "Requests for Application creation", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[0.0, 241.0], [600.0, 9.0], [700.0, 4.0], [800.0, 3.0], [900.0, 3.0], [1000.0, 3.0], [1100.0, 4.0], [1200.0, 2.0], [1300.0, 2.0], [1400.0, 4.0], [1500.0, 1.0], [1600.0, 4.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 2.0], [2100.0, 1.0], [2200.0, 1.0], [2400.0, 2.0], [2500.0, 3.0], [2600.0, 3.0], [2800.0, 1.0], [2700.0, 5.0], [2900.0, 3.0], [3000.0, 3.0], [3100.0, 2.0], [3300.0, 2.0], [3200.0, 2.0], [3400.0, 1.0], [3500.0, 2.0], [3700.0, 2.0], [3600.0, 1.0], [3900.0, 1.0], [4100.0, 1.0], [4600.0, 1.0], [4800.0, 1.0], [4700.0, 1.0], [5200.0, 1.0], [5600.0, 1.0], [5700.0, 1.0], [5800.0, 1.0], [6100.0, 1.0], [6300.0, 1.0], [6600.0, 1.0], [6800.0, 1.0], [7100.0, 1.0], [7400.0, 1.0], [7300.0, 1.0], [7700.0, 1.0], [8400.0, 1.0], [8200.0, 1.0], [8700.0, 1.0], [9200.0, 1.0], [9800.0, 1.0], [10400.0, 1.0], [12000.0, 1.0], [12700.0, 1.0], [12900.0, 1.0], [14000.0, 1.0], [14500.0, 1.0], [14400.0, 1.0], [14700.0, 1.0], [15200.0, 1.0], [15300.0, 1.0], [15700.0, 1.0], [15600.0, 1.0], [16300.0, 1.0], [16800.0, 1.0], [18200.0, 1.0], [20300.0, 1.0], [19500.0, 1.0], [22200.0, 1.0], [23900.0, 1.0], [100.0, 91.0], [28800.0, 1.0], [200.0, 36.0], [300.0, 38.0], [400.0, 13.0], [500.0, 6.0]], "isOverall": false, "label": "WS read policy import result", "isController": false}, {"data": [[0.0, 45.0], [2500.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [3400.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "WS read sr key gen result", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [700.0, 3.0], [800.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[0.0, 40.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[300.0, 2.0], [800.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Grant KYC", "isController": false}, {"data": [[166500.0, 1.0], [167000.0, 1.0], [178400.0, 1.0], [184100.0, 1.0], [181700.0, 1.0]], "isOverall": false, "label": "Requests for Publish", "isController": true}, {"data": [[600.0, 2.0], [1200.0, 1.0], [1500.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get tenant id-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[5100.0, 1.0], [5200.0, 1.0], [6000.0, 1.0], [6300.0, 1.0], [6400.0, 1.0]], "isOverall": false, "label": "Requests for Issue approve", "isController": true}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [2300.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [800.0, 1.0], [1800.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[0.0, 50.0]], "isOverall": false, "label": "WS PP sr key gen-0", "isController": false}, {"data": [[700.0, 4.0], [2900.0, 1.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[0.0, 55.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[600.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 1.0], [4000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [200.0, 1.0], [400.0, 3.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[2200.0, 1.0], [2300.0, 2.0], [2400.0, 1.0], [3200.0, 1.0]], "isOverall": false, "label": "Issue create", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 16.0], [700.0, 2.0], [200.0, 11.0], [400.0, 6.0], [1700.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[0.0, 108.0], [600.0, 2.0], [700.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 1.0], [1100.0, 3.0], [1200.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [1800.0, 2.0], [2000.0, 2.0], [2100.0, 2.0], [2200.0, 2.0], [2300.0, 1.0], [2400.0, 1.0], [2500.0, 4.0], [2600.0, 6.0], [2800.0, 1.0], [2700.0, 2.0], [2900.0, 5.0], [3000.0, 1.0], [3100.0, 5.0], [3200.0, 2.0], [3300.0, 3.0], [3400.0, 3.0], [3500.0, 1.0], [3600.0, 1.0], [3800.0, 3.0], [3900.0, 3.0], [4000.0, 3.0], [4300.0, 3.0], [4100.0, 5.0], [4200.0, 1.0], [4400.0, 1.0], [4600.0, 2.0], [4500.0, 1.0], [4800.0, 1.0], [4900.0, 2.0], [5300.0, 1.0], [5600.0, 1.0], [5800.0, 1.0], [6200.0, 1.0], [6300.0, 1.0], [6700.0, 3.0], [6900.0, 1.0], [7000.0, 1.0], [7300.0, 1.0], [7900.0, 2.0], [8000.0, 1.0], [8400.0, 1.0], [9500.0, 1.0], [9400.0, 1.0], [9300.0, 1.0], [10200.0, 1.0], [10400.0, 2.0], [10300.0, 1.0], [10700.0, 1.0], [10600.0, 1.0], [10800.0, 1.0], [11400.0, 1.0], [12000.0, 1.0], [11800.0, 1.0], [12700.0, 1.0], [12500.0, 1.0], [13100.0, 1.0], [12900.0, 1.0], [13000.0, 1.0], [13500.0, 2.0], [13700.0, 2.0], [13800.0, 2.0], [14100.0, 1.0], [14000.0, 1.0], [14600.0, 1.0], [14400.0, 1.0], [15100.0, 1.0], [14900.0, 1.0], [15000.0, 1.0], [15400.0, 1.0], [15600.0, 1.0], [16000.0, 1.0], [16100.0, 1.0], [16400.0, 1.0], [17500.0, 1.0], [100.0, 45.0], [200.0, 22.0], [300.0, 9.0], [400.0, 6.0], [500.0, 4.0]], "isOverall": false, "label": "WS read policy publish result", "isController": false}, {"data": [[600.0, 7.0], [700.0, 1.0], [200.0, 2.0], [800.0, 2.0], [900.0, 5.0], [1000.0, 2.0], [1100.0, 1.0], [300.0, 9.0], [1300.0, 1.0], [400.0, 6.0], [1600.0, 1.0], [1900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[0.0, 330.0]], "isOverall": false, "label": "WS PP policy publish", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[0.0, 37.0], [300.0, 2.0], [9600.0, 1.0], [5500.0, 1.0], [200.0, 8.0], [100.0, 9.0], [1800.0, 1.0], [3800.0, 1.0], [500.0, 3.0], [15900.0, 1.0]], "isOverall": false, "label": "WS read  token associate result", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[9800.0, 1.0], [5100.0, 2.0], [4900.0, 1.0], [6100.0, 1.0]], "isOverall": false, "label": "Requests for Device approve", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 326100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 325.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1 500ms"], [2, "Requests having \nresponse time > 1 500ms"], [3, "Requests in error"]], "maxY": 5976.0, "series": [{"data": [[0.0, 5976.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 325.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1 500ms", "isController": false}, {"data": [[2.0, 377.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1 500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7223432E12, "maxY": 5.0, "series": [{"data": [[1.72234386E12, 0.0], [1.7223432E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.7223432E12, 3.40080971659919], [1.72234326E12, 4.334158415841581], [1.72234332E12, 1.414893617021276]], "isOverall": false, "label": "Users creation", "isController": false}, {"data": [[1.72234386E12, 3.923076923076922], [1.72234338E12, 5.0], [1.72234368E12, 5.0], [1.72234374E12, 5.0], [1.72234356E12, 5.0], [1.72234362E12, 5.0], [1.72234344E12, 5.0], [1.7223435E12, 5.0], [1.7223438E12, 5.0], [1.72234332E12, 3.330464716006881]], "isOverall": false, "label": "Policy workflow", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72234386E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 315470.6, "series": [{"data": [[4.0, 1009.0], [5.0, 881.75]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[4.8, 907.2]], "isOverall": false, "label": "Get issues-Aggregated", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Get block for waiting app approve-0-Aggregated", "isController": false}, {"data": [[2.0, 465.0], [4.0, 386.0], [5.0, 471.5], [3.0, 500.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[3.8, 458.8]], "isOverall": false, "label": "Link SR profile-Aggregated", "isController": false}, {"data": [[5.0, 1.4]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[5.0, 1.4]], "isOverall": false, "label": "Get device issue row-0-Aggregated", "isController": false}, {"data": [[5.0, 1.25]], "isOverall": false, "label": "WS PP kyc grant", "isController": false}, {"data": [[5.0, 1.25]], "isOverall": false, "label": "WS PP kyc grant-Aggregated", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "Get hedera id-0-Aggregated", "isController": false}, {"data": [[5.0, 5753.8]], "isOverall": false, "label": "Requests for Role approve", "isController": true}, {"data": [[5.0, 5753.8]], "isOverall": false, "label": "Requests for Role approve-Aggregated", "isController": true}, {"data": [[4.0, 0.3125], [2.0, 0.4], [1.0, 0.3461538461538462], [5.0, 0.2941176470588235], [3.0, 0.5000000000000001]], "isOverall": false, "label": "WS PP user link-0", "isController": false}, {"data": [[3.0937500000000013, 0.3750000000000001]], "isOverall": false, "label": "WS PP user link-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Import Policy-0-Aggregated", "isController": false}, {"data": [[5.0, 1.4]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[5.0, 1.4]], "isOverall": false, "label": "Get device approve result-0-Aggregated", "isController": false}, {"data": [[5.0, 8657.4]], "isOverall": false, "label": "Requests for Issue creation", "isController": true}, {"data": [[5.0, 8657.4]], "isOverall": false, "label": "Requests for Issue creation-Aggregated", "isController": true}, {"data": [[1.0, 382.0], [2.0, 495.0], [4.0, 468.0], [5.0, 832.0], [3.0, 475.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[3.0, 530.4]], "isOverall": false, "label": "Import Policy-Aggregated", "isController": false}, {"data": [[5.0, 1097.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[5.0, 1097.0]], "isOverall": false, "label": "Get applications-Aggregated", "isController": false}, {"data": [[5.0, 534.2]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[5.0, 534.2]], "isOverall": false, "label": "Get block for waiting device-Aggregated", "isController": false}, {"data": [[4.0, 0.5], [2.0, 0.5499999999999999], [1.0, 0.46153846153846156], [5.0, 0.47058823529411775], [3.0, 0.6875]], "isOverall": false, "label": "WS PP user link", "isController": false}, {"data": [[3.0937500000000013, 0.5390624999999998]], "isOverall": false, "label": "WS PP user link-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Get result for issue request approve-Aggregated", "isController": true}, {"data": [[2.0, 0.5], [5.0, 0.0], [3.0, 0.33333333333333337]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[3.8, 0.20000000000000004]], "isOverall": false, "label": "Get Access Token-0-Aggregated", "isController": false}, {"data": [[4.0, 0.25], [2.0, 0.20000000000000004], [5.0, 0.2692307692307692], [3.0, 0.10000000000000002]], "isOverall": false, "label": "WS PP user key gen-0", "isController": false}, {"data": [[3.9199999999999995, 0.21999999999999997]], "isOverall": false, "label": "WS PP user key gen-0-Aggregated", "isController": false}, {"data": [[1.0, 848.0], [2.0, 779.0], [4.0, 781.0], [5.0, 779.0], [3.0, 787.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[3.0, 794.8]], "isOverall": false, "label": "WS open for policy import-Aggregated", "isController": false}, {"data": [[5.0, 1002.2]], "isOverall": false, "label": "WS open for tokens associate", "isController": false}, {"data": [[5.0, 1002.2]], "isOverall": false, "label": "WS open for tokens associate-Aggregated", "isController": false}, {"data": [[5.0, 1600.0], [3.0, 1878.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[4.6, 1655.6]], "isOverall": false, "label": "Get issue approve result-Aggregated", "isController": false}, {"data": [[5.0, 0.7968750000000001]], "isOverall": false, "label": "WS PP token associate-0", "isController": false}, {"data": [[5.0, 0.7968750000000001]], "isOverall": false, "label": "WS PP token associate-0-Aggregated", "isController": false}, {"data": [[2.0, 1015.0], [5.0, 614.88], [3.0, 817.75]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[4.799999999999999, 636.9090909090908]], "isOverall": false, "label": "Login by user-Aggregated", "isController": false}, {"data": [[5.0, 996.3333333333334]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[5.0, 996.3333333333334]], "isOverall": false, "label": "Get application creation status-Aggregated", "isController": false}, {"data": [[5.0, 5907.4]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[5.0, 5907.4]], "isOverall": false, "label": "Choose registrant-Aggregated", "isController": false}, {"data": [[1.0, 770.5], [2.0, 485.5], [4.0, 972.5], [5.0, 805.0], [3.0, 554.5]], "isOverall": false, "label": "Get tenant id", "isController": false}, {"data": [[3.0, 717.5999999999999]], "isOverall": false, "label": "Get tenant id-Aggregated", "isController": false}, {"data": [[2.0, 380.0], [5.0, 577.0], [3.0, 681.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[3.6, 579.2]], "isOverall": false, "label": "Get SR DID-Aggregated", "isController": false}, {"data": [[1.0, 701.0], [5.0, 1655.5], [3.0, 710.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[3.4, 1086.4]], "isOverall": false, "label": "Link user profile-Aggregated", "isController": false}, {"data": [[5.0, 818.4]], "isOverall": false, "label": "WS open for policy publish", "isController": false}, {"data": [[5.0, 818.4]], "isOverall": false, "label": "WS open for policy publish-Aggregated", "isController": false}, {"data": [[1.0, 951.0], [2.0, 632.0], [4.0, 484.0], [5.0, 611.0], [3.0, 589.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[3.0, 653.4]], "isOverall": false, "label": "Invite user-Aggregated", "isController": false}, {"data": [[5.0, 1196.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[5.0, 1196.0]], "isOverall": false, "label": "Get issue schema-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [2.0, 1.0], [4.0, 0.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[3.0, 0.4]], "isOverall": false, "label": "WS open for policy import-0-Aggregated", "isController": false}, {"data": [[4.0, 75782.0], [2.0, 79468.0], [1.0, 79632.0], [5.0, 82547.0], [3.0, 78679.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[3.0, 79221.6]], "isOverall": false, "label": "User creation flow-Aggregated", "isController": true}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Get block for waiting issue request-0-Aggregated", "isController": false}, {"data": [[1.0, 0.2777777777777778], [2.0, 0.34615384615384615], [4.0, 0.29411764705882343], [5.0, 0.3529411764705883], [3.0, 0.25]], "isOverall": false, "label": "WS read policy import result-0", "isController": false}, {"data": [[4.633027522935784, 0.34495412844036677]], "isOverall": false, "label": "WS read policy import result-0-Aggregated", "isController": false}, {"data": [[1.0, 1408.0], [2.0, 1837.0], [4.0, 2586.0], [5.0, 2592.0], [3.0, 1694.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[3.0, 2023.4]], "isOverall": false, "label": "Get tenant-Aggregated", "isController": true}, {"data": [[5.0, 1386.8]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[5.0, 1386.8]], "isOverall": false, "label": "Approve device-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link user-Aggregated", "isController": true}, {"data": [[4.0, 47274.0], [5.0, 49899.333333333336], [3.0, 47528.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[4.4, 48900.0]], "isOverall": false, "label": "User creation(SR side)-Aggregated", "isController": true}, {"data": [[5.0, 1950.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[5.0, 1950.0]], "isOverall": false, "label": "Publish Policy-Aggregated", "isController": false}, {"data": [[5.0, 18234.2]], "isOverall": false, "label": "Requests for Grant KYC", "isController": true}, {"data": [[5.0, 18234.2]], "isOverall": false, "label": "Requests for Grant KYC-Aggregated", "isController": true}, {"data": [[2.0, 2052.0], [5.0, 2054.8], [3.0, 2064.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[3.8, 2057.0]], "isOverall": false, "label": "Get Access Token-Aggregated", "isController": false}, {"data": [[2.0, 0.4], [4.0, 0.38888888888888895], [5.0, 0.42241379310344823], [3.0, 0.41666666666666663]], "isOverall": false, "label": "WS read sr link result-0", "isController": false}, {"data": [[4.503067484662577, 0.4171779141104296]], "isOverall": false, "label": "WS read sr link result-0-Aggregated", "isController": false}, {"data": [[5.0, 1.0625]], "isOverall": false, "label": "WS PP token associate", "isController": false}, {"data": [[5.0, 1.0625]], "isOverall": false, "label": "WS PP token associate-Aggregated", "isController": false}, {"data": [[2.0, 2067.0], [5.0, 2062.5], [3.0, 2064.5]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[3.6, 2064.2]], "isOverall": false, "label": "Get user keys-Aggregated", "isController": false}, {"data": [[5.0, 1.0], [3.0, 2.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[4.6, 1.2]], "isOverall": false, "label": "Get issue approve result-0-Aggregated", "isController": false}, {"data": [[5.0, 0.33333333333333337], [3.0, 0.5]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[4.2, 0.4]], "isOverall": false, "label": "WS open for user key gen-0-Aggregated", "isController": false}, {"data": [[5.0, 888.8]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[5.0, 888.8]], "isOverall": false, "label": "Get application schema-Aggregated", "isController": false}, {"data": [[5.0, 0.609375]], "isOverall": false, "label": "WS read kyc grant result-0", "isController": false}, {"data": [[5.0, 0.609375]], "isOverall": false, "label": "WS read kyc grant result-0-Aggregated", "isController": false}, {"data": [[5.0, 559.8]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[5.0, 559.8]], "isOverall": false, "label": "Get block for waiting app approve-Aggregated", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Approve application-0-Aggregated", "isController": false}, {"data": [[4.0, 22726.0], [2.0, 26275.0], [1.0, 26173.0], [5.0, 23324.0], [3.0, 24328.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[3.0, 24565.2]], "isOverall": false, "label": "User creation(user side)-Aggregated", "isController": true}, {"data": [[1.0, 0.0], [2.0, 0.33333333333333337], [4.0, 0.6666666666666666], [5.0, 0.0], [3.0, 0.6666666666666666]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[3.0, 0.3333333333333333]], "isOverall": false, "label": "Get Admin Access Token-0-Aggregated", "isController": false}, {"data": [[2.0, 0.19999999999999998], [4.0, 0.19999999999999998], [5.0, 0.30000000000000004], [3.0, 0.4]], "isOverall": false, "label": "WS PP sr key gen", "isController": false}, {"data": [[3.7999999999999985, 0.2800000000000001]], "isOverall": false, "label": "WS PP sr key gen-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [5.0, 0.0], [3.0, 1.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[3.0, 0.2]], "isOverall": false, "label": "Accept sr-0-Aggregated", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Issue create-0", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Issue create-0-Aggregated", "isController": false}, {"data": [[1.0, 2066.0], [2.0, 2071.0], [4.0, 2068.5], [5.0, 2063.75], [3.0, 2063.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[3.6999999999999997, 2065.5]], "isOverall": false, "label": "Login by SR OS-Aggregated", "isController": false}, {"data": [[2.0, 2066.0], [4.0, 2059.0], [5.0, 2065.5], [3.0, 2064.0]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[3.8, 2064.0]], "isOverall": false, "label": "Get sr keys-Aggregated", "isController": false}, {"data": [[5.0, 1.6666666666666667], [3.0, 2.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[4.2, 1.8]], "isOverall": false, "label": "WS open for user key gen-Aggregated", "isController": false}, {"data": [[5.0, 499.6]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[5.0, 499.6]], "isOverall": false, "label": "Get block for waiting issue request-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [2.0, 1.0], [1.0, 2.0], [5.0, 0.5], [3.0, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[3.6999999999999993, 0.7]], "isOverall": false, "label": "Verify link-0-Aggregated", "isController": false}, {"data": [[5.0, 315470.6]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[5.0, 315470.6]], "isOverall": false, "label": "Policy import and publish-Aggregated", "isController": true}, {"data": [[5.0, 8351.4]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[5.0, 8351.4]], "isOverall": false, "label": "Create device-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept SR-Aggregated", "isController": true}, {"data": [[5.0, 13302.0]], "isOverall": false, "label": "Requests for Device creation", "isController": true}, {"data": [[5.0, 13302.0]], "isOverall": false, "label": "Requests for Device creation-Aggregated", "isController": true}, {"data": [[5.0, 787.4]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[5.0, 787.4]], "isOverall": false, "label": "Get hedera id-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get block for waiting app creation-0-Aggregated", "isController": false}, {"data": [[4.0, 0.5], [2.0, 0.39999999999999997], [5.0, 0.42307692307692313], [3.0, 0.3]], "isOverall": false, "label": "WS PP user key gen", "isController": false}, {"data": [[3.9199999999999995, 0.40000000000000013]], "isOverall": false, "label": "WS PP user key gen-Aggregated", "isController": false}, {"data": [[1.0, 471.0], [2.0, 740.0], [4.0, 466.0], [5.0, 588.0], [3.0, 460.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[3.0, 545.0]], "isOverall": false, "label": "Accept sr-Aggregated", "isController": false}, {"data": [[1.0, 5997.0], [2.0, 5396.0], [4.0, 5919.0], [5.0, 5931.0], [3.0, 5539.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[3.0, 5756.4]], "isOverall": false, "label": "User creation(admin side)-Aggregated", "isController": true}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Choose registrant-0-Aggregated", "isController": false}, {"data": [[4.0, 736.8], [2.0, 263.20000000000005], [5.0, 200.79999999999998], [3.0, 274.40000000000003]], "isOverall": false, "label": "WS read user key gen result", "isController": false}, {"data": [[3.900000000000001, 281.6000000000001]], "isOverall": false, "label": "WS read user key gen result-Aggregated", "isController": false}, {"data": [[5.0, 787.6]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[5.0, 787.6]], "isOverall": false, "label": "WS open for kyc grant-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [5.0, 1.16], [3.0, 1.25]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[4.799999999999999, 1.1636363636363638]], "isOverall": false, "label": "Login by user-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [4.0, 1.0], [5.0, 1.0], [3.0, 1.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[3.8, 1.0]], "isOverall": false, "label": "Link SR profile-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [4.0, 0.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[3.8, 0.0]], "isOverall": false, "label": "Get sr keys-0-Aggregated", "isController": false}, {"data": [[5.0, 1.4]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[5.0, 1.4]], "isOverall": false, "label": "Get devices-0-Aggregated", "isController": false}, {"data": [[4.0, 10721.0], [2.0, 4880.333333333333], [1.0, 3815.0], [5.0, 4598.857142857143], [3.0, 4399.166666666666]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[3.421052631578948, 4819.9473684210525]], "isOverall": false, "label": "Balance verify-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate user hedera data-Aggregated", "isController": true}, {"data": [[5.0, 13992.8]], "isOverall": false, "label": "Requests for Token associate", "isController": true}, {"data": [[5.0, 13992.8]], "isOverall": false, "label": "Requests for Token associate-Aggregated", "isController": true}, {"data": [[2.0, 0.5], [4.0, 0.3], [5.0, 0.4], [3.0, 0.10000000000000002]], "isOverall": false, "label": "WS read sr key gen result-0", "isController": false}, {"data": [[3.7999999999999985, 0.3399999999999999]], "isOverall": false, "label": "WS read sr key gen result-0-Aggregated", "isController": false}, {"data": [[5.0, 478.2]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[5.0, 478.2]], "isOverall": false, "label": "Get block for waiting app creation-Aggregated", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[5.0, 1.2]], "isOverall": false, "label": "Approve device-0-Aggregated", "isController": false}, {"data": [[1.0, 627.0], [2.0, 711.6666666666666], [4.0, 550.3333333333334], [5.0, 670.3333333333334], [3.0, 614.3333333333334]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[3.0, 634.7333333333333]], "isOverall": false, "label": "Login by Admin-Aggregated", "isController": false}, {"data": [[5.0, 1219.8]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[5.0, 1219.8]], "isOverall": false, "label": "Get devices-Aggregated", "isController": false}, {"data": [[4.0, 0.5882352941176472], [2.0, 0.28571428571428575], [1.0, 0.8461538461538461], [5.0, 0.5454545454545454], [3.0, 0.3548387096774194]], "isOverall": false, "label": "WS read user link result-0", "isController": false}, {"data": [[3.0781249999999996, 0.5234375000000001]], "isOverall": false, "label": "WS read user link result-0-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Generate sr hedera data-Aggregated", "isController": true}, {"data": [[5.0, 1.6]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[5.0, 1.6]], "isOverall": false, "label": "Get applications-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [5.0, 0.25], [3.0, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[3.6999999999999997, 0.09999999999999999]], "isOverall": false, "label": "Login by SR OS-0-Aggregated", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Get device schema-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [5.0, 0.0], [3.0, 0.5]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[3.6, 0.2]], "isOverall": false, "label": "Get SR DID-0-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [5.0, 1.25]], "isOverall": false, "label": "Get issues-0", "isController": false}, {"data": [[4.8, 1.2]], "isOverall": false, "label": "Get issues-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [5.0, 0.5], [3.0, 0.5]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[3.6, 0.6]], "isOverall": false, "label": "Get user keys-0-Aggregated", "isController": false}, {"data": [[5.0, 0.9687499999999999]], "isOverall": false, "label": "WS PP kyc grant-0", "isController": false}, {"data": [[5.0, 0.9687499999999999]], "isOverall": false, "label": "WS PP kyc grant-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [5.0, 1.0], [3.0, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[3.0, 0.2]], "isOverall": false, "label": "Invite user-0-Aggregated", "isController": false}, {"data": [[2.0, 768.0], [4.0, 771.0], [5.0, 769.0], [3.0, 761.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[3.8, 767.6]], "isOverall": false, "label": "WS open for sr link-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "WS open for tokens associate-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "WS open for tokens associate-0-Aggregated", "isController": false}, {"data": [[5.0, 891.75], [3.0, 482.0]], "isOverall": false, "label": "Approve issue", "isController": false}, {"data": [[4.6, 809.8]], "isOverall": false, "label": "Approve issue-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Invite sr-0-Aggregated", "isController": false}, {"data": [[1.0, 1.0], [5.0, 1.0], [3.0, 1.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[3.4, 1.0]], "isOverall": false, "label": "Link user profile-0-Aggregated", "isController": false}, {"data": [[1.0, 268.0], [2.0, 353.0], [4.0, 344.0], [5.0, 356.0], [3.0, 347.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[3.0, 333.59999999999997]], "isOverall": false, "label": "Get Admin Access Token-Aggregated", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "Create device-0-Aggregated", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Get issue schema-0-Aggregated", "isController": false}, {"data": [[5.0, 1264.2]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[5.0, 1264.2]], "isOverall": false, "label": "Get device issue row-Aggregated", "isController": false}, {"data": [[1.0, 679.0], [2.0, 645.0], [4.0, 630.0], [5.0, 576.0], [3.0, 1014.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[3.0, 708.8]], "isOverall": false, "label": "Invite sr-Aggregated", "isController": false}, {"data": [[2.0, 35.0], [4.0, 1115.0], [5.0, 1178.6810344827588], [3.0, 713.25]], "isOverall": false, "label": "WS read sr link result", "isController": false}, {"data": [[4.503067484662577, 1068.0368098159513]], "isOverall": false, "label": "WS read sr link result-Aggregated", "isController": false}, {"data": [[2.0, 2054.0], [5.0, 2064.3333333333335], [3.0, 2057.0]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[4.0, 2060.8]], "isOverall": false, "label": "Generate user keys-Aggregated", "isController": false}, {"data": [[2.0, 2060.0], [4.0, 2069.0], [5.0, 2063.0], [3.0, 2044.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[3.8, 2059.8]], "isOverall": false, "label": "Generate sr keys-Aggregated", "isController": false}, {"data": [[5.0, 1315.4]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[5.0, 1315.4]], "isOverall": false, "label": "Get policy id-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Get result for device approve-Aggregated", "isController": true}, {"data": [[5.0, 1.1]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[5.0, 1.1]], "isOverall": false, "label": "Get block for approve result-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [4.0, 1.0], [5.0, 1.0], [3.0, 1.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[3.8, 0.8]], "isOverall": false, "label": "Generate sr keys-0-Aggregated", "isController": false}, {"data": [[5.0, 700.6]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[5.0, 700.6]], "isOverall": false, "label": "Approve application-Aggregated", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "WS open for policy publish-0", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "WS open for policy publish-0-Aggregated", "isController": false}, {"data": [[5.0, 867.8]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[5.0, 867.8]], "isOverall": false, "label": "Associate token-Aggregated", "isController": false}, {"data": [[5.0, 0.42121212121212115]], "isOverall": false, "label": "WS read policy publish result-0", "isController": false}, {"data": [[5.0, 0.42121212121212115]], "isOverall": false, "label": "WS read policy publish result-0-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get block for waiting device-0-Aggregated", "isController": false}, {"data": [[2.0, 0.5], [4.0, 0.2631578947368421], [5.0, 0.4210526315789474], [3.0, 0.4583333333333333]], "isOverall": false, "label": "WS PP sr link", "isController": false}, {"data": [[4.478527607361961, 0.4110429447852761]], "isOverall": false, "label": "WS PP sr link-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 1.3333333333333333], [1.0, 1.0], [5.0, 1.4285714285714286], [3.0, 3.5]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[3.421052631578948, 2.052631578947368]], "isOverall": false, "label": "Balance verify-0-Aggregated", "isController": false}, {"data": [[4.0, 352.88235294117646], [2.0, 481.4285714285715], [1.0, 349.8461538461538], [5.0, 276.2727272727272], [3.0, 298.6129032258064]], "isOverall": false, "label": "WS read user link result", "isController": false}, {"data": [[3.0781249999999996, 340.46093749999994]], "isOverall": false, "label": "WS read user link result-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Invite and accept user-Aggregated", "isController": true}, {"data": [[2.0, 705.0], [5.0, 527.1], [3.0, 658.75]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[4.799999999999999, 539.9090909090908]], "isOverall": false, "label": "Get User Access Token-Aggregated", "isController": false}, {"data": [[1.0, 0.26315789473684215], [2.0, 0.14814814814814814], [4.0, 0.2571428571428572], [5.0, 0.31648351648351647], [3.0, 0.2222222222222222]], "isOverall": false, "label": "WS PP policy import", "isController": false}, {"data": [[4.614678899082566, 0.3009174311926604]], "isOverall": false, "label": "WS PP policy import-Aggregated", "isController": false}, {"data": [[1.0, 0.21052631578947367], [2.0, 0.11111111111111112], [4.0, 0.2571428571428572], [5.0, 0.1692307692307693], [3.0, 0.1111111111111111]], "isOverall": false, "label": "WS PP policy import-0", "isController": false}, {"data": [[4.614678899082566, 0.1724770642201835]], "isOverall": false, "label": "WS PP policy import-0-Aggregated", "isController": false}, {"data": [[1.0, 633.0], [2.0, 446.0], [4.0, 784.0], [5.0, 761.0], [3.0, 536.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[3.0, 632.0]], "isOverall": false, "label": "Accept user-Aggregated", "isController": false}, {"data": [[5.0, 0.6249999999999998]], "isOverall": false, "label": "WS read  token associate result-0", "isController": false}, {"data": [[5.0, 0.6249999999999998]], "isOverall": false, "label": "WS read  token associate result-0-Aggregated", "isController": false}, {"data": [[5.0, 940.2]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[5.0, 940.2]], "isOverall": false, "label": "Get tokens-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Get result for app approve-Aggregated", "isController": true}, {"data": [[5.0, 1.1111111111111112]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[5.0, 1.1111111111111112]], "isOverall": false, "label": "Get application creation status-0-Aggregated", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[5.0, 1.0]], "isOverall": false, "label": "Create application-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [4.0, 0.5], [1.0, 0.0], [5.0, 1.1515151515151514], [3.0, 0.5]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[4.6000000000000005, 1.05]], "isOverall": false, "label": "Login by SR-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[3.4, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [5.0, 1.5], [3.0, 1.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[3.4, 1.2]], "isOverall": false, "label": "WS open for sr key gen-Aggregated", "isController": false}, {"data": [[2.0, 0.16666666666666669], [4.0, 0.15789473684210525], [5.0, 0.2807017543859649], [3.0, 0.16666666666666663]], "isOverall": false, "label": "WS PP sr link-0", "isController": false}, {"data": [[4.478527607361961, 0.2453987730061349]], "isOverall": false, "label": "WS PP sr link-0-Aggregated", "isController": false}, {"data": [[5.0, 0.4030303030303033]], "isOverall": false, "label": "WS PP policy publish-0", "isController": false}, {"data": [[5.0, 0.4030303030303033]], "isOverall": false, "label": "WS PP policy publish-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [5.0, 0.6666666666666666], [3.0, 1.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[4.0, 0.6]], "isOverall": false, "label": "Generate user keys-0-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [5.0, 1.0], [3.0, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[3.0, 0.2]], "isOverall": false, "label": "Get Tenant Id-0-Aggregated", "isController": false}, {"data": [[1.0, 0.33333333333333337], [2.0, 0.33333333333333337], [4.0, 0.33333333333333337], [5.0, 0.3333333333333333], [3.0, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[3.0, 0.26666666666666666]], "isOverall": false, "label": "Login by Admin-0-Aggregated", "isController": false}, {"data": [[5.0, 1202.046875]], "isOverall": false, "label": "WS read kyc grant result", "isController": false}, {"data": [[5.0, 1202.046875]], "isOverall": false, "label": "WS read kyc grant result-Aggregated", "isController": false}, {"data": [[4.0, 23245.0], [2.0, 20317.0], [1.0, 17610.0], [5.0, 23210.0], [3.0, 14756.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[3.0, 19827.6]], "isOverall": false, "label": "Token minting verify-Aggregated", "isController": true}, {"data": [[5.0, 1628.6]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[5.0, 1628.6]], "isOverall": false, "label": "Create application-Aggregated", "isController": false}, {"data": [[4.0, 0.4], [2.0, 0.5], [5.0, 0.36], [3.0, 0.9]], "isOverall": false, "label": "WS read user key gen result-0", "isController": false}, {"data": [[3.900000000000001, 0.4999999999999999]], "isOverall": false, "label": "WS read user key gen result-0-Aggregated", "isController": false}, {"data": [[5.0, 0.2]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[5.0, 0.2]], "isOverall": false, "label": "Get policy id-0-Aggregated", "isController": false}, {"data": [[5.0, 2563.2]], "isOverall": false, "label": "Get token ID", "isController": true}, {"data": [[5.0, 2563.2]], "isOverall": false, "label": "Get token ID-Aggregated", "isController": true}, {"data": [[5.0, 1.5], [3.0, 1.0]], "isOverall": false, "label": "Approve issue-0", "isController": false}, {"data": [[4.6, 1.4]], "isOverall": false, "label": "Approve issue-0-Aggregated", "isController": false}, {"data": [[5.0, 139887.8]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[5.0, 139887.8]], "isOverall": false, "label": "Requests for Import-Aggregated", "isController": true}, {"data": [[5.0, 11170.4]], "isOverall": false, "label": "Requests for Application creation", "isController": true}, {"data": [[5.0, 11170.4]], "isOverall": false, "label": "Requests for Application creation-Aggregated", "isController": true}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "Get application schema-0-Aggregated", "isController": false}, {"data": [[1.0, 359.9444444444444], [2.0, 558.4230769230769], [4.0, 1063.9411764705878], [5.0, 1361.4901960784307], [3.0, 40.0]], "isOverall": false, "label": "WS read policy import result", "isController": false}, {"data": [[4.633027522935784, 1252.1394495412826]], "isOverall": false, "label": "WS read policy import result-Aggregated", "isController": false}, {"data": [[2.0, 359.1], [4.0, 328.8], [5.0, 266.5], [3.0, 258.6]], "isOverall": false, "label": "WS read sr key gen result", "isController": false}, {"data": [[3.7999999999999985, 295.9]], "isOverall": false, "label": "WS read sr key gen result-Aggregated", "isController": false}, {"data": [[5.0, 743.5]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[5.0, 743.5]], "isOverall": false, "label": "Get block for approve result-Aggregated", "isController": false}, {"data": [[5.0, 971.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[5.0, 971.0]], "isOverall": false, "label": "Get device schema-Aggregated", "isController": false}, {"data": [[2.0, 0.5], [4.0, 0.5], [1.0, 1.0], [5.0, 0.8484848484848485], [3.0, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[4.6000000000000005, 0.7749999999999999]], "isOverall": false, "label": "Get SR Access Token-0-Aggregated", "isController": false}, {"data": [[5.0, 454.4]], "isOverall": false, "label": "Grant KYC", "isController": false}, {"data": [[5.0, 454.4]], "isOverall": false, "label": "Grant KYC-Aggregated", "isController": false}, {"data": [[5.0, 175582.8]], "isOverall": false, "label": "Requests for Publish", "isController": true}, {"data": [[5.0, 175582.8]], "isOverall": false, "label": "Requests for Publish-Aggregated", "isController": true}, {"data": [[1.0, 445.0], [2.0, 605.0], [4.0, 1513.0], [5.0, 1298.0], [3.0, 641.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[3.0, 900.4]], "isOverall": false, "label": "Get Tenant Id-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 0.0], [5.0, 0.5], [3.0, 0.0]], "isOverall": false, "label": "Get tenant id-0", "isController": false}, {"data": [[3.0, 0.1]], "isOverall": false, "label": "Get tenant id-0-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "Grant KYC-0-Aggregated", "isController": false}, {"data": [[5.0, 5701.0], [3.0, 6493.0]], "isOverall": false, "label": "Requests for Issue approve", "isController": true}, {"data": [[4.6, 5859.4]], "isOverall": false, "label": "Requests for Issue approve-Aggregated", "isController": true}, {"data": [[5.0, 1432.375]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[5.0, 1432.375]], "isOverall": false, "label": "Get issue creation status-Aggregated", "isController": false}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[0.0, 0.0]], "isOverall": false, "label": "Link SR-Aggregated", "isController": true}, {"data": [[5.0, 1247.8]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[5.0, 1247.8]], "isOverall": false, "label": "Get device approve result-Aggregated", "isController": false}, {"data": [[2.0, 0.09999999999999999], [4.0, 0.09999999999999999], [5.0, 0.10000000000000002], [3.0, 0.3]], "isOverall": false, "label": "WS PP sr key gen-0", "isController": false}, {"data": [[3.7999999999999985, 0.14]], "isOverall": false, "label": "WS PP sr key gen-0-Aggregated", "isController": false}, {"data": [[2.0, 2944.0], [5.0, 764.0], [3.0, 789.5]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[3.6, 1210.2]], "isOverall": false, "label": "WS open for user link-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [4.0, 1.0], [5.0, 1.0], [3.0, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[3.8, 0.6]], "isOverall": false, "label": "WS open for sr link-0-Aggregated", "isController": false}, {"data": [[2.0, 0.0], [5.0, 1.0], [3.0, 0.5]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[3.6, 0.6]], "isOverall": false, "label": "WS open for user link-0-Aggregated", "isController": false}, {"data": [[2.0, 1.0], [5.0, 0.9], [3.0, 1.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[4.799999999999999, 0.909090909090909]], "isOverall": false, "label": "Get User Access Token-0-Aggregated", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[5.0, 0.4]], "isOverall": false, "label": "Associate token-0-Aggregated", "isController": false}, {"data": [[5.0, 1388.9999999999998]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[5.0, 1388.9999999999998]], "isOverall": false, "label": "Get device creation status-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [2.0, 0.0], [4.0, 1.0], [5.0, 1.0], [3.0, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[3.0, 0.4]], "isOverall": false, "label": "Accept user-0-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Get tokens-0-Aggregated", "isController": false}, {"data": [[4.0, 414.5], [2.0, 558.0], [1.0, 445.0], [5.0, 724.75], [3.0, 519.5]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[3.6999999999999993, 576.9999999999999]], "isOverall": false, "label": "Verify link-Aggregated", "isController": false}, {"data": [[5.0, 2534.6]], "isOverall": false, "label": "Issue create", "isController": false}, {"data": [[5.0, 2534.6]], "isOverall": false, "label": "Issue create-Aggregated", "isController": false}, {"data": [[2.0, 276.5], [4.0, 357.5], [1.0, 294.0], [5.0, 458.2121212121212], [3.0, 251.5]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[4.6000000000000005, 429.65]], "isOverall": false, "label": "Get SR Access Token-Aggregated", "isController": false}, {"data": [[5.0, 0.875]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[5.0, 0.875]], "isOverall": false, "label": "Get issue creation status-0-Aggregated", "isController": false}, {"data": [[5.0, 2596.812121212123]], "isOverall": false, "label": "WS read policy publish result", "isController": false}, {"data": [[5.0, 2596.812121212123]], "isOverall": false, "label": "WS read policy publish result-Aggregated", "isController": false}, {"data": [[2.0, 335.0], [4.0, 510.5], [1.0, 318.0], [5.0, 745.0909090909091], [3.0, 461.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[4.6000000000000005, 687.9749999999999]], "isOverall": false, "label": "Login by SR-Aggregated", "isController": false}, {"data": [[5.0, 1.8]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[5.0, 1.8]], "isOverall": false, "label": "Get device creation status-0-Aggregated", "isController": false}, {"data": [[5.0, 0.7393939393939395]], "isOverall": false, "label": "WS PP policy publish", "isController": false}, {"data": [[5.0, 0.7393939393939395]], "isOverall": false, "label": "WS PP policy publish-Aggregated", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[5.0, 0.6]], "isOverall": false, "label": "Publish Policy-0-Aggregated", "isController": false}, {"data": [[5.0, 679.8750000000001]], "isOverall": false, "label": "WS read  token associate result", "isController": false}, {"data": [[5.0, 679.8750000000001]], "isOverall": false, "label": "WS read  token associate result-Aggregated", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[5.0, 0.8]], "isOverall": false, "label": "WS open for kyc grant-0-Aggregated", "isController": false}, {"data": [[5.0, 6245.0]], "isOverall": false, "label": "Requests for Device approve", "isController": true}, {"data": [[5.0, 6245.0]], "isOverall": false, "label": "Requests for Device approve-Aggregated", "isController": true}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 7.3, "minX": 1.7223432E12, "maxY": 212244.9, "series": [{"data": [[1.72234386E12, 90508.41666666667], [1.72234338E12, 22950.566666666666], [1.7223432E12, 19162.133333333335], [1.72234368E12, 36824.083333333336], [1.72234326E12, 72740.76666666666], [1.72234374E12, 42796.666666666664], [1.72234356E12, 12346.933333333332], [1.72234362E12, 41328.45], [1.72234344E12, 45259.13333333333], [1.7223435E12, 17938.933333333334], [1.7223438E12, 212244.9], [1.72234332E12, 35930.416666666664]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.72234386E12, 789.9333333333333], [1.72234338E12, 14.9], [1.7223432E12, 730.5666666666667], [1.72234368E12, 925.3833333333333], [1.72234326E12, 637.2166666666667], [1.72234374E12, 1137.5666666666666], [1.72234356E12, 7.3], [1.72234362E12, 376.1166666666667], [1.72234344E12, 204.68333333333334], [1.7223435E12, 130.33333333333334], [1.7223438E12, 3117.383333333333], [1.72234332E12, 380.25]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72234386E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7223432E12, "maxY": 316925.5, "series": [{"data": [[1.72234386E12, 881.0], [1.7223438E12, 946.5]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.72234368E12, 1.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.7223432E12, 450.3333333333333], [1.72234326E12, 471.5]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7223438E12, 1.4]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.72234368E12, 1.2916666666666672], [1.72234362E12, 1.1250000000000002]], "isOverall": false, "label": "WS PP kyc grant", "isController": false}, {"data": [[1.72234368E12, 0.8]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.72234374E12, 4164.0], [1.7223438E12, 6813.666666666667]], "isOverall": false, "label": "Requests for Role approve", "isController": true}, {"data": [[1.72234326E12, 0.3837209302325582], [1.72234332E12, 0.35714285714285715]], "isOverall": false, "label": "WS PP user link-0", "isController": false}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.7223438E12, 1.4]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.72234386E12, 9454.0], [1.7223438E12, 8458.25]], "isOverall": false, "label": "Requests for Issue creation", "isController": true}, {"data": [[1.72234332E12, 530.4]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.72234374E12, 706.5], [1.7223438E12, 1357.3333333333333]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.72234368E12, 534.2]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.72234326E12, 0.569767441860465], [1.72234332E12, 0.4761904761904763]], "isOverall": false, "label": "WS PP user link", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.7223432E12, 0.5], [1.72234326E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.72234326E12, 0.21999999999999997]], "isOverall": false, "label": "WS PP user key gen-0", "isController": false}, {"data": [[1.72234332E12, 794.8]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.72234368E12, 1290.0], [1.72234362E12, 810.3333333333334]], "isOverall": false, "label": "WS open for tokens associate", "isController": false}, {"data": [[1.72234386E12, 1681.3333333333333], [1.7223438E12, 1617.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.72234368E12, 0.7179487179487177], [1.72234362E12, 0.92]], "isOverall": false, "label": "WS PP token associate-0", "isController": false}, {"data": [[1.72234386E12, 685.5], [1.72234368E12, 490.75000000000006], [1.72234326E12, 918.75], [1.72234374E12, 508.25], [1.72234362E12, 460.75], [1.7223438E12, 724.9499999999999], [1.72234332E12, 1015.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.72234374E12, 500.6666666666667], [1.7223438E12, 1987.6666666666665]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.72234368E12, 5799.5], [1.72234374E12, 5979.333333333333]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.7223432E12, 717.5999999999999]], "isOverall": false, "label": "Get tenant id", "isController": false}, {"data": [[1.72234326E12, 629.0], [1.72234332E12, 380.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.72234326E12, 1182.75], [1.72234332E12, 701.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.72234344E12, 777.3333333333334], [1.7223435E12, 880.0]], "isOverall": false, "label": "WS open for policy publish", "isController": false}, {"data": [[1.7223432E12, 653.4]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.72234386E12, 887.0], [1.7223438E12, 1273.25]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.72234332E12, 0.4]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.72234326E12, 79002.66666666667], [1.72234332E12, 79550.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.72234368E12, 0.4]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.72234338E12, 0.44295302013422827], [1.72234344E12, 0.2995951417004048], [1.7223435E12, 0.20000000000000004], [1.72234332E12, 0.346774193548387]], "isOverall": false, "label": "WS read policy import result-0", "isController": false}, {"data": [[1.72234332E12, 2023.4]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.7223438E12, 1386.8]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.72234326E12, 48900.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.72234344E12, 1741.0], [1.7223435E12, 2089.3333333333335]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.72234368E12, 18234.2]], "isOverall": false, "label": "Requests for Grant KYC", "isController": true}, {"data": [[1.7223432E12, 2060.0], [1.72234326E12, 2055.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.7223432E12, 0.4390243902439024], [1.72234326E12, 0.40983606557377034]], "isOverall": false, "label": "WS read sr link result-0", "isController": false}, {"data": [[1.72234368E12, 0.9743589743589741], [1.72234362E12, 1.2000000000000002]], "isOverall": false, "label": "WS PP token associate", "isController": false}, {"data": [[1.72234326E12, 2064.2]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.72234386E12, 1.3333333333333333], [1.7223438E12, 1.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.72234326E12, 0.4]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.72234368E12, 1024.0], [1.72234374E12, 855.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.72234368E12, 0.6399999999999999], [1.72234362E12, 0.5]], "isOverall": false, "label": "WS read kyc grant result-0", "isController": false}, {"data": [[1.72234368E12, 559.8]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.72234374E12, 1.5], [1.7223438E12, 1.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.72234326E12, 23459.333333333332], [1.72234332E12, 26224.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.7223432E12, 0.3], [1.72234332E12, 0.4]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7223432E12, 0.22500000000000003], [1.72234326E12, 0.5]], "isOverall": false, "label": "WS PP sr key gen", "isController": false}, {"data": [[1.7223432E12, 0.2]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.72234386E12, 1.0], [1.7223438E12, 1.0]], "isOverall": false, "label": "Issue create-0", "isController": false}, {"data": [[1.7223432E12, 2067.25], [1.72234326E12, 2064.3333333333335]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.7223432E12, 2063.0], [1.72234326E12, 2065.5]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.72234326E12, 1.8]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.72234368E12, 499.6]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.72234326E12, 0.5], [1.72234332E12, 1.5]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.72234368E12, 309651.0], [1.72234362E12, 316925.5]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.72234374E12, 6765.5], [1.7223438E12, 9408.666666666666]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.72234374E12, 10555.0], [1.7223438E12, 13988.75]], "isOverall": false, "label": "Requests for Device creation", "isController": true}, {"data": [[1.72234368E12, 787.4]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.72234368E12, 0.6]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.72234326E12, 0.40000000000000013]], "isOverall": false, "label": "WS PP user key gen", "isController": false}, {"data": [[1.7223432E12, 545.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7223432E12, 5712.75], [1.72234326E12, 5931.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.72234368E12, 0.5], [1.72234374E12, 0.6666666666666666]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.72234326E12, 281.6000000000001]], "isOverall": false, "label": "WS read user key gen result", "isController": false}, {"data": [[1.72234368E12, 792.3333333333334], [1.72234362E12, 780.5]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.72234386E12, 1.5], [1.72234368E12, 0.6875], [1.72234326E12, 0.75], [1.72234374E12, 1.0], [1.72234362E12, 0.25], [1.7223438E12, 1.75], [1.72234332E12, 1.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7223432E12, 1.0], [1.72234326E12, 1.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7223438E12, 1.4]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.72234386E12, 5516.538461538462], [1.7223438E12, 3310.6666666666665]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.72234368E12, 17863.666666666668], [1.72234362E12, 8186.5]], "isOverall": false, "label": "Requests for Token associate", "isController": true}, {"data": [[1.7223432E12, 0.24999999999999992], [1.72234326E12, 0.7]], "isOverall": false, "label": "WS read sr key gen result-0", "isController": false}, {"data": [[1.72234368E12, 478.2]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.7223438E12, 1.2]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.7223432E12, 586.5], [1.72234332E12, 731.2]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.7223438E12, 1219.8]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.72234326E12, 0.47058823529411753], [1.72234332E12, 0.627906976744186]], "isOverall": false, "label": "WS read user link result-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.72234374E12, 1.0], [1.7223438E12, 2.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.16666666666666669]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.72234374E12, 1.5], [1.7223438E12, 0.6666666666666666]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.72234326E12, 0.25], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.72234386E12, 1.0], [1.7223438E12, 1.5]], "isOverall": false, "label": "Get issues-0", "isController": false}, {"data": [[1.72234326E12, 0.6]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[1.72234368E12, 0.9791666666666664], [1.72234362E12, 0.9375]], "isOverall": false, "label": "WS PP kyc grant-0", "isController": false}, {"data": [[1.7223432E12, 0.2]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7223432E12, 766.6666666666666], [1.72234326E12, 769.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.72234368E12, 0.5], [1.72234362E12, 0.6666666666666667]], "isOverall": false, "label": "WS open for tokens associate-0", "isController": false}, {"data": [[1.72234386E12, 861.6666666666666], [1.7223438E12, 732.0]], "isOverall": false, "label": "Approve issue", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.72234326E12, 1.0], [1.72234332E12, 1.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7223432E12, 304.5], [1.72234332E12, 391.8]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.72234374E12, 0.5], [1.7223438E12, 1.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 1.25]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.7223438E12, 1264.2]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.7223432E12, 708.8]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7223432E12, 900.6829268292685], [1.72234326E12, 1124.2786885245903]], "isOverall": false, "label": "WS read sr link result", "isController": false}, {"data": [[1.72234326E12, 2060.8]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7223432E12, 2060.75], [1.72234326E12, 2056.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.72234344E12, 1406.0], [1.7223435E12, 953.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.72234374E12, 1.25], [1.7223438E12, 1.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.7223432E12, 0.75], [1.72234326E12, 1.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.72234374E12, 478.5], [1.7223438E12, 848.6666666666666]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.72234344E12, 0.33333333333333337], [1.7223435E12, 0.5]], "isOverall": false, "label": "WS open for policy publish-0", "isController": false}, {"data": [[1.72234368E12, 1179.0], [1.72234362E12, 401.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.72234368E12, 0.33333333333333337], [1.72234356E12, 0.4931506849315068], [1.72234362E12, 0.45333333333333337], [1.72234344E12, 0.22222222222222227], [1.7223435E12, 0.36363636363636365]], "isOverall": false, "label": "WS read policy publish result-0", "isController": false}, {"data": [[1.72234368E12, 0.6]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.7223432E12, 0.38636363636363635], [1.72234326E12, 0.4201680672268909]], "isOverall": false, "label": "WS PP sr link", "isController": false}, {"data": [[1.72234386E12, 2.3076923076923075], [1.7223438E12, 1.5]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.72234326E12, 316.88235294117646], [1.72234332E12, 387.0697674418604]], "isOverall": false, "label": "WS read user link result", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.72234386E12, 672.1666666666666], [1.72234368E12, 396.8571428571429], [1.72234326E12, 366.25], [1.72234374E12, 467.16666666666663], [1.72234362E12, 370.0], [1.7223438E12, 682.6500000000001], [1.72234332E12, 705.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.72234338E12, 0.28859060402684583], [1.72234344E12, 0.3209876543209876], [1.7223435E12, 0.29166666666666674], [1.72234332E12, 0.27906976744186046]], "isOverall": false, "label": "WS PP policy import", "isController": false}, {"data": [[1.72234338E12, 0.12080536912751687], [1.72234344E12, 0.197530864197531], [1.7223435E12, 0.25000000000000006], [1.72234332E12, 0.17054263565891464]], "isOverall": false, "label": "WS PP policy import-0", "isController": false}, {"data": [[1.7223432E12, 599.75], [1.72234326E12, 761.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.72234368E12, 0.5384615384615385], [1.72234362E12, 0.76]], "isOverall": false, "label": "WS read  token associate result-0", "isController": false}, {"data": [[1.72234368E12, 774.0], [1.72234362E12, 981.75]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.72234374E12, 1.5], [1.7223438E12, 0.3333333333333333]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.72234374E12, 1.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.72234386E12, 3.0], [1.7223432E12, 1.0], [1.72234368E12, 0.25], [1.72234326E12, 0.5], [1.72234374E12, 0.6666666666666666], [1.72234362E12, 2.6666666666666665], [1.72234344E12, 0.3333333333333333], [1.7223435E12, 0.0], [1.7223438E12, 1.272727272727273], [1.72234332E12, 0.2]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.7223432E12, 1.25], [1.72234326E12, 1.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.7223432E12, 0.15909090909090912], [1.72234326E12, 0.27731092436974797]], "isOverall": false, "label": "WS PP sr link-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234356E12, 0.4657534246575341], [1.72234362E12, 0.4520547945205482], [1.72234344E12, 0.24137931034482765], [1.7223435E12, 0.325]], "isOverall": false, "label": "WS PP policy publish-0", "isController": false}, {"data": [[1.72234326E12, 0.6]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.72234332E12, 0.2]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.7223432E12, 0.3], [1.72234332E12, 0.2]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.72234368E12, 1481.6399999999999], [1.72234362E12, 203.5]], "isOverall": false, "label": "WS read kyc grant result", "isController": false}, {"data": [[1.72234386E12, 19827.6]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.72234374E12, 1628.6]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.72234326E12, 0.4999999999999999]], "isOverall": false, "label": "WS read user key gen result-0", "isController": false}, {"data": [[1.72234344E12, 0.25], [1.7223435E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.72234368E12, 2599.0], [1.72234362E12, 2554.25]], "isOverall": false, "label": "Get token ID", "isController": true}, {"data": [[1.72234386E12, 1.6666666666666667], [1.7223438E12, 1.0]], "isOverall": false, "label": "Approve issue-0", "isController": false}, {"data": [[1.72234344E12, 139206.25], [1.7223435E12, 142614.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.72234368E12, 11170.4]], "isOverall": false, "label": "Requests for Application creation", "isController": true}, {"data": [[1.72234368E12, 0.0], [1.72234374E12, 1.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.72234338E12, 1769.0268456375848], [1.72234344E12, 1211.5748987854265], [1.7223435E12, 791.68], [1.72234332E12, 804.6774193548392]], "isOverall": false, "label": "WS read policy import result", "isController": false}, {"data": [[1.7223432E12, 290.325], [1.72234326E12, 318.2]], "isOverall": false, "label": "WS read sr key gen result", "isController": false}, {"data": [[1.72234374E12, 598.0], [1.7223438E12, 840.5]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.72234374E12, 718.0], [1.7223438E12, 1139.6666666666667]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.72234386E12, 1.5], [1.7223432E12, 0.6666666666666666], [1.72234368E12, 0.75], [1.72234326E12, 0.0], [1.72234374E12, 1.6666666666666667], [1.72234362E12, 0.33333333333333337], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.7223438E12, 1.5], [1.72234332E12, 0.2]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.72234368E12, 389.0], [1.72234362E12, 552.5]], "isOverall": false, "label": "Grant KYC", "isController": false}, {"data": [[1.72234368E12, 167037.0], [1.72234362E12, 177719.25]], "isOverall": false, "label": "Requests for Publish", "isController": true}, {"data": [[1.72234332E12, 900.4]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.7223432E12, 0.1]], "isOverall": false, "label": "Get tenant id-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.72234386E12, 5889.666666666667], [1.7223438E12, 5814.0]], "isOverall": false, "label": "Requests for Issue approve", "isController": true}, {"data": [[1.72234386E12, 1026.5], [1.7223438E12, 1567.6666666666665]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7223438E12, 1247.8]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.7223432E12, 0.12500000000000003], [1.72234326E12, 0.19999999999999998]], "isOverall": false, "label": "WS PP sr key gen-0", "isController": false}, {"data": [[1.72234326E12, 776.75], [1.72234332E12, 2944.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.7223432E12, 0.3333333333333333], [1.72234326E12, 1.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.72234326E12, 0.75], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.72234386E12, 1.3333333333333333], [1.72234368E12, 0.5714285714285714], [1.72234326E12, 0.5], [1.72234374E12, 1.1666666666666665], [1.72234362E12, 0.5], [1.7223438E12, 1.1], [1.72234332E12, 1.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.72234368E12, 0.33333333333333337], [1.72234362E12, 0.5]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.72234374E12, 984.3333333333334], [1.7223438E12, 1562.4285714285716]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.7223432E12, 0.25], [1.72234326E12, 1.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.72234368E12, 1.0], [1.72234362E12, 0.5]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.72234326E12, 595.8749999999999], [1.72234332E12, 501.5]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.72234386E12, 2393.0], [1.7223438E12, 2570.0]], "isOverall": false, "label": "Issue create", "isController": false}, {"data": [[1.72234386E12, 369.0], [1.7223432E12, 274.0], [1.72234368E12, 439.25], [1.72234326E12, 468.0], [1.72234374E12, 276.3333333333333], [1.72234362E12, 512.8333333333334], [1.72234344E12, 307.0], [1.7223435E12, 1052.0], [1.7223438E12, 439.1], [1.72234332E12, 322.2]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.72234386E12, 1.0], [1.7223438E12, 0.8333333333333334]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.72234368E12, 3559.0], [1.72234356E12, 4268.109589041095], [1.72234362E12, 1770.8666666666666], [1.72234344E12, 689.2222222222222], [1.7223435E12, 3252.727272727275]], "isOverall": false, "label": "WS read policy publish result", "isController": false}, {"data": [[1.72234386E12, 594.0], [1.7223432E12, 447.0], [1.72234368E12, 638.25], [1.72234326E12, 944.0], [1.72234374E12, 336.0], [1.72234362E12, 778.6666666666667], [1.72234344E12, 526.3333333333334], [1.7223435E12, 1138.0], [1.7223438E12, 869.3636363636364], [1.72234332E12, 409.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.72234374E12, 1.0], [1.7223438E12, 2.142857142857143]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.72234368E12, 1.0], [1.72234356E12, 0.7945205479452055], [1.72234362E12, 0.8424657534246572], [1.72234344E12, 0.44827586206896536], [1.7223435E12, 0.6]], "isOverall": false, "label": "WS PP policy publish", "isController": false}, {"data": [[1.72234344E12, 0.5], [1.7223435E12, 0.6666666666666666]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.72234368E12, 921.7948717948718], [1.72234362E12, 302.4800000000001]], "isOverall": false, "label": "WS read  token associate result", "isController": false}, {"data": [[1.72234368E12, 0.6666666666666666], [1.72234362E12, 1.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.7223438E12, 6245.0]], "isOverall": false, "label": "Requests for Device approve", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72234386E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7223432E12, "maxY": 9407.0, "series": [{"data": [[1.72234386E12, 879.0], [1.7223438E12, 944.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.7223432E12, 449.3333333333333], [1.72234326E12, 470.5]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS PP kyc grant", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Requests for Role approve", "isController": true}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS PP user link-0", "isController": false}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Requests for Issue creation", "isController": true}, {"data": [[1.72234332E12, 529.8]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.72234374E12, 704.5], [1.7223438E12, 1354.3333333333333]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.72234368E12, 533.2]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS PP user link", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP user key gen-0", "isController": false}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS open for tokens associate", "isController": false}, {"data": [[1.72234386E12, 1679.6666666666667], [1.7223438E12, 1615.5]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS PP token associate-0", "isController": false}, {"data": [[1.72234386E12, 684.0], [1.72234368E12, 489.93749999999994], [1.72234326E12, 918.0], [1.72234374E12, 507.25], [1.72234362E12, 460.0], [1.7223438E12, 722.9999999999999], [1.72234332E12, 1014.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.72234374E12, 499.0], [1.7223438E12, 1987.0]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.72234368E12, 5799.0], [1.72234374E12, 5978.333333333333]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.7223432E12, 717.3]], "isOverall": false, "label": "Get tenant id", "isController": false}, {"data": [[1.72234326E12, 628.75], [1.72234332E12, 380.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.72234326E12, 1181.75], [1.72234332E12, 700.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS open for policy publish", "isController": false}, {"data": [[1.7223432E12, 652.8]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.72234386E12, 701.0], [1.7223438E12, 1082.25]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.72234338E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS read policy import result-0", "isController": false}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.7223438E12, 1385.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.72234344E12, 1740.5], [1.7223435E12, 2088.3333333333335]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Requests for Grant KYC", "isController": true}, {"data": [[1.7223432E12, 2059.5], [1.72234326E12, 2055.0]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS read sr link result-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS PP token associate", "isController": false}, {"data": [[1.72234326E12, 2063.4]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.72234368E12, 836.0], [1.72234374E12, 667.75]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS read kyc grant result-0", "isController": false}, {"data": [[1.72234368E12, 558.8]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.7223432E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP sr key gen", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Issue create-0", "isController": false}, {"data": [[1.7223432E12, 2066.5], [1.72234326E12, 2064.0]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.7223432E12, 2063.0], [1.72234326E12, 2065.5]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.72234368E12, 499.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.72234374E12, 6764.5], [1.7223438E12, 9407.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Requests for Device creation", "isController": true}, {"data": [[1.72234368E12, 786.6]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP user key gen", "isController": false}, {"data": [[1.7223432E12, 544.6]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.72234368E12, 0.0], [1.72234374E12, 0.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS read user key gen result", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.72234368E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234362E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.72234386E12, 5514.0], [1.7223438E12, 3309.1666666666665]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Requests for Token associate", "isController": true}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS read sr key gen result-0", "isController": false}, {"data": [[1.72234368E12, 477.4]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.7223432E12, 585.9000000000001], [1.72234332E12, 730.6]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.7223438E12, 1217.4]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS read user link result-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issues-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS PP kyc grant-0", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS open for tokens associate-0", "isController": false}, {"data": [[1.72234386E12, 860.0], [1.7223438E12, 730.5]], "isOverall": false, "label": "Approve issue", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7223432E12, 304.2], [1.72234332E12, 391.2]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.7223438E12, 1074.4]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.7223432E12, 708.2]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS read sr link result", "isController": false}, {"data": [[1.72234326E12, 2059.8]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7223432E12, 2060.0], [1.72234326E12, 2055.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.72234344E12, 1405.75], [1.7223435E12, 953.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.72234374E12, 477.0], [1.7223438E12, 847.3333333333334]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS open for policy publish-0", "isController": false}, {"data": [[1.72234368E12, 1178.6666666666667], [1.72234362E12, 400.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234356E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS read policy publish result-0", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP sr link", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS read user link result", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.72234386E12, 670.6666666666667], [1.72234368E12, 396.07142857142856], [1.72234326E12, 365.5], [1.72234374E12, 466.0], [1.72234362E12, 369.5], [1.7223438E12, 681.2000000000002], [1.72234332E12, 704.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.72234338E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS PP policy import", "isController": false}, {"data": [[1.72234338E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS PP policy import-0", "isController": false}, {"data": [[1.7223432E12, 599.5], [1.72234326E12, 760.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS read  token associate result-0", "isController": false}, {"data": [[1.72234368E12, 773.0], [1.72234362E12, 981.0]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.72234374E12, 0.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223432E12, 0.0], [1.72234368E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP sr link-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234356E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS PP policy publish-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS read kyc grant result", "isController": false}, {"data": [[1.72234386E12, 0.0]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.72234374E12, 1627.2]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS read user key gen result-0", "isController": false}, {"data": [[1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Get token ID", "isController": true}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Approve issue-0", "isController": false}, {"data": [[1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Requests for Application creation", "isController": true}, {"data": [[1.72234368E12, 0.0], [1.72234374E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.72234338E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS read policy import result", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS read sr key gen result", "isController": false}, {"data": [[1.72234374E12, 596.75], [1.7223438E12, 839.1666666666666]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.72234374E12, 530.5], [1.7223438E12, 952.3333333333334]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223432E12, 0.0], [1.72234368E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.72234368E12, 389.0], [1.72234362E12, 552.0]], "isOverall": false, "label": "Grant KYC", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Requests for Publish", "isController": true}, {"data": [[1.72234332E12, 899.8]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Get tenant id-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Requests for Issue approve", "isController": true}, {"data": [[1.72234386E12, 1025.0], [1.7223438E12, 1566.6666666666665]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7223438E12, 1245.8]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP sr key gen-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.72234368E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234362E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.72234374E12, 983.0], [1.7223438E12, 1559.7142857142858]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.72234326E12, 595.125], [1.72234332E12, 500.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.72234386E12, 2391.0], [1.7223438E12, 2569.0]], "isOverall": false, "label": "Issue create", "isController": false}, {"data": [[1.72234386E12, 367.5], [1.7223432E12, 273.3333333333333], [1.72234368E12, 438.5], [1.72234326E12, 468.0], [1.72234374E12, 274.6666666666667], [1.72234362E12, 512.3333333333333], [1.72234344E12, 306.6666666666667], [1.7223435E12, 1051.5], [1.7223438E12, 437.2], [1.72234332E12, 322.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234356E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS read policy publish result", "isController": false}, {"data": [[1.72234386E12, 591.0], [1.7223432E12, 446.0], [1.72234368E12, 637.75], [1.72234326E12, 943.5], [1.72234374E12, 335.3333333333333], [1.72234362E12, 775.8333333333333], [1.72234344E12, 526.0], [1.7223435E12, 1137.5], [1.7223438E12, 867.9090909090909], [1.72234332E12, 408.8]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234356E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS PP policy publish", "isController": false}, {"data": [[1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS read  token associate result", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Requests for Device approve", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72234386E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7223432E12, "maxY": 19756.5, "series": [{"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issues", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Link SR profile", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get device issue row-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS PP kyc grant", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get hedera id-0", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 137.0]], "isOverall": false, "label": "Requests for Role approve", "isController": true}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS PP user link-0", "isController": false}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "Import Policy-0", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get device approve result-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Requests for Issue creation", "isController": true}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "Import Policy", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get applications", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting device", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS PP user link", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get result for issue request approve", "isController": true}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Get Access Token-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP user key gen-0", "isController": false}, {"data": [[1.72234332E12, 794.0]], "isOverall": false, "label": "WS open for policy import", "isController": false}, {"data": [[1.72234368E12, 1289.5], [1.72234362E12, 809.3333333333334]], "isOverall": false, "label": "WS open for tokens associate", "isController": false}, {"data": [[1.72234386E12, 260.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issue approve result", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS PP token associate-0", "isController": false}, {"data": [[1.72234386E12, 64.5], [1.72234368E12, 0.0], [1.72234326E12, 391.0], [1.72234374E12, 0.0], [1.72234362E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 394.0]], "isOverall": false, "label": "Login by user", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 264.0]], "isOverall": false, "label": "Get application creation status", "isController": false}, {"data": [[1.72234368E12, 205.0], [1.72234374E12, 131.33333333333334]], "isOverall": false, "label": "Choose registrant", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Get tenant id", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get SR DID", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Link user profile", "isController": false}, {"data": [[1.72234344E12, 776.6666666666666], [1.7223435E12, 879.5]], "isOverall": false, "label": "WS open for policy publish", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite user", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issue schema", "isController": false}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "WS open for policy import-0", "isController": false}, {"data": [[1.72234326E12, 18654.333333333332], [1.72234332E12, 19756.5]], "isOverall": false, "label": "User creation flow", "isController": true}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request-0", "isController": false}, {"data": [[1.72234338E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS read policy import result-0", "isController": false}, {"data": [[1.72234332E12, 393.4]], "isOverall": false, "label": "Get tenant", "isController": true}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Approve device", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "Link user", "isController": true}, {"data": [[1.72234326E12, 8936.8]], "isOverall": false, "label": "User creation(SR side)", "isController": true}, {"data": [[1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "Publish Policy", "isController": false}, {"data": [[1.72234368E12, 786.8]], "isOverall": false, "label": "Requests for Grant KYC", "isController": true}, {"data": [[1.7223432E12, 2039.75], [1.72234326E12, 2036.8333333333333]], "isOverall": false, "label": "Get Access Token", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS read sr link result-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS PP token associate", "isController": false}, {"data": [[1.72234326E12, 2047.8]], "isOverall": false, "label": "Get user keys", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issue approve result-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS open for user key gen-0", "isController": false}, {"data": [[1.72234368E12, 398.0], [1.72234374E12, 0.0]], "isOverall": false, "label": "Get application schema", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS read kyc grant result-0", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting app approve", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Approve application-0", "isController": false}, {"data": [[1.72234326E12, 9329.333333333334], [1.72234332E12, 10425.0]], "isOverall": false, "label": "User creation(user side)", "isController": true}, {"data": [[1.7223432E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP sr key gen", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Accept sr-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Issue create-0", "isController": false}, {"data": [[1.7223432E12, 2044.5], [1.72234326E12, 2042.3333333333333]], "isOverall": false, "label": "Login by SR OS", "isController": false}, {"data": [[1.7223432E12, 2043.6666666666667], [1.72234326E12, 2045.5]], "isOverall": false, "label": "Get sr keys", "isController": false}, {"data": [[1.72234326E12, 1.4]], "isOverall": false, "label": "WS open for user key gen", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting issue request", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Verify link-0", "isController": false}, {"data": [[1.72234368E12, 1959.0], [1.72234362E12, 2466.0]], "isOverall": false, "label": "Policy import and publish", "isController": true}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Create device", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite and accept SR", "isController": true}, {"data": [[1.72234374E12, 409.0], [1.7223438E12, 99.50000000000001]], "isOverall": false, "label": "Requests for Device creation", "isController": true}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get hedera id", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP user key gen", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Accept sr", "isController": false}, {"data": [[1.7223432E12, 391.25], [1.72234326E12, 389.0]], "isOverall": false, "label": "User creation(admin side)", "isController": true}, {"data": [[1.72234368E12, 0.0], [1.72234374E12, 0.0]], "isOverall": false, "label": "Choose registrant-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS read user key gen result", "isController": false}, {"data": [[1.72234368E12, 791.6666666666666], [1.72234362E12, 779.5]], "isOverall": false, "label": "WS open for kyc grant", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.72234368E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234362E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Login by user-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Link SR profile-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Get sr keys-0", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get devices-0", "isController": false}, {"data": [[1.72234386E12, 60.07692307692309], [1.7223438E12, 0.0]], "isOverall": false, "label": "Balance verify", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "Generate user hedera data", "isController": true}, {"data": [[1.72234368E12, 1521.6666666666667], [1.72234362E12, 1242.5]], "isOverall": false, "label": "Requests for Token associate", "isController": true}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS read sr key gen result-0", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting app creation", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Approve device-0", "isController": false}, {"data": [[1.7223432E12, 195.4], [1.72234332E12, 393.4]], "isOverall": false, "label": "Login by Admin", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get devices", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS read user link result-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Generate sr hedera data", "isController": true}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get applications-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Login by SR OS-0", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get device schema-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get SR DID-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issues-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "Get user keys-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS PP kyc grant-0", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite user-0", "isController": false}, {"data": [[1.7223432E12, 766.3333333333334], [1.72234326E12, 768.0]], "isOverall": false, "label": "WS open for sr link", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS open for tokens associate-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Approve issue", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite sr-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Link user profile-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get Admin Access Token", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Create device-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issue schema-0", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get device issue row", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite sr", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS read sr link result", "isController": false}, {"data": [[1.72234326E12, 2037.4]], "isOverall": false, "label": "Generate user keys", "isController": false}, {"data": [[1.7223432E12, 2042.5], [1.72234326E12, 2038.0]], "isOverall": false, "label": "Generate sr keys", "isController": false}, {"data": [[1.72234344E12, 840.5], [1.7223435E12, 402.0]], "isOverall": false, "label": "Get policy id", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get result for device approve", "isController": true}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get block for approve result-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Generate sr keys-0", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Approve application", "isController": false}, {"data": [[1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS open for policy publish-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Associate token", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234356E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS read policy publish result-0", "isController": false}, {"data": [[1.72234368E12, 0.0]], "isOverall": false, "label": "Get block for waiting device-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP sr link", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Balance verify-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS read user link result", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Invite and accept user", "isController": true}, {"data": [[1.72234386E12, 0.0], [1.72234368E12, 28.5], [1.72234326E12, 0.0], [1.72234374E12, 66.33333333333333], [1.72234362E12, 0.0], [1.7223438E12, 20.550000000000004], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get User Access Token", "isController": false}, {"data": [[1.72234338E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS PP policy import", "isController": false}, {"data": [[1.72234338E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS PP policy import-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Accept user", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS read  token associate result-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Get tokens", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get result for app approve", "isController": true}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get application creation status-0", "isController": false}, {"data": [[1.72234374E12, 0.0]], "isOverall": false, "label": "Create application-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223432E12, 0.0], [1.72234368E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Login by SR-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS open for sr key gen-0", "isController": false}, {"data": [[1.7223432E12, 1.25], [1.72234326E12, 1.0]], "isOverall": false, "label": "WS open for sr key gen", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP sr link-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234356E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS PP policy publish-0", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "Generate user keys-0", "isController": false}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "Get Tenant Id-0", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Login by Admin-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS read kyc grant result", "isController": false}, {"data": [[1.72234386E12, 233.6]], "isOverall": false, "label": "Token minting verify", "isController": true}, {"data": [[1.72234374E12, 0.0]], "isOverall": false, "label": "Create application", "isController": false}, {"data": [[1.72234326E12, 0.0]], "isOverall": false, "label": "WS read user key gen result-0", "isController": false}, {"data": [[1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "Get policy id-0", "isController": false}, {"data": [[1.72234368E12, 407.0], [1.72234362E12, 409.0]], "isOverall": false, "label": "Get token ID", "isController": true}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Approve issue-0", "isController": false}, {"data": [[1.72234344E12, 1638.25], [1.7223435E12, 1181.0]], "isOverall": false, "label": "Requests for Import", "isController": true}, {"data": [[1.72234368E12, 558.2]], "isOverall": false, "label": "Requests for Application creation", "isController": true}, {"data": [[1.72234368E12, 0.0], [1.72234374E12, 0.0]], "isOverall": false, "label": "Get application schema-0", "isController": false}, {"data": [[1.72234338E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS read policy import result", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS read sr key gen result", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get block for approve result", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get device schema", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223432E12, 0.0], [1.72234368E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get SR Access Token-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Grant KYC", "isController": false}, {"data": [[1.72234368E12, 778.0], [1.72234362E12, 827.75]], "isOverall": false, "label": "Requests for Publish", "isController": true}, {"data": [[1.72234332E12, 0.0]], "isOverall": false, "label": "Get Tenant Id", "isController": false}, {"data": [[1.7223432E12, 0.0]], "isOverall": false, "label": "Get tenant id-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Grant KYC-0", "isController": false}, {"data": [[1.72234386E12, 260.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Requests for Issue approve", "isController": true}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issue creation status", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Link SR", "isController": true}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Get device approve result", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS PP sr key gen-0", "isController": false}, {"data": [[1.72234326E12, 776.0], [1.72234332E12, 2944.0]], "isOverall": false, "label": "WS open for user link", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "WS open for sr link-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "WS open for user link-0", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.72234368E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234362E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get User Access Token-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Associate token-0", "isController": false}, {"data": [[1.72234374E12, 269.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get device creation status", "isController": false}, {"data": [[1.7223432E12, 0.0], [1.72234326E12, 0.0]], "isOverall": false, "label": "Accept user-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "Get tokens-0", "isController": false}, {"data": [[1.72234326E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Verify link", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Issue create", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223432E12, 0.0], [1.72234368E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Get SR Access Token", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get issue creation status-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234356E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS read policy publish result", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.7223432E12, 0.0], [1.72234368E12, 101.75000000000001], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234362E12, 272.66666666666663], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Login by SR", "isController": false}, {"data": [[1.72234374E12, 0.0], [1.7223438E12, 0.0]], "isOverall": false, "label": "Get device creation status-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234356E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "WS PP policy publish", "isController": false}, {"data": [[1.72234344E12, 0.0], [1.7223435E12, 0.0]], "isOverall": false, "label": "Publish Policy-0", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS read  token associate result", "isController": false}, {"data": [[1.72234368E12, 0.0], [1.72234362E12, 0.0]], "isOverall": false, "label": "WS open for kyc grant-0", "isController": false}, {"data": [[1.7223438E12, 0.0]], "isOverall": false, "label": "Requests for Device approve", "isController": true}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72234386E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7223432E12, "maxY": 28859.0, "series": [{"data": [[1.72234386E12, 12328.0], [1.72234338E12, 28859.0], [1.7223432E12, 6966.0], [1.72234368E12, 19330.0], [1.72234326E12, 8365.0], [1.72234374E12, 7167.0], [1.72234356E12, 17555.0], [1.72234362E12, 16174.0], [1.72234344E12, 16376.0], [1.7223435E12, 16425.0], [1.7223438E12, 11626.0], [1.72234332E12, 16893.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.72234386E12, 4712.900000000001], [1.72234338E12, 319.7000000000006], [1.7223432E12, 608.8000000000008], [1.72234368E12, 515.7000000000004], [1.72234326E12, 291.7000000000003], [1.72234374E12, 1315.4000000000012], [1.72234356E12, 3968.199999999998], [1.72234362E12, 583.6000000000008], [1.72234344E12, 198.10000000000014], [1.7223435E12, 666.0999999999995], [1.7223438E12, 1681.0000000000002], [1.72234332E12, 310.69999999999993]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.72234386E12, 12328.0], [1.72234338E12, 18319.479999999963], [1.7223432E12, 4745.299999999996], [1.72234368E12, 10484.049999999945], [1.72234326E12, 5324.210000000005], [1.72234374E12, 7167.0], [1.72234356E12, 15675.309999999998], [1.72234362E12, 5712.069999999949], [1.72234344E12, 7448.709999999997], [1.7223435E12, 14577.160000000003], [1.7223438E12, 7874.960000000041], [1.72234332E12, 4506.339999999959]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.72234386E12, 5698.049999999999], [1.72234338E12, 1112.2999999999995], [1.7223432E12, 2045.8], [1.72234368E12, 841.1499999999999], [1.72234326E12, 2033.9000000000128], [1.72234374E12, 4827.0499999999965], [1.72234356E12, 10351.299999999996], [1.72234362E12, 2683.3499999999976], [1.72234344E12, 1236.799999999992], [1.7223435E12, 4750.149999999995], [1.7223438E12, 2737.2999999999997], [1.72234332E12, 660.9499999999986]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.72234386E12, 0.0], [1.72234338E12, 0.0], [1.7223432E12, 0.0], [1.72234368E12, 0.0], [1.72234326E12, 0.0], [1.72234374E12, 0.0], [1.72234356E12, 0.0], [1.72234362E12, 0.0], [1.72234344E12, 0.0], [1.7223435E12, 0.0], [1.7223438E12, 0.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.72234386E12, 165.0], [1.72234338E12, 0.0], [1.7223432E12, 0.0], [1.72234368E12, 1.0], [1.72234326E12, 1.0], [1.72234374E12, 119.0], [1.72234356E12, 1.0], [1.72234362E12, 1.0], [1.72234344E12, 0.0], [1.7223435E12, 1.0], [1.7223438E12, 153.0], [1.72234332E12, 0.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72234386E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 161.5, "series": [{"data": [[2.0, 161.5], [32.0, 1.0], [34.0, 0.0], [36.0, 0.5], [38.0, 1.0], [40.0, 0.0], [42.0, 0.0], [44.0, 1.0], [46.0, 1.0], [48.0, 0.0], [52.0, 0.0], [54.0, 0.0], [56.0, 0.0], [4.0, 1.0], [64.0, 0.0], [68.0, 0.0], [74.0, 1.0], [6.0, 2.5], [96.0, 0.0], [8.0, 1.0], [10.0, 1.0], [12.0, 1.0], [14.0, 1.0], [16.0, 1.0], [18.0, 0.0], [20.0, 1.0], [22.0, 1.0], [24.0, 0.0], [26.0, 0.0], [28.0, 1.0], [30.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 96.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 4.9E-324, "series": [{"data": [[2.0, 0.0], [32.0, 0.0], [34.0, 0.0], [36.0, 0.0], [38.0, 0.0], [40.0, 0.0], [42.0, 0.0], [44.0, 0.0], [46.0, 0.0], [48.0, 0.0], [52.0, 0.0], [54.0, 0.0], [56.0, 0.0], [4.0, 0.0], [64.0, 0.0], [68.0, 0.0], [74.0, 0.0], [6.0, 0.0], [96.0, 0.0], [8.0, 0.0], [10.0, 0.0], [12.0, 0.0], [14.0, 0.0], [16.0, 0.0], [18.0, 0.0], [20.0, 0.0], [22.0, 0.0], [24.0, 0.0], [26.0, 0.0], [28.0, 0.0], [30.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 96.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1.3333333333333333, "minX": 1.7223432E12, "maxY": 19.95, "series": [{"data": [[1.72234386E12, 1.3333333333333333], [1.72234338E12, 9.933333333333334], [1.7223432E12, 8.25], [1.72234368E12, 8.566666666666666], [1.72234326E12, 19.95], [1.72234374E12, 1.6333333333333333], [1.72234356E12, 4.866666666666666], [1.72234362E12, 13.633333333333333], [1.72234344E12, 18.7], [1.7223435E12, 7.2], [1.7223438E12, 4.516666666666667], [1.72234332E12, 12.716666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72234386E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.7223432E12, "maxY": 19.383333333333333, "series": [{"data": [[1.72234386E12, 1.2333333333333334], [1.72234338E12, 9.933333333333334], [1.7223432E12, 7.5], [1.72234368E12, 8.15], [1.72234326E12, 19.383333333333333], [1.72234374E12, 1.4833333333333334], [1.72234356E12, 4.866666666666666], [1.72234362E12, 13.316666666666666], [1.72234344E12, 18.566666666666666], [1.7223435E12, 7.083333333333333], [1.7223438E12, 4.0], [1.72234332E12, 12.283333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.7223432E12, 0.11666666666666667], [1.72234368E12, 0.08333333333333333], [1.72234326E12, 0.2], [1.72234362E12, 0.08333333333333333], [1.72234344E12, 0.05], [1.7223435E12, 0.03333333333333333], [1.72234332E12, 0.1]], "isOverall": false, "label": "101", "isController": false}, {"data": [[1.72234386E12, 0.13333333333333333], [1.7223432E12, 0.43333333333333335], [1.72234368E12, 0.3], [1.72234326E12, 0.21666666666666667], [1.72234374E12, 0.15], [1.72234362E12, 0.16666666666666666], [1.72234344E12, 0.05], [1.7223435E12, 0.03333333333333333], [1.7223438E12, 0.5], [1.72234332E12, 0.18333333333333332]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.7223432E12, 0.11666666666666667], [1.72234368E12, 0.1], [1.72234326E12, 0.2], [1.72234362E12, 0.06666666666666667], [1.72234344E12, 0.03333333333333333], [1.7223435E12, 0.05], [1.72234332E12, 0.1]], "isOverall": false, "label": "202", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72234386E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7223432E12, "maxY": 4.116666666666666, "series": [{"data": [[1.72234326E12, 0.08333333333333333]], "isOverall": false, "label": "Link user-success", "isController": true}, {"data": [[1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Get tenant-success", "isController": true}, {"data": [[1.7223432E12, 0.08333333333333333]], "isOverall": false, "label": "Accept sr-0-success", "isController": false}, {"data": [[1.72234326E12, 1.4166666666666667], [1.72234332E12, 0.7166666666666667]], "isOverall": false, "label": "WS read user link result-0-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.1]], "isOverall": false, "label": "Login by SR OS-0-success", "isController": false}, {"data": [[1.72234368E12, 0.8333333333333334], [1.72234362E12, 0.23333333333333334]], "isOverall": false, "label": "WS read kyc grant result-0-success", "isController": false}, {"data": [[1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "WS open for policy import-0-success", "isController": false}, {"data": [[1.72234326E12, 1.4166666666666667], [1.72234332E12, 0.7166666666666667]], "isOverall": false, "label": "WS read user link result-success", "isController": false}, {"data": [[1.7223432E12, 0.16666666666666666]], "isOverall": false, "label": "Get tenant id-success", "isController": false}, {"data": [[1.72234326E12, 0.08333333333333333]], "isOverall": false, "label": "WS open for user key gen-success", "isController": false}, {"data": [[1.72234386E12, 0.1], [1.72234368E12, 0.23333333333333334], [1.72234326E12, 0.06666666666666667], [1.72234374E12, 0.1], [1.72234362E12, 0.06666666666666667], [1.7223438E12, 0.3333333333333333], [1.72234332E12, 0.016666666666666666]], "isOverall": false, "label": "Get User Access Token-0-success", "isController": false}, {"data": [[1.7223432E12, 0.6666666666666666], [1.72234326E12, 0.16666666666666666]], "isOverall": false, "label": "WS PP sr key gen-success", "isController": false}, {"data": [[1.72234374E12, 0.06666666666666667], [1.7223438E12, 0.1]], "isOverall": false, "label": "Get block for approve result-0-success", "isController": false}, {"data": [[1.72234386E12, 0.016666666666666666], [1.7223438E12, 0.06666666666666667]], "isOverall": false, "label": "Requests for Issue creation-success", "isController": true}, {"data": [[1.7223432E12, 0.08333333333333333]], "isOverall": false, "label": "Invite user-0-success", "isController": false}, {"data": [[1.72234374E12, 0.05], [1.7223438E12, 0.11666666666666667]], "isOverall": false, "label": "Get device creation status-0-success", "isController": false}, {"data": [[1.7223438E12, 0.08333333333333333]], "isOverall": false, "label": "Approve device-success", "isController": false}, {"data": [[1.7223432E12, 0.05], [1.72234326E12, 0.03333333333333333]], "isOverall": false, "label": "Link SR-success", "isController": true}, {"data": [[1.72234368E12, 0.05], [1.72234362E12, 0.03333333333333333]], "isOverall": false, "label": "Associate token-0-success", "isController": false}, {"data": [[1.72234368E12, 0.05], [1.72234362E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for kyc grant-0-success", "isController": false}, {"data": [[1.72234386E12, 0.05], [1.7223438E12, 0.03333333333333333]], "isOverall": false, "label": "Approve issue-0-success", "isController": false}, {"data": [[1.72234386E12, 0.1], [1.72234368E12, 0.23333333333333334], [1.72234326E12, 0.06666666666666667], [1.72234374E12, 0.1], [1.72234362E12, 0.06666666666666667], [1.7223438E12, 0.3333333333333333], [1.72234332E12, 0.016666666666666666]], "isOverall": false, "label": "Get User Access Token-success", "isController": false}, {"data": [[1.7223432E12, 0.6666666666666666], [1.72234326E12, 0.16666666666666666]], "isOverall": false, "label": "WS read sr key gen result-success", "isController": false}, {"data": [[1.72234386E12, 0.1], [1.72234368E12, 0.26666666666666666], [1.72234326E12, 0.06666666666666667], [1.72234374E12, 0.06666666666666667], [1.72234362E12, 0.06666666666666667], [1.7223438E12, 0.3333333333333333], [1.72234332E12, 0.016666666666666666]], "isOverall": false, "label": "Login by user-0-success", "isController": false}, {"data": [[1.72234386E12, 0.08333333333333333]], "isOverall": false, "label": "Token minting verify-success", "isController": true}, {"data": [[1.72234368E12, 0.03333333333333333], [1.72234356E12, 1.2166666666666666], [1.72234362E12, 2.433333333333333], [1.72234344E12, 0.48333333333333334], [1.7223435E12, 1.3333333333333333]], "isOverall": false, "label": "WS PP policy publish-0-success", "isController": false}, {"data": [[1.7223432E12, 0.16666666666666666], [1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Get Admin Access Token-0-success", "isController": false}, {"data": [[1.72234368E12, 0.05], [1.72234362E12, 0.03333333333333333]], "isOverall": false, "label": "Associate token-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.016666666666666666]], "isOverall": false, "label": "User creation(admin side)-success", "isController": true}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.1]], "isOverall": false, "label": "Get Access Token-success", "isController": false}, {"data": [[1.72234326E12, 0.08333333333333333]], "isOverall": false, "label": "Get user keys-0-success", "isController": false}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Get hedera id-success", "isController": false}, {"data": [[1.72234374E12, 0.03333333333333333], [1.7223438E12, 0.05]], "isOverall": false, "label": "Get result for app approve-success", "isController": true}, {"data": [[1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Import Policy-success", "isController": false}, {"data": [[1.72234386E12, 0.05], [1.7223438E12, 0.03333333333333333]], "isOverall": false, "label": "Approve issue-success", "isController": false}, {"data": [[1.72234344E12, 0.06666666666666667], [1.7223435E12, 0.016666666666666666]], "isOverall": false, "label": "Requests for Import-success", "isController": true}, {"data": [[1.7223432E12, 0.6666666666666666], [1.72234326E12, 0.16666666666666666]], "isOverall": false, "label": "WS read sr key gen result-0-success", "isController": false}, {"data": [[1.72234374E12, 0.03333333333333333], [1.7223438E12, 0.05]], "isOverall": false, "label": "Create device-success", "isController": false}, {"data": [[1.72234368E12, 0.65], [1.72234362E12, 0.4166666666666667]], "isOverall": false, "label": "WS read  token associate result-0-success", "isController": false}, {"data": [[1.7223438E12, 0.08333333333333333]], "isOverall": false, "label": "Get devices-0-success", "isController": false}, {"data": [[1.72234386E12, 0.05], [1.7223438E12, 0.03333333333333333]], "isOverall": false, "label": "Get issues-success", "isController": false}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Get block for waiting device-success", "isController": false}, {"data": [[1.72234374E12, 0.1], [1.7223438E12, 0.05]], "isOverall": false, "label": "Get application creation status-success", "isController": false}, {"data": [[1.7223432E12, 0.05], [1.72234326E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for sr link-0-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.1]], "isOverall": false, "label": "Login by SR OS-success", "isController": false}, {"data": [[1.72234326E12, 0.08333333333333333]], "isOverall": false, "label": "Get user keys-success", "isController": false}, {"data": [[1.72234386E12, 0.016666666666666666], [1.7223438E12, 0.06666666666666667]], "isOverall": false, "label": "Issue create-success", "isController": false}, {"data": [[1.72234368E12, 0.03333333333333333], [1.72234362E12, 0.05]], "isOverall": false, "label": "WS open for tokens associate-0-success", "isController": false}, {"data": [[1.72234326E12, 0.8333333333333334]], "isOverall": false, "label": "WS read user key gen result-success", "isController": false}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Get block for waiting app creation-0-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.016666666666666666]], "isOverall": false, "label": "Accept user-0-success", "isController": false}, {"data": [[1.7223432E12, 0.6833333333333333], [1.72234326E12, 2.033333333333333]], "isOverall": false, "label": "WS read sr link result-success", "isController": false}, {"data": [[1.72234326E12, 0.13333333333333333], [1.72234332E12, 0.03333333333333333]], "isOverall": false, "label": "Verify link-success", "isController": false}, {"data": [[1.7223432E12, 0.16666666666666666], [1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Login by Admin-success", "isController": false}, {"data": [[1.72234326E12, 0.8333333333333334]], "isOverall": false, "label": "WS read user key gen result-0-success", "isController": false}, {"data": [[1.72234326E12, 0.06666666666666667], [1.72234332E12, 0.016666666666666666]], "isOverall": false, "label": "Get SR DID-success", "isController": false}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Get block for waiting issue request-0-success", "isController": false}, {"data": [[1.72234368E12, 0.03333333333333333], [1.72234374E12, 0.05]], "isOverall": false, "label": "Choose registrant-0-success", "isController": false}, {"data": [[1.7223432E12, 0.05], [1.72234326E12, 0.03333333333333333]], "isOverall": false, "label": "Link SR profile-0-success", "isController": false}, {"data": [[1.72234326E12, 0.08333333333333333]], "isOverall": false, "label": "Generate user hedera data-success", "isController": true}, {"data": [[1.7223438E12, 0.08333333333333333]], "isOverall": false, "label": "Get device issue row-success", "isController": false}, {"data": [[1.72234326E12, 0.08333333333333333]], "isOverall": false, "label": "Generate user keys-0-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.016666666666666666]], "isOverall": false, "label": "Generate sr keys-0-success", "isController": false}, {"data": [[1.7223432E12, 0.08333333333333333]], "isOverall": false, "label": "Invite sr-0-success", "isController": false}, {"data": [[1.7223438E12, 0.08333333333333333]], "isOverall": false, "label": "Get device approve result-success", "isController": false}, {"data": [[1.72234326E12, 0.06666666666666667], [1.72234332E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for user link-0-success", "isController": false}, {"data": [[1.72234368E12, 0.03333333333333333], [1.72234362E12, 0.05]], "isOverall": false, "label": "WS open for tokens associate-success", "isController": false}, {"data": [[1.72234386E12, 0.1], [1.72234368E12, 0.26666666666666666], [1.72234326E12, 0.06666666666666667], [1.72234374E12, 0.06666666666666667], [1.72234362E12, 0.06666666666666667], [1.7223438E12, 0.3333333333333333], [1.72234332E12, 0.016666666666666666]], "isOverall": false, "label": "Login by user-success", "isController": false}, {"data": [[1.72234344E12, 0.05], [1.7223435E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for policy publish-0-success", "isController": false}, {"data": [[1.72234374E12, 0.08333333333333333]], "isOverall": false, "label": "Create application-0-success", "isController": false}, {"data": [[1.72234326E12, 0.05], [1.72234332E12, 0.03333333333333333]], "isOverall": false, "label": "User creation flow-success", "isController": true}, {"data": [[1.72234386E12, 0.016666666666666666], [1.7223438E12, 0.06666666666666667]], "isOverall": false, "label": "Get issue schema-success", "isController": false}, {"data": [[1.72234326E12, 0.08333333333333333]], "isOverall": false, "label": "Generate user keys-success", "isController": false}, {"data": [[1.72234368E12, 0.05], [1.72234362E12, 0.03333333333333333]], "isOverall": false, "label": "Requests for Token associate-success", "isController": true}, {"data": [[1.72234386E12, 0.03333333333333333], [1.7223432E12, 0.05], [1.72234368E12, 0.06666666666666667], [1.72234326E12, 0.03333333333333333], [1.72234374E12, 0.05], [1.72234362E12, 0.1], [1.72234344E12, 0.05], [1.7223435E12, 0.03333333333333333], [1.7223438E12, 0.16666666666666666], [1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Get SR Access Token-0-success", "isController": false}, {"data": [[1.72234338E12, 2.4833333333333334], [1.72234344E12, 4.116666666666666], [1.7223435E12, 0.4166666666666667], [1.72234332E12, 2.066666666666667]], "isOverall": false, "label": "WS read policy import result-0-success", "isController": false}, {"data": [[1.72234326E12, 0.06666666666666667], [1.72234332E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for user link-success", "isController": false}, {"data": [[1.72234368E12, 0.05], [1.72234362E12, 0.03333333333333333]], "isOverall": false, "label": "Grant KYC-0-success", "isController": false}, {"data": [[1.72234386E12, 0.016666666666666666], [1.7223438E12, 0.06666666666666667]], "isOverall": false, "label": "Issue create-0-success", "isController": false}, {"data": [[1.72234386E12, 0.05], [1.7223438E12, 0.03333333333333333]], "isOverall": false, "label": "Get result for issue request approve-success", "isController": true}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Get block for waiting app approve-0-success", "isController": false}, {"data": [[1.72234386E12, 0.016666666666666666], [1.7223438E12, 0.06666666666666667]], "isOverall": false, "label": "Get issue schema-0-success", "isController": false}, {"data": [[1.72234338E12, 2.4833333333333334], [1.72234344E12, 4.05], [1.7223435E12, 0.4], [1.72234332E12, 2.15]], "isOverall": false, "label": "WS PP policy import-success", "isController": false}, {"data": [[1.72234374E12, 0.03333333333333333], [1.7223438E12, 0.05]], "isOverall": false, "label": "Get device schema-success", "isController": false}, {"data": [[1.72234386E12, 0.03333333333333333], [1.7223432E12, 0.05], [1.72234368E12, 0.06666666666666667], [1.72234326E12, 0.03333333333333333], [1.72234374E12, 0.05], [1.72234362E12, 0.1], [1.72234344E12, 0.05], [1.7223435E12, 0.03333333333333333], [1.7223438E12, 0.16666666666666666], [1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Get SR Access Token-success", "isController": false}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Get block for waiting issue request-success", "isController": false}, {"data": [[1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "WS open for policy import-success", "isController": false}, {"data": [[1.72234368E12, 0.05], [1.72234356E12, 1.2166666666666666], [1.72234362E12, 2.5], [1.72234344E12, 0.45], [1.7223435E12, 1.2833333333333334]], "isOverall": false, "label": "WS read policy publish result-0-success", "isController": false}, {"data": [[1.7223432E12, 0.16666666666666666]], "isOverall": false, "label": "Get tenant id-0-success", "isController": false}, {"data": [[1.72234368E12, 0.05], [1.72234362E12, 0.03333333333333333]], "isOverall": false, "label": "Grant KYC-success", "isController": false}, {"data": [[1.72234368E12, 0.016666666666666666], [1.72234374E12, 0.06666666666666667]], "isOverall": false, "label": "Get application schema-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.016666666666666666]], "isOverall": false, "label": "Generate sr keys-success", "isController": false}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Get block for waiting device-0-success", "isController": false}, {"data": [[1.72234374E12, 0.06666666666666667], [1.7223438E12, 0.1]], "isOverall": false, "label": "Get block for approve result-success", "isController": false}, {"data": [[1.7223438E12, 0.08333333333333333]], "isOverall": false, "label": "Get device issue row-0-success", "isController": false}, {"data": [[1.72234386E12, 0.05], [1.7223438E12, 0.03333333333333333]], "isOverall": false, "label": "Requests for Issue approve-success", "isController": true}, {"data": [[1.72234374E12, 0.03333333333333333], [1.7223438E12, 0.05]], "isOverall": false, "label": "Requests for Role approve-success", "isController": true}, {"data": [[1.7223432E12, 0.7333333333333333], [1.72234326E12, 1.9833333333333334]], "isOverall": false, "label": "WS PP sr link-success", "isController": false}, {"data": [[1.72234326E12, 0.06666666666666667], [1.72234332E12, 0.016666666666666666]], "isOverall": false, "label": "Link user profile-success", "isController": false}, {"data": [[1.72234326E12, 1.4333333333333333], [1.72234332E12, 0.7]], "isOverall": false, "label": "WS PP user link-success", "isController": false}, {"data": [[1.7223432E12, 0.05], [1.72234326E12, 0.03333333333333333]], "isOverall": false, "label": "Link SR profile-success", "isController": false}, {"data": [[1.7223432E12, 0.6666666666666666], [1.72234326E12, 0.16666666666666666]], "isOverall": false, "label": "WS PP sr key gen-0-success", "isController": false}, {"data": [[1.72234368E12, 0.8333333333333334], [1.72234362E12, 0.23333333333333334]], "isOverall": false, "label": "WS read kyc grant result-success", "isController": false}, {"data": [[1.72234368E12, 0.03333333333333333], [1.72234374E12, 0.05]], "isOverall": false, "label": "Choose registrant-success", "isController": false}, {"data": [[1.7223432E12, 0.08333333333333333]], "isOverall": false, "label": "Accept sr-success", "isController": false}, {"data": [[1.7223432E12, 0.08333333333333333]], "isOverall": false, "label": "Invite and accept user-success", "isController": true}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Requests for Grant KYC-success", "isController": true}, {"data": [[1.7223432E12, 0.16666666666666666], [1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Get Admin Access Token-success", "isController": false}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Get hedera id-0-success", "isController": false}, {"data": [[1.7223438E12, 0.08333333333333333]], "isOverall": false, "label": "Get result for device approve-success", "isController": true}, {"data": [[1.72234386E12, 0.03333333333333333], [1.7223438E12, 0.1]], "isOverall": false, "label": "Get issue creation status-0-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.1]], "isOverall": false, "label": "Get Access Token-0-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.016666666666666666]], "isOverall": false, "label": "Accept user-success", "isController": false}, {"data": [[1.72234344E12, 0.05], [1.7223435E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for policy publish-success", "isController": false}, {"data": [[1.72234386E12, 0.03333333333333333], [1.7223438E12, 0.1]], "isOverall": false, "label": "Get issue creation status-success", "isController": false}, {"data": [[1.72234386E12, 0.016666666666666666], [1.7223432E12, 0.05], [1.72234368E12, 0.06666666666666667], [1.72234326E12, 0.03333333333333333], [1.72234374E12, 0.05], [1.72234362E12, 0.1], [1.72234344E12, 0.05], [1.7223435E12, 0.03333333333333333], [1.7223438E12, 0.18333333333333332], [1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Login by SR-0-success", "isController": false}, {"data": [[1.7223432E12, 0.7333333333333333], [1.72234326E12, 1.9833333333333334]], "isOverall": false, "label": "WS PP sr link-0-success", "isController": false}, {"data": [[1.72234386E12, 0.05], [1.7223438E12, 0.03333333333333333]], "isOverall": false, "label": "Get issues-0-success", "isController": false}, {"data": [[1.72234374E12, 0.05], [1.7223438E12, 0.11666666666666667]], "isOverall": false, "label": "Get device creation status-success", "isController": false}, {"data": [[1.7223432E12, 0.05], [1.72234326E12, 0.03333333333333333]], "isOverall": false, "label": "Get sr keys-success", "isController": false}, {"data": [[1.72234326E12, 0.08333333333333333]], "isOverall": false, "label": "WS open for user key gen-0-success", "isController": false}, {"data": [[1.72234368E12, 0.8], [1.72234362E12, 0.26666666666666666]], "isOverall": false, "label": "WS PP kyc grant-0-success", "isController": false}, {"data": [[1.72234374E12, 0.03333333333333333], [1.7223438E12, 0.05]], "isOverall": false, "label": "Create device-0-success", "isController": false}, {"data": [[1.72234344E12, 0.03333333333333333], [1.7223435E12, 0.05]], "isOverall": false, "label": "Publish Policy-0-success", "isController": false}, {"data": [[1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Import Policy-0-success", "isController": false}, {"data": [[1.72234368E12, 0.016666666666666666], [1.72234362E12, 0.06666666666666667]], "isOverall": false, "label": "Get tokens-success", "isController": false}, {"data": [[1.72234344E12, 0.03333333333333333], [1.7223435E12, 0.05]], "isOverall": false, "label": "Publish Policy-success", "isController": false}, {"data": [[1.72234326E12, 0.06666666666666667], [1.72234332E12, 0.016666666666666666]], "isOverall": false, "label": "Link user profile-0-success", "isController": false}, {"data": [[1.72234374E12, 0.03333333333333333], [1.7223438E12, 0.05]], "isOverall": false, "label": "Approve application-success", "isController": false}, {"data": [[1.72234374E12, 0.03333333333333333], [1.7223438E12, 0.05]], "isOverall": false, "label": "Get device schema-0-success", "isController": false}, {"data": [[1.7223432E12, 0.08333333333333333]], "isOverall": false, "label": "Invite and accept SR-success", "isController": true}, {"data": [[1.72234386E12, 0.05], [1.7223438E12, 0.03333333333333333]], "isOverall": false, "label": "Get issue approve result-success", "isController": false}, {"data": [[1.72234368E12, 0.65], [1.72234362E12, 0.4166666666666667]], "isOverall": false, "label": "WS PP token associate-0-success", "isController": false}, {"data": [[1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Get Tenant Id-success", "isController": false}, {"data": [[1.7223432E12, 0.16666666666666666], [1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Login by Admin-0-success", "isController": false}, {"data": [[1.72234368E12, 0.05], [1.72234356E12, 1.2166666666666666], [1.72234362E12, 2.5], [1.72234344E12, 0.45], [1.7223435E12, 1.2833333333333334]], "isOverall": false, "label": "WS read policy publish result-success", "isController": false}, {"data": [[1.72234368E12, 0.016666666666666666], [1.72234362E12, 0.06666666666666667]], "isOverall": false, "label": "Get tokens-0-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.016666666666666666]], "isOverall": false, "label": "Generate sr hedera data-success", "isController": true}, {"data": [[1.72234326E12, 0.05], [1.72234332E12, 0.03333333333333333]], "isOverall": false, "label": "User creation(user side)-success", "isController": true}, {"data": [[1.72234344E12, 0.06666666666666667], [1.7223435E12, 0.016666666666666666]], "isOverall": false, "label": "Get policy id-success", "isController": false}, {"data": [[1.72234368E12, 0.03333333333333333], [1.72234356E12, 1.2166666666666666], [1.72234362E12, 2.433333333333333], [1.72234344E12, 0.48333333333333334], [1.7223435E12, 1.3333333333333333]], "isOverall": false, "label": "WS PP policy publish-success", "isController": false}, {"data": [[1.7223432E12, 0.6833333333333333], [1.72234326E12, 2.033333333333333]], "isOverall": false, "label": "WS read sr link result-0-success", "isController": false}, {"data": [[1.72234368E12, 0.016666666666666666], [1.72234374E12, 0.06666666666666667]], "isOverall": false, "label": "Get application schema-0-success", "isController": false}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Requests for Application creation-success", "isController": true}, {"data": [[1.7223432E12, 0.05], [1.72234326E12, 0.03333333333333333]], "isOverall": false, "label": "Get sr keys-0-success", "isController": false}, {"data": [[1.72234368E12, 0.65], [1.72234362E12, 0.4166666666666667]], "isOverall": false, "label": "WS PP token associate-success", "isController": false}, {"data": [[1.7223432E12, 0.08333333333333333]], "isOverall": false, "label": "Invite user-success", "isController": false}, {"data": [[1.72234338E12, 2.4833333333333334], [1.72234344E12, 4.116666666666666], [1.7223435E12, 0.4166666666666667], [1.72234332E12, 2.066666666666667]], "isOverall": false, "label": "WS read policy import result-success", "isController": false}, {"data": [[1.72234374E12, 0.03333333333333333], [1.7223438E12, 0.05]], "isOverall": false, "label": "Get applications-success", "isController": false}, {"data": [[1.7223438E12, 0.08333333333333333]], "isOverall": false, "label": "Get devices-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for sr key gen-success", "isController": false}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Get block for waiting app creation-success", "isController": false}, {"data": [[1.72234386E12, 0.21666666666666667], [1.7223438E12, 0.1]], "isOverall": false, "label": "Balance verify-success", "isController": false}, {"data": [[1.72234326E12, 0.8333333333333334]], "isOverall": false, "label": "WS PP user key gen-0-success", "isController": false}, {"data": [[1.7223432E12, 0.06666666666666667], [1.72234326E12, 0.016666666666666666]], "isOverall": false, "label": "WS open for sr key gen-0-success", "isController": false}, {"data": [[1.72234368E12, 0.016666666666666666], [1.72234362E12, 0.06666666666666667]], "isOverall": false, "label": "Policy import and publish-success", "isController": true}, {"data": [[1.72234386E12, 0.016666666666666666], [1.7223432E12, 0.05], [1.72234368E12, 0.06666666666666667], [1.72234326E12, 0.03333333333333333], [1.72234374E12, 0.05], [1.72234362E12, 0.1], [1.72234344E12, 0.05], [1.7223435E12, 0.03333333333333333], [1.7223438E12, 0.18333333333333332], [1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Login by SR-success", "isController": false}, {"data": [[1.72234338E12, 2.4833333333333334], [1.72234344E12, 4.05], [1.7223435E12, 0.4], [1.72234332E12, 2.15]], "isOverall": false, "label": "WS PP policy import-0-success", "isController": false}, {"data": [[1.72234344E12, 0.06666666666666667], [1.7223435E12, 0.016666666666666666]], "isOverall": false, "label": "Get policy id-0-success", "isController": false}, {"data": [[1.72234326E12, 0.8333333333333334]], "isOverall": false, "label": "WS PP user key gen-success", "isController": false}, {"data": [[1.72234326E12, 0.06666666666666667], [1.72234332E12, 0.016666666666666666]], "isOverall": false, "label": "Get SR DID-0-success", "isController": false}, {"data": [[1.72234368E12, 0.016666666666666666], [1.72234362E12, 0.06666666666666667]], "isOverall": false, "label": "Requests for Publish-success", "isController": true}, {"data": [[1.72234368E12, 0.05], [1.72234362E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for kyc grant-success", "isController": false}, {"data": [[1.72234386E12, 0.05], [1.7223438E12, 0.03333333333333333]], "isOverall": false, "label": "Get issue approve result-0-success", "isController": false}, {"data": [[1.7223432E12, 0.05], [1.72234326E12, 0.03333333333333333]], "isOverall": false, "label": "WS open for sr link-success", "isController": false}, {"data": [[1.72234368E12, 0.016666666666666666], [1.72234362E12, 0.06666666666666667]], "isOverall": false, "label": "Get token ID-success", "isController": true}, {"data": [[1.72234368E12, 0.65], [1.72234362E12, 0.4166666666666667]], "isOverall": false, "label": "WS read  token associate result-success", "isController": false}, {"data": [[1.7223432E12, 0.08333333333333333]], "isOverall": false, "label": "Invite sr-success", "isController": false}, {"data": [[1.72234326E12, 1.4333333333333333], [1.72234332E12, 0.7]], "isOverall": false, "label": "WS PP user link-0-success", "isController": false}, {"data": [[1.72234374E12, 0.1], [1.7223438E12, 0.05]], "isOverall": false, "label": "Get application creation status-0-success", "isController": false}, {"data": [[1.7223438E12, 0.08333333333333333]], "isOverall": false, "label": "Approve device-0-success", "isController": false}, {"data": [[1.72234374E12, 0.08333333333333333]], "isOverall": false, "label": "Create application-success", "isController": false}, {"data": [[1.7223438E12, 0.08333333333333333]], "isOverall": false, "label": "Get device approve result-0-success", "isController": false}, {"data": [[1.72234326E12, 0.08333333333333333]], "isOverall": false, "label": "User creation(SR side)-success", "isController": true}, {"data": [[1.72234332E12, 0.08333333333333333]], "isOverall": false, "label": "Get Tenant Id-0-success", "isController": false}, {"data": [[1.72234368E12, 0.8], [1.72234362E12, 0.26666666666666666]], "isOverall": false, "label": "WS PP kyc grant-success", "isController": false}, {"data": [[1.7223438E12, 0.08333333333333333]], "isOverall": false, "label": "Requests for Device approve-success", "isController": true}, {"data": [[1.72234386E12, 0.21666666666666667], [1.7223438E12, 0.1]], "isOverall": false, "label": "Balance verify-0-success", "isController": false}, {"data": [[1.72234368E12, 0.08333333333333333]], "isOverall": false, "label": "Get block for waiting app approve-success", "isController": false}, {"data": [[1.72234374E12, 0.03333333333333333], [1.7223438E12, 0.05]], "isOverall": false, "label": "Approve application-0-success", "isController": false}, {"data": [[1.72234374E12, 0.016666666666666666], [1.7223438E12, 0.06666666666666667]], "isOverall": false, "label": "Requests for Device creation-success", "isController": true}, {"data": [[1.72234326E12, 0.13333333333333333], [1.72234332E12, 0.03333333333333333]], "isOverall": false, "label": "Verify link-0-success", "isController": false}, {"data": [[1.72234374E12, 0.03333333333333333], [1.7223438E12, 0.05]], "isOverall": false, "label": "Get applications-0-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72234386E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.5666666666666667, "minX": 1.7223432E12, "maxY": 20.416666666666668, "series": [{"data": [[1.72234386E12, 1.5666666666666667], [1.72234338E12, 9.933333333333334], [1.7223432E12, 8.516666666666667], [1.72234368E12, 8.9], [1.72234326E12, 20.416666666666668], [1.72234374E12, 1.7166666666666666], [1.72234356E12, 4.866666666666666], [1.72234362E12, 13.866666666666667], [1.72234344E12, 18.766666666666666], [1.7223435E12, 7.216666666666667], [1.7223438E12, 4.966666666666667], [1.72234332E12, 12.816666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72234386E12, "title": "Total Transactions Per Second"}},
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
