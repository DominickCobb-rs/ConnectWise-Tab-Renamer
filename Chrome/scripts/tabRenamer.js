console.debug("ConnectWise Tab Renamer script loaded");

function updateTabTitle() {
    let bannerTextElements = document.getElementsByClassName("cw_BannerView");
    if (bannerTextElements[0]) {
        let bannerTextLine = bannerTextElements[0].getElementsByClassName("detailLabel");
        if (bannerTextLine[0]) {
            let tickettext = bannerTextLine[0].innerHTML.split("Service Ticket ");
            if (tickettext[1]) {
                document.title = tickettext[1];
            } 
            else if (bannerTextLine[0].innerHTML.includes("Calendar"))
            {
                document.title = "My Calendar";
            }
            else (document.title = document.title.replace("Manage:",""));
        }
    }
}

function checkDomainAndRun() {
    chrome.storage.sync.get('domains', function (data) {
        if (data.domains) {
            const currentDomain = window.location.hostname;
            const isDomainMatched = data.domains.some(domain => currentDomain.includes(domain));
            if (isDomainMatched) {
                console.log("Domain matched. Running updateTicketTabTitle.");
                updateTabTitle();
            } else {
                console.log("Domain not matched. Skipping updateTicketTabTitle.");
            }
        } else {
            console.log("No domains configured. Skipping updateTicketTabTitle.");
        }
    });
}

const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            checkDomainAndRun();
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });