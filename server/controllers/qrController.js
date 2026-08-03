const QRCode = require('qrcode');
const Table = require('../models/Table');

const generateTableQR = async (req, res, next) => {
  try {
    const { tableId } = req.params;
    
    const table = await Table.findById(tableId);
    if (!table) return res.status(404).json({ success: false, message: 'Table not found' });

    // The URL the QR code will point to (e.g. customer facing menu)
    // In production, this would be your frontend domain
    const orderUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/table/${table._id}`;
    
    // Generate QR code data URL (base64 image)
    const qrCodeDataUrl = await QRCode.toDataURL(orderUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    // Save to table if not already saved (or update it)
    table.qrCode = qrCodeDataUrl;
    await table.save();

    res.status(200).json({ 
      success: true, 
      data: {
        tableNumber: table.tableNumber,
        url: orderUrl,
        qrImage: qrCodeDataUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateTableQR
};
