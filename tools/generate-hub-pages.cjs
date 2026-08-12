const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const configPath = path.join(root, "site.config.json");
const defaultDomain = "https://your-domain.com";

function readLaunchConfig() {
  let fileConfig = {};

  try {
    fileConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    fileConfig = {};
  }

  return {
    siteUrl: normalizeSiteUrl(process.env.SITE_URL || fileConfig.siteUrl || defaultDomain),
    contactEmail: String(process.env.CONTACT_EMAIL || fileConfig.contactEmail || "").trim(),
    adsenseClientId: String(
      process.env.ADSENSE_CLIENT_ID || fileConfig.adsenseClientId || ""
    ).trim(),
    ga4MeasurementId: String(process.env.GA4_MEASUREMENT_ID || fileConfig.ga4MeasurementId || "").trim(),
    searchConsoleVerification: String(
      process.env.SEARCH_CONSOLE_VERIFICATION || fileConfig.searchConsoleVerification || ""
    ).trim()
  };
}

function normalizeSiteUrl(value) {
  const normalized = String(value || "").trim().replace(/\/+$/, "");
  return normalized || defaultDomain;
}

const launchConfig = readLaunchConfig();
const domain = launchConfig.siteUrl;
const hasRealDomain = domain !== defaultDomain;
const editorialReviewDate = "2026-08-12";

const pages = [
  {
    slug: "semester-gpa-calculator",
    type: "calculator",
    title: "Semester GPA Calculator Pakistan | Credit Hour GPA",
    description: "Calculate semester GPA from course grades and credit hours using common Pakistan 4.0 grading scales.",
    eyebrow: "Semester GPA",
    h1: "Semester GPA Calculator",
    intro: "Calculate the GPA for one semester by entering each course grade and credit hours.",
    calculatorTitle: "Current semester GPA calculator",
    calculatorText: "Enter only this semester's awarded letter grades and exact credit hours. This focused view does not combine an earlier CGPA.",
    sources: [
      ["HEC examination policy guidelines", "https://www.hec.gov.pk/english/services/universities/Documents/Final%20Examination%20Policy%20Guidelines.pdf", "General semester assessment and GPA/CGPA context"],
      ["Editorial methodology for this calculator", "/methodology.html", "Formula, calculator tests, and limitations"]
    ],
    sections: [
      {
        heading: "When to use semester GPA",
        body: [
          "Use semester GPA when you want to know how you performed in one term before it is combined with your older semesters.",
          "This is useful for scholarship checks, probation planning, and understanding how much each course affected your term result."
        ]
      },
      {
        heading: "Why credit hours matter",
        body: [
          "A grade in a 4-credit course has more effect than the same grade in a 1-credit course, because GPA is weighted by credit hours.",
          "For best accuracy, copy credit hours from your course outline, LMS, or official result card rather than guessing them."
        ]
      },
      {
        heading: "Reading your result card",
        body: [
          "Most Pakistan result cards list each course with its credit hours, letter grade, and grade points. Match those exact values in the calculator, including lab courses that carry their own separate credit.",
          "The two common presets are only starting points. If your university has a source-reviewed page on this site, use that page's exact preset; otherwise compare every grade point with your own transcript key."
        ]
      }
    ],
    faqs: [
      ["Does this page use my previous CGPA?", "No. This focused calculator uses only the letter grades and credit hours from the semester you enter."],
      ["Can I add labs separately?", "Yes. Add a lab as a separate row if your transcript gives it separate credit hours and a separate grade."],
      ["Can failed courses be counted?", "Yes. Enter F with the correct credit hours if your university counts the failed course in GPA. F usually contributes 0 grade points."],
      ["Which grade scale should I pick?", "Use the source-reviewed university page when available. Otherwise choose the common preset closest to your transcript and verify each point value; similarly named scales can differ by 0.01 or more."],
      ["Why is my semester GPA slightly different from the portal?", "Differences usually come from rounding, relative grading, or a department-specific grade-point table. Match the scale and credit hours carefully before comparing."]
    ]
  },
  {
    slug: "gpa-to-percentage-pakistan",
    type: "guide",
    title: "GPA to Percentage Pakistan | Conversion Guide",
    description: "Understand GPA to percentage conversion in Pakistan, the formulas universities publish, and why a single formula does not fit everyone.",
    eyebrow: "Conversion guide",
    h1: "GPA to Percentage Pakistan",
    intro: "There is no single official GPA to percentage formula for every university in Pakistan. Use this guide to understand the common approaches and avoid misleading conversions.",
    sources: [
      ["HEC equivalence downloads", "https://www.hec.gov.pk/english/services/students/DES/Pages/Downloads.aspx", "Includes HEC's notification about stopping CGPA-to-percentage conversion"],
      ["HEC final examination policy guidelines", "https://www.hec.gov.pk/english/services/universities/Documents/Final%20Examination%20Policy%20Guidelines.pdf", "Contains a fractionalized semester-system grading table; it is a different policy context from degree equivalence"],
      ["NUST postgraduate application instructions", "https://nust.edu.pk/admissions/masters/instructions-for-filling-online-application-form/", "Shows that NUST asks applicants to use CGPA when the transcript reports it"]
    ],
    sections: [
      {
        heading: "Why there is no universal formula",
        body: [
          "Pakistan universities use different grade-point tables, marks ranges, and transcript rules, so a 3.00 GPA may not equal the same percentage everywhere.",
          "If a scholarship, job, or foreign admission form asks for a percentage, use the formula published by your own university whenever one exists."
        ]
      },
      {
        heading: "What HEC and universities ask for",
        body: [
          "HEC's Degree Equivalence Section downloads include a notification titled “Stopping of Conversion of CGPA into Percentage.” That means this site should not present one blanket HEC formula as a certified degree-equivalence conversion.",
          "HEC's separate Final Examination Policy Guidelines include a fractionalized semester-system grading table. That academic-policy table and the Degree Equivalence Section's stopping notice serve different purposes; neither supports silently applying one formula to every admission, employment, or equivalence form.",
          "NUST's current postgraduate application instructions say that when both percentage and CGPA appear on a transcript, the applicant should enter the CGPA. That is an application rule, not a mathematical conversion formula."
        ]
      },
      {
        heading: "A safe decision process",
        body: [
          "For admissions, scholarships, or employment, first follow the receiving organization's wording. Submit the transcript value it requests and attach the university's grading key when allowed.",
          "If a form accepts only percentage but your transcript shows only CGPA, ask the receiving organization whether it accepts a university-issued equivalence letter. Do not silently use GPA × 25 or (GPA ÷ 4) × 100 and label it official."
        ]
      }
    ],
    faqs: [
      ["Is GPA × 25 an official Pakistan-wide formula?", "No. Multiplying by 25 is a proportional estimate, not a universal HEC or university conversion. It can misstate the meaning of a transcript grade."],
      ["What should a NUST applicant enter?", "NUST's current postgraduate instructions say to enter CGPA when both CGPA and percentage are printed on the transcript. Follow the instructions for the exact programme and year you are applying to."],
      ["Should I submit GPA or percentage?", "Submit the format the organization requests, but keep your official GPA and transcript visible if the percentage is only an estimate."],
      ["Does HEC endorse one current formula for every purpose?", "No. HEC's Degree Equivalence Section links a notification about stopping CGPA-to-percentage conversion for that process, while its Final Examination Policy Guidelines contain a context-specific semester-system table. Follow the document governing your exact application."],
      ["Can this site certify my percentage?", "No. Only your university or an authorized equivalence body can certify a conversion."]
    ]
  },
  {
    slug: "credit-hours-calculator",
    type: "guide",
    title: "Credit Hours & Quality Points Guide | Pakistan Universities",
    description: "Learn how credit hours, grade points, and quality points affect GPA and CGPA calculations in Pakistan universities.",
    eyebrow: "Credit guide",
    h1: "Credit Hours & Quality Points Guide",
    intro: "Credit hours decide how much weight each course has in GPA and CGPA. This guide explains credits, quality points, course notation, and common transcript mistakes.",
    sources: [
      ["HEC semester-system policy", "https://www.hec.gov.pk/english/policies/Pages/NCES.aspx", "National context for semester assessment and credit-hour systems"],
      ["GIKI academic setup", "https://giki.edu.pk/academics/academic-setup/", "A concrete official example of theory/lab contact hours and credit weighting"]
    ],
    sections: [
      {
        heading: "What credit hours mean",
        body: [
          "Credit hours represent the academic weight of a course. A 3-credit theory course usually has more impact on GPA than a 1-credit lab.",
          "In GPA calculations, each course grade point is multiplied by the course credit hours to give quality points."
        ]
      },
      {
        heading: "The quality points formula",
        body: [
          "Quality points = grade points × credit hours. For example, an A in a 3-credit course gives 12 quality points on a 4.0 scale.",
          "Semester GPA is total quality points divided by total semester credit hours. CGPA extends the same idea across all GPA-bearing credits counted in your cumulative record."
        ]
      },
      {
        heading: "Labs versus theory credits",
        body: [
          "Many Pakistan engineering and computing programs split a subject into a theory course and a separate lab, each with its own credit hours and grade. Enter them as separate rows so each is weighted correctly.",
          "Notation such as 4(3-1) commonly means four total credit hours made up of three theory credits and one lab credit. It does not mean four classroom hours plus three more; check the legend in your scheme of studies."
        ]
      },
      {
        heading: "Planning your semester load",
        body: [
          "A heavy semester has more credit hours and can move your CGPA more sharply, for better or worse. A light summer semester usually has a smaller effect.",
          "Always enter the exact credit hours from your course registration or result card; estimating them is the most common cause of a wrong GPA."
        ]
      }
    ],
    faqs: [
      ["Are credit hours the same as marks?", "No. Marks show your score in a course, while credit hours show the course's weight in your GPA."],
      ["Can a 1-credit lab affect GPA?", "Yes, but much less than a 3-credit or 4-credit course, because GPA is weighted by credit hours."],
      ["Should repeated courses be counted twice?", "That depends on your university's repeat policy. Some replace the grade and some average both attempts, so check the official rule."],
      ["What does 4(3-1) usually mean?", "It commonly describes a four-credit course with three theory credits and one lab credit. Confirm the notation in your own scheme of studies before entering separate rows."],
      ["Do withdrawn courses count?", "Usually not. Many universities mark withdrawn courses as W and exclude them from GPA, but confirm with your own regulations."]
    ]
  }
];

