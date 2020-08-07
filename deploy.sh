#!/bin/bash
# Build and deploy to vercel.

echo Building project...
yarn build
if [ $? -ne 0 ] 
then
	echo 'Error while building (exit code = $?)'
	exit 1
fi

echo Removing admin directory...
rm -rf ./out/admin 2 > /dev/null

echo Deploying to vercel...
vercel --prod
exitCode=0
if [ $? -ne 0 ] 
then
	echo 'Error while deploying (exit code = $?)'
	exitCode=1
fi

echo Cleaning up...
rm -rf ./out
exit $exitCode