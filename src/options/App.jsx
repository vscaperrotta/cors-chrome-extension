// src/options.jsx
import { useEffect, useState } from "react";

import defaultMethods from '@utils/defaultMethods';

import Alert from './components/Alert';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import Section from './components/Section';
import Footer from './components/Footer';

import pkgJson from '../../package.json';
import messages from "./modules/messages";


function App() {
  // States
  const [allowedMethods, setAllowedMethods] = useState(defaultMethods);
  const [hasAlert, setHasAlert] = useState(false);

  // Load saved methods from chrome.storage on component mount
  useEffect(() => {
    chrome.storage.local.get(["allowedMethods"], (result) => {
      if (Array.isArray(result.allowedMethods)) {
        setAllowedMethods(result.allowedMethods);
      }
    });
  }, []);

  // Toggle method in allowedMethods state
  const handleCheckboxChange = (method) => {
    setAllowedMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  // Save to chrome.storage
  const saveMethods = () => {
    chrome.storage.local.set({ allowedMethods }, () => {
      setHasAlert(true)

      // Restore alert state to default state
      setTimeout(() => {
        setHasAlert(false)
      }, 3000)
    });
  };

  // Restore defaults
  const restoreDefaults = () => {
    chrome.storage.local.set({ allowedMethods: defaultMethods }, () => {
      setAllowedMethods(defaultMethods);
      setHasAlert(true)

      // Restore alert state to default state
      setTimeout(() => {
        setHasAlert(false)
      }, 3000)
    });
  };

  return (
    <div className="options__wrapper">
      <Alert
        active={hasAlert}
        message={allowedMethods ? messages.alertRestoreDefault : messages.alertSave}
      />

      <h1 className="options__title">
        {messages.title}
      </h1>

      <div className="options__sections">
        <Section
          title={messages.httpMethodsTitle}
          subtitle={messages.httpMethodsSubtitle}
        >
          {defaultMethods.map((method) => (
            <Checkbox
              key={method}
              value={method}
              label={method}
              checked={allowedMethods.includes(method)}
              onChange={() => handleCheckboxChange(method)}
            />
          ))}
        </Section>
      </div>

      <div className="options__actions">
        <Button
          contained
          label={messages.buttonSave}
          onClick={saveMethods}
        />
        <Button
          outlined
          label={messages.buttonRestoreDefault}
          onClick={restoreDefaults}
        />
      </div>

      <Footer
        message={`v${pkgJson.version}`}
      />
    </div>
  );
}

export default App;