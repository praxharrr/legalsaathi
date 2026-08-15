'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function PaperStack() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 120)
    camera.position.set(0, 0, window.innerWidth < 640 ? 12.5 : 9.2)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    function resize() {
      const w = mount!.clientWidth
      const h = mount!.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }

    // draw a stamp-paper sheet onto a canvas, use it as a texture
    function sheetTexture(active: boolean) {
      const c = document.createElement('canvas')
      c.width = 640
      c.height = 852
      const x = c.getContext('2d')!

      x.fillStyle = '#F4F5EF'
      x.fillRect(0, 0, 640, 852)

      const g = x.createLinearGradient(0, 0, 0, 250)
      g.addColorStop(0, 'rgba(110,125,102,.15)')
      g.addColorStop(1, 'rgba(110,125,102,0)')
      x.fillStyle = g
      x.fillRect(0, 0, 640, 250)

      x.strokeStyle = 'rgba(21,24,28,.26)'
      x.lineWidth = 3
      x.strokeRect(32, 32, 576, 788)
      x.strokeStyle = 'rgba(21,24,28,.12)'
      x.lineWidth = 1
      x.strokeRect(44, 44, 552, 764)

      x.fillStyle = active ? 'rgba(168,52,42,.9)' : 'rgba(21,24,28,.5)'
      x.fillRect(80, 92, 132, 12)
      x.fillStyle = 'rgba(21,24,28,.5)'
      x.fillRect(224, 92, 180, 12)
      x.fillStyle = active ? 'rgba(168,52,42,.5)' : 'rgba(21,24,28,.22)'
      x.fillRect(80, 126, 96, 8)

      let y = 190
      for (let i = 0; i < 21; i++) {
        let w = 400 + Math.sin(i * 1.9) * 110
        if (i % 6 === 5) w = 210
        x.fillStyle = `rgba(21,24,28,${active ? 0.2 : 0.13})`
        x.fillRect(80, y, w, 7)
        y += 27
      }

      x.fillStyle = 'rgba(201,138,20,.45)'
      x.fillRect(80, 762, 80, 6)
      x.fillStyle = 'rgba(21,24,28,.26)'
      x.fillRect(360, 760, 180, 2)

      const t = new THREE.CanvasTexture(c)
      t.anisotropy = 4
      return t
    }

    const group = new THREE.Group()
    scene.add(group)

    const sheets: THREE.Mesh[] = []
    const N = 4
    const ACT = 0

    for (let i = 0; i < N; i++) {
      const on = i === ACT
      const geo = new THREE.PlaneGeometry(3.1, 4.12, 20, 20)
      const pos = geo.attributes.position

      for (let k = 0; k < pos.count; k++) {
        pos.setZ(
          k,
          Math.sin(pos.getX(k) * 0.5 + i) * 0.09 + Math.cos(pos.getY(k) * 0.36) * 0.04
        )
      }
      pos.needsUpdate = true
      geo.computeVertexNormals()

      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({
          map: sheetTexture(on),
          roughness: 0.93,
          metalness: 0,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: on ? 1 : 0.62,
        })
      )

      mesh.position.set(i * 0.42, -i * 0.3, -i * 0.72)
      mesh.rotation.set(-0.3, -0.28 + i * 0.05, 0.03 - i * 0.02)
      mesh.userData = { by: -i * 0.3, bz: -i * 0.72 }
      sheets.push(mesh)
      group.add(mesh)
    }

    if (window.innerWidth < 640) {
      group.position.x = -0.5
      group.position.y = 0.2
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const key = new THREE.DirectionalLight(0xfff4e2, 1.1)
    key.position.set(3.2, 4.6, 5.4)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xa8342a, 0.26)
    fill.position.set(-4, -1.6, 2.4)
    scene.add(fill)

    let tx = 0, ty = 0, cx = 0, cy = 0
    let drag = false, lx = 0, spin = 0, sv = 0, scr = 0

    function pointer(e: MouseEvent | TouchEvent) {
      const r = mount!.getBoundingClientRect()
      const px = 'touches' in e ? e.touches[0].clientX : e.clientX
      const py = 'touches' in e ? e.touches[0].clientY : e.clientY
      tx = ((px - r.left) / r.width - 0.5) * 0.5
      ty = ((py - r.top) / r.height - 0.5) * 0.36
      if (drag) {
        sv += (px - lx) * 0.00045
        lx = px
      }
    }

    const onLeave = () => { tx = 0; ty = 0; drag = false }
    const onDown = (e: MouseEvent) => { drag = true; lx = e.clientX }
    const onUp = () => { drag = false }
    const onTouchStart = (e: TouchEvent) => { drag = true; lx = e.touches[0].clientX }
    const onScroll = () => { scr = window.scrollY * 0.00035 }

    mount.addEventListener('mousemove', pointer)
    mount.addEventListener('touchmove', pointer, { passive: true })
    mount.addEventListener('mouseleave', onLeave)
    mount.addEventListener('mousedown', onDown)
    mount.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', resize)

    const t0 = performance.now()
    let frame = 0

    function tick(now: number) {
      frame = requestAnimationFrame(tick)
      const el = (now - t0) / 1000

      cx += (ty - cx) * 0.05
      cy += (tx - cy) * 0.05
      spin += sv
      sv *= 0.94

      group.rotation.x = cx
      group.rotation.y = cy + spin + scr

      if (!reduce) {
        sheets.forEach((s, k) => {
          s.position.y = s.userData.by + Math.sin(el * 0.62 + k * 0.9) * 0.08
          s.position.z = s.userData.bz + Math.sin(el * 0.45 + k * 0.6) * 0.05
        })
      }

      renderer.render(scene, camera)
    }

    resize()
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      mount.removeEventListener('mousemove', pointer)
      mount.removeEventListener('touchmove', pointer)
      mount.removeEventListener('mouseleave', onLeave)
      mount.removeEventListener('mousedown', onDown)
      mount.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}