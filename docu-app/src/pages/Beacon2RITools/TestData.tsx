import "./ConfigFileTools.css";
import model from "../../assets/medal.svg";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface TestDataProps {
  searchTerm: string;
}

const TestData: React.FC<TestDataProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const { activeId } = useDocScrollSpy(contentRef);
  useHighlightAndScroll(contentRef, searchTerm);

  const copyToClipboard = (text: string, snippetId: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess((prev) => ({ ...prev, [snippetId]: true }));
        setTimeout(() => {
          setCopySuccess((prev) => ({ ...prev, [snippetId]: false }));
        }, 1500);
      })
      .catch((error) => console.error("Failed to copy text: ", error));
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
        <a href="/test-data" className="no-undeline">
          Beacon RI Tools v2
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/test-data" className="no-undeline">
          <span className="user-path-title">Test Data</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon RI Tools v2</h3>
          <h1>Test Data</h1>
          <p>
            This section contains test datasets you can use to explore and
            validate the functionalities of the Beacon v2 Implementation.
          </p>
          <h1 id="dataset-1-cineca-synthetic-cohort-europe-uk1">
            Dataset 1: CINECA Synthetic Cohort EUROPE UK1
          </h1>
          <ul>
            <li>
              <strong>Dataset name: </strong>
              CINECA_synthetic_cohort_EUROPE_UK1
            </li>
            <li>
              <strong>Origin: </strong>
              Derived from{" "}
              <a
                href="https://ega-archive.org/datasets/EGAD00001006673"
                target="_blank"
                rel="noopener noreferrer"
              >
                EGAD00001006673
              </a>{" "}
              (EGA) and a{" "}
              <a
                href="https://github.com/EGA-archive/beacon2-ri-tools/blob/main/CINECA_synthetic_cohort_EUROPE_UK1/uk1.tsv"
                target="_blank"
                rel="noopener noreferrer"
              >
                raw file
              </a>{" "}
              with phenoclinic data kindly donated to us from our CINECA-EU
              partners.
            </li>
            <li>
              <strong>Study size: </strong>
              2504 samples with genetic data (low coverage WGS) based on 1000
              Genomes data (phase3 and Geuvadis), and 76 synthetic subject
              attributes and phenotypic data derived from UKBiobank.
            </li>
          </ul>
          <p className="wider-note cite-box">
            <img className="note-symbol-wider" src={model} alt="Note symbol" />
            <div>
              In support of FAIRness in data sharing, this dataset is made
              freely available under the Creative Commons Licence (CC-BY).
              Please ensure this preamble is included with this dataset and that
              the CINECA project (funding: EC H2020 grant 825775) is
              acknowledged.
            </div>
          </p>
          <h6 className="underline">Included files</h6>
          <table className="dockerTableSimple dockerTableLong">
            <thead>
              <tr>
                <th>
                  <b>File/Folder</b>
                </th>
                <th>
                  <b>Description</b>
                </th>
                <th>
                  <b>Where to find</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>uk1.tsv</td>
                <td>
                  Raw metadata and phenotypic data for 2,504 synthetic
                  individuals
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/blob/main/csv/examples/CINECA_synthetic_cohort_EUROPE_UK1/uk1.tsv"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    uk1.tsv
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  chr22.Test.1000G.phas<br></br>e3.joint.vcf.gz
                </td>
                <td>
                  VCF file consisting of WGS for chr22 – input used for
                  genomicVariations
                </td>
                <td>
                  $ wget ftp://<br></br>
                  FTPuser:FTPusersPassword@xfer13<br></br>
                  .crg.eu:221/external_files/<br></br>
                  CINECA_synthetic_cohort_EUROPE_<br></br>
                  UK1/vcf/<br></br>chr22.Test.1000G.phase3.joint.vcf<br></br>.gz
                </td>
              </tr>
              <tr>
                <td>CSV models</td>
                <td>
                  CSV filled in with the data and metadata from the dataset
                  files, ready to convert to Beacon Friendly Format (BFF)
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/csv/examples/CINECA_synthetic_cohort_EUROPE_UK1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Input folder
                  </a>
                </td>
              </tr>
              <tr>
                <td>BFF output</td>
                <td>
                  Output BFF files obtained by converting the CSV models using
                  the beacon2 ri tools v2
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/output_docs/CINECA_synthetic_cohort_EUROPE_UK1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CINECA_synthetic_cohort_EUROPE_<br></br>UK1
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              <p className="note-paragraph">
                 If you want to download the full original dataset metadata
                please follow the{" "}
                <a href="https://ega-archive.org/access/download/files/live-outbox/">
                  Live Distribution
                </a>{" "}
                or the{" "}
                <a href="https://ega-archive.org/access/download/files/pyega3/">
                  pyEGA3
                </a>{" "}
                instructions. Notice that these datasets are free access.
              </p>
            </div>
          </p>
          <h1 id="dataset-2-rare-disease-synthetic-dataset">
            Dataset 2: Rare Disease Synthetic Dataset
          </h1>
          <ul>
            <li>
              <b>Dataset name:</b> Rare Disease Synthetic Dataset
            </li>
            <li>
              <b>Origin:</b> Derived from{" "}
              <a
                href="https://ega-archive.org/datasets/EGAD00001008392"
                target="_blank"
                rel="noopener noreferrer"
              >
                EGAD00001008392
              </a>{" "}
              (EGA).
            </li>
            <li>
              <b>Study size:</b> 18 whole genome samples (6 index cases with
              their parents) created with public human genomic background
              combined with in-silico insertion of real disease-causing
              variants.
            </li>
          </ul>
          <p className="wider-note cite-box">
            <img className="note-symbol-wider" src={model} alt="Note symbol" />
            <div>
              When using this dataset, please acknowledge the following
              contributors and funding sources: the RD-Connect GPAP
              (https://platform.rd-connect.eu/), EC H2020 project EJP-RD (grant
              # 825575), EC H2020 project B1MG (grant # 951724) and Generalitat
              de Catalunya VEIS project (grant # 001-P-001647).
            </div>
          </p>

          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>File/Folder</b>
                </th>
                <th>
                  <b>Description</b>
                </th>
                <th>
                  <b>Where to find</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/datasets/EGAD00001008392"
                    target="_blank"
                  >
                    EGAD00001008392
                  </a>
                </td>
                <td>Rare Disease Synthetic Dataset</td>
                <td>
                  See Use Case: Inserting Rare Disease Synthetic Dataset into a
                  beacon →{" "}
                  <a href="https://beacon-documentation-demo.ega-archive.org/example-beacon:-rare-disease-use-case#dataset-model-creation%C2%A0">
                    {" "}
                    Dataset model creation section
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/samples/EGAN00003364605"
                    target="_blank"
                  >
                    EGAN00003364605
                  </a>
                </td>
                <td>case1_index – Male sample with Central core disease.</td>
                <td>
                  See Use Case: Inserting Rare Disease Synthetic Dataset into a
                  beacon →{" "}
                  <a href="https://beacon-documentation-demo.ega-archive.org/example-beacon:-rare-disease-use-case#dataset-model-creation%C2%A0">
                    {" "}
                    Dataset model creation section
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/runs/EGAR00003021166"
                    target="_blank"
                  >
                    EGAR00003021166
                  </a>
                </td>
                <td>case1_index fastq</td>
                <td>
                  See Use Case: Inserting Rare Disease Synthetic Dataset into a
                  beacon →{" "}
                  <a href="https://beacon-documentation-demo.ega-archive.org/example-beacon:-rare-disease-use-case#run-model-creation">
                    Run model from VCF section
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/analyses/EGAZ00001744017"
                    target="_blank"
                  >
                    EGAZ00001744017
                  </a>
                </td>
                <td>Information about the creation of the chromosome 21 VCF</td>
                <td>
                  See Use Case: Inserting Rare Disease Synthetic Dataset into a
                  beacon →{" "}
                  <a href="https://beacon-documentation-demo.ega-archive.org/example-beacon:-rare-disease-use-case#Analysis-model-creation">
                    Analysis model creation section
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/analyses/EGAZ00001744003"
                    target="_blank"
                  >
                    EGAZ00001744003
                  </a>
                </td>
                <td>
                  Phenopacket with individual information from case1_index
                  sample
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/phenopackets-to-BFF/rare-disease"
                    target="_blank"
                  >
                    phenopacket
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/files/EGAF00005572743"
                    target="_blank"
                  >
                    EGAF00005572743
                  </a>
                </td>
                <td>
                  5 variants subset of the chromosome 21 VCF from case1_index
                </td>
                <td>
                  See Use Case: Inserting Rare Disease Synthetic Dataset into a
                  beacon →{" "}
                  <a href="https://beacon-documentation-demo.ega-archive.org/example-beacon:-rare-disease-use-case#genomicVariations-model-from-VCF">
                    genomicVariations model from VCF creation section
                  </a>
                </td>
              </tr>
              <tr>
                <td>Rare disease use case folder</td>
                <td>
                  Folder with the CSVs for dataset and run creation, phenopacket
                  for individuals model and the subset VCF for
                  genomicVariations.
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/csv/examples/Rare-diseases"
                    target="_blank"
                  >
                    Input folder
                  </a>
                </td>
              </tr>
              <tr>
                <td>Rare disease use case output folder</td>
                <td>
                  Output BFF files obtained by converting the CSV models,
                  phenopacket and VCF using the beacon2 ri tools v2
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/output_docs/Rare-diseases"
                    target="_blank"
                  >
                    Output folder
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              <p className="note-paragraph">
                 If you want to download the full original dataset metadata
                please follow the{" "}
                <a href="https://ega-archive.org/access/download/files/live-outbox/">
                  Live Distribution
                </a>{" "}
                or the{" "}
                <a href="https://ega-archive.org/access/download/files/pyega3/">
                  pyEGA3
                </a>{" "}
                instructions. Notice that these datasets are free access.
              </p>
            </div>
          </p>

          <h1 id="dataset-3-example-csv-all-fields">
            Dataset 3: Example CSV with all the fields filled in
          </h1>
          <ul>
            <li>
              <b>Dataset name:</b> Dataset with synthetic data for beacon
              testing
            </li>
            <li>
              <b>Origin:</b> All the metadata inserted is synthetic.
            </li>
            <li>
              <b>Study size:</b> 20 female samples with breast carcinoma.
            </li>
          </ul>
          <h6 className="underline">Included files</h6>
          <table className="dockerTableSimple dockerTableLong">
            <thead>
              <tr>
                <th>
                  <b>File/Folder</b>
                </th>
                <th>
                  <b>Description</b>
                </th>
                <th>
                  <b>Where to find</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CSV folder</td>
                <td>
                  Example CSVs with all the possible fields filled in for
                  analysis, datasets, cohorts, individuals, runs and biosamples
                  model.
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/csv/examples/all-fields"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Input folder
                  </a>
                </td>
              </tr>
              <tr>
                <td>BFF output</td>
                <td>
                  Folder with the BFFs obtained by converting the VCF and the
                  CSV using beacon2-ri-tools-v2
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/output_docs/all-fields"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Output folder
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <h1 id="dataset-4-example-csv-mandatory-fields">
            Dataset 4: Example CSV with only the mandatory fields filled in
          </h1>

          <h6 className="underline">Included files</h6>
          <table className="dockerTableSimple dockerTableLong">
            <thead>
              <tr>
                <th>
                  <b>File/Folder</b>
                </th>
                <th>
                  <b>Description</b>
                </th>
                <th>
                  <b>Where to find</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CSV folder</td>
                <td>
                  Example CSVs with all the possible fields filled in for
                  analysis, datasets, cohorts, individuals, runs and biosamples
                  model.
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/csv/examples/mandatory-fields"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Input folder
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <h1 id="dataset-5-genomicvariations-csvs">
            Dataset 5: genomicVariations CSVs
          </h1>
          <p>
            You can load genomicVariations data into Beacon using either a VCF
            file or a CSV. Here you’ll find two genomicVariations CSVs examples,
            one representing variants with caseLevelData information and the
            second one with variantLevelData.
            <ul>
              <li>
                <b>caseLevelData:</b> Describes which biosamples carry which
                variants. This is sample-level information based on individual
                analyses.
              </li>
              <li>
                <b>variantLevelData:</b> Describes the variants themselves,
                without linking them to specific individuals. This is
                aggregate-level information, such as genomic position, alleles,
                frequency or phenotype associated.
              </li>
            </ul>
          </p>
          <h6 className="underline">Included files</h6>
          <table className="dockerTableSimple dockerTableLong">
            <thead>
              <tr>
                <th>
                  <b>File/Folder</b>
                </th>
                <th>
                  <b>Description</b>
                </th>
                <th>
                  <b>Where to find</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>caseLevelData folder</td>
                <td>
                  genomicVariations CSV with the mandatory fields of the model
                  and the caseLevelData properties.
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/csv/examples/genomicVariations/caseLevelData"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    caseLevelData
                  </a>
                </td>
              </tr>
              <tr>
                <td>variantLevelData folder</td>
                <td>
                  genomicVariations CSV with the mandatory fields of the model
                  and the variantLevelData properties.
                </td>
                <td>
                  <a
                    href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/csv/examples/genomicVariations/variantLevelData"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    variantLevelData
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              <p className="note-paragraph">
                Note: You can include either or both blocks in your Beacon
                instance. Combining both gives you a richer model that supports
                individual-level queries and population-level insights.
              </p>
            </div>
          </p>

          <br></br>
          <br></br>
        </div>
        <div className="sidebarColumn">
          <OnThisPage activeId={activeId} root={contentRef.current} />
        </div>
      </div>
    </div>
  );
};

export default TestData;
