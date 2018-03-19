//景點資訊
var viewPoint = [
    { name: "東隆宮", dis: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?1", address: "", latlon: { lat: 22.4630759, lng: 120.4487658 } },
    { name: "大鵬灣", dis: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?2", address: "", latlon: { lat: 22.4570111, lng: 120.4789281 } },
    { name: "共和新村", dis: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?3", address: "", latlon: { lat: 22.4632983, lng: 120.4527705 } },
    { name: "華僑市場", dis: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?4", address: "", latlon: { lat: 22.468127, lng: 120.444315 } },
    { name: "大潭濕地", dis: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?5", address: "", latlon: { lat: 22.454527, lng: 120.486249 } },
    { name: "右岸濕地", dis: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?6", address: "", latlon: { lat: 22.442631, lng: 120.491319 } },
    { name: "蚵殼島", dis: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?7", address: "", latlon: { lat: 22.442405, lng: 120.470552 } },
    { name: "落日灣", dis: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?8", address: "", latlon: { lat: 22.457146, lng: 120.4778468 } },
    { name: "映霞橋亭", dis: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?9", address: "", latlon: { lat: 22.441956, lng: 120.49214 } }
];
//經緯度陣列
var destination = [];
for (var i = 0; i < viewPoint.length; i++) {
    destination.push(viewPoint[i].latlon);
}
//HTMLID
var listElement = [
    { title: "listTitle0", dis: "listDis0", add: "listAdd0", listLink: "listLink0" },
    { title: "listTitle1", dis: "listDis1", add: "listAdd1", listLink: "listLink1" },
    { title: "listTitle2", dis: "listDis2", add: "listAdd2", listLink: "listLink2" },
    { title: "listTitle3", dis: "listDis3", add: "listAdd3", listLink: "listLink3" },
    { title: "listTitle4", dis: "listDis4", add: "listAdd4", listLink: "listLink4" },
    { title: "listTitle5", dis: "listDis5", add: "listAdd5", listLink: "listLink5" },
    { title: "listTitle6", dis: "listDis6", add: "listAdd6", listLink: "listLink6" },
    { title: "listTitle7", dis: "listDis7", add: "listAdd7", listLink: "listLink7" },
    { title: "listTitle8", dis: "listDis8", add: "listAdd8", listLink: "listLink8" }
];
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:none;');

        console.log('Received Event: ' + id);
        navigator.geolocation.getCurrentPosition(positioning.onSuccess, positioning.onError, { maximumAge: 2000, timeout: 3000, enableHighAccuracy: true }); /*3秒*/
    }
};
var positioning = {
    //定位成功
    onSuccess: function(position) {
        var myLatlon = { lat: position.coords.latitude, lng: position.coords.longitude };
        positioning.calculateDistance(myLatlon, destination);
    },
    onError: function(error) {
        swal({
                title: "定位超時",
                text: "警告，本程式需要GPS定位功能及相關權限，請確認您有開啟GPS定位功能並處於定位狀況良好之環境",
                type: "error",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "確定",
                closeOnConfirm: false
            },
            function() {
                history.go(-1);
            });

    },
    //計算距離
    calculateDistance: function(myLatlon, destination) {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [myLatlon],
            destinations: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
                //callback
        }, function(response, status) {
            //距離服務狀態檢測
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                console.log('Error was: ' + status);
            } else {
                //服務正常
                var originList = response.originAddresses; /*創建地址起點陣列*/
                var destinationList = response.destinationAddresses; /*創建地址終點陣列*/
                //起點配對資料儲存進results
                for (var i = 0; i < originList.length; i++) {
                    var results = response.rows[i].elements;
                    //終點資料存進dis陣列
                    for (var j = 0; j < results.length; j++) {
                        //results[j].distance.text為距離
                        //results[j].duration.text為時間
                        viewPoint[j].dis = results[j].distance.text;
                        viewPoint[j].address = destinationList[j];
                        console.log("地址:" + destinationList[j] + "距離:" + results[j].distance.text);
                        //距離轉換純數字型態(公尺)
                        if (viewPoint[j].dis.search("公尺") == -1) { //判斷距離為公里
                            viewPoint[j].dis = viewPoint[j].dis.replace(/公里/g, "");
                            viewPoint[j].dis *= 1000;
                        } else {
                            viewPoint[j].dis = viewPoint[j].dis.replace(/公尺/g, "");
                            viewPoint[j].dis *= 1;
                        }
                    }
                }
            }
            //計算距離完畢
            //依距離排序
            viewPoint = viewPoint.sort(function(a, b) {
                return a.dis > b.dis ? 1 : -1;
            });
            //將排序完結果插入
            for (var i = 0; i < listElement.length; i++) {
                document.getElementById(listElement[i].title).innerHTML = viewPoint[i].name;

                if (viewPoint[i].dis > 1000) {
                    document.getElementById(listElement[i].dis).innerHTML = viewPoint[i].dis / 1000 + "公里";
                } else {
                    document.getElementById(listElement[i].dis).innerHTML = viewPoint[i].dis + "公尺";
                }
                viewPoint[i].address = viewPoint[i].address.replace(/928台灣/g, "");
                viewPoint[i].address = viewPoint[i].address.replace(/927台灣/g, "");
                document.getElementById(listElement[i].add).innerHTML = viewPoint[i].address;
                document.getElementById(listElement[i].listLink).href = viewPoint[i].url;
            }

        });
        $("#spinner").fadeOut("slow");
    }
}
app.initialize();