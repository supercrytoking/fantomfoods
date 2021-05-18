import database from '../../../lib/models/db'
import TokenMetadata from '../../../lib/models/TokenMetadata'

export default async function (req, res) {
    try {
        await database()
        const tokens = await TokenMetadata.find({})

        res.status(200).json(tokens)
    } catch (error) {
        console.log(error)
        res.status(400).json()
    }
}
