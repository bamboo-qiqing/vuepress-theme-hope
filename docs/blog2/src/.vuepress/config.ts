import { defineUserConfig } from "@vuepress/cli";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { path } from "@vuepress/utils";
import { addViteOptimizeDepsInclude } from "vuepress-shared";
import theme from "./theme";

const base = (process.env.BASE || "/") as "/" | `/${string}/`;

export default defineUserConfig({
  base: `${base}blog/`,

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Blog plugin",
      description: "Blog plugin for VuePress2",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "博客插件",
      description: "VuePress2 的博客插件",
    },
  },

  theme,

  plugins: [
    docsearchPlugin({
      appId: "VXIEHELDL1",
      apiKey: "595796f71b6ba14326719682c3738c0c",
      indexName: "vuepress-theme-hope-v2",
      locales: {
        "/zh/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    }),
  ],

  alias: {
    "@theme-hope/components/HomeHero": path.resolve(
      __dirname,
      "./components/HopeHero"
    ),
  },

  extendsBundlerOptions: (config: unknown, app): void => {
    if (app.env.isDev)
      addViteOptimizeDepsInclude({ app, config }, [
        "dayjs",
        "dayjs/plugin/localizedFormat",
        "dayjs/plugin/objectSupport",
        "dayjs/plugin/timezone",
        "dayjs/plugin/utc",
        "vuepress-shared/lib/client",
      ]);

    addViteOptimizeDepsInclude({ app, config }, [
      "three",
      "three/examples/jsm/controls/OrbitControls",
      "three/examples/jsm/loaders/STLLoader",
    ]);
  },

  shouldPrefetch: false,
});
