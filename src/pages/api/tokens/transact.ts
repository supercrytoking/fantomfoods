import TokenMetadata from '../../../lib/models/TokenMetadata'
import Transaction from '../../../lib/models/Transaction'

export default async function (req, res) {
    try {
        const { token, receipt } = req.body

        // const { data: etherScanRecords } = await axios.get('https://api.ftmscan.com/api?module=account&action=txlist&address=0xc6A49635A022f6b797292a026cE0F712052336bf&sort=asc&apikey=YourApiKeyToken')

        // console.log(etherScanRecords)

        const transaction = await new Transaction({ receipt })
        await transaction.save()

        const updateToken = await TokenMetadata.findOneAndUpdate({ _id: token }, { owner: receipt.from })

        return res.status(200).json()
    } catch (error) {
        console.log(error)
        return res.status(400).json()
    }
}
