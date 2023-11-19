export default class Page {
    /**
     * @param {number} id Identifiant de la page.
     * @param {string} name Nom du site.
     */
    constructor(id, name) {
        this.id = id
        this.name = name
        this.position = {x: 0, y: 0}
        this.relevance = 0.0

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
     * Update la pertinence.
     * @param {number} n La nouvelle valeur.
     */
    setRelevance(n) {
        this.relevance = n
    }

    /**
     * Recuperer les sorties
     * @return {Page[]}
     */
    getOut() {
        return this.out
    }
    
    /**
     * Supprimer une page sortante
     * @param {number} index Index de la page sortante a supprimer 
     */
    deleteInOut(index) {
        let tmp = []

        for(let i = 0; i <= this.out.length-1; ++i) {
            if(i !== index) {
                tmp.push(this.out[i])
            }
        }

        this.out = tmp
    }

    /**
     * Recuperer les entree
     * @return {Page[]}
     */
    getIn() {
        return this.out
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
     * Recuperer la pertinence de la page.
     * @return {number}
     */
    getRelevance() { 
        return this.relevance 
    }

    /**
     * Recuperer l'id de la page.
     * @return {string}
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
}