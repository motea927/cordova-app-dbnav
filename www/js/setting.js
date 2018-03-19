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
        dis.loadDis();
    }
};





var dis = {

    setDis: function() {
        var disLimit = document.getElementById("dis").value;
        NativeStorage.putDouble("distance", disLimit, this.setSuccess, this.setError);
        console.log(disLimit);
    },
    setSuccess: function(disGG) {
        swal({
                title: "設置成功!",
                text: "成功設置行動導覽距離為" + Math.round(disGG),
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "確定",
                closeOnConfirm: false
            },
            function() {
                history.go(-1);

            });
        document.getElementById("dis").value = Math.round(disGG);
    },
    setError: function(error) {
        //alert("error:"+error.code);
        //if (error.exception !== "") alert(error.exception);
    },
    getSuccess: function(getGG) { //如果讀取尚未設置則設定為200
        if (getGG === -1 || getGG <= 0) {

            document.getElementById("dis").value = 200;
            NativeStorage.putDouble("distance", 200, this.setSuccess, this.setError);
        } else {
            document.getElementById("dis").value = getGG;

        }

    },
    getError: function(error) {
        //alert("get"+error.code);
        //if (error.exception !== "") alert(error.exception);

    },
    loadDis: function() {
        NativeStorage.getDouble("distance", this.getSuccess, this.getError);
    }
};

function saveSetting() {
    dis.setDis();
}


app.initialize();