import * as model from './model.js';
import recipeView from './views/recipeViews.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2
// 614de97d-0969-43d8-ad0f-d9a72f31442d
///////////////////////////////////////

// if (module.hot) {
//     module.hot.accept();
// }

const controlRecipe = async function () {
    try {
        const id = window.location.hash.slice(1) || '5ed6604591c37cdc054bc886';
        if (!id) return;
        recipeView.renderSpinner();

        // Update results view to mark selected result
        resultsView.update(model.getSearchResultPage());
        bookmarkView.update(model.state.bookmarks);

        // load recipe
        await model.loadRecipe(id);

        console.log(model);
        // Render recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
        console.error(error);
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        // 1. Get the search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2. Load search results
        await model.loadSearchResults(query);

        // 3. Render results
        resultsView.render(model.getSearchResultPage());

        // 4. Render inital pagination buttons
        paginationView.render(model.state.search);
    } catch (error) {}
};

const controlPagination = (goToPage) => {
    // 1. Render results
    console.log(goToPage);
    resultsView.render(model.getSearchResultPage(goToPage));

    // 2. Render inital pagination buttons
    paginationView.render(model.state.search);
};

const constrolServings = (servings) => {
    // update recipe serving
    model.updateServings(servings);

    //update recipe view
    // Render recipe
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};

const controlAddBookMark = () => {
    // aad/rempve bookmark
    if (!model.state.recipe.bookmarked) {
        model.addBoomark(model.state.recipe);
    } else {
        // console.log(model.state.recipe);
        model.deleteBoomark(model.state.recipe.id);
    }
    // updat recipe view
    recipeView.update(model.state.recipe);

    // render bookmark
    bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
    bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
    try {
        //show spinner
        addRecipeView.renderSpinner();

        //Upload recipe
        await model.uploadRecipe(newRecipe);

        // render recipe
        recipeView.render(model.state.recipe);

        // success message
        addRecipeView.renderMessage();

        //render bookmark view
        bookmarkView.render(model.state.bookmarks);

        // change id in url
        window.history.pushState(null, '', `#${model.state.recipe.id}`);

        // close form
        setTimeout(() => {
            addRecipeView.toggleWindow();
        }, MODEL_CLOSE_SEC * 1000);
    } catch (error) {
        console.error(error);
        addRecipeView.renderError(error.message);
    }
};

const init = function () {
    bookmarkView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResults);
    recipeView.addHandlerAddBookmark(controlAddBookMark);

    recipeView.addHandlerUpdateServings(constrolServings);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
