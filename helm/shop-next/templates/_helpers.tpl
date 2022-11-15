{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "shop-next.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "shop-next.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "shop-next.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "shop-next.labels" -}}
helm.sh/chart: {{ include "shop-next.chart" . }}
{{ include "shop-next.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "shop-next.selectorLabels" -}}
app.kubernetes.io/name: {{ include "shop-next.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "shop-next.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "shop-next.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{- define "shop-next.tlsSecretName" -}}
{{- if .el.tlsSecret.secretNameOverride }}
{{- .el.tlsSecret.secretNameOverride | trimSuffix "-" }}
{{- else }}
{{- $partOne := .fullName }}
{{- $partTwo := .el.host | replace "." "-" | trimSuffix "-"}}
{{- printf "%s-%s" $partOne $partTwo | trimSuffix "-" }}
{{- end }}
{{- end }}

{{- define "shop-next.mappingName" -}}
{{- if .el.nameOverride }}
{{- .el.nameOverride | trimSuffix "-" }}
{{- else }}
{{- $partOne := .fullName }}
{{- $partTwo := default .el.host .el.name | replace "." "-" | trimSuffix "-"}}
{{- $partThree :=  .el.prefix | replace "/" "-" | trimPrefix "-"}}
{{- printf "%s-%s-%s" $partOne $partTwo $partThree | trimSuffix "-" }}
{{- end }}
{{- end }}

{{- define "shop-next.hostName" -}}
{{- if .el.nameOverride }}
{{- .el.nameOverride | trimSuffix "-" }}
{{- else }}
{{- $partOne := .fullName }}
{{- $partTwo := default .el.host .el.name | replace "." "-" | trimSuffix "-"}}
{{- printf "%s-%s" $partOne $partTwo | trimSuffix "-" }}
{{- end }}
{{- end }}

{{- define "shop-next.acmeAuthority" -}}
{{- if .el.acmeAuthorityOverride }}
{{- .el.acmeAuthorityOverride }}
{{- else }}
{{- .acmeAuthority }}
{{- end }}
{{- end }}
