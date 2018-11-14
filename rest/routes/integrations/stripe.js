const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const { returnJson, returnJsonError, getAccessToken } = require('~/helpers')
const Stripe = require('stripe')

router.use('*', asyncHandler(async (req, res, next) => {
  res.locals.stripe = Stripe(
    await getAccessToken(req.headers.authorization, 'stripe')
  )
  next()
}))

/* Create a charge - https://stripe.com/docs/api/charges/create?lang=node */
router.post('/charges', (req, res) => {
  res.locals.stripe.charges.create(req.body)
    .then(data => returnJson(res, data))
    .catch(error => returnJsonError(res, error))
})

/* Retrieve a charge - https://stripe.com/docs/api/charges/retrieve?lang=node */
router.get('/charges/:charge', (req, res) => {
  res.locals.stripe.charges.retrieve(req.params.charge)
    .then(data => returnJson(res, data))
    .catch(error => returnJsonError(res, error))
})

/* Update a charge - https://stripe.com/docs/api/charges/update?lang=node */
router.post('/charges/:charge', (req, res) => {
  res.locals.stripe.charges.update(req.params.charge, req.body)
    .then(data => returnJson(res, data))
    .catch(error => returnJsonError(res, error))
})

/* Capture a charge - https://stripe.com/docs/api/charges/capture?lang=node */
router.post('/charges/:charge/capture', (req, res) => {
  res.locals.stripe.charges.capture(req.params.charge, req.body)
    .then(data => returnJson(res, data))
    .catch(error => returnJsonError(res, error))
})

/* List all charges - https://stripe.com/docs/api/charges/list?lang=node*/
router.get('/charges', (req, res) => {
  res.locals.stripe.charges.list(req.query)
    .then(data => returnJson(res, data))
    .catch(error => returnJsonError(res, error))
})

/* Create a customer - https://stripe.com/docs/api/customers/create?lang=node */
router.post('/customers', (req, res) => {
  res.locals.stripe.customers.create(req.body)
    .then(data => returnJson(res, data))
    .catch(error => returnJsonError(res, error))
})

/* Retrieve a customer - https://stripe.com/docs/api/customers/retrieve?lang=node */
router.get('/customers/:customer', (req, res) => {
  res.locals.stripe.customers.retrieve(req.params.customer)
    .then(data => returnJson(res, data))
    .catch(error => returnJsonError(res, error))
})

/* Update a customer - https://stripe.com/docs/api/customers/update?lang=node */
router.post('/customers/:customer', (req, res) => {
  res.locals.stripe.customers.update(req.params.customer, req.body)
    .then(data => returnJson(res, data))
    .catch(error => returnJsonError(res, error))
})

/* Delete a customer - https://stripe.com/docs/api/customers/delete?lang=node */
router.delete('/customers/:customer', (req, res) => {
  res.locals.stripe.customers.del(req.params.customer)
    .then(data => returnJson(res, data))
    .catch(error => returnJsonError(res, error))
})

/* List all customers - https://stripe.com/docs/api/customers/list?lang=node */
router.get('/customers', (req, res) => {
  res.locals.stripe.customers.list(req.query)
    .then(data => returnJson(res, data))
    .catch(error => returnJsonError(res, error))
})

module.exports = router