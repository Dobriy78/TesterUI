
Set DataPath=..\App\*
Set ArchPath=App.nw
Set SevenZipPath=%ProgramFiles%\7-Zip
 
:: ��������� Path, ���� ��� ���� 7-zip - ��������� ���������� � ���������� ����������
Echo %Path%|Find "7-zip">nul||Set Path=%Path%;%SevenZipPath%
 
    7z a -tzip "%ArchPath%" "%DataPath%"

copy /b nw.exe+App.nw App.exe

start App.exe

exit