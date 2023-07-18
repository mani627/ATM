import { useState } from "react"
import { useDispatch } from "react-redux"
import { deposit } from "../redux/actionCreator"

const Deposit = (props) => {

    const { history } = props
    const dispatch = useDispatch()
    const [emptyValidation, setEmptyValidation] = useState("")
    const [depositAmount, setDepositAmount] = useState({ fiveHundredNote: "", twoHundredNote: "", oneHundredNote: "" })

    const handleContinue = () => {
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

    return (
        <div className="bg-[#062C30] h-[100vh] flex flex-col border-2  border-white items-center">
            <div className="text-3xl text-[#E2D784] mt-10 font-medium">Deposit</div>
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">Enter the amount you want to deposit</div>
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">500 x</div>
            <input value={depositAmount.fiveHundredNote} className="mt-5 font-medium text-[#F5F5F5] bg-[#05595B] p-3 w-[20%] max-md:w-[50%] border-2 border-white rounded text-center" type="text" onChange={(e) => setDepositAmount({ ...depositAmount, fiveHundredNote: e.target.value.replace(/\D/g, "") })} maxLength={"2"} />
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">200 x</div>
            <input value={depositAmount.twoHundredNote} className="mt-5 font-medium text-[#F5F5F5] bg-[#05595B] p-3 w-[20%] max-md:w-[50%] border-2 border-white rounded text-center" type="text" onChange={(e) => setDepositAmount({ ...depositAmount, twoHundredNote: e.target.value.replace(/\D/g, "") })} maxLength={"2"} />
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">100 x</div>
            <input value={depositAmount.oneHundredNote} className="mt-5 font-medium text-[#F5F5F5] bg-[#05595B] p-3 w-[20%] max-md:w-[50%] border-2 border-white rounded text-center" type="text" onChange={(e) => setDepositAmount({ ...depositAmount, oneHundredNote: e.target.value.replace(/\D/g, "") })} maxLength={"2"} />
            <div className="mt-5">
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={handleContinue}>
                    Continue
                </button>
            </div>
            <div className="mt-5 text-[#E6DDC4] font-medium">{emptyValidation}</div>
        </div>
    )
}
export default Deposit