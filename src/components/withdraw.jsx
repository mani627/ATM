import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { accountNumber, authentication, withdraw } from "../redux/actionCreator"

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
            dispatch(accountNumber(""))
            history.push("/")
        }
    },[])

    return (
        <div className="bg-[#062C30] h-[100vh] flex flex-col border-2  border-white items-center">
            <div className="text-3xl text-[#E2D784] mt-10 font-medium">Withdraw</div>
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">Enter the amount to withdraw</div>
            <input value={withdrawDetails.withdrawAmount} className="mt-5 font-medium text-[#F5F5F5] bg-[#05595B] p-3 w-[20%] max-md:w-[50%] border-2 border-white rounded text-center" type="text" maxLength={5} onChange={(e) => setWithdrawDetails({ ...withdrawDetails, withdrawAmount: e.target.value.replace(/\D/g, "") })} />
            <div className="mt-5 text-[#E6DDC4] font-medium">{withdrawValidation.withdrawAmountValidation}</div>
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">Enter the Pin</div>
            <input value={withdrawDetails.pinNumber} className="mt-5 font-medium text-[#F5F5F5] bg-[#05595B] p-3 w-[20%] max-md:w-[50%] border-2 border-white rounded text-center" type="password" maxLength={4} onChange={(e) => setWithdrawDetails({ ...withdrawDetails, pinNumber: e.target.value.replace(/\D/g, "") })} />
            <div className="mt-5 text-[#E6DDC4] font-medium">{withdrawValidation.pinNumberValidation}</div>
            <div className="mt-5">
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={handleWithdrawAction}>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default Withdraw