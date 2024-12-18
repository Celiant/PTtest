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

    var data = {"OkPercent": 99.97780490511597, "KoPercent": 0.02219509488403063};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8469820892431928, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Invite user-0"], "isController": false}, {"data": [0.995, 500, 1500, "Agree terms"], "isController": false}, {"data": [0.99, 500, 1500, "Link SR profile"], "isController": false}, {"data": [1.0, 500, 1500, "Invite sr-0"], "isController": false}, {"data": [1.0, 500, 1500, "Link user profile-0"], "isController": false}, {"data": [1.0, 500, 1500, "Import Policy-0"], "isController": false}, {"data": [0.7524752475247525, 500, 1500, "Get Admin Access Token"], "isController": false}, {"data": [1.0, 500, 1500, "Agree terms-0"], "isController": false}, {"data": [1.0, 500, 1500, "Import Policy"], "isController": false}, {"data": [1.0, 500, 1500, "Invite sr"], "isController": false}, {"data": [0.0, 500, 1500, "Generate user keys"], "isController": false}, {"data": [0.0, 500, 1500, "Get OS user Access Token"], "isController": false}, {"data": [0.0, 500, 1500, "Generate sr keys"], "isController": false}, {"data": [0.9795918367346939, 500, 1500, "Get policy id"], "isController": false}, {"data": [0.0, 500, 1500, "Tenant creation flow"], "isController": true}, {"data": [1.0, 500, 1500, "Generate sr keys-0"], "isController": false}, {"data": [0.0, 500, 1500, "Get OS SR Access Token"], "isController": false}, {"data": [0.0, 500, 1500, "Dry Run Policy"], "isController": false}, {"data": [0.48, 500, 1500, "Invite and accept user"], "isController": true}, {"data": [0.97356188262638, 500, 1500, "Get SR link result"], "isController": false}, {"data": [1.0, 500, 1500, "Get User Access Token"], "isController": false}, {"data": [0.5, 500, 1500, "Accept user"], "isController": false}, {"data": [0.46, 500, 1500, "Login by user"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR DID"], "isController": false}, {"data": [1.0, 500, 1500, "Link user profile"], "isController": false}, {"data": [0.0, 500, 1500, "Get key gen result"], "isController": false}, {"data": [1.0, 500, 1500, "Invite user"], "isController": false}, {"data": [1.0, 500, 1500, "Login by SR-0"], "isController": false}, {"data": [0.0, 500, 1500, "User creation flow"], "isController": true}, {"data": [1.0, 500, 1500, "Setup ipfs"], "isController": false}, {"data": [0.0, 500, 1500, "Requests for DryRun"], "isController": true}, {"data": [0.9686684073107049, 500, 1500, "Get user link result"], "isController": false}, {"data": [1.0, 500, 1500, "Generate user keys-0"], "isController": false}, {"data": [0.0, 500, 1500, "Link user"], "isController": true}, {"data": [1.0, 500, 1500, "Login by Admin-0"], "isController": false}, {"data": [0.0, 500, 1500, "User creation(SR side)"], "isController": true}, {"data": [1.0, 500, 1500, "Get OS SR Access Token-0"], "isController": false}, {"data": [0.0, 500, 1500, "Get user keys"], "isController": false}, {"data": [1.0, 500, 1500, "Get policy id-0"], "isController": false}, {"data": [0.0, 500, 1500, "Requests for Import"], "isController": true}, {"data": [1.0, 500, 1500, "Setup ipfs-0"], "isController": false}, {"data": [0.0, 500, 1500, "User creation(user side)"], "isController": true}, {"data": [1.0, 500, 1500, "Get policy import result-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get Admin Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Accept sr-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get user link result-0"], "isController": false}, {"data": [0.0, 500, 1500, "Login by SR OS"], "isController": false}, {"data": [1.0, 500, 1500, "Create new tenant-0"], "isController": false}, {"data": [0.0, 500, 1500, "Get sr keys"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Verify link-0"], "isController": false}, {"data": [1.0, 500, 1500, "Dry Run Policy-0"], "isController": false}, {"data": [0.0, 500, 1500, "Policy import and dry run"], "isController": true}, {"data": [0.01, 500, 1500, "Invite and accept SR"], "isController": true}, {"data": [0.0, 500, 1500, "Link SR"], "isController": true}, {"data": [1.0, 500, 1500, "Get key gen result-0"], "isController": false}, {"data": [0.5, 500, 1500, "Accept sr"], "isController": false}, {"data": [0.0, 500, 1500, "User creation(admin side)"], "isController": true}, {"data": [1.0, 500, 1500, "Login by user OS-0"], "isController": false}, {"data": [0.9158345221112696, 500, 1500, "Get policy import result"], "isController": false}, {"data": [1.0, 500, 1500, "Create new tenant"], "isController": false}, {"data": [0.0, 500, 1500, "Get user key gen result"], "isController": false}, {"data": [1.0, 500, 1500, "Login by user-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get User Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Link SR profile-0"], "isController": false}, {"data": [1.0, 500, 1500, "Accept user-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get sr keys-0"], "isController": false}, {"data": [0.0, 500, 1500, "Login by user OS"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR link result-0"], "isController": false}, {"data": [0.0, 500, 1500, "Generate user hedera data"], "isController": true}, {"data": [1.0, 500, 1500, "Verify link"], "isController": false}, {"data": [0.5, 500, 1500, "Login by Admin"], "isController": false}, {"data": [0.9932885906040269, 500, 1500, "Get SR Access Token"], "isController": false}, {"data": [0.0, 500, 1500, "Generate sr hedera data"], "isController": true}, {"data": [0.4463087248322148, 500, 1500, "Login by SR"], "isController": false}, {"data": [1.0, 500, 1500, "Get OS user Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get user key gen result-0"], "isController": false}, {"data": [1.0, 500, 1500, "Login by SR OS-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR DID-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get user keys-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 9011, 2, 0.02219509488403063, 341.50049938963525, 0, 107051, 220.0, 685.0, 2051.0, 2520.879999999999, 11.0983567387015, 103.3310153061193, 3.8551848268676054], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Invite user-0", 50, 0, 0.0, 0.5800000000000001, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.10203769272369213, 0.4293495001428528, 0.0], "isController": false}, {"data": ["Agree terms", 100, 0, 0.0, 261.9500000000001, 226, 578, 251.0, 302.8, 340.24999999999983, 576.2599999999991, 0.15378700499807768, 1.206546160130719, 0.10097078046905036], "isController": false}, {"data": ["Link SR profile", 50, 0, 0.0, 262.3, 223, 523, 245.0, 315.2, 407.34999999999997, 523.0, 0.10202395114277028, 0.6934739327529531, 0.13147938172465368], "isController": false}, {"data": ["Invite sr-0", 50, 0, 0.0, 0.7400000000000001, 0, 8, 1.0, 1.0, 1.4499999999999957, 8.0, 0.10203186251002463, 0.4236653881649161, 0.0], "isController": false}, {"data": ["Link user profile-0", 50, 0, 0.0, 0.8999999999999997, 0, 2, 1.0, 1.8999999999999986, 2.0, 2.0, 0.08450870862242355, 1.0068139767896833, 0.0], "isController": false}, {"data": ["Import Policy-0", 50, 0, 0.0, 0.8800000000000003, 0, 4, 1.0, 2.0, 2.4499999999999957, 4.0, 0.08394487172384152, 1.0206696277170857, 0.0], "isController": false}, {"data": ["Get Admin Access Token", 101, 0, 0.0, 484.67326732673257, 221, 1201, 291.0, 740.6, 763.8, 1197.2400000000007, 0.204985407474458, 0.9372239483335295, 0.17000128940387807], "isController": false}, {"data": ["Agree terms-0", 100, 0, 0.0, 0.7699999999999998, 0, 8, 1.0, 1.0, 2.0, 7.949999999999974, 0.15384378701866125, 1.1728876046137753, 0.0], "isController": false}, {"data": ["Import Policy", 50, 0, 0.0, 277.46000000000004, 235, 443, 265.5, 341.7, 415.99999999999983, 443.0, 0.08390782222281891, 1.049144405047391, 0.06700662357860149], "isController": false}, {"data": ["Invite sr", 50, 0, 0.0, 332.80000000000007, 252, 459, 336.0, 402.4, 417.79999999999995, 459.0, 0.10196132810747541, 0.4537418501035927, 0.08015514563136493], "isController": false}, {"data": ["Generate user keys", 50, 0, 0.0, 2056.62, 2033, 2097, 2056.0, 2070.0, 2076.25, 2097.0, 0.0842255627952106, 0.6735412974779498, 0.06027556340584593], "isController": false}, {"data": ["Get OS user Access Token", 50, 0, 0.0, 2055.560000000001, 2023, 2120, 2055.0, 2065.0, 2071.9, 2120.0, 0.08422286718222291, 0.6603648529342404, 0.06882751925334743], "isController": false}, {"data": ["Generate sr keys", 50, 0, 0.0, 2056.84, 2038, 2079, 2055.5, 2068.0, 2072.25, 2079.0, 0.10162725561693842, 0.5770602004292735, 0.07421767021040906], "isController": false}, {"data": ["Get policy id", 49, 0, 0.0, 297.30612244897964, 230, 790, 257.0, 384.0, 628.5, 790.0, 0.08031786203686099, 1.5969818079018023, 0.06021758713258676], "isController": false}, {"data": ["Tenant creation flow", 1, 0, 0.0, 1661.0, 1661, 1661, 1661.0, 1661.0, 1661.0, 1661.0, 0.6020469596628537, 11.238993829018662, 1.4827758127633954], "isController": true}, {"data": ["Generate sr keys-0", 50, 0, 0.0, 0.3000000000000001, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.10205831203716556, 0.5462192753451612, 0.0], "isController": false}, {"data": ["Get OS SR Access Token", 50, 0, 0.0, 2057.8599999999988, 2038, 2106, 2057.0, 2069.9, 2075.8, 2106.0, 0.10161486340930061, 0.5615114302749292, 0.08254421453234809], "isController": false}, {"data": ["Dry Run Policy", 49, 0, 0.0, 11827.673469387753, 8552, 28371, 10634.0, 15508.0, 19294.5, 28371.0, 0.07767236528203786, 2.845429949730921, 0.06126822675178924], "isController": false}, {"data": ["Invite and accept user", 50, 0, 0.0, 1152.3, 1013, 1953, 1087.0, 1353.5, 1508.8999999999999, 1953.0, 0.10179671196620349, 1.4656638895251184, 0.2664031881457729], "isController": true}, {"data": ["Get SR link result", 1721, 0, 0.0, 278.958163858222, 220, 1520, 249.0, 304.0, 546.6999999999982, 746.78, 2.7242866753729866, 21.487383256163678, 1.74502509250465], "isController": false}, {"data": ["Get User Access Token", 50, 0, 0.0, 251.57999999999998, 224, 373, 243.0, 283.2, 343.09999999999985, 373.0, 0.08447886676668964, 0.7580493312230512, 0.05550690540816809], "isController": false}, {"data": ["Accept user", 50, 0, 0.0, 611.9199999999998, 528, 1273, 559.0, 774.3, 1003.9999999999999, 1273.0, 0.1019189296066337, 0.5186319906193817, 0.08727007407977398], "isController": false}, {"data": ["Login by user", 50, 0, 0.0, 846.0799999999999, 549, 1760, 671.0, 1474.2999999999997, 1647.6, 1760.0, 0.08443492768992793, 0.7285546893470141, 0.03156579982251778], "isController": false}, {"data": ["Get SR DID", 50, 0, 0.0, 268.87999999999994, 227, 385, 259.0, 328.9, 365.0, 385.0, 0.08447501313586454, 1.0170445102012027, 0.05170959739631115], "isController": false}, {"data": ["Link user profile", 50, 0, 0.0, 252.66000000000003, 220, 396, 246.0, 301.4, 309.25, 396.0, 0.08447144527264003, 1.0346646657845031, 0.07552770103781617], "isController": false}, {"data": ["Get key gen result", 50, 0, 0.0, 2059.679999999999, 2046, 2071, 2059.0, 2068.0, 2069.0, 2071.0, 0.10165721593415865, 0.628765764492761, 0.07642359176800197], "isController": false}, {"data": ["Invite user", 50, 0, 0.0, 295.72000000000014, 234, 441, 273.5, 371.7, 402.3499999999999, 441.0, 0.10196527878326872, 0.4594153177085139, 0.07707141189282225], "isController": false}, {"data": ["Login by SR-0", 149, 0, 0.0, 1.0469798657718126, 0, 21, 1.0, 2.0, 2.0, 11.5, 0.1933748981212785, 1.9334498746956617, 0.0], "isController": false}, {"data": ["User creation flow", 50, 0, 0.0, 39995.72, 31998, 46546, 41031.0, 44735.6, 46016.549999999996, 46546.0, 0.09410843550372482, 53.73615378177101, 4.318529498053837], "isController": true}, {"data": ["Setup ipfs", 1, 0, 0.0, 263.0, 263, 263, 263.0, 263.0, 263.0, 263.0, 3.802281368821293, 18.265060598859314, 2.692044914448669], "isController": false}, {"data": ["Requests for DryRun", 49, 0, 0.0, 12886.346938775507, 9438, 29226, 11600.0, 17268.0, 20223.5, 29226.0, 0.07743583098128581, 4.855340496904937, 0.2121799796375371], "isController": true}, {"data": ["Get user link result", 383, 0, 0.0, 287.0078328981721, 223, 1486, 248.0, 315.0, 712.5999999999997, 798.7199999999995, 0.6359675341064572, 8.38675861472406, 0.39802293540944356], "isController": false}, {"data": ["Generate user keys-0", 50, 0, 0.0, 0.7400000000000001, 0, 10, 1.0, 1.0, 1.0, 10.0, 0.08451813674696454, 0.6483135356641181, 0.0], "isController": false}, {"data": ["Link user", 50, 0, 0.0, 27446.000000000004, 11527, 48421, 28241.5, 38262.5, 43399.14999999999, 48421.0, 0.08236268904296203, 0.0, 0.0], "isController": true}, {"data": ["Login by Admin-0", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["User creation(SR side)", 50, 0, 0.0, 22081.02, 15367, 28237, 22901.5, 26662.899999999998, 27066.899999999998, 28237.0, 0.09716681014965632, 32.58180397834929, 2.8209384819920755], "isController": true}, {"data": ["Get OS SR Access Token-0", 50, 0, 0.0, 0.34, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.10205143800681295, 0.4917882715854099, 0.0], "isController": false}, {"data": ["Get user keys", 50, 0, 0.0, 2054.1199999999994, 2032, 2153, 2053.0, 2067.8, 2072.35, 2153.0, 0.08422315092283307, 0.7182688489306187, 0.06208331912067662], "isController": false}, {"data": ["Get policy id-0", 49, 0, 0.0, 1.3469387755102042, 0, 14, 1.0, 2.0, 2.0, 14.0, 0.08035105210683738, 0.9857448368299707, 0.0], "isController": false}, {"data": ["Requests for Import", 50, 1, 2.0, 147121.70000000004, 84191, 200263, 146463.0, 188538.2, 199277.85, 200263.0, 0.07136658445236138, 20.275869706651225, 0.9832991152862942], "isController": true}, {"data": ["Setup ipfs-0", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 4589.84375, 0.0], "isController": false}, {"data": ["User creation(user side)", 50, 0, 0.0, 15099.18, 13255, 16973, 15014.0, 16109.2, 16731.949999999997, 16973.0, 0.0825412128275648, 16.963870060321117, 0.9855678752901323], "isController": true}, {"data": ["Get policy import result-0", 701, 0, 0.0, 1.175463623395152, 0, 31, 1.0, 2.0, 2.8999999999999773, 4.0, 1.0174770922507725, 12.619498958301584, 0.0], "isController": false}, {"data": ["Get Admin Access Token-0", 101, 0, 0.0, 0.4356435643564357, 0, 2, 0.0, 1.0, 1.0, 1.980000000000004, 0.2051048776376792, 0.8155885672307389, 0.0], "isController": false}, {"data": ["Accept sr-0", 50, 0, 0.0, 0.5199999999999999, 0, 2, 0.0, 1.0, 1.4499999999999957, 2.0, 0.10202811486733285, 0.429335104456384, 0.0], "isController": false}, {"data": ["Get user link result-0", 383, 0, 0.0, 0.9060052219321146, 0, 6, 1.0, 2.0, 2.0, 3.159999999999968, 0.6362083972863968, 7.808663529955781, 0.0], "isController": false}, {"data": ["Login by SR OS", 50, 0, 0.0, 2521.44, 2478, 2640, 2509.5, 2576.1, 2606.35, 2640.0, 0.10151109414747937, 0.5110806020927527, 0.03279482438073157], "isController": false}, {"data": ["Create new tenant-0", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Get sr keys", 50, 0, 0.0, 2056.78, 2038, 2097, 2057.0, 2065.0, 2081.0, 2097.0, 0.10167292632983103, 0.6312458949555994, 0.07643540248752981], "isController": false}, {"data": ["Get SR Access Token-0", 149, 0, 0.0, 0.979865771812081, 0, 20, 1.0, 2.0, 2.0, 11.5, 0.19336410720936661, 1.9580485761620987, 0.0], "isController": false}, {"data": ["Verify link-0", 100, 0, 0.0, 0.77, 0, 3, 1.0, 2.0, 2.0, 3.0, 0.16106042181724475, 1.5010469556560393, 0.0], "isController": false}, {"data": ["Dry Run Policy-0", 49, 0, 0.0, 1.5306122448979593, 0, 15, 1.0, 2.0, 3.5, 15.0, 0.07888187358938281, 0.9718005979930198, 0.0], "isController": false}, {"data": ["Policy import and dry run", 49, 0, 0.0, 160825.81632653056, 95791, 217722, 158151.0, 202663.0, 216036.5, 217722.0, 0.06772005909611688, 23.572739020280775, 1.123791814545163], "isController": true}, {"data": ["Invite and accept SR", 50, 0, 0.0, 1663.2200000000003, 1495, 2357, 1620.5, 1936.6999999999998, 2100.5499999999997, 2357.0, 0.10170767180968461, 1.6035565265812999, 0.23388990208093896], "isController": true}, {"data": ["Link SR", 50, 0, 0.0, 115110.38000000002, 40993, 177262, 122132.5, 163021.8, 171447.34999999998, 177262.0, 0.07858360903082835, 0.0, 0.0], "isController": true}, {"data": ["Get key gen result-0", 50, 0, 0.0, 0.26, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.1020864427162344, 0.5584447436711509, 0.0], "isController": false}, {"data": ["Accept sr", 50, 0, 0.0, 601.8000000000003, 529, 1364, 559.5, 747.3999999999999, 957.3499999999995, 1364.0, 0.1019185141095991, 0.7112220278268119, 0.08726971830232293], "isController": false}, {"data": ["User creation(admin side)", 50, 0, 0.0, 2815.5199999999995, 2508, 4310, 2722.0, 3190.9, 3326.2999999999997, 4310.0, 0.10147751258321155, 3.0609958337138736, 0.49892846089056664], "isController": true}, {"data": ["Login by user OS-0", 50, 0, 0.0, 0.45999999999999996, 0, 2, 0.0, 1.0, 1.0, 2.0, 0.08451585094784526, 0.5569578070460864, 0.0], "isController": false}, {"data": ["Get policy import result", 701, 1, 0.14265335235378032, 349.670470756063, 227, 1091, 269.0, 727.8000000000001, 750.9, 825.96, 1.017113921112006, 16.438685185739367, 0.7626271505756632], "isController": false}, {"data": ["Create new tenant", 1, 0, 0.0, 325.0, 325, 325, 325.0, 325.0, 325.0, 325.0, 3.076923076923077, 15.736177884615383, 2.2866586538461537], "isController": false}, {"data": ["Get user key gen result", 50, 0, 0.0, 2057.2599999999998, 2023, 2071, 2058.0, 2067.8, 2070.45, 2071.0, 0.084224711530363, 0.7161387049397794, 0.06208446948959825], "isController": false}, {"data": ["Login by user-0", 50, 0, 0.0, 0.8999999999999999, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.08451370812345763, 0.6761129663043846, 0.0], "isController": false}, {"data": ["Get User Access Token-0", 50, 0, 0.0, 0.7200000000000001, 0, 2, 1.0, 1.0, 2.0, 2.0, 0.08451085119329323, 0.7088331137811845, 0.0], "isController": false}, {"data": ["Link SR profile-0", 50, 0, 0.0, 0.72, 0, 4, 1.0, 1.0, 2.0, 4.0, 0.1020733131364271, 0.6596188818532023, 0.0], "isController": false}, {"data": ["Accept user-0", 50, 0, 0.0, 0.4600000000000001, 0, 2, 0.0, 1.0, 1.0, 2.0, 0.1020304050607081, 0.4354207319406183, 0.0], "isController": false}, {"data": ["Get sr keys-0", 50, 0, 0.0, 1.2200000000000002, 0, 31, 0.0, 1.0, 6.399999999999949, 31.0, 0.10210061811714208, 0.5609152707810493, 0.0], "isController": false}, {"data": ["Login by user OS", 50, 0, 0.0, 2537.92, 2474, 2696, 2517.5, 2649.7, 2680.95, 2696.0, 0.08414845133190169, 0.6184401680318351, 0.027514242651315746], "isController": false}, {"data": ["Get SR link result-0", 1721, 0, 0.0, 0.6647298082510177, 0, 19, 1.0, 1.0, 1.0, 2.0, 2.725347952980226, 18.011532128344726, 0.0], "isController": false}, {"data": ["Generate user hedera data", 50, 0, 0.0, 13780.320000000003, 13687, 13980, 13758.0, 13884.0, 13939.4, 13980.0, 0.08258606706979679, 0.0, 0.0], "isController": true}, {"data": ["Verify link", 100, 0, 0.0, 256.01, 220, 382, 249.0, 286.8, 312.5499999999999, 381.7399999999999, 0.16099818877037633, 1.7829936229623666, 0.10193197826524451], "isController": false}, {"data": ["Login by Admin", 1, 0, 0.0, 785.0, 785, 785, 785.0, 785.0, 785.0, 785.0, 1.2738853503184713, 5.145302547770701, 0.4515824044585987], "isController": false}, {"data": ["Get SR Access Token", 149, 0, 0.0, 261.3288590604027, 220, 731, 247.0, 297.0, 319.5, 698.0, 0.1933081643508608, 2.0875839945867227, 0.1786506680645831], "isController": false}, {"data": ["Generate sr hedera data", 50, 0, 0.0, 13775.58, 13686, 14103, 13766.0, 13830.5, 13889.2, 14103.0, 0.09924849043046055, 0.0, 0.0], "isController": true}, {"data": ["Login by SR", 149, 0, 0.0, 809.0872483221481, 538, 2540, 629.0, 1572.0, 1976.5, 2499.5, 0.193236464369271, 2.065559199093215, 0.12404794161016554], "isController": false}, {"data": ["Get OS user Access Token-0", 50, 0, 0.0, 0.46, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.08451585094784526, 0.6041595796604153, 0.0], "isController": false}, {"data": ["Get user key gen result-0", 50, 0, 0.0, 0.54, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.08451599380666797, 0.6581996651265035, 0.0], "isController": false}, {"data": ["Login by SR OS-0", 50, 0, 0.0, 0.36, 0, 9, 0.0, 1.0, 1.0, 9.0, 0.10204081632653061, 0.43545918367346936, 0.0], "isController": false}, {"data": ["Get SR DID-0", 50, 0, 0.0, 0.94, 0, 9, 1.0, 1.0, 2.0, 9.0, 0.08450799445627558, 0.7424522477013826, 0.0], "isController": false}, {"data": ["Get user keys-0", 50, 0, 0.0, 0.4, 0, 2, 0.0, 1.0, 1.0, 2.0, 0.08451427953266984, 0.6603371369689123, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Assertion failed", 1, 50.0, 0.011097547442015314], "isController": false}, {"data": ["Failed that JSONPath not exists: $..error.code", 1, 50.0, 0.011097547442015314], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 9011, 2, "Assertion failed", 1, "Failed that JSONPath not exists: $..error.code", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Requests for Import", 1, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Get policy import result", 701, 1, "Failed that JSONPath not exists: $..error.code", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
