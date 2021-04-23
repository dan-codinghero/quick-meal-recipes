// class Fractional2 {
//     // #result;
//     #wholeNumber;
//     #numerator;
//     #denominator;

//     #isFloat(num) {
//         return /^\d+\.\d{0,}$/.test(num);
//     }

//     fraction(numerator, denominator) {
//         if (denominator === 0) throw new Error(`Invalid denonimator: ${denominator}`);
//         if (isNaN(Number(numerator)) || (isNaN(Number(denominator)) && denominator)) throw new Error(`Invalid arguments`);

//         if (!denominator) return this.#decimalFraction(numerator);
//         return this.#numericFraction(numerator, denominator);
//     }

//     #numericFraction(numerator, denominator) {
//         if (numerator === denominator || denominator === 1) {
//             this.#wholeNumber = numerator / denominator;
//             // console.log(this.#wholeNumber, { numerator, denominator });
//             return this;
//         }

//         const remainder = numerator % denominator;
//         const commonDivisor = this.#greatestCommonDivisor(remainder, this.denominator);

//         this.#wholeNumber = Math.trunc(numerator / denominator);
//         this.#numerator = remainder / commonDivisor;
//         this.#denominator = denominator / commonDivisor;

//         return this;
//     }

//     #decimalFraction(decimal) {
//         if (!this.#isFloat(decimal)) {
//             this.#wholeNumber = decimal;
//             return this;
//         }

//         const [whole, decimalPart] = decimal
//             ?.toString()
//             ?.split('.')
//             ?.map((num) => +num);

//         const tens = Math.pow(10, decimalPart?.toString()?.length);
//         const commonDenominator = this.#greatestCommonDivisor(decimalPart, tens);

//         this.#wholeNumber = whole;
//         this.#numerator = decimalPart / commonDenominator;
//         this.#denominator = tens / commonDenominator;

//         return this;
//     }

//     #greatestCommonDivisor(a, b) {
//         return b ? this.#greatestCommonDivisor(b, a % b) : a;
//     }

//     add(numerator, denominator) {
//         if (isNaN(this.#wholeNumber) && isNaN(this.#numerator)) throw Error('');
//         if (!denominator) {
//         }
//         return this.#numericFraction(numerator, denominator);
//     }

//     result() {
//         if (!this.#numerator && this.#numerator !== 0) return this.#wholeNumber;
//         return `${this.#wholeNumber ? `${this.#wholeNumber} ` : ''}${this.#numerator}/${this.#denominator}`;
//     }
// }

// export default new Fractional2();

// /*
// #numericFraction(numerator, denominator) {
//         if (numerator === denominator || denominator === 1) {
//             this.#wholeNumber = numerator / denominator;
//             // console.log(this.#wholeNumber, { numerator, denominator });
//             return this;
//         }

//         const remainder = numerator % denominator;
//         const commonDivisor = this.#greatestCommonDivisor(remainder, this.denominator);

//         this.#wholeNumber = this.#wholeNumber ? this.#wholeNumber + Math.trunc(numerator / denominator) : Math.trunc(numerator / denominator);
//         this.#numerator = this.#numerator ? this.#numerator + remainder / commonDivisor : remainder / commonDivisor;
//         this.#denominator = this.#denominator ? this.#denominator + denominator / commonDivisor : denominator / commonDivisor;

//         return this;
//     }

//     #decimalFraction(decimal) {
//         if (!this.#isFloat(decimal)) {
//             this.#wholeNumber = decimal;
//             return this;
//         }

//         const [whole, decimalPart] = decimal
//             ?.toString()
//             ?.split('.')
//             ?.map((num) => +num);

//         const tens = Math.pow(10, decimalPart?.toString()?.length);
//         const commonDivisor = this.#greatestCommonDivisor(decimalPart, tens);

//         this.#wholeNumber = this.#wholeNumber ? this.#wholeNumber + whole : whole;
//         this.#numerator = this.#numerator ? this.#numerator + decimalPart / commonDivisor : decimalPart / commonDivisor;
//         this.#denominator = this.#denominator ? this.#denominator + tens / commonDivisor : tens / commonDivisor;

//         return this;
//     } */
