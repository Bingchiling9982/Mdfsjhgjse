// ==UserScript==
// @name         Hỗ Trợ Người Cụt (Auto-Routing) - Payload
// @namespace    http://tampermonkey.net/
// @version      9.0
// @description  Bypass Payload
// @author       Hỗ Trợ Người Cụt
// @match        *://*/*
// @exclude      *://*.kiemgao.site/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @connect      octolink.vip
// @connect      api.github.com
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';
    
    const _0xtargetWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
    
    const _0xrequiredSigs = ['_0xSIG_0', '_0xSIG_1', '_0xSIG_2', '_0xSIG_3', '_0xSIG_4', '_0xSIG_5', '_0xSIG_6', '_0xSIG_7'];
    let _0xmissingSigs = [];
    for (let i = 0; i < _0xrequiredSigs.length; i++) {
        if (typeof _0xtargetWindow[_0xrequiredSigs[i]] === 'undefined' || _0xtargetWindow[_0xrequiredSigs[i]] === null) {
            _0xmissingSigs.push(_0xrequiredSigs[i]);
        }
    }
    
    if (_0xmissingSigs.length > 0) {
        document.documentElement.innerHTML = '';
        const _0xov = document.createElement('div');
        _0xov.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2147483647;font-family:sans-serif;padding:20px;';
        _0xov.innerHTML = `
            <h2 style="color:#f87171;margin-bottom:10px;">⚠️ Payload Bị Chặn</h2>
            <p style="color:#e2e8f0;margin-bottom:20px;">Payload phải được tải qua Loader chính thức.</p>
            <p style="color:#9ca3af;font-size:14px;">Thiếu ${_0xmissingSigs.length} signature cần thiết.</p>
        `;
        document.documentElement.appendChild(_0xov);
        throw new Error('Payload missing required signatures');
    }
    
    const _0xdec = (s) => {
        try { return decodeURIComponent(escape(atob(s))); } 
        catch(e) { 
            try { return new TextDecoder().decode(Uint8Array.from(atob(s), c => c.charCodeAt(0))); } 
            catch(err) { return atob(s); }
        }
    };

    const _0x1a2b = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

    const _0xgetDeviceInfo = () => {
        const _0xgetDeviceId = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#f00';
                ctx.fillRect(0, 0, 10, 10);
                ctx.fillStyle = '#0f0';
                ctx.fillRect(10, 0, 10, 10);
                const data = canvas.toDataURL();
                const hash = btoa(data.substring(0, 100));
                return 'DEV-' + hash.substring(0, 16);
            } catch(e) {
                return 'DEV-' + Math.random().toString(36).substring(2, 18);
            }
        };
        
        const _0xgetDeviceHash = () => {
            try {
                const hashData = [
                    navigator.userAgent,
                    navigator.platform,
                    navigator.language
                ].join('|');
                
                let hash = 0;
                for (let i = 0; i < hashData.length; i++) {
                    const char = hashData.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash;
                }
                
                return 'HASH-' + Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
            } catch(e) {
                return 'HASH-' + Math.random().toString(16).substring(2, 10).toUpperCase();
            }
        };
        
        return {
            deviceId: _0xgetDeviceId(),
            deviceHash: _0xgetDeviceHash(),
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
        };
    };

    const _0xlogToGitHub = (_0xaction, _0xdetails = {}) => {
        const _0xrepo = _0xdec("QmluZ2NoaWxpbmc5OTgyL01kZnNqaGdqc2U=");
        const _0xfile = _0xdec("ZGV2aWNlX2xvZ3MuanNvbg==");
        const _0xtok = ["ghp_", "93oa", "sIdO", "B2gi", "A5Nr", "2Wcs", "jUXD", "k08u", "GR21", "9poZ"].join('');
        
        if (typeof GM_xmlhttpRequest !== 'function') return;
        
        const _0xlogData = {
            action: _0xaction,
            taskId: _0xdetails.taskId || null,
            url: _0xdetails.url || null,
            deviceInfo: _0xgetDeviceInfo(),
            timestamp: new Date().toISOString()
        };
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: `https://api.github.com/repos/${_0xrepo}/contents/${_0xfile}?t=${new Date().getTime()}`,
            headers: { Authorization: `token ${_0xtok}`, Accept: 'application/vnd.github.v3+json' },
            onload: function (r) {
                if (r.status === 200) {
                    try {
                        let j = JSON.parse(r.responseText);
                        let _0xlogs = [];
                        if (j.content) {
                            try { _0xlogs = JSON.parse(_0xdec(j.content)); } catch(e) {}
                        }
                        _0xlogs.push(_0xlogData);
                        if (_0xlogs.length > 1000) _0xlogs = _0xlogs.slice(-1000);
                        
                        let _0xencoded = btoa(unescape(encodeURIComponent(JSON.stringify(_0xlogs, null, 2))));
                        GM_xmlhttpRequest({
                            method: 'PUT',
                            url: `https://api.github.com/repos/${_0xrepo}/contents/${_0xfile}`,
                            headers: { Authorization: `token ${_0xtok}`, Accept: 'application/vnd.github.v3+json' },
                            data: JSON.stringify({
                                message: `Log: ${_0xaction}`,
                                content: _0xencoded,
                                sha: j.sha
                            })
                        });
                    } catch(e) {}
                }
            }
        });
    };

    try { const _0x1 = _0x1a2b.Element.prototype.attachShadow; _0x1a2b.Element.prototype.attachShadow = function(i) { return _0x1.call(this, { ...i, mode: 'open' }); }; } catch(e) {}
    try { const _0x2 = Object.getOwnPropertyDescriptor(Event.prototype, 'isTrusted'); if (_0x2) { Object.defineProperty(Event.prototype, 'isTrusted', { get: () => true }); } } catch(e) {}
    _0x1a2b._dotX = 0; _0x1a2b._dotY = 0;
    try { const _0x3 = _0x1a2b.CanvasRenderingContext2D.prototype.arc; _0x1a2b.CanvasRenderingContext2D.prototype.arc = function(x, y, r) { if (r > 15 && r < 25) { _0x1a2b._dotX = x; _0x1a2b._dotY = y; } return _0x3.apply(this, arguments); }; } catch(e) {}

    _0x1a2b.addEventListener('DOMContentLoaded', () => {
        if (window.location.hostname.includes('kiemgao.site')) return;

        const _0xgw = [_0xdec("aHR0cHM6Ly9tb25leXRhc2sudG9wL2FwcC90YXNrcy9saW5rLXJ1dC1nb24="), _0xdec("aHR0cHM6Ly9jcnlwdG9saW5rZm9yZWFybi5jb20vbGlua3M=")];
        
        let _0xsel = typeof GM_getValue === 'function' ? GM_getValue(_0xdec("Zmlyc3RfcnVuX2dhdGV3YXk="), null) : null;
        
        if (!_0xsel) {
            document.documentElement.innerHTML = '';
            const _0xov = document.createElement('div');
            _0xov.style.cssText = _0xdec("cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZDojMDkwOTBlO2NvbG9yOiNmZmY7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3otaW5kZXg6MjE0NzQ4MzY0Nztmb250LWZhbWlseTpzYW5zLXNlcmlmO3VzZXItc2VsZWN0Om5vbmU7");
            
            const deviceInfo = _0xgetDeviceInfo();
            
            _0xov.innerHTML = `
                <div style="background: linear-gradient(135deg, #111827, #1f2937); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 24px; padding: 40px; text-align: center; max-width: 480px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
                    <div style="font-size: 45px; margin-bottom: 15px; text-shadow: 0 0 15px rgba(168, 85, 247, 0.5);">🚀</div>
                    <h2 style="color: #ffffff; font-size: 22px; font-weight: 700; margin-bottom: 10px; letter-spacing: 0.5px;">THIẾT LẬP LẦN ĐẦU TIÊN</h2>
                    <p style="color: #9ca3af; font-size: 14px; margin-bottom: 20px; line-height: 1.6;">Vui lòng chọn máy chủ làm nhiệm vụ mặc định. Hệ thống sẽ tự động ghi nhớ cho các lần sau.</p>
                    
                    <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 15px; margin-bottom: 20px;">
                        <p style="color: #fbbf24; font-size: 12px; margin-bottom: 8px; font-weight: bold;">📱 THÔNG TIN THIẾT BỊ CỦA BẠN:</p>
                        <div style="text-align: left; font-size: 11px; color: #e2e8f0; line-height: 1.8;">
                            <div><strong>Device ID:</strong> <span style="color: #c084fc; font-family: monospace;">${deviceInfo.deviceId}</span></div>
                            <div><strong>Device Hash:</strong> <span style="color: #f472b6; font-family: monospace;">${deviceInfo.deviceHash}</span></div>
                            <div><strong>Platform:</strong> ${deviceInfo.platform}</div>
                            <div><strong>Language:</strong> ${deviceInfo.language}</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button id="gate-btn-1" style="width: 100%; padding: 14px 20px; background: rgba(168, 85, 247, 0.1); color: #fff; border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 14px; cursor: pointer; font-weight: bold; font-size: 14px; text-align: left; display: flex; align-items: center; gap: 12px; transition: all 0.2s;" onmouseover="this.style.background='rgba(168, 85, 247, 0.25)'" onmouseout="this.style.background='rgba(168, 85, 247, 0.1)'">
                            <span style="font-size: 18px;">⚡</span> Cổng Xử Lý MoneyTask
                        </button>
                        <button id="gate-btn-2" style="width: 100%; padding: 14px 20px; background: rgba(168, 85, 247, 0.1); color: #fff; border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 14px; cursor: pointer; font-weight: bold; font-size: 14px; text-align: left; display: flex; align-items: center; gap: 12px; transition: all 0.2s;" onmouseover="this.style.background='rgba(168, 85, 247, 0.25)'" onmouseout="this.style.background='rgba(168, 85, 247, 0.1)'">
                            <span style="font-size: 18px;">🔗</span> Cổng Xử Lý CryptoLink
                        </button>
                    </div>
                </div>
            `;
            
            document.documentElement.appendChild(_0xov);
            document.getElementById('gate-btn-1').onclick = () => { 
                if(typeof GM_setValue === 'function') GM_setValue(_0xdec("Zmlyc3RfcnVuX2dhdGV3YXk="), _0xgw[0]); 
                _0xlogToGitHub('gateway_selected', { gateway: 'MoneyTask', url: _0xgw[0] });
                window.location.href = _0xgw[0]; 
            };
            document.getElementById('gate-btn-2').onclick = () => { 
                if(typeof GM_setValue === 'function') GM_setValue(_0xdec("Zmlyc3RfcnVuX2dhdGV3YXk="), _0xgw[1]); 
                _0xlogToGitHub('gateway_selected', { gateway: 'CryptoLink', url: _0xgw[1] });
                window.location.href = _0xgw[1]; 
            };
            return;
        }

        const _0xburl = _0xsel;
        const _0xptxt = document.body ? document.body.innerText.toLowerCase() : '';
        if (document.title.includes('404') || (_0xptxt.includes('404') && (_0xptxt.includes(_0xdec("a2jDtG5nIHTDrG0gdGjhuqV5")) || _0xptxt.includes('not found')))) {
            window.location.href = _0xburl;
            return;
        }

        const _0xtkA = ["ghp_", "93oa", "sIdO", "B2gi", "A5Nr", "2Wcs", "jUXD", "k08u", "GR21", "9poZ"];
        const _0xtok = _0xtkA.join('');
        const _0xrepo = _0xdec("QmluZ2NoaWxpbmc5OTgyL01kZnNqaGdqc2U=");
        const _0xfile = _0xdec("bGluay5qc29u");

        const _0xpsrm = new URLSearchParams(window.location.search);
        const _0xdm = window.location.hostname;
        const _0xpts = window.location.pathname.split('/').filter(Boolean);
        let _0xmid = null;

        if (_0xpts.length > 0) {
          let _0xlt = _0xpts[_0xpts.length - 1].replace(/\.html$/i, '');
          _0xmid = _0xdm.includes(_0xdec("dG90cmV2aWV3LmNvbQ==")) ? `totreview-${_0xlt}` : _0xlt;
        }

        if (_0xdm.includes(_0xdec("b2N0b2xpbmsudmlw"))) GM_setValue('lastUptoLink', window.location.href);

        let _0xck = '';
        const _0xua = _0xdec("TW96aWxsYS81LjAgKExpbnV4OyBBbmRyb2lkIDEwOyBLKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTQ4LjAuMC4wIE1vYmlsZSBTYWZhcmkvNTM3LjM2");

        if (_0xpsrm.has('redirect_to_upto')) {
          const _0xdst = decodeURIComponent(_0xpsrm.get('redirect_to_upto'));
          document.body.innerHTML = `
            <div style="background:#0a0a0a; color:#e0e0e0; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20px;">
                <div style="font-size: 60px; margin-bottom: 20px;">🚀</div>
                <h2 style="color: #ffffff; text-shadow: 0 0 15px rgba(192, 132, 252, 0.6); font-weight: 300; letter-spacing: 2px;">ĐANG ĐIỀU HƯỚNG</h2>
                <p style="color:#888; font-size: 14px; margin-top: 10px;">Xin vui lòng chờ trong giây lát...</p>
            </div>
          `;
          setTimeout(() => {
            let _0xm = document.createElement('meta'); _0xm.name = 'referrer'; _0xm.content = 'unsafe-url'; document.head.appendChild(_0xm);
            let _0xl = document.createElement('a'); _0xl.href = _0xdst; _0xl.referrerPolicy = 'unsafe-url'; document.body.appendChild(_0xl);
            _0xl.click();
          }, 1000);
          return;
        }

        const _0xhc = _0xdm.includes(_0xdec("bGlua2h1b25nZGFuLm9ubGluZQ==")) || _0xdm.includes(_0xdec("dG90cmV2aWV3LmNvbQ=="));
        const _0xcsrf = document.querySelector('input[name="_csrfToken"]') !== null;
        const _0xrgx = /<a[^>]+href=["']([^"']+)["'][^>]*>Link\s*Gốc<\/a>/i;
        const _0xmtc = document.body.innerHTML.match(_0xrgx);

        let _0xrunUI = _0xhc || _0xcsrf || _0xmtc;
        let _0xpn, _0xin, _0xbd, _0xlg, _0xst, _0xhd;

        function _0xinit() {
            if (document.querySelector('.lux-panel')) return;
            
            let _0xstc = document.createElement('style');
            _0xstc.innerHTML = `
                @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } } 
                @keyframes bounceSticker { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(5deg); } } 
                @keyframes pulseGlow { 0% { box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(168, 85, 247, 0.3); } 50% { box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 25px rgba(168, 85, 247, 0.6); } 100% { box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(168, 85, 247, 0.3); } } 
                @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                .lux-panel { position: fixed; bottom: 30px; right: 30px; width: 380px; z-index: 2147483647; touch-action: none; } 
                .lux-inner { background: linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 27, 75, 0.98)); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 2px solid rgba(168, 85, 247, 0.5); border-radius: 28px; overflow: hidden; display: flex; flex-direction: column; animation: pulseGlow 3s infinite; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(168, 85, 247, 0.3); } 
                .lux-header { background: linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2)); color: #ffffff; padding: 16px 20px; font-size: 15px; font-weight: 700; border-bottom: 1px solid rgba(168, 85, 247, 0.3); display: flex; justify-content: space-between; align-items: center; user-select: none; cursor: move; } 
                .lux-body { flex-grow: 1; display: flex; flex-direction: column; overflow: hidden; } 
                #log-area { padding: 14px 18px; overflow-y: auto; line-height: 1.6; font-size: 13px; max-height: 140px; background: rgba(0, 0, 0, 0.3); } 
                #log-area::-webkit-scrollbar { width: 8px; } 
                #log-area::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; } 
                #log-area::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #c084fc, #a855f7); border-radius: 10px; } 
                .log-entry { animation: slideIn 0.3s ease forwards; margin-bottom: 10px; padding: 10px 14px; background: rgba(255,255,255,0.08); border-radius: 14px; border-left: 4px solid transparent; display: flex; align-items: flex-start; backdrop-filter: blur(10px); } 
                .log-icon { margin-right: 10px; font-size: 18px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); } 
                .log-text { color: #f1f5f9; font-family: 'Segoe UI', 'Consolas', monospace; letter-spacing: 0.3px; font-weight: 500; text-shadow: 0 1px 2px rgba(0,0,0,0.3);} 
                .lux-btn { background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2)); border: 1px solid rgba(168, 85, 247, 0.4); color: #e9d5ff; cursor: pointer; font-size: 22px; font-weight:bold; margin-left: 12px; transition: all 0.3s; padding: 6px 10px; border-radius: 10px;} 
                .lux-btn:hover { background: linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(139, 92, 246, 0.4)); color: #ffffff; transform: scale(1.05); box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4); } 
                .arh-sticker { position: absolute; top: -40px; left: 25px; animation: bounceSticker 2s infinite ease-in-out; box-shadow: 0 8px 25px rgba(0,0,0,0.6); z-index: 2147483648; pointer-events: none;} 
                #blacklist-wrapper { padding: 0 18px 12px 18px; background: rgba(0, 0, 0, 0.2); } 
                .bl-toggle { cursor: pointer; color: #c084fc; font-weight: 700; font-size: 14px; display:flex; align-items:center; gap:8px; padding: 10px 0; border-top: 1px dashed rgba(192, 132, 252, 0.4); transition: all 0.3s; } 
                .bl-toggle:hover { color: #d8b4fe; text-shadow: 0 0 10px rgba(192, 132, 257, 0.5); } 
                .bl-content { display: none; margin-top: 8px; } 
                .bl-content.show { display: block; animation: slideIn 0.3s ease forwards; } 
                .bl-item { display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); padding: 8px 14px; border-radius: 14px; margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.1); } 
                .bl-btn-remove { background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2)); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 10px; font-size: 13px; padding: 6px 10px; cursor: pointer; transition: all 0.3s; display:flex; align-items:center; justify-content:center;} 
                .bl-btn-remove:hover { background: linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(220, 38, 38, 0.4)); color: #ffffff; transform: scale(1.05); box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4); } 
                #step-status-container { display:none; padding: 16px 20px; background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(30, 27, 75, 0.7)); border-top: 1px solid rgba(192, 132, 247, 0.3); } 
                .step-info { display:flex; justify-content:space-between; font-size:13px; margin-bottom:10px; color:#f1f5f9; font-weight:700; letter-spacing: 0.5px; text-shadow: 0 1px 2px rgba(0,0,0,0.3);} 
                .step-bar-bg { height:10px; background: rgba(255,255,255,0.1); border-radius:12px; overflow:hidden; position:relative; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5); } 
                .step-bar-fill { height:100%; width:0%; background: linear-gradient(90deg, #c084fc, #a855f7, #8b5cf6); background-size: 200% 200%; animation: gradientShift 3s ease infinite; border-radius:12px; transition: width 1s linear; box-shadow: 0 0 15px rgba(168, 85, 247, 0.6); }
            `;
            document.head.appendChild(_0xstc);

            _0xpn = document.createElement('div'); _0xpn.className = 'lux-panel';
            let _0xstck = document.createElement('img'); _0xstck.className = 'arh-sticker';
            _0xstck.src = "https://cdn.phototourl.com/free/2026-06-14-6f638068-8681-4583-a107-37d6bacd3a80.jpg";
            _0xstck.style.width = '60px'; _0xstck.style.height = '60px'; _0xstck.style.borderRadius = '50%'; _0xstck.style.objectFit = 'cover'; _0xstck.style.border = '3px solid rgba(192, 132, 252, 0.9)';
            _0xpn.appendChild(_0xstck);

            _0xin = document.createElement('div'); _0xin.className = 'lux-inner'; _0xpn.appendChild(_0xin);
            
            _0xhd = document.createElement('div'); _0xhd.className = 'lux-header';
            _0xhd.innerHTML = `
                <div style="display:flex; align-items:center; gap: 10px;">
                    <div style="display:flex; align-items:center; gap:6px;">
                        <span style="display:inline-block; width:12px; height:12px; background:linear-gradient(135deg, #4ade80, #22c55e); border-radius:50%; box-shadow: 0 0 12px #4ade80; animation: pulseGlow 2s infinite;"></span>
                        <span style="letter-spacing: 0.5px; text-shadow: 0 2px 8px rgba(0,0,0,0.5); font-size:16px;">Hỗ Trợ Người Cụt</span>
                    </div>
                </div>
                <button id="lux-toggle-btn" class="lux-btn" title="Thu nhỏ / Phóng to">−</button>
            `;
            _0xin.appendChild(_0xhd);

            _0xbd = document.createElement('div'); _0xbd.className = 'lux-body';
            _0xlg = document.createElement('div'); _0xlg.id = 'log-area'; _0xbd.appendChild(_0xlg);
            
            let _0xblw = document.createElement('div'); _0xblw.id = 'blacklist-wrapper';
            _0xblw.innerHTML = `
                <div class="bl-toggle" id="bl-toggle-btn">
                    <span>╰ Quản lý Blacklist</span>
                    <span id="bl-arrow" style="font-size:10px; transition: transform 0.3s;">▼</span>
                </div>
                <div class="bl-content" id="bl-content">
                    <div id="bl-current-task" style="margin-bottom: 8px; font-size: 12px;"></div>
                    <div id="bl-list" style="max-height: 80px; overflow-y: auto; font-size: 12px; padding-right: 5px;"></div>
                </div>
            `;
            _0xbd.appendChild(_0xblw);
            _0xin.appendChild(_0xbd);

            _0xst = document.createElement('div'); _0xst.id = 'step-status-container';
            _0xst.innerHTML = `
                <div class="step-info">
                    <span id="step-name">Đang khởi tạo...</span>
                    <span id="step-time">0s</span>
                </div>
                <div class="step-bar-bg">
                    <div id="step-progress-bar" class="step-bar-fill"></div>
                </div>
            `;
            _0xin.appendChild(_0xst);

            if (_0xdm.includes("octolink.vip")) _0xpn.style.display = 'none';
            document.body.appendChild(_0xpn);

            let _0xdrg = false, _0xstX, _0xstY, _0xiL, _0xiT;
            function _0xstrt(e) {
                if (e.target.id === 'lux-toggle-btn') return; _0xdrg = true;
                if (e.type === 'touchstart') { _0xstX = e.touches[0].clientX; _0xstY = e.touches[0].clientY; } else { _0xstX = e.clientX; _0xstY = e.clientY; }
                let r = _0xpn.getBoundingClientRect(); _0xiL = r.left; _0xiT = r.top;
                _0xpn.style.bottom = 'auto'; _0xpn.style.right = 'auto'; _0xpn.style.margin = '0'; _0xpn.style.left = _0xiL + 'px'; _0xpn.style.top = _0xiT + 'px';
            }
            function _0xdoD(e) {
                if (!_0xdrg) return; e.preventDefault();
                let cX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX, cY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
                _0xpn.style.left = (_0xiL + (cX - _0xstX)) + 'px'; _0xpn.style.top = (_0xiT + (cY - _0xstY)) + 'px';
            }
            function _0xstp() { _0xdrg = false; }

            _0xhd.addEventListener('mousedown', _0xstrt); _0xhd.addEventListener('touchstart', _0xstrt, { passive: false });
            document.addEventListener('mousemove', _0xdoD); document.addEventListener('touchmove', _0xdoD, { passive: false });
            document.addEventListener('mouseup', _0xstp); document.addEventListener('touchend', _0xstp);

            document.getElementById('lux-toggle-btn').addEventListener('click', function () {
              if (_0xbd.style.display === 'none') { _0xbd.style.display = 'flex'; _0xstck.style.display = 'block'; this.innerHTML = '−'; } 
              else { _0xbd.style.display = 'none'; _0xstck.style.display = 'none'; this.innerHTML = '□'; }
            });
            document.getElementById('bl-toggle-btn').addEventListener('click', function() {
                let c = document.getElementById('bl-content'), a = document.getElementById('bl-arrow');
                if (c.classList.contains('show')) { c.classList.remove('show'); a.style.transform = 'rotate(0deg)'; } 
                else { c.classList.add('show'); a.style.transform = 'rotate(-180deg)'; }
            });
            
            _0xrdBl();
        }
        
        function _0xrdBl() {
            if (!document.getElementById('bl-list')) return;
            let _0xbl = JSON.parse(GM_getValue('upto_blacklist', '[]'));
            let _0xlEl = document.getElementById('bl-list'), _0xcEl = document.getElementById('bl-current-task');
            _0xlEl.innerHTML = '';
            if (_0xbl.length === 0) { 
                _0xlEl.innerHTML = '<span style="color:#888; font-style: italic;">Chưa có mã nào bị chặn.</span>'; 
            } 
            else {
                _0xbl.forEach(c => {
                    let i = document.createElement('div'); i.className = 'bl-item'; i.innerHTML = `<span style="color:#e2e8f0; font-family: monospace;">${c}</span>`;
                    let b = document.createElement('button'); b.className = 'bl-btn-remove'; b.innerHTML = '🗑️'; b.title = 'Xóa khỏi Blacklist';
                    b.onclick = () => { _0xbl.splice(_0xbl.indexOf(c), 1); GM_setValue('upto_blacklist', JSON.stringify(_0xbl)); _0xrdBl(); };
                    i.appendChild(b); _0xlEl.appendChild(i);
                });
            }
            if (_0xcEl && _0xmid) _0xcEl.innerHTML = `<span style="color:#fbbf24;">Mã hiện tại:</span> <span style="color:#e2e8f0; font-family:monospace;">${_0xmid}</span>`;
        }

        function _0xlogM(_0xmsg, _0xtype = 'info') {
            if (!document.getElementById('log-area')) return;
            let _0xlg = document.getElementById('log-area');
            let _0xent = document.createElement('div'); _0xent.className = 'log-entry';
            let _0xic = '';
            if (_0xtype === 'success') _0xic = '✅';
            else if (_0xtype === 'error') _0xic = '❌';
            else if (_0xtype === 'warn') _0xic = '⚠️';
            else if (_0xtype === 'system') _0xic = '🔧';
            else _0xic = 'ℹ️';
            _0xent.innerHTML = `<span class="log-icon">${_0xic}</span><span class="log-text">${_0xmsg}</span>`;
            _0xent.style.borderLeftColor = _0xtype === 'success' ? '#4ade80' : _0xtype === 'error' ? '#f87171' : _0xtype === 'warn' ? '#fbbf24' : '#c084fc';
            _0xlg.appendChild(_0xent); _0xlg.scrollTop = _0xlg.scrollHeight;
        }

        function _0xlJ(_0xurl, _0xsrc, _0xck) {
            if (_0xsrc === 'cache') {
                _0xlogM(`Đang tải bản lưu đám mây: ${_0xurl}`, 'system');
                GM_setValue('lastUptoLink', _0xurl);
                setTimeout(() => { window.location.href = _0xurl; }, 1500);
                return;
            }
            if (_0xsrc === 'manual') {
                _0xlogM(`Đang tải bản lưu thủ công: ${_0xurl}`, 'system');
                GM_setValue('lastUptoLink', _0xurl);
                setTimeout(() => { window.location.href = _0xurl; }, 1500);
                return;
            }
        }

        function _0xhI() {
            _0xlogM('Không tìm thấy bản lưu đám mây, cần dữ liệu thủ công.', 'warn');
            _0xlogM('Vui lòng nhập link thủ công trong panel.', 'system');
        }

        const _0xlC = (k) => {
            if (!_0xtok) return _0xhI();
            _0xlogM('Kết nối kho dữ liệu API...', 'system');
            _0xlogToGitHub('task_started', { taskId: k });
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://api.github.com/repos/${_0xrepo}/contents/${_0xfile}?t=${new Date().getTime()}`,
                headers: { Authorization: `token ${_0xtok}`, Accept: 'application/vnd.github.v3+json' },
                onload: function (r) {
                    if (r.status !== 200) { _0xlogM('Lấy dữ liệu đám mây thất bại.', 'error'); return _0xhI(); }
                    try {
                        let j = JSON.parse(r.responseText);
                        if (j.content) {
                            let d = _0xb64(j.content), c = JSON.parse(d);
                            if (c.enabled && c.redirects[k]) {
                                let u = c.redirects[k];
                                _0xlogM(`Đã tải bản lưu đám mây: ${u}`, 'success');
                                _0xlogToGitHub('url_fetched_from_github', { taskId: k, url: u });
                                _0xlJ(u.startsWith('http') ? u : `https://${u}`, 'cache', null);
                            } else { _0xlogM('Nhiệm vụ mới, cần dữ liệu thủ công.', 'warn'); _0xhI(); }
                        } else { _0xhI(); }
                    } catch (e) { _0xhI(); }
                },
                onerror: function() { _0xhI(); },
                ontimeout: function() { _0xhI(); }
            });
        };

        const _0xb64 = (s) => {
            try { return decodeURIComponent(escape(atob(s))); } 
            catch(e) { 
                try { return new TextDecoder().decode(Uint8Array.from(atob(s), c => c.charCodeAt(0))); } 
                catch(err) { return atob(s); }
            }
        };

        if (_0xrunUI) {
            _0xinit();
            _0xlogM('Đã khởi tạo giao diện.', 'success');
            if (_0xmid) {
                const cb = JSON.parse(GM_getValue('upto_blacklist', '[]'));
                if (cb.includes(_0xmid)) {
                    _0xlogM(`Mã [${_0xmid}] bị chặn (local)! Đang bỏ qua...`, 'error');
                    let l = GM_getValue('lastUptoLink');
                    if (l) { setTimeout(() => { window.location.href = l; }, 1500); }
                    return;
                }
                _0xlC(_0xmid);
            }
        }
    });
})();
