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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7978303747534516, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Get policy id-0"], "isController": false}, {"data": [0.0, 500, 1500, "Dry Run Policy"], "isController": false}, {"data": [0.0, 500, 1500, "Requests for Import"], "isController": true}, {"data": [0.9875, 500, 1500, "Get policy import result"], "isController": false}, {"data": [1.0, 500, 1500, "Get Admin Access Token"], "isController": false}, {"data": [1.0, 500, 1500, "Import Policy i-Rec"], "isController": false}, {"data": [1.0, 500, 1500, "Get policy import result-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get Admin Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Login by SR-0"], "isController": false}, {"data": [0.5, 500, 1500, "Login by Admin"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR Access Token"], "isController": false}, {"data": [0.0, 500, 1500, "Requests for DryRun"], "isController": true}, {"data": [1.0, 500, 1500, "Get SR Access Token-0"], "isController": false}, {"data": [0.5, 500, 1500, "Get tenant"], "isController": true}, {"data": [1.0, 500, 1500, "Import Policy i-Rec-0"], "isController": false}, {"data": [0.5, 500, 1500, "Login by SR"], "isController": false}, {"data": [0.975, 500, 1500, "Get policy id"], "isController": false}, {"data": [1.0, 500, 1500, "Get Tenant Id"], "isController": false}, {"data": [1.0, 500, 1500, "Dry Run Policy-0"], "isController": false}, {"data": [0.0, 500, 1500, "Policy import and dry run"], "isController": true}, {"data": [1.0, 500, 1500, "Get Tenant Id-0"], "isController": false}, {"data": [1.0, 500, 1500, "Login by Admin-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 446, 0, 0.0, 502.699551569507, 0, 9108, 112.5, 660.6000000000006, 1247.2499999999995, 7447.95, 1.8256690708736194, 11.194799158493455, 0.6869404475242945], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Get policy id-0", 20, 0, 0.0, 0.6500000000000001, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.10515357679891481, 0.5047371686347911, 0.0], "isController": false}, {"data": ["Dry Run Policy", 20, 0, 0.0, 7360.900000000001, 6638, 9108, 7276.0, 7899.900000000001, 9049.849999999999, 9108.0, 0.10035324341682723, 1.82325379084377, 0.0791261804050257], "isController": false}, {"data": ["Requests for Import", 20, 0, 0.0, 43013.149999999994, 42810, 43749, 42941.5, 43329.8, 43728.4, 43749.0, 0.08579125272387227, 4.721903632830597, 0.4775908556176112], "isController": true}, {"data": ["Get policy import result", 80, 0, 0.0, 273.36249999999995, 241, 711, 258.0, 305.80000000000007, 336.20000000000005, 711.0, 0.3615345333267052, 2.804827453407237, 0.27093906335440776], "isController": false}, {"data": ["Get Admin Access Token", 1, 0, 0.0, 236.0, 236, 236, 236.0, 236.0, 236.0, 236.0, 4.237288135593221, 19.961599576271187, 2.7848583156779663], "isController": false}, {"data": ["Import Policy i-Rec", 20, 0, 0.0, 252.85, 234, 310, 243.5, 288.1, 308.95, 310.0, 0.10505801829060099, 0.5236536897032636, 0.08386174233470434], "isController": false}, {"data": ["Get policy import result-0", 80, 0, 0.0, 0.7000000000000001, 0, 2, 1.0, 1.0, 1.0, 2.0, 0.36193035555133307, 1.741418716097305, 0.0], "isController": false}, {"data": ["Get Admin Access Token-0", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 4115.234375, 0.0], "isController": false}, {"data": ["Login by SR-0", 40, 0, 0.0, 0.625, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.171928391824805, 0.7386708592121382, 0.0], "isController": false}, {"data": ["Login by Admin", 1, 0, 0.0, 734.0, 734, 734, 734.0, 734.0, 734.0, 734.0, 1.3623978201634876, 5.5028099455040875, 0.4829593835149864], "isController": false}, {"data": ["Get SR Access Token", 40, 0, 0.0, 242.15, 225, 281, 238.0, 269.3, 270.95, 281.0, 0.17174679370204507, 0.8923914761529577, 0.15182986816286748], "isController": false}, {"data": ["Requests for DryRun", 20, 0, 0.0, 8209.85, 7483, 9930, 8130.0, 8777.900000000001, 9874.9, 9930.0, 0.09993753903810118, 2.9280381402248596, 0.27368636789506556], "isController": true}, {"data": ["Get SR Access Token-0", 40, 0, 0.0, 0.7999999999999998, 0, 2, 1.0, 1.0, 1.9499999999999957, 2.0, 0.17195426016679563, 0.7714894127224659, 0.0], "isController": false}, {"data": ["Get tenant", 1, 0, 0.0, 1226.0, 1226, 1226, 1226.0, 1226.0, 1226.0, 1226.0, 0.8156606851549756, 11.375439692088092, 1.3915617353181078], "isController": true}, {"data": ["Import Policy i-Rec-0", 20, 0, 0.0, 0.65, 0, 2, 1.0, 1.0, 1.9499999999999993, 2.0, 0.10519063172233882, 0.48805268637150173, 0.0], "isController": false}, {"data": ["Login by SR", 40, 0, 0.0, 844.925, 556, 1468, 894.0, 1134.3999999999999, 1254.75, 1468.0, 0.17115960633290542, 0.8582216784338896, 0.1030049876979033], "isController": false}, {"data": ["Get policy id", 20, 0, 0.0, 259.7, 223, 540, 240.5, 343.2000000000002, 530.6499999999999, 540.0, 0.10502491716159659, 1.0221673138827185, 0.07870714983379806], "isController": false}, {"data": ["Get Tenant Id", 1, 0, 0.0, 256.0, 256, 256, 256.0, 256.0, 256.0, 256.0, 3.90625, 20.298004150390625, 2.712249755859375], "isController": false}, {"data": ["Dry Run Policy-0", 20, 0, 0.0, 0.7000000000000002, 0, 2, 1.0, 1.0, 1.9499999999999993, 2.0, 0.10413792026159445, 0.5052621379254685, 0.0], "isController": false}, {"data": ["Policy import and dry run", 20, 0, 0.0, 51223.00000000001, 50364, 53055, 51076.0, 52023.7, 53004.8, 53055.0, 0.08228624091765617, 6.939868075869971, 0.6834258024965646], "isController": true}, {"data": ["Get Tenant Id-0", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 4525.390625, 0.0], "isController": false}, {"data": ["Login by Admin-0", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 1702.1484375, 0.0], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 446, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
