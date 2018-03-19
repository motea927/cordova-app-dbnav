var destination1 = { name: "東隆宮", latlon: { lat: 22.4630759, lng: 120.4487658 }, dis: 0, disId: "templedis", poiId: "templePoi", heading: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?1" }; //羊寶寶
var destination2 = { name: "大鵬灣", latlon: { lat: 22.4570111, lng: 120.4789281 }, dis: 0, disId: "bigpondis", poiId: "bigponPoi", heading: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?2" }; //育粥
var destination3 = { name: "共和新村", latlon: { lat: 22.4632983, lng: 120.4527705 }, dis: 0, disId: "newcitydis", poiId: "newcityPoi", heading: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?3" };
var destination4 = { name: "華僑市場", latlon: { lat: 22.468127, lng: 120.444315 }, dis: 0, disId: "marketdis", poiId: "marketPoi", heading: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?4" };
var destination5 = { name: "大潭濕地", latlon: { lat: 22.454527, lng: 120.486249 }, dis: 0, disId: "bigwetdis", poiId: "bigwetPoi", heading: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?5" };
var destination6 = { name: "右岸濕地", latlon: { lat: 22.442631, lng: 120.491319 }, dis: 0, disId: "rightdis", poiId: "rightPoi", heading: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?6" };
var destination7 = { name: "蚵殼島", latlon: { lat: 22.442405, lng: 120.470552 }, dis: 0, disId: "shelldis", poiId: "shellPoi", heading: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?7" };
var destination8 = { name: "落日灣", latlon: { lat: 22.457146, lng: 120.4778468 }, dis: 0, disId: "sunsetdis", poiId: "sunsetPoi", heading: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?8" };
var destination9 = { name: "映霞橋亭", latlon: { lat: 22.441956, lng: 120.49214 }, dis: 0, disId: "bridgedis", poiId: "bridgePoi", heading: 0, url: "https://1031241139.000webhostapp.com/viewpoint.php?9" };
var destinationArray = [destination1, destination2, destination3, destination4, destination5, destination6, destination7, destination8, destination9];
var gg = [destination1, destination2, destination3, destination4, destination5, destination6, destination7, destination8, destination9];
var destination = [destination1.latlon, destination2.latlon, destination3.latlon, destination4.latlon, destination5.latlon, destination6.latlon, destination7.latlon, destination8.latlon, destination9.latlon];
var disLimit = 0; //提示距離;
var viewName = ""; //偵測最近距離景點
function close() {
    console.log("幹");
}
//定位物件對象
var positioning = {
        //定位成功
        onSuccess: function(position) {
            var latlon = { lat: position.coords.latitude, lng: position.coords.longitude };
            positioning.calculateDistance(latlon, destination);
            positioning.computeHeading(latlon);
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
                    CameraPreview.stopCamera();
                    history.go(-1);
                });

        },
        //計算距離
        calculateDistance: function(latlon, destination) {
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [latlon],
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
                            /*results[j].distance.text為距離*/
                            /*results[j].duration.text為時間*/
                            var dis = [];
                            var address = [];
                            dis[j] = results[j].distance.text;
                            /*console.log("地址:" + destinationList[j] + "距離:" + results[j].distance.text);*/

                            //距離轉純數字
                            if (dis[j].search("公尺") == -1) { //判斷距離為公里
                                dis[j] = dis[j].replace(/公里/g, "");
                                dis[j] *= 1000;
                            } else {
                                dis[j] = dis[j].replace(/公尺/g, "");
                                dis[j] *= 1;
                            }

                            //address[j] = destinationList[j];
                            destinationArray[j].dis = dis[j];
                            //document.getElementById(destinationArray[j].disId).innerHTML = dis[j];
                        }
                    }



                    gg = gg.sort(function(a, b) {
                        return a.dis - b.dis;
                    })
                    var computeTop = 63;
                    //輸出距離
                    for (var i = 0; i < gg.length; i++) {
                        if (gg[i].dis >= 1000) {
                            document.getElementById(gg[i].disId).innerHTML = gg[i].dis / 1000 + "公里";
                        } else {
                            document.getElementById(gg[i].disId).innerHTML = gg[i].dis + "公尺";
                        }
                        document.getElementById(gg[i].poiId).style.top = computeTop + "%";
                        computeTop -= 7;
                    }
                    $('body').loading('stop');
                    //排序完偵測最近符合條件
                    if (gg[0].dis <= disLimit) {
                        if (viewName != gg[0].name) {
                            viewName = gg[0].name;
                            swal({
                                    title: "景點資訊",
                                    text: "景點" + gg[0].name + "，距離約為" + gg[0].dis + "公尺，是否查看導覽資訊",
                                    type: "info",
                                    showCancelButton: true,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "是",
                                    cancelButtonText: "否",
                                    showLoaderOnConfirm: true,
                                    closeOnConfirm: false
                                },
                                function(isConfirm) {

                                    if (isConfirm) {
                                        CameraPreview.stopCamera();
                                        document.location.href = gg[0].url;
                                    }
                                });
                        }
                    }
                }

            });


        }, //計算google方位角
        computeHeading: function(latlon) {
            var myLatLng = new google.maps.LatLng(latlon);
            for (var i = 0; i < destinationArray.length; i++) {
                var googleArray = [];
                googleArray[i] = new google.maps.LatLng(destinationArray[i].latlon);
                destinationArray[i].heading = Math.round(google.maps.geometry.spherical.computeHeading(myLatLng, googleArray[i]));
                //小於零的google方位角轉換為羅盤坐標系
                if (destinationArray[i].heading < 0) {
                    destinationArray[i].heading = 360 + destinationArray[i].heading;
                }
            }
        }


    }
    //方位角演算
    //位移量(displacement)以羅盤三軸方位角-google

var compassHeading = {
    onSuccess: function(heading) {
        /*document.getElementById("heading").innerHTML = "方位角" + Math.round(heading.magneticHeading);*/
        /*document.getElementById("a").innerHTML = "GO方位角" + destination1.heading;*/
        for (var i = 0; i < destinationArray.length; i++) {
            var displacement = 0
            displacement = Math.round(heading.magneticHeading) - destinationArray[i].heading;
            //例外處理
            if (displacement < -180) {
                displacement = 360 + displacement;
            }
            //相減為正在左邊,負在右邊
            displacement = 50 - displacement * 1.3333333;
            displacement = Math.round(displacement);

            document.getElementById(destinationArray[i].poiId).style.left = displacement + "%";

        }
    },
    onError: function() {

    }
}

var disSetting = {


    setSuccess: function(disGG) {

    },
    setError: function(error) {

    },
    getSuccess: function(getGG) {
        if (getGG === -1 || getGG <= 0) { //如果讀取尚未設置則設定為200
            disLimit = 200;
            NativeStorage.putDouble("distance", 200, this.setSuccess, this.setError);

        } else { //若已設置則變更變數
            disLimit = getGG;

        }

    },
    getError: function(error) {


    },
    loadDis: function() {
        NativeStorage.getDouble("distance", this.getSuccess, this.getError);
    }
};


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
        console.log("1");

        let options = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: CameraPreview.CAMERA_DIRECTION.BACK,
            toBack: true,
            tapPhoto: true,
            tapFocus: false,
            previewDrag: false
        };

        CameraPreview.startCamera(options);
        CameraPreview.onBackButton(function() {
            console.log('Back button pushed');
            CameraPreview.stopCamera();
            history.go(-1);
        });

        //監看定位
        var watchID = navigator.geolocation.watchPosition(positioning.onSuccess, positioning.onError, { maximumAge: 2000, timeout: 30000, enableHighAccuracy: true });
        //監看羅盤
        var watchIDheading = navigator.compass.watchHeading(compassHeading.onSuccess, compassHeading.onError);
        //載入景點提示距離
        disSetting.loadDis();

    }
};

app.initialize();