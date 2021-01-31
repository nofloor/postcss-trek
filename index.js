const postcss = require('postcss');

const trekVars = require('postcss-trek-vars');
const trekCalculations = require('postcss-trek-calculations');
const trekPxToRem = require('postcss-trek-px-to-rem');
const trekColor = require('postcss-trek-color');
const trekAnimation = require('postcss-trek-animation');
const trekAtMedia = require('postcss-trek-at-media');
const trekLayer = require('postcss-trek-layer');

const defaults = {
  'primary-color': '#1774FF',
  'secondary-color': null,
  'text-color': '#191B20',
  
  'danger': '#FC5042',
  'warning': '#FC7A42',
  'success': '#1BB55B',
  'black': '#191B20',
  
  'font-size': '1rem',
  'line-height': 1.5,
  
  'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", Helvetica Neue, Roboto, sans-serif',
  
  'block-height': '40px',
  'magic-unit': '4px',
  
  'transition-duration': '500ms',
  'transition-function': 'cubic-ease-out',
  
  'media': {
    'palm': 768,
    'tablet': 1024,
    'laptop': 1280,
    'desktop': 1440
  }
}

function trek(opts = defaults) {

  const options = Object.assign({}, defaults, opts);

  const plugins = [
    trekVars(options),
    trekCalculations(options),
    trekPxToRem(options),
    trekColor(options),
    trekAnimation(options),
    trekLayer(options)
  ];

  return {
    postcssPlugin: 'postcss-trek',
    AtRule: {
      media: atRule => {
        trekAtMedia(options)['AtRule']['media'](atRule);
      }
    },
    Declaration(decl) {
      plugins.forEach(plugin => undefined !== plugin['Declaration'] ? plugin['Declaration'](decl) : null);
    }
  }
}

trek.postcss = true;

module.exports = trek;