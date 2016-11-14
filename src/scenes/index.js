import m from "mithril";

import pads from "../comps/pads";
import intro from "../comps/intro";

export default {
    intro : {
        view : (vnode) => {
            return [
                m(pads, vnode.attrs),
                m(intro, vnode.attrs)
            ];
        }
    },
    game : {
        view : (vnode) => {
            return m(pads, vnode.attrs);
        }
    }
};
