if (window.location.hash) {
	const iframe = document.querySelector('iframe')
	iframe.src = `https://www.youtube.com/embed/${window.location.hash.replace('#', '')}?controls=0`
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const CenterX = canvas.width / 2
const CenterY = canvas.height / 2

class Spiral {
	Angle = 0
	AngleStep = 1;

	Radius = 0
	RadiusStep = 0.1

	SpiralLoops = 30;
	Iterations = this.SpiralLoops * 360 * this.AngleStep

	Color = 'black'
	LineWidth = 20
	update() {
		this.Angle += this.AngleStep;
		this.draw()
	}
	draw() {
		let angle = this.Angle;
		let radius = this.Radius

		c.strokeStyle = this.Color
		c.lineWidth = this.LineWidth
		c.beginPath()
		c.moveTo(CenterX, CenterY)

		// Рисуем спираль
		for (let i = 0; i < this.Iterations; i++) {
			// Каждый раз увеличиваем радиус, получается спираль
			radius += this.RadiusStep
			// Движение по кругу
			angle += this.AngleStep;

			const { x, y } = this.getPoint(radius, angle)
			c.lineTo(x, y);
		}
		c.stroke()
	}
	getPoint(radius, angle) {
		// формула перевода градусов в радианы
		const rad = angle * Math.PI / 180

		// формула вычисления координат зная радиус и угол поворота
		const x = CenterX + radius * Math.cos(rad);
		const y = CenterY + radius * Math.sin(rad);
		return { x, y };
	}
}

const spiral = new Spiral()

setInterval(animate, 1)

function animate() {
	c.clearRect(0, 0, canvas.width, canvas.height)
	spiral.update()

	c.beginPath();
	c.fillStyle = 'white'
	c.arc(CenterX, CenterY, 10, 0, Math.PI * 2)
	c.stroke();
	c.fill()
}
