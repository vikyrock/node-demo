

fujsdyvsdyhsdyhdsyhfds8hfsdufjsdu8fjdsu8fjsduf

var initMap = function () {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider'])
    .controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state,$location,$uibModal, $window) {
        $scope.template = TemplateService.changecontent("home"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Cad Drafting Company | Cad Outsourcing Firm | USA"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.header = "views/header.html";
		$scope.template.footer = "";

		$scope.identiUrl = $location.absUrl();
        var top = $scope.identiUrl;
		$scope.goTo = function (toState) {
            $state.go(toState);
        };
		
		$scope.$on('$viewContentLoaded', function () {
            if ($(window).width() > 767) {
                $('.remove-xs').remove();
				$("body").css('background-image', 'url(img/home/bg_final.png)');
				
            }
			if ($(window).width() < 767) {
                $("body").css('background-image', 'url(img/home/mobile_background.jpg)');
				
            }
		});
       
		$scope.clients = _.chunk($scope.clients, 9);
        for (var i = 0; i < $scope.clients.length; i++) {
            $scope.clients[i] = _.chunk($scope.clients[i], 3);
        }
		
		//written for home enquiry form
		$scope.serviceList = [];
        $scope.serviceList1 = [];
        // $scope.formdata = {};
        $scope.dropdown = function () {
            $scope.invisible = $scope.invisible ? false : true;
        };
        $scope.minlength = 10;
        $scope.maxlength = 10;
        $scope.enquiryData = {};
        $scope.submitForm = function (frm) {
            frm.serviceRequest = $scope.serviceList;
            $scope.enquiryData = frm;
            console.log($scope.enquiryData);
            NavigationService.sendEnquiry($scope.enquiryData, function (data) {
                if ($scope.enquiryData) {
                    console.log($scope.enquiryData);
                    $scope.enquirySubmit();
                    $timeout(function () {
                        $window.location.reload();
                    }, 2500);
                }
            });
        };


        $scope.addMe = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList.push(listdata);
            } else {
                var list = _.remove($scope.serviceList, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.removeMe = function (id, index) {
            $scope.serviceList.splice(index, 1);
            document.getElementById(id).checked = false;

        }

        $scope.addMee = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList1.push(listdata);
            } else {
                var list = _.remove($scope.serviceList1, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.removeMee = function (id, index) {
            $scope.serviceList1.splice(index, 1);
            document.getElementById(id).checked = false;

        }

        $scope.enquirySubmit = function () {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/submit.html",
                scope: $scope
            })
            $scope.formdata = {};
        }
		
		
		
		
    
    })
    .controller('PrivacyCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("privacy"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Privacy and Policies"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })

    .controller('WeAreHiringCtrl', function ($rootScope, $scope, $state, TemplateService, NavigationService, $timeout, $uibModal, toastr) {
        $scope.template = TemplateService.changecontent("we-are-hiring"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("WeAreHiring"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
        $scope.form = {};
        $scope.hiringList = [];
		
		
        $scope.addMe = function (data, id) {
            console.log(document.getElementById(id).checked);
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.hiringList.push(listdata);
            } else {
                var list = _.remove($scope.hiringList, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }
        }

        $scope.openUploadResumeModal = function () {
            console.log("resume modal: ", $scope.form);
            $rootScope.modalInstance = $uibModal.open({
                templateUrl: './frontend/views/content/modal/uploadResume.html',
                backdropClass: 'splash',
                windowClass: 'splash',
                scope: $scope
            });
        }

        $scope.uploadResume = function (file) {
            $scope.form.resume = file;
            console.log("upload resume form: ", file);
            // $rootScope.modalInstance.dismiss();
        }

        $scope.cancelModal = function () {
            if ($scope.form.resume) {
                delete $scope.form.resume;
            }
            $rootScope.modalInstance.dismiss();
        };

        $scope.removeMe = function (id, index) {
            $scope.hiringList.splice(index, 1);
            document.getElementById(id).checked = false;
        }

        $scope.minlength = 10;
        $scope.maxlength = 10;
        $scope.hiringData = {};
        $scope.submitForm = function (frm) {
            console.log("Form in submit: ", frm);
            frm.serviceRequest = $scope.serviceList;
            $scope.hiringData = frm;
            $scope.hiringData.fieldsOfStudy = [];
            _.each($scope.hiringList, function (item) {
                $scope.hiringData.fieldsOfStudy.push(item.id);
            });
            console.log($scope.hiringData);
            NavigationService.sendHiring($scope.hiringData, function (data) {
                if (data.data.value) {
                    console.log($scope.hiringData);
                    toastr.success("Thank You for your interest. We'll get in touch with you shortly!");
                    $timeout(function () {
                        $window.location.reload();
                    }, 2500);
                    $state.reload();
                } else {
                    toastr.error("Error in uploading form. Please try again later!");
                }
            });
        };

    })

    .controller('TermsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("terms"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Terms and Conditions"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
    })
	.controller('njsplsEventDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("njspls-event-details"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Events"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
    })
	.controller('calsEventDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("cals-event-details"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Events"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
    })
    .controller('WorkCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("work"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("WhyWorkWithUs"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
        $scope.serviceList1 = [];
        $scope.dropdown = function () {
            $scope.invisible = $scope.invisible ? false : true;
        };

        $scope.submitForm = function (formdata) {
            formdata.serviceRequest = $scope.serviceList;
            console.log(formdata);
            NavigationService.sendEnquiry(formdata, function (data) {
                if (data.data.value) {
                    console.log(data.data.value);
                    $scope.enquirySubmit();
                }
            });
        };
		
		
        $scope.addMee = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList1.push(listdata);
            } else {
                var list = _.remove($scope.serviceList1, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.removeMee = function (id, index) {
            $scope.serviceList1.splice(index, 1);
            document.getElementById(id).checked = false;

        }
       
    })

    .controller('EnquiryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $window) {
        $scope.template = TemplateService.changecontent("enquiry"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Enquiry"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
        //  $scope.invisible="false";
        $scope.serviceList = [];
        $scope.serviceList1 = [];
        // $scope.formdata = {};
        $scope.dropdown = function () {
            $scope.invisible = $scope.invisible ? false : true;
        };
        $scope.minlength = 10;
        $scope.maxlength = 10;
        $scope.enquiryData = {};
        $scope.submitForm = function (frm) {
            frm.serviceRequest = $scope.serviceList;
            $scope.enquiryData = frm;
            console.log($scope.enquiryData);
            NavigationService.sendEnquiry($scope.enquiryData, function (data) {
                if ($scope.enquiryData) {
                    console.log($scope.enquiryData);
                    $scope.enquirySubmit();
                    $timeout(function () {
                        $window.location.reload();
                    }, 2500);
                }
            });
        };


        $scope.addMe = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList.push(listdata);
            } else {
                var list = _.remove($scope.serviceList, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.removeMe = function (id, index) {
            $scope.serviceList.splice(index, 1);
            document.getElementById(id).checked = false;

        }

        $scope.addMee = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList1.push(listdata);
            } else {
                var list = _.remove($scope.serviceList1, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.removeMee = function (id, index) {
            $scope.serviceList1.splice(index, 1);
            document.getElementById(id).checked = false;

        }

        $scope.enquirySubmit = function () {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/submit.html",
                scope: $scope
            })
            $scope.formdata = {};
        }
        
    })
    .controller('SideEnquiryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $window) {
        
        $scope.serviceList = [];
        $scope.serviceList1 = [];
        $scope.formdata = {};
        $scope.minlength = 10;
        $scope.maxlength = 10;
        $scope.dropdown = function () {
            $scope.invisible = $scope.invisible ? false : true;
        };
        $scope.enquiryData = {};
        $scope.submitForm = function (frm) {
            frm.serviceRequest = $scope.serviceList;
            $scope.enquiryData = frm;
            console.log($scope.enquiryData);
            console.log(frm);
            NavigationService.sendEnquiry(frm, function (data) {
                if ($scope.enquiryData) {
                    console.log($scope.enquiryData);
                    $scope.enquirySubmit();
                    $timeout(function () {
                        $window.location.reload();
                    }, 2500);
                }
            });
        };
		
        $scope.addMe = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList.push(listdata);
            } else {
                var list = _.remove($scope.serviceList, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        };
        $scope.removeMe = function (id, index) {
            $scope.serviceList.splice(index, 1);
            document.getElementById(id).checked = false;

        };

        $scope.addMee = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList1.push(listdata);
            } else {
                var list = _.remove($scope.serviceList1, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list);
            }


        };
        $scope.removeMee = function (id, index) {
            $scope.serviceList1.splice(index, 1);
            document.getElementById(id).checked = false;

        }

        $scope.enquirySubmit = function () {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/submit.html",
                scope: $scope
            });
            $scope.closeMenus();
        };
        $scope.menu = "menu-out";
        $scope.getMenus = function () {
            $(".sides-menu").addClass("menu-in");
            $(".sides-menu").removeClass("menu-out");
        };
        $scope.closeMenus = function () {
            $(".sides-menu").removeClass("menu-in");
            $(".sides-menu").addClass("menu-out");
        };
        $(".template.content").click(function () {
            $(".sides-menu").removeClass("menu-in");
            $(".sides-menu").addClass("menu-out");
        });
        $.fancybox.close(true);

       
    })

    .controller('AboutCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        $scope.template = TemplateService.changecontent("abouts"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("AboutUs"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        //$scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
        $scope.serviceList1 = [];
        $scope.dropdown = function () {
            $scope.invisible = $scope.invisible ? false : true;
        };

        $scope.submitForm = function (formdata) {
            formdata.serviceRequest = $scope.serviceList;
            console.log(formdata);
            NavigationService.sendEnquiry(formdata, function (data) {
                if (data.data.value) {
                    console.log(data.data.value);
                    $scope.enquirySubmit();
                }
            });
        };
		
        $scope.addMee = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList1.push(listdata);
            } else {
                var list = _.remove($scope.serviceList1, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.removeMee = function (id, index) {
            $scope.serviceList1.splice(index, 1);
            document.getElementById(id).checked = false;

        }
        
    })
    .controller('RegistrationCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $window) {
        $scope.template = TemplateService.changecontent("registration"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Registration"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
        $scope.form = {};
        $scope.RegisterData = {};
        $scope.minlength = 10;
        $scope.maxlength = 10;
        console.log($scope.form);
        $scope.submitForm = function (frm) {
            frm.serviceRequest = $scope.serviceList;
            frm.businessUnit = $scope.businessList;
            console.log(frm.password);
            console.log(frm.confirmPassword);
            $scope.RegisterData = frm;
            if (frm.password == frm.confirmPassword) {
                NavigationService.sendRegistration(frm, function (data) {
                    console.log($scope.RegisterData);
                    if ($scope.RegisterData) {
                        console.log($scope.RegisterData);
                        $scope.registerSubmit();
                        $scope.formName.$setUntouched();
                        $scope.formName.$setPristine();
                    }
                });
                $timeout(function () {
                    $window.location.reload();
                }, 2500);
            };
        };
		

        $scope.serviceList2 = [];

        $scope.addMeReg = function (data, id) {
            console.log(document.getElementById(id).checked);
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList2.push(listdata);
            } else {
                var list = _.remove($scope.serviceList2, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }
        }
        $scope.removeMe = function (id, index) {
            $scope.serviceList2.splice(index, 1);
            document.getElementById(id).checked = false;
        }

        $scope.businessList = [];

        $scope.add = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.businessList.push(listdata);
            } else {
                var list = _.remove($scope.businessList, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.remove = function (id, index) {
            $scope.businessList.splice(index, 1);
            document.getElementById(id).checked = false;

        }

        $scope.registerSubmit = function () {
            $uibModal.open({
                animation: true,
                templateUrl: "views/modal/submit-reg.html",
                scope: $scope
            })
        };

    })

    .controller('PartnerCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("partner"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Partners"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
        $scope.serviceList1 = [];
        $scope.dropdown = function () {
            $scope.invisible = $scope.invisible ? false : true;
        };
		
		
        $scope.submitForm = function (formdata) {
            formdata.serviceRequest = $scope.serviceList;
            console.log(formdata);
            NavigationService.sendEnquiry(formdata, function (data) {
                if (data.data.value) {
                    console.log(data.data.value);
                    $scope.enquirySubmit();
                }
            });
        };

        $scope.addMee = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList1.push(listdata);
            } else {
                var list = _.remove($scope.serviceList1, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.removeMee = function (id, index) {
            $scope.serviceList1.splice(index, 1);
            document.getElementById(id).checked = false;

        }
        
    })
    .controller('ContactCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("contact"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Contact Us"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
        // $scope.$on('$viewContentLoaded', function () {
            // $timeout(function () {
                // initMap();
            // }, 500);
        // })
        // initMap = function () {
            // // Styles a map in night mode.
            // var map = new google.maps.Map(document.getElementById('map'), {
                // center: {
                    // lat: 25.985112,
                    // lng: -80.318818
                // },
                // scrollwheel: false,
                // zoom: 10,
                // styles: [{
                    // "featureType": "water",
                    // "stylers": [{
                        // "color": "#0e171d"
                    // }]
                // }, {
                    // "featureType": "landscape",
                    // "stylers": [{
                        // "color": "#4e65af"
                    // }]
                // }, {
                    // "featureType": "road",
                    // "stylers": [{
                        // "color": "#0e171d"
                    // }]
                // }, {
                    // "featureType": "poi.park",
                    // "stylers": [{
                        // "color": "#4e65af"
                    // }]
                // }, {
                    // "featureType": "transit",
                    // "stylers": [{
                        // "color": "#4e65af"
                    // }, {
                        // "visibility": "simplified"
                    // }]
                // }, {
                    // "featureType": "poi",
                    // "elementType": "labels.icon",
                    // "stylers": [{
                        // "color": "#f0c514"
                    // }, {
                        // "visibility": "off"
                    // }]
                // }, {
                    // "featureType": "poi",
                    // "elementType": "labels.text.stroke",
                    // "stylers": [{
                        // "color": "#f16366"
                    // }, {
                        // "visibility": "off"
                    // }]
                // }, {
                    // "featureType": "transit",
                    // "elementType": "labels.text.fill",
                    // "stylers": [{
                        // "color": "#f16366"
                    // }, {
                        // "visibility": "off"
                    // }]
                // }, {
                    // "featureType": "road",
                    // "elementType": "labels.text.fill",
                    // "stylers": [{
                        // "color": "#f16366"
                    // }]
                // }, {
                    // "featureType": "administrative",
                    // "elementType": "labels",
                    // "stylers": [{
                        // "visibility": "simplified"
                    // }, {
                        // "color": "#e84c3c"
                    // }]
                // }, {
                    // "featureType": "poi",
                    // "stylers": [{
                        // "color": "#4e65af"
                    // }, {
                        // "visibility": "off"
                    // }]
                // }]
            // });

            // var marker = new google.maps.Marker({
                // position: {
                    // lat: 25.985112,
                    // lng: -80.318818


                // },
                // title: "GSource Technology",
                // // icon: "http://gsourcedata.com/img/landing-logo.png/",
                // map: map

            // });
			
            // $(".usa").addClass("active");
            // $(".address-usa").addClass("show-add");
            // $(".india").click(function () {
                // $(".india").addClass("active");
                // $(".address-india").addClass("show-add");
                // $(".address-usa").removeClass("show-add");
                // $(".usa").removeClass("active");
                // console.log("entered");
                // center = new google.maps.LatLng(18.560149, 73.912740);
                // map.setCenter(center);
                // var marker2 = new google.maps.Marker({
                    // position: {
                        // lat: 18.560149,
                        // lng: 73.912740
                    // },
                    // title: "GSource Technology",
                    // map: map
                // });
             // });
            // $(".usa").click(function () {
                // $(".usa").addClass("active");
                // $(".india").removeClass("active");
                // $(".address-usa").addClass("show-add");
                // $(".address-india").removeClass("show-add");
                //console.log("entered");
                //center = new google.maps.LatLng(25.985112, -80.318818);
               // map.setCenter(center);
                // getCenter(18.560149, 73.912740);
                // var marker = new google.maps.Marker({
                    // position: {
                        // lat: 25.985112,
                        // lng: -80.318818


                    // },
                    // title: "GSource Technology",
                    // // icon: "http://gsourcedata.com/img/landing-logo.png/",
                    // map: map

                // });
             // });
         //}
    })
    .controller('ServiceCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("service"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Cad Drafting Services | USA"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
    
		$scope.submitForm = function (formdata) {
            formdata.serviceRequest = $scope.serviceList;
            console.log(formdata);
            NavigationService.sendEnquiry(formdata, function (data) {
                if (data.data.value) {
                    console.log(data.data.value);
                    $scope.enquirySubmit();
                }
            });
        };

        $scope.addMee = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList1.push(listdata);
            } else {
                var list = _.remove($scope.serviceList1, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
	
        $scope.removeMee = function (id, index) {
            $scope.serviceList1.splice(index, 1);
            document.getElementById(id).checked = false;

        }
        
    })

    .controller('GisCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("gis"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("GIS Mapping services | GIS Data Conversion | USA"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
        

        $scope.submitForm = function (formdata) {
            formdata.serviceRequest = $scope.serviceList;
            console.log(formdata);
            NavigationService.sendEnquiry(formdata, function (data) {
                if (data.data.value) {
                    console.log(data.data.value);
                    $scope.enquirySubmit();
                }
            });
        };
		

        $scope.addMee = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList1.push(listdata);
            } else {
                var list = _.remove($scope.serviceList1, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.removeMee = function (id, index) {
            $scope.serviceList1.splice(index, 1);
            document.getElementById(id).checked = false;

        }
        
    })

    .controller('CadDraftingCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("cad-drafting"); //Use same name of .html file
        //$scope.menutitle = NavigationService.makeactive("Cad Drafting"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";

        $scope.serviceList1 = [];
        $scope.dropdown = function () {
            $scope.invisible = $scope.invisible ? false : true;
        };

        $scope.submitForm = function (formdata) {
            formdata.serviceRequest = $scope.serviceList;
            console.log(formdata);
            NavigationService.sendEnquiry(formdata, function (data) {
                if (data.data.value) {
                    console.log(data.data.value);
                    $scope.enquirySubmit();
                }
            });
        };
		
        $scope.addMee = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList1.push(listdata);
            } else {
                var list = _.remove($scope.serviceList1, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.removeMee = function (id, index) {
            $scope.serviceList1.splice(index, 1);
            document.getElementById(id).checked = false;

        }
       
    })

    .controller('TechnologyCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("technology"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Technology"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
        
		$scope.submitForm = function (formdata) {
            formdata.serviceRequest = $scope.serviceList;
            console.log(formdata);
            NavigationService.sendEnquiry(formdata, function (data) {
                if (data.data.value) {
                    console.log(data.data.value);
                    $scope.enquirySubmit();
                }
            });
        };

        $scope.addMee = function (data, id) {
            console.log(document.getElementById(id).checked)
            if (document.getElementById(id).checked) {
                var listdata = {};
                listdata.val = data;
                listdata.id = id;
                $scope.serviceList1.push(listdata);
            } else {
                var list = _.remove($scope.serviceList1, function (n) {
                    return _.isEqual(n.id, id);
                });
                console.log(list)
            }


        }
        $scope.removeMee = function (id, index) {
            $scope.serviceList1.splice(index, 1);
            document.getElementById(id).checked = false;

        }
       
    })

    .controller('headerctrl', function ($scope, TemplateService) {
		$scope.template = TemplateService;
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            // $(window).scrollTop(0);
        });
		
			if ($(window).width() < 767) {

				
             };
			
            if ($(window).width() > 767) {
             
				
            };
        
    })
	.controller('EventCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("events"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Events"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
		
		
    })
	.controller('NewsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("news"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("News"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
		
    })
	.controller('BlogCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("blog"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Blog"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })
	.controller('BlogDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("blog-details"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Blog-Description"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })
	
	.controller('LandsurveyCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("landsurvey"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Land Survey Company | USA"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })
	.controller('LanddevelopmentCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("landdevelopment"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Land Development Design Services | USA"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })
	.controller('BimCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("bim"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Building Information Modelling Services | USA"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })
	.controller('CadcoversionCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("cadconversion"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("CAD-Conversion"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })
	.controller('ArchitectcadCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("archcad"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Arch-CAD-Services"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })
	.controller('GismappingCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("gismapping"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Gis-Mapping"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })
	.controller('GisappdevelopmentCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("gisappdevelopment"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("GIS-App-Development"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })
	
	.controller('SdcaCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("sdca"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("SDCA"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
    })

    .controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {
        $scope.changeLanguage = function () {
            console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
            //  $rootScope.$apply();
        };
		
		
    });