$(document).ready(function() {
    //arr[i][0]=siteID 
    //[i][1]名稱
    //[i][2]分數
    //[i][3]網址
    var arr = []; //將要處理的偉大陣列
    var listElement = [ //宣告列表對象儲存htmlID,以利之後插入內容
        { title: "listTitle0", listLink: "listLink0", star: "#star0", img: "#img0" },
        { title: "listTitle1", listLink: "listLink1", star: "#star1", img: "#img1" },
        { title: "listTitle2", listLink: "listLink2", star: "#star2", img: "#img2" },
        { title: "listTitle3", listLink: "listLink3", star: "#star3", img: "#img3" },
        { title: "listTitle4", listLink: "listLink4", star: "#star4", img: "#img4" },
        { title: "listTitle5", listLink: "listLink5", star: "#star5", img: "#img5" },
        { title: "listTitle6", listLink: "listLink6", star: "#star6", img: "#img6" },
        { title: "listTitle7", listLink: "listLink7", star: "#star7", img: "#img7" },
        { title: "listTitle8", listLink: "listLink8", star: "#star8", img: "#img8" }
    ];
    $.ajax({
        url: "https://1031241139.000webhostapp.com/rank.php",
        type: "GET",
        dataType: "json",
        success: function(Jdata) {
            //alert("SiteId="+Jdata[0].siteId+"score="+Jdata[0].score);
            for (var i = 0; i < Jdata.length; i++) {
                arr[i] = [];
                arr[i][0] = Jdata[i].siteId;
                arr[i][1] = name(Jdata[i].siteId);
                arr[i][2] = Jdata[i].score;
                arr[i][3] = url(Jdata[i].siteId);
                arr[i][4] = img(Jdata[i].siteId);
            }
            arr = arr.sort(function(a, b) {
                return a[2] < b[2] ? 1 : -1;
            });
            for (var j = 0; j < arr.length; j++) {

                document.getElementById(listElement[j].title).innerHTML = arr[j][1];
                //document.getElementById(listElement[j].dis).innerHTML = arr[j][2]+"顆星";
                document.getElementById(listElement[j].listLink).href = arr[j][3];
                $(listElement[j].img).attr("src", arr[j][4]);
                $(listElement[j].img).show();
                $(listElement[j].star).starRating({
                    initialRating: arr[j][2],
                    starShape: 'rounded',
                    starSize: 25,
                    readOnly: true
                });
            }
            $("#spinner").hide();
        }
    });

    function name(id) {
        switch (id) {
            case 1:
                return "東隆宮";
            case 2:
                return "大鵬灣";
            case 3:
                return "共和新村";
            case 4:
                return "華僑市場";
            case 5:
                return "大潭濕地";
            case 6:
                return "右岸濕地";
            case 7:
                return "蚵殼島";
            case 8:
                return "落日灣";
            case 9:
                return "映霞橋亭";
        }
    }

    function url(id) {
        switch (id) {
            case 1:
                return "https://1031241139.000webhostapp.com/viewpoint.php?1";
            case 2:
                return "https://1031241139.000webhostapp.com/viewpoint.php?2";
            case 3:
                return "https://1031241139.000webhostapp.com/viewpoint.php?3";
            case 4:
                return "https://1031241139.000webhostapp.com/viewpoint.php?4";
            case 5:
                return "https://1031241139.000webhostapp.com/viewpoint.php?5";
            case 6:
                return "https://1031241139.000webhostapp.com/viewpoint.php?6";
            case 7:
                return "https://1031241139.000webhostapp.com/viewpoint.php?7";
            case 8:
                return "https://1031241139.000webhostapp.com/viewpoint.php?8";
            case 9:
                return "https://1031241139.000webhostapp.com/viewpoint.php?9";
        }
    }

    function img(id) {
        switch (id) {
            case 1:
                return "img/topimg/temple.png";
            case 2:
                return "img/topimg/bigpon.png";
            case 3:
                return "img/topimg/newcity.png";
            case 4:
                return "img/topimg/market.png";
            case 5:
                return "img/topimg/wetfloor.png";
            case 6:
                return "img/topimg/right.png";
            case 7:
                return "img/topimg/shell.png";
            case 8:
                return "img/topimg/sunset.png";
            case 9:
                return "img/topimg/bridge.png";
        }
    }
    $("#backbutton").click(function() {
        history.go(-1);
    });
});