import database from '../../../lib/db'
import Transaction from '../../../lib/models/Transactions'

export default async function (req, res) {
    try {
        await database()
        const transactions = await Transaction.find({})

        const totalSold = transactions.length
        const price = totalSold * 5 || 5
        res.status(200).json({ price, totalSold })
    } catch (error) {
        console.log(error)
        res.status(400).json()
    }
}
