import tw from "tailwindcss/colors";
import type { CustomSwaggerUIOptionsTypes } from "types";

export const customSwaggerUI = (schemaUrl: string, options: CustomSwaggerUIOptionsTypes = {}): string => {
  const { title, description, defaultColorMode, showServers, seo, colors } = options;
  const { dark, light } = colors || {};
  const pageTitle = title || "SwaggerUI";
  const pageDescription = description || "SwaggerUI";
  schemaUrl = schemaUrl.replace(/\/+(\/|$)/g, "$1"); // strip double & trailing splash
  return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="${pageDescription}"/>
        <title>${pageTitle}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.18.2/swagger-ui.css" integrity="sha256-jzPZlgJTFwSdSphk9CHqsrKiR4cvOIAm+pTGVJEyWec=" crossorigin="anonymous">
        <link rel="shortcut icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlMb//2ux//9or///ZKz//wlv5f8JcOf/CnXv/why7/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2vi/wZo3/9ytf//b7P//2uw//+BvP//DHbp/w568P8Md+//CnXv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApv4/8HbOH/lMf//3W3//9ytf//brL//w946v8SfvH/EHzw/w558P8AAAAAAAAAAAAAAAAAAAAAAAAAABF56f8Ndef/C3Dj/whs4f98u///eLn//3W3//+Evv//FoPx/xSA8f8SfvD/EHvw/wAAAAAAAAAAAAAAAA1EeF0WgOz/EXrp/w515v8LceT/lsn//3+9//97u///eLj//xaB7f8YhfL/FoLx/xSA8f8JP/deAAAAAAAAAAAgjfH/HIjw/xeB7P8Te+n/AAAAAAAAAACGwf//gr///369//+Iwf//HIny/xqH8v8YhfL/FYLx/wAAAAAnlfPlJJLy/yGO8v8cifD/GILt/wAAAAAAAAAAmMz//4nD//+Fwf//gb///xyJ8P8ejPP/HIny/xmH8v8XhPLnK5r0/yiW8/8lk/P/IpDy/wAAAAAAAAAAAAAAAAAAAACPx///jMX//4jD//+MxP//IpD0/yCO8/8di/P/G4ny/y6e9f8sm/T/KZj0/yaV8/8AAAAAAAAAAAAAAAAAAAAAlsz//5LJ//+Px///lMn//yaV9P8kkvT/IZD0/x+O8/8yo/blMKD1/y2d9f8qmfT/KJbz/wAAAAAAAAAAqdb//53Q//+Zzv//lsv//yiY8/8qmvX/KJf1/yWV9P8jkvTQAAAAADSl9v8xofX/Lp71/yyb9P8AAAAAAAAAAKfW//+k1P//oNL//6rW//8wofb/Lp72/yuc9f8pmfX/AAAAAAAAAAAcVHtcNab2/zKj9v8voPX/LZz0/7vh//+u2///qtj//6fW//8wofT/NKX3/zKj9/8voPb/F8/6XgAAAAAAAAAAAAAAADmr9/82qPf/M6T2/zCg9f+44f//td///7Hd//++4v//Oqz4/ziq+P81p/f/M6X3/wAAAAAAAAAAAAAAAAAAAAAAAAAAOqz4/zep9//M6///v+X//7vj//+44f//OKn1/z6x+f88rvn/Oaz4/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6x+f8qmfP/yOv//8bq///C5///z+z//0O3+v9Ctfr/QLP5/z2x+f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0u///8jr///I6///yOv//zmq9f9Dt/r/Q7f6/0O3+v8AAAAAAAAAAAAAAAAAAAAA8A8AAOAHAADgBwAAwAMAAMADAACGAQAABgAAAA8AAAAPAAAABgAAAIYBAADAAwAAwAMAAOAHAADgBwAA8A8AAA==" />
        <meta property="og:title" content="${seo?.ogTitle || pageTitle}">
        <meta property="og:description" content="${seo?.ogDescription || pageDescription}">
        <meta property="og:site_name" content="${seo?.ogSiteName || pageTitle}">
        ${seo?.ogType ? `<meta property="og:type" content="${seo.ogType}">` : ""}
        ${seo?.ogUrl ? `<meta property="og:url" content="${seo.ogUrl}">`: ""}
        ${seo?.ogImage ? `<meta property="og:image" content="${seo.ogImage}">` : ""}
        <meta name="twitter:title" content="${seo?.twitterTitle || pageTitle}">
        <meta name="twitter:description" content="${seo?.twitterDescription || pageDescription}">
        ${seo?.twitterCard ? `<meta name="twitter:card" content="${seo.twitterCard}">` : ""}
        ${seo?.twitterImage ? `<meta name="twitter:image" content="${seo.twitterImage}">` : ""}
    </head>
    <body>
    <div id="swagger-ui"></div>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.18.2/swagger-ui-bundle.js" integrity="sha256-xQuUu8TwI5Qyb7eu0fT7aTs2d/Sz0zRODWExgIy/KB8=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.18.2/swagger-ui-standalone-preset.js" integrity="sha256-bFozOOadhOewURe5unsUHSS9P8ECqesC6ATTsE3OxaE=" crossorigin="anonymous"></script>
    <script>
    const body = document.body;
    let colorMode = localStorage.getItem("colorMode") || ${defaultColorMode === "dark" ? "\"dark\"" : "\"light\""};
    body.setAttribute("data-theme", colorMode);
    window.ui = SwaggerUIBundle({
      url: '${schemaUrl}',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
          SwaggerUIBundle.presets.apis
      ],
      onComplete: () => {
        const title = document.querySelector("hgroup.main .title");
        const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="currentColor"><path d="M227.89 147.89A96 96 0 1 1 108.11 28.11a96.09 96.09 0 0 0 119.78 119.78" opacity=".2"/><path d="M233.54 142.23a8 8 0 0 0-8-2a88.08 88.08 0 0 1-109.8-109.8a8 8 0 0 0-10-10a104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.1 103.1 0 0 0 62.52-20.88a104.84 104.84 0 0 0 37-52.91a8 8 0 0 0-1.98-7.98m-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104a106 106 0 0 0 14.92-1.06a89 89 0 0 1-26.02 31.4"/></g></svg>';
        const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="currentColor"><path d="M184 128a56 56 0 1 1-56-56a56 56 0 0 1 56 56" opacity=".2"/><path d="M120 40v-8a8 8 0 0 1 16 0v8a8 8 0 0 1-16 0m72 88a64 64 0 1 1-64-64a64.07 64.07 0 0 1 64 64m-16 0a48 48 0 1 0-48 48a48.05 48.05 0 0 0 48-48M58.34 69.66a8 8 0 0 0 11.32-11.32l-8-8a8 8 0 0 0-11.32 11.32Zm0 116.68l-8 8a8 8 0 0 0 11.32 11.32l8-8a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l8-8a8 8 0 0 0-11.32-11.32l-8 8A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l8 8a8 8 0 0 0 11.32-11.32ZM40 120h-8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16m88 88a8 8 0 0 0-8 8v8a8 8 0 0 0 16 0v-8a8 8 0 0 0-8-8m96-88h-8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16"/></g></svg>';
        const button = document.createElement("button");
        button.innerHTML = colorMode === "dark" ? moonIcon : sunIcon;
        button.style.cssText = "margin-left: .5rem; border: none; background: none; padding: 0; outline: none; vertical-align: bottom;";
        button.title = "Toggle color mode";
        button.addEventListener("click", () => {
          colorMode = colorMode === "dark" ? "light" : "dark";
          localStorage.setItem("colorMode", colorMode);
          body.setAttribute("data-theme", colorMode);
          button.innerHTML = colorMode === "dark" ? moonIcon : sunIcon;
        });
        title.appendChild(button);
      }
    });
    </script>
    <style>
    [data-theme=dark] {
      --text: ${dark?.text || tw.neutral[100]};
      --bg: ${dark?.bg || tw.gray[900]};
      --section-header-bg: ${dark?.sectionHeaderBg || tw.gray[950]};
      --section-header-text: ${dark?.sectionHeaderText || tw.neutral[100]};
      --border: ${tw.gray[600]};
      --get-bg: ${dark?.get || tw.cyan[300]};
      --get-bg-low: ${dark?.get ? `${dark.get}1a` : tw.cyan[300]}1a;
      --post-bg: ${dark?.post || tw.green[300]};
      --post-bg-low: ${dark?.post ? `${dark.get}1a` : tw.green[300]}1a;
      --delete-bg: ${dark?.delete || tw.rose[400]};
      --delete-bg-low: ${dark?.delete ? `${dark.delete}1a` : tw.rose[400]}1a;
      --method-name: #252525;
      --required: #ff7070;
      --execute-bg: ${tw.lime[400]};
      --execute-border: ${tw.lime[300]};
      --loading-border: #ffffff1a;
      --code-bg: ${dark?.codeBg || tw.zinc[800]};
    }
    [data-theme=light] {
      --text: ${light?.text || tw.neutral[950]};
      --bg: ${light?.bg || tw.gray[50]};
      --section-header-bg: ${light?.sectionHeaderBg || tw.gray[800]};
      --section-header-text: ${light?.sectionHeaderText || tw.neutral[100]};
      --border: ${tw.gray[400]};
      --get-bg: ${light?.get || tw.cyan[700]};
      --get-bg-low: ${light?.get ? `${light.get}1a` : tw.cyan[700]}1a;
      --post-bg: ${light?.post || tw.green[700]};
      --post-bg-low: ${light?.post ? `${dark.post}1a` : tw.green[700]}1a;
      --delete-bg: ${light?.delete || tw.rose[700]};
      --delete-bg-low: ${light?.delete ? `${light.delete}1a` : tw.rose[700]}1a;
      --method-name: #f0f0f0;
      --required: #ff000099;
      --execute-bg: ${tw.lime[400]};
      --execute-border: ${tw.lime[500]};
      --loading-border: #5555551a;
      --code-bg: ${light?.codeBg || tw.zinc[800]};
    }
    body, .swagger-ui .scheme-container {
      background-color: var(--bg);
      transition: background-color .3s ease-in-out;
    }
    #swagger-ui * {
      color: var(--text);
    }
    .swagger-ui .opblock-tag {
      border-bottom: 1px solid var(--border);
    }
    .swagger-ui .opblock .opblock-section-header {
      background-color: var(--section-header-bg);
    }
    .swagger-ui .opblock-section-header *:not([class*="content-type"]) {
      color: var(--section-header-text)!important;
    }
    input[type="text"], select, option {
      color: ${tw.neutral[950]}!important;
    }
    .swagger-ui .opblock.opblock-get, .swagger-ui .opblock.opblock-get .opblock-summary {
      background-color: var(--get-bg-low);
      border-color: var(--get-bg);
    }
    .swagger-ui .opblock.opblock-post, .swagger-ui .opblock.opblock-post .opblock-summary {
      background-color: var(--post-bg-low);
      border-color: var(--post-bg);
    }
    .swagger-ui .opblock.opblock-delete, .swagger-ui .opblock.opblock-delete .opblock-summary {
      background-color: var(--delete-bg-low);
      border-color: var(--delete-bg);
    }
    .swagger-ui .opblock-summary-method {
      color: var(--method-name)!important;
    }
    .swagger-ui .opblock.opblock-get .opblock-summary-method, .swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span:after {
      background-color: var(--get-bg);
    }
    .swagger-ui .opblock.opblock-post .opblock-summary-method, .swagger-ui .opblock.opblock-post .tab-header .tab-item.active h4 span:after {
      background-color: var(--post-bg);
    }
    .swagger-ui .opblock.opblock-delete .opblock-summary-method, .swagger-ui .opblock.opblock-delete .tab-header .tab-item.active h4 span:after {
      background-color: var(--delete-bg);
    }
    .swagger-ui .model-box-control:focus, .swagger-ui .models-control:focus, .swagger-ui .opblock-summary-control:focus {
      outline: none;
    }
    .swagger-ui .parameter__name.required:after {
      color: var(--required);
    }
    .swagger-ui .opblock-body pre.microlight, .swagger-ui textarea {
      background-color: var(--code-bg)!important;
    }
    .swagger-ui .body-param textarea {
      background-color: #f0f0f0!important;
      color: ${tw.gray[950]}!important;
    }
    .microlight code *:not([style*="color"]), .microlight code:not([style*="color"]), .request-url .microlight, .response .microlight .headerline {
      color: ${tw.gray[100]}!important;
    }
    svg.arrow {
      fill: var(--text);
    }
    .swagger-ui .loading-container .loading:before {
      border: 2px solid var(--loading-border);
      border-top-color: var(--text);
    }
    .swagger-ui .loading-container .loading:after {
      color: var(--text);
    }
    .swagger-ui .operation-servers {
      display: ${!showServers ? "none" : "block"};
    }
    .response-col_links {
      display: none;
    }
    .swagger-ui .btn.execute {
      color: ${tw.neutral[950]}!important;
      background-color: var(--execute-bg);
      border-color: var(--execute-border);
    }
    </style>
    </body>
    </html>`.replace(/\n\s+/g, "\n");
};