import { createStore } from "redux";
import reducerFunction from "./reducer";
const store = createStore(reducerFunction)
export default store