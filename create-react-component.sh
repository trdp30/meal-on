#!/bin/bash

# Function to convert the component name to camelCase
toCamelCase() {
  local string="$1"
  local result=""
  local capitalizeNext=0

  for ((i=0; i<${#string}; i++)); do
    char="${string:$i:1}"
    if [ "$char" == "_" ]; then
      capitalizeNext=1
    else
      if [ "$capitalizeNext" -eq 1 ]; then
        result+=$(tr 'a-z' 'A-Z' <<< "$char")
        capitalizeNext=0
      else
        result+="$char"
      fi
    fi
  done

  echo "$result"
}

# Check if a component type and name were provided as arguments
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: create-component <ComponentType> <ComponentName>"
  exit 1
fi

# Define the component type based on the first argument
COMPONENT_TYPE="$1"

# Check if the provided component type is valid
if [ "$COMPONENT_TYPE" != "component" ] && [ "$COMPONENT_TYPE" != "container" ]; then
  echo "Invalid component type. Use 'component' or 'container'."
  exit 1
fi

# Get the component name and convert it to camelCase with the first letter capitalized
COMPONENT_NAME=$(toCamelCase "$2")

# Check if the provided component name is in camelCase with the first letter capitalized
if [ "$COMPONENT_NAME" != "$(tr '[:lower:]' '[:upper:]' <<< ${COMPONENT_NAME:0:1})${COMPONENT_NAME:1}" ]; then
  echo "Invalid component name. It should be in camelCase with the first letter capitalized."
  exit 1
fi

# Create a new directory for the component or container
mkdir -p "src/${COMPONENT_TYPE}s/$COMPONENT_NAME"

# Create a new React component file with the provided name
touch "src/${COMPONENT_TYPE}s/$COMPONENT_NAME/index.js"

# Define the default template for the component or container
echo "import React from 'react';

function $COMPONENT_NAME() {
  return (
    <div>
      <h1>Hello, this is $COMPONENT_NAME $COMPONENT_TYPE!</h1>
    </div>
  );
}

export default $COMPONENT_NAME;" > "src/${COMPONENT_TYPE}s/$COMPONENT_NAME/index.js"

echo "$COMPONENT_TYPE $COMPONENT_NAME created at src/${COMPONENT_TYPE}s/$COMPONENT_NAME"
