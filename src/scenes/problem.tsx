import { variants } from "@catppuccin/palette";
import { Img, Txt, Node, Line } from "@motion-canvas/2d/lib/components";
import { makeScene2D } from "@motion-canvas/2d/lib/scenes/makeScene2D";
import { all, sequence, waitFor } from "@motion-canvas/core/lib/flow";
import { createSignal, DEFAULT } from "@motion-canvas/core/lib/signals";
import { easeInOutSine, linear } from "@motion-canvas/core/lib/tweening";
import { Vector2 } from "@motion-canvas/core/lib/types";
import {
  beginSlide,
  createRef,
  makeRef,
  range,
  useRandom,
} from "@motion-canvas/core/lib/utils";
import { scaleShow } from "../lib/transitions";

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
  const scammerPos = Vector2.createSignal([600, -200]);
  const catPos = Vector2.createSignal([-600, -200]);

  const man = createRef<Img>();
  const scammer = createRef<Img>();
  const cat = createRef<Img>();

  const lineMS = createRef<Line>();
  const lineSC = createRef<Line>();

  const text = createRef<Txt>();

  const questionMarks: Txt[] = [];

  view.add(
    <>
      <Node position={manPos}>
        {range(10).map((idx) => (
          <Txt
            scale={0}
            ref={makeRef(questionMarks, idx)}
            fontSize={400}
            fill={colorArr[random.nextInt(0, colorArr.length - 1)]}
            position={[random.nextInt(-900, 900), random.nextInt(-900, -100)]}
          >
            ?
          </Txt>
        ))}
      </Node>
      <Img
        src={"../../images/person_overwhelmed.png"}
        ref={man}
        position={manPos}
        offsetY={1}
        scale={0.8}
      ></Img>
      <Img
        src={"../../images/hombre_agarrando_dinero.jpg"}
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
        startOffset={250}
        endOffset={300}
        points={() => [scammerPos(), catPos()]}
      ></Line>{" "}
      <Txt
        ref={text}
        fontSize={300}
        fill={color.red.hex}
        stroke={color.base.hex }
        lineWidth={10}
        y={-200}
      >
        ¿Y ahora?
      </Txt>
    </>
  );

  //prepare for animation
  manPos([0, 1080]);
  catPos([-400, 0]);
  cat().scale(0);
  lineMS().end(0);
  lineSC().end(0);
  scammer().scale(0);
  text().scale(0);
  //animation

  //man appears
  yield* manPos([0, 1080 / 2], 1);
  yield* manPos([500, 1080 / 2], 1);
  //cat appears
  yield* scaleShow(cat(), 1, 1.7);

  //cat and man back to original
  yield* beginSlide("mostrar vendedor");
  yield* sequence(
    0.2,
    all(catPos([-600, -200], 1), cat().scale(1, 1)),
    manPos([0, 1080 / 2], 1)
  );
  //show line and scammer
  yield* lineMS().end(1, 1, easeInOutSine);
  yield* scaleShow(scammer(), 1, 0.6);
  yield* lineSC().end(1, 1, easeInOutSine);

  //question marks
  yield* beginSlide("mostrar preguntas");
  //hide all but man
  yield* all(
    cat().opacity(0, 1),
    lineMS().opacity(0, 1),
    lineSC().opacity(0, 1),
    scammer().opacity(0, 1)
  );

  yield* sequence(
    3.5,
    sequence(0.2, ...questionMarks.map((txt) => moveRandom(txt, 4))),
    scaleShow(text(), 1)
  );

  yield* beginSlide("siguiente diapositiva");
});

function* moveRandom(node: Node, duration: number) {
  let x = node.position.x();
  if (x > 0) {
    x -= 1200;
  } else x += 1200;

  yield* sequence(
    duration - 1 - 0.4,
    all(scaleShow(node, 1), node.position.x(x, duration - 1, linear)),
    node.opacity(0, 1)
  );
}
