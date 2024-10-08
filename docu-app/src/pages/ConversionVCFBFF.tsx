import './ConversionVCFBFF.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import copyIcon from '../assets/copy-symbol.png'

const ConversionVCFBFF = () => {
  const location = useLocation()

  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1))
        if (element) {
          const yOffset = -80
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 0)
    }
  }, [location])

  const copyToClipboard = (snippetId: string, textToCopy: string) => {
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
        )
      })
      .catch(error => console.log(error))
  }

  return (
    <div className='conversionContainer'>
      <h3>Beacon 2 RI Tools</h3>
      <h1>Conversion from VCF to BFF</h1>
      <p>
        If you do not want to fill the CSV file for the{' '}
        <code>genomicVariations</code> collection or you already have your data
        in the VCF format, you can convert directly from VCF to BFF.
      </p>
      <p>
        To convert data from a VCF file to BFF (json), the VCF must be
        compressed and indexed (<code>.vcf.gz</code> + <code>.vcf.gz.tbi</code>
        ). Beacon2 RI tools v2 will read all the VCF files inside the{' '}
        <a
          href='https://github.com/EGA-archive/beacon2-ri-tools-v2/tree/main/files/vcf/files_to_read'
          target='_blank'
          rel='noopener noreferrer'
        >
          files_to_read
        </a>{' '}
        folder. You can convert one or multiple VCF files at a time.
      </p>
      <p>To execute the conversion, use the next command:</p>

      <div className='codeSnippet'>
        <pre>
          <code>docker exec -it ri-tools python genomicVariations_vcf.py</code>
          <button
            className='copyButtonCode'
            onClick={() =>
              copyToClipboard(
                'vcfConversion',
                'docker exec -it ri-tools python genomicVariations_vcf.py'
              )
            }
          >
            {copySuccess['vcfConversion'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <p>
        This command will do the conversion from VCF to BFF and will load the
        final BFF documents into a MongoDB inside a container. This is done for
        memory size usage.
      </p>

      <p>
        After that, if needed, export your documents from the MongoDB to your
        machine as a BFF file (json) using one of the following commands:
      </p>

      <ul>
        <li>
          The first command will delete an internal <code>"_id"</code> for each
          record that is generated by MongoDB:
          <div className='codeSnippet'>
            <pre>
              <code>
                docker exec ri-tools-mongo mongoexport --jsonArray --uri
                "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin"
                --collection genomicVariations | sed '/"_id":/s/"_id":[^,]*,//g'
                &gt; genomicVariations.json
              </code>
              <button
                className='copyButtonCode'
                onClick={() =>
                  copyToClipboard(
                    'exportWithoutId',
                    'docker exec ri-tools-mongo mongoexport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --collection genomicVariations | sed \'/"_id":/s/"_id":[^,]*,//g\' &gt; genomicVariations.json'
                  )
                }
              >
                {copySuccess['exportWithoutId'] ? (
                  'Copied!'
                ) : (
                  <img className='copySymbol' src={copyIcon} alt='Copy' />
                )}
              </button>
            </pre>
          </div>
        </li>

        <li>
          The second command will keep the <code>"_id"</code> entries generated
          by MongoDB. Note that this ID is not part of the specifications of the
          Beacon and will not affect your data and Beacon, you can keep it if
          you want:
          <div className='codeSnippet'>
            <pre>
              <code>
                docker exec ri-tools-mongo mongoexport --jsonArray --uri
                "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin"
                --collection genomicVariations &gt; genomicVariations.json
              </code>
              <button
                className='copyButtonCode'
                onClick={() =>
                  copyToClipboard(
                    'exportWithId',
                    'docker exec ri-tools-mongo mongoexport --jsonArray --uri "mongodb://root:example@127.0.0.1:27017/beacon?authSource=admin" --collection genomicVariations &gt; genomicVariations.json'
                  )
                }
              >
                {copySuccess['exportWithId'] ? (
                  'Copied!'
                ) : (
                  <img className='copySymbol' src={copyIcon} alt='Copy' />
                )}
              </button>
            </pre>
          </div>
        </li>
      </ul>

      <p>
        This will generate the final BFF file (json) for the{' '}
        <code>genomicVariations</code> collection using the VCF format as the
        source. Bear in mind that this time, the file will be saved in the
        directory you are located, so if you want to save it in the{' '}
        <code>output_docs</code> folder, add it in the path of the{' '}
        <code>mongoexport</code> (e.g.{' '}
        <code>&gt; output_docs/genomicVariations.json</code>).
      </p>

      <p className='note'>
        <img className='note-symbol' src='/note-symbol.png' alt='Note symbol' />
        <div>
          The records of the variants inside the MongoDB of the Beacon2 RI tools
          are kept inside after your conversion. If you need to do more
          conversions and you don’t want to keep the variants inside it, you can
          remove them by using the next command:
        </div>
      </p>

      <div className='codeSnippet'>
        <pre>
          <code>
            docker exec ri-tools-mongo /bin/bash -c 'mongo beacon -u root -p
            example --authenticationDatabase admin --eval
            "db.genomicVariations.deleteMany({})"'
          </code>
          <button
            className='copyButtonCode'
            onClick={() =>
              copyToClipboard(
                'deleteVariants',
                'docker exec ri-tools-mongo /bin/bash -c \'mongo beacon -u root -p example --authenticationDatabase admin --eval "db.genomicVariations.deleteMany({})"\''
              )
            }
          >
            {copySuccess['deleteVariants'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <p>
        At this point, you should have your data ready to be injected into the
        Beacon v2 RI API.
      </p>
    </div>
  )
}

export default ConversionVCFBFF
