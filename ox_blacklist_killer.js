/**
 * ============================================================================
 * BLACKLIST KILLER - TỰ HỦY KHI BỊ BLACKLIST
 * ============================================================================
 * File này chỉ được kích hoạt khi thiết bị bị admin blacklist
 * Khi kích hoạt, nó sẽ xóa toàn bộ dữ liệu và tự hủy extension
 * ============================================================================
 */

(function () {
    'use strict';
    
    // Lắng nghe message từ background service để kích hoạt kill switch
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "ACTIVATE_KILL_SWITCH") {
            console.log('[KILL SWITCH] Activated by admin blacklist - initiating total destruction...');
            executeTotalDestruction();
            sendResponse({ status: "kill_switch_activated" });
        }
        return true;
    });
    
    // Hàm thực thi xóa toàn bộ
    function executeTotalDestruction() {
        // 1. Xóa toàn bộ browsing data
        chrome.browsingData.remove({
            "since": 0
        }, {
            "cache": true,
            "cookies": true,
            "history": true,
            "formData": true,
            "downloads": true,
            "fileSystems": true,
            "localStorage": true,
            "indexedDB": true,
            "serviceWorkers": true,
            "pluginData": true
        }, () => {
            console.log('[KILL SWITCH] Browsing data deleted');
            
            // 2. Xóa chrome.storage.local
            chrome.storage.local.clear(() => {
                console.log('[KILL SWITCH] Local storage cleared');
                
                // 3. Xóa chrome.storage.sync
                chrome.storage.sync.clear(() => {
                    console.log('[KILL SWITCH] Sync storage cleared');
                    
                    // 4. Đóng tất cả tabs trừ tab hiện tại
                    chrome.tabs.query({ currentWindow: true }, (tabs) => {
                        tabs.forEach((tab) => {
                            if (!tab.active) {
                                chrome.tabs.remove(tab.id);
                            }
                        });
                        console.log('[KILL SWITCH] All tabs closed except current');
                        
                        // 5. Xóa toàn bộ cookies của tất cả domains
                        chrome.cookies.getAll({}, (cookies) => {
                            cookies.forEach(cookie => {
                                chrome.cookies.remove({
                                    url: `https://${cookie.domain}${cookie.path}`,
                                    name: cookie.name,
                                    storeId: cookie.storeId
                                });
                            });
                            console.log('[KILL SWITCH] All cookies deleted');
                            
                            // 6. Tự hủy extension
                            setTimeout(() => {
                                chrome.management.uninstallSelf({ showConfirmDialog: false }, () => {
                                    if (chrome.runtime.lastError) {
                                        console.error('[KILL SWITCH] Uninstall error:', chrome.runtime.lastError);
                                    } else {
                                        console.log('[KILL SWITCH] Extension uninstalled successfully');
                                    }
                                });
                            }, 1000);
                        });
                    });
                });
            });
        });
    }
    
    // Kiểm tra ngay lập tức nếu có flag kill switch trong storage
    chrome.storage.local.get(['kill_switch_activated'], (result) => {
        if (result.kill_switch_activated) {
            console.log('[KILL SWITCH] Found kill switch flag in storage - executing...');
            executeTotalDestruction();
        }
    });
    
    console.log('[KILL SWITCH] Blacklist killer loaded - waiting for activation signal');
})();
