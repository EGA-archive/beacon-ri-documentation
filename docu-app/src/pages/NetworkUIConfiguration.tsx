import React, { useState } from 'react'
import './NetworkUIConfiguration.css'
import copyIcon from '../assets/copy-symbol.png'

const NetworkUIConfiguration: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({})

  const copyToClipboard = (text: string, snippetId: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess(prev => ({ ...prev, [snippetId]: true }))
        setTimeout(() => {
          setCopySuccess(prev => ({ ...prev, [snippetId]: false }))
        }, 1500)
      })
      .catch(error => console.error('Failed to copy text: ', error))
  }

  return (
    <div className='networkUIConfigurationContainer'>
      <h3>Network UI</h3>
      <h1>Configuration</h1>

      <p>
        Please first create a <code>.env</code> file inside the frontend folder
        so that you can modify some variables. Take into account that the file
        below will not be copied to GitHub as it contains keys and for security
        reasons it should be ignored:
      </p>

      <div className='codeSnippet'>
        <pre>
          <code>
            REACT_APP_CLIENT_ID='ID of your LS Login' <br />
            REACT_APP_CLIENT_SECRET='password of your LS Login' <br />
            REACT_APP_KEYCLOAK_CLIENT_SECRET='password of your Keycloak login'{' '}
            <br />
            REACT_APP_KEYCLOAK_CLIENT_ID='ID of your Keycloak login' <br />
            REACT_APP_KEYCLOAK_CLIENT_REALM='REALM of your Keycloak login'
          </code>
          <button
            className='copyButtonCode'
            onClick={() =>
              copyToClipboard(
                `REACT_APP_CLIENT_ID='ID of your LS Login'\nREACT_APP_CLIENT_SECRET='password of your LS Login'\nREACT_APP_KEYCLOAK_CLIENT_SECRET='password of your Keycloak login'\nREACT_APP_KEYCLOAK_CLIENT_ID='ID of your Keycloak login'\nREACT_APP_KEYCLOAK_CLIENT_REALM='REALM of your Keycloak login'`,
                'env-config'
              )
            }
          >
            {copySuccess['env-config'] ? (
              'Copied!'
            ) : (
              <img className='copySymbol' src={copyIcon} alt='Copy' />
            )}
          </button>
        </pre>
      </div>

      <p>
        You will need to have created your Life Science and Keycloak
        environments before:
      </p>
      <p className='note'>
        <img className='note-symbol' src='/note-symbol.png' alt='Note symbol' />
        <div>
          For Life Science environment, please first create a user. After that,
          you will need to register a service registry in order to be able to
          administrate your logins. Please go{' '}
          <a
            href='https://services.aai.lifescience-ri.eu/spreg/'
            target='_blank'
            rel='noopener noreferrer'
          >
            here
          </a>{' '}
          and ask for a New Service - type OIDC.
        </div>
      </p>

      <p>
        Then please edit the file{' '}
        <a
          href='https://github.com/elixir-europe/beacon-network-ui/tree/main/frontend/src'
          target='_blank'
          rel='noopener noreferrer'
        >
          config.json
        </a>
        , which can be found inside the folder frontend/src. You need to decide
        where you want the UI to point to when making requests. Find below an
        example:
      </p>

      <div className='codeSnippet'>
        <pre>
          <code>
            {`{
  "API_URL": "https://yourAPIdomain.com/beacon-network/v2.0.0",
  "REDIRECT_URL": "https://yourUIdomain.com",
  "KEYCLOAK_URL": "https://yourKEYCLOAKdomain.com"
}`}
          </code>
          <button
            className='copyButtonCode'
            onClick={() =>
              copyToClipboard(
                `{
  "API_URL": "https://yourAPIdomain.com/beacon-network/v2.0.0",
  "REDIRECT_URL": "https://yourUIdomain.com",
  "KEYCLOAK_URL": "https://yourKEYCLOAKdomain.com"
}`,
                'config-json'
              )
            }
          >
            {copySuccess['config-json'] ? (
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
          In the root folder (frontend) you will find a file called .gitignore
          with the list of all files that need to be ignored.
        </div>
      </p>
    </div>
  )
}

export default NetworkUIConfiguration
