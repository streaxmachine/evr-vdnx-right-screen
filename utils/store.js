import { useMemo } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

let store;

let initialState = {
  initial: false,
  mask: null,
  isIntro: true,
  isGallery: true,
  isLoaded: false,
  isLoadedMusicverse: false ,
  cart: {
    items: [],
    totalPrice: 0,
  },
};

function initStore(preloadedState = initialState) {
  return create(
    immer((set, get) => ({
      ...initialState,
      ...preloadedState,

      setMask: (id, model) => set(() => ({ mask: { id, model } })),
      setIntro: (isIntro) => set(() => ({ isIntro })),
      setGallery: (isGallery) => set(() => ({ isGallery })),
      setLoaded: (isLoaded) => set(() => ({ isLoaded })),
      setIsLoadedMusicverse: (isLoadedMusicverse) => set(()=> ({isLoadedMusicverse})),
      setCart: (product) => {
        const cart = get().cart.items;
        const cartItem = cart.find((item) => item.slug === product.slug);
        if (cartItem) {
          const items = cart.map((item) =>
            item.slug === product.slug
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set((state) => ({
            ...state,
            cart: {
              items,
              totalPrice: state.cart.totalPrice + Number(product.price),
            },
          }));
        } else {
          set((state) => ({
            ...state,
            cart: {
              items: [...state.cart.items, { ...product, quantity: 1 }],
              totalPrice: state.cart.totalPrice + Number(product.price),
            },
          }));
        }
      },
    }))
  );
}

// function initStore(preloadedState = initialState) {
//   return create(
//     immer((set, get) => ({
//       ...initialState,
//       ...preloadedState,

//       setMask: (id, model) => set(() => ({ mask: { id, model } })),
//       setIntro: (isIntro) => set(() => ({ isIntro })),
//       setGallery: (isGallery) => set(() => ({ isGallery })),
//       setLoaded: (isLoaded) => set(() => ({ isLoaded })),
//       setCart: (item) =>
//         set((state) => ({
//           cart: state.cart.items.map((prod) => {
//             return ["fffff"];
//           }),
//         })),
//     }))
//   );
// }

// function initStore(preloadedState = initialState) {
//   return create(
//     immer((set, get) => ({
//       ...initialState,
//       ...preloadedState,

//       setMask: (id, model) => set(() => ({ mask: { id, model } })),
//       setIntro: (isIntro) => set(() => ({ isIntro })),
//       setGallery: (isGallery) => set(() => ({ isGallery })),
//       setLoaded: (isLoaded) => set(() => ({ isLoaded })),
//       setCart: (item) =>
//         set((state) => ({
//           cart: { items: [...state.cart.items, { ...item }] },
//         })),
//     }))
//   );
// }

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export function useHydrate(initialState) {
  const state =
    typeof initialState === "string" ? JSON.parse(initialState) : initialState;
  return useMemo(() => initializeStore(state), [state]);
}
