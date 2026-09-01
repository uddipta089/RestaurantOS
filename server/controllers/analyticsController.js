const Order = require('../models/Order');
const Bill = require('../models/Bill');

const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

const getDashboardMetrics = async (req, res, next) => {
  try {
    const bills = await Bill.find(); 
    const totalRevenue = bills.reduce((acc, bill) => acc + bill.grandTotal, 0);
    const ordersCount = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });
    const completedOrders = await Order.countDocuments({ orderStatus: 'Completed' });

    res.status(200).json({
      success: true,
      data: { totalRevenue, ordersCount, pendingOrders, completedOrders }
    });
  } catch (error) {
    next(error);
  }
};

const getSalesChartData = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: [
        { date: '2023-01-01', revenue: 500 },
        { date: '2023-01-02', revenue: 800 }
      ]
    });
  } catch (error) {
    next(error);
  }
};

const exportDashboardCSV = async (req, res, next) => {
  try {
    const bills = await Bill.find().populate('orderId');
    
    const fields = ['invoiceNumber', 'grandTotal', 'paymentStatus', 'createdAt'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(bills);

    res.header('Content-Type', 'text/csv');
    res.attachment('dashboard_report.csv');
    return res.send(csv);
  } catch (error) {
    next(error);
  }
};

const exportDashboardPDF = async (req, res, next) => {
  try {
    const bills = await Bill.find();
    const totalRevenue = bills.reduce((acc, bill) => acc + bill.grandTotal, 0);

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=dashboard_report.pdf');
    
    doc.pipe(res);
    doc.fontSize(20).text('RestaurantOS Dashboard Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Total Revenue: $${totalRevenue.toFixed(2)}`);
    doc.text(`Total Orders: ${bills.length}`);
    doc.text(`Generated At: ${new Date().toLocaleString()}`);
    doc.end();

  } catch (error) {
    next(error);
  }
};

const getCustomerSegmentation = async (req, res, next) => {
  try {
    const Customer = require('../models/Customer');
    const customers = await Customer.find();
    
    // Very basic RFM (Recency, Frequency, Monetary) segmentation simulation
    const segments = {
      'VIP': 0,
      'Regular': 0,
      'Occasional': 0,
      'New': 0
    };

    customers.forEach(c => {
      if (c.totalSpent > 1000 && c.totalVisits > 20) segments['VIP']++;
      else if (c.totalSpent > 300 && c.totalVisits > 5) segments['Regular']++;
      else if (c.totalVisits > 1) segments['Occasional']++;
      else segments['New']++;
    });

    res.status(200).json({ success: true, data: segments });
  } catch (error) {
    next(error);
  }
};

const exportDashboardExcel = async (req, res, next) => {
  try {
    const exceljs = require('exceljs');
    const bills = await Bill.find();
    
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Sales Report');
    
    worksheet.columns = [
      { header: 'Invoice Number', key: 'invoiceNumber', width: 20 },
      { header: 'Grand Total', key: 'grandTotal', width: 15 },
      { header: 'Status', key: 'paymentStatus', width: 15 },
      { header: 'Date', key: 'createdAt', width: 25 }
    ];

    bills.forEach(bill => {
      worksheet.addRow({
        invoiceNumber: bill.invoiceNumber,
        grandTotal: bill.grandTotal,
        paymentStatus: bill.paymentStatus,
        createdAt: bill.createdAt.toISOString()
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=sales_report.xlsx');
    
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardMetrics,
  getSalesChartData,
  exportDashboardCSV,
  exportDashboardPDF,
  exportDashboardExcel,
  getCustomerSegmentation
};
