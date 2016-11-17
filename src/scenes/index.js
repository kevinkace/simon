import m from "mithril";

import layout from "../comps/layout";
import pads from "../comps/pads";
import intro from "../comps/intro";

export default {
    intro : {
        view : (vnode) =>
            m(layout, [
                m(pads, vnode.attrs),
                m(intro, vnode.attrs)
            ])
    },
    game : {
        view : (vnode) =>
            m(pads, vnode.attrs)
    }
};
