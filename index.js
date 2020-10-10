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
  
  'danger': '#FC5042',
  'warning': '#FC7A42',
  'success': '#1BB55B',
  'black': '#191B20',
  'text-color': '#191B20',
  
  'font-size': '1rem',
  'line-height': 1.5,
  
  'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", Helvetica Neue, Roboto, sans-serif',
  
  'block-height': '32px',
  'magic-unit': '4px',
  
  'transition-duration': '500ms',
  'transition-function': 'cubic-ease-out',
  
  'button-font-weight': 'bold',
  'button-font-size': '14px',
  'button-font-family': 'inherit',
  'button-letter-spacing': 0,
  'button-border-width': '1px',
  'button-border-radius': '4px',
  
  'input-font-size': 'inherit',
  'input-line-height': 'inherit',
  'input-color': 'inherit',
  'input-border-width': 1,
  'input-border-radius': '4px',
  'checker-width': '24px',
  
  'media': {
    'palm': 768,
    'tablet': 1024,
    'laptop': 1280,
    'desktop': 1440
  }
}

module.exports = postcss.plugin('postcss-trek', (opts = defaults) => root => {
  
  const options = Object.assign({}, defaults, opts);
  
  const plugins = [
    trekVars(options),
    trekCalculations(options),
    trekPxToRem(options),
    trekColor(options),
    trekAnimation(options),
    trekLayer(options)
  ];
  
  root.walkDecls(decl => {
    plugins.forEach(plugin => undefined !== plugin['Declaration'] ? plugin['Declaration'](decl) : null);
  });
  
  root.walkAtRules(atRule => {
    if (atRule.name === 'media') trekAtMedia(options)['AtRule']['media'](atRule);
  })
});