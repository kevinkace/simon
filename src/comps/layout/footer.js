import m from "mithril";

import css from "./footer.css";

export default {
    view : (vnode) =>
        m("footer", { class : css.footer },
            vnode.attrs.state.gameState ?
                vnode.attrs.state.gameState.pattern.length :
                null
        )
};