// Manually reviewed against the official sources linked on each page.
// Keep source dates and calculator grade points in sync when a policy changes.
const universityData = [
  {
    slug: "nust-gpa-calculator",
    name: "NUST",
    scaleKey: "pakistan",
    audience: "schools and colleges",
    gradeRows: [
      ["A", 4, ""], ["B+", 3.5, ""], ["B", 3, ""], ["C+", 2.5, ""],
      ["C", 2, ""], ["D+", 1.5, ""], ["D", 1, ""], ["F", 0, ""]
    ],
    gradingNote: "NUST uses relative grading (a bell curve) in most courses, so your letter grade depends on how your marks compare with the class rather than on fixed percentage cut-offs. The grade points for each letter, however, are fixed as shown above, and NUST does not award minus grades such as A- or B-.",
    standingNote: "The handbook lists 2.00 as the minimum graduation CGPA for most undergraduate programmes and 2.50 for BBA, BS Economics, BS Public Administration, BS Mass Communication, BS Accounting & Finance, and BS Psychology.",
    percentFormula: null,
    source: {
      title: "NUST Undergraduate Student Handbook",
      url: "https://nust.edu.pk/wp-content/uploads/2020/03/UG-Student-Handbook.pdf",
      fallbackTitle: "NUST student handbooks page",
      fallbackUrl: "https://nust.edu.pk/downloads/student-handbooks/",
      reviewed: "12 August 2026",
      scope: "Used for the official letter-grade points, relative-grading note, credit-hour definition, and programme-specific graduation CGPA thresholds."
    },
    faqs: [
      ["Is this the official NUST calculator?", "No. This is an independent student tool and is not affiliated with NUST."],
      ["Does NUST use relative grading?", "Yes. Most NUST courses are graded on a curve, so the marks needed for each grade depend on the class, while the grade points per letter stay fixed."],
      ["Does NUST have A- or B- grades?", "No. The cited NUST undergraduate table uses A, B+, B, C+, C, D+, D, and F with no minus grades. This page starts with that NUST-specific preset selected."],
      ["Should I convert a NUST CGPA to percentage?", "Use CGPA when your transcript reports CGPA. If another organization insists on percentage, ask NUST or that organization which documented conversion it accepts instead of assuming a universal formula."],
      ["What CGPA is required to graduate from NUST?", "The handbook lists 2.00 for most undergraduate programmes and 2.50 for several business and social-science programmes. Check the rule for your own school and intake."]
    ]
  },
  {
    slug: "fast-gpa-calculator",
    name: "FAST-NUCES",
    audience: "computing, engineering, and business campuses",
    scaleKey: "hec",
    gradeRows: [
      ["A+", 4, ""], ["A", 4, ""], ["A-", 3.67, ""], ["B+", 3.33, ""],
      ["B", 3, ""], ["B-", 2.67, ""], ["C+", 2.33, ""], ["C", 2, ""],
      ["C-", 1.67, ""], ["D+", 1.33, ""], ["D", 1, ""], ["F", 0, ""]
    ],
    gradingNote: "FAST-NUCES publishes fixed grade points for each letter grade, but the current academic rules do not provide one universal percentage-to-letter table for every undergraduate course. Use the letter grade already awarded in your result, not an assumed marks cut-off. A+ and A both carry 4.00 points.",
    standingNote: "The current rules require a minimum CGPA of 2.00 for BS and BBA, 2.50 for MS and MBA, and 3.00 for PhD to avoid academic warning.",
    percentFormula: null,
    source: {
      title: "FAST-NUCES Academic Grading and Repeat Rules",
      url: "https://www.nu.edu.pk/Student/Grading",
      reviewed: "12 August 2026",
      scope: "Used for current letter-grade points, SGPA/CGPA formulas, repeat-course treatment, excluded grades, and academic-warning thresholds. The source does not support a single site-wide marks cut-off table."
    },
    faqs: [
      ["Is this the official FAST calculator?", "No. It is an independent student tool and is not affiliated with FAST-NUCES."],
      ["Can I turn FAST marks directly into a letter grade here?", "Not reliably. The current rules publish grade points, while course grading criteria are communicated by the instructor. Enter the letter grade shown in your official result."],
      ["Does an A+ count higher than an A at FAST?", "No. A+ and A both carry 4.0 grade points, so they have the same effect on GPA. The FAST-specific preset includes both labels."],
      ["What CGPA do I need to graduate from FAST?", "Most undergraduate programs require a minimum CGPA of 2.00, with higher minimums for MS and PhD."],
      ["How does FAST handle a repeated course?", "The current academic rules say only the most recent grade points are used in CGPA, even when the new grade is lower. Rebuild the cumulative record carefully if you are checking a repeat." ]
    ]
  },
  {
    slug: "comsats-gpa-calculator",
    name: "COMSATS",
    audience: "campuses and faculties",
    scaleKey: "hec",
    gradeRows: [
      ["A", 4, "85 and above"], ["A-", 3.66, "80–84"], ["B+", 3.33, "75–79"], ["B", 3, "71–74"],
      ["B-", 2.66, "68–70"], ["C+", 2.33, "64–67"], ["C", 2, "61–63"], ["C-", 1.66, "58–60"],
      ["D+", 1.3, "54–57"], ["D", 1, "50–53"], ["F", 0, "Below 50"]
    ],
    gradingNote: "COMSATS University Islamabad uses absolute grading, adopted university-wide from Fall 2021. Your letter grade comes directly from your marks using the fixed bands above, regardless of the class average.",
    standingNote: "Under the published table, D is worth 1.00 point and F is worth 0.00. Degree-completion and academic-standing requirements can differ by programme, so this calculator does not label a result as an official pass or fail.",
    percentFormula: null,
    source: {
      title: "COMSATS notification adopting the HEC grading criteria",
      url: "https://ww2.comsats.edu.pk/qec/downloads/Notification4304.pdf",
      reviewed: "12 August 2026",
      scope: "Used for the grading method, marks bands, and grade-point values effective for Fall 2021 admissions onward."
    },
    faqs: [
      ["Is this the official COMSATS calculator?", "No. It is an independent student tool and is not affiliated with COMSATS University Islamabad."],
      ["Does COMSATS use absolute or relative grading?", "COMSATS uses absolute grading. Your marks map to a fixed band, so a higher class average does not lower your grade."],
      ["What point value does a D carry at COMSATS?", "The published table assigns D 1.00 point for 50–53 marks and F 0.00 below 50. Your programme rules still determine progression and graduation requirements."],
      ["Does COMSATS use minus grades?", "Yes. The cited COMSATS table includes A-, B-, and C-. Use the COMSATS-specific preset because its 3.66/2.66/1.66 values differ from a common 3.67-style scale."],
      ["Why might the result differ by 0.01?", "COMSATS publishes 3.66 for A-, 2.66 for B-, and 1.66 for C-. A generic 3.67 scale can produce a slightly different answer, so this page uses the COMSATS-specific values."]
    ]
  },
  {
    slug: "iiui-gpa-calculator",
    name: "IIUI",
    audience: "faculties and departments",
    scaleKey: "pakistan",
    gradeRows: [
      ["A", 4, "80–100"], ["B+", 3.5, "75–79"], ["B", 3, "70–74"], ["C+", 2.5, "65–69"],
      ["C", 2, "60–64"], ["D+", 1.5, "55–59"], ["D", 1, "50–54"], ["F", 0, "Below 50"]
    ],
    gradingNote: "International Islamic University Islamabad publishes the absolute grade table above on a half-point scale with no minus grades. The table assigns D (1.00) to 50–54 marks, but programme-specific course-completion and progression requirements can be stricter, so the calculator does not label a result as an official pass or fail.",
    standingNote: "The undergraduate regulations list 2.00 as the minimum CGPA for award of an undergraduate degree. Programme rules and later amendments remain authoritative.",
    percentFormula: null,
    source: {
      title: "IIUI Academic Regulations for Undergraduate Studies (Spring 2024 edition)",
      url: "https://www.iiu.edu.pk/wp-content/uploads/2025/06/Academic-Regulations-UG-Studies-Spring-2024-03062025.pdf",
      reviewed: "12 August 2026",
      scope: "Spring 2024 regulation edition; used for absolute grading, percentage bands, grade points, GPA/CGPA computation, and the undergraduate degree threshold."
    },
    faqs: [
      ["Is this the official IIUI calculator?", "No. It is an independent student tool and is not affiliated with International Islamic University Islamabad."],
      ["Does IIUI use minus grades?", "No. The cited IIUI table uses a half-point scale with no minus grades. This page starts with the IIUI-specific preset selected."],
      ["What does the IIUI table assign at 50%?", "The cited undergraduate table maps 50–54 marks to D (1.00 point). Check your programme's current course-completion requirement before treating that letter as sufficient."],
      ["Is IIUI grading absolute or relative?", "IIUI uses absolute grading, so your grade depends on your own marks rather than the class average."],
      ["How does IIUI calculate GPA?", "The regulations use the sum of each course's credit hours multiplied by its grade point, divided by the total attempted credit hours."]
    ]
  },
  {
    slug: "giki-gpa-calculator",
    name: "GIKI",
    audience: "engineering and science programs",
    scaleKey: "hec",
    gradeRows: [
      ["A", 4, ""], ["A-", 3.67, ""], ["B+", 3.33, ""], ["B", 3, ""], ["B-", 2.67, ""],
      ["C+", 2.33, ""], ["C", 2, ""], ["C-", 1.67, ""], ["D+", 1.33, ""], ["D", 1, ""], ["F", 0, ""]
    ],
    gradingNote: "GIKI publishes fixed grade points per credit for letter grades, while the course's assessment determines the letter awarded. Because the official academic page does not publish one universal marks cut-off table, enter the letter grade shown in your result. I (Incomplete) and W (Withdrawn) are excluded from GPA.",
    standingNote: "A semester GPA below 2.00 places a student on academic probation, so high-credit courses deserve the most attention.",
    percentFormula: null,
    source: {
      title: "GIKI Academic Setup — grading and credit-hour system",
      url: "https://giki.edu.pk/academics/academic-setup/",
      reviewed: "12 August 2026",
      scope: "Used for grade points, credit-hour weighting, treatment of I/W grades, semester load, and academic-standing guidance."
    },
    faqs: [
      ["Is this the official GIKI calculator?", "No. It is an independent student tool and is not affiliated with the Ghulam Ishaq Khan Institute."],
      ["Can I convert GIKI marks to a grade with one table?", "The cited academic page publishes grade points but not a universal percentage cut-off table. Use the letter grade awarded for the course."],
      ["Do I and W grades affect my GIKI GPA?", "No. Incomplete (I) and Withdrawn (W) grades are not counted in the GPA calculation."],
      ["Why should labs be separate?", "GIKI defines theory and laboratory credit hours differently. If a lab has its own grade and credit, entering it separately preserves the correct weight."],
      ["When does GIKI place a student on probation?", "Generally when the semester GPA falls below 2.00. Check the current academic regulations for details."]
    ]
  },
  {
    slug: "pieas-gpa-calculator",
    name: "PIEAS",
    audience: "engineering and science programs",
    scaleKey: "hec",
    gradeRows: [
      ["A+", 4, "85 and above"], ["A", 4, "80–84"], ["A-", 3.67, "75–79"], ["B+", 3.33, "70–74"],
      ["B", 3, "65–69"], ["B-", 2.67, "60–64"], ["C+", 2.33, "55–59"], ["C", 2, "50–54"],
      ["D", 1, "45–49"], ["F", 0, "Below 45"]
    ],
    gradingNote: "PIEAS uses the published marks-to-grade table above for BS programmes. A+ and A both earn 4.00 points, and a D remains part of the scale even though the rules set C (2.00) as the minimum passing criterion for an undergraduate course.",
    standingNote: "The cited BS regulations list 2.00/C as the course minimum and 2.33/C+ as the semester and degree minimum. Use the rule for your intake if a newer revision is issued.",
    percentFormula: null,
    source: {
      title: "PIEAS Academic Rules and Regulations for BS Programs (September 2023)",
      url: "https://admissions.pieas.edu.pk/Academic_Rules/Academic_Rules_for_BS_Programs_for_Intake_Sesions_2022_and_Onward.pdf",
      reviewed: "12 August 2026",
      scope: "Applies to BS intake sessions 2022 onward; used for the full marks table, grade points, GPA formula, and course/semester/degree minimum criteria."
    },
    faqs: [
      ["Is this the official PIEAS calculator?", "No. It is an independent student tool and is not affiliated with PIEAS."],
      ["What is the minimum passing grade at PIEAS?", "The cited BS rules set C (2.00) as the minimum for a course. They set C+ (2.33) as the minimum semester GPA and degree CGPA."],
      ["Does PIEAS use absolute grading?", "Yes. PIEAS uses absolute grading, so your grade comes from your own marks, not the class average."],
      ["Does PIEAS include D in its BS scale?", "Yes. The September 2023 table assigns D 1.00 for 45–49 marks, although C is the minimum passing grade for a course."],
      ["Why does the PIEAS page need its own preset?", "Its percentage bands differ from generic with-minus scales: for example, A begins at 80 and A+ begins at 85 in the cited BS rules."]
    ]
  },
  {
    slug: "air-university-gpa-calculator",
    name: "Air University",
    audience: "campuses and departments",
    scaleKey: "hec",
    gradeRows: [
      ["A", 4, ""], ["A-", 3.67, ""], ["B+", 3.33, ""], ["B", 3, ""], ["B-", 2.67, ""],
      ["C+", 2.33, ""], ["C", 2, ""], ["C-", 1.67, ""], ["D", 1, ""], ["F", 0, ""]
    ],
    gradingNote: "Air University uses relative grading when a course has 15 or more students, and absolute grading for smaller classes. The grade points per letter are fixed; the marks needed for each grade depend on the method used in your course.",
    standingNote: "The current regulations use relative grading for undergraduate courses, except classes with fewer than 15 students, where the published absolute method applies. The official transcript remains decisive because the marks boundary can vary in a relatively graded class.",
    percentFormula: null,
    source: {
      title: "Air University Academic Regulations 2025",
      url: "https://au.edu.pk/Pages/Academics/assets/forms/AU_Regulation_2025_21_November.pdf",
      reviewed: "12 August 2026",
      scope: "Used for the current undergraduate grade points, relative/absolute grading rule, GPA calculation, and excluded special grades."
    },
    faqs: [
      ["Is this the official Air University calculator?", "No. It is an independent student tool and is not affiliated with Air University."],
      ["Is Air University grading relative or absolute?", "Both. Courses with 15 or more students use relative grading; smaller classes use absolute grading."],
      ["Does Air University use D+?", "The 2025 undergraduate grade-point table lists D at 1.00 but does not list D+. This page's source-specific preset follows that table."],
      ["Do W and I grades count in GPA?", "The regulations treat W as withdrawn and I as incomplete rather than ordinary grade-point grades. Do not enter them as credit-bearing letter grades until an earned grade replaces them."],
      ["Why is my Air University estimate slightly off?", "Relative grading decides the letter grade in most undergraduate classes. Once you enter the official letter grade and exact credits, the calculator applies the published point value."]
    ]
  },
  {
    slug: "uet-gpa-calculator",
    name: "UET",
    audience: "engineering departments and campuses",
    scaleKey: "hec",
    gradeRows: [
      ["A+", 4, ""], ["A", 4, ""], ["A-", 3.7, ""], ["B+", 3.3, ""], ["B", 3, ""], ["B-", 2.7, ""],
      ["C+", 2.3, ""], ["C", 2, ""], ["C-", 1.7, ""], ["D+", 1.3, ""], ["D", 1, ""], ["F", 0, ""]
    ],
    gradingNote: "UET Lahore's undergraduate regulations describe relative letter-grade assignment and publish one-decimal point values. A+ and A both carry 4.0, while A- is 3.7 and B+ is 3.3. This differs slightly from common 3.67/3.33 presets.",
    standingNote: "D is the lowest passing letter grade in the cited regulations. W, WF, I, and IP do not carry grade points in the published table; confirm repeat and progression effects with the examination office.",
    percentFormula: null,
    source: {
      title: "UET Lahore Undergraduate Semester Regulations 2015",
      url: "https://uet.edu.pk/gallery/UG_Sem_Regulations_2016.pdf",
      reviewed: "12 August 2026",
      scope: "Used for the relative-grading method, exact one-decimal grade points, GPA/CGPA formulas, and non-point grades."
    },
    faqs: [
      ["Is this the official UET calculator?", "No. It is an independent student tool and is not affiliated with UET Lahore or its campuses."],
      ["Does UET use relative grading?", "The cited undergraduate regulations describe a relative process with instructor-set minimum and maximum thresholds. Enter the final awarded letter grade rather than guessing it from marks."],
      ["Does an A+ count higher than an A at UET?", "No. A+ and A both carry 4.0 points in the cited UET table. The UET-specific preset includes both labels."],
      ["What is the lowest passing grade at UET?", "D is the lowest passing letter grade in the cited regulations. The relative-grading process means there is not one fixed percentage boundary for every class."],
      ["Why is a generic calculator slightly different?", "UET publishes A- as 3.7, B+ as 3.3, and B- as 2.7. Generic scales often use 3.67, 3.33, and 2.67; this page uses the UET values."]
    ]
  },
  {
    slug: "ist-gpa-calculator",
    name: "IST",
    audience: "aerospace, engineering, and space science programs",
    scaleKey: "hec",
    gradeRows: [
      ["A", 4, "85–100"], ["A-", 3.7, "81–84"], ["B+", 3.3, "77–80"], ["B", 3, "73–76"],
      ["B-", 2.7, "69–72"], ["C+", 2.3, "65–68"], ["C", 2, "61–64"], ["C-", 1.7, "57–60"],
      ["D+", 1.3, "52–56"], ["D", 1, "50–51"], ["F", 0, "Below 50"]
    ],
    gradingNote: "IST uses relative grading by default for undergraduate theory courses, so the marks boundary for a letter can move with class performance. Labs and FYP use the published absolute bands shown above. This page uses IST's exact one-decimal point values, including D+ at 1.3, after you enter the letter grade actually awarded.",
    standingNote: "IST calculates SGPA as the sum of credit hours multiplied by grade points divided by semester credit hours, and calculates CGPA over all taken courses. The current handbook explains separate summer-semester grading and repeat-course treatment, which this current-semester estimate cannot reconstruct automatically.",
    percentFormula: null,
    source: {
      title: "IST Undergraduate Student's Handbook 2025",
      url: "https://oldsite.ist.edu.pk/downloads/Admission/UG-HB-2025.pdf",
      fallbackTitle: "current IST admissions page",
      fallbackUrl: "https://www.ist.edu.pk/admission?section=admission-info",
      reviewed: "12 August 2026",
      scope: "Used for the default relative-grading rule, absolute lab/FYP marks bands, exact grade points, SGPA/CGPA formula, summer grading, and repeat-course notes."
    },
    faqs: [
      ["Is this the official IST calculator?", "No. It is an independent student tool and is not affiliated with the Institute of Space Technology."],
      ["What grade points does IST use?", "The IST table uses one-decimal values for several grades: A- is 3.7, B+ is 3.3, B- is 2.7, C+ is 2.3, and C- is 1.7. This page's preset uses those exact values."],
      ["What does IST assign to D and D+?", "The cited table assigns D+ 1.3 points and D 1.0 point. In the absolute lab/FYP table, D+ covers 52–56 marks and D covers 50–51; relative theory-course boundaries can differ."],
      ["Does IST use minus and plus grades?", "Yes. The cited IST table includes A-, B+, B-, C+, C-, and D+. This page starts with the IST-specific one-decimal preset selected."],
      ["Why is my IST GPA slightly different?", "Check that you selected the IST source-specific preset and entered the exact credits. Summer grading and repeated courses have additional rules that a simple current-semester estimate cannot reconstruct automatically."]
    ]
  }
];

