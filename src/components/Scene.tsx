import { glimpseAt, type SceneState } from '../lib/scene'
import { TOURISTS, WILD, type WildKind } from '../data/chapters'

/**
 * PRE-VIZ RENDERER.
 * This is not the film. It is the animatic: the same scroll, the same hits, the same
 * blocking, drawn in palette silhouettes so the flow can be felt before a single
 * cinematic frame is generated. Each layer here maps 1:1 to a generated asset later.
 */
interface Props {
  s: SceneState
  w: number
  h: number
  uid: string
}

const INK = '#0b0b0b'
const GOLD = '#c99a2e'
const CRIMSON = '#d8253f'
const BONE = '#ede4d0'
const BONE_BASE = '#8d8378'
const ROSIN = '#f6c945'
const ROSIN_HOT = '#fff2a8'
const FUR = '#1a1410'

const TREES = [0.05, 0.19, 0.31, 0.47, 0.58, 0.71, 0.86, 0.93]

function Device({
  x,
  y,
  size,
  colour,
  led,
  rot = 0,
  uid,
}: {
  x: number
  y: number
  size: number // device height in px
  colour: 'black' | 'natural'
  led: boolean
  rot?: number
  uid: string
}) {
  const w = size / 4.03
  const body = colour === 'black' ? '#141414' : BONE
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {/* body: gently flattened rounded rectangle, 4.03:1 */}
      <rect x={-w / 2} y={-size / 2} width={w} height={size} rx={w * 0.42} fill={body} stroke={INK} strokeWidth={Math.max(1, w * 0.06)} />
      {colour === 'natural' && (
        <rect x={-w / 2} y={size / 2 - size * 0.15} width={w} height={size * 0.15} rx={w * 0.3} fill={BONE_BASE} />
      )}
      {/* mouthpiece: angled duckbill, gloss on the black unit */}
      <path
        d={`M ${-w / 2} ${-size / 2 + w * 0.42} Q ${-w / 2} ${-size / 2 - w * 0.15} ${-w * 0.1} ${-size / 2 - w * 0.2} L ${w / 2} ${-size / 2 + w * 0.1}`}
        fill={colour === 'black' ? '#2a2a2a' : '#d9cfb8'}
        stroke={INK}
        strokeWidth={Math.max(1, w * 0.06)}
      />
      {/* shoulder vents: two arched cutouts under the mouthpiece seam */}
      <path d={`M ${-w / 2} ${-size / 2 + w * 0.7} q ${w * 0.16} ${w * 0.25} 0 ${w * 0.5}`} fill="none" stroke={INK} strokeWidth={Math.max(1, w * 0.05)} opacity={0.6} />
      <path d={`M ${w / 2} ${-size / 2 + w * 0.7} q ${-w * 0.16} ${w * 0.25} 0 ${w * 0.5}`} fill="none" stroke={INK} strokeWidth={Math.max(1, w * 0.05)} opacity={0.6} />
      {/* the window: a circular recessed dish with a rectangular aperture; the oil glows in the aperture */}
      <circle cx={0} cy={-size / 2 + size * 0.33} r={w * 0.34} fill={colour === 'black' ? '#0e0e0e' : '#d8cdb4'} stroke={INK} strokeWidth={Math.max(1, w * 0.04)} />
      <rect x={-w * 0.22} y={-size / 2 + size * 0.33 - w * 0.16} width={w * 0.44} height={w * 0.32} rx={w * 0.05} fill={`url(#${uid}-rosin)`} filter={`url(#${uid}-glow)`} />
      <rect x={-w * 0.22} y={-size / 2 + size * 0.33 - w * 0.16} width={w * 0.44} height={w * 0.32} rx={w * 0.05} fill="none" stroke={ROSIN_HOT} strokeWidth={w * 0.05} opacity={0.9} />
      {/* LED */}
      <ellipse cx={0} cy={-size / 2 + size * 0.47} rx={w * 0.09} ry={w * 0.13} fill={led ? '#ffffff' : colour === 'black' ? '#333' : '#c9bfa8'} />
      {led && <ellipse cx={0} cy={-size / 2 + size * 0.47} rx={w * 0.3} ry={w * 0.36} fill="#ffffff" opacity={0.35} filter={`url(#${uid}-glow)`} />}
    </g>
  )
}


