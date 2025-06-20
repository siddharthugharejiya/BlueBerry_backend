
import paypal from '@paypal/checkout-server-sdk';
import { client } from '../config/Paypal';

export const captureOrder = async (req, res) => {
    const { orderID } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const response = await client.execute(request);
        res.status(200).json({ success: true, data: response.result });
    } catch (error) {
        console.error("PayPal Capture Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
