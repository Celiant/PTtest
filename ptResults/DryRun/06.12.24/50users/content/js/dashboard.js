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

    var data = {"OkPercent": 99.95935785409469, "KoPercent": 0.0406421459053038};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7351336606655755, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Invite user-0"], "isController": false}, {"data": [0.45, 500, 1500, "WS open for sr link"], "isController": false}, {"data": [0.9052631578947369, 500, 1500, "Agree terms"], "isController": false}, {"data": [0.47, 500, 1500, "Link SR profile"], "isController": false}, {"data": [1.0, 500, 1500, "Invite sr-0"], "isController": false}, {"data": [1.0, 500, 1500, "Link user profile-0"], "isController": false}, {"data": [1.0, 500, 1500, "Import Policy-0"], "isController": false}, {"data": [0.7425742574257426, 500, 1500, "Get Admin Access Token"], "isController": false}, {"data": [1.0, 500, 1500, "Agree terms-0"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "Import Policy"], "isController": false}, {"data": [0.93, 500, 1500, "Invite sr"], "isController": false}, {"data": [0.0, 500, 1500, "Generate user keys"], "isController": false}, {"data": [0.0, 500, 1500, "Generate sr keys"], "isController": false}, {"data": [0.9428571428571428, 500, 1500, "Get policy id"], "isController": false}, {"data": [0.0, 500, 1500, "Tenant creation flow"], "isController": true}, {"data": [1.0, 500, 1500, "Get Access Token-0"], "isController": false}, {"data": [0.5, 500, 1500, "WS open for policy import"], "isController": false}, {"data": [1.0, 500, 1500, "Generate sr keys-0"], "isController": false}, {"data": [0.0, 500, 1500, "Dry Run Policy"], "isController": false}, {"data": [0.39, 500, 1500, "Invite and accept user"], "isController": true}, {"data": [0.8879093198992444, 500, 1500, "Get SR link result"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "Get User Access Token"], "isController": false}, {"data": [0.5, 500, 1500, "Accept user"], "isController": false}, {"data": [0.43333333333333335, 500, 1500, "Login by user"], "isController": false}, {"data": [0.6111111111111112, 500, 1500, "Get SR DID"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "Link user profile"], "isController": false}, {"data": [0.0, 500, 1500, "Get key gen result"], "isController": false}, {"data": [0.92, 500, 1500, "Invite user"], "isController": false}, {"data": [1.0, 500, 1500, "Login by SR-0"], "isController": false}, {"data": [1.0, 500, 1500, "WS open for policy import-0"], "isController": false}, {"data": [0.0, 500, 1500, "User creation flow"], "isController": true}, {"data": [1.0, 500, 1500, "Setup ipfs"], "isController": false}, {"data": [1.0, 500, 1500, "WS open for sr key gen-0"], "isController": false}, {"data": [0.0, 500, 1500, "Requests for DryRun"], "isController": true}, {"data": [1.0, 500, 1500, "WS open for sr key gen"], "isController": false}, {"data": [0.8947368421052632, 500, 1500, "Get user link result"], "isController": false}, {"data": [1.0, 500, 1500, "Generate user keys-0"], "isController": false}, {"data": [0.0, 500, 1500, "Link user"], "isController": true}, {"data": [1.0, 500, 1500, "Login by Admin-0"], "isController": false}, {"data": [0.0, 500, 1500, "User creation(SR side)"], "isController": true}, {"data": [0.0, 500, 1500, "Get Access Token"], "isController": false}, {"data": [0.0, 500, 1500, "Get user keys"], "isController": false}, {"data": [1.0, 500, 1500, "Get policy id-0"], "isController": false}, {"data": [1.0, 500, 1500, "WS open for user key gen-0"], "isController": false}, {"data": [0.0, 500, 1500, "Requests for Import"], "isController": true}, {"data": [1.0, 500, 1500, "Setup ipfs-0"], "isController": false}, {"data": [0.0, 500, 1500, "User creation(user side)"], "isController": true}, {"data": [0.9927007299270073, 500, 1500, "Get policy import result-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get Admin Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Accept sr-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get user link result-0"], "isController": false}, {"data": [0.0, 500, 1500, "Login by SR OS"], "isController": false}, {"data": [1.0, 500, 1500, "Create new tenant-0"], "isController": false}, {"data": [0.0, 500, 1500, "Get sr keys"], "isController": false}, {"data": [1.0, 500, 1500, "WS open for user key gen"], "isController": false}, {"data": [0.9957264957264957, 500, 1500, "Get SR Access Token-0"], "isController": false}, {"data": [0.9947368421052631, 500, 1500, "Verify link-0"], "isController": false}, {"data": [0.9838709677419355, 500, 1500, "Dry Run Policy-0"], "isController": false}, {"data": [0.0, 500, 1500, "Policy import and dry run"], "isController": true}, {"data": [0.0, 500, 1500, "Invite and accept SR"], "isController": true}, {"data": [1.0, 500, 1500, "Get key gen result-0"], "isController": false}, {"data": [0.0, 500, 1500, "Link SR"], "isController": true}, {"data": [0.5, 500, 1500, "Accept sr"], "isController": false}, {"data": [0.0, 500, 1500, "User creation(admin side)"], "isController": true}, {"data": [1.0, 500, 1500, "Login by user OS-0"], "isController": false}, {"data": [0.4666666666666667, 500, 1500, "WS open for user link"], "isController": false}, {"data": [0.8631386861313869, 500, 1500, "Get policy import result"], "isController": false}, {"data": [1.0, 500, 1500, "WS open for sr link-0"], "isController": false}, {"data": [0.9888888888888889, 500, 1500, "WS open for user link-0"], "isController": false}, {"data": [1.0, 500, 1500, "Create new tenant"], "isController": false}, {"data": [0.0, 500, 1500, "Get user key gen result"], "isController": false}, {"data": [1.0, 500, 1500, "Login by user-0"], "isController": false}, {"data": [0.9777777777777777, 500, 1500, "Get User Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Link SR profile-0"], "isController": false}, {"data": [1.0, 500, 1500, "Accept user-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get sr keys-0"], "isController": false}, {"data": [0.0, 500, 1500, "Login by user OS"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR link result-0"], "isController": false}, {"data": [0.0, 500, 1500, "Generate user hedera data"], "isController": true}, {"data": [0.7578947368421053, 500, 1500, "Verify link"], "isController": false}, {"data": [0.5, 500, 1500, "Login by Admin"], "isController": false}, {"data": [0.9658119658119658, 500, 1500, "Get SR Access Token"], "isController": false}, {"data": [0.0, 500, 1500, "Generate sr hedera data"], "isController": true}, {"data": [0.48, 500, 1500, "Login by SR"], "isController": false}, {"data": [1.0, 500, 1500, "Get user key gen result-0"], "isController": false}, {"data": [1.0, 500, 1500, "Login by SR OS-0"], "isController": false}, {"data": [0.9777777777777777, 500, 1500, "Get SR DID-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get user keys-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4921, 2, 0.0406421459053038, 593.1987400934778, 0, 101290, 11.0, 2040.0, 2071.0, 2960.7999999999975, 5.779471074457814, 375.99382944607333, 2.104148557495813], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Invite user-0", 50, 0, 0.0, 1.9200000000000004, 0, 4, 2.0, 3.0, 3.4499999999999957, 4.0, 0.10183444570492858, 4.885221123315404, 0.0], "isController": false}, {"data": ["WS open for sr link", 50, 0, 0.0, 1161.5, 930, 3650, 1001.0, 1531.1999999999996, 2406.649999999995, 3650.0, 0.1015925650497194, 5.566343945184716, 0.06258459168424219], "isController": false}, {"data": ["Agree terms", 95, 0, 0.0, 440.03157894736836, 253, 2212, 295.0, 830.6000000000006, 1359.7999999999997, 2212.0, 0.12888538561829033, 7.8999348492855, 0.0846698020015222], "isController": false}, {"data": ["Link SR profile", 50, 0, 0.0, 918.2800000000001, 700, 2912, 775.5, 1184.9, 2423.7499999999995, 2912.0, 0.10165287575985524, 5.665398679402077, 0.13100117282005408], "isController": false}, {"data": ["Invite sr-0", 50, 0, 0.0, 1.74, 0, 3, 2.0, 3.0, 3.0, 3.0, 0.101960496425265, 4.884513169217718, 0.0], "isController": false}, {"data": ["Link user profile-0", 45, 0, 0.0, 12.6, 0, 183, 3.0, 7.599999999999994, 138.19999999999982, 183.0, 0.0741154323153167, 5.5861965823315405, 0.0], "isController": false}, {"data": ["Import Policy-0", 36, 0, 0.0, 6.111111111111112, 1, 99, 3.5, 6.6000000000000085, 23.349999999999874, 99.0, 0.07821309156797694, 5.776466661805506, 0.0], "isController": false}, {"data": ["Get Admin Access Token", 101, 0, 0.0, 555.4059405940596, 232, 2524, 713.0, 846.0, 956.5, 2501.6600000000044, 0.20454867650930594, 9.869790084452276, 0.16963909373291208], "isController": false}, {"data": ["Agree terms-0", 95, 0, 0.0, 8.526315789473685, 0, 324, 3.0, 5.0, 9.599999999999909, 324.0, 0.1289541411925679, 7.875562657883984, 0.0], "isController": false}, {"data": ["Import Policy", 36, 0, 0.0, 306.77777777777777, 241, 1143, 264.0, 379.5000000000002, 530.999999999999, 1143.0, 0.07817046372456202, 5.8002657965407405, 0.06242355987206101], "isController": false}, {"data": ["Invite sr", 50, 0, 0.0, 386.6800000000001, 291, 647, 371.5, 519.6, 558.8499999999999, 647.0, 0.10184315746377948, 4.909226079842998, 0.08006224781088132], "isController": false}, {"data": ["Generate user keys", 45, 0, 0.0, 2056.4222222222215, 2034, 2084, 2055.0, 2075.0, 2076.7, 2084.0, 0.07495877267502873, 4.880525346476104, 0.05364237169556743], "isController": false}, {"data": ["Generate sr keys", 50, 0, 0.0, 2064.5999999999995, 2037, 2086, 2065.0, 2079.9, 2083.45, 2086.0, 0.10134731115448777, 5.075887045507983, 0.07401322873784086], "isController": false}, {"data": ["Get policy id", 35, 0, 0.0, 351.59999999999997, 244, 1665, 288.0, 525.9999999999997, 877.7999999999959, 1665.0, 0.07100875030685924, 6.076575788780414, 0.05323675002079542], "isController": false}, {"data": ["Tenant creation flow", 1, 0, 0.0, 1803.0, 1803, 1803, 1803.0, 1803.0, 1803.0, 1803.0, 0.5546311702717693, 89.62330577509707, 1.3659959095951193], "isController": true}, {"data": ["Get Access Token-0", 95, 0, 0.0, 2.094736842105263, 0, 99, 1.0, 2.0, 2.1999999999999886, 99.0, 0.1300974224277001, 7.346786533752749, 0.0], "isController": false}, {"data": ["WS open for policy import", 36, 0, 0.0, 1007.111111111111, 915, 1310, 983.5, 1130.2, 1236.8999999999999, 1310.0, 0.07804099753737297, 5.775882733781564, 0.05660428038612952], "isController": false}, {"data": ["Generate sr keys-0", 50, 0, 0.0, 1.52, 0, 11, 1.0, 2.0, 5.599999999999966, 11.0, 0.10177661254864923, 5.064191543203155, 0.0], "isController": false}, {"data": ["Dry Run Policy", 31, 0, 0.0, 23586.12903225806, 7795, 64932, 19321.0, 51198.0, 58087.79999999998, 64932.0, 0.05540047394211901, 5.1640540251795155, 0.043696984203716475], "isController": false}, {"data": ["Invite and accept user", 50, 0, 0.0, 1355.1200000000001, 1044, 2407, 1220.5, 1920.5, 2015.85, 2407.0, 0.10150326332991605, 14.788839113521249, 0.2656352296257575], "isController": true}, {"data": ["Get SR link result", 397, 0, 0.0, 435.9219143576826, 237, 4958, 290.0, 799.2, 961.9999999999997, 2704.06, 0.6213415970200644, 42.335147495265595, 0.3979919378188875], "isController": false}, {"data": ["Get User Access Token", 45, 0, 0.0, 405.3555555555555, 239, 4780, 279.0, 443.59999999999985, 716.5999999999993, 4780.0, 0.07443171386464344, 5.0950640298818515, 0.04890396200012901], "isController": false}, {"data": ["Accept user", 50, 0, 0.0, 656.44, 539, 1378, 586.0, 871.6999999999999, 1155.5999999999988, 1378.0, 0.1016222983711978, 4.965297255384966, 0.08701607779085319], "isController": false}, {"data": ["Login by user", 45, 0, 0.0, 909.2444444444444, 571, 2227, 697.0, 1759.6, 1883.7999999999995, 2227.0, 0.07496701451361401, 5.033494897661695, 0.02802477847247211], "isController": false}, {"data": ["Get SR DID", 45, 0, 0.0, 776.8222222222221, 267, 2745, 764.0, 1100.3999999999999, 1745.8999999999976, 2745.0, 0.07430536864544617, 5.544422148820443, 0.04548301276070864], "isController": false}, {"data": ["Link user profile", 45, 0, 0.0, 392.6888888888888, 240, 2705, 275.0, 500.5999999999999, 1483.7999999999993, 2705.0, 0.07408004925500164, 5.6083436282309185, 0.06623637390094016], "isController": false}, {"data": ["Get key gen result", 50, 0, 0.0, 2062.480000000001, 2030, 2086, 2065.5, 2080.7, 2083.35, 2086.0, 0.10135059806987921, 5.139326508806354, 0.07619308340444766], "isController": false}, {"data": ["Invite user", 50, 0, 0.0, 413.40000000000003, 251, 1595, 352.5, 625.5, 954.9499999999978, 1595.0, 0.10176501237462551, 4.91220112251897, 0.0769200386503517], "isController": false}, {"data": ["Login by SR-0", 50, 0, 0.0, 2.5200000000000005, 1, 14, 2.0, 4.0, 5.449999999999996, 14.0, 0.10178034173767542, 5.214143294507525, 0.0], "isController": false}, {"data": ["WS open for policy import-0", 36, 0, 0.0, 3.555555555555555, 1, 9, 3.0, 6.0, 9.0, 9.0, 0.07821122244140676, 5.7709142545655805, 0.0], "isController": false}, {"data": ["User creation flow", 45, 0, 0.0, 38262.48888888889, 34064, 48800, 38295.0, 43916.4, 46081.1, 48800.0, 0.08391138957261132, 205.65845748139967, 2.4142716229162007], "isController": true}, {"data": ["Setup ipfs", 1, 0, 0.0, 264.0, 264, 264, 264.0, 264.0, 264.0, 264.0, 3.787878787878788, 153.53855942234847, 2.681847774621212], "isController": false}, {"data": ["WS open for sr key gen-0", 50, 0, 0.0, 1.1400000000000003, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.10176832644022536, 5.051747921890774, 0.0], "isController": false}, {"data": ["Requests for DryRun", 31, 0, 0.0, 23883.74193548387, 8065, 65762, 19580.0, 51463.4, 58776.79999999998, 65762.0, 0.05541354593067944, 9.525301213400247, 0.10558144841624512], "isController": true}, {"data": ["WS open for sr key gen", 50, 0, 0.0, 2.22, 1, 4, 2.0, 3.0, 3.4499999999999957, 4.0, 0.10176811930480162, 5.064558037595178, 0.0736248614681476], "isController": false}, {"data": ["Get user link result", 95, 0, 0.0, 444.115789473684, 250, 2825, 300.0, 906.8000000000001, 996.7999999999988, 2825.0, 0.15626953369171145, 12.572524934757471, 0.09780018246524237], "isController": false}, {"data": ["Generate user keys-0", 45, 0, 0.0, 2.022222222222222, 1, 11, 1.0, 3.0, 8.89999999999997, 11.0, 0.07521926415501186, 4.872951398117179, 0.0], "isController": false}, {"data": ["Link user", 45, 0, 0.0, 5660.644444444444, 3712, 13111, 5015.0, 8265.6, 10815.099999999995, 13111.0, 0.07381550716174454, 49.885114044445956, 0.4233082254670061], "isController": true}, {"data": ["Login by Admin-0", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 19566.89453125, 0.0], "isController": false}, {"data": ["User creation(SR side)", 50, 0, 0.0, 18734.520000000008, 15830, 25385, 18362.5, 22853.2, 24471.849999999995, 25385.0, 0.09786880881915411, 115.37984589760867, 1.3123958767626174], "isController": true}, {"data": ["Get Access Token", 95, 0, 0.0, 2062.2105263157887, 2034, 2139, 2062.0, 2079.0, 2083.2, 2139.0, 0.12972825344804043, 7.41673681167213, 0.13465307293800355], "isController": false}, {"data": ["Get user keys", 45, 0, 0.0, 2059.311111111111, 2032, 2183, 2057.0, 2078.2, 2114.5, 2183.0, 0.0749350562845534, 4.961372344488943, 0.05523533250349697], "isController": false}, {"data": ["Get policy id-0", 35, 0, 0.0, 31.599999999999998, 1, 376, 3.0, 155.39999999999998, 330.39999999999975, 376.0, 0.07104507302418578, 5.72924595804281, 0.0], "isController": false}, {"data": ["WS open for user key gen-0", 45, 0, 0.0, 3.311111111111111, 0, 93, 1.0, 2.0, 3.6999999999999957, 93.0, 0.07521436092864664, 4.8624272536102895, 0.0], "isController": false}, {"data": ["Requests for Import", 36, 1, 2.7777777777777777, 7954.91666666667, 3704, 101290, 5397.5, 6670.700000000003, 23129.099999999868, 101290.0, 0.0646128166701067, 60.95608249463804, 0.5793682498676335], "isController": true}, {"data": ["Setup ipfs-0", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 20160.15625, 0.0], "isController": false}, {"data": ["User creation(user side)", 45, 0, 0.0, 16704.93333333333, 14921, 24138, 16050.0, 19129.0, 21968.099999999995, 24138.0, 0.07248431117353711, 77.39240666688546, 0.7770623321786851], "isController": true}, {"data": ["Get policy import result-0", 274, 0, 0.0, 32.79562043795621, 1, 2488, 3.0, 10.0, 112.75, 854.25, 0.5024287110503144, 40.79344870895075, 0.0], "isController": false}, {"data": ["Get Admin Access Token-0", 101, 0, 0.0, 2.356435643564357, 0, 13, 2.0, 3.0, 4.0, 12.880000000000024, 0.20465975821779853, 9.753233491201657, 0.0], "isController": false}, {"data": ["Accept sr-0", 50, 0, 0.0, 2.7800000000000007, 0, 21, 2.0, 3.8999999999999986, 7.699999999999974, 21.0, 0.10191685215533759, 4.889172350442116, 0.0], "isController": false}, {"data": ["Get user link result-0", 95, 0, 0.0, 19.978947368421053, 1, 272, 4.0, 97.4, 121.99999999999926, 272.0, 0.15633691098011723, 12.403276821654142, 0.0], "isController": false}, {"data": ["Login by SR OS", 50, 0, 0.0, 2852.5800000000004, 2480, 3064, 2876.5, 2962.0, 2995.5499999999997, 3064.0, 0.10116460695526905, 4.943977569783345, 0.03268288600873253], "isController": false}, {"data": ["Create new tenant-0", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 13418.9453125, 0.0], "isController": false}, {"data": ["Get sr keys", 50, 0, 0.0, 2057.9599999999996, 2030, 2166, 2057.5, 2072.0, 2083.35, 2166.0, 0.1013549124698976, 5.174047526712087, 0.07619632687263336], "isController": false}, {"data": ["WS open for user key gen", 45, 0, 0.0, 4.444444444444443, 1, 94, 2.0, 3.0, 4.699999999999996, 94.0, 0.07521410949837203, 4.871886214214798, 0.053310938158123454], "isController": false}, {"data": ["Get SR Access Token-0", 117, 0, 0.0, 11.64957264957265, 0, 502, 2.0, 5.0, 8.299999999999983, 471.57999999999885, 0.15679064294884335, 10.310479289396664, 0.0], "isController": false}, {"data": ["Verify link-0", 95, 0, 0.0, 20.68421052631579, 0, 931, 3.0, 8.400000000000006, 123.79999999999939, 931.0, 0.1339393973573052, 9.664418695084848, 0.0], "isController": false}, {"data": ["Dry Run Policy-0", 31, 0, 0.0, 66.83870967741935, 1, 1402, 4.0, 111.60000000000002, 774.3999999999985, 1402.0, 0.05740219868937819, 4.586223020966616, 0.0], "isController": false}, {"data": ["Policy import and dry run", 31, 0, 0.0, 29119.548387096776, 13081, 75098, 23453.0, 57760.8, 66274.39999999998, 75098.0, 0.06229365227683299, 66.28313447717541, 0.6695723798234879], "isController": true}, {"data": ["Invite and accept SR", 50, 0, 0.0, 1835.4, 1596, 3395, 1764.5, 1998.8, 2458.8, 3395.0, 0.101531501163551, 14.928963881818348, 0.2334847749706574], "isController": true}, {"data": ["Get key gen result-0", 50, 0, 0.0, 0.9199999999999999, 0, 2, 1.0, 1.0, 2.0, 2.0, 0.10177640537949369, 5.088164288236887, 0.0], "isController": false}, {"data": ["Link SR", 50, 0, 0.0, 7631.840000000001, 4654, 14216, 7196.5, 11678.8, 13423.749999999995, 14216.0, 0.10006344022110018, 87.91969030240172, 0.9322961538865641], "isController": true}, {"data": ["Accept sr", 50, 0, 0.0, 617.5000000000001, 536, 1252, 577.5, 732.0, 780.0499999999998, 1252.0, 0.10180334444347165, 5.165756205422861, 0.08717110202629377], "isController": false}, {"data": ["User creation(admin side)", 50, 0, 0.0, 3190.5199999999995, 2737, 5429, 3005.0, 3837.8999999999996, 4235.399999999998, 5429.0, 0.10112061869639342, 29.601637139656674, 0.4971737419078225], "isController": true}, {"data": ["Login by user OS-0", 45, 0, 0.0, 1.2444444444444442, 0, 3, 1.0, 2.0, 3.0, 3.0, 0.07521737822306465, 4.789048684030181, 0.0], "isController": false}, {"data": ["WS open for user link", 45, 0, 0.0, 1235.8444444444444, 929, 6738, 1012.0, 1312.6, 3245.19999999999, 6738.0, 0.0742304773844479, 5.216988186013328, 0.044639773411467784], "isController": false}, {"data": ["Get policy import result", 274, 1, 0.36496350364963503, 460.7627737226279, 246, 3001, 302.0, 833.5, 950.0, 2314.25, 0.5021616777331616, 42.07015629037683, 0.37651208337991465], "isController": false}, {"data": ["WS open for sr link-0", 50, 0, 0.0, 2.2800000000000002, 1, 5, 2.0, 3.0, 4.0, 5.0, 0.10182179556627173, 5.556033552318075, 0.0], "isController": false}, {"data": ["WS open for user link-0", 45, 0, 0.0, 36.53333333333334, 1, 1155, 3.0, 41.59999999999988, 149.59999999999968, 1155.0, 0.0743585337158116, 5.209286482362155, 0.0], "isController": false}, {"data": ["Create new tenant", 1, 0, 0.0, 338.0, 338, 338, 338.0, 338.0, 338.0, 338.0, 2.9585798816568047, 120.84527551775147, 2.19871024408284], "isController": false}, {"data": ["Get user key gen result", 45, 0, 0.0, 2052.7777777777783, 2024, 2133, 2045.0, 2076.6, 2084.5, 2133.0, 0.07495315427857589, 4.9490959426400165, 0.05524867270455965], "isController": false}, {"data": ["Login by user-0", 45, 0, 0.0, 6.933333333333334, 0, 104, 2.0, 7.0, 66.39999999999965, 104.0, 0.07503902029055108, 4.991166370054095, 0.0], "isController": false}, {"data": ["Get User Access Token-0", 45, 0, 0.0, 103.06666666666666, 1, 4317, 3.0, 5.0, 136.09999999999926, 4317.0, 0.07446447630788579, 5.053689727728916, 0.0], "isController": false}, {"data": ["Link SR profile-0", 50, 0, 0.0, 2.06, 0, 4, 2.0, 4.0, 4.0, 4.0, 0.10185249314532721, 5.642407307228879, 0.0], "isController": false}, {"data": ["Accept user-0", 50, 0, 0.0, 2.44, 0, 20, 2.0, 3.0, 6.599999999999966, 20.0, 0.10173830060412203, 4.887426490898492, 0.0], "isController": false}, {"data": ["Get sr keys-0", 50, 0, 0.0, 1.1199999999999999, 0, 9, 1.0, 2.0, 2.4499999999999957, 9.0, 0.10178013455333788, 5.122997714399854, 0.0], "isController": false}, {"data": ["Login by user OS", 45, 0, 0.0, 2809.8222222222225, 2492, 3031, 2828.0, 2960.6, 3026.7999999999997, 3031.0, 0.07485179344897104, 4.822612685216605, 0.05976447883191281], "isController": false}, {"data": ["Get SR link result-0", 397, 0, 0.0, 3.3450881612090666, 0, 123, 3.0, 4.0, 6.0, 13.0, 0.6217103769256187, 41.48451068104691, 0.0], "isController": false}, {"data": ["Generate user hedera data", 45, 0, 0.0, 11044.288888888888, 10679, 11286, 11055.0, 11206.2, 11243.8, 11286.0, 0.07381490175236577, 28.928389985245218, 0.36802206973293766], "isController": true}, {"data": ["Verify link", 95, 0, 0.0, 549.9999999999999, 253, 1549, 447.0, 930.0, 1160.5999999999997, 1549.0, 0.13378303208680406, 9.890826554699657, 0.08475171585540166], "isController": false}, {"data": ["Login by Admin", 1, 0, 0.0, 930.0, 930, 930, 930.0, 930.0, 930.0, 930.0, 1.075268817204301, 42.76188676075269, 0.3811743951612903], "isController": false}, {"data": ["Get SR Access Token", 117, 0, 0.0, 321.30769230769226, 235, 1518, 274.0, 369.2000000000001, 595.3, 1503.9599999999996, 0.1567377121652578, 10.410912151526517, 0.13863427615979207], "isController": false}, {"data": ["Generate sr hedera data", 50, 0, 0.0, 11102.68, 10668, 11280, 11134.0, 11236.7, 11275.35, 11280.0, 0.0995106068355826, 29.881451225995555, 0.40726659414001937], "isController": true}, {"data": ["Login by SR", 50, 0, 0.0, 746.1800000000002, 589, 2158, 653.0, 952.4, 1429.649999999998, 2158.0, 0.10165556249072394, 5.272441196069183, 0.03760660174095316], "isController": false}, {"data": ["Get user key gen result-0", 45, 0, 0.0, 3.311111111111111, 0, 90, 1.0, 3.0, 3.0, 90.0, 0.07520857845758905, 4.91219901161304, 0.0], "isController": false}, {"data": ["Login by SR OS-0", 50, 0, 0.0, 2.8800000000000003, 0, 96, 1.0, 1.0, 2.0, 96.0, 0.10176024878345623, 4.89501379232972, 0.0], "isController": false}, {"data": ["Get SR DID-0", 45, 0, 0.0, 53.13333333333333, 0, 1944, 3.0, 6.399999999999999, 188.09999999999948, 1944.0, 0.07440599216256882, 5.283999340163528, 0.0], "isController": false}, {"data": ["Get user keys-0", 45, 0, 0.0, 6.288888888888888, 0, 119, 1.0, 3.3999999999999986, 69.69999999999962, 119.0, 0.07519575962756377, 4.924880023598936, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Assertion failed", 1, 50.0, 0.0203210729526519], "isController": false}, {"data": ["Failed that JSONPath not exists: $..error.code", 1, 50.0, 0.0203210729526519], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 4921, 2, "Assertion failed", 1, "Failed that JSONPath not exists: $..error.code", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Requests for Import", 1, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Get policy import result", 274, 1, "Failed that JSONPath not exists: $..error.code", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
