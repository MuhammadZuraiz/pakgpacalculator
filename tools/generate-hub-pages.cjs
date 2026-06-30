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
const buildDate = new Date().toISOString().slice(0, 10);

const toolLinks = [
  ["cgpa-calculator-pakistan", "CGPA Calculator Pakistan"],
  ["semester-gpa-calculator", "Semester GPA Calculator"],
  ["gpa-to-percentage-pakistan", "GPA to Percentage Pakistan"],
  ["credit-hours-calculator", "Credit Hours Calculator"]
];

const universityLinks = [
  ["nust-gpa-calculator", "NUST GPA Calculator"],
  ["fast-gpa-calculator", "FAST GPA Calculator"],
  ["comsats-gpa-calculator", "COMSATS GPA Calculator"],
  ["iiui-gpa-calculator", "IIUI GPA Calculator"],
  ["giki-gpa-calculator", "GIKI GPA Calculator"],
  ["pieas-gpa-calculator", "PIEAS GPA Calculator"],
  ["air-university-gpa-calculator", "Air University GPA Calculator"],
  ["uet-gpa-calculator", "UET GPA Calculator"],
  ["ist-gpa-calculator", "IST GPA Calculator"]
];

const pages = [
  {
    slug: "cgpa-calculator-pakistan",
    type: "calculator",
    title: "CGPA Calculator Pakistan | Updated CGPA Tool",
    description: "Calculate updated CGPA in Pakistan using previous CGPA, completed credit hours, grades, and current semester credits.",
    eyebrow: "CGPA tool",
    h1: "CGPA Calculator Pakistan",
    intro: "Estimate your updated CGPA by combining previous CGPA, completed credit hours, and the courses from your current semester.",
    calculatorTitle: "Updated CGPA calculator",
    calculatorText: "Enter previous CGPA and completed credits first, then add current-semester grades and credit hours. The result is an estimate only.",
    sections: [
      {
        heading: "How CGPA is calculated",
        body: [
          "CGPA is a weighted average of grade points across completed credit hours. A 3-credit course affects your result more than a 1-credit lab because it carries more academic weight.",
          "The calculator uses this formula: ((previous CGPA × completed credits) + current semester points) ÷ total credits. Each course contributes grade points × credit hours, so the same letter grade counts for more in a heavier course."
        ]
      },
      {
        heading: "Worked example for Pakistan students",
        body: [
          "Suppose your previous CGPA is 3.20 over 60 completed credit hours, and this semester you score a 3.75 GPA over 6 new credits worth 22.5 quality points.",
          "Your updated CGPA is ((3.20 × 60) + 22.5) ÷ 66 = 3.25. Notice how a strong semester only nudges the CGPA upward, because the 60 older credits still carry most of the weight."
        ]
      },
      {
        heading: "Repeats, fails, and rounding",
        body: [
          "If you repeat a course, most Pakistan universities replace or average the grade according to their own policy, so your portal CGPA can differ from a raw calculation. Failed (F) courses usually count as 0 grade points until they are cleared.",
          "Universities also round differently (some to two decimals, some to one). Treat this tool as a planning estimate and confirm the final number on your transcript or result portal."
        ]
      }
    ],
    faqs: [
      ["Do I include current semester credits in completed credit hours?", "No. Completed credit hours are only the credits finished before the semester you are entering. The current semester credits are added automatically when you enter this semester's courses."],
      ["Why is updated CGPA different from semester GPA?", "Semester GPA uses only the current semester. CGPA combines your previous academic record with the current semester, weighted by credit hours."],
      ["How do repeated courses affect CGPA?", "It depends on your university's repeat policy. Some replace the old grade, some average both attempts. Check your official rules, because the calculator cannot know which policy applies to you."],
      ["Does a heavier semester change CGPA more?", "Yes. More credit hours in the current semester give it more weight, so a strong or weak high-credit semester moves your CGPA more than a light one."],
      ["Is this the official CGPA from my university?", "No. It is an unofficial estimate. Your university transcript, result portal, and department rules are always final."]
    ]
  },
  {
    slug: "semester-gpa-calculator",
    type: "calculator",
    title: "Semester GPA Calculator Pakistan | Credit Hour GPA",
    description: "Calculate semester GPA from course grades and credit hours using common Pakistan 4.0 grading scales.",
    eyebrow: "Semester GPA",
    h1: "Semester GPA Calculator",
    intro: "Calculate the GPA for one semester by entering each course grade and credit hours.",
    calculatorTitle: "Current semester GPA calculator",
    calculatorText: "Leave previous CGPA fields empty if you only want the current semester GPA.",
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
          "If your university uses minus grades (A-, B-, C-), switch to the HEC scale in the calculator so the grade points line up with your transcript."
        ]
      }
    ],
    faqs: [
      ["Can I ignore previous CGPA?", "Yes. Leave previous CGPA and completed credits blank to calculate only this semester's GPA."],
      ["Can I add labs separately?", "Yes. Add a lab as a separate row if your transcript gives it separate credit hours and a separate grade."],
      ["Can failed courses be counted?", "Yes. Enter F with the correct credit hours if your university counts the failed course in GPA. F usually contributes 0 grade points."],
      ["Which grade scale should I pick?", "Use the scale shown on your result card. Choose the no-minus scale (A, B+, B) for NUST or IIUI style, and the HEC scale (with A-, B-, C-) for COMSATS, FAST, and similar universities."],
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
    sections: [
      {
        heading: "Why there is no universal formula",
        body: [
          "Pakistan universities use different grade-point tables, marks ranges, and transcript rules, so a 3.00 GPA may not equal the same percentage everywhere.",
          "If a scholarship, job, or foreign admission form asks for a percentage, use the formula published by your own university whenever one exists."
        ]
      },
      {
        heading: "Formulas universities actually use",
        body: [
          "NUST publishes a direct conversion: Percentage = (CGPA × 25) − 12.5. On this formula a 3.00 CGPA is 62.5% and a 4.00 CGPA is 87.5%.",
          "Many other institutions do not publish a formula at all. A rough proportional estimate such as (GPA ÷ 4) × 100 is sometimes used, but it can overstate or understate your real standing, so label it clearly as an estimate."
        ]
      },
      {
        heading: "The HEC equivalence caveat",
        body: [
          "For foreign admissions, evaluators (and HEC equivalence) often look at your transcript's own grade-to-marks mapping rather than a blanket formula. Sending the official transcript is safer than sending a converted percentage.",
          "When in doubt, submit your CGPA and the university's grading key, and only add a percentage if the receiving body specifically requires one."
        ]
      }
    ],
    faqs: [
      ["Is GPA × 25 always correct?", "No. It is only a rough proportional estimate. Some universities, such as NUST, publish their own formula, and many publish none at all."],
      ["What is the NUST GPA to percentage formula?", "NUST uses Percentage = (CGPA × 25) − 12.5. For example, a 3.20 CGPA converts to about 67.5%."],
      ["Should I submit GPA or percentage?", "Submit the format the organization requests, but keep your official GPA and transcript visible if the percentage is only an estimate."],
      ["Does HEC have one official conversion?", "No single formula fits every university. HEC equivalence usually relies on the transcript's own grading key rather than a fixed GPA-to-percentage formula."],
      ["Can this site certify my percentage?", "No. Only your university or an authorized equivalence body can certify a conversion."]
    ]
  },
  {
    slug: "credit-hours-calculator",
    type: "guide",
    title: "Credit Hours Calculator | GPA Quality Points Guide",
    description: "Learn how credit hours, grade points, and quality points affect GPA and CGPA calculations in Pakistan universities.",
    eyebrow: "Credit guide",
    h1: "Credit Hours Calculator",
    intro: "Credit hours decide how much weight each course has in GPA and CGPA. Use this guide to understand credits, quality points, and semester load.",
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
          "Semester GPA is total quality points divided by total semester credit hours. CGPA extends the same idea across every credit you have completed."
        ]
      },
      {
        heading: "Labs versus theory credits",
        body: [
          "Many Pakistan engineering and computing programs split a subject into a theory course and a separate lab, each with its own credit hours and grade. Enter them as separate rows so each is weighted correctly.",
          "A 1-credit lab with a low grade affects your GPA far less than a 3-credit theory course, which is why high-credit courses deserve the most attention."
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
      ["How many credit hours are normal per semester?", "Most full-time Pakistan undergraduate semesters are around 15 to 18 credit hours, though this varies by program and year."],
      ["Do withdrawn courses count?", "Usually not. Many universities mark withdrawn courses as W and exclude them from GPA, but confirm with your own regulations."]
    ]
  }
];

