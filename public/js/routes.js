app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider
        // .when('/new', { // must be above '/:id' otherwise it'll think that the ID is 'new'
        //   templateUrl: 'partials/new.html',
        //   controller: 'NewCtrl'
        // })
        // .when('/:id/edit', {
        //   templateUrl: 'partials/edit.html',
        //   controller: 'EditCtrl'
        // })
        .when('/:id', {
          templateUrl: 'partials/show.html',
          controller: 'ShowCtrl'
        })
        // .otherwise({ redirectTo: '/' });
        // }
        .otherwise({
          templateUrl: 'partials/home.html',
          controller: 'HousingCtrl'
        })
        // use the HTML5 History API
         $locationProvider.html5Mode(true);
}]);
