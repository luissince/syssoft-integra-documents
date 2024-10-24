class NumberToCurrencyWords {
  static UNITS: string[] = [
    '',
    'uno ',
    'dos ',
    'tres ',
    'cuatro ',
    'cinco ',
    'seis ',
    'siete ',
    'ocho ',
    'nueve ',
  ];
  static TENS: string[] = [
    'diez ',
    'once ',
    'doce ',
    'trece ',
    'catorce ',
    'quince ',
    'dieciséis ',
    'diecisiete ',
    'dieciocho ',
    'diecinueve',
    'veinte ',
    'treinta ',
    'cuarenta ',
    'cincuenta ',
    'sesenta ',
    'setenta ',
    'ochenta ',
    'noventa ',
  ];
  static HUNDREDS: string[] = [
    '',
    'ciento ',
    'doscientos ',
    'trecientos ',
    'cuatrocientos ',
    'quinientos ',
    'seiscientos ',
    'setecientos ',
    'ochocientos ',
    'novecientos ',
  ];

  static convertir(
    amount: string,
    uppercase: boolean,
    nameCurrency: string,
  ): string {
    let literal = '';
    let decimalPart = '';

    // Reemplaza punto por coma
    amount = amount.replace('.', ',');

    // Añade ,00 si no hay parte decimal
    if (!amount.includes(',')) {
      amount += ',00';
    }

    // Valida el formato del número
    const pattern = /\d{1,9},\d{1,2}/;
    const match = pattern.test(amount);

    if (match) {
      // Separa la parte entera y decimal
      const value = amount.split(',');

      // Parte decimal
      decimalPart = `con ${value[1]}/100 ${nameCurrency}`;

      // Convierte el número en palabras
      const entero = parseInt(value[0]);
      if (entero === 0) {
        literal = 'cero ';
      } else if (entero > 999999) {
        literal = this.getMillones(value[0]);
      } else if (entero > 999) {
        literal = this.getMiles(value[0]);
      } else if (entero > 99) {
        literal = this.getCentenas(value[0]);
      } else if (entero > 9) {
        literal = this.getDecenas(value[0]);
      } else {
        literal = this.getUnidades(value[0]);
      }

      // Devuelve el resultado en mayúsculas o minúsculas
      return uppercase
        ? (literal + decimalPart).toUpperCase()
        : literal + decimalPart;
    } else {
      return 'Sin valor';
    }
  }

  static getUnidades(amount: string): string {
    const index = parseInt(amount[amount.length - 1]);
    return this.UNITS[index];
  }

  static getDecenas(amount: string): string {
    const n = parseInt(amount);
    if (n < 10) {
      return this.getUnidades(amount);
    } else if (n > 19) {
      const u = this.getUnidades(amount);
      return u === ''
        ? this.TENS[parseInt(amount[0]) + 8]
        : this.TENS[parseInt(amount[0]) + 8] + 'y ' + u;
    } else {
      return this.TENS[n - 10];
    }
  }

  static getCentenas(amount: string): string {
    const n = parseInt(amount);
    if (n > 99) {
      return n === 100
        ? 'cien '
        : this.HUNDREDS[parseInt(amount[0])] + this.getDecenas(amount.slice(1));
    } else {
      return this.getDecenas(amount);
    }
  }

  static getMiles(amount: string): string {
    const c = amount.slice(-3);
    const m = amount.slice(0, -3);
    return parseInt(m) > 0
      ? this.getCentenas(m) + 'mil ' + this.getCentenas(c)
      : this.getCentenas(c);
  }

  static getMillones(amount: string): string {
    const miles = amount.slice(-6);
    const millon = amount.slice(0, -6);
    return parseInt(millon) > 1
      ? this.getCentenas(millon) + 'millones '
      : this.getUnidades(millon) + 'millon ' + this.getMiles(miles);
  }
}

export default NumberToCurrencyWords;
