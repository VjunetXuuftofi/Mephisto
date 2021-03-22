import React from "react";
import { useStore } from "../../model/Store";

// a single frame bounding box for a VideoPlayer
function BBoxFrame({ displayWhen }) {
  const store = useStore();
  const { get } = store;

  const video = {
    height: get(["init", "vidHeight"]),
    width: get(["init", "vidWidth"]),
  };

  const frame = {
    timePoint: 4,
    x: 200,
    y: 20,
    width: 100,
    height: 100,
    label: "left_hand",
  };

  const LABEL_PADDING = 4;

  if (!displayWhen({ frame, store })) {
    return null;
  }

  // const currentFrame = get("layers.Video.data.playedSeconds");
  // if (
  //   !(
  //     currentFrame > frame.timePoint - 0.5 &&
  //     currentFrame < frame.timePoint + 0.5
  //   )
  // ) {
  //   return null;
  // }

  const labelFrames = [frame];
  const scale = 1;

  return (
    <div style={{ pointerEvents: "none" }}>
      <svg
        width={video.width}
        height={video.height}
        style={{
          // top: top - body.top,
          // left: left - body.left,
          pointerEvents: "none",
        }}
      >
        {labelFrames.map((frame) => {
          const rectX = scale * frame.x;
          const rectY = scale * frame.y;
          const c = "red";

          return (
            <React.Fragment key={frame.label}>
              <rect
                x={rectX}
                y={rectY}
                width={scale * frame.width}
                height={scale * frame.height}
                style={{
                  fill: "rgba(255,255,255,0.0)",
                  strokeWidth: 2,
                  stroke: c,
                }}
              />
              <text
                x={rectX - LABEL_PADDING}
                y={rectY - LABEL_PADDING}
                style={{
                  fill: c,
                }}
              >
                {frame.label}
              </text>
            </React.Fragment>
          );
        })}
      </svg>
    </div>
  );
}

export default BBoxFrame;