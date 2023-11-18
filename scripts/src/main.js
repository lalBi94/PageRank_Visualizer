import Graph from "./class/Graph/Graph.js";
import Page from "./class/Page/Page.js";

window.addEventListener("load", () => {
    console.log(document.getElementById("root"))
})

// const STEPS = 100
// let T = 1

// const pgs_7 = [
//     new Page(0, "Facebook", 1/7),
//     new Page(1, "Microsoft", 1/7),
//     new Page(2, "Ubisoft", 1/7),
//     new Page(3, "Docker", 1/7),
//     new Page(4, "Sony", 1/7),
//     new Page(5, "Carrefour", 1/7),
//     new Page(6, "Github", 1/7),
// ]

// const gr = new Graph(pgs_7)

// while(T <= STEPS) {
//     const allPages = gr.getPages()

//     console.info(`\n[T ${T}]`)
//     const page_x_id = Math.round(Math.random() * (allPages.length-1))
//     let page_y_id = Math.round(Math.random() * (allPages.length-1))

//     while(page_y_id === page_x_id) {
//         page_y_id = Math.round(Math.random() * (allPages.length-1))
//     }

//     console.log(`Page x: ${allPages[page_x_id].getId()} (${allPages[page_x_id].getName()})`)
//     console.log(`Page y: ${allPages[page_y_id].getId()} (${allPages[page_y_id].getName()})`)

//     if(gr.updatePageOut(page_x_id, allPages[page_y_id]))
//         gr.updatePageIn(page_y_id, allPages[page_x_id])

//     T++
// }

// console.log("\n", gr.getPages())