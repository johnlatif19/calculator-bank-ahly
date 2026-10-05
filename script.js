(function() {
    const amountInput = document.getElementById('amountInput');
    const calcBtn = document.getElementById('calcBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsContainer = document.getElementById('resultsContainer');

    const monthlyValueEl = document.getElementById('monthlyValue');
    const yearlyValueEl = document.getElementById('yearlyValue');
    const totalInterestValueEl = document.getElementById('totalInterestValue');
    const principalValueEl = document.getElementById('principalValue');
    const totalAmountValueEl = document.getElementById('totalAmountValue');

    const ANNUAL_RATE = 0.1775;
    const YEARS = 3;
    const MONTHS_IN_YEAR = 12;

    function formatNumber(num) {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function updateResults(amount, monthly = 0, yearly = 0, totalInterest = 0, totalAmount = 0) {
        if (amount <= 0 || isNaN(amount)) {
            monthlyValueEl.innerHTML = `0.00 <span class="currency">ج.م</span>`;
            yearlyValueEl.innerHTML = `0.00 <span class="currency">ج.م</span>`;
            totalInterestValueEl.innerHTML = `0.00 <span class="currency">ج.م</span>`;
            principalValueEl.innerHTML = `0.00 <span class="currency">ج.م</span>`;
            totalAmountValueEl.innerHTML = `0.00 <span class="currency">ج.م</span>`;
            return;
        }

        monthlyValueEl.innerHTML = `${formatNumber(monthly)} <span class="currency">ج.م</span>`;
        yearlyValueEl.innerHTML = `${formatNumber(yearly)} <span class="currency">ج.م</span>`;
        totalInterestValueEl.innerHTML = `${formatNumber(totalInterest)} <span class="currency">ج.م</span>`;
        principalValueEl.innerHTML = `${formatNumber(amount)} <span class="currency">ج.م</span>`;
        totalAmountValueEl.innerHTML = `${formatNumber(totalAmount)} <span class="currency">ج.م</span>`;
    }

    function calculateAndDisplay() {
        const rawValue = amountInput.value.trim();
        const amount = parseFloat(rawValue);

        if (isNaN(amount) || amount <= 0) {
            if (rawValue !== '' && (isNaN(amount) || amount < 0)) {
                alert('الرجاء إدخال مبلغ صحيح أكبر من صفر');
            }
            updateResults(0);
            resultsContainer.classList.add('hidden');
            resultsContainer.classList.remove('visible');
            return;
        }

        const monthlyInterest = amount * ANNUAL_RATE / MONTHS_IN_YEAR;
        const yearlyInterest = amount * ANNUAL_RATE;
        const totalInterest3Years = amount * ANNUAL_RATE * YEARS;
        const totalAmountAfter3Years = amount + totalInterest3Years;

        updateResults(amount, monthlyInterest, yearlyInterest, totalInterest3Years, totalAmountAfter3Years);

        resultsContainer.classList.remove('hidden');
        resultsContainer.classList.remove('visible');
        void resultsContainer.offsetWidth;
        resultsContainer.classList.add('visible');
    }

    function resetCalculator() {
        amountInput.value = '';
        resultsContainer.classList.add('hidden');
        resultsContainer.classList.remove('visible');
        updateResults(0);
        amountInput.focus();
    }

    calcBtn.addEventListener('click', function(e) {
        e.preventDefault();
        calculateAndDisplay();
    });

    resetBtn.addEventListener('click', function(e) {
        e.preventDefault();
        resetCalculator();
    });

    amountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateAndDisplay();
        }
    });

    amountInput.addEventListener('paste', function(e) {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const numericValue = pastedText.replace(/[^0-9.]/g, '');
        if (numericValue) {
            amountInput.value = numericValue;
        }
    });
})();