// Verified June 2026 from official regulations, Scholaro, and university sources.
// Two grade-point families: "pakistan" (0.5 steps, no minus grades) and "hec" (with minus grades).
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
    standingNote: "The minimum passing GPA is 2.00, and some BS programs require a 2.50 CGPA to graduate. A semester GPA below the threshold can place a student on probation.",
    percentFormula: "NUST publishes a conversion formula: Percentage = (CGPA × 25) − 12.5. For example, a 3.20 CGPA is about 67.5%.",
    faqs: [
      ["Is this the official NUST calculator?", "No. This is an independent student tool and is not affiliated with NUST."],
      ["Does NUST use relative grading?", "Yes. Most NUST courses are graded on a curve, so the marks needed for each grade depend on the class, while the grade points per letter stay fixed."],
      ["Does NUST have A- or B- grades?", "No. NUST uses a half-point scale (A, B+, B, C+, C, D+, D, F) with no minus grades. Keep the Pakistan no-minus scale selected for NUST."],
      ["How do I convert my NUST CGPA to percentage?", "NUST uses Percentage = (CGPA × 25) − 12.5. A 3.00 CGPA converts to 62.5%."],
      ["What CGPA keeps me off probation at NUST?", "You generally need to keep a CGPA of 2.00 or above. Check your school's regulations, as some programs set a higher bar."]
    ]
  },
  {
    slug: "fast-gpa-calculator",
    name: "FAST-NUCES",
    audience: "computing, engineering, and business campuses",
    scaleKey: "hec",
    gradeRows: [
      ["A+", 4, "90–100"], ["A", 4, "85–89"], ["A-", 3.67, "80–84"], ["B+", 3.33, "75–79"],
      ["B", 3, "71–74"], ["B-", 2.67, "68–70"], ["C+", 2.33, "64–67"], ["C", 2, "61–63"],
      ["C-", 1.67, "58–60"], ["D+", 1.33, "54–57"], ["D", 1, "50–53"], ["F", 0, "Below 50"]
    ],
    gradingNote: "FAST-NUCES uses absolute grading: your marks map directly to a letter grade using fixed bands, regardless of the class average. FAST also awards an A+ for 90% and above, which carries the same 4.0 grade points as an A.",
    standingNote: "Most BS and BBA programs require a minimum CGPA of 2.00 to graduate (2.50 for MS and MBA, 3.00 for PhD). Falling below the threshold leads to probation.",
    percentFormula: null,
    faqs: [
      ["Is this the official FAST calculator?", "No. It is an independent student tool and is not affiliated with FAST-NUCES."],
      ["Does FAST use absolute or relative grading?", "FAST uses absolute grading, so your marks map to a fixed letter-grade band rather than a class curve."],
      ["Does an A+ count higher than an A at FAST?", "No. A+ and A both carry 4.0 grade points, so they have the same effect on your GPA. Select A in the calculator for either."],
      ["What CGPA do I need to graduate from FAST?", "Most undergraduate programs require a minimum CGPA of 2.00, with higher minimums for MS and PhD."],
      ["Why is my FAST GPA different from the portal?", "Check that you used the HEC scale with minus grades and the exact credit hours, including separate lab credits."]
    ]
  },
  {
    slug: "comsats-gpa-calculator",
    name: "COMSATS",
    audience: "campuses and faculties",
    scaleKey: "hec",
    gradeRows: [
      ["A", 4, "85–100"], ["A-", 3.67, "80–84"], ["B+", 3.33, "75–79"], ["B", 3, "71–74"],
      ["B-", 2.67, "68–70"], ["C+", 2.33, "64–67"], ["C", 2, "60–63"], ["C-", 1.67, "57–59"],
      ["D+", 1.3, "53–56"], ["D", 1, "50–52"], ["F", 0, "Below 50"]
    ],
    gradingNote: "COMSATS University Islamabad uses absolute grading, adopted university-wide from Fall 2021. Your letter grade comes directly from your marks using the fixed bands above, regardless of the class average.",
    standingNote: "The minimum passing grade is C (2.0). A CGPA of 3.0 or above is considered good, and 3.5 or above qualifies for the Dean's List and graduation with distinction.",
    percentFormula: null,
    faqs: [
      ["Is this the official COMSATS calculator?", "No. It is an independent student tool and is not affiliated with COMSATS University Islamabad."],
      ["Does COMSATS use absolute or relative grading?", "COMSATS uses absolute grading. Your marks map to a fixed band, so a higher class average does not lower your grade."],
      ["What is the minimum passing grade at COMSATS?", "C (2.0 grade points), which corresponds to roughly 60% marks under the absolute bands."],
      ["Does COMSATS use minus grades?", "Yes. COMSATS uses A-, B-, and C- grades, so keep the HEC scale selected in the calculator."],
      ["What CGPA is good at COMSATS?", "A CGPA above 3.0 is considered good, and 3.5 or above is excellent and Dean's List eligible."]
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
    gradingNote: "International Islamic University Islamabad uses absolute grading with the fixed marks bands above, on a half-point scale with no minus grades. The minimum passing grade is D (50%).",
    standingNote: "A BS degree requires a minimum CGPA of 2.00. A CGPA around 3.52 or above qualifies for the IIUI Dean's Honor List and strengthens merit-scholarship eligibility.",
    percentFormula: null,
    faqs: [
      ["Is this the official IIUI calculator?", "No. It is an independent student tool and is not affiliated with International Islamic University Islamabad."],
      ["Does IIUI use minus grades?", "No. IIUI uses a half-point scale (A, B+, B, C+, C, D+, D, F) with no minus grades, so keep the Pakistan no-minus scale selected."],
      ["What is the passing grade at IIUI?", "D (1.0 grade points), which requires at least 50% marks. Below 50% is an F and the course must be retaken."],
      ["Is IIUI grading absolute or relative?", "IIUI uses absolute grading, so your grade depends on your own marks rather than the class average."],
      ["What CGPA do I need for the Dean's Honor List?", "Around 3.52 or above. Always confirm the current threshold with your faculty office."]
    ]
  },
  {
    slug: "giki-gpa-calculator",
    name: "GIKI",
    audience: "engineering and science programs",
    scaleKey: "hec",
    gradeRows: [
      ["A", 4, ""], ["A-", 3.67, ""], ["B+", 3.33, ""], ["B", 3, ""], ["B-", 2.67, ""],
      ["C+", 2.33, ""], ["C", 2, ""], ["C-", 1.67, ""], ["D+", 1.3, ""], ["D", 1, ""], ["F", 0, ""]
    ],
    gradingNote: "GIKI generally uses relative grading (a curve). The grade points per letter are fixed, but the marks needed for each grade depend on the class, and an A can start around 85% in many courses. Grades I (Incomplete) and W (Withdrawn) are not counted in GPA.",
    standingNote: "A semester GPA below 2.00 places a student on academic probation, so high-credit courses deserve the most attention.",
    percentFormula: null,
    faqs: [
      ["Is this the official GIKI calculator?", "No. It is an independent student tool and is not affiliated with the Ghulam Ishaq Khan Institute."],
      ["Does GIKI use relative grading?", "Yes, in most courses. The marks needed for each grade depend on the class curve, while grade points per letter are fixed."],
      ["Do I and W grades affect my GIKI GPA?", "No. Incomplete (I) and Withdrawn (W) grades are not counted in the GPA calculation."],
      ["What marks give an A at GIKI?", "Under relative grading there is no fixed cut-off, but an A often starts around 85% depending on the class."],
      ["When does GIKI place a student on probation?", "Generally when the semester GPA falls below 2.00. Check the current academic regulations for details."]
    ]
  },
  {
    slug: "pieas-gpa-calculator",
    name: "PIEAS",
    audience: "engineering and science programs",
    scaleKey: "hec",
    gradeRows: [
      ["A", 4, ""], ["A-", 3.67, ""], ["B+", 3.33, ""], ["B", 3, ""], ["B-", 2.67, ""],
      ["C+", 2.33, ""], ["C", 2, ""], ["F", 0, ""]
    ],
    gradingNote: "PIEAS uses absolute grading on a 4.0 scale. Passing a course effectively requires a C (2.0); some transcripts do not list D or D+ grades, so a C is treated as the practical minimum.",
    standingNote: "Good standing requires a CGPA of 2.00 or above; below that a student is placed on probation, and repeated probation can lead to being dropped. PhD coursework requires a minimum 3.00 CGPA.",
    percentFormula: null,
    faqs: [
      ["Is this the official PIEAS calculator?", "No. It is an independent student tool and is not affiliated with PIEAS."],
      ["What is the minimum passing grade at PIEAS?", "Passing effectively starts at C (2.0 grade points). Confirm your program's exact rule, as some transcripts omit D grades."],
      ["Does PIEAS use absolute grading?", "Yes. PIEAS uses absolute grading, so your grade comes from your own marks, not the class average."],
      ["What CGPA keeps me in good standing at PIEAS?", "A CGPA of 2.00 or above. Falling below leads to probation, and repeated probation can lead to being dropped."],
      ["What CGPA do PhD students need?", "PhD coursework requires a minimum CGPA of 3.00 out of 4.00."]
    ]
  },
  {
    slug: "air-university-gpa-calculator",
    name: "Air University",
    audience: "campuses and departments",
    scaleKey: "hec",
    gradeRows: [
      ["A", 4, "85–100"], ["A-", 3.67, ""], ["B+", 3.33, ""], ["B", 3, ""], ["B-", 2.67, ""],
      ["C+", 2.33, ""], ["C", 2, ""], ["C-", 1.67, ""], ["D+", 1.3, ""], ["D", 1, ""], ["F", 0, "Below 50"]
    ],
    gradingNote: "Air University uses relative grading when a course has 15 or more students, and absolute grading for smaller classes. The grade points per letter are fixed; the marks needed for each grade depend on the method used in your course.",
    standingNote: "A minimum CGPA of 2.00 (BS) or 2.50 (MS) is required to graduate, and a passing mark of at least 50% is needed in each course. A semester GPA of 3.50 or above on a full load earns a place on the Dean's Honor List.",
    percentFormula: null,
    faqs: [
      ["Is this the official Air University calculator?", "No. It is an independent student tool and is not affiliated with Air University."],
      ["Is Air University grading relative or absolute?", "Both. Courses with 15 or more students use relative grading; smaller classes use absolute grading."],
      ["What CGPA do I need to graduate from Air University?", "A minimum CGPA of 2.00 for BS programs and 2.50 for MS programs."],
      ["What semester GPA earns the Dean's Honor List?", "A semester GPA of 3.50 or above while taking a full course load."],
      ["Why is my Air University estimate slightly off?", "Relative grading and rounding can shift the result. Use the HEC scale and your exact credit hours for the closest estimate."]
    ]
  },
  {
    slug: "uet-gpa-calculator",
    name: "UET",
    audience: "engineering departments and campuses",
    scaleKey: "hec",
    gradeRows: [
      ["A+", 4, ""], ["A", 4, ""], ["A-", 3.67, ""], ["B+", 3.33, ""], ["B", 3, ""], ["B-", 2.67, ""],
      ["C+", 2.33, ""], ["C", 2, ""], ["C-", 1.67, ""], ["D+", 1.33, ""], ["D", 1, ""], ["F", 0, ""]
    ],
    gradingNote: "UET Lahore uses a hybrid system: relative grading (a curve) for theory courses and absolute grading for labs and practicals. An A+ may be awarded above the top threshold and carries the same grade points as an A.",
    standingNote: "You must score at least a D (about 50%) to pass a course, and keep a CGPA of 2.00 or above to stay in good standing. Withdrawn courses appear as W and are not counted in GPA.",
    percentFormula: null,
    faqs: [
      ["Is this the official UET calculator?", "No. It is an independent student tool and is not affiliated with UET Lahore or its campuses."],
      ["Does UET use relative or absolute grading?", "Both. Theory courses are usually graded on a curve, while labs and practicals use absolute grading."],
      ["Does an A+ count higher than an A at UET?", "No. A+ carries the same grade points as an A, so select A in the calculator for either."],
      ["What is the passing grade at UET?", "At least a D, which usually means about 50% normalized marks. Withdrawn (W) courses are not counted."],
      ["What CGPA keeps me in good standing at UET?", "A CGPA of 2.00 or above. Staying on probation for consecutive semesters can lead to being dropped."]
    ]
  },
  {
    slug: "ist-gpa-calculator",
    name: "IST",
    audience: "aerospace, engineering, and space science programs",
    scaleKey: "hec",
    gradeRows: [
      ["A", 4, "85–100"], ["A-", 3.7, "80–84"], ["B+", 3.3, "75–79"], ["B", 3, "70–74"],
      ["B-", 2.7, "65–69"], ["C+", 2.3, "61–64"], ["C", 2, "58–60"], ["C-", 1.7, "55–57"],
      ["D", 1, "50–54"], ["F", 0, "Below 50"]
    ],
    gradingNote: "The Institute of Space Technology follows the HEC 4.0 scale with the marks bands above. Confirm with your department whether a specific course is graded absolutely or on a curve. IST rounds A- to 3.7 and B+ to 3.3, while this calculator uses the HEC-standard 3.67 and 3.33, so an estimate may differ by a few hundredths.",
    standingNote: "The minimum passing grade is D (50%), and a CGPA of 2.00 is generally required for good standing.",
    percentFormula: null,
    faqs: [
      ["Is this the official IST calculator?", "No. It is an independent student tool and is not affiliated with the Institute of Space Technology."],
      ["What grade points does IST use?", "IST uses the HEC scale and rounds A- to 3.7 and B+ to 3.3. This calculator uses 3.67 and 3.33, so results can differ by a few hundredths."],
      ["What is the passing grade at IST?", "D (1.0 grade points), which requires at least 50% marks."],
      ["Does IST use minus grades?", "Yes. IST awards A-, B-, and C- grades, so keep the HEC scale selected in the calculator."],
      ["Why is my IST GPA slightly different?", "The small rounding difference between 3.7/3.3 and 3.67/3.33, plus credit-hour entry, explains most gaps. Your transcript is final."]
    ]
  }
];

