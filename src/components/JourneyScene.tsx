import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

type SceneProps = {
  reducedMotion: boolean
}

type CheckpointModel = {
  label: string
  color: string
  position: [number, number, number]
  scale: number
}

const checkpoints: CheckpointModel[] = [
  { label: 'profile', color: '#1d63d8', position: [-2.9, -1.15, 0.2], scale: 0.55 },
  { label: 'wheelsense', color: '#1f9f6f', position: [-1.35, -0.55, 0.5], scale: 0.75 },
  { label: 'research', color: '#19aee6', position: [0.25, 0.05, 0.25], scale: 0.58 },
  { label: 'honors', color: '#d8a124', position: [1.55, 0.65, 0.35], scale: 0.67 },
  { label: 'certificates', color: '#e85d5d', position: [2.75, 1.1, 0.1], scale: 0.56 },
]

function SignalTrail() {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      checkpoints.map((point) => new THREE.Vector3(...point.position)),
    )
    return new THREE.TubeGeometry(curve, 96, 0.025, 10, false)
  }, [])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#1d63d8"
        emissive="#19aee6"
        emissiveIntensity={0.28}
        roughness={0.32}
        metalness={0.25}
      />
    </mesh>
  )
}

function Checkpoint({
  checkpoint,
  index,
  reducedMotion,
}: {
  checkpoint: CheckpointModel
  index: number
  reducedMotion: boolean
}) {
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!ref.current || reducedMotion) return
    ref.current.position.y =
      checkpoint.position[1] + Math.sin(clock.elapsedTime * 0.8 + index) * 0.045
    ref.current.rotation.y = clock.elapsedTime * 0.22 + index * 0.3
  })

  return (
    <group
      ref={ref}
      position={checkpoint.position}
      scale={hovered ? checkpoint.scale * 1.12 : checkpoint.scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.025, 12, 72]} />
        <meshStandardMaterial
          color={checkpoint.color}
          emissive={checkpoint.color}
          emissiveIntensity={1.4}
          transparent
          opacity={0.86}
        />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.52, 0.64, 0.12, 56]} />
        <meshStandardMaterial color="#ffffff" roughness={0.36} metalness={0.16} />
      </mesh>
      {checkpoint.label === 'wheelsense' ? (
        <group position={[0, 0.3, 0]} rotation={[0.6, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.34, 0.045, 12, 48]} />
            <meshStandardMaterial color="#ffffff" emissive="#19aee6" emissiveIntensity={0.18} />
          </mesh>
          <mesh position={[0.42, 0, 0]}>
            <torusGeometry args={[0.22, 0.035, 12, 48]} />
            <meshStandardMaterial color="#ffffff" emissive="#19aee6" emissiveIntensity={0.18} />
          </mesh>
          <mesh position={[0.22, 0.2, 0]}>
            <boxGeometry args={[0.56, 0.08, 0.08]} />
            <meshStandardMaterial color="#7adbf7" />
          </mesh>
        </group>
      ) : checkpoint.label === 'honors' ? (
        <group position={[0, 0.32, 0]}>
          <mesh>
            <icosahedronGeometry args={[0.26, 0]} />
            <meshStandardMaterial color="#d8a124" roughness={0.28} metalness={0.5} />
          </mesh>
          <mesh position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.18, 0.25, 0.22, 24]} />
            <meshStandardMaterial color="#b88414" roughness={0.35} metalness={0.62} />
          </mesh>
        </group>
      ) : checkpoint.label === 'certificates' ? (
        <group position={[0, 0.32, 0]} rotation={[0.1, -0.2, 0]}>
          <mesh>
            <boxGeometry args={[0.52, 0.68, 0.04]} />
            <meshStandardMaterial color="#ffffff" roughness={0.45} />
          </mesh>
          <mesh position={[0, -0.16, 0.035]}>
            <torusGeometry args={[0.09, 0.012, 8, 20]} />
            <meshStandardMaterial color="#d8a124" emissive="#d8a124" emissiveIntensity={0.12} />
          </mesh>
        </group>
      ) : (
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.24, 32, 32]} />
          <meshStandardMaterial
            color={checkpoint.color}
            emissive={checkpoint.color}
            emissiveIntensity={0.45}
            roughness={0.35}
            metalness={0.25}
          />
        </mesh>
      )}
    </group>
  )
}

function Terrain({ reducedMotion }: SceneProps) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current || reducedMotion) return
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.08
  })

  return (
    <group ref={ref} rotation={[-0.18, 0.2, 0]}>
      <mesh position={[0, -1.45, -0.08]} rotation={[0, 0, -0.06]}>
        <boxGeometry args={[6.8, 0.24, 2.7]} />
        <meshStandardMaterial color="#dcecf9" roughness={0.82} metalness={0.12} />
      </mesh>
      <SignalTrail />
      {checkpoints.map((checkpoint, index) => (
        <Checkpoint
          checkpoint={checkpoint}
          index={index}
          key={checkpoint.label}
          reducedMotion={reducedMotion}
        />
      ))}
      <mesh position={[2.1, -0.4, -0.35]} rotation={[0.1, 0.65, 0]}>
        <boxGeometry args={[0.55, 0.1, 0.42]} />
        <meshStandardMaterial color="#b8d8ef" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[-2.1, -0.95, -0.3]} rotation={[0, -0.7, 0]}>
        <boxGeometry args={[0.48, 0.08, 0.38]} />
        <meshStandardMaterial color="#c7e2f6" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  )
}

export function JourneyScene({ reducedMotion }: SceneProps) {
  return (
    <div className="journey-scene" role="img" aria-label="Interactive 3D journey map with five portfolio checkpoints">
      <Canvas
        camera={{ position: [0, 0.25, 6.15], fov: 45 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#f7fbff']} />
        <ambientLight intensity={1.25} />
        <directionalLight position={[3.5, 4, 5]} intensity={2.1} />
        <pointLight position={[-3, 0.5, 3]} color="#19aee6" intensity={6} distance={8} />
        <pointLight position={[3, 2, 2]} color="#d8a124" intensity={5} distance={7} />
        <fog attach="fog" args={['#f7fbff', 6.1, 10.2]} />
        <Terrain reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
