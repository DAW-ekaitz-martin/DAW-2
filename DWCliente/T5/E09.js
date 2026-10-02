class Libro {
    constructor(titulo, autor, numPaginas) {
        this.titulo = titulo;
        this.autor = autor;
        this.numPaginas = numPaginas;
    }

    getLibro() {
        console.log(`El libro ${this.titulo}, fue escrito por ${this.autor} y tiene ${this.numPaginas} páginas` )
    }
}

const miLibro = new Libro("Luna de pluton", "Dross", 250);
miLibro.getLibro();
console.log(miLibro.numPaginas);