import {makeProject} from '@motion-canvas/core';

import mision from './scenes/mision?scene';
import vision from './scenes/vision?scene';

export default makeProject({
  scenes: [
    mision,
    vision,
  ],
});