const universityPages = universityData.map((uni, index) => ({
  slug: uni.slug,
  type: "university",
  name: uni.name,
  scaleKey: uni.scaleKey,
  gradeRows: uni.gradeRows,
  gradingNote: uni.gradingNote,
  standingNote: uni.standingNote,
  percentFormula: uni.percentFormula,
  source: uni.source,
  title: `${uni.name} GPA Calculator | Semester GPA and CGPA Tool`,
  description: `Estimate ${uni.name} semester GPA and CGPA with source-reviewed grade points and credit hours. Includes the official reference and limitations.`,
  eyebrow: "University calculator",
  h1: `${uni.name} GPA Calculator`,
  intro: `Use this unofficial ${uni.name} GPA calculator to estimate your semester GPA and updated CGPA using ${uni.name}'s grading scale and your credit hours.`,
  calculatorTitle: `${uni.name} GPA and CGPA estimate`,
  calculatorText: `Enter the letter grades already awarded by ${uni.name} and the exact credit hours. This page starts with the source-reviewed ${uni.name} point values; your official transcript remains final.`,
  scaleIntro: `${uni.name} reports results on a 4.0 grade-point scale. The table below shows the grade points for each letter grade${uni.gradeRows.some((row) => row[2]) ? " and the published marks band for each" : ""}. Use it alongside the calculator above to estimate your GPA and CGPA.`,
  workedExample: workedExampleFor(uni, index),
  tipsNote: `Pick the grade scale that matches your result card, enter every current-semester course with its exact credit hours, and keep lab and theory courses on separate rows when they carry separate credits. If your department uses a different grade-point table, treat the result as a planning estimate.`,
  audience: uni.audience,
  faqs: uni.faqs
}));

