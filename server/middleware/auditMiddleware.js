const AuditLog = require('../models/AuditLog');

const auditLogger = (moduleName) => {
  return async (req, res, next) => {
    // Intercept the response to ensure we only log successful mutations
    const originalSend = res.send;
    
    res.send = function (data) {
      // Only log mutations (POST, PUT, DELETE) and successful requests (2xx)
      if (['POST', 'PUT', 'DELETE'].includes(req.method) && res.statusCode >= 200 && res.statusCode < 300) {
        
        let action = 'CREATE';
        if (req.method === 'PUT') action = 'UPDATE';
        if (req.method === 'DELETE') action = 'DELETE';

        const logEntry = new AuditLog({
          userId: req.user ? req.user.userId : null,
          action,
          module: moduleName,
          description: `${action} operation performed on ${req.originalUrl}`,
          ipAddress: req.ip || req.connection.remoteAddress
        });

        // Save asynchronously without blocking the response
        logEntry.save().catch(err => console.error('Audit Log Error:', err));
      }
      
      originalSend.apply(res, arguments);
    };
    
    next();
  };
};

module.exports = auditLogger;
