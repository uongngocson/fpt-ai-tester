const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Environment Domain Mapping
const DOMAINS = {
  PROD: 'http://botftel-api.fpt.net',
  STAG: 'http://botftel-api-stag.fpt.net'
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environments: DOMAINS
  });
});

// Proxy: Get Token
app.post('/api/proxy/get_token', async (req, res) => {
  const { environment = 'PROD', client_secret, custom_domain } = req.body;
  const baseUrl = custom_domain || DOMAINS[environment] || DOMAINS.PROD;
  const targetUrl = `${baseUrl}/bot-gateway-api/get_token`;

  try {
    const startTime = Date.now();
    const response = await axios.post(targetUrl, {
      client_secret: client_secret || 'HXS7yjvNPf5JH8NSDr3oMFETP0dDRhUc'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 15000
    });
    const latency = Date.now() - startTime;

    return res.json({
      success: true,
      statusCode: response.status,
      latencyMs: latency,
      data: response.data,
      targetUrl
    });
  } catch (error) {
    console.error('[PROXY TOKEN ERROR]:', error.message);
    const latency = error.config ? Date.now() - (error.config.startTime || Date.now()) : 0;
    
    // Check if network error (e.g., host unreachable outside FPT intranet)
    const isNetworkError = !error.response;
    
    return res.status(error.response ? error.response.status : 500).json({
      success: false,
      statusCode: error.response ? error.response.status : 500,
      latencyMs: latency,
      error: error.message,
      targetUrl,
      isNetworkError,
      details: error.response ? error.response.data : null,
      message: isNetworkError 
        ? 'Mạng nội bộ hoặc Host botftel-api.fpt.net hiện không phản hồi từ máy này (Network / DNS / VPN issue). Hệ thống đã tự động ghi nhận log.'
        : 'Lỗi khi gọi API Get Token.'
    });
  }
});

// Proxy: Generate IDP
app.post('/api/proxy/generate_idp', async (req, res) => {
  const { environment = 'PROD', token, payload, custom_domain } = req.body;
  const baseUrl = custom_domain || DOMAINS[environment] || DOMAINS.PROD;
  const targetUrl = `${baseUrl}/bot-gateway-api/ip-project/v1/generate-idp`;

  if (!token) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      error: 'Token is required. Please obtain bearer token first.'
    });
  }

  try {
    const startTime = Date.now();
    const response = await axios.post(targetUrl, payload, {
      headers: {
        'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 60000 // IDP AI model generation might take up to 60s
    });
    const latency = Date.now() - startTime;

    return res.json({
      success: true,
      statusCode: response.status,
      latencyMs: latency,
      data: response.data,
      targetUrl
    });
  } catch (error) {
    console.error('[PROXY GENERATE IDP ERROR]:', error.message);
    const isNetworkError = !error.response;

    return res.status(error.response ? error.response.status : 500).json({
      success: false,
      statusCode: error.response ? error.response.status : 500,
      error: error.message,
      targetUrl,
      isNetworkError,
      details: error.response ? error.response.data : null,
      message: isNetworkError 
        ? 'Không thể kết nối trực tiếp đến endpoint IP Project Generate IDP. Kiểm tra lại mạng nội bộ / VPN FPT.'
        : 'Lỗi từ API Generate IDP.'
    });
  }
});

// Serve frontend SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 IP Project -> IDP Enterprise Management Web App`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
