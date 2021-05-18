import { useEffect, useState } from 'react'
import Web3 from 'web3'

export default function useWallet() {
    const [addresses, setAddresses] = useState([])

    const connect = async () => {
        if (window.ethereum) {
            const wallet = await window.ethereum.send('eth_requestAccounts')
            setAddresses(wallet.result)
            return true
        }
        return false
    }

    useEffect(() => {
        window.web3 = new Web3(window.ethereum)

        // async function init() {
        //     const account = web3.eth.accounts[0]
        //     console.log(account)
        // }
        // init()
    }, [])

    return { connect, addresses }
}
