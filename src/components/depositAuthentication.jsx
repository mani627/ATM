import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { accountNumber, authentication, getCardDetails } from "../redux/actionCreator"

const DepositAuthentication = (props) => {

    const { history } = props
    const dispatch = useDispatch()
    const cardDetails = useSelector(state => state.cards)
    const accNo = useSelector(state => state.accountNumber)
    const displayDepositAmount = useSelector(state => state.depositAmount)
    const [pinNumber, setPinNumber] = useState("")
    const [pinValidation, setPinValidation] = useState("")

    const handleContinue = () => {
        if (pinNumber === "") {
            setPinValidation("Please enter Pin Number")
        }
        else {
            setPinValidation("")
            checkPinNumber()
        }
    }

    useEffect(() => {
        if (displayDepositAmount === 0) {
            dispatch(authentication(false))
            dispatch(accountNumber(""))
            history.push("/")
        }
    }, [])

    const checkPinNumber = () => {
        const filterPinNumber = cardDetails.find(card => accNo.toString().includes(card.card_no))
        if (filterPinNumber && pinNumber === filterPinNumber.pin.toString()) {
            const updatedCardDetails = cardDetails.map(card => {
                if (card.card_no === filterPinNumber.card_no) {
                    return {
                        ...card,
                        availableBalance: filterPinNumber.availableBalance + displayDepositAmount
                    }
                }
                return {
                    ...card
                }
            })
            dispatch(getCardDetails(updatedCardDetails))
            history.push({ pathname: "/depositSuccess", balance: filterPinNumber.availableBalance + displayDepositAmount })
        }

        else {
            setPinValidation("Incorrect Pin")
        }
    }

    return (
        <div className="bg-[#062C30] h-[100vh] flex flex-col border-2  border-white items-center">
            <div className="text-3xl text-[#E2D784] mt-10 font-medium">Deposit</div>
            <div className="text-[#F5F5F5] text-lg mt-5 font-medium">Deposit Amount : {displayDepositAmount}</div>
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">Enter the Pin</div>
            <input value={pinNumber} className="mt-5 font-medium text-[#F5F5F5] bg-[#05595B] p-3 w-[20%] max-md:w-[50%] border-2 border-white rounded text-center" type="password" onChange={(e) => setPinNumber(e.target.value.replace(/\D/g, ""))} maxLength={"4"} />
            <div className="mt-5 text-[#E6DDC4] font-medium">{pinValidation}</div>

            <div className="mt-5">
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={handleContinue}>
                    Continue
                </button>
            </div>
        </div>
    )
}
export default DepositAuthentication