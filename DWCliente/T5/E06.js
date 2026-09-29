const alumno = {
    nombreModulo:"SI",
    calificaciones: [7,5,9,9],
    media : function() {
        let media = 0;
        this.calificaciones.forEach(element => {
            media+=element;
        });
        media/=this.calificaciones.length;
        const mediafinal = media.toFixed(2);
        return mediafinal;
    }
}
console.log(alumno.media());