import { useEffect } from 'react'
import randomColor from 'randomcolor'

export default function BackgroundAnimation() {
    useEffect(() => {
        const canvas = document.getElementById('canvas')
        const flr = Math.floor

        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        let halfw = canvas.width / 2
        let halfh = canvas.height / 2
        const step = 2
        const warpZ = 12
        let speed = 0.075
        const stampedDate = new Date()

        const ctx = canvas.getContext('2d')

        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        function rnd(num1, num2) {
            return flr(Math.random() * num2 * 2) + num1
        }

        function getColor() {
            return randomColor()
        }

        const star = function () {
            let v = vec3.fromValues(rnd(0 - halfw, halfw), rnd(0 - halfh, halfh), rnd(1, warpZ))

            this.x = v[0]
            this.y = v[1]
            this.z = v[2]
            this.color = getColor()

            this.reset = function () {
                v = vec3.fromValues(rnd(0 - halfw, halfw), rnd(0 - halfh, halfh), rnd(1, warpZ))

                this.x = v[0]
                this.y = v[1]
                this.color = getColor()
                vel = this.calcVel()
            }

            this.calcVel = function () {
                return vec3.fromValues(0, 0, 0 - speed)
            }

            var vel = this.calcVel()

            this.draw = function () {
                vel = this.calcVel()
                v = vec3.add(vec3.create(), v, vel)
                const x = v[0] / v[2]
                const y = v[1] / v[2]
                const x2 = v[0] / (v[2] + speed * 0.5)
                const y2 = v[1] / (v[2] + speed * 0.5)

                ctx.strokeStyle = this.color
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.lineTo(x2, y2)
                ctx.stroke()

                if (x < 0 - halfw || x > halfw || y < 0 - halfh || y > halfh) {
                    this.reset()
                }
            }
        }

        const starfield = function () {
            const numOfStars = 1000

            const stars = []

            function _init() {
                for (let i = 0, len = numOfStars; i < len; i++) {
                    stars.push(new star())
                }
            }

            _init()

            this.draw = function () {
                ctx.translate(halfw, halfh)

                for (let i = 0, len = stars.length; i < len; i++) {
                    const currentStar = stars[i]

                    currentStar.draw()
                }
            }
        }

        const mStarField = new starfield()

        function draw() {
            // make 5 seconds
            const millSeconds = 1000 * 10

            const currentTime = new Date()

            speed = 0.025

            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            mStarField.draw()

            window.requestAnimationFrame(draw)
        }

        draw()

        window.onresize = function () {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight

            halfw = canvas.width / 2
            halfh = canvas.height / 2
        }
    }, [])

    return (
        <>
            <canvas id="canvas" className="z-0 w-full h-full fixed inset-0 pointer-events-none" />
        </>
    )
}
