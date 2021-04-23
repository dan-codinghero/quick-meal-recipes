import icons from 'url:../../img/icons.svg';

export default class View {
    _data;
    /**
     * Render the recived oject to DOM
     * @param {Object | Object[]} data  The data to be rendenered
     * @param {boolean} [render=true] If false, return string other render to DOM
     * @returns {undefined | string}
     * @this {Object} view instance
     * @author Dan Green
     */
    render(data, render = true) {
        console.log(data);
        if (!data || (Array.isArray(data) && !data.length)) return this.renderError();
        this._data = data;

        const markup = this._generateMarkup();

        if (!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        // if (!data || (Array.isArray(data) && !data.length)) return this.renderError();
        this._data = data;

        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const currentEelemnts = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = currentEelemnts[i];
            // Update changed text
            if (!newEl.isEqualNode(curEl) && newEl?.firstChild?.nodeValue?.trim() !== '') {
                curEl.textContent = newEl.textContent;
            }

            // update changed attr
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach((attr) => curEl.setAttribute(attr.name, attr.value));
            }
        });
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
        <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
      `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}