function workedExampleFor(university, index) {
  const firstGrade = university.gradeRows.find(([grade]) => grade === "A") || university.gradeRows[0];
  const alternatives = university.gradeRows.filter(([grade, points]) => grade !== firstGrade[0] && grade !== "A+" && points > 0);
  const secondGrade = alternatives[index % alternatives.length];
  const firstCredits = 3;
  const secondCredits = (index % 3) + 1;
  const firstPoints = firstGrade[1] * firstCredits;
  const secondPoints = secondGrade[1] * secondCredits;
  const totalCredits = firstCredits + secondCredits;
  const totalPoints = firstPoints + secondPoints;
  const semesterGpa = totalPoints / totalCredits;
  const updatedCgpa = ((3.2 * 60) + totalPoints) / (60 + totalCredits);

  return [
    `On the ${university.name} preset, grade ${firstGrade[0]} (${firstGrade[1].toFixed(2)}) in a ${firstCredits}-credit course and grade ${secondGrade[0]} (${secondGrade[1].toFixed(2)}) in a ${secondCredits}-credit course produce ${firstPoints.toFixed(2)} + ${secondPoints.toFixed(2)} = ${totalPoints.toFixed(2)} quality points.`,
    `Divide ${totalPoints.toFixed(2)} by ${totalCredits} credits for a semester GPA of ${semesterGpa.toFixed(2)}. With a previous CGPA of 3.20 over 60 credits, the simplified updated estimate is ${updatedCgpa.toFixed(2)} before any university-specific repeat or exclusion rule.`
  ];
}