const universityPages = universityData.map((uni) => ({
  slug: uni.slug,
  type: "university",
  name: uni.name,
  scaleKey: uni.scaleKey,
  gradeRows: uni.gradeRows,
  gradingNote: uni.gradingNote,
  standingNote: uni.standingNote,
  percentFormula: uni.percentFormula,
  title: `${uni.name} GPA Calculator | Semester GPA and CGPA Tool`,
  description: `Estimate ${uni.name} semester GPA and CGPA with the real grading scale, grade points, and credit hours. Unofficial calculator for Pakistan students.`,
  eyebrow: "University calculator",
  h1: `${uni.name} GPA Calculator`,
  intro: `Use this unofficial ${uni.name} GPA calculator to estimate your semester GPA and updated CGPA using ${uni.name}'s grading scale and your credit hours.`,
  calculatorTitle: `${uni.name} GPA and CGPA estimate`,
  calculatorText: `Enter your ${uni.name} courses, grades, and credit hours. The scale below is preset to match ${uni.name}; the result is only an estimate, and your official transcript is final.`,
  scaleIntro: `${uni.name} reports results on a 4.0 grade-point scale. The table below shows the grade points for each letter grade${uni.gradeRows.some((row) => row[2]) ? " and the typical marks range for each" : ""}. Use it alongside the calculator above to estimate your GPA and CGPA.`,
  workedExample: workedExampleFor(uni.scaleKey),
  tipsNote: `Pick the grade scale that matches your result card, enter every current-semester course with its exact credit hours, and keep lab and theory courses on separate rows when they carry separate credits. If your department uses a different grade-point table, treat the result as a planning estimate.`,
  audience: uni.audience,
  faqs: uni.faqs
}));

