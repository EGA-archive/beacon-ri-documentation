import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";

interface ConversionVCFBFFProps {
  searchTerm: string;
}

const ConversionVCFBFF: React.FC<ConversionVCFBFFProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useHighlightAndScroll(contentRef, searchTerm);

  const copyToClipboard = (snippetId: string, textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopySuccess((prevState) => ({
          ...prevState,
          [snippetId]: true,
        }));
        setTimeout(
          () =>
            setCopySuccess((prevState) => ({
              ...prevState,
              [snippetId]: false,
            })),
          1500
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="conversionContainer">
      <h2 className="user-path">
        <a href="/" className="no-undeline">
          Documentation
        </a>
        <img
          src="arrow-right-light.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/conversion-from-vcf-to-bff" className="no-undeline">
          Beacon RI Tools v2
        </a>

        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a href="/conversion-from-vcf-to-bff" className="no-undeline">
          <span className="user-path-title">Conversion from VCF to BFF</span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3>Beacon RI Tools v2</h3>
          <h1>Conversion from VCF to BFF</h1>
          <h2 id="reading-VCF">Reading your VCF</h2>
          <p>
            Beacon RI Tools v2 will read the different columns for your variants
            in the VCF and place them inside the Legacy Variation schema for the
            Beacon v2 Spec.
          </p>
          <p>
            First of all, Beacon RI Tools v2 will read the basic VCF parameters
            that come inside their columns:
            <ol>
              <li>
                CHROM: will add the chromosome number in the genomicHGVSId field
                of the record.
              </li>
              <li>
                POS: Will add the coordinates in start and end fields of the
                record in 0-typed annotation.
              </li>
              <li>
                ID: will add the identification of the variant in the
                variantType field (SNP, INDEL, etc...)
              </li>
              <li>
                REF: will fill the referenceBases field in the record of the
                variant.
              </li>
              <li>
                ALT: will fill the alternateBases field in the record of the
                variant.
              </li>
            </ol>
          </p>
          <p>
            By default, Beacon RI Tools v2 supports <b>VEP annotation</b>, in
            case your VCF has the designated VEP row in the VCF header:
          </p>

          <div className="codeSnippet">
            <pre>
              <code>
                ##INFO=&lt;ID=CSQ,Number=.,Type=String,Description="Consequence
                annotations from Ensembl VEP. Format:
                Allele|Consequence|IMPACT|SYMBOL|Gene|Feature_type|Feature|BIOTYPE|EXON|INTRON|HGVSc|HGVSp|cDNA_position|CDS_position|Protein_position|Amino_acids|Codons|Existing_variation|REF_ALLELE|UPLOADED_ALLELE|DISTANCE|STRAND|FLAGS|SYMBOL_SOURCE|HGNC_ID|CANONICAL|HGVS_OFFSET"&gt;
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "vcfInfo",
                    `##INFO=<ID=CSQ,Number=.,Type=String,Description="Consequence annotations from Ensembl VEP. Format: Allele|Consequence|IMPACT|SYMBOL|Gene|Feature_type|Feature|BIOTYPE|EXON|INTRON|HGVSc|HGVSp|cDNA_position|CDS_position|Protein_position|Amino_acids|Codons|Existing_variation|REF_ALLELE|UPLOADED_ALLELE|DISTANCE|STRAND|FLAGS|SYMBOL_SOURCE|HGNC_ID|CANONICAL|HGVS_OFFSET">`
                  )
                }
              >
                {copySuccess["vcfInfo"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <p>
            Some of the fields will be parsed into BFF. Right now, the fields
            that will be read are:
          </p>
          <ul className="list-no-bullets">
            <li>Symbol → molecularAttributes|geneIds</li>
            <li>Uploaded_Allele → variation|variantType</li>
            <li>HGVSp → molecularAttributes|aminoacidChanges</li>
            <li>Consequence → molecularAttributes|molecularEffects|label</li>
          </ul>

          <p>
            Additionally, for filling in the required fields, the INFO column
            will read the next entries:
          </p>
          <ul className="list-no-bullets">
            <li>
              VT → variation|variantType (in case VCF is not VEP annotated)
            </li>
            <li>AF → frequencyInPopulations| frequencies| alleleFrequency</li>
            <li>AN → frequencyInPopulations| frequencies| alleleNumber</li>
            <li>AC → frequencyInPopulations| frequencies| alleleCount</li>
            <li>
              AC_Hom → frequencyInPopulations| frequencies|
              alleleCountHomozygous
            </li>
            <li>
              AC_Het → frequencyInPopulations| frequencies|
              alleleCountHeterozygous
            </li>
            <li>
              END → variation| location| interval| end| value (in case END
              column is not filled in)
            </li>
          </ul>

          <p>
            On the other hand, if your VCF doesn’t have VEP annotations or you
            want to use your own customized annotations, you can do that by
            editing the files that are located in{" "}
            <a
              href="https://github.com/EGA-archive/beacon-data-tools/tree/main/pipelines/default/templates"
              target="_blank"
              rel="noopener noreferrer"
            >
              this GitHub repository
            </a>
            . The files that you have to modify are{" "}
            <strong>populations.json</strong> and
            <strong> template.json</strong>. <br />
            The <strong>populations.json</strong> will allow you to add how you
            annotated all the allele frequency related entries:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`{ 
  "numberOfPopulations": 1,
  "source": "The Genome Aggregation Database (gnomAD)",
  "sourceReference": "gnomad.broadinstitute.org/",
  "populations": [{
            "population": "Total",
            "alleleFrequency": "AF",
            "alleleCount": "AC",
            "alleleCountHomozygous": "AC_hom",
            "alleleCountHeterozygous": "AC_het",
            "alleleNumber": "AN" }]
  }`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "genomic-data-extraction",
                    `{
    "numberOfPopulations": 1,
    "source": "The Genome Aggregation Database (gnomAD)",
    "sourceReference": "gnomad.broadinstitute.org/",
    "populations": [
        {
            "population": "Total",
            "alleleFrequency": "AF",
            "alleleCount": "AC",
            "alleleCountHomozygous": "AC_hom",
            "alleleCountHeterozygous": "AC_het",
            "alleleNumber": "AN"
        }
    ]
}`
                  )
                }
              >
                {copySuccess["genomic-data-extraction"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Tip: If numberOfPopulations is greater than 1, you have to add as
              many populations you have in the populations array, while if
              populations is 0, then, no allele frequency will be read from this
              pipeline.
            </div>
          </p>
          <p>
            The template.json file will allow you to map the annotations entries
            related to the variant type, the aminoacid change, the gene Id or
            the molecular effects in your vcf:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                {`{
    "template": false,
    "variantType": "VT",
    "aminoacidChange": "HGVSp",
    "geneId": "SYMBOL",
    "molecularEffects": "CONSEQUENCE"
}`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "variant-effects-json",
                    `{
    "template": false,
    "variantType": "VT",
    "aminoacidChange": "HGVSp",
    "geneId": "SYMBOL",
    "molecularEffects": "CONSEQUENCE"
}`
                  )
                }
              >
                {copySuccess["variant-effects-json"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Tip: If you want to activate this pipeline, change the template
              variable to true. If you activate this template, this will
              override the VEP annotations.
            </div>
          </p>

          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Please, keep in mind that multiallelic variants need to be split
              onto separate rows in the VCF.
            </div>
          </p>
          <h2 id="variant-data-conversion">Variant data conversion</h2>
          <p>
            If you do not want to fill the CSV file for the genomicVariations
            collection or you already have your data in the VCF format, you can
            convert directly from VCF to BFF.
          </p>
          <p>
            To convert data from a VCF file to BFF (json), the VCF must be
            compressed and indexed (.vcf.gz + .vcf.gz.tbi). Beacon RI Tools v2
            will read all the VCF files inside the{" "}
            <a
              href="https://github.com/EGA-archive/beacon-data-tools/tree/main/files/vcf/files_to_read"
              target="_blank"
              rel="noopener noreferrer"
            >
              files_to_read folder
            </a>
            . You can convert one or multiple VCF files at a time.
          </p>
          <p>To execute the conversion, use the next command:</p>
          <div className="codeSnippet">
            <pre>
              <code>
                docker exec -it ri-tools python genomicVariations_vcf.py
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "genomicVariations_vcf",
                    "docker exec -it ri-tools python genomicVariations_vcf.py"
                  )
                }
              >
                {copySuccess["genomicVariations_vcf"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            This command will do the conversion from VCF to BFF and will load
            the final BFF documents into a mongoDB inside a container. This is
            done for memory size usage.
          </p>
          <p>
            After that, if needed, export your documents from the mongoDB to
            your machine as a BFF file (json) using two possible commands.
          </p>

          <ul>
            <li>
              The first command will delete an internal <i>"_id"</i> for each
              record that is generated by MongoDB:
              <div className="codeSnippet">
                <pre>
                  <code>{`docker exec ri-tools mongoexport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --collection genomicVariations | sed '/"_id":/s/"_id":[^,]*,//g' > genomicVariations.json`}</code>
                  <button
                    className="copyButtonCode"
                    onClick={() =>
                      copyToClipboard(
                        "exportWithoutId",
                        `docker exec ri-tools mongoexport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --collection genomicVariations | sed '/"_id":/s/"_id":[^,]*,//g' > genomicVariations.json`
                      )
                    }
                  >
                    {copySuccess["exportWithoutId"] ? (
                      "Copied!"
                    ) : (
                      <img className="copySymbol" src={copyIcon} alt="Copy" />
                    )}
                  </button>
                </pre>
              </div>
            </li>
            <br></br>
            <li>
              The second command will keep the <i>"_id"</i> entries generated by
              MongoDB. Note that this ID is not part of the specifications of
              the Beacon and will not affect your data and Beacon, you can keep
              it if you want:
              <div className="codeSnippet">
                <pre>
                  <code>
                    docker exec ri-tools mongoexport --jsonArray --uri
                    "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin"
                    --collection genomicVariations &gt; genomicVariations.json
                  </code>
                  <button
                    className="copyButtonCode"
                    onClick={() =>
                      copyToClipboard(
                        "exportWithId",
                        'docker exec ri-tools mongoexport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --collection genomicVariations > genomicVariations.json'
                      )
                    }
                  >
                    {copySuccess["exportWithId"] ? (
                      "Copied!"
                    ) : (
                      <img className="copySymbol" src={copyIcon} alt="Copy" />
                    )}
                  </button>
                </pre>
              </div>
            </li>
          </ul>

          <p>
            This will generate the final BFF file (json) for the{" "}
            <code>genomicVariations</code> collection using the VCF format as
            the source. Bear in mind that this time, the file will be saved in
            the directory you are located, so if you want to save it in the{" "}
            <code>output_docs</code> folder, add it in the path of the{" "}
            <code>mongoexport</code> (e.g.{" "}
            <code>&gt; output_docs/genomicVariations.json</code>).
          </p>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              If you are using the ri-tools image directly into Beacon v2 PI API
              or Beacon v2 RI API you won’t need to mongoexport the .json files
              unless you specifically need them for any other purpose, as the
              MongoDB instance for the API will already be filled with the
              variants.
            </div>
          </p>
          <p>
            As it has already been mentioned, the variants read from the VCF are
            directly stored into the Beacon RI Tools v2 MongoDB.
          </p>
          <p>
            If you need to do more conversions and you don’t want to keep the
            variants inside it, you can remove them by using the next command:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                docker exec ri-tools-mongo /bin/bash -c 'mongo beacon -u root -p
                example --authenticationDatabase admin --eval
                "db.genomicVariations.deleteMany({})"'
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "deleteVariants",
                    "docker exec ri-tools-mongo /bin/bash -c 'mongo beacon -u root -p example --authenticationDatabase admin --eval \"db.genomicVariations.deleteMany({})\"'"
                  )
                }
              >
                {copySuccess["deleteVariants"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            At this point, you should have your data ready to be injected into
            the Beacon v2 RI API.
          </p>
          <h2 id="case-level-data-conversion">Case level data conversion</h2>
          <p>
            If you are converting with the paramater <b>case_level_data</b> to
            True, this will add data into two collections: <b>targets</b>{" "}
            and&nbsp;
            <b>caseLevelData</b>. If you need to export the variants to insert
            them in another mongoDB, you will need to export these two
            collections as well, by executing the next commands:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                docker exec ri-tools mongoexport --jsonArray --uri
                "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin"
                --collection caseLevelData &gt; caseLevelData.json
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "exportCaseLevelData",
                    'docker exec ri-tools mongoexport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --collection caseLevelData > caseLevelData.json'
                  )
                }
              >
                {copySuccess["exportCaseLevelData"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <div className="codeSnippet">
            <pre>
              <code>
                docker exec ri-tools mongoexport --jsonArray --uri
                "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin"
                --collection targets &gt; targets.json
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard(
                    "exportTargets",
                    'docker exec ri-tools mongoexport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --collection targets > targets.json'
                  )
                }
              >
                {copySuccess["exportTargets"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Bear in mind that if you are converting VCFs one by one for the
              same samples and not by batches (multiple VCFs at the same time),
              this will generate a target file every time. We recommend
              converting all VCFs for the same sampling (dataset) at the same
              time to avoid unnecessary target records to be created.
            </div>
          </p>
          <p>
            Case level data conversion is only applicable in the Beacon
            Production Implementation environment, as it is specifically
            designed to handle detailed sample-level associations and structured
            genomic data storage optimized for production use.
          </p>
        </div>
        <div className="sidebarColumn">
          <OnThisPage />
        </div>
      </div>
    </div>
  );
};

export default ConversionVCFBFF;
