import mongoose from 'mongoose';

const PAYMENT_STATUSES = {
    SUCCESSFUL: 'successful',
    FAILED: 'failed',
    PROCESSING: 'processing',
    PENDING: 'pending'
};

const orderSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
        orderItems:[
            {
                name:{type: String, required:true},
                quantity: {type: Number, required: true, default:0},
                image: {type: String, required: true},
                price: {type: String, required: true},
            }
        ],
        shippingAddress:{
            fullName:{type: String, required:true},
            phoneNumber:{type: String, required:true},
            address:{type: String, required:true},
            city:{type: String, required:true},
            country:{type: String, required:true},
            
        },
        paymentMethod:{type: String, required:true},
        itemsPrice:{type: Number, required:true},
        shippingPrice:{type: Number, required:true},
        taxPrice:{type: Number, required:true},
        totalPrice:{type: Number, required:true},
        // isPaid:{type: Boolean, required:true, default:false},
        isDelivered:{type: Boolean, required:true, default: false},
        paidAt:{type: Date},
        deliveredAt:{type: Date},
        paymentReference: {type: String, required:false, unique: true},
        paymentStatus:{type: String, required: true, enum: Object.values(PAYMENT_STATUSES),
            default: PAYMENT_STATUSES.PENDING}
    },{
        timestamps: true,
    }
)

const Order = mongoose.models.Order || mongoose.model ('Order', orderSchema);

export default Order;