@#$!$@%!%@%&!@!%@^!%@^!%@^!^^@^!^@^!@^!%@%!%%^@$!^%@^!@!%@^!&*@*(!*@*!*@*!&@!%@^&)  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/template.html',
      controller: 'HomeCtrl'
    })

    // .state('homeid', {
    //     url: "/:id",
    //     templateUrl: "views/template.html",
    //     controller: 'HomeCtrl'
    //   })

    .state('enquiry', {
      url: '/enquiry',
      templateUrl: 'views/template.html',
      controller: 'EnquiryCtrl'
    })
    .state('registration', {
      url: '/registration',
      templateUrl: 'views/template.html',
      controller: 'RegistrationCtrl'
    })
    .state('privacy', {
      url: '/privacy-and-policies',
      templateUrl: 'views/template.html',
      controller: 'PrivacyCtrl'
    })
    .state('terms', {
      url: '/terms-and-conditions',
      templateUrl: 'views/template.html',
      controller: 'TermsCtrl'
    })
    .state('technology', {
      url: '/services/technology',
      templateUrl: 'views/template.html',
      controller: 'TechnologyCtrl'
    })

    .state('gis', {
      url: '/services/gis-mapping-company',
      templateUrl: 'views/template.html',
      controller: 'GisCtrl'
    })

    .state('work', {
      url: '/why-work-with-us',
      templateUrl: 'views/template.html',
      controller: 'WorkCtrl'
    })

    .state('service', { // change by vikas 29.01.2018
      url: '/services/cad-drafting-services',
      templateUrl: 'views/template.html',
      controller: 'ServiceCtrl'
    })

    .state('contact', {
      url: '/contact-us',
      templateUrl: 'views/template.html',
      controller: 'ContactCtrl'
    })
    .state('we-are-hiring', {
      url: '/we-are-hiring',
      templateUrl: 'views/template.html',
      controller: 'WeAreHiringCtrl'
    })

    .state('abouts', {
      url: '/about-us',
      templateUrl: 'views/template.html',
      controller: 'AboutCtrl'
    })

    .state('partner', {
      url: '/partner-with-us',
      templateUrl: 'views/template.html',
      controller: 'PartnerCtrl'
    })
    .state('events', {
      url: '/events',
      templateUrl: 'views/template.html',
      controller: 'EventCtrl'
    })
    .state('news', {
      url: '/news',
      templateUrl: 'views/template.html',
      controller: 'NewsCtrl'
    })
    .state('landsurvey', {
      url: '/services/land-survey-drafting',
      templateUrl: 'views/template.html',
      controller: 'LandsurveyCtrl'
    })
    .state('landdevelopment', {
      url: '/services/land-development-design-services',
      templateUrl: 'views/template.html',
      controller: 'LanddevelopmentCtrl'
    })

    .state('bim', {
      url: '/services/building-information-modeling-drafting',
      templateUrl: 'views/template.html',
      controller: 'BimCtrl'
    })
    .state('cadconversion', {
      url: '/services/cad-conversion',
      templateUrl: 'views/template.html',
      controller: 'CadcoversionCtrl'
    })
    .state('architectcad', {
      url: '/services/architectural-cad-drafting',
      templateUrl: 'views/template.html',
      controller: 'ArchitectcadCtrl'
    })
    .state('gismapping', {
      url: '/services/gis-mapping',
      templateUrl: 'views/template.html',
      controller: 'GismappingCtrl'
    })
    .state('gisappdevelopment', {
      url: '/services/gis-application-development',
      templateUrl: 'views/template.html',
      controller: 'GisappdevelopmentCtrl'
    })
    .state('sdca', {
      url: '/services/spatial-database-creation-and-administration',
      templateUrl: 'views/template.html',
      controller: 'SdcaCtrl'
    })
    .state('blog', {
      url: '/blog',
      templateUrl: 'views/template.html',
      controller: 'BlogCtrl'
    })
    .state('cals-event-detail', {
      url: '/cals-event-detail',
      templateUrl: 'views/template.html',
      controller: 'calsEventDetailsCtrl'
    })
    .state('njspls-event-detail', {
      url: '/njspls-event-detail',
      templateUrl: 'views/template.html',
      controller: 'njsplsEventDetailsCtrl'
    })
    .state('blog-details', {
      url: '/blog-details',
      templateUrl: 'views/template.html',
      controller: 'BlogDetailsCtrl'
    })
    .state('page-not-found', {
      url: '/page-not-found',
      templateUrl: 'views/template.html',
      controller: 'Error404Controller'
    })

  $urlRouterProvider.otherwise('/page-not-found')
  $locationProvider.html5Mode(true)
  /* ngMetaProvider.useTitleSuffix(true)
  ngMetaProvider.setDefaultTitle('Fallback Title')
  ngMetaProvider.setDefaultTitleSuffix(' | YourSite') */
  /*   ngMetaProvider.setDefaultTag('author', 'John Smith')
   */})

