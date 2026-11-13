/* =================================
   REPORTS & ANALYTICS MODULE
   Digital Library Management System
================================= */

// Default Books List
const defaultBooks = [
    {
        name: "HTML and CSS",
        bookName: "HTML and CSS",
        author: "Jon Duckett",
        category: "Programming",
        isbn: "9781118008188",
        pickingDate: "2026-03-15",
        quantity: 5
    },
    {
        name: "JavaScript",
        bookName: "JavaScript",
        author: "David Flanagan",
        category: "Programming",
        isbn: "9780596805524",
        pickingDate: "2026-03-20",
        quantity: 3
    },
    {
        name: "Java Programming",
        bookName: "Java Programming",
        author: "James Gosling",
        category: "Programming",
        isbn: "9780134685991",
        pickingDate: "2026-04-01",
        quantity: 4
    },
    {
        name: "The Alchemist",
        bookName: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        isbn: "9780062315007",
        pickingDate: "2026-02-10",
        quantity: 6
    },
    {
        name: "Psychology of Money",
        bookName: "Psychology of Money",
        author: "Morgan Housel",
        category: "Finance",
        isbn: "9789390166268",
        pickingDate: "2026-01-18",
        quantity: 7
    },
    {
        name: "Atomic Habits",
        bookName: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        isbn: "9780735211292",
        pickingDate: "2026-02-25",
        quantity: 8
    },
    {
        name: "Ikigai",
        bookName: "Ikigai",
        author: "Héctor García",
        category: "Philosophy",
        isbn: "9781786330895",
        pickingDate: "2026-03-01",
        quantity: 4
    },
    {
        name: "Rich Dad Poor Dad",
        bookName: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Finance",
        isbn: "9781612680194",
        pickingDate: "2026-03-10",
        quantity: 5
    }
];

// Default Members List
const defaultMembers = [
    {
        memberId: "LIB-M001",
        name: "Alexander Wright",
        department: "Computer Science",
        email: "alexander.w@univ.edu",
        mobile: "9876543210"
    },
    {
        memberId: "LIB-M002",
        name: "Sophia Martinez",
        department: "Information Technology",
        email: "sophia.m@univ.edu",
        mobile: "9876543211"
    },
    {
        memberId: "LIB-M003",
        name: "Ethan Johnson",
        department: "Mechanical Engineering",
        email: "ethan.j@univ.edu",
        mobile: "9876543212"
    },
    {
        memberId: "LIB-M004",
        name: "Emma Watson",
        department: "Literature & Arts",
        email: "emma.w@univ.edu",
        mobile: "9876543213"
    },
    {
        memberId: "LIB-M005",
        name: "Liam Davis",
        department: "Business Administration",
        email: "liam.d@univ.edu",
        mobile: "9876543214"
    },
    {
        memberId: "LIB-M006",
        name: "Olivia Chen",
        department: "Data Science",
        email: "olivia.c@univ.edu",
        mobile: "9876543215"
    }
];

// Comprehensive Seed Historical Transactions Across Months
const defaultIssuedBooksSeed = [
    {
        issueId: "ISS-1001",
        isbn: "9780062315007",
        bookTitle: "The Alchemist",
        author: "Paulo Coelho",
        memberId: "LIB-M001",
        memberName: "Alexander Wright",
        department: "Computer Science",
        email: "alexander.w@univ.edu",
        issueDate: "2026-10-15",
        dueDate: "2026-10-30",
        status: "Issued",
        returnDate: null
    },
    {
        issueId: "ISS-1002",
        isbn: "9780735211292",
        bookTitle: "Atomic Habits",
        author: "James Clear",
        memberId: "LIB-M002",
        memberName: "Sophia Martinez",
        department: "Information Technology",
        email: "sophia.m@univ.edu",
        issueDate: "2026-10-20",
        dueDate: "2026-11-04",
        status: "Issued",
        returnDate: null
    },
    {
        issueId: "ISS-1003",
        isbn: "9781118008188",
        bookTitle: "HTML and CSS",
        author: "Jon Duckett",
        memberId: "LIB-M003",
        memberName: "Ethan Johnson",
        department: "Mechanical Engineering",
        email: "ethan.j@univ.edu",
        issueDate: "2026-10-01",
        dueDate: "2026-10-16",
        status: "Returned",
        returnDate: "2026-10-14"
    },
    {
        issueId: "ISS-1004",
        isbn: "9789390166268",
        bookTitle: "Psychology of Money",
        author: "Morgan Housel",
        memberId: "LIB-M005",
        memberName: "Liam Davis",
        department: "Business Administration",
        email: "liam.d@univ.edu",
        issueDate: "2026-09-08",
        dueDate: "2026-09-23",
        status: "Returned",
        returnDate: "2026-09-22"
    },
    {
        issueId: "ISS-1005",
        isbn: "9780134685991",
        bookTitle: "Java Programming",
        author: "James Gosling",
        memberId: "LIB-M002",
        memberName: "Sophia Martinez",
        department: "Information Technology",
        email: "sophia.m@univ.edu",
        issueDate: "2026-09-15",
        dueDate: "2026-09-30",
        status: "Returned",
        returnDate: "2026-09-29"
    },
    {
        issueId: "ISS-1006",
        isbn: "9781786330895",
        bookTitle: "Ikigai",
        author: "Héctor García",
        memberId: "LIB-M004",
        memberName: "Emma Watson",
        department: "Literature & Arts",
        email: "emma.w@univ.edu",
        issueDate: "2026-08-10",
        dueDate: "2026-08-25",
        status: "Returned",
        returnDate: "2026-08-24"
    },
    {
        issueId: "ISS-1007",
        isbn: "9781612680194",
        bookTitle: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        memberId: "LIB-M006",
        memberName: "Olivia Chen",
        department: "Data Science",
        email: "olivia.c@univ.edu",
        issueDate: "2026-08-18",
        dueDate: "2026-09-02",
        status: "Returned",
        returnDate: "2026-09-01"
    },
    {
        issueId: "ISS-1008",
        isbn: "9780596805524",
        bookTitle: "JavaScript",
        author: "David Flanagan",
        memberId: "LIB-M001",
        memberName: "Alexander Wright",
        department: "Computer Science",
        email: "alexander.w@univ.edu",
        issueDate: "2026-10-28",
        dueDate: "2026-11-12",
        status: "Issued",
        returnDate: null
    },
    {
        issueId: "ISS-1009",
        isbn: "9781118008188",
        bookTitle: "HTML and CSS",
        author: "Jon Duckett",
        memberId: "LIB-M004",
        memberName: "Emma Watson",
        department: "Literature & Arts",
        email: "emma.w@univ.edu",
        issueDate: "2026-11-01",
        dueDate: "2026-11-16",
        status: "Issued",
        returnDate: null
    },
    {
        issueId: "ISS-1010",
        isbn: "9780062315007",
        bookTitle: "The Alchemist",
        author: "Paulo Coelho",
        memberId: "LIB-M003",
        memberName: "Ethan Johnson",
        department: "Mechanical Engineering",
        email: "ethan.j@univ.edu",
        issueDate: "2026-09-22",
        dueDate: "2026-10-07",
        status: "Returned",
        returnDate: "2026-10-05"
    },
    {
        issueId: "ISS-1011",
        isbn: "9789390166268",
        bookTitle: "Psychology of Money",
        author: "Morgan Housel",
        memberId: "LIB-M001",
        memberName: "Alexander Wright",
        department: "Computer Science",
        email: "alexander.w@univ.edu",
        issueDate: "2026-10-08",
        dueDate: "2026-10-23",
        status: "Returned",
        returnDate: "2026-10-21"
    },
    {
        issueId: "ISS-1012",
        isbn: "9781786330895",
        bookTitle: "Ikigai",
        author: "Héctor García",
        memberId: "LIB-M006",
        memberName: "Olivia Chen",
        department: "Data Science",
        email: "olivia.c@univ.edu",
        issueDate: "2026-11-02",
        dueDate: "2026-11-17",
        status: "Issued",
        returnDate: null
    }
];

