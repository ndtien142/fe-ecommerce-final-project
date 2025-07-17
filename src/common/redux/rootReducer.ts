import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import lastVisitedReducer from './slices/lastVisited';
// auth
import authReducer from 'src/auth/login/auth.slice';
import loginReducer from 'src/auth/login/login.slice';
import registerReducer from 'src/auth/register/register.slice';
// Categories
import categoryReducer from 'src/management-categories/common/category.slice';
import checkoutReducer from 'src/checkout/checkout.slice';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['auth', 'login'],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  // Auth
  auth: authReducer,
  login: loginReducer,
  register: registerReducer,
  // Categories
  categories: categoryReducer,
  checkout: checkoutReducer,
  // Other slices
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  lastVisited: lastVisitedReducer,
});

export { rootPersistConfig, rootReducer };
