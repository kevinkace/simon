import m from "mithril";

import layout from "../comps/layout";
import pads from "../comps/pads";
import intro from "../comps/intro";
import lost from "../comps/lost";

export default {
    intro : {
        view : (vnode) =>
            // m(layout, vnode.attrs, [
            //     m(pads, vnode.attrs),
                m(intro, vnode.attrs)
            // ])
    },
    game : {
        view : (vnode) =>
            m(layout, vnode.attrs, [
                m(pads, vnode.attrs)
            ])
    },
    lost : {
        view : (vnode) =>
            m(layout, vnode.attrs, [
                m(pads, vnode.attrs),
                m(lost, vnode.attrs)
            ])
    }
};
