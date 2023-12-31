import Page from "./../Page/Page.js";

export default class Graph {
	/**
	 * @param {Array<Page>} pages Les pages qui seront dans la modelisation.
	 * @param {HTMLElement} root La racine ou injecter les nodes.
	 * @param {HTMLElement} datas La racine ou injecter les nodes.
	 */
	constructor(pages, root, datas) {
		this.pages = pages;
		this.root = root;
		this.datas = datas;

		this.generateGraph().then((status) => {
			console.info(
				status ? "[o] Graphe construit." : "[!] Graphe non construit."
			);
		});
	}

	/**
	 * Supprimer aleatoirement a chaque iteration une page y faisant partie de la sortie d'une page x
	 * en fonction de sa pertinence. Si c'est la plus basse, elle aura un certain pourcentage de chance d'etre efface.
	 */
	async randomRemove() {
		const page_x_id = Math.round(Math.random() * (this.pages.length - 1));
		
		if(this.pages[page_x_id].getOut().length > 0) {
			const element = this.pages[page_x_id].getOut().sort((a, b) => {
				b.getRelevance() - a.getRelevance()
			})[0]

			const ran = Math.floor(Math.random() * (element.getRelevance() * 100)) === 0;

			if(ran) {
				console.warn(ran)
				console.warn(this.pages[ran] || null)
				const deleted = await this.pages[page_x_id].deleteInOut(element.getId())
				this.pages[page_x_id].setOut(deleted)
			}

			console.warn(this.pages)
		}
	}

	/**
	 * Generer le tableau des scores.
	 * @return {Promise<void>}
	 */
	async generateRanking() {
		let stock = [...this.pages]
		let sorted = stock.sort((a, b) => {
			return b.getPagerank() - a.getPagerank()
		})

		this.datas.innerHTML = ""

		for(let i = 0; i <= sorted.length-1; ++i) {
			const tr = document.createElement("tr")
			tr.setAttribute("class", "scoreboard-datas-line")

			const position = document.createElement("td")
			position.setAttribute("class", "scoreboard-datas")
			position.innerText = i+1

			const nom = document.createElement("td")
			nom.innerText = sorted[i].getName()

			if (i === 0) {
				nom.setAttribute("class", "scoreboard-datas first")
			} else if (i === 1) {
				nom.setAttribute("class", "scoreboard-datas second")
			} else if (i === 2) {
				nom.setAttribute("class", "scoreboard-datas third")
			}

			const score = document.createElement("td")
			score.innerText = (parseFloat(sorted[i].getPagerank())).toFixed(2)

			const rev = parseFloat(score.innerText)
			if (rev <= 0.09) {
				score.setAttribute("class", "scoreboard-datas red")
			} else if (rev <= 0.14) {
				score.setAttribute("class", "scoreboard-datas orange")
			} else {
				score.setAttribute("class", "scoreboard-datas green")
			}

			tr.appendChild(position)
			tr.appendChild(nom)
			tr.appendChild(score)

			this.datas.appendChild(tr)
		}
	}

	/**
	 * Calcul du PageRank de toutes les pages.
	 * @param {?number} d Amortissement.
	 * @param {number} maxIterations Nombre d'iteration maximum.
	 * @return {Promise<Array<number>>}
	 */
	pagerank(d = 0.85, maxIterations = 100) {
		return new Promise((resolve, _) => {
			const N = this.pages.length;
			let PR = new Array(N).fill(1 / N);
	
			for (let iteration = 0; iteration <= maxIterations-1; ++iteration) {
				let newPR = new Array(N).fill(0);
	
				for (let i = 0; i <= N-1; ++i) {
					const outDegree = this.pages[i].getOut().length;
		
					if (outDegree > 0) {
						const contribution = PR[i] / outDegree;
	
						this.pages[i].getOut().forEach((page, __) => {
							const index = this.pages.indexOf(page);
							newPR[index] += contribution;
						});
					} else {
						const uniformContribution = PR[i] / N;
						newPR = newPR.map(rank => rank + uniformContribution);
					}
				}
		
				newPR = newPR.map(rank => (1 - d) / N + d * rank);
		
				if (this.isConverged(PR, newPR)) {
					console.info(`[o] PageRank convergé après ${iteration + 1} itérations.`);
					break;
				}
		
				PR = newPR;
			}
	
			for(let j = 0; j <= PR.length-1; ++j) {
				this.pages[j].setPagerank(PR[j])
			}
		
			resolve(PR)
		})
	}
	
