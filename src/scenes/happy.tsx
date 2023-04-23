import { variants } from "@catppuccin/palette";
import { Img, Txt, Node, Line } from "@motion-canvas/2d/lib/components";
import { makeScene2D } from "@motion-canvas/2d/lib/scenes/makeScene2D";
import { all, chain, sequence, waitFor } from "@motion-canvas/core/lib/flow";
import { createSignal, DEFAULT } from "@motion-canvas/core/lib/signals";
import {
  slideTransition,
  zoomOutTransition,
} from "@motion-canvas/core/lib/transitions";
import { easeInOutSine, linear } from "@motion-canvas/core/lib/tweening";
import { Direction, Vector2 } from "@motion-canvas/core/lib/types";
import {
  beginSlide,
  createRef,
  makeRef,
  range,
  useRandom,
} from "@motion-canvas/core/lib/utils";
import { arcMove, scaleShow } from "../lib/transitions";

const color = variants.frappe;
const random = useRandom(9319);

export default makeScene2D(function* (view) {
  view.fill(color.base.hex);

  const colorArr = [
    color.red.hex,
    color.sky.hex,
    color.green.hex,
    color.yellow.hex,
  ];

  const manPos = Vector2.createSignal([0, 1080 / 2]);
  const scammerPos = Vector2.createSignal([500, -150]);
  const catPos = Vector2.createSignal([-600, -150]);

  const man = createRef<Img>();
  const scammer = createRef<Img>();
  const cat = createRef<Img>();

  const lineMS = createRef<Line>();
  const lineSC = createRef<Line>();

  view.add(
    <>
      <Img
        src={"../../images/person_overwhelmed.png"}
        ref={man}
        position={manPos}
        offsetY={1}
        scale={0.7}
      ></Img>
      <Img
        src={"../../images/fila_concierto.jpg"}
        ref={scammer}
        position={scammerPos}
        scale={0.6}
        radius={20}
        stroke={color.red.hex}
        lineWidth={20}
        clip
      ></Img>
      <Img
        src={"../../images/gato_guitarra.png"}
        ref={cat}
        position={catPos}
        scale={1}
        radius={20}
        stroke={color.green.hex}
        lineWidth={20}
        clip
      ></Img>
      <Line
        ref={lineMS}
        radius={20}
        lineDash={[50, 20]}
        lineWidth={10}
        endArrow
        stroke={color.pink.hex}
        startOffset={200}
        endOffset={300}
        points={() => [
          [manPos().x, manPos().y - 70],
          [scammerPos().x, manPos().y - 70],
          scammerPos(),
        ]}
      ></Line>
      <Line
        ref={lineSC}
        radius={20}
        lineDash={[50, 20]}
        lineWidth={10}
        endArrow
        stroke={color.pink.hex}
        startOffset={500}
        endOffset={300}
        points={() => [scammerPos(), catPos()]}
      ></Line>{" "}
    </>
  );

  //prepare for animation
  cat().scale(1);
  lineMS().end(1);
  lineSC().end(1);
  scammer().scale(0.5);

  //transition
  yield* slideTransition(Direction.Bottom);
  //animation

  yield* waitFor(0.5);

  yield* chain(
    all(man().scale(0, 0.2), scammer().scale(0, 0.2)),
    all(
      scammer().src("../../images/solution_5.jpeg", 0),
      man().src("../../images/happy_man.png", 0)
    ),
    all(
      scaleShow(man(), 1, 0.5),
      scaleShow(scammer(), 1, 0.8),
      scammerPos([600, -150], 1),
      lineMS().endOffset(350, 1),
      lineSC().startOffset(300, 1),
    )
  );

  yield* beginSlide("siguiente diapositiva");
  yield* waitFor(0.5);
});
