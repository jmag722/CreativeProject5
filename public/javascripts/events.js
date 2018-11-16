/* global angular */
/* global $ */
angular.module('app', [])
    .controller('mainCtrl', mainCtrl);

//model is scope variable that has all data
function mainCtrl($scope, $http) {

    $scope.showSearch = false;
    $scope.events = [];
    $scope.currentSearchString = "City:Provo";

    $scope.addNew = function() {
        var myobj = { Title: $scope.title, Address: $scope.address, Time: $scope.date, Description: $scope.descrip };
        var jobj = JSON.stringify(myobj);

        // var url = "event";
        //makes call to URL route from front end and gets response from backend

        $http({
            method: "POST",
            url: "event",
            data: jobj
        }).then(function mySuccess(response) {
            console.log("worked");
        }, function myError(response) {
            console.log("failed");
        });

        $scope.showAddNew(false);
    };

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
    };
    
    $scope.searchByTitle = function() {
        $scope.toggleSearch();
        $scope.currentSearchString = "Title:" + $scope.searchTitle;
        
        // Search functionality goes here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        $scope.searchTitle = "";
    };
    
    $scope.searchByDate = function() {
        $scope.toggleSearch();
        // $scope.currentSearchString = "Date:" + $scope.searchDate;
        $scope.currentSearchString = "Date:" + $("#dateSearchInput").val();
        
        
        // Search functionality goes here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        $scope.searchDate = "";
    };
    
    $scope.searchByAddress = function() {
        $scope.toggleSearch();
        $scope.currentSearchString = "Address:" + $scope.searchAddress;
        
        
        // Search functionality goes here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        $scope.searchAddress = "";
    };

    $scope.toggleSearch = function() {
        console.log ("Toggling search");
        $scope.showSearch = !$scope.showSearch;
        
        if ($scope.showSearch){
            // console.log ("Showing search");
            $("#searchBox").css ('maxHeight', $("#searchBox").prop("scrollHeight") + "px");
            $("#search").html ("Hide Search");
        }
        else {
            // console.log ("Hiding search");
            $("#searchBox").css ('maxHeight', '0px');
            $("#search").html ("Show Search");
        }
    };
}

// Defines the look and layout of a search result.
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
        )
    };
}

$(document).ready(function() {

    //Sets the minimum date to today for new events.
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    $("#newEventDate").attr("min", yyyy + '-' + mm + '-' + dd);

    // File picker for new event image.
    $("#imagePreview").click(function() {
        $("input[id='imgFile']").click();
    });

});

// Sets the image preview when #imgFile changes.
function loadImage(event) {
    $("#imagePreview").attr("src", URL.createObjectURL(event.target.files[0]));
}
