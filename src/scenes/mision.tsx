import { variants } from "@catppuccin/palette";
import { makeScene2D } from "@motion-canvas/2d";
import { Img, Line, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { all } from "@motion-canvas/core/lib/flow";
import { slideTransition } from "@motion-canvas/core/lib/transitions";
import { easeInOutSine } from "@motion-canvas/core/lib/tweening";
import { Direction, Vector2 } from "@motion-canvas/core/lib/types";
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
  const lineText = createRef<Txt>();

  view.add(
    <>
      <Rect
        ref={title}
        stroke={color.yellow.hex}
        lineWidth={10}
        height={120}
        width={400}
        layout
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
        radius={20}
        lineDash={[50, 20]}
        lineWidth={10}
        endArrow
        stroke={color.green.hex}
        startOffset={100}
        endOffset={450}
        points={() => [titlePos(), [titlePos().x, imagePos().y], imagePos()]}
      ></Line>
      <Txt
        ref={lineText}
        position={() => [titlePos().x + 250, imagePos().y - 50]}
        fill={color.green.hex}
      >
        Se trata de
      </Txt>
    </>
  );

  //hide elements
  title().scale(0);
  image().scale(0);
  line().end(0);
  lineText().opacity(0);
  lineText().position.y(lineText().position.y() + 50);

  //transitions
  yield* slideTransition(Direction.Top);
  //animations
  yield* scaleShow(title(), 2);

  yield* beginSlide("mostrar imagen");
  yield* arcMove(titlePos, [-600, -350], 1);
  yield* line().end(1, 2, easeInOutSine);
  yield* all(
    lineText().position.y(lineText().position.y() - 50, 1),
    lineText().opacity(1, 1)
  );
  yield* scaleShow(image(), 1);

  yield* beginSlide("siguiente diapositiva");
});
