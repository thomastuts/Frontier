'use strict';

angular.module('frontierApp')
  .controller('FirstRunCtrl', function ($scope, $location, storage) {

    $('.carousel').height($('html').height());
    $('body').css('overflow', 'hidden');

    $scope.currentSlide = 1;

    $(window).resize(function () {
      $('.carousel').height($('body').height());
    });

    $scope.config = {
      general: {
        username: '',
        datetime_format: 'dddd DD/MM | H:mm:ss'
      },
      dashboard: {
        left: ['Api', 'Github', 'Scratchpad'],
        right: ['Todos', 'Reminders', 'Inspiration']
      }
    };

    $scope.github = {
      username: ''
    };

    $scope.nextSlide = function () {
      $('.carousel').transition({marginLeft: $scope.currentSlide * 100 * (- 1) + '%'});
      $scope.currentSlide++;
    };

    $scope.prevSlide = function () {
      $scope.currentSlide--;
      $('.carousel').transition({marginLeft: ($scope.currentSlide - 1) * 100 * (- 1) + '%'});
    };

    $scope.skipToEnd = function () {
      $('.carousel').transition({marginLeft: '-500%'});
    };

    $scope.saveConfiguration = function () {
      // console.log($scope.config);
      // console.log($scope.github);

      storage.set('config', $scope.config);
      storage.set('module-github', $scope.github);

      // instantiate empty containers
      storage.set('module-api', {collections: []});
      storage.set('module-inspiration', {sets: []});
      storage.set('module-reminders', {reminders: []});
      storage.set('module-todos', {projects: []});
      storage.set('module-reminders', {reminders: [], locations: []});
      storage.set('module-scratchpad', {snippets: []});

      $('body').css('overflow', 'auto');

      $location.path('/');
    };

    // center rows vertically
    $('.row').flexVerticalCenter();

    $(window).resize(function () {
      $('.row').flexVerticalCenter();
    });
  });
