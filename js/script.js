/**
 * Jobopedia Client Script for Standalone Bundle
 */

// Calendar Interaction Logic
let currentSelectedDay = 2; // Default to Day 2 or 3 which has jobs

function switchCalendarWeek(weekIndex) {
  if (!window.CALENDAR_DATA || !window.CALENDAR_DATA.weeks) return;
  const week = window.CALENDAR_DATA.weeks[weekIndex];
  if (!week) return;

  // Update week tab buttons styling
  document.querySelectorAll('[id^="week-tab-"]').forEach((btn, idx) => {
    if (idx === weekIndex) {
      btn.className = "px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center space-x-2 whitespace-nowrap shrink-0 cursor-pointer bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg font-extrabold ring-2 ring-amber-300/60";
    } else {
      btn.className = "px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center space-x-2 whitespace-nowrap shrink-0 cursor-pointer bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10";
    }
  });

  // Re-render days grid
  const grid = document.getElementById("calendarDaysGrid");
  if (!grid) return;

  const monthName = window.CALENDAR_DATA.monthName || "October 2026";
  grid.innerHTML = week.days.map((day) => {
    const hasJobs = day.jobsCount > 0;
    const topJob = hasJobs ? day.jobs[0] : null;

    let snippet = `<div class="py-2 text-center"><span class="text-[10px] text-slate-400 font-medium">No deadlines</span></div>`;
    if (hasJobs && topJob) {
      snippet = `
        <div class="bg-blue-950/70 border border-blue-400/30 rounded-xl p-1.5 group-hover:border-amber-400/70 group-hover:bg-blue-900/60 transition-colors shadow-xs">
          <p class="text-[11px] font-black text-white group-hover:text-amber-300 line-clamp-2 leading-snug">
            ${topJob.title}
          </p>
          ${day.jobsCount > 1 ? `<span class="text-[9px] font-bold text-amber-300 block mt-0.5">+${day.jobsCount - 1} more govt job</span>` : ''}
        </div>
        ${topJob.salary ? `
          <div class="text-[9.5px] font-black text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded-lg border border-amber-400/25 truncate flex items-center space-x-1">
            <span>💰</span>
            <span class="truncate">${topJob.salary}</span>
          </div>
        ` : ''}
        <div class="flex items-center justify-between text-[9px] font-bold text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
          <span class="flex items-center space-x-1 truncate">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
            <span class="truncate">${topJob.vacancies ? `${topJob.vacancies.toLocaleString()} Posts` : "Govt Vacancy"}</span>
          </span>
          <span class="text-white/80 shrink-0 text-[8.5px]">${day.jobsCount} Jobs</span>
        </div>
      `;
    }

    return `
      <div
        onclick="selectCalendarDay(${day.dayNumber})"
        id="cal-card-${day.dayNumber}"
        class="rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between space-y-2 group relative ${
          hasJobs
            ? "bg-gradient-to-b from-blue-950/90 via-slate-900/90 to-blue-950/90 border-amber-400/80 ring-1 ring-amber-400/40 shadow-[0_4px_20px_rgba(251,191,36,0.2)] hover:border-amber-300 hover:shadow-[0_0_25px_rgba(251,191,36,0.35)]"
            : "bg-white/5 border-white/5 opacity-60 hover:opacity-100"
        }"
      >
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-extrabold uppercase text-slate-300 group-hover:text-white">
            ${day.dayName}
          </span>
          ${hasJobs ? `
            <span class="text-[9px] font-black px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded uppercase shadow-xs flex items-center space-x-1">
              <span class="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping shrink-0"></span>
              <span>${day.jobsCount} Jobs</span>
            </span>
          ` : ''}
        </div>

        <div class="flex items-baseline space-x-1">
          <span class="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
            ${String(day.dayNumber).padStart(2, "0")}
          </span>
          <span class="text-[10px] text-slate-400 font-semibold">${monthName.split(" ")[0]}</span>
        </div>

        <div class="space-y-1.5 pt-0.5">
          ${snippet}
        </div>

        <div class="text-[10px] text-blue-300 font-semibold group-hover:underline flex items-center justify-between pt-1 border-t border-white/10">
          <span>${hasJobs ? "View Pop-up" : "Open"}</span>
          <span>→</span>
        </div>
      </div>
    `;
  }).join("");

  // Select first day of week
  if (week.days.length > 0) {
    const firstWithJobs = week.days.find(d => d.jobsCount > 0) || week.days[0];
    selectCalendarDay(firstWithJobs.dayNumber);
  }
}

