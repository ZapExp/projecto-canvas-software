import { variants } from "@catppuccin/palette";
import { makeScene2D } from "@motion-canvas/2d";
import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { all, sequence, waitFor } from "@motion-canvas/core/lib/flow";
import { easeOutExpo } from "@motion-canvas/core/lib/tweening";
import { beginSlide, createRef } from "@motion-canvas/core/lib/utils";
import { scaleShow, arcMove } from "../lib/transitions";

const color = variants.frappe;

export default makeScene2D(function* (view) {
  view.fill(color.base.hex);

  const gracias = createRef<Txt>();

  const imagen = createRef<Img>();

  view.add(
    <>
      <Txt
        ref={gracias}
        fontSize={80}
        fill={color.yellow.hex}
      >
        Muchas gracias por su atención
      </Txt>
      <Img
        ref={imagen}
        src={"../../images/rezo.png"}
        size={[500, 500]}
        scale={0}
        y={-100}
      ></Img>
    </>
  );

  //prepare things for animation
  gracias().text("");

  //show title
  yield* gracias().text("Muchas Gracias por su atención", 2);

  //move title
  yield* sequence(
    0.8,
    gracias().position.y(220, 2, easeOutExpo),
    scaleShow(imagen(), 2)
  );

  yield* beginSlide("proxima diapositiva");
  yield* all(gracias().opacity(0, 2), imagen().opacity(0, 2));
});
