'use strict';

angular.module('frontierApp')
  .controller('TodosCtrl', function ($scope, storage, viewer, ui, utility) {
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
      },
      edit: {}
    };

    console.log($scope.data.overview.projects);

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

    $scope.setUrgency = function () {
      for (var i = 0; i < $scope.data.overview.projects.length; i++) {
        var diff = moment($scope.data.overview.projects[i].due_date).diff(moment(), 'days');
        if (diff < 4) {
          $scope.data.overview.projects[i].urgency = 'red';
        }
        if (diff >= 4 && diff <= 10) {
          $scope.data.overview.projects[i].urgency = 'yellow';
        }
        if (diff > 11) {
          $scope.data.overview.projects[i].urgency = 'green';
        }
      }
    };

    $scope.setUrgency();

    $scope.markAsCurrent = function (project, task) {
      for (var i = 0; i < project.tasks.todo.length; i++) {
        if (project.tasks.todo[i] === task) {
          project.tasks.current.push(project.tasks.todo[i]);
          project.tasks.todo.splice(i, 1);
          storage.set('module-todos', $scope.data.overview);
          break;
        }
      }
    };

    $scope.markAsDone = function (project, task) {
      for (var i = 0; i < project.tasks.current.length; i++) {
        if (project.tasks.current[i] === task) {
          project.tasks.done.push(project.tasks.current[i]);
          project.tasks.current.splice(i, 1);
          storage.set('module-todos', $scope.data.overview);
          break;
        }
      }
    };

    $scope.removeTask = function (type, task) {
      $scope.data.project.tasks[type].splice(task, 1);

      for (var i = 0; i < $scope.data.overview.projects.length; i++) {
        if ($scope.data.overview.projects[i].id === $scope.data.project.id) {
          $scope.data.overview.projects[i].tasks[type] = $scope.data.project.tasks[type];
          storage.set('module-todos', $scope.data.overview);
          break;
        }
      }
    };

    $scope.showNew = function () {
      viewer.goToView($scope, 'views/modules/todos/new.html', 'project');
    };

    $scope.saveNewProject = function () {
      // todo: empty tasks (newline without data) need to be remove from arrays
      var tasks = {
        todo: utility.separateNewlines($('#project-todo').val()),
        current: utility.separateNewlines($('#project-current').val()),
        done: utility.separateNewlines($('#project-done').val())
      };

      var lastId = 0;

      if ($scope.data.overview.projects.length !== 0) {
        lastId = $scope.data.overview.projects[($scope.data.overview.projects.length - 1)].id;
      }

      $scope.data.new.tasks = tasks;

      $scope.data.new.id = (lastId + 1);

      $scope.data.new.due_date = moment($scope.data.new.date + ' ' + $scope.data.new.time).format();


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
    };

    $scope.removeProject = function () {
      for (var i = 0; i < $scope.data.overview.projects.length; i++) {
        if ($scope.data.overview.projects[i].id === $scope.data.project.id) {
          console.log('Found your project');
          $scope.data.overview.projects.splice(i, 1);
          storage.set('module-todos', $scope.data.overview);
          viewer.goToView($scope, 'views/modules/todos/overview.html', 'project');
          break;
        }
      }
    };



  });
