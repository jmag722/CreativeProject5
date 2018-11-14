angular.module('app', [])
    .controller('mainCtrl', mainCtrl);

//model is scope variable that has all data
function mainCtrl($scope, $http) {

    $scope.addNew = function() {
        var myobj = { Title: $scope.title, Address: $scope.address, Time: $scope.date, Description: $scope.descrip };
        var jobj = JSON.stringify(myobj);

        var url = "event";
        //makes call to URL route from front end and gets response from backend

        $http({
            method: "POST",
            url: "event",
            data: jobj
        }).then(function mySuccess(response) {
            console.log("worked")
        }, function myError(response) {
            console.log("failed")
        });
    }


}