function selectCalendarDay(dayNumber) {
  if (!window.CALENDAR_DATA || !window.CALENDAR_DATA.weeks) return;
  currentSelectedDay = dayNumber;

  // Find day across weeks
  let foundDay = null;
  for (const w of window.CALENDAR_DATA.weeks) {
    const d = w.days.find(item => item.dayNumber === dayNumber);
    if (d) { foundDay = d; break; }
  }
  if (!foundDay) return;

  // Update spotlight header
  const nameEl = document.getElementById("spotlightDayName");
  const numEl = document.getElementById("spotlightDayNum");
  const headingEl = document.getElementById("spotlightHeading");
  const badgeEl = document.getElementById("spotlightCountBadge");

  if (nameEl) nameEl.innerText = foundDay.dayName;
  if (numEl) numEl.innerText = String(foundDay.dayNumber).padStart(2, "0");
  if (headingEl) headingEl.innerText = `આ તારીખની સરકારી ભરતીઓ (${foundDay.dateStr})`;
  if (badgeEl) badgeEl.innerText = `${foundDay.jobsCount} Jobs Active`;

  // Update spotlight jobs
  const container = document.getElementById("spotlightJobsContainer");
  if (!container) return;

  if (foundDay.jobsCount === 0 || !foundDay.jobs || foundDay.jobs.length === 0) {
    container.innerHTML = `
      <div class="col-span-2 py-8 text-center space-y-2">
        <p class="text-sm text-slate-300 font-medium">આ તારીખે કોઈ વિશેષ છેલ્લી તારીખ નથી. અઠવાડિયાની અન્ય તારીખો પર ક્લિક કરીને સરકારી નોકરીઓ જુઓ.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = foundDay.jobs.map(j => `
    <div class="bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-3.5 shadow-sm">
      <div class="space-y-2.5">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-blue-500/25 text-blue-200 border border-blue-400/30 truncate">
            ${j.department}
          </span>
          <span class="text-[10px] font-black px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
            ${j.vacancies || 100} જગાઓ
          </span>
        </div>

        <h4 class="text-sm font-black text-white leading-snug group-hover:text-amber-300">
          ${j.title}
        </h4>

        <div class="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs">
          <div class="flex items-center space-x-1.5 text-emerald-300">
            <span class="text-emerald-400 font-bold">$</span>
            <span class="text-[11px] font-bold">પગાર ધોરણ (Salary):</span>
          </div>
          <span class="text-xs sm:text-sm font-black text-emerald-200">
            ${j.salary || "Pay Matrix Level 6-10"}
          </span>
        </div>

        <div class="bg-slate-950/60 border border-white/10 rounded-xl p-3 space-y-1">
          <div class="flex items-center space-x-1.5 text-amber-300 text-[11px] font-extrabold">
            <span>📄</span>
            <span>જોબનું વર્ણન અને કામનું સ્વરૂપ (Job Description):</span>
          </div>
          <p class="text-xs text-slate-200 font-medium leading-relaxed line-clamp-3">
            ${j.description || j.eligibility || "સત્તાવાર સરકારી ભરતી સૂચના. લાયકાત ધરાવતા ઉમેદવારો છેલ્લી તારીખ પહેલાં ઓનલાઇન અરજી કરી શકે છે."}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">લાયકાત (Eligibility):</span>
            <span class="truncate block font-medium">${j.eligibility || "Any Graduate"}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block font-semibold">છેલ્લી તારીખ:</span>
            <strong class="text-amber-300 font-bold">${j.lastDate || "Apply Soon"}</strong>
          </div>
        </div>
      </div>

      <div class="pt-2 border-t border-white/10 flex items-center gap-2">
        <button
          onclick="openJobModal('${j.id}')"
          class="flex-1 py-2 px-3 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold text-center transition cursor-pointer"
        >
          સંપૂર્ણ વિગતો / View Details
        </button>
        <a
          href="${j.applyUrl || 'https://jobopedia.in'}"
          target="_blank"
          class="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shrink-0 shadow-md cursor-pointer"
        >
          <span>Apply Online</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  `).join("");
}

// Modal Popups for Job Details & Salary
function openJobModal(jobId) {
  let foundJob = null;
  if (window.CALENDAR_DATA) {
    for (const w of window.CALENDAR_DATA.weeks) {
      for (const d of w.days) {
        const j = d.jobs.find(x => x.id === jobId);
        if (j) { foundJob = j; break; }
      }
      if (foundJob) break;
    }
  }

  if (!foundJob) {
    alert("Job details popup: " + jobId);
    return;
  }

  const modalHtml = `
    <div id="activeJobModalOverlay" class="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div class="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span class="text-xs font-black uppercase px-2.5 py-1 rounded bg-blue-500/25 text-blue-300 border border-blue-400/30">
              ${foundJob.department}
            </span>
            <h3 class="text-xl sm:text-2xl font-black text-white mt-2">${foundJob.title}</h3>
          </div>
          <button onclick="document.getElementById('activeJobModalOverlay').remove()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold">×</button>
        </div>

        <div class="bg-emerald-950/70 border border-emerald-500/50 rounded-2xl p-4">
          <div class="text-xs font-bold text-emerald-300 uppercase">પગાર ધોરણ (Official Pay Scale & Monthly Salary)</div>
          <div class="text-xl sm:text-2xl font-black text-emerald-300 mt-1">${foundJob.salary || "Pay Level 7 (₹44,900 - ₹1,42,400)"}</div>
          <p class="text-xs text-emerald-200/80 mt-1">Includes Basic Pay + DA + HRA + Transport & Medical Allowances.</p>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
          <div class="text-xs font-bold text-amber-300">સત્તાવાર જોબ વર્ણન (Job Scope & Official Duties):</div>
          <p class="text-sm text-slate-200 leading-relaxed">${foundJob.description || foundJob.eligibility || "સત્તાવાર સરકારી ભરતી સૂચના. ઓનલાઇન અરજી માટે લાયકાત અને શરતો જુઓ."}</p>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="bg-white/5 p-3 rounded-xl border border-white/10">
            <span class="text-slate-400 block font-semibold">લાયકાત (Eligibility):</span>
            <span class="font-bold text-white text-sm">${foundJob.eligibility}</span>
          </div>
          <div class="bg-white/5 p-3 rounded-xl border border-white/10">
            <span class="text-slate-400 block font-semibold">કુલ જગાઓ (Total Vacancies):</span>
            <span class="font-bold text-white text-sm">${foundJob.vacancies} Posts</span>
          </div>
        </div>

        <div class="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button onclick="triggerCyberCafeHelp('${foundJob.title}')" class="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-lg">
            💬 WhatsApp Cyber Cafe Help
          </button>
          <a href="${foundJob.applyUrl || 'https://jobopedia.in'}" target="_blank" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-lg">
            Apply Online Portal ↗
          </a>
        </div>
      </div>
    </div>
  `;

  const existing = document.getElementById('activeJobModalOverlay');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openCalendarPopup() {
  selectCalendarDay(currentSelectedDay);
  if (window.CALENDAR_DATA) {
    for (const w of window.CALENDAR_DATA.weeks) {
      const d = w.days.find(x => x.dayNumber === currentSelectedDay);
      if (d && d.jobs && d.jobs.length > 0) {
        openJobModal(d.jobs[0].id);
        return;
      }
    }
  }
}

function triggerCyberCafeHelp(jobTitle) {
  const text = encodeURIComponent(`Namaste Jobopedia Cyber Cafe Helpline,\n\nI want to apply for: *${jobTitle}*.\nPlease assist me in online form submission & document verification.`);
  window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
}

// Admin Candidate Applications
const SAMPLE_CANDIDATES = [
  { name: "Dhaval Patel", phone: "+91 9876543210", email: "dhaval@jobopedia.in", state: "Gujarat", qual: "B.Tech Computer Science", role: "Civil Services IAS / Tech Officer", resume: "Dhaval_Patel_ATS_Resume.pdf", status: "Shortlisted" },
  { name: "Tushar Shah", phone: "+91 9823456789", email: "tushar@jobopedia.in", state: "Maharashtra", qual: "MBA Finance & B.Com", role: "SBI PO / Credit Risk", resume: "Tushar_Shah_Finance_Resume.pdf", status: "Under Review" },
  { name: "Pooja Verma", phone: "+91 9911223344", email: "pooja.v@gmail.com", state: "Delhi", qual: "BA Political Science", role: "SSC CGL Assistant Section Officer", resume: "Pooja_Verma_Govt_Resume.pdf", status: "Interview Scheduled" }
];

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("candidatesTableBody");
  if (tbody) {
    tbody.innerHTML = SAMPLE_CANDIDATES.map(c => `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-3.5 font-bold text-slate-900">${c.name}</td>
        <td class="p-3.5">
          <a href="https://wa.me/${c.phone.replace(/[^0-9]/g, '')}" target="_blank" class="text-emerald-600 font-bold hover:underline flex items-center space-x-1">
            <span>💬</span> <span>${c.phone}</span>
          </a>
        </td>
        <td class="p-3.5 text-slate-600">${c.email}</td>
        <td class="p-3.5"><span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">${c.state}</span></td>
        <td class="p-3.5 text-slate-700">${c.qual}</td>
        <td class="p-3.5 font-medium text-slate-900">${c.role}</td>
        <td class="p-3.5">
          <span class="text-blue-600 font-medium hover:underline cursor-pointer">📄 ${c.resume}</span>
        </td>
        <td class="p-3.5">
          <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">${c.status}</span>
        </td>
      </tr>
    `).join("");
  }
});
