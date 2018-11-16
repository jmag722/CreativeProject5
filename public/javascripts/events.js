/* global angular */
/* global $ */
var app = angular.module('app', [])
    .controller('mainCtrl', mainCtrl);

//model is scope variable that has all data
function mainCtrl($scope, $http) {

    $scope.showSearch = false;
    $scope.events = [];
    $scope.currentSearchString = "City:Provo";

    $scope.addNew = function() {
        var year = $scope.date.getFullYear();
        var month = $scope.date.getMonth() + 1;
        var day = $scope.date.getDate();
        var dateString = month + "-" + day + "-" + year;
        var myobj = {
            Title: $scope.title,
            Address: $scope.address,
            DATE: dateString,
            Start: $scope.startTime,
            End: $scope.endTime,
            Description: $scope.descrip,
            Image: $scope.imgPath
        };
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
        console.log($scope.currentSearchString)
        $http({
            method: "GET",
            url: "eventTitle?q=" + $scope.searchTitle
        }).then(function mySuccess(response) {
            console.log("successTitleSearch")
            $scope.events = response.data;
            console.log($scope.events);
        }, function myError(response) {
            console.log("bad title")
        });

        $scope.searchTitle = "";
    };

    $scope.searchByDate = function() {
        $scope.toggleSearch();
        // $scope.currentSearchString = "Date:" + $scope.searchDate;
        var year = $scope.searchDate.getFullYear();
        var month = $scope.searchDate.getMonth() + 1;
        var day = $scope.searchDate.getDate();
        
        var dateString = month + "-" + day + "-" + year;
        $scope.currentSearchString = "Date:" + dateString;

        $http({
            method: "GET",
            url: "eventDate?q=" + dateString
        }).then(function mySuccess(response) {
            console.log("successSearchDate")
            $scope.events = response.data;
            console.log($scope.events);
        }, function myError(response) {
            console.log("bad dates")
        });


        $scope.searchDate = "";
    };

    $scope.searchByAddress = function() {
        $scope.toggleSearch();
        $scope.currentSearchString = "Address:" + $scope.searchAddress;


        $http({
            method: "GET",
            url: "eventAddress?q=" + $scope.searchAddress
        }).then(function mySuccess(response) {
            console.log("successAddressSearch")
            $scope.events = response.data;
            console.log($scope.events);
        }, function myError(response) {
            console.log("bad address")
        });

        $scope.searchAddress = "";
    };
    
    $scope.getAllEvents = function() {
        $http({
            method: "GET",
            url: "event"
        }).then(function mySuccess(response) {
            console.log("got All")
            $scope.events = response.data;
            console.log($scope.events);
        }, function myError(response) {
            console.log("bad get all")
        });
    }
    
     $scope.deleteEvents = function() {
        $http({
            method: "DELETE",
            url: "delete"
        }).then(function mySuccess(response) {
            console.log("successful Delete")
            $scope.events = response.data;
            console.log($scope.events)
            console.log($scope.events);
        }, function myError(response) {
            console.log("bad delete")
        });
    }

    $scope.toggleSearch = function() {
        console.log("Toggling search");
        $scope.showSearch = !$scope.showSearch;

        if ($scope.showSearch) {
            // console.log ("Showing search");
            $("#searchBox").css('maxHeight', $("#searchBox").prop("scrollHeight") + "px");
            $("#search").html("Hide Search");
        }
        else {
            // console.log ("Hiding search");
            $("#searchBox").css('maxHeight', '0px');
            $("#search").html("Show Search");
        }
    };
}

// Defines the look and layout of a search result.
app.directive('eventField', function() {
    return {
        scope: {
            event: '='
        },
        restrict: 'E',
        replace: 'true',
        template: (

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
});


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