const allPages = [...pages, ...universityPages];

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function contactChannel() {
  if (!launchConfig.contactEmail) {
    return `<p class="launch-note">Before public launch, replace this note with the owner email address so students and AdSense reviewers have a clear contact method.</p>`;
  }

  const email = escapeHtml(launchConfig.contactEmail);
  return `<p>Email: <a href="mailto:${email}">${email}</a></p>`;
}

function verificationMeta() {
  if (!launchConfig.searchConsoleVerification) {
    return "";
  }

  return `<meta name="google-site-verification" content="${escapeHtml(launchConfig.searchConsoleVerification)}">`;
}

function analyticsSnippet() {
  if (!launchConfig.ga4MeasurementId) {
    return "";
  }

  const measurementId = escapeHtml(launchConfig.ga4MeasurementId);
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag("js", new Date());
      gtag("config", "${measurementId}");
    </script>`;
}

function adsenseSnippet() {
  if (!launchConfig.adsenseClientId) {
    return "";
  }

  const clientId = escapeHtml(launchConfig.adsenseClientId);
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}"
     crossorigin="anonymous"></script>`;
}

function optionalHeadTags() {
  return [verificationMeta(), adsenseSnippet(), analyticsSnippet()].filter(Boolean).join("\n    ");
}

function nonAdHeadTags() {
  return [verificationMeta(), analyticsSnippet()].filter(Boolean).join("\n    ");
}

function faviconTags() {
  return `<link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">`;
}

function themeScript() {
  return `<script>
      (function () {
        try {
          var storedTheme = localStorage.getItem("gpa-theme");
          var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.dataset.theme = storedTheme || (prefersDark ? "dark" : "light");
        } catch (error) {
          document.documentElement.dataset.theme = "light";
        }
      })();
    </script>`;
}

function nav(base) {
  return `<header class="site-header">
      <nav class="nav-shell" aria-label="Main navigation">
        <a class="brand" href="/" aria-label="GPA Calculator Pakistan home">
          <span class="brand-mark" aria-hidden="true">4.0</span>
          <span>GPA Calculator Pakistan</span>
        </a>
        <button class="nav-toggle" id="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="nav-actions" id="primary-nav">
          <div class="nav-links">
            <a href="/#calculator">Calculator</a>
            <a href="/#tools">Tools</a>
            <a href="/#universities">Universities</a>
            <a href="/#guide">Guide</a>
            <a href="/methodology.html">Sources</a>
            <a href="/about.html">About</a>
            <a href="/contact.html">Contact</a>
            <a href="/privacy.html">Privacy</a>
          </div>
          <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark theme">
            <span class="theme-toggle__icon" aria-hidden="true">D</span>
            <span class="theme-toggle__label">Dark</span>
          </button>
        </div>
      </nav>
    </header>`;
}

function footer(base) {
  return `<footer class="site-footer">
      <div>
        <strong>GPA Calculator Pakistan</strong>
        <p>Unofficial GPA and CGPA tools for students.</p>
      </div>
      <div class="footer-links">
        <a href="/#calculator">Calculator</a>
        <a href="/#tools">Tools</a>
        <a href="/#universities">Universities</a>
        <a href="/methodology.html">Methodology &amp; sources</a>
        <a href="/about.html">About</a>
        <a href="/contact.html">Contact</a>
        <a href="/privacy.html">Privacy Policy</a>
      </div>
    </footer>`;
}

