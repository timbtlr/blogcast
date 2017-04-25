import * as blogConstants from "app/blog/actions/constants"
import * as playerConstants from "app/audio/actions/constants"
import * as podcastConstants from "app/podcast/actions/constants"
import * as userConstants from "app/login/actions/constants"

module.exports = function() {
    return {
        ...blogConstants,
        ...playerConstants,
        ...podcastConstants,
        ...userConstants
    }
}()