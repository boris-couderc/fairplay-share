import { combineReducers } from 'redux';
import cards from './cards';
import header from './header';
import searchBar from './searchBar';
import loginModal from './loginModal';
// combineReducers va nous permettre d'agréger les sous-reducers
// qu'on va utiliser dans notre application
// ça permet de séparer les responsabilités de chaque reducer
const globalReducer = combineReducers({
  // ici chaque propriétés correspondra à un mini reducer
  cards,
  header,
  searchBar,
  loginModal,
});

export default globalReducer;
