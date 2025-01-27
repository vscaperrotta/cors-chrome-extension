import fs from 'fs-extra';
import path from 'path';

export async function getManifest() {
  const pkg = await fs.readJSON(path.resolve('package.json'));

  const manifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: "icon.png"
    },
    icons: {
      16: "icon.png",
      48: "icon.png",
      128: "icon.png"
    },
    permissions: [
      "storage",
      "declarativeNetRequest",
      "declarativeNetRequestWithHostAccess"
    ],
    host_permissions: [
      "<all_urls>"
    ],
    background: {
      service_worker: "assets/background.js"
    },
    options_ui: {
      page: "src/options/index.html",
      open_in_tab: true
    }
  }

  return manifest
}
