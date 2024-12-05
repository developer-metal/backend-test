/**
 * Valida un RUT chileno.
 * @param rut - El RUT en formato string (puede incluir puntos y guion).
 * @returns true si el RUT es válido, false en caso contrario.
 */
export function validarRUT(rut: string): boolean {
    // Eliminar puntos y guiones del RUT
    const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '');
    // Verificar que tenga al menos 2 caracteres (número y dígito verificador)
    if (rutLimpio.length < 2) return false;
    // Separar el número y el dígito verificador
    const numero = rutLimpio.slice(0, -1);
    const digitoVerificador = rutLimpio.slice(-1).toUpperCase();
    // Verificar que el número contenga solo dígitos
    if (!/^\d+$/.test(numero)) return false;
    // Calcular el dígito verificador esperado
    let suma = 0;
    let multiplicador = 2;
    // Recorrer los dígitos del número de derecha a izquierda
    for (let i = numero.length - 1; i >= 0; i--) {
        suma += parseInt(numero[i], 10) * multiplicador;
        multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
    }
    const resto = suma % 11;
    const resultado = 11 - resto;
    let digitoCalculado: string;
    if (resultado === 11) {
        digitoCalculado = '0';
    } else if (resultado === 10) {
        digitoCalculado = 'K';
    } else {
        digitoCalculado = String(resultado);
    }
    // Comparar el dígito verificador calculado con el ingresado
    return digitoCalculado === digitoVerificador;
}