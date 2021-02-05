import Vue from "vue";
import { ensureExt, isExternal, isMailto, isTel } from "@theme/util/path";

import type { PropType } from "vue";
import type { NavBarConfigItem } from "@theme/util/navbar";

export default Vue.extend({
  name: "NavLink",

  props: {
    item: { type: Object as PropType<NavBarConfigItem>, required: true },
  },

  computed: {
    link(): string {
      return ensureExt(this.item.link as string);
    },

    iconPrefix(): string {
      const { iconPrefix } = this.$themeConfig;

      return iconPrefix === "" ? "" : iconPrefix || "icon-";
    },

    active(): boolean {
      return this.$route.path.startsWith(this.link);
    },

    isNonHttpURI(): boolean {
      return isMailto(this.link) || isTel(this.link);
    },

    isBlankTarget(): boolean {
      return this.target === "_blank";
    },

    isInternal(): boolean {
      return !isExternal(this.link) && !this.isBlankTarget;
    },

    target(): string | null {
      if (this.isNonHttpURI) return null;

      if (this.item.target) return this.item.target;

      return isExternal(this.link) ? "_blank" : "";
    },

    rel(): string | null {
      if (this.isNonHttpURI) return null;
      if (this.item.rel === false) return null;
      if (this.item.rel) return this.item.rel;

      return this.isBlankTarget ? "noopener noreferrer" : null;
    },
  },

  methods: {
    focusoutAction(): void {
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit("focusout");
    },
  },
});
