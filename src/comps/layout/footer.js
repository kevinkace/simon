import m from "mithril";

import css from "./footer.css";

export default {
    view : () =>
        m("footer", { class : css.footer }, "Footer stuff")
};
