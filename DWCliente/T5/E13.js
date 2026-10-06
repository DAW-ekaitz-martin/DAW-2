export class Miembro {
    constructor(nombre, estadoVinculacion) {
        this.nombre = nombre;
        this.estadoVinculacion = estadoVinculacion;
    }
    presentacion() {
        return `Hola, mi nombre es ${this.nombre} y mi esdado de vinculación es: ${this.estadoVinculacion}`;
    }
}
export class Profesor extends Miembro {
    constructor(nombre, estadoVinculacion, especialidad) {
        super(nombre,estadoVinculacion);
        this.especialidad = especialidad;
    }
     presentacion() {
        return `${super.presentacion()} y mi especialidad es ${this.especialidad} `;
    }
}
//Comento el console.log() porque sino sale en la consola del browser(aunque en el index solo tenga <script type="module" src="E16.js"></script> y las ejecuciones estén en este archivo(E13.js).
// Si no querría que aparezcan estan ejecuciones en consola lo que tendría que hacer es crear un main y alli hacer los console.logs que necesite una vez habiendo exportado e importado las clases.
//Y en este archivo dejar solamente las clases que quiera importar.
/*const profe = new Profesor("Ekaitz", "ninguno", "Programación");
console.log(profe.presentacion());*/