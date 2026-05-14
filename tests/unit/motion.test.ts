import { describe, it, expect } from 'vitest'
import {
  fadeRise,
  fadeRiseSmall,
  fadeIn,
  blurIn,
  stagger,
  slideFromLeft,
  slideFromRight,
  inViewProps,
} from '@/lib/motion'
import type { Variants } from 'framer-motion'

const allVariants: Record<string, Variants> = {
  fadeRise,
  fadeRiseSmall,
  fadeIn,
  blurIn,
  stagger,
  slideFromLeft,
  slideFromRight,
}

describe('motion variants — hidden/show keys', () => {
  for (const [name, variant] of Object.entries(allVariants)) {
    it(`${name} has a "hidden" key`, () => {
      expect(variant).toHaveProperty('hidden')
    })

    it(`${name} has a "show" key`, () => {
      expect(variant).toHaveProperty('show')
    })
  }
})

describe('fadeRise', () => {
  it('hidden state: opacity 0 and y 40', () => {
    expect(fadeRise.hidden).toMatchObject({ opacity: 0, y: 40 })
  })

  it('show state: opacity 1 and y 0', () => {
    expect(fadeRise.show).toMatchObject({ opacity: 1, y: 0 })
  })
})

describe('fadeRiseSmall', () => {
  it('hidden state: opacity 0 and y 20', () => {
    expect(fadeRiseSmall.hidden).toMatchObject({ opacity: 0, y: 20 })
  })

  it('show state: opacity 1 and y 0', () => {
    expect(fadeRiseSmall.show).toMatchObject({ opacity: 1, y: 0 })
  })
})

describe('fadeIn', () => {
  it('hidden state: opacity 0', () => {
    expect(fadeIn.hidden).toMatchObject({ opacity: 0 })
  })

  it('show state: opacity 1', () => {
    expect(fadeIn.show).toMatchObject({ opacity: 1 })
  })
})

describe('blurIn', () => {
  it('hidden state: opacity 0, blur(12px), y 24', () => {
    expect(blurIn.hidden).toMatchObject({ opacity: 0, filter: 'blur(12px)', y: 24 })
  })

  it('show state: opacity 1, blur(0px), y 0', () => {
    expect(blurIn.show).toMatchObject({ opacity: 1, filter: 'blur(0px)', y: 0 })
  })
})

describe('slideFromLeft', () => {
  it('hidden state: opacity 0 and x -40', () => {
    expect(slideFromLeft.hidden).toMatchObject({ opacity: 0, x: -40 })
  })

  it('show state: opacity 1 and x 0', () => {
    expect(slideFromLeft.show).toMatchObject({ opacity: 1, x: 0 })
  })
})

describe('slideFromRight', () => {
  it('hidden state: opacity 0 and x 40', () => {
    expect(slideFromRight.hidden).toMatchObject({ opacity: 0, x: 40 })
  })

  it('show state: opacity 1 and x 0', () => {
    expect(slideFromRight.show).toMatchObject({ opacity: 1, x: 0 })
  })
})

describe('inViewProps', () => {
  it('initial is "hidden"', () => {
    expect(inViewProps.initial).toBe('hidden')
  })

  it('whileInView is "show"', () => {
    expect(inViewProps.whileInView).toBe('show')
  })

  it('viewport.once is true', () => {
    expect(inViewProps.viewport.once).toBe(true)
  })
})