/* =================================
   STORAGE HELPERS
================================= */

function getStoredBooks() {
    const stored = localStorage.getItem("books") || localStorage.getItem("registeredBooks");
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        } catch (e) {
            console.error("Error loading books:", e);
        }
    }
    localStorage.setItem("books", JSON.stringify(defaultBooks));
    localStorage.setItem("registeredBooks", JSON.stringify(defaultBooks));
    return defaultBooks.slice();
}

function getStoredMembers() {
    const stored = localStorage.getItem("members");
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        } catch (e) {
            console.error("Error loading members:", e);
        }
    }
    localStorage.setItem("members", JSON.stringify(defaultMembers));
    return defaultMembers.slice();
}

function getStoredIssuedBooks() {
    const stored = localStorage.getItem("issuedBooks");
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                // If the user only has the minimal 3 initial records, enrich with historical seed data for month-wise reporting
                if (parsed.length <= 3) {
                    const existingIds = new Set(parsed.map(item => item.issueId));
                    const merged = parsed.slice();
                    defaultIssuedBooksSeed.forEach(seed => {
                        if (!existingIds.has(seed.issueId)) {
                            merged.push(seed);
                        }
                    });
                    localStorage.setItem("issuedBooks", JSON.stringify(merged));
                    return merged;
                }
                return parsed;
            }
        } catch (e) {
            console.error("Error loading issued books:", e);
        }
    }
    localStorage.setItem("issuedBooks", JSON.stringify(defaultIssuedBooksSeed));
    return defaultIssuedBooksSeed.slice();
}

/* =================================
   DATE & UTILITY HELPERS
================================= */

