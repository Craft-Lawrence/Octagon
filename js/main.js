$(document).ready(function() {

	let intervalY	= false;

	new Vue({
		el: '#app',
		data: {
			vX: -25,
			vY: 0,
			vZ: 0,

			sideW: 			200,
			sideH: 			200,
			perspective:	500,

			rotateSpeed:	50,
			rotate:			false,
		},
		computed: {
			containerStyle() {
				return {
					transform:	'rotateX('+this.vX+'deg) rotateY('+this.vY+'deg) rotateZ('+this.vZ+'deg)',
					width: 		this.sideW+'px',
					height: 	this.sideH+'px',
				}
			},
			sideStyle() {
				return {
					width: this.sideW+'px',
					height: this.sideH+'px',
				}
			},
			ditchD() {
				return this.sideW / 2 / Math.tan(22.5 * Math.PI/180);
			},
			angleD() {
				return this.sideW / 2 + Math.sqrt(Math.pow(this.sideW / 2, 2) / 2);
			},
			computedRotateSpeed() {
				return 101 - this.rotateSpeed;
			},
		},
		methods: {
			side90Style(arg) {
				let transform;
				switch (arg) {
					case 0: // N
						transform = 'translateZ('+this.ditchD+'px)';
						break;
					case 1: // NE
						transform = 'translateX(-'+this.angleD+'px) translateZ('+this.angleD+'px) rotateY(-45deg)';
						break;
					case 2: // E
						transform = 'translateX(-'+this.ditchD+'px) rotateY(-90deg)';
						break;
					case 3: // SE
						transform = 'translateX(-'+this.angleD+'px) translateZ(-'+this.angleD+'px) rotateY(-135deg)';
						break;
					case 4: // S
						transform = 'translateZ(-'+this.ditchD+'px) rotateY(180deg)';
						break;
					case 5: // SW
						transform = 'translateX('+this.angleD+'px) translateZ(-'+this.angleD+'px) rotateY(135deg)';
						break;
					case 6: // W
						transform = 'translateX('+this.ditchD+'px) rotateY(90deg)';
						break;
					case 7: // NW
						transform = 'translateX('+this.angleD+'px) translateZ('+this.angleD+'px) rotateY(45deg)';
						break;
				}
				return {
					transform: transform,
					width: this.sideW+'px',
					height: this.sideH+'px',
				}
			},
			checkRotate() {
				clearInterval(intervalY);
				if ( this.rotate ) {
					intervalY = setInterval( () => {
						this.vY++;
						if ( this.vY == 181 ) this.vY = -180;
					}, this.computedRotateSpeed );
				}
			},
		},
		mounted() {
			this.checkRotate();
		},
	});


});