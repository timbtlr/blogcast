import * as PodcastSelectors from "app/podcast/selectors/PodcastSelectors"
import * as UserSelectors from "app/login/selectors/UserSelectors"
import lodash from "lodash"

module.exports = {
    selector: "uploadEpisodeForm",
    template: `
        <single-input label="'Title'" ng-model="$ctrl.title"></single-input>
        <single-input label="'Description'" ng-model="$ctrl.description"></single-input>
        <file-upload label="'Upload Episode Image'" button-label="'Select Image File'" on-select="$ctrl.selectImage(file)"></file-upload>
        <blog-header ng-if="$ctrl.image" image="{{ $ctrl.image }}"></blog-header>
        <file-upload label="'Select Episode Audio File'" button-label="'Select Audio File'" on-select="$ctrl.selectAudio(file)"></file-upload>
        <span ng-if="$ctrl.audioFile">File selected: {{ $ctrl.audioFile }}</span>
        <simple-button label="'Upload Episode'" btn-class="'btn-success'" on-click="$ctrl.createEpisode()" hide="!$ctrl.isAdmin" disable="!$ctrl.canUpload()"></simple-button>
        
        <dropdown-menu ng-if="$ctrl.isAdmin" options="$ctrl.episodes" active="$ctrl.activeEpisode" on-click="$ctrl.deleteEpisode(item)" data-toggle="modal" data-target="#deletePostModal"></dropdown-menu>  
        <delete-modal title="$ctrl.deletingEpisode.title" id="$ctrl.deletingEpisode.id" on-click="$ctrl.actions.deleteEpisode(id)"></delete-modal>
    `,
    controller: function($ngRedux, PodcastActions) {
        this.actions = PodcastActions

        this.image = null
        this.audioFile = null

        this.deleteEpisode = (item) => {
            this.deletingEpisode = item
        }

        this.selectImage = (file) => {
            this.image = file
        }

        this.selectAudio = (file) => {
            this.audioFile = file
        }

        this.isEmpty = (obj) => {
            return lodash.isUndefined(obj) ||
                   lodash.isNull(obj) ||
                   lodash.isEmpty(obj)
        }

        this.canUpload = () => {
            const inputs = [this.title, this.description, this.image, this.audioFile]
            return inputs.every(obj => !this.isEmpty(obj))
        }

        this.createEpisode = () => {
            this.actions.createEpisode(this.title, this.description, this.audioFile, this.image)
        }

        this.mapState = (state) => {
            return {
                episodes: PodcastSelectors.formattedEpisodeListForDelete(state),
                activeEpisode: PodcastSelectors.formattedEpisodeListForDelete(state)[0],
                isLoggedIn: UserSelectors.isLoggedIn(state),
                isAdmin: UserSelectors.isAdmin(state)
            }
        }
        let unsubscribe = $ngRedux.connect(this.mapState)(this)
        this.$onDestroy = function() {
            unsubscribe()
        }
    }
}



