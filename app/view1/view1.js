'use strict';

angular.module('nuvi.view1', ['ngRoute','ngTable'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.factory('activitiesService', function($http) {
  return {
    getActivties: function() {
      return $http.get('https://nuvi-challenge.herokuapp.com/activities'); 
    }
  };
})

.controller('View1Ctrl', ['activitiesService','NgTableParams',  function(activitiesService, NgTableParams) {
  
  var vm= this;

  vm.activities = '';
  vm.providers= '';
  vm.loadingData = true;
  

  //inti Fuction
  var init = function(){
    activitiesService.getActivties().then(function(response) { 
      vm.activities = response.data;
      _.each(vm.activities, function(activity) {
        var n = activity.actor_avator.indexOf('?');
        activity.actor_avator = activity.actor_avator.substring(0, n != -1 ? n : s.length);
      });
      vm.providers = _(vm.activities).chain().flatten().pluck('provider').unique().value();
      vm.counts = getActivitiesSummary(vm.activities, vm.providers);
      
      vm.defaultConfigTableParams = new NgTableParams({}, { dataset: vm.activities});
      vm.loadingData = false;
    }); 
  };

  //intialize controller
  init();

  vm.addLike = function(id){
    vm.current_post  = _.find(vm.activities, function(item) {
    return item.id == id; 
    });
    vm.current_post.activity_likes = vm.current_post.activity_likes+1;
  };

  vm.addComment = function(id){
    //TODO
  };  

  var getActivitiesSummary = function(activities, providers){
    
      return _.countBy(activities, function(activity){
          return activity.provider.replace(" ", "_");
      }); 
      
  };

}]);

