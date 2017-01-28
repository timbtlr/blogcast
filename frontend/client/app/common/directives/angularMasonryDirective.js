module.exports = ($timeout) => {
    return {
        restrict: "AC",
        link: function(scope, elem, attrs) {
            let container = elem[0]
            let options = angular.extend({
                itemSelector: ".item"
            }, angular.fromJson(attrs.masonry))

            let masonry = scope.masonry = new Masonry(container, options)

            let debounceTimeout = 0
            scope.update = function() {
                if (debounceTimeout) {
                    $timeout.cancel(debounceTimeout)
                }
                debounceTimeout = $timeout(function() {
                    debounceTimeout = 0

                    masonry.reloadItems()
                    masonry.layout()

                    elem.children(options.itemSelector).css("visibility", "visible")
                }, 120)
            }

            scope.removeBrick = function() {
                $timeout(function() {
                    masonry.reloadItems()
                    masonry.layout()
                }, 500)
            }

            scope.appendBricks = function(ele) {
                masonry.appended(ele)
            }

            scope.$on("masonry.layout", function() {
                masonry.layout()
            })

            scope.update()
        }
    }
}