/** A wild sighting, drawn as a palette silhouette with its one costume cue. Placeholder for a locked plate. */
function Glimpse({ kind, t, side, w, h, hy }: { kind: WildKind; t: number; side: -1 | 1; w: number; h: number; hy: number }) {
  // Approach curve shared with the acacias: far and small, then near and large and off the edge.
  const near = Math.min(1, t / 0.75)
  const x = w * 0.5 + side * (0.06 + near * near * 0.5) * w
  const y = hy + Math.pow(near, 1.7) * 0.28 * h
  const sc = (0.08 + near * near * 0.9) * (h > w ? 0.22 : 0.28) * Math.min(w, h)
  const op = t < 0.1 ? t / 0.1 : t > 0.85 ? (1 - t) / 0.15 : 1
  const FUR = '#1a1410'
  return (
    <g transform={`translate(${x} ${y}) scale(${sc / 100})`} opacity={op}>
      {kind === 'sheep' && (
        <>
          <rect x={-40} y={-30} width={80} height={24} rx={8} fill="#5b4a3a" />
          <ellipse cx={0} cy={-50} rx={34} ry={40} fill="#8a6b3c" />
          <circle cx={0} cy={-95} r={22} fill="#eee6d6" />
          <circle cx={0} cy={-92} r={12} fill="#2a2320" />
        </>
      )}
      {kind === 'panda' && (
        <>
          <ellipse cx={0} cy={-45} rx={36} ry={42} fill="#e0842a" />
          <circle cx={0} cy={-98} r={26} fill="#f2ede4" />
          <circle cx={-18} cy={-116} r={9} fill={FUR} />
          <circle cx={18} cy={-116} r={9} fill={FUR} />
          <ellipse cx={-10} cy={-98} rx={7} ry={9} fill={FUR} />
          <ellipse cx={10} cy={-98} rx={7} ry={9} fill={FUR} />
        </>
      )}
      {kind === 'baboon' && (
        <>
          <path d="M -60 0 q 60 -60 120 0 z" fill="#8b6a3d" />
          <rect x={-22} y={-90} width={44} height={60} rx={10} fill="#5a5754" />
          <rect x={-5} y={-86} width={10} height={40} fill="#d8253f" />
          <circle cx={0} cy={-108} r={20} fill={FUR} />
          <path d="M 22 -70 q 30 -10 34 -30" stroke={FUR} strokeWidth={8} fill="none" strokeLinecap="round" />
        </>
      )}
      {kind === 'leopard' && (
        <>
          <path d="M -70 -10 q 20 -20 60 -14 q 30 4 50 -6 l 10 10 q -30 14 -60 12 q -40 -2 -60 -2 z" fill="#c99a2e" />
          <circle cx={45} cy={-30} r={18} fill="#c99a2e" />
          <path d="M 25 -44 q 20 -18 40 0 z" fill="#3a96e5" stroke="#0b0b0b" strokeWidth={3} />
          {[-40, -20, 0, 20].map((dx) => (
            <circle key={dx} cx={dx} cy={-12} r={4} fill={FUR} />
          ))}
        </>
      )}
      {kind === 'warthog' && (
        <>
          <ellipse cx={0} cy={-30} rx={44} ry={26} fill="#6b5a4a" />
          <ellipse cx={0} cy={-38} rx={30} ry={14} fill="#3a96e5" />
          <circle cx={40} cy={-40} r={16} fill="#6b5a4a" />
          <path d="M 52 -36 l 14 6" stroke="#eee6d6" strokeWidth={5} strokeLinecap="round" />
          <path d="M -44 -36 l -14 -34" stroke="#6b5a4a" strokeWidth={6} strokeLinecap="round" />
        </>
      )}
      {kind === 'lemur' && (
        <>
          <rect x={-16} y={-80} width={32} height={60} rx={12} fill="#d8253f" />
          <rect x={-16} y={-60} width={32} height={12} fill="#3a96e5" />
          <rect x={-16} y={-44} width={32} height={12} fill="#c99a2e" />
          <circle cx={0} cy={-96} r={16} fill="#8f8a84" />
          <rect x={-16} y={-100} width={32} height={8} rx={3} fill={FUR} />
          <path d="M 14 -30 q 40 -10 30 -70" stroke={FUR} strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray="8 6" />
        </>
      )}
      {kind === 'tourists' && (
        <>
          <rect x={-120} y={-70} width={240} height={60} rx={14} fill={FUR} />
          <rect x={-100} y={-110} width={200} height={44} rx={10} fill="#8a6b3c" />
          {[-70, -25, 20, 65].map((dx) => (
            <g key={dx}>
              <circle cx={dx} cy={-120} r={14} fill="#c9a88a" />
              <rect x={dx - 18} y={-136} width={36} height={8} rx={4} fill="#8a6b3c" />
              <rect x={dx - 8} y={-118} width={60} height={12} rx={4} fill={FUR} transform={`rotate(${side * -12} ${dx} -112)`} />
            </g>
          ))}
          <circle cx={-80} cy={-8} r={16} fill={FUR} stroke="#8f8a84" strokeWidth={4} />
          <circle cx={80} cy={-8} r={16} fill={FUR} stroke="#8f8a84" strokeWidth={4} />
        </>
      )}
    </g>
  )
}

