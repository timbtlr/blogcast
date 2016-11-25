angular.module('blogcast')
    .factory("LoginManager", ["ENV", "localStorageService", function(ENV, localStorageService) {
        var logged_in = false;
        var localStorageVarName = "adminPassword"

        return {
            login: function(password) {
                if (password == ENV.adminPassword) {
                    localStorageService.set(localStorageVarName, CryptoJS.AES.encrypt(password, ENV.loginPassphrase).toString());
                    logged_in = true;
                };
            },
            logout: function() {
                localStorageService.remove(localStorageVarName);
                logged_in = false;
            },
            checkLogin: function() {
                if (logged_in) {
                    return true;
                } else {
                    encrypted = localStorageService.get(localStorageVarName);
                    if (encrypted != null) {
                        existingAdminPassword = CryptoJS.AES.decrypt(encrypted, ENV.loginPassphrase).toString(CryptoJS.enc.Utf8);

                        if (existingAdminPassword == ENV.adminPassword) {
                            logged_in = true;
                            return true;
                        };
                    }
                };
                return false;
            }
        };
    }]);