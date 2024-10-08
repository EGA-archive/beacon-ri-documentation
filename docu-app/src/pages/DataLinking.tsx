import './DataLinking.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import copyIcon from '../assets/copy-symbol.png'

const DataLinking = () => {
  const location = useLocation()

  // State to manage copy success for each snippet independently
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1))
        if (element) {
          const yOffset = -80 // Adjust this value based on your header height
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 0)
    }
  }, [location])

  const copyToClipboard = (snippetId: string) => {
    const textToCopy = {
      'linking-ids': `dataset_name: ["individualId1", "individualId2", "biosampleId1", "biosampleId2"]\ncohort_name: ["individualId1", "individualId2", "biosampleId1", "biosampleId2"]`,
      'extract-filtering-terms':
        'docker exec beacon python beacon/db/extract_filtering_terms.py',
      'manual-filtering-terms': `db.filtering_terms.insertMany([{ "type": "alphanumeric", "id": "libraryStrategy", "scope": [ "runs"] }])`,
      'conf-py': `alphanumeric_terms = ['libraryStrategy', 'molecularAttributes.geneIds', 'diseases.ageOfOnset.iso8601duration']`,
      'get-descendants':
        'docker exec beacon python beacon/db/get_descendants.py'
    }[snippetId]

    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopySuccess(prevState => ({
            ...prevState,
            [snippetId]: true
          }))
          setTimeout(
            () =>
              setCopySuccess(prevState => ({
                ...prevState,
                [snippetId]: false
              })),
            1500
          ) // Reset copy success after 1.5 seconds
        })
        .catch(error => console.log(error))
    }
  }

  return (
    <div className='dataLinkingContainer'>
      <h3>Beacon 2 RI API</h3>
      <h1>Data Linking</h1>

      <h2 id='linking-ids'>Linking ids to dataset and cohort</h2>
      <p>
        In case your data is split by dataset or cohort, you will need to tell
        beacon which biosample ids and which individual ids belong to which
        dataset.
      </p>
      <p>
        Edit the file datasets.yml that is inside beacon/request folder and
        write the dataset with an array of all the ids (for individuals and
        biosamples together).
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>
            dataset_name: ["individualId1", "individualId2", "biosampleId1",
            "biosampleId2"] cohort_name: ["individualId1", "individualId2",
            "biosampleId1", "biosampleId2"]
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('linking-ids')}
          >
            {copySuccess['linking-ids'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>
      <p className='note'>
        <img className='note-symbol' src='/note-symbol.png' alt='Note symbol' />
        <div>
          The dataset_name and cohort_name have to be identical as how
          is spelled the id for the dataset or cohort in the BFF record.
        </div>
      </p>

      <h2 id='extract-filtering-terms'>Extract filtering terms</h2>
      <p>
        To automatically fill in the filtering terms endpoint and be able to
        apply the ontologies that are found inside your data to query your
        beacon, please execute the next script:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>
            docker exec beacon python beacon/db/extract_filtering_terms.py
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('extract-filtering-terms')}
          >
            {copySuccess['extract-filtering-terms'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <h2 id='manual-filtering-terms'>
        Manually adding filtering terms (optional)
      </h2>
      <p>
        To manually add filtering terms to your beacon, you will need to add
        them in your mongodb, by executing the next command, for example, for an
        alphanumeric term that applies to the libraryStrategy field for the runs
        collection:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>
            db.filtering_terms.insertMany([{'{'} "type": "alphanumeric", "id":
            "libraryStrategy", "scope": [ "runs"] {'}'}])
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('manual-filtering-terms')}
          >
            {copySuccess['manual-filtering-terms'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>
      <p>
        After that, you will need to specify that this alphanumeric term is not
        related to an ontology by editing the conf.py inside beacon and deploy
        folder in the alphanumeric_terms array:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>
            alphanumeric_terms = ['libraryStrategy',
            'molecularAttributes.geneIds',
            'diseases.ageOfOnset.iso8601duration']
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('conf-py')}
          >
            {copySuccess['conf-py'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <h2 id='get-descendants'>Get descendant terms (optional)</h2>
      <p>
        If you have extracted filtering terms. in case you wish to add
        information about the descendant terms and similarity found for each
        ontology and be able to use the similarity and descendant terms beacon
        options, please execute the next script:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>docker exec beacon python beacon/db/get_descendants.py</code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('get-descendants')}
          >
            {copySuccess['get-descendants'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>
    </div>
  )
}

export default DataLinking
