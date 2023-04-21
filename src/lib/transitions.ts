import { Node } from "@motion-canvas/2d/lib/components";
import {
  easeInOutCubic,
  SmoothSpring,
  spring,
  tween,
  TimingFunction,
} from "@motion-canvas/core/lib/tweening";
import {
  PossibleVector2,
  Vector2,
  Vector2Signal,
} from "@motion-canvas/core/lib/types";

export function* scaleShow(node: Node, duration: number) {
  yield* spring(SmoothSpring, 0, 100, duration, (value) => {
    node.scale(value / 100);
  });
}

export function* arcMove(
  vectorSignal: Vector2Signal<void>,
  to: PossibleVector2,
  duration: number,
  timingFunc: TimingFunction = easeInOutCubic
) {
  const start = vectorSignal();
  const end = new Vector2(to);

  yield* tween(duration, (value) => {
    vectorSignal(Vector2.arcLerp(start, end, timingFunc(value)));
  });
}
