import './ApiConfiguration.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import copyIcon from '../assets/copy-symbol.png'

const ApiConfiguration = () => {
  const location = useLocation()

  // State to manage copy success for each snippet independently
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1) // Remove the '#' from the hash
      const element = document.getElementById(elementId)
      if (element) {
        const yOffset = -100 // Adjust this value as needed
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }, [location])

  const copyToClipboard = (snippetId: string) => {
    const textToCopy = {
      'method-1-public': 'public_datasets:\n- dataset_id',
      'method-1-registered': 'registered_datasets:\n- dataset_id',
      'method-1-controlled': 'username:\n- dataset_id',
      'method-2-env': `SECRET_KEY="your_permissions_ui_secret_key"\nOIDC_RP_CLIENT_ID='your_client_id'\nOIDC_RP_CLIENT_SECRET='your_client_secret'`,
      'method-2-start':
        'docker exec beacon-permissions bash permissions/permissions-ui/start.sh',
      'aai-env': `LSAAI_CLIENT_ID='your_lsaai_client_id'\nLSAAI_CLIENT_SECRET='your_lsaai_client_secret'\nKEYCLOAK_CLIENT_ID='your_keycloak_client_id'\nKEYCLOAK_CLIENT_SECRET='your_keycloak_client_secret'`,
      'beacon-rebuild': 'cd deploy && docker-compose up -d --build beacon',
      'cors-main': `middlewares=[web.normalize_path_middleware(), middlewares.error_middleware, cors_middleware(origins=["your_URL"...`,
      'cors-routes': `for route in list(beacon.router.routes()):\n        cors.add(route, {\n        "your_URL":\n            aiohttp_cors.ResourceOptions(allow_credentials=True,\n            expose_headers="*",\n            allow_methods=("POST", "PATCH", "GET", "OPTIONS"),\n            allow_headers=DEFAULT_ALLOW_HEADERS)`,
      'beacon-info': `beacon_id = 'org.ega-archive.beacon-ri-demo'\nbeacon_name = 'Beacon Reference Implementation demo'\napi_version = 'v2.0.0'\nuri = 'https://beacon-apis-demo.ega-archive.org/api/'\norg_id = 'EGA'\norg_name = 'European Genome-Phenome Archive (EGA)'\norg_description = 'The European Genome-phenome Archive (EGA) is a service for permanent archiving and sharing of all types of personally identifiable genetic and phenotypic data resulting from biomedical research projects.'\norg_adress = 'C/ Dr. Aiguader, 88\nPRBB Building\n08003 Barcelona, Spain'\norg_welcome_url = 'https://ega-archive.org/'\norg_contact_url = 'mailto:beacon.ega@crg.eu'\norg_logo_url = 'https://legacy.ega-archive.org/images/logo.png'\norg_info = ''\ndescription = "This Beacon is based on synthetic data hosted at the <a href='https://ega-archive.org/datasets/EGAD00001003338'>EGA</a>. The dataset contains 2504 samples including genetic data based on 1K Genomes data, and 76 individual attributes and phenotypic data derived from UKBiobank."\nversion = 'v2.0'\nwelcome_url = 'https://beacon.ega-archive.org/'\nalternative_url = 'https://beacon-apis-demo.ega-archive.org/api/'\ncreate_datetime = '2021-11-29T12:00:00.000000'\nupdate_datetime = ''`,
      'granularity-conf': `default_beacon_granularity = "record"\nmax_beacon_granularity = "record"`,
      'granularity-response': `dummy_user:\n- record`,
      'beacon-handovers': `beacon_handovers = [
    {
        handoverType: {
            id: 'CUSTOM:000001',
            label: 'Project description'
        },
        note: 'Project description',
        url: 'https://www.nist.gov/programs-projects/genome-bottle'
    }
]`
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
    <div className='apiConfigContainer'>
      <h3>Beacon 2 RI API</h3>
      <h1>Configuration</h1>

      <h2 id='managing-dataset-permissions'>Managing dataset permissions</h2>
      <p>
        There are 3 possible levels of beacon security for a dataset: public,
        registered and controlled.
      </p>
      <ul>
        <li>
          A public dataset is a dataset that will be returned in a beacon query
          without an authentication token.
        </li>
        <li>
          A registered dataset is a dataset that will be shown after a user
          sends a valid token (in other words, is logged in).
        </li>
        <li>
          A controlled dataset is a dataset that needs a user to send a valid
          token for authentication and the user needs to be allowed to query
          that dataset.
        </li>
      </ul>
      <p>
        There are two possible methods to administer these permissions for your
        datasets in beacon:
      </p>

      <h4 id='method-1'>Method 1: Edit the .yml files</h4>
      <p>
        For a public dataset, edit the public_datasets.yml file inside
        permissions folder and add the dataset with the exact name it appears in
        the id from its pertinent record in datasets mongo collection:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>public_datasets:\n- dataset_id</code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('method-1-public')}
          >
            {copySuccess['method-1-public'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <p>
        For a registered dataset, edit the registered_datasets.yml file inside
        permissions folder and add the dataset with the exact name it appears in
        the id from its pertinent record in datasets mongo collection:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>registered_datasets:\n- dataset_id</code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('method-1-registered')}
          >
            {copySuccess['method-1-registered'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <p>
        For a controlled dataset, edit the controlled_datasets.yml file inside
        permissions folder and add the dataset inside the username you wish to
        give permissions with the exact name for the dataset as it appears in
        the id from its pertinent record in datasets mongo collection and the
        exact name the user has in Keycloak:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>username:\n- dataset_id</code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('method-1-controlled')}
          >
            {copySuccess['method-1-controlled'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <h4 id='method-2'>Method 2: Launching the beacon admin UI</h4>
      <p>
        Create an .env file inside permissions/permissions-ui/web folder and add
        the next variables with their values:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>
            SECRET_KEY="your_permissions_ui_secret_key"\nOIDC_RP_CLIENT_ID='your_client_id'\nOIDC_RP_CLIENT_SECRET='your_client_secret'
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('method-2-env')}
          >
            {copySuccess['method-2-env'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <p>Execute the next command to launch the UI:</p>
      <div className='codeSnippet'>
        <pre>
          <code>
            docker exec beacon-permissions bash
            permissions/permissions-ui/start.sh
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('method-2-start')}
          >
            {copySuccess['method-2-start'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <p>
        After that, open the UI in port http://localhost:8010 and navigate
        through public, registered and controlled datasets to assign permissions
        for the datasets you have inside your mongo database.
      </p>

      <h2 id='supplying-aai-credentials'>Supplying AAI credentials</h2>
      <p>
        For making Keycloak or LifeSciende AAI work with beacon, you will need
        to add the client ID and client secret for each IDP in a new file you
        have to create inside permissions folder. This file must be called .env
        and needs to have the following variables:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>
            LSAAI_CLIENT_ID='your_lsaai_client_id'\nLSAAI_CLIENT_SECRET='your_lsaai_client_secret'\nKEYCLOAK_CLIENT_ID='your_keycloak_client_id'\nKEYCLOAK_CLIENT_SECRET='your_keycloak_client_secret'
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('aai-env')}
          >
            {copySuccess['aai-env'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <p>After that, make sure you build your beacon container again:</p>
      <div className='codeSnippet'>
        <pre>
          <code>cd deploy && docker-compose up -d --build beacon</code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('beacon-rebuild')}
          >
            {copySuccess['beacon-rebuild'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <h2 id='handling-cors'>Handling CORS</h2>
      <p>
        To avoid CORS using beacon and the frontend or a third-party
        authorization site like Keycloak, you will have to include all these
        URLs inside __main__.py in the beacon folder, including them in the CORS
        middleware.
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>
            middlewares=[web.normalize_path_middleware(),
            middlewares.error_middleware, cors_middleware(origins=["your_URL"...
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('cors-main')}
          >
            {copySuccess['cors-main'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>
      <p>and CORS routes lists:</p>
      <div className='codeSnippet'>
        <pre>
          <code>
            for route in list(beacon.router.routes()):
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;cors.add(route, &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"your_URL": &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aiohttp_cors.ResourceOptions(allow_credentials=True,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expose_headers="*",
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;allow_methods=("POST",
            "PATCH", "GET", "OPTIONS"),
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;allow_headers=DEFAULT_ALLOW_HEADERS)&#125;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;)
            <br />
            <br />
            for route in list(beacon.router.routes()):
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;cors.add(route, &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"your_URL":
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aiohttp_cors.ResourceOptions(allow_credentials=True,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expose_headers="*",
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;allow_methods=("POST",
            "PATCH", "GET", "OPTIONS"),
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;allow_headers=DEFAULT_ALLOW_HEADERS)
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;)
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('your-text-here')}
          >
            {copySuccess['your-text-here'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <h2 id='editing-beacon-info'>Editing your beacon information</h2>
      <p>
        To show correctly your beacon’s information you will need to edit both
        conf.py files from beacon and deploy folders. To do so, edit the
        following variables:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>
            {`beacon_id = 'org.ega-archive.beacon-ri-demo'\n`}
            {`beacon_name = 'Beacon Reference Implementation demo'\n`}
            {`api_version = 'v2.0.0'\n`}
            {`uri = 'https://beacon-apis-demo.ega-archive.org/api/'\n`}
            {`org_id = 'EGA'\n`}
            {`org_name = 'European Genome-Phenome Archive (EGA)'\n`}
            {`org_description = 'The European Genome-phenome Archive (EGA) is a service for permanent archiving and sharing of all types of personally identifiable genetic and phenotypic data resulting from biomedical research projects.'\n`}
            {`org_adress = 'C/ Dr. Aiguader, 88\nPRBB Building\n08003 Barcelona, Spain'\n`}
            {`org_welcome_url = 'https://ega-archive.org/'\n`}
            {`org_contact_url = 'mailto:beacon.ega@crg.eu'\n`}
            {`org_logo_url = 'https://legacy.ega-archive.org/images/logo.png'\n`}
            {`org_info = ''\n`}
            {`description = "This Beacon is based on synthetic data hosted at the <a href='https://ega-archive.org/datasets/EGAD00001003338'>EGA</a>. The dataset contains 2504 samples including genetic data based on 1K Genomes data, and 76 individual attributes and phenotypic data derived from UKBiobank."\n`}
            {`version = 'v2.0'\n`}
            {`welcome_url = 'https://beacon.ega-archive.org/'\n`}
            {`alternative_url = 'https://beacon-apis-demo.ega-archive.org/api/'\n`}
            {`create_datetime = '2021-11-29T12:00:00.000000'\n`}
            {`update_datetime = ''`}
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('beacon-info')}
          >
            {copySuccess['beacon-info'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <h2 id='limiting-granularity'>Limiting the granularity</h2>
      <p>
        Beacon RI can limit the granularity per user or for all the beacon. If
        you want to limit the granularity for all the users to a maximum, you
        can point it in conf.py for both beacon and deploy folders, by editing
        the next variables:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>
            default_beacon_granularity = "record"\nmax_beacon_granularity =
            "record"
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('granularity-conf')}
          >
            {copySuccess['granularity-conf'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <p>
        If you want to limit the granularity per user, you can do this by
        editing the response_type.yml file inside beacon/request folder, adding
        the username and the maximum granularity you want to allow this user to
        have:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>dummy_user:\n- record</code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('granularity-response')}
          >
            {copySuccess['granularity-response'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <h2 id='adding-beacon-handovers'>Adding beacon handovers</h2>
      <p>
        You can specify what are the handovers for your beacon by adding them in
        the array of your conf.py file inside beacon folder:
      </p>
      <div className='codeSnippet'>
        <pre>
          <code>
            beacon_handovers = [<br />
            &nbsp;&nbsp;&#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;'handoverType': &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'id': 'CUSTOM:000001',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'label': 'Project description'
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;'note': 'Project description',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;'url':
            'https://www.nist.gov/programs-projects/genome-bottle'
            <br />
            &nbsp;&nbsp;&#125;
            <br />]
          </code>
          <button
            className='copyButtonCode'
            onClick={() => copyToClipboard('beacon-handovers')}
          >
            {copySuccess['beacon-handovers'] ? (
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

export default ApiConfiguration
