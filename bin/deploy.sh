#!/bin/bash

set -e

aws s3 sync app s3://usgbc-46-frontend
