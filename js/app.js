"use strict";


angular
  .module("grumblr", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("GrumbleFactory", [
    "$resource",
    GrumbleFactoryFunction
  ])
  .factory("GrumbleFactory", [
    "$resource",
    FactoryFunction
  ])
  .controller("GrumbleIndexController", [
    "GrumbleFactory",
    GrumbleIndexControllerFunction
  ])
  .controller("GrumbleNewController", [
    "GrumbleFactory",
    GrumbleNewControllerFunction
  ])
  .controller("GrumbleEditController", [
    "GrumbleFactory",
    "$stateParams",
    GrumbleEditControllerFunction
  ])
  .controller("GrumbleShowController", [
    "GrumbleFactory",
    "$stateParams",
    GrumbleShowControllerFunction
  ])

function RouterFunction($stateProvider){
  $stateProvider
  .state("grumbleIndex", {
    url: "/grumbles",
    templateUrl: "js/ng-views/index.html",
    controller: "GrumbleIndexController",
    controllerAs: "vm"
  })
  .state("grumbleNew", {
    url: "/grumbles/new",
    templateUrl: "js/ng-views/new.html",
    controller: "GrumbleNewController",
    controllerAs: "vm"
  })
  .state("grumbleEdit", {
    url: "/grumbles/:id/edit",
    templateUrl: "js/ng-views/edit.html",
    controller: "GrumbleEditController",
    controllerAs: "vm"
  })
  .state("grumbleShow", {
    url: "/grumbles/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "GrumbleShowController",
    controllerAs: "vm"
  });
}

function GrumbleIndexControllerFunction( GrumbleFactory ){
  this.grumbles = GrumbleFactory.query();
}

function GrumbleShowControllerFunction( GrumbleFactory, $stateParams ){
  this.grumble = GrumbleFactory.get({id: $stateParams.id});
}

function GrumbleNewControllerFunction( GrumbleFactory ){
  this.grumble = new GrumbleFactory();
  this.create = function(){
    this.grumble.$save()
  }
}

function GrumbleEditControllerFunction( GrumbleFactory, $stateParams ){
  this.grumble = GrumbleFactory.get({id: $stateParams.id});
  this.update = function(){
    this.grumble.$update({id: $stateParams.id})
  }
  this.destroy = function(){
    this.grumble.$delete({id: $stateParams.id})
  }
}

function GrumbleFactoryFunction( $resource ){
  return $resource( "http://localhost:3000/grumbles/:id" );
}

function FactoryFunction( $resource ){
  return $resource("http://localhost:3000/grumbles/:id", {}, {
    update: {method: "PUT"}
  })
}
