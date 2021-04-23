class Fractional {
    // #result;
    #wholeNumber;
    #numerator;
    #denominator;
    constructor(numerator, denominator) {
        if (denominator === 0) throw new Error(`Invalid denonimator: ${denominator}`);
        // this.numerator = numerator;
        // this.denominator = denominator;
        this.#fraction(numerator, denominator);
    }

    #isFloat(num) {
        return /^\d+\.\d{0,}$/.test(num);
    }

    #fraction(numerator, denominator) {
        if (!denominator) return this.decimalFraction(numerator);
        return this.numericFraction(numerator, denominator);
    }

    // #fraction() {
    //     if (!this.denominator) {
    //         // Get whole number and decimal part
    //         if (!this.#isFloat(this.numerator)) {
    //             this.#result = this.numerator;
    //             return this;
    //         }
    //         const [whole, decimalPart] = this.numerator
    //             ?.toString()
    //             ?.split('.')
    //             ?.map((num) => +num);

    //         // if (!decimalPart) {
    //         //     this.#result = whole;
    //         //     return this;
    //         // }

    //         const tens = Math.pow(10, decimalPart?.toString()?.length);
    //         const commonDenominator = this.greatestCommonDivisor(decimalPart, tens);

    //         this.#result = `${whole ? `${whole} ` : ''}${decimalPart / commonDenominator}/${tens / commonDenominator}`;
    //         return this;
    //     }

    //     if (this.numerator === this.denominator) {
    //         this.#result = this.numerator / this.denominator;
    //         return this;
    //     }
    //     const remainder = this.numerator % this.denominator;
    //     const whole = Math.trunc(this.numerator / this.denominator);
    //     const commonDenominator = this.greatestCommonDivisor(remainder, this.denominator);
    //     const top = remainder / commonDenominator;

    //     const bottom = this.denominator / commonDenominator;
    //     this.#result = `${bottom === 1 ? top : `${whole ? `${whole} ` : ''}${top}/${bottom}`}`;
    //     // this.#result = `${top}/${bottom}`;
    //     return this;
    // }

    numericFraction(numerator, denominator) {
        if (numerator === denominator || denominator === 1) {
            this.#wholeNumber = numerator / denominator;
            // console.log(this.#wholeNumber, { numerator, denominator });
            return this;
        }

        const remainder = numerator % denominator;
        const commonDivisor = this.#greatestCommonDivisor(remainder, this.denominator);

        this.#wholeNumber = Math.trunc(numerator / denominator);
        this.#numerator = remainder / commonDivisor;
        this.#denominator = denominator / commonDivisor;

        return this;
    }

    decimalFraction(decimal) {
        if (!this.#isFloat(decimal)) {
            this.#wholeNumber = decimal;
            return this;
        }

        const [whole, decimalPart] = decimal
            ?.toString()
            ?.split('.')
            ?.map((num) => +num);

        const tens = Math.pow(10, decimalPart?.toString()?.length);
        const commonDenominator = this.#greatestCommonDivisor(decimalPart, tens);

        this.#wholeNumber = whole;
        this.#numerator = decimalPart / commonDenominator;
        this.#denominator = tens / commonDenominator;

        return this;
    }

    #greatestCommonDivisor(a, b) {
        return b ? this.#greatestCommonDivisor(b, a % b) : a;
    }

    result() {
        if (!this.#numerator && this.#numerator !== 0) return this.#wholeNumber;
        return `${this.#wholeNumber ? `${this.#wholeNumber} ` : ''}${this.#numerator}/${this.#denominator}`;
    }
}

export default Fractional;
