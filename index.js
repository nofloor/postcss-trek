const trekVars = require('postcss-trek-vars');
const trekColor = require('postcss-trek-color');
const trekAnimation = require('postcss-trek-animation');
const trekAtMedia = require('postcss-trek-at-media');
const trekLayer = require('postcss-trek-layer');

const defaults = {
  'primary-color': '#1774FF',
  
  'font-size': '1rem',
  'line-height': 1.5,
  'font-family': 'sans-serif',
  
  'transition-duration': '400ms',
  'transition-function': 'cubic-ease-in-out',
  
  'media': {
    'palm': 768,
    'tablet': 1024,
    'laptop': 1280,
    'desktop': 1440
  }
}

function trek(options = defaults) {
  const plugins = [
    trekVars(options),
    trekColor(options),
    trekAnimation(options),
    trekLayer(options)
  ];
  
  return {
    postcssPlugin: 'postcss-trek',
    Declaration(decl) {
      plugins.forEach(plugin => undefined !== plugin['Declaration'] ? plugin['Declaration'](decl) : null)
    },
    AtRule: {
      media: atRule => {
        trekAtMedia(options)['AtRule']['media'](atRule);
      }
    }
  }
}

trek.postcss = true;

module.exports = trek;