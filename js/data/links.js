export const links = [
  { source: "ROME", target: "RNCP", relation: "indexe" },
  { source: "NSF", target: "RNCP", relation: "indexe" },
  { source: "Formacode", target: "RNCP", relation: "indexe" },
  { source: "CEC", target: "RNCP", relation: "qualifie" },

  { source: "CFD", target: "RNCP", relation: "correspondance_partielle", style: "dashed" },
  { source: "CFD", target: "MEF", relation: "relie" },
  { source: "CFD", target: "CodeSISE", relation: "relie" },

  { source: "SIRET", target: "RNCP", relation: "relie", context: "certificateur" },
  { source: "SIRET", target: "NDA", relation: "relie" },
  { source: "SIRET", target: "UAI", relation: "correspondance_partielle", style: "dashed" },

  { source: "SIRET", target: "IDCC", relation: "relie" },
  { source: "SIRET", target: "NAFAPE", relation: "relie" },
  { source: "IDCC", target: "CRIS", relation: "alimente" },

  { source: "RNCP", target: "NPEC", relation: "relie" }
];
