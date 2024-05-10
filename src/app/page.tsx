import Image from 'next/image';
import BoxIndex from '../components/boxIndex';
import Icon from '../components/icon';
import View from '../components/view';
import SphereIndex from '@/components/sphereIndex';
import TableIndex from '@/components/tableIndex';
import PeriodicTable from '@/components/periodicTable';
import Gallery from '@/components/gallery';

const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: '/image.png' },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: '/image.png' },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: '/image.png' },
  // Left
  {
    position: [-1.75, 0, 0.25],
    rotation: [0, Math.PI / 2.5, 0],
    url: '/image.png',
  },
  {
    position: [-2.15, 0, 1.5],
    rotation: [0, Math.PI / 2.5, 0],
    url: '/image.png',
  },
  {
    position: [-2, 0, 2.75],
    rotation: [0, Math.PI / 2.5, 0],
    url: '/image.png',
  },
  // Right
  {
    position: [1.75, 0, 0.25],
    rotation: [0, -Math.PI / 2.5, 0],
    url: '/image.png',
  },
  {
    position: [2.15, 0, 1.5],
    rotation: [0, -Math.PI / 2.5, 0],
    url: '/image.png',
  },
  {
    position: [2, 0, 2.75],
    rotation: [0, -Math.PI / 2.5, 0],
    url: '/image.png',
  },
];

export default function Home() {
  return (
    <main>
      {/* <View /> */}
      {/* <BoxIndex /> */}
      {/* <Icon /> */}
      {/* <SphereIndex /> */}
      {/* <TableIndex /> */}
      <PeriodicTable />
      {/* <Gallery images={images} /> */}
    </main>
  );
}
