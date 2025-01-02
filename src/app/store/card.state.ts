import { Card } from "../models/card.interface";

export interface CardState {
  cards: Card[];
  state: 'loading' | 'loaded' | 'error';
  filter: { query: string; page: number };
}

export const initialState: CardState = {
  cards: [],
  state: 'loading',
  filter: { query: '', page: 1 }
}