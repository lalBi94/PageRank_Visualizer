import Page from "./../Page/Page.js";

export default class Graph {
	/**
	 * @param {Page[]} pages Les pages qui seront dans la modelisation.
	 * @param {HTMLElement} root La racine ou injecter les nodes.
	 */
	constructor(pages, root) {
		this.pages = pages;
		this.root = root;

		this.generateGraph().then((status) => {
			console.info(
				status ? "[o] Graphe construit." : "[!] Graphe non construit."
			);
		});
	}







	/**
	 * Calculer le PageRank du graphe.
	 * @param {number} dampingFactor Le facteur d'amortissement pour le calcul du PageRank.
	 * @param {number} maxIterations Le nombre maximal d'itérations pour le calcul du PageRank.
	 * @param {number} tolerance La tolérance pour la convergence du calcul du PageRank.
	 * @return {Object} Un objet contenant les PageRanks des pages.
	 */
	async calculatePageRank(
		dampingFactor = 0.85,
		maxIterations = 100,
		tolerance = 1e-6
	) {
		const pageRanks = {};

		// Initialiser les PageRanks
		this.pages.forEach((page) => {
			pageRanks[page.getId()] = 1 / this.pages.length;
		});

		// Itérations jusqu'à convergence ou nombre maximal d'itérations atteint
		for (let iteration = 0; iteration < maxIterations; iteration++) {
			const newPageRanks = {};

			for (const page of this.pages) {
				let sum = 0;

				for (const inPageId of page.getIn()) {
					const inPage = this.pages.find(
						(p) => p.getId() === inPageId
					);
					const numOutlinks = inPage.getOut().length;

					sum += pageRanks[inPageId] / numOutlinks;
				}

				newPageRanks[page.getId()] =
					1 - dampingFactor + dampingFactor * sum;
			}

			// Vérifier la convergence
			let convergence = true;

			for (const pageId in pageRanks) {
				if (
					Math.abs(newPageRanks[pageId] - pageRanks[pageId]) >
					tolerance
				) {
					convergence = false;
					break;
				}
			}

			if (convergence) {
				break;
			}

			// Mettre à jour les PageRanks pour la prochaine itération
			for (const pageId in pageRanks) {
				pageRanks[pageId] = newPageRanks[pageId];
			}
		}

		return pageRanks;
	}









	/**
	 * Generer le graphe.
	 * @return {Promise<boolean>}
	 */
	async generateGraph() {
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
			context.moveTo(middle.x + 0.5 * tip.dy, middle.y - 0.5 * tip.dx);
			context.lineTo(middle.x - 0.5 * tip.dy, middle.y + 0.5 * tip.dx);
			context.lineTo(x2, y2);
			context.closePath();
			context.stroke();
		};

		for (let i = 0; i <= this.pages.length - 1; ++i) {
			const { x, y } = this.pages[i].getPosition();

			const radius = 20;

			context.beginPath();
			context.arc(x, y, radius, 0, 2 * Math.PI);

			const rev = this.pages[i].getRelevance();
			if (rev <= 0.2) {
				context.fillStyle = "red";
			} else if (rev <= 0.5) {
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
				x - radius,
				y - radius - 5
			);
			context.fillText(
				`${this.pages[i].relevance}`,
				x - radius,
				y + radius + 15
			);

			const out = this.pages[i].getOut();

			if (out.length >= 1) {
				for (let j = 0; j <= out.length - 1; ++j) {
					const x2 = out[j].getPosition().x;
					const y2 = out[j].getPosition().y;
					drawArrow(context, x, y, x2, y2, 1);
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
	 * @return {Page[]}
	 */
	getPages() {
		return this.pages;
	}
}