	/**
	 * Verifie si un score se stabilise.
	 * @param {Array<number>} oldRanks Ancien score.
	 * @param {Array<number>} newRanks Nouveau score.
	 * @param {number} threshold Difference pour considerer que oui ou non ca converge.
	 * @return {boolean}
	 */
	isConverged(oldRanks, newRanks, threshold = 0.0001) {
		for (let i = 0; i <= oldRanks.length-1; ++i) {
			if (Math.abs(oldRanks[i] - newRanks[i]) > threshold) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Generer le graphe.
	 * @return {Promise<boolean>}
	 */
	async generateGraph() {
		const generateCircularPositions = async (centerX, centerY, radius=200) => {
			const positions = [];
			const angleIncrement = (2 * Math.PI) / this.pages.length;
		
			for (let i = 0; i <= this.pages.length-1; ++i) {
				const angle = i * angleIncrement;
				const x = centerX + radius * Math.cos(angle);
				const y = centerY + radius * Math.sin(angle);
		
				positions.push({ x, y });
			}
		
			return positions;
		}

		const positions = await generateCircularPositions(this.root.width/2, this.root.height/2)

		for(let i = 0; i <= this.pages.length-1; ++i) {
			await this.pages[i].setPosition(positions[i])
		}
		
		const context = this.root.getContext("2d");
		context.fillStyle = "red";

		const canvasWidth = this.root.width;
		const canvasHeight = this.root.height;

		context.clearRect(0, 0, canvasWidth, canvasHeight);

		const drawArrow = (context, x1, y1, x2, y2, t = 0.9) => {
			const arrow = {
				dx: x2 - x1,
				dy: y2 - y1,
			};
		
			const middle = {
				x: arrow.dx * t + x1,
				y: arrow.dy * t + y1,
			};
		
			const tip = {
				dx: x2 - middle.x,
				dy: y2 - middle.y,
			};
		
			context.beginPath();
			context.moveTo(x1, y1);
			context.lineTo(middle.x, middle.y);
			context.moveTo(middle.x + 0.1 * tip.dy, middle.y - 0.1 * tip.dx);
			context.lineTo(middle.x - 0.1 * tip.dy, middle.y + 0.1 * tip.dx);
			context.lineTo(x2, y2);
			context.closePath();
			context.fillStyle = 'black';
			context.stroke();
			context.fill();
		};
		

		for (let i = 0; i <= this.pages.length - 1; ++i) {
			const { x, y } = await this.pages[i].getPosition();

			const radius = 20;

			context.beginPath();
			context.arc(x, y, radius, 0, 2 * Math.PI);

			const rev = this.pages[i].getPagerank();
			if (rev <= 0.08) {
				context.fillStyle = "red";
			} else if (rev <= 0.14) {
				context.fillStyle = "orange";
			} else {
				context.fillStyle = "green";
			}

			context.fill();
			context.closePath();

			context.font = "12px Arial";
			context.fillStyle = "black";
			context.fillText(
				`${this.pages[i].name}`,
				x - radius - 15,
				y - radius - 2
			);
		}

		for(let i = 0; i <= this.pages.length-1; ++i) {
			const { x, y } = await this.pages[i].getPosition();
			const out = this.pages[i].getOut();

			if (out.length >= 1) {
				for (let j = 0; j <= out.length - 1; ++j) {
					const p2 = await out[j].getPosition();
					drawArrow(context, x, y, p2.x, p2.y, 0.9);
				}
			}
		}
	}

	/**
	 * Mettre a jour l'entree d'une page y.
	 * @param {number} index Index de la page dans this.page.
	 * @param {Page} page Objet page a ajouter a l'entree de page y.
	 * @return {void}
	 */
	updatePageIn(index, page) {
		console.info("[o] Page y prends une nouvelle entree...");
		this.pages[index].addIn(page);
	}

	/**
	 * Mettre a jour la sortie d'une page x.
	 * @param {number} index Index de la page dans this.pages.
	 * @param {Page} page Objet page a ajouter a la sorti de page x.
	 * @return {boolean}
	 */
	updatePageOut(index, page) {
		const ran =
			Math.floor(Math.random() * (page.getRelevance() * 100)) === 0;

		if (ran) {
			console.info("[o] Page x prends une nouvelle sortie...");
			this.pages[index].addOut(page);
			return true;
		} else {
			console.info("[o] Page x ne prends une nouvelle sortie...");
			return false;
		}
	}

	/**
	 * Recuperer toutes les pages.
	 * @return {Array<Page>}
	 */
	getPages() {
		return this.pages;
	}
}