import type { customSwaggerUIOptions } from "types";

export const customSwaggerUI = (schemaUrl: string, options?: customSwaggerUIOptions): string => {
  schemaUrl = schemaUrl.replace(/\/+(\/|$)/g, "$1"); // strip double & trailing splash
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="SwaggerIU"/>
        <title>${options?.title ? options?.title : "SwaggerUI"}</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css"/>
        <link rel="shortcut icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlMb//2ux//9or///ZKz//wlv5f8JcOf/CnXv/why7/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2vi/wZo3/9ytf//b7P//2uw//+BvP//DHbp/w568P8Md+//CnXv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApv4/8HbOH/lMf//3W3//9ytf//brL//w946v8SfvH/EHzw/w558P8AAAAAAAAAAAAAAAAAAAAAAAAAABF56f8Ndef/C3Dj/whs4f98u///eLn//3W3//+Evv//FoPx/xSA8f8SfvD/EHvw/wAAAAAAAAAAAAAAAA1EeF0WgOz/EXrp/w515v8LceT/lsn//3+9//97u///eLj//xaB7f8YhfL/FoLx/xSA8f8JP/deAAAAAAAAAAAgjfH/HIjw/xeB7P8Te+n/AAAAAAAAAACGwf//gr///369//+Iwf//HIny/xqH8v8YhfL/FYLx/wAAAAAnlfPlJJLy/yGO8v8cifD/GILt/wAAAAAAAAAAmMz//4nD//+Fwf//gb///xyJ8P8ejPP/HIny/xmH8v8XhPLnK5r0/yiW8/8lk/P/IpDy/wAAAAAAAAAAAAAAAAAAAACPx///jMX//4jD//+MxP//IpD0/yCO8/8di/P/G4ny/y6e9f8sm/T/KZj0/yaV8/8AAAAAAAAAAAAAAAAAAAAAlsz//5LJ//+Px///lMn//yaV9P8kkvT/IZD0/x+O8/8yo/blMKD1/y2d9f8qmfT/KJbz/wAAAAAAAAAAqdb//53Q//+Zzv//lsv//yiY8/8qmvX/KJf1/yWV9P8jkvTQAAAAADSl9v8xofX/Lp71/yyb9P8AAAAAAAAAAKfW//+k1P//oNL//6rW//8wofb/Lp72/yuc9f8pmfX/AAAAAAAAAAAcVHtcNab2/zKj9v8voPX/LZz0/7vh//+u2///qtj//6fW//8wofT/NKX3/zKj9/8voPb/F8/6XgAAAAAAAAAAAAAAADmr9/82qPf/M6T2/zCg9f+44f//td///7Hd//++4v//Oqz4/ziq+P81p/f/M6X3/wAAAAAAAAAAAAAAAAAAAAAAAAAAOqz4/zep9//M6///v+X//7vj//+44f//OKn1/z6x+f88rvn/Oaz4/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6x+f8qmfP/yOv//8bq///C5///z+z//0O3+v9Ctfr/QLP5/z2x+f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0u///8jr///I6///yOv//zmq9f9Dt/r/Q7f6/0O3+v8AAAAAAAAAAAAAAAAAAAAA8A8AAOAHAADgBwAAwAMAAMADAACGAQAABgAAAA8AAAAPAAAABgAAAIYBAADAAwAAwAMAAOAHAADgBwAA8A8AAA==" />
        ${options?.seo ? `
        ${options.seo?.ogType ? `<meta property="og:type" content="${options.seo.ogType}">` : "" }
        ${options.seo?.ogTitle ? `<meta property="og:title" content="${options.seo.ogTitle}">` : "" }
        ${options.seo?.ogUrl ? `<meta property="og:url" content="${options.seo.ogUrl}">`: ""}
        ${options.seo?.ogSiteName ? `<meta property="og:site_name" content="${options.seo.ogSiteName }">` : "" }
        ${options.seo?.ogDescription ? `<meta property="og:description" content="${options.seo.ogDescription}">` : "" }
        ${options.seo?.ogImage ? `<meta property="og:image" content="${options.seo.ogImage}">` : "" }
        ${options.seo?.twitterCard ? `<meta name="twitter:card" content="${options.seo.twitterCard}">` : "" }
        ${options.seo?.twitterTitle ? `<meta name="twitter:title" content="${options.seo.twitterTitle}">` : "" }
        ${options.seo?.twitterDescription ? `<meta name="twitter:description" content="${options.seo.twitterDescription}">` : "" }
        ${options.seo?.twitterImage ? `<meta name="twitter:image" content="${options.seo.twitterImage}">` : "" }
        ` : ""}
        <style>
          body, .swagger-ui .scheme-container {
            background-color: ${options?.bg_color || "#fff"};
          }
          #swagger-ui * {
            color: ${options?.txt_color ? options?.txt_color : options?.dark ? "#f0f0f0" : "#3b4151"};
          }
          .swagger-ui .opblock-tag {
            border-bottom: ${options?.dark ? "1px solid rgb(200,200,200,.3)" : "1px solid rgba(59,65,81,.3)"};
          }
          .swagger-ui .opblock .opblock-section-header {
            background-color: ${options?.section_header_bg_color || "hsla(0, 0%, 100%, .8)"};
          }
          input[type="text"], select, option {
            color: #252525!important;
          }
          .swagger-ui .opblock.opblock-get {
            background-color: ${options?.get_color ? `${options?.get_color}26` : "#61affe26"};
            border-color: ${options?.get_color || "#61affe"};
          }
          .swagger-ui .opblock.opblock-post {
            background-color: ${options?.post_color ? `${options?.post_color}26` : "#49cc9026"};
            border-color: ${options?.post_color || "#49cc90"};
          }
          .swagger-ui .opblock.opblock-delete {
            background-color: ${options?.delete_color ? `${options?.delete_color}26` : "#f93e3e26"};
            border-color: ${options?.delete_color || "#f93e3e"};
          }
          .swagger-ui .opblock-summary-method {
            color: ${options?.dark ? "#252525" : "#f0f0f0"}!important;
          }
          .swagger-ui .opblock.opblock-get .opblock-summary-method, .swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span:after {
            background-color: ${options?.get_color || "#61affe"};
          }
          .swagger-ui .opblock.opblock-post .opblock-summary-method, .swagger-ui .opblock.opblock-post .tab-header .tab-item.active h4 span:after {
            background-color: ${options?.post_color || "#49cc90"};
          }
          .swagger-ui .opblock.opblock-delete .opblock-summary-method, .swagger-ui .opblock.opblock-delete .tab-header .tab-item.active h4 span:after {
            background-color: ${options?.delete_color || "#ff8888"};
          }
          .swagger-ui .model-box-control:focus, .swagger-ui .models-control:focus, .swagger-ui .opblock-summary-control:focus {
            outline: none;
          }
          .swagger-ui .parameter__name.required:after {
            color: ${options?.dark ? "#ff7070" : "#ff000099"};
          }
          .swagger-ui .opblock-body pre.microlight, .swagger-ui textarea {
            background-color: ${options?.code_bg_color || "#333333"}!important;
          }
          .swagger-ui .body-param textarea {
            color: #252525!important;
            background-color: ${options?.dark ? "#f0f0f0" : "#3b4151"}!important;
          }
          svg.arrow {
            fill: ${options?.dark ? "#f0f0f0" : "#3b4151"};
          }
          .swagger-ui .loading-container .loading:before {
            border: 2px solid ${options?.dark ? "#ffffff1a" : "#5555551a"};
            border-top-color: ${options?.dark ? "#ffffff99" : "#00000099"};
          }
          .swagger-ui .loading-container .loading:after {
            color: ${options?.dark ? "#f0f0f0" : "#3b4151"};
          }
          .swagger-ui .operation-servers {
            display: ${options?.show_servers === false ? "none" : "block"};
          }
        </style>
    </head>
    <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js" crossorigin></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-standalone-preset.js" crossorigin></script>
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