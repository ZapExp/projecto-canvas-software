import { variants } from "@catppuccin/palette";
import { makeScene2D } from "@motion-canvas/2d";
import { Img, Line, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { createSignal } from "@motion-canvas/core/lib/signals";
import {
  easeInOutCubic,
  easeInOutSine,
  tween,
} from "@motion-canvas/core/lib/tweening";
import { Vector2 } from "@motion-canvas/core/lib/types";
import { beginSlide, createRef } from "@motion-canvas/core/lib/utils";
import { arcMove, scaleShow } from "../lib/transitions";

const color = variants.frappe;

export default makeScene2D(function*(view) {
  view.fill(color.base.hex);

  const title = createRef<Rect>();
  const titlePos = Vector2.createSignal([0, 0]);
  const image = createRef<Img>();
  const imagePos = Vector2.createSignal([400, 50]);
  const line = createRef<Line>();

  view.add(
    <>
      <Rect
        ref={title}
        stroke={color.yellow.hex}
        lineWidth={10}
        height={120}
        width={400}
        alignItems={"center"}
        justifyContent={"center"}
        radius={20}
        position={titlePos}
      >
        <Txt fill={color.yellow.hex}>Misión</Txt>
      </Rect>
      <Img
        position={imagePos}
        ref={image}
        src={"../../images/mision.jpg"}
        size={[800, 500]}
        radius={20}
        stroke={color.yellow.hex}
        lineWidth={20}
        clip
      ></Img>
      <Line
        ref={line}
        lineDash={[50, 20]}
        lineWidth={10}
        endArrow
        stroke={color.yellow.hex}
        startOffset={100}
        endOffset={450}
        points={() => [titlePos(), [titlePos().x, imagePos().y], imagePos()]}
      ></Line>
    </>
  );

  //hide elements
  title().scale(0);
  image().scale(0);
  line().end(0);

  //animations
  yield* scaleShow(title(), 2);

  yield* beginSlide("mostrar imagen");
  yield* arcMove(titlePos, [-600, -350], 1);
  yield* line().end(1, 2, easeInOutSine);
  yield* scaleShow(image(), 1);

  yield* beginSlide("siguiente diapositiva");
});
