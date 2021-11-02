import {
  atom,
} from 'recoil';

// Selected favourite items
export const FAVOURITE_ITEMS_STATE = atom({
  key: 'favouriteItems',
  default: [],
});

// How many items were returned in the last search
export const LOADED_ITEMS_STATE = atom({
  key: 'loadedItems',
  default: 0,
});

// Pages
export const CURRENT_PAGE_STATE = atom({
  key: 'currentPage',
  default: 0,
});

// Favourites dialog showing
export const FAVOURITES_DIALOG_SHOWING = atom({
  key: 'favouritesDialogShowing',
  default: false,
});
