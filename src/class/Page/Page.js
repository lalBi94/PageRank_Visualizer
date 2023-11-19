export default class Page {
    /**
     * @param {number} id Identifiant de la page.
     * @param {string} name Nom du site.
     * @param {number} relevance Pertinence du site (init. a 1/nb_page).
     * @param {{x:number, y:number, z:number}} La position du node dans la feuille
     */
    constructor(id, name, relevance, postion) {
        this.id = id
        this.name = name
        this.postion = postion
        this.relevance = relevance.toFixed(2)

        /**
         * @type {Page[]}
         */
        this.out = []
        /**
         * @type {Page[]}
         */
        this.in = []
    }

    /**
     * Recuperer les sorties
     * @return {Page[]}
     */
    getOut() {
        return this.out
    }

    /**
     * Recuperer la position de la page.
     * @return {x: number, y: number} 
     */
    getPosition() {
        return this.postion
    }

    /**
     * Modifier la pertinance du site.
     * @param {number} newRelevance La nouvelle valeur.
     */
    updateRelevance(newRelevance) {
        this.relevance = newRelevance
    }

    /**
     * Ajouter une page entrante.
     */
    addIn(id_y) {
        this.in.push(id_y)
    }

    /**
     * Ajouter une page sortante.
     * @param {Page} p_y La page sortante
     */
    addOut(p_y) {
        for(let i = 0; i <= this.out.length-1; ++i) {
            if((this.out[i].getName() === p_y.getName()) && (this.out[i].getId() === p_y.getId())) {
                console.log("break")
                return
            }
        }

        this.out.push(p_y)
    }

    /**
     * Recuperer la pertinence de la page.
     * @return {number}
     */
    getRelevance() { return this.relevance }

    /**
     * Recuperer l'id de la page.
     * @return {string}
     */
    getId() { return this.id }

    /**
     * Recuperer le npm de la page.
     * @return {string}
     */
    getName() { return this.name }
}