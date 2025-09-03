import "./ConfigFileTools.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface ConfigFileToolsProps {
  searchTerm: string;
}

const ConfigFileTools: React.FC<ConfigFileToolsProps> = ({ searchTerm }) => {
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
        <a href="/configuration-file" className="no-undeline">
          Beacon RI Tools v2
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/configuration-file" className="no-undeline">
          <span className="user-path-title">Configuration File</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon RI Tools v2</h3>
          <h1>Configuration File</h1>
          <p>
            In order to use Beacon RI Tools v2 one needs to modify a
            configuration file with the desired files and options for the
            different collections.
          </p>
          <p>
            You will find conf.py inside the{" "}
            <a
              href="https://github.com/EGA-archive/beacon-data-tools/tree/main/conf"
              target="_blank"
              rel="noopener noreferrer"
            >
              conf directory
            </a>
            . Inside this file, you will find the following information:
          </p>

          <h2 id="input-output-files-config">
            Input and Output files config parameters
          </h2>
          <div className="codeSnippet">
            <pre>
              <code id="input-output-config">
                csv_filename='csv/examples/cohorts.csv'
                output_docs_folder='output_docs/CINECA_dataset/'
              </code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText = document.getElementById(
                    "input-output-config"
                  )?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "input-output-config");
                  }
                }}
              >
                {copySuccess["input-output-config"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <h2 id="generic-config-parameters">Generic config parameters</h2>
          <p>
            The first part of this configuration only concerns the conversion of
            CSV to BFF. It is used only when you are converting from CSV.
          </p>
          <p>
            The <i>csv_filename</i> variable sets where the CSV file is and from
            where the script will read the data. Bear in mind that the CSV must
            be inside the folder <i>csv</i>, and you can use subfolders within
            it. This CSV file needs to have the headers written as you can find
            in the files inside{" "}
            <a
              href="https://github.com/EGA-archive/beacon-data-tools/tree/main/csv/templates"
              target="_blank"
              rel="noopener noreferrer"
            >
              templates
            </a>
            . Note that any header that has a different name from the ones that
            appear inside the templates will not be read by the Beacon Data
            Tools.
          </p>
          <p>
            The <i>output_docs_folder</i> sets the folder where your final BFF
            (JSON files) will be saved once execution of beacon tools finishes.
            This folder is mandatory to be always inside <i>output_docs</i>, so
            only the subdirectory inside <i>output_docs</i>
            can be modified in this path.
          </p>

          <h2 id="VCF-conversion-config-parameters">
            VCF conversion config parameters
          </h2>

          <div className="codeSnippet">
            <pre>
              <code id="vcf-config">
                allele_counts=False
                <br />
                reference_genome='GRCh37' # Choose one between NCBI36, GRCh37,
                GRCh38
                <br />
                datasetId='COVID_pop11_fin_2'
                <br />
                case_level_data=False
                <br />
                exact_heterozygosity=False
                <br />
                num_rows=15000000
                <br />
                verbosity=False
              </code>
              <button
                className="copyButtonCode"
                onClick={() => {
                  const codeText =
                    document.getElementById("vcf-config")?.innerText;
                  if (codeText) {
                    copyToClipboard(codeText, "vcf-config");
                  }
                }}
              >
                {copySuccess["vcf-config"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            The second part of the configuration file pertains to the VCF to BFF
            conversion. This only needs to be used in case you are using a VCF
            as a source for the genomic variants collection.
          </p>

          <p>
            The <i>num_variants</i> is the variable you need to write in case
            you are executing the VCF conversion{" "}
            <i>(genomicVariations_vcf.py)</i>. This will tell the script how
            many variants will be read and converted from the file(s).
          </p>

          <p>
            The <i>allele_frequency</i> field lets you set a threshold for the
            allele frequency (AF) of the variants you want to convert from the
            VCF file. If you set it at 0.5, all the variants with 0.5 or less AF
            will be converted to BFF. 1 is the default value (all variants will
            be converted).
          </p>

          <p>
            The <i>allele_counts</i> now is not implemented yet, just leave it
            as False.
          </p>
          <p>
            The <i>reference_genome</i> is the reference genome the tool will
            use to map the position of the chromosomes. Make sure to select the
            same version as the one used to generate your data.
          </p>

          <p>
            The <i>datasetId</i>, <i>case_level_data</i>, and{" "}
            <i>exact_zygosity</i> parameters are <b>only</b> applicable in the{" "}
            <b>Beacon Production Implementation environment</b>.
          </p>
          <p>
            The <i>datasetId</i> needs to match the id of your datasets.csv or
            datasets.json file. This will add a datasetId field in every record
            to match the record with the dataset it belongs to.
          </p>
          <p>
            When converting a VCF file to BFF, you can use two optional boolean
            parameters to include sample-level information about each variant:{" "}
            <i>case_level_data</i> and <i>exact_zygosity</i>.
          </p>
          <p>
            <i>case_level_data</i> will link variants to biosamples. If set to
            True, this option enables mapping each variant to the specific
            biosamples (i.e., samples) that carry it. This allows downstream
            queries to return more granular, sample-level results instead of
            just listing variants in general.
          </p>
          <p className="wider-note">
            <img
              className="note-symbol-wider"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Important: For this mapping to work correctly, you must:
              <ul>
                <li>Have genotype (GT) information available in the VCF. </li>
                <li>Provide a valid biosamples schema in your BFF files.</li>
              </ul>
            </div>
          </p>
          <p>
            Be sure to read the Case-level{" "}
            <a href="conversion-from-vcf-to-bff#case-level-data-conversion">
              data conversion section
            </a>{" "}
            for detailed guidance on setting this up.
          </p>
          <p>
            <i>exact_zygosity </i>will refine biosample classification. If set
            to True This parameter classifies each biosample based on its
            genotype:
            <ul>
              <li>Homozygous for the reference allele</li>
              <li>Heterozygous</li>
              <li>Homozygous for the alternate allele</li>
            </ul>
            This adds precision to your data and can help users interpret
            zygosity in their queries.
          </p>
          <p className="note">
            <img
              className="note-symbol-wider"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              If <i>case_level_data</i> is set to False, make sure to also set
              <i>exact_zygosity </i>to False — it won’t have any effect
              otherwise.
            </div>
          </p>
          <p>
            The <i>num_rows</i>  are the aproximate calculation you expect for
            the total of variants in each vcf there are. Make sure this is
            greater than the total variants expected. It was automatically
            calculated before but it was very slow sometimes to calculate all
            the variants number in a VCF.
          </p>
          <p>
            The <i>verbosity</i> will give streaming logs with the reason why a
            variant has been skipped to be inserted. Recommendation is to leave
            this as False.
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

export default ConfigFileTools;
