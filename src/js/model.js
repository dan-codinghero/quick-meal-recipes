import { async } from 'regenerator-runtime/runtime';
import { API_KEY, API_URL, resultsPerPage } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: resultsPerPage,
        page: 1,
    },
    bookmarks: [],
};

const createRecipeObject = function (data) {
    const { recipe } = data.data;

    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key }),
    };
};

export const loadRecipe = async (id) => {
    try {
        const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

        state.recipe = createRecipeObject(data);

        if (state.bookmarks.some((bookmark) => bookmark.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
        // console.log(data);
        // console.log(state.recipe);
    } catch (err) {
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

        const { recipes } = data.data;

        state.search.results = recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                sourceUrl: recipe.source_url,
                image: recipe.image_url,
                servings: recipe.servings,
                cookingTime: recipe.cooking_time,
                ingredients: recipe.ingredients,
                ...(recipe.key && { key: recipe.key }),
            };
        });
        state.search.page = 1;
    } catch (err) {
        throw err;
    }
};

export const getSearchResultPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
    state.recipe.ingredients.forEach((ing) => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
};

const persistBookmarks = () => {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBoomark = (recipe) => {
    state.bookmarks.push(recipe);
    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }
    persistBookmarks();
};

export const deleteBoomark = (id) => {
    // console.log(id);
    const index = state.bookmarks.findIndex((el) => el.id === id);
    // console.log(index);
    state.bookmarks.slice(index, 1);

    if (id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }
    persistBookmarks();

    // console.log(state);
};

export const uploadRecipe = async (newRecipe) => {
    const ingredients = Object.entries(newRecipe)
        .filter((entry) => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map((ing) => {
            // const ingArr = ing[1].replaceAll(' ', '').split(',');
            const ingArr = ing[1].split(',').map((el) => el.trim());
            if (ingArr.length !== 3) throw new Error('inavlid ingredient format');
            const [quantity, unit, description] = ingArr;
            return { quantity: quantity ? +quantity : null, unit, description };
        });

    const recipe = {
        title: newRecipe.title,
        publisher: newRecipe.publisher,
        image_url: newRecipe.image,
        source_url: newRecipe.sourceUrl,
        image: newRecipe.imageUrl,
        servings: +newRecipe.servings,
        cooking_time: +newRecipe.cookingTime,
        ingredients,
    };
    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

    state.recipe = createRecipeObject(data);
    addBoomark(state.recipe);
    console.log(data);
};

const init = () => {
    const storage = localStorage.getItem('bookmarks');
    if (storage) {
        state.bookmarks = JSON.parse(storage);
    }
};

init();
