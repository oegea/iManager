import {
  atom,
  useRecoilState,
} from 'recoil';

export const FAVOURITE_ITEMS = {
  key: 'favouriteItems',
  default: [],
};

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
