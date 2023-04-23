import { variants } from "@catppuccin/palette";
import { makeScene2D } from "@motion-canvas/2d";
import { Img, Rect, Node } from "@motion-canvas/2d/lib/components";
import { all, chain, sequence, waitFor } from "@motion-canvas/core/lib/flow";
import { createSignal, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { slideTransition, zoomInTransition } from "@motion-canvas/core/lib/transitions";
import {
  easeInExpo,
  easeInOutSine,
  easeOutExpo,
} from "@motion-canvas/core/lib/tweening";
import { BBox, Direction } from "@motion-canvas/core/lib/types";
import { beginSlide, createRef } from "@motion-canvas/core/lib/utils";

const color = variants.frappe;

export default makeScene2D(function* (view) {
  view.fill(color.base.hex);
  const distance = 2500;

  const angle = createSignal(0);
  const scale = createSignal(1.2);

  const main = createRef<Img>();
  const aux = createRef<Img>();
  const wojack = createRef<Img>();

  view.add(
    <>
      <Node scale={scale}>
        <Node
          y={distance}
          rotation={angle}
        >
          {/* main */}
          <Node rotation={0}>
            <Img
              clip
              ref={main}
              src={""}
              y={-distance}
              radius={20}
              stroke={color.blue.hex}
              lineWidth={20}
            ></Img>
          </Node>
          {/* aux */}
          <Node rotation={45}>
            <Img
              clip
              ref={aux}
              src={""}
              y={-distance}
              radius={20}
              stroke={color.blue.hex}
              lineWidth={20}
            ></Img>
          </Node>
        </Node>
        <Img
          ref={wojack}
          scale={0}
          src={"../../images/wojack.png"}
          offsetX={1}
          offsetY={1}
          position={[1920 / 2, 1080 / 2]}
        ></Img>
        <Img
          src={"../../images/fondo_cinta.png"}
          opacity={0.7}
          size={[1920, 1080]}
        ></Img>
      </Node>
    </>
  );

  const changeImageWojack = function* (
    path: string,
    imageScale: number,
    duration: number
  ) {
    aux().scale(imageScale);
    aux().src(path);

    yield* chain(
      all(scale(1, 1, easeOutExpo), wojack().scale(2, 1, easeOutExpo)),
      angle(-45, duration, easeOutExpo),
      all(scale(1.2, 1.4, easeOutExpo), wojack().scale(0, 1.4, easeOutExpo)),
    );

    main().scale(imageScale);
    main().src(path);

    angle(0);
  };

  const changeImage = function* (
    path: string,
    imageScale: number,
    duration: number
  ) {
    aux().scale(imageScale);
    aux().src(path);

    yield* chain(
      scale(1, 1, easeOutExpo),
      angle(-45, duration, easeOutExpo),
      scale(1.2, 1.4, easeOutExpo)
    );

    main().scale(imageScale);
    main().src(path);

    angle(0);
  };

  //transitions
  // yield* zoomInTransition(new BBox(20, 320, 50, 50), 1);
  yield slideTransition(Direction.Top)
  yield* waitFor(1)
  // yield* angle(45, 3);
  yield* changeImageWojack("../../images/solution_1.jpeg", 1, 2);
  yield* beginSlide("imagen 1");
  yield* changeImage("../../images/solution_2.jpeg", 0.5, 2);
  yield* beginSlide("imagen 2");
  yield* changeImage("../../images/solution_3.jpeg", 0.8, 2);
  yield* beginSlide("imagen 3");
  yield* changeImage("../../images/solution_4.png", 1, 2);
  yield* beginSlide("imagen 4");
  yield* changeImage("../../images/solution_5.jpeg", 0.5, 2);
  yield* beginSlide("imagen 5");
  yield* changeImage("../../images/solution_6.jpg", 1, 2);
  yield* beginSlide("imagen 6");
  yield* changeImage("../../images/solution_7.jpeg", 2.8, 2);
  yield* beginSlide("imagen 7");

  waitFor(1);
});
