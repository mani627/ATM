import { ACCOUNT_NUMBER, AUTHENTICATION, CARD_DETAILS, DEPOSIT, WITHDRAW } from "./actionType"

export const getCardDetails = (data) => {
    return ({ type: CARD_DETAILS, payload: data })
}

export const authentication = (data) => {
    return ({ type: AUTHENTICATION, payload: data })
}

export const accountNumber = (data) => {
    return ({ type: ACCOUNT_NUMBER, payload: data })
}

export const deposit = (data) => {
    return ({ type: DEPOSIT, payload: data })
}

export const withdraw = (data) => {
    return ({ type: WITHDRAW, payload: data })
}
