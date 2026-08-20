'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function WaxSeal() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0, 6.4)

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

    const group = new THREE.Group()
    scene.add(group)

    const wax = new THREE.MeshStandardMaterial({
      color: 0x8e2b22,
      roughness: 0.48,
      metalness: 0.06,
    })
    const waxLit = new THREE.MeshStandardMaterial({
      color: 0xa8342a,
      roughness: 0.4,
      metalness: 0.08,
    })

    // main blob — a squashed sphere reads more like poured wax than a cylinder
    const blobGeo = new THREE.SphereGeometry(1.5, 64, 40)
    const bp = blobGeo.attributes.position
    for (let i = 0; i < bp.count; i++) {
      const x = bp.getX(i)
      const y = bp.getY(i)
      const z = bp.getZ(i)
      // flatten front-to-back, and give the rim an irregular spread
      const wobble = 1 + Math.sin(Math.atan2(y, x) * 7) * 0.045
      bp.setX(i, x * wobble)
      bp.setY(i, y * wobble)
      bp.setZ(i, z * 0.26)
    }
    bp.needsUpdate = true
    blobGeo.computeVertexNormals()

    const blob = new THREE.Mesh(blobGeo, wax)
    group.add(blob)

    // pressed rim, slightly proud of the surface
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(1.12, 0.055, 20, 90),
      waxLit
    )
    rim.position.z = 0.34
    group.add(rim)

    const rimInner = new THREE.Mesh(
      new THREE.TorusGeometry(0.95, 0.028, 16, 80),
      waxLit
    )
    rimInner.position.z = 0.36
    group.add(rimInner)

    // radiating teeth around the edge, like a die-pressed seal
    for (let k = 0; k < 30; k++) {
      const a = (k / 30) * Math.PI * 2
      const tooth = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.13, 0.05),
        waxLit
      )
      tooth.position.set(Math.cos(a) * 1.3, Math.sin(a) * 1.3, 0.3)
      tooth.rotation.z = a
      group.add(tooth)
    }

    // centre emblem — Ashoka Chakra, 24 spokes
    const chakra = new THREE.Group()

    // outer felloe
    const felloe = new THREE.Mesh(
      new THREE.TorusGeometry(0.62, 0.045, 18, 80),
      waxLit
    )
    chakra.add(felloe)

    // hub
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.11, 0.09, 32),
      waxLit
    )
    hub.rotation.x = Math.PI / 2
    chakra.add(hub)

    // 24 spokes
    for (let k = 0; k < 24; k++) {
      const a = (k / 24) * Math.PI * 2
      const spoke = new THREE.Mesh(
        new THREE.BoxGeometry(0.032, 0.51, 0.038),
        waxLit
      )
      spoke.position.set(Math.cos(a) * 0.36, Math.sin(a) * 0.36, 0)
      spoke.rotation.z = a - Math.PI / 2
      chakra.add(spoke)
    }

    chakra.position.z = 0.4
    group.add(chakra)

    // lights — a hard key gives wax its characteristic sheen
    scene.add(new THREE.AmbientLight(0xffffff, 0.55))

    const key = new THREE.DirectionalLight(0xfff1dd, 1.5)
    key.position.set(2.6, 3.4, 4.2)
    scene.add(key)

    const rimLight = new THREE.DirectionalLight(0xc98a14, 0.5)
    rimLight.position.set(-3.2, -1.4, 1.8)
    scene.add(rimLight)

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    function pointer(e: MouseEvent | TouchEvent) {
      const r = mount!.getBoundingClientRect()
      const px = 'touches' in e ? e.touches[0].clientX : e.clientX
      const py = 'touches' in e ? e.touches[0].clientY : e.clientY
      tx = ((px - r.left) / r.width - 0.5) * 0.6
      ty = ((py - r.top) / r.height - 0.5) * 0.45
    }

    const onLeave = () => {
      tx = 0
      ty = 0
    }

    mount.addEventListener('mousemove', pointer)
    mount.addEventListener('touchmove', pointer, { passive: true })
    mount.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', resize)

    const t0 = performance.now()
    let frame = 0

    function tick(now: number) {
      frame = requestAnimationFrame(tick)
      const el = (now - t0) / 1000

      cx += (ty - cx) * 0.045
      cy += (tx - cy) * 0.045

      group.rotation.x = cx
      group.rotation.y = cy + (reduce ? 0 : Math.sin(el * 0.18) * 0.14)

      if (!reduce) {
        chakra.rotation.z = el * 0.12
      }

      if (!reduce) {
        group.position.y = Math.sin(el * 0.6) * 0.06
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
      window.removeEventListener('resize', resize)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}