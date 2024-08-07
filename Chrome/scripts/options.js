document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('domains');
    const saveButton = document.getElementById('save');

    chrome.storage.sync.get('domains', function (data) {
        if (chrome.runtime.lastError) {
            console.error('Error loading domains:', chrome.runtime.lastError);
        } else if (data.domains) {
            input.value = data.domains.join(', ');
        }
    });

    function saveDomains() {
        const domains = input.value.split(',').map(domain => domain.trim()).filter(domain => domain);
        chrome.storage.sync.set({ domains: domains }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error saving domains:', chrome.runtime.lastError);
            }
        });
    }

    saveButton.addEventListener('click', saveDomains());

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            saveDomains();
        }
    });
});
