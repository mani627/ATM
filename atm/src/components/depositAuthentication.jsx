import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authentication, getCardDetails } from "../redux/actionCreator"

const DepositAuthentication = (props) => {

    const { history } = props
    const dispatch = useDispatch()
    const cardDetails = useSelector(state => state.cards)
    const accNo = useSelector(state => state.accountNumber)
    const displayDepositAmount = useSelector(state => state.depositAmount)
    const [pinNumber, setPinNumber] = useState("")
    const [pinValidation, setPinValidation] = useState("")

    const handleContinue = () => {
        const numberRegex = /^\d+$/
        if (pinNumber === "") {
            setPinValidation("Please enter Pin Number")
        }
        else if (!numberRegex.test(pinNumber)) {
            setPinValidation("Please enter numbers only")
        }
        else {
            setPinValidation("")
            checkPinNumber()
        }
    }

    useEffect(() => {
        if (displayDepositAmount === 0) {
            dispatch(authentication(false))
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
        <div>
            <h1>Deposit</h1>
            <h3>Deposit Amount : {displayDepositAmount}</h3>
            Enter Pin : <input type="text" maxLength={4} onChange={(e) => setPinNumber(e.target.value)} />
            <div>{pinValidation}</div>
            <button onClick={handleContinue}>Continue</button>
        </div>
    )
}
export default DepositAuthentication