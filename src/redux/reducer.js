
import { ACCOUNT_NUMBER, AUTHENTICATION, CARD_DETAILS, DEPOSIT, WITHDRAW } from "./actionType";

const globalState = {

    cards: [
        { card_no: 42424242424242, cust_name: "Vishva", pin: 4545, isValid: false, availableBalance: 625.30 },
        { card_no: 62000000000047, cust_name: "Satheesh", pin: 6060, isValid: true, availableBalance: 10852 },
        { card_no: 36227206271667, cust_name: "Boopesh", pin: 7485, isValid: true, availableBalance: 6254.40 }
    ],
    auth: false,
    accountNumber: "",
    depositAmount: 0,
    withdrawAmount: 0,
}

const reducerFunction = (state = globalState, action) => {

    switch (action.type) {
        case CARD_DETAILS:
            return { ...state, cards: action.payload }
        case AUTHENTICATION:
            return { ...state, auth: action.payload }
        case ACCOUNT_NUMBER:
            return { ...state, accountNumber: action.payload }
        case DEPOSIT:
            return { ...state, depositAmount: action.payload }
        case WITHDRAW:
            return { ...state, withdrawAmount: action.payload }
        default:
            return state
    }
}

export default reducerFunction