document.addEventListener('DOMContentLoaded', () => {
    // --- Counter Elements ---
    const jobsAutomatedElem = document.getElementById('jobs-automated-counter');
    const jobsCreatedElem = document.getElementById('jobs-created-counter');
    const computePowerElem = document.getElementById('compute-power-counter');

    // --- Configuration ---
    // 1. Define the Epoch Date (Using Jan 1st, 2025 UTC)
    const epochDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0)); // Set to Jan 1, 2025

    // 2. Define Base Values at Epoch Date (Updated based on WEF 2025 report context)
    const baseJobsAutomated = 0; // Base set to 0 for the 2025-2030 measurement period
    const baseJobsCreated = 0;   // Base set to 0 for the 2025-2030 measurement period
    const baseComputePower = 1e15; // Base FLOPS at epoch (Using previous value for now)

    // 3. Define Rates Per Second (Updated based on WEF 2025 report)
    const jobsAutomatedRatePerSecond = 0.486; // WEF Displacement Rate 2025-2030
    const jobsCreatedRatePerSecond = 0.898; // WEF Creation Rate 2025-2030
    const computePowerIncreasePerSecond = 1e13; // Using previous value for now

    // 4. Update Interval (milliseconds)
    const updateInterval = 100; // Update 10 times per second

    // --- Calculation Logic ---
    function calculateCurrentValues() {
        const now = new Date();
        // Ensure 'now' is treated as UTC if epochDate is UTC, or convert both to local time consistently.
        // getTime() returns milliseconds since Jan 1, 1970 UTC, so difference is inherently UTC-based.
        const elapsedMilliseconds = now.getTime() - epochDate.getTime();
        const elapsedSeconds = elapsedMilliseconds / 1000;

        // Calculate current estimated values based on elapsed time
        // Ensure elapsedSeconds is not negative if clock is slightly ahead of epochDate
        const positiveElapsedSeconds = Math.max(0, elapsedSeconds);

        const currentJobsAutomated = baseJobsAutomated + (positiveElapsedSeconds * jobsAutomatedRatePerSecond);
        const currentJobsCreated = baseJobsCreated + (positiveElapsedSeconds * jobsCreatedRatePerSecond);
        const currentComputePower = baseComputePower + (positiveElapsedSeconds * computePowerIncreasePerSecond);

        return {
            jobsAutomated: currentJobsAutomated,
            jobsCreated: currentJobsCreated,
            computePower: currentComputePower
        };
    }

    // --- Initialization and Live Update ---
    let currentValues = calculateCurrentValues(); // Calculate initial values on load

    // Function to update display elements
    function updateDisplay() {
        jobsAutomatedElem.textContent = Math.floor(currentValues.jobsAutomated).toLocaleString();
        jobsCreatedElem.textContent = Math.floor(currentValues.jobsCreated).toLocaleString();
        computePowerElem.textContent = currentValues.computePower.toExponential(2);
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