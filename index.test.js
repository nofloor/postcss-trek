const postcss = require('postcss');
const Color = require('color');
const trek = require('./index');

test('Trek Vars', () => {
  let css = 'font-size: -trek-font-size;';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('font-size: 1rem;');
    });
  
  css = 'font: bold -trek-font-size/-trek-line-height sans-serif;';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('font: bold 1rem/1.5 sans-serif;');
    });
});

test('Trek Calculations', () => {
  let css = 'font-size: (1 / 2);';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('font-size: 0.5;');
    });
  
  css = 'padding: 0 (12*2em/(2+1)) 8px (3.5rem*2);';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('padding: 0 8em 0.5rem 7rem;');
    });
  
  css = 'padding: 0 (-trek-block-height / 2);';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('padding: 0 1rem;');
    });
});

test('Trek Select', () => {
  let css = 'font-size: select(-trek-padding, -trek-font-size, 30px);';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('font-size: 1rem;');
    });

  css = 'padding: 0 select(-trek-top, (12*2em/(2+1)), -trek-font-size);';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('padding: 0 8em;');
    });

  css = 'padding: 0 select( -trek-dark, -trek-block-height  , 20px);';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('padding: 0 2rem;');
    });
});

test('Trek PX to REM', () => {
  let css = 'font-size: 16px;';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('font-size: 1rem;');
    });
  
  css = 'padding: 0 12px 8px 0;';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('padding: 0 0.75rem 0.5rem 0;');
    });
});

test('Trek Color', () => {
  let css = 'color: mix(#123456, #abcdef, 0.3);';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`color: ${Color('#123456').mix(Color('#abcdef'), 0.3).hex()};`);
    });
  
  css = 'color: tint(#123456, 0.3);';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`color: ${Color('#123456').mix(Color('#FFFFFF'), 0.7).hex()};`);
    });
  
  css = 'color: shade(#123456, 0.3);';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`color: ${Color('#123456').mix(Color('#000000'), 0.3).hex()};`);
    });
});

test('Trek Animation', () => {
  let css = '-trek-transition: color;';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('transition-property: color;transition-duration: 500ms;transition-timing-function: cubic-bezier(0.215,0.610,0.355,1.000);');
    });
  
  css = '-trek-transition: color border;';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('transition-property: color, border;transition-duration: 500ms;transition-timing-function: cubic-bezier(0.215,0.610,0.355,1.000);');
    });
});

test('Trek Layer', () => {
  let css = '-trek-layer: 3;';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('position: absolute;left: 0;top: 0;z-index: 3;width: 100%;height: 100%;');
    });
});

test('Trek At Media', () => {
  let css = '@media palm {}';
  postcss([trek])
    .process(css, {from: undefined})
    .then(result => {
      expect(result.css).toBe('@media screen and (max-width: 1023px) {}');
    });
});