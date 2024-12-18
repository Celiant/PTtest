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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8224, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Get policy id-0"], "isController": false}, {"data": [0.0, 500, 1500, "Dry Run Policy"], "isController": false}, {"data": [0.0, 500, 1500, "Requests for Import"], "isController": true}, {"data": [0.9280575539568345, 500, 1500, "Get policy import result"], "isController": false}, {"data": [1.0, 500, 1500, "Import Policy-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get Admin Access Token"], "isController": false}, {"data": [1.0, 500, 1500, "Get policy import result-0"], "isController": false}, {"data": [1.0, 500, 1500, "Get Admin Access Token-0"], "isController": false}, {"data": [1.0, 500, 1500, "Import Policy"], "isController": false}, {"data": [1.0, 500, 1500, "Login by SR-0"], "isController": false}, {"data": [0.5, 500, 1500, "Login by Admin"], "isController": false}, {"data": [1.0, 500, 1500, "Get SR Access Token"], "isController": false}, {"data": [0.0, 500, 1500, "Requests for DryRun"], "isController": true}, {"data": [1.0, 500, 1500, "Get SR Access Token-0"], "isController": false}, {"data": [0.5, 500, 1500, "Get tenant"], "isController": true}, {"data": [0.5, 500, 1500, "Login by SR"], "isController": false}, {"data": [1.0, 500, 1500, "Get policy id"], "isController": false}, {"data": [1.0, 500, 1500, "Get Tenant Id"], "isController": false}, {"data": [1.0, 500, 1500, "Dry Run Policy-0"], "isController": false}, {"data": [0.0, 500, 1500, "Policy import and dry run"], "isController": true}, {"data": [1.0, 500, 1500, "Get Tenant Id-0"], "isController": false}, {"data": [1.0, 500, 1500, "Login by Admin-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 564, 0, 0.0, 526.9911347517735, 0, 10860, 111.5, 726.5, 1070.75, 10165.35000000001, 2.043026722354842, 14.285830820679127, 0.768144314118981], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Get policy id-0", 20, 0, 0.0, 0.5, 0, 1, 0.5, 1.0, 1.0, 1.0, 0.10514860126073174, 0.5046927492153286, 0.0], "isController": false}, {"data": ["Dry Run Policy", 20, 0, 0.0, 9656.699999999999, 7900, 10860, 9640.0, 10654.7, 10850.4, 10860.0, 0.10022600965176473, 2.9231444250534957, 0.07903564725957032], "isController": false}, {"data": ["Requests for Import", 20, 0, 0.0, 73758.39999999998, 64102, 74445, 74246.0, 74425.4, 74444.2, 74445.0, 0.07563495545101123, 6.8267157966913485, 0.588331375884929], "isController": true}, {"data": ["Get policy import result", 139, 0, 0.0, 335.35971223021596, 242, 784, 267.0, 720.0, 741.0, 782.4, 0.5507829835795346, 5.0363503767315985, 0.41282023547953783], "isController": false}, {"data": ["Import Policy-0", 20, 0, 0.0, 0.4, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.10527313113873946, 0.4884354586881915, 0.0], "isController": false}, {"data": ["Get Admin Access Token", 1, 0, 0.0, 240.0, 240, 240, 240.0, 240.0, 240.0, 240.0, 4.166666666666667, 19.62890625, 2.738444010416667], "isController": false}, {"data": ["Get policy import result-0", 139, 0, 0.0, 0.618705035971223, 0, 2, 1.0, 1.0, 1.0, 2.0, 0.5513881891856511, 2.6558567268367375, 0.0], "isController": false}, {"data": ["Get Admin Access Token-0", 1, 0, 0.0, 1.0, 1, 1, 1.0, 1.0, 1.0, 1.0, 1000.0, 4115.234375, 0.0], "isController": false}, {"data": ["Import Policy", 20, 0, 0.0, 265.99999999999994, 235, 327, 263.0, 294.7, 325.4, 327.0, 0.10510991869747789, 0.5239123833279903, 0.0839134360695197], "isController": false}, {"data": ["Login by SR-0", 40, 0, 0.0, 0.6, 0, 2, 1.0, 1.0, 2.0, 2.0, 0.1515438530024626, 0.6510909973479826, 0.0], "isController": false}, {"data": ["Login by Admin", 1, 0, 0.0, 715.0, 715, 715, 715.0, 715.0, 715.0, 715.0, 1.3986013986013985, 5.649038461538462, 0.4957932692307693], "isController": false}, {"data": ["Get SR Access Token", 40, 0, 0.0, 249.29999999999998, 221, 325, 245.0, 278.6, 309.39999999999986, 325.0, 0.15135806019510054, 0.7864817563873101, 0.13381294130334426], "isController": false}, {"data": ["Requests for DryRun", 20, 0, 0.0, 10625.35, 8876, 12335, 10685.0, 11978.1, 12319.8, 12335.0, 0.09969393960541138, 4.01729094025093, 0.2730484599778679], "isController": true}, {"data": ["Get SR Access Token-0", 40, 0, 0.0, 0.5999999999999998, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.15149793584062418, 0.6797249306423513, 0.0], "isController": false}, {"data": ["Get tenant", 1, 0, 0.0, 1218.0, 1218, 1218, 1218.0, 1218.0, 1218.0, 1218.0, 0.8210180623973727, 11.450956999178983, 1.4007017138752054], "isController": true}, {"data": ["Login by SR", 40, 0, 0.0, 893.4250000000001, 565, 1257, 1012.5, 1159.7, 1231.8499999999997, 1257.0, 0.15094795314575535, 0.756884582836463, 0.09084885109739162], "isController": false}, {"data": ["Get policy id", 20, 0, 0.0, 253.14999999999998, 224, 452, 240.0, 315.60000000000014, 445.4999999999999, 452.0, 0.10502271116128863, 1.3058097251030536, 0.07871575275028225], "isController": false}, {"data": ["Get Tenant Id", 1, 0, 0.0, 263.0, 263, 263, 263.0, 263.0, 263.0, 263.0, 3.802281368821293, 19.76146625475285, 2.6400605988593155], "isController": false}, {"data": ["Dry Run Policy-0", 20, 0, 0.0, 0.5499999999999999, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.10528310627276748, 0.5108184149365143, 0.0], "isController": false}, {"data": ["Policy import and dry run", 20, 0, 0.0, 84383.75000000001, 76437, 86191, 84856.0, 85630.6, 86163.0, 86191.0, 0.07277040573139715, 9.50053889896557, 0.7653577677405153], "isController": true}, {"data": ["Get Tenant Id-0", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}, {"data": ["Login by Admin-0", 1, 0, 0.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, Infinity, Infinity, NaN], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 564, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
