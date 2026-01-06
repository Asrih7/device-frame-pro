export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  
  startMeasure(id: string) {
    if (!this.metrics.has(id)) {
      this.metrics.set(id, []);
    }
    this.metrics.get(id)!.push(performance.now());
  }
  
  endMeasure(id: string): number {
    const times = this.metrics.get(id);
    if (!times || times.length === 0) return 0;
    
    const start = times.pop()!;
    const duration = performance.now() - start;
    return duration;
  }
  
  getAverageTime(id: string): number {
    const times = this.metrics.get(id);
    if (!times || times.length === 0) return 0;
    
    const sum = times.reduce((a, b) => a + b, 0);
    return sum / times.length;
  }
}

export const performanceOptimizations = {
  enableGPUAcceleration: true,
  useIntersectionObserver: true,
  lazyLoadFrames: true,
  virtualScrolling: true,
  debounceResize: 150,
  throttleScroll: 16
};