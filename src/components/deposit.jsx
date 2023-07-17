import { useState } from "react"
import { useDispatch } from "react-redux"
import { deposit } from "../redux/actionCreator"

const Deposit = (props) => {

    const { history } = props
    const numberRegex = /^[0-9\s]*$/
    const dispatch = useDispatch()
    const [emptyValidation, setEmptyValidation] = useState("")
    const [depositAmount, setDepositAmount] = useState({ fiveHundredNote: "", twoHundredNote: "", oneHundredNote: "" })
    const [depositErrorValidation, setDepositValidation] = useState({ fiveHundredNoteValidation: "", twoHundredNoteValidation: "", oneHundredNoteValidation: "" })

    const handleValidation = () => {
        const isValid = { ...depositErrorValidation }
        let flag = true;
        Object.keys(depositAmount).forEach(keys => {
            const values = depositAmount[keys]
            if (keys === "fiveHundredNote" && !numberRegex.test(values)) {
                isValid[keys + "Validation"] = "Please enter numbers only"
                flag = false
            }
            else if (keys === "twoHundredNote" && !numberRegex.test(values)) {
                isValid[keys + "Validation"] = "Please enter numbers only"
                flag = false
            }
            else if (keys === "oneHundredNote" && !numberRegex.test(values)) {
                isValid[keys + "Validation"] = "Please enter numbers only"
                flag = false
            }
            else {
                isValid[keys + "Validation"] = ''
            }
        }
        )
        setDepositValidation(isValid)
        return flag
    }

    const handleContinue = () => {
        const flag = handleValidation()
        if (flag) {
            if ((depositAmount.fiveHundredNote === "" || depositAmount.fiveHundredNote === "0") && (depositAmount.twoHundredNote === "" || depositAmount.twoHundredNote === "0") && (depositAmount.oneHundredNote === "" || depositAmount.oneHundredNote === "0")) {
                setEmptyValidation("Please fill any one of the denomination")
            }
            else {
                setEmptyValidation("")
                const totalAmount = (depositAmount.fiveHundredNote) * 500 + (depositAmount.twoHundredNote) * 200 + (depositAmount.oneHundredNote) * 100
                const confirmMessage = window.confirm("Are you want to Deposit")
                if (confirmMessage) {
                    dispatch(deposit(totalAmount))
                    history.push("./depositAuthentication")
                }
            }
        }
    }

    return (
        <div>
            <h1>Deposit</h1>
            <h3>Enter the amount you want to deposit</h3>
            500 x <input type="text" onChange={(e) => setDepositAmount({ ...depositAmount, fiveHundredNote: e.target.value })} maxLength={"2"} />
            <div>{depositErrorValidation.fiveHundredNoteValidation}</div>
            200 x <input type="text" onChange={(e) => setDepositAmount({ ...depositAmount, twoHundredNote: e.target.value })} maxLength={"2"} />
            <div>{depositErrorValidation.twoHundredNoteValidation}</div>
            100 x <input type="text" onChange={(e) => setDepositAmount({ ...depositAmount, oneHundredNote: e.target.value })} maxLength={"2"} />
            <div>{depositErrorValidation.oneHundredNoteValidation}</div>
            <button onClick={handleContinue}>Continue</button>
            <div>{emptyValidation}</div>
        </div>
    )
}
export default Deposit