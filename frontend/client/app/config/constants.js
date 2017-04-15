import * as blogConstants from "app/blog/actions/constants"
import * as userConstants from "app/login/actions/constants"

module.exports = function() {
    return {
        ...blogConstants,
        ...userConstants
    }
}()