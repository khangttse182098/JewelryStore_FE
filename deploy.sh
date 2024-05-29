echo "Building app..."
npm run build
echo "Delete old file..."
ssh root@64.227.1.44 rm -rf /var/www/html/assets
ssh root@64.227.1.44 rm /var/www/html/index.html
echo "Deploy files to server..."
scp -r -i ~/.ssh/id_rsa dist/* root@64.227.1.44:/var/www/html/
echo "Done!"