var initMap = function () {}
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ngMeta'])
  .controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, $location, $uibModal, $window, ngMeta) {
    $scope.template = TemplateService.changecontent('home'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Cad Drafting Services | GIS Mapping | USA') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/header.html'
    $scope.template.footer = ''

    $scope.identiUrl = $location.absUrl()
    var top = $scope.identiUrl
    $scope.goTo = function (toState) {
      $state.go(toState)
    }

    $scope.$on('$viewContentLoaded', function () {
      if ($(window).width() > 767) {
        $('.remove-xs').remove()
        $('body').css('background-image', 'url(img/home/bg_final.png)')
      }
      if ($(window).width() < 767) {
        $('body').css('background-image', 'url(img/home/mobile_background.jpg)')
      }
    })

    $scope.clients = _.chunk($scope.clients, 9)
    for (var i = 0; i < $scope.clients.length; i++) {
      $scope.clients[i] = _.chunk($scope.clients[i], 3)
    }

    // written for home enquiry form
    $scope.serviceList = []
    $scope.serviceList1 = []
    // $scope.formdata = {}
    $scope.dropdown = function () {
      $scope.invisible = $scope.invisible ? false : true
    }
    $scope.minlength = 10
    $scope.maxlength = 10
    $scope.enquiryData = {}
    $scope.submitForm = function (frm) {
      frm.serviceRequest = $scope.serviceList
      $scope.enquiryData = frm
      console.log($scope.enquiryData)
      NavigationService.sendEnquiry($scope.enquiryData, function (data) {
        if ($scope.enquiryData) {
          console.log($scope.enquiryData)
          $scope.enquirySubmit()
          $timeout(function () {
            $window.location.reload()
          }, 2500)
        }
      })
    }

    $scope.addMe = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList.push(listdata)
      } else {
        var list = _.remove($scope.serviceList, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMe = function (id, index) {
      $scope.serviceList.splice(index, 1)
      document.getElementById(id).checked = false
    }

    $scope.addMee = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList1.push(listdata)
      } else {
        var list = _.remove($scope.serviceList1, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMee = function (id, index) {
      $scope.serviceList1.splice(index, 1)
      document.getElementById(id).checked = false
    }

    $scope.enquirySubmit = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'views/modal/submit.html',
        scope: $scope
      })
      $scope.formdata = {}
    }
    // meta tags 
    ngMeta.setTag('description', 'We offer solutions for cad drafting & designing services. Our specialization lays in land survey drafting, architectural drafting and cad conversions.')
    ngMeta.setTag('keywords', 'Cad Drafting Services, Autocad Drafting Price, CAD Drafting companies, Architectural Cad Drafting, Land Survey Drafting, Cad Outsourcing companies')
  })
  .controller('PrivacyCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('privacy'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Privacy and Policies') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })

  .controller('WeAreHiringCtrl', function ($rootScope, $scope, $state, TemplateService, NavigationService, $timeout, $uibModal, toastr) {
    $scope.template = TemplateService.changecontent('we-are-hiring'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('WeAreHiring') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    $scope.form = {}
    $scope.hiringList = []

    $scope.addMe = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.hiringList.push(listdata)
      } else {
        var list = _.remove($scope.hiringList, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }

    $scope.openUploadResumeModal = function () {
      console.log('resume modal: ', $scope.form)
      $rootScope.modalInstance = $uibModal.open({
        templateUrl: './frontend/views/content/modal/uploadResume.html',
        backdropClass: 'splash',
        windowClass: 'splash',
        scope: $scope
      })
    }

    $scope.uploadResume = function (file) {
      $scope.form.resume = file
      console.log('upload resume form: ', file)
    // $rootScope.modalInstance.dismiss()
    }

    $scope.cancelModal = function () {
      if ($scope.form.resume) {
        delete $scope.form.resume
      }
      $rootScope.modalInstance.dismiss()
    }

    $scope.removeMe = function (id, index) {
      $scope.hiringList.splice(index, 1)
      document.getElementById(id).checked = false
    }

    $scope.minlength = 10
    $scope.maxlength = 10
    $scope.hiringData = {}
    $scope.submitForm = function (frm) {
      console.log('Form in submit: ', frm)
      frm.serviceRequest = $scope.serviceList
      $scope.hiringData = frm
      $scope.hiringData.fieldsOfStudy = []
      _.each($scope.hiringList, function (item) {
        $scope.hiringData.fieldsOfStudy.push(item.id)
      })
      console.log($scope.hiringData)
      NavigationService.sendHiring($scope.hiringData, function (data) {
        if (data.data.value) {
          console.log($scope.hiringData)
          toastr.success("Thank You for your interest. We'll get in touch with you shortly!")
          $timeout(function () {
            $window.location.reload()
          }, 2500)
          $state.reload()
        } else {
          toastr.error('Error in uploading form. Please try again later!')
        }
      })
    }
  })

  .controller('TermsCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('terms'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Terms and Conditions') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('njsplsEventDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('njspls-event-details'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Events') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('calsEventDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('cals-event-details'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Events') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('WorkCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('work'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('WhyWorkWithUs') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    $scope.serviceList1 = []
    $scope.dropdown = function () {
      $scope.invisible = $scope.invisible ? false : true
    }

    $scope.submitForm = function (formdata) {
      formdata.serviceRequest = $scope.serviceList
      console.log(formdata)
      NavigationService.sendEnquiry(formdata, function (data) {
        if (data.data.value) {
          console.log(data.data.value)
          $scope.enquirySubmit()
        }
      })
    }

    $scope.addMee = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList1.push(listdata)
      } else {
        var list = _.remove($scope.serviceList1, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMee = function (id, index) {
      $scope.serviceList1.splice(index, 1)
      document.getElementById(id).checked = false
    }

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })

  .controller('EnquiryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $window, ngMeta) {
    $scope.template = TemplateService.changecontent('enquiry'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Enquiry') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    //  $scope.invisible="false"
    $scope.serviceList = []
    $scope.serviceList1 = []
    // $scope.formdata = {}
    $scope.dropdown = function () {
      $scope.invisible = $scope.invisible ? false : true
    }
    $scope.minlength = 10
    $scope.maxlength = 10
    $scope.enquiryData = {}
    $scope.submitForm = function (frm) {
      frm.serviceRequest = $scope.serviceList
      $scope.enquiryData = frm
      console.log($scope.enquiryData)
      NavigationService.sendEnquiry($scope.enquiryData, function (data) {
        if ($scope.enquiryData) {
          console.log($scope.enquiryData)
          $scope.enquirySubmit()
          $timeout(function () {
            $window.location.reload()
          }, 2500)
        }
      })
    }

    $scope.addMe = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList.push(listdata)
      } else {
        var list = _.remove($scope.serviceList, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMe = function (id, index) {
      $scope.serviceList.splice(index, 1)
      document.getElementById(id).checked = false
    }

    $scope.addMee = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList1.push(listdata)
      } else {
        var list = _.remove($scope.serviceList1, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMee = function (id, index) {
      $scope.serviceList1.splice(index, 1)
      document.getElementById(id).checked = false
    }

    $scope.enquirySubmit = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'views/modal/submit.html',
        scope: $scope
      })
      $scope.formdata = {}
    }

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('SideEnquiryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $window) {
    $scope.serviceList = []
    $scope.serviceList1 = []
    $scope.formdata = {}
    $scope.minlength = 10
    $scope.maxlength = 10
    $scope.dropdown = function () {
      $scope.invisible = $scope.invisible ? false : true
    }
    $scope.enquiryData = {}
    $scope.submitForm = function (frm) {
      frm.serviceRequest = $scope.serviceList
      $scope.enquiryData = frm
      console.log($scope.enquiryData)
      console.log(frm)
      NavigationService.sendEnquiry(frm, function (data) {
        if ($scope.enquiryData) {
          console.log($scope.enquiryData)
          $scope.enquirySubmit()
          $timeout(function () {
            $window.location.reload()
          }, 2500)
        }
      })
    }

    $scope.addMe = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList.push(listdata)
      } else {
        var list = _.remove($scope.serviceList, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMe = function (id, index) {
      $scope.serviceList.splice(index, 1)
      document.getElementById(id).checked = false
    }

    $scope.addMee = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList1.push(listdata)
      } else {
        var list = _.remove($scope.serviceList1, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMee = function (id, index) {
      $scope.serviceList1.splice(index, 1)
      document.getElementById(id).checked = false
    }

    $scope.enquirySubmit = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'views/modal/submit.html',
        scope: $scope
      })
      $scope.closeMenus()
    }
    $scope.menu = 'menu-out'
    $scope.getMenus = function () {
      $('.sides-menu').addClass('menu-in')
      $('.sides-menu').removeClass('menu-out')
    }
    $scope.closeMenus = function () {
      $('.sides-menu').removeClass('menu-in')
      $('.sides-menu').addClass('menu-out')
    }
    $('.template.content').click(function () {
      $('.sides-menu').removeClass('menu-in')
      $('.sides-menu').addClass('menu-out')
    })
    $.fancybox.close(true)
  })
	
  .controller('AboutCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, ngMeta) {
    $scope.template = TemplateService.changecontent('abouts'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('AboutUs') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    // $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    $scope.serviceList1 = []
    $scope.dropdown = function () {
      $scope.invisible = $scope.invisible ? false : true
    }

    $scope.submitForm = function (formdata) {
      formdata.serviceRequest = $scope.serviceList
      console.log(formdata)
      NavigationService.sendEnquiry(formdata, function (data) {
        if (data.data.value) {
          console.log(data.data.value)
          $scope.enquirySubmit()
        }
      })
    }

    $scope.addMee = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList1.push(listdata)
      } else {
        var list = _.remove($scope.serviceList1, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMee = function (id, index) {
      $scope.serviceList1.splice(index, 1)
      document.getElementById(id).checked = false
    }

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('RegistrationCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $window, ngMeta) {
    $scope.template = TemplateService.changecontent('registration'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Registration') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    $scope.form = {}
    $scope.RegisterData = {}
    $scope.minlength = 10
    $scope.maxlength = 10
    console.log($scope.form)
    $scope.submitForm = function (frm) {
      frm.serviceRequest = $scope.serviceList
      frm.businessUnit = $scope.businessList
      console.log(frm.password)
      console.log(frm.confirmPassword)
      $scope.RegisterData = frm
      if (frm.password == frm.confirmPassword) {
        NavigationService.sendRegistration(frm, function (data) {
          console.log($scope.RegisterData)
          if ($scope.RegisterData) {
            console.log($scope.RegisterData)
            $scope.registerSubmit()
            $scope.formName.$setUntouched()
            $scope.formName.$setPristine()
          }
        })
        $timeout(function () {
          $window.location.reload()
        }, 2500)
      }
    }

    $scope.serviceList2 = []

    $scope.addMeReg = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList2.push(listdata)
      } else {
        var list = _.remove($scope.serviceList2, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMe = function (id, index) {
      $scope.serviceList2.splice(index, 1)
      document.getElementById(id).checked = false
    }

    $scope.businessList = []

    $scope.add = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.businessList.push(listdata)
      } else {
        var list = _.remove($scope.businessList, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.remove = function (id, index) {
      $scope.businessList.splice(index, 1)
      document.getElementById(id).checked = false
    }

    $scope.registerSubmit = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'views/modal/submit-reg.html',
        scope: $scope
      })
    }

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })

  .controller('PartnerCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('partner'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Partners') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    $scope.serviceList1 = []
    $scope.dropdown = function () {
      $scope.invisible = $scope.invisible ? false : true
    }

    $scope.submitForm = function (formdata) {
      formdata.serviceRequest = $scope.serviceList
      console.log(formdata)
      NavigationService.sendEnquiry(formdata, function (data) {
        if (data.data.value) {
          console.log(data.data.value)
          $scope.enquirySubmit()
        }
      })
    }

    $scope.addMee = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList1.push(listdata)
      } else {
        var list = _.remove($scope.serviceList1, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMee = function (id, index) {
      $scope.serviceList1.splice(index, 1)
      document.getElementById(id).checked = false
    }

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('ContactCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('contact'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Contact Us') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('ServiceCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('service'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Cad Outsourcing Services | USA') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    $scope.submitForm = function (formdata) {
      formdata.serviceRequest = $scope.serviceList
      console.log(formdata)
      NavigationService.sendEnquiry(formdata, function (data) {
        if (data.data.value) {
          console.log(data.data.value)
          $scope.enquirySubmit()
        }
      })
    }

    $scope.addMee = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList1.push(listdata)
      } else {
        var list = _.remove($scope.serviceList1, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }

    $scope.removeMee = function (id, index) {
      $scope.serviceList1.splice(index, 1)
      document.getElementById(id).checked = false
    }
    ngMeta.setTag('description', 'Our versatile expertise in various solutions of cad drafting like land survey drafting, architectural drafting, cad conversions definitely benefits you.')
    ngMeta.setTag('keywords', 'Cad Drafting Services, Autocad Drafting Price, CAD Drafting companies, Architectural Cad Drafting, Land Survey Drafting, Cad Outsourcing companies')
  })

  .controller('GisCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('gis'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('GIS Mapping services | GIS Data Conversion | USA') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    $scope.submitForm = function (formdata) {
      formdata.serviceRequest = $scope.serviceList
      console.log(formdata)
      NavigationService.sendEnquiry(formdata, function (data) {
        if (data.data.value) {
          console.log(data.data.value)
          $scope.enquirySubmit()
        }
      })
    }

    $scope.addMee = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList1.push(listdata)
      } else {
        var list = _.remove($scope.serviceList1, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMee = function (id, index) {
      $scope.serviceList1.splice(index, 1)
      document.getElementById(id).checked = false
    }

    ngMeta.setTag('description', 'Cost effective solutions of gis mapping & it`s subsequent services like GIS data conversion are available with us.')
    ngMeta.setTag('keywords', 'GIS Mapping Services, GIS Mapping Companies, GIS application providers')
  })

  .controller('CadDraftingCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.changecontent('cad-drafting'); // Use same name of .html file
    // $scope.menutitle = NavigationService.makeactive("Cad Drafting") //This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    $scope.serviceList1 = []
    $scope.dropdown = function () {
      $scope.invisible = $scope.invisible ? false : true
    }

    $scope.submitForm = function (formdata) {
      formdata.serviceRequest = $scope.serviceList
      console.log(formdata)
      NavigationService.sendEnquiry(formdata, function (data) {
        if (data.data.value) {
          console.log(data.data.value)
          $scope.enquirySubmit()
        }
      })
    }

    $scope.addMee = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList1.push(listdata)
      } else {
        var list = _.remove($scope.serviceList1, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMee = function (id, index) {
      $scope.serviceList1.splice(index, 1)
      document.getElementById(id).checked = false
    }
  })

  .controller('TechnologyCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('technology'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Responsive website design and Development Services | USA') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    $scope.submitForm = function (formdata) {
      formdata.serviceRequest = $scope.serviceList
      console.log(formdata)
      NavigationService.sendEnquiry(formdata, function (data) {
        if (data.data.value) {
          console.log(data.data.value)
          $scope.enquirySubmit()
        }
      })
    }

    $scope.addMee = function (data, id) {
      console.log(document.getElementById(id).checked)
      if (document.getElementById(id).checked) {
        var listdata = {}
        listdata.val = data
        listdata.id = id
        $scope.serviceList1.push(listdata)
      } else {
        var list = _.remove($scope.serviceList1, function (n) {
          return _.isEqual(n.id, id)
        })
        console.log(list)
      }
    }
    $scope.removeMee = function (id, index) {
      $scope.serviceList1.splice(index, 1)
      document.getElementById(id).checked = false
    }

    ngMeta.setTag('description', 'Get the new look with responsive and adorable website designs customised according to various business solutions.')
    ngMeta.setTag('keywords', 'website design companies, responsive website designs, digital marketing services, drone app systems')
  })

  .controller('headerctrl', function ($scope, TemplateService) {
    $scope.template = TemplateService

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      // $(window).scrollTop(0)
    })

    if ($(window).width() < 767) {
    }

    if ($(window).width() > 767) {
    }
  })
  .controller('EventCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('events'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Events') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })
  
  .controller('Error404Controller', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("errpage");
		$scope.template.header = "views/headerone.html";
		$scope.template.footer = "views/footer.html";
		
		
	})
  .controller('NewsCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('news'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('News') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('BlogCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('blog'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Blog') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('BlogDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.changecontent('blog-details'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Blog-Description') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
  })

  .controller('LandsurveyCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('landsurvey'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Land survey drafting |Survey Designing in Cad') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    ngMeta.setTag('description', 'Land survey drafting services offered with less turnaround time by Gsource technologies with pin point accuracy.')
    ngMeta.setTag('keywords', 'Hire a cad drafter, outsource land survey drafting, land survey drafting, survey drafting services, survey drafting.')
  })
  .controller('LanddevelopmentCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('landdevelopment'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Land Development cad designing | Outsource autocad drafting') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'

    ngMeta.setTag('description', 'Gsource is a  cost effective and accurate land development engineering design firm serving across united states.')
    ngMeta.setTag('keywords', 'Land development services, cad designing for land development,  civil drafting, civil cad designing.')
  })
  .controller('BimCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('bim'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('BIM Service provider |BIM Consulting Firm |USA') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    ngMeta.setTag('description', 'BIM services for various types of civil structures like hospitals, stadiums, corporate buildings to ensure mapping of structural, MEP and survey data.')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('CadcoversionCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('cadconversion'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('CAD Conversion Services |Paper to Cad Conversion') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    ngMeta.setTag('description', 'Various types of cad conversion services like pdf to cad, hand sketch to cad conversions, paper to cad conversion are provided with lightning fast turnaround time.')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('ArchitectcadCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('archcad'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('Architectural Drafting services |USA') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    ngMeta.setTag('description', 'We use software like autocad, revit, microstation to provide all sorts of architectural drafting & design support which gives architects expected results in terms of cad conversion of various documents like drawing plans, blue prints, pdf')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('GismappingCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('gismapping'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('GIS Consulting Firm|GIS Mapping Offerings |USA') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    ngMeta.setTag('description', 'All kinds of GIS mapping services like satellite image processing, ortho photo conversions, photogrammetry, cartography, orthomosaicing are offered by Gsource all across united states.')
    ngMeta.setTag('keywords', ' ')
  })
  .controller('GisappdevelopmentCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('gisappdevelopment'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('GIS Application Development Firm | USA') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    ngMeta.setTag('description', 'Our GIS application development services includes gis mobile app integration, geo spatial app development, designing of custom geospatial databases')
    ngMeta.setTag('keywords', ' ')
  })

  .controller('SdcaCtrl', function ($scope, TemplateService, NavigationService, $timeout, ngMeta) {
    $scope.template = TemplateService.changecontent('sdca'); // Use same name of .html file
    $scope.menutitle = NavigationService.makeactive('SDCA') // This is the Title of the Website
    TemplateService.title = $scope.menutitle
    $scope.navigation = NavigationService.getnav()
    $scope.template.header = 'views/headerone.html'
    $scope.template.footer = 'views/footer.html'
    ngMeta.setTag('description', ' ')
    ngMeta.setTag('keywords', ' ')
  })

  .controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {
    $scope.changeLanguage = function () {
      console.log('Language CLicked')

      if (!$.jStorage.get('language')) {
        $translate.use('hi')
        $.jStorage.set('language', 'hi')
      } else {
        if ($.jStorage.get('language') == 'en') {
          $translate.use('hi')
          $.jStorage.set('language', 'hi')
        } else {
          $translate.use('en')
          $.jStorage.set('language', 'en')
        }
      }
    //  $rootScope.$apply()
    }
  })
