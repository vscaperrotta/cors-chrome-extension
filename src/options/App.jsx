// src/options.jsx
import { useEffect, useState } from "react";
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import Section from './components/Section';
import Footer from './components/Footer';

import pkgJson from '../../package.json';


const defaultMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"];

function App() {
  const [allowedMethods, setAllowedMethods] = useState(defaultMethods);

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
      alert("Methods saved!");
    });
  };

  // Restore defaults
  const restoreDefaults = () => {
    chrome.storage.local.set({ allowedMethods: defaultMethods }, () => {
      setAllowedMethods(defaultMethods);
      alert("Defaults restored!");
    });
  };

  return (
    <div style={{ fontFamily: "sans-serif", margin: "1rem" }}>
      <h1>CORS Bypasser - Options</h1>

      <Section
        title='Edit HTTP methods'
        subtitle='Select which HTTP methods you want to allow:'
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

      <div style={{ marginTop: "1rem" }}>
        <Button
          label='Save'
          onClick={saveMethods}
        />
        <Button
          label='Restore Defaults'
          onClick={restoreDefaults}
        />
      </div>

      <Footer
        version={`v${pkgJson.version}`}
      />
    </div>
  );
}

export default App;