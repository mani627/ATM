const Home = (props) => {

    const { history } = props

    return (

        <div className="bg-[#062C30] h-[100vh] flex flex-col border-2 border-white ">
            <div className="text-3xl text-[#E2D784] mt-10 font-medium text-center">Home</div>
            <div className="mt-6 flex justify-evenly pt-5">
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={() => history.push("/withdraw")}>
                    Withdraw
                </button>
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={() => history.push("/deposit")}>
                    Deposit
                </button>
            </div>
        </div>

    )
}
export default Home