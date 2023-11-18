export default class Page {
    /**
     * @param {number} id Identifiant de la page.
     * @param {string} name Nom du site.
     * @param {number} relevance Pertinence du site (init. a 1/nb_page).
     */
    constructor(id, name, relevance) {
        this.id = id
        this.name = name
        this.relevance = relevance.toFixed(2)
        this.out = []
        this.in = []
    }

    /**
     * Ajouter une page entrante
     */
    addIn(id_y) {
        this.in.push(id_y)
    }

    /**
     * Ajouter une page sortante
     */
    addOut(id_y) {
        this.out.push(id_y)
    }

    /**
     * Recuperer la pertinence de la page
     * @return {number}
     */
    getRelevance() { return this.relevance }

    /**
     * Recuperer l'id de la page 
     * @return {string}
     */
    getId() { return this.id }

    /**
     * Recuperer le npm de la page 
     * @return {string}
     */
    getName() { return this.name }
}