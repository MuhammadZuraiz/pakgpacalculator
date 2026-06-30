(function () {
  "use strict";

  const root = document.documentElement;

  function trackEvent(name, params) {
    const payload = Object.assign(
      {
        page_type: document.body.dataset.pageType || "static",
        page_slug: document.body.dataset.pageSlug || window.location.pathname
      },
      params || {}
    );

    window.gpaAnalyticsQueue = window.gpaAnalyticsQueue || [];
    window.gpaAnalyticsQueue.push({ name: name, params: payload });

    if (typeof window.gtag === "function") {
      window.gtag("event", name, payload);
    }
  }

  function setupTheme() {
    const toggle = document.getElementById("theme-toggle");

    function applyTheme(theme, shouldStore) {
      const resolvedTheme = theme === "dark" ? "dark" : "light";
      root.dataset.theme = resolvedTheme;

      if (shouldStore) {
        try {
          localStorage.setItem("gpa-theme", resolvedTheme);
        } catch (error) {
          root.dataset.theme = resolvedTheme;
        }
      }

      if (toggle) {
        const isDark = resolvedTheme === "dark";
        const icon = toggle.querySelector(".theme-toggle__icon");
        const label = toggle.querySelector(".theme-toggle__label");
        toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");

        if (icon) {
          icon.textContent = isDark ? "L" : "D";
        }

        if (label) {
          label.textContent = isDark ? "Light" : "Dark";
        }
      }
    }

    if (!root.dataset.theme) {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light", false);
    } else {
      applyTheme(root.dataset.theme, false);
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
        trackEvent("theme_changed", { theme: nextTheme });
      });
    }
  }

  function setupNavigation() {
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("primary-nav");

    if (!menuToggle || !nav) {
      return;
    }

    function setOpen(isOpen) {
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      nav.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
    }

    menuToggle.addEventListener("click", function () {
      setOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }

  function setupRevealAnimations() {
    const animatedItems = Array.from(document.querySelectorAll("[data-animate]"));

    if (animatedItems.length === 0) {
      return;
    }

    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      animatedItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    animatedItems.forEach(function (item, index) {
      item.style.setProperty("--reveal-delay", String(Math.min(index * 80, 320)) + "ms");
      observer.observe(item);
    });
  }

  setupTheme();
  setupNavigation();
  setupRevealAnimations();

  const form = document.getElementById("gpa-form");

  if (!form) {
    return;
  }

  const MAX_ROWS = 30;
  const INITIAL_ROWS = 8;

  const scales = {
    pakistan: {
      label: "Pakistan 4.0 scale (no minus grades)",
      note: "This 4.0 scale uses half-point steps and no minus grades (A, B+, B, C+, C, D+, D, F). NUST and IIUI use this style. Always compare the scale with your official transcript rules.",
      grades: [
        ["A", 4],
        ["B+", 3.5],
        ["B", 3],
        ["C+", 2.5],
        ["C", 2],
        ["D+", 1.5],
        ["D", 1],
        ["F", 0]
      ]
    },
    hec: {
      label: "HEC 4.0 scale (with minus grades)",
      note: "This HEC-style 4.0 scale includes minus grades (A-, B-, C-). COMSATS, FAST, GIKI, PIEAS, Air, UET, and IST use this style. Always compare the scale with your official transcript rules.",
      grades: [
        ["A", 4],
        ["A-", 3.67],
        ["B+", 3.33],
        ["B", 3],
        ["B-", 2.67],
        ["C+", 2.33],
        ["C", 2],
        ["C-", 1.67],
        ["D+", 1.3],
        ["D", 1],
        ["F", 0]
      ]
    }
  };

  const defaultScale =
    form.dataset.defaultScale && scales[form.dataset.defaultScale]
      ? form.dataset.defaultScale
      : "pakistan";

  const scaleSelect = document.getElementById("scale-select");
  const rowsBody = document.getElementById("course-rows");
  const addRowButton = document.getElementById("add-row");
  const resetButton = document.getElementById("reset-form");
  const sampleButton = document.getElementById("fill-sample");
  const heroSampleButton = document.getElementById("hero-sample");
  const printButton = document.getElementById("print-result");
  const previousCgpaInput = document.getElementById("previous-cgpa");
  const completedCreditsInput = document.getElementById("completed-credits");
  const rowCounter = document.getElementById("row-counter");
  const scaleTable = document.getElementById("scale-table");
  const scaleNote = document.getElementById("scale-note");
  let lastCompletedSignature = "";

  const resultNodes = {
    semesterGpa: document.getElementById("semester-gpa"),
    updatedCgpa: document.getElementById("updated-cgpa"),
    semesterCredits: document.getElementById("semester-credits"),
    totalPoints: document.getElementById("total-points"),
    coursesCounted: document.getElementById("courses-counted"),
    standing: document.getElementById("standing"),
    status: document.getElementById("status-message")
  };

  function currentScale() {
    return scales[scaleSelect.value] || scales.pakistan;
  }

  function formatNumber(value, digits) {
    return Number.isFinite(value) ? value.toFixed(digits) : "0.00";
  }

  function parseNumber(value) {
    if (value === "") {
      return null;
    }

    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function escapeAttribute(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function gradePoint(grade) {
    const match = currentScale().grades.find(function (item) {
      return item[0] === grade;
    });

    return match ? match[1] : null;
  }

  function createGradeOptions(selectedGrade) {
    const options = ['<option value="">Select</option>'];

    currentScale().grades.forEach(function (grade) {
      const selected = grade[0] === selectedGrade ? " selected" : "";
      options.push('<option value="' + grade[0] + '"' + selected + ">" + grade[0] + "</option>");
    });

    return options.join("");
  }

  function rowTemplate(index, data) {
    const rowData = data || {};
    const subject = rowData.subject ? escapeAttribute(rowData.subject) : "";
    const grade = rowData.grade ? rowData.grade : "";
    const credits = rowData.credits || "";

    return (
      '<tr data-row="' + index + '">' +
      '<td class="row-number">' + (index + 1) + "</td>" +
      '<td><input type="text" class="course-subject" placeholder="Course name" value="' + subject + '"></td>' +
      '<td><select class="course-grade" aria-label="Grade for course ' + (index + 1) + '">' + createGradeOptions(grade) + "</select></td>" +
      '<td><input type="number" class="course-credits" min="0" step="1" inputmode="numeric" placeholder="3" value="' + credits + '" aria-label="Credit hours for course ' + (index + 1) + '"></td>' +
      '<td><span class="row-points">0.00</span></td>' +
      '<td><button class="button button-danger remove-row" type="button" aria-label="Remove course ' + (index + 1) + '">x</button></td>' +
      "</tr>"
    );
  }

  function renumberRows() {
    Array.from(rowsBody.querySelectorAll("tr")).forEach(function (row, index) {
      row.dataset.row = String(index);
      row.querySelector(".row-number").textContent = String(index + 1);
      row.querySelector(".course-grade").setAttribute("aria-label", "Grade for course " + (index + 1));
      row.querySelector(".course-credits").setAttribute("aria-label", "Credit hours for course " + (index + 1));
      row.querySelector(".remove-row").setAttribute("aria-label", "Remove course " + (index + 1));
    });
  }

  function updateRowCounter() {
    const count = rowsBody.querySelectorAll("tr").length;
    rowCounter.textContent = count + " of " + MAX_ROWS + " rows";
    addRowButton.disabled = count >= MAX_ROWS;
  }

  function addRow(data) {
    const count = rowsBody.querySelectorAll("tr").length;

    if (count >= MAX_ROWS) {
      setStatus("You can add up to " + MAX_ROWS + " course rows.", "warning");
      return;
    }

    rowsBody.insertAdjacentHTML("beforeend", rowTemplate(count, data));
    updateRowCounter();
    calculate();
  }

  function renderScaleTable() {
    if (!scaleTable) {
      return;
    }

    scaleTable.innerHTML = currentScale().grades
      .map(function (grade) {
        return "<tr><td>" + grade[0] + "</td><td>" + formatNumber(grade[1], 2) + "</td></tr>";
      })
      .join("");

    if (scaleNote) {
      scaleNote.textContent = currentScale().note;
    }
  }

  function refreshGradeOptions() {
    Array.from(rowsBody.querySelectorAll(".course-grade")).forEach(function (select) {
      const selected = select.value;
      const isAvailable = currentScale().grades.some(function (grade) {
        return grade[0] === selected;
      });

      select.innerHTML = createGradeOptions(isAvailable ? selected : "");
    });
  }

  function standingFor(gpa) {
    if (!Number.isFinite(gpa) || gpa <= 0) {
      return "Add courses";
    }

    if (gpa >= 3.7) {
      return "Excellent";
    }

    if (gpa >= 3.3) {
      return "Very good";
    }

    if (gpa >= 3) {
      return "Good";
    }

    if (gpa >= 2) {
      return "Needs focus";
    }

    return "At risk";
  }

  function setStatus(message, tone) {
    resultNodes.status.textContent = message;
    resultNodes.status.classList.toggle("has-warning", tone === "warning");
    resultNodes.status.classList.toggle("has-error", tone === "error");
  }

  function clearInvalidRows() {
    Array.from(rowsBody.querySelectorAll("tr")).forEach(function (row) {
      row.classList.remove("is-invalid");
    });
  }

  function calculate() {
    let semesterCredits = 0;
    let totalPoints = 0;
    let coursesCounted = 0;
    const warnings = [];

    clearInvalidRows();

    Array.from(rowsBody.querySelectorAll("tr")).forEach(function (row) {
      const grade = row.querySelector(".course-grade").value;
      const creditInput = row.querySelector(".course-credits");
      const credits = parseNumber(creditInput.value);
      const pointsNode = row.querySelector(".row-points");
      const hasGrade = grade !== "";
      const hasCredits = credits !== null && credits > 0;

      pointsNode.textContent = "0.00";

      if (!hasGrade && !hasCredits) {
        return;
      }

      if (hasGrade && !hasCredits) {
        row.classList.add("is-invalid");
        warnings.push("Add credit hours for every selected grade.");
        return;
      }

      if (!hasGrade && hasCredits) {
        row.classList.add("is-invalid");
        warnings.push("Select a grade for every course with credit hours.");
        return;
      }

      if (credits < 0) {
        row.classList.add("is-invalid");
        warnings.push("Credit hours cannot be negative.");
        return;
      }

      const point = gradePoint(grade);
      const rowPoints = point * credits;
      pointsNode.textContent = formatNumber(rowPoints, 2);
      semesterCredits += credits;
      totalPoints += rowPoints;
      coursesCounted += 1;
    });

    const semesterGpa = semesterCredits > 0 ? totalPoints / semesterCredits : 0;
    const previousCgpa = parseNumber(previousCgpaInput.value);
    const completedCredits = parseNumber(completedCreditsInput.value);
    let updatedCgpa = semesterGpa;

    if (previousCgpa !== null && (previousCgpa < 0 || previousCgpa > 4)) {
      warnings.push("Previous CGPA should be between 0 and 4.");
    }

    if (completedCredits !== null && completedCredits < 0) {
      warnings.push("Completed credit hours cannot be negative.");
    }

    if (
      previousCgpa !== null &&
      completedCredits !== null &&
      previousCgpa >= 0 &&
      previousCgpa <= 4 &&
      completedCredits > 0 &&
      semesterCredits > 0
    ) {
      updatedCgpa = ((previousCgpa * completedCredits) + totalPoints) / (completedCredits + semesterCredits);
    } else if (
      (previousCgpa !== null && completedCredits === null) ||
      (previousCgpa === null && completedCredits !== null && completedCredits > 0)
    ) {
      warnings.push("Enter both previous CGPA and completed credit hours for updated CGPA.");
    }

    resultNodes.semesterGpa.textContent = formatNumber(semesterGpa, 2);
    resultNodes.updatedCgpa.textContent = formatNumber(updatedCgpa, 2);
    resultNodes.semesterCredits.textContent = formatNumber(semesterCredits, semesterCredits % 1 === 0 ? 0 : 1);
    resultNodes.totalPoints.textContent = formatNumber(totalPoints, 2);
    resultNodes.coursesCounted.textContent = String(coursesCounted);
    resultNodes.standing.textContent = standingFor(semesterGpa);

    if (warnings.length > 0) {
      setStatus(warnings[0], warnings[0].includes("cannot") || warnings[0].includes("between") ? "error" : "warning");
    } else if (coursesCounted === 0) {
      setStatus("Select grades and credit hours to calculate your GPA.", "");
    } else if (previousCgpa === null && (completedCredits === null || completedCredits === 0)) {
      setStatus("Semester GPA calculated. Add previous CGPA and completed credits for updated CGPA.", "");
    } else {
      setStatus("GPA and CGPA updated.", "");
    }

    const completionSignature = [coursesCounted, semesterCredits, totalPoints, previousCgpa, completedCredits].join(":");

    if (coursesCounted > 0 && warnings.length === 0 && completionSignature !== lastCompletedSignature) {
      lastCompletedSignature = completionSignature;
      trackEvent("calculator_completed", {
        courses_counted: coursesCounted,
        semester_credits: semesterCredits,
        semester_gpa: Number(formatNumber(semesterGpa, 2)),
        has_previous_cgpa: previousCgpa !== null && completedCredits !== null && completedCredits > 0
      });
    }
  }

  function resetForm() {
    rowsBody.innerHTML = "";
    scaleSelect.value = defaultScale;
    previousCgpaInput.value = "";
    completedCreditsInput.value = "";
    renderScaleTable();

    for (let index = 0; index < INITIAL_ROWS; index += 1) {
      addRow();
    }

    calculate();
  }

  function fillSample() {
    rowsBody.innerHTML = "";
    scaleSelect.value = defaultScale;
    previousCgpaInput.value = "3.20";
    completedCreditsInput.value = "60";
    renderScaleTable();

    addRow({ subject: "Programming Fundamentals", grade: "A", credits: "3" });
    addRow({ subject: "Calculus", grade: "B+", credits: "3" });

    while (rowsBody.querySelectorAll("tr").length < INITIAL_ROWS) {
      addRow();
    }

    document.getElementById("calculator").scrollIntoView({ behavior: "smooth", block: "start" });
    calculate();
    trackEvent("sample_loaded", { rows: rowsBody.querySelectorAll("tr").length });
  }

  form.addEventListener("input", calculate);

  form.addEventListener("change", function (event) {
    if (event.target === scaleSelect) {
      refreshGradeOptions();
      renderScaleTable();
    }

    calculate();
  });

  rowsBody.addEventListener("click", function (event) {
    const button = event.target.closest(".remove-row");

    if (!button) {
      return;
    }

    const rows = rowsBody.querySelectorAll("tr");

    if (rows.length <= 1) {
      rows[0].querySelector(".course-subject").value = "";
      rows[0].querySelector(".course-grade").value = "";
      rows[0].querySelector(".course-credits").value = "";
      calculate();
      return;
    }

    button.closest("tr").remove();
    renumberRows();
    updateRowCounter();
    calculate();
  });

  addRowButton.addEventListener("click", function () {
    addRow();
    trackEvent("row_added", { rows: rowsBody.querySelectorAll("tr").length });
  });

  resetButton.addEventListener("click", resetForm);
  sampleButton.addEventListener("click", fillSample);

  if (heroSampleButton) {
    heroSampleButton.addEventListener("click", fillSample);
  }

  printButton.addEventListener("click", function () {
    trackEvent("print_clicked");
    window.print();
  });

  scaleSelect.value = defaultScale;
  renderScaleTable();

  for (let index = 0; index < INITIAL_ROWS; index += 1) {
    addRow();
  }

  calculate();
})();
