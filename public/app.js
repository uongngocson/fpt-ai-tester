// ==========================================================================
// ENTERPRISE JS CONTROLLER v2.0
// IP Project -> Generate IDP Studio
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    environment: 'PROD',
    customDomain: '',
    token: 'test',
    presets: [],
    payload: {
      employee_info: {
        full_name: "Phạm Hồng Diệp",
        fpt_email: "DiepPH4@fpt.com",
        branch: "AGG",
        evaluation_period: "Tháng 4/2026"
      },
      competency_benchmark: {
        competency_group: "GIÁ TRỊ CỐT LÕI",
        competency_name: "Duy trì và lan tỏa giá trị văn hóa FPT",
        benchmark_level: 3,
        behaviour_indicator: [
          { level: 1, description: "Hiểu về các giá trị cốt lõi và có áp dụng trong quá trình quản trị phòng ban." },
          { level: 2, description: "Luôn thể hiện việc tuân thủ tốt các giá trị cốt lõi trong quá trình quản trị phòng ban." },
          { level: 3, description: "Có phương pháp để đảm bảo đội ngũ nhân viên luôn tuân thủ và phát huy tối đa các giá trị cốt lõi." }
        ],
        signals: [
          { level: 1, indicators: ["Đề cập đến các khái niệm, độ hiểu biết về văn hóa FPT", "Đề cập việc áp dụng đội nhóm"] },
          { level: 2, indicators: ["Tuân thủ và duy trì việc ứng dụng giá trị cốt lõi", "Mentor hướng dẫn đội ngũ"] },
          { level: 3, indicators: ["Ứng dụng giá trị cốt lõi vào công tác quản trị", "Đề xuất cải tiến quy trình thúc đẩy văn hóa"] }
        ]
      },
      cbi_agent_data: [
        {
          competency_group_id: "1",
          competency_name_id: "1",
          level: "1",
          score: "2/10",
          signal_summary: "2/10 Level 1 Đề cập đến khái niệm văn hóa FPT",
          standard_breakdown: "Ứng viên đạt Level 1 với 2 signals khớp.",
          feedback: "Điểm tốt: Hiểu biết về văn hóa. Cần cải thiện: Chưa có quy trình đánh giá."
        }
      ],
      manager_review: {
        manager_email: "KhiemPD@fpt.com",
        evaluated_level: 2,
        strengths_keywords: ["Tôn trọng", "Đổi mới", "Đồng đội", "Chí công", "Gương mẫu", "Sáng suốt"],
        weaknesses_keywords: ["Không ý kiến"],
        specific_feedback: "Không"
      },
      peer_reviews: [
        {
          peer_email: "DiepPH4@fpt.com",
          evaluated_level: 3,
          strengths_keywords: ["Tôn trọng", "Đổi mới", "Đồng đội", "Chí công"],
          weaknesses_keywords: ["Không ý kiến"],
          specific_feedback: "Không"
        },
        {
          peer_email: "VietDQ14@fpt.com",
          evaluated_level: 2,
          strengths_keywords: ["Tôn trọng", "Đổi mới", "Đồng đội"],
          weaknesses_keywords: ["Sáng suốt"],
          specific_feedback: "Không ý kiến"
        }
      ]
    }
  };

  // DOM Handles
  const envSelect = document.getElementById('envSelect');
  const customDomainInput = document.getElementById('customDomainInput');
  const presetSelect = document.getElementById('presetSelect');
  const clientSecret = document.getElementById('clientSecret');
  const btnFetchToken = document.getElementById('btnFetchToken');
  const bearerToken = document.getElementById('bearerToken');

  const empName = document.getElementById('empName');
  const empEmail = document.getElementById('empEmail');
  const empBranch = document.getElementById('empBranch');
  const empPeriod = document.getElementById('empPeriod');

  const compGroup = document.getElementById('compGroup');
  const compName = document.getElementById('compName');
  const compBenchmarkChips = document.getElementById('compBenchmarkChips');

  const indicatorsContainer = document.getElementById('indicatorsContainer');
  const btnAddIndicator = document.getElementById('btnAddIndicator');

  const signalsContainer = document.getElementById('signalsContainer');
  const btnAddSignalGroup = document.getElementById('btnAddSignalGroup');

  const cbiContainer = document.getElementById('cbiContainer');
  const btnAddCbiItem = document.getElementById('btnAddCbiItem');

  const mgrEmail = document.getElementById('mgrEmail');
  const mgrLevelChips = document.getElementById('mgrLevelChips');
  const mgrStrengthsTagBox = document.getElementById('mgrStrengthsTagBox');
  const mgrWeaknessesTagBox = document.getElementById('mgrWeaknessesTagBox');
  const mgrFeedback = document.getElementById('mgrFeedback');

  const peerReviewsContainer = document.getElementById('peerReviewsContainer');
  const btnAddPeer = document.getElementById('btnAddPeer');

  const jsonEditor = document.getElementById('jsonEditor');
  const btnFormatJson = document.getElementById('btnFormatJson');
  const btnCopyJson = document.getElementById('btnCopyJson');
  const curlDisplay = document.getElementById('curlDisplay');
  const btnCopyCurl = document.getElementById('btnCopyCurl');
  const btnExecuteApi = document.getElementById('btnExecuteApi');

  const idpVisualizer = document.getElementById('idpVisualizer');
  const idpReportContent = document.getElementById('idpReportContent');
  const resBadge = document.getElementById('resBadge');
  const toast = document.getElementById('toast');

  // Initialization
  init();

  async function init() {
    setupNavigation();
    setupTagInputs();
    setupLevelChips();
    setupEventListeners();
    await loadPresets();
    populateFormFromState();
    updateOutputViewers();
  }

  // --- NAVIGATION & TABS ---
  function setupNavigation() {
    document.querySelectorAll('.nav-chip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-chip-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const targetId = e.target.getAttribute('data-target');
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    document.querySelectorAll('.wb-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.wb-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.wb-pane').forEach(p => p.classList.remove('active'));
        
        e.target.classList.add('active');
        const wbId = e.target.getAttribute('data-wb');
        document.getElementById(wbId).classList.add('active');
      });
    });
  }

  // --- LEVEL CHIPS WIDGET ---
  function setupLevelChips() {
    [compBenchmarkChips, mgrLevelChips].forEach(container => {
      container.querySelectorAll('.level-chip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          container.querySelectorAll('.level-chip-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const val = parseInt(btn.getAttribute('data-val'));

          if (container === compBenchmarkChips) {
            state.payload.competency_benchmark.benchmark_level = val;
          } else if (container === mgrLevelChips) {
            state.payload.manager_review.evaluated_level = val;
          }
          updateOutputViewers();
        });
      });
    });
  }

  // --- TAG INPUT WIDGET ---
  function setupTagInputs() {
    [mgrStrengthsTagBox, mgrWeaknessesTagBox].forEach(box => {
      const input = box.querySelector('.tag-inline-input');
      const isDanger = box === mgrWeaknessesTagBox;

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const val = input.value.trim().replace(',', '');
          if (val) {
            addTagToBox(box, val, isDanger);
            input.value = '';
            syncTagsToState();
            updateOutputViewers();
          }
        }
      });
    });
  }

  function addTagToBox(box, text, isDanger = false) {
    const input = box.querySelector('.tag-inline-input');
    const pill = document.createElement('span');
    pill.className = `tag-pill ${isDanger ? 'tag-pill-danger' : ''}`;
    pill.innerHTML = `${text} <button class="tag-remove-btn">&times;</button>`;
    
    pill.querySelector('.tag-remove-btn').addEventListener('click', () => {
      pill.remove();
      syncTagsToState();
      updateOutputViewers();
    });

    box.insertBefore(pill, input);
  }

  function syncTagsToState() {
    const strengths = Array.from(mgrStrengthsTagBox.querySelectorAll('.tag-pill')).map(p => p.textContent.replace('×', '').trim());
    const weaknesses = Array.from(mgrWeaknessesTagBox.querySelectorAll('.tag-pill')).map(p => p.textContent.replace('×', '').trim());

    state.payload.manager_review.strengths_keywords = strengths;
    state.payload.manager_review.weaknesses_keywords = weaknesses;
  }

  // --- PRESETS LOADING ---
  async function loadPresets() {
    try {
      const res = await fetch('/presets.json');
      const data = await res.json();
      state.presets = data.presets || [];

      presetSelect.innerHTML = '<option value="">-- Preset Mẫu --</option>';
      state.presets.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        presetSelect.appendChild(opt);
      });
    } catch (e) {
      console.warn('Failed to load presets:', e);
    }
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    envSelect.addEventListener('change', () => {
      state.environment = envSelect.value;
      if (state.environment === 'CUSTOM') {
        customDomainInput.classList.remove('hidden');
      } else {
        customDomainInput.classList.add('hidden');
      }
      updateOutputViewers();
    });

    presetSelect.addEventListener('change', () => {
      const p = state.presets.find(item => item.id === presetSelect.value);
      if (p) {
        state.payload = JSON.parse(JSON.stringify(p.data));
        populateFormFromState();
        updateOutputViewers();
        showToast('Đã tải preset: ' + p.name);
      }
    });

    btnFetchToken.addEventListener('click', fetchToken);

    [empName, empEmail, empBranch, empPeriod].forEach(input => {
      input.addEventListener('input', () => {
        state.payload.employee_info.full_name = empName.value;
        state.payload.employee_info.fpt_email = empEmail.value;
        state.payload.employee_info.branch = empBranch.value;
        state.payload.employee_info.evaluation_period = empPeriod.value;
        updateOutputViewers();
      });
    });

    [compGroup, compName].forEach(input => {
      input.addEventListener('input', () => {
        state.payload.competency_benchmark.competency_group = compGroup.value;
        state.payload.competency_benchmark.competency_name = compName.value;
        updateOutputViewers();
      });
    });

    [mgrEmail, mgrFeedback].forEach(input => {
      input.addEventListener('input', () => {
        state.payload.manager_review.manager_email = mgrEmail.value;
        state.payload.manager_review.specific_feedback = mgrFeedback.value;
        updateOutputViewers();
      });
    });

    btnAddIndicator.addEventListener('click', () => {
      state.payload.competency_benchmark.behaviour_indicator.push({
        level: state.payload.competency_benchmark.behaviour_indicator.length + 1,
        description: ""
      });
      renderIndicators();
      updateOutputViewers();
    });

    btnAddSignalGroup.addEventListener('click', () => {
      state.payload.competency_benchmark.signals.push({
        level: state.payload.competency_benchmark.signals.length + 1,
        indicators: [""]
      });
      renderSignals();
      updateOutputViewers();
    });

    btnAddCbiItem.addEventListener('click', () => {
      state.payload.cbi_agent_data.push({
        competency_group_id: "1",
        competency_name_id: "1",
        level: "1",
        score: "0/10",
        signal_summary: "",
        standard_breakdown: "",
        feedback: ""
      });
      renderCbiItems();
      updateOutputViewers();
    });

    btnAddPeer.addEventListener('click', () => {
      state.payload.peer_reviews.push({
        peer_email: "",
        evaluated_level: 2,
        strengths_keywords: [],
        weaknesses_keywords: [],
        specific_feedback: ""
      });
      renderPeerReviews();
      updateOutputViewers();
    });

    jsonEditor.addEventListener('input', () => {
      try {
        state.payload = JSON.parse(jsonEditor.value);
        populateFormFromState(false);
        renderCurlCommand();
      } catch (e) {}
    });

    btnFormatJson.addEventListener('click', () => {
      try {
        jsonEditor.value = JSON.stringify(JSON.parse(jsonEditor.value), null, 2);
      } catch (e) {}
    });

    btnCopyJson.addEventListener('click', () => {
      navigator.clipboard.writeText(jsonEditor.value);
      showToast('Đã copy JSON!');
    });

    btnCopyCurl.addEventListener('click', () => {
      navigator.clipboard.writeText(curlDisplay.textContent);
      showToast('Đã copy cURL Command!');
    });

    btnExecuteApi.addEventListener('click', executeGenerateIdp);
  }

  // --- POPULATE FORM ---
  function populateFormFromState(updateEditor = true) {
    const { employee_info, competency_benchmark, manager_review } = state.payload;

    empName.value = employee_info.full_name || '';
    empEmail.value = employee_info.fpt_email || '';
    empBranch.value = employee_info.branch || '';
    empPeriod.value = employee_info.evaluation_period || '';

    compGroup.value = competency_benchmark.competency_group || '';
    compName.value = competency_benchmark.competency_name || '';

    // Set level chip for benchmark
    const bLvl = competency_benchmark.benchmark_level || 3;
    compBenchmarkChips.querySelectorAll('.level-chip-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.getAttribute('data-val')) === bLvl);
    });

    mgrEmail.value = manager_review.manager_email || '';
    mgrFeedback.value = manager_review.specific_feedback || '';

    // Set level chip for manager
    const mLvl = manager_review.evaluated_level || 2;
    mgrLevelChips.querySelectorAll('.level-chip-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.getAttribute('data-val')) === mLvl);
    });

    // Populate Strengths & Weaknesses Tags
    mgrStrengthsTagBox.querySelectorAll('.tag-pill').forEach(p => p.remove());
    (manager_review.strengths_keywords || []).forEach(kw => addTagToBox(mgrStrengthsTagBox, kw));

    mgrWeaknessesTagBox.querySelectorAll('.tag-pill').forEach(p => p.remove());
    (manager_review.weaknesses_keywords || []).forEach(kw => addTagToBox(mgrWeaknessesTagBox, kw, true));

    renderIndicators();
    renderSignals();
    renderCbiItems();
    renderPeerReviews();

    if (updateEditor) {
      jsonEditor.value = JSON.stringify(state.payload, null, 2);
    }
  }

  // --- RENDER DYNAMIC LISTS ---
  function renderIndicators() {
    indicatorsContainer.innerHTML = '';
    (state.payload.competency_benchmark.behaviour_indicator || []).forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-card-item';
      card.innerHTML = `
        <div class="dynamic-card-header">
          <span>Indicator Level ${item.level}</span>
          <button class="btn-card-delete" onclick="removeIndicator(${index})">Delete</button>
        </div>
        <div class="grid-2">
          <div class="input-field-group">
            <label class="input-label">Level</label>
            <input type="number" class="modern-input" value="${item.level}" min="1" max="5" onchange="updateIndicatorLevel(${index}, this.value)">
          </div>
          <div class="input-field-group span-full">
            <label class="input-label">Description</label>
            <textarea class="modern-textarea" oninput="updateIndicatorDesc(${index}, this.value)">${item.description || ''}</textarea>
          </div>
        </div>
      `;
      indicatorsContainer.appendChild(card);
    });
  }

  function renderSignals() {
    signalsContainer.innerHTML = '';
    (state.payload.competency_benchmark.signals || []).forEach((sig, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-card-item';
      card.innerHTML = `
        <div class="dynamic-card-header">
          <span>Signal Level ${sig.level}</span>
          <button class="btn-card-delete" onclick="removeSignal(${index})">Delete</button>
        </div>
        <div class="input-field-group span-full">
          <label class="input-label">Indicators List (1 item per line)</label>
          <textarea class="modern-textarea" oninput="updateSignalIndicators(${index}, this.value)">${(sig.indicators || []).join('\n')}</textarea>
        </div>
      `;
      signalsContainer.appendChild(card);
    });
  }

  function renderCbiItems() {
    cbiContainer.innerHTML = '';
    (state.payload.cbi_agent_data || []).forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-card-item';
      card.innerHTML = `
        <div class="dynamic-card-header">
          <span>CBI Item #${index + 1} (${item.score || '0/10'})</span>
          <button class="btn-card-delete" onclick="removeCbiItem(${index})">Delete</button>
        </div>
        <div class="grid-2">
          <div class="input-field-group">
            <label class="input-label">Score</label>
            <input type="text" class="modern-input" value="${item.score || ''}" oninput="updateCbiField(${index}, 'score', this.value)">
          </div>
          <div class="input-field-group">
            <label class="input-label">Level</label>
            <input type="text" class="modern-input" value="${item.level || ''}" oninput="updateCbiField(${index}, 'level', this.value)">
          </div>
          <div class="input-field-group span-full">
            <label class="input-label">Signal Summary</label>
            <input type="text" class="modern-input" value="${item.signal_summary || ''}" oninput="updateCbiField(${index}, 'signal_summary', this.value)">
          </div>
          <div class="input-field-group span-full">
            <label class="input-label">Feedback</label>
            <textarea class="modern-textarea" oninput="updateCbiField(${index}, 'feedback', this.value)">${item.feedback || ''}</textarea>
          </div>
        </div>
      `;
      cbiContainer.appendChild(card);
    });
  }

  function renderPeerReviews() {
    peerReviewsContainer.innerHTML = '';
    (state.payload.peer_reviews || []).forEach((peer, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-card-item';
      card.innerHTML = `
        <div class="dynamic-card-header">
          <span>Peer Review: ${peer.peer_email || 'New Peer'}</span>
          <button class="btn-card-delete" onclick="removePeer(${index})">Delete</button>
        </div>
        <div class="grid-2">
          <div class="input-field-group">
            <label class="input-label">Peer Email</label>
            <input type="email" class="modern-input" value="${peer.peer_email || ''}" oninput="updatePeerField(${index}, 'peer_email', this.value)">
          </div>
          <div class="input-field-group">
            <label class="input-label">Evaluated Level</label>
            <input type="number" class="modern-input" value="${peer.evaluated_level || 2}" min="1" max="5" onchange="updatePeerField(${index}, 'evaluated_level', parseInt(this.value))">
          </div>
          <div class="input-field-group span-full">
            <label class="input-label">Specific Feedback</label>
            <textarea class="modern-textarea" oninput="updatePeerField(${index}, 'specific_feedback', this.value)">${peer.specific_feedback || ''}</textarea>
          </div>
        </div>
      `;
      peerReviewsContainer.appendChild(card);
    });
  }

  // Window Callbacks
  window.removeIndicator = (idx) => { state.payload.competency_benchmark.behaviour_indicator.splice(idx, 1); renderIndicators(); updateOutputViewers(); };
  window.updateIndicatorLevel = (idx, val) => { state.payload.competency_benchmark.behaviour_indicator[idx].level = parseInt(val)||1; updateOutputViewers(); };
  window.updateIndicatorDesc = (idx, val) => { state.payload.competency_benchmark.behaviour_indicator[idx].description = val; updateOutputViewers(); };
  window.removeSignal = (idx) => { state.payload.competency_benchmark.signals.splice(idx, 1); renderSignals(); updateOutputViewers(); };
  window.updateSignalIndicators = (idx, val) => { state.payload.competency_benchmark.signals[idx].indicators = val.split('\n').filter(Boolean); updateOutputViewers(); };
  window.removeCbiItem = (idx) => { state.payload.cbi_agent_data.splice(idx, 1); renderCbiItems(); updateOutputViewers(); };
  window.updateCbiField = (idx, field, val) => { state.payload.cbi_agent_data[idx][field] = val; updateOutputViewers(); };
  window.removePeer = (idx) => { state.payload.peer_reviews.splice(idx, 1); renderPeerReviews(); updateOutputViewers(); };
  window.updatePeerField = (idx, field, val) => { state.payload.peer_reviews[idx][field] = val; updateOutputViewers(); };

  // --- OUTPUT VIEWERS UPDATE ---
  function updateOutputViewers() {
    jsonEditor.value = JSON.stringify(state.payload, null, 2);
    renderCurlCommand();
  }

  function renderCurlCommand() {
    const domain = state.environment === 'CUSTOM' ? (state.customDomain || 'http://localhost:3000') : (state.environment === 'STAG' ? 'http://botftel-api-stag.fpt.net' : 'http://botftel-api.fpt.net');
    const token = bearerToken.value.trim() || 'test';
    const jsonBody = JSON.stringify(state.payload, null, 8);

    const curl = `curl --request POST \\
  --url ${domain}/bot-gateway-api/ip-project/v1/generate-idp \\
  --header 'Authorization: Bearer ${token}' \\
  --header 'Content-Type: application/json' \\
  --data '${jsonBody}'`;

    curlDisplay.textContent = curl;
  }

  // --- FETCH TOKEN API ---
  async function fetchToken() {
    const secret = clientSecret.value.trim();
    btnFetchToken.disabled = true;
    btnFetchToken.textContent = 'Fetching...';

    try {
      const res = await fetch('/api/proxy/get_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ environment: state.environment, client_secret: secret })
      });
      const result = await res.json();
      btnFetchToken.disabled = false;
      btnFetchToken.textContent = '🔑 Get Bearer Token';

      if (result.success && result.data) {
        const tokenStr = result.data.access_token || result.data.token || JSON.stringify(result.data);
        bearerToken.value = tokenStr;
        state.token = tokenStr;
        showToast('🔑 Đã lấy token thành công!');
        updateOutputViewers();
      } else {
        showToast('⚠️ Lỗi: ' + (result.message || 'Không thể lấy token'));
      }
    } catch (e) {
      btnFetchToken.disabled = false;
      btnFetchToken.textContent = '🔑 Get Bearer Token';
      showToast('⚠️ Proxy Server error: ' + e.message);
    }
  }

  // --- EXECUTE GENERATE IDP API ---
  async function executeGenerateIdp() {
    resBadge.textContent = 'Executing...';
    resBadge.className = 'res-badge-status';
    idpReportContent.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--indigo); font-weight: 600;">⚡ Đang gọi API Generate IDP...</div>`;

    const tokenStr = bearerToken.value.trim() || 'test';

    try {
      const res = await fetch('/api/proxy/generate_idp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          environment: state.environment,
          token: tokenStr,
          payload: state.payload
        })
      });

      const result = await res.json();

      if (res.ok && result.success) {
        resBadge.textContent = '200 OK';
        resBadge.className = 'res-badge-status res-badge-success';
        renderFormattedIdpReport(result.data);
      } else {
        resBadge.textContent = (result.statusCode || 500) + ' Error';
        resBadge.className = 'res-badge-status res-badge-error';
        idpReportContent.innerHTML = `
          <div style="background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.3); padding: 16px; border-radius: 8px; color: #fca5a5;">
            <h4 style="margin-bottom: 8px;">❌ API Call Unsuccessful</h4>
            <p style="font-size: 0.85rem; margin-bottom: 8px;">${result.message || result.error || 'Server error'}</p>
            <pre style="font-family: var(--font-mono); font-size: 0.78rem; overflow-x: auto;">${JSON.stringify(result, null, 2)}</pre>
          </div>
        `;
      }
    } catch (e) {
      resBadge.textContent = 'Error';
      resBadge.className = 'res-badge-status res-badge-error';
      idpReportContent.innerHTML = `<p style="color: var(--rose);">Lỗi kết nối Local Proxy: ${e.message}</p>`;
    }
  }

  // Render HTML IDP Executive Report
  function renderFormattedIdpReport(data) {
    idpReportContent.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background-color: var(--bg-sidebar); border: 1px solid var(--border-color); padding: 16px; border-radius: 10px;">
          <h3 style="color: var(--emerald); font-size: 1.05rem; margin-bottom: 6px;">🎉 IDP Result Generated</h3>
          <p style="font-size: 0.82rem; color: var(--text-secondary);">Nhân viên: <strong>${state.payload.employee_info.full_name}</strong> (${state.payload.employee_info.fpt_email})</p>
        </div>
        <pre style="font-family: var(--font-mono); font-size: 0.8rem; background-color: #060911; padding: 16px; border-radius: 8px; color: #93c5fd; overflow-x: auto;">${JSON.stringify(data, null, 2)}</pre>
      </div>
    `;
  }

  // Toast Helper
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }
});
