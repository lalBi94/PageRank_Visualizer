import Graph from "./class/Graph/Graph.js";
import Page from "./class/Page/Page.js";

window.addEventListener("load", () => {
	const ROOT = document.getElementById("root")
	let T = 1;

	const PGS = [
		new Page(0, "Facebook", { x: 400 + 150 * Math.cos(0), y: 300 + 150 * Math.sin(0) }),
		new Page(1, "Microsoft", { x: 400 + 150 * Math.cos((2 * Math.PI) / 8), y: 300 + 150 * Math.sin((2 * Math.PI) / 8) }),
		new Page(2, "Carrefour", { x: 400 + 150 * Math.cos((4 * Math.PI) / 8), y: 300 + 150 * Math.sin((4 * Math.PI) / 8) }),
		new Page(3, "Ubisoft", { x: 400 + 150 * Math.cos((6 * Math.PI) / 8), y: 300 + 150 * Math.sin((6 * Math.PI) / 8) }),
		new Page(4, "Github", { x: 400 + 150 * Math.cos((8 * Math.PI) / 8), y: 300 + 150 * Math.sin((8 * Math.PI) / 8) }),
		new Page(5, "Sony", { x: 400 + 150 * Math.cos((10 * Math.PI) / 8), y: 300 + 150 * Math.sin((10 * Math.PI) / 8) }),
		new Page(5, "Docker", { x: 400 + 150 * Math.cos((12 * Math.PI) / 8), y: 300 + 150 * Math.sin((12 * Math.PI) / 8) }),
		new Page(6, "Riot Games", { x: 400 + 150 * Math.cos((14 * Math.PI) / 8), y: 300 + 150 * Math.sin((14 * Math.PI) / 8) })		
	]; 

	const gr = new Graph(PGS, ROOT);

	setInterval(async () => {
		const allPages = gr.getPages();

		console.info(`\n[T ${T}]`);
		const page_x_id = Math.round(Math.random() * (allPages.length - 1));
		let page_y_id = Math.round(Math.random() * (allPages.length - 1));

		while (page_y_id === page_x_id) {
			page_y_id = Math.round(Math.random() * (allPages.length - 1));
		}

		console.log(
			`Page x: ${allPages[page_x_id].getId()} (${allPages[
				page_x_id
			].getName()})`
		);

		console.log(
			`Page y: ${allPages[page_y_id].getId()} (${allPages[
				page_y_id
			].getName()})`
		);

		if (gr.updatePageOut(page_x_id, allPages[page_y_id]))
			gr.updatePageIn(page_y_id, allPages[page_x_id]);

		await gr.pagerank()
		await gr.generateGraph()
		console.log("\n", gr.getPages());
		T++;
	}, 500)
});