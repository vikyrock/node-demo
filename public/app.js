var app = angular.module('prerender-tutorial', ['ngRoute', 'ngMeta'])
  .config(function ($routeProvider, $locationProvider, ngMetaProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/homeView.html',
      controller: 'homeController'
    })

    $routeProvider.when('/about', {
      templateUrl: '/views/aboutView.html',
      controller: 'aboutController'
    })

    $routeProvider.when('/features', {
      templateUrl: '/views/featuresView.html',
      controller: 'featuresController'
    })

    $routeProvider.when('/test', {
      templateUrl: '/views/testfile.html',
      controller: 'featuresController'
    })

    $routeProvider.otherwise({
      redirectTo: '/'
    })

    $locationProvider.html5Mode(true)
    $locationProvider.hashPrefix('!')

    ngMetaProvider.useTitleSuffix(true)
    ngMetaProvider.setDefaultTitle('Fallback Title |')
    ngMetaProvider.setDefaultTitleSuffix(' | YourSite')
    ngMetaProvider.setDefaultTag('author', 'John Smith')
    ngMetaProvider.setDefaultTag('description', 'webDescription')
  })

  .run(['ngMeta', function (ngMeta) {
    ngMeta.init()
  }])

function mainController ($scope, ngMeta) {
  // We will create an seo variable on the scope and decide which fields we want to populate
  /*  $scope.seo = {
     pageTitle: '',
     pageDescription: ''
   } */
}

function homeController ($scope, ngMeta) {
  ngMeta.setTitle(' | Home Page')
  ngMeta.setTag('author', 'Vikas')
  ngMeta.setTag('description', ' new webDescription')

// For this tutorial, we will simply access the $scope.seo variable from the main controller and fill it with content.
// Additionally you can create a service to update the SEO variables - but that's for another tutorial.
/* $scope.$parent.seo = {
  pageTitle: 'AngularJS SEO Tutorial',
  pageDescripton: 'Welcome to our tutorial on getting your AngularJS websites and apps indexed by Google.'
} */
}

/* function aboutController($scope) {
    $scope.$parent.seo = {
        pageTitle : 'About',
        pageDescripton: 'We are a content heavy website so we need to be indexed.'
    }
} */
app.controller('aboutController', function ($scope, ngMeta) {
  ngMeta.setTitle('Eluvium', ' | Aboutpotify')
  ngMeta.setTag('description', ' about webDescription')
/*  $scope.$parent.seo = {
   pageTitle: 'About',
   pageDescripton: 'vikaas seos'
 } */
})

function featuresController ($scope) {
  ngMeta.setTag('description', ' featre webDescription')
/*  $scope.$parent.seo = {
   pageTitle: 'Features',
   pageDescripton: 'Check out some of our awesome features!'
 } */
}
