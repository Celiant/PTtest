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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8072934091669455, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Invite user-0"], "isController": false}, {"data": [1.0, 500, 1500, "Agree terms"], "isController": false}, {"data": [1.0, 500, 1500, "Link SR profile"], "isController": false}, {"data": [1.0, 500, 1500, "Invite sr-0"], "isController": false}, {"data": [1.0, 500, 1500, "Link user profile-0"], "isController": false}, {"data": [1.0, 500, 1500, "Import Policy-0"], "isController": false}, {"data": [0.7560975609756098, 500, 1500, "Get Admin Access Token"], "isController": false}, {"data": [1.0, 500, 1500, "Agree terms-0"], "isController": false}, {"data": [0.975, 500, 1500, "Import Policy"], "isController": false}, {"data": [1.0, 500, 1500, "Invite sr"], "isController": false}, {"data": [0.0, 500, 1500, "Generate user keys"], "isController": false}, {"data": [0.0, 500, 1500, "Get OS user Access Token"], "isController": false}, {"data": [0.0, 500, 1500, "Generate sr keys"], "isController": false}, {"data": [1.0, 500, 1500, "Get policy id"], "isController": false}, {"data": [0.0, 500, 1500, "Tenant creation flow"], "isController": true}, {"data": [1.0, 500, 1500, "Generate sr keys-0"], "isController": false}, {"data": [0.0, 500, 1500, "Get OS SR Access Token"], "isController": false}, {"data": [0.0, 500, 1500, "Dry Run Policy"], "isController": false}, {"data": [0.475, 500, 1500, "Invite and accept user"], "isController": true}, {"data": [0.9671532846715328, 500, 1500, "Get SR link result"], "isController": false}, {"data": [1.0, 500, 1500, "Get User Access Token"], "isController": false}, {"data": [0.5, 500, 1500, "Accept user"], "isController": false}, {"data": [0.45, 500, 1500, "Login by user"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR DID"], "isController": false}, {"data": [1.0, 500, 1500, "Link user profile"], "isController": false}, {"data": [0.0, 500, 1500, "Get key gen result"], "isController": false}, {"data": [1.0, 500, 1500, "Invite user"], "isController": false}, {"data": [1.0, 500, 1500, "Login by SR-0"], "isController": false}, {"data": [0.0, 500, 1500, "User creation flow"], "isController": true}, {"data": [1.0, 500, 1500, "Setup ipfs"], "isController": false}, {"data": [0.0, 500, 1500, "Requests for DryRun"], "isController": true}, {"data": [0.955, 500, 1500, "Get user link result"], "isController": false}, {"data": [1.0, 500, 1500, "Generate user keys-0"], "isController": false}, {"data": [0.0, 500, 1500, "Link user"], "isController": true}, {"data": [1.0, 500, 1500, "Login by Admin-0"], "isController": false}, {"data": [0.0, 500, 1500, "User creation(SR side)"], "isController": true}, {"data": [1.0, 500, 1500, "Get OS SR Access Token-0"], "isController": false}, {"data": [0.0, 500, 1500, "Get user keys"], "isController": false}, {"data": [1.0, 500, 1500, "Get policy id-0"], "isController": false}, {"data": [0.0, 500, 1500, "Requests for Import"], "isController": true}, {"data": [1.0, 500, 1500, "Setup ipfs-0"], "isController": false}, {"data": [0.0, 500, 1500, "User creation(user side)"], "isController": true}, {"data": [1.0, 500, 1500, "Get policy import result-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get Admin Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Accept sr-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get user link result-0"], "isController": false}, {"data": [0.0, 500, 1500, "Login by SR OS"], "isController": false}, {"data": [1.0, 500, 1500, "Create new tenant-0"], "isController": false}, {"data": [0.0, 500, 1500, "Get sr keys"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Verify link-0"], "isController": false}, {"data": [1.0, 500, 1500, "Dry Run Policy-0"], "isController": false}, {"data": [0.0, 500, 1500, "Policy import and dry run"], "isController": true}, {"data": [0.0, 500, 1500, "Invite and accept SR"], "isController": true}, {"data": [0.0, 500, 1500, "Link SR"], "isController": true}, {"data": [1.0, 500, 1500, "Get key gen result-0"], "isController": false}, {"data": [0.5, 500, 1500, "Accept sr"], "isController": false}, {"data": [0.0, 500, 1500, "User creation(admin side)"], "isController": true}, {"data": [1.0, 500, 1500, "Login by user OS-0"], "isController": false}, {"data": [0.9171597633136095, 500, 1500, "Get policy import result"], "isController": false}, {"data": [1.0, 500, 1500, "Create new tenant"], "isController": false}, {"data": [0.0, 500, 1500, "Get user key gen result"], "isController": false}, {"data": [1.0, 500, 1500, "Login by user-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get User Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Link SR profile-0"], "isController": false}, {"data": [1.0, 500, 1500, "Accept user-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get sr keys-0"], "isController": false}, {"data": [0.0, 500, 1500, "Login by user OS"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR link result-0"], "isController": false}, {"data": [0.0, 500, 1500, "Generate user hedera data"], "isController": true}, {"data": [1.0, 500, 1500, "Verify link"], "isController": false}, {"data": [0.5, 500, 1500, "Login by Admin"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR Access Token"], "isController": false}, {"data": [0.0, 500, 1500, "Generate sr hedera data"], "isController": true}, {"data": [0.49166666666666664, 500, 1500, "Login by SR"], "isController": false}, {"data": [1.0, 500, 1500, "Get OS user Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get user key gen result-0"], "isController": false}, {"data": [1.0, 500, 1500, "Login by SR OS-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR DID-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get user keys-0"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2728, 0, 0.0, 376.49266862170055, 0, 10782, 118.0, 750.0, 2049.5499999999997, 2496.42, 6.41224532009515, 55.164290281029345, 2.2471891336182175], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Invite user-0", 20, 0, 0.0, 0.55, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.10527368526326317, 0.4428999643385391, 0.0], "isController": false}, {"data": ["Agree terms", 40, 0, 0.0, 264.2, 232, 365, 260.0, 283.9, 301.19999999999993, 365.0, 0.13639634048618476, 1.0698155058343535, 0.08951675842162156], "isController": false}, {"data": ["Link SR profile", 20, 0, 0.0, 258.29999999999995, 233, 350, 247.5, 315.6000000000001, 348.45, 350.0, 0.10510549964526894, 0.7141990550358672, 0.1353951802559319], "isController": false}, {"data": ["Invite sr-0", 20, 0, 0.0, 0.5500000000000002, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.10531359756514963, 0.4372056978605543, 0.0], "isController": false}, {"data": ["Link user profile-0", 20, 0, 0.0, 1.4000000000000004, 0, 2, 1.5, 2.0, 2.0, 2.0, 0.08416729090740756, 0.8589214500866923, 0.0], "isController": false}, {"data": ["Import Policy-0", 20, 0, 0.0, 1.3000000000000003, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.08084237757432447, 0.8447910035065381, 0.0], "isController": false}, {"data": ["Get Admin Access Token", 41, 0, 0.0, 520.7317073170732, 230, 1154, 495.0, 788.8, 913.8999999999999, 1154.0, 0.2127659574468085, 0.9730707949532953, 0.17591808024130776], "isController": false}, {"data": ["Agree terms-0", 40, 0, 0.0, 1.15, 0, 14, 1.0, 1.8999999999999986, 2.0, 14.0, 0.13651783946867257, 1.0405052429249628, 0.0], "isController": false}, {"data": ["Import Policy", 20, 0, 0.0, 299.25, 239, 800, 265.5, 356.2000000000001, 778.0499999999997, 800.0, 0.0807503320857407, 0.8716659260347146, 0.06446620750009084], "isController": false}, {"data": ["Invite sr", 20, 0, 0.0, 378.95, 277, 493, 364.0, 485.6, 492.75, 493.0, 0.10511986292369875, 0.46771153072916394, 0.08263817348982178], "isController": false}, {"data": ["Generate user keys", 20, 0, 0.0, 2048.1, 2034, 2068, 2047.5, 2065.8, 2067.9, 2068.0, 0.08368550985396879, 0.6690141650801289, 0.05986701195656722], "isController": false}, {"data": ["Get OS user Access Token", 20, 0, 0.0, 2048.2500000000005, 2031, 2056, 2049.0, 2054.9, 2055.95, 2056.0, 0.0836848095333735, 0.6559450734752628, 0.06836574942885118], "isController": false}, {"data": ["Generate sr keys", 20, 0, 0.0, 2058.05, 2038, 2107, 2056.0, 2071.7, 2105.25, 2107.0, 0.10414225832487178, 0.5912005486995235, 0.07602689961988077], "isController": false}, {"data": ["Get policy id", 20, 0, 0.0, 255.69999999999996, 235, 315, 249.5, 288.0, 313.7, 315.0, 0.08076631075645727, 1.4729479867482675, 0.060535296392168904], "isController": false}, {"data": ["Tenant creation flow", 1, 0, 0.0, 1572.0, 1572, 1572, 1572.0, 1572.0, 1572.0, 1572.0, 0.6361323155216285, 11.875919409987278, 1.5667243161577606], "isController": true}, {"data": ["Generate sr keys-0", 20, 0, 0.0, 0.20000000000000004, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.10527645597338611, 0.5633010057849412, 0.0], "isController": false}, {"data": ["Get OS SR Access Token", 20, 0, 0.0, 2052.25, 2038, 2065, 2053.0, 2061.0, 2064.8, 2065.0, 0.10413683580224416, 0.5753051697430424, 0.08456541583140247], "isController": false}, {"data": ["Dry Run Policy", 20, 0, 0.0, 9994.0, 9090, 10782, 9928.0, 10618.3, 10774.15, 10782.0, 0.0774566339670577, 2.7085730152221648, 0.061080304617577234], "isController": false}, {"data": ["Invite and accept user", 20, 0, 0.0, 1136.3, 1006, 1586, 1103.5, 1335.0000000000005, 1574.2999999999997, 1586.0, 0.10469066525683238, 1.5070752896005528, 0.27394909383686056], "isController": true}, {"data": ["Get SR link result", 411, 0, 0.0, 300.93430656934305, 221, 1630, 258.0, 372.0, 592.9999999999978, 855.8799999999999, 1.502544454843238, 11.902176781575369, 0.9620677214333763], "isController": false}, {"data": ["Get User Access Token", 20, 0, 0.0, 256.65, 229, 334, 250.5, 300.50000000000006, 332.45, 334.0, 0.0840982772467906, 0.7543837212541575, 0.05523466441633693], "isController": false}, {"data": ["Accept user", 20, 0, 0.0, 577.9, 529, 856, 561.0, 632.4000000000001, 844.9999999999998, 856.0, 0.10495547264073217, 0.533960967059725, 0.08984249955393925], "isController": false}, {"data": ["Login by user", 20, 0, 0.0, 881.8, 538, 1832, 706.5, 1671.4000000000012, 1826.75, 1832.0, 0.08380754435514284, 0.7228932682113794, 0.03130915634087881], "isController": false}, {"data": ["Get SR DID", 20, 0, 0.0, 259.65, 225, 281, 262.5, 280.8, 281.0, 281.0, 0.08410110635005404, 0.8688284899856608, 0.05145854314807261], "isController": false}, {"data": ["Link user profile", 20, 0, 0.0, 265.15000000000003, 227, 412, 250.0, 331.0000000000001, 408.19999999999993, 412.0, 0.0840745909771149, 0.8861371574485885, 0.07512935007188377], "isController": false}, {"data": ["Get key gen result", 20, 0, 0.0, 2045.9, 2032, 2061, 2045.0, 2058.8, 2060.9, 2061.0, 0.10415852928156655, 0.6440842024060621, 0.07827655879748978], "isController": false}, {"data": ["Invite user", 20, 0, 0.0, 284.3, 240, 375, 279.5, 350.20000000000005, 373.84999999999997, 375.0, 0.10513920430650181, 0.4736500619007066, 0.07947045325510976], "isController": false}, {"data": ["Login by SR-0", 60, 0, 0.0, 1.2833333333333334, 0, 15, 1.0, 2.0, 2.0, 15.0, 0.15165685109824836, 1.3480773544726132, 0.0], "isController": false}, {"data": ["User creation flow", 20, 0, 0.0, 35871.75, 32038, 39393, 36773.0, 38546.0, 39351.7, 39393.0, 0.08823049334080352, 36.45973921961232, 3.116910194316633], "isController": true}, {"data": ["Setup ipfs", 1, 0, 0.0, 240.0, 240, 240, 240.0, 240.0, 240.0, 240.0, 4.166666666666667, 20.01953125, 2.9500325520833335], "isController": false}, {"data": ["Requests for DryRun", 20, 0, 0.0, 10867.6, 9941, 12150, 10731.5, 11593.1, 12123.199999999999, 12150.0, 0.07721799024736783, 4.45597950176057, 0.21148981977321077], "isController": true}, {"data": ["Get user link result", 100, 0, 0.0, 306.12999999999994, 228, 792, 257.0, 353.20000000000005, 749.8499999999999, 791.8, 0.3983635226489581, 4.550385142833242, 0.24923006912603027], "isController": false}, {"data": ["Generate user keys-0", 20, 0, 0.0, 1.35, 0, 14, 1.0, 1.0, 13.34999999999999, 14.0, 0.08440777395598134, 0.6472567803182173, 0.0], "isController": false}, {"data": ["Link user", 20, 0, 0.0, 18793.699999999997, 8942, 31708, 18823.0, 28201.200000000004, 31547.499999999996, 31708.0, 0.0779939944624264, 0.0, 0.0], "isController": true}, {"data": ["Login by Admin-0", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["User creation(SR side)", 20, 0, 0.0, 18585.800000000007, 15491, 20858, 19403.0, 20749.2, 20853.25, 20858.0, 0.09548863923914652, 21.63800540346337, 1.9230936364580398], "isController": true}, {"data": ["Get OS SR Access Token-0", 20, 0, 0.0, 0.35000000000000003, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.10526814428051855, 0.5071734894679222, 0.0], "isController": false}, {"data": ["Get user keys", 20, 0, 0.0, 2047.25, 2034, 2060, 2046.0, 2057.7, 2059.9, 2060.0, 0.08369286392795718, 0.7135470500357787, 0.06167036179378915], "isController": false}, {"data": ["Get policy id-0", 20, 0, 0.0, 1.1500000000000004, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.08084270435014593, 0.8572050365510077, 0.0], "isController": false}, {"data": ["Requests for Import", 20, 0, 0.0, 89050.95, 73850, 105224, 85021.5, 104494.6, 105187.6, 105224.0, 0.060274913882216785, 10.623082739751005, 0.5794132114700148], "isController": true}, {"data": ["Setup ipfs-0", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 4590.8203125, 0.0], "isController": false}, {"data": ["User creation(user side)", 20, 0, 0.0, 14394.149999999998, 13478, 15351, 14438.5, 15290.5, 15348.9, 15351.0, 0.07933611538644622, 12.413804874559684, 0.814884174230043], "isController": true}, {"data": ["Get policy import result-0", 169, 0, 0.0, 1.27810650887574, 0, 8, 1.0, 2.0, 2.0, 7.300000000000011, 0.5283677189208793, 5.611983522508777, 0.0], "isController": false}, {"data": ["Get Admin Access Token-0", 41, 0, 0.0, 0.5853658536585366, 0, 2, 1.0, 1.0, 1.0, 2.0, 0.21304345566877458, 0.8474292621032065, 0.0], "isController": false}, {"data": ["Accept sr-0", 20, 0, 0.0, 0.65, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.10534133225182898, 0.4431794203198163, 0.0], "isController": false}, {"data": ["Get user link result-0", 100, 0, 0.0, 1.1399999999999997, 0, 4, 1.0, 2.0, 2.0, 3.9799999999999898, 0.3987654222527056, 4.177920626490386, 0.0], "isController": false}, {"data": ["Login by SR OS", 20, 0, 0.0, 2479.649999999999, 2451, 2501, 2481.0, 2496.8, 2500.8, 2501.0, 0.10389448476127645, 0.5229271183436103, 0.03353742376742181], "isController": false}, {"data": ["Create new tenant-0", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 4525.390625, 0.0], "isController": false}, {"data": ["Get sr keys", 20, 0, 0.0, 2049.9, 2033, 2064, 2049.5, 2062.0, 2063.9, 2064.0, 0.10417426270665568, 0.646623077333764, 0.0782883826815497], "isController": false}, {"data": ["Get SR Access Token-0", 60, 0, 0.0, 1.2166666666666668, 0, 3, 1.0, 2.0, 2.0, 3.0, 0.15164036969922132, 1.3671524529093468, 0.0], "isController": false}, {"data": ["Verify link-0", 40, 0, 0.0, 1.0500000000000005, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.14805931256061178, 1.2532302667010906, 0.0], "isController": false}, {"data": ["Dry Run Policy-0", 20, 0, 0.0, 0.95, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.08063898330369851, 0.859226479372548, 0.0], "isController": false}, {"data": ["Policy import and dry run", 20, 0, 0.0, 99918.55, 84611, 116632, 95929.0, 115461.7, 116575.3, 116632.0, 0.05823653935188555, 13.624458286440786, 0.719320786331593], "isController": true}, {"data": ["Invite and accept SR", 20, 0, 0.0, 1755.5000000000002, 1583, 2059, 1753.0, 2011.7000000000003, 2057.1, 2059.0, 0.10435690060005218, 1.6450173656404905, 0.23995462920688754], "isController": true}, {"data": ["Link SR", 20, 0, 0.0, 69804.90000000001, 40933, 100162, 74656.0, 96584.40000000002, 100036.05, 100162.0, 0.07191347370843401, 0.0, 0.0], "isController": true}, {"data": ["Get key gen result-0", 20, 0, 0.0, 0.44999999999999996, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.10528366050230833, 0.5757802999794697, 0.0], "isController": false}, {"data": ["Accept sr", 20, 0, 0.0, 595.75, 529, 887, 569.0, 678.9000000000001, 876.7499999999999, 887.0, 0.10498191686482003, 0.7324744172191341, 0.08986513596470509], "isController": false}, {"data": ["User creation(admin side)", 20, 0, 0.0, 2891.8000000000006, 2648, 3411, 2884.5, 3199.4000000000005, 3401.1499999999996, 3411.0, 0.10371722535678725, 3.127996050318412, 0.5098856290709011], "isController": true}, {"data": ["Login by user OS-0", 20, 0, 0.0, 0.4, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.08440884267035814, 0.5560968309227574, 0.0], "isController": false}, {"data": ["Get policy import result", 169, 0, 0.0, 360.4082840236687, 238, 1866, 272.0, 724.0, 762.5, 1434.100000000007, 0.5275232937430743, 7.810058327025424, 0.39538336643359917], "isController": false}, {"data": ["Create new tenant", 1, 0, 0.0, 316.0, 316, 316, 316.0, 316.0, 316.0, 316.0, 3.1645569620253164, 16.18436016613924, 2.3517850079113924], "isController": false}, {"data": ["Get user key gen result", 20, 0, 0.0, 2045.45, 2032, 2064, 2046.0, 2057.6, 2063.7, 2064.0, 0.08369216348427215, 0.7114160818676744, 0.061669845661189014], "isController": false}, {"data": ["Login by user-0", 20, 0, 0.0, 1.5499999999999996, 0, 8, 1.0, 2.0, 7.699999999999996, 8.0, 0.08418642241379311, 0.6732899567176556, 0.0], "isController": false}, {"data": ["Get User Access Token-0", 20, 0, 0.0, 0.7499999999999999, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.08419067504083248, 0.7059190780279176, 0.0], "isController": false}, {"data": ["Link SR profile-0", 20, 0, 0.0, 0.9500000000000001, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.10523712555315264, 0.6798431358427126, 0.0], "isController": false}, {"data": ["Accept user-0", 20, 0, 0.0, 0.7, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.10525097094020693, 0.4490690962756944, 0.0], "isController": false}, {"data": ["Get sr keys-0", 20, 0, 0.0, 0.35000000000000003, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.10530583446975879, 0.5783696715247758, 0.0], "isController": false}, {"data": ["Login by user OS", 20, 0, 0.0, 2482.8499999999995, 2452, 2524, 2480.0, 2510.1, 2523.35, 2524.0, 0.08352683717278361, 0.6136734672303337, 0.027288968140776134], "isController": false}, {"data": ["Get SR link result-0", 411, 0, 0.0, 0.7810218978102191, 0, 4, 1.0, 1.0, 1.0, 2.0, 1.5039795078217912, 9.935601014317081, 0.0], "isController": false}, {"data": ["Generate user hedera data", 20, 0, 0.0, 13688.000000000002, 13643, 13745, 13680.5, 13730.6, 13744.3, 13745.0, 0.07979381278775644, 0.0, 0.0], "isController": true}, {"data": ["Verify link", 40, 0, 0.0, 264.69999999999993, 224, 470, 260.0, 308.0, 322.34999999999997, 470.0, 0.14791367757776563, 1.5115615050494031, 0.09360884643971779], "isController": false}, {"data": ["Login by Admin", 1, 0, 0.0, 764.0, 764, 764, 764.0, 764.0, 764.0, 764.0, 1.3089005235602096, 5.285452797774869, 0.4639950098167539], "isController": false}, {"data": ["Get SR Access Token", 60, 0, 0.0, 258.2666666666667, 226, 483, 249.0, 293.2, 296.0, 483.0, 0.15154500128813253, 1.4682870576464555, 0.14018405929703326], "isController": false}, {"data": ["Generate sr hedera data", 20, 0, 0.0, 13707.100000000004, 13646, 13790, 13699.0, 13755.6, 13788.3, 13790.0, 0.09817781966698083, 0.0, 0.0], "isController": true}, {"data": ["Login by SR", 60, 0, 0.0, 633.2833333333332, 533, 1607, 586.0, 759.0, 819.8, 1607.0, 0.15145089961834374, 1.4508227096837705, 0.09735354540245553], "isController": false}, {"data": ["Get OS user Access Token-0", 20, 0, 0.0, 0.9000000000000002, 0, 10, 0.0, 1.0, 9.549999999999994, 10.0, 0.0844091989144977, 0.6032166565199776, 0.0], "isController": false}, {"data": ["Get user key gen result-0", 20, 0, 0.0, 0.5499999999999999, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.08441774967604689, 0.6572383471848791, 0.0], "isController": false}, {"data": ["Login by SR OS-0", 20, 0, 0.0, 0.30000000000000004, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.10526204987315922, 0.4491060867122451, 0.0], "isController": false}, {"data": ["Get SR DID-0", 20, 0, 0.0, 0.9500000000000001, 0, 2, 1.0, 1.9000000000000021, 2.0, 2.0, 0.08419067504083248, 0.7394350240048662, 0.0], "isController": false}, {"data": ["Get user keys-0", 20, 0, 0.0, 0.2500000000000001, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.08441881864305191, 0.6593901162447133, 0.0], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2728, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
