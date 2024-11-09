import type { customSwaggerUIOptionsTypes } from "types";
import tw from "tailwindcss/colors";

export const customSwaggerUI = (schemaUrl: string, options?: customSwaggerUIOptionsTypes): string => {
  const { title, description, dark, showServers, seo, textColor, bgColor, sectionHeaderBgColor, sectionHeaderTextColor, getColor, postColor, deleteColor, codeBgColor } = options;
  const text = dark ? tw.neutral[100] : tw.neutral[950];
  const bg = dark ? tw.gray[900] : tw.gray[50];

  schemaUrl = schemaUrl.replace(/\/+(\/|$)/g, "$1"); // strip double & trailing splash
  return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="${description || "SwaggerUI"}"/>
        <title>${title || "SwaggerUI"}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.17.14/swagger-ui.css" integrity="sha256-QBcPDuhZ0X+SExunBzKaiKBw5PZodNETZemnfSMvYRc=" crossorigin="anonymous">
        <link rel="shortcut icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlMb//2ux//9or///ZKz//wlv5f8JcOf/CnXv/why7/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2vi/wZo3/9ytf//b7P//2uw//+BvP//DHbp/w568P8Md+//CnXv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApv4/8HbOH/lMf//3W3//9ytf//brL//w946v8SfvH/EHzw/w558P8AAAAAAAAAAAAAAAAAAAAAAAAAABF56f8Ndef/C3Dj/whs4f98u///eLn//3W3//+Evv//FoPx/xSA8f8SfvD/EHvw/wAAAAAAAAAAAAAAAA1EeF0WgOz/EXrp/w515v8LceT/lsn//3+9//97u///eLj//xaB7f8YhfL/FoLx/xSA8f8JP/deAAAAAAAAAAAgjfH/HIjw/xeB7P8Te+n/AAAAAAAAAACGwf//gr///369//+Iwf//HIny/xqH8v8YhfL/FYLx/wAAAAAnlfPlJJLy/yGO8v8cifD/GILt/wAAAAAAAAAAmMz//4nD//+Fwf//gb///xyJ8P8ejPP/HIny/xmH8v8XhPLnK5r0/yiW8/8lk/P/IpDy/wAAAAAAAAAAAAAAAAAAAACPx///jMX//4jD//+MxP//IpD0/yCO8/8di/P/G4ny/y6e9f8sm/T/KZj0/yaV8/8AAAAAAAAAAAAAAAAAAAAAlsz//5LJ//+Px///lMn//yaV9P8kkvT/IZD0/x+O8/8yo/blMKD1/y2d9f8qmfT/KJbz/wAAAAAAAAAAqdb//53Q//+Zzv//lsv//yiY8/8qmvX/KJf1/yWV9P8jkvTQAAAAADSl9v8xofX/Lp71/yyb9P8AAAAAAAAAAKfW//+k1P//oNL//6rW//8wofb/Lp72/yuc9f8pmfX/AAAAAAAAAAAcVHtcNab2/zKj9v8voPX/LZz0/7vh//+u2///qtj//6fW//8wofT/NKX3/zKj9/8voPb/F8/6XgAAAAAAAAAAAAAAADmr9/82qPf/M6T2/zCg9f+44f//td///7Hd//++4v//Oqz4/ziq+P81p/f/M6X3/wAAAAAAAAAAAAAAAAAAAAAAAAAAOqz4/zep9//M6///v+X//7vj//+44f//OKn1/z6x+f88rvn/Oaz4/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6x+f8qmfP/yOv//8bq///C5///z+z//0O3+v9Ctfr/QLP5/z2x+f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0u///8jr///I6///yOv//zmq9f9Dt/r/Q7f6/0O3+v8AAAAAAAAAAAAAAAAAAAAA8A8AAOAHAADgBwAAwAMAAMADAACGAQAABgAAAA8AAAAPAAAABgAAAIYBAADAAwAAwAMAAOAHAADgBwAA8A8AAA==" />
        ${seo ? `
        ${seo?.ogType ? `<meta property="og:type" content="${seo.ogType}">` : ""}
        ${seo?.ogTitle ? `<meta property="og:title" content="${seo.ogTitle}">` : ""}
        ${seo?.ogUrl ? `<meta property="og:url" content="${seo.ogUrl}">`: ""}
        ${seo?.ogSiteName ? `<meta property="og:site_name" content="${seo.ogSiteName}">` : ""}
        ${seo?.ogDescription ? `<meta property="og:description" content="${seo.ogDescription}">` : ""}
        ${seo?.ogImage ? `<meta property="og:image" content="${seo.ogImage}">` : ""}
        ${seo?.twitterCard ? `<meta name="twitter:card" content="${seo.twitterCard}">` : ""}
        ${seo?.twitterTitle ? `<meta name="twitter:title" content="${seo.twitterTitle}">` : ""}
        ${seo?.twitterDescription ? `<meta name="twitter:description" content="${seo.twitterDescription}">` : ""}
        ${seo?.twitterImage ? `<meta name="twitter:image" content="${seo.twitterImage}">` : ""}
        ` : ""}
        <style>
          body, .swagger-ui .scheme-container {
            background-color: ${bgColor || bg};
          }
          #swagger-ui * {
            color: ${textColor || text};
          }
          .swagger-ui .opblock-tag {
            border-bottom: 1px solid ${dark ? tw.gray[600] : tw.gray[400]};
          }
          .swagger-ui .opblock .opblock-section-header {
            background-color: ${sectionHeaderBgColor || dark ? tw.gray[950] : tw.gray[800]};
          }
          .swagger-ui .opblock-section-header *:not([class*="content-type"]) {
            color: ${sectionHeaderTextColor || tw.neutral[100]}!important;
          }
          input[type="text"], select, option {
            color: ${tw.neutral[950]}!important;
          }
          .swagger-ui .opblock.opblock-get {
            background-color: ${getColor ? `${getColor}1a` : dark ? `${tw.cyan[300]}1a` : `${tw.cyan[700]}1a`};
            border-color: ${getColor || dark ? tw.cyan[300] : tw.cyan[700]};
          }
          .swagger-ui .opblock.opblock-post {
            background-color: ${postColor ? `${postColor}1a` : dark ? `${tw.green[400]}1a` : `${tw.green[700]}1a`};
            border-color: ${postColor || dark ? tw.green[400] : tw.green[700]};
          }
          .swagger-ui .opblock.opblock-delete {
            background-color: ${deleteColor ? `${deleteColor}1a` : dark ? `${tw.rose[400]}1a` : `${tw.rose[700]}1a`};
            border-color: ${deleteColor || dark ? tw.rose[400] : tw.rose[700]};
          }
          .swagger-ui .opblock-summary-method {
            color: ${dark ? "#252525" : "#f0f0f0"}!important;
          }
          .swagger-ui .opblock.opblock-get .opblock-summary-method, .swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span:after {
            background-color: ${getColor || dark ? tw.cyan[400] : tw.cyan[700]};
          }
          .swagger-ui .opblock.opblock-post .opblock-summary-method, .swagger-ui .opblock.opblock-post .tab-header .tab-item.active h4 span:after {
            background-color: ${postColor || dark ? tw.green[400] : tw.green[700]};
          }
          .swagger-ui .opblock.opblock-delete .opblock-summary-method, .swagger-ui .opblock.opblock-delete .tab-header .tab-item.active h4 span:after {
            background-color: ${deleteColor || dark ? tw.rose[400] : tw.rose[700]};
          }
          .swagger-ui .model-box-control:focus, .swagger-ui .models-control:focus, .swagger-ui .opblock-summary-control:focus {
            outline: none;
          }
          .swagger-ui .parameter__name.required:after {
            color: ${dark ? "#ff7070" : "#ff000099"};
          }
          .swagger-ui .opblock-body pre.microlight, .swagger-ui textarea {
            background-color: ${codeBgColor || tw.zinc[800]}!important;
          }
          .swagger-ui .body-param textarea {
            background-color: #f0f0f0!important;
            color: ${tw.gray[950]}!important;
          }
          code *:not([style*="color"]), code:not([style*="color"]) {
            color: ${tw.gray[100]}!important;
          }
          svg.arrow {
            fill: ${text};
          }
          .swagger-ui .loading-container .loading:before {
            border: 2px solid ${dark ? "#ffffff1a" : "#5555551a"};
            border-top-color: ${text};
          }
          .swagger-ui .loading-container .loading:after {
            color: ${text};
          }
          .swagger-ui .operation-servers {
            display: ${!showServers ? "none" : "block"};
          }
          .response-col_links {
            display: none;
          }
          .swagger-ui .btn.execute {
            color: ${tw.neutral[950]}!important;
            background-color: ${dark ? tw.lime[400] : tw.lime[400]};
            border-color: ${dark ? tw.lime[300] : tw.lime[500]};
          }
        </style>
    </head>
    <body>
    <div id="swagger-ui"></div>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.17.14/swagger-ui-bundle.js" integrity="sha256-wuSp7wgUSDn/R8FCAgY+z+TlnnCk5xVKJr1Q2IDIi6E=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.17.14/swagger-ui-standalone-preset.js" integrity="sha256-M7em9a/KxJAv35MoG+LS4S2xXyQdOEYG5ubRd0W3+G8=" crossorigin="anonymous"></script>
    <script>
    window.ui = SwaggerUIBundle({
        url: '${schemaUrl}',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis
        ]
    });
    </script>
    </body>
    </html>`.replace(/\n\s+/g, "\n");
};