import { combineReducers } from '@reduxjs/toolkit'
import menuReducer from '@/features/auth/MenuSlice'
import boardReducer from '@/features/board/boardSlice'
import noticeReducer from '@/features/notice/noticeSlice'
import uiReducer from '@/features/ui/uiSlice'

const rootReducer = combineReducers({
  board: boardReducer,
  notice: noticeReducer,
  ui: uiReducer,
  menu: menuReducer
})

export default rootReducer
