# Бэкэнд дипломной работы студента Денисова Евгения группы 16-darkblue  

## Описание  
Бэкэнд сервиса, на котором можно найти фильмы по запросу и сохранить в личном кабинете.  
Пользователь вводит в строку поиска ключевые слова и нажимает кнопку «Искать»  

## Технологии  
- Node.js
- express 
- celebrate 
- cors
- mongoose
- validator
- bcrypt 

## Установка MongoDB (необходимо для создания бд на локальной машине)
<details>
  <summary>для windows</summary>
  
1. Перейдите по [ссылке](https://www.mongodb.com/try/download/community?jmp=docs)
2. В выпадающем списке Version выберите версию с текстом 4.4.5;
3. В выпадающем списке OS выберите Windows x64 X64;  
4. В выпадающем списке Package выберите MSI;  
5. Нажмите Download.  
6. По завершению загрузки запустите установщик.  
7. Следуйте требованиям установщика (при выборе типа установки выберите Complete).  
8. Откройте Git Bash и перейдите в корень диска C:\ ( cd /C )  
9. Создайте директорию для базы данных ( mkdir -p data/db )  
10. Добавьте путь к папке bin в переменную окружения:  
Найдите путь к папке bin — в ней хранятся исполняемые файлы MongoDB. Обычно он выглядит как-то так:  
C:\Program Files\MongoDB\Server\4.2\bin  (версия может быть другой)  
11. Откройте настройки переменных окружения:  
Откройте «Изменение переменных среды текущего пользователя» или «Edit the System Environment Variables».  
12. В верхнем окне выберите переменную Path и нажмите «Изменить...».  
13. В открывшемся окне нажмите «Создать», скопируйте путь к папке bin, сохраните результат и нажмите «Ок» во всех открытых окнах. Переменная окружения добавлена.  
Или воспользуйтесь официальной [инструкцией](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mdb-edition)  
  
</details>

<details>
  <summary>для macOS</summary>
  
Mongo на macOS устанавливается из Homebrew — популярного пакетного менеджера macOS. Его нужно установить перед установкой Mongo. Для этого запустите терминал и запускайте там все команды из инструкции.  
Если вы уже устанавливали Homebrew, сразу переходите к пункту 4.  
### Пошаговая инструкция  
1. Установите утилиты разработчика от Apple. Для этого в терминале запустите:  
xcode-select --install  
  
2. Запустите команду:  
 sudo xcodebuild -license  
  
3. Теперь ваш компьютер готов к установке менеджера пакетов brew. Скопируйте эту команду в терминал и запустите:
 /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  
4. По очереди запустите эти команды:  
 brew tap mongodb/brew  
 brew install mongodb-community@4.4  
  
Или воспользуйтесь официальной [инструкцией](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
  
</details>

<details>
  <summary>Linux</summary>
  
  Процесс установки описан в официальной [инструкции](https://docs.mongodb.com/manual/administration/install-on-linux/)
  
</details>

## Установка проекта:  
```
git clone https://github.com/jackyapa6eu/movies-explorer-api.git
cd movies-explorer-api
npm install 
```
## Запуск
```
npm run start
```

## Статус проекта: завершен



  
