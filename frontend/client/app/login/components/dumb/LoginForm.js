module.exports = {
    selector: "loginForm",
    template: `
        <div style="height: 1em;">
            {{ $ctrl.error }}
        </div>
        <form novalidate style="margin-top: 10px" ng-submit="$ctrl.click(username, password)" ng-enter="$ctrl.click(username, password)">
            <div class="form-group">
                <label for="username">Username</label>
                <input class="form-control" ng-model="username">

                <label for="password">Password</label>
                <input type="password" class="form-control" ng-model="password">
            </div>

            <button type="button" class="btn btn-primary btn-md" ng-click="$ctrl.click(username, password)">
                Login
            </button>
            <input type="submit" style="position: absolute; left: -9999px; width: 1px; height: 1px;"/>
        </form>
    `,
    bindings: {
        error: "<",
        onChange: "&"
    },
    controller: function() {
        this.click = (username, password) => {
            this.onChange({
                username: username,
                password: password
            })
        }
    }
}
