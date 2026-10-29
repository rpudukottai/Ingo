export const REELMARK_CARD_COUNT = 10;
export const REELMARK_CARD_PITCH_U = 196;
export const REELMARK_TRACK_PERIOD_U =
  REELMARK_CARD_COUNT * REELMARK_CARD_PITCH_U; // 1960u
export const REELMARK_FRAME_CENTER_X_U = 720;
export const REELMARK_NORM_RADIUS_U = 706;
export const REELMARK_CORNER_RADIUS_U = 15;
export const REELMARK_TILE_ASPECT = 384 / 540; // 0.711111...

export interface ReelmarkCardGeometryU {
  cardIndex: number;
  /** Unpushed offset t in [-980, +980] from center 720 */
  unpushedOffsetU: number;
  /** Pushed center X in frame units */
  centerXU: number;
  /** Normalized center distance d = |x - 720| / 706 */
  normDistD: number;
  /** Card width in frame units: 170 + 48 * d^2 */
  widthU: number;
  /** Left edge X in frame units */
  leftXU: number;
  /** Right edge X in frame units */
  rightXU: number;
  /** Left vertical edge height in frame units: 280 + 92 * qL^2.6 */
  leftHeightU: number;
  /** Right vertical edge height in frame units: 280 + 92 * qR^2.6 */
  rightHeightU: number;
  /** Vertical center Y in frame units: 687 - 12 * d^2 */
  centerYU: number;
  /** Bounding box top Y in frame units */
  boxTopYU: number;
  /** Bounding box height in frame units: max(leftHeightU, rightHeightU) */
  boxHeightU: number;
  /** Local Y of top-left corner within bounding box (in u) */
  localTopLeftYU: number;
  /** Local Y of top-right corner within bounding box (in u) */
  localTopRightYU: number;
  /** Local Y of bottom-right corner within bounding box (in u) */
  localBottomRightYU: number;
  /** Local Y of bottom-left corner within bounding box (in u) */
  localBottomLeftYU: number;
}

/**
 * Wraps an arbitrary offset into the symmetric interval [-period/2, +period/2).
 */
export function wrapSymmetricOffset(offset: number, period: number): number {
  const half = period * 0.5;
  const mod = (((offset + half) % period) + period) % period;
  return mod - half;
}

/**
 * Computes the exact cylindrical geometry for a single card in 1440x1080 frame units (u).
 */
export function computeReelmarkCardGeometry(
  cardIndex: number,
  scrollOffsetU: number
): ReelmarkCardGeometryU {
  const rawOffset = cardIndex * REELMARK_CARD_PITCH_U - scrollOffsetU;
  const t = wrapSymmetricOffset(rawOffset, REELMARK_TRACK_PERIOD_U);

  const tNorm = t / REELMARK_NORM_RADIUS_U;
  const centerXU =
    REELMARK_FRAME_CENTER_X_U + t * (1 + 0.083 * tNorm * tNorm);

  const normDistD =
    Math.abs(centerXU - REELMARK_FRAME_CENTER_X_U) / REELMARK_NORM_RADIUS_U;
  const widthU = 170 + 48 * normDistD * normDistD;

  const leftXU = centerXU - widthU * 0.5;
  const rightXU = centerXU + widthU * 0.5;

  const qL =
    Math.abs(leftXU - REELMARK_FRAME_CENTER_X_U) / REELMARK_NORM_RADIUS_U;
  const qR =
    Math.abs(rightXU - REELMARK_FRAME_CENTER_X_U) / REELMARK_NORM_RADIUS_U;

  const leftHeightU = 280 + 92 * Math.pow(qL, 2.6);
  const rightHeightU = 280 + 92 * Math.pow(qR, 2.6);

  const centerYU = 687 - 12 * normDistD * normDistD;

  const boxHeightU = Math.max(leftHeightU, rightHeightU);
  const boxTopYU = centerYU - boxHeightU * 0.5;

  const topLeftYU = centerYU - leftHeightU * 0.5;
  const topRightYU = centerYU - rightHeightU * 0.5;
  const bottomRightYU = centerYU + rightHeightU * 0.5;
  const bottomLeftYU = centerYU + leftHeightU * 0.5;

  return {
    cardIndex,
    unpushedOffsetU: t,
    centerXU,
    normDistD,
    widthU,
    leftXU,
    rightXU,
    leftHeightU,
    rightHeightU,
    centerYU,
    boxTopYU,
    boxHeightU,
    localTopLeftYU: topLeftYU - boxTopYU,
    localTopRightYU: topRightYU - boxTopYU,
    localBottomRightYU: bottomRightYU - boxTopYU,
    localBottomLeftYU: bottomLeftYU - boxTopYU,
  };
}