firstapp.run(['ngMeta', function (ngMeta) {
  ngMeta.init()
}])

firstapp.filter('uploadpath', function () {
  return function (input, width, height, style) {
    console.log('inputpath: ', input)
    var other = ''
    if (width && width !== '') {
      other += '&width=' + width
    }
    if (height && height !== '') {
      other += '&height=' + height
    }
    if (style && style !== '') {
      other += '&style=' + style
    }
    if (input) {
      if (input.indexOf('https://') == -1) {
        return imgpath + '?file=' + input + other
      } else {
        return input
      }
    }
  }
})

firstapp.directive('img', function ($compile, $parse) {
  return {
    restrict: 'E',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element)
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />")
        var $loading = $element.next('.loading')
        $element.load(function () {
          $loading.remove()
          $(this).addClass('doneLoading')
        })
      } else {
        $($element).addClass('doneLoading')
      }
    }
  }
})

firstapp.directive('fancybox', function ($document) {
  return {
    restrict: 'EA',
    replace: false,
    link: function (scope, element, attr) {
      var $element = $(element)
      var target
      if (attr.rel) {
        target = $("[rel='" + attr.rel + "']")
      } else {
        target = element
      }

      target.fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        padding: 0,
        helpers: {
          media: {}
        }
      })
    }
  }
})
/*firstapp.directive("addClassHeader", function ($window) {
  return function (scope, element, attrs) {
    angular.element($window).bind("scroll", function () {
      var windowwidth = $(window).width()
      if (this.pageYOffset >= 900) {
        element.addClass('addclass')
      } else {
        element.removeClass('addclass')
      }
    })
  }
})
*/
/*firstapp.directive("addClassColor", function ($window) {
  return function (scope, element, attrs) {
    angular.element($window).bind("scroll", function () {
      var windowwidth = $(window).width()
      if (this.pageYOffset >= 30) {
        element.addClass('addcolor')
      } else {
        element.removeClass('addcolor')
      }
    })
  }
});*/

firstapp.directive('autoHeight', function ($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element)
      var windowHeight = $(window).height()
      $element.css('min-height', windowHeight)
    }
  }
})

/*firstapp.directive('autoWidth', function ($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element)
      var windowheight = $(window).height()
      var windowwidth = $(window).width() * 1.5
      var windowdifference = windowwidth - $(window).width()
      var windowwidthleft = windowdifference / 2
      var windowwidthbottom = windowwidth / 7
      var windowwidth2 = $(window).width() * 2
      var windowwidth3 = $(window).width() * 3
      var windowwidth4 = $(window).width() * 4
      var windowwidth5 = $(window).width() * 5
      var windowwidth6 = $(window).width() * 6
      var windowheightbottom = windowwidth - windowwidthbottom
      $(".landing-world").css({
        "width": windowwidth + "px",
        "bottom": "-" + windowheightbottom + "px",
        "left": "-" + windowwidthleft + "px",
      })
    }
  }
});*/

