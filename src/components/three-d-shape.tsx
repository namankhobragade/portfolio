'use client';

import { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

export function ThreeDShape() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
      <div className="w-32 h-32 bg-blue-500/30 rounded-full animate-pulse" />
    </div>
  );
}
