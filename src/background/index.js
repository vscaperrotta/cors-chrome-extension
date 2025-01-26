/**
 * @file background.js
 * Service worker for the CORS Bypasser extension using declarativeNetRequest.
 */

// If you're using the webextension-polyfill library:
import Browser from "webextension-polyfill";

/**
 * Indicates whether the extension is globally enabled or disabled.
 * @type {boolean}
 */
let isEnabled = false;

/**
 * List of methods allowed in the Access-Control-Allow-Methods header.
 * Defaults to all.
 * @type {string[]}
 */
let allowedMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"];

/**
 * Load allowedMethods from storage at startup.
 */
chrome.storage.local.get(["allowedMethods"], (res) => {
  if (Array.isArray(res.allowedMethods)) {
    allowedMethods = res.allowedMethods;
  }
});

/**
 * Watch for changes in allowedMethods within chrome.storage.
 */
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.allowedMethods) {
    const newValue = changes.allowedMethods.newValue;
    if (Array.isArray(newValue)) {
      allowedMethods = newValue;
      // If the extension is currently enabled, update the rule to reflect the new methods.
      if (isEnabled) {
        enableCORSRule();
      }
    }
  }
});

/**
 * Builds a single dynamic rule for declarativeNetRequest,
 * setting the CORS-related response headers.
 * @returns {chrome.declarativeNetRequest.Rule}
 */
function getCORSRule() {
  return {
    // A unique rule ID (choose any number, up to ~2^31)
    id: 1,
    // Priority (higher => applied before other similar rules)
    priority: 1,
    action: {
      type: "modifyHeaders",
      responseHeaders: [
        {
          header: "Access-Control-Allow-Origin",
          operation: "set",
          value: "*"
        },
        {
          header: "Access-Control-Allow-Methods",
          operation: "set",
          value: allowedMethods.join(", ")
        },
        {
          header: "Access-Control-Allow-Headers",
          operation: "set",
          value: "Content-Type, Authorization, X-Requested-With"
        }
      ]
    },
    condition: {
      // If you want this to apply to ALL URLs, leave urlFilter empty or set to "*"
      urlFilter: "",
      // Specifies which resource types the rule should affect
      resourceTypes: [
        "main_frame",
        "sub_frame",
        "xmlhttprequest",
        "fetch",
        "script",
        "stylesheet",
        "image",
        "object",
        "ping",
        "csp_report",
        "font",
        "media",
        "websocket",
        "webtransport",
        "webbundle",
        "other"
      ]
    }
  };
}

/**
 * Enables (adds) the dynamic rule for CORS.
 */
async function enableCORSRule() {
  try {
    // Remove any existing rule with the same ID, then add an updated one
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1],
      addRules: [getCORSRule()]
    });
    console.log("CORS rule ENABLED");
  } catch (error) {
    console.error("Error enabling CORS rule:", error);
  }
}

/**
 * Disables (removes) the dynamic rule for CORS.
 */
async function disableCORSRule() {
  try {
    // Simply remove the rule with ID=1
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1],
      addRules: []
    });
    console.log("CORS rule DISABLED");
  } catch (error) {
    console.error("Error disabling CORS rule:", error);
  }
}

/**
 * Toggles isEnabled when the user clicks the extension icon.
 */
Browser.action.onClicked.addListener(async () => {
  isEnabled = !isEnabled;

  if (isEnabled) {
    await enableCORSRule();
    Browser.action.setIcon({ path: "../icon-enabled.png" });
    console.log("CORS Bypasser: enabled");
  } else {
    await disableCORSRule();
    Browser.action.setIcon({ path: "../icon-disabled.png" });
    console.log("CORS Bypasser: disabled");
  }
});
