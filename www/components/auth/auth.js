/**
 * Created by bvnand01 on 16/06/2017.
 */

app

    .controller("LoginCtrl",function($scope,Auth,$state){
        $scope.user = {};
        $scope.login=function(){
            console.log($scope.user);
            Auth.login($scope.user).then(function (data) {
                $state.go('accueil');
            },function(q){
                console.log(q);
            });
        };

        // printer
        var socketId = null;
        $scope.ip = "";
        $scope.port = null;

        $scope.connect = function (ip, port) {
            console.log(ip + " " + port);
            chrome.sockets.tcp.create(function (createInfo) {
                chrome.sockets.tcp.connect(createInfo.socketId, ip,
                    port ? port : 9100,
                    function (result) {
                        if (!result) {
                            console.log("connect success!");
                            socketId = createInfo.socketId;
                            alert("Connecté");
                        } else {
                            socketId = null;
                            alert("Erreur");
                        }
                    });
            })
        };
        $scope.disconnect = function () {
            if (socketId) {
                chrome.sockets.tcp.disconnect(socketId);
                socketId = null;
            }
        };
        $scope.print = function () {
            print(socketId, "cordova-posprinter-sample");
        };
        $scope.printEscCommand = function () {
            var escCommand = Esc.InitializePrinter +
                Esc.TextAlignRight + "HelloWorld!\n" +
                Esc.TextAlignCenter + "HelloWorld!\n" +
                Esc.TextAlignLeft + "HelloWorld!\n" +
                Esc.BoldOn + "HelloWorld!\n" + Esc.BoldOff +
                Esc.DoubleHeight + "HelloWorld!\n" + Esc.DoubleOff +
                Esc.DoubleWidth + "HelloWorld!\n" + Esc.DoubleOff +
                Esc.DoubleOn + "HelloWorld!\n" + Esc.DoubleOff +
                Esc.PrintAndFeedMaxLine;
            print(socketId, escCommand);
        };


    });