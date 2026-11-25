import "../Beacon2RIAPI/ApiConfiguration.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface PhenopacketExamplesProps {
  searchTerm: string;
}

const PhenopacketExamples: React.FC<PhenopacketExamplesProps> = ({
  searchTerm,
}) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);
  useDocScrollSpy(contentRef);

  const copyToClipboard = (snippetId: string) => {
    const textToCopy: { [key: string]: string } = {
      "rare-disease-example": `{
  "id": "bethlem-myopathy-case-01",
  "subject": {
    "id": "proband-01",
    "timeAtLastEncounter": {
      "age": {
        "iso8601duration": "P14Y"
      }
    },
    "sex": "MALE"
  },
  "phenotypicFeatures": [
    {
      "type": {
        "id": "HP:0001558",
        "label": "Decreased fetal movement"
      },
      "onset": {
        "ontologyClass": {
          "id": "HP:0011461",
          "label": "Fetal onset"
        }
      },
      "evidence": [
        {
          "evidenceCode": {
            "id": "ECO:0000033",
            "label": "author statement supported by traceable reference"
          },
          "reference": {
            "id": "PMID:30808312"
          }
        }
      ]
    },
    {
      "type": {
        "id": "HP:0031910",
        "label": "Abnormal cranial nerve physiology"
      },
      "excluded": true,
      "evidence": [
        {
          "evidenceCode": {
            "id": "ECO:0000033",
            "label": "author statement supported by traceable reference"
          },
          "reference": {
            "id": "PMID:30808312"
          }
        }
      ]
    },
    {
      "type": {
        "id": "HP:0012587",
        "label": "Macroscopic hematuria"
      },
      "modifiers": [
        {
          "id": "HP:0031796",
          "label": "Recurrent"
        }
      ],
      "onset": {
        "age": {
          "iso8601duration": "P14Y"
        }
      },
      "evidence": [
        {
          "evidenceCode": {
            "id": "ECO:0000033",
            "label": "author statement supported by traceable reference"
          },
          "reference": {
            "id": "PMID:30808312"
          }
        }
      ]
    },
    {
      "type": {
        "id": "HP:0001270",
        "label": "Motor delay"
      },
      "severity": {
        "id": "HP:0012825",
        "label": "Mild"
      },
      "onset": {
        "ontologyClass": {
          "id": "HP:0011463",
          "label": "Childhood onset"
        }
      }
    }
  ],
  "metaData": {
    "created": "2026-11-23T00:00:00Z",
    "createdBy": "Phenopacket to Beacon v2 tutorial",
    "resources": [
      {
        "id": "hp",
        "name": "Human Phenotype Ontology",
        "url": "http://purl.obolibrary.org/obo/hp.owl",
        "version": "2018-03-08",
        "namespacePrefix": "HP",
        "iriPrefix": "http://purl.obolibrary.org/obo/HP_"
      },
      {
        "id": "eco",
        "name": "Evidence and Conclusion Ontology",
        "url": "http://purl.obolibrary.org/obo/eco.owl",
        "namespacePrefix": "ECO",
        "iriPrefix": "http://purl.obolibrary.org/obo/ECO_"
      }
    ],
    "phenopacketSchemaVersion": "2.0",
    "externalReferences": [
      {
        "id": "PMID:30808312",
        "description": "Bao M, et al. COL6A1 mutation leading to Bethlem myopathy with recurrent hematuria: a case report. BMC Neurol. 2019;19(1):32."
      }
    ]
  }
}`,
      "cancer-example": `{
  "id": "example case",
  "subject": {
    "id": "patient1",
    "dateOfBirth": "1964-03-15T00:00:00Z",
    "sex": "MALE"
  },
  "phenotypicFeatures": [
    {
      "type": {
        "id": "HP:0000790",
        "label": "Hematuria"
      }
    },
    {
      "type": {
        "id": "HP:0100518",
        "label": "Dysuria"
      },
      "severity": {
        "id": "HP:0012828",
        "label": "Severe"
      }
    }
  ],
  "biosamples": [
    {
      "id": "sample1",
      "individualId": "patient1",
      "sampledTissue": {
        "id": "UBERON:0001256",
        "label": "wall of urinary bladder"
      },
      "sampleType": {
        "id": "OBI:0001479",
        "label": "tissue specimen"
      },
      "materialSample": {
        "id": "EFO:0009655",
        "label": "abnormal sample"
      },
      "timeOfCollection": {
        "age": {
          "iso8601duration": "P52Y2M"
        }
      },
      "histologicalDiagnosis": {
        "id": "NCIT:C39853",
        "label": "Infiltrating Urothelial Carcinoma"
      },
      "tumorProgression": {
        "id": "NCIT:C84509",
        "label": "Primary Malignant Neoplasm"
      },
      "procedure": {
        "code": {
          "id": "NCIT:C5189",
          "label": "Radical Cystoprostatectomy"
        }
      },
      "files": [
        {
          "uri": "file:///data/genomes/urothelial_ca_wgs.vcf.gz",
          "individualToFileIdentifiers": {
            "patient1": "NA12345"
          },
          "fileAttributes": {
            "genomeAssembly": "GRCh38",
            "fileFormat": "vcf",
            "description": "Urothelial carcinoma sample"
          }
        }
      ]
    },
    {
      "id": "sample2",
      "individualId": "patient1",
      "sampledTissue": {
        "id": "UBERON:0002367",
        "label": "prostate gland"
      },
      "sampleType": {
        "id": "OBI:0001479",
        "label": "tissue specimen"
      },
      "materialSample": {
        "id": "EFO:0009655",
        "label": "abnormal sample"
      },
      "timeOfCollection": {
        "age": {
          "iso8601duration": "P52Y2M"
        }
      },
      "histologicalDiagnosis": {
        "id": "NCIT:C5596",
        "label": "Prostate Acinar Adenocarcinoma"
      },
      "tumorProgression": {
        "id": "NCIT:C95606",
        "label": "Second Primary Malignant Neoplasm"
      },
      "tumorGrade": {
        "id": "NCIT:C28091",
        "label": "Gleason Score 7"
      },
      "procedure": {
        "code": {
          "id": "NCIT:C15189",
          "label": "Biopsy"
        }
      }
    },
    {
      "id": "sample3",
      "individualId": "patient1",
      "sampledTissue": {
        "id": "UBERON:0001223",
        "label": "left ureter"
      },
      "sampleType": {
        "id": "OBI:0001479",
        "label": "tissue specimen"
      },
      "materialSample": {
        "id": "EFO:0009654",
        "label": "reference sample"
      },
      "timeOfCollection": {
        "age": {
          "iso8601duration": "P52Y2M"
        }
      },
      "histologicalDiagnosis": {
        "id": "NCIT:C38757",
        "label": "Negative Finding"
      },
      "procedure": {
        "code": {
          "id": "NCIT:C15189",
          "label": "Biopsy"
        }
      }
    },
    {
      "id": "sample4",
      "individualId": "patient1",
      "sampledTissue": {
        "id": "UBERON:0001222",
        "label": "right ureter"
      },
      "sampleType": {
        "id": "OBI:0001479",
        "label": "tissue specimen"
      },
      "materialSample": {
        "id": "EFO:0009654",
        "label": "reference sample"
      },
      "timeOfCollection": {
        "age": {
          "iso8601duration": "P52Y2M"
        }
      },
      "histologicalDiagnosis": {
        "id": "NCIT:C38757",
        "label": "Negative Finding"
      }
    },
    {
      "id": "sample5",
      "individualId": "patient1",
      "sampledTissue": {
        "id": "UBERON:0015876",
        "label": "pelvic lymph node"
      },
      "sampleType": {
        "id": "OBI:0001479",
        "label": "tissue specimen"
      },
      "materialSample": {
        "id": "EFO:0009655",
        "label": "abnormal sample"
      },
      "timeOfCollection": {
        "age": {
          "iso8601duration": "P52Y2M"
        }
      },
      "tumorProgression": {
        "id": "NCIT:C3261",
        "label": "Metastatic Neoplasm"
      },
      "procedure": {
        "code": {
          "id": "NCIT:C15189",
          "label": "Biopsy"
        }
      },
      "files": [
        {
          "uri": "file://data/genomes/metastasis_wgs.vcf.gz",
          "individualToFileIdentifiers": {
            "sample5": "BS730275"
          },
          "fileAttributes": {
            "genomeAssembly": "GRCh38",
            "fileFormat": "vcf",
            "description": "lymph node metastasis sample"
          }
        }
      ]
    }
  ],
  "diseases": [
    {
      "term": {
        "id": "NCIT:C39853",
        "label": "Infiltrating Urothelial Carcinoma"
      },
      "diseaseStage": [
        {
          "id": "NCIT:C27971",
          "label": "Stage IV"
        }
      ],
      "clinicalTnmFinding": [
        {
          "id": "NCIT:C48766",
          "label": "pT2b Stage Finding"
        },
        {
          "id": "NCIT:C48750",
          "label": "pN2 Stage Finding"
        },
        {
          "id": "NCIT:C48700",
          "label": "M1 Stage Finding"
        }
      ]
    }
  ],
  "files": [
    {
      "uri": "file://data/genomes/germline_wgs.vcf.gz",
      "individualToFileIdentifiers": {
        "patient1": "NA12345"
      },
      "fileAttributes": {
        "genomeAssembly": "GRCh38",
        "fileFormat": "vcf",
        "description": "Matched normal germline sample"
      }
    }
  ],
  "metaData": {
    "created": "2021-05-11T15:07:16.662Z",
    "createdBy": "Peter R",
    "submittedBy": "Peter R",
    "resources": [
      {
        "id": "hp",
        "name": "human phenotype ontology",
        "url": "http://purl.obolibrary.org/obo/hp.owl",
        "version": "2019-04-08",
        "namespacePrefix": "HP",
        "iriPrefix": "http://purl.obolibrary.org/obo/HP_"
      },
      {
        "id": "uberon",
        "name": "uber anatomy ontology",
        "url": "http://purl.obolibrary.org/obo/uberon.owl",
        "version": "2019-03-08",
        "namespacePrefix": "UBERON",
        "iriPrefix": "http://purl.obolibrary.org/obo/UBERON_"
      },
      {
        "id": "ncit",
        "name": "NCI Thesaurus OBO Edition",
        "url": "http://purl.obolibrary.org/obo/ncit.owl",
        "version": "18.05d",
        "namespacePrefix": "NCIT",
        "iriPrefix": "http://purl.obolibrary.org/obo/NCIT_"
      },
      {
        "id": "efo",
        "name": "Experimental Factor Ontology",
        "url": "http://www.ebi.ac.uk/efo/efo.owl",
        "version": "2021-05-11",
        "namespacePrefix": "EFO",
        "iriPrefix": "http://www.ebi.ac.uk/efo/EFO_"
      },
      {
        "id": "obi",
        "name": "Ontology for Biomedical Investigations",
        "url": "http://purl.obolibrary.org/obo/obi.owl",
        "version": "2021-05-11",
        "namespacePrefix": "OBI",
        "iriPrefix": "http://purl.obolibrary.org/obo/OBI_"
      }
    ],
    "phenopacketSchemaVersion": "2.0",
    "externalReferences": [
      {
        "id": "PMID:29221636",
        "description": "Urothelial neoplasms in pediatric and young adult patients: A large single-center series"
      }
    ]
  }
}`,
      "covid-19-example": `{
  "id": "covid19-case-P123542",
  "subject": {
    "id": "P123542",
    "sex": "MALE",
    "timeAtLastEncounter": {
      "age": {
        "iso8601duration": "P70Y"
      }
    },
    "vitalStatus": {
      "status": "DECEASED",
      "timeOfDeath": {
        "timestamp": "2020-03-28T00:00:00Z"
      },
      "causeOfDeath": {
        "id": "MONDO:0100096",
        "label": "COVID-19"
      }
    }
  },
  "phenotypicFeatures": [
    {
      "type": {
        "id": "NCIT:C76246",
        "label": "Blood Group A"
      }
    },
    {
      "type": {
        "id": "NCIT:C76251",
        "label": "Rh Positive Blood Group"
      }
    },
    {
      "type": {
        "id": "NCIT:C3038",
        "label": "Fever"
      },
      "onset": {
        "timestamp": "2020-03-17T00:00:00Z"
      }
    },
    {
      "type": {
        "id": "NCIT:C34615",
        "label": "Flank Pain"
      },
      "onset": {
        "timestamp": "2020-03-17T00:00:00Z"
      }
    },
    {
      "type": {
        "id": "NCIT:C3090",
        "label": "Hematuria"
      },
      "onset": {
        "timestamp": "2020-03-17T00:00:00Z"
      }
    },
    {
      "type": {
        "id": "NCIT:C27009",
        "label": "Myalgia"
      },
      "onset": {
        "interval": {
          "start": "2020-03-18T00:00:00Z",
          "end": "2020-03-20T00:00:00Z"
        }
      }
    },
    {
      "type": {
        "id": "NCIT:C2987",
        "label": "Diarrhea"
      },
      "onset": {
        "interval": {
          "start": "2020-03-18T00:00:00Z",
          "end": "2020-03-20T00:00:00Z"
        }
      }
    },
    {
      "type": {
        "id": "NCIT:C2998",
        "label": "Dyspnea"
      },
      "onset": {
        "interval": {
          "start": "2020-03-18T00:00:00Z",
          "end": "2020-03-20T00:00:00Z"
        }
      }
    },
    {
      "type": {
        "id": "NCIT:C27043",
        "label": "Acute Respiratory Failure"
      },
      "onset": {
        "timestamp": "2020-03-20T00:00:00Z"
      }
    }
  ],
  "measurements": [
    {
      "assay": {
        "id": "NCIT:C113237",
        "label": "Absolute Blood Lymphocyte Count"
      },
      "value": {
        "quantity": {
          "unit": {
            "id": "NCIT:C67245",
            "label": "Thousand Cells"
          },
          "value": 1.4,
          "referenceRange": {
            "unit": {
              "id": "NCIT:C67245",
              "label": "Thousand Cells"
            },
            "low": 1.0,
            "high": 4.5
          }
        }
      },
      "timeObserved": {
        "interval": {
          "start": "2019-09-01T00:00:00Z",
          "end": "2020-03-01T00:00:00Z"
        }
      }
    },
    {
      "assay": {
        "id": "NCIT:C113237",
        "label": "Absolute Blood Lymphocyte Count"
      },
      "value": {
        "quantity": {
          "unit": {
            "id": "NCIT:C67245",
            "label": "Thousand Cells"
          },
          "value": 0.7,
          "referenceRange": {
            "unit": {
              "id": "NCIT:C67245",
              "label": "Thousand Cells"
            },
            "low": 1.0,
            "high": 4.5
          }
        }
      },
      "timeObserved": {
        "timestamp": "2020-03-20T00:00:00Z"
      }
    }
  ],
  "diseases": [
    {
      "term": {
        "id": "NCIT:C2985",
        "label": "Diabetes Mellitus"
      },
      "excluded": true
    },
    {
      "term": {
        "id": "NCIT:C34830",
        "label": "Cardiomyopathy"
      }
    },
    {
      "term": {
        "id": "NCIT:C80389",
        "label": "Chronic Kidney Disease, Stage 3"
      }
    },
    {
      "term": {
        "id": "NCIT:C3283",
        "label": "Obesity"
      }
    },
    {
      "term": {
        "id": "MONDO:0100096",
        "label": "COVID-19"
      },
      "onset": {
        "timestamp": "2020-03-17T00:00:00Z"
      }
    }
  ],
  "medicalActions": [
    {
      "procedure": {
        "code": {
          "id": "NCIT:C80473",
          "label": "Left Ventricular Assist Device"
        },
        "performed": {
          "timestamp": "2016-01-01T00:00:00Z"
        }
      }
    },
    {
      "treatment": {
        "agent": {
          "id": "NCIT:C722",
          "label": "Oxygen"
        },
        "doseIntervals": [
          {
            "interval": {
              "start": "2020-03-20T00:00:00Z",
              "end": "2020-03-22T00:00:00Z"
            },
            "quantity": {
              "unit": {
                "id": "NCIT:C67388",
                "label": "Liter per Minute"
              },
              "value": 2.0
            }
          },
          {
            "interval": {
              "start": "2020-03-22T00:00:00Z",
              "end": "2020-03-23T00:00:00Z"
            },
            "quantity": {
              "unit": {
                "id": "NCIT:C67388",
                "label": "Liter per Minute"
              },
              "value": 50.0
            }
          }
        ],
        "routeOfAdministration": {
          "id": "NCIT:C38284",
          "label": "Nasal Route of Administration"
        }
      }
    },
    {
      "treatment": {
        "agent": {
          "id": "NCIT:C557",
          "label": "Hydroxychloroquine"
        },
        "doseIntervals": [
          {
            "interval": {
              "start": "2020-03-20T00:00:00Z",
              "end": "2020-03-20T00:00:00Z"
            },
            "quantity": {
              "unit": {
                "id": "NCIT:C28253",
                "label": "mg"
              },
              "value": 450.0
            },
            "scheduleFrequency": {
              "id": "NCIT:C64496",
              "label": "Twice Daily"
            }
          },
          {
            "interval": {
              "start": "2020-03-21T00:00:00Z",
              "end": "2020-03-22T00:00:00Z"
            },
            "quantity": {
              "unit": {
                "id": "NCIT:C28253",
                "label": "mg"
              },
              "value": 450.0
            },
            "scheduleFrequency": {
              "id": "NCIT:C125004",
              "label": "Once Daily"
            }
          }
        ]
      }
    },
    {
      "procedure": {
        "code": {
          "id": "NCIT:C116648",
          "label": "Tracheal Intubation"
        },
        "performed": {
          "timestamp": "2020-03-22T00:00:00Z"
        }
      }
    },
    {
      "treatment": {
        "agent": {
          "id": "NCIT:C722",
          "label": "Oxygen"
        },
        "doseIntervals": [
          {
            "interval": {
              "start": "2020-03-22T00:00:00Z",
              "end": "2020-03-28T00:00:00Z"
            },
            "quantity": {
              "unit": {
                "id": "NCIT:C91060",
                "label": "Centimeters of Water"
              },
              "value": 14.0
            }
          }
        ],
        "routeOfAdministration": {
          "id": "NCIT:C50254",
          "label": "Positive end Expiratory Pressure Valve Device"
        }
      }
    },
    {
      "treatment": {
        "agent": {
          "id": "NCIT:C84217",
          "label": "Tocilizumab"
        },
        "doseIntervals": [
          {
            "interval": {
              "start": "2020-03-24T00:00:00Z",
              "end": "2020-03-28T00:00:00Z"
            }
          }
        ]
      }
    }
  ],
  "metaData": {
    "resources": [
      {
        "id": "ncit",
        "name": "NCI Thesaurus OBO Edition",
        "url": "http://purl.obolibrary.org/obo/ncit.owl",
        "version": "http://purl.obolibrary.org/obo/ncit/releases/2019-11-26/ncit.owl",
        "namespacePrefix": "NCIT"
      },
      {
        "id": "mondo",
        "name": "Mondo Disease Ontology",
        "url": "http://purl.obolibrary.org/obo/mondo.obo",
        "namespacePrefix": "MONDO"
      },
      {
        "id": "doi",
        "name": "Digital Object Identifier",
        "url": "http://dx.doi.org",
        "namespacePrefix": "DOI"
      },
      {
        "id": "pubmed",
        "name": "PubMed",
        "url": "https://pubmed.ncbi.nlm.nih.gov/",
        "namespacePrefix": "PUBMED"
      }
    ],
    "phenopacketSchemaVersion": "2.0",
    "externalReferences": [
      {
        "id": "DOI:10.1016/j.jaccas.2020.04.001",
        "reference": "PMID:32292915",
        "description": "The Imperfect Cytokine Storm: Severe COVID-19 With ARDS in a Patient on Durable LVAD Support"
      }
    ]
  }
}`,
    };

    if (textToCopy[snippetId]) {
      navigator.clipboard
        .writeText(textToCopy[snippetId])
        .then(() => {
          setCopySuccess((prevState) => ({
            ...prevState,
            [snippetId]: true,
          }));
          setTimeout(() => {
            setCopySuccess((prevState) => ({
              ...prevState,
              [snippetId]: false,
            }));
          }, 1500);
        })
        .catch(console.error);
    }
  };

  return (
    <div className="deploymentContainer">
      <h2 className="user-path">
        <a href="/" className="no-undeline">
          Documentation
        </a>
        <img
          src="arrow-right-light.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/phenopacket-examples" className="no-undeline">
          Tutorials
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/phenopacket-examples" className="no-undeline">
          <span className="user-path-title">Phenopacket Examples</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h1 id="introduction">Introduction</h1>
          <p>
            This section provides a collection of <b>Phenopacket v2 examples</b>{" "}
            representing different clinical and research use cases. The examples
            illustrate how phenotypic, clinical and biosample information can be
            represented using the GA4GH Phenopacket standard, and subsequently
            converted into <b>Beacon Friendly Format (BFF)</b> using the Beacon
            data conversion tools.
          </p>
          <h1 id="rare-disease">Rare Disease</h1>
          <p>
            This example illustrates the representation of phenotypic
            information in a rare disease scenario, including ontology-based
            phenotypic features, age of onset, severity, excluded phenotypes and
            supporting evidence.
          </p>

          <div className="codeSnippet">
            <pre>
              <code>{`{
  "id": "bethlem-myopathy-case-01",
  "subject": {
    "id": "proband-01",
    "timeAtLastEncounter": {
      "age": {
        "iso8601duration": "P14Y"
      }
    },
    "sex": "MALE"
  },
  "phenotypicFeatures": [
    {
      "type": {
        "id": "HP:0001558",
        "label": "Decreased fetal movement"
      },
      "onset": {
        "ontologyClass": {
          "id": "HP:0011461",
          "label": "Fetal onset"
        }
      },
      "evidence": [
        {
          "evidenceCode": {
            "id": "ECO:0000033",
            "label": "author statement supported by traceable reference"
          },
          "reference": {
            "id": "PMID:30808312"
          }
        }
      ]
    },
    {
      "type": {
        "id": "HP:0031910",
        "label": "Abnormal cranial nerve physiology"
      },
      "excluded": true,
      "evidence": [
        {
          "evidenceCode": {
            "id": "ECO:0000033",
            "label": "author statement supported by traceable reference"
          },
          "reference": {
            "id": "PMID:30808312"
          }
        }
      ]
    },
    {
      "type": {
        "id": "HP:0012587",
        "label": "Macroscopic hematuria"
      },
      "modifiers": [
        {
          "id": "HP:0031796",
          "label": "Recurrent"
        }
      ],
      "onset": {
        "age": {
          "iso8601duration": "P14Y"
        }
      },
      "evidence": [
        {
          "evidenceCode": {
            "id": "ECO:0000033",
            "label": "author statement supported by traceable reference"
          },
          "reference": {
            "id": "PMID:30808312"
          }
        }
      ]
    },
    {
      "type": {
        "id": "HP:0001270",
        "label": "Motor delay"
      },
      "severity": {
        "id": "HP:0012825",
        "label": "Mild"
      },
      "onset": {
        "ontologyClass": {
          "id": "HP:0011463",
          "label": "Childhood onset"
        }
      }
    }
  ],
  "metaData": {
    "created": "2026-11-23T00:00:00Z",
    "createdBy": "Phenopacket to Beacon v2 tutorial",
    "resources": [
      {
        "id": "hp",
        "name": "Human Phenotype Ontology",
        "url": "http://purl.obolibrary.org/obo/hp.owl",
        "version": "2018-03-08",
        "namespacePrefix": "HP",
        "iriPrefix": "http://purl.obolibrary.org/obo/HP_"
      },
      {
        "id": "eco",
        "name": "Evidence and Conclusion Ontology",
        "url": "http://purl.obolibrary.org/obo/eco.owl",
        "namespacePrefix": "ECO",
        "iriPrefix": "http://purl.obolibrary.org/obo/ECO_"
      }
    ],
    "phenopacketSchemaVersion": "2.0",
    "externalReferences": [
      {
        "id": "PMID:30808312",
        "description": "Bao M, et al. COL6A1 mutation leading to Bethlem myopathy with recurrent hematuria: a case report. BMC Neurol. 2019;19(1):32."
      }
    ]
  }
}`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("rare-disease-example")}
              >
                {copySuccess["rare-disease-example"] ? (
                  "Copied!"
                ) : (
                  <img
                    className="copySymbol copySymbol-custom"
                    src={copyIcon}
                    alt="Copy"
                  />
                )}
              </button>
            </pre>
          </div>
          <h1 id="cancer">Cancer</h1>
          <p>
            This example illustrates the representation of oncology-related
            data, including multiple biosamples associated with the same
            individual, histological diagnoses, tumour progression, disease
            staging and references to genomic files.
          </p>
          <div className="codeSnippet">
            <pre>
              <code>{`{
  "id": "example case",
  "subject": {
    "id": "patient1",
    "dateOfBirth": "1964-03-15T00:00:00Z",
    "sex": "MALE"
  },
  "phenotypicFeatures": [
    {
      "type": {
        "id": "HP:0000790",
        "label": "Hematuria"
      }
    },
    {
      "type": {
        "id": "HP:0100518",
        "label": "Dysuria"
      },
      "severity": {
        "id": "HP:0012828",
        "label": "Severe"
      }
    }
  ],
  "biosamples": [
    {
      "id": "sample1",
      "individualId": "patient1",
      "sampledTissue": {
        "id": "UBERON:0001256",
        "label": "wall of urinary bladder"
      },
      "sampleType": {
        "id": "OBI:0001479",
        "label": "tissue specimen"
      },
      "materialSample": {
        "id": "EFO:0009655",
        "label": "abnormal sample"
      },
      "timeOfCollection": {
        "age": {
          "iso8601duration": "P52Y2M"
        }
      },
      "histologicalDiagnosis": {
        "id": "NCIT:C39853",
        "label": "Infiltrating Urothelial Carcinoma"
      },
      "tumorProgression": {
        "id": "NCIT:C84509",
        "label": "Primary Malignant Neoplasm"
      },
      "procedure": {
        "code": {
          "id": "NCIT:C5189",
          "label": "Radical Cystoprostatectomy"
        }
      },
      "files": [
        {
          "uri": "file:///data/genomes/urothelial_ca_wgs.vcf.gz",
          "individualToFileIdentifiers": {
            "patient1": "NA12345"
          },
          "fileAttributes": {
            "genomeAssembly": "GRCh38",
            "fileFormat": "vcf",
            "description": "Urothelial carcinoma sample"
          }
        }
      ]
    },
    {
      "id": "sample2",
      "individualId": "patient1",
      "sampledTissue": {
        "id": "UBERON:0002367",
        "label": "prostate gland"
      },
      "sampleType": {
        "id": "OBI:0001479",
        "label": "tissue specimen"
      },
      "materialSample": {
        "id": "EFO:0009655",
        "label": "abnormal sample"
      },
      "timeOfCollection": {
        "age": {
          "iso8601duration": "P52Y2M"
        }
      },
      "histologicalDiagnosis": {
        "id": "NCIT:C5596",
        "label": "Prostate Acinar Adenocarcinoma"
      },
      "tumorProgression": {
        "id": "NCIT:C95606",
        "label": "Second Primary Malignant Neoplasm"
      },
      "tumorGrade": {
        "id": "NCIT:C28091",
        "label": "Gleason Score 7"
      },
      "procedure": {
        "code": {
          "id": "NCIT:C15189",
          "label": "Biopsy"
        }
      }
    },
    {
      "id": "sample3",
      "individualId": "patient1",
      "sampledTissue": {
        "id": "UBERON:0001223",
        "label": "left ureter"
      },
      "sampleType": {
        "id": "OBI:0001479",
        "label": "tissue specimen"
      },
      "materialSample": {
        "id": "EFO:0009654",
        "label": "reference sample"
      },
      "timeOfCollection": {
        "age": {
          "iso8601duration": "P52Y2M"
        }
      },
      "histologicalDiagnosis": {
        "id": "NCIT:C38757",
        "label": "Negative Finding"
      },
      "procedure": {
        "code": {
          "id": "NCIT:C15189",
          "label": "Biopsy"
        }
      }
    },
    {
      "id": "sample4",
      "individualId": "patient1",
      "sampledTissue": {
        "id": "UBERON:0001222",
        "label": "right ureter"
      },
      "sampleType": {
        "id": "OBI:0001479",
        "label": "tissue specimen"
      },
      "materialSample": {
        "id": "EFO:0009654",
        "label": "reference sample"
      },
      "timeOfCollection": {
        "age": {
          "iso8601duration": "P52Y2M"
        }
      },
      "histologicalDiagnosis": {
        "id": "NCIT:C38757",
        "label": "Negative Finding"
      }
    },
    {
      "id": "sample5",
      "individualId": "patient1",
      "sampledTissue": {
        "id": "UBERON:0015876",
        "label": "pelvic lymph node"
      },
      "sampleType": {
        "id": "OBI:0001479",
        "label": "tissue specimen"
      },
      "materialSample": {
        "id": "EFO:0009655",
        "label": "abnormal sample"
      },
      "timeOfCollection": {
        "age": {
          "iso8601duration": "P52Y2M"
        }
      },
      "tumorProgression": {
        "id": "NCIT:C3261",
        "label": "Metastatic Neoplasm"
      },
      "procedure": {
        "code": {
          "id": "NCIT:C15189",
          "label": "Biopsy"
        }
      },
      "files": [
        {
          "uri": "file://data/genomes/metastasis_wgs.vcf.gz",
          "individualToFileIdentifiers": {
            "sample5": "BS730275"
          },
          "fileAttributes": {
            "genomeAssembly": "GRCh38",
            "fileFormat": "vcf",
            "description": "lymph node metastasis sample"
          }
        }
      ]
    }
  ],
  "diseases": [
    {
      "term": {
        "id": "NCIT:C39853",
        "label": "Infiltrating Urothelial Carcinoma"
      },
      "diseaseStage": [
        {
          "id": "NCIT:C27971",
          "label": "Stage IV"
        }
      ],
      "clinicalTnmFinding": [
        {
          "id": "NCIT:C48766",
          "label": "pT2b Stage Finding"
        },
        {
          "id": "NCIT:C48750",
          "label": "pN2 Stage Finding"
        },
        {
          "id": "NCIT:C48700",
          "label": "M1 Stage Finding"
        }
      ]
    }
  ],
  "files": [
    {
      "uri": "file://data/genomes/germline_wgs.vcf.gz",
      "individualToFileIdentifiers": {
        "patient1": "NA12345"
      },
      "fileAttributes": {
        "genomeAssembly": "GRCh38",
        "fileFormat": "vcf",
        "description": "Matched normal germline sample"
      }
    }
  ],
  "metaData": {
    "created": "2021-05-11T15:07:16.662Z",
    "createdBy": "Peter R",
    "submittedBy": "Peter R",
    "resources": [
      {
        "id": "hp",
        "name": "human phenotype ontology",
        "url": "http://purl.obolibrary.org/obo/hp.owl",
        "version": "2019-04-08",
        "namespacePrefix": "HP",
        "iriPrefix": "http://purl.obolibrary.org/obo/HP_"
      },
      {
        "id": "uberon",
        "name": "uber anatomy ontology",
        "url": "http://purl.obolibrary.org/obo/uberon.owl",
        "version": "2019-03-08",
        "namespacePrefix": "UBERON",
        "iriPrefix": "http://purl.obolibrary.org/obo/UBERON_"
      },
      {
        "id": "ncit",
        "name": "NCI Thesaurus OBO Edition",
        "url": "http://purl.obolibrary.org/obo/ncit.owl",
        "version": "18.05d",
        "namespacePrefix": "NCIT",
        "iriPrefix": "http://purl.obolibrary.org/obo/NCIT_"
      },
      {
        "id": "efo",
        "name": "Experimental Factor Ontology",
        "url": "http://www.ebi.ac.uk/efo/efo.owl",
        "version": "2021-05-11",
        "namespacePrefix": "EFO",
        "iriPrefix": "http://www.ebi.ac.uk/efo/EFO_"
      },
      {
        "id": "obi",
        "name": "Ontology for Biomedical Investigations",
        "url": "http://purl.obolibrary.org/obo/obi.owl",
        "version": "2021-05-11",
        "namespacePrefix": "OBI",
        "iriPrefix": "http://purl.obolibrary.org/obo/OBI_"
      }
    ],
    "phenopacketSchemaVersion": "2.0",
    "externalReferences": [
      {
        "id": "PMID:29221636",
        "description": "Urothelial neoplasms in pediatric and young adult patients: A large single-center series"
      }
    ]
  }
}`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("cancer-example")}
              >
                {copySuccess["cancer-example"] ? (
                  "Copied!"
                ) : (
                  <img
                    className="copySymbol copySymbol-custom"
                    src={copyIcon}
                    alt="Copy"
                  />
                )}
              </button>
            </pre>
          </div>
          <h1 id="COVID-19">COVID-19</h1>
          <p>
            This example illustrates the representation of longitudinal clinical
            information in an infectious disease scenario, including symptom
            onset, clinical measurements, pre-existing conditions, medical
            procedures, treatments and vital status.
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`{
  "id": "covid19-case-P123542",
  "subject": {
    "id": "P123542",
    "sex": "MALE",
    "timeAtLastEncounter": {
      "age": {
        "iso8601duration": "P70Y"
      }
    },
    "vitalStatus": {
      "status": "DECEASED",
      "timeOfDeath": {
        "timestamp": "2020-03-28T00:00:00Z"
      },
      "causeOfDeath": {
        "id": "MONDO:0100096",
        "label": "COVID-19"
      }
    }
  },
  "phenotypicFeatures": [
    {
      "type": {
        "id": "NCIT:C76246",
        "label": "Blood Group A"
      }
    },
    {
      "type": {
        "id": "NCIT:C76251",
        "label": "Rh Positive Blood Group"
      }
    },
    {
      "type": {
        "id": "NCIT:C3038",
        "label": "Fever"
      },
      "onset": {
        "timestamp": "2020-03-17T00:00:00Z"
      }
    },
    {
      "type": {
        "id": "NCIT:C34615",
        "label": "Flank Pain"
      },
      "onset": {
        "timestamp": "2020-03-17T00:00:00Z"
      }
    },
    {
      "type": {
        "id": "NCIT:C3090",
        "label": "Hematuria"
      },
      "onset": {
        "timestamp": "2020-03-17T00:00:00Z"
      }
    },
    {
      "type": {
        "id": "NCIT:C27009",
        "label": "Myalgia"
      },
      "onset": {
        "interval": {
          "start": "2020-03-18T00:00:00Z",
          "end": "2020-03-20T00:00:00Z"
        }
      }
    },
    {
      "type": {
        "id": "NCIT:C2987",
        "label": "Diarrhea"
      },
      "onset": {
        "interval": {
          "start": "2020-03-18T00:00:00Z",
          "end": "2020-03-20T00:00:00Z"
        }
      }
    },
    {
      "type": {
        "id": "NCIT:C2998",
        "label": "Dyspnea"
      },
      "onset": {
        "interval": {
          "start": "2020-03-18T00:00:00Z",
          "end": "2020-03-20T00:00:00Z"
        }
      }
    },
    {
      "type": {
        "id": "NCIT:C27043",
        "label": "Acute Respiratory Failure"
      },
      "onset": {
        "timestamp": "2020-03-20T00:00:00Z"
      }
    }
  ],
  "measurements": [
    {
      "assay": {
        "id": "NCIT:C113237",
        "label": "Absolute Blood Lymphocyte Count"
      },
      "value": {
        "quantity": {
          "unit": {
            "id": "NCIT:C67245",
            "label": "Thousand Cells"
          },
          "value": 1.4,
          "referenceRange": {
            "unit": {
              "id": "NCIT:C67245",
              "label": "Thousand Cells"
            },
            "low": 1.0,
            "high": 4.5
          }
        }
      },
      "timeObserved": {
        "interval": {
          "start": "2019-09-01T00:00:00Z",
          "end": "2020-03-01T00:00:00Z"
        }
      }
    },
    {
      "assay": {
        "id": "NCIT:C113237",
        "label": "Absolute Blood Lymphocyte Count"
      },
      "value": {
        "quantity": {
          "unit": {
            "id": "NCIT:C67245",
            "label": "Thousand Cells"
          },
          "value": 0.7,
          "referenceRange": {
            "unit": {
              "id": "NCIT:C67245",
              "label": "Thousand Cells"
            },
            "low": 1.0,
            "high": 4.5
          }
        }
      },
      "timeObserved": {
        "timestamp": "2020-03-20T00:00:00Z"
      }
    }
  ],
  "diseases": [
    {
      "term": {
        "id": "NCIT:C2985",
        "label": "Diabetes Mellitus"
      },
      "excluded": true
    },
    {
      "term": {
        "id": "NCIT:C34830",
        "label": "Cardiomyopathy"
      }
    },
    {
      "term": {
        "id": "NCIT:C80389",
        "label": "Chronic Kidney Disease, Stage 3"
      }
    },
    {
      "term": {
        "id": "NCIT:C3283",
        "label": "Obesity"
      }
    },
    {
      "term": {
        "id": "MONDO:0100096",
        "label": "COVID-19"
      },
      "onset": {
        "timestamp": "2020-03-17T00:00:00Z"
      }
    }
  ],
  "medicalActions": [
    {
      "procedure": {
        "code": {
          "id": "NCIT:C80473",
          "label": "Left Ventricular Assist Device"
        },
        "performed": {
          "timestamp": "2016-01-01T00:00:00Z"
        }
      }
    },
    {
      "treatment": {
        "agent": {
          "id": "NCIT:C722",
          "label": "Oxygen"
        },
        "doseIntervals": [
          {
            "interval": {
              "start": "2020-03-20T00:00:00Z",
              "end": "2020-03-22T00:00:00Z"
            },
            "quantity": {
              "unit": {
                "id": "NCIT:C67388",
                "label": "Liter per Minute"
              },
              "value": 2.0
            }
          },
          {
            "interval": {
              "start": "2020-03-22T00:00:00Z",
              "end": "2020-03-23T00:00:00Z"
            },
            "quantity": {
              "unit": {
                "id": "NCIT:C67388",
                "label": "Liter per Minute"
              },
              "value": 50.0
            }
          }
        ],
        "routeOfAdministration": {
          "id": "NCIT:C38284",
          "label": "Nasal Route of Administration"
        }
      }
    },
    {
      "treatment": {
        "agent": {
          "id": "NCIT:C557",
          "label": "Hydroxychloroquine"
        },
        "doseIntervals": [
          {
            "interval": {
              "start": "2020-03-20T00:00:00Z",
              "end": "2020-03-20T00:00:00Z"
            },
            "quantity": {
              "unit": {
                "id": "NCIT:C28253",
                "label": "mg"
              },
              "value": 450.0
            },
            "scheduleFrequency": {
              "id": "NCIT:C64496",
              "label": "Twice Daily"
            }
          },
          {
            "interval": {
              "start": "2020-03-21T00:00:00Z",
              "end": "2020-03-22T00:00:00Z"
            },
            "quantity": {
              "unit": {
                "id": "NCIT:C28253",
                "label": "mg"
              },
              "value": 450.0
            },
            "scheduleFrequency": {
              "id": "NCIT:C125004",
              "label": "Once Daily"
            }
          }
        ]
      }
    },
    {
      "procedure": {
        "code": {
          "id": "NCIT:C116648",
          "label": "Tracheal Intubation"
        },
        "performed": {
          "timestamp": "2020-03-22T00:00:00Z"
        }
      }
    },
    {
      "treatment": {
        "agent": {
          "id": "NCIT:C722",
          "label": "Oxygen"
        },
        "doseIntervals": [
          {
            "interval": {
              "start": "2020-03-22T00:00:00Z",
              "end": "2020-03-28T00:00:00Z"
            },
            "quantity": {
              "unit": {
                "id": "NCIT:C91060",
                "label": "Centimeters of Water"
              },
              "value": 14.0
            }
          }
        ],
        "routeOfAdministration": {
          "id": "NCIT:C50254",
          "label": "Positive end Expiratory Pressure Valve Device"
        }
      }
    },
    {
      "treatment": {
        "agent": {
          "id": "NCIT:C84217",
          "label": "Tocilizumab"
        },
        "doseIntervals": [
          {
            "interval": {
              "start": "2020-03-24T00:00:00Z",
              "end": "2020-03-28T00:00:00Z"
            }
          }
        ]
      }
    }
  ],
  "metaData": {
    "resources": [
      {
        "id": "ncit",
        "name": "NCI Thesaurus OBO Edition",
        "url": "http://purl.obolibrary.org/obo/ncit.owl",
        "version": "http://purl.obolibrary.org/obo/ncit/releases/2019-11-26/ncit.owl",
        "namespacePrefix": "NCIT"
      },
      {
        "id": "mondo",
        "name": "Mondo Disease Ontology",
        "url": "http://purl.obolibrary.org/obo/mondo.obo",
        "namespacePrefix": "MONDO"
      },
      {
        "id": "doi",
        "name": "Digital Object Identifier",
        "url": "http://dx.doi.org",
        "namespacePrefix": "DOI"
      },
      {
        "id": "pubmed",
        "name": "PubMed",
        "url": "https://pubmed.ncbi.nlm.nih.gov/",
        "namespacePrefix": "PUBMED"
      }
    ],
    "phenopacketSchemaVersion": "2.0",
    "externalReferences": [
      {
        "id": "DOI:10.1016/j.jaccas.2020.04.001",
        "reference": "PMID:32292915",
        "description": "The Imperfect Cytokine Storm: Severe COVID-19 With ARDS in a Patient on Durable LVAD Support"
      }
    ]
  }
}`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("covid-19-example")}
              >
                {copySuccess["covid-19-example"] ? (
                  "Copied!"
                ) : (
                  <img
                    className="copySymbol copySymbol-custom"
                    src={copyIcon}
                    alt="Copy"
                  />
                )}
              </button>
            </pre>
          </div>
          <h1 id="conversion-to-beacon-friendly-format">
            Conversion to Beacon Friendly Format (BFF)
          </h1>
          <p>
            The Phenopacket examples provided above can be used as input for the{" "}
            <b>Phenopacket-to-BFF conversion workflow</b>, subject to schema
            validation and converter compatibility.
            <br />
            The conversion tool supports the generation of Beacon v2{" "}
            <b>Individual and Biosample records</b>, depending on the
            information available in the input Phenopacket.
            <br />
            For detailed conversion instructions, refer to the{" "}
            <a
              href="https://github.com/EGA-archive/beacon2-ri-tools-v2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beacon RI Tools v2 documentation
            </a>
            .
            <br />
            For a complete example of data conversion, ingestion and deployment,
            visit the{" "}
            <a href="/example-beacon:-rare-disease-use-case">
              Example Beacon: Rare Disease Use Case
            </a>{" "}
            tutorial.
          </p>

          <br></br>
          <br></br>
        </div>
        <div className="sidebarColumn">
          <OnThisPage root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default PhenopacketExamples;