function calculator(page) {
  const hasSourceScale = page.type === "university";
  const semesterOnly = page.slug === "semester-gpa-calculator";
  const defaultScale = hasSourceScale ? "university" : page.scaleKey || "pakistan";
  const sourceScale = hasSourceScale
    ? `<script type="application/json" id="page-grade-scale">${escapeJson({
        label: `${page.name} source-reviewed scale`,
        note: `${page.name} point values are selected. Source and review date are shown below. Use the letter grade from your official result.`,
        grades: page.gradeRows.map(([grade, points]) => [grade, points])
      })}</script>`
    : "";
  return `<section class="calculator-section" id="calculator" aria-labelledby="calculator-title" data-animate>
        <div class="section-heading">
          <p class="eyebrow">Start calculating</p>
          <h2 id="calculator-title">${page.calculatorTitle}</h2>
          <p>${page.calculatorText}</p>
        </div>
        <form class="calculator-shell" id="gpa-form" novalidate data-animate data-default-scale="${defaultScale}" data-calculation-mode="${semesterOnly ? "semester" : "cumulative"}">
          <div class="toolbar">
            <div>
              <label for="scale-select">Grade scale</label>
              <select id="scale-select" name="scale">
                ${hasSourceScale
                  ? `<option value="university">${page.name} source-reviewed scale</option>`
                  : `<option value="pakistan">Common 4.0 scale (no minus grades)</option>
                <option value="hec">Common 4.0 scale (with minus grades)</option>`}
              </select>
            </div>
            <div class="toolbar-actions">
              <button class="button button-secondary" type="button" id="fill-sample"><span aria-hidden="true">+</span>Sample</button>
              <button class="button button-secondary" type="button" id="reset-form"><span aria-hidden="true">x</span>Reset</button>
              <button class="button button-secondary" type="button" id="print-result"><span aria-hidden="true">p</span>Print</button>
            </div>
          </div>
          <div class="calculator-grid">
            <div class="entry-panel">
              <div ${semesterOnly ? "hidden" : 'class="previous-grid"'}>
                <div>
                  <label for="previous-cgpa">Previous CGPA</label>
                  <input id="previous-cgpa" name="previousCgpa" type="number" min="0" max="4" step="0.01" inputmode="decimal" placeholder="3.20">
                </div>
                <div>
                  <label for="completed-credits">Credits behind previous CGPA</label>
                  <input id="completed-credits" name="completedCredits" type="number" min="0" step="0.5" inputmode="decimal" placeholder="60" aria-describedby="completed-help">
                  <small id="completed-help">Prior credits your transcript used for that CGPA; exclude this semester.</small>
                </div>
              </div>
              <div class="course-table-wrap">
                <table class="course-table">
                  <caption>Current semester courses</caption>
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Credits</th>
                      <th scope="col">Quality points</th>
                      <th scope="col"><span class="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody id="course-rows"></tbody>
                </table>
              </div>
              <div class="table-actions">
                <button class="button button-secondary" type="button" id="add-row"><span aria-hidden="true">+</span>Add course</button>
                <p id="row-counter" aria-live="polite">8 of 30 rows</p>
              </div>
            </div>
            <aside class="result-panel" aria-labelledby="results-title">
              <p class="eyebrow">Live result</p>
              <h3 id="results-title">Your GPA summary</h3>
              <div class="score-pair${semesterOnly ? " score-pair-single" : ""}">
                <div><span>Semester GPA</span><strong id="semester-gpa">0.00</strong></div>
                <div${semesterOnly ? " hidden" : ""}><span>Updated CGPA</span><strong id="updated-cgpa">&mdash;</strong></div>
              </div>
              <dl class="result-list">
                <div><dt>Semester credits</dt><dd id="semester-credits">0</dd></div>
                <div><dt>Total quality points</dt><dd id="total-points">0.00</dd></div>
                <div><dt>Courses counted</dt><dd id="courses-counted">0</dd></div>
                <div><dt>GPA band</dt><dd id="standing">&mdash;</dd></div>
              </dl>
              <div class="formula-box">
                <strong>${semesterOnly ? "Semester GPA formula" : "CGPA formula"}</strong>
                <p>${semesterOnly ? "total quality points / semester credit hours" : "((previous CGPA x prior GPA credits) + current quality points) / total GPA credits"}</p>
              </div>
              <p class="status-message" id="status-message" role="status" aria-live="polite">Select grades and credit hours to calculate your GPA.</p>
            </aside>
          </div>
        </form>
        ${sourceScale}
      </section>`;
}

function linkGrid(page) {
  const usefulLinks = [
    ["/", "Main GPA & CGPA calculator", "Compare either common scale and plan an updated CGPA."],
    ["/semester-gpa-calculator/", "Semester GPA calculator", "Focus on one term and see how credits weight each grade."],
    ["/methodology.html", "Calculation method & sources", "Check the formula, source register, tests, and limitations."],
    ["/credit-hours-calculator/", "Credit-hours guide", "Understand quality points, labs, and weighted course loads."],
    ["/gpa-to-percentage-pakistan/", "GPA-to-percentage guide", "Avoid unsupported one-size-fits-all conversions."]
  ].filter(([href]) => href !== `/${page.slug}/`);
  const tools = usefulLinks.slice(0, 4).map(([href, label, description]) => `<a class="link-card" href="${href}"><strong>${label}</strong><span>${description}</span></a>`).join("\n          ");
  return `<section class="content-band" aria-labelledby="related-title" data-animate>
        <div class="section-heading">
          <p class="eyebrow">Related tools</p>
          <h2 id="related-title">Keep exploring GPA calculators</h2>
          <p>Continue with the most relevant calculator or explainer. The full source-reviewed university list is on the homepage.</p>
        </div>
        <div class="link-grid">
          ${tools}
        </div>
      </section>`;
}

function gradeScaleTable(page) {
  const hasMarks = page.gradeRows.some((row) => row[2]);
  const head = hasMarks
    ? `<tr><th scope="col">Grade</th><th scope="col">Grade points</th><th scope="col">Published marks (%)</th></tr>`
    : `<tr><th scope="col">Grade</th><th scope="col">Grade points</th></tr>`;
  const rows = page.gradeRows
    .map(([grade, points, marks]) =>
      hasMarks
        ? `<tr><td>${grade}</td><td>${points.toFixed(2)}</td><td>${marks || "&mdash;"}</td></tr>`
        : `<tr><td>${grade}</td><td>${points.toFixed(2)}</td></tr>`
    )
    .join("\n              ");
  return `<div class="scale-table-wrap">
            <table class="scale-table">
              <caption class="sr-only">${page.name} grade points</caption>
              <thead>${head}</thead>
              <tbody>
              ${rows}
              </tbody>
            </table>
          </div>`;
}

function universitySections(page) {
  return `<section class="content-band" aria-labelledby="grading-title" data-animate>
        <div class="section-heading">
          <p class="eyebrow">Grading scale</p>
          <h2 id="grading-title">${page.name} grading scale</h2>
          <p>${page.scaleIntro}</p>
        </div>
        ${gradeScaleTable(page)}
        <p class="table-note">${page.gradeRows.some((row) => row[2]) ? "Marks bands are shown only where they appear in the cited source." : "No marks column is shown because the cited source does not publish one universal percentage cut-off table."}</p>
      </section>
      <section class="content-band" aria-labelledby="guide-title" data-animate>
        <div class="article-grid">
          <article class="content-card">
            <h2 id="guide-title">How grading works at ${page.name}</h2>
            <p>${page.gradingNote}</p>
            <p>${page.standingNote}</p>
          </article>
          <article class="content-card">
            <h2>Worked example</h2>
            ${page.workedExample.map((paragraph) => `<p>${paragraph}</p>`).join("\n            ")}
          </article>
          <article class="content-card">
            <h2>Get an accurate estimate</h2>
            <p>${page.tipsNote}</p>
            ${page.percentFormula ? `<p>${page.percentFormula}</p>` : ""}
          </article>
          <aside class="disclaimer-box">
            <strong>Unofficial estimate</strong>
            <p>This website is independent and not affiliated with ${page.name} or any university. Always use your official transcript, examination office, or department policy for final GPA and CGPA decisions.</p>
          </aside>
        </div>
        <aside class="source-card" aria-labelledby="source-title">
          <div>
            <p class="eyebrow">Primary reference</p>
            <h2 id="source-title">Source and review scope</h2>
            <p>Reviewed by the GPA Calculator Pakistan editorial maintainer on <time datetime="${editorialReviewDate}">${page.source.reviewed}</time> against <a href="${page.source.url}" rel="external">${page.source.title}</a>${page.source.fallbackUrl ? `. If that document host is temporarily unavailable, use the <a href="${page.source.fallbackUrl}" rel="external">${page.source.fallbackTitle}</a>.` : "."}</p>
            <p>${page.source.scope}</p>
          </div>
          <p class="source-caveat"><strong>Check before a final decision:</strong> universities can amend rules by intake, campus, department, or programme. Send a correction if the linked source has been replaced.</p>
        </aside>
      </section>`;
}

