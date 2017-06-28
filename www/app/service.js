/**
 * Created by Ets Simon on 03/06/2017.
 */

service

    .service('API', function (Restangular, BASE_URL, $localStorage, $state, ToastApi) {
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/x.laravel.v1+json',
            'show_loading':true
        }

        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer
                .setBaseUrl(BASE_URL.apiEndpoint)
                .setDefaultHeaders(headers)
                .setErrorInterceptor(function (response) {
                    if (response.status === 422) {
                        // for (var error in response.data.errors) {
                        // return ToastService.error(response.data.errors[error][0])
                        // }
                        console.log(response)
                        ToastApi.api_errors(response.data);
                    }
                    if (response.status === 401) {
                        $state.go('home');
                    }
                })
                .addFullRequestInterceptor(function (element, operation, what, url, headers) {
                    var token = $localStorage.accessToken;
                    if (token) {
                        headers.Authorization = 'Bearer ' + token;
                        headers['Access-Token'] = token
                    }
                })
                .addResponseInterceptor(function (data, operation, what, url, response, deferred) {

                    if (response.headers('X-Page-Total')) {
                        data.metadata = {
                            total: response.headers('X-Page-Total'),
                            per_page: response.headers('X-Per-Page')
                        };

                        return data;
                    }
                    return data
                })
        })

    })


    .factory('ToastApi', function (ionicToast, $document, $translate) {

        return {

            class: ['toast-success', 'toast-error', 'toast-info', 'toast-warning'],
            default: function (param) {
                var pos = param.pos || 'bottom';
                var stay = param.stay || false;
                var delay = param.delay || 5000;
                var msg = $translate.instant(param.msg);

                ionicToast.show(msg, pos, stay, delay, param.background);

                var result = document.getElementsByClassName("toast_section");
                var wrappedResult = angular.element(result);
                var tabc = ['toast-success', 'toast-error', 'toast-info', 'toast-warning'];
                for (var i = 0; i < tabc.lenght; i++) {

                    wrappedResult[0].removeClass(this.class[i]);
                }
                console.log(wrappedResult)
                console.log(param)
                wrappedResult.addClass(param.background);
            },
            success: function (param) {
                param.msg = param.msg || 'success';
                param.background = 'toast-success';
                this.default(param);
            },
            error: function (param) {
                param.msg = param.msg || 'error';
                param.background = 'toast-error';
                this.default(param);
            },
            info: function (param) {
                param.msg = param.msg || 'info';
                param.background = 'toast-info';
                this.default(param);
            },
            warning: function (param) {
                param.msg = param.msg || 'warning';
                param.background = 'toast-warning';
                this.default(param);
            },
            api_errors: function (errors) {

                for (var key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        var txt = errors[key][0];
                        for (var i = 1; i < errors[key].length; i++) {
                            txt += "<br>" + errors[key][i];
                        }
                        key = key.split("_").join(" ");
                        this.error({'msg': key + ' : ' + txt})
                    }
                }
            }
        };


    })

    .factory('customeInterceptor', ['$timeout', '$injector', '$q', function ($timeout, $injector, $q) {

        var requestInitiated;

        function showLoadingText() {
            waitingDialog.show('Loading');

        };

        function hideLoadingText() {
           waitingDialog.hide();
        };

        return {
            request: function (config) {
                requestInitiated = true;
                if(config.headers.show_loading)
                    showLoadingText();
                // console.log('Request Initiated with interceptor');
                return config;
            },
            response: function (response) {
                requestInitiated = false;

                // Show delay of 600ms so the popup will not appear for multiple http request
                $timeout(function () {

                    if (requestInitiated) return;
                    hideLoadingText();
                    // console.log('Response received with interceptor');

                }, 1000);

                return response;
            },
            requestError: function (err) {
                hideLoadingText();
                console.log('Request Error logging via interceptor');
                return err;
            },
            responseError: function (err) {
                hideLoadingText();
                // console.log('Response error via interceptor');
                return $q.reject(err);
            }
        }
    }])