/**
 * Builds a rounded quadrilateral SVG path string (`M ... L ... Q ... Z`) in pixel coordinates
 * for `clip-path: path('...')` given the card geometry and current pixel scale `uPx`.
 */
export function buildRoundedQuadClipPath(
  geom: ReelmarkCardGeometryU,
  uPx: number,
  cornerRadiusU: number = REELMARK_CORNER_RADIUS_U
): string {
  const w = geom.widthU * uPx;
  const yTL = geom.localTopLeftYU * uPx;
  const yTR = geom.localTopRightYU * uPx;
  const yBR = geom.localBottomRightYU * uPx;
  const yBL = geom.localBottomLeftYU * uPx;
  const r = Math.min(cornerRadiusU * uPx, w * 0.25);

  // Top edge vector: (0, yTL) -> (w, yTR)
  const topDx = w;
  const topDy = yTR - yTL;
  const topLen = Math.hypot(topDx, topDy) || 1;
  const topUx = topDx / topLen;
  const topUy = topDy / topLen;

  // Bottom edge vector: (w, yBR) -> (0, yBL)
  const botDx = -w;
  const botDy = yBL - yBR;
  const botLen = Math.hypot(botDx, botDy) || 1;
  const botUx = botDx / botLen;
  const botUy = botDy / botLen;

  // Top-Left corner (0, yTL): arrives along left vertical edge (0, yBL -> 0, yTL), leaves along top edge
  const tlStartX = 0;
  const tlStartY = yTL + r;
  const tlEndX = r * topUx;
  const tlEndY = yTL + r * topUy;

  // Top-Right corner (w, yTR): arrives along top edge, leaves down right vertical edge
  const trStartX = w - r * topUx;
  const trStartY = yTR - r * topUy;
  const trEndX = w;
  const trEndY = yTR + r;

  // Bottom-Right corner (w, yBR): arrives down right vertical edge, leaves along bottom edge
  const brStartX = w;
  const brStartY = yBR - r;
  const brEndX = w + r * botUx;
  const brEndY = yBR + r * botUy;

  // Bottom-Left corner (0, yBL): arrives along bottom edge, leaves up left vertical edge
  const blStartX = -r * botUx;
  const blStartY = yBL - r * botUy;
  const blEndX = 0;
  const blEndY = yBL - r;

  const fmt = (n: number) => n.toFixed(2);

  return [
    `M ${fmt(tlEndX)} ${fmt(tlEndY)}`,
    `L ${fmt(trStartX)} ${fmt(trStartY)}`,
    `Q ${fmt(w)} ${fmt(yTR)} ${fmt(trEndX)} ${fmt(trEndY)}`,
    `L ${fmt(brStartX)} ${fmt(brStartY)}`,
    `Q ${fmt(w)} ${fmt(yBR)} ${fmt(brEndX)} ${fmt(brEndY)}`,
    `L ${fmt(blStartX)} ${fmt(blStartY)}`,
    `Q 0 ${fmt(yBL)} ${fmt(blEndX)} ${fmt(blEndY)}`,
    `L ${fmt(tlStartX)} ${fmt(tlStartY)}`,
    `Q 0 ${fmt(yTL)} ${fmt(tlEndX)} ${fmt(tlEndY)}`,
    'Z',
  ].join(' ');
}

export interface TileCropMetrics {
  tileWidthU: number;
  tileHeightU: number;
  gridWidthU: number;
  gridHeightU: number;
  offsetLeftU: number;
  offsetTopU: number;
}

/**
 * Computes the 5x2 grid media layer dimensions and tile offset for a card:
 * "Inside the clipped card, place a <video> and a poster layer sized 5 × tile width
 * by 2 × tile height, offset to that tile, where the tile height is max(card height, card width / 0.7111)."
 */
export function computeTileCropMetrics(
  tileIndex: number,
  cardWidthU: number,
  cardHeightU: number
): TileCropMetrics {
  const col = ((tileIndex % 5) + 5) % 5;
  const row = Math.floor(((tileIndex % 10) + 10) % 10 / 5);

  const tileHeightU = Math.max(cardHeightU, cardWidthU / 0.7111);
  const tileWidthU = tileHeightU * 0.7111;

  const gridWidthU = 5 * tileWidthU;
  const gridHeightU = 2 * tileHeightU;

  // Center the tile horizontally and vertically inside the card box, then offset by tile (col, row)
  const centerShiftX = (tileWidthU - cardWidthU) * 0.5;
  const centerShiftY = (tileHeightU - cardHeightU) * 0.5;

  const offsetLeftU = -(col * tileWidthU + centerShiftX);
  const offsetTopU = -(row * tileHeightU + centerShiftY);

  return {
    tileWidthU,
    tileHeightU,
    gridWidthU,
    gridHeightU,
    offsetLeftU,
    offsetTopU,
  };
}
