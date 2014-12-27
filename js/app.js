(function () {

    var app = angular.module('main', ['ngCookies', 'ngSanitize', 'ui.router', 'pascalprecht.translate']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("");

        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "partials/home.html",
                controller : function($translatePartialLoader, $translate){
                    $translatePartialLoader.addPart('home');
                    $translate.refresh();
                }
            })
            .state('index', {
                url: "",
                templateUrl: "partials/home.html",
                controller : function($translatePartialLoader, $translate){
                    $translatePartialLoader.addPart('home');
                    $translate.refresh();
                }
            })
            .state('cv', {
                url: "/cv",
                templateUrl: "partials/cv.html",
                controller : function($translatePartialLoader, $translate){
                    $translatePartialLoader.addPart('cv');
                    $translate.refresh();
                }
            })
            .state('projects', {
                url: "/projects",
                templateUrl: "partials/projects.html",
                controller : function($translatePartialLoader, $translate){
                    $translatePartialLoader.addPart('projects');
                    $translate.refresh();
                }
            });
    }]);

    app.config( function ($translateProvider,$translatePartialLoaderProvider) {

        // TODO pull request to angular-translate
        var getLocale = function () {
            var availableLang = ['en', 'fr'];
            var nav = window.navigator;
            var locale = ((angular.isArray(nav.languages) ? nav.languages[0] : nav.language || nav.browserLanguage || nav.systemLanguage || nav.userLanguage) || '').split('-').join('_');

            var lang_id = locale.substr(0, 2);
            if (!locale || locale.length == 0 || availableLang.indexOf(lang_id) == -1) {
                locale = 'en';
            }
            return lang_id;
        };

        $translatePartialLoaderProvider.addPart('common');

        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{part}/locale-{lang}.json'
        });

        $translateProvider.determinePreferredLanguage(function () {
            return getLocale();
        });
    });


    })();