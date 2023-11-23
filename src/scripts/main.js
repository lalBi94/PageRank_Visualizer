import Graph from "./class/Graph/Graph.js";
import Page from "./class/Page/Page.js";

const timingInterval = 40

window.addEventListener("load", () => {
	const ROOT = document.getElementById("root")
	const DATAS = document.getElementById("scoreboard-datas-container")
	let T = 0;

	const PGS = [
		new Page(0, "Instagram", 1/9),
		new Page(1, "Snapchat", 1/8),
		new Page(2, "Discord", 1/7),
		new Page(3, "X", 1/7),
		new Page(4, "Reddit", 1/6),
		new Page(5, "BeReal", 1/5),
		new Page(6, "Facebook", 1/5),
		new Page(7, "Skype", 1/3),
		new Page(8, "MSN", 1/2),
		new Page(9, "MySpace", 1/2)
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
	}, timingInterval)
});