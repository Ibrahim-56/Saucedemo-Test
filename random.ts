export function pickRandomIndices(total: number, count: number): number[] {
  if (count > total) throw new Error('count > total');
  const indices = new Set<number>();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * total));
  }
  return Array.from(indices);
}