export function Scene({ s, w, h, uid }: Props) {
  const portrait = h > w * 1.1
  const hy = (portrait ? 0.46 : 0.52) * h + s.airborne * 0.1 * h
  const sunR = Math.min(w, h) * 0.085
  const sunX = s.sunX * w
  const sunY = hy + s.sunY * h
  const vp = { x: w * 0.5, y: hy }

  // Viewer's hand: bottom right → bottom centre and larger on a pull.
  const hx = (portrait ? 0.66 : 0.78) * w * (1 - s.handPull) + w * 0.52 * s.handPull
  const hyv = (portrait ? 0.9 : 0.94) * h * (1 - s.handPull) + h * 0.98 * s.handPull - s.airborne * 26
  const hScale = (portrait ? 1 : 1.15) * (1 + s.handPull * 0.35)
  const devSize = (portrait ? 0.3 : 0.24) * Math.min(w, h)

  const dash = -(s.p * 6000)
  const seatTop = portrait ? 0.73 * h : 0.78 * h
  const monkeyX = portrait ? 0.84 * w : 0.9 * w
  const rollY = portrait ? 0.4 * h : 0.34 * h

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.skyTop} />
          <stop offset="1" stopColor={s.skyHorizon} />
        </linearGradient>
        <radialGradient id={`${uid}-sunglow`}>
          <stop offset="0" stopColor={s.sunColor} stopOpacity={0.9} />
          <stop offset="1" stopColor={s.sunColor} stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`${uid}-rosin`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor={ROSIN_HOT} />
          <stop offset="0.55" stopColor={ROSIN} />
          <stop offset="1" stopColor="#d9a520" />
        </radialGradient>
        <filter id={`${uid}-glow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation={Math.max(2, devSize * 0.05)} />
        </filter>
        <filter id={`${uid}-soft`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={Math.min(w, h) * 0.05} />
        </filter>
        <clipPath id={`${uid}-mirror`}>
          <rect x={w * 0.5 - w * 0.13} y={h * 0.075} width={w * 0.26} height={h * 0.06} rx={6} />
        </clipPath>
      </defs>

      {/* SKY + SUN */}
      <rect x="0" y="0" width={w} height={hy + 2} fill={`url(#${uid}-sky)`} />
      <circle cx={sunX} cy={sunY} r={sunR * 3.2} fill={`url(#${uid}-sunglow)`} opacity={s.sunGlow} />
      <circle cx={sunX} cy={sunY} r={sunR} fill={s.sunColor} />

      {/* GROUND + TRAIL */}
      <rect x="0" y={hy} width={w} height={h - hy} fill={s.ground} />
      <polygon points={`0,${hy + 6} ${w},${hy + 6} ${w},${hy + h * 0.06} 0,${hy + h * 0.04}`} fill={s.groundDeep} opacity={0.35} />
      <polygon points={`${w * 0.12},${h} ${w * 0.88},${h} ${vp.x + 8},${vp.y + 3} ${vp.x - 8},${vp.y + 3}`} fill={s.groundDeep} opacity={0.35} />
      <line x1={w * 0.26} y1={h} x2={vp.x - 3} y2={vp.y + 4} stroke={s.groundDeep} strokeWidth={Math.max(2, w * 0.012)} strokeDasharray={`${w * 0.04} ${w * 0.03}`} strokeDashoffset={dash} opacity={0.7} />
      <line x1={w * 0.74} y1={h} x2={vp.x + 3} y2={vp.y + 4} stroke={s.groundDeep} strokeWidth={Math.max(2, w * 0.012)} strokeDasharray={`${w * 0.04} ${w * 0.03}`} strokeDashoffset={dash} opacity={0.7} />

      {/* ACACIAS — the logo tree, on the trail, approaching */}
      {TREES.map((seed, i) => {
        const d = 1 - ((seed + s.p * 2.4 * (0.6 + 0.4 * s.moving)) % 1)
        const side = i % 2 === 0 ? -1 : 1
        const near = 1 - d
        const tx = w * 0.5 + side * (0.05 + near * near * 0.62) * w
        const ty = hy + Math.pow(near, 1.7) * 0.34 * h
        const sc = (0.12 + near * near * 1.6) * (portrait ? 0.26 : 0.34) * Math.min(w, h)
        const op = Math.min(1, d * 6) * Math.min(1, near * 4 + 0.15)
        return (
          <g key={i} transform={`translate(${tx} ${ty}) scale(${sc / 100})`} opacity={op}>
            <rect x={-6} y={-70} width={12} height={72} fill={INK} />
            <path d="M -95 -70 Q -60 -105 0 -100 Q 60 -105 95 -70 Q 40 -60 0 -62 Q -40 -60 -95 -70 Z" fill={INK} />
            <path d="M -60 -88 Q -20 -118 30 -110 Q 60 -104 70 -90 Q 20 -86 -60 -88 Z" fill={INK} />
          </g>
        )
      })}

      {/* THE WILD — the rest of the range, glimpsed, never captioned */}
      {WILD.map((g) => {
        const t = glimpseAt(s.p, g.at)
        return t > 0 ? <Glimpse key={g.id} kind={g.kind} t={t} side={g.side} w={w} h={h} hy={hy} /> : null
      })}
      {glimpseAt(s.p, TOURISTS.at) > 0 && <Glimpse kind="tourists" t={glimpseAt(s.p, TOURISTS.at)} side={TOURISTS.side} w={w} h={h} hy={hy} />}

      {/* DUST */}
      <ellipse cx={w * 0.1} cy={h * 0.95} rx={w * 0.7} ry={h * 0.35} fill={s.skyHorizon} opacity={s.dust * 0.75} filter={`url(#${uid}-soft)`} />
      <ellipse cx={w * 0.95} cy={h * 0.85} rx={w * 0.6} ry={h * 0.3} fill={s.ground} opacity={s.dust * 0.7} filter={`url(#${uid}-soft)`} />
      <rect x="0" y="0" width={w} height={h} fill={s.ground} opacity={s.dust * 0.4} />

      {/* ACACIA BRUSH ACROSS THE LENS */}
      {s.brush > 0 &&
        [0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${w * (1.3 - s.brush * 1.9) + i * w * 0.18} ${-h * 0.05} q ${w * 0.1} ${h * 0.3} ${-w * 0.05} ${h * 0.7}`}
            stroke={INK}
            strokeWidth={Math.max(3, w * 0.012)}
            fill="none"
            opacity={0.85}
          />
        ))}

      {/* AWNING — top edge, flapping, tearing */}
      <path
        d={`M 0 0 L ${w} 0 L ${w} ${h * 0.055} Q ${w * 0.75} ${h * (0.07 + 0.02 * Math.sin(s.p * 260) * s.moving)} ${w * 0.5} ${h * 0.05} Q ${w * 0.25} ${h * (0.035 + 0.02 * Math.cos(s.p * 210) * s.moving)} 0 ${h * 0.06} Z`}
        fill={INK}
      />
      <polygon
        points={`${w * 0.62},${h * 0.05} ${w * 0.62 + w * 0.16 * s.awningTear},${h * 0.05 + h * 0.12 * s.awningTear * (0.8 + 0.2 * Math.sin(s.p * 300))} ${w * 0.7},${h * 0.05}`}
        fill={INK}
        opacity={Math.min(1, s.awningTear * 3)}
      />

      {/* REAR-VIEW MIRROR — the driver's sunglasses live here */}
      <rect x={w * 0.5 - w * 0.13} y={h * 0.075} width={w * 0.26} height={h * 0.06} rx={6} fill={s.skyHorizon} stroke={INK} strokeWidth={4} />
      <g clipPath={`url(#${uid}-mirror)`}>
        <ellipse cx={w * 0.5} cy={h * 0.12} rx={w * 0.06} ry={h * 0.04} fill={INK} />
        <rect x={w * 0.5 - w * 0.09} y={h * 0.081} width={w * 0.18} height={h * 0.012} rx={4} fill={GOLD} />
        <rect x={w * 0.5 - w * 0.045} y={h * 0.098} width={w * 0.036} height={h * 0.014} rx={3} fill="#222" stroke={INK} strokeWidth={2} />
        <rect x={w * 0.5 + w * 0.009} y={h * 0.098} width={w * 0.036} height={h * 0.014} rx={3} fill="#222" stroke={INK} strokeWidth={2} />
        {s.eyesOnYou > 0 && (
          <g opacity={s.eyesOnYou}>
            <circle cx={w * 0.5 - w * 0.027} cy={h * 0.105} r={2.5} fill="#fff" />
            <circle cx={w * 0.5 + w * 0.027} cy={h * 0.105} r={2.5} fill="#fff" />
          </g>
        )}
      </g>

      {/* ROLL BAR */}
      <rect x={-10} y={rollY} width={w + 20} height={Math.max(10, h * 0.022)} rx={10} fill={INK} />
      <rect x={w * 0.06} y={rollY} width={Math.max(8, w * 0.02)} height={h * 0.5} fill={INK} />
      <rect x={w * 0.94 - Math.max(8, w * 0.02)} y={rollY} width={Math.max(8, w * 0.02)} height={h * 0.5} fill={INK} />

      {/* JERRY CAN — on the bonnet ahead, then gone */}
      <g transform={`translate(${w * 0.5 + Math.sin(s.p * 700) * 3 * s.moving} ${hy + h * 0.105 - s.jerryCan * h * 0.9}) rotate(${s.jerryCan * 140})`} opacity={s.jerryCan > 0.98 ? 0 : 1}>
        <rect x={-w * 0.022} y={-h * 0.03} width={w * 0.044} height={h * 0.045} rx={3} fill={INK} />
        <rect x={-w * 0.013} y={-h * 0.02} width={w * 0.026} height={h * 0.026} rx={2} fill={GOLD} opacity={0.9} />
      </g>

      {/* MONKEY — vaults in at the riverbed, hangs off the roll bar, feet off the floor */}
      <g transform={`translate(${monkeyX + (1 - s.monkeyIn) * w * 0.35} ${rollY - (1 - s.monkeyIn) * h * 0.45}) rotate(${(1 - s.monkeyIn) * -40})`} opacity={s.monkeyIn > 0.02 ? 1 : 0}>
        <rect x={-6} y={0} width={12} height={h * 0.09} rx={6} fill={FUR} />
        <ellipse cx={0} cy={h * 0.13} rx={w * 0.045} ry={h * 0.05} fill={CRIMSON} stroke={INK} strokeWidth={3} />
        <circle cx={0} cy={h * 0.065} r={Math.min(w, h) * 0.035} fill={FUR} />
        <path d={`M ${-Math.min(w, h) * 0.04} ${h * 0.05} l ${Math.min(w, h) * 0.08} 0 l 0 -${Math.min(w, h) * 0.02} l -${Math.min(w, h) * 0.08} 0 z`} fill="#2f5d3a" stroke={INK} strokeWidth={2} />
        <path d={`M 0 ${h * 0.17} q ${w * 0.06} ${h * 0.05} ${w * 0.02} ${h * 0.11 + Math.sin(s.p * 320) * 8 * s.moving}`} stroke={FUR} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d={`M ${-w * 0.02} ${h * 0.19} q ${-w * 0.02} ${h * 0.04} ${w * 0.005} ${h * 0.07}`} stroke={FUR} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d={`M ${w * 0.02} ${h * 0.19} q ${w * 0.03} ${h * 0.03} ${w * 0.012} ${h * 0.07}`} stroke={FUR} strokeWidth={7} fill="none" strokeLinecap="round" />
        {/* free hand holds the natural 0.5ml */}
        <path d={`M ${-w * 0.03} ${h * 0.13} q ${-w * 0.05} ${h * 0.01} ${-w * 0.06} ${h * 0.05}`} stroke={FUR} strokeWidth={7} fill="none" strokeLinecap="round" />
        <Device x={-w * 0.095} y={h * 0.17} size={Math.min(w, h) * 0.09} colour="natural" led={false} rot={-25} uid={uid} />
        {s.eyesOnYou > 0 && (
          <g opacity={s.eyesOnYou}>
            <circle cx={-6} cy={h * 0.062} r={2.5} fill="#fff" />
            <circle cx={6} cy={h * 0.062} r={2.5} fill="#fff" />
          </g>
        )}
      </g>

      {/* FRONT ROW — seat backs. Right-hand drive: driver right, passenger left. */}
      <rect x={w * 0.05} y={seatTop} width={w * 0.38} height={h * 0.3} rx={18} fill={INK} />
      <rect x={w * 0.57} y={seatTop} width={w * 0.38} height={h * 0.3} rx={18} fill={INK} />

      {/* DRIVER — fedora, Hawaiian shirt, one arm out of the window. RIGHT front: South Africa drives on the left. */}
      <g transform={`translate(${w * 0.76} ${seatTop})`}>
        <path d={`M ${-w * 0.16} ${-h * 0.02} q ${w * 0.16} ${-h * 0.1} ${w * 0.32} 0 Z`} fill={GOLD} stroke={INK} strokeWidth={3} />
        {[[-0.1, 0.03], [-0.03, 0.06], [0.05, 0.02], [0.1, 0.07]].map(([dx, dy], i) => (
          <circle key={i} cx={dx * w} cy={-h * (0.06 - dy)} r={Math.min(w, h) * 0.014} fill={CRIMSON} stroke={INK} strokeWidth={2} />
        ))}
        <circle cx={0} cy={-h * 0.14} r={Math.min(w, h) * 0.06} fill={FUR} />
        <rect x={-w * 0.1} y={-h * 0.175} width={w * 0.2} height={h * 0.018} rx={4} fill={GOLD} stroke={INK} strokeWidth={2} />
        <path d={`M ${-w * 0.06} ${-h * 0.175} q ${w * 0.06} ${-h * 0.07} ${w * 0.12} 0 Z`} fill={GOLD} stroke={INK} strokeWidth={2} />
        <path d={`M ${w * 0.04} ${-h * 0.2} q ${w * 0.02} ${-h * 0.03} ${w * 0.035} ${-h * 0.005}`} stroke="#2f5d3a" strokeWidth={4} fill="none" />
        {/* arm out of the window, to the left edge, unbothered */}
        <path d={`M ${w * 0.14} ${-h * 0.03} q ${w * 0.1} ${-h * 0.02} ${w * 0.26} ${h * 0.02 + Math.sin(s.p * 240) * 4 * s.moving}`} stroke={FUR} strokeWidth={Math.max(8, w * 0.02)} fill="none" strokeLinecap="round" />
        {s.ledDriver && <Device x={-w * 0.09} y={-h * 0.14} size={Math.min(w, h) * 0.1} colour="black" led rot={15} uid={uid} />}
        {s.cough > 0 && <rect x={-w * 0.05} y={-h * 0.01} width={w * 0.1} height={h * 0.01} fill={GOLD} opacity={s.cough * 0.6} filter={`url(#${uid}-glow)`} />}
      </g>

      {/* THE RANGER — a rhino in the ranger's kit, riding shotgun. LEFT front. Has not blinked since the gate. */}
      <g transform={`translate(${w * 0.24} ${seatTop})`}>
        <path d={`M ${-w * 0.16} ${h * 0.02} q ${w * 0.16} ${-h * 0.1} ${w * 0.32} 0 Z`} fill="#8a6b3c" stroke={INK} strokeWidth={3} />
        <rect x={-w * 0.05} y={-h * 0.05} width={w * 0.1} height={h * 0.05} rx={4} fill="#6d5430" stroke={INK} strokeWidth={2} />
        <ellipse cx={0} cy={-h * 0.11} rx={Math.min(w, h) * 0.075} ry={Math.min(w, h) * 0.058} fill="#5a5754" />
        <path d={`M ${w * 0.055} ${-h * 0.13} l ${w * 0.05} ${-h * 0.09} l ${w * 0.005} ${h * 0.1} z`} fill="#3d3a37" stroke={INK} strokeWidth={2} />
        <path d={`M ${-w * 0.06} ${-h * 0.15} q ${w * 0.01} ${-h * 0.05} ${w * 0.04} ${-h * 0.03} z`} fill="#5a5754" />
        <path d={`M ${-w * 0.12} ${-h * 0.16} q ${w * 0.12} ${-h * 0.06} ${w * 0.24} 0 Z`} fill="#8a6b3c" stroke={INK} strokeWidth={3} />
        <rect x={-w * 0.13} y={-h * 0.165} width={w * 0.26} height={h * 0.014} rx={4} fill="#8a6b3c" stroke={INK} strokeWidth={2} />
        {/* the eyes: on you, the whole film */}
        <circle cx={-w * 0.03} cy={-h * 0.115} r={3} fill="#fff" />
        <circle cx={w * 0.012} cy={-h * 0.115} r={3} fill="#fff" />
        {s.ledRanger && <Device x={-w * 0.095} y={-h * 0.1} size={Math.min(w, h) * 0.1} colour="black" led rot={-12} uid={uid} />}
      </g>

      {/* MUD OVER THE LENS */}
      {s.mud > 0 &&
        [
          [0.15, 0.3, 0.16],
          [0.55, 0.22, 0.2],
          [0.85, 0.5, 0.14],
          [0.35, 0.65, 0.18],
          [0.7, 0.8, 0.12],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx * w} cy={cy * h + (1 - s.mud) * h * 0.25} r={r * Math.min(w, h) * (0.5 + s.mud)} fill="#3a2a16" opacity={Math.min(0.95, s.mud * 1.2)} />
        ))}

      {/* THE VIEWER'S HAND. Yours. Planted from frame one, paid off at golden hour. */}
      <g transform={`translate(${hx} ${hyv}) scale(${hScale}) rotate(${-14 - s.handPull * 8})`}>
        {/* fur tufts, only at the reveal */}
        {s.handReveal > 0 && (
          <path
            d={`M ${-devSize * 0.34} ${-devSize * 0.1} l -8 -14 l 10 6 l -3 -16 l 11 10 l 1 -14 l 8 12 l 6 -8 l 2 12 l 10 -6 l -4 14 l 12 -2 l -10 10`}
            fill={FUR}
            stroke={GOLD}
            strokeWidth={2.5}
            opacity={s.handReveal}
          />
        )}
        <ellipse cx={0} cy={devSize * 0.12} rx={devSize * 0.36} ry={devSize * 0.3} fill={FUR} />
        <rect x={-devSize * 0.1} y={devSize * 0.2} width={devSize * 0.5} height={devSize * 0.6} rx={devSize * 0.14} fill={FUR} transform="rotate(20)" />
        <Device x={0} y={-devSize * 0.05} size={devSize} colour="natural" led={s.ledViewer} rot={-4} uid={uid} />
        {/* fingers wrap the device */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-devSize * 0.19} y={-devSize * 0.05 + i * devSize * 0.1} width={devSize * 0.38} height={devSize * 0.075} rx={devSize * 0.04} fill={FUR} stroke={s.handReveal > 0 ? GOLD : 'none'} strokeWidth={2.5 * s.handReveal} />
        ))}
        {/* rim light from the low sun, the moment you know */}
        {s.handReveal > 0 && (
          <ellipse cx={-devSize * 0.05} cy={devSize * 0.14} rx={devSize * 0.37} ry={devSize * 0.31} fill="none" stroke={GOLD} strokeWidth={3} opacity={s.handReveal * 0.9} strokeDasharray={`${devSize * 0.9} ${devSize * 1.3}`} />
        )}
      </g>

      {/* NIGHT */}
      <rect x="0" y="0" width={w} height={h} fill={INK} opacity={s.night} />
    </svg>
  )
}