// firstapp.directive('imagesLoaded', function ($compile, $parse) {
//   return {
//     restrict: 'EA',
//     replace: false,
//     link: function ($scope, element, attrs) {
//       var $element = $(element)
//       $element.waitForImages().progress(function (loaded, count, success) {
//         console.log(loaded + ' of ' + count + ' images has ' + (success ? 'loaded' : 'failed to load') + '.')
//         $element.addClass('all-loaded')
//       })
//     }
//   }
// })
firstapp.directive('onlyDigits', function () {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function (scope, element, attr, ctrl) {
      var digits

      function inputValue (val) {
        if (val) {
          if (attr.type == 'tel') {
            digits = val.replace(/[^0-9\+\\]/g, '')
          } else {
            digits = val.replace(/[^0-9\-\\]/g, '')
          }

          if (digits !== val) {
            ctrl.$setViewValue(digits)
            ctrl.$render()
          }
          return parseInt(digits, 10)
        }
        return undefined
      }
      ctrl.$parsers.push(inputValue)
    }
  }
})

firstapp.directive('aplhaOnly', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser (text) {
        var transformedInput = text.replace(/[^a-zA-Z]/g, '')
        if (transformedInput !== text) {
          ngModelCtrl.$setViewValue(transformedInput)
          ngModelCtrl.$render()
        }
        return transformedInput
      }
      ngModelCtrl.$parsers.push(fromUser)
    }
  }
})

/*firstapp.directive('autoRotate', function ($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element)
      var windowwidth = $(window).width()
      var windowwidth2 = $(window).width() * 2
      var windowwidth3 = $(window).width() * 3
      var windowwidth4 = $(window).width() * 4
      var windowwidth5 = $(window).width() * 5
      var windowwidth6 = $(window).width() * 6
      var scrollLoc = $(document).scrollTop()
      console.log(scrollLoc)
      if (scrollLoc >= windowwidth) {
        $(this).addClass("rotate2")
      }
      if (scrollLoc >= windowwidth2) {
        $(this).addClass("rotate3")
      }
      if (scrollLoc >= windowwidth3) {
        $(this).addClass("rotate4")
      }
      if (scrollLoc >= windowwidth4) {
        $(this).addClass("rotate5")
      }
      if (scrollLoc >= windowwidth5) {
        $(this).addClass("rotate6")
      }
      if (scrollLoc >= windowwidth6) {
        $(this).addClass("rotate7")
      } else {
        $(this).removeClass("rotate7")
      }
    }
  }
});*/

firstapp.config(function ($translateProvider) {
  $translateProvider.translations('en', LanguageEnglish)
  $translateProvider.translations('hi', LanguageHindi)
  $translateProvider.preferredLanguage('en')
})

firstapp.directive('imageonload', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('load', function () {
        scope.$apply(attrs.imageonload)
      })
    }
  }
})

