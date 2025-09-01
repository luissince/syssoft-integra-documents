/**
 * Función encarga de esperar un tiempo determinado antes de devolver un Promise.
 *
 * @param {number} time - Tiempo de espera del time out
 * @returns {Promise<void>}
 */
export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function formatDecimal(
  amount: number | string,
  decimalCount: number = 2,
  decimal: string = '.',
  thousands: string = ',',
) {
  if (!isNumeric(amount)) return '0.00';

  decimalCount = Number.isInteger(decimalCount) ? Math.abs(decimalCount) : 2;

  const number = Number(amount);

  const negativeSign = number < 0 ? '-' : '';

  const roundedAmount = Math.abs(rounded(number, decimalCount)).toFixed(
    decimalCount,
  );

  const [integerPart, decimalPart] = roundedAmount.split('.');

  const integerFormatted = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousands,
  );
  let decimalFormatted = '';
  if (decimalCount) {
    decimalFormatted = decimal + (decimalPart || '0'.repeat(decimalCount));
  }

  return negativeSign + integerFormatted + decimalFormatted;
}

export function rounded(amount: number, decimalCount: number = 2): number {
  if (!isNumeric(amount)) return Number('0.00');

  const number = Number(amount);

  decimalCount = Number.isInteger(decimalCount) ? Math.abs(decimalCount) : 2;

  const negativeSign = number < 0 ? '-' : '';

  const parsedAmount = Math.abs(number);
  const fixedAmount = parsedAmount.toFixed(decimalCount);

  return Number(negativeSign + fixedAmount);
}

export function isNumeric(valor: any): boolean {
  return !isNaN(valor) && !isNaN(parseFloat(valor));
}

/**
 * Formatea un número agregando ceros delante hasta alcanzar una longitud específica.
 *
 * @param numero - El número que se va a formatear.
 * @returns El número formateado con ceros delante.
 */
export function formatNumberWithZeros(numero: number): string {
  // Convierte el número a cadena y maneja números negativos
  const numeroAbsoluto = Math.abs(numero);
  const numeroFormateado = String(numeroAbsoluto).padStart(6, '0');

  // Añade el signo negativo si el número original era negativo
  return numero < 0 ? `-${numeroFormateado}` : numeroFormateado;
}

/**
 * Formatea una cadena de fecha en el formato "DD/MM/AAAA".
 *
 * @param date - La cadena de fecha en el formato "DD/MM/AAAA".
 * @returns {string} La cadena de fecha formateada.
 */
export function formatDate(date: string): string {
  const parts = date.split('-');
  const today = new Date(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2]),
  );

  const day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
  const month =
    today.getMonth() + 1 > 9
      ? today.getMonth() + 1
      : '0' + (today.getMonth() + 1);
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formatea una cadena de tiempo en formato "HH:mm AM/PM" o "HH:mm:ss AM/PM".
 *
 * @param {string} time - La cadena de tiempo en formato "HH:mm" o "HH:mm:ss".
 * @param {boolean} [addSeconds=false] - Indica si se deben incluir los segundos en la salida.
 * @returns {string} La cadena de tiempo formateada.
 */
export function formatTime(time: string, addSeconds: boolean = false): string {
  const timeRegex =
    /^(0\d|1\d|2[0-4]):((0[0-9])|([1-5][0-9])|59)(?::([0-5][0-9]))?$/;
  const match = time.match(timeRegex);

  if (!match) {
    return 'Invalid Time';
  }

  const parts = time.split(':');

  const HH = Number(parts[0]);
  const mm = parts[1];
  const ss = parts[2] === undefined ? '00' : parts[2];

  const thf = HH % 12 || 12;
  const ampm = HH < 12 || HH === 24 ? 'AM' : 'PM';
  const formattedHour = thf < 10 ? '0' + thf : thf;

  if (addSeconds) {
    return `${formattedHour}:${mm}:${ss} ${ampm}`;
  }

  return `${formattedHour}:${mm} ${ampm}`;
}

/**
 * Función encarga de calcular el bruto de un impuesto.
 *
 * @param tax - Valor del impuesto.
 * @param amount - Valor del producto.
 * @returns {number} Valor del impuesto bruto.
 */
export function calculateTaxBruto(tax: number, amount: number): number {
  return amount / ((tax + 100) * 0.01);
}

/**
 * Función encarga de calcular el valor del impuesto.
 *
 * @param porcent - Porcentaje del impuesto.
 * @param amount - Valor del producto.
 * @returns {number} Valor del impuesto.
 */
export function calculateTax(porcent: number, amount: number): number {
  const tax = porcent / 100.0;
  return amount * tax;
}

/**
 * Obtiene la fecha actual en el formato 'YYYY-MM-DD'.
 * @returns {string} Fecha actual en formato 'YYYY-MM-DD'.
 */
export function currentDate(): string {
  const date = new Date();
  return parseFormatDate(date);
}

function parseFormatDate(date: Date): string {
  const year = date.getFullYear();
  const month = padZeroes(date.getMonth() + 1);
  const day = padZeroes(date.getDate());
  return `${year}-${month}-${day}`;
}

function padZeroes(num: number): string | number {
  return num > 9 ? num : '0' + num;
}

/**
 * Converts pixels to millimeters
 * @param px Pixels value
 * @returns Value in millimeters
 */
export const pixelsToMillimeters = (px: number): number => {
  return px / 3.77952756;
};

/**
 * Converts millimeters to pixels
 * @param mm Millimeters value
 * @returns Value in pixels
 */
export const millimetersToPixels = (mm: number): number => {
  return mm * (96 / 25.4);
};

/**
 * Starts a timer and returns a function to stop the timer
 * @param label Label to identify the timer
 * @returns 
 */
export const startTimer = (label: string) => {
  const start = process.hrtime.bigint();
  return () => {
    const end = process.hrtime.bigint();
    const ms = Number(end - start) / 1_000_000;
    console.log(`[TIMER] ${label}: ${ms.toFixed(2)} ms`);
    return ms;
  };
};