function sectionCards(page) {
  return `<section class="content-band" aria-labelledby="guide-title" data-animate>
        <div class="article-grid">
          ${page.sections
            .map(
              (section, index) => `<article class="content-card">
            <h2${index === 0 ? ' id="guide-title"' : ""}>${section.heading}</h2>
            ${section.body.map((paragraph) => `<p>${paragraph}</p>`).join("\n            ")}
          </article>`
            )
            .join("\n          ")}
          <aside class="disclaimer-box">
            <strong>Unofficial estimate</strong>
            <p>This website is independent and not affiliated with any university. Always use your official transcript, examination office, or department policy for final GPA and CGPA decisions.</p>
          </aside>
        </div>
        ${sourceList(page)}
      </section>`;
}

function sourceList(page) {
  if (!page.sources || page.sources.length === 0) {
    return "";
  }

  const items = page.sources.map(([title, url, scope]) => {
    const rel = /^https?:/.test(url) ? ' rel="external"' : "";
    return `<li><a href="${url}"${rel}>${title}</a><span>${scope}</span></li>`;
  }).join("\n              ");

  return `<aside class="source-card source-card-list" aria-labelledby="page-sources-title">
          <div>
            <p class="eyebrow">References</p>
            <h2 id="page-sources-title">Sources and method</h2>
            <p>Reviewed on <time datetime="${editorialReviewDate}">12 August 2026</time>. These links support the policy context; the calculator remains an independent planning tool.</p>
          </div>
          <ul>
              ${items}
          </ul>
        </aside>`;
}

function pageHighlights(page) {
  if (page.type === "university") {
    return [
      [String(page.gradeRows.length), "published grades"],
      ["Exact", "page preset"],
      ["Source", "linked below"]
    ];
  }

  if (page.slug === "gpa-to-percentage-pakistan") {
    return [["No", "universal formula"], ["2", "primary sources"], ["Safe", "decision path"]];
  }

  if (page.slug === "credit-hours-calculator") {
    return [["4(3-1)", "notation explained"], ["Weighted", "quality points"], ["2", "primary sources"]];
  }

  return [["4.0", "scale focus"], ["30", "course rows"], ["Free", "no signup"]];
}

function faqSection(page) {
  return `<section class="faq-section" id="faq" aria-labelledby="faq-title" data-animate>
        <div class="section-heading">
          <p class="eyebrow">FAQ</p>
          <h2 id="faq-title">${page.h1} FAQ</h2>
        </div>
        <div class="faq-list">
          ${page.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n          ")}
        </div>
      </section>`;
}

function faqJson(page) {
  return `<script type="application/ld+json">
      ${escapeJson({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text }
        }))
      })}
    </script>`;
}

function pageTemplate(page) {
  const base = "../";
  const canonicalUrl = `${domain}/${page.slug}/`;
  const isCalculator = page.type !== "guide";
  const isUniversity = page.type === "university";
  const highlights = pageHighlights(page);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${page.title}</title>
    <meta name="description" content="${page.description}">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="${page.h1}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${domain}/og-image.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${page.h1}">
    <meta name="twitter:description" content="${page.description}">
    <meta name="twitter:image" content="${domain}/og-image.png">
    <link rel="canonical" href="${canonicalUrl}">
    ${faviconTags()}
    ${optionalHeadTags()}
    ${themeScript()}
    <link rel="stylesheet" href="${base}styles.css">
    <script type="application/ld+json">
      ${escapeJson({
        "@context": "https://schema.org",
        "@type": isCalculator ? "WebApplication" : "Article",
        name: page.h1,
        applicationCategory: isCalculator ? "EducationalApplication" : undefined,
        operatingSystem: isCalculator ? "Any" : undefined,
        headline: !isCalculator ? page.h1 : undefined,
        description: page.description,
        url: canonicalUrl,
        dateModified: editorialReviewDate,
        author: { "@type": "Organization", name: "GPA Calculator Pakistan", url: domain },
        publisher: { "@type": "Organization", name: "GPA Calculator Pakistan", url: domain },
        offers: isCalculator ? { "@type": "Offer", price: "0", priceCurrency: "USD" } : undefined
      })}
    </script>
    ${faqJson(page)}
  </head>
  <body data-page-type="${page.type}" data-page-slug="${page.slug}">
    <a class="skip-link" href="${isCalculator ? "#calculator" : "#guide-title"}">Skip to main content</a>
    ${nav(base)}
    <main>
      <section class="hero-band" aria-labelledby="page-title" data-animate>
        <div class="hero-copy">
          <p class="eyebrow">${page.eyebrow}</p>
          <h1 id="page-title">${page.h1}</h1>
          <p>${page.intro}</p>
          <div class="hero-actions" aria-label="Primary actions">
            ${isCalculator ? '<button class="button button-primary" type="button" id="hero-sample"><span aria-hidden="true">+</span>Load sample</button>' : '<a class="button button-primary" href="/#calculator"><span aria-hidden="true">+</span>Open calculator</a>'}
            <a class="button button-ghost" href="#guide-title">Read guide</a>
          </div>
        </div>
        <aside class="quick-stats" aria-label="Page highlights">
          ${highlights.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("\n          ")}
        </aside>
      </section>
      ${isCalculator ? calculator(page) : ""}
      ${isUniversity ? universitySections(page) : sectionCards(page)}
      ${linkGrid(page)}
      ${faqSection(page)}
    </main>
    ${footer(base)}
    <script src="${base}script.js"></script>
  </body>
</html>
`;
}

function trustPage({ file, title, description, h1, eyebrow, body, pageSlug }) {
  const base = "";
  const canonicalUrl = `${domain}/${file}`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="${h1}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${domain}/og-image.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${domain}/og-image.png">
    <link rel="canonical" href="${canonicalUrl}">
    ${faviconTags()}
    ${nonAdHeadTags()}
    ${themeScript()}
    <link rel="stylesheet" href="styles.css">
  </head>
  <body data-page-type="trust" data-page-slug="${pageSlug}">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    ${nav(base)}
    <main id="main-content">
      <section class="hero-band privacy-hero" aria-labelledby="page-title" data-animate>
        <div class="hero-copy">
          <p class="eyebrow">${eyebrow}</p>
          <h1 id="page-title">${h1}</h1>
          <p>${description}</p>
        </div>
      </section>
      <section class="content-band" data-animate>
        <div class="article-grid">
          ${body}
        </div>
      </section>
    </main>
    ${footer(base)}
    <script src="script.js"></script>
  </body>
</html>
`;
}

function writeFile(relativePath, content) {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content.replace(/[ \t]+$/gm, ""), "utf8");
}

allPages.forEach((page) => {
  writeFile(path.join(page.slug, "index.html"), pageTemplate(page));
});

