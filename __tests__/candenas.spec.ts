import { contarCoincidenciasEnCadena } from './../src/app/cadenas';
describe('contarCoincidenciasEnCadena', () => {
    test('retorna el numero correcto de coincidencias', () => {
        expect(contarCoincidenciasEnCadena('abcabcabc', 'abc')).toBe(3);
        expect(contarCoincidenciasEnCadena('aaaaa', 'aa')).toBe(4);
        expect(contarCoincidenciasEnCadena('hello world', 'o')).toBe(2);
        expect(contarCoincidenciasEnCadena('hello world', 'world')).toBe(1);
        expect(contarCoincidenciasEnCadena('hello world', 'x')).toBe(0);
    });
    test('retorna un error si la cadena o subcadena esta vacia', () => {
        expect(() => contarCoincidenciasEnCadena('', 'abc')).toThrow('Error: Debe ingresar una cadena y una subcadena validas');
        expect(() => contarCoincidenciasEnCadena('abc', '')).toThrow('Error: Debe ingresar una cadena y una subcadena validas');
        expect(() => contarCoincidenciasEnCadena('', '')).toThrow('Error: Debe ingresar una cadena y una subcadena validas');
    });
});