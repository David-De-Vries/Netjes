import { useId } from "react";
import { STEP_ICON_BAG_PATH } from "./StepIcon";

export const NET_OUTLINE =
  "M4 4 Q24 10 44 4 Q38 24 44 44 Q24 38 4 44 Q10 24 4 4 Z";

/** Places the 32×32 step-icon bag in the middle of the net. */
export const NET_BAG_TRANSFORM = "translate(24 25) scale(1.15) translate(-16 -17.25)";

const MESH_OFFSETS = Array.from({ length: 17 }, (_, i) => i * 6 - 48);

/** Diagonal mesh lines spanning the 48×48 net viewBox; clip to the outline. */
export function NetMesh() {
  return (
    <>
      {MESH_OFFSETS.map((offset) => (
        <path key={`a${offset}`} d={`M${offset} 0 L${offset + 48} 48`} />
      ))}
      {MESH_OFFSETS.map((offset) => (
        <path key={`b${offset}`} d={`M${offset + 48} 0 L${offset} 48`} />
      ))}
    </>
  );
}

/** Filled trash bag with faint mesh lines over it, in the background colour. */
export function NetBag({ clipId, meshClassName }: { clipId: string; meshClassName: string }) {
  return (
    <>
      <path d={STEP_ICON_BAG_PATH} transform={NET_BAG_TRANSFORM} fill="currentColor" stroke="none" />
      <g clipPath={`url(#${clipId})`} strokeWidth={0.6} opacity={0.55} className={meshClassName}>
        <NetMesh />
      </g>
    </>
  );
}

/**
 * The Netjes logo net. With `bagMeshClassName` set, a trash bag is drawn
 * under the net; pass a text colour class matching the background behind it.
 */
export function NetIcon({
  className,
  bagMeshClassName,
}: {
  className?: string;
  bagMeshClassName?: string;
}) {
  const id = useId().replace(/:/g, "");
  const clipId = `net-icon-${id}`;
  const bagClipId = `net-icon-bag-${id}`;

  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={NET_OUTLINE} />
        </clipPath>
        {bagMeshClassName && (
          <clipPath id={bagClipId}>
            <path d={STEP_ICON_BAG_PATH} transform={NET_BAG_TRANSFORM} />
          </clipPath>
        )}
      </defs>
      <g clipPath={`url(#${clipId})`} strokeWidth={1}>
        <NetMesh />
      </g>
      {bagMeshClassName && <NetBag clipId={bagClipId} meshClassName={bagMeshClassName} />}
      <path d={NET_OUTLINE} strokeWidth={1.8} />
    </svg>
  );
}
