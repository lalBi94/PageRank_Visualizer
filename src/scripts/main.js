import Graph from "./class/Graph/Graph.js";
import Page from "./class/Page/Page.js";

window.addEventListener("load", () => {
	const ROOT = document.getElementById("root")
	const DATAS = document.getElementById("scoreboard-datas-container")
	let T = 0;

	const PGS = [
		new Page(0, "Facebook"),
		new Page(1, "Microsoft"),
		new Page(2, "Carrefour"),
		new Page(3, "Ubisoft"),
		new Page(4, "Github"),
		new Page(5, "Sony"),
		new Page(5, "Docker"),
		new Page(6, "Gouv"),
		new Page(7, "Reddit"),
		new Page(8, "Origin"),
		new Page(9, "iut-fbleau"),
		new Page(10, "Coca cola"),
	]; 

	const gr = new Graph(PGS, ROOT, DATAS);

	setInterval(async () => {
		console.log("--------------------------------------------------------")

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

		if (gr.updatePageOut(page_x_id, allPages[page_y_id])) {
			gr.updatePageIn(page_y_id, allPages[page_x_id]);
		}

		await gr.pagerank()
		await gr.generateGraph()
		await gr.generateRanking()
		await gr.randomRemove()

		console.log(gr.getPages());
		T++;
	}, 100)
});