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
        <div className="bg-[#062C30] h-[100vh] flex flex-col border-2  border-white items-center">
            <div className="text-3xl text-[#E2D784] mt-10 font-medium">Withdraw Status</div>
            <div className="text-[#F5F5F5] text-lg mt-5 font-medium">Available Balance : {Number(isValidBalance).toFixed(2)}</div>
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">{withdrawStatus}</div>
            <div className="mt-5">
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={handleOkayButton}>
                    Ok
                </button>
            </div>
        </div>
    )
}

export default WithdrawStatus