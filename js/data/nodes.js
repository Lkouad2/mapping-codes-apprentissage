export const nodes = [
  { id: "RNCP", label: "Code RNCP", type: "code", blocs: ["certification"], pivot: true },
  { id: "ROME", label: "Code ROME", type: "code", blocs: ["certification"], pivot: false },
  { id: "NSF", label: "Code NSF", type: "code", blocs: ["certification"], pivot: false },
  { id: "Formacode", label: "Code Formacode", type: "code", blocs: ["certification"], pivot: false },
  { id: "CEC", label: "Code niveau CEC", type: "code", blocs: ["certification"], pivot: false },
  { id: "CFD", label: "Code CFD", type: "code", blocs: ["certification"], pivot: false },
  { id: "CodeSISE", label: "Code SISE", type: "code", blocs: ["certification"], pivot: false },
  { id: "MEF", label: "Code MEF", type: "code", blocs: ["certification"], pivot: false },
  { id: "SIRET", label: "Code SIRET", type: "identifiant", blocs: ["etablissement", "employeur"], pivot: true },
  { id: "UAI", label: "Code UAI", type: "identifiant", blocs: ["etablissement"], pivot: false },
  { id: "NDA", label: "Code NDA", type: "identifiant", blocs: ["etablissement"], pivot: false },
  { id: "IDCC", label: "Code IDCC", type: "code", blocs: ["employeur"], pivot: false },
  { id: "NAFAPE", label: "Code NAF / APE", type: "code", blocs: ["employeur"], pivot: false },
  { id: "CRIS", label: "Code CRIS", type: "code", blocs: ["employeur"], pivot: false },
  { id: "NPEC", label: "Code NPEC", type: "code", blocs: ["certification", "employeur"], pivot: false }
];