firstapp.directive('uploadImage', function ($http, $filter, $timeout) {
  return {
    templateUrl: 'views/directive/uploadImage.html',
    scope: {
      model: '=ngModel',
      type: '@type',
      callback: '&ngCallback'
    },
    link: function ($scope, element, attrs) {
      console.log('get id', document.getElementById('inputImage').value)
      console.log('***** $scope ******', $scope)
      console.log('***** element ******', element)
      console.log('***** attrs ******', attrs)

      console.log('*** uploadurl:*** ', uploadurl)

      $scope.showImage = function () {
        console.log($scope.image)
      }

      $scope.check = true
      $scope.type = 'pdf'
      if (!$scope.type) {
        $scope.type = 'image'
      }

      $scope.isMultiple = false

      $scope.inObject = false
      if (attrs.multiple || attrs.multiple === '') {
        $scope.isMultiple = true
        $('#inputImage').attr('multiple', 'ADD')
      }

      if (attrs.noView || attrs.noView === '') {
        $scope.noShow = true
      }
      // if (attrs.required) {
      //     $scope.required = true
      // } else {
      //     $scope.required = false
      // }

      $scope.$watch('image', function (newVal, oldVal) {
        console.log(newVal, oldVal)
        isArr = _.isArray(newVal)
        if (!isArr && newVal && newVal.file) {
          $scope.uploadNow(newVal)
        } else if (isArr && newVal.length > 0 && newVal[0].file) {
          $timeout(function () {
            console.log(oldVal, newVal)
            console.log(newVal.length)
            _.each(newVal, function (newV, key) {
              if (newV && newV.file) {
                $scope.uploadNow(newV)
              }
            })
          }, 100)
        }
      })

      if ($scope.model) {
        if (_.isArray($scope.model)) {
          $scope.image = []
          _.each($scope.model, function (n) {
            $scope.image.push({
              url: n
            })
          })
        } else {
          if (_.endsWith($scope.model, '.pdf')) {
            $scope.type = 'pdf'
          }
        }
      }
      if (attrs.inobj || attrs.inobj === '') {
        $scope.inObject = true
      }
      $scope.clearOld = function () {
        $scope.model = []
      }

      $scope.uploadNow = function (image) {
        console.log('******* inside upload now ******')
        $scope.uploadStatus = 'uploading'

        var Template = this
        image.hide = true
        var formData = new FormData()
        formData.append('file', image.file, image.name)
        $http.post(uploadurl, formData, {
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        }).then(function (data) {
          console.log('upload data: ', data)
          data = data.data
          $scope.uploadStatus = 'uploaded'
          if ($scope.isMultiple) {
            if ($scope.inObject) {
              $scope.model.push({
                'image': data.data[0]
              })
            } else {
              if (!$scope.model) {
                $scope.clearOld()
              }
              $scope.model.push(data.data[0])
            }
          } else {
            if (_.endsWith(data.data[0], '.pdf')) {
              $scope.type = 'pdf'
            } else {
              $scope.type = 'image'
            }
            $scope.model = data.data[0]
            console.log($scope.model, 'model means blob')
          }
          $timeout(function () {
            $scope.callback()
          }, 100)
        })
      }
    }
  }
})

// number format
firstapp.directive('phoneInput', function ($filter, $browser) {
  return {
    require: 'ngModel',
    link: function ($scope, $element, $attrs, ngModelCtrl) {
      var listener = function () {
        var value = $element.val().replace(/[^0-9]/g, '')
        $element.val($filter('tel')(value, false))
      }

      // This runs when we update the text field
      ngModelCtrl.$parsers.push(function (viewValue) {
        return viewValue.replace(/[^0-9]/g, '').slice(0, 10)
      })

      // This runs when the model gets updated on the scope directly and keeps our view in sync
      ngModelCtrl.$render = function () {
        $element.val($filter('tel')(ngModelCtrl.$viewValue, false))
      }

      $element.bind('change', listener)
      $element.bind('keydown', function (event) {
        var key = event.keyCode
        // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
        // This lets us support copy and paste too
        if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
          return
        }
        $browser.defer(listener); // Have to do this or changes don't get picked up properly
      })

      $element.bind('paste cut', function () {
        $browser.defer(listener)
      })
    }

  }
})
firstapp.filter('tel', function () {
  return function (tel) {
    // console.log(tel)
    if (!tel) {
      return ''
    }

    var value = tel.toString().trim().replace(/^\+/, '')

    if (value.match(/[^0-9]/)) {
      return tel
    }

    var country, city, number

    switch (value.length) {
      case 1:
      case 2:
      case 3:
        city = value
        break

      default:
        city = value.slice(0, 3)
        number = value.slice(3)
    }
    if (number) {
      if (number.length > 3) {
        number = number.slice(0, 3) + '-' + number.slice(3, 7)
      } else {
        number = number
      }
      return (city + '-' + number).trim()
    } else {
      return city
    }
  }
})
