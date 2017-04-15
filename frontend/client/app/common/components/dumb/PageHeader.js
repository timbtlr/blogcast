module.exports = {
    selector: "pageHeader",
    template: `
		<div class="site-heading" style="width: 100%; text-align:center">
			<img style="height: 125px; margin-top: -75px" src="{{$ctrl.image}}"/>
			<hr class="medium">
		</div>
    `,
    bindings: {
        image: "@"
    }
}
