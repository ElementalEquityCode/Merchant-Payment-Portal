const stripe = require('stripe')('');
const express = require('express');

const router = express.Router();

router.use('/create-payment-intent', express.json());

router.post('/create-payment-intent', async (req ,res) => {
    let payment = null;

    try {
        payment = await fetchOrCreateStripeCustomer(req.body);

        res.status(200).send({
            clientSecret: payment.client_secret
        })
    } catch (error) {
        res.status(400).send(error.raw.code)
    }
});

const fetchOrCreateStripeCustomer = async (requestBody) => {
    let customer = await stripe.customers.list({
        email: requestBody.email.toLowerCase()
    });

    if (customer.data.length == 0) {
        let newCustomer = await stripe.customers.create({
            email: requestBody.email.toLowerCase(),
            name: requestBody.name
        }).then(
            function(customer) {
                return customer;
            },
            function(error) {
                return error;
            }
        );

        if (newCustomer) {
            return createStripeCharge(newCustomer,  requestBody.amountToPay);
        }

    } else {
        return createStripeCharge(customer.data[0], requestBody.amountToPay);
    }
}

const createStripeCharge = async (customer, amountToPay) => {
    return await stripe.paymentIntents.create({
        amount: amountToPay * 100,
        currency: 'usd',
        customer: customer.id,
        payment_method_types: ['card'],
        description: 'Service completed for ' + customer.name + '.'
    });
}

module.exports = router;