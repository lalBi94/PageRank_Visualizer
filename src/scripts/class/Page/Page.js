export default class Page {
    /**
     * @param {number} id Identifiant de la page.
     * @param {string} name Nom du site.
     * @param {number} relevance Pertinence du site definit a la main.
     */
    constructor(id, name, relevance) {
        this.id = id
        this.name = name
        this.position = {x: 0, y: 0}
        this.pagerank = 0.0
        this.relevance = relevance

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
     * Recuperer la pertinence d'une page
     * @return {number}
     */
    getRelevance() {
        return this.relevance
    }

    /**
     * Modifier la pertinance du site.
     * @param {number} newPagerank La nouvelle valeur.
     */
    updatePagerank(newPagerank) {
        this.pagerank = newPagerank
    }

    /**
     * Update le PageRank.
     * @param {number} n La nouvelle valeur.
     */
    setPagerank(n) {
        this.pagerank = n
    }

    /**
     * Recuperer le pagerank de la page.
     * @return {number}
     */
    getPagerank() { 
        return this.pagerank 
    }

    /**
     * Recuperer les sorties
     * @return {Page[]}
     */
    getOut() {
        return this.out
    }

    /**
     * Ajouter un nouveau tableau de lien sortant
     * @param {Page[]} out 
     */
    setOut(out) {
        this.out = out
    }
    
    /**
     * Supprimer une page sortante
     * @param {number} index Index de la page sortante a supprimer 
     */
    async deleteInOut(index) {
        if(this.out.length <= 0) return

        let tmp = []

        for(let i = 0; i <= this.out.length-1; ++i) {
            if(this.out[i].getId() !== index) {
                console.warn(i, index)
                tmp.push(this.out[i])
            }
        }

        console.warn("supprimer", tmp)
        this.out = tmp
        return tmp
    }

    /**
     * Recuperer les entree
     * @return {Page[]}
     */
    getIn() {
        return this.out
    }

    /**
     * Ajouter une page entrante.
     * @param {Page} id_y Page y voulant se connecter
     * @return {boolean}
     */
    addIn(id_y) {
        try {
            for(let i = 0; i <= this.in.length-1; ++i) {
                if((this.in[i].getName() === id_y.getName()) && (this.in[i].getId() === id_y.getId())) {
                    return false
                }
            }
    
            this.in.push(id_y)
            return true
        } catch(err) {}
    }

    /**
     * Ajouter une page sortante.
     * @param {Page} p_y La page sortante
     * @return {boolean}
     */
    addOut(p_y) {
        try {
            for(let i = 0; i <= this.out.length-1; ++i) {
                if((this.out[i].getName() === p_y.getName()) && (this.out[i].getId() === p_y.getId())) {
                    return false
                }
            }
    
            this.out.push(p_y)
            return true
        } catch(err) {}
    }

    /**
     * Changer la position du point
     * @param {{x: number, y: number}} position 
     * @return {Promise<void>}
     */
    async setPosition(position) {
        this.position = position;
    }

    /**
     * Recuperer la position de la page.
     * @return {Promise<{x: number, y: number}>}
     */
    async getPosition() {
        return this.position
    }

    /**
     * Recuperer l'id de la page.
     * @return {number}
     */
    getId() { 
        return this.id 
    }

    /**
     * Recuperer le npm de la page.
     * @return {string}
     */
    getName() { 
        return this.name 
    }
}