import m from "mithril";

import pads from "../comps/pads";

export default {
    intro : {
        view : (vnode) => {
            return m(pads, vnode.attrs);
        }
    }
};
