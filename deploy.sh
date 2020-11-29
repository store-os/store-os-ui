#!/bin/bash
# Ask the user for their name
echo "\n-------------------"
echo Welcome to StoreOS. 
echo "-------------------\n"
echo 'Please choose your cloud: '
options=("AWS" "GCP" "Azure")
select opt in "${options[@]}"
do
    case $opt in
        "AWS")
            echo "\nNice! Let's configure your credentials.\n"
            break
            ;;
        "GCP")
            echo "\nSorry, option not valid yet. Coming soon!\n"
            break
            ;;
        "Azure")
            echo "\nSorry, option not valid yet. Coming soon!\n"
            break
            ;;
        *) echo "\nInvalid option $REPLY\n";;
    esac
done

if [ $opt = "AWS" ]
then
    read -sp 'Access Key ID: ' accesskey
    export AWS_ACCESS_KEY_ID=$accesskey
    echo ""
    read -sp 'Secret Access Key: ' secret
    export AWS_SECRET_ACCESS_KEY=$secret
    echo ""
    read -p 'Region: ' region
    export AWS_DEFAULT_REGION=$region
    echo ""
    read -p 'Bucket name: ' bucket
    aws s3 sync build s3://$bucket
fi