writeFile(
  "about.html",
  trustPage({
    file: "about.html",
    title: "About GPA Calculator Pakistan",
    description: "Learn about GPA Calculator Pakistan, an independent student tool hub for GPA, CGPA, credit hours, and percentage guidance.",
    h1: "About GPA Calculator Pakistan",
    eyebrow: "About",
    pageSlug: "about",
    body: `<article class="content-card">
            <h2>Why this site exists</h2>
            <p>GPA Calculator Pakistan is an independent project built for students who need to check semester GPA, estimate an updated CGPA, and understand how credit hours change the result.</p>
            <p>The arithmetic runs in the browser. No account is required, and course entries are not sent to a database.</p>
          </article>
          <article class="content-card">
            <h2>How university pages are checked</h2>
            <p>University-specific pages use the grade-point table in the primary source linked on that page. The source title, scope, and manual review date are shown beside the guidance instead of being hidden in code.</p>
            <p>Where a university publishes grade points but no universal marks cut-offs, the page leaves the marks column blank and tells students to enter the letter grade already awarded.</p>
          </article>
          <article class="content-card">
            <h2>Independent and unofficial</h2>
            <p>This website is not affiliated with NUST, FAST, COMSATS, IIUI, GIKI, PIEAS, Air University, UET, IST, or any other university.</p>
            <p>Every calculator result should be treated as an estimate. Official transcripts, result portals, and academic offices are the final source.</p>
          </article>
          <article class="content-card content-card-wide">
            <h2>Corrections and accountability</h2>
            <p>The GPA Calculator Pakistan editorial maintainer is responsible for source reviews and calculator corrections. Review dates are recorded on the relevant pages, and the maintainer can be reached at <a href="mailto:${escapeHtml(launchConfig.contactEmail)}">${escapeHtml(launchConfig.contactEmail)}</a>.</p>
            <p>Academic regulations change. A useful correction includes the affected page, programme or intake, the disputed sentence or grade point, and a current official university URL. Corrections can be sent to <a href="mailto:${escapeHtml(launchConfig.contactEmail)}">${escapeHtml(launchConfig.contactEmail)}</a>.</p>
            <p>Read the <a href="/methodology.html">methodology and source register</a> for the calculation formula, test cases, source hierarchy, review date, and known limitations.</p>
          </article>`
  })
);

writeFile(
  "contact.html",
  trustPage({
    file: "contact.html",
    title: "Contact GPA Calculator Pakistan",
    description: "Contact page for GPA Calculator Pakistan, including correction requests, privacy questions, and publishing notes.",
    h1: "Contact",
    eyebrow: "Contact",
    pageSlug: "contact",
    body: `<article class="content-card">
            <h2>Correction requests</h2>
            <p>If you notice a confusing formula, broken link, spelling issue, or university page that needs clearer wording, contact the site owner before relying on the result.</p>
            ${contactChannel()}
            <p>Please include the page URL, programme or intake when relevant, the value that appears wrong, and a link to the current official regulation. Do not attach a full transcript.</p>
          </article>
          <article class="content-card">
            <h2>Privacy questions</h2>
            <p>The calculator runs in the browser and does not require accounts. Privacy questions should reference the page URL and the issue you want reviewed.</p>
            <p>Do not send private roll numbers, passwords, or full transcripts through ordinary email.</p>
          </article>
          <article class="content-card">
            <h2>University affiliation</h2>
            <p>This site is independent and unofficial. University names are used only to help students find relevant estimate pages.</p>
            <p>If a university requests a correction to wording or affiliation clarity, that page should be updated promptly.</p>
          </article>`
  })
);

const sourceRegisterRows = universityData.map((university) => `<tr>
              <th scope="row"><a href="/${university.slug}/">${university.name}</a></th>
              <td><a href="${university.source.url}" rel="external">${university.source.title}</a>${university.source.fallbackUrl ? `<br><a href="${university.source.fallbackUrl}" rel="external">Fallback: ${university.source.fallbackTitle}</a>` : ""}</td>
              <td>${university.source.scope}</td>
            </tr>`).join("\n            ");

writeFile(
  "methodology.html",
  trustPage({
    file: "methodology.html",
    title: "Methodology & Sources | GPA Calculator Pakistan",
    description: "See how GPA Calculator Pakistan calculates results, selects university sources, tests grade scales, and handles corrections and limitations.",
    h1: "Methodology & Sources",
    eyebrow: "Editorial standards",
    pageSlug: "methodology",
    body: `<article class="content-card">
            <h2>Calculation method</h2>
            <p>For every entered course, quality points equal grade points multiplied by credit hours. Semester GPA equals total quality points divided by total attempted semester credits.</p>
            <p>Updated CGPA is estimated as ((previous CGPA × the earlier GPA-bearing credits used for that CGPA) + current quality points) ÷ (earlier GPA credits + current GPA credits). Calculations use full precision internally and display two decimals.</p>
          </article>
          <article class="content-card">
            <h2>Source hierarchy</h2>
            <p>Current official university regulations, handbooks, and registrar notifications come first. An official university academic page is used when a current document is not public. Secondary calculator sites are not accepted as evidence for a grade scale.</p>
            <p>If a source does not publish fixed percentage bands, this site does not invent them. A blank marks column means students should use the letter grade on the official result.</p>
          </article>
          <article class="content-card">
            <h2>Review ownership</h2>
            <p>The GPA Calculator Pakistan editorial maintainer owns the source checks and calculator corrections recorded here. Questions and evidence-backed corrections can be sent to <a href="mailto:${escapeHtml(launchConfig.contactEmail)}">${escapeHtml(launchConfig.contactEmail)}</a>.</p>
          </article>
          <article class="content-card">
            <h2>What the estimate cannot know</h2>
            <p>A simple calculator cannot automatically reconstruct repeat-course replacement, excluded W/I grades, transfer credits, cohort exceptions, relative-grading boundaries, or a department's rounding procedure.</p>
            <p>That is why each university page identifies its source scope and sends students back to the examination office for a final decision.</p>
          </article>
          <article class="content-card content-card-wide">
            <h2>Verification checklist</h2>
            <ul>
              <li>Each source-specific preset contains exactly the grades and point values shown in its visible table.</li>
              <li>Worked examples are checked with the same weighted-average formula used by the calculator.</li>
              <li>Zero-point F grades remain valid courses when credits are entered.</li>
              <li>Negative credits, out-of-range CGPA, and incomplete previous-record pairs are rejected.</li>
              <li>Official source links and calculator behavior are rechecked when a correction is received or a newer regulation is found.</li>
            </ul>
          </article>
          <article class="content-card content-card-wide">
            <h2>University source register</h2>
            <p>Last manual review: <time datetime="${editorialReviewDate}">12 August 2026</time>. A linked policy may later be replaced; the university's current publication always wins.</p>
            <div class="source-table-wrap">
              <table class="source-table">
                <thead><tr><th scope="col">Page</th><th scope="col">Primary source</th><th scope="col">What was checked</th></tr></thead>
                <tbody>
            ${sourceRegisterRows}
                </tbody>
              </table>
            </div>
          </article>
          <aside class="disclaimer-box content-card-wide">
            <strong>Corrections</strong>
            <p>Send the page URL, programme or intake, disputed value, and a current official source to <a href="mailto:${escapeHtml(launchConfig.contactEmail)}">${escapeHtml(launchConfig.contactEmail)}</a>. Do not send a roll number, password, CNIC, or full transcript.</p>
          </aside>`
  })
);

const sitemapUrls = [
  ["/", "1.0"],
  ["/methodology.html", "0.6"],
  ["/about.html", "0.4"],
  ["/contact.html", "0.4"],
  ["/privacy.html", "0.4"],
  ...allPages.map((page) => [`/${page.slug}/`, page.type === "university" ? "0.7" : "0.85"])
];

writeFile(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${hasRealDomain ? "" : "  <!-- Replace https://your-domain.com with your real domain before submitting to Search Console. -->\n"}${sitemapUrls
  .map(([urlPath, priority]) => `  <url>
    <loc>${domain}${urlPath}</loc>
    <priority>${priority}</priority>
  </url>`)
  .join("\n")}
</urlset>
`
);

writeFile(
  "robots.txt",
  `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`
);

console.log(`Generated ${allPages.length + 3} hub pages, sitemap.xml, and robots.txt`);