function getTodayString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function calculateDaysDifference(dateStr1, dateStr2) {
    if (!dateStr1 || !dateStr2) return 0;
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    const diffTime = d1 - d2;
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function formatDatePretty(dateStr) {
    if (!dateStr) return "-";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = parseInt(parts[1], 10) - 1;
    return `${months[monthIndex]} ${parseInt(parts[2], 10)}, ${parts[0]}`;
}

function getMonthYearKey(dateStr) {
    if (!dateStr) return "";
    return dateStr.substring(0, 7); // e.g., "2026-10"
}

function getMonthYearLabel(yearMonthKey) {
    if (!yearMonthKey) return "";
    const [year, month] = yearMonthKey.split("-");
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthIdx = parseInt(month, 10) - 1;
    return `${monthNames[monthIdx]} ${year}`;
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../Login/loginPage.html";
}

/* =================================
   STATE
================================= */

let currentTab = "tab-month-wise";
let selectedMonth = "all";
let selectedMonthStatus = "all";
let historySearch = "";
let historyDateFrom = "";
let historyDateTo = "";
let historyTypeFilter = "all";

/* =================================
   INITIALIZATION
================================= */

document.addEventListener("DOMContentLoaded", function () {
    initReports();
});

// Storage sync
window.addEventListener("storage", function (e) {
    if (e.key === "issuedBooks" || e.key === "books" || e.key === "members") {
        initReports();
    }
});

function initReports() {
    updateGlobalKPIs();
    populateMonthOptions();
    renderMonthWiseReport();
    renderHistoryReport();
    renderBookCirculationReport();
    renderMemberActivityReport();
    renderOverdueReport();
}

/* =================================
   TAB SWITCHING
================================= */

function switchReportTab(tabId) {
    currentTab = tabId;

    // Update Tab Buttons
    const buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update Tab Panels
    const panels = document.querySelectorAll(".tab-panel");
    panels.forEach(panel => {
        if (panel.id === tabId) {
            panel.classList.add("active-panel");
        } else {
            panel.classList.remove("active-panel");
        }
    });
}

/* =================================
   GLOBAL KPI COUNTERS
================================= */

function updateGlobalKPIs() {
    const transactions = getStoredIssuedBooks();
    const todayStr = getTodayString();

    const totalCount = transactions.length;
    const returnedCount = transactions.filter(t => t.status === "Returned").length;
    const issuedCount = transactions.length; // lifetime issues
    const activeCount = transactions.filter(t => t.status === "Issued" && (!t.dueDate || t.dueDate >= todayStr)).length;
    const overdueCount = transactions.filter(t => t.status === "Issued" && t.dueDate && t.dueDate < todayStr).length;

    const kpiTotalTransactions = document.getElementById("kpiTotalTransactions");
    const kpiTotalIssued = document.getElementById("kpiTotalIssued");
    const kpiTotalReturned = document.getElementById("kpiTotalReturned");
    const kpiOverdueActive = document.getElementById("kpiOverdueActive");
    const kpiOverdueSub = document.getElementById("kpiOverdueSub");

    if (kpiTotalTransactions) kpiTotalTransactions.textContent = totalCount;
    if (kpiTotalIssued) kpiTotalIssued.textContent = issuedCount;
    if (kpiTotalReturned) kpiTotalReturned.textContent = returnedCount;
    if (kpiOverdueActive) kpiOverdueActive.textContent = activeCount + overdueCount;
    if (kpiOverdueSub) kpiOverdueSub.textContent = `${overdueCount} overdue \u2022 ${activeCount} active loan${activeCount === 1 ? '' : 's'}`;
}

/* =================================
   TAB 1: MONTH-WISE REPORT
================================= */

function populateMonthOptions() {
    const transactions = getStoredIssuedBooks();
    const monthSelect = document.getElementById("monthSelect");
    const pillsContainer = document.getElementById("monthPillsContainer");
    if (!monthSelect) return;

    // Extract unique months from issueDate and returnDate
    const monthsSet = new Set();
    transactions.forEach(t => {
        if (t.issueDate) monthsSet.add(getMonthYearKey(t.issueDate));
        if (t.returnDate) monthsSet.add(getMonthYearKey(t.returnDate));
    });

    const sortedMonths = Array.from(monthsSet).filter(Boolean).sort().reverse();

    // Preserve selection
    const prevSelected = monthSelect.value || "all";
    monthSelect.innerHTML = `<option value="all">All Months (Aggregate View)</option>`;

    sortedMonths.forEach(mKey => {
        const option = document.createElement("option");
        option.value = mKey;
        option.textContent = getMonthYearLabel(mKey);
        monthSelect.appendChild(option);
    });

    monthSelect.value = prevSelected;

    // Render Quick Filter Pills
    if (pillsContainer) {
        pillsContainer.innerHTML = `<span class="quick-pill-label">Quick View:</span>`;

        const allPill = document.createElement("button");
        allPill.type = "button";
        allPill.className = `pill-btn ${selectedMonth === 'all' ? 'active' : ''}`;
        allPill.textContent = "All Time";
        allPill.onclick = () => selectMonthQuick("all");
        pillsContainer.appendChild(allPill);

        sortedMonths.forEach(mKey => {
            const pill = document.createElement("button");
            pill.type = "button";
            pill.className = `pill-btn ${selectedMonth === mKey ? 'active' : ''}`;
            pill.textContent = getMonthYearLabel(mKey);
            pill.onclick = () => selectMonthQuick(mKey);
            pillsContainer.appendChild(pill);
        });
    }
}

function onMonthFilterChange() {
    const monthSelect = document.getElementById("monthSelect");
    const statusSelect = document.getElementById("monthStatusFilter");
    if (monthSelect) selectedMonth = monthSelect.value;
    if (statusSelect) selectedMonthStatus = statusSelect.value;

    // Update pill active classes
    const pills = document.querySelectorAll("#monthPillsContainer .pill-btn");
    pills.forEach(p => {
        if ((selectedMonth === "all" && p.textContent === "All Time") || p.textContent === getMonthYearLabel(selectedMonth)) {
            p.classList.add("active");
        } else {
            p.classList.remove("active");
        }
    });

    renderMonthWiseReport();
}

function selectMonthQuick(monthKey) {
    selectedMonth = monthKey;
    const monthSelect = document.getElementById("monthSelect");
    if (monthSelect) monthSelect.value = monthKey;

    const pills = document.querySelectorAll("#monthPillsContainer .pill-btn");
    pills.forEach(p => {
        if ((monthKey === "all" && p.textContent === "All Time") || p.textContent === getMonthYearLabel(monthKey)) {
            p.classList.add("active");
        } else {
            p.classList.remove("active");
        }
    });

    renderMonthWiseReport();
}

function renderMonthWiseReport() {
    const transactions = getStoredIssuedBooks();
    const todayStr = getTodayString();

    // 1. Filter Transactions by month and status
    const monthFiltered = transactions.filter(t => {
        // Month check
        if (selectedMonth !== "all") {
            const issueMonth = getMonthYearKey(t.issueDate);
            const returnMonth = getMonthYearKey(t.returnDate);
            if (issueMonth !== selectedMonth && returnMonth !== selectedMonth) {
                return false;
            }
        }

        // Status check
        if (selectedMonthStatus === "issued" && t.status !== "Issued") return false;
        if (selectedMonthStatus === "returned" && t.status !== "Returned") return false;
        if (selectedMonthStatus === "overdue") {
            const isOverdue = t.status === "Issued" && t.dueDate && t.dueDate < todayStr;
            if (!isOverdue) return false;
        }

        return true;
    });

    // 2. Compute Mini Stats for Selected Month
    const targetTransactions = selectedMonth === "all"
        ? transactions
        : transactions.filter(t => getMonthYearKey(t.issueDate) === selectedMonth || getMonthYearKey(t.returnDate) === selectedMonth);

    const monthIssues = targetTransactions.filter(t => selectedMonth === "all" ? true : getMonthYearKey(t.issueDate) === selectedMonth).length;
    const monthReturns = targetTransactions.filter(t => t.status === "Returned" && (selectedMonth === "all" ? true : getMonthYearKey(t.returnDate) === selectedMonth)).length;
    const monthOverdue = targetTransactions.filter(t => t.status === "Issued" && t.dueDate && t.dueDate < todayStr).length;
    const totalVolume = monthIssues + monthReturns;
    const returnRate = monthIssues > 0 ? Math.round((monthReturns / monthIssues) * 100) : (monthReturns > 0 ? 100 : 0);

    const elVol = document.getElementById("mStatTotalVolume");
    const elIssues = document.getElementById("mStatIssues");
    const elReturns = document.getElementById("mStatReturns");
    const elRate = document.getElementById("mStatReturnRate");
    const elOverdue = document.getElementById("mStatOverdue");

    if (elVol) elVol.textContent = totalVolume;
    if (elIssues) elIssues.textContent = monthIssues;
    if (elReturns) elReturns.textContent = monthReturns;
    if (elRate) elRate.textContent = `${returnRate}%`;
    if (elOverdue) elOverdue.textContent = monthOverdue;

    // 3. Render Visual Comparison Bar Chart
    renderMonthlyBarChart(transactions);

    // 4. Populate Month Transactions Table
    const tableBody = document.getElementById("monthTableBody");
    const tableCountBadge = document.getElementById("monthTableCountBadge");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    if (tableCountBadge) {
        tableCountBadge.textContent = `${monthFiltered.length} Record${monthFiltered.length === 1 ? '' : 's'}`;
    }

    if (monthFiltered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-state-cell">
                    <div class="empty-state-content">
                        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <strong>No transactions found for the selected month filter.</strong>
                        <span>Try selecting "All Months" or clearing your status filter to view other records.</span>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    monthFiltered.forEach((t, idx) => {
        const isOverdue = t.status === "Issued" && t.dueDate && t.dueDate < todayStr;
        const isReturned = t.status === "Returned";

        let statusBadge = "";
        if (isReturned) {
            statusBadge = `<span class="status-badge status-returned">Returned on ${formatDatePretty(t.returnDate)}</span>`;
        } else if (isOverdue) {
            const daysOver = calculateDaysDifference(todayStr, t.dueDate);
            statusBadge = `<span class="status-badge status-overdue">Overdue by ${daysOver} day${daysOver === 1 ? '' : 's'}</span>`;
        } else {
            const daysLeft = calculateDaysDifference(t.dueDate, todayStr);
            statusBadge = `<span class="status-badge status-issued">${daysLeft >= 0 ? daysLeft + ' days left' : 'Active'}</span>`;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${idx + 1}</td>
            <td><span class="issue-id-badge">${t.issueId}</span></td>
            <td>
                <span class="book-title-cell">${t.bookTitle}</span>
                <span class="book-sub-cell">${t.author || 'Author'} &bull; ${t.isbn || '-'}</span>
            </td>
            <td>
                <span class="member-name-cell">${t.memberName}</span>
                <span class="member-sub-cell">${t.memberId} &bull; ${t.department || 'General'}</span>
            </td>
            <td><strong>${formatDatePretty(t.issueDate)}</strong></td>
            <td>
                <div class="due-date-pill">
                    <span class="due-date-val">${formatDatePretty(t.dueDate)}</span>
                    <span class="due-date-sub">15-day loan</span>
                </div>
            </td>
            <td>${t.returnDate ? formatDatePretty(t.returnDate) : '<span style="color:#94a3b8;">Not Returned</span>'}</td>
            <td>${statusBadge}</td>
            <td>
                <button type="button" class="table-btn view-btn" onclick="openTransactionReceipt('${t.issueId}')" title="View Transaction Receipt">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Details
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function renderMonthlyBarChart(transactions) {
    const chartContainer = document.getElementById("monthlyChartBars");
    if (!chartContainer) return;

    // Collect months
    const monthStats = {};
    transactions.forEach(t => {
        if (t.issueDate) {
            const mKey = getMonthYearKey(t.issueDate);
            if (!monthStats[mKey]) monthStats[mKey] = { issues: 0, returns: 0, label: getMonthYearLabel(mKey) };
            monthStats[mKey].issues++;
        }
        if (t.returnDate) {
            const mKey = getMonthYearKey(t.returnDate);
            if (!monthStats[mKey]) monthStats[mKey] = { issues: 0, returns: 0, label: getMonthYearLabel(mKey) };
            monthStats[mKey].returns++;
        }
    });

    const sortedMonthKeys = Object.keys(monthStats).sort(); // chronological order
    if (sortedMonthKeys.length === 0) {
        chartContainer.innerHTML = `<p style="color:#94a3b8; text-align:center; width:100%;">No monthly transaction data available.</p>`;
        return;
    }

    // Find max value for bar height scaling
    let maxVal = 1;
    sortedMonthKeys.forEach(mKey => {
        maxVal = Math.max(maxVal, monthStats[mKey].issues, monthStats[mKey].returns);
    });

    chartContainer.innerHTML = "";

    sortedMonthKeys.forEach(mKey => {
        const stats = monthStats[mKey];
        const issueHeight = Math.max(8, Math.round((stats.issues / maxVal) * 125));
        const returnHeight = Math.max(8, Math.round((stats.returns / maxVal) * 125));

        const group = document.createElement("div");
        group.className = "month-bar-group";
        group.innerHTML = `
            <div class="bars-pair">
                <div class="bar bar-issue" style="height: ${issueHeight}px;" title="${stats.issues} Issued in ${stats.label}">
                    <span class="bar-tooltip">${stats.issues} Issued</span>
                </div>
                <div class="bar bar-return" style="height: ${returnHeight}px;" title="${stats.returns} Returned in ${stats.label}">
                    <span class="bar-tooltip">${stats.returns} Returned</span>
                </div>
            </div>
            <div class="month-label">${stats.label.split(" ")[0]}</div>
        `;
        chartContainer.appendChild(group);
    });
}

/* =================================
   TAB 2: TRANSACTION HISTORY & AUDIT LOG
================================= */

function onHistorySearchInput() {
    const input = document.getElementById("historySearchInput");
    const clearBtn = document.getElementById("historyClearSearch");
    if (!input) return;

    historySearch = input.value.trim().toLowerCase();
    if (clearBtn) {
        clearBtn.style.display = historySearch ? "block" : "none";
    }
    renderHistoryReport();
}

function clearHistorySearch() {
    const input = document.getElementById("historySearchInput");
    const clearBtn = document.getElementById("historyClearSearch");
    if (input) input.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    historySearch = "";
    renderHistoryReport();
}

function onHistoryDateFilterChange() {
    const fromInput = document.getElementById("historyDateFrom");
    const toInput = document.getElementById("historyDateTo");
    if (fromInput) historyDateFrom = fromInput.value;
    if (toInput) historyDateTo = toInput.value;
    renderHistoryReport();
}

function resetHistoryDateFilter() {
    const fromInput = document.getElementById("historyDateFrom");
    const toInput = document.getElementById("historyDateTo");
    if (fromInput) fromInput.value = "";
    if (toInput) toInput.value = "";
    historyDateFrom = "";
    historyDateTo = "";
    renderHistoryReport();
}

function onHistoryTypeFilterChange() {
    const select = document.getElementById("historyTypeFilter");
    if (select) historyTypeFilter = select.value;
    renderHistoryReport();
}

function renderHistoryReport() {
    const transactions = getStoredIssuedBooks();
    const tableBody = document.getElementById("historyTableBody");
    const countBadge = document.getElementById("historyTableCountBadge");
    const todayStr = getTodayString();
    if (!tableBody) return;

    // Filter History records
    const filtered = transactions.filter(t => {
        // Search Filter
        if (historySearch) {
            const q = historySearch;
            const matchId = (t.issueId || "").toLowerCase().includes(q);
            const matchTitle = (t.bookTitle || "").toLowerCase().includes(q);
            const matchAuthor = (t.author || "").toLowerCase().includes(q);
            const matchMember = (t.memberName || "").toLowerCase().includes(q);
            const matchMemberId = (t.memberId || "").toLowerCase().includes(q);
            const matchDept = (t.department || "").toLowerCase().includes(q);
            const matchIsbn = (t.isbn || "").toLowerCase().includes(q);
            if (!matchId && !matchTitle && !matchAuthor && !matchMember && !matchMemberId && !matchDept && !matchIsbn) {
                return false;
            }
        }

        // Date Range (filters by issueDate or returnDate)
        if (historyDateFrom) {
            const d = t.issueDate;
            if (d && d < historyDateFrom) return false;
        }
        if (historyDateTo) {
            const d = t.issueDate;
            if (d && d > historyDateTo) return false;
        }

        // Event Type
        if (historyTypeFilter === "issues" && t.status !== "Issued") return false;
        if (historyTypeFilter === "returns" && t.status !== "Returned") return false;
        if (historyTypeFilter === "overdue") {
            const isOverdue = t.status === "Issued" && t.dueDate && t.dueDate < todayStr;
            if (!isOverdue) return false;
        }

        return true;
    });

    tableBody.innerHTML = "";
    if (countBadge) {
        countBadge.textContent = `${filtered.length} of ${transactions.length} Records`;
    }

    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-state-cell">
                    <div class="empty-state-content">
                        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 14 14"></polyline>
                            <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path>
                        </svg>
                        <strong>No transaction history records match your search criteria.</strong>
                        <span>Try adjusting your search terms, date range, or event type filter.</span>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach((t, idx) => {
        const isReturned = t.status === "Returned";
        const isOverdue = t.status === "Issued" && t.dueDate && t.dueDate < todayStr;

        let eventBadge = "";
        let statusBadge = "";

        if (isReturned) {
            eventBadge = `<span class="event-badge event-return">&#10003; Return Event</span>`;
            statusBadge = `<span class="status-badge status-returned">Completed (${formatDatePretty(t.returnDate)})</span>`;
        } else if (isOverdue) {
            const daysOver = calculateDaysDifference(todayStr, t.dueDate);
            eventBadge = `<span class="event-badge event-issue">&#8658; Active Loan</span>`;
            statusBadge = `<span class="status-badge status-overdue">Overdue (${daysOver}d)</span>`;
        } else {
            eventBadge = `<span class="event-badge event-issue">&#8658; Active Loan</span>`;
            statusBadge = `<span class="status-badge status-issued">Active (In Borrow Period)</span>`;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${idx + 1}</td>
            <td><span class="issue-id-badge">${t.issueId}</span></td>
            <td>${eventBadge}</td>
            <td>
                <span class="book-title-cell">${t.bookTitle}</span>
                <span class="book-sub-cell">${t.author || 'Author'} &bull; ${t.isbn || '-'}</span>
            </td>
            <td>
                <span class="member-name-cell">${t.memberName}</span>
                <span class="member-sub-cell">${t.memberId} &bull; ${t.department || 'General'}</span>
            </td>
            <td><strong>${formatDatePretty(t.issueDate)}</strong></td>
            <td><span class="due-date-val">${formatDatePretty(t.dueDate)}</span></td>
            <td>${statusBadge}</td>
            <td>
                <button type="button" class="table-btn view-btn" onclick="openTransactionReceipt('${t.issueId}')" title="View Full Receipt">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    Receipt
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

/* =================================
   TAB 3: BOOK CIRCULATION & STOCK
================================= */

function renderBookCirculationReport() {
    const books = getStoredBooks();
    const transactions = getStoredIssuedBooks();
    const todayStr = getTodayString();

    const tableBody = document.getElementById("bookCirculationTableBody");
    const countBadge = document.getElementById("bookCirculationCountBadge");
    const popularList = document.getElementById("popularBooksContainer");
    if (!tableBody) return;

    // Calculate borrow count & currently checked out copies for each book
    const borrowFrequency = {};
    const currentlyOut = {};

    transactions.forEach(t => {
        const titleKey = (t.bookTitle || "").toLowerCase().trim();
        borrowFrequency[titleKey] = (borrowFrequency[titleKey] || 0) + 1;

        if (t.status === "Issued") {
            currentlyOut[titleKey] = (currentlyOut[titleKey] || 0) + 1;
        }
    });

    let totalStockUnits = 0;
    let totalCurrentlyBorrowed = 0;

    const bookStatsList = books.map(b => {
        const title = b.bookName || b.name || "Untitled";
        const titleKey = title.toLowerCase().trim();
        const baseQty = Number(b.quantity !== undefined ? b.quantity : (b.bookCount || 4));
        const outCount = currentlyOut[titleKey] || 0;
        const totalStock = baseQty + outCount; // total capacity
        const timesBorrowed = borrowFrequency[titleKey] || 0;

        totalStockUnits += totalStock;
        totalCurrentlyBorrowed += outCount;

        return {
            title: title,
            author: b.author || "Unknown",
            category: b.category || "General",
            isbn: b.isbn || "-",
            totalStock: totalStock,
            borrowed: outCount,
            available: baseQty,
            borrowCount: timesBorrowed
        };
    });

    // Update KPIs
    const elTitles = document.getElementById("cStatTotalTitles");
    const elUnits = document.getElementById("cStatTotalUnits");
    const elOut = document.getElementById("cStatBorrowedUnits");
    const elAvailable = document.getElementById("cStatAvailableUnits");

    if (elTitles) elTitles.textContent = books.length;
    if (elUnits) elUnits.textContent = totalStockUnits;
    if (elOut) elOut.textContent = totalCurrentlyBorrowed;
    if (elAvailable) elAvailable.textContent = Math.max(0, totalStockUnits - totalCurrentlyBorrowed);

    // Top 5 Popular Books
    if (popularList) {
        const sortedByPopularity = bookStatsList.slice().sort((a, b) => b.borrowCount - a.borrowCount).slice(0, 5);
        popularList.innerHTML = "";
        sortedByPopularity.forEach((b, idx) => {
            const item = document.createElement("div");
            item.className = "popular-book-item";
            item.innerHTML = `
                <div class="book-rank">${idx + 1}</div>
                <div class="popular-book-info">
                    <div class="popular-book-name">${b.title}</div>
                    <div class="popular-book-meta">${b.category} &bull; by ${b.author}</div>
                </div>
                <div class="borrow-count-badge">${b.borrowCount} Loans</div>
            `;
            popularList.appendChild(item);
        });
    }

    // Populate Circulation Table
    tableBody.innerHTML = "";
    if (countBadge) countBadge.textContent = `${bookStatsList.length} Titles`;

    bookStatsList.forEach((b, idx) => {
        let stockBadge = "";
        if (b.available <= 0) {
            stockBadge = `<span class="stock-tag stock-out">&#9679; Fully Borrowed</span>`;
        } else if (b.available <= 2) {
            stockBadge = `<span class="stock-tag stock-low">&#9679; Low Stock (${b.available} left)</span>`;
        } else {
            stockBadge = `<span class="stock-tag stock-in">&#9679; In Stock (${b.available} available)</span>`;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${idx + 1}</td>
            <td>
                <span class="book-title-cell">${b.title}</span>
                <span class="book-sub-cell">by ${b.author}</span>
            </td>
            <td><span class="category-tag">${b.category}</span></td>
            <td><code style="color:#475569; font-size:12px;">${b.isbn}</code></td>
            <td><strong>${b.totalStock}</strong></td>
            <td><strong style="color:#2563eb;">${b.borrowed}</strong></td>
            <td><strong style="color:#059669;">${b.available}</strong></td>
            <td><span class="borrow-count-badge" style="margin:0;">${b.borrowCount} Times</span></td>
            <td>${stockBadge}</td>
        `;
        tableBody.appendChild(row);
    });
}

/* =================================
   TAB 4: MEMBER BORROWING REPORT
================================= */

function renderMemberActivityReport() {
    const members = getStoredMembers();
    const transactions = getStoredIssuedBooks();
    const todayStr = getTodayString();

    const tableBody = document.getElementById("memberActivityTableBody");
    const countBadge = document.getElementById("memberActivityCountBadge");
    const deptList = document.getElementById("memberDeptContainer");
    if (!tableBody) return;

    // Calculate loan stats per member
    const memberStatsMap = {};
    const deptBorrowCounts = {};

    members.forEach(m => {
        memberStatsMap[m.memberId] = {
            memberId: m.memberId,
            name: m.name,
            department: m.department || "General",
            email: m.email || "-",
            mobile: m.mobile || "-",
            totalBorrowed: 0,
            activeLoans: 0,
            returned: 0,
            overdue: 0
        };
    });

    transactions.forEach(t => {
        const mId = t.memberId;
        if (!memberStatsMap[mId]) {
            // Member recorded in loan but not in members master
            memberStatsMap[mId] = {
                memberId: mId,
                name: t.memberName || "Unknown Member",
                department: t.department || "General",
                email: t.email || "-",
                mobile: "-",
                totalBorrowed: 0,
                activeLoans: 0,
                returned: 0,
                overdue: 0
            };
        }

        const mStat = memberStatsMap[mId];
        mStat.totalBorrowed++;

        const dept = mStat.department;
        deptBorrowCounts[dept] = (deptBorrowCounts[dept] || 0) + 1;

        if (t.status === "Returned") {
            mStat.returned++;
        } else if (t.status === "Issued") {
            if (t.dueDate && t.dueDate < todayStr) {
                mStat.overdue++;
            } else {
                mStat.activeLoans++;
            }
        }
    });

    const memberStatsList = Object.values(memberStatsMap);

    // Update Member KPIs
    const elTotMem = document.getElementById("mStatTotalMembers");
    const elActBorrowers = document.getElementById("mStatActiveBorrowers");
    const elBooksOut = document.getElementById("mStatBooksWithMembers");
    const elTopDept = document.getElementById("mStatTopDept");

    let activeBorrowersCount = 0;
    let booksWithMembersCount = 0;
    memberStatsList.forEach(m => {
        const out = m.activeLoans + m.overdue;
        if (out > 0) activeBorrowersCount++;
        booksWithMembersCount += out;
    });

    // Top Dept
    let topDeptName = "-";
    let maxDeptLoans = 0;
    for (const [dept, count] of Object.entries(deptBorrowCounts)) {
        if (count > maxDeptLoans) {
            maxDeptLoans = count;
            topDeptName = dept;
        }
    }

    if (elTotMem) elTotMem.textContent = members.length;
    if (elActBorrowers) elActBorrowers.textContent = activeBorrowersCount;
    if (elBooksOut) elBooksOut.textContent = booksWithMembersCount;
    if (elTopDept) elTopDept.textContent = topDeptName;

    // Department Distribution Badges
    if (deptList) {
        deptList.innerHTML = "";
        for (const [dept, count] of Object.entries(deptBorrowCounts)) {
            const item = document.createElement("div");
            item.className = "dept-badge-item";
            item.innerHTML = `
                <span class="dept-badge-name">${dept}</span>
                <span class="dept-badge-count">${count} Loan${count === 1 ? '' : 's'}</span>
            `;
            deptList.appendChild(item);
        }
    }

    // Populate Member Activity Table
    tableBody.innerHTML = "";
    if (countBadge) countBadge.textContent = `${memberStatsList.length} Members`;

    memberStatsList.forEach((m, idx) => {
        let standingBadge = "";
        if (m.overdue > 0) {
            standingBadge = `<span class="status-badge status-overdue">&#9888; ${m.overdue} Overdue</span>`;
        } else if (m.activeLoans > 0) {
            standingBadge = `<span class="status-badge status-issued">${m.activeLoans} Active Loan${m.activeLoans === 1 ? '' : 's'}</span>`;
        } else {
            standingBadge = `<span class="status-badge status-returned">Good Standing</span>`;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${idx + 1}</td>
            <td><strong style="color:#1e293b; font-family:monospace;">${m.memberId}</strong></td>
            <td><strong style="color:#1e293b;">${m.name}</strong></td>
            <td>${m.department}</td>
            <td>
                <span style="display:block; font-size:12px;">${m.email}</span>
                <span style="display:block; font-size:11.5px; color:#94a3b8;">${m.mobile}</span>
            </td>
            <td><strong style="color:#0f172a;">${m.totalBorrowed}</strong></td>
            <td><strong style="color:#2563eb;">${m.activeLoans}</strong></td>
            <td><strong style="color:#059669;">${m.returned}</strong></td>
            <td>${standingBadge}</td>
        `;
        tableBody.appendChild(row);
    });
}

/* =================================
   TAB 5: OVERDUE & DEFAULTERS REPORT
================================= */

function renderOverdueReport() {
    const transactions = getStoredIssuedBooks();
    const todayStr = getTodayString();
    const tableBody = document.getElementById("overdueTableBody");
    const countBadge = document.getElementById("overdueCountBadge");
    if (!tableBody) return;

    // Filter overdue records
    const overdueList = transactions.filter(t => t.status === "Issued" && t.dueDate && t.dueDate < todayStr);

    let totalDaysOverdue = 0;
    const memberIdSet = new Set();
    const finePerDay = 5; // Standard ₹5/day fine rule

    overdueList.forEach(t => {
        const days = calculateDaysDifference(todayStr, t.dueDate);
        totalDaysOverdue += days;
        if (t.memberId) memberIdSet.add(t.memberId);
    });

    const totalEstFine = totalDaysOverdue * finePerDay;

    // Overdue KPIs
    const elTotOverdue = document.getElementById("oStatTotalOverdue");
    const elOverdueMem = document.getElementById("oStatOverdueMembers");
    const elOverdueDays = document.getElementById("oStatTotalDays");
    const elEstFine = document.getElementById("oStatTotalFine");

    if (elTotOverdue) elTotOverdue.textContent = overdueList.length;
    if (elOverdueMem) elOverdueMem.textContent = memberIdSet.size;
    if (elOverdueDays) elOverdueDays.textContent = totalDaysOverdue;
    if (elEstFine) elEstFine.textContent = `₹${totalEstFine}`;

    tableBody.innerHTML = "";
    if (countBadge) countBadge.textContent = `${overdueList.length} Overdue`;

    if (overdueList.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-state-cell">
                    <div class="empty-state-content">
                        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <strong style="color:#065f46;">All clear! There are currently no overdue books.</strong>
                        <span>All members have either returned their books on time or their loans are still within the 15-day period.</span>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    overdueList.forEach((t, idx) => {
        const daysOver = calculateDaysDifference(todayStr, t.dueDate);
        const estFine = daysOver * finePerDay;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${idx + 1}</td>
            <td>
                <span class="member-name-cell">${t.memberName}</span>
                <span class="member-sub-cell">${t.memberId} &bull; ${t.department || 'General'}</span>
            </td>
            <td>
                <span style="font-size:12px; display:block;">${t.email || '-'}</span>
            </td>
            <td>
                <span class="book-title-cell">${t.bookTitle}</span>
                <span class="book-sub-cell">${t.issueId} &bull; ${t.isbn || '-'}</span>
            </td>
            <td><strong>${formatDatePretty(t.issueDate)}</strong></td>
            <td><strong style="color:#dc2626;">${formatDatePretty(t.dueDate)}</strong></td>
            <td><span class="status-badge status-overdue">${daysOver} Day${daysOver === 1 ? '' : 's'}</span></td>
            <td><strong style="color:#dc2626;">₹${estFine}</strong></td>
            <td>
                <div style="display:flex; gap:6px;">
                    <a href="../Return_Book/returnBook.html" class="table-btn resolve-btn" title="Open Return Book page to accept return">
                        Return Book
                    </a>
                    <button type="button" class="table-btn view-btn" onclick="sendOverdueNotice('${t.memberName}', '${t.bookTitle}', '${t.email}')" title="Send email reminder">
                        Reminder
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function sendOverdueNotice(memberName, bookTitle, email) {
    alert(`Overdue Reminder Sent!\n\nTo: ${memberName} (${email || 'No email registered'})\nSubject: Overdue Library Book Reminder - "${bookTitle}"\n\nA notification reminder has been issued requesting immediate return of the library book.`);
}

/* =================================
   TRANSACTION RECEIPT MODAL
================================= */

function openTransactionReceipt(issueId) {
    const transactions = getStoredIssuedBooks();
    const record = transactions.find(t => t.issueId === issueId);
    if (!record) return;

    const modal = document.getElementById("receiptModal");
    const todayStr = getTodayString();
    if (!modal) return;

    // Fill modal fields
    document.getElementById("rIssueId").textContent = record.issueId;
    document.getElementById("rGeneratedDate").textContent = formatDatePretty(todayStr);

    document.getElementById("rBookTitle").textContent = record.bookTitle;
    document.getElementById("rBookAuthor").textContent = record.author || "Unknown";
    document.getElementById("rBookIsbn").textContent = record.isbn || "-";

    document.getElementById("rMemberName").textContent = record.memberName;
    document.getElementById("rMemberId").textContent = record.memberId;
    document.getElementById("rMemberDept").textContent = record.department || "General";
    document.getElementById("rMemberEmail").textContent = record.email || "-";

    document.getElementById("rIssueDate").textContent = formatDatePretty(record.issueDate);
    document.getElementById("rDueDate").textContent = formatDatePretty(record.dueDate);
    document.getElementById("rReturnDate").textContent = record.returnDate ? formatDatePretty(record.returnDate) : "Not yet returned";

    const isReturned = record.status === "Returned";
    const isOverdue = record.status === "Issued" && record.dueDate && record.dueDate < todayStr;
    const statusEl = document.getElementById("rStatusBadge");

    if (isReturned) {
        statusEl.className = "status-badge status-returned";
        statusEl.textContent = `Returned (${formatDatePretty(record.returnDate)})`;
    } else if (isOverdue) {
        const days = calculateDaysDifference(todayStr, record.dueDate);
        statusEl.className = "status-badge status-overdue";
        statusEl.textContent = `Overdue by ${days} days`;
    } else {
        statusEl.className = "status-badge status-issued";
        statusEl.textContent = "Active Loan (15-day period)";
    }

    modal.classList.add("show");
}

function closeReceiptModal() {
    const modal = document.getElementById("receiptModal");
    if (modal) modal.classList.remove("show");
}

function printReceipt() {
    window.print();
}

/* =================================
   EXPORT TO CSV
================================= */

function exportCurrentReportToCSV() {
    const transactions = getStoredIssuedBooks();
    if (!transactions || transactions.length === 0) {
        alert("No transaction records available to export.");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    let filename = "library_transactions_report.csv";

    if (currentTab === "tab-book-circulation") {
        filename = "library_book_circulation_report.csv";
        csvContent += "S.No,Book Title,Author,Category,ISBN,Total Copies,Currently Borrowed,Available On Shelf\n";
        const books = getStoredBooks();
        books.forEach((b, idx) => {
            const row = [
                idx + 1,
                `"${(b.bookName || b.name || '').replace(/"/g, '""')}"`,
                `"${(b.author || '').replace(/"/g, '""')}"`,
                `"${b.category || ''}"`,
                `"${b.isbn || ''}"`,
                b.quantity || b.bookCount || 0,
                0,
                b.quantity || b.bookCount || 0
            ];
            csvContent += row.join(",") + "\n";
        });
    } else if (currentTab === "tab-member-activity") {
        filename = "library_member_activity_report.csv";
        csvContent += "S.No,Member ID,Member Name,Department,Email,Mobile\n";
        const members = getStoredMembers();
        members.forEach((m, idx) => {
            const row = [
                idx + 1,
                `"${m.memberId}"`,
                `"${m.name.replace(/"/g, '""')}"`,
                `"${m.department || ''}"`,
                `"${m.email || ''}"`,
                `"${m.mobile || ''}"`
            ];
            csvContent += row.join(",") + "\n";
        });
    } else {
        // Transactions / Month-wise / History
        csvContent += "S.No,Issue ID,Book Title,Author,ISBN,Member ID,Member Name,Department,Email,Issue Date,Due Date,Return Date,Status\n";
        transactions.forEach((t, idx) => {
            const row = [
                idx + 1,
                `"${t.issueId}"`,
                `"${(t.bookTitle || '').replace(/"/g, '""')}"`,
                `"${(t.author || '').replace(/"/g, '""')}"`,
                `"${t.isbn || ''}"`,
                `"${t.memberId || ''}"`,
                `"${(t.memberName || '').replace(/"/g, '""')}"`,
                `"${t.department || ''}"`,
                `"${t.email || ''}"`,
                `"${t.issueDate || ''}"`,
                `"${t.dueDate || ''}"`,
                `"${t.returnDate || ''}"`,
                `"${t.status || ''}"`
            ];
            csvContent += row.join(",") + "\n";
        });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function printReport() {
    window.print();
}