
Set DataPath=..\App\*
Set ArchPath=App.nw
Set SevenZipPath=%ProgramFiles%\7-Zip
 
:: Проверяем Path, если там нету 7-zip - добавляем директорию с бинарником архиватора
Echo %Path%|Find "7-zip">nul||Set Path=%Path%;%SevenZipPath%
 
    7z a -tzip "%ArchPath%" "%DataPath%"

copy /b nw.exe+App.nw App.exe

start App.exe

exit