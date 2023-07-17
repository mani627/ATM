import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authentication, withdraw } from "../redux/actionCreator"

const Withdraw = (props) => {

    const { history } = props
    const dispatch = useDispatch()
    const regexCamelCase = /([A-Z]+)*([A-Z][a-z])/g
    const cardDetails = useSelector(state => state.cards)
    const accNo = useSelector(state => state.accountNumber)
    const displayWithdrawAmount = useSelector(state => state.withdrawAmount)
    const [withdrawDetails, setWithdrawDetails] = useState({ withdrawAmount: "", pinNumber: "" })
    const [withdrawValidation, setWithdrawValidation] = useState({ withdrawAmountValidation: "", pinNumberValidation: "" })

    const handleWithdrawValidation = () => {
        const isValid = { ...withdrawValidation }
        let flag = true
        const filterAccountDetails = cardDetails.find(card => accNo.toString().includes(card.card_no))
        Object.keys(withdrawDetails).forEach(keys => {
            const values = withdrawDetails[keys]
            if (values === "") {
                isValid[keys + "Validation"] = `Please enter the ${keys.replace(regexCamelCase, "$1 $2").toLowerCase()}`
                flag = false
            }
            else if (keys === "withdrawAmount" && Number(values) < "100" || Number(values) > "20000") {
                isValid[keys + "Validation"] = "Minimum 100 or Maximum 20000 only to be withdraw"
                flag = false
            }
            else if (keys === "withdrawAmount" && Number(values) % 100 !== 0) {
                isValid[keys + "Validation"] = "Available 100 200 500 multiples cash only"
                flag = false
            }
            else if (keys === "pinNumber" && filterAccountDetails.pin !== Number(values)) {
                isValid[keys + "Validation"] = "Incorrect Pin"
                flag = false
            }
            else {
                isValid[keys + "Validation"] = ""
            }
        }
        )
        setWithdrawValidation(isValid)
        return flag
    }

    const handleWithdrawAction = () => {
        const flag = handleWithdrawValidation()
        if (flag) {
            dispatch(withdraw(withdrawDetails.withdrawAmount))
            history.push("/withdrawStatus")
        }
    }

    useEffect(() => {
        if (displayWithdrawAmount !== 0) {
            dispatch(withdraw(0))
            dispatch(authentication(false))
        }
    })

    return (
        <div>
            <h1>Withdraw</h1>
            <label>Enter the amount to withdraw</label>
            <input value={withdrawDetails.withdrawAmount} type="text" onChange={(e) => setWithdrawDetails({ ...withdrawDetails, withdrawAmount: e.target.value.replace(/\D/g, "") })} />
            <div>{withdrawValidation.withdrawAmountValidation}</div>
            <label>Enter the Pin</label>
            <input value={withdrawDetails.pinNumber} type="text" maxLength={4} onChange={(e) => setWithdrawDetails({ ...withdrawDetails, pinNumber: e.target.value.replace(/\D/g, "") })} />
            <div>{withdrawValidation.pinNumberValidation}</div>
            <button onClick={handleWithdrawAction}>Continue</button>
        </div>
    )
}

export default Withdraw