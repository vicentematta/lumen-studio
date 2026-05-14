import { homeAttr, serviceAttr, projectAttr } from '@/lib/dataAttr'

type DocType = 'homePage' | 'service' | 'project'
type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline'

interface Props {
  docType: DocType
  docId: string
  path: string
  label: string
  position?: Position
}

const inIframe =
  typeof window !== 'undefined' && window.self !== window.top

const positionClasses: Record<Exclude<Position, 'inline'>, string> = {
  'top-right': 'top-3 right-3',
  'top-left': 'top-3 left-3',
  'bottom-right': 'bottom-3 right-3',
  'bottom-left': 'bottom-3 left-3',
}

function getAttr(docType: DocType, id: string, path: string): string {
  if (docType === 'homePage') return homeAttr(id, path)
  if (docType === 'service') return serviceAttr(id, path)
  return projectAttr(id, path)
}

export default function EditOverlay({ docType, docId, path, label, position = 'top-right' }: Props) {
  if (!inIframe) return null

  const dataAttr = getAttr(docType, docId, path)

  if (position === 'inline') {
    return (
      <button
        type="button"
        data-sanity={dataAttr}
        title={`Edit ${label}`}
        aria-label={`Edit ${label}`}
        onClick={(e) => e.preventDefault()}
        className="ml-1.5 inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm bg-white/80 text-black text-[9px] leading-none align-middle hover:bg-white transition-colors"
      >
        ✎
      </button>
    )
  }

  return (
    <button
      type="button"
      data-sanity={dataAttr}
      title={`Edit ${label}`}
      aria-label={`Edit ${label}`}
      onClick={(e) => e.preventDefault()}
      className={`absolute ${positionClasses[position]} z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium uppercase tracking-wider hover:bg-black/90 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto`}
    >
      <span aria-hidden>✎</span>
      <span>{label}</span>
    </button>
  )
}
