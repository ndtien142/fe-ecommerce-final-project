import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
// auth
import authReducer from 'src/auth/login/auth.slice';
import loginReducer from 'src/auth/login/login.slice';
// borrow receipt
import scanBorrowReceiptReducer from 'src/borrow-equipment-receipt/scan/scan.slice';
import transferEditNewReducer from 'src/transfer-equipment-receipt/common/store/transferEditNew.slice';
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
  // Other slices
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  scanBorrowReceipt: scanBorrowReceiptReducer,
  product: persistReducer(productPersistConfig, productReducer),
  transferEditNew: transferEditNewReducer,
});

export { rootPersistConfig, rootReducer };