function workedExampleFor(scaleKey) {
  if (scaleKey === "pakistan") {
    return [
      "Suppose this semester you take two 3-credit-hour courses and score an A (4.0) in one and a B+ (3.5) in the other. The quality points are (4.0 × 3) + (3.5 × 3) = 12 + 10.5 = 22.5.",
      "Your semester GPA is 22.5 ÷ 6 = 3.75. If your previous CGPA was 3.20 over 60 completed credit hours, your updated CGPA is ((3.20 × 60) + 22.5) ÷ 66 = 3.25."
    ];
  }

  return [
    "Suppose this semester you take two 3-credit-hour courses and score an A (4.0) in one and a B (3.0) in the other. The quality points are (4.0 × 3) + (3.0 × 3) = 12 + 9 = 21.",
    "Your semester GPA is 21 ÷ 6 = 3.50. If your previous CGPA was 3.20 over 60 completed credit hours, your updated CGPA is about ((3.20 × 60) + 21) ÷ 66 = 3.23. On this scale a B- would add 2.67 grade points per credit hour and a C- would add 1.67."
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
        <a class="brand" href="${base}index.html" aria-label="GPA Calculator Pakistan home">
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
            <a href="${base}index.html#calculator">Calculator</a>
            <a href="${base}index.html#tools">Tools</a>
            <a href="${base}index.html#universities">Universities</a>
            <a href="${base}index.html#guide">Guide</a>
            <a href="${base}about.html">About</a>
            <a href="${base}contact.html">Contact</a>
            <a href="${base}privacy.html">Privacy</a>
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
        <a href="${base}index.html#calculator">Calculator</a>
        <a href="${base}index.html#tools">Tools</a>
        <a href="${base}index.html#universities">Universities</a>
        <a href="${base}about.html">About</a>
        <a href="${base}contact.html">Contact</a>
        <a href="${base}privacy.html">Privacy Policy</a>
      </div>
    </footer>`;
}

function adSlot(className = "") {
  return `<div class="ad-slot ${className}" aria-label="Advertisement placeholder">
          <span>Advertisement</span>
        </div>`;
}

function calculator(page) {
  const defaultScale = page.scaleKey || "pakistan";
  return `<section class="calculator-section" id="calculator" aria-labelledby="calculator-title" data-animate>
        <div class="section-heading">
          <p class="eyebrow">Start calculating</p>
          <h2 id="calculator-title">${page.calculatorTitle}</h2>
          <p>${page.calculatorText}</p>
        </div>
        <form class="calculator-shell" id="gpa-form" novalidate data-animate data-default-scale="${defaultScale}">
          <div class="toolbar">
            <div>
              <label for="scale-select">Grade scale</label>
              <select id="scale-select" name="scale">
                <option value="pakistan">Pakistan 4.0 scale (no minus grades)</option>
                <option value="hec">HEC 4.0 scale (with minus grades)</option>
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
              <div class="previous-grid">
                <div>
                  <label for="previous-cgpa">Previous CGPA</label>
                  <input id="previous-cgpa" name="previousCgpa" type="number" min="0" max="4" step="0.01" inputmode="decimal" placeholder="3.20">
                </div>
                <div>
                  <label for="completed-credits">Completed credit hours</label>
                  <input id="completed-credits" name="completedCredits" type="number" min="0" step="1" inputmode="numeric" placeholder="60" aria-describedby="completed-help">
                  <small id="completed-help">Credits completed before this semester.</small>
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
                      <th scope="col">Points</th>
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
              <div class="score-pair">
                <div><span>Semester GPA</span><strong id="semester-gpa">0.00</strong></div>
                <div><span>Updated CGPA</span><strong id="updated-cgpa">0.00</strong></div>
              </div>
              <dl class="result-list">
                <div><dt>Semester credits</dt><dd id="semester-credits">0</dd></div>
                <div><dt>Grade points</dt><dd id="total-points">0.00</dd></div>
                <div><dt>Courses counted</dt><dd id="courses-counted">0</dd></div>
                <div><dt>Standing</dt><dd id="standing">Add courses</dd></div>
              </dl>
              <div class="formula-box">
                <strong>CGPA formula</strong>
                <p>((previous CGPA x completed credits) + current points) / total credits</p>
              </div>
              <p class="status-message" id="status-message" role="status" aria-live="polite">Select grades and credit hours to calculate your GPA.</p>
            </aside>
          </div>
        </form>
        ${adSlot("ad-slot-top")}
      </section>`;
}

function linkGrid(base) {
  const tools = toolLinks.map(([slug, label]) => `<a class="link-card" href="${base}${slug}/index.html">${label}</a>`).join("\n          ");
  const universities = universityLinks.map(([slug, label]) => `<a class="link-card" href="${base}${slug}/index.html">${label}</a>`).join("\n          ");
  return `<section class="content-band" aria-labelledby="related-title" data-animate>
        <div class="section-heading">
          <p class="eyebrow">Related tools</p>
          <h2 id="related-title">Keep exploring GPA calculators</h2>
          <p>Move between the main calculator, focused student guides, and university-specific estimate pages.</p>
        </div>
        <div class="link-grid">
          ${tools}
        </div>
        <div class="link-grid link-grid-compact">
          ${universities}
        </div>
      </section>`;
}

function gradeScaleTable(page) {
  const hasMarks = page.gradeRows.some((row) => row[2]);
  const head = hasMarks
    ? `<tr><th scope="col">Grade</th><th scope="col">Grade points</th><th scope="col">Typical marks (%)</th></tr>`
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
        <p class="ad-note">Grade points are fixed; treat the marks ranges as typical values and confirm them against your official transcript.</p>
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
      </section>`;
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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
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
            ${isCalculator ? '<button class="button button-primary" type="button" id="hero-sample"><span aria-hidden="true">+</span>Load sample</button>' : `<a class="button button-primary" href="${base}index.html#calculator"><span aria-hidden="true">+</span>Open calculator</a>`}
            <a class="button button-ghost" href="#guide-title">Read guide</a>
          </div>
        </div>
        <aside class="quick-stats" aria-label="Page highlights">
          <div><strong>4.0</strong><span>scale focus</span></div>
          <div><strong>30</strong><span>course rows</span></div>
          <div><strong>Free</strong><span>student tool</span></div>
        </aside>
      </section>
      ${isCalculator ? calculator(page) : adSlot("ad-slot-top")}
      ${isUniversity ? universitySections(page) : sectionCards(page)}
      ${adSlot("ad-slot-middle")}
      ${linkGrid(base)}
      ${faqSection(page)}
      ${adSlot("ad-slot-lower")}
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
    ${optionalHeadTags()}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
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
  fs.writeFileSync(target, content, "utf8");
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
            <p>GPA Calculator Pakistan is built to help students quickly estimate semester GPA, updated CGPA, credit-hour impact, and GPA-related questions.</p>
            <p>The site focuses on practical calculator tools and plain-English explanations for Pakistan university students.</p>
          </article>
          <article class="content-card">
            <h2>Accurate, university-specific scales</h2>
            <p>Each university page is set to the grading scale that university actually uses, including whether it relies on minus grades or relative grading, so the estimate is as close as a calculator can get.</p>
            <p>We research grading scales from official regulations and reputable references, and we keep clear warnings that the official transcript is final.</p>
          </article>
          <article class="content-card">
            <h2>Independent and unofficial</h2>
            <p>This website is not affiliated with NUST, FAST, COMSATS, IIUI, GIKI, PIEAS, Air University, UET, IST, or any other university.</p>
            <p>Every calculator result should be treated as an estimate. Official transcripts, result portals, and academic offices are the final source.</p>
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

const sitemapUrls = [
  ["/", "1.0"],
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
    <lastmod>${buildDate}</lastmod>
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

console.log(`Generated ${allPages.length + 2} hub pages, sitemap.xml, and robots.txt`);
