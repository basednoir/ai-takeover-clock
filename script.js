document.addEventListener('DOMContentLoaded', () => {
    // --- Counter Elements ---
    const jobsAutomatedElem = document.getElementById('jobs-automated-counter');
    const jobsCreatedElem = document.getElementById('jobs-created-counter');
    const computePowerElem = document.getElementById('compute-power-counter');
    const aiInvestmentElem = document.getElementById('ai-investment-counter');
    const aiPatentsElem = document.getElementById('ai-patents-counter');
    const aiContentElem = document.getElementById('ai-content-counter');
    // We don't need a JS element for the CSS-based pulse indicator

    // --- Configuration ---
    const epochDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0)); // Jan 1, 2025 UTC

    // Base Values at Epoch Date
    const baseJobsAutomated = 0;
    const baseJobsCreated = 0;
    const baseComputePower = 3.8e25; // GPT-4o benchmark
    const baseAiInvestment = 0;
    const baseAiPatents = 0;
    const baseAiContent = 0; // Base words (JS will display in Billions)

    // Rates Per Second
    const jobsAutomatedRatePerSecond = 0.486; // WEF
    const jobsCreatedRatePerSecond = 0.898; // WEF
    const computePowerIncreasePerSecond = 5.15e18; // Stanford doubling/GPT-4o
    const aiInvestmentRatePerSecond = 7554; // Crunchbase Q1'25
    const aiPatentsRatePerSecond = 0.00238; // ~75k/year estimate
    const aiContentRatePerSecond = 1.15e6; // ~100B words/day estimate

    // Update Interval
    const updateInterval = 100; // 10 times per second

    // --- Calculation Logic ---
    function calculateCurrentValues() {
        const now = new Date();
        const elapsedMilliseconds = now.getTime() - epochDate.getTime();
        const elapsedSeconds = elapsedMilliseconds / 1000;
        const positiveElapsedSeconds = Math.max(0, elapsedSeconds);

        const currentJobsAutomated = baseJobsAutomated + (positiveElapsedSeconds * jobsAutomatedRatePerSecond);
        const currentJobsCreated = baseJobsCreated + (positiveElapsedSeconds * jobsCreatedRatePerSecond);
        const currentComputePower = baseComputePower + (positiveElapsedSeconds * computePowerIncreasePerSecond);
        const currentAiInvestment = baseAiInvestment + (positiveElapsedSeconds * aiInvestmentRatePerSecond);
        const currentAiPatents = baseAiPatents + (positiveElapsedSeconds * aiPatentsRatePerSecond);
        const currentAiContent = baseAiContent + (positiveElapsedSeconds * aiContentRatePerSecond);

        return {
            jobsAutomated: currentJobsAutomated,
            jobsCreated: currentJobsCreated,
            computePower: currentComputePower,
            aiInvestment: currentAiInvestment,
            aiPatents: currentAiPatents,
            aiContent: currentAiContent
        };
    }

    // --- Initialization and Live Update ---
    let currentValues = calculateCurrentValues();

    function updateDisplay() {
        jobsAutomatedElem.textContent = Math.floor(currentValues.jobsAutomated).toLocaleString();
        jobsCreatedElem.textContent = Math.floor(currentValues.jobsCreated).toLocaleString();
        computePowerElem.textContent = currentValues.computePower.toExponential(2);
        aiInvestmentElem.textContent = '$' + Math.floor(currentValues.aiInvestment).toLocaleString();
        aiPatentsElem.textContent = Math.floor(currentValues.aiPatents).toLocaleString();
        // Display AI Content in Billions for better readability
        aiContentElem.textContent = (currentValues.aiContent / 1e9).toFixed(2).toLocaleString();
    }

    updateDisplay(); // Initial display

    setInterval(() => {
        const intervalSeconds = updateInterval / 1000;

        currentValues.jobsAutomated += jobsAutomatedRatePerSecond * intervalSeconds;
        currentValues.jobsCreated += jobsCreatedRatePerSecond * intervalSeconds;
        currentValues.computePower += computePowerIncreasePerSecond * intervalSeconds;
        currentValues.aiInvestment += aiInvestmentRatePerSecond * intervalSeconds;
        currentValues.aiPatents += aiPatentsRatePerSecond * intervalSeconds;
        currentValues.aiContent += aiContentRatePerSecond * intervalSeconds;

        updateDisplay(); // Update display every interval
    }, updateInterval);


    // --- AI Impact Estimator Logic (Unchanged) ---
    const impactButton = document.getElementById('impact-button');
    const jobTitleInput = document.getElementById('job-title-input');
    const impactResultElem = document.getElementById('impact-result');

    impactButton.addEventListener('click', () => {
        const jobTitle = jobTitleInput.value.toLowerCase().trim();
        let risk = "Medium-High";
        if (jobTitle.includes('engineer') || jobTitle.includes('developer') || jobTitle.includes('programmer') || jobTitle.includes('scientist')) {
            risk = "Low";
        } else if (!jobTitle) {
            risk = "Please enter a job title.";
        }
        impactResultElem.textContent = `Estimated Automation Risk: ${risk}`;
    });
    impactResultElem.textContent = "";
    console.log("AI Takeover Clock script loaded and initialized.");


    // --- Modal Logic ---
    const aboutTriggerLink = document.getElementById('about-trigger-link');
    const modalOverlay = document.getElementById('modal-overlay');
    const aboutModal = document.getElementById('about-modal');
    const closeModalBtn = document.getElementById('close-about-modal');

    function openModal() {
        modalOverlay.style.display = 'block';
        aboutModal.style.display = 'block';
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
        aboutModal.style.display = 'none';
    }

    // Event Listeners
    if(aboutTriggerLink) {
        aboutTriggerLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent link from jumping to top
            openModal();
        });
    }

    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if(modalOverlay) {
        modalOverlay.addEventListener('click', closeModal); // Close if overlay is clicked
    }

}); // End of DOMContentLoaded