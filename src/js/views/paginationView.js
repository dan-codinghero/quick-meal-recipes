import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        });
    }
    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const currentPage = this._data.page;
        //Page 1 and other pages
        if (currentPage === 1 && numPages > 1) {
            return this._generateNextButton(currentPage + 1);
        }

        //Last page
        if (currentPage === numPages && numPages > 1) {
            return this._generatePreviousButton(currentPage - 1);
        }

        // Other page
        if (currentPage < numPages) {
            return `${this._generatePreviousButton(currentPage - 1)}
         ${this._generateNextButton(currentPage + 1)}
          `;
        }
        //Page 1 and no other pages

        return ``;
    }

    _generatePreviousButton(page) {
        return `
        <button data-goto="${page}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${page}</span>
          </button>
        `;
    }

    _generateNextButton(page) {
        return `
        <button data-goto="${page}" class="btn--inline pagination__btn--next">
                <span>Page ${page}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
          </button>
        `;
    }
}

export default new PaginationView();
