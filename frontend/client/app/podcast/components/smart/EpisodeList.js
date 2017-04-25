import * as PodcastSelectors from "app/podcast/selectors/PodcastSelectors"

module.exports = {
    selector: "episodeList",
    template: `
        <page-header image="images/images/PodcastTitle.png"></page-header>
        <playlist items="$ctrl.episodes" on-select="$ctrl.actions.selectEpisode(item)"></playlist>
    `,
    controller: function($ngRedux, PodcastActions) {
        this.actions = PodcastActions
        this.mapState = (state) => {
            return {
                episodes: PodcastSelectors.formattedEpisodeList(state)
            }
        }
        let unsubscribe = $ngRedux.connect(this.mapState)(this)
        this.$onDestroy = function() {
            unsubscribe()
        }
    }
}



