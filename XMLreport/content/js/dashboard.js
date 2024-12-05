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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.78125, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "Enter user name and password"], "isController": false}, {"data": [0.0, 500, 1500, "Login-0"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-2"], "isController": false}, {"data": [0.5, 500, 1500, "Login-1"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-1"], "isController": false}, {"data": [0.0, 500, 1500, "Login-2"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-0"], "isController": false}, {"data": [0.5, 500, 1500, "Login-3"], "isController": false}, {"data": [0.5, 500, 1500, "Login-4"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-6"], "isController": false}, {"data": [0.0, 500, 1500, "Login-5"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-5"], "isController": false}, {"data": [0.5, 500, 1500, "Login-6"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-4"], "isController": false}, {"data": [1.0, 500, 1500, "Login-7"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-3"], "isController": false}, {"data": [1.0, 500, 1500, "Login-8"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-9"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-8"], "isController": false}, {"data": [0.5, 500, 1500, "Logout"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-7"], "isController": false}, {"data": [1.0, 500, 1500, "Enter user name and password-9"], "isController": false}, {"data": [1.0, 500, 1500, "Enter user name and password-4"], "isController": false}, {"data": [1.0, 500, 1500, "Enter user name and password-3"], "isController": false}, {"data": [1.0, 500, 1500, "Enter user name and password-2"], "isController": false}, {"data": [0.0, 500, 1500, "Login"], "isController": false}, {"data": [1.0, 500, 1500, "Enter user name and password-1"], "isController": false}, {"data": [1.0, 500, 1500, "Enter user name and password-8"], "isController": false}, {"data": [1.0, 500, 1500, "Enter user name and password-7"], "isController": false}, {"data": [1.0, 500, 1500, "Enter user name and password-6"], "isController": false}, {"data": [1.0, 500, 1500, "Enter user name and password-5"], "isController": false}, {"data": [1.0, 500, 1500, "Enter user name and password-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 32, 0, 0.0, 627.8437500000001, 220, 3439, 237.5, 1729.3999999999999, 2387.9499999999966, 3439.0, 0.8129461677209562, 56.30044196008942, 1.5728503766227169], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Enter user name and password", 1, 0, 0.0, 1019.0, 1019, 1019, 1019.0, 1019.0, 1019.0, 1019.0, 0.9813542688910696, 10.233301643768401, 11.342116965161924], "isController": false}, {"data": ["Login-0", 1, 0, 0.0, 1546.0, 1546, 1546, 1546.0, 1546.0, 1546.0, 1546.0, 0.646830530401035, 2.345392343143596, 0.32341526520051744], "isController": false}, {"data": ["Logout-2", 1, 0, 0.0, 226.0, 226, 226, 226.0, 226.0, 226.0, 226.0, 4.424778761061947, 3.0679618362831858, 4.727253871681416], "isController": false}, {"data": ["Login-1", 1, 0, 0.0, 874.0, 874, 874, 874.0, 874.0, 874.0, 874.0, 1.1441647597254005, 148.86879648169335, 1.166511727688787], "isController": false}, {"data": ["Logout-1", 1, 0, 0.0, 225.0, 225, 225, 225.0, 225.0, 225.0, 225.0, 4.444444444444445, 16.927083333333332, 4.774305555555555], "isController": false}, {"data": ["Login-2", 1, 0, 0.0, 1822.0, 1822, 1822, 1822.0, 1822.0, 1822.0, 1822.0, 0.5488474204171241, 189.83420948819978, 0.5536712746981339], "isController": false}, {"data": ["Logout-0", 1, 0, 0.0, 241.0, 241, 241, 241.0, 241.0, 241.0, 241.0, 4.149377593360996, 5.940417531120332, 4.327671161825727], "isController": false}, {"data": ["Login-3", 1, 0, 0.0, 1156.0, 1156, 1156, 1156.0, 1156.0, 1156.0, 1156.0, 0.8650519031141869, 24.947116944204154, 0.880257893598616], "isController": false}, {"data": ["Login-4", 1, 0, 0.0, 1365.0, 1365, 1365, 1365.0, 1365.0, 1365.0, 1365.0, 0.7326007326007326, 69.22146863553114, 0.7526327838827839], "isController": false}, {"data": ["Logout-6", 1, 0, 0.0, 297.0, 297, 297, 297.0, 297.0, 297.0, 297.0, 3.3670033670033668, 2.3345433501683504, 3.6530671296296298], "isController": false}, {"data": ["Login-5", 1, 0, 0.0, 1808.0, 1808, 1808, 1808.0, 1808.0, 1808.0, 1808.0, 0.5530973451327433, 254.61652637582964, 0.5730823077986725], "isController": false}, {"data": ["Logout-5", 1, 0, 0.0, 230.0, 230, 230, 230.0, 230.0, 230.0, 230.0, 4.3478260869565215, 3.0146059782608696, 4.679008152173913], "isController": false}, {"data": ["Login-6", 1, 0, 0.0, 919.0, 919, 919, 919.0, 919.0, 919.0, 919.0, 1.088139281828074, 14.359400503264418, 1.1147051822633296], "isController": false}, {"data": ["Logout-4", 1, 0, 0.0, 235.0, 235, 235, 235.0, 235.0, 235.0, 235.0, 4.25531914893617, 2.950465425531915, 4.537898936170213], "isController": false}, {"data": ["Login-7", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 221.0, 4.524886877828055, 9.690504807692308, 4.666289592760181], "isController": false}, {"data": ["Logout-3", 1, 0, 0.0, 235.0, 235, 235, 235.0, 235.0, 235.0, 235.0, 4.25531914893617, 2.950465425531915, 4.5004986702127665], "isController": false}, {"data": ["Login-8", 1, 0, 0.0, 223.0, 223, 223, 223.0, 223.0, 223.0, 223.0, 4.484304932735426, 36.934206838565025, 4.620060257847533], "isController": false}, {"data": ["Logout-9", 1, 0, 0.0, 220.0, 220, 220, 220.0, 220.0, 220.0, 220.0, 4.545454545454545, 3.151633522727273, 4.9050071022727275], "isController": false}, {"data": ["Logout-8", 1, 0, 0.0, 228.0, 228, 228, 228.0, 228.0, 228.0, 228.0, 4.385964912280701, 3.041049890350877, 4.73718475877193], "isController": false}, {"data": ["Logout", 1, 0, 0.0, 930.0, 930, 930, 930.0, 930.0, 930.0, 930.0, 1.075268817204301, 11.599042338709676, 11.508736559139784], "isController": false}, {"data": ["Logout-7", 1, 0, 0.0, 236.0, 236, 236, 236.0, 236.0, 236.0, 236.0, 4.237288135593221, 2.9379634533898304, 4.547636387711865], "isController": false}, {"data": ["Enter user name and password-9", 1, 0, 0.0, 238.0, 238, 238, 238.0, 238.0, 238.0, 238.0, 4.201680672268908, 2.9789259453781516, 4.899225315126051], "isController": false}, {"data": ["Enter user name and password-4", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 2.991495253164557, 4.866330432489452], "isController": false}, {"data": ["Enter user name and password-3", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 2.991495253164557, 4.829245780590718], "isController": false}, {"data": ["Enter user name and password-2", 1, 0, 0.0, 231.0, 231, 231, 231.0, 231.0, 231.0, 231.0, 4.329004329004329, 3.0691964285714284, 5.001183712121212], "isController": false}, {"data": ["Login", 1, 0, 0.0, 3439.0, 3439, 3439, 3439.0, 3439.0, 3439.0, 3439.0, 0.29078220412910727, 316.0402165418726, 2.528442134341378], "isController": false}, {"data": ["Enter user name and password-1", 1, 0, 0.0, 230.0, 230, 230, 230.0, 230.0, 230.0, 230.0, 4.3478260869565215, 14.279042119565217, 5.001698369565217], "isController": false}, {"data": ["Enter user name and password-8", 1, 0, 0.0, 238.0, 238, 238, 238.0, 238.0, 238.0, 238.0, 4.201680672268908, 2.9789259453781516, 4.903328518907563], "isController": false}, {"data": ["Enter user name and password-7", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 2.991495253164557, 4.895174050632912], "isController": false}, {"data": ["Enter user name and password-6", 1, 0, 0.0, 239.0, 239, 239, 239.0, 239.0, 239.0, 239.0, 4.184100418410042, 2.966461820083682, 4.903242677824268], "isController": false}, {"data": ["Enter user name and password-5", 1, 0, 0.0, 231.0, 231, 231, 231.0, 231.0, 231.0, 231.0, 4.329004329004329, 3.0691964285714284, 5.035004058441558], "isController": false}, {"data": ["Enter user name and password-0", 1, 0, 0.0, 278.0, 278, 278, 278.0, 278.0, 278.0, 278.0, 3.5971223021582737, 5.293811825539568, 4.050275404676259], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 32, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
