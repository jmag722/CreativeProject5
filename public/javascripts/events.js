// angular.module('app', [])
//     .controller('mainCtrl', mainCtrl);

// //model is scope variable that has all data
// function mainCtrl($scope, $http) {

//     $scope.addNew = function() {
//         var myobj = { Title: $scope.title, Address: $scope.address, Time: $scope.date, Description: $scope.descrip };
//         var jobj = JSON.stringify(myobj);

//         var url = "event";
//         //makes call to URL route from front end and gets response from backend

//         $http({
//             method: "POST",
//             url: "event",
//             data: jobj
//         }).then(function mySuccess(response) {
//             console.log("worked")
//         }, function myError(response) {
//             console.log("failed")
//         });
//     }


// }

angular.module('app', [])
    .controller('mainCtrl', mainCtrl);

//model is scope variable that has all data
function mainCtrl($scope, $http) {

    $scope.events = [];

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

        $scope.showAddNew(false);
    }

    $scope.showAddNew = function(show) {
        console.log("showAddNew called");

        if (show) {
            // $("#overlay").style.display = "block";
            $("#overlay").css('display', 'block');
        }
        else {
            // $("#overlay").style.display = "none";
            $("#overlay").css('display', 'none');
        }
    }
}

function eventDirective() {

    return {
        scope: {
            event: '='
        },
        restrict: 'E',
        replace: 'true',
        template: (
            // '<div class="avatar">' +
            // '<img ng-src="{{user.avatarUrl}}" />' +
            // '<h4>{{user.name}}</h4>' +
            // '<h6>{{user.email}}</h6>' +
            // '</div>'

            '<div class="event">' +
            '<img class="image" ng-src="{{event.imgUrl}}" />' +
            '<div class="title">{{event.title}}</div>' +
            '<div class="dateTime">' +
            '<div class="date">{{event.date}}</div>' +
            '<div class="time">{{event.time}}</div>' +
            '</div>' +
            '</div>'
        ),
        link: link
    };

    function link(scope) {
        // if (!scope.user.avatarUrl) {
        //     scope.user.avatarUrl =
        //         defaultImages[Math.floor(Math.random() * defaultImages.length)];
        //     //         scope.user.avatarUrl = 'https://www.drupal.org/files/issues/default-avatar.png';
        // }
    }
}
