var adminurl = "http://admin.gsourcedata.com/api/";

//var adminurl = "http://localhost:8080/api/";

var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;

var navigationservice = angular.module('navigationservice', [])


    .factory('NavigationService', function ($http) {
        var navigation = [{
                name: "Home",
                classis: "active",
                anchor: "home",
                subnav: []
            }, {
                name: "Abouts",
                classis: "active",
                anchor: "abouts",
                subnav: []
            },
            {
                name: "Services",
                classis: "active",
                anchor: "service",
                subnav: []
            }, {
                name: "Partners",
                classis: "active",
                anchor: "partner",
                subnav: []
            }
        ];

        return {
            getnav: function () {
                return navigation;
            },
            makeactive: function (menuname) {
                for (var i = 0; i < navigation.length; i++) {
                    if (navigation[i].name == menuname) {
                        navigation[i].classis = "active";
                    } else {
                        navigation[i].classis = "";
                    }
                }
                return menuname;
            },

            sendRegistration: function (formdata, callback) {
                $http({
                    url: adminurl + 'Client/save',
                    method: 'POST',
                    data: formdata,
                    withCredentials: true
                }).then(function (data) {
                    $http({
                        url: adminurl + 'Client/sendRegistrationMail',
                        method: 'POST',
                        data: formdata,
                        withCredentials: true
                    }).then(function (data) {
                        callback(data);
                    });
                });
            },
            sendEnquiry: function (formdata, callback) {
                $http({
                    url: adminurl + 'Inquiry/save',
                    method: 'POST',
                    data: formdata,
                    withCredentials: true
                }).then(function (data) {
                    $http({
                        url: adminurl + 'Inquiry/sendEnquiry',
                        method: 'POST',
                        data: formdata,
                        withCredentials: true
                    }).then(callback);
                });
            },
            sendHiring: function (formdata, callback) {
                $http({
                    url: adminurl + 'Hiring/save',
                    method: 'POST',
                    data: formdata,
                    withCredentials: true
                }).then(callback);
            },
        };
    });