import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { accountNumber, authentication, getCardDetails, withdraw } from "../redux/actionCreator";

const WithdrawStatus = (props) => {

    const { history } = props
    const cardDetails = useSelector(state => state.cards)
    const accNo = useSelector(state => state.accountNumber)
    const withdrawDetails = useSelector(state => state.withdrawAmount)
    const dispatch = useDispatch()
    const [isValidBalance, setIsValidBalance] = useState("")
    const [withdrawStatus, setWithdrawStatus] = useState("")

    useEffect(() => {
        const filterAccountDetails = cardDetails.find(card => accNo.toString().includes(card.card_no))
        if (filterAccountDetails.availableBalance < withdrawDetails) {
            setIsValidBalance(filterAccountDetails.availableBalance)
            setWithdrawStatus("Insufficient Balance")
        }
        else {
            const updatedCardDetails = cardDetails.map(card => {
                if (card.card_no === filterAccountDetails.card_no) {
                    return {
                        ...card,
                        availableBalance: filterAccountDetails.availableBalance - withdrawDetails
                    }
                }
                return {
                    ...card
                }
            })
            dispatch(getCardDetails(updatedCardDetails))
            setIsValidBalance(filterAccountDetails.availableBalance - withdrawDetails)
            setWithdrawStatus("Withdraw Success")
        }
    }, [])

    const handleOkayButton = () => {
        dispatch(withdraw(0))
        dispatch(authentication(false))
        dispatch(accountNumber(""))
        history.push("/")
    }

    return (
        <div>
            <h1>Withdraw Status</h1>
            <h3>Available Balance : {Number(isValidBalance).toFixed(2)}</h3>
            <h3>{withdrawStatus}</h3>
            <button onClick={handleOkayButton}>Ok</button>
        </div>
    )
}

export default WithdrawStatus