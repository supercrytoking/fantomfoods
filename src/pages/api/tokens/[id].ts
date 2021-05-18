import fs from 'fs-extra'
import database from '../../../lib/models/db'
import TokenMetadata from '../../../lib/models/TokenMetadata'

export default async function (req, res) {
    try {
        const { id } = req.query
        await database()
        const token = await TokenMetadata.findOne({ _id: id })

        res.status(200).json(token)
    } catch (error) {
        console.log(error)
        res.status(400).json()
    }
}
