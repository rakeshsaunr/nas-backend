const express = require('express');
const router = express.Router();

const authRoutes = require('./auth-routes');
const blogRoutes = require('./blog-routes');
const contactRoutes = require('./contact-routes');
const callslipRoutes = require('./callslip-routes');
const servicecallRoutes = require('./servicecall-routes');
const categoryRoutes = require('./category-routes');
const expenseCategoryRoutes = require('./expense-category-routes');
const expenseRoutes = require('./expense-routes');
const departmentRoutes = require('./department-routes');
const divisionMasterRoutes = require('./division-master-routes'); // Added division-master route
const customerMasterRoutes = require('./customer-master-routes'); // Added customer-master route
const customerTypeMasterRoutes = require('./customer-type-master-routes'); // Added customer-type-master route
const incomeRoutes = require('./income-routes');
const invoiceRoutes = require('./invoice-routes');
const clientRoutes = require('./client-routes');
const paymentRoutes = require('./payment-routes'); // Added payment route
const orderRoutes = require('./order-routes'); // Added order route
const employeeRoutes = require('./employee-master-routes'); // Added employee route
const enquiryRoutes = require('./enquiry-routes'); // Added enquiry route
const newsletterRoutes = require('./newsletter-routes'); // Added newsletter route
const reportRoutes = require('./report-routes'); // Added report route
const callEntryFormRoutes = require('./call-entry-form-routes'); // Added call-entry-form route
const statusMasterRoutes = require('./status-master-routes'); // Added status-master route
const callMasterRoutes = require('./call-master-routes'); // Added call-master route
const callTypeMasterRoutes = require('./call-type-master-routes'); // Added call-type-master route
const venderMasterRoutes = require('./vender-master-routes'); // Added vender-master route
const callUrgencyRoutes = require('./call-urgency-routes'); // Added call-urgency route
const problemRoutes = require('./problem-routes'); // Added problem route
const itemTypeMasterRoutes = require('./item-type-master-routes'); // Added item-type-master route
const supportPeriodMasterRoutes = require('./support-period-master-routes'); // Added support-period-master route
const designationMasterRoutes = require('./designation-master-routes'); // Added designation-master route
const endUserMasterRoutes = require('./end-user-routes'); // Added end-user-master route
const callNatureMasterRoutes = require('./call-nature-master-routes'); // Added call-nature-master route
const instrumentMasterRoutes = require('./instrument-master-routes'); // Added instrument-master route
const dailyCallsSheetRoutes = require('./daily-calls-sheet-routes'); // Added daily-calls-sheet route
const technicianMasterRoutes = require('./technician-master-routes'); // Added technician-master route
const callsAssigningRoutes = require('./calls-assigning-routes'); // Added calls-assigning route

// Register routes
router.use('/auth', authRoutes);
router.use('/blog', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/callslip', callslipRoutes);
router.use('/servicecall', servicecallRoutes);
router.use('/category', categoryRoutes);
router.use('/expense-category', expenseCategoryRoutes);
router.use('/expense', expenseRoutes);
router.use('/department', departmentRoutes);
router.use('/division-master', divisionMasterRoutes); // Register division-master route
router.use('/customer-master', customerMasterRoutes); // Register customer-master route
router.use('/customer-type-master', customerTypeMasterRoutes); // Register customer-type-master route
router.use('/income', incomeRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/client', clientRoutes);
router.use('/payment', paymentRoutes); // Register payment route
router.use('/order', orderRoutes); // Register order route
router.use('/employee-master', employeeRoutes); // Register employee route
router.use('/enquiry', enquiryRoutes); // Register enquiry route
router.use('/newsletter', newsletterRoutes); // Register newsletter route
router.use('/report', reportRoutes); // Register report route
router.use('/call-entry-form', callEntryFormRoutes); // Register call-entry-form route
router.use('/status-master', statusMasterRoutes); // Register status-master route
router.use('/call-master', callMasterRoutes); // Register call-master route
router.use('/call-type-master', callTypeMasterRoutes); // Register call-type-master route
router.use('/vender-master', venderMasterRoutes); // Register vender-master route
router.use('/call-urgency', callUrgencyRoutes); // Register call-urgency route
router.use('/problem', problemRoutes); // Register problem route
router.use('/item-type-master', itemTypeMasterRoutes); // Register item-type-master route
router.use('/support-period-master', supportPeriodMasterRoutes); // Register support-period-master route
router.use('/designation-master', designationMasterRoutes); // Register designation-master route
router.use('/end-user-master', endUserMasterRoutes); // Register end-user-master route
router.use('/call-nature-master', callNatureMasterRoutes); // Register call-nature-master route
router.use('/instrument-master', instrumentMasterRoutes); // Register instrument-master route
router.use('/daily-calls-sheet', dailyCallsSheetRoutes); // Register daily-calls-sheet route
router.use('/technician-master', technicianMasterRoutes); // Register technician-master route
router.use('/calls-assigning', callsAssigningRoutes); // Register calls-assigning route

module.exports = router;
