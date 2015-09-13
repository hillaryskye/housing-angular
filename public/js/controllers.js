app.controller("HousingCtrl", ["$scope", "$http",  "$routeParams", "$location", "$route", function($scope, $http, $routeParams, $location, $route) {
  $scope.add = false;
  $scope.edit = false;
  $scope.comments = false;

  console.log('from controller');

  $http.get('http://localhost:8080/api/housing')
  .then(function(response) {
    $scope.housing = response.data;
    console.log('results', $scope.results)
  }, function(response) {
    console.log('error in the get request')
  });

  $scope.addHouse = function(house) {
    console.log('house', house)
    var house = {
      houseType: $scope.house.houseType,
      own: $scope.house.own
    }
      $http.post('http://localhost:8080/api/housing', house)
        .then(function(response) {
          console.log(response)
        }), function(response) {
          console.log("Inalid URL")
        $route.reload()
        }
        $scope.add = false;
    } // success


    $scope.deleteHouse = function(house) {
      console.log('delete', house)
      $http.delete('http://localhost:8080/api/housing/' +  house._id)
        .then(function(response) {
          console.log("Inalid URL")
          $route.reload()
        }) // success
    }
    $scope.editHouse = function(house) {
      console.log('hello')
      console.log('house', house)
      console.log('id', $routeParams)

        $http.put('http://localhost:8080/api/housing/' +  house._id, house)
        .then(function(response) {
          console.log(response)
          $scope.oneHouse = response.data
        }, function(response) {
          console.log("Inalid URL")
        })
      } // success

      $scope.newComment = function(house) { // full record is passed from the view
       var comment = {
         commentAuthor: house.newComment.commentAuthor,
         commentText: house.newComment.commentText,
         commentTimestamp: Date.now(),
       };
       var comments = house.comments || [];
       comments.push(comment); // push comment to local $scope
       house.newComment.commentAuthor = null; // needed to prevent autofilling fields
       house.newComment.commentText = null; // needed to prevent autofilling fields
       house.comments = comments; // saves new comment locally
       $http.put('http://localhost:8080/api/housing/' + house._id, house)
        .then(function(response) { // UPDATE
         console.log("Comment added.");
       }, function(response) {
         console.log("Invalid URL");
      });
    }; // success

    $scope.deleteComment = function(house, comment) {
     console.log("Deleting comment.")
     var index = house.comments.indexOf(comment); // find the index of the comment in the array of comments
     house.comments.splice(index, 1); // removes the comment from the array
     $http.put('http://localhost:8080/api/housing/' + house._id, house)
      .then(function(response) { // UPDATE
       console.log("Comment deleted.");
     }, function(response) {
       console.log("Invalid URL");
     });
   } // success

      $scope.addForm = function(house) {
        if ($scope.add === false) {
          $scope.add = true;
          console.log('add House', $scope.add)
        } else if($scope.add === true) {
          $scope.add = false
          console.log('add House after', $scope.add)
        }
      }

      $scope.editForm = function(house) {
        if ($scope.edit === false) {
          $scope.edit = true;
          console.log('edit House', $scope.edit)
        } else if($scope.edit === true) {
          $scope.edit = false
          console.log('dit House after', $scope.edit)
        }
      }

      $scope.AddCommentsForm = function(house) {
        if ($scope.comments === false) {
          $scope.comments = true;
          console.log('comments House', $scope.comments)
        } else if($scope.comments === true) {
          $scope.comments = false
          console.log('Comments House after', $scope.comments)
        }
      }
}])


app.controller("ShowCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", function($scope, $routeParams, $http, $route, $location) {
  $scope.edit = false;
  console.log('from showctrl')
  // $scope.showHouse = $routeParams.id
  console.log('routeparams', $routeParams.id)

  $http.get('http://localhost:8080/api/housing/' + $routeParams.id + '/edit/')
  .then(function(response) {
    console.log('response from get in edit', response)
    $scope.oneHouse = response.data;
    console.log('response.data', response.data)
  }, function(response) {
    console.log('error in the get request')
  });

  $scope.editHouse = function(house) {
    console.log('House', house)
    console.log('id', $routeParams.id)
    // var house = {
    //   houseType:  $scope.house.houseType,
    //   own: $scope.house.own
    // };
    //
    $http.put('http://localhost:8080/api/housing/' +  $routeParams.id, house)
      .then(function(response) {
        console.log(response)
        $scope.updateHouse = response.data
      }, function(response) {
        console.log("Inalid URL")
        $route.reload()
      })
    };

    $scope.editForm = function(house) {
      if ($scope.edit === false) {
        $scope.edit = true;
        console.log('edit House', $scope.edit)
      } else if($scope.edit === true) {
        $scope.edit = false
        console.log('dit House after', $scope.edit)
      }
    }
  }])
