import { useSelector } from "react-redux"

const Home = (props) => {

    const { history } = props
    const accNo = useSelector(state => state.accountNumber)
    const cardDetails = useSelector(state => state.cards)
    const accountHolderName = cardDetails.find(accDetails => accNo.toString().includes(accDetails.card_no))

    return (

        <div className="bg-[#062C30] h-[100vh] flex flex-col border-2 border-white text-center">
            <div className="text-3xl text-[#E2D784] mt-10 font-medium ">Home</div>
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">Welcome {accountHolderName.cust_name}!</div>
            <div className="mt-6 flex justify-evenly pt-5">
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={() => history.push("/withdraw")}>
                    Withdraw
                </button>
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4  rounded" onClick={() => history.push("/checkBalance")}>
                    Check Balance
                </button>
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={() => history.push("/deposit")}>
                    Deposit
                </button>
            </div>
        </div>
    )
}
export default Home