import trekVars from 'postcss-trek-vars';
import trekColor from 'postcss-trek-color';
import trekAnimation from 'postcss-trek-animation';
import trekAtMedia from 'postcss-trek-at-media';
import trekLayer from 'postcss-trek-layer';

const defaults = {
  'primary-color': '#abcdef',
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

export default trek;