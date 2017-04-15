import * as LoginSelectors from "app/login/selectors/LoginSelectors"

module.exports = {
    selector: "mainLogin",
    template: `
        <login-form error="$ctrl.error" on-change="$ctrl.actions.login(username, password)"></login-form>
    `,
    controller: function($ngRedux, LoginActions) {
        this.actions = LoginActions
        this.mapState = (state) => {
            return {
                error: LoginSelectors.error(state)
            }
        }
        let unsubscribe = $ngRedux.connect(this.mapState)(this)
        this.$onDestroy = function() {
            unsubscribe()
        }
    }
}



