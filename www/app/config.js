/**
 * Created by Ets Simon on 03/06/2017.
 */


config

    .config(function ($ionicConfigProvider, $stateProvider,
                      $urlRouterProvider, $translateProvider) {

        $translateProvider
            .useStaticFilesLoader({
                    files: [{
                        prefix: 'locales/',
                        suffix: '.json'
                    },
                    {
                        prefix: 'dist_locales/',
                        suffix: '.json'
                    }
                    ]
                }
            )
            .registerAvailableLanguageKeys(['en', 'fr'], {
                'en': 'en',
                'en_*': 'en',
                'fr': 'fr',
                'fr_*': 'fr',
            })
            .preferredLanguage('en')
            .fallbackLanguage('en')
            .determinePreferredLanguage()
            .useSanitizeValueStrategy('escapeParameters');

    })

    .config(function ($authProvider, BASE_URL) {

        $authProvider.httpInterceptor = function () {
            return true
        };

        $authProvider.loginUrl = BASE_URL.apiEndpoint + 'signin';
        $authProvider.signupUrl = BASE_URL.apiEndpoint + 'signup';
        $authProvider.tokenRoot = ''  // compensates success response macro
    })


    .config(function ($urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('customeInterceptor');
        $urlRouterProvider.otherwise('/');
    })
