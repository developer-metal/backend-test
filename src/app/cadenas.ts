export function contarCoincidenciasEnCadena(cadena: string, subcadena: string) {
    let coincidencias = 0;
    if (!cadena  || !subcadena) {
        throw 'Error: Debe ingresar una cadena y una subcadena validas';
    }
    for (let i = 0; i < cadena.length; i++) {
        for (let j = 0; j < subcadena.length; j++) {
            if (subcadena[j] !== cadena[i + j]) {
                break;
            }
            if (j === subcadena.length - 1) {
                coincidencias++;
            }
        }
    }
    return coincidencias;
}