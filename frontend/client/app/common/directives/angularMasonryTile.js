module.exports = () => {
    return {
        restrict: "AC",
        link: function(scope, elem) {
            elem.css("visibility", "hidden")
            let master = elem.parent("*[masonry]:first").scope(),
                update = master.update,
                removeBrick = master.removeBrick,
                appendBricks = master.appendBricks
            if (update) {
                imagesLoaded(elem.get(0), update)
                elem.ready(update)
            }
            if (appendBricks) {
                imagesLoaded(elem.get(0), appendBricks(elem))
            }
            scope.$on("$destroy", function() {
                if (removeBrick) {
                    removeBrick()
                }
            })
        }
    }
}