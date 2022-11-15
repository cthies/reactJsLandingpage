import getConfig from 'next/config';

function datadogRumScript(): string {
  const { publicRuntimeConfig } = getConfig();

  return publicRuntimeConfig.DD_RUM_APPLICATION_ID && publicRuntimeConfig.DD_RUM_CLIENT_TOKEN
    ? `
      (function(h,o,u,n,d) {
         h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
         d=o.createElement(u);d.async=1;d.src=n
         n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v3.js','DD_RUM')
        DD_RUM.onReady(function() {
          DD_RUM.init({
            applicationId: "${publicRuntimeConfig.DD_RUM_APPLICATION_ID}",
            clientToken: "${publicRuntimeConfig.DD_RUM_CLIENT_TOKEN}",
            site: "${publicRuntimeConfig.DD_RUM_SITE}",
            service: "${publicRuntimeConfig.DD_RUM_SERVICE_NAME}",
            env: "${publicRuntimeConfig.DD_RUM_ENV}",
            version: "${process.env.BUILD_ID}",
            allowedTracingOrigins: [/https:\\/\\/.*\\.foodspring\\..*/],
            sampleRate: ${parseInt(publicRuntimeConfig.DD_RUM_SAMPLE_RATE || '0', 10)},
            trackInteractions: true,
          });
        })
      `
    : '';
}

export default datadogRumScript;
