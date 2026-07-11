/**
 * ============================================================================
 * CONTENT INJECTION MODULE - ORIGINAL SOURCE DIRECT PORT
 * ============================================================================
 */

(function () {
    'use strict';
    
    if (window.location.hostname.includes('kiemgao.site')) return;

    // Hàm tạo dấu vân tay ID phần cứng từ hệ thống máy tính/điện thoại thực tế
    function getHardwareFingerprint() {
        const matrix = [
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            new Date().getTimezoneOffset(),
            navigator.hardwareConcurrency || 'unknown',
            navigator.platform,
            navigator.language
        ].join('|');
        let hash = 0;
        for (let i = 0; i < matrix.length; i++) {
            hash = ((hash << 5) - hash) + matrix.charCodeAt(i);
            hash = hash & hash;
        }
        const hex = Math.abs(hash).toString(16).toUpperCase();
        return { id: `DEV-${hex.substring(0, 8)}`, hash: hex };
    }

    function extractCurrentTaskCode() {
        const segments = window.location.pathname.split('/').filter(Boolean);
        if (segments.length > 0) {
            let lastSegment = segments[segments.length - 1].replace(/\.html$/i, '');
            return window.location.hostname.includes('totreview.com') ? `totreview-${lastSegment}` : lastSegment;
        }
        return null;
    }

    function mainPipelineInitiation() {
        const devInfo = getHardwareFingerprint();
        const taskCode = extractCurrentTaskCode();

        // PHẦN A: KIỂM TRA KHUNG GIỜ HOẠT ĐỘNG TRONG NGÀY
        chrome.runtime.sendMessage({ action: "verify_time_window" }, (timeData) => {
            if (timeData && !timeData.allowed) {
                document.documentElement.innerHTML = `
                    <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0d0d14;color:#facc15;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2147483647;font-family:sans-serif;padding:20px;text-align:center;">
                        <h1 style="font-size:40px;margin-bottom:15px;">⏳ HỆ THỐNG ĐANG TẠM ĐÓNG CỬA</h1>
                        <p style="font-size:16px;color:#94a3b8;">Hệ thống hiện tại nằm ngoài khung giờ làm việc quy định.</p>
                    </div>
                `;
                return;
            }

            // PHẦN B: ĐỌC BỘ NHỚ LƯU TRỮ CHUYÊN DỤNG CỦA EXTENSION XEM ĐÃ CẤU HÌNH CỔNG CHƯA
            chrome.storage.local.get(['gateway_url'], function(storageRes) {
                const currentGateway = storageRes.gateway_url || '';

                if (!currentGateway || currentGateway.length === 0) {
                    // Nếu trống bộ nhớ, bắt buộc ép dựng màn hình mờ full màn hình chọn cổng
                    deployForcedSelectionOverlay(devInfo);
                    return;
                }

                // PHẦN C: NẾU ĐÃ CÓ CẤU HÌNH -> TIẾN HÀNH XÁC THỰC AN TOÀN BLACKLIST VỚI CLOUD
                chrome.runtime.sendMessage({
                    action: "enforce_security_matrix",
                    deviceInfo: devInfo,
                    currentTask: taskCode
                }, (response) => {
                    if (response && response.status === "banned") {
                        document.documentElement.innerHTML = `
                            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#05050a;color:#ef4444;display:flex;align-items:center;justify-content:center;z-index:2147483647;font-family:sans-serif;">
                                <h1>🚫 PERMANENT HARDWARE BAN ENFORCED</h1>
                            </div>
                        `;
                    }
                });
            });
        });
    }

    // DỰNG MODAL CHỌN CỔNG TOÀN MÀN HÌNH THEO ĐÚNG LOGIC USERSCRIPT GỐC
    function deployForcedSelectionOverlay(devInfo) {
        if (document.getElementById('lux-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'lux-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(10, 10, 20, 0.98), rgba(20, 20, 40, 0.98)); display: flex; align-items: center; justify-content: center; z-index: 2147483649; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; backdrop-filter: blur(20px);';
        
        overlay.innerHTML = `
          <div style="background: linear-gradient(145deg, rgba(30, 30, 50, 0.95), rgba(20, 20, 35, 0.98)); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 24px; padding: 40px; text-align: center; box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(168, 85, 247, 0.2); max-width: 420px; width: 90%; animation: modalSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);">
            <style>
              @keyframes modalSlideIn {
                from { opacity: 0; transform: translateY(-20px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
              }
              @keyframes iconFloat {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-10px) rotate(5deg); }
              }
              @keyframes pulseGlow {
                0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
                50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.6); }
              }
              .gateway-btn {
                position: relative;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .gateway-btn::before {
                content: '';
                position: absolute;
                top: 0; left: -100%;
                width: 100%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                transition: left 0.5s;
              }
              .gateway-btn:hover::before {
                left: 100%;
              }
            </style>
            <div style="font-size: 56px; margin-bottom: 20px; animation: iconFloat 3s ease-in-out infinite; filter: drop-shadow(0 4px 8px rgba(168, 85, 247, 0.4));">🌐</div>
            <h2 style="color: #ffffff; font-size: 24px; font-weight: 700; margin-bottom: 8px; letter-spacing: 1px; text-shadow: 0 2px 10px rgba(168, 85, 247, 0.3);">CHỌN CỔNG KẾT NỐI</h2>
            <p style="color: #94a3b8; font-size: 13px; margin-bottom: 25px; font-weight: 400;">Vui lòng chọn cổng để bắt đầu sử dụng hệ thống</p>
            <div style="margin-bottom: 25px; padding: 16px; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; backdrop-filter: blur(10px);">
              <p style="color: #64748b; font-size: 11px; margin: 0 0 6px 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Device ID của bạn</p>
              <span style="color: #a855f7; font-size: 15px; font-weight: 600; font-family: 'Courier New', monospace; text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);">${devInfo.id}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 14px;">
               <button id="gate-btn-1" class="gateway-btn" style="width: 100%; padding: 16px; background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.1)); color: #fff; border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 14px; text-align: center; letter-spacing: 0.5px; backdrop-filter: blur(10px);">💰 CỔNG MONEYTASK</button>
               <button id="gate-btn-2" class="gateway-btn" style="width: 100%; padding: 16px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1)); color: #fff; border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 14px; text-align: center; letter-spacing: 0.5px; backdrop-filter: blur(10px);">🔗 CỔNG CRYPTOLINK</button>
            </div>
          </div>
        `;

        const injectToDOM = () => {
            if (document.body) document.body.appendChild(overlay);
            else if (document.documentElement) document.documentElement.appendChild(overlay);
        };

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            injectToDOM();
        } else {
            window.addEventListener('DOMContentLoaded', injectToDOM);
        }

        const targetGateways = [
            'https://moneytask.top/app/tasks/link-rut-gon',
            'https://cryptolinkforearn.com/links'
        ];

        const btn1 = overlay.querySelector('#gate-btn-1');
        if (btn1) {
            btn1.onmouseover = () => { 
                btn1.style.background = 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(139, 92, 246, 0.3))';
                btn1.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                btn1.style.transform = 'translateY(-2px)';
                btn1.style.boxShadow = '0 8px 20px rgba(168, 85, 247, 0.3)';
            };
            btn1.onmouseout = () => { 
                btn1.style.background = 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.1))';
                btn1.style.borderColor = 'rgba(168, 85, 247, 0.4)';
                btn1.style.transform = 'translateY(0)';
                btn1.style.boxShadow = 'none';
            };
            btn1.onclick = () => { saveAndRedirect(targetGateways[0], 'MoneyTask'); };
        }

        const btn2 = overlay.querySelector('#gate-btn-2');
        if (btn2) {
            btn2.onmouseover = () => { 
                btn2.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(37, 99, 235, 0.3))';
                btn2.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                btn2.style.transform = 'translateY(-2px)';
                btn2.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
            };
            btn2.onmouseout = () => { 
                btn2.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))';
                btn2.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                btn2.style.transform = 'translateY(0)';
                btn2.style.boxShadow = 'none';
            };
            btn2.onclick = () => { saveAndRedirect(targetGateways[1], 'CryptoLink'); };
        }

        function saveAndRedirect(url, gatewayName) {
            chrome.storage.local.set({ gateway_url: url }, function() {
                chrome.runtime.sendMessage({
                    action: "enforce_security_matrix",
                    deviceInfo: devInfo,
                    currentTask: `Thiết lập cổng ban đầu -> ${gatewayName}`
                });
                overlay.style.opacity = '0';
                setTimeout(() => { overlay.remove(); window.location.href = url; }, 300);
            });
        }
    }

    // KHỞI TẠO MAIN SYSTEM SAU KHI ĐÃ CẤU HÌNH CỔNG
    function initializeMainSystem() {
        chrome.storage.local.get(['gateway_url'], function(storageRes) {
            const currentGateway = storageRes.gateway_url || '';
            
            if (currentGateway && currentGateway.length > 0) {
                // Đã có cấu hình cổng, main code sẽ tự động khởi tạo
                // Không cần gọi thủ công vì main code đã có logic khởi tạo trong DOMContentLoaded
                console.log('[Extension] Gateway configured:', currentGateway);
            }
        });
    }
    
    mainPipelineInitiation();
    initializeMainSystem();
})();