import "../Beacon2RIAPI/ApiConfiguration.css";
import React, { useRef, useState } from "react";
import copyIcon from "../../assets/copy-symbol.svg";
import OnThisPage from "../../components/OnThisPage";
import useHighlightAndScroll from "../../hooks/useHighlightAndScroll";
import useDocScrollSpy from "../../hooks/useDocScrollSpy";

interface UseCaseProps {
  searchTerm: string;
}

const UseCase: React.FC<UseCaseProps> = ({ searchTerm }) => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );
  const contentRef = useRef<HTMLDivElement>(null);
  useHighlightAndScroll(contentRef, searchTerm);
  const { activeId } = useDocScrollSpy(contentRef);

  const copyToClipboard = (snippetId: string) => {
    const textToCopy: { [key: string]: string } = {
      "bash-mongostart": `bash mongostart.sh`,
      "extract-filtering-terms": `docker exec beaconprod python -m beacon.connections.mongo.extract_filtering_terms`,
      "public-datasets": `public_datasets:
- EGAD00001008392`,

      "beacon-ri-metadata": `beacon_id = 'org.ega-archive.beacon-ri-demo'

beacon_name = 'Beacon Reference Implementation: Rare Diseases Use Case'

api_version = 'v2.0.0'

uri = 'https://beacon-apis-demo.ega-archive.org/api/'

org_id = 'EGA'

org_name = 'European Genome-Phenome Archive (EGA)'

org_description = 'The European Genome-phenome Archive (EGA) is a service for permanent archiving and sharing of all types of personally identifiable genetic and phenotypic data resulting from biomedical research projects.'

org_adress = 'C/ Dr. Aiguader, 88
PRBB Building
08003 Barcelona, Spain'

org_welcome_url = 'https://ega-archive.org/'

org_contact_url = 'mailto:beacon.ega@crg.eu'

org_logo_url = 'https://legacy.ega-archive.org/images/logo.png'

org_info = ''

description = "This Beacon is based on synthetic data hosted at the EGA. It contains information from one sample from EGAD00001008392"

version = 'v2.0'

welcome_url = 'https://ega-archive.org/datasets/EGAD00001008392'

alternative_url = 'https://beacon-apis-demo.ega-archive.org/api/'

create_datetime = '2025-05-12T12:00:00.000000'

update_datetime = ''`,
      "convert-all": "docker exec -it ri-tools python csv_to_bff.py",
      "mongoexport-genomicVariations": `docker exec mongoprod mongoexport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --collection genomicVariations > ri-tools/output_docs/genomicVariations.json`,
      "vcf-file-path": `./beacon2-pi-api/ri-tools/files/vcf/files_to_read/case1C_subset.vcf.gz`,
      "vcf-import-output": `files/vcf/files_to_read/case1C_subset.vcf.gz
100% | 5/5 [00:00<00:00, 6603.12it/s]
Successfully inserted 5 records into beacon
A total of 5 variants were processed
A total of 0 variants were skipped`,
      "genomic-variations": `docker exec -it ri-tools python genomicVariations_vcf.py`,
      "phenopacket-output": `The mandatory fields for BioSamples were not present in the phenopacket 
Mandatory properties for Individual schema (id and sex) present in the phenopacket.
-> Creating Individuals schema ...
    - diseases added to Individuals
    - phenotypicFeatures added to Individuals
-> Creating Individuals schema - DONE
+ BFFs Individuals JSON saved in:  
/beacon2-pi-api/ri-tools/phenopackets-to-BFF/case1c.json`,
      "phenopacket-to-bff-case1c-command":
        "docker exec phenopackets-to-BFF python working-w-phenopackets.py /usr/src/app/examples/case1c.json EGAD00001008392",
      "cloning-repository":
        "git clone https://github.com/EGA-archive/beacon2-pi-api.git",
      "compress-vcf": `bgzip Case1C_subset.vcf`,
      "docker-compose": `docker compose up -d --build`,
      conversionConfigRD: `#### Input and Output files config parameters ####
csv_folder = './csv/use_case_RD/'
output_docs_folder='./output_docs/use_case_RD_output/'

#### VCF Conversion config parameters ####
allele_counts=False # Variable still in test, leave it as False for now.
reference_genome='GRCh37' # Choose one between NCBI36, GRCh37, GRCh38
datasetId='EGAD00001008392'
case_level_data=False
exact_heterozygosity=False
num_rows=5
verbosity=False # This variable, if True, will make the program run slower but give logs about all the skipped variants and the reason why.`,
      "vcf-snippet": `##fileformat=VCFv4.2
##ALT=<ID=NON_REF,Description="Represents any possible alternative allele at this location">
##FILTER=<ID=LowQual,Description="Low quality">
##FORMAT=<ID=AD,Number=R,Type=Integer,Description="Allelic depths for the ref and alt alleles in the order listed">
##FORMAT=<ID=DP,Number=1,Type=Integer,Description="Approximate read depth (reads with MQ=255 or with bad mates are filtered)">
##FORMAT=<ID=GQ,Number=1,Type=Integer,Description="Genotype Quality">
##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">
##FORMAT=<ID=MIN_DP,Number=1,Type=Integer,Description="Minimum DP observed within the GVCF block">
##FORMAT=<ID=MQ0,Number=1,Type=Integer,Description="Number of Mapping Quality Zero Reads per sample">
##FORMAT=<ID=PGT,Number=1,Type=String,Description="Physical phasing haplotype information, describing how the alternate alleles are phased in relation to one another">
##FORMAT=<ID=PID,Number=1,Type=String,Description="Physical phasing ID information, where each unique ID within a given sample (but not across samples) connects records within a phasing group">
##FORMAT=<ID=PL,Number=G,Type=Integer,Description="Normalized, Phred-scaled likelihoods for genotypes as defined in the VCF specification">
##FORMAT=<ID=SB,Number=4,Type=Integer,Description="Per-sample component statistics which comprise the Fisher's Exact Test to detect strand bias.">
##GATKCommandLine.HaplotypeCaller=<ID=HaplotypeCaller,Version=3.6-0-g89b7209,Date="Thu Mar 23 15:53:02 CET 2017",Epoch=1490280782918,CommandLineOptions="analysis_type=HaplotypeCaller input_file=[/scratch/production/slaurie/PlatinumTrioForRD-Connect/HapMapTrio/gVCF/Case1C/E012882.bam] showFullBamList=false read_buffer_size=null read_filter=[BadCigar] disable_read_filter=[] intervals=[21] excludeIntervals=null interval_set_rule=UNION interval_merging=ALL interval_padding=0 reference_sequence=/project/production/Indexes/samtools/hsapiens.hs37d5.fasta nonDeterministicRandomSeed=false disableDithering=false maxRuntime=-1 maxRuntimeUnits=MINUTES downsampling_type=NONE downsample_to_fraction=null downsample_to_coverage=null baq=OFF baqGapOpenPenalty=40.0 refactor_NDN_cigar_string=false fix_misencoded_quality_scores=false allow_potentially_misencoded_quality_scores=false useOriginalQualities=false defaultBaseQualities=-1 performanceLog=null BQSR=null quantize_quals=0 static_quantized_quals=null round_down_quantized=false disable_indel_quals=false emit_original_quals=false preserve_qscores_less_than=6 globalQScorePrior=-1.0 validation_strictness=SILENT remove_program_records=false keep_program_records=false sample_rename_mapping_file=null unsafe=null disable_auto_index_creation_and_locking_when_reading_rods=false no_cmdline_in_header=false sites_only=false never_trim_vcf_format_field=true bcf=false bam_compression=null simplifyBAM=false disable_bam_indexing=false generate_md5=false num_threads=1 num_cpu_threads_per_data_thread=1 num_io_threads=0 monitorThreadEfficiency=false num_bam_file_handles=null read_group_black_list=null pedigree=[] pedigreeString=[] pedigreeValidationType=STRICT allow_intervals_with_unindexed_bam=false generateShadowBCF=false variant_index_type=LINEAR variant_index_parameter=128000 reference_window_stop=0 phone_home= gatk_key=null tag=NA logging_level=INFO log_to_file=null help=false version=false likelihoodCalculationEngine=PairHMM heterogeneousKmerSizeResolution=COMBO_MIN dbsnp=(RodBinding name= source=UNBOUND) dontTrimActiveRegions=false maxDiscARExtension=25 maxGGAARExtension=300 paddingAroundIndels=150 paddingAroundSNPs=20 comp=[] annotation=[AlleleBalance, BaseCounts, BaseQualityRankSumTest, ChromosomeCounts, ClippingRankSumTest, Coverage, DepthPerAlleleBySample, DepthPerSampleHC, FisherStrand, GCContent, HaplotypeScore, HardyWeinberg, HomopolymerRun, ClippingRankSumTest, LikelihoodRankSumTest, LowMQ, MappingQualityRankSumTest, MappingQualityZero, MappingQualityZeroBySample, NBaseCount, QualByDepth, RMSMappingQuality, ReadPosRankSumTest, StrandBiasBySample, StrandOddsRatio, VariantType, StrandBiasBySample] excludeAnnotation=[ChromosomeCounts, FisherStrand, StrandOddsRatio, QualByDepth] group=[StandardAnnotation, StandardHCAnnotation] debug=false useFilteredReadsForAnnotations=false emitRefConfidence=GVCF bamOutput=null bamWriterType=CALLED_HAPLOTYPES emitDroppedReads=false disableOptimizations=false annotateNDA=false heterozygosity=0.001 indel_heterozygosity=1.25E-4 standard_min_confidence_threshold_for_calling=-0.0 standard_min_confidence_threshold_for_emitting=-0.0 max_alternate_alleles=6 max_num_PL_values=100 input_prior=[] sample_ploidy=2 genotyping_mode=DISCOVERY alleles=(RodBinding name= source=UNBOUND) contamination_fraction_to_filter=0.0 contamination_fraction_per_sample_file=null p_nonref_model=null exactcallslog=null output_mode=EMIT_VARIANTS_ONLY allSitePLs=true gcpHMM=10 pair_hmm_implementation=VECTOR_LOGLESS_CACHING pair_hmm_sub_implementation=ENABLE_ALL always_load_vector_logless_PairHMM_lib=false phredScaledGlobalReadMismappingRate=45 noFpga=false sample_name=null kmerSize=[10, 25] dontIncreaseKmerSizesForCycles=false allowNonUniqueKmersInRef=false numPruningSamples=1 recoverDanglingHeads=false doNotRecoverDanglingBranches=false minDanglingBranchLength=4 consensus=false maxNumHaplotypesInPopulation=128 errorCorrectKmers=false minPruning=2 debugGraphTransformations=false allowCyclesInKmerGraphToGeneratePaths=false graphOutput=null kmerLengthForReadErrorCorrection=25 minObservationsForKmerToBeSolid=20 GVCFGQBands=[20, 25, 30, 35, 40, 45, 50, 70, 90, 99] indelSizeToEliminateInRefModel=10 min_base_quality_score=10 includeUmappedReads=false useAllelesTrigger=false doNotRunPhysicalPhasing=false keepRG=null justDetermineActiveRegions=false dontGenotype=false dontUseSoftClippedBases=false captureAssemblyFailureBAM=false errorCorrectReads=false pcr_indel_model=CONSERVATIVE maxReadsInRegionPerSample=10000 minReadsPerAlignmentStart=10 mergeVariantsViaLD=false activityProfileOut=null activeRegionOut=null activeRegionIn=null activeRegionExtension=null forceActive=false activeRegionMaxSize=null bandPassSigma=null maxProbPropagationDistance=50 activeProbabilityThreshold=0.002 min_mapping_quality_score=20 filter_reads_with_N_cigar=false filter_mismatching_base_and_quals=false filter_bases_not_stored=false">
##GVCFBlock0-20=minGQ=0(inclusive),maxGQ=20(exclusive)
##GVCFBlock20-25=minGQ=20(inclusive),maxGQ=25(exclusive)
##GVCFBlock25-30=minGQ=25(inclusive),maxGQ=30(exclusive)
##GVCFBlock30-35=minGQ=30(inclusive),maxGQ=35(exclusive)
##GVCFBlock35-40=minGQ=35(inclusive),maxGQ=40(exclusive)
##GVCFBlock40-45=minGQ=40(inclusive),maxGQ=45(exclusive)
##GVCFBlock45-50=minGQ=45(inclusive),maxGQ=50(exclusive)
##GVCFBlock50-70=minGQ=50(inclusive),maxGQ=70(exclusive)
##GVCFBlock70-90=minGQ=70(inclusive),maxGQ=90(exclusive)
##GVCFBlock90-99=minGQ=90(inclusive),maxGQ=99(exclusive)
##GVCFBlock99-2147483647=minGQ=99(inclusive),maxGQ=2147483647(exclusive)
##INFO=<ID=ABHet,Number=1,Type=Float,Description="Allele Balance for heterozygous calls (ref/(ref+alt))">
##INFO=<ID=ABHom,Number=1,Type=Float,Description="Allele Balance for homozygous calls (A/(A+O)) where A is the allele (ref or alt) and O is anything other">
##INFO=<ID=BaseCounts,Number=4,Type=Integer,Description="Counts of each base">
##INFO=<ID=BaseQRankSum,Number=1,Type=Float,Description="Z-score from Wilcoxon rank sum test of Alt Vs. Ref base qualities">
##INFO=<ID=ClippingRankSum,Number=1,Type=Float,Description="Z-score From Wilcoxon rank sum test of Alt vs. Ref number of hard clipped bases">
##INFO=<ID=DP,Number=1,Type=Integer,Description="Approximate read depth; some reads may have been filtered">
##INFO=<ID=DS,Number=0,Type=Flag,Description="Were any of the samples downsampled?">
##INFO=<ID=END,Number=1,Type=Integer,Description="Stop position of the interval">
##INFO=<ID=ExcessHet,Number=1,Type=Float,Description="Phred-scaled p-value for exact test of excess heterozygosity">
##INFO=<ID=GC,Number=1,Type=Float,Description="GC content around the variant (see docs for window size details)">
##INFO=<ID=HRun,Number=1,Type=Integer,Description="Largest Contiguous Homopolymer Run of Variant Allele In Either Direction">
##INFO=<ID=HW,Number=1,Type=Float,Description="Phred-scaled p-value for Hardy-Weinberg violation">
##INFO=<ID=HaplotypeScore,Number=1,Type=Float,Description="Consistency of the site with at most two segregating haplotypes">
##INFO=<ID=InbreedingCoeff,Number=1,Type=Float,Description="Inbreeding coefficient as estimated from the genotype likelihoods per-sample when compared against the Hardy-Weinberg expectation">
##INFO=<ID=LikelihoodRankSum,Number=1,Type=Float,Description="Z-score from Wilcoxon rank sum test of Alt Vs. Ref haplotype likelihoods">
##INFO=<ID=LowMQ,Number=3,Type=Float,Description="3-tuple: <fraction of reads with MQ=0>,<fraction of reads with MQ<=10>,<total number of reads>">
##INFO=<ID=MLEAC,Number=A,Type=Integer,Description="Maximum likelihood expectation (MLE) for the allele counts (not necessarily the same as the AC), for each ALT allele, in the same order as listed">
##INFO=<ID=MLEAF,Number=A,Type=Float,Description="Maximum likelihood expectation (MLE) for the allele frequency (not necessarily the same as the AF), for each ALT allele, in the same order as listed">
##INFO=<ID=MQ,Number=1,Type=Float,Description="RMS Mapping Quality">
##INFO=<ID=MQ0,Number=1,Type=Integer,Description="Total Mapping Quality Zero Reads">
##INFO=<ID=MQRankSum,Number=1,Type=Float,Description="Z-score From Wilcoxon rank sum test of Alt vs. Ref read mapping qualities">
##INFO=<ID=OND,Number=1,Type=Float,Description="Overall non-diploid ratio (alleles/(alleles+non-alleles))">
##INFO=<ID=PercentNBase,Number=1,Type=Float,Description="Percentage of N bases in the pileup">
##INFO=<ID=RAW_MQ,Number=1,Type=Float,Description="Raw data for RMS Mapping Quality">
##INFO=<ID=ReadPosRankSum,Number=1,Type=Float,Description="Z-score from Wilcoxon rank sum test of Alt vs. Ref read position bias">
##INFO=<ID=VariantType,Number=1,Type=String,Description="Variant type description">
##contig=<ID=21,length=48129895>
##reference=file:///project/production/Indexes/samtools/hsapiens.hs37d5.fasta
#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	Case1C
21	9411635	.	C	T	49.77	.	BaseQRankSum=0.420;ClippingRankSum=0.000;DP=21;ExcessHet=3.0103;LikelihoodRankSum=-0.537;MLEAC=1,0;MLEAF=0.500,0.00;MQ0=0;MQRankSum=-1.786;RAW_MQ=42918.00;ReadPosRankSum=1.162	GT:AD:DP:GQ:PL:SB	0/1:17,4,0:21:78:78,0,544,129,556,685:8,9,4,0
21	9411732	.	T	G	823.77	.	DP=25;ExcessHet=3.0103;MLEAC=2,0;MLEAF=1.00,0.00;MQ0=0;RAW_MQ=67833.00	GT:AD:DP:GQ:PL:SB	1/1:0,25,0:25:75:852,75,0,852,75,852:0,0,14,11
21	9411931	.	G	A	104.77	.	BaseQRankSum=-0.873;ClippingRankSum=0.000;DP=27;ExcessHet=3.0103;LikelihoodRankSum=-0.375;MLEAC=1,0;MLEAF=0.500,0.00;MQ0=0;MQRankSum=-3.169;RAW_MQ=65235.00;ReadPosRankSum=0.657	GT:AD:DP:GQ:PGT:PID:PL:SB	0/1:22,5,0:27:99:0|1:9411931_G_A:133,0,874,199,889,1087:11,11,0,5
21	9411949	.	T	C	55.77	.	BaseQRankSum=1.914;ClippingRankSum=0.000;DP=29;ExcessHet=3.0103;LikelihoodRankSum=-0.063;MLEAC=1,0;MLEAF=0.500,0.00;MQ0=0;MQRankSum=-3.040;RAW_MQ=73991.00;ReadPosRankSum=-1.787	GT:AD:DP:GQ:PGT:PID:PL:SB	0/1:25,4,0:29:84:0|1:9411931_G_A:84,0,1132,168,1144,1312:12,13,0,4
21	9411965	.	T	C	0.01	.	BaseQRankSum=0.337;ClippingRankSum=0.000;DP=30;ExcessHet=3.0103;LikelihoodRankSum=-1.995;MLEAC=0,0;MLEAF=0.00,0.00;MQ0=0;MQRankSum=-2.589;RAW_MQ=90291.00;ReadPosRankSum=-2.080	GT:AD:DP:GQ:PGT:PID:PL:SB	0/0:28,2,0:30:0:0|1:9411931_G_A:0,0,1105,84,1111,1195:11,17,0,2`,
      "phenopacket-snippet": `{
        "id": "P0007498",
        "subject": {
          "id": "P0007498",
          "dateOfBirth": "2013-01-01T00:00:00Z",
          "sex": "MALE"
        },
        "phenotypicFeatures": [
          {
            "excluded": true,
            "type": {
              "id": "HP:0001249",
              "label": "Intellectual disability"
            }
          },
          {
            "type": {
              "id": "HP:0000467",
              "label": "Neck muscle weakness"
            }
          },
          {
            "type": {
              "id": "HP:0001252",
              "label": "Muscular hypotonia"
            }
          },
          {
            "type": {
              "id": "HP:0001319",
              "label": "Neonatal hypotonia"
            }
          },
          {
            "type": {
              "id": "HP:0001374",
              "label": "Congenital hip dislocation"
            }
          },
          {
            "type": {
              "id": "HP:0002540",
              "label": "Inability to walk"
            }
          },
          {
            "type": {
              "id": "HP:0002783",
              "label": "Recurrent lower respiratory tract infections"
            }
          },
          {
            "type": {
              "id": "HP:0002804",
              "label": "Arthrogryposis multiplex congenita"
            }
          },
          {
            "type": {
              "id": "HP:0003202",
              "label": "Skeletal muscle atrophy"
            }
          },
          {
            "type": {
              "id": "HP:0005684",
              "label": "Distal arthrogryposis"
            }
          },
          {
            "type": {
              "id": "HP:0030319",
              "label": "Weakness of facial musculature"
            }
          }
        ],
        "diseases": [
          {
            "term": {
              "id": "Orphanet:97245",
              "label": "Congenital myopathy"
            }
          },
          {
            "term": {
              "id": "OMIM:117000",
              "label": "CENTRAL CORE DISEASE OF MUSCLE"
            }
          }
        ],
        "meta_data": {
          "created": "2021-04-21T09:32:38.488Z",
          "resources": [
            {
              "id": "hp",
              "name": "Human Phenotype Ontology",
              "url": "http://purl.obolibrary.org/obo/hp.owl",
              "version": "2020-12-07",
              "namespacePrefix": "HP",
              "iriPrefix": "http://purl.obolibrary.org/obo/HP_"
            },
            {
              "id": "orphanet",
              "name": "Orphanet Rare Disease Ontology",
              "url": "http://orpha.net/ontology/ORDO_en_3.1.owl",
              "version": "3.1",
              "namespacePrefix": "Orphanet",
              "iriPrefix": "http://www.orpha.net/ORDO/Orphanet_"
            },
            {
              "id": "hgnc",
              "name": "HUGO Gene Nomenclature Committee",
              "url": "https://www.genenames.org",
              "version": "2021-01-13",
              "namespacePrefix": "HGNC",
              "iriPrefix": "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/"
            },
            {
              "id": "mim",
              "name": "Online Mendelian Inheritance in Man",
              "url": "https://omim.org/",
              "version": "2021-01-21",
              "namespacePrefix": "OMIM",
              "iriPrefix": "https://omim.org/entry/"
            }
          ]
        }
      }`,
      "docker-ps": `docker ps`,
      "img-ri-tools": "ghcr.io/ega-archive/beacon2-ri-tools-v2:latest",
      "name-ri-tools": "ri-tools",
      "img-phenopackets": "ghcr.io/ega-archive/phenopackets-to-bff:latest",
      "name-phenopackets": "phenopackets-to-BFF",
      "img-mongo-express": "mongo-express",
      "name-mongo-express": "beacon2-pi-api-mongo-express-1",
      "img-postgres": "ghcr.io/ega-archive/beacon2-ri-postgres-v2:latest",
      "name-postgres": "idp-db",
      "img-beaconprod": "beacon2-pi-api-beaconprod",
      "name-beaconprod": "beaconprod",
      "edit-ri-tools": `#### Input and Output files config parameters ####

      csv_folder = './csv/examples/'
      output_docs_folder='./output_docs/'
      
      #### VCF Conversion config parameters ####
      
      allele_counts=False
      reference_genome='GRCh37' # Choose one between NCBI36, GRCh37, GRCh38
      datasetId='COVID_pop11_fin_2'
      case_level_data=False
      exact_heterozygosity=False
      num_rows=1500000
      verbosity=False`,
      "python-convert-csvTObff-py": `docker exec -it ri-tools python csv_to_bff.py`,
      "python-genomicVariations-vcf-py": `docker exec -it ri-tools python genomicVariations_vcf.py`,
      "mongo-export-snippet": `docker exec ri-tools mongoexport --jsonArray --uri "mongodb://
root:example@127.0.0.1:27017/beacon?authSource=admin" --collection
genomicVariations > ./beacon2-pi-api/ri-tools/output_docs//
genomicVariations.json`,
      "execute-start-script": `bash mongostart.sh`,
      "connections-mongo-data": `cd ./beacon2-pi-api/beacon/connections/mongo/data`,
      "bulk-mongoimport-snippet": `docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/datasets.json --collection datasets
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/individuals.json --collection individuals
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/cohorts.json --collection cohorts
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/analyses.json --collection analyses
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/biosamples.json --collection biosamples
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/genomicVariations.json --collection genomicVariations
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/runs.json --collection runs
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/targets.json --collection targets
docker exec mongoprod mongoimport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --file /data/caseLevelData.json --collection caseLevelData`,
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
        <a
          href="/example-beacon:-rare-disease-use-case"
          className="no-undeline"
        >
          Tutorials
        </a>
        <img
          src="arrow-right-bold.svg"
          alt="arrow right"
          className="arrow-icon"
        />
        <a
          href="/example-beacon:-rare-disease-use-case"
          className="no-undeline"
        >
          <span className="user-path-title">
            Example Beacon: Rare Disease Use Case
          </span>
        </a>
      </h2>
      <div className="contentWrapper">
        <div className="contentColumn" ref={contentRef}>
          <h3></h3>
          <h1 id="introduction">Introduction</h1>
          <p>
            For this example we are going to use the synthetic dataset, hosted
            at the European Genome-Phenome Archive, EGAD00001008392.
          </p>
          <p>
            The Rare Disease Synthetic Dataset (
            <a href="https://ega-archive.org/datasets/EGAD00001008392">
              EGAD00001008392
            </a>
            ), contains public human datasets for the study of rare diseases.
            The use of public human genomic background combined with the
            in-silico insertion of real disease-causing variants enable a
            representative dataset for testing purposes without facing ethical
            and legal issues associated with the use of human sensitive data.
            This project aims to help develop technical implementations for rare
            disease data integration, analysis, discovery, and federated access.
          </p>
          <p>
            This dataset contains 18 samples and different data types (FASTQs,
            BAMs and VCFs). To simplify the example we’ll only insert data from
            the sample EGAN00003364605, case1_index, from which we have the VCFs
            for the 24 chromosomes, a BAM and its index and a phenopacket with
            phenotypic and clinical information.
          </p>
          <p>
            For this example we’ll include into our beacon, the variants from
            chromosome 21 VCF, the phenopacket and all the rest of information
            available using CSV templates.
          </p>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>Object Type</b>
                </th>
                <th>
                  <b>Identifier</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rare Disease Synthetic Dataset</td>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/datasets/EGAD00001008392"
                    target="_blank"
                  >
                    EGAD00001008392
                  </a>
                </td>
              </tr>
              <tr>
                <td>case1_index sample</td>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/samples/EGAN00003364605"
                    target="_blank"
                  >
                    EGAN00003364605
                  </a>
                </td>
              </tr>
              <tr>
                <td>case1_index fastq</td>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/runs/EGAR00003021166"
                    target="_blank"
                  >
                    EGAR00003021166
                  </a>
                </td>
              </tr>
              <tr>
                <td>Chromosome 21 VCF</td>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/analyses/EGAZ00001744017"
                    target="_blank"
                  >
                    EGAZ00001744017
                  </a>
                </td>
              </tr>
              <tr>
                <td>Phenopacket</td>
                <td>
                  <a
                    href="https://metadata.ega-archive.org/analyses/EGAZ00001744003"
                    target="_blank"
                  >
                    EGAZ00001744003
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <h2 className="h2-less-margin">
            Table 1. EGA identifiers for all the synthetic data used. 
          </h2>
          <p>
            For further information about how to use the public metadata API
            please visit the{" "}
            <a href="https://ega-archive.org/discovery/metadata/public-metadata-api/">
              EGA documentation
            </a>
            .
          </p>
          <p className="note">
            <img
              className="note-symbol"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Before continuing with this tutorial, please make sure you've
              reviewed{" "}
              <a href="https://beacon-documentation-demo.ega-archive.org/create-your-beacon">
                10 steps to create your first beacon
              </a>
              . In that tutorial you'll find important information that will
              help you follow this use case theoretically and technically.
            </div>
          </p>
          <h1 id="dataset-model-creation ">Dataset model creation </h1>
          <p>
            Dataset model is described as a group of variants or individuals
            that share something in common, in this case that they belong to the
            same repository.
          </p>
          <p>
            Let’s start checking which information we’ve got and which one can
            be included in the{" "}
            <a href="https://docs.genomebeacons.org/schemas-md/datasets_defaultSchema/">
              dataset model
            </a>
            .
          </p>
          <p>EGA metadata about EGAD00001008392:</p>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>Metadata field</b>
                </th>
                <th>
                  {" "}
                  <b>Content</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>stable_id</td>
                <td>EGAD00001008392</td>
              </tr>
              <tr>
                <td>Title</td>
                <td>Rare Disease Synthetic Dataset</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  The purpose of this project is to provide public human
                  datasets for the study of rare diseases. The use of public
                  human genomic background combined with the in-silico insertion
                  of real disease-causing variants enable a representative
                  dataset for testing purposes without facing ethical and legal
                  issues associated with the use of human sensitive data. This
                  project aims to help develop technical implementations for
                  rare disease data integration, analysis, discovery, and
                  federated access.
                </td>
              </tr>
              <tr>
                <td>Dataset types</td>
                <td>
                  {
                    '{"Genomic variant calling", "Phenotype information", "Whole genome sequencing"}'
                  }
                </td>
              </tr>
              <tr>
                <td>Technologies</td>
                <td>{'{"Illumina HiSeq 2000"}'}</td>
              </tr>
              <tr>
                <td>Number of samples </td>
                <td>18</td>
              </tr>
              <tr>
                <td>Created at</td>
                <td>2021-12-01 11:53:53.000 +0100</td>
              </tr>
              <tr>
                <td>Edited at</td>
                <td>2025-04-14 23:18:43.985 +0200</td>
              </tr>
              <tr>
                <td>Use conditions</td>
                <td>
                  Data may be used freely for non-commercial research and
                  educational activities.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Now, let’s take a look at the{" "}
            <a href="https://docs.genomebeacons.org/schemas-md/datasets_defaultSchema/">
              dataset beacon model
            </a>
            . 
          </p>
          <p>
            The mapping between our data and the beacon model would look like: 
          </p>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>
                    Dataset Beacon
                    <br />
                    Model Term
                  </b>
                </th>
                <th>
                  {" "}
                  <b>
                    Property <br />
                    Type
                  </b>
                </th>
                <th>
                  <b>
                    EGA Metadata <br />
                    field
                  </b>
                </th>
                <th>
                  <b>Content</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>string</td>
                <td>stable_id</td>
                <td>EGAD00001008392</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>string</td>
                <td>Title</td>
                <td>Rare Disease Synthetic Dataset</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>string</td>
                <td>Description</td>
                <td>
                  The purpose of this project is to provide public human
                  datasets for the study of rare diseases. The use of public
                  human genomic background combined with the in-silico insertion
                  of real disease-causing variants enable a representative
                  dataset for testing purposes without facing ethical and legal
                  issues associated with the use of human sensitive data. This
                  project aims to help develop technical implementations for
                  rare disease data integration, analysis, discovery, and
                  federated access.
                </td>
              </tr>
              <tr>
                <td>X</td>
                <td></td>
                <td>Dataset types</td>
                <td>
                  {
                    '{"Genomic variant calling", "Phenotype information", "Whole genome sequencing"}'
                  }
                </td>
              </tr>
              <tr>
                <td>X</td>
                <td></td>
                <td>Technologies</td>
                <td>{'{"Illumina HiSeq 2000"}'}</td>
              </tr>
              <tr>
                <td>X</td>
                <td></td>
                <td>Number of samples </td>
                <td>18</td>
              </tr>
              <tr>
                <td>createDateTime</td>
                <td>string</td>
                <td>Created at</td>
                <td>2021-12-01 11:53:53.000 +0100</td>
              </tr>
              <tr>
                <td>updateDateTime</td>
                <td>string</td>
                <td>Edited at</td>
                <td>2025-04-14 23:18:43.985 +0200</td>
              </tr>
              <tr>
                <td>dataUseConditions </td>
                <td>duoDataUse</td>
                <td>Use conditions</td>
                <td>
                  Data may be used freely for non-commercial research and
                  educational activities.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The first thing we should check it’s if we have the mandatory
            information for the Dataset model, which is id and name. As we have,
            we can now{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/blob/main/csv/templates/datasets.csv">
              fill in the CSV
            </a>{" "}
            with all the information. 
          </p>
          <p>
            We can see that most of the metadata and properties have a direct
            match, except the dataUseConditions property. <br></br> In our
            metadata we have string but the property type is{" "}
            <a href="https://docs.genomebeacons.org/schemas-md/obj/duoDataUse/">
              duoDataUse
            </a>
            , so we’ll have to find the{" "}
            <a href="https://ega-archive.org/access/data-access-committee/data-use-ontology/">
              DUO code
            </a>{" "}
            that means Data may be used freely for non-commercial research and
            educational activities. We’ll choose:
          </p>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>Term</b>
                </th>
                <th>
                  <b>Label</b>
                </th>
                <th>
                  <b>Definition</b>
                </th>
                <th>
                  <b>Version</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DUO:0000018</td>
                <td>not for profit, non commercial use only</td>
                <td>
                  This data use modifier indicates that use of the data is
                  limited to not-for-profit organizations and not-for-profit
                  use, non-commercial use.
                </td>
                <td>2021-02-23</td>
              </tr>
            </tbody>
          </table>
          <p>
            In the beacon model the term duoDataUse has four different
            properties: {" "}
            <ul>
              <li>id</li>
              <li>label</li>
              <li>description</li>
              <li>modifiers</li>
              <li>version</li>
            </ul>
          </p>
          <p>
            To correctly include our information to the CSV we’ll need to use
            the columns: {" "}
            <ul>
              <li>dataUseConditions|duoDataUse|id</li>
              <li>dataUseConditions|duoDataUse|label</li>
              <li>dataUseConditions|duoDataUse|description</li>
              <li>dataUseConditions|duoDataUse|version</li>
            </ul>
          </p>
          <p>
            {" "}
            Take a look to our final{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/blob/main/csv/examples/Rare-diseases/datasets.csv">
              CSV
            </a>
            .
          </p>
          <h1 id="Analysis-model-creation">Analysis model creation</h1>
          <p>
            Now, let’s focus on the information we’ve got about EGAZ00001744017.
          </p>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>Metadata field</b>
                </th>
                <th>
                  {" "}
                  <b>Content</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>stable_id</td>
                <td>EGAZ00001744017</td>
              </tr>
              <tr>
                <td>Title</td>
                <td>case1_index VCF chr21</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>variants were called using GATK3.6</td>
              </tr>
              <tr>
                <td>Analysis type</td>
                <td>SEQUENCE VARIATION</td>
              </tr>
              <tr>
                <td>Analysis file type</td>
                <td>VCF</td>
              </tr>
              <tr>
                <td>Experiment type</td>
                <td>{'{"Whole genome sequencing"}'}</td>
              </tr>
              <tr>
                <td>Genome</td>
                <td>GRCh37</td>
              </tr>
              <tr>
                <td>Chromosomes</td>
                <td>CM000683.1</td>
              </tr>
              <tr>
                <td>creation date</td>
                <td>2021-10-22</td>
              </tr>
            </tbody>
          </table>
          <p>
            And let’s try to match as much as possible to the{" "}
            <a href="https://docs.genomebeacons.org/schemas-md/analyses_defaultSchema/">
              analysis model
            </a>
            :
          </p>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>
                    Dataset Beacon
                    <br />
                    Model Term
                  </b>
                </th>
                <th>
                  {" "}
                  <b>
                    Property <br />
                    Type
                  </b>
                </th>
                <th>
                  <b>
                    EGA Metadata <br />
                    field
                  </b>
                </th>
                <th>
                  <b>Content</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>string</td>
                <td>stable_id</td>
                <td>EGAZ00001744017</td>
              </tr>
              <tr>
                <td>variantCaller</td>
                <td>string</td>
                <td>Description</td>
                <td>variants were called using GATK3.6</td>
              </tr>
              <tr>
                <td>runId</td>
                <td>string</td>
                <td>run</td>
                <td>EGAR00003021166</td>
              </tr>
              <tr>
                <td>analysisDate</td>
                <td>string</td>
                <td>creation date</td>
                <td>2021-10-22</td>
              </tr>
            </tbody>
          </table>
          <p>
            Let’s remember that to include Analysis model into beacon the
            required properties are: 
            <ul>
              <li>id</li>
              <li>analysisDate</li>
              <li>pipelineName</li>
            </ul>
          </p>
          <p>
            Unfortunately, we don’t have any information about the pipelineName
            used, so we won’t be able to fill in the analysis model.
          </p>
          <h1 id="run-model-creation">Run model creation</h1>
          <p>
            This is the information we have available regarding the procedures
            used for sequencing a biosample.{" "}
          </p>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>Metadata field</b>
                </th>
                <th>
                  {" "}
                  <b>Content</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>biosampleID</td>
                <td>SAMEA10450712</td>
              </tr>
              <tr>
                <td>Experiment type</td>
                <td>Whole genome sequencing</td>
              </tr>
              <tr>
                <td>run creation date</td>
                <td>2021-10-22</td>
              </tr>
            </tbody>
          </table>
          <p>
            To fill in{" "}
            <a href="https://docs.genomebeacons.org/schemas-md/runs_defaultSchema/">
              {" "}
              Run model
            </a>{" "}
            we need at least the following properties:
            <ul>
              <li>id</li>
              <li>biosampleId</li>
              <li>runDate</li>
            </ul>
          </p>
          <p>
            It seems we’ll have enough data to include Runs into our beacon
            instance:{" "}
          </p>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>
                    Dataset Beacon
                    <br />
                    Model Term
                  </b>
                </th>
                <th>
                  {" "}
                  <b>
                    Property <br />
                    Type
                  </b>
                </th>
                <th>
                  <b>
                    EGA Metadata <br />
                    field
                  </b>
                </th>
                <th>
                  <b>Content</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>string</td>
                <td>stable_id</td>
                <td>EGAR00003021166</td>
              </tr>
              <tr>
                <td>biosampleId</td>
                <td>string</td>
                <td>biosampleID</td>
                <td>SAMEA10450712</td>
              </tr>
              <tr>
                <td>runDate</td>
                <td>string</td>
                <td>run creation</td>
                <td>2021-10-22</td>
              </tr>
              <tr>
                <td>libraryStrategy</td>
                <td>string</td>
                <td>Experiment type</td>
                <td>Whole genome sequencing</td>
              </tr>
            </tbody>
          </table>
          <p>
            But there are other terms from Runs that we can fill with the
            metadata we have available now, for example, from Dataset:
          </p>
          <table className="dockerTableSimple">
            <thead>
              <tr>
                <th>
                  <b>
                    Dataset Beacon
                    <br />
                    Model Term
                  </b>
                </th>
                <th>
                  {" "}
                  <b>
                    Property <br />
                    Type
                  </b>
                </th>
                <th>
                  <b>
                    EGA Metadata <br />
                    field
                  </b>
                </th>
                <th>
                  <b>Content</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>platform</td>
                <td>string</td>
                <td>Technology</td>
                <td>Illumina</td>
              </tr>
              <tr>
                <td>platformModel</td>
                <td>id,label</td>
                <td>Technology</td>
                <td>Illumina HiSeq 2000</td>
              </tr>
            </tbody>
          </table>
          <p>
            Take a look at the{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/blob/main/csv/examples/Rare-diseases/runs.csv">
              {" "}
              CSV
            </a>{" "}
            with all this information.
          </p>
          <h1 id="individual-model-from-phenopacket">
            Individual model from phenopacket
          </h1>
          <p>
            In{" "}
            <a href="https://metadata.ega-archive.org/analyses/EGAZ00001744003">
              {" "}
              EGAZ00001744003
            </a>{" "}
            we have a phenopacket with the following information: <br></br>{" "}
            Please save it to a file named{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/blob/main/phenopackets-to-BFF/rare-disease/case1c.json">
              {" "}
              Case1C.json.
            </a>
          </p>
          <div className="codeSnippet">
            <pre>
              <code>{`{
  "id": "P0007498",
  "subject": {
    "id": "P0007498",
    "dateOfBirth": "2013-01-01T00:00:00Z",
    "sex": "MALE"
  },
  "phenotypicFeatures": [
    {
      "excluded": true,
      "type": {
        "id": "HP:0001249",
        "label": "Intellectual disability"
      }
    },
    {
      "type": {
        "id": "HP:0000467",
        "label": "Neck muscle weakness"
      }
    },
    {
      "type": {
        "id": "HP:0001252",
        "label": "Muscular hypotonia"
      }
    },
    {
      "type": {
        "id": "HP:0001319",
        "label": "Neonatal hypotonia"
      }
    },
    {
      "type": {
        "id": "HP:0001374",
        "label": "Congenital hip dislocation"
      }
    },
    {
      "type": {
        "id": "HP:0002540",
        "label": "Inability to walk"
      }
    },
    {
      "type": {
        "id": "HP:0002783",
        "label": "Recurrent lower respiratory tract infections"
      }
    },
    {
      "type": {
        "id": "HP:0002804",
        "label": "Arthrogryposis multiplex congenita"
      }
    },
    {
      "type": {
        "id": "HP:0003202",
        "label": "Skeletal muscle atrophy"
      }
    },
    {
      "type": {
        "id": "HP:0005684",
        "label": "Distal arthrogryposis"
      }
    },
    {
      "type": {
        "id": "HP:0030319",
        "label": "Weakness of facial musculature"
      }
    }
  ],
  "diseases": [
    {
      "term": {
        "id": "Orphanet:97245",
        "label": "Congenital myopathy"
      }
    },
    {
      "term": {
        "id": "OMIM:117000",
        "label": "CENTRAL CORE DISEASE OF MUSCLE"
      }
    }
  ],
  "meta_data": {
    "created": "2021-04-21T09:32:38.488Z",
    "resources": [
      {
        "id": "hp",
        "name": "Human Phenotype Ontology",
        "url": "http://purl.obolibrary.org/obo/hp.owl",
        "version": "2020-12-07",
        "namespacePrefix": "HP",
        "iriPrefix": "http://purl.obolibrary.org/obo/HP_"
      },
      {
        "id": "orphanet",
        "name": "Orphanet Rare Disease Ontology",
        "url": "http://orpha.net/ontology/ORDO_en_3.1.owl",
        "version": "3.1",
        "namespacePrefix": "Orphanet",
        "iriPrefix": "http://www.orpha.net/ORDO/Orphanet_"
      },
      {
        "id": "hgnc",
        "name": "HUGO Gene Nomenclature Committee",
        "url": "https://www.genenames.org",
        "version": "2021-01-13",
        "namespacePrefix": "HGNC",
        "iriPrefix": "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/"
      },
      {
        "id": "mim",
        "name": "Online Mendelian Inheritance in Man",
        "url": "https://omim.org/",
        "version": "2021-01-21",
        "namespacePrefix": "OMIM",
        "iriPrefix": "https://omim.org/entry/"
      }
    ]
  }
}`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("phenopacket-snippet")}
              >
                {copySuccess["phenopacket-snippet"] ? (
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
          <p>
            Phenopackets v2 and the beacon schemas are only compatible for the
            biosamples and individual models. 
          </p>
          <p>
            In this example, this phenopacket contains only information for
            individuals, because the three mandatory terms for biosamples (id,
            biosampleStatus, sampleOriginType) are not present.
          </p>
          <h1 id="genomicVariations-model-from-VCF">
            genomicVariations model from VCF
          </h1>
          <p>
            Below, you’ll find a subset of 5 variants from{" "}
            <a href="https://metadata.ega-archive.org/analyses/EGAZ00001744017">
              EGAZ00001744017.
            </a>
            <br></br>
            Please, save the following information into a{" "}
            <em>Case1C_subset.vcf </em>
            file:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>{`##fileformat=VCFv4.2
##ALT=<ID=NON_REF,Description="Represents any possible alternative allele at this location">
##FILTER=<ID=LowQual,Description="Low quality">
##FORMAT=<ID=AD,Number=R,Type=Integer,Description="Allelic depths for the ref and alt alleles in the order listed">
##FORMAT=<ID=DP,Number=1,Type=Integer,Description="Approximate read depth (reads with MQ=255 or with bad mates are filtered)">
##FORMAT=<ID=GQ,Number=1,Type=Integer,Description="Genotype Quality">
##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">
##FORMAT=<ID=MIN_DP,Number=1,Type=Integer,Description="Minimum DP observed within the GVCF block">
##FORMAT=<ID=MQ0,Number=1,Type=Integer,Description="Number of Mapping Quality Zero Reads per sample">
##FORMAT=<ID=PGT,Number=1,Type=String,Description="Physical phasing haplotype information, describing how the alternate alleles are phased in relation to one another">
##FORMAT=<ID=PID,Number=1,Type=String,Description="Physical phasing ID information, where each unique ID within a given sample (but not across samples) connects records within a phasing group">
##FORMAT=<ID=PL,Number=G,Type=Integer,Description="Normalized, Phred-scaled likelihoods for genotypes as defined in the VCF specification">
##FORMAT=<ID=SB,Number=4,Type=Integer,Description="Per-sample component statistics which comprise the Fisher's Exact Test to detect strand bias.">
##GATKCommandLine.HaplotypeCaller=<ID=HaplotypeCaller,Version=3.6-0-g89b7209,Date="Thu Mar 23 15:53:02 CET 2017",Epoch=1490280782918,CommandLineOptions="analysis_type=HaplotypeCaller input_file=[/scratch/production/slaurie/PlatinumTrioForRD-Connect/HapMapTrio/gVCF/Case1C/E012882.bam] showFullBamList=false read_buffer_size=null read_filter=[BadCigar] disable_read_filter=[] intervals=[21] excludeIntervals=null interval_set_rule=UNION interval_merging=ALL interval_padding=0 reference_sequence=/project/production/Indexes/samtools/hsapiens.hs37d5.fasta nonDeterministicRandomSeed=false disableDithering=false maxRuntime=-1 maxRuntimeUnits=MINUTES downsampling_type=NONE downsample_to_fraction=null downsample_to_coverage=null baq=OFF baqGapOpenPenalty=40.0 refactor_NDN_cigar_string=false fix_misencoded_quality_scores=false allow_potentially_misencoded_quality_scores=false useOriginalQualities=false defaultBaseQualities=-1 performanceLog=null BQSR=null quantize_quals=0 static_quantized_quals=null round_down_quantized=false disable_indel_quals=false emit_original_quals=false preserve_qscores_less_than=6 globalQScorePrior=-1.0 validation_strictness=SILENT remove_program_records=false keep_program_records=false sample_rename_mapping_file=null unsafe=null disable_auto_index_creation_and_locking_when_reading_rods=false no_cmdline_in_header=false sites_only=false never_trim_vcf_format_field=true bcf=false bam_compression=null simplifyBAM=false disable_bam_indexing=false generate_md5=false num_threads=1 num_cpu_threads_per_data_thread=1 num_io_threads=0 monitorThreadEfficiency=false num_bam_file_handles=null read_group_black_list=null pedigree=[] pedigreeString=[] pedigreeValidationType=STRICT allow_intervals_with_unindexed_bam=false generateShadowBCF=false variant_index_type=LINEAR variant_index_parameter=128000 reference_window_stop=0 phone_home= gatk_key=null tag=NA logging_level=INFO log_to_file=null help=false version=false likelihoodCalculationEngine=PairHMM heterogeneousKmerSizeResolution=COMBO_MIN dbsnp=(RodBinding name= source=UNBOUND) dontTrimActiveRegions=false maxDiscARExtension=25 maxGGAARExtension=300 paddingAroundIndels=150 paddingAroundSNPs=20 comp=[] annotation=[AlleleBalance, BaseCounts, BaseQualityRankSumTest, ChromosomeCounts, ClippingRankSumTest, Coverage, DepthPerAlleleBySample, DepthPerSampleHC, FisherStrand, GCContent, HaplotypeScore, HardyWeinberg, HomopolymerRun, ClippingRankSumTest, LikelihoodRankSumTest, LowMQ, MappingQualityRankSumTest, MappingQualityZero, MappingQualityZeroBySample, NBaseCount, QualByDepth, RMSMappingQuality, ReadPosRankSumTest, StrandBiasBySample, StrandOddsRatio, VariantType, StrandBiasBySample] excludeAnnotation=[ChromosomeCounts, FisherStrand, StrandOddsRatio, QualByDepth] group=[StandardAnnotation, StandardHCAnnotation] debug=false useFilteredReadsForAnnotations=false emitRefConfidence=GVCF bamOutput=null bamWriterType=CALLED_HAPLOTYPES emitDroppedReads=false disableOptimizations=false annotateNDA=false heterozygosity=0.001 indel_heterozygosity=1.25E-4 standard_min_confidence_threshold_for_calling=-0.0 standard_min_confidence_threshold_for_emitting=-0.0 max_alternate_alleles=6 max_num_PL_values=100 input_prior=[] sample_ploidy=2 genotyping_mode=DISCOVERY alleles=(RodBinding name= source=UNBOUND) contamination_fraction_to_filter=0.0 contamination_fraction_per_sample_file=null p_nonref_model=null exactcallslog=null output_mode=EMIT_VARIANTS_ONLY allSitePLs=true gcpHMM=10 pair_hmm_implementation=VECTOR_LOGLESS_CACHING pair_hmm_sub_implementation=ENABLE_ALL always_load_vector_logless_PairHMM_lib=false phredScaledGlobalReadMismappingRate=45 noFpga=false sample_name=null kmerSize=[10, 25] dontIncreaseKmerSizesForCycles=false allowNonUniqueKmersInRef=false numPruningSamples=1 recoverDanglingHeads=false doNotRecoverDanglingBranches=false minDanglingBranchLength=4 consensus=false maxNumHaplotypesInPopulation=128 errorCorrectKmers=false minPruning=2 debugGraphTransformations=false allowCyclesInKmerGraphToGeneratePaths=false graphOutput=null kmerLengthForReadErrorCorrection=25 minObservationsForKmerToBeSolid=20 GVCFGQBands=[20, 25, 30, 35, 40, 45, 50, 70, 90, 99] indelSizeToEliminateInRefModel=10 min_base_quality_score=10 includeUmappedReads=false useAllelesTrigger=false doNotRunPhysicalPhasing=false keepRG=null justDetermineActiveRegions=false dontGenotype=false dontUseSoftClippedBases=false captureAssemblyFailureBAM=false errorCorrectReads=false pcr_indel_model=CONSERVATIVE maxReadsInRegionPerSample=10000 minReadsPerAlignmentStart=10 mergeVariantsViaLD=false activityProfileOut=null activeRegionOut=null activeRegionIn=null activeRegionExtension=null forceActive=false activeRegionMaxSize=null bandPassSigma=null maxProbPropagationDistance=50 activeProbabilityThreshold=0.002 min_mapping_quality_score=20 filter_reads_with_N_cigar=false filter_mismatching_base_and_quals=false filter_bases_not_stored=false">
##GVCFBlock0-20=minGQ=0(inclusive),maxGQ=20(exclusive)
##GVCFBlock20-25=minGQ=20(inclusive),maxGQ=25(exclusive)
##GVCFBlock25-30=minGQ=25(inclusive),maxGQ=30(exclusive)
##GVCFBlock30-35=minGQ=30(inclusive),maxGQ=35(exclusive)
##GVCFBlock35-40=minGQ=35(inclusive),maxGQ=40(exclusive)
##GVCFBlock40-45=minGQ=40(inclusive),maxGQ=45(exclusive)
##GVCFBlock45-50=minGQ=45(inclusive),maxGQ=50(exclusive)
##GVCFBlock50-70=minGQ=50(inclusive),maxGQ=70(exclusive)
##GVCFBlock70-90=minGQ=70(inclusive),maxGQ=90(exclusive)
##GVCFBlock90-99=minGQ=90(inclusive),maxGQ=99(exclusive)
##GVCFBlock99-2147483647=minGQ=99(inclusive),maxGQ=2147483647(exclusive)
##INFO=<ID=ABHet,Number=1,Type=Float,Description="Allele Balance for heterozygous calls (ref/(ref+alt))">
##INFO=<ID=ABHom,Number=1,Type=Float,Description="Allele Balance for homozygous calls (A/(A+O)) where A is the allele (ref or alt) and O is anything other">
##INFO=<ID=BaseCounts,Number=4,Type=Integer,Description="Counts of each base">
##INFO=<ID=BaseQRankSum,Number=1,Type=Float,Description="Z-score from Wilcoxon rank sum test of Alt Vs. Ref base qualities">
##INFO=<ID=ClippingRankSum,Number=1,Type=Float,Description="Z-score From Wilcoxon rank sum test of Alt vs. Ref number of hard clipped bases">
##INFO=<ID=DP,Number=1,Type=Integer,Description="Approximate read depth; some reads may have been filtered">
##INFO=<ID=DS,Number=0,Type=Flag,Description="Were any of the samples downsampled?">
##INFO=<ID=END,Number=1,Type=Integer,Description="Stop position of the interval">
##INFO=<ID=ExcessHet,Number=1,Type=Float,Description="Phred-scaled p-value for exact test of excess heterozygosity">
##INFO=<ID=GC,Number=1,Type=Float,Description="GC content around the variant (see docs for window size details)">
##INFO=<ID=HRun,Number=1,Type=Integer,Description="Largest Contiguous Homopolymer Run of Variant Allele In Either Direction">
##INFO=<ID=HW,Number=1,Type=Float,Description="Phred-scaled p-value for Hardy-Weinberg violation">
##INFO=<ID=HaplotypeScore,Number=1,Type=Float,Description="Consistency of the site with at most two segregating haplotypes">
##INFO=<ID=InbreedingCoeff,Number=1,Type=Float,Description="Inbreeding coefficient as estimated from the genotype likelihoods per-sample when compared against the Hardy-Weinberg expectation">
##INFO=<ID=LikelihoodRankSum,Number=1,Type=Float,Description="Z-score from Wilcoxon rank sum test of Alt Vs. Ref haplotype likelihoods">
##INFO=<ID=LowMQ,Number=3,Type=Float,Description="3-tuple: <fraction of reads with MQ=0>,<fraction of reads with MQ<=10>,<total number of reads>">
##INFO=<ID=MLEAC,Number=A,Type=Integer,Description="Maximum likelihood expectation (MLE) for the allele counts (not necessarily the same as the AC), for each ALT allele, in the same order as listed">
##INFO=<ID=MLEAF,Number=A,Type=Float,Description="Maximum likelihood expectation (MLE) for the allele frequency (not necessarily the same as the AF), for each ALT allele, in the same order as listed">
##INFO=<ID=MQ,Number=1,Type=Float,Description="RMS Mapping Quality">
##INFO=<ID=MQ0,Number=1,Type=Integer,Description="Total Mapping Quality Zero Reads">
##INFO=<ID=MQRankSum,Number=1,Type=Float,Description="Z-score From Wilcoxon rank sum test of Alt vs. Ref read mapping qualities">
##INFO=<ID=OND,Number=1,Type=Float,Description="Overall non-diploid ratio (alleles/(alleles+non-alleles))">
##INFO=<ID=PercentNBase,Number=1,Type=Float,Description="Percentage of N bases in the pileup">
##INFO=<ID=RAW_MQ,Number=1,Type=Float,Description="Raw data for RMS Mapping Quality">
##INFO=<ID=ReadPosRankSum,Number=1,Type=Float,Description="Z-score from Wilcoxon rank sum test of Alt vs. Ref read position bias">
##INFO=<ID=VariantType,Number=1,Type=String,Description="Variant type description">
##contig=<ID=21,length=48129895>
##reference=file:///project/production/Indexes/samtools/hsapiens.hs37d5.fasta
#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	Case1C
21	9411635	.	C	T	49.77	.	BaseQRankSum=0.420;ClippingRankSum=0.000;DP=21;ExcessHet=3.0103;LikelihoodRankSum=-0.537;MLEAC=1,0;MLEAF=0.500,0.00;MQ0=0;MQRankSum=-1.786;RAW_MQ=42918.00;ReadPosRankSum=1.162	GT:AD:DP:GQ:PL:SB	0/1:17,4,0:21:78:78,0,544,129,556,685:8,9,4,0
21	9411732	.	T	G	823.77	.	DP=25;ExcessHet=3.0103;MLEAC=2,0;MLEAF=1.00,0.00;MQ0=0;RAW_MQ=67833.00	GT:AD:DP:GQ:PL:SB	1/1:0,25,0:25:75:852,75,0,852,75,852:0,0,14,11
21	9411931	.	G	A	104.77	.	BaseQRankSum=-0.873;ClippingRankSum=0.000;DP=27;ExcessHet=3.0103;LikelihoodRankSum=-0.375;MLEAC=1,0;MLEAF=0.500,0.00;MQ0=0;MQRankSum=-3.169;RAW_MQ=65235.00;ReadPosRankSum=0.657	GT:AD:DP:GQ:PGT:PID:PL:SB	0/1:22,5,0:27:99:0|1:9411931_G_A:133,0,874,199,889,1087:11,11,0,5
21	9411949	.	T	C	55.77	.	BaseQRankSum=1.914;ClippingRankSum=0.000;DP=29;ExcessHet=3.0103;LikelihoodRankSum=-0.063;MLEAC=1,0;MLEAF=0.500,0.00;MQ0=0;MQRankSum=-3.040;RAW_MQ=73991.00;ReadPosRankSum=-1.787	GT:AD:DP:GQ:PGT:PID:PL:SB	0/1:25,4,0:29:84:0|1:9411931_G_A:84,0,1132,168,1144,1312:12,13,0,4
21	9411965	.	T	C	0.01	.	BaseQRankSum=0.337;ClippingRankSum=0.000;DP=30;ExcessHet=3.0103;LikelihoodRankSum=-1.995;MLEAC=0,0;MLEAF=0.00,0.00;MQ0=0;MQRankSum=-2.589;RAW_MQ=90291.00;ReadPosRankSum=-2.080	GT:AD:DP:GQ:PGT:PID:PL:SB	0/0:28,2,0:30:0:0|1:9411931_G_A:0,0,1105,84,1111,1195:11,17,0,2
`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("vcf-snippet")}
              >
                {copySuccess["vcf-snippet"] ? (
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
          <p>And then, compress it:</p>
          <div className="codeSnippet">
            <pre>
              <code>bgzip Case1C_subset.vcf</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("compress-vcf")}
              >
                {copySuccess["compress-vcf"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <h1 id="conversion-of-CSV-penopacket-and-VCF-to-BFF">
            Conversion of CSV, Penopacket and VCF to BFF
          </h1>
          <p>
            At this point we have information ready to create 4 beacon models: 
            <ul>
              <li>dataset.csv</li>
              <li>run.csv</li>
              <li>phenopacket v2</li>
              <li>VCF for genomicVariations</li>
            </ul>
          </p>
          <p>Now, let’s convert them to Beacon Friendly Format (BFF).</p>
          <h6 className="sub-title">
            Installing Beacon 2 Production Implementation API and
            beacon2-ri-tools-v2
          </h6>
          <p>
            Before starting, you should have installed:
            <ul>
              <li>
                <a
                  href="https://docs.docker.com/engine/install/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docker
                </a>
              </li>
              <li>
                <a
                  href="https://docs.docker.com/compose/install/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docker Compose
                </a>
              </li>
            </ul>
          </p>
          <p>
            First, let’s clone the beacon production implementation repository
            in your system:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                git clone{" "}
                <a
                  href="https://github.com/EGA-archive/beacon2-pi-api.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/EGA-archive/beacon2-pi-api.git
                </a>
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("cloning-repository")}
              >
                {copySuccess["cloning-repository"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p className="paragraph-ports">
            Make sure the next list of ports are free of use in your system:
          </p>
          <ul>
            <li>27017 → mongo</li>
            <li>5050 → beacon</li>
          </ul>
          <p>And now let’s build all the necessary containers:</p>
          <div className="codeSnippet">
            <pre>
              <code>docker compose up -d --build </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("docker-compose")}
              >
                {copySuccess["docker-compose"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            By cloning and building the Beacon 2 Production Implementation
            repository we have downloaded the tools that will deploy our beacon
            and the{" "}
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2">
              beacon2-ri-tools-v2
            </a>
            , a toolkit that will allow you to populate your own beacon in the
            easiest way possible, by using CSVs and directly reading variant
            information from a VCF.
          </p>
          <p>
            Let’s check if the building was correct. Run the following command:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>docker ps</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("docker-ps")}
              >
                {copySuccess["docker-ps"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            This command will show all the running containers in your computer.
            You should have built: 
          </p>
          <table className="dockerTable">
            <thead>
              <tr>
                <th>Image</th>
                <th>Names</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>
                        ghcr.io/ega-archive/beacon2-ri-tools-v2:latest
                      </code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("img-ri-tools")}
                      >
                        {copySuccess["img-ri-tools"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>ri-tools</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("name-ri-tools")}
                      >
                        {copySuccess["name-ri-tools"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>
                        ghcr.io/ega-archive/phenopackets-to-bff:latest
                      </code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("img-phenopackets")}
                      >
                        {copySuccess["img-phenopackets"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>phenopackets-to-BFF</code>

                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("name-phenopackets")}
                      >
                        {copySuccess["name-phenopackets"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>mongo-express</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("img-mongo-express")}
                      >
                        {copySuccess["img-mongo-express"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>beacon2-pi-api-mongo-express-1</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("name-mongo-express")}
                      >
                        {copySuccess["name-mongo-express"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>
                        ghcr.io/ega-archive/beacon2-ri-postgres-v2:latest
                      </code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("img-postgres")}
                      >
                        {copySuccess["img-postgres"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>idp-db</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("name-postgres")}
                      >
                        {copySuccess["name-postgres"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>beacon2-pi-api-beaconprod</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("img-beaconprod")}
                      >
                        {copySuccess["img-beaconprod"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
                <td>
                  <div className="codeSnippet">
                    <pre>
                      <code>beaconprod</code>
                      <button
                        className="copyButtonCode"
                        onClick={() => copyToClipboard("name-beaconprod")}
                      >
                        {copySuccess["name-beaconprod"] ? (
                          "Copied!"
                        ) : (
                          <img
                            src={copyIcon}
                            alt="Copy"
                            className="copySymbol"
                          />
                        )}
                      </button>
                    </pre>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h6 className="sub-title">Setting up conf.py</h6>

          <p>
            This will be the content that you find in
            beacon2-ri-tools-v2/conf/conf.py:
          </p>

          <div className="codeSnippet">
            <pre>
              <code>
                {`#### Input and Output files config parameters ####
csv_folder = './csv/use_case_RD/'
output_docs_folder='./output_docs/use_case_RD_output/'

#### VCF Conversion config parameters ####
allele_counts=False # Variable still in test, leave it as False for now.
reference_genome='GRCh37' # Choose one between NCBI36, GRCh37, GRCh38
datasetId='EGAD00001008392'
case_level_data=False
exact_heterozygosity=False
num_rows=5
verbosity=False # This variable, if True, will make the program run slower but give logs about all the skipped variants and the reason why.`}
              </code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("conversionConfigRD")}
              >
                {copySuccess["conversionConfigRD"] ? (
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
          <p>
            Let’s start at the beginning of the file with the parameters for the
            CSV conversion.
          </p>
          <ul>
            <li>
              Create a folder named <em>use_case_RD</em> in <em>./csv/</em>  and
              move the <em>dataset.csv</em> and  <em>run.csv</em> there, this
              will be the CSV converted to BFF.  Please, make sure to end the
              path with a slash (<em>/</em>). 
            </li>
          </ul>
          <ul>
            <li>
              Create another folder where the output BFF will be saved. Let’s
              name it <em>use_case_RD_output</em> inside the folder
              <em>./output_docs/</em>
              . 
            </li>
          </ul>
          <p>Let’s continue with the parameters for the VCF. </p>
          <ul>
            <li>
              From the header of the VCF we know that the variants belong to
              GRCh37. 
            </li>
          </ul>
          <ul>
            <li>
              <em>datasetId</em> must match the ID in the <em>dataset.csv</em>{" "}
              for the mapping of the variant and metadata to be correct. So, in
              our case we need to fill in datasetID as EGAD00001008392. 
            </li>
          </ul>
          <ul>
            <li>
              The <em>case_level_data</em> is a boolean parameter (True or
              False) which will relate your variants to the samples they belong
              to. As we don’t have the biosamples schema, let’s set it as
              False. 
            </li>
          </ul>
          <ul>
            <li>
              The <em>exact_heterozygosity</em> is a boolean parameter (True or
              False) that, in case case_level_data is True, then, it will
              classify the biosamples as being heterozygous for either the
              reference or the alternate allele. As in our case case_level_data
              is false, let’s set exact_heterozygosity as False too. 
            </li>
          </ul>
          <ul>
            <li>
              Fill in <em>num_rows</em> with a 5, as we only have 5 variants in
              our VCF.
            </li>
          </ul>
          <h6 className="sub-title">Conversion from CSV</h6>
          <p>
            As we have already moved our CSVs to the <em>./csv/use_case_RD/</em>{" "}
            we only need to run: 
          </p>
          <div className="codeSnippet">
            <pre>
              <code>docker exec -it ri-tools python csv_to_bff.py</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("convert-all")}
              >
                {copySuccess["convert-all"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            In the folder <em>./output_docs/use_case_RD_output/</em> will find
            two json. These files contain our run and dataset information in
            Beacon Friendly Format. 
          </p>
          <h6 className="sub-title">Conversion from Phenopacket</h6>
          <p>
            Let’s save the <em>Case1C.json</em> in
            <em>./beacon2-ri-tools-v2/phenopackets-to-BFF</em> folder and then
            run:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>
                docker exec phenopackets-to-BFF python working-w-phenopackets.py
                /usr/src/app/examples/case1c.json EGAD00001008392
              </code>
              <button
                className="copyButtonCode"
                onClick={() =>
                  copyToClipboard("phenopacket-to-bff-case1c-command")
                }
              >
                {copySuccess["phenopacket-to-bff-case1c-command"] ? (
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
              Bear in mind that the path cannot be changed. Replace only the
              name of the phenopacket, once it has been copied in
              phenopackets-to-BFF folder.
            </div>
          </p>
          <p>
            Make sure to add the same datasetID as in the dataset model. This
            will allow the correct link between the phenopackets information and
            the dataset it belongs to.
          </p>
          <p>
            If everything works as expected your terminal output should look
            like: 
          </p>
          <div className="codeSnippet">
            <pre>
              <code>{`The mandatory fields for BioSamples were not present in the phenopacket 
Mandatory properties for Individual schema (id and sex) present in the phenopacket.
-> Creating Individuals schema ...
    - diseases added to Individuals
    - phenotypicFeatures added to Individuals
-> Creating Individuals schema - DONE
+ BFFs Individuals JSON saved in:  
/beacon2-pi-api/ri-tools/phenopackets-to-BFF/case1c.json`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("phenopacket-output")}
              >
                {copySuccess["phenopacket-output"] ? (
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
          <p>
            You’ll find your phenopacket in  
            <a href="https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/phenopackets-to-BFF">
              phenopackets-to-BFF.
            </a>
          </p>
          <h6 className="sub-title">Conversion from VCF</h6>
          <p>First, let’s move the VCF to the correct folder: </p>
          <div className="codeSnippet">
            <pre>
              <code>{`./beacon2-pi-api/ri-tools/files/vcf/files_to_read/case1C_subset.vcf.gz`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("vcf-file-path")}
              >
                {copySuccess["vcf-file-path"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>And now, run the conversion command from VCF to BFF: </p>
          <div className="codeSnippet">
            <pre>
              <code>{`docker exec -it ri-tools python genomicVariations_vcf.py`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("genomic-variations")}
              >
                {copySuccess["genomic-variations"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>If everything ran correctly, this will be your output: </p>
          <div className="codeSnippet">
            <pre>
              <code>{`files/vcf/files_to_read/case1C_subset.vcf.gz
100% | 5/5 [00:00<00:00, 6603.12it/s]
Successfully inserted 5 records into beacon
A total of 5 variants were processed
A total of 0 variants were skipped`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("vcf-import-output")}
              >
                {copySuccess["vcf-import-output"] ? (
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
              If the conversion of the variants is not working as expected
              modify the conf.py and set verbosity = True, this will give you
              information about which variants are being included and why. If
              your VCF doesn't have allele frequency information and all your
              variants were skipped because none of the populations had allele
              frequency greater than 0 go to
              ri-tools/pipelines/default/templates and ensure in
              populations.json the numberOfPopulations is set to 0. If your VCF
              does contain allele frequency fields but they are still being
              ignored, the issue may be due to mismatched field names. Make sure
              the field names in your VCF <b>exactly match</b> those defined in
              ri-tools/pipelines/default/templates/populations.json.
            </div>
          </p>
          <p>
            The VCF was converted into BFF and saved in a MongoDB. Let’s extract
            the variants to insert them into our beacon:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>{`docker exec mongoprod mongoexport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --collection genomicVariations > ri-tools/output_docs/genomicVariations.json`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("mongoexport-genomicVariations")}
              >
                {copySuccess["mongoexport-genomicVariations"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <p>
            Modify the output path so it works on your computer. In this case,
            we’ve saved it with the BFFs converted from CSV.
          </p>
          <h1 id="deploying-a-beacon-2-production-implementation-api">
            Deploying a Beacon 2 production implementation API
          </h1>
          <p>
            Now that we have all the data ready let’s start with the
            deployment. <br></br>
            First, we’ll make three important steps for the configuration of the
            beacon: 
            <ul>
              <li>Create our own landing page</li>
              <li>Add the right permission for our dataset </li>
              <li>Move our BFF to the correct folder</li>
            </ul>
          </p>
          <p>
            To know about further settings, please visit the{" "}
            <a href="https://beacon-documentation-demo.ega-archive.org/configuration">
              {" "}
              Configuration section.
            </a>
          </p>
          <h6 className="sub-title">Personalize info entry point</h6>
          <p>
            The info entry point will be the landing page of your beacon, found
            at <a href="http://localhost:5050/api">http://localhost:5050/api</a>
            .
          </p>
          <p>
            To modify the information shown you’ll need to update the
            ./beacon2-pi-api/beacon/conf/conf.py <br></br>
            Our conf.py would look something like:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>{`beacon_id = 'org.ega-archive.beacon-ri-demo'

beacon_name = 'Beacon Reference Implementation: Rare Diseases Use Case'

api_version = 'v2.0.0'

uri = 'https://beacon-apis-demo.ega-archive.org/api/'

org_id = 'EGA'

org_name = 'European Genome-Phenome Archive (EGA)'

org_description = 'The European Genome-phenome Archive (EGA) is a service for permanent archiving and sharing of all types of personally identifiable genetic and phenotypic data resulting from biomedical research projects.'

org_adress = 'C/ Dr. Aiguader, 88
PRBB Building
08003 Barcelona, Spain'

org_welcome_url = 'https://ega-archive.org/'

org_contact_url = 'mailto:beacon.ega@crg.eu'

org_logo_url = 'https://legacy.ega-archive.org/images/logo.png'

org_info = ''

description = "This Beacon is based on synthetic data hosted at the EGA. It contains information from one sample from EGAD00001008392"

version = 'v2.0'

welcome_url = 'https://ega-archive.org/datasets/EGAD00001008392'

alternative_url = 'https://beacon-apis-demo.ega-archive.org/api/'

create_datetime = '2025-05-12T12:00:00.000000'

update_datetime = ''`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("beacon-ri-metadata")}
              >
                {copySuccess["beacon-ri-metadata"] ? (
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

          <h6 className="sub-title">Managing dataset permissions</h6>
          <p>
            There are 3 possible levels of beacon security for a dataset:
            public, registered and controlled.
            <ul>
              <li>
                A <b>public dataset</b> is a dataset that will be returned in a
                beacon query without an authentication token.
              </li>
              <li>
                A <b>registered dataset</b> is a dataset that will be shown
                after a user sends a valid token (in other words, is logged in).
              </li>
              <li>
                A <b>controlled dataset</b> is a dataset that needs a user to
                send a valid token for authentication and the user needs to be
                allowed to query that dataset.
              </li>
            </ul>
          </p>
          <p>
            As our data is synthetic and has no control access demand, we’ll add
            our dataset as a public dataset into the beacon. 
          </p>
          <p>
            For this, first we’ll need to edit the .yml inside
            ./beacon2-pi-api/beacon/permissions/datasets. As we have decided
            that EGAD00001008392 will be of public access let’s edit
            public_datasets.yml:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>{`public_datasets:
- EGAD00001008392`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("public-datasets")}
              >
                {copySuccess["public-datasets"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>
          <h6 className="sub-title">Move the BFF for the insertion</h6>
          <p>
            Let’s prepare the data for the insertion. Edit the following
            Makefile: <br></br>
            <em>/beacon/connections/mongo/Makefile</em>
          </p>
          <p>And point the paths to your BFF files.</p>
          <p className="wider-note">
            <img
              className="note-symbol-wider"
              src="/note-symbol.png"
              alt="Note symbol"
            />
            <div>
              Bear in mind that if you don’t modify the commands in the Makefile
              the files must be named as: {" "}
              <ul>
                <li>analyses.json</li>
                <li>biosamples.json</li>
                <li>genomicVariations.json</li>
                <li>individuals.json</li>
                <li>runs.json</li>
                <li>cohorts.json</li>
                <li>datasets.json</li>
              </ul>
            </div>
          </p>
          <h6 className="sub-title">Deploy a beacon instance</h6>
          <p>Finally, simply run:</p>
          <div className="codeSnippet">
            <pre>
              <code>{`bash mongostart.sh`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("bash-mongostart")}
              >
                {copySuccess["bash-mongostart"] ? (
                  "Copied!"
                ) : (
                  <img className="copySymbol" src={copyIcon} alt="Copy" />
                )}
              </button>
            </pre>
          </div>

          <p>
            If the operation is successful, you will have your beacon up and
            running at{" "}
            <a
              href="http://localhost:5050/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:5050/api
            </a>
            .
          </p>

          <img
            className="relationship-elements"
            alt="Relationship-elements"
            src="/beaconInstanceSchema.svg"
          />
          <h6 className="sub-title">Filtering Terms</h6>
          <p>
            Filtering terms are metadata fields that allow users to query your
            Beacon more precisely — for example, by filtering results based on
            sequencing strategy (libraryStrategy), tissue type, disease, or
            other structured attributes. These terms often rely on ontologies to
            ensure consistent vocabulary across datasets.
          </p>
          <p>
            As we have some ontology fields, let’s create the filtering terms
            for our beacon. We’ll populate the /filteringTerms endpoint
            automatically by running:
          </p>
          <div className="codeSnippet">
            <pre>
              <code>{`docker exec beaconprod python -m beacon.connections.mongo.extract_filtering_terms`}</code>
              <button
                className="copyButtonCode"
                onClick={() => copyToClipboard("extract-filtering-terms")}
              >
                {copySuccess["extract-filtering-terms"] ? (
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
               If you want to add new filtering terms manually or enhance
              ontology filtering with descendants and semantic similarities,
              please visit the{" "}
              <a href="https://beacon-documentation-demo.ega-archive.org/filtering-terms">
                Filtering Terms
              </a>{" "}
              section.
            </div>
          </p>

          <h1>Acknowledgments</h1>
          <p>
            We acknowledge the use of data from the{" "}
            <a href="https://platform.rd-connect.eu/#/">
              RD-Connect Genome-Phenome Analysis Platform
            </a>
            . This work was supported by the European Commission H2020 projects
            EJP-RD (grant number 825575) and B1MG (grant number 951724), as well
            as the Generalitat de Catalunya VEIS project (grant number
            001-P-001647).
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

export default UseCase;
