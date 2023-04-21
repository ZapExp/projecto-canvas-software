import { variants } from "@catppuccin/palette";
import { makeScene2D } from "@motion-canvas/2d";
import { Img, Layout, Node, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { all } from "@motion-canvas/core/lib/flow";
import { SmoothSpring, spring } from "@motion-canvas/core/lib/tweening";
import { beginSlide, createRef } from "@motion-canvas/core/lib/utils";

const color = variants.frappe;

export default makeScene2D(function* (view) {
  view.fill(color.base.hex);

  const tituloMision = createRef<Rect>();
  const imagenMision = createRef<Img>();
  const vision = createRef<Layout>();

  view.add(
    <Layout
      size={[1800, 600]}
      layout
      alignItems={"center"}
      justifyContent={"center"}
      gap={30}
    >
      <Layout
        size={[800, 600]}
        layout
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={30}
      >
        <Rect
          ref={tituloMision}
          stroke={color.yellow.hex}
          lineWidth={10}
          height={"20%"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          radius={20}
        >
          <Txt fill={color.yellow.hex}>Misión</Txt>
        </Rect>
        <Img
          ref={imagenMision}
          src={"../../images/gente_bailando.jpg"}
          height={"0%"}
          width={"100%"}
          radius={20}
          clip
        ></Img>
      </Layout>
      <Layout
        ref={vision}
        scaleY={0}
        size={[0, 600]}
        layout
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={30}
      >
        <Rect
          stroke={color.yellow.hex}
          lineWidth={10}
          height={"20%"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          radius={20}
        >
          <Txt fill={color.yellow.hex}>Visión</Txt>
        </Rect>
        <Img
          src={"../../images/gente_bailando.jpg"}
          height={"80%"}
          width={"100%"}
          radius={20}
          clip
        ></Img>
      </Layout>
    </Layout>
  );

  tituloMision().scale(0);

  yield* show(tituloMision(), 1);
  yield* beginSlide("first slide");

  yield* imagenMision().height("80%", 2);
  yield* beginSlide("second slide");

  yield* all(vision().scale.y(1, 2), vision().width(800, 2));
});

function* show(node: Node, duration: number) {
  yield* spring(SmoothSpring, 0, 100, duration, (value) => {
    node.scale(value / 100);
  });
}
