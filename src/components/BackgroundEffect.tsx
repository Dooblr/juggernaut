import React, { useRef, useEffect } from "react"

const BackgroundEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current

    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    let animationFrame: number

    // ParticleNetwork initialization
    const ParticleNetwork = function (parent: any) {
      this.options = {
        velocity: 1,
        density: 15000,
        netLineDistance: 200,
        netLineColor: "#929292",
        particleColors: ["#aaa"],
      }
      this.canvas = parent.canvas
      this.ctx = parent.ctx
      this.particles = []
      this.createParticles(true)
      this.animationFrame = requestAnimationFrame(this.update.bind(this))
    }

    ParticleNetwork.prototype.createParticles = function (isInitial: boolean) {
      const quantity =
        (this.canvas.width * this.canvas.height) / this.options.density
      if (isInitial) {
        let counter = 0
        const intervalId = setInterval(() => {
          if (counter < quantity - 1) {
            this.particles.push(new Particle(this))
          } else {
            clearInterval(intervalId)
          }
          counter++
        }, 250)
      } else {
        for (let i = 0; i < quantity; i++) {
          this.particles.push(new Particle(this))
        }
      }
    }

    ParticleNetwork.prototype.update = function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // Draw connections between particles
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const p1 = this.particles[i]
          const p2 = this.particles[j]
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          )

          // If particles are within netLineDistance, draw a line
          if (distance <= this.options.netLineDistance) {
            this.ctx.beginPath()
            this.ctx.strokeStyle = this.options.netLineColor
            this.ctx.globalAlpha =
              ((this.options.netLineDistance - distance) /
                this.options.netLineDistance) *
              p1.opacity *
              p2.opacity
            this.ctx.lineWidth = 0.7
            this.ctx.moveTo(p1.x, p1.y)
            this.ctx.lineTo(p2.x, p2.y)
            this.ctx.stroke()
          }
        }
      }

      // Update and draw particles
      this.particles.forEach((particle: any) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(this.update.bind(this))
    }

    const Particle = function (parent: any) {
      this.network = parent
      this.canvas = parent.canvas
      this.ctx = parent.ctx
      this.x = Math.random() * this.canvas.width
      this.y = Math.random() * this.canvas.height
      this.velocity = {
        x: (Math.random() - 0.5) * parent.options.velocity,
        y: (Math.random() - 0.5) * parent.options.velocity,
      }
      this.radius = Math.random() * 2 + 1.5
      this.opacity = 0.5 + Math.random() * 0.5
    }

    Particle.prototype.update = function () {
      this.x += this.velocity.x
      this.y += this.velocity.y

      // Reverse direction if particle goes out of bounds
      if (this.x > this.canvas.width || this.x < 0)
        this.velocity.x = -this.velocity.x
      if (this.y > this.canvas.height || this.y < 0)
        this.velocity.y = -this.velocity.y
    }

    Particle.prototype.draw = function () {
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
      this.ctx.fillStyle = "#aaa"
      this.ctx.globalAlpha = this.opacity
      this.ctx.fill()
    }

    //@ts-ignore
    const particleNetwork = new ParticleNetwork({ canvas, ctx })

    // Canvas resize handler
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
      particleNetwork.createParticles(false)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="particle-network-animation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <canvas ref={canvasRef} style={{ pointerEvents: "none" }} />
    </div>
  )
}

export default BackgroundEffect
