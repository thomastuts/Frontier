'use strict';

angular.module('frontierApp')
  .controller('TodosCtrl', function ($scope, storage, viewer, ui) {
    $scope.data = {
      overview: storage.get('module-todos'),
      project: null,
      new: {
        name: null,
        description: null,
        tasks: {
          todo: [],
          current: [],
          done: []
        }
      }
    };

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'todos'
      },
      menubar: {
        title: 'To-do',
        icon: 'icon-list'
      },
      ui: {
        open: true // true for full window, false for minimized version
      },
      views: {
        currentView: 'views/modules/todos/overview.html',
        history: []
      }
    };

    $scope.goBack = function () {
      viewer.goBack($scope);
    };

    $scope.toggleActions = function () {
      viewer.toggleActions('todos');
    };

    $scope.toggle = function () {
      ui.toggle($scope.module);
    };

    $scope.showDetail = function (project) {
      viewer.goToView($scope, 'views/modules/todos/project.html', 'project');
      $scope.data.project = project;
      console.log($scope.data.project);
    };

    $scope.markAsCurrent = function (project, task) {
      console.log('Marking as current');

      for(var i = 0; i < project.tasks.todo.length; i++)
      {
        if(project.tasks.todo[i] === task) {
          project.tasks.current.push(project.tasks.todo[i]);
          project.tasks.todo.splice(i, 1);
          break;
        }
      }

      console.log(project);

      storage.set('module-todos', $scope.data.overview);
    };

    $scope.showNew = function () {
      viewer.goToView($scope, 'views/modules/todos/new.html', 'project');
    };

    $scope.saveNewProject = function () {
      // todo: empty tasks (newline without data) need to be remove from arrays
      var tasks = {
        todo: $('#project-todo').val().split('\n'),
        current: $('#project-current').val().split('\n'),
        done: $('#project-done').val().split('\n')
      };

      var lastId = 0;

      if ($scope.data.overview.projects.length !== 0) {
        lastId = $scope.data.overview.projects[($scope.data.overview.projects.length - 1)].id;
      }

      $scope.data.new.tasks = tasks;

      $scope.data.new.id = (lastId + 1);


      $scope.data.overview.projects.push($scope.data.new);
      storage.set('module-todos', $scope.data.overview);
      viewer.goToView($scope, 'views/modules/todos/overview.html');
    };

    $scope.updateProject = function () {
      var updatedProject = $scope.data.project;
      for (var i = 0; i < $scope.data.overview.projects.length; i++) {
        var project = $scope.data.overview.projects[i];
        if (project.id === updatedProject.id) {
          console.log('Found your project');
          $scope.data.overview.projects[i] = updatedProject;
          storage.set('module-todos', $scope.data.overview);
        }
      }
      viewer.goToView($scope, 'views/modules/todos/overview.html');
    }


  });
