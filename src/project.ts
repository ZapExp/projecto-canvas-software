import {makeProject} from '@motion-canvas/core';

import problem from './scenes/problem?scene';
import solution from './scenes/solution?scene';
import mision from './scenes/mision?scene';
import vision from './scenes/vision?scene';

export default makeProject({
  scenes: [
    problem,
    solution,
    mision,
    vision,
  ],
});
