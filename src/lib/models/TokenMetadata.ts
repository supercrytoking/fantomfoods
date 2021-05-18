import mongoose from 'mongoose'

const TokenMetadataSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        image: String,
        owner: String,
        date_created: {
            type: Date,
            default: Date.now()
        }
    },
    { toObject: { virtuals: true }, toJSON: { virtuals: true } }
)

const TokenMetadata = mongoose.models.TokenMetadata || mongoose.model<any>('TokenMetadata', TokenMetadataSchema)

export default TokenMetadata
