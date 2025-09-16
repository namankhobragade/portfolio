'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

export function ThreeDShape() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Canvas>
            <Suspense fallback={null}>
                <OrbitControls enableZoom={false} autoRotate />
                <ambientLight intensity={1} />
                <directionalLight position={[3, 2, 1]} />
                <Sphere args={[1, 100, 200]} scale={2.5}>
                   <MeshDistortMaterial
                        color="#3b82f6"
                        attach="material"
                        distort={0.5}
                        speed={2}
                    />
                </Sphere>
            </Suspense>
        </Canvas>
    );
}
