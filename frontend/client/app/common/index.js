import DropdownMenu from "./components/dumb/DropdownMenu"
import FileUpload from "./components/dumb/FileUpload"
import MultiSelector from "./components/dumb/MultiSelector"
import PageHeader from "./components/dumb/PageHeader"
import SimpleButton from "./components/dumb/SimpleButton"
import SingleInput from "./components/dumb/SingleInput"


module.exports = angular
    .module("common", [])
    .service("RedirectService", require("./redirect"))
    .constant("ENV", require("./envConfig"))
    .component(DropdownMenu.selector, DropdownMenu)
    .component(FileUpload.selector, FileUpload)
    .component(MultiSelector.selector, MultiSelector)
    .component(PageHeader.selector, PageHeader)
    .component(SimpleButton.selector, SimpleButton)
    .component(SingleInput.selector, SingleInput)
    .name