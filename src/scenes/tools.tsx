import { variants } from "@catppuccin/palette";
import { makeScene2D } from "@motion-canvas/2d";
import { Img, Node } from "@motion-canvas/2d/lib/components";
import { waitFor } from "@motion-canvas/core/lib/flow";
import { fadeTransition, slideTransition, zoomOutTransition } from "@motion-canvas/core/lib/transitions";
import { Direction, PossibleVector2 } from "@motion-canvas/core/lib/types";
import { beginSlide, createRef } from "@motion-canvas/core/lib/utils";
import { scaleShow } from "../lib/transitions";

const color = variants.frappe

export default makeScene2D(function* (view) {
  const root = createRef<Node>();
  view.add(<Node ref={root}></Node>);

  const addImage = function* (
    path: string,
    position: PossibleVector2,
    scale: number
  ) {
    const ref = createRef<Img>();
    root().add(
      <Img
        ref={ref}
        src={path}
        scale={0}
      ></Img>
    );

    yield* scaleShow(ref(), 1, scale);
    yield* ref().position(position, 1);
  };

  yield* slideTransition(Direction.Right)

  yield* view.fill(color.text.hex, 1)

  yield* addImage("../../images/html.png", [-650, -250], 0.5);
  yield* addImage("../../images/tailwind.png", [-650, 250], 0.5);
  yield* addImage("../../images/typescript.jpeg", [0, -250], 0.9);
  yield* addImage("../../images/svelte.png", [0, 250], 0.6);
  yield* addImage("../../images/postgres.png", [650, -250], 0.5);
  yield* addImage("../../images/prisma.png", [650, 250], 0.7);

  yield* beginSlide("proxima diapositiva")
  yield* root().opacity(0, 1)
});
