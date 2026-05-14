import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'
import type { VideoEntry } from '@/lib/media'

interface Props {
  video: VideoEntry
  className?: string
  /** Crossfade between loops for the hero variant — DO NOT change this flag. */
  crossfade?: boolean
  /** Tailwind object-position. Default object-bottom. */
  position?: string
  overlayClassName?: string
  /**
   * Set true only for the above-fold hero.
   * All other instances defer loading until they enter the viewport.
   */
  eager?: boolean
}

export function VideoBackground({
  video,
  className,
  crossfade = false,
  position = 'object-bottom',
  overlayClassName,
  eager = false,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null)

  // Crossfade animation — behaviour unchanged from design-system-keeper spec.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!crossfade) {
      el.style.opacity = '1'
      return
    }

    let raf = 0
    el.style.opacity = '0'

    const animateOpacity = (from: number, to: number, ms: number) => {
      const start = performance.now()
      const tick = (now: number) => {
        if (!el) return
        const t = Math.min(1, (now - start) / ms)
        el.style.opacity = String(from + (to - from) * t)
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }

    const onCanPlay = () => {
      el.play().catch(() => {})
      animateOpacity(0, 1, 500)
    }

    const onTimeUpdate = () => {
      const remaining = el.duration - el.currentTime
      if (Number.isFinite(remaining) && remaining <= 0.55) {
        animateOpacity(parseFloat(el.style.opacity || '1'), 0, 500)
      }
    }

    const onEnded = () => {
      el.style.opacity = '0'
      window.setTimeout(() => {
        el.currentTime = 0
        el.play().catch(() => {})
        animateOpacity(0, 1, 500)
      }, 100)
    }

    el.addEventListener('canplay', onCanPlay)
    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('ended', onEnded)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('canplay', onCanPlay)
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('ended', onEnded)
    }
  }, [crossfade, video.mp4])

  // When the video source URL changes, force the browser to re-read <source> elements.
  // Without this, browsers ignore dynamic <source> updates and keep the old stream.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.load()
    if (eager && !crossfade) el.play().catch(() => {})
  }, [video.mp4, video.webm]) // eslint-disable-line react-hooks/exhaustive-deps

  // Lazy-load: defer network fetch until the element enters the viewport.
  // Eager videos (hero above the fold) skip this and load immediately.
  useEffect(() => {
    const el = ref.current
    if (!el || eager) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.preload = 'auto'
          el.load()
          if (!crossfade) {
            el.play().catch(() => {})
          }
          // crossfade: the onCanPlay listener above takes over after load()
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [eager, crossfade])

  return (
    <>
      <video
        ref={ref}
        poster={video.poster || undefined}
        muted
        autoPlay={eager}
        playsInline
        preload={eager ? 'auto' : 'metadata'}
        loop={!crossfade}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity',
          position,
          className,
        )}
        style={{ opacity: crossfade ? 0 : 1 }}
      >
        {/* Mobile-optimised source served first on narrow viewports */}
        {video.mobile ? (
          <source media="(max-width: 720px)" src={video.mobile} type="video/mp4" />
        ) : null}
        {/* vp9 webm — better compression, supported in all modern browsers */}
        {video.webm ? <source src={video.webm} type="video/webm" /> : null}
        {/* h264 mp4 — universal fallback */}
        <source src={video.mp4} type="video/mp4" />
      </video>
      {overlayClassName ? <div className={cn('absolute inset-0', overlayClassName)} /> : null}
    </>
  )
}
