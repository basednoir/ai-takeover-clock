document.addEventListener('DOMContentLoaded', () => {
    // --- Counter Elements ---
    const jobsAutomatedElem = document.getElementById('jobs-automated-counter');
    const jobsCreatedElem = document.getElementById('jobs-created-counter');
    const computePowerElem = document.getElementById('compute-power-counter');
    const aiInvestmentElem = document.getElementById('ai-investment-counter');
    const aiPatentsElem = document.getElementById('ai-patents-counter');
    // Add elements for future counters here later...

    // --- Configuration ---
    // 1. Define the Epoch Date (Using Jan 1st, 2025 UTC)
    const epochDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0)); // Set to Jan 1, 2025

    // 2. Define Base Values at Epoch Date
    const baseJobsAutomated = 0;   // WEF 2025 context start
    const baseJobsCreated = 0;     // WEF 2025 context start
    const baseComputePower = 3.8e25; // Based on GPT-4o training benchmark
    const baseAiInvestment = 0;    // Tracking investment since epoch date
    const baseAiPatents = 0;       // Tracking patents filed since epoch date

    // 3. Define Rates Per Second (VERIFIED)
    const jobsAutomatedRatePerSecond = 0.486; // WEF Displacement Rate 2025-2030
    const jobsCreatedRatePerSecond = 0.898; // WEF Creation Rate 2025-2030
    const computePowerIncreasePerSecond = 5.15e18; // Derived from 5-month doubling time & base=3.8e25
    const aiInvestmentRatePerSecond = 7554;  // Derived from Q1'25 VC data (~$7.5k/sec)
    const aiPatentsRatePerSecond = 0.00238; // CORRECTED rate from ~75k total AI patents/year

    // Add base values and rates for future counters here later...

    // 4. Update Interval (milliseconds)
    const updateInterval = 100; // Update 10 times per second

    // --- Calculation Logic ---
    function calculateCurrentValues() {
        const now = new Date();
        const elapsedMilliseconds = now.getTime() - epochDate.getTime();
        const elapsedSeconds = elapsedMilliseconds / 1000;
        const positiveElapsedSeconds = Math.max(0, elapsedSeconds); // Ensure time diff isn't negative

        // Calculate current estimated values based on elapsed time
        const currentJobsAutomated = baseJobsAutomated + (positiveElapsedSeconds * jobsAutomatedRatePerSecond);
        const currentJobsCreated = baseJobsCreated + (positiveElapsedSeconds * jobsCreatedRatePerSecond);
        const currentComputePower = baseComputePower + (positiveElapsedSeconds * computePowerIncreasePerSecond);
        const currentAiInvestment = baseAiInvestment + (positiveElapsedSeconds * aiInvestmentRatePerSecond);
        const currentAiPatents = baseAiPatents + (positiveElapsedSeconds * aiPatentsRatePerSecond);

        return {
            jobsAutomated: currentJobsAutomated,
            jobsCreated: currentJobsCreated,
            computePower: currentComputePower,
            aiInvestment: currentAiInvestment,
            aiPatents: currentAiPatents
        };
    }

    // --- Initialization and Live Update ---
    let currentValues = calculateCurrentValues(); // Calculate initial values on load

    // Function to update display elements
    function updateDisplay() {
        jobsAutomatedElem.textContent = Math.floor(currentValues.jobsAutomated).toLocaleString();
        jobsCreatedElem.textContent = Math.floor(currentValues.jobsCreated).toLocaleString();
        computePowerElem.textContent = currentValues.computePower.toExponential(2);
        aiInvestmentElem.textContent = '$' + Math.floor(currentValues.aiInvestment).toLocaleString();
        aiPatentsElem.textContent = Math.floor(currentValues.aiPatents).toLocaleString();
    }

    // Initial display update
    updateDisplay();

    // Live ticking using setInterval
    setInterval(() => {
        const intervalSeconds = updateInterval / 1000;

        // Increment current values based on the interval
        currentValues.jobsAutomated += jobsAutomatedRatePerSecond * intervalSeconds;
        currentValues.jobsCreated += jobsCreatedRatePerSecond * intervalSeconds;
        currentValues.computePower += computePowerIncreasePerSecond * intervalSeconds;
        currentValues.aiInvestment += aiInvestmentRatePerSecond * intervalSeconds;
        currentValues.aiPatents += aiPatentsRatePerSecond * intervalSeconds;

        // Update the display
        updateDisplay();

    }, updateInterval);


    // --- AI Impact Estimator (remains the same) ---
    const impactButton = document.getElementById('impact-button');
    const jobTitleInput = document.getElementById('job-title-input');
    const impactResultElem = document.getElementById('impact-result');

    impactButton.addEventListener('click', () => {
        const jobTitle = jobTitleInput.value.toLowerCase().trim();
        let risk = "Medium-High"; // Default risk

        if (jobTitle.includes('engineer') || jobTitle.includes('developer') || jobTitle.includes('programmer') || jobTitle.includes('scientist')) {
            risk = "Low";
        } else if (!jobTitle) {
            risk = "Please enter a job title.";
        }
        // Add more sophisticated logic here later if needed

        impactResultElem.textContent = `Estimated Automation Risk: ${risk}`;
    });
    impactResultElem.textContent = ""; // Clear initial state
    console.log("AI Takeover Clock script loaded and initialized.");
});