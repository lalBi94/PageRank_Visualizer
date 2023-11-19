import Graph from "./class/Graph/Graph.js";
import Page from "./class/Page/Page.js";

window.addEventListener("load", () => {
	const ROOT = document.getElementById("root")
	let T = 1;

	const PGS = [
		new Page(0, "Facebook", 1 / 6, { x: 90, y: 350 }),
		new Page(1, "Microsoft", 1 / 6, { x: 90, y: 190 }),
		new Page(2, "Carrefour", 1 / 6, { x: 270, y: 110 }),
		new Page(3, "Ubisoft", 1 / 6, { x: 330, y: 470 }),
		new Page(4, "Github", 1 / 6, { x: 530, y: 420 }),
		new Page(5, "Sony", 1 / 6, { x: 630, y: 220 })
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

		await gr.generateGraph()
		T++;
	}, 1000)

	console.log("\n", gr.getPages());
});