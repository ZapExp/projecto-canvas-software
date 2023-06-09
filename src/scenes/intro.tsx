import { variants } from "@catppuccin/palette";
import { makeScene2D } from "@motion-canvas/2d";
import { Img, Txt } from "@motion-canvas/2d/lib/components";
import { all, sequence, waitFor } from "@motion-canvas/core/lib/flow";
import { easeInOutSine, linear } from "@motion-canvas/core/lib/tweening";
import { beginSlide, createRef } from "@motion-canvas/core/lib/utils";
import { scaleShow, arcMove } from "../lib/transitions";

const color = variants.frappe;

export default makeScene2D(function* (view) {
  view.fill(color.base.hex);

  const title = createRef<Txt>();
  const takiy = createRef<Txt>();
  const integrantes = createRef<Txt>();

  const logo = createRef<Img>();

  view.add(
    <>
      <Txt
        ref={title}
        fontSize={80}
        fill={color.yellow.hex}
        y={-100}
      >
        Sistema de gestión de conciertos
      </Txt>

      <Txt
        ref={takiy}
        fontSize={200}
        fill={color.yellow.hex}
        y={100}
      >
        Takiy
      </Txt>
      <Img
        ref={logo}
        src={"../../images/takiy.png"}
        size={[700, 700]}
        position={[-500, -150]}
        scale={0}
      ></Img>
      <Txt        ref={integrantes}
        fontSize={90}
        fill={color.green.hex}
        x={400}
        text={`
INTEGRANTES:

David Viveros
Gabriel Tovar
Eliana Zambrano 
Valeria Miramag
`}
      ></Txt>
    </>
  );

  //prepare things for animation
  title().text("");
  takiy().text("");
  integrantes().text("")


  yield* beginSlide("Empezar presentación")
  //show title
  yield* title().text("Plataforma web de venta de boletos", 2, linear);
  yield* takiy().text("TAKIY", 2, linear);

  //move title
  yield* all(
    title().opacity(0, 2),
    sequence(1, arcMove(takiy().position, [-500, 350], 2), scaleShow(logo(), 2))
  );
  yield* integrantes().text(`
INTEGRANTES:

David Viveros
Gabriel Tovar
Eliana Zambrano 
Valeria Miramag
`, 4, linear)

  yield* beginSlide("proxima diapositiva")
});
