import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import problem from './scenes/problem?scene';
import solution from './scenes/solution?scene';
import mision from './scenes/mision?scene';
import vision from './scenes/vision?scene';
import happy  from './scenes/happy?scene';
import tools from './scenes/tools?scene';
import fin from './scenes/fin?scene';

export default makeProject({
  scenes: [
    intro,
    problem,
    solution,
    // mision,
    // vision,
    happy,
    tools,
    fin
  ],
});
