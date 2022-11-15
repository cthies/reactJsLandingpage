#!/bin/bash

function downcase {
  echo $1 | awk '{print tolower($0)}'
}

function normalize {
  downcase $1 | awk '{gsub(/[^a-zA-Z0-9-]/,"-"); sub(/-+$/, ""); sub(/^-+/, ""); print}'
}

function trim53 {
  if [ ${#1} -gt 53 ]; then
    printf "%s-%s" $(echo -n $1 | cut -c -44) $(echo -n $1 | sha256sum | cut -c -8)
  else
    echo -n $1
  fi
}

function trim16 {
  if [ ${#1} -gt 16 ]; then
    echo -n $1 | sha256sum | cut -c -16
  else
    echo -n $1
  fi
}
