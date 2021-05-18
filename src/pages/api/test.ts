import TokenMetadata from '../../lib/models/TokenMetadata'

export default async function (req, res) {
    try {
        const newToken = await new TokenMetadata({
            title: '',
            description: '',
            image: ''
        })
        await newToken.save()

        res.status(400).json(newToken)
    } catch (error) {
        res.status(400).json()
    }
}
