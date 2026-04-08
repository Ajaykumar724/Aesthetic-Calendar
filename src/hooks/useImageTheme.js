import { useEffect, useState } from 'react'
import { rgbToHex, rgbToHsl, hslToRgb, contrastRatio } from '../utils/colorUtils'

export default function useImageTheme(urls = [], intervalMs = 5000) {
  const [idx, setIdx] = useState(0)
  const imgUrl = urls.length ? urls[idx] : null

  // rotate index
  useEffect(() => {
    if (!urls.length) return
    const t = setInterval(() => setIdx(i => (i + 1) % urls.length), intervalMs)
    return () => clearInterval(t)
  }, [urls, intervalMs])

  // when image changes, extract color and set CSS vars
  useEffect(() => {
    if (!imgUrl) return
    let mounted = true
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imgUrl
    img.onload = () => {
      try {
        const w = 40, h = 40
        const canvas = document.createElement('canvas')
        canvas.width = w; canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        const data = ctx.getImageData(0, 0, w, h).data
        let r = 0, g = 0, b = 0, count = 0
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3]
          if (alpha < 128) continue
          r += data[i]; g += data[i + 1]; b += data[i + 2]; count++
        }
        if (count === 0) return
        r /= count; g /= count; b /= count
        const { h: hh, s, l } = rgbToHsl(r, g, b)

        let accent = rgbToHex(r, g, b)
        const accent2hsl = { h: hh, s: Math.min(1, s + 0.18), l: Math.max(0, Math.min(1, l * 0.9)) }
        const acc2rgb = hslToRgb(accent2hsl.h, accent2hsl.s, accent2hsl.l)
        const accent2 = rgbToHex(acc2rgb.r, acc2rgb.g, acc2rgb.b)

        const rgbAccent = [r, g, b]
        const white = [255, 255, 255]
        const minContrast = 4.5
        if (contrastRatio(rgbAccent, white) < minContrast) {
          let newL = l
          for (let step = 0; step < 20 && contrastRatio(Object.values(hslToRgb(hh, s, newL)), white) < minContrast; step++) {
            newL = Math.max(0, newL - 0.04)
          }
          const adj = hslToRgb(hh, s, newL)
          accent = rgbToHex(adj.r, adj.g, adj.b)
        }

        const lumin = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255
        const textColor = lumin > 0.6 ? '#111' : '#fff'
        const font = s > 0.35 ? "Georgia, 'Times New Roman', serif" : "Inter, ui-sans-serif, system-ui, Segoe UI, Roboto, 'Helvetica Neue', Arial"

        if (mounted) {
          const root = document.documentElement
          root.style.setProperty('--accent', accent)
          root.style.setProperty('--accent-2', accent2)
          root.style.setProperty('--accent-rgba', `${Math.round(r)},${Math.round(g)},${Math.round(b)}`)
          root.style.setProperty('--text', textColor)
          root.style.setProperty('--theme-font', font)
        }
      } catch (e) {
        console.warn('useImageTheme: color extraction failed', e)
      }
    }
    img.onerror = (e) => {
      // ignore; CORS or load errors will keep defaults
      console.warn('useImageTheme: image load failed', imgUrl, e)
    }
    return () => { mounted = false }
  }, [imgUrl])

  return imgUrl
}
