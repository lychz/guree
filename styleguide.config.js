const path = require("path");
const { version } = require("./package");
const webpackConfig = require("./config/webpack.config.js")();

module.exports = {
  components: "src/components/**/[A-Z]*.tsx",
  defaultExample: true,
  moduleAliases: {
    "@components": path.resolve(__dirname, "src/components"),
  },
  ribbon: {
    url: "https://github.com/styleguidist/react-styleguidist",
  },
  webpackConfig: {
    resolve: webpackConfig.resolve,
    module: webpackConfig.module,
  },
  version,
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
    {
      shouldExtractLiteralValuesFromEnum: true,
      savePropValueAsString: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop, component) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes("node_modules");
        }

        return true;
      },
    }
  ).parse,
  require: [path.join(__dirname, "styleguide.styles.css")],
  sortProps: (props) => props,
  pagePerSection: true,
	sections: [
    {
      name: '介绍',
      content: 'introduction.md',
    },
    {
      name: '基础组件',
      components: [
				'src/components/Button/Button.tsx',
				'src/components/Icon/Icon.tsx',
			],
			sectionDepth: 1
		},
		{
      name: '布局组件',
      components: [
				'src/components/Col/Col.tsx',
				'src/components/Row/Row.tsx',
			],
			sectionDepth: 1
    },
  ]
};
