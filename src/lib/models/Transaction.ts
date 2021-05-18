import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
    {
        reciept: Object,
        token: '',
        date_created: {
            type: Date,
            default: Date.now()
        }
    },
    { toObject: { virtuals: true }, toJSON: { virtuals: true } }
)
const Transaction = mongoose.models.Transaction || mongoose.model<any>('Transaction', TransactionSchema)

export default Transaction
