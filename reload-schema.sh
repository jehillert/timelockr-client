#!/bin/bash
psql service=tldb<schema.sql

####################################################
#
#   * Delete database with pgAdmin4.  Schema can
#     also be reloaded from there as well.
#
#  ** Script requires a .pg_service.conf file to
#     be located in the home directory with the
#     following contents:
#       [tldb]
#       dbname=postgres
#       host=localhost
#       port=5432
#       user=jhillert
#       password=OMITTED
#
# *** Note: Users should be logging in under user
#     credentials, not with 'jhillert'
#
####################################################
