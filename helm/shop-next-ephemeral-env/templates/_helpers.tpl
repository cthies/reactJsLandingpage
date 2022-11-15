{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "shop-next-ephemeral-environment.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "shop-next-ephemeral-environment.hosts" -}}
{{- $hostname := .Values.hostName -}}
- host: "{{ $hostname }}.shop-next.dev-ec1.foodspring.com"
  tlsSecret:
    enabled: true
    secretNameOverride: acme
{{- range $key, $val := .Values.regions }}
- host: "{{ $key }}.{{ $hostname }}.shop-next.dev-ec1.foodspring.com"
  tlsSecret:
    enabled: true
    secretNameOverride: acme
{{- end }}
{{- end -}}

{{- define "shop-next-ephemeral-environment.mappings" -}}
{{- $hostname := .Values.hostName -}}
- host: "{{ $hostname }}.shop-next.dev-ec1.foodspring.com"
  prefix: "/"
{{- range $key, $val := .Values.regions }}
- host: "{{ $key }}.{{ $hostname }}.shop-next.dev-ec1.foodspring.com"
  prefix: "/"
{{- end }}
{{- end -}}
