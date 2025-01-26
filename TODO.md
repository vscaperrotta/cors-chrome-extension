### TODO - Future Implementations

Here are some possible ideas and improvements to further develop the extension:

1. **State Persistence Management**
   - Save the `isEnabled` variable in `chrome.storage` (local or sync) so that the extension remembers whether it’s enabled or disabled even after the browser restarts or the service worker reloads.

2. **Configuration Popup**
   - Add a popup interface (HTML + JS) that appears when the extension icon is clicked.
   - Allow configuration of:
     - Custom CORS (specific origins instead of `*`).
     - Allowed methods (`GET`, `POST`, etc.).
     - Custom headers (`X-My-Header`, `Authorization`, etc.).

3. **Per-Tab Activation**
   - Implement a map `(tabId) => activationState` to enable/disable CORS bypass only on certain tabs.
   - Provide a different visual state per tab (e.g., a different icon for tabs where the extension is active).

4. **Whitelist/Blacklist**
   - Introduce a list of allowed (whitelist) or blocked (blacklist) sites or URL patterns.
   - The extension only modifies headers if the domain is on the whitelist or not on the blacklist.

5. **Advanced Logging**
   - Create a logging system showing:
     - Which requests the extension acts upon.
     - Which headers are modified.
     - Display this information in a dedicated panel (for example, in `options.html`).

6. **Integration with a Custom Proxy Server**
   - Instead of modifying headers within the browser, offer an option to forward requests through a configured proxy that handles CORS at the server level.
   - This provides greater control and reduces risks of incompatibilities with future Chrome limitations.

7. **Advanced Options Interface**
   - Add an `options.html` page with a graphical interface to customize:
     - Specific origins to allow instead of `*`.
     - Allowed methods and headers.
   - Save the settings in `chrome.storage`.
