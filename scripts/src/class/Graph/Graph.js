import Page from "./../Page/Page.js";

export default class Graph {
    /**
     * @param {Page[]} pages Les pages qui seront dans la modelisation
     */
    constructor(pages) {
        this.pages = pages

        if(this.pages.length >= 1) { 
            console.info("[o] Pages chargees avec succes !") 
        }
    }

    updatePageIn(index, page) {
        console.log("Page y prends une nouvelle entree...")
        this.pages[index].addIn(page)
    }

    /**
     * Mettre a jour la sortie d'une page
     * @param {number} index Index de la page dans this.pages
     * @param {Page} page Objet page
     * @return {boolean}
     */
    updatePageOut(index, page) {
        const ran = Math.floor(Math.random() * (page.getRelevance()*100)) === 0
        console.log(ran)
        
        if(ran) {
            console.log("Page x prends une nouvelle sortie...")
            this.pages[index].addOut(page)
            return true
        } else {
            console.log("Page x ne prends une nouvelle sortie...")
            return false
        }
    }

    getPages() { return this.pages }
}