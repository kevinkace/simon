import m from "mithril";

import css from "./pads.css";

const pads = [ 1, 2, 3, 4 ];

export default {
    view : () =>
        m("section", { class : css.pads },
            pads.map((pad) =>
                m("button", { class : css.pad }, pad)
            )
        )
};
