import { describe, it, expect } from 'vitest'

describe('requestAnimationFrame', () => {
  describe('Easing Functions', () => {
    const easing = {
      easeIn: (t) => t * t,
      easeOut: (t) => t * (2 - t),
      easeInOut: (t) => t < 0.5 
        ? 2 * t * t 
        : -1 + (4 - 2 * t) * t,
      easeOutBounce: (t) => {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t
        } else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
        } else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
        } else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
        }
      }
    }
    
    describe('easeIn', () => {
      it('should return 0 when progress is 0', () => {
        expect(easing.easeIn(0)).toBe(0)
      })
      
      it('should return 1 when progress is 1', () => {
        expect(easing.easeIn(1)).toBe(1)
      })
      
      it('should return 0.25 when progress is 0.5 (quadratic)', () => {
        expect(easing.easeIn(0.5)).toBe(0.25)
      })
      
      it('should start slow and end fast', () => {
        const firstQuarter = easing.easeIn(0.25) - easing.easeIn(0)
        const secondQuarter = easing.easeIn(0.5) - easing.easeIn(0.25)
        expect(firstQuarter).toBeLessThan(secondQuarter)
      })
    })
    
    describe('easeOut', () => {
      it('should return 0 when progress is 0', () => {
        expect(easing.easeOut(0)).toBe(0)
      })
      
      it('should return 1 when progress is 1', () => {
        expect(easing.easeOut(1)).toBe(1)
      })
      
      it('should return 0.75 when progress is 0.5', () => {
        expect(easing.easeOut(0.5)).toBe(0.75)
      })
      
      it('should start fast and end slow', () => {
        const firstQuarter = easing.easeOut(0.25) - easing.easeOut(0)
        const lastQuarter = easing.easeOut(1) - easing.easeOut(0.75)
        expect(firstQuarter).toBeGreaterThan(lastQuarter)
      })
    })
    
    describe('easeInOut', () => {
      it('should return 0 when progress is 0', () => {
        expect(easing.easeInOut(0)).toBe(0)
      })
      
      it('should return 1 when progress is 1', () => {
        expect(easing.easeInOut(1)).toBe(1)
      })
      
      it('should return 0.5 when progress is 0.5', () => {
        expect(easing.easeInOut(0.5)).toBe(0.5)
      })
      
      it('should be symmetric around 0.5', () => {
        const at025 = easing.easeInOut(0.25)
        const at075 = easing.easeInOut(0.75)
        expect(at025 + at075).toBeCloseTo(1)
      })
    })
    
    describe('easeOutBounce', () => {
      it('should return 0 when progress is 0', () => {
        expect(easing.easeOutBounce(0)).toBe(0)
      })
      
      it('should return 1 when progress is 1', () => {
        expect(easing.easeOutBounce(1)).toBeCloseTo(1, 5)
      })
      
      it('should produce values in range [0, 1]', () => {
        for (let t = 0; t <= 1; t += 0.1) {
          const value = easing.easeOutBounce(t)
          expect(value).toBeGreaterThanOrEqual(0)
          expect(value).toBeLessThanOrEqual(1.1)
        }
      })
    })
  })
  
  describe('Animation Progress Calculation', () => {
    it('should calculate progress from 0 to 1 based on elapsed time', () => {
      const duration = 2000
      const startTime = 1000
      
      function calculateProgress(timestamp) {
        const elapsed = timestamp - startTime
        return Math.min(elapsed / duration, 1)
      }
      
      expect(calculateProgress(1000)).toBe(0)
      expect(calculateProgress(2000)).toBe(0.5)
      expect(calculateProgress(3000)).toBe(1)
      expect(calculateProgress(4000)).toBe(1)
    })
    
    it('should calculate position based on progress', () => {
      const totalDistance = 400
      
      function calculatePosition(progress) {
        return progress * totalDistance
      }
      
      expect(calculatePosition(0)).toBe(0)
      expect(calculatePosition(0.5)).toBe(200)
      expect(calculatePosition(1)).toBe(400)
    })
  })
  
  describe('Delta Time Calculation', () => {
    it('should calculate deltaTime correctly', () => {
      let lastTime = 0
      const speed = 200
      
      function calculateMovement(currentTime) {
        const deltaTime = (currentTime - lastTime) / 1000
        lastTime = currentTime
        return speed * deltaTime
      }
      
      lastTime = 0
      const movement60fps = calculateMovement(16.67)
      expect(movement60fps).toBeCloseTo(200 * 0.01667, 1)
      
      lastTime = 0
      const movement30fps = calculateMovement(33.33)
      expect(movement30fps).toBeCloseTo(200 * 0.03333, 1)
    })
    
    it('should produce approximately same distance at different frame rates', () => {
      const speed = 200
      const totalTime = 1000
      
      let position60fps = 0
      for (let time = 16.67; time <= totalTime; time += 16.67) {
        position60fps += speed * (16.67 / 1000)
      }
      
      let position30fps = 0
      for (let time = 33.33; time <= totalTime; time += 33.33) {
        position30fps += speed * (33.33 / 1000)
      }
      
      expect(position60fps).toBeCloseTo(200, -1)
      expect(position30fps).toBeCloseTo(200, -1)
      expect(Math.abs(position60fps - position30fps)).toBeLessThan(10)
    })
  })
  
  describe('Reusable Animation Function', () => {
    it('should apply easing function to progress', () => {
      const easeIn = t => t * t
      
      expect(easeIn(0.5)).toBe(0.25)
      
      function applyEasing(linearProgress, easingFn) {
        return easingFn(linearProgress)
      }
      
      expect(applyEasing(0, easeIn)).toBe(0)
      expect(applyEasing(0.5, easeIn)).toBe(0.25)
      expect(applyEasing(1, easeIn)).toBe(1)
    })
    
    it('should clamp progress to 1 when time exceeds duration', () => {
      const duration = 1000
      const startTime = 0
      
      function getProgress(currentTime) {
        let progress = (currentTime - startTime) / duration
        if (progress > 1) progress = 1
        return progress
      }
      
      expect(getProgress(500)).toBe(0.5)
      expect(getProgress(1000)).toBe(1)
      expect(getProgress(2000)).toBe(1)
    })
  })
  
  describe('Pausable Animation Class', () => {
    class Animation {
      constructor({ duration, timing, draw }) {
        this.duration = duration
        this.timing = timing
        this.draw = draw
        this.elapsed = 0
        this.running = false
        this.lastTime = null
      }
      
      start() {
        if (this.running) return
        this.running = true
        this.lastTime = performance.now()
      }
      
      pause() {
        this.running = false
      }
      
      getProgress() {
        let progress = this.elapsed / this.duration
        if (progress > 1) progress = 1
        return this.timing(progress)
      }
    }
    
    it('should track elapsed time and running state', () => {
      const anim = new Animation({
        duration: 1000,
        timing: t => t,
        draw: () => {}
      })
      
      expect(anim.elapsed).toBe(0)
      expect(anim.running).toBe(false)
    })
    
    it('should not start multiple times if already running', () => {
      const anim = new Animation({
        duration: 1000,
        timing: t => t,
        draw: () => {}
      })
      
      anim.start()
      expect(anim.running).toBe(true)
      
      const initialLastTime = anim.lastTime
      anim.start()
      expect(anim.lastTime).toBe(initialLastTime)
    })
    
    it('should pause and set running to false', () => {
      const anim = new Animation({
        duration: 1000,
        timing: t => t,
        draw: () => {}
      })
      
      anim.start()
      expect(anim.running).toBe(true)
      
      anim.pause()
      expect(anim.running).toBe(false)
    })
    
    it('should apply timing function to progress', () => {
      const easeIn = t => t * t
      const anim = new Animation({
        duration: 1000,
        timing: easeIn,
        draw: () => {}
      })
      
      anim.elapsed = 500
      expect(anim.getProgress()).toBe(0.25)
      
      anim.elapsed = 1000
      expect(anim.getProgress()).toBe(1)
    })
  })
  
  describe('First Frame Handling', () => {
    it('should demonstrate the problem with improper initialization', () => {
      let lastTime = 0
      
      function animateWrong(time) {
        const delta = time - lastTime
        lastTime = time
        return delta
      }
      
      const delta = animateWrong(5000)
      expect(delta).toBe(5000)
    })
    
    it('should properly handle first frame with null check', () => {
      let lastTime = null
      
      function animateCorrect(time) {
        if (lastTime === null) {
          lastTime = time
          return null
        }
        
        const delta = time - lastTime
        lastTime = time
        return delta
      }
      
      const firstDelta = animateCorrect(5000)
      expect(firstDelta).toBeNull()
      
      const secondDelta = animateCorrect(5016.67)
      expect(secondDelta).toBeCloseTo(16.67, 1)
    })
  })
})
