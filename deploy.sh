echo -e "\033[33m     .___  ___.      ___       __    __   __   __  ___      ___      \033[0m";
echo -e "\033[33m     |   \/   |     /   \     |  |  |  | |  | |  |/  /     /   \     \033[0m";
echo -e "\033[33m     |  \  /  |    /  ^  \    |  |__|  | |  | |  '  /     /  ^  \    \033[0m";
echo -e "\033[33m     |  |\/|  |   /  /_\  \   |   __   | |  | |    <     /  /_\  \   \033[0m";
echo -e "\033[33m     |  |  |  |  /  _____  \  |  |  |  | |  | |  .  \   /  _____  \  \033[0m";
echo -e "\033[33m     |__|  |__| /__/     \__\ |__|  |__| |__| |__|\__\ /__/     \__\ \033[0m";
echo " ";
echo " ";
echo -e "\033[94m Building app...\033[0m"
npm run build
echo -e "\033[94m Delete old file...\033[0m"
ssh root@64.227.1.44 rm -rf /var/www/html/assets
ssh root@64.227.1.44 rm /var/www/html/index.html
echo -e "\033[94m Deploy files to server...\033[0m"
scp -r -i ~/.ssh/id_rsa dist/* root@64.227.1.44:/var/www/html/
echo -e "\033[94m Done!\033[0m"