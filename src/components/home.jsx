const Home = (props) => {
    const {history}=props
    return (
        <div>
            <button onClick={()=>history.push("/withdraw")}>Withdraw</button>
            <button onClick={()=>history.push("/deposit")}>Deposit</button>
        </div>
    )
}
export default Home