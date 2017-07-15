/**
 * Created by Ets Simon on 03/06/2017.
 */

app
    .controller("AgendaCtrl",function($scope,Diaries,$rootScope){
        $scope.user=$rootScope.me;
        $scope.endDateBeforeRender = endDateBeforeRender;
        $scope.endDateOnSetTime = endDateOnSetTime;
        $scope.startDateBeforeRender = startDateBeforeRender;
        $scope.startDateOnSetTime = startDateOnSetTime;
        function startDateOnSetTime () {
            $scope.$broadcast('start-date-changed');
        }

        function endDateOnSetTime () {
            $scope.$broadcast('end-date-changed');
        }

        function startDateBeforeRender ($dates) {
            if ($scope.dateRangeEnd) {
                var activeDate = moment($scope.dateRangeEnd);

                $dates.filter(function (date) {
                    return date.localDateValue() >= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }

        function endDateBeforeRender ($view, $dates) {
            if ($scope.dateRangeStart) {
                var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

                $dates.filter(function (date) {
                    return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }


        var j=new Date();
        var now=(j.getYear()+1900)+'-'+(j.getMonth()+1);
        var deb= now+'-01 00:00:00';
        var fin= now+'-30 23:59:59';
        Diaries.getList({seller_id:$scope.user.seller.id,"start_at-bt":deb+","+fin}).then(function(d){
            $scope.agendas=d;
        },function(q){console.log(q)});

        $scope.enregistrer_evenement=function(a){
            a.start_at=$scope.dateRangeStart;
            a.end_at=$scope.dateRangeEnd;
            console.log(a);
            $("#close_ajouter_evenement").trigger("click");
        }


    });
