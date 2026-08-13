// ==========================================================================
// ENTERPRISE FRONTEND APPLICATION CONTROLLER
// IP Project -> Generate IDP Studio
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- APPLICATION STATE ---
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
          {
            level: 1,
            description: "Hiểu về các giá trị cốt lõi và có áp dụng trong quá trình quản trị phòng ban."
          },
          {
            level: 2,
            description: "Luôn thể hiện việc tuân thủ tốt các giá trị cốt lõi trong quá trình quản trị phòng ban."
          },
          {
            level: 3,
            description: "Có phương pháp để đảm bảo đội ngũ nhân viên của mình luôn ghi nhớ, tuân thủ và phát huy tối đa các giá trị cốt lõi trong công việc."
          }
        ],
        signals: [
          {
            level: 1,
            indicators: [
              "Đề cập đến các khái niệm, độ hiểu biết về văn hóa/giá trị cốt lõi FPT",
              "Đề cập việc áp dụng cá nhân",
              "Đề cập việc áp dụng đội nhóm"
            ]
          },
          {
            level: 2,
            indicators: [
              "Tuân thủ và duy trì việc ứng dụng giá trị cốt lõi trong công việc",
              "Mentor hướng dẫn đội ngũ áp dụng văn hóa/giá trị cốt lõi FPT",
              "Duy trì môi trường làm việc có văn hóa/giá trị cốt lõi FPT"
            ]
          },
          {
            level: 3,
            indicators: [
              "Ứng dụng giá trị cốt lõi vào việc công tác quản lý, quản trị",
              "Theo dõi và đánh giá mức độ áp dụng của nhân viên",
              "Gợi ý điều chỉnh hành vi ứng xử cho phù hợp với các giá trị cốt lõi",
              "Đề xuất cải tiến quy trình/chính sách thúc đẩy văn hóa tổ chức"
            ]
          }
        ]
      },
      cbi_agent_data: [
        {
          competency_group_id: "1",
          competency_name_id: "1",
          level: "1",
          score: "2/10",
          signal_summary: "2/10 Level 1 Đề cập đến các khái niệm, độ hiểu biết về văn hóa/giá trị cốt lõi FPT. Đề cập việc áp dụng đội nhóm",
          standard_breakdown: "Ứng viên đạt Level 1 với 2 signals đã khớp.",
          feedback: "Điểm tốt: Hiểu biết về văn hóa/giá trị cốt lõi FPT. Áp dụng vào đội nhóm. Điểm cần cải thiện: Chưa có quy trình theo dõi và đánh giá cụ thể."
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
          strengths_keywords: ["Tôn trọng", "Đổi mới", "Đồng đội", "Chí công", "Gương mẫu", "Sáng suốt"],
          weaknesses_keywords: ["Không ý kiến"],
          specific_feedback: "Không"
        },
        {
          peer_email: "VietDQ14@fpt.com",
          evaluated_level: 2,
          strengths_keywords: ["Tôn trọng", "Đổi mới", "Đồng đội", "Chí công", "Gương mẫu"],
          weaknesses_keywords: ["Sáng suốt"],
          specific_feedback: "Không ý kiến"
        },
        {
          peer_email: "KhangLM6@fpt.com",
          evaluated_level: 2,
          strengths_keywords: ["Tôn trọng", "Đổi mới", "Đồng đội"],
          weaknesses_keywords: ["Chí công", "Gương mẫu", "Sáng suốt"],
          specific_feedback: "Em không ý kiến"
        }
      ]
    }
  };

  // --- DOM ELEMENTS ---
  const envSelect = document.getElementById('envSelect');
  const customDomainInput = document.getElementById('customDomainInput');
  const presetSelect = document.getElementById('presetSelect');
  const btnDownloadTemplate = document.getElementById('btnDownloadTemplate');
  const btnImportExcel = document.getElementById('btnImportExcel');
  const excelFileInput = document.getElementById('excelFileInput');
  const candidateSelectGroup = document.getElementById('candidateSelectGroup');
  const candidateSelect = document.getElementById('candidateSelect');
  const btnBlankForm = document.getElementById('btnBlankForm');
  const btnResetForm = document.getElementById('btnResetForm');
  
  const clientSecretInput = document.getElementById('clientSecret');
  const btnFetchToken = document.getElementById('btnFetchToken');
  const bearerTokenInput = document.getElementById('bearerToken');
  const btnCopyToken = document.getElementById('btnCopyToken');

  const empName = document.getElementById('empName');
  const empEmail = document.getElementById('empEmail');
  const empBranch = document.getElementById('empBranch');
  const empPeriod = document.getElementById('empPeriod');

  const compGroup = document.getElementById('compGroup');
  const compName = document.getElementById('compName');
  const compBenchmarkLevel = document.getElementById('compBenchmarkLevel');
  
  const indicatorsContainer = document.getElementById('indicatorsContainer');
  const btnAddIndicator = document.getElementById('btnAddIndicator');
  
  const signalsContainer = document.getElementById('signalsContainer');
  const btnAddSignalGroup = document.getElementById('btnAddSignalGroup');

  const cbiContainer = document.getElementById('cbiContainer');
  const btnAddCbiItem = document.getElementById('btnAddCbiItem');

  const mgrEmail = document.getElementById('mgrEmail');
  const mgrLevel = document.getElementById('mgrLevel');
  const mgrStrengths = document.getElementById('mgrStrengths');
  const mgrWeaknesses = document.getElementById('mgrWeaknesses');
  const mgrFeedback = document.getElementById('mgrFeedback');

  const peerReviewsContainer = document.getElementById('peerReviewsContainer');
  const btnAddPeer = document.getElementById('btnAddPeer');

  const jsonEditor = document.getElementById('jsonEditor');
  const btnFormatJson = document.getElementById('btnFormatJson');
  const btnCopyJson = document.getElementById('btnCopyJson');
  const jsonSyntaxStatus = document.getElementById('jsonSyntaxStatus');
  
  const curlDisplay = document.getElementById('curlDisplay');
  const btnCopyCurl = document.getElementById('btnCopyCurl');
  const btnExecuteApi = document.getElementById('btnExecuteApi');

  const resStatusBadge = document.getElementById('resStatusBadge');
  const resLatency = document.getElementById('resLatency');
  const resLoader = document.getElementById('resLoader');
  const responseDisplay = document.getElementById('responseDisplay');

  // --- INITIALIZATION ---
  init();

  async function init() {
    setupEventListeners();
    await loadPresets();
    populateFormFromState();
    updateOutputViewers();
  }

  // --- PRESETS LOADING ---
  async function loadPresets() {
    try {
      const res = await fetch('/presets.json');
      const data = await res.json();
      state.presets = data.presets || [];
      
      presetSelect.innerHTML = '';
      state.presets.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        presetSelect.appendChild(opt);
      });

      // Default to Blank Form for direct clean user entry
      const blankPreset = state.presets.find(p => p.id === 'blank_form');
      if (blankPreset) {
        presetSelect.value = 'blank_form';
        state.payload = JSON.parse(JSON.stringify(blankPreset.data));
      }
    } catch (err) {
      console.warn('Failed to load presets file:', err);
    }
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Stepper Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        e.target.classList.add('active');
        const targetTab = e.target.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
      });
    });

    // View Tabs (JSON vs cURL)
    document.querySelectorAll('.view-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.view-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.view-pane').forEach(p => p.classList.remove('active'));
        
        e.target.classList.add('active');
        const targetView = e.target.getAttribute('data-view');
        document.getElementById(targetView).classList.add('active');
      });
    });

    // Env Picker
    envSelect.addEventListener('change', () => {
      state.environment = envSelect.value;
      if (state.environment === 'CUSTOM') {
        customDomainInput.classList.remove('hidden');
      } else {
        customDomainInput.classList.add('hidden');
      }
      updateOutputViewers();
    });

    customDomainInput.addEventListener('input', () => {
      state.customDomain = customDomainInput.value.trim();
      updateOutputViewers();
    });

    // Download Excel Template Button
    if (btnDownloadTemplate) {
      btnDownloadTemplate.addEventListener('click', downloadExcelTemplate);
    }

    // Excel Import Button & Input
    if (btnImportExcel && excelFileInput) {
      btnImportExcel.addEventListener('click', () => {
        excelFileInput.value = '';
        excelFileInput.click();
      });

      excelFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleExcelImport(e.target.files[0]);
        }
      });
    }

    // Candidate Select (When multi-employee Excel is loaded)
    if (candidateSelect) {
      candidateSelect.addEventListener('change', () => {
        const selectedEmail = candidateSelect.value;
        if (state.excelParsedCandidates && state.excelParsedCandidates[selectedEmail]) {
          state.payload = JSON.parse(JSON.stringify(state.excelParsedCandidates[selectedEmail]));
          populateFormFromState();
          updateOutputViewers();
        }
      });
    }

    // Blank Form Button
    btnBlankForm.addEventListener('click', () => {
      presetSelect.value = 'blank_form';
      presetSelect.dispatchEvent(new Event('change'));
    });

    // Preset Select
    presetSelect.addEventListener('change', () => {
      const selectedId = presetSelect.value;
      const preset = state.presets.find(p => p.id === selectedId);
      if (preset) {
        state.payload = JSON.parse(JSON.stringify(preset.data));
        populateFormFromState();
        updateOutputViewers();
      }
    });

    // Reset Form
    btnResetForm.addEventListener('click', () => {
      if (confirm('Xác nhận đặt lại biểu mẫu nhập liệu về trạng thái ban đầu?')) {
        presetSelect.value = 'blank_form';
        presetSelect.dispatchEvent(new Event('change'));
      }
    });

    // Fetch Token Button
    btnFetchToken.addEventListener('click', fetchToken);

    // Copy Token
    btnCopyToken.addEventListener('click', () => {
      navigator.clipboard.writeText(bearerTokenInput.value);
      alert('Đã copy Bearer token!');
    });

    bearerTokenInput.addEventListener('input', () => {
      state.token = bearerTokenInput.value.trim();
      updateOutputViewers();
    });

    // Form inputs change handlers
    [empName, empEmail, empBranch, empPeriod].forEach(input => {
      input.addEventListener('input', () => {
        state.payload.employee_info.full_name = empName.value;
        state.payload.employee_info.fpt_email = empEmail.value;
        state.payload.employee_info.branch = empBranch.value;
        state.payload.employee_info.evaluation_period = empPeriod.value;
        updateOutputViewers();
      });
    });

    [compGroup, compName, compBenchmarkLevel].forEach(input => {
      input.addEventListener('input', () => {
        state.payload.competency_benchmark.competency_group = compGroup.value;
        state.payload.competency_benchmark.competency_name = compName.value;
        state.payload.competency_benchmark.benchmark_level = parseInt(compBenchmarkLevel.value) || 1;
        updateOutputViewers();
      });
    });

    [mgrEmail, mgrLevel, mgrStrengths, mgrWeaknesses, mgrFeedback].forEach(input => {
      input.addEventListener('input', () => {
        state.payload.manager_review.manager_email = mgrEmail.value;
        state.payload.manager_review.evaluated_level = parseInt(mgrLevel.value) || 1;
        state.payload.manager_review.strengths_keywords = mgrStrengths.value.split(',').map(s => s.trim()).filter(Boolean);
        state.payload.manager_review.weaknesses_keywords = mgrWeaknesses.value.split(',').map(s => s.trim()).filter(Boolean);
        state.payload.manager_review.specific_feedback = mgrFeedback.value;
        updateOutputViewers();
      });
    });

    // Add Dynamic Item Buttons
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

    // JSON Editor Events
    jsonEditor.addEventListener('input', () => {
      try {
        const parsed = JSON.parse(jsonEditor.value);
        state.payload = parsed;
        jsonSyntaxStatus.textContent = '✓ Format JSON Hợp Lệ';
        jsonSyntaxStatus.className = 'syntax-status valid';
        populateFormFromState(false); // Update inputs without overwriting editor
        renderCurlCommand();
      } catch (e) {
        jsonSyntaxStatus.textContent = '❌ Lỗi Cú Pháp JSON: ' + e.message;
        jsonSyntaxStatus.className = 'syntax-status invalid';
      }
    });

    btnFormatJson.addEventListener('click', () => {
      try {
        const parsed = JSON.parse(jsonEditor.value);
        jsonEditor.value = JSON.stringify(parsed, null, 2);
      } catch (e) {
        alert('Cú pháp JSON chưa hợp lệ để format!');
      }
    });

    btnCopyJson.addEventListener('click', () => {
      navigator.clipboard.writeText(jsonEditor.value);
      alert('Đã copy JSON payload!');
    });

    btnCopyCurl.addEventListener('click', () => {
      navigator.clipboard.writeText(curlDisplay.textContent);
      alert('Đã copy cURL Command!');
    });

    // Execute API Button
    btnExecuteApi.addEventListener('click', executeGenerateIdp);
  }

  // --- POPULATE FORM FROM STATE ---
  function populateFormFromState(updateEditor = true) {
    const { employee_info, competency_benchmark, manager_review } = state.payload;

    empName.value = employee_info.full_name || '';
    empEmail.value = employee_info.fpt_email || '';
    empBranch.value = employee_info.branch || '';
    empPeriod.value = employee_info.evaluation_period || '';

    compGroup.value = competency_benchmark.competency_group || '';
    compName.value = competency_benchmark.competency_name || '';
    compBenchmarkLevel.value = competency_benchmark.benchmark_level || 3;

    mgrEmail.value = manager_review.manager_email || '';
    mgrLevel.value = manager_review.evaluated_level || 1;
    mgrStrengths.value = (manager_review.strengths_keywords || []).join(', ');
    mgrWeaknesses.value = (manager_review.weaknesses_keywords || []).join(', ');
    mgrFeedback.value = manager_review.specific_feedback || '';

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
    const list = state.payload.competency_benchmark.behaviour_indicator || [];
    list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-card-header">
          <span>Chỉ Số Hành Vi #Level ${item.level}</span>
          <button class="btn-remove-item" onclick="removeIndicator(${index})">Xóa</button>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Cấp (Level):</label>
            <input type="number" class="input-text" value="${item.level}" min="1" max="5" onchange="updateIndicatorLevel(${index}, this.value)">
          </div>
          <div class="form-group col-span-2">
            <label>Mô tả (description):</label>
            <textarea class="input-textarea" rows="2" oninput="updateIndicatorDesc(${index}, this.value)">${item.description || ''}</textarea>
          </div>
        </div>
      `;
      indicatorsContainer.appendChild(card);
    });
  }

  function renderSignals() {
    signalsContainer.innerHTML = '';
    const list = state.payload.competency_benchmark.signals || [];
    list.forEach((sig, index) => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-card-header">
          <span>Tín Hiệu Level ${sig.level}</span>
          <button class="btn-remove-item" onclick="removeSignal(${index})">Xóa Level</button>
        </div>
        <div class="form-group mb-2">
          <label>Cấp Tín Hiệu (level):</label>
          <input type="number" class="input-text" value="${sig.level}" min="1" max="5" onchange="updateSignalLevel(${index}, this.value)">
        </div>
        <div class="form-group">
          <label>Các Chỉ Báo (indicators - mỗi dòng 1 ý):</label>
          <textarea class="input-textarea" rows="3" oninput="updateSignalIndicators(${index}, this.value)">${(sig.indicators || []).join('\n')}</textarea>
        </div>
      `;
      signalsContainer.appendChild(card);
    });
  }

  function renderCbiItems() {
    cbiContainer.innerHTML = '';
    const list = state.payload.cbi_agent_data || [];
    list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-card-header">
          <span>CBI Item #${index + 1}</span>
          <button class="btn-remove-item" onclick="removeCbiItem(${index})">Xóa CBI Item</button>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Group ID:</label>
            <input type="text" class="input-text" value="${item.competency_group_id || ''}" oninput="updateCbiField(${index}, 'competency_group_id', this.value)">
          </div>
          <div class="form-group">
            <label>Name ID:</label>
            <input type="text" class="input-text" value="${item.competency_name_id || ''}" oninput="updateCbiField(${index}, 'competency_name_id', this.value)">
          </div>
          <div class="form-group">
            <label>Level:</label>
            <input type="text" class="input-text" value="${item.level || ''}" oninput="updateCbiField(${index}, 'level', this.value)">
          </div>
          <div class="form-group">
            <label>Score (Điểm):</label>
            <input type="text" class="input-text" value="${item.score || ''}" oninput="updateCbiField(${index}, 'score', this.value)">
          </div>
          <div class="form-group col-span-2">
            <label>Tóm Tắt Tín Hiệu (signal_summary):</label>
            <input type="text" class="input-text" value="${item.signal_summary || ''}" oninput="updateCbiField(${index}, 'signal_summary', this.value)">
          </div>
          <div class="form-group col-span-2">
            <label>Chi Tiết Phân Tích (standard_breakdown):</label>
            <input type="text" class="input-text" value="${item.standard_breakdown || ''}" oninput="updateCbiField(${index}, 'standard_breakdown', this.value)">
          </div>
          <div class="form-group col-span-2">
            <label>Nhận Xét (feedback):</label>
            <textarea class="input-textarea" rows="2" oninput="updateCbiField(${index}, 'feedback', this.value)">${item.feedback || ''}</textarea>
          </div>
        </div>
      `;
      cbiContainer.appendChild(card);
    });
  }

  function renderPeerReviews() {
    peerReviewsContainer.innerHTML = '';
    const list = state.payload.peer_reviews || [];
    list.forEach((peer, index) => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-card-header">
          <span>Đồng Nghiệp #${index + 1}: ${peer.peer_email || '(Chưa điền email)'}</span>
          <button class="btn-remove-item" onclick="removePeer(${index})">Xóa Đồng Nghiệp</button>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Peer Email (*):</label>
            <input type="email" class="input-text" value="${peer.peer_email || ''}" oninput="updatePeerField(${index}, 'peer_email', this.value)">
          </div>
          <div class="form-group">
            <label>Mức Đánh Giá (evaluated_level):</label>
            <input type="number" class="input-text" value="${peer.evaluated_level || 2}" min="1" max="5" onchange="updatePeerField(${index}, 'evaluated_level', parseInt(this.value))">
          </div>
          <div class="form-group col-span-2">
            <label>Từ Khóa Điểm Mạnh (cách nhau phẩy):</label>
            <input type="text" class="input-text" value="${(peer.strengths_keywords || []).join(', ')}" oninput="updatePeerKeywords(${index}, 'strengths_keywords', this.value)">
          </div>
          <div class="form-group col-span-2">
            <label>Từ Khóa Điểm Cần Cải Thiện (cách nhau phẩy):</label>
            <input type="text" class="input-text" value="${(peer.weaknesses_keywords || []).join(', ')}" oninput="updatePeerKeywords(${index}, 'weaknesses_keywords', this.value)">
          </div>
          <div class="form-group col-span-2">
            <label>Nhận Xét Cụ Thể (specific_feedback):</label>
            <textarea class="input-textarea" rows="2" oninput="updatePeerField(${index}, 'specific_feedback', this.value)">${peer.specific_feedback || ''}</textarea>
          </div>
        </div>
      `;
      peerReviewsContainer.appendChild(card);
    });
  }

  // --- DYNAMIC ITEM CALLBACKS (EXPOSED TO WINDOW) ---
  window.removeIndicator = (idx) => {
    state.payload.competency_benchmark.behaviour_indicator.splice(idx, 1);
    renderIndicators();
    updateOutputViewers();
  };

  window.updateIndicatorLevel = (idx, val) => {
    state.payload.competency_benchmark.behaviour_indicator[idx].level = parseInt(val) || 1;
    updateOutputViewers();
  };

  window.updateIndicatorDesc = (idx, val) => {
    state.payload.competency_benchmark.behaviour_indicator[idx].description = val;
    updateOutputViewers();
  };

  window.removeSignal = (idx) => {
    state.payload.competency_benchmark.signals.splice(idx, 1);
    renderSignals();
    updateOutputViewers();
  };

  window.updateSignalLevel = (idx, val) => {
    state.payload.competency_benchmark.signals[idx].level = parseInt(val) || 1;
    updateOutputViewers();
  };

  window.updateSignalIndicators = (idx, val) => {
    state.payload.competency_benchmark.signals[idx].indicators = val.split('\n').filter(s => s.trim().length > 0);
    updateOutputViewers();
  };

  window.removeCbiItem = (idx) => {
    state.payload.cbi_agent_data.splice(idx, 1);
    renderCbiItems();
    updateOutputViewers();
  };

  window.updateCbiField = (idx, field, val) => {
    state.payload.cbi_agent_data[idx][field] = val;
    updateOutputViewers();
  };

  window.removePeer = (idx) => {
    state.payload.peer_reviews.splice(idx, 1);
    renderPeerReviews();
    updateOutputViewers();
  };

  window.updatePeerField = (idx, field, val) => {
    state.payload.peer_reviews[idx][field] = val;
    updateOutputViewers();
  };

  window.updatePeerKeywords = (idx, field, val) => {
    state.payload.peer_reviews[idx][field] = val.split(',').map(s => s.trim()).filter(Boolean);
    updateOutputViewers();
  };

  // --- OUTPUT VIEWERS UPDATE ---
  function updateOutputViewers() {
    jsonEditor.value = JSON.stringify(state.payload, null, 2);
    renderCurlCommand();
  }

  function renderCurlCommand() {
    const domain = state.environment === 'CUSTOM' ? (state.customDomain || 'http://localhost:3000') : (state.environment === 'STAG' ? 'http://botftel-api-stag.fpt.net' : 'http://botftel-api.fpt.net');
    const token = bearerTokenInput.value.trim() || 'test';
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
    const secret = clientSecretInput.value.trim();
    if (!secret) {
      alert('Vui lòng nhập Client Secret!');
      return;
    }

    btnFetchToken.disabled = true;
    btnFetchToken.textContent = 'Đang lấy Token...';

    try {
      const res = await fetch('/api/proxy/get_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          environment: state.environment,
          client_secret: secret,
          custom_domain: state.customDomain
        })
      });

      const result = await res.json();
      btnFetchToken.disabled = false;
      btnFetchToken.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg> Lấy Token Ngay';

      if (result.success && result.data) {
        const token = result.data.access_token || result.data.token || JSON.stringify(result.data);
        bearerTokenInput.value = token;
        state.token = token;
        document.getElementById('tokenExpiryText').textContent = 'Mới cập nhật lúc: ' + new Date().toLocaleTimeString();
        updateOutputViewers();
        alert('Lấy Token thành công!');
      } else {
        alert(`Không lấy được token. Lỗi: ${result.message || result.error || 'Unknown'}`);
      }
    } catch (err) {
      btnFetchToken.disabled = false;
      btnFetchToken.textContent = 'Lấy Token Ngay';
      alert('Lỗi kết nối Server Proxy: ' + err.message);
    }
  }

  // --- EXECUTE GENERATE IDP API ---
  async function executeGenerateIdp() {
    resLoader.classList.remove('hidden');
    resStatusBadge.textContent = 'Sending...';
    resStatusBadge.className = 'badge badge-neutral';
    resLatency.textContent = '-- ms';

    const token = bearerTokenInput.value.trim() || 'test';

    try {
      const startTime = Date.now();
      const res = await fetch('/api/proxy/generate_idp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          environment: state.environment,
          token: token,
          payload: state.payload,
          custom_domain: state.customDomain
        })
      });

      const latency = Date.now() - startTime;
      resLoader.classList.add('hidden');
      resLatency.textContent = `${latency} ms`;

      const result = await res.json();

      if (res.ok && result.success) {
        resStatusBadge.textContent = `200 OK`;
        resStatusBadge.className = 'badge badge-success';
        responseDisplay.textContent = JSON.stringify(result.data, null, 2);
      } else {
        resStatusBadge.textContent = `${result.statusCode || 500} Error`;
        resStatusBadge.className = 'badge badge-danger';
        responseDisplay.textContent = JSON.stringify(result, null, 2);
      }
    } catch (err) {
      resLoader.classList.add('hidden');
      resStatusBadge.textContent = 'Fetch Failed';
      resStatusBadge.className = 'badge badge-danger';
      responseDisplay.textContent = JSON.stringify({
        error: err.message,
        hint: "Không kết nối được tới Proxy Server local (Port 3000)."
      }, null, 2);
    }
  }

  // --- TOGGLE EXPAND RESPONSE INSPECTOR ---
  const responseInspector = document.getElementById('responseInspector');
  const btnToggleExpandResponse = document.getElementById('btnToggleExpandResponse');
  const btnExportExcel = document.getElementById('btnExportExcel');

  if (btnToggleExpandResponse && responseInspector) {
    btnToggleExpandResponse.addEventListener('click', () => {
      responseInspector.classList.toggle('expanded');
      const isExpanded = responseInspector.classList.contains('expanded');
      btnToggleExpandResponse.textContent = isExpanded ? '🗗 Thu Nhỏ Vùng Kết Quả' : '↕ Phóng To / Thu Nhỏ';
    });
  }

  if (btnExportExcel) {
    btnExportExcel.addEventListener('click', exportToExcel);
  }

  // --- EXPORT TO EXCEL (1 SINGLE SHEET FULL DATA) ---
  function exportToExcel() {
    if (typeof XLSX === 'undefined') {
      alert('Đang tải thư viện XLSX... Vui lòng thử lại sau giây lát.');
      return;
    }

    try {
      const wb = XLSX.utils.book_new();
      const rows = [];

      // HEADER BANNER
      rows.push(["BÁO CÁO KẾT QUẢ ĐÁNH GIÁ IP PROJECT -> GENERATE IDP"]);
      rows.push(["Thời gian xuất báo cáo: " + new Date().toLocaleString()]);
      rows.push([]);

      // SECTION 1: THÔNG TIN NHÂN VIÊN
      rows.push(["=== 1. THÔNG TIN NHÂN VIÊN (EMPLOYEE INFO) ==="]);
      rows.push(["Họ và Tên:", state.payload.employee_info.full_name || '']);
      rows.push(["FPT Email:", state.payload.employee_info.fpt_email || '']);
      rows.push(["Chi Nhánh / Đơn Vị:", state.payload.employee_info.branch || '']);
      rows.push(["Kỳ Đánh Giá:", state.payload.employee_info.evaluation_period || '']);
      rows.push([]);

      // SECTION 2: KHUNG NĂNG LỰC BENCHMARK
      rows.push(["=== 2. KHUNG NĂNG LỰC BENCHMARK (COMPETENCY BENCHMARK) ==="]);
      rows.push(["Nhóm Năng Lực:", state.payload.competency_benchmark.competency_group || '']);
      rows.push(["Tên Năng Lực:", state.payload.competency_benchmark.competency_name || '']);
      rows.push(["Benchmark Level:", state.payload.competency_benchmark.benchmark_level || 1]);
      rows.push([]);

      // SECTION 3: CHỈ SỐ HÀNH VI
      rows.push(["=== 3. CHỈ SỐ HÀNH VI (BEHAVIOUR INDICATORS) ==="]);
      rows.push(["Cấp (Level)", "Mô Tả Chỉ Số Hành Vi"]);
      (state.payload.competency_benchmark.behaviour_indicator || []).forEach(ind => {
        rows.push([`Level ${ind.level}`, ind.description || '']);
      });
      rows.push([]);

      // SECTION 4: TÍN HIỆU ĐÁNH GIÁ
      rows.push(["=== 4. TÍN HIỆU ĐÁNH GIÁ (SIGNALS) ==="]);
      rows.push(["Cấp (Level)", "Các Chỉ Báo / Signals"]);
      (state.payload.competency_benchmark.signals || []).forEach(sig => {
        rows.push([`Level ${sig.level}`, (sig.indicators || []).join('\n')]);
      });
      rows.push([]);

      // SECTION 5: DỮ LIỆU CBI AGENT
      rows.push(["=== 5. DỮ LIỆU CBI AGENT (CBI AGENT DATA) ==="]);
      rows.push(["Group ID", "Name ID", "Level", "Score", "Tóm Tắt Tín Hiệu", "Phân Tích Chi Tiết", "Phản Hồi / Feedback"]);
      (state.payload.cbi_agent_data || []).forEach(cbi => {
        rows.push([
          cbi.competency_group_id || '',
          cbi.competency_name_id || '',
          cbi.level || '',
          cbi.score || '',
          cbi.signal_summary || '',
          cbi.standard_breakdown || '',
          cbi.feedback || ''
        ]);
      });
      rows.push([]);

      // SECTION 6: ĐÁNH GIÁ QUẢN LÝ & ĐỒNG NGHIỆP
      rows.push(["=== 6. ĐÁNH GIÁ QUẢN LÝ & ĐỒNG NGHIỆP (REVIEWS) ==="]);
      rows.push(["Loại Đánh Giá", "Email", "Mức Đánh Giá", "Từ Khóa Điểm Mạnh", "Từ Khóa Điểm Cần Cải Thiện", "Ý Kiến Phản Hồi Cụ Thể"]);
      
      const mgr = state.payload.manager_review;
      rows.push([
        "Quản Lý (Manager)",
        mgr.manager_email || '',
        mgr.evaluated_level || 1,
        (mgr.strengths_keywords || []).join(', '),
        (mgr.weaknesses_keywords || []).join(', '),
        mgr.specific_feedback || ''
      ]);

      (state.payload.peer_reviews || []).forEach((peer, idx) => {
        rows.push([
          `Đồng Nghiệp #${idx + 1}`,
          peer.peer_email || '',
          peer.evaluated_level || 1,
          (peer.strengths_keywords || []).join(', '),
          (peer.weaknesses_keywords || []).join(', '),
          peer.specific_feedback || ''
        ]);
      });
      rows.push([]);

      // SECTION 7: KẾT QUẢ PHẢN HỒI AI GENERATE IDP
      rows.push(["=== 7. KẾT QUẢ PHẢN HỒI THỰC TẾ TỪ API GENERATE IDP (RESPONSE INSPECTOR) ==="]);
      const status = document.getElementById('resStatusBadge')?.textContent || 'N/A';
      const latency = document.getElementById('resLatency')?.textContent || 'N/A';
      const responseText = document.getElementById('responseDisplay')?.textContent || '';
      
      rows.push(["Trạng Thái API:", status]);
      rows.push(["Độ Trễ Latency:", latency]);
      rows.push(["Chi Tiết Phản Hồi AI IDP:", responseText]);

      // BUILD WORKSHEET & APPEND TO WORKBOOK (1 SINGLE SHEET)
      const ws = XLSX.utils.aoa_to_sheet(rows);

      // Auto Column Widths
      ws['!cols'] = [
        { wch: 30 },
        { wch: 30 },
        { wch: 15 },
        { wch: 25 },
        { wch: 35 },
        { wch: 40 },
        { wch: 45 }
      ];

      XLSX.utils.book_append_sheet(wb, ws, "BÁO_CÁO_IDP_TỔNG_HỢP");

      const filename = `Bao_Cao_IDP_Tong_Hop_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(wb, filename);
      alert(`Đã xuất file Excel tổng hợp 1 Sheet thành công: ${filename}`);
    } catch (err) {
      alert('Lỗi xuất Excel: ' + err.message);
    }
  }

  // --- DOWNLOAD EXCEL TEMPLATE (HUMAN BUSINESS ENTERPRISE STANDARD) ---
  function downloadExcelTemplate() {
    if (typeof XLSX === 'undefined') {
      alert('Đang tải thư viện XLSX... Vui lòng thử lại sau giây lát.');
      return;
    }

    try {
      const wb = XLSX.utils.book_new();

      // Sheet 1: CBI & Thông tin chung (Dạng Bảng Doanh Nghiệp Chuyên Nghiệp)
      const cbiHeaders = [
        "Họ và tên nhân viên",
        "Email FPT",
        "Chi nhánh",
        "Kỳ đánh giá",
        "Nhóm năng lực",
        "Tên năng lực",
        "Level Benchmark",
        "Chỉ số hành vi (Indicators)",
        "Tín hiệu đánh giá (Signals)",
        "Group ID CBI",
        "Name ID CBI",
        "Level CBI",
        "Điểm số CBI",
        "Tóm tắt tín hiệu",
        "Phân tích chi tiết",
        "Phản hồi CBI"
      ];

      const cbiRow1 = [
        "Phạm Hồng Diệp",
        "DiepPH4@fpt.com",
        "AGG",
        "Tháng 4/2026",
        "GIÁ TRỊ CỐT LÕI",
        "Duy trì và lan tỏa giá trị văn hóa FPT",
        3,
        "Level 1: Hiểu về các giá trị cốt lõi và có áp dụng trong quá trình quản trị phòng ban.\nLevel 2: Luôn thể hiện việc tuân thủ tốt các giá trị cốt lõi trong quá trình quản trị phòng ban.\nLevel 3: Có phương pháp để đảm bảo đội ngũ nhân viên của mình luôn ghi nhớ, tuân thủ và phát huy tối đa các giá trị cốt lõi trong công việc.",
        "Level 1: Đề cập đến các khái niệm, độ hiểu biết về văn hóa/giá trị cốt lõi FPT, Đề cập việc áp dụng cá nhân, Đề cập việc áp dụng đội nhóm\nLevel 2: Tuân thủ và duy trì việc ứng dụng giá trị cốt lõi trong công việc, Mentor hướng dẫn đội ngũ, Duy trì môi trường làm việc\nLevel 3: Ứng dụng giá trị cốt lõi vào công tác quản lý, Theo dõi đánh giá, Đề xuất cải tiến",
        "1",
        "1",
        "1",
        "2/10",
        "2/10 Level 1 Đề cập đến các khái niệm, độ hiểu biết về văn hóa/giá trị cốt lõi FPT",
        "Ứng viên đạt Level 1 với 2 signals đã khớp.",
        "Điểm tốt: Hiểu biết về văn hóa/giá trị cốt lõi FPT. Điểm cần cải thiện: Chưa có quy trình theo dõi cụ thể."
      ];

      const cbiRow2 = [
        "Nguyễn Văn A",
        "Anv@fpt.com",
        "FTELAU",
        "T7/2026",
        "Giá trị cốt lõi",
        "Kỷ luật và thực thi nhiệm vụ",
        3,
        "Level 1: Sẵn sàng nhận mọi nhiệm vụ, tuân thủ nguyên tắc \"6 rõ\", tập trung thực thi và báo cáo kịp thời.\nLevel 2: Tự giải quyết trở ngại phát sinh, đồng thời tích cực phối hợp với cá nhân, đơn vị liên quan.\nLevel 3: Chủ động nhận nhiệm vụ khó, huấn luyện đội ngũ về tư duy chịu trách nhiệm đến cùng.",
        "Level 1: Đề cập đến việc nhận ít nhất một nhiệm vụ cụ thể\nLevel 2: Tự mình tìm cách giải quyết trở ngại\nLevel 3: Xung phong nhận nhiệm vụ khó",
        "1",
        "1",
        "2",
        "5/10",
        "5/10 Đạt Level 2.",
        "Ứng viên đạt chỉ số hành vi Level 2.",
        "Điểm tốt: Kỷ luật cao. Điểm cần cải thiện: Cần chủ động đề xuất giải pháp sáng tạo hơn."
      ];

      const ws1 = XLSX.utils.aoa_to_sheet([cbiHeaders, cbiRow1, cbiRow2]);
      ws1['!cols'] = [
        { wch: 22 }, { wch: 20 }, { wch: 12 }, { wch: 15 },
        { wch: 20 }, { wch: 35 }, { wch: 15 }, { wch: 45 },
        { wch: 45 }, { wch: 12 }, { wch: 12 }, { wch: 10 },
        { wch: 12 }, { wch: 35 }, { wch: 35 }, { wch: 35 }
      ];
      XLSX.utils.book_append_sheet(wb, ws1, "CBI_Thông_tin_năng_lực");

      // Sheet 2: 360_cấp trên (Manager Reviews)
      const mgrHeaders = [
        "Dấu thời gian",
        "Email Quản lý đánh giá",
        "Email FPT Quản lý",
        "Chi nhánh",
        "Kỳ đánh giá",
        "Email Nhân sự được đánh giá",
        "Mức đánh giá (Level 1-5)",
        "Điểm mạnh (Keywords cách nhau phẩy)",
        "Nhận xét / Phản hồi chi tiết"
      ];
      const mgrRow1 = [
        "2026-07-30 20:30:04",
        "KhiemPD@fpt.com",
        "KhiemPD@fpt.com",
        "AGG",
        "Tháng 4/2026",
        "DiepPH4@fpt.com",
        2,
        "Tôn trọng, Đổi mới, Đồng đội, Chí công, Gương mẫu, Sáng suốt",
        "Hoàn thành tốt công tác quản lý phòng ban."
      ];
      const mgrRow2 = [
        "2026-08-01 16:46:16",
        "Manager@fpt.com",
        "Manager@fpt.com",
        "FTELAU",
        "T7/2026",
        "Anv@fpt.com",
        3,
        "Kỷ luật, Chịu trách nhiệm, Giao tiếp tốt",
        "Thực hiện xuất sắc chỉ tiêu công việc."
      ];
      const ws2 = XLSX.utils.aoa_to_sheet([mgrHeaders, mgrRow1, mgrRow2]);
      ws2['!cols'] = [{ wch: 20 }, { wch: 22 }, { wch: 22 }, { wch: 12 }, { wch: 15 }, { wch: 25 }, { wch: 12 }, { wch: 45 }, { wch: 40 }];
      XLSX.utils.book_append_sheet(wb, ws2, "360_cấp trên");

      // Sheet 3: 360_cấp dưới (Peer Reviews)
      const peerHeaders = [
        "Dấu thời gian",
        "Email Đồng nghiệp đánh giá",
        "Email FPT Đồng nghiệp",
        "Chi nhánh",
        "Kỳ đánh giá",
        "Email Nhân sự được đánh giá",
        "Mức đánh giá (Level 1-5)",
        "Điểm mạnh (Keywords cách nhau phẩy)",
        "Nhận xét / Phản hồi chi tiết"
      ];
      const peerRow1 = [
        "2026-07-28 17:39:30",
        "VietDQ14@fpt.com",
        "VietDQ14@fpt.com",
        "AGG",
        "Tháng 4/2026",
        "DiepPH4@fpt.com",
        2,
        "Tôn trọng, Đổi mới, Đồng đội, Chí công, Gương mẫu",
        "Phối hợp làm việc nhóm rất hiệu quả."
      ];
      const peerRow2 = [
        "2026-07-28 18:30:26",
        "KhangLM6@fpt.com",
        "KhangLM6@fpt.com",
        "AGG",
        "Tháng 4/2026",
        "DiepPH4@fpt.com",
        2,
        "Tôn trọng, Đổi mới, Đồng đội",
        "Hỗ trợ các thành viên trong đội nhóm nhiệt tình."
      ];
      const peerRow3 = [
        "2026-07-28 18:30:26",
        "Peer1@fpt.com",
        "Peer1@fpt.com",
        "FTELAU",
        "T7/2026",
        "Anv@fpt.com",
        3,
        "Nhiệt tình, Trách nhiệm",
        "Làm việc nhóm rất tốt."
      ];
      const ws3 = XLSX.utils.aoa_to_sheet([peerHeaders, peerRow1, peerRow2, peerRow3]);
      ws3['!cols'] = [{ wch: 20 }, { wch: 22 }, { wch: 22 }, { wch: 12 }, { wch: 15 }, { wch: 25 }, { wch: 12 }, { wch: 45 }, { wch: 40 }];
      XLSX.utils.book_append_sheet(wb, ws3, "360_cấp dưới");

      const filename = `DNB_IDP_Mau_Chuan_Doanh_Nghiep.xlsx`;
      XLSX.writeFile(wb, filename);
    } catch (err) {
      alert('Lỗi khi tải file Excel mẫu: ' + err.message);
    }
  }

  // --- IMPORT FROM EXCEL FILE (HUMAN BUSINESS & MULTI-SHEET PARSER) ---
  function handleExcelImport(file) {
    if (typeof XLSX === 'undefined') {
      alert('Đang tải thư viện đọc file Excel... Vui lòng thử lại sau giây lát.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const candidateMap = {};

        // Helper to get or init candidate payload
        function getCandidate(email, name = '') {
          const key = (email || 'default@fpt.com').toLowerCase().trim();
          if (!candidateMap[key]) {
            candidateMap[key] = {
              employee_info: {
                full_name: name || key.split('@')[0].toUpperCase(),
                fpt_email: key,
                branch: "AGG",
                evaluation_period: "Tháng 4/2026"
              },
              competency_benchmark: {
                competency_group: "GIÁ TRỊ CỐT LÕI",
                competency_name: "Duy trì và lan tỏa giá trị văn hóa FPT",
                benchmark_level: 3,
                behaviour_indicator: [
                  { level: 1, description: "Hiểu về các giá trị cốt lõi và áp dụng trong quản trị." },
                  { level: 2, description: "Tuân thủ tốt các giá trị cốt lõi." },
                  { level: 3, description: "Có phương pháp để đội ngũ phát huy giá trị cốt lõi." }
                ],
                signals: [
                  { level: 1, indicators: ["Hiểu biết văn hóa/giá trị cốt lõi FPT", "Áp dụng cá nhân", "Áp dụng đội nhóm"] },
                  { level: 2, indicators: ["Tuân thủ duy trì ứng dụng", "Mentor hướng dẫn đội ngũ"] },
                  { level: 3, indicators: ["Ứng dụng giá trị cốt lõi vào quản lý", "Theo dõi đánh giá"] }
                ]
              },
              cbi_agent_data: [
                {
                  competency_group_id: "1",
                  competency_name_id: "1",
                  level: "1",
                  score: "2/10",
                  signal_summary: "2/10 Level 1 Đề cập đến các khái niệm",
                  standard_breakdown: "Ứng viên đạt Level 1.",
                  feedback: "Điểm tốt: Hiểu biết văn hóa. Điểm cần cải thiện: Chưa có quy trình cụ thể."
                }
              ],
              manager_review: {
                manager_email: "KhiemPD@fpt.com",
                evaluated_level: 2,
                strengths_keywords: ["Tôn trọng", "Đổi mới", "Đồng đội"],
                weaknesses_keywords: [],
                specific_feedback: "Hoàn thành tốt nhiệm vụ."
              },
              peer_reviews: []
            };
          }
          return candidateMap[key];
        }

        // 1. Read Sheet 1: CBI / Thông tin chung
        const sheetCbiName = workbook.SheetNames.find(s => s.toLowerCase().includes('cbi') || s.toLowerCase().includes('thông tin') || s.toLowerCase().includes('general')) || workbook.SheetNames[0];
        if (sheetCbiName && workbook.Sheets[sheetCbiName]) {
          const ws = workbook.Sheets[sheetCbiName];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

          if (rows.length > 0) {
            const firstRowStr = String(rows[0][0] || '').toLowerCase();

            // Format A: Tabular Enterprise Business Format (Headers on Row 0)
            if (firstRowStr.includes('họ và tên') || firstRowStr.includes('email') || firstRowStr.includes('tên nhân viên')) {
              const headers = rows[0].map(h => String(h || '').toLowerCase().trim());

              const findCol = (terms) => headers.findIndex(h => terms.some(t => h.includes(t)));

              const colName = findCol(['họ và tên', 'tên nhân viên', 'full_name']);
              const colEmail = findCol(['email fpt', 'email', 'fpt_email']);
              const colBranch = findCol(['chi nhánh', 'branch']);
              const colPeriod = findCol(['kỳ đánh giá', 'period']);
              const colGroup = findCol(['nhóm năng lực', 'competency_group']);
              const colCompName = findCol(['tên năng lực', 'competency_name']);
              const colLevel = findCol(['level benchmark', 'benchmark_level']);
              const colInd = findCol(['chỉ số hành vi', 'behaviour_indicator']);
              const colSig = findCol(['tín hiệu', 'signals']);
              const colCbiGroupId = findCol(['group id']);
              const colCbiNameId = findCol(['name id']);
              const colCbiLevel = findCol(['level cbi']);
              const colCbiScore = findCol(['điểm số cbi', 'score']);
              const colCbiSummary = findCol(['tóm tắt tín hiệu', 'signal_summary']);
              const colCbiBreakdown = findCol(['phân tích chi tiết', 'standard_breakdown']);
              const colCbiFeedback = findCol(['phản hồi cbi', 'feedback']);

              for (let r = 1; r < rows.length; r++) {
                const row = rows[r];
                if (!row || !row.length) continue;
                const email = colEmail >= 0 ? String(row[colEmail] || '').trim() : '';
                const name = colName >= 0 ? String(row[colName] || '').trim() : '';
                if (!email && !name) continue;

                const cand = getCandidate(email || name, name);
                if (colName >= 0 && row[colName]) cand.employee_info.full_name = String(row[colName]).trim();
                if (colEmail >= 0 && row[colEmail]) cand.employee_info.fpt_email = String(row[colEmail]).trim();
                if (colBranch >= 0 && row[colBranch]) cand.employee_info.branch = String(row[colBranch]).trim();
                if (colPeriod >= 0 && row[colPeriod]) cand.employee_info.evaluation_period = String(row[colPeriod]).trim();

                if (colGroup >= 0 && row[colGroup]) cand.competency_benchmark.competency_group = String(row[colGroup]).trim();
                if (colCompName >= 0 && row[colCompName]) cand.competency_benchmark.competency_name = String(row[colCompName]).trim();
                if (colLevel >= 0 && row[colLevel]) cand.competency_benchmark.benchmark_level = parseInt(row[colLevel]) || 3;

                if (colInd >= 0 && row[colInd]) {
                  const lines = String(row[colInd]).split('\n');
                  cand.competency_benchmark.behaviour_indicator = [];
                  lines.forEach(line => {
                    const match = line.match(/Level\s*(\d+)[\t\s:]+(.*)/i);
                    if (match) {
                      cand.competency_benchmark.behaviour_indicator.push({ level: parseInt(match[1]) || 1, description: match[2].trim() });
                    }
                  });
                }

                if (colSig >= 0 && row[colSig]) {
                  const blocks = String(row[colSig]).split(/Level\s*(\d+)[\s:]*/i);
                  cand.competency_benchmark.signals = [];
                  for (let i = 1; i < blocks.length; i += 2) {
                    cand.competency_benchmark.signals.push({
                      level: parseInt(blocks[i]) || 1,
                      indicators: (blocks[i + 1] || '').split('\n').map(x => x.replace(/^-\s*/, '').trim()).filter(Boolean)
                    });
                  }
                }

                if (colCbiScore >= 0 || colCbiFeedback >= 0) {
                  cand.cbi_agent_data[0] = {
                    competency_group_id: colCbiGroupId >= 0 ? String(row[colCbiGroupId] || '1') : "1",
                    competency_name_id: colCbiNameId >= 0 ? String(row[colCbiNameId] || '1') : "1",
                    level: colCbiLevel >= 0 ? String(row[colCbiLevel] || '1') : "1",
                    score: colCbiScore >= 0 ? String(row[colCbiScore] || '') : '',
                    signal_summary: colCbiSummary >= 0 ? String(row[colCbiSummary] || '') : '',
                    standard_breakdown: colCbiBreakdown >= 0 ? String(row[colCbiBreakdown] || '') : '',
                    feedback: colCbiFeedback >= 0 ? String(row[colCbiFeedback] || '') : ''
                  };
                }
              }
            } else {
              // Format B: Key-Value Technical Fallback Layout
              const basePayload = getCandidate('default@fpt.com');
              rows.forEach(row => {
                if (!row || row.length < 2) return;
                const k = String(row[0] || '').trim();
                const v = row[1] !== undefined && row[1] !== null ? String(row[1]).trim() : '';

                if (k.startsWith('employee_info.')) {
                  basePayload.employee_info[k.replace('employee_info.', '')] = v;
                } else if (k.startsWith('competency_benchmark.')) {
                  const field = k.replace('competency_benchmark.', '');
                  if (field === 'benchmark_level') basePayload.competency_benchmark.benchmark_level = parseInt(v) || 1;
                  else if (field === 'behaviour_indicator' && v) {
                    basePayload.competency_benchmark.behaviour_indicator = [];
                    v.split('\n').forEach(line => {
                      const match = line.match(/Level\s*(\d+)[\t\s:]+(.*)/i);
                      if (match) basePayload.competency_benchmark.behaviour_indicator.push({ level: parseInt(match[1]) || 1, description: match[2].trim() });
                    });
                  } else if (field === 'signals' && v) {
                    basePayload.competency_benchmark.signals = [];
                    const blocks = v.split(/Level\s*(\d+)[\s:]*/i);
                    for (let i = 1; i < blocks.length; i += 2) {
                      basePayload.competency_benchmark.signals.push({
                        level: parseInt(blocks[i]) || 1,
                        indicators: (blocks[i + 1] || '').split('\n').map(x => x.replace(/^-\s*/, '').trim()).filter(Boolean)
                      });
                    }
                  } else basePayload.competency_benchmark[field] = v;
                } else if (k.startsWith('cbi_agent_data.')) {
                  basePayload.cbi_agent_data[0][k.replace('cbi_agent_data.', '')] = v;
                } else if (k.startsWith('manager_review.')) {
                  const field = k.replace('manager_review.', '');
                  if (field === 'evaluated_level') basePayload.manager_review.evaluated_level = parseInt(v) || 1;
                  else if (field.includes('keywords')) basePayload.manager_review[field] = v.split(',').map(x => x.trim()).filter(Boolean);
                  else basePayload.manager_review[field] = v;
                } else if (k.startsWith('peer_reviews.')) {
                  const field = k.replace('peer_reviews.', '');
                  if (field === 'evaluated_level') basePayload.peer_reviews[0].evaluated_level = parseInt(v) || 1;
                  else if (field.includes('keywords')) basePayload.peer_reviews[0][field] = v.split(',').map(x => x.trim()).filter(Boolean);
                  else basePayload.peer_reviews[0][field] = v;
                }
              });
            }
          }
        }

        // 2. Read Sheet 2: 360_cấp trên (Manager Reviews)
        const sheetMgrName = workbook.SheetNames.find(s => s.toLowerCase().includes('360_cấp trên') || s.toLowerCase().includes('cấp trên'));
        if (sheetMgrName && workbook.Sheets[sheetMgrName]) {
          const mgrRows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetMgrName], { header: 1 });
          for (let r = 1; r < mgrRows.length; r++) {
            const row = mgrRows[r];
            if (!row || row.length < 6) continue;
            const targetEmail = String(row[5] || '').trim();
            const mgrEmail = String(row[2] || row[1] || '').trim();
            const level = parseInt(row[6]) || 1;
            const strengths = String(row[7] || '').split(',').map(s => s.trim()).filter(Boolean);
            const feedback = String(row[8] || '').trim();
            if (targetEmail) {
              const cand = getCandidate(targetEmail);
              cand.manager_review = {
                manager_email: mgrEmail,
                evaluated_level: level,
                strengths_keywords: strengths,
                weaknesses_keywords: [],
                specific_feedback: feedback
              };
            }
          }
        }

        // 3. Read Sheet 3: 360_cấp dưới (Peer Reviews)
        const sheetPeerName = workbook.SheetNames.find(s => s.toLowerCase().includes('360_cấp dưới') || s.toLowerCase().includes('cấp dưới'));
        if (sheetPeerName && workbook.Sheets[sheetPeerName]) {
          const peerRows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetPeerName], { header: 1 });
          for (let r = 1; r < peerRows.length; r++) {
            const row = peerRows[r];
            if (!row || row.length < 6) continue;
            const targetEmail = String(row[5] || '').trim();
            const peerEmail = String(row[2] || row[1] || '').trim();
            const level = parseInt(row[6]) || 1;
            const strengths = String(row[7] || '').split(',').map(s => s.trim()).filter(Boolean);
            const feedback = String(row[8] || '').trim();
            if (targetEmail) {
              const cand = getCandidate(targetEmail);
              if (!Array.isArray(cand.peer_reviews)) cand.peer_reviews = [];
              cand.peer_reviews.push({
                peer_email: peerEmail,
                evaluated_level: level,
                strengths_keywords: strengths,
                weaknesses_keywords: [],
                specific_feedback: feedback
              });
            }
          }
        }

        state.excelParsedCandidates = candidateMap;

        // Populate Candidate Selector
        const emails = Object.keys(candidateMap);
        candidateSelect.innerHTML = '';
        emails.forEach(email => {
          const emp = candidateMap[email];
          const name = emp.employee_info.full_name || email;
          const opt = document.createElement('option');
          opt.value = email;
          opt.textContent = `${name} (${email})`;
          candidateSelect.appendChild(opt);
        });

        if (emails.length > 1) {
          candidateSelectGroup.classList.remove('hidden');
        } else {
          candidateSelectGroup.classList.add('hidden');
        }

        // Active selected candidate
        const firstEmail = emails[0];
        state.payload = JSON.parse(JSON.stringify(candidateMap[firstEmail]));
        populateFormFromState();
        updateOutputViewers();

        alert(`✓ Đã nhập dữ liệu thành công từ file Excel "${file.name}"!\nHệ thống tìm thấy ${emails.length} nhân sự được đánh giá.`);
      } catch (err) {
        alert('Lỗi đọc dữ liệu tệp Excel: ' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  }
});
