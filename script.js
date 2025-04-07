document.addEventListener('DOMContentLoaded', () => {
    // --- Counter Elements ---
    const jobsAutomatedElem = document.getElementById('jobs-automated-counter');
    const jobsCreatedElem = document.getElementById('jobs-created-counter');
    const computePowerElem = document.getElementById('compute-power-counter');

    // --- Initial Values & Rates ---
    let jobsAutomated = 0; // Start from 0 or a base number if desired
    let jobsCreated = 0;   // Start from 0 or a base number if desired
    let computePower = 1e15; // 1 * 10^15 FLOPS

    const jobsAutomatedRatePerSecond = 47;
    const jobsCreatedRatePerSecond = 31;
    const computePowerIncreasePerSecond = 1e13; // 1 * 10^13 FLOPS/sec

    // --- Update Interval (milliseconds) ---
    const updateInterval = 100; // Update 10 times per second for smoother visual

    // --- Counter Update Logic ---
    setInterval(() => {
        // Calculate increment based on interval duration
        const intervalSeconds = updateInterval / 1000;

        jobsAutomated += jobsAutomatedRatePerSecond * intervalSeconds;
        jobsCreated += jobsCreatedRatePerSecond * intervalSeconds;
        computePower += computePowerIncreasePerSecond * intervalSeconds;

        // Update DOM
        jobsAutomatedElem.textContent = Math.floor(jobsAutomated).toLocaleString();
        jobsCreatedElem.textContent = Math.floor(jobsCreated).toLocaleString();
        // Format compute power using toExponential for large numbers
        computePowerElem.textContent = computePower.toExponential(2);

    }, updateInterval);

    // --- AI Impact Estimator ---
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

    // --- Initial Local Test ---
    // You can manually test the impact function by calling it here or just rely on button click
    console.log("AI Takeover Clock script loaded.");
    // Test initial calculation (optional)
    impactResultElem.textContent = ""; // Clear initial state
});