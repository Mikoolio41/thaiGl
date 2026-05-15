/**
 * Colored badge for a show name or category.
 * Color is deterministically derived from the tag string so the same show
 * always gets the same hue, regardless of rendering order.
 */

const PALETTES = [
  { bg: 'bg-mauve-deep/20', text: 'text-mauve-pale', border: 'border-mauve-deep/30' },
  { bg: 'bg-rose-dust/15', text: 'text-rose-pale', border: 'border-rose-dust/30' },
  { bg: 'bg-gold-warm/15', text: 'text-gold-pale', border: 'border-gold-warm/30' },
  { bg: 'bg-teal-900/40', text: 'text-teal-300', border: 'border-teal-700/30' },
  { bg: 'bg-indigo-900/40', text: 'text-indigo-300', border: 'border-indigo-700/30' },
]

function hashTag(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h) % PALETTES.length
}

/** @param {{ tag: string, size?: 'sm' | 'md' }} props */
export default function SeriesTag({ tag, size = 'sm' }) {
  const palette = PALETTES[hashTag(tag)]
  const sizeClass = size === 'md' ? 'px-3 py-1 text-xs' : 'px-2.5 py-0.5 text-[11px]'

  return (
    <span
      className={`tag-base border font-medium tracking-wide ${palette.bg} ${palette.text} ${palette.border} ${sizeClass}`}
    >
      {tag}
    </span>
  )
}
