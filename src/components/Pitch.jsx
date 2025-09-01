import React, { useState, useEffect } from "react";
import api from "../utils/api1.js";
import useThemeStore from "../store/themeStore";

const PitchForm = () => {
  const [customSteps, setCustomSteps] = useState([]);
  const [enabledSteps, setEnabledSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [formData, setFormData] = useState({
    // Basic Pitch Info
    startupName: "",
    industry: "",
    oneLiner: "",
    visionMission: {
      vision: "",
      mission: "",
    },
    problem: "",
    solution: "",

    // Product/Service Details
    productDescription: "",
    uniqueValueProposition: "",
    USP: "",
    stage: "idea",
    techStack: [""],

    // Market & Customer Info
    targetMarket: "",
    customerSegments: [{ segmentName: "", size: 0, painPoints: "" }],
    market: {
      totalMarketSize: 0,
      serviceableMarketSize: 0,
      targetMarketSize: 0,
      growthRatePercent: 0,
    },
    competition: "",
    competitors: [
      { name: "", website: "", strength: "", weakness: "", type: "direct" },
    ],
    competitiveAdvantage: "",
    distributionChannels: [""],

    // Business Model & Strategy
    businessModel: "",
    goToMarketStrategy: "",

    // Traction & Growth Metrics
    traction: "",
    usersCount: 0,
    productMetrics: {
      monthlyActiveUsers: 0,
      dailyActiveUsers: 0,
      downloads: 0,
      repeatCustomerRatePercent: 0,
      retentionRate: 0,
      GMV: 0,
      keyAchievements: [""],
    },
    customerTestimonials: [
      {
        customerName: "",
        testimonial: "",
        rating: 5,
      },
    ],
    partnerships: [
      {
        partnerName: "",
        partnershipType: "",
        description: "",
      },
    ],

    // Team & Founder Info
    founderName: "",
    founderEmail: "",
    foundingTeam: [
      {
        name: "",
        role: "",
        background: "",
        experienceYears: 0,
        linkedIn: "",
      },
    ],
    teamMembers: [{ name: "", role: "", experienceYears: 0, linkedIn: "" }],
    advisors: [
      {
        name: "",
        expertise: "",
        background: "",
        linkedIn: "",
      },
    ],
    boardOfDirectors: [
      {
        name: "",
        role: "",
        background: "",
      },
    ],
    teamStrength: 0,
    orgStructure: "",

    // Enhanced Financials
    financials: {
      // Revenue Streams
      revenueStreams: [
        {
          streamName: "",
          type: "subscription",
          percentage: 0,
        },
      ],

      // Revenue & Profitability
      revenueLastYear: 0,
      revenueThisYear: 0,
      currentRevenue: 0,
      monthlyRevenue: 0,
      monthlyRecurringRevenue: 0,
      annualRevenue: 0,
      annualRecurringRevenue: 0,

      // Costs & Margins
      COGS: 0,
      grossMargin: 0,
      grossMarginPercent: 0,
      netMargin: 0,
      netProfit: 0,
      OPEX: 0,
      operatingExpenses: 0,

      // Earnings Metrics
      EBITDA: 0,
      ebitda: 0,
      ebitdaMarginPercent: 0,
      EBIT: 0,
      PBT: 0,
      PAT: 0,
      interestExpense: 0,
      taxesPaid: 0,
      depreciationAmortization: 0,

      // Cash Flow & Runway
      cashFlowFromOperations: 0,
      cashFlowFromInvesting: 0,
      cashFlowFromFinancing: 0,
      burnRate: 0,
      runwayMonths: 0,
      breakEvenPoint: "",

      // Balance Sheet
      assetsTotal: 0,
      liabilitiesTotal: 0,
      equityTotal: 0,
      debtOutstanding: 0,
      accountsReceivable: 0,
      accountsPayable: 0,
      inventoryTurnover: 0,

      // Ratios
      currentRatio: 0,
      quickRatio: 0,
      debtEquityRatio: 0,
      roi: 0,
      roe: 0,
      roa: 0,

      // Growth Metrics
      yearOverYearGrowthPercent: 0,
      monthOverMonthGrowthPercent: 0,
      salesGrowthYoY: 0,
      churnRatePercent: 0,

      // Unit Economics
      arpu: 0,
      customerAcquisitionCost: 0,
      lifetimeValue: 0,
      contributionMarginPercent: 0,
      paybackPeriodMonths: 0,
      grossOrderValue: 0,
      unitEconomics: "",

      // Valuation & Structure
      valuation: 0,
      preMoneyValuation: 0,
      postMoneyValuation: 0,
      capitalStructure: {
        equityPercent: 0,
        debtPercent: 0,
      },

      // Cap Table
      capTable: [
        {
          investorName: "",
          ownershipPercent: 0,
        },
      ],
    },

    // Enhanced Funding Details
    fundingDetails: {
      askAmount: 0,
      fundingAskAmount: 0,
      equityOffered: 0,
      equityOfferedPercent: 0,
      impliedValuation: 0,
      previousFundingRaised: 0,
      dealFlexibility: "equity",
      strategicNeed: "",
    },

    valuationHistory: [],

    // Future Plans & Roadmap
    milestones: [
      { title: "", description: "", targetDate: "", status: "pending" },
    ],
    expansionPlans: "",
    productRoadmap: "",
    scalingStrategy: "",
    exitStrategy: "",

    // Enhanced Legal
    legal: {
      companyRegistration: "Private Limited",
      patents: [""],
      trademarks: [""],
      licenses: [""],
      esops: 0,
      complianceStatus: "Compliant",
      taxCompliance: {
        GST: false,
        TDS: false,
        status: "Compliant",
      },
      pendingLitigations: "None",
    },

    // ESG
    esg: {
      environmentalImpact: "",
      socialImpact: "",
      governancePractices: "",
    },

    // Media
    media: [],

    // VISIBILITY FIELD - NEW
    visibility: "public", // Default to public
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [enhanceField, setEnhanceField] = useState("");
  const [sampleEnhanced, setSampleEnhanced] = useState("");
  const [stepSelectionMode, setStepSelectionMode] = useState(true);
  const dark = useThemeStore((s) => s.dark);

  // Define all available steps with detailed descriptions
  const allSteps = [
    {
      id: 1,
      title: "Company Foundation",
      subtitle: "Basic company information",
      description:
        "Company name, industry, vision, mission, problem & solution",
      required: true,
      category: "Essential",
    },
    {
      id: 2,
      title: "Market Analysis",
      subtitle: "Market size & competition",
      description: "Target market, customer segments, competitive landscape",
      required: false,
      category: "Market",
    },
    {
      id: 3,
      title: "Product Details",
      subtitle: "Product/service specifics",
      description: "Product description, unique value proposition, tech stack",
      required: false,
      category: "Product",
    },
    {
      id: 4,
      title: "Traction & Metrics",
      subtitle: "Growth & validation",
      description: "User metrics, testimonials, partnerships, achievements",
      required: false,
      category: "Growth",
    },
    {
      id: 5,
      title: "Team Information",
      subtitle: "Leadership & organization",
      description:
        "Founder details, team members, advisors, organizational structure",
      required: false,
      category: "Team",
    },
    {
      id: 6,
      title: "Business Model",
      subtitle: "Revenue & strategy",
      description: "Business model, go-to-market strategy, expansion plans",
      required: false,
      category: "Business",
    },
    {
      id: 7,
      title: "Financials",
      subtitle: "Revenue & financial metrics",
      description: "Revenue streams, costs, margins, unit economics, cash flow",
      required: false,
      category: "Finance",
    },
    {
      id: 8,
      title: "Investment Details",
      subtitle: "Funding requirements",
      description: "Funding ask, equity offered, valuation history",
      required: true,
      category: "Essential",
    },
    {
      id: 9,
      title: "Legal & Strategy",
      subtitle: "Legal status & future plans",
      description: "Legal compliance, patents, milestones, exit strategy",
      required: false,
      category: "Legal",
    },
    {
      id: 10,
      title: "Review & Submit",
      subtitle: "Final submission",
      description: "Review all information and submit your pitch",
      required: true,
      category: "Essential",
    },
  ];

  const stepCategories = {
    Essential: { color: "red", description: "Required for all pitches" },
    Market: { color: "blue", description: "Market analysis and competition" },
    Product: { color: "green", description: "Product and technology details" },
    Growth: { color: "purple", description: "Traction and growth metrics" },
    Team: { color: "yellow", description: "Team and organizational info" },
    Business: { color: "indigo", description: "Business model and strategy" },
    Finance: {
      color: "pink",
      description: "Financial metrics and projections",
    },
    Legal: { color: "gray", description: "Legal and compliance information" },
  };

  const getInitialFormData = () => ({
    // Basic Pitch Info
    startupName: "",
    industry: "",
    oneLiner: "",
    visionMission: {
      vision: "",
      mission: "",
    },
    problem: "",
    solution: "",

    // Product/Service Details
    productDescription: "",
    uniqueValueProposition: "",
    USP: "",
    stage: "idea",
    techStack: [""],

    // Market & Customer Info
    targetMarket: "",
    customerSegments: [{ segmentName: "", size: 0, painPoints: "" }],
    market: {
      totalMarketSize: 0,
      serviceableMarketSize: 0,
      targetMarketSize: 0,
      growthRatePercent: 0,
    },
    competition: "",
    competitors: [
      { name: "", website: "", strength: "", weakness: "", type: "direct" },
    ],
    competitiveAdvantage: "",
    distributionChannels: [""],

    // Business Model & Strategy
    businessModel: "",
    goToMarketStrategy: "",

    // Traction & Growth Metrics
    traction: "",
    usersCount: 0,
    productMetrics: {
      monthlyActiveUsers: 0,
      dailyActiveUsers: 0,
      downloads: 0,
      repeatCustomerRatePercent: 0,
      retentionRate: 0,
      GMV: 0,
      keyAchievements: [""],
    },
    customerTestimonials: [
      {
        customerName: "",
        testimonial: "",
        rating: 5,
      },
    ],
    partnerships: [
      {
        partnerName: "",
        partnershipType: "",
        description: "",
      },
    ],

    // Team & Founder Info
    founderName: "",
    founderEmail: "",
    foundingTeam: [
      {
        name: "",
        role: "",
        background: "",
        experienceYears: 0,
        linkedIn: "",
      },
    ],
    teamMembers: [{ name: "", role: "", experienceYears: 0, linkedIn: "" }],
    advisors: [
      {
        name: "",
        expertise: "",
        background: "",
        linkedIn: "",
      },
    ],
    boardOfDirectors: [
      {
        name: "",
        role: "",
        background: "",
      },
    ],
    teamStrength: 0,
    orgStructure: "",

    // Enhanced Financials
    financials: {
      // Revenue Streams
      revenueStreams: [
        {
          streamName: "",
          type: "subscription",
          percentage: 0,
        },
      ],

      // Revenue & Profitability
      revenueLastYear: 0,
      revenueThisYear: 0,
      currentRevenue: 0,
      monthlyRevenue: 0,
      monthlyRecurringRevenue: 0,
      annualRevenue: 0,
      annualRecurringRevenue: 0,

      // Costs & Margins
      COGS: 0,
      grossMargin: 0,
      grossMarginPercent: 0,
      netMargin: 0,
      netProfit: 0,
      OPEX: 0,
      operatingExpenses: 0,

      // Earnings Metrics
      EBITDA: 0,
      ebitda: 0,
      ebitdaMarginPercent: 0,
      EBIT: 0,
      PBT: 0,
      PAT: 0,
      interestExpense: 0,
      taxesPaid: 0,
      depreciationAmortization: 0,

      // Cash Flow & Runway
      cashFlowFromOperations: 0,
      cashFlowFromInvesting: 0,
      cashFlowFromFinancing: 0,
      burnRate: 0,
      runwayMonths: 0,
      breakEvenPoint: "",

      // Balance Sheet
      assetsTotal: 0,
      liabilitiesTotal: 0,
      equityTotal: 0,
      debtOutstanding: 0,
      accountsReceivable: 0,
      accountsPayable: 0,
      inventoryTurnover: 0,

      // Ratios
      currentRatio: 0,
      quickRatio: 0,
      debtEquityRatio: 0,
      roi: 0,
      roe: 0,
      roa: 0,

      // Growth Metrics
      yearOverYearGrowthPercent: 0,
      monthOverMonthGrowthPercent: 0,
      salesGrowthYoY: 0,
      churnRatePercent: 0,

      // Unit Economics
      arpu: 0,
      customerAcquisitionCost: 0,
      lifetimeValue: 0,
      contributionMarginPercent: 0,
      paybackPeriodMonths: 0,
      grossOrderValue: 0,
      unitEconomics: "",

      // Valuation & Structure
      valuation: 0,
      preMoneyValuation: 0,
      postMoneyValuation: 0,
      capitalStructure: {
        equityPercent: 0,
        debtPercent: 0,
      },

      // Cap Table
      capTable: [
        {
          investorName: "",
          ownershipPercent: 0,
        },
      ],
    },

    // Enhanced Funding Details
    fundingDetails: {
      askAmount: 0,
      fundingAskAmount: 0,
      equityOffered: 0,
      equityOfferedPercent: 0,
      impliedValuation: 0,
      previousFundingRaised: 0,
      dealFlexibility: "equity",
      strategicNeed: "",
    },

    valuationHistory: [],

    // Future Plans & Roadmap
    milestones: [
      { title: "", description: "", targetDate: "", status: "pending" },
    ],
    expansionPlans: "",
    productRoadmap: "",
    scalingStrategy: "",
    exitStrategy: "",

    // Enhanced Legal
    legal: {
      companyRegistration: "Private Limited",
      patents: [""],
      trademarks: [""],
      licenses: [""],
      esops: 0,
      complianceStatus: "Compliant",
      taxCompliance: {
        GST: false,
        TDS: false,
        status: "Compliant",
      },
      pendingLitigations: "None",
    },

    // ESG
    esg: {
      environmentalImpact: "",
      socialImpact: "",
      governancePractices: "",
    },

    // Media
    media: [],

    // VISIBILITY FIELD - NEW
    visibility: "public",
  });

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      const draftData = {
        ...formData,
        enabledSteps,
        currentStepIndex,
        customSteps,
        stepSelectionMode,
        lastSaved: new Date().toISOString(),
      };

      const hasContent =
        JSON.stringify(formData) !== JSON.stringify(getInitialFormData()) ||
        enabledSteps.length > 0;

      if (hasContent) {
        localStorage.setItem("customPitchDraft", JSON.stringify(draftData));
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 2500);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [
    formData,
    enabledSteps,
    currentStepIndex,
    customSteps,
    stepSelectionMode,
  ]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("customPitchDraft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);

        // Ensure array fields are properly initialized
        const defaultData = getInitialFormData();
        const mergedData = {
          ...defaultData,
          ...parsedDraft,
          // VISIBILITY FIELD - NEW
          visibility: parsedDraft.visibility || defaultData.visibility,
          // Ensure critical array fields are arrays
          customerSegments: Array.isArray(parsedDraft.customerSegments)
            ? parsedDraft.customerSegments
            : defaultData.customerSegments,
          competitors: Array.isArray(parsedDraft.competitors)
            ? parsedDraft.competitors
            : defaultData.competitors,
          teamMembers: Array.isArray(parsedDraft.teamMembers)
            ? parsedDraft.teamMembers
            : defaultData.teamMembers,
          foundingTeam: Array.isArray(parsedDraft.foundingTeam)
            ? parsedDraft.foundingTeam
            : defaultData.foundingTeam,
          advisors: Array.isArray(parsedDraft.advisors)
            ? parsedDraft.advisors
            : defaultData.advisors,
          boardOfDirectors: Array.isArray(parsedDraft.boardOfDirectors)
            ? parsedDraft.boardOfDirectors
            : defaultData.boardOfDirectors,
          customerTestimonials: Array.isArray(parsedDraft.customerTestimonials)
            ? parsedDraft.customerTestimonials
            : defaultData.customerTestimonials,
          partnerships: Array.isArray(parsedDraft.partnerships)
            ? parsedDraft.partnerships
            : defaultData.partnerships,
          valuationHistory: Array.isArray(parsedDraft.valuationHistory)
            ? parsedDraft.valuationHistory
            : defaultData.valuationHistory,
          milestones: Array.isArray(parsedDraft.milestones)
            ? parsedDraft.milestones
            : defaultData.milestones,
          media: Array.isArray(parsedDraft.media)
            ? parsedDraft.media
            : defaultData.media,
          techStack: Array.isArray(parsedDraft.techStack)
            ? parsedDraft.techStack
            : defaultData.techStack,
          distributionChannels: Array.isArray(parsedDraft.distributionChannels)
            ? parsedDraft.distributionChannels
            : defaultData.distributionChannels,
          productMetrics: {
            ...defaultData.productMetrics,
            ...(parsedDraft.productMetrics || {}),
            keyAchievements: Array.isArray(
              parsedDraft.productMetrics?.keyAchievements
            )
              ? parsedDraft.productMetrics.keyAchievements
              : defaultData.productMetrics.keyAchievements,
          },
          legal: {
            ...defaultData.legal,
            ...(parsedDraft.legal || {}),
            patents: Array.isArray(parsedDraft.legal?.patents)
              ? parsedDraft.legal.patents
              : defaultData.legal.patents,
            trademarks: Array.isArray(parsedDraft.legal?.trademarks)
              ? parsedDraft.legal.trademarks
              : defaultData.legal.trademarks,
            licenses: Array.isArray(parsedDraft.legal?.licenses)
              ? parsedDraft.legal.licenses
              : defaultData.legal.licenses,
            taxCompliance: {
              ...defaultData.legal.taxCompliance,
              ...(parsedDraft.legal?.taxCompliance || {}),
            },
          },
          financials: {
            ...defaultData.financials,
            ...(parsedDraft.financials || {}),
            revenueStreams: Array.isArray(
              parsedDraft.financials?.revenueStreams
            )
              ? parsedDraft.financials.revenueStreams
              : defaultData.financials.revenueStreams,
            capTable: Array.isArray(parsedDraft.financials?.capTable)
              ? parsedDraft.financials.capTable
              : defaultData.financials.capTable,
            capitalStructure: {
              ...defaultData.financials.capitalStructure,
              ...(parsedDraft.financials?.capitalStructure || {}),
            },
          },
        };

        setFormData(mergedData);
        setEnabledSteps(
          Array.isArray(parsedDraft.enabledSteps)
            ? parsedDraft.enabledSteps
            : []
        );
        setCurrentStepIndex(parsedDraft.currentStepIndex || 0);
        setCustomSteps(
          Array.isArray(parsedDraft.customSteps) ? parsedDraft.customSteps : []
        );
        setStepSelectionMode(parsedDraft.stepSelectionMode !== false);
      } catch (error) {
        console.error("Error parsing saved pitch draft:", error);
        localStorage.removeItem("customPitchDraft");
      }
    }
  }, []);

  // Update enabled steps when custom steps change
  useEffect(() => {
    if (!stepSelectionMode && customSteps.length > 0) {
      setEnabledSteps(customSteps);
      setCurrentStepIndex(0);
    }
  }, [customSteps, stepSelectionMode]);

  const currentStep = enabledSteps[currentStepIndex];
  const totalSteps = enabledSteps.length;

  const calculateCompletionPercentage = () => {
    const totalFields = enabledSteps.length * 5; // Approximate fields per step
    let completedFields = 0;

    enabledSteps.forEach((stepId) => {
      switch (stepId) {
        case 1:
          if (formData.startupName) completedFields++;
          if (formData.industry) completedFields++;
          if (formData.oneLiner) completedFields++;
          if (formData.problem) completedFields++;
          if (formData.solution) completedFields++;
          break;
        case 2:
          if (formData.targetMarket) completedFields++;
          if (formData.competition) completedFields++;
          if (formData.competitors.some((c) => c.name)) completedFields++;
          break;
        case 3:
          if (formData.productDescription) completedFields++;
          if (formData.uniqueValueProposition) completedFields++;
          break;
        case 4:
          if (formData.traction) completedFields++;
          if (formData.usersCount > 0) completedFields++;
          break;
        case 5:
          if (formData.founderName) completedFields++;
          if (formData.founderEmail) completedFields++;
          break;
        case 6:
          if (formData.businessModel) completedFields++;
          if (formData.goToMarketStrategy) completedFields++;
          break;
        case 7:
          if (formData.financials.revenueThisYear >= 0) completedFields++;
          break;
        case 8:
          if (formData.fundingDetails.fundingAskAmount > 0) completedFields++;
          if (formData.fundingDetails.equityOfferedPercent > 0)
            completedFields++;
          break;
        case 9:
          if (formData.exitStrategy) completedFields++;
          break;
        case 10:
          if (formData.visibility) completedFields++; // VISIBILITY VALIDATION - NEW
          break;
      }
    });

    return Math.round((completedFields / totalFields) * 100);
  };

  const handleChange = (field, value, index = null, subField = null) => {
    setFormData((prev) => {
      try {
        if (index !== null && subField) {
          // Handle nested array updates with special cases
          if (field === "productMetrics" && subField === "keyAchievements") {
            const currentAchievements = prev.productMetrics?.keyAchievements;
            if (!Array.isArray(currentAchievements)) {
              console.error(
                "keyAchievements is not an array:",
                currentAchievements
              );
              return prev;
            }
            const newAchievements = [...currentAchievements];
            newAchievements[index] = value;
            return {
              ...prev,
              productMetrics: {
                ...prev.productMetrics,
                keyAchievements: newAchievements,
              },
            };
          }

          // Handle legal arrays
          if (
            field === "legal" &&
            (subField === "patents" ||
              subField === "trademarks" ||
              subField === "licenses")
          ) {
            const currentArray = prev.legal?.[subField];
            if (!Array.isArray(currentArray)) {
              console.error(`${subField} is not an array:`, currentArray);
              return prev;
            }
            const newArray = [...currentArray];
            newArray[index] = value;
            return {
              ...prev,
              legal: {
                ...prev.legal,
                [subField]: newArray,
              },
            };
          }

          // Handle tax compliance nested object
          if (field === "legal" && subField === "taxCompliance") {
            return {
              ...prev,
              legal: {
                ...prev.legal,
                taxCompliance: {
                  ...prev.legal.taxCompliance,
                  [index]: value,
                },
              },
            };
          }

          // Handle financials nested arrays and objects
          if (
            field === "financials" &&
            (subField === "revenueStreams" || subField === "capTable")
          ) {
            const currentArray = prev.financials?.[subField];
            if (!Array.isArray(currentArray)) {
              console.error(`${subField} is not an array:`, currentArray);
              return prev;
            }
            const newArray = [...currentArray];
            newArray[index] = { ...newArray[index], ...value };
            return {
              ...prev,
              financials: {
                ...prev.financials,
                [subField]: newArray,
              },
            };
          }

          if (field === "financials" && subField === "capitalStructure") {
            return {
              ...prev,
              financials: {
                ...prev.financials,
                capitalStructure: {
                  ...prev.financials.capitalStructure,
                  [index]: value,
                },
              },
            };
          }

          // Regular array field handling
          const currentField = prev[field];
          if (!Array.isArray(currentField)) {
            console.error(
              `Expected ${field} to be an array, but got:`,
              currentField
            );
            return prev;
          }

          const newArray = [...currentField];
          if (typeof newArray[index] === "object" && newArray[index] !== null) {
            newArray[index] = { ...newArray[index], [subField]: value };
          } else {
            newArray[index] = { [subField]: value };
          }
          return { ...prev, [field]: newArray };
        } else if (index !== null) {
          // Handle array updates without subField
          const currentField = prev[field];
          if (!Array.isArray(currentField)) {
            console.error(
              `Expected ${field} to be an array, but got:`,
              currentField
            );
            return prev;
          }

          const newArray = [...currentField];
          newArray[index] = value;
          return { ...prev, [field]: newArray };
        } else if (subField) {
          // Handle nested object updates
          if (field === "visionMission" || field === "esg") {
            return { ...prev, [field]: { ...prev[field], [subField]: value } };
          }
          return { ...prev, [field]: { ...prev[field], [subField]: value } };
        } else {
          // Handle simple field updates
          return { ...prev, [field]: value };
        }
      } catch (error) {
        console.error("Error in handleChange:", error);
        return prev;
      }
    });
    if (error) setError("");
  };

  const addArrayItem = (fieldName, template) => {
    setFormData((prev) => {
      const currentField = prev[fieldName];
      if (!Array.isArray(currentField)) {
        console.error(
          `Expected ${fieldName} to be an array, but got:`,
          currentField
        );
        return prev;
      }
      return {
        ...prev,
        [fieldName]: [...currentField, template],
      };
    });
  };

  const removeArrayItem = (fieldName, index) => {
    setFormData((prev) => {
      const currentField = prev[fieldName];
      if (!Array.isArray(currentField)) {
        console.error(
          `Expected ${fieldName} to be an array, but got:`,
          currentField
        );
        return prev;
      }
      return {
        ...prev,
        [fieldName]: currentField.filter((_, i) => i !== index),
      };
    });
  };

  const addNestedArrayItem = (parentField, subField, template) => {
    setFormData((prev) => {
      const currentArray = prev[parentField]?.[subField];
      if (!Array.isArray(currentArray)) {
        console.error(
          `Expected ${parentField}.${subField} to be an array, but got:`,
          currentArray
        );
        return prev;
      }
      return {
        ...prev,
        [parentField]: {
          ...prev[parentField],
          [subField]: [...currentArray, template],
        },
      };
    });
  };

  const removeNestedArrayItem = (parentField, subField, index) => {
    setFormData((prev) => {
      const currentArray = prev[parentField]?.[subField];
      if (!Array.isArray(currentArray)) {
        console.error(
          `Expected ${parentField}.${subField} to be an array, but got:`,
          currentArray
        );
        return prev;
      }
      return {
        ...prev,
        [parentField]: {
          ...prev[parentField],
          [subField]: currentArray.filter((_, i) => i !== index),
        },
      };
    });
  };

  const handleAIEnhance = async (fieldName, content) => {
    if (!content.trim()) {
      setError("Please enter some content to enhance");
      return;
    }

    setEnhancing(true);
    setEnhanceField(fieldName);

    try {
      const res = await api.post("/user/ask", {
        content: `
          You are an expert investment pitch writer.
          Your job is to take the following text and:
          1. Improve clarity, grammar, and flow for investor presentations.
          2. Make it compelling and professionally persuasive for investors.
          3. Expand with relevant details that investors want to see.
          4. Keep the tone confident yet realistic.
          5. Return ONLY the improved version (no extra formatting or labels).

          Context: This is for field "${fieldName}" in a startup investment pitch.

          Here is the text to improve:
          ---
          ${content}
          ---
        `,
      });
      const enhancedContent = res.data.data.choices[0].message.content.trim();
      setSampleEnhanced(enhancedContent);
      setError("");
    } catch (error) {
      console.error("AI Enhancement error:", error);
      setError("Failed to enhance content. Please try again.");
    } finally {
      setEnhancing(false);
      setEnhanceField("");
    }
  };

  const validateStep = (stepId) => {
    switch (stepId) {
      case 1:
        return (
          formData.startupName &&
          formData.industry &&
          formData.oneLiner &&
          formData.problem &&
          formData.solution
        );
      case 2:
        return (
          formData.targetMarket &&
          formData.competition &&
          formData.competitors.some((c) => c.name)
        );
      case 3:
        return formData.productDescription;
      case 4:
        return formData.traction;
      case 5:
        return formData.founderName && formData.founderEmail;
      case 6:
        return formData.businessModel && formData.goToMarketStrategy;
      case 7:
        return formData.financials.revenueThisYear >= 0;
      case 8:
        return (
          formData.fundingDetails.fundingAskAmount > 0 &&
          formData.fundingDetails.equityOfferedPercent > 0
        );
      case 9:
        return formData.exitStrategy;
      case 10:
        return formData.visibility; // VISIBILITY VALIDATION - NEW
      default:
        return true;
    }
  };

  const nextStep = () => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
    setError("");
  };

  const prevStep = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      pitchType: "Custom",
      enabledSteps,
      visibility: formData.visibility, // INCLUDE VISIBILITY - NEW
      ...formData,
    };

    setLoading(true);
    setError("");

    console.log(submissionData);
    try {
      const res = await api.post("/user/posts/submitpitch", submissionData);
      console.log(res.data);
      setMessage(res.data.message);
      setSuccess(true);
      localStorage.removeItem("customPitchDraft");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to submit pitch. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearDraft = () => {
    setFormData(getInitialFormData());
    setEnabledSteps([]);
    setCurrentStepIndex(0);
    setCustomSteps([]);
    setStepSelectionMode(true);
    setSuccess(false);
    setMessage("");
    setError("");
    setSampleEnhanced("");
    localStorage.removeItem("customPitchDraft");
  };

  const handleCustomStepToggle = (stepId) => {
    if (customSteps.includes(stepId)) {
      setCustomSteps(customSteps.filter((id) => id !== stepId));
    } else {
      setCustomSteps([...customSteps, stepId].sort((a, b) => a - b));
    }
  };

  // Success screen
  if (success) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-3 sm:p-6 ${
          dark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="w-full max-w-md text-center">
          <div
            className={`p-6 sm:p-8 rounded-sm ${
              dark
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 text-xl sm:text-2xl">
                ✓
              </div>
            </div>
            <h3
              className={`text-lg sm:text-xl font-semibold mb-3 ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              Custom Pitch Submitted Successfully
            </h3>
            <p
              className={`text-sm mb-6 sm:mb-8 ${
                dark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {message}
            </p>
            <button
              onClick={handleClearDraft}
              className="w-full px-4 sm:px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-sm font-medium transition-colors text-sm sm:text-base"
            >
              Create New Pitch
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step Selection Screen
  if (stepSelectionMode) {
    return (
      <div
        className={`min-h-screen mb-10 ${dark ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="max-w-6xl mx-auto p-3 sm:p-6">
          <div
            className={`p-4 sm:p-8 rounded-sm ${
              dark
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="text-center mb-6 sm:mb-8">
              <h1
                className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Create Your Custom Pitch
              </h1>
              <p
                className={`text-base sm:text-lg ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Select the sections that are relevant to your business and pitch
                requirements
              </p>
            </div>

            {/* Quick Selection Templates */}
            <div className="mb-6 sm:mb-8">
              <h3
                className={`text-lg font-semibold mb-4 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Quick Start Templates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <button
                  onClick={() => setCustomSteps([1, 2, 6, 8, 10])}
                  className={`p-4 rounded-sm border-2 text-left transition-all duration-200 hover:scale-105 ${
                    dark
                      ? "border-gray-600 hover:border-blue-500 bg-gray-700 hover:bg-gray-600"
                      : "border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-50"
                  }`}
                >
                  <h4
                    className={`font-semibold mb-2 ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Minimal Pitch
                  </h4>
                  <p
                    className={`text-sm ${
                      dark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Essential information only - Foundation, Market, Business
                    Model, Investment
                  </p>
                </button>

                <button
                  onClick={() => setCustomSteps([1, 2, 3, 5, 6, 8, 10])}
                  className={`p-4 rounded-sm border-2 text-left transition-all duration-200 hover:scale-105 ${
                    dark
                      ? "border-gray-600 hover:border-blue-500 bg-gray-700 hover:bg-gray-600"
                      : "border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-50"
                  }`}
                >
                  <h4
                    className={`font-semibold mb-2 ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Standard Pitch
                  </h4>
                  <p
                    className={`text-sm ${
                      dark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Comprehensive pitch with product details and team
                    information
                  </p>
                </button>

                <button
                  onClick={() =>
                    setCustomSteps([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                  }
                  className={`p-4 rounded-sm border-2 text-left transition-all duration-200 hover:scale-105 ${
                    dark
                      ? "border-gray-600 hover:border-blue-500 bg-gray-700 hover:bg-gray-600"
                      : "border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-50"
                  }`}
                >
                  <h4
                    className={`font-semibold mb-2 ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Complete Pitch
                  </h4>
                  <p
                    className={`text-sm ${
                      dark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Full detailed pitch with all sections included
                  </p>
                </button>
              </div>
            </div>

            {/* Step Selection by Category */}
            <div className="mb-6 sm:mb-8">
              <h3
                className={`text-lg font-semibold mb-4 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Or Choose Individual Sections
              </h3>

              {Object.entries(stepCategories).map(([category, config]) => {
                const categorySteps = allSteps.filter(
                  (step) => step.category === category
                );

                return (
                  <div key={category} className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-3 h-3 rounded-full bg-${config.color}-500`}
                      ></div>
                      <h4
                        className={`font-medium ${
                          dark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {category}
                      </h4>
                      <span
                        className={`text-sm ${
                          dark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {config.description}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {categorySteps.map((step) => (
                        <div
                          key={step.id}
                          className={`p-3 sm:p-4 rounded-sm border-2 cursor-pointer transition-all ${
                            customSteps.includes(step.id)
                              ? dark
                                ? "border-blue-500 bg-blue-900/20"
                                : "border-blue-500 bg-blue-50"
                              : dark
                              ? "border-gray-600 hover:border-gray-500"
                              : "border-gray-200 hover:border-gray-300"
                          } ${
                            step.required
                              ? "opacity-90 border-red-200 dark:border-red-800"
                              : ""
                          }`}
                          onClick={() =>
                            !step.required && handleCustomStepToggle(step.id)
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3
                                className={`text-sm sm:text-base font-semibold ${
                                  dark ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {step.title}
                                {step.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </h3>
                              <p
                                className={`text-xs sm:text-sm ${
                                  dark ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {step.subtitle}
                              </p>
                              <p
                                className={`text-xs mt-1 ${
                                  dark ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {step.description}
                              </p>
                            </div>
                            {(customSteps.includes(step.id) ||
                              step.required) && (
                              <div className="ml-3 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm">
                                ✓
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Required steps notice */}
            <p
              className={`text-xs sm:text-sm mb-4 sm:mb-6 ${
                dark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span className="text-red-500">*</span> Required sections are
              automatically included in your pitch
            </p>

            {/* Selected sections preview */}
            {customSteps.length > 0 && (
              <div
                className={`mb-6 p-4 rounded-sm border ${
                  dark
                    ? "border-gray-600 bg-gray-800/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <h4
                  className={`font-medium mb-3 ${
                    dark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Selected Sections (
                  {customSteps.length +
                    allSteps.filter((s) => s.required).length}
                  )
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    ...allSteps.filter((s) => s.required).map((s) => s.id),
                    ...customSteps,
                  ]
                    .sort((a, b) => a - b)
                    .map((stepId) => {
                      const step = allSteps.find((s) => s.id === stepId);
                      return (
                        <span
                          key={stepId}
                          className={`text-xs px-3 py-1 rounded-full ${
                            step?.required
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          }`}
                        >
                          {step?.title}
                        </span>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
              <button
                onClick={handleClearDraft}
                className={`px-4 sm:px-6 py-3 rounded-sm border transition-colors text-sm sm:text-base ${
                  dark
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Clear Selection
              </button>

              <button
                onClick={() => {
                  const requiredSteps = allSteps
                    .filter((s) => s.required)
                    .map((s) => s.id);
                  const finalSteps = [
                    ...new Set([...requiredSteps, ...customSteps]),
                  ].sort((a, b) => a - b);
                  setCustomSteps(finalSteps);
                  setStepSelectionMode(false);
                }}
                disabled={customSteps.length === 0}
                className="px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-sm transition-colors text-sm sm:text-base"
              >
                Start Creating Pitch (
                {customSteps.length + allSteps.filter((s) => s.required).length}{" "}
                sections)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Common styles - Updated for better mobile responsiveness
  const inputClasses = `w-full px-3 sm:px-4 py-2 sm:py-3 rounded-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base ${
    dark
      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
  }`;

  const textareaClasses = `w-full px-3 sm:px-4 py-2 sm:py-3 rounded-sm border resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base ${
    dark
      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
  }`;

  const labelClasses = `block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
    dark ? "text-gray-200" : "text-gray-700"
  }`;

  const selectClasses = `w-full px-3 sm:px-4 py-2 sm:py-3 rounded-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base ${
    dark
      ? "bg-gray-800 border-gray-600 text-white"
      : "bg-white border-gray-300 text-gray-900"
  }`;

  // AI Enhancement Button
  const AIEnhanceButton = ({ fieldName, content }) => (
    <button
      type="button"
      onClick={() => handleAIEnhance(fieldName, content)}
      disabled={!content.trim() || enhancing}
      className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-md transition-colors ${
        dark
          ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700"
          : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
      } disabled:opacity-50`}
      title="Enhance with AI"
    >
      {enhancing && enhanceField === fieldName ? "Enhancing..." : "Enhance"}
    </button>
  );

  // Enhanced Preview
  const EnhancedPreview = ({ field, content }) => {
    if (!sampleEnhanced || enhanceField !== field) return null;

    return (
      <div
        className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-sm border ${
          dark ? "border-gray-600 bg-gray-700/50" : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
            AI Enhanced Version
          </span>
          <div className="flex gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                handleChange(field, sampleEnhanced);
                setSampleEnhanced("");
                setEnhanceField("");
              }}
              className="px-2 sm:px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                setSampleEnhanced("");
                setEnhanceField("");
              }}
              className="px-2 sm:px-3 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Dismiss
            </button>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {sampleEnhanced}
        </p>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Company Foundation
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelClasses}>
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.startupName}
                  onChange={(e) => handleChange("startupName", e.target.value)}
                  placeholder="Enter your company name"
                  maxLength={100}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>
                  Industry <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                  placeholder="e.g., SaaS, E-commerce, Fintech"
                  maxLength={50}
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>
                Value Proposition <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.oneLiner}
                onChange={(e) => handleChange("oneLiner", e.target.value)}
                placeholder="Describe your company's core value proposition in one line"
                maxLength={200}
                className={inputClasses}
              />
              <div className="text-xs text-gray-500 mt-1 sm:mt-2">
                {formData.oneLiner.length}/200 characters
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelClasses}>Vision</label>
                <textarea
                  value={formData.visionMission.vision}
                  onChange={(e) =>
                    handleChange(
                      "visionMission",
                      e.target.value,
                      null,
                      "vision"
                    )
                  }
                  placeholder="Company's long-term vision"
                  rows={3}
                  className={textareaClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Mission</label>
                <textarea
                  value={formData.visionMission.mission}
                  onChange={(e) =>
                    handleChange(
                      "visionMission",
                      e.target.value,
                      null,
                      "mission"
                    )
                  }
                  placeholder="Company's mission statement"
                  rows={3}
                  className={textareaClasses}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className={labelClasses}>
                  Problem Statement <span className="text-red-500">*</span>
                </label>
                <AIEnhanceButton
                  fieldName="problem"
                  content={formData.problem}
                />
              </div>
              <textarea
                value={formData.problem}
                onChange={(e) => handleChange("problem", e.target.value)}
                placeholder="Define the significant problem or market inefficiency your company addresses"
                rows={4}
                className={textareaClasses}
              />
              <EnhancedPreview field="problem" content={formData.problem} />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className={labelClasses}>
                  Solution Overview <span className="text-red-500">*</span>
                </label>
                <AIEnhanceButton
                  fieldName="solution"
                  content={formData.solution}
                />
              </div>
              <textarea
                value={formData.solution}
                onChange={(e) => handleChange("solution", e.target.value)}
                placeholder="Explain how your innovation provides a superior solution"
                rows={4}
                className={textareaClasses}
              />
              <EnhancedPreview field="solution" content={formData.solution} />
            </div>

            <div>
              <label className={labelClasses}>Current Stage</label>
              <select
                value={formData.stage}
                onChange={(e) => handleChange("stage", e.target.value)}
                className={selectClasses}
              >
                <option value="idea">Idea</option>
                <option value="prototype">Prototype</option>
                <option value="MVP">MVP</option>
                <option value="launched">Launched</option>
                <option value="scaling">Scaling</option>
              </select>
            </div>
          </div>
        );

      case 2: // Market Analysis
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className={labelClasses}>
                Target Market <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.targetMarket}
                onChange={(e) => handleChange("targetMarket", e.target.value)}
                placeholder="Define your addressable market and customer segments"
                rows={4}
                className={textareaClasses}
              />
            </div>

            <div>
              <h4
                className={`text-base sm:text-lg font-medium mb-3 sm:mb-4 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Market Size
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={labelClasses}>
                    Total Addressable Market (TAM)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={
                        formData.market.totalMarketSize === 0
                          ? ""
                          : formData.market.totalMarketSize
                      }
                      onChange={(e) =>
                        handleChange(
                          "market",
                          parseFloat(e.target.value) || 0,
                          null,
                          "totalMarketSize"
                        )
                      }
                      placeholder="0"
                      className={inputClasses}
                    />
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                      M $
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>
                    Serviceable Available Market (SAM)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={
                        formData.market.serviceableMarketSize === 0
                          ? ""
                          : formData.market.serviceableMarketSize
                      }
                      onChange={(e) =>
                        handleChange(
                          "market",
                          parseFloat(e.target.value) || 0,
                          null,
                          "serviceableMarketSize"
                        )
                      }
                      placeholder="0"
                      className={inputClasses}
                    />
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                      M $
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>
                    Serviceable Obtainable Market (SOM)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={
                        formData.market.targetMarketSize === 0
                          ? ""
                          : formData.market.targetMarketSize
                      }
                      onChange={(e) =>
                        handleChange(
                          "market",
                          parseFloat(e.target.value) || 0,
                          null,
                          "targetMarketSize"
                        )
                      }
                      placeholder="0"
                      className={inputClasses}
                    />
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                      M $
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Market Growth Rate</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={
                        formData.market.growthRatePercent === 0
                          ? ""
                          : formData.market.growthRatePercent
                      }
                      onChange={(e) =>
                        handleChange(
                          "market",
                          parseFloat(e.target.value) || 0,
                          null,
                          "growthRatePercent"
                        )
                      }
                      placeholder="0"
                      className={inputClasses}
                    />
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Customer Segments</label>
              <div className="space-y-3 sm:space-y-4">
                {formData.customerSegments.map((segment, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.customerSegments.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("customerSegments", index)
                        }
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="text"
                        value={segment.segmentName}
                        onChange={(e) =>
                          handleChange(
                            "customerSegments",
                            e.target.value,
                            index,
                            "segmentName"
                          )
                        }
                        placeholder="Segment name"
                        className={inputClasses}
                      />
                      <input
                        type="number"
                        value={segment.size === 0 ? "" : segment.size}
                        onChange={(e) =>
                          handleChange(
                            "customerSegments",
                            parseInt(e.target.value) || 0,
                            index,
                            "size"
                          )
                        }
                        placeholder="Segment size"
                        className={inputClasses}
                      />
                    </div>
                    <textarea
                      value={segment.painPoints}
                      onChange={(e) =>
                        handleChange(
                          "customerSegments",
                          e.target.value,
                          index,
                          "painPoints"
                        )
                      }
                      placeholder="Key pain points for this segment"
                      rows={3}
                      className={textareaClasses}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("customerSegments", {
                      segmentName: "",
                      size: 0,
                      painPoints: "",
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Customer Segment
                </button>
              </div>
            </div>

            <div>
              <label className={labelClasses}>
                Competition Overview <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.competition}
                onChange={(e) => handleChange("competition", e.target.value)}
                placeholder="Describe the competitive landscape"
                rows={4}
                className={textareaClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Key Competitors</label>
              <div className="space-y-3 sm:space-y-4">
                {formData.competitors.map((competitor, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.competitors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("competitors", index)}
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3">
                      <input
                        type="text"
                        value={competitor.name}
                        onChange={(e) =>
                          handleChange(
                            "competitors",
                            e.target.value,
                            index,
                            "name"
                          )
                        }
                        placeholder="Competitor name"
                        className={inputClasses}
                      />
                      <input
                        type="url"
                        value={competitor.website}
                        onChange={(e) =>
                          handleChange(
                            "competitors",
                            e.target.value,
                            index,
                            "website"
                          )
                        }
                        placeholder="Website URL"
                        className={inputClasses}
                      />
                      <select
                        value={competitor.type || "direct"}
                        onChange={(e) =>
                          handleChange(
                            "competitors",
                            e.target.value,
                            index,
                            "type"
                          )
                        }
                        className={selectClasses}
                      >
                        <option value="direct">Direct</option>
                        <option value="indirect">Indirect</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <textarea
                        value={competitor.strength}
                        onChange={(e) =>
                          handleChange(
                            "competitors",
                            e.target.value,
                            index,
                            "strength"
                          )
                        }
                        placeholder="Their strengths"
                        rows={3}
                        className={textareaClasses}
                      />
                      <textarea
                        value={competitor.weakness}
                        onChange={(e) =>
                          handleChange(
                            "competitors",
                            e.target.value,
                            index,
                            "weakness"
                          )
                        }
                        placeholder="Their weaknesses"
                        rows={3}
                        className={textareaClasses}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("competitors", {
                      name: "",
                      website: "",
                      strength: "",
                      weakness: "",
                      type: "direct",
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Competitor
                </button>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Competitive Advantage</label>
              <textarea
                value={formData.competitiveAdvantage}
                onChange={(e) =>
                  handleChange("competitiveAdvantage", e.target.value)
                }
                placeholder="What gives you an edge over competitors"
                rows={3}
                className={textareaClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Distribution Channels</label>
              <div className="space-y-2 sm:space-y-3">
                {formData.distributionChannels.map((channel, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={channel}
                      onChange={(e) =>
                        handleChange(
                          "distributionChannels",
                          e.target.value,
                          index
                        )
                      }
                      placeholder="e.g., Online marketplace, Direct sales, Retail"
                      className={inputClasses}
                    />
                    {formData.distributionChannels.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newChannels =
                            formData.distributionChannels.filter(
                              (_, i) => i !== index
                            );
                          handleChange("distributionChannels", newChannels);
                        }}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handleChange("distributionChannels", [
                      ...formData.distributionChannels,
                      "",
                    ])
                  }
                  className={`w-full py-2 border-2 border-dashed rounded-sm text-xs sm:text-sm transition-colors ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Distribution Channel
                </button>
              </div>
            </div>
          </div>
        );

      case 3: // Product Details
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className={labelClasses}>
                Product Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.productDescription}
                onChange={(e) =>
                  handleChange("productDescription", e.target.value)
                }
                placeholder="Detailed description of your product/service"
                rows={4}
                className={textareaClasses}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelClasses}>Unique Value Proposition</label>
                <textarea
                  value={formData.uniqueValueProposition}
                  onChange={(e) =>
                    handleChange("uniqueValueProposition", e.target.value)
                  }
                  placeholder="What makes your solution uniquely valuable"
                  rows={3}
                  className={textareaClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>
                  USP (Unique Selling Point)
                </label>
                <textarea
                  value={formData.USP}
                  onChange={(e) => handleChange("USP", e.target.value)}
                  placeholder="Your key differentiator"
                  rows={3}
                  className={textareaClasses}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Tech Stack</label>
              <div className="space-y-2 sm:space-y-3">
                {formData.techStack.map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) =>
                        handleChange("techStack", e.target.value, index)
                      }
                      placeholder="Technology/Framework"
                      className={inputClasses}
                    />
                    {formData.techStack.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newTechStack = formData.techStack.filter(
                            (_, i) => i !== index
                          );
                          handleChange("techStack", newTechStack);
                        }}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handleChange("techStack", [...formData.techStack, ""])
                  }
                  className={`w-full py-2 border-2 border-dashed rounded-sm text-xs sm:text-sm transition-colors ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Technology
                </button>
              </div>
            </div>
          </div>
        );

      case 4: // Traction & Metrics
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className={labelClasses}>
                Current Traction <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.traction}
                onChange={(e) => handleChange("traction", e.target.value)}
                placeholder="Present key metrics, milestones, and validation achieved"
                rows={4}
                className={textareaClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Total Users Count</label>
              <input
                type="number"
                value={formData.usersCount === 0 ? "" : formData.usersCount}
                onChange={(e) =>
                  handleChange("usersCount", parseInt(e.target.value) || 0)
                }
                placeholder="Total number of users"
                className={inputClasses}
              />
            </div>

            <div>
              <h4
                className={`text-base sm:text-lg font-medium mb-3 sm:mb-4 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Enhanced Product Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className={labelClasses}>Monthly Active Users</label>
                  <input
                    type="number"
                    value={
                      formData.productMetrics.monthlyActiveUsers === 0
                        ? ""
                        : formData.productMetrics.monthlyActiveUsers
                    }
                    onChange={(e) =>
                      handleChange(
                        "productMetrics",
                        parseInt(e.target.value) || 0,
                        null,
                        "monthlyActiveUsers"
                      )
                    }
                    placeholder="0"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Daily Active Users</label>
                  <input
                    type="number"
                    value={
                      formData.productMetrics.dailyActiveUsers === 0
                        ? ""
                        : formData.productMetrics.dailyActiveUsers
                    }
                    onChange={(e) =>
                      handleChange(
                        "productMetrics",
                        parseInt(e.target.value) || 0,
                        null,
                        "dailyActiveUsers"
                      )
                    }
                    placeholder="0"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Total Downloads</label>
                  <input
                    type="number"
                    value={
                      formData.productMetrics.downloads === 0
                        ? ""
                        : formData.productMetrics.downloads
                    }
                    onChange={(e) =>
                      handleChange(
                        "productMetrics",
                        parseInt(e.target.value) || 0,
                        null,
                        "downloads"
                      )
                    }
                    placeholder="0"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Retention Rate</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={
                        formData.productMetrics.retentionRate === 0
                          ? ""
                          : formData.productMetrics.retentionRate
                      }
                      onChange={(e) =>
                        handleChange(
                          "productMetrics",
                          parseFloat(e.target.value) || 0,
                          null,
                          "retentionRate"
                        )
                      }
                      placeholder="0"
                      className={inputClasses}
                    />
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                      %
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Repeat Customer Rate</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={
                        formData.productMetrics.repeatCustomerRatePercent === 0
                          ? ""
                          : formData.productMetrics.repeatCustomerRatePercent
                      }
                      onChange={(e) =>
                        handleChange(
                          "productMetrics",
                          parseFloat(e.target.value) || 0,
                          null,
                          "repeatCustomerRatePercent"
                        )
                      }
                      placeholder="0"
                      className={inputClasses}
                    />
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                      %
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>
                    GMV (Gross Merchandise Value)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.productMetrics.GMV === 0
                          ? ""
                          : formData.productMetrics.GMV
                      }
                      onChange={(e) =>
                        handleChange(
                          "productMetrics",
                          parseFloat(e.target.value) || 0,
                          null,
                          "GMV"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Key Achievements</label>
              <div className="space-y-2 sm:space-y-3">
                {formData.productMetrics.keyAchievements.map(
                  (achievement, index) => (
                    <div key={index} className="flex gap-2 sm:gap-3">
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) =>
                          handleChange(
                            "productMetrics",
                            e.target.value,
                            index,
                            "keyAchievements"
                          )
                        }
                        placeholder="Describe a key achievement"
                        className={inputClasses}
                      />
                      {formData.productMetrics.keyAchievements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newAchievements =
                              formData.productMetrics.keyAchievements.filter(
                                (_, i) => i !== index
                              );
                            handleChange(
                              "productMetrics",
                              newAchievements,
                              null,
                              "keyAchievements"
                            );
                          }}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )
                )}
                <button
                  type="button"
                  onClick={() => {
                    const newAchievements = [
                      ...formData.productMetrics.keyAchievements,
                      "",
                    ];
                    handleChange(
                      "productMetrics",
                      newAchievements,
                      null,
                      "keyAchievements"
                    );
                  }}
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Achievement
                </button>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Customer Testimonials</label>
              <div className="space-y-3 sm:space-y-4">
                {formData.customerTestimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.customerTestimonials.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("customerTestimonials", index)
                        }
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="text"
                        value={testimonial.customerName}
                        onChange={(e) =>
                          handleChange(
                            "customerTestimonials",
                            e.target.value,
                            index,
                            "customerName"
                          )
                        }
                        placeholder="Customer name"
                        className={inputClasses}
                      />
                      <select
                        value={testimonial.rating}
                        onChange={(e) =>
                          handleChange(
                            "customerTestimonials",
                            parseInt(e.target.value),
                            index,
                            "rating"
                          )
                        }
                        className={selectClasses}
                      >
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                      </select>
                    </div>
                    <textarea
                      value={testimonial.testimonial}
                      onChange={(e) =>
                        handleChange(
                          "customerTestimonials",
                          e.target.value,
                          index,
                          "testimonial"
                        )
                      }
                      placeholder="Customer testimonial"
                      rows={3}
                      className={textareaClasses}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("customerTestimonials", {
                      customerName: "",
                      testimonial: "",
                      rating: 5,
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Testimonial
                </button>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Strategic Partnerships</label>
              <div className="space-y-3 sm:space-y-4">
                {formData.partnerships.map((partnership, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.partnerships.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("partnerships", index)}
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="text"
                        value={partnership.partnerName}
                        onChange={(e) =>
                          handleChange(
                            "partnerships",
                            e.target.value,
                            index,
                            "partnerName"
                          )
                        }
                        placeholder="Partner company name"
                        className={inputClasses}
                      />
                      <input
                        type="text"
                        value={partnership.partnershipType}
                        onChange={(e) =>
                          handleChange(
                            "partnerships",
                            e.target.value,
                            index,
                            "partnershipType"
                          )
                        }
                        placeholder="Partnership type"
                        className={inputClasses}
                      />
                    </div>
                    <textarea
                      value={partnership.description}
                      onChange={(e) =>
                        handleChange(
                          "partnerships",
                          e.target.value,
                          index,
                          "description"
                        )
                      }
                      placeholder="Partnership description and benefits"
                      rows={3}
                      className={textareaClasses}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("partnerships", {
                      partnerName: "",
                      partnershipType: "",
                      description: "",
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Partnership
                </button>
              </div>
            </div>
          </div>
        );

      case 5: // Team Information
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelClasses}>
                  Founder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.founderName}
                  onChange={(e) => handleChange("founderName", e.target.value)}
                  placeholder="Your full name"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>
                  Founder Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.founderEmail}
                  onChange={(e) => handleChange("founderEmail", e.target.value)}
                  placeholder="your.email@company.com"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelClasses}>
                  Team Strength (Total Employees)
                </label>
                <input
                  type="number"
                  value={
                    formData.teamStrength === 0 ? "" : formData.teamStrength
                  }
                  onChange={(e) =>
                    handleChange("teamStrength", parseInt(e.target.value) || 0)
                  }
                  placeholder="Total number of employees"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Organization Structure</label>
                <textarea
                  value={formData.orgStructure}
                  onChange={(e) => handleChange("orgStructure", e.target.value)}
                  placeholder="Describe your organizational structure"
                  rows={3}
                  className={textareaClasses}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Founding Team</label>
              <div className="space-y-3 sm:space-y-4">
                {formData.foundingTeam.map((member, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.foundingTeam.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("foundingTeam", index)}
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          handleChange(
                            "foundingTeam",
                            e.target.value,
                            index,
                            "name"
                          )
                        }
                        placeholder="Full name"
                        className={inputClasses}
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) =>
                          handleChange(
                            "foundingTeam",
                            e.target.value,
                            index,
                            "role"
                          )
                        }
                        placeholder="Role/Position"
                        className={inputClasses}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="number"
                        value={
                          member.experienceYears === 0
                            ? ""
                            : member.experienceYears
                        }
                        onChange={(e) =>
                          handleChange(
                            "foundingTeam",
                            parseInt(e.target.value) || 0,
                            index,
                            "experienceYears"
                          )
                        }
                        placeholder="Years of experience"
                        className={inputClasses}
                      />
                      <input
                        type="url"
                        value={member.linkedIn}
                        onChange={(e) =>
                          handleChange(
                            "foundingTeam",
                            e.target.value,
                            index,
                            "linkedIn"
                          )
                        }
                        placeholder="LinkedIn profile URL"
                        className={inputClasses}
                      />
                    </div>
                    <textarea
                      value={member.background}
                      onChange={(e) =>
                        handleChange(
                          "foundingTeam",
                          e.target.value,
                          index,
                          "background"
                        )
                      }
                      placeholder="Professional background and expertise"
                      rows={3}
                      className={textareaClasses}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("foundingTeam", {
                      name: "",
                      role: "",
                      background: "",
                      experienceYears: 0,
                      linkedIn: "",
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Founding Team Member
                </button>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Team Members</label>
              <div className="space-y-3 sm:space-y-4">
                {formData.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("teamMembers", index)}
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          handleChange(
                            "teamMembers",
                            e.target.value,
                            index,
                            "name"
                          )
                        }
                        placeholder="Full name"
                        className={inputClasses}
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) =>
                          handleChange(
                            "teamMembers",
                            e.target.value,
                            index,
                            "role"
                          )
                        }
                        placeholder="Role/Position"
                        className={inputClasses}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <input
                        type="number"
                        value={
                          member.experienceYears === 0
                            ? ""
                            : member.experienceYears
                        }
                        onChange={(e) =>
                          handleChange(
                            "teamMembers",
                            parseInt(e.target.value) || 0,
                            index,
                            "experienceYears"
                          )
                        }
                        placeholder="Years of experience"
                        className={inputClasses}
                      />
                      <input
                        type="url"
                        value={member.linkedIn}
                        onChange={(e) =>
                          handleChange(
                            "teamMembers",
                            e.target.value,
                            index,
                            "linkedIn"
                          )
                        }
                        placeholder="LinkedIn profile URL"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("teamMembers", {
                      name: "",
                      role: "",
                      experienceYears: 0,
                      linkedIn: "",
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Team Member
                </button>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Advisors</label>
              <div className="space-y-3 sm:space-y-4">
                {formData.advisors.map((advisor, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.advisors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("advisors", index)}
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="text"
                        value={advisor.name}
                        onChange={(e) =>
                          handleChange(
                            "advisors",
                            e.target.value,
                            index,
                            "name"
                          )
                        }
                        placeholder="Advisor name"
                        className={inputClasses}
                      />
                      <input
                        type="text"
                        value={advisor.expertise}
                        onChange={(e) =>
                          handleChange(
                            "advisors",
                            e.target.value,
                            index,
                            "expertise"
                          )
                        }
                        placeholder="Area of expertise"
                        className={inputClasses}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="url"
                        value={advisor.linkedIn}
                        onChange={(e) =>
                          handleChange(
                            "advisors",
                            e.target.value,
                            index,
                            "linkedIn"
                          )
                        }
                        placeholder="LinkedIn profile URL"
                        className={inputClasses}
                      />
                      <textarea
                        value={advisor.background}
                        onChange={(e) =>
                          handleChange(
                            "advisors",
                            e.target.value,
                            index,
                            "background"
                          )
                        }
                        placeholder="Professional background"
                        rows={2}
                        className={textareaClasses}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("advisors", {
                      name: "",
                      expertise: "",
                      background: "",
                      linkedIn: "",
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Advisor
                </button>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Board of Directors</label>
              <div className="space-y-3 sm:space-y-4">
                {formData.boardOfDirectors.map((director, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.boardOfDirectors.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("boardOfDirectors", index)
                        }
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="text"
                        value={director.name}
                        onChange={(e) =>
                          handleChange(
                            "boardOfDirectors",
                            e.target.value,
                            index,
                            "name"
                          )
                        }
                        placeholder="Director name"
                        className={inputClasses}
                      />
                      <input
                        type="text"
                        value={director.role}
                        onChange={(e) =>
                          handleChange(
                            "boardOfDirectors",
                            e.target.value,
                            index,
                            "role"
                          )
                        }
                        placeholder="Board role"
                        className={inputClasses}
                      />
                    </div>
                    <textarea
                      value={director.background}
                      onChange={(e) =>
                        handleChange(
                          "boardOfDirectors",
                          e.target.value,
                          index,
                          "background"
                        )
                      }
                      placeholder="Professional background and qualifications"
                      rows={3}
                      className={textareaClasses}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("boardOfDirectors", {
                      name: "",
                      role: "",
                      background: "",
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Board Member
                </button>
              </div>
            </div>
          </div>
        );

      case 6: // Business Model
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className={labelClasses}>
                Business Model <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.businessModel}
                onChange={(e) => handleChange("businessModel", e.target.value)}
                placeholder="Describe your revenue model and monetization strategy"
                rows={4}
                className={textareaClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>
                Go-to-Market Strategy <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.goToMarketStrategy}
                onChange={(e) =>
                  handleChange("goToMarketStrategy", e.target.value)
                }
                placeholder="Detail your customer acquisition and market penetration approach"
                rows={4}
                className={textareaClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Expansion Plans</label>
              <textarea
                value={formData.expansionPlans}
                onChange={(e) => handleChange("expansionPlans", e.target.value)}
                placeholder="Describe your plans for geographic or market expansion"
                rows={3}
                className={textareaClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Product Roadmap</label>
              <textarea
                value={formData.productRoadmap}
                onChange={(e) => handleChange("productRoadmap", e.target.value)}
                placeholder="Outline your product development roadmap"
                rows={4}
                className={textareaClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Scaling Strategy</label>
              <textarea
                value={formData.scalingStrategy}
                onChange={(e) =>
                  handleChange("scalingStrategy", e.target.value)
                }
                placeholder="Explain how you plan to scale your business"
                rows={4}
                className={textareaClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>ESG Impact</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className={`${labelClasses} text-xs`}>
                    Environmental Impact
                  </label>
                  <textarea
                    value={formData.esg.environmentalImpact}
                    onChange={(e) =>
                      handleChange(
                        "esg",
                        e.target.value,
                        null,
                        "environmentalImpact"
                      )
                    }
                    placeholder="Environmental considerations"
                    rows={3}
                    className={textareaClasses}
                  />
                </div>
                <div>
                  <label className={`${labelClasses} text-xs`}>
                    Social Impact
                  </label>
                  <textarea
                    value={formData.esg.socialImpact}
                    onChange={(e) =>
                      handleChange("esg", e.target.value, null, "socialImpact")
                    }
                    placeholder="Social impact and community benefits"
                    rows={3}
                    className={textareaClasses}
                  />
                </div>
                <div>
                  <label className={`${labelClasses} text-xs`}>
                    Governance
                  </label>
                  <textarea
                    value={formData.esg.governancePractices}
                    onChange={(e) =>
                      handleChange(
                        "esg",
                        e.target.value,
                        null,
                        "governancePractices"
                      )
                    }
                    placeholder="Governance practices"
                    rows={3}
                    className={textareaClasses}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 7: // Financials
        return (
          <div className="space-y-4 sm:space-y-6">
            <h3
              className={`text-base sm:text-lg font-medium ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              Comprehensive Financial Metrics
            </h3>

            <div>
              <h4
                className={`text-sm font-medium mb-3 ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Revenue Streams
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {formData.financials.revenueStreams.map((stream, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.financials.revenueStreams.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeNestedArrayItem(
                            "financials",
                            "revenueStreams",
                            index
                          )
                        }
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <input
                        type="text"
                        value={stream.streamName}
                        onChange={(e) =>
                          handleChange(
                            "financials",
                            { streamName: e.target.value },
                            index,
                            "revenueStreams"
                          )
                        }
                        placeholder="Revenue stream name"
                        className={inputClasses}
                      />
                      <select
                        value={stream.type}
                        onChange={(e) =>
                          handleChange(
                            "financials",
                            { type: e.target.value },
                            index,
                            "revenueStreams"
                          )
                        }
                        className={selectClasses}
                      >
                        <option value="subscription">Subscription</option>
                        <option value="commission">Commission</option>
                        <option value="freemium">Freemium</option>
                        <option value="ads">Advertising</option>
                        <option value="licensing">Licensing</option>
                        <option value="transaction">Transaction</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="relative">
                        <input
                          type="number"
                          value={stream.percentage || ""}
                          onChange={(e) =>
                            handleChange(
                              "financials",
                              { percentage: parseFloat(e.target.value) || 0 },
                              index,
                              "revenueStreams"
                            )
                          }
                          placeholder="% of total revenue"
                          className={inputClasses}
                        />
                        <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addNestedArrayItem("financials", "revenueStreams", {
                      streamName: "",
                      type: "subscription",
                      percentage: 0,
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Revenue Stream
                </button>
              </div>
            </div>

            <div>
              <h4
                className={`text-sm font-medium mb-3 ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Revenue & Profitability
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className={labelClasses}>Revenue Last Year</label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.revenueLastYear === 0
                          ? ""
                          : formData.financials.revenueLastYear
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "revenueLastYear"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Revenue This Year</label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.revenueThisYear === 0
                          ? ""
                          : formData.financials.revenueThisYear
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "revenueThisYear"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Monthly Revenue (MRR)</label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.monthlyRevenue === 0
                          ? ""
                          : formData.financials.monthlyRevenue
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "monthlyRevenue"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Annual Revenue (ARR)</label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.annualRevenue === 0
                          ? ""
                          : formData.financials.annualRevenue
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "annualRevenue"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4
                className={`text-sm font-medium mb-3 ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Costs & Margins
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className={labelClasses}>COGS</label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.COGS === 0
                          ? ""
                          : formData.financials.COGS
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "COGS"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Gross Margin</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={
                        formData.financials.grossMarginPercent === 0
                          ? ""
                          : formData.financials.grossMarginPercent
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "grossMarginPercent"
                        )
                      }
                      placeholder="0"
                      className={inputClasses}
                    />
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                      %
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Net Profit</label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.netProfit === 0
                          ? ""
                          : formData.financials.netProfit
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "netProfit"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Operating Expenses</label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.operatingExpenses === 0
                          ? ""
                          : formData.financials.operatingExpenses
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "operatingExpenses"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4
                className={`text-sm font-medium mb-3 ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Unit Economics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className={labelClasses}>
                    Customer Acquisition Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.customerAcquisitionCost === 0
                          ? ""
                          : formData.financials.customerAcquisitionCost
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "customerAcquisitionCost"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Lifetime Value</label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.lifetimeValue === 0
                          ? ""
                          : formData.financials.lifetimeValue
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "lifetimeValue"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>ARPU</label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.arpu === 0
                          ? ""
                          : formData.financials.arpu
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "arpu"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Payback Period</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={
                        formData.financials.paybackPeriodMonths === 0
                          ? ""
                          : formData.financials.paybackPeriodMonths
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "paybackPeriodMonths"
                        )
                      }
                      placeholder="0"
                      className={inputClasses}
                    />
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                      months
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4
                className={`text-sm font-medium mb-3 ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Cash Flow & Runway
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className={labelClasses}>Burn Rate</label>
                  <div className="relative">
                    <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={
                        formData.financials.burnRate === 0
                          ? ""
                          : formData.financials.burnRate
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "burnRate"
                        )
                      }
                      placeholder="0"
                      className={`${inputClasses} pl-6 sm:pl-8`}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Runway</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={
                        formData.financials.runwayMonths === 0
                          ? ""
                          : formData.financials.runwayMonths
                      }
                      onChange={(e) =>
                        handleChange(
                          "financials",
                          parseFloat(e.target.value) || 0,
                          null,
                          "runwayMonths"
                        )
                      }
                      placeholder="0"
                      className={inputClasses}
                    />
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                      months
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Break Even Point</label>
                  <input
                    type="date"
                    value={formData.financials.breakEvenPoint}
                    onChange={(e) =>
                      handleChange(
                        "financials",
                        e.target.value,
                        null,
                        "breakEvenPoint"
                      )
                    }
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            <div>
              <h4
                className={`text-sm font-medium mb-3 ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Cap Table
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {formData.financials.capTable.map((entry, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.financials.capTable.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeNestedArrayItem("financials", "capTable", index)
                        }
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <input
                        type="text"
                        value={entry.investorName}
                        onChange={(e) =>
                          handleChange(
                            "financials",
                            { investorName: e.target.value },
                            index,
                            "capTable"
                          )
                        }
                        placeholder="Investor/Shareholder name"
                        className={inputClasses}
                      />
                      <div className="relative">
                        <input
                          type="number"
                          value={entry.ownershipPercent || ""}
                          onChange={(e) =>
                            handleChange(
                              "financials",
                              {
                                ownershipPercent:
                                  parseFloat(e.target.value) || 0,
                              },
                              index,
                              "capTable"
                            )
                          }
                          placeholder="Ownership percentage"
                          min="0"
                          max="100"
                          className={inputClasses}
                        />
                        <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addNestedArrayItem("financials", "capTable", {
                      investorName: "",
                      ownershipPercent: 0,
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Cap Table Entry
                </button>
              </div>
            </div>

            {/* Financial Summary */}
            {formData.financials.lifetimeValue > 0 &&
              formData.financials.customerAcquisitionCost > 0 && (
                <div
                  className={`p-3 sm:p-4 rounded-sm ${
                    dark ? "bg-blue-900/20" : "bg-blue-50"
                  }`}
                >
                  <h4
                    className={`font-medium mb-3 ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Calculated Metrics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-bold text-blue-600">
                        {(
                          formData.financials.lifetimeValue /
                          formData.financials.customerAcquisitionCost
                        ).toFixed(1)}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                        LTV/CAC Ratio
                      </div>
                    </div>
                    {formData.financials.revenueThisYear > 0 &&
                      formData.financials.revenueLastYear > 0 && (
                        <div className="text-center">
                          <div className="text-lg sm:text-xl font-bold text-green-600">
                            {(
                              ((formData.financials.revenueThisYear -
                                formData.financials.revenueLastYear) /
                                formData.financials.revenueLastYear) *
                              100
                            ).toFixed(1)}
                            %
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                            Revenue Growth
                          </div>
                        </div>
                      )}
                    {formData.financials.burnRate > 0 && (
                      <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-orange-600">
                          ${formData.financials.burnRate.toLocaleString()}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                          Monthly Burn
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
        );

      case 8: // Investment Details
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelClasses}>
                  Funding Amount Requested{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={
                      formData.fundingDetails.fundingAskAmount === 0
                        ? ""
                        : formData.fundingDetails.fundingAskAmount
                    }
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      handleChange(
                        "fundingDetails",
                        value,
                        null,
                        "fundingAskAmount"
                      );
                      handleChange("fundingDetails", value, null, "askAmount"); // Sync both fields
                    }}
                    placeholder="0"
                    className={`${inputClasses} pl-6 sm:pl-8`}
                  />
                </div>
              </div>
              <div>
                <label className={labelClasses}>
                  Equity Offered <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={
                      formData.fundingDetails.equityOfferedPercent === 0
                        ? ""
                        : formData.fundingDetails.equityOfferedPercent
                    }
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      handleChange(
                        "fundingDetails",
                        value,
                        null,
                        "equityOfferedPercent"
                      );
                      handleChange(
                        "fundingDetails",
                        value,
                        null,
                        "equityOffered"
                      ); // Sync both fields
                    }}
                    placeholder="0"
                    className={inputClasses}
                  />
                  <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={labelClasses}>Previous Funding Raised</label>
                <div className="relative">
                  <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={
                      formData.fundingDetails.previousFundingRaised === 0
                        ? ""
                        : formData.fundingDetails.previousFundingRaised
                    }
                    onChange={(e) =>
                      handleChange(
                        "fundingDetails",
                        parseFloat(e.target.value) || 0,
                        null,
                        "previousFundingRaised"
                      )
                    }
                    placeholder="0"
                    className={`${inputClasses} pl-6 sm:pl-8`}
                  />
                </div>
              </div>
              <div>
                <label className={labelClasses}>Deal Flexibility</label>
                <select
                  value={formData.fundingDetails.dealFlexibility}
                  onChange={(e) =>
                    handleChange(
                      "fundingDetails",
                      e.target.value,
                      null,
                      "dealFlexibility"
                    )
                  }
                  className={selectClasses}
                >
                  <option value="equity">Equity</option>
                  <option value="debt">Debt</option>
                  <option value="convertible">Convertible</option>
                  <option value="royalty">Royalty</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Strategic Need</label>
              <textarea
                value={formData.fundingDetails.strategicNeed}
                onChange={(e) =>
                  handleChange(
                    "fundingDetails",
                    e.target.value,
                    null,
                    "strategicNeed"
                  )
                }
                placeholder="Why do you specifically want this investor? What strategic value do they bring?"
                rows={3}
                className={textareaClasses}
              />
            </div>

            {/* Valuation Calculation */}
            {formData.fundingDetails.fundingAskAmount > 0 &&
              formData.fundingDetails.equityOfferedPercent > 0 && (
                <div
                  className={`p-3 sm:p-4 rounded-sm ${
                    dark ? "bg-green-900/20" : "bg-green-50"
                  }`}
                >
                  <h4
                    className={`font-medium mb-3 ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Implied Valuation
                  </h4>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
                      $
                      {(
                        (formData.fundingDetails.fundingAskAmount /
                          formData.fundingDetails.equityOfferedPercent) *
                        100
                      ).toLocaleString()}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Based on $
                      {formData.fundingDetails.fundingAskAmount.toLocaleString()}{" "}
                      for {formData.fundingDetails.equityOfferedPercent}% equity
                    </p>
                  </div>
                </div>
              )}

            <div>
              <label className={labelClasses}>
                Valuation History (Optional)
              </label>
              <div className="space-y-3 sm:space-y-4">
                {formData.valuationHistory.map((valuation, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    <button
                      type="button"
                      onClick={() => removeArrayItem("valuationHistory", index)}
                      className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                    >
                      ×
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="date"
                        value={
                          valuation.date
                            ? new Date(valuation.date)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          handleChange(
                            "valuationHistory",
                            e.target.value,
                            index,
                            "date"
                          )
                        }
                        className={inputClasses}
                      />
                      <select
                        value={valuation.roundType || "Seed"}
                        onChange={(e) =>
                          handleChange(
                            "valuationHistory",
                            e.target.value,
                            index,
                            "roundType"
                          )
                        }
                        className={selectClasses}
                      >
                        <option value="Pre-Seed">Pre-Seed</option>
                        <option value="Seed">Seed</option>
                        <option value="Series A">Series A</option>
                        <option value="Series B">Series B</option>
                        <option value="Series C">Series C</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="relative">
                        <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={
                            valuation.valuation === 0 ? "" : valuation.valuation
                          }
                          onChange={(e) =>
                            handleChange(
                              "valuationHistory",
                              parseFloat(e.target.value) || 0,
                              index,
                              "valuation"
                            )
                          }
                          placeholder="Valuation"
                          className={`${inputClasses} pl-6 sm:pl-8`}
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={
                            valuation.fundingRaised === 0
                              ? ""
                              : valuation.fundingRaised
                          }
                          onChange={(e) =>
                            handleChange(
                              "valuationHistory",
                              parseFloat(e.target.value) || 0,
                              index,
                              "fundingRaised"
                            )
                          }
                          placeholder="Funding Raised"
                          className={`${inputClasses} pl-6 sm:pl-8`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("valuationHistory", {
                      date: new Date().toISOString(),
                      valuation: 0,
                      fundingRaised: 0,
                      roundType: "Seed",
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Previous Round
                </button>
              </div>
            </div>
          </div>
        );

      case 9: // Legal & Strategy
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className={labelClasses}>Key Milestones & Roadmap</label>
              <div className="space-y-3 sm:space-y-4">
                {formData.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-sm border ${
                      dark
                        ? "border-gray-600 bg-gray-800/30"
                        : "border-gray-200 bg-gray-50/30"
                    } relative`}
                  >
                    {formData.milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("milestones", index)}
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) =>
                          handleChange(
                            "milestones",
                            e.target.value,
                            index,
                            "title"
                          )
                        }
                        placeholder="Milestone title"
                        className={inputClasses}
                      />
                      <input
                        type="date"
                        value={
                          milestone.targetDate
                            ? new Date(milestone.targetDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          handleChange(
                            "milestones",
                            e.target.value,
                            index,
                            "targetDate"
                          )
                        }
                        className={inputClasses}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        value={milestone.description}
                        onChange={(e) =>
                          handleChange(
                            "milestones",
                            e.target.value,
                            index,
                            "description"
                          )
                        }
                        placeholder="Describe this milestone"
                        rows={3}
                        className={textareaClasses}
                      />
                    </div>
                    <select
                      value={milestone.status || "pending"}
                      onChange={(e) =>
                        handleChange(
                          "milestones",
                          e.target.value,
                          index,
                          "status"
                        )
                      }
                      className={selectClasses}
                    >
                      <option value="pending">Pending</option>
                      <option value="achieved">Achieved</option>
                      <option value="delayed">Delayed</option>
                    </select>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("milestones", {
                      title: "",
                      description: "",
                      targetDate: "",
                      status: "pending",
                    })
                  }
                  className={`w-full py-2 sm:py-3 border-2 border-dashed rounded-sm transition-colors text-xs sm:text-sm ${
                    dark
                      ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                  }`}
                >
                  Add Milestone
                </button>
              </div>
            </div>

            <div>
              <h4
                className={`text-base sm:text-lg font-medium mb-3 sm:mb-4 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Legal & Compliance
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div>
                  <label className={labelClasses}>Company Registration</label>
                  <select
                    value={formData.legal.companyRegistration}
                    onChange={(e) =>
                      handleChange(
                        "legal",
                        e.target.value,
                        null,
                        "companyRegistration"
                      )
                    }
                    className={selectClasses}
                  >
                    <option value="Private Limited">Private Limited</option>
                    <option value="LLP">LLP</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Sole Proprietorship">
                      Sole Proprietorship
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>ESOP Pool</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={
                        formData.legal.esops === 0 ? "" : formData.legal.esops
                      }
                      onChange={(e) =>
                        handleChange(
                          "legal",
                          parseFloat(e.target.value) || 0,
                          null,
                          "esops"
                        )
                      }
                      placeholder="Employee stock option pool"
                      className={inputClasses}
                    />
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div>
                  <label className={labelClasses}>Compliance Status</label>
                  <input
                    type="text"
                    value={formData.legal.complianceStatus}
                    onChange={(e) =>
                      handleChange(
                        "legal",
                        e.target.value,
                        null,
                        "complianceStatus"
                      )
                    }
                    placeholder="Overall compliance status"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Pending Litigations</label>
                  <input
                    type="text"
                    value={formData.legal.pendingLitigations}
                    onChange={(e) =>
                      handleChange(
                        "legal",
                        e.target.value,
                        null,
                        "pendingLitigations"
                      )
                    }
                    placeholder="Any pending legal issues"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <h5
                  className={`text-sm font-medium mb-3 ${
                    dark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Tax Compliance
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="gst-compliant"
                      checked={formData.legal.taxCompliance.GST}
                      onChange={(e) =>
                        handleChange(
                          "legal",
                          e.target.checked,
                          "GST",
                          "taxCompliance"
                        )
                      }
                      className="mr-2"
                    />
                    <label htmlFor="gst-compliant" className="text-sm">
                      GST Compliant
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="tds-compliant"
                      checked={formData.legal.taxCompliance.TDS}
                      onChange={(e) =>
                        handleChange(
                          "legal",
                          e.target.checked,
                          "TDS",
                          "taxCompliance"
                        )
                      }
                      className="mr-2"
                    />
                    <label htmlFor="tds-compliant" className="text-sm">
                      TDS Compliant
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.legal.taxCompliance.status}
                    onChange={(e) =>
                      handleChange(
                        "legal",
                        e.target.value,
                        "status",
                        "taxCompliance"
                      )
                    }
                    placeholder="Tax compliance status"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className={labelClasses}>Patents</label>
                  <div className="space-y-2 sm:space-y-3">
                    {formData.legal.patents.map((patent, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={patent}
                          onChange={(e) =>
                            handleChange(
                              "legal",
                              e.target.value,
                              index,
                              "patents"
                            )
                          }
                          placeholder="Patent title/number"
                          className={inputClasses}
                        />
                        {formData.legal.patents.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newPatents = formData.legal.patents.filter(
                                (_, i) => i !== index
                              );
                              handleChange(
                                "legal",
                                newPatents,
                                null,
                                "patents"
                              );
                            }}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newPatents = [...formData.legal.patents, ""];
                        handleChange("legal", newPatents, null, "patents");
                      }}
                      className={`w-full py-2 border-2 border-dashed rounded-sm text-xs sm:text-sm transition-colors ${
                        dark
                          ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                      }`}
                    >
                      Add Patent
                    </button>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Trademarks</label>
                  <div className="space-y-2 sm:space-y-3">
                    {formData.legal.trademarks.map((trademark, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={trademark}
                          onChange={(e) =>
                            handleChange(
                              "legal",
                              e.target.value,
                              index,
                              "trademarks"
                            )
                          }
                          placeholder="Trademark name"
                          className={inputClasses}
                        />
                        {formData.legal.trademarks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newTrademarks =
                                formData.legal.trademarks.filter(
                                  (_, i) => i !== index
                                );
                              handleChange(
                                "legal",
                                newTrademarks,
                                null,
                                "trademarks"
                              );
                            }}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newTrademarks = [
                          ...formData.legal.trademarks,
                          "",
                        ];
                        handleChange(
                          "legal",
                          newTrademarks,
                          null,
                          "trademarks"
                        );
                      }}
                      className={`w-full py-2 border-2 border-dashed rounded-sm text-xs sm:text-sm transition-colors ${
                        dark
                          ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                      }`}
                    >
                      Add Trademark
                    </button>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Licenses</label>
                  <div className="space-y-2 sm:space-y-3">
                    {formData.legal.licenses.map((license, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={license}
                          onChange={(e) =>
                            handleChange(
                              "legal",
                              e.target.value,
                              index,
                              "licenses"
                            )
                          }
                          placeholder="License type/name"
                          className={inputClasses}
                        />
                        {formData.legal.licenses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newLicenses =
                                formData.legal.licenses.filter(
                                  (_, i) => i !== index
                                );
                              handleChange(
                                "legal",
                                newLicenses,
                                null,
                                "licenses"
                              );
                            }}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-red-100 dark:bg-red-900/20 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center text-sm"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newLicenses = [...formData.legal.licenses, ""];
                        handleChange("legal", newLicenses, null, "licenses");
                      }}
                      className={`w-full py-2 border-2 border-dashed rounded-sm text-xs sm:text-sm transition-colors ${
                        dark
                          ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 hover:text-gray-600"
                      }`}
                    >
                      Add License
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Exit Strategy</label>
              <textarea
                value={formData.exitStrategy}
                onChange={(e) => handleChange("exitStrategy", e.target.value)}
                placeholder="Describe your long-term exit strategy (IPO, acquisition, etc.)"
                rows={4}
                className={textareaClasses}
              />
            </div>
          </div>
        );

      case 10: // Review & Submit
        return (
          <div className="space-y-4 sm:space-y-6">
            <div
              className={`p-4 sm:p-6 rounded-sm border ${
                dark
                  ? "border-gray-600 bg-gray-800/50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <h3
                className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Custom Pitch Summary
              </h3>

              {/* Show enabled sections */}
              <div className="mb-4 sm:mb-6">
                <h4
                  className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${
                    dark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Included Sections
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {enabledSteps.map((stepId) => (
                    <span
                      key={stepId}
                      className={`text-xs px-2 py-1 rounded-full ${
                        dark
                          ? "bg-blue-900/30 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {allSteps.find((s) => s.id === stepId)?.title}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Company:
                    </span>
                    <div
                      className={`mt-1 ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {formData.startupName || "Not specified"}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Industry:
                    </span>
                    <div
                      className={`mt-1 ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {formData.industry || "Not specified"}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Stage:
                    </span>
                    <div
                      className={`mt-1 ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {formData.stage}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Funding Ask:
                    </span>
                    <div
                      className={`mt-1 text-base sm:text-lg font-bold text-green-600`}
                    >
                      $
                      {formData.fundingDetails.fundingAskAmount.toLocaleString() ||
                        "0"}
                    </div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Equity Offered:
                    </span>
                    <div
                      className={`mt-1 ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {formData.fundingDetails.equityOfferedPercent || 0}%
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Team Size:
                    </span>
                    <div
                      className={`mt-1 ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {formData.teamStrength ||
                        formData.teamMembers.filter((tm) => tm.name).length +
                          1}{" "}
                      members
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Total Users:
                    </span>
                    <div
                      className={`mt-1 ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {formData.usersCount.toLocaleString() || "0"}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      Completion:
                    </span>
                    <div
                      className={`mt-1 ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {calculateCompletionPercentage()}%
                    </div>
                  </div>
                </div>
              </div>

              {formData.oneLiner && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-600">
                  <span className="font-medium text-gray-500 dark:text-gray-400">
                    Value Proposition:
                  </span>
                  <p
                    className={`mt-2 leading-relaxed text-sm sm:text-base ${
                      dark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {formData.oneLiner}
                  </p>
                </div>
              )}
            </div>

            {/* VISIBILITY SELECTION - NEW SECTION */}
            <div
              className={`p-4 sm:p-6 rounded-sm border ${
                dark
                  ? "border-gray-600 bg-gray-800/50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <h4
                className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
              >
                Pitch Visibility Settings
              </h4>
              <p
                className={`text-xs sm:text-sm mb-4 ${
                  dark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Choose who can see your pitch after submission
              </p>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={formData.visibility === "public"}
                    onChange={(e) => handleChange("visibility", e.target.value)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <div
                      className={`font-medium ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Public
                    </div>
                    <div
                      className={`text-xs ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Visible to all investors and publicly searchable. Maximum
                      exposure for your pitch.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="verified_investors"
                    checked={formData.visibility === "verified_investors"}
                    onChange={(e) => handleChange("visibility", e.target.value)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <div
                      className={`font-medium ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Investors
                    </div>
                    <div
                      className={`text-xs ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Only verified and accredited investors can view your
                      pitch. More exclusive exposure.
                    </div>
                  </div>
                </label>

                {/* <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="invited_only"
                    checked={formData.visibility === "invited_only"}
                    onChange={(e) => handleChange("visibility", e.target.value)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <div
                      className={`font-medium ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      📧 Invitation Only
                    </div>
                    <div
                      className={`text-xs ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Only investors you specifically invite can view your
                      pitch. Maximum privacy and control.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={formData.visibility === "private"}
                    onChange={(e) => handleChange("visibility", e.target.value)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <div
                      className={`font-medium ${
                        dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      🔒 Private
                    </div>
                    <div
                      className={`text-xs ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Keep your pitch private until you're ready to share it.
                      You can change this later.
                    </div>
                  </div>
                </label> */}
              </div>

              {/* Visibility indicator */}
              <div
                className={`mt-4 p-3 rounded-sm ${
                  formData.visibility === "public"
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : formData.visibility === "verified_investors"
                    ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                    : formData.visibility === "invited_only"
                    ? "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                    : "bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="text-xs font-medium">
                  Current selection:{" "}
                  <span className="capitalize">
                    {formData.visibility === "verified_investors"
                      ? "Investors Only"
                      : formData.visibility === "invited_only"
                      ? "Invitation Only"
                      : formData.visibility.charAt(0).toUpperCase() +
                        formData.visibility.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`p-4 sm:p-6 rounded-sm border-2 ${
                dark
                  ? "border-blue-500/30 bg-blue-500/5"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              <label className="flex items-start gap-3 sm:gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <div className="text-xs sm:text-sm">
                  <p
                    className={`font-medium mb-1 sm:mb-2 ${
                      dark ? "text-blue-300" : "text-blue-900"
                    }`}
                  >
                    I confirm that all information provided is accurate and
                    complete
                  </p>
                  <p
                    className={`text-xs leading-relaxed ${
                      dark ? "text-blue-400" : "text-blue-700"
                    }`}
                  >
                    {/* By submitting this custom pitch, you agree to our terms of
                    service and privacy policy. */}
                    By submitting this pitch, you agree that all the details you
                    provided are true and misleading information is fully my
                    responsibility.
                  </p>
                </div>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen lg:mb-10 mb-10 ${
        dark ? "bg-black" : "bg-gray-50"
      }`}
    >
      <div className="max-w-4xl mx-auto p-3 sm:p-6">
        {/* Header with Progress */}
        {!stepSelectionMode && enabledSteps.length > 0 && (
          <div
            className={`mb-4 sm:mb-8 p-4 sm:p-6 rounded-sm ${
              dark
                ? "bg-black border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <h1
                    className={`text-xl sm:text-2xl font-light ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Custom Pitch
                  </h1>
                  <button
                    onClick={() => {
                      setStepSelectionMode(true);
                      setCurrentStepIndex(0);
                    }}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-sm border transition-colors ${
                      dark
                        ? "border-gray-600 text-gray-400 hover:text-white hover:border-gray-500"
                        : "border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    Modify Sections
                  </button>
                </div>
                <p
                  className={`text-xs sm:text-sm mt-1 ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Step {currentStepIndex + 1} of {totalSteps}
                </p>
              </div>

              {draftSaved && (
                <div
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm ${
                    dark
                      ? "text-blue-300 bg-blue-500/10 border border-blue-500/30"
                      : "text-blue-700 bg-blue-50 border border-blue-200"
                  }`}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Draft Saved
                </div>
              )}
            </div>

            {/* Progress Steps */}
            <div className="hidden sm:flex items-center justify-between mb-4 sm:mb-6">
              {enabledSteps.map((stepId, index) => {
                const step = allSteps.find((s) => s.id === stepId);
                return (
                  <div
                    key={stepId}
                    className="flex flex-col items-center relative"
                  >
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
                        index <= currentStepIndex
                          ? "bg-blue-600 text-white"
                          : dark
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index < currentStepIndex ? "✓" : stepId}
                    </div>
                    <div className="text-xs mt-2 sm:mt-3 text-center max-w-[60px] sm:max-w-[70px]">
                      <div
                        className={`font-medium ${
                          index <= currentStepIndex
                            ? dark
                              ? "text-white"
                              : "text-gray-900"
                            : dark
                            ? "text-gray-500"
                            : "text-gray-400"
                        }`}
                      >
                        {step?.title}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          index <= currentStepIndex
                            ? dark
                              ? "text-gray-400"
                              : "text-gray-500"
                            : dark
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step?.subtitle}
                      </div>
                    </div>
                    {index < enabledSteps.length - 1 && (
                      <div
                        className={`absolute top-4 sm:top-5 left-4 sm:left-5 h-px w-full ${
                          index < currentStepIndex
                            ? "bg-blue-600"
                            : dark
                            ? "bg-gray-700"
                            : "bg-gray-300"
                        }`}
                        style={{
                          width: "calc(100% - 16px)",
                          marginLeft: "24px",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div
              className={`w-full h-1 sm:h-2 rounded-full ${
                dark ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <div
                className="h-1 sm:h-2 bg-blue-600 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Main Form */}
        {!stepSelectionMode && enabledSteps.length > 0 && (
          <div
            className={`rounded-sm ${
              dark
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="p-4 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <h2
                  className={`text-xl sm:text-2xl font-semibold ${
                    dark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {allSteps.find((s) => s.id === currentStep)?.title}
                </h2>
                <p
                  className={`text-xs sm:text-sm mt-1 ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {allSteps.find((s) => s.id === currentStep)?.subtitle}
                </p>
              </div>

              {error && (
                <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {renderStepContent()}

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-200 dark:border-gray-700 gap-3 sm:gap-0">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStepIndex === 0}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base ${
                      dark
                        ? "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={handleClearDraft}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-sm font-medium transition-all duration-200 border text-sm sm:text-base ${
                        dark
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      Clear Draft
                    </button>

                    {currentStepIndex < totalSteps - 1 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-sm font-medium transition-all duration-200 text-sm sm:text-base"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading || !validateStep(currentStep)}
                        className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-sm font-medium transition-all duration-200 text-sm sm:text-base"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </span>
                        ) : (
                          "Submit Pitch"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PitchForm;
